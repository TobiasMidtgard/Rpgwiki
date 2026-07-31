/**
 * The four settlements of the water and the margins: the drifting raft town of
 * the Drown, the weir that stands upstream of it, and the two named-only cities
 * at Oruvai and Keth Veyra.
 *
 * Canon here is thin and clearly marked. The floating settlement's identity,
 * its Moorstone landmark and its palette are canon. The Black Weir, Oruvai and
 * Keth Veyra are canon names attached to nothing at all; the Weir is written up
 * as a full labelled proposal because it pairs with the raft town, and the other
 * two are kept deliberately light so they can be decided later without unpicking
 * invented history.
 */

import { E, R, TBD, row, type CityMap, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* City maps                                                           */
/* ------------------------------------------------------------------ */

/** Scattered clusters on open water: raft combs that keep their shape and change their address. */
const FLOATING_SWAMP_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.floating-swamp-settlement-the-stone-lots',
      polygon: [
        [440, 300],
        [520, 285],
        [575, 315],
        [585, 375],
        [530, 410],
        [455, 400],
        [420, 350],
      ],
    },
    {
      id: 'district.floating-swamp-settlement-sixteen-knot',
      polygon: [
        [140, 150],
        [250, 130],
        [330, 160],
        [340, 225],
        [260, 265],
        [160, 250],
        [112, 200],
      ],
    },
    {
      id: 'district.floating-swamp-settlement-the-gas-fleet',
      polygon: [
        [700, 205],
        [800, 180],
        [880, 215],
        [890, 285],
        [810, 325],
        [720, 305],
        [678, 255],
      ],
    },
    {
      id: 'district.floating-swamp-settlement-the-cane-yards',
      polygon: [
        [160, 480],
        [265, 462],
        [335, 500],
        [340, 570],
        [262, 610],
        [172, 592],
        [130, 535],
      ],
    },
    {
      id: 'district.floating-swamp-settlement-tail-lots',
      polygon: [
        [520, 530],
        [625, 512],
        [705, 545],
        [712, 612],
        [630, 652],
        [535, 635],
        [495, 578],
      ],
    },
    {
      id: 'district.floating-swamp-settlement-the-stilt-hundred',
      polygon: [
        [790, 420],
        [890, 400],
        [955, 440],
        [960, 510],
        [885, 552],
        [800, 538],
        [762, 470],
      ],
    },
  ],
  water: [
    [
      [0, 120],
      [180, 80],
      [420, 110],
      [640, 70],
      [860, 110],
      [1000, 90],
      [1000, 640],
      [820, 680],
      [560, 660],
      [300, 690],
      [80, 650],
      [0, 600],
    ],
    [
      [0, 330],
      [160, 300],
      [340, 330],
      [520, 300],
      [700, 330],
      [880, 300],
      [1000, 325],
      [1000, 360],
      [880, 340],
      [700, 372],
      [520, 345],
      [340, 372],
      [160, 345],
      [0, 372],
    ],
  ],
  roads: [
    [
      [500, 300],
      [400, 250],
      [300, 215],
    ],
    [
      [580, 330],
      [660, 300],
      [700, 265],
    ],
    [
      [460, 395],
      [380, 470],
      [320, 510],
    ],
    [
      [540, 405],
      [570, 480],
      [600, 530],
    ],
    [
      [700, 570],
      [760, 520],
      [790, 490],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-moorstone', at: [500, 345] },
    { id: 'landmark.the-lot-board', at: [455, 352] },
    { id: 'landmark.the-drowned-stand', at: [905, 610] },
  ],
}

/** A barrage: one hard straight line across the river, works on both banks, apron below. */
const BLACK_WEIR_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.black-weir-the-gate-works',
      polygon: [
        [150, 302],
        [400, 294],
        [600, 296],
        [860, 302],
        [860, 370],
        [600, 376],
        [400, 374],
        [150, 368],
      ],
    },
    {
      id: 'district.black-weir-the-slack',
      polygon: [
        [180, 122],
        [420, 104],
        [660, 112],
        [830, 140],
        [820, 205],
        [650, 182],
        [420, 178],
        [195, 190],
      ],
    },
    {
      id: 'district.black-weir-the-gantry-yards',
      polygon: [
        [42, 214],
        [140, 208],
        [146, 300],
        [146, 372],
        [138, 462],
        [46, 470],
        [20, 340],
      ],
    },
    {
      id: 'district.black-weir-hammer-row',
      polygon: [
        [872, 216],
        [962, 226],
        [986, 340],
        [960, 452],
        [874, 464],
        [866, 340],
      ],
    },
    {
      id: 'district.black-weir-the-toll-house',
      polygon: [
        [206, 404],
        [360, 394],
        [462, 414],
        [470, 490],
        [352, 518],
        [212, 502],
        [186, 452],
      ],
    },
    {
      id: 'district.black-weir-lampside',
      polygon: [
        [512, 402],
        [676, 392],
        [812, 414],
        [838, 486],
        [700, 534],
        [548, 528],
        [498, 462],
      ],
    },
  ],
  water: [
    [
      [0, 0],
      [1000, 0],
      [1000, 296],
      [860, 290],
      [600, 292],
      [300, 290],
      [150, 296],
      [0, 290],
    ],
    [
      [0, 482],
      [190, 472],
      [200, 532],
      [478, 528],
      [500, 546],
      [838, 548],
      [872, 470],
      [1000, 480],
      [1000, 700],
      [0, 700],
    ],
  ],
  walls: [
    [130, 255],
    [300, 250],
    [600, 248],
    [880, 255],
    [995, 330],
    [880, 478],
    [600, 556],
    [300, 540],
    [110, 470],
    [95, 340],
  ],
  roads: [
    [
      [140, 340],
      [200, 336],
      [300, 332],
    ],
    [
      [790, 334],
      [862, 336],
      [905, 340],
    ],
    [
      [330, 376],
      [326, 400],
    ],
    [
      [660, 378],
      [664, 400],
    ],
    [
      [468, 452],
      [500, 452],
    ],
    [
      [500, 190],
      [502, 250],
      [504, 296],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-weir-gates', at: [500, 336] },
    { id: 'landmark.the-flood-post', at: [176, 396] },
    { id: 'landmark.the-eleventh-sluice', at: [824, 352] },
  ],
}

/** A contour arc on a highland shelf, notched at the pass, with an upper town nobody has mapped. */
const ORUVAI_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.oruvai-the-carry-yard',
      polygon: [
        [120, 470],
        [260, 440],
        [350, 470],
        [356, 548],
        [250, 600],
        [130, 578],
        [92, 520],
      ],
    },
    {
      id: 'district.oruvai-the-shut-gate',
      polygon: [
        [400, 400],
        [490, 378],
        [540, 412],
        [545, 472],
        [480, 506],
        [404, 486],
        [382, 440],
      ],
    },
    {
      id: 'district.oruvai-the-stone-market',
      polygon: [
        [590, 352],
        [720, 326],
        [812, 358],
        [820, 436],
        [715, 478],
        [598, 456],
        [566, 400],
      ],
    },
    {
      id: 'district.oruvai-the-upper-town',
      polygon: [
        [300, 120],
        [520, 86],
        [740, 110],
        [830, 182],
        [790, 272],
        [560, 300],
        [350, 276],
        [268, 196],
      ],
    },
  ],
  water: [
    [
      [640, 560],
      [760, 540],
      [860, 570],
      [880, 640],
      [760, 672],
      [650, 650],
      [612, 600],
    ],
  ],
  walls: [
    [268, 110],
    [520, 72],
    [760, 96],
    [856, 180],
    [800, 290],
    [556, 318],
    [338, 292],
    [248, 196],
  ],
  roads: [
    [
      [20, 640],
      [110, 570],
      [200, 520],
    ],
    [
      [330, 505],
      [390, 460],
      [404, 440],
    ],
    [
      [543, 440],
      [566, 420],
      [592, 404],
    ],
    [
      [700, 330],
      [660, 306],
      [600, 292],
    ],
    [
      [820, 400],
      [910, 356],
      [980, 300],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-carry-beam', at: [230, 505] },
    { id: 'landmark.the-blind-terraces', at: [906, 246] },
  ],
}

