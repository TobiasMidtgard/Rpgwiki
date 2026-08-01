/**
 * Magic: the fourteen workings the seed actually names.
 *
 * Magic here is infrastructure, not a wish machine. Every entry below accrues
 * [[mechanic.the-toll|Toll]] on a named person, and the whole regulatory
 * apparatus of [[city.magic-city|the Magic City]] exists because that debt is
 * physical and somebody has to decide whose body carries it.
 *
 * THREE TRADITIONS, three different assumptions about where the cost lands:
 *
 *   The Chalked Trade  — magic is load-bearing engineering. Draw it, file the
 *                        drawing, re-pay it on a schedule, and the debt falls
 *                        on the licensed hand named on the register. Seven of
 *                        the fourteen. Seated in the Magic City.
 *   The Wet Bench      — magic is chemistry with one impossibly dear reagent.
 *                        The debt goes into the bottle and the drinker carries
 *                        it, which is how the bench sleeps at night. Three of
 *                        the fourteen. Seated on the Meridian Coast.
 *   The Given Word     — magic binds obligations between named parties across
 *                        named boundaries. Holds that the cost falls on whoever
 *                        benefits rather than whoever works, which is legally
 *                        convenient and probably untrue. Two of the fourteen.
 *                        Seated in the Gilded Ascent.
 *
 * Two entries — the Souring and Calling the Run — are claimed by no tradition
 * at all, which is most of what makes them hanging matters.
 *
 * Everything about the shape of the cost depends on an unresolved decision:
 * see note.magic-cost-model.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

const TRADITION_CHALK = 'The Chalked Trade'
const TRADITION_BENCH = 'The Wet Bench'
const TRADITION_WORD = 'The Given Word'

/** Shared closing line for entries whose cost model is not yet settled. */
const COST_DEPENDS =
  '\n\nDEPENDS ON AN OPEN DECISION: this entry prices the working in Toll on a named practitioner. If ' +
  '[[note.magic-cost-model|the open question]] resolves toward a material or environmental cost instead, the ' +
  'numbers here move but the politics do not, because the licensing, the register and the queue are what make ' +
  'the entry playable.'

