/**
 * About: what is canon, what is a proposal, and how the wiki works.
 *
 * This page exists because the honesty of the seed matters more than its
 * volume. Anyone opening this project needs to know which parts they can rely
 * on and which parts are scaffolding waiting to be replaced.
 */

import { Link } from 'react-router-dom'
import { STATUSES, STATUS_META } from '../core/types'
import { CANON_ANCHORS, CITY_NAME } from '../world/registry'
import { StatusBadge } from '../components/ui'
import { entityPathById } from '../components/EntityLink'

const SHORTCUTS: [string, string][] = [
  ['/', 'Focus the search box'],
  ['Ctrl / Cmd + K', 'Focus and select the search box'],
  ['Ctrl / Cmd + Z', 'Undo the last change'],
  ['Ctrl / Cmd + Shift + Z', 'Redo'],
  ['Ctrl / Cmd + Shift + E', 'Toggle editing mode'],
  ['Arrow keys', 'Pan the map when it has focus'],
  ['+ / −', 'Zoom the map'],
  ['0', 'Reset the map view'],
  ['Tab', 'Move between controls; every action is reachable without a mouse'],
]

export default function AboutPage() {
  return (
    <div className="main-pad" style={{ maxWidth: 940 }}>
      <div className="page-head">
        <div>
          <h1>About this wiki</h1>
          <p className="lede">
            An interactive atlas, a lore encyclopedia and a game-design database for one RPG project, in a single
            editable application.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>What is canon here</h2>
          <span className="rule" />
        </div>
        <div className="prose">
          <p>
            This wiki was built from a written brief. That brief is the only source of established canon, and it is
            short: it names thirteen settlements, fixes a handful of facts about them, and sets the tone. Everything
            else in this seed — region names, governments, factions, characters, quests, materials, machines, history —
            is a <strong>proposal written to make the tool usable and to show what each section is for</strong>.
          </p>
          <p>
            Proposals are marked <StatusBadge status="draft" /> and say so in their developer notes. Real unknowns are
            recorded as <span className="tbd-tag">TBD</span> with the open question attached, rather than being filled
            in with invented detail. Those questions are collected on the{' '}
            <Link to="/">dashboard</Link> and in <Link to="/notes">Design Notes</Link>.
          </p>
          <p>
            Four settlements — <strong>the Black Weir</strong>, <strong>Orath</strong>, <strong>Oruvai</strong> and{' '}
            <strong>Keth Veyra</strong> — have canon names and no established concept. Their entries are deliberately
            lighter than the rest and lean heavily on TBD. Overwrite them freely.
          </p>
          <p>
            Settlements whose names the brief did not give carry a <span className="working-title">Working title</span>{' '}
            tag. Renaming an entry never changes its id, so existing links keep working.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Canon anchors</h2>
          <span className="rule" />
        </div>
        <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
          Every statement treated as established. Nothing outside this list was taken as fixed.
        </p>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Established fact</th>
              </tr>
            </thead>
            <tbody>
              {CANON_ANCHORS.map((a, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {a.subject === 'world' ? (
                      <span className="dim">The world</span>
                    ) : (
                      <Link to={entityPathById(a.subject, 'city')}>{CITY_NAME[a.subject] ?? a.subject}</Link>
                    )}
                  </td>
                  <td>{a.fact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Status vocabulary</h2>
          <span className="rule" />
        </div>
        <dl className="kv">
          {STATUSES.map((s) => (
            <div key={s} style={{ display: 'contents' }}>
              <dt>
                <StatusBadge status={s} />
              </dt>
              <dd>{STATUS_META[s].hint}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How the data model works</h2>
          <span className="rule" />
        </div>
        <div className="prose">
          <p>
            Everything is an entry with a type, and every type declares its own fields in one schema file. Pages,
            forms, filters and the quick-create menu are all generated from that schema, so adding a new kind of entry
            is a data change rather than an application rewrite. Per-entry custom fields can be added without touching
            the schema at all.
          </p>
          <p>
            Entries are connected by typed links. Backlinks are automatic: if a quest references an NPC, that NPC's page
            shows the quest under “Involved in” without anyone maintaining a second list. The same index powers the
            connection graph, orphan detection and the broken-reference check.
          </p>
          <p>
            Some of the map is computed rather than stored. Region borders are generated as clipped Voronoi cells so
            they tile without gaps; faction territory and political influence are derived from <em>controls</em> links,
            so changing who runs a city immediately redraws the political map.
          </p>
          <p>
            No project artwork was available, so settlement art is generated: each city has its own silhouette form,
            palette and central landmark, drawn deterministically from its entry. Replace it by uploading images in the{' '}
            <Link to="/gallery">gallery</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Your data</h2>
          <span className="rule" />
        </div>
        <div className="prose">
          <p>
            Everything you write is stored in this browser and saved automatically. There is no server and nothing is
            uploaded anywhere. That also means clearing site data deletes it, so use{' '}
            <Link to="/data">Data, backup and import</Link> to export a JSON copy of anything you want to keep.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Keyboard</h2>
          <span className="rule" />
        </div>
        <div className="table-wrap">
          <table className="table">
            <tbody>
              {SHORTCUTS.map(([k, v]) => (
                <tr key={k}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className="mono">{k}</span>
                  </td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
