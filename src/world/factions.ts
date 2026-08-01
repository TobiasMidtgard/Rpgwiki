/**
 * Factions and guilds.
 *
 * Fourteen bodies that between them hold every settlement on the continent.
 * Each one is written so that its public identity and its actual business
 * diverge: the `publicIdentity` field is what the faction says in its own hall,
 * the `hiddenAgenda` field is what it is doing, and the gap between them is the
 * play. The relation block at the foot of this file is the point of the module —
 * it is the source of the political layer, the territory layer and the editable
 * relationship matrix.
 *
 * Everything here is a proposal. The brief establishes thirteen settlements and
 * nothing about who runs them.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE CONCORD OF WEIGHTS                                            */
  /* ================================================================ */

  E({
    id: 'faction.concord-of-weights',
    type: 'faction',
    name: 'The Concord of Weights',
    aka: ['The Concord', 'The Ninth Morning'],
    status: 'draft',
    summary: 'Forty-one counting houses that set the weight, the tariff and the rate, and govern the Gilded Ascent without ever using the word.',
    tags: ['trade', 'credit', 'government', 'core'],
    accent: '#b98b3a',
    fields: {
      overview:
        "The Concord is a private association of chartered counting houses on the [[landmark.the-counting-stair|Counting Stair]]. Its charter describes it as a body for the mutual certification of weights and the orderly clearing of paper. It has no territory, no army, no franchise and no legal authority over anyone who has not signed something.\n\nIt also holds [[landmark.the-brass-standard|the Brass Standard]], operates [[machine.the-tally-engine|the Tally Engine]] and [[machine.the-assay-cage|the Assay Cage]], licenses every factor in the basin, and posts the clearing rate every ninth morning on a board the size of a door. Between them those four things decide what a bale is worth, whether a contract is enforceable, who may trade at all, and what the money in your hand did overnight. The [[city.gilded-ascent|Gilded Ascent]] has an elected Terrace Assembly which runs drains, fires and the fairs calendar with real competence, and which has never once been consulted about any of the above.\n\nThe Concord's problem is arithmetic rather than opposition. Four fifths of the clearing reserve is lent out against counterweight leases in [[city.sky-city|the Sky City]], and the reserve is what makes a [[item.stair-writ|stair writ]] worth its face. Nobody outside three rooms knows the figure. The houses that suspect it deal with the suspicion by lending more, because a house that stops clearing stops voting within a season.",
      factionType: 'Cartel',
      scale: '41 chartered houses, about 2,300 sworn clerks and bailiffs; paper enforceable in eight settlements',
      founded: 'Dated from the Seventh Terrace fire, which is the first year any house ledger covers',
      ideology:
        "Certainty is a manufactured good and somebody has to make it. The Concord's honest belief, argued at length and not cynically, is that a trusted weight is worth more to a carter in the Pans than any prince has ever been, and that the institution which supplies it has earned the right to be paid for it in perpetuity. Everything unpleasant the Concord does follows from a second belief bolted onto the first: that anything which threatens the institution threatens the weight, and is therefore not a political disagreement but a form of vandalism.",
      creed: 'One weight, one word, one rate.',
      publicIdentity:
        "A trade body. It certifies, it clears, it lends, and it says so plainly in a charter anyone may read at the eleventh landing. Concord men are careful never to describe a decision as governing: the rate is announced, not imposed, and a house that dislikes it is free to clear elsewhere, which is true and which nobody has ever managed to do. The public tone is dull on purpose. There are no robes, no processions and no titles above Chief Factor, and the chamber is deliberately plainer than the houses around it.",
      publicFace: 'The rate board on the Counting Terrace, and [[npc.wessel-ondriek|Wessel Ondriek]] reading it aloud at dawn',
      hiddenAgenda:
        "The Concord is buying the debts of other settlements so that its ledger, rather than their councils, decides who eats. This is not a plot with a room and a map. It is four separate prudent-looking programmes that add up to one: the bore advances that hold [[city.sifting-city|the Sifting City]]'s water, the grain advances against next year's light allocation in [[city.cave-agrarian-city|the Hollow Karst]], the felling-licence paper it holds against [[city.tree-city|the Tree City]], and the counterweight leases that have swallowed its own reserve.\n\nUnderneath that sits the thing Wessel Ondriek cannot say: the reserve is a fiction, and the debt-buying is partly an attempt to acquire real assets before anyone re-assays the paper ones. And underneath that sits the meanest item on the books, which is the Concord's quiet funding of [[faction.standing-hour|the Standing Hour]]'s strike fund. A labour movement whose money you supply is a labour movement whose strikes you can permit or refuse.",
      leadership:
        "Seats are held by houses, not by people, and a house votes its ledger at one vote per thousand in cleared paper. Nine houses hold a working majority between them and have done for two decades. The rate itself is set by a committee of three, drawn by lot from the seated houses each season, meeting in a room off the chamber with the shutters closed. The lot is genuinely random and has been audited twice; what is not random is that all forty-one houses know each other's exposure to within a few per cent and vote accordingly.",
      leaderTitle: 'Chief Factor of the Counting Stair',
      ranks: [
        row({ rank: 'Runner', req: 'Nothing but a name a clerk will write down', grants: 'A tally board and the right to queue at a house window' }),
        row({ rank: 'Clerked hand', req: 'Literacy and one house prepared to mark for you', grants: 'A wage, a bench, and a conduct bond lodged against you' }),
        row({ rank: 'Sworn clerk', req: '[[skill.ledger-hand|Ledger Hand]] to guild proof and two unblemished years', grants: 'May witness and audit; may not bind a house to anything' }),
        row({ rank: 'Factor', req: 'Two sponsoring houses and a lodged bond of four hundred', grants: 'A [[item.factors-seal|factor\'s seal]]; the power to bind your house by signature' }),
        row({ rank: 'Seated factor', req: 'A house vote cast in your name for three seasons running', grants: 'Bonded warehouse keys, terrace pass to the eleventh, hoist priority' }),
        row({ rank: 'House principal', req: 'A charter and a thousand in cleared paper', grants: 'A Concord vote, a chamber seat, and liability that outlives you' }),
        row({ rank: 'Chief Factor', req: 'Election by the seated houses; in practice, the nine', grants: 'Sets the clearing rate; holds one of the three seals on the Brass Standard' }),
      ],
      resources:
        "A clearing reserve of stated size and unstated composition. [[machine.the-tally-engine|The Tally Engine]], which settles cross-city debt without a coin moving. [[machine.the-assay-cage|The Assay Cage]] and the sealed reference masses beneath the Stair. Around 900 bailiffs, who outnumber the city's actual watch three to one and are answerable to houses rather than to any court. Three retained companies from [[faction.red-writ|the Red Writ]] on standing contract, quartered below the fourth terrace. And the indenture register in [[district.gilded-ascent-salt-office|the Salt Office]], which is the collateral of last resort behind a great deal of the above.",
      controlledMaterials: TBD('The Concord holds no commodity anyone needs, which is its one real weakness. Do we keep that as a feature, or hand it a monopoly it can be made to lose?'),
      headquarters:
        "The Concord chamber on [[district.gilded-ascent-counting-terrace|the Counting Terrace]]: one long room, forty-one benches, a rate board and no windows on the street side. The working apparatus is elsewhere and deliberately so. Weights are certified in the Salt Office annexe, clearing is done in the engine hall two terraces down, and the reserve is not in any of the three buildings people assume it is in.",
      territory:
        "Formally, nothing. In practice the eleven terraces, the pass road tariff farm, and the four chartered staiths at [[district.gilded-ascent-confluence-wharves|the Confluence Wharves]]. Beyond the basin the Concord holds no ground and wants none: it holds paper. A factory house on the Mole at [[city.mediterranean-city|the Mediterranean City]], correspondents in six settlements, and lodgings within sight of the Sky City registry hall occupied by men who are careful never to say what they are doing there.",
      relationNotes:
        "Allied with [[faction.bondwrights-hall|the Bondwrights' Hall]] to the point of fusion: the Concord's judgments manufacture the paper the Hall sells, and a serious attack on either would take down both. Creditor and hostage to [[faction.mooring-assize|the Mooring Assize]] in the same breath. Rival to [[faction.conduit-college|the Conduit College]], which will not enforce Ascent bond paper in its harbour and has been offered a great deal to change its mind. Openly resented by [[faction.pale-assay|the Pale Assay]], whose grade stamp is priced here rather than in the Pans. Secretly the paymaster of [[faction.standing-hour|the Standing Hour]]. Buys, and does not discuss, the subscription list of [[faction.bonewax-post|the Bonewax Post]].",
      recruitment:
        "Two sponsors and a bond, which is the honest answer and excludes almost everyone. The unofficial routes are three: be born into a house, be bought into one after a default that leaves you useful, or be recruited out of the Salt Office because you are the clerk who noticed something. Players enter at Clerked hand or, after [[quest.short-weight|Short Weight]], at Factor with a desk and a leash. The Concord does not care about your morals and cares enormously about your literacy: an illiterate applicant is not refused, they are simply never understood to have applied.",
      requiredSkills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.proof-marking', 'skill.brokerage'],
      crimes:
        "Signing a false weight against [[landmark.the-brass-standard|the Brass Standard]] is the only capital offence on the Ascent's books, and the Concord asked for it. Cutting or recutting a [[item.factors-seal|factor's seal]] into a [[item.cut-seal|cut seal]] costs the right hand and does not cancel the debt. Releasing [[creature.ledger-moth|ledger moths]] in a bonded archive is prosecuted as arson. The Concord's own conduct is governed by nothing except the charter, and the charter says only that a house must clear or lose its vote.",
      questlineNotes:
        "The guild line proper: [[quest.short-weight|Short Weight]] is the opener and the desk a character takes at the end of it decides which of the seven branches ever opens for them. [[quest.the-master-weight|The Master Weight]] turns the Concord's own vault into the mark. [[quest.the-scar-concession|The Scar Concession]] is the hinge of the main thread and the Concord is one of three bidders. Local work with no branch attached: recover [[npc.ilke-samarost|Ilke Samarost]]'s final audit before her old lodging is re-let, decide whether [[npc.brask-vellmar|Brask Vellmar]]'s condemned cable is forced or buried, and choose whether the third Standing Hour stoppage is bought off again.",
      repRewards: [
        row({ tier: 'Struck off', reward: 'Nothing, and no writ you hold is honoured', note: 'Bailiffs may enter your lodging without a hearing. Other cities will still trade with you; the basin will not.' }),
        row({ tier: 'Unrated', reward: 'Cash trade only, at the window, behind everyone else', note: 'The default for anyone who has not signed. Not hostile, simply invisible.' }),
        row({ tier: 'Corresponding', reward: 'A credit line at the [[mechanic.standing-ledger|Standing Ledger]] and hoist passage to the fourth terrace', note: 'Interest starts here and runs on the campaign clock.' }),
        row({ tier: 'Bonded', reward: 'Rated warehouse space, bonded storage at cost, and a bailiff who knocks first', note: 'The first tier at which the Concord will lend against something other than goods.' }),
        row({ tier: 'Sealed', reward: 'A factor\'s seal, terrace pass to the eleventh, and one writ a season the Concord will not question', note: 'Also the tier at which the Concord starts giving you errands you cannot refuse.' }),
        row({ tier: 'Seated', reward: 'A vote, warehouse keys across the basin, and the rate a day before the board is posted', note: 'Endgame standing. A day of foreknowledge on the rate is the single most valuable reward in the trade game.' }),
      ],
      currentPlans: [
        'Hold the clearing rate steady through the winter without disclosing the composition of the reserve.',
        'Take the Scar concession at auction, or make certain the Mooring Assize does not.',
        'Complete the purchase of the Sifting City bore paper, which would give the Ascent legal title to a desert city\'s water.',
        'Persuade the Mediterranean quarter assembly to recognise indenture bonds in the harbour court, at whatever price.',
        'Keep the Standing Hour funded, grateful and losing.',
      ],
      history:
        "The sequence every house agrees on is a ferry, then a bonded warehouse, then a weight everybody consented to use. The Concord is what grew on top of the weight. The Seventh Terrace fire is the founding date in practice, because it is the year insurance began and therefore the year the ledgers start, and the Concord's first genuine act of government was pricing that insurance so that stone was cheaper than the premium. The other fixed point in living memory is the Standing Hour itself: nine hours in which every cable in the city stopped, after which the clapper came out of [[landmark.the-stopped-bell|the Stopped Bell]] by Concord order and has never gone back in.",
      devNotes:
        PROPOSAL('The Concord as de facto government of the Gilded Ascent, the ninth-morning rate ritual, the three-house rate committee and the reserve crisis are all proposed.') +
        '\n\nNAMING COLLISION, needs a decision: the quest manifest calls the Ascent merchant guild "the Brass Assize" in [[quest.short-weight|Short Weight]] and its seven branches. That is the same institution as the Concord of Weights described here, and one of the two names has to go. Recommendation: keep the Concord as the body and let "Brass Assize" be the name of its licensing arm, so both strings survive.\n\nDESIGN INTENT: the Concord is the faction a party is most likely to work for without noticing they have been recruited. Everything it offers is a service, every service is priced, and the price is always paid later. It should never threaten anyone directly. It sends a clerk.',
    },
  }),

  /* ================================================================ */
  /* THE MOORING ASSIZE                                                */
  /* ================================================================ */

  E({
    id: 'faction.mooring-assize',
    type: 'faction',
    name: 'The Mooring Assize',
    aka: ['The Assize', 'The Register'],
    status: 'draft',
    summary: 'Licenses masts, lift-loads and counterweight rights above the Anvil Shelf; nothing rises unpriced, and the updraft is weakening.',
    tags: ['government', 'licensing', 'sky', 'core'],
    accent: '#6f8fa8',
    fields: {
      overview:
        "A licensing body that became a government because it held the only register that mattered. The Assize weighs, licenses and prices everything that goes up: fifteen mooring masts, every lift-load, every counterweight lease, and the assessed mass allowance of every registered resident of [[city.sky-city|the Sky City]]. It did not seize power. It simply turned out that in a city where mass is the binding constraint, the office that records mass decides everything else.\n\nIts bench is the fifteen mast-lease holders. Leases are heritable, saleable and indivisible, there is no citizen franchise of any kind, and the only ground on which a lease can be forfeited is a false tonnage return. That provision is the strongest anti-corruption clause on the continent on paper and has been used once in forty years.\n\nThe Assize is also the most frightened institution in this file. Nine years of survey figures show the thermal weakening, the city is several hundred tonnes over its rated load, and the Warden has been shaving the returns rather than sign the eviction lists that would lighten it.",
      factionType: 'Government',
      scale: '15 mast houses, 40 mass-registrars, 300 mast wardens; jurisdiction ends at the shelf edge and its money does not',
      founded: 'The register is older than the bench. The first lease predates any surviving copy of the charter.',
      ideology:
        "Weight is truth. Everything else in the city is negotiable and mass is not, so the Assize has built a legal culture in which the honest declaration of a number is the highest civic virtue and the falsification of one is worse than violence. Assault is a fine here. Ballast fraud is capital, because the same act done four times is a structural failure and no registrar can tell in advance which one is the fourth. The city knows this is disproportionate and enforces it anyway, and the Assize is genuinely proud of that.",
      creed: 'Declare it, or it does not rise.',
      publicIdentity:
        "A register with a bench attached. The Assize presents itself as procedure rather than power: it does not rule, it records, and if the record has consequences that is the nature of arithmetic. It publishes the tonnage tables, the lease roll and the annual [[material.sparbone|sparbone]] quota, and it publishes them on time. Registrars are inspectors rather than police, wear no uniform beyond a brass rule at the belt, and are feared considerably more than the wardens are.",
      publicFace: '[[npc.cesille-vaudry|Cesille Vaudry]], Warden of the Mooring Crown, and the load tables posted at every mast head',
      hiddenAgenda:
        "Two secrets, and the second is the one that ends the city. The first is the survey: nine years of measurements showing the thermal over [[region.anvil-shelf|the Anvil Shelf]] losing strength season by season. The figures exist, they are consistent, and three people have seen the whole series.\n\nThe second is what the Assize has done about it. It has been buying ground land under other names for six years, at [[district.sky-city-shelf-foot|the shelf foot]], along the pass road and in the [[region.ascent-basin|Ascent Basin]], through Ascent factors who are paid not to ask. The mast houses are quietly building somewhere to land. If that becomes public the lease market collapses overnight, which means the Assize now has an interest in the survey staying buried that is entirely separate from the survey being true.",
      leadership:
        "Fifteen leases, fifteen families, one bench. The Warden of the Mooring Crown chairs it and holds the casting vote and the load roll, and the office has run in the Vaudry house for three generations by the simple mechanism of nobody else wanting the liability. Below the bench sit the mass-registrars, who are appointed for life, cannot be dismissed by the bench, and are the only officials in the city who can order a district lightened.",
      leaderTitle: 'Warden of the Mooring Crown',
      ranks: [
        row({ rank: 'Allowance holder', req: 'An assessed mass allowance in your own name', grants: 'The right to remain aloft, own property and be buried aloft' }),
        row({ rank: 'Declared crew', req: 'A mast house prepared to carry your mass on its ledger', grants: 'Working access to the mooring ring and the outer decks' }),
        row({ rank: 'Sworn weigher', req: 'Two seasons on the scales and a clean count', grants: 'May weigh and sign for cargo up to fifty tonnes' }),
        row({ rank: 'Mass-registrar', req: 'Examination before the bench; appointment is for life', grants: 'May board any craft, open any hold, and order a deck lightened' }),
        row({ rank: 'Lease tenant', req: 'A sub-lease on deck space or mooring time, and the rent to hold it', grants: 'Priority lift, a share of mast fees, and no heirs worth the name' }),
        row({ rank: 'Mast house', req: 'One of fifteen leases, by inheritance or by purchase at a price nobody publishes', grants: 'A bench seat, a vote, and the tonnage register of your own mast' }),
        row({ rank: 'Warden', req: 'Election by the bench; in practice, whichever house holds the second counterweight lease', grants: 'The casting vote, [[landmark.the-load-roll|the load roll]] and the survey series' }),
      ],
      resources:
        "The lease roll and the tonnage register, which together are the city. [[landmark.the-mooring-crown|The Mooring Crown]] and its compressors. Fifteen masts, of which one is [[landmark.the-sixth-mast|the Sixth Mast]] and is a memorial rather than an asset. The annual cut of [[material.ward-chalk|ward chalk]] out of [[deposit.ward-marls|the Ward Marls]] under the shelf turf, sold years forward to [[city.magic-city|the Magic City]]. The [[material.sparbone|sparbone]] quota. Three hundred mast wardens with [[item.mooring-lance|mooring lances]], trained to board and to hole an envelope. And the ability to refuse lift, which has ended two disputes without a blade drawn.",
      controlledMaterials: ['material.ward-chalk', 'material.sparbone', 'material.stairwire'],
      headquarters:
        "The registry hall in [[district.sky-city-crown-houses|the Crown Houses]], directly under the Mooring Crown: a single circular room with the lease roll on the wall, the load roll on a drum in the floor, and the survey series in a locked case that three keys open. The scales themselves are in [[district.sky-city-mooring-ring|the Mooring Ring]], because the Assize has always insisted that weighing happen in public.",
      territory:
        "The ring, the fifteen masts, the counterweight runs on the shelf below, and the ward marl workings. Off the ring its writ stops absolutely: the Assize has no power at the shelf foot and knows it, which is exactly why it has been buying land there. Its real extra-territorial holding is the forward ward-chalk contract with the Magic City, which is a debt as much as a sale and gives the Assize a seat at [[quest.the-scar-concession|the concession auction]] it would not otherwise have.",
      relationNotes:
        "Mutually mortgaged with [[faction.concord-of-weights|the Concord of Weights]]: the Ascent's reserve sits in Sky City counterweight leases and the Ring eats on Ascent paper, and neither can call the loan without ending itself. Sells ward marl forward to [[faction.fetterhouse|the Fetterhouse]] and is bidding against it for the Scar concession, which is an uncomfortable position it has not resolved. Buys precision from [[faction.conduit-college|the Conduit College]] under a renewable licence the College will not sell outright at any price. Has no relationship at all with [[faction.standing-hour|the Standing Hour]], because the lattice crews hold the strongest labour position on the continent and have no interest in sharing it. Does not know that [[faction.pale-assay|the Pale Assay]] may be sitting on a marl bed that would make its forward contract worthless.",
      recruitment:
        "You do not join the Assize, you are weighed by it. Employment begins with an assessment: the registrars fix your mass allowance, and everything you may afterwards own, carry or wear is measured against that number. Advancement to sworn weigher is open, examined and genuinely meritocratic. Advancement past registrar is not: it requires a lease, and leases change hands about once a decade. Players will most often meet the Assize as an inspection rather than an employer, and the fastest way in is to be useful during one.",
      requiredSkills: ['skill.lattice-work', 'skill.cable-and-drum', 'skill.writ-craft', 'skill.dead-weight'],
      crimes:
        "False tonnage return, on a craft or a household. Unlogged ascent or descent by a mooring line, which is [[npc.perrine-orlaunt|Perrine Orlaunt]]'s whole trade. Ballast fraud, capital, charged whether or not anything fell. Cutting or splicing a lattice member without a warrant regardless of skill. Landing at an unregistered mast, for which the mast-holder is charged alongside the pilot, and which is the entire subject of [[quest.the-sixteenth-mast|The Sixteenth Mast]].",
      questlineNotes:
        "[[quest.the-sixteenth-mast|The Sixteenth Mast]] is the Assize's own investigation and it cannot survive both outcomes: strike the mast off and it admits it lost count, name the owner and it starts a succession fight between lattice houses. [[quest.the-second-ledger|The Second Ledger]] is run against the Sky City houses from the Ascent side. [[npc.aubran-ferrieu|Aubran Ferrieu]] holds the true tonnage sheets from the week of the Sixth Mast collapse and wants a hearing rather than money, which the Assize can grant and will not. The survey series itself is the long fuse: a party that obtains it holds the power to end a city by publication.",
      repRewards: [
        row({ tier: 'Overweight', reward: 'Allowance withdrawn; you are cargo, and cargo is billed', note: 'Practically an eviction. The descent is by rope and you pay for the rope.' }),
        row({ tier: 'Unassessed', reward: 'Day passes only, weighed in and weighed out', note: 'Every gram declared at the mast head. Contraband is arithmetic here, not concealment.' }),
        row({ tier: 'Assessed', reward: 'A standing mass allowance and the right to lodge on the ring', note: 'The gate on [[mechanic.mass-warrant|the Mass Warrant]] as a working economy rather than a tax.' }),
        row({ tier: 'Declared', reward: 'Mast access, cargo signing up to fifty tonnes, and lift priority in weather', note: 'Enough standing to run freight as a business rather than a favour.' }),
        row({ tier: 'Warranted', reward: 'A registrar\'s warrant: board any craft, open any hold, order a deck lightened', note: 'The single most intrusive legal power available to a player character anywhere in the setting.' }),
        row({ tier: 'Benched', reward: 'A sub-lease, a share of mast fees, and sight of the load roll', note: 'Sight of the load roll is one step from sight of the survey, which is the real prize.' }),
      ],
      currentPlans: [
        'Keep the nine-year survey series out of the assembly, the Ascent and the Post.',
        'Complete the ground purchases at the shelf foot and along the pass road before anyone traces the names.',
        'Bid the Scar concession without revealing why the Assize needs an income that does not depend on the thermal.',
        'Re-lay lattice cable faster than it fatigues, which for the first time in three decades it is not doing.',
        'Find a way to lighten the city by several hundred tonnes that is not an eviction list with names on it.',
      ],
      history:
        "The register came first, kept by mast crews for their own protection, and the bench grew out of the argument about who was allowed to read it. The Sixth Mast collapse is the only date the whole city knows: a mast head came off the lattice with people on it, the inquiry was closed inside a season, and the mass-registrar who kept the true sheets was stripped and barred and is still alive at the shelf foot. The Assize has never had a war, a coup or a famine. It has had one bad afternoon, and it has organised itself entirely around not having a second.",
      devNotes:
        PROPOSAL('The fifteen leases, the life-tenure registrars, the ground purchases and the nine-year survey series are proposed. The weakening updraft is the manifest hook and is the faction\'s spine.') +
        '\n\nDESIGN INTENT: the Assize is not corrupt in the ordinary way. Its officials are honest, its procedures work, and it is committing a slow atrocity anyway, because the only lawful remedy available to it is an eviction list and no one will sign one. Play it as competence with nowhere to go.',
    },
  }),

  /* ================================================================ */
  /* THE CONDUIT COLLEGE                                               */
  /* ================================================================ */

  E({
    id: 'faction.conduit-college',
    type: 'faction',
    name: 'The Conduit College',
    aka: ['The College', 'The Patent Bench'],
    status: 'draft',
    summary: 'Licenses the engineers, holds the patent roll and sets the conduit timetable; the most advanced city on the continent is deliberately slower than it could be.',
    tags: ['guild', 'technology', 'licensing', 'core'],
    accent: '#3f7d6a',
    fields: {
      overview:
        "The body that decides who may practise engineering on [[region.meridian-coast|the Meridian Coast]], what may be built, and when the pressure runs. Its three instruments are the licence to practise, the patent roll and the conduit timetable, and it holds all three against a city that is otherwise a functioning republic with a broad householder franchise.\n\nWhat the College actually sells is tolerance: a written figure, a proof mark, and a bench that will stand behind both. A [[item.governor-spring|governor spring]] cut to College tolerance is the bottleneck component of the continent, and the reason is not secret knowledge but two centuries of enforced measurement discipline. [[machine.the-drawbench-vaults|The Drawbench Vaults]] and [[machine.the-frit-kiln|the Frit Kiln]] run to College schedules; [[landmark.the-tide-orrery|the Tide Orrery]] is its instrument and its calendar.\n\nIt has also been careful never to starve anyone, which is why an arrangement this extractive has held for so long. The College concedes small things quickly and large things never.",
      factionType: 'Guild',
      scale: 'About 1,100 licensed masters and fellows, 4,000 indentured apprentices; the patent roll reaches every city that buys drawn stock',
      founded: 'The patent roll opens in the year the first aqueduct siphon was proved, which the College treats as year one and the quarter assembly does not',
      ideology:
        "Precision is a public good that has to be paid for privately, because no assembly has ever voluntarily funded a tolerance. The College's fellows genuinely believe that unlicensed engineering kills people, and they can produce the boiler registers to prove it. The rot is in the second clause: that because the College is the only body competent to judge a design, the College is also the right body to decide whether a design should exist. That step is never argued aloud, because arguing it aloud would lose it.",
      creed: 'Nothing is built to a hope. Build to a number.',
      publicIdentity:
        "A learned guild of engineers, elected by its own fellows, publishing its proceedings and examining anyone who applies. It runs the conduit timetable in public, auctions the slots in public, and posts the failures. Fellows are addressed by trade rather than by rank and the College has no ceremonial dress at all beyond a copper cuff. It is, on the visible evidence, the most transparent institution in this file, and the transparency is entirely real everywhere except one room.",
      publicFace: 'The timetable hall, the published proceedings, and [[npc.melitta-aspri|Melitta Aspri]] reading the season\'s tables off the Orrery',
      hiddenAgenda:
        "The unindexed half of the patent roll. The College holds working, proved, buildable designs that it will not license, because licensing them would end the rent it lives on. The contents are not marvels. They are a bearing, a valve and a cement: a self-aligning bearing that would let anyone build a drawbench, a pressure valve that would make conduit work safe enough to be unlicensed, and a cement formulation that does not need the guild kilns.\n\nEvery one of those would break a monopoly and none of them would break physics. The College's position, stated only among fellows, is that releasing them would put the coast's whole engineering capacity into the hands of people who cannot be held to a tolerance. That position is not entirely wrong, which is what makes it durable.\n\nThe second item is smaller and dirtier: the College takes money from [[faction.bondwrights-hall|the Bondwrights' Hall]] to keep three specific labour-saving designs off the roll, and has done for eleven years.",
      leadership:
        "A bench of seven patent-holders, elected by the licensed fellowship, sitting in public for the timetable and in private for the roll. The Warden of Patents chairs, holds the index, and is the only person entitled to see the unindexed section without a bench vote. The office rotates every four years and has, twice, rotated to someone who then declined to open the section.",
      leaderTitle: 'Warden of Patents',
      ranks: [
        row({ rank: 'Bound apprentice', req: 'A seven-year indenture signed before the bench', grants: 'A bench, a trade, and no right to sign anything' }),
        row({ rank: 'Licensed hand', req: 'Examination in one process; [[skill.pressure-fitting|Pressure Fitting]] or equivalent', grants: 'May work live conduit under a master\'s mark' }),
        row({ rank: 'Proof-marker', req: '[[skill.proof-marking|Proof Marking]] to guild standard and a clean five years', grants: 'Your own stamp, and personal liability for everything it touches' }),
        row({ rank: 'Fellow', req: 'One proved improvement entered on the roll', grants: 'A vote in the fellowship, a conduit slot at cost, access to the indexed roll' }),
        row({ rank: 'Master', req: 'Three fellows\' sponsorship and a workshop of your own', grants: 'May take apprentices, may bid slots forward, may sit on examinations' }),
        row({ rank: 'Patent-holder', req: 'A patent the bench has agreed to enforce', grants: 'Rent, a bench candidacy, and a permanent interest in nobody else having one' }),
        row({ rank: 'Warden of Patents', req: 'Election by the fellowship for a four-year term', grants: 'The index, the casting vote, and the key to the unindexed section' }),
      ],
      resources:
        "The patent roll, indexed and unindexed. The licence to practise, without which no lawful conduit work happens on the coast. [[mechanic.conduit-hours|The conduit timetable]], which is the throttle on every advanced craft in the setting. [[landmark.the-tide-orrery|The Tide Orrery]] and the printed [[item.orrery-tables|Orrery Tables]] that gate safe passage on [[region.meridian-gulf|the Meridian Gulf]]. The guild kilns that calcine [[material.tideset-cement|tideset cement]], the spring-drawing shops, and a monopoly on [[material.clearcast-glass|clearcast glass]] that depends entirely on the finest cut of somebody else's salt.",
      controlledMaterials: ['material.tideset-cement', 'material.clearcast-glass', 'material.orrery-bronze', 'material.mirelac'],
      headquarters:
        "The bench hall in [[district.mediterranean-city-orrery-precinct|the Orrery Precinct]], with the timetable hall alongside it and the roll in a dry vault beneath. The unindexed section is not in the vault. It is in a strongroom in [[district.mediterranean-city-vault-quarter|the Vault Quarter]] leased in the name of a fellow who died nineteen years ago, and the rent is paid quarterly by standing instruction.",
      territory:
        "The conduit yards, the precinct, the guild kilns, the spring shops and the timetable. Beyond the coast the College holds no ground and enormous leverage: the renewable licence on [[city.gilded-ascent|the Gilded Ascent]]'s pressure main, the fitting contracts on the [[city.sky-city|Sky City]]'s compressors, and a standing refusal to sell any of it outright. Its writ over people stops at the harbour: present an [[item.indenture-bond|indenture bond]] in the harbour court and it is void and the presenter is charged.",
      relationNotes:
        "Publicly the most hostile institution on the continent to [[faction.bondwrights-hall|the Bondwrights' Hall]], whose paper is void in the harbour and whose agents cannot get premises. Privately it takes the Hall's money to keep three labour-saving designs off the roll, which is the sharpest divergence in this file and the one worth playing. Rival of [[faction.concord-of-weights|the Concord of Weights]], which has been asking the assembly to reconsider indenture for thirty years and has been offered nothing. Trades with [[faction.pitchguard|the Pitchguard]] for the charcoal that feeds [[machine.the-verdigris-hearth|the Verdigris Hearth]], and with [[faction.pale-assay|the Pale Assay]] for the salt that fluxes its glass, which makes the Pans grading fraud a Mediterranean problem. Hosts the least corrupted chapter of [[faction.standing-hour|the Standing Hour]] and is quietly relieved to have somewhere for the pressure to go.",
      recruitment:
        "Examination, and it is real. The College will license anyone who can hold a tolerance, including women, foreigners, freed bondholders and people it dislikes, and this is not liberality but self-interest: a fellow who cannot hold a number is a boiler waiting to happen. What it will not do is admit anyone to the bench without a patent, and patents require a workshop, which requires capital. Players enter as licensed hands and rise fast on skill and slowly on money.",
      requiredSkills: ['skill.pressure-fitting', 'skill.bench-sense', 'skill.proof-marking', 'skill.heat-reading'],
      crimes:
        "Practising unlicensed, which is a fine for a first offence and the loss of your hands' use by court-ordered severing of the thumb tendons for a third; the College asked for that and the assembly has twice tried to repeal it. Working a conduit out of slot. Forging a proof mark, which is [[skill.false-proof|False Proof]] and which the College prosecutes harder than theft. Presenting an indenture bond in the harbour court, which is a crime against the presenter rather than the bearer.",
      questlineNotes:
        "[[quest.four-minutes-fast|Four Minutes Fast]] is the College's institutional blind spot made into an investigation: it will not concede a fault in its own instrument, and every harbour lease priced against the old tables reopens the day it does. [[quest.the-casting-voice|The Casting Voice]] is the Ascent buying the copper duty vote out from under the fellowship. [[npc.anthimos-vellani|Anthimos Vellani]]'s unreported marsh parasite is the College's other exposure, because quarantine rots the olive harvest and the harvest is what buys the College its time. The unindexed roll is the long prize and should stay unopened for most campaigns.",
      repRewards: [
        row({ tier: 'Barred', reward: 'No licence, no slot, no proof mark anywhere on the coast', note: 'Your goods can still be sold, but not certified, which halves their price.' }),
        row({ tier: 'Unlicensed', reward: 'Buy finished goods at list; no access to slots or benches', note: 'The default. Not punitive, merely expensive.' }),
        row({ tier: 'Licensed', reward: 'A hand\'s licence and the right to bid a conduit slot', note: 'The gate on [[mechanic.conduit-hours|Conduit Hours]] and every advanced recipe in the city.' }),
        row({ tier: 'Marked', reward: 'Your own proof stamp, and the liability that comes with it', note: 'A stamped item sells for a third more anywhere from the Pans to the Drown.' }),
        row({ tier: 'Fellow', reward: 'A vote, slots at cost, and the indexed patent roll', note: 'Also the first tier that can propose an entry, which is how a party gets a design of their own enforced.' }),
        row({ tier: 'Benched', reward: 'A patent, rent from it, and a candidacy for the wardenship', note: 'A player warden could open the unindexed section. The campaign should make them want to and then show them the cost.' }),
      ],
      currentPlans: [
        'Keep the Orrery drift out of the record for one more season, which is one season more than the tables can stand.',
        'Hold the copper duty low without letting Ascent factors take a seat in the port.',
        'Renew the Gilded Ascent pressure-main licence on worse terms than the last one.',
        'Keep three labour-saving designs off the roll and keep taking the Bondwrights\' money for it.',
        'Get an entry to the Scar concession auction without being seen to want regulated magic.',
      ],
      history:
        "The College began as an examining board for aqueduct work after a siphon failure drowned a quarter, and the first patent on the roll is the siphon that replaced it. Its authority grew each time something failed somewhere else. The pattern is consistent and is the reason it has never needed a coup: every extension of College power in two centuries has followed a disaster the College correctly predicted and was not empowered to prevent. The habit of predicting disasters and then requiring more power to prevent them is now indistinguishable from policy, and the fellowship would tell you so.",
      devNotes:
        PROPOSAL('The seven-member patent bench, the four-year wardenship, the unindexed section and its three contents, and the eleven-year arrangement with the Bondwrights\' Hall are all proposed.') +
        '\n\nDESIGN INTENT: the College is the restrained-science-fiction ceiling made into a faction. The world is not pre-industrial because nobody thought of it; it is pre-industrial because a body with good reasons decided to keep it there. Keep the withheld designs boring and enormous. A bearing, a valve, a cement. Nothing that looks like a weapon.',
    },
  }),

  /* ================================================================ */
  /* THE PITCHGUARD                                                    */
  /* ================================================================ */

  E({
    id: 'faction.pitchguard',
    type: 'faction',
    name: 'The Pitchguard',
    aka: ['The Marshalcy', 'The Guard'],
    status: 'draft',
    summary: 'The Greatwood\'s standing military order: holds the trunk redoubts, licenses every cut, and is quietly choosing where to march when the boles fall.',
    tags: ['military', 'timber', 'conscription', 'wild'],
    accent: '#4a5a3c',
    fields: {
      overview:
        "Not a faction inside [[city.tree-city|the Tree City]] so much as the city with a rank structure. The Pitchguard licenses the cutting of [[material.blackbole-timber|blackbole timber]], levies the soldiers who enforce the licence, hangs the people who cut without one, and administers eleven colossal trunks and a hundred and forty rope spans as a single garrison. There is no civil court above the bole captains and no franchise of any kind.\n\nBecause blackbole and Greatwood charcoal underwrite half the continent's furnaces, gates and keels, the order is a toll gate as much as a fortress. [[deposit.standing-fifty|The Standing Fifty]] outside its walls is the only number in the Greatwood every faction agrees on, and each felling licence is a council vote.\n\nIt is also failing from the inside out, on a timetable it has measured and not published.",
      factionType: 'Military',
      scale: '2,200 sworn, a spring levy of 900 to 1,400, and tribute obligations on 60-odd forest villages',
      founded: 'Raised as a cutting-licence escort. The order has never formally been anything else and has behaved as a state for two centuries.',
      ideology:
        "The wood is finite, slow and worth killing for, and the only alternative to a licence enforced by archers is a Greatwood stripped inside a generation. That is true, and the Pitchguard has the felling records to prove it. What has grown on top of it is a siege culture that treats every civil question as a supply question: children are levy, villages are tribute, deserters are debt, and a quarter that objects is a quarter that can be cut off the spans.",
      creed: 'Three centuries to grow. One season to fell. Count before you cut.',
      publicIdentity:
        "A licensing order under martial discipline, defending a resource on behalf of everyone who buys it. The Pitchguard publishes the felling count, honours its licences scrupulously, and points out to any visiting factor that the price of blackbole has been stable for forty years, which is more than the Ascent can say about money. Conscription is presented as a tithe of service rather than a levy, and the spring muster is a genuine civic occasion with food in it.",
      publicFace: '[[npc.aune-mustsalu|Aune Mustsalu]], Bole-Marshal of the Bastion Bole, signing the rolls each spring',
      hiddenAgenda:
        "The heartwood is going. [[creature.bolewright-wasp|Bolewright]] galleries have opened six named boles and heart rot does not stop at a property line. The Marshalcy knows the count and does not publish it, because the day the count is public is the day the tribute villages stop sending grain and [[faction.concord-of-weights|the Concord]] calls in the advances.\n\nWhat the order is doing instead is choosing where to march. Two survey parties have gone south this year toward [[region.hollow-karst|the Hollow Karst]] under cover of a charcoal contract, and what they brought back was road capacity, gallery depths, and the fact that [[city.cave-agrarian-city|the cave city]] has three hundred gallery wardens and no standing force at all. A city that farms underground cannot be burned out and does not need timber. The Pitchguard has not decided. It has finished the arithmetic.\n\nAnd inside the order, the Bole-Marshal has been forging deaths on the conscription rolls to keep some thirty children of a purged quarter off them, while her own quartermaster counts bodies against rations.",
      leadership:
        "A Marshalcy of six bole captains under the Bole-Marshal, each holding one fortified trunk and voting the felling licences. Three of the six now hold more charcoal contracts than tenancies, which makes them merchants with soldiers and is the fault line inside the order. The Bole-Marshal commands absolutely in the field and can be outvoted on licences, which is the only constitutional check in the Greatwood and is worth exactly what six men decide it is worth.",
      leaderTitle: 'Bole-Marshal of the Bastion Bole',
      ranks: [
        row({ rank: 'Levy', req: 'Being named on a spring roll, which is not voluntary', grants: 'A [[item.bastion-jack|bastion jack]], rations, and a year you did not choose' }),
        row({ rank: 'Sworn', req: 'A completed levy year and an oath at the muster', grants: 'Pay, a [[item.palisade-arbalest|palisade arbalest]] re-issued on death, and gallery quarters' }),
        row({ rank: 'Spanner', req: '[[skill.gallery-drill|Gallery Drill]] and a season on the rope bridges', grants: 'Span work, a cutting warrant, and the right to refuse a bad line' }),
        row({ rank: 'Gate-sergeant', req: 'Five years sworn and a captain\'s nomination', grants: 'A gate, a press-gang, and the discretion that makes both profitable' }),
        row({ rank: 'Warrant-holder', req: 'A felling licence granted in your name by council vote', grants: 'Timber income, a share of the charcoal contracts, standing among merchants' }),
        row({ rank: 'Bole captain', req: 'A fortified trunk and the Marshalcy\'s consent', grants: 'A vote on every licence, and a garrison that answers to you first' }),
        row({ rank: 'Bole-Marshal', req: 'Election by the captains, confirmed at the spring muster', grants: 'Field command, the conscription rolls, and the unpublished rot count' }),
      ],
      resources:
        "Eleven trunks, six of them fortified root to fifth gallery. [[landmark.bastion-bole|The Bastion Bole]]. [[machine.the-pitchworks|The Pitchworks]] and [[machine.the-limb-press|the Limb Press]], which together make the continent's ballistae. A hundred and forty rope spans and the drill to cut them under load. [[food.bole-mast|Bole mast]] siege reserve, currently at eleven months with the next mast year not due. Tribute grain from sixty villages, and the timber yards where deserters' kin are worked off the debt.",
      controlledMaterials: ['material.blackbole-timber', 'material.blister-bar'],
      headquarters:
        "[[district.tree-city-crown-galleries|The Crown Galleries]] of the Bastion Bole, from the fourth gallery upward: muster hall, licence chamber, armoury and the roll room. The roll room has one door and no window and the rolls are read aloud at every spring muster, which is why the forged deaths on them are such a dangerous thing to be carrying.",
      territory:
        "The Greatwood inside the palisade absolutely, and the outwood by patrol and reprisal. Sixty tribute villages, none of which is garrisoned and all of which are visited. [[deposit.standing-fifty|The Standing Fifty]] beyond the walls, which the order guards and does not own, and which is the standing pretext for every expansion of its patrol range in living memory.",
      relationNotes:
        "Sells charcoal to [[faction.conduit-college|the Conduit College]] and pitch to nobody, and a Greatwood blockade stops the Mediterranean smelt inside a month. Owes [[faction.concord-of-weights|the Concord of Weights]] against next season's licences, which is the leash. Buys iron off [[faction.iron-sluice-company|the Iron Sluice Company]] and cable off [[faction.mooring-assize|the Mooring Assize]], and cannot arm a redoubt without both. Has broken [[faction.standing-hour|the Standing Hour]] in the pitch yards twice and reads the stewards' names at every muster. Lets [[faction.bondwrights-hall|the Bondwrights' Hall]] buy its timber-yard ledgers downriver without permitting it an office. And is surveying [[faction.mirror-assembly|the Mirror Assembly]]'s approaches while calling it a charcoal contract.",
      recruitment:
        "Conscription. The spring levy takes named households by roll and [[npc.saarik-rauda|Saarik Rauda]]'s press-gangs make up the shortfall, which is why his written tally of who has paid to keep a son off the roll is worth more than the seed grain he takes as the bribe. Volunteers exist and are treated with mild suspicion. Outsiders can be sworn after a levy year or bought in as warrant-holders, and a party that arrives with a felling licence in hand is treated as gentry regardless of what they are.",
      requiredSkills: ['skill.long-arm', 'skill.set-and-brace', 'skill.gallery-drill', 'skill.dead-weight'],
      crimes:
        "Cutting without a licence, which is hanging, and the archers do not need a hearing. Desertion, which puts your kin in the timber yards until the debt is worked off. Carrying fire above the second gallery. Refusing the levy, which is not a crime as such: the household is simply struck off the tribute list, which means it receives no grain in a bad year and everyone understands what that is.",
      questlineNotes:
        "[[quest.the-felling-order|The Felling Order]] is the permanently failable one and the Marshalcy burns the infested quarter on schedule whether the party is ready or not. [[npc.vetla-torvik|Vetla Torvik]] sells the maintenance run that reaches the fourth gallery without passing a gate, once, and only to a party that gets her sister out of the yards. [[npc.aune-mustsalu|Aune Mustsalu]]'s forged deaths are the order's own throat: exposing her ends her, covering for her makes the gates owe you. The rot count is the campaign-scale item, because publishing it starts a war and suppressing it means being in the Greatwood when the boles come down.",
      repRewards: [
        row({ tier: 'Proscribed', reward: 'Named at the muster; archers do not challenge before shooting', note: 'The Greatwood becomes a hostile region rather than a place with hostile people in it.' }),
        row({ tier: 'Outwood', reward: 'Trade at the palisade gate only, and only in daylight', note: 'Where every outsider starts. The gate closes at dusk regardless of what you are carrying.' }),
        row({ tier: 'Suffered', reward: 'Passage on the lower spans and lodging under the roots', note: 'Enough to work in the city. Not enough to be in it after the gates shut.' }),
        row({ tier: 'Sworn', reward: 'Pay, a bastion jack, gallery quarters and the right to bear arms above the second gallery', note: 'Carries a levy obligation the party cannot resign from without desertion.' }),
        row({ tier: 'Warranted', reward: 'A felling licence in your name and a share of a charcoal contract', note: 'Real continental income. Also makes you a merchant with soldiers, which is the order\'s own fault line.' }),
        row({ tier: 'Captain\'s hand', reward: 'A trunk\'s garrison at your word and a vote proxied on licences', note: 'Endgame. A party at this tier can decide where the Pitchguard marches, which is the whole point.' }),
      ],
      currentPlans: [
        'Fell and burn the infested sixth quarter on the eleven-day schedule, with whoever is still inside it.',
        'Keep the heart-rot count out of the tribute villages for one more harvest.',
        'Finish the southern survey of the karst approaches under the charcoal contract.',
        'Buy or seize enough of the Standing Fifty to cover two seasons of licence income.',
        'Settle the question of the three merchant captains before they settle it.',
      ],
      history:
        "The order was raised to escort cutting parties and has never been formally granted any other power. Every authority it holds was assumed during an emergency and kept afterwards, which the Marshalcy considers a proud record of necessity and the tribute villages consider a two-century pattern. The purge of the sixth quarter is the recent wound: a quarter accused of unlicensed felling, cleared by fire, its households struck off, and its surviving children now the thirty names the Bole-Marshal is forging deaths to protect.",
      devNotes:
        PROPOSAL('The six bole captains, the merchant faction inside the Marshalcy, the southern survey toward the Hollow Karst, and the purged sixth quarter are proposed. The heart rot is the manifest hook.') +
        '\n\nDESIGN INTENT: the Pitchguard is the setting\'s answer to "what does a militarised city do when its reason for existing dies". It should never read as an evil empire. It reads as a well-run garrison that has correctly worked out it has about a decade left and is looking at a neighbour with food and no soldiers.',
    },
  }),
  /* ================================================================ */
  /* THE MIRROR ASSEMBLY                                               */
  /* ================================================================ */

  E({
    id: 'faction.mirror-assembly',
    type: 'faction',
    name: 'The Mirror Assembly',
    aka: ['The Assembly', 'The Share Roll'],
    status: 'draft',
    summary: 'Votes out the Hollow Karst\'s sunlight and gallery tenancy on inherited shares, and does not vote on the galleries it has stopped counting.',
    tags: ['government', 'agriculture', 'light', 'wild'],
    accent: '#8a7a4a',
    fields: {
      overview:
        "The government, the landlord and the utility of [[city.cave-agrarian-city|the Cave Agrarian City]], which are the same office. Daylight is caught at the surface, folded down two hundred silvered ducts by [[machine.the-mirror-ducts|the mirror ducts]], and issued to individual galleries in lumen-hours by a vote weighted on inherited light-shares. Everything else in the karst follows from that allocation: which terrace grows [[food.mirror-barley|mirror barley]], which grows [[food.gallery-cap|gallery cap]] in the dark, which eats, which leaves.\n\nThere is no wilderness here to forage and no gleaning after a bad year. A failed harvest in the karst is not hardship, it is arithmetic, and the Assembly is the body that does the sum in public and signs the result. It is genuinely deliberative, minutes are kept, and shares can be bought, which makes it the most procedurally honest oligarchy on the continent.\n\nBelow the voted galleries there is a rota the minutes do not cover.",
      factionType: 'Government',
      scale: 'About 400 share-holding households; 200 ducts, 90 voted galleries, and an unstated number below them',
      founded: 'The share roll begins with the first silvered duct and has never been re-cut, which is the whole political problem',
      ideology:
        "Light is a common inheritance held in private trust, and the trust is the point. The Assembly's argument is that light allocated by vote is light allocated by people who will starve alongside you if they get it wrong, which beats a bureaucrat and beats a market. What the argument quietly requires is that everyone who might starve has a share, and shares have not been issued since the roll was cut.",
      creed: 'Every hour is somebody\'s harvest.',
      publicIdentity:
        "An assembly of inherited shares meeting in open session, publishing its minutes, hearing petitions and reallocating hours by an arithmetic anyone can check. It is proud of the check. Petitioners are heard in person, the reeves' returns are read aloud, and a gallery that loses hours is told to its face by the neighbours who voted to take them. The city considers this a better government than a stranger's and is not obviously wrong.",
      publicFace: '[[npc.ossane-gorbea|Ossane Gorbea]], light-tithe reeve, and the allocation read out at the head of each rota',
      hiddenAgenda:
        "[[district.cave-agrarian-city-deep-rota|The deep rota]]. Below the voted galleries there are workings the Assembly has not brought to a vote in nine years, worked by households whose arrears passed a threshold nobody wrote down and who have consequently stopped appearing as citizens in the returns. They are not slaves in law. They are simply not counted, which in a city where the count is the franchise is the same arrangement with better minutes.\n\nThe second item is smaller and personal. The reeve who decides which galleries get hours has been buying failed galleries through a cousin's name, having first starved them of light. And the third is a failure of maintenance dressed as policy: [[npc.iratze-zubiate|Iratze Zubiate]] has had two lower galleries dark for over a year after a duct collapse she could not repair alone, and has been skimming mirror-hours off the grain terraces to hide the loss, so the harvest is failing slowly and the tithe books do not show it yet.",
      leadership:
        "One vote per light-share, shares heritable and saleable, about four hundred holders and no chair. Business is run by the reeves, who are elected annually, hold the seals that actually issue hours, and are the only people in the room with a working knowledge of the duct network. The mirrorwrights are the one body the Assembly cannot outvote, because there are two hundred mirrors and about forty people alive who can aim them.",
      leaderTitle: 'Light-tithe reeve',
      ranks: [
        row({ rank: 'Gallery hand', req: 'Work on a terrace anyone will vouch for', grants: 'Rations, a bunk, and hours that belong to someone else' }),
        row({ rank: 'Tenant', req: 'A gallery tenancy and the tithe paid on time', grants: 'A crop of your own, and a petition heard at allocation' }),
        row({ rank: 'Mirrorwright', req: '[[skill.mirror-cutting|Mirror Cutting]] and an apprenticeship that silvers your lungs', grants: 'Duct access, a guild wage, and about ten working years' }),
        row({ rank: 'Share-holder', req: 'A light-share, inherited or bought at a price that ruins buyers', grants: 'A vote, and standing to object in open session' }),
        row({ rank: 'Reeve', req: 'Annual election by the share-holders', grants: 'The seal that issues hours, and the returns that decide who is counted' }),
        row({ rank: 'Duct master', req: 'The confidence of the mirrorwrights rather than any vote', grants: 'Command of the two hundred ducts, which outranks the Assembly in practice' }),
      ],
      resources:
        "Two hundred silvered ducts and [[landmark.sunwell-shaft|the Sunwell Shaft]]. The light-share roll. [[material.sunwell-mica|Sunwell mica]] out of [[deposit.lantern-beds|the Lantern Beds]] and the silvering trade that goes with it. [[material.cudmother|Cudmother]] starters, whose export is barred outright. Flooded sumps of [[food.sump-carp|sump carp]], the fungal terraces, and a grain surplus that leaves down the Karst Fork against advances the city can no longer refuse. Three hundred gallery wardens and no standing force at all.",
      controlledMaterials: ['material.sunwell-mica', 'material.cudmother', 'material.quietmilk'],
      headquarters:
        "The session hall in [[district.cave-agrarian-city-mirror-quarter|the Mirror Quarter]], directly under the shaft head, lit by the first duct off the main so that the Assembly always sits in daylight while it decides who else will. The share roll and the reeves' returns are kept in the same room. The deep rota returns are kept in a different room and are not read aloud.",
      territory:
        "The galleries, the terraces, the sumps and the ducts, which is the whole city, plus the surface catchment above it that nobody lives on and everybody depends on. Beyond the karst the Assembly holds nothing and exports two things that matter: grain to [[city.gilded-ascent|the Gilded Ascent]], and, illegally and constantly, cudmother starters in the warmth of a courier's armpit.",
      relationNotes:
        "Deeply indebted to [[faction.concord-of-weights|the Concord of Weights]], which advances against next year's light allocation and is now the karst's largest creditor. Has refused [[faction.bondwrights-hall|the Bondwrights' Hall]] three times over the deep-gallery arrears, because selling them would require admitting they exist. Treats [[faction.low-tally|the Low Tally]] as treason and the terraces treat it as insurance. Has no idea that [[faction.pitchguard|the Pitchguard]] has surveyed its approaches twice this year. Buys quicksilver and tin through [[faction.conduit-college|the Conduit College]], which means the city's food supply is hostage to a foreign licence.",
      recruitment:
        "Birth, tenancy or debt. There is no joining ceremony and no oath; there is a name on a rota. Outsiders can hold a tenancy, and about one gallery in nine is held by an incomer, but shares have not been issued in living memory so no outsider votes. The mirrorwrights are the exception and the way in for players: they take anyone with the hands for it, they are permanently short because the silvering kills, and they are the only body in the city the Assembly cannot simply outvote.",
      requiredSkills: ['skill.mirror-cutting', 'skill.spore-lore', 'skill.heat-reading'],
      crimes:
        "Light theft, which is the local capital offence and is committed with a [[item.sunwell-mirror|sunwell mirror]] on a jointed arm. Fouling a duct. Growing an unlisted strain, which is what [[npc.bedel-lehun|Bedel Lehun]] is doing on the fourth terrace with a violet grain-fungus that yields double in half the light and stops people sleeping. Exporting a cudmother starter, which is treason by statute. Blasting without a licensed [[item.nitre-cask|nitre cask]], which is capital because the galleries are the only structure anyone has.",
      questlineNotes:
        "[[quest.who-gets-the-light|Who Gets the Light]] is the city-state-changing one: blight has cut the yield, the Assembly will enact whatever allocation the party brokers, and the galleries they cut go dark permanently and leave the world state. [[npc.iratze-zubiate|Iratze Zubiate]] needs bodies and rope rather than sympathy for the collapsed duct. [[npc.ossane-gorbea|Ossane Gorbea]] can grant hours, deny them, or be handed the ledger that proves the cousin's pattern. The deep rota is the moral spine: a party that brings its returns into open session forces the Assembly to either enfranchise several hundred people or say aloud that it will not.",
      repRewards: [
        row({ tier: 'Struck from the rota', reward: 'No hours, no tenancy, no rations issued in your name', note: 'In the karst this is not exile, it is the deep rota, because there is nowhere else to eat.' }),
        row({ tier: 'Unlisted', reward: 'Guest lodging in the flush galleries and no allocation at all', note: 'Where visitors start. Light is bought by the hour from whoever will sell.' }),
        row({ tier: 'Tenanted', reward: 'A gallery, a tithe assessment and a petition heard at allocation', note: 'The first tier at which a party can farm, and therefore lose a harvest.' }),
        row({ tier: 'Wrighted', reward: 'Duct access, mirror tools and the right to aim', note: 'Duct access is the best infiltration route in the city and the guild knows it.' }),
        row({ tier: 'Shared', reward: 'A light-share and a vote in open session', note: 'Shares are not issued. Getting one means a household died out or was bought out, and both have consequences.' }),
        row({ tier: 'Reeve\'s seal', reward: 'The seal that issues hours, and the returns that decide who is counted', note: 'Endgame. The party now personally decides which galleries eat.' }),
      ],
      currentPlans: [
        'Get through the blight allocation without a gallery riot in the flush terraces.',
        'Keep the deep rota out of the minutes for another season.',
        'Buy back the Concord\'s forward claim on next year\'s allocation, with grain the city has not grown yet.',
        'Find out who is moving cudmother starters out of the karst and hang them publicly.',
        'Replace the two hundredth duct mirror before the silverers who can do it are dead.',
      ],
      history:
        "The city is older than the ducts and used to farm fungus in the dark. The silvering of the first duct is the founding event and the share roll dates from the argument immediately afterwards about who had paid for it. Nothing since has been as important, which is why nothing since has been re-decided: the roll has survived two famines, a duct collapse that killed ninety, and every proposal to widen it, on the consistent grounds that the people proposing were the people who would gain.",
      devNotes:
        PROPOSAL('The four hundred share-holders, the annual reeves, the mirrorwrights\' effective veto and the nine-year silence on the deep rota are proposed. The uncounted debtors are the manifest hook.') +
        '\n\nDESIGN INTENT: the Assembly is a functioning democracy whose franchise is a fixed asset. Everything it does is minuted, checkable and fair to the people inside the roll, and the people outside it are invisible by construction rather than by malice. That is the point, and it should be played without villains.',
    },
  }),

  /* ================================================================ */
  /* THE IRON SLUICE COMPANY                                           */
  /* ================================================================ */

  E({
    id: 'faction.iron-sluice-company',
    type: 'faction',
    name: 'The Iron Sluice Company',
    aka: ['The Company', 'The Weirmasters'],
    status: 'draft',
    summary: 'Chartered keeper of the Drown\'s throat: basalt sluices, sold water, priced passage, and a release that is indistinguishable from an accident.',
    tags: ['company', 'water', 'toll', 'water-cities'],
    accent: '#3d4f58',
    fields: {
      overview:
        "The chartered company that holds [[landmark.the-weir-gates|the Weir Gates]] and, through them, the neck of [[region.the-drown|the Drown]]. Four hundred and ten strides of black basalt sill carrying twenty-two bays, of which fourteen are worked gates, five have been chained open since the flood and three are bricked. Above the sill the river stands eleven feet higher than below it. Everything moving between the interior and the eastern water passes through, pays, and waits.\n\nThe Company sells gate-hours the way [[city.gilded-ascent|the Ascent]] sells credit, and keeps [[mechanic.the-sluice-book|the sluice book]] that records them. It also uses the same head of water to drive [[machine.the-sluice-hammers|the sluice hammers]], which beat river-shipped [[material.mire-bloom|bloom]] into stamped merchant bar, so the toll and the iron come out of one gradient.\n\nWhat makes it dangerous rather than merely expensive is that a release looks exactly like an accident, and the only document that would prove otherwise sleeps in the same room as the sluice-master.",
      factionType: 'House',
      scale: 'A chartered house, twelve Weirmasters, about 200 gate-wardens and 900 on the payroll; the whole town is the company',
      founded: TBD('The charter is older than the present sill and names a grantor nobody at the Weir will identify. Who issued it, and can it be revoked?'),
      ideology:
        "Water is a service and services are billed. The Company has no politics beyond the charter and is unembarrassed about it: it did not make the river, it made the gates, and a river without gates drowned this delta twice within recorded memory. Everything downstream of that argument is arithmetic, including the argument that a settlement which will not pay for slack water has chosen to take the flood.",
      creed: 'The gate opens for the book.',
      publicIdentity:
        "A works and the people who run the works. The Company publishes the schedule, honours booked hours to the minute, maintains the sill and the gantries at its own cost, and points to two centuries without a catastrophic breach. Its officers are engineers before they are anything else and the twelve Weirmasters hold summary powers only within their own bays. Everything about its public face is deliberately unglamorous, because glamour would suggest discretion, and the Company's entire pitch is that it has none.",
      publicFace: '[[npc.ost-vennick|Ost Vennick]], sluice-master, and the posted schedule at [[district.black-weir-the-toll-house|the Toll House]]',
      hiddenAgenda:
        "Maintenance releases are timed. The Company has, repeatedly and deniably, scheduled a bay flush at an hour that puts a metre of water onto a competitor's mooring, a rival wharf, or a raft settlement that has been slow to book, and has called it the river's doing. It has done it once on the record, during a toll dispute, and the record is the schedule book.\n\nUnderneath that sits the slower plan: the Company is buying warning rather than selling it. It pays [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] in guaranteed sluice-time to drift [[city.floating-swamp-settlement|the floating settlement]] upriver into its toll reach, which would put the last untaxed town on the eastern water inside the book. Three raft clans would cut her lines if they knew. She has one season to make it look like her own judgement.",
      leadership:
        "A chartered house with a board nobody outside the works has met, and twelve Weirmasters who run the bays and hold summary jurisdiction within them. The sluice-master sits between the two: he keeps the book, sets the schedule, and is the only person who can order an unbooked release. The arrangement concentrates the single most dangerous power in the delta in one man who sleeps in the room with the evidence.",
      leaderTitle: 'Sluice-master of the Weir Gates',
      ranks: [
        row({ rank: 'Gantry hand', req: 'Turn up at the yards and survive the first month', grants: 'Day wages, a [[item.weirhook|weirhook]], and no claim if the water takes you' }),
        row({ rank: 'Crew boss', req: 'A crew that will work for you and a gantry that will hold', grants: 'A cut of the lift fees and the right to refuse a cargo' }),
        row({ rank: 'Gate-warden', req: 'Company oath and two years on the sill', grants: 'A bay post, arrest powers on the works, and the schedule a day early' }),
        row({ rank: 'Bay engineer', req: '[[skill.bench-sense|Bench Sense]] and a bay that has not failed under you', grants: 'Maintenance authority, and the ability to book a flush' }),
        row({ rank: 'Weirmaster', req: 'Appointment by the board; twelve posts, held for life or until a breach', grants: 'Summary powers within your bay and a share of its tolls' }),
        row({ rank: 'Sluice-master', req: 'The board\'s confidence and nobody else\'s', grants: '[[mechanic.the-sluice-book|The sluice book]], the schedule, and the unbooked release' }),
      ],
      resources:
        "Fourteen worked gates and the eleven-foot head behind them. The sluice book. [[machine.the-sluice-hammers|The sluice hammers]] and the stamped merchant bar that comes off them, which is step one of the continent's iron chain. Iron gantries and the lift trade. The toll on every raft of [[material.mire-bloom|mire bloom]] out of [[deposit.bloom-cuts|the Bloom Cuts]] and every raft of [[material.glasscane|glasscane]] out of [[deposit.canebrakes|the Canebrakes]]. Two hundred gate-wardens, no field force, no cavalry, and the ability to put a metre of water anywhere downstream within hours.",
      controlledMaterials: ['material.mire-bloom', 'material.blister-bar', 'material.glasscane'],
      headquarters:
        "[[district.black-weir-the-gate-works|The Gate Works]] on the sill itself, with the toll house at the landward end and the schedule board outside it. The sluice-master's room is inside the works, above the third bay, and contains a bed, a stove and the book. Two centuries of Company practice have never produced a copy of the book, which is either extraordinary discipline or the point.",
      territory:
        "The sill, the town, the gantry yards and the slack water above the gates. Its real territory is the schedule: every settlement between the interior and the sea plans around hours it does not control, which gives the Company reach into [[city.floating-swamp-settlement|the raft settlement]], the bloom cuts, the canebrakes and the eastern approach without holding a foot of any of them.",
      relationNotes:
        "Publicly at war with [[faction.low-tally|the Low Tally]], whose ullage runners it hangs at the sluices, while its own gantry crews are paid better by the Low Tally than by the Company. Publicly correct with [[faction.moorstone-compact|the Moorstone Compact]] and privately its supplier, selling release warnings the Compact resells downstream. Ships iron to [[faction.pitchguard|the Pitchguard]], without which no redoubt in the Greatwood gets a ballista. Lets [[faction.bonewax-post|the Bonewax Post]] through unbooked, which is the only standing exception in the book and which the board has quietly wondered about for years. Owes nothing to [[faction.concord-of-weights|the Concord]] and enjoys it: the Ascent has no leverage at the Weir and hates it.",
      recruitment:
        "Wages, and a shortage. The gantry yards take anyone and bury a proportion of them. Company oath comes after two years and is taken seriously: an oathed warden who opens a gate out of book is hanged, and three have been. [[npc.dagren-hoyle|Dagren Hoyle]] recruits for the other side of the same trade, honestly, in the slack hour between scheduled openings, having drowned his last two crews and being unembarrassed about saying so.",
      requiredSkills: ['skill.marsh-footing', 'skill.bench-sense', 'skill.cable-and-drum', 'skill.dead-weight'],
      crimes:
        "Opening or closing a gate out of book, which is hanging. Running unbooked cargo through a bay, which is confiscation and a term on the gantries. Cutting a gantry cable. Interfering with the schedule board. Notably absent from the list: drowning a settlement, which is not a crime at the Weir because the charter treats a release as an act of the river.",
      questlineNotes:
        "[[quest.the-ullage-run|The Ullage Run]] runs against the Company from the smuggling side and ends with a standing channel or with named raft crews hanged at the sluices. [[quest.clean-bills|Clean Bills]] is the moral engine: the Company will close the gates on the party's word and keep them closed, saving the upriver towns and slowly starving a delta that eats what the river brings. [[npc.gwill-ossekind|Gwill Ossekind]]'s notched staves control the eastern approach while the water stays low. The schedule book is the campaign object: it is the only proof that any release was ever deliberate.",
      repRewards: [
        row({ tier: 'Barred from the book', reward: 'No hours at any price; your cargo waits behind everyone\'s', note: 'Functionally a blockade of one party. It is how the Company deals with people rather than with towns.' }),
        row({ tier: 'Casual', reward: 'Buy an hour at the board on the day, at the day\'s price', note: 'The default. Ruinous for anyone running a schedule.' }),
        row({ tier: 'Booked', reward: 'Standing hours at the season rate, and a berth in the slack', note: 'The first tier at which river trade is a business rather than a gamble.' }),
        row({ tier: 'Oathed', reward: 'Company work, arrest powers on the works, the schedule a day early', note: 'A day of the schedule is worth a great deal to the wrong people, which is the temptation.' }),
        row({ tier: 'Bay-held', reward: 'A bay\'s tolls, summary powers inside it, and the right to book a flush', note: 'A player Weirmaster can flood a rival. The campaign should make that available and then make it cost.' }),
        row({ tier: 'Book-keeper', reward: 'Sight of the schedule book, and a say in the unbooked release', note: 'Endgame. Whoever reads the book can prove every deliberate flood of the last two centuries.' }),
      ],
      currentPlans: [
        'Get the floating settlement to re-moor inside the toll reach without it looking like a purchase.',
        'Re-gate two of the five bays chained open since the flood, which needs iron the Company would rather sell.',
        'Find out who is copying the schedule downstream before the Compact\'s resale becomes provable.',
        'Break the ullage trade in the tail by hanging crews rather than by paying gantry hands more.',
        'Establish, quietly, why the Bonewax Post has never once been charged a gate fee.',
      ],
      history: TBD('The Black Weir is a canon name with no established history. When was the sill built, who granted the charter, and what was the flood that chained five bays open? All three are deliberately unanswered here.'),
      devNotes:
        'CANON: the Black Weir is an established name only.\n\n' +
        PROPOSAL('The Company, the twelve Weirmasters, the schedule book and the timed maintenance releases are proposed and are the manifest hook. Nothing here invents a founding, a dynasty or a history for the Black Weir, and the `history` field is deliberately left as a question.') +
        '\n\nDESIGN INTENT: the Company is the setting\'s cleanest illustration of infrastructure as violence. It never raises a hand. It publishes a schedule.',
    },
  }),

  /* ================================================================ */
  /* THE MOORSTONE COMPACT                                             */
  /* ================================================================ */

  E({
    id: 'faction.moorstone-compact',
    type: 'faction',
    name: 'The Moorstone Compact',
    aka: ['The Compact', 'The Draw'],
    status: 'draft',
    summary: 'Runs the raft-lot draw of the floating settlement: who moors where, for how long, and who is cast adrift.',
    tags: ['government', 'delta', 'clans', 'water-cities'],
    accent: '#5c6b45',
    fields: {
      overview:
        "Three hundred and eighty numbered lots of lashed raft, living [[creature.raftbloom|raftbloom]] mat and driven stilt platform, moored within about nine miles of lagoon around [[landmark.the-moorstone|the Moorstone]] and re-moored twice a year by draw. The Compact runs the draw. That is the entire government, and it is enough, because in a town with no ground the order of the draw decides your neighbours, your water, your route to market and whether the next release goes over your floor.\n\nIt is a federation of raft clans rather than a state. Draw-clerks carry a cutting knife each, judgments are enforced by whichever clan is owed the favour, and there is no standing force at all beyond six hundred polemen at a day's notice. The Compact hands nobody over on paper and hands people over constantly in practice.\n\nIts problem is upstream. A scheduled release from [[city.black-weir|the Weir]] puts a foot of water over the low lots in about four hours, and everyone knows it. What they argue about is whose lots those are, and who was told first.",
      factionType: 'Government',
      scale: '380 lots, 11 raft clans, about 9,000 people and no territory that stays where it was',
      founded: 'The Compact dates from the first draw held at the stone, which every clan tells differently and all of them date to the same flood',
      ideology:
        "Nothing is owned, everything is drawn. The Compact's founding argument is that a delta which moves cannot support freehold, so the only fair arrangement is a lottery held often enough that no lot becomes a dynasty. It has worked for long enough that the clans believe it, and it fails in exactly one way: a lottery is only fair if nobody knows the flood schedule in advance.",
      creed: 'The stone stays. Nothing else does.',
      publicIdentity:
        "A compact of clans, meeting at the stone, drawing lots in the open with the [[landmark.the-lot-board|lot board]] visible to everyone and the deed chest under the hands of three clans who dislike each other. The draw is a festival as much as an administration. Disputes are heard in the open, judgments are quick and physical, and the Compact takes real pride in the fact that a poor clan and a rich one draw from the same bag.",
      publicFace: '[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]], elder of the Sixteen-Knot rafts, and the lot board at the draw',
      hiddenAgenda:
        "The Compact sells advance warning of weir releases, and it sells it to the highest bidder. A lot that knows a release is coming can shift a mile in eight hours; a lot that does not takes the water, its stores and frequently its children. The warnings are bought from the Iron Sluice Company and resold downstream, and the money is booked as a mooring fee.\n\nSeparately, and worse, the elder who decides where the settlement re-moors has been paid in guaranteed sluice-time to drift the whole town upriver into the Weir's toll reach. Three clans would cut her lines if they knew. She has one season to make a purchase look like judgement, and the party can be the reason it does or does not.",
      leadership:
        "Eleven clan elders, no chair, and a draw-clerk service that is deliberately drawn from clans with no lots in the reach being drawn. Sabbe Sixteen-Knot is first among equals because her clan holds the stone lots and has the longest unbroken presence at the stone, not because of any office. Decisions require a consensus that is arrived at by exhaustion and enforced by the threat of lines being cut.",
      leaderTitle: 'Elder of the stone lots',
      ranks: [
        row({ rank: 'Adrift', req: 'Having lost a lot and not yet drawn another', grants: 'Sufferance, a tow when someone can spare it, and no standing at the draw' }),
        row({ rank: 'Lot-holder', req: 'A drawn lot and a [[item.moor-stake|moor stake]] with your mark on the head', grants: 'A place to be, and a claim heard at the stone' }),
        row({ rank: 'Poleman', req: 'A season on the channels and [[skill.marsh-footing|Marsh Footing]]', grants: 'Muster pay, channel work, and the right to stop a boat' }),
        row({ rank: 'Draw-clerk', req: 'Appointment from a clan with no lots in the reach', grants: 'The knife, the register, and the power to cut a mooring lawfully' }),
        row({ rank: 'Kin-spoken', req: 'A clan that will speak your name at the stone', grants: 'A voice in consensus and the protection of eleven clans or one' }),
        row({ rank: 'Elder', req: 'Age, a clan, and no living rival inside it', grants: 'A seat at the stone and a hand on where the town moors next' }),
      ],
      resources:
        "The deed chest and the chain on [[landmark.the-moorstone|the Moorstone]], which is the only fixed object the town owns. Three hundred and eighty lots. [[machine.the-fen-damp-taps|The fen-damp taps]] and the [[recipe.lamp-gas-bladders|lamp-gas bladders]] that are the delta's only real export. [[food.tide-rice|Tide rice]] cut from boats, [[material.mirelac|mirelac]] boiled on the yards, and [[material.glasscane|glasscane]] out of the brakes. Six hundred polemen at a day's notice and no line infantry whatsoever.",
      controlledMaterials: ['material.mirelac', 'material.glasscane'],
      headquarters:
        "The Compact hall raft in [[district.floating-swamp-settlement-the-stone-lots|the Stone Lots]], chained to the Moorstone itself and therefore the only address in the settlement that survives a re-moor. The deed chest is aboard it. So is the [[faction.bonewax-post|Bonewax]] sealed box, which is the one outsider fixture the pole-boats wave through.",
      territory:
        "About nine miles of lagoon, redefined twice a year. The Compact's territory in any given season is a list, not a map, which is exactly why [[mechanic.the-remoor|the Re-Moor]] is the settlement's signature mechanic and why districts here are described as bidders rather than places. Beyond the lagoon it claims the comb channels by use and defends them by knowing them.",
      relationNotes:
        "Owes [[faction.iron-sluice-company|the Iron Sluice Company]] for every hour of slack water it gets and secretly buys release warnings from it, which is the same relationship written twice. Tolerates [[faction.low-tally|the Low Tally]], which keeps three lots under tenants' names and moves cargo through the comb channels faster than the Weir can count. Files Ascent writs in the peat, which [[faction.concord-of-weights|the Concord]] has stopped remarking on. Waves [[faction.bonewax-post|the Bonewax Post]] through unasked, the only outsider that gets that. Has no dealings at all with the inland orders and would not recognise a Pitchguard uniform.",
      recruitment:
        "Kinship, or a lot. The Compact does not recruit; clans adopt, and adoption is a real legal act with a ceremony and a cost. An outsider who draws a lot is a lot-holder and nothing more, which means shelter and no protection. A party that wants standing here has to be spoken for by a clan, and the price is always a favour owed at the next draw, which is the most dangerous currency in the delta.",
      requiredSkills: ['skill.marsh-footing', 'skill.weather-eye', 'skill.trade-cant'],
      crimes:
        "Cutting a mooring without a clerk's warrant, which is answered by cutting yours. Moving a [[item.moor-stake|moor stake]] or recutting the mark on its head, which is the delta's theft and is treated as such. Fouling a lot's water. Selling a warning you did not buy. There is no written code and no prison: judgments are moorings, tows, cuttings and, at the end, being set adrift outside the lagoon in the wet season.",
      questlineNotes:
        "[[quest.slackwater-rights|Slackwater Rights]] is the hidden-outcome quest and the whole of it turns on whether a player physically turns the deed over: a reversionary clause on the back quietly assigns the berth to a Black Weir creditor, and the winning clan finds out a season later that it has been mooring as a tenant. Sabbe's purchase is the campaign-level item. [[npc.gwill-ossekind|Gwill Ossekind]]'s missing staves make the low-water route unsafe for everybody, including the Compact's own polemen.",
      repRewards: [
        row({ tier: 'Set adrift', reward: 'No lot, no tow, no clan will take your line', note: 'In the wet season this is a death sentence delivered as a shrug.' }),
        row({ tier: 'Unspoken', reward: 'Anchorage on sufferance in the tail lots', note: 'Where outsiders start. The tail lots are also the lots the water takes first.' }),
        row({ tier: 'Lotted', reward: 'A drawn lot, a moor stake, and a claim heard at the stone', note: 'The party now has an address that changes twice a year, which is a mechanic rather than a nuisance.' }),
        row({ tier: 'Spoken for', reward: 'A clan\'s protection and a voice in consensus', note: 'Also a clan\'s feuds. The two are not separable.' }),
        row({ tier: 'Clerked', reward: 'A draw-clerk\'s knife and register, and lawful power to cut a mooring', note: 'The most quietly enormous power in the delta.' }),
        row({ tier: 'At the stone', reward: 'A seat among the elders and a hand on where the town moors next', note: 'Endgame: the party decides whether the settlement drifts into the Weir\'s toll reach.' }),
      ],
      currentPlans: [
        'Hold the autumn draw without the low-lot clans working out who was warned in the spring.',
        'Decide whether the town re-moors upriver, and make the decision look like weather.',
        'Buy a standing block of gate-hours instead of paying by the release.',
        'Get the low-water channel re-cut and the staves replaced before the water drops further.',
        'Keep the three lots held under tenants\' names out of the register for another season.',
      ],
      history:
        "Every clan dates the Compact to a flood and none of them agrees which. The consistent parts: the settlement was several separate moorings, the flood put them into one lagoon, and the draw was invented so that the survivors would stop killing each other over the high ground, of which there was none. The Moorstone was already there. What it is, and who set it, is not a question the Compact considers interesting.",
      devNotes:
        PROPOSAL('The eleven clans, the 380 numbered lots, the draw-clerk service and the resale of weir warnings are proposed. The advance-warning trade is the manifest hook and is the reason the Compact is a government rather than a custom.') +
        '\n\nDESIGN INTENT: the only faction here whose territory is a list rather than a shape. Anything that wants to threaten it has to threaten a schedule, not a wall.',
    },
  }),

  /* ================================================================ */
  /* THE LOW TALLY                                                     */
  /* ================================================================ */

  E({
    id: 'faction.low-tally',
    type: 'faction',
    name: 'The Low Tally',
    aka: ['The Second Ledger', 'The Low Count'],
    status: 'draft',
    summary: 'The second ledger: untaxed cargo across the Drown, the Pans and the Ascent, moved by people who count differently and have started counting people.',
    tags: ['criminal', 'smuggling', 'multi-city', 'dark'],
    accent: '#6b4a5c',
    fields: {
      overview:
        "Not a gang and not a guild. The Low Tally is a method with a name attached: keep a second set of figures, move goods against the difference, and never let the two books meet. It has no hall, no muster and no membership roll, and it operates in at least seven settlements because the method travels better than any organisation could.\n\nWhat holds it together is arbitration. A dispute between two crews who have never met is settled by a low count, an accounting held in front of a third party who takes a share for the ruling, and the ruling is honoured because a crew that ignores one stops being able to sell anything anywhere. That mechanism is the whole of the Low Tally's government, and it works because it is cheaper than violence.\n\nIt is also, in the last four years, the largest mover of people on the continent.",
      factionType: 'Syndicate',
      scale: 'No roll. Perhaps 3,000 who would answer to a low count, across seven settlements and four regions',
      founded: TBD('Does the Low Tally have an origin at all, or is it simply what the trade calls itself wherever there is a scale to avoid?'),
      ideology:
        "A tariff is a story about a number, and there is always another number. The Low Tally's working philosophy is genuinely anti-institutional rather than merely greedy: its arbitrators will tell you that the [[faction.concord-of-weights|Concord]] is the same trade with better stationery, and that the only difference between a tariff and a toll is who owns the hangman. That argument has recruited a great many honest carters. It also does not survive contact with what the trade now carries.",
      creed: 'Two books. One is for them.',
      publicIdentity:
        "Nothing, by design. The Low Tally presents no face at all and denies being an entity: what exists is a bargeman, a drover, a warehouse clerk and a low count that both of them will accept. Where it has a public character it is deliberately sympathetic, and in the Ascent it is tolerated outright, because a certain volume of untaxed cargo keeps the honest price legible and the Concord knows it.",
      publicFace: 'A bargeman who will not ask what is in the crate, and an arbitrator nobody can name twice',
      hiddenAgenda:
        "The most profitable cargo is no longer goods. People move at a better margin than salt, and the trade has been laundered into two respectable instruments: crewed passage, where a person is a name on a manifest for a voyage that does not end where the manifest says, and bond transfer, where a debt is sold across a border and the body follows the paper.\n\nThe second instrument is why this cannot be handled as ordinary crime. A transferred bond is lawful in [[city.arena-city|the Arena City]] and [[city.sifting-city|the Sifting City]], void in [[city.mediterranean-city|the Mediterranean City]], and enforceable at the Ascent gate as evidence. The Low Tally is not evading the law; it is arbitraging thirteen of them. The crews moving the cargo are frequently the same crews who moved salt last season and have not been told what changed.",
      leadership:
        "No leader has ever been identified, and the structure is designed so that identifying one would achieve nothing. What exists is a shifting bench of arbitrators, perhaps forty of them, who hold low counts and take a share for the ruling. An arbitrator's authority is entirely reputational and evaporates the moment a ruling is seen to be bought.",
      leaderTitle: 'Arbitrator of the low count',
      ranks: [
        row({ rank: 'Carried', req: 'Owing somebody a favour and having a boat, a cart or a key', grants: 'One job, cash, and no protection whatsoever' }),
        row({ rank: 'Counted', req: 'Three jobs completed and a low count held in your name', grants: 'A share rather than a fee, and a route you can work again' }),
        row({ rank: 'Fenced', req: '[[skill.fence-work|Fence Work]] and a buyer nobody can trace to you', grants: 'The right to move goods with no provenance and set your own price' }),
        row({ rank: 'Route-holder', req: 'A route that has run clean for two seasons', grants: 'A cut of everyone else\'s traffic on it, and the duty to keep it open' }),
        row({ rank: 'Arbitrator', req: 'Two route-holders who will accept your ruling against their own interest', grants: 'A share of every dispute you settle, in seven settlements' }),
        row({ rank: 'Second ledger', req: 'Nobody has ever been shown to hold this rank', grants: 'Unknown. Whether there is a top to the Low Tally at all is an open design question.' }),
      ],
      resources:
        "The silted staiths at [[district.gilded-ascent-confluence-wharves|the Confluence Wharves]], which are unlawful to land at and therefore unweighed. Drover carts out of [[district.sifting-city-the-outbound-yard|the Outbound Yard]]. Three lots in the floating settlement held under tenants' names. Six unaccounted mooring lines under [[city.sky-city|the Sky City]]. The comb channels of the Drown, which the Weir cannot count. Buyers in every city, including the ones that hang for it. And unsealed [[material.levin-salt|levin salt]] and sorted [[material.faultglass|faultglass]], which are the highest-value contraband on the continent by weight.",
      controlledMaterials: ['material.levin-salt', 'material.faultglass', 'material.cudmother'],
      headquarters:
        "None, and the absence is structural. The nearest thing is a low count, which is held wherever two crews and an arbitrator can sit down: a barge cabin, a drover camp, a back room off [[district.arena-city-banner-streets|the Banner Streets]]. Burning any single place the Low Tally uses costs it a week.",
      territory:
        "Routes rather than ground. The wharves and the pass road out of the Ascent; the Outbound Yard and the drover trails across the Pans; the comb channels and the tail of the Drown; the six unaccounted lines under the Sky City; the caravan ground at [[city.orath|Orath]], where guild law does not reach; and the mains-down maintenance window in [[district.mediterranean-city-conduit-yards|the conduit yards]], which is published a fortnight ahead and which the College, the Low Tally and the constables all plan around each other in.",
      relationNotes:
        "Hunted openly by [[faction.iron-sluice-company|the Iron Sluice Company]], which hangs ullage crews at the sluices while paying its own gantry hands less than the Low Tally does. Hunted absolutely by [[faction.fetterhouse|the Fetterhouse]], for whom unsealed salt is a capital matter. Tolerated by [[faction.concord-of-weights|the Concord]], which finds a controlled volume of it useful. Quietly essential to [[faction.bondwrights-hall|the Bondwrights' Hall]], which is where transferred bonds become respectable. A paying subscriber to [[faction.bonewax-post|the Bonewax Post]] under three separate names. Treated as treason by [[faction.mirror-assembly|the Mirror Assembly]] and as insurance by the terraces beneath it.",
      recruitment:
        "Debt, mostly. The Low Tally recruits at the exact moment a person's lawful options close: a discharged bond, a condemned cargo, a levy notice, a term in the Salt Office register. It asks nothing about morals and everything about routes, and it is scrupulous about paying the first job in full and on time, because the first job is the whole recruitment. Players will be offered work before they are ever told there is an organisation.",
      requiredSkills: ['skill.fence-work', 'skill.trade-cant', 'skill.quiet-ground', 'skill.the-cold-read'],
      crimes:
        "All of them, in a specific order. Untaxed cargo, which most cities treat as a fine. [[skill.false-proof|False proof]] and [[item.cut-seal|cut seals]], which cost a hand in the Ascent. Unsealed levin salt, capital in three cities. And the trade in crewed passage and transferred bonds, which is lawful in two settlements, capital in one, and which no city has yet framed a charge for because framing one would require naming what the lawful bond trade is.",
      questlineNotes:
        "[[quest.the-ullage-run|The Ullage Run]] is the smuggling branch and the crews who run it are named and hanged if it fails. [[quest.the-indenture-column|The Indenture Column]] is the trafficking branch and should be run as consequence rather than spectacle: the party can run the column, divert it or expose it, and each choice decides who is freed, who is sold on regardless, and who gets burned to keep the paperwork clean. The turn worth building a campaign on is the moment a party that has happily run salt for the Low Tally opens a crate.",
      repRewards: [
        row({ tier: 'Counted against', reward: 'No crew will carry for you anywhere on the continent', note: 'The Low Tally does not retaliate. It simply stops being available, which is worse.' }),
        row({ tier: 'Unknown', reward: 'Cash work at a stranger\'s rate, one job at a time', note: 'Where everyone starts. No protection if the job goes wrong.' }),
        row({ tier: 'Counted', reward: 'A share instead of a fee, and a route you may work again', note: 'The first tier at which smuggling is income rather than an incident.' }),
        row({ tier: 'Fenced', reward: 'Buyers with no questions, and provenance the stamp will bear', note: 'Turns loot into money, which is the mechanical reason players care about this faction.' }),
        row({ tier: 'Route-held', reward: 'A cut of all traffic on a route of your own', note: 'Passive income, and an obligation to keep the route open that will eventually require violence.' }),
        row({ tier: 'Arbitrating', reward: 'A share of every dispute you settle in seven settlements', note: 'Endgame. The party can now rule on whether the people trade is honoured as a debt or thrown out as unenforceable.' }),
      ],
      currentPlans: [
        'Keep the crewed-passage manifests clean through the Arena City, which is the only port where the paper survives inspection.',
        'Open a standing channel through the Weir Gates that does not depend on bribing gantry crews individually.',
        'Move the Pans traffic off drover carts before the Pale Assay starts stamping the outbound yard.',
        'Find out which arbitrator sold the last three ullage crews and hold a low count on them.',
        'Decide, at bench level, whether the people trade is admitted as cargo, which it has so far avoided saying out loud.',
      ],
      history:
        "There is no founding and there is no first name. What the trade agrees on is that the low count is older than the [[landmark.the-brass-standard|Brass Standard]] and that the phrase predates the Concord, which if true would make the second ledger older than the first. The Low Tally likes this story enormously and has never produced a document.",
      devNotes:
        PROPOSAL('The arbitrator bench, the low count as a dispute mechanism, and the absence of any leadership are proposed. The people trade is the manifest hook.') +
        '\n\nDESIGN INTENT: a criminal faction that is genuinely useful, genuinely sympathetic, and doing something the party will not be able to keep working alongside. The trafficking must never be a set piece. It is a column on a manifest, a bond transfer, and a crate that was not supposed to be opened. Handle every scene of it through paperwork and consequence.',
    },
  }),

  /* ================================================================ */
  /* THE RED WRIT                                                      */
  /* ================================================================ */

  E({
    id: 'faction.red-writ',
    type: 'faction',
    name: 'The Red Writ',
    aka: ['The Writ', 'The Reading Room'],
    status: 'draft',
    summary: 'Brokers fight-contracts and mercenary companies out of the Sunken Ring; a signature is a debt on your body, and the unexpired paper is an army.',
    tags: ['mercenary', 'contracts', 'indenture', 'multi-city', 'dark'],
    accent: '#8c3a2e',
    fields: {
      overview:
        "A brokerage. The Red Writ does not own fighters, employ soldiers or hold territory: it writes contracts, prices them, sells them forward and enforces them, and takes a cut of every one. Fight cards at [[landmark.the-sunken-ring|the Sunken Ring]], garrison contracts in the Ascent, escort work across the Cinder Waste margin, and the [[mechanic.ring-bond|Ring Bond]] itself all pass through the reading room under the sand at [[district.arena-city-writ-court|the Writ Court]].\n\nThe [[city.arena-city|Arena City]]'s government is the Ring Chamber, which votes by unexpired contract. The Red Writ holds most of the unexpired contracts. The Chamber is therefore the Writ with a public gallery, and the arrangement is so obvious that nobody bothers to conceal it.\n\nWhat is concealed is the total.",
      factionType: 'Cartel',
      scale: 'About 300 stewards and clerks; several thousand contracted fighters within a day; unexpired paper on many times that',
      founded: 'The reading room predates the present Ring. The first contract on the shelf is a garrison hire, not a fight card.',
      ideology:
        "A person can sell anything they own, including the use of themselves, and a contract freely signed is the only honest relationship there is. The Writ argues this with real force and considerable evidence: it pays on time, it enforces both ways, and a fighter with Writ paper can sue a banner-master and win. The rot is at the edges of consent, where a person signs because the alternative is starving, and the Writ has never once been interested in that distinction.",
      creed: 'Sign, and the Ring keeps a share of you.',
      publicIdentity:
        "A contract office, open to inspection, with the terms posted. Its stewards are contract officers first and watchmen second, its clerks will read you your own stipulations aloud on request, and it genuinely prosecutes banner-masters who breach. The Writ's public argument is that it is the only institution on the continent that treats a labourer's word and a house's word as the same instrument, which is true and which is exactly how it gets people to sign.",
      publicFace: '[[npc.berke-chagra|Berke Chagra]] at the rail, and the card posted three days before every sanctioned bout',
      hiddenAgenda:
        "The Writ holds enough unexpired contracts to field a standing army that no city has counted, taxed or noticed. Not a militia and not a reserve: live paper, callable at notice, spread across every settlement that honours a Writ contract, with the obligation running to the Writ rather than to any employer. Nobody has ever summed the roll, including, until recently, the Writ.\n\nThe Arena City's own defence policy is that this is cheaper than a garrison. It is cheaper. Whether the Chamber could actually call it, or whether the Writ would simply take the city, has never been tested and is the sort of question that gets answered once.\n\nThe smaller, dirtier item: the house does not bribe fighters, it buys their water ration. Two dry days and a fighter loses honestly, and nothing can be proved from the fight itself.",
      leadership:
        "No single head. A reading room of senior brokers, each holding a book of contracts, voting by unexpired paper exactly as the Chamber does. Berke Chagra is the largest single holder and holds paper on half the fighters and most of the stewards, which makes him the closest thing to a principal and gives him no formal authority whatsoever.",
      leaderTitle: 'Holder of the first book',
      ranks: [
        row({ rank: 'Signed', req: 'A mark on a contract and a sum taken', grants: 'Money now; a stated share of you, and stipulations that harden by tier' }),
        row({ rank: 'Carded', req: 'Three sanctioned bouts survived, or one contract served clean', grants: 'A [[item.tallyblade|tallyblade]], a tier, and the right to negotiate your own card' }),
        row({ rank: 'Freed on paper', req: 'A cleared indenture and a stamp that survives inspection', grants: 'A [[item.quitblade|quitblade]], which proves you are not owned' }),
        row({ rank: 'Steward', req: 'Literacy, a clean book and the Writ\'s bond', grants: 'Contract enforcement, a stipend, and summary powers inside the Ring' }),
        row({ rank: 'Broker', req: 'A book of contracts you priced and can defend', grants: 'A cut of every contract in your book, and a vote in the reading room' }),
        row({ rank: 'Book-holder', req: 'Enough unexpired paper that the room cannot outvote you', grants: 'A share of the Chamber, and the ability to call companies nobody has counted' }),
      ],
      resources:
        "The contract vault three floors under the sand, which holds every original on the continent that anyone would want burned. [[landmark.the-sunken-ring|The Sunken Ring]] and its gate. [[machine.the-char-retorts|The char retorts]] beneath the arena floor and the claim ledger that decides whose bone. Three hundred stewards, several thousand fighters within a day, and the unexpired roll. Retained companies on standing contract to [[faction.concord-of-weights|the Concord]], quartered below the fourth terrace of a city that thinks it hired guards.",
      controlledMaterials: ['material.steppe-scute'],
      headquarters:
        "The reading room at [[district.arena-city-writ-court|the Writ Court]], opposite the Chamber hall and the bond registry, which is not a coincidence and was not planned. The vault is three floors below it, cut into the same rock as [[district.arena-city-the-under-stands|the under-stands]], and shares a wall with [[npc.sukhet-daral|the beast-keeper's]] pens, which is currently a structural problem nobody has costed.",
      territory:
        "The Ring, the Writ Court and the pens, absolutely. Beyond the Ashen Steppe it holds no ground and enormous obligation: contracts enforceable in every city that honours Writ paper, recruiters on the caravan ground at [[city.orath|Orath]] who do not check what anyone signed, and three companies standing in the Gilded Ascent. Its territory is a list of names and where each of them has to be by a stated date.",
      relationNotes:
        "Sells force to [[faction.concord-of-weights|the Concord of Weights]] and is the only reason the Ascent can maintain a policy of having no army. Runs the same trade from the other end as [[faction.bondwrights-hall|the Bondwrights' Hall]] and the two are allied in fact and competitors in the paper market. Buys the cleanest manifests in the people trade from [[faction.low-tally|the Low Tally]] and does not describe it that way. Has broken [[faction.standing-hour|the Standing Hour]] in the pens three times, twice by stewards and once by the Standing Hour's own stewards deciding the strike was not permitted to win. Sells char east to [[faction.pale-assay|the Pale Assay]]'s ladders, which is a trade and a moral hook at once.",
      recruitment:
        "A table, a sum and a pen, and it is the easiest faction in the setting to join. The Writ will sign anyone, will explain the stipulations honestly if asked, and will pay the sum before the ink dries. That is the trap and it is meant to be: [[mechanic.ring-bond|the Ring Bond]] should be offered to players as a solution, because that is how it is offered to everyone else. Injuries persist between cards, and the share is transferable, so a party who signs with a banner-master may find their paper held by someone they have just made an enemy of.",
      requiredSkills: ['skill.ring-craft', 'skill.close-work', 'skill.crowd-turning', 'skill.plain-letters'],
      crimes:
        "Forging a [[item.quitblade|quitblade]], which is the obvious one and is treated as theft of a person. Breaching a card. Fighting unsanctioned inside the city. Voiding a manumission on a technicality, which is not a crime and is what happened to [[npc.aylun-torgai|Aylun Torgai]], whose original sits in the vault three floors under the sand. The Writ prosecutes banner-masters as readily as fighters, which is the fact that keeps everyone signing.",
      questlineNotes:
        "[[quest.the-indenture-column|The Indenture Column]] ends here: the Ring Chamber are the buyers, and what the party does with the column decides who is freed and who is sold on regardless. [[npc.aylun-torgai|Aylun Torgai]]'s voided manumission is the vault heist with a person at the end of it. [[npc.berke-chagra|Berke Chagra]]'s water-ration scheme can only be proved through the water-steward's tally, and the water-steward owes him more than she earns in a year. The unexpired roll is the campaign object: someone eventually sums it, and whoever does had better already know what they intend to do about the answer.",
      repRewards: [
        row({ tier: 'Called', reward: 'Your paper is called in full, at once, wherever you are', note: 'The Writ does not hunt people. It sells the obligation to somebody who will.' }),
        row({ tier: 'Unsigned', reward: 'The gate, the gallery, and the posted card', note: 'Where everyone starts. You may watch, bet and be recruited.' }),
        row({ tier: 'Signed', reward: 'A sum now, a tier, and stipulations', note: 'The Ring Bond proper. Injuries persist and the share is transferable.' }),
        row({ tier: 'Carded', reward: 'A tallyblade, your own card negotiation, and a cut of the gate', note: 'Real money and a body that is being spent to earn it.' }),
        row({ tier: 'Stewarded', reward: 'Contract enforcement, a stipend and summary powers inside the Ring', note: 'The party is now the instrument that collects on other people\'s bad afternoons.' }),
        row({ tier: 'Book-held', reward: 'A book of contracts, a vote in the reading room, and companies you can call', note: 'Endgame, and the most militarily dangerous position a player can hold anywhere on the continent.' }),
      ],
      currentPlans: [
        'Sum the unexpired roll quietly, which four brokers have privately started doing and none have finished.',
        'Keep the Chamber voting by contract rather than by household, which is proposed once a decade and defeated once a decade.',
        'Buy the Arena City water stewardship outright rather than continuing to bribe it.',
        'Deal with whatever is breeding under the stands before it comes through the vault wall.',
        'Take a third retained company in the Gilded Ascent, and quarter it above the fourth terrace for the first time.',
      ],
      history:
        "The reading room is older than the sunken arena and began as a hiring office for caravan escorts on the steppe margin. Fight contracts came later and were, at first, a sideline that paid for the clerks. The change everyone points to is the introduction of the transferable share, which turned an employment contract into an asset and made it possible for a person's obligation to be held by somebody they had never met. Nobody at the time thought it was a significant clause.",
      devNotes:
        PROPOSAL('The reading room, the transferable share, the unexpired roll and the Chamber-as-Writ arrangement are proposed. The uncounted standing army is the manifest hook.') +
        '\n\nDESIGN INTENT: publicly a brokerage, structurally a Military faction, and the `factionType` is set to Cartel deliberately so the sheet lies the way the world does. Indenture here is a contract with terms, enforced fairly, and that is precisely why it works and why it is horrifying. Never play it as chains.',
    },
  }),
  /* ================================================================ */
  /* THE FETTERHOUSE                                                   */
  /* ================================================================ */

  E({
    id: 'faction.fetterhouse',
    type: 'faction',
    name: 'The Fetterhouse',
    aka: ['The House', 'The Chain Rota'],
    status: 'draft',
    summary: 'Licenses, marks and chains the practitioners of the Magic City; the wards on the Bound Fault are its warrant and its arithmetic problem.',
    tags: ['order', 'magic', 'licensing', 'dark'],
    accent: '#5b4a7a',
    fields: {
      overview:
        "The state, the guild and the insurer of [[city.magic-city|the Magic City]], in that order of self-description and the reverse order of what actually moves it. The Fetterhouse issues every licence to work, marks every licensed practitioner, sets the rota that holds the chains on [[landmark.the-bound-fault|the Bound Fault]], and posts every binding in the city on [[landmark.the-load-roll|the Load Roll]] with its rated tonnage, inspection date and named caster.\n\nMagic here is plant, not wonder. Fourteen slabs of pavement were thrown out of true when the ground stopped agreeing with itself, four of them over the old town, and the city did not move: it chained them. [[spell.holdfast-binding|Holdfast bindings]] hold the slabs, [[mechanic.ward-load|ward load]] is a maintenance schedule, and [[mechanic.the-toll|the Toll]] is what the maintenance costs the people who do it.\n\nThe schedule is running behind. Everyone knows. The Fetterhouse's authority rests entirely on being the only body that can say how far behind.",
      factionType: 'Order',
      scale: '600 wardens, about 1,400 licensed practitioners, nine chains and a rota that cannot be spared for anything',
      founded: 'The order dates from the slippage that threw the slabs, and has never claimed to predate it',
      ideology:
        "Unlicensed working kills strangers. That is the whole doctrine and it is demonstrably correct: a lapsed holdfast drops whatever it was holding, and what it was holding is usually a street. From there the Fetterhouse reasons that a practitioner is not a person with a talent but a load-bearing member of a structure, to be inspected, rated, scheduled and replaced. It uses that language deliberately. It thinks the language is a kindness, because it removes blame.",
      creed: 'Every binding has a name on it.',
      publicIdentity:
        "A licensing authority with a public register. The Load Roll is genuinely public, genuinely accurate and genuinely read: any citizen can look up which caster holds the slab over their roof and when it was last recut. Wardens wear numbered [[item.bound-harness|bound harness]] and the number is the licence. The Fetterhouse publishes its failures, pays compensation without litigation, and is the only institution in this file that has never been caught lying about a number.",
      publicFace: 'The Load Roll, repainted weekly, and [[npc.halvo-sarn|Halvo Sarn]] at the permit desk of the ward-office',
      hiddenAgenda:
        "The chains are held by licensed casters who are burning out, and the licence roll is a rota of who burns next. That is not a metaphor for overwork. A caster on chain rota accrues [[mechanic.the-toll|Toll]] faster than any lawful [[skill.bleed-off|bleed-off]] can discharge it, and the Fetterhouse knows within about eight months when each of them will stop being able to hold a line. It schedules accordingly, recruits ahead of the curve, and does not tell the caster.\n\nTwo further items. Nine chains bind the fault and [[npc.ysme-drannik|Ysme Drannik]] is the only living person who knows which two are already dead; the city keeps her caged rather than admit the number aloud. And [[npc.toval-cherek|Toval Cherek]] has been shorting the alloy in the replacement links for two years to meet quota, so a known set of sections will pass cold inspection and fail under sustained load.",
      leadership:
        "A chapter of licence-holders under a Warden of the Chain, elected by the chapter and serving until they can no longer hold a line, which is the only term limit in the setting that is measured in a person's remaining capacity. The wardenship has changed six times in twenty years, which the Fetterhouse cites as evidence of its own integrity and which is in fact the burn rate.",
      leaderTitle: 'Warden of the Chain',
      ranks: [
        row({ rank: 'Unmarked', req: 'None, and no lawful working of any kind', grants: 'Nothing. An unmarked hand caught working is charged on the spot.' }),
        row({ rank: 'Chalked', req: '[[skill.chalk-hand|Chalk Hand]] and a filed drawing', grants: 'A licence to lay and read chalk lines, and a mark on the wrist' }),
        row({ rank: 'Cutter', req: '[[skill.ward-cutting|Ward Cutting]] and two years without a lapse', grants: 'Durable ward work, a numbered harness, and a place on the roll' }),
        row({ rank: 'Sinker', req: '[[skill.bleed-off|Bleed-Off]] and a sink licence', grants: 'Lawful discharge past your limit, and a leash that ends the day the licence is pulled' }),
        row({ rank: 'Load-binder', req: '[[skill.load-binding|Load Binding]] and a slab that has not moved under you', grants: 'Structural work, the best pay in the city, and a place on the chain rota' }),
        row({ rank: 'Chain-held', req: 'A section of the Bound Fault carried for a full rota', grants: 'A chapter vote, and a documented eight months of usable life' }),
        row({ rank: 'Warden of the Chain', req: 'Election by the chapter; served until you cannot hold a line', grants: 'The rota, the roll, and the count of how many chains are actually alive' }),
      ],
      resources:
        "Nine chains and [[landmark.the-ninth-chain|the Ninth Chain]]. [[machine.the-ward-kilns|The ward kilns]] that fire scar marl into licensed [[material.ward-chalk|ward chalk]] inside a live fault field, at a dose to the burners. The [[material.levin-salt|levin salt]] vats and the seal that taxes them by the grain. Sorted [[material.faultglass|faultglass]], possession of which is capital in three cities. [[material.quenchspar|Quenchspar]] out of [[deposit.cold-quarter|the Cold Quarter]]. Six hundred wardens, a chain-house that holds its own prisoners, and the annual ward-marl cut bought years forward from a city in the sky.",
      controlledMaterials: ['material.ward-chalk', 'material.levin-salt', 'material.faultglass', 'material.quenchspar'],
      headquarters:
        "The chain-house in [[district.magic-city-chainhouse-ward|the Chainhouse Ward]]: rota board, licence roll, permit office and cells, all in one building because the Fetterhouse considers them one function. The ward-office permit desk faces the street and is the only part most citizens ever see. The rota board faces inward and is not readable from the door.",
      territory:
        "The city, the fourteen slabs, the salt vats at [[district.magic-city-salt-vats|the vats]], the chalk row and the fault itself. Beyond [[region.aetheric-scar|the Scar]] the Fetterhouse holds no ground and exports the only regulated magical consumable there is: every ward in the world is chalked in its chalk, lines go dead within a season, and the entire warding trade is therefore a repeat-order business with the Fetterhouse at the top of it.",
      relationNotes:
        "Buys ward marl forward from [[faction.mooring-assize|the Mooring Assize]] and is bidding against it at [[quest.the-scar-concession|the concession auction]], which is a position neither has resolved. At war with [[faction.low-tally|the Low Tally]] over unsealed salt and sorted faultglass, and losing, because the margin on a grain of difference is better than any cargo. Rival of [[faction.conduit-college|the Conduit College]] on principle: two licensing bodies with incompatible theories of who may be trusted with a number. And secretly cooperating with [[faction.pale-assay|the Pale Assay]] on something that has left crated Magic City ward chalk in the deep [[region.white-pans|White Pans]], hundreds of kilometres off any sanctioned route.",
      recruitment:
        "The Fetterhouse takes anyone who can hold a line and it takes them young, because the useful years are finite and it prefers to have them all. Licensing is examined, free, and closes with a mark cut into the wrist that cannot be removed. There is no way to stop being licensed except to be struck off, and a struck-off caster still has the mark, which is the point. Players who take any Arcana & Risk node in [[city.magic-city|the Magic City]] are dealing with this faction whether they join it or not.",
      requiredSkills: ['skill.chalk-hand', 'skill.ward-cutting', 'skill.toll-sense', 'skill.bleed-off', 'skill.load-binding'],
      crimes:
        "Working unmarked. [[skill.grey-casting|Grey casting]], which is working off the register so that nothing is metered while the Toll accrues uncapped. [[skill.toll-shunting|Toll shunting]], which is outlawed everywhere without exception and is the only offence the Fetterhouse executes for without a hearing. Possession of faultglass. Backdating a permit, which is what [[npc.halvo-sarn|Halvo Sarn]] does at a rising price and which quietly makes him the single point of failure for prosecuting anyone in the city.",
      questlineNotes:
        "[[quest.the-chalk-that-lies|The Chalk That Lies]] is the investigation the Fetterhouse commissions and cannot survive failing: adulterated chalk assays clean and fails under load, and if the batch is not pulled the western chains go and a bound district is lost along with the order's monopoly on saying what is safe. [[quest.the-scar-concession|The Scar Concession]] follows from it and decides the price of regulated magic for a generation. [[npc.ysme-drannik|Ysme Drannik]] will trade the number of dead chains for one name struck off a proscription list and will not say why that name.",
      repRewards: [
        row({ tier: 'Struck off', reward: 'Licence pulled, mark retained; every working you attempt is a charge', note: 'The cruellest standing in the setting: you keep the visible mark of the thing you are forbidden to do.' }),
        row({ tier: 'Unmarked', reward: 'No lawful working anywhere in the city', note: 'Where outsiders start. Grey casting is available and shortens your life.' }),
        row({ tier: 'Chalked', reward: 'A chalk licence and paid ward work', note: 'Entry to the city\'s actual economy. Chalk lines die within a season, so the work never ends.' }),
        row({ tier: 'Cut', reward: 'A numbered harness, durable ward work, and a place on the roll', note: 'Respectable, well paid, and the first tier at which the Toll starts outrunning you.' }),
        row({ tier: 'Sinked', reward: 'A licensed sink and lawful discharge past your limit', note: 'The leash. The Fetterhouse can pull the sink licence at any time and usually does it as leverage.' }),
        row({ tier: 'Chain-held', reward: 'A chapter vote, the best pay in the city, and a section of the fault', note: 'Endgame with a clock on it. The rota is a documented estimate of how long the character has left.' }),
      ],
      currentPlans: [
        'Trace and pull the adulterated chalk batch before a western section fails under sustained load.',
        'Re-link the sections carrying Toval Cherek\'s shorted alloy without admitting which sections those are.',
        'Take the Scar concession, or at minimum keep it out of the hands of anyone who would price chalk.',
        'Recruit sixty new licensed hands this year, which is nine more than the city has produced in any year on record.',
        'Decide what to do about Ysme Drannik, who cannot be released and cannot be executed without the number dying with her.',
      ],
      history:
        "The slippage came first and the order came second, which the Fetterhouse says often and is the whole of its legitimacy: it did not create the fault, it was raised to hold it. The last slippage is the recent wound. It moved a slab eleven inches, killed a number the order published in full, and put Ysme Drannik in a cell rather than a hearing. Every institutional habit the Fetterhouse now has, including the rota, the roll and the publication of failures, dates from the eight weeks after it.",
      devNotes:
        PROPOSAL('The nine chains, the chapter, the wardenship-until-incapacity, the burn-rate rota and the eight-month estimate are proposed. The licence roll as a rota of who burns next is the manifest hook.') +
        '\n\nDESIGN INTENT: the regulated-magic thesis made into a faction. The Fetterhouse is honest, competent, transparent about everything except the one number that matters, and is consuming people at a known rate to keep a city standing. It should be sympathetic. That is what makes joining it a decision.',
    },
  }),

  /* ================================================================ */
  /* THE BONDWRIGHTS' HALL                                             */
  /* ================================================================ */

  E({
    id: 'faction.bondwrights-hall',
    type: 'faction',
    name: "The Bondwrights' Hall",
    aka: ['The Hall', 'The Bondwrights'],
    status: 'draft',
    summary: 'The respectable brokerage that writes, prices and resells indenture bonds across the trading cities, and lobbies to keep machines expensive.',
    tags: ['guild', 'indenture', 'multi-city', 'dark'],
    accent: '#7a5a3a',
    fields: {
      overview:
        "The lawful half of the human trade, and it is genuinely lawful in most places it operates. The Hall writes [[item.indenture-bond|indenture bonds]], prices them against term, health and enforceability, sells them forward, and maintains the registries that make a bond written in one city collectable in another. It employs more clerks than any other institution on the continent and almost no muscle at all.\n\nIt does not capture anyone. It does not need to. Debt does the capturing: a default judgment in [[city.gilded-ascent|the Gilded Ascent]] resolves into a term in the Salt Office register, a yard debt with no published schedule in [[city.tree-city|the Tree City]] is an indenture in everything but name, and an allowance tied to an employer in [[city.sky-city|the Sky City]] is most of the way to a bond already. The Hall arrives afterwards with paperwork and a price.\n\nIt is the most profitable faction in this file and the least dramatic, and both facts are deliberate.",
      factionType: 'Guild',
      scale: 'Branches in six settlements, about 1,900 clerks and factors, and paper on a number it does not publish',
      founded: 'The Hall dates itself from the first registry that made a bond enforceable across a border, and considers that its real invention',
      ideology:
        "A debt is a debt and a person may pledge what they have. The Hall's argument, delivered without heat, is that the alternative to indenture is not freedom but starvation, that a bond is a schedule out of a hole rather than into one, and that everybody who calls it slavery is content to eat what it produces. The argument has clerks who believe it entirely. What the argument requires and never says is that the hole must remain deep enough for the schedule to look like a rescue.",
      creed: 'Term, sum and port of enforcement.',
      publicIdentity:
        "A brokerage and a registry. The Hall is scrupulous about paperwork, pays out on discharged bonds without argument, prosecutes bond-holders who exceed their terms, and publishes a standard form that is genuinely fairer than the private contracts it replaced. Its premises are dull. Its officers are polite. It has never been convicted of anything, in any city, in its entire recorded existence, and it says so on the door.",
      publicFace: 'The standard form, the discharge window, and a clerk who will read you the term aloud',
      hiddenAgenda:
        "The Hall lobbies to keep machinery licensed and dear so that human bodies stay the cheaper engine. It does this through three channels: money to [[faction.conduit-college|the Conduit College]]'s patent bench to keep three specific labour-saving designs off the roll, standing retainers to Ascent factors who argue against blasting and hoist licences on safety grounds, and a quiet preference in its own lending for enterprises that use hands rather than pressure.\n\nThis is the hidden agenda that is invisible in every individual transaction and unmistakable in aggregate. The Hall is not conspiring to enslave anyone. It is maintaining the price differential that makes its product viable, which requires the continent to stay about fifteen years behind what it could build. That is a slower and larger crime than anything the [[faction.low-tally|Low Tally]] does, and no city has a charge for it.\n\nThe smaller item: transferred bonds from the Low Tally are laundered through the Hall's registries, and the clerks who process them have not been told what a crewed passage is.",
      leadership:
        "A hall of factors, one branch one vote, chaired by a Master of the Roll who is elected for five years and traditionally comes from the smallest branch, which the Hall considers a safeguard and which functions as a guarantee that no chair ever has the standing to change anything. Real power sits with the four branch masters of the Ascent, the Arena City, the Sifting City and the Sky City.",
      leaderTitle: 'Master of the Roll',
      ranks: [
        row({ rank: 'Copyist', req: 'A clear hand and no criminal conviction', grants: 'A desk, a wage, and no sight of a price' }),
        row({ rank: 'Registrar', req: '[[skill.plain-letters|Plain Letters]] and a year without a clerical error', grants: 'The registry, and the power to find or lose a bond in it' }),
        row({ rank: 'Pricer', req: '[[skill.bond-broking|Bond Broking]] and a book that has not gone bad', grants: 'The right to price a term, which is the right to decide a life' }),
        row({ rank: 'Factor', req: 'Two branches\' sponsorship and a lodged surety', grants: 'May write, buy and resell bonds in the Hall\'s name across borders' }),
        row({ rank: 'Branch master', req: 'A branch that clears its own costs for three years', grants: 'A vote, a strongroom, and the discretion to void a bond without a reason' }),
        row({ rank: 'Master of the Roll', req: 'Election for five years, by convention from the smallest branch', grants: 'The chair, the standard form, and no power to alter either' }),
      ],
      resources:
        "The cross-border registries, which are the actual asset. Strongrooms in six cities, including the one under [[district.sifting-city-assay-row|Assay Row]] that holds physical indenture papers on roughly a third of the pan crews. A standing retainer with more Ascent factors than the Concord employs directly. Its own paper, which trades as a security. And the fact that [[faction.red-writ|the Red Writ]], [[faction.concord-of-weights|the Concord]] and every tower household in the Pans are simultaneously its largest clients and its largest debtors.",
      controlledMaterials: TBD('The Hall deals in people and paper and holds no commodity. Should it be given a stake in something physical so that a party can actually blockade it?'),
      headquarters:
        "The fourth-terrace hall in [[district.gilded-ascent-bonded-vaults|the Bonded Vaults]], which is the largest single employer of clerks in the Gilded Ascent. The registries are not there. They are distributed across all six branches on purpose, so that burning any one strongroom frees nobody and merely makes a lot of people unprovably free, which is worse.",
      territory:
        "No ground anywhere. Branches at the Ascent, the Sifting City, the Arena City, the Sky City, the Black Weir and a correspondent office nobody will name at [[city.orath|Orath]]. Its branches differ sharply: the Ascent branch is a respectable lending house, the Sifting City branch is a strongroom full of physical papers on living people, the Arena City branch is a wholesale market in transferable shares, and the Sky City branch deals almost entirely in allowance labour, where a person's right to remain is the collateral. The Mediterranean City is a hole in the map and a permanent grievance.",
      relationNotes:
        "Fused with [[faction.concord-of-weights|the Concord of Weights]]: the Concord's judgments manufacture the Hall's inventory and an attack on either takes down both. Allied in fact with [[faction.red-writ|the Red Writ]] and competing with it in the same paper market. Publicly at war with [[faction.conduit-college|the Conduit College]], whose harbour voids its bonds and charges the presenter, and privately paying that same College's bench to keep three designs unlicensed, which is the sharpest single divergence in this file. Refused three times by [[faction.mirror-assembly|the Mirror Assembly]] over the deep-gallery arrears. Buys timber-yard ledgers off [[faction.pitchguard|the Pitchguard]] without an office in the Greatwood. Infiltrated by [[faction.standing-hour|the Standing Hour]], which has clerks in two registries.",
      recruitment:
        "Literacy and a clean record, and that is genuinely all. The Hall is the most open employer in the setting and the most careful about the order in which it explains things: a copyist sees terms, a registrar sees names, and only a pricer ever sees the two together with a number attached. Players who take work here will spend a long time doing unobjectionable clerical labour before the shape of it becomes visible, which is exactly how the Hall's own staff experience it.",
      requiredSkills: ['skill.bond-broking', 'skill.writ-craft', 'skill.brokerage', 'skill.ledger-hand'],
      crimes:
        "Forging a bond, which the Hall prosecutes ferociously because its whole product is enforceability. Harbouring a runaway, which is a charge in four cities and not in the other nine. Exceeding a term, which the Hall genuinely prosecutes against bond-holders and which is the fact its clerks cite when they cannot sleep. And [[spell.debt-mark|debt marking]], which is lawful indenture in some cities and a capital crime in others and turns every runaway into an extradition case.",
      questlineNotes:
        "[[quest.the-indenture-column|The Indenture Column]] is where the Hall's respectable paper and the Low Tally's cargo meet, and the party decides which of the two the world sees. [[npc.tazrit-nourem|Tazrit n'Ourem]] holds physical papers on a third of the pan crews in one strongroom, and burning them frees several hundred people and immediately starts a fight over who feeds them. [[npc.doret-halvane|Doret Halvane]] will trade twelve years of wax key impressions for her brother's indenture papers, no haggling, and those papers are in a Hall strongroom.",
      repRewards: [
        row({ tier: 'Blacklisted', reward: 'No bond, no surety, no credit at any branch', note: 'Also flags you to the Concord within a season, because the registries talk.' }),
        row({ tier: 'Unknown', reward: 'Standard-form business at the window', note: 'Anyone may buy or sell a bond. That is the horror of it and it should be presented plainly.' }),
        row({ tier: 'Clerked', reward: 'Registry access and the ability to find a specific bond in six cities', note: 'The single most useful investigative tool in the trading half of the setting.' }),
        row({ tier: 'Priced', reward: 'The right to price a term, and a book of your own', note: 'The party is now setting the number that decides how long somebody works.' }),
        row({ tier: 'Factored', reward: 'Write, buy and resell across borders in the Hall\'s name', note: 'Includes the power to buy a specific person\'s bond and discharge it, which is the redemptive use.' }),
        row({ tier: 'Branch-held', reward: 'A strongroom, a vote, and the discretion to void a bond without giving a reason', note: 'Endgame. A party at this tier can free people wholesale and will discover what happens next.' }),
      ],
      currentPlans: [
        'Get indenture bonds recognised in the Mediterranean harbour court, at any price the assembly will name.',
        'Keep the three labour-saving designs off the Conduit College roll for a twelfth year.',
        'Buy the Hollow Karst deep-gallery arrears, which requires the Mirror Assembly to first admit they exist.',
        'Consolidate the Sifting City strongroom, which currently holds more physical paper than any branch should.',
        'Establish why bonds transferred through the Arena City branch have a discharge rate close to zero.',
      ],
      history:
        "The Hall's founding invention was not the bond but the cross-border registry, and it is honest about that. Before it, a bond was worthless the moment its subject crossed a river, which meant enforcement was violent, local and cheap. The registry made enforcement legal, distant and expensive, which reduced the number of people killed for running and increased the number who never ran. The Hall regards the first half of that sentence as its legacy and has never publicly acknowledged the second.",
      devNotes:
        PROPOSAL('The cross-border registry, the branch structure, the Master of the Roll convention and the eleven-year arrangement with the Conduit College bench are proposed. The machinery-licensing lobby is the manifest hook.') +
        '\n\nDESIGN INTENT: the darkest faction in the file and the one that must never raise its voice. Its atrocity is a price differential maintained by lobbying, and its staff are decent people doing correct paperwork. If a scene here ever features a chain, it has been written wrong.',
    },
  }),

  /* ================================================================ */
  /* THE STANDING HOUR                                                 */
  /* ================================================================ */

  E({
    id: 'faction.standing-hour',
    type: 'faction',
    name: 'The Standing Hour',
    aka: ['The Hour', 'The Stewards'],
    status: 'draft',
    summary: 'Cross-city labour movement named for the hour the Ascent hoists stopped; strike funds, blacklists, quiet violence, and a paymaster it does not know it has.',
    tags: ['movement', 'labour', 'multi-city'],
    accent: '#7a2230',
    fields: {
      overview:
        "The only continental organisation in this file that was not founded by anyone with money. It takes its name from the morning every cable in [[city.gilded-ascent|the Gilded Ascent]] stopped at once, which lasted nine hours, and it has spent two generations trying to have that morning again somewhere it would matter.\n\nWhat it actually runs is unglamorous and effective: strike funds that keep families fed through a stoppage, blacklists of masters who have killed crews through negligence, burial societies, and a steward system that can put four hundred people on a wharf at six hours' notice. It also does quiet violence, and is honest about that among its own, and dishonest about it everywhere else.\n\nIts chapters differ more than any other faction's, because each one has been shaped by whoever broke it last.",
      factionType: 'Movement',
      scale: 'Chapters in six settlements, perhaps 14,000 who pay dues, and about 90 stewards who decide anything',
      founded: 'The Standing Hour itself, which is a date every chapter keeps and no two of them keep on the same day',
      ideology:
        "The people who make the thing should not be the people who die of it. The movement is not revolutionary and has repeatedly refused to become so: its stewards argue that a city that stops eating stops listening, and that the point of a stoppage is to be ended on terms. That pragmatism has won real things, including the roof rule on the pitch yards and the burial fund at the hoists. It has also produced a leadership that is very good at ending strikes and has lost the habit of winning them.",
      creed: 'Nine hours. It can be nine hours anywhere.',
      publicIdentity:
        "A friendly society, and in [[city.mediterranean-city|the Mediterranean City]] that is a legal description. Dues, a burial fund, a hall, a blacklist of dangerous masters, and an insistence that it is not a political body. In the Ascent it is tolerated. In the Greatwood and the Ashen Steppe it is illegal and its stewards' names are read out at musters. The movement has no single face and refuses to produce one, which is a genuine security measure and a considerable organisational weakness.",
      publicFace: 'A steward at the mouth of the sixth arch, and the burial fund book anyone may inspect',
      hiddenAgenda:
        "The strike fund is fed by [[faction.concord-of-weights|Concord]] money. Not all of it, and not openly: it arrives through three friendly-society accounts and two sympathetic houses, and the Ascent stewards who accept it have persuaded themselves it is a concession won rather than a leash accepted. The consequence is that the stewards decide which strikes are permitted to win, and the strikes that are permitted are the ones that cost the Concord nothing.\n\nThat is why the movement has been broken three times in the Arena City pens, twice in the Greatwood pitch yards, and never once in the Mediterranean kilns where nobody is paying it. The Ascent chapter is the most compromised in the movement and is also the one that holds the fund.\n\nThe stewards' second secret is smaller and is theirs alone: a list of masters who have died in ways the movement did not investigate.",
      leadership:
        "Stewards, elected by their own yard or gallery and answerable to it, with a loose correspondence between chapters carried by [[faction.bonewax-post|Bonewax]] couriers who are not told what they are carrying. There is no executive. There is a fund, and the people who can draw on the fund are the leadership whether the movement admits it or not.",
      leaderTitle: 'Steward',
      ranks: [
        row({ rank: 'Duespayer', req: 'A trade and a coin a week', grants: 'The burial fund, the blacklist, and somebody to call' }),
        row({ rank: 'Called', req: 'Standing out once when it cost you', grants: 'Strike pay, and a name the masters now have too' }),
        row({ rank: 'Steward', req: 'Election by your own yard, gallery or crew', grants: 'Calling a stoppage, drawing on the fund, and the blacklist pen' }),
        row({ rank: 'Fund-holder', req: 'Two chapters\' confidence and a book that survives inspection', grants: 'Where the money goes, which is where the movement goes' }),
        row({ rank: 'Correspondent', req: 'Trusted by chapters that do not trust each other', grants: 'The only view anyone has of the whole movement' }),
      ],
      resources:
        "The strike fund, whose true composition is the movement's own hidden agenda. Burial societies in six cities. The blacklist, which is genuinely feared because insurers read it. About ninety stewards who can put people on a wharf faster than any watch can arrive. Condemned [[material.stairwire|stairwire]], which is everywhere in the hoist yards and makes an excellent barricade. And the fact that no faction in this file can move a cargo without somebody who pays dues touching it.",
      controlledMaterials: TBD('The movement controls no material and its whole leverage is labour. Is there a chokepoint trade where it should be given an actual hand on the supply?'),
      headquarters:
        "None that would survive being named. The fund is kept in the Ascent, the correspondence passes through the Mediterranean, and the movement's only permanent address is [[landmark.the-stopped-bell|the Stopped Bell]] at the gate of the hoist yards, which is a post with a bell on it and no clapper, and which the stewards meet within sight of rather than at.",
      territory:
        "Nothing, and it is the only faction here that is honest about holding nothing. Chapter strength by city: strongest and cleanest in the Mediterranean kilns and quays, largest and most compromised in the Ascent hoist yards and [[district.gilded-ascent-under-stair|the Under-Stair]], suppressed and vengeful in the Greatwood pitch yards, broken three times in the Arena City pens, present and cautious among the Sifting City crews, and entirely absent from the Sky City, where the lattice crews hold the strongest labour position on the continent and have no interest in sharing it.",
      relationNotes:
        "Believes it is opposed to [[faction.concord-of-weights|the Concord of Weights]] and is funded by it. Genuinely at war with [[faction.red-writ|the Red Writ]], which supplies the men who break the stoppages and has done three times in the pens. Broken twice by [[faction.pitchguard|the Pitchguard]], which reads its stewards' names at every spring muster and has both of them in the timber yards. Tolerated and quietly relieved of pressure by [[faction.conduit-college|the Conduit College]], which is rich enough to concede small things and proud enough to concede them slowly. Has clerks inside [[faction.bondwrights-hall|the Bondwrights' Hall]] registries, which is the best intelligence position anyone holds against the bond trade.",
      recruitment:
        "A coin a week and standing out once when it costs you. There is no vetting and cannot be, which is why the movement is so thoroughly infiltrated: Concord money, Hall informers, and at least one steward in the Ascent who reports. Players are recruited by being helped first. A hoist crew that carries an injured party member to a burial-fund surgeon has already made the introduction.",
      requiredSkills: ['skill.crowd-turning', 'skill.the-cold-read', 'skill.cable-and-drum'],
      crimes:
        "Combination, which is a crime in the Greatwood and on the Ashen Steppe and merely a nuisance elsewhere. Stopping a hoist. Blacking a cargo. Maintaining a blacklist, which four cities have tried to prosecute as extortion and none have made stick. And the quiet violence, which is not prosecuted because it is not reported, and which the movement's own stewards will tell you they are not proud of and will not tell you they have stopped.",
      questlineNotes:
        "The Ascent's third stoppage of the year is the live one: it has been bought off twice and the stewards may not be able to sell it a third time. A party that traces the strike fund's three friendly-society accounts holds a document that would split the movement in six cities, and the interesting question is what they do with it, because publishing it destroys the burial funds along with the leash. In the Greatwood, [[npc.vetla-torvik|Vetla Torvik]]'s sister and the two broken stewards are in the same timber yards.",
      repRewards: [
        row({ tier: 'Blacked', reward: 'No crew will work alongside you in six cities', note: 'Not violence. A wharf that empties when you walk onto it.' }),
        row({ tier: 'Unknown', reward: 'Nothing, and no hostility', note: 'The movement does not notice people. It notices trades.' }),
        row({ tier: 'Duespaying', reward: 'The burial fund, a surgeon, and the blacklist to read', note: 'The burial fund is a real mechanical benefit: it is medical care in a setting with no healing magic.' }),
        row({ tier: 'Called', reward: 'Strike pay, safe lodging in six cities, and four hundred people at six hours\' notice', note: 'The largest crowd any player faction can raise, and the most dangerous to aim.' }),
        row({ tier: 'Stewarded', reward: 'The power to call a stoppage and the blacklist pen', note: 'Stopping the Ascent hoists starves the upper terraces within a day. Use sparingly and price it.' }),
        row({ tier: 'Fund-holding', reward: 'Control of the strike fund and sight of where it comes from', note: 'Endgame, and the discovery is the reward: the party learns who has been paying for their movement.' }),
      ],
      currentPlans: [
        'Win the third Ascent stoppage outright rather than settling it, which the fund-holders have not agreed to.',
        'Get the roof rule extended from the pitch yards to the hoist sheds.',
        'Find out why the Mediterranean chapter keeps winning and the Ascent chapter keeps settling.',
        'Get two stewards out of the Greatwood timber yards before the spring muster reads their names again.',
        'Organise the Sifting City pan crews, which no chapter has yet survived attempting.',
      ],
      history:
        "The Standing Hour lasted nine hours. Every cable in the Gilded Ascent stopped at the same moment on a working morning, the upper terraces went without grain by evening, and the Concord conceded a burial fund and a cable-inspection rule by nightfall. The clapper came out of the bell the following week. Two generations of labour politics on this continent are an argument about whether nine hours was a victory or the moment the movement learned to accept an offer.",
      devNotes:
        PROPOSAL('The steward structure, the chapter-by-chapter differences, the three friendly-society accounts and the quiet violence are proposed. The Concord-funded strike fund is the manifest hook.') +
        '\n\nDESIGN INTENT: the only faction a party can join for uncomplicatedly good reasons, and the one whose secret hurts most. Write its ordinary work with respect. Burial funds, roof rules and cable inspections are what it has actually won, and they are not small.',
    },
  }),

  /* ================================================================ */
  /* THE BONEWAX POST                                                  */
  /* ================================================================ */

  E({
    id: 'faction.bonewax-post',
    type: 'faction',
    name: 'The Bonewax Post',
    aka: ['The Post', 'The Seal'],
    status: 'draft',
    summary: 'Sealed couriers trusted in all thirteen settlements, and the only outfit every gate and mast lets through; it copies everything it carries.',
    tags: ['guild', 'couriers', 'intelligence', 'multi-city'],
    accent: '#5a5a52',
    fields: {
      overview:
        "The only institution on the continent with standing everywhere. A Bonewax courier passes the Weir Gates unbooked, the Sky City masts unweighed, the Greatwood palisade after dark, the pole-boats of the Drown unasked, and the shut gate at [[city.oruvai|Oruvai]], which nothing else does. That standing is the Post's entire capital and it has spent two centuries not spending it.\n\nThe visible business is simple: a sealed letter, a stated route, a stated day, and a seal of black wax over bone ash that cannot be lifted and reset. The Post carries no cargo, takes no passengers, and has refused, on the record, to carry money, contraband, warrants and once an entire city's grain requisition.\n\nIt is also the largest intelligence operation in the world, and it does not think of itself that way.",
      factionType: 'Guild',
      scale: 'About 700 sworn couriers and 400 sorting clerks; a house in every one of the thirteen settlements',
      founded: TBD('The Post claims a founding older than the Concord and produces, as evidence, a route. Is the claim true, and does it matter to anyone but the Post?'),
      ideology:
        "A letter that arrives is worth more than an army that does not. The Post's doctrine is neutrality practised as an absolute: it does not choose sides, does not carry for one party against another, and has expelled its own couriers for reading a seal aloud. Every courier can recite the three refusals. The doctrine is real and the couriers believe it, which is what makes the sorting houses possible.",
      creed: 'Sealed, carried, delivered. Nothing else.',
      publicIdentity:
        "A courier guild with an unbroken record. It publishes its routes and its days, it pays out on a lost letter at a stated rate, and it has never once been shown to have opened a seal in transit, because it does not open them in transit. Couriers are unarmed by rule, wear grey, and are the only travellers on the continent who can walk into a war and out the other side. Every city grants the exemption for the same reason: the alternative is not knowing anything.",
      publicFace: 'A grey courier at the gate, unarmed, and the black wax seal itself',
      hiddenAgenda:
        "The Post copies every sealed letter it carries and sells the continent's private business by subscription. The copying happens in the sorting houses, not on the road, which is how the doctrine survives contact with the practice: the courier genuinely has never opened a seal, and the clerk who opens it is not a courier. Seals are lifted, copied and re-struck with bone-ash wax from the same dies that made the original, which is the actual trade secret and the reason nobody has caught them.\n\nSubscriptions are priced by category rather than by target and are held by [[faction.concord-of-weights|the Concord]], [[faction.mooring-assize|the Mooring Assize]], [[faction.fetterhouse|the Fetterhouse]], [[faction.conduit-college|the Conduit College]] and, under three separate names, [[faction.low-tally|the Low Tally]]. The Post therefore knows what every faction in this file is doing, sells that knowledge to five of them, and remains the only body all thirteen settlements trust.",
      leadership:
        "A guild of sorting houses, one house one vote, under a Master of Seals who is elected for life and who is by long custom a former courier rather than a clerk. The couriers and the clerks are separate professions with separate oaths and separate halls, and the separation is the institution's central safeguard and its central lie.",
      leaderTitle: 'Master of Seals',
      ranks: [
        row({ rank: 'Sorter', req: 'A clerk\'s hand and an oath never to leave the house', grants: 'Wages, a bench, and the part of the work nobody outside has ever seen' }),
        row({ rank: 'Runner', req: 'A short route walked clean for a season', grants: 'Grey, the exemption at gates, and no weapon' }),
        row({ rank: 'Courier', req: 'The three refusals recited and [[skill.the-far-walk|The Far Walk]]', grants: 'A long route, the seal exemption in all thirteen settlements' }),
        row({ rank: 'Seal-cutter', req: 'A hand that can re-strike a die so a maker would not know it', grants: 'The trade secret; you do not leave the house again' }),
        row({ rank: 'House master', req: 'A sorting house that has never lost a letter', grants: 'A vote, and the subscription book for your house' }),
        row({ rank: 'Master of Seals', req: 'Election for life, by custom from among former couriers', grants: 'Every subscription in the guild, and the only complete picture of the continent that exists' }),
      ],
      resources:
        "Standing in thirteen settlements, which cannot be bought and can only be spent once. Sorting houses in all of them, the largest on the fifth terrace of the Gilded Ascent, through which every private letter in the basin passes. The seal dies. Routes that are the only reliable overland schedules on the continent, including the ones across the Cinder Waste margin and up the Mistfall approach. And the subscription book, which is the single most valuable document in this file.",
      controlledMaterials: TBD('Bone-ash wax and the seal dies are the Post\'s one physical monopoly. Should the wax be a material entry with a chokehold attached, or does that make the secret too easy to attack?'),
      headquarters:
        "The mother house is wherever the Master of Seals is, which is deliberately unfixed. The working centre is the fifth-terrace sorting house in [[city.gilded-ascent|the Gilded Ascent]], four floors, no windows above the second, and a cutting room that has no door onto the street. There is a sealed box on the Compact hall raft in [[district.floating-swamp-settlement-the-stone-lots|the Stone Lots]], another at [[district.black-weir-the-toll-house|the Toll House]], another inside [[district.oruvai-the-shut-gate|the shut gate]] at Oruvai, and one in [[district.keth-veyra-the-manifest-house|the Manifest House]] at Keth Veyra.",
      territory:
        "Routes and boxes, in every settlement including the three nobody has written. The Post is the only faction with a presence in [[city.orath|Orath]], [[city.oruvai|Oruvai]] and [[city.keth-veyra|Keth Veyra]], and in the latter two that presence is currently the only established fact about how either town treats an institution at all. It holds no ground and would refuse it if offered.",
      relationNotes:
        "Trusted by everyone and honest with no one. Sells subscriptions to five of the factions in this file and carries correspondence for all fourteen, including [[faction.standing-hour|the Standing Hour]]'s inter-chapter letters, whose couriers are not told what they are carrying and whose contents are on the subscription list. [[faction.iron-sluice-company|The Iron Sluice Company]] has quietly wondered for years what its own standing exemption costs it, and is right to. The one relationship the Post genuinely values is with nobody: its whole position depends on being the party that never takes a side, and the day a subscription is proved is the day thirteen gates close at once.",
      recruitment:
        "Two doors, and you are told which one you are going through. Couriers are recruited for legs, memory and a temperament that does not ask, and are genuinely never shown the cutting room. Clerks are recruited for hands and an oath never to leave the house, which is enforced by wages high enough that leaving is a demotion. Players who join as couriers can work for the Post for years and find out nothing, which is the design.",
      requiredSkills: ['skill.the-far-walk', 'skill.plain-letters', 'skill.quiet-ground', 'skill.weather-eye'],
      crimes:
        "Against the Post: breaking a seal, impersonating a courier, and interfering with a carry, all of which every city prosecutes on the Post's behalf without needing to be asked. By the Post: the copying itself, which has no name in any statute because no legislature has ever imagined it, and which would be prosecuted as thirteen separate treasons the moment it was proved.",
      questlineNotes:
        "The Post is the setting's delivery mechanism for information the party should not have, and its price is always a carry. A courier route is a ready-made travel quest with a hard schedule, a sealed object and no permitted questions. The campaign-scale item is the subscription book: proving it burns the only neutral institution on the continent, and every faction that loses a courier route because of it will correctly blame the party. [[npc.ismet-radva|Ismet Radva]] is a name on three manifests and is the investigation that runs closest to how the Post's re-struck seals actually work.",
      repRewards: [
        row({ tier: 'Refused', reward: 'The Post will not carry for you, anywhere, ever', note: 'It has never reversed a refusal. In a world with no other reliable communication, this is severe.' }),
        row({ tier: 'Customer', reward: 'Sealed carriage at the posted rate on the posted day', note: 'Available to anyone with the fee, including people the whole world is hunting.' }),
        row({ tier: 'Trusted', reward: 'Priority carriage, poste restante in thirteen settlements, and route advice', note: 'Route advice from the Post is the best travel information available anywhere.' }),
        row({ tier: 'Greyed', reward: 'A courier\'s grey and the gate exemption', note: 'The single most useful traversal reward in the setting. Also unarmed, by rule, in every scene.' }),
        row({ tier: 'Sworn courier', reward: 'A long route, standing in all thirteen, and the three refusals', note: 'Includes access to Orath, Oruvai and Keth Veyra that no other faction can offer.' }),
        row({ tier: 'House-held', reward: 'A sorting house, a vote, and that house\'s subscription book', note: 'Endgame, and the moment the party learns what they have been carrying for.' }),
      ],
      currentPlans: [
        'Keep the cutting rooms and the courier halls in separate buildings in all thirteen settlements.',
        'Price a new subscription category covering ward-licence correspondence, which four buyers have asked for.',
        'Work out why the same name is clearing cargo at two ports eleven days apart, before a subscriber asks.',
        'Restore the Mistfall approach schedule, which has been unreliable since four bells went silent.',
        'Refuse, for the ninth time, every offer to carry money.',
      ],
      history:
        "The Post's founding story is a route rather than a person: a run across the Cinder Waste margin that was completed when it should not have been, by someone whose name the guild does not preserve and whose letters arrived. Every exemption it holds was granted separately, by a different authority, for the same reason, and the guild's institutional memory consists almost entirely of the occasions on which it refused something valuable. It tells those stories constantly. They are all true, and they are all told by people who employ the cutting rooms.",
      devNotes:
        PROPOSAL('The courier and clerk separation, the seal dies, the subscription categories and the exemption in all thirteen settlements are proposed. The copying is the manifest hook.') +
        '\n\nMAP PLACEHOLDER, needs a decision: this module assigns the Post `controls` over Oruvai and Keth Veyra purely so the political layer has a value for them. That is not a claim that the Post governs either town. It is the only chartered body either place is established to deal with, and both edges should be struck the moment those cities are properly written.\n\nDESIGN INTENT: the Post is how a GM hands out information without a divination spell, and its secret is the best long-fuse reveal in the file because the party will have used the Post happily for a hundred sessions first.',
    },
  }),

  /* ================================================================ */
  /* THE PALE ASSAY                                                    */
  /* ================================================================ */

  E({
    id: 'faction.pale-assay',
    type: 'faction',
    name: 'The Pale Assay',
    aka: ['The Assay', 'The Six Cuts'],
    status: 'draft',
    summary: 'Certifies mineral purity in the Sifting City and stamps what a find is worth before it leaves the Pans; one grade has been a lie for eleven years.',
    tags: ['guild', 'assay', 'minerals', 'harsh'],
    accent: '#a89a7c',
    fields: {
      overview:
        "The government of [[city.sifting-city|the Sifting City]] in the only sense that matters. The Assay grades everything the [[region.white-pans|White Pans]] produce into six cuts before it may leave, and the difference between a fourth cut and a fifth cut card on the same barrel is roughly a year of a crew's wages. The stamp, not the salt, is what a buyer pays for.\n\nIts formal position is narrower: it holds the Tower Bench's assay warrant, keeps [[landmark.the-cut-house|the Cut House]] with its six hardened punches in a bolted rack, and licenses the nine sifting towers. In practice it decides who is rich, who is indentured, and which crews chase the sixth cut, which costs forty casks of extra wash and comes out of somebody's ration.\n\nIt guards the die room better than it guards its own money, and correctly.",
      factionType: 'Guild',
      scale: 'Nine licensed towers, one bench, about 60 assayers and 400 tower guards under Assay warrant',
      founded: 'The six cuts are older than the present towers and nobody has successfully proposed a seventh',
      ideology:
        "A grade is a promise about a barrel, and a promise about a barrel is the only thing standing between the Pans and being paid in guesses. The Assay's honest case is strong: before the six cuts, a crew sold a season's work to whoever lied best, and the towers exist because the grade made forward buying possible. Its dishonest case is the same sentence with the emphasis moved, because whoever defines the grade defines the wage.",
      creed: 'Six cuts, one hand, one stamp.',
      publicIdentity:
        "A certifying guild under warrant, publishing its grade definitions, testing on demand, and standing behind every card it issues from here to the Meridian Coast. Assayers are examined, bonded and personally liable for their stamps. The guild prosecutes false carding harder than theft and has, twice in memory, condemned a whole season's output of a tower whose master was a bench member. Both cases are cited constantly.",
      publicFace: '[[npc.tazrit-nourem|Tazrit n\'Ourem]], sift-mistress of three towers, and the grade card on every barrel',
      hiddenAgenda:
        "One fraction has been undergraded for eleven years. A soft white marl that comes up with the bittern in the deep pans has been carded as fifth cut waste, fit for road metal, bought from the crews at waste prices, and stockpiled in a walled yard nobody has any reason to visit.\n\nIt is ward-grade. It holds a drawn line as well as anything out of the Magic City's kilns, and the crated Magic City [[material.ward-chalk|ward chalk]] that [[npc.sahat-belek|Sahat Belek]] found in the deep pans, stamped and hundreds of kilometres off any sanctioned route, is a control sample sent out to prove it. [[faction.fetterhouse|The Fetterhouse]] has known for two years and has said nothing, because the alternative supply is the annual cut from [[deposit.ward-marls|the Ward Marls]] under the Anvil Shelf, bought years forward at a price the Magic City cannot get out of.\n\nIf the pale marl is ever carded honestly, [[faction.mooring-assize|the Mooring Assize]]'s forward contract becomes worthless, several hundred pan crews discover they were paid nothing for eleven years of a strategic mineral, and the Assay's six cuts stop meaning anything at all.",
      leadership:
        "The Tower Bench, one vote per licensed tower, with the Assay warrant held by the guild rather than the bench and exercised by a Master Assayer elected by the examined assayers. That split is the constitutional oddity of the Sifting City: the towers own the production and the guild owns the grade, and the two bodies have to agree, which they do, because five of the nine tower masters are also bonded assayers.",
      leaderTitle: 'Master Assayer of the Cut House',
      ranks: [
        row({ rank: 'Pan crew', req: 'A rake, a ration and usually a debt', grants: 'Wages partly in draw, and a lung that lasts about eleven years' }),
        row({ rank: 'Screen hand', req: '[[skill.sieve-tuning|Sieve Tuning]] and a tower that will take you', grants: 'Indoor work, better water, and a share of the sixth cut when it runs' }),
        row({ rank: 'Carder', req: 'Examination on the six cuts and a bond lodged against your stamp', grants: 'An [[item.assayers-tray|assayer\'s tray]] and the right to card a barrel' }),
        row({ rank: 'Bonded assayer', req: '[[skill.proof-marking|Proof Marking]] to guild proof and five years of clean cards', grants: 'Your own die-struck mark, and personal liability wherever the barrel goes' }),
        row({ rank: 'Tower master', req: 'One of nine licences, held by inheritance or by a purchase nobody survives twice', grants: 'A bench vote, a tower, and the debt papers of everyone in it' }),
        row({ rank: 'Master Assayer', req: 'Election by the examined assayers', grants: 'The Cut House keys, the six punches, and the power to define a grade' }),
      ],
      resources:
        "[[landmark.the-cut-house|The Cut House]] and the six hardened punches, which are the entire price structure of the trade. Nine licensed towers and [[machine.the-sieve-cascade|the Sieve Cascade]]. [[deposit.nitre-flats|The Nitre Flats]] and [[deposit.blackfall-drifts|the Blackfall Drifts]]. Three licensed crucible sheds whose inheritance-only licences reduce [[material.blackfall-sand|blackfall sand]] to [[material.blackfall-button|button]], and therefore every wire-drawing die on the continent. Four hundred tower guards under Assay warrant and no separate watch. The pale marl yard. And physical indenture papers on roughly a third of the pan crews, in one strongroom under a middle tower.",
      controlledMaterials: ['material.pan-nitre', 'material.blackfall-sand', 'material.blackfall-button'],
      headquarters:
        "[[district.sifting-city-assay-row|Assay Row]]: eleven grading halls in a single scoured street with the die room at the western end and the strongrooms behind. The Bondwrights keep their branch on the same street, which nobody planned and everybody understands. The pale marl yard is not on the Row and is not on any tower plan.",
      territory:
        "The Pans, by warrant rather than by occupation. The Assay does not patrol forty square miles of crust; it does not have to, because nothing leaves the White Pans without a card and a card is only issued in one street. Its reach outward is the card itself, honoured from the Ascent to the Meridian Coast, and its one physical outpost beyond the towers is a walled yard in the deep pans that appears on no plan.",
      relationNotes:
        "Resents [[faction.concord-of-weights|the Concord of Weights]] permanently, because the grade stamp is priced in the Ascent rather than in the Pans, and is nonetheless in the Concord's debt for the bore programme that supplies the city's water. Sells the finest cut to [[faction.conduit-college|the Conduit College]], whose [[material.clearcast-glass|clearcast glass]] is ruined by one adulterated barrel, which makes the Assay's grading fraud a Mediterranean problem. Shares Assay Row with [[faction.bondwrights-hall|the Bondwrights' Hall]], which holds the tower households as clients and debtors at once. Loses unsealed nitre and ungraded button to [[faction.low-tally|the Low Tally]] through the Outbound Yard. And is secretly two years into an arrangement with [[faction.fetterhouse|the Fetterhouse]] that would ruin [[faction.mooring-assize|the Mooring Assize]] if it were carded honestly.",
      recruitment:
        "The pans take anyone and the Row takes almost nobody. A crew hand can rise to screen hand on skill alone, and the step from screen hand to carder is an examination that is genuinely open and genuinely hard. Past that it is bonds and inheritance. Players will meet the Assay first as the body that decides what their find is worth, which is the correct introduction: the faction should be experienced as a price before it is experienced as people.",
      requiredSkills: ['skill.sieve-tuning', 'skill.proof-marking', 'skill.heat-reading', 'skill.charge-blending'],
      crimes:
        "False carding, prosecuted harder than theft and the reason the guild is trusted. Removing sift from the Pans uncarded. Cutting a die, which is a capital matter and the entire reason the die room is guarded better than the money. Working a crust the towers have not licensed. And the practice that is not a crime and should be: paying a crew in draw against a ration, which is how [[npc.tazrit-nourem|Tazrit n'Ourem]] came to hold papers on a third of the pans.",
      questlineNotes:
        "[[quest.pan-fever|Pan Fever]] is the investigation: crews are wasting on a fraction the towers sell at premium, the company can retool, pay off or discredit the party, and the price list is the real antagonist. [[npc.sahat-belek|Sahat Belek]] will guide a party to the ward-chalk cache in exchange for passage papers for himself and his daughter, and that cache is the loose thread on the pale marl. [[npc.tazrit-nourem|Tazrit n'Ourem]]'s strongroom is the moral one: burning the papers frees several hundred people and starts an immediate fight about who feeds them, which is precisely the argument she uses to justify holding them.",
      repRewards: [
        row({ tier: 'Uncarded', reward: 'Nothing you dig may lawfully leave the Pans', note: 'Your ore is worth its weight in road metal, which is to say nothing.' }),
        row({ tier: 'Crewed', reward: 'A rake, a ration and a draw against it', note: 'Where the poorest start, and the mechanism by which they end up on the strongroom shelf.' }),
        row({ tier: 'Screened', reward: 'Tower work, better water, and a share when the sixth cut runs', note: 'The first tier where the party is inside the extraction economy rather than under it.' }),
        row({ tier: 'Carding', reward: 'An assayer\'s tray and the right to card a barrel', note: 'The party can now decide what somebody else\'s season was worth, which is the whole faction in one action.' }),
        row({ tier: 'Bonded', reward: 'A die-struck mark honoured from the Pans to the coast', note: 'A stamped barrel sells anywhere. So does a false one, once.' }),
        row({ tier: 'Bench-held', reward: 'A tower, a vote, and the Cut House keys within reach', note: 'Endgame. A party with the punches can define a seventh cut, which is how the pale marl finally gets a name.' }),
      ],
      currentPlans: [
        'Keep the pale marl carded as fifth cut for a twelfth year and finish walling the yard.',
        'Settle with the Fetterhouse on price before the Mooring Assize renews its forward contract.',
        'Explain, to anyone who asks, the crated Magic City ward chalk in the deep pans, and find out who else Sahat Belek has told.',
        'Stop the Outbound Yard leak without stamping drover carts, which would admit the leak exists.',
        'Refuse the Concord\'s offer to price the grade in the Ascent for the fortieth consecutive year.',
      ],
      history:
        "The six cuts were fixed after a season in which three towers sold the same fraction at three prices and the buyers stopped coming. The Assay was warranted to end that, and it did, inside two years. Everything since has been the slow discovery that a body empowered to define worth will eventually define it in its own favour, and the eleven-year undergrading of the pale marl is simply the largest instance rather than the first.",
      devNotes:
        PROPOSAL('The Tower Bench and Assay warrant split, the six cuts, and the pale marl are proposed. The manifest hook is "undergraded one mineral for years and quietly stockpiled it"; identifying that mineral as a ward-grade marl is the load-bearing invention here.') +
        '\n\nWHY THE PALE MARL: it explains the crated Magic City ward chalk that cities-wild.ts already places in the deep White Pans, it does not contradict the canon that the Brine Sinks are the source of all levin salt, and it wires four factions into one collision. The Mooring Assize sells the Fetterhouse ward marl years forward; the Fetterhouse has quietly found a cheaper bed; the Pale Assay has been paying pan crews nothing for it for eleven years. Any one of the three can be made to detonate the other two.',
    },
  }),
]

