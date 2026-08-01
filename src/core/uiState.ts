/**
 * App-level UI state kept out of the world data: reading vs editing, and
 * whether secrets are revealed.
 */

import { useSyncExternalStore } from 'react'

interface UiState {
  editing: boolean
  showSecrets: boolean
  /**
   * Which roster categories are expanded, keyed by category rather than by
   * page: opening Fauna is a statement about wanting to see fauna, so it should
   * still be open on the next city.
   */
  openRosters: Record<string, boolean>
}

const KEY = 'rpgwiki.ui.mode'

const DEFAULTS: UiState = { editing: false, showSecrets: false, openRosters: {} }

let state: UiState = load()
const listeners = new Set<() => void>()

function load(): UiState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      return { ...DEFAULTS, ...saved, openRosters: { ...DEFAULTS.openRosters, ...saved?.openRosters } }
    }
  } catch {
    /* fall through to defaults */
  }
  return { ...DEFAULTS }
}

function set(patch: Partial<UiState>) {
  state = { ...state, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* non-fatal */
  }
  listeners.forEach((l) => l())
}

export const setEditing = (editing: boolean) => set({ editing })
export const toggleEditing = () => set({ editing: !state.editing })
export const setShowSecrets = (showSecrets: boolean) => set({ showSecrets })
export const setRosterOpen = (key: string, open: boolean) =>
  set({ openRosters: { ...state.openRosters, [key]: open } })

export function useUiState(): UiState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
    () => state,
  )
}

export const getUiState = () => state
