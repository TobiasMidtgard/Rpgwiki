/**
 * Materials and deposits.
 *
 * The supply side of the world. Twenty-two materials and the twelve named
 * ground they come out of, written so that a designer can trace any finished
 * object back to a hole, a moult season or a vat, and find a person being
 * worked to death somewhere in the middle of it.
 *
 * Two things are load-bearing here and both are proposals:
 *
 *   1. The iron chain. Ore out of the Ironback and bog iron out of the Drown
 *      both arrive at the Black Weir hammers, are cemented in Greatwood
 *      charcoal into blister bar, and are drawn and laid into stairwire. Four
 *      settlements, none of which can complete the chain alone.
 *   2. The white chain. Raw pan crust splits at the Sieve Cascade into nitre,
 *      silica and a heavy fraction; the nitre fluxes the coast's optical glass
 *      and seeds the Magic City's salt vats; the heavy fraction is the coast's
 *      copper feed. The Sifting City's grading fraud is therefore an optical
 *      problem, a magical problem and a metallurgical problem at once.
 *
 * Origin classification is spanned deliberately: Natural, Synthetic,
 * Biological, Hybrid and Anomalous all appear, and the Hybrid entries are
 * where the biology does the work the geology cannot.
 */

import { E, R, TBD, type SeedEntity, type SeedRelation } from './kit'
import { CITY, PROPOSAL, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* Materials — the white chain, out of the White Pans                  */
/* ------------------------------------------------------------------ */

export const entities: SeedEntity[] = [
  E({
    id: 'material.pan-nitre',
    type: 'material',
    name: 'Pan Nitre',
    status: 'draft',
    summary: 'Bitter white salt raked off the White Pans: glass flux, cave fertiliser and blasting charge in the same barrel.',
    tags: ['salt', 'flux', 'agriculture', 'explosive', 'graded'],
    fields: {
      overview:
        'The crust that rebuilds across [[deposit.nitre-flats|the Nitre Flats]] after every wet season, raked wet, dried on boards and screened down [[machine.the-sieve-cascade|the Sieve Cascade]] into six cuts. It is three commodities wearing one name. The coarse cuts go out as fertiliser and blasting stock; the fifth is bought by soap and glass houses; the sixth, the fraction that rides the last mesh, fluxes [[material.clearcast-glass|clearcast glass]] and cannot be substituted.\n\nWhat a buyer actually purchases is the stamp. [[faction.pale-assay|The Pale Assay]] grades every barrel before it may leave the Pans, and a barrel of fourth cut with a sixth-cut stamp on the head is worth eleven times what is inside it. That is the single most profitable forgery on the continent and the reason [[city.mediterranean-city|the Mediterranean City]] has started assaying on arrival rather than trusting the head.',
      origin: 'Natural',
      sourceRegion: [REGION.whitePans],
      rarity: 'Abundant',
      properties: [
        'Deliquescent: an open barrel gains weight in a wet season, which is how short-weight fraud is hidden',
        'Lowers the melting point of silica by roughly 300 degrees, and the sixth cut does it without colouring the melt',
        'Nitrogen-bearing; a hundredweight will carry a karst gallery terrace for a season',
        'Detonates when mixed with charcoal and sulphur at a stated grain, which is why the cask trade is licensed',
        'Bitter enough that crews can taste the grade, and do, and lose the taste inside four years',
      ],
      composition: 'Mixed nitrates and sulphates with a variable iron content; the six cuts are an iron ladder, not a purity ladder',
      appearance: 'Dull white in the coarse cuts, going glassy and faintly blue-grey at the sixth',
      extraction:
        'Raked by pan crews working eight-day rotations out from the tower line, in linen wraps against the glare, on a water ration issued against debt. The crust is broken with a long-handled rake, heaped, barrowed to the drying boards and turned twice. A crew of nine will lift about four tonnes of wet crust a day.\n\nThe hazards are the water, the light and the crust itself. Live [[creature.salt-mason|salt mason]] crust gives way under a standing crew and the towers it builds are hollow; every experienced boss can tell live from dead by sound, and every season somebody cannot. Crews are paid partly in draw, so chasing the sixth cut, which needs forty extra casks of wash, means a season of drinking less. That is the mechanic and it is not a metaphor.',
      refinement:
        'Nine licensed towers feed dried crust into the wind-driven screens of the Sieve Cascade. Nine graded meshes, each pass costing water; the concentrate and silica sand drop out early and the salt liquor runs down to [[machine.the-bittern-ladder|the Bittern Ladder]], where it is filtered through imported bone char and laddered into soda ash, table salt and bittern. The cascades shut down entirely in a calm, costing the city about thirty working days a year.\n\nGrading happens last, in eleven halls on [[district.sifting-city-assay-row|Assay Row]], and grading is where the money is. A tower-master who can move a hundred barrels one cut upward has earned more than his crews will earn in their lives.',
      machines: ['machine.the-sieve-cascade', 'machine.the-bittern-ladder'],
      uses: [
        'Flux for optical and crown glass; the sixth cut only',
        'Nitrogen fertiliser for the mirror-lit terraces of [[city.cave-agrarian-city|the Cave Agrarian City]]',
        'Blasting charge, made up into licensed [[item.nitre-cask|nitre casks]] for gallery cutting',
        'Propellant stock for [[skill.charge-blending|charge blending]] and everything downstream of it',
        'Curing and preserving; the fourth cut is what keeps meat across the waste',
        'Adulterant and carrier in the Magic City salt vats, which is contested',
      ],
      tradeValue: '2 day-wages the barrel at fourth cut, 22 at sixth, and the difference is a stamp',
      tradeNotes:
        'Everything about this trade is downstream of the fact that the crust is free and the water is not. [[city.sifting-city|The Sifting City]] cannot stop selling because the bore programme was financed against forward crust out of the Ascent Basin. The coast cannot buy elsewhere because nothing else fluxes clean. That is a hostage arrangement in both directions and it has twice nearly become a war over a grading fraud that everybody involved knows the size of.',
      devNotes:
        PROPOSAL('The six-cut ladder, the deliquescence fraud and the water-against-draw pay structure are proposed. The load-bearing invention is that grade is an iron ladder rather than a purity ladder, which makes the sixth cut physically irreplaceable and the stamp worth forging.') +
        '\n\nDesign hook: pan nitre is the single most connected material in the world. It touches [[quest.pan-fever|Pan Fever]], [[quest.the-casting-voice|The Casting Voice]], the cave city terraces and, by the salt-vat proposal below, the Magic City. Break its supply and four cities notice inside a season.',
    },
  }),

  E({
    id: 'material.blackfall-sand',
    type: 'material',
    name: 'Blackfall Sand',
    status: 'draft',
    summary: 'Heavy iron-black sand banked in the pans\' lee, and the only known ore of Blackfall Button.',
    tags: ['ore', 'sand', 'biogenic', 'indenture'],
    fields: {
      overview:
        'Wind has spent centuries sorting the heaviest fraction of the pans out of the salt and banking it hard against the lee faces of [[deposit.blackfall-drifts|the Drifts]]. It is worthless as a bulk mineral and priceless as a feedstock: reduced in a banked crucible it gives [[material.blackfall-button|Blackfall Button]], and nothing else on the continent does.\n\nThe proposed reason it exists at all is biological. [[creature.salt-mason|Salt masons]] cement brine crust into towers and concentrate metal salts as they go; when a colony dies the tower crumbles and the wind does the rest. The Drifts are, in other words, several thousand years of dead worms sorted by weight.',
      origin: 'Hybrid',
      sourceRegion: [REGION.whitePans],
      sourceCreature: ['creature.salt-mason'],
      rarity: 'Scarce',
      properties: [
        'Roughly four times the density of pan crust, which is why the wind can sort it at all',
        'Magnetic in part, and the magnetic fraction is the poor one',
        'Refractory to a degree that makes it useless in an ordinary bloomery',
        'Abrasive enough to eat a leather glove in a shift; pickers work bare-handed and lose fingerprints',
      ],
      composition: 'Iron oxides with tungsten and manganese in the heavy fraction; the useful metal is a minority of the mass',
      appearance: 'Iron-black, sharp to the touch, banded in horizontal stripes you can read like a section drawing',
      extraction:
        'Hand-picked off the drift faces by indentured crews on the tower rolls, working the north face in the morning and the east face after noon so as never to face the glare. A picker fills a hide bag, walks it to the sledge line and is tallied by the bag. Roughly six thousand four hundred people in [[city.sifting-city|the Sifting City]] are on those rolls and are not counted as residents.\n\nThe drift faces slump. They slump most in the hour after a wet-season shower, which is also the only hour the work is bearable, and the crew bosses know both facts.',
      refinement:
        'Three licensed sheds in [[district.sifting-city-the-crucible-sheds|the Crucible Sheds]], four banked crucibles each, and no more sheds ever. Sand is packed with pressed dung-and-tar cake and imported charcoal and held at heat for eleven days, at the end of which a shed yields buttons totalling perhaps two kilograms. The licences have passed by inheritance since they were first issued and have never been sold.',
      machines: ['machine.the-sieve-cascade'],
      uses: [
        'Sole feedstock for [[material.blackfall-button|Blackfall Button]]',
        'Foundry parting sand where nothing else will take the heat',
        'Abrasive for lens grinding, sold to the coast by the small cask',
      ],
      tradeValue: '1 day-wage the bag at the drift, 9 at the shed door; the walk is the whole margin',
      tradeNotes:
        'Never exported raw in any quantity, because the three sheds can only eat so much and nobody outside the Pans can reduce it. The Sifting City has kept the reduction secret by the simple expedient of never letting the sheds grow.',
      devNotes:
        PROPOSAL('The salt mason origin is proposed and reconciles two existing entries: the Sifting City creature notes already say a dead mason colony is the richest sift in the Pans, and the city history already says the wind sorted the iron-black sand. This entry joins them.') +
        '\n\nOpen to the bestiary author: if salt masons are not the source, the Drifts need another explanation for why one small stretch of desert holds the continent\'s only tungsten.',
    },
  }),

  E({
    id: 'material.blackfall-button',
    type: 'material',
    name: 'Blackfall Button',
    status: 'draft',
    summary: 'Thumb-sized buttons of grey metal too stubborn to melt; every wire-drawing die on the continent starts here.',
    tags: ['metal', 'component', 'monopoly', 'tooling'],
    fields: {
      overview:
        'A button is about eleven days of shed fuel and weighs roughly fifty grams. It cannot be cast, cannot be forged hot without cracking, and will hold an edge or a bore long after anything else has gone. Its two uses are cutting edges welded onto ordinary steel bodies and, far more importantly, the graded dies through which [[material.stairwire|stairwire]] and every drawn spring on the continent are pulled.\n\nThat second use is the whole political fact. Dies are rented by the shift and returned worn, and are never sold. Whoever holds the dies holds the wire trade, and the wire trade holds [[city.sky-city|the Sky City]] off the ground.',
      origin: 'Synthetic',
      sourceRegion: [REGION.whitePans],
      rarity: 'Rare',
      properties: [
        'Will not melt in any furnace the world has; worked by grinding and by diffusion welding only',
        'Holds a drawing bore to within a hair over about four hundred kilometres of wire',
        'Brittle in shear: a dropped button chips, and a chipped die scores every metre it draws',
        'So dense that a shipment of forty rides in a box a man can carry and is worth a warehouse',
      ],
      composition: 'A tungsten-iron carbide with manganese; nobody in the sheds could name any of that and they do not need to',
      appearance: 'Dull grey, slightly domed, with a frosted fracture face where it was broken out of the crucible',
      extraction: 'Not extracted. Reduced from [[material.blackfall-sand|Blackfall Sand]] in the three licensed sheds, and made nowhere else.',
      refinement:
        'The buttons come out of the crucible in a slag cake and are broken free with a hammer, which loses about one in nine. Grinding to a die blank is done wet on a treadle wheel by two men, one grinding and one pouring, and the die room at the western end of [[district.sifting-city-assay-row|Assay Row]] holds the only bore gauges anyone trusts. A finished die is stamped, numbered and entered in a rental book. Losing one is prosecuted as theft of the book entry, not of the metal, which tells you what the Bench thinks it is selling.',
      machines: TBD('The three crucible sheds have no machine entry yet. Do they warrant one, given they are the choke point of the entire wire economy?'),
      uses: [
        'Wire-drawing dies, rented by the shift at [[machine.the-drawbench-vaults|the Drawbench Vaults]] and in the Sifting City wire looms',
        'Cutting edges diffusion-welded onto [[material.blister-bar|blister bar]] tool bodies',
        'Bore gauges and reference plugs for the assay trade',
        'Die stock for [[item.governor-spring|governor springs]], which is why the coast imports it at all',
      ],
      tradeValue: '340 day-wages the button; a rented die is 6 a shift and the shift is watched',
      tradeNotes:
        'Not a commodity so much as a lease. [[city.mediterranean-city|The Mediterranean City]] imports buttons and pretends it is buying metal; it is buying the right to keep drawing. The Conduit College has funded two attempts to reduce Blackfall sand on the coast, both of which failed for reasons the sheds could have explained and did not.',
      devNotes:
        PROPOSAL('The rental model, the die room and the eleven-day fuel cost are proposed. The design intent is a strategic bottleneck that is small, portable and physically unreproducible, so that stealing dies is a plausible campaign objective rather than a shopping trip.') +
        '\n\nGate on recipes: any recipe producing drawn wire, tube or spring stock should require a die and consume die life, so that the Sifting City sits upstream of the coast without ever appearing in the recipe.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The iron chain                                                    */
  /* ---------------------------------------------------------------- */

  E({
    id: 'material.scaldstone',
    type: 'material',
    name: 'Scaldstone',
    status: 'draft',
    summary: 'Sulphurous iron ore out of the Ironback: rich, shallow, cheap, and useless until it has been roasted.',
    tags: ['ore', 'iron', 'sulphur', 'lung-rot'],
    fields: {
      overview:
        'Shallow lodes along the southern flank of [[region.ironback-range|the Ironback Range]], worked out of adits a man can walk into upright. The ore is good and the sulphur in it is ruinous: put it straight into a furnace and you get iron that crumbles under the hammer. It has to be roasted first, in open heaps, for between nine and fourteen days.\n\nThe adits are worth very little. The roast yards downwind of them are worth everything, and they are the part nobody has ever chartered.',
      origin: 'Natural',
      sourceRegion: [REGION.ironback],
      rarity: 'Abundant',
      properties: [
        'Roughly half iron by weight before roasting, and rather more after',
        'Sulphur content high enough that unroasted ore ruins a whole furnace charge',
        'Weathers to a yellow crust in a wet spring, which is how prospectors find a lode from a ridge away',
        'Roast fume kills grazing within four hundred paces downwind, permanently',
      ],
      composition: 'Iron sulphides with a carbonate gangue; the yellow crust is what oxidises out of it',
      appearance: 'Brassy where fresh, sulphur-yellow where weathered, and it stinks when wet',
      extraction:
        'Adit mining with hand tools and licensed [[item.nitre-cask|nitre casks]] for the harder faces. The lodes are shallow enough that this is unskilled work, which is exactly the problem: it is done by debt gangs walked up from the basin on a season contract that quietly does not cover the walk back. The range kills a predictable number every winter and the yards do not stop for it.\n\n[[creature.slagbuck|Slagbuck]] herds drink the metal-rich seeps along the flank, and a herd range read carefully is a free ore survey. Prospectors who can read one are worth more than the crews they replace.',
      refinement:
        'Roasting is the whole trade. Ore is heaped over brushwood on the yard floor, fired, and turned by hand for nine to fourteen days while the sulphur burns off as fume. The turners work in the fume with wet cloth over the face and develop the yard cough inside two seasons and the yard lung inside five. Roasted ore is barrowed to the smelt hearths, blown to bloom, and the bloom goes downriver to the hammers.\n\nNobody has ever proposed a covered roast, because a covered roast costs money and the turners cost nothing.',
      machines: TBD('Is there a machine entry for the roast yards, or are they deliberately pre-industrial in a world that has trip hammers ninety leagues downriver?'),
      uses: [
        'Bloom iron for [[material.blister-bar|blister bar]] and every bar of merchant iron in the basin',
        'Sulphur, collected as a by-product where a yard can be bothered, and sold to the coast',
        'Roasted fines as a pigment; the ochre in the Sifting City tower bands is Ironback fines',
      ],
      tradeValue: 'Under a day-wage the tonne at the adit; 4 at the yard gate, roasted',
      tradeNotes:
        'The only major deposit on the continent no faction holds. [[deposit.sour-lodes|The Sour Lodes]] have no charter, no assize and no guild, because the ore is not where the money is. Whoever finally works out that they should be buying roast yards rather than adits will own basin steel inside a decade, and no faction has done it yet.',
      devNotes:
        PROPOSAL('The roast-yard leverage and the ungoverned lodes are proposed. This is deliberately the one unclaimed strategic resource in the setting: a chartering-tier objective a player faction can actually take, since nobody is defending it.') +
        '\n\nDisease hook for the bestiary and plague authors: yard lung is an occupational disease with a five-season onset, no cure, and a clear responsible party. It pairs with [[quest.pan-fever|Pan Fever]] as the second half of a rhyming pair about industrial illness.',
    },
  }),

  E({
    id: 'material.mire-bloom',
    type: 'material',
    name: 'Mire Bloom',
    status: 'draft',
    summary: 'Bog iron that regrows in the Drown\'s cut pits within a generation; poor ore, and nobody has to dig a mountain.',
    tags: ['ore', 'iron', 'renewable', 'delta', 'toll'],
    fields: {
      overview:
        'Nodular bog iron lifted out of numbered pits across [[deposit.bloom-cuts|the Bloom Cuts]]. Assayed against [[material.scaldstone|scaldstone]] it is poor stuff: less iron, more phosphorus, and it makes bar that is cold-short and will snap on a frosty morning. Set against that, it is standing in water a barge can reach, it needs no roasting, and a pit cut clean will refill in about twenty years.\n\nThat last fact is the only genuinely renewable resource in the world, and it is the reason the delta has an economy that is not fish.',
      origin: 'Hybrid',
      sourceRegion: [REGION.theDrown],
      sourceCreature: ['creature.raftbloom'],
      rarity: 'Common',
      properties: [
        'Regenerates on a twenty-year rotation, faster in pits left under a living mat',
        'Phosphoric: cold-short bar that is fine for gates and hooks and lethal in a cable',
        'Comes up wet and must be dried on racks or it will not take a bloomery heat',
        'Low-sulphur, so it needs no roast, which is the whole reason it competes at all',
      ],
      composition: 'Hydrated iron oxides precipitated under mat, with phosphorus and a little manganese',
      appearance: 'Rust-brown lumps like burst bread, hollow in the middle as often as not',
      extraction:
        'Cut by pit crews working from punts in the four dry weeks, wading the pit floor and feeling for nodules with the feet because the water is opaque. The take is barrowed onto stilt racks and dried for a season before it is rafted. Crews work barefoot, which is how the fluke gets in, and the delta has never bothered to price that.\n\nA pit is worked once and marked with a cut stave, then left. The rotation is enforced by the numbering and by nothing else, which means enforcement is really [[faction.iron-sluice-company|the Iron Sluice Company]] deciding whose rafts get through.',
      refinement:
        'Dried nodules are rafted down to the Black Weir and beaten under the sluice-driven trip hammers of [[machine.the-sluice-hammers|the Sluice Hammers]] into merchant bar of a stamped weight. Every raft is tolled at the gates before it reaches a hammer, so the pits belong, functionally, to whoever holds the gates rather than to whoever cut them. Bar destined for anything structural is then carburised into [[material.blister-bar|blister bar]], which is the step that hides the phosphorus well enough to sell.',
      machines: ['machine.the-sluice-hammers'],
      uses: [
        'Merchant bar for gates, hooks, hoops and every [[item.weirhook|weirhook]] in the delta',
        'Feed for [[material.blister-bar|blister bar]] cementation, blended with Ironback bloom',
        'Iron-shod [[item.moor-stake|moor stakes]], which is what property means on the water',
        'Ballast and pit-prop iron for the gas fleet',
      ],
      tradeValue: '3 day-wages the tonne at the rack, 7 at the weir gate, and the toll is the difference',
      tradeNotes:
        'The delta sells ore and buys back steel at nine times the price, which is the oldest complaint on the river and a true one. Any player action that gets a bloomery working below the gates changes the delta\'s politics permanently, and [[faction.iron-sluice-company|the Sluice Company]] knows it.',
      devNotes:
        PROPOSAL('The raftbloom link is the proposal: iron precipitates fastest under a living mat, so the organism the floating settlement moors to is also the organism that makes the ore. Cutting mats for pontoons therefore slows the rotation, and the two delta economies are quietly at each other\'s throats without either side having framed it that way.') +
        '\n\nOpen to the bestiary author: if raftbloom does not drive the precipitation, the twenty-year rotation needs another mechanism, and the pontoon conflict goes away with it.',
    },
  }),

  E({
    id: 'material.blister-bar',
    type: 'material',
    name: 'Blister Bar',
    status: 'draft',
    summary: 'Cemented steel sold in blistered bars by the bundle; the standard stock every smith in the basin buys.',
    tags: ['steel', 'refined', 'charcoal', 'trade'],
    fields: {
      overview:
        'Wrought bar packed in charcoal, sealed in a chest and held at heat for nine days, by the end of which carbon has walked into the iron and the surface has risen in the blisters the stuff is named for. It is not good steel by the standards of the coast, but it is consistent, it comes in stamped weights, and every smith from the Greatwood to the Pans knows exactly what it will do.\n\nThe iron is the cheap half. The charcoal is the bottleneck, and it comes out of [[region.the-greatwood|the Greatwood]] on licence, which puts [[city.tree-city|the Tree City]] upstream of every furnace on the continent whether it wants to be or not.',
      origin: 'Synthetic',
      sourceRegion: [REGION.theDrown, REGION.greatwood],
      rarity: 'Common',
      properties: [
        'Carbon graded by bundle: hard, middling and mild, judged by fracture and never by measurement',
        'Blistered surface must be forged down before use, losing about a seventh of the mass',
        'Welds to itself readily, which is why the world builds up rather than casts',
        'Nine days at heat, and a chest opened early is a chest of scrap',
      ],
      composition: 'Bar iron with 0.5 to 1.4 per cent carbon, unevenly distributed and honest about it',
      appearance: 'Grey bar with a pocked, blistered skin; a bundle rings rather than thuds',
      extraction: 'Not extracted. Made from bloom and bar out of [[material.scaldstone|scaldstone]] and [[material.mire-bloom|mire bloom]], and from nothing else at scale.',
      refinement:
        'Cementation sheds along the lower river and at the Weir. Bar is layered with charcoal in stone chests, luted shut with clay, and fired for nine days on a fuel bill that only makes sense next to a river of rafted charcoal. Chests are opened cold. The charge is graded by breaking one bar in ten and reading the fracture, which is a skill ([[skill.heat-reading|Heat Reading]], and the good judges are famous) rather than an instrument.\n\nThe hazard is dull and constant: sheds burn. A luted chest that has cracked vents carbon monoxide into a closed shed, and shed crews are found in the morning having gone to sleep.',
      machines: ['machine.the-sluice-hammers'],
      uses: [
        'Every blade, tool, fitting and prod steel in circulation',
        'Prod steel for [[item.palisade-arbalest|palisade arbalests]] and the ballista fittings of [[city.tree-city|the Tree City]]',
        'Drawn down at [[machine.the-drawbench-vaults|the Drawbench Vaults]] into rod and wire stock',
        'Tool bodies for [[material.blackfall-button|Blackfall Button]] cutting edges',
        'Structural strap and hoop for anything built above head height',
      ],
      tradeValue: '11 day-wages the bundle of ten, quoted at the Weir and honoured everywhere',
      tradeNotes:
        'The nearest thing the world has to a commodity with a published price, which is precisely why the Ascent quotes it and the Concord watches the quote. A charcoal embargo out of the Greatwood raises the price of everything made of metal within two months, and the Tree City has used that twice as a diplomatic instrument without ever calling it one.',
      devNotes:
        PROPOSAL('Siting the cementation sheds at the Black Weir and along the lower river is the proposal, and it is what makes the Weir a manufacturing town rather than a toll booth. It also reconciles the existing entries: the Weir already produces stamped merchant bar, and the Greatwood already exports charcoal.') +
        '\n\nChain note: this is the middle node of the iron chain. Raw is [[material.scaldstone|scaldstone]] or [[material.mire-bloom|mire bloom]], component is [[material.stairwire|stairwire]]. Carbon enters here from [[material.blackbole-timber|blackbole timber]], so the Greatwood is inside every piece of basin steel.',
    },
  }),

  E({
    id: 'material.stairwire',
    type: 'material',
    name: 'Stairwire',
    status: 'draft',
    summary: 'Six-strand steel hawser drawn thin and laid hard; the cable behind the Ascent\'s hoists and the Sky City\'s stays.',
    tags: ['cable', 'component', 'engineering', 'fatigue'],
    fields: {
      overview:
        'Drawn steel wire, six strands of nineteen laid around a tarred hemp heart, served and tarred again. It is the most advanced object the world makes in quantity and the whole of its restrained industry is visible in it: no magic, no alloy anyone can explain, just eleven passes through graded dies and a ropewalk long enough to lay the finished thing without a splice.\n\nA hawser is condemned at the first broken wire. Condemned hawser has a thriving second market on the lower terraces, where it is fencing, guy line and washing line, and where everyone involved knows it is a slow accident.',
      origin: 'Synthetic',
      sourceRegion: [REGION.ascentBasin, REGION.anvilShelf],
      rarity: 'Common',
      properties: [
        'Fatigues rather than fails: a hawser dies by broken wires, one at a time, on a schedule',
        'Rated in tonnes and re-rated after every inspection, which is where the corruption lives',
        'Stretches about two per cent over its first month under load and must be re-tensioned',
        'Corrodes from the heart outward, so the outside looks sound long after the inside is not',
      ],
      composition: 'Drawn [[material.blister-bar|blister bar]] wire, six by nineteen, tarred hemp heart',
      appearance: 'Black with tar, silvering where it runs over a sheave, and it fuzzes when it is dying',
      extraction: 'Not extracted. Drawn from blister bar wire rod through [[material.blackfall-button|Blackfall Button]] dies, then laid.',
      refinement:
        'Rod is drawn down in eleven passes at [[machine.the-drawbench-vaults|the Drawbench Vaults]] and in the Sifting City wire looms, each pass through a smaller rented die, annealing between passes. Laying is done at [[machine.the-strand-loom|the Strand Loom]] over the updraft and on the ropewalks of [[district.gilded-ascent-hoist-yards|the Hoist Yards]]: strands are closed, the heart is drawn in, and the whole is served and tarred hot.\n\nThe work at height is [[skill.lattice-work|Lattice Work]], which is the best-paid and shortest-lived profession in the Sky City. The [[skill.cable-and-drum|Cable and Drum]] trade splices and brakes it. A splice is always weaker than the lay, which is why a hawser is made in one length or not at all.',
      machines: ['machine.the-drawbench-vaults', 'machine.the-strand-loom'],
      uses: [
        'Hoist and counterweight runs, including the eight cable runs of [[city.gilded-ascent|the Gilded Ascent]]',
        'The tension lattice that holds [[city.sky-city|the Sky City]] over the shelf',
        'Rope bridge mains and span cables in [[city.tree-city|the Tree City]]',
        'Standing rigging, mooring lines and [[item.mooring-lance|mooring lance]] line',
        'Condemned hawser: fencing, snares, garrottes, and the whole informal economy of the lower terraces',
      ],
      tradeValue: '90 day-wages the hundred metres, new and certified; 4 for the same length condemned',
      tradeNotes:
        'The Sky City must re-lay cable faster than it fatigues and has been losing that race for three decades, which is the political fact underneath everything the Mooring Assize does. The Ascent sells hawser and lends against the leases on the machines that need it, and so profits twice from the same fatigue curve.',
      devNotes:
        PROPOSAL('The six-by-nineteen construction, the condemnation rule and the second market are proposed. The design value is a component with a visible, countable failure state: broken wires per metre is a number a party can inspect, forge, or be bribed to overlook, and [[npc.brask-vellmar|Brask Vellmar]] is the entire quest hook standing in one place.') +
        '\n\nChain note: terminal component of the iron chain. Requires a rented Blackfall die, which quietly puts the Sifting City inside every cable in the world.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* Forest, delta and karst                                           */
  /* ---------------------------------------------------------------- */

  E({
    id: 'material.blackbole-timber',
    type: 'material',
    name: 'Blackbole Timber',
    status: 'draft',
    summary: 'Pitch-black interlocked heartwood from the Greatwood\'s colossal boles; gates, keels and siege frames.',
    tags: ['timber', 'licensed', 'greatwood', 'military'],
    fields: {
      overview:
        'Heartwood from trunks that take three centuries to make and one season to fell. The grain interlocks, so it will not split along a line and has to be sawn in every direction; the resin content turns it near-black under its own weight of years and makes it heavy enough to sink in fresh water. It is the only timber that will take a gate hinge, a ballista frame or a weir slab and hold it for a lifetime.\n\n[[city.tree-city|The Tree City]] licenses every cut and enforces the licence with archers. That, more than any external threat, is what the city\'s militarisation is actually for, and everyone in the Greatwood understands the arrangement without anyone saying it aloud.',
      origin: 'Biological',
      sourceRegion: [REGION.greatwood],
      rarity: 'Rare',
      properties: [
        'Interlocked grain: will not cleave, must be sawn, and blunts a saw in a morning',
        'Denser than water when green; a felled trunk cannot be floated out and must be carted',
        'Resinous enough to be fire-resistant standing and violently flammable once pitch-cured',
        'Three centuries to mature, and no known way to hurry it',
      ],
      composition: 'Resin-saturated heartwood; the sapwood is worthless and is burnt for charcoal',
      appearance: 'Black to oxblood in section, with a chatoyant figure the coast pays extra for',
      extraction:
        'Felling is a fourteen-day operation by a crew of forty with a Marshalcy licence, a surveyed drop line and an evacuated quarter beneath. Trunks are sectioned where they fall and carted on eight-axle drays over roads built for the purpose. Roughly one felling in nine goes wrong, and a bole coming down out of line takes a gallery and everyone on it.\n\n[[creature.bolewright-wasp|Bolewright wasps]] hollow the heartwood from inside, and a bole that sounds hollow is condemned and burnt where it stands, which is the mechanism behind [[quest.the-felling-order|The Felling Order]]. Poaching is worked by deserters outside the palisade and prosecuted under [[skill.wire-and-snare|the same statute as man-trapping]].',
      refinement:
        'Sections are pit-sawn green, stickered and air-dried for four years, then either pitch-cured in the retorts of [[machine.the-pitchworks|the Pitchworks]] or steamed and laminated at [[machine.the-limb-press|the Limb Press]]. Sapwood and stumpwood go into the same retorts and come out as pitch, spirit and hard charcoal, which is the Greatwood\'s largest export by weight and the reason the continent can make steel at all.',
      machines: ['machine.the-pitchworks', 'machine.the-limb-press'],
      uses: [
        'Gates, weir slabs, keels, dray beds and anything that must not fail',
        'Ballista frames and laminated limbs for the redoubts',
        'Splint armour for [[item.bastion-jack|bastion jacks]], which burn, which is the design point',
        'Charcoal for [[material.blister-bar|blister bar]] cementation, which is where the carbon in basin steel comes from',
        'Pitch and spirit of turpentine, sold the length of the river',
      ],
      tradeValue: '260 day-wages the cubic metre, licensed; the licence itself trades higher than the wood',
      tradeNotes:
        'Nine cities buy it and one city decides who gets it. [[deposit.standing-fifty|The Standing Fifty]] outside the walls is the only number in the Greatwood every faction agrees on, and each felling licence is a council vote, which makes timber allocation the Tree City\'s entire domestic politics.',
      devNotes:
        PROPOSAL('The three-century maturity, the sink-in-water density and the licence-as-vote system are proposed. The load-bearing consequence is that the Tree City cannot expand supply at any price, so its only lever is who it says no to.') +
        '\n\nNote the double dependency this creates: the Greatwood supplies both the frames and the carbon, so a Greatwood blockade stops the Verdigris Hearth, the cementation sheds and the redoubt ballistae at once.',
    },
  }),

  E({
    id: 'material.glasscane',
    type: 'material',
    name: 'Glasscane',
    status: 'draft',
    summary: 'Hollow delta cane armoured in its own silica; light, stiff, cut in the Drown and floated out by the raft.',
    tags: ['cane', 'delta', 'spar', 'renewable'],
    fields: {
      overview:
        'A brackish-water cane that draws silica out of the mud and lays it down in the outer wall of every internode, so a mature stem is a glass tube with a wooden lining. Cut, split, steamed and laminated, it makes spar stock lighter than anything else that will carry the same load, which is why [[city.sky-city|the Sky City]]\'s lattice runs on it and why the Sky City has a delta policy.\n\nIt grows back in three years. That has never once stopped anyone from arguing about it.',
      origin: 'Biological',
      sourceRegion: [REGION.theDrown],
      rarity: 'Common',
      properties: [
        'Stiffness for weight beaten only by [[material.sparbone|sparbone]], and it costs a twentieth as much',
        'Silica armour blunts an axe in an afternoon; cutters use toothed hooks, not blades',
        'Splinters are glass and go septic; every cane yard has a picker whose whole job is hands',
        'Rots at the cut end if it is not sealed within a day, so the wet-season crop is worthless',
      ],
      composition: 'Lignified cane with a biogenic silica outer wall, hollow between nodes',
      appearance: 'Pale gold, glassy, and it rings when it is dropped on stone',
      extraction:
        'Cut in winter out of the brackish reach at [[deposit.canebrakes|the Canebrakes]] by crews working from punts, hooked rather than chopped, and rafted out in bundled floats. The brakes are chest-deep and opaque, and cutting them is [[skill.marsh-footing|Marsh Footing]] work: the crop is fine, the water is what kills. Cut ends are dipped in hot [[material.mirelac|mirelac]] on the raft before the day is out.',
      refinement:
        'Split with a four-way froe on the Cane Yards, steamed in a chest over the same fires that boil the mirelac crop, and laminated into spar stock in staggered scarfs. A good spar is eleven laminations and no butt joint within a metre of another. Lacquered stock will hold twenty years in the weather; unlacquered stock will hold two.',
      machines: TBD('The Cane Yards splitting and steaming line has no machine entry. Does it need one, or is it deliberately hand work on a drifting raft?'),
      uses: [
        'Lattice spar and mast stock for [[city.sky-city|the Sky City]]',
        'Raft decking, scaffolding and every roof in the floating settlement',
        'Water pipe and siphon tube where copper is unaffordable',
        'Fishing poles, punt poles, arrow shafts and the cheap end of everything',
      ],
      tradeValue: '2 day-wages the bundle green, 14 as finished spar stock, and the whole margin is upriver',
      tradeNotes:
        'The delta cuts it and other people sell it, which is the standing grievance of the water cities. Anyone who can stop a raft on the river can price a city, so a bad winter at the brakes or a closed gate at the Weir is felt in the lattice within a season.',
      devNotes:
        PROPOSAL('Biogenic silica armour, the three-year regrowth and the mirelac dip are proposed. The design point is a genuinely renewable strategic material whose politics are entirely about transport rather than scarcity, which is a different shape from every other entry in this set.'),
    },
  }),

  E({
    id: 'material.mirelac',
    type: 'material',
    name: 'Mirelac',
    status: 'draft',
    summary: 'Resin secreted by delta scale-insects on standing glasscane; boiled down, the best waterproof lacquer known.',
    tags: ['resin', 'lacquer', 'biological', 'seasonal'],
    fields: {
      overview:
        'Scale insects colonise standing [[material.glasscane|glasscane]] in the wet season and secrete a hard amber resin over themselves in sheets. Scraped, boiled and strained on the rafts, it becomes a lacquer that will not craze, will not lift in salt water and will hold an electrical charge off a copper conduit for eleven years.\n\nThat last property is why [[city.mediterranean-city|the Mediterranean City]] takes very nearly the whole crop. A bad season in the delta browns out a city four hundred leagues away, and neither city has ever admitted in writing how tight that coupling is.',
      origin: 'Biological',
      sourceRegion: [REGION.theDrown],
      sourceCreature: TBD('The delta scale-insect that secretes mirelac is not in the bestiary. Is it a distinct species, or the wet-season stage of something already written? Its parasite load on the canebrakes decides whether the cane and lacquer trades are allies or rivals.'),
      rarity: 'Scarce',
      properties: [
        'Cures glassy and stays flexible; twenty years in weather before it yellows',
        'Dielectric: the only insulation the coast trusts on a live conduit',
        'Softens at 60 degrees, which is why a lacquered roof goes tacky in a still summer',
        'Crop varies threefold between seasons and nobody has worked out why',
      ],
      composition: 'Shellac-type insect resin with a wax fraction that is skimmed off and sold separately',
      appearance: 'Amber in the flake, deep green-black in the boiled stock',
      extraction:
        'Scraped off standing cane in the wet season with a curved blade, by crews working waist-deep from punts, which means working among the insects. The scale is harmless. The mosquitoes in the same reach are not, and marsh fever is the actual cost of the crop. Raw flake is filthy with cane fibre and insect bodies and loses about two fifths of its weight in cleaning.',
      refinement:
        'Boiled in open pans on the raft yards, skimmed, strained through cloth and run into moulds. Boiling is done on the water because nobody upriver will insure the fire risk. The coast then cuts the boiled stock with liquor from farmed [[creature.verdigris-whelk|verdigris whelk]] to make conduit lacquer proper: the resin alone crazes on copper, and the whelk liquor alone will not build a film. Neither city advertises that it needs the other.',
      machines: TBD('The raft boiling yards are hand work; the coast\'s lacquer house is not. Does the Conduit College\'s lacquer house warrant a machine entry of its own?'),
      uses: [
        'Conduit lacquer, cut with whelk liquor, for the copper wiring of the Mediterranean City',
        'Waterproofing for cane roofs, spar stock, rafts and rope',
        'Proofed cloth for [[item.ballast-jacket|ballast jackets]] and every wet-weather coat worth having',
        'Varnish for instruments, gauges and anything that must not swell',
      ],
      tradeValue: '18 day-wages the boiled block; the coast has paid 40 in a short season and complained the whole time',
      tradeNotes:
        'The [[faction.moorstone-compact|Moorstone Compact]] controls where rafts moor and therefore who scrapes which reach, which makes a seasonal crop into an annual political settlement. The Conduit College has spent forty years trying to farm the scale insect on the coast and has never got a colony through a winter.',
      devNotes:
        PROPOSAL('The two-component lacquer is the proposal, and it reconciles two existing entries that had independently claimed the conduit lacquer: this one and the verdigris whelk. Making it a blend means the Drown and the Meridian Coast each hold half of an insulation monopoly and neither can cut the other out.') +
        '\n\nDesign hook: an embargo on either half is a slow-burning economic quest with a visible symptom, since a city that cannot insulate conduit starts having fires.',
    },
  }),

  E({
    id: 'material.sunwell-mica',
    type: 'material',
    name: 'Sunwell Mica',
    status: 'draft',
    summary: 'Karst spar that cleaves into flawless hand-sized leaves; silvered, it becomes the Cave City\'s light ducts.',
    tags: ['mineral', 'optics', 'karst', 'occupational-disease'],
    fields: {
      overview:
        'Bands of a pale mica in the deep galleries of [[region.hollow-karst|the Hollow Karst]] that cleave into leaves a hand across and perhaps a fifth of a millimetre thick, flat enough to take a silver back and stay optically true. Silvered, mounted and aimed, the leaves are what carries daylight down the [[machine.the-mirror-ducts|mirror ducts]] into the growing galleries.\n\nWithout it the cave city is a hole in the ground with people starving in it. That is not rhetoric; it is the arithmetic on the light-tithe books.',
      origin: 'Natural',
      sourceRegion: [REGION.hollowKarst],
      rarity: 'Scarce',
      properties: [
        'Cleaves flat to a fraction of a wavelength with nothing but a knife and a steady hand',
        'Survives heat that would craze glass, so a duct leaf can sit at a focus',
        'Loses about a per cent of its reflectance a year and is stripped and re-silvered on a ninety-day rota',
        'Brittle in the frame: a dropped leaf is gone, and a gallery holds two thousand of them',
      ],
      composition: 'A muscovite-type sheet silicate, backed with tin-and-quicksilver amalgam once silvered',
      appearance: 'Colourless and faintly pearl in the leaf; a silvered leaf is warm-toned rather than white',
      extraction:
        'Cleaved by hand at the face along the bedding planes, by lamplight, on ledges cut for the purpose in [[deposit.lantern-beds|the Lantern Beds]]. A cleaver works lying down for six hours at a stretch and is paid by the usable leaf, so the rate rewards patience and punishes a cough. The beds are followed rather than mined: the band goes where it goes and the gallery follows it, which is why the deep karst map looks like a nervous system.',
      refinement:
        'Silvering is done above ground and it is the part that kills. Leaves are cleaned, laid on a bed of tin foil, flooded with quicksilver and left to amalgamate, then drained and dried. The [[faction.mirror-assembly|mirror-wrights]] hold both the cleaving and the silvering, and rotate silverers out every ninety days on paper. The rota exists because of quicksilver poisoning and the rota is not enough: a silverer of ten years has the tremor, and a silverer of fifteen has stopped working. [[skill.mirror-cutting|Mirror Cutting]] covers the grinding and aiming; nothing covers the mercury.',
      machines: ['machine.the-mirror-ducts'],
      uses: [
        'Duct leaves for the mirror shafts, the entire basis of karst agriculture',
        'Furnace and lamp glazing where glass would craze',
        'Hand mirrors, including the [[item.sunwell-mirror|sunwell mirror]] used to steal light off a neighbour',
        'Optical shims and window plate for instruments, exported up the incline',
      ],
      tradeValue: '5 day-wages the dozen leaves raw, 26 silvered, and the difference is somebody\'s nervous system',
      tradeNotes:
        'Exported silvered rather than raw, because the Assembly will not let the silvering leave the karst. That decision looks like a trade policy and is really a containment policy: if the coast learned how simple the amalgam is, the karst would have nothing to sell but food.',
      devNotes:
        PROPOSAL('The ninety-day rota and the amalgam method are proposed, and they give the karst a signature occupational injury with a named cause, a named beneficiary and a documented rota that a player can read. [[npc.iratze-zubiate|Iratze Zubiate]] holds two hundred of these leaves in alignment by hand and cannot report the ducts she has lost.'),
    },
  }),

  E({
    id: 'material.cudmother',
    type: 'material',
    name: 'Cudmother',
    status: 'draft',
    summary: 'Living gut culture cropped from karst pack-beasts; without it, rock dust never becomes soil.',
    tags: ['biological', 'agriculture', 'contraband', 'karst'],
    fields: {
      overview:
        'A stable culture of gut organisms cropped live from the forestomach of the karst pack-beasts and kept in warmed crocks. Fed on milling chaff and dung, it turns limestone dust and spent fungal bed into something a root will hold in. Every terrace in [[city.cave-agrarian-city|the Cave Agrarian City]] runs on a starter descended from a crock somebody\'s great-grandmother kept alive through a bad winter.\n\nIt is the only resource in the world that has to be fed. It cannot be stockpiled, cannot be stored cold, and dies in about eleven days without attention. Export is a capital offence in law and is done constantly, because a starter travels in a courier\'s armpit and no gate has ever found one.',
      origin: 'Biological',
      sourceRegion: [REGION.hollowKarst],
      sourceCreature: TBD('The karst pack-beast is named in the Cave Agrarian City entry but is not in the bestiary. What is it, what does a working animal cost to feed underground, and does cropping the culture shorten its life?'),
      rarity: 'Rare',
      properties: [
        'Must be re-split and re-fed every nine days or it sours and cannot be recovered',
        'Dies below 8 degrees and above 40; a courier carries it against the skin',
        'Turns milled limestone and spent bed into workable soil in about a season',
        'Every gallery strain is subtly different and the differences are heritable, tracked and quarrelled over',
      ],
      composition: 'A mixed anaerobic culture, never analysed by anyone; the karst thinks of it as a single animal',
      appearance: 'Grey-green, the texture of thick porridge, and it smells like a byre in July',
      extraction:
        'Cropped by hand through a fistula kept open in the animal\'s flank, a practice the herders learned generations ago and have never written down. The beast is worth more alive than any three people who work it, and is treated accordingly, which the gallery hands notice. A crop is taken every fortnight from any one animal and no oftener.',
      refinement:
        'Not refined so much as kept. Crocks are held at blood heat in a warmed cell, split every nine days into a fresh crock, fed on chaff and dung slurry, and skimmed. A gallery keeps three lines going in separate cells so that a soured line does not take the terrace with it. [[skill.spore-lore|Spore Lore]] is the trade skill; a keeper who loses a line is not employed again.',
      machines: TBD('Is the warming cell a machine entry, or deliberately domestic technology in a city that has clockwork mirror drives?'),
      uses: [
        'Soil-making on every karst terrace, which is the food supply of a whole civilisation',
        'Cultured into [[item.fever-clay|fever clay]] for wounds and for Drown marsh fever',
        'Silage and fodder conditioning for the pack-beasts themselves, closing the loop',
        'Fermenting spent fungal bed into a burnable cake',
      ],
      tradeValue: 'Not lawfully priced. A live starter changes hands outside the karst at 400 day-wages and rising.',
      tradeNotes:
        'The one thing nobody outside the karst can price, because the buyers who need it most are the ones who cannot admit to wanting it. [[faction.mirror-assembly|The Mirror Assembly]] treats the export ban as its foundational law and enforces it against couriers rather than against the galleries that sell to them, which tells you who the law is for.',
      devNotes:
        PROPOSAL('The nine-day split, the eleven-day death and the flank fistula are proposed. The design intent is a strategic resource that behaves like a living thing rather than a stockpile: it cannot be hoarded, seized usefully, or held to ransom, only kept, which makes smuggling it a matter of logistics and care rather than muscle.') +
        '\n\nAgriculture authors: if a second city ever gets a working starter, the Hollow Karst loses its only monopoly and its entire foreign policy at once. That is a campaign-scale outcome and it should be reachable.',
    },
  }),

  E({
    id: 'material.quietmilk',
    type: 'material',
    name: 'Quietmilk',
    status: 'draft',
    summary: 'Pale gland fluid from a blind karst amphibian: the only dependable anaesthetic, and the world\'s worst habit.',
    tags: ['medicine', 'narcotic', 'licensed', 'karst', 'dark'],
    fields: {
      overview:
        'Milked from the skin glands of a blind amphibian farmed, badly, in the flooded sumps under [[city.cave-agrarian-city|the Cave Agrarian City]]. Stabilised in spirit within the hour, it is the only reliable anaesthetic anyone has: a measured dose takes the pain away entirely and leaves the patient awake and talking, which is precisely the problem.\n\nSurgery in this world is engineering, and quietmilk is what makes engineering on a living person survivable. It is also the most addictive substance in circulation, and the people who milk it are dosed to keep them at the tanks.',
      origin: 'Biological',
      sourceRegion: [REGION.hollowKarst],
      sourceCreature: TBD('The blind sump amphibian is named in the cave city entry but is not in the bestiary. Its farmed yield, its wild population and whether milking is survivable for the animal are all open, and the answer sets the ceiling on the world\'s surgery.'),
      rarity: 'Rare',
      properties: [
        'Blocks pain without paralysis; the patient stays conscious, which surgeons and patients disagree about',
        'Tolerance builds in about nine doses and the therapeutic window narrows every time',
        'Degrades to uselessness in four hours unless fixed in spirit',
        'Withdrawal is a fortnight of pain amplification that has killed people who were not otherwise ill',
      ],
      composition: 'A mixed alkaloid gland secretion; the spirit fixes it and is itself part of the dose',
      appearance: 'Pale, faintly opalescent, thickening to a skin on the surface within minutes',
      extraction:
        'Animals are handled wet, stroked along the flank until the glands weep, and returned to the tank. It is delicate work and it is done by people who are themselves dosed, because a milker on quietmilk does not mind the hours and does not leave. That arrangement is known to the reeves, is not written down anywhere, and is the ugliest single fact in the Hollow Karst.',
      refinement:
        'Fixed in cane spirit within the hour, filtered, and graded by drop count against a standard the surgeons set rather than the farmers. [[skill.reagent-work|Reagent Work]] covers preparation and storage; contamination is the usual cause of a death on the table, not the drug. Licensed cutters draw from a sealed apothecary flask with a counted seal, and the count is audited.',
      machines: TBD('Is there a licensed fixing house, or is stabilisation done at the tank side by whoever is milking?'),
      uses: [
        'Surgery, amputation and bone-setting; the practical basis of the [[skill.bonewright|Bonewright]] trade',
        'Field medicine for anyone who can afford a flask, which is not many',
        'Sold by the drop in the Arena City, where the market is fighters and not patients',
        'Interrogation, where the withdrawal is the instrument rather than the drug',
      ],
      tradeValue: '30 day-wages the sealed flask, licensed; four times that unsealed, and unsealed is most of the trade',
      tradeNotes:
        'Licensed to registered cutters in [[city.mediterranean-city|the Mediterranean City]] and [[city.gilded-ascent|the Gilded Ascent]], where possession without a cutter\'s licence carries a term. Banned outright in [[city.tree-city|the Tree City]] after it was used to move conscripts quietly out of a levy quarter, which means the Marshalcy\'s own surgeons work without it. Sold by the cup ringside in [[city.arena-city|the Arena City]] and not regulated there at all.\n\nIt pairs with, and is not the same as, [[spell.stillwater-draught|stillwater draught]]: the draught stops the body, quietmilk stops the pain, and a cutter who confuses them kills a patient who can feel it happening.',
      devNotes:
        PROPOSAL('The dosed milkers, the nine-dose tolerance and the four-city legal split are proposed. Handle the milkers as people with names and a way out, never as colour: the standard scene is a party being offered a discount they eventually work out the reason for.') +
        '\n\nSystem note: quietmilk is the reason this world can have surgery without healing magic. If it is cut off, [[skill.bonewright|Bonewright]] becomes a horror rather than a trade, and that is a legitimate thing to do to a region for a season.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The shelf and the steppe                                          */
  /* ---------------------------------------------------------------- */

  E({
    id: 'material.sparbone',
    type: 'material',
    name: 'Sparbone',
    status: 'draft',
    summary: 'Hollow strutted bone from the soarers that ride the Anvil Shelf updraught: lighter than cane and far stiffer.',
    tags: ['bone', 'biological', 'quota', 'sky-city'],
    fields: {
      overview:
        'Long bones from the soarers that nest on the scarp faces of [[region.anvil-shelf|the Anvil Shelf]] and ride the same standing thermal [[city.sky-city|the Sky City]] does. The bone is hollow and cross-strutted inside like a truss, which is why it beats every worked material in the world for stiffness against weight, and why the Sky City will not use anything else where a spar has to be light and true at once.\n\nThe city sets an annual harvest quota. It enforces that quota on nobody but itself, and every harvest crew comes back short a name.',
      origin: 'Biological',
      sourceRegion: [REGION.anvilShelf],
      sourceCreature: TBD('The soarers are named in the Sky City entry and are not in the bestiary. Are they a scarp-nesting bird, or the rigid internal frame of something stranger? The harvest quota, the nest raids and whether the population is actually declining all wait on that answer.'),
      rarity: 'Scarce',
      properties: [
        'Stiffness for weight roughly a third better than laminated [[material.glasscane|glasscane]] spar',
        'Fails without warning: no creep, no fuzzing, it simply goes',
        'Scarfs and glues well; a scarfed spar is as strong as the stock either side of it',
        'Yellows and embrittles under sunlight, so every spar is lacquered or sleeved',
      ],
      composition: 'Mineralised strutted bone, marrow scraped; the strut lattice is the whole engineering point',
      appearance: 'Bone-white going ivory with age, with the strut pattern visible as shadow through a thin section',
      extraction:
        'Harvest crews go down the scarp faces on lines to take bone from carcasses and, when the season has been poor, from nests. It is roped work in rotor turbulence on a cliff nobody has surveyed properly, and the [[mechanic.mass-warrant|Mass Warrant]] makes every kilogram brought back a billable, taxable, countable thing. Crews are paid by mass landed. Crews are not paid for the man they left on the face.',
      refinement:
        'Boiled to strip, split along the strut lines, dried slowly under weight, then scarfed into spar lengths with hot glue and served. A spar is graded by ringing it: a dull note means a strut has gone inside and the spar is condemned unopened. Nobody has found a way to see inside one, which is a standing problem in a city where spars hold up streets.',
      machines: TBD('Sparbone scarfing is done in the lattice sheds. Is there a machine entry for the Sky City lattice sheds, or does it belong to [[machine.the-strand-loom|the Strand Loom]] entry?'),
      uses: [
        'Lattice spar where stiffness matters more than cost, throughout the Sky City ring',
        'Instrument frames, rules and long straightedges that must not sag',
        'Splints and internal fixation in [[skill.bonewright|Bonewright]] surgery, which is exactly what it sounds like',
        'Bows, arms and prosthetics for anyone who can pay',
      ],
      tradeValue: '75 day-wages the spar length, and the Sky City buys back its own condemned stock to keep it off the market',
      tradeNotes:
        'The city exports a little and hoards most of it. The proposed fraud is the interesting part: culled [[creature.loftwrack|loftwrack]] raft-struts are sold on the ground as low-grade sparbone, look identical, and fail at about a third of the rated load. Every lattice collapse in the last decade has had a merchant somewhere insisting the stock was graded.',
      devNotes:
        PROPOSAL('The strut lattice, the ring test and the loftwrack substitution fraud are proposed. The Sky City entry already establishes that soarers and loftwrack are different animals, so this entry does not merge them; it makes the confusion between them a crime.') +
        '\n\nThis is the material the brief wanted as the bone entry, and its source creature is the largest single gap in this module. Flagged rather than invented.',
    },
  }),

  E({
    id: 'material.steppe-scute',
    type: 'material',
    name: 'Steppe Scute',
    status: 'draft',
    summary: 'Plate cut from the shed carapace of steppe burrowers; boiled, pressed and laminated into cheap armour.',
    tags: ['chitin', 'armour', 'seasonal', 'arena'],
    fields: {
      overview:
        'The burrowers of [[region.ashen-steppe|the Ashen Steppe]] shed their carapace each spring and rebury the plate in the burrow, where it is dug out again by crews small enough to go down after it. Boiled soft, pressed flat and laminated three or four plies deep, it makes armour that stops a first blow well, a second badly, and a third not at all.\n\n[[city.arena-city|The Arena City]] buys the entire take by the cart and asks nothing about the crews, which is the point: the Ring needs kit that is cheap enough to lose and fails in ways a crowd can see.',
      origin: 'Biological',
      sourceRegion: [REGION.ashenSteppe],
      sourceCreature: TBD('The steppe burrower of the Moult Fields is not in the bestiary, and is explicitly not the Cinder Waste sandsleeper: different range, different cycle. Is it a congener, or something else entirely, and what does a crew meet down a live burrow?'),
      rarity: 'Common',
      properties: [
        'Laminated scute stops a cut well and a thrust poorly, and delaminates once wet',
        'Roughly half the weight of steel plate for a quarter of the protection',
        'Six-week gathering season and no way to store a live burrow\'s worth of plate cheaply',
        'Boiling ruins it if held five minutes too long, so the yards work to a sand glass',
      ],
      composition: 'Chitinous plate with a mineralised outer layer, laminated with hide glue and pitch',
      appearance: 'Amber-brown, translucent at the edges, and it darkens almost to black with wear',
      extraction:
        'Six weeks in spring, worked by crews chosen for size rather than skill, which in practice means children and small adults on a season contract. A gatherer goes down a live burrow on a line with a lamp and a hooked pole, finds the reburied plate and passes it back. The burrows collapse. Everyone knows the burrows collapse. The season is short and the price is fixed before it starts, so nobody has ever slowed down to shore one.',
      refinement:
        'Boiled in vats in [[district.arena-city-scute-yards|the Scute Yards]], pressed flat under screw presses while hot, trimmed and laminated with hide glue and pitch. Three plies is a fighter\'s jack, four is a guard\'s, five will not bend enough to wear. The yards run day and night for eight weeks and then stand idle for ten months, which is why the workforce is seasonal, itinerant and owed money.',
      machines: TBD('The Scute Yards presses are the only laminating plant on the steppe and have no machine entry yet.'),
      uses: [
        'Arena harness the Ring can afford to lose, in quantity, every card night',
        'Militia jacks and caravan-guard kit across the steppe and the waste',
        'Roofing and shutter plate in the Arena City, which is why the city is the colour it is',
        'Cheap shields, greaves and horse barding for the drovers\' camps',
      ],
      tradeValue: '4 day-wages the raw plate, 16 the finished three-ply jack',
      tradeNotes:
        '[[faction.red-writ|The Red Writ]] buys the whole six-week take at a price agreed before the season opens, which transfers every risk to the crews and every gain to the Writ. A bad season means the gatherers eat the loss and the fixed price stands.',
      devNotes:
        PROPOSAL('The child-sized crews, the fixed forward price and the delamination-when-wet failure mode are proposed. The armour is designed to be visibly, mechanically inferior so that a party who can afford steel is making a moral choice when they equip retainers in scute.') +
        '\n\nThe source animal is the second gap in this module. It is deliberately not the sandsleeper: the Arena City entry already has sandsleepers doing something else, on a different cycle, out of a different region.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Meridian Coast                                                */
  /* ---------------------------------------------------------------- */

  E({
    id: 'material.tideset-cement',
    type: 'material',
    name: 'Tideset Cement',
    status: 'draft',
    summary: 'Ash-and-lime cement that cures underwater; the reason the Meridian Coast can build harbour works at all.',
    tags: ['cement', 'guild-secret', 'harbour', 'hybrid'],
    fields: {
      overview:
        'Cinder ash from the beds above the olive terraces, burnt lime, and a third ingredient the calcining guild has never named. Mixed and packed into a form under water it sets in eleven hours and goes on hardening for thirty years. Every mole, quay, cistern and sea wall on [[region.meridian-coast|the Meridian Coast]] is made of it, and so is the harbour of every city that could afford a Mediterranean fitter.\n\nThe ash beds are open to anyone with a shovel. The kilns are guild property and guild secret. That sentence is [[city.mediterranean-city|the Mediterranean City]]\'s entire economic model, and the proposal below is what is actually inside the secret.',
      origin: 'Hybrid',
      sourceRegion: [REGION.meridianCoast],
      sourceCreature: ['creature.smoker-whale'],
      rarity: 'Common',
      properties: [
        'Sets under water in about eleven hours and gains strength for three decades',
        'Resists salt attack in a way no lime mortar does, which is the whole trick',
        'Cures hot enough that a large pour must be built in lifts or it cracks itself apart',
        'Useless after ninety days in the barrel; the trade is therefore continuous, never stockpiled',
      ],
      composition: 'Calcined cinder ash and lime with a measured dose of sulphur ferment, which is the secret',
      appearance: 'Grey-violet in the barrel, going the colour of wet slate as it cures',
      extraction:
        'Open-cast from [[deposit.ash-quarries|the Ash Quarries]] with hand tools and a barrow, by anyone at all. The quarries are genuinely free, genuinely open and genuinely worthless without a kiln, which the [[faction.conduit-college|Conduit College]] finds no reason to hide.',
      refinement:
        'Calcined in the guild kilns above the harbour to a recipe held by eleven people. Ash and limestone are burnt together, ground under edge runners, and dosed with a ferment bought by the barrel from the deep-water whalers. That ferment is cultured in the second gut of [[creature.smoker-whale|smoker whales]], is the source of the sulphates that make the cement set under salt water, and cannot be made ashore. One beached carcass is worth a shore war, and the College has never explained to the harbour court why it bids on carcasses.',
      machines: TBD('The calcining kilns are the most valuable industrial secret on the coast and have no machine entry. Whoever writes it should decide how much of the recipe is visible from inside the kiln house.'),
      uses: [
        'Moles, quays, sea walls and every harbour work on the gulf',
        'Cisterns and sluice linings, including the cut cisterns of the Hollow Karst',
        'Foundations and vault footings in [[city.gilded-ascent|the Gilded Ascent]], where stone is cheaper than insurance',
        'Emergency patching on a live weir gate, which is the only work it is done for at speed',
      ],
      tradeValue: '9 day-wages the barrel at the kiln, 20 by the time it has crossed the gulf and not gone off',
      tradeNotes:
        'Sold freely and priced high, because the guild would rather sell cement forever than sell the recipe once. The vulnerability is the ferment: a whaling failure in [[region.eastern-deep|the Eastern Deep]] stops the kilns, and the College has no substitute and no second supplier.',
      devNotes:
        PROPOSAL('The whale-gut ferment is the proposal and it supplies the missing content of an established secret. It makes an open-cast quarry that anyone can dig genuinely worthless, gives the Eastern Deep a reason to matter to a coastal city, and puts a single beached carcass at the centre of a shore war the bestiary entry already hints at.') +
        '\n\nIf a rival ever works out the dose, the Conduit College loses a third of its revenue in a year. That is a legitimate endgame for a trade campaign.',
    },
  }),

  E({
    id: 'material.clearcast-glass',
    type: 'material',
    name: 'Clearcast Glass',
    status: 'draft',
    summary: 'Bubble-free optical glass cast in flat discs: lenses, tide-gauges, instrument plate and the Orrery\'s own faces.',
    tags: ['glass', 'optics', 'precision', 'coast'],
    fields: {
      overview:
        'Cast in flat discs a hand thick and up to two spans across, annealed for six weeks, and ground from there into everything the coast sells that has to be looked through. It is bubble-free, strain-free and colourless, and the only reason it can be is the sixth cut of [[material.pan-nitre|pan nitre]].\n\nOne adulterated barrel of salt spoils a month of casting. That single sentence is why the Sifting City\'s grading fraud is a Mediterranean problem, why the harbour now assays every barrel on arrival, and why the Bench in the Pans considers the assaying an insult it has not yet answered.',
      origin: 'Synthetic',
      sourceRegion: [REGION.meridianCoast],
      rarity: 'Scarce',
      properties: [
        'Free of striae and seed to a degree nothing else in the world approaches',
        'Six-week annealing schedule; pulled early it holds strain and shatters in the grinding shop',
        'Will not take a thermal shock, so a lens in a hot lamp is a lens with a lifespan',
        'Refractive index consistent enough between melts that lens shops can grind to a stored figure',
      ],
      composition: 'Pan sand and lime fluxed with sixth-cut nitre; the iron content of the flux is the only variable that matters',
      appearance: 'Water-clear with a faint green edge in a thick section, and it rings for a long time',
      extraction: 'Not extracted. Fused at [[machine.the-frit-kiln|the Frit Kiln]] from pan sand, soda ash and lime.',
      refinement:
        'Melted, fined, cast on to an iron table and rolled flat, then annealed for six weeks in a lehr that must not be opened. The casting floor works to [[mechanic.conduit-hours|Conduit Hours]] like everything else in the city: miss the pressure slot and the whole batch is scrap. Grinding and figuring is a separate trade under [[skill.mirror-cutting|Mirror Cutting]], and a figured objective takes one man four months.',
      machines: ['machine.the-frit-kiln'],
      uses: [
        'Objectives, eyepieces and loupes, including the one in every [[item.assayers-tray|assayer\'s tray]]',
        'The dial faces and index plate of [[landmark.the-tide-orrery|the Tide Orrery]]',
        'Tide gauges, pressure glasses and every instrument window on the coast',
        'Roof lights and glazing in the conduit yards, where it is a scandalous extravagance',
        'Apothecary ware where the contents must be watched and must not react',
      ],
      tradeValue: '55 day-wages the cast disc; a figured objective is priced by the month of labour, not the glass',
      tradeNotes:
        'The coast sells glass and refuses to sell the annealing schedule, on the reasonable view that anyone can melt sand and nobody else has six weeks of patience. Exported to the karst for duct work and to the Ascent for the assay trade; not sold at all to any city that has defaulted on a Conduit College licence.',
      devNotes:
        PROPOSAL('The six-week anneal and the iron-ladder dependency on nitre grade are proposed. The design purpose is to make one city\'s corruption physically break another city\'s industry, so [[quest.pan-fever|Pan Fever]] and [[quest.four-minutes-fast|Four Minutes Fast]] are on the same supply line without either quest having to say so.'),
    },
  }),

  E({
    id: 'material.orrery-bronze',
    type: 'material',
    name: 'Orrery Bronze',
    status: 'draft',
    summary: 'Hard low-creep gear bronze developed for the Tide Orrery, now in every good mechanism on the coast.',
    tags: ['alloy', 'precision', 'gears', 'ageing'],
    fields: {
      overview:
        'A high-tin bronze with a little phosphorus, chill-cast into blanks and then left alone for eighteen months before a tooth is cut. The ageing is the whole thing: the metal moves as it settles, and a gear cut from green stock will be minutely out of true two years later and will stay that way for the life of the machine.\n\nNine thousand of these gears drive [[landmark.the-tide-orrery|the Tide Orrery]]. About a day and a half of accumulated error in nine years is what the ageing rule is defending against, and [[npc.melitta-aspri|Melitta Aspri]] is currently hiding the fact that the rule has been broken somewhere.',
      origin: 'Synthetic',
      sourceRegion: [REGION.meridianCoast],
      rarity: 'Scarce',
      properties: [
        'Low creep under sustained load: a tooth holds its profile for decades',
        'Must be aged eighteen months after casting; foundries that skip it sell gears that go out of true',
        'Machines cleanly and takes a scraped bearing surface without seizing',
        'Casts hot and shrinks awkwardly, so blanks are always over-size and always wasteful',
      ],
      composition: 'Roughly 88 copper, 11 tin, a trace of phosphorus; the trace is guild business',
      appearance: 'Warm gold going brown, with a distinctive violet cast on a freshly scraped face',
      extraction: 'Not extracted. Alloyed at [[machine.the-verdigris-hearth|the Verdigris Hearth]] from copper matte and imported tin.',
      refinement:
        'Copper comes from the heavy concentrate screened out of raw pan crust at [[machine.the-sieve-cascade|the Sieve Cascade]] and shipped to the coast, where it is reduced with Greatwood charcoal at the Verdigris Hearth. Tin is imported and nobody in this module knows from where. The alloy is chill-cast against iron, stacked in an ageing yard for eighteen months under a dated tag, then cut. Ageing yards are the most boring valuable real estate on the coast and are insured accordingly.\n\nA foundry under pressure shortens the ageing and re-dates the tag. The gears work. They work for two years. That is the trade\'s standing fraud and it is almost impossible to prove before the fact.',
      machines: ['machine.the-verdigris-hearth', 'machine.the-drawbench-vaults'],
      uses: [
        'Gear trains for orreries, tide engines, clockwork mirror drives and the Tally Engine',
        'Bearings, worms and screws in anything expected to run for a generation',
        'Spring housings and lock work for the [[item.springlock|springlock]]',
        'Seal brass and tally brass, including [[item.factors-seal|factor\'s seals]] and cuff tallies',
        'Drawn tube and rod at the Drawbench Vaults for instrument work',
      ],
      tradeValue: '40 day-wages the aged blank; green stock sells at 24 and should not sell at all',
      tradeNotes:
        'The coast exports gears rather than metal wherever it can, because a gear carries the ageing yard in it and an ingot does not. The Ascent buys aged blanks for the Tally Engine and has twice bought green ones by accident, which is why the Concord now dates every tag it receives and keeps the tags.',
      devNotes:
        PROPOSAL('The eighteen-month ageing rule and the re-dated tag fraud are proposed. This is a deliberately slow-acting defect: a party who buys green bronze will not find out for two years of campaign time, which makes it a good delayed consequence rather than an immediate failure.') +
        '\n\nUnresolved: where does the tin come from? No deposit in this module supplies it, and the karst amalgam trade needs tin too. That is a real gap and a good hook for a route or frontier entry.',
    },
  }),

  /* ---------------------------------------------------------------- */
  /* The Aetheric Scar                                                 */
  /* ---------------------------------------------------------------- */

  E({
    id: 'material.ward-chalk',
    type: 'material',
    name: 'Ward Chalk',
    status: 'draft',
    summary: 'Soft white marl that holds a drawn ward-line when nothing else will; every ward in the world is chalked in it.',
    tags: ['magic', 'licensed', 'consumable', 'monopoly'],
    fields: {
      overview:
        'Marl cut in blocks out of [[deposit.ward-marls|the Ward Marls]] under the turf of the Anvil Shelf, milled, sieved, bound and cake-pressed into sticks, then fired in a live fault field at [[machine.the-ward-kilns|the Ward Kilns]]. What comes out will hold a drawn line where nothing else will, and every ward the world can lawfully lay is drawn in it.\n\nThe entire warding trade is therefore a repeat-order business. A line goes dead inside a season, sooner in weather, and a bound district that misses a chalk round finds out what it was holding up. See [[mechanic.ward-load|Ward Load]]: this material is the consumable that mechanic runs on.',
      origin: 'Hybrid',
      sourceRegion: [REGION.anvilShelf, REGION.aethericScar],
      rarity: 'Scarce',
      properties: [
        'Holds a drawn line for a season, or five to nine days on a worn harness that is handled',
        'Grade is measured as tonnage-seconds held before a line goes dead, and is stamped on every stick',
        'First-grade sticks are fired with a charge of [[material.levin-salt|levin salt]] and are what structural work uses',
        'Rain unmakes an unsealed line entirely, which is why exterior wards are cut rather than chalked',
        'Eaten by [[creature.chalk-louse|chalk lice]], which will quietly void a whole warded quarter overnight',
      ],
      composition: 'Calcareous marl with a clay binder, fired in field; the field is not an ingredient anyone can weigh',
      appearance: 'Chalk white, faintly warm to hold, and a first-grade stick hums against the teeth',
      extraction:
        'Cut out in blocks by the cartload from shallow beds under the shelf turf, which is unskilled surface work and the only easy step in the chain. [[faction.mooring-assize|The Mooring Assize]] has sold the annual cut years forward to a city that cannot dig its own, which makes the marl a debt instrument as much as a mineral.',
      refinement:
        'Milled, sieved to a stated fineness, mixed with binder and cake-pressed into sticks. Firing is the part that matters and it is done inside a live fault field, at a measured dose to the burners, who are rotated out on exposure rather than on hours. Every stick is logged: kiln, batch, grade, burner. [[faction.fetterhouse|The Fetterhouse]] audits the log rather than the chalk, because a stick cannot be assayed without being used up.\n\nThat is the flaw [[quest.the-chalk-that-lies|The Chalk That Lies]] turns on. An adulterated batch assays clean by log and fails under load, and by the time anyone knows, the batch is drawn on nine walls.',
      machines: ['machine.the-ward-kilns'],
      uses: [
        'Every lawful ward line in the world, from [[spell.chalkline-ward|chalkline wards]] up',
        'Structural holdfasts on the bound slabs of [[city.magic-city|the Magic City]]',
        'Redrawn lines on a [[item.chalked-harness|chalked harness]], every five to nine days, forever',
        'Vault and archive protection wherever a city can afford the rounds',
        'Payment: the Fetterhouse settles foreign favours in chalk rather than coin',
      ],
      tradeValue: '7 day-wages the stick at third grade, 34 at first, and only the log says which you have',
      tradeNotes:
        'The awkward fact under the whole ledger: the city that binds the continent digs none of its own marl. It buys the annual cut from the Anvil Shelf years in advance, which is a standing debt to a supplier it does not control, and the [[faction.mooring-assize|Assize]] knows exactly what that is worth. Black-market sticks are unlogged, ungraded and sold by people who will tell you they are first grade.',
      devNotes:
        PROPOSAL('Grading in tonnage-seconds, the burner exposure rota, and the levin-salt charge on first grade are proposed. The last of those is what gives [[quest.the-chalk-that-lies|The Chalk That Lies]] a physical mechanism: an adulterated first grade is one fired with cut salt, and the fraud is upstream in the salt vats rather than in the kiln.'),
    },
  }),

  E({
    id: 'material.levin-salt',
    type: 'material',
    name: 'Levin Salt',
    status: 'draft',
    summary: 'Crystallised charge grown from Scar brine: the world\'s only portable store of magical work, sold by the grain.',
    tags: ['magic', 'currency', 'contraband', 'taxed'],
    fields: {
      overview:
        'Brine drawn under ward from [[deposit.brine-sinks|the Brine Sinks]] and crystallised in the vat sheds of [[city.magic-city|the Magic City]], where it can be weighed and taxed before it goes anywhere. A grain holds about as much worked charge as a licensed caster can discharge in an afternoon, and unlike a caster it can be put in a box.\n\nIt is the only portable store of magical work anyone has, which makes it the closest thing to a magical currency, which is exactly why it is weighed, sealed and taxed at every gate it passes. Unsealed salt is contraband even in the cities where sealed salt is perfectly legal.',
      origin: 'Anomalous',
      sourceRegion: [REGION.aethericScar],
      rarity: 'Rare',
      properties: [
        'Discharges over about four seconds when the crystal is broken; it cannot be metered out slowly',
        'Loses roughly a fortieth of its charge a month in a sealed tube, faster in a warm one',
        'Salt cut with [[material.pan-nitre|pan nitre]] discharges unevenly and is the cause of most vat-shed injuries',
        'Sealed weight is legal weight: the tube seal, not the salt, is what a gate inspects',
        'Accrues no [[mechanic.the-toll|Toll]] on the user, which is the entire reason it is worth what it is worth',
      ],
      composition: 'A crystallised nitrate lattice carrying charge in the lattice itself, on a carrier salt of contested purity',
      appearance: 'Colourless, sharp-edged, with a violet flicker deep in a large crystal when it is moved',
      extraction:
        'Brine is drawn from the sinks under a laid ward by crews who work to a bell and leave when it rings. The sinks are on the southern lip of the Scar and the gradient there is survivable rather than safe: [[skill.scar-reading|Scar Reading]] is the gate on the work, and a crew without one is a crew that comes back short.',
      refinement:
        'Vat-grown under ward in the salt vats, seeded, drawn down over nine days and harvested wet. The contested question is the carrier: the Fetterhouse rule is Scar brine and nothing else, and the vat-masters cut with graded pan nitre because it nearly doubles the crystal yield. Cut salt looks identical, weighs the same and discharges unevenly, and the vat-masters have been doing it for long enough that nobody knows what a pure vat actually yields.\n\nA second, wholly illegal supply exists: saturated [[material.quenchspar|quenchspar]] blocks that should have been buried are cracked and leached instead. The yield is poor and the practice occasionally removes a shed.',
      machines: TBD('The salt vat sheds are the second most important industrial plant in the Magic City and have no machine entry. Whoever writes it should decide whether the ward on the vat is part of the machine.'),
      uses: [
        'Portable charge for licensed workings, sold by the grain and quoted daily',
        'The inlay compound in a [[item.bound-harness|bound harness]] and a trace in every [[item.ward-pin|ward pin]]',
        'First-grade [[material.ward-chalk|ward chalk]] firing, which is where most of the annual output actually goes',
        'Reserve store for [[skill.bleed-off|bleed-off]] sinks, so a licensed caster can work past their limit',
        'Settlement: the grain-weight of sealed salt is quoted alongside the stair writ',
      ],
      tradeValue: '120 day-wages the sealed grain, quoted daily; unsealed salt has no lawful price and a brisk market',
      tradeNotes:
        'Taxed at every gate on the continent by weight of the sealed tube, which means the tax is really a tax on the seal, which means the seal is what gets forged. [[faction.fetterhouse|The Fetterhouse]] controls the vats and the seals; [[faction.low-tally|the Low Tally]] moves the unsealed. [[quest.the-scar-concession|The Scar Concession]] is, underneath the politics, an argument about who gets to grow this.',
      devNotes:
        PROPOSAL('The nitre carrier, the four-second discharge and the quenchspar leaching route are proposed. The carrier proposal is the important one: it wires the Sifting City into the Magic City\'s supply chain, gives the chalk fraud a mechanism, and means an interruption in the Pans is felt as a magical shortage two regions away.') +
        '\n\nChain note: this is the middle node of the white chain. Raw is pan nitre and Scar brine, component is ward chalk and the ward pin.',
    },
  }),

  E({
    id: 'material.quenchspar',
    type: 'material',
    name: 'Quenchspar',
    status: 'draft',
    summary: 'Dull violet spar that drinks aetheric charge until it saturates, then fails all at once and takes the room with it.',
    tags: ['magic', 'sink', 'hazard', 'biogenic'],
    fields: {
      overview:
        'Violet seams in the rubble of [[deposit.cold-quarter|the Cold Quarter]], sawn out in blocks and set into discharge sinks all over [[city.magic-city|the Magic City]]. A block absorbs worked charge steadily and without complaint until it saturates, at which point it releases everything at once. There is no warning that anybody has found, which is why every sink is logged, dated and replaced early.\n\nSaturated blocks have to be walked out of the city and buried. The city charges for the burial, and the burial ground is where the next generation of seams appears, which is the part nobody has looked at properly.',
      origin: 'Hybrid',
      sourceRegion: [REGION.aethericScar],
      sourceCreature: ['creature.chalk-louse'],
      rarity: 'Scarce',
      properties: [
        'Absorbs roughly 400 discharge-units before saturation; the figure is a guild average, not a guarantee',
        'Saturation failure is total, instantaneous and lethal within about four metres',
        'Must be sawn wet and cold; a dry saw cut has taken the cutter and the shed together',
        'Grows in seams rather than being deposited, which the Fetterhouse has never explained publicly',
      ],
      composition: 'Massed mineralised carapace, proposed; the violet is in the shell layer, not the matrix',
      appearance: 'Dull violet, faintly fibrous in section, and it is always colder than the rock around it',
      extraction:
        'Sawn wet and only in winter, by cutters working in pairs on a logged block count. Pay is by the block that arrives whole, so a shattered block is a day lost, which pushes crews to saw slower and colder, which is the only reason the practice is survivable at all. [[faction.fetterhouse|The Fetterhouse]] holds the quarter and the log.',
      refinement:
        'Barely refined: squared, faced, drilled for the sink mounting, dated and set. The dating is the important step. A sink is rated in discharge-units, logged every time it is drawn on, and pulled at three quarters of its rating. Sinks pulled late are the largest single cause of death among ward trades in the city, ahead of the fault itself.',
      machines: TBD('Sinks are set by hand. Is there a machine entry for the discharge-sink array under the bound slabs, or is that infrastructure rather than a machine?'),
      uses: [
        'Discharge sinks for lawful [[skill.bleed-off|bleed-off]], which is how a licensed caster works past their limit',
        'Structural ballast in the Magic City, where a spent block is safe and heavy',
        'Backstop shielding around the chain-house and the fault approaches',
        'Illegally leached for [[material.levin-salt|levin salt]] by people who will not be doing it long',
      ],
      tradeValue: '48 day-wages the fresh block, and a fee of 14 to have a spent one taken away',
      tradeNotes:
        'Exported sparingly and always fresh, because nobody outside the Magic City can rate a used block honestly. Cities that buy it are buying a licensing regime along with the stone, and most of them do not realise that until the first sink comes due.',
      devNotes:
        PROPOSAL('The chalk-louse origin is the proposal: quenchspar is proposed as the massed, mineralised carapace of dead louse colonies, which explains why it "grows" in seams, why it drinks charge (the same property that makes ground carapace the base of anti-magic powder), why lice are drawn to ward chalk, and why fresh seams keep appearing in the burial ground.') +
        '\n\nHorror beat available and deliberately not spent here: if the burial ground is a nursery, then the Magic City has been feeding the thing that eats its wards for two hundred years. Left for whoever writes the Scar sites.',
    },
  }),

  E({
    id: 'material.faultglass',
    type: 'material',
    name: 'Faultglass',
    status: 'draft',
    summary: 'Green-black glass off the Bound Fault, each shard still holding a fragment of whatever event made it.',
    tags: ['magic', 'anomalous', 'capital-offence', 'dangerous'],
    fields: {
      overview:
        'Glass thrown off [[landmark.the-bound-fault|the Bound Fault]] in a slippage, cooling in seconds and holding something in it that has never been adequately described. A shard held against the ear gives a fragment of the event that made it, always the same fragment, always incomplete. Cutters sort the yard by ear because there is no other way to grade it, and they are deaf inside two years.\n\nNothing about this material is useful in a way a guild would recognise. It is worn, collected, prosecuted, and used to navigate, and that is the whole of its economy.',
      origin: 'Anomalous',
      sourceRegion: [REGION.aethericScar],
      rarity: 'Rare',
      properties: [
        'Each shard carries one fixed fragment of the event that formed it and never another',
        'Sorting is done by ear; there is no visual, chemical or weight test that works',
        'Leans measurably toward the Scar within about a day\'s march of it, and lies flatly nearer',
        'Sorted shards are inert to handle; unsorted shards are not, and that is what the capital charge is for',
        'Cannot be cut, ground or reworked without losing whatever it holds',
      ],
      composition: 'Fused Scar rock; every assay of it has come back as ordinary glass, which is the standing embarrassment',
      appearance: 'Green-black, conchoidal, with an interior that does not reflect light in the direction it should',
      extraction:
        'Collected off the slabs after a slippage by licensed pickers working the fall line with padded tongs, and by unlicensed pickers working it faster and closer. There is no seam and no deposit: the supply is entirely a function of how often the fault moves, which means the trade is a leading indicator that [[faction.fetterhouse|the Fetterhouse]] would very much rather nobody read.',
      refinement:
        'Not refined. Sorted, in the deaf yard at the eastern end of the district, by cutters who hold each shard to the ear and place it in one of four boxes. The boxes are: inert, speaks, speaks and leans, and the fourth box, which is not described in the ordinance and is emptied by the Fetterhouse. Cutters are recruited young, paid extremely well, and are done in two years.',
      machines: TBD('The deaf yard sorting is hand work by design. Should it stay that way, or is there a proposal for an instrument that does not cost a person their hearing?'),
      uses: [
        'Navigation: a [[item.faultstone-needle|faultstone needle]] leans toward the Scar and fails near it',
        'Jewellery in the Sky City crown houses, where a leaning shard is worn as a pendant',
        'Evidence and record, since a shard cannot be edited and a witness can',
        'Whatever is in the fourth box, which is not on the ordinance and is not on the manifest either',
      ],
      tradeValue: '200 day-wages the sorted shard where it is lawful; the unlawful price is not quoted in day-wages',
      tradeNotes:
        'Possession of unsorted faultglass outside the deaf yard is capital in [[city.magic-city|the Magic City]]. Possession in any form is capital in [[city.mediterranean-city|the Mediterranean City]], where the Conduit College classes it as an unlicensable working, and in [[city.gilded-ascent|the Gilded Ascent]], where a shard that speaks is treated as an instrument for voiding a contract by testimony.\n\nIt is a fashion in [[city.sky-city|the Sky City]], eleven hours from the Ascent by lift, where the crown houses wear it openly at dinner. Every Ascent factor who goes up has therefore watched their creditors commit a capital crime, and the Concord has decided at least four times not to mention it.',
      devNotes:
        PROPOSAL('The four sorting boxes, the fourth box, and the capital-in-three-cities-and-a-fashion-in-a-fourth split are proposed. The Sky City fashion is the useful part: it puts a capital offence in plain sight at a dinner party a party will attend, and makes the Ascent-Sky relationship legible as hypocrisy rather than as a table of tariffs.') +
        '\n\nDeliberately not answered: what the fourth box is for. That belongs to whoever writes the Bound Fault content, and it should stay a question until then.',
    },
  }),

  /* ------------------------------------------------------------------ */
  /* Deposits                                                            */
  /* ------------------------------------------------------------------ */

  E({
    id: 'deposit.nitre-flats',
    type: 'deposit',
    name: 'The Nitre Flats',
    status: 'draft',
    summary: 'Forty square miles of White Pans crust that rebuilds itself after every wet season, and rakes out bitter.',
    tags: ['salt', 'renewable', 'indenture'],
    fields: {
      overview:
        'The working ground of [[city.sifting-city|the Sifting City]]: an area of standing crust west of the tower line, staked in numbered blocks, raked out block by block over a season and left to rebuild through the next wet. Nobody has ever found the bottom of it. The constraint has never been the salt.\n\nThe constraint is water. Every pass down [[machine.the-sieve-cascade|the Sieve Cascade]] costs wash, wash is hauled eight days across the waste or lifted from three bores of which two still yield, and the crews are paid partly in draw. The flats are therefore infinite and the labour is not.',
      material: ['material.pan-nitre'],
      region: [REGION.whitePans],
      yieldTier: 'Exceptional',
      workedBy: 'Pan crews on eight-day rotations, six thousand four hundred of them on the tower rolls as bonded',
      access:
        'Open ground, marked with stakes, and lethal in a way that is entirely undramatic. The hazards are glare blindness, heat, the water ration, and live [[creature.salt-mason|salt mason]] crust that will not hold a standing crew. Beyond the marked stakes the far white is close to sterile and eight days from anything. [[npc.sahat-belek|Sahat Belek]] works out there alone and is the only reliable guide to it.\n\nAccess is not restricted, because it does not need to be. [[faction.pale-assay|The Pale Assay]] does not control who rakes; it controls who may stamp a barrel, which is the same thing with less expense.',
      devNotes:
        PROPOSAL('The block staking and the water-against-draw pay structure are proposed. Design intent: a resource that is genuinely unlimited, so that every conflict about it is about labour, water and grading rather than about scarcity. That makes it the odd one out in this set and it should stay that way.'),
    },
  }),

  E({
    id: 'deposit.blackfall-drifts',
    type: 'deposit',
    name: 'The Blackfall Drifts',
    status: 'draft',
    summary: 'Lee dunes where the wind has sorted iron-black sand out of the salt for several thousand years.',
    tags: ['ore', 'wind-sorted', 'licensed', 'indenture'],
    fields: {
      overview:
        'A crescent of dunes in the lee of the tower line where the prevailing wind has been dropping its heaviest fraction for longer than anyone has been counting. The black bands in the drift faces read like a section drawing and each band is a wet season. Below about nine metres the drifts have never been dug, because nobody has needed to.\n\nThis is the only known source of [[material.blackfall-sand|Blackfall Sand]] and therefore the only source of the buttons that make every wire-drawing die in the world.',
      material: ['material.blackfall-sand'],
      region: [REGION.whitePans],
      yieldTier: 'Rich',
      workedBy: 'Indentured picking crews off the tower rolls, working the faces bare-handed and tallied by the bag',
      access:
        'Physically trivial and legally locked. Anyone can walk onto the drifts. Nobody can do anything with a bag of sand except sell it to one of three licensed crucible sheds, and the three licences have passed by inheritance since they were issued and have never been sold or reissued.\n\nThe faces slump, most reliably in the hour after a wet-season shower, which is the only hour the work is bearable. Crews know. Bosses know. The bag count does not change.',
      devNotes:
        PROPOSAL('The nine-metre unworked depth is proposed as a deliberate hook: the drifts are not close to exhausted, so the scarcity of buttons is entirely a licensing artefact. A player faction that acquires or breaks a shed licence changes the price of every cable and spring on the continent.'),
    },
  }),

  E({
    id: 'deposit.sour-lodes',
    type: 'deposit',
    name: 'The Sour Lodes',
    status: 'draft',
    summary: 'Shallow scaldstone lodes along the southern Ironback: rich, cheap, foul to work, and held by nobody.',
    tags: ['ore', 'iron', 'unclaimed', 'lung-rot'],
    fields: {
      overview:
        'A run of shallow sulphide lodes along the southern flank of [[region.ironback-range|the Ironback Range]], worked out of adits a man can walk into upright, by perhaps thirty small operations that have never once agreed on anything. The ore is abundant and worthless in the ground, because unroasted [[material.scaldstone|scaldstone]] ruins a furnace charge.\n\nThe leverage is downwind. Whoever owns the roast yards owns basin steel, and no faction on the continent has worked that out yet. It is the only major deposit in the world with no charter, no assize and no guild sitting on it.',
      material: ['material.scaldstone'],
      region: [REGION.ironback],
      yieldTier: 'Rich',
      workedBy: 'Debt gangs walked up from the basin on season contracts that quietly do not cover the walk back',
      access:
        'Open to anyone who can get a gang up the North Fork and keep them fed through a winter, which is the actual barrier. The pass closes without warning; the range kills a predictable number every year; and the roast fume kills grazing four hundred paces downwind, permanently, which is why the yards sit where nobody farms.\n\nThe yard cough arrives in two seasons and the yard lung in five. Nobody has ever proposed a covered roast because the turners cost nothing.',
      devNotes:
        PROPOSAL('An ungoverned strategic deposit is the proposal and it is deliberate. Every other deposit in this module is held by a named faction; this one is not, so it is the available prize. A party with [[skill.chartering|Chartering]] and enough capital can take the roast yards and become upstream of four cities, and nobody will stop them until it is far too late.') +
        '\n\nOpen question for the conflict authors: which faction notices first, and what do they do about a party that got there before them?',
    },
  }),

  E({
    id: 'deposit.bloom-cuts',
    type: 'deposit',
    name: 'The Bloom Cuts',
    status: 'draft',
    summary: 'Numbered marsh pits across the Drown that refill with bog iron on a twenty-year rotation.',
    tags: ['ore', 'renewable', 'delta', 'toll'],
    fields: {
      overview:
        'Several hundred numbered pits across the delta, cut in the four dry weeks, dried on stilt racks and rafted downriver. A pit worked clean refills in about twenty years, faster where a living mat has closed over it, which makes this the only ore body in the world that grows back inside a working life.\n\nThe numbering is the rotation and the rotation is enforced by nothing except who gets a raft through the gates. That places the pits, functionally, in the hands of [[faction.iron-sluice-company|the Iron Sluice Company]] rather than the crews that cut them.',
      material: ['material.mire-bloom'],
      region: [REGION.theDrown],
      yieldTier: 'Modest',
      workedBy: 'Pit crews from the raft clans, wading barefoot in opaque water for four weeks a year',
      access:
        'Reached by punt in the dry weeks and by nothing at all the rest of the year. The pit floor is felt for with the feet because the water cannot be seen through, which is how the fluke gets in and why delta crews go blind young if they eat the wrong fish as well.\n\nEvery raft is tolled at [[landmark.the-weir-gates|the Weir Gates]] before it reaches a hammer. A closed gate is a lost season, and a mistimed release drowns a rack.',
      devNotes:
        PROPOSAL('The twenty-year rotation and the mat-accelerated regrowth are proposed. The design point is that this deposit rewards restraint and punishes it at the same time: a clan that respects the rotation still loses its take at the gates, so conservation is only rational for whoever controls the river.'),
    },
  }),

  E({
    id: 'deposit.canebrakes',
    type: 'deposit',
    name: 'The Canebrakes',
    status: 'draft',
    summary: 'Standing glasscane in the Drown\'s brackish reach, cut in winter and floated out by the raft.',
    tags: ['cane', 'renewable', 'delta', 'seasonal'],
    fields: {
      overview:
        'Miles of standing [[material.glasscane|glasscane]] in the brackish middle reach, cut in winter when the sap is down and the fever is quiet, bundled into floats and taken downriver. The brakes regrow in three years, which nobody disputes, and the cutting rights are argued about every single season regardless.\n\nThe same brakes carry the wet-season [[material.mirelac|mirelac]] crop, so one stand of cane is two industries on two calendars, worked by two sets of crews who are frequently the same people.',
      material: ['material.glasscane'],
      region: [REGION.theDrown],
      yieldTier: 'Rich',
      workedBy: 'Cutting crews of the raft clans under lots drawn by [[faction.moorstone-compact|the Moorstone Compact]]',
      access:
        'Chest-deep, opaque, and full of things that bite. [[skill.marsh-footing|Marsh Footing]] is the gate on working it at all; the cane itself blunts a blade in an afternoon and puts glass splinters into every hand that touches it. Cut ends must be dipped in hot mirelac before the day is out or the stem rots from the cut.\n\nAccess is by mooring lot, which means it is decided by the lot draw, which means it is decided by whoever the Compact owes.',
      devNotes:
        PROPOSAL('The winter-cut and wet-season-scrape double calendar is proposed, and it is what makes the brakes worth fighting over twice a year. It also means a faction that wins the cane lots inherits the lacquer crop by accident, which is a good way for a player faction to acquire a problem it did not want.'),
    },
  }),

  E({
    id: 'deposit.standing-fifty',
    type: 'deposit',
    name: 'The Standing Fifty',
    status: 'draft',
    summary: 'The last fifty mature blackbole trunks in the Greatwood outside the Tree City\'s own walls.',
    tags: ['timber', 'finite', 'licensed', 'politics'],
    fields: {
      overview:
        'Fifty trunks. Not an estimate, a count, kept by three parties who agree on nothing else and who have each checked the others\' numbers within living memory. They are the only mature [[material.blackbole-timber|blackbole timber]] left standing in the Greatwood outside the walls of [[city.tree-city|the Tree City]], and each one is three centuries old.\n\nEvery felling licence is a council vote. The count is the only number in the Greatwood every faction agrees on, and it goes down and never up.',
      material: ['material.blackbole-timber'],
      region: [REGION.greatwood],
      yieldTier: 'Trace',
      workedBy: 'Marshalcy felling crews of forty, under licence, fourteen days a trunk',
      access:
        'Guarded rather than owned. [[faction.pitchguard|The Pitchguard]] patrols the fifty and uses them as the pretext for every extension of its patrol range, which is most of what the patrol range is for. Approaching one without a licence is treated as intent to poach and prosecuted accordingly.\n\nSix of the fifty have [[creature.bolewright-wasp|bolewright]] galleries opened in the heartwood and are quietly not counted as fellable any more, which nobody has yet said out loud in council. When it is said, the number is forty-four, and three factions will have been voting on a fiction.',
      devNotes:
        PROPOSAL('The exact count, the shared audit and the six infested trunks are proposed. The design purpose is a strategic resource that is a countable integer: players can know the number, change the number, and watch a political system react to a number changing, which is far more legible than a tonnage.') +
        '\n\nQuest hook: whoever reveals the six infested trunks resets Greatwood politics overnight, and the reveal is available to anyone who can get a boring auger into a trunk without being shot.',
    },
  }),

  E({
    id: 'deposit.ward-marls',
    type: 'deposit',
    name: 'The Ward Marls',
    status: 'draft',
    summary: 'Shallow ward-chalk beds under the turf of the Anvil Shelf, cut out in blocks by the cartload.',
    tags: ['magic', 'marl', 'forward-sold', 'debt'],
    fields: {
      overview:
        'Beds of pale marl a spade\'s depth under the shelf turf, cut out in blocks and carted to the lip. The work is unskilled and the beds are extensive, which makes this the easiest deposit in this module to work and the most politically loaded one to own.\n\nEverything the world binds is chalked in what comes out of here. [[city.magic-city|The Magic City]] cannot dig its own and has bought the annual cut years forward, which means the city that holds the continent\'s slabs up is a standing debtor to a turf-cutting operation on somebody else\'s plateau.',
      material: ['material.ward-chalk'],
      region: [REGION.anvilShelf],
      yieldTier: 'Rich',
      workedBy: 'Shelf-foot gangs on day rates, cutting to a quota set years in advance by a buyer they never meet',
      access:
        'Easy ground, brutal weather. Bare pavement, frost-shattered scree and a wind that stops work most afternoons. Water has to be hauled up or found at the scarp foot, which is a live question on the shelf generally.\n\nThe cut is sold forward by [[faction.mooring-assize|the Mooring Assize]], so access to the marl and access to the contract are two entirely different problems. Stealing marl is trivial and pointless; the value is in the delivery obligation, not the mineral.',
      devNotes:
        PROPOSAL('Forward sale as the actual instrument of control is proposed. It makes this deposit unusual in the set: the physical resource is unguarded and worthless to steal, and the thing worth attacking is a piece of paper in a counting house. Good target for a Tongue & Coin party rather than a Body & Blade one.'),
    },
  }),

  E({
    id: 'deposit.ash-quarries',
    type: 'deposit',
    name: 'The Ash Quarries',
    status: 'draft',
    summary: 'Cinder ash beds above the Meridian olive terraces: free to dig, worthless without a kiln.',
    tags: ['cement', 'open-cast', 'guild-secret'],
    fields: {
      overview:
        'Beds of old cinder ash lying above the terraced groves, deep, extensive and open to anyone with a shovel and a barrow. There is no fence, no licence and no guard, and the [[faction.conduit-college|Conduit College]] has never seen a reason to change that.\n\nThe ash is the bulk feedstock for [[material.tideset-cement|tideset cement]] and is completely inert without the calcining kilns, which are guild property and guild secret. This deposit is the clearest single statement of how the Mediterranean City makes money: give away the material, own the process.',
      material: ['material.tideset-cement'],
      region: [REGION.meridianCoast],
      yieldTier: 'Exceptional',
      workedBy: 'Anyone. In practice, terrace families digging between harvests and selling by the cart at the kiln gate',
      access:
        'Genuinely open. The only hazards are the slope, the dust, which is silicotic over decades, and the fact that a cart of ash sells for almost nothing because there is exactly one buyer within four hundred leagues.\n\nThe interesting access problem is upward, into the kiln house, and the College knows precisely how many people have tried.',
      devNotes:
        PROPOSAL('Nothing here contradicts the existing Mediterranean entry, which already establishes the free quarry and the secret kilns. What this deposit adds is the silicosis and the single-buyer economics, so that "open to anyone" reads as a trap rather than as generosity.'),
    },
  }),

  E({
    id: 'deposit.brine-sinks',
    type: 'deposit',
    name: 'The Brine Sinks',
    status: 'draft',
    summary: 'Charged brine standing in sinkholes along the Aetheric Scar\'s southern lip; the source of all levin salt.',
    tags: ['magic', 'brine', 'hazard', 'licensed'],
    fields: {
      overview:
        'A line of sinkholes along the southern lip of [[region.aetheric-scar|the Aetheric Scar]], each holding still, clear, faintly violet brine that is carrying charge and has been for as long as anyone has looked. Drawn under a laid ward and carted to the vat sheds, it is the only source of [[material.levin-salt|levin salt]] in the world.\n\nThere is no known second source, no way to make the brine, and no agreed explanation for why the sinks recharge. They do recharge. That is the extent of what is established.',
      material: ['material.levin-salt'],
      region: [REGION.aethericScar],
      yieldTier: 'Rich',
      workedBy: 'Fetterhouse draw crews working to a bell, with a ward-keeper and a [[skill.scar-reading|Scar Reading]] hand on every shift',
      access:
        'Restricted absolutely by [[faction.fetterhouse|the Fetterhouse]], which draws under ward, weighs at the sink and seals before the cart moves. The gradient at the lip is survivable rather than safe and shifts without warning; the bell is rung by the reader, and a crew that argues with the bell is a crew that does not come back.\n\nUnsealed brine leaving the sinks is contraband before it is even salt, which is a legal position the Fetterhouse invented and has never had challenged.',
      devNotes:
        PROPOSAL('The recharge is deliberately left unexplained: it is the one place in this module where a genuine anomaly sits without a mechanism, and [[quest.the-scar-concession|The Scar Concession]] is an auction of a thing nobody understands. If a later author explains it, the auction becomes a much smaller story.') +
        '\n\nOpen question: is the recharge rate constant? If it is falling, every price in the magical economy is wrong and the Fetterhouse is the only body that would know.',
    },
  }),

  E({
    id: 'deposit.cold-quarter',
    type: 'deposit',
    name: 'The Cold Quarter',
    status: 'draft',
    summary: 'A still, north-facing sector of the Scar where quenchspar grows in violet seams through the rubble.',
    tags: ['magic', 'hazard', 'winter-work', 'biogenic'],
    fields: {
      overview:
        'A north-facing sector of the Scar where the gradient is unusually quiet and the rubble is threaded with violet seams of [[material.quenchspar|quenchspar]]. Cutters work it wet, in winter, in pairs, on a logged block count, and are paid by the block that arrives whole.\n\nThe seams grow. Not accrete, grow, and the working faces of forty years ago are seamed again. The Fetterhouse records the fact in the block log and has never published a word about it.',
      material: ['material.quenchspar'],
      region: [REGION.aethericScar],
      yieldTier: 'Modest',
      workedBy: 'Paired Magic City cutters on winter contracts, paid by the whole block and not by the hour',
      access:
        'Fetterhouse licence, winter only, and never alone. Wet sawing is mandatory: a dry cut has taken a cutter and a shed together within living memory. The quarter is cold in a way the surrounding Scar is not, which is the first thing anyone notices and the last thing anyone has explained.\n\nThe burial ground for saturated blocks is three miles east of the working faces, and the newest seams are closest to it.',
      devNotes:
        PROPOSAL('The seams regrowing near the burial ground is the proposal and it is the quiet horror in this module. It follows from the chalk-louse origin proposed on [[material.quenchspar|quenchspar]]: buried saturated blocks are a nursery, and the Magic City has been reseeding its own hazard for two centuries while charging for the privilege.') +
        '\n\nLeft for the Scar site authors: what a live colony looks like, and whether anyone has ever seen one.',
    },
  }),

  E({
    id: 'deposit.lantern-beds',
    type: 'deposit',
    name: 'The Lantern Beds',
    status: 'draft',
    summary: 'Sunwell mica bands in the deep karst galleries, followed by lamplight along the bedding planes.',
    tags: ['mineral', 'optics', 'karst', 'guild'],
    fields: {
      overview:
        'Bands of [[material.sunwell-mica|sunwell mica]] running through the deep galleries below [[city.cave-agrarian-city|the Cave Agrarian City]], followed rather than mined: the gallery goes where the band goes, which is why the deep karst map looks less like a mine and more like a nervous system.\n\nEverything above ground in the cave city depends on what is cleaved down here. Two lower galleries have been dark for over a year after a duct collapse, and the replacement leaves have to come out of these beds before anything can be fixed.',
      material: ['material.sunwell-mica'],
      region: [REGION.hollowKarst],
      yieldTier: 'Rich',
      workedBy: 'Mirror Assembly cleavers working lying down by lamplight, paid by the usable leaf',
      access:
        'Deep, warm, wet and worked by permit from [[faction.mirror-assembly|the Mirror Assembly]], which holds the cleaving and the silvering both. A cleaver on a good band lies on his side for six hours at a stretch on a cut ledge; a cough at the wrong moment loses a leaf and a leaf is a day.\n\nThe hazards below are ordinary: falls, foul air in the dead ends, and flooding in the wet season. The hazard above is the silvering shed, and it kills more of them than the beds do.',
      devNotes:
        PROPOSAL('Following the band rather than driving a level is proposed and it explains the shape of the deep karst: an irregular, badly mapped, opportunistically dug network is exactly the dungeon geography a designer wants, and it arrives for an economic reason rather than by fiat.') +
        '\n\nDirect hook: [[quest.who-gets-the-light|Who Gets the Light]] cannot be resolved generously without replacement leaves, and the leaves come from here.',
    },
  }),

  E({
    id: 'deposit.moult-fields',
    type: 'deposit',
    name: 'The Moult Fields',
    status: 'draft',
    summary: 'Burrow country on the Ashen Steppe where the burrowers shed scute and rebury it each spring.',
    tags: ['chitin', 'seasonal', 'arena', 'child-labour'],
    fields: {
      overview:
        'Rolling burrow country north-east of [[city.arena-city|the Arena City]], where the steppe burrowers shed their carapace each spring and rebury the plate in side chambers off their own runs. For six weeks a year it is the only genuine natural resource the Arena City has. For the other forty-six it is empty grazing that nobody claims.\n\nThe plate has to be fetched out of live burrows, which means crews small enough to fit, which means the crews are children and small adults on season contracts.',
      material: ['material.steppe-scute'],
      region: [REGION.ashenSteppe],
      yieldTier: 'Modest',
      workedBy: 'Season crews chosen for size, on lines, with a lamp and a hooked pole, for six weeks',
      access:
        'Open steppe with no owner and one buyer. [[faction.red-writ|The Red Writ]] contracts the whole take before the season opens at a price fixed in advance, so the ground is free and the market is not.\n\nBurrows collapse. They collapse most in a wet spring, which is also the best gathering year. Nobody shores a burrow because the season is six weeks and the price is already agreed, and the arithmetic of that has never once favoured slowing down.',
      devNotes:
        PROPOSAL('The forward-fixed price and the size-selected crews are proposed together, because one causes the other: a fixed price with a six-week window makes speed the only variable, and speed underground is paid for in children. Write the consequences of a collapse through the families and the contract, never as a set piece.') +
        '\n\nOpen to the bestiary author: what does a crew meet in an occupied burrow, and is the animal defending the plate or indifferent to it?',
    },
  }),
]

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const relations: SeedRelation[] = [
  /* Deposits sit in regions ---------------------------------------- */
  R('deposit.nitre-flats', 'located_in', REGION.whitePans, 'forty square miles west of the tower line'),
  R('deposit.blackfall-drifts', 'located_in', REGION.whitePans, 'the lee crescent behind the towers'),
  R('deposit.sour-lodes', 'located_in', REGION.ironback, 'the southern flank, above the North Fork'),
  R('deposit.bloom-cuts', 'located_in', REGION.theDrown, 'several hundred numbered pits'),
  R('deposit.canebrakes', 'located_in', REGION.theDrown, 'the brackish middle reach'),
  R('deposit.standing-fifty', 'located_in', REGION.greatwood, 'outside the Tree City palisade'),
  R('deposit.ward-marls', 'located_in', REGION.anvilShelf, 'a spade\'s depth under the shelf turf'),
  R('deposit.ash-quarries', 'located_in', REGION.meridianCoast, 'above the olive terraces'),
  R('deposit.brine-sinks', 'located_in', REGION.aethericScar, 'the southern lip'),
  R('deposit.cold-quarter', 'located_in', REGION.aethericScar, 'the still north-facing sector'),
  R('deposit.lantern-beds', 'located_in', REGION.hollowKarst, 'the deep galleries, followed by lamplight'),
  R('deposit.moult-fields', 'located_in', REGION.ashenSteppe, 'burrow country north-east of the Ring'),

  /* Deposits yield materials --------------------------------------- */
  R('deposit.nitre-flats', 'produces', 'material.pan-nitre', 'raked wet, dried on boards, graded in six cuts'),
  R('deposit.blackfall-drifts', 'produces', 'material.blackfall-sand', 'hand-picked off the drift faces, tallied by the bag'),
  R('deposit.sour-lodes', 'produces', 'material.scaldstone', 'adit-mined and worthless until roasted'),
  R('deposit.bloom-cuts', 'produces', 'material.mire-bloom', 'four dry weeks a year, on a twenty-year rotation'),
  R('deposit.canebrakes', 'produces', 'material.glasscane', 'cut in winter and floated out in bundled rafts'),
  R('deposit.canebrakes', 'produces', 'material.mirelac', 'the same stand, scraped in the wet season'),
  R('deposit.standing-fifty', 'produces', 'material.blackbole-timber', 'fifty trunks, and each felling is a council vote'),
  R('deposit.ward-marls', 'produces', 'material.ward-chalk', 'blocks by the cartload, sold years forward'),
  R('deposit.ash-quarries', 'produces', 'material.tideset-cement', 'the ash only; the kilns are elsewhere and secret'),
  R('deposit.brine-sinks', 'produces', 'material.levin-salt', 'drawn under ward and sealed before the cart moves'),
  R('deposit.cold-quarter', 'produces', 'material.quenchspar', 'sawn wet, in winter, in pairs'),
  R('deposit.lantern-beds', 'produces', 'material.sunwell-mica', 'cleaved by hand, paid by the usable leaf'),
  R('deposit.moult-fields', 'produces', 'material.steppe-scute', 'a six-week season and no way to store the rest'),

  /* Chain one: the iron chain -------------------------------------- */
  R('material.scaldstone', 'refines_into', 'material.blister-bar', 'roasted nine to fourteen days, blown to bloom, then cemented'),
  R('material.mire-bloom', 'refines_into', 'material.blister-bar', 'hammered to bar at the Weir, then cemented to hide the phosphorus'),
  R('material.blackbole-timber', 'refines_into', 'material.blister-bar', 'as cementation charcoal: the carbon in basin steel is Greatwood carbon'),
  R('material.blister-bar', 'refines_into', 'material.stairwire', 'drawn to wire in eleven passes, then laid six by nineteen'),
  R('material.stairwire', 'requires', 'material.blackfall-button', 'the drawing dies, rented by the shift and returned worn'),

  /* Chain two: the white chain ------------------------------------- */
  R('material.pan-nitre', 'refines_into', 'material.clearcast-glass', 'sixth cut only; one adulterated barrel spoils a month of casting'),
  R('material.pan-nitre', 'refines_into', 'material.levin-salt', 'PROPOSAL: graded nitre as vat carrier salt, which the Fetterhouse rule forbids'),
  R('material.levin-salt', 'refines_into', 'material.ward-chalk', 'a charge fired into first-grade sticks; cut salt is why a batch lies'),
  R('material.pan-nitre', 'refines_into', 'material.orrery-bronze', 'the heavy fraction screened out of raw crust is the coast\'s copper feed'),

  /* Other refining edges ------------------------------------------- */
  R('material.blackfall-sand', 'refines_into', 'material.blackfall-button', 'eleven days of banked crucible per fifty grams'),
  R('material.quenchspar', 'refines_into', 'material.levin-salt', 'saturated blocks cracked and leached instead of buried; illegal and occasionally fatal', true),
  R('material.blister-bar', 'requires', 'material.blackfall-button', 'cutting edges diffusion-welded onto an ordinary steel body'),

  /* Materials to the machines that make them ----------------------- */
  R('material.pan-nitre', 'crafted_at', 'machine.the-sieve-cascade', 'nine graded screens, and every pass costs water'),
  R('material.pan-nitre', 'crafted_at', 'machine.the-bittern-ladder', 'the liquor fraction, laddered into soda ash and bittern'),
  R('material.blackfall-sand', 'crafted_at', 'machine.the-sieve-cascade', 'dropped out early as the heavy fraction'),
  R('material.mire-bloom', 'crafted_at', 'machine.the-sluice-hammers', 'beaten into merchant bar of a stamped weight'),
  R('material.blister-bar', 'crafted_at', 'machine.the-sluice-hammers', 'bar stock before the cementation chests'),
  R('material.stairwire', 'crafted_at', 'machine.the-drawbench-vaults', 'eleven passes, annealed between'),
  R('material.stairwire', 'crafted_at', 'machine.the-strand-loom', 'laid in one length; a splice is weaker than the lay'),
  R('material.orrery-bronze', 'crafted_at', 'machine.the-verdigris-hearth', 'chill-cast, then aged eighteen months under a dated tag'),
  R('material.orrery-bronze', 'crafted_at', 'machine.the-drawbench-vaults', 'drawn tube and rod for instrument work'),
  R('material.clearcast-glass', 'crafted_at', 'machine.the-frit-kiln', 'cast flat and annealed six weeks in a lehr that must not be opened'),
  R('material.ward-chalk', 'crafted_at', 'machine.the-ward-kilns', 'fired in a live fault field, logged kiln, batch, grade and burner'),
  R('material.sunwell-mica', 'crafted_at', 'machine.the-mirror-ducts', 'silvered leaves, stripped and re-silvered on a ninety-day rota'),
  R('material.blackbole-timber', 'crafted_at', 'machine.the-pitchworks', 'stumpwood and sapwood to pitch, spirit and hard charcoal'),
  R('material.blackbole-timber', 'crafted_at', 'machine.the-limb-press', 'steamed staves laminated with hot pitch'),
  R('material.glasscane', 'crafted_at', 'machine.the-limb-press', 'split spar stock scarfed under the same press'),

  /* Cities producing ----------------------------------------------- */
  R(CITY.siftingCity, 'produces', 'material.blackfall-sand', 'picked off the drift faces by crews on the tower rolls'),
  R(CITY.gildedAscent, 'produces', 'material.stairwire', 'laid on the ropewalks of the Hoist Yards, and exported'),
  R(CITY.blackWeir, 'produces', 'material.blister-bar', 'cemented in charcoal sheds beside the hammers; PROPOSAL'),
  R(CITY.treeCity, 'produces', 'material.blister-bar', 'the charcoal half of it, which is the half that binds'),
  R(CITY.mediterranean, 'produces', 'material.stairwire', 'drawn wire rod only; the laying is done elsewhere'),
  R(CITY.floatingSwamp, 'produces', 'material.glasscane', 'split and steamed on the Cane Yards before it goes upriver'),

  /* Cities consuming ----------------------------------------------- */
  R(CITY.gildedAscent, 'consumes', 'material.scaldstone', 'basin forges and the cementation trade'),
  R(CITY.gildedAscent, 'consumes', 'material.glasscane', 'scaffolding, staging and every temporary structure on the terraces'),
  R(CITY.gildedAscent, 'consumes', 'material.blackbole-timber', 'hoist frames, sheave blocks and vault doors'),
  R(CITY.gildedAscent, 'consumes', 'material.ward-chalk', 'bonded vault and archive lines, redrawn each season'),
  R(CITY.gildedAscent, 'consumes', 'material.tideset-cement', 'foundations above the fourth terrace, where stone is cheaper than the premium'),
  R(CITY.gildedAscent, 'consumes', 'material.orrery-bronze', 'aged blanks for the Tally Engine, and the tags are kept'),
  R(CITY.skyCity, 'consumes', 'material.blister-bar', 'fittings, and every gram of it is on the mass warrant'),
  R(CITY.skyCity, 'consumes', 'material.stairwire', 'it lays cable and it eats cable; the race is being lost'),
  R(CITY.skyCity, 'consumes', 'material.faultglass', 'sorted shards, worn at dinner, capital eleven hours downhill'),
  R(CITY.mediterranean, 'consumes', 'material.scaldstone', 'the roasted ore the coast will not roast itself'),
  R(CITY.mediterranean, 'consumes', 'material.glasscane', 'staging, tube and the cheap end of everything'),
  R(CITY.mediterranean, 'consumes', 'material.blackfall-button', 'rented dies, and two failed attempts to make its own'),
  R(CITY.mediterranean, 'consumes', 'material.quietmilk', 'licensed to registered cutters, counted by the seal'),
  R(CITY.treeCity, 'consumes', 'material.stairwire', 'span cables and bridge mains, imported and condemned locally'),
  R(CITY.treeCity, 'consumes', 'material.scaldstone', 'the armoury hearths, and the Marshalcy prefers to buy ore not steel'),
  R(CITY.caveAgrarian, 'consumes', 'material.sunwell-mica', 'two thousand leaves to a gallery, and two galleries are dark'),
  R(CITY.caveAgrarian, 'consumes', 'material.clearcast-glass', 'lamp glazing and the instrument trade up the incline'),
  R(CITY.caveAgrarian, 'consumes', 'material.blackbole-timber', 'gallery props and the incline beds'),
  R(CITY.caveAgrarian, 'consumes', 'material.tideset-cement', 'cut cisterns, sluice linings and siphon crowns'),
  R(CITY.caveAgrarian, 'consumes', 'material.cudmother', 'every terrace, every season, and it cannot be stockpiled'),
  R(CITY.siftingCity, 'consumes', 'material.blackfall-sand', 'three sheds, four crucibles each, and no more sheds ever'),
  R(CITY.siftingCity, 'consumes', 'material.blister-bar', 'rake heads, screen frames and the tower ironwork'),
  R(CITY.siftingCity, 'consumes', 'material.blackbole-timber', 'every tower raft and every shutter'),
  R(CITY.arenaCity, 'consumes', 'material.steppe-scute', 'the whole take, bought forward before the season opens'),
  R(CITY.arenaCity, 'consumes', 'material.quietmilk', 'sold by the cup ringside and regulated nowhere'),
  R(CITY.magicCity, 'consumes', 'material.ward-chalk', 'its own output, drawn on its own walls, first'),
  R(CITY.magicCity, 'consumes', 'material.quenchspar', 'discharge sinks, pulled at three quarters of rating'),
  R(CITY.magicCity, 'consumes', 'material.pan-nitre', 'PROPOSAL: vat carrier salt the Fetterhouse rule says is not used'),
  R(CITY.magicCity, 'consumes', 'material.scaldstone', 'chain stock for the fault links, and the alloy has been shorted'),
  R(CITY.magicCity, 'consumes', 'material.blister-bar', 'chain-smith stock, and it is not enough of it'),
  R(CITY.floatingSwamp, 'consumes', 'material.mirelac', 'roofs, rafts, rope and every cut cane end before nightfall'),
  R(CITY.floatingSwamp, 'consumes', 'material.blister-bar', 'imported, and resented at the price'),
  R(CITY.blackWeir, 'consumes', 'material.scaldstone', 'roasted ore rafted down for the hammers'),
  R(CITY.blackWeir, 'consumes', 'material.stairwire', 'gate hoists and gantry runs; PROPOSAL city, keep to sluices and gantries'),
  R(CITY.orath, 'consumes', 'material.pan-nitre', 'powder and shot posted daily on the ration board'),

  /* Biology, regulation and the arguments between modules ---------- */
  R('material.blackfall-sand', 'related_to', 'creature.salt-mason', 'the drifts are several thousand years of dead colony, sorted by weight'),
  R('material.pan-nitre', 'related_to', 'creature.salt-mason', 'live crust will not hold a standing crew, and the bosses tell it by sound'),
  R('material.mire-bloom', 'related_to', 'creature.raftbloom', 'PROPOSAL: iron precipitates fastest under a living mat, so pontoons and ore compete'),
  R('material.tideset-cement', 'requires', 'creature.smoker-whale', 'the sulphur ferment dose, bought by the barrel and never named'),
  R('material.mirelac', 'requires', 'creature.verdigris-whelk', 'the coast\'s conduit lacquer is boiled mirelac cut with whelk liquor; neither works alone'),
  R('material.quenchspar', 'related_to', 'creature.chalk-louse', 'PROPOSAL: quenchspar is massed mineralised carapace, which is why it drinks charge'),
  R('material.ward-chalk', 'related_to', 'creature.chalk-louse', 'they eat cured chalk and void a warded quarter overnight'),
  R('material.sparbone', 'related_to', 'creature.loftwrack', 'culled raft-strut sold as low-grade sparbone; identical to look at, a third of the load'),
  R('material.blackbole-timber', 'related_to', 'creature.bolewright-wasp', 'a bole that sounds hollow is condemned and burnt where it stands'),
  R('material.scaldstone', 'related_to', 'creature.slagbuck', 'a herd range read carefully is a free ore survey'),
  R('material.cudmother', 'related_to', 'creature.mirror-swift', 'guano is the other half of karst soil, and a soured line is re-seeded from it'),
  R('material.quietmilk', 'related_to', 'spell.stillwater-draught', 'the draught stops the body, the milk stops the pain; confusing them kills'),

  /* Materials to the systems that regulate them --------------------- */
  R('material.ward-chalk', 'related_to', 'mechanic.ward-load', 'the consumable that mechanic runs on; a missed round drops a slab'),
  R('material.levin-salt', 'related_to', 'mechanic.the-toll', 'the only store of work that accrues no Toll on the user'),
  R('material.pan-nitre', 'related_to', 'mechanic.the-sift-line', 'six cuts, and the rarest rides the last mesh'),
  R('material.sunwell-mica', 'related_to', 'mechanic.the-mirror-rota', 'lumen-hours are only allocable because the leaves hold figure'),
  R('material.stairwire', 'related_to', 'mechanic.mass-warrant', 'rated in tonnes, re-rated on inspection, and the inspection is buyable'),
  R('material.steppe-scute', 'related_to', 'mechanic.ring-bond', 'kit cheap enough to lose, failing in ways a crowd can see'),

  /* Quest and NPC pressure points ---------------------------------- */
  R('material.ward-chalk', 'involves', 'quest.the-chalk-that-lies', 'the adulterated batch is a first grade fired with cut salt'),
  R('material.pan-nitre', 'involves', 'quest.pan-fever', 'the fraction that pays best is the fraction the crews keep breathing'),
  R('material.levin-salt', 'involves', 'quest.the-scar-concession', 'the auction is about who gets to grow it'),
  R('material.orrery-bronze', 'involves', 'quest.four-minutes-fast', 'nine thousand gears, and somewhere a re-dated ageing tag'),
  R('material.sunwell-mica', 'involves', 'quest.who-gets-the-light', 'no generous outcome without replacement leaves'),
  R('material.blackbole-timber', 'involves', 'quest.the-felling-order', 'a quarter condemned for heart rot, with families inside the trunk'),
  R('material.stairwire', 'used_by', 'npc.brask-vellmar', 'he failed the No. 3 main and kept the strand samples'),
  R('material.orrery-bronze', 'used_by', 'npc.melitta-aspri', 'a day and a half of drift in nine years, and she is biasing the tables'),
  R('material.ward-chalk', 'used_by', 'npc.toval-cherek', 'he has been shorting the alloy and knows which sections carry his work'),
  R('material.sunwell-mica', 'used_by', 'npc.iratze-zubiate', 'two hundred ducted mirrors, aligned by hand, two galleries dark'),
  R('material.pan-nitre', 'used_by', 'npc.tazrit-nourem', 'she buys debt as readily as ore, and holds the papers under the middle tower'),

  /* Factions that own the chokepoints ------------------------------ */
  R('faction.pale-assay', 'controls', 'material.pan-nitre', 'the stamp, not the salt, is what a buyer pays for'),
  R('faction.pale-assay', 'controls', 'material.blackfall-button', 'three inherited shed licences and the only bore gauges anyone trusts'),
  R('faction.mooring-assize', 'controls', 'material.ward-chalk', 'the annual marl cut, sold years forward as a debt instrument'),
  R('faction.conduit-college', 'controls', 'material.tideset-cement', 'give away the ash, own the kiln, never explain the ferment'),
  R('faction.pitchguard', 'controls', 'material.blackbole-timber', 'every cut licensed, and the licence enforced with archers'),
  R('faction.mirror-assembly', 'controls', 'material.sunwell-mica', 'both the cleaving and the silvering, and the silvering kills'),
  R('faction.mirror-assembly', 'controls', 'material.cudmother', 'export barred outright, enforced against couriers and never against sellers'),
  R('faction.fetterhouse', 'controls', 'material.levin-salt', 'weighed, sealed and taxed by the grain before it crosses the ward line'),
  R('faction.fetterhouse', 'controls', 'material.faultglass', 'four sorting boxes, and the fourth is not in the ordinance'),
  R('faction.iron-sluice-company', 'controls', 'material.mire-bloom', 'tolled at the gates before a raft ever reaches a hammer'),
  R('faction.moorstone-compact', 'controls', 'material.mirelac', 'the lot draw decides who scrapes which reach'),
  R('faction.red-writ', 'controls', 'material.steppe-scute', 'the whole six-week take, at a price fixed before the season opens'),
  R('faction.low-tally', 'smuggles_with', 'material.levin-salt', 'unsealed salt, which is contraband even where sealed salt is legal'),
  R('faction.low-tally', 'smuggles_with', 'material.cudmother', 'a starter travels against the skin and no gate has ever found one'),
  R('faction.concord-of-weights', 'related_to', 'material.blister-bar', 'the only published commodity price on the continent, and the Concord watches it'),
]