/** A diagonal shoreline: a long quay band along the water, the town set back and above the fog. */
const KETH_VEYRA_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.keth-veyra-the-fog-quays',
      polygon: [
        [60, 268],
        [280, 330],
        [500, 420],
        [720, 510],
        [900, 570],
        [880, 624],
        [690, 562],
        [470, 472],
        [250, 382],
        [30, 318],
      ],
    },
    {
      id: 'district.keth-veyra-the-pilot-stair',
      polygon: [
        [70, 150],
        [200, 132],
        [268, 176],
        [262, 252],
        [150, 282],
        [52, 246],
        [30, 196],
      ],
    },
    {
      id: 'district.keth-veyra-the-manifest-house',
      polygon: [
        [350, 236],
        [490, 214],
        [566, 262],
        [560, 340],
        [452, 378],
        [340, 344],
        [312, 286],
      ],
    },
    {
      id: 'district.keth-veyra-above-the-fog',
      polygon: [
        [600, 60],
        [820, 40],
        [960, 92],
        [985, 210],
        [900, 300],
        [720, 330],
        [600, 268],
        [556, 158],
      ],
    },
  ],
  water: [
    [
      [0, 300],
      [220, 360],
      [430, 450],
      [640, 540],
      [860, 610],
      [1000, 650],
      [1000, 700],
      [0, 700],
    ],
  ],
  roads: [
    [
      [180, 300],
      [160, 284],
      [150, 264],
    ],
    [
      [400, 396],
      [420, 372],
      [430, 352],
    ],
    [
      [560, 300],
      [590, 286],
      [612, 272],
    ],
    [
      [268, 200],
      [330, 232],
      [352, 262],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-outer-bell', at: [120, 606] },
    { id: 'landmark.the-bell-roll', at: [430, 432] },
  ],
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------------------- */
  /* The Floating Swamp Settlement                                     */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.floatingSwamp,
    type: 'city',
    name: 'The Floating Swamp Settlement',
    workingTitle: true,
    aka: ['The Lots', 'Moorstone town'],
    status: 'draft',
    summary: 'Three hundred and eighty lots of lashed raft and stilt platform that drift, re-moor and are bid for twice a year.',
    tags: ['delta', 'floating', 'clan', 'smuggling'],
    fields: {
      epithet: 'The Lots',
      overview:
        'A town with no ground. Three hundred and eighty numbered lots of lashed raft, living [[creature.raftbloom|raftbloom]] mat and driven stilt platform, moored within about nine miles of lagoon around [[landmark.the-moorstone|the Moorstone]] and re-moored twice a year by draw. Nothing about the place is fixed except that stone and the order of the draw, and the draw is where the entire politics of the delta happens.\n\nIt lives off water and cane: [[food.tide-rice|tide rice]] cut from boats, [[material.glasscane|glasscane]] out of [[deposit.canebrakes|the brakes]], [[material.mirelac|mirelac]] boiled on the yards, and lamp gas tapped out of the mud and sold upriver in gut bladders. It is also the last untaxed place on the eastern water, which is why [[faction.low-tally|the Low Tally]] keeps three lots here under other people\'s names.\n\nAnd it lives at the mercy of [[city.black-weir|the Black Weir]]. A scheduled release puts a foot of water over the low lots in about four hours. Everyone in the settlement knows this. What they argue about is whose lots those are, and who was told first.',
      founded:
        'No founding. The Compact dates itself from the first cut deed-plate hung on the Moorstone, which the clans read as a property record rather than a birthday.',
      settlementType: 'Drifting raft-and-stilt settlement',

      region: [REGION.theDrown],
      biome: 'Delta marsh',
      terrain:
        'Brackish lagoon over peat, three to eleven feet deep and never the same twice. The one hard thing in fifty miles is the Moorstone, a basalt erratic standing proud of the water at all but the highest tides. Everything else is mat, reed and the settlement itself.',
      climate: 'Humid and mild. Fog on more mornings than not, and a wet season that raises the lagoon by two to three feet.',
      approach:
        'You smell it before you see it: peat smoke, boiling mirelac and gas. Then a comb of dark rafts resolves out of the reed at about a mile, in a place that was not on your chart, because your chart is a season old. Strangers are met on the water by a pole-boat that asks which lot you are bound for, and an answer that names no lot ends the conversation.',

      cityMapNote:
        'Scattered clusters, not quarters. Each district is a clan or a trade that draws together and moors as a comb: rafts lashed rib-to-rib off a spine log, with pole channels kept open between combs by common agreement. The map shows one drift. At the next draw the combs keep their shape and swap position, which is why nobody here gives directions by street and everyone gives them by bearing and cable-count off the stone.',
      districtCount: '6 combs mapped, of eleven that draw separately',
      cityMap: FLOATING_SWAMP_MAP,

      architecture:
        'Everything is built to be cut loose in a hurry. Raft decks of split [[material.glasscane|glasscane]] laid over bundled reed and living raftbloom mat, lashed rather than nailed because a lashing can be knifed; walls of tarred reed board; roofs of [[material.mirelac|mirelac]]-lacquered cane that go black and glossy within a year. Nothing is more than two floors, and the second floor is always lighter than the first. Doors face inward to the comb channel. The only masonry in the settlement is the Moorstone, which nobody built.',
      silhouette: 'Low dark combs on open water, gas bladders swelling on the tap barges, one grey rock standing above all of it.',
      palette: ['#4a3524', '#6f7d3c', '#e8e2d0', '#2c3a2e'],
      buildMaterials: ['material.glasscane', 'material.mirelac', 'material.mire-bloom'],

      landmarkName: 'The Moorstone',
      landmarkDesc:
        'A basalt erratic in the middle lagoon, four strides proud at low water, hung with nine hundred cut lead deed-plates and chained to the Compact hall raft. It is the only fixed address in the settlement and the only thing the clans hold in common. See [[landmark.the-moorstone|the Moorstone]].',

      energy:
        'Fen damp, muscle and tide. [[machine.the-fen-damp-taps|The Fen-Damp Taps]] draw marsh gas out of the mud through bell taps and bladder pumps, and gas does the lamps, the mirelac boilers and the cane steam chests. Everything else is poled, hauled or waited for. There is no wheel in the settlement and nowhere to stand one.',
      infrastructure:
        'Pole channels, mooring cables and a rope-and-bladder fire main, in that order of importance. Every comb keeps two channels open on pain of losing its draw priority. Drinking water is caught off roofs into lidded butts, because the lagoon is brackish at the mouth and foul everywhere the settlement has been. Waste goes over the side downstream of the comb, which is why the Tail is the Tail.',
      keyMachines: ['machine.the-fen-damp-taps'],

      transport:
        'Pole-boat, punt and tow. Freight moves as rafted tows down to the mouth or up to [[city.black-weir|the Weir Gates]], where it stops and pays. Nothing goes overland, because there is no land. A visiting party with its own boat and no pilot will be lost within two hours and found by somebody within four, which are not the same event.',
      traversal:
        'The settlement itself is walked: comb to comb over plank spans that are laid, lifted and moved by whoever owns the lot on either side, so a route that worked yesterday can simply be gone. Beyond it, passage is [[skill.marsh-footing|marsh footing]] and pilotage. Below a certain water level the only safe line through the lower delta is the notched-stave route cut by [[npc.gwill-ossekind|Gwill Ossekind]], and a third of those staves are now wrong or missing.',

      government: 'Lot-draw under the Moorstone Compact',
      politicalLeaning: 'Clan-federal, litigious, ferociously local',
      ruler: ['faction.moorstone-compact', 'npc.sabbe-sixteen-knot'],
      succession:
        'The Kin is the standing assembly: one elder per raft-clan, seated for as long as their clan keeps its comb together. The Compact is the written agreement they sit under and the office that runs the draw, staffed by four draw-clerks who may not hold a lot of their own. Elders are unseated by their own clan cutting itself in half, which happens roughly once a decade and is always about a berth.',

      laws:
        'Property law and almost nothing else. A cut lead deed-plate settles who moors where; possession of a lot is nine tenths of the argument and the plate is the tenth. There is no gaol, because a gaol is a lot somebody could be mooring in. Sentences are fines, forfeitures of draw priority, and casting adrift, which is exactly what it sounds like: your lashings are cut, your raft is poled beyond the last comb, and the settlement moves on without you. Two or three a year do not come back.',
      enforcement: 'Draw-clerks with a cutting knife each, and whichever clan is owed the favour',
      extradition:
        'None written. The Compact hands nobody over on paper and hands people over constantly in practice, because a warrant from [[city.black-weir|the Weir]] arrives attached to a gate-hour and the gate-hour is worth more than the person. Ascent writs are read politely and filed in the peat. A [[faction.bonewax-post|Bonewax]] courier is the only outsider who passes the pole-boats unasked.',
      notableCrimes: [
        'Cutting another lot\'s mooring cable (forfeiture of your own lot, and usually a beating first)',
        'Forging or altering a deed-plate (cast adrift; the plate is the only law there is)',
        'Blocking a comb channel through a drift (loss of draw priority for two draws)',
        'Selling advance word of a weir release to one clan and not the Kin (no penalty written, which is the problem)',
        'Bringing fire above deck in the [[district.floating-swamp-settlement-the-cane-yards|Cane Yards]] (fine, then adrift on the second offence)',
        '[[spell.calling-the-run|Calling the Run]] (no local penalty; the Weir hangs people for it, and the Compact hands them over)',
      ],

      socialClasses: [
        row({
          name: 'Seated elders and draw-clerks',
          share: 'Under 2%',
          note: 'Hold a vote in the Kin or a knife in the draw. Cannot be cast adrift while seated, which is most of the appeal.',
        }),
        row({
          name: 'Plate-holding households',
          share: 'About 45%',
          note: 'Own a cut deed-plate on the stone. Full standing: draw, vote by clan, and the right to refuse a tow.',
        }),
        row({
          name: 'Comb tenants',
          share: 'About 30%',
          note: 'Moor inside someone else\'s plate for a share of the take. No draw of their own; move when their host moves.',
        }),
        row({
          name: 'Tap and yard crews',
          share: 'About 15%',
          note: 'Gas, cane and mirelac work, paid by the bladder and the bundle. Sleep aboard the works. Lung and burns.',
        }),
        row({
          name: 'The adrift',
          share: 'Uncounted',
          note: 'Cast out or drifted in. Live in the reed beyond the last comb, trade fish and salvage, and are not in the roll.',
        }),
        row({
          name: 'Stilt Hundred families',
          share: 'Counted separately',
          note: 'Do not drift, do not draw, and are taxed by the Compact anyway. The settlement\'s oldest grievance.',
        }),
      ],

      population: 'About 5,400 afloat; the roll is recounted at each draw and never agrees with the last one',
      demographics: [
        row({ group: 'Delta-born raft-clans', share: '62%', note: 'Eleven clans that draw separately. Sixteen-Knot is the largest and knows it.' }),
        row({ group: 'Stilt Hundred', share: '14%', note: 'Peat-island families who were here before the rafts and have never accepted the draw.' }),
        row({ group: 'Upriver incomers', share: '16%', note: 'Weir crews\' kin, failed bargemen, people who could not pay a toll. Tenants, rarely plate-holders.' }),
        row({ group: 'Transient and adrift', share: '8%', note: 'Cane cutters in season, Low Tally crews, and the cast-out. Nobody counts these twice the same way.' }),
      ],
      languages: [
        'Delta speech (slow, vowel-heavy, and full of bearings used as adverbs)',
        '[[skill.trade-cant|Trade cant]] on the tap barges and nowhere else',
      ],
      cultures: TBD('Do the raft-clans and the Stilt Hundred share any rite at all, or is even the burial of the dead a separate argument?'),

      food:
        '[[food.tide-rice|Tide rice]] cut from boats twice a year off the shifting mats, fish, eel, and the spring [[creature.blackrun-lamprey|lamprey]] run, which is three weeks of glut and eleven months of talking about it. Everything else is upriver grain bought with gas and cane. A badly timed sluice release drowns the rice, which means the Weir can starve this settlement without ever raising a weapon, and has.',
      water:
        'Roof catchment into lidded butts, comb by comb, and no common supply at all. The lagoon is brackish below the middle reach and fouled anywhere the settlement has recently sat, so a comb that draws a downstream lot is drinking its own last season. This is the practical reason the Tail is the poorest ground in a town with no ground.',
      staples: ['food.tide-rice'],

      economy:
        'Four trades and one advantage. The trades are lamp gas in gut bladders, split [[material.glasscane|glasscane]] spar stock, boiled [[material.mirelac|mirelac]], and [[material.mire-bloom|mire bloom]] off [[deposit.bloom-cuts|the Bloom Cuts]]. The advantage is that no tax officer has ever found the same lot twice. Everything the settlement sells is tolled at the Weir on the way out, so the real question in every household is not what a bladder is worth but what a gate-hour costs this week.',
      mainProduction: 'Lamp gas, glasscane spar, mirelac, tide rice',
      currency:
        'Ascent stair writs for anything over a tow-load, and below that: gas bladders, rice measures and draw priority, which is traded openly and is the closest thing here to a bond.',
      wealth: 'Poor',

      exports: ['material.glasscane', 'material.mirelac', 'material.mire-bloom', 'food.tide-rice'],
      imports: ['material.blister-bar', 'food.stair-loaf', 'item.fever-clay', 'material.pan-nitre'],
      tradeNotes:
        'Glasscane spar out of [[deposit.canebrakes|the Canebrakes]] ends up in [[city.sky-city|the Sky City]]\'s lattice, which means a raft stopped on the river prices a city four hundred miles away. Everyone in the delta understands this. Nobody in the delta has ever managed to hold a raft long enough to use it, because the holding is done at the Weir and the Weir does not share.',

      localResources: ['material.glasscane', 'material.mirelac', 'material.mire-bloom', 'deposit.canebrakes', 'deposit.bloom-cuts'],
      resourceNotes:
        'The [[deposit.bloom-cuts|Bloom Cuts]] work on a twenty-year rotation and are numbered rather than owned, which sounds equitable and means the clan that can defend a number keeps it. Cane is cut in winter and floated out; mirelac is scraped in the wet season off standing cane and boiled on the rafts, which is why the [[district.floating-swamp-settlement-the-cane-yards|Cane Yards]] moor half a mile from everyone else and are still resented.',

      defense:
        'No wall, no gate, no garrison, and the best defence on the eastern water: the settlement is not where the chart says. An attacker needs a pilot, and every pilot in the delta belongs to somebody here. Against a determined force the standing plan is not to fight but to cut and scatter — combs break, the pole channels close behind them, and the town reassembles nine miles away in a week. It works against soldiers. It does nothing whatever against water.',
      doctrine:
        'Poles, hooks and knives, and a doctrine of dispersal rather than defence. Every comb keeps two cutting stations rigged so a raft can be freed in under a minute, and the drill is run at the start of each drift. The clans can put perhaps six hundred people on the water with [[item.moor-stake|moor stakes]] and boat hooks; they cannot put sixty in a line and never try.\n\nThe assumption underneath all of it is that nobody wants the settlement, only its cargo. That assumption has never been tested by an enemy who wants the delta.',
      garrison: 'None standing. Six hundred polemen at a day\'s notice, and no line infantry at all',

      factionNotes:
        '[[faction.moorstone-compact|The Moorstone Compact]] runs the draw and therefore runs the town, and it has been selling advance warning of weir releases to whoever pays while the poorest lots take the water. [[faction.low-tally|The Low Tally]] keeps three lots under tenants\' names and moves untaxed cargo through the comb channels faster than anyone at the Weir can count it. [[faction.iron-sluice-company|The Iron Sluice Company]] has no office here and does not need one: it has [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]]. [[faction.bonewax-post|The Bonewax Post]] keeps a sealed box on the Compact hall raft and is the one outfit the pole-boats wave through.',

      currentConflict: 'A berth dispute on the stone, and an elder being paid to move the whole town',
      problems: [
        'Two clans claim the same Moorstone berth and [[quest.slackwater-rights|the deed that settles it]] has writing on the back',
        '[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is being paid in guaranteed sluice-time to drift the settlement into the Weir\'s toll reach',
        'A third of [[npc.gwill-ossekind|Gwill Ossekind]]\'s channel staves are wrong or gone, and the low-water route with them',
        'The Compact is selling release warnings, and the Tail has worked out that it is always told last',
        'Raftbloom mats under four combs are rotting early and breeding marsh fever',
        'Fen damp taps have to be re-sited every drift, and two crews are quietly re-siting them onto other clans\' mud',
      ],

      cityRelations: [
        row({ city: '[[city.black-weir|The Black Weir]]', stance: 'Hostage', note: 'Upstream of everything. Sets the toll, sets the water, and can do both in the same afternoon.' }),
        row({ city: '[[city.sky-city|The Sky City]]', stance: 'Distant buyer', note: 'Takes nearly all the glasscane spar. Has never once sent anyone to look at where it comes from.' }),
        row({ city: '[[city.mediterranean-city|The Mediterranean City]]', stance: 'Best customer', note: 'Buys the mirelac crop almost entire for conduit insulation. A bad wet season browns out a city.' }),
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Creditor at one remove', note: 'Stair writs price everything here and no counting house has ever held a lot. Both facts are deliberate.' }),
        row({ city: '[[city.arena-city|The Arena City]]', stance: 'Wary', note: 'Buys delta beasts through unpapered channels; the last two got out under the stands and bred.' }),
      ],

      signatureMechanic: 'The Re-Moor',
      mechanicNotes:
        '[[mechanic.the-remoor|The Re-Moor]] is the reason this city cannot be memorised. Twice a year the draw is run off the Moorstone and every comb takes a new bearing: neighbours change, pole channels change, the route from a party\'s lodging to the Compact hall changes, and any relationship built on proximity is quietly reshuffled. Districts here should be treated as bidders rather than places, and any contact who mattered because they were next door stops mattering the moment the draw is read.\n\nRun it as pressure, not scenery. A party that wants something moored near something else has to bid, and bidding means trading in draw priority, which means owing a clan. A party that wants a lot to end up in the Tail can arrange that too, and the Tail is where the water goes when [[city.black-weir|the Weir]] opens. Pair it with [[skill.marsh-footing|Marsh Footing]] for anyone crossing between combs at speed, and remember that the settlement can only re-moor within about nine miles of the stone — which is exactly why Sabbe\'s upriver drift is a constitutional crisis and not a change of address.',

      npcNotes:
        '[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is the largest clan\'s elder and the Weir\'s purchase: guaranteed sluice-time in exchange for drifting the settlement upriver into the toll reach, and one season to make the move look like her own judgement before three other clans cut her lines. [[npc.gwill-ossekind|Gwill Ossekind]] walked out to re-cut the low-water route and did not come back; whoever finds him, or just finds his staves, holds the eastern approach to the Black Weir for as long as the water stays low. Beyond the water, [[npc.ost-vennick|Ost Vennick]] at the Weir is the man whose schedule book decides which of these lots is dry next month, and nobody here has ever seen it.',
      questNotes:
        '[[quest.slackwater-rights|Slackwater Rights]] is the settlement\'s own job and its hidden outcome is a lesson in how this place actually works: two clans, one berth, and a deed-plate with a reversionary clause on the back that hands the berth to a Black Weir creditor unless a player physically turns it over. Around it sit three standing pressures a table can pick up in any order: the missing channel staves, which are worth more to a smuggler than to a rescue party; the release warnings the Compact is selling, which turn into a riot the day the Tail can prove the pattern; and Sabbe\'s drift, which is either treason or good sense depending on who is asked and when.',

      services: [
        row({ name: 'Pilotage', where: 'any pole-boat that meets you', note: 'Priced by draught and by how lost you already are. [[skill.marsh-footing|Marsh Footing]] halves the fee and doubles the insult.' }),
        row({ name: 'Re-mooring crew', where: 'the comb spine, any district', note: 'Eight polemen and a tow line. The only lawful way to move a lot between draws, and it needs a clerk\'s mark.' }),
        row({ name: 'Deed cutting', where: 'Compact hall raft, the Stone Lots', note: 'A lead plate, cut and hung on the stone. Both faces are chargeable and most people pay for one.' }),
        row({ name: 'Fever ward', where: 'the far raft, Tail Lots', note: '[[item.fever-clay|Fever clay]] packed or swallowed against marsh fever. Moored downstream on purpose.' }),
        row({ name: 'Bladder filling', where: 'the tap barges, Gas Fleet', note: 'Gut bladders charged off [[machine.the-fen-damp-taps|the taps]]. A leaking bladder in a hold is the standing hazard of every eastern river route.' }),
        row({ name: 'Cargo that was never landed', where: 'three lots, names withheld', note: '[[faction.low-tally|Low Tally]] work. Ask by bearing, never by name, and never twice.' }),
      ],

      creatureNotes:
        'The settlement floats on [[creature.raftbloom|raftbloom]], which is convenient until it rots, and a rotting mat breeds marsh fever under the floor of whoever is standing on it. The [[creature.blackrun-lamprey|lamprey run]] is three weeks of smoked flesh and lamp oil and the closest thing the delta has to a festival, which is precisely why [[spell.calling-the-run|Calling the Run]] keeps happening and keeps getting people hanged upstream. Beyond the last comb the reed holds ordinary delta danger: bad footing, worse water, and animals that were shipped through here without papers and did not all arrive.',

      history:
        'There is no chronicle, because a chronicle needs somewhere to keep it. What the settlement has instead is the stone: nine hundred deed-plates, the oldest of them illegible, hung in the order they were cut. Read as a record it says three things. The town has drifted within the same nine miles for as long as anyone has counted. The Stilt Hundred\'s plates are older than the raft-clans\'. And there is a forty-year gap in the middle of the sequence that nobody will explain to an outsider.',

      devNotes:
        'CANON: a floating swamp settlement of lashed rafts and stilt platforms that drift and re-moor; central landmark the Moorstone; palette peat brown, algae green, bone. ' +
        PROPOSAL('The drift is turned into a legal system rather than a mood: numbered lots, cut lead deed-plates hung on the one fixed rock in the delta, and a twice-yearly draw that reshuffles every neighbour in the town. The hostage relationship with the proposed Black Weir upstream, the Stilt Hundred grievance, and the forty-year gap in the deed sequence are all proposals and can be cut without touching the canon.'),
      openQuestions: [
        'What is the forty-year gap in the deed-plate sequence, and who benefits from it staying unexplained?',
        'Can the settlement moor outside its nine-mile range at all, or is the Moorstone a physical limit rather than a legal one?',
        'Who were the Stilt Hundred before the rafts came, and is their claim actually the better one?',
        'What happens to the draw if the Moorstone is submerged for good by a wet season or a release?',
        'Does the Compact have any authority a clan cannot simply pole away from?',
      ],
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-the-stone-lots',
    type: 'district',
    name: 'The Stone Lots',
    status: 'draft',
    summary: 'The standing lots chained to the Moorstone: Compact hall, deed chest, draw floor, and the only address that never changes.',
    tags: ['government', 'commerce'],
    fields: {
      overview:
        'Eleven lots that do not draw, because they are chained directly to [[landmark.the-moorstone|the Moorstone]] and have been since anyone was counting. The Compact hall raft, the deed chest, the draw floor and the four clerks live here. Every bearing in the settlement is measured from this comb, so being here is the difference between having an address and having a position.',
      city: [CITY.floatingSwamp],
      districtType: 'Government and deed office',
      wealth: 'Modest, and visibly the most of it',
      atmosphere:
        'Crowded, dry underfoot, and quieter than it should be. Arguments here are conducted at a volume chosen so the neighbouring lot can hear the terms. On draw days it is the loudest place on the eastern water for about four hours and then empty.',
      architecture:
        'Heavier build than anywhere else: doubled cane deck, tarred board, a plank floor that does not flex, and a lead-lined chest bolted through three layers because a deed that floats away is a deed nobody owned.',
      whoLivesHere: 'Draw-clerks, seated elders in season, the Bonewax box, and the settlement\'s two literate scribes',
      danger: 'Low, and entirely social',
      playNotes:
        '[[quest.slackwater-rights|Slackwater Rights]] is heard here, and the deed-plate in question is in the chest. Turning a plate over is a free action nobody thinks to take: the reversionary clause on the back is what hands a berth to a [[city.black-weir|Black Weir]] creditor. Players wanting anything moored near anything else bid for it on this floor, in draw priority rather than coin.',
      devNotes: 'The one fixed room in a city that has no fixed rooms. Put anything that must be findable twice in here.',
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-sixteen-knot',
    type: 'district',
    name: 'Sixteen-Knot',
    status: 'draft',
    summary: 'The largest raft-clan: forty-one rafts in one comb, an elder with a secret, and a berth it has held for nine drifts.',
    tags: ['clan', 'residential'],
    fields: {
      overview:
        'Forty-one rafts lashed rib-to-rib off a single spine log, named for the knot count on their common tow cable. Sixteen-Knot takes the first draw in nine years out of ten, moors upstream of the fouling, and eats first from the rice mats. That is not corruption, it is arithmetic: the clan is a fifth of the settlement and the draw is weighted by comb.',
      city: [CITY.floatingSwamp],
      districtType: 'Clan comb and residence',
      wealth: 'Modest',
      atmosphere:
        'Domestic and dense. Children move between rafts faster than adults can follow, laundry crosses the channels on lines, and there is always somebody re-lashing something. Outsiders are watched from the moment they enter the comb, politely, by about forty people.',
      architecture:
        'Standard raft build kept better than standard: sound lashings, painted numbers on every deck edge, and a spine log that has been replaced twice within memory without the comb ever coming apart.',
      whoLivesHere: 'Sixteen-Knot households, their tenants, and [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]], who sleeps on the spine raft',
      danger: 'Low unless you are asking about the drift',
      playNotes:
        'Sabbe has been bought with guaranteed sluice-time and has one season to make an upriver drift look like judgement rather than purchase. Players can supply her the cover story, sell her out to the three clans who would cut her lines, or work out what the Weir actually gets in exchange, which is the whole settlement inside a toll reach it can never leave.',
      devNotes: 'The clan is the unit of politics here; this comb is where a party learns that by being outvoted by it.',
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-the-gas-fleet',
    type: 'district',
    name: 'The Gas Fleet',
    status: 'draft',
    summary: 'Eleven tap barges over the gas muds, re-sited every drift, filling gut bladders for half the eastern river.',
    tags: ['industry', 'hazard'],
    fields: {
      overview:
        'The settlement\'s only real industry. Eleven barges carrying [[machine.the-fen-damp-taps|bell taps and bladder pumps]], moored over mud that gives up fen damp, scrubbing it through lime and compressing it into gut bladders. The barges have to find new mud at every drift, which means the Fleet is the one district that cannot simply take its bearing and stay put.',
      city: [CITY.floatingSwamp],
      districtType: 'Industry and works',
      wealth: 'Poor, with better wages than anywhere else',
      atmosphere:
        'A permanent faint hiss, the smell of lime and rot, and an absolute prohibition on open flame that everyone obeys because they have all seen why. Crews work stripped to the waist and shout everything twice.',
      architecture:
        'Flat-decked barges with no superstructure worth the name: tap bells on davits, bladder racks under wet sacking, and lime tubs amidships. Nothing is built that cannot be poled somewhere else in a morning.',
      whoLivesHere: 'Tap crews, bladder-women, lime boys, and nobody\'s family',
      danger: 'High, and it is the gas rather than the people',
      playNotes:
        'Two crews are quietly re-siting taps onto other clans\' mud, which is theft of something nobody has ever written down as property. A party can arbitrate it, exploit it, or discover the more interesting version: the best gas mud in the range sits under the berth Sabbe wants the settlement to abandon.',
      devNotes: 'Ties [[recipe.lamp-gas-bladders|lamp gas]] and the re-moor together: the mechanic has an industrial cost, not just a social one.',
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-the-cane-yards',
    type: 'district',
    name: 'The Cane Yards',
    status: 'draft',
    summary: 'Splitting, steaming and mirelac boiling, moored half a mile out because everything here is either on fire or about to be.',
    tags: ['industry', 'craft'],
    fields: {
      overview:
        'Where winter-cut [[material.glasscane|glasscane]] is split, steamed and laminated into spar stock, and where the [[material.mirelac|mirelac]] crop is boiled down. Both processes need sustained heat on a raft, which is why the Yards moor half a mile off the nearest comb and pay a standing penalty in draw priority for the privilege.',
      city: [CITY.floatingSwamp],
      districtType: 'Craft and processing',
      wealth: 'Poor',
      atmosphere:
        'Steam, resin smoke and a sweet burnt smell that gets into cloth and never leaves. The yards work through the night in season because a steam chest that cools is a wasted charge.',
      architecture:
        'Long open decks under lacquered cane roofs, steam chests amidships, and a fire lane of bare planking kept clear the whole length of every raft. The lane is swept hourly and walking on it with a lamp is a beating.',
      whoLivesHere: 'Cane cutters in season, mirelac boilers, laminators, and their burns',
      danger: 'High, and the danger is fire on water',
      playNotes:
        'The Mediterranean conduit trade depends on this crop, so a fire here is a continental event dressed as a local accident. Players who need a distraction that will empty half the settlement have one available; players who need the Yards intact have a reason to care who is smoking where.',
      devNotes: 'The industrial reason the delta matters to two distant cities, kept physically at arm\'s length from the town.',
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-tail-lots',
    type: 'district',
    name: 'The Tail',
    status: 'draft',
    summary: 'Last in the draw, lowest freeboard, downstream of everyone\'s waste, and first under water when the Weir opens.',
    tags: ['poor', 'residential'],
    fields: {
      overview:
        'The lots nobody bids for: eighteen inches of freeboard, the bottom of the draw, and a mooring that is always downstream of the rest of the settlement. When [[city.black-weir|the Weir]] runs a scheduled release, the Tail takes the water about four hours before anyone else knows there is water coming. The Compact sells advance warning. The Tail has worked out that it is always told last.',
      city: [CITY.floatingSwamp],
      districtType: 'Poor residence',
      wealth: 'Destitute',
      atmosphere:
        'Wet decking, patched lashings, and a hard practical competence that the rest of the town mistakes for sullenness. Everything here is stowed high and tied down, because everything here has been floated at least once.',
      architecture:
        'Single-floor raft build on tired mat, much of it salvage: reused board, cane that has already been a roof somewhere else, and butts lashed under the decks as improvised buoyancy.',
      whoLivesHere: 'Comb tenants without plates, upriver incomers, the fever ward, and most of the settlement\'s widows',
      danger: 'Moderate daily, catastrophic on a release day',
      playNotes:
        'The riot lives here. Proving that the Compact sold release warnings turns the Tail into a political force overnight, and the proof is a payment record rather than a witness. A party can also simply do the useful thing: get eighteen inches of freeboard raised before the next scheduled opening, which needs cane, hands and somebody at the Weir willing to read them a schedule.',
      devNotes: 'The consequence district. Every deal struck upstream arrives here as water.',
    },
  }),

  E({
    id: 'district.floating-swamp-settlement-the-stilt-hundred',
    type: 'district',
    name: 'The Stilt Hundred',
    status: 'draft',
    summary: 'A peat island of driven stilt platforms that does not drift, does not draw, and is taxed by the Compact regardless.',
    tags: ['residential', 'grievance'],
    fields: {
      overview:
        'The one part of the settlement with something under it. A peat island, firm enough to drive piles into, carrying about a hundred and forty stilt platforms whose families were here before the rafts. They do not drift and cannot draw, so the Compact taxes them on a fixed assessment and gives them no vote in the Kin. Their deed-plates on the stone are the oldest in the sequence, which is the entire argument.',
      city: [CITY.floatingSwamp],
      districtType: 'Fixed settlement and grievance',
      wealth: 'Poor',
      atmosphere:
        'Older, slower, drier. Trees grow here, badly. There is a burial ground, which no raft-clan has, and the raft-clans find it faintly indecent.',
      architecture:
        'Driven piles of tarred bole timber, decks a full storey above high water, and ladders rather than gangways. Some platforms have three generations of extension bolted onto them and a list to match.',
      whoLivesHere: 'Stilt Hundred families, the settlement\'s only smith, and the dead',
      danger: 'Low, and rising every year the assessment does',
      playNotes:
        'The oldest plates on the Moorstone are theirs, and if the deed sequence is ever read as law rather than as history, the Compact\'s authority is in serious trouble. A party that reads the plates in order will notice the forty-year gap before anyone tells them about it. The Hundred will fund that reading; the clerks will price it as vandalism.',
      devNotes: 'The counterexample that makes the drifting city legible: here is what the settlement would be if it stopped.',
    },
  }),

  E({
    id: 'landmark.the-moorstone',
    type: 'landmark',
    name: 'The Moorstone',
    status: 'canon',
    summary: 'The one rock in fifty miles of peat, hung with nine hundred cut deed-plates and chained to the Compact hall.',
    tags: ['landmark', 'law', 'delta'],
    fields: {
      overview:
        'A basalt erratic standing four strides proud of the middle lagoon: the only hard ground the settlement has, the anchor of its central comb, and the physical register of every lot in the town. Nine hundred cut lead deed-plates hang from iron staples driven into it, in the order they were cut. The settlement drifts around this stone within about nine miles and has never moored out of sight of it.',
      city: [CITY.floatingSwamp],
      landmarkType: 'Erratic, mooring and deed register',
      built: 'Not built. The oldest staple in it is illegible and nobody has removed one to check.',
      appearance:
        'Weathered black rock, algae-green at the waterline and bone-pale where the plates have polished it, wrapped in cable and hung with lead like a votive tree. At high water in a wet season it is a shoulder in the lagoon and the plates go under.',
      function:
        'Law, address and anchor at once. A plate on the stone is title to a lot; a bearing off the stone is an address; the chain to the stone is why the Compact hall does not drift. All three are the same object, which is the settlement\'s great structural weakness.',
      access:
        'Open water, approachable by any boat, and never unwatched. Cutting a plate off is theft of a house. Reading the sequence in order is legal, tedious and quietly explosive.',
      devNotes:
        'CANON: the Moorstone is the settlement\'s central landmark. ' +
        PROPOSAL('Making it simultaneously the deed register, the address origin and the physical anchor gives the drifting town one thing it cannot leave, and turns any proposal to move upriver into a constitutional question rather than a logistical one.'),
    },
  }),

  E({
    id: 'landmark.the-lot-board',
    type: 'landmark',
    name: 'The Lot Board',
    status: 'draft',
    summary: 'The draw floor board: three hundred and eighty lot numbers, this drift\'s bearings, and the bids chalked beside them.',
    tags: ['landmark', 'economy'],
    fields: {
      overview:
        'A lacquered cane board four strides long on the Compact hall raft, ruled into three hundred and eighty rows. Each row carries a lot number, the bearing and cable-count it holds this drift, the clan that drew it, and whatever has been chalked against it in bids. It is rewritten in full on draw day and amended, loudly, for a fortnight afterwards.',
      city: [CITY.floatingSwamp],
      landmarkType: 'Public board and auction floor',
      built: 'Replaced roughly every fifteen years; the current board is the fourth anyone can remember',
      appearance:
        'Black lacquer under chalk, with the previous drift\'s ghosts never quite scrubbed out, so a careful reader can see where a comb has been creeping upstream draw by draw.',
      function:
        'Turns a mooring into a market. Draw priority is bid, traded and borrowed against here, which makes the board the closest thing the delta has to a credit instrument that is not an Ascent writ.',
      access: 'Open deck, open hours, and physically crowded to the point of uselessness for four hours twice a year.',
      devNotes:
        PROPOSAL('Gives [[mechanic.the-remoor|the Re-Moor]] a surface players can read, bid on and tamper with. The ghost-chalk detail exists so a suspicious party can detect a creeping drift months before it becomes an announcement.'),
    },
  }),

  E({
    id: 'landmark.the-drowned-stand',
    type: 'landmark',
    name: 'The Drowned Stand',
    status: 'draft',
    summary: 'Sixty dead trunks standing in open water: the delta\'s only fixed bearing, and where the notched staves begin.',
    tags: ['landmark', 'navigation'],
    fields: {
      overview:
        'A drowned lobe of old forest at the settlement\'s downstream limit: sixty-odd bare trunks still standing in six feet of water, visible above the reed from two miles in clear air. Every pilot in the delta takes a bearing off it, and [[npc.gwill-ossekind|Gwill Ossekind]]\'s notched channel staves begin at its southern edge.',
      city: [CITY.floatingSwamp],
      landmarkType: 'Navigation mark and channel head',
      built: 'Drowned within the last two centuries; the lobe is still shown as dry land on older charts',
      appearance:
        'Grey trunks, limbless, furred with weed to the waterline and crusted with nesting birds above it. In fog it produces an echo that experienced polemen navigate by and everyone else finds unpleasant.',
      function:
        'The fixed reference for the low-water route. Where the Moorstone tells you where the town is, the Stand tells you how to leave it without drowning.',
      access:
        'Open water, an hour and a half by pole from the outer combs. Trunks are rotten at the base and two have gone over in the last decade, which has already invalidated one printed chart.',
      devNotes:
        PROPOSAL('Anchors the missing-staves plot to somewhere players can actually go, and gives the delta a landmark that is slowly ceasing to exist, on a schedule.'),
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Black Weir                                                    */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.blackWeir,
    type: 'city',
    name: 'The Black Weir',
    aka: ['The Throat'],
    status: 'draft',
    summary: 'A basalt barrage across the Drown\'s throat, twenty-two bays wide, that sells the river by the hour and can drown the delta by mistake.',
    tags: ['river', 'toll', 'fortified', 'company'],
    fields: {
      epithet: 'The Throat',
      overview:
        'Four hundred and ten strides of black basalt sill thrown across the neck of the delta, carrying twenty-two bays: fourteen worked gates, five chained open since the flood, three bricked. Above it the river stands eleven feet higher than below. Everything moving between the interior and the eastern water passes through it, pays for it, and waits for it.\n\nThe town is the works and the people who run the works. [[faction.iron-sluice-company|The Iron Sluice Company]] holds the charter, keeps [[mechanic.the-sluice-book|the sluice book]], and sells gate-hours the way the Ascent sells credit. It also beats river-shipped [[material.mire-bloom|bloom]] into stamped bar under [[machine.the-sluice-hammers|hammers the gates themselves drive]], so the same head of water that prices the toll makes the iron.\n\nWhat makes it dangerous rather than merely expensive is that a release is indistinguishable from an accident. A metre of water can be put onto anything downstream within hours, and the only document that would prove it was deliberate is a book that sleeps in the same room as the sluice-master.',
      founded:
        'The Company dates the works from its charter, which is a document rather than a construction. Who cut the first sill, and whether the sill was cut at all or found, is not recorded.',
      settlementType: 'Fortified weir-town and river toll',

      region: [REGION.theDrown],
      biome: 'Delta throat: basalt sill and tidal river',
      terrain:
        'A hard basalt bar across an otherwise soft river, the last rock before four hundred miles of peat. The town is built on the bar and on the two banks it ties into, with an upper pool that holds a hundred barges and a scoured tail below that will not hold anything at all.',
      climate: 'Humid, foggy in the mornings, and colder on the gantries than anywhere else in the delta because of the water noise and the wind down the channel.',
      approach:
        'From below you hear it for a mile before you see it: a flat continuous roar and a haze of spray over black stone. From above it is a line of iron gantries and lamp-yellow windows across the whole river, and a hundred barges tied three deep in the upper pool, waiting. Nothing approaches unannounced. The tail is watched from two towers and the pool is watched by everyone in it.',

      cityMapNote:
        'One straight line and everything hung off it. The barrage is the city: the gate works run bank to bank, the gantry yards and hammer row anchor it on either side, and the toll house and crew town sit on the apron below where the noise is survivable. The Slack above the gates is not a district so much as a permanent traffic jam that has acquired shops.',
      districtCount: '6 mapped; the works themselves are surveyed to the bay',
      cityMap: BLACK_WEIR_MAP,

      architecture:
        'Wet black basalt, rust and lamplight. Ashlar sill and pier work below, iron above: gantries, winch houses, walkways of open grating that are permanently slick. Everything metal is scaled with rust in a wet-red bloom that the Company repaints on a schedule it does not keep, so the town reads as black stone streaked with orange. Windows are small, deep and lit at all hours, because the gate crews work in three watches and the lamps are the only thing that says which shift you are on.',
      silhouette: 'A hard black line across the whole river, gantried above and smoking with spray below.',
      palette: ['#171a1c', '#8a4326', '#d9a441', '#3b4348'],
      buildMaterials: ['material.mire-bloom', 'material.blister-bar', 'material.blackbole-timber'],

      landmarkName: 'The Weir Gates',
      landmarkDesc:
        'Twenty-two bays of basalt pier carrying fourteen worked gates, each a slab of iron-bound timber four strides by six, raised on chain from a winch house on the gantry. Opening one on a full head is the loudest thing that happens in the delta. See [[landmark.the-weir-gates|the Weir Gates]].',

      energy:
        'The head. Eleven feet of fall at low water, four at flood, taken off through two bays into a wheel race that drives [[machine.the-sluice-hammers|the trip hammers]], the gate winches and the pumps. Nothing here burns for power except the lamps, which is why the town can afford to be lit and the delta cannot.',
      infrastructure:
        'A drinking main tapped upstream of the works and run in bored bole timber to every crew house, which is the single most important pipe in the eastern water and the reason a fever upriver becomes a Weir problem within a day. Below that: the gantry walkways, the winch houses, the sluice book office, and a pumping gallery inside the sill that has to be manned continuously or the works flood themselves.',
      keyMachines: ['machine.the-sluice-hammers'],

      transport:
        'The town exists to move boats vertically. Barges lock through in a bay worked as a chamber, three at a time, on a booked gate-hour; anything that cannot lock is broken out, carried across on the gantries and re-rafted below, which is the [[district.black-weir-the-gantry-yards|Gantry Yards]]\' entire business. Overland there is one causeway on each bank and neither goes anywhere useful.',
      traversal:
        'Inside the works, everything is grating, ladder and chain, wet and loud enough that orders are given by lamp signal. The slack hour between scheduled openings is the only time a small boat can use a disused bay, which is precisely what [[npc.dagren-hoyle|Dagren Hoyle]] sells and what killed his last two crews.',

      government: 'Chartered company rule',
      politicalLeaning: 'Corporate, contractual, entirely unsentimental',
      ruler: ['faction.iron-sluice-company', 'npc.ost-vennick'],
      succession:
        'There is no succession, only appointment. The Company\'s board sits elsewhere and sends a sluice-master; twelve Weirmasters hold bay groups under him and are promoted off the gantries on competence, because an incompetent Weirmaster is a visible and expensive thing. Weirmaster is a rank, not a faction, which outsiders reliably get wrong.',

      laws:
        'Charter law, short and commercial. The book is the law: a booked gate-hour is a property right, an unbooked passage is theft of water, and interference with a gate is treated as attempted murder because that is what it usually is. Debt is enforced in labour on the gantries and in the pumping gallery, and gallery time is measured in shifts rather than terms, so a debt here can be paid off in a season or never depending on how the shifts are counted. They are counted by the Company.',
      enforcement: 'Company gate-wardens on the works; the twelve Weirmasters have summary powers within their bays',
      extradition:
        'The Weir extradites eagerly and receives reluctantly. Warrants from [[city.gilded-ascent|the Ascent]] are honoured for a fee, delta warrants are honoured for nothing because the delta has nothing, and the Company will hand over almost anyone who is not on a shift. What it never surrenders is a Weirmaster, on the stated grounds that a gate officer under another city\'s law is a gate under another city\'s law.',
      notableCrimes: [
        'Passing a gate unbooked (forfeiture of cargo and gallery shifts; the cargo is the point)',
        'Interfering with a gate, chain or winch (death, and the charge is murder regardless of outcome)',
        'Falsifying a bill of health or a manifest at the tail (gallery shifts, uncounted)',
        '[[spell.calling-the-run|Calling the Run]] (death by hanging at the sluices, and the Company publicises it)',
        'Selling the schedule (no written penalty; the Company has never prosecuted itself)',
        'Working a disused bay in the slack hour (gallery shifts if you live)',
      ],

      socialClasses: [
        row({ name: 'Company factors and the sluice-master', share: 'Under 1%', note: 'Hold the book and the charter. Live above the toll house; drink upstream water.' }),
        row({ name: 'Weirmasters', share: 'About 2%', note: 'Twelve gate officers with summary powers in their bays. Unextraditable, well paid, and worked until their hearing goes.' }),
        row({ name: 'Gate and winch crews', share: 'About 30%', note: 'Three watches, sworn to the works. Housed dry, fed adequately, and deaf by fifty.' }),
        row({ name: 'Gantry labour', share: 'About 35%', note: 'Break, carry and re-raft cargo that cannot lock. Paid by the load, replaced by the week.' }),
        row({ name: 'Hammer and forge hands', share: 'About 15%', note: 'Beat river bloom into stamped bar. The one trade here that transfers anywhere else.' }),
        row({ name: 'Gallery debtors', share: 'About 17%', note: 'Pump the sill by hand in shifts the Company counts. No published schedule of release, by design.' }),
      ],

      population: 'About 3,100 inside the works; crews rotate and the Company counts shifts, not people',
      demographics: [
        row({ group: 'Weir-born company families', share: '38%', note: 'Three or four generations on the gantries. Trade the works like an inheritance, because it is one.' }),
        row({ group: 'Upriver hired crews', share: '30%', note: 'Come for the wage, stay for the debt. Rarely make Weirmaster and know it.' }),
        row({ group: 'Delta people', share: '20%', note: 'Raft-clan families who took a wage. Distrusted on both sides of the gates and useful to both.' }),
        row({ group: 'Bargemen and transients', share: '12%', note: 'The floating population of the Slack. Some have been waiting three weeks and have opinions.' }),
      ],
      languages: [
        'Company river-speech (bay numbers, book terms and lamp signals, used as ordinary conversation)',
        '[[skill.trade-cant|Trade cant]] throughout the Slack and the Gantry Yards',
      ],
      cultures: TBD('Does a town built entirely around a company charter keep any observance the Company did not schedule?'),

      food:
        'Bought, not grown. Upriver grain and [[food.stair-loaf|stair loaf]] come down as toll-in-kind, delta rice and fish come up from below, and the spring [[creature.blackrun-lamprey|lamprey run]] is worked directly off the gates, which is the single most profitable fortnight of the Weir\'s year. Two bays are kept for the run and opened on a pattern the fish read better than the crews do.',
      water:
        'Tapped upstream of the works and piped in bole timber to every crew house. The intake is above every discharge in the town, which is deliberate and which is exactly why forged bills of health upriver are a lethal problem here rather than an administrative one. Below the gates, the water is not drunk by anyone with a choice.',
      staples: ['food.stair-loaf', 'food.tide-rice'],

      economy:
        'Rent on a chokepoint, plus iron. The sluice book sells ninety-six gate-hours a week and reserves thirty to the Company, so a third of the river\'s capacity never reaches the market at all. Around that sit the gantry trade, the [[recipe.hammered-bar-iron|bar iron]], the smoked lamprey, and a large quiet business in knowing when a gate will move.',
      mainProduction: 'Gate-hours, stamped bar iron, smoked lamprey',
      currency: 'Ascent stair writs, Company transit seals, and gate-hours themselves, which are traded openly and short-sold constantly',
      wealth: 'Prosperous',

      exports: ['item.weirhook', 'material.mire-bloom', 'material.blister-bar'],
      imports: ['food.stair-loaf', 'material.scaldstone', 'material.stairwire', 'material.blackbole-timber'],
      tradeNotes:
        'Everything the interior sends east and everything the delta sends inland is weighed here twice: once for the toll and once by whoever is buying the schedule. The Company\'s formal position is that it sells passage. Its actual product is certainty, and it manufactures that by rationing it.',

      localResources: ['material.mire-bloom', 'deposit.bloom-cuts'],
      resourceNotes:
        'The Weir digs nothing. [[deposit.bloom-cuts|The Bloom Cuts]] are worked downstream by delta crews on a twenty-year rotation, dried on stilt racks and rafted up, and every raft is tolled before it reaches a hammer. The Company has never needed to own a pit, which is the most instructive fact about this town.',

      defense:
        'A curtain of basalt and iron around the works, two tail towers, and a boom that can be run across the upper pool in about twenty minutes. The gates themselves are the real defence: a besieging force downstream can be given eleven feet of water at a time of the Company\'s choosing, and a force upstream can be stranded on dry mud. Neither has been tried.',
      doctrine:
        'Hold the works, never the ground. The Company keeps two hundred gate-wardens with [[item.weirhook|weirhooks]], polearms and a very small number of matchlocks, and does not pretend they are an army. Doctrine is to seal the gantries, lock the winch houses, and let the river make the argument.\n\nThe standing plan against a serious attacker is a release, timed to catch a force in the tail. The Company has never written this plan down and every Weirmaster can recite it. What none of them can answer is what a release does to the four thousand people living downstream of it, because the plan does not have that section.',
      garrison: 'About 200 Company gate-wardens; no field force and no cavalry',

      factionNotes:
        '[[faction.iron-sluice-company|The Iron Sluice Company]] is the town with a payroll, and its habit of timing maintenance releases to drown competitors\' moorings is an open secret that has never survived contact with evidence. [[faction.low-tally|The Low Tally]] runs the ullage trade through the tail and pays gantry crews better than the Company does. [[faction.moorstone-compact|The Moorstone Compact]] buys release warnings here and resells them downstream. [[faction.bonewax-post|The Bonewax Post]] passes every gate unbooked, which is the only standing exception in the book, and the Company has quietly wondered for years what that costs it.',

      currentConflict: 'A forged bill of health, and a cordon that saves upriver and starves the delta',
      problems: [
        '[[quest.clean-bills|Forged bills of health]] moved a fever upriver; closing the gates stops it and starves the Drown',
        'Two hundred barrels declared full at the tail and forty of them ullage, with one tide to move them',
        '[[npc.dagren-hoyle|Dagren Hoyle]] is recruiting for a disused bay that has drowned two crews and is honest about the odds',
        'The five chained-open bays have not been surveyed since the flood and nobody wants to be the one who asks',
        'The Company is paying [[npc.sabbe-sixteen-knot|a delta elder]] in sluice-time to bring a whole settlement inside its toll reach',
        'Gate-hours are being short-sold three deep in the Slack and one bad week will call the whole market',
      ],

      cityRelations: [
        row({ city: '[[city.floating-swamp-settlement|The Floating Swamp Settlement]]', stance: 'Dominant', note: 'Can flood it, starve it, or buy its elders. Currently doing the third, which is cheapest.' }),
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Correct and cold', note: 'Everything the Ascent ships east passes here and the Concord has no leverage over it. Both parties find this intolerable and profitable.' }),
        row({ city: '[[city.arena-city|The Arena City]]', stance: 'Trading', note: 'Bar iron and bone char cross here in both directions. The Company asks about neither.' }),
        row({ city: '[[city.tree-city|The Tree City]]', stance: 'Supplier', note: 'Bole timber for gate slabs and the drinking main. The Marshalcy is one of the few sellers the Weir cannot squeeze.' }),
        row({ city: '[[city.sifting-city|The Sifting City]]', stance: 'Distant', note: 'Pan nitre and graded ore move through on toll. No relationship beyond the book.' }),
      ],

      signatureMechanic: 'The Sluice Book',
      mechanicNotes:
        '[[mechanic.the-sluice-book|The Sluice Book]] turns a river into a bookable resource. Ninety-six gate-hours a week, thirty reserved, the rest sold, short-sold and traded in the Slack; a party can buy an hour to float a barge, buy an hour purely to deny it to somebody else, or get an hour moved, which is the expensive option because moving one means moving all the ones after it.\n\nThe teeth are downstream. Every opening puts water somewhere, and the schedule that decides whose fields and whose lots take it is one book in one room with [[npc.ost-vennick|Ost Vennick]] sleeping beside it. Run the mechanic so that players who win an argument at the gates find out four hours later what winning cost the [[district.floating-swamp-settlement-tail-lots|Tail]]. Pair it with [[skill.plain-letters|Plain Letters]] to read a booking, [[skill.brokerage|Brokerage]] to move one, and [[skill.fence-work|Fence Work]] for anything passing in the slack hour.',

      npcNotes:
        '[[npc.ost-vennick|Ost Vennick]] holds the schedule book and has used it once, off the record, during a toll dispute; he sleeps in the same room as the only evidence and knows exactly what that means. [[npc.dagren-hoyle|Dagren Hoyle]] runs a gantry crew and a private channel through a disused sluice, workable only in the slack hour, and pays in Weir transit seals that open gates upriver. Downstream, [[npc.gwill-ossekind|Gwill Ossekind]] is missing along with a third of the staves that mark the low-water approach, which means the eastern way in is currently unowned.',
      questNotes:
        'Two jobs start at the gates and they are the same job seen from opposite ends. [[quest.the-ullage-run|The Ullage Run]] is smuggling with a tide limit: two hundred barrels declared full, forty of them ullage, and raft crews who are named and hanged at the sluices if it fails. [[quest.clean-bills|Clean Bills]] is the moral inverse: the Weirmasters will shut the gates on the party\'s word and keep them shut, which stops a fever from moving upriver and slowly kills the delta that eats what the river brings. Between them sits the standing question of the schedule book, which is worth more than either.',

      services: [
        row({ name: 'Gate-hour booking', where: 'the toll house counter', note: 'Priced by draught and by hour. Same-week bookings cost triple and are usually resales.' }),
        row({ name: 'Break-and-carry', where: 'Gantry Yards, both banks', note: 'Cargo that cannot lock is broken out, carried over and re-rafted. Breakage is priced in, theft is not.' }),
        row({ name: 'Bar stamping', where: 'Hammer Row', note: 'River bloom beaten to merchant bar of a stamped weight. The stamp is honoured as far as the Ascent.' }),
        row({ name: 'Transit seals', where: 'toll house, and unofficially the gantries', note: 'Open gates upriver. [[npc.dagren-hoyle|Dagren Hoyle]] pays his crews in them, which is not strictly his to do.' }),
        row({ name: 'Bill of health inspection', where: 'the tail landing', note: 'Two clerks, no physician, and a queue. The forgeries that started the fever passed here.' }),
        row({ name: 'Deaf-pay hearing test', where: 'Company office, Lampside', note: 'Crews are tested yearly and pensioned when they fail. Failing early is a known way out and a known fraud.' }),
      ],

      creatureNotes:
        'The [[creature.blackrun-lamprey|blackrun lamprey]] runs up through these gates in one three-week mass each spring, and whoever holds the sluices holds the run: two bays are worked for it, the catch is smoked on the apron, and the oil lights half the town. It is also why [[spell.calling-the-run|Calling the Run]] is a hanging matter here and only here, since bringing the run early spends next year\'s catch and the Company owns next year. Below the tail the lampreys take draught animals at the fords, which is a delta problem the Weir declines to price.',

      history:
        'The Company keeps a continuous record and it begins with the charter, which is the point. Before the charter there is a sill, a name, and nothing anyone will put in writing. Within the recorded period: the flood that chained five bays open, the toll dispute in which a metre of water went downstream and was recorded as maintenance, and the year the run failed and the town discovered how much of its diet was fish.',

      devNotes:
        'CANON: the name The Black Weir, and nothing else. ' +
        PROPOSAL('This entry follows the brief\'s labelled sketch — a fortified weir-town of black basalt sluices and iron gantries controlling the river, landmark the Weir Gates, palette wet black, rust and lamp-yellow. Everything beyond that sketch is invention: the twenty-two bays, the charter company, the sluice book economy, the pumping gallery debtors, and the hostage relationship with the floating settlement downstream. The relationship is the reason to keep it — it gives two canon names a real dependency with lives on both ends — but the whole entry can be replaced if the Weir turns out to be a ruin, a structure with no town, or something else entirely.'),
      openQuestions: [
        'Was the basalt sill cut or found, and does the Company know which?',
        'Who actually holds the Iron Sluice Company charter, and where does its board sit?',
        'What is in the five chained-open bays, and why has nobody surveyed them since the flood?',
        'Does the release plan have a downstream section that has simply been removed from the copies?',
        'If the Weir did not exist, would the delta be richer or merely wetter?',
      ],
    },
  }),

  E({
    id: 'district.black-weir-the-gate-works',
    type: 'district',
    name: 'The Gate Works',
    status: 'draft',
    summary: 'Twenty-two bays of basalt pier and iron gantry: the barrage itself, worked in three watches, loud enough to end a hearing.',
    tags: ['industry', 'infrastructure'],
    fields: {
      overview:
        'The city, structurally speaking. Four hundred and ten strides of sill carrying fourteen worked gates, five chained open and three bricked, with a winch house over every worked bay and a continuous gantry walkway the whole length. Twelve Weirmasters hold bay groups here and each has summary power inside his own.',
      city: [CITY.blackWeir],
      districtType: 'Works and barrage',
      wealth: 'Company property; nobody lives here',
      atmosphere:
        'A flat roar you stop hearing after a day and never stop feeling. Spray, wet grating, chain noise, and orders given entirely by lamp because speech does not carry. Crews communicate in a signal vocabulary outsiders read as rudeness.',
      architecture:
        'Ashlar basalt piers, iron above: gantries, chain runs, winch houses with small deep windows, and grating walkways slick with weed at every level. Everything is rusted in a wet-red bloom over black stone.',
      whoLivesHere: 'Nobody. Three watches of gate and winch crew, and the Weirmasters\' bay offices',
      danger: 'High and mechanical',
      playNotes:
        'Interfering with a gate is charged as murder whatever happens, which makes this the highest-stakes ground in the delta for a sabotage plot. The five chained-open bays have not been surveyed since the flood; [[landmark.the-eleventh-sluice|the eleventh]] is one of them and is somebody\'s private channel. A party that can read a lamp signal has access to the whole works\' intentions in real time.',
      devNotes: 'The mechanic made physical: every gate-hour bought in the toll house is executed here by name and by bay.',
    },
  }),

  E({
    id: 'district.black-weir-the-slack',
    type: 'district',
    name: 'The Slack',
    status: 'draft',
    summary: 'The upper pool: a hundred barges tied three deep, waiting on a booked hour, and a market that grew on top of them.',
    tags: ['commerce', 'transient'],
    fields: {
      overview:
        'Not a district so much as a permanent traffic jam with shops in it. A hundred-odd barges lie tied three deep above the gates waiting on booked hours, and the outer ranks have been there long enough to grow plank walkways, cook shops, a gambling raft and a resale market in gate-hours that the Company watches and does not regulate.',
      city: [CITY.blackWeir],
      districtType: 'Waiting anchorage and market',
      wealth: 'Modest, in transit',
      atmosphere:
        'Boredom with money in it. Everyone is leaving and nobody is leaving today. News from four hundred miles of river arrives here first, which makes it the best listening post east of the Ascent.',
      architecture:
        'Barge on barge: tarred hulls, awnings, plank ways lashed between gunwales, and a floating market that dismantles itself every time the outer rank finally locks through.',
      whoLivesHere: 'Bargemen, factors, hour-brokers, cooks, and people who have been waiting three weeks',
      danger: 'Low, until a booking is called and short-sold',
      playNotes:
        'The place to buy, sell or short a gate-hour, and the place to hear which bay a Weirmaster is opening early. Hours are traded three deep here, so one bad week calls the whole market and produces several hundred angry, immobile, well-armed bargemen tied together above a barrage.',
      devNotes: 'Gives the sluice-book economy a trading floor and gives players somewhere to gather rumour without entering the works.',
    },
  }),

  E({
    id: 'district.black-weir-the-gantry-yards',
    type: 'district',
    name: 'The Gantry Yards',
    status: 'draft',
    summary: 'Where cargo that cannot lock is broken out, carried over the bar by crane and hand, and re-rafted below.',
    tags: ['industry', 'labour'],
    fields: {
      overview:
        'The left bank, top to bottom: crane gantries, breaking floors, sling stores and re-rafting stages. Anything too long, too heavy or too awkward to lock through is taken apart here, carried across the bar, and put back together on the other side, at a price per load that is set by the Company and disputed by everyone.',
      city: [CITY.blackWeir],
      districtType: 'Transshipment and labour',
      wealth: 'Poor',
      atmosphere:
        'Shouting, chain, wet rope and the constant low argument about breakage. Crews are hired by the week and know it, which produces a workforce that is both extremely skilled and entirely unsentimental about the cargo.',
      architecture:
        'Timber and iron gantries stepped down the bank, breaking floors of planked basalt, and sling stores that flood twice a year and are rebuilt without complaint.',
      whoLivesHere: 'Gantry crews, sling-makers, crane hands, and [[npc.dagren-hoyle|Dagren Hoyle]]',
      danger: 'High; the loads are the danger',
      playNotes:
        'Dagren Hoyle recruits here for a run through a disused bay in the slack hour, is honest that his last two crews drowned, and pays in transit seals that open gates upriver. This is also where cargo goes missing lawfully: breakage is priced into every contract, and a party that understands the breakage schedule can make things disappear inside it.',
      devNotes: 'The honest-crime district. Everything here is legal and most of it is theft.',
    },
  }),

  E({
    id: 'district.black-weir-hammer-row',
    type: 'district',
    name: 'Hammer Row',
    status: 'draft',
    summary: 'Sluice-driven trip hammers beating river bloom into stamped merchant bar, on the same head of water that sells the toll.',
    tags: ['industry', 'metalwork'],
    fields: {
      overview:
        'The right bank, given over to iron. Two bays are drawn off into a wheel race that drives [[machine.the-sluice-hammers|the trip hammers]], and [[material.mire-bloom|mire bloom]] rafted up from [[deposit.bloom-cuts|the Bloom Cuts]] is beaten into merchant bar of a stamped weight. The stamp is honoured as far as the Gilded Ascent, which is the only reputation this town has that is not about water.',
      city: [CITY.blackWeir],
      districtType: 'Forge and mill',
      wealth: 'Modest',
      atmosphere:
        'A percussive shop-floor rhythm that sets the pace of the whole bank and stops abruptly when a gate is called, because the hammers and the gates share the head. The silences are how the row knows a booking has moved.',
      architecture:
        'Open-fronted hammer sheds along the race, charcoal stores behind, and a stamping shop with a locked die cabinet that is the most heavily secured room outside the toll house.',
      whoLivesHere: 'Hammer hands, forge masters, stampers, and the die keeper',
      danger: 'Moderate, and cumulative',
      playNotes:
        'The one trade here that transfers anywhere else, so this is where a party recruits anyone who wants to leave. The die cabinet is the obvious target: a stolen stamp turns any bar into Weir bar. The row also knows the gate schedule by ear before the book is published, because the hammers stop.',
      devNotes: 'Ties [[recipe.hammered-bar-iron|hammered bar iron]] to the barrage physically, so the toll economy and the iron chain share a failure point.',
    },
  }),

  E({
    id: 'district.black-weir-the-toll-house',
    type: 'district',
    name: 'The Toll House',
    status: 'draft',
    summary: 'The counter, the clerks and the schedule book: three rooms that decide who moves, when, and whose fields take the water.',
    tags: ['government', 'commerce'],
    fields: {
      overview:
        'A squat basalt block on the apron below the gates holding the booking counter, the clerks\' floor, the charter safe and the schedule book. Ninety-six gate-hours a week are written here and thirty of them are reserved to the Company before the counter opens. [[npc.ost-vennick|Ost Vennick]] works and sleeps on the upper floor.',
      city: [CITY.blackWeir],
      districtType: 'Administration and toll',
      wealth: 'Rich, discreetly',
      atmosphere:
        'Quiet, dry and warm, which after the gantries feels like a different country. Queues are orderly because the alternative is losing your place, and the clerks are unfailingly polite about outcomes they have already decided.',
      architecture:
        'Thick walls, small windows, a counter of scarred bole timber worn into a curve, and a stair to the upper floor that only three people use.',
      whoLivesHere: 'Company factors, eleven clerks, the sluice-master, and the book',
      danger: 'Low, and the consequences are elsewhere',
      playNotes:
        'The schedule book is the most valuable object in the delta: it is the only proof that any release was deliberate, including the one that settled a toll dispute. It is also the only document that tells a party in advance which downstream lots will be under water and when. Taking it and reading it are very different jobs with very different prices.',
      devNotes: 'Everything the Weir does to the delta is decided in this building, which is why it is small, dull and warm.',
    },
  }),

  E({
    id: 'district.black-weir-lampside',
    type: 'district',
    name: 'Lampside',
    status: 'draft',
    summary: 'Crew town below the gates: three watches of housing, lit at all hours, and the pumping gallery entrance nobody points at.',
    tags: ['residential', 'labour'],
    fields: {
      overview:
        'Where the people who run the works actually live. Lampside is built on the apron downstream of the toll house, lit continuously because the three watches mean somebody is always going to bed, and named for it. The drinking main from upstream terminates here, and so does the stair down into the pumping gallery.',
      city: [CITY.blackWeir],
      districtType: 'Crew housing and services',
      wealth: 'Modest',
      atmosphere:
        'Warm windows, wet streets and a population that shouts because half of it cannot hear. The eating houses run to the watch clock rather than the sun, so breakfast is served four times a day.',
      architecture:
        'Terraces of small deep-windowed stone housing packed close for warmth, iron shutters against spray, and lamps on every corner bracket that the Company oils and nobody steals.',
      whoLivesHere: 'Gate and winch crews and their families, forge hands, the Company office, and the gallery debtors when they are let up',
      danger: 'Moderate; the danger is downstairs',
      playNotes:
        'The pumping gallery inside the sill has to be manned continuously and is manned by debtors on shifts the Company counts. That is where an unwanted party ends up, and it is also the one place inside the works with a route under the gates. The yearly hearing test is a known way out and a known fraud, which is a small clean job for a party with a physician.',
      devNotes: 'The human floor of the entry. If the Weir is going to be sympathetic anywhere, it is here, which is the point.',
    },
  }),

  E({
    id: 'landmark.the-weir-gates',
    type: 'landmark',
    name: 'The Weir Gates',
    status: 'draft',
    summary: 'Fourteen worked gates in twenty-two bays of black basalt, holding eleven feet of river and selling it by the hour.',
    tags: ['landmark', 'infrastructure', 'engineering'],
    fields: {
      overview:
        'The barrage that gives the town its name and its charter: twenty-two bays across four hundred and ten strides of basalt sill, fourteen carrying worked gates, five chained open since the flood, three bricked. Everything moving between the interior and the eastern water passes one of them.',
      city: [CITY.blackWeir],
      landmarkType: 'Barrage, lock and toll',
      built: 'Unrecorded. The Company dates the works from its charter and has never published a construction date.',
      appearance:
        'Wet black stone streaked orange with rust, a haze of spray standing over the tail in any weather, and iron-bound gate slabs four strides by six hanging on chain in their guides. Lit at night the whole line reads as a row of small yellow windows over a white noise.',
      function:
        'Holds eleven feet of head at low water and four at flood; passes barges through worked bays as chambers; drives the trip hammers and the pumps off two bays of race. Commercially it does one thing: it makes certainty scarce and then sells it.',
      access:
        'The gantry walkway is Company ground and patrolled the whole length. Locking through is booked at the toll house. Approaching a gate from the water without a booking is treated as intent to interfere, which is charged as murder.',
      devNotes:
        PROPOSAL('The Black Weir is a canon name with no canon concept; the Weir Gates landmark comes from the brief\'s labelled proposal sketch. The bay count, the head, the chained-open bays and the lock-through economy are all invention and can be replaced wholesale.'),
    },
  }),

  E({
    id: 'landmark.the-flood-post',
    type: 'landmark',
    name: 'The Flood Post',
    status: 'draft',
    summary: 'A basalt post below the gates cut with every recorded release: height, date, and no column for what it landed on.',
    tags: ['landmark', 'record'],
    fields: {
      overview:
        'A single dressed basalt post standing on the apron below the works, cut across with a horizontal line for every recorded release and every recorded flood, each with its height and its date. It is the Company\'s public record and its favourite argument: nothing here is hidden, it says, and everything here is measured.',
      city: [CITY.blackWeir],
      landmarkType: 'Gauge and public record',
      built: 'Cut progressively; the lowest legible line is roughly a century old',
      appearance:
        'Chest-high to twice head height, black, weed-stained to the flood line, and dense with fine cut lettering that gets shallower and better spaced as it climbs.',
      function:
        'Records what the river did. What it conspicuously does not record is why, so the release that settled a toll dispute sits on the post as a maintenance line like any other, at a height that anyone from the delta can read as a year of ruined rice.',
      access: 'Open ground, always accessible, and a common place for delta people to stand and say nothing.',
      devNotes:
        PROPOSAL('A public monument that is honest about everything except intent. Gives players physical evidence that a release happened and no evidence at all that it was ordered, which is exactly the gap the schedule book fills.'),
    },
  }),

  E({
    id: 'landmark.the-eleventh-sluice',
    type: 'landmark',
    name: 'The Eleventh Sluice',
    status: 'draft',
    summary: 'A chained-open bay nobody has surveyed since the flood, workable for about forty minutes between scheduled openings.',
    tags: ['landmark', 'smuggling', 'hazard'],
    fields: {
      overview:
        'One of the five bays chained open after the flood and never re-gated. Officially it is a hazard and a maintenance item on a list. Practically it is a channel: in the slack between scheduled openings, when the head across it drops, a small boat can be worked through it, and [[npc.dagren-hoyle|Dagren Hoyle]] sells that passage.',
      city: [CITY.blackWeir],
      landmarkType: 'Disused bay and unlawful channel',
      built: 'Gated originally; the gate and its chain went in the flood and were never replaced',
      appearance:
        'A gap in the line where the pier work is scoured back and the water goes through in a standing wave. From the gantry above it looks like nothing. From a boat at the wrong moment it looks like a wall.',
      function:
        'Nothing lawful. It passes water, it wrecks anything that misjudges the slack, and it is the reason the Company\'s toll figures and the Company\'s traffic figures have never agreed.',
      access:
        'Roughly forty minutes between scheduled openings, judged by ear and by the hammers stopping. Two of Dagren Hoyle\'s crews have drowned in it and he tells recruits so before they sign.',
      devNotes:
        PROPOSAL('Gives the sluice-book mechanic an exploit with a hard timer and a real body count, so smuggling here is a skill problem rather than a bribe.'),
    },
  }),

  /* ---------------------------------------------------------------- */
  /* Oruvai                                                            */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.oruvai,
    type: 'city',
    name: 'Oruvai',
    status: 'draft',
    summary: 'A highland city on the pass between karst and Greatwood. Everything known about it was learned from outside the gate.',
    tags: ['highland', 'unwritten', 'porterage'],
    fields: {
      epithet: TBD('Do outsiders have a name for Oruvai other than Oruvai, and does Oruvai use it?'),
      overview:
        'A walled town on a highland shelf where the karst road meets the forest road, at the only crossing between [[region.hollow-karst|the Hollow Karst]] and [[region.the-greatwood|the Greatwood]] a loaded animal can use. That much is verifiable, because traders stand in the carry yard below the wall four times a year and look at it.\n\nAlmost nothing else is. Outsiders are met at the yard, weighed, paid and sent back down. Cut stone comes out in quantity. [[npc.anwe-halduri|A factor]] comes down to the karst markets four times a year, pays in advance, stays no nights and refuses every invitation to travel back with her. No Ascent house has ever had a factor inside the walls, which is why [[quest.open-account|the Brass Assize wants one]].\n\nThis entry is written from the yard. Where it does not know, it says so.',
      founded: TBD('Nothing is established about when or why Oruvai was founded, or by whom.'),
      settlementType: 'Walled highland town (as observed from below)',

      region: [REGION.hollowKarst],
      biome: 'Highland shelf between karst and forest',
      terrain:
        'A broad shelf of bedded limestone at the head of the pass, roughly nine hundred strides above the karst road, with terraced cut faces below the wall on the eastern flank. The terraces are old, extensive, and nobody outside has established what they were for.',
      climate:
        'Cold, dry and windy. Snow closes the pass for part of the winter, and the closure is the single most consequential fact anyone outside Oruvai knows about it.',
      approach:
        'A day and a half up the [[region.hollow-karst|karst road]] on switchbacks with no cover, in full view of the wall for the last three hours. Loads are broken at the carry yard below the gate and go up on porters. Wagons do not go up. Nobody outside has established whether that is the road or the rule.',

      cityMapNote:
        'What can be mapped is the arc below the wall: the carry yard, the gate, and the market ground where the four fixed days are held. The upper town is drawn as one shape because it is one shape to everyone who has drawn it, which is everyone standing outside.',
      districtCount: '4 mapped, of which one is a guess at an outline',
      cityMap: ORUVAI_MAP,

      architecture:
        'Dry-laid and dressed limestone, close-jointed, with very little timber visible from below despite a forest two days away. Roofs are stone slab. The wall is continuous, low by Greatwood standards and extremely well built, and it has no towers on the visible face, which every soldier who has looked at it finds strange enough to comment on.',
      silhouette: 'A long pale wall on a shelf, terraced cut faces below it, and no roofline breaking the top.',
      palette: ['#8c8579', '#5b6650', '#c9c0ad', '#3a3f3c'],
      buildMaterials: TBD('The stone is local. What Oruvai builds its interiors from, and whether it imports timber at all, is unknown.'),

      landmarkName: TBD('Oruvai has no established landmark. The carry beam is a proposal and the terraces are a question.'),
      landmarkDesc:
        'The two candidates are both outside the wall. [[landmark.the-carry-beam|The carry beam]] at the yard head is the object every visitor actually deals with; [[landmark.the-blind-terraces|the blind terraces]] on the eastern flank are the object every visitor actually wonders about.',

      energy: TBD('No smoke plume, no wheel race and no forge noise is audible from the yard. What powers Oruvai?'),
      infrastructure:
        'Water runs out of the shelf below the wall in a cut stone channel at a steady rate all year, including in drought, and is the reason the carry yard exists where it does. Where it comes from is not visible from outside.',
      keyMachines: TBD('Nothing mechanical has been observed above the wall. That may mean there is nothing, or that it is not on the outward face.'),

      transport:
        'Porterage, exclusively. Loads are broken at the yard, weighed on the beam, and carried up by Oruvai porters at a rate set by weight and altitude under [[mechanic.the-high-carry|the High Carry]]. No outside animal goes above the yard. No outside wagon goes above the karst road.',
      traversal:
        'The pass is the only practical link between the karst and the Greatwood for a loaded party, which makes Oruvai a gate on a route two cities need. Weather shuts it without notice and voids the contract when it does, and the porters go home. A party crossing in bad season wants [[skill.weather-eye|Weather Eye]] and [[skill.the-far-walk|The Far Walk]] and should still expect to lose days.',

      government: TBD('Who decides anything in Oruvai? No outsider has met an official, only factors and porters.'),
      politicalLeaning: TBD('Closed, certainly. Whether that is policy, custom or fear is not established.'),
      ruler: TBD('Whose seal does [[npc.anwe-halduri|Anwe Halduri]] carry, and does that person hold office or property?'),
      succession: TBD('Unknown, and there is no observed ceremony, procession or mourning that would hint at it.'),

      laws:
        'Only the yard law is known, and it is short: loads are weighed on the beam, the beam is not disputed, and disputes go to the porters\' reckoner rather than to anyone inside the wall. Outsiders have never been tried in Oruvai because outsiders have never been admitted long enough to offend.',
      enforcement: 'Gate wardens on the wall; the yard polices itself through the porters',
      extradition: TBD('No writ from any city has ever been served at Oruvai. Nobody has established what would happen if one were.'),
      notableCrimes: [
        'Loading above the beam\'s marked limit (the porters refuse the carry; there is no appeal)',
        'Following a porter train above the yard without leave (turned back at the gate; nobody has reported a second attempt)',
        TBD('Everything else. No outsider has witnessed an Oruvai prosecution.'),
      ],

      socialClasses: TBD('The only Oruvai social distinction visible from the yard is porter and factor. Is that the whole of it, or the part they send down?'),

      population: TBD('The carry yard has never seen more than about two hundred Oruvai at once. The wall encloses room for far more.'),
      demographics: [
        row({ group: 'Oruvai porters', share: 'The visible majority', note: 'Work the carry, speak trade cant, answer nothing about the town. Rotate, so no visitor sees the same face twice in a year.' }),
        row({ group: 'Oruvai factors', share: 'A handful', note: 'Come down to the karst markets four times a year. Pay in advance, in cut stone, and never stay a night.' }),
        row({ group: 'Everyone else', share: 'Unknown', note: 'Nobody outside the wall has met them, described them, or established that they are one people rather than several.' }),
      ],
      languages: [
        '[[skill.trade-cant|Trade cant]] in the carry yard, spoken well and used only for business',
        TBD('The porters speak something else among themselves. Nobody has written it down.'),
      ],
      cultures: TBD('No observance, festival or burial has ever been seen from outside the wall.'),

      food:
        'The terraces below the wall are worked, and something grows on them at altitude in thin soil. Nobody in the karst markets has been able to buy any of it, which either means Oruvai eats everything it grows or that what it grows is not food.',
      water: 'The cut channel below the wall runs all year at a steady rate, including in drought. That is the one piece of Oruvai engineering an outsider can put a hand on.',
      staples: TBD('What Oruvai actually eats is unknown; nothing edible has ever come down the pass for sale.'),

      economy:
        'From outside, two visible trades. Oruvai sells porterage over the pass, priced by weight and altitude, and it pays for what it buys in cut stone: dressed, square, of a quality the karst reeves accept without argument. The stone is the puzzle. There is a great deal of it, it is better cut than anything in the karst markets, and no outside buyer has ever been shown the quarry.',
      mainProduction: 'Porterage over the pass, and cut stone',
      currency:
        'Takes stair writs and karst light-tallies without comment. Pays in cut stone by preference, which most sellers accept because it resells easily and nobody wants to insist.',
      wealth: 'Modest',

      exports: TBD('Cut stone leaves Oruvai in quantity and nothing in the seed names it. Does it deserve a material entry, and what is it?'),
      imports: TBD('Oruvai buys, pays in advance and takes delivery at the yard. What goes up the pass has never been catalogued by anyone outside.'),
      tradeNotes:
        'The [[quest.open-account|Brass Assize]] wants a licensed route through here and a tariff seat behind it, which requires figures nobody in any guild has. Oruvai has not refused. Oruvai has not agreed. It has simply continued to trade four days a year on its own terms, which is the most eloquent thing it does.',

      localResources: TBD('The stone is local. Whether Oruvai sits on anything else is unestablished and would change the city entirely.'),
      resourceNotes:
        'No outside surveyor has been above the yard. The terraces on the eastern flank are extensive enough to be either agriculture or extraction and have been argued as both in the karst markets for years.',

      defense:
        'A continuous dressed-stone wall with no towers on the visible face, a single gate above the carry yard, and wardens who are seen but never counted. What is behind it is unknown. Every soldier who has looked at the wall has said the same two things: it is very well built, and it is not built for the direction it faces.',
      doctrine: TBD('Oruvai has never been observed to fight, muster, drill or garrison. Nobody knows whether it can.'),
      garrison: TBD('Unknown. The gate is always manned and the number on the wall never repeats.'),

      factionNotes:
        'No outside faction has a house here. [[faction.bonewax-post|The Bonewax Post]] is passed through the gate like everywhere else, which is currently the only established fact about how Oruvai treats an institution. The [[quest.open-account|Brass Assize]] is trying to be the first Ascent presence and has not been told no. Whether Oruvai has factions of its own is [[note.oruvai-concept|an open design question]].',

      currentConflict: 'A licensed route the Ascent wants and Oruvai has not agreed to',
      problems: [
        '[[quest.open-account|The Brass Assize]] needs figures from inside the wall and has no lawful way to get them',
        'The pass shuts without notice and voids every contract standing on it, which nobody has learned to price',
        'Cut stone is arriving in the karst markets faster than any known quarry could produce it',
        '[[npc.anwe-halduri|A seal the karst reeves honour without being able to read]] is being used four times a year and nobody has traced it',
        TBD('What Oruvai wants. It buys, it sells, it refuses company, and no one has established a motive.'),
      ],

      cityRelations: [
        row({ city: '[[city.cave-agrarian-city|The Cave Agrarian City]]', stance: 'Regular trade, four days a year', note: 'The karst markets are the only place Oruvai deals face to face. Reeves honour its seal without reading it.' }),
        row({ city: '[[city.tree-city|The Tree City]]', stance: 'Road neighbours', note: 'The forest road runs from the pass to the Greatwood. Whether anything moves on it is unestablished.' }),
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Courted', note: 'The Assize wants a lawful highland route and a tariff seat. Oruvai has neither agreed nor refused.' }),
      ],

      signatureMechanic: 'The High Carry',
      mechanicNotes:
        '[[mechanic.the-high-carry|The High Carry]] is the only Oruvai system outsiders actually play with. Loads are broken at the yard, weighed on the beam and priced by weight and by the altitude they are going to, so a party crossing the pass is making a real decision about what it is willing to leave behind. Weather shuts the pass and voids the contract, which means the porters keep the advance and go home and the load sits in the yard until spring.\n\nUse it as the toll on a route rather than as a puzzle about Oruvai. It works perfectly well without anybody deciding what the city is, which is why it is here: the mechanic is portable, and if the pass ends up belonging to somewhere else entirely, the beam moves with it.',

      npcNotes:
        '[[npc.anwe-halduri|Anwe Halduri]] is the only Oruvai anyone outside can name: a highland factor, four visits a year to the karst markets, never a night\'s stay, paying in advance in cut stone and refusing every invitation to travel back with her. She carries a seal that karst reeves honour without being able to read, and who issues that seal is the single most productive open question in this entry. Everything else about Oruvai\'s people is a porter\'s face nobody sees twice.',
      questNotes:
        '[[quest.open-account|Open Account]] starts here and is deliberately built on the gap: the Brass Assize wants the first licensed route into the highland and figures nobody in any guild has, and the quest either wins a lawful road and the tariff seat behind it or writes Oruvai off as unbankable for a decade and leaves the pass to whoever runs it unlicensed. Run it without deciding what Oruvai is. The interesting version is the one where the party gets inside the wall and the table finds out at the same moment the campaign does.',

      services: [
        row({ name: 'Porterage over the pass', where: 'the carry yard', note: 'Priced by weight and altitude under [[mechanic.the-high-carry|the High Carry]]. Weather voids the contract and the advance is not returned.' }),
        row({ name: 'Load breaking and storage', where: 'the yard sheds', note: 'Wagons are emptied here. Stored loads over winter are held at the owner\'s risk and have never been reported stolen.' }),
        row({ name: 'Weighing', where: '[[landmark.the-carry-beam|the carry beam]]', note: 'Free, public and not disputed. The beam\'s reading settles the price and no yard argument survives it.' }),
        row({ name: 'Cut stone, by the block', where: 'the market ground, four days a year', note: 'Better dressed than anything in the karst markets. No buyer has ever been shown the quarry.' }),
      ],

      creatureNotes: TBD('Nothing has been recorded about what lives on the shelf, in the terraces, or on the pass above the snow line.'),

      history: TBD('Oruvai has no recorded history outside its own wall. The terraces are visibly older than any account of the place.'),

      devNotes:
        'CANON: the name Oruvai, and nothing else. ' +
        PROPOSAL('Kept deliberately thin. The entry commits only to what the brief\'s siting already implies — a highland town on the pass between the karst and the Greatwood — and to the two things other authors have already put in play: [[mechanic.the-high-carry|the High Carry]] and [[npc.anwe-halduri|Anwe Halduri]]. Everything else is written as an outsider\'s observation with the unknown left as unknown, so that whatever Oruvai turns out to be, nothing here has to be retracted. Do not let this entry accumulate backstory. See [[note.oruvai-concept|the design note]].'),
      openQuestions: [
        'What are the terraces on the eastern flank for, and why are they older than any account of the town?',
        'Where is the quarry, and how is Oruvai cutting stone better than the karst can?',
        'Who issues the seal Anwe Halduri carries, and why do karst reeves honour a mark they cannot read?',
        'Why is a very well built wall built facing the wrong way, and what is it facing away from?',
        'Does Oruvai want anything from the other cities at all, or is the trade incidental to something else?',
      ],
    },
  }),

  E({
    id: 'district.oruvai-the-carry-yard',
    type: 'district',
    name: 'The Carry Yard',
    status: 'draft',
    summary: 'The load-breaking ground below the gate: the beam, the sheds, the porters, and as far as any outsider gets.',
    tags: ['trade', 'labour'],
    fields: {
      overview:
        'A walled ground of packed gravel below the gate where every load coming up the pass is broken, weighed on [[landmark.the-carry-beam|the beam]] and handed to Oruvai porters. It has sheds, a water channel, a reckoner\'s bench and no lodging, because nobody is expected to stay. This is where the entire outside world meets Oruvai.',
      city: [CITY.oruvai],
      districtType: 'Transshipment yard',
      wealth: 'Modest',
      atmosphere:
        'Businesslike, cold and slightly unnerving. The porters are courteous, efficient and completely uninformative; questions about the town are answered with a price for something else.',
      architecture:
        'Dry-laid stone walls, stone-slab sheds, a cut channel running the length of it, and a gate at the upper end that is open during business and shut at dusk whether or not business has finished.',
      whoLivesHere: 'Nobody sleeps here. Porters rotate down from the town; traders camp on the road below',
      danger: 'Low, and rising sharply at the gate',
      playNotes:
        'The whole of Oruvai that a party can lawfully reach. Everything the [[quest.open-account|Brass Assize]] wants has to be obtained from this ground or through the gate at the top of it. Hiring on as a porter is the obvious plan and has never been observed to work: the rotation means no outsider has been offered a place.',
      devNotes: 'A district built as a boundary. Its job is to make the rest of the city feel deliberately withheld rather than unwritten.',
    },
  }),

  E({
    id: 'district.oruvai-the-shut-gate',
    type: 'district',
    name: 'The Shut Gate',
    status: 'draft',
    summary: 'The single gate above the yard: manned, unhurried, and shut at dusk regardless of what is still on the road.',
    tags: ['gate', 'military'],
    fields: {
      overview:
        'One gate in a continuous wall, at the head of the yard ramp. It is manned at all hours by wardens who are never the same and never counted, opens for porter trains and Oruvai factors, and shuts at dusk. It is also the object that gives [[mechanic.the-high-carry|the High Carry]] its teeth: when the weather closes, the gate shuts early and the contract is void.',
      city: [CITY.oruvai],
      districtType: 'Gate and wall works',
      wealth: TBD('Nothing about the gate indicates who pays for it.'),
      atmosphere:
        'Quiet and entirely without theatre. There is no challenge, no horn and no display; the wardens simply stand, and the gate is either open or it is not.',
      architecture:
        'Close-jointed dressed limestone, no towers on the outward face, a single arch with two leaves of stone-faced timber, and no visible murder-holes, machicolation or hoarding of any kind.',
      whoLivesHere: 'Gate wardens, who are not observed to change shift and are not observed to sleep',
      danger: 'Unknown, and everyone treats it as high',
      playNotes:
        'The hard boundary of the campaign\'s knowledge. Any plan to get inside Oruvai passes through here or over the wall, and nobody outside can tell a party what is on the other side. Treat a successful entry as a major reveal that the table and the setting make together.',
      devNotes:
        PROPOSAL('The absence of towers and hoarding is the one deliberate hook: a wall this good, built without any of the features that face an attacker, is a question rather than an oversight.'),
    },
  }),

  E({
    id: 'district.oruvai-the-stone-market',
    type: 'district',
    name: 'The Market Ground',
    status: 'draft',
    summary: 'Four fixed days a year: cut stone changes hands, factors pay in advance, and nobody is invited back up.',
    tags: ['trade'],
    fields: {
      overview:
        'A levelled ground east of the gate ramp, used four days a year and empty the rest of the time. On those days Oruvai brings down dressed stone by the block and takes delivery of whatever it has paid for in advance, and karst and Greatwood traders come up to meet it. The market opens at first light and is cleared before dark.',
      city: [CITY.oruvai],
      districtType: 'Seasonal market',
      wealth: 'Prosperous, four days a year',
      atmosphere:
        'A great deal of business conducted very quickly by people who have somewhere to be. There is no drinking, no music and no lodging. When it ends it ends within an hour and the ground is bare.',
      architecture:
        'Set stone standing-pitches numbered on the flags, a weighing frame, and nothing that would take a roof or a fire.',
      whoLivesHere: 'Nobody. [[npc.anwe-halduri|Anwe Halduri]] is here on two of the four days and gone by dusk both times',
      danger: 'Low',
      playNotes:
        'The only place an outsider can deal with an Oruvai on something other than a carry price. Anwe Halduri pays in advance and refuses company, which makes following her the obvious move and a genuinely difficult one. Tracing the seal she carries starts here and does not finish here.',
      devNotes: 'Four days a year is a scheduling constraint, which makes the market a clock the campaign can be hung on.',
    },
  }),

  E({
    id: 'district.oruvai-the-upper-town',
    type: 'district',
    name: 'The Upper Town',
    status: 'draft',
    summary: 'Everything above the wall. Drawn as one shape because that is all anyone outside has ever been able to draw.',
    tags: ['unwritten'],
    fields: {
      overview:
        'The town proper. From the yard you can see the top of the wall and no roofline above it, which either means the buildings are low or that they are not where the ground appears to be. Smoke is minimal and steady. There is no bell, no visible signal, and no noise that carries. This district is an outline on a map and an admission on a page.',
      city: [CITY.oruvai],
      districtType: TBD('Unknown. Nobody outside has established whether Oruvai is one settlement or several inside one wall.'),
      wealth: TBD('The cut stone suggests means. Nothing else does.'),
      atmosphere: TBD('No outsider has reported the inside of Oruvai. Any atmosphere written here would be invention.'),
      architecture:
        'Inferred only, and from one datum: the wall. Close-jointed dressed limestone, stone slab roofing where any is visible, and no timber framing showing at the top of the wall despite a forest two days\' travel away.',
      whoLivesHere: TBD('Unknown. The porters and the factors come from somewhere inside this outline.'),
      danger: TBD('Unestablished, and treated as extreme by everyone who has considered going in.'),
      playNotes:
        'Reserve this. Getting in should be a campaign event, not a scene, and what the party finds is a decision for the table rather than a thing this entry has already decided. If it is ever written, write it once and write it as canon.',
      devNotes:
        PROPOSAL('Deliberately empty. The district exists so the city map has a shape and the wiki has somewhere to put the answer when somebody decides it. Do not fill this in casually.'),
    },
  }),

  E({
    id: 'landmark.the-carry-beam',
    type: 'landmark',
    name: 'The Carry Beam',
    status: 'draft',
    summary: 'The public weighbeam at the yard head. Its reading sets the carry price and no argument survives it.',
    tags: ['landmark', 'trade'],
    fields: {
      overview:
        'A stone-mounted weighbeam at the head of the carry yard: a dressed limestone frame, an iron beam, a pan on one side and a graduated arm on the other. Every load going up the pass is weighed on it, and the reading fixes the porterage price under [[mechanic.the-high-carry|the High Carry]]. It is free to use, public, and the one Oruvai institution outsiders can inspect.',
      city: [CITY.oruvai],
      landmarkType: 'Public weighbeam',
      built: 'The stonework is older than the ironwork by a good deal; the beam has clearly been replaced at least twice',
      appearance:
        'Waist-high stone piers polished by sixty years of hands, an iron beam kept oiled, and a graduated arm cut with marks that do not correspond to any weight standard in the karst markets or on the Counting Stair.',
      function:
        'Sets the price. Also, quietly, sets a limit: there is a marked point on the arm above which the porters simply refuse the carry, and no visitor has ever talked them past it.',
      access: 'Open ground in the yard, in use whenever the yard is, and never left unattended.',
      devNotes:
        PROPOSAL('A modest, entirely external landmark for a city that has no established one. The non-standard graduations are the hook: Oruvai is measuring in units nobody else uses and has never explained them.'),
    },
  }),

  E({
    id: 'landmark.the-blind-terraces',
    type: 'landmark',
    name: 'The Blind Terraces',
    status: 'draft',
    summary: 'Cut terraces stepping down the eastern flank, extensive, worked, and of no established purpose whatsoever.',
    tags: ['landmark', 'question'],
    fields: {
      overview:
        'Forty or more cut stone terraces stepping down the eastern flank of the shelf below the wall, each a few strides deep, running for the better part of a mile. They are visibly maintained. Something is grown or dug on them. From the karst road, at the only angle an outsider gets, it is impossible to say which.',
      city: [CITY.oruvai],
      landmarkType: 'Terracing of unestablished purpose',
      built: 'Older than any account of Oruvai held anywhere else, which is the whole problem',
      appearance:
        'Pale stepped stone, retaining walls in the same close-jointed work as the town wall, and dark growth on some steps and not others in a pattern that changes between visits.',
      function: TBD('Agriculture, extraction, water management or something else. Karst market traders have argued all four for years and nobody has been closer than a mile.'),
      access:
        'Off the road, below the wall, and unfenced. No outsider has been stopped walking towards them and no outsider has reported reaching them, which is a discrepancy somebody should follow up.',
      devNotes:
        PROPOSAL('A landmark that is explicitly an unanswered question, so the city has something to look at without the entry committing to what it means. The unfenced-but-unreached detail is the deliberate loose thread.'),
    },
  }),

  /* ---------------------------------------------------------------- */
  /* Keth Veyra                                                        */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.kethVeyra,
    type: 'city',
    name: 'Keth Veyra',
    status: 'draft',
    summary: 'A fogbound harbour on the cold north-east coast, navigated by owned bells. What the city is behind the fog is undecided.',
    tags: ['coastal', 'fog', 'unwritten', 'shipping'],
    fields: {
      epithet: TBD('Pilots call the approach the Bell Lines. Whether the city has a name for itself beyond Keth Veyra is unestablished.'),
      overview:
        'A harbour under the [[region.mistfall-coast|Mistfall]], which means a harbour under fog on more days than not. Ships come in on bearings taken off bells: a line of iron bells on rocks, headlands and moored buoys along the approach, each rung on its own interval, each owned by somebody. A pilot who knows the intervals can bring a hull in blind. Everyone else waits offshore or wrecks.\n\nFour bells went silent in one season. The pilots stopped sailing, winter shipping is now a question rather than a schedule, and nobody has yet established what that costs the coast — because nobody has yet established what the coast is for.\n\nThis entry stops at the quay on purpose. Keth Veyra is a canon name with no canon concept, and the fog is a convenient reason for an outsider to be able to describe the waterfront and nothing above it.',
      founded: TBD('Nothing is established about the founding of Keth Veyra. The oldest bell on the approach is older than the oldest quay.'),
      settlementType: 'Fogbound harbour town (as seen from the quays)',

      region: [REGION.mistfallCoast],
      biome: 'Cold fog coast',
      terrain:
        'A drowned valley cut into sea cliffs, giving a deep sheltered inlet with almost no beach. The town is stacked up the northern side of it. Rock offshore in quantity, which is the reason for the bells.',
      climate:
        'Cool maritime and wet. Fog on most days for most of the year, thickest in the mornings and in winter, when a cold current meets warmer air over the shelf and closes the approach for days at a time.',
      approach:
        'By sea, slowly, listening. A ship takes the [[landmark.the-outer-bell|outer bell]] first, then works in from bell to bell on interval and bearing with a leadsman going continuously. Overland from the west it is a hard three days of headland and drowned valley, and the road arrives above the fog line looking down onto cloud with a town somewhere inside it.',

      cityMapNote:
        'A long diagonal: the quay band runs the whole length of the inlet\'s northern shore, with the pilot stair and the manifest house set back on the first terrace and the rest of the town above the fog line. What is drawn is what is below the cloud on a clear morning and what is directly above it. The middle of the town is in the fog on most days and is not mapped.',
      districtCount: '4 mapped; the town between the quays and the ridge is not surveyed',
      cityMap: KETH_VEYRA_MAP,

      architecture:
        'Wet grey stone, tarred timber and a great deal of bronze that has gone green. Buildings on the waterfront are low, heavy and shuttered on the seaward face; everything is roofed steeply against the drip. The one consistent feature is bells: door bells, yard bells, watch bells, and the approach bells offshore, all of the same green bronze and all rung to intervals that mean something to somebody.',
      silhouette: 'A stepped grey waterfront under cloud, quays like teeth in the water, and a ridge line above the fog with lights on it.',
      palette: ['#9fadb2', '#2f3d44', '#c6cbc4', '#6b4f3a'],
      buildMaterials: TBD('The stone is local cliff rock. Where the timber and the bronze come from has not been established.'),

      landmarkName: TBD('Keth Veyra has no established landmark. The outer bell and the bell roll are proposals and both sit on the water.'),
      landmarkDesc:
        'Both candidates belong to the approach rather than the town. [[landmark.the-outer-bell|The outer bell]] is the first mark inbound and has been silent since last season; [[landmark.the-bell-roll|the bell roll]] on the quay lists every bell, its bearing and its owner, with half the owner column struck out.',

      energy: TBD('No smoke worth noting, no wheel race audible from the quay. What Keth Veyra burns, and for what, is unknown.'),
      infrastructure:
        'The bells are the infrastructure, and they are privately owned. Beyond them: the quays, a tide stair, a cliff hoist that lifts cargo to the first terrace, and a fog signal on the north head that answers the outer bell and has not been heard answering it since the bell went quiet.',
      keyMachines: TBD('Nothing industrial has been observed from the waterfront. That may mean it is above the fog.'),

      transport:
        'Sea in, sea out, and a cliff hoist between the quays and the terrace. Everything else is fog. A cargo landed here is cleared at the manifest house, lifted, and disappears upward into weather that outsiders are not encouraged to walk into.',
      traversal:
        'Inside the fog, movement is by bell and by memory. Locals navigate their own streets by which yard bell they can hear and from what side; a stranger in a thick morning is genuinely, comprehensively lost within two turnings. On the water it is [[mechanic.the-bell-lines|the Bell Lines]] or nothing, and a silenced bell is a route nobody can walk.',

      government: TBD('Nobody outside has identified who governs Keth Veyra. The pilots and the manifest clerks both defer to someone they do not name.'),
      politicalLeaning: TBD('The only politics visible from the quay is bell ownership, and even that is half struck out on the roll.'),
      ruler: TBD('Unestablished. Whoever owns the most bells is the obvious guess and has never been confirmed.'),
      succession: TBD('Unknown. Bells appear to change hands; whether by inheritance, sale or seizure has not been recorded.'),

      laws:
        'Only harbour law is visible: cargo is declared at the manifest house, pilotage is compulsory inbound, and interfering with a bell is treated with a seriousness that suggests it is the most serious thing there is. Nobody outside has seen a court, a gaol or a punishment carried out.',
      enforcement: 'Harbour wardens on the quays; the Mistfall Pilotage polices pilotage itself',
      extradition: TBD('No writ has been tested here. The manifest house accepts documents from anywhere and returns nobody.'),
      notableCrimes: [
        'Silencing, muffling or moving a bell (treated as the gravest offence on the coast; the penalty is not published)',
        'Sailing the approach without a pilot (impounding, and salvage rights over anything you hit)',
        'Clearing cargo under a name that is not yours (routine, apparently tolerated, and see [[npc.ismet-radva|Ismet Radva]])',
        TBD('Everything that happens above the fog line. No outsider has witnessed a prosecution.'),
      ],

      socialClasses: TBD('The waterfront shows pilots, clerks, hoist crews and bell-owners. Whether that is the society or its outward face is unestablished.'),

      population: TBD('The waterfront supports a few hundred. The lights on the ridge above the fog suggest a great many more.'),
      demographics: [
        row({ group: 'Bell-line pilots', share: 'A closed body of perhaps forty', note: 'Hold the intervals and the bearings by memory. Will not sail an approach with a silent mark, at any price.' }),
        row({ group: 'Quay and hoist crews', share: 'The visible majority of the waterfront', note: 'Work the cargo, live below the fog line, and answer questions about the town by changing the subject.' }),
        row({ group: 'Manifest clerks and factors', share: 'A few dozen', note: 'Clear cargo for names that are sometimes people. Efficient, incurious, and paid by somebody.' }),
        row({ group: 'Everyone above the fog', share: 'Unknown', note: 'Seen as lights on the ridge and heard as bells. Not described by any outside account.' }),
      ],
      languages: [
        '[[skill.trade-cant|Trade cant]] on the quays and in the manifest house',
        'Bell interval, which is not a language and is used as one: pilots hold whole conversations in rung patterns',
        TBD('What is spoken above the fog line has not been recorded.'),
      ],
      cultures: TBD('The bells are rung on intervals that are not all navigational. Nobody outside knows what the others are for.'),

      food: TBD('Fish, certainly; the boats go out. What the town eats otherwise, and whether it imports grain, is unestablished.'),
      water: TBD('Streams come off the cliffs in quantity. Where the town takes its water is not visible from the quays.'),
      staples: TBD('Nothing edible has ever been catalogued leaving or entering Keth Veyra by an outside hand.'),

      economy:
        'From the quay, three things move. Cargo is landed, cleared and lifted; pilotage is sold at a rate the Pilotage sets and nobody argues with; and [[creature.mistfall-bell|bell]] filament is landed off the harvest boats in sealed tubs, bound onward under licence. What the cargo is, and where it goes after the hoist, has never been followed by anyone from outside.',
      mainProduction: 'Pilotage, landed cargo, and Mistfall bell filament',
      currency: 'Ascent stair writs are taken on the quay without comment. What is used above the fog line is unknown',
      wealth: TBD('The quays are well found and the bronze is everywhere. Neither proves anything about the town.'),

      exports: TBD('Sealed tubs of bell filament go out under licence. What else leaves Keth Veyra has not been established.'),
      imports: TBD('Cargo is landed here in quantity and lifted out of sight. Nobody outside has established what any of it is.'),
      tradeNotes:
        'The one thing an outsider can say with confidence is that the traffic is larger than the visible town needs. That observation is what makes [[npc.ismet-radva|the Ismet Radva manifests]] interesting rather than merely irregular: two cargoes cleared under one name in the same week at ports eleven days apart.',

      localResources: TBD('Unestablished. The offshore rock, the fog and the cold current are the only assets anyone outside can name.'),
      resourceNotes:
        'The [[creature.mistfall-bell|Mistfall bells]] are harvested off this shelf and rendered into [[spell.stillwater-draught|the paralytic]] surgeons across the continent depend on. The harvest divers lose feeling in their hands and then drown, which is the one hard human fact this entry has about Keth Veyra.',

      defense: TBD('No wall, battery or guardship has been observed. The fog and the rock may be the whole of it, which would be a decision rather than an absence.'),
      doctrine: TBD('Keth Veyra has never been seen to fight. Silencing a bell may be the local equivalent of an act of war.'),
      garrison: TBD('Harbour wardens are visible on the quays. Nothing else has been counted.'),

      factionNotes:
        'The Mistfall Pilotage — the pilots\' body named in [[quest.the-fog-bells|the standing job]] — is the only organised presence an outsider deals with, and it is a guild in behaviour if not in any charter anyone has seen. [[faction.bonewax-post|The Bonewax Post]] lands here like everywhere else. Bell ownership is the only politics the approach implies, and half the owner column on [[landmark.the-bell-roll|the roll]] is struck out, which is either bookkeeping or a very quiet succession.',

      currentConflict: 'Four bells silent in one season and no pilot willing to sail blind',
      problems: [
        '[[quest.the-fog-bells|Four bells on the approach have gone quiet]] and the Pilotage will not work an approach with a silent mark',
        'Winter shipping stops without a working approach, and nobody has established what that costs the coast',
        'Half the owner column on the bell roll is struck out and nobody on the quay will say by whom',
        'Cargo is landed here in quantities the visible town cannot need',
        '[[npc.ismet-radva|One name]] cleared two cargoes in the same week at ports eleven days apart',
        'Bell harvest divers are being lost at a rate the boats have stopped reading aloud',
      ],

      cityRelations: [
        row({ city: '[[city.magic-city|The Magic City]]', stance: 'Nearest neighbour', note: 'The closest settlement of any size. Whether anything moves between them overland is unestablished.' }),
        row({ city: '[[city.mediterranean-city|The Mediterranean City]]', stance: 'Licensed buyer', note: 'Takes bell filament for [[spell.stillwater-draught|the surgical paralytic]]. The only trade link anyone outside can document.' }),
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Paper connection', note: 'Stair writs clear on the quay. No Ascent house has a factor here and none has asked publicly.' }),
      ],

      signatureMechanic: 'The Bell Lines',
      mechanicNotes:
        '[[mechanic.the-bell-lines|The Bell Lines]] make navigation a property question. The approach is walked by ear: each bell has an interval and a bearing, a pilot holds the sequence in memory, and a route is only usable while every mark on it is ringing. Silencing one does not make the passage harder, it deletes it, and since every bell is owned, deleting a passage is something a person decides to do.\n\nThe same logic works inside the fog on land, which is why the town is full of yard bells. Run it as a stealth and access system as much as a travel one: a party that learns three intervals can move through a morning fog that stops everybody else, and a party that muffles one bell has closed a street. Keep the politics to bell ownership and leave the rest of Keth Veyra open.',

      npcNotes:
        '[[npc.ismet-radva|Ismet Radva]] is a name on three manifests and nobody has met the same person twice: two cargoes cleared under it in one week at ports eleven days apart. One person, a shared office, or a dead credential still in use — tracing it is a whole investigation and the answer will say more about what Keth Veyra is than anything else currently in play. Nobody else here has been named by an outside source, which is deliberate.',
      questNotes:
        '[[quest.the-fog-bells|The Fog Bells]] starts on the quay and is the right first job: four bells silent in one season, pilots who will not sail, and a paying client in the Pilotage. What the bells were protecting and who stopped them is undecided by design, so the quest can end in a smuggling answer, a succession answer or something worse without contradicting anything. Whatever a table decides there becomes the first real fact about this city, so decide it once and write it down.',

      services: [
        row({ name: 'Bell-line pilotage', where: 'the pilot stair', note: 'Compulsory inbound. Refused outright while any mark on the chosen line is silent, at any price offered.' }),
        row({ name: 'Cargo clearing', where: 'the manifest house', note: 'Fast, courteous and incurious. Names are recorded; identities are not checked.' }),
        row({ name: 'Cliff hoist', where: 'the quay head', note: 'Lifts cargo to the first terrace. Where it goes after that is not the hoist crew\'s business or yours.' }),
        row({ name: 'Fog signal answer', where: 'the north head', note: 'Answers the outer bell for ships without a pilot. Has had nothing to answer since last season.' }),
        row({ name: 'Filament landing', where: 'the sealed shed, east quay', note: '[[creature.mistfall-bell|Bell]] filament in sealed tubs under licence. Divers are paid on landing and not all of them land.' }),
      ],

      creatureNotes:
        '[[creature.mistfall-bell|Mistfall bells]] the size of a cart drift the shelf outside the approach, trailing curtains of stinging filament, and are harvested by divers who lose sensation in their hands and then drown. The filament is the base of [[spell.stillwater-draught|stillwater draught]], the only reliable surgical paralytic on the continent, so a great deal of survivable surgery elsewhere is paid for by this coast in a currency it does not advertise. What else the cold water holds has not been recorded by anyone from outside.',

      history: TBD('Keth Veyra has no established history. The oldest bell on the approach predates the oldest quay, and nobody outside can say by how long.'),

      devNotes:
        'CANON: the name Keth Veyra, and nothing else. ' +
        PROPOSAL('Kept deliberately thin. The entry commits only to the region\'s established fog, the two things other authors have put in play — [[mechanic.the-bell-lines|the Bell Lines]] and [[npc.ismet-radva|Ismet Radva]] — and one link the bestiary already implies, that Mistfall bell filament is landed on this coast. Everything is written from the quay, because the fog gives an honest in-world reason for an outsider to be able to describe the waterfront and nothing above it. Do not decide what is above the fog line here; decide it in play. See [[note.keth-veyra-concept|the design note]].'),
      openQuestions: [
        'What were the four silenced bells protecting, and who stopped them?',
        'Who owns the bells whose owner column has been struck out, and who did the striking?',
        'Is Ismet Radva a person, a shared office, or a dead credential still being used?',
        'Why is more cargo landed here than the visible town could possibly need, and where does it go?',
        'Does Keth Veyra look outward across the Eastern Deep, and if so, at what?',
      ],
    },
  }),

  E({
    id: 'district.keth-veyra-the-fog-quays',
    type: 'district',
    name: 'The Fog Quays',
    status: 'draft',
    summary: 'A mile of stone quay along the inlet, worked by ear in the mornings, and as much of Keth Veyra as most people see.',
    tags: ['harbour', 'commerce'],
    fields: {
      overview:
        'The waterfront: something over a mile of dressed stone quay stepped down the northern shore of the inlet, with bollards, tide stairs, a cliff hoist and a sealed shed at the eastern end where [[creature.mistfall-bell|bell]] filament is landed. On a thick morning the quays are worked entirely by ear, on yard bells and shouted counts.',
      city: [CITY.kethVeyra],
      districtType: 'Harbour and quays',
      wealth: 'Modest, and well maintained',
      atmosphere:
        'Cold, dripping and oddly orderly. Sound behaves strangely: a crew forty strides away can be inaudible and a bell a mile out can be perfectly clear. Visitors find this unnerving and locals use it.',
      architecture:
        'Heavy grey stone, tarred timber fendering, green bronze fittings, and shuttered seaward faces on every building. Everything is roofed steeply and everything drips.',
      whoLivesHere: 'Quay and hoist crews, the filament shed keeper, and the harbour wardens',
      danger: 'Low, except in fog, when the water is two steps away and unmarked',
      playNotes:
        'The landing point for any party arriving by sea and the practical limit of casual access. [[landmark.the-bell-roll|The bell roll]] is here, which is where an investigation into the silenced bells starts. The filament shed is the one place in the city where something valuable is visibly under licence, which makes it the obvious target and the obvious trap.',
      devNotes: 'Everything an outsider is allowed to see, arranged along one line so the rest of the city can stay undecided.',
    },
  }),

  E({
    id: 'district.keth-veyra-the-pilot-stair',
    type: 'district',
    name: 'The Pilot Stair',
    status: 'draft',
    summary: 'Where pilots are hired and where they refuse: forty people who hold the approach in their heads and will not write it down.',
    tags: ['guild', 'navigation'],
    fields: {
      overview:
        'A stepped terrace above the western quays holding the pilots\' hall, the interval boards and the waiting benches. The Mistfall Pilotage works from here: roughly forty pilots who hold the bell intervals and bearings by memory, take ships in on them, and have refused every request to commit a line to paper for as long as anyone can remember.',
      city: [CITY.kethVeyra],
      districtType: 'Pilotage and guild hall',
      wealth: 'Prosperous',
      atmosphere:
        'Patient and slightly sacerdotal. Pilots listen more than they talk and correct each other in bell taps. Since the four marks went quiet the benches have been full of masters who cannot sail and pilots who will not.',
      architecture:
        'Stone terrace and a low hall with a bell cote on it, boards inside cut with interval marks, and a seaward window that is kept open in all weathers because closing it deafens the room.',
      whoLivesHere: 'Pilots and their households, and a great many people currently waiting',
      danger: 'Low',
      playNotes:
        'The client for [[quest.the-fog-bells|The Fog Bells]] and the only body in the city that will explain how the approach works. They will not sell a line and they will not sail a broken one, which makes them immovable rather than difficult: a party solves their problem or nobody sails. Learning three intervals from a sympathetic pilot is worth more than any map.',
      devNotes: 'The mechanic\'s custodians. Written as a guild in behaviour without creating a faction entity, since Keth Veyra is not decided.',
    },
  }),

  E({
    id: 'district.keth-veyra-the-manifest-house',
    type: 'district',
    name: 'The Manifest House',
    status: 'draft',
    summary: 'The clearing office on the first terrace: fast, courteous, and it records names without ever checking one.',
    tags: ['administration', 'commerce'],
    fields: {
      overview:
        'A long stone building on the first terrace above the hoist, holding the clearing counters, the manifest ledgers and the bonded store. Every cargo landed at Keth Veyra is entered here under a name. The clerks are quick and polite and have no procedure whatsoever for establishing that the name belongs to anybody.',
      city: [CITY.kethVeyra],
      districtType: 'Customs and clearing',
      wealth: 'Modest',
      atmosphere:
        'Dry, warm, and quiet in a way that suggests thick walls and habit. Business is conducted at a counter in a few minutes and then the cargo goes up the hill and out of the conversation.',
      architecture:
        'Heavy walls, high shuttered windows, a counter of scarred timber, and a bonded store behind an iron door that is the only visibly serious lock on the waterfront.',
      whoLivesHere: 'Clerks, factors, and a bonded-store keeper who is never introduced',
      danger: 'Low, and the risk is entirely in the ledgers',
      playNotes:
        'The [[npc.ismet-radva|Ismet Radva]] entries are here, in the ledgers, and comparing them across seasons is the entire opening of that investigation. The clerks will let anyone read a manifest for a small fee, which is either admirable openness or a sign that the interesting freight is not in the book.',
      devNotes: 'The one district that generates a paper trail, so an investigation has something to hold while the city stays undecided.',
    },
  }),

  E({
    id: 'district.keth-veyra-above-the-fog',
    type: 'district',
    name: 'Above the Fog',
    status: 'draft',
    summary: 'The ridge town over the cloud line: lights, bells and nothing else that any outside account contains.',
    tags: ['unwritten'],
    fields: {
      overview:
        'What stands above the fog line on the ridge. From the western road on a clear evening it is a line of lights and, at intervals, bells. From the quays it is inaudible and invisible for most of the year. Cargo lifted off the hoist goes up here. Nothing that has been written by an outsider describes it.',
      city: [CITY.kethVeyra],
      districtType: TBD('Unknown. Whether the ridge town is the city proper or an upper quarter of it is unestablished.'),
      wealth: TBD('The lights are many and the bells are bronze. Neither is evidence.'),
      atmosphere: TBD('No outside account exists. Anything written here would be invention.'),
      architecture:
        'Inferred from the waterfront only: the same grey stone and steep roofing, and bells at intervals along the ridge that are rung on patterns the quay crews can name and will not explain.',
      whoLivesHere: TBD('Unknown. Everyone who works the quays goes up at the end of a shift and nobody outside has followed them.'),
      danger: TBD('Unestablished. Nobody has reported being stopped, and nobody has reported arriving.'),
      playNotes:
        'Deliberately reserved. Getting above the fog line should be a campaign decision that also decides what Keth Veyra is. If a table goes up, write down what they find and treat it as canon from that day.',
      devNotes:
        PROPOSAL('Empty by design, exactly like Oruvai\'s upper town. The district exists to give the map a shape and the wiki a place to put an answer. Do not fill it in casually.'),
    },
  }),

  E({
    id: 'landmark.the-outer-bell',
    type: 'landmark',
    name: 'The Outer Bell',
    status: 'draft',
    summary: 'The first mark inbound, on a rock four miles out. It has not rung since last season and no pilot will pass it.',
    tags: ['landmark', 'navigation', 'silent'],
    fields: {
      overview:
        'A green bronze bell in an iron frame bolted to a rock four miles off the heads, rung by the sea through a weighted clapper linkage. It is the first mark on every inbound line and the reference the north head fog signal answers. It has been silent since last season, which is why [[quest.the-fog-bells|the Pilotage stopped sailing]].',
      city: [CITY.kethVeyra],
      landmarkType: 'Sea mark and navigation bell',
      built: 'Older than the oldest quay in the harbour, on the pilots\' own account. The frame has been renewed; the bell has not.',
      appearance:
        'A dark green shape on a black rock in white water, visible for perhaps two hundred strides in fog and not at all beyond it. The frame is rust and the bell is not.',
      function:
        'Gives an inbound ship its first bearing and its first interval, which is what the rest of the line is counted from. Silent, it does not make the approach harder; it removes the approach.',
      access:
        'Four miles of open cold water in fog, onto a rock that is only boardable in a low swell. Getting there at all is the first real obstacle of any investigation into the silence.',
      devNotes:
        PROPOSAL('The physical anchor for the fog-bells job. Whether it was silenced, broke, or was taken is deliberately not decided here.'),
    },
  }),

  E({
    id: 'landmark.the-bell-roll',
    type: 'landmark',
    name: 'The Bell Roll',
    status: 'draft',
    summary: 'A bronze board on the quay: every bell of the approach, its bearing, its interval and its owner. Half the owners are struck out.',
    tags: ['landmark', 'register'],
    fields: {
      overview:
        'A cast bronze board set into the quay wall listing every bell on the approach: its name, its bearing from the heads, its interval, and the party responsible for keeping it rung. It is the only written form of the Bell Lines that exists, and the pilots regard it as a maintenance schedule rather than a chart, which is why they tolerate it.',
      city: [CITY.kethVeyra],
      landmarkType: 'Public register',
      built: 'Cast in sections and added to; the earliest section is worn nearly smooth',
      appearance:
        'Green bronze, wet, with the lettering picked out white by salt. Roughly half the entries in the owner column have been struck through with a chisel and not replaced, some of them recently enough that the cut is still bright.',
      function:
        'Records who is answerable for each bell. In a place where a silent bell deletes a route, that column is the whole of the coast\'s politics, and it is currently half blank.',
      access: 'Open quay wall, readable by anyone, and nobody on the waterfront will discuss the struck entries.',
      devNotes:
        PROPOSAL('Turns [[mechanic.the-bell-lines|bell ownership]] into a document a party can read on their first afternoon. The bright chisel cuts are the hook: whatever happened, it is still happening.'),
    },
  }),
]

