/**
 * Quests.
 *
 * Eighteen entries: the Gilded Ascent guild line (one opener and seven
 * branches), five standing investigations, and five city jobs whose outcomes
 * are meant to stay on the world state afterwards.
 *
 * Every entry carries a `flow` graph. The graph is the deliverable: it is what
 * the branching view renders, and it is where the design actually lives.
 *
 * NAMING: the manifest calls the Ascent merchant guild "the Brass Assize".
 * Following the recommendation recorded in `factions.ts`, the Brass Assize is
 * treated here as the licensing and freight arm of
 * [[faction.concord-of-weights|the Concord of Weights]], so both strings survive.
 */

import { E, R, TBD, row, type QuestFlow, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* Flow graphs                                                         */
/* ------------------------------------------------------------------ */

/** The opener. Fourteen nodes, three endings, and a desk at the end of it. */
const SHORT_WEIGHT_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'A clerk of the Brass Assize, at your lodging, before breakfast', col: 0, detail: 'No threat, no offer. A docket, a bond of forty, and a consignment number.', refs: ['faction.concord-of-weights'] },
    { id: 'n2', kind: 'check', label: 'Re-weigh consignment 4,118 in the Assay Cage', col: 1, detail: 'Proof Marking or Bench Sense. It weighs true. That is the problem.', refs: ['machine.the-assay-cage', 'district.gilded-ascent-salt-office'] },
    { id: 'n3', kind: 'choice', label: 'Follow the seal, or follow the salt', col: 2, detail: 'The seal is paperwork in the Salt Office. The salt is nine tonnes of nitre on the fourth staith.' },
    { id: 'n4', kind: 'check', label: 'Ledger Hand: one seal number, two consignments, eleven days apart', col: 3, refs: ['skill.ledger-hand'] },
    { id: 'n5', kind: 'combat', label: 'Four hoist hands in the Under-Stair, hired by the day', col: 3, detail: 'Not assassins. Carters paid two writs to break a wrist and take the docket.', refs: ['district.gilded-ascent-under-stair'] },
    { id: 'n6', kind: 'discovery', label: 'Nothing was ever short. The seal was re-used', col: 4, detail: 'One weighing, sold twice. The forty missing pounds are the difference between two honest bales.', refs: ['item.factors-seal'] },
    { id: 'n7', kind: 'discovery', label: 'The second consignment is a seated house', col: 4, detail: 'A Concord vote sits behind it, which is why the Assize hired outsiders.', refs: ['faction.concord-of-weights'] },
    { id: 'n8', kind: 'choice', label: 'Name the house, name the clerk, or name nobody', col: 5 },
    { id: 'n9', kind: 'state', label: 'A sworn clerk is struck off and indentured for the house', col: 6, detail: 'Twenty-two years old, literate, and now a line in the Salt Office register.', refs: ['item.indenture-bond'] },
    { id: 'n10', kind: 'state', label: 'The house buys the finding and the Assize files it as closed', col: 6 },
    { id: 'n11', kind: 'choice', label: 'The desk you accept', col: 7, detail: 'Route, quiet freight, the column, correspondence, standards, composition, or tariff. One only.' },
    { id: 'n12', kind: 'success', label: 'Sealed as a factor of the Brass Assize', col: 8, detail: 'A seal, a desk, a leash, and exactly one branch of the guild line open.', refs: ['item.factors-seal'] },
    { id: 'n13', kind: 'success', label: 'Walk out with the name and no desk', col: 8, detail: 'You keep the finding and sell it yourself. The guild line never opens.' },
    { id: 'n14', kind: 'failure', label: 'Bond forfeit, struck off the register', col: 8, refs: ['mechanic.standing-ledger'] },
    { id: 'n15', kind: 'state', label: 'Nitre grade stamps re-audited across the basin for a season', col: 9, refs: ['material.pan-nitre'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'follow the seal' },
    { from: 'n3', to: 'n5', label: 'follow the salt', bad: true },
    { from: 'n4', to: 'n6' },
    { from: 'n5', to: 'n6', label: 'the carters know who paid them' },
    { from: 'n5', to: 'n14', label: 'docket taken, bond called', bad: true },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n9', label: 'name the clerk', bad: true },
    { from: 'n8', to: 'n10', label: 'name the house' },
    { from: 'n8', to: 'n13', label: 'name nobody' },
    { from: 'n9', to: 'n11' },
    { from: 'n10', to: 'n11' },
    { from: 'n11', to: 'n12' },
    { from: 'n12', to: 'n15' },
    { from: 'n10', to: 'n15', hidden: true, label: 'only if the re-assay is forced in open session' },
  ],
}

/** Legitimate trade. The only branch where the failure state is a decade of nothing. */
const OPEN_ACCOUNT_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The route desk: get inside the wall at Oruvai', col: 0, refs: ['faction.concord-of-weights'] },
    { id: 'n2', kind: 'check', label: 'Trade Cant in the carry yard, four days a year', col: 1, detail: 'The yard is the whole of Oruvai an outsider may lawfully reach.', refs: ['district.oruvai-the-carry-yard', 'skill.trade-cant'] },
    { id: 'n3', kind: 'choice', label: 'Deal with Anwe Halduri, or go around her', col: 2, refs: ['npc.anwe-halduri'] },
    { id: 'n4', kind: 'check', label: 'Brokerage: an escrow she will accept without a guild name on it', col: 3, refs: ['skill.brokerage'] },
    { id: 'n5', kind: 'choice', label: 'Hire on to the porter rotation under a false name', col: 3, detail: 'No outsider has ever been offered a place. Buying one is a different act.', refs: ['skill.the-cold-read'] },
    { id: 'n6', kind: 'discovery', label: 'Inside the shut gate: what Oruvai actually sells', col: 4, detail: 'Deliberately undecided. Whatever the table answers becomes canon for the highland.', refs: [CITY.oruvai] },
    { id: 'n7', kind: 'combat', label: 'Turned out at the Carry Beam in weather', col: 4, detail: 'Not a fight so much as a fall, and a long walk down with what you are carrying.', refs: ['landmark.the-carry-beam'] },
    { id: 'n8', kind: 'check', label: 'Weather Eye on the pass: the contract voids if the pass shuts', col: 5, refs: ['mechanic.the-high-carry', 'skill.weather-eye'] },
    { id: 'n9', kind: 'success', label: 'A licensed route, a tariff seat, and figures nobody else has', col: 6, refs: ['faction.concord-of-weights'] },
    { id: 'n10', kind: 'success', label: 'A private arrangement with Halduri, outside the guild', col: 6, detail: 'You get the road. The Assize does not, and finds out in about two seasons.' },
    { id: 'n11', kind: 'failure', label: 'Oruvai written off as unbankable for a decade', col: 6 },
    { id: 'n12', kind: 'state', label: 'The unlicensed pass trade doubles and takes the road', col: 7, refs: ['faction.low-tally'] },
    { id: 'n13', kind: 'state', label: 'Karst market prices for cut stone fall by a fifth', col: 7, refs: [CITY.caveAgrarian] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'deal' },
    { from: 'n3', to: 'n5', label: 'go around her', bad: true },
    { from: 'n4', to: 'n6' },
    { from: 'n5', to: 'n6', label: 'if the rotation is bought' },
    { from: 'n5', to: 'n7', label: 'if it is not', bad: true },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n11' },
    { from: 'n8', to: 'n9', label: 'figures filed before the pass shuts' },
    { from: 'n8', to: 'n10', label: 'figures kept' },
    { from: 'n8', to: 'n11', label: 'pass shuts first', bad: true },
    { from: 'n9', to: 'n13' },
    { from: 'n11', to: 'n12' },
    { from: 'n10', to: 'n12', hidden: true, label: 'the Low Tally learns of the arrangement first' },
  ],
}

/** Smuggling. One tide, and the people who lose are named on the manifest. */
const ULLAGE_RUN_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The quiet freight desk: two hundred barrels, forty of them ullage', col: 0, refs: ['faction.low-tally'] },
    { id: 'n2', kind: 'check', label: 'Fence Work: a story the toll stamp will bear', col: 1, refs: ['skill.fence-work', 'district.black-weir-the-toll-house'] },
    { id: 'n3', kind: 'choice', label: 'Book an hour, or run the disused sluice in the slack', col: 2, refs: ['mechanic.the-sluice-book'] },
    { id: 'n4', kind: 'check', label: 'Buy a gate-hour off the schedule book', col: 3, refs: ['npc.ost-vennick', 'landmark.the-weir-gates'] },
    { id: 'n5', kind: 'check', label: "Dagren Hoyle's channel: workable in the slack hour, twice fatal so far", col: 3, refs: ['npc.dagren-hoyle', 'landmark.the-eleventh-sluice'] },
    { id: 'n6', kind: 'discovery', label: 'Six of the forty ullage barrels are not empty', col: 4, detail: 'Unsealed levin salt, which is contraband even where salt is legal.', refs: ['material.levin-salt'] },
    { id: 'n7', kind: 'choice', label: 'Declare the six, dump them, or run them', col: 5 },
    { id: 'n8', kind: 'combat', label: 'Gate-wardens on the gantry with the tide falling', col: 5, refs: ['faction.iron-sluice-company'] },
    { id: 'n9', kind: 'success', label: 'A standing channel through the gates', col: 6, detail: 'Repeatable transit for the campaign, at a price the Low Tally sets.' },
    { id: 'n10', kind: 'success', label: 'Cargo delivered, channel burned', col: 6, detail: 'You are paid once. Hoyle is not, and takes on a third crew.' },
    { id: 'n11', kind: 'failure', label: 'Seven raft crew named at the sluices and hanged', col: 6, detail: 'The names are on the manifest you signed. Play the reading of the list.' },
    { id: 'n12', kind: 'state', label: 'The Company posts a bay watch and the slack hour closes for a year', col: 7, refs: [CITY.blackWeir] },
    { id: 'n13', kind: 'state', label: 'Unsealed levin salt reaches the Ascent and the gate price doubles', col: 7, refs: ['material.levin-salt', CITY.gildedAscent] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'book it' },
    { from: 'n3', to: 'n5', label: 'run the slack', bad: true },
    { from: 'n4', to: 'n6' },
    { from: 'n5', to: 'n6' },
    { from: 'n5', to: 'n11', label: 'the channel takes the barge', bad: true },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n8', label: 'run them', bad: true },
    { from: 'n7', to: 'n9', label: 'dump them and keep the hour' },
    { from: 'n7', to: 'n10', label: 'declare them and pay the fine' },
    { from: 'n8', to: 'n9', label: 'gantry cleared before the fall' },
    { from: 'n8', to: 'n11', label: 'caught on the sill', bad: true },
    { from: 'n9', to: 'n12', hidden: true, label: 'only once the Company audits its own book' },
    { from: 'n10', to: 'n13' },
    { from: 'n11', to: 'n12' },
  ],
}

/** Trafficking. Written as bookkeeping, because that is what it is. */
const INDENTURE_COLUMN_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'A freight manifest with a column headed "bonded, crewed"', col: 0, refs: ['faction.bondwrights-hall'] },
    { id: 'n2', kind: 'check', label: 'Plain Letters: the column is sixty-one people and four names are children', col: 1, refs: ['skill.plain-letters', 'item.indenture-bond'] },
    { id: 'n3', kind: 'choice', label: 'Run the column, divert it, or open the paperwork to the Writ Court', col: 2, refs: ['district.arena-city-writ-court'] },
    { id: 'n4', kind: 'check', label: 'Bond Broking: which of the sixty-one bonds are actually void', col: 3, detail: 'Nine are. Two are void in the Mediterranean City and nowhere else.', refs: ['skill.bond-broking'] },
    { id: 'n5', kind: 'discovery', label: 'The buyers are Chamber houses, and the Ring counts them as unexpired contract', col: 4, refs: ['faction.red-writ', 'mechanic.ring-bond'] },
    { id: 'n6', kind: 'discovery', label: "Tazrit n'Ourem's strongroom holds the originals for a third of them", col: 4, refs: ['npc.tazrit-nourem', 'district.sifting-city-assay-row'] },
    { id: 'n7', kind: 'combat', label: 'A diversion goes wrong on the drovers ground', col: 5, detail: 'The escort is six men on a wage. The people in the carts are the ones who get hurt.', refs: ['district.arena-city-drovers-camp'] },
    { id: 'n8', kind: 'choice', label: 'Who is worth the paperwork you can actually forge', col: 5, detail: 'Documents for nine. Sixty-one people. This is the quest.', refs: ['skill.false-proof'] },
    { id: 'n9', kind: 'success', label: 'Nine freed and lawful, fifty-two delivered on schedule', col: 6, detail: 'The column arrives. The Assize is satisfied. You know all sixty-one names.' },
    { id: 'n10', kind: 'success', label: 'The column exposed and the manifest read into the Writ Court', col: 6, detail: 'Trade suspended for a season. The people in it are re-sold under new paper by spring.' },
    { id: 'n11', kind: 'failure', label: 'The column runs clean and you are commended for it', col: 6, detail: 'No penalty. No combat. The guild files you as reliable, and sends more.' },
    { id: 'n12', kind: 'state', label: 'The Bondwrights lobby a bond-recognition clause into the harbour court', col: 7, refs: [CITY.mediterranean] },
    { id: 'n13', kind: 'state', label: 'Pan crews stop being shipped east and start being worked to term in place', col: 7, refs: [CITY.siftingCity] },
    { id: 'n14', kind: 'state', label: 'A clerk of the Assize is burned to keep the paperwork clean', col: 7, refs: ['faction.concord-of-weights'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'divert' },
    { from: 'n3', to: 'n5', label: 'run it', bad: true },
    { from: 'n3', to: 'n10', label: 'open it' },
    { from: 'n4', to: 'n8' },
    { from: 'n4', to: 'n7', label: 'moved too early', bad: true },
    { from: 'n5', to: 'n6' },
    { from: 'n5', to: 'n11', bad: true },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n9' },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n12' },
    { from: 'n11', to: 'n12' },
    { from: 'n9', to: 'n14', hidden: true, label: 'only if the forged nine are ever re-assayed' },
    { from: 'n10', to: 'n14' },
  ],
}

/** Espionage. The second book is a tonnage figure, and it decides who is evicted. */
const SECOND_LEDGER_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The correspondence desk: copy the true book of the ninth house', col: 0, refs: ['faction.concord-of-weights'] },
    { id: 'n2', kind: 'choice', label: 'Arrive on the manifest, or arrive as ballast', col: 1, refs: ['mechanic.mass-warrant'] },
    { id: 'n3', kind: 'check', label: 'Mass Warrant declaration at the Mooring Ring', col: 2, detail: 'Every gram aboard is licensed, and a carried person is billable mass.', refs: ['district.sky-city-mooring-ring', 'skill.dead-weight'] },
    { id: 'n4', kind: 'check', label: 'Perrine Orlaunt takes you down the line unlogged', col: 2, refs: ['npc.perrine-orlaunt', 'landmark.the-ballast-drop'] },
    { id: 'n5', kind: 'discovery', label: 'The house keeps two books because the city is overloaded', col: 3, refs: ['npc.cesille-vaudry', 'district.sky-city-crown-houses'] },
    { id: 'n6', kind: 'choice', label: 'Copy it, take it, or sell that it exists', col: 4, refs: ['skill.ledger-hand'] },
    { id: 'n7', kind: 'combat', label: 'House men in a counting room with no way down', col: 4, refs: ['district.sky-city-crown-houses'] },
    { id: 'n8', kind: 'discovery', label: "Aubran Ferrieu's sheets match the second book to the pound", col: 5, refs: ['npc.aubran-ferrieu', 'district.sky-city-shelf-foot'] },
    { id: 'n9', kind: 'success', label: 'The Assize holds permanent leverage over lattice-house credit', col: 6 },
    { id: 'n10', kind: 'success', label: 'You hold it, and the Assize is told nothing', col: 6, detail: 'The most dangerous ending. You now decide which quarter goes down the ropes.' },
    { id: 'n11', kind: 'failure', label: 'Cover burned, disowned in writing, books closed to Ascent factors', col: 6 },
    { id: 'n12', kind: 'state', label: 'Vaudry signs an eviction list rather than be proved a forger', col: 7, refs: ['npc.cesille-vaudry'] },
    { id: 'n13', kind: 'state', label: 'The Ascent calls in counterweight leases and the clearing rate moves', col: 7, refs: ['mechanic.standing-ledger'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3', label: 'declared' },
    { from: 'n2', to: 'n4', label: 'unlogged', bad: true },
    { from: 'n3', to: 'n5' },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n8', label: 'copy' },
    { from: 'n6', to: 'n7', label: 'take', bad: true },
    { from: 'n6', to: 'n11', label: 'sell that it exists', bad: true },
    { from: 'n7', to: 'n11', bad: true },
    { from: 'n7', to: 'n8', label: 'out through the underdeck' },
    { from: 'n8', to: 'n9' },
    { from: 'n8', to: 'n10' },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n12', hidden: true, label: 'she is told privately who holds the figure' },
    { from: 'n11', to: 'n12' },
  ],
}

/** Theft. The mark is a reference mass, and the crime is arithmetic. */
const MASTER_WEIGHT_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'A commission with no client named, brought by Doret Halvane', col: 0, refs: ['npc.doret-halvane', 'district.gilded-ascent-hoist-yards'] },
    { id: 'n2', kind: 'check', label: 'Cast the copy: eleven masses, one of them yours', col: 1, refs: ['skill.proof-marking', 'material.orrery-bronze'] },
    { id: 'n3', kind: 'choice', label: 'Two keys, three seals: buy one, forge one, or take one', col: 2, refs: ['landmark.the-brass-standard'] },
    { id: 'n4', kind: 'check', label: 'False Proof on the inner seal, good for a second inspection', col: 3, refs: ['skill.false-proof'] },
    { id: 'n5', kind: 'check', label: 'A warden at the outer door who has a brother in the Salt Office', col: 3, refs: ['district.gilded-ascent-salt-office'] },
    { id: 'n6', kind: 'combat', label: 'The bailiff at the inner door does not run', col: 4, refs: ['faction.concord-of-weights'] },
    { id: 'n7', kind: 'discovery', label: 'One of the eleven masses is already a copy, and older than yours', col: 4, detail: 'Somebody did this before. The re-assay it triggers will find both.' },
    { id: 'n8', kind: 'choice', label: 'Leave your copy, leave both, or put the true mass back', col: 5 },
    { id: 'n9', kind: 'success', label: 'The false standard sits under the Stair, skimming', col: 6, detail: 'A fraction of an eighth off every transaction weighed against it, indefinitely.' },
    { id: 'n10', kind: 'success', label: 'The older forgery handed to the Assize instead', col: 6, detail: 'You are paid in standing rather than coin, and somebody else hangs.' },
    { id: 'n11', kind: 'failure', label: 'Caught at the standard, which is the only capital charge on the books', col: 6, refs: ['landmark.the-brass-standard'] },
    { id: 'n12', kind: 'state', label: 'Re-assay called: every contract sealed since is contestable', col: 7, refs: [CITY.gildedAscent] },
    { id: 'n13', kind: 'state', label: 'Eight settlements stop honouring stair writs while the audit runs', col: 8, refs: ['item.stair-writ'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'forge the seal' },
    { from: 'n3', to: 'n5', label: 'buy the key' },
    { from: 'n3', to: 'n6', label: 'take it', bad: true },
    { from: 'n4', to: 'n7' },
    { from: 'n5', to: 'n7' },
    { from: 'n6', to: 'n11', bad: true },
    { from: 'n6', to: 'n7', label: 'the bailiff is carried out' },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n9', label: 'leave the copy' },
    { from: 'n8', to: 'n10', label: 'hand over the old one' },
    { from: 'n8', to: 'n11', label: 'take both and be short a mass at inspection', bad: true },
    { from: 'n9', to: 'n12', hidden: true, label: 'triggered whenever anyone re-assays, which is a matter of time' },
    { from: 'n10', to: 'n12' },
    { from: 'n12', to: 'n13' },
  ],
}

/** Assassination. The account is settled either way; the question is what you are. */
const WRITTEN_OFF_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The composition desk: close the account, do not recover it', col: 0, refs: ['faction.concord-of-weights'] },
    { id: 'n2', kind: 'check', label: "Kavel Uur's schedule is the only way across the waste margin", col: 1, refs: ['npc.kavel-uur', 'district.orath-caravan-ground'] },
    { id: 'n3', kind: 'check', label: 'The Ration Board: draw more than your line and you owe the muster', col: 2, refs: ['mechanic.the-ration-board', 'landmark.the-ration-board'] },
    { id: 'n4', kind: 'discovery', label: 'The factor is on the Outward Row, and he is not hiding', col: 3, detail: 'He is running a water round. Eleven households drink because he is there.', refs: ['district.orath-the-outward-row'] },
    { id: 'n5', kind: 'choice', label: 'Kill, extort, resettle, or report him beyond reach', col: 4 },
    { id: 'n6', kind: 'combat', label: 'He has hired the only two blades in Orath worth hiring', col: 5, refs: ['skill.throat-work'] },
    { id: 'n7', kind: 'check', label: 'Cold Read: he will sign the paper if the debt is transferable', col: 5, refs: ['skill.the-cold-read'] },
    { id: 'n8', kind: 'discovery', label: 'The guild paper he ran with names the Sifting City bore advances', col: 6, detail: 'He did not steal it. He was told to lose it, and kept it instead.', refs: ['landmark.the-third-bore'] },
    { id: 'n9', kind: 'success', label: 'Account closed. You are filed as an instrument', col: 7 },
    { id: 'n10', kind: 'success', label: 'Account transferred. You are filed as a negotiator', col: 7 },
    { id: 'n11', kind: 'failure', label: 'You leave without it and a Red Writ contract is cut instead', col: 7, refs: ['faction.red-writ'] },
    { id: 'n12', kind: 'state', label: 'Eleven households on the Outward Row lose their water round', col: 8, refs: [CITY.orath] },
    { id: 'n13', kind: 'state', label: 'The bore paper reaches the Ascent and the Sifting City owes its water', col: 8, refs: [CITY.siftingCity] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4' },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6', label: 'kill', bad: true },
    { from: 'n5', to: 'n7', label: 'extort or resettle' },
    { from: 'n5', to: 'n11', label: 'walk away' },
    { from: 'n6', to: 'n8' },
    { from: 'n6', to: 'n11', bad: true },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n9', label: 'paper delivered, man dead' },
    { from: 'n8', to: 'n10', label: 'paper delivered, man alive' },
    { from: 'n9', to: 'n12' },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n13' },
    { from: 'n11', to: 'n12', hidden: true, label: 'the Writ company is less careful about the water round' },
  ],
}

