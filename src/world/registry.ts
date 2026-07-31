/**
 * Canonical id registry.
 *
 * Ids are stable, human-readable and shared across every content module so
 * cross-links resolve. Format is `<type>.<slug>` — the same shape `makeId`
 * produces for entries created in the app.
 *
 * CANON POLICY
 * ------------
 * The project brief is the only source of established canon. Facts taken
 * from it are marked `status: 'canon'` and listed in `CANON_ANCHORS` below.
 * Everything else in this seed is a proposal: `status: 'draft'`, with real
 * unknowns recorded as `TBD(question)` and gathered into design questions
 * rather than filled with invented detail.
 */

/* ------------------------------------------------------------------ */
/* Settlements                                                         */
/* ------------------------------------------------------------------ */

export const CITY = {
  gildedAscent: 'city.gilded-ascent',
  skyCity: 'city.sky-city',
  mediterranean: 'city.mediterranean-city',
  treeCity: 'city.tree-city',
  caveAgrarian: 'city.cave-agrarian-city',
  siftingCity: 'city.sifting-city',
  magicCity: 'city.magic-city',
  arenaCity: 'city.arena-city',
  floatingSwamp: 'city.floating-swamp-settlement',
  blackWeir: 'city.black-weir',
  orath: 'city.orath',
  oruvai: 'city.oruvai',
  kethVeyra: 'city.keth-veyra',
} as const

export const CITY_IDS = Object.values(CITY)

/** Display names, so modules never hard-code a string that might drift. */
export const CITY_NAME: Record<string, string> = {
  [CITY.gildedAscent]: 'The Gilded Ascent',
  [CITY.skyCity]: 'The Sky City',
  [CITY.mediterranean]: 'The Mediterranean City',
  [CITY.treeCity]: 'The Tree City',
  [CITY.caveAgrarian]: 'The Cave Agrarian City',
  [CITY.siftingCity]: 'The Sifting City',
  [CITY.magicCity]: 'The Magic City',
  [CITY.arenaCity]: 'The Arena City',
  [CITY.floatingSwamp]: 'The Floating Swamp Settlement',
  [CITY.blackWeir]: 'The Black Weir',
  [CITY.orath]: 'Orath',
  [CITY.oruvai]: 'Oruvai',
  [CITY.kethVeyra]: 'Keth Veyra',
}

/** Names the brief established. The rest are working titles pending a decision. */
export const CANON_NAMES = new Set<string>([
  CITY.gildedAscent,
  CITY.blackWeir,
  CITY.orath,
  CITY.oruvai,
  CITY.kethVeyra,
])

/* ------------------------------------------------------------------ */
/* Regions                                                             */
/* ------------------------------------------------------------------ */

export const REGION = {
  borealCrown: 'region.boreal-crown',
  ironback: 'region.ironback-range',
  greatwood: 'region.the-greatwood',
  hollowKarst: 'region.hollow-karst',
  ascentBasin: 'region.ascent-basin',
  anvilShelf: 'region.anvil-shelf',
  meridianCoast: 'region.meridian-coast',
  ashenSteppe: 'region.ashen-steppe',
  cinderWaste: 'region.cinder-waste',
  whitePans: 'region.white-pans',
  theDrown: 'region.the-drown',
  mistfallCoast: 'region.mistfall-coast',
  aethericScar: 'region.aetheric-scar',
  meridianGulf: 'region.meridian-gulf',
  easternDeep: 'region.eastern-deep',
} as const

export const REGION_NAME: Record<string, string> = {
  [REGION.borealCrown]: 'The Boreal Crown',
  [REGION.ironback]: 'The Ironback Range',
  [REGION.greatwood]: 'The Greatwood',
  [REGION.hollowKarst]: 'The Hollow Karst',
  [REGION.ascentBasin]: 'The Ascent Basin',
  [REGION.anvilShelf]: 'The Anvil Shelf',
  [REGION.meridianCoast]: 'The Meridian Coast',
  [REGION.ashenSteppe]: 'The Ashen Steppe',
  [REGION.cinderWaste]: 'The Cinder Waste',
  [REGION.whitePans]: 'The White Pans',
  [REGION.theDrown]: 'The Drown',
  [REGION.mistfallCoast]: 'The Mistfall Coast',
  [REGION.aethericScar]: 'The Aetheric Scar',
  [REGION.meridianGulf]: 'The Meridian Gulf',
  [REGION.easternDeep]: 'The Eastern Deep',
}

