/**
 * The bestiary.
 *
 * Sixteen organisms rather than sixteen monsters. Most of these are harvested
 * far more often than they are fought, and several of them are infrastructure:
 * the thing a city floats on, the thing that eats its wards, the thing whose
 * guano is a third of its nitrogen. Threat ratings describe what the animal
 * does to a person standing in front of it, which is usually nothing, and the
 * entries carry the real cost somewhere else.
 *
 * Habitat places each creature on the world map, so the first `habitat` ref is
 * always the region it is filed under.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------------------- */
  /* The Anvil Shelf                                                   */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.loftwrack',
    type: 'creature',
    name: 'Loftwrack',
    status: 'draft',
    summary: 'Colonial gasbag drifter that grazes the Anvil Shelf thermal in rafts a hundred paces wide, and is culled for lift.',
    tags: ['colonial', 'harvested', 'anvil-shelf', 'sky-city'],
    fields: {
      overview:
        'A loftwrack is not an animal but a raft of them: forty to a hundred paces of linked zooids riding the permanent thermal above [[region.anvil-shelf|the Anvil Shelf]], trailing filter nets sixty paces down into the rising air. From the mooring ring they look like weed lying on still water, which is where the name came from.\n\n' +
        '[[city.sky-city|The Sky City]] rides the same column of air and its relationship with them is entirely extractive. Rafts are taken for lift-bladder membrane, for the gas the bladders hold, and for the strut lattice that keeps the colony from folding, which is scarfed and sold on the ground as low-grade [[material.sparbone|sparbone]] and is not sparbone. A culled raft comes down on whatever is beneath it, which has twice been [[district.sky-city-shelf-foot|Shelf-Foot]].',
      habitat: [REGION.anvilShelf],
      threat: 'Harmless',
      size: 'Rafts of 40 to 100 paces; individual zooids about the size of a fist',
      biology:
        'Three zooid forms on one shared vascular mat. Bladder zooids ferment collected organic dust in a sealed sac and hold the gas that results, which is roughly a seventh the weight of air and burns readily. Feeder zooids hang below on filaments and comb aeroplankton out of the updraught. Strut zooids die young and calcify where they stand, laying down the hollow strutted lattice that stops the raft folding in a shear.\n\n' +
        'No zooid survives detached. A raft cut in half heals into two rafts within a season. A raft cut into eighths rots.',
      lifecycle: TBD(
        'Nobody has recorded a raft beginning. Every known raft is a division of an older one, which either means the founding stage happens somewhere off the shelf, or it stopped happening and the population is a closed set of clones running down while the Sky City takes eleven a year.',
      ),
      behaviour:
        'Passive, and on a clock. Rafts climb through the morning as the shelf heats, top out near midday above the reach of a lance line, and settle through the evening. Before rain they sit low and heavy, which is when they are taken. Rafts drift apart rather than together; two that touch tangle nets and both feed worse for a month, and neither can do anything about it.',
      diet: 'Aeroplankton: insects, pollen, seed down and dust lifted off the shelf by the updraught',
      attacks: [
        'None. A raft cannot turn, pursue or close its nets faster than a person can walk out from under it',
        'The fall. Four tonnes of wet mat coming down at walking pace onto a district with nowhere to go',
        'Bladder gas takes fire off a lamp and runs the length of the shared mat, with the cull crew standing on it',
      ],
      weaknesses: [
        'A punctured bladder cannot be resealed; the colony sheds height across the whole mat inside an hour',
        'Lift falls with humidity, so a raft before rain is already half taken',
        'Fire, comprehensively',
      ],
      tactics:
        'Not a fight. A cull is rigging work at height: two mast crews run a line into the mat, spike the windward bladders with [[item.mooring-lance|mooring lances]] and walk the raft down under control, or fail to and drop it. The scene worth playing is the argument about where it comes down, because the crew is paid on tonnage landed and the district underneath is not consulted.',
      yields: ['material.sparbone'],
      harvestNotes:
        'Membrane is stripped wet and dried on frames; a good raft gives enough for about eleven envelopes. Gas is bled into gut bladders at the mast and is worth more than the membrane in winter. The struts are the problem. Scarfed and graded they pass for low-grade [[material.sparbone|sparbone]], look identical to the real article and fail at roughly a third of the rated load, and every lattice collapse of the last decade has had a merchant somewhere insisting the stock was proofed.\n\n' +
        'Crews are paid on landed tonnage under [[mechanic.mass-warrant|the Mass Warrant]], and a bladder that has been aloft since morning weighs differently by evening. Both sides of that gap are worked.',
      devNotes:
        PROPOSAL(
          'The colonial structure, the three zooid forms, the burning gas and the strut-for-sparbone fraud are all proposed. The brief established only that the Sky City rides a permanent thermal.',
        ) +
        '\n\nThe soarers that yield genuine [[material.sparbone|sparbone]] are a separate animal on the same thermal and are deliberately not written here; the materials module keeps that question open and this entry does not close it.\n\n' +
        'Design use: a resource whose body count lands on somebody else. Nothing in a loftwrack cull is dangerous to the people profiting from it, which makes it a Sky City politics problem rather than a monster.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Hollow Karst                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.mirror-swift',
    type: 'creature',
    name: 'Mirror swift',
    status: 'draft',
    summary: 'Cave swift that flies the Hollow Karst mirror-ducts by ear and builds its nest out of hardened saliva.',
    tags: ['bird', 'hollow-karst', 'quota', 'colonial'],
    fields: {
      overview:
        'Thousands of them nest in the shafts and duct heads of [[landmark.sunwell-shaft|the Sunwell Shaft]], flying ducts that were cut for light and are used by the birds as caves. They are the only animal in [[city.cave-agrarian-city|the Cave Agrarian City]] that is worth two separate arguments a year.\n\n' +
        'The nests are a quota\'d luxury nobody in the galleries eats. The guano is a third of the city\'s nitrogen, and therefore a third of the harvest. That is why nest-poaching is prosecuted as theft from the harvest rather than theft from a bird, and why the punishment is written against a crop yield two seasons out.',
      habitat: [REGION.hollowKarst],
      threat: 'Harmless',
      size: 'A hand span across the wings; nests the size of a cupped palm',
      biology:
        'Wings too long to fold, feet that hook and cannot walk, and eyes that are perfectly ordinary and nearly useless below the light line. Navigation is a clicking call in the low thousands of pulses a minute, which is why an occupied duct sounds like sand being poured. The salivary glands double in the six weeks before nesting and empty in nine days.',
      lifecycle:
        'A pair build in nine days, lay two, and fledge in about six weeks. Take the nest and they build a second inside a fortnight, thinner and streaked with blood because the glands are already spent. Take the second and the pair raise nothing that season, and often do not come back to that duct at all. [[faction.mirror-assembly|The Mirror Assembly]] writes its quota around the first take and enforces it around the second, badly.',
      behaviour:
        'Colonial and punctual. The colony leaves at first light through the shaft head in a column the upper terraces still set their morning by, and returns in the last of the dusk. Between times they are absent, which is the only reason the ducts can be swept. They roost on duct plate and foul it, so every polishing round is a sweeping round first.',
      diet: 'Insects taken on the wing above the karst at dawn and dusk; nothing at all is caught underground',
      attacks: ['None. A cornered swift bites at a finger and cannot break the skin'],
      weaknesses: [
        'A lamp carried into a nesting duct empties it for the season',
        'They cannot lift from a flat floor, so a grounded bird is a dead bird',
        'A hard frost on the surface kills a whole colony in a night while it is out feeding',
      ],
      tactics:
        'The danger in a nest take is the climb and nothing else: forty metres of spliced [[material.glasscane|glasscane]] pole ladder up a duct with no belay, over a working gallery. Takers are chosen for weight, which means they are young, and they are paid by the nest. The other hazard is enforcement, since an unlicensed take is tried as theft from the harvest and sentenced in mirror-hours the family cannot pay.',
      yields: TBD(
        'Does the swift nest get a food entry of its own, or does it stay an export the Hollow Karst sells and nobody local eats? The second is more interesting and makes the quota a pure revenue argument.',
      ),
      harvestNotes:
        'Two crops and only one of them is counted. Nests come down in the fortnight before laying, are soaked, picked clean of feather and carried up the Ascent as a luxury. Guano is the crop that matters: barrowed off the roost floors twice a year, it charges the beds under every [[food.gallery-cap|gallery cap]] flush, and a soured [[material.cudmother|cudmother]] line is re-seeded from it. A duct emptied by poachers costs the city a bed yield two seasons later, by which time nobody connects the two.',
      devNotes:
        PROPOSAL(
          'Echolocation, the saliva nest, the blood second nest and the guano share of the nitrogen budget are proposed. The brief established mirror-ducted sunlight and nothing about what lives in the ducts.',
        ) +
        '\n\nDesign use: a renewable resource with a two-season feedback delay, which is exactly the shape [[mechanic.the-mirror-rota|the Mirror Rota]] needs to make allocation politics bite. A gallery that poaches this year starves a different gallery the year after next.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Greatwood                                                     */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.bolewright-wasp',
    type: 'creature',
    name: 'Bolewright wasp',
    status: 'draft',
    summary: 'Greatwood gall wasp whose larvae hollow chambers in living heartwood; the galls weep resin worth more than the timber.',
    tags: ['insect', 'greatwood', 'blight', 'parasite'],
    fields: {
      overview:
        'The insect the Greatwood cannot burn its way out of. A female drills a living trunk, places an egg and a fungal culture together under the bark, and four years later there is a void the length of a rope span running with the grain. A bole that sounds hollow is condemned and fired where it stands, which is the mechanism behind every felling order [[city.tree-city|the Tree City]] has ever posted.\n\n' +
        'Six of [[deposit.standing-fifty|the Standing Fifty]] have galleries opened in the heartwood and are quietly not counted as fellable any more. Nobody has said that in council yet. When it is said, the number is forty-four, and three factions will have been voting on a fiction.',
      habitat: [REGION.greatwood],
      threat: 'Dangerous',
      size: 'Adults about a thumb joint; a mature gall the size of a barrel',
      biology:
        'The female carries a fungal culture in a pouch behind the ovipositor and injects it with the egg. The fungus digests lignin. The larva eats the fungus. That is the entire trick, and it is why a colossal bole can be hollowed by an insect that cannot chew wood.\n\n' +
        'Chambers run with the grain and interconnect as the brood grows, so a mature gallery is one continuous void rather than a nest of holes. The trunk stays alive and in leaf throughout, which is the cruel part: a condemned bole looks exactly like a healthy one from the ground and for two years from the galleries.',
      lifecycle:
        'Four years inside the trunk, then a synchronised emergence in the summer that follows a mast year, because the sugar flush is the cue. The Tree City\'s famine calendar and its infestation calendar are therefore the same calendar, and it is public: [[food.bole-mast|bole mast]] years are counted by everyone and the emergence is not counted by anyone.',
      behaviour:
        'Females drum a trunk before laying and prefer wood already under stress. Lightning scar, cut root, and above all pitch tap. [[machine.the-pitchworks|The Pitchworks]] tap stumps across a mile of downwind ground, and tapped ground draws laying females, so the city\'s most profitable industry seeds its own blight and has done for four generations.',
      diet: 'Adults take gall weep and sap; larvae eat the fungal garden their mother sowed, never the wood',
      attacks: [
        'Ovipositor strike. Not a sting but a drill, placing an egg and a fungal culture under the hide',
        'Mass emergence, forty to sixty adults out of one chamber at once, which is how a stock pen becomes a slow disaster',
      ],
      weaknesses: [
        'Pitch smoke breaks up a laying flight, which is why the yards burn green wood all summer',
        'The fungal culture dies at scalding heat, so a scalded gall is a dead gall and a scalded trunk is a dead trunk',
        'Emergence is synchronised, so one cold week in the wrong summer costs a generation',
      ],
      tactics:
        'They defend nothing, which is what makes them hard to fight and easy to write. The work is survey: sounding trunks with a mallet, reading gall weep, and deciding whether a quarter is condemned, which is the whole of [[quest.the-felling-order|The Felling Order]]. A brood placed in an animal is dealt with surgically and slowly. A brood placed in a person is dealt with the same way and worse; the Marshalcy keeps a pension roll for the survivors and does not publish its length.',
      yields: TBD(
        'Gall resin is traded as glue, varnish and pitch stock and has no material entry. Does it become one, or is it graded into the Pitchworks resin stock so that the blight is quietly inside the wood chain rather than opposed to it?',
      ),
      harvestNotes:
        'Galls are tapped rather than cut: a spiral score into the swelling and a cup beneath it, worked for two seasons before anyone opens the chamber. Opening it is the paid risk. It may be empty, it may hold grubs worth rendering for fat, or it may be six days from emergence. Licensed tappers work in pairs on the Marshalcy roll. Unlicensed ones work the outwood alongside deserters like [[npc.vetla-torvik|Vetla Torvik]] and are prosecuted under the same statute as man-trapping.',
      devNotes:
        PROPOSAL(
          'The fungal garden, the four-year cycle, the mast-year emergence and the pitch-tap feedback loop are proposed. The brief established a militarised city in the Greatwood and nothing about why it is failing.',
        ) +
        '\n\nThe load-bearing invention is the fungus. It makes the wasp an agricultural problem rather than a beast, it makes heart rot a supply-chain event for every furnace that burns Greatwood charcoal, and it means the Tree City is losing to something no garrison can be pointed at.',
    },
  }),

  E({
    id: 'creature.sentinel-tick',
    type: 'creature',
    name: 'Sentinel tick',
    status: 'draft',
    summary: 'Blood symbiont worn behind the ear by Greatwood scouts; it stiffens at an unfamiliar body and costs the wearer years.',
    tags: ['symbiont', 'greatwood', 'parasite', 'tree-city'],
    fields: {
      overview:
        'Not a creature you meet. A sentinel tick is fitted once, in [[district.tree-city-crown-galleries|the Crown Galleries]] scout house, and worn behind the ear until it or the wearer dies. Seated, it reads the skin volatiles of anyone within a few paces and clamps at a body it does not know, which the host feels as a pinch under the jaw a second or two before they would otherwise have looked up.\n\n' +
        'It is the closest thing this world has to a proximity alarm and it is paid for in blood and in years. [[faction.pitchguard|The Pitchguard]] issues them, numbers them and does not put the cost in writing anywhere a recruit will read it.',
      habitat: [REGION.greatwood],
      threat: 'Harmless',
      size: 'A barley grain empty, a thumbnail full',
      biology:
        'A hard tick with a chemoreceptive plate under the scutum and an unusually large salivary reservoir. It cannot tell hostile from unfamiliar, so a scout standing in a market is a scout being pinched all day and learning to ignore it, which is the failure mode that gets people killed.\n\n' +
        'The anticoagulant is the expensive part. It holds a small wound open indefinitely, and a decade of that is an anaemia the Greatwood has no name for and treats as ordinary tiredness.',
      lifecycle:
        'Larvae must seat on a host within about a day of hatching and imprint over nine days, after which the host\'s chemistry is the only one they will ever read as safe. Fourteen to eighteen months seated, then they drop off and die. A tick that outlives its host will not take a second one, which is why the scout house breeds continuously and why a fitted tick cannot be resold, inherited or captured.',
      behaviour: 'Dormant. It takes about a spoon a week and does nothing else at all until it clamps.',
      diet: 'Its host',
      attacks: ['None to anyone except the person wearing it'],
      weaknesses: [
        'Smoke, cold and a full stomach all blunt it; a tick fed within the hour misses people',
        'It reads nothing downwind beyond a few paces, and nothing at all through running water',
        'Familiarity. Keep a stranger close enough for long enough and the tick stops calling them a stranger, which is a documented way of walking someone into a gallery',
      ],
      tactics:
        'A design tool, not an opponent. Treat a seated tick as a passive detection roll against [[skill.quiet-ground|Quiet Ground]] that fails automatically against anyone the host has spent a day beside, is useless in a crowd, and costs the host years rather than minutes. [[npc.vetla-torvik|Vetla Torvik]] still wears hers outside the palisade, which tells you what a deserter thinks the trade is worth.',
      yields: TBD(
        'Should a seated tick exist as a tradeable item, or stay a fitting the scout house performs and records? Keeping it a fitting makes it a political asset and a defection risk; making it an item makes it contraband and a smuggling line.',
      ),
      harvestNotes:
        'Bred rather than gathered. Hides in the scout-house lofts, hatch trays, and a nine-day imprint the fitter has to sit through with the recruit, which is where the scout house does most of its actual recruiting. A small trade in unseated larvae exists and stays small, because a larva out of the tray for more than a day is worthless. Removing a seated tick is simple, immediate and permanent, and the Pitchguard treats an empty numbered fitting as desertion whatever the wearer says happened.',
      devNotes:
        PROPOSAL('The symbiosis, the nine-day imprint, the host cost and the Pitchguard fitting regime are proposed.') +
        '\n\nDesign use: a detection mechanic with a human price and an honest failure mode. It flags strangers, not enemies, so it is worse than useless in a city and decisive on a bridge at night. The scout who has worn one for eleven years is visibly ill and will not give it up.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Aetheric Scar                                                 */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.chalk-louse',
    type: 'creature',
    name: 'Chalk louse',
    status: 'draft',
    summary: 'Colonial insect of the Aetheric Scar that eats ward chalk and lime binder, and voids a warded quarter overnight.',
    tags: ['insect', 'colonial', 'aetheric-scar', 'blight'],
    fields: {
      overview:
        'The quiet catastrophe of [[city.magic-city|the Magic City]] and the least dramatic thing in the bestiary. A grain-sized insect in colonies of tens of thousands that eats cured [[material.ward-chalk|ward chalk]] and lime binder from the substrate outward, leaving the drawn face intact to look at and dead to work.\n\n' +
        'Nothing is visible until the load moves. An infestation reads as a maintenance failure and is not one, which is why the chalk stores on [[district.magic-city-chalk-row|Chalk Row]] are opened with a knife every single day, and why that is the least popular and most important job in the district.',
      habitat: [REGION.aethericScar],
      threat: 'Nuisance',
      size: 'A grain of barley; colonies of tens of thousands in a single cake store',
      biology:
        'Colonial and mineral-feeding. Gut symbionts strip calcium out of cured chalk and lay it back down as a mineralised carapace, which is the proposed reason [[material.quenchspar|quenchspar]] sits in violet seams where old colonies died. Quenchspar is massed carapace, and it drinks aetheric charge for the same reason a living louse will sit on a working line rather than a dead one.\n\n' +
        'Wards under load run fractionally warm. The colony prefers warm chalk. The wards most likely to be eaten are therefore the ones doing the most work, which is exactly backwards from where anyone inspects first.',
      lifecycle:
        'Three castes, one queen to a gallery, and a generation every eleven days on a good store. A cake store a fortnight in can be hollow. Swarming is annual and follows the first warm night after the winter still, when the whole colony leaves at once; the chalk row recuts its own wards the following week whether they need it or not, which is the only honest holiday the district keeps.',
      behaviour:
        'They work from behind and they work quietly. A colony entering a wall will follow the lime course rather than the chalk line and reach the drawing last, so the face fails after the wall has already gone. They avoid open flame, standing water and nothing else.',
      diet: 'Cured ward chalk, lime binder, limewash, mortar and bone ash',
      attacks: ['None. They have no interest in anything alive and no equipment for it'],
      weaknesses: [
        'Genuine damp. A store kept wet spoils differently and is not eaten, which is why half the chalk trade argues about roofs',
        'Cold below the Scar\'s winter still stops a generation dead',
        'Ground carapace of their own dead, dusted through a store, which is the only working repellent and is exactly what [[faction.fetterhouse|the Fetterhouse]] sells',
      ],
      tactics:
        'Nothing here is a fight. The scene is an inspection: a cake store, a knife, a fortnight of consumption to find, and a slab load somewhere in [[district.magic-city-under-slabs|Under-Slabs]] that comes down if the answer is wrong. [[quest.the-chalk-that-lies|The Chalk That Lies]] is the same problem approached from the supply end, and a louse infestation is the honest explanation that a fraud can hide behind.',
      yields: ['material.quenchspar'],
      harvestNotes:
        'Nobody farms them and several people would like to. Dead colonies are quarried as [[material.quenchspar|quenchspar]] in [[deposit.cold-quarter|the Cold Quarter]], cut cold and sawn wet because a saturated block fails all at once and takes the room with it. Live colonies are burned out of a store and the ash is milled into the anti-magic powders the Fetterhouse would rather nobody else could buy.\n\n' +
        'A sealed jar of live lice is worth several times the chalk it will destroy. Carrying one inside the ward line is charged as sabotage, and proving intent is nearly impossible, which is the whole appeal.',
      devNotes:
        PROPOSAL(
          'The colony structure, the mineralised carapace, the quenchspar connection and the preference for loaded wards are proposed. The brief established a regulated magical anomaly and nothing that lives on it.',
        ) +
        '\n\nThreat is deliberately Nuisance. The louse cannot hurt a person and can drop a district, and that gap is the design: it converts magical protection into a procurement and inspection problem, which is what [[mechanic.ward-load|Ward Load]] needs in order to be a mechanic rather than a colour.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Drown                                                         */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.blackrun-lamprey',
    type: 'creature',
    name: 'Blackrun lamprey',
    status: 'draft',
    summary: 'Jawless parasite of the Drown that runs upriver in one three-week mass each spring, and takes draught animals at the fords.',
    tags: ['parasite', 'the-drown', 'seasonal', 'fishery'],
    fields: {
      overview:
        'Four years at sea in [[region.eastern-deep|the Eastern Deep]] rasping at whatever will hold still, then three weeks in fresh water and dead. The run is the delta\'s one glut and the closest thing it has to a festival, and it goes up through [[landmark.the-weir-gates|the Weir Gates]] in a single mass that the gate crews can measure by the smell of the water.\n\n' +
        'Whoever holds the sluices holds the run. That is the entire political content of the animal, and it is why [[spell.calling-the-run|Calling the Run]] is a hanging matter at the Weir and only at the Weir.',
      habitat: [REGION.theDrown, REGION.easternDeep],
      threat: 'Dangerous',
      size: 'A forearm to a leg; the largest landed was over five feet',
      biology:
        'No jaw and no bone. A rasping disc with concentric tooth rings takes a plug of flesh and holds the wound open with an anticoagulant strong enough that surgeons buy the heads. On the run the animal changes entirely: it stops feeding, dissolves its own gut, and lives on stored oil, which is why a running fish is worth catching and the same fish a month later is worth nothing at all.',
      lifecycle:
        'Four years in salt, three weeks in fresh, then they spawn on the gravel above the tide and die on it. The larvae stay buried in silt for five to seven years, filter-feeding, blind and immobile, before they go down to the sea.\n\n' +
        'That larval bed is the thing nobody owns, nobody can see and nobody protects, and it lies directly under the channels the Drown dredges. Dredge it out and there is no run in seven years. Nobody at the Weir will have that argument in public.',
      behaviour:
        'The run reads water, not calendar: temperature, flow, and the smell of larval silt upstream. They find any gap in a gate line and pile against a closed one until the water above them is solid fish. Two bays at the Weir are worked on a pattern the fish read better than the crews do.',
      diet: 'Blood and flesh off large-bodied hosts at sea; nothing whatsoever on the run',
      attacks: [
        'Attachment. One lamprey on a swimming animal is nothing; forty on a draught ox at a ford is a drowning',
        'They take the animal rather than the rider, and the animal takes the rider down with it',
      ],
      weaknesses: [
        'A running fish will not turn back, so a gate line is a slaughter whenever somebody wants it to be',
        'They cannot cross a dry sill; a bay shut for six hours breaks the run against the stone',
        'The larval beds, which are seven years of the fishery lying under a dredge nobody has costed',
      ],
      tactics:
        'Not an encounter so much as a fortnight of water politics. Fords during the run need a plan and still lose animals. The scenes worth playing are at the gates, where the catch, the toll and [[spell.calling-the-run|Calling the Run]] all arrive in the same week, and where the hanging is done on the apron in front of the people who ate.',
      yields: TBD(
        'Smoked lamprey is the delta\'s one luxury export and lamprey oil is its winter light, and neither is in the trade list. Do they become food and material entries, or is the point that the glut cannot be moved and has to be eaten where it is caught?',
      ),
      harvestNotes:
        'Worked directly off the gates with wicker traps and a hooked pole, smoked on the apron in the same fortnight, because nothing about the animal keeps. A good run lights half [[city.black-weir|the Weir]] for a winter and feeds [[city.floating-swamp-settlement|the raft settlement]] for three weeks. The oil is rendered from run fat, keeps badly and smells of the river until midsummer. Below the tail the fish take draught animals at the fords, which the Weir declines to price and the delta pays for anyway.',
      devNotes:
        PROPOSAL(
          'The four-year sea phase, the dissolved gut, the seven-year larval bed and the dredging conflict are proposed. The Black Weir remains a name-only canon and nothing here invents its history.',
        ) +
        '\n\nDesign use: a renewable that can be destroyed invisibly. The larval bed gives a tragedy-of-the-commons hook with a seven-year fuse, which is longer than any faction at the Weir plans in, and pairs directly with [[mechanic.the-sluice-book|the Sluice Book]].',
    },
  }),

  E({
    id: 'creature.raftbloom',
    type: 'creature',
    name: 'Raftbloom',
    status: 'draft',
    summary: 'Colonial float-mat of the Drown, part plant and part animal, buoyant enough to moor a house to until it rots.',
    tags: ['colonial', 'the-drown', 'infrastructure', 'symbiosis'],
    fields: {
      overview:
        'Three hundred and eighty numbered lots of [[city.floating-swamp-settlement|the floating settlement]] are moored to it, built on it, or made of it. A raftbloom mat is a colony of budded polyps carrying photosynthetic symbionts in its upper layer, growing outward at the rim and dying from the middle, and it will hold a house for about two years and then will not.\n\n' +
        'Everything else in the delta follows from that. The re-moor exists because mats rot, the poorest lots ride the oldest mat, and marsh fever comes up out of the floor of whoever is standing on the wrong year.',
      habitat: [REGION.theDrown],
      threat: 'Nuisance',
      size: 'Mats from a table top to two hundred paces; a foot of living tissue over a metre of dead',
      biology:
        'Polyps budded in a matrix of their own cellulose, the upper layer stocked with photosynthetic symbionts that pay their rent in sugar, the lower layer doing nothing but respiring until it stops. Buoyancy is gas trapped in dead tissue rather than in living cells, so a mat is at its most buoyant just after the layer beneath it dies, and stays buoyant for exactly as long as the rot takes.\n\n' +
        'A cut fragment re-roots. This is the only reason the settlement can rebuild itself.',
      lifecycle:
        'The rim advances about a pace a month in warm water. The centre goes anoxic, blackens, gasses off and sinks between one week and the next, usually without warning and occasionally under a family. The working assumption in the delta is that no mat is safe in its second year, and no lot-holder in the tail lots can afford to believe it.',
      behaviour:
        'It does not behave. It drifts, grows toward light, folds away from current, and binds to anything left in the water for a fortnight, including hulls, cages, mooring lines and the dead.',
      diet: 'Sunlight through the symbionts, plus whatever dies on the mat and sinks into it',
      attacks: ['None. What kills people is standing on the wrong year of it'],
      weaknesses: [
        'Salt. One spring tide up the delta browns a mat in a day',
        'Current; a mat torn out of slack water folds and goes under in minutes',
        'Its own rot, which is not avoidable and is only ever early or late',
      ],
      tactics:
        'Reading mat is a skill and a class marker at once. [[skill.marsh-footing|Marsh Footing]] is the difference between a lot-holder and a visitor: test before weighting, watch the rim colour, never cross a dark centre, and never trust a mat somebody else has just walked. The recurring hazard in the Drown is not an animal, it is a floor.',
      yields: ['material.mire-bloom'],
      harvestNotes:
        'Living rim is cut in strips and lashed under new pontoon; a lot rebuilt in spring floats two seasons, which is what [[mechanic.the-remoor|the Re-Moor]] is actually for and why the draw order decides who drowns slowly. Under a living mat, iron precipitates faster: [[deposit.bloom-cuts|the Bloom Cuts]] refill quickest where the mat is thickest, so pontoon cutters and [[material.mire-bloom|bloom]] cutters want the same water and have knives.\n\n' +
        'The dead mat is the other crop and the other problem. Rotting mud is the gas ground for [[machine.the-fen-damp-taps|the fen-damp taps]] and the fever ground for marsh fever, and it is the same ground.',
      devNotes:
        PROPOSAL(
          'The colonial structure, the symbionts, the buoyancy-from-rot mechanism and the two-year clock are proposed. The brief established a floating swamp settlement and nothing about what floats it.',
        ) +
        '\n\nWhat carries marsh fever is deliberately unresolved here: rot alone, or an organism living in the rot. [[npc.anthimos-vellani|Anthimos Vellani]] is holding three cases of it a long way west of the delta, so whoever answers the question is also deciding how far the fever can travel and whether [[item.fever-clay|fever clay]] is medicine or superstition.\n\n' +
        'Design use: the settlement\'s floor is on a decay clock, which turns a city map into a maintenance schedule.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The White Pans                                                    */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.salt-mason',
    type: 'creature',
    name: 'Salt mason',
    status: 'draft',
    summary: 'Tube worm of the White Pans that cements brine crust into towers and concentrates metal salts as it builds.',
    tags: ['worm', 'colonial', 'white-pans', 'chemosynthetic'],
    fields: {
      overview:
        'The reason [[city.sifting-city|the Sifting City]] sifts where it does, and the reason it keeps losing crews. Each worm builds a tube of cemented brine crust and pumps pan liquor through it, precipitating on the tube wall everything it cannot use. It cannot use the heavy metal fraction, so a colony is a slow machine for concentrating exactly what the towers are looking for.\n\n' +
        'A dead colony is the richest crust in the Pans. A live one gives way under a crew standing on it. Every experienced boss can tell one from the other by sound, and every season somebody cannot.',
      habitat: [REGION.whitePans],
      threat: 'Harmless',
      size: 'Worms a finger long; towers to three metres and colonies to half a hectare',
      biology:
        'Chemosynthetic, by way of gut bacteria that oxidise sulphur and iron compounds out of the liquor. The animal itself is almost nothing: a filter, a pump and a cement gland. What matters is the tube, which is laid down at about a finger a year and carries the metal fraction the worm has no way to excrete.\n\n' +
        'Larvae are free-swimming for roughly a week in standing liquor after the wet season, which is the only week of its life the animal moves. Everything after that is masonry.',
      lifecycle: TBD(
        'Colonies are found dead, never dying. Is there a fixed span, does the pan under them stop recharging, or does something kill them? The answer decides whether the White Pans could be re-seeded deliberately, which would turn the Sifting City from an extraction town into a farm and destroy the grading structure that holds it together.',
      ),
      behaviour:
        'Nothing visible. A live colony hums at a frequency a boss feels through a rake handle rather than hears, which is the single most valuable piece of knowledge in the Pans and cannot be written down, taught quickly, or proved to a company clerk.',
      diet: 'Sulphur and iron compounds in the pan liquor, worked by gut bacteria',
      attacks: ['None. The animal has no way to harm anything and does not need one'],
      weaknesses: [
        'Fresh water kills a colony in a day and cements the whole of it where it lies',
        'Once the pan stops recharging the colony is finished, and the crust it leaves is worth more than it ever was alive',
      ],
      tactics:
        'The hazard is the floor. Live crust gives as a sheet, four or five paces at once, into saturated liquor a metre deep that a person cannot swim in and cannot easily be pulled out of. Feeding a live crust down [[mechanic.the-sift-line|the sift line]] is a mass-casualty event and is also how the richest sift is found in the first place, which is the moral shape of the White Pans in a sentence.',
      yields: ['material.blackfall-sand', 'material.pan-nitre'],
      harvestNotes:
        'Dead colonies are raked and barrowed like any other crust and grade two cuts higher for the same labour. Live ones are staked, marked, and worked anyway when the price is up. Crews rake on eight-day rotations out from [[district.sifting-city-the-tower-line|the tower line]], in linen against the glare, on a water ration issued against debt.\n\n' +
        'Over centuries the wind has taken the light fraction off the collapsed towers and left the heavy, which is what [[deposit.blackfall-drifts|the Blackfall Drifts]] are: several thousand years of dead worms sorted by weight. [[npc.sahat-belek|Sahat Belek]] can read a dead colony at a hundred paces, which is a living and, out in the far white, an eight-day one.',
      devNotes:
        PROPOSAL(
          'Chemosynthesis, the metal-concentrating tube, the audible difference between live and dead crust and the origin of the Blackfall Drifts are proposed. The brief established a desert city built on mineral sifting.',
        ) +
        '\n\nDesign use: the reason the extraction economy exists is an organism, so the deposit map is a biology map. It also gives the Sifting City a hazard that is invisible, survivable-looking and entirely a function of how much the grade is paying that week.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Ashen Steppe                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.yokeback',
    type: 'creature',
    name: 'Yokeback',
    status: 'draft',
    summary: 'Steppe grazer that carries a shrunken parasitic mate fused to its flank for life; separate the pair and it goes mad.',
    tags: ['grazer', 'ashen-steppe', 'parasite', 'arena'],
    fields: {
      overview:
        'The staple animal of [[region.ashen-steppe|the Ashen Steppe]] and the pharmacy of [[city.arena-city|the Arena City]]. Every adult cow carries a male fused to her flank behind the shoulder, shrunken to the size of a forearm, blind, gutless and permanently attached. He takes blood. She takes a gland secretion that keeps her placid enough to be driven by two people and a drum.\n\n' +
        'Cut him off and the supply stops. What follows is four days of undirected violence that the under-stables of [[district.arena-city-the-under-stands|the Under-Stands]] sell by the animal, and a gland that has to reach a still within the quarter hour.',
      habitat: [REGION.ashenSteppe],
      threat: 'Dangerous',
      size: 'Ox-sized cows; the fused male about the length of a forearm',
      biology:
        'Sexual parasitism carried to its conclusion. A juvenile male has about ten days of free life to find a cow and attach, and roughly one in forty manages it; the rest die on the steppe and are the reason the crows follow the herds in spring. On attachment the tissues fuse, his eyes and gut are reabsorbed, and he becomes a blood-fed gland with a heartbeat.\n\n' +
        'The secretion he supplies is not affection, it is chemistry. It suppresses the cow\'s flight response, which is why a species built like a bull is driven by children.',
      lifecycle:
        'Cows calve every second year and carry the same male for life, twenty years or so. A cow that loses her male naturally, to injury or rot, goes through the same frenzy as a cut one and dies of it within a week. Herds are therefore counted in pairs, and a herd\'s value is written down the moment anyone touches a flank.',
      behaviour:
        'Placid to the point of stupidity in a settled herd, and impossible alone. A single yokeback is a frightened yokeback and a frightened yokeback runs through fences, carts and people. Drovers work them with fire and drum, never with dogs.',
      diet: 'Steppe grass, ash-fall scrub, and salt licked off the pan margins',
      attacks: [
        'A shoulder charge that does not stop at the first thing it meets',
        'Frenzy. A separated cow is a four-day event that does not distinguish between the crowd, the handler and the wall',
      ],
      weaknesses: [
        'The pair is the animal. A separated cow dies inside a week whatever anyone does, and everybody selling the frenzy knows it',
        'Herd creatures: cut one out and it is already losing',
        'Fire and drums turn a herd reliably, which is the only reason they can be driven at all',
      ],
      tactics:
        'The fight, when there is one, is a panicking animal in an enclosed space, and it is a fight the animal loses over four days in front of a paying crowd. Write it as what it is. The profitable end is the gland: [[npc.sukhet-daral|Sukhet Daral]] buys separated animals by the head and sells the frenzy as a card, and [[spell.yokebreak-draught|yokebreak draught]] is rendered from what is cut off them.',
      yields: TBD(
        'Yokeback meat, hide and milk feed the whole steppe and none of it is in the trade list. Does the herd economy get a food entry of its own, or is it folded in behind steppe sour so that the animal reads only as an arena commodity?',
      ),
      harvestNotes:
        'The gland must be cut from the male within about a quarter of an hour of separation or it is worth nothing, which is why separations happen under the stands and never on the steppe. The rest of the animal is worked the ordinary way and by ordinary people: hide, meat, horn, sinew, and tallow that burns badly.\n\n' +
        'Drovers bring pairs down the long road to [[district.arena-city-drovers-camp|the drovers\' camp]] and are paid for pairs. What happens to the pair afterwards is priced into the sale and not discussed at the camp fire.',
      devNotes:
        PROPOSAL(
          'Sexual parasitism, the pacifying secretion and the four-day frenzy are proposed. The brief established an arena city on the Ashen Steppe and nothing about what it feeds into the ring.',
        ) +
        '\n\nThe steppe burrower that sheds [[material.steppe-scute|steppe scute]] in [[deposit.moult-fields|the Moult Fields]] is a different animal and is deliberately not written here; the materials module keeps that question open.\n\n' +
        'Design use: unusual biology that is an economy rather than a monster. The moral weight sits on the separation, not the fight, and the players can buy, prevent, expose or profit from it.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Ironback Range                                                */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.slagbuck',
    type: 'creature',
    name: 'Slagbuck',
    status: 'draft',
    summary: 'Ironback grazer that drinks metal-rich seeps and lays the metal down in horn and bone; a herd range reads as an ore survey.',
    tags: ['grazer', 'ironback', 'prospecting', 'toxic'],
    fields: {
      overview:
        'A hill grazer that drinks from the sour seeps below [[deposit.sour-lodes|the Sour Lodes]] because nothing else will, and survives the metal load by dumping it into tissue it can afford to lose. The horn sheath and the outer bone grow in banded layers, a year to a band, and a skull read in section is a decade of local water chemistry.\n\n' +
        'Prospectors pay for that and mostly cannot read it. Where the herds drink is where the metal is, which makes a slagbuck range worth a season of survey to anyone who can follow one without being seen doing it.',
      habitat: [REGION.ironback],
      threat: 'Dangerous',
      size: 'Shoulder height of a tall man; horn plate two fingers thick',
      biology:
        'Iron and arsenic compounds are sequestered out of the blood and laid down in the horn and the outer bone, which is an elegant solution with a fixed term. By the fourth year the long bones are dense, brittle and full of banded inclusions. The animal is, in effect, mineralising itself alive, and it is a working ore assay that walks.',
      lifecycle:
        'Bucks shed and regrow the outer horn plate every third year and leave it on the rut grounds. They live about twelve years and spend the last two lame, because a brittle femur breaks under an animal that weighs what this one does. Herds abandon lame animals, which is where the wolves of the Ironback get most of their winter.',
      behaviour:
        'Slow, territorial in the rut, and disinclined to run from anything. They do not flee uphill or downhill; they turn and wait, which people read as calm and which is in fact the whole of their defensive repertoire and quite sufficient.',
      diet: 'Coarse hill grass, lichen, and seep water that would kill anything else on the range',
      attacks: [
        'A horn strike that goes through laminate and most mail',
        'They stand their ground, so the encounter happens at whatever range the other party chooses, which flatters people',
      ],
      weaknesses: [
        'Brittle-boned from the fourth year; a full charge on hard ground breaks its own leg as often as it breaks anything else',
        'Snow-blind in bright weather',
        'The seeps. Poison the water and the herd leaves or dies, and prospectors have done both to move a range off a claim',
      ],
      tactics:
        'Fighting one is a bad trade at any level: the meat tastes of the seeps, the hide is poor, and the horn is worth more shed. The valuable interaction is reading the range. [[skill.ground-read|Ground Read]] over a slagbuck range does the work of a season\'s prospecting, and the roast yards downwind of the adits will buy the information without asking how it was got.',
      yields: TBD(
        'Slagbuck horn plate is bought by smiths and armourers and has no material entry. Is it a material, a mid-grade armour item, or both, and does the arsenic load make wearing it a slow poisoning that nobody who sells it mentions?',
      ),
      harvestNotes:
        'Shed plate is scavenged off the rut grounds in spring and is legal everywhere. Killing for horn is not, in the sense that the yards buy either and record neither. The bone is worth more to an assayer than the meat is to anyone: a sectioned femur names the seeps the animal drank from and, read carefully, the depth they came off, which is why the better prospectors buy skulls rather than trust a claim map.\n\n' +
        'The meat is edible and tastes of the water. Camps that eat it every winter have a tremor by their forties and blame the cold.',
      devNotes:
        PROPOSAL(
          'Metal sequestration into horn and bone, the banded record and the brittle-bone endgame are proposed. The brief established nothing about the Ironback beyond it being a range.',
        ) +
        '\n\nDesign use: a creature that is a prospecting mechanic. It puts [[material.scaldstone|scaldstone]] on the map for players who cannot afford a survey, and it gives the Ironback something to argue about that is not another mine.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Boreal Crown                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.lamphorn',
    type: 'creature',
    name: 'Lamphorn',
    status: 'draft',
    summary: 'Boreal stag whose antler velvet hosts a cold-burning symbiotic fungus; herded for light, and ruined by hunting.',
    tags: ['stag', 'boreal-crown', 'symbiosis', 'herded'],
    fields: {
      overview:
        'A taiga stag carrying a fungus in the vasculature of its antler velvet that converts sugar to a dim, steady, greenish light at an efficiency no lamp in the world approaches. The animal pays for it in feed and gets nothing back that anyone has identified.\n\n' +
        'Cut velvet lights a working face for about eleven days and cannot be recharged. [[city.cave-agrarian-city|The Cave Agrarian City]] buys it by the crate for work below the light line, cannot breed the animal itself, and does not enjoy the dependency.',
      habitat: [REGION.borealCrown],
      threat: 'Harmless',
      size: 'Stags to three hundred kilos; a lit spread of about a metre across',
      biology:
        'The fungus grows in the velvet blood supply and burns cold, which is to say it makes light and almost no heat, at a metabolic cost the stag carries as an extra tenth of its feed. Light output falls with the animal\'s condition, so a lamphorn herd in a bad winter is a herd going dark, and the herders can see the coming famine before they can measure it.',
      lifecycle: TBD(
        'The velvet is shed annually and the strain is carried over in the pedicle, but nobody has established how it passes from one animal to another. Grooming, milk, or the ground a herd calves on are the three candidates. Whoever answers it can found a new herd from nothing, and every herd-holder in the Boreal Crown has an interest in the question staying open.',
      ),
      behaviour:
        'Herded rather than hunted, on fixed circuits between winter lichen ground and summer birch scrub. The light makes them followable at four miles on a clear night by anything that wants them, so the herds are guarded continuously and the guarding is most of the work.',
      diet: 'Lichen, birch scrub and willow, plus the fungus\'s share of all of it',
      attacks: [
        'Rut. A lit stag in rut in a dark camp is the commonest serious injury of the northern herding season',
        'Nothing else. They are not dangerous and their owners are',
      ],
      weaknesses: [
        'They advertise themselves to every predator and every raider on the range',
        'A wet autumn moulds the velvet and there is no light that winter',
        'Kill one badly and the heat at the pedicle kills the strain, so a poacher can destroy a herd line in a night and get one lantern for it',
      ],
      tactics:
        'The encounter is theft rather than hunting. A lamphorn raid means cutting velvet in the dark off animals that cannot be moved quietly, with a guarded camp within earshot and a strain that dies if anyone panics. [[skill.cold-camp|Cold Camp]] decides whether the raiders live through the night afterwards, which up there is the harder half.',
      yields: ['food.cache-fat'],
      harvestNotes:
        'Velvet is cut in strips from a living animal by someone who has done it many times, twice a year, and the animal is worth more each time it survives the cutting. Strips are carried in sealed birch boxes and go dark on about the eleventh day whatever anyone does to them.\n\n' +
        'Culled stags render down into hide and [[food.cache-fat|cache fat]], which is buried in pits against the winters. Robbing a cache is treated as attempted murder in the taiga. The same protection has never been extended to the herds themselves, which is the argument the northern clans keep having with everyone who buys their light.',
      devNotes:
        PROPOSAL(
          'The cold-burning symbiont, the eleven-day cut life and the strain dying with a badly killed animal are proposed. The brief established nothing in the Boreal Crown.',
        ) +
        '\n\nThe cut velvet has no material or item entry yet. It could be a material, a consumable lantern item, or deliberately neither, and the choice decides whether cold light is a trade good or a favour the north grants.\n\n' +
        'Design use: light without fire, priced, perishable and impossible to steal at scale. It gives the Hollow Karst a second light supply that is not the mirror rota, and it gives the Boreal Crown something worth defending.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Mistfall Coast and the Eastern Deep                           */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.mistfall-bell',
    type: 'creature',
    name: 'Mistfall bell',
    status: 'draft',
    summary: 'Cold-water bell the size of a cart, trailing a curtain of stinging filament along the Mistfall shelf.',
    tags: ['medusa', 'mistfall-coast', 'venom', 'harvested'],
    fields: {
      overview:
        'They drift the shelf outside the approach to [[city.keth-veyra|Keth Veyra]] in the cold months, bells to two metres across, trailing twenty metres of filament that stops a body without hurting it. Rendered, that filament becomes [[spell.stillwater-draught|stillwater draught]], the only reliable surgical paralytic on the continent.\n\n' +
        'A great deal of survivable surgery elsewhere is paid for by this coast in a currency it does not advertise. The divers lose sensation in their hands, and then they drown.',
      habitat: [REGION.mistfallCoast],
      threat: 'Deadly',
      size: 'Bell to two metres; filament curtains of twenty metres or more',
      biology:
        'The cysts do not deliver a pain toxin. They deliver a nerve blocker, which means contact is registered as a loss rather than as an injury: a diver in a curtain knows about it because the hand stops answering, not because it hurts. Detached filament stays live for days in cold water and for hours on a wet deck, which is where most of the landward casualties come from.',
      lifecycle:
        'A polyp stage sits on the shelf rock through the year and releases medusae in the weeks either side of the winter still. The polyp beds are known to the harvest boats, unmapped by anyone else, and are the reason work on the outer rocks is dangerous in a season when there is nothing visibly in the water.',
      behaviour:
        'It cannot swim against anything and does not try. It concentrates where the current does, which is the slack water inside the approach, so a fog week and a slack tide put the whole crop and the whole shipping lane in the same square mile.',
      diet: 'Fish, and anything else the curtain stops',
      attacks: [
        'The curtain. Contact anywhere along twenty metres and the limb stops answering inside a minute',
        'Detached filament on a line, a net, a glove or a deck, still live and no longer attached to anything anyone is watching for',
        'The block reaches the chest at a dose a strong swimmer can take and still drown from',
      ],
      weaknesses: [
        'Fresh water bursts the cysts, which is why every harvest boat carries more of it than it needs to drink',
        'Warm water kills them, so the trade cannot be moved to a kinder coast',
        'They cannot pursue, turn or hold station; a boat that keeps way on is never caught',
      ],
      tactics:
        'Nobody fights one. People are caught by one. The scene is water work: a diver in a curtain, a line, and the ninety seconds in which somebody on the boat decides whether to go in after them. Handling the filament ashore is [[skill.venom-work|Venom Work]], and it is the same bench, the same dilution discipline and the same shelf life as preparing the dose that stops a heart in a locked room.',
      yields: TBD(
        'Landed filament is rendered into a paralytic base and shipped onward under licence, but the base has no material entry. Should it be a licensed, weighed and sealed material like levin salt, or stay inside the spell so that only Keth Veyra ever touches the raw article?',
      ),
      harvestNotes:
        'Open boats in the coldest weeks. Divers work in wool and grease with a knife and a bag, cut the curtain away from the bell into sealed tubs, and are paid on landing rather than by weight, because weight arguments take time and the tubs are already going grey. Feeling goes from the fingers first and does not come back; a diver who cannot feel a line drops it, and the sea below the shelf is four degrees.\n\n' +
        'The tubs are landed at the sealed shed on [[district.keth-veyra-the-fog-quays|the fog quays]] under licence and go on from there. Where they go has never been followed by anybody from outside.',
      devNotes:
        PROPOSAL(
          'The nerve-blocking cyst, the polyp beds and the harvest practice are proposed. Keth Veyra itself is a name-only canon and this entry adds nothing to it beyond the trade the city module already describes.',
        ) +
        '\n\nOne of only two Deadly entries in the bestiary, and it earns it by being harvested rather than by hunting anyone. Design use: the continent\'s surgery has a supply chain, and the supply chain has a cost that is paid entirely by one coast.',
    },
  }),

  E({
    id: 'creature.smoker-whale',
    type: 'creature',
    name: 'Smoker whale',
    status: 'draft',
    summary: 'Deep-diving whale of the Eastern Deep that farms sulphur bacteria in a chambered second gut.',
    tags: ['whale', 'eastern-deep', 'chemosynthesis', 'apex'],
    fields: {
      overview:
        'Twenty metres of animal that dives to the cold seeps and comes back up carrying a fermenting garden. The second gut is a chambered vessel holding four tonnes of sediment, water and chemosynthetic bacteria that oxidise sulphur compounds, and the whale takes about a fifth of its energy from what they produce.\n\n' +
        'That ferment is the dose that makes [[material.tideset-cement|tideset cement]] set under salt water, and it cannot be cultured ashore. Nobody hunts these successfully with the boats this continent has. Everything in the trade turns on strandings.',
      habitat: [REGION.easternDeep],
      threat: 'Apex',
      size: 'Eighteen to twenty-two metres; the second gut alone holds around four tonnes',
      biology:
        'A working chemosynthetic symbiosis carried in a sealed gut chamber with its own circulation and its own valve. The whale seeds it at the seeps and harvests it between dives. The tissue smells of struck matches, which is where the name comes from, and the smell carries downwind of a stranding for a week.',
      lifecycle: TBD(
        'Nothing at all is recorded between a calf at the surface and an adult at the surface. No breeding ground, no calving season, and no carcass under twelve metres has ever come ashore anywhere on this coast. Either the young stay deep, or they are somewhere no boat from this continent has been.',
      ),
      behaviour:
        'Solitary, vocal, and audible through a hull at ten miles, which is how the gulf villages know a season is coming before they see anything. They surface on a schedule a patient crew can learn, and learning it is the entire skill of the trade.',
      diet: 'Squid and deep-water fish, plus roughly a fifth of its intake from its own bacterial garden',
      attacks: [
        'It has never been recorded attacking a boat deliberately. It has sunk several by surfacing under them',
        'A wounded animal at the surface clears everything within a boat length of its flukes and does not mean anything by it',
      ],
      weaknesses: [
        'It has to surface, and it surfaces predictably',
        'Strandings on the gulf shelves, which nobody causes and everybody exploits',
        'The ferment spoils within a day of death unless the gut is opened first and sealed with its own liquor',
      ],
      tactics:
        'Treat it as weather with a heartbeat. There is no fight here worth writing; the content is the carcass. A stranded smoker whale is worth more than a year of a gulf village\'s labour, is claimed by three parties before it has finished dying, and has twice nearly caused a shore war. [[faction.conduit-college|The Conduit College]] bids on carcasses and has never explained to the harbour court why a licensing body needs one.',
      yields: ['material.tideset-cement'],
      harvestNotes:
        'Flensing a stranded animal is a fortnight of work for a whole village and has to be done in a fixed order or the prize is lost: second gut first, opened and barrelled with its own liquor within the day, then oil, then bone, then whatever the tide has left of the rest. The oil burns cleaner than anything else on the coast and is the part the village keeps.\n\n' +
        'The ferment is the part the [[city.mediterranean-city|Mediterranean City]] buys, by the barrel, at a price set before anyone knows how many barrels there are. Two villages on the same stretch of shelf have gone to knives over a single carcass inside living memory.',
      devNotes:
        PROPOSAL(
          'The chambered second gut, the chemosynthetic symbiosis and the link to tideset cement are proposed; the materials module already names this animal as the source of the cement ferment.',
        ) +
        '\n\nApex here means ecological position, not aggression. Nothing hunts it and it hunts nobody, and the danger is a forty-tonne animal surfacing under a boat that was in the wrong place.\n\n' +
        'Design use: it puts a hard biological floor under the Meridian Coast\'s harbour works. No ferment, no cement, no harbour, and the only supply is an animal nobody can farm and nobody can reliably kill.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Meridian Coast                                                */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.verdigris-whelk',
    type: 'creature',
    name: 'Verdigris whelk',
    status: 'draft',
    summary: 'Farmed Meridian mollusc whose foot secretes a copper-binding liquor that cures hard and green.',
    tags: ['mollusc', 'meridian-coast', 'farmed', 'monopoly'],
    fields: {
      overview:
        'A fist-sized grazing whelk farmed in terrace beds the length of the shore under armed lease. It grazes algal film off ore-bearing rock, takes in more copper than any animal should, and dumps what it cannot excrete into a gland liquor it uses to glue its egg cases to stone.\n\n' +
        'That liquor is why [[city.mediterranean-city|the Mediterranean City]] can lacquer copper conduit and therefore why it can wire itself at all. Poaching a bed is prosecuted as an attack on infrastructure, which is not rhetoric.',
      habitat: [REGION.meridianCoast, REGION.meridianGulf],
      threat: 'Harmless',
      size: 'Shell to the size of a fist; beds of a quarter million animals',
      biology:
        'Heavy-metal detoxification turned into a trade. The foot gland binds copper ions into an organic complex that polymerises on contact with air and cures hard, green and impermeable. In the wild it is glue and antifouling. On a conduit yard bench it is half of the only coating that will sit on hot copper for twenty years without crazing.\n\n' +
        'Egg cases are laid in ribbons on rock in spring, cemented with the same liquor, which is the natural harvest nobody takes because taking it ends the bed.',
      lifecycle: TBD(
        'Do the farmed beds still recruit from a wild population, or have they been closed stock so long that they are effectively one line? If it is one line, the conduit trade of the technologically advanced city is one disease away from stopping, and the Conduit College has every reason not to commission the survey that would find out.',
      ),
      behaviour:
        'Nocturnal, gregarious and particular. They will not spawn in water they dislike, which is most water, and a bed moved fifty paces along the shore can fail for reasons nobody has ever isolated.',
      diet: 'Algal film grazed off ore-bearing rock; the copper is incidental and is the entire point',
      attacks: ['None'],
      weaknesses: [
        'Warm still water kills a bed inside a week',
        'Storm run-off off the terraces, which is fresh and full of grove silt',
        'They are farmed, so the real vulnerability is the lease, the guard and the season',
      ],
      tactics:
        'The danger on the whelk beds is entirely human. Beds are leased, walled and watched; poachers drown with a regularity the harbour officers do not investigate; and the bed guards are paid by the [[faction.conduit-college|Conduit College]] rather than by the city, which decides how any given incident is written up.',
      yields: ['material.mirelac'],
      harvestNotes:
        'The animal is not killed. Whelks are lifted, held out of water overnight on grooved boards, and the liquor is scraped as it beads off the foot. A bed gives four scrapes a year, and a whelk scraped a fifth time dies, which is the one number every leaseholder actually respects.\n\n' +
        'Coast lacquer is boiled [[material.mirelac|mirelac]] cut with whelk liquor: the delta resin alone crazes on copper, the whelk liquor alone will not build a film, and neither the coast nor the delta advertises that it needs the other. That mutual dependency is worth more than either trade will admit and has never been tested by anyone with a reason to break it.',
      devNotes:
        PROPOSAL(
          'The copper-binding gland, the four-scrape season and the mirelac dependency are proposed; the materials module already has the coast lacquer needing both halves.',
        ) +
        '\n\nDesign use: a monopoly that is a farm rather than a mine, which means it can be poisoned, poached, diseased or bought, and none of those look like combat. The advanced city\'s advantage rests on a mollusc, and the mollusc rests on water quality it does not control.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Ascent Basin                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.ledger-moth',
    type: 'creature',
    name: 'Ledger moth',
    status: 'draft',
    summary: 'Basin moth whose larvae digest sized paper and iron-gall ink, and almost nothing else.',
    tags: ['insect', 'ascent-basin', 'crime', 'archive'],
    fields: {
      overview:
        'Nothing large lives in [[city.gilded-ascent|the Gilded Ascent]] and that is deliberate. What the Ascent actually fears is a moth with a thumbnail wingspan whose larvae eat sized rag paper, gelatin size and iron-gall ink, and are indifferent to almost everything else.\n\n' +
        'A jar released in the right archive is how a debt stops having existed. Every bonded vault above the third terrace runs cedar boxes, sealed lead and a paid moth-warden, and releasing moths in a bonded archive is prosecuted as arson because the alternative is admitting in open court that the archive is the city.',
      habitat: [REGION.ascentBasin],
      threat: 'Harmless',
      size: 'Wingspan of a thumbnail; larvae about the size of a grain of rice',
      biology:
        'The larval gut carries a symbiont that reduces iron-gall ink and lives on the gelatin size in good paper. Cheap unsized stock is indigestible to it and newsprint kills it. The moth therefore eats exactly and only the documents that were worth the expense of keeping, which is either a very old coincidence or the most quietly frightening fact in the basin.',
      lifecycle: TBD(
        'Sized rag paper and iron-gall ink are about four hundred years old and the moth is not. What did it live on before there were archives, and does that host still exist somewhere in the basin? Whoever finds it has the only reliable way to breed them, which is worth more than any single ledger.',
      ),
      behaviour:
        'Adults live nine days, do not feed and fly badly. Females lay in still air on a vertical surface, which in a warehouse means the spine of a bound book and in a house means a curtain. Larvae cannot cross a gap, so a boxed archive is safe and a shelved one is not.',
      diet: 'Sized rag paper, gelatin size, iron-gall ink and parchment glue',
      attacks: ['None to a person. A sealed jar of gravid females is a weapon and is charged as one'],
      weaknesses: [
        'Cedar, sealed lead and a cold store, which is why every serious vault runs all three and a warden as well',
        'Moving air. They will not lay in a draught, and the better strongrooms are ventilated for that reason alone',
        'They cannot cross a gap of bare shelf, so the cheapest defence in the city is boxing and nobody does it thoroughly',
      ],
      tactics:
        'The whole encounter is lead time and access. Eggs hatch in eleven days and a run of ledgers is unreadable in five weeks, so the crime is committed six weeks before anybody knows there was one and the alibi is already old and boring. The counter is the card stock in [[machine.the-tally-engine|the Tally Engine]], in a different building on a different terrace, which is why the house record dies and the clearing record does not. Every ledger-moth job is really a job about which of those two records the target relies on.',
      harvestNotes:
        'Nobody harvests them and at least four people farm them. A sealed jar of gravid females is priced against what the archive is worth rather than against what the insects cost, which makes it one of the most expensive things by weight on the Ascent\'s black market and one of the cheapest to produce.\n\n' +
        'Moth-wardens are paid to open boxes, look, and sign. A warden who can be bought is worth considerably more than the moths, and the [[faction.concord-of-weights|Concord]] has never once prosecuted a warden rather than a courier.',
      devNotes:
        PROPOSAL('The ink-digesting symbiont, the nine-day adult and the warden economy are proposed.') +
        '\n\nNo yields field: this is an animal nobody harvests and everybody handles, which is the point of including it.\n\n' +
        'Design use: the crime-scene creature. It converts "destroy a record" from a description into a scene with a lead time, an inspection regime, a paid witness and a second copy in another building, and it hangs directly off [[mechanic.standing-ledger|the Standing Ledger]].',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Cinder Waste                                                  */
  /* ---------------------------------------------------------------- */

  E({
    id: 'creature.sandsleeper',
    type: 'creature',
    name: 'Sandsleeper',
    status: 'draft',
    summary: 'Cinder Waste burrower that aestivates for years and comes up in one brood when the rains reach that far.',
    tags: ['burrower', 'cinder-waste', 'seasonal', 'hazard'],
    fields: {
      overview:
        'It spends most of its life sealed two metres down doing almost nothing, and then a real rain reaches the waste margin and the whole cohort comes up in the same fortnight. For whoever is standing there it is a season of meat. For whoever tries to drive a cart over the same ground eight months later it is a field of collapsing burrows.\n\n' +
        'The interval has been three years and it has been eleven. Nobody has managed to predict one and everybody claims to.',
      habitat: [REGION.cinderWaste],
      threat: 'Dangerous',
      size: 'Body of a large dog; brood fields covering square miles',
      biology:
        'Aestivation is the whole animal. It seals itself into a mucous case in a chamber below the heat line, drops its metabolism to almost nothing, and reabsorbs its own muscle over the years it waits. It comes up thin, half-blind and starving, which is the fortnight in which it is catchable, and it eats indiscriminately until it is fat enough to dig again.',
      lifecycle:
        'Broods emerge in the second week of a real rain and not before. They breed within days of surfacing, feed for six to eight weeks, and go back down; the young dig their own chambers within a hundred paces of their mother\'s and are not seen again for years. A brood field is therefore an inherited structure that gets denser with every emergence, and weaker.',
      behaviour:
        'Solitary underground and briefly, violently social above it. They come up under things, because the roof of a chamber is where the digging is easiest: carts, well linings, road metal, tents and once a whole grain store on the margin road.',
      diet: 'Everything green in the first week and everything else in the second',
      attacks: [
        'Digging claws, at arm\'s length, from an animal that is starving and panicking',
        'Collapse. The ground gives under a cart, a horse or a person, months after anything was living in it',
      ],
      weaknesses: [
        'A newly surfaced animal is starving and will take bait it should know better than to take',
        'It overheats above ground within an hour and has to be back under by midday',
        'The fields are mapped once and then they are wrong, which is a weakness of the map rather than the animal, and it is the one that kills people',
      ],
      tactics:
        'The threat is the ground, not the teeth. Abandoned burrow fields swallow carts, wells and stretches of road for a year after a brood, which is why [[npc.kavel-uur|Kavel Uur]]\'s caravan out of [[city.orath|Orath]] runs to a fixed schedule and a private count of which crossings are hollow this season. [[skill.the-far-walk|The Far Walk]] over a brood field is a matter of route choice and probing, and losing the animals is losing the crossing.',
      yields: TBD(
        'A brood year is a season of meat and tallow for whoever is standing there and neither is in the trade list. Is brood meat a preserved food entry, or is the design point that a glut in the middle of the waste cannot be moved, cannot be kept, and therefore changes nothing?',
      ),
      harvestNotes:
        'Trapped at the burrow mouth in the first three days, while the animals are thin, slow and out in daylight. After a week they are fat, fast and nocturnal and the take falls by nine tenths. Nothing keeps in that heat unless it is rendered the same day, so a brood year is eaten rather than traded and only the tallow travels.\n\n' +
        '[[city.arena-city|The Arena City]] traps the margin broods for the card season and pays for live animals, which is a different business, a worse one, and the reason the under-stables know the emergence dates before the caravan masters do.',
      devNotes:
        PROPOSAL(
          'Multi-year aestivation, the synchronised brood and the collapsing burrow fields are proposed. Orath is a name-only canon and nothing here adds to it beyond the caravan hazard the city module already names.',
        ) +
        '\n\nExplicitly not the steppe burrower of [[deposit.moult-fields|the Moult Fields]]: different range, different cycle, different animal. The materials module makes that distinction and this entry keeps it.\n\n' +
        'Design use: a hazard with a memory. The brood is an event, and the burrow field is the terrain consequence that outlives it and quietly changes every route across the waste margin for a year.',
    },
  }),
]

export const relations: SeedRelation[] = [
  /* Habitat: places each creature on the world map ------------------- */
  R('creature.loftwrack', 'inhabits', REGION.anvilShelf, 'grazes the permanent thermal in rafts up to a hundred paces across'),
  R('creature.mirror-swift', 'inhabits', REGION.hollowKarst, 'nests in the duct heads and shafts cut for light'),
  R('creature.bolewright-wasp', 'inhabits', REGION.greatwood, 'four years inside a living trunk, then one synchronised emergence'),
  R('creature.sentinel-tick', 'inhabits', REGION.greatwood, 'bred in the scout-house lofts; almost none live wild any more'),
  R('creature.chalk-louse', 'inhabits', REGION.aethericScar, 'colonies follow the lime, not the ward line'),
  R('creature.blackrun-lamprey', 'inhabits', REGION.theDrown, 'three weeks of fresh water, then dead on the spawning gravel'),
  R('creature.blackrun-lamprey', 'inhabits', REGION.easternDeep, 'four years at sea before the run'),
  R('creature.raftbloom', 'inhabits', REGION.theDrown, 'the floor of the delta, on a two-year clock'),
  R('creature.salt-mason', 'inhabits', REGION.whitePans, 'colonies of half a hectare, cementing crust into towers'),
  R('creature.yokeback', 'inhabits', REGION.ashenSteppe, 'driven in pairs; counted in pairs'),
  R('creature.slagbuck', 'inhabits', REGION.ironback, 'the herd range is the ore map'),
  R('creature.lamphorn', 'inhabits', REGION.borealCrown, 'herded on fixed circuits between lichen ground and birch scrub'),
  R('creature.mistfall-bell', 'inhabits', REGION.mistfallCoast, 'polyp beds on the outer rocks, medusae in the cold months'),
  R('creature.smoker-whale', 'inhabits', REGION.easternDeep, 'dives the cold seeps and farms what grows there'),
  R('creature.verdigris-whelk', 'inhabits', REGION.meridianCoast, 'farmed in leased terrace beds the length of the shore'),
  R('creature.verdigris-whelk', 'inhabits', REGION.meridianGulf, 'wild stock on the gulf rocks, and nobody has counted it'),
  R('creature.ledger-moth', 'inhabits', REGION.ascentBasin, 'wherever sized paper is stored in still air'),
  R('creature.sandsleeper', 'inhabits', REGION.cinderWaste, 'two metres down for years at a time'),

  /* What they yield -------------------------------------------------- */
  R('creature.loftwrack', 'produces', 'material.sparbone', 'raft-struts scarfed and sold as low-grade sparbone at a third of the load'),
  R('creature.mirror-swift', 'produces', 'food.gallery-cap', 'guano charges the beds; a third of the city\'s nitrogen comes off a roost floor'),
  R('creature.chalk-louse', 'produces', 'material.quenchspar', 'PROPOSAL: quenchspar seams are massed carapace where colonies died'),
  R('creature.raftbloom', 'produces', 'material.mire-bloom', 'iron precipitates fastest under a living mat, so pontoon and ore cutters want the same water'),
  R('creature.salt-mason', 'produces', 'material.blackfall-sand', 'the Drifts are several thousand years of dead colony sorted by weight'),
  R('creature.salt-mason', 'produces', 'material.pan-nitre', 'dead colony crust grades two cuts higher for the same labour'),
  R('creature.lamphorn', 'produces', 'food.cache-fat', 'culled stags render to hide and pit fat against the winters'),
  R('creature.smoker-whale', 'produces', 'material.tideset-cement', 'the second-gut ferment is the dose that makes it set under salt water'),
  R('creature.verdigris-whelk', 'produces', 'material.mirelac', 'coast lacquer is boiled mirelac cut with whelk liquor; neither half works alone'),
  R('creature.mistfall-bell', 'produces', 'spell.stillwater-draught', 'filament landed in sealed tubs and rendered under licence'),
  R('creature.yokeback', 'produces', 'spell.yokebreak-draught', 'the severed gland, cut within a quarter hour or worth nothing'),
  R('creature.raftbloom', 'related_to', 'item.fever-clay', 'the fever the clay is bought against comes up out of the rotting mat'),

  /* Where they matter to a settlement -------------------------------- */
  R('creature.loftwrack', 'located_in', CITY.skyCity, 'culled off the mooring ring; a culled raft falls on Shelf-Foot'),
  R('creature.mirror-swift', 'located_in', CITY.caveAgrarian, 'nests quota\'d, guano counted, poaching tried as theft from the harvest'),
  R('creature.sentinel-tick', 'located_in', CITY.treeCity, 'fitted, numbered and recorded by the Crown Galleries scout house'),
  R('creature.chalk-louse', 'affects', CITY.magicCity, 'voids a warded quarter overnight and leaves the drawing intact'),
  R('creature.blackrun-lamprey', 'located_in', CITY.floatingSwamp, 'three weeks of glut and eleven months of talking about it'),
  R('creature.blackrun-lamprey', 'affects', CITY.blackWeir, 'two bays worked for the run; the most profitable fortnight of the year'),
  R('creature.raftbloom', 'located_in', CITY.floatingSwamp, 'three hundred and eighty lots are moored to it or made of it'),
  R('creature.salt-mason', 'located_in', CITY.siftingCity, 'the city sifts where the colonies died'),
  R('creature.yokeback', 'located_in', CITY.arenaCity, 'separated animals sold to the under-stables by the head'),
  R('creature.smoker-whale', 'related_to', CITY.mediterranean, 'the College buys the ferment by the barrel and bids on carcasses'),
  R('creature.verdigris-whelk', 'located_in', CITY.mediterranean, 'bed poaching is prosecuted as an attack on infrastructure'),
  R('creature.ledger-moth', 'inhabits', CITY.gildedAscent, 'the reason every bonded vault runs cedar, lead and a paid warden'),
  R('creature.mistfall-bell', 'located_in', CITY.kethVeyra, 'filament landed in sealed tubs at the east quay shed'),
  R('creature.sandsleeper', 'affects', CITY.orath, 'brood years are a season of meat and a year of hollow crossings'),
  R('creature.bolewright-wasp', 'affects', CITY.treeCity, 'heart rot in six named boles, and the reason felling orders exist'),

  /* Materials, deposits and machines they touch ---------------------- */
  R('creature.bolewright-wasp', 'affects', 'material.blackbole-timber', 'a bole that sounds hollow is condemned and burnt where it stands'),
  R('creature.bolewright-wasp', 'affects', 'deposit.standing-fifty', 'six of the fifty are quietly no longer fellable and the count is still fifty'),
  R('creature.bolewright-wasp', 'related_to', 'machine.the-pitchworks', 'tapped stumps draw laying females; the industry seeds its own blight'),
  R('creature.bolewright-wasp', 'related_to', 'food.bole-mast', 'emergence follows the mast year, so the famine calendar is the blight calendar'),
  R('creature.chalk-louse', 'consumes', 'material.ward-chalk', 'eats cured chalk and lime binder from behind'),
  R('creature.chalk-louse', 'affects', 'spell.chalkline-ward', 'the drawn line survives the ward by about a fortnight'),
  R('creature.chalk-louse', 'affects', 'machine.the-ward-kilns', 'a cake store two weeks in can be hollow'),
  R('creature.chalk-louse', 'related_to', 'deposit.cold-quarter', 'the violet seams are quarried out of colonies that died there'),
  R('creature.salt-mason', 'affects', 'deposit.blackfall-drifts', 'the wind takes the light fraction off dead towers and leaves the heavy'),
  R('creature.salt-mason', 'affects', 'machine.the-sieve-cascade', 'a dead colony is the richest feed the cascade ever sees'),
  R('creature.raftbloom', 'related_to', 'machine.the-fen-damp-taps', 'rotting mat is the gas ground and the fever ground both'),
  R('creature.raftbloom', 'related_to', 'deposit.bloom-cuts', 'the cuts refill quickest where the mat is thickest'),
  R('creature.mirror-swift', 'affects', 'machine.the-mirror-ducts', 'roost fouling on duct plate; every polish round is a sweeping round first'),
  R('creature.mirror-swift', 'related_to', 'material.cudmother', 'a soured culture line is re-seeded off a roost floor'),
  R('creature.loftwrack', 'related_to', 'machine.the-strand-loom', 'lift-bladder membrane for the loom\'s own hoists'),
  R('creature.loftwrack', 'related_to', 'item.mooring-lance', 'the lance is a cull tool before it is a weapon'),
  R('creature.slagbuck', 'related_to', 'material.scaldstone', 'a herd range read carefully is a free ore survey'),
  R('creature.slagbuck', 'related_to', 'deposit.sour-lodes', 'they drink the seeps below the adits because nothing else will'),
  R('creature.ledger-moth', 'affects', 'machine.the-tally-engine', 'a jar in the card store is how a debt stops having existed'),
  R('creature.ledger-moth', 'affects', 'item.stair-writ', 'the writ survives; the house record of who signed it does not'),
  R('creature.ledger-moth', 'affects', 'item.indenture-bond', 'the register burns and the person is still owned, which is the cruelty of it'),
  R('creature.yokeback', 'related_to', 'deposit.moult-fields', 'shares the burrow country; the animal that sheds the scute is a different one'),
  R('creature.blackrun-lamprey', 'related_to', 'spell.calling-the-run', 'brings the run early and spends next year\'s catch to do it'),

  /* Factions, people, skills and mechanics --------------------------- */
  R('creature.sentinel-tick', 'used_by', 'faction.pitchguard', 'worn behind the ear by scouts, at a daily bleed and a decade of years'),
  R('creature.sentinel-tick', 'used_by', 'npc.vetla-torvik', 'still wearing hers outside the palisade, and it has woken her twice'),
  R('creature.sentinel-tick', 'related_to', 'skill.quiet-ground', 'sets the detection roll, and fails against anyone the host has spent a day with'),
  R('creature.chalk-louse', 'related_to', 'faction.fetterhouse', 'ground carapace is the base of the powders it will not licence anyone else to make'),
  R('creature.chalk-louse', 'related_to', 'mechanic.ward-load', 'an infestation reads as a maintenance failure and is not one'),
  R('creature.chalk-louse', 'related_to', 'quest.the-chalk-that-lies', 'the honest explanation a chalk fraud can hide behind'),
  R('creature.mirror-swift', 'related_to', 'faction.mirror-assembly', 'the quota is written around the first take and enforced around the second'),
  R('creature.mirror-swift', 'related_to', 'mechanic.the-mirror-rota', 'poaching this year starves a different gallery the year after next'),
  R('creature.raftbloom', 'related_to', 'skill.marsh-footing', 'test before weighting, watch the rim colour, never cross a dark centre'),
  R('creature.raftbloom', 'affects', 'mechanic.the-remoor', 'the draw order decides who is left on the oldest mat'),
  R('creature.blackrun-lamprey', 'related_to', 'faction.iron-sluice-company', 'whoever holds the sluices holds the run'),
  R('creature.blackrun-lamprey', 'related_to', 'mechanic.the-sluice-book', 'a bay shut for six hours breaks the run against the stone'),
  R('creature.salt-mason', 'affects', 'mechanic.the-sift-line', 'feeding live crust down the line is a mass-casualty event and a rich one'),
  R('creature.salt-mason', 'related_to', 'npc.sahat-belek', 'reads a dead colony at a hundred paces, alone, eight days out'),
  R('creature.yokeback', 'related_to', 'npc.sukhet-daral', 'buys separated animals by the head for the card season'),
  R('creature.yokeback', 'related_to', 'mechanic.ring-bond', 'the frenzy is a card, and the card is sold against somebody\'s bond'),
  R('creature.slagbuck', 'related_to', 'skill.ground-read', 'reading a range does the work of a season of survey'),
  R('creature.lamphorn', 'related_to', CITY.caveAgrarian, 'crated cold light for work below the light line, and a dependency the Karst resents'),
  R('creature.lamphorn', 'related_to', 'skill.cold-camp', 'the raid is easy; the night afterwards is the part that kills'),
  R('creature.mistfall-bell', 'related_to', 'skill.venom-work', 'one bench, two customers, and the only difference is the label'),
  R('creature.mistfall-bell', 'related_to', 'quest.the-fog-bells', 'already on the rock, in the cold, and not swimming anywhere'),
  R('creature.smoker-whale', 'related_to', 'faction.conduit-college', 'bids on carcasses and has never explained why to the harbour court'),
  R('creature.verdigris-whelk', 'related_to', 'faction.conduit-college', 'the bed guards are College men, which decides how a drowning is written up'),
  R('creature.verdigris-whelk', 'related_to', 'skill.pressure-fitting', 'no lacquer, no live conduit work, no timetable'),
  R('creature.ledger-moth', 'related_to', 'faction.concord-of-weights', 'has never once prosecuted a warden rather than a courier'),
  R('creature.ledger-moth', 'affects', 'mechanic.standing-ledger', 'the house record dies and the clearing record does not'),
  R('creature.sandsleeper', 'related_to', 'npc.kavel-uur', 'keeps a private count of which crossings are hollow this year'),
  R('creature.sandsleeper', 'related_to', 'skill.the-far-walk', 'route choice and probing; losing the animals is losing the crossing'),
  R('creature.sandsleeper', 'related_to', CITY.arenaCity, 'margin broods trapped live for the card season'),
  R('creature.bolewright-wasp', 'related_to', 'quest.the-felling-order', 'the stated cause, and possibly the true one'),
]
