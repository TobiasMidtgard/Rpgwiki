/**
 * History, wars and routes.
 *
 * Three related sections in one module, because they are one argument: the
 * timeline explains why the present looks the way it does, the conflicts are
 * the parts of that history still running, and the routes are the lines on the
 * map those two things are fought over.
 *
 * Nothing here is canon. The brief establishes thirteen settlements and a tone;
 * it establishes no dates, no wars and no roads. What it does establish is that
 * the Gilded Ascent is the trading hub, which only makes sense if something
 * made it one, and that is the job this file does.
 *
 * DATING. There is no calendar. Every `year` below is a sort key in a working
 * reckoning where 0 is the Seventh Terrace fire (the first year any counting
 * house ledger covers) and 218 is the present. Rebase the whole set by adding a
 * constant if a real calendar is ever settled. See `note.time-and-calendar`.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/** Appended to every event's developer notes so the reckoning is never mistaken for canon. */
const CAL =
  '\n\nDATING: no calendar is established anywhere in this setting. See ' +
  '[[note.time-and-calendar|Is there a calendar, and does time pass?]]. The sort year on this entry is a working ' +
  'reckoning in which 0 is [[event.the-seventh-terrace-fire|the Seventh Terrace fire]] and 218 is the present, ' +
  'because the fire is the only date the brief-adjacent city entries already agree on. Rebase freely.'

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

