# World Atlas & Bible

An interactive world atlas, connected lore encyclopedia and game-design database for an RPG
worldbuilding project. It runs entirely in the browser, persists what you write, and is editable
without touching code.

**Live: https://tobiasmidtgard.github.io/Rpgwiki/**

Every push to the default branch rebuilds and republishes it
(`.github/workflows/deploy-pages.yml`). The deploy fails rather than shipping if the TypeScript
build or the seed validator does.

> **One-time setup:** Pages has to be switched on by hand once, under
> **Settings → Pages → Build and deployment → Source: GitHub Actions**. A workflow cannot do this
> for you: creating a Pages site needs repository-admin rights, and the automatic `GITHUB_TOKEN`
> is deliberately not granted them. Until it is switched on, the deploy job fails with
> *"Resource not accessible by integration"*. Re-run the workflow afterwards and it will publish.

Because there is no server, the world you edit on the published site lives in *your* browser.
Two people opening the link get the same seed and then diverge — use **Data, backup and import**
to move a world between browsers or people.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle in dist/
npm run preview
```

---

## What is canon here — read this first

This wiki was built from a written brief, and **that brief is the only source of established
canon**. It is short. It names thirteen settlements, fixes a handful of facts about them, and sets
the tone.

Everything else in the seed — region names, governments, factions, characters, quests, materials,
machines, history — is a **proposal**, written so the tool is usable and so every section
demonstrates what it is for.

- Established facts are marked `canon` and listed in `src/world/registry.ts` as `CANON_ANCHORS`,
  and again on the **About** page in the app.
- Proposals are marked `draft` and say so in their developer notes.
- Genuine unknowns are recorded as `TBD("the open question")` rather than filled in with invented
  detail. They surface on the dashboard and in Design Notes.
- **The Black Weir, Orath, Oruvai and Keth Veyra** have canon names and no established concept.
  Their entries are deliberately thinner than the rest and lean on TBD. Overwrite them freely.
- Settlements the brief did not name carry a **working title** tag. Renaming never changes an
  entry's id, so links survive a rename.

No project artwork existed, so settlement art is generated: each city has its own silhouette form,
palette and central landmark, drawn deterministically from its entry. Upload real art in the
gallery to replace it.

---

## Sections

Atlas · Regions & Biomes · Cities & Settlements · Districts & Locations · Wilderness Sites ·
Factions & Guilds · NPCs · Quests · Items & Equipment · Materials & Resources · Resource Deposits ·
Machines & Interactables · Crafting & Production · Creatures & Bestiary · Magic, Spells &
Potions · Food & Agriculture · Religions & Cultures · Game Mechanics · Skill Trees · History &
Timeline · Wars, Politics & Trade · Routes · Gallery · Design Notes

Plus the derived views: connection graph, quest flow board, skill-tree viewer, production chains
and the faction relationship matrix.

---

## Architecture

```
src/
  core/          data model and machinery
    types.ts       Entity, Relation, RelationKind, Status, TBD, map geometry types
    schema.ts      every entity type's tabs, groups and fields — the source of all page layout
    store.ts       immutable world state, undo/redo, revisions, debounced autosave
    db.ts          IndexedDB with a localStorage fallback
    relations.ts   folds relations + ref fields + inline [[links]] into one graph
    search.ts      scored search with match reasons, and the facet index
    political.ts   faction territory and city influence, derived from `controls` links
    io.ts          JSON round-trip and Markdown export
  world/         content — plain data, no logic
    registry.ts    canonical ids and the canon anchors
    geo.ts         coastline, region generation, rivers, roads, trade and smuggling routes
    kit.ts         E() / R() / TBD() authoring helpers and payload types
    seed.ts        assembles every content module into a world (lazily loaded)
    seedMeta.ts    just the seed version, so the app can skip loading the seed
    *.ts           the content modules themselves
  art/           deterministic procedural artwork (city vistas, crests, section banners)
  components/    map, editors, links, backlinks, city plans, shared primitives
  pages/         one page per section, plus the specialist views
