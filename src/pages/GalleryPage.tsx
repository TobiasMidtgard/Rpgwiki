/**
 * Gallery.
 *
 * Every image in the world in one place, plus the generated city vistas and
 * crests. Images can be uploaded here and attached to an entry.
 */

import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { Entity, EntityType, ImageRef } from '../core/types'
import { patchEntity, useWorld } from '../core/store'
import { readFileAsDataUrl } from '../core/io'
import { CityVista } from '../art/vista'
import { TypeBanner } from '../art/banner'
import { entityPath } from '../components/EntityLink'
import { RefPicker } from '../components/RefPicker'
import { Dialog, EmptyState, TypeGlyph, confirmAction, toast } from '../components/ui'

interface Tile {
  entity: Entity
  image: ImageRef
}

export default function GalleryPage() {
  const world = useWorld()
  const [typeFilter, setTypeFilter] = useState<EntityType | ''>('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const tiles = useMemo<Tile[]>(() => {
    if (!world) return []
    const out: Tile[] = []
    for (const e of Object.values(world.entities)) {
      if (e.archived) continue
      if (typeFilter && e.type !== typeFilter) continue
      for (const img of e.images ?? []) out.push({ entity: e, image: img })
    }
    return out.sort((a, b) => a.entity.name.localeCompare(b.entity.name))
  }, [world, typeFilter])

  const withImages = useMemo(() => {
    if (!world) return [] as EntityType[]
    const s = new Set<EntityType>()
    for (const e of Object.values(world.entities)) if (e.images?.length) s.add(e.type)
    return [...s]
  }, [world])

  if (!world) return null

  return (
    <div className="main-pad">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <h1>Gallery</h1>
          <p className="lede">
            Artwork attached to entries. Settlements without uploaded art carry a generated vista built from their own
            palette and silhouette, so every city is visually distinct from the start.
          </p>
        </div>
        <div className="btn-row" style={{ marginLeft: 'auto' }}>
          <button type="button" className="btn primary" onClick={() => setUploadOpen(true)}>
            + Add an image
          </button>
        </div>
      </div>

      {withImages.length > 1 ? (
        <div className="btn-row" style={{ marginBottom: 'var(--sp-4)' }}>
          <button type="button" className={`btn sm${typeFilter === '' ? ' on' : ''}`} onClick={() => setTypeFilter('')}>
            All
          </button>
          {withImages.map((t) => (
            <button key={t} type="button" className={`btn sm${typeFilter === t ? ' on' : ''}`} onClick={() => setTypeFilter(t)}>
              <TypeGlyph type={t} size={10} /> {SCHEMAS[t].plural}
            </button>
          ))}
        </div>
      ) : null}

      {tiles.length === 0 ? (
        <EmptyState title="No images yet" action={<button type="button" className="btn" onClick={() => setUploadOpen(true)}>Add an image</button>}>
          Attach an image to any entry and it will appear here.
        </EmptyState>
      ) : (
        <div className="gallery">
          {tiles.map(({ entity, image }) => (
            <figure className="gallery-tile" key={`${entity.id}-${image.id}`} style={{ margin: 0 }}>
              <Link to={entityPath(entity)} className="gallery-art" style={{ display: 'block' }}>
                {image.src === 'gen:vista' && entity.type === 'city' ? (
                  <CityVista id={entity.id} palette={Array.isArray(entity.fields.palette) ? (entity.fields.palette as string[]) : undefined} />
                ) : image.src.startsWith('gen:') ? (
                  <TypeBanner type={entity.type} id={entity.id} height={140} />
                ) : (
                  <img src={image.src} alt={image.caption ?? entity.name} loading="lazy" />
                )}
              </Link>
              <figcaption className="gallery-cap">
                <Link to={entityPath(entity)} style={{ color: 'var(--text)' }}>
                  {entity.name}
                </Link>
                <div className="dimmer" style={{ fontSize: 'var(--fs-micro)' }}>
                  {image.caption ?? SCHEMAS[entity.type].label}
                </div>
                {image.credit ? (
                  <div className="dimmer" style={{ fontSize: 'var(--fs-micro)', marginTop: 2 }}>
                    {image.credit}
                  </div>
                ) : null}
                <button
                  type="button"
                  className="btn sm ghost"
                  style={{ marginTop: 4 }}
                  onClick={async () => {
                    const ok = await confirmAction({
                      title: 'Remove this image?',
                      body: <p>It will be detached from {entity.name}. The entry itself is not affected.</p>,
                      confirmLabel: 'Remove',
                      danger: true,
                    })
                    if (ok) {
                      patchEntity(entity.id, { images: (entity.images ?? []).filter((i) => i.id !== image.id) }, 'Remove image')
                      toast('Image removed', 'info')
                    }
                  }}
                >
                  Remove
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {uploadOpen ? <UploadDialog onClose={() => setUploadOpen(false)} /> : null}
    </div>
  )
}

function UploadDialog({ onClose }: { onClose: () => void }) {
  const world = useWorld()
  const [target, setTarget] = useState<string[]>([])
  const [caption, setCaption] = useState('')
  const [credit, setCredit] = useState('')
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const input = useRef<HTMLInputElement>(null)

  const attach = () => {
    const id = target[0]
    if (!id || !dataUrl || !world) return
    const entity = world.entities[id]
    if (!entity) return
    patchEntity(
      id,
      {
        images: [
          ...(entity.images ?? []),
          { id: `img.${Date.now().toString(36)}`, src: dataUrl, caption: caption.trim() || undefined, credit: credit.trim() || undefined },
        ],
      },
      'Add image',
    )
    toast(`Image added to ${entity.name}`, 'ok')
    onClose()
  }

  return (
    <Dialog
      title="Add an image"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn primary" onClick={attach} disabled={!dataUrl || !target[0]}>
            Attach to entry
          </button>
        </>
      }
    >
      <div className="field">
        <span className="field-label">Image file</span>
        <input
          ref={input}
          type="file"
          accept="image/*"
          className="input"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            if (file.size > 3_500_000) {
              setError('That file is over 3.5 MB. Images are stored in the browser, so keep them small or the world will not save.')
              return
            }
            setError(null)
            try {
              setDataUrl(await readFileAsDataUrl(file))
            } catch (err) {
              setError(String(err))
            }
          }}
        />
        <div className="field-help">Stored in this browser as a data URL and included in JSON exports.</div>
      </div>

      {error ? (
        <div className="state error" style={{ textAlign: 'left', marginBottom: 'var(--sp-3)' }} role="alert">
          {error}
        </div>
      ) : null}

      {dataUrl ? (
        <div className="gallery-art" style={{ maxWidth: 320, border: '1px solid var(--line)', marginBottom: 'var(--sp-3)' }}>
          <img src={dataUrl} alt="Preview of the selected file" />
        </div>
      ) : null}

      <div className="field">
        <span className="field-label">Attach to</span>
        <RefPicker value={target} onChange={setTarget} single placeholder="Search for the entry this belongs to" />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="img-cap">
          Caption
        </label>
        <input id="img-cap" className="input" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="img-credit">
          Credit
        </label>
        <input id="img-credit" className="input" value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Artist or source" />
      </div>
    </Dialog>
  )
}
