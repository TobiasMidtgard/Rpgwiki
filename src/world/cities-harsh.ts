/**
 * Three settlements where the ground does not forgive: the mineral-sifting
 * city of the White Pans, the debt-court arena on the Ashen Steppe, and the
 * frontier town of Orath, whose name is the only canon it has.
 *
 * Canon anchors are the brief's one-line identities, the central landmarks and
 * the colour palettes. Everything else here is a proposal.
 */

import { E, R, TBD, row, type CityMap, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* City maps                                                           */
/* ------------------------------------------------------------------ */

/** A surveyor's grid broken by dune belts the wind keeps re-cutting. */
const SIFTING_CITY_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.sifting-city-assay-row',
      polygon: [
        [40, 120],
        [120, 55],
        [330, 45],
        [330, 245],
        [150, 245],
        [40, 215],
      ],
    },
    {
      id: 'district.sifting-city-the-tower-line',
      polygon: [
        [330, 45],
        [640, 35],
        [935, 60],
        [930, 245],
        [640, 250],
        [330, 245],
      ],
    },
    {
      id: 'district.sifting-city-the-water-court',
      polygon: [
        [40, 215],
        [150, 245],
        [330, 245],
        [330, 445],
        [120, 450],
        [35, 340],
      ],
    },
    {
      id: 'district.sifting-city-the-crucible-sheds',
      polygon: [
        [330, 245],
        [640, 250],
        [655, 445],
        [430, 455],
        [330, 445],
      ],
    },
    {
      id: 'district.sifting-city-the-lee',
      polygon: [
        [640, 250],
        [930, 245],
        [955, 400],
        [880, 470],
        [700, 465],
        [655, 445],
      ],
    },
    {
      id: 'district.sifting-city-the-outbound-yard',
      polygon: [
        [120, 450],
        [330, 445],
        [430, 455],
        [440, 600],
        [300, 660],
        [130, 640],
        [70, 540],
      ],
    },
  ],
  water: [
    [
      [700, 500],
      [880, 490],
      [960, 540],
      [930, 640],
      [760, 660],
      [690, 590],
    ],
    [
      [480, 610],
      [600, 595],
      [640, 650],
      [540, 682],
      [470, 655],
    ],
  ],
  walls: [
    [20, 120],
    [110, 40],
    [350, 20],
    [660, 15],
    [945, 45],
  ],
  roads: [
    [
      [40, 247],
      [500, 248],
      [935, 250],
    ],
    [
      [332, 50],
      [332, 250],
      [334, 455],
    ],
    [
      [642, 38],
      [648, 250],
      [656, 460],
    ],
    [
      [130, 450],
      [440, 458],
      [700, 470],
    ],
    [
      [300, 660],
      [332, 455],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-great-sieve', at: [640, 145] },
    { id: 'landmark.the-third-bore', at: [180, 350] },
    { id: 'landmark.the-cut-house', at: [190, 150] },
  ],
}

/** A starburst: wedge quarters radiating off a sunken bowl, ragged to the east. */
const ARENA_CITY_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.arena-city-drovers-camp',
      polygon: [
        [575, 340],
        [561, 393],
        [523, 431],
        [600, 600],
        [745, 645],
        [865, 545],
        [900, 425],
        [800, 345],
      ],
    },
    {
      id: 'district.arena-city-the-under-stands',
      polygon: [
        [523, 431],
        [470, 445],
        [417, 431],
        [352, 544],
        [470, 575],
        [588, 543],
      ],
    },
    {
      id: 'district.arena-city-the-rendering',
      polygon: [
        [417, 431],
        [379, 393],
        [365, 340],
        [220, 340],
        [254, 465],
        [345, 557],
      ],
    },
    {
      id: 'district.arena-city-scute-yards',
      polygon: [
        [365, 340],
        [379, 287],
        [417, 249],
        [355, 141],
        [271, 225],
        [240, 340],
      ],
    },
    {
      id: 'district.arena-city-writ-court',
      polygon: [
        [417, 249],
        [470, 235],
        [523, 249],
        [578, 154],
        [470, 125],
        [362, 154],
      ],
    },
    {
      id: 'district.arena-city-banner-streets',
      polygon: [
        [523, 249],
        [561, 287],
        [575, 340],
        [715, 340],
        [682, 218],
        [593, 128],
      ],
    },
  ],
  water: [
    [
      [0, 600],
      [130, 585],
      [260, 610],
      [330, 655],
      [300, 692],
      [180, 660],
      [60, 650],
      [0, 645],
    ],
    [
      [820, 180],
      [890, 175],
      [905, 215],
      [840, 232],
      [805, 205],
    ],
  ],
  walls: [
    [150, 120],
    [400, 70],
    [660, 90],
    [860, 180],
    [930, 340],
    [900, 470],
    [760, 600],
  ],
  roads: [
    [
      [575, 340],
      [730, 340],
      [900, 425],
    ],
    [
      [523, 431],
      [600, 565],
      [745, 645],
    ],
    [
      [417, 431],
      [345, 557],
      [300, 660],
    ],
    [
      [365, 340],
      [220, 340],
      [60, 350],
    ],
    [
      [417, 249],
      [355, 141],
      [300, 60],
    ],
    [
      [523, 249],
      [593, 128],
      [640, 40],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-sunken-ring', at: [470, 340] },
    { id: 'landmark.the-blood-channels', at: [440, 470] },
    { id: 'landmark.the-claim-wall', at: [312, 400] },
  ],
}

