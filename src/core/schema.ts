/**
 * Schema registry.
 *
 * Each entity type declares its tabs, groups and fields here. Pages, forms,
 * search facets and the quick-create menu are all generated from this file,
 * so a new entity type is a data change rather than a code change.
 */

import type { EntityType, FieldDef, FieldKind, GroupDef, TypeSchema } from './types'

/* Terse field builders --------------------------------------------- */

type Opt = Partial<Omit<FieldDef, 'key' | 'label' | 'kind' | 'group'>>

const f =
  (kind: FieldKind) =>
  (group: string, key: string, label: string, opt: Opt = {}): FieldDef => ({
    key,
    label,
    kind,
    group,
    ...opt,
  })

const text = f('text')
const long = f('longtext')
const num = f('number')
const list = f('list')
const tags = f('tags')
const bool = f('bool')
const sel = (group: string, key: string, label: string, options: string[], opt: Opt = {}) =>
  f('select')(group, key, label, { options, ...opt })
const refs = (group: string, key: string, label: string, refTypes: EntityType[], opt: Opt = {}) =>
  f('refs')(group, key, label, { refTypes, ...opt })
const table = (
  group: string,
  key: string,
  label: string,
  columns: { key: string; label: string }[],
  opt: Opt = {},
) => f('table')(group, key, label, { columns, ...opt })

const g = (key: string, label: string, tab?: string): GroupDef => ({ key, label, tab })

/* ------------------------------------------------------------------ */
/* City — the flagship template                                        */
/* ------------------------------------------------------------------ */

const CITY: TypeSchema = {
  type: 'city',
  label: 'City',
  plural: 'Cities & Settlements',
  glyph: '▲',
  accentVar: '--t-city',
  route: 'cities',
  tabs: [
    { key: 'overview', label: 'Overview' },
    { key: 'place', label: 'Place & Build' },
    { key: 'society', label: 'Society' },
    { key: 'economy', label: 'Economy' },
    { key: 'power', label: 'Power' },
    { key: 'play', label: 'Play' },
    { key: 'lore', label: 'Lore' },
    { key: 'dev', label: 'Dev' },
  ],
  groups: [
    g('overview', 'Overview', 'overview'),
    g('location', 'Location & biome', 'overview'),
    g('citymap', 'City map & districts', 'place'),
    g('architecture', 'Architectural identity', 'place'),
    g('landmark', 'Central landmark', 'place'),
    g('infrastructure', 'Energy & infrastructure', 'place'),
    g('transport', 'Transportation & traversal', 'place'),
    g('government', 'Government & political leaning', 'society'),
    g('law', 'Laws, enforcement & extradition', 'society'),
    g('classes', 'Social classes', 'society'),
    g('population', 'Population & cultures', 'society'),
    g('sustenance', 'Food & water', 'society'),
    g('economy', 'Economy', 'economy'),
    g('trade', 'Imports & exports', 'economy'),
    g('resources', 'Local resources', 'economy'),
    g('defense', 'Defense & military doctrine', 'power'),
    g('factions', 'Factions & guild presence', 'power'),
    g('conflicts', 'Current problems & conflicts', 'power'),
    g('diplomacy', 'Relationships with other cities', 'power'),
    g('mechanics', 'Signature gameplay mechanics', 'play'),
    g('npcs', 'Important NPCs', 'play'),
    g('quests', 'Available quests', 'play'),
    g('services', 'Unique items & services', 'play'),
    g('creatures', 'Local creatures', 'play'),
    g('history', 'History', 'lore'),
    g('dev', 'Developer notes', 'dev'),
    g('gallery', 'Image gallery', 'dev'),
  ],
  fields: [
    text('overview', 'epithet', 'Epithet', { placeholder: 'The name locals actually use' }),
    long('overview', 'overview', 'Overview'),
    text('overview', 'founded', 'Founded'),
    text('overview', 'settlementType', 'Settlement type', { key_fact: true }),

    refs('location', 'region', 'Region', ['region'], { key_fact: true }),
    text('location', 'biome', 'Biome', { key_fact: true }),
    long('location', 'terrain', 'Terrain & siting'),
    text('location', 'climate', 'Climate'),
    long('location', 'approach', 'Approach & first sight'),

    long('citymap', 'cityMapNote', 'Layout logic'),
    text('citymap', 'districtCount', 'Districts mapped'),

    long('architecture', 'architecture', 'Architectural identity'),
    text('architecture', 'silhouette', 'Silhouette'),
    tags('architecture', 'palette', 'Colour palette'),
    refs('architecture', 'buildMaterials', 'Building materials', ['material']),

    text('landmark', 'landmarkName', 'Central landmark', { key_fact: true }),
    long('landmark', 'landmarkDesc', 'Landmark description'),

    long('infrastructure', 'energy', 'Energy'),
    long('infrastructure', 'infrastructure', 'Infrastructure'),
    refs('infrastructure', 'keyMachines', 'Key machines', ['machine']),

    long('transport', 'transport', 'Transportation'),
    long('transport', 'traversal', 'Traversal & movement'),

    text('government', 'government', 'Government', { key_fact: true }),
    text('government', 'politicalLeaning', 'Political leaning', { key_fact: true }),
    refs('government', 'ruler', 'Seat of power', ['npc', 'faction']),
    long('government', 'succession', 'Succession & selection'),

    long('law', 'laws', 'Legal character'),
    text('law', 'enforcement', 'Law enforcement'),
    long('law', 'extradition', 'Extradition'),
    list('law', 'notableCrimes', 'Notable crimes'),

    table('classes', 'socialClasses', 'Social classes', [
      { key: 'name', label: 'Class' },
      { key: 'share', label: 'Share' },
      { key: 'note', label: 'Standing & rights' },
    ]),

    text('population', 'population', 'Population', { key_fact: true }),
    table('population', 'demographics', 'Peoples', [
      { key: 'group', label: 'Group' },
      { key: 'share', label: 'Share' },
      { key: 'note', label: 'Note' },
    ]),
    list('population', 'languages', 'Languages'),
    refs('population', 'cultures', 'Cultures & faiths', ['religion']),

    long('sustenance', 'food', 'Food supply'),
    long('sustenance', 'water', 'Water supply'),
    refs('sustenance', 'staples', 'Staple foods', ['food']),

    long('economy', 'economy', 'Economy'),
    text('economy', 'mainProduction', 'Main production', { key_fact: true }),
    text('economy', 'currency', 'Currency'),
    sel('economy', 'wealth', 'Wealth tier', ['Destitute', 'Poor', 'Modest', 'Prosperous', 'Rich', 'Opulent'], {
      key_fact: true,
    }),

    refs('trade', 'exports', 'Exports', ['material', 'item', 'food']),
    refs('trade', 'imports', 'Imports', ['material', 'item', 'food']),
    long('trade', 'tradeNotes', 'Trade posture'),

    refs('resources', 'localResources', 'Local resources', ['material', 'deposit']),
    long('resources', 'resourceNotes', 'Extraction notes'),

    long('defense', 'defense', 'Defenses'),
    long('defense', 'doctrine', 'Military doctrine'),
    text('defense', 'garrison', 'Standing force'),

    long('factions', 'factionNotes', 'Faction landscape'),

    text('conflicts', 'currentConflict', 'Current conflict', { key_fact: true }),
    list('conflicts', 'problems', 'Open problems'),

    table('diplomacy', 'cityRelations', 'Relationships with other cities', [
      { key: 'city', label: 'City' },
      { key: 'stance', label: 'Stance' },
      { key: 'note', label: 'Note' },
    ]),

    text('mechanics', 'signatureMechanic', 'Signature mechanic', { key_fact: true }),
    long('mechanics', 'mechanicNotes', 'How it plays'),

    long('npcs', 'npcNotes', 'Who matters here'),
    long('quests', 'questNotes', 'Quest hooks'),

    table('services', 'services', 'Services', [
      { key: 'name', label: 'Service' },
      { key: 'where', label: 'Where' },
      { key: 'note', label: 'Note' },
    ]),

    long('creatures', 'creatureNotes', 'Local wildlife'),

    long('history', 'history', 'History'),

    long('dev', 'devNotes', 'Developer notes'),
    list('dev', 'openQuestions', 'Open design questions'),
  ],
}

