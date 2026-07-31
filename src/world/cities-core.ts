/**
 * The three core cities: the Gilded Ascent, the Sky City and the Mediterranean City.
 *
 * These are the flagship gazetteer entries. The brief establishes each city's
 * function, siting, landmark and palette; everything below that line is a
 * proposal, and the real unknowns are recorded as questions rather than filled in.
 */

import { E, R, TBD, row, type CityMap, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* City maps                                                           */
/* ------------------------------------------------------------------ */

/** Stacked terraces climbing an escarpment away from a three-fork confluence. */
const ASCENT_MAP: CityMap = {
  w: 1000,
  h: 700,
  water: [
    [[0, 700], [0, 648], [210, 636], [470, 676], [760, 662], [1000, 646], [1000, 700]],
    [[0, 560], [86, 574], [168, 606], [206, 640], [120, 646], [40, 620], [0, 596]],
    [[1000, 548], [1000, 604], [904, 630], [812, 652], [790, 616], [860, 578]],
  ],
  walls: [
    [140, 336], [500, 332], [880, 336], [846, 266], [810, 202], [500, 196], [200, 202], [170, 266], [140, 336],
  ],
  roads: [
    [[500, 664], [500, 560], [430, 452], [520, 330], [430, 202], [500, 118]],
    [[760, 656], [760, 452], [742, 330], [700, 202]],
    [[62, 604], [200, 560], [430, 560], [700, 560], [960, 560]],
  ],
  districts: [
    {
      id: 'district.gilded-ascent-confluence-wharves',
      polygon: [[40, 560], [430, 560], [700, 560], [960, 560], [955, 610], [840, 655], [420, 668], [120, 640], [45, 600]],
    },
    {
      id: 'district.gilded-ascent-under-stair',
      polygon: [[40, 560], [430, 560], [440, 450], [240, 450], [90, 450], [62, 505]],
    },
    {
      id: 'district.gilded-ascent-hoist-yards',
      polygon: [[430, 560], [700, 560], [960, 560], [945, 505], [930, 450], [700, 450], [440, 450]],
    },
    {
      id: 'district.gilded-ascent-bonded-vaults',
      polygon: [[90, 450], [500, 450], [930, 450], [905, 390], [880, 330], [500, 330], [140, 330], [115, 390]],
    },
    {
      id: 'district.gilded-ascent-salt-office',
      polygon: [[140, 330], [500, 330], [880, 330], [845, 265], [810, 200], [500, 200], [200, 200], [170, 265]],
    },
    {
      id: 'district.gilded-ascent-counting-terrace',
      polygon: [[200, 200], [500, 200], [810, 200], [770, 130], [690, 80], [500, 62], [320, 80], [240, 130]],
    },
  ],
  landmarks: [
    { id: 'landmark.the-counting-stair', at: [500, 300] },
    { id: 'landmark.the-brass-standard', at: [452, 246] },
    { id: 'landmark.the-stopped-bell', at: [716, 498] },
  ],
}

/** A ring hung over a hole: five annular quarters around the updraft eye, and a smudge of ground below. */
const SKY_MAP: CityMap = {
  w: 1000,
  h: 700,
  walls: [
    [500, 85], [626, 105], [730, 163], [795, 247], [808, 345], [768, 438], [682, 510], [564, 550], [436, 550],
    [318, 510], [232, 438], [192, 345], [205, 247], [270, 163], [374, 105], [500, 85],
  ],
  roads: [
    [[500, 232], [568, 249], [609, 293], [609, 347], [568, 391], [500, 408], [432, 391], [391, 347], [391, 293], [432, 249], [500, 232]],
    [[500, 232], [500, 85]],
    [[609, 347], [768, 438]],
    [[391, 347], [232, 438]],
    [[500, 408], [500, 550], [500, 600]],
  ],
  districts: [
    {
      id: 'district.sky-city-crown-houses',
      polygon: [[500, 85], [626, 105], [730, 163], [795, 247], [609, 293], [568, 249], [500, 232]],
    },
    {
      id: 'district.sky-city-mooring-ring',
      polygon: [[795, 247], [808, 345], [768, 438], [682, 510], [568, 391], [609, 347], [609, 293]],
    },
    {
      id: 'district.sky-city-counterweight-quarter',
      polygon: [[682, 510], [564, 550], [436, 550], [318, 510], [432, 391], [500, 408], [568, 391]],
    },
    {
      id: 'district.sky-city-lattice-town',
      polygon: [[318, 510], [232, 438], [192, 345], [205, 247], [391, 293], [391, 347], [432, 391]],
    },
    {
      id: 'district.sky-city-the-underdeck',
      polygon: [[205, 247], [270, 163], [374, 105], [500, 85], [500, 232], [432, 249], [391, 293]],
    },
    {
      id: 'district.sky-city-shelf-foot',
      polygon: [[400, 600], [520, 592], [625, 610], [640, 660], [560, 682], [430, 676], [382, 640]],
    },
  ],
  landmarks: [
    { id: 'landmark.the-mooring-crown', at: [500, 320] },
    { id: 'landmark.the-sixth-mast', at: [742, 420] },
    { id: 'landmark.the-ballast-drop', at: [452, 528] },
  ],
}

/** An amphitheatre of terraces facing a bitten-out harbour: concentric arcs opening on the gulf. */
const MERIDIAN_MAP: CityMap = {
  w: 1000,
  h: 700,
  water: [
    [[370, 682], [417, 584], [500, 545], [583, 584], [630, 682], [630, 700], [370, 700]],
    [[0, 700], [0, 520], [36, 559], [120, 590], [203, 621], [287, 651], [370, 682], [370, 700]],
    [[630, 700], [713, 651], [797, 621], [880, 590], [964, 559], [1000, 520], [1000, 700]],
  ],
  walls: [
    [120, 590], [257, 304], [500, 189], [743, 304], [880, 590],
  ],
  roads: [
    [[287, 651], [364, 490], [500, 426], [636, 490], [713, 651]],
    [[500, 545], [500, 426], [500, 308], [500, 189], [500, 70]],
    [[0, 150], [204, 214], [420, 262], [500, 308]],
    [[203, 621], [311, 397], [500, 308], [689, 397], [797, 621]],
  ],
  districts: [
    {
      id: 'district.mediterranean-city-the-mole',
      polygon: [[287, 651], [364, 490], [500, 426], [636, 490], [713, 651], [630, 682], [583, 584], [500, 545], [417, 584], [370, 682]],
    },
    {
      id: 'district.mediterranean-city-conduit-yards',
      polygon: [[203, 621], [311, 397], [500, 308], [689, 397], [797, 621], [713, 651], [636, 490], [500, 426], [364, 490], [287, 651]],
    },
    {
      id: 'district.mediterranean-city-vault-quarter',
      polygon: [[120, 590], [257, 304], [500, 189], [500, 308], [311, 397], [203, 621]],
    },
    {
      id: 'district.mediterranean-city-orrery-precinct',
      polygon: [[500, 189], [743, 304], [880, 590], [797, 621], [689, 397], [500, 308]],
    },
    {
      id: 'district.mediterranean-city-terrace-groves',
      polygon: [[36, 559], [204, 210], [500, 70], [796, 210], [964, 559], [880, 590], [743, 304], [500, 189], [257, 304], [120, 590]],
    },
    {
      id: 'district.mediterranean-city-the-lazaret',
      polygon: [[60, 610], [130, 600], [175, 632], [168, 672], [100, 690], [48, 662]],
    },
  ],
  landmarks: [
    { id: 'landmark.the-tide-orrery', at: [648, 330] },
    { id: 'landmark.the-standing-aqueduct', at: [248, 246] },
    { id: 'landmark.the-mother-main', at: [356, 456] },
  ],
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE GILDED ASCENT                                                 */
  /* ================================================================ */

  E({
    id: CITY.gildedAscent,
    type: 'city',
    name: 'The Gilded Ascent',
    aka: ['The Stair', 'The Hub'],
    status: 'draft',
    summary: 'The continent\'s clearing house: eleven terraces of counting houses above the only confluence worth holding.',
    tags: ['trade', 'credit', 'core', 'canon-hub'],
    accent: '#b98b3a',
    fields: {
      epithet: 'The Stair',
      overview:
        'Three river valleys meet at the foot of a limestone escarpment, and a mountain pass leaves over the top of it. That is the whole explanation. Everything moving east to west has to change hulls at the confluence, everything moving north to south has to change animals at the pass, and the city grew on the eleven terraces in between because that is where the two changes can be made in one afternoon.\n\nThe Ascent grows almost nothing and digs almost nothing. What it sells is certainty: a weight you can trust, a warehouse that will still have your bales in it next spring, and a piece of sealed paper that a factor eleven days away will honour without seeing your face. [[item.stair-writ|Stair writs]] are the closest thing the continent has to money, and they are issued by private houses on the [[landmark.the-counting-stair|Counting Stair]], not by any government.\n\nThat is also the danger. The [[faction.concord-of-weights|Concord of Weights]] sets the clearing rate every ninth morning and nobody outside three rooms knows what backs it. The current answer is that four fifths of the reserve is lent against counterweight leases in [[city.sky-city|the Sky City]]. The hub of the continent is a confidence trick that has so far always been true by morning.',
      founded: TBD('Does the Ascent count years at all, or only ledger seasons since the first Stair charter?'),
      settlementType: 'Escarpment trading city, eleven terraces',

      region: [REGION.ascentBasin],
      biome: 'River grassland at a three-fork confluence',
      terrain:
        'The North Fork, the Karst Fork and the Shelf Fork join in a wide gravel pool, then leave east as the Long Water. The south bank rises in a limestone step 260 strides high, cut back into eleven worked terraces. The pass road climbs the escarpment shoulder to the west and is the only cart route over it for ninety leagues either way.',
      climate: 'Continental. Ice closes the forks for six weeks; dust and low water by high summer.',
      approach:
        'From the river you see cable first, not buildings: eight hoist runs going up the face, moving against each other like a slow loom. From the pass road you see the terraces edge-on, brass shutters on the upper storeys and the oxblood awnings of the counting houses, and you smell the wharves an hour before you reach them.',

      cityMapNote:
        'The map is drawn as a section flattened into a plan, because that is how the city is administered: rents, tariffs and law all vary by terrace, not by street. Bottom is the water, top is the money. Every district shares its upper edge with the district above it, and every one of those shared edges is a retaining wall with a gate in it.',
      districtCount: '6 mapped of an assessed 19 rated terraces and sub-terraces',

      architecture:
        'Pale limestone quarried out of the escarpment itself, so the city is built from the hole it stands in. Ground floors are vaulted warehousing with barrel doors wide enough for a bale sledge; upper floors are counting rooms with brass-shuttered windows facing the hoists, so a factor can watch his goods arrive. Oxblood is the sanctioned colour for awnings, coats and door paint on a chartered premises, and using it without a charter is a prosecutable fraud. Above the fourth terrace nothing is thatched and nothing is timber-framed: after the Seventh Terrace fire the Concord priced insurance so that stone was cheaper than the premium.',
      silhouette: 'Eleven stepped terraces under a crown of counting houses, strung across with eight cable runs',
      palette: ['#b98b3a', '#7a2230', '#e6dcc6', '#3a3128'],
      buildMaterials: ['material.stairwire', 'material.blister-bar', 'material.tideset-cement'],

      landmarkName: 'The Counting Stair',
      landmarkDesc:
        'A single roofed stone stair of 411 treads climbing all eleven terraces, with a clerk\'s alcove let into the wall at every landing. Contracts are read aloud on the tread they are signed on, and the tread number is written into the contract, because which landing a deal was struck on determines which court hears it when it fails. See [[landmark.the-counting-stair|the Counting Stair]].',

      energy:
        'Water and gravity, in that order. The three forks turn 40-odd undershot wheels along the wharf race, which drive the drum houses, the bale presses and the pumps. Above the wheels everything is counterweight: the [[machine.the-oxblood-hoists|Oxblood Hoists]] lift bonded freight by dropping tanks of river ballast down parallel shafts, and the water is pumped back up at night when the wheels have nothing else to do. Licensed [[spell.weight-lending|weight lending]] is used on the two heaviest runs to shave the ballast requirement, which is why the Ascent has a ballast-rights market at all and why a hoist murder is so hard to prove.',
      infrastructure:
        'A pressure main it did not build and does not fully understand, laid by [[city.mediterranean-city|Mediterranean]] fitters forty years ago and maintained under a renewable licence. Sewers that discharge below the confluence, which is a standing grievance downriver. A public fire cistern on every terrace above the fourth, inspected quarterly and used as collateral at least twice.',
      keyMachines: ['machine.the-tally-engine', 'machine.the-assay-cage', 'machine.the-oxblood-hoists'],

      transport:
        'Barges from the east on the Long Water, shallow lighters on all three forks, cart trains over the pass, and lift traffic to [[city.sky-city|the Sky City]] out of the eastern yard. Nothing crosses the city on wheels above the fourth terrace: goods go by hoist and people go by stair or by sedan chair, which is an occupation of about 900 men.',
      traversal:
        'A loaded porter can make the Counting Stair from wharf to crown in about fifty minutes and will do it four times a day for eleven years before his knees stop. Hoist passage is sold by the terrace and priced against the [[mechanic.standing-ledger|Standing Ledger]], so credit standing is literally how high in the city you can afford to be. [[skill.cable-and-drum|Cable and Drum]] gets you onto the maintenance ways, which are the only route that ignores the gate on every retaining wall.',

      government: 'Concord of chartered counting houses',
      politicalLeaning: 'Creditor oligarchy with elected trimmings',
      ruler: ['faction.concord-of-weights', 'npc.wessel-ondriek'],
      succession:
        'There is a Terrace Assembly, elected by rated householders, and it genuinely runs sewers, fire and the fairs calendar. It does not set the clearing rate, license factors, or hold the standard weights, and those three things are the government. Seats on the [[faction.concord-of-weights|Concord]] are held by houses rather than people, and a house votes its ledger: one vote per thousand in cleared paper. A house that stops clearing stops voting within a season, which is why houses will lend into a losing position rather than shrink.',

      laws:
        'Commercial law is elaborate, fast and genuinely fair, because the Ascent cannot sell certainty without it. Criminal law is an afterthought bolted onto debt. Almost every serious sanction resolves into a sum, and a sum you cannot pay resolves into a term of indenture registered in the Salt Office. The city does not think of this as a punishment regime. It thinks of it as accurate.',
      enforcement: 'Terrace wardens for public order; Concord bailiffs for everything that touches paper, and they outnumber the wardens three to one',
      extradition:
        'The Ascent extradites for debt and for forgery, cheerfully and quickly, on the strength of a sealed writ from any city that honours its own. It does not extradite for anything else without a hearing, which means fugitives from [[city.tree-city|Tree City]] conscription and [[city.arena-city|Arena City]] bond-holders both end up here, provided they arrive owing nobody anything. A [[spell.debt-mark|debt mark]] laid in another city is honoured at the gate as evidence but has no force here on its own.',
      notableCrimes: [
        'Cutting or recutting a factor\'s seal ([[item.cut-seal|cut seals]]) — the standard sentence is the loss of the right hand and the debt still stands',
        'Wearing an unearned [[item.oxblood-coat|oxblood coat]] with tallies you cannot evidence',
        'Carrying a spanned [[item.springlock|springlock]] on the Counting Stair',
        'Releasing [[creature.ledger-moth|ledger moths]] in a bonded archive, prosecuted as arson',
        'Signing a false weight against the [[landmark.the-brass-standard|Brass Standard]], which is the only capital offence on the books',
      ],

      socialClasses: [
        row({ name: 'Chartered houses', share: 'under 1%', note: 'Hold Concord votes, standard weights and the right to issue writs. Roughly forty families.' }),
        row({ name: 'Factors and clerks', share: '11%', note: 'Literate, salaried, sealed. Can bind a house to a contract and be ruined for it.' }),
        row({ name: 'Rated householders', share: '24%', note: 'Trades, carriers, innkeepers. Vote in the Terrace Assembly, which decides drains.' }),
        row({ name: 'Unrated labour', share: '48%', note: 'Porters, hoist crews, wharf hands. No vote, no bond, evicted upward or downward by rent.' }),
        row({ name: 'Registered indentured', share: '14%', note: 'Term recorded in the Salt Office. Cannot leave the basin until the term closes or is bought.' }),
        row({ name: 'Struck off', share: '2 to 3%', note: 'Defaulted and unrecoverable. Legally invisible, live in the Under-Stair, worked by nobody who keeps books.' }),
      ],

      population: '74,000 resident; 9,000 to 16,000 transient depending on the fair calendar',
      demographics: [
        row({ group: 'Basin-born', share: '52%', note: 'Two or more generations on the terraces. Overwhelmingly the clerical class.' }),
        row({ group: 'Karst and highland', share: '17%', note: 'Grain carriers and stone workers out of [[region.hollow-karst|the Hollow Karst]]; keep their own burial societies.' }),
        row({ group: 'River peoples', share: '15%', note: 'Barge families from the Long Water. Winter here, leave in spring, own nothing ashore.' }),
        row({ group: 'Coast and gulf', share: '9%', note: 'Mediterranean fitters, glass factors and their households, mostly on the sixth terrace.' }),
        row({ group: 'Steppe and pans', share: '7%', note: 'Arrived with the bond trade and stayed. The most heavily indentured group in the city.' }),
      ],
      languages: [
        'Basin speech, the administrative language, written in the ledger hand taught by the counting houses',
        '[[skill.trade-cant|Trade cant]] on every wharf and hoist yard, and in about a third of contracts below the fourth terrace',
        'Karst gallery dialect, mutually intelligible with basin speech after a fashion and not accepted in court',
      ],
      cultures: TBD('Does the Ascent have a religion of its own, or has commerce simply eaten the calendar? The fairs are the only observances the city keeps.'),

      food:
        'The basin feeds itself badly and buys the difference. Flood-meadow beef and river fish are local; bread grain comes down the Karst Fork from [[city.cave-agrarian-city|the cave galleries]] and up the Long Water from the coast. [[food.stair-loaf|Stair loaf]] is sold at every hoist landing and repriced each morning, and the loaf price is read by everyone in the city as the index of how bad things are about to get. Three days of a rising loaf and the Assembly starts cancelling licences to be seen doing something.',
      water:
        'Piped from a spring gallery in the escarpment to public cisterns above the fourth terrace, and carried by hand below it. Water rank tracks terrace rank exactly: the Counting Terrace drinks spring water, the wharves drink the confluence, and the confluence is downstream of the tannery race.',
      staples: ['food.stair-loaf', 'food.mirror-barley', 'food.adit-cheese'],

      economy:
        'The Ascent produces paper and moves other people\'s goods. Its four revenue streams are bonded warehousing, clearing commission, tariff farming on the pass road, and the interest on debt it did not intend to hold. Only the first is honest work.\n\nClearing is the load-bearing one. A factor in [[city.sifting-city|the Sifting City]] and a buyer in [[city.mediterranean-city|the Mediterranean City]] settle their business by two entries in the [[machine.the-tally-engine|Tally Engine]] here without a coin moving, and the Ascent takes a fraction of an eighth on the pair. The volume is enormous and the margin is thin, which means the houses can only grow by lending, which is exactly how the reserve got where it is.',
      mainProduction: 'Credit, clearing and bonded warehousing',
      currency: 'The stair writ, a sealed bearer note. Coin exists and settles nothing large.',
      wealth: 'Rich',

      exports: ['item.stair-writ', 'item.factors-seal', 'item.oxblood-coat', 'material.stairwire'],
      imports: ['material.blister-bar', 'material.scaldstone', 'material.glasscane', 'food.mirror-barley', 'food.meridian-olive', 'material.blackbole-timber'],
      tradeNotes:
        'The Ascent is a transhipment city and behaves like one: it taxes movement, not production, and it will fight a tariff war over a route it has never travelled. Its structural weakness is that it holds no commodity anyone needs. If two of the outer cities ever settled directly with each other at scale, the clearing commission would halve, and the Concord treats any bilateral clearing arrangement as a hostile act.',

      localResources: TBD('The basin has gravel, grazing, water and nothing else. Is "the hub produces nothing" a feature we keep, or does the escarpment hold a stone or mineral worth an entry?'),
      resourceNotes:
        'What the Ascent actually owns is the confluence and the pass, both of which it holds by charter rather than by force. The limestone of the escarpment is good building stone and poor lime, and the quarry faces behind the eleventh terrace are worked out. Every bar of steel, stick of ward chalk and length of [[material.stairwire|stairwire]] in the city arrived on someone else\'s cart.',

      defense:
        'The retaining wall of each terrace is a defensive work by accident: eleven walls, each with numbered gates that can be shut in about four minutes. The upper city has a proper curtain around the Counting and Salt terraces, built after the Seventh Terrace fire rather than after any siege. The lower city has no wall at all, on the reasoning that the wharves are the part you would want to leave to an attacker anyway.',
      doctrine:
        'The Concord does not maintain an army and is proud of it. It maintains three retained companies on standing contract through [[faction.red-writ|the Red Writ]], a warrant to raise porters as militia that has been used twice, and a policy of paying whoever is coming rather than fighting them. The doctrine is explicit in the charter: the city is worth more intact to any attacker than sacked, and the Concord\'s job is to make sure that stays arithmetically true.',
      garrison: '1,400 wardens and bailiffs; three retained Red Writ companies, about 900 blades, none quartered above the fourth terrace',

      factionNotes:
        'The [[faction.concord-of-weights|Concord of Weights]] is the government in all but name and knows it. The [[faction.bondwrights-hall|Bondwrights\' Hall]] writes and resells the indenture paper the Concord\'s judgments generate, and the two are so mutually dependent that a serious attack on either would take down both. [[faction.low-tally|The Low Tally]] runs the second ledger through the wharves and is tolerated because a certain volume of untaxed cargo keeps the honest price legible. [[faction.standing-hour|The Standing Hour]] is named for an hour that happened here, and its Ascent chapter is the most compromised in the movement: its strike fund takes Concord money and its stewards decide which strikes are allowed to win. [[faction.bonewax-post|The Bonewax Post]] keeps its largest sorting house on the fifth terrace, which means every private letter in the basin passes through one building.',

      currentConflict: 'Four fifths of the clearing reserve is lent out; one honest audit ends the hub',
      problems: [
        'The No. 3 main cable on the Oxblood Hoists failed inspection two seasons ago and was re-signed under pressure. It carries the grain lift to the upper terraces.',
        'A dead ledger-clerk\'s final audit names which houses bought salt licences before the tariff moved, and every house that profited assumes a rival already has it.',
        'The Standing Hour has called a terrace-wide stoppage twice this year and been bought off twice. The third time the stewards may not be able to sell it.',
        'Warehouse rents on the third and fourth terraces have doubled in four years, pushing bonded storage into buildings that were never rated for the load.',
        'The Concord is quietly buying the debts of other settlements, which is a policy nobody voted for and no charter authorises.',
      ],

      cityRelations: [
        row({ city: '[[city.sky-city|The Sky City]]', stance: 'Creditor and hostage', note: 'The Ascent lends against Sky City counterweight leases and lifts its food. Each believes it owns the other. Both are correct.' }),
        row({ city: '[[city.mediterranean-city|The Mediterranean City]]', stance: 'Uneasy partner', note: 'Buys precision goods it cannot make and sells clearing it cannot be denied. The port refuses to enforce Ascent indenture paper, which the Concord treats as theft.' }),
        row({ city: '[[city.cave-agrarian-city|The Cave Agrarian City]]', stance: 'Dependent supplier', note: 'Grain down the Karst Fork against advances on next year\'s light allocation. The Ascent is now the karst\'s largest creditor.' }),
        row({ city: '[[city.tree-city|The Tree City]]', stance: 'Cold', note: 'Charcoal and timber arrive; deserters and levy-dodgers arrive with them. The Ascent will not return them and says so politely once a year.' }),
        row({ city: '[[city.sifting-city|The Sifting City]]', stance: 'Correspondent', note: 'The grade stamp on Pan Nitre is priced here, not in the Pans, which is the Sifting City\'s standing grievance.' }),
        row({ city: '[[city.arena-city|The Arena City]]', stance: 'Transactional and quiet', note: 'Bond paper moves both ways. The Concord prefers this trade discussed by initials.' }),
        row({ city: '[[city.black-weir|The Black Weir]]', stance: 'Watchful', note: 'Everything the Ascent ships east passes the Weir Gates. Proposal-side: the Concord has no leverage there and hates it.' }),
      ],

      signatureMechanic: 'The Standing Ledger',
      mechanicNotes:
        '[[mechanic.standing-ledger|The Standing Ledger]] is the city as a system: a party has a public credit line at the Counting Stair, borrows against collateral, and buys access with it. Credit standing gates hoist passage, warehouse rating, which terrace you may hold a room on, and whether a bailiff bothers to knock. Interest accrues in real time on the campaign clock, not per quest. Default does not end in a fine, it ends in a term in the Salt Office register, and the register is enforceable in six other cities. The design intent is that money is a location: the higher your line, the higher in the city you can physically stand.',

      npcNotes:
        '[[npc.wessel-ondriek|Wessel Ondriek]] sets the clearing rate and cannot afford an audit; approach him as a man buying time in warehouse keys because he has no coin. [[npc.doret-halvane|Doret Halvane]] is the fixer in the hoist yards, and her price is not money. [[npc.brask-vellmar|Brask Vellmar]] signs off the cables and kept the samples that prove he was made to lie. [[npc.ilke-samarost|Ilke Samarost]] is dead at the foot of the Stair and her audit is plastered into a wall in the Under-Stair. Between them they cover the four pressure points: the rate, the yards, the cables and the archive.',
      questNotes:
        '[[quest.short-weight|Short Weight]] opens the guild line here and the desk a character accepts at the end of it decides which of the seven branches ever opens. [[quest.the-master-weight|The Master Weight]] is the theft branch and its mark is [[landmark.the-brass-standard|the Brass Standard]] under the Stair. [[quest.the-scar-concession|The Scar Concession]] is auctioned on the Stair and is the main thread\'s hinge. Smaller local work: recover Ilke Samarost\'s audit before the lodging is re-let, force or bury the No. 3 cable condemnation, and decide whether the third Standing Hour stoppage is bought off again.',

      services: [
        row({ name: 'Clearing and bearer notes', where: 'Counting Terrace, any chartered house', note: 'Issue and redemption of [[item.stair-writ|stair writs]]. Requires two sponsors or collateral at 140%.' }),
        row({ name: 'Bonded storage', where: 'The Bonded Vaults', note: 'Rated by load and fire class. A bond receipt is negotiable paper in its own right.' }),
        row({ name: 'Sealed assay and weight certification', where: '[[machine.the-assay-cage|The Assay Cage]], Salt Office', note: 'The only lawful place on the continent to set a reference mass. Waiting list of about five weeks.' }),
        row({ name: 'Hoist passage, bonded and unbonded', where: 'Hoist Yards, eight runs', note: 'Priced by terrace and credit standing. Unbonded freight waits behind bonded, always.' }),
        row({ name: 'Sealed courier', where: '[[faction.bonewax-post|Bonewax Post]] sorting house, fifth terrace', note: 'Trusted in all thirteen settlements. Assume every letter is copied.' }),
        row({ name: 'Indenture broking', where: '[[faction.bondwrights-hall|Bondwrights\' Hall]], fourth terrace', note: 'Legal, respectable, and the largest single employer of clerks in the city.' }),
        row({ name: 'Debt hearing and composition', where: 'Landings 3, 7 and 11 of the Counting Stair', note: 'Which landing your contract was signed on decides which court hears the default.' }),
      ],

      creatureNotes:
        'Nothing large lives in the city and that is deliberate: the Concord pays a bounty on dogs above a certain weight because bonded warehousing and vermin dogs do not mix. What the Ascent actually fears is [[creature.ledger-moth|the ledger moth]], whose larvae eat sized paper and iron-gall ink and almost nothing else. A jar released in the right archive is how debts disappear here, and every bonded vault above the third terrace runs cedar boxes, sealed lead and a paid moth-warden. The river brings the usual: eels in the race, and lamprey up from the Drown in the spring run, which the wharf families eat and the terraces will not.',

      history:
        'The consistent parts of the story: there was a ferry, then a bonded warehouse, then a weight everybody agreed to use, and the city is what grew on top of the weight. The Seventh Terrace fire is the only date every house agrees on, because it is the year insurance began and therefore the year the ledgers start. The Standing Hour is the other fixed point in living memory: the morning every hoist in the city stopped at once, which lasted nine hours and has shaped labour politics on three continents\' worth of cities since. What the Ascent was before it was a market is not recorded, and the Concord has never funded anyone to look.',

      devNotes:
        'CANON ANCHORS: the Gilded Ascent is the main trading hub; it sits at (1150,780) in the Ascent Basin where three river valleys meet a mountain pass; it is a terraced escarpment of counting houses and cable hoists; its landmark is the Counting Stair; its palette is brass, oxblood and pale limestone.\n\n' +
        PROPOSAL('Everything else here is proposed: the eleven terraces, the Concord as de facto government, the stair writ as continental currency, the reserve crisis, the Seventh Terrace fire and the Standing Hour. The load-bearing invention is that the hub sells certainty rather than goods, which makes its power entirely credit-based and therefore fragile in a way a player party can actually attack.'),
      openQuestions: [
        'Is the Ascent the largest city on the continent, or only the busiest? The current draft says busiest, with the Mediterranean City larger.',
        'Who physically holds the Brass Standard when it is not in the vault, and does the Concord know the answer?',
        'Does the Terrace Assembly have any power worth playing for, or is it purely scenery for a political quest?',
        'What happens to the continent if the clearing reserve is exposed? Needs a decided answer before the main thread ships.',
        'Does the city have a religion, a founding myth, or only a fairs calendar?',
      ],
      cityMap: ASCENT_MAP,
    },
  }),

  E({
    id: 'district.gilded-ascent-counting-terrace',
    type: 'district',
    name: 'The Counting Terrace',
    status: 'draft',
    summary: 'The eleventh terrace: forty houses, one stair, and the room where the clearing rate is set.',
    tags: ['wealth', 'government', 'finance'],
    fields: {
      overview:
        'The crown of the city and the smallest district in it. Forty chartered houses, a covered arcade running the full length of the terrace, the Concord chamber, and almost nothing else: no market, no inn licensed below the top rating, no workshop of any kind. Goods do not come up here. Paper does.',
      city: [CITY.gildedAscent],
      districtType: 'Financial and governmental',
      wealth: 'Opulent',
      atmosphere:
        'Quiet in a way the rest of the city finds unnerving. The loudest sound in the arcade on a working morning is the hoist bell from four terraces down and the scratch of pens. Every ninth morning the arcade fills at dawn, the rate is posted on a board the size of a door, and by the eighth hour it is empty again.',
      architecture:
        'Pale limestone, brass shutters, oxblood door paint, and colonnades deep enough that a factor can conduct a whole day\'s business without stepping into the sun. Each house presents a narrow street front and runs back thirty strides into the escarpment, so the real building is inside the rock and the frontage is a face.',
      whoLivesHere: 'Roughly 900 people: house principals, their households, and the senior clerks who are never allowed to leave',
      danger: 'Low, and lethal to your standing rather than your body',
      playNotes:
        'Social infiltration, not burglary. The arcade is where you learn the rate before the rest of the city does, which is worth more than most treasure. [[npc.wessel-ondriek|Wessel Ondriek]] keeps his chamber at the east end and can be reached by anyone who can plausibly claim to be lending, not borrowing. [[skill.the-cold-read|The Cold Read]] and [[skill.ledger-hand|Ledger Hand]] do more here than any weapon, and carrying a spanned [[item.springlock|springlock]] onto the terrace is an immediate arrest.',
      devNotes: PROPOSAL('The rate-setting ritual every ninth morning is invented, and is the mechanical hook: it gives players a fixed, repeating, high-value information event to attack.'),
    },
  }),

  E({
    id: 'district.gilded-ascent-salt-office',
    type: 'district',
    name: 'The Salt Office',
    status: 'draft',
    summary: 'Tariff, licence and indenture registry: the terrace where a person becomes a line in a book.',
    tags: ['bureaucracy', 'law', 'indenture'],
    fields: {
      overview:
        'Named for the salt tariff it was built to collect and now handling every licence the city issues: factors, weights, blasting casks, cable inspection, warehouse fire ratings, and the indenture register. Four buildings, 1,100 clerks, and the [[machine.the-assay-cage|Assay Cage]] in a windowless annexe at the back with its own guard.',
      city: [CITY.gildedAscent],
      districtType: 'Administrative',
      wealth: 'Comfortable',
      atmosphere:
        'Queues that form before dawn and are still there at dusk, a smell of ink and wet wool, and a hundred small windows at which someone is being told to come back with a different piece of paper. It is not corrupt so much as purchasable at a known and stable price, which the clerks consider a form of honesty.',
      architecture:
        'Deliberately plain: unpainted limestone, no arcade, no brass. The Concord built it to look like an instrument rather than a palace. The indenture register is in a fireproof strongroom under the second building, lead-lined against [[creature.ledger-moth|ledger moths]], and the strongroom is the most heavily defended structure in the city that is not a vault.',
      whoLivesHere: 'Clerks, licence brokers, writ-drafters, and the professional queuers who sell their place at the window',
      danger: 'Low. The risk here is paperwork you cannot undo.',
      playNotes:
        'Everything legal starts or dies here. [[skill.writ-craft|Writ Craft]] to file something that survives a hostile clerk; [[skill.false-proof|False Proof]] to make it survive a second inspection. [[npc.ilke-samarost|Ilke Samarost]] worked here before she went off the Stair, and her desk has been reassigned twice. Burning the indenture register would free several thousand people on paper and start an immediate fight over who owns them in fact, which is the argument the Concord uses to explain why it never burns.',
      devNotes: PROPOSAL('The Salt Office is invented but the name is load-bearing: it ties Ilke Samarost\'s salt-licence audit to a physical building players can enter.'),
    },
  }),

  E({
    id: 'district.gilded-ascent-bonded-vaults',
    type: 'district',
    name: 'The Bonded Vaults',
    status: 'draft',
    summary: 'Eight hundred rated warehouses cut into the escarpment; the physical fact underneath all the paper.',
    tags: ['warehousing', 'trade', 'bonded'],
    fields: {
      overview:
        'The third and fourth terraces, almost entirely warehousing. Around 800 rated vaults, each with a number, a fire class, a load rating and a bond receipt that trades independently of whatever is inside. Perhaps a fifth of the goods in the vaults have changed owner three times without moving a bale.',
      city: [CITY.gildedAscent],
      districtType: 'Warehousing',
      wealth: 'Mixed: the buildings are rich, the people in them are not',
      atmosphere:
        'Cool, dark, enormous. Barrel doors standing open on to loading floors, bale sledges grinding on limestone, and the constant clatter of tally sticks. Every vault has a keeper who lives in a cell beside the door and is answerable for the contents with his liberty.',
      architecture:
        'Vaults driven back into the rock and faced with a stone front, so the district looks like a street of doors with no buildings behind them. Load ratings are cut into the lintel and repainted after every re-survey. The two upper courses of the fourth terrace were never rated for their current load, and it shows in the cracking above vault 611.',
      whoLivesHere: 'Vault keepers, bale crews, tally clerks, and the bonded families who cannot leave the terrace while a term runs',
      danger: 'Moderate. Falling loads, fire, and the people who want what is inside.',
      playNotes:
        'The classic heist district, but the interesting crime is not theft, it is substitution: swap the goods and leave the bond receipt honest and nobody discovers it for a season. [[npc.doret-halvane|Doret Halvane]] holds wax impressions of sixty-odd bonded keys taken over twelve years of legitimate inspections. Overloaded vaults on the fourth terrace are a live structural hazard and a good disaster to hang on a failed quest.',
      devNotes: PROPOSAL('The rated-vault system and the negotiable bond receipt are proposed, and they are what make warehousing a financial instrument rather than set dressing.'),
    },
  }),

  E({
    id: 'district.gilded-ascent-hoist-yards',
    type: 'district',
    name: 'The Hoist Yards',
    status: 'draft',
    summary: 'Eight cable runs, four drum houses and the ballast shafts: everything that goes up, goes up from here.',
    tags: ['industry', 'labour', 'machines'],
    fields: {
      overview:
        'The working eastern half of the second terrace: drum houses, ballast shafts, splice sheds, cable stores, and the yards where freight is weighed, bonded and queued. The [[machine.the-oxblood-hoists|Oxblood Hoists]] run from here, and so does the lift traffic to [[city.sky-city|the Sky City]]. The yards employ about 6,000 people and kill between nine and fourteen of them a year.',
      city: [CITY.gildedAscent],
      districtType: 'Industrial and transport',
      wealth: 'Poor, with well-paid specialists',
      atmosphere:
        'Deafening. Drum brakes, bells, the whistle codes that run the cable traffic, and the slow rush of ballast water going down the shafts. Everyone in the yards can read the bells and nobody can hear anything else. The [[landmark.the-stopped-bell|Stopped Bell]] hangs at the yard gate and is not rung.',
      architecture:
        'Timber-framed sheds on stone pads, a forest of sheave frames, and the four drum houses, which are the only round buildings in the city. Condemned [[material.stairwire|stairwire]] is everywhere: fencing, guy lines, washing lines, and a thriving second market that everybody knows is a slow accident.',
      whoLivesHere: 'Hoist crews, splicers, inspectors, ballast hands, and the fixers who work the gate',
      danger: 'High. A parted cable takes out the shed it lands in.',
      playNotes:
        'The pressure point of the whole city. [[npc.brask-vellmar|Brask Vellmar]] has the strand samples that condemn the No. 3 main; [[npc.doret-halvane|Doret Halvane]] can find anyone here for the price of an inspection. Forcing the condemnation stops the grain lift to the upper terraces within a day, which is a city-scale lever a party can pull deliberately or by accident. [[skill.cable-and-drum|Cable and Drum]] is the entry skill for everything in the district.',
      devNotes: PROPOSAL('Eight runs, four drum houses and the annual death count are invented figures, chosen so the cable question has a body count attached rather than being an abstraction.'),
    },
  }),

  E({
    id: 'district.gilded-ascent-under-stair',
    type: 'district',
    name: 'The Under-Stair',
    status: 'draft',
    summary: 'The arched undercroft of the second terrace: lodgings for people the ledgers have stopped counting.',
    tags: ['poverty', 'crime', 'dark'],
    fields: {
      overview:
        'The retaining arches of the second terrace were never meant to be lived in. They are 40 strides deep, dry at the back, and were let as storage until storage moved uphill; now each arch is partitioned into six to nine lodgings with a shared standpipe at the mouth. Between 6,000 and 9,000 people live under the arches, and the Assembly\'s own survey stopped counting after the fourth arch because the number was politically unusable.',
      city: [CITY.gildedAscent],
      districtType: 'Slum',
      wealth: 'Destitute',
      atmosphere:
        'Permanent half-dark, permanent noise overhead from the stair traffic, and a rent collector who comes on the ninth morning because that is when the rate is posted. Warm in winter, which is the one honest advantage, and lethal in a flood year.',
      architecture:
        'Limestone arches with lath partitions, scavenged shutters and a great deal of condemned cable holding things to other things. Nothing is fireproof and nothing is rated. The city\'s fire cisterns begin on the terrace above.',
      whoLivesHere: 'The struck-off, discharged bond holders, barge families ashore for the winter, and anyone one bad season from either',
      danger: 'Moderate to high, and it rises the further back into the arch you go',
      playNotes:
        'Where a defaulted party actually ends up, which is why the Standing Ledger has teeth. [[npc.ilke-samarost|Ilke Samarost]]\'s final audit is plastered into the wall of her old lodging here, now let to a family who do not know and would be evicted for the discovery. [[faction.standing-hour|The Standing Hour]] recruits in the third and fourth arches and its Ascent stewards drink at the mouth of the sixth. Handle the district as people with a wage problem, not as a monster den.',
      devNotes: PROPOSAL('The undercroft lodgings are invented. Design intent: the debt mechanic needs a visible bottom of the map, and the bottom needs to be a neighbourhood with named people in it, not a hazard tile.'),
    },
  }),

  E({
    id: 'district.gilded-ascent-confluence-wharves',
    type: 'district',
    name: 'The Confluence Wharves',
    status: 'draft',
    summary: 'Three forks, eleven staiths, and the second ledger working in plain sight between them.',
    tags: ['river', 'trade', 'smuggling'],
    fields: {
      overview:
        'The gravel spit and stone staiths where the North, Karst and Shelf forks meet. Everything entering the city from the water lands here and is weighed at the fork-head scales before it goes anywhere near a hoist. Eleven staiths, four of them chartered, three of them silted and worked anyway.',
      city: [CITY.gildedAscent],
      districtType: 'Port and market',
      wealth: 'Modest and volatile',
      atmosphere:
        'The only part of the city that is genuinely crowded. Barge families, carriers, tally clerks with wet feet, fish, tar, hot bread, and the three-tone whistle that means the fork-head scale is disputed again. Business is conducted in [[skill.trade-cant|trade cant]] and a great deal of it is not written down at all.',
      architecture:
        'Stone staiths, timber staging, tarred sheds, and the winter town of moored barges that becomes a district of its own between the freeze and the thaw. The tannery race runs in at the western end and everybody knows it.',
      whoLivesHere: 'Bargefolk, wharf crews, scale clerks, fences, and a lot of people between two arrivals',
      danger: 'Moderate. Drowning, crush injuries, and the fourth staith after dark.',
      playNotes:
        'The obvious entry point to the city and to [[faction.low-tally|the Low Tally]], which runs untaxed cargo through the silted staiths on the reasoning that a scale that does not exist cannot be disputed. Good ground for [[skill.fence-work|Fence Work]], for meeting a barge crew who will not ask questions, and for the first inkling that the Low Tally\'s most profitable cargo is no longer goods. [[creature.blackrun-lamprey|Blackrun lamprey]] come up in the spring run and the wharf families eat well for three weeks.',
      devNotes: PROPOSAL('Eleven staiths and the fork-head scale are proposed. The scale matters mechanically: it is the lawful weighing point, so smuggling here is about avoiding a specific building.'),
    },
  }),

  E({
    id: 'landmark.the-counting-stair',
    type: 'landmark',
    name: 'The Counting Stair',
    status: 'draft',
    summary: 'A roofed stone stair of 411 treads climbing all eleven terraces; the tread you sign on decides your court.',
    tags: ['canon-landmark', 'law', 'trade'],
    fields: {
      overview:
        'The city\'s spine and its central landmark. A covered stair running from the wharf head to the Counting Terrace, with a clerk\'s alcove let into the wall at each of the eleven landings. It is a stair, a courthouse, a market and an address system at once: a Stair address is a tread number, and everyone in the basin can read one.',
      city: [CITY.gildedAscent],
      landmarkType: 'Civic stair and contract court',
      built: TBD('Was the Stair cut all at once or terrace by terrace? The tread numbering restarts twice, which suggests the second.'),
      appearance:
        'Pale limestone treads worn into a shallow dish down the centre line, roofed the whole way in tile on stone piers, open at the sides so the hoists stay visible. Every fortieth tread is inlaid with a brass number. The roof is oxblood underneath and grey above, which is the only place in the city those two colours meet.',
      function:
        'Contracts are read aloud on the tread where they are signed, and the tread number is written into the contract, because the landing above determines which court hears the dispute. Landings 3, 7 and 11 are the three commercial courts, in ascending order of the sums they will hear. Below tread 40 nothing is enforceable in writing at all, which is why the wharf trade is conducted on a handshake and why the Low Tally does its business there.',
      access:
        'Public and never closed, though the gates on the retaining walls at landings 5 and 9 are shut at night and require a terrace pass. Weapons above landing 7 are limited to what a warden will tolerate, and a spanned [[item.springlock|springlock]] anywhere on the Stair is an immediate arrest. [[npc.ilke-samarost|Ilke Samarost]] was found at the foot of it fourteen months ago and the fall was never seriously investigated.',
      devNotes:
        'CANON ANCHOR: the Counting Stair is the Gilded Ascent\'s central landmark. ' +
        PROPOSAL('The 411 treads, the eleven landings, the tread-number jurisdiction rule and the tread-40 threshold are all proposed. The jurisdiction rule is the one worth keeping: it turns a piece of architecture into a legal mechanic players can exploit by choosing where to sign.'),
    },
  }),

  E({
    id: 'landmark.the-brass-standard',
    type: 'landmark',
    name: 'The Brass Standard',
    status: 'draft',
    summary: 'The reference mass every scale on the continent is set against, in a sealed room under the Stair.',
    tags: ['trade', 'vault', 'quest-target'],
    fields: {
      overview:
        'A set of eleven brass reference masses in a temperature-stable chamber cut into the rock beneath the fourth landing of the Counting Stair. Every certified weight in every honest market between the coast and the Pans is ultimately set against these, by way of the [[machine.the-assay-cage|Assay Cage]] and a chain of sealed copies.',
      city: [CITY.gildedAscent],
      landmarkType: 'Standards vault',
      built: TBD('Where did the original masses come from? The Concord\'s own account says they were bought, which raises the question of who made them.'),
      appearance:
        'A low vaulted room, dry, unheated and unlit except when in use, with the masses on a stone bench under glass covers. Each is a plain cylinder with a lifting knob and a cut serial. There is nothing decorative about any of it, which is precisely why the sight of it unnerves people.',
      function:
        'The masses are used perhaps forty times a year, to certify the sealed copies that the Assay Cage issues. Between certifications the chamber is sealed with three separate marks, held by three houses who are not permitted to be in the room together.',
      access:
        'Two keys, three seals, a warden at the outer door and a bailiff at the inner. It is not built to resist an army; it is built so that no one person can enter alone, which is a different and harder problem. This is the mark in [[quest.the-master-weight|The Master Weight]], and the point of that quest is that a false standard skims a fraction off every transaction weighed against it until someone re-assays.',
      devNotes: PROPOSAL('The Brass Standard is a proposal built to give quest.the-master-weight a physical location. Eleven masses matches the eleven terraces, which the Concord will tell you is a coincidence.'),
    },
  }),

  E({
    id: 'landmark.the-stopped-bell',
    type: 'landmark',
    name: 'The Stopped Bell',
    status: 'draft',
    summary: 'The hoist bell that rang the hour every cable in the city stopped; the clapper was removed and never replaced.',
    tags: ['labour', 'memorial'],
    fields: {
      overview:
        'A yard bell on a stone post at the gate of the Hoist Yards, cast for signal work and used for it until the morning the cables stopped. The clapper was taken out the following week by order of the Concord and has not been put back. [[faction.standing-hour|The Standing Hour]] takes its name from that morning and its stewards still meet within sight of the post.',
      city: [CITY.gildedAscent],
      landmarkType: 'Memorial and gathering point',
      built: TBD('How long ago was the Standing Hour? The movement has spread to every trading city, which suggests longer than one generation.'),
      appearance:
        'Waist-high stone post, iron cradle, a bronze bell about the size of a bucket with a green weathered lip. No inscription. Someone repaints the cradle every spring and nobody has ever been caught doing it.',
      function:
        'Formally nothing. In practice it is where the yards gather when a decision has to be taken, where strike votes are counted, and where the yard reads its own dead at the end of the season. Standing on the plinth to speak is a claim that the yards, not the stewards, are deciding.',
      access:
        'Public, in the open, watched. The Concord has twice proposed removing it and twice been advised by its own bailiffs that removing it would cause the thing it commemorates.',
      devNotes: PROPOSAL('The bell and the removed clapper are invented, to give the Standing Hour a physical anchor in the city that named it. Deliberately undated so history authors can place the event.'),
    },
  }),

  /* ================================================================ */
  /* THE SKY CITY                                                      */
  /* ================================================================ */

  E({
    id: CITY.skyCity,
    type: 'city',
    name: 'The Sky City',
    aka: ['The Ring', 'The Crown'],
    status: 'draft',
    summary: 'A tension ring held over a standing thermal, rich on lift rights, and mortgaged to the city below it.',
    tags: ['wealth', 'aerial', 'canon-wealthy', 'lattice'],
    accent: '#e8e2d2',
    fields: {
      epithet: 'The Ring',
      overview:
        'A ring of built city, roughly 1,900 strides across, hanging over the western lip of [[region.anvil-shelf|the Anvil Shelf]] where sun-heated stone and cold basin air make a thermal that has not failed in recorded memory. The lift is not magic and it is not one thing: it is the updraft, several hundred gas envelopes, a tension lattice that carries the load into itself, and counterweights running on the shelf below. Remove any one and the arithmetic stops working.\n\nIt is the richest city on the continent per head and it produces almost nothing it eats, drinks, burns or breathes. What it sells is height, priority and cable. Every mast, lift-load and counterweight lease is licensed by [[faction.mooring-assize|the Mooring Assize]], and nothing rises unpriced.\n\nThe uncomfortable part is two days\' travel west. [[city.gilded-ascent|The Gilded Ascent]] lends against Sky City counterweight leases, which is where four fifths of the Ascent\'s clearing reserve currently sits, and the Sky City buys its grain, water pipe and ward chalk with Ascent paper. Each city\'s solvency is collateral for the other\'s. Neither can call the loan without ending itself, and both know it.',
      founded: TBD('Was the Ring built out from a single mast, or assembled from moored craft that never came down? The lattice geometry suggests the second.'),
      settlementType: 'Suspended tension ring, five quarters and a ground foot',

      region: [REGION.anvilShelf],
      biome: 'Windswept highland, and the air above it',
      terrain:
        'Bare frost-shattered pavement and thin turf on the shelf; a scarp 600 to 900 strides above the basin floor at the western lip. The city hangs off the lip, not over the shelf, so that the ring sits in the standing thermal and the counterweight runs have solid rock to work against.',
      climate: 'Cold, dry, and violently windy from mid-morning. The thermal is strongest in the afternoon and slackest before dawn, which is when maintenance is done.',
      approach:
        'From the basin road the Ring reads as a pale annulus with a hole in the middle, sitting at an angle you cannot get used to. From the shelf you see the mooring lines first, sixty-odd of them, going up out of a scatter of ground buildings into cloud. The noise is the surprise: a constant low tone from the lattice, which the crews call the hum and which changes pitch when the load changes.',

      cityMapNote:
        'The map is a plan of the ring at deck level. The hole in the middle is the eye, the open column of rising air, and nothing is built across it because building across it would kill the thing that holds the city up. Five quarters occupy the annulus. Shelf-Foot is drawn below the ring for convenience and is actually 700 strides straight down.',
      districtCount: '6 mapped: five ring quarters and the ground settlement',

      architecture:
        'Everything is a compromise between strength and mass, and mass always loses. Structure is drawn wire and laminated [[material.glasscane|glasscane]] spar with [[material.sparbone|sparbone]] where stiffness matters more than cost; infill is bone-white lime render over reed board, which is why the city is the colour it is. Roofs are shallow and tied down. Verdigris is not decoration, it is what the copper conduit does, and the wealthier quarters polish it while Lattice Town does not. Nothing here is built of stone except the counterweight anchors, and those are on the ground.',
      silhouette: 'A pale ring with an open eye, crowned by mooring masts, standing at an angle above a scarp',
      palette: ['#f2ede0', '#d8bd7a', '#5d9e8f', '#8a8f8b'],
      buildMaterials: ['material.glasscane', 'material.sparbone', 'material.stairwire'],

      landmarkName: 'The Mooring Crown',
      landmarkDesc:
        'The ring of fifteen registered mooring masts standing around the eye, tied together by the original lattice. It is the oldest structure in the city, the highest, and the one nobody is willing to replace. See [[landmark.the-mooring-crown|the Mooring Crown]].',

      energy:
        'The thermal does the lifting; everything else is muscle, wind and stored mass. Windmills on the outer rail drive the compressors that charge the mooring lances and the ballast pumps. Counterweights on the shelf below convert descending freight into ascending freight, which is why a lift is cheap when the traffic is balanced and ruinous when it is not. There is no forge above the deck: [[skill.heat-reading|heat work]] of any scale is banned aloft and done at Shelf-Foot, because a fire in the lattice is not a fire, it is a demolition.',
      infrastructure:
        'Copper conduit for water, laid to Mediterranean standard and lacquered with [[material.mirelac|mirelac]], with a total stored capacity of about eleven days. Condensation catchers on every windward face. A public tonnage register that anyone may inspect and almost nobody can read. Sixty-two mooring lines to the ground, of which fifteen are registered masts, forty-one are cargo lines, and six are not accounted for in any book the Assize will show you.',
      keyMachines: ['machine.the-strand-loom'],

      transport:
        'Everything moves vertically first. Registered masts take craft and passengers; cargo lines take freight in nets and crates; the counterweight runs take bulk. Horizontal movement on the ring is by deck gallery and by the inner rail, a continuous walkway around the eye that is the fastest route between any two quarters and the most dangerous place in the city in a gust.',
      traversal:
        'Nothing on the ring is more than four levels deep, so the city is walkable end to end in under an hour if the wind allows, and impassable on the outer galleries when it does not. [[skill.lattice-work|Lattice Work]] opens the structural ways, which run everywhere and are policed by nobody, and it is the most valuable and shortest-lived profession in the city. [[item.ballast-jacket|Ballast jackets]] are worn on every outer deck by law and drown you instantly if you go into water, which matters more than you would expect on the descent.',

      government: 'Lease-holding houses in assize',
      politicalLeaning: 'Propertied, procedural, quietly panicking',
      ruler: ['faction.mooring-assize', 'npc.cesille-vaudry'],
      succession:
        'The Assize is a licensing body that became a government because it held the only register that mattered. Its bench is filled by the holders of the fifteen mast leases, which are heritable, saleable and indivisible. A lease can be forfeited for false tonnage returns, which is theoretically the strongest anti-corruption provision on the continent and has been used once in forty years. There is no citizen franchise of any kind and no serious movement for one; there is instead a great deal of argument about whether carried mass should be assessed on the person or the household.',

      laws:
        'Mass law swallows everything else. Every gram aboard is licensed, declared and periodically re-weighed, and the offences that carry real sentences are all mass offences: false declaration, unlogged ascent, ballast fraud. Assault is a fine. Ballast fraud is capital, because the same act done four times is a structural failure and the Assize cannot tell in advance which one is the fourth. The city knows this is disproportionate and enforces it anyway.',
      enforcement: 'Mast wardens and the mass-registrars, who are inspectors rather than police and are feared considerably more',
      extradition:
        'The Sky City will hand over almost anyone for almost anything, because a person is billable mass and a wanted person is billable mass with a liability attached. The exception is lattice crew under contract, who cannot be removed while a section is live, which has made the structural trades a genuine sanctuary and is why half of Lattice Town has a name it was not born with.',
      notableCrimes: [
        'False tonnage return, on a craft or a household',
        'Unlogged ascent or descent by a mooring line ([[npc.perrine-orlaunt|ballast-running]])',
        'Ballast fraud, which is capital and is charged whether or not anything fell',
        'Cutting or splicing a lattice member without a warrant, regardless of skill',
        'Landing at an unregistered mast, and the mast-holder is charged as well as the pilot',
      ],

      socialClasses: [
        row({ name: 'Mast houses', share: 'about 0.4%', note: 'Fifteen leases, fifteen families. Hold the Assize bench and the tonnage register.' }),
        row({ name: 'Lease tenants', share: '9%', note: 'Hold sub-leases on deck space and mooring time. Rich, precarious, and nobody\'s heirs.' }),
        row({ name: 'Registered residents', share: '38%', note: 'Assessed mass allowance in their own name. Can own, marry aloft and be buried aloft.' }),
        row({ name: 'Allowance labour', share: '34%', note: 'Assessed against an employer\'s allowance. If the employment ends, so does the right to be up here.' }),
        row({ name: 'Ground households', share: '18%', note: 'Shelf-Foot. Feed and service the city, are counted by it, and may not sleep aloft.' }),
        row({ name: 'Struck from the register', share: 'under 1%', note: 'Rated as unassessed mass. Legally must be put down, and usually are, in a crate.' }),
      ],

      population: '19,400 aloft on the last register; about 6,200 more at Shelf-Foot who are counted separately and pay tax the same',
      demographics: [
        row({ group: 'Ring-born', share: '41%', note: 'Never been below the lip. A measurable proportion have never been on solid ground at all.' }),
        row({ group: 'Shelf and basin', share: '29%', note: 'Came up for work, mostly lattice and ballast. The largest group at Shelf-Foot.' }),
        row({ group: 'Ascent factors and households', share: '14%', note: 'Here to watch the collateral. Everybody knows it and nobody says it at dinner.' }),
        row({ group: 'Coast trained', share: '9%', note: 'Mediterranean fitters and instrument makers, on renewable licences, paid absurdly.' }),
        row({ group: 'Northern and scar', share: '7%', note: 'Ward-chalk carriers, quenchspar handlers, and the sink crews nobody discusses.' }),
      ],
      languages: [
        'Basin speech, in an aloft register full of mass and rigging terms that reads as arrogance below the lip',
        'Mast cant: whistle and hand signal, because the lattice hum and the wind make speech unreliable on the outer decks',
        '[[skill.trade-cant|Trade cant]] at the masts and nowhere else',
      ],
      cultures: TBD('Do the ring-born have a burial practice? Ground burial is impossible without a descent permit and cremation is banned aloft, which leaves a real and unanswered question.'),

      food:
        'The city grows [[food.lattice-cress|lattice cress]] in trays along the mast lines and buys everything else. A week of still air browns the trays; four weeks without lift traffic and the Ring is starving in a way no siege engine could achieve. Grain, oil and salt come up by counterweight from Shelf-Foot, and Shelf-Foot buys them from [[city.gilded-ascent|the Gilded Ascent]] on Ascent paper. The Assize keeps an eleven-day reserve, says it keeps thirty, and has been shaving the figure for six years.',
      water:
        'Condensation catchers on the windward faces provide roughly a third in a good season and almost nothing in a dry one. The rest is pumped up the scarp from a spring gallery at the shelf foot, in copper, at a cost per barrel that is publicly posted and privately negotiable. Water is assessed as mass like everything else, so a bath is a purchase of lift.',
      staples: ['food.lattice-cress', 'food.stair-loaf', 'food.adit-cheese'],

      economy:
        'Three revenue streams, all of them rents. Mast fees and lift priority; counterweight leases, which are sold forward and are the instrument the Ascent lends against; and cable, because [[machine.the-strand-loom|the Strand Loom]] is the only rope walk on the continent that can lay a cable this long without a splice, and every hoist, cableway and lattice in the world would like one.\n\nAgainst that sits a cost nobody escapes: the lattice fatigues. The city must re-lay cable faster than the cable ages, permanently, and the bill is not falling. That is the whole economy in one sentence. Wealth here is not accumulation, it is the ability to keep paying maintenance on something that would otherwise fall on the basin.',
      mainProduction: 'Laid lattice cable, licensed lift and mooring rights',
      currency: 'Ascent stair writs for external trade; internally, assessed mass allowances, traded openly by the gram',
      wealth: 'Opulent',

      exports: ['material.stairwire', 'material.sparbone', 'item.mooring-lance', 'item.crown-bolt'],
      imports: ['food.stair-loaf', 'food.mirror-barley', 'material.glasscane', 'material.ward-chalk', 'material.blister-bar', 'food.meridian-olive'],
      tradeNotes:
        'The Sky City is a rentier that cannot be blockaded conventionally and can be starved trivially. Its trade posture is therefore to keep as many suppliers as possible slightly indebted and none of them dominant, which has failed exactly once, with the Ascent, and that failure is the central political fact of the region. The Assize is buying ground land under other names as fast as it can do so quietly, which is not a diversification strategy, it is an evacuation plan.',

      localResources: ['material.sparbone', 'material.ward-chalk', 'deposit.ward-marls'],
      resourceNotes:
        '[[material.sparbone|Sparbone]] is harvested from the soarers that ride the same updraft the city does, on a quota the Sky City sets and enforces on nobody but itself, and every harvest crew comes back short a name. [[deposit.ward-marls|The Ward Marls]] are shallow beds in the shelf turf, cut by the cartload and sold forward to [[city.magic-city|the Magic City]] years in advance, which is a debt as much as a sale. Beyond that the shelf gives nothing: no timber, no ore, no soil worth the name.',

      defense:
        'The city cannot be stormed by anything that walks. It can be reached by the mooring lines, which is why the mast heads are the only fortified points in it, and it can be brought down by anyone with the patience to cut lattice, which is why the structural ways are the real perimeter. There is no wall. The outer rail is a safety rail, and the Assize has never allowed it to be built up, because weight is the enemy.',
      doctrine:
        'Deterrence by consequence. The Assize\'s stated position is that anything that damages the city lands on the basin below in pieces, and it has been careful to make sure every neighbouring power has done that sum. Its actual force is 300 mast wardens with [[item.mooring-lance|mooring lances]], trained to board and hole an envelope, plus the ability to refuse lift, which has ended two disputes without a blade being drawn.',
      garrison: '300 mast wardens, 40 registrars, and about 900 lattice crew who are not soldiers and would decide the outcome anyway',

      factionNotes:
        '[[faction.mooring-assize|The Mooring Assize]] is the government and its overriding secret is that survey figures show the updraft weakening. [[faction.concord-of-weights|The Concord of Weights]] has no formal standing here and effectively holds the city\'s balance sheet, which its factors are careful never to mention aloud. [[faction.bondwrights-hall|The Bondwrights\' Hall]] does brisk business in allowance labour, since a person whose right to remain is tied to an employer is already most of the way to a bond. [[faction.low-tally|The Low Tally]] works the six unaccounted mooring lines. [[faction.standing-hour|The Standing Hour]] has no chapter here and has tried three times: the lattice crews\' contractual immunity makes them the strongest labour position on the continent and the least interested in solidarity with the ground.',

      currentConflict: 'The updraft is measurably weakening and the survey is being suppressed',
      problems: [
        'Tonnage returns are forged. The city is carrying several hundred tonnes over its rated load and the Warden knows the true figure.',
        'The Sixth Mast collapse was never properly heard, and the registrar who kept the true sheets is alive at the shelf foot.',
        'Somebody has been landing at an unregistered sixteenth mast for two years.',
        'Cable fatigue is outrunning the Strand Loom\'s output for the first time in three decades.',
        'The Assize is buying ground land under other names, and if that becomes public the lease market collapses overnight.',
      ],

      cityRelations: [
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Mutually mortgaged', note: 'The Ascent holds four fifths of its reserve against Sky City counterweight leases; the Ring eats on Ascent paper. Neither can move first.' }),
        row({ city: '[[city.mediterranean-city|The Mediterranean City]]', stance: 'Respectful dependence', note: 'Conduit, springs and instruments come from the coast under renewable licence. The College will not sell the licence outright at any price.' }),
        row({ city: '[[city.magic-city|The Magic City]]', stance: 'Contractual', note: 'Ward marl goes east, licensed load-binding comes back for the counterweight anchors. Both sides consider the other a liability.' }),
        row({ city: '[[city.floating-swamp-settlement|The Floating Swamp Settlement]]', stance: 'Distant supplier', note: 'Glasscane spar stock rafts up the river and the Sky City is its largest buyer, which nobody in either place finds reassuring.' }),
        row({ city: '[[city.tree-city|The Tree City]]', stance: 'Cool', note: 'Buys nothing, sells cable to the redoubts, and declines every invitation to be drawn into Greatwood politics.' }),
        row({ city: '[[city.sifting-city|The Sifting City]]', stance: 'Indirect', note: 'Blackfall Button dies are the reason the Strand Loom works at all, which puts a desert city upstream of the Ring\'s survival.' }),
      ],

      signatureMechanic: 'The Mass Warrant',
      mechanicNotes:
        '[[mechanic.mass-warrant|The Mass Warrant]] turns encumbrance into an economy. Every item a party carries has a declared weight, every ascent is a purchase, and the difference between what you declared and what you are carrying is the crime. Practically: entering the city requires a warrant listing carried mass; each additional gram has a price and a queue position; carrying a person is billable ([[skill.dead-weight|Dead Weight]] does not exempt you); and the cheap route is [[npc.perrine-orlaunt|ballast-running]], which is unlogged, illegal and has already killed someone. Loot is a liability here rather than a reward, which is the point.',

      npcNotes:
        '[[npc.cesille-vaudry|Cesille Vaudry]] is Warden of the Mooring Crown and the person forging the tonnage returns rather than sign eviction lists. [[npc.aubran-ferrieu|Aubran Ferrieu]] is the stripped registrar at Shelf-Foot with the true sheets from the week of the Sixth Mast collapse; he wants a hearing, not money. [[npc.perrine-orlaunt|Perrine Orlaunt]] can move a person off the Ring with no manifest entry and is the only one who can. The three of them are the same story from three heights: what happens when the true number is written down.',
      questNotes:
        '[[quest.the-sixteenth-mast|The Sixteenth Mast]] starts here and turns from a smuggling case into a succession fight the moment the mast\'s owner is named. [[quest.the-second-ledger|The Second Ledger]] is the Ascent guild line\'s espionage branch and runs against a lattice-house counting room under the Crown. Local work: recover Ferrieu\'s tonnage sheets, decide whether the true load figure becomes public, and choose which quarter goes down the ropes if it does.',

      services: [
        row({ name: 'Registered mast berth', where: 'The Mooring Ring, masts 1 to 15', note: 'Priced by craft mass and time of day. The afternoon thermal is worth double.' }),
        row({ name: 'Mass warrant assessment', where: 'Registry hall, Counterweight Quarter', note: 'Public weighing. Appeal is possible and takes eleven days, during which you may not ascend.' }),
        row({ name: 'Laid cable to order', where: '[[machine.the-strand-loom|The Strand Loom]]', note: 'The only unspliced long cable on the continent. Orders are taken years forward.' }),
        row({ name: 'Lattice survey and repair', where: 'Lattice Town hiring board', note: 'Requires [[skill.lattice-work|Lattice Work]]. Contract crew cannot be extradited while a section is live.' }),
        row({ name: 'Cold storage', where: 'Underdeck, north arc', note: 'The shelf air keeps things the basin cannot. Charged by mass and by day, like everything else.' }),
        row({ name: 'Unlogged descent', where: 'Ask at the ballast shafts, do not ask twice', note: 'Illegal, expensive, and the crate has been sealed with someone inside it before.' }),
      ],

      creatureNotes:
        '[[creature.loftwrack|Loftwrack]] graze the same thermal the city rides, in colonial rafts up to a hundred paces across, and the Ring\'s relationship with them is entirely extractive: they are culled for lift-bladder membrane and levitant gas, and a culled raft falls on whatever is below, which has twice been Shelf-Foot. The soarers that yield [[material.sparbone|sparbone]] nest on the scarp faces and are taken under a quota the city writes for itself. Nothing else lives up here except the birds that follow the cress trays and the rats that came up in the grain and now have four generations of ring-born descendants.',

      history:
        'The city has an origin story it tells visitors, involving a first mast and a survey, and a working assumption among lattice crews that the truth is duller and involves craft that moored and never came down. What is documented is recent and structural: the Sixth Mast collapse, which killed a number the Assize has never printed and produced the tonnage-return rules that are now being forged; and the long slow discovery, over three decades, that laid cable ages faster than anyone budgeted for. Everything the Sky City does politically is downstream of that second fact.',

      devNotes:
        'CANON ANCHORS: the Sky City is wealthy and sits comparatively close to the Gilded Ascent, at (1420,620) above the Anvil Shelf; it is held aloft over a permanent thermal updraft; it is built of tension lattice, mooring masts and counterweights; its landmark is the Mooring Crown; its palette is bone white, pale gold and verdigris.\n\n' +
        PROPOSAL('The ring form, the eye, the fifteen leases, the mass franchise, the Strand Loom monopoly and the weakening updraft are proposed. The deliberate design decision the brief asked for: the economic relationship with the Gilded Ascent is mutual hostage-taking, not patronage. The Ascent has lent its reserve against Sky City leases and the Sky City eats on Ascent paper, so neither city can survive the other\'s honesty. Every quest touching either city should be able to reach for that.'),
      openQuestions: [
        'What exactly provides the lift, in what proportions? The draft says thermal plus envelopes plus lattice plus counterweights, deliberately so no single sabotage drops the city.',
        'Is the updraft weakening permanently, cyclically, or because of something the city itself did?',
        'What happens to the ring-born who have never stood on the ground, if the city has to come down?',
        'Who made the Mooring Crown\'s original alloy, and is that a question with an answer or a permanent mystery?',
        'Does the Sky City have any leverage over the Ascent it has not yet used?',
      ],
      cityMap: SKY_MAP,
    },
  }),

  E({
    id: 'district.sky-city-crown-houses',
    type: 'district',
    name: 'The Crown Houses',
    status: 'draft',
    summary: 'Fifteen mast houses on the north arc, each one a lease, a vote and a counting room.',
    tags: ['wealth', 'government'],
    fields: {
      overview:
        'The inner north arc, directly under the Mooring Crown. Fifteen houses, one per mast lease, each occupying a wedge of deck from the inner rail to the outer gallery, with the counting rooms placed where they overlook their own mast. The Assize bench sits in the sixth house by rotation, because none of the fifteen would accept a permanent chamber in a rival\'s wedge.',
      city: [CITY.skyCity],
      districtType: 'Lease houses and governance',
      wealth: 'Opulent',
      atmosphere:
        'Polished verdigris, pale gold leaf on load-bearing members where the mass allowance permits, and an obsessive quiet. The hum of the lattice is loudest here because the Crown members are the heaviest in the city, and residents claim they can hear the load change before the registrars can measure it.',
      architecture:
        'The oldest fabric in the city and the most repaired. Original lattice alloy in the Crown members, later work bolted around it, and a great deal of very expensive lightness: reed board panelled to look like timber, glass thin enough to flex, furniture built like aircraft.',
      whoLivesHere: 'Fifteen families, their households, and the senior registrars who are effectively hostages',
      danger: 'Low physically. Ruinous socially.',
      playNotes:
        '[[npc.cesille-vaudry|Cesille Vaudry]] holds the second counterweight lease and is forging the tonnage returns from an office here. The counting room targeted in [[quest.the-second-ledger|The Second Ledger]] is in the ninth house. The real prize in the district is not money, it is the true tonnage figure, because whoever can prove it also gets to choose which quarter is evicted to lighten the city.',
      devNotes: PROPOSAL('Fifteen houses matching fifteen registered masts is proposed and gives quest.the-sixteenth-mast its arithmetic: a sixteenth mast means a sixteenth interest nobody has a seat for.'),
    },
  }),

  E({
    id: 'district.sky-city-mooring-ring',
    type: 'district',
    name: 'The Mooring Ring',
    status: 'draft',
    summary: 'The working east arc: fifteen registered masts, the cargo lines, and every arrival in the city.',
    tags: ['transport', 'trade', 'port'],
    fields: {
      overview:
        'The east arc, and the only lawful way in. Fifteen mast heads with their winch houses, the cargo line terminals, the weighing hall, the customs walk and the queue. Everything and everyone entering the Sky City is weighed here, declared here, and given a place in a queue that is ordered by mass and by who you bank with.',
      city: [CITY.skyCity],
      districtType: 'Port and customs',
      wealth: 'Prosperous',
      atmosphere:
        'Wind, whistle codes, the crack of a mooring line taking load, and a permanent smell of hot metal and lacquer. It is the one part of the ring where the city admits it is a machine. In the afternoon thermal the mast heads work continuously and the noise is such that nobody speaks below a shout or above a signal.',
      architecture:
        'Mast heads on braced tripods, winch houses hunched under them, and the customs walk: a covered gallery 400 strides long lined with weighing bays. All of it painted bone white, all of it repainted every second year, because a hairline crack in a member is only visible against clean paint.',
      whoLivesHere: 'Mast wardens, winch crews, registrars, customs clerks and the licensed porters who are paid by the gram',
      danger: 'High at the mast heads, low on the customs walk',
      playNotes:
        'Where [[mechanic.mass-warrant|the Mass Warrant]] is actually enforced, so it is the first real gate on a party arriving with equipment. [[item.mooring-lance|Mooring lances]] are held here and licensed to mast crews only. Smuggling out is easier than smuggling in, which inverts the usual expectation. The unregistered sixteenth mast in [[quest.the-sixteenth-mast|The Sixteenth Mast]] is not in this district, which is precisely the problem.',
      devNotes: PROPOSAL('The weighing hall and queue-by-standing rule are proposed and exist to give the Mass Warrant a room, a queue and a clerk, rather than an abstract encumbrance rule.'),
    },
  }),

  E({
    id: 'district.sky-city-counterweight-quarter',
    type: 'district',
    name: 'The Counterweight Quarter',
    status: 'draft',
    summary: 'The south arc, where the leases that hold up the city are written, weighed and sold forward.',
    tags: ['finance', 'infrastructure'],
    fields: {
      overview:
        'The head works of the counterweight runs, the registry hall, and the offices of the lease clerks. A counterweight lease is the right to a share of the descending mass on a given run, sold years forward, and it is the instrument [[city.gilded-ascent|the Gilded Ascent]] has lent its clearing reserve against. This district is therefore, in the most literal sense, where the continent\'s credit is stored.',
      city: [CITY.skyCity],
      districtType: 'Registry and machine works',
      wealth: 'Prosperous',
      atmosphere:
        'Ordered, cold and slightly smug. The registry hall is the only public building in the city where anyone can walk in and read the tonnage register, and the clerks encourage it, because the register is unreadable without training and public access is the Assize\'s proof of honesty.',
      architecture:
        'Heavier than anywhere else on the ring, because the run heads take real load: doubled lattice, braced sheave frames, and floors you can feel working under your feet. The registry hall itself is a long pale room with the register in numbered cases along one wall.',
      whoLivesHere: 'Lease clerks, run crews, registrars, and the Ascent factors who have taken lodgings within sight of the hall',
      danger: 'Moderate. The run heads take limbs.',
      playNotes:
        'Read the register with [[skill.ledger-hand|Ledger Hand]] and the forged returns start to show as arithmetic that does not close. This is where a party can discover the Ascent\'s exposure without ever going to the Ascent, and it is the natural place to set up [[quest.the-scar-concession|The Scar Concession]] bidding, since lattice-house money has to come from here.',
      devNotes: PROPOSAL('Counterweight leases as a forward-sold financial instrument are the mechanism that makes the two cities\' mutual mortgage concrete. If that link is cut, cut it here first.'),
    },
  }),

  E({
    id: 'district.sky-city-lattice-town',
    type: 'district',
    name: 'Lattice Town',
    status: 'draft',
    summary: 'The west arc: crew lodgings, hiring boards and the shortest life expectancy above the lip.',
    tags: ['labour', 'craft', 'sanctuary'],
    fields: {
      overview:
        'Where the people who keep the city in the air live. Crew lodgings stacked four deep, the hiring boards, the splice sheds, and the sinking fund hall where a crew\'s dead are paid out. About 900 lattice crew work out of here and the trade\'s working life is roughly eleven years, which everyone knows when they take the first contract.',
      city: [CITY.skyCity],
      districtType: 'Working quarter',
      wealth: 'Modest, with sudden money',
      atmosphere:
        'Loud, close and unsentimental. Verdigris unpolished, paint patched rather than renewed, washing strung on condemned cable. Crews are paid well and spend it immediately, on the reasoning that an allowance you die holding reverts to the lease.',
      architecture:
        'Structure with rooms hung off it rather than buildings with structure inside. Every wall in Lattice Town is a member of something, which is why alterations are a criminal matter and why the district is honeycombed with structural ways that go everywhere in the city.',
      whoLivesHere: 'Lattice crew, splicers, riggers, and a large number of people using names they were not born with',
      danger: 'High at work, low at home',
      playNotes:
        'The best route into the city\'s secrets, because the structural ways run behind every wall in every quarter and only crew can use them safely. [[skill.lattice-work|Lattice Work]] is the entry ticket. Contract crew cannot be extradited while a section is live, so this is where a hunted NPC goes to ground, and buying out someone\'s contract is a legitimate way to get them killed.',
      devNotes: PROPOSAL('Contractual non-extradition is invented and is deliberately the strongest labour protection in the setting, held by the one group whose withdrawal would drop the city.'),
    },
  }),

  E({
    id: 'district.sky-city-the-underdeck',
    type: 'district',
    name: 'The Underdeck',
    status: 'draft',
    summary: 'Below the deck plates on the north-west arc: ballast, cold storage, and people who are not on the register.',
    tags: ['poverty', 'hidden', 'dark'],
    fields: {
      overview:
        'The void between the deck plates and the lower fairing, two to five strides deep depending on where you stand, running most of the north-west arc. Officially it holds ballast tanks, water pipe, cold storage and the run of the conduit. Unofficially it holds several hundred people who are not assessed, cannot be assessed, and are therefore not carried by the city at all in any sense the register recognises.',
      city: [CITY.skyCity],
      districtType: 'Service void and unregistered quarter',
      wealth: 'Destitute',
      atmosphere:
        'Cold, dark, and never still: the fairing flexes audibly, water moves in the pipe, and the whole space is filled with the lattice hum coming through the plates. You cannot stand upright for more than eleven paces at a stretch anywhere in it.',
      architecture:
        'Not architecture. Plate, pipe, tank and cable, with partitions of scavenged reed board where people have made rooms. Every fire here is a capital matter and there are fires, because the alternative in a shelf winter is worse.',
      whoLivesHere: 'The struck-off, discharged allowance labour, ballast hands between contracts, and children who have no registration to lose',
      danger: 'High. Cold, falls, and the fact that unassessed mass is legally required to be put down.',
      playNotes:
        'The moral floor of the city and the physical route between quarters that avoids every customs walk. [[npc.perrine-orlaunt|Perrine Orlaunt]] works out of the ballast shafts at the western end. A party that helps the unregistered is helping people the city is obliged to expel, which puts them directly against the Assize\'s only remaining lever for reducing load. Play it as an eviction problem, not a dungeon.',
      devNotes: PROPOSAL('The Underdeck exists so the Mass Warrant has victims. The rule that unassessed mass must be removed is the darkest thing in the city and should always be enforced by clerks, never by monsters.'),
    },
  }),

  E({
    id: 'district.sky-city-shelf-foot',
    type: 'district',
    name: 'Shelf-Foot',
    status: 'draft',
    summary: 'The ground town under the ring: anchors, forges, warehouses, and 6,200 people who may not sleep aloft.',
    tags: ['ground', 'industry', 'labour'],
    fields: {
      overview:
        'The settlement at the scarp foot where everything the Sky City cannot do aloft happens: forging, milling, brewing, tanning, slaughter, and the storage of anything that can wait. It holds the counterweight anchors, the pump house for the water main, the mooring line winches, and the grain reserve. It is counted in the city\'s tax rolls and excluded from its franchise, and the residents have a phrase for that which the Assize has tried to ban.',
      city: [CITY.skyCity],
      districtType: 'Ground settlement and works',
      wealth: 'Modest',
      atmosphere:
        'Smoke, hammering, mud, and a permanent crick in the neck from looking up. The ring is directly overhead for most of the town and things fall off it. There is an ordinance about shouting a warning and a fine for not doing so, and the fine has been paid 300 times.',
      architecture:
        'Stone, at last: heavy anchor blocks, forge sheds, barrel-vaulted stores, all built low against the wind. Shelf-Foot is the only part of the Sky City that looks like a normal town, which residents point out with some bitterness.',
      whoLivesHere: 'Ground households, forge and mill workers, anchor crews, hauliers, and people barred from aloft',
      danger: 'Moderate. Falling objects, forge accidents, and a culled loftwrack raft has come down on the town twice.',
      playNotes:
        '[[npc.aubran-ferrieu|Aubran Ferrieu]] lives here, has not been above ground in four years, and holds the true tonnage sheets from the Sixth Mast collapse. This is where a party can get everything done that the mass rules make impossible aloft: heat work, heavy repair, loud arguments. It is also the obvious staging ground for anyone intending to attack the city, and the Assize is aware and has never fortified it, because fortifying it would say something out loud.',
      devNotes: PROPOSAL('Shelf-Foot resolves the practical problem that a city with no forges cannot exist, and gives the Sky City an underclass that is geographically separate rather than merely poor.'),
    },
  }),

  E({
    id: 'landmark.the-mooring-crown',
    type: 'landmark',
    name: 'The Mooring Crown',
    status: 'draft',
    summary: 'Fifteen masts around the open eye, tied by original lattice nobody has managed to reproduce.',
    tags: ['canon-landmark', 'structure'],
    fields: {
      overview:
        'The ring of fifteen registered mooring masts standing around the eye, braced to each other by the oldest lattice in the city. It is the highest structure the Sky City has, the only one that has never been fully replaced, and the reason the fifteen mast leases are fifteen and not sixteen or forty.',
      city: [CITY.skyCity],
      landmarkType: 'Mast ring and structural core',
      built: TBD('The Crown predates the city\'s own records. Was it built for a city, or did the city grow onto something already there?'),
      appearance:
        'Fifteen tapered masts, bone white over an alloy that shows pale gold where the paint has gone, standing in a circle 400 strides across with the open eye beneath them. In the afternoon the thermal is visible through it as a shimmer, and birds ride the column without beating a wing.',
      function:
        'Working infrastructure, not a monument. All lawful landing happens at these masts. The Crown members also carry a share of the ring load, which is why nobody will take one down to study it, and why the Assize has quietly refused three offers from [[city.mediterranean-city|the Conduit College]] to survey the alloy.',
      access:
        'The mast heads are working sites and closed except to crew and warden. The Crown gallery beneath is public on eleven days a year. [[item.crown-bolt|Crown bolts]] taken from the original lattice are traded illegally and every one of them is a piece of the city that is no longer holding it up.',
      devNotes:
        'CANON ANCHOR: the Mooring Crown is the Sky City\'s central landmark. ' +
        PROPOSAL('The fifteen masts, the irreproducible alloy and the Crown\'s age are proposed. Keep the alloy question open: item.crown-bolt already states that nobody has reproduced it, and an answer would be worth less than the question.'),
    },
  }),

  E({
    id: 'landmark.the-sixth-mast',
    type: 'landmark',
    name: 'The Sixth Mast',
    status: 'draft',
    summary: 'Rebuilt, relicensed and never properly heard: the mast that came down with a signed overload on it.',
    tags: ['disaster', 'politics'],
    fields: {
      overview:
        'The sixth of the registered masts, which failed under load and took a section of the east arc with it. It was rebuilt within the year and carries traffic today. What was never rebuilt was the inquiry: the hearing was adjourned and never resumed, the mass-registrar who kept the true tonnage sheets was stripped, and the number of dead has never been printed.',
      city: [CITY.skyCity],
      landmarkType: 'Working mast and unmarked disaster site',
      built: TBD('Rebuilt how long ago? Aubran Ferrieu has been at the shelf foot four years, which gives a floor and not a date.'),
      appearance:
        'Indistinguishable from the other fourteen at a distance and obviously newer close to: brighter alloy, machine-cut members, and a repaired deck section around its foot where the paint has been renewed more often than anywhere else on the ring.',
      function:
        'Carries about a seventh of the city\'s registered traffic. Politically it functions as an argument: every faction in the Sky City has a version of what happened, and all of them are careful never to test it.',
      access:
        'Working mast, crew only above the winch house. The deck around its foot is public and, on the anniversary, informally crowded, which the wardens permit and the Assize dislikes.',
      devNotes: PROPOSAL('The collapse is invented to give npc.aubran-ferrieu his grievance a place to stand. The unprinted death toll is the useful part: it is a number a party can establish, and establishing it is itself the political act.'),
    },
  }),

  E({
    id: 'landmark.the-ballast-drop',
    type: 'landmark',
    name: 'The Ballast Drop',
    status: 'draft',
    summary: 'The open shaft through the deck where mass goes down: water, spoil, freight and, unlogged, people.',
    tags: ['infrastructure', 'crime'],
    fields: {
      overview:
        'A rectangular shaft cut clean through the deck plates on the south arc, four strides by nine, with a hinged grating and a crane frame over it. Everything the city needs to shed goes down here on a line: ballast water, spoil, condemned material, and freight the counterweight runs will not take.',
      city: [CITY.skyCity],
      landmarkType: 'Service shaft',
      built: TBD('Was the Drop designed in, or cut through afterwards? The plate edges are cut, not cast, which suggests afterwards.'),
      appearance:
        'A hole with the basin at the bottom of it, 700 strides down, and nothing in between but weather. Standing on the grating in the afternoon thermal is a recognised test of nerve among ring-born children and has killed at least four of them.',
      function:
        'Mass disposal and unscheduled descent. Officially every load through the Drop is logged against a warrant. In practice the night crews run sealed crates that are declared as spoil, which is how [[npc.perrine-orlaunt|Perrine Orlaunt]] moves people off the city, and how a woman suffocated in a ballast crate two winters ago.',
      access:
        'Fenced, gated, and manned by two ballast hands who are the cheapest officials in the city to buy. [[skill.dead-weight|Dead Weight]] and a cold head get you onto the frame; getting into a crate is easy, and getting out at the bottom is the part that kills people.',
      devNotes: PROPOSAL('The Drop gives the Mass Warrant a physical loophole with a body count attached. Keep the deaths specific and few: the horror is administrative, not gothic.'),
    },
  }),

  /* ================================================================ */
  /* THE MEDITERRANEAN CITY                                            */
  /* ================================================================ */

  E({
    id: CITY.mediterranean,
    type: 'city',
    name: 'The Mediterranean City',
    workingTitle: true,
    aka: ['The Port', 'The College City'],
    status: 'draft',
    summary: 'Terraced amphitheatre on a warm gulf: tidal computation, pressurised conduit, and enough food to say no.',
    tags: ['technology', 'agriculture', 'canon-advanced', 'coastal'],
    accent: '#e9e3d6',
    fields: {
      epithet: 'The Port',
      overview:
        'The most technically capable city on the continent, and the only large one that feeds itself. Those two facts are the same fact: the terraces produce a reliable surplus, the surplus buys time, and time is what precision costs.\n\nThe city sits in a natural amphitheatre above a bitten-out harbour on [[region.meridian-coast|the Meridian Coast]], built in stepped bands facing the water. Below the wall it is workshops and quays; above it, orchards, olive terraces and the irrigation that makes them work. Water arrives by aqueduct and leaves by copper conduit under pressure, on a timetable, priced by the slot.\n\nNone of this is wizardry and very little of it is fast. What the city actually has is standards: gauge blocks, proof marks, a written tolerance, and a licensing body ruthless enough to enforce all three. [[faction.conduit-college|The Conduit College]] licenses the engineers, holds the patents, and sits on working designs it will not release, because releasing them would end the rent it lives on. The most advanced city in the world is deliberately slower than it could be, and everybody who matters here knows it.',
      founded: TBD('The terraces are older than the city and were built by someone. Whose, and when, is unanswered and the College has never funded the dig.'),
      settlementType: 'Terraced harbour city and agricultural hinterland',

      region: [REGION.meridianCoast],
      biome: 'Mediterranean coast: wet winters, dry summers, deep terrace soils',
      terrain:
        'A curved bay biting into a limestone amphitheatre, with the land rising in natural steps from the water to a ridge about 340 strides up. The city occupies the steps. The harbour is deep enough for anything that floats and sheltered from everything but the south-west, which is the wind that matters.',
      climate: 'Mild wet winters, hot dry summers, reliable autumn rain. Frost perhaps one year in nine.',
      approach:
        'From the gulf you see white first: rendered vaults stepping up the amphitheatre in bands, terracotta roofs between them, and above the wall the olive terraces going grey-green all the way to the ridge. The [[landmark.the-standing-aqueduct|Standing Aqueduct]] comes in from the north-east on 71 arches and does not look like it belongs to the same century as anything else in sight.',

      cityMapNote:
        'Concentric bands facing the harbour, because the city is laid out by height above the water and by distance from the conduit head, not by street. The lower bands are working city; the wall runs along the fourth band edge; above it the terrace groves. The Lazaret sits offshore in the bay and is drawn separate, which is the whole point of it.',
      districtCount: '6 mapped of 14 rated quarters, including the offshore lazaret',

      architecture:
        'Whitewashed barrel vaults on a repeated span, terracotta pantile, and glass in quantities no other city can afford to break. The vault is the unit: the same span is used for a warehouse, a workshop, a house and a cistern, because a repeated span means repeated centring, repeated formwork and cheap building. [[material.tideset-cement|Tideset cement]] does the harbour work and everything that touches water. Copper conduit runs on the outside of walls, lacquered green with [[material.mirelac|mirelac]], and the verdigris streaks below the joints are considered a sign of a well-run house rather than a leak.',
      silhouette: 'Stepped white bands curving around a harbour, an aqueduct coming in high from the north-east, one glass-domed precinct',
      palette: ['#f4f0e6', '#c86a44', '#7d8a54', '#5d9e8f'],
      buildMaterials: ['material.tideset-cement', 'material.clearcast-glass', 'material.orrery-bronze', 'material.mirelac'],

      landmarkName: 'The Tide Orrery',
      landmarkDesc:
        'A tide-driven calculating engine of some 9,000 bronze gears under a glass dome, which predicts tides, winds and star positions and prints the tables the whole coast plants and sails by. It has drifted, and the College will not concede it. See [[landmark.the-tide-orrery|the Tide Orrery]].',

      energy:
        'Four sources, none of them dramatic. Tide mills across the harbour throat, which run on both flood and ebb and drive the [[machine.the-drawbench-vaults|Drawbench Vaults]]. Water power from the aqueduct fall, which is the largest single source and is what the conduit hours actually meter. Wind on the ridge for lifting water to the upper terraces. Charcoal and olive cake for the kilns and the [[machine.the-verdigris-hearth|Verdigris Hearth]], the charcoal shipped in from [[city.tree-city|the Greatwood]], which is the city\'s one strategic dependency and it hates it.',
      infrastructure:
        'The best in the world and the most administered. Pressurised copper conduit reaching every rated quarter, carrying water and hydraulic work, cut and valved live by fitters with [[skill.pressure-fitting|Pressure Fitting]]. Sewers separated from stormwater since before the current College. Public cisterns under every vault block. Standardised parts, sold to gauge, so that a valve bought here fits a fitting bought eleven years ago, which sounds trivial and is the single largest technological advantage on the continent.',
      keyMachines: ['machine.the-drawbench-vaults', 'machine.the-frit-kiln', 'machine.the-verdigris-hearth'],

      transport:
        'Harbour first: the gulf trade, the coast road, and the river lighters. Inside the city, a stepped street grid designed for handcarts and mules rather than wagons, with goods hoists at the band edges. There is a funicular on the eastern band, water-counterweighted, which the College built to prove a point and which now carries eleven tonnes a day.',
      traversal:
        'Everything is walkable and everything is uphill. The band edges are the real barriers: five to nine strides of retaining wall with numbered stairs through them, gated at night in the upper bands only. The conduit runs are a second network, walkable in the big mains when they are down for maintenance, which is a scheduled and published event and therefore the most predictable break-in window in the setting.',

      government: 'Licensing college and elected quarter assembly',
      politicalLeaning: 'Technocratic, rent-seeking, formally republican',
      ruler: ['faction.conduit-college'],
      succession:
        'Fourteen quarters elect an assembly by householder franchise, which is genuinely broad by continental standards and includes women, tenants and, after a long fight, terrace labourers. The assembly controls the harbour, the courts, the aqueduct and the food reserve. It does not control the licence to practise engineering, the patent roll or the conduit timetable, all of which sit with [[faction.conduit-college|the Conduit College]], whose masters are elected by their own fellows. The city is thus a republic with a private guild holding the throttle, and the arrangement has held for a long time because the College has been careful never to starve anyone.',

      laws:
        'Written, indexed, and applied with an evenness the rest of the continent finds either admirable or insufferable. Two things distinguish it. First, liability follows the proof mark: if you stamped it, you own what it does, which is why [[skill.proof-marking|Proof Marking]] is a regulated skill and a false stamp is prosecuted as though the resulting deaths were intended. Second, indenture is void here. An [[item.indenture-bond|indenture bond]] has no force in the harbour, cannot be enforced by any court, and attempting to enforce one is itself a serious offence.',
      enforcement: 'Quarter constables, harbour officers, and College proctors who inspect works rather than people',
      extradition:
        'The city extradites for violence and for fraud and refuses flatly for debt, bond or conscription. That refusal is the central diplomatic fact of the Meridian Coast: every runaway bondholder on the continent knows the harbour is a door, [[faction.bondwrights-hall|the Bondwrights\' Hall]] considers the policy theft, and [[city.gilded-ascent|the Gilded Ascent]] has raised it at every trade negotiation for thirty years. The city has never traded it away and has been offered a great deal.',
      notableCrimes: [
        'False proof marking, prosecuted with the consequences attributed to the marker',
        'Attempting to enforce an indenture bond within the harbour district',
        'Drawing conduit pressure outside your allotted hours, which is theft from everyone downstream in the slot',
        'Selling [[item.pale-dust|pale dust]] or [[item.cinderroot-cordial|cinderroot cordial]], both banned outright',
        'Unlicensed practice of engineering, meaning any pressure, structural or optical work done for payment without a College seal',
      ],

      socialClasses: [
        row({ name: 'College fellows', share: '2%', note: 'Hold licences, patents and the conduit timetable. Elected by each other, answerable to nobody outside.' }),
        row({ name: 'Chartered masters', share: '7%', note: 'Own workshops and proof marks. Rich, liable, and the class that actually builds things.' }),
        row({ name: 'Licensed journeymen', share: '19%', note: 'May work under a master\'s mark. The College caps their number every year and the cap is the real politics.' }),
        row({ name: 'Terrace holders', share: '23%', note: 'Own or lease grove terraces. Vote, eat, and are the reason the city can refuse a bad bargain.' }),
        row({ name: 'Wage labour', share: '41%', note: 'Quays, kilns, groves and household service. Vote if rated, which most are, and strike effectively.' }),
        row({ name: 'Unbonded arrivals', share: '6 to 8%', note: 'People whose bonds are void here and who own nothing but that. Not a legal class, but everyone treats it as one.' }),
      ],

      population: '112,000 within the wall and the lower bands; about 170,000 with the terrace hinterland the city administers',
      demographics: [
        row({ group: 'Coast-born', share: '58%', note: 'Terrace families going back generations. Own most of the groves and half the workshops.' }),
        row({ group: 'Gulf and island', share: '14%', note: 'Sailors, shipwrights, cement burners. Their own quarter on the west mole and their own funeral clubs.' }),
        row({ group: 'Basin and inland', share: '12%', note: 'Factors, carriers and clerks. Disproportionately Ascent-aligned and aware of how that looks.' }),
        row({ group: 'Unbonded arrivals', share: '9%', note: 'Came here because the bond does not bite. Overrepresented in kilns, groves and the Lazaret staff.' }),
        row({ group: 'Steppe, pans and delta', share: '7%', note: 'Seasonal at first, resident now. The Lazaret\'s marsh-fever cases are almost all from this group.' }),
      ],
      languages: [
        'Coast speech, which is the language of the patent roll and therefore of every technical document on the continent',
        'Basin speech, universal among factors and taught in the College',
        '[[skill.trade-cant|Trade cant]] on the quays and in the Lazaret, where it is the only shared language available',
      ],
      cultures: TBD('The city keeps a full civic calendar of harvest, launch and tide observances. Is there a faith underneath it, or has the College simply become the thing people trust?'),

      food:
        'A genuine surplus, which is rare enough on this continent to be a strategic weapon. [[food.meridian-olive|Meridian olives]] are pressed three times, for table, lamp and machine, and the third pressing is why the city\'s machinery runs at all. [[food.terrace-citron|Terrace citron]] is boiled into a conserve that prevents the gum-rot that kills miners and ships\' crews, and is exported at a mark-up nobody can refuse. Grain, wine, fruit and fish besides. The assembly keeps a two-year reserve in the cisterns under the Vault Quarter and has released it twice, both times to somebody else\'s city, both times at a price.',
      water:
        '[[landmark.the-standing-aqueduct|The Standing Aqueduct]] brings water from the northern hills on 71 arches and drops it into a header reservoir above the wall, which feeds both the terrace irrigation and the conduit system. Everything below the header runs under pressure and everything is metered. Water in this city is not scarce; it is scheduled, which turns out to be a more interesting constraint.',
      staples: ['food.meridian-olive', 'food.terrace-citron', 'food.stair-loaf'],

      economy:
        'Precision and provisions. The city sells [[material.clearcast-glass|clearcast glass]], [[item.governor-spring|governor springs]], drawn wire and tube, [[material.orrery-bronze|orrery bronze]], instruments, [[material.tideset-cement|tideset cement]] and the printed [[item.orrery-tables|Orrery Tables]], and it sells oil, citron conserve and grain on top of that. It buys ore, charcoal, cane and salt.\n\nThe interesting part is the licence income. The College charges for the right to practise, the right to use a patent, and the conduit hours themselves, and the rent from those three is larger than any single manufacture. It is also the reason the city underperforms its own knowledge: there are working designs in the patent roll that have never been licensed, because licensing them would collapse the rent on the designs already out. A player who gets into the roll is not finding treasure, they are finding a policy decision.',
      mainProduction: 'Precision glass, springs, drawn stock, cement, oil and grain',
      currency: 'College tallies within the walls; [[item.stair-writ|stair writs]] at the harbour, grudgingly and at a discount',
      wealth: 'Rich',

      exports: ['material.clearcast-glass', 'item.governor-spring', 'material.orrery-bronze', 'material.tideset-cement', 'food.meridian-olive', 'food.terrace-citron', 'item.orrery-tables', 'item.springlock'],
      imports: ['material.blister-bar', 'material.scaldstone', 'material.pan-nitre', 'material.glasscane', 'material.mirelac', 'material.blackfall-button'],
      tradeNotes:
        'The city trades from a position of not needing to, which shows in every negotiation it enters. It will take a worse price to keep a supplier plural, and it will refuse a good price that comes with a legal condition, particularly any condition touching bond enforcement. Its exposure is charcoal from [[city.tree-city|the Tree City]] and the finest cut of [[material.pan-nitre|pan nitre]] from [[city.sifting-city|the Sifting City]]: one adulterated barrel of salt spoils a month of glass casting, which makes the Sifting City\'s grading fraud a Mediterranean problem and has twice nearly become a Mediterranean war.',

      localResources: ['deposit.ash-quarries', 'material.tideset-cement', 'material.mirelac', 'creature.verdigris-whelk'],
      resourceNotes:
        '[[deposit.ash-quarries|The Ash Quarries]] above the olive terraces are open to anyone with a shovel; the calcining kilns that turn the ash into [[material.tideset-cement|tideset cement]] are guild property and guild secret, which is the city\'s entire economic model in one sentence. [[creature.verdigris-whelk|Verdigris whelk]] are farmed in guarded terrace beds along the shore and yield the copper-binding liquor that makes the conduit lacquer, so poaching them is prosecuted as an attack on infrastructure. Everything metallic is imported. The city that makes the continent\'s best metal goods has no ore at all.',

      defense:
        'A landward wall along the fourth band edge, low, thick and built for artillery rather than escalade, with the harbour closed by a chain between two moles. The real defence is the terraces: an attacker on this coast is attacking uphill through irrigated ground held by people who know every cistern, and the assembly has a standing plan to cut the aqueduct at the eleventh arch, which would leave the besieger in a dry summer with a dying army.',
      doctrine:
        'Engineering, sea power and money, in that order. The city keeps 2,100 under arms and considers that plenty because it does not intend to hold ground: its doctrine is to make campaigning here expensive and to buy the third party. It builds the best [[item.springlock|springlocks]] on the continent and issues them sparingly, and it is the only city with a standing policy on what to do if [[city.sky-city|the Sky City]] ever comes down, which is a document the assembly reviews annually and has never published.',
      garrison: '2,100 regulars and harbour officers, plus a terrace militia of some 9,000 who muster in eleven days and go home for the harvest',

      factionNotes:
        '[[faction.conduit-college|The Conduit College]] is the power that matters and its hidden agenda is the unlicensed patent roll. The quarter assembly is a genuine counterweight and wins perhaps one fight in four. [[faction.bondwrights-hall|The Bondwrights\' Hall]] has no premises here and cannot get one, and works instead through Ascent factors who take a commission for looking the other way at the harbour. [[faction.concord-of-weights|The Concord of Weights]] keeps a large factory house on the Mole and would very much like the assembly to reconsider indenture. [[faction.standing-hour|The Standing Hour]] has its most functional and least corrupted chapter here, in the kilns and on the quays, mainly because the College is rich enough to concede small things and proud enough to concede them slowly.',

      currentConflict: 'The Tide Orrery has drifted and the College will not concede a fault in its own instrument',
      problems: [
        'The printed tables are being biased to hide a drift of roughly a day and a half over nine years; the first thing it will wreck is a spring tide the harbour is not braced for.',
        'Three patients in a private harbour ward carry a marsh parasite that should not exist west of the Drown, and it has not been reported.',
        'Harbour slots are being traded on advance knowledge of the tide error, and someone is making a great deal of money from it.',
        'The College has capped licensed journeymen for six years running while the yards are short-handed, and the Standing Hour has noticed.',
        'One adulterated barrel of pan nitre has already spoiled a month of casting this year, and the assay stamp it came with was genuine.',
      ],

      cityRelations: [
        row({ city: '[[city.gilded-ascent|The Gilded Ascent]]', stance: 'Necessary rival', note: 'Clearing runs through the Ascent and the Ascent knows it. The refusal to enforce indenture is the permanent wound.' }),
        row({ city: '[[city.sky-city|The Sky City]]', stance: 'Licensor', note: 'Conduit, instruments and fitters go up on renewable licence. The College will not sell the licence outright at any price offered so far.' }),
        row({ city: '[[city.tree-city|The Tree City]]', stance: 'Uncomfortable dependence', note: 'Charcoal for the Verdigris Hearth comes out of the Greatwood. The city funds nothing in Tree City politics and watches all of it.' }),
        row({ city: '[[city.sifting-city|The Sifting City]]', stance: 'Aggrieved buyer', note: 'The finest cut of pan nitre is a glass input. Grade fraud in the Pans is felt as sabotage here.' }),
        row({ city: '[[city.cave-agrarian-city|The Cave Agrarian City]]', stance: 'Technical partner', note: 'Tin, quicksilver and duct plate go east for the mirror ducts; fever clay and cultures come back.' }),
        row({ city: '[[city.arena-city|The Arena City]]', stance: 'Cold', note: 'Bond enforcement, cinderroot and the bone trade. The assembly has refused three separate embassies.' }),
        row({ city: '[[city.magic-city|The Magic City]]', stance: 'Correct and wary', note: 'Buys ward chalk, sells instruments and glass, and has never permitted a Fetterhouse office inside the wall.' }),
      ],

      signatureMechanic: 'Conduit Hours',
      mechanicNotes:
        '[[mechanic.conduit-hours|Conduit Hours]] gates every advanced craft in the city. Pressure is timetabled: a workshop bids for a slot, and a recipe consumes a stated number of slot-minutes. Miss the slot and the batch is scrap, because the process cannot be paused halfway. Practically this makes crafting a scheduling problem rather than a shopping problem: parties buy, borrow, steal or sabotage slots, and the mains-down maintenance windows are published in advance, which makes them both the safe time to enter the conduit and the time everyone else has planned around too. Pair it with [[skill.pressure-fitting|Pressure Fitting]] for anyone who wants to work outside the timetable, and with the College\'s prosecutors for anyone who is caught doing so.',

      npcNotes:
        '[[npc.melitta-aspri|Melitta Aspri]] calibrates the Orrery and has been biasing the printed tables to hide a drift she cannot correct without voiding a season of freight contracts. [[npc.anthimos-vellani|Anthimos Vellani]] is the harbour physician keeping three unreportable parasite cases in a private ward, because reporting means quarantine and quarantine rots the olive harvest. Both are competent people making a defensible bad decision, which is the register the city should be played in.',
      questNotes:
        '[[quest.four-minutes-fast|Four Minutes Fast]] is the local investigation and the College will not concede a fault in its own instrument; proving it reopens every harbour lease priced against the old tables, which is exactly why a party will be offered money to let it run fast. [[quest.the-casting-voice|The Casting Voice]] is the Ascent guild line\'s political branch and turns on a single copper-duty vote that binds for nine years. Local work: trace the parasite before it becomes an outbreak, find who is trading harbour slots on the tide error, and get inside the unlicensed patent roll.',

      services: [
        row({ name: 'Conduit slot broking', where: 'Conduit Yards, timetable hall', note: 'Bid for pressure by the slot-minute. Slots are resold openly and the resale market is where the money is.' }),
        row({ name: 'Licensed pressure fitting', where: 'Any College-sealed shop', note: 'Live cutting, gasketing and valving. Unlicensed work is prosecuted whether or not it holds.' }),
        row({ name: 'Optical and instrument work', where: 'Orrery Precinct', note: 'Lenses, tide gauges, instrument plate. The only place on the continent that can hold the tolerance.' }),
        row({ name: 'Printed [[item.orrery-tables|Orrery Tables]]', where: 'Orrery Precinct, seasonal issue', note: 'Gate safe passage on the gulf. Currently, quietly, wrong.' }),
        row({ name: 'Bond nullification', where: 'Harbour court, first band', note: 'A bond presented here is void and the presenter is charged. Free, fast, and it makes enemies for you elsewhere.' }),
        row({ name: 'Quarantine ward and physic', where: '[[district.mediterranean-city-the-lazaret|The Lazaret]]', note: 'Compulsory for flagged hulls. [[item.fever-clay|Fever clay]] and licensed surgery available; [[spell.stillwater-draught|stillwater draught]] by cutter\'s order only.' }),
        row({ name: 'Patent search', where: 'College roll room', note: 'Public in principle. In practice the unlicensed sections are not indexed and the indexes are the secret.' }),
      ],

      creatureNotes:
        '[[creature.verdigris-whelk|Verdigris whelk]] beds run the length of the shore under armed lease, and whelk poachers drown with a regularity the harbour officers do not investigate. [[creature.smoker-whale|Smoker whales]] out of the Eastern Deep are butchered here when one strands or is taken, for oil and for the sulphur ferment the College\'s chemists buy by the barrel, and a single carcass has twice nearly caused a shore war between gulf villages. Inland, the terrace groves have the ordinary pests and one that is not ordinary: a marsh parasite from [[region.the-drown|the Drown]] that should not survive this far west and, in three people in a private ward, currently is.',

      history:
        'The terraces predate the city and nobody knows who cut them, which is the one genuinely open question the College has never wanted answered. What is documented begins with cement: the discovery, or rediscovery, that ash and lime cure underwater, which let the harbour be built as harbour rather than beach. Everything else follows from having a deep sheltered port on a coast that grows a surplus. The College began as a body of harbour engineers licensed by the assembly and has spent every generation since converting technical authority into political rent, slowly enough that no single generation had grounds to stop it.',

      devNotes:
        'CANON ANCHORS: the Mediterranean City is the technologically advanced city; it sits at (430,1080) on the Meridian Coast in a fertile Mediterranean-like biome; it is built of whitewashed vaults, terracotta, glass and copper conduits with terraced orchards and olive groves; its landmark is the Tide Orrery; its palette is chalk white, terracotta, olive and verdigris.\n\n' +
        PROPOSAL('The College, the quarter assembly, the aqueduct, the tide mills, the patent roll and the void-indenture policy are proposed. Restraint rules for anyone extending this entry: nothing here computes anything a mechanism cannot compute, nothing moves faster than water, wind or muscle, and no process is instantaneous. The technology is standards, tolerance, metering and licensing. The three things that make the city genuinely advanced are the repeated vault span, the gauge system, and the fact that it can eat without asking anyone.'),
      openQuestions: [
        'The city needs a settled name. "The Mediterranean City" is the brief\'s working label, not a name people in the world would use.',
        'Who cut the terraces, and does the answer stay unanswered permanently?',
        'How far does the void-indenture policy actually reach: the harbour, the wall, or the whole administered hinterland?',
        'What is in the unlicensed section of the patent roll? It should be two or three specific, dull, world-changing things rather than a wonder.',
        'Does the assembly ever beat the College outright, and what would it cost?',
      ],
      cityMap: MERIDIAN_MAP,
    },
  }),

  E({
    id: 'district.mediterranean-city-the-mole',
    type: 'district',
    name: 'The Mole',
    status: 'draft',
    summary: 'Quays, chain moles and the harbour court where an indenture bond becomes waste paper.',
    tags: ['port', 'trade', 'law'],
    fields: {
      overview:
        'The first band, wrapped around the harbour. Two moles built of [[material.tideset-cement|tideset cement]] with a chain between them, eleven quays inside, the customs sheds, the ship yards, the factory houses of six foreign cities, and the harbour court. It is the busiest and the most cosmopolitan quarter, and the only one where the assembly rather than the College is unambiguously in charge.',
      city: [CITY.mediterranean],
      districtType: 'Harbour and mercantile',
      wealth: 'Prosperous and uneven',
      atmosphere:
        'Tar, citron, fish, hot cement dust, and eleven languages. Ships work the tide, so the district runs on the [[item.orrery-tables|Orrery Tables]], and the whole quarter shifts its working day twice a month because of a printed book. When the tables are wrong, the Mole is where the damage lands first.',
      architecture:
        'The same barrel vault as everywhere else, built heavier and closer to the water, with warehouse fronts opening directly onto the quay. The moles themselves are the oldest engineering in the city and were poured, not laid, which visitors from every other city find slightly indecent.',
      whoLivesHere: 'Quay labour, shipwrights, factors, customs clerks, and a large floating population of arrivals whose bonds stopped working at the harbour mouth',
      danger: 'Moderate. Crush injuries, drowning, and a knife over a berth.',
      playNotes:
        'The natural entry point to the city and to its most useful legal fact: present an [[item.indenture-bond|indenture bond]] in the harbour court and it is void, and the presenter is charged. That makes the Mole a sanctuary, a target, and a permanent grievance for [[faction.bondwrights-hall|the Bondwrights\' Hall]], who work here through Ascent factors rather than in their own name. Harbour slots traded on the tide error are brokered in the third shed from the chain.',
      devNotes: PROPOSAL('The harbour court and the void-bond rule are the district\'s reason to exist. It gives the setting one place where the indenture economy can be fought legally, which the dark-themes material badly needs.'),
    },
  }),

  E({
    id: 'district.mediterranean-city-conduit-yards',
    type: 'district',
    name: 'The Conduit Yards',
    status: 'draft',
    summary: 'The second band: drawbenches, kilns, the timetable hall, and the pressure that runs on a clock.',
    tags: ['industry', 'craft', 'machines'],
    fields: {
      overview:
        'The workshop belt, and the point where the city\'s reputation is actually earned. The [[machine.the-drawbench-vaults|Drawbench Vaults]] under the tide mills, the [[machine.the-frit-kiln|Frit Kiln]], the [[machine.the-verdigris-hearth|Verdigris Hearth]] at the eastern end where the wind takes the smoke off the groves, the spring-drawing shops, and the timetable hall where conduit hours are bid and resold.',
      city: [CITY.mediterranean],
      districtType: 'Industrial',
      wealth: 'Modest to comfortable, with a few very rich masters',
      atmosphere:
        'A working rhythm you can hear from the quays: the drawbenches run on the tide, so the whole district surges and slackens twice a day, and everything else is scheduled around that. Between slots the yards are oddly quiet and full of people waiting, which is when business gets done.',
      architecture:
        'Repeated vaults again, but built long and shallow with roof lights of [[material.clearcast-glass|clearcast glass]], and copper conduit on the outside of every wall in a green net. The [[landmark.the-mother-main|Mother Main]] runs down the middle of the district in a stone channel you can walk in when the mains are down.',
      whoLivesHere: 'Masters, journeymen, apprentices, kiln crews, and the licence brokers who live off the College\'s annual cap',
      danger: 'Moderate. Live pressure, molten glass, and a hearth that will take a hand off.',
      playNotes:
        'Where [[mechanic.conduit-hours|Conduit Hours]] is played. Buying a slot is a negotiation, stealing one is theft from everyone downstream, and working outside the timetable requires [[skill.pressure-fitting|Pressure Fitting]] and a willingness to be prosecuted. The published maintenance windows are the setting\'s most predictable infiltration route, and everyone knows it, which is the interesting part.',
      devNotes: PROPOSAL('The tide-driven work rhythm is the restraint marker for this city: the most advanced industry on the continent still stops when the water stops.'),
    },
  }),

  E({
    id: 'district.mediterranean-city-vault-quarter',
    type: 'district',
    name: 'The Vault Quarter',
    status: 'draft',
    summary: 'The western residential bands: repeated white vaults, public cisterns, and the two-year food reserve.',
    tags: ['residential', 'civic'],
    fields: {
      overview:
        'The third band west of the great stair, and where most of the city lives. Block after block of the same vault span, whitewashed, pantiled, with a cistern under each block and a shared court between every four. The assembly\'s food reserve is stored in the deep cisterns beneath the quarter, which is why the district has more constables than any other and no crime worth the name.',
      city: [CITY.mediterranean],
      districtType: 'Residential and civic storage',
      wealth: 'Comfortable',
      atmosphere:
        'Domestic and loud in the evenings, dead quiet at midday. The repeated span makes the streets feel machine-made, which they effectively are: the same centring has been reused for a century and a half, so a house built last year and one built in your great-grandmother\'s time have the same ceiling.',
      architecture:
        'The purest expression of the city\'s method. One span, one formwork, one roof pitch, endlessly repeated, with variation only in the render, the door and the conduit. Wealth here shows in glazing and in how much verdigris the household polishes off.',
      whoLivesHere: 'Journeymen, clerks, quay foremen, terrace holders with a town house, and most of the unbonded arrivals who have found work',
      danger: 'Low',
      playNotes:
        'The place to hide, to lodge, and to hear things. It is also where the two-year reserve is: a quest that needs the city to make a hard choice about feeding someone else\'s famine happens in these cisterns. The quarter assembly meets on the second court and its sessions are public, badly attended and occasionally decisive.',
      devNotes: PROPOSAL('The repeated vault span is the deliberate "advanced but not futuristic" signal: standardisation as technology. Keep it visible everywhere in this city.'),
    },
  }),

  E({
    id: 'district.mediterranean-city-orrery-precinct',
    type: 'district',
    name: 'The Orrery Precinct',
    status: 'draft',
    summary: 'The eastern upper band: the Orrery under its glass dome, the College halls, and the patent roll.',
    tags: ['science', 'government', 'secrets'],
    fields: {
      overview:
        'The College\'s own quarter: the lecture halls, the proof house, the instrument shops, the roll room where every patent on the continent is registered, and the glass dome over [[landmark.the-tide-orrery|the Tide Orrery]] itself. It is the highest built ground inside the wall and the only place in the city where the assembly has no writ at all.',
      city: [CITY.mediterranean],
      districtType: 'Institutional and instrument-making',
      wealth: 'Rich',
      atmosphere:
        'Cool, ordered, and quieter than a district of this many people should be. The precinct runs on bells rather than the tide. The Orrery is audible from the whole quarter as a soft irregular clicking, and residents claim they can hear when it is being adjusted.',
      architecture:
        'The only building in the city that breaks the repeated span: the dome, a shallow glass and bronze shell over the Orrery hall, built to keep dust and temperature off nine thousand gears. Around it the College halls are conventional vaults built to an unusually fine finish, which the fellows would tell you is not vanity but a demonstration piece.',
      whoLivesHere: 'Fellows, their households, instrument makers, roll clerks, and about 400 students who are not permitted to marry during their term',
      danger: 'Low physically; the precinct ruins careers rather than bodies',
      playNotes:
        '[[npc.melitta-aspri|Melitta Aspri]] works here and is biasing the tables. [[quest.four-minutes-fast|Four Minutes Fast]] lives or dies in the roll room and the Orrery hall. The unlicensed section of the patent roll is the district\'s real treasure and it is not guarded like treasure: it is simply not indexed, and the indexes are held by three fellows who each hold a third.',
      devNotes: PROPOSAL('The unindexed patent roll gives faction.conduit-college its hidden agenda a physical location. Whatever is in it should be dull and enormous: a bearing, a valve, a cement.'),
    },
  }),

  E({
    id: 'district.mediterranean-city-terrace-groves',
    type: 'district',
    name: 'The Terrace Groves',
    status: 'draft',
    summary: 'Above the wall: olive, citron and grain on stepped terraces older than the city, and the water that feeds them.',
    tags: ['agriculture', 'water', 'hinterland'],
    fields: {
      overview:
        'Everything above the wall: some 40,000 terraces of olive, citron, vine and grain climbing to the ridge, the header reservoir, the distribution channels, and the villages that work them. It is administered as a city quarter, votes as one, and produces the surplus that lets the whole place behave the way it does.',
      city: [CITY.mediterranean],
      districtType: 'Agricultural terraces',
      wealth: 'Modest, with deep old wealth in the grove families',
      atmosphere:
        'Wind in hard leaves, water running in channels, and the smell of the third pressing from the mills in autumn. From up here the city is a set of white steps and the harbour is a bowl of light, and everyone who lives above the wall says the same thing about how the people below it think.',
      architecture:
        'Dry stone terrace walls, some of them older than any building in the city and cut to a standard nobody now matches. Mills, presses and cisterns at the channel junctions. The [[landmark.the-standing-aqueduct|Standing Aqueduct]] comes in across the top of the district and its arches are the district\'s landmarks, boundaries and shade.',
      whoLivesHere: 'Grove families, terrace labourers, millers, water-wardens, and seasonal crews who come up from the quays for the harvest',
      danger: 'Low, except in a fire year',
      playNotes:
        'A grove takes two centuries to mature, so burning one is an act of war and is treated as such. Water allocation on the channels is the local politics and the water-wardens can be bought. This is also where an outbreak would be worst: [[npc.anthimos-vellani|Anthimos Vellani]] is not reporting his three cases precisely because quarantine here means the harvest rots, and that trade-off should be presented to players without a clean answer.',
      devNotes: PROPOSAL('The terraces predating the city is the one deliberate mystery kept in this entry. Do not answer it casually.'),
    },
  }),

  E({
    id: 'district.mediterranean-city-the-lazaret',
    type: 'district',
    name: 'The Lazaret',
    status: 'draft',
    summary: 'A walled quarantine island in the bay: forty days, a chain, and the ward nobody is supposed to know about.',
    tags: ['quarantine', 'dark', 'medicine'],
    fields: {
      overview:
        'A low rock island 600 strides off the west mole, walled, gated and chained to nothing. Flagged hulls anchor off it, crews and cargo come ashore, and nobody leaves for forty days. It has a hospital, a burning ground, a cistern, and a small permanent staff who are mostly unbonded arrivals because the pay is good and the work is what it is.',
      city: [CITY.mediterranean],
      districtType: 'Quarantine station',
      wealth: 'Poor',
      atmosphere:
        'Whitewash, lime, sea wind and boredom, punctuated by weeks that are not boredom at all. The city is visible from every point on the island, which the physicians consider therapeutic and the detained consider a specific kind of cruelty.',
      architecture:
        'A single wall, four vault ranges around a court, a chapel-shaped building that is actually the fumigation house, and a jetty with a gate on it. Everything is limewashed twice a year whether it needs it or not.',
      whoLivesHere: 'Forty to 300 detained depending on the season; about sixty permanent staff, three physicians, and one wardsman',
      danger: 'High in an outbreak year, dull in every other',
      playNotes:
        'The city\'s pressure valve and its blind spot. [[npc.anthimos-vellani|Anthimos Vellani]]\'s three parasite cases are not here, which is the problem: they are in a private harbour ward, because entering them in the Lazaret register would trigger a quarantine that rots the olive harvest. [[skill.plague-reading|Plague Reading]] buys a party the diagnosis and hands them the decision. [[item.fever-clay|Fever clay]] is stocked; there is not enough of it.',
      devNotes: PROPOSAL('The Lazaret exists so a plague plot has somewhere to be, and so the city\'s competence has a visible limit. Keep the horror administrative: the register, the forty days, the harvest.'),
    },
  }),

  E({
    id: 'landmark.the-tide-orrery',
    type: 'landmark',
    name: 'The Tide Orrery',
    status: 'draft',
    summary: 'Nine thousand bronze gears driven by the tide itself, printing the tables the whole coast lives by.',
    tags: ['canon-landmark', 'technology', 'instrument'],
    fields: {
      overview:
        'A calculating engine of roughly 9,000 [[material.orrery-bronze|orrery bronze]] gears, driven by a float in a stilling well connected to the harbour, which integrates the tide it is standing in and predicts the tides, winds and star positions for the following season. Its output is printed as [[item.orrery-tables|the Orrery Tables]], and the Meridian Coast plants, sails and prices freight against them.',
      city: [CITY.mediterranean],
      landmarkType: 'Tidal calculating engine',
      built: TBD('Built in stages by a named succession of fellows, or assembled once? The gear trains use two incompatible tooth standards, which argues for stages.'),
      appearance:
        'A hall the size of a small church, floored in stone, with the engine standing in the middle in eleven bronze frames under a shallow glass dome. It is not enclosed: you can walk around it, and school parties do. The sound is a soft irregular clicking with a heavier beat every few minutes as the tide train advances.',
      function:
        'Prediction, and therefore pricing. Harbour slots, freight contracts, planting dates and insurance are all written against the tables. It has drifted by roughly a day and a half over nine years, [[npc.melitta-aspri|the calibrator]] has been biasing the printed tables to conceal the gap, and correcting it publicly would void this season\'s freight contracts across the coast.',
      access:
        'Public on nine days a month, staff only otherwise, and the stilling well and tide train are behind a locked gallery that three people hold keys to. The engine cannot be stopped without losing its integration, which means any tampering has to be done to a machine that is running.',
      devNotes:
        'CANON ANCHOR: the Tide Orrery is the Mediterranean City\'s central landmark. ' +
        PROPOSAL('The mechanism, the drift and the biased tables are proposed and support quest.four-minutes-fast. Restraint note: it is an analogue integrator driven by water. It does not think, it does not store, and it cannot be asked a question it was not geared for.'),
    },
  }),

  E({
    id: 'landmark.the-standing-aqueduct',
    type: 'landmark',
    name: 'The Standing Aqueduct',
    status: 'draft',
    summary: 'Seventy-one arches bringing the northern hills into the city; cut the eleventh and the siege ends itself.',
    tags: ['infrastructure', 'water', 'defence'],
    fields: {
      overview:
        'The city\'s water supply and its largest single structure: 71 arches carrying a lined channel from a spring gallery in the northern hills, across the grove terraces, to a header reservoir above the wall. Everything downhill of the header runs under pressure, so the aqueduct is not merely the water supply, it is the power supply as well.',
      city: [CITY.mediterranean],
      landmarkType: 'Aqueduct and header works',
      built: TBD('The lower courses use a cement the College says it cannot now match, which is either a lost recipe or an unlicensed one.'),
      appearance:
        'Grey limestone piers rising to three tiers at the deepest crossing, chalk-white render on the channel itself, and 71 arches in a line across the groves. Grove families measure distance in arches and give directions by them.',
      function:
        'Water for irrigation, drinking, the conduit system and the tide-independent mills. The header reservoir is the metering point for [[mechanic.conduit-hours|Conduit Hours]]: when the College sells a slot, this is the tank it is selling out of.',
      access:
        'The channel is walkable at maintenance and guarded at the eleventh arch, which is the designated cut point in the city\'s standing defence plan: cut there and a besieging army is dry inside a week, along with the upper terraces. That plan is public, which is most of the reason it has never been needed.',
      devNotes: PROPOSAL('The aqueduct converts the city\'s water into its energy, which is what lets Conduit Hours be a real constraint. The unmatched cement in the lower courses is a hook back to the unindexed patent roll.'),
    },
  }),

  E({
    id: 'landmark.the-mother-main',
    type: 'landmark',
    name: 'The Mother Main',
    status: 'draft',
    summary: 'The great conduit trunk under the yards: walkable when down, published in advance, and everyone knows it.',
    tags: ['infrastructure', 'infiltration'],
    fields: {
      overview:
        'The primary pressure trunk from the header reservoir into the Conduit Yards: a copper-lined stone channel a stride and a half across, running the length of the district with branch valves every forty strides. Every workshop in the city is downstream of it, and every conduit hour sold is a share of what passes through it.',
      city: [CITY.mediterranean],
      landmarkType: 'Pressure trunk',
      built: TBD('The stone channel is older than the copper lining. What was it carrying before, and for whom?'),
      appearance:
        'From the street, a line of iron access plates down the middle of the yards and a smell of wet metal. Inside, a dark lined channel with the branch valves standing off it like ribs, marked with the quarter and slot numbers they feed.',
      function:
        'Distribution and metering. The valves are the physical form of the timetable: closing one is theft from a specific workshop on a specific afternoon, which is why interference here is prosecuted as though it were sabotage rather than trespass.',
      access:
        'Walkable during scheduled mains-down maintenance, which is published a fortnight in advance in the timetable hall. That publication is the setting\'s most useful and most crowded infiltration window: the College knows, the [[faction.low-tally|Low Tally]] knows, and the constables know, and all three plan around each other.',
      devNotes: PROPOSAL('The published maintenance window is a deliberate design gift: a recurring, dated, legal-to-know opportunity that multiple factions are also using. Good for heist planning that is about timing rather than lockpicks.'),
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* --- The Gilded Ascent ------------------------------------------ */
  R(CITY.gildedAscent, 'located_in', REGION.ascentBasin, 'the confluence of the three forks'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-counting-terrace'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-salt-office'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-bonded-vaults'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-hoist-yards'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-under-stair'),
  R(CITY.gildedAscent, 'contains', 'district.gilded-ascent-confluence-wharves'),
  R(CITY.gildedAscent, 'contains', 'landmark.the-counting-stair'),
  R(CITY.gildedAscent, 'contains', 'landmark.the-brass-standard'),
  R(CITY.gildedAscent, 'contains', 'landmark.the-stopped-bell'),
  R('faction.concord-of-weights', 'controls', CITY.gildedAscent, 'the government in all but name'),
  R('faction.bondwrights-hall', 'located_in', CITY.gildedAscent, 'fourth terrace'),
  R('faction.bonewax-post', 'located_in', CITY.gildedAscent, 'largest sorting house on the fifth terrace'),
  R('faction.standing-hour', 'contests', CITY.gildedAscent, 'named for the hour the Ascent hoists stopped'),
  R('faction.low-tally', 'smuggles_with', CITY.gildedAscent, 'through the silted staiths of the Confluence Wharves', true),
  R('faction.red-writ', 'allied_with', CITY.gildedAscent, 'three retained companies on standing contract'),
  R('npc.wessel-ondriek', 'located_in', 'district.gilded-ascent-counting-terrace'),
  R('npc.wessel-ondriek', 'member_of', 'faction.concord-of-weights', 'Chief Factor of the Counting Stair'),
  R('npc.doret-halvane', 'located_in', 'district.gilded-ascent-hoist-yards'),
  R('npc.brask-vellmar', 'located_in', 'district.gilded-ascent-hoist-yards', 'cable inspector on the No. 3 main'),
  R('npc.ilke-samarost', 'located_in', 'district.gilded-ascent-salt-office', 'her final audit is plastered into a wall in the Under-Stair'),
  R('machine.the-tally-engine', 'located_in', CITY.gildedAscent, 'clearing house'),
  R('machine.the-assay-cage', 'located_in', 'district.gilded-ascent-salt-office'),
  R('machine.the-oxblood-hoists', 'located_in', 'district.gilded-ascent-hoist-yards'),
  R(CITY.gildedAscent, 'produces', 'item.stair-writ', 'the closest thing to money on the continent'),
  R(CITY.gildedAscent, 'produces', 'item.factors-seal'),
  R(CITY.gildedAscent, 'produces', 'item.oxblood-coat'),
  R(CITY.gildedAscent, 'consumes', 'material.stairwire', 'eight hoist runs and their spares'),
  R(CITY.gildedAscent, 'consumes', 'food.stair-loaf', 'the loaf price is the city\'s index of unrest'),
  R(CITY.gildedAscent, 'consumes', 'material.blister-bar'),
  R('creature.ledger-moth', 'inhabits', CITY.gildedAscent, 'the reason every bonded vault keeps a moth-warden'),
  R(CITY.gildedAscent, 'related_to', 'mechanic.standing-ledger', 'signature mechanic'),
  R('quest.short-weight', 'located_in', CITY.gildedAscent),
  R('quest.the-master-weight', 'located_in', CITY.gildedAscent),
  R('quest.the-master-weight', 'involves', 'landmark.the-brass-standard', 'the mark'),
  R('quest.the-scar-concession', 'located_in', CITY.gildedAscent, 'auctioned on the Counting Stair'),
  R(CITY.gildedAscent, 'trades_with', CITY.skyCity, 'lift, cable, counterweight leases'),
  R(CITY.gildedAscent, 'trades_with', CITY.mediterranean, 'clearing against precision goods'),
  R(CITY.gildedAscent, 'trades_with', CITY.caveAgrarian, 'grain down the Karst Fork against advances'),
  R(CITY.skyCity, 'owes_debt_to', CITY.gildedAscent, 'counterweight leases sold forward against Ascent paper'),
  R(CITY.caveAgrarian, 'owes_debt_to', CITY.gildedAscent, 'advances against next year\'s light allocation'),

  /* --- The Sky City ----------------------------------------------- */
  R(CITY.skyCity, 'located_in', REGION.anvilShelf, 'over the standing thermal at the western lip'),
  R(CITY.skyCity, 'contains', 'district.sky-city-crown-houses'),
  R(CITY.skyCity, 'contains', 'district.sky-city-mooring-ring'),
  R(CITY.skyCity, 'contains', 'district.sky-city-counterweight-quarter'),
  R(CITY.skyCity, 'contains', 'district.sky-city-lattice-town'),
  R(CITY.skyCity, 'contains', 'district.sky-city-the-underdeck'),
  R(CITY.skyCity, 'contains', 'district.sky-city-shelf-foot'),
  R(CITY.skyCity, 'contains', 'landmark.the-mooring-crown'),
  R(CITY.skyCity, 'contains', 'landmark.the-sixth-mast'),
  R(CITY.skyCity, 'contains', 'landmark.the-ballast-drop'),
  R('faction.mooring-assize', 'controls', CITY.skyCity, 'nothing rises unpriced'),
  R('faction.concord-of-weights', 'infiltrates', CITY.skyCity, 'Ascent factors lodged within sight of the registry hall', true),
  R('faction.bondwrights-hall', 'located_in', CITY.skyCity, 'allowance labour is most of the way to a bond'),
  R('faction.low-tally', 'smuggles_with', CITY.skyCity, 'the six unaccounted mooring lines', true),
  R('npc.cesille-vaudry', 'located_in', 'district.sky-city-crown-houses'),
  R('npc.cesille-vaudry', 'leads', 'faction.mooring-assize', 'Warden of the Mooring Crown'),
  R('npc.aubran-ferrieu', 'located_in', 'district.sky-city-shelf-foot', 'has not been above ground in four years'),
  R('npc.perrine-orlaunt', 'located_in', 'district.sky-city-the-underdeck', 'works out of the western ballast shafts'),
  R('machine.the-strand-loom', 'located_in', CITY.skyCity, 'the only unspliced long cable on the continent'),
  R(CITY.skyCity, 'produces', 'material.stairwire'),
  R(CITY.skyCity, 'produces', 'material.sparbone', 'on a quota it enforces on nobody but itself'),
  R(CITY.skyCity, 'produces', 'item.mooring-lance'),
  R(CITY.skyCity, 'consumes', 'food.lattice-cress', 'the only food it grows'),
  R(CITY.skyCity, 'consumes', 'material.glasscane', 'lattice spar stock, rafted up from the delta'),
  R(CITY.skyCity, 'consumes', 'food.stair-loaf', 'lifted from Shelf-Foot on Ascent paper'),
  R(CITY.skyCity, 'produces', 'material.ward-chalk', 'ward marl cut from the shelf turf and sold forward'),
  R('creature.loftwrack', 'inhabits', REGION.anvilShelf, 'culled for lift-bladder membrane; a culled raft falls on Shelf-Foot'),
  R(CITY.skyCity, 'related_to', 'mechanic.mass-warrant', 'signature mechanic'),
  R('quest.the-sixteenth-mast', 'located_in', CITY.skyCity),
  R('quest.the-second-ledger', 'located_in', CITY.skyCity, 'a lattice-house counting room under the Crown'),
  R('item.crown-bolt', 'related_to', 'landmark.the-mooring-crown', 'every one taken is a piece no longer holding the city up'),
  R(CITY.skyCity, 'trades_with', CITY.mediterranean, 'conduit, instruments and fitters on renewable licence'),
  R(CITY.skyCity, 'trades_with', CITY.magicCity, 'ward marl east, licensed load-binding back'),
  R(CITY.skyCity, 'rival_of', CITY.gildedAscent, 'mutually mortgaged; neither can afford the other\'s honesty'),

  /* --- The Mediterranean City -------------------------------------- */
  R(CITY.mediterranean, 'located_in', REGION.meridianCoast, 'an amphitheatre above a bitten-out harbour'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-the-mole'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-conduit-yards'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-vault-quarter'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-orrery-precinct'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-terrace-groves'),
  R(CITY.mediterranean, 'contains', 'district.mediterranean-city-the-lazaret'),
  R(CITY.mediterranean, 'contains', 'landmark.the-tide-orrery'),
  R(CITY.mediterranean, 'contains', 'landmark.the-standing-aqueduct'),
  R(CITY.mediterranean, 'contains', 'landmark.the-mother-main'),
  R('faction.conduit-college', 'controls', CITY.mediterranean, 'licence, patent roll and the conduit timetable'),
  R('faction.conduit-college', 'controls', 'landmark.the-tide-orrery'),
  R('faction.standing-hour', 'located_in', CITY.mediterranean, 'its least corrupted chapter, in the kilns and on the quays'),
  R('faction.bondwrights-hall', 'rival_of', CITY.mediterranean, 'indenture bonds are void and prosecutable in the harbour'),
  R('faction.concord-of-weights', 'trades_with', CITY.mediterranean, 'a large factory house on the Mole'),
  R('npc.melitta-aspri', 'located_in', 'district.mediterranean-city-orrery-precinct'),
  R('npc.melitta-aspri', 'member_of', 'faction.conduit-college', 'calibrator of the Tide Orrery'),
  R('npc.anthimos-vellani', 'located_in', 'district.mediterranean-city-the-mole', 'a private ward off the harbour'),
  R('machine.the-drawbench-vaults', 'located_in', 'district.mediterranean-city-conduit-yards'),
  R('machine.the-frit-kiln', 'located_in', 'district.mediterranean-city-conduit-yards'),
  R('machine.the-verdigris-hearth', 'located_in', 'district.mediterranean-city-conduit-yards', 'at the eastern end, downwind of the groves'),
  R(CITY.mediterranean, 'produces', 'material.clearcast-glass'),
  R(CITY.mediterranean, 'produces', 'item.governor-spring', 'the continent\'s bottleneck component'),
  R(CITY.mediterranean, 'produces', 'material.tideset-cement'),
  R(CITY.mediterranean, 'produces', 'material.orrery-bronze'),
  R(CITY.mediterranean, 'produces', 'item.orrery-tables'),
  R(CITY.mediterranean, 'produces', 'item.springlock'),
  R(CITY.mediterranean, 'produces', 'food.meridian-olive', 'pressed three times: table, lamp and machine'),
  R(CITY.mediterranean, 'produces', 'food.terrace-citron'),
  R(CITY.mediterranean, 'consumes', 'material.pan-nitre', 'the finest cut only; one adulterated barrel spoils a month of casting'),
  R(CITY.mediterranean, 'consumes', 'material.blister-bar'),
  R(CITY.mediterranean, 'consumes', 'material.mirelac', 'nearly the whole delta crop, for conduit lacquer'),
  R(CITY.mediterranean, 'contains', 'deposit.ash-quarries', 'open to anyone with a shovel; the kilns are not'),
  R('creature.verdigris-whelk', 'inhabits', REGION.meridianCoast, 'farmed in guarded terrace beds along the shore'),
  R('creature.smoker-whale', 'related_to', CITY.mediterranean, 'sulphur ferment bought by the barrel by College chemists'),
  R(CITY.mediterranean, 'related_to', 'mechanic.conduit-hours', 'signature mechanic'),
  R('quest.four-minutes-fast', 'located_in', CITY.mediterranean),
  R('quest.four-minutes-fast', 'involves', 'landmark.the-tide-orrery'),
  R('quest.the-casting-voice', 'located_in', CITY.mediterranean, 'one copper-duty vote, binding for nine years'),
  R(CITY.mediterranean, 'trades_with', CITY.treeCity, 'charcoal for the Verdigris Hearth'),
  R(CITY.mediterranean, 'trades_with', CITY.siftingCity, 'the finest cut of pan nitre'),
  R(CITY.mediterranean, 'trades_with', CITY.caveAgrarian, 'tin, quicksilver and duct plate east; cultures and fever clay back'),
  R(CITY.mediterranean, 'rival_of', CITY.arenaCity, 'bond enforcement, cinderroot and the bone trade'),
]