const EVENTS: SeedEntity[] = [
  /* ================================================================ */
  /* DEEP PAST                                                         */
  /* ================================================================ */

  E({
    id: 'event.the-cut-terraces',
    type: 'event',
    name: 'The Cut Terraces',
    status: 'draft',
    summary: 'Somebody terraced two coastlines and a highland flank, left no other mark, and is not remembered.',
    tags: ['deep past', 'mystery', 'ruins'],
    fields: {
      overview:
        'Three places on the continent carry the same work: the lower orchard benches above [[city.mediterranean-city|the Mediterranean City]], the eastern flank of [[city.oruvai|Oruvai]], and a run of dry steps on the north side of [[region.hollow-karst|the Hollow Karst]] that nothing has ever been grown on. Cut stone risers, a consistent tread, drainage channels behind the wall, and no buildings, no burials, no pottery and no tools anywhere near them.\n\nEvery city that owns a set has quietly decided the terraces are its own and stopped asking. The [[faction.conduit-college|Conduit College]] surveyed the Meridian benches once, found the risers laid to a tolerance its own masons cannot hold, and has never published.',
      date: TBD('How long before the ledgers? Nothing dates the terraces except weathering, and nobody has been paid to measure that.'),
      year: -620,
      era: 'Deep past',
      eventType: 'Founding',
      account:
        'There is no account. There is a survey, and the survey is the whole problem: the risers on the Meridian benches, the Oruvai flank and the karst steps are laid to within a finger of one another across some four hundred leagues, which means one body of people did all three, which means that body of people was organised on a scale nothing else in the record matches.\n\nThe Mediterranean City tells visitors its founders cut the benches. Its own vault quarter is built on the second bench and the foundations cut through the drainage channel, which is not how you build on your grandmother\'s work.',
      consequences: [
        '[[city.mediterranean-city|The Mediterranean City]] has arable terracing it did not have to build, which is the actual reason it can feed itself without asking anyone',
        '[[city.oruvai|Oruvai]] holds a flank of worked stone older than any account of the town, and does not discuss it with visiting factors',
        'The Conduit College keeps an unpublished survey, which is one more item in a patent roll it already refuses to open',
        'Any campaign that wants a deep-time thread has a physical, measurable, non-magical anomaly to start from',
      ],
      devNotes:
        PROPOSAL(
          'The terraces are invented to give the setting one genuine deep-past question that is not a monster, a curse or an ancient evil. The rule for anyone extending this: the answer must remain material. Somebody organised a lot of labour and left. Whether they are related to whatever cut the Oruvai flank is exactly the sort of thing to leave unanswered.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-opening-of-the-scar',
    type: 'event',
    name: 'The Opening of the Scar',
    status: 'draft',
    summary: 'The ground east of the Ironback stopped behaving, and has not started again.',
    tags: ['deep past', 'magic', 'disaster'],
    fields: {
      overview:
        'At some point long before anybody was writing things down, a band of country roughly ninety leagues across changed. Rock in [[region.aetheric-scar|the Aetheric Scar]] holds charge the way a sponge holds water, brine in the sinkholes crystallises into [[material.levin-salt|levin salt]], and violet [[material.quenchspar|quenchspar]] grows in the rubble of the cold quarter. Nothing about it is subtle and nothing about it is finished.\n\nThe question the [[faction.fetterhouse|Fetterhouse]] will not put in writing is whether the Scar opened, in the sense of an event with a day attached, or whether it has always been widening at a rate too slow to notice. The two answers imply completely different futures for [[city.magic-city|the Magic City]].',
      date: TBD('One event or a process? The Fetterhouse has surveys going back a century and they do not settle it.'),
      year: -540,
      era: 'Deep past',
      eventType: 'Disaster',
      account:
        'What survives is geology and one piece of folk evidence. The geology: the [[deposit.brine-sinks|brine sinks]] along the southern lip are cut into a older, ordinary limestone, and the charged layer sits on top of it like a stain rather than a seam. The folk evidence: the herding peoples of [[region.anvil-shelf|the Anvil Shelf]] have a class of stories about a season the animals would not go east, which is either a memory or the sort of thing every people says about the direction they do not go.\n\nNothing in the Scar is dated because dating it would need someone to stand in the core for long enough to sample it, and [[skill.scar-reading|Scar Reading]] is a skill for judging where it is survivable to stand, not for staying.',
      consequences: [
        'The only known source of [[material.levin-salt|levin salt]], [[material.quenchspar|quenchspar]] and [[material.faultglass|faultglass]] sits inside one region, which is why magic is a trade with a supply chain rather than a talent',
        'A fault in charged rock is a structural hazard that can be bound but not fixed, which is the whole premise of [[city.magic-city|the Magic City]]',
        'The unsurveyed core is marked on the atlas as a danger zone and has never been walked end to end',
        '[[region.mistfall-coast|The Mistfall Coast]] and [[region.ironback-range|the Ironback]] both bound the Scar, and neither has ever reported the effect crossing the line',
      ],
      devNotes:
        PROPOSAL(
          'The Scar is required by the brief only as the Magic City\'s siting. This entry declines to say what made it, on purpose: the useful version is an anomaly with measurable properties and no origin story, because an origin story turns a regulated resource into a mystery box. Keep the answer out of reach and keep the surveys in play.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-ashfall-years',
    type: 'event',
    name: 'The Ashfall Years',
    status: 'draft',
    summary: 'A long volcanic episode that buried the south-east, and left two of the continent\'s three great resources behind.',
    tags: ['deep past', 'disaster', 'geology'],
    fields: {
      overview:
        'The [[region.cinder-waste|Cinder Waste]] is not old desert. It is a burial. Somewhere under it is a drainage system, and the ash that covers it is the same ash quarried openly above the olive terraces on [[region.meridian-coast|the Meridian Coast]] and calcined into [[material.tideset-cement|tideset cement]]. The fall reached both coasts, which means it went on for a long time and put a great deal of material into the air.\n\nThe second legacy is finer and stranger. The iron-black sand the wind has been sorting into the lee dunes of [[region.white-pans|the White Pans]] for centuries has no local parent rock, which leaves it having fallen out of the sky along with everything else.',
      date: TBD('One episode or several? The ash beds above the Meridian terraces are layered, and nobody has counted the layers.'),
      year: -470,
      era: 'Deep past',
      eventType: 'Disaster',
      account:
        'The evidence is entirely commercial, which is the joke: nobody investigated any of this out of curiosity. Mediterranean kiln masters worked out which ash beds calcine well and which do not, and in doing so mapped a fall pattern across four hundred leagues without ever calling it that. Sifting City crucible masters worked out that the black drift reduces to [[material.blackfall-button|Blackfall Button]] and stopped caring where it came from the moment the sheds were licensed.\n\nWhat nobody has done is the obvious thing, which is to put the two maps side by side and ask whether [[deposit.ash-quarries|the ash quarries]] and [[deposit.blackfall-drifts|the Blackfall drifts]] are the same event seen from two ends.',
      consequences: [
        '[[material.tideset-cement|Tideset cement]] exists, so the Meridian Coast can build harbour works, so a deep sheltered port is possible on that coast at all',
        '[[material.blackfall-sand|Blackfall sand]] exists in one place on the continent, so wire-drawing dies exist, so drawn wire exists, so [[material.stairwire|stairwire]] and the Sky City lattice exist',
        '[[region.cinder-waste|The Cinder Waste]] is dry because its drainage is buried, not because of the climate, which means water there is a matter of finding the old channels',
        'Nobody has published the comparison, and doing so would be a genuine discovery a player party could make',
      ],
      devNotes:
        PROPOSAL(
          'One geological event underwrites two separate industrial monopolies at opposite ends of the map. That is the entire design purpose: it gives the economy a physical cause rather than an arbitrary distribution, and it hands a party a piece of pure knowledge worth money to three cities. The layer count is a deliberate open question.',
        ) + CAL,
    },
  }),

  /* ================================================================ */
  /* FOUNDING AGE                                                      */
  /* ================================================================ */

  E({
    id: 'event.the-ferry-and-the-weight',
    type: 'event',
    name: 'The Ferry and the Agreed Weight',
    status: 'draft',
    summary: 'A ferry, then a bonded shed, then a stone everybody consented to weigh against. The city is what grew on the stone.',
    tags: ['founding age', 'gilded ascent', 'trade'],
    fields: {
      overview:
        'The three-fork confluence had a ferry before it had anything else, because everything moving east to west had to change hulls there and everything moving north to south had to change animals at the pass above it. A ferry needs somewhere to put cargo overnight, so there was a shed. A shed that holds other people\'s cargo needs a way of saying how much of it there is, so there was a stone.\n\nThe stone is the invention. Not a stronger stone or a cleverer one, but one that four rival carrying trades all agreed to use, which had never previously happened anywhere on the river. [[city.gilded-ascent|The Gilded Ascent]] is the two hundred years of building that accreted around that agreement.',
      date: 'Roughly a century and a half before the ledgers open',
      year: -164,
      era: 'Founding age',
      eventType: 'Founding',
      account:
        'The houses tell it as a story about honest men and it almost certainly was not. What the arrangement did was transfer a risk: before the agreed weight, a carter sold a season\'s haulage to whoever lied best about the load, and the loss fell on whoever was poorest. After it, the loss fell on whoever held the stone, and holding the stone turned out to be worth paying for.\n\nWithin two generations the shed-keepers were charging for storage, then for the guarantee of storage, then for a piece of paper saying the guarantee existed. By the time anyone thought to write a charter, the thing being chartered was already a bank.',
      consequences: [
        'The [[faction.concord-of-weights|Concord of Weights]] holds the reference masses because the reference masses are the original asset, not because anyone granted it the right',
        '[[landmark.the-brass-standard|The Brass Standard]] under [[landmark.the-counting-stair|the Counting Stair]] is the descendant of the stone, and is still the only lawful place to set a reference mass',
        'The Ascent taxes movement and not production, a habit it has never grown out of and cannot afford to',
        'A hub that sells certainty rather than goods holds no commodity anyone needs, which is the structural weakness every later crisis exploits',
      ],
      devNotes:
        PROPOSAL(
          'The Ascent city entry establishes the ferry, the shed and the agreed weight as the consistent parts of its own story. This entry only puts a date on them and draws the conclusion: the Concord holds the weights because the weights were the first business, and every institution in the basin is downstream of a storage problem.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-first-silvered-duct',
    type: 'event',
    name: 'The First Silvered Duct',
    status: 'draft',
    summary: 'Somebody carried daylight forty paces underground, and every share in the Hollow Karst is still counted from it.',
    tags: ['founding age', 'cave agrarian', 'agriculture'],
    fields: {
      overview:
        'Karst galleries were inhabited long before they were farmed. What changed everything was tin-silvered [[material.sunwell-mica|sunwell mica]] on a tracking mount: a duct that throws usable light about forty paces past its mouth, which is enough depth to grow [[food.mirror-barley|mirror barley]] rather than only fungus.\n\nThe [[faction.mirror-assembly|Mirror Assembly]] dates its share roll from that first duct and has never re-cut it. A family that paid for a shaft eight or nine generations ago still outvotes a terrace of four hundred farmers, which is the whole political problem of [[city.cave-agrarian-city|the Cave Agrarian City]] expressed as a piece of bookkeeping.',
      date: TBD(
        'The Assembly dates the roll from the first shaft on it. Iratze Zubiate says the oldest duct is not the first duct, only the oldest one anybody was paid for.',
      ),
      year: -142,
      era: 'Founding age',
      eventType: 'Founding',
      account:
        'The Assembly keeps its history as a list of ducts: who cut which shaft, in what year, and how many hours it still pays their heirs. Read as a constitution it is admirably clear. Read as a chronicle it has a hole in it, because it starts at the first shaft and says nothing whatever about who was farming the galleries before there was any light to farm by.\n\nThe surface pastoralists raise that at every Assembly and have never had an answer. [[npc.iratze-zubiate|Iratze Zubiate]], who keeps two hundred mirrors aligned by hand, will tell you privately that the oldest duct is not the first duct, only the oldest one anybody was paid for.',
      consequences: [
        'Light became property, and property in the Hollow Karst has been inherited rather than earned ever since',
        '[[mechanic.the-mirror-rota|The Mirror Rota]] issues sunlight in lumen-hours against that roll, so allocation politics is the city\'s only politics',
        'A gallery cut off for a full season loses its [[material.cudmother|cudmother]] culture, which makes a light ruling a generational punishment rather than a monthly one',
        'The pre-duct occupants of the galleries are not in the record, and the Assembly has never funded anyone to look',
      ],
      devNotes:
        PROPOSAL(
          'The share roll and its never-re-cut status come from the Mirror Assembly entry; this event supplies the origin and, more usefully, the gap. The pre-duct question is a deliberate hook: whoever was down there before the roll opened has no claim, by construction.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-first-chain',
    type: 'event',
    name: 'The First Chain',
    status: 'draft',
    summary: 'Somebody proved that a slab of charged rock could be held up by a binding, and a city moved in underneath it.',
    tags: ['founding age', 'magic city', 'discovery'],
    fields: {
      overview:
        'The [[landmark.the-bound-fault|Bound Fault]] was a moving fault in charged ground and nobody lived on it for good reason. The change was technical: a demonstration that force could be bound to carry structural mass, that the binding could be re-paid on a schedule, and that a chain of forged links would hold the payment steady while it was made.\n\nEverything [[city.magic-city|the Magic City]] is follows from that one proof. Not a spell, a load calculation. The city\'s founding document is not a prophecy, it is a rating.',
      date: TBD(
        'The register opens with the first chain and does not date it. The first dated entry is the fourth, which puts a floor under the question and no ceiling on it.',
      ),
      year: -118,
      era: 'Founding age',
      eventType: 'Discovery',
      account:
        'The register begins with the first chain and does not name who laid it, which the [[faction.fetterhouse|Fetterhouse]] presents as modesty and is more probably a lost page. What the register does record, from the first entry onward, is a tonnage. That habit is the reason the city has survived six slippages: it has always known, to the ton, what it was asking of a binding.\n\nWhat the first chain also established was a business model. A binding has to be re-paid, re-chalked and re-inspected forever, so the people who can do it are never finished, and the institution that licenses them never runs out of rent. [[spell.holdfast-binding|Holdfast binding]] and [[mechanic.ward-load|Ward Load]] are the same discovery, two centuries apart.',
      consequences: [
        'Regulated magic exists as an industry with schedules, receipts and inspectors rather than as a talent',
        'The [[faction.fetterhouse|Fetterhouse]] licence roll is the city\'s labour register, and the chain rota is a payroll denominated in people',
        '[[material.ward-chalk|Ward chalk]] became a repeat-order trade with a chokehold at the marl beds, which is why [[deposit.ward-marls|the Ward Marls]] on the Anvil Shelf are bought years forward',
        'Nobody knows who laid the first chain, and the missing page is the only gap in an otherwise obsessive register',
      ],
      devNotes:
        PROPOSAL(
          'Magic as scheduled maintenance is already the Magic City\'s premise; this entry gives it a first cause and makes the point that the regulation came with the technique rather than being imposed on it later. That matters for any quest arguing about whether the Fetterhouse should exist.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-first-felling-licence',
    type: 'event',
    name: 'The First Felling Licence',
    status: 'draft',
    summary: 'A council issued a piece of paper about a tree, and raised armed men to make it mean something.',
    tags: ['founding age', 'tree city', 'greatwood'],
    fields: {
      overview:
        'A mature blackbole takes three centuries to make and one season to fell. That arithmetic was understood in [[region.the-greatwood|the Greatwood]] long before anyone acted on it, and what finally forced action was not conservation but price: [[material.blackbole-timber|blackbole timber]] and the hard charcoal that comes off the same stumps were worth more than the land they stood on.\n\nThe first licence names a stand, a count and a buyer. The escort raised to enforce it named itself the [[faction.pitchguard|Pitchguard]] and has never formally been anything else since.',
      date: TBD(
        'The Marshalcy keeps the only archive in the Greatwood, so every date in it is a claim. Does any second source exist, in Oruvai or in a tribute village, that could check it?',
      ),
      year: -95,
      era: 'Founding age',
      eventType: 'Founding',
      account:
        'The Marshalcy keeps the only archive, so read the dates as claims. What is not in doubt is the shape: a licence is worthless without archers, archers cost grain, grain has to come from somewhere, and the somewhere became the tribute villages. Every ugly institution in [[city.tree-city|the Tree City]] can be traced back along that chain to a piece of paper about a tree.\n\nThe hearth-clans of the outwood did not agree to the licence at the time and have never agreed to it since, which is not an insurgency that started, it is one that never stopped.',
      consequences: [
        'The Greatwood has been a licensed resource under armed enforcement for a century, which is why it is contested rather than simply inhabited',
        'Charcoal from [[recipe.stumpwood-distillation|the stumpwood retorts]] became a continental input, putting the Tree City upstream of every furnace on the coast',
        'The unlicensed hearth-clans became outlaws by definition on the day the licence was issued, before doing anything',
        '[[deposit.standing-fifty|The Standing Fifty]] is the last count everyone in the Greatwood agrees on, and it is a count of what is left',
      ],
      devNotes:
        PROPOSAL(
          'This is the answer to "why is the Greatwood contested". The design point is that the conflict is not ancient hatred but a property claim with an enforcement cost, and that the Pitchguard\'s case is genuinely good: without the licence the wood goes in a generation. Both sides should be arguable at the table.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-underwater-cure',
    type: 'event',
    name: 'The Underwater Cure',
    status: 'draft',
    summary: 'Ash and lime were found to set under water, and a beach became a harbour.',
    tags: ['founding age', 'mediterranean', 'engineering'],
    fields: {
      overview:
        'Before [[material.tideset-cement|tideset cement]] the Meridian Coast had an anchorage. After it, the coast had a mole, a graving dock and a harbour wall that could be built out into water rather than dropped into it. Everything [[city.mediterranean-city|the Mediterranean City]] later became follows from having a deep sheltered port on a shore that already grew a surplus.\n\nThe formulation is not complicated and the ash beds above the terraces are open to anyone with a shovel. The kilns that calcine the ash are not, and never have been.',
      date: TBD(
        'Discovery or rediscovery? The lined drainage channels on the second terrace bench behave very like tideset and predate every account of the place.',
      ),
      year: -62,
      era: 'Founding age',
      eventType: 'Discovery',
      account:
        'Whether it was a discovery or a rediscovery is an open argument in the city and a closed one on [[event.the-cut-terraces|the second terrace bench]], where the drainage channels are lined with something that behaves very like tideset and predates every account of the place.\n\nWhat is documented is the sequence after it. Harbour works needed engineers, engineers formed a licensed body, the licensed body was granted the right to certify what was safe, and the right to certify became the right to decide what may be built. The [[faction.conduit-college|Conduit College]] opens its patent roll with the first proved aqueduct siphon and treats that as year one; the quarter assembly does not, and the disagreement is not decorative.',
      consequences: [
        'A deep harbour on a fertile coast, which is the entire economic basis of the technologically advanced city',
        'The kilns are guild property and guild secret, so the bottleneck in the cement trade is heat and licensing, not raw material',
        'The Conduit College began as harbour engineers and has spent every generation since converting technical authority into political rent',
        'The Mediterranean City can eat without asking anyone, which is why it can afford to refuse to enforce foreign indenture paper',
      ],
      devNotes:
        PROPOSAL(
          'The cement discovery is taken from the Mediterranean City entry. What this adds is the causal chain from a material property to a licensing regime, which is the shape the whole city runs on, and one deliberate link back to the deep-past terraces that is left unresolved.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-weir-charter',
    type: 'event',
    name: 'The Weir Charter',
    status: 'draft',
    summary: 'Somebody chartered the throat of the delta, and the charter does not say who granted it.',
    tags: ['founding age', 'black weir', 'drown'],
    fields: {
      overview:
        'There is a basalt sill across the narrowest reach of the Long Water where the river enters [[region.the-drown|the Drown]]. Before the charter it was a hazard that wrecked barges. After it, it was gates: cut bays, iron gantries, and a written schedule of openings that anybody downstream has to plan a life around.\n\nThe [[faction.iron-sluice-company|Iron Sluice Company]] keeps a continuous record and it begins with the charter, which is the point. Before the charter there is a sill, a name and nothing anyone at [[city.black-weir|the Black Weir]] will put in writing.',
      date: TBD('The charter is undated in the copy the Company shows visitors, and the Company has never produced another copy.'),
      year: -34,
      era: 'Founding age',
      eventType: 'Founding',
      account:
        'The document is real, it is old, and it names a grantor nobody at the Weir will identify. The Company\'s position is that this is an antiquarian curiosity and the gates work regardless. The obvious counter-position, which the [[faction.moorstone-compact|Moorstone Compact]] has argued twice and lost twice, is that a charter with no identifiable grantor cannot be revoked because there is nobody to revoke it, which is extremely convenient for the party holding it.\n\nWhat the charter did in practice was convert a natural obstacle into a saleable service. Water became a thing that is billed.',
      consequences: [
        'Passage through the delta throat is priced, scheduled and enforceable, which is the origin of [[mechanic.the-sluice-book|the Sluice Book]]',
        'Everything the Ascent ships east passes the [[landmark.the-weir-gates|Weir Gates]], and the Concord has no leverage there at all',
        'Whoever holds the gates holds the [[creature.blackrun-lamprey|lamprey]] run, the [[deposit.bloom-cuts|bloom cuts]] toll and the water level of every settlement below',
        'The grantor is unnamed, which is either a lost record or the oldest deliberate silence in the delta',
      ],
      devNotes:
        'CANON: only the name The Black Weir. ' +
        PROPOSAL(
          'This event follows the Black Weir city entry\'s own proposal and adds nothing to it except a date and the undated-charter question, which is already flagged in that entry\'s faction. If the Weir is redefined as a ruin or a structure with no town, delete this entry rather than adapting it. See [[note.black-weir-concept|the design note]].',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-flood-and-the-first-draw',
    type: 'event',
    name: 'The Flood and the First Draw',
    status: 'draft',
    summary: 'A flood took every mooring in the delta, and the survivors decided never to own a berth again.',
    tags: ['founding age', 'floating swamp', 'law'],
    fields: {
      overview:
        'Every raft-clan in [[city.floating-swamp-settlement|the floating settlement]] tells the founding differently and all of them date it to the same flood. What the flood did was simple and total: it moved the channels, so the good moorings were no longer where the good moorings had been, and every claim to a berth in the delta became worthless in one night.\n\nWhat the survivors did with that is the interesting part. Instead of re-staking, they drew lots at the one rock in the delta that had not moved, and then agreed to keep drawing.',
      date: TBD(
        'Every clan dates the first draw to the same flood, and nobody dated the flood. The Company puts it after the charter and the Compact puts it before.',
      ),
      year: -28,
      era: 'Founding age',
      eventType: 'Founding',
      account:
        'The [[faction.moorstone-compact|Moorstone Compact]] argues, and genuinely believes, that a delta which moves cannot support freehold, and that the only fair arrangement is a lottery held often enough that no lot becomes a dynasty. Nine hundred cut lead deed-plates hang on [[landmark.the-moorstone|the Moorstone]] in the order they were issued, and the oldest are illegible.\n\nThe scheme fails in exactly one way, and it is the way that matters now: a lottery is only fair if nobody knows the flood schedule in advance. Since the Weir charter, somebody always does.',
      consequences: [
        '[[mechanic.the-remoor|The Re-Moor]] exists: a settlement whose map, neighbours and addresses are reshuffled twice a year by draw',
        'Nothing in the delta is owned, which means nothing in the delta can be pledged, which is why Ascent credit has never reached the rafts',
        'The Compact\'s fairness depends on ignorance of the sluice schedule, so the Iron Sluice Company can corrupt the lottery without touching it',
        'There is a forty-year gap in the middle of the deed sequence that no clan will explain to an outsider',
      ],
      devNotes:
        PROPOSAL(
          'This is the answer to "why the delta towns distrust each other", together with the Weir charter: one town\'s founding institution is only just if the other town is honest, and the other town sells honesty by the hour. The forty-year gap is taken from the settlement entry and left unexplained on purpose.',
        ) + CAL,
    },
  }),

  /* ================================================================ */
  /* MIDDLE YEARS                                                      */
  /* ================================================================ */

  E({
    id: 'event.the-seventh-terrace-fire',
    type: 'event',
    name: 'The Seventh Terrace Fire',
    status: 'draft',
    summary: 'The fire that burned the timber city off the escarpment and started every ledger on the continent.',
    tags: ['middle years', 'gilded ascent', 'disaster', 'anchor'],
    fields: {
      overview:
        'The seventh terrace of [[city.gilded-ascent|the Gilded Ascent]] was timber-framed and thatched, like most of the city above the wharves, and it was packed with bonded goods because storage had been climbing the escarpment for a generation. It burned in a night and took four terraces with it.\n\nThe fire matters less than what came after. Every counting house on the Stair had been holding other people\'s property and could not pay for it, so the houses did the only thing available and invented a way to share the loss. That instrument is the reason the ledgers all start here, and it is why the Ascent dates itself from a catastrophe rather than a founding.',
      date: 'Ledger year 0. The only date every counting house agrees on.',
      year: 0,
      era: 'Middle years',
      eventType: 'Disaster',
      account:
        'The number of dead was never established because the terraces were full of transient labour who were not on anyone\'s roll, and the figure the [[faction.concord-of-weights|Concord]] settled on is the number of bonded consignments lost, not the number of people. That choice tells you what kind of institution had just been born.\n\nWithin four years the houses had priced insurance so that building in stone was cheaper than the premium, and above the fourth terrace nothing has been timber-framed or thatched since. The rebuilding is the reason the city looks the way it does, and the reason it has a curtain wall around the Counting and Salt terraces that was never built against an army.',
      consequences: [
        'Ledgers begin. Every date in the basin is counted from the fire, and the Concord dates its own charter from it',
        'Insurance exists, so risk can be priced, so credit can be extended against collateral that might burn',
        'The upper city is stone and the lower city is not, which is a class distinction expressed in building material and fire class',
        'The dead were counted as consignments, and the Concord has never revisited the roll',
      ],
      devNotes:
        PROPOSAL(
          'The fire is taken from the Ascent city entry, which establishes it as the year insurance began and the year the ledgers start. Everything else here is added: the four terraces, the transient dead and the consignment count. The last of those is the one worth keeping, because it states the Concord\'s moral character in a single administrative decision.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-stockade-years',
    type: 'event',
    name: 'The Stockade Years',
    status: 'draft',
    summary: 'Two decades in which a licence escort stopped answering to a council and started levying children.',
    tags: ['middle years', 'tree city', 'war'],
    fields: {
      overview:
        'The [[faction.pitchguard|Pitchguard]] was raised to escort cutting licences. Over roughly twenty years it stockaded the six named boles, took the levy rolls out of the council\'s hands, converted the tribute villages from suppliers into subjects, and stopped submitting the felling count for approval before publishing it.\n\nNo single year is the year it became a state. That is what makes the period useful: [[city.tree-city|the Tree City]] can honestly say there was never a coup, and the outwood can honestly say there was.',
      date: TBD(
        'No single year is the year the escort became a state, which is exactly how both sides can be telling the truth. Does the setting want a date here at all?',
      ),
      year: 24,
      era: 'Middle years',
      eventType: 'War',
      account:
        'The trigger was a raiding season the council could not answer and the escort could. Everything after that was administrative: the escort held the stockades, so the escort held the grain, so the escort wrote the rolls. The Marshalcy publishes the period as a defensive emergency, and the felling records genuinely support the claim that the wood would have gone otherwise.\n\nThe hearth-clans of the outwood fought it for the whole twenty years and lost every engagement that happened in the open, which taught both sides the lesson they still act on. The Pitchguard does not fight in the open. Neither does anybody else.',
      consequences: [
        'A militarised Greatwood: conscription every spring, tribute grain, and a doctrine of holding stairs and cutting spans',
        'The insurgency in the outwood became permanent, because the licence it objects to has never been withdrawn',
        'Fire became doctrine against everyone else and a capital offence at home, in a city built of the most flammable material it produces',
        'The Marshalcy holds the only archive of the period, so every date in it is a claim rather than a record',
      ],
      devNotes:
        PROPOSAL(
          'The Pitchguard entry establishes that the order was raised as a cutting-licence escort and has behaved as a state for two centuries; this is that transition, deliberately written as a slow administrative capture with no single seizure date so that neither side is lying. Feeds directly into [[war.the-licence-war|the Licence War]].',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-written-rate',
    type: 'event',
    name: 'The Written Rate',
    status: 'draft',
    summary: 'A clerk converted a prison sentence into a count of fight cards, and an arena became an institution.',
    tags: ['middle years', 'arena city', 'law', 'dark'],
    fields: {
      overview:
        'The bowl on [[region.ashen-steppe|the Ashen Steppe]] was a kraal, then a judging ground, then a court. What turned it into [[city.arena-city|a city]] was procedural: somebody wrote down a rate at which a sentence converts into card days, and somebody else, three hundred leagues away, agreed to be paid for applying it.\n\nOnce a magistrate elsewhere could turn a term of years into a number of appearances and receive a fee, the Ring stopped being a local custom and acquired an import trade in people.',
      date: TBD(
        'The first agreement is undated. The eleven that followed are dated and do not agree with one another about which of them was first.',
      ),
      year: 68,
      era: 'Middle years',
      eventType: 'Treaty',
      account:
        'The first agreement was between two jurisdictions and ran to a page. There are now eleven, they do not all use the same rate, and the discrepancies are worked professionally by anyone with a reason to move a convicted person from one jurisdiction to another before sentencing.\n\nThe conversion is defended, and not stupidly, as a mercy: a card day is survivable and a term in a debt gang is frequently not. What the defence requires is that the alternative stay bad, and nobody in the Chamber has ever proposed improving the alternative.',
      consequences: [
        'Eleven jurisdictions can lawfully deliver people to the Sunken Ring, which is where the Arena City\'s population comes from',
        '[[mechanic.ring-bond|The Ring Bond]] and the whole bond-broking economy sit on top of the conversion rate',
        '[[faction.red-writ|The Red Writ]] became a continental business rather than a local one, and holds unexpired contracts nobody has counted',
        'The published rate is a single number governing eleven legal systems, and nobody agrees who is entitled to change it',
      ],
      devNotes:
        PROPOSAL(
          'The conversion rate is taken from the Arena City entry, which makes the point that the change that built the city was procedural rather than dramatic. This entry dates it and states the consequence plainly: the arena is a sentencing instrument with an import trade. Handle in play with paperwork and consequence, never with relish.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-chaining-of-five-bays',
    type: 'event',
    name: 'The Chaining of Five Bays',
    status: 'draft',
    summary: 'A flood jammed five sluice bays open, the delta took the water, and the Weir called it maintenance.',
    tags: ['middle years', 'drown', 'disaster'],
    fields: {
      overview:
        'A high-water year drove debris into the [[landmark.the-weir-gates|Weir Gates]] and chained five of the twenty-two bays open. Getting them shut took most of a season, and for that season the delta below ran a metre higher than it should have.\n\nThe rice mats went. So did most of that year\'s [[deposit.bloom-cuts|bloom cuts]], the lower moorings, and a number of people nobody counted. The [[faction.iron-sluice-company|Iron Sluice Company]] entered the whole episode in its record as maintenance.',
      date: 'Ledger year 96, in the Company record',
      year: 96,
      era: 'Middle years',
      eventType: 'Disaster',
      account:
        'The five bays were genuinely jammed and the Company\'s crews genuinely died clearing them. That is not in dispute and the [[faction.moorstone-compact|Compact]] has never disputed it.\n\nWhat is disputed is the seven days at the end, after the last bay was free, in which the gates were held open anyway while a toll argument with three raft-clans was settled. Those seven days are in the schedule book as scheduled release. [[npc.ost-vennick|Ost Vennick]] has read the entry, knows what it means, and sleeps in the same room as the book.',
      consequences: [
        'The delta learned that the difference between an act of the river and an act of the Company is a line in a book only one party can read',
        'Every subsequent toll negotiation between the Weir and the rafts has been conducted with that season in the room',
        '[[food.tide-rice|Tide rice]] planting moved later in the year permanently, which cost the delta one of its two crops for a decade',
        'The Company\'s maintenance classification was never challenged in any court, because there is no court above the charter',
      ],
      devNotes:
        PROPOSAL(
          'The Black Weir entry lists "the flood that chained five bays open" and "the toll dispute in which a metre of water went downstream and was recorded as maintenance" as two separate items in the Company record. This entry proposes they are the same season, which is nastier and cheaper to remember. Split them again if that reads as too neat.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-crucible-licences',
    type: 'event',
    name: 'The Crucible Licences',
    status: 'draft',
    summary: 'Three sheds were licensed to reduce black sand, and a seasonal drover camp became a city with a water problem.',
    tags: ['middle years', 'sifting city', 'industry'],
    fields: {
      overview:
        'Four generations ago [[region.white-pans|the White Pans]] were worked seasonally by drover families who raked crust, dried it, and carried it out on the same carts that brought their water. The change was metallurgical: somebody established that the wind had spent centuries sorting iron-black sand into the lee faces, and that the grey buttons it reduced to would cut anything.\n\nThree crucible sheds were licensed. Those licences have never been reissued to anyone outside the founding households, and [[city.sifting-city|the Sifting City]] is what grew around them.',
      date: 'About four generations ago',
      year: 112,
      era: 'Middle years',
      eventType: 'Discovery',
      account:
        'The towers followed the sheds, the six grading cuts followed the towers, and the bores followed the grades, because a permanent city in a salt pan needs deep water and a seasonal camp does not. The bore programme was financed out of [[region.ascent-basin|the Ascent Basin]] against forward crust, and the terms of that advance are the reason the Bench cannot simply stop selling when the price is bad.\n\nThe Bond Statute came later and out of the same logic: a drought year, an emergency measure making foreign indenture papers enforceable in the Pans for a registry fee, and a renewal every year since without debate.',
      consequences: [
        '[[material.blackfall-button|Blackfall Button]] dies exist, so drawn wire exists, so the Sky City lattice and the Ascent hoists are possible',
        'Three inherited licences control the only reduction sheds on the continent, and cannot be bought',
        'The Pans are bound to [[faction.concord-of-weights|Concord]] credit by the bore advance, which is why the Bench is not free to cut output',
        'The Bond Statute made the Sifting City a place where other cities\' indenture paper can be enforced for a fee, which is the origin of the labour trade there',
      ],
      devNotes:
        PROPOSAL(
          'Taken wholesale from the Sifting City entry and dated. The one addition is the explicit causal order: sheds, towers, grades, bores, debt. That order is worth keeping because it explains why the city cannot retool even when the sixth cut is killing the crews who make it.',
        ) + CAL,
    },
  }),

  /* ================================================================ */
  /* RECENT                                                            */
  /* ================================================================ */

  E({
    id: 'event.the-bond-statute',
    type: 'event',
    name: 'The Bond Statute',
    status: 'draft',
    summary: 'A drought measure that made a person\'s debt enforceable across a border, renewed without debate ever since.',
    tags: ['recent', 'law', 'indenture', 'dark'],
    fields: {
      overview:
        'One clause, passed in a bad water year in [[city.sifting-city|the Sifting City]]: a foreign indenture bond may be registered in the Pans for a fee, and once registered it is enforceable there as if written locally. It was presented as a way of keeping crews on the pans through a drought without paying them, which is exactly what it was.\n\nThe [[faction.bondwrights-hall|Bondwrights\' Hall]] dates its own real invention from the first registry of this kind, and considers cross-border enforceability, not the bond itself, to be the thing it actually sells.',
      date: 'Ledger year 141, and renewed every year since',
      year: 141,
      era: 'Recent',
      eventType: 'Treaty',
      account:
        'The mechanism is dull and that is why it works. A bond written in [[city.arena-city|the Arena City]] is a piece of paper about a person; registered in the Pans it becomes a piece of paper the Pans will send men to enforce. Add enough registries and a debt stops being local, which means running stops working, which means [[spell.debt-mark|the debt mark]] and the extradition clause become the ordinary machinery of a working life rather than an exceptional cruelty.\n\n[[city.mediterranean-city|The Mediterranean City]] has never registered a foreign bond and voids them at the harbour. That single refusal is the largest structural disagreement on the continent and it is conducted entirely in filing.',
      consequences: [
        'Indenture became portable, which turned it from a local misfortune into a continental market',
        'The Ascent extradites for debt and forgery on a sealed writ, and does so cheerfully, because the writs are honoured both ways',
        'The Mediterranean City\'s refusal makes its harbour the only reliable end point for anyone running from a bond',
        'Nobody has ever repealed the statute, and nobody has ever been asked to vote on it either',
      ],
      devNotes:
        PROPOSAL(
          'The statute is named in the Sifting City entry as an emergency measure renewed without debate; this entry makes it continental and connects it to the Bondwrights\' Hall and to the Mediterranean refusal. Dark theme handled as paperwork with consequences, per [[note.dark-themes-handling|the design note]].',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-fire-in-the-sixth-bole',
    type: 'event',
    name: 'The Fire in the Sixth Bole',
    status: 'draft',
    summary: 'The first quarter lost to heart rot, condemned, fired, and entered in the archive as a fire.',
    tags: ['recent', 'tree city', 'collapse'],
    fields: {
      overview:
        'A gallery in the Sixth Bole was found hollow. The Marshalcy surveyed the trunk, condemned two galleries and a root warren, cut the spans and fired the quarter with an unrecorded number of people still inside it.\n\nThe archive entry says fire. It has said fire for every condemnation since, which is why [[city.tree-city|the Tree City]] has an official history in which it has suffered several fires and no rot at all.',
      date: 'Ledger year 172, by the Marshalcy archive',
      year: 172,
      era: 'Recent',
      eventType: 'Collapse',
      account:
        'The rot is [[creature.bolewright-wasp|bolewright]] galling and standing water in old cut faces, and it moves through interlocked heartwood slowly and then all at once. There is no treatment. The severance drill works, in the narrow sense that cutting the spans does contain a collapse, and it works by stranding whoever is still on them.\n\nWhat the naming did was buy the Marshalcy forty-six years of not having to answer the obvious question, which is what the city does when the boles it is built in stop standing up. [[npc.aune-mustsalu|Aune Mustsalu]] inherited that question and has not answered it either.',
      consequences: [
        '[[mechanic.severance-drill|The Severance Drill]] became doctrine and is taught in the first week to every conscript',
        'The Tree City\'s public record contains no rot, which means no city that buys its timber has been told either',
        'Condemned quarters are fired on a published schedule, and the schedule is kept whether or not the quarter is empty',
        '[[district.tree-city-sixth-quarter|The Sixth Quarter]] is the fourth such condemnation in the same bole, and it has eleven days to run',
      ],
      devNotes:
        PROPOSAL(
          'The Tree City entry lists "the loss of the Sixth Bole to rot, which is the event the city has agreed to call a fire". This dates the first instance and makes the present [[quest.the-felling-order|Felling Order]] the latest of a sequence rather than a novelty, which raises the stakes and removes any chance of a clean solution.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-standing-hour',
    type: 'event',
    name: 'The Standing Hour',
    status: 'draft',
    summary: 'Nine hours in which every cable in the Gilded Ascent stopped, and labour politics on the continent changed shape.',
    tags: ['recent', 'labour', 'uprising', 'gilded ascent'],
    fields: {
      overview:
        'A splice crew on the No. 5 run refused a load they had condemned. The drum house behind them stopped, then the yard, then all eight runs, and by the middle of the morning nothing was moving above the fourth terrace of [[city.gilded-ascent|the Gilded Ascent]]. It lasted nine hours.\n\nIt was not planned, it did not spread beyond the city that day, and it won a burial fund and a roof rule. What it demonstrated was arithmetic: a city where money is a location and everything moves by cable can be stopped by about four hundred people, and everybody on the continent worked that out at once.',
      date: TBD(
        'Every chapter of the movement keeps the anniversary and no two keep it on the same day. Whether that is drift or deliberate is an open question worth answering in play.',
      ),
      year: 197,
      era: 'Recent',
      eventType: 'Uprising',
      account:
        'The [[faction.concord-of-weights|Concord]] ended it by conceding the fund and prosecuting nobody, which was intelligent and has cost the movement more than any purge would have. [[faction.standing-hour|The Standing Hour]] took its name from that morning and has spent the years since becoming very good at ending stoppages on terms.\n\nThe hoist bell at the yard gate was rung to start it. The clapper was removed the following week by order of the Concord and has never been replaced. [[landmark.the-stopped-bell|The bell]] is still on its post and the stewards still meet within sight of it.',
      consequences: [
        'A cross-city labour movement exists, with strike funds, blacklists and chapters in eleven settlements',
        'The Ascent chapter\'s strike fund takes Concord money, and its stewards decide which stoppages are permitted to win',
        'The roof rule on the pitch yards and the burial fund at the hoists are real gains the movement can point to and does',
        'Nobody has ever repeated it, and the Concord has spent twenty years making sure the arithmetic never lines up again',
      ],
      devNotes:
        PROPOSAL(
          'The Ascent entry establishes the Standing Hour as the morning every hoist stopped, lasting nine hours. This adds the cause, the concession and the co-option. The co-option is the useful part: it gives a party a labour movement that is both genuinely on the side of the poor and genuinely compromised, which is more playable than either alone.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-purged-quarter',
    type: 'event',
    name: 'The Purged Quarter',
    status: 'draft',
    summary: 'A Greatwood quarter refused the spring levy. The Marshalcy answered, and the archive does not name which quarter it was.',
    tags: ['recent', 'tree city', 'dark', 'uprising'],
    fields: {
      overview:
        'A quarter of [[city.tree-city|the Tree City]] refused to produce its bodies at the spring muster. What happened next is recorded in the Marshalcy archive as the restoration of the rolls and occupies four lines.\n\nWhat is not in the archive is anywhere between eighty and two hundred people, and roughly thirty children who are on the rolls as dead because [[npc.aune-mustsalu|Aune Mustsalu]] has been forging the entries for twelve years to keep them out of the timber yards.',
      date: TBD('The Marshalcy dates it to a spring muster twelve years ago. Some of the children on the forged rolls are older than that.'),
      year: 206,
      era: 'Recent',
      eventType: 'Uprising',
      account:
        'The refusal was about the levy and not about the licence, which matters: the quarter was not hearth-clan and had no outwood sympathies anybody has been able to demonstrate. It was six households short on a tenancy that required one body in six households every four years, and it said so in writing to a gate-sergeant.\n\n[[npc.saarik-rauda|Saarik Rauda]] ran the press-gangs that spring and keeps a written tally of every household that paid to keep a son off the levy. The tally is a map of exactly who in the city can be bought and for how little, and it covers the purged quarter, which is why the four lines in the archive are the least dangerous document about that spring.',
      consequences: [
        'The Bole-Marshal is committing a capital forgery every spring and her own quartermaster has started counting bodies against rations',
        'Nobody in the city will say which quarter it was, and the Marshalcy archive does not name it',
        'Exposing the forged rolls ends Aune Mustsalu; covering for her makes the Tree City\'s gates owe a debt',
        'The levy has been met every year since, which the Marshalcy regards as proof that the method works',
      ],
      devNotes:
        PROPOSAL(
          'The purge is named in the Tree City entry and in Aune Mustsalu\'s brief; this gives it a cause and leaves the quarter unnamed on purpose, so a designer can site it later without contradicting a district entry. Dark theme written as an administrative record with a hole in it, which is how these things actually survive.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-third-bore',
    type: 'event',
    name: 'No. 3 Goes Brackish',
    status: 'draft',
    summary: 'One of three deep bores turned salt over eleven weeks, and the Sifting City stopped publishing water figures.',
    tags: ['recent', 'sifting city', 'disaster', 'water'],
    fields: {
      overview:
        'No. 3 bore in [[city.sifting-city|the Sifting City]] went from sweet to undrinkable over about eleven weeks nine years ago. It was capped, and [[landmark.the-third-bore|the cap]] has had a standing guard on it ever since.\n\nThe guard is not there to keep people out of the water. It is there to stop anyone lowering a rod and reading how far the water table has dropped.',
      date: 'Nine years ago',
      year: 209,
      era: 'Recent',
      eventType: 'Disaster',
      account:
        'Brackish means the bore is drawing from below the fresh lens, which means the lens is thinner than the bore programme assumed, which means No. 1 and No. 4 are on the same clock. No. 1 has dropped four fathoms in nine years and the rate has not been published.\n\nThe Bench cannot slow extraction because the bore programme was financed against forward crust out of the Ascent Basin, and the terms of that advance require tonnage. So the city is drinking its aquifer to pay for the hole it drank it through, and the only people who could force a survey are the creditors, who would rather not know.',
      consequences: [
        'The posted water ration is the city\'s real currency and the cisterns have not been at full for three years',
        'Nobody has proposed a fourth bore, because a fourth bore means publishing the survey that justifies it',
        '[[npc.tazrit-nourem|Tazrit n\'Ourem]] and the tower-masters buy indenture as readily as ore, and a dry year is when they buy cheapest',
        'A published aquifer survey would be a political event on the scale of a war, which makes the sealed bore a legitimate heist target',
      ],
      devNotes:
        PROPOSAL(
          'Dated from the Sifting City entry, which puts No. 3 at nine years ago and No. 1 down four fathoms in the same span. The entry exists so the water crisis is an event on the timeline rather than a standing condition, which lets a campaign clock run against it.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-sixth-mast-collapse',
    type: 'event',
    name: 'The Sixth Mast Collapse',
    status: 'draft',
    summary: 'A mooring mast came off the lattice with load on it, and the Sky City invented the tonnage return.',
    tags: ['recent', 'sky city', 'disaster'],
    fields: {
      overview:
        'The sixth of fifteen mooring masts failed under load. What came down was the mast, its landing stage, part of the ring beam it was tied into and everything that was on them at the time. [[faction.mooring-assize|The Assize]] has never printed the number of dead.\n\nThe cause was not a defect in the mast. It was mass: the stage was carrying more than the lattice under it was rated for, and no single person had lied about it. Fourteen small under-declarations had simply not been added up by anybody whose job it was to add them up.',
      date: 'Five years ago',
      year: 213,
      era: 'Recent',
      eventType: 'Disaster',
      account:
        'The rules written afterwards are the reason [[mechanic.mass-warrant|the Mass Warrant]] is enforced by weighing rather than inspection, and the reason a false tonnage return is the only ground on which a mast lease can be forfeited. Both are good rules. Neither has been enough.\n\n[[npc.aubran-ferrieu|Aubran Ferrieu]] was the mass-registrar. He kept the true tonnage sheets from that week, was stripped and barred from the lattice, and has lived at [[district.sky-city-shelf-foot|the shelf foot]] without going up for four years. The sheets show whose seal signed off the overload. He wants a hearing rather than money, which is why nobody has been able to buy them.',
      consequences: [
        'Tonnage returns, the weighing regime and the forfeiture clause all date from the week after the collapse',
        '[[npc.cesille-vaudry|Cesille Vaudry]] is forging those same returns now, because the honest number requires eviction lists she will not sign',
        '[[landmark.the-sixth-mast|The Sixth Mast]] was rebuilt, and nobody will say how long ago or to what specification',
        'The city is several hundred tonnes over its rated load and the survey showing the thermal weakening has not been published',
      ],
      devNotes:
        PROPOSAL(
          'The collapse is established in the Sky City entry as the origin of the tonnage rules; the cause here is proposed and deliberately bureaucratic. Fourteen small under-declarations and nobody adding them up is a better disaster for this setting than sabotage, and it makes the present forgery a direct repeat.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-sixth-slippage',
    type: 'event',
    name: 'The Sixth Slippage',
    status: 'draft',
    summary: 'Sixty strides of pavement dropped three strides in under a minute, two chains died, and the roll closed at 211.',
    tags: ['recent', 'magic city', 'disaster'],
    fields: {
      overview:
        'The sixth recorded slippage of the [[landmark.the-bound-fault|Bound Fault]] took sixty strides of the western pavement down by three strides in less than a minute. The roll of the dead was closed at 211 names and everyone in [[city.magic-city|the city]] knows the roll is short, because the streets it fell on were full of people who were not registered anywhere.\n\nTwo of the nine chains went dead in that minute. Which two has been an official uncertainty ever since.',
      date: 'Four years ago',
      year: 214,
      era: 'Recent',
      eventType: 'Disaster',
      account:
        'A dead chain is not a broken chain. It is a chain still hanging, still inspected, still on the rota, and no longer carrying anything. The [[faction.fetterhouse|Fetterhouse]] can determine which two by testing under load, and testing under load is what caused the slippage, so the roll has stayed silent.\n\n[[npc.ysme-drannik|Ysme Drannik]] was ward-keeper that day and is the only living person who knows the answer. The city keeps her caged in the chain-house rather than say the number out loud. [[district.magic-city-the-lean|The Lean]] was condemned after the slippage and reoccupied within a season, because rent under a lapsed binding is the cheapest rent on the continent.',
      consequences: [
        'Seven chains are doing the work of nine, and the rota that maintains them burns out its licensed casters faster every year',
        '[[npc.toval-cherek|Toval Cherek]] has been shorting alloy on replacement links for two years to meet a quota set for nine working chains',
        'The Lean\'s load roll has not been signed by any surveyor in four years and is fully occupied',
        'The right to draw on the fault goes to auction this year, and no bidder has been told the chain count is wrong',
      ],
      devNotes:
        PROPOSAL(
          'Taken from the Magic City entry, which establishes six slippages, the 211 names and the two dead chains. This entry adds the reason the answer is unobtainable: the only test is the thing that caused the accident. That is why the Scar is licensed and why the licence is not enough.',
        ) + CAL,
    },
  }),

  /* ================================================================ */
  /* PRESENT                                                           */
  /* ================================================================ */

  E({
    id: 'event.the-gallery-blight',
    type: 'event',
    name: 'The Gallery Blight',
    status: 'draft',
    summary: 'A rot in the made ground has cut the Sunwell yield, and somebody must now be ruled into the dark.',
    tags: ['present', 'cave agrarian', 'disaster', 'food'],
    fields: {
      overview:
        'Made ground in the karst galleries is manufactured from rock dust, chaff, dung and living [[material.cudmother|cudmother]] culture, and something is killing the culture in the second and fourth terraces. Yields are down by roughly a third across [[city.cave-agrarian-city|the Cave Agrarian City]] and the [[landmark.sunwell-shaft|Sunwell]] cannot make the difference up by throwing more light at it.\n\nThat leaves allocation. The Mirror Court must decide which galleries lose their hours, and a gallery cut off for a full season loses its cudmother entirely, which takes four to nine years to rebuild.',
      date: 'This season',
      year: 217,
      era: 'Present',
      eventType: 'Disaster',
      account:
        'Two things are happening and only one of them is being investigated. [[npc.iratze-zubiate|Iratze Zubiate]] has had two lower galleries dark for over a year after a duct collapse she could not repair alone, and has been skimming mirror-hours off the grain terraces to hide the loss, so part of the shortfall is not blight at all. The rest of it is, and nobody has established whether the agent came in with imported nitre, with a starter culture, or out of [[npc.bedel-lehun|an unlicensed violet strain]] on the fourth terrace.\n\nThe Assembly votes on shares, and the shares were cut generations ago, so the galleries most likely to be starved are the ones with the fewest votes and the most people.',
      consequences: [
        'A city-scale allocation decision is live and a player party can broker it: see [[quest.who-gets-the-light|Who Gets the Light]]',
        'Whichever galleries are cut go dark permanently, and their crops, trades and people leave the world state',
        'The Ascent is the karst\'s largest creditor and has begun advancing against next year\'s light allocation',
        'Nobody has identified the agent, and the three candidate explanations point at three different cities',
      ],
      devNotes:
        PROPOSAL(
          'The blight is the trigger for a quest another author has already written; this entry gives it a cause structure with an honest complication, which is that a third of the shortfall is a mirrorwright covering up a maintenance failure. Whether the blight is imported is a real open question worth leaving open.',
        ) + CAL,
    },
  }),

  E({
    id: 'event.the-concession-called',
    type: 'event',
    name: 'The Scar Concession Is Called',
    status: 'draft',
    summary: 'The right to draw on the Bound Fault goes to auction on the Counting Stair for the first time in forty years.',
    tags: ['present', 'magic city', 'gilded ascent', 'main thread'],
    fields: {
      overview:
        'The concession to draw on [[landmark.the-bound-fault|the Bound Fault]] is the most valuable licence on the continent and it has not changed hands in forty years. It is being auctioned on [[landmark.the-counting-stair|the Counting Stair]], in [[city.gilded-ascent|the Gilded Ascent]], which is itself the news: the Magic City is selling its own supply through somebody else\'s market.\n\nThe [[faction.concord-of-weights|Concord]], the [[faction.fetterhouse|Fetterhouse]] and the Sky City lattice houses are all expected to bid. Whoever wins sets the price of regulated magic for a generation, and the two who lose are left with capital, grievances and no legal supply.',
      date: 'This year',
      year: 218,
      era: 'Present',
      eventType: 'Treaty',
      account:
        'The Fetterhouse is selling because the chain rota is a payroll it can no longer meet and the seven working chains need capital it does not have. It has not disclosed the chain count to the bidders and is not legally required to.\n\nThe Concord is bidding because four fifths of its clearing reserve is lent against Sky City counterweight leases and it needs an asset that is not a lattice. The Sky City houses are bidding for the opposite reason. All three parties are bidding to solve a problem they have not admitted to, which is the most Ascent transaction imaginable.',
      consequences: [
        'The price of every licensed working on the continent is about to be set by an auction, not by a regulator',
        '[[quest.the-scar-concession|The Scar Concession]] is the campaign hinge, and it follows on from [[quest.the-chalk-that-lies|the adulterated chalk investigation]]',
        'A buyer who learns the true chain count before the hammer falls can rewrite the terms or walk away',
        'The two losing bidders have capital and no legal supply, which is the precondition for a grey market at scale',
      ],
      devNotes:
        PROPOSAL(
          'The auction is established in the Magic City entry and in the main-thread quest. This entry states the thing the quest cannot: every bidder is solving an undisclosed solvency problem, which means the auction is three lies meeting in one room, and a party holding any one of the three secrets is the most important person on the Stair.',
        ) + CAL,
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Wars and conflicts                                                  */
/* ------------------------------------------------------------------ */

const WARS: SeedEntity[] = [
  E({
    id: 'war.the-licence-war',
    type: 'war',
    name: 'The Licence War',
    status: 'draft',
    summary: 'A century-old insurgency in the outwood against a felling licence that has never once been withdrawn.',
    tags: ['greatwood', 'insurgency', 'active'],
    fields: {
      overview:
        'The [[faction.pitchguard|Pitchguard]] holds a licence monopoly on [[material.blackbole-timber|blackbole timber]] and hard charcoal and enforces it with archers. The hearth-clans of the outwood have never accepted the licence, cut without one, and are therefore outlaws by construction rather than by any act.\n\nNeither side can win. The Pitchguard cannot garrison a forest and has never won an engagement in the open. The clans cannot take a stockaded bole. What both sides can do is burn things, and both do.',
      conflictType: 'Insurgency',
      state: 'Active',
      began: 'With [[event.the-first-felling-licence|the first felling licence]], and formally with [[event.the-stockade-years|the Stockade Years]]',
      sidesNotes:
        'The Pitchguard fields conscripts levied one body in six households every four years, [[item.palisade-arbalest|palisade arbalests]] re-issued off the dead, and [[recipe.redoubt-ballista|redoubt ballistae]] on the six named boles laid across each other\'s approaches. Its case is genuinely strong: without the licence the wood goes in a generation, and the felling records prove it.\n\nThe hearth-clans are not one body and do not pretend to be. They are cutting families, poaching families and displaced tribute villages, funded increasingly by the fifth of the charcoal that leaves [[district.tree-city-pitch-yards|the Pitch Yards]] unlicensed. [[npc.vetla-torvik|Vetla Torvik]] is the type: a deserter forester selling routes, sap and silence to whoever pays.',
      currentState:
        'Active and worsening, for a reason neither side chose. Heart rot is taking the boles, so the Marshalcy is condemning quarters, so the timber yards are filling with people who lost a tenancy, so the outwood is recruiting from inside the city for the first time. Two [[faction.standing-hour|Standing Hour]] stewards are living in [[district.tree-city-sixth-quarter|the Sixth Quarter]] and nobody has reported them.',
      frontlines: [
        'The outwood beyond the pale, where snaring is [[skill.wire-and-snare|poaching]] and poaching is a hanging matter',
        'The charcoal wagons out of the Pitch Yards, roughly a fifth of which leave on forged manifests',
        'The rope-bridge maintenance runs, which reach the fourth gallery of [[landmark.bastion-bole|the Bastion Bole]] without passing a gate',
        'The spring muster itself, which is where the levy is filled and where [[npc.saarik-rauda|the press-gangs]] work',
      ],
      stakes: [
        '[[deposit.standing-fifty|The Standing Fifty]]: the last mature trunks outside the Tree City\'s own walls',
        'Continental charcoal supply, and therefore [[machine.the-verdigris-hearth|the Verdigris Hearth]] and every furnace downstream of it',
        'Whether the Greatwood is managed, stripped, or lost to rot regardless of who wins',
      ],
      playerAngle:
        'A party can take work from either side without being asked to believe anything. The Pitchguard hires escorts for licensed fellings and for the wagons; the clans buy routes, sap and manifests, and pay better. The interesting position is the third one: the charcoal buyers on the coast are already funding the clans quietly, and a party that can prove which buyers, to whom, changes the price of the whole trade.\n\nThe lever nobody has pulled is the blockade. The Marshalcy has never once used its charcoal leverage on [[city.mediterranean-city|the Mediterranean City]], because the day it does, the buyers fund the clans openly. A party can make that happen deliberately.',
      devNotes:
        PROPOSAL(
          'This is the standing conflict the Greatwood front zone on the atlas is drawn around. Design rule: both sides have a real case and neither has a plan for the rot, which is the thing that will actually decide it. Do not resolve it; make the party choose whose collapse they are managing.',
        ),
    },
  }),

  E({
    id: 'war.the-throat',
    type: 'war',
    name: 'The Throat',
    status: 'draft',
    summary: 'One town can drown the other by opening a gate on schedule, and has done it once already.',
    tags: ['drown', 'water', 'active'],
    fields: {
      overview:
        'The [[faction.iron-sluice-company|Iron Sluice Company]] holds twenty-two basalt bays across the narrowest reach of the Long Water and sells passage and slack water by the hour. Everything below the gates, including [[city.floating-swamp-settlement|the floating settlement]], lives at whatever level the schedule leaves them.\n\nThis is not a war and both sides are careful to say so. It is a dispute over a toll, conducted by an armed chartered company against a lottery of raft-clans, in which one party can put a metre of water on the other in an afternoon.',
      conflictType: 'Border dispute',
      state: 'Active',
      began: 'Arguably at [[event.the-weir-charter|the charter]]; in its present form at [[event.the-chaining-of-five-bays|the chaining of five bays]]',
      sidesNotes:
        'The Company: charter, gantries, gate crews, a schedule book, and [[npc.ost-vennick|Ost Vennick]], who can put water on any settlement downstream within hours and has done it once off the record. Its argument is that it did not make the river, it made the gates, and a river without gates drowned this delta twice.\n\nThe [[faction.moorstone-compact|Moorstone Compact]]: nine hundred deed-plates, a twice-yearly draw and no standing force whatever. Its argument is that a lottery is only fair if nobody knows the flood schedule in advance, and somebody always does. [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is being paid in guaranteed sluice-time to drift the whole settlement upriver into the Weir\'s toll reach, and has one season to make it look like her own judgement.',
      currentState:
        'Active in the specific sense that money is moving. Advance warning of releases is being sold to the highest bidder while the poorest lots take the water, an elder is being bought, and [[faction.low-tally|the Low Tally]] is running an ullage trade through the tail that pays gantry crews better than their own Company does. Nobody has drawn a weapon and everybody is losing.',
      frontlines: [
        '[[landmark.the-eleventh-sluice|The eleventh sluice]], disused, workable only in the slack hour between scheduled openings',
        'The draw at [[landmark.the-moorstone|the Moorstone]], which decides who moors where and who takes the flood',
        'The low-water channel markers, a third of which are now wrong since [[npc.gwill-ossekind|Gwill Ossekind]] walked out and did not return',
        'The schedule book itself, which is the only evidence of anything and sleeps in a guarded room',
      ],
      stakes: [
        'Whether the delta\'s rice, cane and bloom crops survive a badly timed release',
        'The eastern trade route to the sea, and the toll on every raft that uses it',
        'Whether the floating settlement re-moors inside the Weir\'s toll reach, which would end it as an independent town',
      ],
      playerAngle:
        'Everything here turns on information, not force. The schedule book is readable, stealable and copyable, and a copy in the hands of the Compact ends the sale of advance warning overnight. So does forcing the Company to post the schedule publicly, which several gantry crews would quietly support.\n\nThe darker option is available and should cost: a party that sells the schedule instead becomes the thing it replaced. There is also a bought-elder problem with a clean solution and no good one, and a missing channel-marker whose staves control the eastern approach for as long as the water stays low.',
      devNotes:
        PROPOSAL(
          'Both the Black Weir and its Company are proposals built on a canon name. This conflict is the reason to keep them: two established locations with a dependency that has lives on both ends. If the Weir is redefined, this entry goes with it. See [[note.black-weir-concept|the design note]].',
        ),
    },
  }),

  E({
    id: 'war.the-bilateral-question',
    type: 'war',
    name: 'The Bilateral Question',
    status: 'draft',
    summary: 'Two cities have started settling directly with each other, and the hub is treating it as an act of war.',
    tags: ['trade', 'gilded ascent', 'brewing'],
    fields: {
      overview:
        '[[city.gilded-ascent|The Gilded Ascent]] produces nothing. It takes a fraction of an eighth on every pair of entries cleared through [[machine.the-tally-engine|the Tally Engine]], and the volume is enormous and the margin is thin. If two outer cities ever settle with each other directly at scale, the commission halves.\n\n[[city.mediterranean-city|The Mediterranean City]] and [[city.sky-city|the Sky City]] have been doing exactly that for eleven months, in conduit and instrument contracts, netted quarterly and never touching the Stair. The [[faction.concord-of-weights|Concord]] found out four months ago.',
      conflictType: 'Trade war',
      state: 'Brewing',
      began: 'Eleven months ago, in a clause nobody thought was interesting',
      sidesNotes:
        'The Concord has tariff farming on the pass road, the extradition writs, the [[landmark.the-brass-standard|Brass Standard]] and a reserve that is four fifths lent out. Its weapons are all financial and all of them, used hard, expose the reserve. [[npc.wessel-ondriek|Wessel Ondriek]] knows this better than anyone alive.\n\nThe [[faction.conduit-college|Conduit College]] wants the copper duty pinned where it likes it and has never needed Ascent credit, because the coast eats without asking anyone. The [[faction.mooring-assize|Mooring Assize]] is a more reluctant party: it is quietly buying ground land through Ascent factors and cannot afford to be shut out of the basin, so it is hedging both ways at once.',
      currentState:
        'Brewing, and being fought entirely in paperwork. The Concord has raised the bonded storage rating on coast goods twice, delayed two harbour-slot clearings past the tide, and begun quietly buying the debts of smaller settlements so that its ledger rather than their councils decides who eats. None of this is illegal and all of it is understood.',
      frontlines: [
        'The copper duty vote in the Mediterranean City, which binds for nine years: see [[quest.the-casting-voice|The Casting Voice]]',
        'Bonded storage ratings on the third and fourth terraces, which are being used as a tariff by another name',
        'The Sky City lattice houses\' books, which is what [[quest.the-second-ledger|The Second Ledger]] is about',
        'Debt purchases in the smaller settlements, which no charter authorises and nobody voted for',
      ],
      stakes: [
        'Whether the continent has one clearing house or a network of bilateral nettings',
        'The clearing reserve, which cannot survive being examined and underwrites everything',
        'Whether the price of certainty is set by a body that produces nothing',
      ],
      playerAngle:
        'This is the political spine of the Ascent guild line, and it is fought with documents. A party can carry netting agreements, break them, audit them, or produce the one thing that ends the argument, which is evidence of what actually backs the reserve.\n\nBe clear about the consequence before offering it. Exposing the reserve does not liberate anybody. It stops clearing, which stops grain moving on credit, which starves three cities that have nothing to do with the quarrel. Any party that pulls that lever should be shown the bill.',
      devNotes:
        PROPOSAL(
          'The Ascent entry states that the Concord treats any bilateral clearing arrangement as a hostile act; this makes that concrete by naming a specific arrangement between two cities that can both afford it. Kept at Brewing so a campaign decides whether it breaks.',
        ),
    },
  }),

  E({
    id: 'war.the-dry-march',
    type: 'war',
    name: 'The Dry March',
    status: 'draft',
    summary: 'Two cities claim the wells on the same hundred leagues of road, and the town in the middle has not said which side it is on.',
    tags: ['cinder waste', 'water', 'stalemate'],
    fields: {
      overview:
        'The road between [[city.arena-city|the Arena City]] and [[city.sifting-city|the Sifting City]] runs through dry country by way of [[city.orath|Orath]], and it is not the road that is disputed. It is the wells. Nine of them, sunk at various times by various people, with no agreed schedule of who may draw and how much.\n\nA hundred days of the Pans\' cistern ration depends on that water road. So does every banner house that recruits on the caravan ground. Neither city can hold the wells and both behave as though they do.',
      conflictType: 'Border dispute',
      state: 'Stalemate',
      began: TBD('Nobody can name a start. The first well dispute in anyone\'s memory was already a continuation of an older one.'),
      sidesNotes:
        'The Sifting City Bench needs the road open because the Pans cannot feed themselves and cannot carry their own water, and its instrument is the registry: goods and people moving the other way can be detained on a bond registered under the statute. The Arena City\'s banner houses need the road because it is where their recruiters work and where bonded people arrive.\n\nOrath\'s position is the interesting gap. It sits on the road, posts a ration board daily, and musters against something the board does not name. Whether Orath is a party to this dispute, a neutral, or the reason it exists is not established and should not be invented casually.',
      currentState:
        'Stalemate maintained by mutual usefulness. Caravans are taxed twice, robbed occasionally, and get through. [[npc.kavel-uur|Kavel Uur]] runs the only fixed schedule across the waste margin and keeps a private count of who goes in and who comes out, which is the closest thing to a census the march has.',
      frontlines: [
        'The nine wells, and specifically the two that have been re-dug within living memory',
        'The raided stretch of road east of the Arena City, marked on the atlas and avoided after dark',
        '[[route.the-dry-crossing|The dry crossing]], which exists to move sift past the assay stamp and the registry fee',
        'The caravan ground at Orath, where recruiters, bond-holders and drovers all do business in the same square',
      ],
      stakes: [
        'A hundred days of drinking water for a city of sifters',
        'The overland link between the Pans and the steppe, and therefore the [[route.the-salt-road|Salt Road]] as a whole',
        'What Orath is actually mustering against, which nobody outside Orath knows',
      ],
      playerAngle:
        'The honest work is escort and well-digging, and it pays. The interesting work is a survey: nobody has established how deep any of the nine wells go or whether they draw on the same water, and the party that produces that number can end the dispute or make it much worse.\n\nOrath is a live question rather than a location to clear. A party that establishes what the ration board is mustering against has learned something the atlas does not contain.',
      devNotes:
        'CANON: only the name Orath and its siting. ' +
        PROPOSAL(
          'The disputed dry march is drawn on the atlas as a zone with no entry behind it; this is that entry. Orath is deliberately left as a hole in the middle of the conflict rather than a participant, so nothing here has to be retracted when Orath is defined. See [[note.orath-concept|the design note]].',
        ),
    },
  }),

  E({
    id: 'war.the-chain-rota',
    type: 'war',
    name: 'The Chain Rota',
    status: 'draft',
    summary: 'A licensing body is spending its own licensed casters to hold up a fault, and the roll is running out.',
    tags: ['magic city', 'labour', 'brewing', 'dark'],
    fields: {
      overview:
        'Seven working chains are doing the load of nine on [[landmark.the-bound-fault|the Bound Fault]], and the shortfall is being made up by licensed practitioners standing rota. The rota is not a duty, it is a condition of holding a licence, and holding a licence is the only lawful way to work in [[city.magic-city|the Magic City]].\n\nSo the [[faction.fetterhouse|Fetterhouse]] is burning its own roll to hold up a street, and the roll is a list of who burns next. Everybody on it can read it.',
      conflictType: 'Cold conflict',
      state: 'Brewing',
      began: 'With [[event.the-sixth-slippage|the sixth slippage]], four years ago',
      sidesNotes:
        'The Fetterhouse is not villainous and that is the problem. Its doctrine is demonstrably correct: a lapsed [[spell.holdfast-binding|holdfast]] drops whatever it was holding, and what it was holding is usually a street. From there it reasons that a practitioner is a load-bearing member of a structure, to be inspected, rated, scheduled and replaced, and it uses that language on purpose because it believes it removes blame.\n\nAgainst it: the licensed casters themselves, who are not organised, and the unlicensed ones in [[district.magic-city-the-lean|the Lean]], who are. [[skill.grey-casting|Grey casting]] is spreading because a caster off the register is not on the rota, and every one of them accrues [[mechanic.the-toll|Toll]] uncapped and unrecorded.',
      currentState:
        'Brewing rather than open, because nobody on the rota can strike without dropping a district. That is precisely the leverage the [[faction.standing-hour|Standing Hour]] has been trying to organise for two years and has not been able to use, and it is the most morally difficult stoppage in the setting.',
      frontlines: [
        'The rota board in [[district.magic-city-chainhouse-ward|the Chainhouse Ward]], which faces inward and is not readable from the door',
        '[[npc.halvo-sarn|Halvo Sarn]]\'s permit desk, which backdates licences at a rising price and is the single point of failure for prosecuting anyone',
        '[[landmark.the-ninth-chain|The Ninth Chain]], the reference every other chain is argued against, made by the smith now shorting alloy',
        'The [[quest.the-chalk-that-lies|adulterated chalk supply]], which is a third independent failure converging on the same structure',
      ],
      stakes: [
        'Whether a bound district comes down, and which one',
        'The lives on the rota, which is a payroll denominated in people with a known burn rate',
        'Who holds the concession after [[event.the-concession-called|the auction]], and whether they are told the chain count',
      ],
      playerAngle:
        'A party can be on the rota, supply it, prosecute it, or break it. Breaking it means organising a stoppage that will drop a street, so the useful version is narrower: get the chain count named publicly before the concession is sold, which forces the buyer to price the repair instead of the rent.\n\n[[npc.ysme-drannik|Ysme Drannik]] will trade the answer for one name struck off a proscription list and will not say why that name. [[npc.toval-cherek|Toval Cherek]] can name every section carrying his shorted links and cannot speak without being blamed for the slippage. Both are gettable. Neither is free.',
      devNotes:
        PROPOSAL(
          'This is the answer to "why is the Scar licensed" in its live form: the licence exists because unlicensed working kills strangers, and the licence has become a conscription. Keep the Fetterhouse\'s argument strong. A party that simply abolishes it should be shown the street it dropped.',
        ),
    },
  }),

  E({
    id: 'war.the-third-stoppage',
    type: 'war',
    name: 'The Third Stoppage',
    status: 'draft',
    summary: 'A labour movement has been bought off twice this year, and its own stewards are not sure they can sell the third.',
    tags: ['labour', 'gilded ascent', 'brewing'],
    fields: {
      overview:
        '[[faction.standing-hour|The Standing Hour]] has called a terrace-wide stoppage in [[city.gilded-ascent|the Gilded Ascent]] twice this year and been bought off both times. The concessions were real and small. The stewards who negotiated them are being paid, indirectly, out of a strike fund that takes [[faction.concord-of-weights|Concord]] money.\n\nA third call is coming, over the No. 3 main cable, and the arch stewards in [[district.gilded-ascent-under-stair|the Under-Stair]] have stopped consulting the hall.',
      conflictType: 'Cold conflict',
      state: 'Brewing',
      began: 'At [[event.the-standing-hour|the Standing Hour]] itself, twenty-one years ago',
      sidesNotes:
        'The movement is not revolutionary and has repeatedly refused to become so. Its argument, which has won real things, is that a city that stops eating stops listening and the point of a stoppage is to be ended on terms. Its leadership is consequently very good at ending strikes and has lost the habit of winning them.\n\nOn the other side: the Concord, which pays the fund; the [[faction.bondwrights-hall|Bondwrights\' Hall]], which lobbies to keep machinery licensed and dear so that human bodies stay the cheaper engine; and the hoist consortium, which needs the No. 3 cable question to stay unanswered for one more season.',
      currentState:
        'Brewing. [[npc.brask-vellmar|Brask Vellmar]] failed the No. 3 main two seasons ago and was made to re-sign it, and kept the strand samples in a tin under his bench. The cable carries the grain lift to the upper terraces. Whether it is condemned by an inspector, by a stoppage, or by parting is now a race between three parties who all know the odds.',
      frontlines: [
        'The [[district.gilded-ascent-hoist-yards|Hoist Yards]], where the strand samples are and where nine to fourteen people a year already die',
        'The third and fourth arches of the Under-Stair, where the movement recruits and where the hall\'s writ is thinnest',
        'The strike fund itself, and whoever can prove where a quarter of it comes from',
        'The pitch yards roof rule in [[city.tree-city|the Tree City]], the movement\'s one clear win, now used as an argument against striking anywhere',
      ],
      stakes: [
        'Whether the No. 3 cable is condemned before it parts, and who is under it when it does',
        'Whether a continental labour movement is an institution or a client',
        'Grain to the upper terraces, which stops within a day of any serious stoppage',
      ],
      playerAngle:
        'Four levers, and they are not equivalent. Force the condemnation and the grain lift stops, which hurts the terraces that can least afford it before it hurts anyone else. Sell Vellmar\'s silence to the hoist consortium and take the money. Give the strand samples to the arch stewards and let the third stoppage be about something provable. Or expose the strike fund, which destroys the only organisation in the basin that has ever won anything and leaves nothing in its place.\n\nAll four are playable. None of them are clean, and the game should say so in world state rather than in a lecture.',
      devNotes:
        PROPOSAL(
          'The compromised strike fund is established in the Ascent entry and the Standing Hour entry; this makes the third call the live decision. Design intent: a labour conflict where the sympathetic side is corrupt and the corruption is what has kept it alive, so the party cannot simply back the good guys.',
        ),
    },
  }),

  E({
    id: 'war.the-charcoal-truce',
    type: 'war',
    name: 'The Charcoal Truce',
    status: 'draft',
    summary: 'A blockade nobody has declared, held off by a threat nobody has made, for forty years.',
    tags: ['trade', 'greatwood', 'truce'],
    fields: {
      overview:
        'Hard charcoal from [[recipe.stumpwood-distillation|the Tree City retorts]] crosses the continent to feed [[machine.the-verdigris-hearth|the Verdigris Hearth]], which means a Greatwood blockade stops the Mediterranean smelt, which stops brass billet, which stops [[recipe.drawn-wire-and-tube|drawn wire and tube]], which stops rather a lot of the continent.\n\nThe Marshalcy understands this perfectly and has never once used it. Everyone downstream understands that too, which is why the price of blackbole has been stable for forty years and why nobody calls this a conflict.',
      conflictType: 'Blockade',
      state: 'Truce',
      began: TBD(
        'Unwritten. Both sides date it to a conversation neither will describe, and the Marshalcy archive has no entry for it at all. Was anything ever actually agreed?',
      ),
      sidesNotes:
        'The [[faction.pitchguard|Pitchguard]] holds the supply and does not use it, for one reason: the day it does, the charcoal buyers stop funding the hearth-clans quietly and start funding them openly. That calculation is the whole truce, and it is the only piece of restraint in the Marshalcy\'s entire posture.\n\nThe [[faction.conduit-college|Conduit College]] and the coastal foundries hold the other end. They have been diversifying for a decade and have got nowhere, because the only other hard charcoal on the continent is unlicensed clan charcoal, which is the same wood by a worse road.',
      currentState:
        'Truce, and quietly deteriorating. Heart rot is cutting the licensed felling count, so the Marshalcy is short of charcoal it has already sold forward, so unlicensed clan charcoal is being bought by respectable foundries who file it as licensed. Every barrel of that is an argument for the blockade the Marshalcy is not making.',
      frontlines: [
        'The charcoal manifests out of [[district.tree-city-pitch-yards|the Pitch Yards]], roughly a fifth of them forged',
        'The coastal foundry books, where clan charcoal is entered as licensed and nobody checks',
        '[[deposit.standing-fifty|The Standing Fifty]], and every council vote on a felling licence, which is also a bribe',
        'The overland leg of [[route.the-timber-line|the Timber Line]], which is where a blockade would actually be enforced',
      ],
      stakes: [
        'Brass, wire, tube and every machine downstream of the Drawbench Vaults',
        'Whether the hearth-clans get open funding from respectable buyers',
        'The stable blackbole price, which is the only price on the continent nobody argues about',
      ],
      playerAngle:
        'The truce is a thing a party can break, on purpose or by accident, and breaking it is a continental event. Prove that coastal foundries are buying clan charcoal and the Marshalcy has a public reason to close the road. Or run the unlicensed fifth yourself and take the margin, which is excellent money and arms an insurgency.\n\nThe restraint option is the one worth writing: brokering a licensed sale to the coast at a price the Marshalcy can live with keeps the road open, keeps the clans poor and keeps four hundred people in a condemned quarter working. It is the least heroic and most consequential thing on offer.',
      devNotes:
        PROPOSAL(
          'The Tree City entry establishes that the Marshalcy has never used its charcoal leverage and why. Filed as a conflict at Truce so the dashboard shows a conflict that is currently not happening, which is a state a designer needs to be able to represent.',
        ),
    },
  }),

  E({
    id: 'war.the-fifteen-leases',
    type: 'war',
    name: 'The Fifteen Leases',
    status: 'draft',
    summary: 'A feud between mast houses over forged tonnage, an unregistered sixteenth mast, and who goes down the ropes first.',
    tags: ['sky city', 'feud', 'active'],
    fields: {
      overview:
        '[[faction.mooring-assize|The Assize]] bench is the fifteen mast-lease holders. Leases are heritable, saleable and indivisible, there is no citizen franchise, and the only ground for forfeiture is a false tonnage return. That clause has been used once in forty years.\n\nIt is about to be used again, because [[city.sky-city|the city]] is several hundred tonnes over its rated load, the returns are being forged to conceal it, and whichever house proves it first also decides which quarter is evicted to lighten the ring.',
      conflictType: 'Feud',
      state: 'Active',
      began: 'With [[event.the-sixth-mast-collapse|the Sixth Mast collapse]], five years ago',
      sidesNotes:
        'This is not two sides. It is fifteen houses, each holding a lease it cannot divide and cannot afford to lose, in a city where the binding constraint is mass and the office that records mass decides everything else. [[npc.cesille-vaudry|Cesille Vaudry]] holds the second counterweight lease and has been shaving the figures rather than sign eviction lists.\n\nUnderneath all of it sits the survey: nine years of measurements showing the thermal over [[region.anvil-shelf|the Anvil Shelf]] weakening season by season, seen in full by three people. The Assize has been buying ground land under other names for six years, through Ascent factors paid not to ask.',
      currentState:
        'Active and covert. Somebody has been landing at an unregistered sixteenth mast for two years, and naming its owner turns a routine smuggling case into a succession fight the Register cannot survive: see [[quest.the-sixteenth-mast|The Sixteenth Mast]]. [[npc.aubran-ferrieu|Aubran Ferrieu]] holds the true sheets from the collapse and wants a hearing rather than money.',
      frontlines: [
        'The sixteenth mast, and the recurring eleven-minute gap on the eastern arc that nobody has had to explain',
        'The tonnage returns, which are the only forfeitable document in the city',
        'The ground land purchases at [[district.sky-city-shelf-foot|the shelf foot]] and along the pass road',
        'The eviction lists nobody will sign, which decide which quarter of [[district.sky-city-lattice-town|Lattice Town]] goes down the ropes',
      ],
      stakes: [
        'Which several thousand people are evicted to bring the city back under its rated load',
        'The lease market, which collapses overnight if the survey becomes public',
        'The Ascent clearing reserve, four fifths of which is lent against these same leases',
      ],
      playerAngle:
        'The party is the outside instrument every house wants: someone who can land at an unregistered mast, weigh a stage honestly, or carry a sheet to a hearing. Every one of those acts hands a specific house a weapon.\n\nThe survey is the real prize and the real trap. Publishing it is arguably the honest thing and it collapses the lease market, wipes the Ascent reserve, and prices the eviction of a quarter that has no vote. Sitting on it makes the party a participant. There is no third option and there should not be one.',
      devNotes:
        PROPOSAL(
          'The forged returns, the weakening thermal, the ground-land purchases and the sixteenth mast all come from existing entries. Filing them as one feud rather than four secrets makes the Sky City legible as a political board rather than a set of unrelated hooks.',
        ),
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

const ROUTES: SeedEntity[] = [
  E({
    id: 'route.the-green-line',
    type: 'route',
    name: 'The Green Line',
    status: 'draft',
    summary: 'Food, oil and precision goods up from the coast to the hub; paper and credit back down.',
    tags: ['trade', 'road', 'meridian coast'],
    fields: {
      overview:
        'The western trunk road, drawn on the atlas as the trade line `trade.green-line` over the road `road.ascent-west`. It runs from [[city.mediterranean-city|the Mediterranean City]] up out of the coastal terraces, along the olive water, and across the southern lip of [[region.hollow-karst|the karst]] into [[city.gilded-ascent|the Gilded Ascent]].\n\nIt is the best-surfaced road on the continent for the simple reason that both ends can afford it, and it carries the highest-value cargo by weight of anything except the lift.',
      routeKind: 'Trade route',
      endpoints: 'The Mediterranean City to the Gilded Ascent, by way of the olive water valley',
      travelTime: 'Nine to eleven days by loaded wagon; six with a change of animals at the halfway posts',
      goods: [
        'food.meridian-olive',
        'food.terrace-citron',
        'item.governor-spring',
        'material.clearcast-glass',
        'material.tideset-cement',
        'item.stair-writ',
      ],
      hazards:
        'Not dangerous so much as expensive. The road crosses the olive water three times and two of the bridges are toll bridges in private hands. Winter rain turns the karst lip section to a rut. The real hazard is administrative: [[item.governor-spring|governor springs]] and [[material.clearcast-glass|clearcast glass]] travel under Conduit College seal, and a broken seal voids the consignment whether or not the goods are intact.',
      control:
        'Tolled at both ends and taxed in the middle. The [[faction.conduit-college|Conduit College]] licenses what may leave the port and under what seal. The [[faction.concord-of-weights|Concord]] farms the tariff on the last four days into the basin. The two toll bridges belong to families who hold nothing else and defend them accordingly.\n\nNobody preys on this road seriously, which is itself a fact about it: the cargo is sealed, traceable and useless unsealed, so theft here is a specialist trade requiring a [[skill.false-proof|forged proof]] and a buyer arranged in advance.',
      devNotes:
        PROPOSAL(
          'Map geometry: `trade.green-line` and `road.ascent-west` in geo.ts. Travel times across all route entries are internally consistent and rest on nothing, because the map scale is unsettled: see [[note.map-scale|What is the actual scale of the map?]]. Treat the day counts as ratios rather than durations.',
        ),
    },
  }),

  E({
    id: 'route.the-salt-road',
    type: 'route',
    name: 'The Salt Road',
    status: 'draft',
    summary: 'Nitre, button and bonded people out of the Pans; water, grain and Ascent paper back east.',
    tags: ['trade', 'road', 'white pans', 'dark'],
    fields: {
      overview:
        'The southern trunk, drawn as `trade.salt-road` over the roads `road.pan-road`, `road.steppe-run` and `road.south-stair`. It runs from [[city.sifting-city|the Sifting City]] through [[city.orath|Orath]] and [[city.arena-city|the Arena City]] to [[city.gilded-ascent|the Gilded Ascent]].\n\nIt is the longest overland haul on the continent, it crosses two zones the atlas marks as disputed or raided, and it is the only reason either the Pans or the steppe can support a city.',
      routeKind: 'Trade route',
      endpoints: 'The Sifting City to the Gilded Ascent, through Orath and the Arena City',
      travelTime: 'Twenty-six to thirty-four days end to end. The Orath leg alone is nine and cannot be shortened.',
      goods: [
        'material.pan-nitre',
        'material.blackfall-button',
        'food.dew-melon',
        'food.steppe-sour',
        'material.steppe-scute',
        'item.indenture-bond',
      ],
      hazards:
        'Water, then people, then water again. Nine wells over the dry march and no agreed schedule of who may draw: see [[war.the-dry-march|the Dry March]]. The stretch east of the Arena City is marked on the atlas as raided road and is not travelled after dark by anyone with a choice.\n\n[[food.dew-melon|Dew melons]] pass as currency on the waste margin because they are carried as water rather than as food, which makes a melon cart a robbery target in a way a nitre cart is not.',
      control:
        'Taxed by the [[faction.pale-assay|Pale Assay]] at the western end, since a barrel of nitre is worth what its grade stamp says and the stamp is applied before it moves. Taxed again by the [[faction.concord-of-weights|Concord]] at the basin end. In between, Orath posts a ration board and charges for the tank yard, and nobody has ever established by what authority.\n\nThe cargo the road is quietly known for is people. Registered [[item.indenture-bond|bonds]] move east and west under the Bond Statute, declared as crewed passage, and [[faction.bondwrights-hall|the Bondwrights\' Hall]] has an office at both ends. [[faction.low-tally|The Low Tally]] works the same road for the same trade without the paperwork.',
      devNotes:
        PROPOSAL(
          'Map geometry: `trade.salt-road`, `road.pan-road`, `road.steppe-run`, `road.south-stair`. The trafficking on this road is written as freight documentation because that is what it is; keep it in manifests and registry fees, never in scenes staged for effect. See [[note.dark-themes-handling|the design note]].',
        ),
    },
  }),

  E({
    id: 'route.the-gilded-circuit',
    type: 'route',
    name: 'The Gilded Circuit',
    status: 'draft',
    summary: 'The rich road: hub to sky city to the Scar to the fog coast, and almost nothing on it is bulk.',
    tags: ['trade', 'road', 'magic'],
    fields: {
      overview:
        'The north-eastern trunk, drawn as `trade.gilded-circuit` over `road.ascent-lift`, `road.scar-road` and `road.mistfall-road`. It links [[city.gilded-ascent|the Gilded Ascent]], [[city.sky-city|the Sky City]], [[city.magic-city|the Magic City]] and [[city.keth-veyra|Keth Veyra]].\n\nBy tonnage it is a minor road. By value it is the most important line on the map, because every gram of [[material.levin-salt|levin salt]] and every stick of licensed [[material.ward-chalk|ward chalk]] that leaves the Scar lawfully leaves along it.',
      routeKind: 'Trade route',
      endpoints: 'The Gilded Ascent to Keth Veyra, by way of the Sky City and the Magic City',
      travelTime: TBD(
        'Sixteen days to the Magic City, of which the lift head is half a day and a third of the cost. How long the last leg into the Mistfall takes with four bells silent is a figure no carter will quote.',
      ),
      goods: [
        'material.levin-salt',
        'material.ward-chalk',
        'material.quenchspar',
        'material.sparbone',
        'item.ward-pin',
        'material.stairwire',
      ],
      hazards:
        'The Scar leg is the only stretch of made road on the continent that requires a skill to survive rather than a guard. Gradients shift, and carters keep to the posted line because the posted line is surveyed and the ground either side of it is not: [[skill.scar-reading|Scar Reading]] is what the licensed carters are actually paid for.\n\nBeyond the Magic City the road runs into [[region.mistfall-coast|the fog]], where the last four days are navigated by [[mechanic.the-bell-lines|bell line]] and a silenced bell is a route nobody can walk.',
      control:
        'Sealed and taxed at every gate. Levin salt is weighed, sealed and taxed at each crossing and unsealed salt is contraband even where salt is legal, which makes this road a chain of custody rather than a journey. The [[faction.fetterhouse|Fetterhouse]] controls what leaves the Scar; the [[faction.mooring-assize|Mooring Assize]] prices the lift leg; the [[faction.concord-of-weights|Concord]] clears the paper at the basin end.\n\nNobody robs this road, because the cargo cannot be sold unsealed and everyone who could break a seal is licensed and countable.',
      devNotes:
        PROPOSAL(
          'Map geometry: `trade.gilded-circuit`, `road.ascent-lift`, `road.scar-road`, `road.mistfall-road`. The Keth Veyra leg is written from outside, because nothing about that city is established. See [[note.keth-veyra-concept|the design note]].',
        ),
    },
  }),

  E({
    id: 'route.the-weir-run',
    type: 'route',
    name: 'The Weir Run',
    status: 'draft',
    summary: 'The eastern haul to the sea, and every load on it stops at a gate somebody else opens.',
    tags: ['trade', 'drown', 'river'],
    fields: {
      overview:
        'Drawn as `trade.weir-run` over `road.weir-road` and `road.raft-road`, shadowing the Long Water east from [[city.gilded-ascent|the Gilded Ascent]] to [[city.black-weir|the Black Weir]], on to [[city.floating-swamp-settlement|the floating settlement]] and out to the delta mouth.\n\nMost of the traffic is water traffic and the road exists to service it. Everything the Ascent ships east passes the [[landmark.the-weir-gates|Weir Gates]], and the Concord has no leverage there at all, which it hates.',
      routeKind: 'Trade route',
      endpoints: 'The Gilded Ascent to the delta mouth, through the Black Weir',
      travelTime: 'Eleven to fourteen days downstream; nineteen to twenty-six back up, depending on gate hours bought',
      goods: [
        'material.mire-bloom',
        'material.glasscane',
        'material.mirelac',
        'food.tide-rice',
        'item.stair-writ',
        'material.blister-bar',
      ],
      hazards:
        'The schedule. A barge that misses its gate hour waits, and waiting in the throat costs mooring, and mooring in the throat is priced by the party that set the schedule. Below the gates the channel moves, and a third of [[npc.gwill-ossekind|the marker staves]] are now wrong or gone.\n\nThe [[creature.blackrun-lamprey|lamprey]] run fouls water intakes for three weeks each spring, and a leaking [[recipe.lamp-gas-bladders|gas bladder]] in a hold is a standing hazard on every eastern hull.',
      control:
        'The [[faction.iron-sluice-company|Iron Sluice Company]], absolutely, by charter and by gate. [[mechanic.the-sluice-book|The Sluice Book]] prices a gate-hour, and buying one can float your barge or strand a rival, and the Company answers for neither.\n\nDownstream, the [[faction.moorstone-compact|Moorstone Compact]] controls where a hull may moor and for how long. Between the two, [[faction.low-tally|the Low Tally]] runs the ullage trade through the tail and pays gantry crews better than the Company does. See [[war.the-throat|the Throat]].',
      devNotes:
        PROPOSAL(
          'Map geometry: `trade.weir-run`, `road.weir-road`, `road.raft-road`, shadowing `river.the-long-water`. The Weir end is a proposal on a canon name. If the Weir is redefined, this route survives as a river haul with a different chokepoint, so keep the toll and move the owner.',
        ),
    },
  }),

  E({
    id: 'route.the-timber-line',
    type: 'route',
    name: 'The Timber Line',
    status: 'draft',
    summary: 'Charcoal, timber and grain down out of the forest and the highland, on the continent\'s worst good road.',
    tags: ['trade', 'greatwood', 'karst'],
    fields: {
      overview:
        'Drawn as `trade.timber-line` over `road.forest-march`, `road.upland-way` and `road.karst-way`. It runs from [[city.tree-city|the Tree City]] south through [[city.oruvai|Oruvai]] and [[city.cave-agrarian-city|the Cave Agrarian City]] to [[city.gilded-ascent|the Gilded Ascent]].\n\nIt is a hauliers\' road rather than a factors\' road: heavy, slow, weather-bound, and carrying two things nothing else on the continent supplies, which are hard charcoal and blackbole.',
      routeKind: 'Trade route',
      endpoints: 'The Tree City to the Gilded Ascent, through Oruvai and the cave galleries',
      travelTime: 'Fifteen to twenty-two days. The Oruvai pass leg is weather-bound and voids contracts when it shuts.',
      goods: [
        'material.blackbole-timber',
        'food.mirror-barley',
        'food.bole-mast',
        'food.sump-carp',
        'material.sunwell-mica',
        'material.pan-nitre',
      ],
      hazards:
        'Weather closes the highland leg without notice, which is why [[mechanic.the-high-carry|the High Carry]] pays by weight and altitude and voids on a shut pass. Below the pass the road runs through licensed forest, where leaving it is trespass and snaring beside it is [[skill.wire-and-snare|poaching]].\n\nNorthbound the cargo is grain and nitre and nobody troubles it. Southbound it is charcoal, and roughly a fifth of the charcoal on this road is unlicensed and travelling on a forged manifest.',
      control:
        'The [[faction.pitchguard|Pitchguard]] controls the northern half absolutely: every felling is a council vote, every wagon carries a manifest, and the escort is the same order that fights the outwood. Oruvai charges for the carry and issues a seal that karst reeves honour without being able to read it, and who issues that seal is not established.\n\nThe [[faction.mirror-assembly|Mirror Assembly]] tithes what passes the galleries. The Concord takes the last leg. See [[war.the-charcoal-truce|the Charcoal Truce]] for what happens if the northern half ever closes.',
      devNotes:
        PROPOSAL(
          'Map geometry: `trade.timber-line`, `road.forest-march`, `road.upland-way`, `road.karst-way`. The Oruvai seal is referenced but not explained, matching that city\'s deliberately thin entry. See [[note.oruvai-concept|the design note]].',
        ),
    },
  }),

  E({
    id: 'route.the-lift-road',
    type: 'route',
    name: 'The Lift Road',
    status: 'draft',
    summary: 'Half a day of road between the hub and the lift head, and the most expensive half day on the continent.',
    tags: ['road', 'sky city', 'chokepoint'],
    fields: {
      overview:
        'Drawn as `road.ascent-lift`: the made road from the eastern hoist yards of [[city.gilded-ascent|the Gilded Ascent]] up the shoulder of the shelf to the lift head under [[city.sky-city|the Sky City]]. It is short, wide, metalled, patrolled and lit, and it is the only lawful way for a load to reach the masts.\n\nEverything the Sky City eats travels it. So does every gram of ballast, every coil of [[material.stairwire|stairwire]] and every registered passenger.',
      routeKind: 'Road',
      endpoints: 'The Gilded Ascent hoist yards to the Sky City lift head',
      travelTime: 'Half a day loaded. The queue at the head is routinely longer than the journey.',
      goods: [
        'food.lattice-cress',
        'food.stair-loaf',
        'material.stairwire',
        'material.sparbone',
        'material.ward-chalk',
        'item.ballast-jacket',
      ],
      hazards:
        'Almost none on the road and a great many at its end. Every gram going up is declared, weighed and priced under [[mechanic.mass-warrant|the Mass Warrant]], and an undeclared gram is not a fine, it is a charge against the mast-holder as well as the carrier.\n\nThe queue is the real hazard. Unbonded freight waits behind bonded, always, and perishables in a long queue are a total loss that nobody insures.',
      control:
        'A chokepoint with two owners and no competition. The [[faction.mooring-assize|Mooring Assize]] prices the lift and licenses the masts. The [[faction.concord-of-weights|Concord]] holds the road and the yards at the bottom. Each believes it owns the other and each is correct, which is the reason neither has ever tried to price the other out.\n\nNobody preys on the Lift Road. Everything that would be worth taking is either declared and traceable or has already been moved down the mooring lines at night by [[npc.perrine-orlaunt|somebody with no manifest entry]].',
      devNotes:
        PROPOSAL(
          'Map geometry: `road.ascent-lift`. It has its own entry rather than being folded into [[route.the-gilded-circuit|the Gilded Circuit]] because its control regime is completely different from the rest of that line: half a day of road that two institutions jointly hold and that a blockade of any kind would sever instantly.',
        ),
    },
  }),

  E({
    id: 'route.the-long-water',
    type: 'route',
    name: 'The Long Water',
    status: 'draft',
    summary: 'Three forks into one river, and the only bulk artery the continent has.',
    tags: ['river', 'bulk', 'drown'],
    fields: {
      overview:
        'The North Fork out of [[region.ironback-range|the Ironback]], the Karst Fork out of [[region.hollow-karst|the karst]] and the Shelf Fork off [[region.anvil-shelf|the Anvil Shelf]] meet in a wide gravel pool under [[city.gilded-ascent|the Gilded Ascent]] and leave east as the Long Water. Drawn on the atlas as `river.north-fork`, `river.karst-fork`, `river.shelf-fork` and `river.the-long-water`.\n\nA barge carries what forty carts carry. Everything heavy that moves any distance on this continent moves on this river for part of its journey, which is the entire reason the confluence is worth holding.',
      routeKind: 'River',
      endpoints: 'The three forks to the delta mouth, through the Black Weir and the floating settlement',
      travelTime: 'Downstream from the confluence to the delta mouth in eleven to fourteen days. Upstream is a different trade and a different boat.',
      goods: [
        'material.scaldstone',
        'material.mire-bloom',
        'material.glasscane',
        'food.mirror-barley',
        'material.blister-bar',
        'material.blackbole-timber',
      ],
      hazards:
        'Ice closes the forks for about six weeks, and low water in high summer strands lighters on the Karst Fork above the second staith. The Shelf Fork is shallow and fast and drowns more people per year than the other two together.\n\nBelow the confluence the hazard stops being the river and becomes the gates. Below the gates the channel moves, and the marker staves are notched by hand by a man who has not come back.',
      control:
        'Nobody owns the forks and everybody taxes the confluence. Goods entering [[district.gilded-ascent-confluence-wharves|the wharves]] are weighed at the fork-head scales before they go anywhere near a hoist, which is the lawful weighing point and therefore the thing every smuggler on the river is avoiding.\n\nDownstream the river has an owner: the [[faction.iron-sluice-company|Iron Sluice Company]], from the sill onward. Three silted staiths at the confluence are worked anyway by [[faction.low-tally|the Low Tally]], on the reasoning that a scale which does not exist cannot be disputed.',
      devNotes:
        PROPOSAL(
          'Map geometry: `river.the-long-water` and the three forks. The atlas also draws `river.ash-run` through the Arena City, `river.olive-water` on the Meridian side and `river.cold-race` into Keth Veyra; none of the three carries enough traffic to have earned an entry yet, and two of them touch cities that are deliberately unwritten.',
        ),
    },
  }),

  E({
    id: 'route.the-southern-reach',
    type: 'route',
    name: 'The Southern Reach',
    status: 'draft',
    summary: 'The coastal sea lane round the south and east, sailed on printed tables that are nine years out.',
    tags: ['sea', 'meridian gulf', 'navigation'],
    fields: {
      overview:
        'The continent\'s one continuous sea lane, drawn as `sea.southern-reach` from the [[region.meridian-gulf|Meridian Gulf]] round the south coast and up the east side, continuing north as `sea.mistfall-run` to the fog coast, with the short `sea.gulf-crossing` as its western ferry branch.\n\nIt is coasting trade rather than open-water sailing. Hulls stay in soundings, work tide and land breeze, and put in every second night, which is why it is sailed at all by people who have never been out of sight of land.',
      routeKind: 'Sea lane',
      endpoints: 'The Meridian Gulf round the south coast to the delta mouth, and north again to the Mistfall Coast',
      travelTime: TBD(
        'Nobody has timed the full lane. Masters sail it in legs and no single hull has been logged end to end, so the eighteen-to-twenty-six-day figure is two coasters’ books added together.',
      ),
      goods: [
        'material.tideset-cement',
        'food.meridian-olive',
        'food.terrace-citron',
        'material.mirelac',
        'item.orrery-tables',
        'material.orrery-bronze',
      ],
      hazards:
        'Everything about this lane is timing, and the timing is printed. [[item.orrery-tables|Orrery tables]] set the sailing dates for the whole coast, the [[landmark.the-tide-orrery|Tide Orrery]] that produces them has drifted by about a day and a half in nine years, and [[npc.melitta-aspri|the calibrator]] has been biasing the printed figures to hide it.\n\nThe first thing that error will wreck is a spring tide the harbour is not braced for. The second will be a hull on a bar somewhere with a master who did exactly what the tables told him.',
      control:
        'Lightly held, which makes it the loosest artery on the continent. The [[faction.conduit-college|Conduit College]] controls the tables and therefore the sailing calendar. The [[faction.moorstone-compact|Moorstone Compact]] controls the delta end. Nobody controls the middle, and the southern shore has no port worth the name for four hundred leagues.\n\nWhat preys on it is weather and, in the last two seasons, a small number of vessels working the raided stretch of shore behind [[region.cinder-waste|the Cinder Waste]] whose owners nobody has established.',
      devNotes:
        PROPOSAL(
          'Map geometry: `sea.southern-reach`, `sea.mistfall-run` and `sea.gulf-crossing`, treated as one lane because they join. The tide-table drift ties this route directly to [[quest.four-minutes-fast|Four Minutes Fast]]: proving the error reopens every lease priced against the old tables, and this is the lane those leases are for.',
        ),
    },
  }),

  E({
    id: 'route.the-root-way',
    type: 'route',
    name: 'The Root Way',
    status: 'draft',
    summary: 'Unlicensed charcoal and unregistered strains, moved south under the trees and through the galleries.',
    tags: ['smuggling', 'greatwood', 'karst'],
    fields: {
      overview:
        'Drawn as `smuggle.root-way`. It leaves [[city.tree-city|the Tree City]] west of the pale, works south through the outwood, drops into [[region.hollow-karst|the karst]] by way of galleries that do not appear on the Assembly\'s duct list, and comes out on the Karst Fork above [[city.gilded-ascent|the Gilded Ascent]].\n\nIt exists to avoid exactly two documents: the Pitchguard felling manifest and the Ascent fork-head scale.',
      routeKind: 'Smuggling route',
      endpoints: 'The Tree City to the Gilded Ascent, avoiding the pale and the fork-head scale',
      travelTime: 'Twenty to twenty-six days, against fifteen on the road. Nobody takes it to save time.',
      goods: [
        'material.blackbole-timber',
        'material.cudmother',
        'food.gallery-cap',
        'material.mire-bloom',
        'item.nitre-cask',
      ],
      hazards:
        'The forest half is a hanging matter if caught, because cutting without a licence and moving unlicensed cut are the same offence in Pitchguard law. The karst half is worse in a duller way: unlisted galleries have no light allocation, no air rota and no rescue, and a fall in one is not reported because reporting it admits the gallery exists.\n\n[[material.cudmother|Cudmother]] starters are the classic cargo and the reason the route is worked at all in the off season. Export is barred outright and starters still leave in the warmth of a courier\'s armpit.',
      control:
        'Preyed on rather than controlled. The [[faction.pitchguard|Pitchguard]] patrols the northern end and hangs what it catches; the [[faction.mirror-assembly|Mirror Assembly]] prosecutes light theft and gallery trespass at the southern end and does not admit the unlisted galleries exist.\n\nIn between, [[faction.low-tally|the Low Tally]] moves cudmother starters and unregistered strains, and the hearth-clans move charcoal. The two trades share porters, which is how a party gets from one to the other.',
      devNotes:
        PROPOSAL(
          'Map geometry: `smuggle.root-way`. It avoids two specific instruments: the felling manifest and the fork-head scale. The unlisted galleries are the invention worth keeping, because they give the Hollow Karst a physical underside that the share roll does not cover.',
        ),
    },
  }),

  E({
    id: 'route.the-thermal-drop',
    type: 'route',
    name: 'The Thermal Drop',
    status: 'draft',
    summary: 'Down the mooring lines at night and east to the gates, with nothing entered in any manifest.',
    tags: ['smuggling', 'sky city', 'dark'],
    fields: {
      overview:
        'Drawn as `smuggle.thermal-drop`. Cargo leaves [[city.sky-city|the Sky City]] by ballast descent on an unlogged line, is picked up at the shelf foot, and runs east across the tail of [[region.anvil-shelf|the Anvil Shelf]] to [[city.black-weir|the Black Weir]] without ever touching [[city.gilded-ascent|the basin]].\n\nIt exists to avoid one thing, and it is not a tariff. It is [[mechanic.mass-warrant|the Mass Warrant]]: the declaration that makes every gram aboard a licensed, billed and countable object.',
      routeKind: 'Smuggling route',
      endpoints: 'The Sky City to the Black Weir, avoiding the lift head and the basin scales',
      travelTime: 'Two nights for the descent and the pickup; nine to twelve days east',
      goods: [
        'material.sparbone',
        'item.crown-bolt',
        'item.mooring-lance',
        'material.levin-salt',
        'item.pale-dust',
      ],
      hazards:
        'The descent kills people. It is done in sealed ballast crates on a line nobody has inspected, in the dark, by crews paid by the load. Two winters ago a woman suffocated in one, and [[npc.perrine-orlaunt|the ballast-runner]] has paid that family every month since, which is the only leverage anyone has on her.\n\nThe overland leg is the easy part and the reason the route is viable at all: the shelf tail is empty, dry and unpoliced, and nobody has ever bothered to put a post on it.',
      control:
        'Nobody controls it and two bodies would like to. The [[faction.mooring-assize|Mooring Assize]] treats an undeclared descent as a charge against the mast-holder as well as the carrier, which is why the lines used are the six that appear on no register. [[faction.low-tally|The Low Tally]] runs the eastern leg and takes a cut of everything.\n\nThe cargo that pays best is not goods. A person moved off the Sky City with no manifest entry is worth more than anything they could carry, and there is exactly one person who can do it.',
      devNotes:
        PROPOSAL(
          'Map geometry: `smuggle.thermal-drop`. The instrument avoided is the Mass Warrant declaration, which is what makes this route feel different from a tariff dodge: the thing being evaded is a census, not a tax. Handle the human cargo as consequence for named people, per [[note.dark-themes-handling|the design note]].',
        ),
    },
  }),

  E({
    id: 'route.the-underbrace',
    type: 'route',
    name: 'The Underbrace',
    status: 'draft',
    summary: 'Overland out of the delta to the waste margin, because the only alternative is a gate somebody else opens.',
    tags: ['smuggling', 'drown', 'cinder waste'],
    fields: {
      overview:
        'Drawn as `smuggle.underbrace`. It leaves [[city.floating-swamp-settlement|the floating settlement]] by punt through the southern mats, crosses the dry margin west of [[region.white-pans|the Pans]] on foot and by mule, and comes into [[city.orath|Orath]] from the east.\n\nIt is slow, waterless and unpleasant, and it exists for one reason: nothing on it passes the [[landmark.the-weir-gates|Weir Gates]], so nothing on it appears in [[mechanic.the-sluice-book|the Sluice Book]] and nothing on it is priced by the hour.',
      routeKind: 'Smuggling route',
      endpoints: 'The floating settlement to Orath, avoiding the Weir toll entirely',
      travelTime: 'Sixteen to twenty-one days, against eight by river with a bought gate hour',
      goods: [
        'material.mirelac',
        'material.glasscane',
        'food.tide-rice',
        'material.pan-nitre',
        'item.moor-stake',
      ],
      hazards:
        'Water for the first four days and then no water for six. The margin has no wells that a raft-clan knows the location of, so the crossing is made on carried water and [[food.dew-melon|dew melons]] bought at the far end at whatever the melon-holders decide.\n\nThe mats themselves need [[skill.marsh-footing|Marsh Footing]] and a punt, and the crossing needs [[skill.the-far-walk|The Far Walk]] and honest cache discipline. Parties die on this route by turning back too late rather than by being caught.',
      control:
        'Unowned, unpoliced and unprofitable for anyone but the people walking it. The [[faction.iron-sluice-company|Iron Sluice Company]] knows the route exists, has surveyed it twice, and concluded that its own toll is cheaper than the crossing for any cargo worth stopping, which is correct and is why it does nothing.\n\nWhat that leaves is the trade in things the Company would confiscate rather than tax. [[faction.low-tally|The Low Tally]] moves those, and Orath asks nothing at the tank yard except payment.',
      devNotes:
        PROPOSAL(
          'Map geometry: `smuggle.underbrace`. The specific instrument avoided is the Sluice Book gate-hour. The route is deliberately bad economics: it only pays for contraband, which keeps the Weir\'s toll structurally intact and makes the Throat conflict about politics rather than competition.',
        ),
    },
  }),

  E({
    id: 'route.the-dry-crossing',
    type: 'route',
    name: 'The Dry Crossing',
    status: 'draft',
    summary: 'Ungraded sift and unstamped button, carried west below the pans to a city that will not ask.',
    tags: ['smuggling', 'white pans', 'ashen steppe'],
    fields: {
      overview:
        'Drawn as `smuggle.dry-crossing`. It leaves [[city.sifting-city|the Sifting City]] south of the tower line, skirts the deep pans the atlas marks as waterless, and comes up into [[city.arena-city|the Arena City]] from the south-west, bypassing [[city.orath|Orath]] and the whole tolled length of [[route.the-salt-road|the Salt Road]].\n\nIt avoids two instruments. The [[faction.pale-assay|Pale Assay]] grade stamp, which is the only thing a barrel of nitre is actually sold on, and the registry fee that makes a foreign bond enforceable in the Pans.',
      routeKind: 'Smuggling route',
      endpoints: 'The Sifting City to the Arena City, avoiding the assay towers and the registry',
      travelTime: 'Fourteen to eighteen days and no reliable water after the fourth',
      goods: [
        'material.pan-nitre',
        'material.blackfall-button',
        'item.pale-dust',
        'material.steppe-scute',
        'item.indenture-bond',
      ],
      hazards:
        'The deep pans have no water and the crust gives way where a [[creature.salt-mason|salt mason]] colony has died under it, which is also exactly where the richest sift is. Crews work the margin of that trade-off on purpose and lose people to it.\n\n[[npc.sahat-belek|Pan-walkers]] who work the far white alone are the only reliable guides, and there are perhaps a dozen of them.',
      control:
        'Preyed on by the people who also police it, which is the local arrangement. Tower-masters buy ungraded sift off this road at a discount and grade it themselves, so the [[faction.pale-assay|Pale Assay]]\'s own members are its principal customers.\n\nThe darker traffic runs the other way. A bonded person carried west along this road arrives in the Arena City unregistered, which suits a bond-holder who would rather not pay a fee and suits nobody else at all. [[faction.low-tally|The Low Tally]] moves both directions and calls it crewed passage.',
      devNotes:
        PROPOSAL(
          'Map geometry: `smuggle.dry-crossing`. Two named instruments avoided: the grade stamp and the registry fee. The detail worth keeping is that the assayers are the customers, which makes the smuggling route an internal fraud rather than an external threat and gives [[quest.pan-fever|Pan Fever]] somewhere to go.',
        ),
    },
  }),
]

export const entities: SeedEntity[] = [...EVENTS, ...WARS, ...ROUTES]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

/** The timeline read in order. Each event follows the one before it. */
const SEQUENCE: string[] = [
  'event.the-cut-terraces',
  'event.the-opening-of-the-scar',
  'event.the-ashfall-years',
  'event.the-ferry-and-the-weight',
  'event.the-first-silvered-duct',
  'event.the-first-chain',
  'event.the-first-felling-licence',
  'event.the-underwater-cure',
  'event.the-weir-charter',
  'event.the-flood-and-the-first-draw',
  'event.the-seventh-terrace-fire',
  'event.the-stockade-years',
  'event.the-written-rate',
  'event.the-chaining-of-five-bays',
  'event.the-crucible-licences',
  'event.the-bond-statute',
  'event.the-fire-in-the-sixth-bole',
  'event.the-standing-hour',
  'event.the-purged-quarter',
  'event.the-third-bore',
  'event.the-sixth-mast-collapse',
  'event.the-sixth-slippage',
  'event.the-gallery-blight',
  'event.the-concession-called',
]

const chain: SeedRelation[] = SEQUENCE.slice(1).map((id, i) => R(id, 'follows', SEQUENCE[i]))

/** Causal links that jump the sequence, where one event is a direct answer to an older one. */
const causal: SeedRelation[] = [
  R('event.the-underwater-cure', 'follows', 'event.the-ashfall-years', 'the ash beds are the feedstock'),
  R('event.the-crucible-licences', 'follows', 'event.the-ashfall-years', 'the black drift has no local parent rock'),
  R('event.the-first-chain', 'follows', 'event.the-opening-of-the-scar', 'a fault in charged ground had to be held or abandoned'),
  R('event.the-sixth-slippage', 'follows', 'event.the-first-chain', 'the sixth failure of the same technique'),
  R('event.the-flood-and-the-first-draw', 'follows', 'event.the-weir-charter', 'a lottery that only works if the schedule is unknown'),
  R('event.the-chaining-of-five-bays', 'follows', 'event.the-weir-charter'),
  R('event.the-stockade-years', 'follows', 'event.the-first-felling-licence', 'the escort became the state'),
  R('event.the-purged-quarter', 'follows', 'event.the-stockade-years', 'the levy the Stockade Years established'),
  R('event.the-fire-in-the-sixth-bole', 'follows', 'event.the-first-felling-licence'),
  R('event.the-bond-statute', 'follows', 'event.the-written-rate', 'conversion first, then portability'),
  R('event.the-bond-statute', 'follows', 'event.the-crucible-licences', 'passed in a drought year in the Pans'),
  R('event.the-third-bore', 'follows', 'event.the-crucible-licences', 'the bores were sunk to make the camp a city'),
  R('event.the-standing-hour', 'follows', 'event.the-seventh-terrace-fire', 'a city rebuilt in stone and run on cable'),
  R('event.the-concession-called', 'follows', 'event.the-sixth-slippage', 'the rota is a payroll the Fetterhouse cannot meet'),
  R('event.the-gallery-blight', 'follows', 'event.the-first-silvered-duct', 'shares cut generations ago decide who starves now'),
]

/** What each event did to the world. */
const eventAffects: SeedRelation[] = [
  R('event.the-cut-terraces', 'affects', CITY.mediterranean, 'arable benches nobody had to build'),
  R('event.the-cut-terraces', 'affects', CITY.oruvai, 'worked stone older than any account of the town'),
  R('event.the-cut-terraces', 'affects', REGION.hollowKarst, 'dry steps nothing has ever been grown on'),
  R('event.the-cut-terraces', 'affects', 'faction.conduit-college', 'an unpublished survey it will not release'),

  R('event.the-opening-of-the-scar', 'affects', REGION.aethericScar),
  R('event.the-opening-of-the-scar', 'affects', CITY.magicCity, 'the fault the city is built on'),
  R('event.the-opening-of-the-scar', 'affects', 'material.levin-salt', 'the only source, anywhere'),
  R('event.the-opening-of-the-scar', 'affects', 'deposit.brine-sinks'),

  R('event.the-ashfall-years', 'affects', REGION.cinderWaste, 'a buried drainage system, not old desert'),
  R('event.the-ashfall-years', 'affects', 'deposit.ash-quarries'),
  R('event.the-ashfall-years', 'affects', 'deposit.blackfall-drifts'),
  R('event.the-ashfall-years', 'affects', 'material.tideset-cement'),

  R('event.the-ferry-and-the-weight', 'affects', CITY.gildedAscent),
  R('event.the-ferry-and-the-weight', 'affects', 'faction.concord-of-weights', 'the reference masses are the original asset'),
  R('event.the-ferry-and-the-weight', 'affects', 'landmark.the-brass-standard'),
  R('event.the-ferry-and-the-weight', 'affects', 'mechanic.standing-ledger'),

  R('event.the-first-silvered-duct', 'affects', CITY.caveAgrarian),
  R('event.the-first-silvered-duct', 'affects', 'faction.mirror-assembly', 'the share roll opens and is never re-cut'),
  R('event.the-first-silvered-duct', 'affects', 'mechanic.the-mirror-rota'),
  R('event.the-first-silvered-duct', 'affects', 'material.sunwell-mica'),

  R('event.the-first-chain', 'affects', CITY.magicCity),
  R('event.the-first-chain', 'affects', 'faction.fetterhouse'),
  R('event.the-first-chain', 'affects', 'mechanic.ward-load'),
  R('event.the-first-chain', 'affects', 'spell.holdfast-binding'),
  R('event.the-first-chain', 'affects', 'landmark.the-bound-fault'),

  R('event.the-first-felling-licence', 'affects', CITY.treeCity),
  R('event.the-first-felling-licence', 'affects', REGION.greatwood),
  R('event.the-first-felling-licence', 'affects', 'faction.pitchguard'),
  R('event.the-first-felling-licence', 'affects', 'material.blackbole-timber'),
  R('event.the-first-felling-licence', 'affects', 'deposit.standing-fifty'),

  R('event.the-underwater-cure', 'affects', CITY.mediterranean),
  R('event.the-underwater-cure', 'affects', 'faction.conduit-college'),
  R('event.the-underwater-cure', 'affects', 'material.tideset-cement'),
  R('event.the-underwater-cure', 'affects', REGION.meridianCoast),

  R('event.the-weir-charter', 'affects', CITY.blackWeir),
  R('event.the-weir-charter', 'affects', 'faction.iron-sluice-company'),
  R('event.the-weir-charter', 'affects', 'mechanic.the-sluice-book'),
  R('event.the-weir-charter', 'affects', 'landmark.the-weir-gates'),
  R('event.the-weir-charter', 'affects', REGION.theDrown),

  R('event.the-flood-and-the-first-draw', 'affects', CITY.floatingSwamp),
  R('event.the-flood-and-the-first-draw', 'affects', 'faction.moorstone-compact'),
  R('event.the-flood-and-the-first-draw', 'affects', 'mechanic.the-remoor'),
  R('event.the-flood-and-the-first-draw', 'affects', 'landmark.the-moorstone'),

  R('event.the-seventh-terrace-fire', 'affects', CITY.gildedAscent),
  R('event.the-seventh-terrace-fire', 'affects', 'faction.concord-of-weights', 'the charter dates from the fire'),
  R('event.the-seventh-terrace-fire', 'affects', 'district.gilded-ascent-bonded-vaults'),
  R('event.the-seventh-terrace-fire', 'affects', 'material.tideset-cement', 'stone became cheaper than the premium'),

  R('event.the-stockade-years', 'affects', CITY.treeCity),
  R('event.the-stockade-years', 'affects', 'faction.pitchguard'),
  R('event.the-stockade-years', 'affects', REGION.greatwood),
  R('event.the-stockade-years', 'affects', 'mechanic.severance-drill'),

  R('event.the-written-rate', 'affects', CITY.arenaCity),
  R('event.the-written-rate', 'affects', 'faction.red-writ'),
  R('event.the-written-rate', 'affects', 'mechanic.ring-bond'),
  R('event.the-written-rate', 'affects', 'landmark.the-sunken-ring'),
  R('event.the-written-rate', 'affects', 'item.indenture-bond'),

  R('event.the-chaining-of-five-bays', 'affects', CITY.floatingSwamp, 'the rice mats and the lower moorings'),
  R('event.the-chaining-of-five-bays', 'affects', CITY.blackWeir),
  R('event.the-chaining-of-five-bays', 'affects', 'faction.iron-sluice-company'),
  R('event.the-chaining-of-five-bays', 'affects', 'food.tide-rice'),
  R('event.the-chaining-of-five-bays', 'affects', 'deposit.bloom-cuts'),

  R('event.the-crucible-licences', 'affects', CITY.siftingCity),
  R('event.the-crucible-licences', 'affects', 'material.blackfall-button'),
  R('event.the-crucible-licences', 'affects', 'faction.pale-assay'),
  R('event.the-crucible-licences', 'affects', 'district.sifting-city-the-crucible-sheds'),
  R('event.the-crucible-licences', 'affects', 'mechanic.the-sift-line'),

  R('event.the-bond-statute', 'affects', CITY.siftingCity),
  R('event.the-bond-statute', 'affects', 'faction.bondwrights-hall'),
  R('event.the-bond-statute', 'affects', 'item.indenture-bond'),
  R('event.the-bond-statute', 'affects', 'spell.debt-mark'),
  R('event.the-bond-statute', 'affects', CITY.mediterranean, 'the one harbour that voids a foreign bond'),

  R('event.the-fire-in-the-sixth-bole', 'affects', CITY.treeCity),
  R('event.the-fire-in-the-sixth-bole', 'affects', 'district.tree-city-sixth-quarter'),
  R('event.the-fire-in-the-sixth-bole', 'affects', 'mechanic.severance-drill'),
  R('event.the-fire-in-the-sixth-bole', 'affects', 'quest.the-felling-order'),

  R('event.the-standing-hour', 'affects', CITY.gildedAscent),
  R('event.the-standing-hour', 'affects', 'faction.standing-hour'),
  R('event.the-standing-hour', 'affects', 'landmark.the-stopped-bell'),
  R('event.the-standing-hour', 'affects', 'district.gilded-ascent-hoist-yards'),
  R('event.the-standing-hour', 'affects', 'faction.concord-of-weights', 'conceded the fund, prosecuted nobody'),

  R('event.the-purged-quarter', 'affects', CITY.treeCity),
  R('event.the-purged-quarter', 'affects', 'npc.aune-mustsalu', 'forging deaths on the rolls ever since'),
  R('event.the-purged-quarter', 'affects', 'npc.saarik-rauda'),
  R('event.the-purged-quarter', 'affects', 'district.tree-city-ninth-gallery'),

  R('event.the-third-bore', 'affects', CITY.siftingCity),
  R('event.the-third-bore', 'affects', 'landmark.the-third-bore'),
  R('event.the-third-bore', 'affects', 'district.sifting-city-the-water-court'),
  R('event.the-third-bore', 'affects', 'npc.tazrit-nourem'),

  R('event.the-sixth-mast-collapse', 'affects', CITY.skyCity),
  R('event.the-sixth-mast-collapse', 'affects', 'faction.mooring-assize'),
  R('event.the-sixth-mast-collapse', 'affects', 'mechanic.mass-warrant'),
  R('event.the-sixth-mast-collapse', 'affects', 'landmark.the-sixth-mast'),
  R('event.the-sixth-mast-collapse', 'affects', 'npc.aubran-ferrieu', 'stripped, barred, and still holding the sheets'),

  R('event.the-sixth-slippage', 'affects', CITY.magicCity),
  R('event.the-sixth-slippage', 'affects', 'faction.fetterhouse'),
  R('event.the-sixth-slippage', 'affects', 'district.magic-city-the-lean'),
  R('event.the-sixth-slippage', 'affects', 'npc.ysme-drannik'),
  R('event.the-sixth-slippage', 'affects', 'landmark.the-ninth-chain'),

  R('event.the-gallery-blight', 'affects', CITY.caveAgrarian),
  R('event.the-gallery-blight', 'affects', 'material.cudmother'),
  R('event.the-gallery-blight', 'affects', 'food.mirror-barley'),
  R('event.the-gallery-blight', 'affects', 'quest.who-gets-the-light'),
  R('event.the-gallery-blight', 'affects', 'npc.iratze-zubiate'),

  R('event.the-concession-called', 'affects', CITY.gildedAscent),
  R('event.the-concession-called', 'affects', CITY.magicCity),
  R('event.the-concession-called', 'affects', 'landmark.the-counting-stair'),
  R('event.the-concession-called', 'affects', 'quest.the-scar-concession'),
  R('event.the-concession-called', 'affects', 'faction.concord-of-weights'),
  R('event.the-concession-called', 'affects', 'faction.fetterhouse'),
]

/** Conflicts: who is in them, and what they land on. */
const warEdges: SeedRelation[] = [
  R('war.the-licence-war', 'involves', 'faction.pitchguard'),
  R('war.the-licence-war', 'involves', 'faction.standing-hour', 'stewards living in a condemned quarter'),
  R('war.the-licence-war', 'involves', 'npc.vetla-torvik'),
  R('war.the-licence-war', 'involves', 'npc.saarik-rauda'),
  R('war.the-licence-war', 'affects', CITY.treeCity),
  R('war.the-licence-war', 'affects', REGION.greatwood),
  R('war.the-licence-war', 'affects', 'deposit.standing-fifty'),
  R('war.the-licence-war', 'affects', 'route.the-timber-line'),
  R('war.the-licence-war', 'follows', 'event.the-stockade-years'),

  R('war.the-throat', 'involves', 'faction.iron-sluice-company'),
  R('war.the-throat', 'involves', 'faction.moorstone-compact'),
  R('war.the-throat', 'involves', 'faction.low-tally'),
  R('war.the-throat', 'involves', 'npc.ost-vennick'),
  R('war.the-throat', 'involves', 'npc.sabbe-sixteen-knot'),
  R('war.the-throat', 'affects', CITY.blackWeir),
  R('war.the-throat', 'affects', CITY.floatingSwamp),
  R('war.the-throat', 'affects', REGION.theDrown),
  R('war.the-throat', 'affects', 'route.the-weir-run'),
  R('war.the-throat', 'follows', 'event.the-chaining-of-five-bays'),

  R('war.the-bilateral-question', 'involves', 'faction.concord-of-weights'),
  R('war.the-bilateral-question', 'involves', 'faction.conduit-college'),
  R('war.the-bilateral-question', 'involves', 'faction.mooring-assize'),
  R('war.the-bilateral-question', 'involves', 'npc.wessel-ondriek'),
  R('war.the-bilateral-question', 'affects', CITY.gildedAscent),
  R('war.the-bilateral-question', 'affects', CITY.mediterranean),
  R('war.the-bilateral-question', 'affects', CITY.skyCity),
  R('war.the-bilateral-question', 'affects', 'machine.the-tally-engine'),
  R('war.the-bilateral-question', 'affects', 'quest.the-casting-voice'),

  R('war.the-dry-march', 'involves', 'faction.pale-assay'),
  R('war.the-dry-march', 'involves', 'faction.bondwrights-hall'),
  R('war.the-dry-march', 'involves', 'npc.kavel-uur'),
  R('war.the-dry-march', 'affects', CITY.siftingCity),
  R('war.the-dry-march', 'affects', CITY.arenaCity),
  R('war.the-dry-march', 'affects', CITY.orath),
  R('war.the-dry-march', 'affects', REGION.cinderWaste),
  R('war.the-dry-march', 'affects', 'route.the-salt-road'),
  R('war.the-dry-march', 'affects', 'mechanic.the-ration-board'),

  R('war.the-chain-rota', 'involves', 'faction.fetterhouse'),
  R('war.the-chain-rota', 'involves', 'faction.standing-hour'),
  R('war.the-chain-rota', 'involves', 'npc.ysme-drannik'),
  R('war.the-chain-rota', 'involves', 'npc.toval-cherek'),
  R('war.the-chain-rota', 'involves', 'npc.halvo-sarn'),
  R('war.the-chain-rota', 'affects', CITY.magicCity),
  R('war.the-chain-rota', 'affects', 'landmark.the-bound-fault'),
  R('war.the-chain-rota', 'affects', 'mechanic.ward-load'),
  R('war.the-chain-rota', 'affects', 'quest.the-chalk-that-lies'),
  R('war.the-chain-rota', 'follows', 'event.the-sixth-slippage'),

  R('war.the-third-stoppage', 'involves', 'faction.standing-hour'),
  R('war.the-third-stoppage', 'involves', 'faction.concord-of-weights'),
  R('war.the-third-stoppage', 'involves', 'faction.bondwrights-hall'),
  R('war.the-third-stoppage', 'involves', 'npc.brask-vellmar'),
  R('war.the-third-stoppage', 'involves', 'npc.doret-halvane'),
  R('war.the-third-stoppage', 'affects', CITY.gildedAscent),
  R('war.the-third-stoppage', 'affects', 'district.gilded-ascent-hoist-yards'),
  R('war.the-third-stoppage', 'affects', 'district.gilded-ascent-under-stair'),
  R('war.the-third-stoppage', 'affects', 'material.stairwire'),
  R('war.the-third-stoppage', 'follows', 'event.the-standing-hour'),

  R('war.the-charcoal-truce', 'involves', 'faction.pitchguard'),
  R('war.the-charcoal-truce', 'involves', 'faction.conduit-college'),
  R('war.the-charcoal-truce', 'affects', CITY.treeCity),
  R('war.the-charcoal-truce', 'affects', CITY.mediterranean),
  R('war.the-charcoal-truce', 'affects', 'machine.the-verdigris-hearth'),
  R('war.the-charcoal-truce', 'affects', 'recipe.stumpwood-distillation'),
  R('war.the-charcoal-truce', 'affects', 'route.the-timber-line'),
  R('war.the-charcoal-truce', 'related_to', 'war.the-licence-war', 'the same charcoal, sold two ways'),

  R('war.the-fifteen-leases', 'involves', 'faction.mooring-assize'),
  R('war.the-fifteen-leases', 'involves', 'npc.cesille-vaudry'),
  R('war.the-fifteen-leases', 'involves', 'npc.aubran-ferrieu'),
  R('war.the-fifteen-leases', 'involves', 'npc.perrine-orlaunt'),
  R('war.the-fifteen-leases', 'involves', 'faction.concord-of-weights', 'four fifths of the reserve is lent against these leases'),
  R('war.the-fifteen-leases', 'affects', CITY.skyCity),
  R('war.the-fifteen-leases', 'affects', 'district.sky-city-lattice-town'),
  R('war.the-fifteen-leases', 'affects', 'mechanic.mass-warrant'),
  R('war.the-fifteen-leases', 'affects', 'quest.the-sixteenth-mast'),
  R('war.the-fifteen-leases', 'follows', 'event.the-sixth-mast-collapse'),
]

/** Routes: what ground they cross, and who they join. */
const routeEdges: SeedRelation[] = [
  R('route.the-green-line', 'located_in', REGION.meridianCoast),
  R('route.the-green-line', 'located_in', REGION.ascentBasin),
  R('route.the-green-line', 'trades_with', CITY.mediterranean),
  R('route.the-green-line', 'trades_with', CITY.gildedAscent),
  R('route.the-green-line', 'controls', 'faction.conduit-college', 'licenses what may leave the port and under what seal'),

  R('route.the-salt-road', 'located_in', REGION.whitePans),
  R('route.the-salt-road', 'located_in', REGION.cinderWaste),
  R('route.the-salt-road', 'located_in', REGION.ashenSteppe),
  R('route.the-salt-road', 'located_in', REGION.ascentBasin),
  R('route.the-salt-road', 'trades_with', CITY.siftingCity),
  R('route.the-salt-road', 'trades_with', CITY.orath),
  R('route.the-salt-road', 'trades_with', CITY.arenaCity),
  R('route.the-salt-road', 'trades_with', CITY.gildedAscent),
  R('route.the-salt-road', 'related_to', 'faction.bondwrights-hall', 'an office at both ends'),

  R('route.the-gilded-circuit', 'located_in', REGION.ascentBasin),
  R('route.the-gilded-circuit', 'located_in', REGION.anvilShelf),
  R('route.the-gilded-circuit', 'located_in', REGION.aethericScar),
  R('route.the-gilded-circuit', 'located_in', REGION.mistfallCoast),
  R('route.the-gilded-circuit', 'trades_with', CITY.gildedAscent),
  R('route.the-gilded-circuit', 'trades_with', CITY.skyCity),
  R('route.the-gilded-circuit', 'trades_with', CITY.magicCity),
  R('route.the-gilded-circuit', 'trades_with', CITY.kethVeyra),
  R('route.the-gilded-circuit', 'related_to', 'faction.fetterhouse', 'seals everything that leaves the Scar lawfully'),

  R('route.the-weir-run', 'located_in', REGION.ascentBasin),
  R('route.the-weir-run', 'located_in', REGION.theDrown),
  R('route.the-weir-run', 'trades_with', CITY.gildedAscent),
  R('route.the-weir-run', 'trades_with', CITY.blackWeir),
  R('route.the-weir-run', 'trades_with', CITY.floatingSwamp),
  R('route.the-weir-run', 'controls', 'faction.iron-sluice-company', 'by charter and by gate'),

  R('route.the-timber-line', 'located_in', REGION.greatwood),
  R('route.the-timber-line', 'located_in', REGION.hollowKarst),
  R('route.the-timber-line', 'located_in', REGION.ascentBasin),
  R('route.the-timber-line', 'trades_with', CITY.treeCity),
  R('route.the-timber-line', 'trades_with', CITY.oruvai),
  R('route.the-timber-line', 'trades_with', CITY.caveAgrarian),
  R('route.the-timber-line', 'trades_with', CITY.gildedAscent),
  R('route.the-timber-line', 'controls', 'faction.pitchguard', 'every wagon carries a manifest'),

  R('route.the-lift-road', 'located_in', REGION.ascentBasin),
  R('route.the-lift-road', 'located_in', REGION.anvilShelf),
  R('route.the-lift-road', 'trades_with', CITY.gildedAscent),
  R('route.the-lift-road', 'trades_with', CITY.skyCity),
  R('route.the-lift-road', 'controls', 'faction.mooring-assize', 'prices the lift and licenses the masts'),
  R('route.the-lift-road', 'related_to', 'mechanic.mass-warrant'),

  R('route.the-long-water', 'located_in', REGION.ironback),
  R('route.the-long-water', 'located_in', REGION.hollowKarst),
  R('route.the-long-water', 'located_in', REGION.anvilShelf),
  R('route.the-long-water', 'located_in', REGION.ascentBasin),
  R('route.the-long-water', 'located_in', REGION.theDrown),
  R('route.the-long-water', 'trades_with', CITY.gildedAscent),
  R('route.the-long-water', 'trades_with', CITY.blackWeir),
  R('route.the-long-water', 'trades_with', CITY.floatingSwamp),
  R('route.the-long-water', 'related_to', 'district.gilded-ascent-confluence-wharves', 'the fork-head scales'),

  R('route.the-southern-reach', 'located_in', REGION.meridianGulf),
  R('route.the-southern-reach', 'located_in', REGION.easternDeep),
  R('route.the-southern-reach', 'located_in', REGION.mistfallCoast),
  R('route.the-southern-reach', 'trades_with', CITY.mediterranean),
  R('route.the-southern-reach', 'trades_with', CITY.floatingSwamp),
  R('route.the-southern-reach', 'trades_with', CITY.kethVeyra),
  R('route.the-southern-reach', 'related_to', 'landmark.the-tide-orrery', 'the tables the whole lane is sailed on'),
  R('route.the-southern-reach', 'related_to', 'quest.four-minutes-fast'),

  R('route.the-root-way', 'located_in', REGION.greatwood),
  R('route.the-root-way', 'located_in', REGION.hollowKarst),
  R('route.the-root-way', 'smuggles_with', CITY.treeCity, 'unlicensed cut, past the felling manifest', true),
  R('route.the-root-way', 'smuggles_with', CITY.caveAgrarian, 'cudmother starters out of unlisted galleries', true),
  R('route.the-root-way', 'smuggles_with', CITY.gildedAscent, 'onto the Karst Fork above the fork-head scale', true),
  R('route.the-root-way', 'related_to', 'faction.low-tally'),

  R('route.the-thermal-drop', 'located_in', REGION.anvilShelf),
  R('route.the-thermal-drop', 'located_in', REGION.theDrown),
  R('route.the-thermal-drop', 'smuggles_with', CITY.skyCity, 'by ballast descent on unlogged lines', true),
  R('route.the-thermal-drop', 'smuggles_with', CITY.blackWeir, 'east across the shelf tail, no manifest', true),
  R('route.the-thermal-drop', 'related_to', 'npc.perrine-orlaunt'),
  R('route.the-thermal-drop', 'related_to', 'mechanic.mass-warrant', 'the declaration this route exists to avoid'),

  R('route.the-underbrace', 'located_in', REGION.theDrown),
  R('route.the-underbrace', 'located_in', REGION.whitePans),
  R('route.the-underbrace', 'located_in', REGION.cinderWaste),
  R('route.the-underbrace', 'smuggles_with', CITY.floatingSwamp, 'out through the southern mats', true),
  R('route.the-underbrace', 'smuggles_with', CITY.orath, 'in from the east, nothing asked at the tank yard', true),
  R('route.the-underbrace', 'related_to', 'mechanic.the-sluice-book', 'the gate-hour this route exists to avoid'),

  R('route.the-dry-crossing', 'located_in', REGION.whitePans),
  R('route.the-dry-crossing', 'located_in', REGION.ashenSteppe),
  R('route.the-dry-crossing', 'smuggles_with', CITY.siftingCity, 'ungraded sift, past the assay towers', true),
  R('route.the-dry-crossing', 'smuggles_with', CITY.arenaCity, 'and bonded people the other way, unregistered', true),
  R('route.the-dry-crossing', 'related_to', 'faction.pale-assay', 'whose own members are the principal buyers'),
  R('route.the-dry-crossing', 'related_to', 'quest.pan-fever'),
]

export const relations: SeedRelation[] = [...chain, ...causal, ...eventAffects, ...warEdges, ...routeEdges]
