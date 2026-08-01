/**
 * Soak test for the reported "moving around the map crashes the page": drags the
 * map continuously, then checks the page is still alive, responsive, and has not
 * leaked heap or DOM nodes. Also confirms the paper-mode sea hatching still paints
 * after the clipPath removal.
 */

import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })
const page = await browser.newPage({ viewport: { width: 1500, height: 940 } })

const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('crash', () => errors.push('PAGE CRASHED'))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
await page.waitForSelector('.map-stage svg', { timeout: 30000 })
await page.waitForTimeout(2200)

// The sea hatch is now a pattern-filled rect rather than 160 clipped lines.
const hatch = await page.evaluate(() => {
  const svg = document.querySelector('.map-stage svg')
  const rect = svg.querySelector('rect[fill^="url(#sealines')
  if (!rect) return { present: false }
  const id = rect.getAttribute('fill').slice(5, -1)
  const pattern = svg.querySelector(`#${CSS.escape(id)}`)
  return {
    present: true,
    lines: pattern ? pattern.querySelectorAll('path, line').length : 0,
    covers: rect.getBoundingClientRect().width > window.innerWidth,
  }
})
console.log(`sea hatch: rect=${hatch.present} pattern strokes=${hatch.lines} covers viewport=${hatch.covers}`)

const sample = async () => {
  await page.evaluate(() => window.gc?.())
  return page.evaluate(() => ({
    heap: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1e6) : -1,
    nodes: document.querySelectorAll('.map-stage svg *').length,
  }))
}

const before = await sample()
const box = await page.locator('.map-stage').boundingBox()
const cx = box.x + box.width / 2
const cy = box.y + box.height / 2

const t0 = Date.now()
let moves = 0
for (let pass = 0; pass < 6; pass++) {
  await page.mouse.move(cx, cy)
  await page.mouse.down()
  for (let i = 0; i < 40; i++) {
    await page.mouse.move(cx + Math.sin(i / 4) * 300, cy + Math.cos(i / 5) * 190)
    moves++
  }
  await page.mouse.up()
  // Zooming between drags exercises the commit path as well as the slide path.
  await page.mouse.wheel(0, pass % 2 ? 240 : -240)
}
const dragMs = Date.now() - t0

await page.waitForTimeout(1200)
const after = await sample()

// Still responsive? Selecting a city has to work after all that panning.
await page.evaluate(() => {
  document.querySelector('.map-stage')?.dispatchEvent(new WheelEvent('wheel', { deltaY: -600, bubbles: true }))
})
const alive = await page
  .evaluate(() => document.querySelectorAll('.map-stage svg [data-marker="city"], .map-stage svg g[role="button"]').length)
  .catch(() => -1)

console.log(`\n${moves} pointer moves across 6 drags in ${dragMs} ms  (${(dragMs / moves).toFixed(1)} ms/move)`)
console.log(`heap  ${before.heap} MB -> ${after.heap} MB`)
console.log(`nodes ${before.nodes} -> ${after.nodes}`)
console.log(`page alive after soak: ${alive > 0} (${alive} interactive markers)`)
console.log(errors.length ? `\nERRORS:\n${errors.join('\n')}` : '\nno page errors')

await browser.close()