/* ================================================================== */
/* RELATIONS                                                           */
/*                                                                     */
/* Three layers, in order:                                             */
/*   1. Faction to settlement. These `controls` and `contests` edges    */
/*      are not decoration: the atlas computes the political-influence  */
/*      and faction-territory layers from them at render time, so       */
/*      changing a line here redraws the political map. All thirteen    */
/*      settlements have exactly one holder; several have a second      */
/*      claimant, which draws the territory hull dashed.                */
/*   2. Faction to place, deposit and region: seats, works, holdings.   */
/*   3. Faction to faction: the web the relationship matrix is built    */
/*      from. Covert ties carry `secret: true`.                         */
/* ================================================================== */

export const relations: SeedRelation[] = [
  /* ---------------------------------------------------------------- */
  /* 1. Political layer: who holds each settlement                     */
  /* ---------------------------------------------------------------- */

  R('faction.concord-of-weights', 'controls', CITY.gildedAscent, 'sets the weight, the tariff and the rate; the government in all but the word'),
  R('faction.mooring-assize', 'controls', CITY.skyCity, 'holds the lease roll and the tonnage register, which between them are the city'),
  R('faction.conduit-college', 'controls', CITY.mediterranean, 'licence, patent roll and conduit timetable, over a republic that holds everything else'),
  R('faction.pitchguard', 'controls', CITY.treeCity, 'martial law, and no civil court above the bole captains'),
  R('faction.mirror-assembly', 'controls', CITY.caveAgrarian, 'issues the light, and the light is the franchise'),
  R('faction.pale-assay', 'controls', CITY.siftingCity, 'nothing leaves the Pans without a card, and cards are cut in one street'),
  R('faction.fetterhouse', 'controls', CITY.magicCity, 'every licence, every mark, and the rota on the fault chains'),
  R('faction.red-writ', 'controls', CITY.arenaCity, 'the Ring Chamber votes by unexpired contract and the Writ holds most of it'),
  R('faction.moorstone-compact', 'controls', CITY.floatingSwamp, 'runs the draw, which in a town with no ground is the whole government'),
  R('faction.iron-sluice-company', 'controls', CITY.blackWeir, 'chartered keeper of the throat; the town is the payroll'),
  R('faction.red-writ', 'controls', CITY.orath, 'PLACEHOLDER: the only body with standing on the caravan ground is a recruiting bench that does not check what anyone signed'),
  R('faction.bonewax-post', 'controls', CITY.oruvai, 'PLACEHOLDER: the only institution the shut gate is established to admit'),
  R('faction.bonewax-post', 'controls', CITY.kethVeyra, 'PLACEHOLDER: the Post lands at the Manifest House like everywhere else, and nobody has identified who governs'),

  /* Contested. A second claimant with a real lever, a foothold or a debt. */

  R('faction.standing-hour', 'contests', CITY.gildedAscent, 'named for the hour every cable in this city stopped, and threatening a third stoppage'),
  R('faction.low-tally', 'contests', CITY.gildedAscent, 'four silted staiths that are unlawful to land at and therefore unweighed', true),
  R('faction.concord-of-weights', 'contests', CITY.skyCity, 'holds four fifths of its own reserve against counterweight leases; the creditor is the rival'),
  R('faction.bondwrights-hall', 'contests', CITY.mediterranean, 'litigating for recognition of bond paper in the harbour court, and losing every time'),
  R('faction.standing-hour', 'contests', CITY.treeCity, 'broken twice in the pitch yards; both stewards are in the timber yards now'),
  R('faction.pitchguard', 'contests', CITY.caveAgrarian, 'two survey parties south this year under a charcoal contract, counting road capacity and gallery depths', true),
  R('faction.bondwrights-hall', 'contests', CITY.siftingCity, 'the tower households are its clients and its debtors at once; foreclosure would hand it the Pans'),
  R('faction.mooring-assize', 'contests', CITY.magicCity, 'sells the ward marl forward and bids against the city for the Scar concession'),
  R('faction.standing-hour', 'contests', CITY.arenaCity, 'three attempts on the pens, three failures, one of them arranged by its own stewards'),
  R('faction.iron-sluice-company', 'contests', CITY.floatingSwamp, 'paying the elder in guaranteed sluice-time to drift the settlement into the toll reach', true),
  R('faction.low-tally', 'contests', CITY.blackWeir, 'the ullage trade through the tail, and gantry crews paid better than the Company pays them', true),
  R('faction.low-tally', 'contests', CITY.orath, 'a town with a schedule and no jurisdiction is the best address on the continent', true),
  R('faction.concord-of-weights', 'contests', CITY.oruvai, 'Ascent factors trying to become the first licensed presence, and not yet told no'),

  /* ---------------------------------------------------------------- */
  /* 2. Seats, works, deposits and regional holdings                   */
  /* ---------------------------------------------------------------- */

  R('faction.concord-of-weights', 'located_in', 'district.gilded-ascent-counting-terrace', 'the chamber, the rate board and forty-one benches'),
  R('faction.concord-of-weights', 'controls', 'landmark.the-brass-standard', 'three seals held by three houses who may not be in the room together'),
  R('faction.concord-of-weights', 'controls', 'landmark.the-counting-stair', 'the tread you sign on decides which court hears the default'),
  R('faction.concord-of-weights', 'controls', 'district.gilded-ascent-salt-office', 'licences, tariff and the indenture register'),
  R('faction.concord-of-weights', 'located_in', REGION.ascentBasin),
  R('faction.bondwrights-hall', 'located_in', 'district.gilded-ascent-bonded-vaults', 'fourth terrace, and the largest single employer of clerks in the city'),
  R('faction.low-tally', 'located_in', 'district.gilded-ascent-confluence-wharves', 'the silted staiths, where a scale that does not exist cannot be disputed', true),
  R('faction.standing-hour', 'located_in', 'district.gilded-ascent-under-stair', 'recruits in the third and fourth arches and drinks at the mouth of the sixth'),
  R('faction.standing-hour', 'related_to', 'landmark.the-stopped-bell', 'takes its name from the morning that bell was ringing'),
  R('faction.standing-hour', 'contests', 'district.gilded-ascent-hoist-yards', 'stopping the hoists starves the upper terraces inside a day'),

  R('faction.mooring-assize', 'controls', 'landmark.the-mooring-crown', 'the registry hall sits directly beneath it'),
  R('faction.mooring-assize', 'controls', 'landmark.the-load-roll', 'a drum in the floor of the registry hall, repainted weekly'),
  R('faction.mooring-assize', 'located_in', 'district.sky-city-crown-houses', 'lease roll, load roll and the survey series in one locked case'),
  R('faction.mooring-assize', 'controls', 'district.sky-city-mooring-ring', 'weighing is done in public, on principle'),
  R('faction.mooring-assize', 'controls', 'deposit.ward-marls', 'the annual cut, sold years forward to a city that cannot dig its own'),
  R('faction.mooring-assize', 'contests', 'district.sky-city-shelf-foot', 'buying ground here under other names, through factors paid not to ask', true),
  R('faction.mooring-assize', 'located_in', REGION.anvilShelf),

  R('faction.conduit-college', 'controls', 'landmark.the-tide-orrery', 'its instrument, its calendar and its blind spot'),
  R('faction.conduit-college', 'located_in', 'district.mediterranean-city-orrery-precinct', 'bench hall, timetable hall, and the indexed roll in the vault beneath'),
  R('faction.conduit-college', 'controls', 'district.mediterranean-city-conduit-yards', 'the timetable is the throttle on every advanced craft in the setting'),
  R('faction.conduit-college', 'controls', 'landmark.the-standing-aqueduct', 'the first patent on the roll is the siphon that replaced the one that failed'),
  R('faction.conduit-college', 'controls', 'deposit.ash-quarries', 'the ash is free to anyone with a shovel; the calcining kilns are not'),
  R('faction.conduit-college', 'located_in', REGION.meridianCoast),

  R('faction.pitchguard', 'controls', 'landmark.bastion-bole', 'muster hall, licence chamber, and a roll room with one door and no window'),
  R('faction.pitchguard', 'located_in', 'district.tree-city-crown-galleries', 'from the fourth gallery upward'),
  R('faction.pitchguard', 'controls', 'district.tree-city-ninth-gallery', 'the gate that makes up the shortfall on the spring levy'),
  R('faction.pitchguard', 'controls', 'deposit.standing-fifty', 'guarded rather than owned, and the pretext for every extension of the patrol range'),
  R('faction.pitchguard', 'controls', REGION.greatwood, 'licences every cut inside the palisade and patrols the outwood by reprisal'),

  R('faction.mirror-assembly', 'controls', 'landmark.sunwell-shaft', 'two hundred ducts, and the first one off the main lights the session hall'),
  R('faction.mirror-assembly', 'located_in', 'district.cave-agrarian-city-mirror-quarter', 'session hall, share roll and the reeves\' returns'),
  R('faction.mirror-assembly', 'controls', 'district.cave-agrarian-city-deep-rota', 'not brought to a vote in nine years', true),
  R('faction.mirror-assembly', 'controls', 'deposit.lantern-beds', 'cleaved at the face by hand, silvered above ground, and the silvering kills'),
  R('faction.mirror-assembly', 'located_in', REGION.hollowKarst),

  R('faction.pale-assay', 'controls', 'landmark.the-cut-house', 'six hardened punches in a bolted rack, guarded better than the money'),
  R('faction.pale-assay', 'located_in', 'district.sifting-city-assay-row', 'eleven grading halls, the die room at the western end, strongrooms behind'),
  R('faction.pale-assay', 'controls', 'deposit.nitre-flats', 'raked, dried and graded before a barrel may leave the Pans'),
  R('faction.pale-assay', 'controls', 'deposit.blackfall-drifts', 'three licensed crucible sheds, and the licences pass only by inheritance'),
  R('faction.pale-assay', 'controls', REGION.whitePans, 'by warrant rather than by occupation; the grade card is the perimeter'),

  R('faction.fetterhouse', 'controls', 'landmark.the-bound-fault', 'nine chains, held on a rota of who burns next'),
  R('faction.fetterhouse', 'controls', 'landmark.the-ninth-chain', 'the section the roll will not name a caster for'),
  R('faction.fetterhouse', 'located_in', 'district.magic-city-chainhouse-ward', 'rota board, licence roll, permit office and cells, all one function'),
  R('faction.fetterhouse', 'controls', 'district.magic-city-salt-vats', 'weighed, sealed and taxed by the grain before it crosses the ward line'),
  R('faction.fetterhouse', 'controls', 'deposit.cold-quarter', 'sawn wet, in winter, in pairs, and paid by the block that does not shatter'),
  R('faction.fetterhouse', 'controls', 'deposit.brine-sinks', 'drawn under ward; unsealed salt is contraband even where salt is legal'),
  R('faction.fetterhouse', 'located_in', REGION.aethericScar),

  R('faction.red-writ', 'controls', 'landmark.the-sunken-ring', 'the card, the gate, and the contract vault three floors under the sand'),
  R('faction.red-writ', 'located_in', 'district.arena-city-writ-court', 'the reading room, opposite the Chamber hall and the bond registry'),
  R('faction.red-writ', 'controls', 'district.arena-city-the-under-stands', 'the pens, the retorts and the claim ledger'),
  R('faction.red-writ', 'located_in', 'district.orath-caravan-ground', 'recruiters who do not check what anyone signed'),
  R('faction.red-writ', 'controls', 'deposit.moult-fields', 'buys the whole six-week take and asks nothing about the crews'),
  R('faction.red-writ', 'located_in', REGION.ashenSteppe),

  R('faction.iron-sluice-company', 'controls', 'landmark.the-weir-gates', 'fourteen worked gates, five chained open since the flood, three bricked'),
  R('faction.iron-sluice-company', 'located_in', 'district.black-weir-the-gate-works', 'the sluice-master sleeps in the same room as the book'),
  R('faction.iron-sluice-company', 'controls', 'district.black-weir-the-toll-house', 'the schedule board and the gate fees'),
  R('faction.iron-sluice-company', 'controls', 'deposit.bloom-cuts', 'tolled at the weir before a raft ever reaches a furnace'),
  R('faction.iron-sluice-company', 'controls', REGION.theDrown, 'holds the throat, and therefore prices everything above it and below it'),

  R('faction.moorstone-compact', 'controls', 'landmark.the-moorstone', 'the deed chest, the chain, and the only fixed address in the settlement'),
  R('faction.moorstone-compact', 'controls', 'landmark.the-lot-board', 'the draw is held in the open, and the board is why that matters'),
  R('faction.moorstone-compact', 'located_in', 'district.floating-swamp-settlement-the-stone-lots', 'the Compact hall raft, chained to the stone'),
  R('faction.moorstone-compact', 'controls', 'deposit.canebrakes', 'cut in winter and floated out, if the gates are open'),

  R('faction.bonewax-post', 'located_in', CITY.gildedAscent, 'the fifth-terrace sorting house: four floors, no windows above the second, and a cutting room with no street door'),
  R('faction.bonewax-post', 'located_in', 'district.keth-veyra-the-manifest-house', 'a sealed box, and the only established institution on the quay'),
  R('faction.bonewax-post', 'located_in', 'district.oruvai-the-shut-gate', 'passed through the gate, which nothing else is'),
  R('faction.bonewax-post', 'located_in', 'district.black-weir-the-toll-house', 'the one standing exception in the sluice book'),
  R('faction.bonewax-post', 'located_in', 'district.floating-swamp-settlement-the-stone-lots', 'a sealed box on the Compact hall raft; the pole-boats wave it through'),
  R('faction.bonewax-post', 'located_in', REGION.mistfallCoast, 'the northern relay, and the schedule that has been unreliable since four bells went silent'),

  R('faction.low-tally', 'located_in', 'district.sifting-city-the-outbound-yard', 'unsealed nitre and ungraded button, out on drover carts', true),
  R('faction.low-tally', 'infiltrates', CITY.floatingSwamp, 'three lots held under tenants\' names', true),
  R('faction.low-tally', 'contests', 'landmark.the-eleventh-sluice', 'a disused bay workable only in the slack hour between scheduled openings', true),
  R('faction.low-tally', 'located_in', REGION.theDrown, 'the comb channels, which the Weir cannot count'),
  R('faction.bondwrights-hall', 'located_in', 'district.sifting-city-assay-row', 'a strongroom branch on the same street as the die room'),
  R('faction.bondwrights-hall', 'located_in', 'district.arena-city-writ-court', 'the respectable half of the same trade, one door along'),
  R('faction.bondwrights-hall', 'located_in', CITY.skyCity, 'allowance labour, where a right to remain is the collateral'),
  R('faction.standing-hour', 'located_in', CITY.mediterranean, 'its least corrupted chapter, in the kilns and on the quays'),
  R('faction.standing-hour', 'located_in', CITY.siftingCity, 'present and cautious among the pan crews'),

  /* ---------------------------------------------------------------- */
  /* 3. The web: faction to faction                                    */
  /* ---------------------------------------------------------------- */

  /* The credit axis: paper, bonds and the leash on labour */
  R('faction.concord-of-weights', 'allied_with', 'faction.bondwrights-hall', 'the Concord\'s judgments manufacture the Hall\'s inventory; neither survives the other'),
  R('faction.concord-of-weights', 'trades_with', 'faction.red-writ', 'three retained companies on standing contract, quartered below the fourth terrace'),
  R('faction.concord-of-weights', 'secretly_cooperates_with', 'faction.standing-hour', 'the strike fund, through three friendly-society accounts and two sympathetic houses', true),
  R('faction.concord-of-weights', 'infiltrates', 'faction.standing-hour', 'at least one Ascent steward reports, and the fund-holders are not told which', true),
  R('faction.concord-of-weights', 'owes_debt_to', 'faction.mooring-assize', 'four fifths of the clearing reserve sits in counterweight leases it cannot call'),
  R('faction.mooring-assize', 'owes_debt_to', 'faction.concord-of-weights', 'the Ring eats, drinks and chalks on Ascent paper; each believes it owns the other'),
  R('faction.concord-of-weights', 'rival_of', 'faction.conduit-college', 'thirty years of asking the harbour to honour indenture paper, and thirty refusals'),
  R('faction.concord-of-weights', 'rival_of', 'faction.pale-assay', 'the grade stamp is priced on the Stair rather than in the Pans, which the Pans have never forgiven'),
  R('faction.concord-of-weights', 'trades_with', 'faction.pale-assay', 'financed the bore programme and holds the paper on a desert city\'s water'),
  R('faction.concord-of-weights', 'trades_with', 'faction.mirror-assembly', 'grain down the Karst Fork against advances on next year\'s light allocation'),
  R('faction.mirror-assembly', 'owes_debt_to', 'faction.concord-of-weights', 'the Ascent is the karst\'s largest creditor and has never once asked for a vote'),
  R('faction.pitchguard', 'owes_debt_to', 'faction.concord-of-weights', 'grain advances against next season\'s felling licences'),

  /* The bond trade, written from both ends */
  R('faction.bondwrights-hall', 'allied_with', 'faction.red-writ', 'the same trade from opposite ends: allies in fact, competitors in the paper market'),
  R('faction.bondwrights-hall', 'secretly_cooperates_with', 'faction.low-tally', 'transferred bonds laundered through the registries by clerks who have not been told what a crewed passage is', true),
  R('faction.bondwrights-hall', 'secretly_cooperates_with', 'faction.conduit-college', 'eleven years of payments to the patent bench to keep three labour-saving designs off the roll', true),
  R('faction.bondwrights-hall', 'rival_of', 'faction.conduit-college', 'publicly: bonds are void in the harbour and the presenter is the one charged'),
  R('faction.bondwrights-hall', 'rival_of', 'faction.mirror-assembly', 'refused three times over the deep-gallery arrears, because selling them means admitting they exist'),
  R('faction.bondwrights-hall', 'trades_with', 'faction.pitchguard', 'buys timber-yard ledgers downriver without holding an office in the Greatwood'),
  R('faction.bondwrights-hall', 'trades_with', 'faction.pale-assay', 'the tower households are clients and debtors on the same street'),
  R('faction.bondwrights-hall', 'trades_with', 'faction.mooring-assize', 'allowance labour: a right to remain tied to an employer is most of the way to a bond'),

  /* Labour, and what happens to it */
  R('faction.standing-hour', 'infiltrates', 'faction.bondwrights-hall', 'clerks in two registries, and the best intelligence position anyone holds against the bond trade', true),
  R('faction.red-writ', 'at_war_with', 'faction.standing-hour', 'the Writ supplies the men who break the stoppages, and has three times in the pens'),
  R('faction.pitchguard', 'rival_of', 'faction.standing-hour', 'broken twice in the pitch yards; the stewards\' names are read at every spring muster'),
  R('faction.standing-hour', 'truce_with', 'faction.conduit-college', 'legal here as a friendly society; the College concedes small things and concedes them slowly'),
  R('faction.standing-hour', 'rival_of', 'faction.pale-assay', 'no chapter has yet survived trying to organise the pan crews'),

  /* The Scar concession: three bidders and one supply chain */
  R('faction.mooring-assize', 'trades_with', 'faction.fetterhouse', 'the annual ward-marl cut, sold years forward, which is a debt as much as a sale'),
  R('faction.fetterhouse', 'owes_debt_to', 'faction.mooring-assize', 'forward payment on marl the Magic City cannot dig itself'),
  R('faction.mooring-assize', 'rival_of', 'faction.fetterhouse', 'both bidding the concession while one of them supplies the other'),
  R('faction.concord-of-weights', 'rival_of', 'faction.fetterhouse', 'the concession is auctioned on the Stair, and the Concord would rather hold it than clear it'),
  R('faction.mooring-assize', 'rival_of', 'faction.concord-of-weights', 'two bidders who are also each other\'s solvency'),
  R('faction.pale-assay', 'secretly_cooperates_with', 'faction.fetterhouse', 'two years of trials on a pale marl carded as fifth cut waste; the crated chalk in the deep pans is the control sample', true),
  R('faction.pale-assay', 'rival_of', 'faction.mooring-assize', 'both sell the Magic City the same thing, and only one of them knows it', true),
  R('faction.fetterhouse', 'rival_of', 'faction.conduit-college', 'two licensing bodies with incompatible theories of who may be trusted with a number'),
  R('faction.fetterhouse', 'trades_with', 'faction.concord-of-weights', 'licensed ward chalk clears through the Ascent, stick by logged stick'),

  /* The water: weir, rafts and everything downstream */
  R('faction.iron-sluice-company', 'at_war_with', 'faction.low-tally', 'ullage crews are named and hanged at the sluices'),
  R('faction.low-tally', 'smuggles_with', 'faction.iron-sluice-company', 'gantry crews paid better by the second ledger than by their own Company', true),
  R('faction.iron-sluice-company', 'rival_of', 'faction.moorstone-compact', 'publicly, over the last untaxed town on the eastern water'),
  R('faction.iron-sluice-company', 'secretly_cooperates_with', 'faction.moorstone-compact', 'sells release warnings the Compact resells downstream and books as mooring fees', true),
  R('faction.moorstone-compact', 'owes_debt_to', 'faction.iron-sluice-company', 'every hour of slack water the settlement gets is bought'),
  R('faction.low-tally', 'truce_with', 'faction.moorstone-compact', 'three lots under tenants\' names, and nobody at the stone asks whose'),
  R('faction.iron-sluice-company', 'trades_with', 'faction.pitchguard', 'stamped merchant bar; the Greatwood cannot arm a redoubt without it'),
  R('faction.mooring-assize', 'trades_with', 'faction.pitchguard', 'laid lattice cable, for the same reason'),
  R('faction.pitchguard', 'trades_with', 'faction.conduit-college', 'Greatwood charcoal for the Verdigris Hearth; a blockade stops the coast smelting inside a month'),
  R('faction.mirror-assembly', 'trades_with', 'faction.conduit-college', 'quicksilver and tin for the duct resilvering, which makes the karst\'s food supply hostage to a foreign licence'),

  /* The second ledger, everywhere at once */
  R('faction.low-tally', 'at_war_with', 'faction.fetterhouse', 'unsealed levin salt and sorted faultglass: capital on one side, the best margin on the continent on the other'),
  R('faction.low-tally', 'rival_of', 'faction.mirror-assembly', 'cudmother starters out of the karst, which the Assembly calls treason and the terraces call insurance'),
  R('faction.low-tally', 'rival_of', 'faction.pale-assay', 'ungraded button and unsealed nitre through a yard the Assay will not admit is leaking'),
  R('faction.low-tally', 'secretly_cooperates_with', 'faction.concord-of-weights', 'a tolerated volume of untaxed cargo keeps the honest price legible, and both sides know the figure', true),
  R('faction.low-tally', 'secretly_cooperates_with', 'faction.red-writ', 'the Ring\'s manifests are the cleanest paper in the people trade', true),
  R('faction.low-tally', 'infiltrates', 'faction.mooring-assize', 'six unaccounted mooring lines, and at least one weigher who does not look up', true),
  R('faction.low-tally', 'infiltrates', 'faction.conduit-college', 'the published mains-down maintenance window, which the College, the Tally and the constables all plan around each other in', true),
  R('faction.red-writ', 'trades_with', 'faction.pale-assay', 'bone char east to the bittern ladders, sold cheap and sold constantly'),

  /* The Post: trusted by all thirteen, honest with none */
  R('faction.bonewax-post', 'infiltrates', 'faction.concord-of-weights', 'every private letter in the basin passes through one building on the fifth terrace', true),
  R('faction.bonewax-post', 'infiltrates', 'faction.mooring-assize', 'seals lifted, copied and re-struck in the sorting house, never on the road', true),
  R('faction.bonewax-post', 'infiltrates', 'faction.fetterhouse', 'ward-licence correspondence, which four subscribers have asked to have priced as a category', true),
  R('faction.bonewax-post', 'infiltrates', 'faction.conduit-college', 'patent-bench correspondence, including payments from a guild that has no premises in the city', true),
  R('faction.bonewax-post', 'infiltrates', 'faction.standing-hour', 'inter-chapter letters, carried by couriers who are not told what they are carrying', true),
  R('faction.bonewax-post', 'infiltrates', 'faction.bondwrights-hall', 'branch correspondence, which is how the guild\'s true roll size is known to anyone at all', true),
  R('faction.bonewax-post', 'trades_with', 'faction.concord-of-weights', 'a subscription, categorised by trade rather than by name'),
  R('faction.bonewax-post', 'trades_with', 'faction.mooring-assize', 'a subscription, and the exemption at every mast head'),
  R('faction.bonewax-post', 'trades_with', 'faction.fetterhouse', 'a subscription, categorised by licence rather than by name'),
  R('faction.bonewax-post', 'trades_with', 'faction.conduit-college', 'a subscription the College would describe, if asked, as a survey of technical opinion'),
  R('faction.bonewax-post', 'secretly_cooperates_with', 'faction.low-tally', 'a paying subscriber under three separate names; the Post carries no cargo and sells the sailing dates', true),
  R('faction.bonewax-post', 'truce_with', 'faction.iron-sluice-company', 'the only standing exception in the sluice book, and the Company has wondered for years what it costs'),
  R('faction.bonewax-post', 'truce_with', 'faction.pitchguard', 'grey passes the palisade after dark, in a fighting season, and always has'),

  /* ---------------------------------------------------------------- */
  /* Leadership. Faction to the NPC who holds it.                      */
  /* ---------------------------------------------------------------- */

  R('faction.concord-of-weights', 'leads', 'npc.wessel-ondriek', 'Chief Factor of the Counting Stair; sets the clearing rate every ninth morning'),
  R('faction.mooring-assize', 'leads', 'npc.cesille-vaudry', 'Warden of the Mooring Crown; her house holds the second counterweight lease'),
  R('faction.pitchguard', 'leads', 'npc.aune-mustsalu', 'Bole-Marshal of the Bastion Bole; signs the conscription rolls each spring'),
  R('faction.mirror-assembly', 'leads', 'npc.ossane-gorbea', 'light-tithe reeve; the seal that issues hours and the returns that decide who is counted'),
  R('faction.pale-assay', 'leads', 'npc.tazrit-nourem', 'sift-mistress of three towers, and the strongroom under the middle one'),
  R('faction.red-writ', 'leads', 'npc.berke-chagra', 'holder of the first book: paper on half the fighters and most of the stewards'),
  R('faction.iron-sluice-company', 'leads', 'npc.ost-vennick', 'sluice-master of the Weir Gates; keeps the book and sleeps beside it'),
  R('faction.moorstone-compact', 'leads', 'npc.sabbe-sixteen-knot', 'elder of the stone lots; first among eleven, and currently for sale'),
]
