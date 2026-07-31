/**
 * App-level UI state kept out of the world data: reading vs editing, and
 * whether secrets are revealed.
 */

import { useSyncExternalStore } from 'react'

interface UiState {
  editing: boolean
  showSecrets: boolean
}

const KEY = 'rpgwiki.ui.mode'

let state: UiState = load()
const listeners = new Set<() => void>()

function load(): UiState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { editing: false, showSecrets: false, ...JSON.parse(raw) }
  } catch {
    /* fall through to defaults */
  }
  return { editing: false, showSecrets: false }
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
