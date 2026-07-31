/**
 * Design notes and open questions.
 *
 * The decisions the brief did not make. Each of these is a real fork in the
 * setting, recorded with the options on the table rather than quietly resolved
 * by whoever wrote the seed. Options are suggestions to choose between, not
 * canon.
 */

import { E, R, type SeedEntity, type SeedRelation } from './kit'
import { CITY, REGION } from './registry'

const q = (
  id: string,
  name: string,
  summary: string,
  body: string,
  options: string[],
  tags: string[] = [],
  resolution: 'Open' | 'Leaning' | 'Parked' = 'Open',
): SeedEntity =>
  E({
    id,
    type: 'note',
    name,
    status: 'review',
    summary,
    tags: ['design question', ...tags],
    fields: { noteKind: 'Design question', body, resolution, options },
  })

export const entities: SeedEntity[] = [
  /* ---------------------------------------------------- naming --- */
  q(
    'note.city-names',
    'Eight settlements still need names',
    'Five settlements have canon names. The other eight are carrying descriptive working titles.',
    'The brief named the Gilded Ascent, the Black Weir, Orath, Oruvai and Keth Veyra. The remaining eight are recorded ' +
      'under descriptive working titles — [[city.sky-city|The Sky City]], [[city.mediterranean-city|The Mediterranean City]], ' +
      '[[city.tree-city|The Tree City]], [[city.cave-agrarian-city|The Cave Agrarian City]], ' +
      '[[city.sifting-city|The Sifting City]], [[city.magic-city|The Magic City]], [[city.arena-city|The Arena City]] and ' +
      '[[city.floating-swamp-settlement|The Floating Swamp Settlement]] — and each is flagged with a working-title tag in the UI.\n\n' +
      'These are placeholders, not proposals about the setting. Renaming an entry in this wiki does not change its id, so ' +
      'every existing link survives a rename. The five canon names already sound like they come from different language ' +
      'families, which is worth preserving when the other eight are named.',
    [
      'Name each city in the language of its own people, and accept that the map reads as linguistically mixed',
      'Use the trade-tongue name for all thirteen, since the atlas is a merchant artefact, and record local names as aliases',
      'Keep descriptive English working titles permanently and treat them as translations',
    ],
    ['naming', 'canon'],
  ),

  q(
    'note.world-name',
    'The world and the continent have no name',
    'Nothing in the brief names the world, the continent or the sea.',
    'The atlas currently calls itself “World Atlas & Bible” and labels the landmass not at all. Region and sea names in ' +
      'this seed are proposals. Worth deciding early whether the setting is one continent that people simply call “the ' +
      'land”, or a named world with known neighbours across [[region.eastern-deep|the Eastern Deep]].',
    [
      'One continent, unnamed by its inhabitants — everyone calls it the land, which quietly implies nobody has crossed the ocean',
      'Named continent with a known but unreachable neighbour across the Eastern Deep',
      'Named world with active overseas trade, which changes the Gilded Ascent from the centre of everything to a regional hub',
    ],
    ['canon', 'scope'],
  ),

  q(
    'note.region-names',
    'Every region name in this seed is a proposal',
    'Fifteen regions were invented to make the map legible. None of them are canon.',
    'The map needs regions or nothing else can be sited consistently, so fifteen were drawn and named. The geography ' +
      'itself is load-bearing — the brief requires the Gilded Ascent at a trade crossroads near the centre, the sky city ' +
      'close to it, and the technologically advanced city in a Mediterranean-like biome — but the names are free. ' +
      'Rename any of them without consequence; borders are generated from the settlement positions, not from the names.',
    ['Keep the proposed names', 'Rename in a consistent in-world naming convention', 'Name only the regions people actually live in and leave the rest blank on the map'],
    ['naming', 'atlas'],
  ),

  /* ------------------------------------------- undefined cities --- */
  q(
    'note.black-weir-concept',
    'What is the Black Weir?',
    'Canon name, no canon concept. The current entry is a labelled proposal.',
    'The brief establishes that a place called the Black Weir exists and nothing else. The proposal in ' +
      '[[city.black-weir|its entry]] makes it a fortified weir-town controlling the throat of the delta upstream of ' +
      '[[city.floating-swamp-settlement|the floating settlement]], because that gives two established locations a ' +
      'relationship with real stakes: one town can drown the other.\n\nThat is a guess built on the word “weir”. It should ' +
      'be confirmed, replaced, or the name reassigned to something else entirely.',
    [
      'Confirm the weir-town proposal and keep the upstream/downstream tension with the swamp settlement',
      'Make the Black Weir a ruin or a disaster site rather than a living town',
      'Move the name elsewhere — a weir is a structure, not necessarily a settlement',
    ],
    ['canon', 'city'],
  ),
  q(
    'note.orath-concept',
    'What is Orath?',
    'Canon name, no canon concept. Deliberately left thin.',
    'Nothing is established about [[city.orath|Orath]] beyond its name. The seed sites it on the northern edge of ' +
      '[[region.cinder-waste|the desert]] and leaves most of its entry as TBD on purpose, so it does not accumulate ' +
      'invented detail that later has to be unpicked. Decide what it is before filling it in.',
    [
      'A frontier city on the desert margin — the current placeholder siting',
      'Something that has nothing to do with the desert; move the marker (it drags)',
      'Not a settlement at all',
    ],
    ['canon', 'city'],
  ),
  q(
    'note.oruvai-concept',
    'What is Oruvai?',
    'Canon name, no canon concept. Deliberately left thin.',
    'As with Orath: [[city.oruvai|Oruvai]] has a name and nothing else. It is currently placed in the highlands between ' +
      '[[region.the-greatwood|the Greatwood]] and [[region.hollow-karst|the karst]], which puts it between the militarised ' +
      'forest and the cave civilisation. That is a useful position for a city that has to choose sides, but it is a ' +
      'placement decision, not canon.',
    ['Confirm the highland siting', 'Relocate it', 'Define it as something other than a city'],
    ['canon', 'city'],
  ),
  q(
    'note.keth-veyra-concept',
    'What is Keth Veyra?',
    'Canon name, no canon concept. Deliberately left thin.',
    'Placed on [[region.mistfall-coast|the cold north-eastern coast]] as the only settlement in this seed with real ' +
      'access to open ocean. If the setting ever needs somewhere that looks outward rather than inward, this is the ' +
      'obvious candidate — but nothing about that is established.',
    [
      'A port that looks outward across the Eastern Deep, which forces a decision on what is across it',
      'A closed, inward city that happens to be coastal',
      'Relocate inland',
    ],
    ['canon', 'city'],
  ),

  /* ------------------------------------------------- mechanics --- */
  q(
    'note.magic-cost-model',
    'What does magic actually cost?',
    'The tone calls for regulated magic, but the currency of that regulation is undecided.',
    'Magic in this seed is written as infrastructure with licensing, load limits and accidents, which is what makes ' +
      '[[city.magic-city|the Magic City]] a city rather than a set piece. What has not been decided is what magic costs ' +
      'the caster. Everything downstream — spell entries, the Arcana & Risk skill tree, the legality of individual ' +
      'effects, and whether an unlicensed caster is a criminal or a public hazard — depends on this answer.',
    [
      'Physiological cost paid by the caster, which makes regulation a public-health matter',
      'Material cost paid in consumables, which makes it an economic and smuggling matter',
      'Environmental cost paid by the surroundings, which makes it a planning and liability matter',
      'Some combination, with different traditions paying differently',
    ],
    ['mechanics', 'magic'],
  ),
  q(
    'note.player-scope',
    'What is the player character, and at what scale do they act?',
    'Nothing establishes whether the player is one person, a crew, or a house.',
    'The world as written has city-scale politics, guild quest lines that branch into trade, smuggling, espionage and ' +
      'assassination, and mechanics that are largely economic. Those read very differently depending on whether the ' +
      'player is an individual with a knife or an interest with a ledger. This affects almost every quest and every ' +
      'reputation system.',
    ['A single character', 'A small crew with individual members', 'A house or company the player directs'],
    ['mechanics', 'scope'],
  ),
  q(
    'note.time-and-calendar',
    'Is there a calendar, and does time pass?',
    'History entries carry relative dates only, because no calendar has been established.',
    'Events in [[region.ascent-basin|the timeline]] are dated relative to each other rather than absolutely. If the ' +
      'game has seasons — and the agricultural cities strongly imply it should — then harvests, the mountain pass ' +
      'closing, delta flooding and the fog on the north-east coast all become mechanics rather than flavour.',
    [
      'Full seasonal calendar with mechanical consequences for farming, travel and flooding',
      'Seasons as flavour only',
      'No calendar; the world is static outside quest state',
    ],
    ['mechanics', 'canon'],
  ),

  /* ------------------------------------------------- tone -------- */
  q(
    'note.dark-themes-handling',
    'How far do the dark themes go in play, not just in lore?',
    'The brief asks for dark themes. The line between depicted and playable is not drawn.',
    'Indenture, trafficking, forced labour and purges appear across this seed as things the world does, with weight and ' +
      'consequence. Several faction quest lines can branch towards participating in them. What is not decided is whether ' +
      'those branches are playable, playable-but-costly, or refused by the game.\n\nThis is a design decision with real ' +
      'consequences for what the game is, and it should be made deliberately rather than by accretion of individual quests.',
    [
      'Playable with permanent mechanical and reputation consequences',
      'Playable only as investigation and disruption, never as participation',
      'Present in the world, never on the player quest path',
    ],
    ['tone', 'mechanics'],
  ),
  q(
    'note.sci-fi-ceiling',
    'How far does the restrained science fiction go?',
    'The brief says restrained. The ceiling has not been set.',
    '[[city.mediterranean-city|The Mediterranean City]] is written as the technologically advanced one, with tidal ' +
      'computation, standardised parts and licensing regimes — roughly an early-industrial society that took ' +
      'engineering seriously. Setting an explicit ceiling now prevents drift, because every later machine entry will ' +
      'push against it.',
    [
      'Ceiling at precision mechanism and water power — no combustion, no electricity',
      'Ceiling at early electrical experiment, confined to one city',
      'Allow anomalous technology from [[region.aetheric-scar|the Scar]] that does not follow the normal ceiling',
    ],
    ['tone', 'canon'],
  ),
  q(
    'note.peoples',
    'Who lives here?',
    'The seed writes culturally distinct human-adjacent peoples and leaves species undefined.',
    'No fantasy species are assumed. Populations are written as culturally distinct groups, and the unusual biology ' +
      'lives in the flora, fauna, diseases and materials instead. That is a reading of the brief\'s “grounded fantasy ' +
      'and unusual biology”, not an established fact, and it is a large decision either way.',
    [
      'Human-only, with cultural and regional variation carrying all the difference',
      'Human plus one or two genuinely non-human peoples with real biological differences',
      'Populations altered by their environments over generations — the karst dwellers and the sky city especially',
    ],
    ['canon', 'tone'],
  ),

  /* ------------------------------------------------- atlas ------- */
  q(
    'note.map-scale',
    'What is the actual scale of the map?',
    'Distances are internally consistent but arbitrary.',
    'The map is 2400 by 1600 units with a scale bar reading 200 leagues. Nothing establishes how long a journey ' +
      'between cities takes, which matters for trade routes, quest pacing and whether the smuggling routes are ' +
      'plausible alternatives to the tolled roads.',
    ['Continental scale — weeks between cities', 'Regional scale — days between cities', 'Set travel times per route and derive the scale from them'],
    ['atlas', 'mechanics'],
  ),
  q(
    'note.sky-city-lift',
    'How does anything get up to the Sky City?',
    'The brief fixes that it is wealthy and near the commercial centre. The mechanism is a proposal.',
    'This seed holds [[city.sky-city|the Sky City]] up on a permanent thermal over [[region.anvil-shelf|the Anvil Shelf]], ' +
      'which is what lets it sit close to [[city.gilded-ascent|the Gilded Ascent]] as the brief requires while still being ' +
      'genuinely separate from it. Whether goods and people move by lift, by airship, by both, and who owns that ' +
      'chokepoint, is undecided — and whoever owns it owns the city.',
    [
      'Cable lifts from the scarp, owned by a single authority — a clean chokepoint for politics and smuggling',
      'Airships, which makes the city harder to blockade and much harder to police',
      'Both, with the lift legal and the air trade grey',
    ],
    ['canon', 'city', 'mechanics'],
  ),

  /* ------------------------------------------------- dev notes --- */
  E({
    id: 'note.seed-provenance',
    type: 'note',
    name: 'Where this content came from',
    status: 'canon',
    summary: 'What in this wiki is established, what is proposed, and how to tell the difference.',
    tags: ['meta', 'canon'],
    fields: {
      noteKind: 'Reference',
      resolution: 'Decided',
      body:
        'This wiki was seeded from a written brief. That brief is the only source of canon and it is short: it names ' +
        'thirteen settlements, fixes a handful of facts about them, and sets the tone. Every established statement is ' +
        'listed on the About page.\n\n' +
        'Everything else here is a proposal, written so that the tool is usable and every section demonstrates what it is ' +
        'for. Proposals are marked Draft and say so in their developer notes. Real unknowns are recorded as TBD with the ' +
        'question attached, rather than filled in with invented detail — that is why the dashboard tracks a TBD count, ' +
        'and why it should go down rather than up.\n\n' +
        'No project artwork was available. Settlement art is generated: each city has its own silhouette, palette and ' +
        'central landmark, drawn deterministically from its entry. Upload real art in the gallery to replace it.',
    },
  }),

  E({
    id: 'note.next-steps',
    type: 'note',
    name: 'Suggested next steps',
    status: 'draft',
    summary: 'The order that unblocks the most other work.',
    tags: ['meta'],
    fields: {
      noteKind: 'Developer note',
      resolution: 'Open',
      body:
        '1. Settle [[note.player-scope|what the player is]] and [[note.magic-cost-model|what magic costs]]. Almost every ' +
        'mechanic and quest entry depends on those two.\n' +
        '2. Decide the four undefined cities — [[note.black-weir-concept|the Black Weir]], [[note.orath-concept|Orath]], ' +
        '[[note.oruvai-concept|Oruvai]] and [[note.keth-veyra-concept|Keth Veyra]] — or explicitly park them. They are ' +
        'currently the thinnest entries in the wiki and that is deliberate.\n' +
        '3. Name the eight working-title settlements.\n' +
        '4. Work the TBD queue on the dashboard from the top. Each one is a specific question rather than a gap.\n' +
        '5. Replace the generated city art with project artwork as it arrives.',
    },
  }),
]

