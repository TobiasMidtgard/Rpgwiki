/**
 * Capture presentation screenshots of the running app.
 *
 *   node scripts/shots.mjs [baseUrl]
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const OUT = '.shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

const go = async (hash, wait = 1400) => {
  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(wait)
}

const SHOTS = [
  ['/', 'dashboard', 1800],
  ['/atlas', 'atlas-paper', 2600],
  ['/cities/city.gilded-ascent', 'city-gilded-ascent', 1800],
  ['/cities/city.sky-city', 'city-sky', 1600],
  ['/cities/city.floating-swamp-settlement', 'city-swamp', 1600],
  ['/factions', 'factions', 1600],
  ['/npcs', 'npcs', 1600],
  ['/quests/flow', 'quest-flow', 2200],
  ['/skills/tree', 'skill-tree', 2400],
  ['/production', 'production', 2400],
  ['/graph', 'graph', 3200],
  ['/search?q=weir', 'search', 1600],
  ['/notes', 'design-notes', 1400],
  ['/about', 'about', 1400],
]

for (const [path, name, wait] of SHOTS) {
  await go(path, wait)
  await page.screenshot({ path: `${OUT}/${name}.png` })
  console.log(`captured ${name}`)
}

// Biome map mode
await go('/atlas', 2400)
await page.getByRole('button', { name: 'Biome' }).click()
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/atlas-biome.png` })

// Political layers on
// The row label wraps the checkbox and intercepts the click, so drive the row.
for (const label of ['Political influence', 'Faction territory', 'Smuggling routes']) {
  const row = page.locator('.layer-row', { hasText: label }).first()
  if (await row.count()) await row.click()
  await page.waitForTimeout(200)
}
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/atlas-political.png` })
console.log('captured atlas-biome, atlas-political')

// City plan, deep on the Place tab
await go('/cities/city.gilded-ascent', 1600)
const placeTab = page.getByRole('tab', { name: /Place/i })
if (await placeTab.count()) {
  await placeTab.click()
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/city-plan.png` })
  console.log('captured city-plan')
}

// Faction matrix
await go('/factions', 1400)
const matrix = page.getByRole('button', { name: /Relationship matrix/i })
if (await matrix.count()) {
  await matrix.click()
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `${OUT}/faction-matrix.png` })
  console.log('captured faction-matrix')
}

// Editing mode
await go('/cities/city.orath', 1400)
const edit = page.getByRole('button', { name: /^Edit$/ }).first()
if (await edit.count()) {
  await edit.click()
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}/editing.png` })
  console.log('captured editing')
}

// Mobile
const m = await ctx.newPage()
await m.setViewportSize({ width: 390, height: 844 })
for (const [path, name] of [
  ['/atlas', 'mobile-atlas'],
  ['/cities/city.gilded-ascent', 'mobile-city'],
  ['/', 'mobile-dashboard'],
]) {
  await m.goto(`${BASE}/#${path}`, { waitUntil: 'networkidle' })
  await m.waitForTimeout(2000)
  await m.screenshot({ path: `${OUT}/${name}.png` })
  console.log(`captured ${name}`)
}
// Mobile inspector as a bottom sheet
await m.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
await m.waitForTimeout(2200)
const marker = m.locator('[data-marker="city.gilded-ascent"]').first()
if (await marker.count()) {
  await marker.click()
  await m.waitForTimeout(1200)
  await m.screenshot({ path: `${OUT}/mobile-sheet.png` })
  console.log('captured mobile-sheet')
}

await browser.close()
console.log('done')