export const entities: SeedEntity[] = [
  /* ================================================================== */
  /* THE CHALKED TRADE                                                   */
  /* ================================================================== */

  E({
    id: 'spell.chalkline-ward',
    type: 'spell',
    name: 'Chalkline ward',
    aka: ['A line', 'Domestic warding'],
    status: 'draft',
    summary: 'The workhorse boundary ward of the licensed trade: it holds exactly what the filed drawing says it holds, and nothing else.',
    tags: ['ward', 'magic-city', 'licensed', 'baseline', 'infrastructure'],
    fields: {
      overview:
        'The first working anyone learns and the one every other ward is priced against. A chalkline is a closed line of ' +
        '[[material.ward-chalk|ward chalk]] laid on a floor, a sill or a road, pinned at the corners with ' +
        '[[item.ward-pin|ward pins]], and lodged as a drawing at a ward office before it counts as lawful.\n\n' +
        'It is also the foundation of the whole Chalked Trade, which holds that magic is load-bearing engineering: you draw ' +
        'it, you file the drawing, you re-cut it on a schedule, and the debt falls on the licensed hand whose name is on ' +
        'the register. That is a genuinely useful assumption and it is also a way of making sure there is always somebody ' +
        'to prosecute.\n\n' +
        'The craft is not the drawing. Anyone with a steady hand can lay 40 strides of line in a morning. The craft is the ' +
        'naming, because a line holds only what it is told to hold, and the class you failed to name walks through a ward ' +
        'that looks perfect. [[district.magic-city-chalk-row|Chalk Row]] is full of people whose entire trade is walking ' +
        'somebody else\'s route once a week and saying whether the line is still there.',
      discipline: 'Ward',
      tradition: TRADITION_CHALK,
      legalStatus: 'Licensed',
      effect:
        'Refuses passage to one named class of thing across a closed line. Standard filed classes are running water, open ' +
        'flame, a named person, a named animal, and the catch-all that most households actually buy: anything that has ' +
        'been dead more than a day.\n\n' +
        'A line that names nothing holds nothing. A line that names badly holds badly and gives no sign of it, which is ' +
        'why the reading trade exists and why a ward inspection is a service somebody pays for weekly rather than a spell ' +
        'somebody casts once.\n\n' +
        'One licensed hand lays about 40 strides of perimeter in a working day. Longer lines are laid by gangs and fail at ' +
        'the joins, which is why the standard commission is a house rather than a street.',
      range: TBD('Does a chalkline have to close? Every text says yes and two lodged drawings say otherwise: both run bank to bank across a road without meeting themselves, both have held for years, and the ward office has never ruled on whether they are lawful or simply lucky. The answer decides whether wards can be used to seal a route rather than a place.'),
      duration: 'A season under a roof. One shower of rain does it in an afternoon, and a chalk-louse colony does it silently over about nine days.',
      components: ['material.ward-chalk', 'item.ward-pin', 'item.chalked-harness'],
      cost: '2 to 3 Toll for a domestic perimeter, plus the chalk, the licence fee and a filed drawing that is public record',
      risks: [
        'Rain. A line laid outdoors is a line that will not survive the week, and half of all ward failures are weather.',
        'The filed drawing is public. Anyone who can read a ward office roll can read exactly what your house is afraid of.',
        '[[creature.chalk-louse|Chalk lice]] eat the marl and leave the line looking intact. A warded city can lose its wards overnight and not know until morning.',
        'A misnamed class reads as a working ward. Nobody discovers the error until the thing that was not named comes through it.',
        'Adulterated chalk assays clean and fails under load, which is the whole of [[quest.the-chalk-that-lies|the Chalk That Lies]].',
        'An unlicensed line is a criminal charge in the Magic City even where the line itself is harmless, because the offence is the absence of a name on a register.',
      ],
      skills: ['skill.chalk-hand', 'skill.ward-cutting', 'skill.toll-sense'],
      devNotes:
        PROPOSAL('The 40-strides-a-day rate, the named-class mechanic and the six standard filed classes are proposed. The manifest establishes the chalk, the licensed hand, the filed drawing, the rain and the chalk lice.') +
        '\n\nDESIGN INTENT: this is the tutorial ward and the price benchmark. Everything else in the magic list should be ' +
        'legible as a multiple of a chalkline. It should also be the entry point for the idea that magic in this world is ' +
        'maintenance: the interesting question is never "can you cast it" but "who is walking the line on Thursday".\n\n' +
        'Hook: the reading trade is a superb low-level job. A party paid to walk forty ward lines a week learns the layout ' +
        'of a district, whose house holds what, and which line somebody has quietly let die.' +
        COST_DEPENDS,
    },
  }),

  E({
    id: 'spell.holdfast-binding',
    type: 'spell',
    name: 'Holdfast binding',
    aka: ['A holdfast', 'The slab work'],
    status: 'draft',
    summary: 'Structural binding that fixes mass where it stands; it is how the Magic City keeps four thrown slabs of pavement in the air.',
    tags: ['magic-city', 'licensed', 'infrastructure', 'load-binding', 'disaster'],
    fields: {
      overview:
        'When the ground along [[landmark.the-bound-fault|the Bound Fault]] stopped agreeing with itself, sections of ' +
        'pavement were thrown out of true and four of them hung over the old town. The city did not move. It chained them, ' +
        'and it has been paying for that decision every sixty-one days since.\n\n' +
        'A holdfast fixes a mass in its present position and orientation against everything that would otherwise move it. ' +
        'It is not levitation and it does not care what the mass weighs; it cares how long the span is, how the load is ' +
        'distributed, and when the re-payment falls due. The binder computes all three, lays the working with a hand on the ' +
        'stone, and signs the [[landmark.the-load-roll|load roll]]. From that moment a specific named person owes a ' +
        'specific recurring debt, and the district under the slab is living on their schedule.\n\n' +
        'This is the clearest statement the world makes about what magic is here. The slabs are not a marvel. They are a ' +
        'liability with a maintenance contract, and the contract is written on people.',
      discipline: 'Spell',
      tradition: TRADITION_CHALK,
      legalStatus: 'Licensed',
      effect:
        'Fixes a mass in position for a rated interval. Rated in span rather than tonnage: a binding across 9 paces of ' +
        'unsupported slab is routine, 20 paces is specialist work, and nothing over 30 has held through two re-payments ' +
        'without a chain to help it.\n\n' +
        'The re-payment is the mechanic. On the due date the same binder, or a binder who has formally taken over the roll ' +
        'entry, re-lays the working. A lapsed holdfast does not weaken. It holds, and then it is not there, and whatever it ' +
        'was holding arrives on the street.',
      range: TBD('Can a holdfast be laid at a distance, or must the binder have a hand on the mass? Load Binding practice says contact only. Two entries in the chain-house incident book describe a slab re-rated by somebody who was demonstrably on the other side of it, and neither entry was ever closed.'),
      duration: 'Sixty-one days by the Chainwrights\' working schedule. The public register still prints ninety, and nobody has corrected it in eleven years.',
      components: ['material.ward-chalk', 'material.quenchspar', 'material.stairwire'],
      cost: '18 to 30 Toll per re-payment per span, charged to the binder named on the load roll, not to the district under it',
      risks: [
        'A lapsed re-payment drops the slab. There is no sag, no warning and no partial failure.',
        'Binder burnout. The roll is sorted by re-payment date, which makes it a published rota of who is going to be unable to work next.',
        'Short-alloyed chain links pass cold inspection and fail under sustained load; [[npc.toval-cherek|the chain-smith]] knows exactly which sections carry his work.',
        'A binder who dies, is struck off or is imprisoned takes their spans with them, and the transfer of a roll entry takes longer than sixty-one days.',
        'Nobody has settled whether the Toll falls on the hand that lays the binding or the office that commissioned it, so every serious accident is followed by a jurisdictional argument instead of a repair.',
        'The gap between the sixty-one-day working schedule and the ninety-day public register is a nine-day window in which a lapsed span is legally fine and physically not.',
      ],
      skills: ['skill.load-binding', 'skill.ward-cutting', 'skill.bench-sense'],
      devNotes:
        PROPOSAL('The span ratings, the sixty-one-day interval and the discrepancy with the printed ninety are proposed. The manifest establishes the scheduled re-payment, the public register and the drop on lapse.') +
        '\n\nDESIGN INTENT: the single best expression of magic-as-infrastructure in the seed. Use it for slow-burn dread. ' +
        'A holdfast never fails during a fight; it fails eleven days after a binder is arrested for something unrelated.\n\n' +
        'Hook: a party that reads the load roll can work out which districts are living on a burned-out binder\'s signature ' +
        'before the Chainwrights admit it. Selling that list is worth more than any single job in the city.' +
        COST_DEPENDS,
    },
  }),

  E({
    id: 'spell.dead-ground',
    type: 'spell',
    name: 'Dead ground',
    aka: ['A dead floor', 'The quiet'],
    status: 'draft',
    summary: 'A laid ward that refuses every working inside it, including healing, including discharges, and including the wards of whoever laid it.',
    tags: ['ward', 'magic-city', 'restricted', 'encounter-design', 'expensive'],
    fields: {
      overview:
        'Dead ground is the most expensive thing the Chalked Trade sells and the only one it will not lay on credit. Inside ' +
        'the bounded volume nothing works: no ward holds, no binding re-pays, no draught behaves as brewed, and no ' +
        'practitioner can discharge accrued Toll. It is not suppression and it cannot be pushed through. The volume simply ' +
        'refuses.\n\n' +
        'That is why it exists. A bonded vault laid on dead ground cannot be opened by a working, a court held on it cannot ' +
        'be swayed by one, and a bout fought on it is honest in a way the crowd can verify. [[city.arena-city|The Arena ' +
        'City]] keeps the largest single floor on the continent under the sand of [[landmark.the-sunken-ring|the Sunken ' +
        'Ring]], which is the real reason its fight cards are worth betting on.\n\n' +
        'The catch is symmetrical and absolute. The [[faction.fetterhouse|Fetterhouse]]\'s standing plan against a serious ' +
        'attack on the Magic City is dead ground laid across the approach streets, and every warden knows that the plan ' +
        'costs the wardens their own workings for as long as it holds.',
      discipline: 'Ward',
      tradition: TRADITION_CHALK,
      legalStatus: 'Restricted',
      effect:
        'Every working attempted inside the volume fails at the moment of attempt, with no partial result and no accrual ' +
        'refunded. Existing workings brought into the volume stop for as long as they are inside it and resume on the way ' +
        'out, except for holdfast bindings, which do not resume and have to be re-laid from scratch.\n\n' +
        'A sink cannot be built in dead ground and nobody has tried twice. A practitioner carrying Toll into dead ground ' +
        'keeps it, cannot bleed off, and is functionally a civilian until they walk out.',
      range: 'A bounded volume laid from the floor up. The Sunken Ring floor is 61 paces across and is the largest anyone has managed.',
      duration: TBD('Is dead ground actually permanent, or has nobody owned a floor long enough to find out? The oldest laid volume is under the Sunken Ring and its age is disputed by about forty years. If it decays at all, several vaults on this continent are not vaults any more and their owners do not know.'),
      components: ['material.faultglass', 'material.quenchspar', 'material.ward-chalk'],
      cost: 'A fortune in sorted faultglass and quenchspar, a second fortune to lift, and 30-plus Toll on the laying team split by negotiation before the work starts',
      risks: [
        'It refuses the defenders too. A city that lays dead ground across its approaches has disarmed its own wardens for the duration.',
        'No discharge inside. A caster who walks into dead ground carrying Toll cannot pay it down until they leave, and a siege makes that permanent.',
        'Laid under an occupied building it becomes a trap: anyone inside who depended on a working — a bound limb, a re-payment, a draught — has lost it and cannot be told why from outside.',
        'Faultglass cutters go deaf inside two years, and a dead-ground commission is several months of cutting.',
        'Possession of the faultglass to lay it is a capital charge in three cities, so the material is smuggled even when the ward is legal.',
        'Lifting it badly leaves patches. A partially lifted floor is worse than either state because nobody can map where the refusal still runs.',
      ],
      skills: ['skill.ward-cutting', 'skill.scar-reading', 'skill.load-binding'],
      devNotes:
        PROPOSAL('The symmetrical refusal, the 61-pace ceiling, the holdfast exception and the no-discharge rule are proposed. The manifest establishes that it refuses every working including healing and other wards, and that it costs a fortune twice over.') +
        '\n\nDESIGN INTENT: this is the encounter-design tool for magic-off spaces, and it should be used sparingly and ' +
        'always with a reason somebody paid for. Dead ground is never ambient. Somebody bought it, somebody is still paying ' +
        'for it, and the fact that it also disables the owner is the interesting half.\n\n' +
        'Hook: the no-discharge rule turns a dead-ground vault into a genuine prison for a caster. Locking a practitioner ' +
        'in one is not torture in any way a magistrate will recognise, and it kills them on a schedule.',
    },
  }),

  E({
    id: 'spell.lime-seal',
    type: 'spell',
    name: 'Lime seal',
    aka: ['A seal', 'The burnt frame'],
    status: 'draft',
    summary: 'Plague-house ward burnt into a doorframe: nothing living crosses it until the warden who laid it comes back and breaks it.',
    tags: ['ward', 'quarantine', 'state', 'restricted', 'dark'],
    fields: {
      overview:
        'A lime seal is cheap, fast and one-directional in the way that matters. A warden burns the mark into the frame of ' +
        'a door with lime and [[material.ward-chalk|chalk]], and from that moment nothing living passes it in either ' +
        'direction until the same warden, or a warden holding the same writ, breaks it.\n\n' +
        'It is the only ward in the list that is not sold. It is issued. In [[city.mediterranean-city|the Mediterranean ' +
        'City]] the writ sits with the harbour health office and the marks go up around ' +
        '[[district.mediterranean-city-the-lazaret|the Lazaret]] in the first hours of an outbreak, before anyone has ' +
        'agreed what the outbreak is. That speed is the argument for it and the argument against it in the same sentence.\n\n' +
        'Write this one honestly. A sealed household is forty people who cannot fetch water. The seal does not distinguish ' +
        'between the infected, the exposed and the four-year-old who was visiting, and every city that has used one has ' +
        'also used it at least once on people whose only symptom was being inconvenient.',
      discipline: 'Ward',
      tradition: TRADITION_CHALK,
      legalStatus: 'Restricted',
      effect:
        'A burnt frame refuses passage to anything living. It does not refuse air, water poured through a gap, or a rope ' +
        'lowered past a window, which is how sealed households are kept alive when anyone bothers.\n\n' +
        'Breaking a seal requires the warden\'s own hand or a warden holding the same numbered writ. Everything else — ' +
        'chisels, fire, another warding hand, a court order — leaves the frame intact and the seal working.',
      range: TBD('One opening per seal is the doctrine, and a house with three doors takes three writ numbers. What has never been settled is what a seal does about a shared wall, a cellar that connects to a neighbour\'s, or a roof hatch nobody surveyed. Three sealed households have emptied themselves through routes the writ did not name, and the health office recorded all three as escapes rather than as a fault in the ward.'),
      duration: 'Until broken. There is no expiry and no fail-safe, which is deliberate and is the part that kills people.',
      components: ['material.ward-chalk', 'material.tideset-cement'],
      cost: '6 Toll on the warden, a numbered writ, and the liberty and frequently the lives of everyone inside',
      risks: [
        'No expiry. A warden who dies, deserts or is reassigned leaves sealed households with no lawful route out and no one who can open them.',
        'It does not sort. The infected, the exposed, the uninfected and the visiting are sealed together and the second group becomes the first.',
        'Food and water do not cross either. A seal without a delivery rota is a death sentence administered slowly and in public.',
        'It is the perfect instrument for a purge with a public-health cover story, and has been used as one.',
        'Breaking a seal without the writ is impossible, so relatives who try are reduced to arson and are then hanged for it.',
        '[[npc.anthimos-vellani|Physicians]] who know an outbreak is coming sometimes do not report it, precisely because reporting it means seals, and seals mean the harvest and the harbour stop.',
      ],
      skills: ['skill.plague-reading', 'skill.chalk-hand', 'skill.writ-craft'],
      devNotes:
        PROPOSAL('The one-writ-one-opening rule, the no-expiry design and the air-and-rope exceptions are proposed. The manifest establishes the burnt doorframe, the warden\'s break and the cost to the people inside.') +
        '\n\nHANDLING: consequence, never spectacle. The seal is administrative violence and it should be written the way ' +
        'administrative violence actually reads: a form, a number, a warden who is tired, and a street that goes quiet. ' +
        'See [[note.dark-themes-handling|the handling note]].\n\n' +
        'Hook: [[quest.clean-bills|Clean Bills]] offers the seal as the fast, legal option that everybody remembers for a ' +
        'generation. It should always be available and never recommended.',
    },
  }),

  E({
    id: 'spell.held-temper',
    type: 'spell',
    name: 'Held temper',
    aka: ['A dated blade', 'Stamped work'],
    status: 'draft',
    summary: 'Enchantment that holds worked metal at its best temper until the stamped date, and then it goes glass-brittle without warning.',
    tags: ['enchantment', 'licensed', 'metalwork', 'proof-marking', 'trade'],
    fields: {
      overview:
        'A held temper does exactly one thing and does it perfectly: the metal stays as it was on the day it left the ' +
        'bench. An edge stops dulling, a spring stops taking a set, a die stops wearing. Every good workshop on the ' +
        'continent would buy the working for every piece it makes, and every good workshop can only afford it for the ' +
        'pieces that justify the fee.\n\n' +
        'The law caught up with it early and the law is the interesting part. A held piece must carry a stamped date, ' +
        'because on that date the working does not fade, it ends: the metal goes glass-brittle in the hand, and a falx that ' +
        'has taken four hundred blows shatters on the four hundred and first. Selling held work without a legible date is ' +
        'fraud in every city that keeps a proof register, and filing a date off a stamp is the most profitable single ' +
        'forgery in the trade.\n\n' +
        'The Chalked Trade claims it as a binding on an object, which is why the working is filed rather than brewed. The ' +
        '[[faction.conduit-college|Conduit College]] disputes that, holds it to be a property of the metal rather than of ' +
        'the smith, and has been arguing the point in front of a tariff board for nineteen years because the answer decides ' +
        'who collects the fee.',
      discipline: 'Enchantment',
      tradition: TRADITION_CHALK,
      legalStatus: 'Licensed',
      effect:
        'Fixes worked metal in its finished state. No dulling, no creep, no fatigue, no corrosion under the surface. Held ' +
        'work can still be bent, broken or cut by force; it simply does not degrade with use.\n\n' +
        'At the stamped date the metal becomes brittle throughout, all at once, with no visible change. A held tool is ' +
        'worth its full price the day before expiry and is scrap the day after, which is why the second-hand market in ' +
        'held work is where the frauds live.',
      range: TBD('Bench work only, or can a held temper be laid on a piece already in service? Every guild in the trade says no, and the Sky City lattice crews behave as though somebody says yes. If a fitting can be held in place, the whole liability model collapses, because the stamp would no longer be attached to the smith who made the piece.'),
      duration: 'Whatever the stamp says. Standard terms are two, five and nine years, priced accordingly, and nine is rare because few smiths will carry the liability that long.',
      components: ['material.blister-bar', 'material.blackfall-button', 'material.orrery-bronze'],
      cost: '9 Toll per piece on the binder, a proof fee, and the smith\'s stamped liability for what the piece does on the expiry date',
      risks: [
        'Expiry has no warning. Held work fails at full load because that is when people are using it.',
        'Filed and recut date stamps are the classic forgery and the reason [[skill.false-proof|False Proof]] is worth learning.',
        'An illiterate buyer cannot read the date, which is most of the market for second-hand held work.',
        'Held metal cannot be re-worked or re-tempered. Once the date passes, the piece is not repairable, only scrap.',
        'A held ballista limb or hoist fitting that expires in service takes people with it, and the liability chain runs back to a stamp that may be nineteen years old.',
        'The Conduit College and the Chalked Trade both claim the fee, so a piece stamped in one city is sometimes unlawful in another and nobody warns the carrier.',
      ],
      skills: ['skill.heat-reading', 'skill.proof-marking', 'skill.ward-cutting'],
      devNotes:
        PROPOSAL('The two/five/nine-year terms, the all-at-once brittleness and the nineteen-year jurisdictional argument are proposed. The manifest establishes the dated stamp, the never-dulling edge and the sudden glass-brittle failure.') +
        '\n\nDESIGN INTENT: the loot problem, solved economically. A held blade is a genuinely excellent weapon with an ' +
        'expiry date the player can read, which turns every piece of good equipment into a decision about when to sell it ' +
        'and to whom. It also gives the forgery economy something to forge that is not money.\n\n' +
        'Hook: a party that finds a cache of held work has found either a windfall or a crate of scrap, and the only way to ' +
        'know is to read the stamps and trust them.',
    },
  }),

  E({
    id: 'spell.weight-lending',
    type: 'spell',
    name: 'Weight lending',
    aka: ['Lending', 'Ballast work'],
    status: 'draft',
    summary: 'Borrows weight from one mass and puts it on another; the load has to go somewhere, and somebody owns the somewhere.',
    tags: ['gilded-ascent', 'licensed', 'hoists', 'ballast', 'murder'],
    fields: {
      overview:
        'The Gilded Ascent lifts bonded freight up 260 strides of escarpment by dropping tanks of river ballast down ' +
        'parallel shafts. On the two heaviest runs it also lends: a licensed hand takes weight off the rising load and puts ' +
        'it on the falling one, and the hoist does work it is not rated for. That is the entire reason the city has a ' +
        'ballast-rights market, and it is why [[machine.the-oxblood-hoists|the Oxblood Hoists]] can move a cargo that no ' +
        'cable on the face could carry honestly.\n\n' +
        'Lending is conservative and merciless about it. Nothing is created and nothing is destroyed; weight is moved ' +
        'between two masses in sight of each other, and it stays moved until released. The receiving mass belongs to ' +
        'somebody, which is why the right to lend onto a given tank, barge or counterweight is bought and sold on the Stair ' +
        'like any other commodity.\n\n' +
        'Used on a person it is assault. Used carefully on a person it is how quiet murders are done in this city, because ' +
        'a man made twice his weight goes through a stair tread and a woman made a third of hers goes over a rail in a gust, ' +
        'and both read as accidents to everyone including the coroner.',
      discipline: 'Spell',
      tradition: TRADITION_CHALK,
      legalStatus: 'Licensed',
      effect:
        'Transfers apparent weight between two masses without moving either. Neither mass changes size, strength or ' +
        'inertia in any other respect, which is the part that kills people: a lightened crate still has its full momentum ' +
        'and a lightened person still lands with their full bones.\n\n' +
        'Licensed lending is capped by the ballast right, not by the lender. A right for four tonnes is a right for four ' +
        'tonnes whether the lender could manage forty.',
      range: 'Both masses in the lender\'s sight and within about 30 strides. Lending onto something you cannot see is unlawful everywhere and is done constantly.',
      duration: 'Until released. A lender who is knocked unconscious does not release, which is worse than it sounds for whoever is under the load.',
      components: TBD('What is actually consumed in a lending? The licensed shops bill for sealed levin salt and ground quenchspar and can show the receipts. The unlicensed hands working the lower terraces carry nothing in their pockets and get the same result off the same cables, and no assayer has been willing to explain the difference in writing. Either the licensed materials are theatre attached to a fee, or the unlicensed lenders are paying in something nobody is metering.'),
      cost: 'About 1 Toll per two tonnes moved, plus a purchased ballast right on the receiving mass and a logged entry against the hoist run',
      risks: [
        'The weight lands somewhere and that somewhere is owned. Lending onto an unbought mass is theft of ballast rights and is prosecuted as such.',
        'A cable rated against a lent weight is rated against a lie. When the lender stops, the cable finds out first.',
        'Used on a person it is assault, and the injuries do not look like an assault to anyone examining the body.',
        'In [[city.sky-city|the Sky City]] every gram aboard is licensed, so any lending at all is ballast fraud and ballast fraud is a capital charge.',
        'Unconscious lenders do not release. A lender struck down mid-run leaves both masses wrong until somebody else finds the working and unpicks it.',
        'The market in ballast rights means the people who can afford to lend are the people who least need to, and the unlicensed hands working the lower terraces are lending onto whatever is nearest.',
      ],
      skills: ['skill.load-binding', 'skill.cable-and-drum', 'skill.toll-sense'],
      devNotes:
        PROPOSAL('The 30-stride sight rule, the tonne-per-half-Toll rate and the unconscious-lender failure are proposed. The manifest and the city entry establish licensed lending on the heaviest hoist runs, the ballast-rights market and the difficulty of proving a hoist murder.') +
        '\n\nDESIGN INTENT: the one working in the list that is primarily an economy rather than a spell. Ballast rights ' +
        'should be tradeable, priced, and forgeable, and a party with a licence has a legitimate business that happens to ' +
        'also be the perfect murder.\n\n' +
        'Hook: [[npc.brask-vellmar|a cable inspector]] who signs off a run that was lent against knows the cable is rated ' +
        'on a fiction. He is already carrying one of those.' +
        COST_DEPENDS,
    },
  }),

  E({
    id: 'spell.paired-slate',
    type: 'spell',
    name: 'Paired slate',
    aka: ['A pair', 'Registry slates'],
    status: 'draft',
    summary: 'Two slates that share writing for about four thousand words, then go dumb; either half reads everything, and every pair is registered.',
    tags: ['enchantment', 'communication', 'legal', 'surveillance', 'magic-city'],
    fields: {
      overview:
        'Cleave two leaves off the same block of [[material.sunwell-mica|Sunwell mica]], bind them at a bench in ' +
        '[[city.magic-city|the Magic City]], and whatever is written on one appears on the other. It is the only reliable ' +
        'communication at distance the continent has, it is the only working in this list that is outright legal, and those ' +
        'two facts are related in a way people prefer not to say aloud.\n\n' +
        'A pair carries about four thousand words from the first mark and then goes dumb. Nobody has found a way to reset ' +
        'one. That word count is the real design of the thing: correspondents write like misers, meaning is compressed out ' +
        'of messages, and half the diplomatic accidents of the last decade come from a factor saving nine words.\n\n' +
        'Both halves show everything. There is no private side to a pair, so a captured slate reads your correspondence ' +
        'from the moment of capture, and a pair handed to a subordinate is a permanent open window into their work. The ' +
        'registry compounds this: every binding is entered against both holders by name, so the roll in the ward office is ' +
        'a live map of who is talking to whom the length of the continent. [[faction.bonewax-post|The Bonewax Post]] reads ' +
        'the roll as a matter of course, and sells what it infers by subscription.',
      discipline: 'Enchantment',
      tradition: TRADITION_CHALK,
      legalStatus: 'Legal',
      effect:
        'Writing made on either slate appears on the other within a few heartbeats, in the writer\'s own hand. Erasure is ' +
        'shared. Drawings work; anything requiring colour does not.\n\n' +
        'The count is of words written, not words sent, so a corrected sentence costs twice. A spent pair looks and feels ' +
        'exactly like a live one, which is the standard fraud in the second-hand market.',
      range: TBD('No limit has been found, but the furthest deliberately tested pair only ran between the Meridian Coast and the Sifting City. Whether distance costs words out of the four thousand, and whether a pair works across open water, are both unknown, and both matter enormously to whether Keth Veyra and the Eastern Deep can be talked to at all.'),
      duration: 'About four thousand words from the first mark. There is no way to reset a spent pair and no way to tell a spent one by looking.',
      components: ['material.sunwell-mica', 'material.levin-salt', 'item.ward-pin'],
      cost: '14 Toll at the binding bench, split across the pair, plus a registry entry naming both holders in perpetuity',
      risks: [
        'Either half reads everything. A captured slate is a live tap and gives no sign at the other end.',
        'The registry names both holders. Anyone with access to the roll knows every correspondence in the city, which is most of the value of the Magic City\'s ward office to outsiders.',
        'The word count makes people terse and terse messages are misread. Several documented disasters begin with a nine-word instruction.',
        'Spent pairs are indistinguishable from live ones, so buying a pair second-hand is a coin flip nobody can call.',
        'Unregistered pairs exist and are worth a great deal precisely because they are not on the roll; possession is a fine rather than a crime, which makes them the standard tool of anyone with a secret and money.',
        'A pair is evidence. The slate itself carries the last four thousand words of whatever it was used for, and burning mica does not erase it.',
      ],
      skills: ['skill.ward-cutting', 'skill.plain-letters', 'skill.reagent-work'],
      devNotes:
        PROPOSAL('The four-thousand-word count, the shared-visibility rule, the no-reset limitation and the registry-as-surveillance reading are proposed. The manifest establishes the shared writing, the rough word budget, the both-halves-read-everything property and the registry.') +
        '\n\nDESIGN INTENT: give the world long-distance communication without giving it a telegraph, and make the one ' +
        'legal working in the list legal for a bad reason. The state permits paired slates because paired slates report on ' +
        'their users. That is the whole entry.\n\n' +
        'Hook: a word budget is a genuinely good play mechanic. Give a party a pair with 300 words left and a decision to ' +
        'coordinate, and watch them argue about adjectives.',
    },
  }),

  /* ================================================================== */
  /* THE WET BENCH                                                       */
  /* ================================================================== */

  E({
    id: 'spell.arrears-draught',
    type: 'spell',
    name: 'Arrears draught',
    aka: ['Arrears', 'The deferral'],
    status: 'draft',
    summary: 'A draught that defers the body\'s debt for a working, at interest, and collects at a moment the drinker does not choose.',
    tags: ['potion', 'toll', 'restricted', 'addiction', 'grey-casting'],
    fields: {
      overview:
        'The Wet Bench holds that magic is chemistry with one impossibly dear reagent, and that the debt can be moved into ' +
        'the bottle so that the drinker carries it instead of the maker. Arrears draught is the tradition\'s clearest and ' +
        'most cynical product: it does not reduce the Toll, cancel it or discharge it. It defers it, and it charges for the ' +
        'deferral.\n\n' +
        'Six to nine hours after drinking, a practitioner can keep working. Nothing accrues that they can feel. Everything ' +
        'accrues anyway, plus roughly half again, and it falls due inside the fortnight at a time nobody selects. A binder ' +
        'on arrears finishes a re-payment schedule and collapses on a stair four days later. That is the transaction and ' +
        'every buyer knows it.\n\n' +
        'It is restricted in most cities and sold in all of them, including the ones that hang people for selling it, ' +
        'because the alternative for an over-quota practitioner is stopping work. [[faction.fetterhouse|The Fetterhouse]] ' +
        'has never seriously moved against the trade, and the reason is arithmetic: the licence roll does not have enough ' +
        'hands on it to hold the chains without arrears.',
      discipline: 'Potion',
      tradition: TRADITION_BENCH,
      legalStatus: 'Restricted',
      effect:
        'Suspends the sensation and the immediate physical consequence of accrued Toll for six to nine hours. Work done ' +
        'under arrears accrues normally, plus about half again as the deferral charge, and the whole balance surfaces at ' +
        'once at an unpredictable point inside the following fortnight.\n\n' +
        '[[skill.toll-sense|Toll Sense]] reads nothing useful under arrears, which is the trap: the one instrument a ' +
        'trained caster trusts goes quiet exactly when they most need it.',
      range: 'Ingested. One dose, one practitioner.',
      duration: 'Six to nine hours of deferral. The arrears fall due within the fortnight and choose their own hour.',
      components: ['material.quietmilk', 'material.levin-salt', 'material.quenchspar'],
      cost: 'The Toll you did not pay plus half again, collected without warning inside a fortnight, at the price of a week\'s wages a dose',
      risks: [
        'The collapse chooses its own moment. On a stair, on a lattice, mid-binding, mid-surgery.',
        'Badly stored batches move the moment earlier and give no sign of having done so; shelf life is the whole of the maker\'s craft.',
        'Stacking doses compounds the deferral charge. Three days on arrears is a debt no sink allocation can absorb in one visit.',
        'It is what the wardens look for. A practitioner found collapsed with no logged discharges is presumed to be grey casting and prosecuted on that presumption.',
        'It is habit-forming in the specific way that matters: the habit is working, not drinking, and stopping means losing a licence, a contract or a district.',
        '[[npc.halvo-sarn|Backdated permits]] and arrears are the same market. A practitioner buying one is usually buying both.',
      ],
      skills: ['skill.reagent-work', 'skill.toll-sense', 'skill.grey-casting'],
      devNotes:
        PROPOSAL('The six-to-nine-hour window, the half-again interest, the fortnight collection and the Toll Sense blindness are proposed. The manifest establishes the deferral, the interest and the collapse at a moment the drinker does not choose.') +
        '\n\nDESIGN INTENT: the pressure valve that makes the Toll a story instead of a tax. A party that cannot get a sink ' +
        'booking can always buy arrears, and the cost is a scene four sessions later that nobody scheduled. Track the debt ' +
        'openly and let the collapse land where it lands.\n\n' +
        'This entry is the one most sensitive to [[note.magic-cost-model|the open question]]. If magic costs material rather ' +
        'than body, arrears becomes a credit instrument rather than a physiological one and belongs in the Given Word ' +
        'instead of the Wet Bench.',
    },
  }),

  E({
    id: 'spell.stillwater-draught',
    type: 'spell',
    name: 'Stillwater draught',
    aka: ['Stillwater', 'The cutter\'s draught'],
    status: 'draft',
    summary: 'Surgical paralytic rendered from mistfall bell filament: it stops the body and not the pain, and about one patient in nine never breathes again.',
    tags: ['potion', 'licensed', 'surgery', 'mistfall-coast', 'dark'],
    fields: {
      overview:
        'The only reliable surgical paralytic on the continent, and the reason [[skill.bonewright|bonewrights]] can set a ' +
        'shattered femur at all. Rendered from the stinging filament of the [[creature.mistfall-bell|mistfall bell]] by ' +
        'divers who lose sensation in their hands over about four seasons and then, reliably, drown.\n\n' +
        'It stops the body. It does not stop the pain, and the patient is conscious throughout. Cutters who can afford it ' +
        'pair the draught with [[item.cinderroot-cordial|cinderroot cordial]] or with a great deal of spirits, and cutters ' +
        'who cannot simply work faster. There is nothing better and nothing else. A great deal of survivable surgery on ' +
        'this continent is paid for by [[region.mistfall-coast|one cold coast]] in a currency it does not advertise.\n\n' +
        'The Wet Bench licenses it to cutters by name and dose, which is the tradition at its most defensible: a bench that ' +
        'holds the debt goes into the bottle is at least obliged to say exactly how much is in each bottle.',
      discipline: 'Potion',
      tradition: TRADITION_BENCH,
      legalStatus: 'Licensed',
      effect:
        'Complete voluntary paralysis within about ninety seconds, including the muscles of the chest. Breathing is ' +
        'maintained by whoever is assisting, by hand, for the whole of the working. Sensation, hearing and awareness are ' +
        'untouched.\n\n' +
        'There is no antagonist and no way to shorten the effect. Once dosed, the patient and the room are committed for ' +
        'the full duration.',
      range: 'Swallowed, or introduced to a wound. Contact with broken skin is enough, which is how the accidents happen.',
      duration: 'Twenty to fifty minutes depending on dose and body weight, and nothing brings it back sooner.',
      components: TBD('Every licensed bench renders the filament differently, bills for quietmilk and sealed clearcast ware, and insists the other benches produce a worse dose. Nobody has established whether the one-in-nine belongs to the animal, the render or the guessed dose. That comparison is the single piece of research on this continent that would save the most lives, and no city will fund it because funding it means publishing the mortality figure.'),
      cost: '3 Toll on the render, a licensed cutter\'s name against the dose, and about one patient in nine who does not start breathing again',
      risks: [
        'Roughly one in nine never resumes breathing. That is the accepted rate, it has not improved in thirty years, and every cutter knows the number before they pour.',
        'The patient feels everything and can neither move nor make a sound about it.',
        'Dosing is by body weight and most benches have no accurate balance, so the margin between paralysis and death is guessed.',
        'Contact with an open wound doses whoever is holding the retractor as readily as the patient.',
        'It is a superb murder weapon. A stillwater death reads as heart failure and the [[skill.venom-work|bench that makes the antidote work makes the murder]] on the same shelf.',
        'The harvest kills the divers. Every barrel of it is priced against hands that have stopped working and people who drowned because of it.',
      ],
      skills: ['skill.reagent-work', 'skill.venom-work', 'skill.bonewright'],
      devNotes:
        PROPOSAL('The ninety-second onset, the twenty-to-fifty-minute duration, the assisted-breathing requirement and the weight-based dosing are proposed. The manifest establishes the mistfall bell source, the stops-the-body-not-the-pain property, the one-in-nine mortality and the licensed cutters.') +
        '\n\nDESIGN INTENT: this is what "no healing magic" costs. The world has surgery, the surgery works, and it is ' +
        'horrifying. Any scene involving a serious injury should be able to reach for this, and reaching for it should be a ' +
        'decision with a stated one-in-nine.\n\n' +
        'Hook: a party carrying stillwater is carrying both an anaesthetic and an untraceable poison, and a magistrate who ' +
        'finds it on them will assume the second.',
    },
  }),

  E({
    id: 'spell.yokebreak-draught',
    type: 'spell',
    name: 'Yokebreak draught',
    aka: ['Yokebreak', 'Ring cup'],
    status: 'draft',
    summary: 'Arena draught rendered from a separated yokeback\'s gland: days of fight in a cup, paid for in the faces you stop being able to recognise.',
    tags: ['potion', 'arena-city', 'contraband', 'bonded-labour', 'dark'],
    fields: {
      overview:
        'Separate a [[creature.yokeback|yokeback]] from the shrunken mate fused to its flank and the animal goes into a ' +
        'frenzy that lasts days. The under-stables of [[city.arena-city|the Arena City]] sell that frenzy by the animal ' +
        'and render the severed gland into yokebreak, which does the same thing to a person on a smaller and more ' +
        'marketable scale.\n\n' +
        'A cup buys two to four days of tirelessness, pain tolerance and a hard, flat aggression that fight crowds have ' +
        'learned to recognise and bet against. It costs faces. The drinker loses the ability to recognise people by sight ' +
        'for about a week, and after roughly the fourth cup they do not get it back. Ring fighters who have been on it for ' +
        'a season greet their own families by voice and have stopped being embarrassed about it.\n\n' +
        'Legal in the Arena City, where the Ring is the licensing authority and has no interest in restricting its own ' +
        'pharmacy, and contraband everywhere else. The dark part is not the drug. The dark part is that a bonded fighter ' +
        'does not choose whether to drink it, and the dose is written into the fight card as a stipulation.',
      discipline: 'Potion',
      tradition: TRADITION_BENCH,
      legalStatus: 'Varies by city',
      effect:
        'Two to four days of frenzy: no fatigue accumulation, greatly reduced pain response, and a marked narrowing of ' +
        'attention onto whoever is in front of the drinker. Followed by about a fortnight of being no use to anybody.\n\n' +
        'Prosopagnosia sets in within hours and lasts roughly a week. It is cumulative and it becomes permanent somewhere ' +
        'around the fourth dose, though nobody has kept records good enough to say exactly.',
      range: 'Drunk. One cup, one person.',
      duration: 'Two to four days of frenzy, a fortnight of collapse afterwards, and a week of face-blindness that stops being a week.',
      components: ['item.cinderroot-cordial', 'material.quietmilk', 'material.levin-salt'],
      cost: '5 Toll on the render and the drinker\'s ability to recognise faces, for a week and then for good',
      risks: [
        'Reduced pain response means fighters do not notice the injury that kills them until they sit down.',
        'Face-blindness becomes permanent, and there is no treatment and no register of who it has already happened to.',
        'The gland must be taken from a living separated pair, so every cup has an animal behind it that spent days in a frenzy first.',
        'Contraband outside the Arena City. A cup in a Mediterranean harbour is a charge that carries a bond term, which delivers the drinker back to the Ring.',
        'Bonded fighters are dosed as a stipulation of the card and cannot refuse. [[npc.berke-chagra|Bookmakers]] price against the stipulation and clean up.',
        'It stacks badly with cinderroot cordial, which is what it is usually cut with, and the combination takes the hands as well as the faces.',
      ],
      skills: ['skill.venom-work', 'skill.reagent-work', 'skill.yoke-and-tether'],
      devNotes:
        PROPOSAL('The two-to-four-day window, the fourth-dose threshold and the cordial interaction are proposed. The manifest establishes the yokeback gland, the frenzy, the pain tolerance, the face-blindness and the Arena City legality.') +
        '\n\nHANDLING: the consequence is a specific, unglamorous disability that persists for the rest of the campaign. A ' +
        'character who takes the fourth cup stops recognising the party by sight, permanently, and the game should keep ' +
        'playing. See [[note.dark-themes-handling|the handling note]].\n\n' +
        'Hook: [[npc.aylun-torgai|a fighter sixteen wins deep]] has been dosed to the card more times than she has counted, ' +
        'and the reason she has not counted is the reason she cannot.',
    },
  }),

  /* ================================================================== */
  /* THE GIVEN WORD                                                      */
  /* ================================================================== */

  E({
    id: 'spell.the-witnessing',
    type: 'spell',
    name: 'The Witnessing',
    aka: ['A witnessing', 'Fixed testimony'],
    status: 'draft',
    summary: 'Court ritual that fixes a memory as admissible testimony, exactly as it was, once, at the cost of the memory itself.',
    tags: ['ritual', 'law', 'licensed', 'testimony', 'dark'],
    fields: {
      overview:
        'The Given Word holds that magic binds obligations between named parties, and that the cost falls on whoever ' +
        'benefits rather than whoever works. That doctrine is legally convenient, it is the reason notaries rather than ' +
        'casters run the tradition, and the Witnessing is the entry that proves it is not true.\n\n' +
        'A witness sits with an officiant, a shard of [[material.faultglass|faultglass]] and a court roll. The memory goes ' +
        'into the shard, complete and unedited, and can be read out by any magistrate holding the roll. It is exact, it is ' +
        'not interpretable, and it cannot be recanted.\n\n' +
        'It also takes the memory. Not blurs it: takes it, along with everything attached to it. Witnesses come out ' +
        'unable to recall the face of a person they saw daily, the year they married, or in one recorded case a child\'s ' +
        'name. Perjury has become effectively impossible in the three cities that use it and blackmail has become trivially ' +
        'easy, because everyone now knows exactly what a truthful person can be made to lose.',
      discipline: 'Ritual',
      tradition: TRADITION_WORD,
      legalStatus: 'Licensed',
      effect:
        'Fixes one continuous remembered episode into a faultglass shard as an exact, replayable record. The record is ' +
        'admissible in the Mediterranean City, the Gilded Ascent and the Arena City writ court, and is inadmissible or ' +
        'unrecognised everywhere else.\n\n' +
        'The witness loses the episode permanently, together with associated memory that the ritual cannot separate from ' +
        'it. There is no partial fixing, no second attempt, and no way to give the memory back.',
      range: TBD('Four hours with the witness, the officiant and the shard in one room is standard practice and may be nothing more than practice. Nobody has established whether the officiant is required at all, or whether the shard does the work. If it is the shard, a memory can be taken from somebody who never agreed to sit, and every court on the continent has an interest in not finding out.'),
      duration: 'The record is permanent. So is the loss.',
      components: ['material.faultglass', 'material.ward-chalk', 'material.levin-salt'],
      cost: 'The memory itself, permanently and with whatever it was attached to, plus 12 Toll on the officiant and a court fee most witnesses cannot meet',
      risks: [
        'The loss is not confined to the episode. Associated memory goes with it and nobody can predict how much.',
        'A witness who has given a Witnessing cannot be cross-examined about it, because they no longer know anything.',
        'Blackmail becomes easy. A person who can prove something can be made to prove it, and everyone can see exactly what that costs them.',
        'Faultglass possession is a capital charge in three cities, so the instrument of lawful testimony is contraband a day\'s travel from the courthouse.',
        'The wrong episode can be fixed. A frightened witness who reaches for the wrong hour loses that hour and has nothing to offer the court.',
        'Poor witnesses are paid to give testimony they were not present for the value of, which is legal, common, and how the Given Word makes most of its money.',
      ],
      skills: ['skill.writ-craft', 'skill.the-cold-read', 'skill.ward-cutting'],
      devNotes:
        PROPOSAL('The faultglass shard, the four-hour ritual, the three-city admissibility and the associated-memory loss are proposed. The manifest establishes the exact-once fixing, the permanent cost to the witness and the perjury-impossible, blackmail-easy consequence.') +
        '\n\nDESIGN INTENT: an investigation tool with a price the players have to charge somebody. The Witnessing solves ' +
        'any evidentiary problem in the game and should therefore almost never be used, because using it means asking a ' +
        'named NPC to give up part of their life.\n\n' +
        'Hook: [[npc.ilke-samarost|a dead ledger-clerk]] cannot be witnessed, which is exactly why her audit is worth what ' +
        'it is worth. [[npc.aubran-ferrieu|A stripped registrar]] can be, wants a hearing rather than money, and has not ' +
        'yet been asked what he would lose.',
    },
  }),

  E({
    id: 'spell.debt-mark',
    type: 'spell',
    name: 'Debt mark',
    aka: ['A mark', 'The gate mark'],
    status: 'draft',
    summary: 'A binding worked into the skin that will not let a person cross a named boundary until the debt behind it is discharged.',
    tags: ['curse', 'indenture', 'law', 'extradition', 'dark'],
    fields: {
      overview:
        'An [[item.indenture-bond|indenture bond]] is a jurisdiction. Its power stops at a line on a map printed on the ' +
        'back of it, which is why runaways run in one direction. A debt mark closes that gap: it makes the bond ' +
        'self-enforcing at a gate and turns a piece of paper into a physical fact on a person\'s body.\n\n' +
        'A notary of the Given Word works the mark into the skin, names the boundary, and files the entry. From that moment ' +
        'the marked person cannot cross the named line while the debt stands. No gate, no bridge, no barge. They can see ' +
        'the other bank.\n\n' +
        'Lawful indenture in [[city.arena-city|the Arena City]] and [[city.sifting-city|the Sifting City]], recognised and ' +
        'enforced in [[city.gilded-ascent|the Gilded Ascent]], and a capital crime in ' +
        '[[city.mediterranean-city|the Mediterranean City]], where a marked person walking down a street is standing ' +
        'evidence against whoever marked them. Every runaway is therefore an extradition case and every extradition case ' +
        'is a fight about which city\'s law travels.',
      discipline: 'Curse',
      tradition: TRADITION_WORD,
      legalStatus: 'Varies by city',
      effect:
        'The marked person cannot voluntarily cross the named boundary. Attempting it is not painful and is not resisted; ' +
        'the crossing simply does not happen, and observers describe the person stopping and turning aside as though they ' +
        'had changed their mind.\n\n' +
        'Being carried across unconscious does not work either. The mark reads the person, not the intent, which is a fact ' +
        'several rescue attempts have established at considerable cost.',
      range: 'One named boundary: a city gate, a river, a toll reach, or the jurisdiction printed on a bond register.',
      duration: 'Until the debt is discharged and the mark formally drawn. A drawn mark leaves a scar in the shape of the boundary it named.',
      components: ['item.indenture-bond', 'material.ward-chalk', 'material.levin-salt'],
      cost: '8 Toll on the notary, billed to the creditor; the marked person pays in a boundary they will not cross for as long as the bond runs',
      risks: [
        'Bonds are assignable up to four times before re-registration, so a mark routinely outlives the creditor who bought it and the reason it was written.',
        'A person who cannot cross a boundary cannot flee a fire, a flood or a sluice release. Marked crews have drowned within sight of a bank they were standing on.',
        'Marks are drawn on children as part of inherited bonds, which is lawful in two cities and is the single ugliest fact in this section of the wiki.',
        'A badly named boundary generalises. Marks that named "the river" have left people unable to cross any water at all, and there is no appeal and no correction.',
        'Self-mutilation does not remove it. This is well known and people still try, and the surgery kills more of them than the bond ever would have.',
        'In the Mediterranean City the mark is evidence of a capital crime committed by somebody else, so the marked person is simultaneously the victim, the witness and the inconvenience.',
      ],
      skills: ['skill.bond-broking', 'skill.writ-craft', 'skill.ward-cutting'],
      devNotes:
        PROPOSAL('The unconscious-carry rule, the boundary-shaped scar, the generalisation failure and the four-assignment limit are proposed. The manifest establishes the skin binding, the named boundary, the discharge condition and the split legality.') +
        '\n\nHANDLING: this is the central dark-labour hook and it must be written as an institution rather than a horror. ' +
        'Marks are boring, common, filed in triplicate and defended by respectable people with reasonable arguments. See ' +
        '[[note.dark-themes-handling|the handling note]].\n\n' +
        'Hook: freeing marked people is not a fight, it is a discharge, and a discharge needs money or a notary or a ' +
        'jurisdiction that will not honour the entry. [[quest.the-indenture-column|The Indenture Column]] is where that ' +
        'argument gets made at scale.',
    },
  }),

  /* ================================================================== */
  /* CLAIMED BY NO TRADITION                                             */
  /* ================================================================== */

  E({
    id: 'spell.the-souring',
    type: 'spell',
    name: 'The Souring',
    aka: ['A souring', 'Warehouse curse'],
    status: 'draft',
    summary: 'Trade curse that turns a warehouse\'s stock over three days, oil first, then grain, and spoils the caster\'s own larder on the same curve.',
    tags: ['curse', 'illegal', 'trade-war', 'sabotage', 'grey-casting'],
    fields: {
      overview:
        'Three days, and a bonded warehouse is worthless. The oil goes first and goes obviously, then the salted goods, ' +
        'then the grain, and on the fourth morning nothing in the space is fit to sell or eat. It cannot be arrested, ' +
        'reversed or salvaged, and insurance in the Gilded Ascent explicitly excludes it.\n\n' +
        'No tradition claims the Souring. The Chalked Trade will not file a drawing for it, the Wet Bench points out ' +
        'correctly that it is not a preparation, and the Given Word maintains that a curse against property with no named ' +
        'party is not a working at all. So it is grey work: unfiled, unmetered, and accruing Toll into a body that has no ' +
        'lawful way to discharge it.\n\n' +
        'The symmetry is the famous part. Whatever the caster owns that could spoil, spoils, on the same three-day curve, ' +
        'wherever in the world it is sitting. [[faction.pale-assay|Assayers]] and Concord investigators have known this for ' +
        'two generations, and the first thing a souring investigation does is not visit the warehouse. It visits larders.',
      discipline: 'Curse',
      tradition: 'Unaffiliated grey work; no tradition will file it',
      legalStatus: 'Illegal',
      effect:
        'Everything perishable within one bonded space spoils over three days in a fixed order: oils and fats, then cured ' +
        'and salted goods, then flour and grain. Sealed containers do not help. Metal, cloth, timber and stone are ' +
        'untouched, which is how a souring is distinguished from a fire or a flood at a glance.\n\n' +
        'The caster\'s own perishable property spoils on the same curve at the same time, at whatever distance. There is no ' +
        'known way to sever this.',
      range: TBD('One bonded space, entered once in person, is what every prosecution to date has assumed and what every convicted caster has admitted to. Two sourings in the last decade hit vaults with no matching entry in the gate log, and the Concord has quietly stopped citing the requirement in indictments without ever saying why.'),
      duration: 'Three days from oil to grain, then it stops. Nothing in the space is recoverable and the space itself is unaffected.',
      components: ['material.levin-salt', 'material.ward-chalk'],
      cost: 'Everything edible the caster owns, on the same three-day curve, plus 16 unmetered Toll with no lawful discharge available afterwards',
      risks: [
        'The symmetry convicts you. A souring investigation opens with the caster\'s own stores and closes about a week later.',
        'Warehouses are shared. A souring aimed at one consignment ruins every other tenant in the building, which turns one enemy into eleven.',
        'The Toll is unmetered and undischargeable, so a caster who sours twice in a season is looking at a surfacing they cannot book a sink for.',
        'It is illegal in all thirteen settlements with no exceptions and no licensed variant, which is unusual enough that possession of the method is itself the charge.',
        'A souring in a famine year is mass starvation with a signature on it, and has been prosecuted as such.',
        'It requires the caster to be physically inside the space, which means a witness, a gate log, or a bribed watchman who now owns them.',
      ],
      skills: ['skill.grey-casting', 'skill.fence-work', 'skill.toll-sense'],
      devNotes:
        PROPOSAL('The three-day spoilage order, the symmetric cost, the entered-in-person requirement and the insurance exclusion are proposed. The manifest establishes the three-day warehouse curse, the oil-then-grain order, the caster\'s own larder and the assayers who convict on it.') +
        '\n\nDESIGN INTENT: a sabotage tool whose cost is also its evidence, so that using it is a confession on a delay. ' +
        'It is the best available demonstration that magic in this world is not a clean instrument: it is loud, traceable ' +
        'and it hurts the person holding it.\n\n' +
        'Hook: somebody who sours a warehouse and does not go hungry has an accomplice, or no larder, or is not the caster. ' +
        'Any of the three is a case.',
    },
  }),

  E({
    id: 'spell.calling-the-run',
    type: 'spell',
    name: 'Calling the Run',
    aka: ['Calling', 'The early run'],
    status: 'draft',
    summary: 'Outlawed delta ritual that brings the lamprey run early and heavy by spending next year\'s, and the weir authority hangs people for it.',
    tags: ['ritual', 'the-drown', 'illegal', 'commons', 'hunger'],
    fields: {
      overview:
        'Once a year [[creature.blackrun-lamprey|the blackrun lamprey]] come up the delta to spawn in one three-week mass, ' +
        'and for three weeks the Drown eats smoked flesh and burns lamp oil and behaves like somewhere with a future. ' +
        'Calling the Run brings that forward by four to six weeks and roughly doubles it.\n\n' +
        'It also spends next year. The following run comes thin, and the one after that is still down by about a fifth. ' +
        'Everyone in the delta knows this. It is called anyway, in bad springs, by people who have done the arithmetic and ' +
        'concluded that next year is a problem for somebody who has eaten.\n\n' +
        'No tradition claims it and the delta does not write its workings down. Nine people stand in the water through a ' +
        'night at a named reach and it happens, and beyond that fewer than a hundred people know how, none of them ' +
        'practise anywhere the Chalked Trade can see, and none of them will say. The ' +
        '[[faction.iron-sluice-company|Iron Sluice Company]] treats a calling as theft of a future asset it happens to own ' +
        'and hangs the participants at the sluices, which is not a metaphor and is done in public.',
      discipline: 'Ritual',
      tradition: 'Delta practice, claimed by no tradition and written down by nobody',
      legalStatus: 'Illegal',
      effect:
        'Brings the annual lamprey run forward by four to six weeks and roughly doubles the mass of it. The following ' +
        'year\'s run comes in at about a third of normal and the year after that at about four fifths, after which it ' +
        'recovers if nobody calls again.\n\n' +
        'It cannot be aimed at a stretch smaller than a named reach, bank to bank, and it cannot be called twice in the ' +
        'same season by the same nine.',
      range: 'A named reach of the delta, bank to bank. Reaches are named by [[item.moor-stake|moor stakes]] and by nothing else.',
      duration: 'One run, four to six weeks early and about doubled. The debt runs two years.',
      components: TBD('The delta does not write its workings down and the nine who stand in the water do not discuss what they carry. Deciding what a calling physically requires also decides whether an outsider can ever perform one, which is a significant question for player access.'),
      cost: '6 Toll from each of nine people standing in cold water through a night, and about one and two thirds of next year\'s run',
      risks: [
        'Hanging at the Weir Gates. The Iron Sluice Company prosecutes it as theft and executes at the sluices in daylight.',
        'Next year\'s failure falls on the same villages that ate this year, which is how a calling turns neighbours into enemies for a decade.',
        'Nine participants is nine witnesses, and the reward the Company posts for a name is more than a raft crew earns in a season.',
        'The run arrives before the smokehouses are ready. Most of a called run rots on the apron, which is the argument the Company makes and it happens to be true.',
        'A night in the delta in cold water. Two of the last four recorded callings lost somebody to the water rather than to the rope.',
        'Draught animals are taken at the fords during a heavy run, so a calling costs the villages upstream their beasts as well.',
      ],
      skills: ['skill.marsh-footing', 'skill.grey-casting', 'skill.ground-read'],
      devNotes:
        PROPOSAL('The four-to-six-week advance, the two-year debt curve, the nine participants and the named-reach limit are proposed. The manifest establishes the early heavy run, the spending of next year\'s catch and the hangings.') +
        '\n\nDESIGN INTENT: a tragedy of the commons the players can actually participate in, on both sides. The Company is ' +
        'right about the arithmetic and is also hanging starving people. Neither of those cancels the other, and the ' +
        'quest design should refuse to resolve it.\n\n' +
        'Hook: a party asked to find the nine will find them easily, because in a bad spring half the delta knows and ' +
        'nobody has anywhere to run to.',
    },
  }),
]