/** Which region each settlement sits in. */
export const CITY_REGION: Record<string, string> = {
  [CITY.gildedAscent]: REGION.ascentBasin,
  [CITY.skyCity]: REGION.anvilShelf,
  [CITY.mediterranean]: REGION.meridianCoast,
  [CITY.treeCity]: REGION.greatwood,
  [CITY.caveAgrarian]: REGION.hollowKarst,
  [CITY.siftingCity]: REGION.whitePans,
  [CITY.magicCity]: REGION.aethericScar,
  [CITY.arenaCity]: REGION.ashenSteppe,
  [CITY.floatingSwamp]: REGION.theDrown,
  [CITY.blackWeir]: REGION.theDrown,
  [CITY.orath]: REGION.cinderWaste,
  [CITY.oruvai]: REGION.hollowKarst,
  [CITY.kethVeyra]: REGION.mistfallCoast,
}

/* ------------------------------------------------------------------ */
/* Skill trees                                                         */
/* ------------------------------------------------------------------ */

export const TREE = {
  bodyAndBlade: 'Body & Blade',
  craftAndMachine: 'Craft & Machine',
  wildAndWays: 'Wild & Ways',
  tongueAndCoin: 'Tongue & Coin',
  arcanaAndRisk: 'Arcana & Risk',
} as const

/* ------------------------------------------------------------------ */
/* Canon anchors                                                       */
/* ------------------------------------------------------------------ */

export interface CanonAnchor {
  subject: string
  fact: string
}

/** Every statement the brief establishes. Nothing else is treated as canon. */
export const CANON_ANCHORS: CanonAnchor[] = [
  { subject: CITY.gildedAscent, fact: 'Sits near the centre of the world and is the logical main trading hub.' },
  { subject: CITY.skyCity, fact: 'A wealthy sky city, positioned comparatively close to the commercial centre.' },
  { subject: CITY.mediterranean, fact: 'The technologically advanced city; sits in a fertile Mediterranean-like biome.' },
  { subject: CITY.treeCity, fact: 'A militarised tree city.' },
  { subject: CITY.caveAgrarian, fact: 'A cave-based agricultural civilisation.' },
  { subject: CITY.siftingCity, fact: 'A desert city built on mineral sifting.' },
  { subject: CITY.magicCity, fact: 'A magical city.' },
  { subject: CITY.arenaCity, fact: 'An arena city.' },
  { subject: CITY.floatingSwamp, fact: 'A floating swamp settlement.' },
  { subject: CITY.blackWeir, fact: 'An established location named The Black Weir. Concept not yet defined.' },
  { subject: CITY.orath, fact: 'An established location named Orath. Concept not yet defined.' },
  { subject: CITY.oruvai, fact: 'An established location named Oruvai. Concept not yet defined.' },
  { subject: CITY.kethVeyra, fact: 'An established location named Keth Veyra. Concept not yet defined.' },
  { subject: 'world', fact: 'Cities are not arranged in a circle; siting follows geography, resources, politics, trade and history.' },
  { subject: 'world', fact: 'Major cities are widely spaced, leaving room for wilderness, villages, ruins, resources, roads and minor settlements.' },
  { subject: 'world', fact: 'Each city keeps a visibly unique footprint, architecture, colour, terrain and central landmark.' },
  {
    subject: 'world',
    fact: 'Tone blends grounded fantasy, magic, gritty politics, unusual biology, dark themes and restrained science fiction.',
  },
]

/** Standard dev-note preamble for a proposed concept. */
export const PROPOSAL = (what: string) =>
  `Proposed concept, not established canon. ${what} Overwrite freely — the name and the entry's existence are the only fixed points.`
