/**
 * Regions and biomes.
 *
 * The region set exists to make the atlas legible: every point of land belongs
 * to exactly one region, and every settlement sits inside the region it is
 * filed under. The names are proposals — the brief established no region
 * names — so each carries a naming question in Design Notes.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION, REGION_NAME } from './registry'
import { BIOME_PAINT } from './geo'

const paint = (id: string) => BIOME_PAINT[id]

export const entities: SeedEntity[] = [
  E({
    id: REGION.ascentBasin,
    type: 'region',
    name: REGION_NAME[REGION.ascentBasin],
    status: 'draft',
    summary: 'The floor of the continent: three river valleys converging on a single pass, and every road that matters.',
    tags: ['core', 'trade', 'grassland'],
    accent: paint(REGION.ascentBasin).color,
    fields: {
      overview:
        'Open river grassland at the centre of the landmass, drained by three forks that meet beneath the escarpment at [[city.gilded-ascent|the Gilded Ascent]]. The basin is not rich in itself. It is rich because everything crossing the continent has to cross it, and because the confluence is the only place a loaded barge can change hands without portage.',
      biome: 'River grassland',
      extent: 'Roughly 520 by 340 leagues, centred on the confluence',
      climate: 'Continental. Hard winters, short violent springs, long dry summers.',
      terrain:
        'Flat alluvial floor cut by braided channels and levees, rising north into the foothills of [[region.ironback-range|the Ironback Range]] and east onto [[region.anvil-shelf|the Anvil Shelf]]. Flood meadows either side of the Long Water are grazed, not ploughed.',
      water:
        'The North Fork, the Karst Fork and the Shelf Fork join at the Ascent and leave east as the Long Water, which runs the length of the continent to the delta.',
      travel: 'Easy — the only easy country on the map',
      hazards:
        'Spring flooding on the levees. Toll banditry on the south stair road in the weeks either side of the great fairs.',
      devNotes: PROPOSAL('Region name, extent and the three fork names are all proposals. The confluence siting is what the brief requires; the rest is scaffolding.'),
    },
  }),

  E({
    id: REGION.anvilShelf,
    type: 'region',
    name: REGION_NAME[REGION.anvilShelf],
    status: 'draft',
    summary: 'A high windswept step east of the basin, and the permanent updraft that holds a city off the ground.',
    tags: ['highland', 'wind'],
    accent: paint(REGION.anvilShelf).color,
    fields: {
      overview:
        'A tilted shelf of hard rock standing 600 to 900 strides above the basin floor. Sun-heated stone and the basin\'s cool air produce a standing thermal at the shelf\'s western lip that does not fail from one season to the next. [[city.sky-city|The Sky City]] rides it.',
      biome: 'Windswept highland',
      extent: 'A crescent some 300 leagues long against the basin\'s eastern edge',
      climate: 'Dry, cold at night, ferociously windy through the afternoon.',
      terrain: 'Bare pavement, frost-shattered scree, thin turf in the hollows. Almost no trees above the lip.',
      water: TBD('Where does the shelf get its water? Springs at the scarp foot, or is everything hauled up?'),
      travel: 'Hard on foot, trivial by lift',
      hazards: 'Rotor turbulence below the lip. Exposure. Falls.',
      devNotes: PROPOSAL('The permanent updraft is the load-bearing invention here: it is what lets the Sky City sit close to the Gilded Ascent, which the brief requires.'),
    },
  }),

  E({
    id: REGION.meridianCoast,
    type: 'region',
    name: REGION_NAME[REGION.meridianCoast],
    status: 'draft',
    summary: 'Warm gulf shore of terraced groves and dependable rain — the only region that reliably grows a surplus.',
    tags: ['mediterranean', 'fertile', 'coastal'],
    accent: paint(REGION.meridianCoast).color,
    fields: {
      overview:
        'The north and west shores of [[region.meridian-gulf|the Meridian Gulf]]. Wet winters, dry summers, deep red soils on the old terraces. This is where the continent\'s oil, wine, fruit and a large part of its bread come from, which is why [[city.mediterranean-city|the Mediterranean City]] can afford to be what it is.',
      biome: 'Mediterranean',
      extent: 'The gulf shore and its hinterland, about 400 leagues of coast',
      climate: 'Mild wet winters, hot dry summers, reliable autumn rain.',
      terrain: 'Stepped limestone terraces, alluvial fans at the river mouths, maquis scrub on the higher ground.',
      water: 'The Olive Water and a dozen shorter streams. Extensive terrace irrigation.',
      travel: 'Easy along the coast road, slow inland',
      hazards: 'Summer fire in the maquis. Squalls in the gulf narrows.',
      devNotes: 'Canon anchor: the technologically advanced city sits in a fertile Mediterranean-like biome. The agronomy here is what makes that city plausible.',
    },
  }),

  E({
    id: REGION.greatwood,
    type: 'region',
    name: REGION_NAME[REGION.greatwood],
    status: 'draft',
    summary: 'Old-growth forest of colossal trunks, held by force and cut under licence.',
    tags: ['forest', 'contested', 'timber'],
    accent: paint(REGION.greatwood).color,
    fields: {
      overview:
        'Temperate old-growth running from the north-west coast to the karst edge. The dominant trees are large enough to be built inside rather than from, which is the whole reason [[city.tree-city|the Tree City]] exists in the shape it does. Every stand is claimed, and the claims do not agree.',
      biome: 'Temperate old-growth forest',
      extent: 'The north-west quarter, roughly 600 by 380 leagues',
      climate: 'Cool, wet, heavy winter snow in the north.',
      terrain: 'Closed canopy over deep leaf litter, broken by windthrow gaps and old burns.',
      water: 'Innumerable small streams, none navigable.',
      travel: 'Slow. Off the marked ways, very slow.',
      hazards:
        'Standing claims are enforced with violence. Windthrow. The canopy makes navigation by sky impossible for days at a time.',
      devNotes: PROPOSAL('Tree scale is the key decision: trunks wide enough to garrison. Everything about the Tree City depends on it.'),
    },
  }),

  E({
    id: REGION.hollowKarst,
    type: 'region',
    name: REGION_NAME[REGION.hollowKarst],
    status: 'draft',
    summary: 'Limestone plateau over a second country of galleries, sinks and rivers that run in the dark.',
    tags: ['karst', 'underground', 'agriculture'],
    accent: paint(REGION.hollowKarst).color,
    fields: {
      overview:
        'On the surface, thin pasture over grey pavement and sudden sinkholes. Underneath, a connected system of galleries large enough to farm, which is what [[city.cave-agrarian-city|the Cave Agrarian City]] does with it. The two levels have different weather, different law and, increasingly, different politics.',
      biome: 'Limestone karst',
      extent: 'West-centre, about 420 by 300 leagues at the surface; the mapped underground is smaller and growing',
      climate: 'Surface: cool and dry. Below: constant, damp, windless.',
      terrain: 'Clints and grikes, dolines, dry valleys, and the entrances — some of which are guarded and some of which are not on any map.',
      water: 'Surface streams sink within a league. The Karst Fork resurges at the plateau edge.',
      travel: 'Deceptive. Fast on the pavement, impossible across the sinks.',
      hazards: 'Sudden collapse. Flooding of low galleries after surface rain. Bad air in the deep workings.',
      devNotes: PROPOSAL('Two-level region: surface and mapped underground. Worth deciding whether the underground is one system or several unconnected ones.'),
    },
  }),

  E({
    id: REGION.ironback,
    type: 'region',
    name: REGION_NAME[REGION.ironback],
    status: 'draft',
    summary: 'The mountain arc that walls the basin off from the north, and the ore that comes down out of it.',
    tags: ['mountains', 'ore'],
    accent: paint(REGION.ironback).color,
    fields: {
      overview:
        'A high folded range curving across the north-centre. It supplies the ore, the meltwater and the single pass that the basin economy runs on, and it kills a predictable number of people every winter doing it.',
      biome: 'Alpine',
      extent: 'An arc of roughly 500 leagues',
      climate: 'Alpine. Snow above the treeline for two thirds of the year.',
      terrain: 'Folded ridges, glaciated cirques, scree, and one crossable pass at the head of the North Fork.',
      water: 'Glacial melt feeding the North Fork.',
      travel: 'Very hard except through the pass',
      hazards: 'Avalanche, exposure, rockfall, and the pass closing without warning.',
      devNotes: TBD('Is the pass the only crossing? A second, worse crossing would give smugglers somewhere to be.'),
    },
  }),

  E({
    id: REGION.borealCrown,
    type: 'region',
    name: REGION_NAME[REGION.borealCrown],
    status: 'draft',
    summary: 'Taiga along the northern coast — thinly held, barely surveyed, cold enough to be its own border guard.',
    tags: ['taiga', 'frontier', 'cold'],
    accent: paint(REGION.borealCrown).color,
    fields: {
      overview:
        'The northern strip beyond the mountains: conifer forest, muskeg and a hard coast. No settlement in this seed claims it. That is deliberate — it is somewhere for the map to still be blank.',
      biome: 'Taiga',
      extent: 'The northern littoral, coast to mountain foot',
      climate: 'Subarctic. Long dark winters.',
      terrain: 'Spruce and larch over permafrost hummocks, bog in the thaw, granite headlands.',
      water: 'Braided cold rivers, frozen five months of the year.',
      travel: 'Seasonal — sledge in winter, near-impassable in the thaw',
      hazards: 'Cold. Distance. Nobody comes looking.',
      devNotes: 'Deliberately underdeveloped. Left as room for the designer to expand into.',
    },
  }),

  E({
    id: REGION.ashenSteppe,
    type: 'region',
    name: REGION_NAME[REGION.ashenSteppe],
    status: 'draft',
    summary: 'Dry grass and old volcanic ash south of the basin; grazing country that turns to dust in a bad year.',
    tags: ['steppe', 'grazing'],
    accent: paint(REGION.ashenSteppe).color,
    fields: {
      overview:
        'A wide belt of short grass over deep ash beds, between the basin and the desert. Good grazing in a wet year, bare in a dry one. [[city.arena-city|The Arena City]] sits on it because the herding routes and the desert road cross here.',
      biome: 'Dry steppe',
      extent: 'A belt some 700 leagues wide across the south-centre',
      climate: 'Semi-arid, hot summers, sharp frosts.',
      terrain: 'Rolling grass over friable ash, cut by dry washes that run once or twice a year.',
      water: 'The Ash Run and a scatter of unreliable wells.',
      travel: 'Fast and exposed',
      hazards: 'Dust storms. Wash floods. No cover of any kind.',
      devNotes: PROPOSAL('The ash beds are a proposal that gives the steppe a reason to be fertile-then-barren, and gives the region a name.'),
    },
  }),

  E({
    id: REGION.cinderWaste,
    type: 'region',
    name: REGION_NAME[REGION.cinderWaste],
    status: 'draft',
    summary: 'True desert in the south-east: stone pavement, dune fields and the road nobody crosses alone.',
    tags: ['desert', 'dangerous'],
    accent: paint(REGION.cinderWaste).color,
    fields: {
      overview:
        'Rain-shadow desert running from the steppe margin to the salt country. [[city.orath|Orath]] stands on its northern edge. The interior is crossed by one road and a number of routes that are not roads.',
      biome: 'Desert',
      extent: 'The south-east quarter',
      climate: 'Arid. Extreme diurnal range.',
      terrain: 'Serir pavement, barchan fields, and long ridges of dark scoria that give the region its working name.',
      water: TBD('Are there reliable wells on the desert road, or is every crossing a supply problem?'),
      travel: 'Dangerous — water-limited',
      hazards: 'Heat, water failure, and organised raiding on the Salt Road.',
      devNotes: PROPOSAL('Named for the scoria ridges. Orath sits on its edge, but Orath itself is canon in name only.'),
    },
  }),

  E({
    id: REGION.whitePans,
    type: 'region',
    name: REGION_NAME[REGION.whitePans],
    status: 'draft',
    summary: 'Salt flats over an old sea, and the mineral beds that made a city out of sieves.',
    tags: ['saltpan', 'mining', 'water-scarce'],
    accent: paint(REGION.whitePans).color,
    fields: {
      overview:
        'The floor of a sea that dried. Bedded evaporites, mineral-rich silts, and a crust that will hold a cart in the morning and not in the afternoon. [[city.sifting-city|The Sifting City]] works it.',
      biome: 'Salt pan',
      extent: 'The deep south-east, about 300 by 260 leagues',
      climate: 'Hyper-arid. Glare is a genuine hazard.',
      terrain: 'Polygonal salt crust over brine-saturated silt, with harder mineral beds beneath.',
      water: 'Brine everywhere, potable water nowhere.',
      travel: 'Dangerous — crust failure',
      hazards: 'Breaking through the crust. Blindness from glare. Total absence of fresh water.',
      devNotes: 'Canon anchor: a desert city built on mineral sifting. The evaporite geology exists to justify the sifting.',
    },
  }),

  E({
    id: REGION.theDrown,
    type: 'region',
    name: REGION_NAME[REGION.theDrown],
    status: 'draft',
    summary: 'The Long Water\'s delta — a shifting marsh where the map is out of date before it is printed.',
    tags: ['marsh', 'delta', 'contested'],
    accent: paint(REGION.theDrown).color,
    fields: {
      overview:
        'Where the Long Water spreads and loses itself. Reed, peat, brackish lagoon and channels that move between surveys. [[city.black-weir|The Black Weir]] stands at its throat and [[city.floating-swamp-settlement|the floating settlement]] lives inside it, and the relationship between those two facts is the region\'s entire politics.',
      biome: 'Delta marsh',
      extent: 'The eastern lowland, roughly 400 by 320 leagues of water and almost-land',
      climate: 'Humid, mild, foggy for much of the year.',
      terrain: 'Reed beds, peat islands, tidal mudflat, drowned forest in the older lobes.',
      water: 'All of it. Channel positions are seasonal.',
      travel: 'Boat only, and only with a pilot',
      hazards: 'Getting lost. Fever. Being found by the wrong pilot.',
      devNotes: 'Canon anchors: a floating swamp settlement exists, and a place called the Black Weir exists. Pairing them upstream/downstream is a proposal.',
    },
  }),

  E({
    id: REGION.mistfallCoast,
    type: 'region',
    name: REGION_NAME[REGION.mistfallCoast],
    status: 'draft',
    summary: 'Cold north-eastern shore under near-permanent sea fog, and the harbours that live off it.',
    tags: ['coastal', 'cold', 'fog'],
    accent: paint(REGION.mistfallCoast).color,
    fields: {
      overview:
        'A cliffed coast where a cold current meets warmer air and produces fog for most of the year. [[city.keth-veyra|Keth Veyra]] is on it. What Keth Veyra is has not been established.',
      biome: 'Cold coast',
      extent: 'The north-eastern littoral',
      climate: 'Cool maritime. Fog on more days than not.',
      terrain: 'Sea cliffs, drowned valleys, shingle strands, spruce on the headlands.',
      water: 'The Cold Race and a series of short steep rivers.',
      travel: 'Coastwise by sea; slow overland',
      hazards: 'Fog. Wrecking coasts. Cold water.',
      devNotes: PROPOSAL('The fog is a proposal chosen to give Keth Veyra a distinct sensory identity without committing to what the city is.'),
    },
  }),

  E({
    id: REGION.aethericScar,
    type: 'region',
    name: REGION_NAME[REGION.aethericScar],
    status: 'draft',
    summary: 'A fault where the rules are locally different, and the city that regulates the difference.',
    tags: ['anomaly', 'magic', 'dangerous'],
    accent: paint(REGION.aethericScar).color,
    fields: {
      overview:
        'A long fracture in the north-east where magical effect is cheaper, stronger and considerably less predictable than anywhere else. [[city.magic-city|The Magic City]] stands on its edge and exists to meter it. The core is not surveyed and the surveys that exist disagree.',
      biome: 'Anomaly',
      extent: 'A fracture zone perhaps 260 leagues long; the affected margin is wider and moves',
      climate: TBD('Does the Scar have weather of its own, or does it only alter magical effect?'),
      terrain: 'Shattered pavement, slabs displaced vertically, stone that has been under strain for a very long time.',
      water: 'Springs that run warm and taste wrong.',
      travel: 'Restricted — entry is licensed',
      hazards: 'Unmetered effect. Structural collapse. Surveyors who do not come back.',
      devNotes: 'Canon anchor: the magical city exists. Siting it on a regulated anomaly is a proposal that makes its licensing regime necessary rather than decorative.',
    },
  }),

  E({
    id: REGION.meridianGulf,
    type: 'region',
    name: REGION_NAME[REGION.meridianGulf],
    status: 'draft',
    summary: 'Warm enclosed sea in the south-west; short crossings, dense traffic, old grudges.',
    tags: ['sea', 'trade'],
    accent: paint(REGION.meridianGulf).color,
    fields: {
      overview: 'A deep warm gulf biting north-east into the continent. Short crossings and a long shore make it the busiest water on the map.',
      biome: 'Warm sea',
      extent: 'The south-western embayment',
      climate: 'Warm, with hard autumn squalls in the narrows.',
      terrain: 'Deep centre, shelving shores, a scatter of islets in the head.',
      water: 'Weakly tidal.',
      travel: 'Easy by sea',
      hazards: 'Narrows squalls. Crowded lanes.',
      devNotes: TBD('Are there islands worth naming in the gulf head?'),
    },
  }),

  E({
    id: REGION.easternDeep,
    type: 'region',
    name: REGION_NAME[REGION.easternDeep],
    status: 'draft',
    summary: 'Open ocean off the east coast. Nothing on this map claims to know what is across it.',
    tags: ['sea', 'unknown'],
    accent: paint(REGION.easternDeep).color,
    fields: {
      overview: 'The eastern ocean. Deep water close inshore, a cold current running south, and no established canon about what lies beyond it.',
      biome: 'Ocean',
      extent: 'East of the coast, unbounded',
      climate: 'Cold current north, warmer south.',
      terrain: 'Deep water. A narrow shelf off the delta.',
      water: 'Strongly tidal at the delta mouth.',
      travel: 'Coastwise only in this seed',
      hazards: TBD('Is there anything across the Eastern Deep? This is a large unanswered question about the shape of the setting.'),
      devNotes: 'Left open on purpose. Whether the world is one continent or several is a decision the brief did not make.',
    },
  }),
]

export const relations: SeedRelation[] = [
  R(CITY.gildedAscent, 'located_in', REGION.ascentBasin),
  R(CITY.skyCity, 'located_in', REGION.anvilShelf),
  R(CITY.mediterranean, 'located_in', REGION.meridianCoast),
  R(CITY.treeCity, 'located_in', REGION.greatwood),
  R(CITY.caveAgrarian, 'located_in', REGION.hollowKarst),
  R(CITY.oruvai, 'located_in', REGION.hollowKarst),
  R(CITY.siftingCity, 'located_in', REGION.whitePans),
  R(CITY.magicCity, 'located_in', REGION.aethericScar),
  R(CITY.arenaCity, 'located_in', REGION.ashenSteppe),
  R(CITY.floatingSwamp, 'located_in', REGION.theDrown),
  R(CITY.blackWeir, 'located_in', REGION.theDrown),
  R(CITY.orath, 'located_in', REGION.cinderWaste),
  R(CITY.kethVeyra, 'located_in', REGION.mistfallCoast),

  R(REGION.ascentBasin, 'related_to', REGION.ironback, 'drains the northern glaciers'),
  R(REGION.ascentBasin, 'related_to', REGION.anvilShelf, 'the shelf overlooks the basin'),
  R(REGION.ascentBasin, 'related_to', REGION.theDrown, 'the Long Water connects them'),
  R(REGION.theDrown, 'related_to', REGION.easternDeep, 'the delta mouth'),
  R(REGION.meridianCoast, 'related_to', REGION.meridianGulf, 'wraps its northern shore'),
  R(REGION.cinderWaste, 'related_to', REGION.whitePans, 'the desert bottoms out in the pans'),
  R(REGION.ashenSteppe, 'related_to', REGION.cinderWaste, 'grass gives way to stone'),
  R(REGION.greatwood, 'related_to', REGION.hollowKarst, 'the forest ends where the pavement starts'),
  R(REGION.aethericScar, 'related_to', REGION.mistfallCoast, 'the fracture runs out under the coast'),
]