/* ------------------------------------------------------------------ */
/* Remaining types                                                     */
/* ------------------------------------------------------------------ */

const REGION: TypeSchema = {
  type: 'region',
  label: 'Region',
  plural: 'Regions & Biomes',
  glyph: '◈',
  accentVar: '--t-region',
  route: 'regions',
  groups: [
    g('overview', 'Overview'),
    g('land', 'Land & climate'),
    g('life', 'Life'),
    g('use', 'Use & danger'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    text('overview', 'biome', 'Biome', { key_fact: true }),
    text('overview', 'extent', 'Extent', { key_fact: true }),
    text('land', 'climate', 'Climate', { key_fact: true }),
    long('land', 'terrain', 'Terrain'),
    long('land', 'water', 'Water & drainage'),
    refs('life', 'flora', 'Characteristic flora', ['food', 'material']),
    refs('life', 'fauna', 'Characteristic fauna', ['creature']),
    refs('use', 'resources', 'Resources', ['material', 'deposit']),
    text('use', 'travel', 'Travel difficulty', { key_fact: true }),
    long('use', 'hazards', 'Hazards'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const DISTRICT: TypeSchema = {
  type: 'district',
  label: 'District',
  plural: 'Districts & Locations',
  glyph: '▦',
  accentVar: '--t-district',
  route: 'districts',
  groups: [
    g('overview', 'Overview'),
    g('life', 'Character'),
    g('play', 'Play'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    refs('overview', 'city', 'City', ['city'], { key_fact: true }),
    text('overview', 'districtType', 'Type', { key_fact: true }),
    text('overview', 'wealth', 'Wealth', { key_fact: true }),
    long('life', 'atmosphere', 'Atmosphere'),
    long('life', 'architecture', 'Architecture'),
    text('life', 'whoLivesHere', 'Who lives here'),
    text('play', 'danger', 'Danger', { key_fact: true }),
    long('play', 'playNotes', 'What players do here'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const LANDMARK: TypeSchema = {
  type: 'landmark',
  label: 'Landmark',
  plural: 'Landmarks',
  glyph: '⌂',
  accentVar: '--t-district',
  route: 'landmarks',
  groups: [g('overview', 'Overview'), g('detail', 'Detail'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    refs('overview', 'city', 'City', ['city', 'region'], { key_fact: true }),
    text('overview', 'landmarkType', 'Type', { key_fact: true }),
    text('overview', 'built', 'Built', { key_fact: true }),
    long('detail', 'appearance', 'Appearance'),
    long('detail', 'function', 'Function'),
    long('detail', 'access', 'Access'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const SITE: TypeSchema = {
  type: 'site',
  label: 'Site',
  plural: 'Wilderness Sites',
  glyph: '✕',
  accentVar: '--t-district',
  route: 'sites',
  groups: [g('overview', 'Overview'), g('play', 'Play'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    refs('overview', 'region', 'Region', ['region'], { key_fact: true }),
    sel('overview', 'siteType', 'Type', ['Ruin', 'Village', 'Camp', 'Outpost', 'Waystation', 'Wreck', 'Anomaly', 'Mine'], {
      key_fact: true,
    }),
    text('play', 'danger', 'Danger', { key_fact: true }),
    long('play', 'playNotes', 'What is here'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const FACTION: TypeSchema = {
  type: 'faction',
  label: 'Faction',
  plural: 'Factions & Guilds',
  glyph: '❖',
  accentVar: '--t-faction',
  route: 'factions',
  tabs: [
    { key: 'overview', label: 'Overview' },
    { key: 'structure', label: 'Structure' },
    { key: 'reach', label: 'Reach' },
    { key: 'play', label: 'Play' },
    { key: 'dev', label: 'Dev' },
  ],
  groups: [
    g('overview', 'Overview', 'overview'),
    g('ideology', 'Ideology', 'overview'),
    g('face', 'Public identity', 'overview'),
    g('hidden', 'Hidden agenda', 'overview'),
    g('leadership', 'Leadership', 'structure'),
    g('ranks', 'Internal ranks', 'structure'),
    g('resources', 'Resources', 'structure'),
    g('bases', 'Headquarters & branches', 'reach'),
    g('territory', 'Territory & influence', 'reach'),
    g('relations', 'Allies & enemies', 'reach'),
    g('people', 'Important NPCs', 'play'),
    g('join', 'Recruitment', 'play'),
    g('law', 'Laws & crimes', 'play'),
    g('quests', 'Quest lines', 'play'),
    g('rep', 'Reputation rewards', 'play'),
    g('plans', 'Current plans', 'play'),
    g('history', 'Historical events', 'dev'),
    g('dev', 'Developer notes', 'dev'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel(
      'overview',
      'factionType',
      'Type',
      ['Guild', 'Government', 'Order', 'Cartel', 'Cult', 'Military', 'Syndicate', 'Movement', 'House'],
      { key_fact: true },
    ),
    text('overview', 'scale', 'Scale', { key_fact: true }),
    text('overview', 'founded', 'Founded'),
    long('ideology', 'ideology', 'Ideology'),
    text('ideology', 'creed', 'Creed'),
    long('face', 'publicIdentity', 'Public identity'),
    text('face', 'publicFace', 'Public face'),
    long('hidden', 'hiddenAgenda', 'Hidden agenda'),
    long('leadership', 'leadership', 'Leadership'),
    text('leadership', 'leaderTitle', 'Leader title'),
    table('ranks', 'ranks', 'Internal ranks', [
      { key: 'rank', label: 'Rank' },
      { key: 'req', label: 'Requirement' },
      { key: 'grants', label: 'Grants' },
    ]),
    long('resources', 'resources', 'Resources'),
    refs('resources', 'controlledMaterials', 'Controlled materials', ['material']),
    long('bases', 'headquarters', 'Headquarters'),
    long('territory', 'territory', 'Territory & influence'),
    long('relations', 'relationNotes', 'Standing notes'),
    long('join', 'recruitment', 'Recruitment requirements'),
    refs('join', 'requiredSkills', 'Required skills', ['skill']),
    long('law', 'crimes', 'Associated laws & crimes'),
    long('quests', 'questlineNotes', 'Quest line shape'),
    table('rep', 'repRewards', 'Reputation rewards', [
      { key: 'tier', label: 'Tier' },
      { key: 'reward', label: 'Reward' },
      { key: 'note', label: 'Note' },
    ]),
    list('plans', 'currentPlans', 'Current plans'),
    long('history', 'history', 'Historical events'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const NPC: TypeSchema = {
  type: 'npc',
  label: 'NPC',
  plural: 'NPCs',
  glyph: '☗',
  accentVar: '--t-npc',
  route: 'npcs',
  tabs: [
    { key: 'overview', label: 'Overview' },
    { key: 'inner', label: 'Inner life' },
    { key: 'play', label: 'Play' },
    { key: 'dev', label: 'Dev' },
  ],
  groups: [
    g('overview', 'Identity', 'overview'),
    g('place', 'Home & location', 'overview'),
    g('work', 'Occupation & allegiance', 'overview'),
    g('personality', 'Personality', 'inner'),
    g('drives', 'Goals, fears & beliefs', 'inner'),
    g('secrets', 'Secrets', 'inner'),
    g('skills', 'Skills & combat role', 'play'),
    g('inventory', 'Inventory', 'play'),
    g('schedule', 'Daily schedule', 'play'),
    g('relationships', 'Relationships', 'play'),
    g('dialogue', 'Dialogue notes', 'play'),
    g('quests', 'Quest involvement', 'play'),
    g('choices', 'Possible player choices', 'play'),
    g('reputation', 'Reactions to faction reputation', 'play'),
    g('dev', 'Developer notes', 'dev'),
  ],
  fields: [
    text('overview', 'title', 'Title', { key_fact: true }),
    list('overview', 'aliases', 'Aliases'),
    text('overview', 'species', 'People / species', { key_fact: true }),
    text('overview', 'age', 'Age'),
    text('overview', 'pronouns', 'Pronouns'),
    sel('overview', 'state', 'State', ['Alive', 'Missing', 'Imprisoned', 'Dead', 'Unknown'], { key_fact: true }),
    long('overview', 'appearance', 'Appearance'),
    refs('place', 'home', 'Home', ['city', 'district', 'site'], { key_fact: true }),
    refs('place', 'currentLocation', 'Current location', ['city', 'district', 'site', 'region'], { key_fact: true }),
    text('work', 'occupation', 'Occupation', { key_fact: true }),
    long('work', 'standing', 'Standing'),
    long('personality', 'personality', 'Personality'),
    tags('personality', 'traits', 'Traits'),
    text('personality', 'voice', 'Voice'),
    list('drives', 'goals', 'Goals'),
    list('drives', 'fears', 'Fears'),
    list('drives', 'beliefs', 'Beliefs'),
    long('secrets', 'secrets', 'Secrets'),
    text('skills', 'combatRole', 'Combat role', { key_fact: true }),
    refs('skills', 'skills', 'Skills', ['skill']),
    long('skills', 'skillNotes', 'Capability notes'),
    refs('inventory', 'inventory', 'Carried items', ['item']),
    long('inventory', 'inventoryNotes', 'Inventory notes'),
    table('schedule', 'schedule', 'Daily schedule', [
      { key: 'time', label: 'Time' },
      { key: 'place', label: 'Where' },
      { key: 'doing', label: 'Doing' },
    ]),
    long('relationships', 'relationshipNotes', 'Relationship notes'),
    long('dialogue', 'dialogueNotes', 'Dialogue notes'),
    list('dialogue', 'sampleLines', 'Sample lines'),
    long('quests', 'questNotes', 'Quest involvement'),
    list('choices', 'playerChoices', 'Possible player choices'),
    table('reputation', 'repReactions', 'Reactions to faction reputation', [
      { key: 'faction', label: 'Faction' },
      { key: 'standing', label: 'Standing' },
      { key: 'reaction', label: 'Reaction' },
    ]),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const QUEST: TypeSchema = {
  type: 'quest',
  label: 'Quest',
  plural: 'Quests',
  glyph: '❯',
  accentVar: '--t-quest',
  route: 'quests',
  tabs: [
    { key: 'overview', label: 'Overview' },
    { key: 'flow', label: 'Flow' },
    { key: 'outcomes', label: 'Outcomes' },
    { key: 'dev', label: 'Dev' },
  ],
  groups: [
    g('overview', 'Overview', 'overview'),
    g('start', 'Start conditions', 'overview'),
    g('objectives', 'Objectives', 'flow'),
    g('branches', 'Branches & choices', 'flow'),
    g('fail', 'Failure conditions', 'flow'),
    g('hidden', 'Hidden outcomes', 'outcomes'),
    g('rewards', 'Rewards', 'outcomes'),
    g('items', 'Items required or consumed', 'outcomes'),
    g('changes', 'World-state changes', 'outcomes'),
    g('followup', 'Follow-up quests', 'outcomes'),
    g('dev', 'Developer notes', 'dev'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'questType', 'Type', ['Main', 'Faction', 'Side', 'Contract', 'Investigation', 'Chain opener', 'Branch'], {
      key_fact: true,
    }),
    text('overview', 'level', 'Recommended level', { key_fact: true }),
    sel('overview', 'devStatus', 'Development stage', ['Concept', 'Outlined', 'Branch mapped', 'Written', 'Playable'], {
      key_fact: true,
    }),
    refs('start', 'questGiver', 'Quest giver', ['npc', 'faction'], { key_fact: true }),
    refs('start', 'startLocation', 'Starting location', ['city', 'district', 'site', 'region'], { key_fact: true }),
    list('start', 'prerequisites', 'Prerequisites'),
    refs('start', 'recommendedSkills', 'Recommended skills', ['skill']),
    list('objectives', 'objectives', 'Objectives'),
    list('objectives', 'optionalObjectives', 'Optional objectives'),
    long('branches', 'branchNotes', 'Branch summary'),
    list('fail', 'failureConditions', 'Failure conditions'),
    list('hidden', 'hiddenOutcomes', 'Hidden outcomes'),
    table('rewards', 'rewards', 'Rewards', [
      { key: 'branch', label: 'Branch' },
      { key: 'reward', label: 'Reward' },
    ]),
    refs('items', 'itemsRequired', 'Items required', ['item', 'material']),
    refs('items', 'itemsConsumed', 'Items consumed', ['item', 'material']),
    table('changes', 'npcChanges', 'NPC state changes', [
      { key: 'npc', label: 'NPC' },
      { key: 'change', label: 'Change' },
    ]),
    table('changes', 'repChanges', 'Faction reputation changes', [
      { key: 'faction', label: 'Faction' },
      { key: 'change', label: 'Change' },
    ]),
    table('changes', 'worldChanges', 'City / world-state changes', [
      { key: 'where', label: 'Where' },
      { key: 'change', label: 'Change' },
    ]),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const ITEM: TypeSchema = {
  type: 'item',
  label: 'Item',
  plural: 'Items & Equipment',
  glyph: '◆',
  accentVar: '--t-item',
  route: 'items',
  groups: [
    g('overview', 'Overview'),
    g('stats', 'Stats'),
    g('legal', 'Origin & legality'),
    g('craft', 'Crafting'),
    g('world', 'Who has it'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel(
      'overview',
      'itemType',
      'Category',
      ['Weapon', 'Armour', 'Tool', 'Consumable', 'Component', 'Relic', 'Document', 'Contraband', 'Apparel'],
      { key_fact: true },
    ),
    sel('overview', 'rarity', 'Rarity', ['Common', 'Uncommon', 'Scarce', 'Rare', 'Singular'], { key_fact: true }),
    text('stats', 'value', 'Value', { key_fact: true }),
    text('stats', 'weight', 'Weight', { key_fact: true }),
    table('stats', 'stats', 'Stats', [
      { key: 'stat', label: 'Stat' },
      { key: 'value', label: 'Value' },
    ]),
    list('stats', 'effects', 'Effects'),
    text('legal', 'origin', 'Origin', { key_fact: true }),
    sel('legal', 'legalStatus', 'Legal status', ['Legal', 'Restricted', 'Licensed', 'Illegal', 'Varies by city'], {
      key_fact: true,
    }),
    long('legal', 'legalNotes', 'Legal notes'),
    refs('craft', 'recipe', 'Crafting recipe', ['recipe']),
    refs('craft', 'materials', 'Materials', ['material']),
    refs('craft', 'requiredSkills', 'Required skills', ['skill']),
    refs('craft', 'upgradesTo', 'Upgrade path', ['item']),
    long('world', 'sellers', 'Sellers'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const MATERIAL: TypeSchema = {
  type: 'material',
  label: 'Material',
  plural: 'Materials & Resources',
  glyph: '⬢',
  accentVar: '--t-material',
  route: 'materials',
  groups: [
    g('overview', 'Overview'),
    g('nature', 'Properties & composition'),
    g('extract', 'Extraction & refinement'),
    g('use', 'Uses'),
    g('trade', 'Trade'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'origin', 'Classification', ['Natural', 'Synthetic', 'Biological', 'Hybrid', 'Anomalous'], {
      key_fact: true,
    }),
    refs('overview', 'sourceRegion', 'Source biome', ['region'], { key_fact: true }),
    refs('overview', 'sourceCreature', 'Source creature', ['creature']),
    sel('overview', 'rarity', 'Rarity', ['Abundant', 'Common', 'Scarce', 'Rare', 'Singular'], { key_fact: true }),
    list('nature', 'properties', 'Properties'),
    text('nature', 'composition', 'Composition'),
    text('nature', 'appearance', 'Appearance'),
    long('extract', 'extraction', 'Extraction method'),
    long('extract', 'refinement', 'Refinement process'),
    refs('extract', 'machines', 'Machines involved', ['machine']),
    list('use', 'uses', 'Uses'),
    text('trade', 'tradeValue', 'Trade value', { key_fact: true }),
    long('trade', 'tradeNotes', 'Trade notes'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const MACHINE: TypeSchema = {
  type: 'machine',
  label: 'Machine',
  plural: 'Machines & Interactables',
  glyph: '⚙',
  accentVar: '--t-machine',
  route: 'machines',
  groups: [
    g('overview', 'Purpose & location'),
    g('operate', 'Operation'),
    g('process', 'Inputs, process, outputs'),
    g('risk', 'Risks & upgrades'),
    g('links', 'Connected content'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'purpose', 'Purpose'),
    sel('overview', 'machineType', 'Type', ['Refinery', 'Press', 'Kiln', 'Loom', 'Lift', 'Pump', 'Engine', 'Array', 'Terminal'], {
      key_fact: true,
    }),
    refs('overview', 'location', 'Location', ['city', 'district', 'site', 'region'], { key_fact: true }),
    text('operate', 'operator', 'Required operator', { key_fact: true }),
    refs('operate', 'requiredSkills', 'Required skill', ['skill']),
    text('operate', 'controls', 'Controls'),
    refs('process', 'inputs', 'Inputs', ['material', 'item', 'food']),
    long('process', 'process', 'Process'),
    refs('process', 'outputs', 'Outputs', ['material', 'item', 'food']),
    text('process', 'energy', 'Energy or fuel', { key_fact: true }),
    text('process', 'productionTime', 'Production time', { key_fact: true }),
    list('risk', 'failureRisks', 'Failure risks'),
    table('risk', 'upgrades', 'Upgrades', [
      { key: 'name', label: 'Upgrade' },
      { key: 'cost', label: 'Cost' },
      { key: 'effect', label: 'Effect' },
    ]),
    refs('links', 'recipes', 'Recipes', ['recipe']),
    refs('links', 'mechanics', 'Related mechanics', ['mechanic']),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const RECIPE: TypeSchema = {
  type: 'recipe',
  label: 'Recipe',
  plural: 'Crafting & Production',
  glyph: '⊞',
  accentVar: '--t-machine',
  route: 'crafting',
  groups: [g('overview', 'Overview'), g('io', 'Inputs & outputs'), g('req', 'Requirements'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'tier', 'Tier', ['Raw', 'Refined', 'Component', 'Finished', 'Masterwork'], { key_fact: true }),
    refs('io', 'inputs', 'Inputs', ['material', 'item', 'food']),
    refs('io', 'outputs', 'Outputs', ['item', 'material', 'food']),
    text('io', 'yield', 'Yield', { key_fact: true }),
    refs('req', 'machine', 'Machine', ['machine'], { key_fact: true }),
    refs('req', 'skills', 'Skills', ['skill']),
    text('req', 'time', 'Time', { key_fact: true }),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const CREATURE: TypeSchema = {
  type: 'creature',
  label: 'Creature',
  plural: 'Creatures & Bestiary',
  glyph: '☘',
  accentVar: '--t-creature',
  route: 'bestiary',
  groups: [
    g('overview', 'Overview'),
    g('biology', 'Biology'),
    g('behaviour', 'Behaviour'),
    g('combat', 'Combat'),
    g('harvest', 'Harvest & use'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    refs('overview', 'habitat', 'Habitat', ['region'], { key_fact: true }),
    sel('overview', 'threat', 'Threat', ['Harmless', 'Nuisance', 'Dangerous', 'Deadly', 'Apex'], { key_fact: true }),
    text('overview', 'size', 'Size', { key_fact: true }),
    long('biology', 'biology', 'Biology'),
    long('biology', 'lifecycle', 'Life cycle'),
    long('behaviour', 'behaviour', 'Behaviour'),
    text('behaviour', 'diet', 'Diet'),
    list('combat', 'attacks', 'Attacks'),
    list('combat', 'weaknesses', 'Weaknesses'),
    long('combat', 'tactics', 'Tactics'),
    refs('harvest', 'yields', 'Yields', ['material', 'food', 'item']),
    long('harvest', 'harvestNotes', 'Harvest notes'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const SPELL: TypeSchema = {
  type: 'spell',
  label: 'Magic',
  plural: 'Magic, Spells & Potions',
  glyph: '✦',
  accentVar: '--t-spell',
  route: 'magic',
  groups: [g('overview', 'Overview'), g('use', 'Use'), g('cost', 'Cost & risk'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'discipline', 'Form', ['Spell', 'Enchantment', 'Potion', 'Ritual', 'Ward', 'Curse'], { key_fact: true }),
    text('overview', 'tradition', 'Tradition', { key_fact: true }),
    sel('overview', 'legalStatus', 'Legal status', ['Legal', 'Licensed', 'Restricted', 'Illegal', 'Varies by city'], {
      key_fact: true,
    }),
    long('use', 'effect', 'Effect'),
    text('use', 'range', 'Range'),
    text('use', 'duration', 'Duration'),
    refs('use', 'components', 'Components', ['material', 'item', 'food']),
    text('cost', 'cost', 'Cost', { key_fact: true }),
    list('cost', 'risks', 'Risks'),
    refs('cost', 'skills', 'Skills', ['skill']),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const FOOD: TypeSchema = {
  type: 'food',
  label: 'Food',
  plural: 'Food & Agriculture',
  glyph: '❀',
  accentVar: '--t-food',
  route: 'food',
  groups: [g('overview', 'Overview'), g('grow', 'Growing & preparation'), g('use', 'Use'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'foodType', 'Type', ['Crop', 'Livestock', 'Forage', 'Preserved', 'Prepared', 'Drink', 'Fungus'], {
      key_fact: true,
    }),
    refs('overview', 'grownIn', 'Grown in', ['region', 'city'], { key_fact: true }),
    long('grow', 'cultivation', 'Cultivation'),
    text('grow', 'season', 'Season', { key_fact: true }),
    long('grow', 'preparation', 'Preparation'),
    list('use', 'effects', 'Effects'),
    text('use', 'value', 'Value', { key_fact: true }),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const RELIGION: TypeSchema = {
  type: 'religion',
  label: 'Culture',
  plural: 'Religions & Cultures',
  glyph: '☖',
  accentVar: '--t-religion',
  route: 'cultures',
  groups: [
    g('overview', 'Overview'),
    g('belief', 'Belief & practice'),
    g('social', 'Society'),
    g('reach', 'Reach'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'kind', 'Kind', ['Religion', 'Culture', 'Philosophy', 'Cult', 'Tradition'], { key_fact: true }),
    text('overview', 'adherents', 'Adherents', { key_fact: true }),
    long('belief', 'beliefs', 'Core beliefs'),
    list('belief', 'practices', 'Practices'),
    list('belief', 'taboos', 'Taboos'),
    long('social', 'customs', 'Customs'),
    long('social', 'deathRites', 'Death rites'),
    long('reach', 'reach', 'Where it is found'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const MECHANIC: TypeSchema = {
  type: 'mechanic',
  label: 'Mechanic',
  plural: 'Game Mechanics',
  glyph: '◧',
  accentVar: '--t-mechanic',
  route: 'mechanics',
  tabs: [
    { key: 'design', label: 'Design' },
    { key: 'rules', label: 'Rules' },
    { key: 'links', label: 'Connections' },
    { key: 'dev', label: 'Dev' },
  ],
  groups: [
    g('purpose', 'Player-facing purpose', 'design'),
    g('loop', 'Core gameplay loop', 'design'),
    g('input', 'Controls & inputs', 'rules'),
    g('rules', 'Rules', 'rules'),
    g('vars', 'Variables', 'rules'),
    g('deps', 'Dependencies', 'rules'),
    g('progress', 'Progression & rewards', 'rules'),
    g('fail', 'Failure states', 'rules'),
    g('edge', 'Edge cases', 'rules'),
    g('links', 'Related content', 'links'),
    g('dev', 'Implementation notes', 'dev'),
  ],
  fields: [
    long('purpose', 'purpose', 'Player-facing purpose'),
    sel('purpose', 'category', 'Category', ['Traversal', 'Combat', 'Crafting', 'Social', 'Economy', 'Stealth', 'Survival', 'Magic'], {
      key_fact: true,
    }),
    sel('purpose', 'implStatus', 'Implementation', ['Concept', 'Specified', 'Prototype', 'Implemented'], { key_fact: true }),
    long('loop', 'loop', 'Core loop'),
    long('input', 'controls', 'Controls & inputs'),
    list('rules', 'rules', 'Rules'),
    table('vars', 'variables', 'Variables', [
      { key: 'name', label: 'Variable' },
      { key: 'range', label: 'Range' },
      { key: 'note', label: 'Note' },
    ]),
    list('deps', 'dependencies', 'Dependencies'),
    long('progress', 'progression', 'Progression'),
    list('progress', 'rewards', 'Rewards'),
    list('fail', 'failureStates', 'Failure states'),
    list('edge', 'edgeCases', 'Edge cases'),
    long('dev', 'implementationNotes', 'Implementation notes'),
  ],
}

const SKILL: TypeSchema = {
  type: 'skill',
  label: 'Skill',
  plural: 'Skill Trees',
  glyph: '⬡',
  accentVar: '--t-skill',
  route: 'skills',
  groups: [
    g('overview', 'Overview'),
    g('tree', 'Tree placement'),
    g('effect', 'Effect'),
    g('legal', 'Legality'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'skillType', 'Type', ['Active', 'Passive', 'Toggle', 'Ritual'], { key_fact: true }),
    text('overview', 'branch', 'Branch', { key_fact: true }),
    text('overview', 'tree', 'Tree', { key_fact: true }),
    num('tree', 'tier', 'Tier'),
    num('tree', 'cost', 'Skill point cost', { key_fact: true }),
    num('tree', 'maxRank', 'Max rank'),
    bool('tree', 'hybrid', 'Hybrid / joint node'),
    list('tree', 'unlockRequirements', 'Unlock requirements'),
    long('effect', 'effect', 'Effect'),
    table('effect', 'rankTable', 'Rank progression', [
      { key: 'rank', label: 'Rank' },
      { key: 'effect', label: 'Effect' },
    ]),
    sel('legal', 'legality', 'Legality', ['Lawful', 'Regulated', 'Outlawed', 'Varies by city'], { key_fact: true }),
    long('legal', 'legalNotes', 'Legal notes'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const EVENT: TypeSchema = {
  type: 'event',
  label: 'Event',
  plural: 'History & Timeline',
  glyph: '❙',
  accentVar: '--t-event',
  route: 'history',
  groups: [g('overview', 'Overview'), g('detail', 'Detail'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    text('overview', 'date', 'Date', { key_fact: true }),
    num('overview', 'year', 'Sort year'),
    sel('overview', 'era', 'Era', ['Deep past', 'Founding age', 'Middle years', 'Recent', 'Present'], { key_fact: true }),
    sel('overview', 'eventType', 'Type', ['War', 'Treaty', 'Disaster', 'Discovery', 'Founding', 'Collapse', 'Uprising'], {
      key_fact: true,
    }),
    long('detail', 'account', 'Account'),
    list('detail', 'consequences', 'Consequences'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const WAR: TypeSchema = {
  type: 'war',
  label: 'Conflict',
  plural: 'Wars, Politics & Trade',
  glyph: '⚔',
  accentVar: '--t-war',
  route: 'conflicts',
  groups: [
    g('overview', 'Overview'),
    g('sides', 'Sides'),
    g('state', 'Current state'),
    g('stakes', 'Stakes'),
    g('dev', 'Developer notes'),
  ],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'conflictType', 'Type', ['War', 'Border dispute', 'Trade war', 'Insurgency', 'Cold conflict', 'Blockade', 'Feud'], {
      key_fact: true,
    }),
    sel('overview', 'state', 'State', ['Brewing', 'Active', 'Stalemate', 'Truce', 'Resolved'], { key_fact: true }),
    text('overview', 'began', 'Began', { key_fact: true }),
    long('sides', 'sidesNotes', 'Sides & alignment'),
    long('state', 'currentState', 'Current state'),
    list('state', 'frontlines', 'Fronts & flashpoints'),
    list('stakes', 'stakes', 'What is at stake'),
    long('stakes', 'playerAngle', 'Player angle'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const ROUTE: TypeSchema = {
  type: 'route',
  label: 'Route',
  plural: 'Routes',
  glyph: '⟿',
  accentVar: '--t-route',
  route: 'routes',
  groups: [g('overview', 'Overview'), g('detail', 'Detail'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    sel('overview', 'routeKind', 'Kind', ['Road', 'Sea lane', 'Trade route', 'Smuggling route', 'River'], { key_fact: true }),
    text('overview', 'endpoints', 'Endpoints', { key_fact: true }),
    text('overview', 'travelTime', 'Travel time', { key_fact: true }),
    refs('detail', 'goods', 'Goods moved', ['material', 'item', 'food']),
    long('detail', 'hazards', 'Hazards'),
    long('detail', 'control', 'Who controls it'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const DEPOSIT: TypeSchema = {
  type: 'deposit',
  label: 'Deposit',
  plural: 'Resource Deposits',
  glyph: '◊',
  accentVar: '--t-material',
  route: 'deposits',
  groups: [g('overview', 'Overview'), g('detail', 'Detail'), g('dev', 'Developer notes')],
  fields: [
    long('overview', 'overview', 'Overview'),
    refs('overview', 'material', 'Material', ['material'], { key_fact: true }),
    refs('overview', 'region', 'Region', ['region'], { key_fact: true }),
    sel('overview', 'yieldTier', 'Yield', ['Trace', 'Modest', 'Rich', 'Exceptional'], { key_fact: true }),
    text('detail', 'workedBy', 'Worked by', { key_fact: true }),
    long('detail', 'access', 'Access & hazards'),
    long('dev', 'devNotes', 'Developer notes'),
  ],
}

const NOTE: TypeSchema = {
  type: 'note',
  label: 'Note',
  plural: 'Design Notes',
  glyph: '✎',
  accentVar: '--t-note',
  route: 'notes',
  groups: [g('overview', 'Note'), g('detail', 'Detail')],
  fields: [
    sel('overview', 'noteKind', 'Kind', ['Design question', 'Developer note', 'Pitch', 'Decision', 'Reference'], {
      key_fact: true,
    }),
    long('overview', 'body', 'Body'),
    sel('detail', 'resolution', 'Resolution', ['Open', 'Leaning', 'Decided', 'Parked'], { key_fact: true }),
    text('detail', 'owner', 'Owner'),
    list('detail', 'options', 'Options on the table'),
  ],
}

/* ------------------------------------------------------------------ */

export const SCHEMAS: Record<EntityType, TypeSchema> = {
  region: REGION,
  city: CITY,
  district: DISTRICT,
  landmark: LANDMARK,
  site: SITE,
  faction: FACTION,
  npc: NPC,
  quest: QUEST,
  item: ITEM,
  material: MATERIAL,
  machine: MACHINE,
  recipe: RECIPE,
  creature: CREATURE,
  spell: SPELL,
  food: FOOD,
  religion: RELIGION,
  mechanic: MECHANIC,
  skill: SKILL,
  event: EVENT,
  war: WAR,
  route: ROUTE,
  deposit: DEPOSIT,
  note: NOTE,
}

export const schemaOf = (type: EntityType): TypeSchema => SCHEMAS[type]

export const fieldDef = (type: EntityType, key: string): FieldDef | undefined =>
  SCHEMAS[type]?.fields.find((x) => x.key === key)

export const keyFacts = (type: EntityType): FieldDef[] =>
  SCHEMAS[type]?.fields.filter((x) => x.key_fact) ?? []

const ROUTE_TO_TYPE = new Map<string, EntityType>(
  (Object.keys(SCHEMAS) as EntityType[]).map((t) => [SCHEMAS[t].route, t]),
)
export const typeForRoute = (route: string): EntityType | undefined => ROUTE_TO_TYPE.get(route)