export const relations: SeedRelation[] = [
  /* --- Chalkline ward ---------------------------------------------- */
  R('spell.chalkline-ward', 'requires', 'material.ward-chalk', 'the line itself; a season at best, then it is redrawn'),
  R('spell.chalkline-ward', 'requires', 'item.ward-pin', 'sold in sealed tubes of twelve; the seal is the legal apparatus'),
  R('spell.chalkline-ward', 'requires', 'skill.chalk-hand', 'to lay it, and more importantly to read one'),
  R('spell.chalkline-ward', 'requires', 'skill.ward-cutting', 'for anything meant to outlast the weather'),
  R('spell.chalkline-ward', 'located_in', CITY.magicCity, 'seat of the Chalked Trade and of the ward office that files the drawings'),
  R('spell.chalkline-ward', 'used_by', 'faction.fetterhouse', 'licenses the hands and holds the filed drawings'),
  R('spell.chalkline-ward', 'used_by', 'npc.ysme-drannik', 'ward-keeper of the Bound Fault, currently in the chain-house'),
  R('spell.chalkline-ward', 'related_to', 'mechanic.ward-load', 'the same system seen from the structural side'),
  R('spell.chalkline-ward', 'related_to', 'mechanic.the-toll', 'the baseline accrual every other working is priced against'),
  R('spell.chalkline-ward', 'related_to', 'creature.chalk-louse', 'eats the marl and leaves the line looking intact'),
  R('spell.chalkline-ward', 'related_to', 'quest.the-chalk-that-lies', 'adulterated chalk assays clean and fails under load'),
  R('spell.chalkline-ward', 'related_to', 'note.magic-cost-model', 'the price benchmark, so it moves if the cost model moves'),
  R('spell.chalkline-ward', 'prerequisite_of', 'spell.holdfast-binding', 'nobody is taught to bind mass who cannot lay and read a line'),

  /* --- Holdfast binding -------------------------------------------- */
  R('spell.holdfast-binding', 'requires', 'material.ward-chalk', 'the working is laid, not welded'),
  R('spell.holdfast-binding', 'requires', 'material.quenchspar', 'a sink within reach of the site, or the binder cannot finish the round'),
  R('spell.holdfast-binding', 'requires', 'material.stairwire', 'chain and stay work carrying what the binding does not'),
  R('spell.holdfast-binding', 'requires', 'skill.load-binding', 'the profession that computes, lays and re-rates the spans'),
  R('spell.holdfast-binding', 'requires', 'skill.ward-cutting', 'the durable half of the work, cut into the slab itself'),
  R('spell.holdfast-binding', 'located_in', CITY.magicCity, 'four thrown slabs over the old town, held on a sixty-one-day schedule'),
  R('spell.holdfast-binding', 'used_by', 'faction.fetterhouse', 'keeps the load roll and decides whose name goes on which span'),
  R('spell.holdfast-binding', 'used_by', 'npc.toval-cherek', 'forges the replacement links, and has been shorting the alloy for two years'),
  R('spell.holdfast-binding', 'affects', 'district.magic-city-under-slabs', 'the district living on somebody else\'s re-payment date'),
  R('spell.holdfast-binding', 'related_to', 'landmark.the-bound-fault', 'the reason the slabs are in the air at all'),
  R('spell.holdfast-binding', 'related_to', 'mechanic.ward-load', 'the maintenance schedule this entry is the working half of'),
  R('spell.holdfast-binding', 'related_to', 'note.magic-cost-model', 'the whole entry is a bet on the cost landing on a named person'),

  /* --- Dead ground -------------------------------------------------- */
  R('spell.dead-ground', 'requires', 'material.faultglass', 'sorted by ear, cut by people who go deaf inside two years'),
  R('spell.dead-ground', 'requires', 'material.quenchspar', 'and it will never be usable as a sink afterwards'),
  R('spell.dead-ground', 'requires', 'skill.ward-cutting', 'months of it, for one floor'),
  R('spell.dead-ground', 'requires', 'skill.scar-reading', 'to judge where a refusal will hold and where it will patch'),
  R('spell.dead-ground', 'located_in', CITY.magicCity, 'laid, priced and lifted here; nowhere else has the faultglass trade'),
  R('spell.dead-ground', 'used_by', 'faction.fetterhouse', 'the standing plan against a serious force, which disarms the wardens too'),
  R('spell.dead-ground', 'used_by', 'faction.red-writ', 'a clean floor is what makes a fight card worth betting on'),
  R('spell.dead-ground', 'related_to', 'landmark.the-sunken-ring', 'the largest single dead floor on the continent, 61 paces across'),
  R('spell.dead-ground', 'related_to', 'mechanic.the-toll', 'no discharge inside, which makes a dead vault a slow cell for a caster'),
  R('spell.dead-ground', 'related_to', 'spell.chalkline-ward', 'refuses this along with everything else, including its own'),

  /* --- Lime seal ---------------------------------------------------- */
  R('spell.lime-seal', 'requires', 'material.ward-chalk', 'burnt into the frame rather than drawn on the sill'),
  R('spell.lime-seal', 'requires', 'material.tideset-cement', 'the lime that gives it the name and the permanence'),
  R('spell.lime-seal', 'requires', 'skill.plague-reading', 'somebody has to make the call, and the call is what the seal enacts'),
  R('spell.lime-seal', 'requires', 'skill.writ-craft', 'the numbered writ is the only thing that can break it again'),
  R('spell.lime-seal', 'located_in', CITY.mediterranean, 'harbour health office holds the writ and the Lazaret is where it is used'),
  R('spell.lime-seal', 'used_by', 'npc.anthimos-vellani', 'knows what he is looking at and has not reported it, because this is why'),
  R('spell.lime-seal', 'used_by', 'faction.conduit-college', 'the licensing authority that would rather the harvest did not stop'),
  R('spell.lime-seal', 'affects', 'district.mediterranean-city-the-lazaret', 'forty households sealed in the first hours of an outbreak'),
  R('spell.lime-seal', 'related_to', 'quest.clean-bills', 'fast, legal, and remembered for a generation'),
  R('spell.lime-seal', 'related_to', 'note.dark-themes-handling', 'administrative violence, written as administration'),

  /* --- Held temper --------------------------------------------------- */
  R('spell.held-temper', 'requires', 'material.blister-bar', 'the standard stock every smith in the basin buys'),
  R('spell.held-temper', 'requires', 'material.blackfall-button', 'dies and edges, which is where the fee is actually worth paying'),
  R('spell.held-temper', 'requires', 'material.orrery-bronze', 'gear work, where creep is the whole problem the working solves'),
  R('spell.held-temper', 'requires', 'skill.heat-reading', 'the piece must be right before it is held; the working fixes nothing it does not find'),
  R('spell.held-temper', 'requires', 'skill.proof-marking', 'the date stamp carries the smith\'s liability, not the buyer\'s'),
  R('spell.held-temper', 'located_in', CITY.magicCity, 'filed as a binding on an object, which is the disputed half'),
  R('spell.held-temper', 'used_by', 'faction.conduit-college', 'disputes the filing and has been arguing the fee for nineteen years'),
  R('spell.held-temper', 'used_by', 'faction.pale-assay', 'stamps what a piece is and therefore what its date is worth'),
  R('spell.held-temper', 'related_to', 'skill.false-proof', 'filing and recutting a date stamp is the most profitable forgery in the trade'),
  R('spell.held-temper', 'related_to', 'item.tallyblade', 'ring work is held where the Ring can afford it, and dated where it cannot'),

  /* --- Weight lending ------------------------------------------------ */
  R('spell.weight-lending', 'related_to', 'material.stairwire', 'the hawser that is rated against whatever the lender says it is carrying'),
  R('spell.weight-lending', 'related_to', 'material.levin-salt', 'billed by the licensed shops, and carried by none of the unlicensed hands'),
  R('spell.weight-lending', 'requires', 'skill.load-binding', 'the trade, imported from the Magic City and resented for it'),
  R('spell.weight-lending', 'requires', 'skill.cable-and-drum', 'because the lending is useless without somebody who can brake the drum'),
  R('spell.weight-lending', 'located_in', CITY.gildedAscent, 'the two heaviest hoist runs, and the ballast-rights market that follows'),
  R('spell.weight-lending', 'used_by', 'machine.the-oxblood-hoists', 'lends on the two runs no cable on the face could carry honestly'),
  R('spell.weight-lending', 'used_by', 'faction.concord-of-weights', 'sets the price of a ballast right every ninth morning with everything else'),
  R('spell.weight-lending', 'used_by', 'npc.doret-halvane', 'a hoist-yard fixer knows exactly which runs are lent against'),
  R('spell.weight-lending', 'affects', 'mechanic.mass-warrant', 'every gram aboard is licensed, so a lent gram is a capital charge'),
  R('spell.weight-lending', 'related_to', 'npc.brask-vellmar', 'the inspector whose signature rates a cable against a fiction'),
  R('spell.weight-lending', 'related_to', 'mechanic.standing-ledger', 'ballast rights are collateral like anything else on the Stair'),

  /* --- Paired slate -------------------------------------------------- */
  R('spell.paired-slate', 'requires', 'material.sunwell-mica', 'two leaves cleaved off one block, and they must be one block'),
  R('spell.paired-slate', 'requires', 'material.levin-salt', 'the charge, weighed and sealed like all of it'),
  R('spell.paired-slate', 'requires', 'item.ward-pin', 'the binding is pinned at the corners and the pins are numbered'),
  R('spell.paired-slate', 'requires', 'skill.ward-cutting', 'bench work, and the only part of the trade that is genuinely difficult'),
  R('spell.paired-slate', 'requires', 'skill.plain-letters', 'a pair is useless to somebody who cannot write on it'),
  R('spell.paired-slate', 'located_in', CITY.magicCity, 'the binding benches and the registry that names both holders'),
  R('spell.paired-slate', 'used_by', 'faction.bonewax-post', 'reads the registry roll as a matter of course and sells the inference'),
  R('spell.paired-slate', 'used_by', 'faction.concord-of-weights', 'the clearing rate moves faster than a courier can'),
  R('spell.paired-slate', 'used_by', 'npc.wessel-ondriek', 'sets the rate every ninth morning and needs the figures before anyone else'),
  R('spell.paired-slate', 'related_to', 'quest.the-second-ledger', 'copying the true book is easier if you already hold half a pair'),
  R('spell.paired-slate', 'related_to', 'faction.low-tally', 'unregistered pairs are a fine rather than a crime, which is the whole market'),

  /* --- Arrears draught ----------------------------------------------- */
  R('spell.arrears-draught', 'requires', 'material.quietmilk', 'milked live, stabilised within the hour, and the milkers are dosed to keep working'),
  R('spell.arrears-draught', 'requires', 'material.levin-salt', 'the only portable store of magical work, and taxed at every gate it crosses'),
  R('spell.arrears-draught', 'requires', 'material.quenchspar', 'ground fine; the deferral is a sink the drinker carries and cannot empty'),
  R('spell.arrears-draught', 'requires', 'skill.reagent-work', 'shelf life is the whole of the maker\'s craft and the whole of the risk'),
  R('spell.arrears-draught', 'requires', 'skill.toll-sense', 'to know what you are deferring, which is the only responsible way to drink it'),
  R('spell.arrears-draught', 'located_in', CITY.mediterranean, 'seat of the Wet Bench, where the licensed benches and the sealed ware are'),
  R('spell.arrears-draught', 'used_by', 'faction.fetterhouse', 'has never seriously moved against the trade, and the reason is arithmetic'),
  R('spell.arrears-draught', 'used_by', 'npc.toval-cherek', 'behind on quota, shorting the alloy, and buying hours'),
  R('spell.arrears-draught', 'used_by', 'npc.halvo-sarn', 'backdated permits and arrears are the same market and the same customers'),
  R('spell.arrears-draught', 'related_to', 'mechanic.the-toll', 'defers the debt and charges half again for the courtesy'),
  R('spell.arrears-draught', 'related_to', 'skill.grey-casting', 'unmetered work needs somewhere to put the accrual and this is where'),
  R('spell.arrears-draught', 'related_to', 'note.magic-cost-model', 'the entry most sensitive to the open question; it changes tradition if the answer changes'),
  R('spell.arrears-draught', 'related_to', 'spell.the-souring', 'grey casters buy arrears because no sink will take them afterwards'),

  /* --- Stillwater draught -------------------------------------------- */
  R('spell.stillwater-draught', 'requires', 'material.quietmilk', 'the stabiliser, and the reason the dose is guessed rather than measured'),
  R('spell.stillwater-draught', 'requires', 'material.clearcast-glass', 'sealed apothecary ware; an unsealed batch turns and kills at the old dose'),
  R('spell.stillwater-draught', 'requires', 'skill.reagent-work', 'contamination and shelf life kill more people than the mortality rate'),
  R('spell.stillwater-draught', 'requires', 'skill.venom-work', 'one bench, two customers, and the difference is the label'),
  R('spell.stillwater-draught', 'requires', 'skill.bonewright', 'the only reason to pour it, and the person who has to keep the patient breathing'),
  R('spell.stillwater-draught', 'located_in', CITY.mediterranean, 'licensed to cutters by name and dose out of the Wet Bench'),
  R('spell.stillwater-draught', 'used_by', 'npc.anthimos-vellani', 'harbour physician, and the only anaesthetic he has'),
  R('spell.stillwater-draught', 'related_to', 'creature.mistfall-bell', 'the filament it is rendered from, harvested by divers who drown'),
  R('spell.stillwater-draught', 'related_to', REGION.mistfallCoast, 'one cold coast pays for most of the survivable surgery on the continent'),
  R('spell.stillwater-draught', 'related_to', 'item.cinderroot-cordial', 'what cutters reach for when the patient can still feel it, and it takes their hands'),

  /* --- Yokebreak draught --------------------------------------------- */
  R('spell.yokebreak-draught', 'requires', 'item.cinderroot-cordial', 'what it is usually cut with, and the combination takes the hands as well'),
  R('spell.yokebreak-draught', 'requires', 'material.quietmilk', 'to make the render survivable to prepare, not to drink'),
  R('spell.yokebreak-draught', 'requires', 'skill.venom-work', 'the gland is taken live and handled like any other venom'),
  R('spell.yokebreak-draught', 'requires', 'skill.yoke-and-tether', 'somebody has to hold a separated pair long enough to cut'),
  R('spell.yokebreak-draught', 'located_in', CITY.arenaCity, 'legal here, because the Ring is the licensing authority and owns the pharmacy'),
  R('spell.yokebreak-draught', 'used_by', 'npc.sukhet-daral', 'beast-keeper of the under-stables, and the source'),
  R('spell.yokebreak-draught', 'used_by', 'npc.berke-chagra', 'prices against the stipulation rather than the fighter'),
  R('spell.yokebreak-draught', 'used_by', 'faction.red-writ', 'writes the dose into the card as a stipulation the fighter cannot refuse'),
  R('spell.yokebreak-draught', 'affects', 'npc.aylun-torgai', 'sixteen wins deep and has stopped counting the cups, for the obvious reason'),
  R('spell.yokebreak-draught', 'related_to', 'creature.yokeback', 'separate the fused pair and the gland is what is left'),
  R('spell.yokebreak-draught', 'related_to', 'mechanic.ring-bond', 'the bond is what makes the dose compulsory rather than a choice'),
  R('spell.yokebreak-draught', 'related_to', 'note.dark-themes-handling', 'a permanent, unglamorous disability the campaign keeps playing with'),

  /* --- The Witnessing -------------------------------------------------- */
  R('spell.the-witnessing', 'requires', 'material.faultglass', 'the shard holds the record, and holding the shard is a capital charge in three cities'),
  R('spell.the-witnessing', 'requires', 'material.ward-chalk', 'the officiant\'s figure, redrawn for every sitting'),
  R('spell.the-witnessing', 'requires', 'material.levin-salt', 'sealed, weighed, and billed to the court rather than the witness'),
  R('spell.the-witnessing', 'requires', 'skill.writ-craft', 'a fixed memory is worthless without the filing that makes it admissible'),
  R('spell.the-witnessing', 'requires', 'skill.the-cold-read', 'to find out what the witness actually remembers before it is too late to ask'),
  R('spell.the-witnessing', 'located_in', CITY.mediterranean, 'the only court that treats a fixed record as ordinary evidence'),
  R('spell.the-witnessing', 'used_by', 'faction.concord-of-weights', 'perjury is impossible and blackmail is easy, which suits a creditor'),
  R('spell.the-witnessing', 'used_by', 'faction.bondwrights-hall', 'a witnessed signature on a bond cannot afterwards be denied'),
  R('spell.the-witnessing', 'related_to', 'npc.ilke-samarost', 'dead, and therefore beyond witnessing, which is what her audit is worth'),
  R('spell.the-witnessing', 'related_to', 'npc.aubran-ferrieu', 'wants a hearing rather than money and has not been asked what he would lose'),
  R('spell.the-witnessing', 'related_to', 'district.arena-city-writ-court', 'one of three benches that will read a shard aloud'),
  R('spell.the-witnessing', 'related_to', 'skill.writ-craft', 'the paperwork side of the Given Word, and where the tradition actually lives'),

  /* --- Debt mark ------------------------------------------------------- */
  R('spell.debt-mark', 'requires', 'item.indenture-bond', 'the paper the mark makes physical; without a bond there is nothing to name'),
  R('spell.debt-mark', 'requires', 'material.ward-chalk', 'worked into the skin, which is exactly as bad as it sounds'),
  R('spell.debt-mark', 'requires', 'material.levin-salt', 'a mark is not cheap, which is why only sound debts are marked'),
  R('spell.debt-mark', 'requires', 'skill.bond-broking', 'lawful in some cities and a capital charge in others, and the broker chooses which'),
  R('spell.debt-mark', 'requires', 'skill.writ-craft', 'the named boundary is a drafting problem before it is a working'),
  R('spell.debt-mark', 'located_in', CITY.gildedAscent, 'seat of the Given Word, where the registers are kept and honoured'),
  R('spell.debt-mark', 'used_by', 'faction.bondwrights-hall', 'writes, prices and resells the bonds the marks enforce'),
  R('spell.debt-mark', 'used_by', 'faction.red-writ', 'a signature is a debt on your body and the mark is how that is meant literally'),
  R('spell.debt-mark', 'used_by', 'npc.tazrit-nourem', 'holds physical papers on roughly a third of the pan crews'),
  R('spell.debt-mark', 'affects', 'npc.aylun-torgai', 'free on paper, and the paper is three floors under the sand'),
  R('spell.debt-mark', 'related_to', 'quest.the-indenture-column', 'where the argument gets made at freight scale'),
  R('spell.debt-mark', 'related_to', 'faction.low-tally', 'its most profitable cargo is people, laundered as crewed passage'),
  R('spell.debt-mark', 'related_to', 'note.dark-themes-handling', 'an institution with reasonable defenders, not a horror'),

  /* --- The Souring ----------------------------------------------------- */
  R('spell.the-souring', 'requires', 'material.levin-salt', 'unsealed, because nothing about this is going through a gate'),
  R('spell.the-souring', 'requires', 'material.ward-chalk', 'laid and scuffed out again, which is why sourings are hard to site'),
  R('spell.the-souring', 'requires', 'skill.grey-casting', 'no tradition will file it, so it accrues unmetered and uncapped'),
  R('spell.the-souring', 'requires', 'skill.fence-work', 'somebody has to get the caster into a bonded space and out again'),
  R('spell.the-souring', 'located_in', CITY.gildedAscent, 'worked most where the warehouses are, and prosecuted hardest there too'),
  R('spell.the-souring', 'used_by', 'faction.low-tally', 'a competitor\'s stock is a competitor\'s stock', true),
  R('spell.the-souring', 'related_to', 'faction.pale-assay', 'the assayers who convict on the symmetry rather than the warehouse'),
  R('spell.the-souring', 'related_to', 'faction.concord-of-weights', 'insurance on the Stair excludes it by name, which tells you the loss rate'),
  R('spell.the-souring', 'affects', 'district.gilded-ascent-bonded-vaults', 'shared warehousing turns one enemy into eleven'),
  R('spell.the-souring', 'related_to', 'mechanic.the-toll', 'sixteen unmetered, with no lawful discharge available afterwards'),

  /* --- Calling the Run --------------------------------------------------- */
  R('spell.calling-the-run', 'requires', 'skill.marsh-footing', 'nine people standing in the delta through a night'),
  R('spell.calling-the-run', 'requires', 'skill.grey-casting', 'nothing filed, nothing metered, and nowhere to discharge it after'),
  R('spell.calling-the-run', 'requires', 'skill.ground-read', 'to know the reach well enough to name it'),
  R('spell.calling-the-run', 'requires', 'item.moor-stake', 'reaches are named by stakes and by nothing else'),
  R('spell.calling-the-run', 'located_in', CITY.floatingSwamp, 'called from the rafts, in bad springs, by people who have done the arithmetic'),
  R('spell.calling-the-run', 'used_by', 'npc.sabbe-sixteen-knot', 'knows who called the last one and has not said'),
  R('spell.calling-the-run', 'related_to', 'creature.blackrun-lamprey', 'the run itself, brought forward and roughly doubled'),
  R('spell.calling-the-run', 'related_to', 'faction.iron-sluice-company', 'prosecutes it as theft of an asset it owns and hangs at the sluices'),
  R('spell.calling-the-run', 'related_to', 'mechanic.the-sluice-book', 'whoever holds the gates holds the run and therefore holds the charge'),
  R('spell.calling-the-run', 'related_to', 'landmark.the-weir-gates', 'where the hangings are done, in daylight'),
  R('spell.calling-the-run', 'related_to', REGION.theDrown, 'a two-year debt taken out against a delta that has no other collateral'),
]
