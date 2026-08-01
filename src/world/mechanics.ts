/**
 * Game mechanics.
 *
 * Thirteen city systems and one global one. Each entry is written as a design
 * document a programmer could work from: a real loop, concrete rules, named
 * variables with ranges, and failure states that are specific enough to build.
 *
 * The city entries already name these systems, so the ids here are fixed. What
 * the systems actually do is proposal, and the genuine unknowns are recorded as
 * questions rather than resolved by invention.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE GILDED ASCENT — The Standing Ledger                           */
  /* ================================================================ */

  E({
    id: 'mechanic.standing-ledger',
    type: 'mechanic',
    name: 'The Standing Ledger',
    aka: ['The Line', 'Standing'],
    status: 'draft',
    summary: 'Public credit at the Counting Stair: pledge collateral, draw a line, buy height with it, default into the Salt Office.',
    tags: ['economy', 'debt', 'indenture', 'signature', 'gilded-ascent'],
    fields: {
      purpose:
        'Money in [[city.gilded-ascent|the Gilded Ascent]] is a position rather than a quantity. A party does not arrive rich or poor, it arrives rated or unrated, and the rating is public. The purpose of the Ledger is to make the whole city legible as a vertical scale of access: the higher your line, the higher on the escarpment you can physically stand, sleep, store goods and be listened to.\n\nIt also gives the campaign a debt the players chose. The Ascent never robs anybody. It offers terms, and the terms are always genuinely better than the alternative on the day they are signed.',
      category: 'Economy',
      implStatus: 'Prototype',

      loop:
        'The cycle is nine days long, because [[faction.concord-of-weights|the Concord]] re-sets the clearing rate every ninth morning and every open line in the basin is repriced at the same instant.\n\n1. PLEDGE. Bring collateral to a counting house on the terrace where you want the standing to count. Goods, a warehouse rating, a sealed writ, or an [[item.indenture-bond|indenture bond]].\n2. ASSAY. The house assays the pledge in [[machine.the-assay-cage|the Assay Cage]], applies its own haircut, and posts a line against your name where anyone can read it.\n3. DRAW. Spend the line. Hoist passage on [[machine.the-oxblood-hoists|the Oxblood Hoists]] is priced by terrace, rooms are let by rating, bail is a number, and a licence is a number.\n4. CLOCK. On the ninth morning interest posts against the line, wherever in the world the party is standing. Travel does not pause it and neither does prison.\n5. ANSWER. Repay, roll over at the new rate, pledge more, or say nothing.\n6. CALL. Three missed postings and a Concord bailiff serves. Collateral is seized at forced-sale value; anything still owed converts to a term registered in [[district.gilded-ascent-salt-office|the Salt Office]].',
      controls:
        'A persistent ledger sheet, openable anywhere in the basin and readable by any NPC who cares to look. It shows the party\'s line, the drawn balance, the current clearing rate, the days to the next posting, and the standing tier as a single word.\n\nFour verbs: PLEDGE, DRAW, REPAY, CONTEST. Pledging opens an item and bond picker with the house\'s haircut applied live, so the player sees the seizure value before signing. Contesting opens the tread selector on [[landmark.the-counting-stair|the Counting Stair]], because the tread a contract was signed on decides which court hears it fail.\n\nEvery locked door, gate and hoist landing in the city shows the line it wants, not a generic refusal. The refusal is always a number.',

      rules: [
        'A line is set by house, not by city. Each of the forty chartered houses posts its own haircut, so shopping a pledge around is legal, costs a day, and tells every house on the terrace exactly what you are worth.',
        'Standing gates altitude. Terrace wardens check the posted line and not the purse. A party with coin and no rating can buy bread on the wharves and cannot rent a room above the fourth terrace.',
        'Interest posts every ninth morning at the clearing rate against the drawn balance, not the line. An undrawn line costs nothing, which is why the Ascent gives them away.',
        'Haircuts are by collateral class: bonded warehoused goods take 20 per cent, unbonded goods 55, livestock 70, a promise 100. An [[item.indenture-bond|indenture bond]] takes 10, which makes a person the best collateral in the city and is the whole moral problem of the system.',
        'A call does not resolve into a fine. The shortfall converts to a term at the Salt Office rate, and the register is enforceable in six other settlements without a further hearing.',
        'Liability is joint. Any member may pledge for the party, and the register names every member who was on the sheet when the line was drawn, including ones who were unconscious at the time.',
        'A house that stops clearing stops voting on the Concord within a season. A house facing its own call will therefore lend into a losing position rather than shrink, so terms genuinely improve during a crisis. This is counter-intuitive and it is load-bearing.',
        'Wearing an [[item.oxblood-coat|oxblood coat]] with cuff tallies above your posted line is prosecuted as fraud, not vanity, because the tallies are a claim about the line.',
        'A [[item.cut-seal|cut seal]] can draw a line the party does not have. The draw clears. The audit is on the ninth morning, and the sentence for the seal is the right hand with the debt still standing.',
      ],
      variables: [
        row({ name: 'clearingRate', range: '2 to 11 per cent per nine days', note: 'Set by the Concord, published at dawn. Under 3 is a boom nobody trusts. Over 8 has happened twice.' }),
        row({ name: 'line', range: '0 to pledged value less haircut', note: 'Posted publicly against the party name. Undrawn line is free to hold and expensive to lose.' }),
        row({ name: 'haircut', range: '10 to 100 per cent by class', note: 'House-specific. The spread between the best and worst house on a terrace is about 15 points.' }),
        row({ name: 'standingTier', range: 'Struck off / Unrated / Rated / Sealed / Chartered', note: 'One word, public. Gates rooms, warehouse rating, hoist queue position and whether a bailiff knocks first.' }),
        row({ name: 'terraceCeiling', range: '1 to 11', note: 'Highest terrace the tier may hold a room on. Struck off is not a terrace, it is the Under-Stair.' }),
        row({ name: 'arrears', range: '0 to 3 postings (27 days)', note: 'Three missed postings serves the writ automatically. There is no discretion and no clerk to plead with.' }),
        row({ name: 'registerRate', range: '9 to 40 days of term per writ-unit short', note: 'Set by the Salt Office, not by the house. The only number in the system the Concord does not control.' }),
        row({ name: 'houseExposure', range: '0 to 100 per house', note: 'How much of a house\'s book is lent against Sky City counterweight leases. Hidden. Drives the endgame.' }),
      ],
      dependencies: [
        'A campaign clock with a day counter; interest is time-based, not quest-based',
        'Per-item assessed value and bonded status, shared with [[mechanic.mass-warrant|the Mass Warrant]]',
        'A persistent cross-city labour register that [[mechanic.ring-bond|the Ring Bond]] also writes to, so a term is one object with many holders',
        '[[machine.the-tally-engine|The Tally Engine]] as the settlement layer: two entries and no coin moves',
        'A public reputation object per party, since the line is readable by NPCs without a check',
        '[[skill.ledger-hand|Ledger Hand]] for reading a house\'s book from the inside',
      ],
      progression:
        'Standing climbs in five steps and each step is a different kind of play. Unrated to Rated is a haulage problem: bring something the Assay Cage will certify. Rated to Sealed is a social problem, because it needs two chartered sponsors and sponsors are bought with favours rather than pledges. Sealed to Chartered is a legal problem gated on [[skill.chartering|Chartering]], and it hands the party a seal, a branch and liabilities that survive them.\n\nThe descent is faster and more interesting. A party can be struck off in nine days and struck off is not a soft state: it removes them from every book in the basin at once, which means no room, no berth, no hoist and no physician who keeps records.',
      rewards: [
        'Terrace access, which is the actual reward: rooms, warehouses and offices above the fourth',
        'Warehouse rating, so goods left in the Ascent are still there next spring',
        'A [[item.factors-seal|factor\'s seal]] at Sealed standing, and the right to bind a house to a contract',
        'A [[item.stair-writ|stair writ]] line honoured in six settlements without a further hearing',
        'The right to be heard on a high tread, which is the difference between a commercial court and a warden',
        'A charter of your own at the top, which is the gate on the party owning anything at all',
      ],
      failureStates: [
        'Called and cleared. Collateral seized at forced-sale value, roughly 60 per cent of assay. Liberty intact, standing down two tiers for a year.',
        'Called and short. The shortfall registers as a term in the Salt Office. The party is not imprisoned; they are owned, and they may still walk the city.',
        'Struck off. Legally invisible. Nobody who keeps books will hire, house, treat or transport them. Playable, and considerably harder.',
        'Joint ruin. One member\'s term names every pledger on the sheet, including any who have since left the party.',
        'Cascade. If the party is holding house paper as collateral when that house is called, their line evaporates on the same morning, before they hear about it.',
      ],
      edgeCases: [
        'Pledging a person. An indenture bond is the cheapest line in the city. The interface must force the player to name the individual and show their remaining term before the sign confirms.',
        'Death of a pledger. The line does not die. The register moves to the surviving pledgers on the next posting, at the same rate.',
        'A writ presented outside the basin. It clears at a discount that rises with distance: about 4 per cent in [[city.sky-city|the Sky City]], about 19 in [[city.sifting-city|the Sifting City]], and not at all in [[city.orath|Orath]].',
        '[[creature.ledger-moth|Ledger moths]] released in a bonded archive delete the house\'s record of a debt. The debt survives in the Tally Engine\'s card stock, which is a different building on a different terrace, and the crime is prosecuted as arson.',
        'The reserve. Four fifths of the clearing reserve is lent against Sky City counterweight leases. If an audit ever lands, every line in the basin is called at once and the mechanic inverts: debts and credit both become worthless in the same hour.',
        'A party that refuses to borrow at all. This must stay fully playable. Cash traversal of the Ascent should work, one terrace lower and about a third slower.',
      ],
      implementationNotes:
        PROPOSAL('The Ledger as the Ascent\'s signature system is named in the city entry; the tiers, haircuts and nine-day cycle below are a first pass at numbers.') +
        '\n\nBuild the posting tick first and nothing else. Everything here is a consequence of interest arriving on a clock the player does not control, and if that tick is not solid the rest is decoration.\n\nTwo interface rules matter more than the maths. The line must be visible to NPCs without a check, because the drama is that everyone already knows. And a locked door must state the rating it wants, so that being poor reads as a number rather than as the game saying no.\n\nDo not let the party pay off a term with a quest reward at the last moment more than once. The system is only honest if default is a place the campaign can actually end up living in.',
    },
  }),

  /* ================================================================ */
  /* THE SKY CITY — The Mass Warrant                                   */
  /* ================================================================ */

  E({
    id: 'mechanic.mass-warrant',
    type: 'mechanic',
    name: 'The Mass Warrant',
    aka: ['The Warrant', 'Declared mass'],
    status: 'draft',
    summary: 'Every gram aboard is declared and licensed. Carry weight is currency, a carried person is billable, and undeclared mass is a capital charge.',
    tags: ['economy', 'encumbrance', 'smuggling', 'signature', 'sky-city'],
    fields: {
      purpose:
        'To invert loot. Everywhere else on the continent a heavy pack is a good problem. In [[city.sky-city|the Sky City]] mass is the thing the city is fighting, and every kilogram the party carries up is a line item somebody has signed for. The purpose is to make the player feel the ring\'s central lie in their inventory screen: the city is carrying several hundred tonnes more than it is rated for, and the warrant is the paperwork that hides it.',
      category: 'Economy',
      implStatus: 'Implemented',

      loop:
        '1. DECLARE. At the mast, before boarding, list carried mass by item. The clerk weighs a sample, not the whole.\n2. PAY. Mass is charged by the gram against a tariff that rises with the deck you are going to. Queue position is sold separately and is the part people actually fight over.\n3. CARRY. Aboard the ring, everything is still weighed: freight moved between quarters needs a transfer note, and a note is a small warrant.\n4. RECONCILE. Random re-weighs at the [[landmark.the-ballast-drop|Ballast Drop]] and at every quarter gate. The offence is not weight, it is the difference between the declared figure and the real one.\n5. DESCEND. Going down pays nothing and is where the smuggling happens, because nobody has ever built a fortune on getting things off a city.',
      controls:
        'The inventory screen gains a second column: DECLARED. Every item shows its true mass and its declared mass side by side, and the delta is highlighted in the same colour the game uses for crimes.\n\nAt the mast the player fills a warrant by dragging items into it. Items left out of the warrant stay in the pack, which is the entire mechanic in one gesture. A carried or unconscious person appears in the item list with a mass and a name, which is deliberate and should not be softened.\n\nA warrant is a physical document with a seal, a mast number and a date. It can be stolen, forged, borrowed and read.',

      rules: [
        'Every item in the game has a stated mass. The Sky City is where that number stops being flavour.',
        'The tariff is per gram and rises by deck: shelf-foot free, [[district.sky-city-lattice-town|Lattice Town]] cheap, [[district.sky-city-mooring-ring|the Mooring Ring]] dear, [[district.sky-city-crown-houses|Crown Houses]] priced to exclude.',
        'A person is mass. Carrying an injured companion up is billable at their weight plus a handling surcharge, and [[skill.dead-weight|Dead Weight]] does not exempt anyone from the fee, only from dropping them.',
        'Undeclared mass found on a re-weigh is ballast fraud. The city treats it as a capital charge because the city genuinely believes it is attempted murder of everyone below the deck.',
        'Ballast running is the cheap route: unlogged descent and ascent on the mooring lines at night, sold by [[npc.perrine-orlaunt|Perrine Orlaunt]], with a real suffocation risk in a sealed crate.',
        'Every warrant is signed by a mass-registrar, and the registrar is liable. This is why [[npc.aubran-ferrieu|Aubran Ferrieu]] was stripped and why the true sheets from the Sixth Mast week still matter.',
        'Licensed [[spell.weight-lending|weight lending]] can move declared mass from one body to another. It is legal, metered, and one of the two ways a person is quietly murdered in this city.',
        'The city\'s own returns are forged. The posted total tonnage is not the real total tonnage, and the difference is the campaign.',
      ],
      variables: [
        row({ name: 'declaredMass', range: '0 to party carry limit, in grams', note: 'What the warrant says. The only number the city acts on until a re-weigh.' }),
        row({ name: 'trueMass', range: 'same units', note: 'What the party is actually carrying. Never shown to NPCs, always shown to the player.' }),
        row({ name: 'tariff', range: '0.4 to 11 writ-units per kilogram per deck', note: 'Published daily by [[faction.mooring-assize|the Mooring Assize]]. Doubles on a still-air day when the updraught is weak.' }),
        row({ name: 'queueRank', range: '1 to 200', note: 'Bought separately from the tariff. Rank under 20 is how urgent things happen at all.' }),
        row({ name: 'reweighChance', range: '4 to 60 per cent per gate', note: 'Base 4. Rises with an unfamiliar face, a heavy pack, a bad month, or a warden who has been told to look.' }),
        row({ name: 'cityOverload', range: '0 to 900 tonnes over rated', note: 'Hidden world variable. Currently several hundred. Drives mast failures and eviction politics.' }),
        row({ name: 'ballastRisk', range: '3 to 22 per cent per unlogged descent', note: 'Per person, per run. Failure is suffocation in a sealed crate, not a fall.' }),
      ],
      dependencies: [
        'A real mass value on every item, creature and body in the game',
        '[[mechanic.standing-ledger|The Standing Ledger]] for the tariff to be payable on credit, which is how most freight moves',
        'A document object that can be forged, stolen and inspected',
        '[[skill.lattice-work|Lattice Work]] and [[skill.dead-weight|Dead Weight]] as the two skill answers to the same problem',
        'A weather model for the updraught, since still air changes the tariff and the risk together',
      ],
      progression:
        'The party starts by paying, which is correct and expensive. The first upgrade is not more carrying capacity but a standing warrant, which lets them declare once a season instead of once a trip. Above that sit the three cheats: a borrowed mast seal, a bought registrar, and the ballast lines.\n\nThe interesting arc is that the party accumulates knowledge of the city\'s real tonnage as they cheat it. By the time they can move anything they like, they have also worked out that the city cannot carry what is already on it, and the question stops being how to get a crate up and becomes which quarter goes down the ropes.',
      rewards: [
        'A standing warrant: declare seasonally instead of per ascent',
        'Queue rank, which is worth more than tariff relief on any day something is urgent',
        'Transfer notes that pass quarter gates without a re-weigh',
        'Access to the unlogged lines, and the crews who work them',
        'The true tonnage sheets, which are not loot but a political weapon',
      ],
      failureStates: [
        'Overweight at the gate. Goods impounded at the Ballast Drop, released on payment of tariff and a fine, or sold at the end of the month.',
        'Ballast fraud proven. Capital charge. In practice commuted to a lattice-crew term, which has a worse life expectancy than the sentence it replaced.',
        'A crate that arrives closed. If the party ships a person down unlogged and gets the timing wrong, the person suffocates. This has already happened once in the city\'s recent history and should not be repeated as spectacle.',
        'Mast failure. Sustained overload on a mast section drops it. The Sixth Mast is the precedent and the hearing never properly happened.',
        'Blacklisted from the masts. Not fatal, but the party is now a ground party in a city that is not on the ground.',
      ],
      edgeCases: [
        'Consumables. Eating and drinking aboard changes true mass against a fixed declaration. Small, and a competent smuggler uses it.',
        'Living cargo that changes weight. [[creature.loftwrack|Loftwrack]] bladders lose gas over a day; a warrant written on arrival is wrong by evening.',
        'Weight lending used on a person mid-inspection. Legal if licensed and metered, which means the crime is the licence and not the act.',
        'A party member who dies on the ring. The body is mass, needs a warrant to descend, and the fee is charged to whoever signs.',
        'Items with no established mass. Every module must state weight or the gate cannot price it. Missing mass should fail loudly in the build, not default to zero.',
        TBD('What does the Assize do about a party carrying something whose mass changes with the Toll, such as saturated [[material.quenchspar|quenchspar]]? Nobody has written that rule.'),
      ],
      implementationNotes:
        PROPOSAL('The Sky City entry establishes the warrant and the billable person. Tariffs, queue rank and the overload figure are proposed numbers.') +
        '\n\nThis is the easiest of the thirteen to build and should be the vertical slice. The inventory screen already tracks mass; the warrant is a second column and a document.\n\nDo not let the party solve this with a bigger bag. Every capacity upgrade in the game should be worthless here, and that should be obvious the first time they try. The correct answers are declare, bribe, split the load, or go down the ropes at night.',
    },
  }),

  /* ================================================================ */
  /* THE MEDITERRANEAN CITY — Conduit Hours                            */
  /* ================================================================ */

  E({
    id: 'mechanic.conduit-hours',
    type: 'mechanic',
    name: 'Conduit Hours',
    aka: ['Slot time', 'The timetable'],
    status: 'draft',
    summary: 'Bid for timetabled pressure in the copper conduits. A recipe eats slot-minutes, and a missed slot scraps the whole batch.',
    tags: ['crafting', 'licensing', 'scheduling', 'signature', 'mediterranean-city'],
    fields: {
      purpose:
        'To make advanced crafting a scheduling problem instead of a shopping problem. Anywhere else, a recipe asks whether the party has the materials. In [[city.mediterranean-city|the Mediterranean City]] it asks whether they have the hour, and the hour belongs to somebody. This is where the world\'s restrained industrial ceiling is enforced: the machines work, and access to them is rationed by a licensing body that is not going to stop.',
      category: 'Crafting',
      implStatus: 'Specified',

      loop:
        '1. READ. The timetable is posted a week ahead at the conduit yards: slots by main, by pressure band, by minute.\n2. BID. Slots are auctioned in blocks of fifteen minutes. [[faction.conduit-college|The Conduit College]] takes the top bid and a licence fee on top.\n3. PREPARE. Charge the bench, cut the gaskets, set the work. A recipe declares its slot-minutes, and preparation is not part of them.\n4. RUN. The pressure arrives on the minute and leaves on the minute. Nothing pauses. [[skill.pressure-fitting|Pressure Fitting]] is what lets a crew work a live main at all.\n5. CLEAR. Off the bench before the next slot opens, or the next holder\'s pressure arrives in your work.\n6. SETTLE. Unused slot-minutes are not refunded; they are resold, which is a small and thriving trade in itself.',
      controls:
        'A week-view timetable board: mains down the side, minutes across, slots coloured by holder. The party\'s own slots are outlined. Bidding is a single number against a visible reserve.\n\nAt the bench, a slot timer runs in the same place the game normally puts a health bar, and it does not stop for menus, dialogue or combat. The player can see, at all times, how many slot-minutes the current recipe still needs and how many are left.\n\nMaintenance windows are published in advance on the same board, which makes them the safe hour to be inside [[landmark.the-mother-main|the Mother Main]] and the hour everyone else has planned around too.',

      rules: [
        'Every recipe with tier Component or above declares a slot-minute cost. Raw and Refined recipes do not need the conduit.',
        'Slots are sold in fifteen-minute blocks. A recipe needing 40 minutes needs three blocks and wastes five, and the waste is normal.',
        'A missed or interrupted slot scraps the batch. Not a partial yield, not a quality penalty. Scrap, because the processes cannot be paused halfway.',
        'Working a main outside your slot is possible with [[skill.pressure-fitting|Pressure Fitting]] and is prosecuted by the College as tampering, with the licence revoked first and the hearing afterwards.',
        'Licences are per workshop, not per person. A party without a licensed bench is bidding on behalf of someone who has one, and that someone takes a cut and the liability.',
        'The College sits on working designs it will not license. Anything the party builds outside the timetable is unlawful even when it is better, which is the faction\'s hidden agenda made playable.',
        'Maintenance windows are published, mains-down, and walkable. They are the only lawful time to be inside the trunk conduit and the obvious time to be there unlawfully.',
        'An [[item.governor-spring|governor spring]] is the continent\'s bottleneck component and can only be drawn here. Any recipe wanting one is implicitly asking for a slot.',
      ],
      variables: [
        row({ name: 'slotMinutes', range: '15 to 240 per recipe', note: 'Declared on the recipe. [[recipe.drawn-wire-and-tube|Drawn wire]] is 45; a masterwork balance is closer to 200.' }),
        row({ name: 'clearingBid', range: '2 to 60 writ-units per block', note: 'Rises sharply in the eight days before the freight season opens, which is public knowledge and priced in.' }),
        row({ name: 'pressureBand', range: 'Low / Working / High / Proof', note: 'Recipes name a band. Proof band is available on two mains and is where the accidents are.' }),
        row({ name: 'licenceTier', range: 'None / Bench / Shop / House', note: 'Set by the College. Bench can bid, Shop can hold standing slots, House can sublet them.' }),
        row({ name: 'batchIntegrity', range: '0 to 100 per cent', note: 'Falls with every interruption inside a slot. Below 100 the batch is scrap; there is no partial credit.' }),
        row({ name: 'mainsDownWindow', range: '2 to 9 hours, published 6 days ahead', note: 'Per main. The one predictable hole in the city\'s security.' }),
        row({ name: 'tamperHeat', range: '0 to 100', note: 'College attention. Rises on unlicensed work, falls slowly, and gates whether a bid is even accepted.' }),
      ],
      dependencies: [
        'A recipe system that can carry a time cost as well as an input list',
        'A real in-world clock so a slot can be missed by arriving late',
        '[[skill.pressure-fitting|Pressure Fitting]] as the only way to work live pressure',
        '[[mechanic.standing-ledger|The Standing Ledger]] so slots can be bid for on credit',
        '[[machine.the-drawbench-vaults|The Drawbench Vaults]], [[machine.the-frit-kiln|the Frit Kiln]] and [[machine.the-verdigris-hearth|the Verdigris Hearth]] as the three benches that need slots',
        '[[material.mirelac|Mirelac]] supply, since a bad lacquer season browns the mains out and cancels slots wholesale',
      ],
      progression:
        'The party begins by buying single blocks at bad prices through somebody else\'s licence. A Bench licence lets them bid in their own name. A Shop licence gives standing slots, which is the point at which crafting stops being an event and becomes a schedule the party maintains.\n\nThe endgame is not a better bench. It is influence over the timetable itself: who gets the Proof band, when the maintenance windows fall, and whether the College licenses a design it has been sitting on. [[quest.the-casting-voice|The Casting Voice]] is that fight in miniature.',
      rewards: [
        'A Bench licence, and the right to bid in your own name',
        'Standing slots, which convert crafting from a negotiation into a routine',
        'Priority on the Proof band for the two mains that carry it',
        'Advance sight of maintenance windows before they are posted',
        'A design released from the College\'s locked drawer, which is worth more than any single item',
      ],
      failureStates: [
        'Batch scrapped. Materials consumed, nothing produced, slot fee not refunded. This is the ordinary failure and it should hurt in materials, not in health.',
        'Slot lost to a higher bid at the last posting. The party discovers it on the board, not from a person.',
        'Licence revoked. All standing slots void, all bids refused, and the party is back to renting someone else\'s bench at a markup that reflects the risk.',
        'Main ruptured. Working a live conduit badly vents working pressure into a yard. Deaths are real, the College prosecutes, and the yard is closed for a season.',
        'Season missed. Some recipes exist only in a window, and a party that spends the window arguing has lost a year rather than a batch.',
      ],
      edgeCases: [
        'Two recipes in one slot. Legal if the total fits, and the College does not care, but any failure in the first ruins both.',
        'Combat inside a slot. If a fight starts on the bench, the timer keeps running. Winning the fight and losing the batch is the intended outcome.',
        'Sublet slots. A House licence can resell a slot it is not using. The buyer holds the work and the seller holds the liability, which is a contract worth writing quests about.',
        'Slots as currency. Slot-minutes are traded openly and should be accepted as payment by NPCs who need them, which is most of the city\'s artisans.',
        'A conduit that is already down. During an unplanned outage nothing can be crafted at all and the whole city\'s craft economy stops, which is a good disaster and a bad daily state.',
        TBD('Does the Orrery drift affect the timetable? The tables set sailing and planting dates; nobody has decided whether the conduit board is printed off the same instrument.'),
      ],
      implementationNotes:
        PROPOSAL('Conduit Hours is named as the city\'s signature system and as the gate on advanced crafting. Block size, bands and prices below are proposed.') +
        '\n\nEvery recipe authored for this city must state slot-minutes and a pressure band, or it cannot be scheduled. Treat a missing slot cost as a content bug.\n\nThe timer must be visible and must not pause. If the player can pause it in a menu the whole mechanic collapses into a shopping list with extra steps.\n\nResist adding a partial-yield rule. Scrap is severe, and severity is what makes a bought slot feel like a possession.',
    },
  }),

  /* ================================================================ */
  /* THE TREE CITY — The Severance Drill                               */
  /* ================================================================ */

  E({
    id: 'mechanic.severance-drill',
    type: 'mechanic',
    name: 'The Severance Drill',
    aka: ['The Drill', 'Cutting the span'],
    status: 'draft',
    summary: 'Cut a loaded span to seal a breach. It works in under forty seconds, and it strands whoever is still on the decking.',
    tags: ['combat', 'traversal', 'doctrine', 'signature', 'tree-city'],
    fields: {
      purpose:
        'To give [[city.tree-city|the Tree City]] one answer to every emergency and make the player hold the axe. The drill is not a dilemma the designers invented; it is a working military procedure that succeeds. The question a party faces is never whether the cut will hold the line. It is who is still on the decking when the order comes, and whether the order was signed before or after the party was sent across.',
      category: 'Combat',
      implStatus: 'Prototype',

      loop:
        '1. BREACH. Something crosses a span: a raiding party, a fire, a brood of [[creature.bolewright-wasp|bolewright]] galls, a mutiny in a gallery.\n2. ORDER. A countersigned order-holder is opened at the span head. The countersignature is a name and a time, and both are recorded.\n3. CLEAR. The span is called. Anyone who can run has the length of the call to get off it.\n4. CUT. A two-crew team works the sealed axe at the anchor. Drilled crews drop a ninety-stride span in under forty seconds.\n5. FALL. The span goes, the load goes with it, and the gap is now permanent until [[district.tree-city-spanworks|the Spanworks]] rig a replacement, which takes weeks.\n6. ACCOUNT. Names are taken. The order-holder is filed. Somebody owns the cut.',
      controls:
        'On any loaded span the interface shows three things: the anchor, the call timer, and the current order state. Order state is a small seal icon with three values: unsigned, signed, countersigned.\n\nCutting is a two-person action with a hold input, and the hold cannot be completed alone. This is deliberate: the drill needs an accomplice, so the decision is always shared and always attributable.\n\nWhen a call is running, every named character still on the decking is listed by name on the span head panel. Not silhouettes. Names.',

      rules: [
        'Thirty-eight spans in the city carry a sealed axe and a countersigned order-holder. Those thirty-eight are the ones that can be cut in the drill time; anything else needs saws and an afternoon.',
        'A cut needs two crew. One person can start the anchor and cannot finish it, which is the rule the whole moral weight of the mechanic rests on.',
        'The call is the warning. Its length is set by the span, not by the emergency: ninety-stride spans get about twelve seconds and the longest gets thirty.',
        '[[landmark.the-black-span|The Black Span]] carries the water main for four boles and may not be cut under any order. This is why the southern approach is fortified twice over and why an attacker who reaches it has already won something.',
        'A cut span does not come back. The gap persists in the world state, routes reroute, and districts on the far side lose their trade until the Spanworks are paid.',
        'The order must be countersigned before the cut, and the time is on the paper. Cutting first and signing after is the ordinary crime of this city, and it is provable.',
        '[[skill.gallery-drill|Gallery Drill]] lets a character fight and work on a span that is still under load. Without it, being on a loaded span in a fight is its own hazard.',
        'The drill works on a mutiny exactly as well as it works on a breach, and the Pitchguard has used it that way.',
      ],
      variables: [
        row({ name: 'cutTime', range: '28 to 55 seconds, two crew', note: 'Drilled crews under 40. A single character cannot complete the anchor at any time value.' }),
        row({ name: 'callLength', range: '8 to 30 seconds', note: 'Set by span length. Everyone on the decking hears it and the player sees the name list.' }),
        row({ name: 'spanLoad', range: '0 to rated tonnage', note: 'Under load the anchor cuts faster and the fall is worse. Loaded cuts kill people on the far side too.' }),
        row({ name: 'orderState', range: 'Unsigned / Signed / Countersigned', note: 'Recorded with a timestamp. Post-hoc countersignature is the standard forgery and is detectable.' }),
        row({ name: 'severedSpans', range: '0 to 38', note: 'Persistent. Each cut permanently reroutes traversal and trade until rebuilt.' }),
        row({ name: 'rebuildCost', range: '3 to 11 weeks and a licensed [[material.blackbole-timber|boleheart]] allocation', note: 'The timber licence is a council vote, so a rebuild is politics before it is carpentry.' }),
        row({ name: 'strandedNamed', range: '0 to n', note: 'Named characters left on the far side. Tracked individually; they do not simply disappear.' }),
      ],
      dependencies: [
        'A traversal graph the world can permanently edit, since a cut span changes the map',
        'A named-NPC presence system, because the mechanic is only sharp if the game knows who is on the bridge',
        'Two-character cooperative interactions',
        '[[skill.gallery-drill|Gallery Drill]] for working and fighting on a loaded span',
        'A document object with signatures and timestamps, shared with [[mechanic.the-sluice-book|the Sluice Book]]',
        '[[faction.pitchguard|The Pitchguard]] chain of command as the source of orders',
      ],
      progression:
        'A party begins as people who get called off spans. Then they are people who are sent across them. Then they hold an order-holder, which is the promotion that matters and the one nobody explains properly.\n\nAbove that, the progression is authority rather than skill: the right to countersign, the right to refuse an order, and eventually a seat where the felling decisions are made. [[quest.the-felling-order|The Felling Order]] is the same logic at the scale of a whole quarter, with families inside the trunk and eleven days on the clock.',
      rewards: [
        'A sealed axe and the crew training to use it inside the drill time',
        'An order-holder, which is authority rather than equipment',
        'Countersignature rights, and therefore the ability to make a cut lawful',
        'Spanworks priority, which decides which severed span is rebuilt first',
        'Standing with [[faction.pitchguard|the Pitchguard]], who notice competence before they notice loyalty',
      ],
      failureStates: [
        'Cut late. The breach crosses. The span is lost anyway and so is the gallery behind it.',
        'Cut early. People the party knows by name are on the far side, alive, and now on the wrong side of a permanent gap.',
        'Cut without countersignature. Lawful outcome, unlawful act, and the paperwork exists. Somebody will find it.',
        'Anchor half worked. One crew member down mid-cut leaves a weakened span that will fail later under an ordinary load, killing people who had nothing to do with it.',
        'The Black Span cut regardless. Four boles lose water. The city does not recover inside the campaign.',
      ],
      edgeCases: [
        'A cut ordered on a span the party is standing on. The call names them. The interface should not make this a cutscene.',
        'Fire. A burning span may fail before the drill time is up, and cutting a burning anchor is faster and considerably worse for the crew.',
        'Rope-bridge maintenance runs. [[npc.vetla-torvik|Vetla Torvik]]\'s route reaches the fourth gallery without a gate, and none of it is on the thirty-eight. It cannot be severed, which is precisely why it is worth what she charges.',
        'A cut used to strand a creditor, a rival, or a conscription party. Entirely possible, entirely in character for the city, and the order paperwork is the only thing that distinguishes it from doctrine.',
        'Rebuilding into a changed city. A replaced span may not land where the old one did, and the district on the far side may not want it back.',
        TBD('Does anyone in the Greatwood have standing to refuse a countersigned order, and what happens to them if they do? The Marshalcy has never had to answer this in writing.'),
      ],
      implementationNotes:
        PROPOSAL('The drill, the thirty-eight spans, the forty-second time and the Black Span exception are established in the city entry. Rebuild costs and order-state handling are proposed.') +
        '\n\nThe name list is the mechanic. If the player only ever sees anonymous figures, this is a bridge puzzle. Build the presence tracking before the axe.\n\nSevered spans must persist and must visibly change the city map. A cut the world forgets by the next chapter teaches the player that the drill is free, which is the opposite of the point.\n\nAvoid a morality meter. Nobody in the Tree City thinks the drill is wrong, and the entry is stronger if the game does not either.',
    },
  }),

  /* ================================================================ */
  /* THE CAVE AGRARIAN CITY — The Mirror Rota                          */
  /* ================================================================ */

  E({
    id: 'mechanic.the-mirror-rota',
    type: 'mechanic',
    name: 'The Mirror Rota',
    aka: ['The Rota', 'Lumen-hours'],
    status: 'draft',
    summary: 'Sunlight is issued in lumen-hours per gallery. Aim, polish, petition or steal light off a neighbour, and a dark season kills a gallery.',
    tags: ['survival', 'agriculture', 'allocation', 'signature', 'cave-agrarian-city'],
    fields: {
      purpose:
        'To make light a budget. In [[city.cave-agrarian-city|the Hollow Karst]] daylight is a delivered utility with a meter on it, and the meter is political. The purpose is to let players engage with an allocation system from every side: as petitioners, as thieves, as the people who aim the mirrors, and eventually as the people who decide which galleries go dark.',
      category: 'Survival',
      implStatus: 'Specified',

      loop:
        '1. ISSUE. On the first of each month [[npc.ossane-gorbea|the light-tithe reeve]] re-cuts the rota. Each gallery is issued lumen-hours per day for the month.\n2. AIM. [[landmark.sunwell-shaft|The Sunwell Shaft]] feeds two hundred ducted mirrors, and every one is aimed by hand. Better aim is more delivered light from the same allocation.\n3. GROW. Crops consume light on a schedule. [[food.mirror-barley|Mirror barley]] wants the terraces, [[food.gallery-cap|gallery cap]] wants none at all, and the mix a gallery plants is a bet on next month\'s rota.\n4. SHORTFALL. When the issue is short, a gallery petitions, buys hours, steals them with a [[item.sunwell-mirror|jointed hand mirror]], or plants for the dark.\n5. RE-CUT. Next month the rota moves. Anyone who took light off a neighbour has changed somebody\'s numbers and the reeve\'s office knows by the second week.',
      controls:
        'A rota board: galleries down the side, days across, lumen-hours in the cells, with the party\'s own holdings outlined. Petitions are filed against a gallery and a month and are answered publicly.\n\nAt a duct mouth, aiming is a fine-adjustment interaction gated on [[skill.mirror-cutting|Mirror Cutting]]. The feedback is the lit throw distance in paces, which the player can see change as they work.\n\nStealing light is the same interaction performed on somebody else\'s duct, with a visible spill that a passer-by can notice. Light theft is the local crime and it is caught by people looking up.',

      rules: [
        'A gallery\'s issue is lumen-hours per day, re-cut monthly. A first-terrace gallery draws about five and a half duct-hours a day at midsummer and under two at midwinter.',
        'A duct throws usable light roughly forty paces past its mouth and nothing beyond. Gallery geometry, not allocation, sets the hard ceiling on what a duct can serve.',
        'Aim quality multiplies the issue. A well-cut, well-aimed duct delivers up to a fifth more than its nominal hours; one degree of error is a dead gallery.',
        'A gallery cut off for a full season loses its [[material.cudmother|cudmother]] culture, and made ground without cudmother reverts to rock dust. Recovery is four to nine years.',
        'Light theft is a real crime with a real detection loop: the spill is visible, the neighbour notices the loss within days, and the reeve reconciles the figures monthly.',
        'Hours are transferable. They are bought, sold, gifted as reward, and used as a bribe more often than coin is.',
        'Mirror silvering kills the silverers. Resilvering is on a ninety-day rotation because of quicksilver poisoning, and the rotation is the maintenance cost of the whole system.',
        'The rota is voted by [[faction.mirror-assembly|the Mirror Assembly]] on inherited shares, so the galleries with the least light have the fewest votes to change it.',
      ],
      variables: [
        row({ name: 'issuedHours', range: '0 to 5.5 duct-hours per day', note: 'Per gallery, per month. Midsummer high, midwinter under 2. Zero is a decision somebody signed.' }),
        row({ name: 'aimQuality', range: '0.6 to 1.2 multiplier', note: 'On the issue. Set by mirror condition and the last alignment. Degrades slowly without attention.' }),
        row({ name: 'throwDistance', range: '0 to 44 paces', note: 'From the duct mouth. Beyond it, nothing grows regardless of how many hours are issued.' }),
        row({ name: 'cudmotherHealth', range: '0 to 100 per gallery', note: 'Falls in the dark. At zero the soil is rock dust and the recovery clock is 4 to 9 years.' }),
        row({ name: 'darkSeasons', range: '0 to n consecutive', note: 'One is survivable. Two ends the gallery as an economic entity and its people leave or starve.' }),
        row({ name: 'theftSpill', range: '0 to 100 visibility', note: 'How obvious a stolen aim is from the gallery floor. Rises with the amount stolen and with daylight.' }),
        row({ name: 'silverRotation', range: '90 days', note: 'Fixed by quicksilver exposure. A crew kept past it starts showing symptoms the city recognises on sight.' }),
      ],
      dependencies: [
        'A monthly world tick that runs the re-cut whether or not the party is present',
        'A crop and soil model with a light input, so a shortfall shows up as a harvest and not a message',
        '[[skill.mirror-cutting|Mirror Cutting]] for aim, grinding and silvering',
        '[[machine.the-mirror-ducts|The Mirror Ducts]] and their imported quicksilver and tin supply',
        'District-level economy so a dark gallery can actually stop existing',
        '[[mechanic.standing-ledger|The Standing Ledger]] where galleries mortgage next season\'s hours',
      ],
      progression:
        'Players start as recipients: they are given hours or refused them. Then they learn to aim, which makes them useful to a gallery and gives them something to sell. Then they gain hours of their own, by petition or purchase or as a quest reward, and become a party other galleries come to.\n\nThe last step is the reeve\'s seal, or influence over whoever holds it. [[quest.who-gets-the-light|Who Gets the Light]] hands the party that decision outright, and the galleries they cut go dark permanently.',
      rewards: [
        'Lumen-hours, which are the city\'s real currency and spend like one',
        'A duct of your own, aimed to your terrace and nobody else\'s',
        'Standing to petition the Assembly directly rather than through a gallery',
        'A resilvering crew, which is both an asset and a body count',
        'The reeve\'s ledger, which proves that failed galleries were starved before they were bought',
      ],
      failureStates: [
        'Short month. The harvest comes in light, the gallery buys food, and the debt goes on the ledger.',
        'Dark season. Cudmother dies, made ground reverts, and the gallery is finished as farmland for the better part of a decade.',
        'Caught stealing light. Fine, forfeited hours, and the neighbour who lost the light remembers longer than the court does.',
        'Duct collapse. A blocked or fallen duct takes its galleries offline and cannot be repaired by one person, which is exactly [[npc.iratze-zubiate|Iratze Zubiate]]\'s problem.',
        'Silver poisoning. A crew worked past ninety days starts dying visibly, and the party either rotates them or does not.',
      ],
      edgeCases: [
        'Unlicensed strains. [[npc.bedel-lehun|Bedel Lehun]]\'s violet grain yields double in half the light, so a gallery growing it can survive a cut that should have ended it, at a cost that shows up in people rather than in the rota.',
        'Fungus galleries. [[food.gallery-cap|Gallery cap]] needs no light at all, so a gallery can be starved to zero and still eat. Badly, and with a lung rot by forty.',
        'Weather above ground. Cloud is not modelled in the issue, so a bad fortnight is a shortfall nobody is accountable for and everybody blames the reeve for.',
        'Buying the whole month\'s issue from a poor gallery. Legal, cheap, and the mechanic must not soften what it does to them.',
        'A party that never enters the politics. They should still feel the rota, because every inn, forge and farm they use is on somebody\'s allocation.',
        TBD('What happens to a gallery\'s hours when its people leave? Do they revert to the Assembly, lapse, or stay attached to the empty ground?'),
      ],
      implementationNotes:
        PROPOSAL('The lumen-hour issue, the forty-pace throw and the cudmother rule are established in the city entry. Aim multipliers, theft detection and the silver rotation are proposed.') +
        '\n\nThe monthly re-cut must run on the world clock and must be visible on the board before it takes effect, so a player can see a bad month coming and fail to prevent it.\n\nThe cudmother rule is what stops this being a resource bar. A light allocation is a decade of a family\'s work, and the interface should say so on the tooltip, in years.\n\nDo not let players buy their way out of the rota permanently. Hours can be owned; the fact that light is issued at all should never become optional.',
    },
  }),

  /* ================================================================ */
  /* THE SIFTING CITY — The Sift Line                                  */
  /* ================================================================ */

  E({
    id: 'mechanic.the-sift-line',
    type: 'mechanic',
    name: 'The Sift Line',
    aka: ['The Line', 'Taking the sixth'],
    status: 'draft',
    summary: 'Feed spoil down graded screens. Every pass costs water and lung, and the grade that pays rides the last mesh.',
    tags: ['crafting', 'extraction', 'labour', 'signature', 'sifting-city'],
    fields: {
      purpose:
        'To make extraction a bet rather than a button. In [[city.sifting-city|the Sifting City]] the ore is already in the spoil; the question is how many passes down the screens the party is willing to buy, and who pays for them. The purpose is to put a resource loop in front of the player where the limiting input is not time or tools but water, and the hidden input is other people\'s lungs.',
      category: 'Crafting',
      implStatus: 'Implemented',

      loop:
        '1. BID. Before a run the party declares how many passes it will take. This is the whole decision and it is made before anything is known.\n2. DRAW. Each pass consumes posted water draw against a tower\'s book. Draw is finite, priced daily, and the towers keep the book.\n3. FEED. Spoil goes down [[machine.the-sieve-cascade|the Cascade]]: nine graded screens, wind-fed, sorting by size and density.\n4. TUNE. Mesh, slope and feed rate are adjusted between passes. [[skill.sieve-tuning|Sieve Tuning]] moves the yield curve; nothing moves the water cost.\n5. BREATHE. Every pass adds to a standing exposure counter for everyone on the deck, party and crew alike.\n6. ASSAY. What comes off is graded by [[faction.pale-assay|the Pale Assay]] and stamped. The stamp, not the mineral, is what a buyer pays for.',
      controls:
        'A run screen with one slider before the run starts: passes, one to six. Everything after that is execution.\n\nDuring the run the deck shows three meters: draw remaining against the tower\'s book, grade yield accumulating by screen, and the exposure counter, which is shared and which does not reset between runs.\n\nBetween passes the player can retune mesh, slope and feed. The tuning interface shows the yield curve moving, which is the one place in the mechanic where skill visibly beats money.',

      rules: [
        'Passes are declared before the run and cannot be extended mid-run. Under-declaring wastes a haul; over-declaring wastes water the party has already paid for.',
        'Each pass consumes posted draw. Draw is bought against a tower\'s book at the day\'s price, or bought at bond rates, or taken by short-issuing the crew.',
        'Grades one to four pay wages. The fifth pays well. The sixth rides the last mesh and needs about forty casks of extra wash on top of the run.',
        'The exposure counter is per person and permanent. It does not decay, it is not healed in this city, and it is the reason sift crews waste.',
        'Short-issuing the crew buys the sixth grade and the crew knows which you did before the shift ends. There is no way to hide it and the mechanic should not offer one.',
        '[[skill.sieve-tuning|Sieve Tuning]] shifts the yield curve toward the grade you want. [[skill.charge-blending|Charge Blending]] opens fresh drift faces and changes what goes into the hopper in the first place.',
        '[[item.sift-screen|Sift screens]] are consumable, rated by count, and never sold second-hand. A worn screen quietly costs a grade.',
        'The Pale Assay\'s six stamps are the price structure of the entire trade, and the stamps can be bought. A true sixth-grade concentrate stamped as a fourth is somebody\'s whole year.',
      ],
      variables: [
        row({ name: 'passes', range: '1 to 6', note: 'Declared before the run. Six is the only way to the top grade and is rarely paid for honestly.' }),
        row({ name: 'drawPerPass', range: '9 to 40 casks', note: 'Rises steeply with pass number. The sixth pass alone is about forty casks of extra wash.' }),
        row({ name: 'drawPrice', range: '1 to 14 writ-units per cask', note: 'Posted daily by [[district.sifting-city-the-water-court|the Water Court]]. Trebles in the month after a dry season.' }),
        row({ name: 'gradeYield', range: 'grades 1 to 6, by mass fraction', note: 'Curve shaped by tuning, feed material and screen wear. Grade 6 is a fraction of a per cent even at best.' }),
        row({ name: 'exposure', range: '0 to 100 per person, permanent', note: 'Shared across the deck. At 60 the cough starts; at 85 the person cannot work a full shift again.' }),
        row({ name: 'crewIssue', range: '0 to 100 per cent of stated ration', note: 'Below 100 is short-issuing. Crew morale, informing and desertion all key off it.' }),
        row({ name: 'screenWear', range: '0 to 100 per screen', note: 'Consumable. Past 70 the mesh passes material it should hold and the top grade quietly vanishes.' }),
      ],
      dependencies: [
        'A per-character persistent condition track for exposure that no healing in the game removes',
        'Water as a tradable, priced, finite resource with a daily posting',
        '[[skill.sieve-tuning|Sieve Tuning]] and [[skill.charge-blending|Charge Blending]]',
        '[[machine.the-sieve-cascade|The Sieve Cascade]] and its downstream chains',
        'A grading and stamping system, since the stamp and the material are separate objects',
        '[[mechanic.standing-ledger|The Standing Ledger]] for draw bought at bond rates',
      ],
      progression:
        'The party starts as a crew: they feed, they breathe, and somebody else declares the passes. Then they hire a deck of their own, which means they are the one deciding whether to short-issue. Then they hold draw of their own against a tower\'s book, which takes them out of the daily price and into the water politics.\n\nThe last step is the stamp. [[landmark.the-cut-house|The Cut House]] holds six punches that decide the price of everything the Pans produce, and a party that can influence the punches has stopped playing the extraction loop and started playing the price.',
      rewards: [
        'Reliable access to grade five, which is a living rather than a wage',
        'Standing draw against a tower book, which insulates the party from the daily price',
        'A deck of your own, with the crew decisions that come with it',
        'An [[item.assayers-tray|assayer\'s tray]] and the field licence to use it',
        'Influence over the six grade stamps, which is influence over the whole trade',
      ],
      failureStates: [
        'Dry run. Draw exhausted before the declared passes are complete. Spoil is wasted, water is spent, nothing is stamped.',
        'Crew walks. Short-issued once too often. They take the tuning knowledge with them and talk on Assay Row.',
        'Exposure ceiling. A character past the counter\'s upper band cannot work a deck again in this campaign, and that is permanent.',
        'Undergraded. The sift is stamped below its true value by the Assay. Legal, common, and provable only with [[quest.pan-fever|independent assay]].',
        'Collapse. Feeding a live salt-mason crust gives way under the deck, which is a mass-casualty event and how [[creature.salt-mason|the richest sift]] is found in the first place.',
      ],
      edgeCases: [
        'Fines. The powder off the last screen sells as [[item.pale-dust|pale dust]], a stimulant that is illegal in three cities and pays better than grade four. Selling it is a real economic option, and it is what the party\'s crew is already breathing.',
        'Party members as crew. If the players work their own deck, the exposure counter is theirs. Most groups only notice this on the fourth run.',
        'Buying draw from the Water Court on credit. Draw at bond rates is the fastest legitimate route into indenture in this city.',
        'A run in the far pans. Eight days out, no posted draw, no tower book, and whatever water the party carried. [[npc.sahat-belek|Sahat Belek]] works this way and is unusual for surviving it.',
        'The stamp and the mineral parting company. A stamped sack can be emptied and refilled. This is the standard fraud and it is what makes the Assay\'s die room worth guarding.',
        TBD('Does exposure have any treatment at all anywhere in the world, or is it deliberately permanent? [[item.fever-clay|Fever clay]] treats a different thing entirely.'),
      ],
      implementationNotes:
        PROPOSAL('The pass bid, the water cost, the six grades and the exposure counter are established in the city entry. Draw volumes, prices and the wear curve are proposed.') +
        '\n\nThis is the most build-ready mechanic in the set and should ship first as the model for the others: one declared decision, three visible meters, a permanent consequence.\n\nThe exposure counter must be shared with NPC crew and must be inspectable. If the player can see their crew\'s numbers rising next to their own, the short-issue decision does not need any moralising from the game.\n\nDo not add an equipment upgrade that removes the water cost. The water cost is the mechanic.',
    },
  }),

  /* ================================================================ */
  /* THE MAGIC CITY — Ward Load                                        */
  /* ================================================================ */

  E({
    id: 'mechanic.ward-load',
    type: 'mechanic',
    name: 'Ward Load',
    aka: ['The Load Roll', 'Rated tonnage'],
    status: 'draft',
    summary: 'Every binding carries a rated tonnage, a named caster and a recut date. Miss the round and what it holds comes down on schedule.',
    tags: ['magic', 'infrastructure', 'maintenance', 'signature', 'magic-city'],
    fields: {
      purpose:
        'To make structural magic into scheduled maintenance. Nothing in [[city.magic-city|the Magic City]] floats because it is wonderful; it stays up because a named person recut a chalk line on a date and signed for it. The purpose is to let players read a city as a maintenance backlog, and to make the collapse, when it comes, arrive on a timetable rather than as a surprise.',
      category: 'Magic',
      implStatus: 'Specified',

      loop:
        '1. READ. Any binding can be read with [[skill.chalk-hand|Chalk Hand]]: what it is holding, its rated tonnage, its caster and how near the line is to failing.\n2. CHECK. [[landmark.the-load-roll|The Load Roll]] carries a dated plate for every binding in the city. The plate and the line do not always agree.\n3. RECUT. Chalk lines go dead within a season. Recutting on schedule is ordinary licensed labour and most of the city\'s magical employment.\n4. RE-RATE. Changing what a binding carries needs [[skill.load-binding|Load Binding]] and a new plate. Adding mass without re-rating is the common crime and the common accident.\n5. DISCHARGE. Every working accrues Toll. Lawful practitioners bleed off into a licensed sink and take a receipt. See [[mechanic.the-toll|the Toll]].\n6. FAIL. A missed round does not fail dramatically. It fails on the date, under the load it was carrying that morning.',
      controls:
        'Bindings are visible in the world as chalk or cut lines with a small dated plate. Looking at one with Chalk Hand shows four figures: rated tonnage, current load, caster name, days to recut.\n\nThe Load Roll is a searchable public wall. It is the city\'s maintenance database rendered as a landmark, and reading it is a legitimate way to plan a heist, a rescue or a murder.\n\nRecutting is a timed interaction consuming [[material.ward-chalk|ward chalk]] and accruing Toll. Re-rating is a longer one that also produces a plate, and a plate carries the caster\'s name for as long as the binding stands.',

      rules: [
        'Every binding has a rated tonnage, a named caster and a recut date. All three are public on the Load Roll.',
        'Chalk lines die within a season regardless of use, so warding is a repeat-order business and the marl beds are a chokehold on the entire trade.',
        'Load above rating does not fail immediately. It fails at the next stress event, which may be weeks later and will be attributed to something else.',
        'Recutting accrues Toll on the caster. A recut round of any size is a scheduling problem for a practitioner\'s own body, not just their day.',
        'Adulterated chalk assays clean and fails under load. This is a supply-chain attack the city is not equipped to detect, which is the premise of [[quest.the-chalk-that-lies|The Chalk That Lies]].',
        '[[creature.chalk-louse|Chalk lice]] eat ward chalk and lime binder, voiding wards silently. An infestation reads as a maintenance failure and is not one.',
        'Nine chains bind [[landmark.the-bound-fault|the Bound Fault]] and two are already dead. The city holds the only person who knows which two rather than say the number aloud.',
        'Shorted alloy in replacement links passes cold inspection and fails under sustained load. [[npc.toval-cherek|The chain-smith]] knows exactly which sections carry his work.',
      ],
      variables: [
        row({ name: 'ratedTonnage', range: '0.5 to 400 tonnes per binding', note: 'On the plate. Structural bindings under the slabs are the heavy end; a door ward is under a tonne.' }),
        row({ name: 'currentLoad', range: '0 to whatever has been stacked on it', note: 'Real, physical, and changed by anyone who moves goods across the city without telling anyone.' }),
        row({ name: 'daysToRecut', range: '0 to 120', note: 'Chalk dies within a season. Cut stone wards last years and cost proportionally.' }),
        row({ name: 'chalkPurity', range: '0 to 100 per cent', note: 'Adulterated chalk assays clean. Only a load test tells the truth, and a load test is a building.' }),
        row({ name: 'tollAccrued', range: 'see [[mechanic.the-toll|the Toll]]', note: 'Per caster, per working. The maintenance economy is limited by bodies, not by chalk.' }),
        row({ name: 'backlog', range: '0 to n overdue bindings, city-wide', note: 'Public on the Load Roll. Currently large. The number nobody in office wants read aloud.' }),
        row({ name: 'liveChains', range: '7 of 9', note: 'The Bound Fault. Two dead. Which two is held by one imprisoned person.' }),
      ],
      dependencies: [
        '[[mechanic.the-toll|The Toll]], which is the cost side of every working here',
        '[[skill.chalk-hand|Chalk Hand]], [[skill.ward-cutting|Ward Cutting]] and [[skill.load-binding|Load Binding]]',
        '[[material.ward-chalk|Ward chalk]] supply and its licensed [[machine.the-ward-kilns|kilns]]',
        '[[material.quenchspar|Quenchspar]] sinks for lawful discharge',
        'A structural model that can drop a slab on a schedule and reroute a district afterwards',
        '[[faction.fetterhouse|The Fetterhouse]] licence roll, which decides who is allowed to work at all',
      ],
      progression:
        'A party begins by reading lines they cannot cut. Chalk Hand is cheap and turns the whole city into readable information: which streets are overdue, which landlord is lying, which slab is carrying twice its plate.\n\nWard Cutting makes them employable. Load Binding makes them structurally responsible, and the name on the plate is theirs. The last step is not a bigger working, it is a seat on the rota: deciding which of the overdue bindings gets this month\'s chalk and which district is asked to wait.',
      rewards: [
        'A licence, which is employment, an alibi and a leash in one document',
        'Plates in your own name, which is professional standing and permanent liability',
        'A quenchspar sink allocation, which is what makes sustained work survivable',
        'Access to [[district.magic-city-under-slabs|the Under-Slabs]], where the load-bearing work is',
        'A hearing at the chain-house, and standing to argue about the two dead chains',
      ],
      failureStates: [
        'Overdue lapse. The binding fails on schedule, under the load it happened to be carrying that morning, onto whoever is beneath it.',
        'Bad chalk. Passes assay, holds for weeks, fails under load. The batch is traceable; the deaths are already counted.',
        'Overload by ignorance. A party moves cargo across a district and re-rates nothing. Nobody arrests them and something comes down two weeks later.',
        'Named on the plate. A binding the party signed for fails, and the plate says who. Liability here is not a fine, it is the licence and then the charge.',
        'Chain slippage. A dead chain on the Bound Fault is discovered by being loaded. This is the city-ending failure state and should stay reserved.',
      ],
      edgeCases: [
        'A binding holding something the party wants down. Letting a lapse run is a murder with a public timetable and no caster to prosecute.',
        'Load moved by weather or water rather than people, which nobody signs for and the Roll cannot record.',
        '[[spell.holdfast-binding|Holdfast bindings]] on a public register versus chalk lines on a wall: same mechanic, different lifespan and different paperwork.',
        'Unlicensed recutting. Fully possible with the skill, entirely illegal, and it leaves no plate, so the next practitioner has no idea what the line is rated for.',
        'A district that has been quietly over-rated for years and is fine. The mechanic must allow this, because it is why nobody believes the backlog matters.',
        TBD('What is the lawful procedure when a caster named on a plate dies? Does the binding revert to the licensor, or does it simply stop being anyone\'s problem?'),
      ],
      implementationNotes:
        PROPOSAL('The rated tonnage, named caster and recut date, and the nine chains with two dead, are established in the city entry. Backlog handling and chalk purity are proposed.') +
        '\n\nBuild the Load Roll as real data. Every binding in the city should be an object with a plate, and the landmark should just be a view onto that table. It doubles as the designer\'s debugging tool.\n\nFailures must be scheduled, announced and boring. The horror is that everyone can read the date. A collapse that surprises the player is a worse scene than one they watched approach for three weeks.\n\nThis mechanic and [[mechanic.the-toll|the Toll]] are one system split in two: Ward Load is what the magic does, the Toll is what it costs. Neither should be built without the other.',
    },
  }),

  /* ================================================================ */
  /* THE ARENA CITY — The Ring Bond                                    */
  /* ================================================================ */

  E({
    id: 'mechanic.ring-bond',
    type: 'mechanic',
    name: 'The Ring Bond',
    aka: ['The Bond', 'Signing for a card'],
    status: 'draft',
    summary: 'Sign for a sum and the Ring keeps a share of you. Tiers set the stipulations, injuries persist, and the paper is transferable.',
    tags: ['combat', 'indenture', 'contract', 'signature', 'arena-city'],
    fields: {
      purpose:
        'To offer the players a solution, because that is how it is offered to everyone else in [[city.arena-city|the Arena City]]. Money now, obligation later, and the obligation is enforced on the body. The purpose is not to punish players for signing. It is to make the terms genuinely good on the day, and to let the consequences arrive slowly enough that the party has time to build a life on top of them.',
      category: 'Combat',
      implStatus: 'Prototype',

      loop:
        '1. SIGN. A sum now, against a card count and a tier. The bond names a share of the signer, and the share is a number.\n2. CARD. Fight the card. Stipulations attach to the tier: weapons, ground, water, whether the bout can end short of a kill.\n3. CARRY. Injuries persist between cards and the city does not heal them. The third card is fought with the second card\'s arm.\n4. SETTLE. Winnings reduce the bond. Losses do not increase it, but stipulation breaches and forfeits do.\n5. TRANSFER. The share is tradable. The bond a party signed with a banner-master may be held next month by [[faction.red-writ|the Red Writ]], a Gilded Ascent house, or someone they have just made an enemy of.\n6. CLEAR OR RENEW. Clearing the bond gives a manumission and a [[item.quitblade|quitblade]]. Renewing gives a better sum and a worse tier.',
      controls:
        'A bond sheet showing the outstanding sum, the share percentage, cards remaining, the current tier and the stipulations attached to it. The holder\'s name is on the sheet and it changes without warning.\n\nBefore each card the player sees the stipulations as a list and can attempt to work them: [[skill.ring-craft|Ring Craft]] reads the card and negotiates the terms, [[skill.crowd-turning|Crowd Turning]] can move a tier and can also start a riot the stewards will price in blood.\n\nInjuries appear on a persistent body panel, not a health bar. They are named, located and they do not clear on rest.',

      rules: [
        'A bond is a sum, a card count, a tier and a share. The share is what the Ring keeps of your winnings, your appearance fees and, at the top tiers, your movement.',
        'Injuries persist between cards and are not healed by the city. Surgery exists and is engineering: [[skill.bonewright|Bonewright]] sets bone, pins it and takes limbs, and there is no magical alternative.',
        'Stipulations harden as the tier rises. Low tiers restrict weapons, high tiers restrict outcomes, and the top tier restricts whether you may stop.',
        'The share is transferable without the signer\'s consent. Who holds your paper is a fact you find out, not a fact you agree to.',
        'A [[item.tallyblade|tallyblade]] is notched by the ring-clerks, one notch per sanctioned kill, and the notches are read as a debt ledger by anyone who can count.',
        'Cleared bonds are proved by paper, not by memory. [[npc.aylun-torgai|Aylun Torgai]]\'s manumission was signed and voided over a mis-stamped seal, and the original is three floors under the sand.',
        'Fights are not fixed by bribing fighters. [[npc.berke-chagra|The bookmaker]] buys the water ration instead: two dry days and a fighter loses honestly, and nothing can be proved from the bout.',
        'The dead go to [[machine.the-char-retorts|the retorts]] unless claimed, and families pay a fee to recover a body. The [[landmark.the-claim-wall|Claim Wall]] holds the names for nine days.',
      ],
      variables: [
        row({ name: 'bondSum', range: '20 to 4,000 writ-units', note: 'Paid up front. The high end is life-changing money and is offered to people the Ring expects to keep.' }),
        row({ name: 'share', range: '10 to 60 per cent', note: 'What the Ring keeps. Above 40 the bond starts constraining where the signer may live.' }),
        row({ name: 'cardCount', range: '3 to 40 cards', note: 'Remaining obligation. Cards are scheduled by the Ring, not by the fighter.' }),
        row({ name: 'tier', range: '1 to 6', note: 'Sets stipulations and purse. Tier 5 and 6 cards do not have a defined stopping condition short of one.' }),
        row({ name: 'injuryLoad', range: '0 to n named, persistent injuries', note: 'Located and permanent unless surgically addressed. Each one narrows the options in the next bout.' }),
        row({ name: 'waterRation', range: '0 to 100 per cent of issue', note: 'Two days under issue costs a fighter the bout. The steward\'s tally is the only evidence.' }),
        row({ name: 'holderId', range: 'any faction, house or person', note: 'Changes without notice. The party learns who holds them when the holder wants something.' }),
      ],
      dependencies: [
        'A persistent injury model separate from hit points, with named locations',
        'A transferable contract object shared with [[mechanic.standing-ledger|the Standing Ledger]] and the bond trade',
        '[[skill.ring-craft|Ring Craft]] and [[skill.crowd-turning|Crowd Turning]]',
        '[[skill.bonewright|Bonewright]] as the only repair path, since there is no healing magic in this world',
        'A cross-city labour register, because an [[item.indenture-bond|indenture bond]] signed here is enforceable elsewhere',
        'Crowd state as a variable the party can move and be hurt by',
      ],
      progression:
        'The arc is not from weak fighter to strong fighter. It is from signer to holder. A party works cards, clears their share, and then discovers that clearing a bond and being free are different documents. Above that sits the bond trade itself: buying other people\'s paper, which is lucrative, lawful in this city, and exactly what the party has spent forty hours resenting.\n\n[[quest.the-indenture-column|The Indenture Column]] is the same question at freight scale, with a column on a manifest for people.',
      rewards: [
        'The sum itself, which is a real and immediate answer to a real problem',
        'Tier standing, which opens the banner streets and the stewards\' rooms',
        'A [[item.quitblade|quitblade]], which proves you are not owned and is worth forging',
        'Cage keys and tunnel access under the sand, the best currency in the city',
        'The contract vault, which holds every original and is three floors down',
      ],
      failureStates: [
        'Bond outstanding at the end of the card count. It renews automatically at the Ring\'s tier, not yours.',
        'Crippled. A persistent injury that ends a fighting career without ending the bond, which is the ordinary end of this system.',
        'Paper held by an enemy. The party\'s obligations become somebody else\'s lever and the schedule turns hostile.',
        'Manumission voided. Freed on paper, owned in fact, and the original is in a vault under the arena.',
        'The Claim Wall. Nine days chalked, then the retorts and the char goes east. Handled through the ledger and the fee, never as spectacle.',
      ],
      edgeCases: [
        'A party member who never signs. Perfectly viable. They should still be offered a bond every time the party is short, by people who mean it kindly.',
        '[[spell.yokebreak-draught|Yokebreak draught]] and [[item.cinderroot-cordial|cinderroot cordial]]: legal here, contraband elsewhere, and both cost the user something the bond does not account for.',
        'Flooded cards. The under-stables have imported animals breeding under the stands, and the young are getting out of the pens built for the adults.',
        'Buying out a bond. Always possible at a premium. The premium rises the moment the holder learns somebody cares about the signer.',
        'Signing on behalf of someone else. Legal, and the standard way a family clears a debt. The person signed for does not have to be present.',
        TBD('Is a bond signed in the Arena City enforceable in [[city.mediterranean-city|the Mediterranean City]], where indenture is void? The manifest says void and prosecutable; the extradition mechanism is unwritten.'),
      ],
      implementationNotes:
        PROPOSAL('Sum, share, tier, stipulations, persistent injury and transferable paper are established in the city entry. The specific ranges are proposed.') +
        '\n\nThe two rules that make this bite are persistence and transferability. Build both before building a single fight.\n\nThe game must never editorialise at the moment of signing. The offer is good, the recruiter is decent, and the terms are printed. Everything the entry wants to say is said by the third card, by the arm.\n\nWrite the Claim Wall and the retorts through paperwork: the nine days, the fee, the ledger. Never a scene of the machine working.',
    },
  }),

  /* ================================================================ */
  /* THE FLOATING SWAMP SETTLEMENT — The Re-Moor                       */
  /* ================================================================ */

  E({
    id: 'mechanic.the-remoor',
    type: 'mechanic',
    name: 'The Re-Moor',
    aka: ['The Draw', 'The drift'],
    status: 'draft',
    summary: 'Twice a year the draw relays the settlement. Neighbours, routes and addresses change, and moorings are bid for.',
    tags: ['social', 'traversal', 'property', 'signature', 'floating-swamp'],
    fields: {
      purpose:
        'To build a settlement that cannot be memorised. In [[city.floating-swamp-settlement|the floating settlement]] the map is a lease. Twice a year the lots are drawn again off [[landmark.the-moorstone|the Moorstone]], and any relationship the party built on proximity is quietly reshuffled. The purpose is to make location a thing players spend on and can lose, rather than a thing they learn once.',
      category: 'Social',
      implStatus: 'Specified',

      loop:
        '1. POST. Bearings for the coming drift go up on [[landmark.the-lot-board|the Lot Board]]: three hundred and eighty lot numbers against this drift\'s positions.\n2. BID. Clans and households bid for lots. Bids are in draw priority, favours and sluice-time as often as in coin, which is what makes the draw political rather than commercial.\n3. DRAW. [[faction.moorstone-compact|The Compact]] reads the draw. It is final, public, and there is no appeal that does not involve cutting somebody\'s lines.\n4. MOVE. Combs pole to their new bearings over about four days. Nothing is where it was.\n5. RE-LEARN. Routes change, neighbours change, the way from your lodging to the Compact hall changes, and the contact who mattered because they were next door stops mattering.\n6. LIVE WITH IT. Until the next draw.',
      controls:
        'The city map is versioned. The party sees the current drift, and can look at the previous one, which is how they work out what they lost.\n\nBidding is a single screen: lot number, current high bid, and what the bid is denominated in. Draw priority is a holdable resource shown alongside coin, and spending it costs the party standing with whoever they got it from.\n\nAfter the draw, every known NPC\'s location updates at once and the party is told which of their contacts have moved out of reach. That notification is the mechanic\'s whole emotional payload.',

      rules: [
        'The draw runs twice a year and moves every lot. There is no grandfathering and no permanent address.',
        'The settlement can only re-moor within about nine miles of the Moorstone. That radius is the constitution, which is why drifting the whole settlement upriver is a crisis and not a change of address.',
        'A lot without an [[item.moor-stake|iron-shod moor stake]] cut with an owner mark is not property. Property law here is a stake and a cord.',
        'Bids are denominated in draw priority as often as in coin, and draw priority is owed rather than bought. Every lot the party wins puts them in debt to a clan.',
        'Tail lots are cheap because the Tail is where the water goes when [[city.black-weir|the Weir]] opens. The market prices this correctly and people take the lots anyway.',
        '[[creature.raftbloom|Raftbloom]] pontoons rot on a season and rotting mats breed marsh fever, so the drift is also a public-health event.',
        'Gas taps must be re-sited every drift, so no field is held for long and [[machine.the-fen-damp-taps|the taps]] are a recurring negotiation rather than an asset.',
        'Crossing between combs at speed needs [[skill.marsh-footing|Marsh Footing]]. Without it, a party that could walk to a contact last season now cannot reach them at all.',
      ],
      variables: [
        row({ name: 'lots', range: '380', note: 'Numbered on the Lot Board. Roughly stable in count, never stable in position.' }),
        row({ name: 'drawPriority', range: '0 to 100 per household', note: 'The real bidding currency. Held, owed, traded, and never printed.' }),
        row({ name: 'moorRadius', range: 'about 9 miles from the Moorstone', note: 'The limit of a lawful re-moor. Exceeding it is a constitutional act, not a navigational one.' }),
        row({ name: 'driftInterval', range: '2 per year', note: 'Scheduled. The date is known; the bearings are not until the board goes up.' }),
        row({ name: 'lotExposure', range: 'Head / Middle / Tail', note: 'Where a lot sits relative to a weir release. Tail lots are cheap for exactly one reason.' }),
        row({ name: 'contactReach', range: 'per NPC, recomputed each drift', note: 'Whether a known NPC is still reachable on foot. The party is told when it changes.' }),
        row({ name: 'matRot', range: '0 to 100 per pontoon', note: 'Raftbloom decay. Past 70 the mat is a fever risk as well as a flotation one.' }),
      ],
      dependencies: [
        'A city map that can be re-laid without breaking quests anchored to it',
        'NPC locations resolved as lot references rather than fixed coordinates',
        '[[skill.marsh-footing|Marsh Footing]] as the traversal gate between combs',
        '[[mechanic.the-sluice-book|The Sluice Book]], since weir releases decide what a Tail lot is worth',
        'A non-coin favour currency the world already understands, shared with faction reputation',
        '[[landmark.the-moorstone|The Moorstone]] as the fixed reference the entire settlement is defined against',
      ],
      progression:
        'A party starts as tenants with a lot they were given, in a comb they did not choose. Winning a bid puts them in one clan\'s debt. Holding draw priority of their own makes them a party other households bid through, which is the first real power in this settlement.\n\nThe top of the mechanic is not a permanent address. It is a say in where the whole settlement moors, which is the fight [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is quietly losing on the Weir\'s behalf, with three clans ready to cut her lines.',
      rewards: [
        'A lot in the head of the drift, out of the water\'s way',
        'Draw priority of your own, which is favour rendered as a number',
        'A stake and owner mark recognised by the Compact, which is what property means here',
        'A gas field held for one drift, which is the delta\'s only real export',
        'A voice in where the settlement moors next, which is the actual seat of power',
      ],
      failureStates: [
        'Drawn into the Tail. Playable, cheap, and one weir release from disaster.',
        'Cut adrift. The Compact can refuse a mooring outright. A comb with no lot is not exiled, it is simply not tied to anything.',
        'Contacts lost. NPCs the party relied on are now four combs and a bad channel away, and some of them will not wait.',
        'Rot. An unmaintained mat fails under a structure, which is a drowning and a fever outbreak in the same week.',
        'The upriver drift. If the settlement moves into the Weir\'s toll reach, the whole delta economy is repriced and three clans go to knives over it.',
      ],
      edgeCases: [
        'Quests anchored to a place. Any content pinned to a lot must survive the draw. Anchor to lot numbers and clans, never to coordinates.',
        'A party that owns a building. Buildings float. The building moves with the lot and the neighbourhood does not come with it.',
        'Bidding against a clan the party owes. Legal, and the debt is called on the spot.',
        'The low-water route. A third of [[npc.gwill-ossekind|Gwill Ossekind]]\'s notched staves are wrong or gone, so the eastern approach is currently unowned and unmarked.',
        'A drift during a quest deadline. The draw does not wait for the party, and a four-day move can eat an eleven-day clock.',
        TBD('What happens to a lot whose holders all die between drifts? Does it revert to the Compact, to the neighbouring comb, or go to the board unclaimed?'),
      ],
      implementationNotes:
        PROPOSAL('The twice-yearly draw, the Lot Board, the nine-mile radius and the Tail\'s exposure are established in the city entry. Priority as a currency is proposed.') +
        '\n\nThe single hardest engineering requirement in this file: every piece of content in this settlement must be anchored to a lot or a clan, never to a position. Get that wrong once and the first draw breaks four quests.\n\nThe post-draw notification is the whole feature. Tell the player, by name, which of their people they can no longer reach on foot. Everything else is bookkeeping.',
    },
  }),

  /* ================================================================ */
  /* THE BLACK WEIR — The Sluice Book                                  */
  /* ================================================================ */

  E({
    id: 'mechanic.the-sluice-book',
    type: 'mechanic',
    name: 'The Sluice Book',
    aka: ['Gate-hours', 'The book'],
    status: 'draft',
    summary: 'Buy a gate-hour at the weir to float your barge or strand a rival, then answer for where the water went.',
    tags: ['economy', 'water', 'proposal', 'signature', 'black-weir'],
    fields: {
      purpose:
        'To turn a river into a bookable resource with a downstream. [[city.black-weir|The Black Weir]] sells passage, but what it manufactures is certainty, and it manufactures it by rationing. The purpose is to give players a lever they can genuinely pull, and to make sure that four hours after they pull it they find out what it cost somebody they have met.',
      category: 'Economy',
      implStatus: 'Concept',

      loop:
        '1. READ. The book lists ninety-six gate-hours a week. Thirty are reserved to [[faction.iron-sluice-company|the Company]] and never reach the market.\n2. BUY. The remaining hours are sold, short-sold and traded in [[district.black-weir-the-slack|the Slack]], where a hundred barges are tied three deep and waiting.\n3. USE, OR DENY. An hour floats your barge. It also, bought and left unused, denies the gate to whoever needed it, which is a legitimate and common purchase.\n4. MOVE. Having an hour rescheduled is the expensive option, because moving one booking moves every booking after it.\n5. OPEN. The gate opens. Eleven feet of head goes somewhere.\n6. ANSWER. Four hours later the delta finds out. [[landmark.the-flood-post|The Flood Post]] records the height and the date, and has no column for what it landed on.',
      controls:
        'A week board of ninety-six hours: bay group, hour, holder, and whether the hour is booked, short-sold or reserved. The party\'s hours are outlined.\n\nBuying is a bid. Rescheduling is a negotiation with a Weirmaster and a cascade preview, which shows every later booking that will move and who holds it. That preview is the mechanic\'s conscience and should always be shown.\n\nDownstream consequence arrives as a delayed world event rather than a prompt: a message, a body, a ruined crop, a settlement that has moved.',

      rules: [
        'Ninety-six gate-hours a week. Thirty reserved to the Company, so a third of the river\'s capacity never reaches the market at all.',
        'An hour is a property right. A booked hour can be sold, short-sold, inherited and stolen, and hours are short-sold three deep in the Slack right now.',
        'Passing a gate unbooked is theft of water: forfeiture of cargo and gallery shifts, and the cargo is the point.',
        'Interfering with a gate, chain or winch is charged as murder regardless of outcome, because that is what it usually is.',
        'Rescheduling one hour reschedules everything after it. The cascade is visible, and every person it touches remembers who moved it.',
        'Every opening puts water somewhere. Downstream lots, fields and [[food.tide-rice|rice mats]] take it, and the schedule that decides whose is one book in one room.',
        'The slack hour between scheduled openings is the only time a small boat can work a disused bay. [[landmark.the-eleventh-sluice|The Eleventh Sluice]] is workable for about forty minutes and has drowned two crews.',
        'Two bays are held for the spring [[creature.blackrun-lamprey|lamprey run]] and opened on a pattern the fish read better than the crews do. That fortnight is the most profitable of the Weir\'s year.',
      ],
      variables: [
        row({ name: 'gateHours', range: '96 per week, 30 reserved', note: 'Fixed by the works. The reserved third is the Company\'s actual product.' }),
        row({ name: 'hourPrice', range: '4 to 300 writ-units', note: 'Ordinary hours are cheap. An hour on the day a fleet is waiting is not, and everyone can see the fleet.' }),
        row({ name: 'shortInterest', range: '0 to 3 deep', note: 'Hours sold that the seller does not hold. One bad week calls the whole market.' }),
        row({ name: 'head', range: '4 to 11 feet', note: 'Eleven at low water, four at flood. Sets how much water an opening actually delivers downstream.' }),
        row({ name: 'cascadeDepth', range: '0 to 40 later bookings', note: 'How many holders a reschedule disturbs. Shown before confirming, always.' }),
        row({ name: 'downstreamMetres', range: '0 to 1 metre of water, within hours', note: 'What a release puts on a named settlement. The Company has done it once off the record.' }),
        row({ name: 'slackWindow', range: 'about 40 minutes', note: 'Between scheduled openings. The only workable time in a disused bay, and the only reason to try.' }),
      ],
      dependencies: [
        'A schedule object with holders, transfers and a visible cascade',
        '[[mechanic.the-remoor|The Re-Moor]], because a release lands on lots whose positions the draw decided',
        '[[skill.plain-letters|Plain Letters]] to read a booking, [[skill.brokerage|Brokerage]] to move one, [[skill.fence-work|Fence Work]] for the slack hour',
        'A delayed-consequence system, since the point is that the cost arrives after the scene ends',
        '[[machine.the-sluice-hammers|The Sluice Hammers]], which run on the same head the toll is priced on',
        'Downstream settlement state that can actually be flooded and stay flooded',
      ],
      progression:
        'Buying an hour is entry level and expensive. Holding standing hours is the merchant tier. Short-selling hours you do not hold is the speculator tier and is how fortunes are made and called in the Slack.\n\nAbove all of it sits the book itself, which is one volume in one room with [[npc.ost-vennick|Ost Vennick]] sleeping beside it. A party that reads the book knows every release for a season. A party that holds it can put a metre of water anywhere in the delta and call it maintenance.',
      rewards: [
        'Standing gate-hours, which convert waiting into scheduling',
        'Company transit seals, which open gates upriver and are paid out by [[npc.dagren-hoyle|gantry crews]] instead of coin',
        'Advance sight of the schedule, which is the most valuable information in the eastern water',
        'A working knowledge of the five chained-open bays nobody has surveyed since the flood',
        'The lamprey pattern, and the fortnight it prints money in',
      ],
      failureStates: [
        'Hour missed. The barge waits a week in the Slack and the cargo is a week older, which for some cargo is the whole loss.',
        'Short squeeze. Hours sold that cannot be delivered. The market calls, the seller is ruined, and the crews who trusted the paper are stranded.',
        'Caught passing unbooked. Cargo forfeit, gallery shifts uncounted, and the shifts are counted by the Company.',
        'Drowned in the slack hour. The Eleventh Sluice has taken two crews and is honest about the odds, which is why the pay is what it is.',
        'The cordon. Closing the gates to stop a fever upriver starves the delta, which eats what the river brings and nothing else.',
      ],
      edgeCases: [
        'An hour bought purely to deny it. Entirely legal and entirely legible to everyone watching the board.',
        'A release timed as maintenance. Indistinguishable from an accident, and the only evidence is the book.',
        'Forged bills of health. The drinking main is tapped above every discharge, so a paperwork failure upriver is a lethal problem here rather than an administrative one.',
        'The [[faction.bonewax-post|Bonewax Post]] passes every gate unbooked. It is the only standing exception in the book and nobody has priced what it costs.',
        'A party that owns hours and never uses them. Legitimate, profitable, and it makes them a market participant that other people plan around.',
        TBD('Who audits the reserved thirty? The Company has never prosecuted itself and no external body is established as having standing to look.'),
      ],
      implementationNotes:
        PROPOSAL('The Black Weir is a canon name only. Ninety-six hours, thirty reserved, and the book in the sluice-master\'s room come from the proposed city entry. Everything numerical here is proposal and should be overwritten freely if the Weir is redefined.') +
        '\n\nThe cascade preview and the delayed downstream event are the two things worth building. Without the preview the party cannot be culpable; without the delay they never feel it.\n\nKeep the Weir\'s own history thin. The mechanic works without anyone deciding who cut the first sill, and it should stay portable enough to move to another authority if the Weir is rewritten.',
    },
  }),

  /* ================================================================ */
  /* ORATH — The Ration Board                                          */
  /* ================================================================ */

  E({
    id: 'mechanic.the-ration-board',
    type: 'mechanic',
    name: 'The Ration Board',
    aka: ['The Board', 'Drawing your line'],
    status: 'draft',
    summary: 'Water, powder and shot posted daily against names. Draw over your line and you owe the muster labour you cannot refuse.',
    tags: ['survival', 'labour', 'proposal', 'tbd', 'orath'],
    fields: {
      purpose:
        'To give [[city.orath|Orath]] one working system and no history. Supply on the desert margin is posted, not sold: a line against a name, refreshed before dawn. The purpose is a resource loop where the price is labour rather than money, so that a party which cannot pay is not turned away but enrolled.',
      category: 'Survival',
      implStatus: 'Concept',

      loop:
        '1. POST. Before dawn the day\'s water, powder and shot go up on [[landmark.the-ration-board|the board]], against names.\n2. READ. Find your name, find your line. A line is not a promise of supply, it is a permission to draw.\n3. DRAW. Take up to the line at [[district.orath-the-tank-yard|the tank yard]] and owe nothing.\n4. OVERDRAW. Take more, which is always allowed, and the excess is written against you in muster days.\n5. MUSTER. The debt is called when the town wants it called. Refusal is the only offence the town is known to prosecute.\n6. REPEAT. Tomorrow\'s board is posted regardless of what you did with today\'s.',
      controls:
        'A board interface, read at dawn and not otherwise. Three columns: water, powder, shot. One row per name. A running muster-day balance beside the party\'s own row.\n\nDrawing is done at the tank yard with a simple over-line confirmation that states the muster cost in days before it commits. The muster itself is a summons the party receives on the town\'s schedule, not theirs.',

      rules: [
        'The board is posted before dawn and is the only supply the town commits to.',
        'Anyone may overdraw. Overdrawing is not a crime; refusing the muster owed against it is.',
        'The muster is called at the town\'s convenience, not the debtor\'s. A party carrying muster days is a party that can be interrupted.',
        'Guild writs are not honoured in Orath, so no external creditor can collect here and no external protection applies either.',
        'Water is the binding constraint. [[food.dew-melon|Dew melons]] carry roughly two days of water each and pass as currency across the waste as readily as they pass as food.',
        '[[npc.kavel-uur|Kavel Uur]]\'s caravan is the only fixed schedule across the waste margin, and he keeps a private count of who goes in and who comes out.',
        TBD('Is there a ceiling on how many muster days one person can owe, or does the board simply keep writing?'),
      ],
      variables: [
        row({ name: 'waterLine', range: '0 to 12 litres per name per day', note: 'Posted. Varies with what is in the tanks and with who posted it.' }),
        row({ name: 'powderLine', range: '0 to 1 charge per name per day', note: 'Rationed harder than water in some seasons, which says something about the town.' }),
        row({ name: 'musterDays', range: '0 to n owed', note: 'Accrued by overdrawing. Called on the town\'s schedule. No published discharge rate.' }),
        row({ name: 'boardAuthority', range: 'unresolved', note: 'Who posts the board is deliberately unanswered. Whoever it is holds the town.' }),
        row({ name: 'wasteRange', range: 'unresolved', note: 'How far into [[region.cinder-waste|the Cinder Waste]] a party gets unguided, and what the honest failure is.' }),
      ],
      dependencies: [
        'A daily world tick that posts the board whether or not the party is present',
        'Water as a carried, consumed, priced resource shared with [[mechanic.the-sift-line|the Sift Line]]',
        'A labour-debt object distinct from money, related to but not the same as indenture',
        '[[skill.the-far-walk|The Far Walk]] and [[skill.weather-eye|Weather Eye]] for anyone leaving the road',
      ],
      progression: TBD('Is there any progression here at all, or is a bigger line the only reward Orath has to give? Deciding that decides what the town is.'),
      rewards: [
        'A larger posted line, which is the town\'s only visible form of status',
        'A place on [[npc.kavel-uur|Kavel Uur]]\'s schedule, which is the only reliable way across the waste',
        'Muster days written off, which is the closest thing to a favour the board can do',
        TBD('Does the town have anything to give that is not water? A route, a name, a licence, an absence of jurisdiction?'),
      ],
      failureStates: [
        'Line drawn to zero. The party has today\'s water and no more until dawn, in a place where that matters within hours.',
        'Muster called at the worst moment. The debt does not care what the party was doing, and refusal is the town\'s one prosecuted offence.',
        'Caught in the waste short. Dust storms close the road several times a season and there is no relief column.',
        TBD('What actually happens to someone who refuses the muster? The entry commits to it being an offence and to nothing else.'),
      ],
      edgeCases: [
        'A party that brings its own water. Entirely viable and it removes them from the town\'s only social system, which should be noticeable in how people treat them.',
        'Overdrawing on someone else\'s name. Trivially possible on a board of names, and the muster falls on the name, not the hand.',
        'A caravan arriving with more people than the board expects. The lines are cut, not extended, and everyone reads the new figures at dawn.',
        TBD('Does the board ration anything for the people already in muster, or are they fed from a different account?'),
      ],
      implementationNotes:
        PROPOSAL('Orath is a canon name with no established concept. The board is the only mechanism this entry commits to and it is deliberately thin. Do not build Orath backstory around it.') +
        '\n\nThe useful property of this mechanic is that it works without anyone deciding what Orath is. It needs a posting authority and a labour debt, and both can be attached to whatever the town turns out to be.\n\nIf a designer settles Orath, the first two questions to answer are who posts the board and what the muster does. Every other blank in this entry follows from those.',
    },
  }),

  /* ================================================================ */
  /* ORUVAI — The High Carry                                           */
  /* ================================================================ */

  E({
    id: 'mechanic.the-high-carry',
    type: 'mechanic',
    name: 'The High Carry',
    aka: ['The Carry', 'The beam price'],
    status: 'draft',
    summary: 'Porterage over the highland, priced by weight and altitude. Weather shuts the pass, and a shut pass voids the contract.',
    tags: ['traversal', 'trade', 'proposal', 'tbd', 'oruvai'],
    fields: {
      purpose:
        'To put a real toll on the highland crossing without deciding what [[city.oruvai|Oruvai]] is. Loads are broken at the yard, weighed on a public beam, and priced by mass and by the altitude they are going to. The purpose is to make a party crossing the pass decide, out loud, what they are willing to leave behind.',
      category: 'Traversal',
      implStatus: 'Concept',

      loop:
        '1. BREAK. Everything is broken down at [[district.oruvai-the-carry-yard|the carry yard]]. Nothing crosses the pass in the form it arrived in.\n2. WEIGH. Loads go on [[landmark.the-carry-beam|the Carry Beam]]. Its reading sets the price and no argument survives it.\n3. PRICE. Weight times altitude band, plus the season. The party pays an advance.\n4. CARRY. Porters take it up. The party walks with the load or does not, and walking with it changes what happens if the weather turns.\n5. SHUT. If the pass closes, the contract voids. The porters keep the advance and go home, and the load sits in the yard until spring.\n6. COLLECT. Or do not, because a load in the yard over winter is a load somebody else is storing.',
      controls:
        'A yard screen: items broken into carry-lots, each with a mass, a destination band and a price. The party chooses what goes and what stays, and the stays list is the interesting one.\n\nThe beam is a public reading, shown as a number nobody can dispute. The weather call is a forecast the party can improve with [[skill.weather-eye|Weather Eye]] and can never make certain.',

      rules: [
        'Everything is broken at the yard and weighed on the beam. The beam reading is final and is the only price mechanism in play.',
        'Price is weight times altitude band. Carrying something to the top of the pass costs several times what carrying it halfway costs.',
        'Weather shuts the pass and voids the contract. The advance is not returned, which is not sharp practice; it is what makes anyone willing to be a porter.',
        'A voided load sits in the yard until spring under whatever storage arrangement the party can negotiate, and storage in Oruvai is a favour rather than a service.',
        '[[skill.the-far-walk|The Far Walk]] and [[skill.cold-camp|Cold Camp]] decide whether a party can wait out a closure on the mountain rather than losing the season.',
        '[[npc.anwe-halduri|Anwe Halduri]] pays in advance, in cut stone, and refuses every invitation to travel back with her, which is the only established fact about how Oruvai does business.',
        TBD('Who owns the beam, and does its owner set the altitude bands or merely read them?'),
      ],
      variables: [
        row({ name: 'carryWeight', range: '0 to porter-team capacity', note: 'Broken into lots at the yard. Party carry capacity is irrelevant; the yard\'s is what counts.' }),
        row({ name: 'altitudeBand', range: '1 to 4', note: 'Destination band. Band 4 is over the top, and its multiplier is what makes people leave things behind.' }),
        row({ name: 'carryPrice', range: 'weight x band x season', note: 'The whole formula. Deliberately simple so it can move to another authority intact.' }),
        row({ name: 'passState', range: 'Open / Marginal / Shut', note: 'Weather-driven. Marginal is where the interesting decisions are and where porters refuse.' }),
        row({ name: 'closureLength', range: '1 day to a season', note: 'A short closure costs time. A long one costs the contract and the year.' }),
        row({ name: 'yardStorage', range: 'unresolved', note: 'What it costs to leave a voided load in the yard, and who decides. Open.' }),
      ],
      dependencies: [
        'A weather model with a forecast the party can read imperfectly',
        'Route entries across the karst and Greatwood highland that can set a difficulty against [[skill.the-far-walk|The Far Walk]]',
        'Item mass, shared with [[mechanic.mass-warrant|the Mass Warrant]], which is the same data used differently',
        'A contract object that can void without either party defaulting',
      ],
      progression:
        'There is little vertical progression here by design. What changes is the party\'s relationship to the yard: strangers pay the posted rate, known carriers get a place in the queue, and a party that has crossed enough times is offered the marginal days, which pay more because they sometimes kill porters.\n\nAnything beyond that depends on decisions about Oruvai that have not been made.',
      rewards: [
        'A place in the carry queue rather than at the back of it',
        'Marginal-day work, which pays for the risk it names honestly',
        'Storage in the yard on terms rather than on charity',
        TBD('Is there anything above the yard to earn? Whether outsiders can hold standing in Oruvai at all is unresolved.'),
      ],
      failureStates: [
        'Pass shuts mid-carry. Contract void, advance gone, load stranded at whatever band it reached.',
        'Load abandoned. Anything left in the yard over winter is at the mercy of an arrangement the party did not negotiate carefully enough.',
        'Caught on the pass in a closure. Survivable with the right skills and a serious problem without them.',
        'Priced out. A party that will not leave anything behind simply cannot afford the crossing, which is the intended pressure.',
      ],
      edgeCases: [
        'A party that carries its own load over. Allowed, unpriced, and the yard will remember that they did it.',
        'Livestock and people as carry-lots. They walk, so the beam prices them differently, and how differently is unresolved.',
        'A voided contract on goods that spoil. The advance is gone and so is the cargo, and neither party has broken the agreement.',
        TBD('Does Oruvai apply the beam to its own people, or only to the carry trade? The answer decides whether this is a toll or a tax.'),
      ],
      implementationNotes:
        PROPOSAL('Oruvai is a canon name with no established concept. The carry yard, the beam and the void-on-closure rule are the only commitments here, and they are portable.') +
        '\n\nBuild this as a route mechanic rather than a city mechanic. It is the toll on a crossing and it works perfectly well if the pass ends up belonging to somewhere else entirely; the beam moves with it.\n\nKeep the formula to three terms. The moment it needs a table it stops being the thing a party can reason about while deciding what to leave in the yard.',
    },
  }),

  /* ================================================================ */
  /* KETH VEYRA — The Bell Lines                                       */
  /* ================================================================ */

  E({
    id: 'mechanic.the-bell-lines',
    type: 'mechanic',
    name: 'The Bell Lines',
    aka: ['The lines', 'Walking by ear'],
    status: 'draft',
    summary: 'When the mistfall closes in, navigation is by owned bells. A silenced bell does not make a route harder, it deletes it.',
    tags: ['stealth', 'traversal', 'proposal', 'tbd', 'keth-veyra'],
    fields: {
      purpose:
        'To make navigation a property question. The approach to [[city.keth-veyra|Keth Veyra]] is walked by ear, and every mark on it is owned by somebody. The purpose is to give players a traversal system that doubles as an access system, and a politics that consists entirely of who owns which bell.',
      category: 'Stealth',
      implStatus: 'Concept',

      loop:
        '1. LEARN. Each bell has an interval and a bearing. A route is a sequence of them held in memory, and [[landmark.the-bell-roll|the Bell Roll]] on the quay lists every bell, its bearing, its interval and its owner.\n2. LISTEN. In fog, movement is by ear. Hold the interval, take the bearing, walk.\n3. HAND OFF. Each bell hands to the next. A gap in the sequence is not a detour, it is the end of the route.\n4. ARRIVE, or stop. Pilots do not improvise. A line with a silent mark is not walked at all.\n5. OWN. Bells are property. Buying, silencing, muffling or re-hanging one closes or opens passages for everybody.',
      controls:
        'In fog the screen gives almost nothing visually and gives directional audio instead: intervals, bearings, and the distance-sense of a bell that is nearer than the last one.\n\nA route sheet records the sequences the party has learned. Learning is done by walking a line with someone who knows it, or by reading the Roll and being wrong about the rest.\n\nMuffling a bell is a physical interaction with a visible consequence: the Roll does not update, and the pilots find out by not arriving.',

      rules: [
        'Every bell has an interval, a bearing and an owner. All three are on the Bell Roll and half the owners are struck out.',
        'A route is usable only while every mark on it is ringing. One silent bell deletes the passage rather than lengthening it.',
        'Silencing is therefore a decision a person makes about other people, which is the entire politics this entry commits to.',
        'The same logic works inland, which is why the town is full of yard bells and why a party that knows three intervals can move through a morning fog that stops everyone else.',
        '[[landmark.the-outer-bell|The Outer Bell]] is the first mark inbound, four miles out on a rock. It has not rung since last season and no pilot will pass it.',
        'Four bells on the approach have gone silent in one season, which is either maintenance, weather, or somebody, and [[quest.the-fog-bells|nobody has established which]].',
        TBD('What were the bells originally protecting, and does a bell mark a hazard, a channel, or a boundary? All three readings are still open.'),
      ],
      variables: [
        row({ name: 'bellInterval', range: '4 to 40 seconds', note: 'Per bell, distinct within a line so the sequence is learnable by ear.' }),
        row({ name: 'bearing', range: '0 to 359 degrees', note: 'From the previous mark. A route is a chain of these and nothing else.' }),
        row({ name: 'fogState', range: 'Clear / Haze / Mistfall / Shut', note: 'Under Mistfall the bells are the only navigation. Under Shut even the bells are not enough.' }),
        row({ name: 'knownLines', range: '0 to n sequences', note: 'What the party has actually learned. Not a map, a memory, and it can be wrong.' }),
        row({ name: 'silentMarks', range: '0 to n', note: 'Currently four on the approach. Each one deletes every route that used it.' }),
        row({ name: 'bellOwner', range: 'any person, house or office', note: 'On the Roll. Half struck out, and who replaced them is not recorded.' }),
      ],
      dependencies: [
        'Directional audio the player can navigate by, which is the hard build requirement here',
        'A fog state that genuinely removes visual navigation rather than dimming it',
        '[[skill.quiet-ground|Quiet Ground]] for anyone approaching a bell they intend to muffle',
        '[[skill.weather-eye|Weather Eye]] to call the mistfall before it closes',
        'A route graph whose edges can be deleted by a world event and restored by another',
      ],
      progression:
        'Progression is knowledge, not equipment. The party learns lines one at a time, from pilots who charge for them or from walking behind someone who knows. Each line is an access route into or through a town that is otherwise shut for half the year.\n\nAbove learning sits owning. A bell of your own is a passage you control, and that is as far as this entry is willing to go without deciding more about Keth Veyra than the brief allows.',
      rewards: [
        'Learned lines, which are access rather than shortcuts',
        'A pilot\'s standing on [[district.keth-veyra-the-pilot-stair|the Pilot Stair]]',
        'A bell of your own, and the passage it keeps open',
        TBD('Is there a formal pilotage body that can grant anything, or is it all private arrangement? Left open on purpose.'),
      ],
      failureStates: [
        'Line broken mid-walk. The party is in fog with no next mark and no way back to the last one they were sure of.',
        'Wrong interval. Following a bell that is not the one you thought puts you somewhere else entirely, and in this coast that is usually water.',
        'Winter shipping stops. With the approach unusable, nothing reaches Keth Veyra for a season, and what that costs the coast is not yet established.',
        'A muffled bell that the party muffled. Somebody walks the deleted route and does not arrive.',
      ],
      edgeCases: [
        'A bell that rings on the wrong interval. Sabotage that is worse than silence, because it is followed.',
        'Fog inland. Yard bells make the same system work as a street network, which is where the stealth applications live.',
        'A party with no ear for it. There should be a slow, safe, expensive alternative: hire a pilot, and be dependent on one.',
        '[[npc.ismet-radva|Ismet Radva]], who is a name on three manifests and may be a person, an office or a dead credential still in use.',
        TBD('Do the bells have any function when there is no fog, and does anyone maintain them in clear weather?'),
      ],
      implementationNotes:
        PROPOSAL('Keth Veyra is a canon name with no established concept. Bells with intervals, bearings and owners, and the four silent marks, come from the proposed city entry. Bell ownership is the only politics implied; leave the rest open.') +
        '\n\nThe build risk is audio. If directional sound is not reliable, this becomes a memory puzzle with a sound effect, which is a much smaller thing. Prototype the audio before committing to the mechanic.\n\nRun it as a stealth and access system as much as a travel one. The most useful property of a deleted route is that it is deleted for everybody, including the people chasing you.',
    },
  }),

  /* ================================================================ */
  /* GLOBAL — The Toll                                                 */
  /* ================================================================ */

  E({
    id: 'mechanic.the-toll',
    type: 'mechanic',
    name: 'The Toll',
    aka: ['The debt', 'Accrual'],
    status: 'draft',
    summary: 'Worked magic accrues a physical debt that must be discharged, registered, or hidden at a considerably worse price.',
    tags: ['magic', 'global', 'law', 'cost', 'spine'],
    fields: {
      purpose:
        'To make magic a regulated resource with a cost rather than a wish machine, in one system that every spell, ward and Arcana skill hangs off. The Toll is why magic in this world is licensed, metered, taxed and rationed: not because a council disapproves, but because the debt is physical, it lands on a body, and somebody has to decide whose.',
      category: 'Magic',
      implStatus: 'Prototype',

      loop:
        '1. WORK. Any casting, warding, binding or brewing accrues Toll on the practitioner. There is no free working and no cantrip tier.\n2. FEEL. [[skill.toll-sense|Toll Sense]] reads accrued Toll before it surfaces, so a trained caster knows how many workings they have left. An untrained one does not.\n3. DISCHARGE. The lawful route is [[skill.bleed-off|Bleed-Off]] into a licensed [[material.quenchspar|quenchspar]] sink, receipted and logged.\n4. REGISTER. The receipt goes on a roll. The roll is what a licence actually is, and it is a rota of who is burning out next.\n5. OR DODGE. [[skill.grey-casting|Grey Casting]] works off the register so nothing is metered, and the Toll still accrues, unrecorded and uncapped. [[skill.toll-shunting|Toll Shunting]] pushes it into another body.\n6. SURFACE. Undischarged Toll surfaces physically, at a time the practitioner does not choose.',
      controls:
        'A Toll gauge that is not a mana bar. It fills and does not empty on its own. Nothing in the world restores it except a discharge, and every discharge is an event with a location, a cost and a witness.\n\nWith Toll Sense the gauge is numeric. Without it, the character has a vague band and a bad guess, which is the difference between a trained caster and everyone else.\n\nDischarge is a physical action at a sink: travel there, queue, pay, be logged. The queue and the log are the mechanic. A magic system whose cost can be paid in a menu is not this one.',

      rules: [
        'Every working accrues Toll on the person who did it. Scale is by the working, not by the caster\'s power.',
        'Toll does not decay. Resting, sleeping and levelling do not reduce it. Only discharge does.',
        'Lawful discharge is into a licensed quenchspar sink, receipted. Sinks saturate, and a saturated block fails all at once and takes the room with it.',
        'Licences ration lawful discharge. This is the moral architecture of the whole system: the unlicensed either stop working or find something else to discharge into, and the thing they find is usually a person.',
        'Undischarged Toll surfaces as physical damage that is permanent, cumulative and specific. It is not a debuff that wears off.',
        '[[spell.arrears-draught|Arrears draught]] defers the debt for a working, at interest, and the collapse arrives at a moment the drinker does not choose.',
        '[[skill.toll-shunting|Toll Shunting]] is outlawed everywhere without exception, and every use of it has a victim who should be written as a person.',
        'A [[spell.debt-mark|debt mark]] is lawful indenture in some cities and a capital crime in others, which makes every runaway an extradition case.',
        '[[material.levin-salt|Levin salt]] is the only portable store of magical work, weighed, sealed and taxed at every gate. Unsealed salt is contraband even where salt is legal.',
      ],
      variables: [
        row({ name: 'toll', range: '0 to 100 per practitioner', note: 'Accrued, non-decaying. Over 70 the body starts showing it to anyone who knows what to look for.' }),
        row({ name: 'workingCost', range: '1 to 40 Toll', note: 'By working. A chalk line is 2 or 3; a structural re-rating is 30 and upward.' }),
        row({ name: 'sinkCapacity', range: '0 to 100 per block', note: 'Quenchspar saturates. A full block must be walked out and buried, and [[city.magic-city|the Magic City]] charges for the burial.' }),
        row({ name: 'licenceQuota', range: '0 to n discharges per month', note: 'The leash. Set by the licensor, and the roll is public enough to be read as a rota.' }),
        row({ name: 'surfacing', range: 'threshold event', note: 'Permanent, specific, cumulative physical damage. Not a status effect and not curable.' }),
        row({ name: 'unregisteredToll', range: '0 to uncapped', note: 'Grey casting accrues without a ceiling because nothing is metering it. This is how unlicensed casters die.' }),
        row({ name: 'shuntTarget', range: 'a named person', note: 'Toll Shunting requires a body. The interface must name them and the world must remember.' }),
      ],
      dependencies: [
        'A per-character persistent resource that no rest, potion or level restores',
        'Licensed sink infrastructure as real, mapped, queued locations in several cities',
        '[[skill.toll-sense|Toll Sense]], [[skill.bleed-off|Bleed-Off]], [[skill.ward-cutting|Ward Cutting]] and the outlawed nodes above them',
        '[[mechanic.ward-load|Ward Load]], which is the same system seen from the structural side',
        '[[skill.writ-craft|Writ Craft]] for the licensing and extradition paperwork',
        'Quenchspar and [[material.levin-salt|levin salt]] supply chains, and the tax that follows the salt',
      ],
      progression:
        'A caster does not get more magic. They get more ways to pay for it. Toll Sense turns a guess into a number. Bleed-Off turns a debt into an errand. A licence turns the errand into a routine and hands somebody a leash.\n\nEverything above that is a way of dodging the bill: working off the register, shunting into another body, or walking into [[landmark.the-bound-fault|the Bound Fault]] and back out, timed in minutes and paid for in years. The trees are built so that the powerful nodes are all crimes, and the crimes are all survivable exactly once too often.',
      rewards: [
        'A practitioner\'s licence, which is employment, an alibi and a leash',
        'Sink allocation, which is the only thing that makes sustained work possible',
        'Receipted standing, which is what lets a caster work in front of witnesses',
        'A sealed levin-salt allowance, portable and taxed at every gate',
        'A place on the roll, which is standing and a queue position for burning out',
      ],
      failureStates: [
        'Surfacing. Permanent, located physical damage. The character keeps playing and does not get better.',
        'Burnout. A practitioner past the top band cannot work again. [[faction.fetterhouse|The Fetterhouse]] roll is a record of people this has already happened to.',
        'Sink failure. A saturated quenchspar block fails all at once and takes the room, which is a licensed disaster with a paper trail.',
        'Struck off the roll. No lawful discharge, so a caster either stops or becomes a grey caster, and there is no third option.',
        'Shunt victim. Somebody who did not cast is carrying the damage. Write them as a person with a name and a life afterwards.',
      ],
      edgeCases: [
        'A party with no caster. Fully supported. The Toll should still be visible everywhere as prices, queues, licences and burned-out people.',
        'Discharging in a city with no sink. Not possible. Travel to a sink is a real journey and is the reason casters cluster.',
        'A licensed caster working outside their city. The receipt is honoured in some places and not in others, so a caster on the road is accruing against a discharge they may not reach.',
        'Toll from a ritual with several participants. Split, and the split is negotiated before the working, which is a scene worth writing.',
        '[[spell.dead-ground|Dead ground]] refuses every working inside it, including discharges. A sink cannot be built in one and nobody has tried twice.',
        TBD('Does Toll accrue to the person who drew a ward line or to the person who commissioned it? Every licensing regime in the world assumes the first, and no city has tested the second in court.'),
      ],
      implementationNotes:
        PROPOSAL('The Toll is named in the manifest as the global spine of magic cost and magic law. Bands, costs and the surfacing model below are a first proposal.') +
        '\n\nBuild this before any spell. Every entry in the magic tree and every spell entry should cite a Toll cost, and any that cannot is a spell that has not been designed yet.\n\nThe non-decaying resource is the whole design. The moment Toll regenerates over time, magic becomes a mana bar and the licensing, the sinks, the rota and the shunting all stop making sense.\n\nKeep the dark nodes expensive to reach and unglamorous to use. Toll Shunting should read as a squalid thing done in a back room to somebody who could not refuse, never as a power fantasy.',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* Where each system lives ---------------------------------------- */
  R('mechanic.standing-ledger', 'located_in', CITY.gildedAscent, 'signature mechanic'),
  R('mechanic.mass-warrant', 'located_in', CITY.skyCity, 'signature mechanic'),
  R('mechanic.conduit-hours', 'located_in', CITY.mediterranean, 'signature mechanic'),
  R('mechanic.severance-drill', 'located_in', CITY.treeCity, 'signature mechanic'),
  R('mechanic.the-mirror-rota', 'located_in', CITY.caveAgrarian, 'signature mechanic'),
  R('mechanic.the-sift-line', 'located_in', CITY.siftingCity, 'signature mechanic'),
  R('mechanic.ward-load', 'located_in', CITY.magicCity, 'signature mechanic'),
  R('mechanic.ring-bond', 'located_in', CITY.arenaCity, 'signature mechanic'),
  R('mechanic.the-remoor', 'located_in', CITY.floatingSwamp, 'signature mechanic'),
  R('mechanic.the-sluice-book', 'located_in', CITY.blackWeir, 'signature mechanic, proposal'),
  R('mechanic.the-ration-board', 'located_in', CITY.orath, 'signature mechanic, proposal'),
  R('mechanic.the-high-carry', 'located_in', CITY.oruvai, 'signature mechanic, proposal'),
  R('mechanic.the-bell-lines', 'located_in', CITY.kethVeyra, 'signature mechanic, proposal'),
  R('mechanic.the-toll', 'related_to', REGION.aethericScar, 'the Scar is where the debt was first measured'),

  /* The Toll is global -------------------------------------------- */
  R('mechanic.the-toll', 'affects', CITY.magicCity, 'licensing, sinks and the chain rota'),
  R('mechanic.the-toll', 'affects', CITY.gildedAscent, 'licensed weight lending on the hoists'),
  R('mechanic.the-toll', 'affects', CITY.mediterranean, 'licence regimes on every working in the port'),
  R('mechanic.the-toll', 'affects', CITY.arenaCity, 'draughts, dead ground and clean bouts'),
  R('mechanic.the-toll', 'affects', CITY.skyCity, 'metered weight lending on the lattice'),

  /* Skills each system needs --------------------------------------- */
  R('mechanic.standing-ledger', 'requires', 'skill.ledger-hand', 'reading a house book from the inside'),
  R('mechanic.standing-ledger', 'requires', 'skill.plain-letters', 'not being robbed by a contract'),
  R('mechanic.standing-ledger', 'requires', 'skill.market-ear', 'knowing which house is short before the posting'),
  R('mechanic.standing-ledger', 'requires', 'skill.chartering', 'the top tier, and owning anything at all'),
  R('mechanic.mass-warrant', 'requires', 'skill.dead-weight', 'carrying a person, who is still billable'),
  R('mechanic.mass-warrant', 'requires', 'skill.lattice-work', 'working the masts and the unlogged lines'),
  R('mechanic.conduit-hours', 'requires', 'skill.pressure-fitting', 'working a live main, lawfully or otherwise'),
  R('mechanic.conduit-hours', 'requires', 'skill.bench-sense', 'knowing what a bench will do before it does it'),
  R('mechanic.severance-drill', 'requires', 'skill.gallery-drill', 'fighting and cutting on a loaded span'),
  R('mechanic.severance-drill', 'requires', 'skill.set-and-brace', 'keeping your feet on a rope bridge'),
  R('mechanic.the-mirror-rota', 'requires', 'skill.mirror-cutting', 'grinding, silvering and aiming duct mirrors'),
  R('mechanic.the-mirror-rota', 'requires', 'skill.spore-lore', 'growing anything in a gallery that has lost its light'),
  R('mechanic.the-sift-line', 'requires', 'skill.sieve-tuning', 'moving the yield curve toward the grade you want'),
  R('mechanic.the-sift-line', 'requires', 'skill.charge-blending', 'opening fresh drift faces'),
  R('mechanic.ward-load', 'requires', 'skill.chalk-hand', 'reading what a line is holding'),
  R('mechanic.ward-load', 'requires', 'skill.ward-cutting', 'the recut round'),
  R('mechanic.ward-load', 'requires', 'skill.load-binding', 're-rating a structure'),
  R('mechanic.ring-bond', 'requires', 'skill.ring-craft', 'reading a card and working the stipulations'),
  R('mechanic.ring-bond', 'requires', 'skill.crowd-turning', 'moving a tier, and starting riots'),
  R('mechanic.ring-bond', 'requires', 'skill.bonewright', 'the only repair path for persistent injury'),
  R('mechanic.the-remoor', 'requires', 'skill.marsh-footing', 'crossing between combs at speed'),
  R('mechanic.the-sluice-book', 'requires', 'skill.plain-letters', 'reading a booking'),
  R('mechanic.the-sluice-book', 'requires', 'skill.brokerage', 'moving a booking without moving a war'),
  R('mechanic.the-sluice-book', 'requires', 'skill.fence-work', 'anything passing in the slack hour'),
  R('mechanic.the-ration-board', 'requires', 'skill.the-far-walk', 'leaving the road at all'),
  R('mechanic.the-high-carry', 'requires', 'skill.weather-eye', 'calling the pass before the porters do'),
  R('mechanic.the-high-carry', 'requires', 'skill.cold-camp', 'surviving a closure on the mountain'),
  R('mechanic.the-bell-lines', 'requires', 'skill.quiet-ground', 'approaching a bell you intend to muffle'),
  R('mechanic.the-bell-lines', 'requires', 'skill.weather-eye', 'calling the mistfall before it closes'),
  R('mechanic.the-toll', 'requires', 'skill.toll-sense', 'knowing how many workings are left'),
  R('mechanic.the-toll', 'requires', 'skill.bleed-off', 'the lawful discharge'),
  R('mechanic.the-toll', 'requires', 'skill.writ-craft', 'the licensing and extradition paperwork'),
  R('mechanic.the-toll', 'requires', 'skill.reagent-work', 'components, dosing and shelf life'),

  /* Items and materials the loops consume --------------------------- */
  R('mechanic.standing-ledger', 'requires', 'item.stair-writ', 'the instrument the whole system settles in'),
  R('mechanic.standing-ledger', 'requires', 'item.factors-seal', 'binding a house to a contract'),
  R('mechanic.standing-ledger', 'requires', 'item.indenture-bond', 'the cheapest collateral in the city'),
  R('mechanic.standing-ledger', 'related_to', 'item.oxblood-coat', 'cuff tallies claim a line you must be able to evidence'),
  R('mechanic.standing-ledger', 'related_to', 'item.cut-seal', 'the classic forgery, and how a false line is drawn'),
  R('mechanic.mass-warrant', 'related_to', 'item.ballast-jacket', 'mass worn deliberately, and fatal in water'),
  R('mechanic.mass-warrant', 'related_to', 'item.crown-bolt', 'lattice alloy nobody has reproduced, and a warrantable object'),
  R('mechanic.conduit-hours', 'requires', 'item.governor-spring', 'the bottleneck component drawn only here'),
  R('mechanic.severance-drill', 'related_to', 'material.blackbole-timber', 'what a span is made of and what a rebuild is licensed against'),
  R('mechanic.the-mirror-rota', 'requires', 'item.sunwell-mirror', 'the tool of the local crime'),
  R('mechanic.the-mirror-rota', 'requires', 'material.sunwell-mica', 'the duct plate itself'),
  R('mechanic.the-mirror-rota', 'requires', 'material.cudmother', 'without it, made ground is rock dust'),
  R('mechanic.the-sift-line', 'requires', 'item.sift-screen', 'consumable, rated by count, never sold on'),
  R('mechanic.the-sift-line', 'requires', 'item.assayers-tray', 'field assay, and the stamped result card'),
  R('mechanic.the-sift-line', 'produces', 'material.pan-nitre', 'grades one to six, priced by the stamp'),
  R('mechanic.the-sift-line', 'produces', 'material.blackfall-sand', 'off the drift faces and down the screens'),
  R('mechanic.the-sift-line', 'related_to', 'item.pale-dust', 'the fines the crew is already breathing, sold as a stimulant'),
  R('mechanic.ward-load', 'requires', 'material.ward-chalk', 'the repeat-order business the whole trade rests on'),
  R('mechanic.ward-load', 'requires', 'item.ward-pin', 'holds a binding until it is drawn'),
  R('mechanic.ring-bond', 'related_to', 'item.tallyblade', 'the notches are a debt ledger'),
  R('mechanic.ring-bond', 'rewards', 'item.quitblade', 'proof that you are not owned'),
  R('mechanic.ring-bond', 'requires', 'item.indenture-bond', 'the paper the share is written on'),
  R('mechanic.ring-bond', 'related_to', 'item.cinderroot-cordial', 'sold ringside by the cup, and it costs the hands'),
  R('mechanic.the-remoor', 'requires', 'item.moor-stake', 'a stake and a cord is what property means here'),
  R('mechanic.the-sluice-book', 'related_to', 'item.weirhook', 'the tool of the gantry crews and of the wardens'),
  R('mechanic.the-toll', 'requires', 'material.quenchspar', 'the licensed sink, which saturates'),
  R('mechanic.the-toll', 'related_to', 'material.levin-salt', 'the only portable store of magical work, taxed by the grain'),
  R('mechanic.the-toll', 'related_to', 'material.faultglass', 'what the Scar leaves behind, and a capital charge in three cities'),

  /* Machines and landmarks the loops run on ------------------------- */
  R('mechanic.standing-ledger', 'related_to', 'machine.the-tally-engine', 'the settlement layer: two entries and no coin moves'),
  R('mechanic.standing-ledger', 'related_to', 'machine.the-assay-cage', 'where a pledge is assayed'),
  R('mechanic.standing-ledger', 'related_to', 'machine.the-oxblood-hoists', 'passage priced by terrace against the line'),
  R('mechanic.standing-ledger', 'related_to', 'landmark.the-counting-stair', 'the tread decides the court'),
  R('mechanic.standing-ledger', 'related_to', 'landmark.the-brass-standard', 'the reference every weighed contract is set against'),
  R('mechanic.mass-warrant', 'related_to', 'landmark.the-mooring-crown', 'fifteen masts, and every warrant written under them'),
  R('mechanic.mass-warrant', 'related_to', 'landmark.the-ballast-drop', 'where mass goes down, logged and unlogged'),
  R('mechanic.mass-warrant', 'related_to', 'landmark.the-sixth-mast', 'the collapse with a signed overload on it'),
  R('mechanic.mass-warrant', 'related_to', 'machine.the-strand-loom', 'the cable the whole warrant regime exists to protect'),
  R('mechanic.conduit-hours', 'related_to', 'machine.the-drawbench-vaults', 'slot-hungry, and the only source of drawn stock'),
  R('mechanic.conduit-hours', 'related_to', 'machine.the-frit-kiln', 'a batch that cannot be paused halfway'),
  R('mechanic.conduit-hours', 'related_to', 'machine.the-verdigris-hearth', 'charcoal in, billet out, on a booked slot'),
  R('mechanic.conduit-hours', 'related_to', 'landmark.the-mother-main', 'walkable when down, published in advance'),
  R('mechanic.severance-drill', 'related_to', 'landmark.the-black-span', 'the one span that may not be cut'),
  R('mechanic.severance-drill', 'related_to', 'landmark.bastion-bole', 'where the rolls and the orders are kept'),
  R('mechanic.the-mirror-rota', 'related_to', 'landmark.sunwell-shaft', 'two hundred ducted mirrors off one shaft'),
  R('mechanic.the-mirror-rota', 'related_to', 'machine.the-mirror-ducts', 'the clockwork drive and the ninety-day silvering'),
  R('mechanic.the-sift-line', 'related_to', 'machine.the-sieve-cascade', 'nine graded screens, wind-fed'),
  R('mechanic.the-sift-line', 'related_to', 'landmark.the-great-sieve', 'the escarpment, the nine towers and the licence'),
  R('mechanic.the-sift-line', 'related_to', 'landmark.the-cut-house', 'six punches decide the price of everything'),
  R('mechanic.ward-load', 'related_to', 'landmark.the-load-roll', 'the maintenance database rendered as a wall'),
  R('mechanic.ward-load', 'related_to', 'landmark.the-bound-fault', 'nine chains, two of them already dead'),
  R('mechanic.ward-load', 'related_to', 'landmark.the-ninth-chain', 'the only chain whose alloy nobody disputes'),
  R('mechanic.ward-load', 'related_to', 'machine.the-ward-kilns', 'chalk fired in a live field, logged stick by stick'),
  R('mechanic.ring-bond', 'related_to', 'landmark.the-sunken-ring', 'twelve thousand seats over three floors of vaults'),
  R('mechanic.ring-bond', 'related_to', 'landmark.the-claim-wall', 'nine days chalked, then the retorts'),
  R('mechanic.ring-bond', 'related_to', 'machine.the-char-retorts', 'the claim ledger decides whose bone'),
  R('mechanic.the-remoor', 'related_to', 'landmark.the-moorstone', 'the fixed point the settlement is defined against'),
  R('mechanic.the-remoor', 'related_to', 'landmark.the-lot-board', 'three hundred and eighty numbers and this drift\'s bearings'),
  R('mechanic.the-remoor', 'related_to', 'machine.the-fen-damp-taps', 're-sited every drift, so no field is held for long'),
  R('mechanic.the-sluice-book', 'related_to', 'landmark.the-weir-gates', 'fourteen worked gates in twenty-two bays'),
  R('mechanic.the-sluice-book', 'related_to', 'landmark.the-flood-post', 'every recorded release, and no column for what it landed on'),
  R('mechanic.the-sluice-book', 'related_to', 'landmark.the-eleventh-sluice', 'about forty minutes of slack, and two drowned crews'),
  R('mechanic.the-sluice-book', 'related_to', 'machine.the-sluice-hammers', 'the same head that prices the toll makes the iron'),
  R('mechanic.the-ration-board', 'related_to', 'landmark.the-ration-board', 'posted before dawn, against names'),
  R('mechanic.the-ration-board', 'related_to', 'landmark.the-last-well', 'inside the tank yard wall'),
  R('mechanic.the-high-carry', 'related_to', 'landmark.the-carry-beam', 'its reading sets the price and no argument survives it'),
  R('mechanic.the-bell-lines', 'related_to', 'landmark.the-bell-roll', 'bearing, interval and owner, half the owners struck out'),
  R('mechanic.the-bell-lines', 'related_to', 'landmark.the-outer-bell', 'the first mark inbound, silent since last season'),

  /* Districts the loops are actually played in ---------------------- */
  R('mechanic.standing-ledger', 'affects', 'district.gilded-ascent-salt-office', 'where a shortfall becomes a term'),
  R('mechanic.standing-ledger', 'affects', 'district.gilded-ascent-under-stair', 'where the struck off live'),
  R('mechanic.mass-warrant', 'affects', 'district.sky-city-mooring-ring', 'declaration, weighing and queue position'),
  R('mechanic.mass-warrant', 'affects', 'district.sky-city-shelf-foot', 'the ground the unlogged lines come down to'),
  R('mechanic.conduit-hours', 'affects', 'district.mediterranean-city-conduit-yards', 'where slots are bid for and worked'),
  R('mechanic.severance-drill', 'affects', 'district.tree-city-spanworks', 'who rebuilds, and in what order'),
  R('mechanic.the-mirror-rota', 'affects', 'district.cave-agrarian-city-sunwell-terraces', 'the galleries with hours'),
  R('mechanic.the-mirror-rota', 'affects', 'district.cave-agrarian-city-deep-rota', 'the galleries without'),
  R('mechanic.the-sift-line', 'affects', 'district.sifting-city-the-water-court', 'where draw is posted and priced'),
  R('mechanic.the-sift-line', 'affects', 'district.sifting-city-assay-row', 'where the stamp is worth more than the sack'),
  R('mechanic.ward-load', 'affects', 'district.magic-city-under-slabs', 'the load-bearing work and the backlog'),
  R('mechanic.the-toll', 'affects', 'district.magic-city-the-sinks', 'the licensed discharge and the queue for it'),
  R('mechanic.ring-bond', 'affects', 'district.arena-city-writ-court', 'where the paper is signed and transferred'),
  R('mechanic.ring-bond', 'affects', 'district.arena-city-the-under-stands', 'cages, tunnels and the animals nobody logged'),
  R('mechanic.the-remoor', 'affects', 'district.floating-swamp-settlement-tail-lots', 'cheap for exactly one reason'),
  R('mechanic.the-sluice-book', 'affects', 'district.black-weir-the-slack', 'hours short-sold three deep'),
  R('mechanic.the-ration-board', 'affects', 'district.orath-the-board', 'where the lines are read at dawn'),
  R('mechanic.the-high-carry', 'affects', 'district.oruvai-the-carry-yard', 'where loads are broken and weighed'),
  R('mechanic.the-bell-lines', 'affects', 'district.keth-veyra-the-fog-quays', 'the landward end of every line'),

  /* Who holds the levers ------------------------------------------- */
  R('faction.concord-of-weights', 'controls', 'mechanic.standing-ledger', 'sets the clearing rate every ninth morning'),
  R('faction.bondwrights-hall', 'related_to', 'mechanic.standing-ledger', 'writes and resells the paper the judgments generate'),
  R('faction.mooring-assize', 'controls', 'mechanic.mass-warrant', 'licenses masts, lift-loads and counterweight rights'),
  R('faction.conduit-college', 'controls', 'mechanic.conduit-hours', 'no conduit is lawful without their seal'),
  R('faction.pitchguard', 'controls', 'mechanic.severance-drill', 'holds the order-holders and the sealed axes'),
  R('faction.mirror-assembly', 'controls', 'mechanic.the-mirror-rota', 'votes the rota on inherited shares'),
  R('faction.pale-assay', 'controls', 'mechanic.the-sift-line', 'six stamps decide what a grade is worth'),
  R('faction.fetterhouse', 'controls', 'mechanic.ward-load', 'the licence roll is the maintenance rota'),
  R('faction.fetterhouse', 'controls', 'mechanic.the-toll', 'licenses, marks and chains practitioners'),
  R('faction.red-writ', 'related_to', 'mechanic.ring-bond', 'holds unexpired contracts nobody has counted'),
  R('faction.moorstone-compact', 'controls', 'mechanic.the-remoor', 'runs the draw and decides who is cast adrift'),
  R('faction.iron-sluice-company', 'controls', 'mechanic.the-sluice-book', 'ninety-six hours a week, thirty reserved'),
  R('faction.low-tally', 'related_to', 'mechanic.the-sluice-book', 'the ullage trade through the tail'),
  R('faction.low-tally', 'related_to', 'mechanic.mass-warrant', 'the second ledger, and the unlogged descent'),
  R('faction.standing-hour', 'related_to', 'mechanic.the-sift-line', 'the crew ration is the thing a stoppage is about'),
  R('faction.bonewax-post', 'related_to', 'mechanic.the-sluice-book', 'the only standing exception in the book'),

  /* People bound to a system --------------------------------------- */
  R('npc.wessel-ondriek', 'controls', 'mechanic.standing-ledger', 'sets the clearing rate and cannot afford an audit'),
  R('npc.cesille-vaudry', 'related_to', 'mechanic.mass-warrant', 'forges the tonnage returns rather than sign eviction lists'),
  R('npc.perrine-orlaunt', 'related_to', 'mechanic.mass-warrant', 'the only person who can move someone off with no manifest entry'),
  R('npc.aubran-ferrieu', 'related_to', 'mechanic.mass-warrant', 'holds the true sheets from the week of the collapse'),
  R('npc.aune-mustsalu', 'related_to', 'mechanic.severance-drill', 'signs the orders and forges the rolls'),
  R('npc.ossane-gorbea', 'controls', 'mechanic.the-mirror-rota', 'issues the hours and buys the galleries she starved'),
  R('npc.iratze-zubiate', 'related_to', 'mechanic.the-mirror-rota', 'skimming hours to hide a duct collapse'),
  R('npc.tazrit-nourem', 'related_to', 'mechanic.the-sift-line', 'three towers, and papers on a third of the crews'),
  R('npc.toval-cherek', 'related_to', 'mechanic.ward-load', 'shorted alloy that passes cold inspection'),
  R('npc.ysme-drannik', 'related_to', 'mechanic.ward-load', 'knows which two of the nine chains are dead'),
  R('npc.halvo-sarn', 'related_to', 'mechanic.the-toll', 'backdates the permits that make a working lawful'),
  R('npc.berke-chagra', 'related_to', 'mechanic.ring-bond', 'buys the water ration rather than the fighter'),
  R('npc.aylun-torgai', 'related_to', 'mechanic.ring-bond', 'freed on paper, owned in fact'),
  R('npc.sabbe-sixteen-knot', 'related_to', 'mechanic.the-remoor', 'paid in sluice-time to drift the settlement upriver'),
  R('npc.ost-vennick', 'controls', 'mechanic.the-sluice-book', 'sleeps in the same room as the only evidence'),
  R('npc.dagren-hoyle', 'related_to', 'mechanic.the-sluice-book', 'works a disused bay in the slack hour'),
  R('npc.kavel-uur', 'related_to', 'mechanic.the-ration-board', 'the only fixed schedule off the board'),
  R('npc.anwe-halduri', 'related_to', 'mechanic.the-high-carry', 'pays in advance, in cut stone, and never stays a night'),
  R('npc.ismet-radva', 'related_to', 'mechanic.the-bell-lines', 'a name on three manifests and no route anyone can trace'),

  /* Quests that are these systems under pressure -------------------- */
  R('quest.the-scar-concession', 'involves', 'mechanic.the-toll', 'who sets the price of regulated magic for a generation'),
  R('quest.the-chalk-that-lies', 'involves', 'mechanic.ward-load', 'adulterated chalk that assays clean and fails under load'),
  R('quest.who-gets-the-light', 'involves', 'mechanic.the-mirror-rota', 'the party brokers the allocation and the cut galleries go dark'),
  R('quest.the-felling-order', 'involves', 'mechanic.severance-drill', 'the same logic at the scale of a quarter, with eleven days on the clock'),
  R('quest.pan-fever', 'involves', 'mechanic.the-sift-line', 'the fraction that pays best is the one the crews keep breathing'),
  R('quest.the-indenture-column', 'involves', 'mechanic.ring-bond', 'the manifest column for people, and who buys it'),
  R('quest.slackwater-rights', 'involves', 'mechanic.the-remoor', 'two clans, one berth, and a reversionary clause on the back'),
  R('quest.clean-bills', 'involves', 'mechanic.the-sluice-book', 'the cordon that saves upriver and starves the delta'),
  R('quest.the-ullage-run', 'involves', 'mechanic.the-sluice-book', 'one tide, two hundred barrels and forty of them ullage'),
  R('quest.the-sixteenth-mast', 'involves', 'mechanic.mass-warrant', 'two years of landings at a mast the register does not have'),
  R('quest.four-minutes-fast', 'involves', 'mechanic.conduit-hours', 'every schedule on the coast is printed off one instrument'),
  R('quest.the-casting-voice', 'involves', 'mechanic.conduit-hours', 'the copper duty, and who holds the timetable for nine years'),
  R('quest.short-weight', 'involves', 'mechanic.standing-ledger', 'a consignment that weighs true on the Stair and false at the door'),
  R('quest.the-master-weight', 'involves', 'mechanic.standing-ledger', 'a false standard skims every transaction weighed against it'),
  R('quest.the-fog-bells', 'involves', 'mechanic.the-bell-lines', 'four silent marks and a season of shipping'),
  R('quest.written-off', 'involves', 'mechanic.the-ration-board', 'guild law does not reach the board'),
  R('quest.open-account', 'involves', 'mechanic.the-high-carry', 'the first licensed route over the highland'),

  /* How the systems talk to each other ------------------------------ */
  R('mechanic.standing-ledger', 'related_to', 'mechanic.mass-warrant', 'assessed value and declared mass are the same item data used twice'),
  R('mechanic.standing-ledger', 'related_to', 'mechanic.ring-bond', 'both write to the same cross-city labour register'),
  R('mechanic.standing-ledger', 'related_to', 'mechanic.conduit-hours', 'slots are bid for on credit, which is how most freight crafts'),
  R('mechanic.standing-ledger', 'related_to', 'mechanic.the-sift-line', 'draw bought at bond rates is the fastest route into indenture'),
  R('mechanic.mass-warrant', 'related_to', 'mechanic.the-high-carry', 'the same mass data, priced by altitude instead of by deck'),
  R('mechanic.conduit-hours', 'related_to', 'mechanic.the-sluice-book', 'two timetables sold by the hour, with opposite consequences'),
  R('mechanic.ward-load', 'related_to', 'mechanic.the-toll', 'one system split in two: what the magic does, and what it costs'),
  R('mechanic.the-toll', 'related_to', 'mechanic.ring-bond', 'dead ground makes a clean bout, at a fortune to lay'),
  R('mechanic.the-sluice-book', 'related_to', 'mechanic.the-remoor', 'a release lands on lots the draw decided'),
  R('mechanic.the-remoor', 'related_to', 'mechanic.the-sluice-book', 'tail lots are priced against the schedule'),
  R('mechanic.the-sift-line', 'related_to', 'mechanic.the-ration-board', 'two systems where water is the binding constraint'),
  R('mechanic.the-mirror-rota', 'related_to', 'mechanic.conduit-hours', 'allocation politics and timetabled supply, the same shape'),
  R('mechanic.severance-drill', 'related_to', 'mechanic.the-bell-lines', 'both delete a route rather than lengthen it'),
  R('mechanic.the-high-carry', 'related_to', 'mechanic.the-ration-board', 'the two systems a party meets crossing the margins'),
  R('mechanic.ring-bond', 'related_to', 'mechanic.the-toll', 'both are debts enforced on a body, one lawful and one physical'),
]
