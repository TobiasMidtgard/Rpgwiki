/**
 * Three settlements sited away from the trade spine: the militarised Tree City
 * in the Greatwood, the subterranean farms of the Hollow Karst, and the
 * licensed binding works of the Aetheric Scar.
 *
 * Canon anchors are the brief's one-line identities, the central landmarks and
 * the colour palettes. Everything else here is a proposal.
 */

import { E, R, TBD, row, type CityMap, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* City maps                                                           */
/* ------------------------------------------------------------------ */

/** Nodes on branches: fortified trunks joined by rope spans. */
const TREE_CITY_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.tree-city-crown-galleries',
      polygon: [
        [400, 60],
        [520, 45],
        [575, 95],
        [580, 175],
        [505, 235],
        [415, 220],
        [380, 140],
      ],
    },
    {
      id: 'district.tree-city-spanworks',
      polygon: [
        [120, 180],
        [210, 165],
        [272, 205],
        [275, 290],
        [200, 335],
        [125, 315],
        [105, 245],
      ],
    },
    {
      id: 'district.tree-city-ninth-gallery',
      polygon: [
        [700, 180],
        [790, 165],
        [858, 210],
        [860, 295],
        [790, 345],
        [705, 325],
        [682, 250],
      ],
    },
    {
      id: 'district.tree-city-pitch-yards',
      polygon: [
        [380, 485],
        [470, 460],
        [560, 490],
        [575, 570],
        [520, 650],
        [420, 660],
        [368, 590],
      ],
    },
    {
      id: 'district.tree-city-underroot',
      polygon: [
        [100, 455],
        [190, 435],
        [252, 480],
        [255, 565],
        [190, 610],
        [110, 595],
        [78, 520],
      ],
    },
    {
      id: 'district.tree-city-sixth-quarter',
      polygon: [
        [765, 460],
        [845, 448],
        [905, 490],
        [908, 565],
        [845, 605],
        [775, 592],
        [752, 520],
      ],
    },
  ],
  water: [
    [
      [0, 390],
      [180, 375],
      [400, 400],
      [640, 385],
      [1000, 410],
      [1000, 442],
      [620, 420],
      [380, 432],
      [170, 412],
      [0, 425],
    ],
  ],
  walls: [
    [60, 120],
    [300, 30],
    [620, 25],
    [900, 120],
    [965, 330],
    [930, 620],
    [600, 690],
    [220, 675],
    [45, 470],
  ],
  roads: [
    [
      [560, 175],
      [652, 208],
      [704, 240],
    ],
    [
      [392, 175],
      [300, 205],
      [268, 232],
    ],
    [
      [478, 235],
      [472, 358],
      [468, 462],
    ],
    [
      [795, 344],
      [812, 400],
      [822, 452],
    ],
    [
      [196, 334],
      [180, 400],
      [172, 438],
    ],
    [
      [372, 585],
      [300, 550],
      [256, 532],
    ],
    [
      [572, 545],
      [670, 520],
      [752, 512],
    ],
  ],
  landmarks: [
    { id: 'landmark.bastion-bole', at: [480, 140] },
    { id: 'landmark.the-black-span', at: [474, 352] },
    { id: 'landmark.the-ash-ring', at: [662, 640] },
  ],
}

/** Bedding-plane lenses stacked down through the rock, linked by shafts. */
const CAVE_CITY_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.cave-agrarian-city-mirror-quarter',
      polygon: [
        [35, 55],
        [120, 35],
        [172, 70],
        [176, 130],
        [120, 168],
        [48, 152],
        [28, 100],
      ],
    },
    {
      id: 'district.cave-agrarian-city-sunwell-terraces',
      polygon: [
        [205, 70],
        [420, 48],
        [660, 58],
        [820, 88],
        [812, 152],
        [600, 172],
        [380, 164],
        [212, 140],
      ],
    },
    {
      id: 'district.cave-agrarian-city-fourth-terrace',
      polygon: [
        [125, 215],
        [330, 196],
        [560, 208],
        [762, 232],
        [744, 296],
        [520, 306],
        [300, 292],
        [132, 274],
      ],
    },
    {
      id: 'district.cave-agrarian-city-flush-galleries',
      polygon: [
        [248, 344],
        [470, 328],
        [700, 336],
        [882, 366],
        [868, 428],
        [660, 438],
        [430, 430],
        [252, 408],
      ],
    },
    {
      id: 'district.cave-agrarian-city-sump-works',
      polygon: [
        [104, 472],
        [280, 456],
        [470, 470],
        [596, 500],
        [560, 558],
        [380, 566],
        [200, 552],
        [96, 522],
      ],
    },
    {
      id: 'district.cave-agrarian-city-deep-rota',
      polygon: [
        [648, 486],
        [800, 468],
        [936, 502],
        [958, 578],
        [880, 636],
        [742, 640],
        [660, 588],
      ],
    },
  ],
  water: [
    [
      [0, 660],
      [200, 646],
      [430, 668],
      [700, 652],
      [1000, 664],
      [1000, 700],
      [600, 694],
      [250, 700],
      [0, 692],
    ],
    [
      [430, 512],
      [520, 508],
      [548, 536],
      [470, 552],
      [412, 538],
    ],
  ],
  walls: [
    [20, 22],
    [300, 12],
    [640, 18],
    [905, 44],
    [968, 96],
  ],
  roads: [
    [
      [176, 108],
      [206, 106],
    ],
    [
      [500, 168],
      [492, 200],
    ],
    [
      [300, 292],
      [292, 340],
    ],
    [
      [700, 300],
      [712, 336],
    ],
    [
      [380, 430],
      [372, 462],
    ],
    [
      [760, 440],
      [726, 486],
    ],
  ],
  landmarks: [
    { id: 'landmark.sunwell-shaft', at: [500, 112] },
    { id: 'landmark.the-cold-mouth', at: [60, 300] },
    { id: 'landmark.the-nitre-vault', at: [906, 258] },
  ],
}