/** Political influence. One vote, nine years, and a fellowship that does not take money. */
const CASTING_VOICE_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The tariff desk: pin the copper duty low for nine years', col: 0, refs: ['faction.concord-of-weights'] },
    { id: 'n2', kind: 'check', label: 'Count the roll: nineteen fellows, nine committed, one casting voice', col: 1, refs: ['faction.conduit-college', 'district.mediterranean-city-orrery-precinct'] },
    { id: 'n3', kind: 'choice', label: 'Buy the vote, break the voter, or win the argument', col: 2 },
    { id: 'n4', kind: 'check', label: 'Market Ear: what the fellowship is actually short of is conduit hours', col: 3, refs: ['skill.market-ear', 'mechanic.conduit-hours'] },
    { id: 'n5', kind: 'discovery', label: 'The casting fellow holds an unlicensed patent on the roll', col: 3, refs: ['item.governor-spring'] },
    { id: 'n6', kind: 'discovery', label: 'A marsh parasite in the terraced quarter would void the session entirely', col: 4, detail: 'Quarantine postpones the vote by a year. It also rots the olive harvest.', refs: ['npc.anthimos-vellani', 'district.mediterranean-city-the-lazaret'] },
    { id: 'n7', kind: 'choice', label: 'Use the outbreak, or leave it in the ward', col: 5, refs: ['skill.plague-reading'] },
    { id: 'n8', kind: 'combat', label: 'Conduit yard crews turn out when the duty motion is read', col: 5, refs: ['district.mediterranean-city-conduit-yards'] },
    { id: 'n9', kind: 'success', label: 'Duty pinned low. Ascent factors hold a seat in the port for nine years', col: 6 },
    { id: 'n10', kind: 'success', label: 'Duty raised, and the College owes you the favour instead', col: 6, detail: 'The Assize loses. You gain a licence nobody else in the Ascent can get.' },
    { id: 'n11', kind: 'failure', label: 'Guild bonds barred from the harbour court outright', col: 6, refs: ['item.indenture-bond'] },
    { id: 'n12', kind: 'state', label: 'Copper conduit prices fall and the Sky City re-cables a quarter early', col: 7, refs: [CITY.skyCity] },
    { id: 'n13', kind: 'state', label: 'The lazaret is opened and forty households are sealed in it', col: 7, refs: ['spell.lime-seal'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'win the argument' },
    { from: 'n3', to: 'n5', label: 'break the voter', bad: true },
    { from: 'n3', to: 'n11', label: 'offer money openly', bad: true },
    { from: 'n4', to: 'n6' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n8', label: 'leave it and take the vote on the floor' },
    { from: 'n7', to: 'n13', label: 'use it', bad: true },
    { from: 'n8', to: 'n9' },
    { from: 'n8', to: 'n10' },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n9', to: 'n12' },
    { from: 'n13', to: 'n9', hidden: true, label: 'the postponed session passes the duty unopposed' },
  ],
}

/** Investigation. A supply line, an alloy, and a chain that fails under load. */
const CHALK_THAT_LIES_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'A chain-house warrant: a batch assays clean and fails under load', col: 0, refs: ['faction.fetterhouse', 'district.magic-city-chalk-row'] },
    { id: 'n2', kind: 'check', label: 'Chalk Hand on a failing line: it is holding, and it should not be', col: 1, refs: ['skill.chalk-hand', 'material.ward-chalk'] },
    { id: 'n3', kind: 'choice', label: 'Trace the kilns, trace the marl, or trace the permits', col: 2 },
    { id: 'n4', kind: 'check', label: 'The ward kilns log every stick, and the log is complete', col: 3, refs: ['machine.the-ward-kilns', 'recipe.ward-chalk-burning'] },
    { id: 'n5', kind: 'check', label: "Halvo Sarn's private index of backdated permits", col: 3, refs: ['npc.halvo-sarn'] },
    { id: 'n6', kind: 'discovery', label: 'Sixty-one crates of the same batch, cached in the deep White Pans', col: 4, refs: ['npc.sahat-belek', 'deposit.nitre-flats'] },
    { id: 'n7', kind: 'discovery', label: 'The chalk is not the fault. The links are', col: 4, detail: 'Two years of shorted alloy, passing cold inspection, failing under sustained load.', refs: ['npc.toval-cherek'] },
    { id: 'n8', kind: 'check', label: 'Ysme Drannik will name which two of the nine chains are already dead', col: 5, refs: ['npc.ysme-drannik', 'landmark.the-ninth-chain'] },
    { id: 'n9', kind: 'choice', label: 'Pull the batch, re-forge the links, or publish the number', col: 6, refs: ['mechanic.ward-load'] },
    { id: 'n10', kind: 'combat', label: 'A slab lets go over Under-Slabs while you are under it', col: 6, refs: ['district.magic-city-under-slabs'] },
    { id: 'n11', kind: 'success', label: 'Batch pulled, chain-smith re-supplied, western sections hold', col: 7 },
    { id: 'n12', kind: 'success', label: 'The number published and the Fetterhouse loses the right to say what is safe', col: 7, refs: ['faction.fetterhouse'] },
    { id: 'n13', kind: 'failure', label: 'A bound district slips and is not rebuilt', col: 7, refs: [CITY.magicCity] },
    { id: 'n14', kind: 'state', label: 'Ward chalk price triples across four cities for a season', col: 8, refs: ['material.ward-chalk'] },
    { id: 'n15', kind: 'state', label: 'The Scar concession is put to auction earlier than planned', col: 8, refs: ['quest.the-scar-concession'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'kilns' },
    { from: 'n3', to: 'n5', label: 'permits' },
    { from: 'n3', to: 'n6', label: 'marl and cargo' },
    { from: 'n4', to: 'n7' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n8' },
    { from: 'n7', to: 'n10', label: 'test it in place', bad: true },
    { from: 'n8', to: 'n9' },
    { from: 'n10', to: 'n13', bad: true },
    { from: 'n10', to: 'n9', label: 'out through the lean' },
    { from: 'n9', to: 'n11', label: 're-forge and pull' },
    { from: 'n9', to: 'n12', label: 'publish' },
    { from: 'n9', to: 'n13', label: 'nothing done before the load season', bad: true },
    { from: 'n11', to: 'n14' },
    { from: 'n12', to: 'n15' },
    { from: 'n13', to: 'n15', hidden: true, label: 'a lost district is what makes the auction unavoidable' },
  ],
}

/** Investigation. A smuggling case that turns into a succession fight. */
const SIXTEENTH_MAST_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The Register: fifteen masts are licensed, sixteen are being used', col: 0, refs: ['faction.mooring-assize', 'district.sky-city-mooring-ring'] },
    { id: 'n2', kind: 'check', label: 'Two years of landing intervals that do not close', col: 1, refs: ['skill.ledger-hand', 'mechanic.mass-warrant'] },
    { id: 'n3', kind: 'choice', label: 'Watch the lattice, or read the mass returns', col: 2 },
    { id: 'n4', kind: 'check', label: 'Lattice Work: find the tie-in without cutting a member', col: 3, refs: ['skill.lattice-work', 'district.sky-city-lattice-town'] },
    { id: 'n5', kind: 'check', label: "Aubran Ferrieu's true tonnage sheets from the collapse week", col: 3, refs: ['npc.aubran-ferrieu'] },
    { id: 'n6', kind: 'discovery', label: 'The sixteenth mast is hung off the Sixth Mast stub', col: 4, detail: 'It is not hidden. It is in the one place nobody in the Register will look.', refs: ['landmark.the-sixth-mast'] },
    { id: 'n7', kind: 'combat', label: 'A ballast crew who cannot be found at the shelf foot either', col: 4, refs: ['npc.perrine-orlaunt'] },
    { id: 'n8', kind: 'discovery', label: 'The mast-holder is a crown house with no sixteenth interest to hold it', col: 5, refs: ['district.sky-city-crown-houses'] },
    { id: 'n9', kind: 'choice', label: 'Strike it off quietly, or name the owner in session', col: 6 },
    { id: 'n10', kind: 'success', label: 'Struck off. Landings stop. The Register admits it lost count', col: 7 },
    { id: 'n11', kind: 'success', label: 'Owner named. A succession fight opens between lattice houses', col: 7 },
    { id: 'n12', kind: 'failure', label: 'The mast is cut down with three people on it', col: 7, refs: ['landmark.the-ballast-drop'] },
    { id: 'n13', kind: 'state', label: 'The Register is reorganised and the survey series is sealed', col: 8, refs: ['faction.mooring-assize'] },
    { id: 'n14', kind: 'state', label: 'Unlogged descent traffic moves to the counterweight runs instead', col: 8, refs: ['district.sky-city-counterweight-quarter'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'watch' },
    { from: 'n3', to: 'n5', label: 'read' },
    { from: 'n4', to: 'n6' },
    { from: 'n4', to: 'n7', label: 'seen on the lattice', bad: true },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n12', bad: true },
    { from: 'n7', to: 'n8', label: 'she talks rather than fights' },
    { from: 'n8', to: 'n9' },
    { from: 'n9', to: 'n10', label: 'quietly' },
    { from: 'n9', to: 'n11', label: 'in session' },
    { from: 'n10', to: 'n14' },
    { from: 'n11', to: 'n13' },
    { from: 'n11', to: 'n12', hidden: true, label: 'if the naming happens before the landings are stopped' },
  ],
}

/** City-state-changing. An allocation, and the galleries that lose it are gone. */
const WHO_GETS_THE_LIGHT_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The Assembly asks for an allocation it can vote on without arguing', col: 0, refs: ['faction.mirror-assembly', 'district.cave-agrarian-city-mirror-quarter'] },
    { id: 'n2', kind: 'check', label: 'The blight has taken about a fifth of the yield, and the books say a tenth', col: 1, refs: ['food.mirror-barley', 'mechanic.the-mirror-rota'] },
    { id: 'n3', kind: 'choice', label: 'Audit the shortfall, or start bargaining with what you are given', col: 2 },
    { id: 'n4', kind: 'discovery', label: 'Two lower galleries have been dark for a year and nobody filed it', col: 3, refs: ['npc.iratze-zubiate', 'district.cave-agrarian-city-deep-rota'] },
    { id: 'n5', kind: 'discovery', label: 'A violet strain on the fourth terrace yields double in half the light', col: 3, refs: ['npc.bedel-lehun', 'district.cave-agrarian-city-fourth-terrace'] },
    { id: 'n6', kind: 'check', label: "Ossane Gorbea's cousin has been buying galleries she first starved", col: 4, refs: ['npc.ossane-gorbea'] },
    { id: 'n7', kind: 'choice', label: 'Whose hours are cut, and are the deep rota counted at all', col: 5, detail: 'The deep galleries are worked by debtors the Assembly stopped counting as citizens.' },
    { id: 'n8', kind: 'combat', label: 'A gallery that has been told refuses to hand over its mirrors', col: 5, refs: ['item.sunwell-mirror'] },
    { id: 'n9', kind: 'success', label: 'Ducts reopened, strain registered, cuts held to two galleries', col: 6, refs: ['landmark.sunwell-shaft'] },
    { id: 'n10', kind: 'success', label: 'The deep rota is brought into open session and enfranchised', col: 6, detail: 'Everyone above them loses hours to pay for it, and they know who to blame.' },
    { id: 'n11', kind: 'failure', label: 'Four galleries go dark permanently and leave the world state', col: 6 },
    { id: 'n12', kind: 'state', label: 'The unregistered strain spreads and the city sleeps badly for a decade', col: 7, refs: ['food.gallery-cap'] },
    { id: 'n13', kind: 'state', label: 'Karst grain to the Ascent falls and the advances are called in', col: 7, refs: ['faction.concord-of-weights'] },
    { id: 'n14', kind: 'state', label: 'Gorbea holds title to whatever went dark', col: 8, refs: ['npc.ossane-gorbea'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'audit' },
    { from: 'n3', to: 'n7', label: 'bargain blind', bad: true },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n8', label: 'cut a gallery that will not go', bad: true },
    { from: 'n7', to: 'n9', label: 'cut with the ducts reopened' },
    { from: 'n7', to: 'n10', label: 'count the deep rota' },
    { from: 'n7', to: 'n11', label: 'cut four and be done', bad: true },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n5', to: 'n12', hidden: true, label: 'if the strain is left unregistered either way' },
    { from: 'n11', to: 'n13' },
    { from: 'n11', to: 'n14' },
    { from: 'n9', to: 'n14', hidden: true, label: 'she buys the two that were cut regardless' },
  ],
}

/** Permanently failable. Eleven days, and the Marshalcy does not wait. */
const FELLING_ORDER_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The order is posted: eleven days to the felling of the Sixth Quarter', col: 0, refs: ['npc.aune-mustsalu', 'district.tree-city-sixth-quarter'] },
    { id: 'n2', kind: 'check', label: 'The survey: bolewright galleries through the heartwood, or a forged count', col: 1, refs: ['creature.bolewright-wasp'] },
    { id: 'n3', kind: 'choice', label: 'Evacuate, disprove the survey, buy days, or cut the spans early', col: 2, refs: ['mechanic.severance-drill'] },
    { id: 'n4', kind: 'check', label: 'Four hundred people, and going means the timber yards for the debt', col: 3, refs: ['district.tree-city-underroot'] },
    { id: 'n5', kind: 'check', label: "Vetla Torvik's maintenance run reaches the fourth gallery ungated", col: 3, refs: ['npc.vetla-torvik'] },
    { id: 'n6', kind: 'discovery', label: 'The spring roll is thirty names short and the quartermaster is counting', col: 4, refs: ['npc.saarik-rauda'] },
    { id: 'n7', kind: 'choice', label: 'Use the forged deaths against the Bole-Marshal, or bury them', col: 4, refs: ['npc.aune-mustsalu'] },
    { id: 'n8', kind: 'combat', label: 'Gallery drill on a span that is already under load', col: 5, refs: ['skill.gallery-drill', 'landmark.the-black-span'] },
    { id: 'n9', kind: 'success', label: 'The quarter comes out. The yards take them and the city keeps its trades', col: 6 },
    { id: 'n10', kind: 'success', label: 'The survey is broken and the felling is stood down', col: 6, detail: 'The rot is still there. It is now somebody else’s eleven days.', refs: ['faction.pitchguard'] },
    { id: 'n11', kind: 'failure', label: 'Day eleven. The quarter is dropped and fired with people inside', col: 6, refs: ['landmark.the-ash-ring'] },
    { id: 'n12', kind: 'state', label: 'The Sixth Quarter, its pitch trades and its residents leave the world state', col: 7 },
    { id: 'n13', kind: 'state', label: 'The gates of the Bastion Bole owe a debt, and it is called later', col: 7, refs: ['landmark.bastion-bole'] },
    { id: 'n14', kind: 'state', label: 'Charcoal supply to the Mediterranean smelt falls for two seasons', col: 8, refs: ['machine.the-pitchworks'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'evacuate' },
    { from: 'n3', to: 'n5', label: 'buy the ungated route' },
    { from: 'n3', to: 'n8', label: 'cut the spans early', bad: true },
    { from: 'n3', to: 'n6', label: 'disprove the survey' },
    { from: 'n4', to: 'n7' },
    { from: 'n5', to: 'n9' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n10', label: 'leverage the roll for days' },
    { from: 'n7', to: 'n9', label: 'bury it and move people instead' },
    { from: 'n7', to: 'n11', label: 'expose her and lose the only authority that can delay', bad: true },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n14' },
    { from: 'n11', to: 'n12' },
    { from: 'n11', to: 'n14' },
    { from: 'n9', to: 'n12', hidden: true, label: 'the trades still go, because the yards keep the people' },
  ],
}

/** Hidden outcome. The whole quest turns on a deed nobody thinks to turn over. */
const SLACKWATER_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'Two clans, one Moorstone berth, and a draw that cannot separate them', col: 0, refs: ['faction.moorstone-compact', 'district.floating-swamp-settlement-the-stone-lots'] },
    { id: 'n2', kind: 'check', label: 'The deed chest: a cut slate plate, filed as a supply agreement', col: 1, refs: ['landmark.the-lot-board'] },
    { id: 'n3', kind: 'choice', label: 'Hear both clans, or find who benefits from the berth itself', col: 2 },
    { id: 'n4', kind: 'discovery', label: 'The berth is the only lot that stays dry in a scheduled release', col: 3, refs: ['mechanic.the-remoor', 'landmark.the-moorstone'] },
    { id: 'n5', kind: 'check', label: 'Turn the plate over', col: 3, detail: 'A free action nobody takes. The reversionary clause is on the back.' },
    { id: 'n6', kind: 'discovery', label: 'The clause assigns the berth to a Black Weir creditor on any transfer', col: 4, refs: ['faction.iron-sluice-company'] },
    { id: 'n7', kind: 'discovery', label: 'Sabbe is being paid in guaranteed sluice-time to drift the settlement upriver', col: 4, refs: ['npc.sabbe-sixteen-knot'] },
    { id: 'n8', kind: 'choice', label: 'Rule for a clan, void the deed, or read the clause aloud', col: 5 },
    { id: 'n9', kind: 'combat', label: 'Lines cut in the dark on the Tail Lots', col: 5, refs: ['district.floating-swamp-settlement-tail-lots'] },
    { id: 'n10', kind: 'success', label: 'The clause is read out and the Compact voids the plate', col: 6 },
    { id: 'n11', kind: 'success', label: 'A clan is seated and thanks you', col: 6, detail: 'They discover a season later that they have been mooring as a tenant.' },
    { id: 'n12', kind: 'failure', label: 'Three clans cut Sabbe’s lines and the settlement splits', col: 6 },
    { id: 'n13', kind: 'state', label: 'The Weir holds a berth inside the settlement and starts pricing it', col: 7, refs: [CITY.blackWeir] },
    { id: 'n14', kind: 'state', label: 'The next re-moor is decided by the Compact rather than by Sabbe', col: 7, refs: ['faction.moorstone-compact'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'who benefits' },
    { from: 'n3', to: 'n8', label: 'hear both and rule', bad: true },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n4', to: 'n7' },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n10', label: 'read the clause' },
    { from: 'n8', to: 'n11', label: 'seat a clan' },
    { from: 'n8', to: 'n9', label: 'seat a clan and say why', bad: true },
    { from: 'n9', to: 'n12', bad: true },
    { from: 'n10', to: 'n14' },
    { from: 'n11', to: 'n13', hidden: true, label: 'the reversion completes on the transfer, unannounced' },
    { from: 'n12', to: 'n13' },
  ],
}

/** Keth Veyra. Deliberately open at the far end. */
const FOG_BELLS_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'Forty pilots, four silent marks, and no ship moving', col: 0, refs: ['district.keth-veyra-the-pilot-stair'] },
    { id: 'n2', kind: 'check', label: 'The Bell Roll: half the owner column struck out, some cuts still bright', col: 1, refs: ['landmark.the-bell-roll', 'mechanic.the-bell-lines'] },
    { id: 'n3', kind: 'choice', label: 'Work the roll, or get out to the Outer Bell', col: 2 },
    { id: 'n4', kind: 'check', label: 'Four miles of cold water onto a rock boardable only in low swell', col: 3, refs: ['landmark.the-outer-bell', 'skill.weather-eye'] },
    { id: 'n5', kind: 'discovery', label: 'The clapper linkage was not broken. It was unshackled and taken', col: 4 },
    { id: 'n6', kind: 'discovery', label: 'The four silent bells share one struck-out owner', col: 4, refs: ['district.keth-veyra-the-manifest-house'] },
    { id: 'n7', kind: 'combat', label: 'Something is already on the rock and does not want company', col: 4, refs: ['creature.mistfall-bell'] },
    { id: 'n8', kind: 'choice', label: 'Rehang the bells, or find out what the silence was for', col: 5 },
    { id: 'n9', kind: 'success', label: 'The approach works again and the Pilotage sails', col: 6 },
    { id: 'n10', kind: 'success', label: 'You learn who owns silence here, and sell that instead', col: 6 },
    { id: 'n11', kind: 'failure', label: 'Winter shuts and nothing enters Keth Veyra until spring', col: 6, refs: [CITY.kethVeyra] },
    { id: 'n12', kind: 'state', label: 'Three intervals learned from a sympathetic pilot, worth more than a chart', col: 7, refs: ['district.keth-veyra-the-fog-quays'] },
    { id: 'n13', kind: 'state', label: 'Whatever the table decides becomes the coast’s first fixed fact', col: 8, refs: [REGION.mistfallCoast] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n6', label: 'work the roll' },
    { from: 'n3', to: 'n4', label: 'go out' },
    { from: 'n4', to: 'n5' },
    { from: 'n4', to: 'n7', label: 'boarded in the wrong swell', bad: true },
    { from: 'n5', to: 'n8' },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n11', bad: true },
    { from: 'n7', to: 'n5', label: 'off the rock with the linkage' },
    { from: 'n8', to: 'n9', label: 'rehang' },
    { from: 'n8', to: 'n10', label: 'follow the owner' },
    { from: 'n8', to: 'n11', label: 'neither, before the weather turns', bad: true },
    { from: 'n9', to: 'n12' },
    { from: 'n10', to: 'n13', hidden: true, label: 'only if the struck-out owner is actually named' },
    { from: 'n9', to: 'n13' },
  ],
}

/** Investigation. The antagonist is a price list. */
const PAN_FEVER_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'A sift-mistress with a wasting workforce and papers on a third of it', col: 0, refs: ['npc.tazrit-nourem', 'district.sifting-city-the-tower-line'] },
    { id: 'n2', kind: 'check', label: 'Four streets in the Lee, and a measurable gradient across them', col: 1, refs: ['district.sifting-city-the-lee', 'skill.plague-reading'] },
    { id: 'n3', kind: 'choice', label: 'Chase the disease, or chase the price list', col: 2, refs: ['mechanic.the-sift-line'] },
    { id: 'n4', kind: 'check', label: 'Sieve Tuning: the fines that pay best ride the last mesh', col: 3, refs: ['skill.sieve-tuning', 'item.sift-screen'] },
    { id: 'n5', kind: 'discovery', label: 'The premium fraction and the fraction the crews breathe are the same fraction', col: 4, refs: ['item.pale-dust'] },
    { id: 'n6', kind: 'discovery', label: "The Assay's parallel grading record, kept for years", col: 4, refs: ['faction.pale-assay', 'district.sifting-city-assay-row'] },
    { id: 'n7', kind: 'choice', label: 'Prove it, sell it, or retool the pans quietly', col: 5 },
    { id: 'n8', kind: 'combat', label: 'A crucible shed fire that starts in the record room', col: 5, refs: ['district.sifting-city-the-crucible-sheds'] },
    { id: 'n9', kind: 'success', label: 'Wet screens ordered on the last mesh; the gradient flattens over four years', col: 6 },
    { id: 'n10', kind: 'success', label: 'The crews are paid off and the fraction keeps selling', col: 6, detail: 'Everyone alive is compensated. Everyone still working is not.' },
    { id: 'n11', kind: 'failure', label: 'Discredited, and the assay stamp you carry is worth nothing', col: 6, refs: ['item.assayers-tray'] },
    { id: 'n12', kind: 'state', label: 'The Lee organises for the first time and acquires a faction', col: 7 },
    { id: 'n13', kind: 'state', label: 'Clearcast glass output falls while the grading is re-cut', col: 7, refs: ['material.clearcast-glass'] },
    { id: 'n14', kind: 'state', label: 'Pale dust is prohibited in a third city and its street price doubles', col: 8, refs: ['item.pale-dust'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'the price list' },
    { from: 'n3', to: 'n5', label: 'the disease' },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n6', to: 'n8', label: 'the record room is emptied first', bad: true },
    { from: 'n7', to: 'n9', label: 'prove and retool' },
    { from: 'n7', to: 'n10', label: 'settle' },
    { from: 'n7', to: 'n11', label: 'sell it to the company', bad: true },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n9', to: 'n12' },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n14' },
    { from: 'n11', to: 'n14', hidden: true, label: 'the prohibition happens anyway, elsewhere, without you' },
  ],
}