export const relations: SeedRelation[] = [
  R('note.black-weir-concept', 'related_to', CITY.blackWeir),
  R('note.orath-concept', 'related_to', CITY.orath),
  R('note.oruvai-concept', 'related_to', CITY.oruvai),
  R('note.keth-veyra-concept', 'related_to', CITY.kethVeyra),
  R('note.sky-city-lift', 'related_to', CITY.skyCity),
  R('note.sky-city-lift', 'related_to', CITY.gildedAscent),
  R('note.magic-cost-model', 'related_to', CITY.magicCity),
  R('note.sci-fi-ceiling', 'related_to', CITY.mediterranean),
  R('note.region-names', 'related_to', REGION.ascentBasin),
  R('note.map-scale', 'related_to', REGION.ascentBasin),
  R('note.city-names', 'related_to', CITY.skyCity),
  R('note.city-names', 'related_to', CITY.mediterranean),
  R('note.city-names', 'related_to', CITY.treeCity),
  R('note.city-names', 'related_to', CITY.caveAgrarian),
  R('note.city-names', 'related_to', CITY.siftingCity),
  R('note.city-names', 'related_to', CITY.magicCity),
  R('note.city-names', 'related_to', CITY.arenaCity),
  R('note.city-names', 'related_to', CITY.floatingSwamp),
  R('note.next-steps', 'related_to', 'note.seed-provenance'),
  R('note.next-steps', 'related_to', 'note.player-scope'),
  R('note.next-steps', 'related_to', 'note.magic-cost-model'),
  R('note.world-name', 'related_to', REGION.easternDeep),
]
