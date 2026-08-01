/**
 * Rosters — "what is actually here".
 *
 * A city page carries twenty-seven sections of prose, and the things that live,
 * grow and are dug up around it were reachable only as bare name chips. A
 * roster turns each of those into a browsable category: what it is, what it
 * looks like, one line on why it matters, and a way in.
 *
 * Nothing here invents canon. A category is a filter over entries that already
 * link to the host, narrowed by the classifying field the entry's own schema
 * defines — `material.origin`, `food.foodType`. If the world does not say an
 * entry is a plant, it will not appear under Flora; it lands in whichever
 * category its recorded classification puts it, or in none.
 */

import type { Entity, EntityType } from './types'
import type { WorldState } from './store'
import type { WorldIndex } from './relations'
import { SCHEMAS } from './schema'

export interface RosterCategory {
  key: string
  label: string
  /** Entry types that can qualify at all. */
  types: EntityType[]
  /** Further narrowing on a canon classifier field. Absent means "any". */
  where?: (e: Entity) => boolean
  /** What the reader would have to link for this category to fill up. */
  empty: string
}

export interface RosterItem {
  entity: Entity
  /**
   * Set when the entry reaches the host through its region rather than being
   * linked to it directly — characteristic wildlife, regional deposits. Shown
   * on the card, because "grows in this biome" is a weaker claim than "grows
   * in this city" and the page should not blur the two.
   */
  via?: Entity
}

/* ------------------------------------------------------------------ */
/* Classification                                                      */
/* ------------------------------------------------------------------ */

const field = (e: Entity, key: string): string | undefined => {
  const v = e.fields[key]
  return typeof v === 'string' ? v : undefined
}

const refCount = (e: Entity, key: string): number => {
  const v = e.fields[key]
  return Array.isArray(v) ? v.length : 0
}

/** Plants and fungi: crops and forage, plus materials the world calls biological. */
const isFlora = (e: Entity) =>
  (e.type === 'food' && ['Crop', 'Forage', 'Fungus'].includes(field(e, 'foodType') ?? '')) ||
  (e.type === 'material' && field(e, 'origin') === 'Biological' && refCount(e, 'sourceCreature') === 0)

/** Rock, ore and anything the ground yields untouched. */
const isMineral = (e: Entity) => e.type === 'deposit' || (e.type === 'material' && field(e, 'origin') === 'Natural')

/** Biological materials the world traces back to a named creature. */
const isCreatureProduct = (e: Entity) =>
  e.type === 'material' && field(e, 'origin') === 'Biological' && refCount(e, 'sourceCreature') > 0

/** Made rather than found. */
const isWorked = (e: Entity) =>
  e.type === 'material' && ['Synthetic', 'Hybrid', 'Anomalous'].includes(field(e, 'origin') ?? '')

const isLivestock = (e: Entity) => e.type === 'food' && field(e, 'foodType') === 'Livestock'

/** Food as a table sees it, rather than as a field does. */
const isPrepared = (e: Entity) =>
  e.type === 'food' && ['Preserved', 'Prepared', 'Drink'].includes(field(e, 'foodType') ?? '')

/* ------------------------------------------------------------------ */
/* Categories, filed under the city section they belong to             */
/* ------------------------------------------------------------------ */

const cat = (
  key: string,
  label: string,
  types: EntityType[],
  empty: string,
  where?: (e: Entity) => boolean,
): RosterCategory => ({ key, label, types, empty, where })

/**
 * Keyed by the city schema group the roster is rendered into, so a section
 * gains categories by being listed here and nothing else has to change.
 */