```

### Everything is one entity model

An entry is `{ id, type, name, status, tags, fields, images, ... }`. Each type declares its fields
in `schema.ts`, and pages, forms, filters, search facets and the quick-create menu are all generated
from that. **Adding a new entity type is a data change, not an application rewrite.** Per-entry
custom fields can be added from the UI without touching the schema at all.

Ids are `type.kebab-slug`, generated from the name. The user never types one — links are made by
searching entry names.

### Links are typed, and backlinks are free

Connections come from three places and are folded into one index:

1. explicit `Relation` edges (`controls`, `member_of`, `at_war_with`, `refines_into`, …),
2. `refs` fields on entries,
3. inline `[[entity.id|Label]]` mentions in prose.

Backlinks ("Found in", "Required for", "Referenced by", "Affected by") are computed from that
index, so nothing is maintained by hand. The same index powers the connection graph, orphan
detection and the broken-reference check.

### The map is partly computed

- **Region borders** are Voronoi cells clipped to the hand-drawn coastline, then roughened along
  shared edges with a hash keyed on the edge's endpoints — neighbouring cells displace identically,
  so borders look drawn but never tear. Every settlement is its own region seed, which guarantees a
  city always falls inside the region it is filed under.
- **Faction territory and political influence** are derived from `controls` links at render time.
  Change who runs a city and the political map redraws.
- **Marker positions** are stored per entry and can be dragged in the atlas when editing is on.
  Deposits, sites and creatures are auto-scattered inside their region deterministically.

**Panning does not redraw the map.** Rewriting the SVG `viewBox` repaints the whole chart, which
measures around 40 ms a frame and — being rasterisation rather than script — does not get faster on
a faster CPU. So the SVG is drawn larger than its container, up to 400px past each edge, and a drag
slides it with a `translate3d` transform that the compositor handles without repainting. The
`viewBox` is only rewritten when the gesture ends or the pre-drawn margin runs out: a long drag
costs two repaints rather than one per pointer event. Two consequences worth knowing before
changing `WorldMap`:

- The slide is clamped through the same `clampView` as a real view change. If it were not, the chart
  would slide somewhere the view cannot stay and snap back when it handed over.
- Handing the slide back has to happen in one paint (hence the `flushSync`), or the chart shows the
  old `viewBox` with the transform already cleared for a frame.

`npm run verify:pan` guards both: it asserts a dragged marker tracks the pointer with no backwards
step, and that a sustained drag leaks neither heap nor DOM nodes.

### City sections are rosters

Most sections of a city page list the entries that link to it as a collapsible
category — districts, landmarks, people, fauna, flora, minerals, worked materials,
machines, factions, quests, items, cultures. Closed, a category shows its count and a
strip of tiles; open, every entry is a card with its emblem, its classification and its
own summary line, and the card is the link.

Categories never assert anything new. Membership is entry type plus the classifying
field that type's schema already defines, so Flora is `food` classified Crop/Forage/Fungus
plus `material` classified Biological, and Minerals is `deposit` plus `material` classified
Natural. A material with a source creature is a creature product, not a plant. Add a
category by adding a row to `CITY_ROSTERS` in `src/core/roster.ts`; nothing else changes.

Entries inherited from the city's region — characteristic wildlife, regional deposits —
are included but marked *via <region>*, because "lives in this biome" is a weaker claim
than "lives in this city" and the page should not blur the two.

Tile emblems follow the classification rather than the bare type (`motifFor` in
`src/art/thumb.tsx`): timber draws as a plant, ore as crystal, cast bronze as billets.
Drawing all three as the same crystal was the first version and it made the roster a
wall of identical tiles.

### Persistence

IndexedDB, with a localStorage fallback for browsers that block it. Saves half a second after each
change. The seed is code-split out of the entry bundle and only fetched on a first visit — after
that the world is read straight back out of IndexedDB, so a return visit downloads about 66 kB
rather than 800 kB. There is no server and nothing leaves the browser — so export a JSON backup from
**Data, backup and import** if it matters. JSON round-trips losslessly; Markdown is a one-way
export for reading or committing.

---

## Editing

Reading and editing are separate modes (`Ctrl/Cmd + Shift + E`). Editing gives you structured forms
per type, prose with autocompleted `[[links]]`, tags, image upload, drag-to-move map markers, typed
relation editing, per-entry custom fields, and a **Mark TBD** button on every field for recording an
open question instead of inventing an answer.

Every change is undoable (`Ctrl/Cmd + Z`), records a revision you can revert to, and autosaves.

## Keyboard

| Key | Action |
| --- | --- |
| `/` | Focus search |
| `Ctrl/Cmd + K` | Focus and select search |
| `Ctrl/Cmd + Z` / `Shift+Z` | Undo / redo |
| `Ctrl/Cmd + Shift + E` | Toggle editing |
| Arrows, `+`/`−`, `0` | Pan, zoom and reset the map |

Every action is reachable without a mouse, and nothing is hover-only.

---

## Adding content

Drop a file in `src/world/` that exports `entities` and `relations`; `seed.ts` discovers it
automatically.

```ts
import { E, R, TBD, row, type SeedEntity, type SeedRelation } from './kit'
import { CITY } from './registry'

export const entities: SeedEntity[] = [
  E({
    id: 'faction.example',
    type: 'faction',
    name: 'Example',
    status: 'draft',
    summary: 'One line.',
    fields: {
      factionType: 'Guild',
      ideology: 'Prose, with [[city.gilded-ascent|inline links]].',
      recruitment: TBD('What does it actually demand of a new member?'),
      ranks: [row({ rank: 'Factor', req: 'Two sponsors', grants: 'Warehouse keys' })],
    },
  }),
]

export const relations: SeedRelation[] = [R('faction.example', 'controls', CITY.gildedAscent)]
```

Bump `SEED_VERSION` in `seedMeta.ts` so installs that have not been edited pick the change up. Once a
user edits anything, their work is never overwritten by a seed upgrade.
