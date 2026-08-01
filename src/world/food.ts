/**
 * Food and agriculture.
 *
 * Fourteen entries covering what the continent actually eats. The agronomy is
 * meant to hold up: barley is grown underground because barley pollinates
 * itself inside a closed floret and needs no insect; deepwater rice survives a
 * slow rise and drowns in a fast one, which is exactly the lever the Black Weir
 * holds; a salt-pan ration made of brine shrimp is mostly salt, so eating it
 * costs water, and the water is sold.
 *
 * Nearly every entry is a supply chain with a politics attached. Four of the
 * thirteen settlements cannot feed themselves at all, two more can only feed
 * themselves in a good year, and the entries say who decides what happens in a
 * bad one. Famine here is arithmetic and someone signs it.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------------------- */
  /* The Hollow Karst — the only civilisation that farms in the dark    */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.mirror-barley',
    type: 'food',
    name: 'Mirror barley',
    aka: ['Duct barley', 'Short straw'],
    status: 'draft',
    summary: 'Dwarf barley bred for ducted light and made soil: the bread grain of the karst, at a third of surface yield.',
    tags: ['staple', 'grain', 'hollow-karst', 'famine-risk', 'export'],
    fields: {
      overview:
        'Barley is grown under a mountain for one unromantic reason: it fertilises itself. The floret closes over its own anthers and sets seed without wind, without an insect and without anybody carrying pollen down two hundred metres of shaft. Everything else the karst has tried needs a pollinator, and there are no pollinators in a cave. That single fact is why [[city.cave-agrarian-city|the Cave Agrarian City]] is a grain civilisation and not a fruit one, and why it will always be buying [[food.terrace-citron|citron conserve]] from people who despise it.\n\n' +
        'The variety is a dwarf: about 45 centimetres of straw, heavy in the ear, ugly in the field. Tall barley in weak light stretches, goes soft and lodges, and a lodged crop in a gallery has no wind and no sun to lift it again. Short straw is the whole breeding programme, three centuries of it, carried out by people who never wrote down what they were doing.\n\n' +
        'It is grown on the lit terraces under [[landmark.sunwell-shaft|the Sunwell Shaft]], and it is grown against a clock rather than a season. Light arrives as an allocation, issued in lumen-hours under [[npc.ossane-gorbea|the light-tithe reeve]] seal, and a gallery that plants barley is betting that next month rota will still cover it. When it does not, the gallery has half a course of unripe grain and no way to finish it. See [[mechanic.the-mirror-rota|the Mirror Rota]].',
      foodType: 'Crop',
      grownIn: [REGION.hollowKarst, CITY.caveAgrarian],
      cultivation:
        'The soil is manufactured. There is no topsoil in a karst gallery, only rock, so a terrace is built up over about nine years from milled dolomite dust, gallery dung, spent [[food.gallery-cap|mushroom bed]], and [[creature.mirror-swift|swift]] guano barrowed off the roost floors, turned repeatedly with a living [[material.cudmother|cudmother]] culture. The cudmother is the step that matters: without a gut culture working through it, rock flour is powder and stays powder. Export of a starter is barred outright, and the ban is a food-security measure dressed as a trade rule.\n\n' +
        'Roughly a fifth of the daylight entering the shaft head arrives at a terrace, four reflections later and noticeably reddened. [[machine.the-mirror-ducts|The mirror ducts]] deliver it; a mirror one degree out of aim costs a gallery real yield, and a fouled duct costs it the course. Two courses a year of about 150 lit days each, with a bitter vetch undersown between courses to put nitrogen back and to give the beasts something. Yield runs near a third of surface barley by area. By lumen-hour, which is the only accounting the karst respects, it is the most efficient grain grown anywhere.\n\n' +
        'The failure modes are all light. Blight is second. [[npc.iratze-zubiate|Iratze Zubiate]] has been quietly skimming mirror-hours from the grain terraces for over a year to disguise two dark galleries she cannot repair, so the harvest is already failing slowly and the tithe books do not show it.',
      season: 'No season. Two courses a year against the rota, roughly 150 lit days each, sown the week the hours are issued',
      preparation:
        'Threshed on the terrace floor and kilned over waste heat from the flush houses, because nothing air-dries at karst humidity. Whole grain keeps about a year in sealed bins; flour keeps four months and then moulds, so the city stores grain and mills weekly. That means the mills, not the granaries, are the strategic target, a fact the Assembly understands and has never said aloud in minutes.\n\n' +
        'Eaten as a dense unleavened flatbread baked on hot stone, as pearled grain boiled with vetch, and as the malt for a thin gallery beer. Milled fine and blended it also goes into [[food.stair-loaf|stair loaf]] on the Ascent, where it darkens the crumb, which is how the basin can see a bad karst year in a bakery window.',
      effects: [
        'A day of bread for roughly a third of the light any surface grain would need',
        'Keeps about a year as grain, four months as flour at karst humidity',
        'No fat, no fruit and nothing against gum-rot, so a barley-and-fungus diet still needs citron bought in',
        'A gallery that plants barley and then loses its allocation mid-course harvests nothing at all',
      ],
      value: TBD(
        'What does a bushel fetch on the Ascent wharves once the Karst Fork toll is paid, and who actually sets that toll: the Mirror Assembly, the Concord of Weights, or the bargemen who can simply stop?',
      ),
      devNotes:
        PROPOSAL('Mirror barley is the karst staple named in the manifest; the cleistogamous-floret reasoning, the dwarf straw, the made soil and the two-course rota are all proposed.') +
        '\n\nDesign function: this is the crop the light allocation is about. [[quest.who-gets-the-light|Who Gets the Light]] is an argument over bushels, and the galleries a party cuts stop growing this. Treat a gallery allocation as a resource the party can be given, denied, or handed the ledger for.\n\n' +
        'Karst grain leaving down the Karst Fork is also the Gilded Ascent bread supply, which makes a karst blight a basin price event and the loaf price the first place anyone in the Ascent sees it. If you want a slow famine plot that crosses three cities without a single battle, start here.',
    },
  }),

  E({
    id: 'food.gallery-cap',
    type: 'food',
    name: 'Gallery cap',
    aka: ['Flush cap', 'The violet'],
    status: 'draft',
    summary: 'Violet terrace fungus flushed on dung and chaff in three days: food with no light at all, paid for in lungs.',
    tags: ['staple', 'fungus', 'hollow-karst', 'dark', 'famine-risk'],
    fields: {
      overview:
        'The calorie floor of [[city.cave-agrarian-city|the Cave Agrarian City]] and the reason a failed barley course is a hardship rather than a mass death. Gallery cap needs no light whatsoever. It needs substrate, warmth, still air and water, all of which the karst has in quantity, and it flushes every third day for six weeks off a bed that took twelve days to build.\n\n' +
        'It is grown in [[district.cave-agrarian-city-flush-galleries|the Flush Galleries]], the third bedding plane, deliberately unlit. The Assembly does not vote on the flush beds because they consume no lumen-hours, which sounds like an administrative detail and is in fact the whole social structure of the city: the people who grow the food that needs light are citizens with shares, and the people who grow the food that does not are a rota.\n\n' +
        'A flush worker who starts at fifteen is usually finished at forty. Not killed, finished: short of breath on a stair, unable to hold a shift, moved to lighter work if there is any. The city knows the number. It has never disputed the number.',
      foodType: 'Fungus',
      grownIn: [REGION.hollowKarst, CITY.caveAgrarian],
      cultivation:
        'Substrate is gallery dung, milling chaff, spent barley straw and [[creature.mirror-swift|swift]] guano, composted in windrows for twelve days until it heats through and the ammonia has burnt off, then packed into stacked timber beds two hands deep. Beds are spawned from a kept strain, not from spores, and cased over with a finger of karst clay and crushed limestone, which is the layer that actually triggers fruiting.\n\n' +
        'Spawn run takes nine days in the dark at blood-warm. First flush follows three days later, then a flush every third day until the bed exhausts at about six weeks. Spent beds go two ways: onto the barley terraces as soil, or into the sumps as [[food.sump-carp|carp]] feed. Nothing in a karst gallery is thrown away, because there is nowhere to throw it.\n\n' +
        'Every bed in the city is spawned off cultures descended from a very small number of lines. Nobody knows how small. A dieback in the strain would take the flush galleries in a season, and the karst has no wild ground to re-collect from.',
      season: 'None. Beds are struck and spawned continuously; a gallery reckons in flushes, not in months',
      preparation:
        'Eaten fresh within a day, because it goes to black liquor fast. Sliced and dried on warm racks into cap boards that keep a year and rehydrate into something reasonable. Ground into a flour extender that stretches barley by a third in a bad course and turns the bread grey-violet, which is a colour the whole city reads instantly.\n\n' +
        'The pigment is fugitive and gets into everything: hands, cloth, water, teeth. A flush worker is identifiable across a market.',
      effects: TBD(
        'Does the spore load alone cause the gallery lung rot, or is it the compost dust and the still air as well? Nobody has separated the three, and the answer decides whether the beds can be made safe or only moved away from people.',
      ),
      value: 'Under a day-wage the basket at the bed door, and the cheapest calorie on the continent; cap boards trade at 3 a bundle up the Karst Fork',
      devNotes:
        PROPOSAL('Gallery cap is the manifest fungus staple; the twelve-day compost, the casing layer, the three-day flush, the narrow strain base and the class structure built on lumen-hours are proposed.') +
        '\n\nUse it for two things. First, as the reason the cave city survives things that should end it, which keeps famine plots from being simple. Second, as the setting\'s clearest example of a bargain a society has made and refuses to reopen: food without light, paid for in decades of other people\'s lives.\n\n' +
        '[[npc.bedel-lehun|Bedel Lehun]] grows something adjacent and unlisted on the fourth terrace that yields double in half the light and stops people sleeping. A party with [[skill.spore-lore|Spore Lore]] can identify it in an afternoon, which is the beginning of that problem and not the end of it. Keep the two strains distinct: gallery cap is legal, licensed and terrible for you slowly.',
    },
  }),

  E({
    id: 'food.sump-carp',
    type: 'food',
    name: 'Sump carp',
    aka: ['Blind carp', 'Mill fish'],
    status: 'draft',
    summary: 'Blind carp farmed in the karst flooded sumps on milling waste; carries a fluke that blinds anyone who eats it raw.',
    tags: ['livestock', 'protein', 'hollow-karst', 'disease', 'export'],
    fields: {
      overview:
        'Protein without pasture. There is no grazing in a cave and the karst cannot afford to feed a beast on grain it needs itself, so the city farms fish in the water it already has. The flooded sumps below [[district.cave-agrarian-city-sump-works|the Sump Works]] hold the resurgence, run the mill race and grow about eleven hundred tonnes of carp a year on waste nobody else wants.\n\n' +
        'The stock is blind and has been for many generations, which costs it nothing in a lightless sump and makes it trivially easy to net. It is also cold. Karst water sits near ten degrees in every month, so growth is slow: three years to a kilogram, against one on a surface pond. The city plans in three-year cohorts and a lost cohort is felt for three years, which is longer than most councils remember anything.\n\n' +
        'And it carries a fluke.',
      foodType: 'Livestock',
      grownIn: [REGION.hollowKarst, CITY.caveAgrarian],
      cultivation:
        'Six stepped sumps, stocked in cohorts and netted on a rotation. Feed is milling waste, spent [[food.gallery-cap|flush bed]] and the sweepings of the terraces, thrown in by the barrow. The fish are effectively a second pass over the city waste stream and return it as manure water, which is pumped back onto the barley terraces. The loop is genuinely elegant and is the karst best argument for itself.\n\n' +
        'Density is limited by dissolved air, not by food. The sumps are aerated by dropping the mill race over stepped boards, and when the race is stopped for repair the top sump has about nine hours before it starts killing fish. A water head can be closed far more discreetly than a light duct, which is why most of the city quiet coercion happens down here rather than on the terraces.\n\n' +
        'The fluke lives in a small brown snail on the sump walls, passes into the fish flesh as a cyst, and finishes its life in whatever eats the fish uncooked. In a person it travels, and where it settles most often is the eye.',
      season: 'Netted all year in three-year cohorts; the sumps sit near ten degrees in every month and have no season at all',
      preparation:
        'Cooked hard, always, and the city says so on every stall board. Boiled in the flush-house heat, or split, salted and hung in the warm draught over the beds until it is stiff. Sold live where possible so a buyer can see it move.\n\n' +
        'Eating it raw is not ignorance, it is fuel. Fuel in the karst is imported timber and dung cake, both of which cost money the lowest galleries do not have, and a household that has run out of fuel has fish and no way to cook it. The blindings track the fuel price with about a nine-month lag. [[npc.ossane-gorbea|The reeve office]] has been shown the correlation.',
      effects: [
        'Complete protein at a third the substrate cost of any land animal the karst could keep',
        'Salt-hung it keeps four months, which is what the export trade is built on',
        'Undercooked or raw it carries a fluke that migrates and commonly settles in the eye',
        'Blinding is not immediate: it takes months, so nobody connects a meal to an outcome',
      ],
      value: TBD(
        'Is carp sold by the fish or by the sump-share, and does a blinded buyer have any claim at all on the seller? The karst has no food law, only custom, and the custom has never been tested.',
      ),
      devNotes:
        PROPOSAL('Sump carp is the manifest karst protein; the cold-water growth rate, the cohort system, the mill-race aeration, the snail host and the fuel-price link to blinding are proposed.') +
        '\n\nThis is the entry to point at when someone asks whether the setting dark themes have mechanics behind them. The disease is preventable by cooking, cooking costs fuel, fuel is imported, and the import is priced by people who will never eat a carp. A party can buy a gallery a season of dung cake for a trivial sum and measurably reduce the blindings, which is the least heroic and most effective thing available to them in the karst.\n\n' +
        'Hook: the snail. Nobody has established whether it is native or arrived with the founding stock, and clearing it would mean draining sumps that the mills, the fish and the drinking supply all depend on.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Meridian Coast — the only real surplus on the continent        */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.meridian-olive',
    type: 'food',
    name: 'Meridian olive',
    aka: ['Terrace olive', 'Third press'],
    status: 'draft',
    summary: 'Terrace olive pressed three times for table, lamp and machine; the third pressing is why the coast machinery runs.',
    tags: ['crop', 'oil', 'meridian-coast', 'export', 'strategic'],
    fields: {
      overview:
        'The single most valuable plant on the continent, and it is valuable because of the worst of its oil rather than the best. First pressing is food. Second is lamp oil. Third, dark and acidic and unfit to eat, is the machine oil that [[city.mediterranean-city|the Mediterranean City]] runs its benches, drawbenches and conduit gear on. Every advanced machine on the coast is lubricated by a fruit, and the [[faction.conduit-college|Conduit College]] has quietly made itself the largest single buyer of the grade nobody wants.\n\n' +
        'The groves are the terraces above the city, walled in dry stone across [[district.mediterranean-city-terrace-groves|the Terrace Groves]], and they are old in a way that is hard to price. A grafted tree bears in its eighth year. A terrace does not reach full yield until the wall, the soil the wall holds and the root plate under it are two centuries old, which is why burning a grove is treated as an act of war rather than as arson, and why the city has twice gone to the brink over a fire it could not prove.\n\n' +
        'The pomace left after the third press is not waste either. Dried into cake it banks the fire at [[machine.the-verdigris-hearth|the Verdigris Hearth]] overnight, which means the copper smelt and the olive harvest are on the same calendar.',
      foodType: 'Crop',
      grownIn: [REGION.meridianCoast, CITY.mediterranean],
      cultivation:
        'Dry stone terraces, no irrigation, spacing wide enough that the trees never close canopy. The tree alternates: a heavy crop exhausts it and the following year is light. Growers fight this by thinning fruit in a heavy summer, which every grower agrees is correct and roughly half of them actually do, so the coast total swings by a third between years and the price swings further.\n\n' +
        'Picked by beating onto nets from late autumn into the first month of winter. From tree to mill in under two days, because a bruised olive begins turning its own oil acid within hours and acid oil is a lamp grade, not a table grade. The whole harvest is therefore a logistics problem rather than a farming one, and the mills run day and night for six weeks.\n\n' +
        'Table fruit is cured, and curing needs lye. The lye is made from soda ash out of [[machine.the-bittern-ladder|the Bittern Ladder]] in the Sifting City, which is laddered from pan liquor filtered through bone char, and the bone char is fired under the arena floor. Nobody on the coast says this out loud at a table.',
      season: TBD(
        'The picking date is set off the printed [[item.orrery-tables|Orrery tables]], and the Orrery has drifted. Has the coast been picking a day and a half early for nine years, and if so how much acid has that put into the table grade before anybody admits the instrument is wrong?',
      ),
      preparation:
        'First press cold, in stone mills, straight into sealed jars for the table. Second press with hot water for lamp oil. Third press hot and hard, and the result is filtered through cloth into machine oil. Then the pomace is dried and burnt.\n\n' +
        'Table fruit is slit, soaked to draw the bitterness, held a week in soda lye, washed for three days and finished in brine with fennel. Badly washed fruit is caustic and every year somebody sells it anyway.',
      effects: [
        'Fat and calories at a density no other coast crop reaches; the basis of the local diet',
        'Lamp grade burns clean enough for indoor work, which is why coast artisans keep longer hours than anyone',
        'Machine grade is the standing lubricant for the Mediterranean City tool trade; there is no substitute in production',
        'A light-crop year means the city chooses between eating, lighting and running its machines',
      ],
      value: '4 day-wages the jar of first press; 1 the lamp grade; under a day the machine grade, which is the grade the College buys forward by the year',
      devNotes:
        PROPOSAL('Meridian olive is the manifest coast staple; alternate bearing, the two-day mill window, the three grades, the soda-ash lye chain and the pomace at the Verdigris Hearth are proposed.') +
        '\n\nThe designer hook is the rationing question. In a light-crop year the same fruit has to serve as food, as light and as lubricant, and the three claimants are households, artisans and the Conduit College. The College has money and forward contracts. Households have a riot. There is no correct answer and that is the point: run it as an allocation argument the party can be hired by any of the three sides to influence.\n\n' +
        'Cross-links worth using: [[npc.melitta-aspri|Melitta Aspri]] tables set the picking date; [[quest.four-minutes-fast|Four Minutes Fast]] is therefore an agricultural quest wearing an instrument-maker coat; and any Greatwood blockade that stops charcoal also stops the smelt that eats the pomace, which puts the Tree City upstream of the olive price.',
    },
  }),

  E({
    id: 'food.terrace-citron',
    type: 'food',
    name: 'Terrace citron',
    aka: ['Gum-rot conserve', 'The barrel'],
    status: 'draft',
    summary: 'Glass-house citron boiled into a keeping conserve that stops gum-rot; about one barrel in five does nothing.',
    tags: ['preserved', 'medicine', 'meridian-coast', 'export', 'monopoly'],
    fields: {
      overview:
        'A citron is mostly rind. There is little juice in it and almost nothing to eat, and it is grown on the Meridian terraces for one property: eaten steadily, the conserve made from it prevents the gum-rot that loosens the teeth, opens old scars and kills mine crews and ships companies over a winter.\n\n' +
        'That makes a barrel of boiled fruit the most quietly powerful export on the continent. [[city.cave-agrarian-city|The cave city]] cannot grow fruit at all, because nothing that needs an insect gets pollinated underground, so it buys conserve at a price it cannot refuse and has not forgiven in living memory. [[city.sky-city|The Sky City]] buys it because cress is not enough. The Sifting City buys it for the pan crews and mostly does not issue it.\n\n' +
        'And roughly one barrel in five does nothing whatsoever. Crews on the failed barrels sicken on schedule while eating their ration every day, which the trade has always explained as adulteration, bad fruit or bad faith.',
      foodType: 'Preserved',
      grownIn: [REGION.meridianCoast, CITY.mediterranean],
      cultivation:
        'Grown against south-facing terrace walls under lean-to frames glazed with crown glass out of [[machine.the-frit-kiln|the Frit Kiln]], because the tree will not take a hard frost or a salt wind and the coast gets both, briefly, most winters. The frames are the expensive part: a glazed run is a capital asset that outlives the tree in it, and the glaziers are paid before the pickers.\n\n' +
        'The tree flowers more than once a year and carries fruit and blossom together, so there is fruit on a terrace in most months and a main cut in winter. Fruit is picked hard rather than ripe, because a soft citron will not hold its shape through a boiling.',
      season: 'Fruit in most months, main cut in winter; barrels are dated by boiling, not by picking',
      preparation:
        'The whole fruit, rind and pith, sliced and boiled repeatedly with honey and reduced grape must until it will keep, then barrelled and sealed. A barrel is a year of ration for four people.\n\n' +
        'Two kinds of house make it. The old vault houses boil in glazed earthenware over slow fires. The licensed houses, the modern ones, boil in lined copper pans because copper heats evenly and a copper house can turn out four times the volume. [[npc.anthimos-vellani|Anthimos Vellani]] and two other harbour physicians have kept records for eleven years and every failed barrel they have traced came out of a copper house. They have said so, in writing, to the [[faction.conduit-college|Conduit College]], which licenses copper work, certifies the pans and has declined to open the question.',
      effects: TBD(
        'What is actually being destroyed in the copper pans? The correlation is solid and the mechanism is unknown in-world. Decide whether the setting ever lets anyone prove it, because the moment it is proved the licensed houses are finished and the College with them.',
      ),
      value: '30 day-wages the sealed barrel at the mole, 55 by the time it reaches the karst galleries, and no buyer has ever successfully argued the price down',
      devNotes:
        PROPOSAL('Terrace citron is the manifest anti-gum-rot conserve; the glazed frames, the honey-and-must boiling, and the copper-pan failure correlation are proposed.') +
        '\n\nThis is a medical monopoly, not a magic item. Nothing about it is supernatural and everything about it is leverage: the coast holds the only cure for a disease that kills miners, sailors and pan crews, and sells it to cities that cannot make it. Any siege, blockade or embargo plot should ask who runs out of conserve first.\n\n' +
        'The one-in-five failure is a whole investigation and a genuinely nasty one, because the honest answer destroys the licensed trade, and the people who would be ruined are also the people who would have to certify the finding. Pair it with [[quest.pan-fever|Pan Fever]] if you want two cities discovering at the same time that their price list is the antagonist.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Greatwood and the Boreal Crown                                 */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.bole-mast',
    type: 'food',
    name: 'Bole mast',
    aka: ['Siege flour', 'The count'],
    status: 'draft',
    summary: 'The nut mast of the Greatwood colossal boles, leached and milled to flour; the Tree City siege reserve, on a calendar.',
    tags: ['forage', 'greatwood', 'tree-city', 'siege', 'famine-risk'],
    fields: {
      overview:
        'The great boles fruit heavily every four to seven years and hardly at all in between, all of them at once across the whole forest. It is the oldest strategy in the wood: nothing that eats the nuts can breed fast enough to keep up with a mast year, so most of the crop survives, and in the lean years the eaters starve back down. [[city.tree-city|The Tree City]] is one of the eaters, and it has built its entire strategic posture around the fact that it can read the calendar.\n\n' +
        'A mast year gives the city about four years of stored flour in ten days of frantic gathering. The [[faction.pitchguard|Pitchguard]] holds it, not the households: the siege reserve is Marshalcy property, stored in pitch-lined bins in [[district.tree-city-underroot|Underroot]], and it currently stands at about eleven months with no mast due. Every soldier in the city knows that number. So does everyone the city takes tribute grain from.\n\n' +
        'The emergence of [[creature.bolewright-wasp|bolewright wasps]] follows the mast year, because the sugar flush is the cue. The famine calendar and the infestation calendar are the same calendar, and only one of them is counted.',
      foodType: 'Forage',
      grownIn: [REGION.greatwood, CITY.treeCity],
      cultivation:
        'Nothing is cultivated. The boles are three centuries old and were not planted by anyone alive, and the crop is gathered rather than farmed: nets rigged across the gallery levels to catch the fall, sweeping crews on the forest floor, and about ten days of scramble in autumn, because mast left on wet ground rots inside a fortnight.\n\n' +
        'Gathering rights are the real crop. The pale is Marshalcy ground and gathering outside it without a chit is poaching, which is tried under the same law as [[skill.wire-and-snare|snaring]] and hanged the same way. The tribute villages gather under quota, deliver, and are then issued back a fraction of what they brought in, a system [[npc.saarik-rauda|the gate-sergeants]] administer and take their cut of in seed grain rather than coin.',
      season: TBD(
        'Will the boles still mast on the four-to-seven-year cycle now that heart rot is in six of them? The synchrony is what protects the crop from the wasps, and if it has already broken, the Tree City famine calendar stops being predictable in the one generation that most needs it to be.',
      ),
      preparation:
        'Raw mast is bitter and binding, heavy with tannin, and will make a person ill if it is eaten straight. It is shelled, ground coarse, and leached: either in running water in slatted cribs for three days, or fast in wood-ash lye out of [[machine.the-pitchworks|the Pitchworks]] and then washed hard. Fast leaching costs less time and more flavour, and the Marshalcy specifies it because the Marshalcy is storing for a siege and not for a table.\n\n' +
        'Leached meal is dried, milled and packed into pitch-lined bins where it keeps four years and more. Unleached nuts keep months, because the fat in them turns. The whole processing chain exists to convert a two-month food into a four-year one, and it is the reason the Tree City can refuse terms.',
      effects: [
        'Four years of storage life from a crop that would otherwise rot in a fortnight',
        'Dense, filling and dull; a mast-flour diet is survivable and nobody pretends to enjoy it',
        'Under-leached flour causes cramping, constipation and, over a winter, kidney damage',
        'The reserve is Marshalcy property: eating it is a decision made by a commander, not by a household',
      ],
      value: 'Not sold inside the pale. Requisitioned at a posted rate, and outside the pale a sack has been worth a season of labour in a bad year',
      devNotes:
        PROPOSAL('Bole mast is the manifest Greatwood staple; predator-satiation masting, the tannin leaching, the wood-ash lye shortcut and the pitch-lined bins are proposed.') +
        '\n\nThe design value here is a public countdown. Everyone in the Greatwood knows the reserve figure and the years since the last mast, so the Tree City politics can be run entirely on arithmetic that the players can also do. When the reserve drops under a year, the conscription rolls get hungrier, [[npc.aune-mustsalu|the Bole-Marshal]] forged deaths get harder to hide, and the argument about felling infested quarters stops being about disease.\n\n' +
        'Between masts the city eats tribute grain and bought bread, which means the most militarised settlement on the continent spends most of every decade dependent on the roads and the river it does not control. That is the lever to pull if you want the Pitchguard doing something out of character.',
    },
  }),

  E({
    id: 'food.cache-fat',
    type: 'food',
    name: 'Cache fat',
    aka: ['Pit fat', 'Five-winter'],
    status: 'draft',
    summary: 'Rendered lamphorn fat and crowberry buried in pits across the taiga; robbing a cache is treated as attempted murder.',
    tags: ['preserved', 'boreal-crown', 'travel', 'survival'],
    fields: {
      overview:
        'North of the treeline the problem is not food, it is the eleven hours between dusk and any prospect of warmth, and the arithmetic of carrying enough fuel to stay alive while walking far enough to matter. Cache fat solves it by moving the calories off the traveller back and into the ground ahead of them.\n\n' +
        'Rendered fat from culled [[creature.lamphorn|lamphorn]] stags, packed with crowberry and buried in pits along a route, keeps five winters. A fist-sized lump is a day of walking. The clans do not cache to store surplus; they cache to make a route walkable, which is why robbing a cache is treated in the taiga as attempted murder rather than as theft. The person who buried it planned a crossing around it and will die on that crossing without it.\n\n' +
        'There is no settlement up here to enforce any of this. The law is a custom held by people who all know each other and all travel the same ground.',
      foodType: 'Preserved',
      grownIn: [REGION.borealCrown],
      cultivation:
        'Not grown. The herds are herded rather than hunted: lamphorn are worked on fixed circuits between lichen ground and birch scrub, and the fungal light in the antler velvet is the reason the animal is worth more alive than dead. Stags are culled at the end of the short summer, when the fat is on them, and one culled stag is hide, sinew, meat for the camp and about forty kilograms of renderable fat.\n\n' +
        'A badly killed stag loses the fungal strain, so the cull is done by people who care more about next year lamps than this year fat, which quietly rations the whole supply.',
      season: 'Rendered in the six weeks after the summer cull; opened in any winter of the following five',
      preparation:
        'Fat is rendered in three separate heats to drive off every trace of water, because water is what turns a cache. It is then poured hot over crowberry, which is acid enough to hold the fat sweet for years, into a pit lined with birch bark, capped with a flat stone and turfed over.\n\n' +
        'The pit is not marked. It is remembered as a sightline: three landmarks that intersect at one point, held in the head of whoever buried it and told to two other people. Written directions to a cache are considered a serious breach and, occasionally, evidence of an intention to sell one.',
      effects: [
        'Roughly a day of hard walking in cold from a fist-sized lump',
        'Keeps five winters buried, and about a fortnight once the pit is opened',
        'A cache turns a two-week crossing into a route rather than a gamble',
        'Robbing one is prosecuted, where anyone is prosecuting, as attempted murder',
      ],
      value: TBD(
        'What is a cache worth as property? The taiga treats robbing one as attempted murder and has no word at all for selling one, which means every outsider who buys a sightline is buying something the seller may not be able to sell.',
      ),
      devNotes:
        PROPOSAL('Cache fat is the manifest Boreal Crown preserved good; rendering in three heats, the crowberry acid, birch-bark pits and the three-landmark sightline are proposed.') +
        '\n\nMechanically this is the northern travel budget. A party crossing the Boreal Crown either carries everything, which is slow and heavy, or works the cache network, which means being trusted by people who have every reason not to trust them. [[skill.cold-camp|Cold Camp]] covers siting, burying and finding; without it a party can be told where a cache is and still fail to find it, which is a better failure than a die roll.\n\n' +
        'There is no city in the Boreal Crown and this entry is deliberately the only infrastructure up there. Do not add a settlement to explain it.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Ashen Steppe, the White Pans, the Cinder Waste                 */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.steppe-sour',
    type: 'food',
    name: 'Steppe sour',
    aka: ['Sour', 'Card-day milk'],
    status: 'draft',
    summary: 'Soured mare milk, faintly alcoholic, drunk by the skinful at the Sunken Ring; the herds are the steppe real wealth.',
    tags: ['drink', 'ashen-steppe', 'arena-city', 'herds', 'theft'],
    fields: {
      overview:
        'Most of the calories the arena crowd takes in on a card day arrive as a drink. Steppe sour is milk soured to a thin, sharp, faintly fizzy liquid that is about as strong as a weak beer, and it is drunk by the skin rather than the cup. It is cheap because the animals are already there and the milk would otherwise be useless.\n\n' +
        'The fermentation is the point. Fresh milk in that quantity would flatten a grown adult; the souring consumes the milk sugar, which is why the drovers can drink two litres of it and a coast merchant cannot drink one. Nobody on the steppe has a theory about this and everybody knows it is true.\n\n' +
        'The herds that produce it are [[district.arena-city-drovers-camp|the drovers]] actual wealth and [[city.arena-city|the Arena City]] main theft problem. The clans can close the city meat and milk supply in a day, have said so publicly, and are one of the very few groups in the Ashen Steppe with real leverage over the Ring.',
      foodType: 'Drink',
      grownIn: [REGION.ashenSteppe, CITY.arenaCity],
      cultivation: TBD(
        'What animal is actually milked out there? Mare is the working assumption, the [[creature.yokeback|yokeback]] is a grazer and not a milk beast, and no herd animal has been written for the Ashen Steppe. Either there are ordinary horses on the steppe or there is a species nobody has drawn yet, and the answer changes the drovers whole economy.',
      ),
      season: 'From foaling to the first hard frost. There is no fresh sour in winter, which restructures the whole fight card year',
      preparation:
        'Milk goes into a hide bag and is churned, several thousand strokes a day, for two days. The bag is never washed. The culture lives in the seams and in the grain of the leather, so a household bag is a lineage: it is inherited, it is named, and a stolen bag is a theft of something that cannot be bought back at any price.\n\n' +
        'Winter is handled two ways. Surplus summer milk is drained, pressed and dried into rock-hard curd that keeps a year and is gnawed rather than eaten. And a skin left out on a still winter night throws ice, which is skimmed off; do that three times and what is left in the bottom is strong enough to matter. That is what the banner houses drink and it is not sold at the stands.',
      effects: [
        'Cheap calories, mild intoxication and a great deal of it before anyone is properly drunk',
        'The souring eats the milk sugar, so adults drink it in volumes that fresh milk would make impossible',
        'Nothing against gum-rot: a winter on sour and meat alone is a winter of loose teeth',
        'Available only between foaling and first frost, so the winter card season runs on imported drink at four times the price',
      ],
      value: 'Under a day-wage the skin at the drovers ground and about triple that inside the stands, where the Ring takes its cut of everything poured',
      devNotes:
        PROPOSAL('Steppe sour is the manifest arena drink; the unwashed bag culture, the lactose argument, the winter curd and the freeze-concentrated spirit are proposed.') +
        '\n\nThe useful design object here is the seasonal cliff. Between the first frost and foaling there is no local drink at all, the stands run on imported spirit, and the crowd is poorer, colder and meaner. If you want a riot, put it in the winter card season.\n\n' +
        'The leverage hook is simpler: the drovers can shut off meat and milk in a day. Any Arena City plot where the Ring needs the crowd fed should have to negotiate with people who have no interest whatsoever in the Ring except as a customer.',
    },
  }),

  E({
    id: 'food.sift-cake',
    type: 'food',
    name: 'Sift cake',
    aka: ['Ration slab', 'Pan cake'],
    status: 'draft',
    summary: 'Pressed brine shrimp and pan algae dried into iron-tasting slabs, issued to sift crews against their debt.',
    tags: ['prepared', 'white-pans', 'sifting-city', 'ration', 'indenture', 'dark'],
    fields: {
      overview:
        'Nothing grows in [[region.white-pans|the White Pans]] and almost everything eaten there walks in, which is expensive, so [[city.sifting-city|the Sifting City]] feeds its crews on what lives in the brine. The standing liquor below the tower line carries brine shrimp in enormous numbers and a fine red-orange alga that blooms after every wet season. Both are netted, pressed and dried on the hot pan floor into slabs the size of a hand.\n\n' +
        'It is genuinely nutritious. It is also mostly salt, and that is the part the ration system does not print. A crew eating sift cake needs more water, and water in the Sifting City is drawn under a posted daily allocation at [[district.sifting-city-the-water-court|the Water Court]] and is not free. The food ration increases the water bill, and both are charged against the same bond.\n\n' +
        'Rations are issued against debt. Eating less is therefore a way of buying time off a term, and the crews do it, and everyone in the assay trade knows they do it.',
      foodType: 'Prepared',
      grownIn: [REGION.whitePans, CITY.siftingCity],
      cultivation:
        'The shrimp are not farmed so much as allowed. Pan liquor spilling off [[machine.the-sieve-cascade|the Sieve Cascade]] is run into shallow standing ponds where it warms, the alga blooms in it, and the shrimp eat the alga. The ponds are dragged with fine nets twice a week by crews who are usually children, because the pond floor is soft crust and will not carry an adult.\n\n' +
        'The same liquor is what [[machine.the-bittern-ladder|the Bittern Ladder]] wants for soda ash. Cake and soda ash are therefore in direct competition for the same stream, and when the ash price rises the ration ponds are run thin. Nobody has ever had to write that decision down.',
      season: TBD(
        'Does the alga still bloom every wet season, or is the liquor now too concentrated for it? The Sieve Company counts sift and not shrimp, so there is no series of numbers anywhere, and a failing bloom would be invisible until the ration failed.',
      ),
      preparation:
        'Netted, drained, pressed between boards, and dried on bare pan floor in a day. The slab comes out brick-hard, orange-brown, and tastes of iron and low tide. It must be broken up and soaked before eating; eaten dry it strips the inside of the mouth, which is how a new crew is identified.\n\n' +
        'Cooked, it is boiled into a grey porridge with whatever grain the shed has. Most crews do not cook it, because fuel in the Pans is imported and metered exactly like water.',
      effects: [
        'Complete protein and a real ration; crews on it can work, which is the whole point',
        'A heavy salt load with every meal, so eating drives a water cost that is billed to the same bond',
        'Years on it produce the stones and the kidney failure the pan sheds call the pan thirst',
        'Keeps indefinitely dry, which is why it is issued rather than anything better',
      ],
      value: 'Not priced in coin at the sheds. Issued at a rate of two slabs a shift and booked against the bond at 1 day-wage the four, which is roughly triple what the netting costs',
      devNotes:
        PROPOSAL('Sift cake is the manifest Sifting City ration; brine shrimp and hypersaline algae, the shared liquor stream with the Bittern Ladder, and the salt-drives-water-cost loop are proposed.') +
        '\n\nThis entry exists to make indenture legible as arithmetic rather than as atmosphere. The bond charges the ration. The ration drives thirst. The thirst is charged. A crew that eats less shortens its term and shortens its life, and the company books both outcomes as normal. Play it through the ledger, never through a whipping.\n\n' +
        'Ties directly into [[quest.pan-fever|Pan Fever]]: the fraction that pays best is the fraction the crews keep breathing, and the same company sets the ration. [[npc.tazrit-nourem|Tazrit n\'Ourem]] holds the papers on about a third of the pan crews, and the argument she uses for keeping them is that freeing them starts a fight about who feeds them. This is what feeding them looks like.',
    },
  }),

  E({
    id: 'food.dew-melon',
    type: 'food',
    name: 'Dew melon',
    aka: ['Water melon', 'The two-day'],
    status: 'draft',
    summary: 'Desert melon grown on condensation nets and carried as water rather than as food; currency on the Cinder Waste roads.',
    tags: ['crop', 'cinder-waste', 'orath', 'water', 'travel', 'currency'],
    fields: {
      overview:
        'A hard-rinded melon with pale, almost tasteless flesh and very little sugar in it. It is not really a food. It is four and a half kilograms of clean water in a container that grew itself, and that is exactly how the roads treat it: a melon is two days, and distances on the water road are quoted in melons before they are quoted in leagues.\n\n' +
        'This makes it money. A traveller who has melons can cross, and a traveller who has none cannot, so a melon is accepted for goods, for labour and for silence right across the [[region.cinder-waste|Cinder Waste]] margin. [[npc.kavel-uur|Kavel Uur]] pays his crews partly in fruit and keeps a private count of who goes into the waste and who comes out, which is a count of melons as much as of people.\n\n' +
        '[[city.orath|Orath]] grows them on nets in the ground outside the wall. What else Orath does is not written and this entry does not fill it in.',
      foodType: 'Crop',
      grownIn: [REGION.cinderWaste, CITY.orath],
      cultivation:
        'Two techniques, both about catching water rather than applying it. First, the nets: fine mesh stretched on frames facing the night sky, which radiate heat, drop below the dew point and run condensate down into a buried pot at the root of each vine. Second, the pits: each vine sits in a shallow sunken bed with a ring of stones round it, so what little rain falls runs inward and stays out of the wind.\n\n' +
        'The nets themselves come up the road as condemned [[item.sift-screen|sift screens]] from the Sifting City. Screens are rated by count, wear out fast and are never sold second-hand for sifting, which is a rule about the sifting trade and not about the fruit trade. Every net on the Cinder Waste margin is a screen that failed an assay.\n\n' +
        'The vine sprawls flat to shade its own root and is left alone once it has taken. Nothing is weeded, because there is nothing to weed.',
      season: 'Sown within a fortnight of the rains, cut about a hundred and ten days later, and then nothing until the rains come again',
      preparation:
        'Split with a knife and eaten on the spot, or opened at one end and drunk from over two days. The rind is bitter and goes to the animals. The seed is roasted and pressed for a thin oil, which is most of the fat anyone out there gets.\n\n' +
        'A melon carried too long ferments inside its own skin and is then worth nothing, so a caravan eats in the order the fruit was picked and a driver who mixes his stack is not employed twice.',
      effects: [
        'About two days of drinking water per fruit, carried without a skin, a cask or a cart',
        'Very little food value: it is water, and a party living on melons is starving comfortably',
        'Passes as currency the length of the water road, which makes it a bribe as often as a meal',
        'A fermented fruit is a spoiled ration and nobody can tell from the outside',
      ],
      value: TBD(
        'A melon is two days of water and spends as money on the road. What is one worth in a town that has a well, and does anyone at Orath actually take coin for them, or only labour and carriage?',
      ),
      devNotes:
        PROPOSAL('Dew melon is the manifest desert water crop; radiative condensation nets, sunken microcatchments, the condemned-sift-screen supply and the melon-as-unit-of-account are proposed.') +
        '\n\nUse it as the survival economy of the south. [[skill.the-far-walk|The Far Walk]] is consumption arithmetic and melons are the units, so a crossing can be run as an open budget the players manage rather than as a hidden roll. [[quest.written-off|Written Off]] already requires them.\n\n' +
        'Keep Orath thin. This entry establishes that melons are grown at [[district.orath-the-tank-yard|the Tank Yard]] margin and nothing else about the place. Do not use the melon trade to invent Orath a history.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Drown                                                          */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.tide-rice',
    type: 'food',
    name: 'Tide rice',
    aka: ['Mat rice', 'Boat rice'],
    status: 'draft',
    summary: 'Brackish deepwater rice cut from boats on the Drown shifting mats; a badly timed sluice release drowns the lot.',
    tags: ['crop', 'the-drown', 'floating-swamp', 'famine-risk', 'black-weir'],
    fields: {
      overview:
        'Rice that races the water. The landrace grown on the Drown mats can put on twenty centimetres of stem in a day if it has to, keeping its leaves above a rising river, which is why a delta that floods twice a year can be a grain country at all. It has no bunds, no ploughing, no transplanting and no fields in any sense a coast farmer would recognise. It is broadcast onto living [[creature.raftbloom|raftbloom]] mat and cut from a boat.\n\n' +
        'It also has a limit, and the limit is the whole politics of the delta. The stem can outrun a slow rise. It cannot outrun a metre of water in four hours, which is what a scheduled release out of [[landmark.the-weir-gates|the Weir Gates]] puts onto the low lots. Drowned rice does not recover: it rots off at the node and the season is gone.\n\n' +
        'The other failure is the opposite one. In a low-water season the salt wedge pushes up the channels, and rice that will tolerate brackish water will not tolerate seawater. Too much river and too little river both kill it, and one book in one room at [[city.black-weir|the Black Weir]] decides which the delta gets.',
      foodType: 'Crop',
      grownIn: [REGION.theDrown, CITY.floatingSwamp],
      cultivation:
        'Seed is sprouted in baskets and broadcast by hand from a punt onto the mats as the water starts to make. Nothing is planted in soil; the roots take into the mat, which is itself alive and rotting on a two-year clock, so a good rice mat is a mat at a particular stage of decay and reading that stage is a trade of its own. [[skill.marsh-footing|Marsh Footing]] is not optional here, it is the job.\n\n' +
        'Two crops a year, timed off the water rather than off the calendar. There is no weeding and no fertiliser: the delta brings silt down and the mats bring iron up, and what limits the yield is water depth and salt, not fertility. Yields are erratic and enormous in a good year, which is why nobody has ever managed to build a reliable store out of it.\n\n' +
        'The standing water that grows the rice is also where the marsh fever breeds. The mats are the crop and the vector both, and [[item.fever-clay|fever clay]] is imported by the raft-load in the months after each cut.',
      season: 'Two crops, cut roughly five months apart on the water, both of them inside the Weir schedule',
      preparation:
        'Cut with a short sickle from a boat, panicles only, and stacked wet, which means it has to be dried within a day or it heats and sours. Threshed by foot on raft decks, parboiled in the husk over fen-gas burners, dried again and then husked in a foot pounder.\n\n' +
        'Parboiling before husking drives goodness into the grain and hardens it so it does not shatter in the pounder, and it is the reason delta rice keeps at all on a raft. The red bran is never polished off, because there is nothing else to eat with it.',
      effects: TBD(
        'How much salt does the landrace really take before the panicle blanks? Nobody has measured it, and the number decides how far down the delta [[city.floating-swamp-settlement|the settlement]] can moor and still eat, which is the argument at the bottom of every re-moor.',
      ),
      value: '2 day-wages the boat-load green at the lots, and roughly 5 by the time it has passed the toll house, the toll being most of the difference',
      devNotes:
        PROPOSAL('Tide rice is the manifest delta staple; stem elongation, mat broadcasting, the salt-wedge failure and the parboiling chain are proposed.') +
        '\n\nThe whole reason [[mechanic.the-sluice-book|the Sluice Book]] has teeth. A gate-hour is not an abstraction: it is somebody season of rice, four hours later, and the schedule is written down in a room [[npc.ost-vennick|Ost Vennick]] sleeps in. Any delta plot should be able to answer the question "whose rice" before it answers "whose fault".\n\n' +
        'Both directions matter. A cordon that closes the gates to stop a fever, as in [[quest.clean-bills|Clean Bills]], also stops the river bringing everything the delta eats. The delta cannot be saved and quarantined at the same time, and the entry exists so that trade-off has a crop attached to it rather than a mood.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The basin, the shelf and the mountains                             */
  /* ---------------------------------------------------------------- */

  E({
    id: 'food.stair-loaf',
    type: 'food',
    name: 'Stair loaf',
    aka: ['The posted loaf', 'Landing bread'],
    status: 'draft',
    summary: 'Dense sour loaf at a fixed weight, repriced every morning at every hoist landing; the basin index of unrest.',
    tags: ['prepared', 'bread', 'gilded-ascent', 'politics', 'index'],
    fields: {
      overview:
        'A dark, dense, long-soured loaf of a fixed weight, sold at every hoist landing on [[landmark.the-counting-stair|the Counting Stair]] and at the yard gates below. It is bread, and it is also the only public price series the continent has.\n\n' +
        'Other cities fix the price of bread and let the weight fall when grain is dear. The Gilded Ascent does the reverse deliberately: the loaf is 900 grams and the price is chalked afresh each morning before the first hoist. A posted price is a number everybody in the city reads on the way to work. A shaved weight is a fraud nobody notices for a month. The [[faction.concord-of-weights|Concord]] built a city on the proposition that a trustworthy weight is worth paying for, and would look ridiculous doing it any other way.\n\n' +
        'So the counting houses read the board, the [[faction.standing-hour|Standing Hour]] stewards read the board, and three days of a rising loaf will have the Assembly cancelling licences to be seen doing something. Anyone with [[skill.market-ear|Market Ear]] reads the same signal for nothing, which is exactly why several houses would prefer the signal were harder to hear.',
      foodType: 'Prepared',
      grownIn: [CITY.gildedAscent],
      cultivation:
        'The basin grows almost none of its own bread grain, which is the fact underneath everything else here. The blend is coast wheat up the Long Water, [[food.mirror-barley|mirror barley]] down the Karst Fork, and, in a genuinely bad month, [[food.bole-mast|mast flour]] out of the Greatwood. Each of the three darkens and coarsens the crumb more than the last.\n\n' +
        'That makes the loaf legible twice over. The price says what the market thinks. The colour says what the bakers have actually been able to buy, and the colour cannot be chalked. Wharf factors have been known to buy a loaf at three landings before they open a position.',
      season: 'None. Three bakes a day, every day, and a price posted before the first hoist moves',
      preparation:
        'An eighteen-hour sour in wooden troughs, baked in the vault ovens on the fourth terrace where the stone holds heat between bakes, and timed to the hoist shifts so that a landing has hot bread when a shift comes off. Crust hard enough to be a problem, crumb tight, keeps four days and is arguably better on the third.\n\n' +
        'Every loaf is weighed off the peel against a bench weight sealed at [[machine.the-assay-cage|the Assay Cage]], and every bakery bench weight traces back to [[landmark.the-brass-standard|the Brass Standard]] under the Stair. Short weight is prosecuted as a weights offence rather than as a food one, and prosecuted hard, because the loaf is the most-weighed object in the city and the credibility of the standard is the credibility of the Ascent.',
      effects: [
        'A day of bread for one adult at a posted, public price',
        'Keeps four days, travels badly, and is the standard ration on every barge and cart out of the basin',
        'The board price is the basin unrest index and is read as such by every faction in the city',
        'The crumb colour reports the true supply position regardless of what the board says',
      ],
      value: TBD(
        'The price is posted every morning and nobody has written the series down. What does a loaf cost on an ordinary day, in day-wages, and at what number does the Assembly start cancelling licences?',
      ),
      devNotes:
        PROPOSAL('Stair loaf is the manifest Ascent staple; the fixed weight against a posted price, the three-grain blend, the colour-as-signal and the weights-offence prosecution are proposed.') +
        '\n\nThe most useful thing in this entry is that it turns a supply chain into a prop. A party can hold the day loaf, and its price and colour tell them the state of the karst harvest, the Karst Fork toll, the coast shipping and the mood of the Under Stair, all without a single exposition scene.\n\n' +
        'Faking the posted price is already a crime; forging bench weights is [[quest.short-weight|Short Weight]] one terrace down. And the reserve behind the loaf is the same fiction as everything else here: the bakers guild says thirty days of flour and holds about four, which is a smaller version of what [[npc.wessel-ondriek|Wessel Ondriek]] is doing with the Stair reserve, and would surface first.',
    },
  }),

  E({
    id: 'food.lattice-cress',
    type: 'food',
    name: 'Lattice cress',
    aka: ['Mast trays', 'Green damp'],
    status: 'draft',
    summary: 'Cress and alga trays farmed on condensed thermal damp along the Sky City masts; the only food the city grows, and no calories.',
    tags: ['crop', 'sky-city', 'anvil-shelf', 'siege', 'dependency'],
    fields: {
      overview:
        'Everything [[city.sky-city|the Sky City]] eats comes up on a rope except this. Shallow trays of cress and a green river alga are racked along the mast lines and the inner lattice through [[district.sky-city-mooring-ring|the Mooring Ring]], watered on damp condensed out of the rising air, and cut on a ten-day rotation.\n\n' +
        'The trays are also the neatest illustration of what the city actually is. Cress is water, sharpness and whatever the plant has managed to concentrate; it is not calories. The Sky City grows its vitamins and imports every single calorie it consumes. Four weeks without lift traffic and it is starving in a way no siege engine could arrange, and the trays would not slow it down by a day.\n\n' +
        'The [[faction.mooring-assize|Assize]] keeps a reserve it describes as thirty days. It is eleven, and it has been shaved for six years.',
      foodType: 'Crop',
      grownIn: [CITY.skyCity, REGION.anvilShelf],
      cultivation:
        'Trays are 40 millimetres of matting on [[material.glasscane|glasscane]] frames, because soil is mass and mass is licensed. Nothing here is grown in earth. Seed goes onto wet matting, germinates in four days and is cut at ten to fourteen, which is the fastest food-to-plate cycle anywhere on the continent and the only reason the system pays for the weight it costs.\n\n' +
        'Water is condensed, not carried. The updraught off the shelf is humid, and cold plates rigged on the windward lattice run enough overnight condensate to keep the trays through the following day. The alga trays are shallower and greener and want the warmer inside faces.\n\n' +
        'Every tray is assessed under [[mechanic.mass-warrant|the Mass Warrant]], tare and wet weight both, which makes a tray allowance a licensed carrying capacity with a plant on top of it. Ballast-runners have understood this for years, and the difference between a tray declared wet and a tray declared dry is enough to move a great deal of something else.',
      season: TBD(
        'How many genuinely still days does the Anvil Shelf get in a year? The Assize holds the survey and has never published it, and the same number answers both questions at once: how often the trays brown, and how close the updraught is to not holding a city up.',
      ),
      preparation:
        'Cut with shears and eaten raw within the hour, mostly as a mat of it folded into imported bread. The alga is pressed into flat green cakes, dried on the warm lattice faces and eaten with oil; it tastes of a pond and every crew jokes about it in the same three ways.\n\n' +
        'Nothing is cooked, because fuel aloft is weight and there is a permanent nervousness about open flame within reach of a gas-handling city.',
      effects: [
        'Prevents gum-rot in a city that would otherwise have none of its own fresh food',
        'Provides essentially no calories: the Sky City imports one hundred per cent of what feeds it',
        'A week of still air browns the trays, and the same still air is why the city sinks',
        'Tray mass allowances are a standing smuggling loophole and are audited less often than freight',
      ],
      value: 'Under a day-wage the tray at the racks, and worth far more as declared tare than as food, which is a sentence the Assize dislikes hearing',
      devNotes:
        PROPOSAL('Lattice cress is the manifest Sky City crop; the matting trays, condensate plates, the ten-day cut and the deliberate point that it supplies no calories at all are proposed.') +
        '\n\nWrite the Sky City as the most food-insecure settlement in the world and this entry is the proof. It is not that it grows too little; it is that what it grows is the wrong thing on purpose, because the wrong thing is the only thing light enough to be legal.\n\n' +
        'Two hooks. The siege one: anything that interrupts lift for a month ends the city, and the reserve figure is forged, so the crisis arrives nineteen days before anyone in the Crown Houses expects it. And the smuggling one: tray allowances are carry weight with a plant on it, and [[npc.perrine-orlaunt|Perrine Orlaunt]] is not the only person who has noticed.',
    },
  }),

  E({
    id: 'food.adit-cheese',
    type: 'food',
    name: 'Adit cheese',
    aka: ['Wheel', 'Month-wage'],
    status: 'draft',
    summary: 'Hard mountain cheese aged in worked-out Ironback adits; a wheel is a month wage, a bribe and loan collateral.',
    tags: ['preserved', 'ironback', 'currency', 'collateral', 'trade'],
    fields: {
      overview:
        'A worked-out adit is a bad mine and a superb cellar: eight to ten degrees, saturated air, no seasonal swing and no light, held steady by a mountain. The Ironback herders worked this out at some point and the region now turns summer milk into 34-kilogram wheels that keep two years without a cellar of any other kind.\n\n' +
        'Which turns a cheese into money. A wheel is roughly a month wage, keeps, does not spoil in transit, cannot be counterfeited easily and can be cut into halves and quarters that everybody agrees on. Wages are paid in wheels in the mining camps. Bribes are paid in wheels. And counting houses on [[city.gilded-ascent|the Ascent]] will lend against stacked wheels at about eighty per cent of face under [[mechanic.standing-ledger|the Standing Ledger]], holding the stack in a bonded vault and inspecting it twice a year, which is the least glamorous collateral in the basin and the least likely to walk.\n\n' +
        'There is no city in the Ironback. This is what the range exports besides ore, and it is the only thing it exports that the people who make it own.',
      foodType: 'Preserved',
      grownIn: [REGION.ironback],
      cultivation:
        'Herds go up to the high pasture as the snow clears and come down before the first storms, and the whole cheese year is those hundred days. Milk is worked raw within an hour of milking, at the summer huts, because carrying milk down a mountain is carrying water.\n\n' +
        'Pasture makes the cheese. Wheels off the eastern seep pastures, where the grazing runs over metal-rich ground, come out faintly metallic and are prized by buyers who describe the taste as clean. Wheels off pasture downwind of the [[deposit.sour-lodes|roast yards]] come out sulphurous and unsellable, and the pastures ruined that way have been retreating uphill for two generations. The roast yards make the money, the lung rot and, quietly, the end of the cheese trade on that flank.',
      season: 'Made across about a hundred days of high summer; drawn from the adits two years later, so a good pasture year prices out two years afterwards',
      preparation:
        'Raw milk, animal rennet, curd cut to grains the size of wheat and scalded in a copper over a wood fire, then gathered in a cloth, pressed hard overnight and brined for a day per kilogram. The wheel then goes into an adit on a plank rack and is turned, brushed and rubbed with brine twice a week for two years by a cellar-hand who does nothing else.\n\n' +
        'The rind ends up thick, grey and inedible, which is the point: it is the packaging. Nothing else about the wheel needs protecting.',
      effects: TBD(
        'Does the metallic cheese off the seep pastures do anything to the people who eat it? Buyers pay a premium for the taste, the herding families have a word for the tremor their old people get, and nobody has put the two facts in the same sentence in public.',
      ),
      value: '18 day-wages the whole wheel at the adit door, 26 in the basin, and discounted to about 80 per cent of face when it is pledged as collateral on the Stair',
      devNotes:
        PROPOSAL('Adit cheese is the manifest Ironback preserved good; alpine summer dairying, adit ageing, the wheel as wage and collateral, and the roast-yard damage to the pastures are proposed.') +
        '\n\nThe conflict to hang on this is a straight collision of two industries that need the same holes. When scaldstone prices rise, mine companies want to reopen worked-out adits, and reopening an adit destroys the ageing stock inside it and the cellars for a decade. The wheels currently in there are also collateral against loans in the Gilded Ascent, so a reopening is simultaneously a mining decision, a food decision and a credit event. That is three factions and no violence required.\n\n' +
        'Also useful as a portable, non-magical store of value for parties who do not want to carry paper. A wheel is heavy, obvious and universally accepted, which makes it a very different smuggling problem from a [[item.stair-writ|stair writ]].',
    },
  }),
]

export const relations: SeedRelation[] = [
  /* Where each food comes from -------------------------------------- */
  R('food.mirror-barley', 'located_in', REGION.hollowKarst, 'the lit terraces, on made soil nine years in the building'),
  R('food.mirror-barley', 'located_in', 'district.cave-agrarian-city-sunwell-terraces', 'the top bedding plane, under the shaft mouth'),
  R('food.gallery-cap', 'located_in', REGION.hollowKarst, 'the unlit third plane; no light allocation at all'),
  R('food.gallery-cap', 'located_in', 'district.cave-agrarian-city-flush-galleries', 'beds struck and spawned continuously, flushing every third day'),
  R('food.sump-carp', 'located_in', REGION.hollowKarst, 'six stepped sumps on the resurgence'),
  R('food.sump-carp', 'located_in', 'district.cave-agrarian-city-sump-works', 'stocked in three-year cohorts and netted on rotation'),
  R('food.meridian-olive', 'located_in', REGION.meridianCoast, 'dry stone terraces, unirrigated, two centuries to full yield'),
  R('food.meridian-olive', 'located_in', 'district.mediterranean-city-terrace-groves', 'walled groves above the city, and the mills that run six weeks a year'),
  R('food.terrace-citron', 'located_in', REGION.meridianCoast, 'glazed lean-to frames against south-facing terrace walls'),
  R('food.terrace-citron', 'located_in', 'district.mediterranean-city-vault-quarter', 'the old vault houses boil in earthenware; the licensed houses boil in copper'),
  R('food.bole-mast', 'located_in', REGION.greatwood, 'gathered off the floor and out of nets in ten days of autumn'),
  R('food.bole-mast', 'located_in', 'district.tree-city-underroot', 'pitch-lined siege bins, currently about eleven months deep'),
  R('food.cache-fat', 'located_in', REGION.borealCrown, 'buried in sightline pits along working routes, five winters to a cache'),
  R('food.steppe-sour', 'located_in', REGION.ashenSteppe, 'made at the herds, not in the city'),
  R('food.steppe-sour', 'located_in', 'district.arena-city-drovers-camp', 'sold by the skin at the ground, and at triple that inside the stands'),
  R('food.sift-cake', 'located_in', REGION.whitePans, 'netted off standing liquor ponds below the tower line'),
  R('food.sift-cake', 'located_in', 'district.sifting-city-the-tower-line', 'dragged twice a week by crews light enough for the crust'),
  R('food.dew-melon', 'located_in', REGION.cinderWaste, 'condensation nets and sunken beds on the margin'),
  R('food.dew-melon', 'located_in', 'district.orath-the-tank-yard', 'grown on the nets outside the wall; nothing else about Orath is established here'),
  R('food.tide-rice', 'located_in', REGION.theDrown, 'broadcast onto living mat, cut from a boat, twice a year'),
  R('food.tide-rice', 'located_in', 'district.floating-swamp-settlement-tail-lots', 'the low lots take the water first, and their rice goes first with it'),
  R('food.stair-loaf', 'located_in', REGION.ascentBasin, 'baked from grain the basin does not grow'),
  R('food.stair-loaf', 'located_in', 'district.gilded-ascent-hoist-yards', 'three bakes a day, timed to the hoist shifts, priced before the first run'),
  R('food.lattice-cress', 'located_in', REGION.anvilShelf, 'watered on damp condensed out of the updraught'),
  R('food.lattice-cress', 'located_in', 'district.sky-city-mooring-ring', 'racked along the mast lines, tare and wet weight both assessed'),
  R('food.adit-cheese', 'located_in', REGION.ironback, 'made at the summer huts, aged two years in worked-out adits'),

  /* Who makes it ----------------------------------------------------- */
  R(CITY.siftingCity, 'produces', 'food.sift-cake', 'netted, pressed and dried on the pan floor, then issued against the bond'),
  R(CITY.gildedAscent, 'produces', 'food.stair-loaf', 'a fixed 900 grams; the price is chalked afresh every morning'),
  R(CITY.skyCity, 'produces', 'food.lattice-cress', 'the only food it grows, and it supplies no calories'),
  R(CITY.arenaCity, 'produces', 'food.steppe-sour', 'poured at the stands under a Ring cut; made out at the drovers ground'),

  /* Who eats it that does not make it -------------------------------- */
  R(CITY.magicCity, 'consumes', 'food.stair-loaf', 'grain from the basin; the Fetterhouse keeps eight months in store'),
  R(CITY.magicCity, 'consumes', 'food.tide-rice', 'up from the delta, paid for in chalk and binding work'),
  R(CITY.blackWeir, 'consumes', 'food.tide-rice', 'taken up from below the gates that decide whether it grew'),
  R(CITY.treeCity, 'consumes', 'food.stair-loaf', 'bought between masts, which is most years'),
  R(CITY.siftingCity, 'consumes', 'food.mirror-barley', 'out of the Hollow Karst by way of the Ascent, and it tastes like it'),
  R(CITY.skyCity, 'consumes', 'food.terrace-citron', 'because cress alone is not enough and the Assize knows it'),
  R(CITY.caveAgrarian, 'consumes', 'food.adit-cheese', 'fat the karst cannot make, at a price it argues about annually'),
  R(CITY.arenaCity, 'consumes', 'food.sift-cake', 'issued to the under-stables and the bond ranks, not to the banners'),
  R(CITY.mediterranean, 'consumes', 'food.adit-cheese', 'taken as collateral as often as it is eaten'),

  /* Inputs and dependencies ------------------------------------------ */
  R('food.mirror-barley', 'requires', 'material.cudmother', 'without a gut culture working through it, rock flour stays powder'),
  R('food.mirror-barley', 'requires', 'machine.the-mirror-ducts', 'a fifth of the light that entered the shaft head, four reflections later'),
  R('food.mirror-barley', 'requires', 'recipe.duct-mirror-resilvering', 'unsilvered plate loses the course; the silverers are rotated out at ninety days'),
  R('food.gallery-cap', 'requires', 'creature.mirror-swift', 'guano off the roost floors charges every bed in the flush galleries'),
  R('food.gallery-cap', 'requires', 'skill.spore-lore', 'substrate, casing, flush timing and the clinical half nobody teaches openly'),
  R('food.sump-carp', 'requires', 'food.gallery-cap', 'spent beds and milling waste are the entire feed bill'),
  R('food.meridian-olive', 'requires', 'machine.the-bittern-ladder', 'soda-ash lye for curing table fruit, laddered out of pan liquor'),
  R('food.meridian-olive', 'requires', 'item.orrery-tables', 'the printed tables set the picking date, and the tables have drifted'),
  R('food.terrace-citron', 'requires', 'machine.the-frit-kiln', 'crown glass for the lean-to frames, which outlast the trees in them'),
  R('food.bole-mast', 'requires', 'machine.the-pitchworks', 'wood-ash lye for fast leaching, and the pitch that lines the siege bins'),
  R('food.cache-fat', 'requires', 'creature.lamphorn', 'about forty kilograms of renderable fat from a stag culled at summer end'),
  R('food.cache-fat', 'requires', 'skill.cold-camp', 'siting, burying and finding a pit that is remembered as a sightline'),
  R('food.steppe-sour', 'requires', 'skill.yoke-and-tether', 'the mares are milked several times a day and only with the foal at foot'),
  R('food.sift-cake', 'requires', 'machine.the-sieve-cascade', 'pan liquor off the cascade is the water the shrimp live in'),
  R('food.dew-melon', 'requires', 'item.sift-screen', 'every net on the margin is a screen that failed an assay and went south'),
  R('food.dew-melon', 'requires', 'skill.the-far-walk', 'a melon is two days, and a crossing is planned in melons before leagues'),
  R('food.tide-rice', 'requires', 'creature.raftbloom', 'the mat is the field, and reading its stage of rot is the trade'),
  R('food.tide-rice', 'requires', 'skill.marsh-footing', 'cut from a punt or not at all'),
  R('food.stair-loaf', 'requires', 'food.mirror-barley', 'the extender that darkens the crumb when coast wheat is short'),
  R('food.stair-loaf', 'requires', 'food.bole-mast', 'mast flour goes into the blend in a genuinely bad month, and it shows'),
  R('food.stair-loaf', 'requires', 'machine.the-assay-cage', 'every bakery bench weight traces back to the sealed reference'),
  R('food.lattice-cress', 'requires', 'material.glasscane', 'tray frames, because soil is mass and mass is licensed'),
  R('food.lattice-cress', 'requires', 'mechanic.mass-warrant', 'tare and wet weight are both assessed; the difference is the loophole'),

  /* Who controls the supply ------------------------------------------ */
  R('faction.mirror-assembly', 'controls', 'food.mirror-barley', 'lumen-hours decide which terrace grows grain and which grows nothing'),
  R('faction.mirror-assembly', 'related_to', 'food.gallery-cap', 'the flush beds consume no light, so the Assembly never votes on them'),
  R('faction.concord-of-weights', 'controls', 'food.stair-loaf', 'fixes the weight, licenses the bench weights, and lets the price move in public'),
  R('faction.pitchguard', 'controls', 'food.bole-mast', 'the siege reserve is Marshalcy property, not the households'),
  R('faction.mooring-assize', 'controls', 'food.lattice-cress', 'tray mass is licensed like any other load, and audited less often'),
  R('faction.iron-sluice-company', 'affects', 'food.tide-rice', 'a metre of water in four hours is faster than the stem can grow'),
  R('faction.moorstone-compact', 'related_to', 'food.tide-rice', 'the draw decides whose mats are low, and advance warning is sold'),
  R('faction.conduit-college', 'consumes', 'food.meridian-olive', 'buys the third pressing forward by the year as a licensed industrial input'),
  R('faction.conduit-college', 'related_to', 'food.terrace-citron', 'licenses the copper pans and has declined to open the question about them'),
  R('faction.bondwrights-hall', 'related_to', 'food.sift-cake', 'the ration is booked against the bond, so eating less buys time off a term'),
  R('faction.pale-assay', 'related_to', 'food.dew-melon', 'condemned screens leave the Pans as dew nets, which is a grading matter nobody grades'),

  /* People, quests and consequences ---------------------------------- */
  R('npc.iratze-zubiate', 'affects', 'food.mirror-barley', 'skimming mirror-hours off the grain terraces to hide two collapsed ducts'),
  R('npc.ossane-gorbea', 'affects', 'food.mirror-barley', 'issues the hours, then buys the galleries she starved through a cousin'),
  R('npc.bedel-lehun', 'related_to', 'food.gallery-cap', 'grows an unlisted violet relative that yields double and stops people sleeping'),
  R('npc.melitta-aspri', 'affects', 'food.meridian-olive', 'her tables set the picking date, and they are a day and a half out'),
  R('npc.anthimos-vellani', 'related_to', 'food.terrace-citron', 'eleven years of records, and every failed barrel came out of a copper house'),
  R('npc.aune-mustsalu', 'controls', 'food.bole-mast', 'signs for the reserve and for the rolls that eat it'),
  R('npc.tazrit-nourem', 'controls', 'food.sift-cake', 'holds the papers the ration is issued against'),
  R('npc.kavel-uur', 'consumes', 'food.dew-melon', 'pays crews partly in fruit and counts who comes back out of the waste'),
  R('npc.ost-vennick', 'affects', 'food.tide-rice', 'the schedule book decides the season, and he sleeps in the same room as it'),
  R('npc.sabbe-sixteen-knot', 'related_to', 'food.tide-rice', 'moving the settlement upriver moves it off the mats it eats from'),

  R('food.mirror-barley', 'affects', CITY.gildedAscent, 'karst grain down the Karst Fork is a large share of the basin bread supply'),
  R('food.bole-mast', 'affects', CITY.treeCity, 'the famine calendar is public and everyone in the city can do the arithmetic'),
  R('food.lattice-cress', 'affects', CITY.skyCity, 'grows the vitamins, imports every calorie, and the reserve figure is forged'),
  R('food.tide-rice', 'affects', CITY.blackWeir, 'the gates hold both levers: too much river and too little both kill the crop'),
  R('food.adit-cheese', 'affects', 'deposit.sour-lodes', 'reopening a worked-out adit destroys the cellar in it and the stock inside'),
  R('food.adit-cheese', 'related_to', 'mechanic.standing-ledger', 'wheels are pledged in bonded vaults at about eighty per cent of face'),
  R('food.sift-cake', 'related_to', 'quest.pan-fever', 'the company sets the ration and the fraction both; the price list is the antagonist'),
  R('food.stair-loaf', 'related_to', 'quest.short-weight', 'short weight on a posted-price loaf is the same crime, one terrace down'),
  R('food.tide-rice', 'related_to', 'quest.clean-bills', 'a cordon that stops the fever also stops everything the delta eats'),
  R('food.bole-mast', 'related_to', 'quest.the-felling-order', 'burning an infested quarter also burns the mast that quarter would have given'),
  R('food.meridian-olive', 'related_to', 'quest.four-minutes-fast', 'an instrument fault that is, underneath, an agricultural one'),
  R('food.terrace-citron', 'related_to', 'skill.plague-reading', 'a crew failing on full ration is the clearest bad-barrel signal there is'),
  R('food.sump-carp', 'related_to', 'item.fever-clay', 'the karst medicine trade sells outward and does nothing for its own fluke'),
  R('food.meridian-olive', 'related_to', 'machine.the-char-retorts', 'the lye that cures table fruit begins as bone under the arena floor'),
]
