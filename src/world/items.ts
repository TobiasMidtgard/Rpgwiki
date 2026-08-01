/**
 * Items and equipment.
 *
 * Thirty entries covering the manifest's `items` block: weapons, armour, the
 * tools the world actually runs on, the consumables that shorten lives, and
 * the four pieces of paper that decide who owns whom.
 *
 * PRICING CONVENTION. No coin standard is settled anywhere in the seed, so
 * every `value` here is quoted in day-wages — one day of unskilled labour at
 * the Gilded Ascent hoist yards, which is the only wage rate the seed states
 * often enough to anchor against. If a denomination is ever decided, the
 * conversion is one edit per entry. See `item.stair-writ` for the open
 * question.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* WEAPONS                                                           */
  /* ================================================================ */

  E({
    id: 'item.palisade-arbalest',
    type: 'item',
    name: 'Palisade Arbalest',
    aka: ['gallery bow', 'a number'],
    status: 'draft',
    summary: 'Windlass crossbow on a boleheart lath, issued to the Tree City gallery watch and re-issued on death.',
    tags: ['weapon', 'tree-city', 'military', 'issued'],
    fields: {
      overview:
        'A heavy windlass crossbow built around a laminated lath of [[material.blackbole-timber|blackbole heartwood]], pitch-bonded and lacquered against the Greatwood damp. It is not a good weapon in open field. It spans slowly, it is heavy for its reach, and a wet lath loses a fifth of its cast. What it does is put a bolt through a shield at forty metres from a rope bridge that is swinging under you, which is the only fight [[faction.pitchguard|the Pitchguard]] expects to have.\n\nEvery lath carries a stamped number. The number belongs to the weapon, not the soldier, and it is re-issued when the soldier stops needing it. The gallery watch calls a bow by its number rather than its owner because the numbers outlast the owners, and the issue roll of any one gallery, read backwards, is a casualty list nobody had to write.\n\nPlayers meet these first as an obstacle and then as an acquisition problem. There is no market in them. A palisade arbalest in a stranger\'s hands anywhere inside the pale is a dead soldier\'s bow, and the [[npc.saarik-rauda|gate-sergeants]] treat the question as settled before it is asked.',
      itemType: 'Weapon',
      rarity: 'Common',
      value: '34 day-wages to replace, charged against the gallery, never against a person',
      weight: '6.8 kg strung, 8.1 kg with windlass and quiver of twelve',
      stats: [
        row({ stat: 'Draw weight', value: '480 kg at the nut' }),
        row({ stat: 'Span time', value: '22 seconds by windlass, one hand free at no point' }),
        row({ stat: 'Effective range', value: '90 m from a fixed rest, 40 m off a moving bridge' }),
        row({ stat: 'Bolt', value: '340 g, 310 mm, square-section head' }),
        row({ stat: 'Lath life', value: 'about 4,000 spans before the laminate creeps and the cast drops' }),
        row({ stat: 'Wet penalty', value: '-20% cast after four hours of rain; the lacquer buys the four hours' }),
      ],
      effects: [
        'Punches laminate and scute at 40 m; will not defeat plate at any range',
        'Cannot be spanned while moving, climbing or holding a line',
        'Numbered lath: possession outside the Tree City levy is prosecuted as theft from the dead',
      ],
      origin: 'Tree City armouries, the Spanworks',
      legalStatus: 'Restricted',
      legalNotes:
        'Inside the Tree City pale the arbalest is issue kit and carrying one without a matching number on the roll is a hanging matter, tried by the Marshalcy and not by any court. Outside the pale it is legal in every settlement that has an opinion, and the Gilded Ascent hoist yards buy condemned laths openly for the timber. [[npc.vetla-torvik|Vetla Torvik]] sells working ones to anyone with the price, which is the only reliable supply and is exactly why the Pitchguard wants her.',
      recipe: ['recipe.pitch-laminated-limb'],
      materials: ['material.blackbole-timber', 'material.blister-bar', 'material.mirelac'],
      requiredSkills: ['skill.set-and-brace', 'skill.bench-sense'],
      upgradesTo: ['item.gallery-lath'],
      sellers:
        'Not sold. Issued at the Spanworks against a number and recovered from the body. The three real sources are the deserter trade outside the palisade, condemned-lath auctions in the Pitch Yards where the lath is sold for firewood and occasionally is not firewood, and the [[faction.low-tally|Low Tally]], which moves perhaps forty a year down the Karst Fork and charges eight times the replacement value for them.',
      devNotes:
        PROPOSAL('The numbered lath, the re-issue practice, the roll-as-casualty-list and every figure in the stats table are proposed. The manifest establishes only the boleheart lath, the windlass and the re-issue on death.') +
        '\n\nDESIGN INTENT: the entry-level military weapon of the setting should be slow, heavy and bureaucratic. If a party wants ranged power early, they should have to steal it from an institution that counts. The number is the hook: it is the reason a looted bow is a liability rather than a prize, and it makes every gallery skirmish leave evidence behind.',
    },
  }),

  E({
    id: 'item.gallery-lath',
    type: 'item',
    name: 'Gallery Lath',
    aka: ['the swivel', 'bridge gun'],
    status: 'draft',
    summary: 'Swivel-mounted two-crew arbalest bolted to bridge galleries; the palisade arbalest grown up.',
    tags: ['weapon', 'tree-city', 'crew-served', 'fortification'],
    fields: {
      overview:
        'The same idea at four times the scale and bolted down. A doubled boleheart lath with imported prod steel scarfed into the belly, mounted on a swivel yoke through six bolts into a gallery beam, spanned by two crew on a geared windlass. It throws a two-kilogram bolt the length of a bridge span and through whatever is standing on it.\n\nThe lath is not the interesting part. The mount is. A gallery lath fixes a firing arc into the structure of the city, and the arc is surveyed and minuted before a single bolt is drilled, because a swivel that can bear on a neighbouring gallery is a political object. [[faction.pitchguard|The Pitchguard]] has approved 210 mounts across the rope-bridge network and refused eleven, and the eleven refusals are a readable map of which quarters the Marshalcy does not trust.\n\nWhen [[mechanic.severance-drill|the Severance Drill]] runs, the laths are what hold the far end of a cut bridge while the cutting is done. That is their real function and the reason nobody argues about the cost.',
      itemType: 'Weapon',
      rarity: 'Scarce',
      value: '410 day-wages for the engine, plus the mount survey, which costs more in bribes than in labour',
      weight: '146 kg on the yoke; the yoke and bolts add 60 kg to the beam',
      stats: [
        row({ stat: 'Draw weight', value: '1,900 kg' }),
        row({ stat: 'Span time', value: '55 seconds, two crew; 2 minutes 40 with one' }),
        row({ stat: 'Bolt', value: '2.1 kg, 900 mm, iron-shod' }),
        row({ stat: 'Effective range', value: '240 m; the useful range is one bridge span, about 70 m' }),
        row({ stat: 'Traverse', value: '70 degrees, set by the survey and pinned; repinning is a Marshalcy offence' }),
        row({ stat: 'Sustained rate', value: '11 bolts an hour before the crew stops being able to wind' }),
      ],
      effects: [
        'Denies a bridge span outright; a covered span cannot be rushed by infantry',
        'Cannot be relaid: 20 minutes to unbolt, and it goes off the mount in three pieces',
        'Fires on a surveyed arc only, which means every gallery lath has a blind side somebody has memorised',
      ],
      origin: 'Tree City, the Spanworks; mounts fixed to the rope bridges throughout the pale',
      legalStatus: 'Restricted',
      legalNotes:
        'A Marshalcy weapon, mounted by warrant. Outside the Tree City there are eleven known laths on the continent: four bought by [[faction.iron-sluice-company|the Iron Sluice Company]] for the Weir Gates and legally held, three in the Arena City under-stands where their legality has never been tested, and four unaccounted. The Gilded Ascent bans crew-served engines above the fourth terrace on fire grounds, which is not a fire rule and everyone knows it.',
      recipe: ['recipe.pitch-laminated-limb', 'recipe.redoubt-ballista'],
      materials: ['material.blackbole-timber', 'material.blister-bar', 'material.stairwire'],
      requiredSkills: ['skill.gallery-drill', 'skill.cable-and-drum', 'skill.long-arm'],
      upgradesTo: TBD('Is there a step above the gallery lath, or does the Tree City jump straight to the redoubt ballista and leave a gap in the ladder?'),
      sellers:
        'Sold outward twice in living memory, both times to the Black Weir, both times with the traverse pinned at 30 degrees by the sellers as a condition of sale. The Spanworks will quote a price to any city that asks and has quoted eleven and sold two.',
      devNotes:
        PROPOSAL('The 210 approved mounts, the eleven refusals, the surveyed arc and the pinning rule are proposed. The manifest establishes the two-crew swivel, the boleheart lath, the imported prod steel and the bridge-gallery mounting.') +
        '\n\nDESIGN INTENT: the upgrade from the palisade arbalest is deliberately not portable. Scaling up in this world means losing mobility and gaining paperwork. The refused mounts are the best hook here: a party that gets the survey book learns which quarters the Marshalcy considers hostile before the Marshalcy admits it, which feeds straight into [[quest.the-felling-order|The Felling Order]].',
    },
  }),

  E({
    id: 'item.tallyblade',
    type: 'item',
    name: 'Tallyblade',
    aka: ['collar blade', 'the notched'],
    status: 'draft',
    summary: 'Arena short falx notched by the ring-clerks, one notch per sanctioned kill; the notches are a debt ledger.',
    tags: ['weapon', 'arena-city', 'indenture', 'dark'],
    fields: {
      overview:
        'A short forward-curved falx, 480 millimetres of blade on a brass collar, issued to a fighter when they sign. The collar is the document. Every sanctioned kill is cut into it by a ring-clerk at the scale-house within an hour of the bout, and every notch strikes an agreed sum off the fighter\'s bond under [[mechanic.ring-bond|the Ring Bond]].\n\nWhat this means in practice is that the weapon is the account, the account is the person, and the person is carrying both into a fight. A fighter who loses their blade in the sand has lost their record of payment as well as their weapon, and the replacement fee goes onto the bond. [[npc.berke-chagra|Berke Chagra]] has never had to bribe a fighter in his life; he simply notes which of them are one notch from a stipulation change and prices the card accordingly.\n\nThe notches are cut, checked and countersigned, and the whole apparatus is honest. That is the point. There is no fraud in a tallyblade. The arithmetic is correct and the arithmetic is the atrocity.',
      itemType: 'Weapon',
      rarity: 'Common',
      value: '26 day-wages, charged to the fighter; the brass collar alone is 9 of that',
      weight: '1.1 kg, of which the collar is 90 g',
      stats: [
        row({ stat: 'Blade', value: '480 mm, forward curve, single edge, no point worth the name' }),
        row({ stat: 'Notch value', value: '4 day-wages off the bond, posted by the Chamber and revised every spring' }),
        row({ stat: 'Collar capacity', value: '31 notches; a full collar is struck off and a new one fitted' }),
        row({ stat: 'Replacement fee', value: '30 day-wages onto the bond, plus a bout' }),
        row({ stat: 'Filed notch', value: 'detectable by depth; the clerks cut to 1.2 mm and a file leaves 0.6' }),
      ],
      effects: [
        'Fast in the bind and useless at reach; built for the stipulations of the Sunken Ring, not for a road',
        'The collar is legally the bond record: losing it is a debt event, not a kit event',
        'Carrying one outside the Arena City is public proof that somebody owns you',
      ],
      origin: 'Arena City, the scute yards ring forge, under Chamber warrant',
      legalStatus: 'Varies by city',
      legalNotes:
        'Arena City: lawful, required, and the collar is admissible in the Writ Court as evidence of the bond. Sifting City: honoured, because the labour registries there recognise Arena bonds and will hold a runaway against the collar. Mediterranean City: a tallyblade presented in the port is evidence against whoever is holding the other end of the bond, and the harbour board has voided nine on that basis in four years. Gilded Ascent: the blade is legal, the bond behind it is enforceable, and the Concord is careful to keep those two facts in separate sentences.',
      recipe: ['recipe.hammered-bar-iron'],
      materials: ['material.blister-bar', 'material.steppe-scute'],
      requiredSkills: ['skill.ring-craft', 'skill.close-work'],
      upgradesTo: ['item.quitblade'],
      sellers:
        'Not sold to fighters; issued against signature at the scale-house. Sold freely to collectors and to houses that keep fighters, and the Banner Streets do a brisk trade in retired collars with the notches still in them, which is legal, tasteless and extremely popular in the Sky City.',
      devNotes:
        PROPOSAL('The 31-notch collar, the posted notch value, the replacement fee and the file-depth tell are proposed. The manifest establishes the notched arena falx, the ring-clerk cutting and the notches-as-debt-ledger.') +
        '\n\nDESIGN INTENT: this is the setting\'s central dark theme made into an object a player can hold. Do not write it as cruelty. Write it as accounting. The scale-house clerks are polite, the sums are right, and a fighter can work out to the day when they will be free if they keep killing at the current rate. [[npc.aylun-torgai|Aylun Torgai]] did that arithmetic and it was correct, and she is still owned, because the seal on her manumission was mis-stamped.',
    },
  }),

  E({
    id: 'item.quitblade',
    type: 'item',
    name: 'Quitblade',
    aka: ['the clean falx', 'quit'],
    status: 'draft',
    summary: 'Unmarked falx struck for a fighter who has cleared their indenture; carrying one proves you are not owned.',
    tags: ['weapon', 'arena-city', 'freedom', 'status'],
    fields: {
      overview:
        'The same blade with nothing written on it. When a bond is discharged the ring forge takes the spent [[item.tallyblade|tallyblade]], cuts the collar off in front of the holder, and strikes a new falx from the reclaimed steel with one mark on the tang: the forge\'s own proof, nine millimetres, struck cold in a single blow.\n\nThe blade is worth what any good short falx is worth. The mark is worth a life. It is the only portable proof of manumission in the Arena City, because the paper stays in the contract vault three floors under the sand and the vault does not issue copies. A freed fighter who loses the quitblade has, in every practical sense, lost their freedom, and the forge will not strike a second.\n\nThe obvious crime is the obvious crime. Forged quitblades are struck in the Banner Streets by people who are quite good at it, and the tell is that a cold strike into finished steel raises a burr the copies have to grind off. A ring-clerk knows the burr by feel. A gate guard in the Sifting City does not.',
      itemType: 'Weapon',
      rarity: 'Scarce',
      value: '60 day-wages as a blade; unpriceable as a document, which is why the forgery trade exists',
      weight: '1.05 kg',
      stats: [
        row({ stat: 'Blade', value: '480 mm, reforged from the tallyblade it replaces' }),
        row({ stat: 'Proof mark', value: '9 mm, struck cold, single blow, raised burr left in place' }),
        row({ stat: 'Forgery tell', value: 'ground burr; about 4 in 5 copies fail a clerk\'s thumb, 1 in 20 fail a gate guard' }),
        row({ stat: 'Issue', value: 'roughly 30 struck a year against some 1,400 standing bonds' }),
      ],
      effects: [
        'Proof of manumission in the Arena City and nowhere else automatically',
        'Cannot be replaced: the forge strikes one per discharged bond, ever',
        'Holding a forged one is a capital matter and the evidence is the object in your hand',
      ],
      origin: 'Arena City, the scute yards ring forge; reforged from a spent tallyblade',
      legalStatus: 'Restricted',
      legalNotes:
        'Arena City: lawful and definitive. Striking or holding a forged quitblade is one of two crimes the Chamber executes for, the other being killing outside a card. Sifting City: not honoured at all, because [[npc.tazrit-nourem|the sift-mistresses]] recognise Arena bonds but not Arena manumissions, an asymmetry that is either an oversight or the entire policy. Mediterranean City: honoured immediately and gratefully, since it saves the harbour board the trouble of voiding a bond.',
      recipe: ['recipe.hammered-bar-iron'],
      materials: ['material.blister-bar'],
      requiredSkills: ['skill.proof-marking', 'skill.ring-craft'],
      upgradesTo: TBD('Should a quitblade have a further step at all, or is the point that freedom is the end of the ladder?'),
      sellers:
        'Never sold lawfully. Forged in the Banner Streets at 200 to 400 day-wages depending on how well the buyer can describe a fighter who plausibly earned one. [[faction.low-tally|The Low Tally]] does not touch this trade, on the grounds that the Chamber pursues it further than it pursues cargo.',
      devNotes:
        PROPOSAL('The reforging practice, the cold-struck proof mark, the burr tell and the thirty-a-year issue rate are proposed. The manifest establishes the unmarked falx, the reforging from a spent tallyblade and forged copies as the obvious crime.') +
        '\n\nDESIGN INTENT: the top of this chain is not a better weapon. It is the same weapon with the ownership taken off, and it is worth more. That is the whole thesis of the Arena City in one object. Note for quest authors: recovering [[npc.aylun-torgai|Aylun Torgai]]\'s voided manumission and getting her a quitblade are two separate jobs, and the second is the one that gets her through a gate.',
    },
  }),

  E({
    id: 'item.scourglass-sabre',
    type: 'item',
    name: 'Scourglass Sabre',
    aka: ['three-fight', 'sawtooth'],
    status: 'draft',
    summary: 'Salt-glass laminate blade, murderous for three fights, then it chips to a saw and gets sold on again.',
    tags: ['weapon', 'sifting-city', 'disposable', 'cheap'],
    fields: {
      overview:
        'A steel spine with cheeks of salt-glass laminate fused off [[landmark.the-great-sieve|Great Sieve]] tailings, ground to an edge that no steel in the world will hold. For about three bouts it is the sharpest thing anyone in the room has ever been cut by. After that the glass chips out in crescents and the blade becomes a saw, which is worse to be hit with and much worse to be treated for.\n\nThe crucible sheds turn out perhaps 900 a year as a by-product of work they are doing anyway, and the Arena City buys nearly all of them for the undercard. A sabre that has done its three fights is not thrown away. It is sold on, at a sixth, to somebody who cannot afford three fights\' worth of edge, and then sold on again. A blade five owners deep is a bar of glass stubs that opens a wound nothing will close.\n\nThe ring forge will take a spent sabre in part-exchange against the collar fee of a [[item.tallyblade|tallyblade]], which is how most fighters acquire their first one and how the undercard feeds the bond trade.',
      itemType: 'Weapon',
      rarity: 'Common',
      value: '11 day-wages new; 2 day-wages spent, and there is always a buyer',
      weight: '0.9 kg',
      stats: [
        row({ stat: 'Blade', value: '720 mm, steel spine, 4 mm salt-glass laminate cheeks' }),
        row({ stat: 'Edge life', value: 'about 40 hard contacts, or three bouts of the Ring\'s standard card' }),
        row({ stat: 'Degraded state', value: 'serrated; wounds suppurate at roughly three times the rate of a clean cut' }),
        row({ stat: 'Shatter', value: '1 in 9 per bout after the fourth; the shards go into whoever is closest' }),
        row({ stat: 'Output', value: 'about 900 a year from three licensed crucible sheds' }),
      ],
      effects: [
        'Highest first-strike cut of any common weapon in the seed, for three fights',
        'Degrades permanently; there is no sharpening step, only replacement',
        'Chipped blades cause wounds that need [[item.fever-clay|fever clay]] or a surgeon, and usually get neither',
      ],
      origin: 'Sifting City, the crucible sheds; laminated off Great Sieve tailings',
      legalStatus: 'Legal',
      legalNotes:
        'Legal everywhere and unwelcome in two places for reasons that are not about violence. The Mediterranean City harbour board refuses them entry because a shedding blade puts glass into a working deck, and the Magic City bars them inside the ward line because glass dust reads on a chalk survey and ruins the survey. Selling a spent sabre as new is a fraud charge on Assay Row, prosecuted by [[faction.pale-assay|the Pale Assay]] about twice a year and committed continuously.',
      recipe: TBD('Which kiln actually laminates Sieve tailings into blade glass, and does that step belong to the Sifting City chain or to the Arena City armourers who buy the output?'),
      materials: ['material.pan-nitre', 'material.blister-bar'],
      requiredSkills: ['skill.heat-reading', 'skill.close-work'],
      upgradesTo: ['item.tallyblade'],
      sellers:
        'Sold by the crate in the Outbound Yard of the Sifting City at wholesale, and by the blade in the Banner Streets of the Arena City at four times that. Every second-hand rack on the continent has three or four, and the honest sellers turn the blade to the light before quoting.',
      devNotes:
        PROPOSAL('The steel-spine-and-glass-cheek construction, the 900-a-year figure, the part-exchange practice and every number in the stats table are proposed. The manifest establishes the salt-glass laminate, the three fights, the chipping to a saw and the resale.') +
        '\n\nDESIGN INTENT: this is the cheap weapon, and cheap in this setting means it transfers its cost to somebody else. Treat the resale chain as the interesting part: a party can trace a specific sabre back through five owners, and the trail is a tour of everyone the Arena City has finished with. Chain note: sabre to tallyblade to quitblade is a progression of legal status, not of damage numbers, and it should stay that way.',
    },
  }),

  E({
    id: 'item.springlock',
    type: 'item',
    name: 'Springlock',
    aka: ['the quiet', 'college pistol'],
    status: 'draft',
    summary: 'Spring-driven bolt pistol from the Mediterranean City; quiet, and illegal to carry spanned on the Counting Stair.',
    tags: ['weapon', 'mediterranean-city', 'restricted', 'precision'],
    fields: {
      overview:
        'A short bolt pistol driven by a stack of four [[item.governor-spring|governor springs]] in a bronze cage, spanned by a folding lever under the barrel. No powder, no match, no smoke, no report beyond the sound of a door being shut hard. It is not more lethal than a crossbow. It is quieter than everything, and it works indoors, and those two facts have shaped the law around it in every city that has thought about it.\n\nThe Conduit College licenses the shops rather than the weapons, which means the maker\'s stamp on the cage is a traceable object and an unstamped springlock implicates a bench rather than a buyer. This is deliberate. The College would rather prosecute four workshops than four thousand owners, and the policy has held for thirty years by the simple method of making the springs impossible to source elsewhere.\n\nIts weaknesses are honest ones. The springs take a set if left spanned overnight, they lose a fifth of their rate below freezing, and a spring stack that has been left spanned and then frozen will throw a bolt about as far as a thrown bolt. Nobody who carries one carries it ready, which is the only reason the Ascent ban is enforceable at all.',
      itemType: 'Weapon',
      rarity: 'Scarce',
      value: '190 day-wages from a licensed bench, and about 600 from anyone else',
      weight: '1.6 kg spanned, 1.55 kg slack',
      stats: [
        row({ stat: 'Overall length', value: '330 mm with the lever folded' }),
        row({ stat: 'Bolt', value: '40 g, 130 mm; ten to a sealed tin' }),
        row({ stat: 'Muzzle velocity', value: 'about 95 m/s at full span' }),
        row({ stat: 'Effective range', value: '18 m; beyond 25 m it is a thrown object with extra steps' }),
        row({ stat: 'Span time', value: '9 seconds by lever, two hands' }),
        row({ stat: 'Spring life', value: '3,000 shots, then the stack is re-drawn at a licensed bench' }),
        row({ stat: 'Cold penalty', value: '-20% rate below freezing; -45% if it was left spanned' }),
      ],
      effects: [
        'Near-silent and smokeless: does not break a stealth approach and does not signal a room',
        'Cannot be carried spanned without degrading, which is a rules-level counter to always-ready pistols',
        'The cage stamp is a traceable maker mark; a recovered springlock names a workshop',
      ],
      origin: 'Mediterranean City, the Conduit Yards; four licensed spring-drawing benches',
      legalStatus: 'Restricted',
      legalNotes:
        'Gilded Ascent: carrying a spanned springlock above the fourth terrace is an offence in itself, whatever else you are doing, and the terrace watch may span-test on sight without cause. Sky City: permitted, weighed and entered on the mass warrant along with the bolt count, so an emptied tin is a question at the mast. Mediterranean City: the licence attaches to the bench, not the owner; an unstamped cage is prosecuted against the maker. Arena City: barred from the sand entirely, since a silent weapon ruins a card and the Chamber sells cards. Tree City: confiscated at the gate with everything else the Pitchguard does not understand.',
      recipe: ['recipe.drawn-wire-and-tube'],
      materials: ['material.blister-bar', 'material.orrery-bronze'],
      requiredSkills: ['skill.bench-sense', 'skill.heat-reading', 'skill.proof-marking'],
      upgradesTo: TBD('Is there a shoulder-stocked or magazine springlock above this, or does the College licence ceiling stop the design here on purpose?'),
      sellers:
        'Four benches in the Conduit Yards sell openly to anyone with a College counter-signature, which takes eleven days and names you on a list. Everyone else buys through [[faction.low-tally|the Low Tally]], which moves them west in barrels of table salt and charges three times face without apology.',
      devNotes:
        PROPOSAL('The four-spring stack, the bench licensing model, the span-test rule on the Stair and every figure here are proposed. The manifest establishes the spring-driven bolt pistol, the Mediterranean origin, the dependence on the governor spring and the Ascent restriction.') +
        '\n\nDESIGN INTENT: this is where the restrained-science-fiction ceiling gets tested, so it is deliberately built with two hard brakes. It is quiet rather than powerful, and it cannot be kept ready. If a designer later wants firearms, they should go through [[skill.slow-match|Slow Match]] and stay loud, slow and unreliable. The springlock is the precision-engineering answer and it should stay a specialist\'s tool, not a sidearm everyone has.',
    },
  }),

  /* ================================================================ */
  /* ARMOUR AND APPAREL                                                */
  /* ================================================================ */

  E({
    id: 'item.chalked-harness',
    type: 'item',
    name: 'Chalked Harness',
    aka: ['chalks', 'the weekly'],
    status: 'draft',
    summary: 'Slate plate whose ward-chalk lines must be redrawn every few days; stops the Scar, not a knife.',
    tags: ['armour', 'magic-city', 'maintenance', 'licensed'],
    fields: {
      overview:
        'Fourteen slate plates on a leather carrier, drilled at the corners for [[item.ward-pin|ward pins]], with the ward lines drawn across the plates in [[material.ward-chalk|ward chalk]] by hand. It is worn by anyone who has to work inside the Magic City\'s gradient for a living: chalk-row labourers, chain-house crews, the burners at [[machine.the-ward-kilns|the ward kilns]] who are rotated out on exposure rather than on shift length.\n\nIt is not armour. A knife goes through the carrier between plates without slowing, and the slate itself cracks under any real impact. What it does is hold a closed ward around a body for five to nine days, after which the lines go dead, and the wearer either redraws them or starts accruing. There is no warning when a line dies. There is a small violet tile of [[material.quenchspar|quenchspar]] at each shoulder that saturates as the harness works, and a competent wearer reads the tiles every morning the way a sailor reads a glass.\n\nThe part nobody puts on the label is that a saturated quenchspar tile fails all at once. Two shoulder tiles are two small rooms\' worth of discharge sitting on your collarbones, and the Fetterhouse\'s own guidance is to replace them at three quarters and to walk, not run, to the sink.',
      itemType: 'Armour',
      rarity: 'Common',
      value: '58 day-wages for the carrier and plates; the chalk is 3 a round and the round is the real cost',
      weight: '11 kg dressed; 12.4 kg with a full pin set and spare chalk',
      stats: [
        row({ stat: 'Plates', value: '14 slate, 6 mm, corner-drilled for twelve pins' }),
        row({ stat: 'Chalk round', value: '40 minutes by a trained hand; 3 hours by an untrained one, badly' }),
        row({ stat: 'Line life', value: '9 days dry, 5 days in the salt vats, 2 days in rain' }),
        row({ stat: 'Gradient held', value: 'closes a body against light and moderate Scar exposure; nothing at the fault face' }),
        row({ stat: 'Quenchspar tiles', value: '2 at the shoulders, 40 g each, replace at three quarters saturation' }),
        row({ stat: 'Physical protection', value: 'none worth stating; the plates crack and the carrier does not stop a blade' }),
      ],
      effects: [
        'Suppresses ambient aetheric accrual while the lines are live',
        'Fails silently: the wearer learns the lines are dead by accruing, not by noticing',
        '[[creature.chalk-louse|Chalk lice]] eat the lines overnight and leave the drawing looking intact',
      ],
      origin: 'Magic City, Chalk Row; carriers made anywhere, lines drawn under licence',
      legalStatus: 'Licensed',
      legalNotes:
        'Magic City: a harness must be drawn to a filed pattern by a licensed hand, and the filing is what is licensed, not the wearer. Drawing your own lines is unlicensed working under [[mechanic.the-toll|the Toll]] even though nothing is cast, which practitioners consider absurd and the [[faction.fetterhouse|Fetterhouse]] considers the whole point. Sifting City and Gilded Ascent: legal and unremarkable, sold as mining kit. Tree City: barred at the gate as worked magic, which means the Pitchguard confiscates protective equipment from people who then work unprotected.',
      recipe: ['recipe.ward-chalk-burning'],
      materials: ['material.ward-chalk', 'material.quenchspar'],
      requiredSkills: ['skill.chalk-hand', 'skill.toll-sense'],
      upgradesTo: ['item.bound-harness'],
      sellers:
        'Chalk Row sells carriers, plates and a first drawing as one price, and re-drawings on a standing weekly. Outside the Magic City the carrier is easy to buy and the drawing is not, so most harnesses west of the Scar are carriers with dead lines being worn for the look of the thing.',
      devNotes:
        PROPOSAL('The fourteen plates, the shoulder quenchspar tiles, the line lifetimes and the self-drawing offence are proposed. The manifest establishes the slate plate, the ward-chalk lines redrawn every few days and the fact that it stops the Scar and not a knife.') +
        '\n\nDESIGN INTENT: the setting needs one piece of protective equipment whose upkeep is the mechanic. The chalked harness is a subscription you wear. It also does the useful job of making [[mechanic.ward-load|Ward Load]] personal: a player who has spent four sessions redrawing their own lines understands in their bones why a city that has to redraw nine chains is in trouble.',
    },
  }),

  E({
    id: 'item.bound-harness',
    type: 'item',
    name: 'Bound Harness',
    aka: ['numbered', 'warden plate'],
    status: 'draft',
    summary: 'Chain-bound harness with permanent ward inlay, licensed to Magic City wardens and numbered on the collar.',
    tags: ['armour', 'magic-city', 'licensed', 'authority'],
    fields: {
      overview:
        'A chain carrier with the ward lines cut into the plates and inlaid with a [[material.levin-salt|levin salt]] compound rather than drawn in chalk. It holds for four hundred working hours instead of nine days, it survives rain, and lice will not touch it. It also costs eleven times a chalked harness, requires a warden\'s licence to own, and carries a number struck into the collar that is entered on a public roll.\n\nThe number is the licence. A bound harness taken off a corpse is still a numbered object on a public roll, and the roll is checked at the chain-house gate every morning. There is no market in stolen ones because there is nowhere to wear one. What there is instead is a small, ugly trade in collars: a number cut out of one harness and let into another, which fools a gate and does not fool the weekly inspection, and which has got four people hanged in nine years.\n\n[[npc.ysme-drannik|Ysme Drannik]] was wearing hers when they put her in the chain-house, and she is still wearing it, because taking it off her would mean explaining to the roll why number 31 is unaccounted.',
      itemType: 'Armour',
      rarity: 'Rare',
      value: '640 day-wages, and the licence is not for sale at any price a player can raise honestly',
      weight: '19 kg dressed, with the bleed-off tap and its coupling',
      stats: [
        row({ stat: 'Inlay', value: 'about 6 m of cut line, levin-salt compound, re-cut every 400 working hours' }),
        row({ stat: 'Line life', value: '400 hours logged; the log is the licence condition, not the inlay' }),
        row({ stat: 'Collar number', value: 'struck 14 mm, entered on the Fetterhouse roll, checked daily at the chain-house' }),
        row({ stat: 'Bleed-off tap', value: 'standard coupling; discharges to any licensed sink in about 90 seconds' }),
        row({ stat: 'Physical protection', value: 'real but modest: chain and plate, roughly a light harness' }),
        row({ stat: 'Issue', value: '61 numbers live on the roll; 9 of them are on people nobody has seen this year' }),
      ],
      effects: [
        'Holds a closed ward without upkeep between logged re-cuts',
        'Grants access at the chain-house gate on the number alone, which is the real function',
        'Wearing a number that is not yours is charged as unlicensed working, whether or not you work',
      ],
      origin: 'Magic City, the Chainhouse Ward; inlay work by Fetterhouse hands only',
      legalStatus: 'Licensed',
      legalNotes:
        'Magic City: issued against a named licence by [[faction.fetterhouse|the Fetterhouse]], numbered, rolled and inspected weekly. Nine of the sixty-one live numbers are on the roll and not on anybody, and the Fetterhouse has not struck them off, which is either administrative rot or a deliberate reserve. Mediterranean City: the Conduit College classes an inlaid harness as unlicensed pressure work and impounds it, an argument about jurisdiction that has been running for six years. Gilded Ascent: legal, honoured, and a counting house will lend against one, which tells you what the collar is really worth.',
      recipe: TBD('Is ward inlay a recipe with a machine behind it, or deliberately hand-only so that the Fetterhouse can keep the count exact?'),
      materials: ['material.levin-salt', 'material.quenchspar', 'material.blister-bar'],
      requiredSkills: ['skill.ward-cutting', 'skill.load-binding', 'skill.bleed-off'],
      upgradesTo: TBD('Nothing above this exists in the manifest. Is the Fetterhouse capable of a harness that carries structural load, and has it chosen not to build one?'),
      sellers:
        'Not sold. Issued, numbered and recovered. The chain-house holds four unissued harnesses against replacement and has held the same four for two years, which the [[faction.fetterhouse|Fetterhouse]] describes as prudence and everyone else reads as a shortage of people willing to take the licence.',
      devNotes:
        PROPOSAL('The sixty-one live numbers, the nine unaccounted, the 400-hour re-cut, the collar-swapping trade and the bleed-off tap are proposed. The manifest establishes the chain-bound harness, the permanent ward inlay, the Magic City warden licensing and the number on the collar.') +
        '\n\nDESIGN INTENT: the top of the armour ladder is an access badge with a licence attached, and it cannot be looted usefully. The nine unaccounted numbers are the hook: they are either dead wardens the Fetterhouse has not admitted to, or nine harnesses walking around on people who should not have them. Both answers are a quest and both are true somewhere.',
    },
  }),

  E({
    id: 'item.bastion-jack',
    type: 'item',
    name: 'Bastion Jack',
    aka: ['splint jack', 'the tinderbox'],
    status: 'draft',
    summary: 'Brigandine of pitch-black timber splints over wool: quiet, cheap, and it burns.',
    tags: ['armour', 'tree-city', 'levy', 'cheap'],
    fields: {
      overview:
        'Ninety-six splints of pitch-cured blackbole offcut, riveted between two layers of wool, cut to the hip. It is the cheapest body armour on the continent that is worth putting on. It makes almost no sound, which matters on a rope bridge; it does not rust, which matters in the Greatwood; and it stops a bolt at forty metres, which matters right up until the bolt is fired at twenty.\n\nThe timber comes out of the Pitch Yards as waste from [[machine.the-pitchworks|the Pitchworks]], so a jack costs the Tree City almost nothing and it arms the spring levy in a single week. Officers wear laminate. The levy wears jacks. Nobody in the Marshalcy has ever pretended otherwise.\n\nThe pitch cure is what makes the splints hard and what makes them burn. A jack that catches cannot be put out on the wearer; the pitch runs, it sticks, and the wool holds it against the skin. The Marshalcy\'s standing instruction is to cut the shoulder rivets and get out of it, and the instruction is drilled every spring, and it works about half the time.',
      itemType: 'Armour',
      rarity: 'Common',
      value: '19 day-wages, or nothing if you are on the roll',
      weight: '6.4 kg dry, 9 kg after an hour of rain',
      stats: [
        row({ stat: 'Splints', value: '96 pitch-cured blackbole, 4 mm, riveted between wool' }),
        row({ stat: 'Bolt protection', value: 'stops a 340 g bolt at 40 m; defeated at 20 m' }),
        row({ stat: 'Blade protection', value: 'good against cuts, poor against thrusts, none at the armpit' }),
        row({ stat: 'Ignition', value: 'about 250 C; burns for 4 minutes and cannot be smothered on the body' }),
        row({ stat: 'Ditch time', value: '11 seconds to cut the shoulder rivets and get clear, drilled; 40 seconds untrained' }),
        row({ stat: 'Noise', value: 'effectively silent; wool over timber does not ring' }),
      ],
      effects: [
        'Silent: does not penalise a quiet approach the way plate or scute does',
        'Absorbs water badly, which makes a wet jack an encumbrance rather than a protection',
        'Catastrophic fire vulnerability, and the Tree City is a city that fights with fire',
      ],
      origin: 'Tree City, the Pitch Yards; offcut timber from the Pitchworks',
      legalStatus: 'Legal',
      legalNotes:
        'Legal everywhere and issued freely to the levy, which is not the same as being safe to wear anywhere. The Mediterranean City fire ordinance bars pitch-cured timber inside the Vault Quarter, so a jack has to be left at the gate along with lamps and matches. In the Sky City a jack is entered on the mass warrant at its wet weight, on the reasonable grounds that it will be wet.',
      recipe: ['recipe.stumpwood-distillation'],
      materials: ['material.blackbole-timber', 'material.steppe-scute'],
      requiredSkills: ['skill.plate-and-seam'],
      upgradesTo: TBD('Does the Tree City issue anything between the bastion jack and officers\' laminate, or is the gap in the ladder the class system showing through?'),
      sellers:
        'Sold by the rack in the Pitch Yards to anyone at all, because the Marshalcy would rather the Greatwood villages armed themselves cheaply than went to a foreign armourer. Second-hand jacks are everywhere in the Ascent Basin and are usually four wet seasons past useful.',
      devNotes:
        PROPOSAL('The 96 splints, the ditch drill, the ignition figures and the officers-wear-laminate note are proposed. The manifest establishes the timber splint brigandine, the quiet, the cheapness and the fire vulnerability as the design point.') +
        '\n\nDESIGN INTENT: cheap armour with a specific, dramatic failure mode is better than cheap armour with worse numbers. Pair it deliberately with [[mechanic.severance-drill|the Severance Drill]], which involves fire on bridges, and with [[quest.the-felling-order|The Felling Order]], which involves burning a quarter with people in it. The Tree City arms its poor in kindling and has drilled them on how to get out of it.',
    },
  }),

  E({
    id: 'item.ballast-jacket',
    type: 'item',
    name: 'Ballast Jacket',
    aka: ['shot coat', 'the anchor'],
    status: 'draft',
    summary: 'Lead-weighted coat worn by Sky City lattice crews so a gust cannot take them; fatal in water.',
    tags: ['apparel', 'sky-city', 'mass-warrant', 'occupational'],
    fields: {
      overview:
        'A waxed coat with 108 sewn pockets carrying nine kilograms of lead shot, worn by everyone who works the lattice above the Anvil Shelf. The updraft that holds the city up is not steady, and a gust across an open span will take a person off it. Nine kilograms is the figure the [[faction.mooring-assize|Mooring Assize]] settled on after the Sixth Mast collapse, and it is enforced by weighing, not by inspection.\n\nUnder [[mechanic.mass-warrant|the Mass Warrant]] the jacket is declared as crew mass and entered against the crew\'s allowance, which makes it one of the few pieces of clothing on the continent with a licence number. Wearing an unweighed jacket is ballast fraud. Ballast fraud is a capital charge. Nobody has been executed for it in eleven years and everybody knows the charge is there.\n\nThe ditch cord releases six of the nine kilograms in about four seconds and is the difference between a fine and a funeral. It is also the reason [[npc.perrine-orlaunt|Perrine Orlaunt]] can move a person down the mooring lines at night: an unlogged passenger in a ditched jacket weighs what a crate of nothing weighs, and the crate goes down on the manifest instead.',
      itemType: 'Apparel',
      rarity: 'Uncommon',
      value: '72 day-wages, and the mass allowance to carry it costs more than the jacket over a season',
      weight: '14.2 kg dressed, of which 9 kg is shot',
      stats: [
        row({ stat: 'Shot', value: '9 kg lead in 108 sewn pockets, distributed low and even' }),
        row({ stat: 'Gust resistance', value: 'holds a 70 kg adult against about 90 km/h across an open span' }),
        row({ stat: 'Ditch cord', value: 'releases 6 kg in 4 seconds; the remaining 3 kg is sewn and stays' }),
        row({ stat: 'In water', value: 'sinks an average adult in under 10 seconds, ditched or not' }),
        row({ stat: 'Warrant entry', value: 'declared as crew mass; the number is stamped on the collar tab' }),
      ],
      effects: [
        'Prevents displacement by wind on the lattice; without one, crossing an open span in weather is a real risk of death',
        'Heavy encumbrance on the ground; lattice crews walk badly and are recognisable for it',
        'Drowning hazard: fatal in the Drown, at the Weir, and off any quay',
      ],
      origin: 'Sky City, the Counterweight Quarter; cloth proofed with imported mirelac',
      legalStatus: 'Licensed',
      legalNotes:
        'Sky City: numbered, weighed at the mast and entered on the warrant. An unweighed jacket is ballast fraud under the Assize\'s standing order, which is a capital charge and is used almost entirely as leverage rather than as a prosecution. Black Weir: [[faction.iron-sluice-company|the Company]] banned them on the sluice walks after two drownings, and the ban is one of the few Company rules the gantry crews enforce on each other. Everywhere else it is a very heavy coat.',
      recipe: TBD('There is no lead material in the seed. Should lead shot get a material entry of its own, or is it a by-product of an existing refining chain?'),
      materials: ['material.mirelac', 'material.sparbone'],
      requiredSkills: ['skill.lattice-work', 'skill.dead-weight'],
      upgradesTo: TBD('Is there a warranted light jacket for riggers who have to cross water, and if not, why has nobody built one?'),
      sellers:
        'Sold at the mooring ring by three outfitters, all of whom weigh and stamp on the counter because an unstamped sale is their offence and not the buyer\'s. Second-hand jackets circulate at the Shelf Foot and are usually short of shot, which is dangerous in a way that reads as thrift.',
      devNotes:
        PROPOSAL('The 108 pockets, the nine-kilogram figure, the ditch cord and the post-collapse origin of the standard are proposed. The manifest establishes the lead-weighted coat, the mooring-mast crews, the gust protection and the fatality in water.') +
        '\n\nDESIGN INTENT: an item whose stat block is a trap. Every number that makes it good on the lattice makes it lethal off it, and the Sky City is one long descent away from a river delta. Useful with [[skill.dead-weight|Dead Weight]], since a carried person is billable mass and a carried person in a ballast jacket is billable mass twice over.',
    },
  }),

  E({
    id: 'item.oxblood-coat',
    type: 'item',
    name: 'Oxblood Coat',
    aka: ['cuffs', 'a full left'],
    status: 'draft',
    summary: 'Oxblood wool coat with brass cuff tallies that state your credit; wearing an unearned one is fraud.',
    tags: ['apparel', 'gilded-ascent', 'status', 'credit'],
    fields: {
      overview:
        'The coat is wool, well cut, and dyed a specific dark red that only three dyers in the Ascent Basin can hold through a season of rain. The coat is not the point. The point is the brass on the cuffs: eleven slots per cuff, filled left to right, each tally struck and numbered by the counting house that issued it.\n\nA left cuff read from the wrist tells a factor how far a house will clear your paper before it asks a question. A full left cuff is a thousand day-wages of unquestioned credit. The right cuff carries the houses you have defaulted to, and it is filled by the creditor rather than the debtor, which is why nobody wears a coat with a single tally on the right and why everyone can spot the empty rivet holes where one was taken off.\n\nOn the upper terraces the coat opens doors. Below the fourth it closes them, because a man in a full left cuff on the wharves is either lost, buying something he should not be seen buying, or a hoist-yard forger about to have an expensive afternoon.',
      itemType: 'Apparel',
      rarity: 'Uncommon',
      value: '85 day-wages for the coat; the tallies cannot be bought and are the only part anyone wants',
      weight: '2.9 kg with a full set of tallies',
      stats: [
        row({ stat: 'Tally slots', value: '11 per cuff; left is credit, right is default' }),
        row({ stat: 'Full left cuff', value: 'about 1,000 day-wages cleared without a question at any chartered house' }),
        row({ stat: 'Tally', value: '22 mm struck brass, numbered to the issuing house, riveted not sewn' }),
        row({ stat: 'Dye', value: 'three dyers in the basin hold the colour; a faded coat reads as a copy at ten paces' }),
        row({ stat: 'Read time', value: 'a trained factor reads both cuffs in under two seconds and never appears to look' }),
      ],
      effects: [
        'Social access on the Counting Terrace: doors, credit and a hearing, without a word spoken',
        'Wearing tallies you were not struck is fraud against the clearing system and is prosecuted',
        'A right-cuff tally cannot be removed by the wearer; the rivet holes stay whatever you do',
      ],
      origin: 'Gilded Ascent, the Counting Terrace; brass struck at the Assay Cage register',
      legalStatus: 'Restricted',
      legalNotes:
        'Gilded Ascent: the coat is legal, the tallies are not transferable, and wearing a struck tally that is not yours is charged as fraud against the clearing system, which [[faction.concord-of-weights|the Concord]] pursues across borders when it feels like making a point. Sky City: the Crown Houses read cuffs fluently and will not admit to doing it. Arena City: the Banner Streets sell excellent fakes openly, because nothing in the Arena City is being cleared and the Chamber does not care. Tree City: confiscated at the gate as a foreign uniform, which it functionally is.',
      recipe: ['recipe.brass-billet-casting'],
      materials: ['material.orrery-bronze'],
      requiredSkills: ['skill.the-cold-read', 'skill.market-ear'],
      upgradesTo: TBD('Is there a garment above the coat for the houses themselves, or does the Concord deliberately have no visible uniform?'),
      sellers:
        'Tailors on the third and fourth terraces make the coat for anyone. The brass is struck only against a house\'s own register and cannot be bought, which is precisely why the Banner Streets copy is so good and so useless in the only city where it matters.',
      devNotes:
        PROPOSAL('The eleven slots, the left-credit and right-default convention, the three dyers and the thousand-day-wage figure are proposed. The manifest establishes the oxblood wool coat, the brass cuff tallies stating credit and unearned wear as fraud.') +
        '\n\nDESIGN INTENT: apparel as a social mechanic, and a rare piece of gear whose stat block is entirely reputational. It also gives [[mechanic.standing-ledger|the Standing Ledger]] a body: a party can literally see how far someone else\'s credit runs. The right cuff is where the darkness is. It is a permanent public record of failure that the failing party cannot take off.\n\nOPEN: the dye has no material entry. If a designer wants one, it should be an insect or a mineral out of the Ascent Basin, and the three-dyer monopoly should be a guild rather than a secret.',
    },
  }),

  /* ================================================================ */
  /* TOOLS                                                             */
  /* ================================================================ */

  E({
    id: 'item.mooring-lance',
    type: 'item',
    name: 'Mooring Lance',
    aka: ['the catcher', 'air lance'],
    status: 'draft',
    summary: 'Compressed-air harpoon for catching drifting craft, and for holing an envelope if you are paid to.',
    tags: ['tool', 'sky-city', 'licensed', 'salvage'],
    fields: {
      overview:
        'Two and a half metres of seamless drawn tube with a bronze reservoir at the butt, charged to 190 bar off the compressors under [[landmark.the-mooring-crown|the Mooring Crown]]. It throws a barbed harpoon on sixty metres of [[material.stairwire|stairwire]] line and it exists because a craft that has slipped its mast is worth more caught than mourned.\n\nThe tube is the reason it is expensive. Nobody outside [[machine.the-drawbench-vaults|the Drawbench Vaults]] can pull seamless tube that will hold 190 bar, which puts the Sky City\'s most characteristic tool at the end of a Mediterranean supply line and makes it a hostage in every tariff argument the two cities have.\n\nThe second use is not a secret. A mooring lance will put a harpoon through an envelope at forty metres, and about one holing a year is done by somebody who was licensed to catch rather than to hole. The recharge log at the mast is the only record: three shots per charge, and a crew that comes back having fired more than it can account for has some explaining to do at the counter.',
      itemType: 'Tool',
      rarity: 'Scarce',
      value: '240 day-wages, plus a mast recharge account nobody sells to outsiders',
      weight: '11 kg charged',
      stats: [
        row({ stat: 'Reservoir', value: '190 bar, bronze, serial-banded; 3 shots per charge' }),
        row({ stat: 'Harpoon', value: '1.4 kg barbed head on 60 m of 6 mm stairwire' }),
        row({ stat: 'Effective range', value: '45 m for a catch, 40 m to punch an envelope' }),
        row({ stat: 'Recharge', value: '20 minutes at a mast compressor, logged against the crew' }),
        row({ stat: 'Holding load', value: 'the line parts at about 1.2 tonnes, which is less than most drifting craft' }),
        row({ stat: 'Failure', value: 'a cracked reservoir vents in under a second and takes the butt off at the grip' }),
      ],
      effects: [
        'Recovers a drifting craft or a person, at a range no thrown line reaches',
        'Punches a [[creature.loftwrack|loftwrack]] bladder or a lift envelope; the second is a hanging matter and the log knows',
        'Three shots and then it is a very expensive pole until you can reach a compressor',
      ],
      origin: 'Sky City, the Mooring Ring; tube drawn in the Mediterranean City',
      legalStatus: 'Licensed',
      legalNotes:
        'Sky City: licensed to mast crews only, serial-banded, and every recharge is logged. The recharge log is the evidence trail for every envelope holing of the last decade and has convicted twice out of nine. Gilded Ascent: permitted on the wharves as salvage tackle, unlicensed and unremarked. Floating Swamp Settlement: [[faction.moorstone-compact|the Moorstone Compact]] holds four and uses them to catch runaway rafts, which is lawful there and reads as piracy to any harbour board on the coast. Mediterranean City: the Conduit College licenses the tube and not the weapon, and considers the whole object a misuse of its patent.',
      recipe: ['recipe.drawn-wire-and-tube'],
      materials: ['material.orrery-bronze', 'material.stairwire', 'material.blister-bar'],
      requiredSkills: ['skill.pressure-fitting', 'skill.lattice-work', 'skill.cable-and-drum'],
      upgradesTo: TBD('Is there a two-crew mast-mounted version for the mooring ring, and would the Assize allow one to exist?'),
      sellers:
        'Sold at the Mooring Ring against a crew licence, which takes a sponsor. Sold second-hand at the Shelf Foot without a licence and without a recharge account, which means the buyer gets three shots and then a pole. [[npc.perrine-orlaunt|Perrine Orlaunt]] knows two people who will fill a private reservoir and charges for the introduction.',
      devNotes:
        PROPOSAL('The 190-bar figure, the three-shot charge, the recharge log and the two convictions out of nine are proposed. The manifest establishes the compressed-air harpoon, its use on drifting craft and envelopes, the Mooring Crown compressors and the mast-crew licensing.') +
        '\n\nDESIGN INTENT: a tool that is obviously a weapon and is regulated as a tool, which is how most dangerous things in this setting are handled. The recharge log is the hook: it is a paper trail that can be read, bought, altered or destroyed, and it turns an assassination in the air into an accounting problem on the ground.',
    },
  }),

  E({
    id: 'item.weirhook',
    type: 'item',
    name: 'Weirhook',
    aka: ['gantry hook', 'the back spike'],
    status: 'draft',
    summary: 'Long iron sluice hook for working the weir gates, with a spike on the back for working people.',
    tags: ['tool', 'black-weir', 'labour', 'improvised-weapon'],
    fields: {
      overview:
        'Two point seven metres of shaft with a heavy bog-iron head: a throat wide enough to take a gate ring, a lifting bill, and a 140-millimetre spike on the reverse for hooking timber, dragging bodies out of the race and, at the discretion of the crew, discouraging arguments on a gantry.\n\nEvery hook carries a stamped gantry number, because the Company issues them and counts them back in at the end of a shift. Gantry crews carry them through gates that stop swords, and the whole northern approach to the Weir Gates is walked all day by men with polearms that no ordinance recognises as polearms.\n\nThe spike is the honest part of the design. Nobody at the Black Weir pretends the back of the hook is for timber. [[npc.dagren-hoyle|Dagren Hoyle]] lost two crews in a disused sluice and neither of them drowned holding anything else.',
      itemType: 'Tool',
      rarity: 'Common',
      value: '14 day-wages; issued free to a numbered crew and deducted if it does not come back',
      weight: '4.9 kg',
      stats: [
        row({ stat: 'Shaft', value: '2.7 m, close-grained, banded at the head and the butt' }),
        row({ stat: 'Hook throat', value: '180 mm, sized to a standard gate ring' }),
        row({ stat: 'Back spike', value: '140 mm, square section, sharpened on issue' }),
        row({ stat: 'Rated drag', value: '300 kg wet; crews routinely pull more and the shafts routinely fail' }),
        row({ stat: 'Reach in a fight', value: 'a polearm, held as a polearm, by people who drill with it eleven hours a day' }),
      ],
      effects: [
        'Works a sluice gate ring, which is the only way to move a gate by hand',
        'Passes weapon checks at every gate on the river because it is tackle',
        'Numbered to a gantry: an unnumbered hook in the Slack is a stolen hook and is treated as one',
      ],
      origin: 'Black Weir, the Gantry Yards; heads beaten under the sluice hammers',
      legalStatus: 'Legal',
      legalNotes:
        'Legal everywhere as gantry tackle, and that is exactly the point of it. The Arena City bars hooks from the sand on the grounds that they are tools and the card is for weapons, which is a distinction the Chamber enforces cheerfully and inconsistently. The Mediterranean City harbour board requires the back spike ground off before a hook comes ashore, and the yards on the mole keep a grinding wheel by the gangway for exactly this. The Gilded Ascent has never once looked at one.',
      recipe: ['recipe.hammered-bar-iron'],
      materials: ['material.mire-bloom', 'material.blister-bar', 'material.blackbole-timber'],
      requiredSkills: ['skill.long-arm', 'skill.marsh-footing'],
      upgradesTo: TBD('Is there a Company-pattern hook for the deep gates, or does every gate on the river take the same ring?'),
      sellers:
        'Issued by the Company against a gantry number. Sold openly in the Gantry Yards to river crews and raft clans, who buy them by the dozen and do not always want them for gates. Nobody in the delta considers buying a weirhook to be buying a weapon, which is the most useful sentence in this entry.',
      devNotes:
        'CANON: the Black Weir is an established name only.\n\n' +
        PROPOSAL('The gantry numbering, the issue-and-count practice, the 300 kg rating and the harbour-board grinding rule are proposed. The manifest establishes the long iron sluice hook, the back spike and the gantry crews. Nothing here invents Black Weir history, founding or politics beyond the basalt sluices and iron gantries already sketched.') +
        '\n\nDESIGN INTENT: the world runs on work, and the working tool that is quietly a weapon is more interesting than a weapon. This is the item a party can carry into places that will not let them carry anything, and the reason it works is that everyone at the Weir knows exactly what it is for and nobody outside the delta does.',
    },
  }),

  E({
    id: 'item.sunwell-mirror',
    type: 'item',
    name: 'Sunwell Mirror',
    aka: ['the arm', 'a stealer'],
    status: 'draft',
    summary: 'Hand mirror on a jointed arm, used to steal duct light for a private plot in the Hollow Karst.',
    tags: ['tool', 'cave-agrarian-city', 'crime', 'light'],
    fields: {
      overview:
        'A 240-millimetre leaf of silvered [[material.sunwell-mica|sunwell mica]] on a four-joint arm, made to be clamped to a gallery rib and angled into a duct spill. Above ground it is a surveyor\'s tool and completely unremarkable. Two hundred metres down [[landmark.sunwell-shaft|the Sunwell Shaft]] it is the instrument of the only crime the Hollow Karst really prosecutes.\n\nLight in the karst is issued in lumen-hours against a gallery\'s allocation, and a well-set arm takes about seventy lumen-hours a day out of a duct without anybody in the lit gallery noticing anything at all. The loss shows up three galleries down the line as a two per cent shortfall, and two per cent is inside the tolerance the reeves allow for dirty mirrors. A patient thief can run an arm for a year.\n\nWhat catches them is not observation but arithmetic. [[npc.iratze-zubiate|Iratze Zubiate]]\'s alignment survey reconciles the whole duct network twice a year, and a stolen seventy hours a day is visible in the reconciliation the moment anyone bothers to do it properly. She has not bothered recently, because her own books have two dark galleries in them she cannot explain either.',
      itemType: 'Tool',
      rarity: 'Common',
      value: '31 day-wages for the arm; the leaf comes off a condemned duct plate and is not sold at all',
      weight: '1.3 kg',
      stats: [
        row({ stat: 'Leaf', value: '240 mm silvered mica, hand-cleaved, tin amalgam' }),
        row({ stat: 'Arm', value: '900 mm, four joints, gallery-rib clamp' }),
        row({ stat: 'Yield', value: 'about 70 lumen-hours a day off a well-angled duct spill' }),
        row({ stat: 'Detection', value: 'shows as a 2% shortfall three galleries down, inside the dirty-mirror tolerance' }),
        row({ stat: 'Set-up', value: '25 minutes to clamp and angle; 6 seconds to fold and pocket' }),
      ],
      effects: [
        'Grows a private plot on stolen light, which is the karst\'s commonest and most-punished crime',
        'Undetectable by observation; detectable only by a full duct reconciliation',
        'Silvering degrades: a leaf loses a third of its throw in about four years and cannot be re-silvered outside the guild',
      ],
      origin: 'Cave Agrarian City, the Mirror Quarter; leaves cleaved at the Lantern Beds',
      legalStatus: 'Varies by city',
      legalNotes:
        'Cave Agrarian City: possession inside a growing gallery is prima facie evidence of light theft, and light theft is punished with the loss of the gallery\'s allocation rather than with the loss of the thief, so the neighbours do the enforcing. Oruvai: karst reeves honour Assembly warrants at the pass, so a light thief who runs uphill is usually sent back down. Everywhere else it is a mirror on a stick and nobody has an opinion.',
      recipe: ['recipe.duct-mirror-resilvering'],
      materials: ['material.sunwell-mica'],
      requiredSkills: ['skill.mirror-cutting', 'skill.quiet-ground'],
      upgradesTo: TBD('Is there a fixed multi-leaf array for a whole terrace, and is that a crime or a licence application?'),
      sellers:
        'The Mirror Quarter sells arms, clamps and joints openly as survey kit and asks nothing. Leaves are a different trade: every one in private hands came off a condemned duct plate, and the mirrorwrights who condemn plates are the people who sell them. [[npc.bedel-lehun|Bedel Lehun]] bought his four years ago and has never said from whom.',
      devNotes:
        PROPOSAL('The seventy lumen-hours, the two per cent shortfall, the dirty-mirror tolerance and the condemned-plate supply are proposed. The manifest establishes the jointed hand mirror, the light theft and the tin-silvered glass of the duct trade.') +
        '\n\nDESIGN INTENT: a crime tool where the crime is arithmetic and the victim is three galleries away and does not know. It gives [[mechanic.the-mirror-rota|the Mirror Rota]] a physical object, and it gives a party the option of committing a theft nobody can see, from people they will later meet. Pair with [[quest.who-gets-the-light|Who Gets the Light]]: a party that has been stealing light has already made the allocation decision once, quietly.',
    },
  }),

  E({
    id: 'item.assayers-tray',
    type: 'item',
    name: "Assayer's Tray",
    aka: ['the nine wells', 'card kit'],
    status: 'draft',
    summary: 'Licensed field kit for assaying sift: nine reagent wells, a loupe, and a stamped result card.',
    tags: ['tool', 'sifting-city', 'licensed', 'commerce'],
    fields: {
      overview:
        'A shallow bronze tray with nine glazed reagent wells, a ten-power [[material.clearcast-glass|clearcast]] loupe on a folding post, and a sewn book of fifty numbered result cards. It grades a sample of pan crust into one of [[faction.pale-assay|the Pale Assay]]\'s six cuts in about twelve minutes, in the field, in wind, by one person.\n\nThe chemistry is not difficult and the tray is not expensive. What is expensive is the card book. A stamped card travels with the barrel from the Pans to the Assay Cage, and every buyer between here and the Meridian Coast pays against the card rather than against the salt. The difference between a fourth cut and a fifth cut card on the same barrel is roughly a year of a crew\'s wages, and it is decided by a licensed hand with a loupe and a numbered book.\n\nThe fraud writes itself and does not need to be described. What matters mechanically is that the tray does not lie: the wells are honest, the reagents are honest, and every misgrading in the Pans is a person choosing, in the field, with the sample in front of them, to write a different number.',
      itemType: 'Tool',
      rarity: 'Uncommon',
      value: '120 day-wages for the kit; the annual licence is 90 more and is refused more often than it is granted',
      weight: '2.1 kg with a full card book',
      stats: [
        row({ stat: 'Wells', value: '9 glazed, sealed; reagents good for 60 assays or 90 days, whichever comes first' }),
        row({ stat: 'Loupe', value: '10x clearcast, folding post, the single most stolen part' }),
        row({ stat: 'Assay time', value: 'about 12 minutes a sample, in the field' }),
        row({ stat: 'Card book', value: '50 numbered cards; the book number is registered to the holder\'s proof mark' }),
        row({ stat: 'Grade spread', value: 'six cuts; one cut of difference on a barrel is about a year of a crew\'s wages' }),
      ],
      effects: [
        'Grades pan crust, Blackfall sand and most ores to Pale Assay cuts without a laboratory',
        'A stamped card is honoured at the Assay Cage in the Gilded Ascent and priced against everywhere between',
        'The licence attaches to the holder\'s proof mark: stamping a card you did not assay is your liability, permanently',
      ],
      origin: 'Sifting City, Assay Row; glass and bronze imported from the Mediterranean City',
      legalStatus: 'Licensed',
      legalNotes:
        'Sifting City: the tray is nothing and the card book is everything. Stamping a card without the assay is fraud against [[faction.pale-assay|the Pale Assay]], and the penalty is indenture rather than a fine, on the reasoning that a defrauder should work off what they cost. Gilded Ascent: a sealed card is honoured at [[machine.the-assay-cage|the Assay Cage]] without re-testing, which is the whole basis of the trade and is a spectacular unexamined assumption. Everywhere else the cards mean nothing and the kit is just chemistry.',
      recipe: ['recipe.crown-glass-blanks', 'recipe.sealed-assay-balance'],
      materials: ['material.clearcast-glass', 'material.orrery-bronze', 'material.pan-nitre'],
      requiredSkills: ['skill.proof-marking', 'skill.sieve-tuning', 'skill.heat-reading'],
      upgradesTo: TBD('Does a bench-grade assay set exist above the field tray, and would the Pale Assay allow one outside its own towers?'),
      sellers:
        'Sold on Assay Row against a licence, with the card book issued separately and the two never sold together. Unlicensed trays without books are sold openly to prospectors, miners and anyone who wants to know what they are standing on, which is legal and useless for selling anything.',
      devNotes:
        PROPOSAL('The nine wells, the fifty-card book, the twelve-minute assay and the indenture penalty are proposed. The manifest establishes the licensed field kit, the nine reagent wells, the loupe, the stamped card and the fact that the stamp is worth more than the tray.') +
        '\n\nDESIGN INTENT: a pure tool that is also the economic spine of a city. It gives a party the ability to know what something is worth before anyone tells them, which is quietly one of the strongest abilities in a trade campaign. Feeds [[quest.pan-fever|Pan Fever]] directly: the fraction the Sieve Company sells at premium is graded with one of these.',
    },
  }),

  E({
    id: 'item.moor-stake',
    type: 'item',
    name: 'Moor Stake',
    aka: ['a mark', 'the head'],
    status: 'draft',
    summary: 'Iron-shod stake and cord that turns a drifting raft into property; owner marks are cut into the head.',
    tags: ['tool', 'floating-swamp', 'property', 'law'],
    fields: {
      overview:
        'A metre and a half of hardwood with a bog-iron shoe, a cut head, and twenty-two metres of mirelac-proofed cord. Driven into a mat, it holds a raft. Driven into a mat that somebody else is using, it starts a case.\n\nThe head is the legally operative part. Owner marks are cut into it in a registered pattern held at [[landmark.the-moorstone|the Moorstone]], and the whole property system of the [[city.floating-swamp-settlement|floating settlement]] runs on the proposition that a mark on a driven stake is a claim and an undriven stake is nothing at all. This is why [[mechanic.the-remoor|the Re-Moor]] is violent in a slow way: every drift is a general re-argument about who drove what, where, and first.\n\nIt holds a forty-tonne mat in slack water. It does not hold anything at all during a release from the Weir Gates, which is a fact [[faction.iron-sluice-company|the Iron Sluice Company]] has never had to state out loud and which decides more property questions in the delta than the Compact does.',
      itemType: 'Tool',
      rarity: 'Common',
      value: '9 day-wages, plus the registration of the mark, which is 20 and is where the money is',
      weight: '7.8 kg with cord',
      stats: [
        row({ stat: 'Stake', value: '1.6 m, iron-shod, head cut to a registered pattern' }),
        row({ stat: 'Cord', value: '22 m of 24 mm, mirelac-proofed, replaced every second season' }),
        row({ stat: 'Holding', value: '40 tonnes of mat in slack water; nothing during a scheduled release' }),
        row({ stat: 'Driving', value: '2 people, 20 minutes, and it must be witnessed to count' }),
        row({ stat: 'Mark register', value: 'held at the Moorstone; roughly 400 live marks and about 90 in dispute' }),
      ],
      effects: [
        'Establishes a mooring claim, which in the delta is the only form of real property there is',
        'Pulling and re-driving another mark is theft of a lot and is tried by the clans, not by a court',
        'Useless against a release: the Weir decides what your stake is worth every time it opens a gate',
      ],
      origin: 'Floating Swamp Settlement, the Stone Lots; iron from Drown bog cuts',
      legalStatus: 'Varies by city',
      legalNotes:
        'Floating Swamp Settlement: the stake is not evidence of property, it is property, and the mark register at the Moorstone is the only title deed in the Drown. Black Weir: stakes are void inside the toll reach, so a raft that drifts upriver into the Company\'s water loses its claim by arriving. Gilded Ascent: an Ascent court will hear a Moorstone mark as evidence and has done so twice, which the Compact considers an enormous and slightly frightening victory.',
      recipe: ['recipe.hammered-bar-iron'],
      materials: ['material.mire-bloom', 'material.mirelac', 'material.glasscane'],
      requiredSkills: ['skill.marsh-footing', 'skill.plain-letters'],
      upgradesTo: TBD('Is there a heavier stake pattern for the stone lots, and does a bigger stake carry a bigger claim, or is a mark a mark?'),
      sellers:
        'Made and sold in the Stone Lots by four families who also hold the register, which is an arrangement nobody in the settlement has ever described as a conflict of interest. Marks are registered for a fee, inherited, and occasionally sold, and a sold mark is worth more than every stake in the delta put together.',
      devNotes:
        PROPOSAL('The registered mark patterns, the 400 live marks, the witnessing requirement and the four register families are proposed. The manifest establishes the iron-shod stake and cord, the owner marks cut into the head and the underwriting of property law in the settlement.') +
        '\n\nDESIGN INTENT: a tool that is a legal instrument. It hands a party an actual lever in the delta: drive a stake, hold a lot, and be immediately in an argument with people who have nowhere else to go. Feeds [[quest.slackwater-rights|Slackwater Rights]] directly, where the deed in question is downstream of a mark on a head.\n\nNOTE: literacy is not assumed in this world. Registering a mark requires [[skill.plain-letters|Plain Letters]] or somebody who has it, and the four register families have been that somebody for three generations.',
    },
  }),

  E({
    id: 'item.orrery-tables',
    type: 'item',
    name: 'Orrery Tables',
    aka: ['the season', 'the printed'],
    status: 'draft',
    summary: 'Printed tide, wind and star tables read off the Tide Orrery; reissued each season and always stolen.',
    tags: ['tool', 'document', 'mediterranean-city', 'navigation'],
    fields: {
      overview:
        'Ninety-six sewn pages, reissued four times a year, printed from observations taken off [[landmark.the-tide-orrery|the Tide Orrery]] and sold in a numbered edition of 1,100. Tides, wind windows, star transits and the harbour slot table, in that order, in small type.\n\nEverything on the [[region.meridian-coast|Meridian Coast]] is written against them. Harbour leases, freight contracts, insurance, planting dates and the sailing of every hull that leaves the mole. Owning a current set is not an advantage, it is the entry condition, and the College sells them at a price that is high but not extortionate because the tables are the instrument of its authority and not a revenue line.\n\nThe current issue is wrong. [[npc.melitta-aspri|Melitta Aspri]] has been biasing the printed figures for nine years to hide a drift of about a day and a half in the orrery itself, and the bias is now roughly ninety minutes on a spring tide. Every copy of the tables in circulation is a document that will eventually be evidence.',
      itemType: 'Document',
      rarity: 'Uncommon',
      value: '46 day-wages a season from the College counter; 300 on the fog quays of Keth Veyra, in winter',
      weight: '340 g',
      stats: [
        row({ stat: 'Edition', value: '1,100 numbered copies, four issues a year, each stamped to a buyer\'s house' }),
        row({ stat: 'Coverage', value: 'Meridian Gulf and the Mistfall approach; nothing east of the Deep' }),
        row({ stat: 'Working life', value: 'one season; a set two issues old is worse than none because pilots still trust it' }),
        row({ stat: 'Known error', value: 'about 90 minutes on spring tides, biased into the print and not published' }),
        row({ stat: 'Copy trade', value: 'unnumbered hand copies circulate at roughly a fifth the price and half the pages' }),
      ],
      effects: [
        'Gates safe passage on the Meridian Gulf: without a current set, a hull sails on somebody\'s memory',
        'Sets the price of a harbour slot, a lease and an insurance premium across the whole coast',
        'The number is traceable: a set found where it should not be names the house that bought it',
      ],
      origin: 'Mediterranean City, the Orrery Precinct; printed under Conduit College seal',
      legalStatus: 'Restricted',
      legalNotes:
        'Mediterranean City: copying a set is a licensing offence and the College prosecutes printers rather than readers, which keeps the copy trade small and expensive. Keth Veyra: the pilots will not sail without a set and cannot lawfully buy one, since the College sells only to registered coast houses and there are none at Keth Veyra. That single sentence is the entire economy of the fog quays. Sky City: navigators buy them at full price for the wind tables alone and consider the tide pages waste paper.',
      recipe: TBD('Printing has no recipe or machine entry in the seed. Does the Orrery Precinct press deserve one, or does the Tide Orrery itself count as the machine?'),
      materials: TBD('Paper, ink and lead type have no material entries. Worth adding, or deliberately below the resolution of the material set?'),
      requiredSkills: ['skill.plain-letters', 'skill.weather-eye'],
      upgradesTo: TBD('Is there a corrected private set held by the College itself, and is that a separate item or the same item with a different number?'),
      sellers:
        'The College counter in the Orrery Precinct, to registered houses, four times a year, on a list. The fog quays of Keth Veyra, at winter prices, from people who do not give a name. [[faction.bonewax-post|The Bonewax Post]] carries about 200 sets a season under seal and has never been accused of reading one.',
      devNotes:
        PROPOSAL('The 1,100-copy edition, the four issues, the ninety-minute bias figure and the Keth Veyra supply gap are proposed. The manifest establishes the printed tide, wind and star tables, the seasonal reissue and the fact that they are always stolen.') +
        '\n\nDESIGN INTENT: a pure tool that is also a time bomb. Every party that buys a set is buying a document they will later be able to prove was falsified. Feeds [[quest.four-minutes-fast|Four Minutes Fast]] head-on, and gives [[quest.the-fog-bells|The Fog Bells]] a second, quieter reason the Keth Veyra approach is dangerous: the pilots are working from copies of a book that is wrong.',
    },
  }),

  /* ================================================================ */
  /* COMPONENTS AND CONSUMABLES                                        */
  /* ================================================================ */

  E({
    id: 'item.governor-spring',
    type: 'item',
    name: 'Governor Spring',
    aka: ['the bottleneck', 'a college coil'],
    status: 'draft',
    summary: 'Drawn steel spring cut to a tolerance only the Mediterranean City can hold; every good machine wants one.',
    tags: ['component', 'mediterranean-city', 'bottleneck', 'precision'],
    fields: {
      overview:
        'Eighty-four millimetres of coiled wire, twenty-two turns, holding a rate of 240 newtons per centimetre to within one and a half per cent across forty thousand cycles. Four benches in the [[district.mediterranean-city-conduit-yards|Conduit Yards]] can make one. Nowhere else on the continent can, and the reason is not secrecy but process: the wire has to be drawn through [[material.blackfall-button|Blackfall button]] dies at a temperature held inside a five-degree window, on a conduit slot, for eleven hours.\n\nEverything precise in the world has one in it. Escapements, governors, pressure regulators, the [[item.springlock|springlock]], the feed control on half the machines in the seed, and the Tide Orrery\'s own remontoire. The Conduit College does not restrict export, and does not need to. It restricts slots, and a spring is eleven hours of slot.\n\nThe reject rate at the bench is three in five. That number is the actual explanation for the price, and it is the number [[faction.conduit-college|the College]] quotes whenever anyone suggests it is holding the continent to ransom.',
      itemType: 'Component',
      rarity: 'Scarce',
      value: '95 day-wages at the bench; 140 by the time it reaches the Gilded Ascent; 400 in the Arena City',
      weight: '38 g',
      stats: [
        row({ stat: 'Dimensions', value: '84 mm free length, 22 coils, 1.9 mm wire' }),
        row({ stat: 'Rate', value: '240 N per 10 mm, held to plus or minus 1.5%' }),
        row({ stat: 'Fatigue life', value: '40,000 cycles before measurable set' }),
        row({ stat: 'Bench time', value: '11 hours of conduit slot per spring, drawn hot in a 5 degree window' }),
        row({ stat: 'Reject rate', value: '3 in 5 at the bench, which is the price' }),
        row({ stat: 'Counterfeit', value: 'passes cold measurement, takes a set inside a season, and by then the machine is elsewhere' }),
      ],
      effects: [
        'Gates every precision mechanism in the setting: no spring, no springlock, no regulator, no escapement',
        'Stamped with a batch and a slot number, so a failed machine can be traced back to a bench and a day',
        'A counterfeit is indistinguishable until it fails, which makes trust the actual commodity',
      ],
      origin: 'Mediterranean City, the Conduit Yards; four licensed spring-drawing benches',
      legalStatus: 'Licensed',
      legalNotes:
        'There is no city where owning a governor spring is illegal and no city besides the Mediterranean that can make one, which is a more effective control than any law. The College licenses the benches, prices the slot and permits export without limit. [[faction.concord-of-weights|The Concord]] has twice proposed a forward market in slots and been refused twice, politely, in writing, with the letters published.',
      recipe: ['recipe.drawn-wire-and-tube'],
      materials: ['material.blister-bar', 'material.blackfall-button', 'material.orrery-bronze'],
      requiredSkills: ['skill.bench-sense', 'skill.pressure-fitting', 'skill.heat-reading'],
      upgradesTo: ['item.springlock'],
      sellers:
        'The four benches sell direct and to the College\'s own factor\'s desk, logged by batch. Every other seller on the continent is reselling, and the mark-up between the mole and the Ascent is the cleanest measure of how the copper duty vote went that year. [[npc.melitta-aspri|Melitta Aspri]] has a standing allocation of six a year for the orrery and has been quietly using four.',
      devNotes:
        PROPOSAL('The 240 N rate, the eleven-hour slot, the three-in-five reject rate and the four benches are proposed. The manifest establishes the drawn steel spring, the tolerance only the Mediterranean City can hold and its role as the continent\'s bottleneck component.') +
        '\n\nDESIGN INTENT: this is the gate. Any recipe, machine or item a later author wants to make advanced should require one, and the requirement should be felt as a supply line rather than as a cost. It also makes [[mechanic.conduit-hours|Conduit Hours]] matter to people who will never visit the Mediterranean City: a bad slot auction in the port is a shortage of springs in the Arena City four months later.',
    },
  }),

  E({
    id: 'item.ward-pin',
    type: 'item',
    name: 'Ward Pin',
    aka: ['a twelve', 'sealed tube'],
    status: 'draft',
    summary: 'Scribed iron pin that holds a binding until it is drawn; sold in sealed tubes of twelve.',
    tags: ['component', 'magic-city', 'restricted', 'warding'],
    fields: {
      overview:
        'A 118-millimetre iron pin with a scribed line three tenths of a millimetre deep running its length, charged with a trace of [[material.levin-salt|levin salt]] in the cut. Driven at the corner of a ward, it anchors the line. Drawn, it releases whatever the line was holding, immediately and all at once, which is the entire reason the trade exists and the entire reason it is watched.\n\nPins are sold in sealed tubes of twelve, wired and numbered by [[faction.fetterhouse|the Fetterhouse]]. The seal is the legal apparatus. A tube with an intact wire is licensed material and its number is on a roll; the same twelve pins loose in a pocket are unlicensed material and holding forty of them is charged as intent to work without a licence, whatever you were actually going to do with them.\n\n[[npc.toval-cherek|Toval Cherek]] uses them by the hundred at the fault chains and has been shorting the alloy on the links for two years to meet quota. Nobody has thought to ask whether he has been shorting the pins too.',
      itemType: 'Component',
      rarity: 'Common',
      value: '16 day-wages a sealed tube of twelve; 4 a pin loose, which is illegal and easier',
      weight: '40 g a pin; 620 g a sealed tube',
      stats: [
        row({ stat: 'Pin', value: '118 mm, scribed 0.3 mm, levin-salt trace in the cut' }),
        row({ stat: 'Anchor life', value: '60 days, or one hard discharge, whichever comes first' }),
        row({ stat: 'Tube', value: '12 pins, wired seal, number on the roll; a broken wire voids the tube' }),
        row({ stat: 'Draw', value: 'releases the held line in under a second; there is no partial draw' }),
        row({ stat: 'Reuse', value: 'a discharged pin can be re-scribed twice before the iron will not hold the cut' }),
      ],
      effects: [
        'Anchors a chalked or cut ward line at a corner, joint or stress point',
        'Drawing a pin is the fastest way to unmake a ward and the loudest thing you can do in a warded room',
        'Loose pins are unlicensed material in the Magic City regardless of what you are doing with them',
      ],
      origin: 'Magic City, Chalk Row; iron bar shipped up from the Black Weir and scribed under licence',
      legalStatus: 'Restricted',
      legalNotes:
        'Magic City: the tube seal is the licence. Pins from a broken tube are unlicensed material, and holding a quantity is charged as intent, which is a charge [[npc.halvo-sarn|the permit clerk]] can backdate away for a rising price. Gilded Ascent and Sky City: legal and openly stocked, because bonded vaults and mast houses both ward and both buy. Tree City: contraband along with all worked magic, and the Pitchguard confiscates tubes at the gate and stores them, badly, in a dry room full of other confiscated things.',
      recipe: ['recipe.hammered-bar-iron'],
      materials: ['material.levin-salt', 'material.blister-bar'],
      requiredSkills: ['skill.chalk-hand', 'skill.ward-cutting'],
      upgradesTo: ['item.chalked-harness'],
      sellers:
        'Chalk Row sells tubes against a licence number and loose pins to nobody, officially. The Salt Vats sell loose pins to anyone at all, which is a four-minute walk and an open secret. Outside the Magic City every wardyard, vault and mast house stocks them, and the seals on the tubes get older the further west you go.',
      devNotes:
        PROPOSAL('The tube of twelve, the wired seal as the licence, the sixty-day anchor life and the re-scribing limit are proposed. The manifest establishes the scribed iron pin, the holding until drawn and the sealed tubes of twelve.') +
        '\n\nDESIGN INTENT: the cheapest thing in the magic economy and the one that lets a party break other people\'s magic without being able to cast. Drawing a pin is a physical act with an instant, loud, structural consequence, which is exactly the kind of interaction [[mechanic.ward-load|Ward Load]] needs at the player scale.\n\nOPEN: the scribing step has no recipe entry. `recipe.hammered-bar-iron` covers the bar and nothing else, and if a later author wants a scribing recipe it belongs to the Magic City, not to the Weir.',
    },
  }),

  E({
    id: 'item.sift-screen',
    type: 'item',
    name: 'Sift Screen',
    aka: ['a count', 'last mesh'],
    status: 'draft',
    summary: 'Woven mesh screen for sifting rigs, rated by count; it wears out fast and is never sold second-hand.',
    tags: ['component', 'sifting-city', 'consumable', 'industry'],
    fields: {
      overview:
        'A wired frame carrying a woven mesh, rated by count: wires per twenty-five millimetres, from a four that will pass gravel to a two hundred that will pass almost nothing. Every rig in the White Pans is a stack of them, and the grade a rig yields is decided entirely by which screens are in it and how worn they are.\n\nScreens do not fail, they degrade, and a degraded screen is worse than a broken one because it goes on working. A worn sixty-count passes material a fresh one would hold, which quietly downgrades everything through it. This is the commonest fraud in the Pans and it is not really a fraud, because nobody has to do anything: a rig owner who does not replace screens is paid the same as one who does, right up until [[faction.pale-assay|the Pale Assay]] refuses the cards.\n\nThe last mesh in a cascade carries the rarest grade and is changed every shift. It is also the screen crews steal, because the dust on a spent two-hundred is worth more than a week of wages and is the raw stock of [[item.pale-dust|pale dust]].',
      itemType: 'Component',
      rarity: 'Common',
      value: '7 day-wages for a 60-count, 40 for a 200-count; both are gone inside a fortnight',
      weight: '3.2 kg framed',
      stats: [
        row({ stat: 'Frame', value: '900 x 600 mm, standard across every rig in the Pans' }),
        row({ stat: 'Counts', value: '4 to 200 wires per 25 mm; a working cascade runs nine' }),
        row({ stat: 'Service life', value: '90 hours on raw crust at 60-count; 14 hours at 200-count' }),
        row({ stat: 'Wear effect', value: 'a worn screen downgrades output silently; nothing breaks and nothing warns' }),
        row({ stat: 'Count stamp', value: 'required on any rig whose output the Pale Assay grades' }),
      ],
      effects: [
        'Sets the grade a sifting rig yields, which is the whole of [[mechanic.the-sift-line|the Sift Line]]',
        'Consumable: every extraction session should burn screens, and the good counts burn fastest',
        'A spent 200-count screen is worth stealing, and the dust on it is what kills the crews',
      ],
      origin: 'Sifting City, the Tower Line; wire drawn in the Mediterranean City through Blackfall dies',
      legalStatus: 'Legal',
      legalNotes:
        'Legal everywhere and quietly regulated in one place. The Pale Assay requires a count stamp on any rig it grades, and a rig running an unstamped or over-worn screen has its cards refused, which is not a prosecution but is worse. Never sold second-hand anywhere in the Pans, by universal custom, because a used screen sold as new is a downgrade nobody can detect until the barrel is assayed.',
      recipe: ['recipe.drawn-wire-and-tube'],
      materials: ['material.blackfall-button', 'material.blister-bar'],
      requiredSkills: ['skill.sieve-tuning', 'skill.bench-sense'],
      upgradesTo: TBD('Is there a woven screen finer than 200-count, and is the ceiling the loom or the wire?'),
      sellers:
        'Sold by the crate on the Tower Line and by the single screen at every rig in the Pans, at a mark-up that rises with the count. [[npc.tazrit-nourem|Tazrit n\'Ourem]] sells screens to the crews whose debt she holds, at a price set against their draw, which is one of the cleaner illustrations of how the indenture actually works.',
      devNotes:
        PROPOSAL('The count range, the service lives, the count stamp requirement and the never-sold-second-hand custom are proposed. The manifest establishes the woven mesh screen, the rating by count, the fast wear and the second-hand taboo.') +
        '\n\nDESIGN INTENT: the consumable that makes industry feel like industry. If a designer wants extraction to have running costs rather than a one-off equipment purchase, this is the entry to cite. It also quietly connects three plots: worn screens produce bad grades, bad grades feed [[faction.pale-assay|Pale Assay]] fraud, and the last mesh feeds the dust trade in [[quest.pan-fever|Pan Fever]].',
    },
  }),

  E({
    id: 'item.nitre-cask',
    type: 'item',
    name: 'Nitre Cask',
    aka: ['a licensed', 'gallery cask'],
    status: 'draft',
    summary: 'Small blasting cask of pan nitre, licensed for gallery cutting, tracked by the barrel and the ounce.',
    tags: ['consumable', 'cave-agrarian-city', 'licensed', 'mining'],
    fields: {
      overview:
        'Nine point four kilograms of blended [[material.pan-nitre|pan nitre]] charge in an eleven-kilogram cask, with the licence number burned into two opposite staves. Confined in a drilled face it cuts about a metre and a fifth of gallery. Unconfined it is a fire, not a bomb, which is the single most useful safety property of the whole system and the reason casks travel on the same rafts as people.\n\nThe control is arithmetic rather than physical. Casks are weighed out and weighed back in to the ounce, and the difference between what was issued and what was returned or accounted for in cut rock is the charge against the licence-holder. A gallery crew that is short four ounces at the end of a rota has a problem that does not go away by being explained.\n\nIn the Hollow Karst this is not caution, it is existential. A bad shot does not collapse a gallery, it takes a mirror duct, and a duct is a harvest, and a harvest is a year of somebody\'s food. [[npc.iratze-zubiate|Iratze Zubiate]] has two dark galleries she cannot fix without casks and cannot requisition casks for without reporting the collapse.',
      itemType: 'Consumable',
      rarity: 'Uncommon',
      value: '54 day-wages a cask, and the licence behind it is not sold at all',
      weight: '11 kg gross, 9.4 kg of charge',
      stats: [
        row({ stat: 'Charge', value: '9.4 kg blended pan nitre, graded to a stated grain' }),
        row({ stat: 'Yield', value: 'about 1.2 m of gallery face per cask in karst limestone' }),
        row({ stat: 'Unconfined', value: 'burns for roughly 40 seconds at fierce heat; does not detonate' }),
        row({ stat: 'Damp limit', value: 'above 4% moisture it will not take, and the crew has to explain that too' }),
        row({ stat: 'Accounting', value: 'issued and returned by weight to the ounce; the shortfall is the charge' }),
      ],
      effects: [
        'Cuts rock, which in the Hollow Karst is the only way anything is built or reached',
        'Fire rather than blast when unconfined, which makes it survivable to transport and terrible in a hold',
        'Every cask is a document: two burned licence numbers and a weight entry at each end',
      ],
      origin: 'Cave Agrarian City, the Deep Rota; charge blended from White Pans nitre',
      legalStatus: 'Licensed',
      legalNotes:
        'Cave Agrarian City: blasting licences are issued by [[faction.mirror-assembly|the Mirror Assembly]] against a named gallery and a named rota, and an unlicensed cask is a capital matter because a bad shot takes a duct. Sifting City: casks move freely and are not licensed at all, since the Pans have nothing to collapse. Magic City: barred inside the ward line entirely, on the reasonable grounds that nobody wants a fire next to a chain. Sky City: the mass warrant prices a cask at four times its weight for risk, which is a ban expressed as a tariff.',
      recipe: ['recipe.pan-crust-sorting', 'recipe.brine-clarification'],
      materials: ['material.pan-nitre', 'material.blackbole-timber'],
      requiredSkills: ['skill.charge-blending', 'skill.bench-sense'],
      upgradesTo: TBD('Is there a shaped or delayed charge above the plain cask, and does the Assembly know that would make sabotage precise?'),
      sellers:
        'Issued from the Deep Rota magazine against a licence and a signature, weighed out in front of the crew. Sold openly in the Sifting City to anyone, by the crate, which is why every unlicensed cask in the karst arrived up the Karst Fork with [[faction.low-tally|the Low Tally]] and a bill of lading that says table salt.',
      devNotes:
        PROPOSAL('The 9.4 kg charge, the metre-and-a-fifth yield, the weigh-in and weigh-out accounting and the four-times-weight Sky City tariff are proposed. The manifest establishes the small blasting cask, the licensing for gallery cutting, the tracking by barrel and ounce and the capital penalty for unlicensed casks.') +
        '\n\nDESIGN INTENT: explosives that are a logistics problem rather than a damage number. The interesting question is never "can we blow this open" but "whose ounce did that come off". Note the deliberate asymmetry: the same object is a capital matter in one city and unlicensed hardware two weeks upriver, and the smuggling route between the two writes itself.',
    },
  }),

  E({
    id: 'item.fever-clay',
    type: 'item',
    name: 'Fever Clay',
    aka: ['the roll', 'karst pack'],
    status: 'draft',
    summary: 'Karst clay cultured with fungus, packed into a wound or swallowed against Drown marsh fever.',
    tags: ['consumable', 'medicine', 'cave-agrarian-city', 'biology'],
    fields: {
      overview:
        'A two-hundred-gram roll of grey karst clay carrying a living fungal culture split off a [[material.cudmother|cudmother]] starter. Swallowed inside seventy-two hours of the first shivering, it cuts marsh fever mortality from roughly one in five to something nearer one in thirty. Packed into a wound, it stops suppuration about two times in three.\n\nIt is not a potion and there is no magic in it. It is a living thing kept in mud, and it dies if it freezes, dries or waits. Sealed it keeps forty days. Opened it keeps six. A roll that has crossed a desert is a roll of grey clay and nothing else, and the people selling grey clay in the White Pans know that perfectly well.\n\nThe complication is that cudmother export is barred outright from the Hollow Karst, and fever clay is cudmother with extra steps. The Assembly has ruled twice that the clay is a preparation and not a starter, and both rulings are legally shaky, and the entire supply of medicine to the Drown rests on nobody choosing to test it.',
      itemType: 'Consumable',
      rarity: 'Common',
      value: '12 day-wages a roll in the karst; 60 in the delta in the wet season; 200 in the Lazaret and no receipt',
      weight: '200 g a roll',
      stats: [
        row({ stat: 'Dose', value: 'one roll swallowed over three days, or packed whole into a wound' }),
        row({ stat: 'Window', value: 'effective inside 72 hours of first symptoms; after the third day, nothing' }),
        row({ stat: 'Marsh fever', value: 'mortality from about 1 in 5 down to about 1 in 30 if given in time' }),
        row({ stat: 'Wound packing', value: 'stops suppuration in roughly 2 cases in 3' }),
        row({ stat: 'Adverse reaction', value: 'about 1 in 40, and the reaction is worse than the fever' }),
        row({ stat: 'Shelf life', value: '40 days sealed, 6 days opened, none at all if it freezes or dries' }),
      ],
      effects: [
        'Treats Drown marsh fever if given inside three days, which is the whole design constraint',
        'A living culture: it can be kept alive, split and cultured on by anyone with [[skill.spore-lore|Spore Lore]]',
        'Legally a preparation rather than a cudmother starter, which is the fiction the entire supply rests on',
      ],
      origin: 'Cave Agrarian City, the Sump Works; clay from the Hollow Karst, culture split from cudmother',
      legalStatus: 'Legal',
      legalNotes:
        'Legal in every settlement and rationed in one. In the Drown [[faction.moorstone-compact|the Moorstone Compact]] issues it by lot in the wet season, and the lot is the most closely watched draw in the delta. The Mediterranean City lazaret buys it in quantity through intermediaries and does not minute the purchases, because admitting marsh fever has reached the coast means quarantine, and quarantine rots the olive harvest. [[npc.anthimos-vellani|Anthimos Vellani]] is the intermediary.',
      recipe: TBD('Culturing a starter into fever clay has no recipe entry. Is it a bench process, or deliberately a Spore Lore check with a spoilage risk?'),
      materials: ['material.cudmother'],
      requiredSkills: ['skill.spore-lore', 'skill.plague-reading'],
      upgradesTo: TBD('Is there a stabilised or dried preparation that survives a desert crossing, and has anyone in the karst tried and failed?'),
      sellers:
        'Sold openly in the Sump Works and along the karst markets, and carried down the Karst Fork by anyone going that way. In the delta it is issued rather than sold. In the Mediterranean City it does not officially exist, which makes it about seventeen times its karst price and entirely undocumented.',
      devNotes:
        PROPOSAL('The 72-hour window, the mortality figures, the shelf lives and the preparation-not-starter ruling are proposed. The manifest establishes the karst clay cultured with fungus, the wound packing, the swallowing and the Drown marsh fever it treats.') +
        '\n\nDESIGN INTENT: the setting\'s medicine is biology and logistics, not healing magic. Everything interesting about fever clay is that it is alive and perishable, which turns a healing item into a supply chain a party can be responsible for. Hooks straight into [[npc.anthimos-vellani|Vellani]]\'s three unreported patients: the reason he can keep them quiet is that he can treat them, and the reason he can treat them is a trade that is not quite legal at the other end.',
    },
  }),

  E({
    id: 'item.cinderroot-cordial',
    type: 'item',
    name: 'Cinderroot Cordial',
    aka: ['ringside', 'the cup'],
    status: 'draft',
    summary: 'Cinderroot painkiller sold ringside by the cup; three seasons of it and your hands stop working.',
    tags: ['consumable', 'arena-city', 'addiction', 'dark'],
    fields: {
      overview:
        'Ninety millilitres in a shallow tin cup, sold on every stair of [[landmark.the-sunken-ring|the Sunken Ring]] between bouts. It takes about six minutes and then the pain is somewhere else for four hours. It does nothing at all to the injury.\n\nThat is the whole product. A fighter with a broken hand who cannot feel the hand keeps fighting on it, and a hand that is fought on for four more bouts does not set. The Ring\'s own surgeons prescribe it, correctly, because a fighter who cannot fight cannot pay down a bond, and the surgeons are paid by the Chamber.\n\nThe damage is peripheral and cumulative and it is measured in cups rather than in years. The observed threshold is somewhere around nine hundred cups, after which the fingers stop reporting and then stop working, in that order. Cup-sellers on the stairs know the count of their regulars better than the regulars do, and the Chamber has never asked them to stop.',
      itemType: 'Consumable',
      rarity: 'Common',
      value: '1 day-wage a cup at the Ring; 6 in the Magic City; 40 in the Mediterranean City and a licensing charge with it',
      weight: '90 ml; 140 g with the cup, which you return',
      stats: [
        row({ stat: 'Dose', value: '90 ml; onset about 6 minutes; effect about 4 hours' }),
        row({ stat: 'Pain suppression', value: 'near total for the limb; the injury is untouched and unfelt' }),
        row({ stat: 'Second cup', value: 'fine motor control down about 30% for the rest of the day' }),
        row({ stat: 'Cumulative damage', value: 'peripheral nerve loss; observed threshold around 900 cups' }),
        row({ stat: 'Withdrawal', value: 'three days of tremor, which for a bonded fighter is three days of missed card' }),
      ],
      effects: [
        'Removes pain penalties for four hours without treating the injury underneath',
        'Masks a fracture until it cannot be set, which is the actual mechanism of harm',
        'Counts are cumulative and permanent: track cups per character, not doses per session',
      ],
      origin: 'Arena City, the Banner Streets; cinderroot carried in from the Cinder Waste margin',
      legalStatus: 'Varies by city',
      legalNotes:
        'Arena City: sold openly by the cup and prescribed by the Ring\'s own surgeons. Mediterranean City: banned outright, possession is a licensing offence, and the harbour board searches for it specifically because the lazaret keeps a ward full of people who arrived on it. Magic City: permitted and quietly encouraged, since a caster who cannot feel [[mechanic.the-toll|the Toll]] surfacing works longer before stopping. Gilded Ascent: legal, unremarked and ubiquitous in the hoist yards, where the men who load the terraces drink it the way other people drink tea.',
      recipe: TBD('Boiling cinderroot into cordial has no recipe entry. Is it a bench process worth writing, or kept deliberately as informal ringside work?'),
      materials: TBD('Cinderroot has no material or food entry anywhere in the seed. Should it be a Cinder Waste material, and who cuts it, given that the caravans out of Orath are the only fixed schedule across that margin?'),
      requiredSkills: ['skill.reagent-work'],
      upgradesTo: TBD('Is there a stronger or injected preparation, and would the Chamber allow one to be sold at the Ring?'),
      sellers:
        'Cup-sellers on every stair of the Sunken Ring, licensed by the Chamber, paying a pitch fee. [[npc.berke-chagra|Berke Chagra]] takes a share of four of the eleven pitches and would rather nobody worked that out. Carried west by [[npc.kavel-uur|Kavel Uur]]\'s caravans in sealed jars, which are declared as cordial because that is what they are.',
      devNotes:
        PROPOSAL('The 900-cup threshold, the four-hour effect, the surgeon prescription and the pitch-fee arrangement are proposed. The manifest establishes the cinderroot painkiller sold ringside by the cup, the three-season damage to the hands, the Cinder Waste origin and the Mediterranean ban.') +
        '\n\nDESIGN INTENT: an addiction item that is not moralised and is not fun. The cordial works. That is the problem. Track cups, make the count visible to the player, and never once have an NPC deliver a warning speech: the cup-sellers know the count and say nothing because saying something costs them a pitch. Pairs with [[mechanic.ring-bond|the Ring Bond]], where injuries persist and the only way out is to keep fighting.',
    },
  }),

  E({
    id: 'item.pale-dust',
    type: 'item',
    name: 'Pale Dust',
    aka: ['the fines', 'last mesh'],
    status: 'draft',
    summary: 'Refined sifting fines sold as a stimulant; brief clarity, then the lung, then the indenture ward.',
    tags: ['contraband', 'sifting-city', 'addiction', 'dark'],
    fields: {
      overview:
        'The fraction that comes off the last mesh of a cascade, refined once more and sold by the two-gram spoon. It takes ninety seconds. For five or six hours the user does not need sleep, does not want food, and is completely certain about everything.\n\nThe particles are three microns and smaller, which is the whole of the medical story. Nothing that small comes back out of a lung. The pan crews who use it average four years shorter working lives than crews on the same rigs who do not, and every one of those four years is worked off against a debt that does not shorten with the life.\n\nIt is sold openly in the Sifting City and the Sieve Company takes a cut, on the reasoning that a crew on dust makes quota. The reasoning is correct. The crews it kills are its own, and the replacement crews arrive on the same rafts as the barrels going out.',
      itemType: 'Contraband',
      rarity: 'Common',
      value: '2 day-wages a spoon in the Pans; 25 in the Gilded Ascent; 90 in the Sky City, where the risk is the price',
      weight: '2 g a spoon; sold in 40 g tins with no marking of any kind',
      stats: [
        row({ stat: 'Dose', value: '2 g; onset about 90 seconds' }),
        row({ stat: 'Effect', value: '5 to 6 hours without sleep, appetite or doubt' }),
        row({ stat: 'Particle size', value: '3 microns and below, which is why it never leaves the lung' }),
        row({ stat: 'Observed cost', value: 'about 4 years off a working life, measured against crews on the same rigs' }),
        row({ stat: 'Withdrawal', value: 'a week of crushing sleep; for a bonded crew that is a missed quota and more debt' }),
      ],
      effects: [
        'Removes fatigue penalties entirely for a shift, and removes judgement with them',
        'Irreversible lung scarring that accumulates with every dose and is never dramatic at the time',
        'Withdrawal costs a bonded worker more than the dust does, which is the trap and is deliberate',
      ],
      origin: 'Sifting City, the Lee; refined from the last-mesh fines of the sift cascades',
      legalStatus: 'Illegal',
      legalNotes:
        'Illegal in three named places and legal where it is made. Mediterranean City: prohibited, the harbour board searches for it, and the lazaret keeps a ward for the people who arrive already lost. Gilded Ascent: a hoist-yard offence prosecuted against sellers and never against users, because [[faction.concord-of-weights|the Concord]] wants the hoists running and a prosecuted crew is a stopped hoist. Sky City: a mass-warrant offence, on the entirely practical grounds that a crew on dust miscounts, and miscounting kills a lattice. Sifting City: legal, taxed, and sold within sight of the towers.',
      recipe: ['recipe.pan-crust-sorting'],
      materials: ['material.pan-nitre'],
      requiredSkills: ['skill.sieve-tuning', 'skill.reagent-work'],
      upgradesTo: TBD('Is there a refined or cut grade of dust sold to buyers outside the Pans, and does the Sieve Company know it is being adulterated?'),
      sellers:
        'Sold in the Lee by anyone, and by [[npc.tazrit-nourem|Tazrit n\'Ourem]] to the crews whose debt she holds, which is the arrangement in miniature. Moved west by [[faction.low-tally|the Low Tally]] in salt barrels, since dust in salt is dust in salt and no gate on the continent can tell them apart by looking.',
      devNotes:
        PROPOSAL('The three-micron figure, the four-year working-life figure, the Company cut and the salt-barrel route are proposed. The manifest establishes the refined sifting fines sold as a stimulant, the brief clarity, the lung, the indenture ward and the three cities where it is illegal.') +
        '\n\nDESIGN INTENT: the antagonist here is a price list, not a dealer. [[quest.pan-fever|Pan Fever]] is the quest this item exists for: the fraction that pays best is the fraction the crews keep breathing, and proving the link puts the party in front of a company that can retool, pay off or discredit them. Write users as workers making a rational short-term choice inside a debt they did not set.',
    },
  }),

  /* ================================================================ */
  /* RELICS                                                            */
  /* ================================================================ */

  E({
    id: 'item.faultstone-needle',
    type: 'item',
    name: 'Faultstone Needle',
    aka: ['a leaner', 'scar needle'],
    status: 'draft',
    summary: 'Fragment of the Bound Fault that leans toward the Scar and lies within a day\'s march of it.',
    tags: ['relic', 'magic-city', 'navigation', 'illegal'],
    fields: {
      overview:
        'A sixty-two-millimetre shard of [[material.faultglass|faultglass]] on three hundred millimetres of thread. Held still, it leans toward [[landmark.the-bound-fault|the Bound Fault]]. It is accurate to about four degrees at two hundred kilometres, which is a very long way to be four degrees right, and it degrades steadily as it closes until inside thirty kilometres it points at nothing in particular and then lies down.\n\nThis is exactly backwards from what a navigator wants and exactly right for what the interior is like. The Cinder Waste margin, the far White Pans and the [[region.ashen-steppe|Ashen Steppe]] have no roads and no landmarks worth the name, and a bearing that is good at range and useless at arrival gets you to within a day of somewhere you can then see. [[npc.kavel-uur|Kavel Uur]] runs his caravans on one and has never described it to a customs officer.\n\nIt also goes still for about nine hours after any working within twenty metres, which makes it an unreliable instrument in the company of practitioners and a very reliable detector of them.',
      itemType: 'Relic',
      rarity: 'Rare',
      value: '350 day-wages from someone who will not name themselves; nothing at all if you are caught with it',
      weight: '24 g',
      stats: [
        row({ stat: 'Shard', value: '62 mm, green-black, sorted by ear rather than measured' }),
        row({ stat: 'Accuracy', value: 'about 4 degrees at 200 km, degrading with proximity' }),
        row({ stat: 'Dead zone', value: 'useless inside 30 km of the Bound Fault; lies flat inside 5 km' }),
        row({ stat: 'Stilling', value: 'about 9 hours of no bearing after any working within 20 m' }),
        row({ stat: 'Agreement', value: 'no two needles agree closer than 2 degrees, and nobody knows why' }),
      ],
      effects: [
        'A long-range bearing across country with no roads, which is most of the interior',
        'Detects casting: a needle that has gone still means somebody worked within twenty metres of it',
        'Sleeping beside one is measurably bad for you and the measurement takes about a year to notice',
      ],
      origin: 'Magic City; chipped from the Bound Fault and carried out by people who should not have been there',
      legalStatus: 'Illegal',
      legalNotes:
        'Faultglass possession is a capital charge in three settlements and a fashion in a fourth. Tree City: the Pitchguard hangs for it, along with everything else it classes as worked magic. Cave Agrarian City: a needle found near a duct is charged as intent to sabotage the mirrors, because a stilled duct clock is a dead gallery. Sifting City: [[faction.pale-assay|the Pale Assay]] will not have unassayable material in the Pans and treats a needle as a threat to the grade system itself. Sky City: worn on a chain by Crown House daughters, and [[faction.mooring-assize|the Assize]] has decided not to notice. Magic City: licensed, and the licence has been granted eleven times in forty years.',
      recipe: TBD('Faultglass is sorted by ear, not refined. Is needle-cutting a recipe with a bench at all, or a skill check with a shatter risk and a hearing cost?'),
      materials: ['material.faultglass'],
      requiredSkills: ['skill.scar-reading', 'skill.the-far-walk'],
      upgradesTo: TBD('Is there a mounted or gimballed needle for a caravan rather than a hand, and would that be worth the extra charge if caught?'),
      sellers:
        'Nobody sells them openly. [[npc.sahat-belek|Sahat Belek]] knows where two are and will not say. [[faction.low-tally|The Low Tally]] moves perhaps six a year and prices them by the buyer rather than by the object. Every needle in circulation was chipped out by someone who is either dead or has stopped going near the fault.',
      devNotes:
        PROPOSAL('The four-degree accuracy, the dead zone, the nine-hour stilling and the eleven licences in forty years are proposed. The manifest establishes the fault fragment that leans toward the Scar and fails within a day\'s march of it.') +
        '\n\nDESIGN INTENT: an instrument with an inverted failure curve, which is much more interesting to play with than a compass. It rewards long overland travel, which the map is built for, and it punishes arrival, which is when the party has to start using their eyes. The stilling effect is a free investigation tool: a needle that stopped tells you a working happened here, and it does not tell you what.',
    },
  }),

  E({
    id: 'item.crown-bolt',
    type: 'item',
    name: 'Crown Bolt',
    aka: ['a paperweight', 'original lattice'],
    status: 'draft',
    summary: 'Original lattice bolt from the Mooring Crown, of an alloy nobody has since managed to reproduce.',
    tags: ['relic', 'sky-city', 'singular', 'mystery'],
    fields: {
      overview:
        'Two hundred and fourteen millimetres of threaded metal weighing six hundred and forty grams, taken out of [[landmark.the-mooring-crown|the Mooring Crown]] lattice during a repair. It is roughly four times stronger in tension than drawn iron of the same section, it has not corroded in four hundred years of shelf weather, and its thread pitch matches nothing in current use anywhere on the continent.\n\nEvery attempt to reproduce the alloy has failed, and the failures are well documented and unembarrassed: the Conduit College published its own in a monograph and has not revisited the subject in twenty years. Assaying a bolt destroys it, which is why there have only been four assays and why the results do not agree.\n\nEleven are loose in private hands against an original count nobody has. A counting house on the Stair will take one as collateral at four hundred day-wages sight unseen, which makes the crown bolt the only object in the seed that functions as money without being paper. [[npc.cesille-vaudry|Cesille Vaudry]] keeps hers on a desk, holding down forged tonnage returns.',
      itemType: 'Relic',
      rarity: 'Singular',
      value: '400 day-wages as collateral on the Counting Stair, which is the only public price; more from a Crown House buying quietly',
      weight: '640 g',
      stats: [
        row({ stat: 'Dimensions', value: '214 mm, threaded, 3.1 mm pitch matching nothing in current use' }),
        row({ stat: 'Tensile', value: 'about 4 times drawn iron of the same section' }),
        row({ stat: 'Corrosion', value: 'none observed in four centuries of exposure on the shelf' }),
        row({ stat: 'Known loose', value: '11 in private hands; the original lattice count is not recorded anywhere' }),
        row({ stat: 'Assays', value: '4 attempted, 4 bolts destroyed, 4 results that do not agree' }),
      ],
      effects: [
        'Accepted as collateral at any chartered house on the Counting Stair without inspection',
        'Cannot be analysed without destroying it, which has kept the question open for four hundred years',
        'Proof that the Crown was built by someone who is not building now, which nobody in the Sky City enjoys',
      ],
      origin: TBD('Who built the Mooring Crown lattice, out of what, and why has nobody repeated it in four hundred years?'),
      legalStatus: 'Restricted',
      legalNotes:
        '[[faction.mooring-assize|The Mooring Assize]] claims every bolt as city property regardless of who holds it, and has never once enforced the claim against a Crown House. Removing one during a repair is theft and is prosecuted against lattice crews, who are the only people in a position to do it. In the Gilded Ascent a bolt is straightforwardly good collateral and no house has ever asked where one came from. There is no other city with an opinion, because there are only eleven of them.',
      recipe: TBD('There is no recipe and there is not going to be one. Confirm that the point of this item is that the process is lost.'),
      materials: TBD('The Crown alloy has no material entry, deliberately. Should it get one, or does naming it spoil the only genuine unknown in the item set?'),
      requiredSkills: ['skill.lattice-work', 'skill.proof-marking'],
      upgradesTo: TBD('If anyone ever reproduces the alloy, what is the item called, and does that single fact rewrite the Sky City?'),
      sellers:
        'There is no market and there are about four buyers. Two Crown Houses buy quietly to keep the count down, [[faction.concord-of-weights|the Concord]] holds three against loans it does not expect to be repaid, and the fourth buyer is whoever has decided to find out what the alloy is and is prepared to destroy one to do it.',
      devNotes:
        PROPOSAL('The eleven loose bolts, the four destroyed assays, the four-hundred-day-wage collateral value and the College monograph are proposed. The manifest establishes the original lattice bolt and the unreproducible alloy, and explicitly leaves who made it and how as open.') +
        '\n\nDESIGN INTENT: one deliberate hole in the world, sized to fit in a pocket. Resist filling it. The bolt is most useful as a physical reminder that the Sky City is living inside something it did not build and cannot maintain, which is the same problem as the weakening updraft in a different register. If a campaign ever answers the question, it should answer it late and it should cost the Sky City something.',
    },
  }),

  /* ================================================================ */
  /* PAPER                                                             */
  /* ================================================================ */

  E({
    id: 'item.stair-writ',
    type: 'item',
    name: 'Stair Writ',
    aka: ['paper', 'a sealed'],
    status: 'draft',
    summary: 'Sealed writ of credit issued on the Counting Stair; the closest thing the continent has to money.',
    tags: ['document', 'gilded-ascent', 'credit', 'core'],
    fields: {
      overview:
        'A card of a hundred and forty by ninety millimetres, written in figures and in words, punched by [[machine.the-tally-engine|the Tally Engine]] and closed with a twelve-gram lead seal. It is a promise by a named house on [[landmark.the-counting-stair|the Counting Stair]] to pay the bearer, at named houses, in three named cities.\n\nIt is not money. No government issues it, no government stands behind it, and there is no law anywhere that requires anyone to take one. It functions as money because eleven private houses have honoured them without fail for long enough that refusing one is now the strange act. The Tally Engine clears about four thousand a day and the clearing rate is posted every ninth morning on a board the size of a door.\n\nThe fragility is the interesting part and it is not hidden. Four fifths of the reserve behind the paper is lent against Sky City counterweight leases. A writ is worth its face because everyone believes a writ is worth its face, and the belief is checked once, at the wicket, by a clerk who has never seen the reserve figures either.',
      itemType: 'Document',
      rarity: 'Common',
      value: TBD('Prices throughout this module are quoted in day-wages because no coin standard is settled anywhere in the seed. What is the smallest denomination on the continent, who strikes it, and does the Ascent use it at all?'),
      weight: '18 g with the seal',
      stats: [
        row({ stat: 'Card', value: '140 x 90 mm, punched by the Tally Engine, written twice in figures and words' }),
        row({ stat: 'Seal', value: '12 g lead, house die, broken on redemption and never re-used' }),
        row({ stat: 'Honoured at', value: 'the issuing house plus named houses in three cities' }),
        row({ stat: 'Distance discount', value: '2% at the Sky City, 6% on the Meridian Coast, 11% and rising in the Drown' }),
        row({ stat: 'Staleness', value: 'a writ over 90 days old is refused at the wicket, without appeal and without insult' }),
        row({ stat: 'Clearing volume', value: 'about 4,000 a day through the Tally Engine' }),
      ],
      effects: [
        'Transferable to bearer without endorsement, which is what makes it usable and what makes it stealable',
        'Carries counterparty risk, not sovereign risk: a writ is only as good as the house named on it',
        'The distance discount is a live, readable measure of how much the world trusts the Ascent this month',
      ],
      origin: 'Gilded Ascent, the Counting Terrace; issued by chartered houses, cleared at the Tally Engine',
      legalStatus: 'Legal',
      legalNotes:
        'Honoured everywhere, guaranteed nowhere. Keth Veyra takes writs on the quay without comment and no Ascent house has a factor there, so a writ presented at Keth Veyra clears at a discount nobody has been able to explain. The Tree City honours writs at the gate and has no use for them inside the pale, where licence-shares do the work. Orath does not honour them at all, which is the practical definition of where guild law stops. Forging one is [[item.cut-seal|a different crime]] and a much more serious one.',
      recipe: ['recipe.bonded-tally-card'],
      materials: TBD('Card stock, iron-gall ink and lead seal blanks have no material entries. Add them, or accept that paper is below the resolution of the material set?'),
      requiredSkills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.writ-craft'],
      upgradesTo: TBD('Is there an instrument above the bearer writ, such as a house-to-house standing credit, and would the Concord let one exist outside its own books?'),
      sellers:
        'Issued rather than sold, against collateral at 140% or two sponsors, by any of eleven chartered houses on the Counting Terrace. Bought and sold second-hand at a discount all over the continent by people who would rather have certain money now than face value in ninety days, and that discount is where [[faction.low-tally|the Low Tally]] makes a quiet living.',
      devNotes:
        PROPOSAL('The card dimensions, the ninety-day staleness rule, the distance discounts and the four-thousand-a-day figure are proposed. The manifest and the city entries establish the sealed writ of credit, the Counting Stair issue and its role as the continent\'s de facto money.') +
        '\n\nPRICING CONVENTION for the whole item set: every `value` in this module is quoted in day-wages, one day of unskilled labour in the Ascent hoist yards, because no coin standard exists in the seed. If a denomination is ever decided this is the entry to fix first and the rest are arithmetic.\n\nDESIGN INTENT: the anchor object for [[mechanic.standing-ledger|the Standing Ledger]] and for every cross-city trade or debt plot. Its most useful property at the table is the distance discount, which is a single number a party can watch move and which tells them how the world is feeling about the Ascent without anyone explaining anything.',
    },
  }),

  E({
    id: 'item.indenture-bond',
    type: 'item',
    name: 'Indenture Bond',
    aka: ['the paper', 'a term'],
    status: 'draft',
    summary: 'The paper that owns a person: term, debt, and the ports where it can be enforced.',
    tags: ['document', 'indenture', 'dark', 'law'],
    fields: {
      overview:
        'A single sheet, three hundred by two hundred millimetres, carrying three seals: the holder, the registry and a witness. On the face, a term in months and a debt in day-wages. On the reverse, the schedule: the named settlements in which the bond can be enforced, and the named settlements in which it cannot.\n\nThe schedule is the entire object. A bond is not a chain, it is a jurisdiction, and its power stops at a line on a map that is printed on the back of it. This is why runaways run in one direction and why [[spell.debt-mark|debt marks]] exist: a mark makes the bond self-enforcing at a gate and turns a jurisdictional document into a physical one.\n\nBonds are assignable up to four times before re-registration, and each assignment is written on the reverse below the schedule. A sheet that has been assigned three times, in three hands, trades at about sixty per cent of face, because a person who has been sold three times is a person who has already tried something.',
      itemType: 'Document',
      rarity: 'Common',
      value: 'Face is the debt written on it, from 200 to 4,000 day-wages; a thrice-assigned bond trades at about 60% of that',
      weight: '14 g',
      stats: [
        row({ stat: 'Sheet', value: '300 x 200 mm; three seals: holder, registry, witness' }),
        row({ stat: 'Face', value: 'term in months and debt in day-wages, both written twice' }),
        row({ stat: 'Schedule', value: 'named enforcing settlements on the reverse; this is the operative part' }),
        row({ stat: 'Assignment', value: 'up to 4 transfers before compulsory re-registration' }),
        row({ stat: 'Market', value: 'a thrice-assigned bond trades at about 60% of face' }),
        row({ stat: 'Discharge', value: 'the sheet is struck through and returned; no copy is kept, which is a problem' }),
      ],
      effects: [
        'Transfers a claim on a person\'s labour, enforceable only where the schedule says it is',
        'Assignable and tradable, which is why [[faction.bondwrights-hall|the Bondwrights\' Hall]] can make a market in people',
        'Physically destructible: burning a strongroom of bonds frees several hundred people and feeds none of them',
      ],
      origin: 'Arena City Writ Court and Sifting City labour registries; written and traded across the trading cities',
      legalStatus: 'Varies by city',
      legalNotes:
        'Arena City and Sifting City: lawful, registered, priced and openly traded. Gilded Ascent: enforceable but not issuable, a distinction [[faction.concord-of-weights|the Concord]] defends carefully because it wants the trade without the reputation. Mediterranean City: void on presentation and prosecutable, so a bond shown in the port becomes evidence against whoever showed it, and the harbour board has voided nine in four years. Tree City: not recognised, because the Pitchguard conscripts and regards a bond as a rival claim on the same body. Black Weir: the Company neither recognises nor refuses them and simply charges the toll.',
      recipe: TBD('Should the Writ Court registry press be a machine and a recipe, or is bond-writing deliberately a skill and a seal rather than a production chain?'),
      materials: TBD('Paper, ink and seal wax have no material entries. See the same question on the stair writ.'),
      requiredSkills: ['skill.writ-craft', 'skill.bond-broking', 'skill.plain-letters'],
      upgradesTo: TBD('Is a debt-marked bond a separate item, or the same sheet with a spell attached? Recommend the latter, so the paper and the binding can be separated in play.'),
      sellers:
        '[[faction.bondwrights-hall|The Bondwrights\' Hall]] writes, prices and resells them across the trading cities and is entirely respectable about it. [[npc.tazrit-nourem|Tazrit n\'Ourem]] holds physical bonds on about a third of the pan crews in one strongroom under her middle tower. [[npc.doret-halvane|Doret Halvane]]\'s brother is a sheet in a strongroom in the Sifting City, and she will trade sixty warehouse keys for it without haggling.',
      devNotes:
        PROPOSAL('The three seals, the schedule on the reverse, the four-assignment limit and the sixty-per-cent market are proposed. The manifest establishes the term, the debt, the named enforcing ports, the Arena City and Sifting City registries and the Mediterranean voiding.') +
        '\n\nDESIGN INTENT: indenture is an institution in this world, so it needs a document rather than a villain. Everything cruel about this item is procedural, and every procedure works. Two design consequences worth keeping: the schedule makes geography matter more than force, and the physical sheet makes liberation an achievable, specific act with an immediate second problem attached. Freeing several hundred people starts an argument about who feeds them, which is precisely the argument the holders use to justify holding them. Handle as consequence, never as spectacle.',
    },
  }),

  E({
    id: 'item.factors-seal',
    type: 'item',
    name: "Factor's Seal",
    aka: ['a die', 'the house hand'],
    status: 'draft',
    summary: 'Brass seal that lets a factor bind their house to a contract; loss must be reported within a day.',
    tags: ['document', 'gilded-ascent', 'licensed', 'commerce'],
    fields: {
      overview:
        'A forty-four-millimetre brass die on a turned handle, cut against a register held at [[machine.the-assay-cage|the Assay Cage]]. Impressed on a contract it binds the factor\'s house, without further signature, without a hearing and without the house being asked.\n\nThat is an extraordinary amount of authority to hang on a lump of brass, and the whole apparatus that keeps it workable is one rule: a lost seal must be reported within a day. Everything sealed before the reported hour stands. Everything after it is void. The rule is simple, it is public, and it puts the entire risk on the factor, who must choose between admitting the loss immediately and being liable for whatever the die signs while they are deciding.\n\nNine identifying flaws are cut into every die on purpose, in positions recorded only in the register. A forger working from an impression can find seven. Which two they miss is how the Assay Cage tells a [[item.cut-seal|cut seal]] from a real one, and it is the reason the Concord has never published the register and never will.',
      itemType: 'Document',
      rarity: 'Scarce',
      value: '160 day-wages to cut; the bond a factor posts against it is 2,000 and is the actual barrier',
      weight: '380 g',
      stats: [
        row({ stat: 'Die', value: '44 mm brass, cut against the Assay Cage register' }),
        row({ stat: 'Deliberate flaws', value: '9, positions recorded only in the register' }),
        row({ stat: 'Reporting rule', value: 'loss reported within one day voids everything sealed after the reported hour' }),
        row({ stat: 'Unreported loss', value: 'the factor is personally liable for whatever the die signs, without limit' }),
        row({ stat: 'Honoured in', value: 'the Gilded Ascent, Sky City, Mediterranean City and Arena City under standing agreement' }),
      ],
      effects: [
        'Binds a chartered house to a contract on the impression alone',
        'The one-day rule is the mechanic: a stolen seal is worth exactly what you can sign before it is reported',
        'A frightened factor who delays reporting is worth more to a thief than the die is',
      ],
      origin: 'Gilded Ascent, the Counting Terrace; brass struck and cut under Concord register',
      legalStatus: 'Licensed',
      legalNotes:
        'Gilded Ascent: issued by [[faction.concord-of-weights|the Concord]] against a factor\'s posted bond, and using another\'s seal is forgery against the clearing system, which is one of the very few charges the Concord will pay to pursue across a border. Sky City, Mediterranean City and Arena City honour Ascent seals under standing agreement and prosecute on Ascent evidence without re-trying the facts, which means a single cut die works in four cities at once and is tried in whichever of them catches you.',
      recipe: ['recipe.brass-billet-casting'],
      materials: ['material.orrery-bronze', 'material.blackfall-button'],
      requiredSkills: ['skill.proof-marking', 'skill.ledger-hand'],
      upgradesTo: ['item.cut-seal'],
      sellers:
        'Cut to order by two engravers on the Counting Terrace, both of whom work under the Assay Cage register and neither of whom will cut a die without a Concord warrant in front of them. There is no second-hand market. A dead factor\'s die is defaced at the Cage in front of two witnesses, and the defacing is minuted.',
      devNotes:
        PROPOSAL('The nine deliberate flaws, the one-day reporting rule, the four-city standing agreement and the posted bond are proposed. The manifest establishes the brass seal, the binding of the house and the one-day reporting requirement.') +
        '\n\nDESIGN INTENT: an authority object with a clock attached. The "upgrade path, downward" in the manifest is the whole joke and it should be played straight: the improved version of a factor\'s seal is a criminal one, and it is genuinely more capable and much shorter-lived. Useful for [[quest.the-master-weight|The Master Weight]], where the party is already inside the Concord\'s own vault and a die is lying on a bench.',
    },
  }),

  E({
    id: 'item.cut-seal',
    type: 'item',
    name: 'Cut Seal',
    aka: ['a seven', 'recut'],
    status: 'draft',
    summary: 'A factor\'s seal filed and recut to sign writs it has no right to sign; the classic Ascent forgery.',
    tags: ['contraband', 'gilded-ascent', 'forgery', 'crime'],
    fields: {
      overview:
        'A stolen die, filed flat and recut, or a fresh blank cut from a good wax impression. Either way the product is the same: a brass seal that binds a house that has not agreed to be bound, for as long as nobody compares it against the register.\n\nA competent hand takes fourteen to twenty hours and reproduces seven of the nine deliberate flaws. The two they miss are not random. Every forger has a characteristic pair, because the flaws they find are the ones they know to look for, and [[machine.the-assay-cage|the Assay Cage]] keeps a quiet index of missing-flaw pairs that names four working forgers without knowing any of their names.\n\nIt passes a wicket clerk almost always and the register almost never. That asymmetry is the whole shape of the crime: a cut seal works beautifully at the point of use and fails completely at the point of clearing, which is usually eleven days and three cities later, by which time the question is not whether it was forged but who is going to eat the loss.',
      itemType: 'Contraband',
      rarity: 'Rare',
      value: '900 day-wages commissioned, half in advance, and the price does not include being told who cut it',
      weight: '380 g',
      stats: [
        row({ stat: 'Cutting time', value: '14 to 20 hours by a competent hand, from a wax impression' }),
        row({ stat: 'Flaws reproduced', value: '7 of 9; which two are missed is the forger\'s signature' }),
        row({ stat: 'Passes', value: 'a wicket clerk about 19 times in 20' }),
        row({ stat: 'Fails', value: 'the Assay Cage register about 4 times in 5' }),
        row({ stat: 'Working life', value: 'one clearing cycle, roughly eleven days, and every impression is evidence' }),
      ],
      effects: [
        'Signs writs and contracts in another house\'s name, in four cities, for about eleven days',
        'Every use leaves a physical impression on a document that survives and can be matched',
        'The Concord\'s response is repricing rather than prosecution, which falls on everyone except the forger',
      ],
      origin: 'Gilded Ascent, the Under-Stair; cut from stolen dies and wax impressions',
      legalStatus: 'Illegal',
      legalNotes:
        'Illegal wherever stair writs are honoured, which is everywhere except Orath in practice. Gilded Ascent: a capital matter, tried at the Concord\'s own bench under its charter, and one of the only crimes for which the Concord will pay for an extradition. Sky City, Mediterranean City and Arena City: prosecuted on Ascent evidence without re-trying the facts, under the same standing agreement that makes the real seal work in four cities. Orath: guild law does not reach it, which is precisely why [[quest.written-off|a runaway factor with guild paper]] went there.',
      recipe: TBD('Forgery has no recipe entry and probably should not have one. Confirm that cutting a seal is a False Proof check with a time cost, not a crafting bench.'),
      materials: ['material.orrery-bronze'],
      requiredSkills: ['skill.false-proof', 'skill.proof-marking'],
      upgradesTo: TBD('Is there a forgery good enough to pass the register, and if one exists, has the Concord already stopped publishing that it can tell?'),
      sellers:
        'Nobody sells them; they are commissioned. [[npc.doret-halvane|Doret Halvane]] can find who, for the price of a cable inspection, and her board of sixty-odd wax key impressions is the same trade in a different medium. [[faction.low-tally|The Low Tally]] commissions perhaps three a year and burns each one after a single cycle, which is why it has never lost a cutter.',
      devNotes:
        PROPOSAL('The seven-of-nine reproduction, the missing-flaw index, the eleven-day working life and the pass and fail rates are proposed. The manifest establishes the filed and recut factor\'s seal, the Ascent forgery trade and its illegality wherever stair writs are honoured.') +
        '\n\nDESIGN INTENT: a crime item with a built-in expiry and a built-in cost to third parties. The party can use it, it will work, and eleven days later a repricing lands on people who had nothing to do with it. That is the correct shape for financial crime in this setting. The missing-flaw index is the investigation hook and it works in both directions: it can identify a forger the party is hunting, or identify the party.',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* --- Where things are made -------------------------------------- */
  R('item.palisade-arbalest', 'located_in', 'district.tree-city-spanworks', 'issued against a numbered roll'),
  R('item.gallery-lath', 'located_in', 'district.tree-city-spanworks'),
  R('item.bastion-jack', 'located_in', 'district.tree-city-pitch-yards', 'splints are Pitchworks waste'),
  R('item.tallyblade', 'located_in', 'district.arena-city-scute-yards', 'the ring forge'),
  R('item.quitblade', 'located_in', 'district.arena-city-scute-yards', 'reforged from a spent tallyblade'),
  R('item.cinderroot-cordial', 'located_in', 'district.arena-city-banner-streets'),
  R('item.indenture-bond', 'located_in', 'district.arena-city-writ-court', 'written, sealed and registered'),
  R('item.springlock', 'located_in', 'district.mediterranean-city-conduit-yards'),
  R('item.governor-spring', 'located_in', 'district.mediterranean-city-conduit-yards', 'four licensed benches'),
  R('item.orrery-tables', 'located_in', 'district.mediterranean-city-orrery-precinct'),
  R('item.scourglass-sabre', 'located_in', 'district.sifting-city-the-crucible-sheds'),
  R('item.assayers-tray', 'located_in', 'district.sifting-city-assay-row'),
  R('item.sift-screen', 'located_in', 'district.sifting-city-the-tower-line'),
  R('item.pale-dust', 'located_in', 'district.sifting-city-the-lee'),
  R('item.chalked-harness', 'located_in', 'district.magic-city-chalk-row'),
  R('item.ward-pin', 'located_in', 'district.magic-city-chalk-row'),
  R('item.bound-harness', 'located_in', 'district.magic-city-chainhouse-ward', 'inlay and numbering'),
  R('item.faultstone-needle', 'located_in', 'landmark.the-bound-fault', 'chipped out by people who should not have been there'),
  R('item.crown-bolt', 'located_in', 'landmark.the-mooring-crown', 'taken out during repairs'),
  R('item.ballast-jacket', 'located_in', 'district.sky-city-counterweight-quarter'),
  R('item.mooring-lance', 'located_in', 'district.sky-city-mooring-ring'),
  R('item.stair-writ', 'located_in', 'district.gilded-ascent-counting-terrace'),
  R('item.factors-seal', 'located_in', 'district.gilded-ascent-counting-terrace'),
  R('item.oxblood-coat', 'located_in', 'district.gilded-ascent-counting-terrace'),
  R('item.cut-seal', 'located_in', 'district.gilded-ascent-under-stair', 'cut where the register cannot see'),
  R('item.sunwell-mirror', 'located_in', 'district.cave-agrarian-city-mirror-quarter'),
  R('item.fever-clay', 'located_in', 'district.cave-agrarian-city-sump-works'),
  R('item.nitre-cask', 'located_in', 'district.cave-agrarian-city-deep-rota', 'issued from the rota magazine'),
  R('item.moor-stake', 'located_in', 'district.floating-swamp-settlement-the-stone-lots'),
  R('item.weirhook', 'located_in', 'district.black-weir-the-gantry-yards'),

  /* --- Crafted at ------------------------------------------------- */
  R('item.palisade-arbalest', 'crafted_at', 'machine.the-limb-press'),
  R('item.gallery-lath', 'crafted_at', 'machine.the-limb-press'),
  R('item.governor-spring', 'crafted_at', 'machine.the-drawbench-vaults', 'eleven hours of conduit slot each'),
  R('item.springlock', 'crafted_at', 'machine.the-drawbench-vaults'),
  R('item.mooring-lance', 'crafted_at', 'machine.the-drawbench-vaults', 'the only seamless tube on the continent'),
  R('item.sift-screen', 'crafted_at', 'machine.the-drawbench-vaults'),
  R('item.assayers-tray', 'crafted_at', 'machine.the-assay-cage', 'card books registered here'),
  R('item.stair-writ', 'crafted_at', 'machine.the-tally-engine', 'punched and cleared'),
  R('item.chalked-harness', 'crafted_at', 'machine.the-ward-kilns'),
  R('item.ward-pin', 'crafted_at', 'machine.the-ward-kilns'),
  R('item.weirhook', 'crafted_at', 'machine.the-sluice-hammers'),
  R('item.moor-stake', 'crafted_at', 'machine.the-sluice-hammers', 'heads beaten at the weir, cut in the delta'),
  R('item.bastion-jack', 'crafted_at', 'machine.the-pitchworks'),
  R('item.pale-dust', 'crafted_at', 'machine.the-sieve-cascade', 'the last mesh'),
  R('item.sunwell-mirror', 'crafted_at', 'machine.the-mirror-ducts', 'leaves come off condemned duct plate'),

  /* --- Materials and skills --------------------------------------- */
  R('item.palisade-arbalest', 'requires', 'material.blackbole-timber'),
  R('item.palisade-arbalest', 'requires', 'skill.set-and-brace', 'to shoot from a moving bridge'),
  R('item.gallery-lath', 'requires', 'material.stairwire', 'the spanning cable'),
  R('item.gallery-lath', 'requires', 'skill.gallery-drill'),
  R('item.tallyblade', 'requires', 'material.blister-bar'),
  R('item.tallyblade', 'requires', 'skill.ring-craft'),
  R('item.quitblade', 'requires', 'skill.proof-marking', 'the cold-struck mark is the document'),
  R('item.scourglass-sabre', 'requires', 'material.pan-nitre', 'flux for the laminate'),
  R('item.scourglass-sabre', 'requires', 'skill.heat-reading'),
  R('item.springlock', 'requires', 'item.governor-spring', 'a stack of four'),
  R('item.springlock', 'requires', 'material.orrery-bronze'),
  R('item.springlock', 'requires', 'skill.bench-sense'),
  R('item.chalked-harness', 'requires', 'material.ward-chalk', 'a round every five to nine days'),
  R('item.chalked-harness', 'requires', 'item.ward-pin', 'twelve to a harness'),
  R('item.chalked-harness', 'requires', 'skill.chalk-hand'),
  R('item.bound-harness', 'requires', 'material.levin-salt', 'the inlay compound'),
  R('item.bound-harness', 'requires', 'skill.ward-cutting'),
  R('item.bound-harness', 'requires', 'skill.load-binding'),
  R('item.bastion-jack', 'requires', 'material.blackbole-timber', 'pitch-cured offcut'),
  R('item.bastion-jack', 'requires', 'skill.plate-and-seam'),
  R('item.ballast-jacket', 'requires', 'material.mirelac', 'proofed cloth'),
  R('item.ballast-jacket', 'requires', 'skill.lattice-work'),
  R('item.mooring-lance', 'requires', 'material.stairwire', 'sixty metres of line'),
  R('item.mooring-lance', 'requires', 'skill.pressure-fitting'),
  R('item.weirhook', 'requires', 'material.mire-bloom'),
  R('item.weirhook', 'requires', 'skill.marsh-footing'),
  R('item.sunwell-mirror', 'requires', 'material.sunwell-mica'),
  R('item.sunwell-mirror', 'requires', 'skill.mirror-cutting'),
  R('item.assayers-tray', 'requires', 'material.clearcast-glass', 'the loupe'),
  R('item.assayers-tray', 'requires', 'skill.proof-marking', 'the licence attaches to the mark'),
  R('item.moor-stake', 'requires', 'material.mire-bloom'),
  R('item.moor-stake', 'requires', 'skill.plain-letters', 'to register a mark at all'),
  R('item.orrery-tables', 'requires', 'skill.weather-eye'),
  R('item.governor-spring', 'requires', 'material.blackfall-button', 'the drawing dies'),
  R('item.governor-spring', 'requires', 'skill.bench-sense'),
  R('item.ward-pin', 'requires', 'material.levin-salt', 'a trace in the scribed cut'),
  R('item.ward-pin', 'requires', 'skill.ward-cutting'),
  R('item.sift-screen', 'requires', 'material.blackfall-button'),
  R('item.sift-screen', 'requires', 'skill.sieve-tuning'),
  R('item.nitre-cask', 'requires', 'material.pan-nitre'),
  R('item.nitre-cask', 'requires', 'skill.charge-blending'),
  R('item.fever-clay', 'requires', 'material.cudmother', 'export of the starter is barred outright'),
  R('item.fever-clay', 'requires', 'skill.spore-lore'),
  R('item.cinderroot-cordial', 'requires', 'skill.reagent-work'),
  R('item.pale-dust', 'requires', 'material.pan-nitre'),
  R('item.faultstone-needle', 'requires', 'material.faultglass'),
  R('item.faultstone-needle', 'requires', 'skill.scar-reading'),
  R('item.stair-writ', 'requires', 'skill.ledger-hand'),
  R('item.indenture-bond', 'requires', 'skill.bond-broking'),
  R('item.indenture-bond', 'requires', 'skill.writ-craft'),
  R('item.factors-seal', 'requires', 'material.orrery-bronze'),
  R('item.cut-seal', 'requires', 'skill.false-proof'),
  R('item.oxblood-coat', 'requires', 'material.orrery-bronze', 'the tallies, which are the only part that matters'),

  /* --- Sold by ---------------------------------------------------- */
  R('item.stair-writ', 'sold_by', CITY.gildedAscent, 'issued against collateral at 140%'),
  R('item.factors-seal', 'sold_by', CITY.gildedAscent, 'cut only against a Concord warrant'),
  R('item.oxblood-coat', 'sold_by', CITY.gildedAscent, 'the coat, never the brass'),
  R('item.cut-seal', 'sold_by', 'npc.doret-halvane', 'she does not cut them; she knows who does', true),
  R('item.governor-spring', 'sold_by', CITY.mediterranean, 'four benches, logged by batch'),
  R('item.springlock', 'sold_by', CITY.mediterranean, 'eleven days and a counter-signature'),
  R('item.orrery-tables', 'sold_by', CITY.mediterranean, 'numbered edition of 1,100, four times a year'),
  R('item.orrery-tables', 'sold_by', CITY.kethVeyra, 'unnumbered copies on the fog quays at winter prices'),
  R('item.assayers-tray', 'sold_by', CITY.siftingCity, 'kit and card book never sold together'),
  R('item.sift-screen', 'sold_by', CITY.siftingCity, 'by the crate, never second-hand'),
  R('item.scourglass-sabre', 'sold_by', CITY.siftingCity, 'wholesale out of the Outbound Yard'),
  R('item.pale-dust', 'sold_by', CITY.siftingCity, 'legal, taxed, within sight of the towers'),
  R('item.pale-dust', 'sold_by', 'npc.tazrit-nourem', 'to the crews whose debt she holds'),
  R('item.tallyblade', 'sold_by', CITY.arenaCity, 'issued against a signature, not sold to fighters'),
  R('item.quitblade', 'sold_by', CITY.arenaCity, 'struck once per discharged bond, never sold'),
  R('item.cinderroot-cordial', 'sold_by', CITY.arenaCity, 'by the cup on every stair of the Ring'),
  R('item.cinderroot-cordial', 'sold_by', 'npc.berke-chagra', 'four of the eleven pitches'),
  R('item.indenture-bond', 'sold_by', 'faction.bondwrights-hall', 'written, priced and resold, entirely respectably'),
  R('item.ward-pin', 'sold_by', CITY.magicCity, 'sealed tubes on Chalk Row, loose pins in the Salt Vats'),
  R('item.chalked-harness', 'sold_by', CITY.magicCity, 'carrier, plates and first drawing as one price'),
  R('item.bound-harness', 'sold_by', CITY.magicCity, 'issued against a licence, never sold'),
  R('item.mooring-lance', 'sold_by', CITY.skyCity, 'against a crew licence and a sponsor'),
  R('item.ballast-jacket', 'sold_by', CITY.skyCity, 'weighed and stamped on the counter'),
  R('item.bastion-jack', 'sold_by', CITY.treeCity, 'by the rack, to anyone at all'),
  R('item.palisade-arbalest', 'sold_by', 'npc.vetla-torvik', 'the only reliable supply outside the pale'),
  R('item.fever-clay', 'sold_by', CITY.caveAgrarian, 'openly in the Sump Works and along the karst markets'),
  R('item.nitre-cask', 'sold_by', CITY.caveAgrarian, 'issued from the magazine against a named gallery'),
  R('item.sunwell-mirror', 'sold_by', CITY.caveAgrarian, 'arms openly, leaves never'),
  R('item.moor-stake', 'sold_by', CITY.floatingSwamp, 'by the four families who hold the register'),
  R('item.weirhook', 'sold_by', CITY.blackWeir, 'by the dozen, to anyone on the river'),
  R('item.faultstone-needle', 'sold_by', 'npc.sahat-belek', 'he knows where two are and will not say', true),

  /* --- Used by ---------------------------------------------------- */
  R('item.palisade-arbalest', 'used_by', 'faction.pitchguard', 'issue kit of the gallery watch'),
  R('item.palisade-arbalest', 'used_by', 'npc.saarik-rauda'),
  R('item.gallery-lath', 'used_by', 'faction.pitchguard', '210 approved mounts, eleven refused'),
  R('item.bastion-jack', 'used_by', 'faction.pitchguard', 'the levy wears jacks; officers wear laminate'),
  R('item.tallyblade', 'used_by', 'npc.aylun-torgai', 'sixteen notches and still owned'),
  R('item.tallyblade', 'used_by', 'faction.red-writ', 'the collar is the contract'),
  R('item.quitblade', 'used_by', 'npc.aylun-torgai', 'what she is owed and has never held'),
  R('item.scourglass-sabre', 'used_by', 'faction.red-writ', 'undercard kit, bought by the crate'),
  R('item.springlock', 'used_by', 'faction.low-tally', 'quiet, indoors, and traceable to a bench that is not theirs'),
  R('item.chalked-harness', 'used_by', 'faction.fetterhouse', 'chalk-row labour and kiln burners'),
  R('item.bound-harness', 'used_by', 'faction.fetterhouse', 'sixty-one live numbers on the roll'),
  R('item.bound-harness', 'used_by', 'npc.ysme-drannik', 'number 31, still on her in the chain-house'),
  R('item.ward-pin', 'used_by', 'npc.toval-cherek', 'by the hundred at the fault chains'),
  R('item.ward-pin', 'used_by', 'faction.fetterhouse'),
  R('item.ballast-jacket', 'used_by', 'npc.perrine-orlaunt', 'a ditched jacket weighs what a crate of nothing weighs'),
  R('item.mooring-lance', 'used_by', 'faction.mooring-assize', 'licensed, serial-banded, logged'),
  R('item.mooring-lance', 'used_by', 'faction.moorstone-compact', 'four of them, for catching runaway rafts'),
  R('item.weirhook', 'used_by', 'npc.dagren-hoyle'),
  R('item.weirhook', 'used_by', 'npc.ost-vennick'),
  R('item.weirhook', 'used_by', 'faction.iron-sluice-company', 'issued and counted back in at shift end'),
  R('item.sunwell-mirror', 'used_by', 'npc.bedel-lehun', 'bought four years ago from someone he will not name'),
  R('item.sunwell-mirror', 'used_by', 'npc.iratze-zubiate', 'legitimately, for alignment survey'),
  R('item.sunwell-mirror', 'used_by', 'faction.mirror-assembly'),
  R('item.assayers-tray', 'used_by', 'faction.pale-assay', 'six cuts and the whole price structure of the trade'),
  R('item.assayers-tray', 'used_by', 'npc.sahat-belek', 'eight days out in the far white, alone'),
  R('item.sift-screen', 'used_by', 'npc.tazrit-nourem', 'sold to her own crews against their draw'),
  R('item.moor-stake', 'used_by', 'faction.moorstone-compact', 'the raft-lot draw runs on driven marks'),
  R('item.moor-stake', 'used_by', 'npc.sabbe-sixteen-knot'),
  R('item.fever-clay', 'used_by', 'npc.anthimos-vellani', 'three patients he has not reported'),
  R('item.fever-clay', 'used_by', 'faction.moorstone-compact', 'issued by lot in the wet season'),
  R('item.nitre-cask', 'used_by', 'npc.iratze-zubiate', 'she needs casks she cannot requisition'),
  R('item.nitre-cask', 'used_by', 'faction.mirror-assembly', 'licensed against a named gallery and rota'),
  R('item.nitre-cask', 'used_by', 'faction.low-tally', 'declared as table salt', true),
  R('item.governor-spring', 'used_by', 'faction.conduit-college', 'the slot, not the spring, is what is rationed'),
  R('item.governor-spring', 'used_by', 'npc.melitta-aspri', 'six allocated a year, four actually used'),
  R('item.orrery-tables', 'used_by', 'npc.melitta-aspri', 'she writes them and she is biasing them'),
  R('item.orrery-tables', 'used_by', 'faction.bonewax-post', 'about 200 sets a season, carried under seal'),
  R('item.faultstone-needle', 'used_by', 'npc.kavel-uur', 'never described to a customs officer'),
  R('item.faultstone-needle', 'used_by', 'faction.low-tally', 'about six a year, priced by the buyer'),
  R('item.crown-bolt', 'used_by', 'npc.cesille-vaudry', 'holding down forged tonnage returns'),
  R('item.crown-bolt', 'used_by', 'faction.mooring-assize', 'claimed as city property, never enforced against a Crown House'),
  R('item.stair-writ', 'used_by', 'faction.concord-of-weights', 'eleven chartered houses, one posted rate'),
  R('item.stair-writ', 'used_by', 'npc.wessel-ondriek', 'four fifths of the reserve is lent out behind it'),
  R('item.stair-writ', 'used_by', 'npc.aubran-ferrieu', 'one uncashed, kept as a receipt for having refused'),
  R('item.stair-writ', 'used_by', 'npc.ossane-gorbea', 'Ascent advances against next year\'s light allocation'),
  R('item.indenture-bond', 'used_by', 'faction.bondwrights-hall'),
  R('item.indenture-bond', 'used_by', 'npc.tazrit-nourem', 'about a third of the pan crews, in one strongroom'),
  R('item.indenture-bond', 'used_by', 'npc.doret-halvane', 'her brother is a sheet in a Sifting City strongroom'),
  R('item.indenture-bond', 'used_by', 'faction.red-writ', 'a signature is a debt on your body'),
  R('item.factors-seal', 'used_by', 'faction.concord-of-weights'),
  R('item.factors-seal', 'used_by', 'npc.wessel-ondriek'),
  R('item.oxblood-coat', 'used_by', 'npc.wessel-ondriek'),
  R('item.oxblood-coat', 'used_by', 'faction.bondwrights-hall', 'respectability is the product'),
  R('item.cut-seal', 'used_by', 'faction.low-tally', 'three a year, each burnt after one cycle', true),
  R('item.pale-dust', 'used_by', 'faction.low-tally', 'moved west in salt barrels', true),
  R('item.cinderroot-cordial', 'used_by', 'npc.aylun-torgai'),
  R('item.springlock', 'used_by', 'faction.conduit-college', 'the bench is licensed, not the owner'),

  /* --- Regions and mechanics -------------------------------------- */
  R('item.faultstone-needle', 'related_to', REGION.aethericScar, 'points at it until you are nearly there'),
  R('item.cinderroot-cordial', 'related_to', REGION.cinderWaste, 'cinderroot comes in on the Orath caravans'),
  R('item.moor-stake', 'related_to', REGION.theDrown),
  R('item.stair-writ', 'related_to', 'mechanic.standing-ledger', 'the anchor object'),
  R('item.ballast-jacket', 'related_to', 'mechanic.mass-warrant', 'declared as crew mass'),
  R('item.tallyblade', 'related_to', 'mechanic.ring-bond', 'the collar is the account'),
  R('item.indenture-bond', 'related_to', 'mechanic.ring-bond'),
  R('item.sunwell-mirror', 'related_to', 'mechanic.the-mirror-rota', 'seventy stolen lumen-hours a day'),
  R('item.chalked-harness', 'related_to', 'mechanic.ward-load', 'ward maintenance at the personal scale'),
  R('item.sift-screen', 'related_to', 'mechanic.the-sift-line', 'the screens decide the grade'),
  R('item.moor-stake', 'related_to', 'mechanic.the-remoor', 'every drift is a re-argument about driven marks'),
  R('item.weirhook', 'related_to', 'mechanic.the-sluice-book', 'the only way to move a gate by hand'),
  R('item.governor-spring', 'related_to', 'mechanic.conduit-hours', 'eleven hours of slot per spring'),
  R('item.gallery-lath', 'related_to', 'mechanic.severance-drill', 'holds the far end while the cut is made'),
  R('item.indenture-bond', 'related_to', 'spell.debt-mark', 'a mark turns a jurisdiction into a chain'),
  R('item.bound-harness', 'related_to', 'mechanic.the-toll', 'the licence is a leash'),
  R('item.mooring-lance', 'related_to', 'creature.loftwrack', 'a culled raft falls on whoever is below'),
  R('item.chalked-harness', 'related_to', 'creature.chalk-louse', 'they eat the lines overnight and leave the drawing intact'),

  /* --- Quests ----------------------------------------------------- */
  R('quest.pan-fever', 'involves', 'item.pale-dust', 'the fraction the Sieve Company sells at premium'),
  R('quest.pan-fever', 'involves', 'item.sift-screen', 'the last mesh is where it comes from'),
  R('quest.four-minutes-fast', 'involves', 'item.orrery-tables', 'every printed set is eventually evidence'),
  R('quest.the-chalk-that-lies', 'involves', 'item.chalked-harness', 'adulterated chalk fails on people first'),
  R('quest.the-indenture-column', 'involves', 'item.indenture-bond', 'the manifest column for people'),
  R('quest.slackwater-rights', 'involves', 'item.moor-stake', 'the mark on the head is the claim'),
  R('quest.the-master-weight', 'involves', 'item.factors-seal', 'a die on a bench inside the Concord\'s own vault'),
  R('quest.written-off', 'involves', 'item.cut-seal', 'the guild paper a runaway factor took to Orath'),
  R('quest.the-felling-order', 'involves', 'item.bastion-jack', 'the quarter burns and the levy is dressed in pitch'),
  R('quest.who-gets-the-light', 'involves', 'item.sunwell-mirror', 'a party that has stolen light has already made the decision once'),
  R('quest.the-fog-bells', 'involves', 'item.orrery-tables', 'the pilots are working from copies of a book that is wrong'),
  R('quest.the-scar-concession', 'involves', 'item.stair-writ', 'the concession is auctioned against Ascent paper'),

  /* --- Upgrade chains, stated as edges ---------------------------- */
  R('item.scourglass-sabre', 'prerequisite_of', 'item.tallyblade', 'part-exchanged against the collar fee'),
  R('item.tallyblade', 'prerequisite_of', 'item.quitblade', 'reforged when the bond is discharged'),
  R('item.ward-pin', 'prerequisite_of', 'item.chalked-harness', 'twelve pins anchor the lines'),
  R('item.chalked-harness', 'prerequisite_of', 'item.bound-harness', 'chalk to permanent inlay'),
  R('item.palisade-arbalest', 'prerequisite_of', 'item.gallery-lath', 'the same lath at four times the scale'),
  R('item.governor-spring', 'prerequisite_of', 'item.springlock', 'a stack of four'),
  R('item.factors-seal', 'prerequisite_of', 'item.cut-seal', 'the upgrade path, downward'),
]
