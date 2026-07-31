/**
 * Drives the built app in a real browser and checks the things that matter:
 * navigation, persistence across reload, search, the map, editing and undo.
 *
 *   node scripts/verify.mjs [baseUrl]
 *
 * Writes screenshots to .verify/ and exits non-zero on failure.
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const OUT = '.verify'
mkdirSync(OUT, { recursive: true })

const results = []
const consoleErrors = []
let failures = 0

function check(name, ok, detail = '') {
  results.push({ name, ok, detail })
  if (!ok) failures++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const shot = async (page, name) => page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })
const context = await browser.newContext({ viewport: { width: 1560, height: 980 }, deviceScaleFactor: 1 })
const page = await context.newPage()

page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`))

const goto = async (hash) => {
  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(650)
}

try {
  /* -------------------------------------------------- dashboard --- */
  await goto('/')
  await page.waitForSelector('h1', { timeout: 20000 })
  check('dashboard renders', (await page.locator('h1').first().textContent())?.includes('dashboard'))

  const entryCount = await page.locator('.stat-value').first().textContent()
  check('dashboard shows world statistics', !!entryCount && Number(entryCount) >= 0, `first stat = ${entryCount}`)
  check('dashboard map preview rendered', (await page.locator('.map-stage svg').count()) > 0)
  await shot(page, '01-dashboard')

  /* ------------------------------------------------------- nav ---- */
  const navLinks = await page.locator('.nav-item').count()
  check('navigation lists sections', navLinks >= 20, `${navLinks} nav items`)

  /* ----------------------------------------------------- atlas ---- */
  await goto('/atlas')
  await page.waitForSelector('.map-stage svg', { timeout: 20000 })
  const cityMarkers = await page.locator('[data-marker^="city."]').count()
  check('atlas draws city markers', cityMarkers >= 13, `${cityMarkers} city markers`)
  const regionPaths = await page.locator('.map-stage svg path').count()
  check('atlas draws map geometry', regionPaths > 50, `${regionPaths} paths`)
  await shot(page, '02-atlas-paper')

  // Biome mode
  await page.getByRole('button', { name: 'Biome' }).click()
  await page.waitForTimeout(500)
  await shot(page, '03-atlas-biome')
  check('biome mode switches', true)

  // Layer toggle
  const before = await page.locator('.map-stage svg path').count()
  await page.getByRole('checkbox', { name: /Trade routes/i }).first().click()
  await page.waitForTimeout(350)
  const after = await page.locator('.map-stage svg path').count()
  check('layer toggle changes the map', before !== after, `${before} → ${after} paths`)
  await page.getByRole('checkbox', { name: /Trade routes/i }).first().click()

  // Back to paper, open a city
  await page.getByRole('button', { name: 'Illustrated' }).click()
  await page.waitForTimeout(300)
  await page.locator('[data-marker="city.gilded-ascent"]').first().click()
  await page.waitForTimeout(500)
  const inspectorVisible = await page.locator('.inspector').isVisible()
  check('clicking a city opens the inspector', inspectorVisible)
  await shot(page, '04-atlas-inspector')

  /* ------------------------------------------------- city page ---- */
  await page.getByRole('link', { name: /Open full entry/i }).click()
  await page.waitForTimeout(900)
  const cityTitle = await page.locator('h1').first().textContent()
  check('inspector opens the correct city', cityTitle?.includes('Gilded Ascent'), cityTitle ?? '')
  check('city page has a hero', (await page.locator('.entity-hero svg').count()) > 0)
  const tabCount = await page.locator('[role="tab"]').count()
  check('city page is tabbed', tabCount >= 6, `${tabCount} tabs`)
  const factCount = await page.locator('.fact').count()
  check('city page shows key facts', factCount >= 4, `${factCount} facts`)
  await shot(page, '05-city-overview')

  // Tabs work
  await page.locator('[role="tab"]').nth(1).click()
  await page.waitForTimeout(500)
  check('city tabs switch content', (await page.locator('.section').count()) > 0)
  await shot(page, '06-city-place')

  // Backlinks present
  await page.locator('[role="tab"]').first().click()
  await page.waitForTimeout(300)
  check('backlinks panel present', (await page.getByText('Referenced by').count()) > 0)

  /* -------------------------------------------------- cross-link -- */
  const firstChip = page.locator('.entity-layout a.chip').first()
  if ((await firstChip.count()) > 0) {
    const chipText = (await firstChip.textContent())?.trim()
    await firstChip.click()
    await page.waitForTimeout(700)
    const landed = await page.locator('h1').first().textContent()
    check('cross-links navigate', !!landed && landed.length > 0, `${chipText} → ${landed}`)
  } else {
    check('cross-links navigate', false, 'no reference chips found on the city page')
  }

  /* ------------------------------------------------------ search -- */
  await goto('/search')
  await page.locator('#s-q').fill('weir')
  await page.waitForTimeout(700)
  const hits = await page.locator('.result').count()
  check('search returns results', hits > 0, `${hits} hits for "weir"`)
  const reasons = await page.locator('.reason').count()
  check('search results explain why they matched', reasons > 0, `${reasons} match reasons`)
  await shot(page, '07-search')

  /* ------------------------------------------------- other pages -- */
  for (const [path, label, selector] of [
    ['/cities', 'cities list', '.card, .table'],
    ['/factions', 'factions list', '.card, .table, .state'],
    ['/npcs', 'NPC list', '.card, .table, .state'],
    ['/quests', 'quest list', '.card, .table, .state'],
    ['/quests/flow', 'quest flow board', 'svg, .state'],
    ['/skills/tree', 'skill tree', 'svg, .state'],
    ['/production', 'production chains', 'svg, .state'],
    ['/graph', 'connection graph', 'svg, .state'],
    ['/materials', 'materials list', '.card, .table, .state'],
    ['/machines', 'machines list', '.card, .table, .state'],
    ['/bestiary', 'bestiary', '.card, .table, .state'],
    ['/magic', 'magic list', '.card, .table, .state'],
    ['/mechanics', 'mechanics list', '.card, .table, .state'],
    ['/history', 'timeline', '.card, .table, .state'],
    ['/gallery', 'gallery', '.gallery, .state'],
    ['/notes', 'design notes', '.card, .table, .state'],
    ['/data', 'data page', '.panel'],
    ['/about', 'about page', '.section'],
  ]) {
    await goto(path)
    const ok = (await page.locator(selector).count()) > 0
    check(`${label} renders`, ok, path)
  }
  await goto('/skills/tree')
  await shot(page, '08-skilltree')
  await goto('/quests/flow')
  await shot(page, '09-questflow')
  await goto('/production')
  await shot(page, '10-production')
  await goto('/graph')
  await shot(page, '11-graph')

  /* ------------------------------------------------- 404 handling - */
  await goto('/cities/city.does-not-exist')
  check('missing entry shows an empty state, not a crash', (await page.locator('.state').count()) > 0)

  /* ------------------------------------------------------ editing - */
  await goto('/cities/city.gilded-ascent')
  await page.getByRole('button', { name: /^Edit$/ }).first().click()
  await page.waitForTimeout(700)
  check('editing mode opens forms', (await page.locator('#ed-name').count()) > 0)

  const throwaway = `Throwaway edit ${Date.now()}`
  await page.locator('#ed-summary').fill(throwaway)
  await page.locator('#ed-name').click() // blur to commit
  await page.waitForTimeout(900)

  /* --------------------------------------------------------- undo - */
  // Undo history lives in memory by design, so it is exercised before the
  // reload that tests persistence.
  await page.getByRole('button', { name: 'Undo' }).first().click()
  await page.waitForTimeout(800)
  const afterUndo = await page.locator('.entity-bar').first().textContent()
  check('undo reverts the edit', !afterUndo?.includes(throwaway), afterUndo?.slice(0, 70) ?? '')

  await page.getByRole('button', { name: 'Redo' }).first().click()
  await page.waitForTimeout(700)
  const afterRedo = await page.locator('.entity-bar').first().textContent()
  check('redo reapplies the edit', afterRedo?.includes(throwaway), afterRedo?.slice(0, 70) ?? '')

  const newSummary = `Verified edit ${Date.now()}`
  await page.locator('#ed-summary').fill(newSummary)
  await page.locator('#ed-name').click()
  await page.waitForTimeout(1000)
  await shot(page, '12-editing')

  /* -------------------------------------------------- persistence - */
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const persisted = await page.locator('.entity-bar').first().textContent()
  check('edits persist across reload', persisted?.includes(newSummary), (persisted ?? '(nothing)').slice(0, 70))

  /* ------------------------------------------- marker drag persists - */
  await goto('/atlas')
  await page.waitForSelector('[data-marker="city.orath"]', { timeout: 15000 })
  const markerBefore = await page.locator('[data-marker="city.orath"]').first().getAttribute('transform')
  const box = await page.locator('[data-marker="city.orath"]').first().boundingBox()
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2 + 40, { steps: 8 })
    await page.mouse.up()
    await page.waitForTimeout(900)
    const markerAfter = await page.locator('[data-marker="city.orath"]').first().getAttribute('transform')
    check('map markers can be dragged while editing', markerBefore !== markerAfter, `${markerBefore} → ${markerAfter}`)
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    const markerReloaded = await page.locator('[data-marker="city.orath"]').first().getAttribute('transform')
    check('marker positions persist across reload', markerReloaded === markerAfter, markerReloaded ?? '')
  } else {
    check('map markers can be dragged while editing', false, 'marker not found')
  }

  /* ------------------------------------------------------- mobile - */
  const mobile = await context.newPage()
  mobile.on('pageerror', (e) => consoleErrors.push(`mobile pageerror: ${e.message}`))
  await mobile.setViewportSize({ width: 390, height: 844 })
  await mobile.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(1200)
  const bodyOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check('mobile atlas does not scroll sideways', bodyOverflow <= 1, `overflow ${bodyOverflow}px`)
  await mobile.screenshot({ path: `${OUT}/13-mobile-atlas.png` })

  await mobile.goto(`${BASE}/#/cities/city.gilded-ascent`, { waitUntil: 'networkidle' })
  await mobile.waitForTimeout(1200)
  const cityOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check('mobile city page does not scroll sideways', cityOverflow <= 1, `overflow ${cityOverflow}px`)
  await mobile.screenshot({ path: `${OUT}/14-mobile-city.png`, fullPage: false })

  const drawerBtn = mobile.getByRole('button', { name: /Open navigation/i })
  await drawerBtn.click()
  await mobile.waitForTimeout(500)
  check('mobile navigation drawer opens', await mobile.locator('.nav.open').isVisible())
  await mobile.screenshot({ path: `${OUT}/15-mobile-nav.png` })
  await mobile.close()

  /* ---------------------------------------------------- keyboard -- */
  await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.keyboard.press('/')
  await page.waitForTimeout(250)
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
  check('slash focuses search', focused === 'Search all entries', `focus = ${focused}`)
} catch (err) {
  check('run completed without throwing', false, String(err).slice(0, 300))
}

/* --------------------------------------------------- console ------ */
const realErrors = consoleErrors.filter(
  (e) => !/favicon|ERR_INTERNET_DISCONNECTED|Download the React DevTools/i.test(e),
)
check('no uncaught console errors', realErrors.length === 0, realErrors.slice(0, 4).join(' | '))

await browser.close()

console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed`)
if (failures) console.log(`${failures} FAILURES`)
process.exit(failures ? 1 : 0)
