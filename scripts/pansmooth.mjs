/**
 * Checks that panning is *smooth*, not just fast: the map is slid with a
 * compositor transform and periodically handed back to the viewBox, and if
 * those two ever disagree for a frame the chart snaps backwards. Drags a long
 * way in one direction and asserts a known marker tracks the pointer without
 * ever moving the wrong way.
 */

import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })
const page = await browser.newPage({ viewport: { width: 1500, height: 940 } })
await page.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
await page.waitForSelector('.map-stage svg', { timeout: 30000 })
await page.waitForTimeout(2200)

const marker = page.locator('.map-stage svg [data-marker="city.gilded-ascent"]').first()
if (!(await marker.count())) {
  console.log('could not find the anchor marker')
  process.exit(1)
}

const box = await page.locator('.map-stage').boundingBox()
const startX = box.x + box.width * 0.2
const cy = box.y + box.height / 2

// Zoom in first: at the fitted view the whole world is already on screen, so
// the view is clamped almost still and no hand-over ever happens. Panning only
// travels far enough to exercise the slide/viewBox hand-over once zoomed.
const ZOOMS = Number(process.env.ZOOM ?? 5)
for (let i = 0; i < ZOOMS; i++) {
  await page.mouse.move(box.x + box.width / 2, cy)
  await page.mouse.wheel(0, -240)
  await page.waitForTimeout(120)
}
await page.waitForTimeout(600)

await page.mouse.move(startX, cy)
await page.mouse.down()

const samples = []
const STEPS = 44
const TRAVEL = box.width * 0.62 // several overscan budgets' worth
for (let i = 1; i <= STEPS; i++) {
  await page.mouse.move(startX + (TRAVEL * i) / STEPS, cy)
  const s = await page.evaluate(() => {
    const el = document.querySelector('.map-stage svg [data-marker="city.gilded-ascent"]')
    const svg = document.querySelector('.map-stage svg')
    return {
      x: el ? el.getBoundingClientRect().x : null,
      t: svg.style.transform,
      vb: svg.getAttribute('viewBox'),
    }
  })
  samples.push(s)
}
await page.mouse.up()
await page.waitForTimeout(300)

const xs = samples.map((s) => s.x)
if (xs.some((x) => x === null)) {
  console.log('marker left the drawn area mid-drag — overscan is too small')
  process.exit(1)
}

// Dragging right must move the marker right. Any backwards step is the flash.
let worst = 0
let worstAt = -1
for (let i = 1; i < xs.length; i++) {
  const d = xs[i] - xs[i - 1]
  if (d < worst) {
    worst = d
    worstAt = i
  }
}

const handovers = new Set(samples.map((s) => s.vb)).size - 1
const total = xs[xs.length - 1] - xs[0]
const stepPx = TRAVEL / STEPS

console.log(`dragged ${TRAVEL.toFixed(0)}px right in ${STEPS} steps (${stepPx.toFixed(1)}px each)`)
console.log(`marker travelled ${total.toFixed(0)}px, ${handovers} viewBox hand-over(s)`)
console.log(`largest backwards step: ${worst.toFixed(1)}px${worstAt >= 0 ? ` at step ${worstAt}` : ''}`)
// A hand-over flash rebounds by roughly a whole overscan budget; sub-pixel
// wobble from rounding is fine.
console.log(worst > -2 ? '\nPASS — no snap-back during the drag' : '\nFAIL — the map jumps backwards at hand-over')

await browser.close()
process.exit(worst > -2 ? 0 : 1)
