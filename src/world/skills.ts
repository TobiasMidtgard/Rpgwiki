/**
 * The five skill trees.
 *
 * Every skill carries a `node` payload (tree, branch, col, row, requires) that
 * the tree view lays out directly. Columns are tiers, rows are vertical slots,
 * and no two nodes in one tree share a slot. Prerequisite edges are duplicated
 * as `prerequisite_of` relations so the graph and the layout cannot drift.
 *
 * Hybrids sit in a home tree but require a prerequisite from a second tree.
 * There are seven of them and they are the only cross-tree edges in the graph.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation, type SkillNode } from './kit'
import { CITY, PROPOSAL, REGION, TREE } from './registry'

/** Node shorthand. `slot` is the vertical row; `col` is the tier column. */
const N = (tree: string, branch: string, col: number, slot: number, requires: string[] = []): SkillNode => ({
  tree,
  branch,
  col,
  row: slot,
  requires,
})

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* Body & Blade                                                      */
  /* ================================================================ */

  E({
    id: 'skill.set-and-brace',
    type: 'skill',
    name: 'Set and Brace',
    status: 'draft',
    summary: 'Keep your feet on scree, rope bridge or drifting raft, and refuse a shove that should land you.',
    tags: ['body-and-blade', 'entry', 'traversal'],
    fields: {
      overview:
        'Almost nothing on this continent is fought on flat dry ground. The [[district.gilded-ascent-hoist-yards|hoist yards]] are wet stone on a gradient, the [[district.tree-city-spanworks|Spanworks]] are rope under load, and a raft lot on [[landmark.the-moorstone|the Moorstone]] moves under you whether or not anyone is pushing. Set and Brace is the drill that makes a person stop falling over: weight low, one foot loaded, the other free, and the habit of choosing which of the two things under you is actually holding.\n\nIt is taught for free and it is taught early. Gallery farmers in the Hollow Karst drill it on ladder rungs, the Sky City mast crews drill it on a swaying test frame with a fall line clipped on, and the Tree City levy drills it on a bridge with a sergeant shoving. Nobody treats it as martial training, which is precisely why it is the root of the combat tree: the difference between a fighter and a corpse in this setting is usually footing, not reach.',
      skillType: 'Passive',
      branch: 'Footing',
      tree: TREE.bodyAndBlade,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['No prerequisite', 'Available from character creation in every settlement'],
      effect:
        'Resist knockdown, shove and drag on unstable, wet, sloped or moving surfaces. Reduces fall damage taken from short drops and removes the movement penalty for crossing rope bridges, scree, raft slats and greased deck plate.',
      rankTable: [
        row({ rank: '1', effect: 'No movement penalty on unstable footing; one free re-roll per scene against being shoved off a surface' }),
        row({ rank: '2', effect: 'Short falls under three metres do half damage; you can be shoved but not dragged' }),
        row({ rank: '3', effect: 'You can brace another person as well as yourself, at the cost of your own movement that round' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Legal and unremarkable everywhere. The only place it draws a comment is the Sky City, where the mast guilds treat an unbraced worker as a mass-warrant offence waiting to happen and will not sign a lattice pass without a demonstration.',
      devNotes:
        PROPOSAL('The three ranks, the fall-damage figure and the braced-companion rule at rank 3 are proposed. The manifest establishes the skill as the tier-1 root of Body & Blade with no prerequisite, feeding Long Arm, Plate and Seam, Slow Match and the Lattice Work hybrid.') +
        '\n\nDESIGN INTENT: this is the cheapest node in the game and it should feel like it pays for itself in the first hour. It also does quiet work for the setting, because it tells the player before any combat happens that the ground is a hazard here.',
      node: N(TREE.bodyAndBlade, 'Footing', 0, 0),
    },
  }),

  E({
    id: 'skill.close-work',
    type: 'skill',
    name: 'Close Work',
    status: 'draft',
    summary: 'Knife, elbow and grapple inside a spear’s reach, where drilled formations come apart.',
    tags: ['body-and-blade', 'entry', 'combat'],
    fields: {
      overview:
        'Formation drill assumes distance. Close Work is what happens when the distance is gone: inside the pike, inside the arm, in a stair turn or a gallery doorway or the sand of [[landmark.the-sunken-ring|the Sunken Ring]] with the crowd close enough to spit. Knife, elbow, knee, headbutt, and the grapples that end a fight by taking a joint rather than a life.\n\nIt is the least respectable combat skill and the most widely held. Ring fighters have it because the stipulations force them to; dock crews have it because dock disputes happen at arm’s length; the Low Tally’s cargo handlers have it because a knife is the only weapon you can carry through a gate search. No city bans it, because banning a technique that requires no equipment is not a law, it is a wish.',
      skillType: 'Active',
      branch: 'Close work',
      tree: TREE.bodyAndBlade,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Close Work is a tier-1 root with no skill prerequisite. Undecided: should the non-lethal submission sit at rank 3, or be available from rank 1? Arrest law, arena stipulations and the indenture economy all pull on the answer.'),
      effect:
        'Attack and defend effectively inside the reach of polearms, spears and long blades. Grapples, disarms and joint locks become available, and being grappled stops being an automatic loss of the round.',
      rankTable: [
        row({ rank: '1', effect: 'No penalty fighting inside reach; knives and improvised weapons use your best attack value' }),
        row({ rank: '2', effect: 'Disarm and joint-lock manoeuvres unlocked; you may close from reach to grapple in one move' }),
        row({ rank: '3', effect: 'A successful grapple can be converted to a non-lethal submission, which matters under arena stipulations and city arrest law' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere as a technique. What is regulated is the tooling: a spanned [[item.springlock|springlock]] or a sheathed blade over a stated length is a carry offence on the Counting Stair and in the Mediterranean City vaults, and the charge attaches to the object, never to the training.',
      devNotes:
        PROPOSAL('The submission conversion at rank 3 and the disarm unlock at rank 2 are proposed. The manifest establishes Close Work as a tier-1 root feeding Ring Craft, Throat Work and the Bonewright hybrid.') +
        '\n\nDESIGN INTENT: keep the non-lethal option on this node rather than on a separate mercy skill. Arrest, arena stipulations and the indenture economy all need a rules-supported way to take somebody alive, and it should cost a rank.',
      node: N(TREE.bodyAndBlade, 'Close work', 0, 3),
    },
  }),

  E({
    id: 'skill.long-arm',
    type: 'skill',
    name: 'Long Arm',
    status: 'draft',
    summary: 'Pike and polearm drill: hold reach, keep a line, and make a corridor impassable.',
    tags: ['body-and-blade', 'formation', 'garrison'],
    fields: {
      overview:
        'The city-garrison skill. Pike, boar spear, gallery halberd and the long-hafted sluice hook: weapons that are useless alone and decisive in a line of eight. Long Arm is less about the weapon than about the two people either side of you, the dressing of the line, and the discipline not to step forward when the enemy wants you to.\n\nEvery standing force on the continent drills it. [[faction.pitchguard|The Pitchguard]] drills it on bridge galleries where the line is two men wide and the flank is a hundred-metre drop. The Iron Sluice Company drills it on the gantries at the Weir Gates because a pike line is the cheapest way to hold a toll point. In the open field it is beaten by anything with a wheel or a wing, which is why nobody fights in the open field if they can help it.',
      skillType: 'Active',
      branch: 'Formation',
      tree: TREE.bodyAndBlade,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Set and Brace at rank 1', 'Two other holders of the skill within a stride, or the line bonus does not apply'],
      effect:
        'Hold reach against a closing enemy and contribute to a formation. Denies a corridor, doorway or bridge span to anyone without Close Work, and stacks with adjacent holders of the same skill.',
      rankTable: [
        row({ rank: '1', effect: 'Free attack against an enemy entering your reach; no penalty in a crowded line' }),
        row({ rank: '2', effect: 'Two or more adjacent holders share a defence bonus and cannot be flanked from the front arc' }),
        row({ rank: '3', effect: 'You may set the line: allies in formation act on your initiative and hold ground through one failed morale check' }),
      ],
      legality: 'Lawful',
      legalNotes: TBD('Do any cities restrict polearm drill to sworn levies? The Tree City conscripts, the Sky City has no room for a pike line, and the Mediterranean City licenses almost everything else.'),
      devNotes:
        PROPOSAL('The line-sharing rules and the initiative transfer at rank 3 are proposed. The manifest establishes Long Arm as tier 2 off Set and Brace, and as the skill to cite for any formation troops.') +
        '\n\nDESIGN INTENT: this is the node that makes NPC garrisons legible. A four-man watch with Long Arm rank 2 is a wall; the same four without it are four people with sticks. Quest authors can price an infiltration against that difference.',
      node: N(TREE.bodyAndBlade, 'Formation', 1, 0, ['skill.set-and-brace']),
    },
  }),

  E({
    id: 'skill.plate-and-seam',
    type: 'skill',
    name: 'Plate and Seam',
    status: 'draft',
    summary: 'Work all day in laminate harness, and find the seams in someone else’s.',
    tags: ['body-and-blade', 'armour', 'materials'],
    fields: {
      overview:
        'Armour in this world is laminate: boiled [[material.steppe-scute|steppe scute]] pressed in sheets, timber splints in a [[item.bastion-jack|bastion jack]], slate plate on a chalked harness, lead-weighted cloth on a [[item.ballast-jacket|ballast jacket]]. None of it is a shell. All of it is panels joined at seams, and every seam is a compromise between mobility and cover that somebody argued about in a workshop.\n\nPlate and Seam is both halves of that knowledge. It is the conditioning to wear the stuff for a twelve-hour watch without your shoulders giving out, the fitting knowledge to keep it from chafing a person into fever sores, and the eye to read where another set is joined. Armourers respect it more than fighters do. The Arena City’s scute yards will not sell a fitted set to anyone who cannot demonstrate rank 1, on the grounds that badly worn armour kills its wearer more reliably than no armour at all.',
      skillType: 'Passive',
      branch: 'Harness',
      tree: TREE.bodyAndBlade,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Set and Brace rank 1 is the mechanical gate. Undecided: must the harness be fitted to you, or can a party share one set at a stated penalty? The armour economy changes shape depending on the answer.'),
      effect:
        'Remove the fatigue and movement cost of laminate harness, and target the joins in an opponent’s. Also covers field repair of split lamination with pitch, thread and a heated iron.',
      rankTable: [
        row({ rank: '1', effect: 'No fatigue or movement penalty from laminate harness worn for a full watch' }),
        row({ rank: '2', effect: 'Called seam attacks ignore a fixed share of an opponent’s laminate protection' }),
        row({ rank: '3', effect: 'Field repair restores a damaged harness to serviceable in one rest; you can fit a set to another person in an hour' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful, though the armour is not always. A [[item.bound-harness|bound harness]] is numbered on the collar and licensed to Magic City wardens, and wearing one you have not been issued is a licensing charge in that city regardless of how well you wear it.',
      devNotes:
        PROPOSAL('The seam-attack mechanic, the field repair at rank 3 and the fitted-harness requirement are proposed. The manifest establishes Plate and Seam at tier 2 off Set and Brace and ties it to the setting’s laminate armour.') +
        '\n\nDESIGN INTENT: armour here is early-industrial materials science, not a magic number. Every armour item entry should name this skill, and every armour item should have a stated seam that a rank 2 attacker can go for.',
      node: N(TREE.bodyAndBlade, 'Harness', 1, 1, ['skill.set-and-brace']),
    },
  }),

  E({
    id: 'skill.slow-match',
    type: 'skill',
    name: 'Slow Match',
    status: 'draft',
    summary: 'Matchlock drill: load, hold a lit cord in wind, and clear a misfire without losing the hand.',
    tags: ['body-and-blade', 'powder', 'regulated'],
    fields: {
      overview:
        'Firearms exist and they are bad. A matchlock is a tube, a pan of priming, and a length of smouldering cord held in a serpentine, and every part of that description is a problem. The cord goes out in rain and gives your position away at night. The pan fouls. The barrel, if it has been proofed by somebody with [[skill.proof-marking|Proof Marking]] and an honest mark, will hold for a few hundred rounds; if it has not, it opens like a peeled stick.\n\nSlow Match is the drill that makes the thing usable anyway: measured charges by weight rather than by eye, cord tended and trimmed, the discipline to keep the burning end away from the flask, and the misfire procedure that assumes the gun will fire in the next thirty seconds whether or not you want it to. Fighters who carry one usually carry a blade as well, because the honest rate of fire is under two shots a minute and everything else in a fight happens faster than that.',
      skillType: 'Active',
      branch: 'Powder',
      tree: TREE.bodyAndBlade,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Set and Brace rank 1, plus a proofed barrel. Undecided: does anyone teach matchlock drill outside a city armoury? If not, no character without a garrison background can ever acquire this, which may be the correct answer.'),
      effect:
        'Load, fire and clear matchlock and wheel-driven firearms without harming yourself. Sets your reload interval, your misfire chance and whether wind, rain or damp takes you out of the fight entirely.',
      rankTable: [
        row({ rank: '1', effect: 'One shot every three rounds; misfire on a poor roll, and a misfire costs you the round to clear' }),
        row({ rank: '2', effect: 'One shot every two rounds; you can keep a cord lit in rain or updraught for one scene' }),
        row({ rank: '3', effect: 'Misfires are cleared as part of the reload; you can fire from a brace on a moving surface without penalty' }),
      ],
      legality: 'Varies by city',
      legalNotes:
        'Mediterranean City: lawful with a Conduit College proof mark on the barrel and a logged charge purchase. Gilded Ascent: lawful to own, an offence to carry loaded above the fourth terrace. Sky City: barred outright, because a discharged firearm in the lattice is a structural event. Tree City: issued to the gallery watch and to nobody else. Magic City: lawful and irrelevant, since a matchlock in a live fault field is a coin toss.',
      devNotes:
        PROPOSAL('The rate-of-fire figures, the four city positions and the wind rule are proposed. The manifest establishes Slow Match at tier 2 off Set and Brace and puts the restrained-science-fiction ceiling on firearms here.') +
        '\n\nDESIGN INTENT: this node is the guardrail on the whole setting’s technology. Guns are slow, loud, weather-dependent and legally awkward. If a later author wants a faster weapon, it should cost a licence, a machine and a supply chain, not a rank.',
      node: N(TREE.bodyAndBlade, 'Powder', 1, 2, ['skill.set-and-brace']),
    },
  }),

  E({
    id: 'skill.dead-weight',
    type: 'skill',
    name: 'Dead Weight',
    status: 'draft',
    summary: 'Carry a body or a load out of contact without dropping either one.',
    tags: ['body-and-blade', 'rescue', 'sky-city'],
    fields: {
      overview:
        'A conscious person helps you carry them. An unconscious one does not, and neither does two hundred kilos of bonded freight with a broken pallet. Dead Weight is the lifting, the carry positions, the rope work to secure a limp body against a back, and the judgement about when a casualty has to be left, which is the part nobody drills and everybody eventually faces.\n\nIn the Sky City the skill is an economic instrument rather than a mercy. Under [[mechanic.mass-warrant|the Mass Warrant]] a carried person is billable mass, logged against the carrier’s licence at the mast. Rescue crews are therefore paid by weight recovered and fined for weight lost, and [[npc.perrine-orlaunt|Perrine Orlaunt]] runs unlogged bodies down the mooring lines at night because the alternative for the people she moves is a manifest entry with their name on it.',
      skillType: 'Active',
      branch: 'Harness',
      tree: TREE.bodyAndBlade,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Plate and Seam rank 1 is the gate. Undecided: should rank 3 require a recorded rescue, or is a hard narrative gate on a mid-tier node too punitive for a party that has simply not been in that situation yet?'),
      effect:
        'Carry an unconscious person or an oversized load at usable speed, including up ladders, down mooring lines and across unstable footing, without dropping either.',
      rankTable: [
        row({ rank: '1', effect: 'Carry an adult at half movement on level ground; no penalty to defence while carrying' }),
        row({ rank: '2', effect: 'Carry at three quarters movement and take a carried person up or down a ladder or fixed line' }),
        row({ rank: '3', effect: 'Carry two people in relays, or one person plus your own kit, and set a casualty down without further injury' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful in principle. In the Sky City an unlogged carry is a mass-warrant offence and the penalty attaches to the carrier, not the carried, which is the whole reason the ballast trade exists. Arena City stewards treat carrying a bonded fighter off the sand as removal of secured property.',
      devNotes:
        PROPOSAL('The carry speeds, the relay rule and the recorded-rescue gate on rank 3 are proposed. The manifest establishes Dead Weight at tier 3 off Plate and Seam and its interaction with the Mass Warrant.') +
        '\n\nDESIGN INTENT: give parties a real answer to downed allies that is not a healing spell. The world has no combat healing, so the retrieval skill has to carry that weight literally.',
      node: N(TREE.bodyAndBlade, 'Harness', 2, 1, ['skill.plate-and-seam']),
    },
  }),

  E({
    id: 'skill.ring-craft',
    type: 'skill',
    name: 'Ring Craft',
    status: 'draft',
    summary: 'Arena footwork: read a fight card, work the stipulations, and play to the tiers.',
    tags: ['body-and-blade', 'arena-city', 'indenture'],
    fields: {
      overview:
        'A bout in [[landmark.the-sunken-ring|the Sunken Ring]] is not a fight, it is a contract being performed in front of witnesses. The card states the stipulations: what may be carried, what ends the bout, whether the sand is flooded, whether a submission counts. Ring Craft is the craft of fighting inside those clauses, which means footwork on bad sand, but also reading the card, knowing which steward is watching, and knowing what a tier change does to your bond.\n\nUnder [[mechanic.ring-bond|the Ring Bond]] every notch on a [[item.tallyblade|tallyblade]] strikes an agreed sum off a debt, and every tier change alters the stipulations you fight under. [[npc.aylun-torgai|Aylun Torgai]] has sixteen wins and the arithmetic to prove she should be free. [[npc.berke-chagra|Berke Chagra]] knows to the day which fighters are one notch from a tier change, and prices the card accordingly. Learning Ring Craft is learning to be good at a thing that is being done to you.',
      skillType: 'Active',
      branch: 'Close work',
      tree: TREE.bodyAndBlade,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Close Work rank 1 is the gate. Undecided: can a free character learn Ring Craft without signing a bond, or is the bond the only door? The answer decides whether the Arena City is playable without becoming somebody\'s property.'),
      effect:
        'Fight to stipulation rather than to the death: control bout tempo, exploit the card’s clauses, and manage crowd and steward attention. Also lets you read a fight card for what it is actually buying.',
      rankTable: [
        row({ rank: '1', effect: 'No penalty on sand, flooded floor or uneven ring; you can read a card’s stipulations correctly on sight' }),
        row({ rank: '2', effect: 'Choose to win by submission, disarm or exhaustion instead of a kill, without losing the purse' }),
        row({ rank: '3', effect: 'Work the crowd mid-bout: shift the terms a steward will enforce, and bank a tier change you have not yet earned' }),
      ],
      legality: 'Varies by city',
      legalNotes:
        'Arena City: lawful, expected, and the basis of the Ring’s labour law. Gilded Ascent and Sky City: lawful, fashionable, and a sanctioned bout requires a bonded venue licence. Mediterranean City: prize fighting is banned outright and a visiting fighter’s [[item.tallyblade|tallyblade]] is evidence against whoever holds the other end of their bond.',
      devNotes:
        PROPOSAL('The tier-change banking at rank 3 and the card-reading rule are proposed. The manifest establishes Ring Craft at tier 3 off Close Work, bound to the Ring Bond and feeding the Crowd Turning hybrid.') +
        '\n\nDESIGN INTENT: never write the Ring as spectacle. The interesting mechanic is that the fighter is a debtor performing a contract, and the skill that keeps them alive is the same skill that keeps them profitable to somebody else.',
      node: N(TREE.bodyAndBlade, 'Close work', 2, 3, ['skill.close-work']),
    },
  }),

  E({
    id: 'skill.bonewright',
    type: 'skill',
    name: 'Bonewright',
    status: 'draft',
    summary: 'Set bone, pin it with screws, and take a limb cleanly when there is nothing else left to do.',
    tags: ['body-and-blade', 'craft-and-machine', 'hybrid', 'surgery'],
    fields: {
      overview:
        'There is no healing magic in this world worth the name, so surgery is engineering. A bonewright works with drawn screws, brass plate, a bone saw and a bench vice, and the good ones came to it from a machine shop rather than from a sickbed. The name is literal: a wright who works bone, priced by the job, liable for the outcome.\n\nThe pain problem is solved badly. [[spell.stillwater-draught|Stillwater draught]] stops the body without stopping the pain and about one patient in nine never breathes again. [[item.cinderroot-cordial|Cinderroot cordial]] works and takes your hands over three seasons. [[material.quietmilk|Quietmilk]] is the only dependable anaesthetic and it is licensed in some cities, banned in others, and milked from people who are dosed to keep them working. A bonewright chooses between those three every working day, which is why [[npc.anthimos-vellani|Anthimos Vellani]] keeps a private ward and does not write everything down.',
      skillType: 'Active',
      branch: 'Field surgery',
      tree: TREE.bodyAndBlade,
      tier: 3,
      cost: 4,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: TBD('Close Work rank 1 and Bench Sense rank 1, plus a bench and clean water. Undecided: which anaesthetic is the game\'s default, and does operating without any of the three carry a stated mechanical cost to the patient?'),
      effect:
        'Set fractures, pin them with drawn screws and plate, close deep wounds and amputate. Converts a permanent injury into a recoverable one at a stated cost in time, materials and anaesthetic.',
      rankTable: [
        row({ rank: '1', effect: 'At a bench: set and pin a fracture, close a deep wound, amputate. Recovery measured in weeks, not scenes' }),
        row({ rank: '2', effect: 'Field work without a bench, and a permanent injury downgraded to a lasting one if treated within a day' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: surgeons are licensed by the Conduit College and an unlicensed cut is prosecuted whether or not the patient lived. Arena City: the Ring keeps its own surgeons and charges the fighter for their work. Cave Agrarian City: unregulated, and [[item.fever-clay|fever clay]] does most of what a licence does elsewhere. Anaesthetic law is the real gate: quietmilk is licensed to surgeons in some cities and banned outright in others.',
      devNotes:
        PROPOSAL('The two-rank structure, the injury downgrade window and the three-anaesthetic trade-off are proposed. The manifest establishes Bonewright as a Body & Blade x Craft & Machine hybrid at tier 3 requiring Close Work and Bench Sense, with no healing magic implied.') +
        '\n\nDESIGN INTENT: this is the hybrid that proves the trees are not sealed. It is also the setting’s answer to a cleric. Injuries persist, treatment costs money and material, and the anaesthetic question is a moral choice every time.',
      node: N(TREE.bodyAndBlade, 'Field surgery', 2, 4, ['skill.close-work', 'skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.gallery-drill',
    type: 'skill',
    name: 'Gallery Drill',
    status: 'draft',
    summary: 'Fight on rope bridges and palisade galleries, and cut a line while it is still under load.',
    tags: ['body-and-blade', 'tree-city', 'traversal'],
    fields: {
      overview:
        'The Tree City’s signature training and the reason [[faction.pitchguard|the Pitchguard]] can hold ground that has no ground. A gallery is a plank walk pinned to a living trunk; a span is rope, cable and laminated stave with two hundred people’s weight on it. Fighting there means never committing both feet, never letting a line go slack behind you, and understanding what your own weight is doing to the structure you are standing on.\n\nThe second half of the skill is the part the Marshalcy actually cares about. Under [[mechanic.severance-drill|the Severance Drill]] a breached gallery is sealed by cutting the bridges into it, and cutting a span under load is a technical act: the wrong strand first and the whole assembly whips back through whoever is standing at the anchor. The drill works. It also strands everyone still on the span, which is why [[npc.aune-mustsalu|Aune Mustsalu]] signs the order herself rather than delegate it.',
      skillType: 'Active',
      branch: 'Formation',
      tree: TREE.bodyAndBlade,
      tier: 4,
      cost: 4,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Long Arm at rank 2', 'Dead Weight at rank 1', 'Pitchguard service, or a Spanworks foreman willing to teach a stranger'],
      effect:
        'Fight, move and cut on suspended structures. Attack and defend without penalty on spans and galleries, and sever a loaded line in a controlled sequence rather than by hacking at it.',
      rankTable: [
        row({ rank: '1', effect: 'No penalty attacking, defending or moving on a span; you can read a span’s load state at a glance' }),
        row({ rank: '2', effect: 'Cut a loaded span in sequence: the far end drops, the anchor end holds, nobody at the anchor is killed by the whip' }),
        row({ rank: '3', effect: 'Fight while a span is failing, and choose the second in which it goes; you can drop a pursuer and keep an ally' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Tree City: taught only to sworn gallery watch, and cutting a span without a Marshalcy order is treated as murder of everyone on it. Sky City: the equivalent work on the lattice is [[skill.lattice-work|Lattice Work]] and cutting anything there is a capital matter. Floating Swamp Settlement: nobody licenses anything, and the same technique is used to cut a rival’s moorings.',
      devNotes:
        PROPOSAL('The three ranks, the sequenced cut and the timing control at rank 3 are proposed. The manifest establishes Gallery Drill at tier 4 requiring Long Arm and Dead Weight, paired with the Severance Drill.') +
        '\n\nDESIGN INTENT: the mechanic is the easy part. The quest hook is that the drill works perfectly and the cost is entirely moral: [[quest.the-felling-order|The Felling Order]] should force a party to use this competently on people they can see.',
      node: N(TREE.bodyAndBlade, 'Formation', 3, 0, ['skill.long-arm', 'skill.dead-weight']),
    },
  }),

  E({
    id: 'skill.throat-work',
    type: 'skill',
    name: 'Throat Work',
    status: 'draft',
    summary: 'Kill quietly and close; the tools alone are a charge in most cities that keep records.',
    tags: ['body-and-blade', 'outlawed', 'criminal'],
    fields: {
      overview:
        'Killing a person without noise is a technical problem with a small number of solutions, and Throat Work is the set of them: the approach, the hold that stops the shout before the wound does, the placement that ends a heart in under four seconds rather than forty, and the disposal that follows. It is taught by nobody in public and by three or four people in private, and every one of them charges more for the disposal than for the kill.\n\nThe legal exposure is not the act, which is hard to prove, but the kit. A short spike ground to a triangular section, a wire on two toggles, a pair of glove weights: none of these has an innocent use, and every city that keeps records treats possession as evidence of intent. [[faction.red-writ|The Red Writ]] gates its quieter contracts on this skill and issues nothing, because a courier carrying Red Writ tools is a Red Writ prosecution.',
      skillType: 'Active',
      branch: 'Close work',
      tree: TREE.bodyAndBlade,
      tier: 4,
      cost: 4,
      maxRank: 2,
      hybrid: false,
      unlockRequirements: TBD('Close Work rank 3 and Ring Craft rank 1. Undecided: who teaches it? Naming a teacher makes them the obvious target of every investigation; leaving it unnamed makes the node unacquirable in actual play.'),
      effect:
        'Kill or incapacitate silently at contact range against an unaware or restrained target. Also covers the disposal work that keeps a killing from becoming an investigation.',
      rankTable: [
        row({ rank: '1', effect: 'Silent kill against an unaware target; no alarm raised if nobody is within line of sight' }),
        row({ rank: '2', effect: 'Works on an aware but engaged target, and the body can be staged as an accident that survives a first inspection' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Outlawed in all thirteen settlements as a matter of tooling rather than of technique. Gilded Ascent, Mediterranean City and Sky City prosecute possession of the tools as attempted murder. Arena City is the near-exception: the technique is legal inside a stipulated bout and a capital matter fourteen paces outside the sand. Extradition for it is honoured even between cities that honour nothing else.',
      devNotes:
        PROPOSAL('The two ranks, the staged-accident rule and the tooling-based prosecution are proposed. The manifest establishes Throat Work at tier 4, OUTLAWED, requiring Close Work and Ring Craft, and gating assassin faction membership.') +
        '\n\nDESIGN INTENT: make the crime the object, not the deed. It gives investigators something to find, gives players something to hide, and keeps the skill dangerous to own between jobs.',
      node: N(TREE.bodyAndBlade, 'Close work', 3, 3, ['skill.close-work', 'skill.ring-craft']),
    },
  }),

  E({
    id: 'skill.last-rank',
    type: 'skill',
    name: 'Last Rank',
    status: 'draft',
    summary: 'Refuse a line and hold it: allies nearby cannot rout while you stand, and you cannot withdraw.',
    tags: ['body-and-blade', 'capstone', 'command'],
    fields: {
      overview:
        'The capstone of the tree, and the only skill in the game that takes an option away from the player who buys it. Last Rank is the drilled, deliberate refusal of a flank: the commander plants, states the line, and does not move from it. Allies within earshot cannot break while that holds. Neither can the holder, and that is not a flavour note, it is the rule.\n\nThe Pitchguard teaches it at the trunk redoubts and expects the holder to die at their post roughly once a generation. The Arena City has no use for it, because nothing in the Sunken Ring is worth standing for. The reason it exists in the trees at all is that the setting needs a mechanical statement that command is a debt rather than a privilege: somebody signs the levy roll, and somebody stands at the end of the bridge while the roll is carried out.',
      skillType: 'Toggle',
      branch: 'Formation',
      tree: TREE.bodyAndBlade,
      tier: 5,
      cost: 6,
      maxRank: 1,
      hybrid: false,
      unlockRequirements: [
        'Plate and Seam at rank 2',
        'Long Arm at rank 3',
        'Gallery Drill at rank 2',
        'A recorded event in which the character held a position they could have left',
      ],
      effect:
        'While toggled on, allies within earshot cannot be forced to withdraw or rout, and gain a defence bonus in your front arc. While it is on you cannot voluntarily move from the square you set, and you cannot toggle it off in the same scene.',
      rankTable: [
        row({ rank: '1', effect: 'Single rank. Allies in earshot hold; you hold. Ends when the scene ends or when you do' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful and, in the Tree City, close to sacramental: a Pitchguard officer who toggles Last Rank and then withdraws is stripped and struck from the rolls, and the record follows them to every gate on the continent. No other city has a formal position on it.',
      devNotes:
        PROPOSAL('The single-rank structure, the earshot radius and the no-withdraw lock are proposed. The manifest establishes Last Rank as the tier-5 Body & Blade capstone requiring Plate and Seam, Long Arm and Gallery Drill, with the lock-in as the cost.') +
        '\n\nDESIGN INTENT: a capstone that is a liability is more interesting than a capstone that is a damage number. Let players buy it, then let a GM put a retreat order in front of them.',
      node: N(TREE.bodyAndBlade, 'Formation', 4, 1, ['skill.plate-and-seam', 'skill.long-arm', 'skill.gallery-drill']),
    },
  }),

  /* ================================================================ */
  /* Craft & Machine                                                   */
  /* ================================================================ */

  E({
    id: 'skill.bench-sense',
    type: 'skill',
    name: 'Bench Sense',
    status: 'draft',
    summary: 'Read wear, tolerance and vibration; know what a machine will do before it does it.',
    tags: ['craft-and-machine', 'entry', 'machines'],
    fields: {
      overview:
        'The root of the industrial tree, and the least glamorous skill in the game. Bench Sense is the accumulated feel for a machine: the note a bearing makes three weeks before it seizes, the smell of a belt running hot, the half-millimetre of play in a drum shaft that means the keyway is going. It is not intuition. It is a person who has stripped four hundred assemblies and remembers what the failures looked like on the way in.\n\nEvery machine entry in this world has a failure risk, and Bench Sense is how a player sees it before it happens. [[npc.brask-vellmar|Brask Vellmar]] has it and it is why he failed the No. 3 main cable, kept the strand samples in a tin, and has been living with the consequences of being right. [[npc.melitta-aspri|Melitta Aspri]] has it and it is why she knows exactly how far [[landmark.the-tide-orrery|the Tide Orrery]] has drifted, and exactly what saying so would cost the season’s freight contracts.',
      skillType: 'Passive',
      branch: 'Bench',
      tree: TREE.craftAndMachine,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite. Undecided: does the Conduit College examination gate the skill itself for non-Mediterranean characters, or is it only a licence laid on top of a skill anyone can learn at a bench?'),
      effect:
        'Assess a machine’s condition, tolerance and remaining service life by inspection. Surfaces the failure risks listed on any machine entry, and estimates how many cycles remain before one fires.',
      rankTable: [
        row({ rank: '1', effect: 'Read a machine’s stated failure risks on inspection; spot obvious sabotage and missing guards' }),
        row({ rank: '2', effect: 'Estimate remaining service life to within a shift; detect wear disguised by a recent clean or a fresh paint' }),
        row({ rank: '3', effect: 'Predict which component fails first and what it takes with it, which is what an Overhaul survey is priced against' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere, and in the Mediterranean City a prerequisite for almost every other licence the Conduit College issues. The College examines for it rather than teaching it, which is one of the standing grievances against the licensing regime.',
      devNotes:
        PROPOSAL('The three ranks and the failure-prediction rule are proposed. The manifest establishes Bench Sense as a tier-1 root with no prerequisite, cited by every machine entry with a failure risk, and feeding the Bonewright and Load Binding hybrids.') +
        '\n\nDESIGN INTENT: this node is the reason a party engages with the machine layer at all. Machine authors should assume a rank 1 character can see the risk list, and write at least one risk that only rank 3 catches.',
      node: N(TREE.craftAndMachine, 'Bench', 0, 0),
    },
  }),

  E({
    id: 'skill.heat-reading',
    type: 'skill',
    name: 'Heat Reading',
    status: 'draft',
    summary: 'Judge temperature by colour, smell and sound at forge, kiln and glass bench.',
    tags: ['craft-and-machine', 'entry', 'metalwork'],
    fields: {
      overview:
        'There are no thermometers worth the name above a few hundred degrees, so temperature is read by eye, by nose and by ear: the exact straw and blue of a tempering colour, the moment a kiln charge stops smoking and starts glowing, the pitch of the roar in [[machine.the-verdigris-hearth|the Verdigris Hearth]] when the charge has taken. Getting it wrong by fifty degrees ruins a month of glass casting or produces a bar that will crack in service.\n\nIt is a trade skill with a body count attached. The three licensed crucible sheds in the Sifting City reduce [[material.blackfall-sand|blackfall sand]] over eleven days of continuous fire, and the shed masters who read those fires go blind at the edges of their vision by fifty. [[npc.toval-cherek|Toval Cherek]] reads heat well enough to know exactly which of his shorted chain links will fail under sustained load, which is not the same as being able to say so.',
      skillType: 'Passive',
      branch: 'Fire',
      tree: TREE.craftAndMachine,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite. Undecided: does one node really cover forge, kiln and glass bench? Optical glass may want to split off once the Mediterranean City\'s instrument trade is written up properly.'),
      effect:
        'Judge working temperature without instruments at forge, kiln, crucible and glass bench. Sets your success band on every heat-dependent recipe and lets you catch a bad charge before it is spoiled.',
      rankTable: [
        row({ rank: '1', effect: 'Hit a stated working temperature reliably; spot an overrun before the charge is lost' }),
        row({ rank: '2', effect: 'Judge to within roughly twenty degrees, which is the tolerance orrery bronze and optical glass demand' }),
        row({ rank: '3', effect: 'Read an unfamiliar furnace on one charge; recover a spoiled melt instead of scrapping it' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere. The Magic City is the odd case: heat inside a live fault field behaves badly enough that the Fetterhouse will not accept an outside smith’s judgement on the [[machine.the-ward-kilns|ward kilns]] without a local second reading, and pays the second reader more than the first.',
      devNotes:
        PROPOSAL('The tolerance bands and the melt-recovery rule are proposed. The manifest establishes Heat Reading as a tier-1 root feeding Mirror Cutting, Proof Marking and Charge Blending.') +
        '\n\nDESIGN INTENT: keep instrumentation out of this. The setting’s restrained science fiction means good materials and hard-won human judgement, not gauges. A pyrometer would be a canon decision, not a shop purchase.',
      node: N(TREE.craftAndMachine, 'Fire', 0, 3),
    },
  }),

  E({
    id: 'skill.cable-and-drum',
    type: 'skill',
    name: 'Cable and Drum',
    status: 'draft',
    summary: 'Rig, splice and brake hoists, cableways and counterweights without shedding the load.',
    tags: ['craft-and-machine', 'rigging', 'gilded-ascent'],
    fields: {
      overview:
        'Two cities exist because of this skill. The Gilded Ascent moves everything it sells up eleven terraces on [[machine.the-oxblood-hoists|counterweighted cable hoists]] running on river ballast, and the Sky City hangs off laid cable that has to be replaced faster than it fatigues. Cable and Drum is the rigging trade behind both: splicing, seizing, drum lay, brake setting, and the condemnation rules that say when a rope stops being a rope.\n\nThe rule everyone knows is that a [[material.stairwire|stairwire]] hawser is condemned at the first broken wire. The rule everyone lives by is that condemned rope has a thriving second market on the lower terraces, where it is re-spliced, re-served and sold to people who cannot afford to ask. [[npc.doret-halvane|Doret Halvane]] can find anyone in the Ascent for the price of a cable inspection, which tells you exactly how much of the city’s daily life passes through a rigger’s hands.',
      skillType: 'Active',
      branch: 'Rigging',
      tree: TREE.craftAndMachine,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Bench Sense rank 1 is the gate. Undecided: is the Gilded Ascent yard ticket an unlock requirement or only a legality? Every hoist-yard quest changes shape depending on which it is.'),
      effect:
        'Rig, splice, brake and inspect cable systems: hoists, cableways, counterweights and mooring lines. Determines whether a load arrives, stalls or comes down on the people below.',
      rankTable: [
        row({ rank: '1', effect: 'Rig and operate a hoist safely; make a splice that will hold a rated load' }),
        row({ rank: '2', effect: 'Condemn or pass a rope correctly, and set a brake to hold a runaway drum' }),
        row({ rank: '3', effect: 'Re-reeve a failing system while it is loaded, and drop a load deliberately without killing the yard' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Gilded Ascent: hoist work requires a yard ticket, and a cable inspector’s signature is what lets the terraces load. Sky City: mast and counterweight rigging is licensed by [[faction.mooring-assize|the Mooring Assize]] and nothing rises unpriced. Elsewhere unregulated, which is why re-spliced condemned rope ends up in the Drown and the Ashen Steppe.',
      devNotes:
        PROPOSAL('The condemnation rule as a rank 2 gate and the deliberate-drop option at rank 3 are proposed. The manifest establishes Cable and Drum at tier 2 off Bench Sense, covering the Ascent hoists and Sky City counterweights.') +
        '\n\nDESIGN INTENT: name this skill on every lift-type machine. The deliberate drop at rank 3 is the sabotage hook the Ascent economy needs, and it should be traceable back to a named rigger.',
      node: N(TREE.craftAndMachine, 'Rigging', 1, 0, ['skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.pressure-fitting',
    type: 'skill',
    name: 'Pressure Fitting',
    status: 'draft',
    summary: 'Cut, gasket and valve copper conduit that is still carrying working pressure.',
    tags: ['craft-and-machine', 'mediterranean-city', 'licensed'],
    fields: {
      overview:
        'The Mediterranean City runs on copper. Drawn tube out of [[machine.the-drawbench-vaults|the Drawbench Vaults]], lacquered against corrosion with liquor from farmed [[creature.verdigris-whelk|verdigris whelks]], carrying working pressure through the [[district.mediterranean-city-conduit-yards|conduit yards]] on a timetable. Pressure Fitting is the trade of working on that system live, because shutting a main down means every workshop downstream of it loses its slot.\n\nUnder [[mechanic.conduit-hours|Conduit Hours]] a slot is bid for and a missed slot scraps the batch, so the entire craft economy of the coast is hostage to whether a fitter can get a valve in without a shutdown. [[faction.conduit-college|The Conduit College]] licenses every fitter, seals every joint and sits on working designs it will not release, because the rent it lives on is the licence rather than the pipe.',
      skillType: 'Active',
      branch: 'Conduit',
      tree: TREE.craftAndMachine,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Bench Sense rank 1 is the gate. Undecided: does the Conduit College licence gate the skill or only its lawful use? The manifest says no conduit is lawful without a seal and says nothing at all about training.'),
      effect:
        'Cut, tap, gasket and valve pressurised copper conduit without a shutdown. Grants access to [[mechanic.conduit-hours|Conduit Hours]] slots and to any recipe that states a pressure requirement.',
      rankTable: [
        row({ rank: '1', effect: 'Work a dead main competently; fit and test joints that hold to rated pressure' }),
        row({ rank: '2', effect: 'Hot tap a live main: a branch cut in without shutting the line down' }),
        row({ rank: '3', effect: 'Re-route pressure across a district on the fly, which is how a slot is stolen and how a scrapped batch is saved' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: no conduit is lawful without a College seal, and an unsealed joint voids every insurance and every lease on the line. Sky City and Gilded Ascent: unregulated, since neither runs pressure mains worth the name. Cave Agrarian City: applies to water and sump lines, and the Mirror Assembly licenses it as a water trade rather than an engineering one.',
      devNotes:
        PROPOSAL('The hot tap at rank 2 and the district re-route at rank 3 are proposed. The manifest establishes Pressure Fitting at tier 2 off Bench Sense as the Mediterranean trade required to exploit Conduit Hours.') +
        '\n\nDESIGN INTENT: rank 3 is a heist tool disguised as a trade skill. Stealing another workshop’s slot is the coast’s characteristic crime and it should be doable by a competent fitter with nerve.',
      node: N(TREE.craftAndMachine, 'Conduit', 1, 1, ['skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.sieve-tuning',
    type: 'skill',
    name: 'Sieve Tuning',
    status: 'draft',
    summary: 'Set mesh, slope and feed rate so the grade you actually want stays on the screen.',
    tags: ['craft-and-machine', 'sifting-city', 'extraction'],
    fields: {
      overview:
        'Everything the White Pans produce comes off a screen. [[machine.the-sieve-cascade|The Sieve Cascade]] is nine graded meshes in a wind-fed tower, and what falls out at the bottom depends on mesh count, deck slope, feed rate and how wet the crust was when it went in. Sieve Tuning is the craft of setting those four variables so the fraction you are being paid for stays where you can rake it off.\n\nUnder [[mechanic.the-sift-line|the Sift Line]] each pass costs water and lung, and the rarest grade rides the last mesh, so a tuner is deciding how many passes the crew makes and what they breathe while doing it. That is the quiet horror of [[quest.pan-fever|Pan Fever]]: the fraction that sells at a premium and the fraction that wastes the crews are the same fraction, and the tuning that maximises one maximises the other. [[npc.tazrit-nourem|Tazrit n’Ourem]] runs three towers and buys debt as readily as ore.',
      skillType: 'Active',
      branch: 'Separation',
      tree: TREE.craftAndMachine,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Bench Sense at rank 1', 'A tower berth, a screen set, and a crew who will run the feed you ask for'],
      effect:
        'Set mesh, slope, feed rate and pass count on any screening or classification rig. Sets the grade distribution of the output, the water cost per pass and the dust exposure of the crew.',
      rankTable: [
        row({ rank: '1', effect: 'Hit a target grade on a familiar rig; recognise a blinded screen before the shift is wasted' }),
        row({ rank: '2', effect: 'Tune an unfamiliar rig in one pass; recover a fraction from tailings other crews wrote off' }),
        row({ rank: '3', effect: 'Trade yield against dust: cut crew exposure sharply at a stated cost in output, which is a decision somebody has to authorise' }),
      ],
      legality: 'Lawful',
      legalNotes: TBD('Does the Sifting City licence tower tuners the way the Pale Assay licenses graders, or is tuning deliberately left unlicensed so that responsibility for the dust has no name on it?'),
      devNotes:
        PROPOSAL('The four tuning variables, the tailings recovery at rank 2 and the yield-against-dust trade at rank 3 are proposed. The manifest establishes Sieve Tuning at tier 2 off Bench Sense as the skill behind Sift Line yields.') +
        '\n\nDESIGN INTENT: rank 3 is the whole design. Give the player the lever that saves lungs and costs money, then make somebody else own the decision. That is the argument at the centre of [[quest.pan-fever|Pan Fever]].',
      node: N(TREE.craftAndMachine, 'Separation', 1, 2, ['skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.lattice-work',
    type: 'skill',
    name: 'Lattice Work',
    status: 'draft',
    summary: 'Rig and repair tension structures at height, on a lattice that is still carrying a city.',
    tags: ['craft-and-machine', 'body-and-blade', 'hybrid', 'sky-city'],
    fields: {
      overview:
        'The Sky City is a ring hung on cable over a hole in the air. The cable fatigues. [[machine.the-strand-loom|The Strand Loom]] lays replacement faster than the old stuff fails, and lattice crews swap it out strand by strand while the city sits on it. That is the job: tension work at height, on a structure that cannot be unloaded, above an updraught that will take anything that comes free.\n\nIt is the most valuable and shortest-lived profession on the continent. Crews are paid by the strand and licensed by [[faction.mooring-assize|the Mooring Assize]], which sets the price of every lift and every counterweight right above the Anvil Shelf. [[npc.cesille-vaudry|Cesille Vaudry]] has been forging the tonnage returns rather than sign the eviction lists that would lighten the load, which means the crews are working a lattice several hundred tonnes over its rated figure and have not been told.',
      skillType: 'Active',
      branch: 'Rigging',
      tree: TREE.craftAndMachine,
      tier: 3,
      cost: 4,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: TBD('Cable and Drum rank 2 and Set and Brace rank 2, plus an Assize lattice pass. Undecided: how many strands can one crew swap in a shift? That number decides whether the Sky City\'s cable replacement is solvable or merely survivable.'),
      effect:
        'Work loaded tension structures at height: inspect, tension, splice and replace members without unloading the assembly. Also lets you read what a structure is actually carrying against what it is rated for.',
      rankTable: [
        row({ rank: '1', effect: 'Work at height on a loaded lattice without penalty; replace a single member safely' }),
        row({ rank: '2', effect: 'Re-tension a section under load, and compute the real carried mass against the posted rating' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Sky City: licensed by the Mooring Assize, and unlicensed lattice work is prosecuted as endangerment of the whole city, which is not rhetorical. Gilded Ascent: the equivalent hoist-tower work is covered by a yard ticket. Tree City: [[skill.gallery-drill|Gallery Drill]] covers span work and the Marshalcy does not recognise an Assize pass.',
      devNotes:
        PROPOSAL('The two ranks and the carried-mass computation at rank 2 are proposed. The manifest establishes Lattice Work as a Craft & Machine x Body & Blade hybrid at tier 3 requiring Cable and Drum and Set and Brace.') +
        '\n\nDESIGN INTENT: rank 2 is the evidence hook. A party with this skill can independently establish the number [[npc.cesille-vaudry|Vaudry]] has been forging, which turns a survey into a succession fight over which quarter goes down the ropes.',
      node: N(TREE.craftAndMachine, 'Rigging', 2, 0, ['skill.cable-and-drum', 'skill.set-and-brace']),
    },
  }),

  E({
    id: 'skill.mirror-cutting',
    type: 'skill',
    name: 'Mirror Cutting',
    status: 'draft',
    summary: 'Grind, silver and aim duct mirrors; one degree of error is a dead gallery.',
    tags: ['craft-and-machine', 'cave-agrarian-city', 'optics'],
    fields: {
      overview:
        'The Hollow Karst eats sunlight it does not have. [[landmark.sunwell-shaft|The Sunwell Shaft]] and [[machine.the-mirror-ducts|the mirror ducts]] carry daylight down to the growing galleries on a clockwork drive, through cleaved [[material.sunwell-mica|sunwell mica]] silvered with tin amalgam. Mirror Cutting is the whole chain: cleaving the leaves, silvering them, setting them in the duct, and aiming a train of two hundred mirrors so that the light arrives where the barley is.\n\nOne degree of error at the head is a dark gallery at the foot. [[npc.iratze-zubiate|Iratze Zubiate]] keeps the whole train aligned by hand and has been hiding a collapse in two lower ducts for over a year by skimming mirror-hours off the grain terraces. The silvering itself kills: [[recipe.duct-mirror-resilvering|resilvering]] rotates its workers out every ninety days because of the quicksilver, and the mirror-wrights’ guild holds both steps and hides the mortality of the second.',
      skillType: 'Active',
      branch: 'Optics',
      tree: TREE.craftAndMachine,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Heat Reading rank 2 is the gate. Undecided: is guild indenture an absolute bar on learning to silver, or only on selling the work? The mirror-wrights hide the mortality of silvering, which argues for the harder gate.'),
      effect:
        'Cleave, grind, silver and aim mirrors, lenses and duct trains. Sets the delivered light of any gallery under [[mechanic.the-mirror-rota|the Mirror Rota]], and covers optics for signal gear, lamps and instrument work.',
      rankTable: [
        row({ rank: '1', effect: 'Cleave and silver serviceable plate; aim a single mirror to a marked point' }),
        row({ rank: '2', effect: 'Align a duct train end to end; recover lumen-hours from a duct nobody else could straighten' }),
        row({ rank: '3', effect: 'Design a new duct run, or divert an existing one so the loss lands somewhere the tithe books do not look' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Cave Agrarian City: the mirror-wrights’ guild holds cleaving and silvering both, and light theft with a [[item.sunwell-mirror|sunwell mirror]] is the characteristic local crime, punished by loss of gallery tenancy rather than by prison. Mediterranean City: optical work is licensed to the Orrery College. Everywhere else: unregulated and largely absent.',
      devNotes:
        PROPOSAL('The three ranks and the diversion option at rank 3 are proposed. The manifest establishes Mirror Cutting at tier 3 off Heat Reading, underpinning the Mirror Rota and serving as the optics skill for lenses and signal gear.') +
        '\n\nDESIGN INTENT: rank 3 is exactly what Zubiate did and exactly what [[quest.who-gets-the-light|Who Gets the Light]] asks a player to do on purpose. Light is the currency; make the skill able to move it and make the movement visible to somebody.',
      node: N(TREE.craftAndMachine, 'Optics', 2, 3, ['skill.heat-reading']),
    },
  }),

  E({
    id: 'skill.proof-marking',
    type: 'skill',
    name: 'Proof Marking',
    status: 'draft',
    summary: 'Assay, test and stamp goods to guild proof; your mark carries your liability.',
    tags: ['craft-and-machine', 'trade', 'regulated'],
    fields: {
      overview:
        'A stamp is a promise with a name on it. Proof Marking is the testing that stands behind one: proving a barrel to pressure, assaying a sift fraction against a reference, breaking one bar in fifty to certify the bundle, weighing against the sealed masses in [[machine.the-assay-cage|the Assay Cage]]. The test is the easy part. The mark is the hard part, because the mark is personal and the liability follows it for the working life of the object.\n\nThat is the entire structure of the trade economy. [[faction.pale-assay|The Pale Assay]] stamps what a find is worth before it leaves the Pans, and the stamp is what buyers pay for rather than the salt. A Sifting City grade is six cuts wide, so a single stamp is the difference between a crew eating and a crew owing. The grading fraud is not a Sifting City problem: one adulterated barrel spoils a month of [[material.clearcast-glass|clearcast glass]] casting a thousand kilometres away.',
      skillType: 'Active',
      branch: 'Proof',
      tree: TREE.craftAndMachine,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Heat Reading rank 1 and Bench Sense rank 2. Undecided: can a registered mark be held by somebody with no city citizenship, and if not, what does a travelling assayer actually carry into a market?'),
      effect:
        'Test and certify materials, vessels and instruments to guild proof, and read another mark for what it does and does not cover. A stamped object gains a verifiable quality claim; a false stamp becomes your liability.',
      rankTable: [
        row({ rank: '1', effect: 'Test to a stated proof and stamp your own work; read a mark and know which guild issued it' }),
        row({ rank: '2', effect: 'Assay unfamiliar material against a sealed reference; detect a regraded or overstamped mark' }),
        row({ rank: '3', effect: 'Certify to a standard other cities will honour, and trace a bad batch back through the marks to the shed that made it' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Gilded Ascent: marks are registered against [[landmark.the-brass-standard|the Brass Standard]] and a false mark is fraud on every contract weighed against it. Sifting City: the Pale Assay holds the grading monopoly and inherits its licences. Mediterranean City: the Conduit College proofs pressure vessels and barrels, and an unproofed vessel is uninsurable. Sky City: mass marks are the whole of the [[mechanic.mass-warrant|Mass Warrant]].',
      devNotes:
        PROPOSAL('The registered personal mark, the six-cut grade structure and the batch tracing at rank 3 are proposed. The manifest establishes Proof Marking at tier 3 requiring Heat Reading and Bench Sense, Regulated, as the legitimate half of the counterfeiting economy.') +
        '\n\nDESIGN INTENT: rank 3 tracing is the investigation spine for [[quest.the-chalk-that-lies|The Chalk That Lies]] and [[quest.pan-fever|Pan Fever]]. Trade factions should gate rank on this skill, which is why [[skill.false-proof|False Proof]] is worth so much to everybody else.',
      node: N(TREE.craftAndMachine, 'Proof', 2, 4, ['skill.heat-reading', 'skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.false-proof',
    type: 'skill',
    name: 'False Proof',
    status: 'draft',
    summary: 'Cut counterfeit assay seals and proof stamps that survive a second inspection.',
    tags: ['craft-and-machine', 'tongue-and-coin', 'hybrid', 'outlawed'],
    fields: {
      overview:
        'Anyone can cut a stamp that fools a tired gate clerk. False Proof is the craft of cutting one that survives being taken seriously: the right steel, the right hardness, the correct strike depth, the small deliberate defects that the genuine die has acquired over eleven years of use, and the discipline to age the impression rather than the die.\n\nThe money is not in the stamp, it is in the paperwork behind it, which is why this is a hybrid and why [[skill.fence-work|Fence Work]] is a prerequisite. A forged mark with no plausible provenance is an arrest waiting for an assayer. A forged mark attached to a real consignment, a real route and a name that a clerk half recognises is a working business. [[npc.halvo-sarn|Halvo Sarn]] backdates permits in the Magic City and records every forgery in a private index, which makes him both the single point of failure for prosecution and the safest man in the ward.',
      skillType: 'Active',
      branch: 'Proof',
      tree: TREE.craftAndMachine,
      tier: 4,
      cost: 5,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: ['Proof Marking at rank 2', 'Fence Work at rank 2', 'An impression of the genuine die, which is the hard part and the usual quest'],
      effect:
        'Produce counterfeit proof stamps, assay seals and grade marks that pass inspection. Rank sets which inspector they pass and how long the forgery holds up under trace.',
      rankTable: [
        row({ rank: '1', effect: 'Passes a gate clerk and a routine buyer; fails a guild assayer with the reference to hand' }),
        row({ rank: '2', effect: 'Passes a guild assayer on first inspection; only a rank 3 Proof Marking trace back through the batch will break it' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Outlawed in every settlement that honours a stamp, which is all thirteen. Gilded Ascent: forging a proof mark is prosecuted alongside a [[item.cut-seal|cut seal]] as fraud against every contract weighed since, and the Concord pursues it harder than violence. Sifting City: the Pale Assay handles its own forgers and no case reaches a court. Mediterranean City: possession of an unregistered die is itself the offence.',
      devNotes:
        PROPOSAL('The two ranks, the die-impression requirement and the aged-impression technique are proposed. The manifest establishes False Proof as a Craft & Machine x Tongue & Coin hybrid at tier 4, OUTLAWED, requiring Proof Marking and Fence Work.') +
        '\n\nDESIGN INTENT: the single most useful crime skill for trade-fraud plots. The rank 2 versus rank 3 tracing interaction is deliberate: forgery is beatable, but only by somebody who is themselves at the top of the legitimate trade.',
      node: N(TREE.craftAndMachine, 'Proof', 3, 4, ['skill.proof-marking', 'skill.fence-work']),
    },
  }),

  E({
    id: 'skill.charge-blending',
    type: 'skill',
    name: 'Charge Blending',
    status: 'draft',
    summary: 'Mix propellant and blasting charge to a stated grain; licensed, logged, and quietly lethal.',
    tags: ['craft-and-machine', 'powder', 'regulated'],
    fields: {
      overview:
        'Powder is a mixture, and a mixture is a grade. Charge Blending is milling, wetting, corning and sieving [[material.pan-nitre|pan nitre]] with charcoal and sulphur to a stated grain size, then proving the result on a small eprouvette before anyone puts it near a barrel or a bore. Fine grain for priming, coarse for blasting, and a whole shelf of intermediate grades that exist because somebody died finding out they mattered.\n\nEverything about it is logged. A [[item.nitre-cask|nitre cask]] is tracked by the barrel and the ounce, blasting licences are issued in the Cave Agrarian City for gallery cutting, and an unlicensed cask is a capital matter there. The reason is not squeamishness: the galleries are the food supply, and a bad charge in a duct or a terrace face takes out a season. The mills themselves are sited well outside every city that has one, and are rebuilt on average every nine years.',
      skillType: 'Active',
      branch: 'Powder',
      tree: TREE.craftAndMachine,
      tier: 4,
      cost: 4,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Heat Reading at rank 2', 'Sieve Tuning at rank 2', 'A blasting licence wherever the charge will actually be used'],
      effect:
        'Blend, corn and prove propellant and blasting charge to a stated grain. Sets the reliability of firearms, the placement precision of demolition, and whether the mill survives the shift.',
      rankTable: [
        row({ rank: '1', effect: 'Blend a serviceable coarse charge; misfire rate for Slow Match users drops by a step' }),
        row({ rank: '2', effect: 'Grade to specification, including priming fine; place a cutting charge that takes the rock and not the gallery' }),
        row({ rank: '3', effect: 'Blend for a stated effect in a stated confinement, which is the difference between a breach and a collapse' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Cave Agrarian City: blasting licences are issued by gallery and an unlicensed cask is a capital matter. Sifting City: milling is licensed, since the nitre is local and the temptation is constant. Mediterranean City: licensed by the Conduit College, logged by weight. Sky City: barred entirely, on the same reasoning that bars firearms. Tree City: the Pitchguard blends its own and licenses nobody.',
      devNotes:
        PROPOSAL('The grain grades, the confinement rule at rank 3 and the licence-by-gallery structure are proposed. The manifest establishes Charge Blending at tier 4 requiring Heat Reading and Sieve Tuning, Regulated everywhere, serving mining, demolition and firearms.') +
        '\n\nDESIGN INTENT: this is the closest the setting comes to an explosive power fantasy, so keep the paper on it heavy. The interesting play is not the bang, it is acquiring a licensed cask without a name attached to it.',
      node: N(TREE.craftAndMachine, 'Powder', 3, 2, ['skill.heat-reading', 'skill.sieve-tuning']),
    },
  }),

  E({
    id: 'skill.overhaul',
    type: 'skill',
    name: 'Overhaul',
    status: 'draft',
    summary: 'Strip and rebuild a city-scale machine: the only way to raise its output ceiling for good.',
    tags: ['craft-and-machine', 'capstone', 'machines'],
    fields: {
      overview:
        'Maintenance keeps a machine at its rating. An overhaul changes the rating. It means taking a city-scale installation out of service for weeks, stripping it to its frame, replacing what a survey condemned, and putting it back with better tolerances than it left the shop with. Nobody does it casually, because the downtime costs more than the parts and because the machine is usually the only one of its kind.\n\nThe politics are worse than the engineering. [[machine.the-mirror-ducts|The mirror ducts]] cannot be overhauled without the Hollow Karst going dark for a season. [[machine.the-strand-loom|The Strand Loom]] cannot stop, because the cable it lays is the only thing between the Sky City and the shelf. [[faction.conduit-college|The Conduit College]] sits on working designs it refuses to license precisely because releasing them would end the rent it lives on, which means the person who can perform an overhaul is frequently the person the College most wants to keep unemployed.',
      skillType: 'Ritual',
      branch: 'Rigging',
      tree: TREE.craftAndMachine,
      tier: 5,
      cost: 6,
      maxRank: 1,
      hybrid: false,
      unlockRequirements: [
        'Cable and Drum at rank 3',
        'Pressure Fitting at rank 3',
        'Lattice Work at rank 2',
        'Authority to stop the machine, which is never a skill check',
      ],
      effect:
        'Strip and rebuild an installation to raise its permanent output ceiling, unlock upgrades listed on its entry, or convert it to a process it was not built for. Takes weeks of downtime, a materials bill and somebody’s written authority.',
      rankTable: [
        row({ rank: '1', effect: 'Single rank. Unlocks the upgrade table on any machine entry, at the stated cost in time, materials and lost production' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: the Conduit College holds the right to authorise an overhaul and uses it as a rent, which is the standing grievance behind [[quest.the-casting-voice|The Casting Voice]]. Gilded Ascent: whoever holds the machine authorises it, and the counting houses hold the machines. Cave Agrarian City: an overhaul of the ducts is a Mirror Assembly vote, weighted on inherited shares.',
      devNotes:
        PROPOSAL('The single-rank structure and the authority requirement are proposed. The manifest establishes Overhaul as the tier-5 Craft & Machine capstone requiring Cable and Drum, Pressure Fitting and Lattice Work, and asks machine entries to state what an Overhaul unlocks.') +
        '\n\nDESIGN INTENT: the capstone deliberately cannot be used by a lone competent character. It needs a shutdown, a budget and a signature, so buying it turns a player into a political actor whether or not they wanted to be one.',
      node: N(TREE.craftAndMachine, 'Rigging', 4, 1, ['skill.cable-and-drum', 'skill.pressure-fitting', 'skill.lattice-work']),
    },
  }),

  /* ================================================================ */
  /* Wild & Ways                                                       */
  /* ================================================================ */

  E({
    id: 'skill.ground-read',
    type: 'skill',
    name: 'Ground Read',
    status: 'draft',
    summary: 'Read spoor, soil and disturbance: what passed, how many, and how long ago.',
    tags: ['wild-and-ways', 'entry', 'tracking'],
    fields: {
      overview:
        'The gaps between cities on this continent are days wide and the roads through them are suggestions. Ground Read is the base competence for moving in that space: spoor, bedding, dung, crushed stem, the way soil colour changes where something was dragged, and the arithmetic that turns those into a number of people and a number of hours.\n\nIt reads worked ground as well as wild. A caravan ground shows how long a party waited before it left. A cut stump shows whether the felling licence was honoured. [[npc.vetla-torvik|Vetla Torvik]] lives outside the Tree City palisade selling routes, sap and silence, and what she is actually selling is her reading of ground that the Pitchguard patrols four times a day without seeing anything.',
      skillType: 'Passive',
      branch: 'Sign',
      tree: TREE.wildAndWays,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite. Undecided: should tracking degrade across biomes, so that a Greatwood tracker is not automatically competent on the White Pans? A per-region penalty is truer and heavier to run.'),
      effect:
        'Read tracks, disturbance and camp sign to determine number, direction, load and elapsed time. Also detects deliberate track obscuring and recent digging.',
      rankTable: [
        row({ rank: '1', effect: 'Direction and rough number on fresh ground within a day of passage' }),
        row({ rank: '2', effect: 'Elapsed time to within a few hours; identify load, injury and whether anyone was carried or dragged' }),
        row({ rank: '3', effect: 'Follow cold sign up to a week old on hard ground, and spot obscured or faked trails as fakes' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere. The Greatwood is the practical exception: reading a trail off the licensed roads is not itself an offence, but a stranger doing it near [[deposit.standing-fifty|the Standing Fifty]] is assumed to be scouting a felling and treated accordingly.',
      devNotes:
        PROPOSAL('The three ranks and the cold-sign window are proposed. The manifest establishes Ground Read as a tier-1 root feeding Spore Lore, Marsh Footing, Yoke and Tether and Quiet Ground.') +
        '\n\nDESIGN INTENT: keep this useful inside cities too. Reading a warehouse floor or a caravan ground is the same skill, and it stops the wilderness tree from being dead weight in urban chapters.',
      node: N(TREE.wildAndWays, 'Sign', 0, 0),
    },
  }),

  E({
    id: 'skill.weather-eye',
    type: 'skill',
    name: 'Weather Eye',
    status: 'draft',
    summary: 'Call the next twelve hours from cloud, pressure and how the animals are behaving.',
    tags: ['wild-and-ways', 'entry', 'travel'],
    fields: {
      overview:
        'There is no forecasting service, only [[item.orrery-tables|the Orrery tables]] for tide and season and a great many people who can look at a sky. Weather Eye is the trained version of looking: cloud sequence, the feel of pressure in the ears and old fractures, wind backing or veering, and the behaviour of animals that have more to lose than you do.\n\nIt is worth money in four places. On [[region.meridian-gulf|the Meridian Gulf]], because a badly called sailing is a lost hull. On [[region.anvil-shelf|the Anvil Shelf]], because the updraught the Sky City rides has moods and the mast crews need to know them. In [[region.the-drown|the Drown]], because rain upriver is a sluice decision three days later. And on any highland carry, where [[mechanic.the-high-carry|the High Carry]] voids a contract outright when weather shuts the pass.',
      skillType: 'Passive',
      branch: 'Weather',
      tree: TREE.wildAndWays,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['No prerequisite', 'Available from character creation'],
      effect:
        'Predict weather, wind and visibility over the next half day and judge whether a route, a sailing or a working window is safe. Sets whether the party is caught out or already sheltered.',
      rankTable: [
        row({ rank: '1', effect: 'Call the next six hours in familiar country; recognise a front that will close a pass' }),
        row({ rank: '2', effect: 'Call twelve hours anywhere you have spent a season; predict fog on the Mistfall approach' }),
        row({ rank: '3', effect: 'Read local anomalies: shelf updraught behaviour, delta wind against tide, and the still hours before a Scar disturbance' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere, and quietly commercial in two places. Mediterranean City harbour slots are traded against the Orrery tables, and a private caller who beats the tables is competing with an institution. Sky City mast crews are required to log a weather call before every lattice shift, and the log is admissible after an accident.',
      devNotes:
        PROPOSAL('The three ranks and the rank 3 anomaly reading are proposed. The manifest establishes Weather Eye as a tier-1 root feeding Cold Camp, The Far Walk and the Storm Tapping hybrid.') +
        '\n\nDESIGN INTENT: route entries should state a Weather Eye difficulty. Rank 3 is deliberately the bridge into the Arcana tree via Storm Tapping, because the updraught is weather before it is magic.',
      node: N(TREE.wildAndWays, 'Weather', 0, 3),
    },
  }),

  E({
    id: 'skill.spore-lore',
    type: 'skill',
    name: 'Spore Lore',
    status: 'draft',
    summary: 'Identify, cultivate and survive fungi, including the ones that fruit inside a lung.',
    tags: ['wild-and-ways', 'hollow-karst', 'biology'],
    fields: {
      overview:
        'The Hollow Karst feeds itself on fungus, and fungus is the setting’s main vector for unusual biology. [[food.gallery-cap|Gallery cap]] is the calorie floor of the cave city, grown on dung and milling chaff, flushing every three days, and the spore load it throws gives gallery workers a lung rot by forty. That is the bargain: food without light, paid for in decades.\n\nSpore Lore covers identification, cultivation, substrate, sterile technique, and the clinical half nobody teaches openly. [[npc.bedel-lehun|Bedel Lehun]] grows a violet grain-fungus that is not on the city’s list, yields double in half the light, and has half his terrace sleeping badly and unable to stop. He knows. He has not stopped, because the alternative is losing his terrace’s light allocation entirely. A player with this skill can identify what he is growing in an afternoon, which is the start of the problem rather than the end of it.',
      skillType: 'Active',
      branch: 'Growth',
      tree: TREE.wildAndWays,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Ground Read rank 1 is the gate. Undecided: is a starter culture a hard requirement for cultivation? If it is, the Hollow Karst becomes the only place the skill can be raised past rank 1, which is a large decision.'),
      effect:
        'Identify, cultivate and process fungi; recognise fungal infection in a person or a beast; manage substrate, flush timing and spore exposure for a growing gallery.',
      rankTable: [
        row({ rank: '1', effect: 'Identify common species and their effects; avoid poisoning yourself or a party' }),
        row({ rank: '2', effect: 'Cultivate to yield on prepared substrate; recognise fungal infection in a living host early' }),
        row({ rank: '3', effect: 'Breed or stabilise a new strain, which is exactly the unlicensed act the cave city prosecutes' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Cave Agrarian City: cultivation is licensed by strain, and an unlisted strain is a tithe offence that costs a gallery its mirror-hours. Export of [[material.cudmother|cudmother]] starter is barred outright and the barrier is not working. Mediterranean City: the lazaret treats fungal cases and reports them, which is why [[npc.anthimos-vellani|Anthimos Vellani]] keeps a private ward.',
      devNotes:
        PROPOSAL('The strain licensing and the rank 3 breeding gate are proposed. The manifest establishes Spore Lore at tier 2 off Ground Read as the Hollow Karst agriculture skill and the entry point for the world’s unusual biology.') +
        '\n\nDESIGN INTENT: food and disease entries should cite this skill instead of inventing a herbalism tree. Rank 3 is a genuine moral fork: a better strain feeds a gallery and the cost surfaces years later in somebody else’s lungs.',
      node: N(TREE.wildAndWays, 'Growth', 1, 0, ['skill.ground-read']),
    },
  }),

  E({
    id: 'skill.marsh-footing',
    type: 'skill',
    name: 'Marsh Footing',
    status: 'draft',
    summary: 'Pole, punt and read mat from open water where a wrong step is final.',
    tags: ['wild-and-ways', 'the-drown', 'traversal'],
    fields: {
      overview:
        'In [[region.the-drown|the Drown]] the distinction between land and water is a matter of opinion and the opinion changes twice a day. [[creature.raftbloom|Raftbloom]] mats will hold a house or a boot depending on age and season. Channels move. Marsh Footing is punting, poling, mat reading, and the specific discipline of testing before weighting, which is the habit that separates delta people from visitors.\n\nIt is also navigation. [[npc.gwill-ossekind|Gwill Ossekind]] cut the notched staves that mark the low-water route, walked out to re-cut them and did not come back, and a third of the staves are now wrong or gone. Anyone with Marsh Footing can work a channel without them, slowly. Anyone without it and without the staves is guessing, and the delta does not correct a guess, it closes over it.',
      skillType: 'Active',
      branch: 'Footing',
      tree: TREE.wildAndWays,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Ground Read rank 1, plus a pole and a shallow craft. Undecided: how far does the skill carry beyond the Drown? The Mistfall Coast and the Meridian marshes are different water and nobody has ruled on whether it transfers.'),
      effect:
        'Move safely through marsh, mat and shifting channel: punt, pole, test footing and find a workable route without markers. Underpins any work under [[mechanic.the-remoor|the Re-Moor]].',
      rankTable: [
        row({ rank: '1', effect: 'Cross known mat and marked channel at normal speed; avoid the obvious drownings' }),
        row({ rank: '2', effect: 'Find a route without markers; judge whether a mat will carry a load before you commit it' }),
        row({ rank: '3', effect: 'Work the delta at low water and at night, and cut new channel marks others can follow' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful. What is contested is the routes: channel marks are property in the Drown, and cutting your own staves through a reach [[faction.iron-sluice-company|the Iron Sluice Company]] considers its approach is treated as interference with the toll, not as navigation.',
      devNotes:
        PROPOSAL('The rank 3 mark-cutting and the property status of channel marks are proposed. The manifest establishes Marsh Footing at tier 2 off Ground Read as the Drown traversal skill, assumed for anyone working the Re-Moor.') +
        '\n\nDESIGN INTENT: rank 3 makes a player a rival to the Iron Sluice Company rather than a customer of it. That is the cheapest way into delta politics and it does not need a faction rank first.',
      node: N(TREE.wildAndWays, 'Footing', 1, 1, ['skill.ground-read']),
    },
  }),

  E({
    id: 'skill.yoke-and-tether',
    type: 'skill',
    name: 'Yoke and Tether',
    status: 'draft',
    summary: 'Work draught and pack animals, including the ones that bite when they are frightened.',
    tags: ['wild-and-ways', 'beasts', 'transport'],
    fields: {
      overview:
        'Nothing moves overland without animals. Karst pack-beasts carry the [[material.cudmother|cudmother]] cultures that turn rock dust into soil, steppe herds make [[food.steppe-sour|steppe sour]] by the skinful, and the caravan out of Orath crosses the Cinder Waste margin on whatever [[npc.kavel-uur|Kavel Uur]] can keep alive. Yoke and Tether is harness, load, hoof, feed, and the reading of temperament that stops a frightened animal from killing the person leading it.\n\nThe local fauna makes it stranger than husbandry usually is. A [[creature.yokeback|yokeback]] carries a shrunken parasitic mate fused to its flank, and separating the pair triggers a days-long frenzy that the Sunken Ring buys by the head. [[npc.sukhet-daral|Sukhet Daral]] keeps the under-stables and supplies whatever the crowd has not seen before, which currently includes two undocumented Drown animals that have bred under the stands and are getting out of the pens he built for the adults.',
      skillType: 'Active',
      branch: 'Beasts',
      tree: TREE.wildAndWays,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Ground Read rank 1 is the gate. Undecided: does the skill generalise across species, or should each creature entry set its own difficulty? The current draft says both and cannot keep saying both.'),
      effect:
        'Handle, harness, load, feed and calm draught and pack animals, including semi-domesticated and parasitised species. Sets caravan speed, load and losses, and whether a spooked animal can be brought back.',
      rankTable: [
        row({ rank: '1', effect: 'Harness, load and lead familiar animals; recognise sickness and lameness before it strands you' }),
        row({ rank: '2', effect: 'Calm a panicking animal; handle unfamiliar species after a day with them' }),
        row({ rank: '3', effect: 'Work animals in conditions they refuse, which includes leading them past a predator scent and onto a raft' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere. Two local wrinkles: the Cave Agrarian City treats a karst pack-beast’s gut culture as city property regardless of who owns the animal, and the Arena City’s under-stables are licensed to the Chamber, so handling a beast on the card without a steward’s mark is interference with a bout.',
      devNotes:
        PROPOSAL('The rank 3 refusal-condition rule and the karst gut-culture wrinkle are proposed. The manifest establishes Yoke and Tether at tier 2 off Ground Read, and asks creature entries to cite it rather than invent a separate handling skill.') +
        '\n\nDESIGN INTENT: one handling skill for the whole bestiary. If a creature needs special handling, express it as a difficulty on this node, not as a new node.',
      node: N(TREE.wildAndWays, 'Beasts', 1, 2, ['skill.ground-read']),
    },
  }),

  E({
    id: 'skill.quiet-ground',
    type: 'skill',
    name: 'Quiet Ground',
    status: 'draft',
    summary: 'Move unheard over scree, leaf litter and raft slats, loaded and in the dark.',
    tags: ['wild-and-ways', 'stealth', 'infiltration'],
    fields: {
      overview:
        'There is no stealth tree. There is this node, and everything the setting does with infiltration points here. Quiet Ground is foot placement, breath control, load discipline so that nothing on you knocks against anything else, and the reading of a surface for what it will say when you stand on it: scree talks, leaf litter talks, a raft slat with a loose peg talks loudest of all.\n\nIt works in cities as well as in country. The [[district.gilded-ascent-under-stair|Under Stair]] at night is loose stone and standing water; the [[district.arena-city-the-under-stands|under-stands]] are timber over sand; the Sky City lattice is a resonant structure that transmits a footfall thirty metres. [[npc.vetla-torvik|Vetla Torvik]] knows a maintenance run of rope bridges that reaches the Bastion Bole’s fourth gallery without passing a gate, and the run is only usable by somebody who can cross it without being heard from below.',
      skillType: 'Toggle',
      branch: 'Sign',
      tree: TREE.wildAndWays,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Ground Read rank 2 is the gate. Undecided: what counts as a load that rattles? Without a stated rule this is the vaguest gate in the five trees and every heist will be argued at the table.'),
      effect:
        'Move without being heard over noisy surfaces, at speed and under load. Sets detection distance for guards, animals and [[creature.sentinel-tick|sentinel ticks]], and covers approaching a person from behind without warning them.',
      rankTable: [
        row({ rank: '1', effect: 'Move quietly at half speed on any surface; a normal watch does not hear you at ten paces' }),
        row({ rank: '2', effect: 'Full speed, and quiet under a carried load; you can cross a resonant structure without transmitting the step' }),
        row({ rank: '3', effect: 'Approach an alert, listening guard; only a live alarm such as a sentinel tick reliably catches you' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful as a technique and evidential as a fact. In the Tree City and the Sky City, demonstrated Quiet Ground is taken by a court as evidence of intent when it is proved alongside an unauthorised entry, which is a legal fiction everybody involved understands perfectly.',
      devNotes:
        PROPOSAL('The three ranks, the resonant-structure rule and the sentinel tick exception are proposed. The manifest establishes Quiet Ground at tier 3 off Ground Read and directs all infiltration content here.') +
        '\n\nDESIGN INTENT: because there is no stealth tree, this node must carry every heist. Give it a hard counter that is biological rather than magical: the sentinel tick is the reason a Greatwood infiltration is not simply a dice roll.',
      node: N(TREE.wildAndWays, 'Sign', 2, 2, ['skill.ground-read']),
    },
  }),

  E({
    id: 'skill.cold-camp',
    type: 'skill',
    name: 'Cold Camp',
    status: 'draft',
    summary: 'Make a night in the far north survivable: shelter, fire discipline, frostbite triage.',
    tags: ['wild-and-ways', 'boreal-crown', 'survival'],
    fields: {
      overview:
        'North of the treeline in [[region.boreal-crown|the Boreal Crown]] the problem is not predators, it is the eleven hours between dusk and any prospect of warmth. Cold Camp is snow shelter, insulation from the ground, fire discipline with wet fuel, wet-clothing management, and the triage of frostbite, which mostly means deciding early which fingers are already gone.\n\nThe food half is provisioning. [[food.cache-fat|Cache fat]] is rendered fat and crowberry buried in pits to keep for five winters, and it is the only reason long travel up there works at all. Robbing a cache is treated as attempted murder in the taiga, which is not sentiment: the person who buried it planned a route around it and will die on that route without it.',
      skillType: 'Active',
      branch: 'Survival',
      tree: TREE.wildAndWays,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Weather Eye at rank 2', 'Winter kit; the skill mitigates cold, it does not replace clothing'],
      effect:
        'Survive and keep a party functional in extreme cold: build shelter, manage fuel and moisture, treat cold injury, and site and rob caches. Removes the standing exposure loss on boreal and high-karst travel.',
      rankTable: [
        row({ rank: '1', effect: 'Keep yourself alive through a bad night; recognise the first stage of cold injury in others' }),
        row({ rank: '2', effect: 'Keep a party of six alive; treat frostbite so the loss is a digit rather than a hand' }),
        row({ rank: '3', effect: 'Camp cold without fire and remain functional, which is what makes a boreal approach possible at all' }),
      ],
      legality: 'Lawful',
      legalNotes: TBD('Do the Boreal Crown’s cache customs amount to an enforceable law, and if so who enforces them, given that no settlement in the brief sits north of the treeline?'),
      devNotes:
        PROPOSAL('The three ranks, the fireless camp at rank 3 and the cache-robbing framing are proposed. The manifest establishes Cold Camp at tier 3 off Weather Eye as the Boreal Crown survival gate.') +
        '\n\nDESIGN INTENT: site entries in the Boreal Crown should state whether Cold Camp alone is sufficient or whether the party needs The Far Walk as well. The cache economy is the interesting hook: a buried pit is somebody’s plan, and taking it is a killing at one remove.',
      node: N(TREE.wildAndWays, 'Survival', 2, 3, ['skill.weather-eye']),
    },
  }),

  E({
    id: 'skill.venom-work',
    type: 'skill',
    name: 'Venom Work',
    status: 'draft',
    summary: 'Milk, dose and counter venoms; the antivenom and the murder share one bench.',
    tags: ['wild-and-ways', 'arcana-and-risk', 'hybrid', 'regulated'],
    fields: {
      overview:
        'The bridge between the bestiary and the poison trade, and it is one bench with two customers. Milking a [[creature.mistfall-bell|mistfall bell]] for the paralytic base of [[spell.stillwater-draught|stillwater draught]] is the same handling, the same dilution discipline and the same shelf-life problem as preparing the dose that stops a heart in a locked room. The difference is the label.\n\nEvery city that licenses surgeons licenses this and every city that licenses it has a black market in it. [[material.quietmilk|Quietmilk]] is the world’s only dependable anaesthetic and the world’s worst habit, milked live and stabilised in spirit within the hour by milkers who are dosed to keep them working. [[npc.sukhet-daral|Sukhet Daral]] handles frenzy draughts for the Ring. Somebody in every city handles the other kind, and they are usually the same trade with a different set of receipts.',
      skillType: 'Active',
      branch: 'Growth',
      tree: TREE.wildAndWays,
      tier: 3,
      cost: 4,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: TBD('Spore Lore rank 2 and Reagent Work rank 1. Undecided: is a licence needed to learn this or only to sell what it makes? Every city answers differently and none of the answers has been written down.'),
      effect:
        'Extract, dilute, stabilise and administer venoms and their counters. Produces antivenoms, surgical paralytics and toxins, and lets you identify a poisoning from its presentation.',
      rankTable: [
        row({ rank: '1', effect: 'Milk and stabilise safely; prepare antivenom for species you have worked; identify a common poisoning' }),
        row({ rank: '2', effect: 'Dose to a stated effect and duration, including sub-lethal, and defeat a routine post-mortem assay' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: licensed to the Conduit College’s surgeons, with every quietmilk purchase logged against a patient. Arena City: the Ring licenses frenzy draughts and does not license anything else. Cave Agrarian City: milking is a recognised trade and the milkers’ own dosing is nobody’s business. Gilded Ascent: possession of a stated toxin without a surgeon’s book is prosecuted as intent.',
      devNotes:
        PROPOSAL('The two ranks and the post-mortem assay interaction are proposed. The manifest establishes Venom Work as a Wild & Ways x Arcana & Risk hybrid at tier 3 requiring Spore Lore and Reagent Work, Regulated, bridging the bestiary and the poison trade.') +
        '\n\nDESIGN INTENT: keep antivenom and toxin on the same node forever. The setting has no clean pharmacology, and a party medic who is also the party poisoner is a much better character than two separate specialists.',
      node: N(TREE.wildAndWays, 'Growth', 2, 0, ['skill.spore-lore', 'skill.reagent-work']),
    },
  }),

  E({
    id: 'skill.wire-and-snare',
    type: 'skill',
    name: 'Wire and Snare',
    status: 'draft',
    summary: 'Set lines and man-traps on posted ground, for game or for people; the charge is the same.',
    tags: ['wild-and-ways', 'outlawed', 'dark'],
    fields: {
      overview:
        'A snare is a length of wire, a bent sapling and an understanding of where a body will put its foot. Wire and Snare is the trade of setting them: run lines, deadfalls, spring spikes, pit sets, and the placement judgement that makes a trap catch the thing it was set for rather than the next person along the path.\n\nThe law refuses to distinguish between the two uses, and it is right not to. The Greatwood’s poaching lines and the slaver ambushes on the Cinder Waste margin are the same wire, the same anchor and the same knot, set by people who learned from the same person. Write the second use with weight. A crew taken off a road in a snare set is not a combat encounter, it is somebody arriving in a labour registry three weeks later with a bond against their name and no idea who signed it.',
      skillType: 'Active',
      branch: 'Beasts',
      tree: TREE.wildAndWays,
      tier: 4,
      cost: 4,
      maxRank: 2,
      hybrid: false,
      unlockRequirements: ['Quiet Ground at rank 2', 'Yoke and Tether at rank 2', 'Wire, and the willingness to own what the wire does'],
      effect:
        'Set, conceal and clear snares, deadfalls and man-traps, and detect sets laid by others. Covers non-lethal capture sets as well as killing ones, and clearing a posted line safely.',
      rankTable: [
        row({ rank: '1', effect: 'Set effective game lines and simple man-traps; spot another set before you walk into it' }),
        row({ rank: '2', effect: 'Set to take a person alive and unharmed enough to be walked away, which is what makes the skill valuable to the wrong people' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Tree City: setting a line on posted Greatwood ground is a felling-law offence and the Pitchguard hangs for it. Gilded Ascent and Mediterranean City: man-traps are outlawed outright and possession of a set line is prosecuted as attempted murder. Arena City and Sifting City: outlawed in text, unprosecuted in fact, because the people taken by them arrive in registries those cities operate. Extradition is rarely granted, which is the whole problem.',
      devNotes:
        PROPOSAL('The rank 2 live-capture set and the unprosecuted-in-fact framing for the registry cities are proposed. The manifest establishes Wire and Snare at tier 4, OUTLAWED, requiring Quiet Ground and Yoke and Tether, and asks that the trafficking use be handled with weight.') +
        '\n\nDESIGN INTENT: never write a snare crew as bandits. Write them as contractors with a delivery address. The horror is the paperwork at the far end, and a party that follows the wire should end up at a registry desk, not a camp.',
      node: N(TREE.wildAndWays, 'Beasts', 3, 2, ['skill.quiet-ground', 'skill.yoke-and-tether']),
    },
  }),

  E({
    id: 'skill.the-far-walk',
    type: 'skill',
    name: 'The Far Walk',
    status: 'draft',
    summary: 'Cross regions on foot: cache discipline, water planning, and knowing when to turn back.',
    tags: ['wild-and-ways', 'travel', 'logistics'],
    fields: {
      overview:
        'The cities are days apart and most of what lies between them is not on anybody’s map. The Far Walk is the discipline of crossing that on foot: consumption arithmetic, cache siting, water planning against a stated carry, pace management, and the single hardest judgement in the skill, which is the turn-back point.\n\nWater is the whole subject in the south. A [[food.dew-melon|dew melon]] carries roughly two days of water and passes as currency across the Cinder Waste for exactly that reason. [[npc.sahat-belek|Sahat Belek]] works the far white alone, eight days out, and came back with a story about crated [[material.ward-chalk|ward chalk]] hundreds of kilometres off any sanctioned route. He is alive because he plans for nine days and walks for eight.',
      skillType: 'Active',
      branch: 'Survival',
      tree: TREE.wildAndWays,
      tier: 4,
      cost: 4,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Cold Camp rank 1 and Weather Eye rank 2. Undecided: should the recorded crossing be a hard gate or only a discount? A hard gate means no character begins play able to cross a region alone.'),
      effect:
        'Plan and execute long overland crossings: consumption, caches, water, pace and route choice. Sets travel time, attrition and whether the party arrives able to act. Route entries state a difficulty against it.',
      rankTable: [
        row({ rank: '1', effect: 'Cross a mapped region without attrition; site and find caches reliably' }),
        row({ rank: '2', effect: 'Cross unmapped country; stretch a stated water carry by a third through pace and timing' }),
        row({ rank: '3', effect: 'Bring a party through a crossing that should have failed, at a stated cost that you choose and the party pays' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful. Two places attach paperwork: Orath posts water, powder and shot daily on [[mechanic.the-ration-board|the Ration Board]], and overdrawing means owing the muster labour you cannot refuse. Oruvai prices porterage by weight and altitude under [[mechanic.the-high-carry|the High Carry]], and weather that shuts the pass voids the contract without compensation.',
      devNotes:
        PROPOSAL('The three ranks, the water-stretch figure and the recorded-crossing gate are proposed. The manifest establishes The Far Walk at tier 4 requiring Cold Camp and Weather Eye as the overland travel skill, with route entries setting a difficulty against it.') +
        '\n\nDESIGN INTENT: the gaps between cities are canon, so travel needs a skill that makes the gaps playable rather than a loading screen. Rank 3 should always cost something named, chosen at the table.',
      node: N(TREE.wildAndWays, 'Survival', 3, 3, ['skill.cold-camp', 'skill.weather-eye']),
    },
  }),

  E({
    id: 'skill.plague-reading',
    type: 'skill',
    name: 'Plague Reading',
    status: 'draft',
    summary: 'Spot contagion early in beasts or people and make the quarantine call somebody will hate you for.',
    tags: ['wild-and-ways', 'capstone', 'disease'],
    fields: {
      overview:
        'The capstone of the tree and the least heroic skill in the game. Plague Reading is epidemiology done without a microscope: presentation, incubation arithmetic, contact tracing by memory and manifest, and the call. Nobody thanks a person who makes the call. The reward for being right early is that nothing visible happens and somebody loses a harvest.\n\n[[npc.anthimos-vellani|Anthimos Vellani]] has three patients carrying a marsh parasite that should not exist west of the Drown and has not reported it, because reporting means quarantine and quarantine rots the olive harvest, and he knows exactly which ship it came in on. That is the shape of every use of this skill. The instrument at the far end is [[spell.lime-seal|the lime seal]], burnt into a doorframe, which nothing living crosses until a warden breaks it, and which costs the people inside their liberty and frequently their lives.',
      skillType: 'Active',
      branch: 'Growth',
      tree: TREE.wildAndWays,
      tier: 5,
      cost: 6,
      maxRank: 1,
      hybrid: false,
      unlockRequirements: [
        'Spore Lore at rank 3',
        'Venom Work at rank 2',
        'The Far Walk at rank 2',
        'A recognised standing, because the call is worthless if nobody acts on it',
      ],
      effect:
        'Identify contagion in people or animals before it is obvious, trace it to a source and a vector, and specify a quarantine that will actually work. States both what the reading buys and what the cordon costs.',
      rankTable: [
        row({ rank: '1', effect: 'Single rank. Detection days before presentation, a traced vector, and a quarantine specification a city can enact or refuse' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: the lazaret holds the quarantine power and a private reading has no legal force, which is why an unreported case is a licensing offence rather than a crime. Black Weir: the Weirmasters will close the gates on a reading, and the Drown’s raft settlements eat what the river brings and nothing else, so the cordon that saves upriver is a slow sentence downstream. Cave Agrarian City: a reading against a gallery costs it mirror-hours, and the reeve decides.',
      devNotes:
        PROPOSAL('The single-rank structure and the standing requirement are proposed. The manifest establishes Plague Reading as the tier-5 Wild & Ways capstone requiring Spore Lore, Venom Work and The Far Walk, and asks disease entries to state what a reading buys and what the quarantine costs.') +
        '\n\nDESIGN INTENT: this capstone is a political weapon, not a cure. [[quest.clean-bills|Clean Bills]] is the model: the correct medical answer and the correct human answer point in opposite directions and the player has to sign one of them.',
      node: N(TREE.wildAndWays, 'Growth', 4, 1, ['skill.spore-lore', 'skill.venom-work', 'skill.the-far-walk']),
    },
  }),

  /* ================================================================ */
  /* Tongue & Coin                                                     */
  /* ================================================================ */

  E({
    id: 'skill.market-ear',
    type: 'skill',
    name: 'Market Ear',
    status: 'draft',
    summary: 'Hear what is short, what is glutted, and who is lying about their stock.',
    tags: ['tongue-and-coin', 'entry', 'trade'],
    fields: {
      overview:
        'Prices on this continent are not published, they are overheard. Market Ear is the trained habit of listening to a wharf, a hoist landing or a stone market and extracting the real position from what people are complaining about: which shed is holding stock it says it has sold, which factor is quoting a price he cannot supply, and what the loaf is going for this morning.\n\nThe [[food.stair-loaf|stair loaf]] is the standing example. It is priced afresh each morning at every hoist landing on [[landmark.the-counting-stair|the Counting Stair]], the bakers’ guild fixes it, the counting houses read it as the Gilded Ascent’s index of unrest, and faking it is a crime. Anyone with Market Ear reads the same signal for free, which is precisely why the houses would rather the signal were harder to hear.',
      skillType: 'Passive',
      branch: 'Market',
      tree: TREE.tongueAndCoin,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['No prerequisite', 'Available from character creation'],
      effect:
        'Determine real local supply, demand and price for any traded good by listening rather than asking. Detects hoarding, false scarcity and a quoted price that nobody is actually paying.',
      rankTable: [
        row({ rank: '1', effect: 'Learn the true local price of a good in an hour in any market you can walk through' }),
        row({ rank: '2', effect: 'Spot hoarding and manufactured scarcity; identify who is holding stock they claim to have sold' }),
        row({ rank: '3', effect: 'Read a market three days ahead, which is worth more than any single trade you will make with it' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful. The Gilded Ascent’s counting houses treat systematic use of it as competition rather than crime, and respond commercially: a factor who reads the loaf too well tends to find that the loaf stops being priced where they can hear it.',
      devNotes:
        PROPOSAL('The three-day forecast at rank 3 and the loaf-as-index framing are proposed. The manifest establishes Market Ear as a tier-1 root feeding Trade Cant and The Cold Read.') +
        '\n\nDESIGN INTENT: make this the cheapest way into the economy layer. A player with rank 1 should be able to arbitrage between two districts by lunchtime, which teaches the trade system without a tutorial.',
      node: N(TREE.tongueAndCoin, 'Market', 0, 0),
    },
  }),

  E({
    id: 'skill.plain-letters',
    type: 'skill',
    name: 'Plain Letters',
    status: 'draft',
    summary: 'Read and write contracts, manifests and writs well enough not to be robbed by one.',
    tags: ['tongue-and-coin', 'entry', 'literacy'],
    fields: {
      overview:
        'Literacy is not assumed in this world. Most people cannot read a manifest, and the entire indenture economy depends on that fact: an [[item.indenture-bond|indenture bond]] states a term, a debt and the ports where it can be enforced, and the person it owns usually cannot read any of the three. Plain Letters is functional literacy in the commercial hands: contract text, manifest columns, writ forms, and the ability to notice that a clause has been added.\n\nIt does not make you a clerk. It makes you unrobbable by paper, which in the Gilded Ascent is most of the robbery there is. [[npc.ilke-samarost|Ilke Samarost]] was a Salt Office ledger-clerk who could read better than her employers were comfortable with, and she was found at the foot of the Stair fourteen months ago, and it was ruled a fall.',
      skillType: 'Passive',
      branch: 'Letters',
      tree: TREE.tongueAndCoin,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite. Undecided: what is the literacy rate, city by city? Every bond, writ and manifest plot in the seed depends on a number nobody has set, and the indenture economy depends on it most.'),
      effect:
        'Read and write contracts, manifests, writs and correspondence. Detects added clauses, altered figures and the standard traps in a bond or a passage agreement.',
      rankTable: [
        row({ rank: '1', effect: 'Read and write plainly; understand a contract you are asked to sign' }),
        row({ rank: '2', effect: 'Spot an added clause or an altered figure; draft a simple agreement that holds up' }),
        row({ rank: '3', effect: 'Read guild shorthand, manifest cant and the abbreviations that clerks use to say what they will not write out' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere and quietly discouraged in two places. The Arena City does not teach its bonded fighters to read and does not stop anyone else from doing so. The Tree City’s tribute villages have no schooling at all, which is a levy policy rather than an accident.',
      devNotes:
        PROPOSAL('The rank 3 shorthand reading and the two discouragement cases are proposed. The manifest establishes Plain Letters as a tier-1 root, notes that literacy is not assumed, and asks NPC entries to state whether a character has it.') +
        '\n\nDESIGN INTENT: making literacy a purchased skill is the cheapest way to make the paper-based dark themes bite. If a player cannot read the bond, the bond is a trap. If they can, the trap becomes a decision.',
      node: N(TREE.tongueAndCoin, 'Letters', 0, 3),
    },
  }),

  E({
    id: 'skill.trade-cant',
    type: 'skill',
    name: 'Trade Cant',
    status: 'draft',
    summary: 'The road and dock pidgin: haggle, warn and insult in it the length of the continent.',
    tags: ['tongue-and-coin', 'language', 'travel'],
    fields: {
      overview:
        'Thirteen settlements, a dozen home tongues and one working pidgin that grew on the wharves and the caravan grounds. Trade Cant has perhaps nine hundred words, a brutal grammar and an enormous vocabulary for goods, weights, weather and threat. It is nobody’s first language and everybody’s second.\n\nIt is also a register. Speaking Cant in a counting house marks you as a road person; speaking it on the [[district.gilded-ascent-confluence-wharves|confluence wharves]] marks you as safe. [[faction.bonewax-post|The Bonewax Post]] runs its couriers on it because a sealed letter is worthless if the courier cannot ask the way. City language lists should name Cant as the common fallback rather than inventing a per-city language skill.',
      skillType: 'Passive',
      branch: 'Market',
      tree: TREE.tongueAndCoin,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Market Ear rank 1, plus time on a road or a wharf. Undecided: how many home tongues does the continent actually have, and does any city refuse Cant outright rather than merely resent it?'),
      effect:
        'Communicate anywhere on the continent for trade, travel and warning. Removes language barriers for commercial and practical exchange, and lets you place a speaker by their Cant.',
      rankTable: [
        row({ rank: '1', effect: 'Buy, sell, ask directions and understand a warning anywhere; no penalty haggling with strangers' }),
        row({ rank: '2', effect: 'Place a speaker’s origin and trade by their Cant; catch a lie told in a second language' }),
        row({ rank: '3', effect: 'Speak the closed registers: raft-clan Cant, pan-crew Cant and the courier forms outsiders are not meant to follow' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere. The Mediterranean City is the only place it carries a social cost: the Orrery precinct conducts business in its own tongue on purpose, and answering a magistrate in Cant is understood as a refusal rather than a limitation.',
      devNotes:
        PROPOSAL('The nine-hundred-word figure, the closed registers at rank 3 and the Mediterranean social cost are proposed. The manifest establishes Trade Cant at tier 2 off Market Ear and directs authors to use it instead of per-city language skills.') +
        '\n\nDESIGN INTENT: one language skill for the whole map. City entries can list their own tongue for flavour and name Cant as the fallback, which keeps the trees from growing a linguistics branch nobody will buy.',
      node: N(TREE.tongueAndCoin, 'Market', 1, 0, ['skill.market-ear']),
    },
  }),

  E({
    id: 'skill.the-cold-read',
    type: 'skill',
    name: 'The Cold Read',
    status: 'draft',
    summary: 'Read stress, tells and rehearsed answers without tipping that you are reading them.',
    tags: ['tongue-and-coin', 'social', 'investigation'],
    fields: {
      overview:
        'The social check the investigations run on. The Cold Read is the observation of a person under mild pressure: breathing, hands, the pause before a rehearsed answer, the difference between someone recalling a thing and someone reciting it. The hard half is doing it without the subject noticing, because a person who knows they are being read starts performing and the reading is worthless.\n\nIt is not mind reading and it does not produce truth. It produces the shape of a lie: which part of a story has been prepared, which part the speaker is improvising, and which question makes them reach for their pocket. [[npc.doret-halvane|Doret Halvane]] can find anyone in the Gilded Ascent, and what she actually does is ask twelve harmless questions and watch which one lands.',
      skillType: 'Active',
      branch: 'Reading people',
      tree: TREE.tongueAndCoin,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Market Ear at rank 1', 'A conversation; the skill does nothing on a page'],
      effect:
        'Detect rehearsal, stress and concealment in a live conversation without alerting the subject. Identifies which parts of an account are prepared and which are improvised.',
      rankTable: [
        row({ rank: '1', effect: 'Tell a rehearsed answer from a recalled one; know when a subject is frightened rather than hostile' }),
        row({ rank: '2', effect: 'Isolate the specific topic being concealed; read a subject without them registering that you did' }),
        row({ rank: '3', effect: 'Read a trained liar, and read a room rather than a person, which is how you find the one person present who already knows' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful. It has no standing as evidence anywhere, which is the point: a Cold Read tells a party where to dig and proves nothing to a magistrate. In the Mediterranean City only [[spell.the-witnessing|the Witnessing]] fixes testimony, and it costs the witness the memory permanently.',
      devNotes:
        PROPOSAL('The rank 3 room reading and the no-evidential-standing rule are proposed. The manifest establishes The Cold Read at tier 2 off Market Ear as the social-check node for investigations, feeding Fence Work and Crowd Turning.') +
        '\n\nDESIGN INTENT: deliberately gives direction and never proof. Investigation quests should be winnable with it and never solvable by it, so the party still has to find the ledger, the staves or the strand samples.',
      node: N(TREE.tongueAndCoin, 'Reading people', 1, 1, ['skill.market-ear']),
    },
  }),

  E({
    id: 'skill.ledger-hand',
    type: 'skill',
    name: 'Ledger Hand',
    status: 'draft',
    summary: 'Keep double-entry books, and spot the shape of a cooked one at a glance.',
    tags: ['tongue-and-coin', 'gilded-ascent', 'finance'],
    fields: {
      overview:
        'Double entry is the technology the Gilded Ascent actually runs on, more than the hoists and more than the river. Ledger Hand is keeping books that balance, and the far more valuable half, which is reading somebody else’s and seeing where the balance was achieved rather than earned. Cooked books have a shape: adjustments clustered near period ends, round numbers where round numbers should not occur, and a suspense account that never quite clears.\n\nUnder [[mechanic.standing-ledger|the Standing Ledger]] a player borrows against collateral, climbs terraces and defaults into indenture, and this is the skill that lets them see the trap before they sign. It is also the skill that finds the hole: [[npc.wessel-ondriek|Wessel Ondriek]] has lent four fifths of the Stair’s reserve against Sky City counterweight leases, and the reserve is a fiction that one honest audit ends.',
      skillType: 'Active',
      branch: 'Letters',
      tree: TREE.tongueAndCoin,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Plain Letters at rank 2', 'Access to the books, which is the real difficulty and is never a skill check'],
      effect:
        'Keep and audit double-entry accounts. Detects falsified books, traces a transaction through intermediaries, and evaluates a credit or bond offer for what it actually costs.',
      rankTable: [
        row({ rank: '1', effect: 'Keep clean books; price a loan or bond offer correctly before signing it' }),
        row({ rank: '2', effect: 'Spot a cooked ledger and name the method; follow a payment through two intermediaries' }),
        row({ rank: '3', effect: 'Reconstruct a missing period from surviving counterparties, which is how a destroyed archive is beaten' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful. Gilded Ascent: auditors are licensed by the Concord and an unlicensed audit has no standing, though the findings travel perfectly well as gossip. Sky City: lattice houses keep two sets by custom and the second set is not illegal, merely unmentioned. Cave Agrarian City: tithe books are public and everybody assumes they are wrong.',
      devNotes:
        PROPOSAL('The rank 3 reconstruction and the licensed-auditor rule are proposed. The manifest establishes Ledger Hand at tier 2 off Plain Letters as the counting-house skill and the way into the Standing Ledger from the inside.') +
        '\n\nDESIGN INTENT: rank 3 is the deliberate counter to [[creature.ledger-moth|ledger moths]]. Destroying an archive should be a setback rather than an ending, or the obvious criminal answer becomes the only one.',
      node: N(TREE.tongueAndCoin, 'Letters', 1, 3, ['skill.plain-letters']),
    },
  }),

  E({
    id: 'skill.brokerage',
    type: 'skill',
    name: 'Brokerage',
    status: 'draft',
    summary: 'Close a deal between two parties who will not share a room, and hold the escrow honestly.',
    tags: ['tongue-and-coin', 'diplomacy', 'trade'],
    fields: {
      overview:
        'Most of the continent’s important trades are between parties who will not meet. A raft clan and a weir authority. A Tree City quartermaster and a Mediterranean foundry. Brokerage is shuttle work: carrying terms, translating positions into offers, structuring a deal so neither side has to concede in front of the other, and holding the escrow while it closes.\n\nThe escrow is the whole profession. A broker who has ever taken from the middle never brokers again, which is why the trade has an unusual number of poor old people in it and an unusual amount of trust. [[npc.sabbe-sixteen-knot|Sabbe Sixteen-Knot]] is currently the reason this matters: she has been paid in guaranteed sluice-time to drift the settlement upriver, and she has one season to make a purchase look like a judgement.',
      skillType: 'Active',
      branch: 'Broking',
      tree: TREE.tongueAndCoin,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Ledger Hand rank 2 and Trade Cant rank 2. Undecided: how is a broker\'s reputation tracked mechanically, and what spends it? Escrow only means anything if breaking it has a system behind it.'),
      effect:
        'Negotiate between hostile or non-communicating parties and hold escrow. Produces agreements that survive both sides trying to break them, and lets you price what each side will actually accept.',
      rankTable: [
        row({ rank: '1', effect: 'Close a deal between parties willing to deal; hold escrow that both sides accept' }),
        row({ rank: '2', effect: 'Close between parties in open dispute; structure terms so neither side visibly concedes' }),
        row({ rank: '3', effect: 'Broker between cities: a settlement that binds institutions rather than individuals, and survives a change of leadership' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere and formally recognised in three places. Gilded Ascent brokers post a bond against the escrow they hold. Mediterranean City brokers are licensed and their agreements are enforceable in the port. Floating Swamp Settlement has no enforcement at all, so a broker there is trading purely on the fact that everyone knows where their rafts are.',
      devNotes:
        PROPOSAL('The escrow bond, the rank 3 institutional settlement and the reputation-as-currency framing are proposed. The manifest establishes Brokerage at tier 3 requiring Ledger Hand and Trade Cant as the go-between skill for city-to-city diplomacy.') +
        '\n\nDESIGN INTENT: this is the skill that lets a party end a war without a battle. Rank 3 should be able to close [[quest.slackwater-rights|Slackwater Rights]] or [[quest.the-casting-voice|The Casting Voice]] outright, at the price of owning the consequences.',
      node: N(TREE.tongueAndCoin, 'Broking', 2, 2, ['skill.ledger-hand', 'skill.trade-cant']),
    },
  }),

  E({
    id: 'skill.fence-work',
    type: 'skill',
    name: 'Fence Work',
    status: 'draft',
    summary: 'Move goods with no provenance: routes, buyers, and a story the stamp will bear.',
    tags: ['tongue-and-coin', 'outlawed', 'smuggling'],
    fields: {
      overview:
        'Stolen goods are not hard to sell, they are hard to explain. Fence Work is the explanation trade: matching a consignment to a buyer who will not ask, building a paper history that a bored clerk will accept, choosing the route where the awkward question does not get asked, and knowing which of the awkward questions is the one that ends you.\n\n[[faction.low-tally|The Low Tally]] is the second ledger and this is its core competence: untaxed cargo across the Drown, the Pans and the Ascent, moved by people who count differently. Its most profitable cargo is no longer goods but people, laundered as crewed passage and bond transfers, which means a player who buys this skill for the pleasure of moving a stolen [[item.crown-bolt|crown bolt]] will find the same routes carrying something else in the other direction.',
      skillType: 'Active',
      branch: 'Reading people',
      tree: TREE.tongueAndCoin,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('The Cold Read rank 2 and Trade Cant rank 2, plus an introduction. Undecided: who issues the introduction? The Low Tally is the obvious answer and making it the only answer closes off independent fences entirely.'),
      effect:
        'Dispose of goods without provenance at a usable fraction of value, and construct a paper history that survives inspection. Sets which buyers, routes and gates are available to you.',
      rankTable: [
        row({ rank: '1', effect: 'Move common goods locally at a heavy discount; know which gates do not look' }),
        row({ rank: '2', effect: 'Move identifiable or licensed goods; build a provenance that passes a routine clerk' }),
        row({ rank: '3', effect: 'Move goods whose theft is publicly known, across a city border, which requires a buyer who is a participant rather than a customer' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Outlawed in all thirteen settlements, unevenly. Gilded Ascent and Mediterranean City prosecute hard and extradite. Sifting City and Arena City prosecute the fence and not the buyer, which is the same thing as licensing the trade. Floating Swamp Settlement has no offence on the books because it has no books. Black Weir treats it as an unpaid toll rather than a theft, which is worse for the offender.',
      devNotes:
        PROPOSAL('The three ranks, the participant-buyer requirement at rank 3 and the uneven prosecution map are proposed. The manifest establishes Fence Work at tier 3, OUTLAWED, requiring The Cold Read and Trade Cant, and as the prerequisite for False Proof.') +
        '\n\nDESIGN INTENT: smuggling relations across the seed should assume this skill. Keep the human-cargo connection explicit but never incidental: the routes are the same routes, and a player who uses them is using somebody’s infrastructure.',
      node: N(TREE.tongueAndCoin, 'Reading people', 2, 0, ['skill.the-cold-read', 'skill.trade-cant']),
    },
  }),

  E({
    id: 'skill.writ-craft',
    type: 'skill',
    name: 'Writ Craft',
    status: 'draft',
    summary: 'Draft licences, permits and extradition filings that survive a hostile clerk.',
    tags: ['tongue-and-coin', 'law', 'regulated'],
    fields: {
      overview:
        'A permit is a machine for making a clerk say yes. Writ Craft is building one: the correct form, the correct precedent cited, the fee schedule attached, the signature block arranged so that refusing it requires the clerk to write down a reason. It is also the skill of reading a hostile filing and finding the defect that voids it.\n\nEvery regulated thing in this world runs through it. Magic licensing under [[mechanic.the-toll|the Toll]] is paperwork before it is anything else, and [[npc.halvo-sarn|Halvo Sarn]] backdates permits at a rising price, which quietly makes him the single point of failure for prosecuting anyone in the Magic City. Extradition is the other half: a [[spell.debt-mark|debt mark]] is lawful indenture in some cities and a capital crime in others, so every runaway becomes a filing rather than a chase.',
      skillType: 'Active',
      branch: 'Letters',
      tree: TREE.tongueAndCoin,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Plain Letters rank 3 and Ledger Hand rank 1. Undecided: which cities recognise a foreign drafter\'s filing at all? Extradition plots need a reciprocity table that nobody has built yet.'),
      effect:
        'Draft, file and contest licences, permits, writs and extradition papers. Determines whether a filing is accepted, how long it survives challenge, and whether a hostile filing can be voided on its face.',
      rankTable: [
        row({ rank: '1', effect: 'File routine permits successfully; read a writ served on you and find its plain defects' }),
        row({ rank: '2', effect: 'Draft filings that survive a hostile clerk; contest an extradition on procedure rather than on facts' }),
        row({ rank: '3', effect: 'Construct a filing across two jurisdictions that neither can refuse without conceding something to the other' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: only licensed writ-drafters may file, and an unlicensed filing is void whether or not it was correct. Magic City: every lawful working crosses a permit clerk’s desk, so this is the skill that makes magic legal there. Gilded Ascent: unregulated and universal. Black Weir: a filing is accepted or refused by the sluice-master personally, which is not a legal system.',
      devNotes:
        PROPOSAL('The three ranks, the cross-jurisdiction filing at rank 3 and the four city positions are proposed. The manifest establishes Writ Craft at tier 3 requiring Plain Letters and Ledger Hand, Regulated, covering magic licensing and extradition clauses.') +
        '\n\nDESIGN INTENT: this is the skill that turns dark-theme content into playable content. A trafficked person is recoverable by a filing, not a fight, and the filing should be as tense as the fight would have been.',
      node: N(TREE.tongueAndCoin, 'Letters', 2, 4, ['skill.plain-letters', 'skill.ledger-hand']),
    },
  }),

  E({
    id: 'skill.bond-broking',
    type: 'skill',
    name: 'Bond Broking',
    status: 'draft',
    summary: 'Buy, sell and call in labour bonds; lawful in some cities, a capital charge in others.',
    tags: ['tongue-and-coin', 'indenture', 'dark'],
    fields: {
      overview:
        'Indenture is an institution here, not a crime, and this is the skill that operates it. Bond Broking is valuing an [[item.indenture-bond|indenture bond]] against its term, its enforceable ports and the health of the person it names; buying it at a discount; reselling it in a bundle; and calling it in when the term or the debt says you may.\n\n[[faction.bondwrights-hall|The Bondwrights’ Hall]] is the respectable end of it and lobbies to keep machinery licensed and dear so that human bodies stay the cheaper engine. [[npc.tazrit-nourem|Tazrit n’Ourem]] holds physical papers on roughly a third of the pan crews in one strongroom under her middle tower. Burning them frees several hundred people and immediately starts a fight over who feeds them, which is precisely the argument she uses to justify holding them. The skill is deliberately not simply outlawed, because the interesting play is a player who holds bonds and has to decide what to do with them.',
      skillType: 'Active',
      branch: 'Broking',
      tree: TREE.tongueAndCoin,
      tier: 4,
      cost: 4,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Brokerage rank 2 and Writ Craft rank 2. Undecided: which registries will recognise an outsider broker, and what does registration cost a player who would rather not be seen registering anywhere?'),
      effect:
        'Value, buy, sell, bundle, transfer and discharge labour bonds. Also covers voiding one: finding the defect that makes a bond unenforceable in a given port, which is how a person is freed on paper.',
      rankTable: [
        row({ rank: '1', effect: 'Value and trade single bonds; read which ports a bond can actually be enforced in' }),
        row({ rank: '2', effect: 'Bundle and resell; discharge a bond early at a computed price the holder will accept' }),
        row({ rank: '3', effect: 'Void a bond on its defects in a hostile port, which frees the named person and makes an enemy of whoever wrote it' }),
      ],
      legality: 'Varies by city',
      legalNotes:
        'Arena City and Sifting City: lawful, registered, and the backbone of both labour markets. Gilded Ascent: lawful, and the Concord is careful to keep the bond and the debt behind it in separate sentences. Sky City: lawful for freight, unlawful for persons, enforced patchily. Mediterranean City: bonds are void and prosecutable, and a broker presenting one in the port is confessing. Tree City: irrelevant, because the levy takes people without buying them.',
      devNotes:
        PROPOSAL('The rank 3 voiding, the bundling mechanic and the five city positions are proposed. The manifest establishes Bond Broking at tier 4 requiring Brokerage and Writ Craft, with legality varying by city rather than simply outlawed.') +
        '\n\nDESIGN INTENT: give indenture consequence, never colour. The rank 3 void is the humane use of a monstrous skill, and it should require the player to have become a participant in the market first. That discomfort is the point of the node.',
      node: N(TREE.tongueAndCoin, 'Broking', 3, 3, ['skill.brokerage', 'skill.writ-craft']),
    },
  }),

  E({
    id: 'skill.crowd-turning',
    type: 'skill',
    name: 'Crowd Turning',
    status: 'draft',
    summary: 'Turn a crowd to a decision, and survive it when the decision turns out to be a riot.',
    tags: ['tongue-and-coin', 'body-and-blade', 'hybrid', 'politics'],
    fields: {
      overview:
        'A crowd is not an audience. It has a mood, a shape and a small number of people whose movement everyone else follows, and turning one means finding those people and giving them somewhere to go. Crowd Turning is the arena tier-worker’s craft applied to a street: pitch, timing, the physical placement that makes you visible without making you reachable, and the exit you worked out before you started.\n\nIt is a hybrid because the second half is fighting. A turned crowd moves, and a person who has turned it is standing in front of it. [[npc.berke-chagra|Berke Chagra]] uses it professionally over the Ring’s tiers. [[faction.standing-hour|The Standing Hour]] uses it in eleven cities and named itself for the hour the Ascent hoists stopped, and its stewards decide which strikes are permitted to win, because its strike fund is fed by Concord money.',
      skillType: 'Active',
      branch: 'Reading people',
      tree: TREE.tongueAndCoin,
      tier: 4,
      cost: 5,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: ['The Cold Read at rank 2', 'Ring Craft at rank 2', 'A crowd that has a grievance; the skill cannot manufacture one'],
      effect:
        'Move a crowd to a specific decision or action, and disengage from it safely. Sets whether a gathering disperses, petitions, strikes or riots, and whether you are still standing when it does.',
      rankTable: [
        row({ rank: '1', effect: 'Swing a crowd already leaning your way; get out of one that has turned without being trampled' }),
        row({ rank: '2', effect: 'Turn a hostile crowd, choose between petition and riot as the outcome, and name who the crowd blames' }),
      ],
      legality: 'Varies by city',
      legalNotes:
        'Arena City: lawful and professionalised over the tiers. Gilded Ascent: lawful until it stops a hoist, at which point it becomes interference with bonded freight. Sky City: any gathering above a stated mass on one section of the lattice is a mass-warrant offence, which is a structural rule used as a political one. Tree City: unlawful assembly is dispersed by the gallery watch and the dispersal is what the watch drills for. Magic City: crowds near a bound slab are broken up on sight.',
      devNotes:
        PROPOSAL('The two ranks, the blame-naming at rank 2 and the Sky City mass rule are proposed. The manifest establishes Crowd Turning as a Tongue & Coin x Body & Blade hybrid at tier 4 requiring The Cold Read and Ring Craft, and notes it is also how uprisings start.') +
        '\n\nDESIGN INTENT: rank 2 should let a player start something they cannot stop. Name the person the crowd blames, then make the game hold them to it a session later.',
      node: N(TREE.tongueAndCoin, 'Reading people', 3, 1, ['skill.the-cold-read', 'skill.ring-craft']),
    },
  }),

  E({
    id: 'skill.chartering',
    type: 'skill',
    name: 'Chartering',
    status: 'draft',
    summary: 'Found and register a chartered house: a seal, a branch, and liabilities that outlive you.',
    tags: ['tongue-and-coin', 'capstone', 'enterprise'],
    fields: {
      overview:
        'The capstone of the tree and the gate on owning anything. A charter is a legal person: it holds property, signs contracts, carries debt and survives its founder. Chartering is the work of creating one, which means a registered seal, a stated liability, a named branch address in at least one city, and a bond posted against the whole thing.\n\nA [[item.factors-seal|factor’s seal]] lets a factor bind their house to a contract and its loss must be reported within a day, which tells you how much weight the object carries. A house also inherits obligations. Charter a trading company and you have taken on whatever its predecessor signed, which is the standing trap in the Gilded Ascent: cheap charters are cheap because somebody already ran them into something.',
      skillType: 'Ritual',
      branch: 'Broking',
      tree: TREE.tongueAndCoin,
      tier: 5,
      cost: 6,
      maxRank: 1,
      hybrid: false,
      unlockRequirements: [
        'Brokerage at rank 3',
        'Writ Craft at rank 3',
        'Ledger Hand at rank 3',
        'Capital and a bond, both real and both at risk',
      ],
      effect:
        'Found, register and run a chartered house: property, contracts, branches, employees and liabilities that persist independently of the player. Unlocks player-run enterprises and faction-scale ownership.',
      rankTable: [
        row({ rank: '1', effect: 'Single rank. One charter, one seal, one registered branch, and every obligation the charter carries from that day forward' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Gilded Ascent: charters are registered by the Concord against a posted bond, and the register is public. Mediterranean City: a charter needs a licensed sponsor in the port and the sponsor is jointly liable. Sky City: a charter must state its mass allocation before it may hold property. Arena City: charters may hold bonds on persons, which is why houses register there and trade elsewhere. Orath, Oruvai and Keth Veyra: unresolved, and deliberately so.',
      devNotes:
        PROPOSAL('The bond, the joint sponsor liability and the inherited-obligation trap are proposed. The manifest establishes Chartering as the tier-5 Tongue & Coin capstone requiring Brokerage, Writ Craft and Ledger Hand, and asks faction and quest authors to treat it as the gate on owning anything.') +
        '\n\nDESIGN INTENT: treat this as the endgame for a mercantile party. Once a player holds a charter, quests can be addressed to the house rather than to the character, and the house can be sued, blockaded or bought.',
      node: N(TREE.tongueAndCoin, 'Broking', 4, 2, ['skill.brokerage', 'skill.writ-craft', 'skill.ledger-hand']),
    },
  }),

  /* ================================================================ */
  /* Arcana & Risk                                                     */
  /* ================================================================ */

  E({
    id: 'skill.toll-sense',
    type: 'skill',
    name: 'Toll Sense',
    status: 'draft',
    summary: 'Feel your accrued Toll before it surfaces, and know how many workings you have left.',
    tags: ['arcana-and-risk', 'entry', 'magic'],
    fields: {
      overview:
        'Magic is not free and it is not paid in mana. Under [[mechanic.the-toll|the Toll]] every working accrues a physical debt in the body of whoever did it, and the debt is discharged, registered or hidden at a worse price. Toll Sense is the interoceptive skill of feeling that balance before it surfaces: the metallic taste, the temperature gradient across the sternum, the specific tiredness that is not tiredness.\n\nAssume every trained caster has it and that untrained ones do not. That asymmetry is the whole reason licensing exists as an institution rather than as a racket: an unlicensed practitioner is not merely unregistered, they genuinely do not know how close they are. [[faction.fetterhouse|The Fetterhouse]] tests for Toll Sense before it tests for anything else, and knows within about eight months when each caster on the chain rota will stop being able to hold a line.',
      skillType: 'Passive',
      branch: 'Toll',
      tree: TREE.arcanaAndRisk,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite. Undecided: is Toll Sense automatic for anyone who has ever worked, or does an untrained caster need one full burnout before the sense arrives? The second is crueller and probably right.'),
      effect:
        'Read your own accrued Toll and estimate how many further workings you can safely perform. At higher ranks, read it in others, which is how burnout is spotted before it is admitted.',
      rankTable: [
        row({ rank: '1', effect: 'Know your own accrued Toll as a rough band, and feel the point at which the next working is dangerous' }),
        row({ rank: '2', effect: 'Know it precisely, and predict how a specific working will move it before you begin' }),
        row({ rank: '3', effect: 'Read another person’s Toll by contact, which is diagnosis, blackmail and recruitment all at once' }),
      ],
      legality: 'Lawful',
      legalNotes:
        'Lawful everywhere, including cities that outlaw casting entirely, since it is a sense rather than a working. Magic City: the Fetterhouse examines for it and a licence application without it is refused outright. Tree City: possession of it is taken as evidence that you have worked, which is not the same offence but is prosecuted like one.',
      devNotes:
        PROPOSAL('The three ranks, the contact reading at rank 3 and the Fetterhouse examination are proposed. The manifest establishes Toll Sense as the tier-1 Arcana & Risk root and the read on the Toll, held by trained casters and not by untrained ones.') +
        '\n\nDESIGN INTENT: this node exists so the Toll is a resource the player can see. Without it the system is a hidden counter and the player is being punished by arithmetic they cannot inspect.',
      node: N(TREE.arcanaAndRisk, 'Toll', 0, 0),
    },
  }),

  E({
    id: 'skill.chalk-hand',
    type: 'skill',
    name: 'Chalk Hand',
    status: 'draft',
    summary: 'Lay and read ward chalk: what a line is holding, and how near it is to failing.',
    tags: ['arcana-and-risk', 'entry', 'warding'],
    fields: {
      overview:
        'Every ward in the world is chalked in [[material.ward-chalk|ward chalk]], a soft white marl that holds a drawn line when nothing else will and goes dead within a season. That makes warding a repeat-order business and the marl beds a chokehold, and it makes Chalk Hand the most widely held magical skill on the continent: the hand that lays the line, and more importantly the eye that reads one.\n\nReading is the part that keeps people alive. A [[spell.chalkline-ward|chalkline ward]] holds only what it is told to hold and one shower of rain unmakes it, so [[district.magic-city-chalk-row|Chalk Row]] is full of people whose whole trade is walking a route and saying which lines have days left. It is also why [[creature.chalk-louse|chalk lice]] are a civic emergency rather than an infestation: they eat the binder, the line stays visible, and the ward is gone with nothing to see.',
      skillType: 'Active',
      branch: 'Warding',
      tree: TREE.arcanaAndRisk,
      tier: 1,
      cost: 1,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('No skill prerequisite, but chalk is licensed and logged stick by stick in the Magic City. Undecided: how much chalk does a working line consume per week, and who supplies it outside the Magic City? The warding economy is a supply number nobody has set.'),
      effect:
        'Draw and read ward chalk lines. Determines whether a ward holds, what it is specified to hold, and how much service life is left in it before a recut is due.',
      rankTable: [
        row({ rank: '1', effect: 'Lay a filed pattern correctly; tell a live line from a dead one' }),
        row({ rank: '2', effect: 'Read what a line was specified to hold and estimate its remaining life to within days' }),
        row({ rank: '3', effect: 'Diagnose why a line is failing, including louse damage, adulterated chalk and a pattern that was wrong when it was filed' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Magic City: a ward must be drawn to a filed pattern by a licensed hand, and the filing is what is licensed, not the wearer. Drawing your own lines counts as unlicensed working even though nothing is cast. Sifting City and Gilded Ascent: unregulated, sold as mining and vault kit. Tree City: barred at the gate as worked magic, which means the Pitchguard confiscates protective equipment from people who then work unprotected.',
      devNotes:
        PROPOSAL('The three ranks and the rank 3 adulteration diagnosis are proposed. The manifest establishes Chalk Hand as a tier-1 Arcana & Risk root, entry to the warding branch and to Magic City labour, and asks ward-chalk material entries to name it.') +
        '\n\nDESIGN INTENT: rank 3 is the diagnostic that cracks [[quest.the-chalk-that-lies|The Chalk That Lies]]. A party without it can still run the quest, but they will be trusting somebody else’s word about which batch is bad.',
      node: N(TREE.arcanaAndRisk, 'Warding', 0, 3),
    },
  }),

  E({
    id: 'skill.reagent-work',
    type: 'skill',
    name: 'Reagent Work',
    status: 'draft',
    summary: 'Prepare, dose and store components; contamination and shelf life kill more casters than backlash.',
    tags: ['arcana-and-risk', 'alchemy', 'regulated'],
    fields: {
      overview:
        'The alchemy node, and the setting has no separate alchemy tree because there is no separate alchemy. Reagent Work is preparation and storage: grinding, decoction, stabilising in spirit, sealing in [[material.clearcast-glass|clearcast]] ware, labelling, and the dating discipline that keeps a shelf honest. Every potion and component entry should cite this rather than inventing its own craft.\n\nThe risks are dull and they are what kill people. [[material.quietmilk|Quietmilk]] must be stabilised within the hour of milking or it turns. [[spell.arrears-draught|Arrears draught]] buys hours of casting now and costs a collapse later at a moment you do not choose, and a badly stored batch moves that moment earlier. Contamination between two shelves is how a licensed surgeon becomes a defendant, which is why the Mediterranean City licenses the storeroom rather than the practitioner.',
      skillType: 'Active',
      branch: 'Reagents',
      tree: TREE.arcanaAndRisk,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Toll Sense rank 1, plus a sealed store. Undecided: is there one shelf-life clock for all preparations, or does each component entry set its own? The second is truer to the setting and much heavier to run at a table.'),
      effect:
        'Prepare, stabilise, store and dose magical and medical components. Sets potency, shelf life and contamination risk for every consumable, and lets you judge an unknown preparation before taking it.',
      rankTable: [
        row({ rank: '1', effect: 'Prepare and store to a written recipe; identify a spoiled or adulterated preparation by inspection' }),
        row({ rank: '2', effect: 'Extend shelf life, halve doses safely, and substitute one component for another with a stated penalty' }),
        row({ rank: '3', effect: 'Stabilise something that is not supposed to keep, which is how a perishable reagent becomes a trade good' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Mediterranean City: the storeroom is licensed and inspected, not the person, and an unlicensed store voids every insurance on the building. Magic City: reagent purchase is logged against a permit and the log is the prosecution. Arena City: unregulated for anything sold ringside, which is how [[item.cinderroot-cordial|cinderroot cordial]] is legal by the cup. Cave Agrarian City: preparation is a household trade and nobody licenses anything.',
      devNotes:
        PROPOSAL('The three ranks and the rank 3 stabilisation are proposed. The manifest establishes Reagent Work at tier 2 off Toll Sense as the alchemy node, cited by potion and component entries.') +
        '\n\nDESIGN INTENT: rank 3 is an economic unlock rather than a combat one. Making a perishable keep is how a party turns a harvest into a trade route, which is the setting’s preferred kind of power.',
      node: N(TREE.arcanaAndRisk, 'Reagents', 1, 0, ['skill.toll-sense']),
    },
  }),

  E({
    id: 'skill.scar-reading',
    type: 'skill',
    name: 'Scar Reading',
    status: 'draft',
    summary: 'Read anomaly gradients in the Aetheric Scar and judge where it is survivable to stand.',
    tags: ['arcana-and-risk', 'aetheric-scar', 'survival'],
    fields: {
      overview:
        'The [[region.aetheric-scar|Aetheric Scar]] is not uniformly lethal, it is a gradient with a shape, and the shape moves. Scar Reading is the survey skill for it: reading the still air, the behaviour of dropped chalk dust, the pitch that [[material.faultglass|faultglass]] shards give when they are near a live edge, and the standing gradient rules that say how long a person may hold a given position.\n\nIt is also a prospecting skill. [[deposit.brine-sinks|The Brine Sinks]] hold the charged brine that all [[material.levin-salt|levin salt]] is grown from, and [[deposit.cold-quarter|the Cold Quarter]] grows [[material.quenchspar|quenchspar]] in violet seams that must be sawn wet and only in winter. Magic City cutters work in pairs, log every block and are paid by the block that does not shatter, and the reason they work in pairs is that one of them is reading while the other cuts.',
      skillType: 'Active',
      branch: 'The Scar',
      tree: TREE.arcanaAndRisk,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: ['Toll Sense at rank 1', 'A ward line to retreat behind; the skill tells you to leave, it does not carry you'],
      effect:
        'Read anomaly gradients: judge exposure, safe dwell time and the direction a field is moving. Gates access to every Aetheric Scar site and to the deposits inside it.',
      rankTable: [
        row({ rank: '1', effect: 'Judge whether ground is survivable now, and for roughly how long' }),
        row({ rank: '2', effect: 'Track a gradient as it moves; route a party through a shifting field without losing anyone' }),
        row({ rank: '3', effect: 'Predict a disturbance hours ahead, and identify where a fresh event has left workable seam or shard' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Magic City: survey inside the ward line requires a Fetterhouse permit and every entry and exit is logged against the permit holder’s exposure record. Sifting City: irrelevant in law and useful in fact, which is how [[npc.sahat-belek|Sahat Belek]] recognised what he found in the deep pans. Everywhere else: unregulated, because nobody else has a Scar.',
      devNotes:
        PROPOSAL('The dwell-time rules, the paired cutting practice and the rank 3 disturbance prediction are proposed. The manifest establishes Scar Reading at tier 2 off Toll Sense as the gate on all Aetheric Scar sites, feeding Grey Casting, Storm Tapping and Fault Walking.') +
        '\n\nDESIGN INTENT: site entries in the Scar should state a Scar Reading rank as their entry requirement. It keeps the anomaly a regulated hazard rather than a dungeon, which is the canon position.',
      node: N(TREE.arcanaAndRisk, 'The Scar', 1, 1, ['skill.toll-sense']),
    },
  }),

  E({
    id: 'skill.ward-cutting',
    type: 'skill',
    name: 'Ward Cutting',
    status: 'draft',
    summary: 'Cut durable wards into stone so they hold without a chalk round every week.',
    tags: ['arcana-and-risk', 'magic-city', 'regulated'],
    fields: {
      overview:
        'Chalk dies in a season. Cut stone does not. Ward Cutting is the trade of incising a pattern into a face so that it holds for years: stone selection, depth, the discipline of cutting a pattern that is legally identical to the one on file, and the far harder work of cutting a correction into a ward that is already carrying something.\n\nIt is the maintenance economy of [[mechanic.ward-load|Ward Load]]. Every binding in the Magic City carries a rated tonnage, an inspection date and a named caster, posted on [[landmark.the-load-roll|the Load Roll]] the way another city posts boiler certificates. Cutters are on a rota, and the rota is running behind, and the person who admits how far behind is the person who gets blamed. [[npc.toval-cherek|Toval Cherek]] has been shorting the alloy in the replacement chain links for two years for exactly that reason.',
      skillType: 'Active',
      branch: 'Warding',
      tree: TREE.arcanaAndRisk,
      tier: 2,
      cost: 2,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Chalk Hand rank 2, plus a filed pattern and a licence to cut it. Undecided: how many years does a cut ward hold before a recut falls due? Ward Load is a maintenance schedule and that interval is the schedule.'),
      effect:
        'Cut durable wards into stone and metal. Produces bindings measured in years rather than weeks, and lets you alter or defeat an existing cut ward without collapsing what it carries.',
      rankTable: [
        row({ rank: '1', effect: 'Cut a filed pattern into fresh stone; it holds to its rating for its stated term' }),
        row({ rank: '2', effect: 'Cut a correction into a loaded ward without dropping the load; re-rate a ward you did not cut' }),
        row({ rank: '3', effect: 'Cut a pattern that is not on file and make it pass inspection, which is either innovation or forgery depending on the clerk' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Magic City: licensed by the Fetterhouse, logged against [[landmark.the-load-roll|the Load Roll]], and cutting an unfiled pattern is the offence that fills the chain-house. Sky City: cut wards on the lattice require a Mooring Assize sign-off because they change the structure’s rated mass. Mediterranean City: permitted under Conduit College licence for harbour works. Tree City: barred, along with everything else that counts as worked magic.',
      devNotes:
        PROPOSAL('The three ranks, the loaded correction at rank 2 and the unfiled pattern at rank 3 are proposed. The manifest establishes Ward Cutting at tier 2 off Chalk Hand, Regulated, feeding Bleed-Off and the Load Binding hybrid.') +
        '\n\nDESIGN INTENT: rank 2 is the node the Magic City’s whole maintenance crisis hangs on. A party that can correct a loaded ward can buy the city time, and buying time is exactly what the Fetterhouse is short of.',
      node: N(TREE.arcanaAndRisk, 'Warding', 1, 3, ['skill.chalk-hand']),
    },
  }),

  E({
    id: 'skill.bleed-off',
    type: 'skill',
    name: 'Bleed-Off',
    status: 'draft',
    summary: 'Discharge Toll into a licensed sink: the lawful way to keep working past your limit.',
    tags: ['arcana-and-risk', 'magic-city', 'regulated'],
    fields: {
      overview:
        'The lawful answer to [[mechanic.the-toll|the Toll]], and the leash that comes with it. A sink is a block of [[material.quenchspar|quenchspar]] in a licensed vault that drinks aetheric charge until it saturates, then fails all at once and takes the room with it. Bleed-Off is the technique of pushing accrued Toll into one safely, at a metered rate, against a receipt.\n\nSink infrastructure is a city service worth mapping. The [[district.magic-city-the-sinks|Sinks]] hold most of it, saturated blocks have to be walked out and buried, and the Magic City charges for the burial. The moral architecture is simple and ugly: lawful discharge is rationed by licence, so the unlicensed either stop working or find something else to discharge into, and the thing they find is usually a person. That is the road to [[skill.toll-shunting|Toll Shunting]] and everybody involved knows it.',
      skillType: 'Ritual',
      branch: 'Toll',
      tree: TREE.arcanaAndRisk,
      tier: 3,
      cost: 3,
      maxRank: 3,
      hybrid: false,
      unlockRequirements: TBD('Toll Sense rank 2 and Ward Cutting rank 1, plus a licensed sink and the separate licence to use it. Undecided: how many sinks exist, city by city, and what does an hour at one cost? Sink scarcity is the single number that sets how dark the magic economy runs.'),
      effect:
        'Discharge accrued Toll into a quenchspar sink at a metered rate, against a receipt. Resets or reduces your Toll balance at a cost in money, time and recorded exposure.',
      rankTable: [
        row({ rank: '1', effect: 'Full discharge at a licensed sink; takes hours and is logged against your licence' }),
        row({ rank: '2', effect: 'Partial discharge in minutes, and safe use of an unfamiliar or improvised sink' }),
        row({ rank: '3', effect: 'Discharge into a saturating block without triggering it, which is the only way to use the sinks nobody has replaced' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Magic City: the Fetterhouse licenses sink access and will not licence a bleed-off for a prisoner, which is a sentence with extra steps. Mediterranean City: two municipal sinks, booked in advance, and use is public record. Gilded Ascent: sink time is bought and sold on the Stair like any other commodity, which means the price rises when the Magic City’s rota slips. Sifting City and Tree City: no sinks at all.',
      devNotes:
        PROPOSAL('The three ranks, the rank 3 saturating-block technique and the tradeable sink time are proposed. The manifest establishes Bleed-Off at tier 3 requiring Toll Sense and Ward Cutting, Regulated, and notes that the licence is a leash.') +
        '\n\nDESIGN INTENT: make lawful discharge scarce rather than expensive. If a party can always afford it, the Toll is a tax; if they sometimes cannot get a booking, the Toll is a plot.',
      node: N(TREE.arcanaAndRisk, 'Toll', 2, 2, ['skill.toll-sense', 'skill.ward-cutting']),
    },
  }),

  E({
    id: 'skill.load-binding',
    type: 'skill',
    name: 'Load Binding',
    status: 'draft',
    summary: 'Bind force to carry structural mass; the trade that keeps the Magic City’s slabs off the street.',
    tags: ['arcana-and-risk', 'craft-and-machine', 'hybrid', 'magic-city'],
    fields: {
      overview:
        'Fourteen slabs of pavement were thrown out of true when the ground stopped agreeing with itself, four of them over the old town, and the city chained them rather than move. [[spell.holdfast-binding|Holdfast bindings]] hold the slabs and Load Binding is the profession that computes, lays and re-rates them: how much mass a binding carries, over what span, for how long before the re-payment falls due on the public register.\n\nIt is a hybrid because half of it is structural engineering. A binder who cannot read a load path is a person guessing with other people’s buildings underneath. The same trade re-rates the Sky City’s tension lattice, which is why [[faction.mooring-assize|the Mooring Assize]] and [[faction.fetterhouse|the Fetterhouse]] both licence it and neither recognises the other’s licence. The practitioners burn out fastest of any regulated trade, and the roll of who is next is not shown to the people on it.',
      skillType: 'Ritual',
      branch: 'Warding',
      tree: TREE.arcanaAndRisk,
      tier: 3,
      cost: 4,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: ['Ward Cutting at rank 2', 'Bench Sense at rank 2', 'A posting on the Load Roll, or the equivalent register elsewhere'],
      effect:
        'Bind force to carry structural mass: rate, lay and re-rate load-bearing bindings. Sets what a slab, span or lattice section can hold and when the next payment falls due.',
      rankTable: [
        row({ rank: '1', effect: 'Lay and rate a binding on a stated span; compute a re-payment schedule that holds' }),
        row({ rank: '2', effect: 'Re-rate a loaded binding in place, and stabilise one that is already failing long enough to evacuate under it' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Magic City: licensed by the Fetterhouse, posted on the Load Roll with rated tonnage, inspection date and named caster. Sky City: the Mooring Assize licenses lattice bindings separately and does not honour a Fetterhouse posting. Gilded Ascent: permitted on warehousing under a counting-house indemnity. Mediterranean City: the Conduit College treats it as structural work and requires an engineer’s countersignature, which the Fetterhouse considers an insult.',
      devNotes:
        PROPOSAL('The two ranks, the evacuation stabilisation at rank 2 and the duelling licences are proposed. The manifest establishes Load Binding as an Arcana & Risk x Craft & Machine hybrid at tier 3 requiring Ward Cutting and Bench Sense, as the profession behind Ward Load.') +
        '\n\nDESIGN INTENT: this is the setting’s statement that magic is plant. A binder is a structural engineer with a shorter life expectancy and a public inspection date, and the drama is scheduling, not sorcery.',
      node: N(TREE.arcanaAndRisk, 'Warding', 2, 4, ['skill.ward-cutting', 'skill.bench-sense']),
    },
  }),

  E({
    id: 'skill.grey-casting',
    type: 'skill',
    name: 'Grey Casting',
    status: 'draft',
    summary: 'Work off the register so nothing is metered; the Toll still accrues, unrecorded and uncapped.',
    tags: ['arcana-and-risk', 'outlawed', 'magic'],
    fields: {
      overview:
        'Licensed working is metered: the permit states what, the log states how much, and the sink receipt states what was discharged. Grey Casting is working outside all three. It is not a different magic. It is the same workings performed without a filing, which means nothing caps them and nothing records them, and the [[mechanic.the-toll|Toll]] accrues exactly as it always did.\n\nThe arithmetic is what kills. A licensed caster is stopped by their rota before they reach the dangerous band. A grey caster is stopped by their own body, later, and by then the accrued balance is beyond what any licensed sink will discharge even if somebody would sell them the booking. Every unlicensed caster NPC should have this skill and a shortening life expectancy to match. [[npc.halvo-sarn|Halvo Sarn]] backdates permits for practitioners already caught, at a rising price, which is the only reason some of them are still working.',
      skillType: 'Toggle',
      branch: 'The Scar',
      tree: TREE.arcanaAndRisk,
      tier: 4,
      cost: 4,
      maxRank: 2,
      hybrid: false,
      unlockRequirements: TBD('Bleed-Off rank 2 and Scar Reading rank 2. Undecided: how fast does uncapped Toll actually kill? The manifest says life expectancy shortens; the rate is the entire balance of the node and of every unlicensed caster in the seed.'),
      effect:
        'Perform any working you know without a permit, a log or a meter. Removes rota and licence caps on how often you may work; removes every protection those caps existed to provide.',
      rankTable: [
        row({ rank: '1', effect: 'Work off the register; no permit needed and no cap on frequency. Toll accrues at the normal rate and is never receipted' }),
        row({ rank: '2', effect: 'Conceal the physical signs of a working from an inspection, which is what keeps a grey caster out of the chain-house' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Magic City: unlicensed working is the offence the chain-house exists for, and a caught practitioner is either marked and put on the rota or held. Mediterranean City: prosecuted as practising without licence, which carries a fine and a bar rather than a cell. Gilded Ascent: prosecuted only when it damages property, which in practice means prosecuted when it is cheap. Tree City: all working is barred, so the distinction does not arise. Sifting City: no law and no sinks, which is the worst combination there is.',
      devNotes:
        PROPOSAL('The two ranks, the concealment at rank 2 and the five city positions are proposed. The manifest establishes Grey Casting at tier 4, OUTLAWED, requiring Bleed-Off and Scar Reading, and asks that unlicensed caster NPCs carry it with a shortening life expectancy.') +
        '\n\nDESIGN INTENT: the trap is that the prerequisite is the lawful skill. You have to learn how discharge works before you can knowingly go without it, so every grey caster in the world was trained by the institution they are now defying.',
      node: N(TREE.arcanaAndRisk, 'The Scar', 3, 1, ['skill.bleed-off', 'skill.scar-reading']),
    },
  }),

  E({
    id: 'skill.toll-shunting',
    type: 'skill',
    name: 'Toll Shunting',
    status: 'draft',
    summary: 'Push your Toll into another body; the debt is paid, and somebody else pays it.',
    tags: ['arcana-and-risk', 'outlawed', 'dark'],
    fields: {
      overview:
        'The darkest node in the trees. Toll Shunting is [[skill.bleed-off|Bleed-Off]] performed into a person instead of a sink. The technique is not difficult once you can discharge at all, which is the horror of it: the barrier is not skill, it is that you have to hold somebody still and decide to do it.\n\nThe victims are the entry, not the flavour. Shunted Toll presents as a wasting that no physician can account for, and it is survivable once, sometimes twice. The people it is done to are the people nobody counts: bonded pan crews, milkers already dosed to keep them working, the deep-gallery debtors [[faction.mirror-assembly|the Mirror Assembly]] stopped listing as citizens. Write them with names and afterwards. Never write a shunt as a combat option, and never let a player use it without the game producing the person it was used on.',
      skillType: 'Ritual',
      branch: 'Toll',
      tree: TREE.arcanaAndRisk,
      tier: 4,
      cost: 4,
      maxRank: 2,
      hybrid: false,
      unlockRequirements: ['Bleed-Off at rank 3', 'A restrained or unconscious person, every single time'],
      effect:
        'Discharge accrued Toll into another living person. Clears your balance immediately and transfers it to them, where it presents as an unexplained wasting over days.',
      rankTable: [
        row({ rank: '1', effect: 'Full discharge into a restrained person. Obvious to any Toll Sense rank 3 examination for about a week' }),
        row({ rank: '2', effect: 'Partial, repeated shunts spread across several people, which is harder to detect and is how the practice becomes an operation' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Outlawed in all thirteen settlements without exception, and it is the one offence for which extradition is granted everywhere, including between cities in open trade disputes. Magic City: capital, and the Fetterhouse conducts the examinations itself. Mediterranean City: capital, and the harbour board holds ships on suspicion. Arena City and Sifting City: capital in text, and the cases that reach a court are cases where the victim had a registered bond and therefore an owner with standing.',
      devNotes:
        PROPOSAL('The two ranks, the week-long detectability window and the standing problem in registry cities are proposed. The manifest establishes Toll Shunting at tier 4, OUTLAWED everywhere without exception, requiring Bleed-Off, and instructs authors to write victims rather than flavour.') +
        '\n\nDESIGN INTENT: the detail that does the work is the last line of the legal note. In two cities the crime is prosecutable mainly when the victim was somebody’s property, which says everything the setting needs to say about its own laws.',
      node: N(TREE.arcanaAndRisk, 'Toll', 3, 2, ['skill.bleed-off']),
    },
  }),

  E({
    id: 'skill.storm-tapping',
    type: 'skill',
    name: 'Storm Tapping',
    status: 'draft',
    summary: 'Draw charge from the Anvil Shelf updraught: enormous yield, and no way to stop once tapped.',
    tags: ['arcana-and-risk', 'wild-and-ways', 'hybrid', 'sky-city'],
    fields: {
      overview:
        'The permanent thermal over [[region.anvil-shelf|the Anvil Shelf]] carries the Sky City and, on the days when the shelf is working, an enormous charge gradient. Storm Tapping is drawing on it directly rather than on your own reserves: a tap is opened against the column, the working runs on borrowed charge, and the accrued [[mechanic.the-toll|Toll]] lands on the column instead of the caster.\n\nThe catch is in the name. A tap cannot be closed by the person who opened it. It runs until the gradient falls below the working threshold, which may be four minutes or may be an afternoon, and everything within the tap radius is inside the circuit for the duration. It is a hybrid because reading the column is [[skill.weather-eye|Weather Eye]] work before it is magic, and a caster who cannot see the gradient collapse coming is standing in the wrong place when it does.',
      skillType: 'Ritual',
      branch: 'The Scar',
      tree: TREE.arcanaAndRisk,
      tier: 4,
      cost: 5,
      maxRank: 2,
      hybrid: true,
      unlockRequirements: ['Scar Reading at rank 2', 'Weather Eye at rank 3', 'A live gradient, which is a place and a weather condition rather than a component'],
      effect:
        'Draw working charge from an atmospheric or anomalous gradient rather than from yourself. Enormous yield with no Toll accrued to the caster; the tap cannot be closed until the gradient falls.',
      rankTable: [
        row({ rank: '1', effect: 'Open a tap on a strong gradient. Workings run at no personal Toll while it holds; you cannot close it' }),
        row({ rank: '2', effect: 'Site a tap so that the circuit excludes people you name, and predict the collapse to within about a quarter hour' }),
      ],
      legality: 'Regulated',
      legalNotes:
        'Sky City: tapping anywhere on or under the lattice is barred outright by [[faction.mooring-assize|the Mooring Assize]], since a live circuit through the tension structure is a mass and safety event at once. Magic City: permitted under Fetterhouse permit at the Scar edge, logged by the hour. Elsewhere: no law, because no gradient. [[material.levin-salt|Levin salt]] is the lawful, taxed, portable alternative and the Assize would very much prefer you bought it.',
      devNotes:
        PROPOSAL('The two ranks, the uncloseable tap and the named-exclusion at rank 2 are proposed. The manifest establishes Storm Tapping as an Arcana & Risk x Wild & Ways hybrid at tier 4 requiring Scar Reading and Weather Eye, tying the updraught to magic without making it a switchable power source.') +
        '\n\nDESIGN INTENT: a free-power node that is only free if you are willing to stand in a circuit you cannot turn off. Use it to make the Anvil Shelf a place with weather rather than a battery.',
      node: N(TREE.arcanaAndRisk, 'The Scar', 3, 0, ['skill.scar-reading', 'skill.weather-eye']),
    },
  }),

  E({
    id: 'skill.fault-walking',
    type: 'skill',
    name: 'Fault Walking',
    status: 'draft',
    summary: 'Enter the Bound Fault and walk back out; timed in minutes, paid for in years.',
    tags: ['arcana-and-risk', 'capstone', 'outlawed', 'magic-city'],
    fields: {
      overview:
        'The endgame node and the only skill in the trees whose cost is permanent by design. [[landmark.the-bound-fault|The Bound Fault]] is held by nine chains, and the space inside them is where [[material.faultglass|faultglass]] comes from and where the events that make it are still, in some sense, happening. Fault Walking is the discipline of entering that, doing one thing, and leaving.\n\nEverything about it is timed. Exposure is measured in minutes and the debt is measured in years off the walker, discharged by no sink and reduced by no licence. [[npc.ysme-drannik|Ysme Drannik]] is the only living person who knows which two of the nine chains are already dead, and the city keeps her in the chain-house rather than say the number aloud. A walker who learns which two, from inside, has the most dangerous information in the Magic City and roughly a decade left to use it.',
      skillType: 'Ritual',
      branch: 'The Scar',
      tree: TREE.arcanaAndRisk,
      tier: 5,
      cost: 6,
      maxRank: 1,
      hybrid: false,
      unlockRequirements: [
        'Scar Reading at rank 3',
        'Grey Casting at rank 2',
        'Load Binding at rank 2',
        'A way past the chain-house, which is a quest rather than a requirement',
      ],
      effect:
        'Enter the interior of the Bound Fault, act there for a measured number of minutes, and return. Each walk costs permanent, unrecoverable life; nothing discharges it and no city will treat it.',
      rankTable: [
        row({ rank: '1', effect: 'Single rank. One walk, one objective, a stated exposure in minutes and a permanent cost the character carries for the rest of play' }),
      ],
      legality: 'Outlawed',
      legalNotes:
        'Magic City: entering the chained volume is capital, and the Fetterhouse does not prosecute it because nobody who does it is available to prosecute. Mediterranean City and Gilded Ascent: possession of [[material.faultglass|faultglass]] is a capital charge in three cities and a fashion in a fourth, which is the closest either has to a position. No city has an offence covering what a walker brings back, because none has admitted that anyone has.',
      devNotes:
        PROPOSAL('The single rank, the minute-scale exposure and the permanent unrecoverable cost are proposed. The manifest establishes Fault Walking as the tier-5 Arcana & Risk capstone, OUTLAWED, requiring Scar Reading, Grey Casting and Load Binding, reserved for endgame Magic City content.') +
        '\n\nDESIGN INTENT: reserve this for the end of a campaign. Its real function is to give [[quest.the-scar-concession|The Scar Concession]] a face: whoever holds the concession sets the price of regulated magic for a generation, and the only people who know what is actually inside the fault are the ones who cannot afford to go back.',
      node: N(TREE.arcanaAndRisk, 'The Scar', 4, 2, ['skill.scar-reading', 'skill.grey-casting', 'skill.load-binding']),
    },
  }),
]

export const relations: SeedRelation[] = [
  /* ---------------------------------------------------------------- */
  /* Prerequisite graph. Mirrors every `requires` array above exactly. */
  /* ---------------------------------------------------------------- */

  R('skill.set-and-brace', 'prerequisite_of', 'skill.long-arm'),
  R('skill.set-and-brace', 'prerequisite_of', 'skill.plate-and-seam'),
  R('skill.set-and-brace', 'prerequisite_of', 'skill.slow-match'),
  R('skill.set-and-brace', 'prerequisite_of', 'skill.lattice-work', 'cross-tree: the Body & Blade half of the hybrid'),
  R('skill.close-work', 'prerequisite_of', 'skill.ring-craft'),
  R('skill.close-work', 'prerequisite_of', 'skill.bonewright', 'cross-tree hybrid with Bench Sense'),
  R('skill.close-work', 'prerequisite_of', 'skill.throat-work'),
  R('skill.plate-and-seam', 'prerequisite_of', 'skill.dead-weight'),
  R('skill.plate-and-seam', 'prerequisite_of', 'skill.last-rank'),
  R('skill.long-arm', 'prerequisite_of', 'skill.gallery-drill'),
  R('skill.long-arm', 'prerequisite_of', 'skill.last-rank'),
  R('skill.dead-weight', 'prerequisite_of', 'skill.gallery-drill'),
  R('skill.gallery-drill', 'prerequisite_of', 'skill.last-rank'),
  R('skill.ring-craft', 'prerequisite_of', 'skill.throat-work'),
  R('skill.ring-craft', 'prerequisite_of', 'skill.crowd-turning', 'cross-tree: the Body & Blade half of the hybrid'),

  R('skill.bench-sense', 'prerequisite_of', 'skill.cable-and-drum'),
  R('skill.bench-sense', 'prerequisite_of', 'skill.pressure-fitting'),
  R('skill.bench-sense', 'prerequisite_of', 'skill.sieve-tuning'),
  R('skill.bench-sense', 'prerequisite_of', 'skill.proof-marking'),
  R('skill.bench-sense', 'prerequisite_of', 'skill.bonewright', 'cross-tree: surgery is engineering here'),
  R('skill.bench-sense', 'prerequisite_of', 'skill.load-binding', 'cross-tree: a binder who cannot read a load path is guessing'),
  R('skill.heat-reading', 'prerequisite_of', 'skill.mirror-cutting'),
  R('skill.heat-reading', 'prerequisite_of', 'skill.proof-marking'),
  R('skill.heat-reading', 'prerequisite_of', 'skill.charge-blending'),
  R('skill.cable-and-drum', 'prerequisite_of', 'skill.lattice-work'),
  R('skill.cable-and-drum', 'prerequisite_of', 'skill.overhaul'),
  R('skill.pressure-fitting', 'prerequisite_of', 'skill.overhaul'),
  R('skill.sieve-tuning', 'prerequisite_of', 'skill.charge-blending'),
  R('skill.lattice-work', 'prerequisite_of', 'skill.overhaul'),
  R('skill.proof-marking', 'prerequisite_of', 'skill.false-proof'),
  R('skill.fence-work', 'prerequisite_of', 'skill.false-proof', 'cross-tree: the forgery is worthless without a buyer'),

  R('skill.ground-read', 'prerequisite_of', 'skill.spore-lore'),
  R('skill.ground-read', 'prerequisite_of', 'skill.marsh-footing'),
  R('skill.ground-read', 'prerequisite_of', 'skill.yoke-and-tether'),
  R('skill.ground-read', 'prerequisite_of', 'skill.quiet-ground'),
  R('skill.weather-eye', 'prerequisite_of', 'skill.cold-camp'),
  R('skill.weather-eye', 'prerequisite_of', 'skill.the-far-walk'),
  R('skill.weather-eye', 'prerequisite_of', 'skill.storm-tapping', 'cross-tree: the column is weather before it is magic'),
  R('skill.spore-lore', 'prerequisite_of', 'skill.venom-work'),
  R('skill.spore-lore', 'prerequisite_of', 'skill.plague-reading'),
  R('skill.reagent-work', 'prerequisite_of', 'skill.venom-work', 'cross-tree: the antivenom and the murder share one bench'),
  R('skill.quiet-ground', 'prerequisite_of', 'skill.wire-and-snare'),
  R('skill.yoke-and-tether', 'prerequisite_of', 'skill.wire-and-snare'),
  R('skill.cold-camp', 'prerequisite_of', 'skill.the-far-walk'),
  R('skill.venom-work', 'prerequisite_of', 'skill.plague-reading'),
  R('skill.the-far-walk', 'prerequisite_of', 'skill.plague-reading'),

  R('skill.market-ear', 'prerequisite_of', 'skill.trade-cant'),
  R('skill.market-ear', 'prerequisite_of', 'skill.the-cold-read'),
  R('skill.plain-letters', 'prerequisite_of', 'skill.ledger-hand'),
  R('skill.plain-letters', 'prerequisite_of', 'skill.writ-craft'),
  R('skill.ledger-hand', 'prerequisite_of', 'skill.brokerage'),
  R('skill.ledger-hand', 'prerequisite_of', 'skill.writ-craft'),
  R('skill.ledger-hand', 'prerequisite_of', 'skill.chartering'),
  R('skill.trade-cant', 'prerequisite_of', 'skill.brokerage'),
  R('skill.trade-cant', 'prerequisite_of', 'skill.fence-work'),
  R('skill.the-cold-read', 'prerequisite_of', 'skill.fence-work'),
  R('skill.the-cold-read', 'prerequisite_of', 'skill.crowd-turning'),
  R('skill.brokerage', 'prerequisite_of', 'skill.bond-broking'),
  R('skill.brokerage', 'prerequisite_of', 'skill.chartering'),
  R('skill.writ-craft', 'prerequisite_of', 'skill.bond-broking'),
  R('skill.writ-craft', 'prerequisite_of', 'skill.chartering'),

  R('skill.toll-sense', 'prerequisite_of', 'skill.reagent-work'),
  R('skill.toll-sense', 'prerequisite_of', 'skill.scar-reading'),
  R('skill.toll-sense', 'prerequisite_of', 'skill.bleed-off'),
  R('skill.chalk-hand', 'prerequisite_of', 'skill.ward-cutting'),
  R('skill.ward-cutting', 'prerequisite_of', 'skill.bleed-off'),
  R('skill.ward-cutting', 'prerequisite_of', 'skill.load-binding'),
  R('skill.bleed-off', 'prerequisite_of', 'skill.grey-casting'),
  R('skill.bleed-off', 'prerequisite_of', 'skill.toll-shunting', 'the lawful skill is the gate on the unforgivable one'),
  R('skill.scar-reading', 'prerequisite_of', 'skill.grey-casting'),
  R('skill.scar-reading', 'prerequisite_of', 'skill.storm-tapping'),
  R('skill.scar-reading', 'prerequisite_of', 'skill.fault-walking'),
  R('skill.grey-casting', 'prerequisite_of', 'skill.fault-walking'),
  R('skill.load-binding', 'prerequisite_of', 'skill.fault-walking'),

  /* ---------------------------------------------------------------- */
  /* Unlocks: what a skill puts within reach                            */
  /* ---------------------------------------------------------------- */

  R('skill.slow-match', 'unlocks', 'item.springlock', 'the only skill that makes a spring-driven bolt pistol reliable'),
  R('skill.charge-blending', 'unlocks', 'item.nitre-cask', 'licensed blasting casks, tracked by the barrel and the ounce'),
  R('skill.plate-and-seam', 'unlocks', 'item.bastion-jack', 'fitting and field repair of splint brigandine'),
  R('skill.plate-and-seam', 'unlocks', 'item.ballast-jacket', 'lead-weighted lattice kit that kills anyone who cannot wear it properly'),
  R('skill.ring-craft', 'unlocks', 'item.tallyblade', 'the blade is the account and the account is the fighter'),
  R('skill.ring-craft', 'unlocks', 'mechanic.ring-bond', 'reading a card for what it is actually buying'),
  R('skill.gallery-drill', 'unlocks', 'mechanic.severance-drill', 'the sequenced cut that seals a breached gallery'),
  R('skill.gallery-drill', 'unlocks', 'item.gallery-lath', 'swivel arbalest mounts bolted to the bridge galleries'),
  R('skill.dead-weight', 'unlocks', 'mechanic.mass-warrant', 'a carried person is billable mass'),
  R('skill.throat-work', 'unlocks', 'spell.weight-lending', 'how the quiet murders are actually done'),
  R('skill.bonewright', 'unlocks', 'spell.stillwater-draught', 'survivable surgery, at about one patient in nine'),
  R('skill.bonewright', 'unlocks', 'item.fever-clay', 'packing a wound with cultured karst clay'),

  R('skill.bench-sense', 'unlocks', 'machine.the-tally-engine', 'card-and-pin clearing gear no one else can diagnose'),
  R('skill.cable-and-drum', 'unlocks', 'machine.the-oxblood-hoists', 'the counterweighted hoists the terraces load on'),
  R('skill.pressure-fitting', 'unlocks', 'mechanic.conduit-hours', 'a slot is worthless without somebody who can work the line live'),
  R('skill.pressure-fitting', 'unlocks', 'machine.the-drawbench-vaults', 'tide-driven benches and their pressure gear'),
  R('skill.sieve-tuning', 'unlocks', 'mechanic.the-sift-line', 'mesh, slope, feed rate and pass count'),
  R('skill.sieve-tuning', 'unlocks', 'machine.the-sieve-cascade', 'nine graded screens, tuned or wasted'),
  R('skill.sieve-tuning', 'unlocks', 'item.sift-screen', 'rating and replacing mesh by count'),
  R('skill.heat-reading', 'unlocks', 'machine.the-frit-kiln', 'crown glass is a temperature problem before it is anything else'),
  R('skill.heat-reading', 'unlocks', 'machine.the-verdigris-hearth', 'reading the roar when a charge has taken'),
  R('skill.heat-reading', 'unlocks', 'recipe.crown-glass-blanks'),
  R('skill.mirror-cutting', 'unlocks', 'mechanic.the-mirror-rota', 'lumen-hours are set by whoever aims the train'),
  R('skill.mirror-cutting', 'unlocks', 'item.sunwell-mirror', 'and, in the wrong hands, light theft'),
  R('skill.mirror-cutting', 'unlocks', 'recipe.duct-mirror-resilvering'),
  R('skill.proof-marking', 'unlocks', 'item.assayers-tray', 'the stamped result card is worth more than the kit'),
  R('skill.proof-marking', 'unlocks', 'machine.the-assay-cage', 'setting balances against the sealed references'),
  R('skill.proof-marking', 'unlocks', 'recipe.sealed-assay-balance'),
  R('skill.false-proof', 'unlocks', 'item.cut-seal', 'a filed and recut seal signing writs it has no right to sign'),
  R('skill.lattice-work', 'unlocks', 'machine.the-strand-loom', 'cable laid faster than the lattice fatigues'),
  R('skill.lattice-work', 'unlocks', 'recipe.laid-lattice-cable'),
  R('skill.overhaul', 'unlocks', 'machine.the-mirror-ducts', 'raises the duct train ceiling, at a season of darkness'),
  R('skill.overhaul', 'unlocks', 'machine.the-ward-kilns', 'the only thaumic machine anyone has stripped and rebuilt'),
  R('skill.overhaul', 'unlocks', 'machine.the-sluice-hammers', 'the trip hammers at the weir throat'),

  R('skill.spore-lore', 'unlocks', 'food.gallery-cap', 'substrate, flush timing and spore load'),
  R('skill.spore-lore', 'unlocks', 'material.cudmother', 're-splitting a living gut culture every nine days'),
  R('skill.marsh-footing', 'unlocks', 'mechanic.the-remoor', 'assume anyone working a re-moor has it'),
  R('skill.marsh-footing', 'unlocks', 'item.moor-stake', 'a stake and a cord that turn a drifting raft into property'),
  R('skill.cold-camp', 'unlocks', 'food.cache-fat', 'siting, burying and finding a five-winter pit'),
  R('skill.the-far-walk', 'unlocks', 'mechanic.the-ration-board', 'overdraw and you owe the muster labour you cannot refuse'),
  R('skill.the-far-walk', 'unlocks', 'food.dew-melon', 'two days of water a fruit, carried as currency'),
  R('skill.weather-eye', 'unlocks', 'mechanic.the-high-carry', 'weather shuts the pass and voids the contract'),
  R('skill.weather-eye', 'unlocks', 'mechanic.the-bell-lines', 'calling the mistfall before it closes the approach'),
  R('skill.venom-work', 'unlocks', 'spell.yokebreak-draught', 'days of fight in a cup, and face-blindness after'),
  R('skill.plague-reading', 'unlocks', 'spell.lime-seal', 'the quarantine instrument, and what it costs the people inside'),
  R('skill.wire-and-snare', 'unlocks', 'spell.calling-the-run', 'the same commons logic, applied to the lamprey run', true),

  R('skill.market-ear', 'unlocks', 'food.stair-loaf', 'the loaf price is the basin’s index of unrest'),
  R('skill.ledger-hand', 'unlocks', 'mechanic.standing-ledger', 'the way to engage the Stair from the inside'),
  R('skill.ledger-hand', 'unlocks', 'item.stair-writ', 'pricing a sealed writ of credit before you take one'),
  R('skill.ledger-hand', 'unlocks', 'recipe.bonded-tally-card'),
  R('skill.writ-craft', 'unlocks', 'spell.the-witnessing', 'testimony fixed as admissible, once, at the cost of the memory'),
  R('skill.writ-craft', 'unlocks', 'mechanic.the-toll', 'lawful working is a filing before it is a working'),
  R('skill.bond-broking', 'unlocks', 'item.indenture-bond', 'valuing, transferring and voiding the paper that owns a person'),
  R('skill.bond-broking', 'unlocks', 'spell.debt-mark', 'the binding that enforces what the paper says'),
  R('skill.fence-work', 'unlocks', 'item.pale-dust', 'the fines trade runs on people who can explain a consignment'),
  R('skill.chartering', 'unlocks', 'item.factors-seal', 'a seal that can bind a house to a contract'),
  R('skill.chartering', 'unlocks', 'item.oxblood-coat', 'brass cuff tallies you are actually entitled to wear'),

  R('skill.toll-sense', 'unlocks', 'mechanic.the-toll', 'the read on the debt; untrained casters do not have it'),
  R('skill.chalk-hand', 'unlocks', 'spell.chalkline-ward', 'the workhorse boundary ward of the licensed trade'),
  R('skill.chalk-hand', 'unlocks', 'item.chalked-harness', 'slate plate whose lines must be redrawn every few days'),
  R('skill.ward-cutting', 'unlocks', 'mechanic.ward-load', 'rated tonnage, inspection date, named caster'),
  R('skill.ward-cutting', 'unlocks', 'item.ward-pin', 'a scribed pin holds a binding until it is drawn'),
  R('skill.ward-cutting', 'unlocks', 'recipe.ward-chalk-burning'),
  R('skill.load-binding', 'unlocks', 'spell.holdfast-binding', 'the bindings that keep the slabs off the street'),
  R('skill.load-binding', 'unlocks', 'item.bound-harness', 'permanent ward inlay, numbered on the collar'),
  R('skill.reagent-work', 'unlocks', 'spell.arrears-draught', 'hours of casting now, a collapse at a moment you do not choose'),
  R('skill.reagent-work', 'unlocks', 'material.quietmilk', 'stabilised in spirit within the hour or it turns'),
  R('skill.bleed-off', 'unlocks', 'material.quenchspar', 'a sink is a block that drinks until it saturates'),
  R('skill.scar-reading', 'unlocks', 'material.levin-salt', 'the brine sinks are only workable to somebody reading the gradient'),
  R('skill.scar-reading', 'unlocks', 'item.faultstone-needle', 'a needle that leans toward the Scar and fails near the source'),
  R('skill.grey-casting', 'unlocks', 'spell.the-souring', 'nothing metered, nothing filed, and an assayer who can convict you anyway'),
  R('skill.storm-tapping', 'unlocks', 'material.levin-salt', 'the lawful, taxed alternative the Assize would prefer you bought'),
  R('skill.fault-walking', 'unlocks', 'material.faultglass', 'sorted by ear, and possession is capital in three cities'),

  /* ---------------------------------------------------------------- */
  /* Used by: who in the world actually holds these                     */
  /* ---------------------------------------------------------------- */

  R('skill.set-and-brace', 'used_by', 'faction.pitchguard', 'drilled on a bridge with a sergeant shoving'),
  R('skill.close-work', 'used_by', 'npc.aylun-torgai', 'sixteen wins, all of them inside the reach'),
  R('skill.close-work', 'used_by', 'faction.low-tally', 'a knife is the only weapon that passes a gate search'),
  R('skill.long-arm', 'used_by', 'faction.pitchguard', 'two-wide lines on the trunk galleries'),
  R('skill.long-arm', 'used_by', 'faction.iron-sluice-company', 'a pike line is the cheapest way to hold a toll point'),
  R('skill.plate-and-seam', 'used_by', 'npc.saarik-rauda', 'gate-sergeant of the ninth gallery'),
  R('skill.slow-match', 'used_by', 'faction.pitchguard', 'issued to the gallery watch and to nobody else'),
  R('skill.slow-match', 'used_by', 'faction.red-writ', 'contracted companies carry what the client will licence'),
  R('skill.dead-weight', 'used_by', 'npc.perrine-orlaunt', 'she moves people down the mooring lines with no manifest entry'),
  R('skill.ring-craft', 'used_by', 'npc.aylun-torgai'),
  R('skill.ring-craft', 'used_by', 'faction.red-writ', 'a signature is a debt on your body'),
  R('skill.bonewright', 'used_by', 'npc.anthimos-vellani', 'the private ward in the terraced quarter'),
  R('skill.gallery-drill', 'used_by', 'faction.pitchguard'),
  R('skill.gallery-drill', 'used_by', 'npc.aune-mustsalu', 'she signs the severance order herself rather than delegate it'),
  R('skill.throat-work', 'used_by', 'faction.red-writ', 'gates the quieter contracts on it and issues nothing', true),
  R('skill.last-rank', 'used_by', 'faction.pitchguard', 'taught at the trunk redoubts, used about once a generation'),

  R('skill.bench-sense', 'used_by', 'npc.brask-vellmar', 'he failed the No. 3 main cable and kept the strand samples'),
  R('skill.bench-sense', 'used_by', 'npc.melitta-aspri', 'she knows exactly how far the Orrery has drifted'),
  R('skill.bench-sense', 'used_by', 'npc.aubran-ferrieu', 'a stripped mass-registrar still reads a lattice better than most'),
  R('skill.heat-reading', 'used_by', 'npc.toval-cherek', 'he knows which of his shorted links will fail'),
  R('skill.cable-and-drum', 'used_by', 'npc.brask-vellmar', 'his signature is what lets the terraces load'),
  R('skill.cable-and-drum', 'used_by', 'npc.doret-halvane', 'she can find anyone for the price of a cable inspection'),
  R('skill.pressure-fitting', 'used_by', 'faction.conduit-college', 'no conduit is lawful without their seal'),
  R('skill.sieve-tuning', 'used_by', 'npc.tazrit-nourem', 'three towers on the Great Sieve'),
  R('skill.sieve-tuning', 'used_by', 'faction.pale-assay'),
  R('skill.lattice-work', 'used_by', 'faction.mooring-assize', 'licensed by the season and revoked by the shift'),
  R('skill.lattice-work', 'used_by', 'npc.cesille-vaudry', 'she is forging the tonnage the crews are working against'),
  R('skill.mirror-cutting', 'used_by', 'npc.iratze-zubiate', 'two hundred ducted mirrors aligned by hand'),
  R('skill.mirror-cutting', 'used_by', 'faction.mirror-assembly'),
  R('skill.proof-marking', 'used_by', 'faction.pale-assay', 'it stamps what a find is worth before it leaves the Pans'),
  R('skill.proof-marking', 'used_by', 'faction.concord-of-weights', 'marks registered against the Brass Standard'),
  R('skill.false-proof', 'used_by', 'npc.halvo-sarn', 'the private index of every permit he has backdated', true),
  R('skill.false-proof', 'used_by', 'faction.low-tally', 'the second ledger needs stamps the first will honour', true),
  R('skill.charge-blending', 'used_by', 'faction.iron-sluice-company', 'gallery cutting and gate demolition both'),
  R('skill.overhaul', 'used_by', 'faction.conduit-college', 'it holds the authority to stop a machine, which is the real asset'),

  R('skill.ground-read', 'used_by', 'npc.vetla-torvik', 'she sells the reading, not the route'),
  R('skill.weather-eye', 'used_by', 'npc.kavel-uur', 'the only fixed schedule across the Cinder Waste margin'),
  R('skill.spore-lore', 'used_by', 'npc.bedel-lehun', 'the violet strain that is not on the city’s list'),
  R('skill.marsh-footing', 'used_by', 'npc.gwill-ossekind', 'he cut the notched staves and did not come back'),
  R('skill.marsh-footing', 'used_by', 'faction.moorstone-compact'),
  R('skill.marsh-footing', 'used_by', 'npc.sabbe-sixteen-knot'),
  R('skill.yoke-and-tether', 'used_by', 'npc.sukhet-daral', 'whatever the crowd has not seen before'),
  R('skill.yoke-and-tether', 'used_by', 'npc.kavel-uur'),
  R('skill.quiet-ground', 'used_by', 'npc.vetla-torvik', 'the maintenance run that reaches the fourth gallery without a gate'),
  R('skill.quiet-ground', 'used_by', 'npc.perrine-orlaunt'),
  R('skill.cold-camp', 'used_by', 'faction.bonewax-post', 'sealed couriers cross the north in winter or the post stops'),
  R('skill.venom-work', 'used_by', 'npc.sukhet-daral', 'the separated gland and what the Ring pays for it'),
  R('skill.wire-and-snare', 'used_by', 'npc.vetla-torvik', 'poaching lines, and she is careful about what else she sets', true),
  R('skill.wire-and-snare', 'used_by', 'faction.low-tally', 'the cargo that walks aboard is taken off a road first', true),
  R('skill.the-far-walk', 'used_by', 'npc.kavel-uur'),
  R('skill.the-far-walk', 'used_by', 'npc.sahat-belek', 'he plans for nine days and walks for eight'),
  R('skill.the-far-walk', 'used_by', 'faction.bonewax-post'),
  R('skill.plague-reading', 'used_by', 'npc.anthimos-vellani', 'three patients and a ship he can name'),

  R('skill.market-ear', 'used_by', 'npc.anwe-halduri', 'four visits a year to the karst markets, never a night’s stay'),
  R('skill.plain-letters', 'used_by', 'faction.bonewax-post'),
  R('skill.plain-letters', 'used_by', 'npc.ilke-samarost', 'she could read better than her employers were comfortable with'),
  R('skill.ledger-hand', 'used_by', 'npc.wessel-ondriek', 'the reserve is a fiction and he keeps the books that say so'),
  R('skill.ledger-hand', 'used_by', 'npc.ossane-gorbea', 'light-hours are issued by seal and recorded by ledger'),
  R('skill.ledger-hand', 'used_by', 'faction.concord-of-weights'),
  R('skill.trade-cant', 'used_by', 'faction.bonewax-post', 'a sealed letter is worthless if the courier cannot ask the way'),
  R('skill.trade-cant', 'used_by', 'npc.anwe-halduri'),
  R('skill.the-cold-read', 'used_by', 'npc.doret-halvane', 'twelve harmless questions and a watch on which one lands'),
  R('skill.the-cold-read', 'used_by', 'npc.berke-chagra'),
  R('skill.brokerage', 'used_by', 'npc.sabbe-sixteen-knot', 'one season to make a purchase look like a judgement'),
  R('skill.brokerage', 'used_by', 'faction.bondwrights-hall'),
  R('skill.writ-craft', 'used_by', 'npc.halvo-sarn', 'every legal working in the Magic City crosses his desk'),
  R('skill.writ-craft', 'used_by', 'faction.bondwrights-hall', 'the enforceable-ports clause is the whole product'),
  R('skill.fence-work', 'used_by', 'faction.low-tally', 'untaxed cargo across the Drown, the Pans and the Ascent'),
  R('skill.fence-work', 'used_by', 'npc.dagren-hoyle', 'a disused sluice worked in the slack hour', true),
  R('skill.bond-broking', 'used_by', 'faction.bondwrights-hall', 'writes, prices and resells the paper'),
  R('skill.bond-broking', 'used_by', 'npc.tazrit-nourem', 'physical papers on a third of the pan crews'),
  R('skill.bond-broking', 'used_by', 'npc.berke-chagra', 'he holds paper on half the fighters and most of the stewards'),
  R('skill.crowd-turning', 'used_by', 'faction.standing-hour', 'its stewards decide which strikes are permitted to win'),
  R('skill.crowd-turning', 'used_by', 'npc.berke-chagra', 'professionally, over the tiers'),
  R('skill.chartering', 'used_by', 'faction.concord-of-weights'),
  R('skill.chartering', 'used_by', 'faction.bondwrights-hall'),

  R('skill.toll-sense', 'used_by', 'faction.fetterhouse', 'it examines for this before it examines for anything else'),
  R('skill.chalk-hand', 'used_by', 'faction.fetterhouse'),
  R('skill.ward-cutting', 'used_by', 'npc.ysme-drannik', 'she knows which two of the nine chains are already dead'),
  R('skill.ward-cutting', 'used_by', 'faction.fetterhouse'),
  R('skill.reagent-work', 'used_by', 'npc.anthimos-vellani'),
  R('skill.scar-reading', 'used_by', 'npc.sahat-belek', 'it is how he recognised what the crates were'),
  R('skill.bleed-off', 'used_by', 'faction.fetterhouse', 'the licence is the leash'),
  R('skill.load-binding', 'used_by', 'npc.ysme-drannik', 'at the top of the trade and now unable to work'),
  R('skill.load-binding', 'used_by', 'faction.mooring-assize'),
  R('skill.grey-casting', 'used_by', 'faction.low-tally', 'unmetered work for people who count differently', true),
  R('skill.toll-shunting', 'used_by', 'faction.red-writ', 'a contract that discharges into somebody else', true),
  R('skill.storm-tapping', 'used_by', 'faction.mooring-assize', 'barred on the lattice, studied by the Assize anyway'),
  R('skill.fault-walking', 'used_by', 'npc.ysme-drannik', 'the only living person who has the number'),

  /* ---------------------------------------------------------------- */
  /* Where the trees touch the map                                      */
  /* ---------------------------------------------------------------- */

  R('skill.gallery-drill', 'related_to', CITY.treeCity, 'the city’s signature training'),
  R('skill.lattice-work', 'related_to', CITY.skyCity, 'the most valuable and shortest-lived profession on the continent'),
  R('skill.pressure-fitting', 'related_to', CITY.mediterranean, 'the trade the licensing regime is built around'),
  R('skill.sieve-tuning', 'related_to', CITY.siftingCity, 'the tuning decides what the crews breathe'),
  R('skill.mirror-cutting', 'related_to', CITY.caveAgrarian, 'one degree of error is a dead gallery'),
  R('skill.ring-craft', 'related_to', CITY.arenaCity),
  R('skill.ledger-hand', 'related_to', CITY.gildedAscent, 'double entry is what the hub actually runs on'),
  R('skill.marsh-footing', 'related_to', CITY.floatingSwamp),
  R('skill.ward-cutting', 'related_to', CITY.magicCity),
  R('skill.load-binding', 'related_to', CITY.magicCity),
  R('skill.fault-walking', 'related_to', CITY.magicCity, 'endgame content, and the price is permanent'),
  R('skill.the-far-walk', 'related_to', CITY.orath, 'the Ration Board is what a crossing is priced against there'),
  R('skill.weather-eye', 'related_to', CITY.oruvai, 'weather that shuts the pass voids the carry contract'),
  R('skill.weather-eye', 'related_to', CITY.kethVeyra, 'calling the mistfall before it closes the approach'),
  R('skill.fence-work', 'related_to', CITY.blackWeir, 'the weir treats it as an unpaid toll rather than a theft'),
  R('skill.scar-reading', 'related_to', REGION.aethericScar, 'the gate on every site inside the ward line'),
  R('skill.storm-tapping', 'related_to', REGION.anvilShelf, 'the column is a place and a weather condition, not a component'),
  R('skill.cold-camp', 'related_to', REGION.borealCrown, 'the survival gate north of the treeline'),
  R('skill.marsh-footing', 'related_to', REGION.theDrown),
  R('skill.spore-lore', 'related_to', REGION.hollowKarst, 'the entry point for the world’s unusual biology'),
  R('skill.the-far-walk', 'related_to', REGION.cinderWaste, 'water planning, and knowing when to turn back'),
  R('skill.quiet-ground', 'related_to', 'creature.sentinel-tick', 'the biological hard counter to a silent approach'),
  R('skill.yoke-and-tether', 'related_to', 'creature.yokeback', 'separating the pair triggers the frenzy the Ring buys'),
  R('skill.ledger-hand', 'related_to', 'creature.ledger-moth', 'rank 3 reconstruction is the counter to a released jar'),
  R('skill.chalk-hand', 'related_to', 'creature.chalk-louse', 'the line stays visible and the ward is gone'),
  R('skill.mirror-cutting', 'related_to', 'creature.mirror-swift', 'the ducts are also a nesting site, and the nests are quota’d'),
]