/** Displaced slabs: angular fragments offset around a jagged void. */
const MAGIC_CITY_MAP: CityMap = {
  w: 1000,
  h: 700,
  districts: [
    {
      id: 'district.magic-city-chalk-row',
      polygon: [
        [40, 40],
        [180, 20],
        [290, 60],
        [300, 170],
        [190, 210],
        [70, 180],
        [30, 110],
      ],
    },
    {
      id: 'district.magic-city-salt-vats',
      polygon: [
        [30, 240],
        [190, 232],
        [330, 216],
        [400, 330],
        [300, 430],
        [130, 420],
        [40, 344],
      ],
    },
    {
      id: 'district.magic-city-the-sinks',
      polygon: [
        [40, 462],
        [190, 444],
        [330, 470],
        [400, 570],
        [300, 668],
        [120, 678],
        [34, 570],
      ],
    },
    {
      id: 'district.magic-city-chainhouse-ward',
      polygon: [
        [332, 32],
        [470, 14],
        [600, 90],
        [640, 250],
        [560, 360],
        [450, 330],
        [350, 180],
      ],
    },
    {
      id: 'district.magic-city-the-lean',
      polygon: [
        [680, 60],
        [860, 30],
        [960, 110],
        [950, 260],
        [820, 300],
        [690, 240],
        [655, 140],
      ],
    },
    {
      id: 'district.magic-city-under-slabs',
      polygon: [
        [690, 330],
        [850, 320],
        [960, 380],
        [955, 520],
        [830, 570],
        [700, 530],
        [660, 420],
      ],
    },
  ],
  water: [
    [
      [470, 560],
      [540, 545],
      [592, 590],
      [545, 642],
      [468, 626],
      [446, 590],
    ],
  ],
  walls: [
    [20, 18],
    [500, 4],
    [980, 24],
    [992, 400],
    [960, 690],
    [420, 696],
    [24, 660],
    [8, 300],
  ],
  roads: [
    [
      [300, 120],
      [336, 118],
    ],
    [
      [200, 300],
      [330, 268],
      [420, 244],
    ],
    [
      [640, 190],
      [682, 176],
    ],
    [
      [610, 300],
      [668, 358],
    ],
    [
      [330, 480],
      [430, 500],
      [560, 520],
      [690, 500],
    ],
    [
      [560, 356],
      [520, 430],
      [470, 470],
    ],
  ],
  landmarks: [
    { id: 'landmark.the-bound-fault', at: [548, 424] },
    { id: 'landmark.the-load-roll', at: [470, 248] },
    { id: 'landmark.the-ninth-chain', at: [618, 306] },
  ],
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------------------- */
  /* The Tree City                                                     */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.treeCity,
    type: 'city',
    name: 'The Tree City',
    workingTitle: true,
    aka: ['The Black Boles'],
    status: 'draft',
    summary: 'Eleven colossal trunks fortified root to crown, joined by rope spans, run as a garrison and dying of heart rot.',
    tags: ['militarised', 'forest', 'timber', 'conscription'],
    fields: {
      epithet: 'The Black Boles',
      overview:
        'Eleven colossal trunks in a bend of the outwood, six of them fortified from the roots to the fifth gallery, joined by a hundred and forty rope spans and administered as one garrison. Nothing here is civil. [[faction.pitchguard|The Pitchguard]] licences the cutting, levies the soldiers who enforce the licence, and hangs the people who cut without one. Since [[material.blackbole-timber|blackbole timber]] and Greatwood charcoal underwrite half the continent\'s furnaces and gates, the city is a toll gate as much as a fortress.\n\nIt is also failing. [[creature.bolewright-wasp|Bolewright]] galleries have opened the heartwood of six named boles, and heart rot does not stop at a property line. The Marshalcy knows the count and does not publish it, because the day the count is public is the day the tribute villages stop sending grain and the [[faction.concord-of-weights|Concord]] calls in the advances.',
      founded:
        'Unrecorded. The Marshalcy dates the city from the first felling licence, which is a document rather than a founding.',
      settlementType: 'Fortress city in living timber',

      region: [REGION.greatwood],
      biome: 'Temperate old-growth forest',
      terrain:
        'A shallow bowl of deep leaf litter where three streams meet, chosen because eleven mature boles stand within a quarter-league of each other. The ground is worthless. The trunks are the terrain, and the fight is always vertical.',
      climate: 'Cool and wet. Snow lies on the upper galleries from late autumn to the spring thaw.',
      approach:
        'You do not see it. You walk under it. The pitch-blackened trunks read as ordinary shadow until the first severance post, and by then two gallery laths have had you in the notch for a hundred paces. Traders are halted at the [[district.tree-city-underroot|Underroot]] stockade and go no higher without a bond.',

      cityMapNote:
        'Nodes on branches. Each fortified bole is a self-contained redoubt with its own stair, water butts and mast store; the rope spans between them are the manoeuvre network and the single point of failure. The ground works sit under the stream line and are the only part of the city a wagon can reach.',
      districtCount: '6 mapped, of eleven trunks occupied',
      cityMap: TREE_CITY_MAP,

      architecture:
        'Palisade galleries cut into living trunks: a spiral stair in the heartwood, four to five ring galleries pinned through with iron, and a shuttered loophole wall of split staves outside that. Everything exposed is cured in pitch from [[machine.the-pitchworks|the Pitchworks]], which is what makes the timber black, weatherproof and eager to burn. Moss is left on the north faces because scraping it draws the eye. Iron is grey and unpolished on the same principle. The only colour in the city is the banners, which are dyed with the cheapest red available and replaced after every action.',
      silhouette: 'Black cylinders in the canopy, strung with catenary spans and bracketed ballista platforms.',
      palette: ['#14100d', '#4d5c37', '#6f747a', '#8c1c1c'],
      buildMaterials: ['material.blackbole-timber', 'material.blister-bar', 'material.mire-bloom'],

      landmarkName: 'The Bastion Bole',
      landmarkDesc:
        'The largest trunk in the bend, thirty-one strides across at the cut line, hollowed to five galleries and a signal crown. It holds the Marshalcy, the conscription rolls, the mast reserve and the only forge above ground level. See [[landmark.bastion-bole|the Bastion Bole]].',

      energy:
        'Muscle, falling water and fire. Two undershot wheels on the north stream drive the saw frames and the limb press bellows; everything above the second gallery is hauled by hand winch because a cable run is a fire path. Lamp oil is rationed and logged, and the ration is the reason the galleries work to daylight.',
      infrastructure:
        'Water is the city\'s real infrastructure: roofed catchment on every gallery, butts sized to a fortnight, and a bored elm main slung under [[landmark.the-black-span|the Black Span]] that feeds the four southern boles. Fire cisterns stand at every stairhead under a standing order that fire water may not be drunk, on pain of flogging. Waste goes down chutes to the pit yards and comes back as charcoal fines and manure.',
      keyMachines: ['machine.the-pitchworks', 'machine.the-limb-press'],

      transport:
        'Rope spans, hand winches and the stump road. A hundred and forty spans of two-plank decking, typically sixty to ninety strides, rated at twelve crossing bodies; thirty-eight of them are severance-rated and carry a sealed axe and a written order-holder. Freight goes down, never up: finished limbs, pitch and charcoal descend by chute to the [[district.tree-city-underroot|Underroot]] and leave by ox wagon on the one road wide enough for it.',
      traversal:
        'Movement is a licensed act. Spans are gated at both ends, curfewed after the third bell, and the sergeant on the post keeps a written crossing tally. Players who can move off the spans, by climbing line or by the maintenance runs [[npc.vetla-torvik|Vetla Torvik]] sells, are effectively invisible to the city\'s entire security model.',

      government: 'Marshalcy under the Pitchguard',
      politicalLeaning: 'Military, extractive, siege-minded',
      ruler: ['npc.aune-mustsalu', 'faction.pitchguard'],
      succession:
        'The Bole-Marshal is elected for life by the six bole captains and can be unseated by four of them. In practice the office goes to whoever holds the levy rolls, because the levy is the only thing the captains all need. [[npc.aune-mustsalu|Aune Mustsalu]] has held it eleven years and has never let the rolls out of her own hand.',

      laws:
        'Martial law, written short. Three offences carry death: cutting a licensed bole, carrying fire above the third gallery, and cutting a span without a signed order. Everything else is settled in labour: the timber yards take deserters, deserters\' families, debtors and anyone the muster finds surplus, and the yards do not keep a release schedule. The law is not pretending to be justice. It is pretending to be fire safety, and mostly it is neither.',
      enforcement: 'Pitchguard gate-sergeants and the gallery watch; no civil court above the bole captains',
      extradition:
        'The city has no treaties and honours no writs. It takes people back rather than sending them out: a deserter recovered from [[city.gilded-ascent|the Gilded Ascent]] is not extradited so much as bought, and the price is paid in charcoal tonnage. Ascent factors find this arrangement satisfactory and do not enquire further.',
      notableCrimes: [
        'Unlicensed felling (death; the licence, not the tree, is what is being protected)',
        'Fire above the third gallery, including an unsealed lamp (death)',
        'Cutting a span without a countersigned severance order (death)',
        'Falsifying the spring roll (labour, indefinite; see the Marshalcy\'s own practice)',
        'Selling a maintenance route or a bridge key (labour, and the buyer hangs)',
      ],

      socialClasses: [
        row({
          name: 'Bole captains and Marshalcy staff',
          share: 'Under 1%',
          note: 'Six families with a vote on felling licences. Live in the Crown Galleries, above the smoke and the sound.',
        }),
        row({
          name: 'Sworn Pitchguard',
          share: 'About 12%',
          note: 'Fed first, quartered dry, buried at the city\'s cost. Cannot leave, cannot marry outside the roll without leave.',
        }),
        row({
          name: 'Gallery households',
          share: 'About 40%',
          note: 'Hold a gallery tenancy against the levy: one body in six households, four years. Tenancy ends if the body is not produced.',
        }),
        row({
          name: 'Levy conscripts',
          share: 'About 10%',
          note: 'Four-year term. Counted as Pitchguard for rations and as chattel for discipline. Roughly one in nine does not come off the roll alive.',
        }),
        row({
          name: 'Yard labour',
          share: 'About 25%',
          note: 'Deserters\' kin, debtors, the surplus of the muster. Worked in the pitch yards and timber yards against a debt with no published schedule.',
        }),
        row({
          name: 'Tribute villagers within the pale',
          share: 'Counted separately',
          note: 'Not residents. Owe grain, charcoal and bodies; may not sleep inside the stockade.',
        }),
      ],

      population: '14,000 in the boles; 26,000 more in tribute villages',
      demographics: [
        row({ group: 'Bole-born', share: '55%', note: 'Three or more generations in the galleries. Hold tenancy rights.' }),
        row({ group: 'Tribute-village stock', share: '30%', note: 'Levied in, married in, or worked in. Tenancy is rarely granted.' }),
        row({ group: 'Outwood taken', share: '10%', note: 'Captured or surrendered hearth-clan people. Yard labour, watched.' }),
        row({ group: 'Outsiders under bond', share: '5%', note: 'Factors, charcoal buyers, surgeons. Bonded, escorted, and never housed above the second gallery.' }),
      ],
      languages: ['Bole speech (a clipped forest dialect built for shouted orders)', 'Trade cant at the Underroot stockade and nowhere else'],
      cultures: TBD('Do the bole-born and the tribute villages share a faith, or is the levy also a religious grievance?'),

      food:
        'Mast, grain and rot. [[food.bole-mast|Bole mast]] is milled to flour and stored against siege, but the boles mast only every four to seven years, so the famine years are on a calendar every household can read. Between masts the city eats tribute grain hauled up from the villages and whatever the yards can trade for. Meat is snared, and snaring outside the pale is [[skill.wire-and-snare|poaching]], which the Pitchguard hangs people for while quietly employing the same skill against the hearth-clans.',
      water:
        'Roof catchment and two streams. Gallery butts hold about a fortnight at ration; after that the city drinks from the north stream, which runs downhill from the pitch yards and is known to be foul. The elm main under the Black Span is the reason the southern boles can hold at all, which is why that span is the one bridge the severance drill may not touch.',
      staples: ['food.bole-mast'],

      economy:
        'A licence economy dressed as a war economy. The city sells three things: sawn [[material.blackbole-timber|blackbole timber]], hard charcoal, and finished [[recipe.redoubt-ballista|engines]] and limbs. It buys grain, iron and steel stock. Every felling is a council vote, which means every felling is a bribe, and the vote price has risen faster than the timber price for nine years running.',
      mainProduction: 'Blackbole timber, charcoal, pitch and siege engines',
      currency:
        'Ascent stair writs for outside trade. Inside the pale, ration chits against the mast granary, and licence-shares in a felling, which are traded openly and are the closest thing the city has to money.',
      wealth: 'Modest',

      exports: ['material.blackbole-timber', 'item.palisade-arbalest', 'item.gallery-lath', 'item.bastion-jack', 'food.bole-mast'],
      imports: ['material.blister-bar', 'material.stairwire', 'food.stair-loaf', 'material.scaldstone'],
      tradeNotes:
        'Charcoal from [[recipe.stumpwood-distillation|the stumpwood retorts]] crosses the continent to feed [[machine.the-verdigris-hearth|the Verdigris Hearth]], which means a Greatwood blockade stops the Mediterranean smelt. The Marshalcy understands this leverage perfectly and has never once used it, because the day it does, the charcoal buyers will fund the hearth-clans openly instead of quietly.',

      localResources: ['material.blackbole-timber', 'deposit.standing-fifty', 'food.bole-mast'],
      resourceNotes:
        'Three centuries to make a bole, one season to fell it. [[deposit.standing-fifty|The Standing Fifty]] outside the walls is the only number every faction in the Greatwood agrees on, and it drops by two or three a year. The city has never planted a bole, and there is no record that anyone knows how.',

      defense:
        'Six fortified boles, each holdable alone: one internal stair with three landing gates, four to five loopholed galleries, a fortnight of water and mast, and a fourth-gallery ballista platform. The ground stockade is a delaying work only, meant to be lost. There is no curtain wall, no keep and no relief force, because the doctrine does not assume relief.',
      doctrine:
        'Taught to every conscript in the first week as three orders: hold the stair, cut the span, fire the quarter.\n\nThe Pitchguard has never won a battle in the open and does not attempt one. It fights downward and inward. Bridgeheads carry [[item.gallery-lath|gallery laths]], the watch carries [[item.palisade-arbalest|palisade arbalests]] re-issued off the dead, and the six named boles mount [[recipe.redoubt-ballista|redoubt ballistae]] laid on each other\'s approaches so no trunk can be worked at leisure. [[skill.gallery-drill|Gallery drill]] is the whole of infantry training: fighting on decking that is still under load, and cutting a line while people are on it.\n\nFire is the decisive weapon and the standing terror. The city is built from the most flammable material it produces, so incendiary work is doctrine against everyone else and a capital offence at home. Against the hearth-clans the Pitchguard burns stands, caches and villages; against the rot it burns quarters, with whatever is inside them.',
      garrison: '2,200 sworn Pitchguard, plus a spring levy of 900 to 1,400',

      factionNotes:
        '[[faction.pitchguard|The Pitchguard]] is not a faction in the city so much as the city with a rank structure. What competes is inside it: the six bole captains vote licences, and three of them now hold more charcoal contracts than tenancies, which makes them merchants with soldiers. [[faction.bonewrights-hall|The Bondwrights\' Hall]] has no office here and does excellent business anyway, since a yard debt with no schedule is an indenture in everything but name and can be sold on downriver. [[faction.standing-hour|The Standing Hour]] has tried twice to organise the pitch yards; both stewards are in the timber yards now, and their names are read out at every spring muster.',

      currentConflict: 'Heart rot in six boles, and a felling order with eleven days to run',
      problems: [
        'Bolewright galleries confirmed in six named boles; the Marshalcy has published two',
        '[[quest.the-felling-order|A felling order]] stands on an infested quarter with families still inside the trunk',
        'The spring roll is short by roughly two hundred bodies and the press-gangs are making up the difference',
        'Charcoal buyers are funding unlicensed cutting faster than the patrols can hang cutters',
        'The mast failed last year; the granary is at eleven months and the next mast is not due',
        'A maintenance run into the fourth gallery of the Bastion Bole is for sale and the Marshalcy does not know it exists',
      ],

      cityRelations: [
        row({ city: 'The Gilded Ascent', stance: 'Creditor and customer', note: 'Buys timber and charcoal, holds grain advances against next season\'s licences. The debt is the leash.' }),
        row({ city: 'The Mediterranean City', stance: 'Dependent customer', note: 'Cannot smelt without Greatwood charcoal. Sends steel stock and engineers in part payment.' }),
        row({ city: 'The Sky City', stance: 'Cool', note: 'Buys nothing the Greatwood sells and taxes everything that flies over it. Mutual, formal disregard.' }),
        row({ city: 'The Cave Agrarian City', stance: 'Quiet trade', note: 'Timber props and pit frames south, grain and mirror barley north when the mast fails.' }),
        row({ city: 'The Arena City', stance: 'Buyer of bodies', note: 'Yard debts are sold on to Ring bond-holders. The Marshalcy calls this resettlement.' }),
      ],

      signatureMechanic: 'The Severance Drill',
      mechanicNotes:
        '[[mechanic.severance-drill|The Severance Drill]] is the city\'s answer to everything: a breach, an infestation, a mutiny, a fire. Thirty-eight spans carry a sealed axe and a countersigned order-holder, and the drill is timed in the muster yard until a two-crew team can drop a ninety-stride span in under forty seconds. It works. That is the point. The question a party faces is never whether the cut will hold the line, it is who is still on the decking when the order comes, and whether the order was signed before or after the party was sent across.\n\nPair it with [[skill.gallery-drill|Gallery Drill]] for anyone expected to fight or work on a loaded span, and remember the one exception: [[landmark.the-black-span|the Black Span]] carries the water main for four boles and may not be cut, which makes it the obvious axis of any assault and the reason the southern approach is fortified twice over.',

      npcNotes:
        '[[npc.aune-mustsalu|Aune Mustsalu]] rules and is one audit from ruin: she has forged deaths on the rolls to keep some thirty children of a purged quarter off them, and her own quartermaster has begun counting bodies against rations. [[npc.saarik-rauda|Saarik Rauda]] runs the press-gangs out of [[district.tree-city-ninth-gallery|the Ninth Gallery]] and takes his bribes in seed grain, keeping a written tally that is effectively a map of who in the city can be bought and for how little. [[npc.vetla-torvik|Vetla Torvik]] lives outside the palisade and sells the one route that reaches the Bastion Bole\'s fourth gallery without passing a gate, once, and only to a party that also gets her sister out of the timber yards.',
      questNotes:
        '[[quest.the-felling-order|The Felling Order]] is the city\'s defining job and it is permanently failable: eleven days, a quarter to be dropped and fired on schedule, and families who will not go because going means the yards. Around it sit three smaller pressures a table can run in any order: the short spring roll and what a party is willing to do to fill or empty it; the charcoal smuggling that is arming the hearth-clans; and Vetla Torvik\'s route, which is worth more to an attacker than to a burglar and which somebody will eventually sell twice.',

      services: [
        row({ name: 'Bone-setting and amputation', where: 'the surgeon\'s bench, Pitch Yards', note: '[[skill.bonewright|Bonewright]] work. Free to levy men, priced by the limb for anyone else.' }),
        row({ name: 'Licence hearing', where: 'Bastion Bole, fourth gallery', note: 'Felling petitions heard on the ninth of the month. Mostly refused, always priced.' }),
        row({ name: 'Levy substitution', where: 'Ninth Gallery muster yard', note: 'Lawful. A household may buy a son off the roll if it can produce a body to replace him.' }),
        row({ name: 'Span passage after curfew', where: 'any severance post', note: 'The sergeant can be bought in seed grain. Coin is refused, because coin is evidence.' }),
        row({ name: 'Sentinel tick fitting', where: 'the scout house, Crown Galleries', note: 'A living stranger-alarm for a daily bleed and several years of your life.' }),
      ],

      creatureNotes:
        '[[creature.bolewright-wasp|Bolewright wasps]] are the enemy the doctrine cannot burn its way out of: the galls weep usable resin, the larvae hollow the heartwood, and a brood misplaced in livestock or a person ends slowly and badly. Scouts wear [[creature.sentinel-tick|sentinel ticks]] behind the ear and pay for them in blood and years. Outside the pale the wood holds ordinary hard country: windthrow, boar, and hearth-clan snares set with the same skill the Pitchguard hangs people for using.',

      history:
        'The dates are Marshalcy dates and the Marshalcy keeps the only archive, so read them as claims. The first licence, the first stockade, the purge of the quarter whose children Aune Mustsalu is still hiding on the rolls, and the loss of the Sixth Bole to rot, which is the event the city has agreed to call a fire.',

      devNotes:
        'CANON: militarised tree city; timber redoubts, rope bridges, palisade galleries in colossal trunks; landmark the Bastion Bole; palette pitch-black timber, moss, iron grey, blood-red banners. ' +
        PROPOSAL('The militarisation is given a cause rather than a mood: a licence monopoly on the continent\'s charcoal and gate timber, an insurgency of unlicensed hearth-clans in the outwood, and heart rot that will eventually take the city whatever it does. The severance drill, the spring levy and the yards are the price its own people pay for that posture.'),
      openQuestions: [
        'How many boles are actually infested, and who holds the true survey?',
        'Are the hearth-clans one people or several, and does the city know the difference?',
        'Can a bole be planted, or has that knowledge simply never existed?',
        'Where do the timber yards end: is there any published release, or is a yard debt permanent by design?',
        'What happens to the Greatwood charcoal trade the year the Standing Fifty runs out?',
      ],
    },
  }),

  E({
    id: 'district.tree-city-crown-galleries',
    type: 'district',
    name: 'The Crown Galleries',
    status: 'draft',
    summary: 'The top works of the Bastion Bole: signal crown, Marshalcy offices, and the only air in the city worth breathing.',
    tags: ['government', 'wealthy'],
    fields: {
      overview:
        'The fourth and fifth galleries of [[landmark.bastion-bole|the Bastion Bole]] and the signal crown above them. The rolls are kept here, the licence votes are heard here, and the scout house fits [[creature.sentinel-tick|sentinel ticks]] here. It is the only quarter above the smoke line, which is a health difference of about fifteen years.',
      city: [CITY.treeCity],
      districtType: 'Government and command',
      wealth: 'Rich by local standards',
      atmosphere:
        'Quiet, cold and very clean. Sound carries up the trunk, so the galleries hear the muster yard perfectly and are never heard by it. Everyone speaks at half volume out of habit.',
      architecture:
        'Pinned iron, planed floors and shuttered glass, which exists nowhere else in the city. The signal crown is open decking with a windlass mast and a shrouded lamp that may be lit only on the Marshal\'s written order.',
      whoLivesHere: 'Bole captains, Marshalcy clerks, the scout house, and Aune Mustsalu, who sleeps in the roll room',
      danger: 'Low, until you are noticed',
      playNotes:
        'The conscription rolls are here and they are forged. Getting at them means either the licensed route, which requires a captain\'s countersignature, or [[npc.vetla-torvik|Vetla Torvik]]\'s maintenance run, which arrives in the fourth gallery without passing a single gate. Exposing the forgeries destroys [[npc.aune-mustsalu|Aune Mustsalu]]; covering them makes the city\'s gates owe the party a favour that will be called in during the felling.',
      devNotes: 'The one district where a party can lose everything by being polite in the wrong room.',
    },
  }),

  E({
    id: 'district.tree-city-ninth-gallery',
    type: 'district',
    name: 'The Ninth Gallery',
    status: 'draft',
    summary: 'The levy gate: muster yard, conscript barracks, and the sergeant whose seed-grain tally prices the whole city.',
    tags: ['military', 'conscription'],
    fields: {
      overview:
        'The eastern bole\'s second and third galleries, given over to the spring levy. Every conscript in the city passes through the muster yard, is measured, sworn, issued a [[item.palisade-arbalest|palisade arbalest]] and a [[item.bastion-jack|bastion jack]], and taught [[skill.gallery-drill|gallery drill]] on a practice span rigged to be cut under them.',
      city: [CITY.treeCity],
      districtType: 'Barracks and muster',
      wealth: 'Poor, uniformly',
      atmosphere:
        'Shouting, wet rope, boiled mast and fear held very flat. The roll is read at dawn and again at dusk, and the second reading is the one that matters, because absences at dusk are desertions.',
      architecture:
        'Loopholed galleries with the shutters removed for sightlines, decking scarred by drill, and a muster yard of pinned planking cantilevered off the trunk so that the whole gallery can watch a flogging without leaving their posts.',
      whoLivesHere: 'Levy conscripts on four-year terms, gate-sergeants, and the press-gangs',
      danger: 'High for anyone of levy age without papers',
      playNotes:
        '[[npc.saarik-rauda|Saarik Rauda]] keeps his tally here: every household that has paid to keep a son off the roll, written down, in his own hand. Stealing it is worth more than any amount of grain, because it is a purchase list for the entire city. Players of the wrong age are pressed on sight, and a substitution can be bought lawfully if they can produce a body, which is a moral problem with a paper solution.',
      devNotes: 'The entry point for any campaign that starts with the party being conscripted rather than hired.',
    },
  }),

  E({
    id: 'district.tree-city-spanworks',
    type: 'district',
    name: 'The Spanworks',
    status: 'draft',
    summary: 'Bridge-wrights and severance crews: the people who build the spans and the people ordered to cut them.',
    tags: ['craft', 'engineering'],
    fields: {
      overview:
        'The western bole, three galleries of rope walk, splice benches and anchor works. Every one of the city\'s hundred and forty spans was laid here, and the thirty-eight severance-rated spans are inspected here on a nine-day round. The crews who build the bridges are the crews trained to drop them, which the Marshalcy considers efficient and the crews consider something else.',
      city: [CITY.treeCity],
      districtType: 'Craft and engineering',
      wealth: 'Modest, skilled',
      atmosphere:
        'Tar, hemp dust and the constant slow creak of loaded rope. Nobody in the Spanworks walks on a bridge without looking at its anchor first, and visitors are quietly judged for not doing the same.',
      architecture:
        'Long open galleries with the outer wall cut away for the rope walk, anchor blocks pinned through the heartwood with iron the width of a wrist, and the inspection board: every span in the city listed by number, load and last-cut date.',
      whoLivesHere: 'Bridge-wrights, splicers, severance crews, and the inspectors who condemn their work',
      danger: 'Moderate; the work itself kills people',
      playNotes:
        'The inspection board is a map of the city\'s nervous system, and it is publicly readable by anyone who can pass for a splicer. This is where a party learns which spans carry water, which carry the only route to a quarter, and which have not been inspected since the last Marshal. [[material.stairwire|Stairwire]] is imported here and condemned hawser has a lively second market on the ground.',
      devNotes: 'Gives players a way to engage the severance drill as engineering rather than as tragedy.',
    },
  }),

  E({
    id: 'district.tree-city-sixth-quarter',
    type: 'district',
    name: 'The Sixth Quarter',
    status: 'draft',
    summary: 'A bole under a felling order, with roughly four hundred people still living inside it.',
    tags: ['condemned', 'dark'],
    fields: {
      overview:
        'Two galleries and a root warren of the Sixth Bole, which the Marshalcy condemned as infested and scheduled for felling and firing. The order has eleven days to run. Roughly four hundred people are still inside, because leaving means the [[district.tree-city-underroot|timber yards]] and staying means only that the date has not arrived yet.',
      city: [CITY.treeCity],
      districtType: 'Condemned residential',
      wealth: 'Destitute',
      atmosphere:
        'Very quiet in the daytime and busy after dark. The heartwood is audibly hollow: knock on a gallery post and the sound goes on for longer than it should. Resin weeps from the gall lines and is collected, because it still sells.',
      architecture:
        'Sound timber patched over rot with unpitched staves, which is illegal and universal. The severance posts on both spans into the quarter have been re-sealed twice after the seals were found cut from the inside.',
      whoLivesHere: 'Condemned tenancy households, resin collectors, and two Standing Hour stewards nobody has reported',
      danger: 'Extreme, and on a published schedule',
      playNotes:
        'The centre of [[quest.the-felling-order|The Felling Order]]. Everything a party can do here is timed: evacuate against the yards, prove the survey was wrong or forged, buy eleven more days from a bole captain, or cut the spans early and be the reason. Miss the window and the quarter, its trades and its people are gone from the campaign permanently.',
      devNotes: 'Written as a place, not a set-piece. If the party never comes, it still burns on day eleven.',
    },
  }),

  E({
    id: 'district.tree-city-pitch-yards',
    type: 'district',
    name: 'The Pitch Yards',
    status: 'draft',
    summary: 'Ground-level retorts and presses: the pitch that blackens the city, and the lungs it costs.',
    tags: ['industry', 'labour'],
    fields: {
      overview:
        'The manufacturing floor. [[machine.the-pitchworks|The Pitchworks]] distils stumpwood into pitch, spirit and hard charcoal; [[machine.the-limb-press|the Limb Press]] steams and laminates staves into ballista limbs and shield cores. Between them they produce everything the city sells and most of what kills its workers.',
      city: [CITY.treeCity],
      districtType: 'Industry',
      wealth: 'Poor',
      atmosphere:
        'Smoke that does not lift, standing heat from the retort banks, and a smell of turpentine that follows people up the trunk. Yard hands are recognisable three galleries away by the cough.',
      architecture:
        'Brick-set retorts under sand-shed roofs, cooling floors, and the press house, which is the only building in the city with a stone wall, built because the alternative was rebuilding it.',
      whoLivesHere: 'Yard labour, retort masters, the surgeon\'s bench, and the charcoal factors who never sleep here',
      danger: 'High, chronically rather than suddenly',
      playNotes:
        'Charcoal leaves here by wagon, and roughly a fifth of it leaves unlicensed. Following that fifth leads outward to the buyers funding the hearth-clans and inward to whichever bole captain signs the manifests. The surgeon\'s bench is where a party gets [[skill.bonewright|bone-setting]] without questions and where they will hear, unprompted, exactly which quarters have been coughing wrong.',
      devNotes: 'The industrial base for both the wood chain and the city\'s weapons manufacture.',
    },
  }),

  E({
    id: 'district.tree-city-underroot',
    type: 'district',
    name: 'The Underroot',
    status: 'draft',
    summary: 'Stockade, tribute landing, granary and timber yards — the only part of the city a wagon can reach.',
    tags: ['trade', 'labour', 'dark'],
    fields: {
      overview:
        'The ground works: the palisade stockade, the tribute landing where villages deliver grain and charcoal, the mast granary, and the timber yards. Outsiders get no further than this without a bond, and yard labour never gets out of it at all.',
      city: [CITY.treeCity],
      districtType: 'Trade, storage and forced labour',
      wealth: 'Poor, with a great deal of money passing through',
      atmosphere:
        'Ox, sawdust, wet grain and the sound of the yards, which run to a bell rather than to daylight. Wagons queue from before dawn. The stockade gate is closed at dusk exactly, whoever is outside it.',
      architecture:
        'Stake palisade on a root bank, roofed granaries raised on staddle stones against rot and rats, and the yards: open cutting floors with a fenced sleeping shed at one end and no gate on the far side, because there is nowhere on the far side to go.',
      whoLivesHere: 'Yard labour, granary clerks, bonded traders, and tribute villagers who may not sleep inside the pale',
      danger: 'Moderate; high if you are on a yard ledger',
      playNotes:
        'Debts are worked off here with no published schedule, and the ledgers are sold on downriver to Ring bond-holders and [[faction.bondwrights-hall|the Bondwrights\' Hall]]. [[npc.vetla-torvik|Vetla Torvik]]\'s sister is on one of those ledgers, which is the price of her route. The granary count is the single most politically dangerous number in the city: it is at eleven months and the next mast is not due.',
      devNotes: 'Handle the yards with consequence. The horror is the missing release schedule, not the work.',
    },
  }),

  E({
    id: 'landmark.bastion-bole',
    type: 'landmark',
    name: 'The Bastion Bole',
    status: 'canon',
    summary: 'The great trunk: thirty-one strides across, five galleries, the rolls, the reserve and the signal crown.',
    tags: ['landmark', 'fortress'],
    fields: {
      overview:
        'The city\'s central landmark and its last redoubt. A single living trunk thirty-one strides across at the cut line, hollowed to five ring galleries and a signal crown, holding the Marshalcy, the conscription rolls, the mast reserve and the only forge above ground.',
      city: [CITY.treeCity],
      landmarkType: 'Fortified trunk',
      built: 'Grown. The galleries were cut into it over generations and are still being cut.',
      appearance:
        'Black to the crown, pitch-cured in bands you can date by colour, banded with iron at each gallery line and hung with red at the fourth. Nine ballista embrasures, four of them empty because the engines were moved to the Sixth Bole and never came back.',
      function:
        'Command, archive and granary. If every other bole falls, the doctrine assumes the Bastion holds with two hundred bodies for six weeks, and the mast reserve is sized to exactly that assumption.',
      access:
        'One internal stair with three landing gates, each countersigned; four spans, all severance-rated. And, unknown to the Marshalcy, a rope-bridge maintenance run that reaches the fourth gallery without passing any of them.',
      devNotes: 'CANON: the Tree City\'s central landmark is the Bastion Bole. Dimensions and internal arrangement are proposals.',
    },
  }),

  E({
    id: 'landmark.the-black-span',
    type: 'landmark',
    name: 'The Black Span',
    status: 'draft',
    summary: 'A 210-stride bridge carrying the water main for four boles, and the only span that may not be cut.',
    tags: ['landmark', 'infrastructure'],
    fields: {
      overview:
        'The longest bridge in the city at two hundred and ten strides, and the only one exempt from [[mechanic.severance-drill|the severance drill]], because a bored elm main slung beneath its decking supplies the four southern boles.',
      city: [CITY.treeCity],
      landmarkType: 'Rope bridge and water main',
      built: 'Laid in the Spanworks; re-decked twice, re-anchored once',
      appearance:
        'Four laid cables of imported [[material.stairwire|stairwire]] under pitch, decking wide enough for two abreast, and the elm main below it wrapped in moss and tar against frost. It sags visibly at the centre and is supposed to.',
      function:
        'Water, and after that, traffic. The severance post at each end carries a sealed axe like every other, and a second seal over it in the Marshal\'s own wax, which is a formality that has been tested exactly once.',
      access: 'Open to anyone with a crossing tally until the third bell. Watched from both ends and from the Bastion crown.',
      devNotes:
        'Deliberately the city\'s designed weak point: the doctrine\'s one exception, so every attacker with a map knows where to go and every defender knows they cannot answer it the usual way.',
    },
  }),

  E({
    id: 'landmark.the-ash-ring',
    type: 'landmark',
    name: 'The Ash Ring',
    status: 'draft',
    summary: 'The clearing where condemned boles are dropped and fired; each stump cut flat and dated.',
    tags: ['landmark', 'dark'],
    fields: {
      overview:
        'A burn ground south-east of the stockade where every quarter the Marshalcy has condemned was felled and fired. Nine stumps, each cut flat and carved with the date of its order. The tenth pad has been cleared and levelled, which is how the city found out about [[quest.the-felling-order|the current order]] before it was posted.',
      city: [CITY.treeCity],
      landmarkType: 'Burn ground',
      built: 'Cleared for the first felling; extended eight times since',
      appearance:
        'A ring of flat stumps in ash that never fully weathers, the tallest of them broad enough to muster forty people on. Nothing has regrown in the ring, which the Marshalcy attributes to the burning and the hearth-clans attribute to something else.',
      function:
        'Disposal and instruction. Levy conscripts are marched here in their first week and shown the dates, which is the closest thing the city has to a civic ceremony.',
      access: 'Open ground, patrolled. Standing on a stump without leave is a flogging offence.',
      devNotes:
        PROPOSAL('Gives the felling orders a physical record the players can read and count. Whether anything actually prevents regrowth in the ring is left open on purpose.'),
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Cave Agrarian City                                            */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.caveAgrarian,
    type: 'city',
    name: 'The Cave Agrarian City',
    workingTitle: true,
    aka: ['The Lit Terraces'],
    status: 'draft',
    summary: 'A farming civilisation under the karst: ducted sunlight, manufactured soil, and a harvest with no wild margin to fall back on.',
    tags: ['agriculture', 'underground', 'light-politics'],
    fields: {
      epithet: 'The Lit Terraces',
      overview:
        'A working farm the size of a city, built into the bedding planes of [[region.hollow-karst|the Hollow Karst]]. Daylight is caught at the surface, folded down two hundred silvered ducts and issued to individual galleries by the hour. Below the light, terraces of fungus. Below the fungus, flooded sumps of blind carp. Below that, galleries the city has stopped counting.\n\nEverything about the place is manufactured: the light, the soil, the nitrogen, the air. There is no wilderness to forage, no game to hunt and no gleaning after a bad year, which means a failed harvest here is not hardship but arithmetic. [[faction.mirror-assembly|The Mirror Assembly]] votes the light out on inherited shares, and the vote is the whole of local politics.',
      founded:
        'The Assembly counts from the first ducted gallery. The galleries were lived in long before anyone cut a duct.',
      settlementType: 'Subterranean agrarian city-state',

      region: [REGION.hollowKarst],
      biome: 'Limestone karst, worked underground',
      terrain:
        'Six worked levels on four bedding planes, following the rock rather than any plan: long shallow lenses two to nine strides high, linked by shafts, ramps and one cart incline. The surface above is thin pasture, grey pavement and sinkholes, and belongs to the city only in the sense that the shafts do.',
      climate: 'Below: constant, damp, windless, ten to thirteen degrees the year round. Above: cool and dry.',
      approach:
        'From the pavement you see a walled shaft head, a winding house and a great deal of guarded glass. From below, arriving up the Karst Fork resurgence, you see the first terrace as a band of gold light a quarter-league long, hanging in the dark with barley under it. Nobody who has seen the second view forgets it.',

      cityMapNote:
        'Bedding-plane lenses stacked down through the rock, offset where the strata offset, joined by shafts. The layout is geology, not design: the city is wide and thin because the rock is, and the deepest lobe hangs off to one side because that is where the plane dips.',
      districtCount: '6 mapped levels; the Assembly maps five',
      cityMap: CAVE_CITY_MAP,

      architecture:
        'Cut limestone and light. Terrace walls are dry-laid from gallery spoil, faced smooth where they must reflect and left rough where they must not. Every lit gallery is built as an optical instrument: white-limed vaults, a polished apron under the duct mouth, and shutters to throw light where the rota says it goes. Below the light line the finish stops entirely and the galleries are rough rock, timber prop and violet flush. Doors are rare. Curtains and air-locks are everywhere, because the city manages draught the way other cities manage walls.',
      silhouette: 'From above, almost nothing: a walled shaft head and a field of mirror housings turning together.',
      palette: ['#e8ddc4', '#d9a441', '#6b3f8c', '#2b2620'],
      buildMaterials: ['material.sunwell-mica', 'material.blackbole-timber', 'material.tideset-cement'],

      landmarkName: 'The Sunwell Shaft',
      landmarkDesc:
        'The main light shaft: a bored and lined well nine strides across dropping ninety to the first terrace, with a heliostat crown at the head and two hundred ducted mirrors fanning out below it. See [[landmark.sunwell-shaft|the Sunwell Shaft]].',

      energy:
        'Sunlight, water and muscle, in that order of political importance. The heliostat crown is clock-driven and wound by hand on a two-hour watch; the mills on the sump overflow grind barley and mill rock dust for soil; lamp oil is imported and expensive, so almost all work below the light line is done by feel or by [[creature.lamphorn|cold-light]] lanterns the city cannot breed for itself.',
      infrastructure:
        'Four systems, all fragile. Light: two hundred silvered mica mirrors on [[machine.the-mirror-ducts|clockwork ducts]], re-silvered on a ninety-day round because the amalgam dulls and the silverers poison. Air: two intake adits and four thermal chimneys, with the standing rule that no gallery may be worked more than sixty paces from a moving draught. Water: cistern-and-siphon off the resurgence, with bailiffs on every head. Waste: the night-soil rota, collected daily and weighed, because it is nitrogen and nitrogen is not optional.',
      keyMachines: ['machine.the-mirror-ducts'],

      transport:
        'One cart incline to the surface, worked by counterweight, and after that everything moves by barrow, basket and back. Grain goes up, nitre and glass come down. The incline is the city\'s only import and export throat and is closed for four hours each morning while the light rota is set, which is not a coincidence.',
      traversal:
        'Vertical, dark and rule-bound. The shafts have ladders, the ramps have a right of way, and the curtains must be closed behind you or a bailiff will find out which gallery lost its draught. Anyone moving below the fourth terrace without a lamp licence is presumed to be stealing light, water or people.',

      government: 'Assembly of inherited light-shares',
      politicalLeaning: 'Oligarchic, agrarian, obsessed with allocation',
      ruler: ['faction.mirror-assembly', 'npc.ossane-gorbea'],
      succession:
        'Votes are weighted by inherited shares in the original ducts, so a family that cut a shaft nine generations ago outvotes a terrace of four hundred farmers. Shares can be sold, and [[npc.ossane-gorbea|Ossane Gorbea]] has been buying them through a cousin\'s name after first starving the galleries that hold them.',

      laws:
        'Property law here is optical and hydraulic. You own hours, not land: a gallery tenancy is a right to so many lumen-hours a day, plus a water head and a soil registration. Theft of light is the characteristic crime, because a hand mirror on a jointed arm can take a neighbour\'s allocation without leaving a mark on anything. Sentences are paid in hours, and a household that cannot pay in hours pays in bodies to the deep galleries, which is the mechanism by which the Assembly acquired a labour force it does not count.',
      enforcement: 'Light-tithe reeves, water bailiffs and the gallery wardens who answer to them',
      extradition:
        'The city will not surrender a soil-holder, on the grounds that made ground dies without its holder, and will surrender almost anyone else on request. Debtors sent down to the deep galleries are outside the question entirely: the Assembly cannot extradite people it does not admit to holding.',
      notableCrimes: [
        'Light theft, by mirror, shutter or lime (paid in hours, then in labour)',
        'Fouling a water head (labour, and the whole gallery is fined with you)',
        'Withholding night soil from the rota (fine, and a public one)',
        'Growing an unregistered strain (confiscation of the terrace\'s allocation, not just the crop)',
        'Carrying an unlicensed [[item.nitre-cask|nitre cask]] below the second terrace (capital, and enforced)',
        'Exporting a live [[material.cudmother|cudmother]] starter (capital in law; universally done)',
      ],

      socialClasses: [
        row({ name: 'Share-holding houses', share: 'About 3%', note: 'Hold inherited duct shares and therefore votes. Do not farm; allocate.' }),
        row({ name: 'Mirrorwrights and reeves', share: 'About 6%', note: 'Cut, silver, aim and issue. Well paid, and the silvering kills them inside a decade.' }),
        row({ name: 'Terrace farmers', share: 'About 45%', note: 'Hold a tenancy in hours and a registered soil. Vote at a weight of roughly one to sixty.' }),
        row({ name: 'Flush and sump labour', share: 'About 30%', note: 'Fungus terraces and carp sumps. No light allocation at all, and the lung rot that goes with it.' }),
        row({ name: 'Deep-gallery debtors', share: 'Not counted', note: 'Signed down against arrears in hours. The Assembly\'s own clerks put them at four to seven thousand.' }),
        row({ name: 'Surface traders under licence', share: 'About 2%', note: 'Sifting City nitre factors, Meridian conserve agents, and the highland factor from Oruvai.' }),
      ],

      population: '31,000 counted; the deep galleries are not counted',
      demographics: [
        row({ group: 'Gallery-born karst people', share: '80%', note: 'Pale, short-sighted at distance, and unbothered by a hundred strides of rock overhead.' }),
        row({ group: 'Surface pastoralists of the plateau', share: '12%', note: 'Winter in the upper galleries, graze the pavement in summer. Own no hours and resent it.' }),
        row({ group: 'Basin and steppe incomers', share: '6%', note: 'Came for work after a bad year elsewhere. Mostly in the flush galleries.' }),
        row({ group: 'Licensed outsiders', share: '2%', note: 'Factors and agents. Housed at the shaft head, never below the second terrace.' }),
      ],
      languages: ['Gallery speech, spoken quietly because sound carries in stone', 'Trade cant at the shaft head'],
      cultures: TBD('Is there a cult of the light itself, and if so does the Assembly run it or fear it?'),

      food:
        'Three tiers, and they are not interchangeable. The lit terraces grow [[food.mirror-barley|mirror barley]] and a bitter pulse sown between courses, at about a third of surface yield. The half-lit fourth terrace grows fodder and green manure. The dark galleries flush [[food.gallery-cap|gallery cap]] on dung and milling chaff in three days and need no light at all, which is why the city can survive and why its flush workers cannot breathe by forty. Protein comes from [[food.sump-carp|sump carp]] fed on milling waste, and the carp carry a fluke that blinds people who eat them raw.\n\nWhat cannot be grown here at all is fruit. Nothing that needs an insect gets pollinated in a cave, so the city buys [[food.terrace-citron|terrace citron]] conserve from the Meridian Coast against gum-rot, at a mark-up it cannot refuse and does not forgive.',
      water:
        'Karst water: abundant, and in the wrong places. The cisterns are charged off the Karst Fork resurgence and distributed by siphon, with a bailiff on each head. The two standing dangers are a dead beast in an upper sink, which contaminates every gallery below it, and surface rain, which puts the lowest workings under water in a matter of hours with no warning that reaches the people in them.',
      staples: ['food.mirror-barley', 'food.gallery-cap', 'food.sump-carp'],

      economy:
        'The city sells food and light-work and buys chemistry. Surplus barley, dried gallery cap, salt carp and silvered [[material.sunwell-mica|mica]] go up the incline; [[material.pan-nitre|pan nitre]], quicksilver, tin, glass and citron conserve come down. Internally the unit of account is the lumen-hour, and it is traded, lent, foreclosed and forged exactly like money, because it is money.',
      mainProduction: 'Mirror barley, gallery cap, sump carp and silvered mica',
      currency: 'The lumen-hour, issued under the reeve\'s seal; stair writs for outside trade',
      wealth: 'Modest',

      exports: ['food.mirror-barley', 'food.gallery-cap', 'material.sunwell-mica', 'item.fever-clay', 'material.quietmilk'],
      imports: ['material.pan-nitre', 'food.terrace-citron', 'material.clearcast-glass', 'material.blackbole-timber'],
      tradeNotes:
        'Two dependencies decide this city\'s foreign policy. Nitrogen comes from [[city.sifting-city|the White Pans]] and quicksilver and tin come through [[city.mediterranean-city|the Meridian Coast]]; without the first the terraces yield half, without the second the mirrors go dull in a season and the light stops. The Assembly has spent forty years failing to find a third source of either.',

      localResources: ['material.sunwell-mica', 'deposit.lantern-beds', 'material.cudmother', 'material.quietmilk'],
      resourceNotes:
        '[[deposit.lantern-beds|The Lantern Beds]] are followed by lamplight along the bedding planes and cleaved by hand at the face; the silvering that turns the spar into mirrors is done above ground with tin amalgam and takes about a decade off the people who do it. [[material.cudmother|Cudmother]] is the resource nobody outside the karst can price: without that gut culture, limestone dust is not soil and never becomes soil.',

      defense:
        'Almost none, and the Assembly is candid about it. There is no wall, no standing company and no field force. What the city has is geography: two intake adits, one cart incline and eleven shafts, all of which can be dropped with charges from [[item.nitre-cask|licensed nitre casks]] in under an hour. The defensive plan is to seal, and the defensive problem is that a sealed city suffocates in nine days.',
      doctrine:
        'Deny the entrances, hold the air, and negotiate. A hundred armed farmers with [[skill.spore-lore|spore lore]] and a gallery they know in the dark are genuinely dangerous, and the reeves know it, which is why internal enforcement is done by allocation rather than by violence. Against a real siege the city has no answer but the granary and the fact that nobody has yet wanted the karst enough to pay for it.',
      garrison: 'No standing force; 300 gallery wardens and whatever the terraces will muster',

      factionNotes:
        '[[faction.mirror-assembly|The Mirror Assembly]] is the government, the landlord and the utility. Under it, the mirrorwrights are a guild in everything but name and are the only body the Assembly cannot simply outvote, because there are two hundred mirrors and about forty people who can aim them. [[faction.low-tally|The Low Tally]] runs cudmother starters and unlicensed strains out of the karst in couriers\' armpits, which the Assembly treats as treason and the terraces treat as insurance. [[faction.bondwrights-hall|The Bondwrights\' Hall]] would very much like to buy the deep-gallery arrears and has been refused three times, because selling them would require admitting they exist.',

      currentConflict: 'Blight has cut the Sunwell yield; somebody must be starved of light',
      problems: [
        '[[quest.who-gets-the-light|A blight has cut the yield]] and the rota must be re-cut against galleries that will not survive it',
        'Two lower galleries have been dark for over a year after a duct collapse that was never reported',
        'An unregistered violet grain-fungus is feeding half the fourth terrace and stopping them sleeping',
        'The light-tithe reeve is buying failed galleries she first starved of hours',
        'Nitre arriving from the Pans has been undergraded twice this year and the terraces cannot prove it',
        'Deep-gallery arrears have grown past the point where the Assembly could release them if it wanted to',
      ],

      cityRelations: [
        row({ city: 'The Sifting City', stance: 'Dependent buyer', note: 'Nitrogen for grain. The grade stamp on the nitre decides this city\'s harvest and can be bought.' }),
        row({ city: 'The Mediterranean City', stance: 'Necessary and resented', note: 'Quicksilver, tin, glass and citron conserve. Every price is a mark-up and every mark-up is remembered.' }),
        row({ city: 'The Gilded Ascent', stance: 'Cordial creditor', note: 'Buys surplus grain cheap in good years and lends dear in bad ones.' }),
        row({ city: 'Oruvai', stance: 'Unread', note: 'A highland factor pays in advance, in cut stone, four times a year, and will not say who seals her warrant.' }),
        row({ city: 'The Tree City', stance: 'Quiet trade', note: 'Prop timber and pit frames south; grain north when the mast fails.' }),
      ],

      signatureMechanic: 'The Mirror Rota',
      mechanicNotes:
        '[[mechanic.the-mirror-rota|The Mirror Rota]] issues sunlight in lumen-hours per gallery and re-cuts on the first of each month. A first-terrace gallery draws about five and a half duct-hours a day at midsummer and under two at midwinter; a duct throws usable light roughly forty paces past its mouth and nothing beyond. Players can petition for hours, buy them, be issued them as a reward, steal them with a [[item.sunwell-mirror|jointed hand mirror]], or improve them by aiming better, which needs [[skill.mirror-cutting|Mirror Cutting]] and a very steady hand.\n\nThe rule that gives it teeth: a gallery cut off for a full season loses its cudmother culture, and made ground without cudmother reverts to rock dust. Bringing it back takes four to nine years. So a light allocation is not a monthly inconvenience, it is a decade of a family\'s work, and everyone at the Assembly table knows it when they vote.',

      npcNotes:
        '[[npc.iratze-zubiate|Iratze Zubiate]] keeps two hundred mirrors aligned by hand and is quietly skimming mirror-hours from the grain terraces to hide a duct collapse she cannot repair alone; she needs bodies and rope, not sympathy. [[npc.ossane-gorbea|Ossane Gorbea]] issues the hours and buys the galleries she has starved. [[npc.bedel-lehun|Bedel Lehun]] grows a violet strain that yields double in half the light and will not stop, because stopping means his terrace loses its allocation altogether. [[npc.anwe-halduri|Anwe Halduri]] arrives from the highland four times a year, pays in advance in cut stone, and never stays a night.',
      questNotes:
        '[[quest.who-gets-the-light|Who Gets the Light]] is the city-changing job: broker an allocation after the blight and the galleries you cut go dark permanently, with their crops, trades and people gone from the city\'s economy for good. Feeding into it are three investigations a table can take in any order: the unreported duct collapse and the skimmed hours hiding it, the unregistered strain and what it is doing to the people eating it, and the undergraded nitre arriving from the Pans, which is the same fraud [[quest.pan-fever|Pan Fever]] is chasing from the other end.',

      services: [
        row({ name: 'Light petition', where: 'the Assembly floor, Sunwell Terraces', note: 'Heard monthly, weighted by inherited shares. Bring a share-holder or do not bother.' }),
        row({ name: 'Mirror hire and aiming', where: 'the Mirror Quarter', note: 'A jointed hand mirror, lawfully rented. What you point it at is your affair and the reeve\'s.' }),
        row({ name: 'Fever clay', where: 'the physic stall, Sump Works', note: 'Cultured karst clay, packed into a wound or swallowed against Drown marsh fever.' }),
        row({ name: 'Quietmilk surgery', where: 'the cutting room, Flush Galleries', note: 'The only dependable anaesthetic. The milkers are dosed to keep them working, and everyone knows.' }),
        row({ name: 'Blasting licence', where: 'the reeve\'s office', note: 'Nitre casks tracked by the barrel and the ounce. An unlicensed cask below the second terrace is a hanging.' }),
        row({ name: 'Soil registration', where: 'the Assembly clerk', note: 'Registers a made ground and its cudmother line. Without it your terrace is legally bare rock.' }),
      ],

      creatureNotes:
        '[[creature.mirror-swift|Mirror swifts]] fly the ducts by sound and nest in hardened saliva; their nests are a quota\'d luxury and their guano is a third of the city\'s nitrogen, which is why nest-poaching is punished as theft from the harvest rather than from a bird. The blind amphibian milked for [[material.quietmilk|quietmilk]] lives in the deep sumps and is farmed, badly. Karst pack-beasts supply [[material.cudmother|cudmother]] and are worth more alive than any three people who work them.',

      history:
        'The Assembly keeps its history as a list of ducts: who cut which shaft, in what year, and how many hours it still pays its heirs. That list is the constitution. What it does not record is who was farming the galleries before the first shaft was cut, which is a question the surface pastoralists raise at every Assembly and have never once had answered.',

      devNotes:
        'CANON: cave-based agricultural civilisation; mirror-ducted sunlight, terraced fungal and grain galleries; landmark the Sunwell Shaft; palette limestone cream, gold light, fungal violet. ' +
        PROPOSAL('The agronomy is worked out rather than implied: light by duct-hour with a forty-pace throw, soil manufactured from rock dust, chaff, dung and cudmother, nitrogen from swift guano, a night-soil rota and imported pan nitre, protein from sump carp, and no fruit at all because nothing pollinates in a cave. The load-bearing rule is that a dark season kills the cudmother and made ground takes four to nine years to rebuild, which makes light allocation a generational punishment rather than a monthly one.'),
      openQuestions: [
        'How deep does the deep rota go, and does the Assembly have a map of it at all?',
        'Is there a second cudmother line anywhere outside the karst, or is the export ban the only thing protecting the monopoly?',
        'What did the surface pastoralists lose when the first shaft was cut?',
        'Can the city grow anything that fruits, or has every attempt failed for the same reason?',
        'Who audits the nitre grade on arrival, and what would it cost to build an assay here?',
      ],
    },
  }),

  E({
    id: 'district.cave-agrarian-city-sunwell-terraces',
    type: 'district',
    name: 'The Sunwell Terraces',
    status: 'draft',
    summary: 'First-light galleries under the main shaft: barley, pulses, and the families who own the hours.',
    tags: ['agriculture', 'wealthy'],
    fields: {
      overview:
        'The top bedding plane, a quarter-league of terraces under the mouth of [[landmark.sunwell-shaft|the Sunwell Shaft]]. This is where [[food.mirror-barley|mirror barley]] is grown, where the Assembly sits, and where the share-holding houses live, which are three facts with one cause.',
      city: [CITY.caveAgrarian],
      districtType: 'Lit agriculture and government',
      wealth: 'Prosperous',
      atmosphere:
        'Warm, bright and oddly silent: no birds except the swifts, no wind, and barley that moves only when someone walks past it. The light shifts as the crown tracks, so the whole terrace changes colour through the day and everyone reads the hour off the wall rather than a clock.',
      architecture:
        'Limed vaults, polished stone aprons under each duct mouth, dry-laid terrace walls, and shutter frames everywhere. The Assembly floor is a plain hall with a mirror above the speaker\'s place, which is either symbolism or acoustics depending on who you ask.',
      whoLivesHere: 'Share-holding houses, Assembly clerks, first-terrace tenant farmers',
      danger: 'Low; the risk here is legal',
      playNotes:
        'Petitions are heard here and lost here. It is also the best place to see the rota as a physical thing: the duct mouths, the aprons, the shutters, and the aiming marks cut into the stone that tell a trained eye exactly how much light a gallery is meant to be getting and how much it is actually getting.',
      devNotes: 'The room where [[quest.who-gets-the-light|Who Gets the Light]] is finally decided.',
    },
  }),

  E({
    id: 'district.cave-agrarian-city-fourth-terrace',
    type: 'district',
    name: 'The Fourth Terrace',
    status: 'draft',
    summary: 'Half-light galleries of fodder and green manure, and one farmer growing something that is not on the list.',
    tags: ['agriculture', 'contraband'],
    fields: {
      overview:
        'The second bedding plane, at the edge of what a duct can usefully throw. Officially it grows fodder, green manure and the bitter pulse that goes into the barley rotation. Unofficially, half of it now eats [[npc.bedel-lehun|Bedel Lehun]]\'s violet grain-fungus, which yields double in half the light and is not on the city\'s registered list.',
      city: [CITY.caveAgrarian],
      districtType: 'Marginal agriculture',
      wealth: 'Modest, and slipping',
      atmosphere:
        'Dim gold at the duct ends and grey in the middle. People here talk about hours the way sailors talk about weather. Lately they also talk very fast, and sleep badly, and do not connect the two out loud.',
      architecture:
        'Terraces built long and narrow to sit inside the light throw, with lime-washed reflector walls at the dark end that fool nobody but help a little. Prop timber everywhere, most of it imported from the Greatwood.',
      whoLivesHere: 'Tenant farmers on marginal allocations, fodder growers, and the strain\'s quiet customers',
      danger: 'Moderate',
      playNotes:
        'The unregistered strain is the district\'s whole story: it is genuinely feeding people who would otherwise be short, and it is genuinely doing something to them. Registering it costs Bedel Lehun everything; suppressing it costs the terrace its calories; reporting it costs the terrace its allocation entirely, because the penalty falls on the ground, not the grower.',
      devNotes: 'Unusual biology with a cost, not a curiosity. The insomnia is the tell; what it becomes is left for the table.',
    },
  }),

  E({
    id: 'district.cave-agrarian-city-flush-galleries',
    type: 'district',
    name: 'The Flush Galleries',
    status: 'draft',
    summary: 'Dark fungus terraces on dung and chaff: the calorie floor of the city, and the lung rot that comes with it.',
    tags: ['agriculture', 'labour', 'dark'],
    fields: {
      overview:
        'The third plane, unlit and deliberately so. [[food.gallery-cap|Gallery cap]] flushes here on dung and milling chaff in three days, which is the reason the city can survive a failed barley harvest at all. The spore load is heavy enough that a flush worker who starts at fifteen is usually finished at forty.',
      city: [CITY.caveAgrarian],
      districtType: 'Fungal agriculture',
      wealth: 'Poor',
      atmosphere:
        'Violet in lamplight and black otherwise, warm from the composting beds, and thick. You taste the air before you notice you are breathing it. Everyone works masked, and the masks are not good enough.',
      architecture:
        'Rough rock, timber prop, tiered beds of compost, and curtain walls to keep the draught moving without drying the flush. The cutting room where [[material.quietmilk|quietmilk]] surgery is done sits at the head of the district because it is the one place with reliably still air.',
      whoLivesHere: 'Flush labour, compost crews, the city surgeon and the quietmilk licensee',
      danger: 'High, over years rather than minutes',
      playNotes:
        'Anything the city wants unseen ends up here: unlicensed strains, unlogged people, a body that needs to become compost. [[skill.spore-lore|Spore Lore]] is the entry ticket, and a party without it will make mistakes that show up in a fortnight rather than a scene. Also the place to hire a hundred people who have nothing left to lose, which the Assembly has been careful never to make necessary.',
      devNotes: 'The city\'s survival mechanism and its worst job are the same district. Keep both facts in play.',
    },
  }),

  E({
    id: 'district.cave-agrarian-city-sump-works',
    type: 'district',
    name: 'The Sump Works',
    status: 'draft',
    summary: 'Flooded sumps, blind carp, cisterns and the bailiffs who ration every head of water in the city.',
    tags: ['water', 'fisheries'],
    fields: {
      overview:
        'Where the resurgence enters the workings: cisterns, siphon heads, the mill race, and the flooded sumps that farm [[food.sump-carp|sump carp]] on milling waste. The bailiffs work from here, and so does most of the city\'s quiet politics, because a water head can be closed far more discreetly than a duct.',
      city: [CITY.caveAgrarian],
      districtType: 'Water, fisheries and milling',
      wealth: 'Modest',
      atmosphere:
        'Loud with water and cold enough to see your breath. The mill race never stops, so conversations here are private in a way they are nowhere else in the city, which everybody has worked out.',
      architecture:
        'Cut cisterns lined with [[material.tideset-cement|tideset cement]], timber sluice gates, siphon crowns, and the sump galleries themselves, which are natural and mostly unmapped below the working level.',
      whoLivesHere: 'Water bailiffs, carp keepers, millers, and the physic stall',
      danger: 'Moderate; high after surface rain',
      playNotes:
        'Surface rain floods the lowest workings within hours, and the warning does not reach the people down there. Poisoning, sabotage, smuggling and drowning all live in this district. It is also the only route into the deep galleries that does not pass a reeve, if you can swim a sump in the dark.',
      devNotes: 'Gives water the same mechanical weight as light without duplicating the rota.',
    },
  }),

  E({
    id: 'district.cave-agrarian-city-mirror-quarter',
    type: 'district',
    name: 'The Mirror Quarter',
    status: 'draft',
    summary: 'Surface silvering sheds and cleaving floors: forty people who can aim a duct, and the amalgam that kills them.',
    tags: ['craft', 'guild'],
    fields: {
      overview:
        'The only part of the city above ground, walled off around the shaft head. [[material.sunwell-mica|Sunwell mica]] arrives cleaved from [[deposit.lantern-beds|the Lantern Beds]] and is silvered here with tin amalgam under [[recipe.duct-mirror-resilvering|a ninety-day rotation]] that exists because of quicksilver poisoning and is honoured about two thirds of the time.',
      city: [CITY.caveAgrarian],
      districtType: 'Craft and workshop',
      wealth: 'Modest, well paid, short-lived',
      atmosphere:
        'Daylight, wind and the smell of hot amalgam. The silverers are recognisable at a distance by the tremor. They are also the highest-status labour in the city and know it, and the Assembly is careful with them in a way it is careful with nobody else.',
      architecture:
        'Low sheds with louvred roofs, the cleaving floor, the heliostat crown yard, and a walled compound around the shaft head that is the closest thing the city has to a fortification.',
      whoLivesHere: 'Mirrorwrights, silverers, cleavers, the winding watch, and licensed outside factors',
      danger: 'Moderate, chronic',
      playNotes:
        '[[npc.iratze-zubiate|Iratze Zubiate]] works from here and needs rope and bodies for a duct repair she has not reported. Forty people control two hundred mirrors, which makes this the one district that could bring the Assembly to terms and has never quite dared. Any plot about light allocation eventually has to come through this yard.',
      devNotes: 'Guild leverage without a guild entity: the mirrorwrights are a faction waiting to be written by someone else.',
    },
  }),

  E({
    id: 'district.cave-agrarian-city-deep-rota',
    type: 'district',
    name: 'The Deep Rota',
    status: 'draft',
    summary: 'Unlit galleries worked by debtors the Assembly stopped counting, on a rota nobody has seen written down.',
    tags: ['labour', 'dark', 'hidden'],
    fields: {
      overview:
        'The lowest worked plane, off the Assembly\'s published map. Households that fall into arrears in hours sign bodies down here against the debt, and the arrears have grown past the point of release. There is no light, no allocation and no register. The Assembly\'s own clerks put the population at four to seven thousand, which is a range, not a count.',
      city: [CITY.caveAgrarian],
      districtType: 'Debt labour',
      wealth: 'Destitute',
      atmosphere:
        'Absolute dark outside lamp reach, and warm. People here speak to locate each other. Shifts are called by a bell struck at the shaft head, and nobody down here can tell you what hour the bell means.',
      architecture:
        'Unfinished galleries, following the plane wherever it goes, propped where somebody thought to prop them. Compost beds and rock-dust mills, worked by feel. The one built structure is the tally house at the shaft foot.',
      whoLivesHere: 'Debtors signed down against arrears, and the overseers who were debtors first',
      danger: 'Extreme, and undocumented',
      playNotes:
        'Everything the city eats above the flush line depends on rock dust milled here, so this is not a hidden crime bolted onto the setting, it is the foundation the setting stands on. A party can map it, count it, free it, or simply prove it exists, and each of those does different damage. Releasing the arrears requires somebody to answer the Assembly\'s own argument: who feeds them the next morning.',
      devNotes:
        'Forced labour handled as institution and consequence. The horror is the missing register, and the fact that the argument against release is a real one.',
    },
  }),

  E({
    id: 'landmark.sunwell-shaft',
    type: 'landmark',
    name: 'The Sunwell Shaft',
    status: 'canon',
    summary: 'A lined well nine strides across dropping ninety to the first terrace, feeding two hundred ducted mirrors.',
    tags: ['landmark', 'infrastructure'],
    fields: {
      overview:
        'The city\'s central landmark and its power supply. A bored shaft nine strides across and ninety deep, lined in cut limestone, with a clock-driven heliostat crown at the head and two hundred silvered mica mirrors fanning out below it into the ducts.',
      city: [CITY.caveAgrarian],
      landmarkType: 'Light shaft and heliostat',
      built: 'The Assembly dates itself from the cutting of this shaft. The date is a claim about who owns the hours.',
      appearance:
        'From above, a walled yard, a turning crown of mirrors and a winding house. From the first terrace, a column of gold falling through dust with the barley lit underneath it, and a constant faint clicking from the drive as the crown tracks.',
      function:
        'Catches, folds and distributes daylight. The crown is wound by hand on a two-hour watch and stopped only for cleaning, because a stopped crown is an hour off every allocation in the city at once.',
      access:
        'The head is walled and guarded; the shaft has a maintenance ladder and a service stage. Climbing it without a mirrorwright is the sort of thing that gets counted as light theft on the way up and something worse on the way down.',
      devNotes: 'CANON: the Cave Agrarian City\'s central landmark is the Sunwell Shaft. Dimensions and the heliostat drive are proposals.',
    },
  }),

  E({
    id: 'landmark.the-nitre-vault',
    type: 'landmark',
    name: 'The Nitre Vault',
    status: 'draft',
    summary: 'The nitrogen bank: imported pan nitre stored dry under seal, guarded harder than any granary.',
    tags: ['landmark', 'strategic'],
    fields: {
      overview:
        'A dry-cut vault off the second plane where the city keeps its imported [[material.pan-nitre|pan nitre]]. It is fertiliser, glass flux and blasting charge in the same barrels, which is why it is the most heavily guarded room in the karst and why the reeve\'s office keeps its ledger by the ounce.',
      city: [CITY.caveAgrarian],
      landmarkType: 'Strategic store',
      built: 'Cut after the first year the terraces went short of nitrogen',
      appearance:
        'A double-curtained adit, a weighing floor, and racked barrels in rows on limestone platforms with drainage channels cut round them. Each barrel carries a Pale Assay grade stamp, and about one in nine of those stamps is currently disputed.',
      function:
        'Holds roughly a year of the terraces\' nitrogen and the whole of the city\'s licensed blasting stock. Withdrawals require two seals, and the second seal is the reeve\'s.',
      access: 'Two guarded curtains and a weighing floor. Nobody goes in alone, including the guards.',
      devNotes:
        PROPOSAL('Makes the nitrogen dependency physical and stealable, and ties the Sifting City\'s grading fraud directly to this city\'s harvest.'),
    },
  }),

  E({
    id: 'landmark.the-cold-mouth',
    type: 'landmark',
    name: 'The Cold Mouth',
    status: 'draft',
    summary: 'The main intake adit: where the city\'s air comes in, and where the exiled walk out.',
    tags: ['landmark', 'infrastructure'],
    fields: {
      overview:
        'The western intake, a natural adit widened and gated, through which most of the city\'s moving air arrives. Sixty paces from any working gallery is the rule, and the Cold Mouth is why that rule can be kept at all. It is also the door people are put out of, since exile here means being walked up the adit and left on the pavement.',
      city: [CITY.caveAgrarian],
      landmarkType: 'Ventilation adit',
      built: 'Natural; widened, gated and lined',
      appearance:
        'A slot in the pavement funnelling into a lined passage, with a permanent cold draught strong enough to lean on in winter and a rime of frost inside the gate for four months of the year. Draught vanes hang along the roof so the bailiffs can read the flow at a glance.',
      function:
        'Air. The city can lose light for a month and starve slowly; it can lose draught for nine days and not.',
      access: 'Gated and watched, and the gate is closed only in the drill nobody wants to run for real.',
      devNotes: TBD('If an enemy sealed the Cold Mouth, how long before the deep galleries are uninhabitable, and who is told first?'),
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Magic City                                                    */
  /* ---------------------------------------------------------------- */

  E({
    id: CITY.magicCity,
    type: 'city',
    name: 'The Magic City',
    workingTitle: true,
    aka: ['The Chained City'],
    status: 'draft',
    summary: 'A city held up by scheduled magic: rated bindings, licensed casters, nine chains on a fault, and two of them already dead.',
    tags: ['magic', 'licensed', 'infrastructure', 'anomaly'],
    fields: {
      epithet: 'The Chained City',
      overview:
        'Built on the lip of [[region.aetheric-scar|the Aetheric Scar]], where the ground stopped agreeing with itself and fourteen slabs of pavement were thrown out of true, four of them over the old town. The city did not move. It chained them.\n\nMagic here is not a wonder, it is plant. Every binding in the city carries a rated tonnage, an inspection date and a named licensed caster, posted publicly on [[landmark.the-load-roll|the Load Roll]] the way another city posts boiler certificates. [[faction.fetterhouse|The Fetterhouse]] issues the licences, marks the practitioners, sets the chain rota and decides, in effect, who burns out next. Everyone works to a schedule, everyone accrues [[mechanic.the-toll|Toll]], and everyone knows the schedule is running behind.',
      founded:
        'The Scar came first. The Fetterhouse dates the city from the first chain, which is the first thing anybody wrote down.',
      settlementType: 'Licensed magical city on an anomaly',

      region: [REGION.aethericScar],
      biome: 'Aetheric anomaly on shattered limestone pavement',
      terrain:
        'Displaced pavement. Slabs stand out of true by anything from a hand to nine strides, the largest forty strides on a side, and the streets run over, under and between them. The fault itself is an open gash through the middle of the city that is crossed at two gated places only.',
      climate: 'Cold, dry and still. What weather the Scar has of its own is disputed and badly recorded.',
      approach:
        'Ward-chalk white on slate blue, visible for a league: the chain lines first, then the chalked ward that rings the whole city, then the slabs, which do not look supported until you are close enough to see the links. Entry is by licence at one of four gates, and unlicensed casters are marked at the gate before they are admitted.',

      cityMapNote:
        'Angular fragments offset around a jagged void. The districts sit on displaced slabs and follow their edges, so nothing in the city is square to anything else, and the fault gorge in the middle is left empty because it is not survivable to build on.',
      districtCount: '6 mapped, of which one is legally condemned',
      cityMap: MAGIC_CITY_MAP,

      architecture:
        'Warded stone and chain. Slate-blue block laid in courses that ignore the slab angles, ward-chalk lines redrawn on every threshold on a sixty-day round, and iron: chain-bound spires, anchor blocks the size of houses, and links a stride across running out over the fault. Half the city is scaffolded at any moment. The characteristic sound is the chalk round, a scrape and a chant, going past your window before dawn.',
      silhouette: 'Tilted slabs and chain-bound spires, with links running out into an empty gorge.',
      palette: ['#3d5a72', '#eef1f2', '#7b6cc4', '#1e2733'],
      buildMaterials: ['material.ward-chalk', 'material.quenchspar', 'material.blister-bar'],

      landmarkName: 'The Bound Fault',
      landmarkDesc:
        'The gash itself, and the nine chains laid across it that carry the four slabs standing over the old town. Two of the nine are already dead and the city does not know which. See [[landmark.the-bound-fault|the Bound Fault]].',

      energy:
        'Coal, water and Toll. The kilns and the drawing shops burn imported fuel like any industrial town; what is peculiar here is that a measurable share of the city\'s work is done by licensed casters discharging into [[material.quenchspar|quenchspar]] sinks, and that share is metered, taxed and capped. [[material.levin-salt|Levin salt]] is grown in the vat sheds and is the only portable store of magical work anyone has, which is why it is weighed, sealed and taxed at every gate it passes.',
      infrastructure:
        'Four systems, all regulated. Bindings: rated, dated and posted on the Load Roll, recut on a sixty-day round that runs to forty in a wet season. Chains: nine across the fault, forged and replaced by the chain-smiths, held under load by the caster rota. Sinks: seven licensed [[skill.bleed-off|bleed-off]] houses and a burial yard for saturated quenchspar, buried at three strides and logged. Water: the Scar springs run warm and mildly charged, so every drop is stood three days in a quenchspar-lined cistern and tested before anyone drinks it.',
      keyMachines: ['machine.the-ward-kilns'],

      transport:
        'Stairs, ramps, hoists and two gated crossings. The slabs make wheeled traffic nearly useless above the gate ring, so goods move by hand-cart, chain hoist and porter, and the porters are organised, expensive and not to be crossed. Nothing heavy moves over a binding without a load ticket, because the ticket is what tells the chain-house the tonnage changed.',
      traversal:
        'Reading the city is a skill in itself: which slab is bound, when it was last recut, and which streets are under something rated for less than it is carrying. [[skill.chalk-hand|Chalk Hand]] lets a player read a line and judge how near it is to failing, which in this city is the difference between a shortcut and a headline.',

      government: 'Licensing authority (the Fetterhouse)',
      politicalLeaning: 'Technocratic, punitive, insurer-minded',
      ruler: ['faction.fetterhouse'],
      succession:
        'Seats on the Fetterhouse bench are taken by examination and held until failure, retirement or burnout. The bench is drawn from the chain rota, which means every person governing the city has personally held a chain, and every one of them knows what the rota does to the people on it.',

      laws:
        'The law is an inspection regime with a gallows attached. Every working must be metered, every practitioner marked and numbered, every binding rated and dated, and every discharge receipted. The theory is sound and the practice is that the register is the only thing the Fetterhouse can actually see: a working nobody logs is a working nobody can price, which is why [[skill.grey-casting|grey casting]] is prosecuted far harder than incompetence. Sentences run from fines to striking off, and striking off is a death sentence with a delay, since an unlicensed caster in this city cannot lawfully discharge.',
      enforcement: 'Fetterhouse wardens in numbered [[item.bound-harness|bound harness]]; the chain-house holds its own prisoners',
      extradition:
        'The Fetterhouse extradites practitioners aggressively and everyone else not at all. A struck-off caster is pursued across the continent because an unmetered practitioner is, in its view, an unexploded structure. Other cities cooperate, partly out of fear and partly because the Fetterhouse pays in [[material.ward-chalk|ward chalk]].',
      notableCrimes: [
        'Grey casting, that is working off the register (striking off; effectively capital)',
        '[[skill.toll-shunting|Toll shunting]] into another person (capital, without exception in law)',
        'Forging or backdating a permit (labour; the clerk who sells them has never been charged)',
        'Working a binding past its rated tonnage without a re-survey (capital if anything falls)',
        'Possession of unsorted [[material.faultglass|faultglass]] outside the deaf yard (capital)',
        'Breaking the ward line, or letting [[creature.chalk-louse|chalk lice]] into a chalk store (labour, and ruinous fines)',
      ],

      socialClasses: [
        row({ name: 'The Fetterhouse bench', share: 'Under 1%', note: 'Examiners and rota-setters. All former chain-holders, all visibly damaged.' }),
        row({ name: 'Licensed practitioners', share: 'About 5%', note: '1,140 on the roll, numbered on the collar. Paid extremely well and openly told what it costs.' }),
        row({ name: 'Ward trades', share: 'About 20%', note: 'Chalk hands, ward cutters, chain-smiths, load-binders, surveyors. The city\'s actual middle class.' }),
        row({ name: 'Kiln and vat labour', share: 'About 30%', note: 'Chalk burners and salt vat crews, rotated out on measured exposure rather than on hours worked.' }),
        row({ name: 'Unlicensed and struck-off', share: 'Uncounted', note: 'The Fetterhouse estimates as many as are on the roll. They still work, and they discharge nowhere lawful.' }),
        row({ name: 'Slab tenants', share: 'The rest', note: 'Everyone who simply lives here, under a binding they did not rate and cannot read.' }),
      ],

      population: '24,000 inside the ward line; 1,140 licensed casters',
      demographics: [
        row({ group: 'Scar-born', share: '58%', note: 'Grew up under the slabs. Read the Load Roll the way other people read the weather.' }),
        row({ group: 'Incoming practitioners', share: '14%', note: 'Came for the licence, because there is nowhere else to get one that other cities honour.' }),
        row({ group: 'Trade and kiln labour from the coast', share: '20%', note: 'Recruited for the kilns and the vats. Exposure records follow them for life.' }),
        row({ group: 'Ascent and Sky City factors', share: '8%', note: 'Here for chalk, salt and the coming concession auction. Housed near the gates.' }),
      ],
      languages: ['Scar speech, thick with register and inspection vocabulary', 'Trade cant at the gates and the vat sheds'],
      cultures: TBD('Is there a practitioners\' funeral rite for burnout, and does the Fetterhouse officiate at it?'),

      food:
        'Bought, all of it. Nothing planted on the Scar margin comes up in the right order, and the city long ago stopped trying: grain arrives from [[region.ascent-basin|the Ascent Basin]], tide rice up from the delta, salt fish and oil from the coast, and it is all paid for in chalk, salt and binding work. A blockade would not starve this city quickly, because the Fetterhouse keeps eight months in store, and it would end it eventually, which every negotiator on the continent knows.',
      water:
        'The springs run warm and taste wrong because they carry charge. Drunk fresh they raise a person\'s Toll baseline for days, so all drinking water is stood three days in quenchspar-lined cisterns, tested with a scribed pin, and only then run into the mains. Cistern liners saturate, and a saturated liner fails all at once and takes the cistern house with it, which has happened twice.',
      staples: ['food.stair-loaf', 'food.tide-rice'],

      economy:
        'A regulated magical utility with a city attached. It sells the three things nobody else can make lawfully: [[material.ward-chalk|ward chalk]] fired in a live fault field, [[material.levin-salt|levin salt]] grown in vats under ward, and the binding work of licensed casters. It buys food, fuel, iron and the ward marl it cannot dig itself. The books look magnificent and the liability side is not on them: the chain rota is a payroll denominated in human beings.',
      mainProduction: 'Ward chalk, levin salt and licensed binding work',
      currency: 'Stair writs, and the grain-weight of sealed levin salt, which is quoted daily',
      wealth: 'Prosperous',

      exports: ['material.ward-chalk', 'material.levin-salt', 'item.ward-pin', 'item.bound-harness', 'material.quenchspar'],
      imports: ['material.blister-bar', 'food.stair-loaf', 'food.tide-rice', 'material.scaldstone'],
      tradeNotes:
        'The awkward fact underneath the ledger: the marl that becomes ward chalk is cut from [[deposit.ward-marls|the Ward Marls]] on the Anvil Shelf, and the Fetterhouse has bought the annual cut years forward. The city that binds the continent is a standing debtor to a chalk supplier it does not control, and the supplier knows exactly what that is worth.',

      localResources: ['material.ward-chalk', 'material.levin-salt', 'material.quenchspar', 'material.faultglass', 'deposit.brine-sinks', 'deposit.cold-quarter'],
      resourceNotes:
        'Brine is drawn under ward from [[deposit.brine-sinks|the Brine Sinks]] and crystallised in vat sheds inside the city, where it can be weighed and taxed. [[deposit.cold-quarter|Quenchspar]] is sawn wet in winter only, in pairs, logged block by block and paid for by the block that does not shatter. [[material.faultglass|Faultglass]] is not refined at all, only sorted by ear, and the cutters who do it are deaf inside two years.',

      defense:
        'A chalked ward line the whole way round, four gates, and the plain fact that the city is standing on a hazard. There is no field army worth the name. What deters an attacker is that taking the city means holding the bindings, and holding the bindings means employing the same rota of licensed casters, who would then be working under new management on a schedule they already cannot meet.',
      doctrine:
        'Deny, meter, and threaten the ground. The wardens fight indoors and on stairs in numbered bound harness, and the standing plan against a serious force is [[spell.dead-ground|dead ground]] laid across the approach streets, which costs a fortune to lay and a second fortune to lift and turns off every working inside it including the defenders\'.\n\nThe Fetterhouse\'s real weapon is administrative: it can strike off every practitioner in a rival city\'s employ, and the other twelve settlements honour the roll because they have all seen what an unmetered caster does to a building. Nobody has yet tested what happens when a city decides it would rather have unlicensed magic than none.',
      garrison: '600 wardens, plus the chain rota, which cannot be spared for anything',

      factionNotes:
        '[[faction.fetterhouse|The Fetterhouse]] is the state, the guild and the insurer, and its warrant is the wards on the fault. Its weakness is arithmetic: the fault-chains are held by licensed casters burning out, and the licence roll is a rota of who burns next. [[faction.concord-of-weights|The Concord of Weights]] and [[faction.mooring-assize|the Mooring Assize]] are both circling [[quest.the-scar-concession|the coming concession auction]], and the Assize has the additional advantage of sitting on the ward marl. [[faction.low-tally|The Low Tally]] moves unsealed levin salt and sorted faultglass, which is the highest-value contraband on the continent by weight, and [[faction.pale-assay|the Pale Assay]] has crated ward-chalk turning up in the deep White Pans that nobody here has explained.',

      currentConflict: 'Two of the nine fault chains are dead and nobody will say which',
      problems: [
        'Adulterated ward chalk is assaying clean and failing under load; [[quest.the-chalk-that-lies|the batch has not been traced]]',
        'Chain links forged short of alloy for two years pass cold inspection and fail under sustained load',
        'The only person who knows which two chains are dead is imprisoned in the chain-house for knowing it',
        'A permit clerk\'s backdating has made prosecuting any caster in the city legally uncertain',
        '[[quest.the-scar-concession|The right to draw on the Bound Fault]] goes to auction for the first time in forty years',
        'The Lean was condemned after the last slippage and is fully reoccupied; its load roll has not been signed in four years',
        'A trade in human sinks operates at the edge of the licensed sink houses and is prosecuted selectively',
      ],

      cityRelations: [
        row({ city: 'The Sky City', stance: 'Creditor relationship, reversed', note: 'Holds the Anvil Shelf ward marl and has been paid years forward. Polite, and not equal.' }),
        row({ city: 'The Gilded Ascent', stance: 'Financier and auctioneer', note: 'The Scar concession is being auctioned on the Counting Stair, which tells you who really sets the price.' }),
        row({ city: 'The Mediterranean City', stance: 'Technical rivalry', note: 'The Conduit College believes engineering makes wards unnecessary. Both sides buy from each other anyway.' }),
        row({ city: 'The Sifting City', stance: 'Unexplained', note: 'Crated ward chalk with Magic City marks has turned up in the deep pans, hundreds of leagues off any sanctioned route.' }),
        row({ city: 'The Arena City', stance: 'Transactional', note: 'Sells dead ground for clean bouts and asks no questions about what the Ring does with a magic-off room.' }),
      ],

      signatureMechanic: 'Ward Load',
      mechanicNotes:
        '[[mechanic.ward-load|Ward Load]] treats structural magic as scheduled maintenance. Every binding carries a rated tonnage, a named caster and a recut date; exceed the tonnage or miss the round and the thing it holds comes down on the timetable, not dramatically. Players interact with it four ways: reading a line with [[skill.chalk-hand|Chalk Hand]], recutting it with [[skill.ward-cutting|Ward Cutting]], re-rating a structure with [[skill.load-binding|Load Binding]], or moving mass across the city and quietly changing somebody else\'s numbers.\n\nUnderneath it runs [[mechanic.the-toll|the Toll]]: every working accrues a physical debt, lawfully discharged by [[skill.bleed-off|Bleed-Off]] into a licensed quenchspar sink and receipted. The city\'s whole moral architecture is that lawful discharge is rationed by licence, so the unlicensed either stop working or find something else to discharge into, and the thing they find is usually a person.',

      npcNotes:
        '[[npc.ysme-drannik|Ysme Drannik]] is caged in the chain-house because she is the only living person who knows which two of the nine chains are dead, and the city would rather hold her than say the number aloud. [[npc.toval-cherek|Toval Cherek]] has been shorting the alloy on replacement links for two years to meet quota, knows exactly which sections carry his work, and cannot speak now without being blamed for the last slippage as well. [[npc.halvo-sarn|Halvo Sarn]] backdates permits for practitioners already caught, at a rising price, and keeps a private index of every forgery so that nobody he has saved can threaten him.',
      questNotes:
        '[[quest.the-chalk-that-lies|The Chalk That Lies]] starts the thread: an adulterated batch that assays clean and fails under load, traced back through the kilns and the marl before a bound district slips. It leads directly to [[quest.the-scar-concession|The Scar Concession]], where the right to draw on the fault is auctioned on the Counting Stair and the two losing bidders are left with capital, grievances and no legal supply. Around both sit the city\'s standing jobs: get Ysme Drannik\'s answer out of the chain-house, decide what to do about Toval Cherek\'s links, and follow the human-sink trade at the edge of the licensed houses to whoever is buying.',

      services: [
        row({ name: 'Licensed bleed-off', where: 'the seven sink houses, The Sinks', note: 'Priced per stone of Toll, receipted and stamped. The receipt is proof you were working lawfully.' }),
        row({ name: 'Chalk round', where: 'Chalk Row', note: 'A licensed hand recuts your lines on a sixty-day round. Miss it and your load roll lapses with it.' }),
        row({ name: 'Binding survey', where: 'any chain-house', note: 'A rated tonnage and a stamped date. Without one you have no insurer, no landlord and no defence.' }),
        row({ name: 'Faultglass sorting', where: 'the deaf yard, Under Slabs', note: 'Sorted by ear. Possession outside the yard is capital, here and in two other cities.' }),
        row({ name: 'Permit backdating', where: 'the ward office, unofficially', note: 'Rising price, no negotiation, and an index kept of every one sold.' }),
        row({ name: 'Cistern testing', where: 'the water office', note: 'Three days standing, a scribed pin, and a certificate. Uncertified water is sold cheap and drunk by people with no choice.' }),
      ],

      creatureNotes:
        '[[creature.chalk-louse|Chalk lice]] are the city\'s quiet catastrophe: a colonial insect that eats ward chalk and lime binder, voiding a ward overnight without leaving a mark anyone notices until the load moves. The chalk stores are inspected daily for them, and ground louse carapace is the base of the anti-magic powders the Fetterhouse would rather nobody else could buy. Otherwise the Scar is short of life, and what lives on it is worth reporting.',

      history:
        'Kept as a register rather than a chronicle: the first chain, the founding of the roll, the six slippages and their dates. The last of them dropped sixty strides of the western pavement by three strides in under a minute; the roll of the dead was closed at 211 names and everyone in the city knows it is short. Two chains went dead in that minute, and which two has been an official uncertainty ever since.',

      devNotes:
        'CANON: the magical city; warded stone, chain-bound spires, slabs held in place by force; landmark the Bound Fault; palette slate blue, ward-chalk white, cold violet. ' +
        PROPOSAL('Magic is written as regulated plant: rated tonnages, sixty-day chalk rounds, a public Load Roll, licensed bleed-off into quenchspar sinks with receipts, burial of saturated blocks, and a chain rota that is a payroll denominated in people. The two dead chains, the shorted alloy and the adulterated chalk are three independent failures converging on the same structure, which is the shape of an industrial accident rather than a curse.'),
      openQuestions: [
        'Which two chains are dead, and what does the Fetterhouse do the day it is forced to say so?',
        'What happens to the roll if a city decides it prefers unlicensed magic to none?',
        'Who is buying the human sinks, and is anyone on the bench aware of it?',
        'Why is crated Magic City ward chalk turning up in the deep White Pans?',
        'Can a binding be made permanent, and if so, who has been sitting on that and why?',
      ],
    },
  }),

  E({
    id: 'district.magic-city-chainhouse-ward',
    type: 'district',
    name: 'The Chainhouse Ward',
    status: 'draft',
    summary: 'Nine chain-houses along the fault lip: the rota, the bench, the Load Roll, and one prisoner.',
    tags: ['government', 'magic'],
    fields: {
      overview:
        'The band of slab along the fault\'s western lip, where the nine anchor blocks stand and the nine chain-houses were built over them. The Fetterhouse bench sits here, the rota is called here, and [[landmark.the-load-roll|the Load Roll]] is posted on the ward wall where anyone can read what is holding up their street.',
      city: [CITY.magicCity],
      districtType: 'Government and structural magic',
      wealth: 'Rich',
      atmosphere:
        'Quiet in a way that costs money. The chain-houses hum under load, faintly and constantly, and people who have worked here can tell you which house it is from the pitch. Shift changes are called by bell and watched by everyone within sight.',
      architecture:
        'Anchor blocks the size of houses, slate-blue coursework, and the chain-houses themselves: windowless, double-warded, with a caster\'s stall at the centre of each and a bunk room off it. The chalk on these thresholds is recut every twenty days rather than sixty.',
      whoLivesHere: 'The bench, chain-holders on rota, wardens, and Ysme Drannik in the fourth house cell',
      danger: 'Low to visitors, terminal to the people who work here',
      playNotes:
        '[[npc.ysme-drannik|Ysme Drannik]] is held in the fourth house and will trade the identity of the two dead chains for one specific name struck off a proscription list, and will not say why that name. The rota board is public and readable: cross-referenced against [[npc.toval-cherek|Toval Cherek]]\'s work sections, it tells a party exactly which chain fails next and roughly when.',
      devNotes: 'The city\'s single point of failure, deliberately made legible to players who do the reading.',
    },
  }),

  E({
    id: 'district.magic-city-chalk-row',
    type: 'district',
    name: 'Chalk Row',
    status: 'draft',
    summary: 'Kilns, mills and cake presses turning scar marl into licensed ward chalk, logged stick by stick.',
    tags: ['industry', 'licensed'],
    fields: {
      overview:
        'The chalk trade end to end: marl yards, [[machine.the-ward-kilns|the ward kilns]], the mills, the cake presses and the licensing office that stamps and logs every stick. This is where [[quest.the-chalk-that-lies|the adulterated batch]] either came from or passed through, and the difference is the investigation.',
      city: [CITY.magicCity],
      districtType: 'Industry and licensing',
      wealth: 'Modest, with a very rich office at one end',
      atmosphere:
        'White. Chalk dust on everything, in everything, and a taste of it at the back of the throat by the second hour. The burners work in a live fault field and are rotated out on measured exposure, so the yard is full of people counting down to a date.',
      architecture:
        'Chain-braced kilns, louvred drying sheds, mill houses and a stamping office with its own strongroom for the log books. The chalk stores are inspected daily for [[creature.chalk-louse|lice]], which is the least popular and most important job in the district.',
      whoLivesHere: 'Burners, millers, pressers, licensing clerks and the daily louse inspectors',
      danger: 'High for burners; moderate for everyone else',
      playNotes:
        'Every stick of lawful ward chalk on the continent is logged in this district, so the log books are the trail for the adulteration, the black-market sticks, and the crates turning up in the White Pans. Getting at them means either the strongroom or a clerk, and the clerks are watched because everyone knows they are the weak point.',
      devNotes: 'Head of the regulated-consumable chain: licence, dose log, black-market stick.',
    },
  }),

  E({
    id: 'district.magic-city-salt-vats',
    type: 'district',
    name: 'The Salt Vats',
    status: 'draft',
    summary: 'Vat sheds under ward where Scar brine is crystallised into levin salt, then weighed, sealed and taxed by the grain.',
    tags: ['industry', 'trade', 'taxed'],
    fields: {
      overview:
        'Brine comes in from [[deposit.brine-sinks|the Brine Sinks]] under ward and leaves as [[material.levin-salt|levin salt]], the only portable store of magical work anyone has. The vats are inside the city rather than at the sinks for one reason: so the salt can be weighed, sealed and taxed before it touches a road.',
      city: [CITY.magicCity],
      districtType: 'Refining and revenue',
      wealth: 'Prosperous',
      atmosphere:
        'A permanent violet glow off the vats after dark, brine on the air, and the constant low argument of a weighing floor. Crews work in short shifts and are searched going out, cheerfully and thoroughly.',
      architecture:
        'Long ward-lined vat sheds with chalked thresholds recut on a thirty-day round, a covered weighing floor, the seal office, and a bonded store with its own chain-house next door.',
      whoLivesHere: 'Vat crews, weighers, seal clerks, revenue wardens and a great many factors',
      danger: 'Moderate; high if you are carrying unsealed salt',
      playNotes:
        'Unsealed levin salt is contraband even where salt itself is legal, which makes this district the natural entry point for [[faction.low-tally|Low Tally]] work: a grain of difference between the vat weight and the seal weight is worth more than most cargoes. Legitimate parties come here to buy charge for a job and discover how much of it is paperwork.',
      devNotes: 'Ties the global magic economy to a taxable, stealable, weighable commodity.',
    },
  }),

  E({
    id: 'district.magic-city-the-sinks',
    type: 'district',
    name: 'The Sinks',
    status: 'draft',
    summary: 'Seven licensed bleed-off houses and a burial yard for saturated quenchspar, with a worse trade at the edges.',
    tags: ['magic', 'services', 'dark'],
    fields: {
      overview:
        'Where Toll is lawfully discharged. Seven licensed houses, each with quenchspar sinks, a receipting clerk and a queue; and behind them the burial yard, where saturated blocks are walked out and buried at three strides under a logged marker. At the district\'s ragged edge is the other trade, the one that uses people instead of stone.',
      city: [CITY.magicCity],
      districtType: 'Magical services and disposal',
      wealth: 'Poor, with money moving through it',
      atmosphere:
        'Cold, even for this city. The houses smell of hot stone and the yard smells of nothing at all. Discharging is not spectacular: a practitioner sits, a clerk writes, and someone comes out grey and shaking and goes home.',
      architecture:
        'Squat lined houses with sunken sink pits, a walled burial yard of numbered markers in rows, and a scatter of unlicensed rooms on the far side that are indistinguishable from the licensed ones apart from the absence of a clerk.',
      whoLivesHere: 'Sink keepers, receipting clerks, burial crews, and the struck-off who cannot use any of it',
      danger: 'Moderate; extreme at the district edge',
      playNotes:
        'The lawful use is a service players will want: a receipted bleed-off is proof of legal working and the only way to keep casting past a limit. The unlawful use is the campaign\'s hardest line. [[skill.toll-shunting|Toll shunting]] puts one person\'s debt into another body, and someone at the edge of this district is buying bodies for it. Write the victims: who they were, what they owed, what organ failed. The Fetterhouse prosecutes it selectively, which is itself the accusation, because the chain rota is the same transaction on a slower clock.',
      devNotes: 'Handle the human-sink trade with weight and consequence. It is an indictment of the licensing regime, not a set-dressing horror.',
    },
  }),

  E({
    id: 'district.magic-city-the-lean',
    type: 'district',
    name: 'The Lean',
    status: 'draft',
    summary: 'Condemned after the last slippage, reoccupied within a season, and its load roll unsigned for four years.',
    tags: ['condemned', 'residential', 'dark'],
    fields: {
      overview:
        'Three streets of slab that dropped and did not stop dropping. Condemned after the sixth slippage, cleared, and reoccupied within a season by people who had nowhere else, because rent under a lapsed binding is the cheapest rent on the continent. No surveyor has signed its load roll in four years and everyone here can tell you exactly how the floors slope.',
      city: [CITY.magicCity],
      districtType: 'Condemned residential',
      wealth: 'Destitute',
      atmosphere:
        'Everything is three degrees off true and your inner ear knows before your eyes do. Doors swing on their own. People here chalk their own thresholds badly, out of hope, and the chalk lines are the first thing an inspector would call evidence of unlicensed working.',
      architecture:
        'Sound building on unsound ground: propped facades, shored stairs, and a great deal of amateur chalk. The condemnation notices are still nailed up and have been written over.',
      whoLivesHere: 'The evicted, the struck-off, kiln labour with exposure records, and children born here since',
      danger: 'High and structural',
      playNotes:
        'The obvious job is to get a surveyor to sign the roll, which nobody will do because signing makes them liable. The better job is to find out why the district keeps moving when the slabs above it have not: the answer is upstream, in [[district.magic-city-chainhouse-ward|the chain-houses]], and it is the same two dead chains. Anyone wanting unlicensed work done in this city gets it done here.',
      devNotes: 'The consequence district. Every failure elsewhere in the city eventually shows up on these floors.',
    },
  }),

  E({
    id: 'district.magic-city-under-slabs',
    type: 'district',
    name: 'Under Slabs',
    status: 'draft',
    summary: 'The streets that run beneath four bound slabs: cheap, busy, loud with trade, and rated to the gram.',
    tags: ['commerce', 'residential'],
    fields: {
      overview:
        'The old town, still standing, still trading, with four displaced slabs held over it by chain and binding. Load notices are posted on every corner with the rated tonnage and the recut date, and the market prices under each slab track those dates almost perfectly. The deaf yard where [[material.faultglass|faultglass]] is sorted by ear sits at the eastern end.',
      city: [CITY.magicCity],
      districtType: 'Commerce and residence',
      wealth: 'Modest',
      atmosphere:
        'Permanent shade, permanent noise, and a habit everyone has of glancing up at a notice board without breaking conversation. Cheap rooms, good food, excellent porters, and a sharp trade in ward pins and second-hand harness.',
      architecture:
        'Pre-slippage building under a ceiling of stone: the old street plan intact, with chain anchors driven through it wherever the engineers had to, sometimes through the middle of a house.',
      whoLivesHere: 'Porters, traders, ward-trade families, faultglass cutters going deaf, and most of the city\'s children',
      danger: 'Moderate, and entirely dependent on paperwork',
      playNotes:
        'The best market in the city for [[item.ward-pin|ward pins]], [[item.chalked-harness|chalked harness]] and rumour. It is also the place where [[mechanic.ward-load|Ward Load]] becomes personal: a party that moves several tonnes of anything into a rented room here has changed a rated load, and the notice on the corner will not update itself.',
      devNotes: 'Where players live while working the city, so the mechanic is under their feet daily.',
    },
  }),

  E({
    id: 'landmark.the-bound-fault',
    type: 'landmark',
    name: 'The Bound Fault',
    status: 'canon',
    summary: 'The gash through the city and the nine chains laid across it, two of them already dead.',
    tags: ['landmark', 'anomaly', 'magic'],
    fields: {
      overview:
        'The city\'s central landmark: an open fault through the middle of the built-up ground, with fourteen displaced slabs on its lip and nine chains laid across it carrying the four that stand over the old town. Two of the nine are dead. Which two is officially uncertain and privately known to exactly one person.',
      city: [CITY.magicCity],
      landmarkType: 'Anomaly and structural binding',
      built: 'Not built. The chains were laid over three generations, the ninth within living memory.',
      appearance:
        'A gorge of shattered pavement, violet-lit from below in still weather, crossed by iron links a stride across that run from anchor blocks the size of houses. The chalk on the lip is recut every twenty days and is visible as a white line from the far side of the city.',
      function:
        'Holds the old town up, and holds the Scar\'s draw open. The right to draw on the fault is the most valuable licence on the continent and [[quest.the-scar-concession|goes to auction]] for the first time in forty years.',
      access:
        'Crossed at two gated places only. Entry into the fault itself is prohibited outright, and [[skill.fault-walking|walking it]] is timed in minutes and paid for in years.',
      devNotes: 'CANON: the Magic City\'s central landmark is the Bound Fault. Nine chains, two dead, and the concession auction are proposals.',
    },
  }),

  E({
    id: 'landmark.the-load-roll',
    type: 'landmark',
    name: 'The Load Roll',
    status: 'draft',
    summary: 'A public wall of dated plates: every binding in the city, its rated tonnage, its caster and its recut date.',
    tags: ['landmark', 'register'],
    fields: {
      overview:
        'The register wall on the ward face of the first chain-house. Every lawful binding in the city has a brass plate on it: number, rated tonnage, named caster, last recut, next due. It is deliberately public, because the Fetterhouse\'s whole theory of safety is that anybody standing under a slab should be able to read what is holding it.',
      city: [CITY.magicCity],
      landmarkType: 'Public register',
      built: 'Begun after the second slippage; extended after every one since',
      appearance:
        'Eleven hundred plates in rows, chalk-lined between them, with lapsed entries turned face-in rather than removed. The turned plates are the first thing anyone new to the city is taught to count.',
      function:
        'Liability, mostly. A signed roll entry is what makes a landlord insurable and a surveyor answerable, which is why nobody will sign for [[district.magic-city-the-lean|the Lean]].',
      access: 'Open to the street at all hours, watched, and defaced roughly twice a year.',
      devNotes:
        PROPOSAL('Turns the ward-load mechanic into a place players can visit and read. Turned plates are the visible measure of how far behind the city is running.'),
    },
  }),

  E({
    id: 'landmark.the-ninth-chain',
    type: 'landmark',
    name: 'The Ninth Chain',
    status: 'draft',
    summary: 'The newest chain, forged in one piece within living memory, and the only one whose alloy nobody disputes.',
    tags: ['landmark', 'engineering'],
    fields: {
      overview:
        'The last chain laid across the fault, and the only one forged in a single campaign to a single specification. It is the reference every other chain is argued against, which is inconvenient, because [[npc.toval-cherek|the chain-smith]] who has been shorting alloy on replacement links for two years learned his trade making it.',
      city: [CITY.magicCity],
      landmarkType: 'Chain and anchor works',
      built: 'Within living memory; the forging took a full year and closed the gorge crossings for all of it',
      appearance:
        'Links a stride across, black with oil, running out over the gorge from an anchor block cut into the slab itself. It is visible from most of the city and lit at night, which is a decision somebody made about morale.',
      function:
        'Carries the westernmost of the four bound slabs, under a holdfast binding that is repaid on a schedule posted on the Load Roll like everything else.',
      access: 'The anchor block is open ground and a common meeting place. The chain walk is licensed and short.',
      devNotes:
        PROPOSAL('Gives the city a monument that is also a control sample: the one chain whose quality is not in question, and therefore the standard that convicts the others.'),
    },
  }),
]

export const relations: SeedRelation[] = [
  /* The Tree City ---------------------------------------------------- */
  R(CITY.treeCity, 'located_in', REGION.greatwood),
  R(CITY.treeCity, 'contains', 'district.tree-city-crown-galleries'),
  R(CITY.treeCity, 'contains', 'district.tree-city-ninth-gallery'),
  R(CITY.treeCity, 'contains', 'district.tree-city-spanworks'),
  R(CITY.treeCity, 'contains', 'district.tree-city-sixth-quarter'),
  R(CITY.treeCity, 'contains', 'district.tree-city-pitch-yards'),
  R(CITY.treeCity, 'contains', 'district.tree-city-underroot'),
  R(CITY.treeCity, 'contains', 'landmark.bastion-bole'),
  R(CITY.treeCity, 'contains', 'landmark.the-black-span'),
  R(CITY.treeCity, 'contains', 'landmark.the-ash-ring'),
  R(CITY.treeCity, 'contains', 'machine.the-pitchworks'),
  R(CITY.treeCity, 'contains', 'machine.the-limb-press'),
  R('faction.pitchguard', 'controls', CITY.treeCity, 'martial law in name and in fact'),
  R('npc.aune-mustsalu', 'leads', CITY.treeCity, 'Bole-Marshal; holds the conscription rolls personally'),
  R('npc.saarik-rauda', 'located_in', 'district.tree-city-ninth-gallery', 'runs the press-gangs out of the muster yard'),
  R('npc.vetla-torvik', 'rival_of', 'faction.pitchguard', 'deserter; sells the run that bypasses every gate'),
  R(CITY.treeCity, 'produces', 'material.blackbole-timber', 'felled under licence, three centuries a trunk'),
  R(CITY.treeCity, 'produces', 'food.bole-mast', 'the siege reserve, on a four-to-seven-year calendar'),
  R(CITY.treeCity, 'controls', 'deposit.standing-fifty', 'every felling licence is a council vote'),
  R(CITY.treeCity, 'consumes', 'material.blister-bar', 'prod steel and fittings for laths and ballistae'),
  R('item.palisade-arbalest', 'crafted_at', CITY.treeCity),
  R('item.gallery-lath', 'crafted_at', CITY.treeCity),
  R('item.bastion-jack', 'crafted_at', CITY.treeCity),
  R('creature.bolewright-wasp', 'affects', CITY.treeCity, 'heart rot in six named boles; the reason felling orders exist'),
  R('creature.sentinel-tick', 'used_by', 'faction.pitchguard', 'worn behind the ear by scouts, at a daily bleed'),
  R(CITY.treeCity, 'related_to', 'mechanic.severance-drill', 'signature mechanic'),
  R(CITY.treeCity, 'related_to', 'skill.gallery-drill', 'taught to every conscript in the first year'),
  R('quest.the-felling-order', 'located_in', 'district.tree-city-sixth-quarter', 'eleven days, four hundred people'),
  R(CITY.treeCity, 'trades_with', CITY.gildedAscent, 'timber and charcoal out; grain and steel in'),
  R(CITY.treeCity, 'trades_with', CITY.mediterranean, 'charcoal for the Verdigris Hearth'),
  R(CITY.treeCity, 'trades_with', CITY.caveAgrarian, 'prop timber south, grain north when the mast fails'),
  R(CITY.treeCity, 'owes_debt_to', 'faction.concord-of-weights', 'grain advances against next season\'s licences'),
  R('faction.bondwrights-hall', 'trades_with', CITY.treeCity, 'buys timber-yard debts on with no published schedule', true),

  /* The Cave Agrarian City ------------------------------------------- */
  R(CITY.caveAgrarian, 'located_in', REGION.hollowKarst),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-sunwell-terraces'),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-fourth-terrace'),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-flush-galleries'),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-sump-works'),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-mirror-quarter'),
  R(CITY.caveAgrarian, 'contains', 'district.cave-agrarian-city-deep-rota'),
  R(CITY.caveAgrarian, 'contains', 'landmark.sunwell-shaft'),
  R(CITY.caveAgrarian, 'contains', 'landmark.the-nitre-vault'),
  R(CITY.caveAgrarian, 'contains', 'landmark.the-cold-mouth'),
  R(CITY.caveAgrarian, 'contains', 'machine.the-mirror-ducts'),
  R('faction.mirror-assembly', 'controls', CITY.caveAgrarian, 'allocates light and gallery tenancy on inherited shares'),
  R('npc.ossane-gorbea', 'leads', 'district.cave-agrarian-city-sunwell-terraces', 'light-tithe reeve; issues the hours'),
  R('npc.iratze-zubiate', 'located_in', 'district.cave-agrarian-city-mirror-quarter', 'keeps two hundred mirrors aligned by hand'),
  R('npc.bedel-lehun', 'located_in', 'district.cave-agrarian-city-fourth-terrace', 'grows an unregistered violet strain'),
  R('faction.mirror-assembly', 'controls', 'district.cave-agrarian-city-deep-rota', 'debtors it has stopped counting', true),
  R(CITY.caveAgrarian, 'produces', 'food.mirror-barley'),
  R(CITY.caveAgrarian, 'produces', 'food.gallery-cap'),
  R(CITY.caveAgrarian, 'produces', 'food.sump-carp'),
  R(CITY.caveAgrarian, 'produces', 'material.sunwell-mica'),
  R(CITY.caveAgrarian, 'produces', 'material.cudmother', 'export barred outright, and starters still leave'),
  R(CITY.caveAgrarian, 'produces', 'material.quietmilk'),
  R(CITY.caveAgrarian, 'controls', 'deposit.lantern-beds', 'cleaved by hand at the face, silvered above ground'),
  R(CITY.caveAgrarian, 'consumes', 'material.pan-nitre', 'nitrogen for the terraces; a year in the Nitre Vault'),
  R(CITY.caveAgrarian, 'consumes', 'food.terrace-citron', 'conserve against gum-rot, at a mark-up it cannot refuse'),
  R('creature.mirror-swift', 'inhabits', 'district.cave-agrarian-city-sunwell-terraces', 'nests quota\'d; guano is a third of the nitrogen'),
  R('item.sunwell-mirror', 'crafted_at', CITY.caveAgrarian),
  R('item.fever-clay', 'crafted_at', CITY.caveAgrarian),
  R('item.nitre-cask', 'sold_by', CITY.caveAgrarian, 'licensed for gallery cutting, tracked by the ounce'),
  R(CITY.caveAgrarian, 'related_to', 'mechanic.the-mirror-rota', 'signature mechanic'),
  R(CITY.caveAgrarian, 'related_to', 'skill.mirror-cutting', 'forty people can aim a duct; two hundred ducts'),
  R(CITY.caveAgrarian, 'related_to', 'skill.spore-lore', 'the flush galleries run on it'),
  R('quest.who-gets-the-light', 'located_in', CITY.caveAgrarian, 'the allocation that decides which galleries go dark for good'),
  R(CITY.caveAgrarian, 'trades_with', CITY.siftingCity, 'grain and mica for nitre; the grade stamp decides the harvest'),
  R(CITY.caveAgrarian, 'trades_with', CITY.mediterranean, 'quicksilver, tin, glass and citron conserve'),
  R(CITY.caveAgrarian, 'trades_with', CITY.oruvai, 'a highland factor, four visits a year, paid in advance in cut stone'),
  R('faction.low-tally', 'smuggles_with', CITY.caveAgrarian, 'cudmother starters and unregistered strains', true),

  /* The Magic City --------------------------------------------------- */
  R(CITY.magicCity, 'located_in', REGION.aethericScar),
  R(CITY.magicCity, 'contains', 'district.magic-city-chainhouse-ward'),
  R(CITY.magicCity, 'contains', 'district.magic-city-chalk-row'),
  R(CITY.magicCity, 'contains', 'district.magic-city-salt-vats'),
  R(CITY.magicCity, 'contains', 'district.magic-city-the-sinks'),
  R(CITY.magicCity, 'contains', 'district.magic-city-the-lean'),
  R(CITY.magicCity, 'contains', 'district.magic-city-under-slabs'),
  R(CITY.magicCity, 'contains', 'landmark.the-bound-fault'),
  R(CITY.magicCity, 'contains', 'landmark.the-load-roll'),
  R(CITY.magicCity, 'contains', 'landmark.the-ninth-chain'),
  R(CITY.magicCity, 'contains', 'machine.the-ward-kilns'),
  R('faction.fetterhouse', 'controls', CITY.magicCity, 'the wards on the Bound Fault are its warrant'),
  R('faction.fetterhouse', 'controls', 'landmark.the-bound-fault', 'nine chains, held on a rota of who burns next'),
  R('npc.ysme-drannik', 'located_in', 'district.magic-city-chainhouse-ward', 'caged in the fourth chain-house since the last slippage'),
  R('npc.toval-cherek', 'located_in', 'district.magic-city-chainhouse-ward', 'forges the replacement links, short of alloy'),
  R('npc.halvo-sarn', 'located_in', 'district.magic-city-chalk-row', 'permit clerk; backdates for a rising price'),
  R(CITY.magicCity, 'produces', 'material.ward-chalk', 'fired in a live fault field, logged stick by stick'),
  R(CITY.magicCity, 'produces', 'material.levin-salt', 'vat-grown, weighed, sealed and taxed by the grain'),
  R(CITY.magicCity, 'produces', 'material.quenchspar', 'sawn wet, in winter, in pairs'),
  R(CITY.magicCity, 'produces', 'material.faultglass', 'sorted by ear in the deaf yard'),
  R(CITY.magicCity, 'controls', 'deposit.brine-sinks'),
  R(CITY.magicCity, 'controls', 'deposit.cold-quarter'),
  R(CITY.magicCity, 'consumes', 'deposit.ward-marls', 'the annual Anvil Shelf cut, bought years forward'),
  R(CITY.magicCity, 'owes_debt_to', 'faction.mooring-assize', 'forward payment on ward marl it cannot dig itself'),
  R('item.ward-pin', 'crafted_at', CITY.magicCity),
  R('item.bound-harness', 'crafted_at', CITY.magicCity, 'numbered on the collar; the number is the licence'),
  R('item.chalked-harness', 'crafted_at', CITY.magicCity),
  R('item.faultstone-needle', 'crafted_at', CITY.magicCity),
  R('spell.holdfast-binding', 'used_by', CITY.magicCity, 'what keeps the slabs off the street'),
  R('spell.chalkline-ward', 'used_by', CITY.magicCity, 'the sixty-day round the whole city runs on'),
  R('spell.dead-ground', 'used_by', CITY.magicCity, 'the standing plan against a serious force'),
  R('creature.chalk-louse', 'affects', CITY.magicCity, 'voids a ward overnight, silently'),
  R(CITY.magicCity, 'related_to', 'mechanic.ward-load', 'signature mechanic'),
  R(CITY.magicCity, 'related_to', 'mechanic.the-toll', 'lawful discharge is rationed by licence'),
  R(CITY.magicCity, 'related_to', 'skill.load-binding', 'the profession that keeps the old town standing'),
  R(CITY.magicCity, 'related_to', 'skill.bleed-off', 'seven licensed sink houses, receipted'),
  R(CITY.magicCity, 'related_to', 'skill.grey-casting', 'prosecuted harder than incompetence'),
  R('quest.the-chalk-that-lies', 'located_in', 'district.magic-city-chalk-row', 'trace the batch before a bound district slips'),
  R('quest.the-scar-concession', 'involves', 'landmark.the-bound-fault', 'the right to draw, auctioned after forty years'),
  R(CITY.magicCity, 'trades_with', CITY.gildedAscent, 'chalk and salt out; the concession auctioned on the Stair'),
  R(CITY.magicCity, 'trades_with', CITY.skyCity, 'ward marl in, binding work out'),
  R(CITY.magicCity, 'rival_of', CITY.mediterranean, 'engineering against binding; both sides buy from each other'),
  R('faction.pale-assay', 'secretly_cooperates_with', CITY.magicCity, 'crated ward chalk in the deep pans, off any sanctioned route', true),
]
