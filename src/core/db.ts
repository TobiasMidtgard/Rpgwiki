/**
 * Persistence.
 *
 * IndexedDB is the primary store (it holds image data URLs comfortably);
 * localStorage is a fallback for private-mode browsers where IDB is blocked.
 */

const DB_NAME = 'rpgwiki'
const DB_VERSION = 1
const STORE = 'kv'
const LS_PREFIX = 'rpgwiki:'

let dbPromise: Promise<IDBDatabase | null> | null = null

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') return resolve(null)
    let req: IDBOpenDBRequest
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION)
    } catch {
      return resolve(null)
    }
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => resolve(null)
    req.onblocked = () => resolve(null)
  })
  return dbPromise
}

export async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb()
  if (!db) {
    const raw = localStorage.getItem(LS_PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : undefined
  }
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(key)
    req.onsuccess = () => resolve(req.result as T | undefined)
    req.onerror = () => resolve(undefined)
  })
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb()
  if (!db) {
    try {
      localStorage.setItem(LS_PREFIX + key, JSON.stringify(value))
    } catch {
      /* quota — surfaced by the caller's save state */
    }
    return
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(value, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
}

export async function idbDel(key: string): Promise<void> {
  const db = await openDb()
  if (!db) {
    localStorage.removeItem(LS_PREFIX + key)
    return
  }
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => resolve()
  })
}

/** Rough size of the persisted world, for the backup panel. */
export function byteSize(value: unknown): number {
  try {
    return new Blob([JSON.stringify(value)]).size
  } catch {
    return 0
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(2)} MB`
}
