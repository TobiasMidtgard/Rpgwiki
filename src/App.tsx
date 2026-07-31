/**
 * Application shell and routing.
 */

import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { SearchBar } from './components/SearchBar'
import { ConfirmHost, Loading, ToastHost, toast } from './components/ui'
import { canRedo, canUndo, loadWorld, redo, undo, useStoreStatus, useWorld } from './core/store'
import { SEED_VERSION, buildSeed } from './world/seed'
import { toggleEditing, useUiState } from './core/uiState'
import { QuickCreate } from './pages/QuickCreate'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Atlas = lazy(() => import('./pages/Atlas'))
const EntityPage = lazy(() => import('./pages/EntityPage'))
const ListPage = lazy(() => import('./pages/ListPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const GraphPage = lazy(() => import('./pages/GraphPage'))
const QuestFlowPage = lazy(() => import('./pages/QuestFlowPage'))
const SkillTreePage = lazy(() => import('./pages/SkillTreePage'))
const ProductionPage = lazy(() => import('./pages/ProductionPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const DataPage = lazy(() => import('./pages/DataPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="var(--brass)" strokeWidth="1.2" />
      <path d="M12 1.5 L14 10 L22.5 12 L14 14 L12 22.5 L10 14 L1.5 12 L10 10 Z" fill="var(--brass)" opacity="0.9" />
      <circle cx="12" cy="12" r="2.4" fill="var(--crimson)" />
    </svg>
  )
}

export default function App() {
  const world = useWorld()
  const status = useStoreStatus()
  const ui = useUiState()
  const [navOpen, setNavOpen] = useState(false)
  const [bootError, setBootError] = useState<string | null>(null)
  const loc = useLocation()

  useEffect(() => {
    loadWorld(buildSeed, SEED_VERSION).catch((err: unknown) => setBootError(String(err)))
  }, [])

  useEffect(() => {
    setNavOpen(false)
  }, [loc.pathname])

  // The content pane scrolls, not the window.
  useEffect(() => {
    document.querySelector('.main')?.scrollTo({ top: 0 })
  }, [loc.pathname, loc.search])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = !!target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !typing) {
        e.preventDefault()
        if (e.shiftKey) {
          if (canRedo()) redo()
        } else if (canUndo()) {
          undo()
        }
      }
      if (e.key.toLowerCase() === 'e' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault()
        toggleEditing()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  if (bootError) {
    return (
      <div className="main-pad">
        <div className="state error" role="alert">
          <h3>The world could not be loaded</h3>
          <p>{bootError}</p>
          <button type="button" className="btn" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    )
  }

  const saveLabel =
    status.saveState === 'saving'
      ? 'Saving…'
      : status.saveState === 'error'
        ? 'Save failed'
        : status.saveState === 'saved'
          ? 'Saved'
          : 'Ready'

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="brand">
        <BrandMark />
        <div className="brand-text">
          <div className="brand-title">World Atlas &amp; Bible</div>
          <div className="brand-sub">RPG project wiki</div>
        </div>
      </div>

      <header className="topbar">
        <button
          type="button"
          className="btn ghost sm mobile-only"
          aria-label="Open navigation"
          aria-expanded={navOpen}
          aria-controls="nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          ☰
        </button>
        <Link to="/" className="mobile-only" style={{ color: 'var(--text)', fontFamily: 'var(--ff-display)' }}>
          Atlas
        </Link>

        <SearchBar />

        <div className="btn-row" style={{ marginLeft: 'auto' }}>
          <QuickCreate />
          <button
            type="button"
            className={`btn sm${ui.editing ? ' on' : ''}`}
            onClick={toggleEditing}
            aria-pressed={ui.editing}
            title="Toggle editing mode (Ctrl+Shift+E)"
          >
            {ui.editing ? '✎ Editing' : '✎ Edit'}
          </button>
          <button
            type="button"
            className="btn sm"
            onClick={() => {
              undo()
              toast('Undone', 'info')
            }}
            disabled={!status.canUndo}
            title={status.canUndo ? `Undo: ${status.undoLabel}` : 'Nothing to undo'}
            aria-label="Undo"
          >
            ↶
          </button>
          <button
            type="button"
            className="btn sm"
            onClick={() => {
              redo()
              toast('Redone', 'info')
            }}
            disabled={!status.canRedo}
            title={status.canRedo ? `Redo: ${status.redoLabel}` : 'Nothing to redo'}
            aria-label="Redo"
          >
            ↷
          </button>
          <span
            className="chip"
            title={status.saveState === 'error' ? 'Could not write to browser storage' : 'Changes save to this browser automatically'}
            style={status.saveState === 'error' ? { color: 'var(--crimson-lit)', borderColor: 'currentColor' } : undefined}
          >
            {saveLabel}
          </span>
        </div>
      </header>

      {navOpen ? <div className="nav-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" /> : null}
      <Nav open={navOpen} onNavigate={() => setNavOpen(false)} />

      <main className="main" id="main" tabIndex={-1}>
        {!world ? (
          <Loading label="Opening the world" />
        ) : (
          <Suspense fallback={<Loading label="Loading section" />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/atlas" element={<Atlas />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/data" element={<DataPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/quests/flow" element={<QuestFlowPage />} />
              <Route path="/skills/tree" element={<SkillTreePage />} />
              <Route path="/production" element={<ProductionPage />} />
              <Route path="/:section/:id" element={<EntityPage />} />
              <Route path="/:section" element={<ListPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </main>

      <ToastHost />
      <ConfirmHost />
    </div>
  )
}
