/**
 * The named cast.
 *
 * Thirty people the manifest already puts in play, written as pressure points
 * rather than portraits: each one holds a lever some other entry describes from
 * the outside. Where a city module has already stated a fact about them, this
 * file agrees with it. Where the manifest deliberately left a city thin, the
 * NPC stays thin with it, and the gap is recorded as a question.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE GILDED ASCENT                                                 */
  /* ================================================================ */

  E({
    id: 'npc.wessel-ondriek',
    type: 'npc',
    name: 'Wessel Ondriek',
    status: 'draft',
    summary: 'Chief Factor of the Counting Stair: sets the clearing rate every ninth morning against a reserve that is mostly lent out.',
    tags: ['gilded-ascent', 'finance', 'power', 'concord'],
    fields: {
      title: 'Chief Factor of the Counting Stair',
      aliases: ['The Ninth Morning', 'Ondriek of the Fourth House'],
      species: 'Human, basin-born',
      age: '58',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        "Fifty-eight and dressed for forty-five: oxblood wool, eleven brass cuff tallies, every one of them earned. Grey, close-shaved, careful hands, and the counting-house complexion of a man who has not stood in open sun for a working day in twenty years. The tell is his left thumb. He turns his [[item.factors-seal|seal]] over in his pocket while he talks, and the brass has worn a shine into the skin.",
      home: ['district.gilded-ascent-counting-terrace'],
      currentLocation: ['district.gilded-ascent-counting-terrace'],
      occupation: 'Chief Factor; chairs the rate room of the [[faction.concord-of-weights|Concord of Weights]]',
      standing:
        "Chief Factor is not an office anyone voted for. It is what the other thirty-nine chartered houses call the man who chairs the rate room, and it lasts exactly as long as the rate holds. On the [[district.gilded-ascent-counting-terrace|Counting Terrace]] he is the city's centre of gravity and is spoken to accordingly. Four terraces down he is a name on a board that decides the price of a [[food.stair-loaf|loaf]], and the [[faction.standing-hour|Standing Hour]] stewards use it as a curse.",
      personality:
        "Courteous to the point of coldness, and genuinely interested in whoever he is speaking to for exactly as long as it takes him to work out what they are for. He does not raise his voice, does not threaten, and does not lie if a true sentence arranged carefully will do the same work. What he has instead of cruelty is arithmetic: he will decide that four hundred people on the third terrace are cheaper to lose than a run on the reserve, and he will decide it before breakfast, and it will bother him afterwards without changing anything.",
      traits: ['courteous', 'exhausted', 'arithmetical', 'sentimental about the city', 'incapable of stopping'],
      voice: 'Quiet, unhurried, and reaches for the passive voice whenever a sentence would otherwise name who did the harm',
      goals: [
        'Survive nine more rate mornings without a public audit of the reserve',
        'Convert Sky City counterweight paper into anything that can be sold inside a fortnight',
        'Find a successor young enough to inherit the problem and vain enough to want the chair',
      ],
      fears: [
        'One honest assay of the reserve, conducted by somebody with no house to protect',
        'A still season on the [[region.anvil-shelf|Anvil Shelf]], which would call the counterweight leases in all at once',
        'Being the name the collapse is filed under',
      ],
      beliefs: [
        'Certainty is a manufactured good, and the Ascent is the only reliable maker of it',
        'A city that stops being believed starves inside one season, and belief is therefore infrastructure',
        'Every fraud has honest arithmetic waiting at the far end of it if you are given long enough to walk there',
      ],
      secrets:
        "Four fifths of the clearing reserve is lent against [[city.sky-city|Sky City]] counterweight leases, the largest block of it to [[npc.cesille-vaudry|Cesille Vaudry]]'s house. Neither of them can afford the other's books to be opened, which is a partnership neither has ever had to describe out loud.\n\nHe buys silence in warehouse keys, berth priority and hoist precedence, never in coin, because coin is the single thing he does not have to hand. Anyone who notices the pattern of what he pays with has effectively read the reserve. [[npc.ilke-samarost|Ilke Samarost]]'s missing audit does not name the reserve, but it names his house among the eleven-day salt buyers, and he has never been sure the two documents are not the same document.",
      combatRole: 'None. He has never held a weapon and could not hold one convincingly. Two Concord bailiffs are always within a shout.',
      skills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.brokerage', 'skill.the-cold-read', 'skill.chartering'],
      skillNotes:
        'The best ledger hand in the basin and probably on the continent: he can read a cooked book across a table upside down and will not mention it until the price of mentioning it has moved. Cannot ride, cannot swim, has never been more than four days from the confluence. Set social checks against him high and let players win them on information rather than charm, because charm is the one currency he has an unlimited supply of.',
      inventory: ['item.factors-seal', 'item.stair-writ', 'item.oxblood-coat'],
      inventoryNotes:
        "The seal is the interesting object: it binds the fourth house to any contract it touches, and its loss must be reported within a day. He has stopped carrying it to the rate room, which two clerks have noticed. A stolen seal that is recut into a [[item.cut-seal|cut seal]] is worth more against him than against anyone else in the city, because his signature is the one nobody checks.",
      schedule: [
        row({ time: '04:40', place: 'Fourth house, private stair', doing: 'Reads the overnight barge tallies before any clerk arrives. The only hour he is genuinely alone and the only hour he can be reached without an appointment.' }),
        row({ time: '07:00', place: '[[district.gilded-ascent-counting-terrace|Counting Terrace]] arcade', doing: 'Walks the arcade end to end, greets by name, and takes soundings. Every ninth day this is replaced by the rate room and the arcade fills at dawn instead.' }),
        row({ time: '10:00 to 15:00', place: 'The rate room and the fourth house counting floor', doing: 'Appointments in half-hour blocks kept by a clerk who cannot be bribed but can be misdirected.' }),
        row({ time: '16:00', place: '[[district.gilded-ascent-bonded-vaults|Bonded Vaults]], vault 611 and the fourth-terrace crack', doing: 'Inspects the overloaded course personally, alone, and tells nobody why. He is looking for the day the building decides for him.' }),
        row({ time: '19:00', place: 'Fourth house dining room', doing: 'Dines with two or three principals. Business is not discussed and everything is settled.' }),
        row({ time: '23:00 to 02:00', place: 'Fourth house, upper study', doing: 'Rewrites the reserve position by candle, burns the working, keeps the total in his head. The burnt paper in that grate is evidence.' }),
      ],
      relationshipNotes:
        "[[npc.cesille-vaudry|Cesille Vaudry]] is his creditor and his debtor at once and they have met four times. [[npc.brask-vellmar|Brask Vellmar]] does not know it, but the pressure that made him re-sign the No. 3 main arrived from this office, because a stopped grain lift shows in the rate within three days. [[npc.doret-halvane|Doret Halvane]] he treats as a service, which she resents more than she admits. [[npc.ossane-gorbea|Ossane Gorbea]] owes him against next year's mirror-hours, which makes the Ascent the karst's largest creditor and Wessel the man who could starve a city by declining to roll a debt.",
      dialogueNotes:
        'Never confirms a number. He restates your number back to you slightly altered and watches whether you accept the alteration, which is how he prices you. Responds to evidence, not to threats: a party that arrives with a document gets a different man than a party that arrives with a weapon. If cornered he will offer a genuine, generous, immediately payable deal, because his whole problem is that he cannot pay later.',
      sampleLines: [
        '"You have said a figure. I am going to say it back to you, and you are going to tell me whether I have understood you."',
        '"I do not have coin for you. I have a warehouse, a berth and eleven days of precedence on the hoists. In this city that is better than coin, which you already know, or you would not be in this room."',
        '"The rate is not a prediction. It is a promise, and I have never yet broken one on a ninth morning."',
      ],
      questNotes:
        "Sits behind [[quest.short-weight|Short Weight]] without appearing in it, and behind [[quest.the-master-weight|The Master Weight]] directly: a false standard is survivable for him and a re-assay is not. In [[quest.the-scar-concession|The Scar Concession]] he is bidding with money he does not have, which is the only reason the auction is winnable by anyone else. He will also quietly fund [[quest.open-account|Open Account]], because a lawful highland route is a real asset he could sell.",
      playerChoices: [
        'Take his retainer (warehouse keys and hoist precedence) and become the instrument he uses to delay the audit, which is comfortable and gets steadily worse',
        'Prove the reserve position and publish it, collapsing the clearing rate: every stair writ in play is repriced and six cities feel it inside a month',
        'Prove it and sell him the silence instead, which makes a party the second most powerful thing in the basin and ties them to the collapse when it comes',
        "Hand the reserve position to [[faction.standing-hour|the Standing Hour]] rather than to a rival house, which turns a financial fact into a strike nobody can buy off",
        'Warn him about the No. 3 cable before it parts, and watch him weigh four hundred lives against three days of rate movement in front of you',
      ],
      repReactions: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'Trusted', reaction: 'Sees the party at an hour of their choosing and speaks plainly about everything except the reserve.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'Hostile', reaction: 'Never refuses a meeting and never grants one; the clerk offers dates eleven weeks out, forever.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Treats the party as a negotiating counterparty rather than a nuisance, and will make a real offer to keep the yards turning.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'Known', reaction: 'Will still deal, through an intermediary, and will make sure the intermediary is the one prosecuted if it goes wrong.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Warm and useless: he assumes anyone the Hall likes is holding paper he might need to buy.' }),
      ],
      devNotes:
        PROPOSAL('Wessel is written as the human face of mechanic.standing-ledger: the city\'s credit crisis with a pulse. The load-bearing choices are that he pays in access rather than coin, and that he is not corrupt so much as arithmetically trapped. If the campaign never touches the reserve he is simply a useful, courteous patron, which is the point.') +
        '\n\nHooks the reserve to city.sky-city through Cesille Vaudry, so a Sky City disaster is automatically an Ascent financial event.',
    },
  }),

  E({
    id: 'npc.doret-halvane',
    type: 'npc',
    name: 'Doret Halvane',
    status: 'draft',
    summary: 'Hoist-yard fixer who can find anyone in the Gilded Ascent for the price of a cable inspection.',
    tags: ['gilded-ascent', 'criminal', 'fixer', 'labour'],
    fields: {
      title: 'Cable-inspection broker, Hoist Yards',
      aliases: ['Halvane of the gate', 'The Inspection'],
      species: 'Human, river-born, raised on the wharves',
      age: '41',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Short, thick through the shoulders from twelve years of climbing sheave frames, with a splice-hook scar that runs from her right wrist to the base of the thumb. Wears a condemned [[material.stairwire|stairwire]] loop as a belt because it is free and it advertises the trade. Half-deaf in the left ear from the drum houses and turns her head to listen, which strangers read as suspicion and is only hearing.',
      home: ['district.gilded-ascent-hoist-yards'],
      currentLocation: ['district.gilded-ascent-hoist-yards'],
      occupation: 'Licensed cable-inspection broker; unlicensed everything else',
      standing:
        "Respectable on paper and understood in practice. An inspection booking is a lawful reason to be inside a bonded property with a lamp, a ladder and nobody watching, and she has been selling that hour for twelve years. The yards protect her because she gets crews paid; the [[faction.concord-of-weights|Concord]] tolerates her because the alternative is not knowing where anything is.",
      personality:
        'Blunt, funny, and completely without sentiment about the work, which she describes as clerking with a ladder. She keeps her word to the letter and not one word further, and she says so first so that nobody is disappointed later. The only subject that makes her stupid is her brother, and she knows that too.',
      traits: ['blunt', 'methodical', 'unsentimental', 'literal-minded about promises', 'one soft spot'],
      voice: 'Yard-loud out of habit, flat delivery, ends offers with the price so there is no haggling afterwards',
      goals: [
        "Get her brother's indenture out of a strongroom in [[city.sifting-city|the Sifting City]] and burn it in front of him",
        'Stay legal enough that the inspection licence is never reviewed',
        'Never have to use the wax board, because using it once ends the trade forever',
      ],
      fears: [
        'That the papers have already been sold on and there is nothing left to trade for',
        'A licence review that starts with the inspections she signed but did not attend',
        'The No. 3 main parting on a shift she booked',
      ],
      beliefs: [
        'Everything in this city is findable; the only question is what the finding costs',
        'Paper owns people, so paper is the only thing worth stealing',
        'A favour is a debt with better manners',
      ],
      secrets:
        "A board of sixty-odd wax impressions of bonded warehouse keys, taken over twelve years of entirely legitimate inspections, hangs behind a false back in her lock-up. It is the single most valuable object in [[district.gilded-ascent-bonded-vaults|the Bonded Vaults]] and she has never used one.\n\nThe lever is not money. Her brother's [[item.indenture-bond|indenture papers]] sit in a strongroom on [[district.sifting-city-assay-row|Assay Row]], under [[npc.tazrit-nourem|Tazrit n'Ourem]]'s hand, and she will trade the entire board for them without haggling. She has said this out loud exactly twice.",
      combatRole: 'Yard fighter. A splice hook, a short reach and no interest in a second exchange. Runs early and knows every gate.',
      skills: ['skill.cable-and-drum', 'skill.quiet-ground', 'skill.fence-work', 'skill.the-cold-read', 'skill.market-ear'],
      skillNotes:
        'Reads a hoist yard the way a clerk reads a page: she can tell you which run is short-crewed today and therefore which gate is unwatched. No literacy beyond tallies and her own shorthand, which is a genuine limit on her: contracts have to be read to her, and she has been cheated that way once.',
      inventory: ['item.assayers-tray', 'item.oxblood-coat'],
      inventoryNotes:
        "The assayer's tray is stolen, unstamped and used purely as a prop: nobody questions a woman carrying test kit through a bonded door. The oxblood coat is her brother's, with his tallies still on the cuff, which is technically the fraud of wearing unearned tallies and is the one charge she would go down for.",
      schedule: [
        row({ time: '05:30', place: 'Yard gate, [[district.gilded-ascent-hoist-yards|Hoist Yards]]', doing: 'Takes bookings at the gate while the first shift is called. Anyone can approach her here; nobody can speak privately.' }),
        row({ time: '07:00 to 12:00', place: 'Wherever the day\'s inspection is', doing: 'Actual, competent cable work. If a party wants inside a bonded vault legally, this is the window and the price is a real inspection they help her finish.' }),
        row({ time: '13:00', place: 'Splice shed, third run', doing: 'Eats standing. Talks to [[npc.brask-vellmar|Brask Vellmar]] most days and argues with him about the No. 3 twice a week.' }),
        row({ time: '16:00', place: 'Her lock-up under the second drum house', doing: 'Alone, books and board. The one hour the wax impressions are out of the wall.' }),
        row({ time: '20:00', place: 'The mouth of [[district.gilded-ascent-under-stair|the Under-Stair]]', doing: 'Drinks with yard crews and Standing Hour stewards. Information moves both ways and she charges in both directions.' }),
      ],
      relationshipNotes:
        "[[npc.brask-vellmar|Brask Vellmar]] signs inspections she did not always attend, which makes them mutually ruinous friends. [[npc.tazrit-nourem|Tazrit n'Ourem]] holds the only thing she wants and does not yet know she wants it badly enough to hand over the board. [[npc.perrine-orlaunt|Perrine Orlaunt]] is the Sky City end of the same unlogged route and the two of them have never met in daylight. She sold [[npc.ilke-samarost|Ilke Samarost]] a lodging address in the Under-Stair fourteen months ago and has not stopped thinking about it.",
      dialogueNotes:
        'States the price first and then listens. Will not be flattered, will not be threatened, and treats an attempt at either as a completed negotiation in her favour. If a party mentions the Sifting City strongroom she goes quiet, and the quiet is the most information she has ever given anyone.',
      sampleLines: [
        '"Four writs and a name I can check. If the name checks I find them by the second bell. If it does not, I keep the four writs, and you have learned something about your friend."',
        '"I have never opened a bonded door I was not paid to open. Read that sentence again and you will see what is wrong with it."',
        '"He signed the paper because he was nineteen and cold. That is the whole story. There is no part of it where anyone was clever."',
      ],
      questNotes:
        "The obvious way into [[quest.the-master-weight|The Master Weight]] and into any vault work in [[district.gilded-ascent-bonded-vaults|the Bonded Vaults]]. Her brother's papers make [[district.sifting-city-assay-row|Assay Row]] a destination for an Ascent party with no other reason to cross the Pans, which is exactly what she is for.",
      playerChoices: [
        'Buy her services straight and stay a customer, which keeps the yards open to you and nothing more',
        "Bring her the brother's indenture and take the wax board, which arms a party with sixty bonded doors and makes them the prime suspect for every theft in the district for a year",
        'Bring her the brother and not the papers, which is a rescue she did not ask for and cannot legally keep',
        'Sell the board to the Concord instead: she is finished in the city inside a week and every key is recut at the party\'s expense',
        'Tell her who sold Ilke Samarost the lodging address, if the party ever works it out',
      ],
      repReactions: [
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Cuts her fee by half and starts offering work rather than waiting to be asked.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Polite, expensive and useless. She assumes she is being audited and gives only lawful service.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Introduces the party to yard stewards and will hold a booking open during a stoppage.' }),
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', standing: 'Any', reaction: 'Interrogates the party about Sifting City strongrooms and does not pretend otherwise.' }),
      ],
      devNotes:
        PROPOSAL('The wax board is the mechanical payload: a one-use master key to the Bonded Vaults with a fixed, non-monetary price attached. Written so that a party cannot simply pay for it, and so that taking it has a permanent cost to her.') +
        '\n\nDeliberately illiterate beyond tallies, per skill.plain-letters guidance that literacy is not assumed.',
    },
  }),

  E({
    id: 'npc.brask-vellmar',
    type: 'npc',
    name: 'Brask Vellmar',
    status: 'draft',
    summary: 'Cable inspector on the Counting Stair hoists. His signature lets the terraces load, and he has already been made to lie once.',
    tags: ['gilded-ascent', 'labour', 'disaster', 'evidence'],
    fields: {
      title: 'Senior cable inspector, Oxblood Hoists',
      aliases: ['Vellmar of the No. 3'],
      species: 'Human, basin-born',
      age: '46',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Tall, stooped from a working life spent looking up, with the wire-scarred forearms of a man who has passed ten thousand feet of hawser through his bare hands. Carries a magnifier on a cord and a stub of chalk. Sleeps badly and it is visible; the yards have started to remark on it, which frightens him more than the cable does.',
      home: ['district.gilded-ascent-hoist-yards'],
      currentLocation: ['district.gilded-ascent-hoist-yards'],
      occupation: 'Senior inspector, [[machine.the-oxblood-hoists|the Oxblood Hoists]]',
      standing:
        'One of about nine people whose signature can stop a run, and the only one senior enough to stop the No. 3 main. Well liked in the yards and increasingly avoided, because everyone can see he is carrying something and nobody wants to be the person he tells.',
      personality:
        'Careful, decent and slow, in the way of a man whose trade punishes speed. He is not brave and has never claimed to be. What he has instead is an inability to throw anything away, which is the only reason the evidence still exists. Under pressure he agrees, goes home, and cannot sleep.',
      traits: ['meticulous', 'frightened', 'decent', 'hoards evidence', 'agrees too easily'],
      voice: 'Technical and precise until the subject is himself, then vague and apologetic',
      goals: [
        'Get the No. 3 main condemned by somebody who is not him',
        'Keep his ticket, because the ticket is the only thing his family has',
        'Be able to say out loud what he did without losing the yards',
      ],
      fears: [
        'The parting. He has run the arithmetic and knows roughly where and roughly how many.',
        'His own signature being read out in a hearing',
        'That the consortium already knows about the tin under his bench',
      ],
      beliefs: [
        'A cable tells you before it goes, and the only failure is the one nobody wrote down',
        'The condemned wire on every washing line in the yards is a slow accident the city has agreed not to see',
        'He is not a coward, he is a man with three dependants, and both things are true',
      ],
      secrets:
        "He failed the No. 3 main two seasons ago and was made to re-sign it. The original strand samples, dated, are in a tobacco tin under his bench in the splice shed, and the tin has been there so long it is part of the furniture.\n\nThe pressure did not come from the hoist consortium alone. A clerk of the fourth house made it clear that a stopped grain lift moves the clearing rate within three days, which means [[npc.wessel-ondriek|Wessel Ondriek]]'s office is in this and Brask has no way to prove it. The No. 3 carries grain to the upper terraces. If it parts loaded, the shed it lands in is the second drum house.",
      combatRole: 'Non-combatant. Will freeze, and then will do something practical and useful with rope.',
      skills: ['skill.cable-and-drum', 'skill.bench-sense', 'skill.proof-marking', 'skill.plain-letters'],
      skillNotes:
        'The best diagnostic eye in the yards: give him thirty seconds with a hawser and he will tell you its remaining life in weeks. His proof mark carries his liability, which is precisely the problem, because he has now signed a lie with it and the mark is on record.',
      inventory: ['item.assayers-tray'],
      inventoryNotes:
        'A licensed field kit, a magnifier, chalk, and the tin of strand samples he does not carry and cannot bring himself to move. Anyone who searches the splice shed bench finds it in about ten minutes; the difficulty is not the search, it is being in the shed.',
      schedule: [
        row({ time: '06:00', place: 'Splice shed, [[district.gilded-ascent-hoist-yards|Hoist Yards]]', doing: 'Morning inspection round of the day\'s working runs. Public, watched, and no use to anyone who wants him alone.' }),
        row({ time: '09:30', place: 'Drum house two', doing: 'Brake and drum checks. This is where the tin is, and the shed is empty for about forty minutes while the crews change over.' }),
        row({ time: '12:00', place: 'Yard gate', doing: 'Argues with [[npc.doret-halvane|Doret Halvane]] about bookings he has signed and not attended.' }),
        row({ time: '15:00', place: 'The No. 3 head sheave, above the fourth terrace', doing: 'Climbs it alone most days, which nobody has asked him to do, and looks at the same eleven feet of wire.' }),
        row({ time: '18:30', place: 'His rooms, third terrace', doing: 'Home, three dependants, no drink. He is reachable here and will talk here and nowhere else.' }),
        row({ time: '02:00', place: 'Awake', doing: 'The reason the yards have started to remark on his face.' }),
      ],
      relationshipNotes:
        "[[npc.doret-halvane|Doret Halvane]] is his friend and his exposure: he has signed inspections she conducted alone. He has never met [[npc.wessel-ondriek|Wessel Ondriek]] and blames him precisely and privately. He would trust [[npc.aubran-ferrieu|Aubran Ferrieu]] on sight if the two were ever in a room, because they are the same man at different distances from the collapse.",
      dialogueNotes:
        'Will not volunteer anything on a first meeting and will answer any technical question honestly and at length, which is how a party gets in: ask him about wire, not about himself. If a player offers to carry the condemnation instead of him, he cries, and then he gives them the tin.',
      sampleLines: [
        '"Six broken wires in a lay length. The rule is one. You do not need me to tell you what the rule is for."',
        '"I signed it. Nobody held my hand. I want that understood before you decide what I am."',
        '"If it goes at the head sheave it lands in drum house two, and drum house two has eleven men in it at any hour you care to name."',
      ],
      questNotes:
        'The condemnation is a city-scale lever a party can pull deliberately: stopping the No. 3 starves the upper terraces of grain within a day and moves the loaf price, which moves the rate, which is [[npc.wessel-ondriek|Ondriek]]\'s problem. Alternatively the cable answers the question itself on a schedule the table controls, and the party gets to have been the people who knew.',
      playerChoices: [
        'Take the strand samples to the Salt Office and force a condemnation, stopping the grain lift and starting a political fight the party is now inside',
        'Sell his silence to the hoist consortium, which pays extremely well once',
        'Give the samples to [[faction.standing-hour|the Standing Hour]], turning a safety case into a stoppage nobody can buy off',
        'Do nothing and let the timetable run, which is a legitimate choice and should be played out in full when it parts',
        'Get him and his dependants out of the basin before any of the above, which is the only ending where he lives comfortably',
      ],
      repReactions: [
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Speaks freely on the first meeting and asks the party to carry it for him.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Polite, technical, terrified. Assumes the party is the audit and says nothing that is not on a form.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'Known', reaction: 'Refuses to be seen with them in the yards but will meet at his rooms after dark.' }),
      ],
      devNotes:
        PROPOSAL('The tin under the bench is the whole design: physical, findable, dated evidence with a fixed location and a short window. The re-signing is written as institutional pressure rather than a bribe, so that exposing it implicates an office rather than a villain.') +
        '\n\nIf the campaign lets the cable part, treat it as a scheduled world event and give the table warning through Brask, not through dice.',
    },
  }),

  E({
    id: 'npc.ilke-samarost',
    type: 'npc',
    name: 'Ilke Samarost',
    status: 'draft',
    summary: 'Salt Office ledger-clerk, found dead at the foot of the Counting Stair fourteen months ago. Ruled a fall.',
    tags: ['gilded-ascent', 'dead', 'investigation', 'evidence'],
    fields: {
      title: 'Ledger-clerk, second window, Salt Office',
      aliases: ['The fall at the foot of the Stair'],
      species: 'Human, karst-born, came down the Karst Fork at nineteen',
      age: 'Thirty-four at death',
      pronouns: 'she/her',
      state: 'Dead',
      appearance:
        'From the Salt Office ticket that is still pinned in her old section: small, sharp-faced, ink to the second knuckle, hair cut short because the office is hot. Nobody has taken the ticket down. Her desk has been reassigned twice and the drawer still has her chalk in it.',
      home: ['district.gilded-ascent-under-stair'],
      currentLocation: ['district.gilded-ascent-salt-office'],
      occupation: 'Ledger-clerk, licence and tariff section (deceased)',
      standing:
        'Nobody in life. A second-window clerk on eleven writs a season, which is exactly why the audit she was compiling was possible: nobody watches what the second window reads. In death she is a story the [[district.gilded-ascent-salt-office|Salt Office]] tells to explain why clerks should not be clever.',
      personality:
        'Reconstructed from her margins, which is all anyone has. Precise, sarcastic on paper, and incapable of leaving an inconsistency alone. She annotated her own working with jokes and then crossed them out. Two colleagues describe her as difficult, and both of them still keep her chalk.',
      traits: ['precise', 'stubborn', 'sardonic in the margins', 'not careful enough'],
      voice: 'Only survives in handwriting: small, upright, and increasingly hurried in the last eleven pages',
      goals: [
        'Finish the audit (unfinished)',
        'Get out of the Under-Stair lodging she could not afford to leave (unfinished)',
      ],
      fears: [
        'Being wrong in public, which is the fear that made her check everything three times and take fourteen months to be killed',
      ],
      beliefs: [
        'A licence bought before a tariff moves is not a coincidence eleven times running',
        'The Salt Office is honest at a known and stable price, which is a thing you can measure',
      ],
      secrets:
        "The final audit names which counting houses bought salt licences in the eleven days before the tariff moved. It was never recovered because it is not hidden in the ordinary sense: it is plastered into the wall of her old lodging in [[district.gilded-ascent-under-stair|the Under-Stair]], now let to a family who do not know and would be evicted for the discovery.\n\nEvery house that profited assumes a rival already holds it, which is why nobody has searched openly in fourteen months and why the room is still let rather than pulled apart. Whether she fell, jumped or was helped is not established. What is established is that the audit was in the room before she went up the Stair and was not on her when she came down.",
      combatRole: 'None, and the manner of death is a live question rather than a fact',
      skills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.writ-craft'],
      skillNotes:
        'A working clerk, not an investigator. Her method was simply to read every licence in her own section against the tariff dates, which took fourteen months and required no skill at all beyond refusing to stop. That is worth stating to players: the audit was not clever, it was patient, and it can be repeated by anyone with access and a year.',
      inventory: [],
      inventoryNotes:
        'Her effects were three writs, a chalk stub, a Salt Office ticket and no keys, which the wardens noted and nobody pursued. The missing keys are the only anomaly in the file and the file is four pages long.',
      schedule: [
        row({ time: 'Historical', place: '06:30, [[district.gilded-ascent-salt-office|Salt Office]] second window', doing: 'Licence intake. Fourteen months of reading her own section against tariff dates.' }),
        row({ time: 'Historical', place: '19:00, her lodging, [[district.gilded-ascent-under-stair|the Under-Stair]]', doing: 'Copying. The plaster patch behind the bed frame dates from the last six weeks of this.' }),
        row({ time: 'The last evening', place: '[[landmark.the-counting-stair|The Counting Stair]], landing 7', doing: 'Seen going up by two witnesses, neither of whom was asked what she was carrying.' }),
        row({ time: 'Now', place: 'Salt Office, section files', doing: 'Her working papers are still filed under her initials because nobody has been paid to reindex them.' }),
      ],
      relationshipNotes:
        "[[npc.doret-halvane|Doret Halvane]] found her the lodging and can point at the exact arch, which she has not volunteered to anyone. [[npc.wessel-ondriek|Wessel Ondriek]]'s house is named in the audit, though not alone and not first. [[npc.halvo-sarn|Halvo Sarn]] is a useful contrast for a table that has met both: the same job, the opposite decision, and one of them is alive.",
      dialogueNotes:
        "She is dead; the dialogue is other people's. The Salt Office section head calls her difficult and will not say more sober. Her landlord is a Compact of nobody, a man who re-let the room in nine days and does not want it opened. If the table uses [[spell.the-witnessing|the Witnessing]] on a witness from the Stair, the memory costs that witness the memory permanently, which is the price of the shortcut.",
      sampleLines: [
        '"Eleven days. Eleven. If it were one house I would call it luck." (margin note, fourth working book)',
        '"Do not reindex this section until I say." (her last written instruction, ignored within a fortnight)',
      ],
      questNotes:
        'The audit is a physical object in a known room with people living in it: recovering it evicts a family, and doing it quietly is a different job from doing it fast. Any house named in it will pay to bury it and pay more to hold it. It also connects sideways to [[quest.short-weight|Short Weight]], because the same eleven days appear in the guild\'s own freight books.',
      playerChoices: [
        'Recover the audit and publish it, which ends several houses and makes the party enemies with survivors rather than victims',
        'Recover it and hold it, which is the most powerful and most corrosive option in the basin',
        'Sell it back to the houses named in it, individually, which pays four times and is discovered eventually',
        'Warn the family in the lodging before anyone else searches, which costs the party the audit and gains them the Under-Stair',
        'Establish how she actually died, which is a separate investigation with no financial reward attached',
      ],
      repReactions: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'The section head will let the party read her filed working papers, which name the method but not the houses.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Under-Stair stewards will hold the arch open, keep the family fed elsewhere for a night, and expect the audit to be read aloud.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Offers to buy it unread, immediately, for more than it is worth, which tells the party something.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the essentials: dead, ruled a fall, audit plastered into a wall in a re-let room. Added here: the missing keys as the one loose thread in the wardens\' file, and the deliberate ambiguity that nobody has searched openly because every guilty house assumes a rival already won.') +
        '\n\nDo not resolve the death in the seed. It is more useful as an open verdict the table decides.',
    },
  }),

  /* ================================================================ */
  /* THE SKY CITY                                                      */
  /* ================================================================ */

  E({
    id: 'npc.cesille-vaudry',
    type: 'npc',
    name: 'Cesille Vaudry',
    status: 'draft',
    summary: 'Warden of the Mooring Crown, whose house holds the second counterweight lease and whose tonnage returns are forged.',
    tags: ['sky-city', 'power', 'fraud', 'mooring-assize'],
    fields: {
      title: 'Warden of the Mooring Crown',
      aliases: ['The Second Lease', 'Warden Vaudry'],
      species: 'Human, born aloft, which she mentions',
      age: '52',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        "Thin in the way the Sky City's rated allowances make people thin, and dressed to make it look like discipline rather than arithmetic. Grey wool cut close, no jewellery above a stated mass, and a warden's tally chain she wears even at dinner. Her hands shake very slightly in the mornings and she has begun taking her first appointment after eight for that reason.",
      home: ['district.sky-city-crown-houses'],
      currentLocation: ['district.sky-city-crown-houses'],
      occupation: 'Warden of [[landmark.the-mooring-crown|the Mooring Crown]]; principal of the second counterweight lease',
      standing:
        "The most senior office in the city that is not simply a lease, and she holds both. The [[faction.mooring-assize|Mooring Assize]] made her Warden because her house had most to lose from a bad load, which was intended as a safeguard and has worked out as a conflict of interest that nobody can now unpick without unpicking the city.",
      personality:
        "Formal, exact, and much braver than she is given credit for. She has spent four years refusing to sign eviction lists, which is the only reason the underdeck still has people in it, and she has paid for that refusal in forged arithmetic rather than in courage. She talks about the city as a machine with a duty roster, and about the people on it as load. She hears herself do it.",
      traits: ['formal', 'stubborn', 'guilt-driven', 'precise', 'sleeping badly'],
      voice: 'Clipped, official, and slips into mass-warrant vocabulary when she is frightened, so people become tonnage mid-sentence',
      goals: [
        'Get the true tonnage down without a single name going down the ropes',
        'Keep the Ascent from calling the counterweight paper before she has solved it',
        'Never sign an eviction list',
      ],
      fears: [
        'The updraught slackening, which the Assize surveys say it is already doing',
        'Somebody else proving the true figure first and choosing which quarter is lightened',
        'Being remembered as the Warden who lied rather than the Warden who would not evict',
      ],
      beliefs: [
        'A city is a rated structure and rated structures do not negotiate',
        'An eviction list is a death list with a queue attached',
        'A forged number that buys a year is worth more than an honest one that kills next week',
      ],
      secrets:
        "The Sky City is carrying several hundred tonnes over its rated load and has been for at least two years. Her tonnage returns are forged, competently, by her own hand, using the same method she was trained to detect.\n\nWhoever proves the true figure also acquires the right to decide which quarter goes down the ropes, and that, not the money, is the prize. She is quietly funding [[npc.perrine-orlaunt|Perrine Orlaunt]] to take unregistered people off the city by night, because ballast-running is the only way she has found to reduce load without a list. She has never spoken to Perrine directly. Her creditor is [[npc.wessel-ondriek|Wessel Ondriek]], and neither of them can afford the other to be audited.",
      combatRole: 'Non-combatant, but the Crown wardens answer to her and there are eleven of them within a bell.',
      skills: ['skill.ledger-hand', 'skill.lattice-work', 'skill.writ-craft', 'skill.plain-letters', 'skill.the-cold-read'],
      skillNotes:
        'Trained as a lattice hand before she was ever a warden and still goes out on the rigging twice a season, which is unusual for her rank and is how she knows the true figure: she has felt the stays. Set any deception check against her using [[skill.ledger-hand|Ledger Hand]] rather than social skill, because paper is the only place she can be caught.',
      inventory: ['item.ballast-jacket', 'item.crown-bolt', 'item.stair-writ'],
      inventoryNotes:
        'The [[item.crown-bolt|crown bolt]] on her desk is an original lattice bolt taken out during a repair she supervised, kept as a paperweight and worth a small fortune to the right buyer. The stair writs are the Ascent advance, and the fact that she is holding them uncashed is itself evidence of what she is planning.',
      schedule: [
        row({ time: '05:00', place: '[[landmark.the-mooring-crown|The Mooring Crown]], eye walk', doing: 'Walks the inner ring alone before the masts open. Watched by nobody; the one hour she can be intercepted.' }),
        row({ time: '08:00', place: 'Warden\'s room, [[district.sky-city-crown-houses|Crown Houses]]', doing: 'Returns, load sheets and the forging, which is done first thing while the office is empty.' }),
        row({ time: '11:00', place: '[[district.sky-city-mooring-ring|Mooring Ring]]', doing: 'Attends arrivals at masts three, six and eleven personally, which is far more than the office requires.' }),
        row({ time: '14:00', place: 'Assize chamber', doing: 'Sits on load and lease business. Public, minuted, and the minutes are readable by anyone with standing.' }),
        row({ time: '18:00', place: 'The ninth house counting room', doing: 'Her own house books. The second, true set of tonnage figures is here, not in the Warden\'s room.' }),
        row({ time: '22:00', place: 'Crown Houses, her rooms', doing: 'Alone. Refuses all callers. Has not slept a full night since the surveys came in.' }),
      ],
      relationshipNotes:
        "[[npc.aubran-ferrieu|Aubran Ferrieu]] holds the sheets from the week of the Sixth Mast collapse and she has never been able to establish whose seal they name, which is a question she asks the ceiling most nights. [[npc.perrine-orlaunt|Perrine Orlaunt]] is her instrument and does not know it. [[npc.wessel-ondriek|Wessel Ondriek]] is the only person alive who could ruin her with a letter, and she is the only person alive who could ruin him the same way.",
      dialogueNotes:
        "Answers questions about the city fully and questions about herself in the third person. Offers a party official work almost immediately, because official work is easier to watch than unofficial work. If shown the true figure she does not deny it; she asks the party what they intend to do about the underdeck, and the answer decides everything that follows.",
      sampleLines: [
        '"The city is rated at a figure. I am the person who writes the figure down. You are asking me a question about honesty and I am answering you with one about weight."',
        '"There is no version of the list that does not begin with the Underdeck. That is what a list is for."',
        '"I have signed nothing that killed anyone. I want you to notice how carefully I have chosen those words."',
      ],
      questNotes:
        'The pivot of [[quest.the-second-ledger|The Second Ledger]]: the true tonnage figures are the second book, and copying them makes a party the arbiter of who is evicted. Also a hidden hand in [[quest.the-sixteenth-mast|The Sixteenth Mast]], since an unregistered mast is unrecorded mass, which she wants stopped for reasons that have nothing to do with smuggling.',
      playerChoices: [
        'Copy the true figures for the Ascent, giving [[npc.wessel-ondriek|Ondriek]] leverage and putting the eviction decision in a creditor\'s hands',
        'Take the figures public in the Assize, which forces an immediate lightening and a scramble over which quarter carries it',
        'Help her run ballast descents faster, reducing load without a list and drowning the [[district.sky-city-the-underdeck|Underdeck]] in people who no longer legally exist anywhere',
        'Expose her forgery alone, which removes the only warden refusing to sign lists and gets the lists signed within a fortnight',
        'Trade her the Sixth Mast sheets in exchange for the second lease itself, which makes the party a Sky City house',
      ],
      repReactions: [
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', standing: 'High', reaction: 'Gives the party warrant work, mast access and a room aloft, all of it minuted.' }),
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', standing: 'Hostile', reaction: 'Has them weighed at every mast and their warrant reviewed until leaving is cheaper than staying.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Cold and careful; assumes they are here to value her house rather than to help it.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Will meet them privately, off the ring, and is the only Warden in the city who would.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the forged returns and the eviction lists. Added: that she is secretly funding ballast-running as an alternative to eviction, which makes her complicit in the crate death without knowing it, and ties the Sky City fraud directly to the Ascent reserve through her creditor.') +
        '\n\nThe design intent is that exposing her is not a win. Every honest outcome ends with somebody choosing a quarter.',
    },
  }),

  E({
    id: 'npc.aubran-ferrieu',
    type: 'npc',
    name: 'Aubran Ferrieu',
    status: 'draft',
    summary: 'Stripped mass-registrar, barred from the lattice since the Sixth Mast collapse, holding the sheets that name the seal.',
    tags: ['sky-city', 'evidence', 'disgraced', 'investigation'],
    fields: {
      title: 'Mass-registrar, struck off',
      aliases: ['The Shelf-Foot Registrar', 'Ferrieu of the Sixth'],
      species: 'Human, born aloft, resident on the ground for four years',
      age: '61',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        "Heavy now, which is what four years of ground rations and no rated allowance does, and he is aware that his own body is evidence of where he lives. Clean, shaved, coat brushed daily: the deliberate presentation of a man arguing that he is not what he was called. Wears his struck registrar's chain with the plate filed off, which is illegal and has never been prosecuted.",
      home: ['district.sky-city-shelf-foot'],
      currentLocation: ['district.sky-city-shelf-foot'],
      occupation: 'Formerly mass-registrar of the lattice; now writes letters and weighs freight for ground merchants',
      standing:
        "Nothing aloft and a curious authority below. In [[district.sky-city-shelf-foot|Shelf-Foot]] he is the man who will read your warrant and tell you honestly what it means, for nothing, which has made him the nearest thing the ground town has to a magistrate. Aloft his name is a shorthand for blaming the clerk.",
      personality:
        "Dignified, boring on purpose, and utterly immovable. He has told his account so many times that it has become flat and citable, which is exactly why nobody believes it and exactly why it is true. He wants a hearing, not money, and will not be moved off that by any sum, any threat or any sympathetic offer to publish anonymously.",
      traits: ['punctilious', 'unbribable', 'rehearsed', 'stubborn', 'lonely'],
      voice: 'Formal, procedural, cites regulation numbers from memory and then apologises for citing them',
      goals: [
        'A hearing before the Assize with the sheets read into the minute',
        'His registration restored, which matters more to him than any of the deaths',
        'To go above the lip one more time before he dies, which he has not said aloud to anyone',
      ],
      fears: [
        'Dying with the sheets still in a box under a bed',
        'Handing them to somebody who sells them',
        'That the seal on the overload order belongs to someone the Assize will simply refuse to hear',
      ],
      beliefs: [
        'A register is a promise about the physical world and falsifying one is a species of murder',
        'The city killed those people with a signature and then blamed the man who wrote the tally',
        'Process is not an obstacle to justice, it is the only form justice has ever taken',
      ],
      secrets:
        "He kept the true tonnage sheets from the week [[landmark.the-sixth-mast|the Sixth Mast]] came down, complete, dated and countersigned. They show a signed overload order.\n\nWhose seal is on that order is the thing he will not say to anyone who cannot credibly promise a hearing, because saying it once to the wrong person ends it. He has never been above ground in four years, and the sheets are in a lead-lined ballast box under the floor of his room, which is also the reason he has never left the room for more than a day.",
      combatRole: 'None. If it comes to violence he will stand in front of the box, which is not a plan.',
      skills: ['skill.ledger-hand', 'skill.writ-craft', 'skill.plain-letters', 'skill.bench-sense'],
      skillNotes:
        'Knows the mass warrant regime better than anyone currently practising, including the Assize\'s own clerks, and can draft a filing that survives a hostile hearing. Physically unfit for the lattice now and knows it, which is part of what makes going up again a real and slightly terrible request.',
      inventory: ['item.stair-writ'],
      inventoryNotes:
        'One uncashed stair writ from an Ascent house that tried to buy the sheets in the first year. He keeps it as a receipt for having refused, which he considers the most valuable thing he owns.',
      schedule: [
        row({ time: '07:00', place: 'His room, [[district.sky-city-shelf-foot|Shelf-Foot]]', doing: 'Copies out one page of the sheets by hand every morning. There are now four complete copies and he will not say where three of them are.' }),
        row({ time: '09:00', place: 'The anchor yards', doing: 'Weighs and certifies ground freight for merchants, unofficially, for meals rather than coin.' }),
        row({ time: '13:00', place: 'The Shelf-Foot writ table, outside the forge row', doing: 'Reads warrants aloud for anyone who asks. This is where a party meets him without an introduction.' }),
        row({ time: '16:00', place: 'The foot of the eastern anchor cable', doing: 'Stands and looks up. Every day, in all weathers, for four years.' }),
        row({ time: '20:00', place: 'His room', doing: 'Alone with the box. He does not drink and does not receive visitors after dark, which is itself a security measure.' }),
      ],
      relationshipNotes:
        "[[npc.cesille-vaudry|Cesille Vaudry]] holds the office he was destroyed to protect and he does not know whether she is the seal or merely the successor, which is the single most useful uncertainty in the Sky City. [[npc.perrine-orlaunt|Perrine Orlaunt]] brings him post and takes nothing for it, which is the only kindness in his week. [[npc.brask-vellmar|Brask Vellmar]] in the Ascent is the same man four years earlier, and a party that has met both should be allowed to notice.",
      dialogueNotes:
        'Will recite the account in full to anyone, immediately, because it costs him nothing and he has stopped hoping. What he will not do is hand over anything. The unlock is not persuasion, it is a credible route to a minuted hearing: an Assize seat, a Concord petition, a Standing Hour platform, anything real. Offers of money make him more formal, not angrier.',
      sampleLines: [
        '"I am going to say this in the order it happened, because that is the only order I am permitted to say it in."',
        '"You are offering to publish it. Publication is a rumour with a printer. I want it read into a minute by a clerk who is obliged to write it down."',
        '"Four years. I have not been above the lip in four years. I could tell you the sound the stays make in a cross wind and I could not tell you what the eye looks like now."',
      ],
      questNotes:
        'His sheets are the documentary spine of any Sixth Mast investigation and cross-connect to [[quest.the-sixteenth-mast|The Sixteenth Mast]], since an unregistered mast is precisely the sort of unrecorded mass the collapse was caused by. A party that arranges a hearing gains a permanent institutional ally aloft. A party that steals the box gains a document nobody will accept.',
      playerChoices: [
        'Arrange a genuine Assize hearing, which is slow, political, and the only route that makes the sheets admissible',
        'Steal the box, which is easy and produces evidence with no provenance and no witness willing to stand behind it',
        'Trade the sheets to [[npc.cesille-vaudry|Cesille Vaudry]] for the second lease, betraying him precisely as everyone else has',
        'Carry him above the lip one last time, which buys more loyalty than any payment and is a genuine mass-warrant problem',
        'Establish whose seal is on the overload order and decide whether the answer is survivable for the city',
      ],
      repReactions: [
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', standing: 'High', reaction: 'Immediately hopeful and immediately suspicious; asks whether the party can put a hearing on the roll and checks the answer.' }),
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', standing: 'Hostile', reaction: 'Will still talk, at length, in public, on the writ table, which is his form of defence.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Offers a platform he distrusts and would take, if a party vouched for the minute-keeping.' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', standing: 'High', reaction: 'Refuses to send anything by sealed courier, because he has read the manifest of who reads them.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the sheets, the hearing-not-money demand and four years underground. Added: four hand copies whose locations he withholds, which prevents a single theft from closing the thread, and the unstated wish to go above the lip once more, which is the emotional lever rather than a transactional one.') +
        '\n\nWhose seal signed the overload is deliberately left open: it is the best available slot for a table\'s own antagonist.',
      },
  }),

  E({
    id: 'npc.perrine-orlaunt',
    type: 'npc',
    name: 'Perrine Orlaunt',
    status: 'draft',
    summary: 'Ballast-runner who takes unlogged cargo, and unlogged people, down the mooring lines at night.',
    tags: ['sky-city', 'criminal', 'smuggling', 'low-tally'],
    fields: {
      title: 'Ballast-runner, western shafts',
      aliases: ['Night ballast', 'Orlaunt of the Drop'],
      species: 'Human, Shelf-Foot born, works aloft on a crew warrant',
      age: '33',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        "Wiry, rope-burned to the elbow, and dressed in whatever the last descent left her: crew canvas, a cut-down [[item.ballast-jacket|ballast jacket]] with the lead shot removed from four pockets, and lamp-black on her hands that she no longer bothers to wash off. Speaks with her chin down. Everyone who works the shafts learns to talk without opening their mouth wide in cold air.",
      home: ['district.sky-city-the-underdeck'],
      currentLocation: ['district.sky-city-the-underdeck'],
      occupation: 'Ballast crew by warrant; unlogged descents by night',
      standing:
        "Invisible officially, indispensable practically. Half the [[district.sky-city-the-underdeck|Underdeck]] owes her a descent and she keeps no book of it, which is either principle or self-protection depending on which day you ask. The [[faction.mooring-assize|Assize]] knows the trade exists and has never worked out how to stop it without admitting how many unregistered people are aloft.",
      personality:
        "Practical, funny in short bursts, and dead flat about risk. She quotes odds rather than reassurance, which people find either honest or terrifying. Since the crate she has stopped taking descents she does not personally rig, and she has started refusing work for reasons she does not explain, which is costing her.",
      traits: ['practical', 'blunt about odds', 'guilty', 'generous in small ways', 'stops sleeping before a run'],
      voice: 'Low, clipped, counts aloud out of habit; uses the word freight for people until someone objects',
      goals: [
        'Keep paying the family every month, forever, without ever telling anyone why',
        'Get a descent rig that does not require a sealed crate',
        'Get out before the Assize needs a prosecution rather than a policy',
      ],
      fears: [
        'Another sealed crate',
        'Being the reason the Assize finally counts the Underdeck',
        'Someone finding the payment record, which is the only written thing she has ever kept',
      ],
      beliefs: [
        'A person is not cargo, and the fact that she has to say it means the city has already decided otherwise',
        'Odds spoken out loud are a kindness; odds hidden are a theft',
        'You do not tell people you saved them, because then they owe you',
      ],
      secrets:
        "Two winters ago a descent went wrong and a woman suffocated in a sealed ballast crate. Perrine has paid that family every month since, in coin, in person, at the [[landmark.the-ballast-drop|Ballast Drop]] end of Shelf-Foot, and the payment record in the back of her rigging book is the only leverage anyone has on her.\n\nThe money is not hers. It comes, through two intermediaries and a false name, from [[npc.cesille-vaudry|Cesille Vaudry]], who funds unlogged descents because ballast-running is the only way she has found to lighten the city without signing an eviction list. Perrine does not know the source and has stopped asking, which she is ashamed of.",
      combatRole: 'Knife and a rigging spike, at close range, in the dark, on ground she chose. Will not fight in daylight.',
      skills: ['skill.lattice-work', 'skill.cable-and-drum', 'skill.dead-weight', 'skill.quiet-ground', 'skill.fence-work'],
      skillNotes:
        'The only person in the city who can move a body, living or otherwise, off the ring without a manifest entry. [[skill.dead-weight|Dead Weight]] is the load-bearing skill and it interacts directly with [[mechanic.mass-warrant|the Mass Warrant]]: a carried person is billable mass, and she is the mechanism by which a party can refuse to be billed.',
      inventory: ['item.ballast-jacket', 'item.springlock'],
      inventoryNotes:
        'The springlock is unspanned and carried for one specific purpose she will not discuss. Her rigging book holds the payment record; it is in her jacket at all times, and taking it from her is the single most damaging thing a party can do to her that does not involve a rope.',
      schedule: [
        row({ time: '10:00', place: 'Western ballast shafts, [[district.sky-city-the-underdeck|the Underdeck]]', doing: 'Lawful crew work: ballast tanks, spoil, cold storage. Fully visible and fully boring.' }),
        row({ time: '15:00', place: 'Underdeck galleries', doing: 'Takes requests. People find her; she never advertises. This is the only sociable hour of her day.' }),
        row({ time: '18:00', place: '[[landmark.the-ballast-drop|The Ballast Drop]]', doing: 'Rigs the night descents personally, checking every seal twice since the crate.' }),
        row({ time: '01:00 to 04:00', place: 'Down the mooring lines to [[district.sky-city-shelf-foot|Shelf-Foot]]', doing: 'The runs themselves. Two descents a night maximum, in still air only.' }),
        row({ time: 'Once a month, 05:00', place: 'A door in Shelf-Foot', doing: 'Pays the family. Never speaks. Has done this twenty-six times.' }),
      ],
      relationshipNotes:
        "[[npc.aubran-ferrieu|Aubran Ferrieu]] gets his post from her and does not know that she reads the outsides of the letters. [[npc.doret-halvane|Doret Halvane]] is the Ascent end of the same route and the two have never met in daylight. [[npc.dagren-hoyle|Dagren Hoyle]] runs the equivalent trade at the [[city.black-weir|Black Weir]] and they have swapped exactly one favour, which both consider outstanding. One of the three [[npc.ismet-radva|Ismet Radva]] manifests lists a descent she is certain she ran.",
      dialogueNotes:
        "Quotes the price and the odds together and will not adjust either. She never asks who the passenger is and gets visibly uncomfortable when told. If a player mentions the crate she goes silent and the scene is over; if a player mentions the family, she will take the party to them, which is the most dangerous thing she can do.",
      sampleLines: [
        '"Two hundred and ten strides, in the dark, in a crate, with a rope I have checked and a man on the brake I have not. That is what you are buying. Say yes or say no."',
        '"I do not want to know their name. Once I know their name I have to decide whether they deserve it."',
        '"Still air only. If the stays start to talk we stop, and you sleep in the shaft, and you do not argue with me about it."',
      ],
      questNotes:
        'The only reliable route on and off the ring that bypasses the mass warrant, which makes her the enabling NPC for [[quest.the-second-ledger|The Second Ledger]] and for any Sky City infiltration. Her payment record is also the thread that leads back to [[npc.cesille-vaudry|Cesille Vaudry]] for a party that pulls it.',
      playerChoices: [
        'Hire her and stay clients, which buys unmanifested movement at a real and stated risk of death',
        'Trace the payments back to their source and hand [[npc.cesille-vaudry|Vaudry]] a scandal she cannot survive',
        'Tell the family whose money it actually is, which is honest and destroys the only support they have',
        'Fund a proper descent rig, ending the sealed crates, which halves her volume and doubles her survival rate',
        'Turn her in for the crate death, which the Assize would prosecute enthusiastically to avoid counting the Underdeck',
      ],
      repReactions: [
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Runs the party at cost and will take a descent at short notice.' }),
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', standing: 'High', reaction: 'Will not be seen with them aloft under any circumstances; meets at Shelf-Foot or not at all.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Refuses the work outright, at any price, and remembers that the party asked.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Descents at half price for anyone the stewards name, which she treats as union dues.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the crate death and the monthly payments. Added: that the money originates with Cesille Vaudry through intermediaries, which converts a personal tragedy into the load-management policy of the city, and gives a party a document trail from a dead woman to the Warden.'),
    },
  }),

  /* ================================================================ */
  /* THE MEDITERRANEAN CITY                                            */
  /* ================================================================ */

  E({
    id: 'npc.melitta-aspri',
    type: 'npc',
    name: 'Melitta Aspri',
    status: 'draft',
    summary: 'Calibrator of the Tide Orrery, whose printed tables set the coast\'s planting and sailing dates and are quietly wrong.',
    tags: ['mediterranean-city', 'science', 'fraud', 'conduit-college'],
    fields: {
      title: 'Calibrator of [[landmark.the-tide-orrery|the Tide Orrery]]',
      aliases: ['Aspri of the roll room', 'The Four Minutes'],
      species: 'Human, coast-born, College-raised from eleven',
      age: '44',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Small, quick, permanently smelling of clock oil and the vinegar used to clean bronze. Wears the College\'s undyed linen with the sleeves pinned back and a loupe on a ribbon. Her hands are immaculate and her cuffs are ruined, which is the exact opposite of every other fellow in the precinct and tells you she still does the work herself.',
      home: ['district.mediterranean-city-orrery-precinct'],
      currentLocation: ['district.mediterranean-city-orrery-precinct'],
      occupation: 'Calibrator, [[faction.conduit-college|Conduit College]]; sole keeper of the Orrery\'s error book',
      standing:
        'Technically a mid-ranking fellow and practically the most consequential person on the coast, because every harbour slot, freight contract, planting date and insurance premium is written against tables she prints. The College treats calibration as maintenance work, which is why a maintenance clerk has been able to hide an error for nine years.',
      personality:
        'Brilliant, funny, and morally exhausted. She started biasing the tables as a temporary measure while she found the fault, and then she found the fault and could not afford to announce it. She now runs two mental models of the coast at once, the true one and the printed one, and the gap between them is the thing she thinks about while other people are talking.',
      traits: ['brilliant', 'wry', 'compromised', 'obsessive', 'physically brave about machines'],
      voice: 'Fast, technical, self-interrupting, and drops into flat plain language when she is telling the truth',
      goals: [
        'Correct the Orrery without voiding a season of freight contracts',
        'Get the College to fund a second reference instrument so the error is provable without her',
        'Be the one who says it, rather than the one it is discovered about',
      ],
      fears: [
        'The spring tide the harbour is not braced for, which is roughly two seasons out',
        'A second calibrator being appointed, who would find it in a fortnight',
        'That she has become the sort of person the [[faction.conduit-college|College]] is made of',
      ],
      beliefs: [
        'An instrument is a promise about the future, and a wrong instrument is a lie the whole coast repeats',
        'The College hoards working designs and calls it licensing; she is now doing the same with an error',
        'Nine thousand gears cannot be argued with, only measured',
      ],
      secrets:
        "The Orrery has drifted by about a day and a half over nine years and the printed tables have been biased to conceal it. She knows the cause: an ageing fault in the gear bronze of the tide train, which means the drift compounds rather than holding steady.\n\nThe first thing the error will wreck is a spring tide the harbour works are not braced for. She has the corrected figures, dated, in the error book, and every day she does not publish makes the eventual publication more expensive. Somebody in the harbour is already trading slots against the difference, which she has noticed and has not reported, because reporting it means explaining how she knows.",
      combatRole: 'None. Will climb into a running mechanism to avoid a conversation, which is not the same as courage.',
      skills: ['skill.bench-sense', 'skill.mirror-cutting', 'skill.heat-reading', 'skill.ledger-hand', 'skill.pressure-fitting'],
      skillNotes:
        'One of perhaps four people alive who can recut a gear train of that size, and the only one the College would let inside the case. Any party trying to prove the drift needs either her error book or an independent instrument, and building one is a [[skill.mirror-cutting|Mirror Cutting]] and [[skill.bench-sense|Bench Sense]] problem measured in weeks, not a roll.',
      inventory: ['item.orrery-tables', 'item.governor-spring'],
      inventoryNotes:
        'Carries the current printed tables and an uninstalled governor spring she has been holding for three seasons because installing it would change the rate and make the drift obvious in one tide cycle. The error book itself is in the roll room, in the unindexed section, filed under a fellow who died.',
      schedule: [
        row({ time: '04:20 and 16:40', place: 'Orrery hall, under the glass dome', doing: 'Takes the tide readings personally, twice daily, alone. Missing one is unthinkable to her and skipping one is how a party gets her attention.' }),
        row({ time: '07:00', place: 'The roll room, [[district.mediterranean-city-orrery-precinct|Orrery Precinct]]', doing: 'Prints and corrects. The bias is applied here, by hand, on a stone she inks herself.' }),
        row({ time: '11:00', place: 'College halls', doing: 'Teaches two students badly and on purpose, so that neither becomes competent enough to check her.' }),
        row({ time: '14:00', place: '[[district.mediterranean-city-the-mole|The Mole]], harbourmaster\'s office', doing: 'Delivers the slot tables. Watches who is already holding a copy before she arrives.' }),
        row({ time: '19:00', place: 'A tavern on the second band', doing: 'Drinks alone, deliberately in public, so that nobody can say she is hiding.' }),
      ],
      relationshipNotes:
        "[[npc.anthimos-vellani|Anthimos Vellani]] is the only person in the city who knows what she is carrying, because he is carrying the same kind of thing, and they have an unspoken agreement never to discuss either. [[npc.wessel-ondriek|Wessel Ondriek]] prices Ascent freight paper against her tables and does not know he is doing it against a fiction. The harbour slot-trader she has not reported is a name a party can get out of her under pressure.",
      dialogueNotes:
        'Will explain the Orrery to anyone for an hour, cheerfully, in enormous detail, as a form of hiding in plain sight. The tell is that she never states a future tide time without a qualifier. If confronted with independent measurements she is relieved rather than defensive, and the relief is the most human thing in the scene.',
      sampleLines: [
        '"Nine thousand gears. Chill-cast, aged eighteen months before cutting, and not one of them cares what the College would prefer to be true."',
        '"I did not falsify a table. I applied a correction. The distinction mattered for about four months and I have kept using it for nine years."',
        '"If you want the honest figure, ask me at a quarter past four in the morning, standing under the dome. I cannot lie in there. I have tried."',
      ],
      questNotes:
        'The centre of [[quest.four-minutes-fast|Four Minutes Fast]]. Proving the drift reopens every harbour lease priced against the old tables, which is why a party will be offered a great deal of money to let it run fast. Her error book is the fastest route and the one that destroys her; an independent instrument is slower and leaves her able to do the repair.',
      playerChoices: [
        'Take the error book and publish, which vindicates the party, ruins her, and reprices the coast in a fortnight',
        'Build or buy an independent instrument so the error is provable without her, which costs weeks and money and leaves the only competent calibrator in post',
        'Accept the harbour money and sit on it, which is lucrative and puts the party in the room when the spring tide arrives',
        'Force the College to fund a second reference instrument, a political fight that fixes the underlying problem for good',
        'Get her the name of the slot-trader and let her use it, which makes her an ally with a permanent debt',
      ],
      repReactions: [
        row({ faction: '[[faction.conduit-college|The Conduit College]]', standing: 'High', reaction: 'Gives the party access to the Orrery hall during readings, which is where the truth is provable.' }),
        row({ faction: '[[faction.conduit-college|The Conduit College]]', standing: 'Hostile', reaction: 'Charming, generous with printed tables, and never alone with them again.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Assumes they have come about freight repricing and starts the conversation three steps ahead, badly.' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', standing: 'High', reaction: 'Asks them, quietly, whether a sealed letter can be sent that nobody copies. It cannot.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the day-and-a-half drift and the biased tables. Added: the cause is ageing fault in the gear bronze, so the error compounds and has a deadline attached, and an unreported slot-trader, which gives her a second secret she can trade rather than only one she must defend.') +
        '\n\nThe spring tide is the clock. Set it two seasons out at campaign start and let the table watch it come.',
    },
  }),

  E({
    id: 'npc.anthimos-vellani',
    type: 'npc',
    name: 'Anthimos Vellani',
    status: 'draft',
    summary: 'Harbour physician keeping a private ward for three cases of a marsh parasite that should not exist west of the Drown.',
    tags: ['mediterranean-city', 'medicine', 'plague', 'moral-choice'],
    fields: {
      title: 'Licensed harbour physician, the Mole',
      aliases: ['The quiet ward', 'Vellani of the quay'],
      species: 'Human, coast-born',
      age: '57',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Grey, unhurried, with the forearms of a man who has spent thirty years doing his own lifting because there is never anyone else on the quay at three in the morning. Wears a physician\'s licence plate on a chain and keeps it polished, which he is aware is a small vanity. Smells of vinegar and citron conserve.',
      home: ['district.mediterranean-city-the-mole'],
      currentLocation: ['district.mediterranean-city-the-mole'],
      occupation: 'Licensed physician; harbour and crew work, plus one unregistered ward',
      standing:
        'Trusted absolutely by every crew on the quays and viewed by the [[faction.conduit-college|College]] as a competent tradesman who never took his examinations further. That underestimation is why he has been able to keep three patients out of the [[district.mediterranean-city-the-lazaret|Lazaret]] register for two months.',
      personality:
        'Gentle, extremely tired, and possessed of a surgeon\'s ability to keep working while frightened. He is not concealing the cases for money; he is concealing them because he has done the arithmetic of a quarantine at harvest and he does not like the answer either. He will tell a party the truth quickly, because carrying it alone has become unbearable.',
      traits: ['gentle', 'exhausted', 'competent', 'morally honest about being wrong', 'sleeps in a chair'],
      voice: 'Slow, clinical, uses the plain word rather than the polite one and apologises afterwards',
      goals: [
        'Keep three people alive',
        'Find out whether the parasite can complete its cycle on this coast, which is the only question that matters',
        'Report it in a way that does not put a chain across the terrace groves in harvest week',
      ],
      fears: [
        'A fourth case, which would end the argument',
        'That he already knows there is a fourth case and has not gone to look',
        'The Lazaret, which he has worked in and will not describe',
      ],
      beliefs: [
        'Quarantine is a real medicine with a real dose, and overdosing a city kills it too',
        'The register exists to protect the harbour, not the patient, and both things need doing',
        'A physician who reports everything is a clerk, and a physician who reports nothing is a murderer',
      ],
      secrets:
        "Three patients in a private room off the quay carry a marsh parasite native to [[region.the-drown|the Drown]] and unrecorded west of it. He has not entered them in the [[district.mediterranean-city-the-lazaret|Lazaret]] register, because entry means quarantine and quarantine in harvest week rots the olive crop.\n\nHe knows which ship it came in on: a cane and mirelac cargo out of the delta, cleared and gone. What he does not know is whether the intermediate host exists on this coast, which is the difference between three cases and an outbreak. [[npc.melitta-aspri|Melitta Aspri]] has guessed, and neither of them has said it.",
      combatRole: 'None, and would treat whoever was still breathing afterwards, including the person who attacked him.',
      skills: ['skill.bonewright', 'skill.plague-reading', 'skill.spore-lore', 'skill.reagent-work', 'skill.venom-work'],
      skillNotes:
        'A [[skill.plague-reading|Plague Reading]] specialist who has made the quarantine call twice in his career and been hated for it both times. The world has no healing magic: his surgery is engineering, his anaesthetic is [[material.quietmilk|quietmilk]] and roughly one patient in nine on [[spell.stillwater-draught|stillwater draught]] does not breathe again, which he states before every operation.',
      inventory: ['item.fever-clay', 'item.cinderroot-cordial'],
      inventoryNotes:
        'Carries [[item.fever-clay|fever clay]] from the karst, which is the only thing that has touched the parasite at all, and cinderroot cordial he will not prescribe because three seasons of it stops the hands. The private ward has a locked chest containing the case notes, which are the entire evidentiary basis of the outbreak.',
      schedule: [
        row({ time: '06:00', place: 'Quay surgery, [[district.mediterranean-city-the-mole|the Mole]]', doing: 'Crew clinic. Anyone can walk in; this is the easiest NPC in the city to meet.' }),
        row({ time: '10:00', place: 'The private room above the chandler\'s', doing: 'The three patients. He goes alone and takes a different route each day, which is the only conspiratorial thing he does.' }),
        row({ time: '13:00', place: 'The harbour court', doing: 'Certifies fitness for crews and, twice this month, has certified a fitness he did not believe.' }),
        row({ time: '16:00', place: '[[district.mediterranean-city-the-lazaret|The Lazaret]] boat steps', doing: 'Stands at the steps and does not cross. Has done this most days for two months.' }),
        row({ time: '21:00', place: 'The private room', doing: 'Night observations, notes, and sleeping in the chair beside the second bed.' }),
      ],
      relationshipNotes:
        "[[npc.melitta-aspri|Melitta Aspri]] is the nearest thing he has to a confidante and they have never once discussed either secret directly. The cane raft that carried the cargo was a Sixteen-Knot lot out of [[city.floating-swamp-settlement|the delta]], which puts [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] two removes from an outbreak she has never heard of. He has written twice to [[npc.iratze-zubiate|Iratze Zubiate]] about fever clay and received one reply.",
      dialogueNotes:
        'Tells the truth almost immediately to anyone who examines a patient competently, because he wants a second opinion more than he wants secrecy. The hard conversation is not the diagnosis, it is the decision, and he will hand that decision to a party with visible relief and then hold them to it.',
      sampleLines: [
        '"West of the Drown it does not exist. I have three of them in a room above a chandler\'s, so either the books are wrong or the coast is."',
        '"If I write their names in the register, a chain goes across the groves inside a day and the crop is on the ground by the end of the week. If I do not, and I am wrong, it is the whole coast. Tell me which of those you would sign."',
        '"You may examine them. Wash to the elbow, and do not touch the water in the basin under the second bed, I have not finished with it."',
      ],
      questNotes:
        'The seed for a coast outbreak arc and the natural companion piece to [[quest.clean-bills|Clean Bills]], where the same disease logic runs upriver instead of downcoast. A party with [[skill.plague-reading|Plague Reading]] can settle the intermediate-host question in a week of fieldwork in the groves and the harbour muds, which is a genuinely playable investigation with no combat in it.',
      playerChoices: [
        'Report the cases and force a quarantine, saving the coast and destroying the harvest and his licence',
        'Help him keep the ward and find the intermediate host quietly, which is the slow, correct, and entirely deniable option',
        'Trace the ship back to the delta and stop the source, which means the [[faction.low-tally|Low Tally]] cane trade and a fight nobody in the city will thank them for',
        'Sell the information to a grove-holder who would rather buy silence than harvest early',
        'Take one patient to the [[district.mediterranean-city-the-lazaret|Lazaret]] as a test case, which is a betrayal of that person specifically and may be the right call',
      ],
      repReactions: [
        row({ faction: '[[faction.conduit-college|The Conduit College]]', standing: 'High', reaction: 'Wary. Assumes the party will report it to a licensing body rather than a physician.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Asks them, flatly, to find out which delta lot the cargo came from, and does not want to know how.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Treats them coldly and treats their injuries anyway, which is the whole man in one gesture.' }),
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', standing: 'High', reaction: 'Wants a delta contact who can name the raft. Will trade the case notes for one.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the three unreported patients and the harvest trade-off. Added: the specific unknown of whether the intermediate host exists on this coast, which converts a moral dilemma into an investigation with a factual answer a party can actually go and get.') +
        '\n\nDeliberately no healing magic anywhere in this entry. Medicine here is surgery, clay, quarantine and arithmetic.',
    },
  }),

  /* ================================================================ */
  /* THE TREE CITY                                                     */
  /* ================================================================ */

  E({
    id: 'npc.aune-mustsalu',
    type: 'npc',
    name: 'Aune Mustsalu',
    status: 'draft',
    summary: 'Bole-Marshal of the Bastion Bole, who signs the conscription rolls and has been forging deaths on them for three years.',
    tags: ['tree-city', 'power', 'military', 'forgery'],
    fields: {
      title: 'Bole-Marshal of [[landmark.bastion-bole|the Bastion Bole]]',
      aliases: ['The Marshal', 'Mustsalu of the rolls'],
      species: 'Human, Greatwood-born, third generation in the bole',
      age: '54',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Broad, weathered, and missing the top joint of two fingers on the left hand from a span-cutting accident at nineteen that she still describes as her own fault. Wears a [[item.bastion-jack|bastion jack]] indoors, which nobody else of her rank does, and keeps the rolls in a satchel that does not leave her body. Grey hair cropped to the pitch line because pitch does not come out.',
      home: ['district.tree-city-crown-galleries'],
      currentLocation: ['district.tree-city-crown-galleries'],
      occupation: 'Bole-Marshal; elected for life by the six bole captains',
      standing:
        'Absolute within the city and conditional outside it. Elected for life by the six captains and unseatable by four of them, which means she governs by keeping any four of them from agreeing. She has held it eleven years and has never let the levy rolls out of her own hand, which the captains read as tyranny and is actually concealment.',
      personality:
        'Direct, unglamorous, and completely without the vanity the office usually attracts. She talks about the levy as an accounting problem and about the [[faction.pitchguard|Pitchguard]] as a machine she is responsible for oiling. The forgery has made her cautious in a way the captains have noticed, and she compensates by being harsher on small matters than she used to be, which is costing her the ninth gallery.',
      traits: ['direct', 'guarded', 'harsh on small things', 'unglamorous', 'out of room'],
      voice: 'Flat command voice, short sentences, never repeats an order and never explains one',
      goals: [
        'Get the thirty children of the purged quarter to adulthood off the rolls',
        'Keep the granary count out of the captains\' hands until after the next mast',
        'Hold the city together through the felling without a mutiny in the Spanworks',
      ],
      fears: [
        'Her own quartermaster, who has begun counting bodies against rations',
        'A captain finding a forged death whose subject is still visibly alive',
        'The boles going before the levy is ready, which the rot survey says is a question of years, not decades',
      ],
      beliefs: [
        'A city that cannot fill its levy is a city that gets felled by somebody else',
        'The purge was a crime, and the children of a crime are not the crime',
        'Explaining an order twice is the beginning of not being obeyed',
      ],
      secrets:
        "Roughly thirty children of a quarter purged before her election are recorded on the levy rolls as dead. She wrote every entry herself, in her own hand, over three years, and the bodies were never produced because bodies are not required for a bole death.\n\nHer quartermaster has started reconciling ration draws against the roll and the numbers do not close. Some of the children were moved out along a maintenance run of rope bridges that does not pass a gate, which means [[npc.vetla-torvik|Vetla Torvik]], a deserter she has a standing order out on, is the only other person who could prove it. Exposing her ends her. Covering for her makes the city's gates owe a debt that will be called during [[quest.the-felling-order|the felling]].",
      combatRole: 'Line commander, and still competent with a polearm on a gallery. Will not be first through a door and expects nobody else to be either.',
      skills: ['skill.long-arm', 'skill.gallery-drill', 'skill.plain-letters', 'skill.set-and-brace', 'skill.crowd-turning'],
      skillNotes:
        'Trained on the spans, which matters: she can order a severance because she has cut one, with people still on it, and can describe the sound. [[skill.crowd-turning|Crowd Turning]] is how she has survived eleven years of captains, and it is also the skill she will use on a party in the room.',
      inventory: ['item.bastion-jack', 'item.palisade-arbalest'],
      inventoryNotes:
        'The satchel is the object that matters: the current levy roll, the death entries, and a second smaller book she has never let anyone see. She sleeps with it. Taking it requires either her cooperation or her death, and both have consequences the campaign should not resolve quietly.',
      schedule: [
        row({ time: '05:00', place: '[[district.tree-city-crown-galleries|Crown Galleries]], signal crown', doing: 'First light, alone, reading the overnight signals from the trunk redoubts. Reachable only by someone already inside the crown.' }),
        row({ time: '07:00', place: 'Marshalcy offices', doing: 'Roll work and quartermaster\'s returns. The reconciliation that is closing in on her happens in this room, in front of her, daily.' }),
        row({ time: '10:00', place: 'One of the six boles, by rotation', doing: 'Inspection. She varies which bole and does not announce it, which is habit rather than security.' }),
        row({ time: '14:00', place: '[[district.tree-city-ninth-gallery|The Ninth Gallery]] muster yard', doing: 'Watches the levy intake twice a week and does not intervene, which the conscripts read as approval.' }),
        row({ time: '18:00', place: 'Captains\' table, Crown Galleries', doing: 'Dinner with whichever captains are in the city. The only forum where she can be politically attacked.' }),
        row({ time: '22:00', place: 'Her quarters', doing: 'Alone with the satchel. A light burns most of the night and the crown watch have started to comment.' }),
      ],
      relationshipNotes:
        "[[npc.saarik-rauda|Saarik Rauda]] fills her levy and holds a tally that prices every household in the city, which makes him her most useful officer and the man most able to destroy her. [[npc.vetla-torvik|Vetla Torvik]] is a deserter she is hunting and the accomplice she cannot acknowledge. Her quartermaster is unnamed by design and can be a table's own creation. She has never met [[npc.wessel-ondriek|Wessel Ondriek]] and refuses Ascent credit on principle, which is the only reason the Tree City is not already owned.",
      dialogueNotes:
        'Gives orders rather than answers. Treats a party as either a resource or a problem within about ninety seconds and tells them which. She does not bluster and does not bargain in public; the real conversation happens after she has dismissed the room, and only if a player has said something that made her stop.',
      sampleLines: [
        '"You are asking who is on the roll. I am telling you the roll is signed. Those are answers to different questions and you may have the second one."',
        '"Thirty names. Say the number back to me. Now tell me which of them you would like me to produce."',
        '"When the Sixth Quarter goes down I will be standing where the spans meet, and I will be the one who says the word. That is what the chair is."',
      ],
      questNotes:
        'Stands directly behind [[quest.the-felling-order|The Felling Order]]: she will burn the quarter on schedule whether or not the party is ready, and she will hate it. The forged rolls are a separate lever that can be pulled at any point during that eleven-day window, which is the cruellest possible timing and should be available.',
      playerChoices: [
        'Expose the forged deaths, which ends her, hands the Marshalcy to whichever captain moves fastest, and puts thirty living children back on the roll',
        'Cover for her by dealing with the quartermaster\'s reconciliation, which buys the party a permanent debt from the city gates',
        'Get the thirty out of the Greatwood entirely, which requires [[npc.vetla-torvik|Vetla Torvik]] and ends the secret without ending her',
        'Trade her silence for a felling delay during [[quest.the-felling-order|The Felling Order]], which is the one currency she cannot refuse',
        'Take her side against the captains and become the Marshalcy\'s instrument, which is a full faction alignment with the [[faction.pitchguard|Pitchguard]]',
      ],
      repReactions: [
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', standing: 'High', reaction: 'Gives the party gallery passes, span priority and a standing order that they are not to be pressed.' }),
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', standing: 'Hostile', reaction: 'They are counted at every span, and the crossing tally is read to her personally each evening.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Refuses to meet them officially and sends a captain instead, which is a message about the timber yards.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Openly contemptuous, and asks whether they have come to buy the Greatwood or merely to price it.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the forged deaths and the quartermaster. Added: that some of the children left along Vetla Torvik\'s maintenance run, which makes the ruler and the deserter secret accomplices and gives a party a single fact that threatens both.') +
        '\n\nShe is a ruler with a knife at her own throat, not a tyrant. Play the felling as a duty she cannot refuse, so that delaying it costs a party something real.',
    },
  }),

  E({
    id: 'npc.saarik-rauda',
    type: 'npc',
    name: 'Saarik Rauda',
    status: 'draft',
    summary: 'Gate-sergeant of the ninth gallery, running the press-gangs and keeping a written tally of everyone who has paid him off.',
    tags: ['tree-city', 'enforcer', 'corruption', 'conscription'],
    fields: {
      title: 'Gate-sergeant, [[district.tree-city-ninth-gallery|the Ninth Gallery]]',
      aliases: ['Sergeant Seed-Grain', 'Rauda of the muster yard'],
      species: 'Human, Greatwood-born, levied at fifteen and never left',
      age: '38',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Compact and heavy-handed, with the flattened knuckles of a man who has hit a great many people at work. Beard kept short for the pitch. Carries a tally-stick in his belt where other sergeants carry a knife, which is a joke he made once and has been living inside ever since.',
      home: ['district.tree-city-ninth-gallery'],
      currentLocation: ['district.tree-city-ninth-gallery'],
      occupation: 'Gate-sergeant; runs the spring levy press-gangs',
      standing:
        'Feared and, in a way that unsettles outsiders, respected. He is scrupulously consistent: the same price for everyone, the same treatment for those who cannot pay, and no favourites. Households have made their peace with him precisely because he is predictable, which is a darker fact about the city than any cruelty would be.',
      personality:
        'Practical, unbothered, and genuinely convinced he is the merciful part of the system. He takes his bribes in seed grain because grain is what a household can spare and coin is what it cannot, and he says so openly. He is not stupid and is aware that his tally is worth more than everything else he owns, which is why he has never written it anywhere but in his own hand.',
      traits: ['consistent', 'unbothered', 'literal', 'physically dangerous', 'proud of his fairness'],
      voice: 'Loud in the yard and quiet in a room; asks a question twice and then stops asking',
      goals: [
        'Fill the spring levy without a riot, for the eleventh year running',
        'Keep the tally out of any hand but his own',
        'Buy a gallery holding in the sixth quarter, which the felling order is about to make impossible',
      ],
      fears: [
        'A levy that cannot be filled, which ends with the gate-sergeant on the roll',
        'The tally being read by anyone who understands what it is',
        'The Marshal, specifically and personally',
      ],
      beliefs: [
        'The levy takes somebody. All he decides is who, and that decision is worth grain',
        'A household that pays has chosen; a household that cannot pay was never going to be asked',
        'He has never taken a son from a house that could not spare one, and he considers that a career',
      ],
      secrets:
        "The tally records every household that has paid to keep a son off the levy: names, dates, amounts, eleven years deep. It is not a bribe ledger so much as a map of exactly who in the Tree City can be bought and for how little, and it is worth more to an outside power than the grain ever was.\n\nHe has also begun selling levy-dodgers downriver. The ledgers go to Ring bond-holders and [[faction.bondwrights-hall|the Bondwrights' Hall]] through the timber yards, and he tells himself it is the same trade as the grain. It is not the same trade, and the first person to say so out loud to him will find out how much of him is still nineteen and frightened.",
      combatRole: 'Front-rank brawler with a polearm and eleven men who like him. Fights to take prisoners, because prisoners are inventory.',
      skills: ['skill.close-work', 'skill.long-arm', 'skill.plain-letters', 'skill.wire-and-snare', 'skill.the-cold-read'],
      skillNotes:
        'Barely literate: he can write names and numbers and nothing else, which is why the tally is in a private shorthand only he reads and why a stolen tally needs him, or a very good cryptographer, to be useful. [[skill.wire-and-snare|Wire and Snare]] is how the press-gangs actually work in the Greatwood, and the entry should be played with the weight the skill note demands.',
      inventory: ['item.palisade-arbalest', 'item.bastion-jack'],
      inventoryNotes:
        'The tally is a bundle of birch slips in an oilcloth roll inside his jack. He does not put it down while awake. There is a second, older roll buried under the muster yard water butt, covering the first four years, and he has forgotten it is there.',
      schedule: [
        row({ time: '05:30', place: 'Muster yard, [[district.tree-city-ninth-gallery|the Ninth Gallery]]', doing: 'Roll call and gate assignments. Public, loud, and the place to be seen speaking to him legitimately.' }),
        row({ time: '08:00 (levy season)', place: 'The lower galleries and the Underroot road', doing: 'Press-gang rounds. In levy season this is most of his day and the city is dangerous for anyone of the wrong age.' }),
        row({ time: '13:00', place: 'The gate house', doing: 'Payments. Households come to him here, in daylight, and the queue is not hidden because it does not need to be.' }),
        row({ time: '17:00', place: 'The timber yards, [[district.tree-city-underroot|Underroot]]', doing: 'Twice a month: the downriver business, conducted with a factor whose name he does not know.' }),
        row({ time: '20:00', place: 'Barracks table', doing: 'Drinks with his eleven. Talks freely and remembers none of it, which is a genuine security hole.' }),
      ],
      relationshipNotes:
        "[[npc.aune-mustsalu|Aune Mustsalu]] is his Marshal and his hazard: he suspects the rolls and has not looked, because looking commits him. [[npc.vetla-torvik|Vetla Torvik]] deserted from his gate and he takes it personally in a way that is not really about her. The bond factor at the timber yards connects him to [[npc.berke-chagra|Berke Chagra]] two removes downriver, and neither has any idea the other exists.",
      dialogueNotes:
        'Negotiates immediately and honestly about price. Will not be shamed, will not be flattered, and reacts to threats by putting a number on them. The one thing that lands is being told, precisely, what the downriver ledgers are for, because he has been careful not to work it out.',
      sampleLines: [
        '"Two bushels of seed grain and the boy is dead on the roll. Three if you want him dead somewhere he can still be seen."',
        '"I have never once taken a son from a house that had one son. Ask the yard. Ask anybody in the yard."',
        '"You are going to tell me what happens to the ones that go downriver. Go on. I have got all evening and no reason to stop you."',
      ],
      questNotes:
        'The tally is the single most valuable portable object in the Tree City and it is worth exactly nothing to a party that cannot read his shorthand. That constraint is the design: it forces a party either to work him, to take him, or to find the buried first roll, which is legible because he wrote it when he was still writing plainly.',
      playerChoices: [
        'Buy a name off the roll, which is cheap, effective, and makes the party part of the tally',
        'Steal the current tally and try to break the shorthand, which takes weeks and a [[skill.ledger-hand|Ledger Hand]] specialist',
        'Find the buried first roll under the water butt, which is legible, four years out of date, and still ruinous to sixty households',
        'Expose the downriver sales to the Marshal, which is the one crime the Pitchguard would actually hang him for',
        'Recruit him: he is corruptible in a stable, predictable direction, and an allied gate-sergeant makes the entire city permeable',
      ],
      repReactions: [
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', standing: 'High', reaction: 'Treats the party as officers, waves them through the gate, and quietly raises his prices for everyone else that week.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Assumes they are the downriver factor\'s people and starts talking about numbers before they have asked.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Openly hostile. The timber yards are a Standing Hour cause and he knows exactly what he is.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Interested, cautious, and willing to sell passage out of the city for a fixed rate per head.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the seed-grain bribes and the tally. Added: the illegible shorthand and the buried first roll, which turn a stolen document into a puzzle rather than a payout, and the downriver sales, which give the Tree City a direct connection to the indenture economy.') +
        '\n\nHe should be genuinely likeable in the yard. The horror is the system working exactly as designed by a man who is proud of his consistency.',
    },
  }),

  E({
    id: 'npc.vetla-torvik',
    type: 'npc',
    name: 'Vetla Torvik',
    status: 'draft',
    summary: 'Deserter forester outside the palisade, selling routes, sap and silence to whoever pays.',
    tags: ['tree-city', 'outlaw', 'guide', 'greatwood'],
    fields: {
      title: 'Deserter; forest guide outside the palisade',
      aliases: ['Torvik of the maintenance run', 'The rope-bridge woman'],
      species: 'Human, Greatwood-born, Pitchguard-trained',
      age: '29',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Lean, sap-stained to the wrists, and quiet on her feet to a degree that unnerves people indoors. Wears a stripped bastion jack with the timber splints removed for weight, and a [[creature.sentinel-tick|sentinel tick]] behind the left ear, which she keeps despite the cost because it has woken her twice.',
      home: [CITY.treeCity],
      currentLocation: [REGION.greatwood],
      occupation: 'Guide, sap-cutter, and seller of routes',
      standing:
        'Outlawed in the city and quietly necessary outside it. Tribute villages feed her because she warns them when the press-gangs are coming; the [[faction.pitchguard|Pitchguard]] has a standing order on her that no patrol has ever tried very hard to execute, partly out of sympathy and partly because chasing her into the canopy is how sergeants die.',
      personality:
        'Watchful, dry, and entirely transactional with strangers as a matter of policy rather than temperament. She was a good soldier and left because of an order she will describe once, flatly, and never again. She holds a grudge in a slow and organised way that is much more dangerous than temper.',
      traits: ['watchful', 'transactional', 'patient', 'grudge-keeping', 'kinder than she admits'],
      voice: 'Low, unhurried, uses forestry words for city things: a faction is a stand, a purge is a felling',
      goals: [
        'Get her sister off the timber-yard ledger in [[district.tree-city-underroot|the Underroot]]',
        'Sell the maintenance run once, at the right price, and then never again',
        'Live long enough to stop moving',
      ],
      fears: [
        'That the ledger has already been sold downriver and her sister with it',
        'Being taken alive by [[npc.saarik-rauda|Saarik Rauda]], who would make an example rather than a prisoner',
        'The rot survey being right, because the canopy is the only place she is safe',
      ],
      beliefs: [
        'The spans belong to the people who maintain them, not the people who gate them',
        'She is not a traitor. She is a woman who refused one order and has been paying market rate for it ever since',
        'Everything in the Greatwood is rented from the trees and the rent is coming due',
      ],
      secrets:
        "She knows a maintenance run of rope bridges that reaches the [[landmark.bastion-bole|Bastion Bole]]'s fourth gallery without passing a single gate: eleven spans, four of them condemned, and one crossing that has to be made in the dark because it is visible from the signal crown in daylight.\n\nShe has used it before. Some of the thirty children [[npc.aune-mustsalu|Aune Mustsalu]] wrote off the rolls went out along it, carried, in three trips, and the Marshal has a standing order out on the only witness. That is the joke Vetla tells when she is drunk, and she is careful about being drunk.",
      combatRole: 'Ambusher. Snare line, a bow, and the canopy. Will not stand in the open and will not take a second engagement.',
      skills: ['skill.quiet-ground', 'skill.ground-read', 'skill.gallery-drill', 'skill.wire-and-snare', 'skill.set-and-brace'],
      skillNotes:
        'Pitchguard span training plus four years of living outside the palisade, which is a combination nobody else has. She can move a party across the canopy at night, and the run itself is a series of [[skill.set-and-brace|Set and Brace]] and [[skill.quiet-ground|Quiet Ground]] problems with a condemned span in the middle that must be re-rigged, not crossed.',
      inventory: ['item.palisade-arbalest'],
      inventoryNotes:
        'A gallery-watch arbalest she did not return, which is by itself a capital charge, plus sap tools, forty strides of line and a re-issued watch tally she filed the number off. Sells sap, gall resin and safe-camp locations as her legitimate trade.',
      schedule: [
        row({ time: 'Dawn', place: 'A different camp each week, [[region.the-greatwood|the Greatwood]] canopy', doing: 'Moves before light. She has never slept two consecutive nights in one place since deserting.' }),
        row({ time: 'Morning', place: 'Sap lines on the northern stands', doing: 'Actual work: tapping, gall resin, and the trade that feeds her. Villagers know where to find her on these days.' }),
        row({ time: 'Afternoon', place: 'The tribute villages', doing: 'Sells warnings about press-gang rounds and takes food rather than coin.' }),
        row({ time: 'Dusk', place: 'The palisade approaches', doing: 'Watches the gates. She counts who goes in and who comes out, which is how she knows the levy figures before the city does.' }),
        row({ time: 'Occasionally, full dark', place: 'The maintenance run', doing: 'Eleven spans to the fourth gallery. She does this perhaps three times a year and never for money alone.' }),
      ],
      relationshipNotes:
        "[[npc.aune-mustsalu|Aune Mustsalu]] hunts her officially and owes her privately, which is the most useful contradiction in the Tree City. [[npc.saarik-rauda|Saarik Rauda]] wants her personally. Her sister is on a timber-yard ledger that has been sold downriver at least once, which puts [[npc.berke-chagra|Berke Chagra]] and [[faction.bondwrights-hall|the Bondwrights' Hall]] at the far end of a debt nobody in the Greatwood can read.",
      dialogueNotes:
        'Names a price and does not move on it. She does not do favours and says so; what she does instead is add a condition, and the condition is always the sister. Will refuse to sell the run to a party she thinks will get her sister killed, and will say exactly why.',
      sampleLines: [
        '"Eleven spans. Four of them are condemned and one of those four is a lie, because the wrights condemned it to stop the levy using it. That one holds."',
        '"You want the run. I want a woman off a timber ledger. Those are the same conversation and we can have it in either order."',
        '"I refused one order. I have been out here four years for it and I would refuse it again on the same afternoon."',
      ],
      questNotes:
        'The gate-free route into the [[landmark.bastion-bole|Bastion Bole]], which is the enabling asset for any Tree City infiltration including reaching the conscription rolls. During [[quest.the-felling-order|The Felling Order]] she is also the fastest way to get four hundred people out of a condemned bole, and she will do it for the sister and for nothing else.',
      playerChoices: [
        'Buy the run with the sister\'s freedom, which is the only price she has ever named',
        'Buy it with something else by force or leverage, which she will honour once and then hunt the party for',
        'Turn her in to [[npc.saarik-rauda|Saarik Rauda]], which is worth real money and closes the only unguarded route into the city',
        'Tell [[npc.aune-mustsalu|Aune Mustsalu]] that her accomplice is alive and selling routes, which forces the Marshal to choose between her secret and her office',
        'Use the run during the felling to evacuate the Sixth Quarter, which is the largest number of lives any single decision in this city can move',
      ],
      repReactions: [
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', standing: 'High', reaction: 'Will not meet them at all. Sends a village child with a message and watches the meeting from the canopy.' }),
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', standing: 'Hostile', reaction: 'Deals openly and cheaply, and asks for news of the muster yard as part of the price.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Trusts them further than she trusts anyone, because the timber yards are the one cause she has left.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Will run cargo as well as people, at a markup, and refuses anything moving downriver.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the maintenance run, the one-time sale and the sister in the timber yards. Added: eleven spans with a falsely condemned one, so the route is a set piece rather than a line on a map, and that she carried the Marshal\'s thirty children out along it.'),
    },
  }),

  /* ================================================================ */
  /* THE CAVE AGRARIAN CITY                                            */
  /* ================================================================ */

  E({
    id: 'npc.iratze-zubiate',
    type: 'npc',
    name: 'Iratze Zubiate',
    status: 'draft',
    summary: 'Mirrorwright of the Sunwell Shaft, hand-aligning two hundred ducted mirrors and hiding a duct collapse she cannot repair.',
    tags: ['cave-agrarian-city', 'engineering', 'concealment', 'labour'],
    fields: {
      title: 'Mirrorwright, [[landmark.sunwell-shaft|the Sunwell Shaft]]',
      aliases: ['Zubiate of the second bank', 'The aligner'],
      species: 'Human, karst-born, mirror-wrights\' guild family',
      age: '36',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Silvering has taken the tips of two fingers to tremor and put a grey line in her gums, which is the tin amalgam and which she does not discuss. Squints even in the dark. Wears a leather apron with forty small pockets and a hand mirror on a jointed arm at her belt, which is the same tool as an [[item.sunwell-mirror|illegal light-theft mirror]] and is legal because of her guild plate.',
      home: ['district.cave-agrarian-city-mirror-quarter'],
      currentLocation: ['district.cave-agrarian-city-mirror-quarter'],
      occupation: 'Mirrorwright; keeps roughly two hundred ducted mirrors in alignment by hand',
      standing:
        'One of about forty people in the world who can aim a duct, which ought to make her powerful and does not, because the [[faction.mirror-assembly|Mirror Assembly]] votes shares rather than skills. She is respected in the [[district.cave-agrarian-city-mirror-quarter|Mirror Quarter]] and treated as maintenance staff two galleries up.',
      personality:
        'Exact, impatient, and unable to stop working a problem in front of her while a conversation happens over her head. She is not devious by nature and is now nine months into a deception that requires her to be devious daily, which is visibly aging her. She asks for equipment rather than help, because equipment does not have to be told why.',
      traits: ['exact', 'impatient', 'physically brave', 'bad at lying', 'proud'],
      voice: 'Clipped, technical, answers the question she wishes you had asked and then apologises',
      goals: [
        'Reopen the two dark galleries before the tithe books show the loss',
        'Get eleven strong bodies and four hundred strides of rope without filing a request',
        'Stop skimming hours before somebody starves for it',
      ],
      fears: [
        'A second collapse while people are in the duct',
        'The blight arithmetic arriving before her repair does',
        '[[npc.ossane-gorbea|Ossane Gorbea]] discovering the skim, because the reeve would not punish her, she would price her',
      ],
      beliefs: [
        'Light is a physical quantity and lying about it is a slower kind of theft than stealing it',
        'The Assembly counts shares because it cannot count degrees',
        'Anyone who says the ducts are permanent has never been inside one',
      ],
      secrets:
        "Two lower galleries have been dark for over a year after a duct collapse she could not repair alone and did not report. Rather than file it, she has been skimming mirror-hours off the grain terraces to disguise the loss, which means the barley harvest is failing slowly and the tithe books do not show it yet.\n\nThe skim is done at the second bank, at dawn, by a two-degree bias she applies and removes daily. It is visible to anyone who watches her hands for a week. She needs bodies and rope, not sympathy, and the moment the collapse is public the Assembly's first act will be to price the two galleries rather than dig them out.",
      combatRole: 'None. Will go into an unstable duct without hesitating, which has nothing to do with fighting.',
      skills: ['skill.mirror-cutting', 'skill.heat-reading', 'skill.bench-sense', 'skill.cable-and-drum'],
      skillNotes:
        'The best aligner in the karst and one of the few who understands the whole array rather than her own bank. A repair party needs [[skill.cable-and-drum|Cable and Drum]] for the rigging, [[skill.bench-sense|Bench Sense]] for the shoring and someone willing to be in a duct that has already come down once. She cannot pay in coin and will pay in mirror-hours, which is the local currency and is worth more.',
      inventory: ['item.sunwell-mirror'],
      inventoryNotes:
        'Her jointed hand mirror is guild-plated and therefore lawful; an identical unplated one in the same district is the crime of light theft. She also holds duct plate, amalgam and the ninety-day rotation card that says how much silvering exposure she has left this season, and she has been forging her own rotation card for two years.',
      schedule: [
        row({ time: '05:00', place: 'Second bank, [[landmark.sunwell-shaft|the Sunwell Shaft]] head', doing: 'First alignment of the day and the two-degree skim. Alone. The single most observable secret in the city.' }),
        row({ time: '08:00', place: '[[district.cave-agrarian-city-mirror-quarter|Mirror Quarter]] cleaving floor', doing: 'Cleaving and silvering, above ground, with the rotation crews.' }),
        row({ time: '12:00', place: 'The duct galleries', doing: 'Working alignments down the array. Anyone may accompany her and almost nobody does.' }),
        row({ time: '16:00', place: 'The collapsed section, below the fourth bank', doing: 'Alone, with a lamp, measuring a fall she cannot move. Four days out of seven.' }),
        row({ time: '19:00', place: 'Mirror Quarter refectory', doing: 'Eats with the other wrights and does not join the complaining, which they have noticed.' }),
      ],
      relationshipNotes:
        "[[npc.ossane-gorbea|Ossane Gorbea]] issues the hours Iratze is stealing, and the reeve is buying up starved galleries through a cousin, which means the two of them are wrecking the same terraces from opposite ends. [[npc.bedel-lehun|Bedel Lehun]]'s half-light strain is quietly covering for the hours she skims, and each has worked out what the other is doing without either saying it. [[npc.anthimos-vellani|Anthimos Vellani]] has written to her twice about [[item.fever-clay|fever clay]] and got one reply.",
      dialogueNotes:
        'Talks about ducts eagerly and about herself in single syllables. She will accept practical help immediately and refuse charity flatly. If a party finds the collapse before she confesses it, she does not deny it, she starts assigning them jobs, which is how she says thank you.',
      sampleLines: [
        '"Two degrees. That is all it is. Two degrees at the second bank and the fourth terrace eats and the sixth does not."',
        '"I do not need sympathy, I need eleven people who can hold a line for six hours and four hundred strides of rope that has not been condemned twice."',
        '"Everyone here says the ducts are the city. The ducts are two hundred pieces of silvered glass that some woman has to walk to every morning."',
      ],
      questNotes:
        'The engineering half of [[quest.who-gets-the-light|Who Gets the Light]]: her hidden collapse is one of the reasons the yield is short, and disclosing it changes the entire allocation argument. A party that reopens the galleries physically alters the city\'s food supply, which the world state should reflect.',
      playerChoices: [
        'Mount the repair with her: a multi-day rigging job in an unstable duct that ends with two galleries lit and the skim no longer necessary',
        'Report the collapse to the Assembly, which is honest, ends her career, and gets the galleries priced rather than repaired',
        'Take her skimming evidence to [[npc.ossane-gorbea|Ossane Gorbea]], who will not punish her but will own her',
        'Use the skim yourselves: two degrees at the second bank is a lever on which galleries eat, and she cannot report a theft she is already committing',
        'Fund a second aligner, which is the only structural fix and takes years she does not think the array has',
      ],
      repReactions: [
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'High', reaction: 'Formal, careful, and will not go anywhere near the fourth bank while they are watching.' }),
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'Low', reaction: 'Speaks freely, because a party the Assembly dislikes is a party that might actually dig.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Asks whether they can get the silvering rotation shortened, which is the demand she has never dared make.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Distrusts them on sight; the Ascent holds the karst\'s light debt and she knows what that means.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the unreported collapse and the skimmed hours. Added: the skim is a daily two-degree bias at a fixed time and place, so it is observable by patient players rather than discovered by a roll, and she forges her own silvering rotation card, which is how the amalgam is killing her.'),
    },
  }),

  E({
    id: 'npc.bedel-lehun',
    type: 'npc',
    name: 'Bedel Lehun',
    status: 'draft',
    summary: 'Fourth-terrace gallery farmer growing a violet grain-fungus that yields double in half the light and is not on the city list.',
    tags: ['cave-agrarian-city', 'agriculture', 'unlicensed', 'biology'],
    fields: {
      title: 'Gallery farmer, [[district.cave-agrarian-city-fourth-terrace|the Fourth Terrace]]',
      aliases: ['Lehun of the violet rows', 'The half-light man'],
      species: 'Human, karst-born, five generations on the same terrace',
      age: '49',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Stocky, permanently dusted violet to the forearms, with the pale skin and wide dark pupils of somebody who has spent a working life in half-light. Coughs in the mornings and blames the chaff. Wears his grandmother\'s terrace tally on a cord, which is a share certificate nobody has ever bothered to void.',
      home: ['district.cave-agrarian-city-fourth-terrace'],
      currentLocation: ['district.cave-agrarian-city-fourth-terrace'],
      occupation: 'Gallery farmer; grows an unregistered fungal strain',
      standing:
        'A terrace man, well liked, and increasingly the reason his neighbours are still solvent. Half the fourth terrace eats his strain daily and about the same proportion now sleeps badly and cannot stop eating it. He is not a criminal in anyone\'s eyes yet, including his own, and that is a thing the entry should hold rather than resolve.',
      personality:
        'Warm, talkative, defensive in a very specific place. He will show anyone the rows and explain the yield with real pride. Ask him about the sleeping and he changes the subject once, politely, and if pressed a second time he stops being warm. He is a man who has made a choice and is living inside the consequences with his eyes open.',
      traits: ['warm', 'proud', 'evasive on one subject', 'generous with food', 'stubborn'],
      voice: 'Talkative, agricultural, measures everything in flushes and light-hours',
      goals: [
        'Keep the fourth terrace\'s light allocation, which the strain currently makes survivable',
        'Get the strain onto the registered list without admitting how long it has been growing',
        'Work out what it is doing to people, without asking anyone who would have to report it',
      ],
      fears: [
        'Losing the allocation, which is what happens to a terrace that cannot make its tithe',
        'The first death he cannot explain as lung rot',
        'That his own daughter is on it four flushes a week',
      ],
      beliefs: [
        'A strain that yields double in half the light is not a crime, it is an argument',
        'The registered list protects the [[faction.mirror-assembly|Assembly]]\'s share values and nothing else',
        'People who have never farmed dark say a great deal about what should not be eaten',
      ],
      secrets:
        "The violet strain yields double on half the light, which is why half his terrace eats it daily and why half his terrace now sleeps four hours a night and cannot stop eating it. He knows. He has been keeping a tally of who is sleeping badly for eleven months, in the back of the same book that holds his flush records.\n\nHe has not stopped growing it, because the alternative is the fourth terrace failing its tithe and losing its light allocation entirely, which is not a metaphor: [[npc.ossane-gorbea|Ossane Gorbea]] would issue the hours elsewhere within a season and the terrace would be dark ground. [[npc.iratze-zubiate|Iratze Zubiate]]'s skimming and his strain are quietly covering for each other and both of them know it.",
      combatRole: 'Non-combatant. Owns a cutting hook and would use it badly and only in his own rows.',
      skills: ['skill.spore-lore', 'skill.ground-read', 'skill.market-ear'],
      skillNotes:
        'A practical mycologist with no theory and eleven months of the best field data in the karst. Any party with [[skill.spore-lore|Spore Lore]] can read his tally and tell him what he already suspects, which is a scene rather than a roll. He cannot read a contract, which is how his terrace ended up on a light debt in the first place.',
      inventory: ['item.fever-clay'],
      inventoryNotes:
        'Spawn jars, a flush book, and the eleven-month sleeping tally at the back of it. The spawn is the actual object of value: viable starter culture of an unlisted strain, which is contraband in the karst and worth a great deal to anyone growing food in the dark anywhere else.',
      schedule: [
        row({ time: '04:00', place: 'The violet rows, [[district.cave-agrarian-city-fourth-terrace|Fourth Terrace]]', doing: 'Cutting the early flush by lamp. Talks to anyone who shows up and gives them breakfast.' }),
        row({ time: '09:00', place: 'The terrace head, under the duct throw', doing: 'Registered crops, visibly and correctly farmed, for the tithe inspectors.' }),
        row({ time: '13:00', place: 'Neighbours\' galleries', doing: 'Distributes spawn. This is the mechanism by which an unlisted strain has spread to half a terrace, and it is entirely informal.' }),
        row({ time: '17:00', place: 'His kitchen', doing: 'Writes up flushes, and in the back of the same book, who is sleeping and who is not.' }),
        row({ time: '20:00', place: 'The terrace refectory', doing: 'Eats with forty neighbours, most of whom are eating his strain, and watches them.' }),
      ],
      relationshipNotes:
        "[[npc.ossane-gorbea|Ossane Gorbea]] holds his terrace's light allocation and could end him with a seal. [[npc.iratze-zubiate|Iratze Zubiate]]'s skim is the reason his half-light yields have been survivable and neither has said so out loud. His daughter is on the strain four flushes a week and is fifteen, which is the fact he cannot get past.",
      dialogueNotes:
        'Enthusiastic and hospitable, and hands out samples unprompted, which is a small horror in itself. The scene turns on whether a party accepts the food. He will answer any question about growing honestly and any question about sleeping with a change of subject, and the second refusal is where he becomes a different man.',
      sampleLines: [
        '"Double the flush on half the hours. You can stand there and tell me that is not worth having on a list."',
        '"Try it. Go on. It is good, it tastes of nothing much, and it is the reason there are forty people on this terrace instead of nine."',
        '"I have written down who is not sleeping. Eleven months of it. You are the first person to ask what the book is."',
      ],
      questNotes:
        'The agricultural third of [[quest.who-gets-the-light|Who Gets the Light]]: his strain is the reason the fourth terrace can survive an allocation cut, and it is also a slow public-health problem the city has not measured. A party can register it, suppress it, export it, or study it, and each of those is a different city in ten years.',
      playerChoices: [
        'Get the strain registered, which requires the Assembly to admit an unlisted crop has been feeding a terrace for years',
        'Have it destroyed, which is defensible, immediate, and leaves the fourth terrace unable to make its tithe',
        'Take spawn out of the karst, which is barred outright and would change what the dark can grow anywhere on the continent',
        'Help him find out what the strain does, with [[skill.spore-lore|Spore Lore]] and eleven months of his data, and let him decide with real information',
        'Tell his daughter, which is the smallest possible act and the one he cannot do',
      ],
      repReactions: [
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'High', reaction: 'Feeds them, shows them the registered rows only, and moves the conversation above ground.' }),
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'Low', reaction: 'Shows them everything, because a party the Assembly dislikes is not going to file anything.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Asks, cautiously, what spawn would be worth outside the karst. He has thought about it.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Trusts them with the sleeping tally on the first meeting, which he has not shown anyone else.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the double yield, the sleeplessness and his refusal to stop. Added: the eleven-month sleeping tally, which turns a rumour into evidence a party can read, and the informal spawn distribution that explains how an unlisted strain reached half a terrace without any conspiracy.') +
        '\n\nUnusual biology, not a drug plot. Do not give the strain a euphoria; the cost is sleep and dependence, quietly.',
    },
  }),

  E({
    id: 'npc.ossane-gorbea',
    type: 'npc',
    name: 'Ossane Gorbea',
    status: 'draft',
    summary: 'Light-tithe reeve: her seal decides which galleries get mirror-hours and which farm in the dark.',
    tags: ['cave-agrarian-city', 'power', 'corruption', 'allocation'],
    fields: {
      title: 'Light-tithe reeve, [[district.cave-agrarian-city-sunwell-terraces|Sunwell Terraces]]',
      aliases: ['The Reeve', 'Gorbea of the hours'],
      species: 'Human, karst-born, Assembly share family',
      age: '47',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Immaculate in a city where everything is dusted: pressed linen, clean cuffs, and a seal case on a chain that she sets on the table in front of her at the start of every meeting like a piece of evidence. Wears spectacles ground from [[material.clearcast-glass|clearcast glass]], imported, which in the karst is a statement about money rather than eyesight.',
      home: ['district.cave-agrarian-city-sunwell-terraces'],
      currentLocation: ['district.cave-agrarian-city-sunwell-terraces'],
      occupation: 'Reeve of the light tithe; issues and revokes mirror-hours under Assembly authority',
      standing:
        'The single most powerful practical office in the Hollow Karst, because light-hours are the city\'s actual currency and hers is the seal that issues them. The [[faction.mirror-assembly|Assembly]] votes the allocation in principle and she writes it in practice, which is the entire difference between a vote and a decision.',
      personality:
        'Courteous, extremely competent, and entirely unembarrassed. She regards allocation as a technical problem with a political cost that somebody has to bear, and she has decided it may as well be her, and she has decided she may as well be paid. She is never cruel in person and her decisions kill people at one remove, and she has thought about that more carefully than her critics have.',
      traits: ['courteous', 'competent', 'acquisitive', 'unembarrassed', 'genuinely good at the job'],
      voice: 'Measured, administrative, and turns every grievance into a scheduling question',
      goals: [
        'Hold enough starved galleries through her cousin to swing an Assembly vote outright',
        'Get the blight arithmetic settled before the Assembly has to vote on hunger',
        'Be the person who allocated the shortage rather than the person who was allocated by it',
      ],
      fears: [
        'A written record of the pattern: starve, buy, restore',
        'Her cousin talking, or dying intestate',
        'A yield failure large enough that no allocation works, which is roughly two seasons of blight away',
      ],
      beliefs: [
        'Somebody has to decide which galleries go dark and pretending otherwise is cowardice',
        'Shares are the only honest measure the city has, because everything else is opinion',
        'The people who call her corrupt would not last one allocation season in the chair',
      ],
      secrets:
        "She has been buying failed galleries through a cousin's name, having first starved them of hours. The pattern is four years old and consistent: a gallery loses its allocation, fails within two seasons, is bought at ground price, and receives a restored allocation within a year of the sale.\n\nSet out as a list of dates it is undeniable, and the list exists, because the tithe office records every issue and revocation by seal. Nobody has put the two columns side by side. [[npc.iratze-zubiate|Iratze Zubiate]]'s skimming is currently masking part of the pattern, which means the mirrorwright's confession would also be Ossane's defence.",
      combatRole: 'None. Travels with two tithe bailiffs who are not decorative.',
      skills: ['skill.ledger-hand', 'skill.writ-craft', 'skill.brokerage', 'skill.plain-letters', 'skill.the-cold-read'],
      skillNotes:
        'The best administrator in the karst and the reason the allocation system works at all, which is genuinely worth stating: remove her and the shortage gets worse before it gets fairer. Any case against her is a [[skill.ledger-hand|Ledger Hand]] problem, not a social one, and the documents are public.',
      inventory: ['item.sunwell-mirror', 'item.stair-writ'],
      inventoryNotes:
        'The seal case is the object of consequence: her seal issues hours, and an hour issued in her name is honoured whether or not she issued it. The stair writs are Ascent advances against next year\'s allocation, which is the debt that makes [[npc.wessel-ondriek|Wessel Ondriek]] the karst\'s largest creditor.',
      schedule: [
        row({ time: '06:30', place: 'Tithe office, [[district.cave-agrarian-city-sunwell-terraces|Sunwell Terraces]]', doing: 'Petitions. Open to anyone, first come, and she genuinely hears them, which is why the queue starts at four.' }),
        row({ time: '10:00', place: 'The terraces, walking the allocation', doing: 'Inspects the galleries she has issued to. Uncomfortable for everyone, and she does it anyway.' }),
        row({ time: '13:00', place: 'Assembly chamber', doing: 'Share business. This is where she is politically vulnerable and where she is most careful.' }),
        row({ time: '16:00', place: 'Her cousin\'s counting room, second terrace', doing: 'Twice a week, unrecorded, and the only appointment she keeps without a bailiff.' }),
        row({ time: '19:00', place: 'The reeve\'s house', doing: 'Dines with share families. The invitations themselves are a readable map of who is being bought next.' }),
      ],
      relationshipNotes:
        "[[npc.iratze-zubiate|Iratze Zubiate]] steals hours she issues, which Ossane suspects and has not pursued, because an offence she can prove later is more useful than one she prosecutes now. [[npc.bedel-lehun|Bedel Lehun]] survives at her pleasure. [[npc.wessel-ondriek|Wessel Ondriek]] holds her city's paper. [[npc.anwe-halduri|Anwe Halduri]] pays her in cut stone four times a year and has never once asked for hours, which Ossane finds more interesting than she lets on.",
      dialogueNotes:
        'Meets everyone, hears everyone, and grants almost nothing. She converts moral arguments into scheduling arguments so smoothly that players may not notice it happening. If shown the two columns side by side she does not panic; she asks what the party wants, and her first offer is always hours.',
      sampleLines: [
        '"You are describing a hardship. I am obliged to compare it with four others and issue against one of them. Which of the four would you like me to cut?"',
        '"Yes. I bought it. It had already failed. Show me the version of the story where somebody with money does not end up owning a dark gallery."',
        '"I can give you eleven hours a week for a season. That is more than most of this city will ever hold. Consider what you are about to spend it on."',
      ],
      questNotes:
        'The political axis of [[quest.who-gets-the-light|Who Gets the Light]]: she will enact whatever allocation is brokered, and she will make sure the galleries that lose are ones she is positioned to buy. Her starve-buy-restore list is also a standalone investigation that can be run entirely out of public records.',
      playerChoices: [
        'Compile the starve-buy-restore list from the tithe records and publish it, which breaks her and leaves the karst with no competent allocator',
        'Sell her the list, which buys hours, protection and a permanent leash',
        'Take her side and broker the allocation with her, which is efficient, effective and will starve galleries the party chooses',
        'Get to the cousin instead, who is the weak point and does not have her nerve',
        'Ask her for hours for a specific gallery and find out what she asks for in return, which is never money first',
      ],
      repReactions: [
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'High', reaction: 'Warm, useful, and offers the party a share purchase on terms that are a trap.' }),
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'Hostile', reaction: 'Scrupulously correct, grants nothing, and has their gallery petitions heard last for a year.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Treats them as her creditor\'s agents and negotiates as if the debt were already called.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Refuses to meet them in the tithe office and will meet them anywhere else, which is a tell.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the starving and buying through a cousin. Added: the pattern is provable from public tithe records if anyone sets issues against sales, so the investigation is a records job rather than a burglary, and she is written as competent rather than merely venal so that removing her has a cost.'),
    },
  }),

  /* ================================================================ */
  /* THE SIFTING CITY                                                  */
  /* ================================================================ */

  E({
    id: 'npc.tazrit-nourem',
    type: 'npc',
    name: "Tazrit n'Ourem",
    status: 'draft',
    summary: 'Sift-mistress of three towers on the Great Sieve, who buys debt as readily as ore and keeps the papers under her middle tower.',
    tags: ['sifting-city', 'power', 'indenture', 'pale-assay'],
    fields: {
      title: 'Sift-mistress of the third, fifth and sixth towers',
      aliases: ['The Fifth Tower', "n'Ourem"],
      species: 'Human, Pans-born, three generations on the Sieve',
      age: '56',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Sun-cured to the colour of the pans and entirely grey, with the permanent squint and the cracked lower lip of somebody who has never worked indoors. Dresses like her crews and eats what they eat, which is a deliberate and effective piece of politics. Wears a water tally at her belt, publicly, so that anyone can check she draws the same ration she issues.',
      home: ['district.sifting-city-the-tower-line'],
      currentLocation: ['district.sifting-city-the-tower-line'],
      occupation: 'Sift-mistress; holds three of the nine licensed towers and the bonds of about a third of the pan crews',
      standing:
        'The most powerful private person in the White Pans and one of the more respected, which visitors find hard to reconcile. She holds three towers, a water allocation and roughly a third of the city\'s indenture paper, and she runs all three better than the [[faction.pale-assay|Pale Assay]] runs its grading.',
      personality:
        'Plain, patient, and completely comfortable defending the indefensible because she has thought it through further than her opponents. She does not pretend the bonds are anything other than ownership. Her argument is that burning them frees several hundred people into a desert with no water allocation and no ration, and that nobody who wants them burned has ever offered to feed them.',
      traits: ['plain-spoken', 'patient', 'genuinely fair to her crews', 'immovable', 'proud of the water'],
      voice: 'Slow, dry, uses the language of grades and cuts for people as easily as for salt',
      goals: [
        'Break the [[faction.pale-assay|Pale Assay]]\'s grip on the grade stamp, which prices her ore in the Ascent rather than the Pans',
        'Keep her three towers crewed through a fourth dry season',
        'Die holding the paper rather than sell it on to somebody who would work it harder',
      ],
      fears: [
        'The strongroom burning, which would free several hundred people into her water allocation overnight',
        'A wasting-sickness case she cannot argue away, because the fraction the crews breathe is the fraction that pays',
        'The third bore going the way of the second',
      ],
      beliefs: [
        'A bond is a contract to feed somebody until a debt closes, and the feeding is the part everyone forgets',
        'The grade stamp is the real theft, not the indenture',
        'Anyone who wants to free her crews should arrive with water, not with fire',
      ],
      secrets:
        "Physical [[item.indenture-bond|indenture papers]] on roughly a third of the pan crews sit in one strongroom under her middle tower, in a single iron press, because she has never trusted a copy. Burning them frees several hundred people and immediately starts a fight over who feeds them, which is precisely the argument she uses to justify holding them.\n\nThe less defensible thing is quieter. She has been buying bonds cheaply from crews wasting on the fine fraction, on terms that look generous and are actuarial. She holds [[npc.doret-halvane|Doret Halvane]]'s brother's papers among them and has no idea what that particular sheet is worth to somebody in the [[city.gilded-ascent|Ascent]].",
      combatRole: 'None personally. Her tower crews are nine hundred people who like her, which is a different kind of threat.',
      skills: ['skill.sieve-tuning', 'skill.bond-broking', 'skill.ledger-hand', 'skill.market-ear', 'skill.brokerage'],
      skillNotes:
        'She can tune a cascade by ear and does it herself once a week to keep the tower-masters honest. [[skill.bond-broking|Bond Broking]] is the skill that made her, and it is lawful here and a capital charge in [[city.mediterranean-city|the Mediterranean City]], which is a fact she is careful about when she travels.',
      inventory: ['item.indenture-bond', 'item.assayers-tray', 'item.sift-screen'],
      inventoryNotes:
        'Carries a working assayer\'s tray and uses it: she grades her own output before the Pale Assay sees it and keeps a parallel record of every discrepancy, four years deep. That parallel record is the single best piece of evidence against the [[faction.pale-assay|Pale Assay]]\'s undergrading in existence.',
      schedule: [
        row({ time: '04:30', place: 'The fifth tower head, [[district.sifting-city-the-tower-line|Tower Line]]', doing: 'Watches the first feed go down the screens. Every day for thirty years. Approachable, and everyone knows it.' }),
        row({ time: '08:00', place: 'The three towers, in rotation', doing: 'Crew business, rations, water tallies. She signs the ration book personally and refuses to delegate it.' }),
        row({ time: '12:00', place: '[[district.sifting-city-assay-row|Assay Row]]', doing: 'Grading. Argues with the tower-masters about cuts, in public, at volume, four days a week.' }),
        row({ time: '15:00', place: 'The strongroom under the middle tower', doing: 'Alone, twice a week, with the iron press. Nobody else has been down there in eleven years.' }),
        row({ time: '19:00', place: 'The crew mess, fifth tower', doing: 'Eats with the crews. This is where a party can watch her be genuinely liked and decide what to do with that.' }),
      ],
      relationshipNotes:
        "[[npc.sahat-belek|Sahat Belek]] works the far white on her hire and she does not ask what he finds, which is a discipline she is proud of and which is currently costing her a great deal of information. [[npc.doret-halvane|Doret Halvane]] wants one sheet out of her strongroom and would trade sixty bonded warehouse keys for it. [[npc.berke-chagra|Berke Chagra]] buys and sells bond paper with her by correspondence and neither has met the other. [[npc.toval-cherek|Toval Cherek]] owes her two seasons of alloy on credit.",
      dialogueNotes:
        'Debates rather than deflects. She will argue the ethics of indenture with a party for an hour and mean every word, and she will not be moved by an argument she has already answered. What does move her is water: any proposal that solves the feeding problem gets a real hearing, immediately.',
      sampleLines: [
        '"Burn them. Go on. Then stand in the yard at first light and tell four hundred people where their ration is coming from, and I will stand next to you while you do it."',
        '"The Assay undergrades one cut and has done for years. That is the theft in this city. Mine is only the part you can see."',
        '"He signed at nineteen for a season\'s water. I did not write that paper. I bought it, and I have fed him for six years, and you may make of that whatever you like."',
      ],
      questNotes:
        'The strongroom heist is a straightforward job with an entirely unstraightforward aftermath, and the campaign should be prepared to play the aftermath. Her parallel grading record is also the documentary key to [[quest.pan-fever|Pan Fever]] and to any case against [[faction.pale-assay|the Pale Assay]].',
      playerChoices: [
        'Burn the strongroom, freeing several hundred people into a desert with no ration and starting a water crisis inside a week',
        'Take one sheet only, quietly, and give [[npc.doret-halvane|Doret Halvane]] her brother back',
        'Trade her the parallel grading record\'s use against the Pale Assay in exchange for bonds released in batches, which is slow, boring and works',
        'Buy bonds from her yourself and become the thing you came here to end',
        'Solve the feeding problem first: water rights, a caravan contract, a Mediterranean charter, and then ask her again',
      ],
      repReactions: [
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', standing: 'High', reaction: 'Cold, correct, and will not show them a single grading sheet.' }),
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', standing: 'Hostile', reaction: 'Delighted. Opens the parallel record on the table and starts pointing at columns.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Argues with them for two hours and then invites them to eat with the crews, which is not a concession.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Business-like and quietly contemptuous; she thinks the Hall sells what she at least feeds.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Will not deal. The Low Tally moves people out of the Pans and she regards that as theft of her obligations.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the papers, the strongroom and the who-feeds-them argument. Added: the parallel grading record, which gives a party a non-violent route to leverage over her and a weapon against the Pale Assay, and Doret Halvane\'s brother as a named sheet in the press.') +
        '\n\nShe must be allowed to win the argument sometimes. The point of the entry is that abolition here is a logistics problem, not a moral one.',
    },
  }),

  E({
    id: 'npc.sahat-belek',
    type: 'npc',
    name: 'Sahat Belek',
    status: 'draft',
    summary: 'Pan-walker who works the far white alone, eight days out, and has found something in the deep pans he has told nobody about.',
    tags: ['sifting-city', 'survival', 'discovery', 'white-pans'],
    fields: {
      title: 'Pan-walker, far white',
      aliases: ['Eight-Day Belek'],
      species: 'Human, Pans-born',
      age: '43',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Burnt dark, wrapped white, and thinner than a man his height should be. Walks with a rolling economy that reads as a limp until you have watched it for a mile. Carries his water in four separate skins because losing one should never be losing all of it, which is the whole man in a single habit.',
      home: ['district.sifting-city-the-outbound-yard'],
      currentLocation: [REGION.whitePans],
      occupation: 'Independent pan-walker; prospects the far white on eight-day circuits',
      standing:
        'Nobody in the city and something close to a legend in [[district.sifting-city-the-outbound-yard|the Outbound Yard]], where crews will point him out to strangers. He is hired by tower-masters when a find needs verifying and by nobody at all the rest of the time, which is how he likes it and how he stays poor.',
      personality:
        'Quiet, watchful, and completely unsentimental about the desert, which he describes the way a clerk describes a ledger. He is not brave, he is calibrated: he knows exactly what he can survive and does not go one day past it. The daughter is the only thing that makes him miscalculate.',
      traits: ['quiet', 'calibrated', 'observant', 'incorruptible about water', 'a bad liar'],
      voice: 'Sparse. Answers in distances and days, and says nothing at all when he does not know',
      goals: [
        'Passage papers out of the White Pans for himself and his daughter',
        'Sell the cache once, to somebody who will not simply take it',
        'Walk one more season before his lungs decide for him',
      ],
      fears: [
        'His daughter being bonded while he is eight days out',
        'Whoever left the crates coming back for them',
        'Dying in the far white, which he thinks about the way other people think about the weather',
      ],
      beliefs: [
        'The pans are not hostile, they are indifferent, and indifference can be planned for',
        'Anything crated and left in the deep pans was put there by people who intend to come back',
        'A man who sells his water sells his life at a discount',
      ],
      secrets:
        "He found crated [[material.ward-chalk|ward chalk]] in the deep pans, stamped with [[city.magic-city|Magic City]] marks, hundreds of kilometres off any sanctioned route, stacked and sheeted as if for collection. He has told nobody, he has not moved a crate, and he has walked past it twice more to confirm the count.\n\nThe permit numbers burnt into the crate ends are from [[npc.halvo-sarn|Halvo Sarn]]'s desk, which he cannot read and a party can. He will guide players to the cache in exchange for passage papers for himself and his daughter, and he will name that price first, before anyone asks what he found.",
      combatRole: 'Avoids entirely. Carries a knife for rope and salt crust. His skill is not being where trouble is.',
      skills: ['skill.the-far-walk', 'skill.ground-read', 'skill.weather-eye', 'skill.sieve-tuning', 'skill.cold-camp'],
      skillNotes:
        '[[skill.the-far-walk|The Far Walk]] embodied: cache discipline, water planning, and an absolute rule about turning back that he has never broken. He cannot read. The crate stamps are meaningless to him and are the single most important thing he is carrying, which is the entry\'s central irony and should be played straight rather than as a joke.',
      inventory: ['item.sift-screen', 'item.assayers-tray'],
      inventoryNotes:
        'Four water skins, a tray he was given by a tower-master and has never had stamped, and a private map of cache points across the far white kept in knotted cord because he cannot write. The cord is worth more than everything else he owns and looks like rubbish.',
      schedule: [
        row({ time: 'Days 1 to 8, out', place: '[[region.white-pans|The far white]]', doing: 'Walking circuits between cache points. Unreachable, unfindable, and the reason he is still alive.' }),
        row({ time: 'Day 9, dawn', place: '[[district.sifting-city-the-outbound-yard|The Outbound Yard]]', doing: 'Comes in, sells what the salt gave up, and is hireable for exactly one day.' }),
        row({ time: 'Day 9, midday', place: '[[district.sifting-city-assay-row|Assay Row]]', doing: 'Grading, and being cheated on the grade, which he knows and cannot prove.' }),
        row({ time: 'Days 9 to 11', place: '[[district.sifting-city-the-lee|The Lee]]', doing: 'With his daughter, who is eleven and has a cough he will not name.' }),
        row({ time: 'Day 12, before light', place: 'The water road gate', doing: 'Goes out again. He has kept this cycle for nineteen years.' }),
      ],
      relationshipNotes:
        "[[npc.tazrit-nourem|Tazrit n'Ourem]] hires him and does not ask what he finds, which is currently costing her the most interesting fact in the Pans. [[npc.kavel-uur|Kavel Uur]] keeps the same kind of private count on the other side of the [[region.cinder-waste|waste]] and the two of them have drunk together twice and liked it. [[npc.halvo-sarn|Halvo Sarn]]'s permit numbers are on the crates and neither man has any idea the other exists.",
      dialogueNotes:
        'Answers exactly what is asked and volunteers nothing, not from suspicion but from economy. Names his price in the first minute and does not move. The way in is his daughter: any offer that includes her passage gets a straight answer, and any offer that does not is refused without discussion.',
      sampleLines: [
        '"Eleven days out, two north of the second crust. I can put you within a hundred strides of it. I will not walk the last hundred with you."',
        '"Papers. Two sets. Hers first, in her name, sealed. Then we can talk about what is in the crates."',
        '"I cannot read what is burnt into them. I can tell you there are sixty-one, that they are sheeted, and that somebody swept the sand around them."',
      ],
      questNotes:
        'The cache is a whole investigation: unlogged ward chalk hundreds of kilometres off route, with permit numbers that lead to [[district.magic-city-chalk-row|Chalk Row]] and connect directly to [[quest.the-chalk-that-lies|The Chalk That Lies]]. A party can take the cache, trace it, or sell the location, and each choice hands a different faction a supply line.',
      playerChoices: [
        'Buy the guiding with genuine passage papers, which is cheap and makes him a permanent desert asset',
        'Promise papers and not deliver, which works exactly once and ends with the only far-white guide in the Pans as an enemy',
        'Take the cache: sixty-one crates of licensed ward chalk with a paper trail attached, which is worth a fortune and marks the party for whoever stacked it',
        'Trace the permit numbers instead of touching the crates, which is slower and is how the trail stays alive',
        'Get his daughter to a physician, which he has not been able to afford and will not ask for',
      ],
      repReactions: [
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', standing: 'High', reaction: 'Refuses the hire. He believes the Assay cheats his grades and he is right.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Asks whether they can actually move two people out of the Pans, and checks the answer with somebody else.' }),
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'High', reaction: 'Will not mention the crates at all, and a party may never learn they exist.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Will not speak to them near his daughter, and the hire price triples.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the cache and the passage-papers price. Added: sixty-one crates, swept sand and permit numbers traceable to Halvo Sarn, which wires the Pans directly into the Magic City chalk plot, and his illiteracy, which makes the evidence useless without a party.') +
        '\n\nWho stacked the crates and why is deliberately unanswered here.',
      },
  }),

  /* ================================================================ */
  /* THE MAGIC CITY                                                    */
  /* ================================================================ */

  E({
    id: 'npc.ysme-drannik',
    type: 'npc',
    name: 'Ysme Drannik',
    status: 'draft',
    summary: 'Ward-keeper of the Bound Fault, held in the chain-house since the last slippage because of what she can count.',
    tags: ['magic-city', 'imprisoned', 'warding', 'fetterhouse'],
    fields: {
      title: 'Ward-keeper of [[landmark.the-bound-fault|the Bound Fault]] (held)',
      aliases: ['The fourth house prisoner', 'Drannik of the ninth rota'],
      species: 'Human, Scar-born',
      age: '39',
      pronouns: 'she/her',
      state: 'Imprisoned',
      appearance:
        'Burnt out in the specific way the trade does it: the whites of her eyes are faintly clouded, her left hand shakes unless she sits on it, and there are chalk-line scars up both forearms where she has cut wards into her own skin to hold something in an emergency. Her hair went white at thirty-one. She is not chained. The door is simply locked and she is not on any roll.',
      home: ['district.magic-city-chainhouse-ward'],
      currentLocation: ['district.magic-city-chainhouse-ward'],
      occupation: 'Ward-keeper, senior rota; currently held without charge in the fourth chain-house',
      standing:
        'Officially nothing: she has no charge, no trial and no entry on the [[landmark.the-load-roll|Load Roll]], which is itself the [[faction.fetterhouse|Fetterhouse]] admitting what she knows. Among the chain crews she is the last competent authority on the fault and they still send questions in with her meals, which the wardens permit because the alternative is asking her out loud.',
      personality:
        'Dry, unhurried and entirely unafraid of the people holding her, because she has already worked out that they cannot use her and cannot release her. She answers technical questions generously and personal ones not at all. Her patience is not serenity, it is a resource she is spending carefully, and it is running out at a rate she can quote.',
      traits: ['dry', 'patient', 'burnt out', 'technically generous', 'utterly withholding on one point'],
      voice: 'Slow, precise, and drops into rota language: everything is a load, a schedule or a recut date',
      goals: [
        'Get one specific name struck off a proscription list, and she will not say why',
        'Have the two dead chains admitted out loud before somebody stands under them',
        'Work again, which she knows she cannot; her Toll has taken what it is going to take',
      ],
      fears: [
        'Dying in the room with the count still in her head',
        'A slippage while the city is still pretending nine chains hold',
        'That the name she wants struck is already dead, which she has no way to check',
      ],
      beliefs: [
        'A load that is not written down is still a load, and the fault has never once cared what the roll says',
        'Every licensed caster on the rota is on a list of who burns next, and the list is simply the rota read downwards',
        'The city holds her because saying the number aloud is more expensive than a person',
      ],
      secrets:
        "Nine chains bind the fault. Two of them are already dead, and she is the only living person who knows which two, because she was the one who tested them the week before the slippage and the test book went into the fire with the rest of the fourth house records.\n\nShe will trade the answer for one specific name struck off a proscription list. She will not say why, and the reason is that the name appears in [[npc.halvo-sarn|Halvo Sarn]]'s private index of everyone he has ever backdated a permit for, which means the moment she explains, both of them are finished. Cross-referenced against [[npc.toval-cherek|Toval Cherek]]'s work sections, her two dead chains tell a party exactly which section fails next and roughly when.",
      combatRole: 'None left. She could once hold a slab; her Toll accrued past the point where anyone will let her try.',
      skills: ['skill.ward-cutting', 'skill.chalk-hand', 'skill.load-binding', 'skill.toll-sense', 'skill.bleed-off'],
      skillNotes:
        'A [[skill.load-binding|Load Binding]] specialist at the top of the trade, now unable to work: her [[mechanic.the-toll|Toll]] is beyond what any licensed sink will discharge and the [[faction.fetterhouse|Fetterhouse]] will not licence a bleed-off for a prisoner. Everything she knows is now advice, which is exactly why she is dangerous and exactly why she is alive.',
      inventory: [],
      inventoryNotes:
        'Nothing. Her chalk, her measures and her rota card were taken. She has a slate she is permitted to write on and a warden who wipes it every evening, and she has been reproducing the chain test figures on it in pieces for eleven months, out of order, so that no single wiping loses them.',
      schedule: [
        row({ time: '06:00', place: 'Fourth chain-house, [[district.magic-city-chainhouse-ward|Chainhouse Ward]]', doing: 'Slate work. Rebuilds a fragment of the test figures from memory before the day\'s wiping.' }),
        row({ time: '09:00', place: 'The same room', doing: 'Chain crews send technical questions in with the water. She answers all of them and asks nothing in return.' }),
        row({ time: '13:00', place: 'The yard, under guard, forty minutes', doing: 'Her only time outdoors, in sight of the [[landmark.the-ninth-chain|Ninth Chain]], which she looks at the entire time.' }),
        row({ time: '17:00', place: 'Fourth chain-house', doing: 'Warden\'s inspection and the wiping of the slate. Predictable to the minute and the obvious window for anything else.' }),
        row({ time: 'Night', place: 'Locked', doing: 'Awake. The room is above a bound slab and she can feel the recut dates coming due, which she says is the worst part.' }),
      ],
      relationshipNotes:
        "[[npc.toval-cherek|Toval Cherek]] forged links for sections she tested, and neither of them has said to the other what they both know; they have been in the same building for eleven months. [[npc.halvo-sarn|Halvo Sarn]] holds the reason she will not explain herself. The chain crews trust her more than they trust the rota, which the [[faction.fetterhouse|Fetterhouse]] finds intolerable and cannot fix without a trial.",
      dialogueNotes:
        'Will talk about the fault, the chains, the rota and the Toll at length and with complete honesty. Will not name the two chains, will not name the name, and will not explain the connection. The negotiation is not about persuasion, it is about whether a party can actually get a name off a proscription list, which is a political job in another district entirely.',
      sampleLines: [
        '"Nine chains. The roll says nine hold. Both statements are true and only one of them is useful."',
        '"Strike the name. Bring me the amended list with the seal on it and I will give you two numbers, and you will not like either of them."',
        '"They do not keep me because I am dangerous. They keep me because if I walk out of here somebody will ask me a question in the street."',
      ],
      questNotes:
        'Her two numbers are the load-bearing intelligence for [[quest.the-chalk-that-lies|The Chalk That Lies]] and for any Bound Fault disaster arc: with them, a party knows which section fails and roughly when. Getting a name struck off a proscription list is its own political errand and should cost a faction relationship.',
      playerChoices: [
        'Get the name struck through the [[faction.fetterhouse|Fetterhouse]] properly, which requires standing the party may have to spend entirely',
        'Forge the amended list, which she will accept and which fails the day anyone checks',
        'Break her out, which is easy and leaves her Toll-crippled, unlicensed and hunted in a city built on licences',
        'Find out who the name belongs to first, which leads to [[npc.halvo-sarn|Halvo Sarn]]\'s index and a second, larger secret',
        'Publish that two chains are dead without the specifics, which panics the city and gets the wrong sections evacuated',
      ],
      repReactions: [
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'High', reaction: 'Speaks freely and warns them, once, that anything they take out of the room will be read.' }),
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'Hostile', reaction: 'They will not be admitted at all, and the meeting has to be bought from a warden.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Asks them to carry the rota-as-burn-list argument outside the city, where it might be believed.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Interested and cold: a party bidding on [[quest.the-scar-concession|the Scar concession]] wants her numbers for the wrong reason and she knows it.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the imprisonment, the two dead chains and the unexplained name. Added: the slate reconstruction, which gives a party something physical to extract, and the link from her silence to Halvo Sarn\'s index, which makes the two secrets a single mechanism.') +
        '\n\nWho the proscribed name is remains open. It is a good slot for a returning character or a table\'s own creation.',
    },
  }),

  E({
    id: 'npc.toval-cherek',
    type: 'npc',
    name: 'Toval Cherek',
    status: 'draft',
    summary: 'Chain-smith of the Bound Fault who has been shorting the alloy for two years to meet quota and knows exactly which sections carry his work.',
    tags: ['magic-city', 'engineering', 'negligence', 'disaster'],
    fields: {
      title: 'Chain-smith, replacement links',
      aliases: ['Cherek of the ninth', 'The quota'],
      species: 'Human, Scar-born, smith family',
      age: '52',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Forge-built: heavy shoulders, burn scarring up both forearms, and the deafness of forty years of hammer work, so he watches mouths. Wears a leather apron that has not been off him in daylight in three decades. His hands have started to shake in the evenings and he has begun doing the fine work before noon.',
      home: ['district.magic-city-chainhouse-ward'],
      currentLocation: ['district.magic-city-chainhouse-ward'],
      occupation: 'Chain-smith; forges the replacement links for the fault chains',
      standing:
        'Respected to the point of reverence. He learned his trade making [[landmark.the-ninth-chain|the Ninth Chain]], which is the reference every other chain is argued against, and the city treats that as a guarantee. It is exactly what makes his shorted links pass inspection: nobody tests a Cherek link twice.',
      personality:
        'Decent, tired and cornered. He is not venal and never took a coin for it: he fell behind on quota when his alloy supply went short, made one batch lean to catch up, and has been making them lean ever since because stopping now means being asked when he started. He is a man who cannot see a way to be honest that does not end in being blamed for the last slippage.',
      traits: ['decent', 'proud of the ninth', 'behind', 'deaf and watching mouths', 'unable to stop'],
      voice: 'Loud, because he cannot hear himself, and gentle in content, which is a disconcerting combination',
      goals: [
        'Meet quota this season without another lean batch',
        'Get the alloy supply fixed, which is a Sifting City problem he has no way to solve',
        'Tell somebody, once, in a room where saying it does not end him',
      ],
      fears: [
        'A section failing under sustained load with his stamp on it',
        'Being blamed for the last slippage as well, which he will be',
        '[[npc.ysme-drannik|Ysme Drannik]] saying his name, which she has not, in eleven months',
      ],
      beliefs: [
        'A chain is only as good as its worst link and he has personally made the worst links in the city',
        'The quota was set by people who have never stood at a forge and cannot be argued with',
        'Confession is not repair; the links are still in the chain either way',
      ],
      secrets:
        "Two years of replacement links have been forged with short alloy. They pass cold inspection cleanly and fail under sustained load, and he knows precisely which sections carry his lean work because he keeps his own stamp record, which no rule requires and nobody has asked for.\n\nHis alloy comes on credit from [[npc.tazrit-nourem|Tazrit n'Ourem]] in [[city.sifting-city|the Sifting City]] and he is two seasons behind on it, which is the real origin of the shortfall: an ore debt turned into a metallurgy problem turned into a structural one. Cross-referenced with [[npc.ysme-drannik|Ysme Drannik]]'s two dead chains, his stamp record names the section that fails next.",
      combatRole: 'Not a fighter, but forty years of hammer work and no hearing makes him hard to surprise and worse to grapple.',
      skills: ['skill.heat-reading', 'skill.bench-sense', 'skill.proof-marking', 'skill.charge-blending'],
      skillNotes:
        'The best smith in the city and the reason the deception has held: his [[skill.proof-marking|proof mark]] carries his liability and is trusted absolutely, which is precisely how bad work has entered the chains. A party with [[skill.bench-sense|Bench Sense]] can identify a lean link by ring and weight in about a minute if they know to look.',
      inventory: ['item.ward-pin'],
      inventoryNotes:
        'His stamp record is a bound book of link numbers, dates and sections, kept in the forge under the quench trough where it is the last thing anyone would search and the first thing a fire would take. He also holds a run of ward pins in sealed tubes he has never used and cannot legally sell.',
      schedule: [
        row({ time: '05:00', place: 'The chain forge, [[district.magic-city-chainhouse-ward|Chainhouse Ward]]', doing: 'Fine work while his hands are steady. Alone. The stamp record is out on the bench during this hour.' }),
        row({ time: '09:00', place: 'The forge', doing: 'Crew work, striking and drawing, with four apprentices who idolise him.' }),
        row({ time: '13:00', place: 'The chain lip, walking the sections', doing: 'Inspects his own links, unasked, weekly, and stands longest at the sections he knows are lean.' }),
        row({ time: '16:00', place: 'The alloy store', doing: 'Weighs what is left. This is the daily moment where the arithmetic that traps him is visible on a scale.' }),
        row({ time: '20:00', place: 'A chain-house tavern', doing: 'Drinks with crews, cannot hear the conversation, and is beloved anyway.' }),
      ],
      relationshipNotes:
        "[[npc.ysme-drannik|Ysme Drannik]] is locked in a room eighty strides from his forge and has not named him. [[npc.tazrit-nourem|Tazrit n'Ourem]] holds his alloy credit and does not know what her shortfall has caused. [[npc.halvo-sarn|Halvo Sarn]] offered once to backdate an inspection for him and Toval refused, which is the only genuinely clean thing anyone in this district has done in two years.",
      dialogueNotes:
        'Talks about metallurgy at length and with pleasure. Any technical question is a door. He is close to confessing at all times and needs only a person who will not immediately turn it into a prosecution, which is a much harder thing for a party to offer than it sounds.',
      sampleLines: [
        '"You want to know how a lean link passes. It passes because it is mine. Nobody tests a link with my mark on it, and that is not arrogance, that is the inspection schedule."',
        '"The ninth chain is one campaign, one specification, one alloy. I was twenty-nine. I have not made anything that good since and I never will."',
        '"I am not asking you to keep it quiet. I am asking you what happens to the sections if I stop."',
      ],
      questNotes:
        'The physical cause behind [[quest.the-chalk-that-lies|The Chalk That Lies]] and any fault-slippage disaster: his stamp record plus Ysme Drannik\'s two numbers is a complete failure prediction. Fixing it is an industrial problem (alloy supply, quota, re-forging) rather than a heroic one, and that should be the shape of the quest.',
      playerChoices: [
        'Take the stamp record to the [[faction.fetterhouse|Fetterhouse]], which condemns him and gets the sections re-forged on an emergency footing',
        'Fix the alloy supply instead, clearing his debt in the Pans, which stops new lean links and does nothing about the ones already hanging',
        'Cross-reference his record with [[npc.ysme-drannik|Ysme Drannik]]\'s numbers and evacuate the section that fails next, quietly, before anyone argues',
        'Blackmail him: he will do anything, including forge something he should not, and he will hate himself in a way that shows',
        'Say nothing and let the section fail, which is a legitimate table decision with a body count attached',
      ],
      repReactions: [
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'High', reaction: 'Formal, correct, and never alone with them. He assumes they are an inspection.' }),
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'Low', reaction: 'Relaxes visibly and starts talking about quota within the hour.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Tells them about the quota immediately, because he thinks the quota is the actual crime.' }),
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', standing: 'High', reaction: 'Asks them, awkwardly, whether alloy could be got at a better grade, which is him asking for help sideways.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the shorted alloy and his knowledge of the sections. Added: the stamp record as a physical document, and the alloy credit owed to Tazrit n\'Ourem, so the Magic City\'s structural failure originates in a Sifting City ore debt and the two cities are mechanically linked.'),
    },
  }),

  E({
    id: 'npc.halvo-sarn',
    type: 'npc',
    name: 'Halvo Sarn',
    status: 'draft',
    summary: 'Permit clerk of the ward-office. Every legal working in the Magic City crosses his desk, and a good number of illegal ones.',
    tags: ['magic-city', 'corruption', 'bureaucracy', 'leverage'],
    fields: {
      title: 'Permit clerk, ward-office, Chalk Row',
      aliases: ['The backdater', 'Sarn of the second window'],
      species: 'Human, Scar-born, clerical family',
      age: '35',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Neat, unremarkable, and cultivating both: a clerk\'s coat, a clerk\'s stoop, a face nobody describes accurately afterwards. Ink-stained middle finger. Keeps a bowl of chalk dust on his desk as a prop, because a permit clerk with clean hands looks like a man who has never been in a kiln.',
      home: ['district.magic-city-chalk-row'],
      currentLocation: ['district.magic-city-chalk-row'],
      occupation: 'Permit clerk; issues, dates and files every lawful working in the city',
      standing:
        'Junior on paper and load-bearing in practice. Every prosecution in the city depends on a permit being absent or late, and he decides which permits are absent or late. The [[faction.fetterhouse|Fetterhouse]] considers him a competent clerk who works long hours, which is true, and the long hours are the fraud.',
      personality:
        'Pleasant, efficient, and quietly terrified in a way he has learned to file. He did not set out to be the single point of failure for prosecuting anyone; he backdated one permit for a practitioner who was going to be chained, and the price went up from there. He is not greedy so much as unable to find the exit.',
      traits: ['pleasant', 'efficient', 'meticulous', 'frightened', 'never off duty'],
      voice: 'Helpful, procedural, and repeats your own words back as a question when he is buying time',
      goals: [
        'Keep the index safe, because the index is the only thing keeping him alive',
        'Stop taking new work, which he has told himself for two years',
        'Get out of the city with a name that will pass a gate',
      ],
      fears: [
        'The index being read by anyone at all, including the people it protects',
        'A prosecution collapsing so publicly that somebody audits the dates',
        '[[npc.ysme-drannik|Ysme Drannik]], who knows why one particular name is on a proscription list',
      ],
      beliefs: [
        'A date is the cheapest thing in the world to change and the most expensive thing to disprove',
        'Everyone he has saved would sell him within a day, which is why the index exists',
        'The [[faction.fetterhouse|Fetterhouse]] licenses people to burn out and calls it a rota; he has merely put a price on the alternative',
      ],
      secrets:
        "He backdates permits for practitioners already caught, at a rising price, which quietly makes him the single point of failure for prosecuting anyone in the Magic City. He records each forgery in a private index, so that nobody he has saved can ever threaten him.\n\nThe index is also a proscription-list map: one name in it is the name [[npc.ysme-drannik|Ysme Drannik]] wants struck off, and she will not say why because saying it exposes both of them. His permit numbers are burnt into sixty-one crates of ward chalk sitting in the deep [[region.white-pans|White Pans]], which he did not authorise and cannot report without explaining how he knows his own numbers were used.",
      combatRole: 'None. Will hand over anything except the index and will lie fluently while doing it.',
      skills: ['skill.writ-craft', 'skill.plain-letters', 'skill.ledger-hand', 'skill.false-proof', 'skill.chalk-hand'],
      skillNotes:
        '[[skill.false-proof|False Proof]] at a professional standard, applied to dates rather than stamps: his forgeries survive a second inspection because they are real permits with an altered sequence, filed correctly. Any party attempting the same needs both [[skill.writ-craft|Writ Craft]] and access to the sequence book, which he never leaves unattended.',
      inventory: ['item.ward-pin', 'item.cut-seal'],
      inventoryNotes:
        'The cut seal is not his: it was left with him as a deposit by a practitioner who never came back, and he has never used it and cannot dispose of it. The index is a slim ledger in a false-bottomed permit box on his own desk, in plain view, in an office full of identical boxes.',
      schedule: [
        row({ time: '07:00', place: 'Ward-office, [[district.magic-city-chalk-row|Chalk Row]]', doing: 'Public counter, second window. Anyone can queue and most of the city does.' }),
        row({ time: '12:00', place: 'The filing room', doing: 'Alone with the sequence book for an hour. Every backdating in the city happens in this hour.' }),
        row({ time: '14:00', place: 'The kilns and cake presses', doing: 'Inspections he is not required to do, which is how he keeps his hands looking like a working clerk\'s.' }),
        row({ time: '18:00', place: 'The office, after closing', doing: 'Long hours. This is when clients come, one at a time, by the back stair.' }),
        row({ time: '22:00', place: 'His rooms, two streets away', doing: 'Alone. He does not drink and does not keep company, which the district reads as piety.' }),
      ],
      relationshipNotes:
        "[[npc.ysme-drannik|Ysme Drannik]] is the only person who could explain his index and has spent eleven months not doing so, which he finds unbearable rather than reassuring. [[npc.toval-cherek|Toval Cherek]] refused his help once and Halvo has never forgotten it. [[npc.sahat-belek|Sahat Belek]] is standing next to sixty-one crates with Halvo's numbers on them and neither man knows the other exists.",
      dialogueNotes:
        'Helpful to a fault, and the helpfulness is a technique: he answers the question you asked so thoroughly that you forget the one you meant. Under pressure he offers a permit, immediately, for whatever the party wants to do, which is his only real currency and a genuinely valuable one.',
      sampleLines: [
        '"A permit is not permission. A permit is a date. If the date is right, the working was lawful, and if the date is wrong, then it always was."',
        '"I can have that sealed by the fourteenth. Which is to say I can have it sealed today and dated the fourteenth, and you may decide which of those sentences you heard."',
        '"Everyone I have helped would hand me over by tomorrow. That is not cynicism, that is why the book exists."',
      ],
      questNotes:
        'The clerical spine of the Magic City: he can make any party\'s working lawful, retroactively, which is an enormous practical asset with a lengthening leash attached. His index resolves [[npc.ysme-drannik|Ysme Drannik]]\'s price, and his permit numbers connect [[quest.the-chalk-that-lies|The Chalk That Lies]] to the cache in the White Pans.',
      playerChoices: [
        'Become clients, which makes casting in the city safe and puts the party in the index',
        'Take the index, which arms them against every practitioner in it and makes them the target he was protecting himself from',
        'Give the index to the [[faction.fetterhouse|Fetterhouse]], which triggers dozens of reopened prosecutions and a purge nobody controls',
        'Use it only for the one name [[npc.ysme-drannik|Ysme Drannik]] wants, and leave the rest, which is the narrow, decent option',
        'Get him out of the city with a clean name, which costs a favour somewhere and removes the city\'s prosecution bottleneck permanently',
      ],
      repReactions: [
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'High', reaction: 'Impeccable service, no back stair, and nothing that is not on a form.' }),
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', standing: 'Hostile', reaction: 'Offers the back stair on the first meeting, because a party the Fetterhouse hates is a party that needs dates.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Prices his work at half and asks for goods rather than coin, which is how he is planning his exit.' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', standing: 'High', reaction: 'Nervous. He knows what the Post does with sealed letters and half his correspondence goes by it.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the backdating and the private index. Added: the index doubles as the reason Ysme Drannik cannot explain her price, and his permit numbers appear on the White Pans cache, which gives one clerk three separate plot threads without inventing a new institution.'),
    },
  }),

  /* ================================================================ */
  /* THE ARENA CITY                                                    */
  /* ================================================================ */

  E({
    id: 'npc.aylun-torgai',
    type: 'npc',
    name: 'Aylun Torgai',
    status: 'draft',
    summary: 'Sunken Ring fighter, sixteen wins, freed on paper and still owned in fact over a mis-stamped seal.',
    tags: ['arena-city', 'indenture', 'fighter', 'freedom'],
    fields: {
      title: 'Ring fighter, sixteen sanctioned wins',
      aliases: ['Sixteen', 'Torgai of the third pen'],
      species: 'Human, steppe-born, sold into the Ring at seventeen',
      age: '27',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Ring-built: heavy through the shoulders and forearms, light everywhere else, with the scarring distributed exactly where a falx guard does not reach. Sixteen notches on the [[item.tallyblade|tallyblade]] she is required to carry. Shaves her head because the Ring pays a barber and it is one of four things she gets for free.',
      home: ['district.arena-city-the-under-stands'],
      currentLocation: ['district.arena-city-the-under-stands'],
      occupation: 'Contracted fighter under [[mechanic.ring-bond|the Ring Bond]]',
      standing:
        'A name on the banners and a body in a pen. Sixteen wins makes her valuable, which means better food, worse opponents and a cell one floor up. The crowd knows her. The [[faction.red-writ|Red Writ]] knows her value to the decimal. Legally she is free, and the legality is a piece of paper three floors under the sand.',
      personality:
        'Contained, funny in a flat register, and dangerous to be near when hope is introduced. She has organised her entire personality around not needing the manumission and she is not good at it. She does not ask for help and will accept it if it is offered as a transaction, which is the only shape of kindness she trusts.',
      traits: ['contained', 'dry', 'unwilling to hope', 'protective of the pens', 'exact about promises'],
      voice: 'Short, level, uses fight-card vocabulary for everything: stipulations, tiers, cards, undercards',
      goals: [
        'Get the original manumission out of the contract vault',
        'Get out of the city with a [[item.quitblade|quitblade]] in her hand, because a mark on paper is not enough at a gate',
        'Keep the third pen from being sold as an undercard job lot, which is being discussed',
      ],
      fears: [
        'Losing on the night she was going to run',
        'Being freed and immediately re-bonded on a technicality, which she has watched happen twice',
        'That the vault copy has already been destroyed and all of this has been a story she told herself',
      ],
      beliefs: [
        'Paper owns people; blades do not. Everything in this city is a clerical problem pretending to be a spectacle',
        'The crowd is not the enemy. The crowd is weather',
        'Anybody who says they will free you wants something first, and it is better to hear what it is',
      ],
      secrets:
        "Her manumission was signed and then voided over a mis-stamped seal, and the original sits in the Ring's contract vault three floors under the sand in [[district.arena-city-the-under-stands|the Under-Stands]]. Recovering it makes her free and hunted, because a freed fighter with sixteen wins is a walking loss on [[npc.berke-chagra|Berke Chagra]]'s book.\n\nShe has also worked out how the fixing is done: two dry days and a fighter loses honestly, so nothing is provable from the fight itself. She has been counting water rations against results for a year, in her head, because she is not allowed to keep paper. She can name eleven bouts.",
      combatRole: 'Front-line duellist. Falx and shield, arena stipulations, and a genuine reluctance to kill outside the sand.',
      skills: ['skill.ring-craft', 'skill.close-work', 'skill.plate-and-seam', 'skill.crowd-turning', 'skill.set-and-brace'],
      skillNotes:
        'Sixteen wins under [[mechanic.ring-bond|the Ring Bond]] means sixteen sets of stipulations survived, which is a rules-lawyering skill as much as a fighting one. [[skill.crowd-turning|Crowd Turning]] is the dangerous one: she can move twelve thousand people, has never tried, and knows what happens to the fighter who does.',
      inventory: ['item.tallyblade', 'item.scourglass-sabre'],
      inventoryNotes:
        'The tallyblade is the Ring\'s, notched by the clerks, and carrying it is compulsory. Striking a [[item.quitblade|quitblade]] from a spent tallyblade at the ring forge is the physical act of manumission in this city, and a forged one is the obvious crime, which is why she wants the vault paper rather than a blade alone.',
      schedule: [
        row({ time: '05:00', place: 'Third pen, [[district.arena-city-the-under-stands|the Under-Stands]]', doing: 'Wakes before the pen bell. Counts the water butts on the way out, which is how the ration tally is compiled.' }),
        row({ time: '07:00', place: 'The sand, [[landmark.the-sunken-ring|the Sunken Ring]]', doing: 'Training on the card rota. Public, watchable from the tiers, and the only place a stranger can see her.' }),
        row({ time: '12:00', place: 'The pen yard', doing: 'Eats with the pens. She is the one the newer fighters ask about stipulations, which is unpaid work she does anyway.' }),
        row({ time: '15:00', place: '[[district.arena-city-writ-court|Writ Court]] anteroom, once a week', doing: 'Petitions about the seal. Has done this for two years and is now known to the clerks as a nuisance.' }),
        row({ time: 'Card nights', place: 'The sand', doing: 'Fights. On card nights nothing else in her schedule happens and the pens are locked.' }),
      ],
      relationshipNotes:
        "[[npc.berke-chagra|Berke Chagra]] holds her water and therefore her results, and she is the one fighter who has worked out how. [[npc.sukhet-daral|Sukhet Daral]] trades her cage keys for silence about what is breeding in the sumps, which is the only equal arrangement she has. [[npc.tazrit-nourem|Tazrit n'Ourem]] holds bond paper on people she trained with, several hundred miles away, and Aylun has never heard the name.",
      dialogueNotes:
        'Answers questions about the Ring plainly and questions about herself with a stipulation: what does the asker want. If a party offers to get the manumission she does not thank them, she starts planning, in detail, immediately, which is more moving than gratitude would be.',
      sampleLines: [
        '"Sixteen. It is a number they put on a banner, not a thing I did. Ask me about the stipulations and I will tell you what actually happened."',
        '"Two dry days and I lose to a man I have beaten twice. That is not a fight, it is a water ration with an audience."',
        '"If you get it, do not bring it to me. Take it to the [[district.arena-city-writ-court|Writ Court]] and have it read, in front of the clerks, in daylight. I want it to have happened to everyone, not to me."',
      ],
      questNotes:
        'The vault job is a heist with a document as the prize and a legal act as the payoff. Her water-ration tally is the only evidence that survives [[npc.berke-chagra|Berke Chagra]]\'s method, and it lives in her head, which makes her both witness and target for any fixing investigation.',
      playerChoices: [
        'Run the vault job and have the manumission read publicly in Writ Court, which frees her and makes her the Ring\'s enemy in the open',
        'Buy her bond outright, which is legal, expensive, and makes the party her owners while the paperwork clears',
        'Strike her a forged [[item.quitblade|quitblade]] and get her out unlawfully, which works until the first gate that checks',
        'Use her ration tally to break [[npc.berke-chagra|Berke Chagra]], which puts her at the centre of it whether she consents or not',
        'Leave her in place as an ally inside the Ring, which is useful, cowardly and exactly what everyone else has done',
      ],
      repReactions: [
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'High', reaction: 'Speaks to them only on the sand, in public, where a conversation is a training session.' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'Hostile', reaction: 'Trusts them immediately, which is not the same as liking them.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Asks whether a strike works in a place where the workers are the stock, and means it as a real question.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Refuses to be alone with them and warns the rest of the pens.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the voided manumission and the vault. Added: she has independently worked out the water-ration fixing method and can name eleven bouts, which makes her a witness as well as a victim and gives her something to trade rather than only something to need.') +
        '\n\nHer request that the paper be read publicly rather than handed to her is the entry\'s point. Play the freedom as an institutional act.',
    },
  }),

  E({
    id: 'npc.berke-chagra',
    type: 'npc',
    name: 'Berke Chagra',
    status: 'draft',
    summary: 'Ring bookmaker holding paper on half the Sunken Ring\'s fighters and most of its stewards, and buying water rather than bribing.',
    tags: ['arena-city', 'criminal', 'gambling', 'red-writ'],
    fields: {
      title: 'Bookmaker, Banner Streets',
      aliases: ['The Post', 'Chagra of the third banner'],
      species: 'Human, steppe-born, drover family',
      age: '50',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Well fed in a city where that is a statement, dressed in good [[material.steppe-scute|scute]] leather rather than anything imported, with a betting slate on a strap and chalk permanently on his right cuff. Smiles a great deal, at everyone, including people he is destroying, without any apparent malice in it.',
      home: ['district.arena-city-banner-streets'],
      currentLocation: ['district.arena-city-banner-streets'],
      occupation: 'Bookmaker; holds bond paper on fighters, stewards and two beast-keepers',
      standing:
        'The most solvent private individual in the city and the least official. He holds no office, sits on no chamber, and half the [[faction.red-writ|Red Writ]]\'s stewards are into him for more than they earn. His power is entirely made of small debts held patiently, which is a lesson the entry should make explicit.',
      personality:
        'Genial, generous with drinks and information, and entirely without cruelty, which makes him worse rather than better. He has thought carefully about how to fix fights without leaving evidence and arrived at water, and he is pleased with the elegance of it in the way a craftsman is pleased. He will describe the method to a party if they seem to appreciate it.',
      traits: ['genial', 'patient', 'proud of his method', 'no visible malice', 'never carries cash'],
      voice: 'Warm, chatty, quotes odds in the middle of sentences and never raises his voice',
      goals: [
        'Keep the water-steward solvent enough to keep working and indebted enough to keep obeying',
        'Buy the fourth banner company outright, which would give him a card rather than merely a book',
        'Never appear in a ledger anywhere, in any capacity, ever',
      ],
      fears: [
        'A fighter who has worked out the method and can count, which is currently one fighter',
        'The water-steward dying, because her tally is the only record and he cannot get at it',
        'Being made official, which would make him accountable',
      ],
      beliefs: [
        'You do not buy a fighter, you buy the conditions the fighter lives in',
        'A small debt held for years is worth more than a large one called in once',
        'Everything in the Ring is honest, and honesty is a mechanism like any other',
      ],
      secrets:
        "He does not bribe fighters. He buys their water ration. Two dry days and a fighter loses honestly, so nothing whatever can be proved from the fight itself, and the only evidence is the water-steward's tally.\n\nThe water-steward is into him for more than she earns in a year, which means the tally is both the evidence and the leash. He also buys and sells indenture paper by correspondence with [[npc.tazrit-nourem|Tazrit n'Ourem]] in the Pans, and takes delivery of levy-dodgers from a timber-yard factor upriver who is fed by [[npc.saarik-rauda|Saarik Rauda]]. He has never asked where the second lot come from.",
      combatRole: 'None. Employs four company men who are not subtle and are not his only arrangement.',
      skills: ['skill.market-ear', 'skill.the-cold-read', 'skill.bond-broking', 'skill.ledger-hand', 'skill.brokerage'],
      skillNotes:
        'A [[skill.market-ear|Market Ear]] specialist applied to bodies: he knows which fighter is short of sleep, which steward is behind on rent and which company is about to fold, and he knows it before they do. Not a caster, not a fighter, and completely dependent on other people\'s access, which is his only structural weakness.',
      inventory: ['item.indenture-bond', 'item.stair-writ'],
      inventoryNotes:
        'Carries no coin, ever, on principle: everything he does is paper, and the paper is held elsewhere. The betting slate is chalked and wiped nightly. His actual book is in a house on the third banner, kept by a clerk who has never met a fighter.',
      schedule: [
        row({ time: '09:00', place: 'The third banner post, [[district.arena-city-banner-streets|Banner Streets]]', doing: 'Taking bets in the open. Anyone can approach and he will buy them a drink.' }),
        row({ time: '12:00', place: 'The company frontages', doing: 'Visits four or five companies, collects nothing, and reminds everyone that he has not collected.' }),
        row({ time: '14:00', place: 'The water court end of [[district.arena-city-the-under-stands|the Under-Stands]]', doing: 'A short conversation with the water-steward, most days, in public, about nothing.' }),
        row({ time: '17:00', place: 'His house, third banner', doing: 'The book. This is the one hour a day the real ledger is open, and the clerk is alone in the room with it.' }),
        row({ time: 'Card nights', place: 'The tiers, north side, same seat', doing: 'Watches the card he has arranged and is visibly delighted when it goes as expected.' }),
      ],
      relationshipNotes:
        "[[npc.aylun-torgai|Aylun Torgai]] is the one fighter who has counted the water butts and he does not yet know it. [[npc.sukhet-daral|Sukhet Daral]] owes him and is trying to solve a breeding problem before Berke finds out it is worth money. [[npc.tazrit-nourem|Tazrit n'Ourem]] is a correspondent he has never met and rather admires. The upriver factor who supplies him connects, at two removes, to a gate-sergeant in [[city.tree-city|the Tree City]].",
      dialogueNotes:
        'Immediately friendly, genuinely useful, and will answer almost any question about the Ring accurately. He never denies anything; he reframes it as a service. The scene turns when a party names the water, at which point he becomes interested rather than defensive, and starts working out what they are worth.',
      sampleLines: [
        '"I have never given a fighter a coin in my life. You can ask any of them, and they will tell you the same, and they will be telling the truth."',
        '"Water. Two days. That is the whole of it. Everyone looks for a bribe because a bribe is a thing you can hold."',
        '"I would rather sixty people owed me a little for years than one person owed me everything on Tuesday."',
      ],
      questNotes:
        'The Ring\'s economic antagonist, and the reason freeing one fighter changes nothing. Breaking him requires the water-steward\'s tally, which means either clearing her debt or protecting her, and both are more interesting than fighting his company men.',
      playerChoices: [
        'Clear the water-steward\'s debt and take her tally into [[district.arena-city-writ-court|Writ Court]], which is the only route that convicts him',
        'Buy his book from him, which he will sell, and inherit sixty small debts and everyone attached to them',
        'Kill him, which changes nothing: the paper is elsewhere and the clerk keeps working',
        'Feed him a fixed card and take him for everything, which is satisfying, temporary, and makes an enemy who never forgets a number',
        'Trace the upriver supply back to [[city.tree-city|the Tree City]] and cut the trafficking line rather than the gambling one',
      ],
      repReactions: [
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'High', reaction: 'Buys them dinner and offers a share of the book, which is how everyone in this city starts owing him.' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'Hostile', reaction: 'Still cordial, still buys the dinner, and their odds get quietly worse at every post in the city.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Finds them funny, and will explain at length why a strike cannot work on people who are inventory.' }),
        row({ faction: '[[faction.bondwrights-hall|Bondwrights\' Hall]]', standing: 'High', reaction: 'Business immediately: he has paper to move and would rather move it respectably.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the water-ration method and the indebted water-steward. Added: correspondence bond trade with Tazrit n\'Ourem and an upriver supply from the Tree City timber yards, which quietly makes him a node in the continental indenture economy rather than a local villain.'),
    },
  }),

  E({
    id: 'npc.sukhet-daral',
    type: 'npc',
    name: 'Sukhet Daral',
    status: 'draft',
    summary: 'Beast-keeper of the under-stables, whose undocumented Drown imports have bred under the stands and are getting out.',
    tags: ['arena-city', 'creatures', 'containment', 'biology'],
    fields: {
      title: 'Beast-keeper, the under-stables',
      aliases: ['Daral of the cage runs', 'The keeper'],
      species: 'Human, delta-born, twenty years on the steppe',
      age: '45',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Scarred hands, scarred forearms, and a careful way of standing that suggests he expects the floor to contain something. Smells of the pens and does not notice. Keeps a lamp and a pole within reach at all times, indoors and out, which visitors find eccentric and his crews find reassuring.',
      home: ['district.arena-city-the-under-stands'],
      currentLocation: ['district.arena-city-the-under-stands'],
      occupation: 'Beast-keeper; supplies the Ring with whatever the crowd has not seen before',
      standing:
        'A senior technical hand with no standing whatever in the [[faction.red-writ|Red Writ]]\'s hierarchy: the cards make money, and he makes the cards possible, and nobody in Writ Court could name him. That anonymity is the only thing keeping his import problem private.',
      personality:
        'Careful, competent and deeply uneasy. He knows animals better than he knows people and talks about both in the same register. He is not looking for absolution: he wants the problem solved before the next flooded card, and he is entirely willing to pay for it in access rather than pretend it is anyone else\'s fault.',
      traits: ['careful', 'competent', 'uneasy', 'honest about his own error', 'pays in access'],
      voice: 'Quiet, technical, describes animals with affection and people with caution',
      goals: [
        'Clear the walled channels before the next flooded card',
        'Get the young out or dead without anyone above ground finding out how they got there',
        'Stop importing from the delta, which he has said before',
      ],
      fears: [
        'A flooded card with something loose under the sand and twelve thousand people above it',
        'The [[landmark.the-blood-channels|Blood Channels]] carrying them out toward the drovers\' wells',
        'Being made the reason, which he accepts he would be',
      ],
      beliefs: [
        'Nothing in the pens is malicious; everything in the pens is hungry, which is worse and more predictable',
        'A cage built for an adult is not a cage for its young, and everyone learns that once',
        'The crowd wants novelty, and novelty is a thing you import without papers',
      ],
      secrets:
        "Two [[region.the-drown|Drown]] animals he imported without papers have bred under the stands, and the young are getting out of the pens he built for the adults. He does not know how many. He knows there were at least nine and that four of the walled sections he checks are now quiet in a way that is not good.\n\nFour of the [[landmark.the-blood-channels|Blood Channels]] still flow, and they drain toward the wells the [[district.arena-city-drovers-camp|drovers]] use. He has not raised that in any conversation with anyone, including himself, and he will pay in cage keys and tunnel access to have it dealt with before the next flooded card.",
      combatRole: 'Handler rather than fighter: pole, lamp, net, and an unnerving willingness to walk toward the noise.',
      skills: ['skill.yoke-and-tether', 'skill.ground-read', 'skill.venom-work', 'skill.spore-lore', 'skill.marsh-footing'],
      skillNotes:
        'Delta-trained: [[skill.marsh-footing|Marsh Footing]] in a city on the [[region.ashen-steppe|Ashen Steppe]] is an oddity that explains both his competence and his mistake. He can identify, sedate and move almost anything, and he cannot legally document any of it.',
      inventory: ['item.cinderroot-cordial'],
      inventoryNotes:
        'Cage keys, a hooked pole, a shuttered lamp and a sedation kit he mixes himself. The cordial is for the crews and he issues it sparingly because he has watched what three seasons of it does to a handler\'s hands. His import records do not exist, which is deliberate and is now a problem.',
      schedule: [
        row({ time: '04:00', place: 'The cage runs, [[district.arena-city-the-under-stands|Under-Stands]] second floor', doing: 'Feeding, before anyone is about. This is the shift where he counts, and the count has been wrong for six weeks.' }),
        row({ time: '08:00', place: 'The pens', doing: 'Card preparation with the beast crews. Public, busy, and safe to approach.' }),
        row({ time: '13:00', place: 'The walled sections', doing: 'Alone, with a lamp and a pole, checking sections he has not opened in a month. Four are quiet.' }),
        row({ time: '16:00', place: 'The [[landmark.the-blood-channels|Blood Channels]] grating', doing: 'Stands at the grate and listens. Has started doing this daily and tells his crews it is drainage inspection.' }),
        row({ time: '20:00', place: 'A stall in [[district.arena-city-drovers-camp|the Drovers\' Camp]]', doing: 'Drinks with drovers and asks, casually, whether anything has been taking stock at the wells.' }),
      ],
      relationshipNotes:
        "[[npc.aylun-torgai|Aylun Torgai]] trades him silence for cage keys and the arrangement is the only equal one either of them has. [[npc.berke-chagra|Berke Chagra]] holds paper on him and would turn the escape into a card if he heard about it, which is why nothing has been reported. [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]]'s clan sold him the original pair, four years ago, off a cane raft, and there is a name on that transaction he has never repeated.",
      dialogueNotes:
        'Straightforward, technical and grateful for competence. He states the problem plainly on a first meeting if the party has any reason to be under the stands, because he has run out of ways to solve it alone. He pays in access, not coin, and the access is worth more.',
      sampleLines: [
        '"I built the pens for the pair. Nobody builds a pen for what the pair does next. That is the mistake and it is mine."',
        '"Four sections quiet. Not empty, quiet. There is a difference and you will hear it before you see it."',
        '"Cage keys, the tunnel plan and every grating in the bowl. That is what I have got. If you want money, go and see the bookmaker, and I will not be able to help you afterwards."',
      ],
      questNotes:
        'A containment job with a hard deadline (the next flooded card) and an ugly second half: four channels drain toward the drovers\' wells, so the problem is already outside the arena. Also the clean route into [[district.arena-city-the-under-stands|the Under-Stands]] for any party attempting the contract vault, since he sells access rather than coin.',
      playerChoices: [
        'Clear the walled sections before the flooded card, which is a straight dungeon crawl with a real reason to exist',
        'Report the escape to the [[faction.red-writ|Red Writ]], which ends him and gets the sections flooded with people who do not know what is down there',
        'Sell the story to [[npc.berke-chagra|Berke Chagra]], who will put the animals on a card and take bets',
        'Warn the drovers about the wells, which is the humane act nobody is paying for',
        'Take the access and use it for the vault instead, leaving the sections as they are, which the campaign should remember',
      ],
      repReactions: [
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'High', reaction: 'Will not raise the escape at all and keeps the conversation on cards and cages.' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'Low', reaction: 'Tells them everything within ten minutes, because they have nothing to gain by reporting it.' }),
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', standing: 'High', reaction: 'Asks after the delta and the raft-clan that sold him the pair, which is a name he has kept for four years.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Offers them the return trade: unpapered delta stock, regular, and a route he has already used.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the bred imports and the payment in cage keys and tunnel access. Added: four quiet sections and four still-flowing blood channels draining toward the drovers\' wells, which gives the containment job a timer and a consequence outside the arena walls.') +
        '\n\nThe species is left unspecified on purpose so a bestiary author can claim it.',
    },
  }),

  /* ================================================================ */
  /* THE FLOATING SWAMP SETTLEMENT                                     */
  /* ================================================================ */

  E({
    id: 'npc.sabbe-sixteen-knot',
    type: 'npc',
    name: 'Sabbe Sixteen-Knot',
    status: 'draft',
    summary: 'Elder of the Sixteen-Knot rafts, whose word decides where the settlement re-moors and who has already been bought.',
    tags: ['floating-swamp', 'power', 'betrayal', 'moorstone-compact'],
    fields: {
      title: 'Elder of the Sixteen-Knot comb',
      aliases: ['Sabbe of the spine raft', 'Sixteen-Knot'],
      species: 'Human, delta-born, raft-clan',
      age: '63',
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Small, bent, and the colour of the delta after sixty years on it. Hands ruined by rope and cold water. Wears a coat of oiled cane cloth and the clan\'s knot-count at the collar, sixteen loops, retied every year by whoever is her heir that season, which is currently nobody.',
      home: ['district.floating-swamp-settlement-sixteen-knot'],
      currentLocation: ['district.floating-swamp-settlement-sixteen-knot'],
      occupation: 'Clan elder; her judgement sets the settlement\'s drift bearings',
      standing:
        'Forty-one rafts in one comb and a berth held for nine drifts, which makes her the largest single voice in [[faction.moorstone-compact|the Compact]]\'s draw. The other clans defer to her judgement because it has been right for thirty years, and that credit is the exact thing she is about to spend.',
      personality:
        'Shrewd, warm to her own, and utterly ruthless about the clan\'s survival on a timescale nobody else is thinking on. She has watched the delta take three settlements in her lifetime. She does not experience the arrangement with the Weir as a betrayal; she experiences it as the price of a berth that will still exist in twenty years, and she is not obviously wrong.',
      traits: ['shrewd', 'long-sighted', 'warm to kin', 'ruthless', 'running out of time'],
      voice: 'Slow delta cadence, speaks in water and rope terms, and asks questions she already knows the answer to',
      goals: [
        'Make the upriver drift look like her own judgement rather than a purchase',
        'Guarantee the Sixteen-Knot berth against the next three floods',
        'Name an heir before the next draw, which she has been avoiding for two years',
      ],
      fears: [
        'Three clans cutting her lines, which is what happens to a bought elder',
        'The Tail lots taking a release she knew about and did not warn them of',
        'Being right about the upriver drift and remembered as bought anyway',
      ],
      beliefs: [
        'A settlement that does not choose its water has its water chosen for it',
        'The Compact\'s draw is fair and fairness has drowned more people here than the Weir has',
        'A clan is a promise to the people who will be alive in fifty years, not to the ones complaining now',
      ],
      secrets:
        "[[city.black-weir|The Black Weir]] has been paying her in guaranteed sluice-time to drift the settlement upriver into its toll reach. The payment is not coin: it is a written promise of gate-hours, which is worth more and is deniable, and [[npc.ost-vennick|Ost Vennick]] holds the counterpart.\n\nThree other clans would cut her lines if they knew, so she has one season to make the move look like her own reading of the water. She also knows that a Sixteen-Knot cane raft carried the cargo that put a delta parasite into [[city.mediterranean-city|the Mediterranean City]], because the buyer wrote to her about it, and she burnt the letter.",
      combatRole: 'None. Her clan is four hundred people who will act on a word from her.',
      skills: ['skill.marsh-footing', 'skill.weather-eye', 'skill.brokerage', 'skill.crowd-turning', 'skill.trade-cant'],
      skillNotes:
        'Reads water better than anyone in the delta, which is what makes the deception possible: when she says the drift should go upriver, she can support it with thirty years of correct calls. A party wanting to break her needs the written gate-hour promise, because nobody will believe an argument about the water against Sabbe.',
      inventory: ['item.moor-stake'],
      inventoryNotes:
        'The clan\'s original moor stake, cut with owner marks going back four generations, which is the physical deed to the Sixteen-Knot berth. The Weir\'s written promise is not on her person: it is in the deed chest on [[district.floating-swamp-settlement-the-stone-lots|the Stone Lots]], filed as a supply agreement, in plain sight.',
      schedule: [
        row({ time: 'First light', place: 'The spine raft, [[district.floating-swamp-settlement-sixteen-knot|Sixteen-Knot]]', doing: 'Reads the water: colour, weed, the set of the current. Forty years of habit and the basis of her authority.' }),
        row({ time: 'Mid-morning', place: 'The comb', doing: 'Clan business, disputes, moorings, marriages. Anyone in the comb may interrupt her; outsiders may not.' }),
        row({ time: 'Afternoon', place: '[[landmark.the-moorstone|The Moorstone]] and the Compact hall', doing: 'Draw politics. Three days out of seven, and the only place outsiders can reach her.' }),
        row({ time: 'Dusk', place: 'The tail of the comb, facing downstream', doing: 'Sits alone and watches the [[district.floating-swamp-settlement-tail-lots|Tail]], which takes the water first when the Weir opens.' }),
        row({ time: 'Night', place: 'The spine raft', doing: 'Receives visitors nobody sees arrive, because at night the comb is only reachable by punt.' }),
      ],
      relationshipNotes:
        "[[npc.ost-vennick|Ost Vennick]] is her counterparty and she has never met him; the arrangement runs through a clerk and two letters. [[npc.gwill-ossekind|Gwill Ossekind]] cut the staves the Tail lots depend on and he is missing, which she has not publicly connected to anything. [[npc.sukhet-daral|Sukhet Daral]] bought a breeding pair off a Sixteen-Knot raft four years ago. [[npc.anthimos-vellani|Anthimos Vellani]] is treating three people because of a cargo she cleared.",
      dialogueNotes:
        'Hospitable, patient, and turns every question back into a question about water. She is never defensive and never explains. The only thing that shakes her is being asked, directly, what the Tail lots will do when the settlement is inside the toll reach, because she has an answer and does not like saying it.',
      sampleLines: [
        '"The water has been telling me to go up for three seasons. I am old, not deaf."',
        '"Cut my lines if you like. Then draw for a berth with four hundred people behind you and see what the Compact gives you."',
        '"The Tail always takes it first. That was true before I was born and it will be true when whoever comes after me is sitting here."',
      ],
      questNotes:
        'Sits under [[quest.slackwater-rights|Slackwater Rights]] and behind any Compact draw plot: her berth, her clan and her purchase are the settlement\'s biggest single lever. The written gate-hour promise in the deed chest is the physical evidence, filed openly as a supply agreement, which is a good lesson about where documents actually hide.',
      playerChoices: [
        'Find the gate-hour promise and show it to the three clans, which ends her and leaves the settlement without a reader of water before a flood season',
        'Help her sell the upriver drift honestly, which puts the whole town inside the Weir\'s toll reach with everyone\'s consent',
        'Break the arrangement at the Weir end instead, which leaves her authority intact and her clan exposed',
        'Warn the Tail lots what is coming, which is cheap, correct and makes an enemy of the largest clan in the delta',
        'Become her heir\'s backers, which is a long game and the only route that survives her',
      ],
      repReactions: [
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', standing: 'High', reaction: 'Formal hospitality on the spine raft and nothing said that a Compact clerk could not hear.' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'High', reaction: 'Goes very quiet, and then asks who sent them, and the answer decides the rest of the scene.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Trades openly. Three of her rafts run untaxed cargo and she considers it the clan\'s pension.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Interested, sceptical, and asks what a strike does to people who own their own rafts.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the sluice-time purchase and the one-season window. Added: the promise is written and filed openly in the Compact deed chest as a supply agreement, which gives players a findable document, and she knows about the cane-raft cargo that seeded the Mediterranean parasite.'),
    },
  }),

  E({
    id: 'npc.gwill-ossekind',
    type: 'npc',
    name: 'Gwill Ossekind',
    status: 'draft',
    summary: 'Channel-marker of the Drown who walked out to re-cut the low-water route and did not come back.',
    tags: ['floating-swamp', 'missing', 'navigation', 'investigation'],
    fields: {
      title: 'Channel-marker, lower delta',
      aliases: ['The stave-cutter', 'Ossekind of the Drowned Stand'],
      species: 'Human, delta-born, stilt-village family',
      age: '58 when last seen',
      pronouns: 'he/him',
      state: 'Missing',
      appearance:
        'Last seen in the usual: cane-cloth coat, bare legs to mid-thigh for wading, a punt pole, and a satchel of blank staves. A tall man who walked bent. Anyone in the delta could identify him at four hundred strides by the way he stood in a punt.',
      home: ['district.floating-swamp-settlement-the-stilt-hundred'],
      currentLocation: [REGION.theDrown],
      occupation: 'Channel-marker: cuts and maintains the notched staves that mark safe passage at low water',
      standing:
        'Officially a [[faction.moorstone-compact|Compact]] tradesman four seasons behind on his pay, and practically the reason a third of the delta can move in a dry autumn. Nobody thought about him at all until he stopped, which is how the delta treats infrastructure and people alike.',
      personality:
        'Reconstructed from the people who knew him: precise, solitary, unhurried, and famously incapable of being rushed. He refused to cut a stave he had not personally sounded three times. He disliked the Weir on principle and said so, at volume, in Lampside, more than once.',
      traits: ['precise', 'solitary', 'unhurried', 'openly hostile to the Weir', 'missed only in retrospect'],
      voice: 'Only in reported speech now, and everyone reports him the same way: flat, patient, and slightly amused',
      goals: [
        'Re-cut the low-water route before the autumn draw-down (unfinished)',
        'Get four seasons of back pay out of the Compact (unfinished)',
      ],
      fears: [
        'What he said in Lampside, twice, was that somebody would eventually decide an unpriced channel was worth closing',
      ],
      beliefs: [
        'A stave is a promise to a stranger, and a wrong stave is a killing',
        'The delta does not need a toll to be navigable, it needs somebody to walk it',
      ],
      secrets:
        "His notched staves are the only safe passage through the lower delta below a certain water level, and a third of them are now wrong or gone. Some have been moved rather than lost, which is a different fact and one nobody has yet stated out loud.\n\nWhoever finds him, or simply finds and re-cuts the staves, controls the eastern approach to [[city.black-weir|the Black Weir]] for as long as the water stays low. He kept his sounding book on him. He was last certainly seen at the southern edge of [[landmark.the-drowned-stand|the Drowned Stand]], where the route begins, and the Compact has not sent anyone to look because looking costs money and the route is a dry-season problem.",
      combatRole: 'Unknown. He carried a pole and a cutting knife and had no reputation for using either.',
      skills: ['skill.marsh-footing', 'skill.ground-read', 'skill.weather-eye', 'skill.the-far-walk'],
      skillNotes:
        'The [[skill.marsh-footing|Marsh Footing]] benchmark for the whole delta: forty years of soundings held in one head and one book. Re-cutting the route without him requires marsh footing at a high standard, three weeks, and a willingness to be wrong once, which in the lower delta means once.',
      inventory: [],
      inventoryNotes:
        'His punt was found, empty, upright and moored properly with a [[item.moor-stake|moor stake]] driven correctly, three miles from the Drowned Stand. That detail is the whole case: a man who drowns does not moor first.',
      schedule: [
        row({ time: 'Historical, first light', place: '[[district.floating-swamp-settlement-the-stilt-hundred|The Stilt Hundred]]', doing: 'Cut and shaped blank staves on his own platform, unhurried, most mornings for forty years.' }),
        row({ time: 'Historical, day', place: 'The lower delta channels', doing: 'Sounded and set. Three soundings per stave, no exceptions, which is why it took him a season to do a route.' }),
        row({ time: 'Historical, occasional evenings', place: '[[district.black-weir-lampside|Lampside]], Black Weir', doing: 'Drank, argued about the sluice book, and told anyone who would listen that the delta was navigable without a toll.' }),
        row({ time: 'Last known', place: 'Southern edge of [[landmark.the-drowned-stand|the Drowned Stand]]', doing: 'Beginning the re-cut. Seen by two cane-cutters at about the ninth hour.' }),
        row({ time: 'Now', place: 'Unknown', doing: 'Punt recovered moored and empty. Satchel, pole, book and man all absent.' }),
      ],
      relationshipNotes:
        "[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] depends on his staves for the Tail lots and has not publicly connected his disappearance to anything, which is itself notable. [[npc.ost-vennick|Ost Vennick]] runs the tolls Gwill spent years arguing were unnecessary. [[npc.dagren-hoyle|Dagren Hoyle]] was working a slack hour below the gates the week he vanished and will say so, unprompted, which either clears him or is very good instinct.",
      dialogueNotes:
        'He is missing, so the dialogue belongs to the people who owe him money and the people who found his punt. The Compact clerk is defensive about the back pay. The two cane-cutters who saw him last have been asked once and have added a detail each time since, which a careful party should notice.',
      sampleLines: [
        '"Three soundings or no notch. I have cut two thousand of them and I have never yet cut one for a man in a hurry." (reported, Lampside)',
        '"They sell the water. They cannot sell the bottom of it." (reported, twice, in front of Weir crews)',
      ],
      questNotes:
        'A missing-person case whose real prize is infrastructure: the eastern approach to the Black Weir at low water. It can resolve as accident, as murder, or as a man who walked away, and the seed deliberately does not decide. The moved staves are the strongest single clue and imply somebody who wanted the route wrong rather than gone.',
      playerChoices: [
        'Find and re-cut the route without him, which takes weeks and hands the party the eastern approach',
        'Find the sounding book, which is worth more than the man to everyone except the delta',
        'Establish who moved the staves, which points at the Weir and cannot be proved from the delta end',
        'Sell the route to [[faction.iron-sluice-company|the Iron Sluice Company]], which closes the last unpriced channel in the Drown for good',
        'Give the staves to the Tail lots outright, which is worthless in coin and makes four hundred people your allies',
      ],
      repReactions: [
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', standing: 'High', reaction: 'Opens his file, such as it is, and quietly hopes the party does not ask about four seasons of unpaid wages.' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'High', reaction: 'Unhelpful and entirely willing to buy the route once it is re-cut.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Names the two cane-cutters who saw him last and mentions that one of them has a new punt.' }),
      ],
      devNotes:
        PROPOSAL('The manifest fixes the disappearance and the wrong or missing staves. Added: the punt found correctly moored, which is the detail that makes it a case rather than a drowning, and that some staves were moved rather than lost.') +
        '\n\nDeliberately unresolved. Accident, murder by Weir interests, or a man who took his book and left are all supportable from the current evidence.',
    },
  }),

  /* ================================================================ */
  /* THE BLACK WEIR                                                    */
  /* ================================================================ */

  E({
    id: 'npc.ost-vennick',
    type: 'npc',
    name: 'Ost Vennick',
    status: 'draft',
    summary: 'Sluice-master of the Weir Gates, opening and closing the Drown\'s throat to a written schedule he sleeps beside.',
    tags: ['black-weir', 'power', 'water', 'iron-sluice-company'],
    fields: {
      title: 'Sluice-master, [[landmark.the-weir-gates|the Weir Gates]]',
      aliases: ['The Book', 'Vennick of the toll house'],
      species: 'Human, river-born',
      age: '48',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Wet to the knee at all hours, in a tarred coat that has been re-tarred so often it stands up on its own. Half-deaf from the gate works, like everyone on the basalt, and so he leans in and speaks too loudly in quiet rooms. A key ring that is the size of a dinner plate and is entirely ceremonial: the gates are worked by crews, not keys.',
      home: ['district.black-weir-the-toll-house'],
      currentLocation: ['district.black-weir-the-toll-house'],
      occupation: 'Sluice-master; writes and executes the gate-hour schedule',
      standing:
        'The most consequential office on the eastern river and one nobody outside the Drown could name. Ninety-six gate-hours a week are written in his book, thirty of them reserved to [[faction.iron-sluice-company|the Company]] before the counter opens. He is a salaried servant with the power to flood a district.',
      personality:
        'Correct, humourless, and genuinely burdened. He believes in the schedule the way other people believe in a law, which is what makes him both trustworthy and dangerous: he will not be bribed to move an hour and he will move one if the Company writes it down. The one time he opened outside the book he has not talked about since.',
      traits: ['correct', 'humourless', 'burdened', 'incorruptible in small things', 'obedient in large ones'],
      voice: 'Too loud, procedural, quotes hours and heads of water instead of answering',
      goals: [
        'Keep the schedule intact, because the schedule is the only thing standing between the delta and whoever pays most',
        'Get the eleventh sluice surveyed and re-gated, which he has requested four times',
        'Be replaced by somebody competent before the Company replaces him with somebody obedient',
      ],
      fears: [
        'Being ordered to do it again, in writing, and complying',
        'The book being read by anyone who understands what the reserved hours mean',
        'The flood post gaining another cut line with his name against it',
      ],
      beliefs: [
        'Water is not a commodity, it is a schedule, and a schedule can be honest',
        'Everything downstream is a consequence of something written upstream',
        'The Company sells hours because somebody would sell them anyway; better a book than an auction',
      ],
      secrets:
        "He can put a metre of water onto any settlement downstream within hours and has done it once, off the record, during a toll dispute. There is no entry for it in the book, which is itself the evidence: the gates moved and the schedule does not say so, and the [[landmark.the-flood-post|Flood Post]] below the gates has a cut line with no date beside it.\n\nHe sleeps in the same room as the book and knows exactly what that means. He also holds the counterpart of a written gate-hour promise made to [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] to bring a whole settlement inside the toll reach, which he executed as instructed and considers the worst thing he has ever signed.",
      combatRole: 'None. The gate crews are three watches of large, deaf, extremely loyal people.',
      skills: ['skill.bench-sense', 'skill.ledger-hand', 'skill.plain-letters', 'skill.weather-eye', 'skill.cable-and-drum'],
      skillNotes:
        'Reads a head of water the way a smith reads heat. He can tell a party what opening a given bay does downstream, to the hour and the foot, which makes him the single best source of information about [[mechanic.the-sluice-book|the Sluice Book]] and its consequences, and he will give it freely because he thinks the consequences ought to be known.',
      inventory: ['item.weirhook'],
      inventoryNotes:
        'The schedule book itself: ninety-six hours a week, four years of them, plus the reserved thirty and the marginalia about heads and heights. It never leaves the upper floor of the toll house, and he sleeps in the same room. A copy would be almost as damaging as the original and would take a night to make.',
      schedule: [
        row({ time: '04:00', place: 'The gate works walkway, [[district.black-weir-the-gate-works|Gate Works]]', doing: 'Walks all twenty-two bays before the first booked hour. Alone, every morning, in all weather.' }),
        row({ time: '06:00 to 18:00', place: 'The counter, [[district.black-weir-the-toll-house|Toll House]]', doing: 'Bookings, disputes and the schedule. Public, queued, and the only lawful way to buy an hour.' }),
        row({ time: 'Variable', place: 'The bays', doing: 'Executes openings personally when the head is above eight feet, which is his own rule and not the Company\'s.' }),
        row({ time: '19:00', place: '[[landmark.the-flood-post|The Flood Post]]', doing: 'Checks the cut lines against the book. Four minutes, daily, and the undated line is right in front of him each time.' }),
        row({ time: 'Night', place: 'Upper floor, Toll House', doing: 'Sleeps in the room with the book. There is one stair and one window.' }),
      ],
      relationshipNotes:
        "[[npc.dagren-hoyle|Dagren Hoyle]] sells the gap between his scheduled openings, which Ost knows and has not stopped, because stopping it would mean surveying [[landmark.the-eleventh-sluice|the eleventh sluice]] and the Company will not pay for a survey. [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is a promise he executed and regrets. [[npc.gwill-ossekind|Gwill Ossekind]] argued with him in Lampside twice and is now missing, which Ost has thought about a great deal and mentioned to nobody.",
      dialogueNotes:
        'Answers technical questions fully and political ones with the schedule. He is not evasive; he genuinely believes the book answers most questions, and it mostly does. The lever is the undated cut line on the flood post: ask about it directly and he stops talking entirely, which is the most information anyone has ever got out of him.',
      sampleLines: [
        '"Ninety-six hours. Thirty reserved. That leaves sixty-six for a river with four settlements on it, and you are asking me to be fair with the arithmetic somebody else wrote."',
        '"Open bay nine for an hour and the Tail lots are under a foot of water by dusk. That is not a threat, that is the number. I would tell it to anyone who asked."',
        '"There is a line on that post with no date against it. No, I will not."',
      ],
      questNotes:
        'The operating hand behind [[mechanic.the-sluice-book|the Sluice Book]] and the decision point of [[quest.clean-bills|Clean Bills]]: he will close the gates on a party\'s word and keep them closed, which saves the upriver towns and slowly starves the delta. His book is also the documentary evidence for the unlogged release and for the Sixteen-Knot arrangement.',
      playerChoices: [
        'Persuade him to close the gates during [[quest.clean-bills|Clean Bills]], which he will do, and hold, and hate',
        'Copy the schedule book overnight, which exposes the reserved hours, the undated release and the Sixteen-Knot promise at once',
        'Get the eleventh sluice surveyed at the party\'s own cost, which closes [[npc.dagren-hoyle|Dagren Hoyle]]\'s channel and earns Ost\'s permanent gratitude',
        'Buy hours purely to deny them to a rival, which is lawful, cheap and floods somebody',
        'Get him replaced, which the Company will do enthusiastically with somebody who takes instructions faster',
      ],
      repReactions: [
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'High', reaction: 'Correct, cooperative, and will not discuss reserved hours with them at all.' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'Hostile', reaction: 'Serves them at the counter exactly as anyone else, which infuriates the Company more than favouritism would.' }),
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', standing: 'High', reaction: 'Uncomfortable and honest: he tells them what an opening does downstream and does not soften it.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Will not take their bookings and does not report them either.' }),
      ],
      devNotes:
        PROPOSAL('The Black Weir is a name-only canon, so everything here stays inside the sluice-and-gantry sketch the city module already established. The manifest fixes the off-record release and that he sleeps beside the book. Added: the undated cut line on the flood post as physical evidence, and his refusal to survey the eleventh sluice, which is a Company cost decision rather than corruption.'),
    },
  }),

  E({
    id: 'npc.dagren-hoyle',
    type: 'npc',
    name: 'Dagren Hoyle',
    status: 'draft',
    summary: 'Gantry-crew boss on the black basalt, moving cargo the toll book never sees through a bay that has drowned two crews.',
    tags: ['black-weir', 'smuggling', 'labour', 'danger'],
    fields: {
      title: 'Gantry-crew boss, the Gantry Yards',
      aliases: ['Slack-hour Hoyle'],
      species: 'Human, river-born',
      age: '39',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Built like the work: forearms, shoulders and a broken nose set badly twice. Wears a crane-hand\'s harness all day out of habit. Missing the little and ring fingers of the left hand, taken by a sling under load, and he uses the stumps to point at things when he talks, which nobody has ever asked him to stop doing.',
      home: ['district.black-weir-the-gantry-yards'],
      currentLocation: ['district.black-weir-the-gantry-yards'],
      occupation: 'Gantry-crew boss; breaks out cargo that cannot lock, and runs a private channel',
      standing:
        'A working boss with about sixty crew and the best safety record on the bar, which is the joke everyone at the Weir makes and nobody laughs at, because his lawful crews are genuinely well run and his private ones have drowned twice.',
      personality:
        'Blunt, generous, honest about the odds to a degree that unsettles people. He does not recruit by lying and considers that the whole of his ethics. He also cannot stop, because the private channel is the only money in his life that is not the Company\'s, and he knows exactly how that sentence sounds.',
      traits: ['blunt', 'generous', 'honest about the odds', 'cannot stop', 'well liked'],
      voice: 'Shouts by default, laughs easily, and delivers the death toll in the same tone as the pay rate',
      goals: [
        'Get one clean season out of the disused bay and then stop',
        'Keep his lawful crews off the private runs, which he has managed so far',
        'Buy a gantry of his own, which is the only lawful exit he can see',
      ],
      fears: [
        'A third crew',
        'The bay being surveyed and re-gated, which would end the only money he has',
        'The transit seals being traced, because they are not his to give',
      ],
      beliefs: [
        'A man who tells you the odds has done everything the job allows',
        'The Company sells the water and calls the gap in it theft',
        'Nobody drowns because of a schedule; they drown because of a rope',
      ],
      secrets:
        "[[landmark.the-eleventh-sluice|The eleventh sluice]] is chained open and unsurveyed, and in the roughly forty minutes of slack between scheduled openings a small boat can be worked through it. That is his private channel. His last two crews drowned in it and he says so to every recruit, unprompted, before the pay is mentioned.\n\nHe pays in Weir transit seals that open gates upriver, and they are not his to issue: they come from a toll-house clerk who is skimming the blank stock. If the seals are ever traced the clerk hangs and Dagren hangs with him. [[npc.ost-vennick|Ost Vennick]] knows about the channel and has not closed it, because closing it means paying for a survey.",
      combatRole: 'Brawler with a [[item.weirhook|weirhook]] and no interest in a fair fight on a wet gantry.',
      skills: ['skill.marsh-footing', 'skill.cable-and-drum', 'skill.dead-weight', 'skill.set-and-brace', 'skill.fence-work'],
      skillNotes:
        'Reads the slack by ear: he can hear the head drop across the bay before it is visible, which is why he has personally survived what his crews have not. Any party running the channel needs [[skill.set-and-brace|Set and Brace]] in a moving boat, [[skill.cable-and-drum|Cable and Drum]] for the warping line, and to be out inside forty minutes.',
      inventory: ['item.weirhook', 'item.moor-stake'],
      inventoryNotes:
        'A hook, a harness, and a pouch of blank Weir transit seals which are the actual contraband: they open gates upriver, they are worth more than the cargo, and every one of them is a hanging offence for somebody in the toll house.',
      schedule: [
        row({ time: '05:00', place: '[[district.black-weir-the-gantry-yards|Gantry Yards]]', doing: 'Lawful crew call. Breaking out cargo that cannot lock, all day, competently.' }),
        row({ time: 'Slack hours, variable', place: '[[landmark.the-eleventh-sluice|The eleventh sluice]]', doing: 'The private channel, worked in the gap between scheduled openings, timed by ear.' }),
        row({ time: '13:00', place: 'The bar and the crane lines', doing: 'Actual gantry work. He still takes a sling himself, which is why sixty people follow him.' }),
        row({ time: '19:00', place: '[[district.black-weir-lampside|Lampside]]', doing: 'Drinks with crews and recruits in public, honestly, which is how a party will hear about the bay.' }),
        row({ time: '22:00', place: 'A room over a rope loft', doing: 'Alone, mostly. Two nights a month he meets the toll-house clerk here.' }),
      ],
      relationshipNotes:
        "[[npc.ost-vennick|Ost Vennick]] tolerates him for budgetary reasons, which Dagren finds funnier than it is. [[npc.perrine-orlaunt|Perrine Orlaunt]] runs the same trade a continent away in the [[city.sky-city|Sky City]] and the two have exchanged exactly one favour, which each considers outstanding. He was working a slack hour the week [[npc.gwill-ossekind|Gwill Ossekind]] vanished and volunteers this fact to anyone asking, which is either innocence or good instinct.",
      dialogueNotes:
        'Recruits in the open and states the death toll first. He is impossible to shock and mildly offended by squeamishness. Any party that asks about the seals gets a change of subject, and any party that asks a second time gets a straight answer and a request, because he has been looking for a way out of that arrangement for a year.',
      sampleLines: [
        '"Two crews. Nine people. I am telling you that before I tell you the pay, and if you want to walk away now I will buy the drink."',
        '"Forty minutes, and you do not count it, you listen for it. If you have to look at a glass you are already dead."',
        '"The seals are good. Every gate upriver honours them. Do not ask me where they come from and I will not have to decide whether to lie."',
      ],
      questNotes:
        'The smuggling route into [[quest.the-ullage-run|The Ullage Run]] and the operational answer to any Weir problem: he is how cargo, or people, move without a booked hour. The blank seal supply is a second thread that ends in the toll house and takes somebody down whichever way it is pulled.',
      playerChoices: [
        'Crew for him once, which is a genuine risk of death and pays in seals worth more than coin',
        'Buy the channel from him, which makes the party responsible for the next crew',
        'Trace the blank seals to the toll-house clerk, which hangs two people and closes the route',
        'Get the eleventh sluice surveyed and re-gated, which saves lives, ends his income and makes sixty people unemployed',
        'Take him upriver as a partner, which is the only ending where he stops',
      ],
      repReactions: [
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'High', reaction: 'Lawful gantry work only, and he will not mention the bay at all.' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', standing: 'Low', reaction: 'Offers them a run on the first evening and quotes the death toll before the fee.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Cuts the rate, takes bulk cargo, and starts asking whether they can move seals as well as goods.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', standing: 'High', reaction: 'Wary. He knows exactly what his private crews are and does not want it discussed by organisers.' }),
      ],
      devNotes:
        PROPOSAL('Kept inside the Black Weir sketch already established: basalt sluices, iron gantries, a chained-open bay. The manifest fixes the drowned crews, the honesty about odds and the transit-seal pay. Added: the seals come from a toll-house clerk skimming blank stock, which gives the route a second, human failure point.'),
    },
  }),

  /* ================================================================ */
  /* THE THIN CITIES: ORATH, ORUVAI, KETH VEYRA                        */
  /* Kept deliberately sparse. These three settlements are canon names  */
  /* with no established content, so their people are written from the  */
  /* outside only, and the gaps stay gaps.                              */
  /* ================================================================ */

  E({
    id: 'npc.kavel-uur',
    type: 'npc',
    name: 'Kavel Uur',
    status: 'draft',
    summary: 'Caravan-master out of Orath; the only fixed schedule across the Cinder Waste margin.',
    tags: ['orath', 'travel', 'thin-city', 'caravan'],
    fields: {
      title: 'Caravan-master, the waste margin',
      aliases: ['One-Hand Uur', 'The Schedule'],
      species: 'Human. Where he was born is not something he answers.',
      age: 'Somewhere past fifty, by his hands',
      pronouns: 'he/him',
      state: 'Alive',
      appearance:
        'Wind-cut, wrapped, and missing his right hand at the wrist, taken on the last run and replaced with a socketed cup he fits a hook or a cleat into depending on the job. Wears three water tallies where other people wear one. Does not sit with his back to open ground.',
      home: ['district.orath-caravan-ground'],
      currentLocation: ['district.orath-caravan-ground'],
      occupation: 'Caravan-master; runs the only scheduled crossing of the waste margin',
      standing:
        'Outside [[city.orath|Orath]] he is the schedule, which is a kind of authority nobody has granted him. Inside it, unknown. What he is to the town, and what the town pays him to carry, is an open question and should stay one until somebody decides what Orath is.',
      personality:
        'Level, incurious in conversation and extremely curious on paper. He counts. He counts who forms up, who arrives, who does not, and he has kept that count for nineteen years in a private tally nobody has asked to see. He is neither warm nor unfriendly; he treats a party as a load with opinions.',
      traits: ['level', 'counting', 'incurious out loud', 'careful with water', 'unhurried'],
      voice: 'Sparse, practical, measures in water rather than distance: four skins to the second marker',
      goals: [
        'Replace the hand he lost, which he means literally: he wants a crew member who can do what that hand did',
        'Keep the schedule, which is his entire standing',
      ],
      fears: [
        'A crossing that has to turn back, which he has never had to order',
        'The rains arriving early, when the [[creature.sandsleeper|sandsleeper]] burrow fields come up under the carts',
      ],
      beliefs: [
        'The waste does not kill people, arithmetic does: water, weight and days, and two of those are choices',
        'A count that nobody has asked to see is the safest thing a man can own',
      ],
      secrets:
        "He keeps a private count of who goes into the waste and who comes out, nineteen years deep, and the discrepancy is larger than anyone would guess. He has never shown it to anyone and has never been asked.\n\nA name he does not recognise has cleared cargo on his manifests twice, and he has never met the person it belongs to. That name is [[npc.ismet-radva|Ismet Radva]]. What [[city.orath|Orath]] pays him to carry, and whether the discrepancy in his count is the waste or the town, is deliberately unresolved.",
      combatRole: 'Caravan defence: a matchlock he loads slowly and well, and a preference for not being approached',
      skills: ['skill.the-far-walk', 'skill.yoke-and-tether', 'skill.weather-eye', 'skill.slow-match', 'skill.trade-cant'],
      skillNotes:
        'A [[skill.the-far-walk|Far Walk]] professional: cache discipline, water planning, and a turn-back rule he has never had to use. Anyone crossing the margin either travels with him or gambles, which makes him a hard gate on a whole region rather than a person with a quest.',
      inventory: ['item.assayers-tray'],
      inventoryNotes:
        '[[food.dew-melon|Dew melons]] carried as water rather than food, cache maps in his head, and the count, which is a bundle of tally sticks in a leather tube he wears under his coat.',
      schedule: [
        row({ time: 'Departure days, before light', place: '[[district.orath-caravan-ground|The Caravan Ground]]', doing: 'Forms up, weighs, counts and issues water. He will take anyone who can replace the hand he lost.' }),
        row({ time: 'On the road', place: '[[region.cinder-waste|The Cinder Waste]] margin', doing: 'Walking pace, marker to marker, water measured against days rather than thirst.' }),
        row({ time: 'Arrival days', place: 'The caravan ground, western end', doing: 'Counts in. This is when the discrepancy is recorded and when he is at his least talkative.' }),
        row({ time: 'Between runs', place: 'His yard', doing: 'Repairs, animals, and the tally sticks. He does not drink with his crews and does not explain why.' }),
      ],
      relationshipNotes:
        "[[npc.sahat-belek|Sahat Belek]] keeps the same kind of private count on the far side of the dry, and the two have drunk together twice and liked it. [[npc.ismet-radva|Ismet Radva]] is a name on two of his manifests and nothing else. Who in Orath he answers to is unestablished.",
      dialogueNotes:
        'Answers questions about the crossing precisely and questions about Orath with a shrug that is not evasion so much as disinterest. He will not be drawn on the town. Anyone who asks about the count directly gets a long silence and a change of subject, and asking twice ends the conversation for that season.',
      sampleLines: [
        '"Four skins to the second marker, six back. If you cannot carry six you do not come, and I am not going to argue about it in the dark."',
        '"I lost a hand on the last run. I am not looking for sympathy, I am looking for a hand."',
        '"People go in. I write down how many. People come out. I write down how many. That is all it is."',
      ],
      questNotes:
        'The travel gate for the waste margin and the fixed point [[quest.written-off|Written Off]] has to pass through, since the quest starts at Orath and guild law does not reach it. His count is a hook with no answer attached yet, which is intentional.',
      playerChoices: [
        'Take the hand: crew for him properly, which buys a permanent route across the margin',
        'Ask to see the count, which he refuses, and decide whether to steal it',
        'Break his monopoly by scouting an alternative crossing, which is a genuine multi-week survival job',
        'Find out what Orath actually pays him to carry, which the seed does not answer',
      ],
      repReactions: [
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', standing: 'High', reaction: 'Carries them at cost. He has run their sealed bags across the margin for years because nobody else will.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Takes their freight without comment and charges the same as everyone else.' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', standing: 'High', reaction: 'Refuses passage to bonded columns. He has never explained the rule and has never broken it.' }),
      ],
      devNotes:
        PROPOSAL('Kept deliberately thin, since Orath is a name-only canon. Everything here is about the crossing, not the town. The manifest fixes the lost hand, the standing offer and the private count. Added: the count has a discrepancy and an Ismet Radva entry, which are hooks rather than answers.') +
        '\n\nDo not invent Orath backstory around him. If a later author defines the town, his employer slot is empty and waiting.',
    },
  }),

  E({
    id: 'npc.anwe-halduri',
    type: 'npc',
    name: 'Anwe Halduri',
    status: 'draft',
    summary: 'Highland factor from Oruvai: four visits a year to the karst markets, paid in advance, never a night\'s stay.',
    tags: ['oruvai', 'trade', 'thin-city', 'mystery'],
    fields: {
      title: 'Factor of Oruvai (title as she gives it)',
      aliases: ['The four days'],
      species: 'Human, highland',
      age: TBD('Nobody who has dealt with her has been able to agree on it. Estimates from the karst reeves range over twenty years.'),
      pronouns: 'she/her',
      state: 'Alive',
      appearance:
        'Highland wool, good boots, and a seal case on a chain that karst reeves honour without being able to read. Weathered, unhurried, and observed only in daylight: nobody outside Oruvai has ever seen her after dusk, because she is always back above the [[district.oruvai-the-shut-gate|Shut Gate]] before it closes.',
      home: [CITY.oruvai],
      currentLocation: ['district.oruvai-the-stone-market'],
      occupation: 'Factor: buys and sells on four fixed market days a year',
      standing:
        'Unknown at home and considerable abroad. Karst reeves honour her seal, settle her contracts and extend her credit she never uses, and not one of them can say whose authority the seal represents. That is the entire point of the entry and it should not be resolved here.',
      personality:
        'Courteous, brief, and entirely closed. She answers trade questions in full and everything else with a form of words she has clearly used before. She is not cold; she declines warmly, which is much harder to argue with.',
      traits: ['courteous', 'closed', 'punctual', 'pays in advance', 'declines warmly'],
      voice: 'Formal highland speech, slightly archaic to karst ears, and completely consistent from one year to the next',
      goals: [
        'Complete four market days a year and be back above the gate before dusk on each of them',
        'Whatever she is buying: the reeves record cut stone paid out and tools, salt and cudmother starters going up, and nobody has ever totalled it',
      ],
      fears: TBD('She has never displayed one. The only observed reaction is that she leaves early if a market day runs late, which reads as schedule rather than fear.'),
      beliefs: [
        'A contract paid in advance is a contract nobody has to trust',
        'An invitation is a courtesy and refusing one is also a courtesy',
      ],
      secrets:
        "She carries a seal that karst reeves honour without being able to read, and who issues it is an open question. She pays in advance, in cut stone, and refuses every invitation to travel back with her.\n\nWhat is established: she has never stayed a night below the [[district.oruvai-the-shut-gate|Shut Gate]], she has never brought a servant, and she has never been observed to negotiate. Everything past that is inference. Do not resolve it here.",
      combatRole: TBD('Unobserved. She travels the karst road alone four times a year, which either means something or means the road is safer than anyone thinks.'),
      skills: ['skill.trade-cant', 'skill.plain-letters', 'skill.brokerage', 'skill.the-far-walk'],
      skillNotes:
        'Literate, numerate, and a competent enough traveller to walk the highland road unescorted four times a year, which is the only physical fact anyone can vouch for. Whether she has any other capability is unrecorded.',
      inventory: [],
      inventoryNotes:
        'A seal case, a purse of cut stone, a tally book she writes in a hand no karst clerk recognises, and a walking staff. She carries no trade goods on the way down and a loaded pack animal on the way up.',
      schedule: [
        row({ time: 'Four fixed days a year, morning', place: '[[district.oruvai-the-stone-market|The Market Ground]]', doing: 'Buys. Pays in advance in cut stone and does not haggle, which the karst factors find unnerving and profitable.' }),
        row({ time: 'Those days, midday', place: 'The market ground', doing: 'Sells. Cut stone, worked slate, and one or two things nobody in the karst can name a source for.' }),
        row({ time: 'Those days, mid-afternoon', place: 'The road up to [[district.oruvai-the-shut-gate|the Shut Gate]]', doing: 'Leaves. Always before dusk, always alone, always with the animal loaded.' }),
        row({ time: 'The other 361 days', place: 'Above the gate', doing: 'Unobserved by any outside account. Nobody has followed her up and come back with anything worth writing down.' }),
      ],
      relationshipNotes:
        "[[npc.ossane-gorbea|Ossane Gorbea]] takes her cut stone four times a year and finds it interesting that she has never once asked for mirror-hours. [[npc.wessel-ondriek|Wessel Ondriek]] wants a licensed route to Oruvai and she is the only door anyone can name, which makes her the object of [[quest.open-account|Open Account]] without her having agreed to anything.",
      dialogueNotes:
        'Trade conversation is easy, pleasant and productive. Every other subject is met with the same three or four sentences, which a returning party will eventually notice are word for word identical to last year. She does not lie. She declines, and she does it the same way every time.',
      sampleLines: [
        '"Paid before the goods are moved. If the goods are not moved the payment stands, which is my risk and not yours."',
        '"I am obliged to you for the invitation. The gate shuts at dusk."',
        '"I am not able to say. I am not being difficult with you, I am simply not able to say."',
      ],
      questNotes:
        'The only door into Oruvai currently in play, and therefore the hinge of [[quest.open-account|Open Account]], which is explicitly a quest whose open question is what Oruvai will actually trade. She should remain an obstacle rather than an informant.',
      playerChoices: [
        'Follow her up the road, which is a three-day highland journey and the point at which somebody has to decide what Oruvai is',
        'Trace the seal instead of the woman, through the karst reeves\' records, which is safer and slower',
        'Broker a licensed route through her rather than around her, which is what [[quest.open-account|Open Account]] is for',
        'Undercut her at the market, which is easy and closes the only channel anyone has',
      ],
      repReactions: [
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', standing: 'High', reaction: 'Trades willingly and at good rates. She has dealt with reeves for years and knows the forms.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Politely refuses to discuss a licensed route and does not refuse to trade.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Declines, warmly, and pays in advance anyway.' }),
      ],
      devNotes:
        PROPOSAL('Kept deliberately thin: Oruvai is a name-only canon and this entry commits to nothing above the Shut Gate. The manifest fixes the four visits, the unreadable seal, the advance payment in cut stone and the refused invitations. Everything else is recorded as unobserved rather than invented.') +
        '\n\nWhoever issues the seal is the single most productive unanswered question in the highland.',
    },
  }),

  E({
    id: 'npc.ismet-radva',
    type: 'npc',
    name: 'Ismet Radva',
    status: 'draft',
    summary: 'A Keth Veyra name on three manifests. Nobody has met the same person twice.',
    tags: ['keth-veyra', 'unknown', 'thin-city', 'investigation'],
    fields: {
      title: 'A name that clears cargo',
      aliases: ['Radva', 'The third manifest'],
      species: TBD('Unrecorded. The Manifest House records names and does not check one.'),
      age: TBD('Two clerks who claim to have seen the bearer give descriptions twenty years apart.'),
      pronouns: 'Unrecorded. The three manifests use they/them, he/him and no pronoun at all.',
      state: 'Unknown',
      appearance:
        'There is no consistent description. A [[district.keth-veyra-the-fog-quays|Fog Quays]] clerk remembers someone tall and southern; a [[district.keth-veyra-the-manifest-house|Manifest House]] clerk remembers a small older woman; the third entry was cleared by a runner who never saw the bearer at all. In a port worked by ear in the mornings, this is not as strange as it sounds, which is exactly what makes it hard to pursue.',
      home: [CITY.kethVeyra],
      currentLocation: TBD('Unknown, and possibly not a question with an answer. Two cargoes cleared under this name in one week at ports eleven days apart.'),
      occupation: 'Clears cargo. Nothing further is established.',
      standing:
        'None recorded and none required: in [[city.keth-veyra|Keth Veyra]] a manifest name is honoured without being checked, which is either admirable openness or a sign that the interesting freight is not in the book.',
      personality: TBD('There is no evidence that a personality is the right unit of analysis here. One person, a shared office, or a dead credential still being used are all consistent with the record.'),
      traits: ['unverified', 'punctual on paper', 'never twice the same'],
      voice: TBD('Three clerks, three accounts, no agreement. One of them is certain the bearer did not speak at all.'),
      goals: TBD('Unknown. The cargoes themselves are unremarkable: cane, salt fish, bell bronze and one consignment of sealed apothecary ware.'),
      fears: TBD('There is nobody established to have a fear. That is the entry.'),
      beliefs: TBD('Unrecorded, and dependent on whether the name belongs to a person at all.'),
      secrets:
        "Two cargoes cleared under this name in the same week at ports eleven days apart. That is the whole of the established fact and it is enough to open an investigation.\n\nThe possibilities are one person with a route nobody has mapped, a shared office credential used by several people, or a dead credential still being worked by whoever inherited the paper. [[npc.perrine-orlaunt|Perrine Orlaunt]] says one of the three manifests lists a Sky City descent she is certain she ran, which is either the best lead in the file or a coincidence. [[npc.kavel-uur|Kavel Uur]] has the name on two of his own manifests and has never met the bearer.",
      combatRole: TBD('No basis for an answer. Do not assign one until the investigation resolves what this is.'),
      skills: [],
      skillNotes:
        'Nothing can honestly be listed. What the file supports is that whoever uses the name understands clearing procedure in at least two ports and has never once been late with a form, which suggests a clerk rather than a smuggler.',
      inventory: [],
      inventoryNotes:
        'Three manifest entries in the [[district.keth-veyra-the-manifest-house|Manifest House]] ledgers, readable by anyone for a small fee. Comparing them across seasons is the entire opening of the investigation and costs less than a meal.',
      schedule: [
        row({ time: 'Recorded', place: '[[district.keth-veyra-the-manifest-house|The Manifest House]]', doing: 'Three clearances across two seasons, all correctly filed, all within the first hour of opening.' }),
        row({ time: 'Recorded', place: 'A port eleven days distant', doing: 'A fourth clearance in the same week as the second, which is the impossibility the file rests on.' }),
        row({ time: 'Unrecorded', place: 'Everything else', doing: 'Everything else. No outside account places the bearer anywhere between clearances.' }),
      ],
      relationshipNotes:
        "[[npc.kavel-uur|Kavel Uur]] and [[npc.perrine-orlaunt|Perrine Orlaunt]] both have the name in their own paperwork and neither has met a person attached to it. Nobody else in Keth Veyra has been named by any outside account, which is a fact about the port rather than about this entry.",
      dialogueNotes:
        'There is nobody to talk to. The dialogue in this thread belongs to clerks, and the interesting thing is that they are helpful, unhurried and completely unbothered: the Manifest House will let anyone read a manifest, which either means nothing is hidden or the hiding is done elsewhere.',
      sampleLines: [],
      questNotes:
        'A whole investigation with a very cheap opening move: read three ledger entries. Where it goes depends on what Keth Veyra turns out to be, which is not established, so the thread should be kept alive and unresolved until somebody defines the port.',
      playerChoices: [
        'Compare the three manifests across seasons, which costs a fee and opens everything',
        'Wait at the Manifest House for a fourth clearance, which requires knowing when, which nobody does',
        'Follow the cargo instead of the name, which is the only approach that does not depend on a person existing',
        'Use the name yourselves, which works, because nobody checks, and puts the party inside the mystery rather than outside it',
      ],
      repReactions: [
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', standing: 'High', reaction: 'Will confirm that letters have been sent to the name and that none has ever been collected.' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', standing: 'High', reaction: 'Has heard the name, uses it occasionally, and cannot say who started.' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', standing: 'High', reaction: 'Treats the discrepancy as a clearing-fraud matter and will fund an investigation for its own reasons.' }),
      ],
      devNotes:
        PROPOSAL('Kept deliberately thin: Keth Veyra is a name-only canon. The manifest fixes the three entries, the eleven-day impossibility and the three explanations. Added: two cross-links, to Kavel Uur\'s manifests and Perrine Orlaunt\'s descent, so the thread can be picked up from three cities rather than one.') +
        '\n\nDo not resolve which of the three explanations is true. Whichever a later author picks should also decide what Keth Veyra is.',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* Home cities ---------------------------------------------------- */
  R('npc.wessel-ondriek', 'located_in', CITY.gildedAscent),
  R('npc.doret-halvane', 'located_in', CITY.gildedAscent),
  R('npc.brask-vellmar', 'located_in', CITY.gildedAscent),
  R('npc.ilke-samarost', 'located_in', CITY.gildedAscent, 'buried outside the eleventh terrace, at Salt Office expense'),
  R('npc.cesille-vaudry', 'located_in', CITY.skyCity),
  R('npc.aubran-ferrieu', 'located_in', CITY.skyCity, 'ground level only; barred from the lattice'),
  R('npc.perrine-orlaunt', 'located_in', CITY.skyCity),
  R('npc.melitta-aspri', 'located_in', CITY.mediterranean),
  R('npc.anthimos-vellani', 'located_in', CITY.mediterranean),
  R('npc.aune-mustsalu', 'located_in', CITY.treeCity),
  R('npc.saarik-rauda', 'located_in', CITY.treeCity),
  R('npc.vetla-torvik', 'located_in', REGION.greatwood, 'outside the palisade, camp moved weekly'),
  R('npc.iratze-zubiate', 'located_in', CITY.caveAgrarian),
  R('npc.bedel-lehun', 'located_in', CITY.caveAgrarian),
  R('npc.ossane-gorbea', 'located_in', CITY.caveAgrarian),
  R('npc.tazrit-nourem', 'located_in', CITY.siftingCity),
  R('npc.sahat-belek', 'located_in', REGION.whitePans, 'eight days out of every twelve in the far white'),
  R('npc.ysme-drannik', 'located_in', CITY.magicCity),
  R('npc.toval-cherek', 'located_in', CITY.magicCity),
  R('npc.halvo-sarn', 'located_in', CITY.magicCity),
  R('npc.aylun-torgai', 'located_in', CITY.arenaCity),
  R('npc.berke-chagra', 'located_in', CITY.arenaCity),
  R('npc.sukhet-daral', 'located_in', CITY.arenaCity),
  R('npc.sabbe-sixteen-knot', 'located_in', CITY.floatingSwamp),
  R('npc.gwill-ossekind', 'located_in', REGION.theDrown, 'last seen at the southern edge of the Drowned Stand'),
  R('npc.ost-vennick', 'located_in', CITY.blackWeir),
  R('npc.dagren-hoyle', 'located_in', CITY.blackWeir),
  R('npc.kavel-uur', 'located_in', CITY.orath),
  R('npc.anwe-halduri', 'located_in', CITY.oruvai),
  R('npc.ismet-radva', 'located_in', CITY.kethVeyra, 'a name on three manifests; the person is unlocated'),

  /* Districts not already covered by the city modules --------------- */
  R('npc.aune-mustsalu', 'located_in', 'district.tree-city-crown-galleries', 'Marshalcy offices and the signal crown'),
  R('npc.ossane-gorbea', 'located_in', 'district.cave-agrarian-city-sunwell-terraces', 'the tithe office'),
  R('npc.tazrit-nourem', 'located_in', 'district.sifting-city-the-tower-line', 'lives at the fifth tower head'),
  R('npc.sabbe-sixteen-knot', 'located_in', 'district.floating-swamp-settlement-sixteen-knot', 'sleeps on the spine raft'),
  R('npc.ost-vennick', 'located_in', 'district.black-weir-the-toll-house', 'sleeps in the room with the schedule book'),
  R('npc.vetla-torvik', 'related_to', 'district.tree-city-underroot', 'her sister is on the timber-yard ledger'),
  R('npc.sahat-belek', 'related_to', 'district.sifting-city-the-lee', 'his daughter lives in the Lee'),
  R('npc.ilke-samarost', 'related_to', 'district.gilded-ascent-under-stair', 'her final audit is plastered into the wall of her old lodging'),
  R('npc.brask-vellmar', 'related_to', 'landmark.the-stopped-bell', 'the No. 3 main runs from the drum house beneath it'),
  R('npc.melitta-aspri', 'related_to', 'landmark.the-tide-orrery', 'keeps the error book and takes the readings personally'),
  R('npc.toval-cherek', 'related_to', 'landmark.the-ninth-chain', 'learned the trade making it at twenty-nine'),
  R('npc.aylun-torgai', 'related_to', 'landmark.the-sunken-ring', 'sixteen sanctioned wins on the sand'),
  R('npc.dagren-hoyle', 'related_to', 'landmark.the-eleventh-sluice', 'the private channel, worked in the slack hour'),
  R('npc.ost-vennick', 'related_to', 'landmark.the-flood-post', 'checks the cut lines daily; one of them has no date'),
  R('npc.sabbe-sixteen-knot', 'related_to', 'landmark.the-moorstone', 'her clan holds a deed-plate nine drifts old'),
  R('npc.gwill-ossekind', 'related_to', 'landmark.the-drowned-stand', 'his notched staves begin at the southern edge'),
  R('npc.cesille-vaudry', 'related_to', 'landmark.the-mooring-crown', 'Warden; walks the eye at five each morning'),
  R('npc.aubran-ferrieu', 'related_to', 'landmark.the-sixth-mast', 'holds the true tonnage sheets from the week it came down'),
  R('npc.iratze-zubiate', 'related_to', 'landmark.sunwell-shaft', 'two hundred mirrors, aligned by hand, daily'),
  R('npc.ysme-drannik', 'related_to', 'landmark.the-bound-fault', 'tested the chains the week before the slippage'),

  /* Factions -------------------------------------------------------- */
  R('npc.wessel-ondriek', 'leads', 'faction.concord-of-weights', 'Chief Factor; chairs the rate room'),
  R('npc.ilke-samarost', 'member_of', 'faction.concord-of-weights', 'Salt Office ledger-clerk, second window'),
  R('npc.doret-halvane', 'member_of', 'faction.low-tally', 'books the inspections that open bonded doors'),
  R('npc.brask-vellmar', 'member_of', 'faction.standing-hour', 'yard membership he has never used'),
  R('npc.perrine-orlaunt', 'member_of', 'faction.low-tally', 'unlogged descents off the ring'),
  R('npc.aubran-ferrieu', 'rival_of', 'faction.mooring-assize', 'stripped registrar; wants a hearing, not money'),
  R('npc.anthimos-vellani', 'member_of', 'faction.conduit-college', 'licensed physician, harbour and crew work'),
  R('npc.aune-mustsalu', 'leads', 'faction.pitchguard', 'Bole-Marshal; signs the conscription rolls'),
  R('npc.saarik-rauda', 'member_of', 'faction.pitchguard', 'gate-sergeant of the ninth gallery'),
  R('npc.iratze-zubiate', 'member_of', 'faction.mirror-assembly', 'mirrorwright on the guild roll'),
  R('npc.ossane-gorbea', 'leads', 'faction.mirror-assembly', 'light-tithe reeve; the seal that issues hours'),
  R('npc.tazrit-nourem', 'member_of', 'faction.pale-assay', 'sift-mistress of three licensed towers'),
  R('npc.tazrit-nourem', 'rival_of', 'faction.pale-assay', 'keeps a parallel grading record four years deep'),
  R('npc.ysme-drannik', 'member_of', 'faction.fetterhouse', 'licensed ward-keeper; now held without charge'),
  R('npc.toval-cherek', 'member_of', 'faction.fetterhouse', 'chain-smith on the replacement-link contract'),
  R('npc.halvo-sarn', 'member_of', 'faction.fetterhouse', 'permit clerk, ward-office second window'),
  R('npc.halvo-sarn', 'infiltrates', 'faction.fetterhouse', 'backdated permits make him the point of failure for every prosecution', true),
  R('npc.aylun-torgai', 'member_of', 'faction.red-writ', 'contracted fighter, sixteen wins, manumission voided'),
  R('npc.berke-chagra', 'member_of', 'faction.red-writ', 'holds paper on half the fighters and most of the stewards'),
  R('npc.sukhet-daral', 'member_of', 'faction.red-writ', 'beast-keeper of the under-stables'),
  R('npc.sabbe-sixteen-knot', 'member_of', 'faction.moorstone-compact', 'largest single voice in the raft-lot draw'),
  R('npc.gwill-ossekind', 'member_of', 'faction.moorstone-compact', 'channel-marker, four seasons behind on his pay'),
  R('npc.ost-vennick', 'member_of', 'faction.iron-sluice-company', 'sluice-master; writes the gate-hour schedule'),
  R('npc.dagren-hoyle', 'member_of', 'faction.iron-sluice-company', 'gantry-crew boss on the black basalt'),
  R('npc.dagren-hoyle', 'secretly_cooperates_with', 'faction.low-tally', 'the eleventh sluice channel, paid in transit seals', true),
  R('npc.kavel-uur', 'trades_with', 'faction.bonewax-post', 'carries their sealed bags across the waste margin'),
  R('npc.anwe-halduri', 'trades_with', 'faction.mirror-assembly', 'four market days a year, paid in advance in cut stone'),
  R('npc.berke-chagra', 'trades_with', 'faction.bondwrights-hall', 'moves bond paper respectably where he can'),
  R('npc.saarik-rauda', 'secretly_cooperates_with', 'faction.bondwrights-hall', 'levy-dodgers sold downriver through the timber yards', true),
  R('npc.melitta-aspri', 'member_of', 'faction.conduit-college', 'calibrator; the College treats it as maintenance work'),

  /* NPC to NPC ------------------------------------------------------ */
  R('npc.cesille-vaudry', 'owes_debt_to', 'npc.wessel-ondriek', 'counterweight leases against four fifths of the Ascent reserve'),
  R('npc.wessel-ondriek', 'secretly_cooperates_with', 'npc.cesille-vaudry', 'neither can afford the other to be audited', true),
  R('npc.wessel-ondriek', 'related_to', 'npc.brask-vellmar', 'a stopped grain lift moves the clearing rate within three days'),
  R('npc.wessel-ondriek', 'related_to', 'npc.melitta-aspri', 'Ascent freight paper is priced against tables that are wrong'),
  R('npc.wessel-ondriek', 'rival_of', 'npc.ost-vennick', 'everything the Ascent ships east passes a toll it cannot price'),
  R('npc.ilke-samarost', 'rival_of', 'npc.wessel-ondriek', 'his house is named among the eleven-day salt buyers', true),
  R('npc.doret-halvane', 'secretly_cooperates_with', 'npc.brask-vellmar', 'inspections he signs and she conducts alone', true),
  R('npc.brask-vellmar', 'owes_debt_to', 'npc.doret-halvane', 'she paid the fine that saved his ticket after the re-signing'),
  R('npc.doret-halvane', 'related_to', 'npc.ilke-samarost', 'found her the Under-Stair lodging and can point at the arch'),
  R('npc.doret-halvane', 'related_to', 'npc.tazrit-nourem', "holds her brother's indenture in the Assay Row strongroom"),
  R('npc.doret-halvane', 'allied_with', 'npc.perrine-orlaunt', 'two ends of the same unlogged route, never met in daylight'),
  R('npc.aubran-ferrieu', 'rival_of', 'npc.cesille-vaudry', 'the sheets name an office she now holds'),
  R('npc.perrine-orlaunt', 'allied_with', 'npc.aubran-ferrieu', 'brings him the shelf-foot post and takes nothing for it'),
  R('npc.cesille-vaudry', 'secretly_cooperates_with', 'npc.perrine-orlaunt', 'funds unlogged descents rather than sign eviction lists', true),
  R('npc.perrine-orlaunt', 'allied_with', 'npc.dagren-hoyle', 'one exchanged favour, both consider it outstanding'),
  R('npc.melitta-aspri', 'allied_with', 'npc.anthimos-vellani', 'each knows what the other is carrying and neither has said so'),
  R('npc.anthimos-vellani', 'related_to', 'npc.sabbe-sixteen-knot', 'the cane raft that carried the parasite was a Sixteen-Knot lot', true),
  R('npc.anthimos-vellani', 'related_to', 'npc.iratze-zubiate', 'two letters about fever clay, one reply'),
  R('npc.aune-mustsalu', 'rival_of', 'npc.saarik-rauda', 'his tally prices her city; her forged rolls are what he could sell'),
  R('npc.aune-mustsalu', 'secretly_cooperates_with', 'npc.vetla-torvik', 'thirty children left along a run that passes no gate', true),
  R('npc.vetla-torvik', 'rival_of', 'npc.saarik-rauda', 'deserted from his gate; he takes it personally'),
  R('npc.saarik-rauda', 'smuggles_with', 'npc.berke-chagra', 'levy-dodgers downriver through a factor neither has met', true),
  R('npc.vetla-torvik', 'related_to', 'npc.berke-chagra', "her sister's timber-yard ledger was sold downriver at least once"),
  R('npc.ossane-gorbea', 'rival_of', 'npc.iratze-zubiate', 'the reeve issues the hours the mirrorwright is quietly stealing'),
  R('npc.iratze-zubiate', 'secretly_cooperates_with', 'npc.bedel-lehun', 'a half-light strain and a skimmed allocation covering for each other', true),
  R('npc.bedel-lehun', 'owes_debt_to', 'npc.ossane-gorbea', "the fourth terrace's allocation is renewed at her seal"),
  R('npc.ossane-gorbea', 'owes_debt_to', 'npc.wessel-ondriek', "Ascent advances against next year's light allocation"),
  R('npc.anwe-halduri', 'trades_with', 'npc.ossane-gorbea', 'cut stone four times a year, and never a request for hours'),
  R('npc.anwe-halduri', 'related_to', 'npc.wessel-ondriek', 'the only named door into Oruvai, and he wants a licensed route'),
  R('npc.tazrit-nourem', 'related_to', 'npc.sahat-belek', 'hires him for far-white work and does not ask what he finds'),
  R('npc.toval-cherek', 'owes_debt_to', 'npc.tazrit-nourem', 'two seasons of alloy on credit against a quota he cannot make'),
  R('npc.tazrit-nourem', 'trades_with', 'npc.berke-chagra', 'bond paper by correspondence; they have never met'),
  R('npc.sahat-belek', 'related_to', 'npc.halvo-sarn', 'his permit numbers are burnt into sixty-one crates in the deep pans', true),
  R('npc.sahat-belek', 'related_to', 'npc.kavel-uur', 'the same private count of who goes into the dry and who comes out'),
  R('npc.ysme-drannik', 'related_to', 'npc.halvo-sarn', 'the name she wants struck appears in his private index', true),
  R('npc.ysme-drannik', 'related_to', 'npc.toval-cherek', 'two dead chains and a stamp record, and neither has said it aloud'),
  R('npc.toval-cherek', 'rival_of', 'npc.halvo-sarn', 'refused a backdated inspection and was not forgiven for it'),
  R('npc.aylun-torgai', 'owes_debt_to', 'npc.berke-chagra', 'he does not hold her bond, he holds her water ration'),
  R('npc.aylun-torgai', 'allied_with', 'npc.sukhet-daral', 'cage keys for silence about the walled sections'),
  R('npc.sukhet-daral', 'rival_of', 'npc.berke-chagra', 'a flooded card is worth more to the book than to the man who feeds it'),
  R('npc.sukhet-daral', 'related_to', 'npc.sabbe-sixteen-knot', 'her clan sold him the breeding pair four years ago', true),
  R('npc.sabbe-sixteen-knot', 'secretly_cooperates_with', 'npc.ost-vennick', 'guaranteed gate-hours for a drift into the toll reach', true),
  R('npc.gwill-ossekind', 'rival_of', 'npc.ost-vennick', 'argued in Lampside that the delta needs no toll to be navigable'),
  R('npc.gwill-ossekind', 'related_to', 'npc.sabbe-sixteen-knot', 'his staves are why the Tail lots can move at low water'),
  R('npc.dagren-hoyle', 'rival_of', 'npc.ost-vennick', 'one sells the schedule, the other sells the gap in it'),
  R('npc.dagren-hoyle', 'related_to', 'npc.gwill-ossekind', 'was working a slack hour the week the channel-marker vanished'),
  R('npc.kavel-uur', 'related_to', 'npc.ismet-radva', 'a name that has cleared cargo on his manifests twice'),
  R('npc.perrine-orlaunt', 'related_to', 'npc.ismet-radva', 'one manifest lists a descent she is certain she ran', true),
  R('npc.brask-vellmar', 'related_to', 'npc.aubran-ferrieu', 'the same man four years apart, and they have never met'),
  R('npc.halvo-sarn', 'related_to', 'npc.doret-halvane', 'both sell an hour inside a lawful door, in different cities'),

  /* Quests ---------------------------------------------------------- */
  R('npc.melitta-aspri', 'involves', 'quest.four-minutes-fast', 'the error book, or an independent instrument'),
  R('npc.aubran-ferrieu', 'involves', 'quest.the-sixteenth-mast', 'unregistered mass is what the Sixth Mast collapse was made of'),
  R('npc.cesille-vaudry', 'involves', 'quest.the-second-ledger', 'the true tonnage figures are the second book'),
  R('npc.ossane-gorbea', 'involves', 'quest.who-gets-the-light', 'she will enact whatever allocation is brokered'),
  R('npc.aune-mustsalu', 'gives_quest', 'quest.the-felling-order', 'eleven days, and she will give the word regardless'),
  R('npc.tazrit-nourem', 'involves', 'quest.pan-fever', 'her parallel grading record is the documentary key'),
  R('npc.sahat-belek', 'involves', 'quest.the-chalk-that-lies', 'sixty-one crates, off route, with permit numbers on them'),
  R('npc.ost-vennick', 'involves', 'quest.clean-bills', 'he will close the gates on a word and keep them closed'),
  R('npc.dagren-hoyle', 'involves', 'quest.the-ullage-run', 'the only way past the gates that is not a booked hour'),
  R('npc.sabbe-sixteen-knot', 'involves', 'quest.slackwater-rights', 'the berth, the clan and the purchase'),
  R('npc.anwe-halduri', 'involves', 'quest.open-account', 'the only named door into Oruvai'),
  R('npc.wessel-ondriek', 'involves', 'quest.the-scar-concession', 'bidding with money he does not have'),
  R('npc.aylun-torgai', 'involves', 'quest.the-indenture-column', 'a fighter who can name eleven fixed bouts and a column of people'),
]
