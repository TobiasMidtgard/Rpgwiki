/**
 * Core relational data model.
 *
 * Everything in the wiki is an `Entity` plus a set of typed `Relation` edges.
 * Adding a new entity type means adding a `TypeSchema` — no application
 * surgery, no new tables, no new pages.
 */

export const ENTITY_TYPES = [
  'region',
  'city',
  'district',
  'landmark',
  'site',
  'faction',
  'npc',
  'quest',
  'item',
  'material',
  'machine',
  'recipe',
  'creature',
  'spell',
  'food',
  'religion',
  'mechanic',
  'skill',
  'event',
  'war',
  'route',
  'deposit',
  'note',
] as const

export type EntityType = (typeof ENTITY_TYPES)[number]

/** Editorial status. Drives colour coding across the whole wiki. */
export const STATUSES = ['canon', 'draft', 'alt', 'review', 'deprecated'] as const
export type Status = (typeof STATUSES)[number]

export const STATUS_META: Record<Status, { label: string; short: string; hint: string }> = {
  canon: { label: 'Canon', short: 'C', hint: 'Established and locked. Change only with intent.' },
  draft: { label: 'Draft', short: 'D', hint: 'Proposed. Not yet confirmed as canon.' },
  alt: { label: 'Alternative concept', short: 'A', hint: 'A competing option kept for comparison.' },
  review: { label: 'Needs review', short: 'R', hint: 'Flagged — something here needs a decision.' },
  deprecated: { label: 'Deprecated', short: 'X', hint: 'Superseded. Kept for history only.' },
}

/**
 * A field that is knowingly unresolved.
 *
 * The world bible is incomplete by design; unknowns are recorded as open
 * questions instead of being filled with invented detail.
 */
export interface Tbd {
  __tbd: true
  /** Optional phrasing of the open design question. */
  q?: string
}

export const TBD = (q?: string): Tbd => ({ __tbd: true, ...(q ? { q } : {}) })
export const isTbd = (v: unknown): v is Tbd =>
  typeof v === 'object' && v !== null && (v as Tbd).__tbd === true

/** A row in a structured table field. */
export type TableRow = Record<string, string>

export type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | TableRow[]
  | Tbd
  | null
  | undefined

export interface ImageRef {
  id: string
  /** `gen:<generatorKey>` for procedural artwork, or a data URL for uploads. */
  src: string
  caption?: string
  credit?: string
}

/** User-defined field, added per entity without touching the schema. */
export interface CustomField {
  id: string
  label: string
  kind: 'text' | 'longtext' | 'number' | 'tags'
  value: FieldValue
  group?: string
}

export interface Entity {
  id: string
  type: EntityType
  name: string
  /** Set when `name` is a working title rather than settled canon. */
  workingTitle?: boolean
  aka?: string[]
  status: Status
  /** One-line description used in cards, search results and inspectors. */
  summary?: string
  tags: string[]
  /** Schema-driven values, keyed by `FieldDef.key`. */
  fields: Record<string, FieldValue>
  custom?: CustomField[]
  images?: ImageRef[]
  /** Accent colour override; otherwise derived from the type. */
  accent?: string
  archived?: boolean
  createdAt: number
  updatedAt: number
}

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const RELATION_KINDS = [
  'located_in',
  'contains',
  'controls',
  'contests',
  'member_of',
  'leads',
  'allied_with',
  'rival_of',
  'at_war_with',
  'truce_with',
  'owes_debt_to',
  'infiltrates',
  'secretly_cooperates_with',
  'trades_with',
  'smuggles_with',
  'produces',
  'consumes',
  'requires',
  'refines_into',
  'crafted_at',
  'sold_by',
  'used_by',
  'grants',
  'unlocks',
  'prerequisite_of',
  'gives_quest',
  'involves',
  'affects',
  'follows',
  'rewards',
  'worships',
  'inhabits',
  'related_to',
] as const

export type RelationKind = (typeof RELATION_KINDS)[number]

export interface RelationMeta {
  label: string
  /** How the edge reads from the target's point of view. Powers backlinks. */
  inverse: string
  /** Backlink heading the edge is filed under on the target page. */
  backlinkGroup: string
  /** Rendered as a hostile/among-enemies edge in graphs and matrices. */
  hostile?: boolean
  /** Edge is deliberately hidden knowledge — shown only with secrets revealed. */
  covert?: boolean
}