/** Investigation. An instrument that cannot be wrong, and is. */
const FOUR_MINUTES_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The calibrator asks for an instrument the College does not know about', col: 0, refs: ['npc.melitta-aspri', 'district.mediterranean-city-orrery-precinct'] },
    { id: 'n2', kind: 'check', label: 'The printed tables against the water: about four minutes, and growing', col: 1, refs: ['item.orrery-tables', 'landmark.the-tide-orrery'] },
    { id: 'n3', kind: 'choice', label: 'Take her error book, or build an independent gauge', col: 2 },
    { id: 'n4', kind: 'check', label: 'Clearcast glass, orrery bronze and a slot in the conduit hours', col: 3, refs: ['material.clearcast-glass', 'mechanic.conduit-hours'] },
    { id: 'n5', kind: 'discovery', label: 'Harbour slots have been sold against the error for nine years', col: 4, refs: ['district.mediterranean-city-the-mole'] },
    { id: 'n6', kind: 'choice', label: 'You are offered a great deal of money to let it run fast', col: 4 },
    { id: 'n7', kind: 'combat', label: 'The gauge is smashed on the mole the night before the reading', col: 5 },
    { id: 'n8', kind: 'discovery', label: 'The next spring tide is one the harbour is not braced for', col: 5, refs: ['landmark.the-standing-aqueduct'] },
    { id: 'n9', kind: 'success', label: 'The drift is conceded and every lease priced on the old tables reopens', col: 6 },
    { id: 'n10', kind: 'success', label: 'Aspri repairs it quietly and the tables are corrected over three seasons', col: 6, detail: 'Nobody is ruined. Nobody is told. She keeps her post and owes you it.' },
    { id: 'n11', kind: 'failure', label: 'The orrery runs fast, and the spring tide arrives on the old figures', col: 6 },
    { id: 'n12', kind: 'state', label: 'Harbour lease auction reopens and Ascent factors bid for quay frontage', col: 7, refs: ['faction.concord-of-weights'] },
    { id: 'n13', kind: 'state', label: 'The mole loses two berths and the lazaret floods', col: 7, refs: ['district.mediterranean-city-the-lazaret'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n5', label: 'the error book, which destroys her' },
    { from: 'n3', to: 'n4', label: 'build a gauge' },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n9', label: 'refuse and read it publicly' },
    { from: 'n6', to: 'n10', label: 'refuse and let her repair it' },
    { from: 'n6', to: 'n7', label: 'accept, then change your mind', bad: true },
    { from: 'n6', to: 'n11', label: 'accept', bad: true },
    { from: 'n7', to: 'n8' },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n8', to: 'n9', label: 'a second reading in time' },
    { from: 'n9', to: 'n12' },
    { from: 'n11', to: 'n13' },
    { from: 'n10', to: 'n12', hidden: true, label: 'the leases reopen anyway when the correction is noticed' },
  ],
}

/** The cordon that saves upriver and starves the delta. */
const CLEAN_BILLS_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'Forged bills of health, and a fever already three days upriver', col: 0, refs: ['district.black-weir-the-toll-house', 'faction.iron-sluice-company'] },
    { id: 'n2', kind: 'check', label: 'Plague Reading on the toll house queue: it is in the crews, not the cargo', col: 1, refs: ['skill.plague-reading', 'item.fever-clay'] },
    { id: 'n3', kind: 'choice', label: 'Chase the forger, or ask for the gates', col: 2 },
    { id: 'n4', kind: 'check', label: 'The bills were sold in blanks out of the toll house itself', col: 3, refs: ['npc.dagren-hoyle'] },
    { id: 'n5', kind: 'check', label: 'Ost Vennick will close the gates on your word and keep them closed', col: 3, refs: ['npc.ost-vennick', 'landmark.the-weir-gates'] },
    { id: 'n6', kind: 'discovery', label: 'The delta eats what the river brings and nothing else', col: 4, refs: ['food.tide-rice', CITY.floatingSwamp] },
    { id: 'n7', kind: 'choice', label: 'Full cordon, timed openings, or a lime seal on the infected rafts', col: 5, refs: ['spell.lime-seal'] },
    { id: 'n8', kind: 'combat', label: 'The Tail Lots come up the river at the gates', col: 5, refs: ['district.floating-swamp-settlement-tail-lots'] },
    { id: 'n9', kind: 'success', label: 'Cordon held. Upriver towns are clean. The delta is hungry by spring', col: 6 },
    { id: 'n10', kind: 'success', label: 'Timed openings under inspection: slower, leakier, and nobody starves', col: 6 },
    { id: 'n11', kind: 'failure', label: 'The fever reaches the Ascent wharves and the basin closes its gates instead', col: 6, refs: ['district.gilded-ascent-confluence-wharves'] },
    { id: 'n12', kind: 'state', label: 'The Compact sells release warnings openly and the lot-draw collapses', col: 7, refs: ['faction.moorstone-compact'] },
    { id: 'n13', kind: 'state', label: 'The schedule book becomes evidence, and Vennick knows it', col: 7, refs: ['mechanic.the-sluice-book'] },
    { id: 'n14', kind: 'state', label: 'Bills of health are required at every gate on the Long Water', col: 8 },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'the forger' },
    { from: 'n3', to: 'n5', label: 'the gates' },
    { from: 'n4', to: 'n5' },
    { from: 'n4', to: 'n11', label: 'too slow, and it is past the weir', bad: true },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n9', label: 'full cordon', bad: true },
    { from: 'n7', to: 'n10', label: 'timed openings' },
    { from: 'n7', to: 'n8', label: 'lime seal the rafts', bad: true },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n8', to: 'n9' },
    { from: 'n9', to: 'n12' },
    { from: 'n10', to: 'n14' },
    { from: 'n9', to: 'n13', hidden: true, label: 'the closure is logged, and the log is the proof of the other one' },
  ],
}

