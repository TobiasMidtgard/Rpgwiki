/**
 * Shared primitives: badges, dialogs, toasts and the standard empty, loading,
 * error and confirmation states.
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { SCHEMAS } from '../core/schema'
import type { EntityType, Status } from '../core/types'
import { STATUS_META } from '../core/types'

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

export function StatusBadge({ status, title }: { status: Status; title?: boolean }) {
  const m = STATUS_META[status]
  return (
    <span className={`status-badge st-${status}`} title={title === false ? undefined : m.hint}>
      {m.label}
    </span>
  )
}

export function TypeGlyph({ type, size = 12 }: { type: EntityType; size?: number }) {
  const s = SCHEMAS[type]
  if (!s) return null
  return (
    <span aria-hidden="true" style={{ color: `var(${s.accentVar})`, fontSize: size, lineHeight: 1 }}>
      {s.glyph}
    </span>
  )
}

export function TypeChip({ type }: { type: EntityType }) {
  const s = SCHEMAS[type]
  if (!s) return null
  return (
    <span className="chip tight" style={{ color: `var(${s.accentVar})`, borderColor: 'currentColor' }}>
      <TypeGlyph type={type} size={10} />
      {s.label}
    </span>
  )
}

export function WorkingTitleTag() {
  return (
    <span className="working-title" title="This name is a placeholder. The brief did not establish one.">
      Working title
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* States                                                              */
/* ------------------------------------------------------------------ */

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string
  children?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="state">
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {action}
    </div>
  )
}

export function ErrorState({ title, children, onRetry }: { title: string; children?: React.ReactNode; onRetry?: () => void }) {
  return (
    <div className="state error" role="alert">
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {onRetry ? (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  )
}

export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite">
      <div className="loading-bar" />
      <p className="dim" style={{ padding: 'var(--sp-4)', fontSize: 'var(--fs-sm)' }}>
        {label}…
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dialog                                                              */
/* ------------------------------------------------------------------ */

export function Dialog({
  title,
  onClose,
  children,
  footer,
  wide,
  labelledBy,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  wide?: boolean
  labelledBy?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = labelledBy ?? 'dlg-title'

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const node = ref.current
    node?.querySelector<HTMLElement>('input,textarea,select,button,[tabindex]:not([tabindex="-1"])')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !node) return
      const focusable = [
        ...node.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`dialog${wide ? ' wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby={titleId} ref={ref}>
        <div className="dialog-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="btn ghost sm" onClick={onClose} style={{ marginLeft: 'auto' }} aria-label="Close dialog">
            ✕
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        {footer ? <div className="dialog-foot">{footer}</div> : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Confirm                                                             */
/* ------------------------------------------------------------------ */

interface ConfirmSpec {
  title: string
  body: React.ReactNode
  confirmLabel?: string
  danger?: boolean
  resolve: (ok: boolean) => void
}

let confirmSpec: ConfirmSpec | null = null
const confirmListeners = new Set<() => void>()
const emitConfirm = () => confirmListeners.forEach((l) => l())

export function confirmAction(spec: Omit<ConfirmSpec, 'resolve'>): Promise<boolean> {
  return new Promise((resolve) => {
    confirmSpec = { ...spec, resolve }
    emitConfirm()
  })
}

export function ConfirmHost() {
  const spec = useSyncExternalStore(
    (l) => {
      confirmListeners.add(l)
      return () => confirmListeners.delete(l)
    },
    () => confirmSpec,
    () => confirmSpec,
  )
  if (!spec) return null
  const close = (ok: boolean) => {
    spec.resolve(ok)
    confirmSpec = null
    emitConfirm()
  }
  return (
    <Dialog
      title={spec.title}
      onClose={() => close(false)}
      footer={
        <>
          <button type="button" className="btn" onClick={() => close(false)}>
            Cancel
          </button>
          <button type="button" className={`btn ${spec.danger ? 'danger' : 'primary'}`} onClick={() => close(true)}>
            {spec.confirmLabel ?? 'Confirm'}
          </button>
        </>
      }
    >
      <div className="prose">{spec.body}</div>
    </Dialog>
  )
}

/* ------------------------------------------------------------------ */
/* Toasts                                                             */
/* ------------------------------------------------------------------ */

export interface Toast {
  id: number
  message: string
  kind: 'ok' | 'err' | 'info'
  undo?: () => void
}

let toasts: Toast[] = []
let toastSeq = 0
const toastListeners = new Set<() => void>()
const emitToasts = () => toastListeners.forEach((l) => l())

export function toast(message: string, kind: Toast['kind'] = 'info', undo?: () => void) {
  const id = ++toastSeq
  toasts = [...toasts, { id, message, kind, undo }].slice(-4)
  emitToasts()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emitToasts()
  }, undo ? 8000 : 4200)
}

export function ToastHost() {
  const list = useSyncExternalStore(
    (l) => {
      toastListeners.add(l)
      return () => toastListeners.delete(l)
    },
    () => toasts,
    () => toasts,
  )
  if (!list.length) return null
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {list.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          <span>{t.message}</span>
          {t.undo ? (
            <button
              type="button"
              className="btn sm"
              onClick={() => {
                t.undo?.()
                toasts = toasts.filter((x) => x.id !== t.id)
                emitToasts()
              }}
            >
              Undo
            </button>
          ) : null}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Collapsible                                                         */
/* ------------------------------------------------------------------ */

export function useLocalState<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(`rpgwiki.ui.${key}`)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  const set = useCallback(
    (v: T | ((p: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
        try {
          localStorage.setItem(`rpgwiki.ui.${key}`, JSON.stringify(next))
        } catch {
          /* storage full or blocked — the UI still works, it just forgets */
        }
        return next
      })
    },
    [key],
  )
  return [value, set]
}

/** Rough relative time for "edited 4 minutes ago". */
export function ago(ts: number): string {
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000))
  if (s < 45) return 'just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(ts).toLocaleDateString()
}
