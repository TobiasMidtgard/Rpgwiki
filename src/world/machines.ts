/**
 * Machines and recipes.
 *
 * Sixteen working machines and the sixteen recipes that run on them. The set is
 * built as four production chains that cross city borders on purpose, so that a
 * blockade, a strike or a bad season somewhere becomes a shortage somewhere
 * else:
 *
 *   IRON   mire bloom -> bar (Black Weir) -> laid cable (Sky City) -> engines (Tree City)
 *   BRASS  pan crust (Sifting) -> billet (Meridian) -> drawn stock -> sealed balance (Ascent)
 *   CHAR   bone (Arena) -> char -> soda ash (Sifting) -> crown glass (Meridian)
 *   WOOD   stumpwood (Greatwood) -> pitch and charcoal -> laminated limb -> ballista
 *
 * Everything here is a proposal except the city, landmark and district anchors
 * it hangs on. Where a chain passes through a substance the seed has never
 * given an entity to — copper, charcoal, drawn wire, bone char, card stock —
 * that gap is recorded as an open question rather than papered over with an
 * invented material.
 */

import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* Machines                                                            */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  /* ================================================================ */
  /* THE SIFTING CITY                                                  */
  /* ================================================================ */

  E({
    id: 'machine.the-sieve-cascade',
    type: 'machine',
    name: 'The Sieve Cascade',
    status: 'draft',
    summary: 'Nine graded screens in a wind-fed tower: dry above, wet below, and the whole price of the Pans decided on the last mesh.',
    tags: ['sifting', 'extraction', 'array', 'white-pans', 'chain-head'],
    fields: {
      purpose:
        'A licensed tower on [[landmark.the-great-sieve|the Great Sieve]] is a cascade with a building round it. Raw crust is barrowed to the head and falls twenty-two metres through nine screens; what comes off each deck is a different commodity at a different price. The top four decks are dry and sorted by draught off a hooded intake facing the prevailing pan wind. The bottom five are wet, and washed with liquor that has already been through the tower twice, because water is hauled eight days across the waste and is used four times before it is let go.\n\nThe cascade does not make anything. It decides what the crust already was. That decision is worth far more than the crust, which is free and lies in the open, and it is why [[faction.pale-assay|the Pale Assay]] and not the tower-masters is the real power in [[district.sifting-city-assay-row|Assay Row]]. The cascade sorts; the Assay stamps; the stamp is what a glass factor on the Meridian Coast actually buys.',
      machineType: 'Array',
      location: ['landmark.the-great-sieve', 'district.sifting-city-the-tower-line'],
      operator: 'A licensed tower-master, nine screen-setters, and a barrow crew of about eighty in two shifts',
      requiredSkills: ['skill.sieve-tuning', 'skill.bench-sense'],
      controls: 'Nine mesh frames, nine slope wedges, the feed gate at the head, and the wash valve the Water Court meters',
      inputs: ['material.pan-nitre', 'item.sift-screen'],
      process:
        'Crust goes in at three tonnes a charge. Decks one to four are shaken dry against the hooded draught, which lifts the fines and drops the heavy fraction: this is where [[material.blackfall-sand|blackfall sand]] comes out, black and dense enough to feel wrong in the hand. Decks five to nine run wet. Wash liquor carries the soluble salt down through progressively finer [[item.sift-screen|screens]], each rated by count, each dead in eleven days of use.\n\nWhat leaves the tower is four things: mineral concentrate for the western smelters, silica sand for the glass kilns, six stamped cuts of [[material.pan-nitre|pan nitre]], and whatever is still moving after the ninth mesh. That last fraction is not on any tariff schedule. It is milled, dried and sold as [[item.pale-dust|pale dust]], and the towers make more on it in a quarter than they do on nitre in a year.',
      outputs: ['material.pan-nitre', 'material.blackfall-sand', 'item.pale-dust'],
      energy: 'Wind through the hooded intake, gravity down nine decks, and about forty barrels of hauled water a tower-day',
      productionTime: 'Continuous while the wind holds. A three-tonne charge clears the ninth mesh in six to seven hours',
      failureRisks: [
        'Blinding. One deck packs with damp fines and the charge backs up onto the deck above it. Anything above the fourth deck has to be dug out by hand from the top: two days of no output, and the crew is paid on graded output rather than by the day.',
        'Blowback. A gust into an unhooded or badly recut intake drives nitre dust back up the decks and out over the head platform. The crew on the head breathes it. This is the mechanism behind [[quest.pan-fever|pan fever]], and it is not a fever.',
        'Footing loss. The crust pad under a tower leg goes soft in a wet season and the frame racks out of true, which throws every slope wedge at once. Two of the nine towers have been re-shimmed; No. 6 has been re-shimmed four times and nobody will crew its head deck.',
        'Water overdraw. Exceeding the Water Court allocation is not fined, it is deducted from next quarter, and a tower-master passes that deduction straight down to the crew ration rather than to the tower.',
        'Tuning fraud. A screen-setter who moves one mesh a single count coarse pushes value down into a grade the tower buys back cheap. It is the commonest crime in the Pans, and it is prosecuted as theft from the crew rather than from the licence holder, which tells you who wrote the statute.',
      ],
      upgrades: [
        row({
          name: 'Button-wire mesh on the seventh, eighth and ninth decks',
          cost: '400 writs a tower, plus die rental by the shift from the crucible sheds',
          effect: 'Mesh holds its count for a season instead of eleven days. Fine-grade recovery up about 6%.',
        }),
        row({
          name: 'Recut hood and draught baffle',
          cost: 'Eleven days down and one licensed Meridian fitter',
          effect: 'Ends blowback at the head deck. The single largest available reduction in crew lung injury, and the cheapest.',
        }),
        row({
          name: 'Closed wash circuit (Overhaul)',
          cost: 'A season down, the tower water line re-surveyed, and a Water Court re-rating',
          effect: 'Cuts water draw by a third and lets the tower work a dead-calm day. Permanent rating increase.',
        }),
      ],
      recipes: ['recipe.pan-crust-sorting'],
      mechanics: ['mechanic.the-sift-line'],
      devNotes:
        PROPOSAL('The nine licensed towers and the Great Sieve are established; the nine-deck dry-then-wet arrangement, the water arithmetic and the pale dust economics are the proposal.') +
        '\n\nDESIGN INTENT: the head of two chains and the cheapest place in the world to show a player that grading, not mining, is where value is made. Every number on this page is meant to be squeezable in play. Water allocation, mesh count and crew ration are three dials that trade against each other, and a party that fixes one has usually broken another.\n\nThe pale dust output is deliberate. The tower that employs a crew is also the tower that sells the crew its stimulant, and the ninth mesh is where those two facts meet.',
    },
  }),

  E({
    id: 'machine.the-bittern-ladder',
    type: 'machine',
    name: 'The Bittern Ladder',
    status: 'draft',
    summary: 'Eleven stepped pans that fractionate spent sifting liquor into soda ash, table salt and bitter magnesium waste.',
    tags: ['sifting', 'refinery', 'white-pans', 'char-chain'],
    fields: {
      purpose:
        'What comes off the bottom of [[machine.the-sieve-cascade|the Sieve Cascade]] is not waste, it is a saturated liquor with four saleable things dissolved in it and no obvious way to tell them apart. The Ladder separates them by patience. Eleven shallow pans step down a two-metre fall south of the tower line; liquor runs from one to the next as it concentrates, and each pan is harvested when the crust on it is the right crust.\n\nThis is the least dramatic machine in the Pans and the most profitable. Soda ash off the fourth and fifth pans goes west and becomes glass. Table salt off the eighth is the only salt anyone in the Pans can afford to eat. The bittern at the foot is magnesium-bitter, useless, and has to be walked out and dumped somewhere it will not get back into the water.',
      machineType: 'Refinery',
      location: ['district.sifting-city-the-water-court', CITY.siftingCity],
      operator: 'A pan-reeve and eleven rakers, one to a pan, working the whole ladder in a single dawn shift',
      requiredSkills: ['skill.heat-reading', 'skill.sieve-tuning'],
      controls: 'Eleven step gates, the char bed valve, and a hydrometer float read against a stamped card at each pan head',
      inputs: ['material.pan-nitre'],
      process:
        'Liquor is dosed through a bone char bed before it enters the first pan. The char strips the organic colour and, more importantly, the trace that makes soda ash come out grey rather than white, and grey ash sells for two thirds. There is no substitute the Pans have found. The char is shipped east from [[machine.the-char-retorts|the char retorts]] under the Arena City floor, in quantities that appear on every manifest between here and the Steppe and are remarked on by nobody.\n\nAfter the char bed it is only evaporation and time. Eleven days from first pan to bittern in a dry month, twenty-six in a wet one. Pans four and five are skimmed for soda ash, pan eight is raked for table salt, and a fraction of the nitre cut is drawn off at pan two, dried hard and casked under blasting licence as [[item.nitre-cask|nitre casks]].',
      outputs: ['item.nitre-cask'],
      energy: 'Sun, wind and a two-metre fall. The Ladder burns nothing at all, which is why it survived three fuel crises that closed the crucible sheds',
      productionTime: 'Eleven days a full ladder in a dry month; twenty-six in a wet season',
      failureRisks: [
        'Char exhaustion. A spent bed passes colour into the ash, and nobody notices until the ash is already in a Meridian kiln and a month of glass casting has gone grey. The loss falls on the Sifting City under the standing purity clause, not on the kiln.',
        'Rain. A single unseasonable night redissolves whatever is crusting and puts the whole ladder back four days. There is no cover. Covering eleven pans has been costed twice and refused twice.',
        'Pan liner failure. A cracked liner lets liquor into the substrate and the pan drains overnight, which also puts brine into the ration bores of [[district.sifting-city-the-water-court|the Water Court]] one terrace below.',
        'Bittern dumping. The foot of the ladder produces four tonnes of magnesium bittern a month and it is dumped upwind of [[district.sifting-city-the-lee|the Lee]], because that is downhill and the Lee has no standing to object.',
        'Char supply. The Ladder cannot run without the Arena City, and everyone involved has agreed not to say out loud what the char is. A shipment stopped on moral grounds stops the glass trade six weeks later.',
      ],
      upgrades: [
        row({
          name: 'Second char bed in parallel',
          cost: '900 writs and a doubled standing order to the Arena City',
          effect: 'Beds can be regenerated without stopping the ladder. Ends grey-ash losses entirely.',
        }),
        row({
          name: 'Storm covers on pans one to five',
          cost: '2,200 writs in cane and mirelac, and a cane contract with the delta',
          effect: 'Wet-season throughput up from four ladders a season to seven.',
        }),
        row({
          name: 'Bittern settling ponds and a walled spoil road',
          cost: '3,000 writs, and admitting in writing that the dumping was a decision',
          effect: 'Removes the Lee poisoning. No production benefit whatsoever, which is why it has never been built.',
        }),
      ],
      recipes: ['recipe.brine-clarification'],
      mechanics: ['mechanic.the-sift-line'],
      devNotes:
        PROPOSAL('The stepped pans, the bone char dependency and the eleven-day cycle are the proposal. That the Ladder buys char from the Arena City is fixed by the manifest and is meant to be uncomfortable.') +
        '\n\nDESIGN INTENT: the quiet machine that makes the char trade unbreakable. Any moral pressure a party puts on [[machine.the-char-retorts|the retorts]] arrives here as a glass shortage and then as a Meridian tariff fight. Use that lag. The consequence of a good deed should be six weeks out and in another city.',
    },
  }),

  /* ================================================================ */
  /* THE MEDITERRANEAN CITY                                            */
  /* ================================================================ */

  E({
    id: 'machine.the-verdigris-hearth',
    type: 'machine',
    name: 'The Verdigris Hearth',
    status: 'draft',
    summary: 'Reverberatory smelter at the windward end of the conduit yards: Pans concentrate and Greatwood charcoal in, billet out.',
    tags: ['meridian-coast', 'refinery', 'metal', 'brass-chain'],
    fields: {
      purpose:
        'Two reverberatory furnaces at the eastern end of [[district.mediterranean-city-conduit-yards|the Conduit Yards]], sited where the sea wind takes the smoke off [[district.mediterranean-city-terrace-groves|the terrace groves]] rather than into them. The charge never touches the fire. Flame runs across a low arched roof and the heat is reflected down onto the hearth bed, which keeps the fuel sulphur out of the metal and is the only reason the Meridian billet is clean enough to draw.\n\nOne furnace is always on charge and one is always being rebuilt, because the roof is the consumable. Silica brick creeps at working temperature and an arch is condemned after about fifty charges. The [[faction.conduit-college|Conduit College]] licenses the arch-setters separately from the smelters, and there are nine of them in the world.',
      machineType: 'Refinery',
      location: [CITY.mediterranean, 'district.mediterranean-city-conduit-yards'],
      operator: 'A hearth-master, four chargers and a licensed arch-setter on call; sixteen men to a shift',
      requiredSkills: ['skill.heat-reading', 'skill.bench-sense'],
      controls: 'Damper chain, tap bar, skimmer, and a colour judgement made through a smoked glass that nobody has yet reduced to a number',
      inputs: ['material.pan-nitre', 'material.blackbole-timber', 'food.meridian-olive'],
      process:
        'The charge proper is sorted concentrate off the Pans: eleven parts mineral to one of [[material.pan-nitre|nitre]] flux, roasted first to drive the sulphur off, then reduced under charcoal. What runs to the tap is copper. It is skimmed, poured into pigs, and taken to the second hearth to be alloyed.\n\nThat second step is where the trade actually is. Tin makes [[material.orrery-bronze|orrery bronze]]: chill-cast, then stood eighteen months before anyone is allowed to cut it, because a foundry that skips the ageing sells gears that go quietly out of true two years later and is not usually found out until the buyer is three cities away. Zinc makes the softer trade brass that seals, cuff tallies and instrument plate are struck from.\n\nThe fuel is Greatwood hard charcoal from [[machine.the-pitchworks|the Pitchworks]], banked with olive cake from the third pressing. Charcoal crosses the whole continent to get here. The Marshalcy understands exactly what that means and has never once used it.',
      outputs: ['material.orrery-bronze'],
      energy: 'Greatwood hard charcoal banked with olive cake; about forty hours of fire to a charge',
      productionTime: 'Forty hours a charge, plus eighteen months of ageing before the bronze may lawfully be cut',
      failureRisks: [
        'Roof collapse. A crept arch drops silica brick into a live bath. The charge is lost, the hearth is out for six weeks, and anyone on the tap side at the time is not recoverable.',
        'Wet charge. Damp concentrate flashes to steam under the bath and throws metal across the floor. It is the reason the charge shed is roofed and the reason chargers are the highest-paid unlicensed men in the Yards.',
        'Founder\'s ague. Zinc alloying throws a white fume that puts a man down for two days with chills and a taste like coins. It passes. It also comes back every time, and the men who have taken it forty times do not get old.',
        'Charcoal interruption. A Greatwood licence dispute or a blocked river stops the smelt inside eleven days, because there is nowhere on the coast to stockpile charcoal that will not either burn or absorb sea damp.',
        'Ageing fraud. Bronze cut early is indistinguishable at the bench and obvious in two years. Every drifting mechanism on the coast, including some in [[landmark.the-tide-orrery|the Tide Orrery]], is somebody\'s decision to sell early.',
      ],
      upgrades: [
        row({
          name: 'Chromite-set arch brick',
          cost: '4,000 writs and a standing order to the Ironback that does not yet exist',
          effect: 'Arch life from fifty charges to about a hundred and forty. Halves the hearth\'s worst fatality mode.',
        }),
        row({
          name: 'Recuperative flue preheat',
          cost: '2,600 writs and eleven weeks down',
          effect: 'Charcoal per charge down about a fifth, which is the only real answer to the Greatwood leverage.',
        }),
        row({
          name: 'Third hearth and a stamped ageing yard (Overhaul)',
          cost: 'Land in the Yards, which the College controls absolutely',
          effect: 'Ageing becomes auditable and ageing fraud becomes prosecutable. Doubles clean billet output.',
        }),
      ],
      recipes: ['recipe.brass-billet-casting'],
      mechanics: TBD('Does the Hearth sit under Conduit Hours like the drawbenches, or is a smelt exempt because a charge cannot be stopped and restarted on a timetable?'),
      devNotes:
        PROPOSAL('That the Hearth smelts Pans concentrate with Greatwood charcoal is fixed by the manifest. The reverberatory design, the two-hearth alloying step and the arch-setter licence are the proposal.') +
        '\n\nOPEN: copper has no material entry anywhere in the seed, and neither has the concentrate that yields it, nor tin, nor zinc. This entry names all four in prose and refs none of them, which is honest but leaves the head of the brass chain hanging on a substance with no page. If a materials author adds a copper concentrate, re-point `inputs` here and in [[recipe.brass-billet-casting|the casting recipe]].\n\nDESIGN INTENT: the eighteen-month ageing rule is the interesting mechanic. It creates an inventory of metal that is worth more for existing than for being sold, which makes a foundry yard a target, a collateral and a temptation all at once.',
    },
  }),

  E({
    id: 'machine.the-drawbench-vaults',
    type: 'machine',
    name: 'The Drawbench Vaults',
    status: 'draft',
    summary: 'Tide-driven benches under the mills pulling bar through graded dies into wire, rod and the only seamless tube on the continent.',
    tags: ['meridian-coast', 'press', 'component', 'chokepoint'],
    fields: {
      purpose:
        'Nine barrel-vaulted chambers cut under the tide mills at the harbour throat, whitewashed to the springing and lit by borrowed light through slot windows. Each vault holds one drawbench: a chain-and-drum pull of about eleven metres, a die block, and a rack of graded dies bored from [[material.blackfall-button|blackfall button]].\n\nDrawing is not glamorous and it is not replaceable. Bar is reduced about a fifth per pass, annealed between passes, and pulled again, and the die does the work that a smith cannot do by eye. Seamless tube is drawn over a mandrel, which is a trick four benches in the world can hold, and all four of them are down here. That is why a [[item.mooring-lance|mooring lance]] made in the Sky City is a Meridian product with a Sky City handle on it, and why a tariff argument about tube is never really about tube.',
      machineType: 'Press',
      location: ['district.mediterranean-city-conduit-yards', CITY.mediterranean],
      operator: 'A bench-master and two pullers to a bench; die rack under separate College key',
      requiredSkills: ['skill.pressure-fitting', 'skill.bench-sense', 'skill.proof-marking'],
      controls: 'Drum clutch, tailstock dogs, the die rack key, and a slot in the conduit timetable that must be bid for and cannot be moved',
      inputs: ['material.blister-bar', 'material.orrery-bronze', 'material.blackfall-button'],
      process:
        'Bar arrives from two directions: [[material.blister-bar|blister bar]] up the coast from the Weir and the basin furnaces, and [[material.orrery-bronze|bronze and brass billet]] from [[machine.the-verdigris-hearth|the Verdigris Hearth]] a quarter of a mile inland. Both are pulled down through the same dies on the same benches, which is the only place on the continent the iron chain and the brass chain touch.\n\nA bench-day produces coil wire, drawn rod and tube. The wire goes up to [[city.sky-city|the Sky City]] to be laid into cable. The rod becomes [[item.governor-spring|governor springs]], cut to a tolerance nobody else can hold and rented out to half the machines in this file. The tube becomes pressure work, instrument bodies and the frames of [[item.sift-screen|sift screens]] that go straight back to the Pans to be worn out in eleven days.\n\nThe benches run on the tide, which means they run twice a day on flood and ebb and are dead at slack water. A slot missed at slack is a slot lost, and under [[mechanic.conduit-hours|conduit hours]] a lost slot is a scrapped batch and a bill.',
      outputs: ['item.governor-spring', 'item.sift-screen'],
      energy: 'Tide mills across the harbour throat, working both flood and ebb; dead for about ninety minutes at each slack',
      productionTime: 'Two working windows a day. About 900 m of drawn wire, 40 m of seamless tube, or sixty springs per bench-window',
      failureRisks: [
        'Die failure. A button die that chips mid-pull scores every metre after it, and the fault is invisible in coil until the wire is laid and loaded. A scored strand is how a cable dies two years early.',
        'Chain snap. Eleven metres of drawn stock under tension leaving a bench at speed. It takes the legs off whoever is standing inboard, and the standing rule about where a puller may stand is written on the vault wall in every one of the nine.',
        'Slack-water overrun. A pull that has not cleared the die when the mill stops seizes the bar in the block. Clearing it means cutting out a die worth more than a puller earns in three years.',
        'Slot loss. Missing a timetabled window scraps the annealed batch, because bar left annealed and unpulled work-hardens overnight in sea damp. The College charges for the slot regardless.',
        'Die theft. The rack is the actual asset. Blackfall button comes out of three inherited crucible licences in the Pans and cannot be replaced on any timescale that matters, so a stolen rack shuts the continent\'s wire trade for a season.',
      ],
      upgrades: [
        row({
          name: 'Draw-plate lubrication with third-press olive oil',
          cost: 'A grove contract, about 300 writs a year',
          effect: 'Die life up roughly 40%. Already standard on four benches and quietly refused on the others for reasons of guild precedence.',
        }),
        row({
          name: 'Mandrel tube bench, fifth vault',
          cost: '5,500 writs, two years, and a College patent grant',
          effect: 'A fifth seamless-tube bench. Would end the pressure-vessel bottleneck the Sky City complains about every year.',
        }),
        row({
          name: 'Slack-water flywheel accumulator (Overhaul)',
          cost: '7,000 writs and the harbour throat closed for a season',
          effect: 'Bridges slack water. Turns two windows a day into continuous running and makes the conduit timetable negotiable.',
        }),
      ],
      recipes: ['recipe.drawn-wire-and-tube'],
      mechanics: ['mechanic.conduit-hours'],
      devNotes:
        PROPOSAL('The tide drive, the nine vaults and the four seamless-tube benches are the proposal; the Vaults\' role as the junction of the iron and brass chains is fixed by the manifest.') +
        '\n\nOPEN: drawn stock — wire in coil, rod, tube — has no material entity, so `outputs` lists only the two components that do have entries and the stock itself lives in the recipe yield. If someone writes `material.drawn-stock`, this page and [[recipe.laid-lattice-cable|the cable recipe]] both want re-pointing.\n\nDESIGN INTENT: the strategic chokepoint of the whole file. Four benches, three inherited die licences, one tide. Any campaign about industrial leverage should be able to end at this room.',
    },
  }),

  E({
    id: 'machine.the-frit-kiln',
    type: 'machine',
    name: 'The Frit Kiln',
    status: 'draft',
    summary: 'Two-stage glass kiln fusing pan sand, soda ash and quicklime into crown blanks and sealed apothecary ware.',
    tags: ['meridian-coast', 'kiln', 'glass', 'char-chain'],
    fields: {
      purpose:
        'Glass is made twice here. The first stage is fritting: sand, soda ash and lime are held below melting for nine hours until they have reacted with each other but not yet run, which drives off the gas that would otherwise stay in the melt as bubbles. The frit is broken up, sorted, and only then charged into the pots.\n\nThat extra stage is the whole reason [[material.clearcast-glass|clearcast glass]] exists. Bubble-free optical discs cannot be made from a raw batch at any temperature the coast can reach. It costs an extra day and about a third more fuel per pot, and it produces the only glass on the continent good enough for a lens, a tide gauge, or the faces of [[landmark.the-tide-orrery|the Tide Orrery]].',
      machineType: 'Kiln',
      location: ['district.mediterranean-city-conduit-yards', CITY.mediterranean],
      operator: 'A kiln-master, four pot-hands and two spinners; the spinners are the only ones who are ever named',
      requiredSkills: ['skill.heat-reading', 'skill.mirror-cutting'],
      controls: 'Damper, pot gate, the frit rake, and a spinning rod that is judged entirely by wrist',
      inputs: ['material.pan-nitre', 'material.tideset-cement'],
      process:
        'The batch is silica sand off [[machine.the-sieve-cascade|the Sieve Cascade]], soda ash off [[machine.the-bittern-ladder|the Bittern Ladder]], and quicklime drawn from the cement kilns before the ash is blended in. Fritted nine hours, cooled, sorted, then melted in six clay pots for thirty hours.\n\nCrown blanks are spun. A gather is opened at the end of a rod and whirled until centrifugal force flattens it into a disc a metre across, thin and flat and free at the rim, with a thick bullseye in the middle where the rod was. The rim is the optical glass. The bullseye is cut out and sold to taverns, which is why the cheapest window in the world and the finest lens in the world come off the same disc.\n\nThe second product is sealed ware: apothecary bottles and reagent tubes closed at the lamp, which the coast supplies to every licensed practice and every regulated poison trade between here and the Scar.',
      outputs: ['material.clearcast-glass'],
      energy: 'Charcoal and olive cake, thirty hours to a pot round; a kiln allowed to go cold takes nine days to bring back',
      productionTime: 'Nine hours fritting, thirty hours melting, then a spinning day. Four pot rounds a fortnight',
      failureRisks: [
        'Adulterated flux. One barrel of undergraded [[material.pan-nitre|pan nitre]] ruins every pot it touches and the fault does not show until the disc is spun and cooled. A month of casting has been lost this way twice in nine years, which is what makes the Pans grading fraud a Meridian problem rather than a Pans problem.',
        'Pot failure. A clay pot that splits at temperature dumps four hundred kilogrammes of molten glass into the flue floor. The kiln is finished for the season and the flue has to be cut out with picks.',
        'Devitrification. Glass held too long at the wrong temperature crystallises and goes cloudy. It is recoverable as cullet and worth about a twentieth.',
        'Spinner burns. A metre of glowing disc at arm\'s length on a rod. Spinners work eleven-year careers and retire with hands that will not close.',
        'Cold kiln. Any stoppage over about six hours starts a nine-day restart, so the kiln crew works through strikes, storms and funerals, which the [[faction.standing-hour|Standing Hour]] has never managed to change.',
      ],
      upgrades: [
        row({
          name: 'Cullet recirculation and a sorted cullet yard',
          cost: '600 writs and a bay of yard space',
          effect: 'Fuel per pot down about 15%. Recovers most devitrified losses.',
        }),
        row({
          name: 'Seventh pot and a second spinning bay',
          cost: '3,100 writs and an extra conduit slot bought at auction',
          effect: 'Output up a third. Requires a spinner who does not yet exist, and there are eleven in the city.',
        }),
        row({
          name: 'Continuous frit hearth (Overhaul)',
          cost: '9,000 writs, College patent, and two years',
          effect: 'Ends the nine-day cold restart permanently and makes the kiln strikeable, which is precisely the objection to it.',
        }),
      ],
      recipes: ['recipe.crown-glass-blanks'],
      mechanics: ['mechanic.conduit-hours'],
      devNotes:
        PROPOSAL('The two-stage fritting process, the spun crown disc and the bullseye economics are the proposal. That the kiln fuses pan sand, soda ash and lime is fixed by the manifest.') +
        '\n\nOPEN: silica sand has no material entry of its own; it is the second fraction off the cascade and is referenced here through [[material.pan-nitre|pan nitre]], which is not really the same thing. Worth a decision.\n\nDESIGN INTENT: the nine-day cold restart is the lever. It makes this kiln the one industrial asset in the Mediterranean City that cannot be struck, occupied or negotiated with on a short timescale, which is a useful asymmetry to hand a labour plot.',
    },
  }),

  /* ================================================================ */
  /* THE GILDED ASCENT                                                 */
  /* ================================================================ */

  E({
    id: 'machine.the-tally-engine',
    type: 'machine',
    name: 'The Tally Engine',
    status: 'draft',
    summary: 'A card-and-pin clearing machine that nets the continent\'s debts against each other and punches what is left as bearer paper.',
    tags: ['gilded-ascent', 'terminal', 'credit', 'forgery-hook'],
    fields: {
      purpose:
        'It is not a thinking machine and nobody here has ever suggested it might be. It is a sorter. Every transaction cleared through the Ascent is punched onto a card: paying house, receiving house, sum, date, and a settlement city. The cards are dropped into a pin frame, the frame is cranked, and pins fall through the holes so that cards agreeing on a field stack together. Sorting nine times on nine fields leaves every pair of houses with a single net position, which a clerk reads off and a second clerk checks.\n\nThe result is that a factor in [[city.sifting-city|the Sifting City]] and a buyer in [[city.mediterranean-city|the Mediterranean City]] settle a nine-tonne consignment without a coin moving anywhere, and the Ascent takes a fraction of an eighth on the pair. About four thousand cards a day. The margin is thin, the volume is enormous, and the only way a house can grow on it is to lend, which is precisely how the reserve got where it is.',
      machineType: 'Terminal',
      location: ['district.gilded-ascent-counting-terrace', CITY.gildedAscent],
      operator: 'Two crank-hands, nine sorting clerks and a checking clerk; the rate pin is set by the Concord, not by anyone in the room',
      requiredSkills: ['skill.ledger-hand', 'skill.plain-letters'],
      controls: 'Nine pin boxes, the sort crank, the reject drawer, and the rate pin reset every ninth morning',
      inputs: TBD('Card stock and seal lead have no material entries anywhere in the seed. Should paper get one, given that the continent\'s money is made of it?'),
      process:
        'A card is punched at the wicket in front of the person presenting it, which is the only anti-fraud measure in the whole apparatus that actually works. It is then sorted nine times, netted, and the residue is issued as a [[item.stair-writ|stair writ]]: a sealed bearer note redeemable at named houses in three named cities.\n\nThe reject drawer is where the machine gets interesting. Cards that jam, tear or fail a pin fall out of the run and are re-punched by hand. About forty a day. Nobody watches the re-punching, because the person doing it is a clerk of eleven years standing whose entire professional identity is that he is trusted, and every ledger-fraud plot in this city begins by understanding that sentence.',
      outputs: ['item.stair-writ'],
      energy: 'Two men on a crank, six hours a day. There is no other power source and there has never been an argument for one',
      productionTime: 'About 4,000 cards a day; a full nine-field netting run takes four hours',
      failureRisks: [
        'A blinded pin box. One box with a bent pin silently mis-sorts every card carrying that field, and the error appears as a rounding drift that nobody chases until a house queries a balance a fortnight later.',
        'A mis-set rate pin. The clearing rate is a physical pin. Set it one notch out on the ninth morning and every settlement that day is wrong by a fixed fraction in the same direction, which is either the largest accident in the city\'s history or the neatest theft in it.',
        '[[creature.ledger-moth|Ledger moths]] in the card store. The larvae eat sized paper and iron-gall ink and almost nothing else. A jar released in the store destroys the run history, which is how debts disappear here, and it is prosecuted as arson because the alternative is admitting the archive is the city.',
        'Reject-drawer re-punching. Forty unwatched cards a day, hand-punched by one trusted man. The audit trail for those forty is the man.',
        'Volume. The engine clears four thousand a day and the trade has grown eleven per cent a year for six years. There is no second engine and no plan for one, so the failure mode is not a breakdown, it is a queue that never clears.',
      ],
      upgrades: [
        row({
          name: 'Second pin frame in parallel',
          cost: '1,800 writs and a room the Concord does not want to give up',
          effect: 'Doubles daily clearing and removes the single point of failure. Opposed internally because two engines can disagree.',
        }),
        row({
          name: 'Sealed reject drawer with a two-key witness',
          cost: 'Almost nothing. 40 writs and a lock.',
          effect: 'Closes the commonest fraud route in the city. Has been proposed four times.',
        }),
        row({
          name: 'Duplicate run archive at a second house (Overhaul)',
          cost: '3,000 writs a year in perpetuity, and sharing the run history with a rival',
          effect: 'Makes the moth attack survivable. Also makes every house\'s positions legible to one other house, which is why it will not happen.',
        }),
      ],
      recipes: ['recipe.bonded-tally-card'],
      mechanics: ['mechanic.standing-ledger'],
      devNotes:
        PROPOSAL('Card-and-pin mechanical sorting, the nine-field netting run and the reject drawer are the proposal. That the engine is mechanical rather than computational is fixed by the manifest and should stay that way.') +
        '\n\nDESIGN INTENT: the restrained-science-fiction ceiling of the setting sits in this room. Nothing here is beyond a good nineteenth-century workshop, and the leverage comes from volume and trust rather than from cleverness.\n\nThe three attack surfaces are deliberate and are meant to suit different parties: the rate pin for a thief, the reject drawer for a forger, and the moths for someone who wants a debt to have never existed.',
    },
  }),

  E({
    id: 'machine.the-assay-cage',
    type: 'machine',
    name: 'The Assay Cage',
    status: 'draft',
    summary: 'A windowless, draught-proof, temperature-held room where balances and weights are set against eleven sealed reference masses.',
    tags: ['gilded-ascent', 'terminal', 'metrology', 'canon-adjacent'],
    fields: {
      purpose:
        'A room cut into the rock behind [[district.gilded-ascent-salt-office|the Salt Office]], four metres square, no window, double doors that cannot both be open, and a stone mass under the floor that holds the temperature within half a degree across a day. Everything about the Cage is an argument against air moving, because air moving is the enemy of a balance and a balance is the only thing this city ultimately sells.\n\nInside are eleven brass reference masses under seal, and the beam that compares against them. Every certified weight in every honest market between the coast and the Pans is set against these eleven objects through a chain of sealed copies, and the chain is the reason the whole continent can trade on paper. See [[landmark.the-brass-standard|the Brass Standard]].',
      machineType: 'Terminal',
      location: ['district.gilded-ascent-salt-office', 'landmark.the-brass-standard'],
      operator: 'Two Concord assayers who work alone in the room and are never rostered together twice in a month',
      requiredSkills: ['skill.proof-marking', 'skill.bench-sense', 'skill.ledger-hand'],
      controls: 'Beam arrest, rider carriage, a thermometer read on the quarter hour, and a wax seal that must be broken to touch a mass',
      inputs: ['material.orrery-bronze', 'material.clearcast-glass', 'material.blackfall-button'],
      process:
        'A merchant balance is brought in dirty, cleaned, rested twelve hours to come to room temperature, then compared against a sealed copy of the standard through a substitution weighing. If it passes, it is closed inside a crown-glass case, wired, and sealed with a dated Concord stamp. Breaking the wire voids the certificate. The waiting list is about five weeks and has never been shorter.\n\nThe Cage also cuts and registers [[item.factors-seal|factor\'s seals]] against a private register of nine deliberate flaws per die, and issues the licensed [[item.assayers-tray|assayer\'s trays]] that let a field assay be stamped at all. The register is not published and will not be, because publishing it would tell every forger in the basin which two flaws they are missing.',
      outputs: ['item.assayers-tray'],
      energy: 'None. The Cage burns nothing and admits no lamp with a flame; light is reflected in through a mica shaft',
      productionTime: 'A single certification takes a day and a half, of which twelve hours are the balance doing nothing but reaching temperature',
      failureRisks: [
        'Reference wear. A brass mass loses substance to handling and to every cleaning, and eleven masses that have been handled for a century are not eleven masses that were made a century ago. Nobody has re-derived them against anything external, because there is nothing external to derive them against.',
        'Propagated error. A drifted reference does not fail loudly. It issues correct-looking certificates that are all wrong in the same direction, and every contract weighed against them stays enforceable until somebody proves the chain is bad, which is the entire threat of [[quest.the-master-weight|the Master Weight]].',
        'Thermal breach. A door held open during a comparison puts a draught across the beam and produces a result that is confidently wrong. The rule against it is absolute and is broken about twice a year.',
        'Substitution. The masses are the target, not the money. Swapping a copy for a standard skims a fraction off every transaction weighed against it for as long as it goes unnoticed, and re-assay is a five-week job.',
        'Sole-operator risk. Two assayers, one room, no witness. The Concord treats this as a security feature and it is equally an opportunity.',
      ],
      upgrades: [
        row({
          name: 'Rock-crystal knife edges on the beam',
          cost: '1,400 writs and a cutter from the Meridian Coast',
          effect: 'Sensitivity up about fourfold. Also shortens the twelve-hour settling wait to four.',
        }),
        row({
          name: 'Second sealed reference set, held in another city',
          cost: '5,000 writs and admitting the Ascent standard could be wrong',
          effect: 'Makes drift detectable. The Mediterranean City has offered to host it three times and been refused three times.',
        }),
        row({
          name: 'Two-key entry and a witness clerk',
          cost: '200 writs a year',
          effect: 'Ends sole-operator substitution. Costs the Concord the deniability it currently enjoys.',
        }),
      ],
      recipes: ['recipe.sealed-assay-balance'],
      mechanics: ['mechanic.standing-ledger'],
      devNotes:
        PROPOSAL('The eleven masses and the Brass Standard are established by the city entry. The room\'s construction, the substitution weighing, the twelve-hour settling wait and the nine-flaw seal register are the proposal.') +
        '\n\nDESIGN INTENT: the metrology is real and the horror is real. Nobody has an external check on the standard. The entire continent\'s commercial law rests on eleven lumps of brass in a locked room that two people at a time have unwitnessed access to, and the failure mode is not theft, it is quiet, uniform, undetectable error.\n\nThis is the convergence point of the brass chain and the char chain: bronze from the Hearth, glass from the Kiln, button dies from the Pans, all meeting in the one instrument the world checks itself against.',
    },
  }),

  E({
    id: 'machine.the-oxblood-hoists',
    type: 'machine',
    name: 'The Oxblood Hoists',
    status: 'draft',
    summary: 'Eight counterweighted cable runs lifting bonded freight up the escarpment on tanks of river ballast.',
    tags: ['gilded-ascent', 'lift', 'haulage', 'no-recipe'],
    fields: {
      purpose:
        'Eight parallel runs up the face of the escarpment, each a pair of shafts with a freight cage on one cable and a ballast tank on the other. The tank is filled with river water at the crown, dropped, and the freight comes up. At night, when the wharf wheels have nothing else to turn, the water is pumped back. The city does not lift goods so much as it borrows height from the river and gives it back before morning.\n\nNothing crosses the Ascent on wheels above the fourth terrace. Goods go by hoist and people go by stair, and hoist passage is sold by the terrace and priced against [[mechanic.standing-ledger|the Standing Ledger]], which means credit standing is literally how high in this city you can afford to live.',
      machineType: 'Lift',
      location: ['district.gilded-ascent-hoist-yards', 'district.gilded-ascent-confluence-wharves'],
      operator: 'A drum-house crew of six to a run, a brakeman, and a cable inspector whose signature is what permits loading at all',
      requiredSkills: ['skill.cable-and-drum', 'skill.dead-weight'],
      controls: 'Drum clutch, band brake, ballast fill and dump valves, and the loading bell that nobody is allowed to ring twice',
      inputs: ['material.stairwire'],
      process:
        'A run cycles about every eleven minutes with four tonnes on the cage. The two heaviest runs use licensed [[spell.weight-lending|weight lending]] to shave the ballast requirement, which is where the city\'s ballast-rights market came from and why a hoist death is so hard to prosecute: a load that was legally lighter for eleven seconds is not a load anyone can weigh afterwards.\n\nCable is condemned at the first broken wire. That is the rule, it is written into the inspection book, and it is the reason the whole yard turns on one man\'s signature. The yards employ about six thousand people and kill between nine and fourteen of them a year, which the Concord regards as within tolerance and which [[faction.standing-hour|the Standing Hour]] was founded over.',
      energy: 'River ballast and gravity, with the water pumped back overnight by forty undershot wheels on the wharf race',
      productionTime: 'Eleven minutes a cycle, four tonnes a cage, eight runs; roughly 1,400 tonnes a working day',
      failureRisks: [
        'A condemned cable re-signed. A main that should have been failed and was not is the single largest mass-casualty risk in the Ascent, and [[npc.brask-vellmar|Brask Vellmar]] is carrying the strand samples that prove it happened on No. 3.',
        'Runaway ballast. A dump valve that sticks open at the crown drops a tank early and the cage goes up faster than the brake can hold. Four in living memory. The band brake is not rated for it and everyone knows.',
        'Winter freeze. Ballast tanks freeze at the crown in the six weeks the forks are iced, and the two heaviest runs are then either shut or run on weight lending alone, at a Toll somebody has to carry.',
        'Weight-lending murder. A load lightened at the right instant and restored at the wrong one leaves no evidence at all. It is the classic quiet killing in this city and there has never been a conviction.',
        'Queue collapse. The hoists are the only route above the fourth terrace. A shutdown starves the upper terraces of grain within about three days, which makes the inspection book a political document.',
      ],
      upgrades: [
        row({
          name: 'Redundant safety dogs on the cage guides',
          cost: '700 writs a run, and eleven days out of service each',
          effect: 'A cage catches its own guides on a cable parting. Would have saved most of the fatal falls on record.',
        }),
        row({
          name: 'Magnetic strand testing at the drum head',
          cost: '2,400 writs and a Meridian instrument under licence',
          effect: 'Finds a broken wire inside the lay before it surfaces. Removes the inspector as a single point of failure, which is exactly why the hoist consortium is against it.',
        }),
        row({
          name: 'Ninth run and a rebuilt ballast main (Overhaul)',
          cost: '11,000 writs and the second terrace closed for a season',
          effect: 'Ends the queue and breaks the tariff the hoist consortium charges on priority. A genuinely city-changing project.',
        }),
      ],
      recipes: TBD('Should haulage get a recipe entry so that lift capacity can be priced and bid for like a crafting slot, or is a Lift deliberately recipe-less?'),
      mechanics: ['mechanic.standing-ledger', 'mechanic.mass-warrant'],
      devNotes:
        PROPOSAL('The eight runs, the ballast-and-pump cycle and the eleven-minute cadence are the proposal. That the hoists lift bonded freight on river ballast is established by the city entry.') +
        '\n\nDESIGN INTENT: the one machine in the set that makes nothing. It exists so that logistics has a face, so that [[npc.brask-vellmar|the cable inspector]] and [[npc.doret-halvane|the yard fixer]] have a machine to stand next to, and so that a party can shut a city down without burning anything.\n\nNOTE for whoever writes the Toll: weight lending on the two heaviest runs means the Ascent has a licensed magical dependency it does not advertise. That is deliberate. The hub city that sells certainty has a magical single point of failure on its freight line.',
    },
  }),

  /* ================================================================ */
  /* THE SKY CITY                                                      */
  /* ================================================================ */

  E({
    id: 'machine.the-strand-loom',
    type: 'machine',
    name: 'The Strand Loom',
    status: 'draft',
    summary: 'An airborne rope walk running the underdeck ring, laying drawn wire into unspliced cable the city hangs from.',
    tags: ['sky-city', 'loom', 'cable', 'iron-chain'],
    fields: {
      purpose:
        'A rope walk has to be as long as the rope it lays. That is the whole problem, and it is why the only place on the continent that can lay a thousand-metre cable without a splice is a city built as a ring: the walk runs round the underdeck and comes back to where it started, so the cable has no end and no join.\n\nSix strands of drawn iron wire are laid up under tension against each other with a reverse twist, served with tarred yarn, then run through a hot [[material.mirelac|mirelac]] bath. What comes off is [[material.stairwire|stairwire]], and every hoist, cableway and stay from the Pans to the coast would like one, which is the third of the Sky City\'s three rents and the only one that is honest work.',
      machineType: 'Loom',
      location: ['district.sky-city-lattice-town', 'district.sky-city-the-underdeck'],
      operator: 'A layer-master, six strand-hands on the carriage, and a serving crew who work the walk on harness',
      requiredSkills: ['skill.lattice-work', 'skill.cable-and-drum', 'skill.set-and-brace'],
      controls: 'Six tension brakes, the laying top, the carriage traverse, and a tar bath thermometer that is checked obsessively',
      inputs: ['material.blister-bar', 'material.mirelac'],
      process:
        'Wire arrives in coil from [[machine.the-drawbench-vaults|the Drawbench Vaults]], which is eleven days by lift and barge and is the longest supply line for any single input in this file. Six coils go onto the tension brakes and the laying top walks the ring, twisting the strands together at a fixed lay length while the serving crew binds behind it. A full cable takes nine days of continuous walking and cannot be stopped part-laid, because a cable stopped under tension takes a set at the stopping point and is condemned there.\n\nThe city has a standing existential arithmetic: the lattice fatigues, and cable has to be re-laid faster than the cable ages, permanently, with no end date. That bill is not falling. It is the entire economic explanation for the Sky City, for the mast fees, for the counterweight leases and for the fact that a quarter of the city is mortgaged to [[city.gilded-ascent|the Ascent]].',
      outputs: ['material.stairwire'],
      energy: 'Vaned drums geared off the standing updraught, with a hand capstan for the laying top when the thermal slackens',
      productionTime: 'Nine days of continuous walking to a thousand-metre cable; about thirty cables a year',
      failureRisks: [
        'A scored strand. A wire drawn through a chipped die carries a score the length of the coil, and it does not show until the cable is laid, loaded and two years old. One bad die in the Meridian is one dead cable up here.',
        'Stopped lay. A walk halted mid-cable takes a permanent set at the stopping point. Nine days of work and six coils of wire condemned, which is why the loom runs through weather that grounds everything else.',
        'Carriage fall. The walk runs the underdeck on open grating over the shelf. A strand-hand who goes off it falls three hundred metres onto [[district.sky-city-shelf-foot|Shelf-Foot]], and the crew that works the loom has the shortest life expectancy above the lip.',
        'Tar bath fire. Hot mirelac on an airborne timber walk. It has happened once, it took eleven metres of underdeck with it, and the fire drill has been rehearsed monthly ever since.',
        'Mirelac shortage. The whole crop comes off the delta rafts in a wet season. A bad season browns out the Mediterranean conduits and stops the Sky City laying cable in the same month, which nobody planned and nobody can fix.',
      ],
      upgrades: [
        row({
          name: 'Pre-forming heads on the laying top',
          cost: '1,600 writs and a shutdown between cables',
          effect: 'Strands take their helix before they meet. Cable fatigue life up roughly a third, which is the single largest number in the Sky City\'s budget.',
        }),
        row({
          name: 'Enclosed serving gallery on the outboard side',
          cost: '3,200 writs in cane and sparbone',
          effect: 'Ends carriage falls. Costed once, deferred once, and the deferral is in the Assize minutes.',
        }),
        row({
          name: 'Second walk on the counterweight arc (Overhaul)',
          cost: '14,000 writs and a mass warrant nobody wants to sign',
          effect: 'Two cables in the air at once. Also adds several hundred tonnes to a city already over its rated load, which is [[npc.cesille-vaudry|Cesille Vaudry]]\'s exact problem.',
        }),
      ],
      recipes: ['recipe.laid-lattice-cable'],
      mechanics: ['mechanic.mass-warrant'],
      devNotes:
        PROPOSAL('The ring-walk arrangement, the nine-day lay and the updraught-geared drums are the proposal. That the loom is the only unspliced long-cable walk on the continent is established by the city entry.') +
        '\n\nDESIGN INTENT: the end of the iron chain and the clearest statement of the Sky City\'s premise. The city is not rich because it flies. It is rich because it is the only shape that can make this one product, and it is poor because it has to make that product forever just to stay up.\n\nThe supply line is deliberately absurd: bog iron cut in the Drown, beaten at the Weir, drawn on the Meridian Coast, laid in the sky. Four cities, one cable. Break any link and something falls.',
    },
  }),

  /* ================================================================ */
  /* THE ARENA CITY                                                    */
  /* ================================================================ */

  E({
    id: 'machine.the-char-retorts',
    type: 'machine',
    name: 'The Char Retorts',
    status: 'draft',
    summary: 'Sealed bone kilns under the arena floor. Nine days on the Claim Wall, a recovery fee, and then the charge.',
    tags: ['arena-city', 'kiln', 'dark', 'char-chain'],
    fields: {
      purpose:
        'Four sealed cast-iron retorts in a vaulted room beneath [[landmark.the-sunken-ring|the Sunken Ring]], downwind, downhill and downstream of everything else in the city. Bone is charged, sealed, and heated without air until the organic fraction cracks off as oil and gas and what remains is porous carbon. That carbon is bone char, and it is the best decolourising filter anyone has found.\n\nThe rest of the process is administrative, and the administration is the point. [[landmark.the-claim-wall|The Claim Wall]] outside carries every name for nine days, one column a day. Families pay a recovery fee. What is unclaimed on the tenth morning is entered in the Rendering Book and charged. Last year the Book recorded six hundred and eleven entries, three hundred and eighty-eight of them fighters.',
      machineType: 'Kiln',
      location: ['district.arena-city-the-rendering', 'district.arena-city-the-under-stands'],
      operator: 'A retort-master, four chargers, and the claim clerk who is legally a separate office and is in practice the same three families',
      requiredSkills: ['skill.heat-reading', 'skill.bench-sense'],
      controls: 'Charge door, oil condenser tap, gas return cock, and the Rendering Book, which is a control in every sense that matters',
      inputs: TBD('The retort charge has no material entry, and giving one to it would make a tradeable commodity of the people in the Rendering Book. Does this chain need a material entity, or should the gap stay?'),
      process:
        'A charge is about ninety kilogrammes, sealed and fired for eleven hours. Bone oil comes off first and is condensed; the gas that follows is returned to the fire, so a retort past its first hour burns its own charge and needs no other fuel. What is drawn out cold is char, which is graded, sacked and shipped east to [[machine.the-bittern-ladder|the Bittern Ladder]]. What is swept from the floor is bone ash, which goes to the Steppe herders as fertiliser at a price that does not cover the sacks.\n\nThe city\'s most valuable export is not the char. It is the conversion treaty: eleven jurisdictions can now turn a criminal sentence into a card count in the Ring, and each takes a fee for doing so. The retorts are the last office in that arrangement and the only one with no paperwork after it.',
      energy: 'Its own retort gas after the first hour, banked with arena timber waste; no imported fuel at all',
      productionTime: 'Eleven hours a charge, four retorts, three charges a day when the card calendar is heavy',
      failureRisks: [
        'A claimed body already fired. It has happened four times in nine years and it is the only failure this city treats as a scandal. The clerk who signs the tenth-morning list carries it personally, and one of them did not survive carrying it.',
        'Seal failure. A retort that vents into the vault fills [[district.arena-city-the-under-stands|the Under-Stands]] with unburnt retort gas, which is heavier than air, settles in the pens, and kills whatever is in them before anyone smells it.',
        'Sump breeding. The condenser sumps run warm and never dry, and something [[npc.sukhet-daral|Sukhet Daral]] imported without papers has been getting into them. The young are already outside the pens he built for the adults.',
        'Fee extortion. The recovery fee is set by the claim clerk within a stated band and is negotiated in practice, which means a poor family pays with time on the wall and a rich one does not. This is the single most reliable way to make a player hate an institution.',
        'Char interruption. Stopping the retorts on principle stops soda ash in the Pans, then glass on the Meridian Coast, then instruments everywhere, in that order, over about six weeks.',
      ],
      upgrades: [
        row({
          name: 'Vault extraction and a gas alarm on the pen side',
          cost: '800 writs and a shaft cut to the surface',
          effect: 'Ends the settling-gas kills. Sukhet Daral has asked for it every year for six years.',
        }),
        row({
          name: 'Fixed recovery fee, posted and audited',
          cost: 'Nothing but the clerks\' side income',
          effect: 'Removes the negotiation. The Ring Chamber calls this a loss of flexibility and it is exactly that.',
        }),
        row({
          name: 'Fourteen-day claim window (Overhaul)',
          cost: 'Storage, refrigeration the city does not have, and a lower char yield',
          effect: 'Nearly halves unclaimed entries, because most late claims come from people who were more than nine days away.',
        }),
      ],
      recipes: ['recipe.bone-char-firing'],
      mechanics: ['mechanic.ring-bond'],
      devNotes:
        PROPOSAL('The four retorts, the eleven-hour charge and the self-fuelling gas return are the proposal. The Claim Wall, the nine-day window and the recovery fee are established by the city entry.') +
        '\n\nHANDLING: consequence, never spectacle. Nothing on this page describes a body. The horror is entirely administrative: a wall, nine columns, a fee, a book, and a filter that a glass trade two thousand kilometres away cannot do without. Play it through the clerk and the ledger.\n\nDESIGN INTENT: this machine exists so that the char chain has a cost nobody in the Mediterranean City ever has to look at. A party that traces their crown glass back four steps arrives here, and the useful discovery is not that it is monstrous but that it is load-bearing.',
    },
  }),

  /* ================================================================ */
  /* THE TREE CITY                                                     */
  /* ================================================================ */

  E({
    id: 'machine.the-pitchworks',
    type: 'machine',
    name: 'The Pitchworks',
    status: 'draft',
    summary: 'Ground-level stumpwood retorts distilling pitch, spirit and hard charcoal: the black on the timber and the rot in the lungs.',
    tags: ['tree-city', 'refinery', 'greatwood', 'wood-chain'],
    fields: {
      purpose:
        'Every colossal bole that comes down under licence leaves a stump and a root plate that are useless as timber and saturated with resin. The Pitchworks cooks them. Nine brick-set iron retorts in [[district.tree-city-pitch-yards|the Pitch Yards]] at ground level, charged with split stumpwood and fired without air for three days.\n\nWhat comes off is the city. Pitch cures the split staves that make the loophole walls and the galleries, which is what makes the Tree City black, weatherproof and eager to burn. Spirit of turpentine thins the pitch and sells outward. Hard charcoal is the highest-value product and almost none of it stays: it crosses the continent to feed [[machine.the-verdigris-hearth|the Verdigris Hearth]], which means the Greatwood sits upstream of every furnace on the Meridian Coast.',
      machineType: 'Refinery',
      location: ['district.tree-city-pitch-yards', CITY.treeCity],
      operator: 'A yard-master, nine retort crews of four, and a levy detail that does the charging and is rotated because nobody lasts',
      requiredSkills: ['skill.heat-reading', 'skill.bench-sense'],
      controls: 'Charge door, condenser worm, tar gate, spirit receiver, and a firing schedule read off a notched stick per retort',
      inputs: ['material.blackbole-timber'],
      process:
        'Three days to a retort. The first day is water and acid, which is run off and neutralised because the acid will eat the condensers. The second day is spirit and light tar. The third is heavy pitch, and then the retort is closed and left four days to cool before it can be drawn without the charcoal catching in the doorway.\n\nA quarter of the yard\'s output is not sold at all. The cured splint offcut is riveted between wool at the benches beside the retorts into [[item.bastion-jack|bastion jacks]], which arm the entire spring levy in a week and cost the city almost nothing, and which burn on the wearer in a way that cannot be put out. The Marshalcy has never pretended otherwise, and drills the shoulder-rivet cut every spring.',
      outputs: ['item.bastion-jack'],
      energy: 'Stump waste and the retort\'s own non-condensable gas; the works burns no charcoal it has not made itself',
      productionTime: 'Three days firing plus four days cooling per retort; nine retorts on a staggered round',
      failureRisks: [
        'Spirit flash. Turpentine vapour finds an open lamp about once every two years. The receiver house has no roof for exactly this reason and is rebuilt each time without comment.',
        'Retort fire on the draw. Charcoal drawn hot catches in the doorway and the crew is between it and the yard. Two of the nine retorts have shortened door runs because of specific deaths.',
        'Acid to the condensers. A crew that runs the first day too long puts pyroligneous acid through the worm and eats it out. Eleven weeks to re-tube and the yard loses a retort in the meantime.',
        'The lungs. Pitch smoke at ground level under a canopy that does not clear. Yard workers cough within a year and are out of the trade within nine, and the levy detail rotation exists because the Marshalcy would rather share the damage than concentrate it.',
        'Charcoal interdiction. Stopping the charcoal barges stops the Mediterranean smelt in eleven days. The Marshalcy knows, has never used it, and is entirely aware that the day it does, the charcoal buyers will fund its enemies openly instead of quietly.',
      ],
      upgrades: [
        row({
          name: 'Acid neutralising tank and a lined worm',
          cost: '400 writs a retort',
          effect: 'Ends condenser loss. Pays for itself in one avoided re-tubing.',
        }),
        row({
          name: 'Stack extraction over the yard',
          cost: '2,900 writs and a canopy cut the Pitchguard will not authorise',
          effect: 'Halves the smoke exposure. Requires opening the canopy, which is a defensive decision, not an industrial one.',
        }),
        row({
          name: 'Continuous retort battery (Overhaul)',
          cost: '8,000 writs and Meridian fitters inside the palisade',
          effect: 'Output up 60% and the draw is mechanised, which removes the worst fatality mode. Also puts foreign engineers inside a militarised city.',
        }),
      ],
      recipes: ['recipe.stumpwood-distillation'],
      mechanics: TBD('Charcoal supply is the Tree City\'s real strategic weapon and no mechanic owns it. Does interdiction belong to a trade system, to a war entry, or to a mechanic of its own?'),
      devNotes:
        PROPOSAL('The nine retorts, the three-day firing round and the four products are the proposal. That the Pitchworks distils stumpwood into pitch, spirit and hard charcoal, and that its charcoal feeds the Verdigris Hearth, is fixed by the manifest.') +
        '\n\nOPEN: pitch, spirit and charcoal are three distinct traded goods and none of them has a material entry. `outputs` therefore names only the jack, and the three real products live in the recipe yield. Charcoal in particular carries continental leverage and probably deserves a page of its own.\n\nDESIGN INTENT: this is where the militarised tree city stops being an aesthetic and becomes an economy. The city is black because of this yard, it arms itself out of this yard\'s waste, and it holds a knife to the Mediterranean smelt from this yard without ever having to draw it.',
    },
  }),

  E({
    id: 'machine.the-limb-press',
    type: 'machine',
    name: 'The Limb Press',
    status: 'draft',
    summary: 'Steam chest and screw press laminating staves and hot pitch into ballista limbs that hold their cast in wet cold.',
    tags: ['tree-city', 'press', 'weapons', 'wood-chain'],
    fields: {
      purpose:
        'A single-piece limb of any wood will take a set in the Greatwood\'s wet cold, and a bow that has taken a set has lost the cast it was made for. The answer is lamination: seven or nine thin staves, steamed limp, laid with hot pitch, and screwed down under about two hundred tonnes for thirty hours while they cool in the form. What comes out has the grain running the right way in every layer and holds its cast through a winter.\n\nThe press sits in [[district.tree-city-spanworks|the Spanworks]] with the bridge-wrights, which is not a coincidence. The same crews that laminate a limb laminate a span, and the same screw presses do both. Between this machine and [[machine.the-pitchworks|the Pitchworks]] the Tree City makes everything it sells and most of what kills its workers.',
      machineType: 'Press',
      location: ['district.tree-city-spanworks', CITY.treeCity],
      operator: 'A press-master, a steam-hand and four layers; the layers work in pitch heat and are relieved every forty minutes',
      requiredSkills: ['skill.bench-sense', 'skill.heat-reading', 'skill.gallery-drill'],
      controls: 'Steam chest gate, four screw heads on a walking beam, a pitch pot thermometer, and a thirty-hour glass',
      inputs: ['material.blackbole-timber', 'material.mirelac', 'material.blister-bar'],
      process:
        'Staves are steamed two hours, laid up in the form with pitch at working heat, and the four screws are walked down in sequence over about twenty minutes so the glue line squeezes even. Thirty hours under load. A limb that is broken out early is scrap and a limb broken out late has bonded to the form.\n\nTwo products come off it. Prod laths for [[item.palisade-arbalest|palisade arbalests]], which are issued to the gallery watch and re-issued on death, and the heavy limbs for [[item.gallery-lath|gallery laths]] and redoubt engines. The heavy work is where the city\'s chains meet: a redoubt ballista is a Tree City limb, [[material.stairwire|Sky City cable]] and [[material.blister-bar|Black Weir iron]], and the Marshalcy cannot arm a redoubt without buying from two cities it does not like.',
      outputs: ['item.palisade-arbalest', 'item.gallery-lath'],
      energy: 'Wood-fired steam for the chest; the screws are hand-walked on a beam by six men',
      productionTime: 'Thirty hours under load per form; four forms, so about twenty-two heavy limbs a month',
      failureRisks: [
        'Delamination under load. A limb with a cold glue line looks perfect and comes apart at full draw, which puts a two-metre lath through whoever is serving the engine. Every recorded case traces to a pitch pot that dropped below working heat during lay-up.',
        'Screw strip. Two hundred tonnes released at once through a stripped thread. The beam goes across the shop at head height and the shop is laid out so that nobody works in that arc, which is the only reason the count is as low as it is.',
        'Steam scald. The chest gate vents at chest height and the steam-hand stands beside it. It is the commonest injury in the Spanworks and the least reported, because a scalded hand is still a hand that can work.',
        'Pitch burns. Four layers working molten pitch at speed on a forty-minute relief. Pitch sticks, and it keeps burning after it lands.',
        'Cable dependency. No stairwire, no redoubt engines. The Marshalcy holds twelve months of cable in store and treats the number as a state secret, which means anyone who learns the true figure knows how long the Tree City can fight.',
      ],
      upgrades: [
        row({
          name: 'Heated forms with a pitch jacket',
          cost: '1,100 writs a form',
          effect: 'Ends cold glue lines and therefore delamination. The single most life-saving upgrade available to the city.',
        }),
        row({
          name: 'Hydraulic ram off the mill race',
          cost: '3,400 writs and a licensed Meridian fitter, which is a political problem here',
          effect: 'Even pressure, no walking beam, no screw strip. Cuts lay-up from twenty minutes to four.',
        }),
        row({
          name: 'Fifth and sixth forms with a shared chest (Overhaul)',
          cost: '6,000 writs and a Marshalcy appropriation',
          effect: 'Heavy limb output up half again. Would let the city arm the outer redoubts, which is what the Marshalcy actually wants and cannot say.',
        }),
      ],
      recipes: ['recipe.pitch-laminated-limb', 'recipe.redoubt-ballista'],
      mechanics: ['mechanic.severance-drill'],
      devNotes:
        PROPOSAL('The steam-and-screw lamination, the thirty-hour cure and the four forms are the proposal. That the Limb Press is the Tree City\'s weapons manufactory is fixed by the manifest.') +
        '\n\nDESIGN INTENT: the terminal machine of two chains and the place where the militarised city is shown to be dependent rather than self-sufficient. The Tree City can grow its own timber, cure its own pitch, and still cannot arm a redoubt without the Weir and the Sky City. That dependency is the whole reason it has a foreign policy.',
    },
  }),

  /* ================================================================ */
  /* THE CAVE AGRARIAN CITY                                            */
  /* ================================================================ */

  E({
    id: 'machine.the-mirror-ducts',
    type: 'machine',
    name: 'The Mirror Ducts',
    status: 'draft',
    summary: 'Two hundred silvered mica mirrors on clockwork drives, folding daylight down the shafts into the growing galleries.',
    tags: ['hollow-karst', 'array', 'light', 'agriculture'],
    fields: {
      purpose:
        'Daylight is caught at the surface by heliostats that track the sun on a falling-weight clockwork drive, and thrown down polished shafts to fixed mirrors that fold it again at each turn until it arrives in a gallery, dimmed and reddened, but arrives. Two hundred mirrors, eleven main ducts, and about a fifth of the light that entered at the top.\n\nThis is the machine the whole city is. Everything else in the Hollow Karst is downstream of the allocation it makes possible: which terrace grows [[food.mirror-barley|mirror barley]] and which grows [[food.gallery-cap|gallery cap]] in the dark, which gallery eats and which leaves. The lumen-hour is the local currency in a completely literal sense, and this array is the mint.',
      machineType: 'Array',
      location: ['landmark.sunwell-shaft', 'district.cave-agrarian-city-mirror-quarter'],
      operator: 'About forty mirrorwrights who can aim a duct, and a winding crew that rewinds every drive twice a day by hand',
      requiredSkills: ['skill.mirror-cutting', 'skill.bench-sense'],
      controls: 'A declination screw and an hour drive per heliostat, a shutter at each duct head, and the reeve\'s seal on the shutter register',
      inputs: ['material.sunwell-mica'],
      process:
        'Mica is cleaved at the face into flawless leaves, brought to the surface, and silvered in [[district.cave-agrarian-city-mirror-quarter|the Mirror Quarter]] sheds with a tin amalgam. Silvering is the killing part of the trade and the reason for the ninety-day rotation: an amalgam surface dulls in about three months, and the people who lay it do not last ten years.\n\nAiming is done by hand, twice a day, against a chalked target in the gallery below. One degree of error at the head is a dead gallery at the bottom. [[npc.iratze-zubiate|Iratze Zubiate]] keeps two hundred mirrors true on that basis, and has been quietly skimming mirror-hours off the grain terraces for a year to cover two galleries she cannot repair alone, which is why the harvest is failing slowly and the tithe books do not show it yet.',
      outputs: ['item.sunwell-mirror'],
      energy: 'The sun, a falling-weight clockwork drive rewound twice daily, and about forty pairs of hands',
      productionTime: 'A ninety-day resilvering round across two hundred plates; aiming is a twice-daily task that never ends',
      failureRisks: [
        'Duct collapse. A bedding plane lets go and a duct shuts. Two lower galleries have been dark for over a year and nobody above the fourth terrace has been told, because reporting it means losing the allocation permanently.',
        'Amalgam poisoning. Quicksilver in a badly ventilated shed. Tremor first, then the hands, then the mind, and the ninety-day rotation exists to spread the dose rather than to prevent it.',
        'Aiming drift. A degree of error is a gallery\'s harvest. Two degrees is a gallery\'s population moving out within a season.',
        'Dust film. Karst dust settles on the fixed mirrors and takes about eight per cent a month with no visible change at the head. Cleaning is unglamorous, unrewarded, and the first thing cut when a crew is short.',
        'Allocation capture. [[npc.ossane-gorbea|The light-tithe reeve]] issues hours and is also buying failed galleries through a cousin\'s name, having first starved them of hours. The array works perfectly and the theft is entirely in the ledger.',
      ],
      upgrades: [
        row({
          name: 'Second-surface silvering under crown glass',
          cost: '2,000 writs and a Meridian glass contract',
          effect: 'The amalgam sits behind glass instead of in open air. Plate life from ninety days to about two years, and the silverers stop dying.',
        }),
        row({
          name: 'Counterweight regulator on the hour drives',
          cost: '900 writs and eleven governor springs',
          effect: 'Tracking error down fourfold. Ends most aiming drift and halves the winding crew.',
        }),
        row({
          name: 'Re-bore the two collapsed lower ducts (Overhaul)',
          cost: '5,500 writs, four months, and admitting the galleries went dark',
          effect: 'Restores two galleries to the rota. Also ends Iratze Zubiate\'s career and reopens the whole allocation question.',
        }),
      ],
      recipes: ['recipe.duct-mirror-resilvering'],
      mechanics: ['mechanic.the-mirror-rota'],
      devNotes:
        PROPOSAL('Heliostats, the falling-weight drive, the fifth-of-the-light figure and the second-surface upgrade are the proposal. Two hundred silvered mica mirrors on a ninety-day resilvering round is established by the city entry.') +
        '\n\nOPEN: light is this city\'s real output and has no entity. The lumen-hour is named in the city entry, priced by [[mechanic.the-mirror-rota|the Mirror Rota]] and issued under a seal, but nothing in the seed lets a recipe consume one. Whoever owns the rota should decide whether lumen-hours are a material, a currency, or a mechanic-only number.\n\nDESIGN INTENT: the resilvering upgrade is the moral shape of this entry. There is a known fix for the poisoning, it costs money, it comes from another city, and the Mirror Assembly has not bought it. That is a decision, not an accident, and a party can force it.',
    },
  }),

  /* ================================================================ */
  /* THE FLOATING SWAMP SETTLEMENT                                     */
  /* ================================================================ */

  E({
    id: 'machine.the-fen-damp-taps',
    type: 'machine',
    name: 'The Fen-Damp Taps',
    status: 'draft',
    summary: 'Eleven tap barges over the gas muds drawing marsh damp through lime and squeezing it into gut bladders.',
    tags: ['the-drown', 'pump', 'fuel', 'delta'],
    fields: {
      purpose:
        'Rotting mat under the delta gives off a burnable damp, and it comes up wherever the mud is disturbed. Eleven barges work it. Each carries an inverted bell driven a few metres into the ooze on cane standpipes, a bladder pump worked by two people on a treadle, a lime scrubber, and a compression chest.\n\nThe gas does everything here. Lamps, the mirelac boilers, the cane steam chests. There is no wheel in the settlement and nowhere to stand one, so fen damp is the only concentrated energy the delta has, and charged bladders are the only thing it exports that is not cut, cropped or caught.',
      machineType: 'Pump',
      location: ['district.floating-swamp-settlement-the-gas-fleet', CITY.floatingSwamp],
      operator: 'Two treadle hands, a scrubber tender and a bell-setter to each barge; crews are family and the barge is the family\'s lot',
      requiredSkills: ['skill.marsh-footing', 'skill.bench-sense'],
      controls: 'Bell depth chain, treadle brake, lime gate, and a bladder gauge that is a knotted cord and nothing more',
      inputs: ['material.glasscane', 'material.mirelac'],
      process:
        'Damp comes up wet, sour and carrying enough sulphide to poison a lamp wick in a night. It is bubbled through slaked lime, which takes the sour out, then pumped into gut bladders lined at the seams with [[material.mirelac|mirelac]]. A full bladder is about a man\'s weight and will burn for nine hours in a good lamp.\n\nThe fleet\'s problem is not the gas, it is the ground. Mud that gives up damp stops giving it up in a season or two, and every time the settlement drifts and re-moors under [[mechanic.the-remoor|the Re-Moor]] the barges have to find new mud and prove it. No gas field is held for long, no family keeps a good one, and the eleven barges are the only district in the settlement that cannot simply take its bearing and stay put.',
      outputs: TBD('The charged gut bladder is the delta\'s only manufactured export and has no item entry. Should it be an item, or is it a bulk commodity like water?'),
      energy: 'Two people on a treadle. The taps are the only machine in this file with no power source but muscle and tide',
      productionTime: 'A barge fills nine to fourteen bladders a day from good mud, three from poor',
      failureRisks: [
        'A leaking bladder in a hold. The standing hazard of every eastern river route: gas pools low, a lamp is lit at the wrong moment, and the boat is gone with everyone aboard. It is why bladders are stowed on deck by custom and below deck by everyone in a hurry.',
        'Sulphide breakthrough. A spent lime bed passes sour gas that corrodes the compression chest from inside and poisons the barge crew slowly. Lime is cheap and beds are still run long, because changing a bed costs a day.',
        'Bell blowout. Driving a bell into a pocket brings up gas faster than the scrubber takes it and the barge is inside a cloud with a treadle fire nine metres away.',
        'Mat rot under the mooring. The mud that makes gas is rotting [[creature.raftbloom|raftbloom]] mat, and rotting mat breeds marsh fever. The best gas ground and the worst fever ground are the same ground.',
        'Re-moor loss. A drift can put every proved bell a day\'s pole from the fleet. Two families have gone under entirely between one re-moor and the next.',
      ],
      upgrades: [
        row({
          name: 'Iron-plate compression chest',
          cost: '260 writs a barge in Weir bar',
          effect: 'Ends chest corrosion and raises charge pressure about a third, which is a third more gas in the same bladder.',
        }),
        row({
          name: 'Twin lime beds with a changeover cock',
          cost: '90 writs a barge',
          effect: 'Beds are changed without stopping. Removes the incentive to run a bed sour.',
        }),
        row({
          name: 'Surveyed gas-ground register held on the Moorstone (Overhaul)',
          cost: 'Agreement between eleven families who have never agreed on anything',
          effect: 'Proved ground survives a re-moor as a recorded claim instead of a race. Turns the fleet from a scramble into a property system, with all that implies.',
        }),
      ],
      recipes: ['recipe.lamp-gas-bladders'],
      mechanics: ['mechanic.the-remoor'],
      devNotes:
        PROPOSAL('The bell-and-treadle arrangement, lime scrubbing, the nine-hour bladder and the gas-ground problem are the proposal. Eleven tap barges re-sited every drift is established by the city entry.') +
        '\n\nOPEN: fen damp, lime and the charged bladder itself all lack entries. `inputs` names the cane and the lacquer, which are real, and leaves the gas as prose. The bladder is the more important gap: half the eastern river burns it and it cannot currently be carried in an inventory.\n\nDESIGN INTENT: the poorest machine in the file and the one with the clearest player verb. Find gas ground, prove it, hold it through a re-moor. It is a claim-staking loop that resets every season by design, and the register upgrade is the moment the delta invents property.',
    },
  }),

  /* ================================================================ */
  /* THE BLACK WEIR                                                    */
  /* ================================================================ */

  E({
    id: 'machine.the-sluice-hammers',
    type: 'machine',
    name: 'The Sluice Hammers',
    status: 'draft',
    summary: 'Trip hammers driven off the weir head, beating river-shipped bloom into merchant bar of a stamped weight.',
    tags: ['black-weir', 'engine', 'iron-chain', 'proposal'],
    fields: {
      purpose:
        'The same head of water that prices the toll makes the iron. Two of the fourteen worked gates are drawn off into a wheel race on the right bank, and the race drives four trip hammers, the gate winches and the pumps. Eleven feet of fall at low water, four at flood, so the hammers are fastest in the dry months when the toll is dearest and slowest in the wet when everyone is trying to move.\n\n[[material.mire-bloom|Mire bloom]] rafted up from [[deposit.bloom-cuts|the Bloom Cuts]] arrives as spongy, slaggy, half-metal bog iron. The hammers beat the slag out of it and beat what is left into merchant bar of a stamped weight, and that stamp is honoured as far as [[city.gilded-ascent|the Gilded Ascent]]. It is the only reputation this town has that is not about water.',
      machineType: 'Engine',
      location: ['district.black-weir-hammer-row', 'landmark.the-weir-gates'],
      operator: 'A hammer-master to each of four helves, a bloom crew of six, and a stamp clerk who works for the Company and not for the forge',
      requiredSkills: ['skill.bench-sense', 'skill.heat-reading', 'skill.proof-marking'],
      controls: 'Race gate, cam clutch per helve, the tilt stop that sets blow height, and the stamp die under Company seal',
      inputs: ['material.mire-bloom', 'material.scaldstone'],
      process:
        'A bloom is heated to welding, brought under a helve, and beaten while the slag runs out of it like grey sweat. It takes about forty minutes and four reheats to get from bloom to a bar somebody will buy. Roasted [[material.scaldstone|scaldstone]] out of the Ironback is worked on the same hammers when a barge of it comes down, and the two irons are never mixed in one bar because they behave differently under a die and every drawer on the coast can tell.\n\nWhat leaves is [[material.blister-bar|bar]] under a stamp, plus the town\'s own two products: [[item.weirhook|weirhooks]] for the gantry crews and [[item.moor-stake|moor-stake]] heads that are cut into property law downriver. Everything moving between the interior and the eastern water passes this bank, pays, and waits.',
      outputs: ['material.blister-bar', 'item.weirhook', 'item.moor-stake'],
      energy: 'Eleven feet of head at low water, four at flood, through two bays into a breast-wheel race. Nothing here burns for power but the lamps',
      productionTime: 'Forty minutes and four heats to a bar; about ninety bars a working day across four helves in a dry month',
      failureRisks: [
        'Flood slowdown. At four feet of head the hammers barely lift, which means the forge is weakest exactly when the river is busiest and the town is most desperate for revenue.',
        'Helve failure. A cracked helve throws the head off the pivot at working speed. It clears the shop, it takes out the race wall, and the hammer-master is usually the one standing where it goes.',
        'Under-roasted ore. Scaldstone that has not been roasted long enough spits burning slag off the anvil in a fan. The roast yards are eleven days upriver and the forge has no way to check except by hitting it.',
        'Scheduled release into the race. Opening a gate on the sluice book without clearing the race puts the wheel pit under water in minutes. It has happened once, in a toll dispute, and the only document that would prove it was deliberate sleeps in the same room as [[npc.ost-vennick|the sluice-master]].',
        'Stamp fraud. The stamp is the entire value of the product, the die is under Company seal, and the clerk who holds it is paid by the Company. Bar leaving under-weight has been alleged three times in the Ascent and proved never.',
      ],
      upgrades: [
        row({
          name: 'Fifth helve on the second bay',
          cost: '1,200 writs and a race-wall cut',
          effect: 'Output up a quarter in dry months. No help at all in flood.',
        }),
        row({
          name: 'Tail-race deepening',
          cost: '3,800 writs and the right bank closed for a season',
          effect: 'Raises effective head at flood from four feet to about seven. Turns the works from seasonal into year-round.',
        }),
        row({
          name: 'Independent stamp office with an Ascent-appointed clerk (Overhaul)',
          cost: 'The Company giving up the die',
          effect: 'The stamp becomes trustworthy to people who are not the Company. Every Ascent factor wants this and the Company will not discuss it.',
        }),
      ],
      recipes: ['recipe.hammered-bar-iron'],
      mechanics: ['mechanic.the-sluice-book'],
      devNotes:
        PROPOSAL('The Black Weir is a canon name only. This entry stays inside the brief\'s sketch: basalt sluices, iron gantries, a weir that controls the delta throat. The four helves, the head figures, the forty-minute bar and the stamp office are the proposal and invent no Black Weir history, founding or politics beyond the Company charter the city entry already carries.') +
        '\n\nDESIGN INTENT: step one of the iron chain, and the cleanest demonstration in the file that infrastructure is politics. One gradient sells the toll and makes the iron, so anyone who takes the gates takes both. The flood inversion — weakest when busiest — is the detail that makes the town behave the way it does.',
    },
  }),

  /* ================================================================ */
  /* THE MAGIC CITY                                                    */
  /* ================================================================ */

  E({
    id: 'machine.the-ward-kilns',
    type: 'machine',
    name: 'The Ward Kilns',
    status: 'draft',
    summary: 'Chain-braced kilns firing marl into ward chalk inside a live fault field, at a measured dose to the burners.',
    tags: ['magic-city', 'kiln', 'thaumic', 'regulated'],
    fields: {
      purpose:
        'Marl fired anywhere else produces a white stick that draws a clean line and holds nothing. Marl fired inside the gradient of [[landmark.the-bound-fault|the Bound Fault]] produces [[material.ward-chalk|ward chalk]], and nobody has established why. Every ward on the continent is drawn in chalk burnt in this one street, which is not a trade secret, a patent or a technique. It is a place, and that is the entire basis of the Magic City\'s monopoly and of [[faction.fetterhouse|the Fetterhouse]]\'s licence roll.\n\nSix kilns on [[district.magic-city-chalk-row|Chalk Row]], braced against the slab movement with chain rather than buttress because a buttress cracks and a chain takes up. Each stick is milled, sieved, cake-pressed, stamped, numbered and entered before it leaves the row.',
      machineType: 'Kiln',
      location: ['district.magic-city-chalk-row', 'landmark.the-bound-fault'],
      operator: 'Two licensed burners to a kiln, rotated out on accumulated exposure rather than on shift length, and a licensing clerk who stamps every stick',
      requiredSkills: ['skill.chalk-hand', 'skill.toll-sense', 'skill.heat-reading'],
      controls: 'Draught door, cake press, the stamp and its number book, and a dose plate each burner carries and surrenders at the end of a rotation',
      inputs: ['material.ward-chalk'],
      process:
        'Marl comes east in blocks from [[deposit.ward-marls|the Ward Marls]] under the Anvil Shelf turf, bought years forward, which is as much a debt as a purchase. It is calcined for nineteen hours, milled, sieved to a fixed grade, and pressed into cakes and sticks.\n\nThe firing must happen inside a gradient window: the field varies, and chalk drawn from a kiln fired outside the window looks identical, assays identical, and dies inside a fortnight. That failure mode is the whole of [[quest.the-chalk-that-lies|the Chalk That Lies]] and the reason the number book exists.\n\nThe cost is carried by the burners. Standing in the gradient accrues [[mechanic.the-toll|Toll]] whether or not anyone is working, and the dose plate is the only honest instrument on the row. Burners are rotated out when their plate says so, which in practice means the roll is a rota of who is nearest their limit, and everyone on it knows their own position on the list.',
      outputs: ['material.ward-chalk', 'item.ward-pin', 'item.chalked-harness'],
      energy: 'Charcoal and coke for the calcining, and the fault field itself, which supplies nothing measurable and is nonetheless the reason the process works',
      productionTime: 'Nineteen hours a burn, six kilns, about 4,000 stamped sticks a week when the gradient window is open',
      failureRisks: [
        'Out-of-window firing. Chalk that is dead on arrival and cannot be told from good chalk by any test the Fetterhouse has. It fails under sustained load, which means it fails on a chain, which means it fails on a slab over a street.',
        'Burner over-dose. A plate ignored, a rotation deferred because the row is short-handed, and a licensed caster burns out. The licence roll and the casualty list are the same document read two ways.',
        '[[creature.chalk-louse|Chalk lice]] in the cake store. They eat ward chalk and lime binder and leave the cake looking untouched. A store that has been in for a fortnight can be hollow.',
        'Slippage during a burn. The slabs move. A kiln braced with chain survives it; a kiln that has had its chains shortened for clearance does not, and there are two on the row with shortened chains.',
        'Diverted sticks. Every stick is numbered and every number is entered, which is exactly why an unnumbered stick is worth eleven times a numbered one. The black market in ward chalk is not about supply, it is about anonymity.',
      ],
      upgrades: [
        row({
          name: 'Field-window instrument on the row',
          cost: '3,000 writs and a Fetterhouse concession that the window exists',
          effect: 'Out-of-window firing becomes detectable at the kiln instead of in a collapsed district. Would have prevented the adulterated batch entirely.',
        }),
        row({
          name: 'Longer chain bracing and a slack survey',
          cost: '1,700 writs and eleven days down per kiln',
          effect: 'The two shortened-chain kilns survive a slippage. Costs clearance the row does not have, which is why the chains were shortened.',
        }),
        row({
          name: 'Remote firing gear and a screened burner gallery (Overhaul)',
          cost: '9,000 writs, Meridian pressure work, and Fetterhouse licence reform',
          effect: 'Cuts burner dose by about two thirds. Also removes the reason the licence roll has to be a rota, which removes the Fetterhouse\'s grip on its own practitioners.',
        }),
      ],
      recipes: ['recipe.ward-chalk-burning'],
      mechanics: ['mechanic.ward-load', 'mechanic.the-toll'],
      devNotes:
        PROPOSAL('The six kilns, the nineteen-hour burn, the gradient window and the dose plate are the proposal. That the kilns fire scar marl into licensed ward chalk inside a live fault field, at a dose to the burners, is fixed by the manifest.') +
        '\n\nREGULATION: this is the one thaumic machine in the set and it is regulated in three separate ways at once — a place monopoly, a numbered licence on every stick produced, and a dose limit on the people who make it. That triple lock is the model for how any other magical industry in this world should be written. Magic is not a wish here; it is a kiln with a rota of who burns next.\n\nOPEN: marl and fired chalk share one material entry, so `inputs` and `outputs` both read [[material.ward-chalk|ward chalk]]. That is honest — the difference between them is a licence and a location, not a chemistry — but a materials author may want to split them.',
    },
  }),

  /* ================================================================ */
  /* RECIPES                                                           */
  /* ================================================================ */

  E({
    id: 'recipe.pan-crust-sorting',
    type: 'recipe',
    name: 'Pan Crust Sorting',
    status: 'draft',
    summary: 'Raw crust screened into concentrate, sand, six stamped nitre cuts and whatever is still moving after the ninth mesh.',
    tags: ['sifting', 'raw', 'chain-head'],
    fields: {
      overview:
        'The head of two chains and the cheapest recipe in the world to run, because the input costs nothing and lies in the open. What it costs is water, screens and lungs.\n\nNote what goes in and what comes out. Both are [[material.pan-nitre|pan nitre]]. The crust at the head of the tower and the six stamped cuts at the foot are chemically the same salt; the tower has not changed it, it has told the world what it was. The stamp is the product. That is not a cynical reading of the Pans, it is the tariff schedule.',
      tier: 'Raw',
      inputs: ['material.pan-nitre', 'item.sift-screen'],
      outputs: ['material.pan-nitre', 'material.blackfall-sand', 'item.pale-dust'],
      yield:
        'Per three-tonne charge: about 240 kg mineral concentrate, 1.9 t silica sand, 400 kg nitre in six graded cuts, and 60 kg of ninth-mesh fines that leave as pale dust',
      machine: ['machine.the-sieve-cascade'],
      skills: ['skill.sieve-tuning', 'skill.bench-sense'],
      time: 'Six to seven hours a charge, wind permitting; four screens consumed per tower-week',
      devNotes:
        PROPOSAL('Yield figures and the four-fraction split are the proposal. That raw crust sorts into concentrate, silica sand and pan liquor is fixed by the city entry.') +
        '\n\nThe fines line is the design hook. A tower that tunes for nitre makes a living; a tower that tunes for fines makes a fortune and poisons its own crew, and the mesh setting that does it is one count and one afternoon.',
    },
  }),

  E({
    id: 'recipe.brine-clarification',
    type: 'recipe',
    name: 'Brine Clarification',
    status: 'draft',
    summary: 'Spent sifting liquor filtered through bone char and laddered down into soda ash, table salt and bittern.',
    tags: ['sifting', 'refined', 'char-chain'],
    fields: {
      overview:
        'Eleven pans, eleven days, and one bed of bone char at the head that decides whether the soda ash is white or grey. Grey ash sells for two thirds of white, and no substitute for the char has been found in forty years of looking, which is a sentence with the whole [[machine.the-char-retorts|Arena City]] arrangement folded inside it.\n\nRun the beds sour and you will not know until a Meridian kiln has spun a month of cloudy glass. The purity clause puts that loss on the Pans, so the Sifting City has an expensive, entirely selfish reason to keep buying char it would rather not discuss.',
      tier: 'Refined',
      inputs: ['material.pan-nitre'],
      outputs: ['item.nitre-cask'],
      yield:
        'Per full ladder: about 1.1 t soda ash off pans four and five, 700 kg table salt off pan eight, 40 casked kilos drawn at pan two under blasting licence, and four tonnes of magnesium bittern nobody wants',
      machine: ['machine.the-bittern-ladder'],
      skills: ['skill.heat-reading', 'skill.charge-blending'],
      time: 'Eleven days a ladder in a dry month; twenty-six in a wet season',
      devNotes:
        PROPOSAL('The eleven-pan fractionation and the char dependency are the proposal; bone char shipped east from the Arena City is fixed by the manifest.') +
        '\n\nOPEN: soda ash has no material entry and is the actual link into [[recipe.crown-glass-blanks|the glass recipe]], so the chain is expressed here as a `follows` relation rather than as a shared id. Worth an entry if the glass trade ever needs to be interdicted at this step.\n\nThe blasting-licence draw at pan two is why [[item.nitre-cask|nitre casks]] are tracked by the barrel and the ounce: this is the only lawful place they are filled.',
    },
  }),

  E({
    id: 'recipe.brass-billet-casting',
    type: 'recipe',
    name: 'Brass Billet Casting',
    status: 'draft',
    summary: 'Pans concentrate roasted, reduced under Greatwood charcoal and alloyed into billet, then stood eighteen months before it may be cut.',
    tags: ['meridian-coast', 'refined', 'brass-chain'],
    fields: {
      overview:
        'Two steps in one recipe because the trade treats them as one purchase. First the reduction: roasted concentrate under charcoal in a reverberatory bath, tapped as copper. Then the alloying, at the second hearth, into either [[material.orrery-bronze|orrery bronze]] with tin or into the softer trade brass that seals and cuff tallies are struck from.\n\nThe eighteen-month standing is not tradition. Chill-cast bronze creeps as it ages, and gear teeth cut into green metal go out of true about two years later, three cities away from anyone who can be blamed. The College enforces the wait with a dated stamp, which is why an aged billet yard is worth more standing still than sold.',
      tier: 'Refined',
      inputs: ['material.pan-nitre', 'material.blackbole-timber', 'food.meridian-olive'],
      outputs: ['material.orrery-bronze'],
      yield: 'Per forty-hour charge: about 900 kg of tapped copper, going out as roughly 700 kg bronze billet and 200 kg trade brass',
      machine: ['machine.the-verdigris-hearth'],
      skills: ['skill.heat-reading', 'skill.bench-sense', 'skill.proof-marking'],
      time: 'Forty hours of fire, then eighteen months of ageing before a lawful cut',
      devNotes:
        PROPOSAL('The two-hearth arrangement and the eighteen-month ageing rule are the proposal. That the hearth reduces sorted concentrate with Greatwood charcoal into billet is fixed by the manifest.') +
        '\n\nOPEN: the copper-bearing concentrate, the charcoal, the tin and the zinc are all named in prose and none exists as an entity. `inputs` therefore lists the flux, the timber the charcoal is burnt from, and the olive cake that banks the fire. This is the weakest ref link in the file and it is flagged rather than fudged.\n\nDESIGN INTENT: the ageing rule gives the crafting economy a time cost that cannot be bought out, only stolen. A stack of aged billet is a vault, and it can be robbed.',
    },
  }),

  E({
    id: 'recipe.drawn-wire-and-tube',
    type: 'recipe',
    name: 'Drawn Wire and Tube',
    status: 'draft',
    summary: 'Bar and billet pulled through graded button dies into coil wire, rod and the only seamless tube on the continent.',
    tags: ['meridian-coast', 'component', 'chokepoint'],
    fields: {
      overview:
        'The junction of the iron and brass chains, and the narrowest point in the continent\'s industry. A pass reduces about a fifth; between passes the stock is annealed, because cold-worked metal that is pulled again without annealing cracks in the die and takes the die with it. Seamless tube is drawn over a mandrel, which is a trick four benches in the world can hold.\n\nUnder [[mechanic.conduit-hours|conduit hours]] this recipe is bid for by the slot rather than booked by the day. A batch left annealed when its slot passes work-hardens overnight in sea damp and is scrap by morning, and the College charges for the missed slot anyway.',
      tier: 'Component',
      inputs: ['material.blister-bar', 'material.orrery-bronze', 'material.blackfall-button'],
      outputs: ['item.governor-spring', 'item.sift-screen'],
      yield: 'Per bench-window: 900 m of 3 mm iron wire in coil, or 40 m of seamless brass tube, or sixty governor springs, or thirty screen frames. One of the four, never two',
      machine: ['machine.the-drawbench-vaults'],
      skills: ['skill.pressure-fitting', 'skill.bench-sense', 'skill.proof-marking'],
      time: 'Two tide windows a day, about five hours each, dead through slack water',
      devNotes:
        PROPOSAL('The pass reduction, the annealing cycle and the four-bench tube limit are the proposal. That the Vaults are the shared node of the brass and iron chains is fixed by the manifest.') +
        '\n\nOPEN: drawn stock itself has no material entry, so the coil, rod and tube live in `yield` and the two components that do have entries are the listed outputs. [[recipe.laid-lattice-cable|The cable recipe]] therefore cites the bar the wire is drawn from rather than the wire. Both want re-pointing if a drawn-stock material is ever written.\n\nDESIGN INTENT: one recipe, four mutually exclusive products, two windows a day. That is a scheduling puzzle with political consequences, and it is the reason a tariff argument on the Meridian Coast can starve the Sky City of cable.',
    },
  }),

  E({
    id: 'recipe.crown-glass-blanks',
    type: 'recipe',
    name: 'Crown Glass Blanks',
    status: 'draft',
    summary: 'Sand, soda ash and quicklime fritted, melted and spun into flat discs; the rim is a lens and the middle is a tavern window.',
    tags: ['meridian-coast', 'component', 'glass', 'char-chain'],
    fields: {
      overview:
        'Fritting first, at nine hours below melting, so that the batch reacts before it runs and the gas leaves before the glass sets. Then thirty hours in the pot, then the spin: a gather opened on a rod and whirled until it flattens itself into a metre of disc.\n\nThe disc is not uniform and that is the trade. The outer ring is bubble-free and flat enough for an instrument face, and it becomes [[material.clearcast-glass|clearcast glass]]. The bullseye where the rod was is thick, distorted and cheap, and it glazes half the taverns between here and the Ascent. One process, two markets, an order of magnitude apart in price.',
      tier: 'Component',
      inputs: ['material.pan-nitre', 'material.tideset-cement'],
      outputs: ['material.clearcast-glass'],
      yield: 'Per pot round: eleven discs, of which about seven yield instrument-grade rim. Roughly 40 kg of optical plate and 60 kg of bullseye and edge cullet',
      machine: ['machine.the-frit-kiln'],
      skills: ['skill.heat-reading', 'skill.mirror-cutting'],
      time: 'Nine hours fritting, thirty hours melting, one spinning day; four rounds a fortnight',
      devNotes:
        PROPOSAL('The two-stage frit, the spun disc and the rim-versus-bullseye economics are the proposal. That the kiln fuses pan sand, soda ash and lime into crown blanks and sealed ware is fixed by the manifest.') +
        '\n\nOPEN: silica sand and soda ash both come out of the Sifting City and neither has a material entry. `inputs` uses [[material.pan-nitre|pan nitre]] for the salt side and [[material.tideset-cement|tideset cement]] for the lime, which is the quicklime drawn off the same calcining beds. The chain into [[recipe.brine-clarification|brine clarification]] is expressed as a `follows` relation.\n\nDESIGN INTENT: a single adulterated barrel of salt ruins a month of this. That is the mechanical link that makes the Pans grading fraud into a Meridian problem, and it means an investigation that starts with cloudy glass ends two thousand kilometres away at a tower-master\'s mesh setting.',
    },
  }),

  E({
    id: 'recipe.sealed-assay-balance',
    type: 'recipe',
    name: 'Sealed Assay Balance',
    status: 'draft',
    summary: 'Drawn brass, crown glass and a certified reference mass built into a wired, dated, tamper-sealed trade balance.',
    tags: ['gilded-ascent', 'masterwork', 'metrology'],
    fields: {
      overview:
        'The terminal item of the brass chain and the char chain at once. A beam of drawn brass tube on rock-crystal edges, a pan set, a set of copies certified against [[landmark.the-brass-standard|the Brass Standard]], and the whole thing closed in a crown-glass case, wired and sealed with a dated Concord stamp. Break the wire and the certificate is void.\n\nThe portable version of the same certification is the [[item.assayers-tray|assayer\'s tray]], which carries reagent wells, a loupe and a book of stamped result cards. The tray is worth almost nothing; the card book is worth a career. A card sealed in the field is honoured at [[machine.the-assay-cage|the Assay Cage]] without re-testing, which is the entire basis of long-distance trade in this world and a spectacular unexamined assumption.',
      tier: 'Masterwork',
      inputs: ['material.orrery-bronze', 'material.clearcast-glass', 'material.blackfall-button'],
      outputs: ['item.assayers-tray'],
      yield: 'One sealed bench balance, or one licensed field tray with a book of forty stamped cards. About eleven of the former and ninety of the latter a year',
      machine: ['machine.the-assay-cage'],
      skills: ['skill.proof-marking', 'skill.bench-sense', 'skill.ledger-hand'],
      time: 'A day and a half a unit, of which twelve hours are the balance doing nothing but reaching room temperature',
      devNotes:
        PROPOSAL('The construction, the twelve-hour settling and the wired seal are the proposal. That the brass and char chains converge on the Assay Cage is fixed by the manifest.') +
        '\n\nDESIGN INTENT: a Masterwork that is an instrument rather than a weapon. Owning one lets a party call a weight false and be believed, which in this setting is a more dangerous capability than a sword.\n\nThe honest crafting question a party will eventually ask: certified against what? The answer is eleven pieces of brass in a locked room, and nobody has ever checked those against anything at all.',
    },
  }),

  E({
    id: 'recipe.bonded-tally-card',
    type: 'recipe',
    name: 'Bonded Tally Card',
    status: 'draft',
    summary: 'Card stock punched, netted and closed with a twelve-gram lead seal into a bearer note redeemable in three named cities.',
    tags: ['gilded-ascent', 'finished', 'credit', 'forgery-hook'],
    fields: {
      overview:
        'A card of a hundred and forty by ninety millimetres, written in figures and in words, punched at the wicket in front of the person presenting it, sorted nine times, and sealed. What comes out is a [[item.stair-writ|stair writ]]: a promise by a named house to pay the bearer at named houses in three named cities.\n\nIt is not money. No government issues it and no law requires anyone to take one. It works because eleven private houses have honoured them without fail for long enough that refusing one is now the strange act. Four fifths of the reserve behind that habit is lent against Sky City counterweight leases, and the belief is checked exactly once, at a wicket, by a clerk who has never seen the reserve figures either.',
      tier: 'Finished',
      inputs: TBD('Is a bearer note crafted from materials at all, or is its real input a collateral position that a crafting system has no way to represent?'),
      outputs: ['item.stair-writ'],
      yield: 'About 4,000 cards a day cleared, of which roughly 600 leave the hall as issued writs rather than netting to nothing',
      machine: ['machine.the-tally-engine'],
      skills: ['skill.ledger-hand', 'skill.plain-letters', 'skill.writ-craft'],
      time: 'A four-hour netting run; a writ is issued the same afternoon it is cleared',
      devNotes:
        PROPOSAL('The card format, the nine-field netting and the daily volumes are the proposal. That the engine punches bearer notes redeemable in three named cities is fixed by the manifest.') +
        '\n\nOPEN: card stock and seal lead have no material entries, which is why `inputs` is a question rather than a list. It is a real design question and not just a gap: this recipe\'s scarce input is creditworthiness, and no crafting UI in the seed can express that.\n\nDESIGN INTENT: the forgery anchor for the whole continent. Three attack surfaces already exist on [[machine.the-tally-engine|the engine]] — the rate pin, the reject drawer and the card store — and they suit a thief, a forger and an arsonist respectively.',
    },
  }),

  E({
    id: 'recipe.laid-lattice-cable',
    type: 'recipe',
    name: 'Laid Lattice Cable',
    status: 'draft',
    summary: 'Six strands of drawn wire laid with a reverse twist, served with tarred yarn and run hot through mirelac.',
    tags: ['sky-city', 'component', 'iron-chain'],
    fields: {
      overview:
        'Six strands, laid up against their own twist so the finished hawser does not unwind under load, served with tarred yarn and drawn through a mirelac bath while still warm. The lay length is fixed and checked every eleven metres, because a lay that opens up is a cable that will saw itself apart at a sheave.\n\nA cable is condemned at the first broken wire. That single rule governs the entire economy of [[city.sky-city|the Sky City]]: it sets how often cable must be re-laid, how much of the city\'s income is already spoken for, and why condemned rope has a thriving second market on the lower terraces of the Ascent, where a hawser that is unfit to carry a city is perfectly adequate to carry a bale.',
      tier: 'Component',
      inputs: ['material.blister-bar', 'material.mirelac'],
      outputs: ['material.stairwire'],
      yield: 'One unspliced thousand-metre hawser, six strands, condemned at the first broken wire. About thirty a year',
      machine: ['machine.the-strand-loom'],
      skills: ['skill.lattice-work', 'skill.cable-and-drum', 'skill.set-and-brace'],
      time: 'Nine days of continuous walking, which cannot be interrupted without condemning the cable at the stopping point',
      devNotes:
        PROPOSAL('The reverse lay, the nine-day walk and the condemned-rope second market are the proposal. That the loom lays drawn iron wire into the Sky City\'s tension cable is fixed by the manifest.') +
        '\n\nOPEN: `inputs` cites [[material.blister-bar|blister bar]] because drawn wire has no entity of its own. The bar is drawn to coil at [[machine.the-drawbench-vaults|the Drawbench Vaults]] eleven days away, and the dependency is carried by a `follows` relation instead of by a shared id.\n\nDESIGN INTENT: the nine-day uninterruptible run is the hook. Anything that stops the loom for four hours costs the Sky City a cable, and the city can only afford to lose about one a year.',
    },
  }),

  E({
    id: 'recipe.bone-char-firing',
    type: 'recipe',
    name: 'Bone Char Firing',
    status: 'draft',
    summary: 'A sealed charge fired without air for eleven hours: char, oil and ash, and a book that decides whose.',
    tags: ['arena-city', 'refined', 'dark', 'char-chain'],
    fields: {
      overview:
        'Technically this is the simplest recipe in the file. A sealed iron retort, no air, eleven hours, and after the first hour the charge supplies its own fuel. Char is drawn cold, graded, sacked and shipped east.\n\nWhat is not simple is the entry condition. Nine columns on [[landmark.the-claim-wall|the Claim Wall]], one a day, a recovery fee negotiated in practice within a stated band, and a Rendering Book that recorded six hundred and eleven entries last year. The recipe cannot be run without that book, and the book is the only part of it anyone in this city is prepared to argue about.',
      tier: 'Refined',
      inputs: TBD('The charge has no material entry. Naming it would create a tradeable commodity out of the Rendering Book, which is precisely what the Ring Chamber would like. Should the gap stay open on purpose?'),
      yield: 'Per ninety-kilogramme charge: about 34 kg of graded bone char, 11 litres of bone oil, and 20 kg of ash sold to the Steppe herders below the cost of the sacks',
      machine: ['machine.the-char-retorts'],
      skills: ['skill.heat-reading', 'skill.bench-sense'],
      time: 'Eleven hours a charge across four retorts; three charges a day in a heavy card season',
      devNotes:
        PROPOSAL('The retort cycle, the self-fuelling gas return and the yield figures are the proposal. The Claim Wall, the nine-day window and the export of char to the Pans are fixed by the manifest and the city entry.') +
        '\n\nHANDLING: consequence, never spectacle. Play this through the claim clerk, the fee and the tenth-morning list. Nothing here needs a description of a body and nothing here should get one.\n\nOPEN: bone char has no material entry either, which means the char chain into [[recipe.brine-clarification|brine clarification]] is carried entirely by a `follows` relation. That is arguably correct: making bone char a commodity with a page and a price is a decision somebody should take deliberately rather than by default.',
    },
  }),

  E({
    id: 'recipe.stumpwood-distillation',
    type: 'recipe',
    name: 'Stumpwood Distillation',
    status: 'draft',
    summary: 'Resinous stumpwood cooked without air for three days into acid, spirit, pitch and the hard charcoal the coast cannot smelt without.',
    tags: ['tree-city', 'refined', 'wood-chain'],
    fields: {
      overview:
        'Three days of firing and four of cooling to a retort. The fractions come off in order and are taken off in order: pyroligneous acid and water on the first day, spirit of turpentine and light tar on the second, heavy pitch on the third. What is left in the retort when it is cold is hard charcoal.\n\nThe pitch stays. It cures the split staves that make the Tree City black and weatherproof and eager to burn. The charcoal leaves, all of it, and crosses the whole continent to feed [[machine.the-verdigris-hearth|the Verdigris Hearth]], which puts the Greatwood upstream of every furnace on the Meridian Coast and gives the Marshalcy a weapon it has never fired.',
      tier: 'Refined',
      inputs: ['material.blackbole-timber'],
      outputs: ['item.bastion-jack'],
      yield: 'Per four-tonne retort charge: about 900 kg hard charcoal, 380 litres pitch, 110 litres spirit of turpentine, 300 litres acid liquor neutralised and dumped, and a tonne of cured splint offcut',
      machine: ['machine.the-pitchworks'],
      skills: ['skill.heat-reading', 'skill.bench-sense'],
      time: 'Three days firing, four days cooling; nine retorts on a staggered round',
      devNotes:
        PROPOSAL('The three-day fraction order, the yield split and the splint offcut are the proposal. That the Pitchworks distils stumpwood into pitch, spirit and hard charcoal is fixed by the manifest.') +
        '\n\nOPEN: pitch, spirit and charcoal are three separately traded goods with no entities. `outputs` therefore names the one thing with a page — the [[item.bastion-jack|bastion jack]] riveted up from cured offcut beside the retorts — and the three real products live in `yield`. Charcoal is the important one: it carries continental leverage and should probably be a material.\n\nDESIGN INTENT: the head of the wood chain and the reason the Tree City has a foreign policy. The whole Mediterranean smelt sits eleven days downstream of nine retorts in a militarised forest.',
    },
  }),

  E({
    id: 'recipe.pitch-laminated-limb',
    type: 'recipe',
    name: 'Pitch-Laminated Limb',
    status: 'draft',
    summary: 'Seven steamed staves laid with hot pitch and held under two hundred tonnes for thirty hours, so the limb keeps its cast in wet cold.',
    tags: ['tree-city', 'component', 'wood-chain'],
    fields: {
      overview:
        'A single-piece limb takes a set in a Greatwood winter and never gives it back. Lamination fixes that: thin staves, steamed limp, laid with pitch at working heat, screwed down in a form and left thirty hours to cool under load. Grain runs the right way in every layer and the limb holds its cast through a wet season.\n\nTimings are unforgiving in both directions. Broken out early, the glue line has not set and the limb is scrap. Broken out late, it has bonded to the form and takes the form with it. The thirty-hour glass on the wall of [[district.tree-city-spanworks|the Spanworks]] is the most-watched object in the city after the conscription roll.',
      tier: 'Component',
      inputs: ['material.blackbole-timber', 'material.mirelac'],
      outputs: ['item.palisade-arbalest'],
      yield: 'Per form: one heavy engine limb, or four arbalest prod laths. Four forms in the press, so about twenty-two heavy limbs a month',
      machine: ['machine.the-limb-press'],
      skills: ['skill.bench-sense', 'skill.heat-reading'],
      time: 'Two hours steaming, twenty minutes lay-up, thirty hours under load',
      devNotes:
        PROPOSAL('Seven-stave lamination, the thirty-hour cure and the two-hundred-tonne figure are the proposal. That the Limb Press laminates staves and hot pitch into ballista limbs and shield cores is fixed by the manifest.') +
        '\n\nA cold glue line is invisible and fatal, and it always traces back to a pitch pot that dropped below working heat during lay-up. That is a sabotage vector with a delay on it: the weapon fails at full draw, weeks later, in front of whoever is serving it.',
    },
  }),

  E({
    id: 'recipe.redoubt-ballista',
    type: 'recipe',
    name: 'Redoubt Ballista',
    status: 'draft',
    summary: 'Laminated limbs, laid cable and stamped Weir iron assembled into a bolt engine the Tree City cannot build alone.',
    tags: ['tree-city', 'finished', 'weapons', 'chain-junction'],
    fields: {
      overview:
        'Where the wood chain and the iron chain finally meet. Two laminated limbs, a stock and slider of blackbole, a windlass and pawl in [[material.blister-bar|Weir bar]], and the string and stays in [[material.stairwire|laid cable]] because nothing organic holds tension through a Greatwood winter.\n\nThe result is a swivel engine bolted to a gallery or a redoubt parapet, served by two, throwing a metre bolt to about four hundred paces flat. The [[item.gallery-lath|gallery lath]] is the same machine on a bridge mount. The Marshalcy holds twelve months of cable in store against the day it cannot buy more, and treats the figure as a state secret, because the figure is how long the Tree City can fight.',
      tier: 'Finished',
      inputs: ['material.blackbole-timber', 'material.stairwire', 'material.blister-bar'],
      outputs: ['item.gallery-lath'],
      yield: 'One mounted engine per two heavy limbs; about eleven a month when cable is coming through and none at all when it is not',
      machine: ['machine.the-limb-press'],
      skills: ['skill.gallery-drill', 'skill.bench-sense', 'skill.cable-and-drum'],
      time: 'Nine days from cured limbs to a mounted, proofed engine',
      devNotes:
        PROPOSAL('The engine\'s construction, range and mounting are the proposal. That the redoubt ballista is where the wood and iron chains meet, and that the Tree City cannot arm its redoubts without Black Weir iron and Sky City cable, is fixed by the manifest.') +
        '\n\nDESIGN INTENT: the payoff item of the whole file. Four cities are in this weapon — bog iron from the Drown, bar from the Weir, cable from the Sky City, timber and pitch from the Greatwood — and a militarised city that grows its own everything still cannot arm a wall without two neighbours it does not trust. Play the twelve-month cable store as a countdown whenever the Tree City goes to war.',
    },
  }),

  E({
    id: 'recipe.hammered-bar-iron',
    type: 'recipe',
    name: 'Hammered Bar Iron',
    status: 'draft',
    summary: 'Bog bloom beaten under sluice-driven hammers until the slag runs out, then stamped to a weight the Ascent will honour.',
    tags: ['black-weir', 'refined', 'iron-chain', 'proposal'],
    fields: {
      overview:
        'A bloom off [[deposit.bloom-cuts|the Bloom Cuts]] is not iron, it is iron and slag in the same sponge. Heat it to welding, put it under a helve, and the slag runs out of it grey and the metal consolidates. Forty minutes and four reheats from bloom to a bar somebody will buy.\n\nWhat makes the bar worth anything beyond the delta is the stamp. A stamped weight off [[machine.the-sluice-hammers|the Weir hammers]] is honoured as far as [[city.gilded-ascent|the Gilded Ascent]] without re-weighing, which is the only reputation this town has that is not about water, and which rests entirely on a die held under Company seal by a clerk the Company pays.',
      tier: 'Refined',
      inputs: ['material.mire-bloom', 'material.scaldstone'],
      outputs: ['material.blister-bar', 'item.weirhook', 'item.moor-stake'],
      yield: 'Per bloom: about 14 kg of stamped merchant bar from 22 kg of sponge. Roughly ninety bars a working day across four helves in a dry month',
      machine: ['machine.the-sluice-hammers'],
      skills: ['skill.bench-sense', 'skill.heat-reading', 'skill.proof-marking'],
      time: 'Forty minutes and four heats a bar; the whole works runs at a quarter speed at flood',
      devNotes:
        PROPOSAL('The Black Weir is a canon name only. The forty-minute bar, the yield and the stamp office are the proposal, and nothing here invents Black Weir history beyond the basalt sluices and iron gantries the brief sketches.') +
        '\n\nOPEN: merchant bar and cemented [[material.blister-bar|blister bar]] share one entry, so this recipe outputs the bar and the nine-day charcoal cementation that properly separates them has no step of its own. If a materials author splits them, the cementation belongs to the Greatwood side of the chain, not to the Weir.\n\nThe flood inversion is the detail worth playing: the hammers are slowest when the river is busiest, so the Weir\'s two revenue streams peak in opposite seasons and the town is always short of one of them.',
    },
  }),

  E({
    id: 'recipe.ward-chalk-burning',
    type: 'recipe',
    name: 'Ward Chalk Burning',
    status: 'draft',
    summary: 'Marl calcined nineteen hours inside a live fault field, milled, cake-pressed, stamped and logged stick by stick.',
    tags: ['magic-city', 'refined', 'regulated', 'thaumic'],
    fields: {
      overview:
        'Marl in, chalk out, and the seed gives both the same entry because the difference between them is a licence and a location rather than a chemistry. Nineteen hours of calcining, milled, sieved to grade, pressed into cakes and sticks, then stamped, numbered and entered before it leaves [[district.magic-city-chalk-row|Chalk Row]].\n\nThe firing has to fall inside a gradient window. Chalk burnt outside it looks the same, mills the same, assays the same, and dies within a fortnight — under load, which means on a chain, which means over a street. That is the failure mode behind [[quest.the-chalk-that-lies|the Chalk That Lies]], and it is the reason a numbered stick and an unnumbered stick are two different commodities at eleven times the price.',
      tier: 'Refined',
      inputs: ['material.ward-chalk'],
      outputs: ['material.ward-chalk', 'item.ward-pin', 'item.chalked-harness'],
      yield: 'Per burn: about 700 stamped sticks and 90 cake blocks. Roughly 4,000 sticks a week across six kilns when the window is open',
      machine: ['machine.the-ward-kilns'],
      skills: ['skill.chalk-hand', 'skill.ward-cutting', 'skill.toll-sense'],
      time: 'Nineteen hours a burn, plus whatever the gradient window costs in waiting, which in a bad month is most of it',
      devNotes:
        PROPOSAL('The nineteen-hour calcining, the gradient window and the numbering regime are the proposal. That the kilns fire scar marl into licensed ward chalk inside a live fault field, logged stick by stick, is fixed by the manifest.') +
        '\n\nREGULATION: the model magical consumable. It cannot be made anywhere else because the requirement is a place; it cannot be sold anonymously because every stick is numbered; and it cannot be made without accruing [[mechanic.the-toll|Toll]] on the people who make it. Any other regulated magic in this world should be able to point at those three locks.\n\nDESIGN INTENT: lines go dead within a season by canon, so this is a repeat-order business with a monopoly attached, which is the most reliable way to make a supply line worth fighting over.',
    },
  }),

  E({
    id: 'recipe.duct-mirror-resilvering',
    type: 'recipe',
    name: 'Duct Mirror Resilvering',
    status: 'draft',
    summary: 'Tin foil and quicksilver laid onto cleaved mica plate on a ninety-day round, because the amalgam dulls and the silverers do not.',
    tags: ['hollow-karst', 'component', 'maintenance'],
    fields: {
      overview:
        'Maintenance rather than production, and the most important recipe in the Hollow Karst. Tin foil is laid on a stone table, flooded with quicksilver, and the cleaved [[material.sunwell-mica|mica]] leaf is slid onto it and weighted for three weeks while the excess drains. What comes off is a mirror that reflects about nine parts in ten, for about ninety days.\n\nThe round never stops. Two hundred plates, ninety days, roughly two plates a day forever. Condemned leaves are not thrown away: they are cut down, mounted on jointed arms and sold as [[item.sunwell-mirror|sunwell mirrors]], which is how a private plot steals light from a public duct and why light theft is the characteristic crime of this city.',
      tier: 'Component',
      inputs: ['material.sunwell-mica'],
      outputs: ['item.sunwell-mirror'],
      yield: 'Two duct plates a day, two hundred on the round; about forty condemned leaves a season go out as hand mirrors',
      machine: ['machine.the-mirror-ducts'],
      skills: ['skill.mirror-cutting', 'skill.heat-reading'],
      time: 'Three weeks under weight per plate, on a rolling ninety-day round that has not stopped in living memory',
      devNotes:
        PROPOSAL('The tin-amalgam process, the three-week draining and the condemned-leaf trade are the proposal. The ninety-day round and the quicksilver poisoning that sets it are fixed by the manifest and the city entry.') +
        '\n\nOPEN: quicksilver and tin have no material entries, and both are imported. That is the actual dependency: the Hollow Karst\'s food supply is hostage to two metals it does not produce, and neither of them currently exists in the seed. Worth writing.\n\nThe ninety-day term is a poisoning schedule dressed as a maintenance schedule. The [[machine.the-mirror-ducts|second-surface glass upgrade]] would end it, costs 2,000 writs, and has not been bought. That is the entry\'s moral content and a party can force the question.',
    },
  }),

  E({
    id: 'recipe.lamp-gas-bladders',
    type: 'recipe',
    name: 'Lamp-Gas Bladders',
    status: 'draft',
    summary: 'Fen damp scrubbed through slaked lime and squeezed into gut bladders that burn nine hours and sink boats.',
    tags: ['the-drown', 'refined', 'fuel', 'delta'],
    fields: {
      overview:
        'Damp comes up out of the mud sour enough to poison a lamp wick overnight, so it is bubbled through slaked lime before it is worth anything. Then two people on a treadle put it into a gut bladder lined at the seams with [[material.mirelac|mirelac]], and a full bladder is about a man\'s weight and burns nine hours in a good lamp.\n\nIt is the delta\'s only manufactured export and it is what lights the eastern river. It is also the standing hazard of every boat on that river, because gas pools low, holds are low, and a bladder that has been stowed below deck by somebody in a hurry is a decision that gets made about once a season with the same result.',
      tier: 'Refined',
      inputs: ['material.glasscane', 'material.mirelac'],
      outputs: TBD('The charged bladder has no item entry, so the delta\'s only export cannot be carried, priced or confiscated in play. Should it be an item, a material, or deliberately bulk-only?'),
      yield: 'Nine to fourteen bladders a barge-day from proved mud, three from poor; a bladder burns about nine hours',
      machine: ['machine.the-fen-damp-taps'],
      skills: ['skill.marsh-footing', 'skill.bench-sense'],
      time: 'A barge-day. Proving new mud after a re-moor takes between two days and a season',
      devNotes:
        PROPOSAL('Lime scrubbing, the treadle pump, the nine-hour burn and the gas-ground problem are the proposal. That the taps scrub fen damp through lime and compress it into gut bladders is fixed by the manifest.') +
        '\n\nOPEN: neither the fen damp nor the finished bladder has an entity, which is why `outputs` is a question. This is the most player-facing of the gaps in the file: a party will want to buy, carry, sell or set fire to a bladder within an hour of arriving in the delta.\n\nDESIGN INTENT: the loop resets every [[mechanic.the-remoor|re-moor]]. Find gas ground, prove it, hold it, lose it. The register upgrade on [[machine.the-fen-damp-taps|the taps]] is the moment the delta stops racing and starts owning, and it needs eleven families to agree on something, which is the actual quest.',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* --- Siting ------------------------------------------------------ */
  R('machine.the-sieve-cascade', 'located_in', 'landmark.the-great-sieve', 'nine licensed towers along the crest'),
  R('machine.the-bittern-ladder', 'located_in', 'district.sifting-city-the-water-court', 'eleven stepped pans on the ration main'),
  R('machine.the-verdigris-hearth', 'located_in', CITY.mediterranean, 'the eastern end of the Yards, where the wind takes the smoke off the groves'),
  R('machine.the-drawbench-vaults', 'located_in', CITY.mediterranean, 'nine vaults under the tide mills'),
  R('machine.the-frit-kiln', 'located_in', CITY.mediterranean),
  R('machine.the-tally-engine', 'located_in', 'district.gilded-ascent-counting-terrace', 'the clearing hall on the eleventh terrace'),
  R('machine.the-assay-cage', 'located_in', 'landmark.the-brass-standard', 'the Cage is the room the standard sits in'),
  R('machine.the-oxblood-hoists', 'located_in', 'district.gilded-ascent-confluence-wharves', 'lower drum houses and the ballast pumps'),
  R('machine.the-strand-loom', 'located_in', 'district.sky-city-lattice-town', 'crew lodgings and the hiring board'),
  R('machine.the-strand-loom', 'located_in', 'district.sky-city-the-underdeck', 'the walk runs the underdeck ring'),
  R('machine.the-char-retorts', 'located_in', 'district.arena-city-the-under-stands', 'the flues run past the pens'),
  R('machine.the-pitchworks', 'located_in', 'district.tree-city-pitch-yards'),
  R('machine.the-limb-press', 'located_in', 'district.tree-city-spanworks'),
  R('machine.the-mirror-ducts', 'located_in', 'landmark.sunwell-shaft', 'the main duct is the shaft'),
  R('machine.the-mirror-ducts', 'located_in', 'district.cave-agrarian-city-mirror-quarter', 'silvering sheds and cleaving floors'),
  R('machine.the-fen-damp-taps', 'located_in', 'district.floating-swamp-settlement-the-gas-fleet'),
  R('machine.the-sluice-hammers', 'located_in', 'district.black-weir-hammer-row'),
  R('machine.the-sluice-hammers', 'located_in', 'landmark.the-weir-gates', 'driven off the same head that sells the toll'),
  R('machine.the-ward-kilns', 'located_in', 'district.magic-city-chalk-row'),
  R('machine.the-ward-kilns', 'located_in', 'landmark.the-bound-fault', 'inside the gradient, which is the entire licence'),
  R('machine.the-sieve-cascade', 'located_in', REGION.whitePans),
  R('machine.the-fen-damp-taps', 'located_in', REGION.theDrown, 're-sited at every drift'),

  /* --- Inputs ------------------------------------------------------ */
  R('machine.the-sieve-cascade', 'requires', 'material.pan-nitre', 'raw crust, free and lying in the open'),
  R('machine.the-sieve-cascade', 'requires', 'item.sift-screen', 'four screens a tower-week'),
  R('machine.the-bittern-ladder', 'requires', 'material.pan-nitre', 'spent liquor off the cascade'),
  R('machine.the-verdigris-hearth', 'requires', 'material.blackbole-timber', 'hard charcoal, eleven days from the Greatwood'),
  R('machine.the-verdigris-hearth', 'requires', 'material.pan-nitre', 'flux, eleven parts mineral to one'),
  R('machine.the-verdigris-hearth', 'requires', 'food.meridian-olive', 'third-press cake to bank the fire'),
  R('machine.the-drawbench-vaults', 'requires', 'material.blister-bar'),
  R('machine.the-drawbench-vaults', 'requires', 'material.orrery-bronze', 'aged eighteen months before it may be cut'),
  R('machine.the-drawbench-vaults', 'requires', 'material.blackfall-button', 'graded dies, rented by the shift'),
  R('machine.the-frit-kiln', 'requires', 'material.pan-nitre', 'the finest cut only'),
  R('machine.the-frit-kiln', 'requires', 'material.tideset-cement', 'quicklime drawn before the ash is blended'),
  R('machine.the-assay-cage', 'requires', 'material.orrery-bronze'),
  R('machine.the-assay-cage', 'requires', 'material.clearcast-glass', 'case plate for a sealed balance'),
  R('machine.the-assay-cage', 'requires', 'material.blackfall-button', 'the nine deliberate flaws are cut with button gravers'),
  R('machine.the-oxblood-hoists', 'requires', 'material.stairwire', 'condemned at the first broken wire'),
  R('machine.the-strand-loom', 'requires', 'material.blister-bar', 'drawn to coil on the Meridian benches'),
  R('machine.the-strand-loom', 'requires', 'material.mirelac', 'hot bath at the serving stage'),
  R('machine.the-pitchworks', 'requires', 'material.blackbole-timber', 'stump and root plate, useless as timber'),
  R('machine.the-limb-press', 'requires', 'material.blackbole-timber'),
  R('machine.the-limb-press', 'requires', 'material.mirelac'),
  R('machine.the-limb-press', 'requires', 'material.blister-bar', 'windlass, pawl and gallery fittings'),
  R('machine.the-limb-press', 'requires', 'material.stairwire', 'string and stays for a redoubt engine'),
  R('machine.the-mirror-ducts', 'requires', 'material.sunwell-mica', 'cleaved at the face, silvered above ground'),
  R('machine.the-fen-damp-taps', 'requires', 'material.glasscane', 'bell standpipes'),
  R('machine.the-fen-damp-taps', 'requires', 'material.mirelac', 'bladder seams'),
  R('machine.the-sluice-hammers', 'requires', 'material.mire-bloom', 'rafted up from the Bloom Cuts'),
  R('machine.the-sluice-hammers', 'requires', 'material.scaldstone', 'roasted upriver, and never mixed into the same bar'),
  R('machine.the-ward-kilns', 'requires', 'material.ward-chalk', 'marl bought years forward off the Anvil Shelf'),

  /* --- Skills ------------------------------------------------------ */
  R('machine.the-sieve-cascade', 'requires', 'skill.sieve-tuning', 'mesh, slope and feed rate'),
  R('machine.the-bittern-ladder', 'requires', 'skill.heat-reading'),
  R('machine.the-verdigris-hearth', 'requires', 'skill.heat-reading', 'colour judged through smoked glass'),
  R('machine.the-drawbench-vaults', 'requires', 'skill.pressure-fitting'),
  R('machine.the-drawbench-vaults', 'requires', 'skill.proof-marking', 'the mark carries the bench-master\'s liability'),
  R('machine.the-frit-kiln', 'requires', 'skill.heat-reading'),
  R('machine.the-tally-engine', 'requires', 'skill.ledger-hand'),
  R('machine.the-assay-cage', 'requires', 'skill.proof-marking'),
  R('machine.the-oxblood-hoists', 'requires', 'skill.cable-and-drum'),
  R('machine.the-strand-loom', 'requires', 'skill.lattice-work', 'the shortest-lived profession above the lip'),
  R('machine.the-char-retorts', 'requires', 'skill.bench-sense'),
  R('machine.the-pitchworks', 'requires', 'skill.heat-reading'),
  R('machine.the-limb-press', 'requires', 'skill.bench-sense', 'a cold glue line is invisible'),
  R('machine.the-mirror-ducts', 'requires', 'skill.mirror-cutting', 'one degree of error is a dead gallery'),
  R('machine.the-fen-damp-taps', 'requires', 'skill.marsh-footing'),
  R('machine.the-sluice-hammers', 'requires', 'skill.bench-sense'),
  R('machine.the-ward-kilns', 'requires', 'skill.chalk-hand'),
  R('machine.the-ward-kilns', 'requires', 'skill.toll-sense', 'the dose plate is the only honest instrument on the row'),

  /* --- Outputs ----------------------------------------------------- */
  R('machine.the-sieve-cascade', 'produces', 'material.blackfall-sand', 'the heavy fraction off decks one to four'),
  R('machine.the-sieve-cascade', 'produces', 'material.pan-nitre', 'six stamped cuts'),
  R('machine.the-sieve-cascade', 'produces', 'item.pale-dust', 'the ninth mesh, and not on any tariff schedule'),
  R('machine.the-bittern-ladder', 'produces', 'item.nitre-cask', 'drawn at pan two under blasting licence'),
  R('machine.the-verdigris-hearth', 'produces', 'material.orrery-bronze', 'chill-cast, then eighteen months standing'),
  R('machine.the-drawbench-vaults', 'produces', 'item.governor-spring', 'the continent\'s bottleneck component'),
  R('machine.the-drawbench-vaults', 'produces', 'item.sift-screen', 'and they go straight back to the Pans to be worn out'),
  R('machine.the-frit-kiln', 'produces', 'material.clearcast-glass', 'the rim of the disc, never the bullseye'),
  R('machine.the-assay-cage', 'produces', 'item.assayers-tray', 'the card book, not the tray'),
  R('machine.the-tally-engine', 'produces', 'item.stair-writ', 'about 600 issued a day'),
  R('machine.the-strand-loom', 'produces', 'material.stairwire', 'unspliced, thirty a year'),
  R('machine.the-pitchworks', 'produces', 'item.bastion-jack', 'riveted up from cured offcut beside the retorts'),
  R('machine.the-limb-press', 'produces', 'item.palisade-arbalest', 're-issued on death'),
  R('machine.the-limb-press', 'produces', 'item.gallery-lath'),
  R('machine.the-mirror-ducts', 'produces', 'item.sunwell-mirror', 'cut down from condemned duct leaves'),
  R('machine.the-sluice-hammers', 'produces', 'material.blister-bar', 'stamped merchant bar, honoured as far as the Ascent'),
  R('machine.the-sluice-hammers', 'produces', 'item.weirhook'),
  R('machine.the-sluice-hammers', 'produces', 'item.moor-stake', 'heads beaten here, cut in the delta'),
  R('machine.the-ward-kilns', 'produces', 'material.ward-chalk', 'numbered, stamped and entered stick by stick'),
  R('machine.the-ward-kilns', 'produces', 'item.ward-pin'),
  R('machine.the-ward-kilns', 'produces', 'item.chalked-harness'),

  /* --- Recipes to machines ----------------------------------------- */
  R('recipe.pan-crust-sorting', 'crafted_at', 'machine.the-sieve-cascade'),
  R('recipe.brine-clarification', 'crafted_at', 'machine.the-bittern-ladder'),
  R('recipe.brass-billet-casting', 'crafted_at', 'machine.the-verdigris-hearth'),
  R('recipe.drawn-wire-and-tube', 'crafted_at', 'machine.the-drawbench-vaults'),
  R('recipe.crown-glass-blanks', 'crafted_at', 'machine.the-frit-kiln'),
  R('recipe.sealed-assay-balance', 'crafted_at', 'machine.the-assay-cage'),
  R('recipe.bonded-tally-card', 'crafted_at', 'machine.the-tally-engine'),
  R('recipe.laid-lattice-cable', 'crafted_at', 'machine.the-strand-loom'),
  R('recipe.bone-char-firing', 'crafted_at', 'machine.the-char-retorts'),
  R('recipe.stumpwood-distillation', 'crafted_at', 'machine.the-pitchworks'),
  R('recipe.pitch-laminated-limb', 'crafted_at', 'machine.the-limb-press'),
  R('recipe.redoubt-ballista', 'crafted_at', 'machine.the-limb-press'),
  R('recipe.hammered-bar-iron', 'crafted_at', 'machine.the-sluice-hammers'),
  R('recipe.ward-chalk-burning', 'crafted_at', 'machine.the-ward-kilns'),
  R('recipe.duct-mirror-resilvering', 'crafted_at', 'machine.the-mirror-ducts'),
  R('recipe.lamp-gas-bladders', 'crafted_at', 'machine.the-fen-damp-taps'),

  /* --- Chain order ------------------------------------------------- */
  R('recipe.brine-clarification', 'follows', 'recipe.pan-crust-sorting', 'the liquor off the ninth mesh'),
  R('recipe.brine-clarification', 'follows', 'recipe.bone-char-firing', 'the char bed at the head of the ladder'),
  R('recipe.brass-billet-casting', 'follows', 'recipe.pan-crust-sorting', 'sorted concentrate west'),
  R('recipe.brass-billet-casting', 'follows', 'recipe.stumpwood-distillation', 'charcoal across the continent'),
  R('recipe.crown-glass-blanks', 'follows', 'recipe.brine-clarification', 'soda ash off pans four and five'),
  R('recipe.crown-glass-blanks', 'follows', 'recipe.pan-crust-sorting', 'silica sand off the dry decks'),
  R('recipe.drawn-wire-and-tube', 'follows', 'recipe.brass-billet-casting'),
  R('recipe.drawn-wire-and-tube', 'follows', 'recipe.hammered-bar-iron', 'Weir bar up the coast'),
  R('recipe.laid-lattice-cable', 'follows', 'recipe.drawn-wire-and-tube', 'coil wire, eleven days by lift and barge'),
  R('recipe.sealed-assay-balance', 'follows', 'recipe.drawn-wire-and-tube', 'drawn brass tube for the beam'),
  R('recipe.sealed-assay-balance', 'follows', 'recipe.crown-glass-blanks', 'case plate'),
  R('recipe.pitch-laminated-limb', 'follows', 'recipe.stumpwood-distillation', 'pitch at working heat'),
  R('recipe.redoubt-ballista', 'follows', 'recipe.pitch-laminated-limb'),
  R('recipe.redoubt-ballista', 'follows', 'recipe.laid-lattice-cable', 'string and stays'),

  /* --- Machine to machine ------------------------------------------ */
  R('machine.the-sieve-cascade', 'requires', 'machine.the-drawbench-vaults', 'screens drawn on the Meridian benches'),
  R('machine.the-bittern-ladder', 'requires', 'machine.the-char-retorts', 'bone char, by the barge, remarked on by nobody'),
  R('machine.the-verdigris-hearth', 'requires', 'machine.the-pitchworks', 'a Greatwood blockade stops the smelt in eleven days'),
  R('machine.the-frit-kiln', 'requires', 'machine.the-bittern-ladder', 'soda ash, white or the pot is wasted'),
  R('machine.the-assay-cage', 'requires', 'machine.the-frit-kiln', 'case glass'),
  R('machine.the-assay-cage', 'requires', 'machine.the-verdigris-hearth', 'aged bronze for the beam'),
  R('machine.the-drawbench-vaults', 'requires', 'machine.the-sluice-hammers', 'bar iron up the Long Water'),
  R('machine.the-strand-loom', 'requires', 'machine.the-drawbench-vaults', 'one chipped die is one dead cable'),
  R('machine.the-oxblood-hoists', 'requires', 'machine.the-strand-loom', 'condemned rope has a second market on the lower terraces'),
  R('machine.the-limb-press', 'requires', 'machine.the-strand-loom', 'twelve months of cable in store, and the figure is a state secret'),
  R('machine.the-limb-press', 'requires', 'machine.the-sluice-hammers', 'windlass, pawl and fittings'),
  R('machine.the-limb-press', 'requires', 'machine.the-pitchworks', 'pitch at working heat, from the next yard'),

  /* --- Who holds them ---------------------------------------------- */
  R('faction.pale-assay', 'controls', 'machine.the-sieve-cascade', 'the stamp, not the salt'),
  R('faction.pale-assay', 'controls', 'machine.the-bittern-ladder'),
  R('faction.conduit-college', 'controls', 'machine.the-drawbench-vaults', 'die rack under separate key'),
  R('faction.conduit-college', 'controls', 'machine.the-frit-kiln'),
  R('faction.conduit-college', 'controls', 'machine.the-verdigris-hearth', 'arch-setters licensed separately from smelters'),
  R('faction.concord-of-weights', 'controls', 'machine.the-tally-engine'),
  R('faction.concord-of-weights', 'controls', 'machine.the-assay-cage', 'two assayers, one room, no witness'),
  R('faction.concord-of-weights', 'controls', 'machine.the-oxblood-hoists', 'through the hoist consortium and the inspection book'),
  R('faction.mooring-assize', 'controls', 'machine.the-strand-loom', 'nothing rises unpriced, including cable'),
  R('faction.red-writ', 'controls', 'machine.the-char-retorts', 'through the Rendering Book and the claim clerk'),
  R('faction.pitchguard', 'controls', 'machine.the-pitchworks'),
  R('faction.pitchguard', 'controls', 'machine.the-limb-press', 'and the twelve-month cable store'),
  R('faction.mirror-assembly', 'controls', 'machine.the-mirror-ducts', 'lumen-hours issued on inherited shares'),
  R('faction.moorstone-compact', 'controls', 'machine.the-fen-damp-taps', 'by the lot draw rather than by the barge'),
  R('faction.iron-sluice-company', 'controls', 'machine.the-sluice-hammers', 'the die is under Company seal'),
  R('faction.fetterhouse', 'controls', 'machine.the-ward-kilns', 'the licence roll is a rota of who burns next'),
  R('faction.standing-hour', 'contests', 'machine.the-oxblood-hoists', 'founded over nine to fourteen deaths a year'),
  R('faction.standing-hour', 'contests', 'machine.the-frit-kiln', 'the one kiln in the city that cannot be struck'),
  R('faction.low-tally', 'smuggles_with', 'machine.the-ward-kilns', 'unnumbered sticks at eleven times the price', true),
  R('faction.bondwrights-hall', 'related_to', 'machine.the-char-retorts', 'lobbies to keep machinery dear so bodies stay the cheaper engine'),

  /* --- Mechanics --------------------------------------------------- */
  R('machine.the-sieve-cascade', 'related_to', 'mechanic.the-sift-line', 'the extraction loop, tower by tower'),
  R('machine.the-bittern-ladder', 'related_to', 'mechanic.the-sift-line'),
  R('machine.the-drawbench-vaults', 'related_to', 'mechanic.conduit-hours', 'a missed slot is a scrapped batch and a bill'),
  R('machine.the-frit-kiln', 'related_to', 'mechanic.conduit-hours'),
  R('machine.the-tally-engine', 'related_to', 'mechanic.standing-ledger', 'the clearing rate is a physical pin'),
  R('machine.the-assay-cage', 'related_to', 'mechanic.standing-ledger'),
  R('machine.the-oxblood-hoists', 'related_to', 'mechanic.standing-ledger', 'credit standing is how high you can afford to live'),
  R('machine.the-strand-loom', 'related_to', 'mechanic.mass-warrant', 'a second walk is several hundred tonnes nobody wants to sign for'),
  R('machine.the-char-retorts', 'related_to', 'mechanic.ring-bond', 'the last office in the conversion treaty'),
  R('machine.the-limb-press', 'related_to', 'mechanic.severance-drill', 'the crews who build the spans and the crews ordered to cut them'),
  R('machine.the-mirror-ducts', 'related_to', 'mechanic.the-mirror-rota', 'the array is the mint'),
  R('machine.the-fen-damp-taps', 'related_to', 'mechanic.the-remoor', 'no gas field is held for long'),
  R('machine.the-sluice-hammers', 'related_to', 'mechanic.the-sluice-book', 'one gradient sells the toll and makes the iron'),
  R('machine.the-ward-kilns', 'related_to', 'mechanic.ward-load'),
  R('machine.the-ward-kilns', 'related_to', 'mechanic.the-toll', 'standing in the gradient accrues whether you work or not'),

  /* --- People ------------------------------------------------------ */
  R('machine.the-oxblood-hoists', 'used_by', 'npc.brask-vellmar', 'his signature is what permits loading'),
  R('machine.the-oxblood-hoists', 'used_by', 'npc.doret-halvane', 'a cable inspection is her cover and her key ring'),
  R('machine.the-tally-engine', 'used_by', 'npc.wessel-ondriek', 'sets the rate pin every ninth morning'),
  R('machine.the-assay-cage', 'used_by', 'npc.ilke-samarost', 'her last audit was weighed in this room'),
  R('machine.the-sieve-cascade', 'used_by', 'npc.tazrit-nourem', 'three towers, and the debt of a third of the pan crews'),
  R('machine.the-sieve-cascade', 'used_by', 'npc.sahat-belek', 'sells what the far white gives up, and is paid on grade'),
  R('machine.the-char-retorts', 'used_by', 'npc.sukhet-daral', 'the flues run past his pens and something is in the sumps'),
  R('machine.the-char-retorts', 'used_by', 'npc.berke-chagra', 'holds paper on the stewards who keep the Rendering Book'),
  R('machine.the-mirror-ducts', 'used_by', 'npc.iratze-zubiate', 'two hundred mirrors kept true by hand'),
  R('machine.the-mirror-ducts', 'used_by', 'npc.ossane-gorbea', 'issues the hours the array makes possible'),
  R('machine.the-sluice-hammers', 'used_by', 'npc.ost-vennick', 'the race and the gates answer to one book'),
  R('machine.the-sluice-hammers', 'used_by', 'npc.dagren-hoyle', 'moves bar the toll book never sees'),
  R('machine.the-ward-kilns', 'used_by', 'npc.toval-cherek', 'draws chain links off the same fire, and has been shorting the alloy'),
  R('machine.the-ward-kilns', 'used_by', 'npc.halvo-sarn', 'every licensed working crosses his desk, including a burn'),
  R('machine.the-drawbench-vaults', 'used_by', 'npc.melitta-aspri', 'the Orrery\'s own gearing is cut from tube pulled here'),
  R('machine.the-fen-damp-taps', 'used_by', 'npc.sabbe-sixteen-knot', 'her word decides where the fleet proves new mud'),
  R('machine.the-strand-loom', 'used_by', 'npc.cesille-vaudry', 'cable is the third rent and the only honest one'),
  R('machine.the-strand-loom', 'used_by', 'npc.perrine-orlaunt', 'the walk is the one route down that is never manifested'),

  /* --- Quests ------------------------------------------------------ */
  R('quest.pan-fever', 'involves', 'machine.the-sieve-cascade', 'the fraction that pays best is the one the crews keep breathing'),
  R('quest.pan-fever', 'involves', 'recipe.pan-crust-sorting'),
  R('quest.the-chalk-that-lies', 'involves', 'machine.the-ward-kilns', 'the batch either came from here or passed through'),
  R('quest.the-chalk-that-lies', 'involves', 'recipe.ward-chalk-burning', 'fired outside the gradient window'),
  R('quest.who-gets-the-light', 'involves', 'machine.the-mirror-ducts', 'the allocation the array makes possible'),
  R('quest.who-gets-the-light', 'involves', 'recipe.duct-mirror-resilvering'),
  R('quest.short-weight', 'involves', 'machine.the-assay-cage', 'weighs true here and false at the door'),
  R('quest.the-master-weight', 'involves', 'machine.the-assay-cage', 'the mark is the reference itself'),
  R('quest.the-master-weight', 'involves', 'recipe.sealed-assay-balance', 'every sealed copy issued since becomes contestable'),
  R('quest.the-ullage-run', 'involves', 'machine.the-sluice-hammers', 'the tide that moves the barrels also drives the race'),
  R('quest.clean-bills', 'affects', 'machine.the-sluice-hammers', 'a closed gate stops the hammers as well as the fever'),
  R('quest.the-felling-order', 'affects', 'machine.the-pitchworks', 'an infested quarter is eleven days of retort charge'),
  R('quest.four-minutes-fast', 'involves', 'machine.the-drawbench-vaults', 'harbour slots and conduit slots are priced off the same tables'),
  R('quest.the-scar-concession', 'involves', 'machine.the-ward-kilns', 'whoever holds the concession prices every stick on the row'),
  R('quest.slackwater-rights', 'affects', 'machine.the-fen-damp-taps', 'a berth ruling moves eleven barges off proved mud'),

  /* --- Cities and regions ------------------------------------------ */
  R(CITY.siftingCity, 'contains', 'machine.the-sieve-cascade'),
  R(CITY.siftingCity, 'contains', 'machine.the-bittern-ladder'),
  R(CITY.mediterranean, 'contains', 'machine.the-drawbench-vaults'),
  R(CITY.gildedAscent, 'contains', 'machine.the-assay-cage'),
  R(CITY.skyCity, 'contains', 'machine.the-strand-loom'),
  R(CITY.arenaCity, 'contains', 'machine.the-char-retorts'),
  R(CITY.siftingCity, 'trades_with', CITY.arenaCity, 'bone char east, on every manifest and remarked on by nobody'),
  R(CITY.blackWeir, 'trades_with', CITY.mediterranean, 'stamped merchant bar for the drawbenches'),
  R(CITY.skyCity, 'trades_with', CITY.treeCity, 'laid cable for redoubt engines'),
  R(CITY.treeCity, 'trades_with', CITY.mediterranean, 'hard charcoal for the Verdigris Hearth'),
  R(CITY.caveAgrarian, 'owes_debt_to', CITY.mediterranean, 'quicksilver and tin for the resilvering round'),
  R(CITY.magicCity, 'owes_debt_to', CITY.skyCity, 'ward marl bought years forward, which is a debt as much as a purchase'),
  R('machine.the-verdigris-hearth', 'consumes', 'material.blackbole-timber', 'as charcoal, and it crosses the continent to get here'),
  R('machine.the-frit-kiln', 'consumes', 'material.pan-nitre', 'one adulterated barrel spoils a month of casting'),
  R('machine.the-char-retorts', 'affects', REGION.ashenSteppe, 'bone ash sold to the herders below the cost of the sacks'),
  R('machine.the-sieve-cascade', 'affects', 'district.sifting-city-the-lee', 'the fines settle downwind and the rent is cheapest there'),
  R('machine.the-bittern-ladder', 'affects', 'district.sifting-city-the-lee', 'four tonnes of bittern a month, dumped uphill of it'),
  R('machine.the-mirror-ducts', 'affects', 'district.cave-agrarian-city-deep-rota', 'two galleries dark for over a year and not reported'),
  R('machine.the-pitchworks', 'affects', 'district.tree-city-underroot', 'ground-level smoke under a canopy that does not clear'),
  R('machine.the-oxblood-hoists', 'affects', 'district.gilded-ascent-counting-terrace', 'a shutdown starves the upper terraces of grain in three days'),

  /* --- Creatures --------------------------------------------------- */
  R('creature.ledger-moth', 'affects', 'machine.the-tally-engine', 'a jar in the card store is how a debt stops having existed'),
  R('creature.chalk-louse', 'affects', 'machine.the-ward-kilns', 'a cake store two weeks in can be hollow'),
  R('creature.raftbloom', 'related_to', 'machine.the-fen-damp-taps', 'rotting mat is the gas ground and the fever ground both'),
  R('creature.salt-mason', 'related_to', 'machine.the-sieve-cascade', 'a dead colony is the richest crust in the Pans'),
  R('creature.loftwrack', 'related_to', 'machine.the-strand-loom', 'lift-bladder membrane for the loom\'s own hoists'),
]
