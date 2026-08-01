/**
 * Religions, cultures, philosophies and traditions.
 *
 * Every entry here answers a `cultures:` question left open in a city module.
 * Each one is grounded in a material condition first and a doctrine second:
 * what these people can grow, what they may burn, and what they are allowed to
 * do with a body. The disposal of the dead is the load-bearing field, because
 * it is the one problem geography answers differently in every settlement.
 *
 * All of it is proposal. The brief established no faith of any kind.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE LONG ACCOUNT — the philosophy that grew out of credit         */
  /* ================================================================ */

  E({
    id: 'religion.the-long-account',
    type: 'religion',
    name: 'The Long Account',
    aka: ['The Account', 'the ledger creed'],
    status: 'draft',
    summary: 'A creditor ethics: every act is an entry, nothing is cancelled, and a life is closed by reading the book aloud.',
    tags: ['philosophy', 'ascent', 'credit', 'debt', 'clerical'],
    fields: {
      kind: 'Philosophy',
      adherents: TBD(
        'How many of the Ascent\'s clerical class would name the Account as a belief rather than as manners? Nobody has counted, and the counting houses would prefer nobody did.',
      ),

      overview:
        '[[city.gilded-ascent|The Gilded Ascent]] has no temple and has never wanted one. What it has is the habit of reading a contract aloud on the tread it was signed on, and after eleven generations of doing that the habit acquired a doctrine. The Long Account is taught in counting houses to twelve-year-olds alongside the ledger hand, and most people who hold it would be surprised to hear it called a belief. They would call it arithmetic, or manners.\n\nIts single proposition is that obligation is the only durable substance in the world. Goods rot, coin is a token, a city is a set of promises about where the grain goes. What persists is who owes what to whom, and the only immoral act is to make that unreadable. Debt in the Account is not shameful. Concealment is.\n\nThe result is a philosophy that is genuinely decent about strangers, ruthless about the poor, and completely unable to see anyone who has been struck off. Its adherents will stand surety once in their lives for a person they have never met, on principle. They will also step over a body in [[district.gilded-ascent-under-stair|the Under-Stair]] without registering it, because someone with no account has no capacity to act and therefore, in the grammar of the thing, is not doing anything.',

      beliefs:
        'Four lines, learned by rote at twelve and argued about for the next sixty years.\n\nThe first: every act makes an entry in somebody\'s book, whether or not a hand writes it down. The second: nothing is cancelled, only carried, so a debt forgiven has been paid by the forgiver and both parties are entitled to the figure. The third: a person is what they can be relied upon to do. The fourth: the account closes once, and it is read aloud.\n\nFrom the second line comes the Account\'s hardest teaching and its worst habit. Mercy is not forbidden, but it is required to name a payer. Alms handed over in the street are held to be a theft from the person receiving them, since they remove the capacity to settle and leave nothing that can be read back. Alms are therefore given through a house, entered, and repaid at a nominal rate across forty years. Coast and delta visitors read this as contempt. The Ascent means it as respect, and neither side has ever managed to explain itself to the other.\n\nThe Account promises nothing after the closing. Asked what becomes of a person once the book is shut, a good teacher answers that the entries continue in other people\'s books, which is either a hard-headed statement about consequence or an evasion, depending on the day.',

      practices: [
        'The morning entry: one written line for every obligation taken or discharged the day before, kept in a personal book that nobody else reads until the closing',
        'Reading aloud, because nothing binds until it has been spoken on the tread it was signed on. This is why [[landmark.the-counting-stair|the Counting Stair]] has clerks\' alcoves and no chapel.',
        'The ninth-morning hour, kept while the clearing rate is set: no debt called, no offer made, no bargain struck by anyone holding the Account',
        'Standing surety once in a life for a stranger, unsecured, and entering it under your own name',
        'The read-back, once a year, in which a household\'s book is checked against its counting house\'s by a third party who is paid by the hour and sworn to say what they find',
        'The blank book, given at twelve with the first page already ruled, on the reasoning that a child who cannot keep a book cannot yet be wronged',
      ],

      taboos: [
        'Dying without a closing. The single unforgivable act, because it hands your obligations to people who cannot see them.',
        'Forgiving a debt without naming who paid for the forgiveness',
        'Refusing to state a debt when asked at a deathbed, by either party to it',
        'Alms handed over in the street, face to face, unrecorded',
        'Swearing on an account that is not yours, that is, promising what somebody else will have to deliver',
        'Wearing an [[item.oxblood-coat|oxblood coat]] with tallies you cannot evidence, which is a civil fraud here and a religious one twice over',
      ],

      customs:
        'Marriage is a merger of books, read out across two mornings, and the reading is the wedding. The feast happens separately and much later, once the merged book has balanced for a season. A quarrel that has been entered is considered settled and may not be raised again, which makes Ascent arguments short, formal and extremely cold.\n\nGuests are shown the household\'s figures on the first night. Visitors find this either shocking or an enormous compliment; it is meant as the second. Children are not asked what they want to be, they are asked what they intend to be relied on for. Reputation is not a metaphor here: a good name is a credit line, and people use the phrase without noticing that it is the same phrase.\n\nThe ugly part is the struck-off. The Account has no account of them, and adherents do not so much despise them as fail to perceive them. Two preachers on the fourth terrace have begun reading closings for the Under-Stair dead, unpaid and unrecorded, and have been fined twice for unlicensed assembly. Nobody has argued the theology of it in public yet, which is exactly the fight worth staging.',

      deathRites:
        'Two halves, and only one of them concerns the body.\n\nThe closing comes first. The book is opened, a clerk reads every live entry aloud on the tread where the dead person was apprenticed, and the heirs accept or refuse each one in turn in front of witnesses. A refused entry goes to the courts. An accepted one belongs to the heir from that hour. Most closings take under an hour; the longest on record ran nine and involved a hoist consortium and four marriages.\n\nThen the body, and the Ascent has no spare ground. The worked-out quarry faces behind the eleventh terrace are cut into niches let on forty-year leases, bought, sold and inherited long before they are needed. When a lease lapses the bones are lifted, ground and burnt for lime in the same kilns that make the city\'s mortar, and the niche is re-let. This is not held to be a desecration. It is the last entry, and a family that has renewed the same lease three times is showing off.\n\nThose whose account closes short go to the lime at once, unread. That is the fear the philosophy actually produces: not punishment, not damnation, but a book nobody opens.',

      reach:
        'Dense on the upper terraces of [[city.gilded-ascent|the Gilded Ascent]] and among clerks and factors wherever Ascent paper is honoured: lattice-house counting rooms in [[city.sky-city|the Sky City]], the registry clerks of [[city.sifting-city|the Sifting City]], the toll house at [[city.black-weir|the Black Weir]]. It travels with double-entry books and stops where they stop.\n\nIt is unwelcome in [[city.mediterranean-city|the Mediterranean City]], where bonds are void at the harbour wall and the Account\'s teaching on unsettled obligation is read, accurately, as an argument for indenture. Clerks who hold both the Account and [[religion.proof|Proof]] are notoriously unbearable at dinner.',

      devNotes:
        PROPOSAL(
          'A creditor ethics for the Gilded Ascent that answers the city entry\'s open question without giving the hub a god.',
        ) +
        '\n\nDesign intent: make [[mechanic.standing-ledger|the Standing Ledger]] feel like a moral order rather than a rules widget, and make debt forgiveness expensive enough that players have to argue about it. The Account is the reason nobody in the Ascent thinks indenture is cruelty; they think it is accuracy.\n\nPlay hooks. [[npc.wessel-ondriek|Wessel Ondriek]] keeps the morning entry faithfully and his book is four fifths fiction, which under the Account is worse than theft. [[npc.ilke-samarost|Ilke Samarost]] died at the foot of the Stair without a closing, so her entries are legally live and whoever accepts one inherits her audit along with it. The niche leases behind the eleventh terrace are a mapped, lockable, inheritable archive of private books, which is a dungeon made out of other people\'s finances. The fourth-terrace preachers are the seed of a schism a party can fund, join or sell out.',
    },
  }),

  /* ================================================================ */
  /* THE MIRROR OFFICE — a faith of people who live under stone        */
  /* ================================================================ */

  E({
    id: 'religion.the-mirror-office',
    type: 'religion',
    name: 'The Mirror Office',
    aka: ['the Office', 'the passing'],
    status: 'draft',
    summary: 'Faith of people under stone: light is the one thing the karst cannot make, so passing it on is the only sacred act.',
    tags: ['religion', 'karst', 'light', 'agrarian'],
    fields: {
      kind: 'Religion',
      adherents: 'Perhaps 20,000 of the 31,000 counted in the lit galleries; near-universal among mirrorwrights, thin among flush and sump labour',

      overview:
        'Everything in [[city.cave-agrarian-city|the Cave Agrarian City]] is manufactured. The soil is ground rock and dung and [[material.cudmother|cudmother]]. The air is a draught somebody scheduled. The nitrogen is weighed. The one thing nobody in the karst has ever made is the light, which arrives from outside, down [[landmark.sunwell-shaft|the Sunwell Shaft]] and two hundred silvered ducts, and which no amount of work will produce if the crown is not wound.\n\nThe Mirror Office is the religion that observation produced. Its content is a single distinction: made things and given things. Made things are owed to whoever made them and may be bought. Given things are owed to nobody and may only be passed on. Light is the only given thing anyone here has ever handled, which is why an allocation dispute in this city is not merely political.\n\nIt has no gods and no priests. It has speakers, who are drawn in practice from the mirrorwrights, because the doctrine holds that transmission costs the transmitter and the mirrorwrights are the people visibly paying.',

      beliefs:
        'To be a person is to be a mirror. You take a portion and pass the rest, and what makes you a mirror rather than a wall is the passing.\n\nFrom that comes the doctrine of the tarnish. Every passing costs. A mirror dulls, a duct fouls, and the silverer who lays tin amalgam on the plate is dead of it inside a decade. The Office reads this as the general shape of all good done: it leaves a mark on the doer, and someone with no marks has passed nothing. This is why mirrorwrights are its clergy without any ordination existing, and why the ninety-day re-silvering round in [[recipe.duct-mirror-resilvering|the resilvering rota]] is attended as a service rather than a shift.\n\nThe great sin is interception. Hoarded light is the theological name for every kind of theft, and it is not a metaphor: a hand mirror on a jointed arm takes a neighbour\'s allocation without leaving a mark on anything, and a gallery starved of hours dies within two courses. The Office therefore holds light theft to be identical to killing, and says so in a city where the civil penalty is a fine paid in hours.\n\nWhat the Office has never resolved is the deep galleries, where four to seven thousand debtors work in no light at all. The doctrine says a person passes what they are given. It has nothing to say about a person who is given nothing, and the speakers know it.',

      practices: [
        'The Office proper: a spoken round at every change of the two-hour winding watch, so the heliostat crown is never wound in silence',
        'First light, in which a newborn is carried to a duct mouth within nine days and held in the beam for as long as the family can afford in hours',
        'Passing the cup at the terrace shutters when a gallery\'s allocation opens, which doubles as the public witnessing of [[mechanic.the-mirror-rota|the rota]]',
        'Keeping one hand mirror at home, clean and unmounted. A mounted [[item.sunwell-mirror|jointed arm]] is the instrument of light theft, so an unmounted mirror on a shelf is a statement about your household.',
        'The dark fast: three days a year in an unlit gallery, taken by everyone above the flush line, and by nobody below it, for obvious reasons',
        'Carrying food down to the deep rota on the fast days, which the Assembly discourages because it implies the [[district.cave-agrarian-city-deep-rota|deep galleries]] exist',
      ],

      taboos: [
        'Intercepting light not issued to you, in any manner, including by lime-washing a wall your neighbour was reflecting off',
        'Burning a body, which spends the air of everyone below you and is the one crime the Office calls filthy rather than wicked',
        'Carrying the dead out of the karst',
        'Aiming a duct, cutting a mirror or working a shutter in anger',
        'Eating alone below the light line',
        'Selling an inherited light-share to a household that already holds one, which is lawful, common, and how [[npc.ossane-gorbea|Ossane Gorbea]] has been assembling hers',
      ],

      customs:
        'People are named for the duct that lit the gallery they were born under, so a name is also an address and a rough guess at a family\'s standing. Marriage begins with a year in which two households pool their hours and nothing else; property, tenancy and children come after, if the year worked.\n\nSpeech is quiet. Sound carries a long way in stone and loud voices are considered a kind of trespass, which is why karst people in the surface cities are thought either devious or shy. Both readings are wrong and both are useful to a party trying to pass unnoticed.\n\nThe mirrorwrights\' decade is the culture\'s central fact. A silverer is honoured, paid well, granted precedence at every shutter, and dead by forty-five, and everyone at the terrace knows the arithmetic when a young one takes the plate. The Office does not pretend this is a good bargain. It says that it is a passing, and that the alternative is the dark, and the honest speakers admit the argument is doing a lot of work.',

      deathRites:
        'The returning. There is nothing here to burn a body with, nowhere to bury one that is not somebody\'s floor, and no soil that was not manufactured out of rock dust in the first place.\n\nSo the dead go into the long pits, cut in a worked-out gallery on the fourth plane. The body is washed, laid on milling chaff with a starter of [[material.cudmother|cudmother]], covered, and boarded. Three years later the pit is dug out as made soil and spread on a named terrace, and the family eats the first course grown off it. That meal is the funeral. The burial was only the delivery.\n\nOutsiders find this obscene, and karst people find the alternative obscene, since everywhere else the dead are simply wasted. Names go on the pit boards in the order they went in, and a pit board is the nearest thing the city has to a tombstone. The boards are also a census nobody has ever cross-checked against the Assembly\'s roll, which would be an interesting afternoon\'s work for a party with a grudge.\n\nThe deep-gallery dead do not get pits. They are carried up if someone above will pay the hours, and if nobody will, they are put in the sumps.',

      reach: TBD(
        'Does the Office travel? The karst burial societies in the Gilded Ascent exist to carry bodies home, but no gallery outside the Hollow Karst has ever been lit, and it is not obvious the faith means anything in a place where light is free.',
      ),

      devNotes:
        PROPOSAL(
          'A light-faith for the Hollow Karst that answers the city entry\'s question with a yes and leaves the political half open: whether the Mirror Assembly appoints the speakers or merely has never had to.',
        ) +
        '\n\nThe design job is to make [[mechanic.the-mirror-rota|the Mirror Rota]] carry moral weight, so that [[quest.who-gets-the-light|Who Gets the Light]] is not an allocation puzzle but a decision about who is allowed to remain a person. A party that cuts a gallery\'s hours has, in local terms, killed it, and the speakers will say so at the shutters.\n\nHooks. [[npc.iratze-zubiate|Iratze Zubiate]] has kept two galleries dark for over a year and skimmed hours to hide it, which is interception, the one sin the Office has no gradations for; she is a mirrorwright, which is to say clergy. [[npc.bedel-lehun|Bedel Lehun]]\'s unregistered strain yields double in half the light, which is theologically explosive: a made thing that reduces the need for a given one. The pit boards are a records dungeon. The unresolved deep-gallery question is the hook for a reform movement, a schism or a very ugly silence.',
    },
  }),

  /* ================================================================ */
  /* KNOTWORK — a culture of people whose town drifts                  */
  /* ================================================================ */

  E({
    id: 'religion.knotwork',
    type: 'religion',
    name: 'Knotwork',
    aka: ['the cord', 'the count'],
    status: 'draft',
    summary: 'The raft-clans\' cord culture: obligation is knotted by the other party, property is cut lead, and the dead go out on the ebb.',
    tags: ['culture', 'drown', 'raft-clans', 'obligation'],
    fields: {
      kind: 'Culture',
      adherents: 'About 4,600 of the 5,400 afloat in [[city.floating-swamp-settlement|the floating settlement]], plus delta-born crews at [[city.black-weir|the Black Weir]] who keep a cord under the sleeve',

      overview:
        'A settlement that re-moors cannot keep its obligations in a place, because the place moves. It keeps them on the body instead. Every adult of the raft-clans wears a hand-cord at the belt, and every knot in it was tied by somebody else: one knot for each thing owed to you and each thing you owe, tied by the other party in front of a witness. You cannot tie your own knot. A person who does is not committing fraud so much as talking to themselves.\n\nThis runs alongside, and constantly against, the settlement\'s property law, which is cut lead deed-plates hung on [[landmark.the-moorstone|the Moorstone]]. Plates say who moors where. Cords say who owes whom. The [[faction.moorstone-compact|Compact]] administers the first and has no jurisdiction over the second, and roughly every dispute in the delta is really an argument about which of the two governs.\n\nKnotwork is not a religion and its people are not devout. It is a system of memory for a town with no addresses, and it is enforced by the fact that everybody can read everybody\'s belt.',

      beliefs:
        'Three things are held, more or less universally, and none of them is doctrine so much as the shape the delta forces on people.\n\nNothing here is owned, only held against the water. A raft is a set of lashings that have not yet been cut, a lot is a plate that nobody has yet contested, and a family is a count of knots. Permanence is not a virtue in the delta, it is a misunderstanding of where you are living.\n\nA knife is the only honest argument. Everything in the settlement is lashed rather than nailed precisely so it can be cut in a hurry, and the culture takes the same view of relationships: a bond you cannot end is a bond you cannot have consented to. This is why casting adrift, which looks to outsiders like exile, reads locally as the completion of a process rather than an atrocity, and why the raft-clans are so much harder on debt slavery than their neighbours. A [[spell.debt-mark|debt mark]] worked into skin cannot be cut off with the lashing, and the clans consider that obscene.\n\nAnd obligation is carried, not stored. When someone dies their knots do not vanish; they are untied and retied into other cords, in front of the clan, while the body is still in the room.',

      practices: [
        'Knots tied only by the other party, never by yourself, and always in front of a third person who can be asked later',
        'The count, spoken at every re-moor: each household recites the knots it holds and the knots it owes, and any knot nobody claims is cut on the spot',
        'Standing the plank, in which a dispute is argued with both parties on one plank span over open water and neither may step off until it is settled',
        'The first three days of the [[creature.blackrun-lamprey|lamprey run]] given away entire: no crew eats or sells its own take, on pain of being poled out of the run',
        'Tying-in a newborn, one knot per household undertaking to feed it, which is also the only census the settlement has that anybody trusts',
        'Cutting your own lashings before a drift rather than letting the draw-clerks do it, which is pride, and is the difference between moving and being moved',
      ],

      taboos: [
        'Cutting a cord that is not yours to cut. The draw-clerks may, under the Compact; nobody else may, and the forfeit is your own lot.',
        'Burying a body in earth, which is a claim on ground the ground will refuse and is the standing quarrel with [[religion.the-hundred-ground|the Hundred Ground]]',
        'Sleeping under a nailed roof. Raft-clan visitors in stone cities will take a lashed shed over a paid room and are thought filthy for it.',
        'Taking a tow you cannot repay, since a tow is a knot whether or not anybody ties it',
        'Speaking a dead person\'s knots before they have been redistributed',
        '[[spell.calling-the-run|Calling the Run]], not because the Weir hangs people for it but because it spends next year, and next year is somebody else\'s knot',
      ],

      customs: TBD(
        'What happens to the cord of a person cast adrift who comes back? Two clans retie at half, one refuses on principle, and the Kin has never ruled, because ruling would settle what casting adrift actually means.',
      ),

      deathRites:
        'The cord comes off first, while the body is still aboard. It is untied knot by knot in front of the clan, and each knot is retied into the cord of whoever takes that obligation on. Most are taken. Some are argued over for an hour. A knot nobody will take is left tied, and goes into the water with the body, and a person who goes down still carrying knots is the delta\'s idea of a tragedy; the phrase for it is that they went down loaded.\n\nThen the ebb. The body is washed in caught rainwater, never in lagoon water, laid on a spent [[creature.raftbloom|raftbloom]] mat, weighted at the feet with a pig of [[material.mire-bloom|mire bloom]], and poled past the last comb at the turn of the tide by two people from different clans. It is let go on moving water and not followed.\n\nThe mats surface in the reed a season later. Everybody knows this. Nobody discusses it, and the reed beyond the last comb is where the adrift live, which is one of several reasons the [[district.floating-swamp-settlement-tail-lots|Tail]] is the Tail. The Hundred bury what washes onto their islands, at their own cost, and have never once been thanked for it in public.',

      reach:
        'The eleven raft-clans and the tenants who moor inside their plates, the cane-cutting crews in season, and most of the adrift, who keep their cords even after the clerks have cut them. Delta-born gantry labour at [[city.black-weir|the Black Weir]] keeps the practice quietly, since the Company books obligations in shifts and would not know a cord if it were handed one.\n\nUpriver incomers marry into it and take about a generation to stop tying their own knots by accident. The [[district.floating-swamp-settlement-the-stilt-hundred|Stilt Hundred]] have never held it and never will, and the two systems have coexisted for long enough that neither can imagine the other in good faith.',

      devNotes:
        PROPOSAL(
          'A portable obligation system for a settlement with no fixed addresses, built so that the floating city\'s social contract sits on the body rather than on the map.',
        ) +
        '\n\nMechanically this is the human layer of [[mechanic.the-remoor|the Re-Moor]]. A party working the delta should end up wearing cords, and every favour taken there should become a visible object other NPCs can read. Reputation in the Drown is not a number in the margin, it is a length of knotted cord somebody can count at a glance, and a party that keeps cutting its own knots will find nobody will tie one.\n\nHooks. [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] has been paid by the Weir in guaranteed sluice-time to drift the settlement upriver, which is a knot she has taken from an outsider and not declared at the count, and the count is public. [[quest.slackwater-rights|Slackwater Rights]] is a plate dispute that is really a cord dispute. The redistribution of a dead person\'s knots is a whole scene: who takes the debts of someone the clan disliked, and what it means when nobody does.',
    },
  }),

  /* ================================================================ */
  /* THE HUNDRED GROUND — people who refuse to drift                   */
  /* ================================================================ */

  E({
    id: 'religion.the-hundred-ground',
    type: 'religion',
    name: 'The Hundred Ground',
    aka: ['the lines', 'the standing'],
    status: 'draft',
    summary: 'Peat-island tradition of the Stilt Hundred: the dead hold the boundary, and the peat keeps them well enough to be produced in evidence.',
    tags: ['tradition', 'drown', 'stilt-hundred', 'land'],
    fields: {
      kind: 'Tradition',
      adherents: 'The Stilt Hundred: about 760 people in some ninety households on the peat islands, and nobody else',

      overview:
        'The [[district.floating-swamp-settlement-the-stilt-hundred|Stilt Hundred]] were in the delta before the rafts, on peat islands that do not move, and everything they believe follows from that one fact. They hold ground in a place where nobody else does, they are taxed by a Compact whose draw they have never entered, and they have exactly one argument, which they have been making for four generations.\n\nThe argument is that ground remembers and water does not. A boundary is not a plate, a vote or a ruling; it is a line of graves, walked every spring by the family that holds it. The peat is anaerobic and tans what goes into it, so the dead do not rot. They can be lifted at a hundred years, and they are, and they are still recognisably people, and that is the whole of the tradition\'s evidence and the whole of its power.\n\nOutsiders call this ancestor worship. The Hundred would call it a land registry that cannot be forged.',

      beliefs:
        'Ground is the only witness that cannot be bought, moved or drowned. Everything else in the delta can be recut, re-tied, re-moored or bribed. A line of tanned dead in peat is a document that has been sitting in the ground since before the Compact existed, and it says what it says.\n\nFrom that follows a suspicion of every kind of paper. A cut lead deed-plate is a thing four men can make in an afternoon. A cord is a thing you can cut. The Hundred accept neither as evidence about ground and have never entered a plate on [[landmark.the-moorstone|the Moorstone]], which is why the Compact taxes them as residents while refusing them a draw, and why the tax is paid every year under a written protest that is read aloud before the money changes hands.\n\nThere is no afterlife in this. The dead are not thought to be present, aware or listening. They are thought to be where they were put, which the Hundred consider a considerably more useful property than presence.',

      practices: [
        'Burial in the peat, coffinless and unlined, in the boundary line of the island the family holds',
        'The walking, each spring: family by family, grave to grave along the line, which is a survey conducted as a devotion and is admissible in the Kin as testimony about a boundary',
        'The lifting, at a hundred years: the grave is opened, and if the peat has held the body it stands a season in the reed shelter before it is put back',
        'The forge kept lit. The Hundred hold the settlement\'s only smith, and the fire is treated as a household hearth rather than a workshop; letting it go out is a family matter, not a business one.',
        'The protest, read aloud before the Compact\'s tax is handed over, in the same words each year since the third generation',
        'Burying what washes up: the drowned, the adrift and the cast-out are put in the unlined row at the Hundred\'s own cost, and the row is walked with the rest',
      ],

      taboos: [
        'Moving a grave, including moving a marker, cutting peat above one, or dredging a channel that would drain a line',
        'Being buried afloat or given to the ebb, which is the raft-clans\' rite and is regarded here as throwing a person away',
        'Cutting peat for fuel inside a line, which makes fuel a permanent quarrel with clans who cut wherever they happen to be moored',
        'Accepting a deed-plate, since to take one is to concede that the Moorstone decides who holds what',
        'Marrying out and staying out. You may live anywhere; you may not be buried anywhere else, and the cost of bringing you back falls on the household.',
        'Speaking to a raft-clan elder about a boundary while standing on a raft, since a thing said off the ground is held not to have been said at all',
      ],

      customs:
        'Households are ranked by the length of line they hold and can walk, not by wealth, which means the poorest family on the oldest island outranks the richest incomer and behaves accordingly. Children walk their first line at about seven and are expected to know the names in order before they can read.\n\nThe standing is the tradition\'s public face and the thing that most unnerves visitors. At a lifting, the tanned dead are set upright in the reed shelter for a season, dressed, named and visited, and business is conducted in front of them because that is precisely the point: a boundary agreed in the shelter has been agreed in front of the people who established it. Raft-clan people will not enter the shelter and consider the whole practice indecent. The Hundred consider the ebb indecent. Neither has moved an inch.\n\nThe unlined row complicates the picture in the Hundred\'s favour, and they know it. They bury the delta\'s discarded dead for nothing, keep the names when they can be discovered, and use the row in every argument they have ever had with the Compact. It is genuine charity and it is also the strongest card in the file.',

      deathRites:
        'Burial in the line, on the day, without a coffin. The body goes down in what it wore, at a depth the peat is known to hold, and a cut post goes at the head with the name and the year cut in, and no other mark. There is no address in the delta, so a grave doubles as one: people from the Hundred describe where they are from by naming the nearest grave in their line.\n\nAt a hundred years the grave is opened. If the peat has held, the body is lifted, stood a season in the reed shelter and reburied at the same depth. If it has not, the failure is recorded on the post and the family knows the line is draining, which is a practical and urgent finding: a drained line is a boundary about to become arguable, and dredging upstream is the usual cause.\n\nThat single mechanism is why the Hundred fight every channel cut, every drift that parks a comb across their outflow, and every proposal from the Weir to alter the water level upstream. To everyone else it looks like superstition obstructing engineering. To the Hundred it is the difference between having a title and not.',

      reach: TBD(
        'Are there other peat-island families in the upper Drown who keep the same lines, or is the Hundred the last of it? The Compact\'s roll does not go above the middle reach, and nobody has walked up to look.',
      ),

      devNotes:
        PROPOSAL(
          'The counterweight to Knotwork: a landholding tradition inside a settlement that denies land exists, giving the floating city a genuine internal fault line rather than a class one.',
        ) +
        '\n\nThe useful trick here is that the belief is evidentially true. Peat really does tan bodies, the lines really are older than the Compact, and a lifting really does prove a boundary. Play it as a property dispute with unusual biology doing the archival work, never as spooky ancestors.\n\nHooks. [[quest.slackwater-rights|Slackwater Rights]] turns on a deed with writing on the back, and the Hundred would tell the party, unasked, that paper is exactly the problem. A drained line is a countdown a party can cause or prevent by deciding where a comb moors or whether a channel is cut, which makes an engineering choice into a legal and moral one. The unlined row is where the settlement\'s murdered and disappeared end up, so a party looking for a body in the Drown ends up asking the Hundred, and the Hundred will want something for it.',
    },
  }),

  /* ================================================================ */
  /* THE SETTING OUT — the dead in ground that will not take them      */
  /* ================================================================ */

  E({
    id: 'religion.the-setting-out',
    type: 'religion',
    name: 'The Setting Out',
    aka: ['the setting', 'the crust'],
    status: 'draft',
    summary: 'Pan-born rite for ground that will not take a body: the dead are set out on the salt and the crust builds over them.',
    tags: ['tradition', 'white-pans', 'sifting', 'water'],
    fields: {
      kind: 'Tradition',
      adherents: 'Most of the 21,000 counted in [[city.sifting-city|the Sifting City]], an unknown share of the 6,400 who are not, and the drover clans of the water road',

      overview:
        'The [[region.white-pans|White Pans]] will not take a body. There is no soil to dig, no wood to burn, and the crust neither absorbs nor lets anything rot: a corpse left on the pan dries, and stays, and remains exactly where it was put for as long as anyone cares to look at it.\n\nThe pan-born built a rite out of that instead of fighting it. The dead are not buried and not returned; they are set out, on a marked lattice beyond the worked pans, and left for the salt to build over. Where the crust takes, [[creature.salt-mason|salt masons]] cement it into a tower over some years, and a tower with a name at its foot is a person continuing in the only form this landscape offers.\n\nThe arithmetic underneath it is brutal and everybody knows it. The richest sift in the Pans is found wherever a mason colony has died over something, and the named towers are the oldest colonies there are.',

      beliefs:
        'The pan keeps what it is given. That is the whole first principle, and it is a description of the chemistry before it is a belief.\n\nFrom it follows that nothing here returns to anything. There is no cycle in the Pans, no rot, no soil, no season that puts back what the last one took. What there is instead is accretion: crust on crust, tower on tower, sift built out of what died in the brine. The dead do not go anywhere. They become a place, slowly, and a place is a thing that can be worked, which is precisely where the trouble starts.\n\nThe second principle is that what is spent on the dead must be spent from what keeps you alive, or it is not spent at all. In a city where water is issued by the posted draw and an overdraw is settled in bond rather than coin, that means the wetting: one full cask of issued water poured over a lattice that will evaporate it in a morning. It is the most expensive gesture available to anyone in the Pans, and it is the entire content of the funeral. A setting out without a wetting is not held to have happened.',

      practices: [
        'The setting out at first light on the fourth day, the body carried out on a spent [[item.sift-screen|sift screen]] and laid on a marked lattice of screen and cane beyond the worked ground',
        'The wetting: one cask of the family\'s issued water, poured out over the lattice in front of witnesses. Households save against it for years and neighbours give from their own draw.',
        'Setting a naming stone at the foot of the lattice, cut with the name and with the grade of sift the person last worked',
        'Paying a licensed pan-walker to check the setting each season for nine years and report whether the crust has taken',
        'Nine years of silence on the name, after which it is spoken freely and often',
        'Reading a bonded person\'s papers aloud over the body before the lattice is laid, and setting the papers out with them if the bond has not been discharged',
      ],

      taboos: [
        'Working a named tower. The best sift in the Pans is inside them, the crews know exactly which they are, and [[faction.pale-assay|the Pale Assay]] has begun grading their yield anyway.',
        'Burial in ground, which is held to be hiding a person somewhere nothing can build on them',
        'Speaking the name before the crust has closed',
        'Drinking, selling or reclaiming water carried out for a wetting, even after the pouring, even in a dry year',
        'Setting out a bonded person without their papers, which leaves the debt attached to the family instead of the body',
        'Taking a naming stone for its stone. Cut stone is scarce here and the temptation is real, and the penalty is being refused a setting of your own.',
      ],

      customs: TBD(
        'What do the Pans do about a marriage, a birth or a coming of age? Everything recorded so far is about the dead and the water, which cannot be the whole of a culture.',
      ),

      deathRites:
        'Detailed above, and the failures matter more than the form.\n\nA lattice laid on the wrong ground is dissolved by winter brine instead of crusted over, and by the second season there is nothing on it. This is read as a refusal, and the family carries it: to have been refused by the pan is the local shape of shame, and pan-walkers are paid well precisely because knowing where the crust builds is a real and rare skill rather than a piety.\n\nThe bonded dead are the open wound. A person who dies under paper is legally an asset, and the tower households do not release the body until the term is bought out or the paper is produced. [[npc.tazrit-nourem|Tazrit n\'Ourem]] holds indenture papers on roughly a third of the pan crews in one strongroom under her middle tower, which makes that strongroom a religious object as much as a financial one: every family in the Lee with a death in it has to go and ask her for a piece of paper before they can bury their own.\n\nAnd then the crews go back out and sift the ground the towers stand in. The tradition\'s single rule is that a named tower is not worked. The Assay\'s new grade cards do not mention names.',

      reach:
        'The whole of [[city.sifting-city|the Sifting City]] and the pan margin, in every class from the tower households to the pan-walkers. The waste-margin drovers keep it along the water road, setting their dead where the crust runs rather than at the towers, which the pan-born treat as a country variant rather than a heresy.\n\nThe karst milling families in the city do not keep it and carry their dead home instead, at considerable cost, which is a visible standing difference between two groups who otherwise work the same sheds. Bond-brought people arriving from the Ascent, the Ring and the Drown mostly adopt it inside a generation, because whatever they brought with them assumed there would be somewhere to put a body.',

      devNotes:
        PROPOSAL(
          'A funerary practice for the White Pans that answers the city entry\'s question and puts the city\'s two scarcest things, water and clean sift, on either side of the same rite.',
        ) +
        '\n\nThe designed collision is simple and nasty. Salt masons make the richest sift where a colony has died. Funerary towers are the oldest colonies. Therefore the best deposit in the Pans is a graveyard, and the [[faction.pale-assay|Pale Assay]] has been quietly grading it. Anything that touches [[mechanic.the-sift-line|the Sift Line]] can be pointed at that.\n\nHooks. [[quest.pan-fever|Pan Fever]] is about a fraction that pays best and kills crews, and the fraction in question comes off tower stock. [[npc.sahat-belek|Sahat Belek]] works the far white alone and knows where the named towers stand, which is worth more than the ward-chalk cache he is already sitting on. A party can be hired to survey towers, to guard them, or to be the crew that finds out mid-shift what it is standing in. The wetting is a small, cheap, repeatable way to make players feel a water economy: one cask, given away, in front of everyone.',
    },
  }),

  /* ================================================================ */
  /* THE UNYOKING — the steppe, the Ring and the bodies it renders     */
  /* ================================================================ */

  E({
    id: 'religion.the-unyoking',
    type: 'religion',
    name: 'The Unyoking',
    aka: ['the release', 'the drovers\' faith'],
    status: 'draft',
    summary: 'Steppe faith that a life is a carrying and death the only release, which makes the Ring\'s rendering of bodies an unfinished debt.',
    tags: ['religion', 'ashen-steppe', 'drovers', 'arena', 'bondage'],
    fields: {
      kind: 'Religion',
      adherents: TBD(
        'How many in the Arena City hold this rather than merely respect it? The drover clans are two in five of the population, but discharged fighters and pen families have been taking it up for a generation and nobody has counted.',
      ),

      overview:
        'The [[creature.yokeback|yokeback]] carries a shrunken parasitic mate fused into its flank for the whole of its life. It grazes, it breeds, it dies, and the thing on its side is never off it. The drover clans of [[region.ashen-steppe|the Ashen Steppe]] have herded these animals for as long as anyone has been out there, and they built their understanding of a human life on the image.\n\nThe teaching is that everyone carries something fused to them, and that the carrying is not a misfortune to be escaped. It is what a life is. What matters is that the carrying ends properly. Death is the only unyoking there is, and it has to be done whole: the body laid out entire, nothing kept, nothing sold, nothing divided.\n\nWhich is why the drovers and [[city.arena-city|the Arena City]] cannot be reconciled. The Ring renders its dead in [[machine.the-char-retorts|the char retorts]] under the sand, into char, oil and fertiliser, and sells the char north. Under the Unyoking those people were never released, and the carrying continues in whoever holds the pieces.',

      beliefs:
        'Four things, taught with animals rather than words, which is why outsiders take a long time to notice the drovers believe anything at all.\n\nEveryone is yoked. A debt, a family, a bad year, a bond, an injury that will not heal: the pair is the ordinary condition and there is no dignity to be had in pretending otherwise. Second, the yoke is not the person and may not be treated as if it were, which is the whole of the clans\' objection to indenture: the paper is a thing carried, not a thing owned, and the difference is not an abstraction to people who can point at an animal.\n\nThird, a carrying ends once, at death, and only if the body goes out whole. A body burnt, rendered, divided or kept is a carrying that has not stopped, and it goes on in whoever has the remains. This is not a metaphor to a drover. It is a description of what is happening in the [[recipe.bone-char-firing|retort sheds]] on any given morning.\n\nFourth, nothing may be kept. No hair, no tooth, no [[item.tallyblade|notched blade]], no keepsake. Grief in this faith is expressed by having nothing to hold, and the clans regard the coast\'s marked niches and the Ascent\'s leased bone-vaults as forms of hoarding.',

      practices: [
        'The buying back: a standing clan fund that pays the Ring\'s recovery fee on any drover-born body in [[district.arena-city-the-rendering|the Rendering]], and lately on bodies that are not drover-born at all',
        'The unyoking itself, at the spring moult: the body carried to the [[deposit.moult-fields|moult fields]] and laid whole in an open burrow line, with nothing added and nothing taken away',
        'Refusing table salt refined through bone char out of [[machine.the-bittern-ladder|the Bittern Ladder]], and paying the premium for pan salt that has not been laddered',
        'The yoke-year, in which a young adult is bound to another household\'s herd for a full year and cannot be released early by either side, whatever the two households come to think of each other',
        'Sitting the card with your back to the sand for the death-bouts, which the banner-masters tolerate because drover money is about a third of the gate',
        'Fining your own: clans levy their members who work the [[creature.yokeback|yokeback]] separation trade, and collect, and everybody involved knows the fine is cheaper than the wage',
      ],

      taboos: [
        'Rendering, burning or dividing a body. The retorts under the [[landmark.the-sunken-ring|Sunken Ring]] are, in this faith, an atrocity operating on a timetable.',
        'Keeping any part of the dead, including hair, teeth, a blade or a name cut into anything',
        'Eating salt filtered through bone char, which quietly divides half the continent\'s tables from the other half',
        'Holding that a bond is discharged by the death of the bonded, which is the Ring\'s standard accounting and which the clans hold to follow the holder instead',
        'Separating a yokeback pair, which is sacrilege and is also a paying trade, worked by drovers, fined by drovers, and never stopped',
        'Selling a herd animal to a banner without asking what the card is',
      ],

      customs:
        'A drover is introduced by what they carry rather than by what they own: a name, a clan, and then the debt, illness or dependant that is currently fused to them, stated plainly and without embarrassment. Outsiders take this for oversharing. It is closer to an address.\n\nThe recovery fund is the faith\'s public institution and the closest thing it has to a church. Every clan pays into it, the clerks are drover women too old for the moult crews, and its accounts are read out at the spring gathering. It exists to buy bodies out of [[district.arena-city-the-rendering|the Rendering]], where the fee is set by what the retorts would otherwise have paid for the bone, and it now spends more on non-drover bodies than drover ones. That was a decision, argued for two seasons, and it is the reason the pens have begun taking the faith up: the fund is the only body in the city that will pay to get a dead fighter out whole.\n\n[[faction.red-writ|The Red Writ]] finds this irritating rather than threatening, and the [[faction.bondwrights-hall|Bondwrights\' Hall]] books each recovery as a redemption and charges accordingly, which means a religious charity is quietly one of the Hall\'s better customers.',

      deathRites:
        'The body goes to the [[deposit.moult-fields|moult fields]] at the spring moult and is laid whole in an open burrow line. The burrowers rebury [[material.steppe-scute|scute]] each spring and the ground closes over the line within a season, which is the release: the person is unyoked, the carrying stops, and the family keeps absolutely nothing.\n\nOut of season, a body is held on the steppe in the dry until the moult. The clans have a whole practice for this that they do not discuss with townspeople.\n\nWhen a body cannot be recovered, and increasingly it cannot, an empty burrow line is opened and left open, and the family keeps the recovery receipt from the Ring, unpaid or refused, as the only marker. That receipt is the single most upsetting document in the Ashen Steppe. Discharged fighters who stayed in the city and have no clan to carry them out are buried by their neighbours with a [[item.quitblade|quitblade]] in place of a body, which is a keeping and therefore wrong, and is done anyway.',

      reach:
        'The steppe drover clans in full, the [[district.arena-city-drovers-camp|Drovers\' Camp]] and about a third of the [[city.arena-city|Arena City]]\'s crowd trades, unevenly. Herding families along the whole Ash Fork keep it. The moult-field crews keep it while breaking it for money.\n\nIt travels along the bond routes rather than the trade routes, which is unusual: people brought under paper to [[city.sifting-city|the Sifting City]] and [[city.gilded-ascent|the Gilded Ascent]] carry it with them, and the salt taboo makes them immediately visible in any kitchen. Some Ascent households have started buying unladdered salt without knowing why their cook insists on it.',

      devNotes:
        PROPOSAL(
          'A steppe faith that answers the Arena City\'s open question and turns the char chain into a moral supply line rather than a production step.',
        ) +
        '\n\nThe chain is already in the world and it does the work by itself: [[machine.the-char-retorts|the char retorts]] render the Ring\'s dead into bone char, [[recipe.brine-clarification|brine clarification]] filters pan liquor through that char, and the output is table salt. Under the Unyoking, the continent seasons its food with people who were never released. Do not stage this as a revelation; the drovers have said it for a century and everyone else finds it eccentric.\n\nHooks. [[npc.aylun-torgai|Aylun Torgai]] fights under a bond that was signed, voided and never corrected, so if she dies in the Ring her body is an asset and her people will have to buy it. [[quest.the-indenture-column|The Indenture Column]] moves living people as declared cargo, and the recovery fund is the only organised body in the city that treats those manifests as a moral document. A party can be paid by the fund, audited by it, or asked to steal a body out of the Rendering, which is theft of Ring property and is exactly the sort of crime that makes a campaign.',
    },
  }),

  /* ================================================================ */
  /* THE CARRYING — a cult a reasonable person joins                   */
  /* ================================================================ */

  E({
    id: 'religion.the-carrying',
    type: 'religion',
    name: 'The Carrying',
    aka: ['the carriers', 'the ninth'],
    status: 'draft',
    summary: 'Chain-holders\' cult of the Bound Fault: the Toll is a mass, not a debt, and the city stands because people are holding it.',
    tags: ['cult', 'magic-city', 'toll', 'labour', 'burnout'],
    fields: {
      kind: 'Cult',
      adherents: 'Around 300 of the 1,140 on the licence roll, plus ward trades, chain-smiths and some forty households on [[district.magic-city-chalk-row|Chalk Row]]',

      overview:
        'Nine chains bind the [[landmark.the-bound-fault|Bound Fault]], and they are held under load by a rota of licensed casters who burn out on it. The [[faction.fetterhouse|Fetterhouse]] runs that rota as a payroll denominated in people, publishes the roster, and does not discuss the life expectancy. The Carrying is what a few hundred of those people made out of it.\n\nIts claim is narrow and, awkwardly for its critics, correct. [[mechanic.the-toll|The Toll]] is not a debt that can be forgiven, deferred or argued down; it is a mass, and mass has to be somewhere. A chain-holder standing a shift is doing openly what every practitioner in the city does covertly, which is carrying weight that would otherwise fall on somebody. The cult\'s teaching is that this is honourable work rather than a disposal problem, and that the people doing it are owed more than a wage.\n\nSo it pays a household fund, sits with its members through [[skill.bleed-off|bleed-off]], attends their deaths, and argues for the right to bury them in the one piece of ground in the city that is not a cemetery. It also fills shifts, which is why the Fetterhouse tolerates it, and why its opponents call it a recruiting office for the machine that is eating it.',

      beliefs:
        'Mass does not go away. A working is not a favour asked of the world, it is a load moved, and the load ends up on the practitioner in the form of Toll, on a licensed sink in the form of saturated [[material.quenchspar|quenchspar]], or on somebody who did not consent. There is no fourth place for it to be. Every doctrine the cult holds is downstream of that sentence.\n\nTherefore a person who has carried is not diminished but weighted, and the Carrying uses the word deliberately: a member greets a burnt-out colleague as heavy, which in this city is the most respectful thing anyone will say to them all year. Therefore, too, [[skill.toll-shunting|shunting]] is not merely a capital crime, it is the exact inversion of the faith, and the cult reports it, which makes it the most effective informant network in the Magic City and the most detested.\n\nThe cult\'s difficult claim is about the two chains that went dead in the last slippage. It holds that they are still carrying, held by the people who died holding them, and that the city stands on the accumulated work of the dead. The Fetterhouse considers this superstition attached to an engineering failure. The cult considers the Fetterhouse\'s position an accounting convenience. Nobody has been able to test either, because the only person who knows which two chains are dead is [[npc.ysme-drannik|Ysme Drannik]], and she is in the chain-house.',

      practices: [
        'The sitting: two members attend every licensed bleed-off a member takes, one to hold the receipt and one to walk them home',
        'The weight, a graded quenchspar block carried on the person at a mass matched to their registered Toll, changed whenever the register changes',
        'Reading the [[landmark.the-ninth-chain|Ninth Chain]] roll aloud on the anniversary of each slippage, including all 211 names and the acknowledged gap where the roll was closed short',
        'The household fund: a twentieth of hazard money, disbursed to the family of a burnt-out member within nine days, audited in public at the chalk sheds',
        'The Offer, which is volunteering onto the chain rota out of turn. The cult calls it the Offer. The Fetterhouse calls it a staffing solution and does not look too closely.',
        'Sitting the last shift with anyone on the rota who asks, member or not, licensed or struck off',
      ],

      taboos: [
        'Toll shunting, absolutely, and the cult informs on it, which is the source of most of the hatred directed at it',
        'Working off the register, since an unmetered working is a mass nobody has weighed and therefore a load somebody will take without knowing',
        'Refusing the Offer twice in a year and remaining a member',
        'Speaking of a burnt-out member as spent, wasted, finished or used up',
        'Buying a discharge from the rota, which is entirely legal, extremely common, and gets you put out of the cult the same week',
        'Attending a bleed-off alone, either as the caster or as the sitter',
      ],

      customs:
        'Membership is unremarkable from outside: no vestments, no signs, a plain slate disc with a number on it that is the mass you are carrying and not a rank. Meetings happen in the chalk sheds after the shift, last under an hour, and consist mostly of the fund\'s accounts and the rota.\n\nThe cult is unusually honest about what it is for, which is the reason a reasonable person joins. If you are on the rota you are going to burn out; the Carrying does not dispute that, promise otherwise, or offer a remedy. What it offers is that your household will be paid within nine days, that two people will sit with you at every discharge, that somebody will be there at the end, and that your name will be read out once a year for as long as the cult lasts. Set against the Fetterhouse, which offers a wage and a roster, that is a serious proposition.\n\nWhat its critics say is also true. Recruitment into the rota is easier because the Carrying exists. The Fetterhouse\'s worst years for burnout have been its best years for volunteers. Some members have said this out loud and stayed anyway, on the reasoning that the chains have to be held by somebody and they would rather it were somebody who was looked after.',

      deathRites:
        'The cult wants its dead in the burial yard behind [[district.magic-city-the-sinks|the Sinks]], where saturated quenchspar blocks are walked out and buried at three strides under numbered markers in rows. Its argument is theological and, to a chain-smith, obvious: a saturated block and a burnt-out caster are the same object, a thing that carried until it could not, and they should be logged the same way.\n\nThe [[faction.fetterhouse|Fetterhouse]] refuses. The yard\'s register is a licensing document, not a graveyard roll, and burying people in it would make the death rate legible to anyone who could read a ledger. So members are buried outside the ward line in ordinary ground, and the cult reads the yard\'s numbering over the grave anyway, assigning the dead a block number that does not exist. This is a breach of the register and is prosecuted about twice a year, always as a paperwork offence, never as a religious one.\n\nThe body itself is buried with a spent block of quenchspar at the chest, bought by the fund. Nothing is burnt, because burning a saturated block is how the last two chalk-shed fires started, and the cult\'s liturgy on the subject is really a safety instruction that acquired cadence.',

      reach: TBD(
        'Have cells appeared among the Sky City lattice crews, who also hold load for a living and also die of it? Two Carriers went up the shelf last year on licences the Mooring Assize issued without asking why.',
      ),

      devNotes:
        PROPOSAL(
          'A cult for the Magic City that answers the city entry\'s question about a burnout rite, built so that a competent, sceptical player character could join it in good conscience.',
        ) +
        '\n\nThe test applied throughout: no secret masters, no hidden atrocity, no twist. The Carrying is a mutual aid society with a metaphysics, and its genuine moral problem is structural rather than sinister. It makes a lethal rota easier to staff. That is the whole of the horror and it is enough.\n\nHooks. [[quest.the-chalk-that-lies|The Chalk That Lies]] is a supply-line investigation in which the cult is the best-informed and least trusted witness, because it reports on its own. [[npc.toval-cherek|Toval Cherek]] has been shorting the alloy on replacement links for two years and knows exactly which sections carry his work, and the Carrying is the one body in the city that would neither exploit nor forgive him. [[npc.ysme-drannik|Ysme Drannik]] holds the answer about the two dead chains, and the cult wants that answer for reasons that are religious rather than structural, which is a good, uncomfortable reason to break somebody out of a chain-house.',
    },
  }),

  /* ================================================================ */
  /* THE GIVEN WEIGHT — mass as personhood                             */
  /* ================================================================ */

  E({
    id: 'religion.the-given-weight',
    type: 'religion',
    name: 'The Given Weight',
    aka: ['the weight', 'ring manners'],
    status: 'draft',
    summary: 'Ring-born culture in which mass is standing, courtesy is measured in lift, and the dead go down from the Ballast Drop.',
    tags: ['culture', 'sky-city', 'mass', 'courtesy'],
    fields: {
      kind: 'Culture',
      adherents: 'Near-universal among the 19,400 aloft; observed and resented by the 6,200 ground households at [[district.sky-city-shelf-foot|Shelf-Foot]]',

      overview:
        'In [[city.sky-city|the Sky City]] every gram aboard is licensed under [[mechanic.mass-warrant|the Mass Warrant]], and a registered resident holds an assessed allowance in their own name. That is the law. The Given Weight is what four generations of ring-born have made of living inside it.\n\nIts premise is that your mass is not yours. It is what the city has agreed to carry for you, and the agreement is renewed every year at the assessment. From that follows the whole of ring-born manners: you are obliged to be worth your weight, courtesy is expressed by taking weight off somebody rather than by giving them things, and the worst thing that can be said about a person aloft is that they are carried.\n\nOutsiders hear this as a rich city congratulating itself on rationing. It is more precise than that, and colder. Nobody up here believes they have a right to be up here. They believe they have a lease.',

      beliefs:
        'Three propositions, none of them written anywhere, all of them enforceable by embarrassment.\n\nMass is a loan. The city carries you, the lattice carries the city, and [[machine.the-strand-loom|the cable]] fatigues whether or not you are worth it. A person who understands this is described as light, which is the ring-born word for well-mannered, considerate and financially sound all at once. A person who does not is heavy, and it is not a compliment.\n\nWeight is standing. Your assessed figure is closer to a name than to a measurement: adults know theirs to the gram, keep it privately, and disclose it as an act of intimacy. To ask a stranger their figure is a serious impropriety. To state yours unasked is a declaration, usually of intent to make a promise.\n\nAnd the ground is where weight goes when nobody is carrying it. This is the culture\'s blind spot and its cruelty. Shelf-Foot is where the ballast lands, where the culled [[creature.loftwrack|loftwrack]] rafts fall, and where the dead go, and the ring-born speak of all three in the same tone: not with contempt, but as a direction rather than a place with people in it.',

      practices: [
        'Assessment day, once a year at the household\'s mast: the family weighs together, the figure is read out and entered, and the meal afterwards is the closest thing the Ring has to a festival',
        'Carrying for another, which is taking a portion of someone\'s assessment onto your own for a season. This is the ring-born form of a serious promise and is done in front of a mast clerk.',
        'Weightless giving: hours, songs, instruction, introductions and freed allowance. Objects pass only between households that have merged assessments.',
        'The lightening, in which a dying person gives away their allowance in portions over days, publicly, until they hold nothing but their own body',
        'The still-air fast, kept when the [[food.lattice-cress|cress]] trays brown: the registered eat last and allowance labour eat first, which is observed roughly as often as such rules are',
        'Naming the figure at a wedding rather than a dowry, since a merged assessment is the actual contract',
      ],

      taboos: [
        'Weighing a corpse where the family can see it, though it is weighed, and the figure goes in the descent book',
        'Calling a body freight, ballast or mass in speech, though it is legally all three',
        'Holding an allowance you do not use, which is hoarding lift and is the ring-born equivalent of a miser',
        'Going down without saying so. An unlogged descent is a capital offence in law and, socially, a discourtesy so severe that [[npc.perrine-orlaunt|ballast-runners]] are shunned by people who use them.',
        'Refusing to state your figure to someone who has just stated theirs',
        'Speaking of Shelf-Foot as below, which the ring-born do constantly and apologise for when caught',
      ],

      customs: TBD(
        'Do ring-born families keep any marker at all once a body is below? Nothing may be built at Shelf-Foot without a ground lease and no ring-born household holds one, so four generations of the Ring are in ground its families have no right to visit.',
      ),

      deathRites:
        'Cremation is banned aloft, for the same reason everything else is banned aloft. Ground burial requires a descent permit and ground the city does not own. What is left is the drop.\n\nThe lawful rite is a scheduled release from [[landmark.the-ballast-drop|the Ballast Drop]]: the body sewn, weighted to a stated figure, entered in the descent book, and let go on a posted hour into the marked ground below at [[district.sky-city-shelf-foot|Shelf-Foot]], where ground families receive it and bury it. The dignity is entirely in the paying. A family that can afford the fee buys a solitary drop, so their dead falls alone on its own hour. A family that cannot goes into the counterweight tanks with the ballast water on a routine release, and everybody at the foot knows the difference in the sound.\n\nThe struck-off do not get either. Rated as unassessed mass, they are put down, in a crate, and the crate is logged as freight. [[npc.perrine-orlaunt|Perrine Orlaunt]] has moved living people the same way and lost one to it, which is the ring-born nightmare in its exact form: to go down as cargo, in the dark, with a number on the outside.\n\nShelf-Foot buries all of it. The ground households have twice petitioned for a burial fee and been refused twice, on the stated grounds that the dead are unassessed mass and therefore not the city\'s. That refusal is quoted at Shelf-Foot the way scripture is quoted elsewhere.',

      reach:
        'The Ring entire, and nowhere else on the continent, because nowhere else has the constraint that produces it. Ring-born abroad are recognisable within an hour: they will not accept an object as a gift, they weigh their luggage compulsively, and they find the Ascent\'s habit of giving alms in the street both wasteful and slightly indecent.\n\nAt [[district.sky-city-shelf-foot|Shelf-Foot]] the culture is known in detail and held in contempt, which is not the same as rejecting it: ground households use the same vocabulary, keep the same courtesies, and observe that all of it stops applying about ninety strides below the lip.',

      devNotes:
        PROPOSAL(
          'A culture of assessed mass for the Sky City that answers the city entry\'s burial question by using the Ballast Drop, which the map already has, and by making the cost of a solitary drop the entire content of the funeral.',
        ) +
        '\n\nDesign intent: give [[mechanic.mass-warrant|the Mass Warrant]] a social surface. Encumbrance is already an economy in this city; this makes it a set of manners, so that a party carrying too much is not merely fined but read as vulgar, and buying somebody\'s allowance for a season is a plot-grade favour.\n\nHooks. [[npc.cesille-vaudry|Cesille Vaudry]] has been forging tonnage returns rather than sign eviction lists, which under the Given Weight is not fraud but a lie about what the city has agreed to carry, and that framing is how you get her household to turn on her. The Shelf-Foot burial fee refusal is a standing grievance a party can settle, weaponise or make worse. A solitary drop is a purchasable act of respect and therefore a bribe, a favour and a funeral all at once.',
    },
  }),

  /* ================================================================ */
  /* THE STANDING DEAD — the Greatwood and what is inside the timber   */
  /* ================================================================ */

  E({
    id: 'religion.the-standing-dead',
    type: 'religion',
    name: 'The Standing Dead',
    aka: ['the chambering', 'the closed'],
    status: 'draft',
    summary: 'Greatwood faith that puts its dead into living trunks, which makes every felling licence a trade in bodies.',
    tags: ['religion', 'greatwood', 'hearth-clans', 'timber', 'grievance'],
    fields: {
      kind: 'Religion',
      adherents: TBD(
        'How much of the tribute villages holds this, and is the levy therefore also a religious grievance? The Marshalcy has never dared count, because counting means asking, and asking gives the answer a name.',
      ),

      overview:
        '[[creature.bolewright-wasp|Bolewright wasps]] hollow chambers in the living trunks of the Greatwood\'s colossal boles, and the tree seals over them across a decade or so. The hearth-clans of the outwood have used those chambers to hold their dead for as long as they have been out there, and about half the tribute villages inside the pale do the same, quietly, at some risk.\n\nThe belief that grew around the practice is simple and territorial. A bole is not a tree. It is a place that has been accumulating people, and a mature trunk holds five or six generations of a family in sealed chambers at various heights. To fell it is not forestry. It is an exhumation performed with axes, followed by a sawmill.\n\nWhich means [[city.tree-city|the Tree City]] licenses, enforces and profits from a trade in bodies, and [[material.blackbole-timber|blackbole timber]] is shipped the length of the continent for gates, keels and siege frames. The hearth-clans have been saying this for two centuries. The [[faction.pitchguard|Pitchguard]] hangs people for cutting without a licence and has never once addressed the point.',

      beliefs:
        'The dead are not gone anywhere; they are inside the wood, at a known height, in a chamber a family opened and packed. The faith calls them the closed. They are not addressed, prayed to or asked for anything, and there is no suggestion that they act. What there is, is a place: a person becomes part of a standing thing that will outlast everyone who knew them, which is the nearest to permanence anybody in the Greatwood gets.\n\nFrom that comes the whole moral architecture. Wood is not a material. Worked bole timber may be used, carried, built with and slept beside, but not burnt, and the [[district.tree-city-pitch-yards|pitch yards]] that distil stumpwood into pitch, spirit and charcoal are therefore an atrocity performed continuously and at industrial scale. Hearth-clan people will work anywhere in the Greatwood except the retorts.\n\nThe heart rot is the faith\'s live argument, and it is not mystical. The clans hold that the Marshalcy has been felling exactly the old wasp-culled trunks the clans used to leave standing, so the broods have nowhere left to go but sound wood, and the rot in the six named boles is the direct and predictable result. This is an ecological claim dressed as a religious one and it is very probably correct, which is the most dangerous thing about it.',

      practices: [
        'Chambering: a body folded into a bolewright gall opened with a hooked knife, and the mouth packed with gall resin so the trunk closes over it in eight to fifteen years',
        'The listening, in which the family attends the trunk once a year until the chamber has closed. The closing is the funeral, and it happens a decade after the death.',
        'Wasp-keeping: moving broods deliberately, culling old trunks and sparing young ones, which the Pitchguard prosecutes as sabotage and which is the closest thing the Greatwood has to forestry',
        'Naming the bole and not the person. After the closing the dead are addressed by the trunk that holds them, so families are described by tree.',
        'The mast gathering, held in the four-to-seven-year [[food.bole-mast|masting]] years, which is the calendar, the only feast, and the only time scattered clans meet',
        'Refusing to witness a felling licence, which sounds trivial and matters, because a licence needs local witnesses and the Marshalcy has to find them',
      ],

      taboos: [
        'Burning worked bole timber in any quantity, for any reason, including as fuel in a hard winter',
        'Sleeping under a beam cut from a named bole. Hearth-clan labourers in the Ascent and the Sky City refuse certain rooms and are thought superstitious for it, and they are usually right about which rooms.',
        'Felling a trunk chambered within three generations, which is most of the standing timber the clans care about',
        'Taking gall resin from a chambered gall, though the resin is worth money and the temptation is constant',
        'Accepting or witnessing a felling licence',
        'Leaving a body where it cannot be chambered, which is why there is a steady traffic of the dead moving out of the city through [[district.tree-city-underroot|Underroot]] at night',
      ],

      customs:
        'Families are named for trunks, and the naming is a genuine legal fact in the outwood: to say which bole you are of is to state where your dead are and therefore what ground you can be expected to defend. Marriage moves a person between trunks, and the negotiation is about which bole the couple\'s dead will go into, not about property.\n\nThe [[creature.sentinel-tick|sentinel tick]] worn behind the ear by Greatwood scouts is not a religious object, but the clans and the Pitchguard both use them and the clans have a set of manners about it: a tick is fed from the wearer only, never from a captive, which is a distinction the scouts of the Marshalcy do not make.\n\nThe body traffic is the tradition\'s hard edge. Conscripts who die on the roll are buried by the Pitchguard at the city\'s cost, which the clans regard as no burial at all, so relatives pay to have bodies taken back out to the outwood, and people are paid to carry them. [[npc.vetla-torvik|Vetla Torvik]] sells the routes. It is corpse smuggling with an entirely coherent motive, and the Pitchguard treats it as desertion-adjacent because the same routes carry the living.',

      deathRites:
        'A gall is chosen by the family, opened with a hooked knife on a face that will not weep pitch, and widened by hand. The body is folded in, the mouth is packed with gall resin, and the trunk is left to do the rest. Nothing is said at the packing. The words happen at the closing, eight to fifteen years later, when the family walks up and finds the bark grown over, and at that point the person is named as of that bole and is spoken of freely.\n\nA chamber that fails to close is the disaster. It means the trunk is sick, or the resin was old, or the wasps have moved, and the body has to be moved to another gall, which is done at night and by the family alone. A family with three failed chamberings will move to another trunk entirely, and this is exactly the pattern the clans are seeing now across the six named boles.\n\nThe grim arithmetic: [[deposit.standing-fifty|the Standing Fifty]] are the last mature trunks outside the Tree City\'s walls, each felling licence is a council vote, and every one of those trunks is somebody\'s cemetery. The clans know the count. So does everybody else, which is why the Fifty is the only number in the Greatwood that every faction agrees on.',

      reach:
        'The outwood hearth-clans entire, most tribute villages within the pale to a degree nobody will state on paper, and the yard labour of [[city.tree-city|the Tree City]] itself, which is largely deserters\' kin and taken outwood people. It is not held by the bole-born gallery households, who bury in the roots, or by the sworn Pitchguard, who are buried at the city\'s cost and were mostly raised to think chambering is a country horror.\n\nOutside the Greatwood it travels with timber workers: sawyers and shipwrights on the Meridian Coast, lattice crews in the Sky City, and gate-builders in the Ascent, all of whom handle blackbole and some of whom will not work an unnamed baulk without asking where it came from. The question is unanswerable, since the Marshalcy\'s licences record the bole and its buyers do not, and that gap is a good hook for anyone tracing a shipment.',

      devNotes:
        PROPOSAL(
          'A Greatwood faith that answers the Tree City\'s open question with the harder of the two options: yes, the levy is also a religious grievance, and the city\'s principal export may contain people.',
        ) +
        '\n\nUnusual biology doing the theological work: the wasp makes the chamber, the tree seals it, and the practice is a straightforward use of an existing ecology. Keep it that way. There is nothing supernatural here, and the clans\' claim about the heart rot should be treated as an ecological argument that the Marshalcy cannot afford to test.\n\nHooks. [[quest.the-felling-order|The Felling Order]] burns a quarter with families inside on an eleven-day timer; the same order also destroys the chambered dead of everyone who ever lived in that trunk, and the clans will offer a party help, a route or a threat over it. [[npc.aune-mustsalu|Aune Mustsalu]] is forging deaths on the conscription rolls, which requires bodies that are not produced and funerals that do not happen, and the chambering practice is what makes that plausible. A cargo of blackbole beams arriving anywhere on the continent is a hook: somebody in the crew will not sleep under it and will say why.',
    },
  }),

  /* ================================================================ */
  /* PROOF — the coast, liability, and what counts as true             */
  /* ================================================================ */

  E({
    id: 'religion.proof',
    type: 'religion',
    name: 'Proof',
    aka: ['the mark', 'coast reasoning'],
    status: 'draft',
    summary: 'Coast philosophy of liability: nothing is true until somebody who can be sued has marked it and shown it working.',
    tags: ['philosophy', 'meridian-coast', 'liability', 'engineering'],
    fields: {
      kind: 'Philosophy',
      adherents: 'Most of the chartered and licensed trades in [[city.mediterranean-city|the Mediterranean City]]; about 112,000 people live inside a system that assumes it',

      overview:
        'A cement that cures underwater either does or it does not, and the sea audits it within the year. Three generations of building harbour works out of [[material.tideset-cement|tideset cement]] taught the Meridian Coast an epistemology, and the coast has been exporting it ever since alongside the [[item.governor-spring|springs]] and the tables.\n\nProof holds that a claim is not true or false until it has been demonstrated in front of someone who can be blamed if it fails. Before that it is not a claim at all, merely a remark. The instrument that makes this work is the mark: every made thing on the coast carries the proof mark of a person who can be sued for it, and unmarked work is not distrusted so much as declined, the way an unsigned letter is declined.\n\nThis is why the coast trusts liability chains rather than institutions, and why it finds the rest of the continent by turns naive and dishonest. The [[faction.conduit-college|Conduit College]] is the philosophy\'s great institution and its standing embarrassment, since a body that licenses marks and also sits on designs it refuses to license has quietly made itself the one thing on the coast that nobody can hold liable.',

      beliefs:
        'Four working rules, taught by apprenticeship rather than by anybody\'s book.\n\nA claim is a liability. To assert something is to accept the consequences of it being wrong, and if you will not accept those, you have not asserted anything. Coast witnesses accordingly refuse to swear: they affirm what they can demonstrate and decline the rest, which reads as evasion in Ascent courts and is meant as precision.\n\nDemonstration beats testimony. This is why [[spell.the-witnessing|the Witnessing]], which fixes a memory as admissible testimony at the cost of the memory itself, is legal here and thoroughly disliked. It produces certainty about what somebody remembers, which is not the same as certainty about what happened, and the coast can tell the difference and finds it insulting that other cities cannot.\n\nA mark outlives the hand. A proof mark binds an estate, so it must be struck from the roll publicly when its holder dies, and an unstruck mark is a live liability wandering about the world. Half the coast\'s funerary practice follows from this one clause.\n\nAnd nothing is proved by being licensed. A [[faction.fetterhouse|Fetterhouse]] number says who is permitted to work, not that the work holds, and the coast will not accept one as evidence. This is the substance of a long, cold quarrel with [[city.magic-city|the Magic City]], and it is the reason bound structures are so rare on the Meridian Coast that most people have never seen one.',

      practices: [
        'Marking every made thing with the mark of a person who can be sued, and refusing to buy, fit or carry unmarked work',
        'The demonstration: a disputed claim settled by doing the thing once, in front of witnesses, at the claimant\'s own cost',
        'Striking through, the public removal of a mark from the roll on death, retirement or a finding against it',
        'Reading the [[item.orrery-tables|Orrery tables]] aloud at [[district.mediterranean-city-the-mole|the Mole]] each season and checking them against the last, in the open, by anyone who cares to attend',
        'The club subscription, paid weekly for life, which buys a cast niche and makes the club, not the family, liable for the burial',
        'Apprentice witnessing: an apprentice attends every failure their master is called to, on the reasoning that you learn a trade from what breaks',
      ],

      taboos: [
        'Putting your mark on another\'s work, or lending yours out, which ends careers and occasionally households',
        'Swearing to something you cannot demonstrate',
        'Correcting an instrument in private. The correction must be public, dated and marked, or the instrument is corrupt from that moment.',
        'An unmarked grave, which is the only funerary offence the coast recognises',
        'Accepting a licence as evidence of anything but permission',
        'Concealing a failure that has already killed someone, which is prosecuted and is also the one thing that gets a master shunned in the street',
      ],

      customs:
        'A coast introduction is a mark and a trade, in that order, and the name comes third. Children of chartered households are marked at the end of their apprenticeship in a ceremony that is functionally an insurance underwriting, complete with the reading of the estate\'s liabilities.\n\nDinner arguments are settled by demonstration wherever demonstration is possible, which is why coast kitchens contain scales, gauges and a tide table, and why coast people are exhausting to argue with. The custom of refusing to swear has consequences abroad: a Meridian witness in an Ascent court will not take the oath, is held in contempt roughly once a season, and pays the fine as a matter of principle.\n\nThe funeral clubs are the coast\'s most characteristic institution and its most revealing. They are subscription bodies with published accounts, liable for their members\' niches, audited annually, and older than most of the workshops. The gulf and island quarter on the west mole keeps its own, the [[district.mediterranean-city-the-lazaret|Lazaret]] runs one for the unbonded and destitute at a lower rate, and a person\'s club is stated in their obituary before their family is.',

      deathRites:
        'The mark is struck first, in public, at the roll. Until that happens the dead person\'s liabilities are live and their workshop cannot lawfully trade, so the striking is done within a day and is attended by competitors as much as by mourners. It is the coast\'s equivalent of closing the eyes.\n\nThe body then goes into a club vault under [[district.mediterranean-city-the-mole|the Mole]], in a niche cast in [[material.tideset-cement|tideset cement]] years in advance and cured wet, sealed with a plate carrying the dead person\'s proof mark and the date it was struck. Nothing else goes in. A niche without a mark on it is the one thing the coast will not tolerate, so paupers and unbonded arrivals are marked with the Lazaret\'s own mark, which means the city keeps, under its harbour, a wall of its own accepted liabilities in the order they arrived.\n\nThe exception is fever. Marsh-fever and gum-rot dead go out under a [[spell.lime-seal|lime seal]] without a demonstration and without the vault, on the harbour physician\'s word alone, and the coast hates this and does it anyway. [[npc.anthimos-vellani|Anthimos Vellani]] is currently sitting on three cases he has not reported, which under Proof is not caution or mercy but the cardinal offence: a failure concealed after it has already begun killing people.',

      reach: TBD(
        'Does Proof exist anywhere the College\'s marks are not honoured? Ascent factors keep the manners and none of the liability, which coast masters say is the whole of the difference, and which nobody has tested outside a dinner argument.',
      ),

      devNotes:
        PROPOSAL(
          'A civic philosophy for the Mediterranean City that answers the city entry\'s question with the second option: no faith underneath the calendar, but a genuine and demanding epistemology that the College has captured.',
        ) +
        '\n\nDesign use: Proof is the world\'s in-fiction argument about evidence, and it is the reason a licensing city and an engineering city cannot get along. It also gives players a legible standard to meet. A party that wants a coast master to act must demonstrate rather than persuade, and [[skill.proof-marking|proof marking]] stops being a crafting skill and becomes a social one.\n\nHooks. [[npc.melitta-aspri|Melitta Aspri]] has been biasing the printed tables to hide the Orrery\'s drift, which is correcting an instrument in private, the taboo Proof takes most seriously; [[quest.four-minutes-fast|Four Minutes Fast]] therefore ends in a professional death as much as a financial one. [[quest.the-casting-voice|The Casting Voice]] is a tariff fight in which the College\'s immunity from liability is the real subject. And the [[district.mediterranean-city-the-lazaret|Lazaret]]\'s wall of marked niches is a public record of everyone the city has quietly accepted responsibility for, which is a genuinely useful research location for a party tracing somebody who disappeared.',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* --- The Long Account ------------------------------------------- */
  R('religion.the-long-account', 'located_in', CITY.gildedAscent, 'its seat: the counting houses and the Stair'),
  R('religion.the-long-account', 'located_in', REGION.ascentBasin, 'carried up and down the forks by factors'),
  R('religion.the-long-account', 'located_in', CITY.skyCity, 'lattice-house counting rooms'),
  R('religion.the-long-account', 'located_in', CITY.siftingCity, 'registry clerks and the assay-sworn'),
  R('religion.the-long-account', 'located_in', CITY.blackWeir, 'the toll house, where the book is the town'),
  R('religion.the-long-account', 'related_to', 'landmark.the-counting-stair', 'contracts are read on the tread they were signed on'),
  R('religion.the-long-account', 'related_to', 'faction.concord-of-weights', 'the Concord does not run it and could not survive it being taught otherwise'),
  R('religion.the-long-account', 'related_to', 'faction.bondwrights-hall', 'indenture paper is theologically respectable here, which is the problem'),
  R('religion.the-long-account', 'affects', 'mechanic.standing-ledger', 'supplies the moral grammar the Ledger is enforced in'),
  R('religion.the-long-account', 'rival_of', 'religion.proof', 'obligation versus demonstration; the coast will not enforce Ascent paper'),
  R('religion.the-long-account', 'related_to', 'religion.the-given-weight', 'two systems in which standing is a figure other people can read'),
  R('npc.wessel-ondriek', 'member_of', 'religion.the-long-account', 'keeps the morning entry faithfully; the book is four fifths fiction'),

  /* --- The Mirror Office ------------------------------------------- */
  R('religion.the-mirror-office', 'located_in', CITY.caveAgrarian, 'the lit terraces, gallery by gallery'),
  R('religion.the-mirror-office', 'located_in', REGION.hollowKarst),
  R('religion.the-mirror-office', 'located_in', CITY.gildedAscent, 'karst burial societies exist to carry bodies home'),
  R('religion.the-mirror-office', 'worships', 'landmark.sunwell-shaft', 'not a god: the given thing, and the only one'),
  R('religion.the-mirror-office', 'related_to', 'faction.mirror-assembly', 'the Assembly has never had to decide whether it appoints the speakers'),
  R('religion.the-mirror-office', 'affects', 'mechanic.the-mirror-rota', 'makes an allocation vote a question about who remains a person'),
  R('religion.the-mirror-office', 'related_to', 'material.cudmother', 'the starter that turns a body into terrace soil'),
  R('religion.the-mirror-office', 'contests', 'district.cave-agrarian-city-deep-rota', 'the doctrine has no account of people given nothing'),
  R('religion.the-mirror-office', 'related_to', 'religion.the-carrying', 'two faiths whose clergy are the people the work is killing'),
  R('religion.the-mirror-office', 'related_to', 'religion.the-long-account', 'karst societies in the Ascent are the point where the two grind'),
  R('npc.iratze-zubiate', 'member_of', 'religion.the-mirror-office', 'a mirrorwright, and therefore clergy whether or not she wanted it'),
  R('quest.who-gets-the-light', 'involves', 'religion.the-mirror-office', 'the speakers will name the cut galleries as killings'),

  /* --- Knotwork ---------------------------------------------------- */
  R('religion.knotwork', 'located_in', CITY.floatingSwamp, 'eleven raft-clans and their tenants'),
  R('religion.knotwork', 'located_in', REGION.theDrown),
  R('religion.knotwork', 'located_in', CITY.blackWeir, 'delta-born gantry crews keep a cord under the sleeve'),
  R('religion.knotwork', 'worships', 'landmark.the-moorstone', 'the one fixed thing, and it is a registry rather than an altar'),
  R('religion.knotwork', 'related_to', 'faction.moorstone-compact', 'the Compact rules plates and has no jurisdiction over cords'),
  R('religion.knotwork', 'affects', 'mechanic.the-remoor', 'the count is spoken at every drift, and unclaimed knots are cut'),
  R('religion.knotwork', 'contests', 'religion.the-hundred-ground', 'earth burial as a claim on ground the delta will refuse'),
  R('religion.knotwork', 'rival_of', 'religion.the-long-account', 'a debt worked into skin cannot be cut off with the lashing'),
  R('religion.knotwork', 'related_to', 'item.moor-stake', 'a stake makes property; a cord makes kin, and the two disagree'),
  R('npc.sabbe-sixteen-knot', 'member_of', 'religion.knotwork', 'holds a knot from the Weir that has not been declared at the count'),
  R('quest.slackwater-rights', 'involves', 'religion.knotwork', 'a plate dispute that is really an argument about cords'),

  /* --- The Hundred Ground ------------------------------------------ */
  R('religion.the-hundred-ground', 'located_in', CITY.floatingSwamp, 'the peat islands, and no further'),
  R('religion.the-hundred-ground', 'located_in', 'district.floating-swamp-settlement-the-stilt-hundred', 'the lines, the shelter and the unlined row'),
  R('religion.the-hundred-ground', 'located_in', REGION.theDrown),
  R('religion.the-hundred-ground', 'contests', 'faction.moorstone-compact', 'taxed as residents, refused a draw, and protesting in the same words since the third generation'),
  R('religion.the-hundred-ground', 'contests', 'religion.knotwork', 'the ebb reads here as throwing a person away'),
  R('religion.the-hundred-ground', 'related_to', 'religion.the-standing-dead', 'two traditions holding that the dead stay where they were put'),
  R('religion.the-hundred-ground', 'affects', CITY.blackWeir, 'any change to the upstream water level drains a line and voids a boundary'),
  R('quest.slackwater-rights', 'involves', 'religion.the-hundred-ground', 'the Hundred would say, unasked, that paper is exactly the problem'),

  /* --- The Setting Out --------------------------------------------- */
  R('religion.the-setting-out', 'located_in', CITY.siftingCity, 'all classes, from the tower households to the pan-walkers'),
  R('religion.the-setting-out', 'located_in', REGION.whitePans),
  R('religion.the-setting-out', 'located_in', CITY.orath, 'the water-road drovers set out at the crust margin'),
  R('religion.the-setting-out', 'worships', 'creature.salt-mason', 'the masons build the towers, so the towers are the dead continuing'),
  R('religion.the-setting-out', 'contests', 'faction.pale-assay', 'named towers are not to be worked, and the new grade cards do not mention names'),
  R('religion.the-setting-out', 'affects', 'mechanic.the-sift-line', 'the richest grades come off ground the rite has declared unworkable'),
  R('religion.the-setting-out', 'related_to', 'deposit.nitre-flats', 'the settings lie beyond the worked crust and the crust is moving'),
  R('religion.the-setting-out', 'related_to', 'item.indenture-bond', 'papers are read over the body and set out with it if the term is unclosed'),
  R('religion.the-setting-out', 'contests', 'npc.tazrit-nourem', 'her strongroom holds the papers families need before they can bury their own'),
  R('npc.sahat-belek', 'member_of', 'religion.the-setting-out', 'a pan-walker paid to check settings; he knows where every named tower stands'),
  R('quest.pan-fever', 'involves', 'religion.the-setting-out', 'the fraction that pays best comes off tower stock'),

  /* --- The Unyoking ------------------------------------------------ */
  R('religion.the-unyoking', 'located_in', CITY.arenaCity, 'the Drovers\' Camp, the pens, and a third of the crowd trades'),
  R('religion.the-unyoking', 'located_in', REGION.ashenSteppe, 'the herding clans entire'),
  R('religion.the-unyoking', 'located_in', CITY.siftingCity, 'carried in under bond, and visible at once by the salt refusal'),
  R('religion.the-unyoking', 'worships', 'creature.yokeback', 'the image the whole teaching is built from, and a trade good besides'),
  R('religion.the-unyoking', 'contests', 'machine.the-char-retorts', 'a body rendered is a carrying that never stopped'),
  R('religion.the-unyoking', 'contests', 'faction.red-writ', 'the Ring keeps a share of a person the clans hold must go out whole'),
  R('religion.the-unyoking', 'related_to', 'faction.bondwrights-hall', 'the recovery fund is booked as redemption and charged for accordingly'),
  R('religion.the-unyoking', 'affects', 'mechanic.ring-bond', 'a bond is not discharged by death, it follows the holder'),
  R('religion.the-unyoking', 'affects', 'recipe.brine-clarification', 'the salt taboo runs the length of the char chain'),
  R('religion.the-unyoking', 'related_to', 'deposit.moult-fields', 'the burrow lines are the burial ground and the scute harvest at once'),
  R('religion.the-unyoking', 'rival_of', 'religion.the-long-account', 'a debt that survives the debtor is either accuracy or theft, depending which city you are in'),
  R('npc.aylun-torgai', 'member_of', 'religion.the-unyoking', 'if she dies in the Ring her body is an asset and her people must buy it'),
  R('quest.the-indenture-column', 'involves', 'religion.the-unyoking', 'the recovery fund reads the manifests as a moral document'),

  /* --- The Carrying ------------------------------------------------ */
  R('religion.the-carrying', 'located_in', CITY.magicCity, 'the chalk sheds, the chain rota and Chalk Row'),
  R('religion.the-carrying', 'located_in', REGION.aethericScar),
  R('religion.the-carrying', 'located_in', 'district.magic-city-the-sinks', 'the licensed houses, and the burial yard it wants made a cemetery'),
  R('religion.the-carrying', 'worships', 'landmark.the-bound-fault', 'not reverence: the thing being held, and the reason the rota exists'),
  R('religion.the-carrying', 'related_to', 'landmark.the-ninth-chain', 'the roll is read aloud on every slippage anniversary'),
  R('religion.the-carrying', 'contests', 'faction.fetterhouse', 'wants the quenchspar yard made a burial ground; a licensing log cannot be one'),
  R('religion.the-carrying', 'affects', 'mechanic.the-toll', 'reframes Toll as mass carried rather than debt owed'),
  R('religion.the-carrying', 'related_to', 'material.quenchspar', 'members carry a graded block matched to their registered Toll'),
  R('religion.the-carrying', 'contests', 'skill.toll-shunting', 'the exact inversion of the faith, and the cult informs on it'),
  R('religion.the-carrying', 'related_to', 'skill.bleed-off', 'two members attend every licensed discharge'),
  R('npc.ysme-drannik', 'member_of', 'religion.the-carrying', 'she alone knows which two chains are dead, which the cult wants for religious reasons'),
  R('quest.the-chalk-that-lies', 'involves', 'religion.the-carrying', 'the best-informed witnesses in the city, and the least trusted'),

  /* --- The Given Weight -------------------------------------------- */
  R('religion.the-given-weight', 'located_in', CITY.skyCity, 'the Ring entire'),
  R('religion.the-given-weight', 'located_in', REGION.anvilShelf),
  R('religion.the-given-weight', 'located_in', 'district.sky-city-shelf-foot', 'known in detail, held in contempt, and used anyway'),
  R('religion.the-given-weight', 'related_to', 'landmark.the-ballast-drop', 'the only lawful funeral aloft is a scheduled release'),
  R('religion.the-given-weight', 'affects', 'mechanic.mass-warrant', 'turns an encumbrance regime into a set of manners'),
  R('religion.the-given-weight', 'related_to', 'faction.mooring-assize', 'descent permits for the dead are priced like any other freight'),
  R('religion.the-given-weight', 'contests', 'district.sky-city-shelf-foot', 'the ground households bury the Ring\'s dead and have been refused a fee twice'),
  R('npc.cesille-vaudry', 'member_of', 'religion.the-given-weight', 'her forged returns are a lie about what the city has agreed to carry'),

  /* --- The Standing Dead ------------------------------------------- */
  R('religion.the-standing-dead', 'located_in', REGION.greatwood, 'the outwood hearth-clans and most tribute villages'),
  R('religion.the-standing-dead', 'located_in', CITY.treeCity, 'the yard labour, quietly and at some risk'),
  R('religion.the-standing-dead', 'worships', 'deposit.standing-fifty', 'fifty trunks, each of them somebody\'s cemetery'),
  R('religion.the-standing-dead', 'related_to', 'creature.bolewright-wasp', 'the wasp cuts the chamber; the family only opens it'),
  R('religion.the-standing-dead', 'contests', 'faction.pitchguard', 'a felling licence is an exhumation order with a sawmill attached'),
  R('religion.the-standing-dead', 'contests', 'district.tree-city-pitch-yards', 'burning worked bole timber is the continuous atrocity'),
  R('religion.the-standing-dead', 'affects', 'material.blackbole-timber', 'a beam from a named bole may hold a body, and the licences do not follow the buyer'),
  R('religion.the-standing-dead', 'related_to', 'landmark.bastion-bole', 'the six named boles are rotting, and the clans have an explanation'),
  R('npc.vetla-torvik', 'member_of', 'religion.the-standing-dead', 'sells the routes the dead go out on, and the living with them'),
  R('quest.the-felling-order', 'involves', 'religion.the-standing-dead', 'the order destroys the chambered dead of everyone who ever lived in that trunk'),

  /* --- Proof -------------------------------------------------------- */
  R('religion.proof', 'located_in', CITY.mediterranean, 'the patent roll, the workshops and the funeral clubs'),
  R('religion.proof', 'located_in', REGION.meridianCoast),
  R('religion.proof', 'located_in', 'district.mediterranean-city-the-mole', 'the club vaults and the seasonal reading of the tables'),
  R('religion.proof', 'related_to', 'landmark.the-tide-orrery', 'read aloud each season and checked against the last, in the open'),
  R('religion.proof', 'related_to', 'faction.conduit-college', 'the philosophy\'s institution and the one body on the coast nobody can hold liable'),
  R('religion.proof', 'affects', 'skill.proof-marking', 'a mark is a liability first and a certification second'),
  R('religion.proof', 'contests', 'religion.the-carrying', 'a Fetterhouse number says who may work, not that the work holds'),
  R('religion.proof', 'contests', 'faction.fetterhouse', 'the coast declines to accept a licence as evidence of anything but permission'),
  R('religion.proof', 'related_to', 'spell.the-witnessing', 'certainty about a memory is not certainty about an event'),
  R('religion.proof', 'related_to', 'item.orrery-tables', 'the tables are the coast\'s standing public demonstration'),
  R('npc.melitta-aspri', 'member_of', 'religion.proof', 'correcting an instrument in private is the taboo she has been breaking for nine years'),
  R('quest.four-minutes-fast', 'involves', 'religion.proof', 'the drift is a professional death before it is a financial one'),
]
