/**
 * Wilderness sites.
 *
 * The brief requires that the thirteen settlements be widely spaced, with
 * wilderness, villages, ruins, resources, roads and minor settlements in
 * between. This module is that in-between: thirty-two places on the road, off
 * the road, or deliberately nowhere near one.
 *
 * Placement is by region — `seed.ts` scatters a site marker inside whichever
 * region its `region` field names — so the distribution here is weighted
 * towards the empty quarters: the Boreal Crown and the Ironback Range hold no
 * settlement at all, and the Greatwood interior and the eastern coast are long
 * gaps between cities.
 *
 * Several entries are blank on purpose. A map with nothing unexplained on it
 * is a map nobody wants to walk across.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE BOREAL CROWN — no settlement claims it                        */
  /* ================================================================ */

  E({
    id: 'site.the-winterings',
    type: 'site',
    name: 'The Winterings',
    aka: ['The Antler Camp'],
    status: 'draft',
    summary: 'Nine lamphorn herds wintering in one river bend, and the only cold light made anywhere on the continent.',
    tags: ['boreal', 'herding', 'frontier'],
    fields: {
      overview:
        'A herding camp of about two hundred people and nine herds, sited each autumn in a different bend of the same frozen river so the browse has four years to come back. Twelve hide-and-turf longhouses, a stake corral, and a smoke-house that runs day and night from first ice.\n\nThe herds are [[creature.lamphorn|lamphorn]], and the velvet on their antlers carries a fungus that burns cold. A live stag lights a longhouse. A stag killed badly loses the strain, and the strain cannot be got back from a dead animal, so the herders will fight over a poached carcass in a way they will not fight over a stolen sledge.\n\nNobody in the thirteen settlements administers this place. The camp trades cut velvet south through [[site.cache-line-nine|Cache Line Nine]] twice a winter and takes payment in salt, iron and needles.',
      region: [REGION.borealCrown],
      siteType: 'Camp',
      danger: 'Minus forty by the third week, and a herd that will run over a stranger without noticing.',
      playNotes:
        'What a party comes for: cold light with no fuel, no flame and no licence, which is worth a great deal in [[city.magic-city|the Magic City]] and rather more in a mine. What the camp wants: escorts for the two southbound runs, and someone to settle which of two families holds the fourth herd after a bad calving.\n\nThe hard version of the same visit is being hired to poach. A buyer in the south will pay for breeding stock, and taking breeding stock ends a herd line permanently. [[skill.cold-camp|Cold Camp]] is the minimum to survive the stay; [[skill.yoke-and-tether|Yoke and Tether]] is what gets you spoken to.',
      devNotes: TBD('Are the herds owned by families, held in common by the camp, or neither? The answer decides whether a poaching plot is theft, murder or a land dispute.'),
    },
  }),

  E({
    id: 'site.cache-line-nine',
    type: 'site',
    name: 'Cache Line Nine',
    status: 'draft',
    summary: 'Thirty-one buried food pits and one keeper\'s hut: the only way anyone crosses the taiga in winter.',
    tags: ['boreal', 'road', 'survival'],
    fields: {
      overview:
        'Not a settlement. A line of thirty-one pits dug into the permafrost at a day\'s sledge apart, each holding [[food.cache-fat|cache fat]] against five winters, and one turf hut at pit sixteen where a keeper and whoever is currently sharing their winter live from freeze-up to thaw.\n\nThe line runs from the mountain foot to the north coast at [[site.tarhouse-strand|Tarhouse Strand]]. It is the ninth such line; the first eight are somewhere out there and only three are still marked. Robbing a cache is treated in the taiga as attempted murder, because at the wrong point in the line it is.\n\nThe keeper is paid in kind by everyone who uses the line and by [[faction.bonewax-post|the Bonewax Post]], whose northern seal-runs would otherwise be impossible.',
      region: [REGION.borealCrown],
      siteType: 'Waystation',
      danger: 'Rob a cache and nobody hangs you. The distance to the next one does it instead.',
      playNotes:
        'Players arrive here as travellers rather than adventurers: the line is the infrastructure that makes a northern journey a survivable proposition at all, and every scene on it is about calories and daylight. [[skill.cold-camp|Cold Camp]] gets a party between pits; [[skill.the-far-walk|The Far Walk]] gets them across a gap where a pit has been emptied.\n\nThree hooks live here. Somebody has been drawing on pits and not replacing them, which is a slow murder in progress. The keeper knows exactly who and will not say, because the culprit is the only other person within eleven days. And there are three older lines out on the moss whose pits, if they can be found, are still sealed.',
      devNotes: PROPOSAL('Cache lines as the north\'s only road. This gives the Boreal Crown a traversal grammar without putting a town in it, and gives the Bonewax Post a reason to exist above the mountains.'),
    },
  }),

  E({
    id: 'site.the-nine-hearths',
    type: 'site',
    name: 'The Nine Hearths',
    status: 'draft',
    summary: 'Nine stone hearths in a straight line on a bare ridge, with no walls, no midden and no bones anywhere near them.',
    tags: ['boreal', 'ruin', 'unexplained'],
    fields: {
      overview:
        'On a wind-scoured ridge four days east of [[site.cache-line-nine|Cache Line Nine]], nine circular hearths of set stone stand in a line running north to south. Each is a little over two paces across. Each has burnt clay beneath it to a depth of a foot, which means very long or very hot use. The spacing is even to within a hand.\n\nThere is nothing else. No post holes, no wall footings, no midden, no cut bone, no charcoal that anyone has managed to date, and no second line anywhere on the ridge. The herders of [[site.the-winterings|the Winterings]] do not camp on the ridge and give no reason beyond that it is a bad place to be at night, which in the taiga is a statement about wind.',
      region: [REGION.borealCrown],
      siteType: 'Ruin',
      danger: 'Nothing on the ridge. The four days back are the danger.',
      playNotes:
        'A blank on the map with an obvious hook and no answer behind it. What players can actually do: dig, which the herders will resent and not prevent; measure, which is how the even spacing and the north-south line become a fact rather than an impression; or overwinter, which is the only way to learn what the hearths look like when they are lit, and nobody has done it.\n\nRun it as a place that rewards patience and gives nothing to violence. Whatever a designer eventually decides is here, the first session on the ridge should end with a party holding measurements and no explanation.',
      devNotes: TBD('What are the Nine Hearths? Deliberately unanswered. Any answer should stay inside the tone: earlier people, unusual biology or industry, not an awakening evil.'),
    },
  }),

  E({
    id: 'site.tarhouse-strand',
    type: 'site',
    name: 'Tarhouse Strand',
    status: 'draft',
    summary: 'Sixty households on the north coast burning pine tar in earth kilns, iced in for five months of the year.',
    tags: ['boreal', 'village', 'coastal', 'industry'],
    fields: {
      overview:
        'A single row of houses above a shingle beach at the head of a fjord, with eleven earth kilns dug into the slope behind and a stink that carries two leagues downwind. The strand burns resinous stump and root into tar, and the tar goes south by sea for ropewalks, hulls and roofing.\n\nSixty households, about three hundred people. They grow nothing. Everything eaten here comes north in the same hulls that take the tar out, which means five months of ice each year during which the village lives on what it laid in and on the northern end of [[site.cache-line-nine|Cache Line Nine]].\n\nThe [[faction.bonewax-post|Bonewax Post]] keeps its northernmost seal-house here, in the back room of the tar factor\'s house, and the factor is paid to notice nothing about it.',
      region: [REGION.borealCrown],
      siteType: 'Village',
      danger: 'The anchorage closes without much warning, and the next hull is in spring.',
      playNotes:
        'The northernmost place with a door that locks. A party that reaches the strand can sell, resupply, take ship south, or find themselves overwintering because they arrived eight days late.\n\nThe live problem: the tar factor has been buying the winter grain on credit against next season\'s tar, and this year the tar is short because two kilns went up. Somebody in the south now owns the village\'s next four seasons and nobody here can read the paper they signed. A party with [[skill.ledger-hand|Ledger Hand]] or [[skill.plain-letters|Plain Letters]] can tell them what they signed, which is a service, and possibly a fight.',
      devNotes: PROPOSAL('A tar-burning coast village gives the Boreal Crown an export, a reason for hulls to sail north, and a debt hook that reaches the trading cities without needing the north to be interesting on its own.'),
    },
  }),

  /* ================================================================ */
  /* THE IRONBACK RANGE — ore, meltwater and one pass                  */
  /* ================================================================ */

  E({
    id: 'site.the-sour-adits',
    type: 'site',
    name: 'The Sour Adits',
    status: 'draft',
    summary: 'Nineteen shallow drifts into the Sour Lodes, and the roast yards downwind that make the money and the lung rot.',
    tags: ['ironback', 'mine', 'indenture', 'industry'],
    fields: {
      overview:
        'Nineteen adits driven into the southern flank of [[region.ironback-range|the Ironback]] along [[deposit.sour-lodes|the Sour Lodes]], six of them still worked. The ore is [[material.scaldstone|scaldstone]]: rich, shallow, cheap and completely useless until it has been roasted, so the site that matters is not the adits but the eleven open roast beds on the terrace below them.\n\nRoasting drives the sulphur off in a low yellow smoke that follows the valley for a league and a half. Nothing grows on that league and a half. The beds are worked by gangs on labour bonds written in the trading cities, turned over every few years because a bonded worker on the roast beds is not usually worth renewing.\n\nThe ore is barrowed to the river head and floated down to the basin, where it becomes furnace stock and eventually [[material.blister-bar|blister bar]]. The adits are owned by six small houses. Five of the six are mortgaged.',
      region: [REGION.ironback],
      siteType: 'Mine',
      danger: 'Roast-yard air. Six years of it is a full working life and the bonds are written for eight.',
      playNotes:
        'Ore is cheap here and getting it is trivial, which is exactly the point: the barrier is not the mine, it is the roast yards and who holds their paper. A party can buy scaldstone by the cartload for very little and discover they cannot sell it anywhere until it has been roasted by someone.\n\nThe standing conflict: [[faction.standing-hour|the Standing Hour]] has stewards in three of the yards and is one bad quarter away from calling a stop, and [[faction.bondwrights-hall|the Bondwrights\' Hall]] has already priced replacement gangs from [[city.arena-city|the Arena City]]. Players can carry the strike fund, carry the replacements, buy an adit outright, or take the bond ledgers out of the counting shed and force the owners to prove who is bound and for how long. Freeing a gang leaves eighty people on a mountain in autumn with no food, which is the argument the owners use and the problem the players inherit.',
      devNotes: PROPOSAL('The roast yards, not the adits, are the asset. This makes the Ironback a labour story rather than a geology story and puts the leverage downstream of the hole in the ground.'),
    },
  }),

  E({
    id: 'site.the-cold-adits',
    type: 'site',
    name: 'The Cold Adits',
    status: 'draft',
    summary: 'A played-out mining village that now ages cheese in its own worked-out drifts and pays wages in wheels.',
    tags: ['ironback', 'village', 'food'],
    fields: {
      overview:
        'Two hundred and forty people living on top of a mountain that has nothing left in it. The lodes were cut out two generations ago; what remains is nine miles of dry, cold, constant-temperature drift, which turns out to be the best cheese cellar on the continent.\n\nThe village makes [[food.adit-cheese|adit cheese]] from summer-pastured milk, ages it eighteen months underground and sells it to the mining camps that are still working. A wheel keeps two years without a cellar, which is why wheels circulate here as wages, collateral and bribes, and why the village keeps a tally board rather than a strongbox.\n\nHalf the houses are built into adit mouths. The other half are built out of the spoil.',
      region: [REGION.ironback],
      siteType: 'Village',
      danger: 'Nine miles of unmapped old working directly beneath the houses.',
      playNotes:
        'A resupply stop with a currency of its own and a reason to talk to strangers: they need buyers, and the caravans have been going another way since the pass hospice raised its charge. A party carrying wheels south can pay their way across the whole range without touching coin.\n\nUnderneath: the drifts connect to workings nobody has been down in forty years, and the cheese-keepers have been quietly walling off sections rather than explain why the air in them is bad. Somebody is going to go through one of those walls. [[skill.bench-sense|Bench Sense]] reads the props; [[skill.ground-read|Ground Read]] reads what has been using the far end.',
      devNotes: TBD('What is behind the walled-off sections: foul air, a flooded working, or something the village agreed not to discuss? The village should not know either.'),
    },
  }),

  E({
    id: 'site.hookfoot-hospice',
    type: 'site',
    name: 'Hookfoot Hospice',
    status: 'draft',
    summary: 'The only cart crossing of the Ironback, a bell rope, a body-cart and a book you sign whether you pay or not.',
    tags: ['ironback', 'road', 'waystation'],
    fields: {
      overview:
        'At the head of the North Fork, where the pass road crosses the watershed, a stone hospice of eleven rooms stands against the wind with a bell tower at one end and a stable at the other. It is the only cart crossing for ninety leagues in either direction, so everything moving between [[region.boreal-crown|the Boreal Crown]], the northern lodes and [[city.gilded-ascent|the Gilded Ascent]] passes through this yard.\n\nThe hospice charges by the axle and does not turn anyone away who cannot pay; instead the keeper writes the debt in the book, and the book is honoured on the [[landmark.the-counting-stair|Counting Stair]] because the counting houses would rather subsidise the pass than lose it. The bell is rung on the hour in bad weather. The body-cart goes out when it stops being useful.',
      region: [REGION.ironback],
      siteType: 'Waystation',
      danger: 'The pass shuts inside an hour and does not care who is on it.',
      playNotes:
        'A pressure-cooker location: everyone crossing the range is in the same eleven rooms, and when the pass shuts they are in there for four days with whoever they were trying to avoid. Run negotiations, hand-offs and ugly recognitions here rather than in a city.\n\nMechanically it is a gate on northern travel. [[skill.weather-eye|Weather Eye]] buys the party the twelve hours of warning that decides whether they cross or wait. The keeper\'s debt book is a genuine artefact: it is a complete record of who crossed the Ironback and when, going back thirty-one years, and at least three people in the trading cities would pay to have a page removed.',
      devNotes: TBD('Is the pass genuinely the only crossing? A second, worse crossing would give smugglers somewhere to be and would halve this site\'s leverage. That is a deliberate trade-off for the designer.'),
    },
  }),

  E({
    id: 'site.the-lick',
    type: 'site',
    name: 'The Lick',
    status: 'draft',
    summary: 'A metal seep where slagbuck come to drink, and the prospectors who follow the herd because the herd finds ore for free.',
    tags: ['ironback', 'camp', 'prospecting'],
    fields: {
      overview:
        'A bench of broken ground below a seep where the water comes out sharp with dissolved metal. [[creature.slagbuck|Slagbuck]] drink here and lay the metal down in horn and bone, which means a slagbuck herd\'s range is a free survey of everything worth digging within two days\' walk.\n\nThe camp is thirty or forty prospectors in the season, in tents and hide shelters, following the herd and arguing about what the horn assays say. It moves when the herd moves. There is no law here beyond the fact that everyone present knows everyone present, and a claim is worth exactly as much as the number of people prepared to stand on it.',
      region: [REGION.ironback],
      siteType: 'Camp',
      danger: 'Claim-jumping, and a rutting slagbuck that weighs as much as a loaded cart.',
      playNotes:
        'The prospecting entry point for the whole range. A party with [[skill.ground-read|Ground Read]] can follow the herd instead of the rumours and find a lode nobody has filed on. A party with [[item.assayers-tray|an assayer\'s tray]] can settle an argument that four men have been having for a season, which buys more goodwill here than money does.\n\nThe live problem: a house out of [[city.gilded-ascent|the Gilded Ascent]] has begun buying claims at four times their worth, sight unseen, from anyone who will sign. Nobody at the Lick can work out why, and the obvious answer, that the buyer knows something about the ground that the prospectors do not, is the one everyone is trying not to say out loud.',
      devNotes: TBD('What is the Ascent house actually buying? A route, a water right, or a lode that reads as worthless with current assay methods. Leave open until a materials author needs it.'),
    },
  }),

  /* ================================================================ */
  /* THE GREATWOOD — interior, beyond the Tree City's reach            */
  /* ================================================================ */

  E({
    id: 'site.the-tally-post',
    type: 'site',
    name: 'The Tally Post',
    status: 'draft',
    summary: 'Four archers, a counting board and a licence book, watching the last fifty mature boles outside the Tree City walls.',
    tags: ['greatwood', 'military', 'timber', 'outpost'],
    fields: {
      overview:
        'A timber blockhouse on a ridge in the deep Greatwood, with a fire-step, a well and a board on the outside wall where the current count is chalked. The count is fifty, and it is the only number in the Greatwood that every faction agrees on: [[deposit.standing-fifty|the Standing Fifty]], the last mature [[material.blackbole-timber|blackbole]] trunks outside the walls of [[city.tree-city|the Tree City]].\n\nFour archers of [[faction.pitchguard|the Pitchguard]] hold it on a two-month rotation, with a licence clerk who is not a soldier and is paid better than the soldiers. Every felling licence is a council vote, and the clerk\'s job is to check that the party standing in front of a tree with a saw is the party named on the vote.\n\nThe trees themselves are not simply timber. Under [[religion.the-standing-dead|the Standing Dead]], a mature bole holds the dead of whoever planted around it, and three of the Fifty are burial trunks with living claimants.',
      region: [REGION.greatwood],
      siteType: 'Outpost',
      danger: 'Archers paid by the count rather than the day, and a standing order to shoot before challenging.',
      playNotes:
        'The chokepoint for the entire timber economy: nothing large gets built anywhere on the continent without a vote that this post enforces. Players can arrive with a licence, without one, or with a forged one, and [[skill.false-proof|False Proof]] against a clerk who reads a hundred licences a year is a real test.\n\nThe hook: one of the Fifty has bolewright galls through the heartwood and will be condemned at the next inspection, which conveniently voids a burial claim that has blocked a felling vote for six years. The clerk knows the inspection date. The family does not. A party can warn them, sell the date, or arrange for the inspection to find something different.',
      devNotes: PROPOSAL('The Tally Post makes the Standing Fifty a physical place rather than a statistic, and gives the Pitchguard a presence outside the city that players can reach without assaulting a fortress.'),
    },
  }),

  E({
    id: 'site.the-cut-line',
    type: 'site',
    name: 'The Cut Line',
    status: 'draft',
    summary: 'A deserters\' camp in an old windthrow gap where routes, sap and silence are all for sale.',
    tags: ['greatwood', 'camp', 'criminal', 'outlaw'],
    fields: {
      overview:
        'Two hundred paces of blowdown where a storm took a strip of canopy out twenty years ago, now grown up in scrub thick enough to hide a camp of forty. The Cut Line is where people the Greatwood has finished with end up: deserters from the spring levy, families of the purged Sixth Quarter, poachers, and two men who cut bridges for a living and will not say for whom.\n\nNothing here is permanent. Everything is sited to be abandoned inside an hour. The camp lives on poached game taken with [[skill.wire-and-snare|wire and snare]], on gall resin scraped from [[creature.bolewright-wasp|bolewright]] workings, and on selling routes through the forest to people who should not be using them.\n\n[[npc.vetla-torvik|Vetla Torvik]] is here more often than not.',
      region: [REGION.greatwood],
      siteType: 'Camp',
      danger: 'Everyone here has a reason not to be found, and no reason at all to trust that you are not the reason.',
      playNotes:
        'The Greatwood\'s black market and its only neutral ground. Buy a route past the gate galleries, buy silence, buy a guide who knows which rope bridges are on the maintenance run. Sell nothing you would not want traced.\n\nThe weight of the place: the same snare skill that takes deer is used on people, and at least one crew working out of the Cut Line takes bounties on runaway bonded workers coming north out of [[city.arena-city|the Arena City]]. They are camped forty paces from families who ran from the levy. Everyone knows. Nobody has done anything about it yet, and a party that does will be choosing which half of the camp survives the winter.',
      devNotes: TBD('Who is paying the two bridge-cutters? The Pitchguard testing its own severance drill, or someone preparing to strand a quarter. Leave it open as a slow-burn hook.'),
    },
  }),

  E({
    id: 'site.underbough',
    type: 'site',
    name: 'Underbough',
    status: 'draft',
    summary: 'A tribute village of four hundred on the forest march, paying the Pitchguard in nut flour and in sons.',
    tags: ['greatwood', 'village', 'conscription', 'road'],
    fields: {
      overview:
        'Sixty houses on stilts in the leaf litter beside the march road between [[city.oruvai|Oruvai]] and [[city.tree-city|the Tree City]], under a canopy that does not let daylight to the ground for nine months of the year. Four hundred people, four smokehouses, one mill.\n\nUnderbough exists to process [[food.bole-mast|bole mast]]. The great trees mast every four to seven years, and in a mast year the village mills and dries an obscene quantity of nut flour, most of which goes straight to the Tree City\'s siege reserve as tribute. In the intervening years it is a village of four hundred people with very little to do and a tribute assessment that does not adjust.\n\nThe second tribute is the spring levy. [[npc.saarik-rauda|Saarik Rauda]]\'s press-gangs come up the march road in the fourth week after thaw, and the households that can pay in seed grain keep their sons.',
      region: [REGION.greatwood],
      siteType: 'Village',
      danger: 'The spring levy, which arrives whether the village agrees or not.',
      playNotes:
        'The obvious stop on the road between two cities, and the place to see what the Tree City\'s militarisation costs the people who are not in it. Beds, food, a mill, a smith who mostly shoes mules.\n\nThree usable threads. The mast calendar is public and everyone can read it, which means the famine years are known years in advance and somebody is always lending against them. The scouts here wear [[creature.sentinel-tick|sentinel ticks]] and will know a stranger\'s chemistry before a stranger reaches the houses. And the village keeps its own quiet tally of which households have paid Rauda and which have not, written on the back of the mill accounts, which is the same map [[npc.aune-mustsalu|the Bole-Marshal]] would kill to keep out of her quartermaster\'s hands.',
      devNotes: PROPOSAL('A tribute village makes the Tree City\'s levy visible at the receiving end. It sits on the established forest march road so it is passed rather than sought out.'),
    },
  }),

  /* ================================================================ */
  /* THE HOLLOW KARST — above and below                                */
  /* ================================================================ */

  E({
    id: 'site.the-blind-holdings',
    type: 'site',
    name: 'The Blind Holdings',
    status: 'draft',
    summary: 'Three galleries struck off the mirror rota that did not die, and now feed themselves in the dark on principle.',
    tags: ['karst', 'village', 'agriculture', 'dissent'],
    fields: {
      overview:
        'Three connected galleries a day\'s walk beyond the surveyed edge of [[city.cave-agrarian-city|the Cave Agrarian City]], holding perhaps six hundred people. They lost their allocation of duct light nine years ago after a roof fall the [[faction.mirror-assembly|Mirror Assembly]] declined to pay to clear, and were written off the rota as abandoned.\n\nThey were not abandoned. Without light they cannot grow [[food.mirror-barley|mirror barley]], so they grow [[food.gallery-cap|gallery cap]] on dung and milling chaff, which needs no light at all, and they keep [[material.cudmother|cudmother]] cultures that were never licensed and cannot legally exist outside the city. The diet is monotonous and the lung rot arrives early, and they are entirely self-governing, which is the part the Assembly cannot forgive.\n\nUnder [[religion.the-mirror-office|the Mirror Office]], passing light on is the only sacred act. A gallery that has been denied light has, in the local reading, been excommunicated by the people who hold the mirrors.',
      region: [REGION.hollowKarst],
      siteType: 'Village',
      danger: 'Bad air in the lower workings, and a gallery militia that answers to nobody at all.',
      playNotes:
        'A place to buy things that do not legally exist: unlicensed cudmother starters, unlicensed fungal strains, and passage through galleries that are not on any Assembly chart. Also the only community in the karst that will speak plainly about [[mechanic.the-mirror-rota|the mirror rota]], because they have nothing left to lose by it.\n\nThe pressure: [[npc.ossane-gorbea|Ossane Gorbea]] has started buying failed galleries through a cousin\'s name, and the Blind Holdings are the only failed galleries in the district that have refused to fail. A reeve\'s survey party is coming to re-register them as unoccupied. Players can obstruct it, document it, or take the Assembly\'s coin and lead it in.',
      devNotes: TBD('Is there a physical route from the Blind Holdings into the city\'s deep rota galleries? If so, this is also the back door into the Cave Agrarian City and should be priced accordingly.'),
    },
  }),

  E({
    id: 'site.the-lantern-face',
    type: 'site',
    name: 'The Lantern Face',
    status: 'draft',
    summary: 'A mica working followed by lamplight along the bedding planes, where the cutting maims and the silvering kills.',
    tags: ['karst', 'mine', 'industry', 'labour'],
    fields: {
      overview:
        'The largest active face on [[deposit.lantern-beds|the Lantern Beds]]: a working four hundred paces in along a bedding plane, followed by hand because [[material.sunwell-mica|sunwell mica]] cannot be blasted without shattering every leaf in the block. Sixty cleavers work the face by lamplight in six-hour turns. The leaves come out flawless and hand-sized and go up to the surface sheds to be silvered.\n\nThe silvering is done with tin amalgam and it is what actually kills people; the mirror-wrights\' guild holds both steps and the mortality of the second is not written anywhere the cleavers can read it. Every duct mirror in [[city.cave-agrarian-city|the Cave Agrarian City]] and every hand [[item.sunwell-mirror|sunwell mirror]] sold in the galleries starts here.\n\n[[creature.mirror-swift|Mirror swifts]] nest in the roof of the outer working and the nest-take is quota\'d, which is a second economy running under the first.',
      region: [REGION.hollowKarst],
      siteType: 'Mine',
      danger: 'Bedding planes that shear along their length with no warning at all.',
      playNotes:
        'Work available by the turn for anyone with [[skill.mirror-cutting|Mirror Cutting]], and a place to buy uncut leaf below guild price if you do not mind who is watching. Nest-poaching is the local crime and the climb is the local cause of death.\n\nThe hook that reaches a city: [[npc.iratze-zubiate|Iratze Zubiate]] needs replacement duct plate for two galleries that have been dark for over a year, and she cannot requisition it without reporting the collapse. The Lantern Face can supply the leaf off the books if somebody carries it, and the ninety-day silvering rotation means there is always a sherd of crew who know they are dying and want their families paid first.',
      devNotes: PROPOSAL('Splitting cutting from silvering puts the lethal step above ground and in guild hands, which is where the moral pressure should sit.'),
    },
  }),

  /* ================================================================ */
  /* THE ASCENT BASIN — the busy middle                                */
  /* ================================================================ */

  E({
    id: 'site.long-ford',
    type: 'site',
    name: 'Long Ford',
    status: 'draft',
    summary: 'Nine hundred people, a ferry and the grain fields that put bread on the Counting Stair.',
    tags: ['basin', 'village', 'agriculture', 'road'],
    fields: {
      overview:
        'Where the karst road crosses the Karst Fork there is a gravel bar wide enough to ford in late summer and a chain ferry for the rest of the year. Around it: nine hundred people, four hundred acres of levee-protected wheat, a mill, a tithe barn and the largest hiring fair in the basin.\n\nLong Ford is not a picturesque village. It is an agricultural machine pointed at [[city.gilded-ascent|the Gilded Ascent]], two days downstream, and it exists because the Ascent grows nothing. The price of [[food.stair-loaf|stair loaf]] is chalked on the ferry house every morning, a day late, and every farmer here reads it before deciding anything.\n\nThe ferry lease, the mill and most of the forward contracts on the harvest belong to a counting house on the [[landmark.the-counting-stair|Counting Stair]] that nobody here has visited.',
      region: [REGION.ascentBasin],
      siteType: 'Village',
      danger: 'Spring flood on the levees, and recruiters at the hiring fair who are not hiring for farms.',
      playNotes:
        'The first honest place outside the Ascent and a good scene for teaching players what the city costs the country. Hire hands, buy horses, sell surplus, hear rumours a day before the city does because the barges go down at the same speed as gossip.\n\nThe running problem: forward contracts were signed against a price the harvest will not now make, and half the farms in the parish will default in the same month. [[faction.standing-hour|The Standing Hour]] has a steward at the fair arguing for a collective refusal; the counting house has a factor arguing for individual settlements at generous terms, which is how you break a collective refusal. Both will pay a party to be useful. [[skill.ledger-hand|Ledger Hand]] reveals that the two offers were drafted in the same building.',
      devNotes: TBD('How much of the basin\'s grain does the Ascent actually eat, and how many days of siege reserve does the city hold? That number decides whether Long Ford is a supplier or a hostage.'),
    },
  }),

  E({
    id: 'site.the-eleven-mile-house',
    type: 'site',
    name: 'The Eleven Mile House',
    status: 'draft',
    summary: 'A coaching yard on the south stair road where two trades change horses on a rota nobody wrote down.',
    tags: ['basin', 'road', 'waystation', 'criminal'],
    fields: {
      overview:
        'Eleven miles south of [[city.gilded-ascent|the Gilded Ascent]] on the road to [[city.arena-city|the Arena City]]: a walled yard, twenty-two stalls, a long room, and a locked back room with its own door to the paddock.\n\nThe locked room belongs to [[faction.bonewax-post|the Bonewax Post]], which changes horses here on every southbound run and pays for the privilege of a room whose door nobody else opens. The Post\'s riders arrive between the second and third hour after dawn.\n\nThe yard\'s other trade arrives between the eleventh and twelfth hour of the night. [[faction.low-tally|The Low Tally]] moves untaxed cargo down the same road, uses the same stalls, and has an arrangement with the same ostler. The two trades have never met in the yard because the ostler is very careful, and the day he stops being careful this becomes the most interesting building in the basin.',
      region: [REGION.ascentBasin],
      siteType: 'Waystation',
      danger: 'Two trades sharing one yard on a timetable that only the ostler holds.',
      playNotes:
        'A location that does three jobs: it is where a party changes horses, where a party can intercept a sealed letter, and where a party can be intercepted. The Post\'s letters are copied as a matter of routine, so anything a party sends by seal is already sold by the time it arrives.\n\nThe pressure point is the ostler, who is sixty, who has kept both schedules in his head for nineteen years, and who is being pushed by his sons to write them down. Everyone who has ever used this yard has a reason to prevent that. He can be protected, bought, blackmailed or buried, and each of those closes a different route on the map.',
      devNotes: PROPOSAL('The shared-yard conceit gives the smuggling network a physical node on a legitimate road, and makes the Bonewax Post\'s copying habit a thing players can catch in the act.'),
    },
  }),

  E({
    id: 'site.the-drowned-fair',
    type: 'site',
    name: 'The Drowned Fair',
    status: 'draft',
    summary: 'The stone weigh-house of the fairground that traded here before the Stair had a charter, on an island that floods.',
    tags: ['basin', 'ruin', 'history', 'trade'],
    fields: {
      overview:
        'A levee island two hours below the confluence, holding the footings of about sixty stalls, a stone-built weigh-house with its roof gone and its beam socket intact, and a cobbled lane running into the water at both ends.\n\nThis was where the basin traded before there was a city on the escarpment: an open fair, held four times a year, weighed against its own standard and policed by whoever had brought the most people. The levee failed, the fair moved uphill, and the counting houses that grew out of it chartered [[landmark.the-brass-standard|the Brass Standard]] and made their own weights the only lawful ones.\n\nThe weigh-house socket still holds the mounting for a beam. If the fair\'s reference masses were left in it, they are the only surviving weights that predate the charter, and they would answer a question that a number of people in [[city.gilded-ascent|the Gilded Ascent]] would prefer left unasked.',
      region: [REGION.ascentBasin],
      siteType: 'Ruin',
      danger: 'The levee has not been maintained in a century and the island goes under twice a decade.',
      playNotes:
        'A dig with a political payload. The physical obstacle is water and silt; the real obstacle is that the moment anyone lifts a pre-charter reference mass out of the mud, every historian, forger and litigant in the Ascent wants it.\n\nIf the old standard differs from the Brass Standard by any measurable fraction, the fact is worth more than the metal, and it is worth different amounts to different people: to the counting houses it is an embarrassment to be bought, to [[faction.standing-hour|the Standing Hour]] it is proof the city has been shaving the country for a century, and to a forger it is a template. [[skill.proof-marking|Proof Marking]] tells a party what they are actually holding.',
      devNotes: TBD('Do the fair weights differ from the Brass Standard, and by how much? A tiny difference is a scandal; a large one rewrites a century of contracts. Recommend keeping it small and arguable.'),
    },
  }),

  /* ================================================================ */
  /* THE ANVIL SHELF — under the city, and along the lip               */
  /* ================================================================ */

  E({
    id: 'site.the-marl-cut',
    type: 'site',
    name: 'The Marl Cut',
    status: 'draft',
    summary: 'A quarry face in the ward marls whose entire annual output is sold four years forward to the Magic City.',
    tags: ['anvil-shelf', 'mine', 'magic-supply'],
    fields: {
      overview:
        'A stepped open cut two hundred paces long into the turf of [[region.anvil-shelf|the Anvil Shelf]], working the soft white beds of [[deposit.ward-marls|the Ward Marls]]. The marl comes out in blocks, is milled and cake-pressed on site, and is carted north to be fired into [[material.ward-chalk|ward chalk]].\n\nThe entire annual cut is bought forward by [[faction.fetterhouse|the Fetterhouse]], usually four years ahead, which is a loan as much as a purchase and means the quarry has not been able to refuse a buyer since anyone here can remember. Ninety carters, thirty cutters, two mills, and a foreman paid on tonnage.\n\n[[creature.chalk-louse|Chalk lice]] have been found in the number four stockpile twice this year. Both finds were burned. Neither was reported, because a reported infestation condemns the stockpile and the quarry is already behind.',
      region: [REGION.anvilShelf],
      siteType: 'Mine',
      danger: 'Face collapse in wet weather, and a foreman paid by the cartload.',
      playNotes:
        'The upstream end of every ward in the world, and therefore the upstream end of a great many crimes. Players investigating adulterated chalk in [[quest.the-chalk-that-lies|The Chalk That Lies]] end up standing in this cut, and what they find is not villainy: it is a quarry behind on a forward contract, cutting the marl with a softer bed that mills faster and assays close enough to pass.\n\nWhat a party can do here: sample the beds properly with [[skill.proof-marking|Proof Marking]], find the substitution, and then decide who to tell. Condemning the cut stops the adulterated chalk and also stops the legitimate chalk, and the western chains of the Bound Fault are on a re-cut schedule that assumes delivery.',
      devNotes: PROPOSAL('Siting the marl cut on the shelf keeps the Magic City dependent on ground it does not control, and gives the chalk investigation a physical origin that is a supply-chain failure rather than a conspiracy.'),
    },
  }),

  E({
    id: 'site.the-rotor-yard',
    type: 'site',
    name: 'The Rotor Yard',
    status: 'draft',
    summary: 'The debris field below the shelf lip where everything the Sky City drops eventually lands, and is sorted.',
    tags: ['anvil-shelf', 'wreck', 'salvage'],
    fields: {
      overview:
        'A half-league of boulder field and scrub directly under the western lip, in the rotor turbulence below [[city.sky-city|the Sky City]]. Anything that comes off the lattice ends up here: shed cable, dropped tools, ballast, cargo, envelopes, culled [[creature.loftwrack|loftwrack]] rafts, and people.\n\nThe collapse of [[landmark.the-sixth-mast|the Sixth Mast]] put an estimated four hundred tonnes of lattice into the yard in a single afternoon, and it is still being cut up. The salvage is leased by the season by [[faction.mooring-assize|the Mooring Assize]], which prices the lease against what it expects to fall, and which has never once published a figure for what fell in the collapse.\n\nSix crews work it. They cut [[material.sparbone|sparbone]] spar out of the wreck, recover [[item.crown-bolt|crown bolts]] of an alloy nobody has managed to reproduce, and are paid by weight recovered, not by what the weight was.',
      region: [REGION.anvilShelf],
      siteType: 'Wreck',
      danger: 'Things fall here. That is the entire operating principle of the site.',
      playNotes:
        'The place to buy Sky City equipment without a mass warrant, and the only place a crown bolt turns up honestly. [[item.ballast-jacket|Ballast jackets]] come off bodies here and are sold on within the day.\n\nThe investigation: [[npc.aubran-ferrieu|Aubran Ferrieu]] lives at the shelf foot and has never once come down to the yard, because the tonnage sheets he kept name the section that failed and he does not want to see it. The sheets and the wreckage together prove whose seal signed off the overload. The crews will sell a party anything they have already cut. Getting them to leave a section uncut long enough to be surveyed costs the lease-holder money, and the Assize will notice.',
      devNotes: TBD('Was the Sixth Mast collapse an overload, a cable failure, or both? The wreckage in the Rotor Yard is the physical evidence, so whoever settles that event should settle this site with it.'),
    },
  }),

  E({
    id: 'site.the-humming-scarp',
    type: 'site',
    name: 'The Humming Scarp',
    status: 'draft',
    summary: 'Two miles of shelf lip where iron sings, needles lie, and unlicensed casters come to draw on the updraft.',
    tags: ['anvil-shelf', 'anomaly', 'magic', 'unexplained'],
    fields: {
      overview:
        'A stretch of lip south of the city where the standing thermal does something that nobody has satisfactorily explained. Loose iron rings faintly and continuously. A [[item.faultstone-needle|faultstone needle]] held here swings and settles wrong. Hair stands. Nothing else visible happens at all.\n\nIt is not [[region.aetheric-scar|the Scar]], and the [[faction.fetterhouse|Fetterhouse]] has no jurisdiction over it, and that combination is precisely why it is used. [[skill.storm-tapping|Storm tappers]] work the scarp because the yield here is enormous and because there is no ward office within eleven days\' travel to meter what they draw.\n\nWhat there is instead is a rough count. Of the people known to have tapped the scarp in the last ten years, most are still alive, and the ones who are not stopped being alive suddenly and at a distance from the scarp, which is not how [[mechanic.the-toll|the Toll]] is supposed to present.',
      region: [REGION.anvilShelf],
      siteType: 'Anomaly',
      danger: 'Unmetered charge, no sink within eleven days, and a drop of seven hundred strides at your back.',
      playNotes:
        'A place to do magic off the register, at a price the party will not be able to read at the time. Give a real mechanical benefit for tapping here and defer the cost by sessions rather than scenes, so that the bill arrives when players have stopped connecting it to the scarp.\n\nThings to find: a cairn with eleven names on it and no dates, kept by whoever tapped last; a Fetterhouse survey stake driven in nine years ago and never followed up; and a tapper currently camped on the lip who will teach the trick for the price of someone to sit with them afterwards. [[skill.scar-reading|Scar Reading]] works here but reads gradients that do not behave as the reader expects.',
      devNotes: TBD('Is the Humming Scarp a second, smaller anomaly, an outlier of the Aetheric Scar, or an effect of the thermal itself? Deliberately unresolved. Whichever answer is chosen changes who has authority over it, which is the interesting part.'),
    },
  }),

  /* ================================================================ */
  /* THE MERIDIAN COAST — the fertile shore                            */
  /* ================================================================ */

  E({
    id: 'site.the-green-beds',
    type: 'site',
    name: 'The Green Beds',
    status: 'draft',
    summary: 'A whelk-farming village on the coast road whose beds supply the lacquer the Mediterranean City\'s wiring depends on.',
    tags: ['coast', 'village', 'monopoly', 'aquaculture'],
    fields: {
      overview:
        'Forty houses above a shallow bay walled into eleven rectangular tidal beds, four hours along the coast road east of [[city.mediterranean-city|the Mediterranean City]]. The beds farm [[creature.verdigris-whelk|verdigris whelk]], whose foot secretes a copper-binding liquor that cures hard and green.\n\nThe village does not own the beds. The beds are held under grant by houses in the city, and the villagers are tenants who are paid by the basket and forbidden to sell to anyone else. Bed-wardens patrol at low water with poles. Poachers are driven off the beds by the incoming tide rather than by the wardens, which is a distinction the coroner respects and nobody else does.\n\nThe liquor goes to the conduit yards, and the conduit yards are why [[faction.conduit-college|the Conduit College]] takes an interest in a village of two hundred people.',
      region: [REGION.meridianCoast],
      siteType: 'Village',
      danger: 'Bed-wardens with poles, and a tide that comes in faster than a laden man walks.',
      playNotes:
        'A small, legible injustice on a main road: a village doing skilled dangerous work at piece rates for a monopoly it cannot negotiate with. Players can smuggle liquor out, which is straightforward and pays; or they can help the tenants prove their grant is void, which is slow, legal, and actually changes something.\n\nThe technical hook for crafters: the beds can be seeded on new ground, and a party that learns the seeding will hold a second source of a strategic input. The College has been very careful that nobody ever writes down how it is done.',
      devNotes: PROPOSAL('Two candidate lacquers now serve the same job in the Mediterranean City: whelk liquor from these beds and mirelac out of the Drown. That collision is worth keeping as a live commercial rivalry rather than resolving away.'),
    },
  }),

  E({
    id: 'site.the-burnt-grove',
    type: 'site',
    name: 'The Burnt Grove',
    status: 'draft',
    summary: 'Two hundred years of olive terraces burned in a water quarrel, still deeded, still standing, still an accusation.',
    tags: ['coast', 'ruin', 'feud', 'agriculture'],
    fields: {
      overview:
        'Eleven terraces of black stumps on a south-facing slope above the coast road, with the estate house roofless at the top and the cistern below it still holding water. The grove was [[food.meridian-olive|meridian olive]], planted at a known date, and it burned in a single night nineteen years ago during a quarrel over an irrigation right.\n\nA grove takes two centuries to mature. Burning one is not vandalism on this coast, it is an act of war, and both families understand it as such. The deed has never been sold, the terraces have never been replanted, and the case has never been tried, because trying it would require one family to name what the other did in a court that would then have to act.\n\nThe stumps are coppicing. In another hundred and eighty years there will be a grove here again.',
      region: [REGION.meridianCoast],
      siteType: 'Ruin',
      danger: 'Nothing on the slope. The danger is being seen on it by either family.',
      playNotes:
        'A ruin that is entirely social. There is no treasure and no monster; there is a standing feud with a physical monument, four hours from the most advanced city on the continent, and a cistern that still supplies two villages downhill.\n\nWhat players can do: broker it, which needs [[skill.brokerage|Brokerage]] and a settlement large enough to be worth two centuries; prove who lit it, which is possible because three witnesses are still alive and one is dying; or buy the deed cheap and replant, which makes the party the next target of a feud that has already outlasted one generation.',
      devNotes: TBD('Was the burning ordered, or did a hired hand exceed instructions? The second is more interesting and harder to settle, which is the point of keeping the case untried.'),
    },
  }),

  /* ================================================================ */
  /* THE ASHEN STEPPE — grass, ash and the road south                  */
  /* ================================================================ */

  E({
    id: 'site.the-moult-camps',
    type: 'site',
    name: 'The Moult Camps',
    status: 'draft',
    summary: 'A six-week gathering season on the Moult Fields, worked by crews chosen for being small enough to fit down a burrow.',
    tags: ['steppe', 'camp', 'labour', 'seasonal'],
    fields: {
      overview:
        'Not one camp but eleven, pitched across [[deposit.moult-fields|the Moult Fields]] for the six weeks each spring when the steppe burrowers shed and rebury [[material.steppe-scute|steppe scute]]. Bell tents, a water cart, a weighing frame and a bond clerk.\n\nThe plate has to be recovered from inside the burrow systems before it is re-covered, which means crews small enough to go down a live burrow head first, on a rope, in the dark. That is not a description of adult labourers. Everyone involved knows what it is a description of, the [[faction.bondwrights-hall|Bondwrights\' Hall]] writes the bonds against family debt in the winter and calls them apprenticeships, and [[city.arena-city|the Arena City]]\'s armourers buy the entire take by the cart and ask nothing.\n\nThe season ends when the burrowers close their systems. Anyone still down when a system closes is not usually recovered.',
      region: [REGION.ashenSteppe],
      siteType: 'Camp',
      danger: 'A burrow that is not empty, and no room inside it to turn round.',
      playNotes:
        'Handle with weight and without spectacle: the camps are legal, orderly, well organised and monstrous, and the people running them are not sadists but contractors meeting a delivery date.\n\nWhat a party can actually do in six weeks: buy scute directly and cut the Arena City\'s armourers out for a season; buy out individual bonds, which is expensive and helps exactly one family; document the age of the crews and take it to a jurisdiction where that is a crime, which is [[city.mediterranean-city|the Mediterranean City]] and nowhere nearer; or force the Hall to work the systems with tackle instead of children, which costs the Hall money and costs the families their winter advance. Every option has a bill attached and somebody else pays part of it.',
      devNotes: PROPOSAL('The camps make the scute supply chain a moral problem the players can stand inside. Keep the depiction procedural: rotas, weights and paperwork, never the inside of a burrow in detail.'),
    },
  }),

  E({
    id: 'site.ashwell-stand',
    type: 'site',
    name: 'Ashwell Stand',
    status: 'draft',
    summary: 'A walled well on the raided reach of the steppe run, held by whoever paid the garrison most recently.',
    tags: ['steppe', 'outpost', 'water', 'road'],
    fields: {
      overview:
        'A stone-lined well eighteen strides deep, a dry-stone wall around it with a fighting step, a rain tank, and forty paces of empty ground cleared for the carts. It stands on the run between [[city.arena-city|the Arena City]] and [[city.orath|Orath]], in the stretch of road that has been raided every season for nine years.\n\nThe Stand does not belong to a city. It belongs to whichever company is currently garrisoning it, and the garrison is currently a six-month contract written by [[faction.red-writ|the Red Writ]] and paid for by the caravan interests who need the water to exist. When the contract lapses there is a fortnight in which the Stand belongs to nobody, and everyone on the steppe knows the date.\n\nWater is sold by the head and the animal. The tariff is chalked on the gate and has been rewritten by every garrison.',
      region: [REGION.ashenSteppe],
      siteType: 'Outpost',
      danger: 'Raiders working to a schedule, and a garrison whose contract may already have expired.',
      playNotes:
        'The obvious stop on the southern road and a natural siege set-piece. [[npc.kavel-uur|Kavel Uur]] times his crossings around the contract dates and will tell a party exactly when the Stand is undefended, because he wants somebody else standing in it when it is.\n\nThree ways to play it: escort a water cart through the raided reach; take the next garrison contract yourselves, which makes the party responsible for the tariff and therefore for who dies of thirst; or find out who is paying the raiders, which is the question nobody at the Stand asks because the answer would embarrass a customer.',
      devNotes: TBD('Who funds the raiding? A rival caravan interest, Orath\'s muster, or genuinely independent bands. Orath is name-only canon, so avoid making this an Orath plot without a designer decision.'),
    },
  }),

  /* ================================================================ */
  /* THE CINDER WASTE — desert                                         */
  /* ================================================================ */

  E({
    id: 'site.the-dew-nets',
    type: 'site',
    name: 'The Dew Nets',
    status: 'draft',
    summary: 'A wadi of condensation nets growing water-melons that pass as currency for four hundred leagues.',
    tags: ['desert', 'village', 'water', 'trade'],
    fields: {
      overview:
        'In a shallow wadi off the pan road, six hundred paces of fine mesh netting strung on poles across the mouth of the valley, catching night condensation and dripping it into stone gutters. Below the gutters: fourteen walled plots of [[food.dew-melon|dew melon]], and a hamlet of about ninety people who tend them.\n\nA dew melon holds roughly two days of water. Across [[region.cinder-waste|the Cinder Waste]] melons are counted rather than weighed and change hands as currency, which makes this wadi a mint. One family holds the nets. They do not own the water and cannot, so what they own is mesh, which wears out, which has to be bought from [[city.sifting-city|the Sifting City]]\'s wire looms, which is the hook on which the whole place hangs.',
      region: [REGION.cinderWaste],
      siteType: 'Village',
      danger: 'One still, dry season and the whole place is a valley of empty poles.',
      playNotes:
        'A resupply stop where money is the wrong instrument. Melons buy passage, guides and silence; coin buys much less. Players who arrive with a cart of [[item.sift-screen|sift screen]] mesh will be treated as visiting dignitaries.\n\nThe standing tension: the family that holds the nets is now three brothers who do not agree, and one of them has been approached by a buyer who wants the wadi\'s entire output committed forward. Committing it forward means the caravans that currently cross this way stop being able to buy at the gate, and a road across the waste without a water stop is a different road. Players can arbitrate, take the buyer\'s coin, or quietly wreck the deal by teaching a second wadi how to string nets.',
      devNotes: PROPOSAL('Melons as currency gives the desert its own money and makes water logistics a trade mechanic rather than a survival counter. Keep the mesh dependency: it is what links the desert to the Sifting City.'),
    },
  }),

  E({
    id: 'site.the-swallowed-mile',
    type: 'site',
    name: 'The Swallowed Mile',
    status: 'draft',
    summary: 'A mile of the old pan road, two caravanserai and three wells, collapsed into a burrow field that emptied years ago.',
    tags: ['desert', 'ruin', 'road', 'biology'],
    fields: {
      overview:
        'The old alignment of the pan road ran a mile shorter than the current one. It does not run at all now. [[creature.sandsleeper|Sandsleepers]] burrowed the ground beneath it during their last long aestivation, emerged in a single brood when the rains came, and left a honeycomb under a mile of made road, two caravanserai and three stone-lined wells.\n\nThe collapse took about two years and is still going. The road surface holds a walking man and does not hold a loaded cart, and the caravanserai have gone in to their first-floor windows. Both wells that survived are still sweet, which is the problem: they are the best water in eighty leagues and they sit in the middle of ground that eats carts.\n\nThe current road detours north and adds four days.',
      region: [REGION.cinderWaste],
      siteType: 'Ruin',
      danger: 'Ground that carries a walking man and will not carry a laden animal.',
      playNotes:
        'A traversal puzzle with a prize in the middle. Reaching the good wells on foot is easy; getting a caravan\'s worth of water out of them is an engineering problem, and solving it permanently would cut four days off the pan road for everybody.\n\nWhat is inside: two caravanserai that were abandoned in an orderly fashion and one that was not, a great deal of intact cargo that nobody has been able to lift out, and a burrow system that has been empty long enough for other things to move into it. [[skill.ground-read|Ground Read]] distinguishes a floor that will hold from one that will not; [[skill.charge-blending|Charge Blending]] can collapse a section on purpose, which is how the road might be reopened and also how the wells might be lost.',
      devNotes: TBD('How long is a sandsleeper aestivation, and is the burrow field due to be re-occupied? If the brood cycle is regular, reopening the road is a temporary victory with a date on it, which is better.'),
    },
  }),

  /* ================================================================ */
  /* THE WHITE PANS — salt                                             */
  /* ================================================================ */

  E({
    id: 'site.the-outer-rakes',
    type: 'site',
    name: 'The Outer Rakes',
    status: 'draft',
    summary: 'A raking camp eight days out on the crust, where rations are issued against debt and eating less buys time.',
    tags: ['pans', 'camp', 'indenture', 'extraction'],
    fields: {
      overview:
        'Eight days by sledge from [[city.sifting-city|the Sifting City]], on the far edge of [[deposit.nitre-flats|the Nitre Flats]]: a shade-frame, a weighing platform, a water tank on a cradle, and a hundred and twenty people raking [[material.pan-nitre|pan nitre]] crust into windrows to dry.\n\nThe camp exists because the crust rebuilds fastest at the far edge and because nobody has to look at it. Rations are [[food.sift-cake|sift cake]], issued against the crew\'s debt, so a crew that eats less shortens its own term, which is a mechanism nobody had to design and everybody uses. The water cart comes on the ninth day and is sometimes late.\n\nEverything raked here is graded before it leaves by an assessor of [[faction.pale-assay|the Pale Assay]] who travels with the sledges, and the grade, not the salt, is what the crew is paid on.',
      region: [REGION.whitePans],
      siteType: 'Camp',
      danger: 'Glare, crust that gives way, and a water cart with no redundancy.',
      playNotes:
        'The furthest edge of the Sifting City\'s reach and the cleanest place to see [[mechanic.the-sift-line|the sift line]] as a labour system rather than a crafting screen. Work a season and be paid in a grade you did not agree; or arrive with water and be, briefly, the most powerful person on the pans.\n\nThe evidence hook: [[quest.pan-fever|Pan Fever]] is visible here before it is visible in the city, because the crews raking the far edge breathe the finest fraction and go first. [[npc.tazrit-nourem|Tazrit n\'Ourem]] holds physical indenture papers on about a third of these people in a strongroom four towers away, and the assessor with the sledges keeps a grading book that, read against the pay book, proves the undergrading in a single afternoon.',
      devNotes: TBD('How many outer camps are there, and does the Sifting City know the number? A city that cannot count its own far crews is a very specific kind of city.'),
    },
  }),

  E({
    id: 'site.the-salt-sledges',
    type: 'site',
    name: 'The Salt Sledges',
    status: 'draft',
    summary: 'Four broken sledges in the deep pans, loaded with crated ward chalk stamped by a city four hundred leagues away.',
    tags: ['pans', 'wreck', 'smuggling', 'unexplained'],
    fields: {
      overview:
        'Four heavy freight sledges, two of them through the crust to the axle, sitting in the deep pans well south of any sanctioned route and roughly on the line of the dry crossing that runs unofficially between [[city.sifting-city|the Sifting City]] and [[city.arena-city|the Arena City]].\n\nThe load is intact: eighty-odd crates of [[material.ward-chalk|ward chalk]], cake-pressed, sealed, and stamped with [[city.magic-city|Magic City]] marks and a licence number. Ward chalk is logged stick by stick at the point of burning, so this consignment has a paper trail somewhere, and it is four hundred leagues from anywhere it was supposed to be.\n\nThere are no bodies and no draught animals. There are no tracks left to read. [[npc.sahat-belek|Sahat Belek]] found it working the far white alone and has told nobody.',
      region: [REGION.whitePans],
      siteType: 'Wreck',
      danger: 'Eight days from water in every direction, including the one you came from.',
      playNotes:
        'A find with two separate values. The chalk is worth a fortune and is trivially traceable, so selling it is an act with consequences; the licence number on the crates is worth more than the chalk and costs nothing to carry out.\n\nSahat Belek will guide a party here in exchange for passage papers out of the White Pans for himself and his daughter, and he will not negotiate that price. Getting eighty crates off the deep pans is a logistics problem requiring sledges, water and about eleven days. Getting one crate off is an afternoon and a much better idea.',
      devNotes: TBD('Who sent the sledges, where were they going, and why has nobody come looking? Left deliberately open. The licence number should stay unassigned until a designer wants a war over it.'),
    },
  }),

  /* ================================================================ */
  /* THE DROWN — delta                                                 */
  /* ================================================================ */

  E({
    id: 'site.rack-hundred',
    type: 'site',
    name: 'The Rack Hundred',
    status: 'draft',
    summary: 'A stilt village of drying racks over the bloom cuts, tolled at the weir before its iron ever reaches a furnace.',
    tags: ['drown', 'village', 'iron', 'labour'],
    fields: {
      overview:
        'A hundred and forty houses on stilts over a peat island, and eleven times that number of drying racks, in the middle of [[deposit.bloom-cuts|the Bloom Cuts]]. The village cuts [[material.mire-bloom|mire bloom]] out of numbered marsh pits on a twenty-year rotation, dries it on the racks, and rafts it downriver.\n\nEvery raft is tolled at [[city.black-weir|the Black Weir]] before it reaches a furnace, which means the Rack Hundred does the digging and [[faction.iron-sluice-company|the Iron Sluice Company]] sets the price. The village grows [[food.tide-rice|tide rice]] on the mats between the pits and takes the spring [[creature.blackrun-lamprey|lamprey]] run, and in a bad toll year it eats both instead of selling them.\n\nHouses are re-piled every few years as the peat rots beneath them. The village has moved four hundred paces west in living memory without anyone deciding to.',
      region: [REGION.theDrown],
      siteType: 'Village',
      danger: 'Marsh fever in the wet season, and sluice releases that arrive without notice.',
      playNotes:
        'A working village that shows exactly what the weir\'s leverage does to the people upstream of it. Buy bloom below toll price; hire a punt and a poler; get a bed on a floor that moves.\n\nThe live grievance: two seasons ago a maintenance release put a metre of water over the racks a day after the village had laid out a full cut, and the loss was ruled an act of the river. The village kept the timings. Read against [[npc.ost-vennick|Ost Vennick]]\'s schedule book they would prove the release was not routine, and getting those two documents into the same room is a whole quest. [[skill.marsh-footing|Marsh Footing]] is assumed for anyone working here.',
      devNotes: PROPOSAL('The Rack Hundred gives the Drown a producer village to sit between the bloom cuts and the weir, so the toll has a face and a ledger rather than being an abstraction.'),
    },
  }),

  E({
    id: 'site.the-cold-channel',
    type: 'site',
    name: 'The Cold Channel',
    status: 'draft',
    summary: 'An unlisted mooring in a dead lobe of the delta where cargo changes hulls and the toll book never hears about it.',
    tags: ['drown', 'outpost', 'smuggling', 'criminal'],
    fields: {
      overview:
        'A drowned forest lobe east of [[city.black-weir|the Black Weir]], abandoned by the main channel some decades ago and navigable only between certain water levels. In it: a gantry of salvaged timber, four mooring posts, a stilt shed with a stove, and no name on any chart.\n\nThis is where cargo declared at the weir stops being that cargo. Barges come down on a legitimate manifest, tie up for two hours in the slack, and leave lighter. [[faction.low-tally|The Low Tally]] runs it, [[npc.dagren-hoyle|Dagren Hoyle]]\'s gantry crews work it, and the whole operation depends on knowing the water to within a hand.\n\nThe way in is marked by notched staves cut by [[npc.gwill-ossekind|Gwill Ossekind]], who has been missing since he walked out to re-cut the low-water route. About a third of the staves are now wrong or gone.',
      region: [REGION.theDrown],
      siteType: 'Outpost',
      danger: 'A channel that only exists at certain levels, marked by staves that are a third wrong.',
      playNotes:
        'The smuggling hub of the delta and the physical location of the two-hour window that makes [[quest.the-ullage-run|The Ullage Run]] possible. Players come here to move cargo, to intercept cargo, or to find out where forty barrels went.\n\nThe standing offer: Hoyle is recruiting, is honest about the odds, and pays in Weir transit seals that open gates upriver, which are worth more than money to anyone who wants to cross the delta without being logged. The standing danger: whoever finds Ossekind, or simply finds his staves, controls the eastern approach for as long as the water stays low, and both the Low Tally and the Sluice Company have people out looking.',
      devNotes: TBD('Does the Iron Sluice Company know the Cold Channel exists? Tolerating it and taxing it quietly is a more interesting answer than not knowing.'),
    },
  }),

  /* ================================================================ */
  /* THE MISTFALL COAST — fog and the eastern water                    */
  /* ================================================================ */

  E({
    id: 'site.bell-station-four',
    type: 'site',
    name: 'Bell Station Four',
    status: 'draft',
    summary: 'A two-person bell station on a fog headland, one of the four that have stopped ringing this season.',
    tags: ['mistfall', 'outpost', 'navigation', 'unexplained'],
    fields: {
      overview:
        'A stone hut, a slate cistern, a winch and a bell of about nine hundredweight in an open frame on a headland above the [[city.keth-veyra|Keth Veyra]] approach. Two keepers on a month\'s rotation, relieved by boat, ringing to a written interval whenever the fog closes.\n\nUnder [[mechanic.the-bell-lines|the bell lines]] the approach is navigated by ear: a pilot counts intervals between owned bells and knows where the water is. A silent bell is not a nuisance, it is a route that cannot be walked. Four bells have gone silent this season and this is the second of them.\n\nThe hut is intact. The winch works. The bell is undamaged and the rope is still on it. There is a month of stores in the cistern room and no keepers.',
      region: [REGION.mistfallCoast],
      siteType: 'Outpost',
      danger: TBD('What is actually stopping the bells? Until that is decided the danger here is an empty hut and a cliff path in fog.'),
      playNotes:
        'The physical starting point of [[quest.the-fog-bells|The Fog Bells]]. A party can restart this bell in an afternoon and hold the approach open for as long as somebody stays to ring it, which is the immediate, concrete thing to do and also a trap, because it commits two people to a headland.\n\nWhat is here to find: a keeper\'s interval book with the last eleven days ruled and unfilled, a boat-relief schedule that does not match the harbour\'s copy, and the question of who owns this bell, which nobody at the station could answer even when there were people at the station. Keep the answers thin. Keth Veyra is a name and very little else, and this site should not invent it.',
      devNotes: PROPOSAL('A bell station gives the Mistfall Coast a piece of infrastructure players can operate. Deliberately hollow: it is a stage for the fog-bells investigation, not an account of Keth Veyra, which is canon in name only.'),
    },
  }),

  E({
    id: 'site.the-longshore-hull',
    type: 'site',
    name: 'The Longshore Hull',
    status: 'draft',
    summary: 'A deep-water hull driven onto a shingle strand, and the village that has been living off her for three winters.',
    tags: ['mistfall', 'wreck', 'salvage', 'coastal'],
    fields: {
      overview:
        'A hull of about four hundred tons lying over on her port side on two miles of shingle, three winters ashore and still holding her shape because the strand is stone and not sand. She came out of [[region.eastern-deep|the Eastern Deep]] in fog and nobody has produced a manifest for her.\n\nThe strand village has taken everything reachable: rigging, fastenings, deck timber, and most of a cargo of [[creature.smoker-whale|smoker whale]] oil in casks, which they have been selling quietly down the coast because oil that clean has no business being in a village. Salvage law on this coast is whoever is standing on the wreck, which means the village is on her in shifts, in weather, permanently.\n\nHer holds below the turn of the bilge are still flooded and have not been entered.',
      region: [REGION.mistfallCoast],
      siteType: 'Wreck',
      danger: 'Wreckers who would rather a stranger became salvage than a claimant.',
      playNotes:
        'Straightforward and grim: a party can dive the flooded holds, which nobody local will do, and take whatever is in them, at which point they have to get off a shingle strand past a village that has been eating this ship for three years.\n\nThe better play is commercial. The oil has been going out unstamped and untaxed, and a party that can put a lawful mark on it doubles its price and gives the village a reason to keep them alive. The open question is where she was from: her fastenings are not to any pattern used on this coast, and the answer, whatever it turns out to be, is the only thing on the map that touches what is across the Eastern Deep.',
      devNotes: TBD('Where did the Longshore Hull come from? No canon exists about anything across the Eastern Deep, so leave this unanswered. The fastenings are a hook, not a promise.'),
    },
  }),

  /* ================================================================ */
  /* THE AETHERIC SCAR                                                 */
  /* ================================================================ */

  E({
    id: 'site.the-still-house',
    type: 'site',
    name: 'The Still House',
    status: 'draft',
    summary: 'A farmstead inside the Scar margin where nothing has rotted in forty years, including the bread on the table.',
    tags: ['scar', 'anomaly', 'magic', 'unexplained'],
    fields: {
      overview:
        'A stone farmhouse, a byre and a walled yard, standing two hours inside the licensed margin of [[region.aetheric-scar|the Aetheric Scar]] on ground that was evacuated forty-one years ago. The roof is sound. The rope on the well winch is supple. There is bread on the kitchen table which has not moulded, gone hard or been eaten by anything.\n\nNothing organic in the house has decayed since the evacuation. Nothing living in the house does well either: two survey parties have overnighted here, and both came out having accrued [[mechanic.the-toll|Toll]] they did not spend, in amounts that do not correlate with anything they did.\n\n[[faction.fetterhouse|The Fetterhouse]] has posted the yard and warded the gate. The wards have been re-cut three times and the chalk lines do not go dead here on the usual schedule, which is itself a finding nobody has published.',
      region: [REGION.aethericScar],
      siteType: 'Anomaly',
      danger: 'You will not feel what it is taking until you are outside the wall again.',
      playNotes:
        'A haunted house with no ghost in it, and the correct way to run the Scar: an anomaly that is quiet, domestic and expensive. Give a party [[skill.scar-reading|Scar Reading]] gradients that read as safe, then charge them Toll for the hours they spend inside, unregistered and uncapped, and let them work out the exchange rate afterwards.\n\nThings to do: measure it properly, which is worth a great deal to the Fetterhouse and to anyone who wants to argue with the Fetterhouse; use it as a store, which is what unlicensed casters in the margin already do, since nothing spoils; or find the family, which is possible, because the evacuation lists survive and two of the household are alive and will not discuss the house at all.',
      devNotes: TBD('What is the Still House doing? Deliberately unanswered. Whatever it is should stay a local, physical, measurable effect and never become a haunting.'),
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* Region placement ------------------------------------------------ */
  R('site.the-winterings', 'located_in', REGION.borealCrown),
  R('site.cache-line-nine', 'located_in', REGION.borealCrown),
  R('site.the-nine-hearths', 'located_in', REGION.borealCrown),
  R('site.tarhouse-strand', 'located_in', REGION.borealCrown),
  R('site.the-sour-adits', 'located_in', REGION.ironback),
  R('site.the-cold-adits', 'located_in', REGION.ironback),
  R('site.hookfoot-hospice', 'located_in', REGION.ironback),
  R('site.the-lick', 'located_in', REGION.ironback),
  R('site.the-tally-post', 'located_in', REGION.greatwood),
  R('site.the-cut-line', 'located_in', REGION.greatwood),
  R('site.underbough', 'located_in', REGION.greatwood),
  R('site.the-blind-holdings', 'located_in', REGION.hollowKarst),
  R('site.the-lantern-face', 'located_in', REGION.hollowKarst),
  R('site.long-ford', 'located_in', REGION.ascentBasin),
  R('site.the-eleven-mile-house', 'located_in', REGION.ascentBasin),
  R('site.the-drowned-fair', 'located_in', REGION.ascentBasin),
  R('site.the-marl-cut', 'located_in', REGION.anvilShelf),
  R('site.the-rotor-yard', 'located_in', REGION.anvilShelf),
  R('site.the-humming-scarp', 'located_in', REGION.anvilShelf),
  R('site.the-green-beds', 'located_in', REGION.meridianCoast),
  R('site.the-burnt-grove', 'located_in', REGION.meridianCoast),
  R('site.the-moult-camps', 'located_in', REGION.ashenSteppe),
  R('site.ashwell-stand', 'located_in', REGION.ashenSteppe),
  R('site.the-dew-nets', 'located_in', REGION.cinderWaste),
  R('site.the-swallowed-mile', 'located_in', REGION.cinderWaste),
  R('site.the-outer-rakes', 'located_in', REGION.whitePans),
  R('site.the-salt-sledges', 'located_in', REGION.whitePans),
  R('site.rack-hundred', 'located_in', REGION.theDrown),
  R('site.the-cold-channel', 'located_in', REGION.theDrown),
  R('site.bell-station-four', 'located_in', REGION.mistfallCoast),
  R('site.the-longshore-hull', 'located_in', REGION.mistfallCoast),
  R('site.the-still-house', 'located_in', REGION.aethericScar),

  /* Nearest settlements --------------------------------------------- */
  R('site.the-winterings', 'trades_with', 'site.cache-line-nine', 'cut velvet south twice a winter'),
  R('site.cache-line-nine', 'related_to', 'site.tarhouse-strand', 'the line ends at the strand'),
  R('site.the-nine-hearths', 'related_to', 'site.the-winterings', 'the herders will not camp on the ridge'),
  R('site.tarhouse-strand', 'trades_with', CITY.mediterranean, 'tar south by sea for ropewalks and hulls'),
  R('site.the-sour-adits', 'related_to', CITY.gildedAscent, 'roasted ore floats down to the basin furnaces'),
  R('site.the-cold-adits', 'related_to', 'site.the-sour-adits', 'sells cheese to the camps that are still working'),
  R('site.hookfoot-hospice', 'related_to', CITY.gildedAscent, 'the debt book is honoured on the Counting Stair'),
  R('site.the-lick', 'related_to', CITY.gildedAscent, 'an Ascent house is buying claims sight unseen'),
  R('site.the-tally-post', 'related_to', CITY.treeCity),
  R('site.the-cut-line', 'related_to', CITY.treeCity, 'sells routes past the gate galleries'),
  R('site.underbough', 'related_to', CITY.treeCity, 'tribute village on the forest march'),
  R('site.underbough', 'related_to', CITY.oruvai, 'the march road runs from Oruvai'),
  R('site.the-blind-holdings', 'related_to', CITY.caveAgrarian, 'struck off the rota, not off the map'),
  R('site.the-lantern-face', 'related_to', CITY.caveAgrarian, 'every duct mirror in the city starts here'),
  R('site.long-ford', 'related_to', CITY.gildedAscent, 'two days upstream of the wharves'),
  R('site.the-eleven-mile-house', 'related_to', CITY.gildedAscent),
  R('site.the-eleven-mile-house', 'related_to', CITY.arenaCity, 'first change of horses on the south stair road'),
  R('site.the-drowned-fair', 'related_to', CITY.gildedAscent, 'the fair the city grew out of'),
  R('site.the-marl-cut', 'related_to', CITY.magicCity, 'the annual cut is bought four years forward'),
  R('site.the-rotor-yard', 'related_to', CITY.skyCity, 'directly beneath the lattice'),
  R('site.the-humming-scarp', 'related_to', CITY.skyCity, 'two days south along the lip'),
  R('site.the-green-beds', 'related_to', CITY.mediterranean, 'four hours east on the coast road'),
  R('site.the-burnt-grove', 'related_to', CITY.mediterranean),
  R('site.the-moult-camps', 'related_to', CITY.arenaCity, 'the armourers buy the whole take'),
  R('site.ashwell-stand', 'related_to', CITY.arenaCity),
  R('site.ashwell-stand', 'related_to', CITY.orath, 'the halfway water on the steppe run'),
  R('site.the-dew-nets', 'related_to', CITY.siftingCity, 'the mesh comes from the wire looms'),
  R('site.the-swallowed-mile', 'related_to', CITY.siftingCity, 'the old pan road alignment'),
  R('site.the-outer-rakes', 'related_to', CITY.siftingCity, 'eight days out by sledge'),
  R('site.the-salt-sledges', 'related_to', CITY.magicCity, 'the crates carry Magic City licence marks'),
  R('site.the-salt-sledges', 'related_to', CITY.arenaCity, 'roughly on the line of the dry crossing'),
  R('site.rack-hundred', 'related_to', CITY.blackWeir, 'every raft is tolled at the gates'),
  R('site.the-cold-channel', 'related_to', CITY.blackWeir, 'two hours downstream of the toll book'),
  R('site.the-cold-channel', 'related_to', CITY.floatingSwamp),
  R('site.bell-station-four', 'related_to', CITY.kethVeyra, 'second bell on the approach'),
  R('site.the-longshore-hull', 'related_to', REGION.easternDeep, 'she came out of the Deep in fog'),
  R('site.the-still-house', 'related_to', CITY.magicCity, 'inside the licensed margin'),

  /* Who holds them --------------------------------------------------- */
  R('faction.pitchguard', 'controls', 'site.the-tally-post', 'four archers and a licence clerk on rotation'),
  R('faction.bonewax-post', 'controls', 'site.the-eleven-mile-house', 'the locked room and the morning changeover'),
  R('faction.low-tally', 'infiltrates', 'site.the-eleven-mile-house', 'same stalls, eleventh hour of the night', true),
  R('faction.low-tally', 'controls', 'site.the-cold-channel', 'the two-hour slack and everything in it'),
  R('faction.iron-sluice-company', 'controls', 'site.rack-hundred', 'by toll, not by title'),
  R('faction.pale-assay', 'controls', 'site.the-outer-rakes', 'through the grade stamp on the sledges'),
  R('faction.bondwrights-hall', 'controls', 'site.the-moult-camps', 'winter bonds written against family debt'),
  R('faction.red-writ', 'controls', 'site.ashwell-stand', 'a six-month garrison contract with a known expiry'),
  R('faction.conduit-college', 'controls', 'site.the-green-beds', 'the beds are held under city grant'),
  R('faction.concord-of-weights', 'controls', 'site.long-ford', 'the ferry lease and the forward contracts'),
  R('faction.mooring-assize', 'controls', 'site.the-rotor-yard', 'salvage leased by the season'),
  R('faction.fetterhouse', 'controls', 'site.the-still-house', 'posted, warded and re-cut three times'),
  R('faction.mirror-assembly', 'contests', 'site.the-blind-holdings', 'a survey party is coming to re-register them as empty'),
  R('faction.standing-hour', 'contests', 'site.the-sour-adits', 'stewards in three of the roast yards'),
  R('site.the-sour-adits', 'owes_debt_to', 'faction.concord-of-weights', 'five of the six owning houses are mortgaged'),
  R('site.the-marl-cut', 'owes_debt_to', 'faction.fetterhouse', 'the cut is sold four years forward'),
  R('site.tarhouse-strand', 'owes_debt_to', 'faction.concord-of-weights', 'winter grain bought against next season\'s tar'),
  R('faction.bonewax-post', 'related_to', 'site.cache-line-nine', 'the northern seal-runs depend on the pits'),
  R('faction.bonewax-post', 'related_to', 'site.tarhouse-strand', 'northernmost seal-house, in the tar factor\'s back room'),
  R('faction.bondwrights-hall', 'related_to', 'site.the-sour-adits', 'writes the roast-yard bonds and prices the replacements'),
  R('faction.low-tally', 'smuggles_with', 'site.the-salt-sledges', 'the wreck sits on the dry crossing', true),

  /* What they produce ------------------------------------------------ */
  R('site.the-sour-adits', 'produces', 'material.scaldstone'),
  R('site.the-lantern-face', 'produces', 'material.sunwell-mica'),
  R('site.the-marl-cut', 'produces', 'material.ward-chalk', 'as milled marl, fired elsewhere'),
  R('site.the-outer-rakes', 'produces', 'material.pan-nitre'),
  R('site.the-moult-camps', 'produces', 'material.steppe-scute'),
  R('site.rack-hundred', 'produces', 'material.mire-bloom'),
  R('site.the-cold-adits', 'produces', 'food.adit-cheese'),
  R('site.the-blind-holdings', 'produces', 'food.gallery-cap'),
  R('site.underbough', 'produces', 'food.bole-mast'),
  R('site.the-dew-nets', 'produces', 'food.dew-melon'),
  R('site.rack-hundred', 'produces', 'food.tide-rice'),
  R('site.cache-line-nine', 'related_to', 'food.cache-fat', 'thirty-one pits of it'),
  R('site.long-ford', 'related_to', 'food.stair-loaf', 'the price is chalked on the ferry house a day late'),
  R('site.the-outer-rakes', 'consumes', 'food.sift-cake', 'issued against the crew\'s debt'),
  R('site.the-dew-nets', 'consumes', 'item.sift-screen', 'the mesh wears out and cannot be made locally'),
  R('site.the-sour-adits', 'related_to', 'deposit.sour-lodes'),
  R('site.the-lantern-face', 'related_to', 'deposit.lantern-beds'),
  R('site.the-marl-cut', 'related_to', 'deposit.ward-marls'),
  R('site.the-outer-rakes', 'related_to', 'deposit.nitre-flats'),
  R('site.the-moult-camps', 'related_to', 'deposit.moult-fields'),
  R('site.rack-hundred', 'related_to', 'deposit.bloom-cuts'),
  R('site.the-tally-post', 'related_to', 'deposit.standing-fifty', 'the count is chalked on the outside wall'),
  R('site.the-tally-post', 'related_to', 'material.blackbole-timber'),
  R('site.the-rotor-yard', 'produces', 'material.sparbone', 'cut out of fallen lattice and culled rafts'),
  R('site.the-rotor-yard', 'related_to', 'item.crown-bolt', 'the only place one turns up honestly'),
  R('site.the-rotor-yard', 'related_to', 'item.ballast-jacket', 'taken off bodies and sold within the day'),
  R('site.the-lantern-face', 'related_to', 'item.sunwell-mirror'),
  R('site.the-salt-sledges', 'related_to', 'material.ward-chalk', 'eighty crates, sealed and stamped'),

  /* Life ------------------------------------------------------------- */
  R('creature.lamphorn', 'inhabits', 'site.the-winterings'),
  R('creature.slagbuck', 'inhabits', 'site.the-lick'),
  R('creature.mirror-swift', 'inhabits', 'site.the-lantern-face'),
  R('creature.bolewright-wasp', 'inhabits', 'site.the-cut-line'),
  R('creature.sandsleeper', 'inhabits', 'site.the-swallowed-mile'),
  R('creature.verdigris-whelk', 'inhabits', 'site.the-green-beds'),
  R('creature.blackrun-lamprey', 'inhabits', 'site.rack-hundred'),
  R('creature.chalk-louse', 'inhabits', 'site.the-marl-cut', 'found twice this year, burned twice'),
  R('creature.loftwrack', 'related_to', 'site.the-rotor-yard', 'a culled raft lands on whatever is below'),
  R('creature.sentinel-tick', 'used_by', 'site.underbough', 'the scouts wear them behind the ear'),
  R('creature.smoker-whale', 'related_to', 'site.the-longshore-hull', 'most of a cargo of her oil, in casks'),
  R('site.the-burnt-grove', 'related_to', 'food.meridian-olive', 'two centuries of it, in one night'),

  /* People ----------------------------------------------------------- */
  R('npc.vetla-torvik', 'related_to', 'site.the-cut-line', 'here more often than not'),
  R('npc.saarik-rauda', 'related_to', 'site.underbough', 'the spring levy comes up the march road'),
  R('npc.aune-mustsalu', 'related_to', 'site.underbough', 'the village keeps its own tally of who has paid'),
  R('npc.iratze-zubiate', 'related_to', 'site.the-lantern-face', 'needs duct plate off the books'),
  R('npc.ossane-gorbea', 'related_to', 'site.the-blind-holdings', 'buying failed galleries through a cousin'),
  R('npc.aubran-ferrieu', 'related_to', 'site.the-rotor-yard', 'has never once come down to it'),
  R('npc.sahat-belek', 'related_to', 'site.the-salt-sledges', 'found it alone and told nobody'),
  R('npc.tazrit-nourem', 'related_to', 'site.the-outer-rakes', 'holds papers on about a third of the crew'),
  R('npc.kavel-uur', 'related_to', 'site.ashwell-stand', 'times his crossings around the contract dates'),
  R('npc.dagren-hoyle', 'related_to', 'site.the-cold-channel', 'his gantry crews work the slack'),
  R('npc.gwill-ossekind', 'related_to', 'site.the-cold-channel', 'his staves mark the way in'),
  R('npc.ost-vennick', 'related_to', 'site.rack-hundred', 'the release the village kept the timings of'),

  /* Play ------------------------------------------------------------- */
  R('quest.the-chalk-that-lies', 'involves', 'site.the-marl-cut', 'the substitution starts at the face'),
  R('quest.the-fog-bells', 'involves', 'site.bell-station-four', 'the second silent bell'),
  R('quest.the-ullage-run', 'involves', 'site.the-cold-channel', 'where forty barrels stop being forty barrels'),
  R('quest.pan-fever', 'involves', 'site.the-outer-rakes', 'the far crews show it first'),
  R('quest.the-sixteenth-mast', 'related_to', 'site.the-rotor-yard'),
  R('site.the-drowned-fair', 'related_to', 'landmark.the-brass-standard', 'the weights that predate the charter'),
  R('site.the-rotor-yard', 'related_to', 'landmark.the-sixth-mast', 'four hundred tonnes of it, still being cut up'),
  R('site.rack-hundred', 'related_to', 'machine.the-sluice-hammers', 'the bloom is beaten into bar at the weir'),
  R('site.the-marl-cut', 'related_to', 'machine.the-ward-kilns', 'the milled marl is fired in the fault field'),
  R('site.the-blind-holdings', 'related_to', 'material.cudmother', 'starters that cannot legally exist outside the city'),
  R('site.the-blind-holdings', 'related_to', 'mechanic.the-mirror-rota', 'struck off it nine years ago'),
  R('site.the-outer-rakes', 'related_to', 'mechanic.the-sift-line'),
  R('site.the-humming-scarp', 'related_to', 'mechanic.the-toll', 'unmetered, and it does not present as it should'),
  R('site.the-still-house', 'related_to', 'mechanic.the-toll', 'accrued by people who spent nothing'),
  R('site.the-humming-scarp', 'related_to', 'skill.storm-tapping', 'the yield is enormous and nobody is counting'),
  R('site.the-still-house', 'requires', 'skill.scar-reading'),
  R('site.cache-line-nine', 'requires', 'skill.cold-camp'),
  R('site.the-salt-sledges', 'requires', 'skill.the-far-walk'),
  R('site.the-cold-channel', 'requires', 'skill.marsh-footing'),
  R('site.the-lantern-face', 'requires', 'skill.mirror-cutting'),
  R('site.the-cut-line', 'related_to', 'skill.wire-and-snare', 'the same snare takes deer and people'),
  R('site.the-marl-cut', 'related_to', 'skill.proof-marking', 'sampling the beds properly is the whole investigation'),
  R('site.hookfoot-hospice', 'related_to', 'skill.weather-eye', 'twelve hours of warning decides the crossing'),

  /* History and roads ------------------------------------------------ */
  R('site.the-drowned-fair', 'follows', 'event.the-ferry-and-the-weight', 'the fair the ferry and the stone grew out of'),
  R('site.the-rotor-yard', 'follows', 'event.the-sixth-mast-collapse', 'four hundred tonnes of it landed here in an afternoon'),
  R('site.the-cut-line', 'follows', 'event.the-purged-quarter', 'families of the quarter the archive will not name'),
  R('site.the-tally-post', 'follows', 'event.the-first-felling-licence', 'the paper about a tree, and the armed men who make it mean something'),
  R('site.the-blind-holdings', 'related_to', 'event.the-gallery-blight', 'struck off the rota nine years before the blight made rationing a crisis'),
  R('site.ashwell-stand', 'related_to', 'route.the-salt-road', 'the halfway water on the raided reach'),
  R('site.the-swallowed-mile', 'related_to', 'route.the-salt-road', 'the old alignment, and the four days the detour costs'),
  R('site.the-salt-sledges', 'related_to', 'route.the-dry-crossing', 'roughly on the line, and four hundred leagues off any lawful one'),
  R('site.underbough', 'related_to', 'route.the-timber-line', 'the village the march road runs through'),
  R('site.the-cold-channel', 'related_to', 'route.the-weir-run', 'where a load stops being the load that was gated'),
  R('site.rack-hundred', 'related_to', 'route.the-weir-run'),
  R('site.the-eleven-mile-house', 'related_to', 'route.the-salt-road', 'first change of horses out of the Ascent'),
  R('site.the-green-beds', 'related_to', 'route.the-green-line', 'the liquor goes west along the coast road'),

  /* Faith ------------------------------------------------------------ */
  R('site.the-tally-post', 'related_to', 'religion.the-standing-dead', 'three of the Fifty are burial trunks'),
  R('site.the-blind-holdings', 'related_to', 'religion.the-mirror-office', 'a gallery denied light reads it as excommunication'),
  R('site.the-outer-rakes', 'related_to', 'religion.the-setting-out', 'the dead are set out on the crust'),
  R('site.the-moult-camps', 'related_to', 'religion.the-unyoking', 'a life is a carrying, and these are short ones'),
]