/** Main thread. Three bidders, one licence, and two losers with capital. */
const SCAR_CONCESSION_FLOW: QuestFlow = {
  nodes: [
    { id: 'n1', kind: 'start', label: 'The right to draw on the Bound Fault is put up on the Counting Stair', col: 0, refs: ['landmark.the-counting-stair', 'landmark.the-bound-fault'] },
    { id: 'n2', kind: 'check', label: 'Three bidders, and only one of them has the money it says it has', col: 1, refs: ['npc.wessel-ondriek', 'faction.concord-of-weights'] },
    { id: 'n3', kind: 'choice', label: 'Bid, broker, or wreck the auction', col: 2, refs: ['skill.brokerage'] },
    { id: 'n4', kind: 'check', label: 'The Assize holds the ward marl and calls it a seat at the table', col: 3, refs: ['faction.mooring-assize', 'deposit.ward-marls'] },
    { id: 'n5', kind: 'check', label: 'The Fetterhouse argues that a licence is not a lease of a live fault', col: 3, refs: ['faction.fetterhouse'] },
    { id: 'n6', kind: 'discovery', label: 'Two of the nine chains are already dead, and the number is not in the prospectus', col: 4, refs: ['npc.ysme-drannik', 'landmark.the-ninth-chain'] },
    { id: 'n7', kind: 'choice', label: 'Publish the chain count, or bid against it', col: 5, refs: ['mechanic.ward-load'] },
    { id: 'n8', kind: 'combat', label: 'The lot is contested on the eleventh landing, badly', col: 5, refs: ['district.gilded-ascent-counting-terrace'] },
    { id: 'n9', kind: 'success', label: 'The concession is held by a bidder you chose', col: 6, detail: 'The price of regulated magic is set for a generation, by somebody who owes you.', refs: ['material.levin-salt'] },
    { id: 'n10', kind: 'success', label: 'The lot is withdrawn and the fault stays unlicensed', col: 6, detail: 'No legal supply at all. Everything moves to the Low Tally within a year.', refs: ['faction.low-tally'] },
    { id: 'n11', kind: 'failure', label: 'The reserve is re-assayed mid-auction and the Stair stops clearing', col: 6, refs: ['mechanic.standing-ledger'] },
    { id: 'n12', kind: 'state', label: 'Levin salt and ward chalk are priced by one holder in eight settlements', col: 7 },
    { id: 'n13', kind: 'state', label: 'Two losing bidders hold capital, grievances and no legal supply', col: 7 },
    { id: 'n14', kind: 'state', label: 'Unsealed salt becomes the highest-value contraband on the continent', col: 8, refs: ['material.levin-salt'] },
  ],
  edges: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4', label: 'broker' },
    { from: 'n3', to: 'n5', label: 'bid' },
    { from: 'n3', to: 'n8', label: 'wreck it', bad: true },
    { from: 'n4', to: 'n6' },
    { from: 'n5', to: 'n6' },
    { from: 'n6', to: 'n7' },
    { from: 'n7', to: 'n9', label: 'bid against it' },
    { from: 'n7', to: 'n10', label: 'publish' },
    { from: 'n7', to: 'n11', label: 'publish the reserve as well', bad: true },
    { from: 'n8', to: 'n11', bad: true },
    { from: 'n8', to: 'n10' },
    { from: 'n9', to: 'n12' },
    { from: 'n9', to: 'n13' },
    { from: 'n10', to: 'n14' },
    { from: 'n13', to: 'n14', hidden: true, label: 'the losers fund the second market themselves' },
  ],
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE GUILD LINE — opener                                           */
  /* ================================================================ */

  E({
    id: 'quest.short-weight',
    type: 'quest',
    name: 'Short Weight',
    status: 'draft',
    summary: 'A sealed consignment weighs true on the Stair and false at the door, and the guild buys your silence with a desk.',
    tags: ['guild-line', 'opener', 'trade', 'gilded-ascent'],
    fields: {
      overview:
        "Consignment 4,118, nine tonnes of [[material.pan-nitre|pan nitre]], is weighed and sealed in [[machine.the-assay-cage|the Assay Cage]] and arrives at a buyer's door forty pounds light. It is weighed again on arrival and is still sealed. The Brass Assize, the licensing and freight arm of [[faction.concord-of-weights|the Concord of Weights]], sends a clerk to your lodging with a docket and a bond of forty writs, and asks you to explain the arithmetic.\n\nThere is no theft. Nothing was ever removed. A single seal number has been used on two consignments eleven days apart, so one weighing has been sold twice and the difference between two honest bales has been booked as a loss on the smaller one. It is elegant, it is cheap, and it works because the seal is trusted more than the scale.\n\nThe Assize already suspects this. What it wants is not a prosecution but ownership of the finding, because the second consignment belongs to a seated house with a Concord vote behind it. When the finding is in hand the clerk comes back, and the conversation is not about the nitre. It is about which desk you would like. That choice is the whole point of the chapter: it opens exactly one of seven guild branches for that character and closes the other six for good.",
      questType: 'Chain opener',
      level: '2 to 4. No combat is required to finish it.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.concord-of-weights'],
      startLocation: ['district.gilded-ascent-salt-office', CITY.gildedAscent],
      prerequisites: [
        'Literacy. The Assize does not refuse illiterate applicants, it simply never understands them to have applied.',
        'A lodged bond of forty writs, or a sponsor prepared to lodge it for you.',
        'No standing default in the Salt Office register.',
      ],
      recommendedSkills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.market-ear', 'skill.the-cold-read', 'skill.proof-marking'],
      objectives: [
        'Re-weigh consignment 4,118 against a certified reference mass.',
        'Establish where the forty pounds went, or that they never moved.',
        'Trace seal number 4,118 through the Salt Office day-books.',
        'Report a name to the Assize clerk, or decline to.',
        'Accept a desk.',
      ],
      optionalObjectives: [
        'Get the four hired hoist hands to say who paid them, without a warrant.',
        'Recover the second docket before the house realises it is missing.',
        'Find out which of the three rate-committee houses is in the loop.',
      ],
      branchNotes:
        "Three shapes. Name the clerk and a twenty-two-year-old sworn clerk is struck off and indentured to the house that used him, which is the cheapest outcome for everybody except him and is what the Assize expects. Name the house and the Assize buys the finding, files the matter closed, and holds it over a Concord seat for years. Name nobody and you keep the finding and sell it yourself, which pays better once and closes the guild line permanently.\n\nThe desk is the fork that matters. Route opens [[quest.open-account|Open Account]]. Quiet freight opens [[quest.the-ullage-run|The Ullage Run]]. The column opens [[quest.the-indenture-column|The Indenture Column]]. Correspondence opens [[quest.the-second-ledger|The Second Ledger]]. Standards opens [[quest.the-master-weight|The Master Weight]]. Composition opens [[quest.written-off|Written Off]]. Tariff opens [[quest.the-casting-voice|The Casting Voice]]. One per character, and the refusal is a legitimate ending.",
      failureConditions: [
        'The docket is taken in the Under-Stair and the bond is called; you are struck off the register.',
        'You re-weigh against an uncertified mass and the finding is inadmissible.',
        'Twelve days pass. The second consignment clears, the seal is retired, and there is nothing left to weigh.',
      ],
      hiddenOutcomes: [
        'If the re-assay is ever forced in open session, the seal fraud surfaces again with the party named on the original docket.',
        'The house in the loop is one of the nine that hold the working Concord majority, which is why the Assize used outsiders.',
        "The eleven days in the freight books are the same eleven days named in [[npc.ilke-samarost|Ilke Samarost]]'s missing audit.",
      ],
      rewards: [
        row({ branch: 'Name the house', reward: "A [[item.factors-seal|factor's seal]], a desk, and a standing line at [[mechanic.standing-ledger|the Standing Ledger]]" }),
        row({ branch: 'Name the clerk', reward: 'The same, plus a quiet reputation for being usable' }),
        row({ branch: 'Name nobody', reward: '900 in writs from the house, once, and no guild line' }),
        row({ branch: 'Optional: the second docket', reward: 'Hoist priority for a season and an [[item.oxblood-coat|oxblood coat]] you have actually earned' }),
      ],
      itemsRequired: ['item.assayers-tray'],
      itemsConsumed: ['item.stair-writ'],
      npcChanges: [
        row({ npc: '[[npc.wessel-ondriek|Wessel Ondriek]]', change: 'Notes the party. Does not meet them. Will remember the name at the concession auction.' }),
        row({ npc: '[[npc.doret-halvane|Doret Halvane]]', change: 'Becomes reachable in the hoist yards, and starts pricing what she wants for the wax board.' }),
        row({ npc: '[[npc.brask-vellmar|Brask Vellmar]]', change: 'Approaches the party unprompted if they named the clerk, because he knows what being made to sign looks like.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Unrated to Corresponding, or to Sealed if a desk is taken' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Mildly hostile if the house is named; interested if nobody is' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'Hostile if the clerk is named. They have a word for it and it is not a kind one.' }),
      ],
      worldChanges: [
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Nitre grade stamps are re-audited across the basin for one season, slowing every bulk cargo through the wharves.' }),
        row({ where: '[[district.gilded-ascent-salt-office|The Salt Office]]', change: 'Seal numbers begin to be issued in sequence with a witness, adding a day to every consignment.' }),
        row({ where: '[[city.sifting-city|The Sifting City]]', change: 'Tower-masters raise the price of a grade stamp, because Ascent scrutiny is now a cost of doing business.' }),
      ],
      devNotes:
        PROPOSAL('Consignment 4,118, the re-used seal, the bond of forty and the seven desks are invented. The re-used seal is the load-bearing idea: it makes the opener a paperwork crime with no villain in the room, which sets the tone for the whole guild line.') +
        '\n\nNAMING: following the recommendation in the faction module, the Brass Assize is the licensing and freight arm of the Concord of Weights rather than a separate guild.\n\nRUN IT AS: three sessions. One to establish that nothing was stolen, one to find out who benefits, one for the conversation about the desk. The clerk who delivers the offer should be pleasant, junior and entirely unmoved by anything the party says.',
      flow: SHORT_WEIGHT_FLOW,
    },
  }),

  /* ================================================================ */
  /* THE GUILD LINE — branches                                         */
  /* ================================================================ */

  E({
    id: 'quest.open-account',
    type: 'quest',
    name: 'Open Account',
    status: 'draft',
    summary: 'Win the Brass Assize the first licensed route into Oruvai, and come back with figures nobody in the guild has.',
    tags: ['guild-line', 'branch', 'trade', 'oruvai'],
    fields: {
      overview:
        "The route desk is the branch that looks like the harmless one. [[city.oruvai|Oruvai]] trades four days a year in a carry yard below its wall, pays in advance in cut stone, and has never let an Ascent factor inside. The Assize wants a licensed road through the highland and the tariff seat that follows it, and neither is obtainable without figures: what Oruvai produces, at what rate, and what it needs badly enough to sign for.\n\n[[npc.anwe-halduri|Anwe Halduri]] comes down four times a year, carries a seal that karst reeves honour without being able to read, and refuses every invitation to travel back with her. She is the whole of the lawful route in. Around her is the porter rotation on [[mechanic.the-high-carry|the High Carry]], which has never offered an outsider a place, and the pass itself, which shuts without warning and voids any contract written against it.\n\nWhat is inside the wall is deliberately not written. Whatever the table decides becomes the first real fact about Oruvai, so the quest is built to survive any answer, including a dull one.",
      questType: 'Branch',
      level: '4 to 6. Travel and negotiation; the danger is weather and altitude.',
      devStatus: 'Outlined',
      questGiver: ['faction.concord-of-weights', 'npc.anwe-halduri'],
      startLocation: ['district.oruvai-the-carry-yard', CITY.oruvai],
      prerequisites: [
        'The route desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'A season of the year in which the pass is open, which is roughly five months.',
        'Something Oruvai wants. Finding out what that is is most of the quest.',
      ],
      recommendedSkills: ['skill.brokerage', 'skill.trade-cant', 'skill.the-far-walk', 'skill.weather-eye', 'skill.market-ear'],
      objectives: [
        'Trade honestly in the carry yard for one full four-day market.',
        'Establish what Oruvai sells in quantity and what it buys at any price.',
        'Get a party member inside the shut gate, by invitation or by rotation.',
        'File figures with the Assize before the pass closes.',
      ],
      optionalObjectives: [
        "Learn who issues Anwe Halduri's seal.",
        'Survey the carry beam and cost a cart road against it.',
        'Come back down with a witness who lives there.',
      ],
      branchNotes:
        'Three endings. A licensed route filed in time gives the Assize a lawful highland road and a tariff seat, and gives the party standing in the guild that nothing else on this branch matches. A private arrangement with Halduri gives the party the road and gives the guild nothing, which holds for about two seasons before someone in the Ascent works it out. Failing to file, or being turned out at the beam, writes Oruvai off as unbankable for a decade and hands the pass to whoever runs it unlicensed.',
      failureConditions: [
        'Buying a place on the porter rotation and being found out, which ends outsider access to the yard entirely.',
        'The pass shuts before the figures are filed. The contract voids and the season is gone.',
        'Trying to enter over the wall. Nobody has, and the quest does not reward the attempt.',
      ],
      hiddenOutcomes: [
        'A private arrangement is sold to [[faction.low-tally|the Low Tally]] by somebody in the yard within two seasons.',
        'If Oruvai is written off, the unlicensed pass trade doubles and the karst stone price falls by a fifth.',
        'Whatever is behind the gate is the first canon fact about Oruvai. Write it down the moment it is decided.',
      ],
      rewards: [
        row({ branch: 'Licensed route filed', reward: 'Guild standing at Seated factor, and a share of the highland tariff for the campaign' }),
        row({ branch: 'Private arrangement', reward: 'Personal transit rights and cut stone at cost; no guild standing' }),
        row({ branch: 'Optional: the seal', reward: 'An answer no faction on the continent currently has, saleable exactly once' }),
      ],
      itemsRequired: ['item.stair-writ'],
      itemsConsumed: TBD('Does the High Carry price porterage in goods or in writs? The mechanic says paid by weight and altitude, which does not say in what.'),
      npcChanges: [
        row({ npc: '[[npc.anwe-halduri|Anwe Halduri]]', change: 'Either becomes a named correspondent of the Assize, or stops coming down to the karst markets at all.' }),
        row({ npc: '[[npc.wessel-ondriek|Wessel Ondriek]]', change: 'Quietly funds the second attempt if the first fails, because a real asset is what he most needs.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Large gain on a filed route; a permanent black mark on a written-off one' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Gains a monopoly on the pass if the route is never licensed' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', change: 'Sells the filed figures on subscription within the month, whatever the party is told' }),
      ],
      worldChanges: [
        row({ where: '[[city.oruvai|Oruvai]]', change: 'Either acquires its first outside institution, or closes the yard to Ascent parties for a decade.' }),
        row({ where: '[[region.hollow-karst|The Hollow Karst]]', change: 'Cut stone prices move by a fifth in whichever direction the route goes.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'A highland tariff seat exists or does not, which decides whether the Concord can price the pass at all.' }),
      ],
      devNotes:
        PROPOSAL('The route desk, the tariff seat and the four-day market cycle are proposed. Nothing here invents what Oruvai is, and the quest is written so that it does not need to.') +
        '\n\nDESIGN INTENT: the legitimate branch should be the hardest one to run at speed. It has no combat spine, it is gated on weather, and its failure state is nothing happening for ten years, which is a genuinely unpleasant outcome for a trade-minded party.',
      flow: OPEN_ACCOUNT_FLOW,
    },
  }),

  E({
    id: 'quest.the-ullage-run',
    type: 'quest',
    name: 'The Ullage Run',
    status: 'draft',
    summary: 'Two hundred barrels declared full, forty of them ullage, and one tide to move them past the Weir Gates.',
    tags: ['guild-line', 'branch', 'smuggling', 'black-weir'],
    fields: {
      overview:
        "The quiet freight desk does not call itself smuggling and does not have to. Two hundred barrels are declared full and tolled as full. Forty are ullage, and the difference between the declared and the actual is the margin. The cargo has to pass [[landmark.the-weir-gates|the Weir Gates]] on one tide, because the toll book is reconciled against the gate log at the turn and a barge sitting in the pound at reconciliation is a barge that gets opened.\n\nThere are two ways through. Book a gate-hour off [[npc.ost-vennick|the sluice-master's]] schedule, which is lawful, expensive and leaves a written trace. Or run [[npc.dagren-hoyle|Dagren Hoyle's]] disused sluice in the slack hour between scheduled openings, which is free, undocumented, and has drowned two crews. Hoyle is honest about the odds and pays in Weir transit seals rather than coin.\n\nSix of the forty ullage barrels are not empty. They hold unsealed [[material.levin-salt|levin salt]], which is contraband even in cities where salt is legal, and nobody told the party. That is the quest: what you do in the twenty minutes after you look inside a barrel you were not supposed to open.",
      questType: 'Branch',
      level: '5 to 7. Timed, wet, and lethal at the wrong end.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.low-tally', 'npc.dagren-hoyle'],
      startLocation: ['district.black-weir-the-gantry-yards', CITY.blackWeir],
      prerequisites: [
        'The quiet freight desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'A barge and a crew, or the writs to hire both at short notice.',
        'A tide table for the delta throat that is less than a season old.',
      ],
      recommendedSkills: ['skill.fence-work', 'skill.marsh-footing', 'skill.plain-letters', 'skill.quiet-ground', 'skill.set-and-brace'],
      objectives: [
        'Get the manifest stamped at the toll house without the ullage being gauged.',
        'Move two hundred barrels through the throat on one tide.',
        'Decide what to do about the six barrels once they are open.',
        'Deliver, or account for what did not arrive.',
      ],
      optionalObjectives: [
        'Get Hoyle a third crew that survives the run.',
        "Copy the page of the schedule book covering your hour, which is worth more than the cargo.",
        'Find out who loaded the six barrels, which the Low Tally will deny knowing.',
      ],
      branchNotes:
        'Booking an hour is survivable and traceable. Running the slack is untraceable and kills people. Declaring the six barrels costs the run its profit and buys a clean relationship with the Company. Dumping them in the pound saves the crew and loses the Low Tally a great deal of money, which it will not forget. Running them is the branch where the party gets everything and a gantry fight at falling water.',
      failureConditions: [
        'Caught on the sill at reconciliation. Seven raft crew are named off the manifest you signed and hanged at the sluices.',
        'The barge is holed in the disused sluice and the cargo is on the bottom of the throat.',
        'Levin salt found aboard by gate-wardens, which is a capital charge in the Company town.',
      ],
      hiddenOutcomes: [
        'A standing channel survives only until the Company audits its own book, which it does on no fixed schedule.',
        'If the six barrels reach the Ascent unsealed, the gate price of levin salt doubles across the basin.',
        'The Low Tally records who opened the barrel. That is a note against the party for the rest of the campaign.',
      ],
      rewards: [
        row({ branch: 'Standing channel', reward: 'Repeatable transit through the gates at a Low Tally rate, for the campaign' }),
        row({ branch: 'Delivered, channel burned', reward: 'Payment in Weir transit seals and one [[item.weirhook|weirhook]] taken off a gantry crew' }),
        row({ branch: 'Declared the six', reward: 'A clean name at the toll house, which is worth more later than it looks now' }),
        row({ branch: 'Optional: schedule page', reward: 'Documentary proof that an unlogged release was deliberate' }),
      ],
      itemsRequired: ['item.stair-writ', 'item.moor-stake'],
      itemsConsumed: ['material.levin-salt'],
      npcChanges: [
        row({ npc: '[[npc.dagren-hoyle|Dagren Hoyle]]', change: 'Survives with a third crew, or is named at the sluices with them. He does not run.' }),
        row({ npc: '[[npc.ost-vennick|Ost Vennick]]', change: 'Learns that somebody is buying his hours for cargo he was not told about, and starts keeping a second book.' }),
        row({ npc: '[[npc.gwill-ossekind|Gwill Ossekind]]', change: 'His missing staves become the reason the low-water approach is unusable, which forces the booked route.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Large gain on delivery; permanent hostility if the six barrels are declared' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', change: 'Hostile on a slack run; grudgingly correct if the hour is booked and honoured' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Officially knows nothing and quietly credits the desk' }),
      ],
      worldChanges: [
        row({ where: '[[city.black-weir|The Black Weir]]', change: 'A bay watch is posted and the slack hour closes for about a year after any unlogged transit.' }),
        row({ where: '[[region.the-drown|The Drown]]', change: 'Raft crews price Weir work higher, which raises the cost of every cargo out of the delta.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Unsealed levin salt on the wharves brings ward-office inspectors to the basin for the first time.' }),
      ],
      devNotes:
        PROPOSAL('The two hundred barrels, the six loaded ones and the one-tide reconciliation are proposed. The Black Weir detail stays inside what already exists: basalt sluices, iron gantries, a schedule book and twelve Weirmasters.') +
        '\n\nDESIGN INTENT: the smuggling branch should be the one where the party is lied to by their own employer. The barrels are the turn. A party that has cheerfully run salt for the Low Tally opens a barrel and has to decide, at falling water, what they are.',
      flow: ULLAGE_RUN_FLOW,
    },
  }),

  E({
    id: 'quest.the-indenture-column',
    type: 'quest',
    name: 'The Indenture Column',
    status: 'draft',
    summary: 'The guild freight manifest has a column for people, and the Arena City bond-holders are the buyers.',
    tags: ['guild-line', 'branch', 'indenture', 'arena-city', 'dark'],
    fields: {
      overview:
        "The manifest is four sheets of standard freight stock. Salt, cane, bar iron, hides, and a fifth column headed bonded, crewed. Sixty-one entries. Each has a name, a term in years, a port of enforcement and a valuation. Four of the sixty-one are under fourteen. The column is not a secret and it is not smuggling: it is declared cargo, tolled as cargo, insured as cargo, and lawful in both the port it leaves and the port it enters.\n\nThe buyers are Chamber houses in [[city.arena-city|the Arena City]], where a bond bought is unexpired contract and unexpired contract is a vote. [[faction.bondwrights-hall|The Bondwrights' Hall]] writes the paper, [[faction.red-writ|the Red Writ]] holds most of what it becomes, and [[npc.tazrit-nourem|Tazrit n'Ourem]] holds the originals for about a third of the column in a strongroom under her middle tower in the Pans.\n\nNine of the sixty-one bonds are void on their face: wrong seal, expired term, or enforcement named in a port that will not enforce. Two more are void in [[city.mediterranean-city|the Mediterranean City]] and nowhere else. That is the entire moral arithmetic of this quest. You can forge documents for about nine people. There are sixty-one.",
      questType: 'Branch',
      level: '6 to 8. The combat is optional and going to it is usually a mistake.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.bondwrights-hall'],
      startLocation: ['district.arena-city-writ-court', CITY.arenaCity],
      prerequisites: [
        'The column desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'Enough standing to be handed a manifest rather than a crate.',
        'Somewhere to put a person who is legally cargo. This is harder than it sounds and the quest should make it so.',
      ],
      recommendedSkills: ['skill.bond-broking', 'skill.writ-craft', 'skill.plain-letters', 'skill.false-proof', 'skill.the-cold-read'],
      objectives: [
        'Read the column and establish the sixty-one names, which nobody involved has ever done aloud.',
        'Determine which bonds are void, where, and on what grounds.',
        'Decide whether the column is run, diverted or entered into the Writ Court record.',
        'Account to the Assize for the column as delivered.',
      ],
      optionalObjectives: [
        "Get the originals out of Tazrit n'Ourem's strongroom, and have an answer ready for who feeds the people you have just freed.",
        'Get the four under fourteen off the column by any means, including buying them.',
        "Recover [[npc.aylun-torgai|Aylun Torgai's]] voided manumission from the contract vault while you are in the Ring's paperwork.",
      ],
      branchNotes:
        "Run it and the column arrives on schedule, the Assize is satisfied, and the party knows all sixty-one names. Divert it and the nine void bonds can be lifted cleanly, which means fifty-two people are still delivered by the party's own hand. Expose it and the manifest is read into the Writ Court, the trade is suspended for a season, and the same people are re-sold under fresh paper by spring because nothing about their debt has changed.\n\nThere is no branch in which everyone is freed. That is deliberate and it is the point of the quest. What changes between endings is who is freed, who is sold on regardless, and which clerk the guild burns to keep the paperwork clean.",
      failureConditions: [
        'The diversion is attempted on the drovers ground and the escort panics. The people in the carts are the ones who get hurt.',
        'The column arrives complete and the party is commended. There is no mechanical penalty, and that is the failure.',
        'Forged papers are re-assayed and the nine are returned to the register with their terms extended.',
      ],
      hiddenOutcomes: [
        'The forged nine hold only until somebody re-assays them, which is a background clock, not an event.',
        'Whatever the party does, a junior Assize clerk is struck off to keep the freight books clean.',
        'Exposure moves the trade rather than ending it: within a year the Pan crews are worked to term in place instead of being shipped east.',
      ],
      rewards: [
        row({ branch: 'Column run', reward: 'Guild standing at Seated factor, a bonded warehouse key, and the names' }),
        row({ branch: 'Column diverted', reward: 'Nine people lawful and alive, and a permanent enemy in the Bondwrights' }),
        row({ branch: 'Column exposed', reward: 'A season of suspended trade, a Writ Court record, and no payment at all' }),
        row({ branch: "Optional: Torgai's manumission", reward: 'A free and hunted fighter who owes you nothing and helps anyway' }),
      ],
      itemsRequired: ['item.indenture-bond'],
      itemsConsumed: ['item.stair-writ'],
      npcChanges: [
        row({ npc: "[[npc.tazrit-nourem|Tazrit n'Ourem]]", change: 'Either loses a third of her paper and starts buying it back, or gains the column and a grievance against the party.' }),
        row({ npc: '[[npc.aylun-torgai|Aylun Torgai]]', change: 'Free and hunted, or fighting until the night she loses. There is no third state.' }),
        row({ npc: '[[npc.berke-chagra|Berke Chagra]]', change: 'Buys any bonds the party leaves loose, at a discount, and says thank you.' }),
      ],
      repChanges: [
        row({ faction: "[[faction.bondwrights-hall|The Bondwrights' Hall]]", change: 'Large gain if run; permanent hostility and a civil suit if exposed' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', change: 'Gains or loses sixty-one unexpired contracts, which is votes in the Chamber' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'The only faction that improves on exposure, and it will say so loudly' }),
      ],
      worldChanges: [
        row({ where: '[[city.arena-city|The Arena City]]', change: 'The Chamber gains or loses sixty-one contract votes, which moves who holds the casting weight for two years.' }),
        row({ where: '[[city.sifting-city|The Sifting City]]', change: 'If the trade is exposed, pan crews stop being shipped and are worked to term in the Pans instead.' }),
        row({ where: '[[city.mediterranean-city|The Mediterranean City]]', change: 'The Bondwrights push a bond-recognition clause at the harbour court, and the fight over it lasts years.' }),
      ],
      devNotes:
        PROPOSAL('The sixty-one entries, the nine void bonds and the four children are proposed. The load-bearing decision is that the trade is legal, declared and insured, so the quest cannot be solved by violence or by exposure alone.') +
        '\n\nTONE, NOT OPTIONAL: this is written as bookkeeping. No auction scene, no cages, no cruelty performed for the table. The horror is the fifth column on a standard freight sheet and the fact that everyone involved is doing their job. Read names aloud. Let the party count. Do not describe suffering in detail and never make it a set piece.\n\nIf a table does not want this content, cut the branch entirely: it is deliberately isolated behind one desk in the opener and nothing downstream requires it.',
      flow: INDENTURE_COLUMN_FLOW,
    },
  }),

  E({
    id: 'quest.the-second-ledger',
    type: 'quest',
    name: 'The Second Ledger',
    status: 'draft',
    summary: 'Every counting house keeps two books. Get inside a Sky City house and copy the one that is true.',
    tags: ['guild-line', 'branch', 'espionage', 'sky-city'],
    fields: {
      overview:
        "The correspondence desk wants the true book of the ninth house under [[landmark.the-mooring-crown|the Mooring Crown]]. The stated reason is credit: the Ascent lends against Sky City counterweight leases and would like to know what it is lending against. The real reason is that four fifths of the clearing reserve is already out on those leases and [[npc.wessel-ondriek|Wessel Ondriek]] needs to know how bad it is before anyone else does.\n\nThe second book is not a fraud ledger. It is a tonnage ledger. [[npc.cesille-vaudry|Cesille Vaudry]] has been shaving the mass returns for years because the honest figure would require eviction lists, and the city is carrying several hundred tonnes over its rated load. Copying that book makes the party the arbiter of which quarter goes down the ropes.\n\nGetting there is the other half. Every gram aboard is licensed under [[mechanic.mass-warrant|the Mass Warrant]], so a party arrives declared and searched, or arrives as ballast with [[npc.perrine-orlaunt|Perrine Orlaunt]], who can move a person off the ring with no manifest entry and once suffocated a woman doing it.",
      questType: 'Branch',
      level: '6 to 8. Infiltration at height, with no way down that is not a mechanism.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.concord-of-weights', 'npc.wessel-ondriek'],
      startLocation: ['district.sky-city-crown-houses', CITY.skyCity],
      prerequisites: [
        'The correspondence desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'Passage to the ring, declared or otherwise.',
        'Someone in the party who can read a double-entry book fast enough to copy the right pages.',
      ],
      recommendedSkills: ['skill.ledger-hand', 'skill.quiet-ground', 'skill.lattice-work', 'skill.dead-weight', 'skill.the-cold-read'],
      objectives: [
        'Reach the ninth house counting room in the Crown Houses.',
        'Establish which of the two books is the true one, which is not obvious.',
        'Copy or take the tonnage figures.',
        'Get off the ring with them.',
      ],
      optionalObjectives: [
        "Match the figures against [[npc.aubran-ferrieu|Aubran Ferrieu's]] sheets from the week of the Sixth Mast collapse.",
        'Leave the house believing its book was never read.',
        'Find out what the Assize already knows, which is more than it admits.',
      ],
      branchNotes:
        'Deliver the copy and the Assize holds permanent leverage over lattice-house credit, which is exactly the outcome the Ascent wants and the Sky City fears. Keep the copy and the party holds it instead, which is the more dangerous ending because the party now decides which quarter is evicted. Sell the fact of its existence without the figures and both cities close, the Assize disowns the party in writing, and Sky City houses stop dealing with Ascent factors for years.',
      failureConditions: [
        'Cover burned in the counting room, with no route down that the house does not control.',
        'Caught undeclared on a mooring line, which is ballast fraud and capital.',
        'Copying the wrong book, which is a plausible and quiet failure the party may not notice for weeks.',
      ],
      hiddenOutcomes: [
        'If the party keeps the figures, Vaudry is told privately who holds them and signs an eviction list rather than be exposed.',
        'The true figure, once known anywhere, moves the Ascent clearing rate within a season.',
        'Orlaunt adds the party to the list of people who know about the sealed ballast crate, which is a debt she cannot discharge.',
      ],
      rewards: [
        row({ branch: 'Delivered to the Assize', reward: 'Guild standing at Seated factor and the clearing rate a day early for a season' }),
        row({ branch: 'Kept', reward: 'Leverage over two cities, and a permanent target on the party' }),
        row({ branch: 'Optional: matched to Ferrieu', reward: 'A complete case for the Sixth Mast hearing, which the Assize will refuse to hold' }),
      ],
      itemsRequired: ['item.ballast-jacket'],
      itemsConsumed: ['item.stair-writ'],
      npcChanges: [
        row({ npc: '[[npc.cesille-vaudry|Cesille Vaudry]]', change: 'Signs the eviction list, or is ruined, or buys the party outright. She never simply confesses.' }),
        row({ npc: '[[npc.perrine-orlaunt|Perrine Orlaunt]]', change: 'Stops taking passengers for a season if the descent is noticed, which closes the only unlogged route.' }),
        row({ npc: '[[npc.aubran-ferrieu|Aubran Ferrieu]]', change: 'Gets his hearing if the figures are matched and made public, and is destroyed by what it finds.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Large gain on delivery; formal disownment on exposure' }),
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', change: 'Hostile either way once the tonnage question is raised at all' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', change: 'Will carry the copy sealed, and will read it, and will sell what it read' }),
      ],
      worldChanges: [
        row({ where: '[[city.sky-city|The Sky City]]', change: 'An eviction list is drawn against a named quarter, or the overload stands and the lattice fatigue clock keeps running.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Counterweight lease exposure becomes a number three more people know, and the clearing rate moves.' }),
        row({ where: '[[district.sky-city-lattice-town|Lattice Town]]', change: 'Rents fall wherever the eviction list is rumoured, months before anything is posted.' }),
      ],
      devNotes:
        PROPOSAL('The ninth house, the tonnage second book and the Assize brief are proposed. The espionage branch is deliberately built so the prize is a number rather than an object, which makes copying it a real alternative to stealing it.') +
        '\n\nRUN IT AS: a two-act heist where act two is arithmetic. The party who solves the entry problem still has to work out which book is true, and the honest answer is that the true one is the one with the ugly handwriting and no ruled margins, because it was never meant to be shown.',
      flow: SECOND_LEDGER_FLOW,
    },
  }),

  E({
    id: 'quest.the-master-weight',
    type: 'quest',
    name: 'The Master Weight',
    status: 'draft',
    summary: 'The brass standard under the Counting Stair sets every scale on the continent. Lift it, leave the copy.',
    tags: ['guild-line', 'branch', 'theft', 'gilded-ascent'],
    fields: {
      overview:
        "[[landmark.the-brass-standard|The Brass Standard]] is eleven reference masses in a sealed chamber under the eleventh terrace. Two keys, three seals, a warden at the outer door and a bailiff at the inner. It is not built to resist an army. It is built so that no one person can enter alone, which is a harder problem and a better heist.\n\nThe job is not to steal it. A missing standard is discovered within a day. The job is to leave a copy that is out by a fraction of an eighth, which is inside the tolerance of every field balance in the basin and outside the tolerance of nothing that matters. From the moment the swap is made, every transaction weighed against it skims, in one direction, forever, until someone re-assays.\n\nThe commission arrives through [[npc.doret-halvane|Doret Halvane]] with no client named. She has sixty-odd wax key impressions taken over twelve years of honest cable inspections and she will trade the whole board for her brother's indenture papers, which are in a strongroom in [[city.sifting-city|the Sifting City]]. That is the real price of this branch and it is payable before it starts.",
      questType: 'Branch',
      level: '7 to 9. One capital charge, and it is the only one on the books.',
      devStatus: 'Branch mapped',
      questGiver: ['npc.doret-halvane', 'faction.low-tally'],
      startLocation: ['landmark.the-brass-standard', CITY.gildedAscent],
      prerequisites: [
        'The standards desk, taken at the end of [[quest.short-weight|Short Weight]], or Halvane vouching for you instead.',
        'A cast copy accurate to a fraction of an eighth, which requires a foundry and an ageing period.',
        'Access to the eleventh terrace, which credit standing alone will not buy.',
      ],
      recommendedSkills: ['skill.proof-marking', 'skill.false-proof', 'skill.quiet-ground', 'skill.bench-sense', 'skill.cable-and-drum'],
      objectives: [
        'Cast and age a copy of one reference mass.',
        'Obtain two keys and defeat three seals without any of them being reported.',
        'Make the swap and leave the chamber recording eleven masses.',
        'Be somewhere else, provably, at the next scheduled inspection.',
      ],
      optionalObjectives: [
        "Get Halvane's brother's papers out of Assay Row first, which is a whole expedition and she will not move without it.",
        'Work out who cast the older forgery, which is a thread nobody in the Concord wants pulled.',
        'Leave the true mass somewhere it can be produced later, which is worth more than selling it.',
      ],
      branchNotes:
        'Leave the copy and the skim runs until a re-assay, which is a background clock the campaign should actually track. Hand the older forgery to the Assize instead and the party is paid in standing rather than coin, and somebody who has been dead-quiet for years is hanged for it. Put the true mass back and walk away and the party has learned the single most damaging fact in the basin and used none of it, which is a legitimate ending and should be rewarded as one.',
      failureConditions: [
        'Caught at the standard. Signing a false weight against it is the only capital offence on the Ascent books and the Concord asked for it.',
        'Taking both masses, leaving the chamber a mass short, and failing the count at the next inspection.',
        'A copy that is out by more than a fraction of an eighth, which fails the first serious assay rather than the tenth.',
      ],
      hiddenOutcomes: [
        'One of the eleven masses is already a copy and older than the party. Whoever re-assays finds both.',
        'A re-assay makes every contract sealed since the swap contestable, which is years of litigation and several ruined houses.',
        'Halvane burns the wax board the day she gets her brother back, which closes sixty warehouses to everyone else forever.',
      ],
      rewards: [
        row({ branch: 'Copy left', reward: 'A skim on basin trade paid to whoever commissioned it, and a clock the party cannot stop' }),
        row({ branch: 'Old forgery surrendered', reward: 'Concord standing at Sealed, and a hanging you attend or do not' }),
        row({ branch: 'True mass restored', reward: 'Nothing material, and the only clean exit this branch offers' }),
        row({ branch: "Optional: Halvane's board", reward: 'Sixty bonded warehouse keys in wax, usable once each' }),
      ],
      itemsRequired: ['item.cut-seal', 'material.orrery-bronze'],
      itemsConsumed: TBD('Casting and ageing a reference mass needs a foundry, and the Assay Cage is the only lawful one on the continent. Where is the copy actually made, and is that a step in this quest or a prior one?'),
      npcChanges: [
        row({ npc: '[[npc.doret-halvane|Doret Halvane]]', change: 'Leaves the basin with her brother, or stays and becomes the party’s permanent fixer. Not both.' }),
        row({ npc: '[[npc.wessel-ondriek|Wessel Ondriek]]', change: 'A false standard he can survive. A re-assay he cannot, and he knows the difference.' }),
        row({ npc: '[[npc.brask-vellmar|Brask Vellmar]]', change: 'Recognises the same pressure he was put under and will testify, once, for the right party.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Struck off permanently if suspected; Sealed if the old forgery is handed over' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Large gain, and a claim on the party that never expires' }),
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', change: 'Delighted. A basin re-assay moves grade pricing back to the Pans, which is their standing demand.' }),
      ],
      worldChanges: [
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'On a re-assay, every contract sealed since the swap becomes contestable and the courts stop functioning for a season.' }),
        row({ where: '[[machine.the-assay-cage|The Assay Cage]]', change: 'Reference masses are re-cut and the waiting list for certification goes from five weeks to a year.' }),
        row({ where: '[[city.sifting-city|The Sifting City]]', change: 'Grade stamps are re-priced in the Pans rather than in the basin, which is a decade-old grievance resolved by theft.' }),
      ],
      devNotes:
        PROPOSAL('The eleven masses, the two keys and three seals, the older forgery and the fraction-of-an-eighth tolerance are proposed. The older forgery is the best thing in this quest: it says somebody already did this and the world did not notice.') +
        '\n\nDESIGN INTENT: the theft branch should not be about getting in. It should be about the fact that a successful theft here has no visible effect for months and then has an enormous one. Track the re-assay clock openly on the table.',
      flow: MASTER_WEIGHT_FLOW,
    },
  }),

  E({
    id: 'quest.written-off',
    type: 'quest',
    name: 'Written Off',
    status: 'draft',
    summary: 'A runaway factor is in Orath with the guild paper. The Assize wants the account closed, not recovered.',
    tags: ['guild-line', 'branch', 'assassination', 'orath', 'dark'],
    fields: {
      overview:
        "The composition desk deals with accounts that cannot be settled by letter. A factor of the Assize left the basin with a bundle of guild paper and is in [[city.orath|Orath]], which is where he stopped because guild law does not reach it. The instruction is precise and is given in writing: the account is to be closed, not recovered. The Assize does not say kill, does not supply means, and will disown anyone who claims it did.\n\n[[npc.kavel-uur|Kavel Uur]] runs the only fixed schedule across the waste margin and keeps a private count of who goes into the waste and who comes out. Everything in Orath is posted on [[mechanic.the-ration-board|the Ration Board]]: water, powder and shot, drawn against a line, and an overdraw is labour you cannot refuse.\n\nThe factor is on the Outward Row and is not hiding. He runs a water round. Eleven households out past the last well drink because he is there. He kept the paper because he was told to lose it, and the paper names the advances the Ascent holds against [[landmark.the-third-bore|the Sifting City's water]]. Whatever the party does, the Assize settles the account: if not by the party then by a [[faction.red-writ|Red Writ]] contract cut a season later, and the Writ company is less careful about who else is standing there.",
      questType: 'Branch',
      level: '7 to 9. The fight is small, avoidable and expensive.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.concord-of-weights'],
      startLocation: ['district.orath-the-outward-row', CITY.orath],
      prerequisites: [
        'The composition desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'Passage across the waste margin, which in practice means Kavel Uur.',
        'A ration line in Orath, or the labour owed for not having one.',
      ],
      recommendedSkills: ['skill.the-cold-read', 'skill.the-far-walk', 'skill.throat-work', 'skill.writ-craft', 'skill.quiet-ground'],
      objectives: [
        'Cross the waste margin and find the factor, which takes longer than expected because nobody there is counted.',
        'Recover the guild paper, or establish that it no longer exists.',
        'Close the account by whatever instrument you are prepared to be filed as.',
        'Report to the desk, in person, in the Salt Office.',
      ],
      optionalObjectives: [
        'Find out what the water round is worth to the eleven households before deciding anything.',
        'Read the paper before you hand it over.',
        "Get onto Kavel Uur's private count, which is a favour worth more than the fee.",
      ],
      branchNotes:
        'Kill him and the account closes and the guild files the party as an instrument, which changes every subsequent offer they receive for the rest of the campaign. Extort or resettle him and the account transfers, the paper arrives, and the party is filed as a negotiator, which is a different and better class of work. Walk away and the account still closes, three months later, by contract, and the water round stops anyway.',
      failureConditions: [
        'Leaving without the paper. The Assize cuts a Red Writ contract and the party is not consulted again.',
        'Overdrawing the ration line and owing the muster, which strands the party in Orath for the season.',
        'Killing him before reading the paper, in which case the Sifting City bore advances stay lost and nobody in the Ascent learns why he ran.',
      ],
      hiddenOutcomes: [
        'The paper names the bore advances that would give the Ascent legal title to a desert city’s water.',
        'The eleven households on the Outward Row lose their water round in every branch except the one where he is resettled with it.',
        'Kavel Uur’s count records that the party went out with four and came back with three, and he sells that count.',
      ],
      rewards: [
        row({ branch: 'Account closed by hand', reward: 'Payment in full, guild standing at Sealed, and the label' }),
        row({ branch: 'Account transferred', reward: 'A smaller fee, better standing, and a living witness who owes you' }),
        row({ branch: 'Optional: the paper read', reward: 'Advance knowledge of the Sifting City bore purchase, tradeable to the Pale Assay' }),
      ],
      itemsRequired: ['food.dew-melon'],
      itemsConsumed: TBD('Does the Assize supply the instrument, or is a party expected to bring its own? The written instruction is careful never to say, which may be answer enough.'),
      npcChanges: [
        row({ npc: '[[npc.kavel-uur|Kavel Uur]]', change: 'Adds the party to the private count. He never mentions it and he never forgets it.' }),
        row({ npc: '[[npc.wessel-ondriek|Wessel Ondriek]]', change: 'Gets the bore paper he needs, or does not, which changes what he can bid at the concession auction.' }),
        row({ npc: '[[npc.tazrit-nourem|Tazrit n\'Ourem]]', change: 'Learns the Ascent is buying water paper and starts buying pan crews faster.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Gain either way; the change is in what kind of work you are offered afterwards' }),
        row({ faction: '[[faction.red-writ|The Red Writ]]', change: 'Mild hostility. You took a contract they had already priced.' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'Hostile if the killing becomes known, and it becomes known in about a year' }),
      ],
      worldChanges: [
        row({ where: '[[city.orath|Orath]]', change: 'Eleven households past the last well lose their water round, and the Ration Board does not record why.' }),
        row({ where: '[[city.sifting-city|The Sifting City]]', change: 'If the bore paper reaches the Ascent, the Concord holds legal title to the city’s water within two years.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'The Assize acquires a documented method for reaching people outside jurisdiction, and uses it again.' }),
      ],
      devNotes:
        PROPOSAL('The water round, the eleven households and the bore paper are proposed. Nothing here invents Orath: the town stays a hard frontier row on one road with a ration board, which is the only thing the existing entry commits to.') +
        '\n\nTONE: no assassin glamour. He is a middle-aged clerk with a cart and a water round who is entirely aware of why the party is there. Give him one conversation before any violence is possible, and make him useful in it.',
      flow: WRITTEN_OFF_FLOW,
    },
  }),

  E({
    id: 'quest.the-casting-voice',
    type: 'quest',
    name: 'The Casting Voice',
    status: 'draft',
    summary: 'One tariff vote in the Mediterranean City sets copper duty for nine years. Buy it, break it or sit it.',
    tags: ['guild-line', 'branch', 'politics', 'mediterranean-city'],
    fields: {
      overview:
        "Copper duty in the port is set for nine years at a time by the fellowship of [[faction.conduit-college|the Conduit College]], and the session is in six weeks. Nineteen fellows sit. Nine are committed each way. One holds the casting voice and has not said which way he leans, because he has not decided and because being undecided is worth more than being either.\n\nThe Assize wants the duty pinned low. Cheap copper means cheap conduit, and cheap conduit means Ascent factors selling fittings into every city on the continent through a port they do not control. What the Assize will not do is offer money openly. The College does not take money. It takes patents, conduit hours and problems solved, and a straightforward bribe gets guild bonds barred from the harbour court permanently.\n\nThere are three real levers. The fellowship is short of [[mechanic.conduit-hours|conduit hours]] and would trade a duty position for pressure slots. The casting fellow holds an unlicensed patent on the College's own roll, which is leverage that works once and makes an enemy for life. And [[npc.anthimos-vellani|Anthimos Vellani]] has three patients in the terraced quarter carrying a marsh parasite that should not exist west of the Drown, which would postpone the session by a year and rot the olive harvest doing it.",
      questType: 'Branch',
      level: '6 to 8. Entirely winnable without a weapon drawn.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.concord-of-weights'],
      startLocation: ['district.mediterranean-city-orrery-precinct', CITY.mediterranean],
      prerequisites: [
        'The tariff desk, taken at the end of [[quest.short-weight|Short Weight]].',
        'Standing to be admitted to the precinct at all, which is not sold at the gate.',
        'Six weeks of campaign time before the session.',
      ],
      recommendedSkills: ['skill.market-ear', 'skill.brokerage', 'skill.writ-craft', 'skill.the-cold-read', 'skill.pressure-fitting'],
      objectives: [
        'Count the roll and confirm which fellow holds the casting voice.',
        'Find something the fellowship wants more than the duty.',
        'Secure the vote before the session is called.',
        'Be in the chamber when it is read, because proxies are refused.',
      ],
      optionalObjectives: [
        'Get inside the unindexed section of the patent roll, which three fellows hold a third of each.',
        'Settle the parasite question without a quarantine.',
        'Leave the College believing it won.',
      ],
      branchNotes:
        'Win the argument on conduit hours and the duty is pinned low, Ascent factors hold a seat in the port for nine years, and the College is annoyed rather than hostile. Break the casting fellow with the unlicensed patent and the vote goes the same way and the College spends a decade finding out who did it. Turn the branch around and take the College’s side and the duty rises, the Assize loses, and the party holds a Mediterranean licence no Ascent house can get. Offer money openly and guild bonds are barred from the harbour court outright, which is the worst outcome available to the Concord and one of the funniest.',
      failureConditions: [
        'Any open offer of money, at any point, to any fellow.',
        'Using the outbreak to postpone the session, which works, and which seals forty households into the lazaret to do it.',
        'Missing the session. There is no second vote for nine years.',
      ],
      hiddenOutcomes: [
        'A postponed session passes the duty unopposed a year later, because the opposition has dispersed.',
        'The unlicensed patent is one of several. The roll is the College’s real treasure and it is not guarded like treasure, merely unindexed.',
        'If the duty is pinned low, the Sky City re-cables a quarter early and the lattice fatigue clock is set back by years.',
      ],
      rewards: [
        row({ branch: 'Duty pinned low', reward: 'Nine years of Ascent presence in the port, and guild standing at Seated factor' }),
        row({ branch: 'Duty raised', reward: 'A Conduit College licence in the party’s name, which no bribe has ever bought' }),
        row({ branch: 'Optional: the roll', reward: 'One working design the College has refused to license, at your own risk' }),
      ],
      itemsRequired: ['item.governor-spring'],
      itemsConsumed: TBD('The College does not take money, so what is a vote actually bought with? Conduit hours are the current guess and no one has priced them against a nine-year duty.'),
      npcChanges: [
        row({ npc: '[[npc.anthimos-vellani|Anthimos Vellani]]', change: 'Reports the parasite, or is made to, or is paid to keep the private ward quiet for another season.' }),
        row({ npc: '[[npc.melitta-aspri|Melitta Aspri]]', change: 'Notices that somebody is reading the roll and decides whether that is an ally or a threat.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.conduit-college|The Conduit College]]', change: 'Neutral to warm if argued; permanently hostile if the patent is used' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Large gain on a low duty; bonds barred from the harbour on an open bribe' }),
        row({ faction: '[[faction.bondwrights-hall|The Bondwrights\' Hall]]', change: 'Loses its harbour-court recognition campaign for a decade if the College is antagonised' }),
      ],
      worldChanges: [
        row({ where: '[[city.mediterranean-city|The Mediterranean City]]', change: 'Copper duty is fixed for nine years, which sets the price of every conduit fitting on the continent.' }),
        row({ where: '[[city.sky-city|The Sky City]]', change: 'Cheap copper brings a quarter’s re-cabling forward and buys the lattice several years.' }),
        row({ where: '[[district.mediterranean-city-the-lazaret|The Lazaret]]', change: 'Opened and sealed if the outbreak is used, with forty households inside it.' }),
      ],
      devNotes:
        PROPOSAL('The nineteen fellows, the nine-year duty term and the casting voice are proposed. The College refusing money is the design lock: it forces the political branch to be played as trade rather than as bribery.') +
        '\n\nRUN IT AS: a six-week clock with a visible tally. Post the nineteen names and let the party move them. The parasite option should always be available and should always be the wrong answer, and the quest should not say so.',
      flow: CASTING_VOICE_FLOW,
    },
  }),

  /* ================================================================ */
  /* STANDING INVESTIGATIONS                                           */
  /* ================================================================ */

  E({
    id: 'quest.the-chalk-that-lies',
    type: 'quest',
    name: 'The Chalk That Lies',
    status: 'draft',
    summary: 'Adulterated ward-chalk assays clean and fails under load. Trace the batch before a bound district slips.',
    tags: ['investigation', 'magic-city', 'infrastructure'],
    fields: {
      overview:
        "A chalk line on a load binding in the western sections is holding when it should have gone dead, and going dead all at once when it should have faded. [[faction.fetterhouse|The Fetterhouse]], through the chain-house wardens who actually maintain the bindings, wants the batch identified and pulled. Under [[mechanic.ward-load|Ward Load]] every binding carries a measured tonnage and a recut schedule, and a line that lies about its own condition breaks the entire maintenance model.\n\nThe kilns log every stick and the log is complete, which is the first surprise. [[npc.halvo-sarn|Halvo Sarn's]] private index of backdated permits is the second, because it puts the same batch number in two places at once. The third is sixty-one crates of the same batch cached in the deep [[region.white-pans|White Pans]], hundreds of kilometres off any sanctioned route, which [[npc.sahat-belek|Sahat Belek]] will guide the party to for passage papers.\n\nAnd the fourth is that the chalk may not be the fault at all. [[npc.toval-cherek|Toval Cherek]] has been shorting the alloy in the replacement chain links for two years to meet quota. They pass cold inspection and fail under sustained load, and he knows exactly which sections carry his work. [[npc.ysme-drannik|Ysme Drannik]], in the chain-house, knows which two of the nine chains are already dead and will trade the answer for one name struck off a proscription list.",
      questType: 'Investigation',
      level: '5 to 7. Industrial rather than heroic.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.fetterhouse'],
      startLocation: ['district.magic-city-chalk-row', CITY.magicCity],
      prerequisites: [
        'A licensed hand in the party, or a Fetterhouse warrant covering an unlicensed one.',
        'The load season is nine weeks away, which is the clock.',
      ],
      recommendedSkills: ['skill.chalk-hand', 'skill.ward-cutting', 'skill.load-binding', 'skill.bench-sense', 'skill.proof-marking'],
      objectives: [
        'Identify the batch by number and pull every stick of it from the western sections.',
        'Trace the supply line back through the kilns, the marl or the permit office.',
        'Establish whether the failures are the chalk, the links, or both.',
        'Get a recut and re-forge programme funded before the load season.',
      ],
      optionalObjectives: [
        'Reach the White Pans cache and account for all sixty-one crates.',
        'Get Ysme Drannik out of the chain-house, or get her the name she wants.',
        'Keep Toval Cherek alive and working, which is harder than prosecuting him.',
      ],
      branchNotes:
        'Pull the batch and re-forge the links and the western sections hold, the Fetterhouse keeps its monopoly on saying what is safe, and the party is owed a very large favour by an institution that does not like owing them. Publish the chain count instead and the Fetterhouse loses that monopoly, the city gets an honest number for the first time in a generation, and everyone finds out how bad it is at once. Do neither before the load season and a bound district comes down and is not rebuilt.',
      failureConditions: [
        'Testing a suspect binding in place, under load, with the party underneath it.',
        'The load season arrives with the batch still in the western sections.',
        'Cherek is arrested before the re-forge, which removes the only person who knows which sections carry his work.',
      ],
      hiddenOutcomes: [
        'A lost district is what finally forces [[quest.the-scar-concession|the concession auction]] into the open, which is how this thread feeds the main line.',
        'The cache permit numbers lead back to Chalk Row and implicate the permit office rather than the kilns.',
        'Two of the nine chains are already dead. That number is not in any prospectus and will not be until somebody puts it there.',
      ],
      rewards: [
        row({ branch: 'Batch pulled and links re-forged', reward: 'Fetterhouse standing, a [[item.bound-harness|bound harness]] licence, and the western sections intact' }),
        row({ branch: 'Chain count published', reward: 'The Fetterhouse loses its safety monopoly and the party is the reason' }),
        row({ branch: 'Optional: the cache', reward: 'Sixty-one crates of ward chalk and passage papers owed to Sahat Belek' }),
      ],
      itemsRequired: ['material.ward-chalk', 'item.chalked-harness'],
      itemsConsumed: ['item.ward-pin'],
      npcChanges: [
        row({ npc: '[[npc.toval-cherek|Toval Cherek]]', change: 'Re-supplied and kept at the forge, or blamed for the last slippage as well as this one.' }),
        row({ npc: '[[npc.ysme-drannik|Ysme Drannik]]', change: 'Released, or still in the chain-house with the only two numbers that matter.' }),
        row({ npc: '[[npc.halvo-sarn|Halvo Sarn]]', change: 'His index becomes evidence, which makes every practitioner he ever saved a threat to him.' }),
        row({ npc: '[[npc.sahat-belek|Sahat Belek]]', change: 'Gets his daughter out of the Pans, or does not, and stops guiding anyone if he does not.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', change: 'Large gain on a quiet fix; institutional collapse on publication' }),
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', change: 'Exposed as the route the cached crates travelled, whether or not it knew' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Loses a chalk line, gains a market, and is broadly indifferent' }),
      ],
      worldChanges: [
        row({ where: '[[city.magic-city|The Magic City]]', change: 'Either the western sections hold, or a bound district is lost and stays lost.' }),
        row({ where: '[[district.magic-city-chalk-row|Chalk Row]]', change: 'Permit issue is moved out of the ward office and the whole backdating economy collapses.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Ward chalk triples in price for a season and the concession auction is brought forward.' }),
      ],
      devNotes:
        PROPOSAL('The batch, the sixty-one crates and the shorted alloy are proposed, and all three are already referenced from the NPC and city modules, so keep the numbers stable.') +
        '\n\nDESIGN INTENT: the answer is boring on purpose. Nobody sabotaged anything. A smith fell behind on quota and a permit clerk sold time. The fix is alloy supply, funding and a rota, which is what makes it a grounded-fantasy quest rather than a conspiracy.',
      flow: CHALK_THAT_LIES_FLOW,
    },
  }),

  E({
    id: 'quest.the-sixteenth-mast',
    type: 'quest',
    name: 'The Sixteenth Mast',
    status: 'draft',
    summary: 'The Sky City registers fifteen mooring masts. Somebody has been landing at a sixteenth for two years.',
    tags: ['investigation', 'sky-city', 'smuggling'],
    fields: {
      overview:
        "Fifteen masts, fifteen crown houses, fifteen registered interests. The arithmetic has been tidy for a century and the [[faction.mooring-assize|Mooring Assize]] likes it that way. Landing intervals over the last two years do not close: there are arrivals with no mast, mass declared against berths that were occupied, and a recurring eleven-minute gap on the eastern arc that nobody has ever had to explain.\n\nUnder [[mechanic.mass-warrant|the Mass Warrant]], landing at an unregistered mast is a charge against the mast-holder as well as the pilot, which is why the Assize is investigating rather than raiding. The physical answer is that the sixteenth mast is hung off the stub of [[landmark.the-sixth-mast|the Sixth Mast]], in the one place nobody in the Register will look, because looking at the Sixth Mast means looking at the collapse.\n\nThe Assize cannot survive both outcomes. Strike the mast off and it admits publicly that it lost count of the masts holding a city in the air. Name the owner and a sixteenth interest exists where there is no seat for one, which opens a succession fight between lattice houses that has been dormant for two generations.",
      questType: 'Investigation',
      level: '5 to 7. Height, weather and a paperwork trail.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.mooring-assize'],
      startLocation: ['district.sky-city-mooring-ring', CITY.skyCity],
      prerequisites: [
        'A mass warrant in the party’s own name, which means every gram is already declared.',
        'Two years of landing intervals, which the Register will supply and has not read.',
      ],
      recommendedSkills: ['skill.lattice-work', 'skill.ledger-hand', 'skill.set-and-brace', 'skill.weather-eye', 'skill.quiet-ground'],
      objectives: [
        'Reconcile two years of landing intervals against fifteen registered masts.',
        'Locate the sixteenth mast physically.',
        'Establish who holds it and who has been landing at it.',
        'Report to the Register, in whatever form you choose.',
      ],
      optionalObjectives: [
        "Match the arrivals against [[npc.aubran-ferrieu|Aubran Ferrieu's]] true tonnage sheets and get him his hearing.",
        'Find out what has actually been landing there, which is not what the Assize assumes.',
        'Get the three people living on the mast off it before anything is decided.',
      ],
      branchNotes:
        'Struck off quietly, the landings stop, the Register survives by admitting a clerical error, and unlogged traffic simply moves to the counterweight runs within a season. Named in session, the mast-holder is exposed, a succession fight opens between crown houses, and the Register is reorganised out of existence. In both cases somebody was living on that mast, and the difference between the endings is largely what happens to them.',
      failureConditions: [
        'The mast is cut down before it is surveyed, with three people on it.',
        'Being caught on the lattice by a ballast crew who also cannot be found at the shelf foot.',
        'Reporting the mast without the interval reconciliation, which the Register will reject and then bury.',
      ],
      hiddenOutcomes: [
        'Naming the owner before the landings are stopped gets the mast cut down the same night.',
        'The unregistered mast is unrecorded mass, which is exactly what the Sixth Mast collapse was made of.',
        '[[npc.cesille-vaudry|Cesille Vaudry]] wants the mast stopped for reasons that have nothing to do with smuggling, because unrecorded mass ruins her forged returns.',
      ],
      rewards: [
        row({ branch: 'Struck off quietly', reward: 'Mooring Assize standing, mast access, and a [[item.mooring-lance|mooring lance]] licence' }),
        row({ branch: 'Owner named', reward: 'A crown house permanently in the party’s debt and another permanently against them' }),
        row({ branch: 'Optional: Ferrieu’s hearing', reward: 'The Sixth Mast reopened, and the seal that signed off the overload' }),
      ],
      itemsRequired: ['item.ballast-jacket'],
      itemsConsumed: TBD('What does a survey at height actually burn through — spar stock, cable, or a lattice crew’s licensed hours? The Sky City meters all three and the quest currently prices none of them.'),
      npcChanges: [
        row({ npc: '[[npc.aubran-ferrieu|Aubran Ferrieu]]', change: 'Reinstated and above ground for the first time in four years, or left at the shelf foot with his box.' }),
        row({ npc: '[[npc.perrine-orlaunt|Perrine Orlaunt]]', change: 'Loses the sixteenth mast as a route and has to use the ballast drop instead, which is how people die.' }),
        row({ npc: '[[npc.cesille-vaudry|Cesille Vaudry]]', change: 'Quietly assists, and is quietly implicated, depending on how the mass returns are read.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', change: 'Survives diminished, or is reorganised and its survey series sealed' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Loses the best unlogged berth above the shelf and prices everything else higher' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Interested in any Sky City figure that touches counterweight leases, for its own reasons' }),
      ],
      worldChanges: [
        row({ where: '[[city.sky-city|The Sky City]]', change: 'Either fifteen masts and a chastened Register, or sixteen interests and a succession fight.' }),
        row({ where: '[[district.sky-city-counterweight-quarter|The Counterweight Quarter]]', change: 'Unlogged descent traffic relocates here, which puts smuggling directly under the eviction question.' }),
        row({ where: '[[landmark.the-sixth-mast|The Sixth Mast]]', change: 'Becomes an inspected structure again for the first time since the collapse.' }),
      ],
      devNotes:
        PROPOSAL('The eleven-minute gap and the tie-in to the Sixth Mast stub are proposed. The fifteen houses matching fifteen masts already exists in the city module, so the arithmetic is fixed: a sixteenth mast means a sixteenth interest with no seat.') +
        '\n\nRUN IT AS: a records job with one terrifying climb in it. The three people living on the mast should not be mentioned by the Assize at any point, and should be the first thing the party sees when they get there.',
      flow: SIXTEENTH_MAST_FLOW,
    },
  }),

  E({
    id: 'quest.who-gets-the-light',
    type: 'quest',
    name: 'Who Gets the Light',
    status: 'draft',
    summary: 'Blight has cut the Sunwell yield. Someone must rule which galleries lose mirror-hours, and go hungry.',
    tags: ['city-state', 'cave-agrarian-city', 'politics', 'famine'],
    fields: {
      overview:
        "Light in the Hollow Karst is issued in lumen-hours per gallery under [[mechanic.the-mirror-rota|the Mirror Rota]], and the rota is the city's actual currency. A blight in the terraces has cut the yield by about a fifth. The books say a tenth, because [[npc.iratze-zubiate|Iratze Zubiate]] has been skimming hours from the grain terraces to cover two lower galleries that have been dark for over a year after a duct collapse she could not repair alone and did not report.\n\n[[faction.mirror-assembly|The Mirror Assembly]] does not want to make the decision and will enact whatever allocation is brought to it. [[npc.ossane-gorbea|Ossane Gorbea]] issues the hours and is buying failed galleries through a cousin after first starving them. [[npc.bedel-lehun|Bedel Lehun]] grows an unregistered violet strain on the fourth terrace that yields double in half the light, and half his terrace already eats it daily and cannot sleep.\n\nUnder all of it is the deep rota: galleries worked by debtors the Assembly stopped counting as citizens, whose hours are not on the allocation at all because they are not on the roll. Bringing their returns into open session forces the Assembly either to enfranchise several hundred people or to say aloud that it will not.",
      questType: 'Main',
      level: '6 to 8. No combat spine. The stakes are a city’s calorie budget.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.mirror-assembly', 'npc.ossane-gorbea'],
      startLocation: ['district.cave-agrarian-city-mirror-quarter', CITY.caveAgrarian],
      prerequisites: [
        'Standing enough to be heard in the Mirror Quarter, which is bought with competence rather than money.',
        'The allocation must be filed before the flush cycle turns, which is about five weeks.',
      ],
      recommendedSkills: ['skill.mirror-cutting', 'skill.spore-lore', 'skill.brokerage', 'skill.ledger-hand', 'skill.crowd-turning'],
      objectives: [
        'Establish the true shortfall rather than the filed one.',
        'Survey every gallery that is asking for hours, including the ones that are not.',
        'Broker an allocation the Assembly can vote without splitting.',
        'File it before the flush cycle turns.',
      ],
      optionalObjectives: [
        'Reopen the two collapsed ducts, which needs bodies and rope rather than sympathy.',
        'Register the violet strain, or suppress it, or export it.',
        "Get the deep rota's returns read into open session.",
      ],
      branchNotes:
        'Reopen the ducts and register the strain and the cuts can be held to two galleries, which is the best outcome available and still ends two communities. Bring the deep rota into session and everybody above them loses hours to pay for enfranchising them, and they will know exactly who to blame. Bargain blind on the filed figures and four galleries go dark permanently: their crops, their trades and their people leave the world state, and the survivors go to the Ascent Basin or stay and starve.',
      failureConditions: [
        'Cutting a gallery that will not go, which turns into a mirror fight and costs the city its silvered plate.',
        'Filing after the flush cycle turns, in which case Gorbea files her own allocation instead.',
        'Reopening the ducts without telling anyone, which fixes the supply and leaves the fraud in place.',
      ],
      hiddenOutcomes: [
        'Left unregistered, the violet strain spreads on its own and the city sleeps badly for a decade.',
        'Gorbea acquires title to whatever goes dark, whichever allocation is chosen. She has already bought the option.',
        'A cut in karst grain calls in the Concord advances against next year’s light allocation, which is a debt on daylight.',
      ],
      rewards: [
        row({ branch: 'Cuts held to two galleries', reward: 'Assembly standing, a permanent light allocation of your own, and two dead communities' }),
        row({ branch: 'Deep rota enfranchised', reward: 'Several hundred new citizens and the enmity of every gallery that paid for them' }),
        row({ branch: 'Optional: ducts reopened', reward: 'The city’s food supply materially improved, which the world state should reflect' }),
      ],
      itemsRequired: TBD('The city allocates light by the lumen-hour and owns no instrument that measures one. Does the survey need a gauge nobody has built, or only a reeve who will believe the party?'),
      itemsConsumed: ['material.sunwell-mica'],
      npcChanges: [
        row({ npc: '[[npc.iratze-zubiate|Iratze Zubiate]]', change: 'Cleared and re-supplied, or exposed and replaced by someone who cannot align two hundred mirrors.' }),
        row({ npc: '[[npc.bedel-lehun|Bedel Lehun]]', change: 'Licensed, prosecuted, or quietly left alone, and each is a different city in ten years.' }),
        row({ npc: '[[npc.ossane-gorbea|Ossane Gorbea]]', change: 'Exposed by her own ledger, or richer by four galleries and reappointed.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.mirror-assembly|The Mirror Assembly]]', change: 'Gains legitimacy on any allocation it did not have to argue about' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Calls in grain advances if the yield falls, which it does in every branch' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'Recruits heavily in the deep rota whatever the outcome' }),
      ],
      worldChanges: [
        row({ where: '[[city.cave-agrarian-city|The Cave Agrarian City]]', change: 'Between zero and four galleries go dark permanently and are removed from the city’s economy and map.' }),
        row({ where: '[[district.cave-agrarian-city-deep-rota|The Deep Rota]]', change: 'Either enters the roll as citizens, or is formally written out of it in open session.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Karst grain volumes fall and the Ascent becomes the karst’s creditor on daylight itself.' }),
      ],
      devNotes:
        PROPOSAL('The one-fifth shortfall against a filed one-tenth is the proposed engine of the quest. Everything else here is already established in the city and NPC modules and should be kept stable.') +
        '\n\nDESIGN INTENT: this is the model for a city-state-changing quest. Whatever is cut is cut for good, and the wiki should show it: districts removed, crops removed, trades removed. Do not offer a restoration path later.',
      flow: WHO_GETS_THE_LIGHT_FLOW,
    },
  }),

  E({
    id: 'quest.the-felling-order',
    type: 'quest',
    name: 'The Felling Order',
    status: 'draft',
    summary: 'Eleven days until the Marshalcy fells an infested quarter with families still living inside the trunk.',
    tags: ['timed', 'tree-city', 'failable', 'evacuation'],
    fields: {
      overview:
        "The order is posted on the pad at [[landmark.the-ash-ring|the Ash Ring]] eleven days before it is carried out, and the tenth pad was cleared and levelled before the notice went up, which is how the city found out. [[district.tree-city-sixth-quarter|The Sixth Quarter]] is to be dropped and fired. The stated cause is [[creature.bolewright-wasp|bolewright]] galleries through the heartwood, and the survey may be honest, forged, or honest and early.\n\nAbout four hundred people live in the trunk. Going means the timber yards, because leaving a condemned quarter cancels no debt and the yards are where debt is worked. That is the reason the quarter will not simply walk out, and any plan that does not answer it will fail on day nine with people still inside.\n\n[[npc.aune-mustsalu|Aune Mustsalu]] will give the word on schedule and will hate it. She is also forging deaths on the conscription rolls to keep thirty children of a purged quarter off them, and her own quartermaster has started reconciling ration draws against the roll. Exposing her ends her and removes the only authority who can delay anything. Covering for her makes the gates of [[landmark.bastion-bole|the Bastion Bole]] owe a debt, and the debt is called during the felling.",
      questType: 'Main',
      level: '5 to 7. A hard clock and a moral problem, in that order.',
      devStatus: 'Branch mapped',
      questGiver: ['npc.aune-mustsalu', 'faction.pitchguard'],
      startLocation: ['district.tree-city-sixth-quarter', CITY.treeCity],
      prerequisites: [
        'Being in the Tree City on the day the order is posted. There is no way to arrive late.',
        'Eleven days of campaign time. The quest runs on the calendar, not on scenes.',
      ],
      recommendedSkills: ['skill.gallery-drill', 'skill.dead-weight', 'skill.set-and-brace', 'skill.crowd-turning', 'skill.bench-sense'],
      objectives: [
        'Read the survey and decide whether you believe it.',
        'Find somewhere four hundred people can go that is not the timber yards.',
        'Move them, break the order, or buy days from a bole captain.',
        'Be clear of the spans before the drill runs on day eleven.',
      ],
      optionalObjectives: [
        "Buy [[npc.vetla-torvik|Vetla Torvik's]] ungated maintenance run, which requires getting her sister out of the yards first.",
        "Get [[npc.saarik-rauda|Saarik Rauda's]] bribe tally, which is a map of who in the city can be bought and for how little.",
        'Keep the Bole-Marshal’s forged rolls out of the quartermaster’s reconciliation for one more spring.',
      ],
      branchNotes:
        "Evacuate through Torvik's run and the quarter comes out, the yards take most of them for the debt, and the city keeps the trades. Break the survey and the felling is stood down, the rot stays where it is, and the eleven days become somebody else's problem in a year or two. Use the forged rolls as leverage and Mustsalu can buy days, but only by handing the party the thing that destroys her. Miss the window and the quarter is dropped and fired on schedule, and it is gone from the campaign permanently with no route back.",
      failureConditions: [
        'Day eleven arrives with anyone inside. The Marshalcy does not wait and does not check.',
        'Cutting the spans early under [[mechanic.severance-drill|the Severance Drill]], which works and strands whoever is on them.',
        'Exposing Mustsalu, which ends the only authority capable of granting a delay.',
      ],
      hiddenOutcomes: [
        'The quarter’s pitch trades survive even when the people do not, because the yards keep the labour.',
        'The rot count for the whole Greatwood sits behind this survey, and publishing it starts a war.',
        'Torvik sells the ungated route once. Somebody else sells it a second time, later, to an attacker.',
      ],
      rewards: [
        row({ branch: 'Quarter evacuated', reward: 'The gates of the Bastion Bole owe you, and the debt is honoured once' }),
        row({ branch: 'Survey broken', reward: 'Pitchguard standing and a [[item.gallery-lath|gallery lath]] mount of your own' }),
        row({ branch: 'Optional: the bribe tally', reward: 'A written list of every household in the city that can be bought' }),
      ],
      itemsRequired: TBD('Does the Tree City hold any evacuation equipment at all, or is a rope bridge and four hundred people the whole of it? The answer decides whether the eleven days are winnable.'),
      itemsConsumed: ['material.blackbole-timber'],
      npcChanges: [
        row({ npc: '[[npc.aune-mustsalu|Aune Mustsalu]]', change: 'Survives owing the party a great deal, or is ended by her own rolls at the worst possible moment.' }),
        row({ npc: '[[npc.vetla-torvik|Vetla Torvik]]', change: 'Gets her sister out and leaves the Greatwood, or stays outside the palisade selling routes to worse people.' }),
        row({ npc: '[[npc.saarik-rauda|Saarik Rauda]]', change: 'Fills the spring levy from the evacuated quarter, because they are now unhoused and countable.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.pitchguard|The Pitchguard]]', change: 'Gains on a clean felling; loses badly on a broken survey' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'Large gain in the timber yards whatever happens, because the yards fill either way' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Holds felling-licence paper and quietly prefers the quarter to burn' }),
      ],
      worldChanges: [
        row({ where: '[[district.tree-city-sixth-quarter|The Sixth Quarter]]', change: 'Removed from the world state on day eleven if the window is missed, with its trades and residents.' }),
        row({ where: '[[city.tree-city|The Tree City]]', change: 'The timber yards gain up to four hundred indentured workers, or the city keeps a quarter it cannot certify as sound.' }),
        row({ where: '[[city.mediterranean-city|The Mediterranean City]]', change: 'Charcoal from the pitchworks falls for two seasons and the copper smelt slows with it.' }),
      ],
      devNotes:
        PROPOSAL('The tenth pad, the eleven-day notice and the four hundred residents are proposed, and the four hundred is already cited in the city module. Keep the number.') +
        '\n\nPERMANENTLY FAILABLE, and it must stay that way. Do not add a rescue window on day twelve, do not let the Marshalcy be reasoned with on day ten, and do not soften the fact that evacuating people into the yards is also a bad outcome. The quest exists to prove the world does not wait.',
      flow: FELLING_ORDER_FLOW,
    },
  }),

  E({
    id: 'quest.slackwater-rights',
    type: 'quest',
    name: 'Slackwater Rights',
    status: 'draft',
    summary: 'Two raft-clans claim the same berth on the Moorstone. The deed that settles it has writing on the back.',
    tags: ['hidden-outcome', 'floating-swamp', 'law', 'property'],
    fields: {
      overview:
        "[[faction.moorstone-compact|The Moorstone Compact]] runs the lot draw and the draw has produced a tie it cannot resolve: two clans, one berth, and a cut slate deed-plate in the chest at [[landmark.the-lot-board|the Lot Board]] that both sides cite. The Compact will honour whatever ruling is handed down, because a settlement that re-moors every season needs its property law settled faster than it needs it right.\n\nThe berth matters for one reason nobody says out loud. It is the only lot in the stone quarter that stays dry in a scheduled release from [[landmark.the-weir-gates|the Weir Gates]], which makes it worth more than any three other berths and makes anyone who holds it independent of the Compact's release warnings.\n\nThe deed-plate has a reversionary clause cut into the back. On any transfer of the berth the lot reverts to a named [[city.black-weir|Black Weir]] creditor. The plate is in an open chest, it is filed as a supply agreement, and turning it over is a free action nobody thinks to take. If it is not turned over, the winning clan learns a season later that it has been mooring as a tenant.",
      questType: 'Side',
      level: '3 to 5. A property dispute with a knife under it.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.moorstone-compact', 'npc.sabbe-sixteen-knot'],
      startLocation: ['district.floating-swamp-settlement-the-stone-lots', CITY.floatingSwamp],
      prerequisites: [
        'Standing enough with the Compact to be asked to arbitrate, which is usually one prior favour.',
        'Being present between re-moors. Once the settlement drifts, the whole dispute changes shape.',
      ],
      recommendedSkills: ['skill.plain-letters', 'skill.marsh-footing', 'skill.the-cold-read', 'skill.brokerage', 'skill.writ-craft'],
      objectives: [
        'Hear both clans and read the deed-plate.',
        'Establish why this berth in particular is worth a feud.',
        'Hand down a ruling the Compact can enact.',
      ],
      optionalObjectives: [
        'Turn the plate over.',
        'Find out who is paying Sabbe Sixteen-Knot in guaranteed sluice-time.',
        'Get the reversionary clause read into the Lot Board record before the ruling is given.',
      ],
      branchNotes:
        'Read the clause aloud and the Compact voids the plate, the berth stays inside the settlement, and the Weir loses a foothold it has been buying for two seasons. Seat a clan without reading it and the party is thanked, and the reversion completes quietly on transfer. Seat a clan and explain why in public and three other clans go for Sabbe’s lines, which splits the settlement the same night.',
      failureConditions: [
        'Ruling on the front of the plate alone, which is not a mechanical failure and is the failure the quest is built around.',
        'Naming Sabbe’s arrangement before the ruling, which starts the line-cutting immediately.',
        'Waiting past the next re-moor, after which neither clan is anywhere near the berth.',
      ],
      hiddenOutcomes: [
        'The reversion completes on transfer, unannounced, and the winning clan discovers it a season later.',
        'The Black Weir gains a berth inside the settlement and begins pricing moorings from the inside.',
        'Sabbe has one season to make the upriver drift look like her own judgement rather than a purchase.',
      ],
      rewards: [
        row({ branch: 'Clause read out', reward: 'A voided plate, a grateful Compact, and a permanent enemy at the Weir' }),
        row({ branch: 'Clan seated', reward: 'A clan that owes you until it finds out, and a [[item.moor-stake|moor stake]] with your mark on it' }),
        row({ branch: 'Optional: Sabbe’s arrangement', reward: 'Leverage over the elder who decides where the whole settlement moors' }),
      ],
      itemsRequired: ['item.moor-stake'],
      itemsConsumed: TBD('Is a lot-draw bid paid in goods, in draw priority, or in future gas bladders? The Compact deliberately never quotes a price in writs.'),
      npcChanges: [
        row({ npc: '[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]]', change: 'Keeps her clan and her purchase, or loses her lines and the settlement splits.' }),
        row({ npc: '[[npc.ost-vennick|Ost Vennick]]', change: 'Either gains a dry berth inside the delta’s only free settlement, or loses two seasons of quiet work.' }),
        row({ npc: '[[npc.gwill-ossekind|Gwill Ossekind]]', change: 'His missing staves make any re-moor after this ruling dangerous for whoever won.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', change: 'Gain on any enacted ruling; large gain if the plate is voided' }),
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', change: 'Loses a bought foothold, or gains a berth it can price from inside' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Wants the dry berth for its own reasons and will bid after the ruling either way' }),
      ],
      worldChanges: [
        row({ where: '[[city.floating-swamp-settlement|The Floating Swamp Settlement]]', change: 'Either the stone quarter stays clan property, or the Weir holds a lot inside it and starts charging.' }),
        row({ where: '[[landmark.the-moorstone|The Moorstone]]', change: 'The reversionary clause becomes public and every other plate in the chest gets turned over within a week.' }),
        row({ where: '[[city.black-weir|The Black Weir]]', change: 'Gains or loses its first property interest downstream of its own gates.' }),
      ],
      devNotes:
        PROPOSAL('The dry-berth reason and the reversionary clause are proposed, and the clause is already referenced from the city and faction modules, so keep it exactly as written: on the back, filed openly, and only findable by physically turning the plate.') +
        '\n\nDESIGN INTENT: a lesson in where documents actually hide. Never prompt the players to turn the plate over. If they do not, resolve the hidden outcome a season later in play, in one sentence, and let it land.',
      flow: SLACKWATER_FLOW,
    },
  }),

  E({
    id: 'quest.the-fog-bells',
    type: 'quest',
    name: 'The Fog Bells',
    status: 'draft',
    summary: 'Four bells on the Mistfall approach have gone silent in one season and the pilots will not sail blind.',
    tags: ['investigation', 'keth-veyra', 'navigation', 'open-ended'],
    fields: {
      overview:
        "Under [[mechanic.the-bell-lines|the Bell Lines]] the approach to [[city.keth-veyra|Keth Veyra]] is navigated by owned bells: bearings and intervals held in the memory of about forty pilots who have refused for as long as anyone remembers to commit a line to paper. A silenced bell does not make the approach harder. It removes the approach.\n\nFour have gone quiet in one season, including [[landmark.the-outer-bell|the Outer Bell]] four miles off the heads, which is the first mark on every inbound line and the reference everything else is counted from. The pilots have stopped sailing. Winter is close enough that stopping means stopping until spring.\n\n[[landmark.the-bell-roll|The Bell Roll]] on the quay lists every bell, its bearing, its interval and the party answerable for keeping it rung. About half the owner column has been struck through with a chisel and some of the cuts are still bright. What the bells were protecting and who stopped them is deliberately undecided: the quest is built so that a smuggling answer, a succession answer or something worse all fit, and whichever a table chooses becomes the first hard fact about this coast.",
      questType: 'Contract',
      level: '4 to 6. Cold water, poor visibility, and a register nobody will discuss.',
      devStatus: 'Outlined',
      questGiver: TBD('The Mistfall Pilotage is named as the client but has no entry. Is it a chartered faction, or forty pilots who have simply never incorporated? The second is more interesting and harder to write.'),
      startLocation: ['district.keth-veyra-the-pilot-stair', CITY.kethVeyra],
      prerequisites: [
        'A boat and someone who can handle it in a swell, which the Pilotage will not provide.',
        'Arriving before the weather shuts, which is a matter of weeks rather than months.',
      ],
      recommendedSkills: ['skill.weather-eye', 'skill.set-and-brace', 'skill.the-cold-read', 'skill.plain-letters', 'skill.bench-sense'],
      objectives: [
        'Read the Bell Roll and identify the four silent marks and their owners.',
        'Reach at least one silent bell and establish why it is silent.',
        'Restore a workable approach, or produce an answer the Pilotage will accept instead.',
      ],
      optionalObjectives: [
        'Learn three intervals from a sympathetic pilot, which is worth more than any chart.',
        'Find out who chiselled out the owner column and when.',
        'Recover a clapper linkage intact, which is the only physical evidence there is.',
      ],
      branchNotes:
        'Rehang the bells and the Pilotage sails, winter shipping runs, and the party has bought a city a season without ever learning why it happened. Follow the struck-out owner instead and the party gets the answer and can sell it, and the approach may still be unusable. Do neither before the weather turns and nothing enters Keth Veyra until spring, and nobody has yet established what that costs the coast.',
      failureConditions: [
        'Boarding the Outer Bell rock in the wrong swell.',
        'The weather shuts with the approach still broken.',
        'Writing a bearing down where a pilot can see you do it, which ends all cooperation immediately.',
      ],
      hiddenOutcomes: [
        'The Outer Bell clapper linkage was unshackled and removed, not broken.',
        'All four silent bells share one struck-out owner on the roll.',
        'Naming that owner is the moment this city acquires a history. Decide it once and write it down.',
      ],
      rewards: [
        row({ branch: 'Approach restored', reward: 'The Pilotage’s goodwill, harbour passage for the campaign, and three intervals' }),
        row({ branch: 'Owner found', reward: 'The only piece of Keth Veyra politics anyone can currently sell' }),
        row({ branch: 'Optional: the linkage', reward: 'Physical proof that a bell was silenced deliberately' }),
      ],
      itemsRequired: ['item.orrery-tables'],
      itemsConsumed: TBD('What does it actually cost to recast or rehang a sea bell here, and who pays? The roll records owners, not funds.'),
      npcChanges: [
        row({ npc: '[[npc.ismet-radva|Ismet Radva]]', change: 'The name appears on a manifest cleared during the silence, which is either evidence or noise.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', change: 'Lands here regardless and will carry the answer out before the party does' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Benefits enormously from an approach only it can walk, and will pay to keep it that way' }),
      ],
      worldChanges: [
        row({ where: '[[city.keth-veyra|Keth Veyra]]', change: 'Winter shipping runs or does not, and the consequences of it not running are undefined by design.' }),
        row({ where: '[[landmark.the-bell-roll|The Bell Roll]]', change: 'Owner entries are recut and the coast’s only written politics changes in public.' }),
        row({ where: '[[region.mistfall-coast|The Mistfall Coast]]', change: 'Whatever the table decides here becomes the first established fact about the coast.' }),
      ],
      devNotes:
        PROPOSAL('The unshackled linkage and the shared struck-out owner are proposed as a spine that fits any answer. Nothing here invents Keth Veyra: the city stays a fog harbour navigated by owned bells, which is all the existing entries commit to.') +
        '\n\nRUN IT AS: the first job a party takes in an unwritten city. Keep the answer in the table’s hands for as long as possible, then make it canon the moment it is spoken.',
      flow: FOG_BELLS_FLOW,
    },
  }),

  E({
    id: 'quest.pan-fever',
    type: 'quest',
    name: 'Pan Fever',
    status: 'draft',
    summary: 'Sifting crews are wasting on a fraction the Sieve trade sells at premium. Prove the link, or bury it.',
    tags: ['investigation', 'sifting-city', 'industrial', 'disease'],
    fields: {
      overview:
        "[[npc.tazrit-nourem|Tazrit n'Ourem]] holds indenture papers on about a third of the pan crews and a wasting workforce is a depreciating asset, so she is the one who pays for the investigation. That is the whole of her motive and she does not pretend otherwise.\n\nThe symptoms are in four streets of [[district.sifting-city-the-lee|the Lee]] and the gradient across them is measurable in an afternoon: worst nearest the tower line, thinning with every street downwind. Under [[mechanic.the-sift-line|the Sift Line]] each pass costs water and lung, and the rarest grade rides the last mesh. The fines that come off that last mesh are the fraction the crews breathe. They are also [[item.pale-dust|pale dust]], sold as a stimulant and prized as a flux, and they are what the trade prices at premium.\n\n[[faction.pale-assay|The Pale Assay]] has been keeping a parallel grading record for years and knows exactly what the last mesh yields and what it costs. The company can retool the pans with wet screens, pay the crews off, or discredit the party and their evidence, and the price list is the antagonist rather than any person in it.",
      questType: 'Investigation',
      level: '4 to 6. No monster. The hazard is the working environment.',
      devStatus: 'Branch mapped',
      questGiver: ['npc.tazrit-nourem'],
      startLocation: ['district.sifting-city-the-lee', CITY.siftingCity],
      prerequisites: [
        'An assay licence, or somebody willing to lend you a stamped one.',
        'Enough standing in the Lee to be told the truth, which is bought with water rather than coin.',
      ],
      recommendedSkills: ['skill.plague-reading', 'skill.sieve-tuning', 'skill.spore-lore', 'skill.ledger-hand', 'skill.market-ear'],
      objectives: [
        'Establish the gradient across the four streets and record it in a form an assayer will accept.',
        'Identify which fraction the crews are breathing.',
        'Match it against the graded product the towers sell.',
        'Present the finding, sell it, or act on it without presenting it at all.',
      ],
      optionalObjectives: [
        "Get the Assay's parallel grading record out of Assay Row before the record room is emptied.",
        'Cost a wet-screen retrofit for one tower and find out who would actually pay for it.',
        'Get one crew off pale dust, which is harder than proving the case.',
      ],
      branchNotes:
        'Prove it and force wet screens on the last mesh and the gradient flattens over about four years, which is a real win that nobody alive in the Lee gets to enjoy. Take the settlement and the crews are paid off, the fraction keeps selling, and everyone still working keeps breathing it. Sell the finding to the company and the party is discredited along with the evidence, and the assay stamp they carry is worth nothing anywhere on the continent.',
      failureConditions: [
        'The crucible shed record room burns before the parallel grading record is copied.',
        'Presenting a gradient without a stamped assay, which the towers will dismiss and then use.',
        'Selling to the company, which pays extremely well once and ends the party’s standing in every assay market.',
      ],
      hiddenOutcomes: [
        'Pale dust is prohibited in a third city within two years regardless of the outcome, and its street price doubles.',
        'A retooled last mesh cuts the premium fraction’s yield, which raises the price of [[material.clearcast-glass|clearcast glass]] on the coast.',
        'The Lee has no faction of its own. This is the quest that decides whether it acquires one.',
      ],
      rewards: [
        row({ branch: 'Proved and retooled', reward: 'Standing in the Lee, and four streets that stop getting worse' }),
        row({ branch: 'Settlement taken', reward: 'A large payment, indenture papers cancelled for the sick, and nothing changed' }),
        row({ branch: 'Optional: the grading record', reward: 'The documentary key to any case against the Pale Assay' }),
      ],
      itemsRequired: ['item.assayers-tray', 'item.sift-screen'],
      itemsConsumed: ['item.pale-dust'],
      npcChanges: [
        row({ npc: "[[npc.tazrit-nourem|Tazrit n'Ourem]]", change: 'Retools her three towers ahead of the trade, or writes the sick off her books and buys replacements.' }),
        row({ npc: '[[npc.sahat-belek|Sahat Belek]]', change: 'Confirms the far-pan crews show none of it, which is the control the case needs.' }),
        row({ npc: '[[npc.bedel-lehun|Bedel Lehun]]', change: 'Recognises the argument. His terrace is running the same trade in a different substance.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.pale-assay|The Pale Assay]]', change: 'Permanently hostile on proof; grateful and dangerous on a sale' }),
        row({ faction: '[[faction.standing-hour|The Standing Hour]]', change: 'Organises the Lee for the first time if the case is proved publicly' }),
        row({ faction: '[[faction.conduit-college|The Conduit College]]', change: 'Cares only that the glass flux keeps arriving, and will lobby accordingly' }),
      ],
      worldChanges: [
        row({ where: '[[city.sifting-city|The Sifting City]]', change: 'Wet screens on the last mesh, or a paid-off cohort and the same practice continuing.' }),
        row({ where: '[[district.sifting-city-the-lee|The Lee]]', change: 'Acquires its first organised body, or does not, and the party is the reason either way.' }),
        row({ where: '[[city.mediterranean-city|The Mediterranean City]]', change: 'Clearcast glass output falls while the grading is re-cut, which delays every instrument on the coast.' }),
      ],
      devNotes:
        PROPOSAL('The four-street gradient and the last-mesh identification are proposed. The parallel grading record already exists in the NPC module as the documentary key, so keep it where it is.') +
        '\n\nDESIGN INTENT: the antagonist is a price list. There is nobody to fight and no secret to uncover, only an arithmetic that everyone involved could have done and nobody did. Resist adding a villain.',
      flow: PAN_FEVER_FLOW,
    },
  }),

  E({
    id: 'quest.four-minutes-fast',
    type: 'quest',
    name: 'Four Minutes Fast',
    status: 'draft',
    summary: 'The Tide Orrery runs four minutes fast, and someone has been trading harbour slots on the error.',
    tags: ['investigation', 'mediterranean-city', 'instruments'],
    fields: {
      overview:
        "[[landmark.the-tide-orrery|The Tide Orrery]] is a water-driven analogue integrator and the printed [[item.orrery-tables|tables]] read off it set planting, sailing and harbour slots for the whole coast. It has drifted by roughly a day and a half over nine years, which currently shows up as about four minutes on any given tide, and the error compounds.\n\n[[npc.melitta-aspri|Melitta Aspri]] has been biasing the printed tables to hide the gap, because conceding a fault in the instrument voids this season's freight contracts and reopens every harbour lease priced against the old figures. She wants an independent gauge built without [[faction.conduit-college|the College]] knowing, so that she can correct the drift quietly over three seasons and keep her post. That is the job she is offering, and it is not the only one available.\n\nSomebody has been selling harbour slots against the error for nine years, which is the crime nobody has looked for because nobody believed there was an error. And the first thing the compounding drift will wreck is a spring tide the harbour is not braced for, which arrives on a date that can be calculated by anyone with the true figures.",
      questType: 'Investigation',
      level: '4 to 6. Technical, and worth real money to get wrong.',
      devStatus: 'Branch mapped',
      questGiver: ['npc.melitta-aspri'],
      startLocation: ['district.mediterranean-city-orrery-precinct', CITY.mediterranean],
      prerequisites: [
        'Access to the precinct, which the College grants to instrument-makers and almost nobody else.',
        'A conduit-hours slot if the gauge is to be built in the city, which is a bid, not a purchase.',
      ],
      recommendedSkills: ['skill.bench-sense', 'skill.pressure-fitting', 'skill.heat-reading', 'skill.ledger-hand', 'skill.mirror-cutting'],
      objectives: [
        'Confirm the drift against something the College did not build.',
        'Determine how long the error has been sold, and to whom.',
        'Decide whether the fault is conceded publicly or repaired quietly.',
        'Get a corrected figure into somebody’s hands before the spring tide.',
      ],
      optionalObjectives: [
        'Build the independent gauge from [[material.clearcast-glass|clearcast glass]] and [[material.orrery-bronze|orrery bronze]] rather than stealing her error book.',
        'Identify the harbour clerk selling slots, which takes nine years of lease dates and one afternoon.',
        'Brace the two exposed berths before the tide, which nobody will fund and which works.',
      ],
      branchNotes:
        "Concede it publicly and every harbour lease priced on the old tables reopens at once, Ascent factors bid for quay frontage, and Aspri is finished. Let her repair it quietly and the tables correct over three seasons, nobody is ruined, nobody is told, and she owes the party her post. Take the money to let it run fast and the spring tide arrives on the old figures, which costs the mole two berths and floods the lazaret.",
      failureConditions: [
        'The independent gauge is smashed on the mole the night before the reading.',
        'Taking the money. The quest does not punish it immediately, which is the point.',
        'Publishing a drift figure that cannot be reproduced, after which the College never has to answer the question again.',
      ],
      hiddenOutcomes: [
        'Even a quiet repair reopens the leases eventually, because a corrected table is itself evidence.',
        'The party will be offered a very large sum to let it run fast, and the offer arrives from a lessee rather than the College.',
        'The date of the unbraced spring tide is calculable, which means it can be traded on as easily as the slots were.',
      ],
      rewards: [
        row({ branch: 'Fault conceded', reward: 'Every harbour lease reopens, and whoever the party warned first is rich' }),
        row({ branch: 'Quiet repair', reward: 'The calibrator of the Tide Orrery owes you her career' }),
        row({ branch: 'Optional: the gauge', reward: 'A working tide instrument of your own, unlicensed and portable' }),
      ],
      itemsRequired: ['material.clearcast-glass', 'material.orrery-bronze'],
      itemsConsumed: ['item.orrery-tables'],
      npcChanges: [
        row({ npc: '[[npc.melitta-aspri|Melitta Aspri]]', change: 'Keeps her post and repairs the drift, or is dismissed and replaced by someone who does not know the instrument.' }),
        row({ npc: '[[npc.anthimos-vellani|Anthimos Vellani]]', change: 'His lazaret floods on the unbraced tide, which forces the parasite into the open.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.conduit-college|The Conduit College]]', change: 'Hostile on public concession; quietly indebted on a private repair' }),
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Large gain on any lease reopening, because Ascent money is what bids' }),
        row({ faction: '[[faction.bonewax-post|The Bonewax Post]]', change: 'Sells the corrected figure by subscription within a week of it existing' }),
      ],
      worldChanges: [
        row({ where: '[[city.mediterranean-city|The Mediterranean City]]', change: 'Harbour leases reopen at once, or correct over three seasons without anyone being told.' }),
        row({ where: '[[district.mediterranean-city-the-mole|The Mole]]', change: 'Loses two berths on the unbraced spring tide if the error is left to run.' }),
        row({ where: '[[region.meridian-gulf|The Meridian Gulf]]', change: 'Sailing dates across the gulf shift by four minutes and then keep shifting.' }),
      ],
      devNotes:
        PROPOSAL('The nine-year drift, the sold slots and the unbraced spring tide are proposed. The instrument is already established as a water-driven integrator: it does not think, does not store, and cannot be asked a question it was not geared for.') +
        '\n\nRUN IT AS: an engineering problem with a bribe in the middle. The offer should be made politely, by a reasonable person, with a good argument, and should be worth more than anything else the party has been paid.',
      flow: FOUR_MINUTES_FLOW,
    },
  }),

  E({
    id: 'quest.clean-bills',
    type: 'quest',
    name: 'Clean Bills',
    status: 'draft',
    summary: 'Forged bills of health moved a fever upriver. Shutting the Weir Gates stops it and starves the delta.',
    tags: ['black-weir', 'plague', 'moral-choice', 'the-drown'],
    fields: {
      overview:
        "Bills of health are stamped at the toll house and are the only thing standing between the delta and the upriver towns. Blanks have been sold out of the toll house itself, which means a season of crews have cleared the gates uninspected, and a fever is already three days upstream of [[landmark.the-weir-gates|the Weir Gates]].\n\nIt is in the crews, not the cargo. That matters, because cargo can be quarantined and crews cannot be quarantined without stopping the river. [[npc.ost-vennick|Ost Vennick]] will close the gates on a party's word and keep them closed, because the schedule book is his and an unbooked closure is within his power. He will hate it and he will do it.\n\nThe delta eats what the river brings and nothing else. [[food.tide-rice|Tide rice]] is cut twice a year from boats and everything else arrives by water. A full cordon saves the upriver towns and is a slow sentence on several thousand people downstream who had no part in the forgery. Timed openings under inspection are slower, leakier and nobody starves, and they will let some of it through.",
      questType: 'Main',
      level: '5 to 7. The decision is the encounter.',
      devStatus: 'Branch mapped',
      questGiver: ['faction.iron-sluice-company', 'npc.ost-vennick'],
      startLocation: ['district.black-weir-the-toll-house', CITY.blackWeir],
      prerequisites: [
        'Someone in the party who can make a quarantine call and be believed.',
        'Three days. The fever is already moving and does not wait for a plan.',
      ],
      recommendedSkills: ['skill.plague-reading', 'skill.spore-lore', 'skill.writ-craft', 'skill.marsh-footing', 'skill.brokerage'],
      objectives: [
        'Establish where the fever is and what is carrying it.',
        'Find the source of the forged bills.',
        'Decide the cordon: full closure, timed openings, or something narrower.',
        'Live with what the decision does to the other end of the river.',
      ],
      optionalObjectives: [
        'Get [[item.fever-clay|fever clay]] downriver in quantity before the gates shut.',
        'Prosecute the blank-seal supply, which ends in the toll house whichever way it is pulled.',
        'Get the Moorstone Compact to publish a release schedule so the delta can at least plan.',
      ],
      branchNotes:
        'A full cordon holds the fever above the throat and the upriver towns stay clean, and by spring the delta is starving and the Compact is selling warnings to whoever can pay. Timed openings under inspection let a little through and cost more work and more risk, and nobody starves. A [[spell.lime-seal|lime seal]] on the infected rafts is fast, legal, and ends with several hundred people sealed inside their own moorings, which the Drown will remember for a generation.',
      failureConditions: [
        'Chasing the forger first and letting the fever pass the weir, after which the basin closes its own gates and the Ascent wharves are the problem.',
        'Sealing rafts and being caught doing it by the Tail Lots, who come up the river.',
        'Opening the gates early under pressure, which restarts the entire spread from a wider front.',
      ],
      hiddenOutcomes: [
        'A closure logged in the schedule book is also proof that the earlier unlogged release was deliberate.',
        'The Compact’s advance warnings become an open market once the gates are political, which collapses the lot-draw.',
        'Bills of health become mandatory at every gate on the Long Water, which is a permanent new cost on all river trade.',
      ],
      rewards: [
        row({ branch: 'Full cordon', reward: 'Iron Sluice standing, upriver gratitude, and a delta that does not forget' }),
        row({ branch: 'Timed openings', reward: 'No standing gain, no famine, and a Weirmaster who will take your call again' }),
        row({ branch: 'Optional: the blank-seal supply', reward: 'A named toll-house officer, and the schedule book briefly unguarded' }),
      ],
      itemsRequired: ['item.fever-clay'],
      itemsConsumed: ['food.tide-rice'],
      npcChanges: [
        row({ npc: '[[npc.ost-vennick|Ost Vennick]]', change: 'Closes the gates and holds them, and afterwards knows the party can make him do it again.' }),
        row({ npc: '[[npc.dagren-hoyle|Dagren Hoyle]]', change: 'His blank seals are traced, or he trades the supply route for immunity.' }),
        row({ npc: '[[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]]', change: 'Uses the cordon as the argument for drifting the settlement upriver, which is what she was paid for anyway.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.iron-sluice-company|The Iron Sluice Company]]', change: 'Large gain on any decision it can enact and defend' }),
        row({ faction: '[[faction.moorstone-compact|The Moorstone Compact]]', change: 'Hostile on a full cordon, and its own authority collapses shortly after' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'Enormous gain on a full cordon, because a closed gate is a market' }),
      ],
      worldChanges: [
        row({ where: '[[region.the-drown|The Drown]]', change: 'Food arriving by river stops or is rationed, and the delta’s population falls measurably by spring.' }),
        row({ where: '[[city.black-weir|The Black Weir]]', change: 'The gates become an openly political instrument and the schedule book becomes evidence.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'Bills of health are required at every gate on the Long Water, adding a day and a fee to all river cargo.' }),
      ],
      devNotes:
        PROPOSAL('The blank-seal supply out of the toll house and the three-day head start are proposed. The Black Weir side stays inside what already exists: fourteen worked gates, a schedule book and twelve Weirmasters with summary power in their bays.') +
        '\n\nDESIGN INTENT: the moral inverse of [[quest.the-ullage-run|The Ullage Run]], run from the same gates. There is no branch where the party is clean. The timed-openings ending is the correct one and is also the most work, which is exactly the right shape.',
      flow: CLEAN_BILLS_FLOW,
    },
  }),

  E({
    id: 'quest.the-scar-concession',
    type: 'quest',
    name: 'The Scar Concession',
    status: 'draft',
    summary: 'The right to draw on the Bound Fault is auctioned on the Counting Stair for the first time in forty years.',
    tags: ['main-thread', 'gilded-ascent', 'magic-city', 'auction'],
    fields: {
      overview:
        "The right to draw on [[landmark.the-bound-fault|the Bound Fault]] has not changed hands in forty years. It is being put up on [[landmark.the-counting-stair|the Counting Stair]] because the chalk failures have made the current arrangement indefensible, and because three parties want it enough to force the question.\n\n[[faction.concord-of-weights|The Concord of Weights]] is bidding with money it does not have, which is the only reason the auction is winnable by anyone else. [[faction.mooring-assize|The Mooring Assize]] holds the [[deposit.ward-marls|ward marl]] and calls a forward supply contract a seat at the table. [[faction.fetterhouse|The Fetterhouse]] argues that a licence is not a lease and that no auction can transfer responsibility for a live fault, which is legally correct and commercially irrelevant.\n\nWhoever holds the concession sets the price of [[material.levin-salt|levin salt]], ward chalk and every regulated working on the continent for a generation. The two losers are left with capital, grievances and no legal supply. And the number that is not in the prospectus is that two of the nine chains are already dead, which [[npc.ysme-drannik|Ysme Drannik]] will confirm for a price she has not explained.",
      questType: 'Main',
      level: '8 to 10. The campaign hinge.',
      devStatus: 'Outlined',
      questGiver: ['faction.concord-of-weights', 'npc.wessel-ondriek'],
      startLocation: ['landmark.the-counting-stair', CITY.gildedAscent],
      prerequisites: [
        '[[quest.the-chalk-that-lies|The Chalk That Lies]] resolved in some direction. The auction happens because of it.',
        'Enough standing to be in the room, which is Sealed with the Concord or an equivalent elsewhere.',
        'Capital, a broker, or something to trade that is not money.',
      ],
      recommendedSkills: ['skill.brokerage', 'skill.chartering', 'skill.ledger-hand', 'skill.writ-craft', 'skill.scar-reading'],
      objectives: [
        'Establish what each of the three bidders can actually pay.',
        'Get the true chain count, which is not in the prospectus.',
        'Bid, broker or wreck the lot.',
        'Be able to answer for the fault afterwards, whoever wins.',
      ],
      optionalObjectives: [
        'Get the reserve composition of the Ascent clearing house, which decides whether the Concord bid is real.',
        'Strike the name Ysme Drannik wants off the proscription list, and find out why she wants it.',
        'Get a clause into the licence requiring the chain count to be published annually.',
      ],
      branchNotes:
        'A concession held by a bidder the party chose sets the price of regulated magic for a generation and leaves that holder owing them. A withdrawn lot leaves the fault unlicensed, which sounds like a moral victory and means every working on the continent moves to [[faction.low-tally|the Low Tally]] within a year. Publishing the chain count and the reserve composition together collapses the auction and the clearing house at once, which is a real ending and should be available.',
      failureConditions: [
        'The reserve is re-assayed mid-auction and the Stair stops clearing, which ends the auction and a good deal else.',
        'Contesting the lot physically on the eleventh landing.',
        'Winning it yourself with capital you cannot service, which is precisely how the Concord got here.',
      ],
      hiddenOutcomes: [
        'The two losing bidders fund the second market themselves within two years, whichever way it goes.',
        'Two chains are dead. Any licence written without that number is written against a structure nobody has costed.',
        'If the lot is withdrawn, unsealed levin salt becomes the highest-value contraband on the continent by weight.',
      ],
      rewards: [
        row({ branch: 'Concession placed', reward: 'A generation of pricing power held by someone who owes the party for it' }),
        row({ branch: 'Lot withdrawn', reward: 'No legal supply anywhere, and the Low Tally in the party’s debt' }),
        row({ branch: 'Optional: annual publication clause', reward: 'The chain count becomes public forever, which no faction wanted' }),
      ],
      itemsRequired: ['item.stair-writ', 'item.factors-seal'],
      itemsConsumed: ['material.levin-salt'],
      npcChanges: [
        row({ npc: '[[npc.wessel-ondriek|Wessel Ondriek]]', change: 'Wins with money he does not have and buys two years, or loses and the reserve question arrives early.' }),
        row({ npc: '[[npc.ysme-drannik|Ysme Drannik]]', change: 'Released, or dies in the chain-house holding the only two numbers that matter.' }),
        row({ npc: '[[npc.cesille-vaudry|Cesille Vaudry]]', change: 'Lattice-house money has to come from somewhere, and hers is the house that has it.' }),
      ],
      repChanges: [
        row({ faction: '[[faction.concord-of-weights|Concord of Weights]]', change: 'Everything, or the beginning of the end of the clearing house' }),
        row({ faction: '[[faction.mooring-assize|The Mooring Assize]]', change: 'Gains a supply monopoly, or is left with marl and no buyer' }),
        row({ faction: '[[faction.fetterhouse|The Fetterhouse]]', change: 'Keeps or loses its warrant to say what is safe on the fault' }),
        row({ faction: '[[faction.low-tally|The Low Tally]]', change: 'The only faction that wins in every branch' }),
      ],
      worldChanges: [
        row({ where: '[[city.magic-city|The Magic City]]', change: 'The fault has a licensed holder for the first time in forty years, or none at all.' }),
        row({ where: '[[city.gilded-ascent|The Gilded Ascent]]', change: 'The reserve question is either postponed by a win or brought forward by a loss.' }),
        row({ where: '[[region.aetheric-scar|The Aetheric Scar]]', change: 'Levin salt and ward chalk are priced by one holder in eight settlements, or by nobody at all.' }),
      ],
      devNotes:
        PROPOSAL('The three-bidder structure and the auction itself are proposed, and are already referenced from the city, faction and NPC modules. The undisclosed chain count is the mechanism that lets a party change the price without outbidding anyone.') +
        '\n\nOPEN QUESTION: what happens to the continent if the clearing reserve is exposed needs a decided answer before this ships. The quest currently offers it as an ending and does not say what the world looks like afterwards.',
      flow: SCAR_CONCESSION_FLOW,
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* The guild line: opener and the seven desks --------------------- */
  R('quest.open-account', 'follows', 'quest.short-weight', 'the route desk'),
  R('quest.the-ullage-run', 'follows', 'quest.short-weight', 'the quiet freight desk'),
  R('quest.the-indenture-column', 'follows', 'quest.short-weight', 'the column desk'),
  R('quest.the-second-ledger', 'follows', 'quest.short-weight', 'the correspondence desk'),
  R('quest.the-master-weight', 'follows', 'quest.short-weight', 'the standards desk'),
  R('quest.written-off', 'follows', 'quest.short-weight', 'the composition desk'),
  R('quest.the-casting-voice', 'follows', 'quest.short-weight', 'the tariff desk'),
  R('quest.the-scar-concession', 'follows', 'quest.the-chalk-that-lies', 'the failures are why the lot is put up at all'),

  /* Short Weight ---------------------------------------------------- */
  R('faction.concord-of-weights', 'gives_quest', 'quest.short-weight', 'the Brass Assize sends a clerk, never a threat'),
  R('quest.short-weight', 'located_in', 'district.gilded-ascent-salt-office', 'the licensing arm, not the chamber'),
  R('quest.short-weight', 'located_in', CITY.gildedAscent),
  R('quest.short-weight', 'involves', 'npc.wessel-ondriek', 'sits behind it without appearing in it'),
  R('quest.short-weight', 'involves', 'npc.doret-halvane', 'becomes reachable once the hoist yards are in play'),
  R('quest.short-weight', 'involves', 'npc.brask-vellmar', 'knows what being made to sign looks like'),
  R('quest.short-weight', 'involves', 'machine.the-assay-cage', 'the re-weighing that starts the whole chapter'),
  R('quest.short-weight', 'affects', CITY.gildedAscent, 'basin-wide grade re-audit for a season'),
  R('quest.short-weight', 'affects', CITY.siftingCity, 'the price of a grade stamp goes up'),
  R('quest.short-weight', 'affects', 'faction.concord-of-weights', 'a seated house is now owned rather than prosecuted'),
  R('quest.short-weight', 'rewards', 'item.factors-seal', 'a desk, and a leash'),
  R('quest.short-weight', 'requires', 'item.assayers-tray'),
  R('quest.short-weight', 'related_to', 'material.pan-nitre', 'consignment 4,118'),

  /* Open Account ---------------------------------------------------- */
  R('faction.concord-of-weights', 'gives_quest', 'quest.open-account', 'the first licensed route into the highland'),
  R('npc.anwe-halduri', 'gives_quest', 'quest.open-account', 'she is the whole of the lawful way in'),
  R('quest.open-account', 'located_in', 'district.oruvai-the-carry-yard'),
  R('quest.open-account', 'located_in', CITY.oruvai),
  R('quest.open-account', 'involves', 'npc.anwe-halduri', 'pays in advance, in cut stone, and stays no nights'),
  R('quest.open-account', 'involves', 'npc.wessel-ondriek', 'funds the second attempt because he needs a real asset'),
  R('quest.open-account', 'involves', 'landmark.the-carry-beam', 'where an outsider is turned out'),
  R('quest.open-account', 'affects', CITY.oruvai, 'a first outside institution, or a decade of nothing'),
  R('quest.open-account', 'affects', REGION.hollowKarst, 'cut stone moves by a fifth either way'),
  R('quest.open-account', 'affects', 'faction.low-tally', 'takes the pass if the route is never licensed'),
  R('quest.open-account', 'rewards', 'item.stair-writ', 'a share of the highland tariff for the campaign'),
  R('quest.open-account', 'related_to', 'mechanic.the-high-carry', 'porterage paid by weight and altitude'),

  /* The Ullage Run -------------------------------------------------- */
  R('faction.low-tally', 'gives_quest', 'quest.the-ullage-run', 'the quiet freight desk, subcontracted'),
  R('npc.dagren-hoyle', 'gives_quest', 'quest.the-ullage-run', 'honest about the odds, pays in transit seals'),
  R('quest.the-ullage-run', 'located_in', 'district.black-weir-the-gantry-yards'),
  R('quest.the-ullage-run', 'located_in', CITY.blackWeir),
  R('quest.the-ullage-run', 'involves', 'npc.ost-vennick', 'the schedule book and the booked hour'),
  R('quest.the-ullage-run', 'involves', 'npc.dagren-hoyle', 'the disused sluice and two drowned crews'),
  R('quest.the-ullage-run', 'involves', 'landmark.the-weir-gates', 'one tide, fourteen worked gates'),
  R('quest.the-ullage-run', 'involves', 'landmark.the-eleventh-sluice', 'the channel that is not on the schedule'),
  R('quest.the-ullage-run', 'affects', 'faction.iron-sluice-company', 'a bay watch, and the slack hour closed for a year'),
  R('quest.the-ullage-run', 'affects', REGION.theDrown, 'raft crews price Weir work higher afterwards'),
  R('quest.the-ullage-run', 'affects', CITY.gildedAscent, 'unsealed levin salt on the wharves'),
  R('quest.the-ullage-run', 'rewards', 'item.weirhook', 'taken off a gantry crew'),
  R('quest.the-ullage-run', 'consumes', 'material.levin-salt', 'six barrels nobody mentioned'),
  R('quest.the-ullage-run', 'related_to', 'mechanic.the-sluice-book'),

  /* The Indenture Column -------------------------------------------- */
  R('faction.bondwrights-hall', 'gives_quest', 'quest.the-indenture-column', 'the paper is written before the people are moved'),
  R('quest.the-indenture-column', 'located_in', 'district.arena-city-writ-court'),
  R('quest.the-indenture-column', 'located_in', CITY.arenaCity),
  R('quest.the-indenture-column', 'involves', 'npc.tazrit-nourem', 'holds the originals for a third of the column'),
  R('quest.the-indenture-column', 'involves', 'npc.aylun-torgai', 'her manumission is three floors under the sand'),
  R('quest.the-indenture-column', 'involves', 'npc.berke-chagra', 'buys whatever the party leaves loose'),
  R('quest.the-indenture-column', 'involves', 'faction.red-writ', 'the Chamber houses are the buyers'),
  R('quest.the-indenture-column', 'affects', CITY.arenaCity, 'sixty-one contract votes move in the Chamber'),
  R('quest.the-indenture-column', 'affects', CITY.siftingCity, 'crews worked to term in place instead of shipped'),
  R('quest.the-indenture-column', 'affects', CITY.mediterranean, 'the harbour-court recognition fight reopens'),
  R('quest.the-indenture-column', 'affects', 'faction.standing-hour', 'the only faction that improves on exposure'),
  R('quest.the-indenture-column', 'requires', 'item.indenture-bond', 'sixty-one of them, with names on'),
  R('quest.the-indenture-column', 'rewards', 'item.quitblade', 'carried by whoever comes out of it free'),
  R('quest.the-indenture-column', 'related_to', 'mechanic.ring-bond'),

  /* The Second Ledger ------------------------------------------------ */
  R('faction.concord-of-weights', 'gives_quest', 'quest.the-second-ledger', 'the correspondence desk'),
  R('npc.wessel-ondriek', 'gives_quest', 'quest.the-second-ledger', 'he needs the figure before anyone else has it'),
  R('quest.the-second-ledger', 'located_in', 'district.sky-city-crown-houses', 'the ninth house counting room'),
  R('quest.the-second-ledger', 'located_in', CITY.skyCity),
  R('quest.the-second-ledger', 'involves', 'npc.cesille-vaudry', 'the forged tonnage returns are the second book'),
  R('quest.the-second-ledger', 'involves', 'npc.perrine-orlaunt', 'the only unlogged way on and off the ring'),
  R('quest.the-second-ledger', 'involves', 'npc.aubran-ferrieu', 'his sheets match the second book to the pound'),
  R('quest.the-second-ledger', 'involves', 'landmark.the-mooring-crown'),
  R('quest.the-second-ledger', 'affects', CITY.skyCity, 'an eviction list, or the overload standing'),
  R('quest.the-second-ledger', 'affects', CITY.gildedAscent, 'the clearing rate moves once the figure is known'),
  R('quest.the-second-ledger', 'affects', 'faction.mooring-assize', 'hostile the moment tonnage is raised at all'),
  R('quest.the-second-ledger', 'requires', 'item.ballast-jacket'),
  R('quest.the-second-ledger', 'related_to', 'mechanic.mass-warrant'),
  R('quest.the-second-ledger', 'related_to', 'quest.the-sixteenth-mast', 'unregistered mass is the same problem from the other end'),

  /* The Master Weight ------------------------------------------------ */
  R('npc.doret-halvane', 'gives_quest', 'quest.the-master-weight', 'a commission with no client named'),
  R('faction.low-tally', 'gives_quest', 'quest.the-master-weight', 'the client, eventually'),
  R('quest.the-master-weight', 'located_in', 'landmark.the-brass-standard', 'eleven masses, two keys, three seals'),
  R('quest.the-master-weight', 'located_in', CITY.gildedAscent),
  R('quest.the-master-weight', 'involves', 'npc.doret-halvane', 'sixty wax key impressions, and a brother in the Pans'),
  R('quest.the-master-weight', 'involves', 'npc.wessel-ondriek', 'survives a false standard and not a re-assay'),
  R('quest.the-master-weight', 'involves', 'npc.brask-vellmar', 'will testify once, for the right party'),
  R('quest.the-master-weight', 'involves', 'district.sifting-city-assay-row', 'where the brother’s papers are'),
  R('quest.the-master-weight', 'affects', CITY.gildedAscent, 'every contract sealed since becomes contestable'),
  R('quest.the-master-weight', 'affects', 'machine.the-assay-cage', 'reference masses re-cut, certification queue to a year'),
  R('quest.the-master-weight', 'affects', 'faction.pale-assay', 'grade pricing moves back to the Pans'),
  R('quest.the-master-weight', 'requires', 'item.cut-seal'),
  R('quest.the-master-weight', 'rewards', 'item.stair-writ', 'the skim, paid to whoever commissioned it'),
  R('quest.the-master-weight', 'related_to', 'mechanic.standing-ledger'),

  /* Written Off ------------------------------------------------------ */
  R('faction.concord-of-weights', 'gives_quest', 'quest.written-off', 'close the account, do not recover it'),
  R('quest.written-off', 'located_in', 'district.orath-the-outward-row'),
  R('quest.written-off', 'located_in', CITY.orath),
  R('quest.written-off', 'involves', 'npc.kavel-uur', 'the only fixed schedule across the waste margin'),
  R('quest.written-off', 'involves', 'landmark.the-ration-board', 'water, powder and shot, posted daily'),
  R('quest.written-off', 'involves', 'landmark.the-third-bore', 'what the guild paper is actually about'),
  R('quest.written-off', 'affects', CITY.orath, 'eleven households lose a water round'),
  R('quest.written-off', 'affects', CITY.siftingCity, 'the bore advances reach the Ascent'),
  R('quest.written-off', 'affects', 'faction.red-writ', 'a contract they had already priced'),
  R('quest.written-off', 'requires', 'food.dew-melon', 'two days of water per fruit, across the margin'),
  R('quest.written-off', 'related_to', 'mechanic.the-ration-board'),
  R('quest.written-off', 'related_to', 'skill.throat-work', 'the branch is named for what it makes you'),

  /* The Casting Voice ------------------------------------------------ */
  R('faction.concord-of-weights', 'gives_quest', 'quest.the-casting-voice', 'pin the copper duty for nine years'),
  R('quest.the-casting-voice', 'located_in', 'district.mediterranean-city-orrery-precinct'),
  R('quest.the-casting-voice', 'located_in', CITY.mediterranean),
  R('quest.the-casting-voice', 'involves', 'faction.conduit-college', 'nineteen fellows and one casting voice'),
  R('quest.the-casting-voice', 'involves', 'npc.anthimos-vellani', 'the parasite that would postpone the session'),
  R('quest.the-casting-voice', 'involves', 'npc.melitta-aspri', 'notices somebody reading the roll'),
  R('quest.the-casting-voice', 'affects', CITY.mediterranean, 'copper duty fixed for nine years'),
  R('quest.the-casting-voice', 'affects', CITY.skyCity, 'cheap copper brings a quarter’s re-cabling forward'),
  R('quest.the-casting-voice', 'affects', 'faction.bondwrights-hall', 'harbour-court recognition won or lost for a decade'),
  R('quest.the-casting-voice', 'requires', 'item.governor-spring', 'the bottleneck component the argument is about'),
  R('quest.the-casting-voice', 'related_to', 'mechanic.conduit-hours'),
  R('quest.the-casting-voice', 'related_to', 'spell.lime-seal', 'the option the quest never recommends'),

  /* The Chalk That Lies ---------------------------------------------- */
  R('faction.fetterhouse', 'gives_quest', 'quest.the-chalk-that-lies', 'the chain-house wardens want the batch pulled'),
  R('quest.the-chalk-that-lies', 'located_in', 'district.magic-city-chalk-row'),
  R('quest.the-chalk-that-lies', 'located_in', CITY.magicCity),
  R('quest.the-chalk-that-lies', 'involves', 'npc.toval-cherek', 'two years of shorted alloy, and he knows which sections'),
  R('quest.the-chalk-that-lies', 'involves', 'npc.ysme-drannik', 'which two of the nine chains are already dead'),
  R('quest.the-chalk-that-lies', 'involves', 'npc.halvo-sarn', 'the private index of backdated permits'),
  R('quest.the-chalk-that-lies', 'involves', 'npc.sahat-belek', 'sixty-one crates, hundreds of kilometres off route'),
  R('quest.the-chalk-that-lies', 'involves', 'landmark.the-ninth-chain'),
  R('quest.the-chalk-that-lies', 'involves', 'machine.the-ward-kilns', 'the log is complete, which is the first surprise'),
  R('quest.the-chalk-that-lies', 'affects', CITY.magicCity, 'the western sections hold, or a bound district is lost'),
  R('quest.the-chalk-that-lies', 'affects', 'faction.fetterhouse', 'keeps or loses the right to say what is safe'),
  R('quest.the-chalk-that-lies', 'affects', 'faction.pale-assay', 'named as the route the cached crates travelled'),
  R('quest.the-chalk-that-lies', 'consumes', 'material.ward-chalk', 'the adulterated batch, pulled stick by stick'),
  R('quest.the-chalk-that-lies', 'rewards', 'item.bound-harness', 'a numbered licence, which is the licence'),
  R('quest.the-chalk-that-lies', 'related_to', 'mechanic.ward-load'),

  /* The Sixteenth Mast ----------------------------------------------- */
  R('faction.mooring-assize', 'gives_quest', 'quest.the-sixteenth-mast', 'the Register wants the mast struck off'),
  R('quest.the-sixteenth-mast', 'located_in', 'district.sky-city-mooring-ring'),
  R('quest.the-sixteenth-mast', 'located_in', CITY.skyCity),
  R('quest.the-sixteenth-mast', 'involves', 'npc.aubran-ferrieu', 'the true tonnage sheets from the collapse week'),
  R('quest.the-sixteenth-mast', 'involves', 'npc.perrine-orlaunt', 'loses the best unlogged berth on the ring'),
  R('quest.the-sixteenth-mast', 'involves', 'npc.cesille-vaudry', 'unrecorded mass ruins her forged returns'),
  R('quest.the-sixteenth-mast', 'involves', 'landmark.the-sixth-mast', 'the stub the sixteenth is hung from'),
  R('quest.the-sixteenth-mast', 'affects', CITY.skyCity, 'a chastened Register, or a succession fight'),
  R('quest.the-sixteenth-mast', 'affects', 'faction.mooring-assize', 'cannot survive both outcomes'),
  R('quest.the-sixteenth-mast', 'affects', 'faction.low-tally', 'unlogged traffic moves to the counterweight runs'),
  R('quest.the-sixteenth-mast', 'rewards', 'item.mooring-lance', 'licensed to mast crews only, and now to you'),
  R('quest.the-sixteenth-mast', 'related_to', 'mechanic.mass-warrant'),

  /* Who Gets the Light ------------------------------------------------ */
  R('faction.mirror-assembly', 'gives_quest', 'quest.who-gets-the-light', 'it will enact whatever allocation is brought to it'),
  R('npc.ossane-gorbea', 'gives_quest', 'quest.who-gets-the-light', 'her seal issues the hours'),
  R('quest.who-gets-the-light', 'located_in', 'district.cave-agrarian-city-mirror-quarter'),
  R('quest.who-gets-the-light', 'located_in', CITY.caveAgrarian),
  R('quest.who-gets-the-light', 'involves', 'npc.iratze-zubiate', 'two galleries dark for a year and no report filed'),
  R('quest.who-gets-the-light', 'involves', 'npc.bedel-lehun', 'a violet strain that yields double in half the light'),
  R('quest.who-gets-the-light', 'involves', 'npc.ossane-gorbea', 'starves galleries, then buys them through a cousin'),
  R('quest.who-gets-the-light', 'involves', 'district.cave-agrarian-city-deep-rota', 'worked by people the roll does not count'),
  R('quest.who-gets-the-light', 'involves', 'landmark.sunwell-shaft'),
  R('quest.who-gets-the-light', 'affects', CITY.caveAgrarian, 'up to four galleries leave the world state permanently'),
  R('quest.who-gets-the-light', 'affects', CITY.gildedAscent, 'grain advances against next year’s light are called in'),
  R('quest.who-gets-the-light', 'affects', 'faction.mirror-assembly', 'legitimacy on any allocation it did not have to argue'),
  R('quest.who-gets-the-light', 'consumes', 'material.sunwell-mica', 'replacement leaves for the collapsed ducts'),
  R('quest.who-gets-the-light', 'rewards', 'item.sunwell-mirror', 'a light allocation of your own'),
  R('quest.who-gets-the-light', 'related_to', 'mechanic.the-mirror-rota'),
  R('quest.who-gets-the-light', 'related_to', 'food.mirror-barley', 'the yield the whole argument is about'),

  /* The Felling Order ------------------------------------------------- */
  R('npc.aune-mustsalu', 'gives_quest', 'quest.the-felling-order', 'she gives the word on schedule and hates it'),
  R('faction.pitchguard', 'gives_quest', 'quest.the-felling-order', 'the Marshalcy posts the order eleven days out'),
  R('quest.the-felling-order', 'located_in', 'district.tree-city-sixth-quarter'),
  R('quest.the-felling-order', 'located_in', CITY.treeCity),
  R('quest.the-felling-order', 'involves', 'npc.vetla-torvik', 'the maintenance run that passes no gate'),
  R('quest.the-felling-order', 'involves', 'npc.saarik-rauda', 'fills the spring levy from whoever is unhoused'),
  R('quest.the-felling-order', 'involves', 'npc.aune-mustsalu', 'thirty forged deaths, and a quartermaster counting'),
  R('quest.the-felling-order', 'involves', 'landmark.the-ash-ring', 'the tenth pad, cleared before the notice went up'),
  R('quest.the-felling-order', 'involves', 'creature.bolewright-wasp', 'the stated cause, and possibly the true one'),
  R('quest.the-felling-order', 'affects', CITY.treeCity, 'a quarter and four hundred people, or a survey overturned'),
  R('quest.the-felling-order', 'affects', CITY.mediterranean, 'charcoal to the copper smelt falls for two seasons'),
  R('quest.the-felling-order', 'affects', 'faction.standing-hour', 'the timber yards fill either way'),
  R('quest.the-felling-order', 'consumes', 'material.blackbole-timber', 'a quarter of it, dropped and fired'),
  R('quest.the-felling-order', 'rewards', 'item.gallery-lath', 'a mount of your own on the spans'),
  R('quest.the-felling-order', 'related_to', 'mechanic.severance-drill'),

  /* Slackwater Rights -------------------------------------------------- */
  R('faction.moorstone-compact', 'gives_quest', 'quest.slackwater-rights', 'it will honour whatever ruling is handed down'),
  R('npc.sabbe-sixteen-knot', 'gives_quest', 'quest.slackwater-rights', 'one of the two clans is hers'),
  R('quest.slackwater-rights', 'located_in', 'district.floating-swamp-settlement-the-stone-lots'),
  R('quest.slackwater-rights', 'located_in', CITY.floatingSwamp),
  R('quest.slackwater-rights', 'involves', 'npc.sabbe-sixteen-knot', 'paid in guaranteed sluice-time to drift upriver'),
  R('quest.slackwater-rights', 'involves', 'npc.ost-vennick', 'the creditor named on the back of the plate'),
  R('quest.slackwater-rights', 'involves', 'landmark.the-moorstone'),
  R('quest.slackwater-rights', 'involves', 'landmark.the-lot-board', 'the deed chest, filed as a supply agreement'),
  R('quest.slackwater-rights', 'affects', CITY.floatingSwamp, 'the stone quarter stays clan property, or does not'),
  R('quest.slackwater-rights', 'affects', CITY.blackWeir, 'a first property interest downstream of its own gates'),
  R('quest.slackwater-rights', 'affects', 'faction.iron-sluice-company', 'gains a berth it can price from the inside'),
  R('quest.slackwater-rights', 'requires', 'item.moor-stake'),
  R('quest.slackwater-rights', 'related_to', 'mechanic.the-remoor'),

  /* The Fog Bells ------------------------------------------------------ */
  R('quest.the-fog-bells', 'located_in', 'district.keth-veyra-the-pilot-stair'),
  R('quest.the-fog-bells', 'located_in', CITY.kethVeyra),
  R('quest.the-fog-bells', 'involves', 'landmark.the-outer-bell', 'the first mark, and the reference for all the rest'),
  R('quest.the-fog-bells', 'involves', 'landmark.the-bell-roll', 'half the owner column chiselled out'),
  R('quest.the-fog-bells', 'involves', 'npc.ismet-radva', 'a name on a manifest cleared during the silence'),
  R('quest.the-fog-bells', 'involves', 'creature.mistfall-bell', 'already on the rock, in the cold'),
  R('quest.the-fog-bells', 'affects', CITY.kethVeyra, 'winter shipping runs, or does not'),
  R('quest.the-fog-bells', 'affects', REGION.mistfallCoast, 'whatever is decided becomes the coast’s first fixed fact'),
  R('quest.the-fog-bells', 'affects', 'faction.low-tally', 'benefits from an approach only it can walk'),
  R('quest.the-fog-bells', 'requires', 'item.orrery-tables', 'the only printed tables that reach this far north'),
  R('quest.the-fog-bells', 'related_to', 'mechanic.the-bell-lines'),

  /* Pan Fever ----------------------------------------------------------- */
  R('npc.tazrit-nourem', 'gives_quest', 'quest.pan-fever', 'a wasting workforce is a depreciating asset'),
  R('quest.pan-fever', 'located_in', 'district.sifting-city-the-lee'),
  R('quest.pan-fever', 'located_in', CITY.siftingCity),
  R('quest.pan-fever', 'involves', 'npc.tazrit-nourem', 'her parallel grading record is the documentary key'),
  R('quest.pan-fever', 'involves', 'npc.sahat-belek', 'the far-pan crews show none of it, which is the control'),
  R('quest.pan-fever', 'involves', 'faction.pale-assay', 'has known what the last mesh yields for years'),
  R('quest.pan-fever', 'involves', 'landmark.the-great-sieve'),
  R('quest.pan-fever', 'affects', CITY.siftingCity, 'wet screens on the last mesh, or a paid-off cohort'),
  R('quest.pan-fever', 'affects', CITY.mediterranean, 'clearcast glass output falls while grading is re-cut'),
  R('quest.pan-fever', 'affects', 'faction.standing-hour', 'organises the Lee for the first time'),
  R('quest.pan-fever', 'consumes', 'item.pale-dust', 'the fraction that pays best'),
  R('quest.pan-fever', 'requires', 'item.assayers-tray', 'a gradient without a stamp is worth nothing'),
  R('quest.pan-fever', 'related_to', 'mechanic.the-sift-line'),

  /* Four Minutes Fast ---------------------------------------------------- */
  R('npc.melitta-aspri', 'gives_quest', 'quest.four-minutes-fast', 'she wants an instrument the College does not know about'),
  R('quest.four-minutes-fast', 'located_in', 'district.mediterranean-city-orrery-precinct'),
  R('quest.four-minutes-fast', 'located_in', CITY.mediterranean),
  R('quest.four-minutes-fast', 'involves', 'npc.melitta-aspri', 'nine years of biased tables and an error book'),
  R('quest.four-minutes-fast', 'involves', 'npc.anthimos-vellani', 'the lazaret floods on the unbraced tide'),
  R('quest.four-minutes-fast', 'involves', 'landmark.the-tide-orrery'),
  R('quest.four-minutes-fast', 'involves', 'faction.conduit-college', 'will not concede a fault in its own instrument'),
  R('quest.four-minutes-fast', 'affects', CITY.mediterranean, 'every harbour lease priced on the old tables reopens'),
  R('quest.four-minutes-fast', 'affects', REGION.meridianGulf, 'sailing dates shift, and keep shifting'),
  R('quest.four-minutes-fast', 'affects', 'faction.concord-of-weights', 'Ascent money is what bids for the reopened quay frontage'),
  R('quest.four-minutes-fast', 'consumes', 'item.orrery-tables', 'this season’s printing, withdrawn'),
  R('quest.four-minutes-fast', 'requires', 'material.clearcast-glass', 'for the independent gauge'),

  /* Clean Bills ----------------------------------------------------------- */
  R('faction.iron-sluice-company', 'gives_quest', 'quest.clean-bills', 'the Company will close the gates on your word'),
  R('npc.ost-vennick', 'gives_quest', 'quest.clean-bills', 'he can order an unbooked closure and nobody else can'),
  R('quest.clean-bills', 'located_in', 'district.black-weir-the-toll-house'),
  R('quest.clean-bills', 'located_in', CITY.blackWeir),
  R('quest.clean-bills', 'involves', 'npc.ost-vennick', 'closes the gates, holds them, and hates it'),
  R('quest.clean-bills', 'involves', 'npc.dagren-hoyle', 'the blank seals came out of the toll house'),
  R('quest.clean-bills', 'involves', 'npc.sabbe-sixteen-knot', 'uses the cordon as her argument for drifting upriver'),
  R('quest.clean-bills', 'involves', 'landmark.the-weir-gates'),
  R('quest.clean-bills', 'affects', REGION.theDrown, 'the delta eats what the river brings and nothing else'),
  R('quest.clean-bills', 'affects', CITY.floatingSwamp, 'the lot-draw collapses once release warnings become a market'),
  R('quest.clean-bills', 'affects', CITY.gildedAscent, 'bills of health required at every gate on the Long Water'),
  R('quest.clean-bills', 'affects', 'faction.moorstone-compact', 'its authority does not survive a full cordon'),
  R('quest.clean-bills', 'consumes', 'food.tide-rice', 'the crop that does not arrive'),
  R('quest.clean-bills', 'requires', 'item.fever-clay', 'packed into a wound or swallowed'),
  R('quest.clean-bills', 'related_to', 'spell.lime-seal', 'fast, legal, and remembered for a generation'),

  /* The Scar Concession ---------------------------------------------------- */
  R('faction.concord-of-weights', 'gives_quest', 'quest.the-scar-concession', 'bidding with money it does not have'),
  R('npc.wessel-ondriek', 'gives_quest', 'quest.the-scar-concession', 'he needs the lot and cannot pay for it'),
  R('quest.the-scar-concession', 'located_in', 'landmark.the-counting-stair', 'auctioned on the eleventh landing'),
  R('quest.the-scar-concession', 'located_in', CITY.gildedAscent),
  R('quest.the-scar-concession', 'involves', 'npc.ysme-drannik', 'two of the nine chains are already dead'),
  R('quest.the-scar-concession', 'involves', 'npc.wessel-ondriek', 'a win buys two years, a loss brings the reserve question early'),
  R('quest.the-scar-concession', 'involves', 'npc.cesille-vaudry', 'lattice-house money has to come from somewhere'),
  R('quest.the-scar-concession', 'involves', 'landmark.the-bound-fault', 'the right to draw, after forty years'),
  R('quest.the-scar-concession', 'involves', 'deposit.ward-marls', 'the Assize calls a forward contract a seat at the table'),
  R('quest.the-scar-concession', 'affects', CITY.magicCity, 'a licensed holder for the first time in forty years, or none'),
  R('quest.the-scar-concession', 'affects', CITY.gildedAscent, 'the reserve question postponed or brought forward'),
  R('quest.the-scar-concession', 'affects', REGION.aethericScar, 'levin salt and ward chalk priced by one holder in eight settlements'),
  R('quest.the-scar-concession', 'affects', 'faction.fetterhouse', 'keeps or loses its warrant on the fault'),
  R('quest.the-scar-concession', 'affects', 'faction.mooring-assize', 'a supply monopoly, or marl and no buyer'),
  R('quest.the-scar-concession', 'affects', 'faction.low-tally', 'the only faction that wins in every branch'),
  R('quest.the-scar-concession', 'consumes', 'material.levin-salt', 'the thing the licence actually prices'),
  R('quest.the-scar-concession', 'requires', 'item.stair-writ', 'nobody bids in coin'),
  R('quest.the-scar-concession', 'related_to', 'mechanic.the-toll', 'whoever holds the lot sets what a working costs'),
]