/** A single road, thickening at the walled head and fraying into the waste. */
const ORATH_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.orath-the-tank-yard',
      polygon: [
        [80, 90],
        [300, 60],
        [380, 150],
        [350, 270],
        [190, 300],
        [70, 220],
      ],
    },
    {
      id: 'district.orath-the-board',
      polygon: [
        [350, 270],
        [380, 150],
        [520, 190],
        [580, 300],
        [500, 390],
        [370, 370],
      ],
    },
    {
      id: 'district.orath-caravan-ground',
      polygon: [
        [500, 390],
        [580, 300],
        [720, 340],
        [760, 450],
        [670, 520],
        [545, 480],
      ],
    },
    {
      id: 'district.orath-the-outward-row',
      polygon: [
        [670, 520],
        [760, 450],
        [880, 500],
        [930, 590],
        [850, 650],
        [720, 630],
        [650, 580],
      ],
    },
  ],
  water: [
    [
      [150, 180],
      [230, 165],
      [265, 205],
      [215, 250],
      [150, 235],
    ],
  ],
  walls: [
    [70, 220],
    [80, 90],
    [300, 60],
    [380, 150],
    [350, 270],
  ],
  roads: [
    [
      [60, 160],
      [230, 180],
      [400, 240],
      [540, 320],
      [690, 400],
      [810, 500],
      [930, 600],
    ],
    [
      [420, 255],
      [455, 360],
      [470, 430],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-ration-board', at: [455, 285] },
    { id: 'landmark.the-last-well', at: [205, 210] },
  ],
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------------------- */
  /* The Sifting City                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.siftingCity,
    type: 'city',
    name: 'The Sifting City',
    workingTitle: true,
    aka: ['Six Cuts', 'The Pans'],
    status: 'draft',
    summary: 'Nine sifting towers on a salt crust that will not hold a well. The ore is free; the water is not.',
    tags: ['desert', 'mining', 'indenture', 'water'],
    fields: {
      epithet: 'Six Cuts',
      overview:
        "Twenty-one thousand people counted, and six thousand four hundred more who are on the tower rolls as bonded and are not counted as residents at all. The city stands on the eastern lip of [[region.white-pans|the White Pans]] because that is where the wind puts down what it has sorted: [[material.pan-nitre|pan nitre]] rebuilding across [[deposit.nitre-flats|the Nitre Flats]] after every wet season, [[material.blackfall-sand|Blackfall sand]] banked hard against the lee faces of [[deposit.blackfall-drifts|the Drifts]].\n\nNine licensed towers work that crust down [[machine.the-sieve-cascade|the Sieve Cascade]], and every pass through the screens costs water. The crust is free. Water is hauled eight days across the waste, caught off the roofs in a wet season that lasts between twenty-six and forty days, or lifted out of a confined aquifer by three bores, of which two still yield. Everything else about the city follows from that sum.\n\nThe sixth cut, the finest fraction that rides the last mesh, is worth more than the other five together and takes forty casks of extra wash to recover. Those casks come out of somebody's ration. That is not a metaphor: crews are paid partly in draw, and a crew that chases the sixth cut drinks less for a season. [[faction.pale-assay|The Pale Assay]] stamps the grade, and the stamp, not the salt, is what a buyer pays for.",
      founded:
        'Four generations back, as three crucible sheds and a tent line at the drift faces. The towers came later and the bores later still.',
      settlementType: 'Extraction city on a salt pan',

      region: [REGION.whitePans],
      biome: 'Salt pan desert',
      terrain:
        'A shelf of hard sabkha crust ten to twenty feet above the pan floor, backed by a dune belt the wind re-cuts every year and never quite in the same place. Nothing is founded on the crust itself; every tower stands on a raft of imported timber and rammed spoil, and three of the nine have been re-levelled in the last decade.',
      climate:
        'Forty-two degrees at noon in the dry, near freezing before dawn, and a scouring north-easterly nine days in ten. The wet season is short, violent and the whole water year.',
      approach:
        'You smell it before you see it: bitter, like a struck match held under the tongue. Then the sand-shed roofs come up out of the haze as a set of long pale wedges, and behind them the towers, which are the only vertical things for a day in any direction. The water road comes in from the west out of [[city.orath|Orath]] and is metalled for the last two miles because a bogged water cart is a civic emergency.',

      cityMapNote:
        'Surveyed as a grid, because the first tower-masters wanted every plot measurable for tariff, and broken by dune belts that the grid was never going to beat. The blocks that survive are the ones on the crust shelf; the streets that vanish under sand are simply re-cut a hundred paces over and given the same name. Downwind is a legal category here, not a direction: [[district.sifting-city-the-lee|the Lee]] is where the fines settle and where the rent is cheapest.',
      districtCount: '6 mapped, of eleven surveyed blocks',
      cityMap: SIFTING_CITY_MAP,

      architecture:
        'Sand-shed roofs: shallow twin pitches laid with the prevailing wind so the drift slides off rather than loading the frame, guttered on the lee side into a cistern that every building is legally required to have. Walls are salt block laid in bitter mortar, rendered pale ochre with pan clay, and scoured back to bare block on the windward face within about five years, which is how you date a building here. Timber is imported and therefore visible wealth: a shuttered window is a boast. The towers themselves are iron-black, tarred against the salt, and the tar is renewed on a rota nobody is allowed to fall behind on.',
      silhouette: 'Long pale roof-wedges under nine black tapering towers, the whole thing half-buried on its northern side.',
      palette: ['#c9a86a', '#e0cb9c', '#f2efe6', '#1c1a17', '#8a7a5c'],
      buildMaterials: ['material.blackbole-timber', 'material.blister-bar', 'material.pan-nitre'],

      landmarkName: 'The Great Sieve',
      landmarkDesc:
        "The escarpment of graded drift the whole city works, and the nine towers standing on it. See [[landmark.the-great-sieve|the Great Sieve]]. It is a place and a licence at the same time: to hold a tower on the Sieve is to hold a vote on the Tower Bench and a share of the city's water.",

      energy:
        'Wind, and after that fuel that has walked here. The cascades are wind-fed through hooded intakes on the tower heads and shut down entirely in a calm, which costs the city about thirty working days a year. The crucible sheds burn pressed dung-and-tar cake and imported charcoal at eleven days of shed fuel per [[material.blackfall-button|Blackfall button]], which is why the buttons are rented by the shift and returned worn.',
      infrastructure:
        'Three bores sunk through the crust into a confined aquifer. No. 1 and No. 4 still yield, and No. 1 has dropped four fathoms in nine years. No. 3 went brackish and is now [[landmark.the-third-bore|a shaft with a lid on it]]. Every roof gutters to a cistern; the cisterns hold about a hundred and thirty days of the posted ration at full and have not been at full for three years. Below all of it runs the mesh trade: [[item.sift-screen|sift screens]] are rated by count, tallied, and burnt when condemned, because a condemned screen sold on is a grade fraud waiting to happen.',
      keyMachines: ['machine.the-sieve-cascade', 'machine.the-bittern-ladder'],

      transport:
        'Two roads and no river. The water road runs west to [[city.orath|Orath]] and the Cinder Waste margin on a caravan schedule that is the closest thing the Pans have to a clock. The tariff road runs north-west toward the Ascent Basin and carries graded nitre and button out under seal. Inside the city, everything heavy moves on skids drawn by pan oxen, because wheels cut the crust and a cut crust becomes a hole.',
      traversal:
        'Walking on the pans is a licensed skill and a legal category. Beyond the last marked stake the crust over old brine will take a person to the waist without warning, which is why [[item.moor-stake|staked]] routes are re-cut after every wet season and why pan-walkers work alone: two people crossing together break more crust than one. Eight days out is the standard far-white circuit. Nobody carries enough water for nine.',

      government: 'Tower Bench, one vote per licensed tower',
      politicalLeaning: 'Licence oligarchy; water is the franchise',
      ruler: ['faction.pale-assay', 'npc.tazrit-nourem'],
      succession:
        'A tower licence is heritable and may not be sold, only inherited or forfeited, which was meant to stop consolidation and instead produced marriage as an industrial strategy. Forfeiture is decided by the Bench on a failure to maintain tar or to meet a wash quota, and the Bench has never once found against a household holding three or more towers.',

      laws:
        'Short, brutal and almost entirely about water and grade. Drawing water you have not been issued is theft of the city itself and is punished as such. Everything else is a matter of paper: a stamped grade card is legally the truth about a barrel, so falsifying one is treated as forging money, which in the Pans it more or less is. Bonds written anywhere on the continent are enforceable here, and the city takes a registry fee on each, which is a quiet third of its revenue.',
      enforcement: 'Tower guards under Assay warrant; no separate watch',
      extradition:
        "The Sifting City will surrender a fugitive to almost any court that asks and will surrender nobody who is under bond, because a bonded person is property and property is not extradited. The practical effect is that the Pans are a safe harbour for exactly one kind of criminal and a trap for everyone else. Runaways go west: [[city.mediterranean-city|the Mediterranean City]] voids bonds at the harbour wall, and every bond-holder in the Pans knows the road they will take.",
      notableCrimes: [
        'Drawing unissued water. Capital, and carried out by withholding.',
        'Falsifying or buying a grade stamp. Confiscation of the tower licence in law; a fine in practice.',
        "Selling on a condemned sift screen. Two years' bond, and the screen is burnt in front of you.",
        'Moving unsealed nitre past the Outbound Yard gauge.',
        'Harbouring a bonded person, or cutting a debt mark out of one.',
      ],

      socialClasses: [
        row({
          name: 'Tower households',
          share: 'About forty families',
          note: 'Hold the nine licences and the votes. May draw water without count, which is the actual privilege; the coin is secondary.',
        }),
        row({
          name: 'Assay-sworn',
          share: 'Roughly 900',
          note: 'Stampers, clerks, screen-wrights, crucible masters. Fixed draw, and cannot be taken under bond while sworn. The oath is worth more than the wage.',
        }),
        row({
          name: 'Free crews',
          share: 'Around 6,000',
          note: 'Paid in coin and draw. One bad wet season, one broken screen or one sick child from a bond, and everybody in the Lee can name someone it happened to.',
        }),
        row({
          name: 'Bonded crews',
          share: '6,400 and rising',
          note: 'Papers held in strongrooms on Assay Row. Not counted in the census, not on the ration board by name, issued water against the tower that holds them.',
        }),
        row({
          name: 'Pan-walkers',
          share: 'Perhaps 300',
          note: 'Licensed solitaries working the far white. Outside the ration entirely, which is presented as freedom and functions as abandonment.',
        }),
      ],

      population: '21,000 counted, 6,400 uncounted',
      demographics: [
        row({
          group: 'Pan-born',
          share: 'Three in five',
          note: 'Families that have held a screen or a stamp for four generations. They read the wind the way other cities read a calendar.',
        }),
        row({
          group: 'Waste-margin drovers',
          share: 'One in six',
          note: 'Caravan kin off the Cinder Waste margin. They own the water road, marry inside it, and are the only people here who can leave in a bad year.',
        }),
        row({
          group: 'Bond-brought',
          share: 'One in five',
          note: 'Sent under paper from the Ascent, the Ring and the Drown. No shared language, no shared grievance yet, and the tower households would like to keep it that way.',
        }),
        row({
          group: 'Karst millers',
          share: 'A few hundred households',
          note: 'Hollow Karst families who came for the mesh and mica trade three generations ago and still bake their own bread from imported grain.',
        }),
      ],
      languages: [
        'Trade cant, which everybody has and nobody claims',
        'Pan tally: a hand-and-whistle count used on the tower decks, where the cascade makes speech useless',
        'Drover Orathi, on the water road and in two streets of the Outbound Yard',
        'Karst gallery speech, in the milling houses only',
      ],
      cultures: TBD('Do the pan-born have a burial practice at all, in ground that will not hold a body and will not let it rot?'),

      food:
        "Almost nothing grows. [[food.sift-cake|Sift cake]] is pressed from brine shrimp and pan algae out of the standing liquor and issued to crews against their debt, which means eating less is a way of buying time off a term, and the crews do it. Everything else walks in: [[food.dew-melon|dew melons]] off the water road, [[food.mirror-barley|mirror barley]] out of the Hollow Karst by way of the Ascent, and salt fish that has crossed the continent and tastes like it.",
      water:
        'The whole of the city\'s politics. Issue is by posted draw: three gallons a head a day for pan crews, five for the assay-sworn and tower staff, uncounted for the forty licensed households. A tower charge washed down the full cascade takes about sixty casks; recovering the sixth cut off the last mesh takes forty more. The Water Court books each draw against a tower, and a tower that overdraws settles in bond, not in coin. Nobody in the Pans has to be told what a cask is worth in years.',
      staples: ['food.sift-cake', 'food.dew-melon', 'food.mirror-barley'],

      economy:
        "One extraction chain with a legal fiction bolted to the end of it. Raw crust goes down [[machine.the-sieve-cascade|the Sieve Cascade]] into mineral concentrate, silica sand and pan liquor; the liquor goes to [[machine.the-bittern-ladder|the Bittern Ladder]] for soda ash and table salt; the concentrate and the sand go west and become other cities' brass and glass. The city keeps almost none of that value. What it keeps is the stamp. [[faction.pale-assay|The Pale Assay]] grades everything into six cuts before it leaves the Pans, and the difference between a fourth cut and a fifth cut card on the same barrel is roughly a year of a crew's wages.",
      mainProduction: 'Graded pan nitre, Blackfall button, soda ash',
      currency:
        'Ascent stair writs for anything over a barrel. Below that, the day-draw: a water chit issued by the Water Court, freely traded, and the only wage most crews ever hold in their hands.',
      wealth: 'Prosperous',

      exports: [
        'material.pan-nitre',
        'material.blackfall-sand',
        'material.blackfall-button',
        'item.sift-screen',
        'item.scourglass-sabre',
        'item.pale-dust',
      ],
      imports: ['food.dew-melon', 'food.mirror-barley', 'material.blackbole-timber', 'material.blister-bar', 'item.governor-spring'],
      tradeNotes:
        "Everything leaves under seal and under a grade card, and the card is the trade. [[city.mediterranean-city|The Mediterranean City]] takes the finest nitre because [[material.clearcast-glass|clearcast glass]] cannot be fluxed with anything else, and has recently started assaying barrels on arrival rather than trusting the stamp, which the Bench regards as an insult and the Assay regards as a problem. [[item.pale-dust|Pale dust]] is not an official export and appears on no manifest; it is illegal in three of the four cities that buy the most of it.",

      localResources: ['deposit.nitre-flats', 'deposit.blackfall-drifts', 'material.pan-nitre', 'material.blackfall-sand'],
      resourceNotes:
        'The flats rebuild themselves across roughly forty square miles after every wet season, so the nitre is a crop rather than a mine and the year is organised around it: rake, dry, grade, ship, wait. The Blackfall drifts do not rebuild. They are a finite sorting of centuries of wind, they are picked by hand off the drift faces by bonded crews, and the best faces have receded about three hundred paces in living memory. Nobody on the Bench has published that figure.',

      defense:
        'A wind-scour wall on the north and west faces, which is a revetment against sand first and people second, and nine towers that are defensible because they are tall, tarred and full of people who cannot leave. There is no siege problem here worth planning for. There is a water problem, and the entire defensive doctrine is the water problem.',
      doctrine:
        'Hold the bores, hold the water road, and let the pans do the rest. A hostile force arriving with its own water can take the Outbound Yard in an afternoon and will be dead of thirst inside nine days unless it takes the Water Court intact, which is why the Water Court is the only stone-vaulted building in the city and why its cistern gates open from the inside only.',
      garrison: 'About 400 tower guards under Assay warrant, plus a levy of crews',

      factionNotes:
        "[[faction.pale-assay|The Pale Assay]] is the government in the only sense that matters: it certifies what a find is worth before it leaves the Pans, so it decides who is rich. It has been undergrading one fraction for years and quietly stockpiling what the sifters were paid nothing for. [[faction.bondwrights-hall|The Bondwrights' Hall]] keeps a strongroom branch on Assay Row and writes, prices and resells most of the paper in the city; the tower households are its largest clients and its largest debtors at the same time. [[faction.low-tally|The Low Tally]] runs unsealed nitre and ungraded button out through the Outbound Yard on drover carts, and has lately found that people move at a better margin than salt. [[faction.concord-of-weights|The Concord of Weights]] financed the bore programme and holds the paper on it, which means the Ascent owns the city's water in every sense except the legal one.",

      currentConflict: 'Pan fever in the crews who make the sixth cut',
      problems: [
        'The sixth cut is wasting the crews who recover it, and it is the only grade that pays.',
        'No. 3 bore is dead. No. 1 has dropped four fathoms in nine years and nobody has published the rate.',
        'A third of the pan crews are bonded and every sheet of that paper sits in one strongroom under one tower.',
        'The Mediterranean City has begun assaying barrels on arrival, which prices the stamp at nothing.',
        'Crated ward-chalk under Magic City marks is sitting in the deep pans, hundreds of kilometres off any sanctioned route.',
        'The Blackfall drift faces have receded three hundred paces in living memory and the Bench treats the figure as seditious.',
      ],

      cityRelations: [
        row({
          city: 'The Gilded Ascent',
          stance: 'Creditor, and it shows',
          note: 'Financed the bores, holds the paper, sets the clearing rate every grade is priced against.',
        }),
        row({
          city: 'The Mediterranean City',
          stance: 'Best buyer, worst neighbour',
          note: 'Takes the finest nitre for glass, voids indenture bonds at the harbour wall, and has started testing barrels.',
        }),
        row({
          city: 'Orath',
          stance: 'Dependency, quietly',
          note: 'The water road. If the caravans stop, the Pans have about a hundred days of cistern and no plan.',
        }),
        row({
          city: 'The Arena City',
          stance: 'Trade, of an unpleasant kind',
          note: 'Bone char up for the Bittern Ladder, scute and salt down, and bonded people moving in both directions on the same manifests.',
        }),
        row({
          city: 'The Magic City',
          stance: 'Unresolved',
          note: 'Crates of its ward-chalk are lying in the deep pans off every sanctioned route, and neither city has asked the other about it.',
        }),
        row({
          city: 'The Black Weir',
          stance: 'Distant, expensive',
          note: 'River iron arrives tolled twice and the Bench complains about it annually to nobody.',
        }),
      ],

      signatureMechanic: 'The Sift Line',
      mechanicNotes:
        "[[mechanic.the-sift-line|The Sift Line]] is the loop the whole city is built around: feed spoil down graded screens, and every pass costs water and lung. Play it as a bid. Before a run the party sets how many passes they will take, and each pass consumes posted draw against a tower's book and adds to a standing exposure counter for everyone on the deck. Grades one through four pay wages. The fifth pays well. The sixth rides the last mesh and needs forty casks of extra wash, so taking it means either buying draw at bond rates or short-issuing the crew, and the crew will know which you did before the shift ends. [[skill.sieve-tuning|Sieve Tuning]] shifts the yield curve; [[skill.charge-blending|Charge Blending]] opens fresh drift faces; nothing removes the water cost, because the water cost is the point.",

      npcNotes:
        "[[npc.tazrit-nourem|Tazrit n'Ourem]] holds three towers on the Sieve and physical indenture papers on roughly a third of the pan crews, all in one strongroom under her middle tower. She will tell anyone who asks that burning the papers frees several hundred people and immediately starts a fight over who feeds them, and she is not wrong, which is the difficulty. [[npc.sahat-belek|Sahat Belek]] walks the far white alone and has found something out there he has told nobody about; he wants passage papers for himself and his daughter and will trade the location for them. And somewhere on Assay Row, in a strongroom nobody will name, sits the indenture of [[npc.doret-halvane|Doret Halvane]]'s brother, which is the price of sixty wax key impressions in the Gilded Ascent.",
      questNotes:
        "[[quest.pan-fever|Pan Fever]] starts here and is the city in miniature: prove that the fraction the crews breathe is the fraction the company sells at premium, and then decide what proving it is worth. The company can retool, pay the crews off, or discredit the evidence, and a price list is the antagonist. Running underneath it: [[npc.sahat-belek|Sahat Belek]]'s ward-chalk cache is a whole investigation on its own, and the manifests that carry bonded people between here and [[city.arena-city|the Arena City]] are the same manifests [[quest.the-indenture-column|The Indenture Column]] is written on. A party that wants to break the bond economy in the Pans has exactly one physical target and everybody knows where it is.",

      services: [
        row({
          name: 'Assay and grade stamp',
          where: 'Assay Row',
          note: 'Nine reagent wells, a loupe and a stamped card. The card sets the price. The salt has no opinion.',
        }),
        row({
          name: 'Water draw against bond',
          where: 'The Water Court, side counter',
          note: 'Any quantity, same day, quoted in months of term. No haggling and no refusal.',
        }),
        row({
          name: 'Pan-walker hire',
          where: 'The Outbound Yard',
          note: 'Eight days out on the far white. Two in five come back on schedule; the yard does not publish the other figure.',
        }),
        row({
          name: 'Screen-wright',
          where: 'The Tower Line',
          note: 'Mesh woven to a count and rated. Condemned screens are burnt in the street, by law, in front of the crew that broke them.',
        }),
        row({
          name: 'Crucible time',
          where: 'The Crucible Sheds',
          note: 'Eleven days of shed fuel a button. Booked a season ahead, and the booking passes by inheritance, not by coin.',
        }),
        row({
          name: 'Bond redemption',
          where: 'Assay Row strongrooms',
          note: 'You may buy any paper held here if the holder consents. Consent is the expensive part.',
        }),
      ],

      creatureNotes:
        '[[creature.salt-mason|Salt masons]] are the reason the city sifts where it does. The tube worms cement brine crust into towers and concentrate metal salts as they go, so a dead colony is the richest sift in the Pans and a live one gives way under a crew standing on it. Every experienced crew boss can tell live crust from dead by sound, and every season somebody gets it wrong. Beyond the marked stakes, the far white is close to sterile: brine shrimp in the standing liquor, algae, and whatever the wet season briefly permits.',

      history:
        "Four generations back the pans were worked seasonally by drover families who raked crust, dried it and carried it out on the same carts that brought their water. The change was metallurgical, not political: somebody worked out that the wind had spent centuries sorting iron-black sand into the lee faces, and that the grey buttons it reduced to would cut anything. Three crucible sheds were licensed, and those licences have never been reissued to anyone outside the founding households.\n\nThe towers followed, then the grading, then the bores. The bore programme was financed out of the Ascent Basin against forward crust, and the terms of that advance are why the Bench cannot simply stop selling. The Bond Statute, which made foreign indenture papers enforceable in the Pans for a registry fee, was passed in a drought year as an emergency measure and has been renewed without debate ever since. No. 3 bore went brackish nine years ago. Nobody has proposed a fourth.",

      devNotes:
        "CANON: the Sifting City is a desert city built on mineral sifting, with sifting towers, sand-shed roofs and wind-scour walls, the Great Sieve as its central landmark, and a pale ochre, iron black and salt white palette. The name is a working title. Everything else here is a proposal, built to one rule: water economics and labour conditions drive every other decision in the city, so any change to the water numbers should propagate outward to the bonds, the grades and the Bench. The six cuts, the three bores, the ration figures and the Bond Statute are the load-bearing invented details.",
      openQuestions: [
        'How deep is the aquifer, and does anyone in the city actually know? A published survey would be a political event.',
        'What is the sixth cut doing to lungs, chemically? Pan fever needs a mechanism before it can have a cure.',
        'Who put crated ward-chalk in the deep pans, and were they coming or going?',
        'If the bonds burn, who feeds six thousand people? The city has no answer and neither do I yet.',
        'Is the Tower Bench a council of forty households or effectively three? Needs a decision before any faction author writes against it.',
      ],
    },
  }),

  E({
    id: 'district.sifting-city-the-tower-line',
    type: 'district',
    name: 'The Tower Line',
    status: 'draft',
    summary: 'Nine licensed towers standing on the Great Sieve, each one a cascade, a crew and a water allocation.',
    tags: ['industrial', 'extraction'],
    fields: {
      overview:
        'The working city. Nine iron-black towers along the crest of [[landmark.the-great-sieve|the Great Sieve]], each with its own hooded wind intake, its own nine-screen [[machine.the-sieve-cascade|cascade]], its own crew of about ninety, and its own line in the Water Court book. A tower is not a building here, it is a licence with a building attached.',
      city: [CITY.siftingCity],
      districtType: 'Extraction and processing',
      wealth: 'The tower head is rich, the deck is not',
      atmosphere:
        'Unbearable noise and no speech. The cascades run a continuous grinding hiss that makes shouting pointless, so the decks work on [[skill.sieve-tuning|tally signs]] and whistles, and crews come off shift half deaf and stay that way. Everything is coated in pale grit, including the food, including the crews.',
      architecture:
        'Tapered timber frames on rammed-spoil rafts, sheathed in board and tarred iron-black against the salt. Nine screens stacked head to foot inside, with the finest mesh at the bottom, and an external stair with no rail because a rail collects sand.',
      whoLivesHere: 'Crew bosses and screen-wrights in the mid-stages; bonded crews in dormitory decks at the base',
      danger: 'High and cumulative rather than sudden',
      playNotes:
        "Every run down [[mechanic.the-sift-line|the sift line]] is played here: pick your passes, spend the draw, take the exposure. [[npc.tazrit-nourem|Tazrit n'Ourem]] holds the third, fifth and sixth towers, and the strongroom under the fifth contains the indenture papers of roughly a third of the pan crews. Getting into it is a straightforward heist with a completely unstraightforward aftermath. Cruder options: a condemned screen sold on, a wash quota missed on purpose, a tower's tar rota allowed to lapse until the Bench has grounds to take the licence.",
      devNotes:
        'The mechanical heart of the city. Anything a designer needs to price in water should be priced against a tower charge: sixty casks for a full wash, forty more for the sixth cut.',
    },
  }),

  E({
    id: 'district.sifting-city-the-water-court',
    type: 'district',
    name: 'The Water Court',
    status: 'draft',
    summary: 'Bore heads, cisterns and the ration office. The only stone vaults in the city, and they open from the inside.',
    tags: ['government', 'infrastructure'],
    fields: {
      overview:
        'Two working bore heads, eleven roofed cisterns and the office that posts the daily draw. The Court is not a court in any judicial sense; the name comes from the enclosed yard the cisterns stand in, and it stuck because coming here to argue about your allocation is the closest most residents get to a hearing.',
      city: [CITY.siftingCity],
      districtType: 'Water works and administration',
      wealth: 'Modest, and armed',
      atmosphere:
        'Cool, echoing and wet underfoot, which is unique in this city and is the reason people invent errands. Queues form before dawn at the issue counter and are policed. The sound of the No. 1 pump is audible everywhere in the district and its rhythm is how the city tells the time.',
      architecture:
        'Rammed earth over stone vaulting, rendered white, with the cistern roofs slabbed and guttered into each other. The gates are iron-bound and hung to open inward only. This is the one part of the city built as though someone might one day try to take it.',
      whoLivesHere: 'Water clerks, pump crews, cistern guards, and the queue',
      danger: 'Low, unless you are seen counting',
      playNotes:
        'The draw book is here, and it records every cask against a tower and every overdraw against a bond. It is therefore a complete map of who in the Pans is one bad month from being owned. Reading it is an investigation; copying it is a faction-making act. The side counter issues water against bond on the spot, at rates quoted in months of term, which makes it the fastest and worst source of emergency resources in the city. The drop rate on No. 1 bore is measured weekly on a rod nobody is supposed to read.',
      devNotes:
        'Deliberately the best-defended building in a city with no siege problem. If players ever want leverage over the Sifting City, this is it, and the design assumes they will work that out.',
    },
  }),

  E({
    id: 'district.sifting-city-assay-row',
    type: 'district',
    name: 'Assay Row',
    status: 'draft',
    summary: 'Grading halls, the die room and the bond strongrooms. Where a barrel is told what it is worth.',
    tags: ['trade', 'law'],
    fields: {
      overview:
        'Eleven grading halls in a single scoured street, the die room at the western end, and behind them the strongrooms. [[faction.pale-assay|The Pale Assay]] stamps every barrel of [[material.pan-nitre|nitre]] and every crate of [[material.blackfall-button|button]] into one of six cuts before it may leave the Pans. [[faction.bondwrights-hall|The Bondwrights]] keep their branch on the same street, which nobody planned and everybody understands.',
      city: [CITY.siftingCity],
      districtType: 'Assay, registry and strongrooms',
      wealth: 'Rich, and careful not to look it',
      atmosphere:
        'Quiet in the way a bank is quiet. Reagent smell, scratching pens, and the periodic clack of a stamp coming down, which is the single most consequential noise in the city. Nobody raises their voice on Assay Row because everybody on it is being assessed.',
      architecture:
        'Salt block with imported shuttered windows, which is the loudest statement of wealth available here. The strongrooms are sunk rather than built, dry-vaulted below crust level, and their doors face the street so that everyone walking past can see them shut.',
      whoLivesHere: 'Assay-sworn stampers and clerks, bond factors, and the die-cutters, who never leave the district',
      danger: 'Low by day. The strongroom street is patrolled at night by people who are paid not to recognise anyone.',
      playNotes:
        "Two heists live here and they are different jobs. The die room in [[landmark.the-cut-house|the Cut House]] holds the grade dies: steal or copy one and you can restamp any barrel on the continent, which is a trade-fraud campaign rather than a payday. The strongrooms hold paper, including [[npc.doret-halvane|Doret Halvane]]'s brother's indenture, which is worth sixty wax key impressions in the Gilded Ascent to anyone who can carry it out. There is also an honest route: [[skill.proof-marking|proof marking]] can be sworn to here, and an Assay oath is the only thing in the Pans that makes a person legally unbondable.",
      devNotes:
        'The legitimate and criminal halves of the same economy on one street, deliberately. The Assay oath is the only social mobility the city offers and it is capped by the number of stamps.',
    },
  }),

  E({
    id: 'district.sifting-city-the-crucible-sheds',
    type: 'district',
    name: 'The Crucible Sheds',
    status: 'draft',
    summary: 'Three licensed sheds reducing Blackfall sand into buttons. Eleven days of fuel each, and the licences are never sold.',
    tags: ['industrial', 'inherited'],
    fields: {
      overview:
        'Three sheds, no more, ever. Each holds four banked crucibles that reduce [[material.blackfall-sand|Blackfall sand]] into [[material.blackfall-button|button]] at eleven days of shed fuel per button, and the three licences have passed by inheritance since they were first issued. Every wire-drawing die on the continent starts in this district, which means the wire trade starts here too.',
      city: [CITY.siftingCity],
      districtType: 'Smelting and licensed craft',
      wealth: 'Prosperous, in three families',
      atmosphere:
        'Heat you can feel from the street, and a permanent low roar of forced draught. The fuel yards stink of tar cake. The shed families eat, sleep and argue within fifty paces of the crucibles because a bank that goes cold costs eleven days.',
      architecture:
        'Low, thick-walled, half-sunk to keep the heat in, with tall flues braced against the wind and hooded to keep sand out of the burn. The fuel yards are the largest roofed spaces in the city and are guarded better than most of the strongrooms.',
      whoLivesHere: 'Three shed households, their sworn crucible masters, and the fuel gangs',
      danger: 'Moderate. Burns, flue collapse, and fuel theft handled privately.',
      playNotes:
        'Crucible time is booked a season ahead by inheritance rather than by coin, so a party that needs a button made outside the rota has to find a family reason, not a price. Dies are rented by the shift and returned worn; a worn die that has not been returned is the simplest contraband in the world to carry and the hardest to explain. If the fuel supply is interrupted for more than nine days the banks go cold and the city loses a season of dies, which is a lever anyone controlling the water road already holds.',
      devNotes:
        'Sited here so that the continent-wide wire bottleneck sits inside a city with a water problem. Three licences is a hard number: adding a fourth should be a campaign outcome, not a background detail.',
    },
  }),

  E({
    id: 'district.sifting-city-the-lee',
    type: 'district',
    name: 'The Lee',
    status: 'draft',
    summary: 'Downwind of the towers, where the fines settle and the rent is cheapest. The city calls it a direction; it is a sentence.',
    tags: ['poor', 'housing', 'dark'],
    fields: {
      overview:
        'Everything the towers put into the air comes down here, sorted by weight, with the finest fraction travelling furthest. Rent falls by about a third across the four streets from the tower line to the outer edge, and the falling rent tracks the falling life expectancy almost exactly, which is a correlation the Bench has been shown and has not published.',
      city: [CITY.siftingCity],
      districtType: 'Working housing',
      wealth: 'Poor, and cheaper the further out you go',
      atmosphere:
        'A pale film over everything, coughing at all hours, and washing that never comes clean. Children here are diagnosed by ear from three streets away. The Lee is also the warmest, loudest and most sociable part of the city, because everyone in it is in the same trouble and has stopped pretending otherwise.',
      architecture:
        'Salt block, single storey, roofed with whatever sheds sand. Cisterns are shared between four or six households rather than one per building, in open defiance of the roof law, and the Water Court does not enforce it here because enforcing it would empty the district.',
      whoLivesHere: 'Free crews, bonded crews out of the tower dormitories, and everyone the towers have finished with',
      danger: 'Chronic rather than acute. The air is the threat.',
      playNotes:
        "[[quest.pan-fever|Pan Fever]] is diagnosed here before it is proved anywhere else, and the evidence is people, not documents: four streets, a measurable gradient, and a company price list that explains it. This is also where any organising happens. The Lee has no faction of its own yet, which is the opening: a party can be the reason it acquires one, or the reason it does not. [[item.pale-dust|Pale dust]] is sold openly two streets in, and half the people selling it are dosing themselves to finish shifts.",
      devNotes:
        'The city\'s moral centre of gravity. Written so that the harm is structural and legible rather than atmospheric: a designer should be able to point at a street and state the exposure.',
    },
  }),

  E({
    id: 'district.sifting-city-the-outbound-yard',
    type: 'district',
    name: 'The Outbound Yard',
    status: 'draft',
    summary: 'Caravan staging, the seal gauge and the water road. Everything the Pans have ever sold has crossed this ground.',
    tags: ['trade', 'smuggling', 'gate'],
    fields: {
      overview:
        'A hundred and forty paces of hard-rolled crust with a gauge house at the road end. Water carts come in from [[city.orath|Orath]] and the waste margin; sealed barrels go out. Every barrel passes the gauge, is weighed against its grade card, and is either sealed or held. Drover families run the yard in practice, whatever the Bench believes.',
      city: [CITY.siftingCity],
      districtType: 'Caravan yard and customs',
      wealth: 'Modest, with a lot of coin passing through it',
      atmosphere:
        'Animals, dust, arguing in four languages, and the specific tension of a place where everyone is either about to leave or has just arrived from eight days of nothing. The unloading of water is done under guard and watched by more people than it needs.',
      architecture:
        'Open ground, sheds on three sides, and the gauge house: the only building in the yard with a stone floor, because the scales have to sit level and the crust does not.',
      whoLivesHere: 'Drover kin, yard hands, gauge clerks, and pan-walkers between circuits',
      danger: 'Moderate. Theft is common; violence is bad for the caravan schedule and is discouraged commercially.',
      playNotes:
        "The way in and out of the city for goods, people and problems. [[faction.low-tally|The Low Tally]] moves unsealed nitre and ungraded button out on drover carts, and has begun moving people the same way, laundered as crewed passage. [[npc.sahat-belek|Sahat Belek]] is hired from here for far-white work and wants passage papers for himself and his daughter more than he wants money. A party that wants to leave the Pans quietly needs either the drovers' goodwill or a route across the crust, and the second one kills people.",
      devNotes:
        'The chokepoint that makes Orath matter. If the water road stops, this district is where the city finds out, about four days before the cisterns tell it.',
    },
  }),

  E({
    id: 'landmark.the-great-sieve',
    type: 'landmark',
    name: 'The Great Sieve',
    status: 'draft',
    summary: 'The graded escarpment the city works, and the nine towers standing on it. A place, and a licence.',
    tags: ['landmark', 'extraction'],
    fields: {
      overview:
        'A two-mile escarpment of wind-sorted drift where the White Pans give up their sorting for free. Coarse at the crest, finer with every hundred paces down the face, and finest of all in the lee hollows, which is the arrangement the whole industry is a copy of. The nine licensed towers stand along the crest, and to hold one is to hold a vote.',
      city: [CITY.siftingCity],
      landmarkType: 'Working escarpment and tower line',
      built: 'Not built. Sorted, over centuries, by a wind that has not changed direction.',
      appearance:
        'Banded ochre and iron-black in horizontal stripes you can read like a section drawing, with the black bands marking the [[material.blackfall-sand|Blackfall]] concentrations. The towers are tarred to match the black bands, which was not a decision anyone made and is now enforced by the tar rota.',
      function:
        'It is the resource, the workplace and the constitution at once. Tower licences are pegged to positions on the crest, water allocation is pegged to tower licences, and votes on the Bench are pegged to both, so the geography of the escarpment is the political map of the city.',
      access:
        'The crest is licensed ground and patrolled. The face below the third tower is open to anyone with a rake and a barrow, which is where free crews scratch a living and where most pan fever cases first worked.',
      devNotes:
        "CANON: the Great Sieve is the Sifting City's central landmark. Its geology, the nine towers and the licence-vote arrangement are proposals.",
    },
  }),

  E({
    id: 'landmark.the-third-bore',
    type: 'landmark',
    name: 'The Third Bore',
    status: 'draft',
    summary: 'The bore that went brackish nine years ago, capped, guarded, and still the most political hole in the city.',
    tags: ['landmark', 'infrastructure', 'water'],
    fields: {
      overview:
        'A four-foot shaft with an iron lid and a standing guard on a hole that yields nothing. No. 3 turned brackish over about eleven weeks nine years ago and has been sealed ever since. The guard is not there to keep people out of the water. It is there to stop anyone lowering a rod and reading how far the table has dropped.',
      city: [CITY.siftingCity],
      landmarkType: 'Capped bore shaft',
      built: 'Sunk in the bore programme, two years after No. 1',
      appearance:
        'A raised stone collar, a bolted lid, a lamp bracket and a bench. In the wet season a stain spreads around the collar and dries to a grey ring, which the Water Court paints over annually.',
      function:
        'Officially, a sealed hazard. Practically, the only place in the city where the state of the aquifer can be measured directly, which is why the Bench treats the lid as a security matter and why the drop rate on No. 1 is the most valuable unpublished number in the Pans.',
      access: 'Two guards, one lid, four bolts. The bolts are the easy part.',
      devNotes:
        'A single measurable fact locked behind a door: whoever reads the rod knows whether the city has decades or years. Written to be openable by a mid-level party and unusable by them without allies.',
    },
  }),

  E({
    id: 'landmark.the-cut-house',
    type: 'landmark',
    name: 'The Cut House',
    status: 'draft',
    summary: 'The die room of the Pale Assay, where the six grade stamps are cut. Six punches decide the price of everything.',
    tags: ['landmark', 'trade', 'crime'],
    fields: {
      overview:
        'One room, one bench, two die-cutters, and six hardened punches in a rack. Every grade card issued in the White Pans is struck from these dies, and every buyer from here to the Meridian Coast pays against the mark they leave. [[faction.pale-assay|The Pale Assay]] guards the room better than it guards its own money, and correctly.',
      city: [CITY.siftingCity],
      landmarkType: 'Die room',
      built: 'Rebuilt three times; the current room is windowless by design',
      appearance:
        'Whitewashed, lampless except for two shuttered oil lamps on gimbals, and dusted daily so that any footprint shows. The rack is bolted through the wall into the vault behind it. The dies themselves are unremarkable pieces of steel about the size of a thumb.',
      function:
        'To make grade legible and therefore tradeable, which is the only reason the Pans function as a market at all. The die-cutters are sworn, housed on the premises and, by custom rather than law, do not leave the district.',
      access:
        'Two doors, both watched, and a rota that means at least one cutter is always in the room. The known route in is not the doors; it is the annual re-hardening, when the dies leave the room for a working day.',
      devNotes:
        'Ties directly to [[skill.false-proof|False Proof]] and to any trade-fraud plot on the continent. A stolen die is not loot, it is an ongoing crime that reprices whole cargoes.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Arena City                                                    */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.arenaCity,
    type: 'city',
    name: 'The Arena City',
    workingTitle: true,
    aka: ['The Ring'],
    status: 'draft',
    summary: 'A court of discharge with a stone bowl at the centre of it. Debts are settled on the sand and rendered afterwards.',
    tags: ['arena', 'debt', 'indenture', 'steppe', 'dark'],
    fields: {
      epithet: 'The Ring',
      overview:
        "Every other city on the continent has a debt problem it cannot solve without admitting what it does to people. The Arena City solved it by building somewhere to send them. [[landmark.the-sunken-ring|The Sunken Ring]] is a tiered stone bowl cut into the [[region.ashen-steppe|Ashen Steppe]] and it is not a spectacle first; it is a court, a clearing house and a rendering works, in that order, with an audience because an audience pays for the lamps.\n\nThree things bring a person onto the sand. A bond, signed for a stated sum under [[mechanic.ring-bond|the Ring Bond]]. A sentence, commuted by a foreign magistrate into a stated number of cards, for which this city pays a head price. Or a suit, when two parties with a dispute and the Chamber's leave agree to put it to champions instead of to lawyers. All three end in the same ledger.\n\nLast year the Ring ran cards on two hundred and fourteen days. The Rendering Book recorded six hundred and eleven entries, three hundred and eighty-eight of them fighters. The remainder were beast-handlers, pen deaths, two crowd crushes and a steward. Unclaimed bodies go to [[machine.the-char-retorts|the retorts]] under the floor and come out as bone char, which is shipped east to clarify the [[city.sifting-city|Sifting City]]'s brine, which makes the soda ash that makes the [[city.mediterranean-city|Mediterranean City]]'s glass. Nobody involved considers this remarkable.",
      founded:
        'The bowl is older than the city. It was a herding kraal cut into a natural depression, and the first tiers were cut so that drovers could watch stock being judged.',
      settlementType: 'Judicial and contract city built around an arena',

      region: [REGION.ashenSteppe],
      biome: 'Dry steppe',
      terrain:
        'A shallow natural depression on open grazing steppe, with the Ash Fork riverbed running past it to the south-west. The bowl is cut about forty feet into the depression floor, which is why the drainage works at all and why the district downstream of it is the cheapest ground in the city.',
      climate: 'Hot dry summers, hard frosts, and a wind that never entirely stops. The card season runs from the first thaw to the first hard frost.',
      approach:
        "From any direction you see banners before buildings: thirty-one company banners on masts along the radial streets, visible for an hour's ride, faded to the same dust red by the same sun. The bowl itself is invisible until you are almost on it. People consistently report being surprised by how small the city looks and how loud it is.",

      cityMapNote:
        'A starburst. Everything radiates from the bowl, because everything in the city is either feeding the sand or processing what comes off it, and distance from the Ring is a direct measure of status and of smell. The banner streets run outward as spokes; the wedges between them are the trades; the drovers sprawl east beyond the wall because their herds will not fit inside it.',
      districtCount: '6 mapped',
      cityMap: ARENA_CITY_MAP,

      architecture:
        'Sun-bleached rubble limestone laid in thick lifts, with the tiers of the bowl itself in cut ashlar because they carry weight and crowds. Everything else is cheap and low. The colour comes from two sources: dust red render on the banner frontages, applied annually and deliberately not maintained afterwards, and brass, which is used for anything that has to be read at a distance or survive being handled by ten thousand people a day. Blood channels are the one piece of civil engineering the city is genuinely good at: eight cut stone runs, four still flowing, all of them older than the current Chamber.',
      silhouette: 'A ring of stepped stone in a hollow, with thirty-one banner masts radiating out of it and nothing tall anywhere else.',
      palette: ['#8f3a2c', '#c2532f', '#d8cdb6', '#efe6d2', '#b08d3f'],
      buildMaterials: ['material.steppe-scute', 'material.blister-bar', 'material.blackbole-timber'],

      landmarkName: 'The Sunken Ring',
      landmarkDesc:
        'A tiered stone bowl seating rather more than twelve thousand, with a sand floor of about a hundred and ten paces, eight blood channels cut radially under it, and three floors of vaults, pens and retorts beneath that. See [[landmark.the-sunken-ring|the Sunken Ring]]. It is the courthouse, the exchange and the crematorium of a city of twenty-four thousand.',

      energy:
        'Muscle, dung cake and lamp oil, of which the last is partly made here. The retorts under the floor yield bone oil as well as char, and the Ring lights its own night cards with it, which is a fact the stewards do not advertise and the drovers mention constantly.',
      infrastructure:
        'The channels and the wells, and very little else. Eight blood channels run from the sand out under the tiers to a sump beyond the south-west wall; four are blocked or collapsed, so on a heavy card the floor is flushed by hand with water the city cannot spare. The sump drains toward the Ash Fork gravels, which is where the drovers water their herds, and the connection has been formally denied twice.',
      keyMachines: ['machine.the-char-retorts'],

      transport:
        'Six radial roads, one for each wedge, all of them ending at the bowl. Freight in and out is by ox cart along the steppe tracks: [[material.steppe-scute|scute]] and hides in from [[deposit.moult-fields|the Moult Fields]] in the spring, char and bone oil out east to the Pans, fighters and bonded people in from everywhere by whatever route their paper says.',
      traversal:
        'The city is walkable in twenty minutes and the bowl is not. Getting from the tiers to the floor, or from the floor to the vaults, is a matter of gates, tokens and stewards, and the three floors under the sand are effectively a separate settlement with its own routes, its own law and its own population who do not come up.',

      government: 'The Ring Chamber, voting by unexpired contract',
      politicalLeaning: 'Creditor oligarchy with a public gallery',
      ruler: ['faction.red-writ', 'npc.berke-chagra'],
      succession:
        'A seat in the Chamber is not inherited, it is held: a house votes the contract-months it currently holds unexpired, so a house that sells its paper loses its voice within the season. This produces a body that is ruthlessly responsive and completely incapable of thinking beyond the length of its own contracts. Two houses have held seats continuously for forty years by never letting a contract run out.',

      laws:
        "The law here is contract law with a sharp end. A bond is enforceable on the body of the person who signed it, and the Ring exists to enforce it, so most of what other cities would call criminal law is handled as breach. Killing outside a sanctioned card is murder and is tried normally, which surprises visitors. Killing on a card is a discharge, recorded in the Rendering Book with the card number beside it. The city's genuine legal innovation, and its export, is that a foreign sentence can be converted into a stated number of cards at a published rate, and that the converting magistrate is paid.",
      enforcement: 'Ring stewards, who are contract officers first and watchmen second',
      extradition:
        "The Arena City will hand over anyone whose bond is discharged and nobody whose bond is not, on the same property principle as the Pans. It signs conversion treaties readily: eleven cities and towns currently commute sentences here for a head price. [[city.mediterranean-city|The Mediterranean City]] refuses to trade in bodies, voids Ring bonds at the harbour wall, and consequently has no treaty of any kind with this city.",
      notableCrimes: [
        'Forging a [[item.quitblade|quitblade]] or carrying one you did not earn. The oldest capital charge on the books.',
        'Unnotching a [[item.tallyblade|tallyblade]], which is falsifying a debt ledger.',
        'Interfering with a fighter off-card, including their water ration, which is very hard to prove and routine.',
        'Laying [[spell.dead-ground|dead ground]] on a card without the Chamber\'s leave.',
        'Claiming a body from the Claim Wall and failing to pay the recovery fee inside nine days.',
        'Breaching a pen, which is charged as arson is charged: by what escaped, not by what you intended.',
      ],

      socialClasses: [
        row({
          name: 'Chamber houses',
          share: 'About sixty',
          note: 'Hold unexpired contracts and vote them. Their wealth is other people\'s remaining time, which they can and do sell forward.',
        }),
        row({
          name: 'Banner-masters',
          share: 'Thirty-one, and their households',
          note: 'Own the stables, the training, the frontage and a cut of both the gate and the bond. A banner is a business with a colour.',
        }),
        row({
          name: 'Stewards and ring-clerks',
          share: 'Roughly 700',
          note: 'Notch the blades, keep the card, weigh the water, write the Rendering Book. Sworn, salaried, and the single most corruptible class in the city.',
        }),
        row({
          name: 'Bonded fighters',
          share: 'About 1,900 in the pens at any time',
          note: 'The Ring keeps a stated share of them. Injuries persist and are not compensated. Roughly one in six discharges a bond alive.',
        }),
        row({
          name: 'Crowd trades',
          share: 'Around 19,000',
          note: 'Drovers, cooks, cordial-sellers, armourers, retort men, bookmakers. The only class in the city that can leave whenever it likes, and most of it never does.',
        }),
      ],

      population: 'About 24,000, plus 1,900 in the pens',
      demographics: [
        row({
          group: 'Steppe drover clans',
          share: 'Two in five',
          note: 'The original population. They own the herds, the milk, the moult-field crews and the wells, and regard the Ring as a customer rather than a government.',
        }),
        row({
          group: 'Ring-born town families',
          share: 'One in three',
          note: 'Three generations of stewards, armourers and banner households. They have never lived anywhere the year was not divided into cards.',
        }),
        row({
          group: 'Brought under paper',
          share: 'One in five',
          note: 'From every city with a conversion treaty. They arrive with nothing in common except a number of cards.',
        }),
        row({
          group: 'Discharged',
          share: 'A few thousand',
          note: 'People who fought out their bonds and stayed, because a [[item.quitblade|quitblade]] is proof of freedom here and means nothing at all a week\'s ride away.',
        }),
      ],
      languages: [
        'Trade cant, in the streets and at every betting post',
        'Steppe drover speech, in four dialects that mostly insult each other',
        'Card cant: the stewards\' shorthand for stipulations, tiers and injuries, written on the boards and read by everyone',
      ],
      cultures: TBD('What do the drover clans actually believe about the dead the Ring renders, and does anyone in the city hold a funeral?'),

      food:
        'Meat, milk and sour. [[food.steppe-sour|Steppe sour]] is drunk by the skinful on card days and is most of the calories the crowd takes in; the herds that make it are the drovers\' real wealth and the city\'s main theft problem. Grain comes in by cart and is expensive enough that bread is a status marker. Fighters are fed by their banners, on a scale that is written into their contracts and is one of the things a good bond-broker argues about.',
      water:
        "Wells in the Ash Fork gravels, and the Fork itself for about three months a year. The city has never been short of water in the way the Pans are short, but it has a quality problem it will not name: the blood-channel sump drains toward the same gravels the drovers water from, and four of the eight channels no longer flow. On a heavy card the floor is flushed by hand, and the water for that comes out of the public wells.",
      staples: ['food.steppe-sour', 'food.sift-cake'],

      economy:
        "Three revenues, in descending order of respectability. The gate, which is large and reliable and pays for the lamps. The bond trade, which is the real business: contracts are written, priced, sold forward and enforced here, and [[faction.red-writ|the Red Writ]] takes a cut of every one. And the rendering, which is small in coin and enormous in what it says about the place: [[recipe.bone-char-firing|bone char]], bone oil and ash, sold east, sold cheap, sold constantly. Around all of it sits an armouring trade in [[material.steppe-scute|scute]] that exists because the Ring needs cheap kit that fails in interesting ways.",
      mainProduction: 'Fight contracts, bone char, scute armour',
      currency:
        'Ascent stair writs at the top, brass ring-tokens in the streets. A token is nominally a seat and functions as small change, which means the city\'s petty currency is literally an entitlement to watch.',
      wealth: 'Modest',

      exports: ['material.steppe-scute', 'item.tallyblade', 'item.cinderroot-cordial', 'food.steppe-sour', 'item.indenture-bond'],
      imports: ['material.blister-bar', 'food.stair-loaf', 'material.blackbole-timber', 'item.governor-spring', 'food.dew-melon'],
      tradeNotes:
        "The city's most valuable export is not a good, it is the conversion treaty: eleven jurisdictions can now turn a sentence into a card count, and each of them takes a fee for doing so. Bone char goes east to [[machine.the-bittern-ladder|the Bittern Ladder]] in the Pans in quantities that are on every manifest and remarked on by nobody. [[item.cinderroot-cordial|Cinderroot cordial]] is poured here by the cup and banned outright on the Meridian Coast, which has made it a smuggling staple rather than stopping it.",

      localResources: ['deposit.moult-fields', 'material.steppe-scute'],
      resourceNotes:
        'The [[deposit.moult-fields|Moult Fields]] are a six-week season and the only genuine natural resource the city has. Crews small enough to enter live burrows gather shed carapace, the armourers boil, press and laminate it, and the Ring buys the entire take without asking about the crews. Everything else the city consumes has walked or been carted here.',

      defense:
        'A low circuit wall with six gates, built to control who comes in for a card rather than to stop an army, and a city that can put several thousand trained fighters into a street inside an hour if anyone pays for it. That last part is the actual defence and everyone knows it.',
      doctrine:
        "No standing army and no intention of raising one. The Chamber's position is that [[faction.red-writ|the Red Writ]] holds enough unexpired contracts to field a force nobody has counted, and that this is cheaper and more flexible than a garrison. It is cheaper. Whether the Chamber could actually call it, or whether the Writ would simply take the city, has never been tested and is the sort of question that only gets answered once.",
      garrison: 'About 300 stewards; several thousand contracted fighters within a day',

      factionNotes:
        "[[faction.red-writ|The Red Writ]] brokers every fight contract and most mercenary work on the continent out of the vaults under the sand, and its unexpired paper amounts to a standing army no city has taxed or counted. [[faction.bondwrights-hall|The Bondwrights' Hall]] writes and resells the respectable half of the same trade and lobbies hard to keep machinery licensed and dear, so that bodies stay the cheaper engine. [[faction.low-tally|The Low Tally]] moves people through the Ring the way it moves cargo, laundered as crewed passage and bond transfers, and the Ring's manifests are the cleanest paper in that trade. [[faction.standing-hour|The Standing Hour]] has tried three times to organise the pens and been broken three times, twice by stewards and once by its own stewards deciding the strike was not permitted to win.",

      currentConflict: 'A voided manumission and the vault under the sand',
      problems: [
        'Four of the eight blood channels no longer flow, and the sump drains toward the drovers\' wells.',
        'Two imported Drown animals have bred under the stands and the young are getting out of pens built for the adults.',
        'A signed manumission was voided over a mis-stamped seal and the original is three floors under the sand.',
        'The bookmakers do not bribe fighters, they buy their water ration, and nothing can be proved from the fight itself.',
        'Eleven conversion treaties now supply more bodies than the pens were built to hold.',
        'The Red Writ\'s unexpired contracts exceed anything the Chamber could call on, and the Chamber has stopped asking for the figure.',
      ],

      cityRelations: [
        row({
          city: 'The Sifting City',
          stance: 'Supplier and customer',
          note: 'Bone char east for the Bittern Ladder, salt and scourglass west, and bonded people moving both ways on the same manifests.',
        }),
        row({
          city: 'The Gilded Ascent',
          stance: 'Correspondent',
          note: 'Ascent houses buy Ring contracts forward as an asset class, and the Assize freight manifest has a column for people.',
        }),
        row({
          city: 'The Mediterranean City',
          stance: 'No treaty at all',
          note: 'Voids Ring bonds at the harbour wall and refuses conversion, which makes it the destination for every runaway with a coast road map.',
        }),
        row({
          city: 'The Tree City',
          stance: 'Quiet trade',
          note: 'Timber and pitch in; the Marshalcy has quietly converted three purges into card counts and does not minute it.',
        }),
        row({
          city: 'The Floating Swamp Settlement',
          stance: 'Awkward',
          note: 'The under-stables imported Drown animals without papers, and the raft clans want them back or want paying.',
        }),
        row({
          city: 'Orath',
          stance: 'Recruiting ground',
          note: 'Banner scouts work the caravan ground for anyone who will sign, and the frontier does not check what they signed.',
        }),
      ],

      signatureMechanic: 'The Ring Bond',
      mechanicNotes:
        "[[mechanic.ring-bond|The Ring Bond]] should be offered to players as a solution, because that is how it is offered to everyone else. Sign for a sum and the Ring holds a stated share of you: a card count, a tier, and stipulations that get harsher as the tier rises. Money now, obligation later, and the obligation is enforced on the body. Two rules make it bite. Injuries persist between cards and are not healed by the city, so the third card is fought with the second card's arm. And the share is transferable, so the party who signed with a banner-master may find their paper held by [[faction.red-writ|the Red Writ]], by a Gilded Ascent house, or by someone they have just made an enemy of. [[skill.ring-craft|Ring Craft]] reads the card and works the stipulations; [[skill.crowd-turning|Crowd Turning]] can move a tier, and can also start a riot the stewards will price in blood.",

      npcNotes:
        "[[npc.aylun-torgai|Aylun Torgai]] is sixteen wins and free on paper only: her manumission was signed and voided over a mis-stamped seal, and the original sits in the contract vault three floors under the sand. Recovering it makes her free and hunted. [[npc.berke-chagra|Berke Chagra]] holds paper on half the fighters and most of the stewards, and does not bribe anyone: he buys their water ration, and two dry days will lose a fight honestly. The only evidence is the water-steward's tally and the water-steward owes him more than she earns in a year. [[npc.sukhet-daral|Sukhet Daral]] keeps the under-stables and has a breeding problem he cannot report, and he pays in cage keys and tunnel access, which is the best currency in the city for anyone planning to be under the sand.",
      questNotes:
        "[[quest.the-indenture-column|The Indenture Column]] arrives here as freight: the Ascent guild's manifest has a column for people and the Chamber houses are the buyers, so this is where the column is either delivered, diverted or exposed. Under that sits Aylun Torgai's vault job, which is a heist with a legal document as the prize and a public status change as the reward. Sukhet Daral's escaped stock is a clean dungeon crawl under the stands with a genuine deadline: the next flooded card. And any party that spends a season here will be offered a bond, which is the real quest, because taking it is playable and refusing it is expensive.",

      services: [
        row({
          name: 'Bond writing and pricing',
          where: 'Writ Court',
          note: 'Money today against a stated card count. Read the stipulations; the tier ladder is where the harm is.',
        }),
        row({
          name: 'Body claim',
          where: 'The Claim Wall, the Rendering',
          note: 'Nine days posted, then the retorts. The recovery fee is stated in the same coin as the bond and is not negotiable.',
        }),
        row({
          name: 'Ringside cordial',
          where: 'Banner Streets, everywhere',
          note: '[[item.cinderroot-cordial|Cinderroot]] by the cup. Three seasons of it and your hands stop working.',
        }),
        row({
          name: 'Scute harness, fitted same day',
          where: 'Scute Yards',
          note: 'Cheap, quick and honest about its limits. Boiled and pressed carapace stops one good hit.',
        }),
        row({
          name: 'Quitblade striking',
          where: 'Scute Yards ring forge',
          note: 'A spent [[item.tallyblade|tallyblade]] reforged unmarked, on production of a discharge. Forged copies are the city\'s oldest crime.',
        }),
        row({
          name: 'Beast hire and cage keys',
          where: 'The Under-Stands',
          note: 'Whatever the crowd has not seen before, and the tunnels to move it. Papers optional, consequences not.',
        }),
      ],

      creatureNotes:
        '[[creature.yokeback|Yokebacks]] are the steppe staple and the Ring\'s pharmacy: separating the fused pair triggers a days-long frenzy the under-stables sell by the animal, and the severed gland is the base of [[spell.yokebreak-draught|yokebreak draught]]. [[creature.sandsleeper|Sandsleepers]] come up out of the Cinder Waste margin in brood years and are trapped for the card season. And under the stands, unlisted anywhere, two [[region.the-drown|Drown]] animals imported without papers have bred, and the young are smaller, faster and getting through mesh built for their parents.',

      history:
        'The bowl was a kraal, then a judging ground, then a court. The change that made the city was procedural rather than dramatic: someone wrote down a conversion rate. Once a magistrate three hundred miles away could turn a sentence into a card count and be paid for it, the Ring stopped being a local custom and became an institution with an import trade.\n\nThe Chamber took its present shape when the banner-masters lost a long argument with the bond-holders about who owned a fighter between cards. The answer was the contract, not the banner, and the vote was reweighted to match. The Rendering Book was begun as a public health measure after a bad summer and has been kept unbroken since, which means the city has an exact count of its own dead going back longer than most cities have had a census.',

      devNotes:
        "CANON: the Arena City is an arena city, with a tiered stone bowl, blood channels and banner streets, the Sunken Ring as its central landmark, and a dust red, sun-bleached stone and brass palette. The name is a working title. The design rule this entry follows is that the arena must be an institution rather than a set piece: it has a legal function (conversion and discharge), an economy (bond broking, gate, rendering) and a body count that is written down. The 214 card days, the 611 entries and the eleven conversion treaties are the numbers everything else should be checked against. Handle the rendering and the trafficking with consequence and paperwork, never with relish.",
      openQuestions: [
        'What is the published conversion rate, and who set it? A single number governs eleven jurisdictions.',
        'Could the Chamber actually call the Red Writ\'s contracts, or is the city already occupied and unaware of it?',
        'What happens to a discharged fighter who wants to leave? Nowhere else honours a quitblade.',
        'Do the drover clans know what is in their wells, and what would it take to make them act on it?',
        'Is there anyone in the city who thinks the Ring is wrong, and what does that position cost them?',
      ],
    },
  }),

  E({
    id: 'district.arena-city-banner-streets',
    type: 'district',
    name: 'The Banner Streets',
    status: 'draft',
    summary: 'Thirty-one company frontages on the eastern approach, plus every betting post in the city.',
    tags: ['commercial', 'crowd'],
    fields: {
      overview:
        'The wedge between the eastern spokes, where each of the thirty-one banner companies keeps a street frontage: a painted face, a training yard behind it, a stable, and a bench where contracts are read aloud before signing because a great many fighters cannot read them.',
      city: [CITY.arenaCity],
      districtType: 'Companies, betting and crowd trade',
      wealth: 'Prosperous on card days, empty otherwise',
      atmosphere:
        'Extremely loud, entirely commercial, and organised around a crowd that arrives in an hour and leaves in twenty minutes. Between cards it is a street of shuttered fronts and men repainting render.',
      architecture:
        'Dust red render laid on annually over rubble limestone and allowed to fade for the rest of the year, so the depth of colour on a frontage tells you how the company\'s season is going. Brass everywhere: numbers, odds boards, door furniture, tally plates.',
      whoLivesHere: 'Banner households, trainers, bookmakers, cordial-sellers, and fighters between cards',
      danger: 'Low, aggressively policed on card days, and quite different at night',
      playNotes:
        '[[npc.berke-chagra|Berke Chagra]] works out of a betting post here and holds paper on half the fighters and most of the stewards. His method leaves no evidence on the sand because it happens two days earlier at a water butt, so any investigation has to go at the water-steward\'s tally instead. This is also the district where a party is offered a [[mechanic.ring-bond|bond]], usually kindly, usually by someone who genuinely likes them.',
      devNotes: 'The friendly face of the institution. Everything predatory here is polite, and that is the point.',
    },
  }),

  E({
    id: 'district.arena-city-the-under-stands',
    type: 'district',
    name: 'The Under-Stands',
    status: 'draft',
    summary: 'Three floors beneath the sand: pens, cages, the contract vault, and something breeding in the sumps.',
    tags: ['underground', 'dangerous', 'dark'],
    fields: {
      overview:
        'A separate settlement under the bowl. The first floor is pens and holding cells for fighters on the card. The second is the under-stables and cage runs. The third is vaults: contracts, seals, the Rendering Book and the manumission [[npc.aylun-torgai|Aylun Torgai]] has been trying to reach for two years.',
      city: [CITY.arenaCity],
      districtType: 'Pens, stables and vaults',
      wealth: 'None. Nothing down here is owned by anyone who is down here.',
      atmosphere:
        'Warm, close, and never quiet: animals, drains, and the crowd overhead as a physical pressure through the stone. Lamps every forty paces, on the retorts\' own bone oil, which has a smell people stop noticing in about a week.',
      architecture:
        'Ashlar vaulting under the tiers, crudely partitioned in brick and timber as the city has needed more room. The blood channels run through it and the collapsed four have been walled off rather than repaired, which has produced dead volumes nobody has a plan of.',
      whoLivesHere: 'Bonded fighters awaiting cards, beast-keepers, vault clerks, and the people who clean the channels',
      danger: 'Severe. Gates, animals, stewards, and the parts nobody has surveyed.',
      playNotes:
        'Three jobs share one map. The vault heist for Aylun Torgai\'s original manumission, which is a document rather than treasure and changes her legal status the day it surfaces. [[npc.sukhet-daral|Sukhet Daral]]\'s breeding problem in the walled-off channels, which he wants dealt with before the next flooded card and will pay for in cage keys and tunnel access. And the pens themselves, which are the only place a party can talk to nineteen hundred people who all have the same grievance.',
      devNotes:
        'Written as a dungeon that is also an administrative building. The collapsed channels are the excuse for unmapped space in an otherwise fully documented city.',
    },
  }),

  E({
    id: 'district.arena-city-the-rendering',
    type: 'district',
    name: 'The Rendering',
    status: 'draft',
    summary: 'The claim house, the wall of names and the retorts. Nine days to pay, then the kilns.',
    tags: ['industrial', 'dark'],
    fields: {
      overview:
        'Downwind, downhill and downstream, which is the only civic planning decision this city has ever got right. The claim house takes the bodies off the sand, posts the names on [[landmark.the-claim-wall|the Claim Wall]] for nine days, takes the recovery fee from anyone who comes, and sends the rest to [[machine.the-char-retorts|the retorts]].',
      city: [CITY.arenaCity],
      districtType: 'Rendering works and mortuary',
      wealth: 'Poor, steady, and never short of work',
      atmosphere:
        'Quiet in a way no other part of the city is. The retort men are unsentimental and precise, and they are the only people in the Arena City who will tell a stranger the real numbers without being asked twice.',
      architecture:
        'Sealed brick kilns half-sunk into the slope, a flue line, cooling sheds, and the claim house itself: a single long room with a counter, a fee board and the wall outside it.',
      whoLivesHere: 'Retort crews, claim clerks, ash carters, and the families who wait out the nine days',
      danger: 'Low, unless you interfere with the ledger',
      playNotes:
        'The claim ledger is the most useful document in the city for anyone investigating anything: it records who died, on whose card, and who paid to take them home. It also records who did not. A party can pay a fee to recover someone, which is a real and expensive choice, or read the book, which is free and makes enemies. The char shipment east is a standing cargo run and the simplest way to move something, or someone, out of the city without a manifest entry.',
      devNotes:
        'The consequence end of the arena, deliberately given a counter, a fee board and a nine-day clock so that the horror is administrative rather than lurid.',
    },
  }),

  E({
    id: 'district.arena-city-writ-court',
    type: 'district',
    name: 'Writ Court',
    status: 'draft',
    summary: 'Where the paper is made: the Chamber hall, the bond registry, and the Red Writ reading room.',
    tags: ['law', 'government', 'trade'],
    fields: {
      overview:
        'The northern wedge, and the only district in the city where nobody shouts. The Chamber hall sits at the head of it, the bond registry beside it, and [[faction.red-writ|the Red Writ]]\'s reading room opposite, which is where mercenary and fight contracts across the continent are actually brokered.',
      city: [CITY.arenaCity],
      districtType: 'Registry, chamber and brokerage',
      wealth: 'Rich, and dressed to be underestimated',
      atmosphere:
        'Cool, paper-smelling and busy at hours that have nothing to do with the card. Argument here is conducted in figures. The public gallery in the Chamber hall is genuinely public and almost always empty.',
      architecture:
        'Ashlar rather than rubble, colonnaded, with brass letter-boards outside each office listing who holds what. The registry vault is the only building in the district with no windows on any face.',
      whoLivesHere: 'Chamber houses, bond factors, notaries, and the Writ\'s clerks',
      danger: 'Low physically, catastrophic contractually',
      playNotes:
        'Bonds are written, priced, transferred and called in here. A party can buy someone\'s paper, which is the cleanest way to free a person and also makes them the owner, with everything that implies. The registry holds the transfer record for every contract in the city, which is how you find out that the paper you signed with a banner-master is now held by someone else. Any attempt to count the Red Writ\'s unexpired contracts starts and probably ends in this district.',
      devNotes:
        'The city\'s actual seat of power, sited three streets from the bowl so the spectacle stays visible and the decisions do not.',
    },
  }),

  E({
    id: 'district.arena-city-scute-yards',
    type: 'district',
    name: 'The Scute Yards',
    status: 'draft',
    summary: 'Boiling vats, presses and the ring forge. Cheap armour, notched blades, and the striking of quitblades.',
    tags: ['craft', 'armoury'],
    fields: {
      overview:
        'The western wedge, given over to boiling, pressing and laminating [[material.steppe-scute|steppe scute]] into harness the Ring can afford to lose, and to the ring forge, which notches [[item.tallyblade|tallyblades]] and strikes [[item.quitblade|quitblades]] for the small number of people who reach one.',
      city: [CITY.arenaCity],
      districtType: 'Armouring and forge work',
      wealth: 'Modest, seasonal, and dependent on the moult',
      atmosphere:
        'Steam, hot glue and the smell of boiling carapace, which is worse than it sounds. The yards are frantic for six weeks after the moult and half-idle for the rest of the year, so the armourers keep second trades.',
      architecture:
        'Open-sided sheds over sunken vats, screw presses under tile roofs, and the ring forge at the inner end: a small, old, sooty building with a queue outside it on discharge days and nobody near it otherwise.',
      whoLivesHere: 'Armourer households, moult-field crews in season, and the ring-clerks who do the notching',
      danger: 'Moderate. Scalding, presses, and the forge queue on a bad day.',
      playNotes:
        'Kit is cheap and honest here: scute stops one good hit and everyone says so. The interesting work is the forge. A quitblade may only be struck on production of a discharge, so forging one is both a capital crime and the most direct way to get somebody out of the city. The ring-clerks who notch tallyblades keep the notch counts, which means the yards hold a parallel record of every sanctioned kill in the Ring, and it does not always agree with the Rendering Book.',
      devNotes:
        'Two ledgers that disagree, in a city obsessed with counting. The discrepancy is a hook waiting for whoever wants it.',
    },
  }),

  E({
    id: 'district.arena-city-drovers-camp',
    type: 'district',
    name: 'The Drovers\' Camp',
    status: 'draft',
    summary: 'Herds, wells and tents sprawling east past the wall. The oldest population, and the only one that can leave.',
    tags: ['pastoral', 'outsider'],
    fields: {
      overview:
        'Not a district so much as a permanent arrival: clan camps, stock pens, milk sheds and the Ash Fork wells, spread over more ground than the walled city and moving a little every season. The drovers were here before the Ring and treat it as a customer that has become difficult.',
      city: [CITY.arenaCity],
      districtType: 'Pastoral camp and wells',
      wealth: 'Poor in coin, rich in animals',
      atmosphere:
        'Open, windy, and organised by kinship rather than by street. Nothing is locked and nothing is unwatched. On card days the camp empties toward the bowl and the herds are left with children and dogs.',
      architecture:
        'Felt and hide over bent frames, stone-founded milk sheds, and stock pens of piled thorn. The only permanent stone is the wellhead housing, which the clans built themselves and maintain jointly.',
      whoLivesHere: 'Four drover clans, moult-field crews, horse-copers, and everybody the city has priced out',
      danger: 'Low for guests, high for anyone caught near the herds at night',
      playNotes:
        'The wells are here, and so is the problem: the blood-channel sump drains toward the same gravels. Proving it is an investigation with a genuinely dangerous conclusion, because the clans can shut the city\'s meat and milk supply in a day and have said so. [[food.steppe-sour|Steppe sour]], remounts and moult-season work are all hired here, and this is the one part of the Arena City where a party can be sheltered from a contract rather than sold one.',
      devNotes:
        'The counterweight to the Ring: an older, unimpressed population with real leverage and no seat in the Chamber.',
    },
  }),

  E({
    id: 'landmark.the-sunken-ring',
    type: 'landmark',
    name: 'The Sunken Ring',
    status: 'draft',
    summary: 'A tiered stone bowl seating twelve thousand, over eight blood channels and three floors of vaults.',
    tags: ['landmark', 'arena', 'law'],
    fields: {
      overview:
        'Forty feet down into a natural depression, with a sand floor a hundred and ten paces across and cut ashlar tiers rising all the way round. It is a courthouse with an audience: bonds are discharged here, sentences are served here, and civil suits with the Chamber\'s leave are settled here by champions.',
      city: [CITY.arenaCity],
      landmarkType: 'Arena, court and clearing house',
      built: 'Cut from an existing kraal depression; the ashlar tiers were added in four campaigns',
      appearance:
        'Sun-bleached stone stepped down to dust red sand, banded with brass at the steward lines so the tiers can be read from the floor. Eight channel mouths open at the sand line, four of them dry and grated over. The Chamber box faces the western gate and is the only shaded seating in the bowl.',
      function:
        'Discharge. Every card is a schedule of obligations being worked off in public, recorded by the ring-clerks in notches and by the stewards in the Rendering Book. The crowd is not the purpose; the crowd is the funding.',
      access:
        'Six gates by brass token. The floor is reached from the pens below, and the vaults below that are reached only from the pens, which is a security arrangement that also means every route to the contracts runs through the people the contracts are written on.',
      devNotes:
        "CANON: the Sunken Ring is the Arena City's central landmark, a tiered stone bowl with blood channels. Its dimensions, the eight channels and the judicial function are proposals, built to make the arena an institution rather than a set piece.",
    },
  }),

  E({
    id: 'landmark.the-blood-channels',
    type: 'landmark',
    name: 'The Blood Channels',
    status: 'draft',
    summary: 'Eight cut stone runs under the sand, four still flowing, draining toward the wells the drovers use.',
    tags: ['landmark', 'infrastructure', 'hazard'],
    fields: {
      overview:
        'The oldest engineering in the city and the best. Eight radial channels cut under the sand floor, falling south-west under the tiers to a sump beyond the wall. They were built to keep a card running in wet weather and they have outlasted three constitutions.',
      city: [CITY.arenaCity],
      landmarkType: 'Drainage works',
      built: 'Cut with the first ashlar tiers; never substantially rebuilt',
      appearance:
        'Grated mouths at the sand line, then dressed stone runs about four feet high, worn smooth and stained a colour that no longer washes out. The four dead channels have been bricked at the mouth and are open at the far end, which nobody has written down.',
      function:
        'Officially, to flush the floor. Practically, to move about two thousand gallons a card day into a sump whose outflow reaches the Ash Fork gravels, which is where [[district.arena-city-drovers-camp|the drovers]] water their herds. The connection has been formally denied twice and measured never.',
      access:
        'Through the grates on the floor, which is impossible during a card and trivial after one, or through the walled-off sections under [[district.arena-city-the-under-stands|the Under-Stands]], where [[npc.sukhet-daral|Sukhet Daral]]\'s escaped stock has been breeding.',
      devNotes:
        'One piece of infrastructure doing three jobs: a public health scandal, an unmapped dungeon and the drovers\' political lever. Canon gives the city blood channels; the drainage geography is a proposal.',
    },
  }),

  E({
    id: 'landmark.the-claim-wall',
    type: 'landmark',
    name: 'The Claim Wall',
    status: 'draft',
    summary: 'The names of the unclaimed dead, chalked for nine days. After that the retorts, and the char goes east.',
    tags: ['landmark', 'dark', 'record'],
    fields: {
      overview:
        'A rendered wall forty paces long outside the claim house, ruled into nine columns, one for each day a body may be claimed. Names are chalked in the first column on the morning after a card and moved one column right each dawn. What falls off the end goes to [[machine.the-char-retorts|the retorts]].',
      city: [CITY.arenaCity],
      landmarkType: 'Public record and mortuary notice',
      built: 'Rendered and ruled after a summer when three families claimed the same body',
      appearance:
        'Whitewash over rubble, ruled in charcoal lines, chalked in a clerk\'s hand that is legible from across the street. The ninth column is repainted every evening. The fee board hangs at the near end and the fee is not adjusted for anything.',
      function:
        'To give the fee a deadline. The city\'s position is that this is a courtesy. Its effect is that grief has a price and a clock, and both are posted where the crowd walks past them on the way to the next card.',
      access: 'Open street, day and night. Chalking a name yourself is a stewards\' matter and happens anyway.',
      devNotes:
        'The single image the Arena City should be remembered by. Play it flat: a wall, a clerk, a fee board, nine columns. No commentary needed from anybody.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* Orath                                                             */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.orath,
    type: 'city',
    name: 'Orath',
    status: 'draft',
    summary: 'A hard frontier town on the Cinder Waste margin. The name is canon; everything below it is a proposal.',
    tags: ['frontier', 'desert', 'proposal', 'tbd'],
    fields: {
      epithet: TBD('What do the caravan families call Orath when they are not being polite about it?'),
      overview:
        "Orath is a name on the brief and nothing else. What follows is a proposal, kept deliberately thin so that whoever settles this city is not fighting somebody else's invention.\n\nThe proposal: a hard frontier town strung along one road on the margin of [[region.cinder-waste|the Cinder Waste]], at the point where the waste stops being crossable without help. Water, powder and shot are posted daily on a board, and anyone who draws more than their line owes the muster labour they cannot refuse. That is [[mechanic.the-ration-board|the Ration Board]], and it is the only mechanism this entry commits to.\n\nTwo things are already true elsewhere in the world and are honoured here. [[npc.kavel-uur|Kavel Uur]] runs the only fixed caravan schedule across the waste margin out of this town, and keeps a private count of who goes into the waste and who comes out. And guild law does not reach Orath, which is the premise of [[quest.written-off|Written Off]]. Both are useful. Neither requires a history.",
      founded: TBD('When was Orath founded, and by whom: a garrison, a mining concern, or people who needed to be somewhere nobody had jurisdiction?'),
      settlementType: 'Frontier town on a desert margin',

      region: [REGION.cinderWaste],
      biome: 'Cinder and scrub on a desert margin',
      terrain:
        'The last ground that will hold a foundation. West and south of the town the cinder flats begin and do not stop; north the scrub thickens enough to graze. The town is linear because the road is the only thing here worth being next to.',
      climate: 'Hot, dry, and violently cold at night. Dust storms out of the waste close the road several times a season.',
      approach:
        'From the east you see the tank yard first, because it is walled and everything else is not. From the waste you see nothing until you are close, and by then you have already been counted.',

      cityMapNote:
        'One road, thickening at the walled head and fraying into the waste. The town has no centre in the usual sense: it has an upstream end where the water is kept and a downstream end where people wait to leave. Distance along the road is the whole social geography.',
      districtCount: '4 mapped, thinly',
      cityMap: ORATH_MAP,

      architecture:
        'Proposed: cinder block and rammed earth, low, flat-roofed, with shutters on every opening because of the dust. Nothing decorative and nothing tall. The only rendered walls in the town are on the tank yard, and they are rendered so that cracks show.',
      silhouette: 'A single low line along a road, walled at one end, dissolving into tents at the other.',
      palette: ['#6e4a35', '#c08a52', '#ded2bc', '#2a2320'],
      buildMaterials: TBD('What is Orath actually built out of, and where does the timber for roof beams come from in a place with no trees?'),

      landmarkName: 'The Ration Board',
      landmarkDesc:
        'Proposed. A public board at the muster square where the day\'s water, powder and shot are posted before dawn. See [[landmark.the-ration-board|the Ration Board]]. Whether the town has a genuine landmark beyond this, and what it might be, is open.',

      energy: TBD('What does Orath burn? There is no wood, and hauling fuel across the waste costs more than the fuel.'),
      infrastructure:
        'Proposed: tanks, and the road. The tank yard holds the town\'s water in sunken cisterns behind a wall, and the road is maintained as far as the last building and not one pace further.',
      keyMachines: TBD('Does Orath make anything, or only move it? A single machine entry would settle the town\'s character in one stroke.'),

      transport:
        '[[npc.kavel-uur|Kavel Uur]]\'s caravans, and nothing else on a schedule. Everything that crosses the waste margin either travels with the caravan or gambles.',
      traversal: TBD('How far into the Cinder Waste can a party get from Orath without a guide, and what is the honest failure state?'),

      government: TBD('Who posts the board? A council, a company, a garrison commander, or one family nobody has voted for?'),
      politicalLeaning: TBD('Is Orath governed at all, or merely supplied?'),
      ruler: TBD('Is there a seat of power in Orath, or is the board the closest thing to one?'),
      succession: TBD('If the board has an owner, how does it change hands?'),

      laws:
        'Proposed, and minimal: the only offence the town is known to prosecute is overdrawing the board without working it off. Guild writs are not honoured here, which is the one legal fact the wider world already relies on.',
      enforcement: TBD('Who enforces the muster, and what happens to someone who simply refuses it?'),
      extradition:
        'None. Guild law does not reach Orath, which is why [[quest.written-off|a runaway factor with guild paper]] is here at all. Whether that is a treaty position, a practical fact or a boast is undecided.',
      notableCrimes: [
        'Overdrawing the board.',
        'Refusing the muster owed against an overdraw.',
        TBD('What else is a crime here? The list should be short and should say something about who runs the town.'),
      ],

      socialClasses: TBD('Does Orath have classes, or only creditors and debtors of the board?'),
      population: TBD('How many people, and how many of them are simply waiting to leave?'),
      demographics: TBD('Who lives in Orath: caravan kin, discharged soldiers, people the other cities have finished with, or something not yet imagined?'),
      languages: ['Drover Orathi, which the Sifting City knows as the language of the water road', 'Trade cant'],
      cultures: TBD('Does anyone here keep a faith, and does the waste feature in it?'),

      food:
        'Proposed: whatever the caravans carry, plus [[food.dew-melon|dew melons]] off condensation nets, which pass as currency across the waste as readily as they pass as food.',
      water: 'Posted daily on the board. Beyond that, this entry does not commit to where it comes from.',
      staples: ['food.dew-melon'],

      economy: TBD('What does Orath sell? Passage is the obvious answer and it may be too obvious.'),
      mainProduction: 'Passage, water and muster labour',
      currency: TBD('Does Ascent paper mean anything here, given that guild law does not?'),
      wealth: TBD('Is Orath poor because the waste gives nothing, or quietly rich because everything crossing the waste pays it?'),

      exports: TBD('Does anything come out of Orath that did not go in?'),
      imports: ['food.dew-melon', 'material.pan-nitre'],
      tradeNotes:
        'The one certain trade relationship is eastward: Orath\'s caravans carry the water that keeps [[city.sifting-city|the Sifting City]] working, and the Pans have roughly a hundred days of cistern if the road stops. That dependency is the most useful thing about this town and should survive whatever else gets rewritten.',

      localResources: TBD('Is there a reason for a town to exist on this exact spot beyond the road, and if so, what is under it?'),
      resourceNotes: TBD('Cinderroot grows in the Cinder Waste and ends up in the Arena City by the cup. Does Orath cut it, or only carry it?'),

      defense: 'Proposed: a walled tank yard and a muster. The town is not defensible and does not appear to be trying to be.',
      doctrine: TBD('Is the muster a militia, a labour gang, or both, and who decides which it is on a given day?'),
      garrison: 'A muster, not a garrison',

      factionNotes:
        '[[faction.low-tally|The Low Tally]] plainly has an interest in a town where guild law does not reach and a caravan schedule crosses the waste, and [[faction.red-writ|the Red Writ]] recruits on the caravan ground because the frontier does not check what anyone signed. Neither has been given a foothold here on purpose. Whoever writes Orath properly should decide who actually runs it before anyone else does.',

      currentConflict: TBD('What is Orath mustering against? The board implies a threat and the brief does not name one.'),
      problems: [
        'The water road east is a single point of failure for two cities and has no alternative.',
        'Guild law does not reach here, which attracts exactly the people you would expect.',
        TBD('What is the town\'s own crisis, as opposed to everyone else\'s crisis arriving here?'),
      ],

      cityRelations: [
        row({
          city: 'The Sifting City',
          stance: 'Supplier, and knows it',
          note: 'Orath\'s caravans are the Pans\' water road. Stopping them is the single largest lever any frontier town holds over any city.',
        }),
        row({
          city: 'The Arena City',
          stance: 'Recruiting ground',
          note: 'Banner scouts work the caravan ground. What they promise here is not what the contract says there.',
        }),
        row({
          city: 'The Gilded Ascent',
          stance: 'Out of reach',
          note: 'Guild writs are not honoured, which is why the Assize sends people rather than paper.',
        }),
      ],

      signatureMechanic: 'The Ration Board',
      mechanicNotes:
        '[[mechanic.the-ration-board|The Ration Board]] is the only system this entry commits to. Water, powder and shot are posted each morning against names; draw your line and you owe nothing, draw over it and you owe the muster days you cannot refuse. It plays as a resource loop with a labour debt instead of a price, and it turns every supply decision into a scheduling decision. Keep it thin. The interesting questions, who posts the board and what the muster is for, are deliberately unanswered.',

      npcNotes:
        '[[npc.kavel-uur|Kavel Uur]] is the fixed point: the only reliable schedule across the waste, a private count of who went in and who came out, and a standing offer to take anyone who replaces the hand he lost last run. What Orath pays him to carry is an open question and should stay one until someone decides what Orath is.',
      questNotes:
        '[[quest.written-off|Written Off]] starts here, and starts here for a structural reason: the Brass Assize cannot reach a man in Orath with paper, so it sends instruments instead. The town works best as a place where other cities\' problems arrive already out of jurisdiction. Anything a designer adds should preserve that, because it is the only function the brief actually implies.',

      services: [
        row({ name: 'Caravan passage', where: 'Caravan Ground', note: 'Kavel Uur\'s schedule. He will take anyone who replaces the hand he lost last run.' }),
        row({ name: 'Board draw', where: 'The Board', note: 'Water, powder and shot against your name. Over your line is muster days, not coin.' }),
        row({
          name: 'Unwritten',
          where: 'Unwritten',
          note: 'Orath should have a third service, and what it is will tell a player what kind of town this is. Left open on purpose.',
        }),
      ],

      creatureNotes:
        '[[creature.sandsleeper|Sandsleepers]] aestivate under the cinder flats for years and come up in one brood when the rains reach this far, which is a season of meat for whoever is standing there and a field of collapsing burrows for whoever tries to drive a cart across it afterwards.',

      history: TBD('Orath has no history yet, and should not be given one casually. What happened here that made a town worth walling one end of?'),

      devNotes: PROPOSAL(
        'CANON: only the name Orath and its siting on the Cinder Waste margin. This entry proposes a hard frontier town on one road, with the Ration Board as its mechanic, deliberately kept lighter than its neighbours and TBD-heavy so that a designer can settle it without demolition. The two dependencies worth preserving in any rewrite are the water road east to the Sifting City and the absence of guild jurisdiction, because other modules already lean on both.',
      ),
      openQuestions: [
        'Who posts the ration board, and what is the muster actually for?',
        'What does Orath sell that is not simply passage?',
        'Why here? A road is a reason for a waystation, not for a walled town.',
        'Is the town old or recent? The answer changes every other field on this page.',
        'What does Kavel Uur carry for Orath, and does he know?',
      ],
    },
  }),

  E({
    id: 'district.orath-the-tank-yard',
    type: 'district',
    name: 'The Tank Yard',
    status: 'draft',
    summary: 'The walled head of the road: sunken cisterns, a gate, and the only rendered walls in the town.',
    tags: ['infrastructure', 'water', 'proposal'],
    fields: {
      overview:
        'Proposed. The upstream end of Orath, and the only part of it behind a wall. Sunken cisterns, a pump house, the gate onto the eastern road, and [[landmark.the-last-well|the Last Well]]. Whoever holds this yard holds the town, which is presumably why it is the one thing here built properly.',
      city: [CITY.orath],
      districtType: 'Water works and gate',
      wealth: 'The town\'s only capital',
      atmosphere: 'Cooler than anywhere else, and watched. Traffic through the gate is counted rather than searched.',
      architecture: 'Rendered cinder block over rammed earth, slabbed cistern roofs, and a gate heavy enough to look like a statement.',
      whoLivesHere: TBD('Who lives inside the wall, and is that a job, a class, or a family?'),
      danger: 'Low, and entirely dependent on who is on the gate that week',
      playNotes:
        'Water is issued from here against the board. A party arriving off the waste comes to this gate first and is counted before it is welcomed. Any plot that turns on Orath turns on this yard.',
      devNotes: PROPOSAL('Gives the town one defensible asset and one obvious prize, without deciding who currently holds it.'),
    },
  }),

  E({
    id: 'district.orath-the-board',
    type: 'district',
    name: 'The Board',
    status: 'draft',
    summary: 'The muster square, named for the thing posted in it before dawn every day.',
    tags: ['civic', 'proposal'],
    fields: {
      overview:
        'Proposed. A hard-packed square halfway along the road with [[landmark.the-ration-board|the board]] at its head, a bell, and the benches where the muster forms. It is the closest thing Orath has to a civic centre and it is functionally a queue.',
      city: [CITY.orath],
      districtType: 'Muster square and issue point',
      wealth: 'Modest',
      atmosphere: 'Empty for twenty hours a day and packed for the other four. People read the board in silence and argue about it afterwards, elsewhere.',
      architecture: 'Flat-roofed blocks facing a square with no shade in it, which residents mention constantly and nobody has fixed.',
      whoLivesHere: 'Clerks, the muster foremen, and whoever is working off a draw this week',
      danger: 'Low, except in the hour after a short posting',
      playNotes:
        'This is where [[mechanic.the-ration-board|the Ration Board]] is played: read the posting, take your line, decide whether to overdraw. Muster days are worked from here, and the work is where a party finds out what the town is actually for.',
      devNotes: PROPOSAL('The mechanic given a physical address, and nothing more than that on purpose.'),
    },
  }),

  E({
    id: 'district.orath-caravan-ground',
    type: 'district',
    name: 'The Caravan Ground',
    status: 'draft',
    summary: 'Open ground where the waste crossings form up. The only fixed schedule on the margin leaves from here.',
    tags: ['trade', 'transit', 'proposal'],
    fields: {
      overview:
        'Proposed. Pens, water troughs, cart lines and a chalked departure board. [[npc.kavel-uur|Kavel Uur]] keeps his yard at the western end and his count in his coat, and everything crossing the waste margin forms up here or does not form up at all.',
      city: [CITY.orath],
      districtType: 'Caravan yard',
      wealth: 'Whatever is passing through this week',
      atmosphere: 'Animals, dust, and the specific quiet of people about to do something dangerous for money.',
      architecture: 'Open ground and pole-and-hide shelter. The only permanent building is the water trough house.',
      whoLivesHere: 'Caravan kin, hired hands, and recruiters from cities that do not check what they promise',
      danger: 'Moderate. Departure day is when people disappear.',
      playNotes:
        'Hire on, or hire the caravan. Kavel Uur\'s private count of who entered the waste and who came out is a research document worth a great deal to several parties, and he is not sentimental about who reads it if the price is right. Arena City banner scouts work this ground.',
      devNotes: PROPOSAL('The town\'s function to the rest of the world, sited so that a party can use Orath without needing it explained.'),
    },
  }),

  E({
    id: 'district.orath-the-outward-row',
    type: 'district',
    name: 'The Outward Row',
    status: 'draft',
    summary: 'The last built street before the waste, and the tents past the end of it.',
    tags: ['poor', 'frontier', 'proposal'],
    fields: {
      overview:
        'Proposed. Where the road stops being maintained. A row of half-built and half-abandoned blocks, then tents, then nothing. People who cannot draw on the board live out here, which is a category the town has never had to define because the waste defines it for them.',
      city: [CITY.orath],
      districtType: 'Fringe settlement',
      wealth: 'Destitute',
      atmosphere: 'Dust, wind, and a view of the flats that nobody chose.',
      architecture: 'Unrendered block with the roofs never finished, then hide and pole, then stakes marking where somebody intended to build.',
      whoLivesHere: TBD('Who ends up on the Outward Row, and are they arriving or failing to leave?'),
      danger: 'High at night, and higher in a storm',
      playNotes:
        'The place to find someone who does not want to be found, including [[quest.written-off|the runaway factor the Brass Assize wants settled]]. Nobody out here is on the board, which means nobody out here is counted, which means nobody out here is missed.',
      devNotes: PROPOSAL('One district that states the cost of the ration board without arguing about it.'),
    },
  }),

  E({
    id: 'landmark.the-ration-board',
    type: 'landmark',
    name: 'The Ration Board',
    status: 'draft',
    summary: 'A public board posted before dawn: water, powder and shot against names. Proposed central landmark.',
    tags: ['landmark', 'civic', 'proposal'],
    fields: {
      overview:
        'Proposed. A board under a shallow roof at the head of the muster square, ruled into three columns and posted before first light by a clerk who does not answer questions about it. It is the only object in Orath that everyone in the town looks at every day.',
      city: [CITY.orath],
      landmarkType: 'Public notice board',
      built: TBD('Was the board put up by the town, or by whoever supplies it?'),
      appearance:
        'Planed board, painted black, chalked in three columns and wiped each dawn. A bell on a post beside it. The roof over it is the only shade in the square and is too small on purpose.',
      function:
        'To ration and to obligate in one act. Names against quantities, and a fourth line at the bottom listing the muster days owed by anyone over their draw. See [[mechanic.the-ration-board|the mechanic]].',
      access: 'Open square. Reading it is free. Arguing with it is the muster foreman\'s business.',
      devNotes: PROPOSAL(
        'Orath has no canon landmark, so this proposes the mechanic itself as the landmark: a board rather than a monument, which suits a town that may not be old enough to have built anything worth looking at.',
      ),
    },
  }),

  E({
    id: 'landmark.the-last-well',
    type: 'landmark',
    name: 'The Last Well',
    status: 'draft',
    summary: 'The well inside the tank yard wall. Named for its position on the road, not for its depth.',
    tags: ['landmark', 'water', 'proposal', 'tbd'],
    fields: {
      overview:
        'Proposed, and thin on purpose. A well inside the tank yard, called the Last Well because west of it there is no other. Whether it is the reason the town exists, or merely the reason the town has a wall, is undecided.',
      city: [CITY.orath],
      landmarkType: 'Well',
      built: TBD('Was the well dug or found, and how old is it compared with the town?'),
      appearance: 'A stone collar, a windlass, a slabbed apron, and a queue.',
      function: TBD('Does the Last Well actually supply Orath, or only top up what the caravans bring?'),
      access: 'Inside the tank yard wall, behind the gate, issued against the board like everything else.',
      devNotes: PROPOSAL(
        'Deliberately unresolved. If a designer decides Orath sits on real water, this becomes the reason for the town; if not, it becomes a small and rather sad thing the town is named around.',
      ),
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* --- The Sifting City ------------------------------------------- */
  R(CITY.siftingCity, 'located_in', REGION.whitePans, 'on the eastern lip, where the drift faces begin'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-the-tower-line'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-the-water-court'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-assay-row'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-the-crucible-sheds'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-the-lee'),
  R(CITY.siftingCity, 'contains', 'district.sifting-city-the-outbound-yard'),
  R(CITY.siftingCity, 'contains', 'landmark.the-great-sieve'),
  R(CITY.siftingCity, 'contains', 'landmark.the-third-bore'),
  R(CITY.siftingCity, 'contains', 'landmark.the-cut-house'),
  R('faction.pale-assay', 'controls', CITY.siftingCity, 'the grade stamp is the government'),
  R('faction.pale-assay', 'controls', 'landmark.the-cut-house', 'six punches in a bolted rack'),
  R('faction.bondwrights-hall', 'located_in', 'district.sifting-city-assay-row', 'strongroom branch on the Row'),
  R('faction.low-tally', 'smuggles_with', CITY.siftingCity, 'unsealed nitre and ungraded button out on drover carts', true),
  R('faction.concord-of-weights', 'trades_with', CITY.siftingCity, 'financed the bore programme against forward crust'),
  R(CITY.siftingCity, 'owes_debt_to', CITY.gildedAscent, 'the bores were sunk on Ascent paper and the terms still run'),
  R('npc.tazrit-nourem', 'controls', 'district.sifting-city-the-tower-line', 'the third, fifth and sixth towers'),
  R('npc.sahat-belek', 'located_in', 'district.sifting-city-the-outbound-yard', 'hired from the yard, eight days out at a time'),
  R('npc.doret-halvane', 'related_to', 'district.sifting-city-assay-row', "her brother's indenture is in a strongroom here", true),
  R('machine.the-sieve-cascade', 'located_in', 'district.sifting-city-the-tower-line', 'nine screens to a tower'),
  R('machine.the-bittern-ladder', 'located_in', CITY.siftingCity, 'the stepped pans south of the tower line'),
  R(CITY.siftingCity, 'controls', 'deposit.nitre-flats', 'raked, dried and graded under tower licence'),
  R(CITY.siftingCity, 'controls', 'deposit.blackfall-drifts', 'picked by hand off the faces by bonded crews'),
  R(CITY.siftingCity, 'produces', 'material.pan-nitre', 'six cuts, and the stamp is the price'),
  R(CITY.siftingCity, 'produces', 'material.blackfall-button', 'eleven days of shed fuel each'),
  R(CITY.siftingCity, 'produces', 'item.sift-screen', 'rated by count, burnt when condemned'),
  R(CITY.siftingCity, 'produces', 'item.assayers-tray'),
  R(CITY.siftingCity, 'produces', 'item.pale-dust', 'on no manifest anywhere', true),
  R(CITY.siftingCity, 'consumes', 'food.dew-melon', 'carried in off the water road'),
  R(CITY.siftingCity, 'consumes', 'material.blackbole-timber', 'every tower raft and every shutter'),
  R(CITY.siftingCity, 'consumes', 'food.sift-cake', 'issued to crews against their debt'),
  R(CITY.siftingCity, 'requires', 'skill.sieve-tuning', 'no tower books a shift without it'),
  R(CITY.siftingCity, 'related_to', 'mechanic.the-sift-line', 'signature mechanic'),
  R(CITY.siftingCity, 'related_to', 'creature.salt-mason', 'the city sifts where the colonies died'),
  R('item.indenture-bond', 'sold_by', CITY.siftingCity, 'the registry writes, prices and resells them for a fee'),
  R('spell.debt-mark', 'used_by', CITY.siftingCity, 'lawful here, and the named boundary is the pan edge'),
  R('quest.pan-fever', 'located_in', CITY.siftingCity),
  R('quest.pan-fever', 'involves', 'district.sifting-city-the-lee', 'four streets and a measurable gradient'),
  R(CITY.siftingCity, 'trades_with', CITY.mediterranean, 'the finest nitre, against glass and springs'),
  R(CITY.siftingCity, 'trades_with', CITY.arenaCity, 'bone char east, salt and scourglass west'),
  R(CITY.siftingCity, 'trades_with', CITY.orath, 'the water road; a hundred days of cistern without it'),

  /* --- The Arena City --------------------------------------------- */
  R(CITY.arenaCity, 'located_in', REGION.ashenSteppe, 'a natural depression above the Ash Fork gravels'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-banner-streets'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-the-under-stands'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-the-rendering'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-writ-court'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-scute-yards'),
  R(CITY.arenaCity, 'contains', 'district.arena-city-drovers-camp'),
  R(CITY.arenaCity, 'contains', 'landmark.the-sunken-ring'),
  R(CITY.arenaCity, 'contains', 'landmark.the-blood-channels'),
  R(CITY.arenaCity, 'contains', 'landmark.the-claim-wall'),
  R('faction.red-writ', 'controls', CITY.arenaCity, 'brokers every contract from the vaults under the sand'),
  R('faction.red-writ', 'located_in', 'district.arena-city-writ-court', 'the reading room'),
  R('faction.bondwrights-hall', 'located_in', 'district.arena-city-writ-court', 'the respectable half of the same trade'),
  R('faction.low-tally', 'smuggles_with', CITY.arenaCity, 'people laundered as crewed passage and bond transfers', true),
  R('faction.standing-hour', 'contests', CITY.arenaCity, 'three attempts to organise the pens, three failures'),
  R('faction.concord-of-weights', 'trades_with', CITY.arenaCity, 'Ascent houses buy Ring contracts forward as an asset'),
  R('npc.aylun-torgai', 'located_in', 'district.arena-city-the-under-stands', 'her voided manumission is three floors down'),
  R('npc.berke-chagra', 'located_in', 'district.arena-city-banner-streets', 'holds paper on half the fighters and most of the stewards'),
  R('npc.sukhet-daral', 'located_in', 'district.arena-city-the-under-stands', 'the under-stables, and the problem in the walled channels'),
  R('machine.the-char-retorts', 'located_in', 'district.arena-city-the-rendering', 'sealed kilns beneath the floor'),
  R(CITY.arenaCity, 'controls', 'deposit.moult-fields', 'a six-week season, and the armourers buy the whole take'),
  R(CITY.arenaCity, 'produces', 'material.steppe-scute', 'boiled, pressed and laminated in the Scute Yards'),
  R(CITY.arenaCity, 'produces', 'item.tallyblade', 'notched by the ring-clerks, one notch a sanctioned kill'),
  R(CITY.arenaCity, 'produces', 'item.quitblade', 'struck on production of a discharge, and forged more often than struck'),
  R(CITY.arenaCity, 'produces', 'item.indenture-bond', 'written, priced and transferred in Writ Court'),
  R(CITY.arenaCity, 'produces', 'item.cinderroot-cordial', 'poured by the cup and sold ringside'),
  R(CITY.arenaCity, 'consumes', 'material.blister-bar', 'the ring forge and every banner armoury'),
  R(CITY.arenaCity, 'consumes', 'food.steppe-sour', 'most of the calories the crowd takes in'),
  R(CITY.arenaCity, 'consumes', 'material.blackbole-timber', 'pens, presses and tier repairs'),
  R(CITY.arenaCity, 'requires', 'skill.ring-craft', 'read the card, work the stipulations, play to the tiers'),
  R(CITY.arenaCity, 'related_to', 'mechanic.ring-bond', 'signature mechanic'),
  R(CITY.arenaCity, 'related_to', 'spell.dead-ground', 'laid on a card only with the Chamber\'s leave'),
  R('creature.yokeback', 'inhabits', REGION.ashenSteppe, 'separated pairs are sold to the under-stables by the animal'),
  R('spell.yokebreak-draught', 'used_by', CITY.arenaCity, 'legal here and contraband everywhere else'),
  R('quest.the-indenture-column', 'located_in', CITY.arenaCity, 'the Chamber houses are the buyers'),
  R('quest.the-indenture-column', 'involves', 'district.arena-city-writ-court', 'the column is paperwork before it is people'),
  R(CITY.arenaCity, 'trades_with', CITY.siftingCity, 'bone char for the Bittern Ladder'),
  R(CITY.arenaCity, 'trades_with', CITY.gildedAscent, 'contracts bought forward on Ascent paper'),
  R(CITY.arenaCity, 'rival_of', CITY.mediterranean, 'no conversion treaty; Ring bonds are void at the harbour wall'),
  R(CITY.arenaCity, 'trades_with', CITY.orath, 'banner scouts recruit on the caravan ground'),

  /* --- Orath ------------------------------------------------------- */
  R(CITY.orath, 'located_in', REGION.cinderWaste, 'on the margin, where the waste stops being crossable unaided'),
  R(CITY.orath, 'contains', 'district.orath-the-tank-yard'),
  R(CITY.orath, 'contains', 'district.orath-the-board'),
  R(CITY.orath, 'contains', 'district.orath-caravan-ground'),
  R(CITY.orath, 'contains', 'district.orath-the-outward-row'),
  R(CITY.orath, 'contains', 'landmark.the-ration-board'),
  R(CITY.orath, 'contains', 'landmark.the-last-well'),
  R(CITY.orath, 'related_to', 'mechanic.the-ration-board', 'signature mechanic, and the only system this entry commits to'),
  R('npc.kavel-uur', 'located_in', 'district.orath-caravan-ground', 'the only fixed schedule across the waste margin'),
  R('quest.written-off', 'located_in', CITY.orath, 'guild law does not reach here, which is the premise'),
  R('quest.written-off', 'involves', 'district.orath-the-outward-row', 'nobody out here is on the board, so nobody out here is counted'),
  R(CITY.orath, 'trades_with', CITY.siftingCity, 'the water road east; the Pans have a hundred days without it'),
  R(CITY.orath, 'produces', 'food.dew-melon', 'grown on condensation nets and spent as currency'),
  R(CITY.orath, 'related_to', 'creature.sandsleeper', 'brood years are a season of meat and a field of collapsing burrows'),
  R(CITY.orath, 'related_to', 'item.cinderroot-cordial', 'the cinderroot crosses the waste; whether Orath cuts it is open'),
  R('faction.low-tally', 'smuggles_with', CITY.orath, 'a town with a schedule and no jurisdiction', true),
  R('faction.red-writ', 'located_in', 'district.orath-caravan-ground', 'recruiters who do not check what anyone signed'),
]
