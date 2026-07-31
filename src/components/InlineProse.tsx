/**
 * Prose with inline cross-links.
 *
 * Authors write `[[entity.id|Label]]` and get a live link that shows the target
 * entry's type and summary. Broken links are shown as broken rather than
 * silently rendered as plain text, so the dashboard's reference check and the
 * page agree.
 *
 * Light emphasis is supported (`**bold**`, `*italic*`, `` `code` ``); anything
 * heavier belongs in its own field.
 */

import { Fragment } from 'react'
import { EntityLink } from './EntityLink'

const TOKEN = /(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g

export function InlineProse({ text }: { text: string }) {
  if (!text) return null
  const paragraphs = text.split(/\n{2,}/)
  return (
    <>
      {paragraphs.map((para, pi) => (
        <p key={pi}>
          {para.split('\n').map((line, li) => (
            <Fragment key={li}>
              {li > 0 ? <br /> : null}
              {renderLine(line)}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  )
}

function renderLine(line: string) {
  const parts = line.split(TOKEN).filter((p) => p !== '' && p !== undefined)
  return parts.map((part, i) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2)
      const bar = inner.indexOf('|')
      const id = (bar >= 0 ? inner.slice(0, bar) : inner).trim()
      const label = bar >= 0 ? inner.slice(bar + 1).trim() : undefined
      return <EntityLink key={i} id={id} label={label} glyph={false} />
    }
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`')) return (
      <code key={i} className="mono">
        {part.slice(1, -1)}
      </code>
    )
    return <Fragment key={i}>{part}</Fragment>
  })
}

/** Plain-text version, for search snippets and titles. */
export function stripInline(text: string): string {
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
}