export const relations: SeedRelation[] = [
  /* The Floating Swamp Settlement ------------------------------------ */
  R(CITY.floatingSwamp, 'located_in', REGION.theDrown),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-the-stone-lots'),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-sixteen-knot'),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-the-gas-fleet'),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-the-cane-yards'),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-tail-lots'),
  R(CITY.floatingSwamp, 'contains', 'district.floating-swamp-settlement-the-stilt-hundred'),
  R(CITY.floatingSwamp, 'contains', 'landmark.the-moorstone'),
  R(CITY.floatingSwamp, 'contains', 'landmark.the-lot-board'),
  R(CITY.floatingSwamp, 'contains', 'landmark.the-drowned-stand'),
  R(CITY.floatingSwamp, 'contains', 'machine.the-fen-damp-taps'),
  R('faction.moorstone-compact', 'controls', CITY.floatingSwamp, 'runs the lot-draw, which is the whole of the government'),
  R('faction.moorstone-compact', 'controls', 'landmark.the-moorstone', 'holds the deed chest and the chain to the stone'),
  R('npc.sabbe-sixteen-knot', 'leads', 'district.floating-swamp-settlement-sixteen-knot', 'elder of the largest raft-clan'),
  R('npc.sabbe-sixteen-knot', 'secretly_cooperates_with', 'faction.iron-sluice-company', 'paid in guaranteed sluice-time to drift the town into the toll reach', true),
  R('npc.gwill-ossekind', 'located_in', 'landmark.the-drowned-stand', 'his notched staves begin at the southern edge; he did not come back'),
  R(CITY.floatingSwamp, 'produces', 'material.glasscane', 'cut in winter, split and steamed on the Cane Yards'),
  R(CITY.floatingSwamp, 'produces', 'material.mirelac', 'scraped in the wet season and boiled on the rafts'),
  R(CITY.floatingSwamp, 'produces', 'material.mire-bloom', 'a twenty-year rotation on numbered pits'),
  R(CITY.floatingSwamp, 'produces', 'food.tide-rice', 'cut from boats, twice a year, drowned by a badly timed release'),
  R(CITY.floatingSwamp, 'controls', 'deposit.canebrakes', 'cut by clan, defended by number'),
  R(CITY.floatingSwamp, 'controls', 'deposit.bloom-cuts', 'numbered rather than owned, which comes to the same thing'),
  R(CITY.floatingSwamp, 'consumes', 'item.fever-clay', 'against the marsh fever the rotting mats breed'),
  R(CITY.floatingSwamp, 'consumes', 'food.stair-loaf', 'upriver grain, tolled at the Weir before it arrives'),
  R('item.moor-stake', 'crafted_at', CITY.floatingSwamp, 'iron-shod stake and cord; underwrites the whole property system'),
  R('recipe.lamp-gas-bladders', 'crafted_at', CITY.floatingSwamp, 'the delta\'s only real export in its own right'),
  R('creature.raftbloom', 'inhabits', CITY.floatingSwamp, 'the settlement literally floats on it, until it rots'),
  R('creature.blackrun-lamprey', 'inhabits', REGION.theDrown, 'three weeks of glut, and the closest thing here to a festival'),
  R(CITY.floatingSwamp, 'related_to', 'mechanic.the-remoor', 'signature mechanic'),
  R(CITY.floatingSwamp, 'related_to', 'skill.marsh-footing', 'assumed of anyone who moves between combs at speed'),
  R('quest.slackwater-rights', 'located_in', 'district.floating-swamp-settlement-the-stone-lots', 'two clans, one berth, and writing on the back of the deed'),
  R('faction.low-tally', 'infiltrates', CITY.floatingSwamp, 'three lots held under tenants\' names', true),
  R('faction.bonewax-post', 'located_in', 'district.floating-swamp-settlement-the-stone-lots', 'a sealed box on the Compact hall raft'),
  R(CITY.floatingSwamp, 'trades_with', CITY.skyCity, 'glasscane spar stock, by the raft'),
  R(CITY.floatingSwamp, 'trades_with', CITY.mediterranean, 'nearly the whole mirelac crop, for conduit insulation'),
  R(CITY.floatingSwamp, 'owes_debt_to', CITY.blackWeir, 'every load out is tolled, and the water itself is scheduled'),

  /* The Black Weir --------------------------------------------------- */
  R(CITY.blackWeir, 'located_in', REGION.theDrown),
  R(CITY.blackWeir, 'contains', 'district.black-weir-the-gate-works'),
  R(CITY.blackWeir, 'contains', 'district.black-weir-the-slack'),
  R(CITY.blackWeir, 'contains', 'district.black-weir-the-gantry-yards'),
  R(CITY.blackWeir, 'contains', 'district.black-weir-hammer-row'),
  R(CITY.blackWeir, 'contains', 'district.black-weir-the-toll-house'),
  R(CITY.blackWeir, 'contains', 'district.black-weir-lampside'),
  R(CITY.blackWeir, 'contains', 'landmark.the-weir-gates'),
  R(CITY.blackWeir, 'contains', 'landmark.the-flood-post'),
  R(CITY.blackWeir, 'contains', 'landmark.the-eleventh-sluice'),
  R(CITY.blackWeir, 'contains', 'machine.the-sluice-hammers'),
  R('faction.iron-sluice-company', 'controls', CITY.blackWeir, 'chartered keeper of the throat; the town is its payroll'),
  R('faction.iron-sluice-company', 'controls', 'landmark.the-weir-gates', 'fourteen worked gates, ninety-six hours a week, thirty reserved'),
  R('npc.ost-vennick', 'leads', 'district.black-weir-the-toll-house', 'sluice-master; sleeps in the same room as the schedule book'),
  R('npc.dagren-hoyle', 'located_in', 'district.black-weir-the-gantry-yards', 'gantry-crew boss, recruiting for a bay that has drowned two crews'),
  R('npc.dagren-hoyle', 'smuggles_with', 'landmark.the-eleventh-sluice', 'workable in the slack hour, judged by ear', true),
  R(CITY.blackWeir, 'produces', 'material.blister-bar', 'stamped merchant bar off the trip hammers'),
  R(CITY.blackWeir, 'consumes', 'material.mire-bloom', 'rafted up from the cuts and tolled before it reaches a hammer'),
  R(CITY.blackWeir, 'consumes', 'material.blackbole-timber', 'gate slabs and the bored drinking main'),
  R('recipe.hammered-bar-iron', 'crafted_at', CITY.blackWeir, 'the head of water that sells the toll also drives the hammers'),
  R('item.weirhook', 'crafted_at', CITY.blackWeir, 'a spike on the back for working people'),
  R('creature.blackrun-lamprey', 'affects', CITY.blackWeir, 'two bays worked for the spring run; the most profitable fortnight of the year'),
  R('spell.calling-the-run', 'affects', CITY.blackWeir, 'hanged at the sluices, and the Company publicises it'),
  R(CITY.blackWeir, 'related_to', 'mechanic.the-sluice-book', 'signature mechanic'),
  R(CITY.blackWeir, 'related_to', 'skill.brokerage', 'moving a booked hour means moving every hour after it'),
  R('quest.the-ullage-run', 'located_in', 'district.black-weir-the-gantry-yards', 'forty barrels of ullage and one tide'),
  R('quest.clean-bills', 'located_in', 'district.black-weir-the-toll-house', 'the cordon that saves upriver and starves the delta'),
  R(CITY.blackWeir, 'controls', CITY.floatingSwamp, 'sets the toll and the water; can do both in one afternoon'),
  R(CITY.blackWeir, 'trades_with', CITY.gildedAscent, 'everything the Ascent ships east passes the gates'),
  R(CITY.blackWeir, 'trades_with', CITY.treeCity, 'bole timber for gate slabs and the drinking main'),
  R(CITY.blackWeir, 'trades_with', CITY.arenaCity, 'bar iron out, bone char through, no questions either way'),
  R('faction.low-tally', 'smuggles_with', CITY.blackWeir, 'the ullage trade through the tail; pays gantry crews better than the Company', true),
  R('faction.moorstone-compact', 'secretly_cooperates_with', 'faction.iron-sluice-company', 'buys release warnings here and resells them downstream', true),
  R('faction.bonewax-post', 'located_in', 'district.black-weir-the-toll-house', 'the one standing exception in the book'),

  /* Oruvai ----------------------------------------------------------- */
  R(CITY.oruvai, 'located_in', REGION.hollowKarst),
  R(CITY.oruvai, 'contains', 'district.oruvai-the-carry-yard'),
  R(CITY.oruvai, 'contains', 'district.oruvai-the-shut-gate'),
  R(CITY.oruvai, 'contains', 'district.oruvai-the-stone-market'),
  R(CITY.oruvai, 'contains', 'district.oruvai-the-upper-town'),
  R(CITY.oruvai, 'contains', 'landmark.the-carry-beam'),
  R(CITY.oruvai, 'contains', 'landmark.the-blind-terraces'),
  R('npc.anwe-halduri', 'located_in', 'district.oruvai-the-stone-market', 'two of the four market days, gone by dusk both times'),
  R(CITY.oruvai, 'related_to', 'mechanic.the-high-carry', 'signature mechanic; the only Oruvai system outsiders play with'),
  R('landmark.the-carry-beam', 'related_to', 'mechanic.the-high-carry', 'the reading fixes the price, and the marked limit is not negotiable'),
  R(CITY.oruvai, 'related_to', 'skill.weather-eye', 'the pass shuts without notice and voids the contract'),
  R(CITY.oruvai, 'related_to', 'skill.the-far-walk', 'a day and a half up switchbacks with no cover'),
  R('quest.open-account', 'located_in', 'district.oruvai-the-carry-yard', 'the Assize needs figures it has no lawful way to get'),
  R(CITY.oruvai, 'trades_with', CITY.caveAgrarian, 'four days a year in the karst markets, paid in advance in cut stone'),
  R(CITY.oruvai, 'trades_with', CITY.treeCity, 'the forest road runs from the pass; what moves on it is unestablished'),
  R(CITY.oruvai, 'trades_with', CITY.gildedAscent, 'courted by the Brass Assize; neither agreed nor refused'),
  R('faction.bonewax-post', 'located_in', 'district.oruvai-the-shut-gate', 'passed through the gate, like everywhere else'),

  /* Keth Veyra -------------------------------------------------------- */
  R(CITY.kethVeyra, 'located_in', REGION.mistfallCoast),
  R(CITY.kethVeyra, 'contains', 'district.keth-veyra-the-fog-quays'),
  R(CITY.kethVeyra, 'contains', 'district.keth-veyra-the-pilot-stair'),
  R(CITY.kethVeyra, 'contains', 'district.keth-veyra-the-manifest-house'),
  R(CITY.kethVeyra, 'contains', 'district.keth-veyra-above-the-fog'),
  R(CITY.kethVeyra, 'contains', 'landmark.the-bell-roll'),
  R(CITY.kethVeyra, 'related_to', 'landmark.the-outer-bell', 'four miles off the heads; the first mark on every inbound line'),
  R('npc.ismet-radva', 'located_in', 'district.keth-veyra-the-manifest-house', 'a name on three manifests, never the same person twice'),
  R(CITY.kethVeyra, 'related_to', 'mechanic.the-bell-lines', 'signature mechanic; a silenced bell deletes a route'),
  R('landmark.the-bell-roll', 'related_to', 'mechanic.the-bell-lines', 'bearings, intervals and owners, half the owner column struck out'),
  R('creature.mistfall-bell', 'inhabits', REGION.mistfallCoast, 'harvested off this shelf; the divers lose their hands and then drown'),
  R('spell.stillwater-draught', 'requires', CITY.kethVeyra, 'the filament is landed here in sealed tubs, under licence'),
  R('quest.the-fog-bells', 'located_in', 'district.keth-veyra-the-pilot-stair', 'four silent marks and forty pilots who will not sail'),
  R(CITY.kethVeyra, 'trades_with', CITY.mediterranean, 'bell filament for the surgical paralytic; the only documented link'),
  R(CITY.kethVeyra, 'trades_with', CITY.gildedAscent, 'stair writs clear on the quay and no house has a factor here'),
  R(CITY.kethVeyra, 'related_to', CITY.magicCity, 'nearest settlement of any size; whether anything crosses overland is unestablished'),
  R('faction.bonewax-post', 'located_in', 'district.keth-veyra-the-manifest-house', 'lands here like everywhere else'),
]