export const RELATION_META: Record<RelationKind, RelationMeta> = {
  located_in: { label: 'Located in', inverse: 'Contains', backlinkGroup: 'Found in' },
  contains: { label: 'Contains', inverse: 'Part of', backlinkGroup: 'Found in' },
  controls: { label: 'Controls', inverse: 'Controlled by', backlinkGroup: 'Controlled by' },
  contests: { label: 'Contests', inverse: 'Contested by', backlinkGroup: 'Contested by', hostile: true },
  member_of: { label: 'Member of', inverse: 'Members', backlinkGroup: 'Members' },
  leads: { label: 'Leads', inverse: 'Led by', backlinkGroup: 'Leadership' },
  allied_with: { label: 'Allied with', inverse: 'Allied with', backlinkGroup: 'Allies' },
  rival_of: { label: 'Rival of', inverse: 'Rival of', backlinkGroup: 'Rivals', hostile: true },
  at_war_with: { label: 'At war with', inverse: 'At war with', backlinkGroup: 'At war with', hostile: true },
  truce_with: { label: 'Truce with', inverse: 'Truce with', backlinkGroup: 'Truces' },
  owes_debt_to: { label: 'Owes debt to', inverse: 'Creditor of', backlinkGroup: 'Debts' },
  infiltrates: { label: 'Infiltrates', inverse: 'Infiltrated by', backlinkGroup: 'Infiltration', hostile: true, covert: true },
  secretly_cooperates_with: {
    label: 'Secretly cooperates with',
    inverse: 'Secretly cooperates with',
    backlinkGroup: 'Secret cooperation',
    covert: true,
  },
  trades_with: { label: 'Trades with', inverse: 'Trades with', backlinkGroup: 'Trade partners' },
  smuggles_with: { label: 'Smuggling link', inverse: 'Smuggling link', backlinkGroup: 'Smuggling links', covert: true },
  produces: { label: 'Produces', inverse: 'Produced by', backlinkGroup: 'Produced by' },
  consumes: { label: 'Consumes', inverse: 'Consumed by', backlinkGroup: 'Consumed by' },
  requires: { label: 'Requires', inverse: 'Required for', backlinkGroup: 'Required for' },
  refines_into: { label: 'Refines into', inverse: 'Refined from', backlinkGroup: 'Refined from' },
  crafted_at: { label: 'Crafted at', inverse: 'Crafts', backlinkGroup: 'Crafts' },
  sold_by: { label: 'Sold by', inverse: 'Sells', backlinkGroup: 'Sells' },
  used_by: { label: 'Used by', inverse: 'Uses', backlinkGroup: 'Uses' },
  grants: { label: 'Grants', inverse: 'Granted by', backlinkGroup: 'Granted by' },
  unlocks: { label: 'Unlocks', inverse: 'Unlocked by', backlinkGroup: 'Unlocked by' },
  prerequisite_of: { label: 'Prerequisite of', inverse: 'Requires', backlinkGroup: 'Prerequisites' },
  gives_quest: { label: 'Gives quest', inverse: 'Given by', backlinkGroup: 'Quest giver for' },
  involves: { label: 'Involves', inverse: 'Involved in', backlinkGroup: 'Involved in' },
  affects: { label: 'Affects', inverse: 'Affected by', backlinkGroup: 'Affected by' },
  follows: { label: 'Follows on from', inverse: 'Leads to', backlinkGroup: 'Follow-ups' },
  rewards: { label: 'Rewards', inverse: 'Rewarded by', backlinkGroup: 'Rewarded by' },
  worships: { label: 'Worships', inverse: 'Worshipped by', backlinkGroup: 'Worshipped by' },
  inhabits: { label: 'Inhabits', inverse: 'Home to', backlinkGroup: 'Local creatures' },
  related_to: { label: 'Related to', inverse: 'Related to', backlinkGroup: 'Referenced by' },
}

export interface Relation {
  id: string
  from: string
  to: string
  kind: RelationKind
  /** Free-text qualifier, e.g. "since the Weir Accord" or "grain, salt". */
  note?: string
  /** Hidden until the reader opts into spoilers. */
  secret?: boolean
}

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

export type FieldKind =
  | 'text'
  | 'longtext'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'tags'
  | 'bool'
  | 'list'
  | 'table'
  | 'refs'

export interface FieldDef {
  key: string
  label: string
  kind: FieldKind
  /** Section key this field is rendered under. */
  group: string
  help?: string
  options?: string[]
  /** For `refs`: which entity types the picker offers. */
  refTypes?: EntityType[]
  /** For `table`: column keys and labels. */
  columns?: { key: string; label: string }[]
  placeholder?: string
  /** Show in the compact inspector / card summary. */
  key_fact?: boolean
}

export interface GroupDef {
  key: string
  label: string
  /** Tab this group belongs to on the entity page. */
  tab?: string
}

export interface TypeSchema {
  type: EntityType
  label: string
  plural: string
  /** Short glyph used in markers, chips and nav. */
  glyph: string
  /** CSS custom-property colour token name, e.g. `--t-city`. */
  accentVar: string
  /** Route segment, e.g. `cities`. */
  route: string
  tabs?: { key: string; label: string }[]
  groups: GroupDef[]
  fields: FieldDef[]
}

/* ------------------------------------------------------------------ */
/* Map geometry                                                        */
/* ------------------------------------------------------------------ */

/** World coordinates. The map canvas is WORLD_W x WORLD_H units. */
export const WORLD_W = 2400
export const WORLD_H = 1600

export type Point = [number, number]

export type MapLayerId =
  | 'coast'
  | 'relief'
  | 'biomes'
  | 'rivers'
  | 'regions'
  | 'political'
  | 'territory'
  | 'roads'
  | 'sea'
  | 'trade'
  | 'smuggling'
  | 'conflict'
  | 'deposits'
  | 'quests'
  | 'settlements'
  | 'minor'
  | 'labels'

export interface BiomeDef {
  id: string
  name: string
  /** Colour in the fully-coloured biome mode. */
  color: string
  /** Muted wash used in illustrated paper mode. */
  paper: string
  /** Repeating symbol drawn across the region on the paper map. */
  motif: 'forest' | 'conifer' | 'grass' | 'dune' | 'marsh' | 'karst' | 'peak' | 'olive' | 'salt' | 'ash' | 'scrub' | 'none'
  description: string
}

export interface RegionShape {
  /** Matches a `region` entity id. */
  id: string
  biome: string
  polygon: Point[]
}

export interface RouteShape {
  id: string
  kind: 'road' | 'sea' | 'trade' | 'smuggling' | 'river'
  path: Point[]
  /** Relative importance; drives stroke weight. */
  weight?: number
}

export interface ZoneShape {
  id: string
  kind: 'war' | 'disputed' | 'danger' | 'territory' | 'influence'
  /** Owning faction (territory/influence) or null. */
  faction?: string
  polygon: Point[]
  label?: string
}

/** Anything with a position on the world map. */
export interface MapMarker {
  /** Entity id, or a synthetic id for map-only features. */
  id: string
  x: number
  y: number
  layer: MapLayerId
}