export const CITY_ROSTERS: Record<string, RosterCategory[]> = {
  citymap: [cat('districts', 'Districts & quarters', ['district'], 'Link a district to this city.')],

  landmark: [cat('landmarks', 'Landmarks & notable buildings', ['landmark'], 'Link a landmark to this city.')],

  infrastructure: [cat('machines', 'Machines & interactables', ['machine'], 'Link a machine to this city.')],

  population: [cat('cultures', 'Cultures & faiths', ['religion'], 'Link a religion or culture to this city.')],

  sustenance: [
    cat('livestock', 'Livestock', ['food'], 'Link a food entry classified as livestock.', isLivestock),
    cat('prepared', 'Food & drink', ['food'], 'Link a preserved, prepared or drink food entry.', isPrepared),
  ],

  resources: [
    cat('flora', 'Flora', ['food', 'material'], 'Link a crop, forage, fungus or biological material.', isFlora),
    cat('minerals', 'Minerals & deposits', ['deposit', 'material'], 'Link a deposit or a natural material.', isMineral),
    cat(
      'creature-products',
      'Creature products',
      ['material'],
      'Link a biological material that names a source creature.',
      isCreatureProduct,
    ),
    cat('worked', 'Worked & synthetic materials', ['material'], 'Link a synthetic or hybrid material.', isWorked),
  ],

  factions: [cat('factions', 'Factions present', ['faction'], 'Link a faction to this city.')],

  npcs: [cat('people', 'People', ['npc'], 'Give an NPC a home or current location here.')],

  quests: [cat('quests', 'Quests', ['quest'], 'Set a quest’s starting location to this city.')],

  services: [cat('items', 'Items & services', ['item'], 'Link an item to this city.')],

  creatures: [cat('fauna', 'Fauna', ['creature'], 'Link a creature to this city, or to its region.')],

  mechanics: [cat('mechanics', 'Signature mechanics', ['mechanic'], 'Link a game mechanic to this city.')],

  location: [cat('sites', 'Wilderness sites nearby', ['site'], 'Link a wilderness site to this city or its region.')],
}

/* ------------------------------------------------------------------ */
/* Derivation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Everything one hop from `id` along a relation or a reference field.
 *
 * Inline prose mentions are deliberately excluded: a city named in passing in
 * a creature's description is not evidence the creature lives there, and a
 * roster that treats it as such fills up with noise.
 */
function linked(index: WorldIndex, id: string): string[] {
  const out: string[] = []
  for (const e of index.out[id] ?? []) if (e.origin !== 'inline') out.push(e.to)
  for (const e of index.in[id] ?? []) if (e.origin !== 'inline') out.push(e.from)
  return [...new Set(out)]
}

export function rosterItems(
  world: WorldState,
  index: WorldIndex,
  hostId: string,
  category: RosterCategory,
  opts: { includeRegion?: boolean } = {},
): RosterItem[] {
  const { includeRegion = true } = opts
  const types = new Set<string>(category.types)
  const qualifies = (e: Entity | undefined): e is Entity =>
    !!e && !e.archived && types.has(e.type) && (!category.where || category.where(e))

  const seen = new Set<string>([hostId])
  const items: RosterItem[] = []

  for (const id of linked(index, hostId)) {
    const e = world.entities[id]
    if (qualifies(e) && !seen.has(id)) {
      seen.add(id)
      items.push({ entity: e })
    }
  }

  // A city inherits its biome's wildlife and mineralogy. Kept separate and
  // labelled rather than merged, so a regional claim never reads as a local one.
  if (includeRegion) {
    const regions = linked(index, hostId)
      .map((id) => world.entities[id])
      .filter((e): e is Entity => !!e && e.type === 'region' && !e.archived)
    for (const region of regions) {
      for (const id of linked(index, region.id)) {
        const e = world.entities[id]
        if (qualifies(e) && !seen.has(id)) {
          seen.add(id)
          items.push({ entity: e, via: region })
        }
      }
    }
  }

  // Directly linked first, then alphabetical — a stable order that puts the
  // city's own entries above anything inherited from the map around it.
  return items.sort((a, b) => {
    if (!a.via !== !b.via) return a.via ? 1 : -1
    return a.entity.name.localeCompare(b.entity.name)
  })
}

/**
 * The one-word classification worth putting on a card — a creature's threat, a
 * material's origin, a quest's type.
 *
 * Taken from the schema rather than a list of field names kept here, so a type
 * that gains or renames a classifier is picked up without this file knowing.
 * Preference goes to a key fact, since that is the schema's own statement about
 * which field identifies the entry at a glance.
 */
export function classifierOf(e: Entity): string | undefined {
  const defs = SCHEMAS[e.type]?.fields ?? []
  const def = defs.find((d) => d.kind === 'select' && d.key_fact) ?? defs.find((d) => d.kind === 'select')
  if (!def) return undefined
  const v = e.fields[def.key]
  return typeof v === 'string' && v.trim() ? v : undefined
}
