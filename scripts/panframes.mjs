/**
 * Measures the two paths directly: sliding the rendered chart with a transform
 * versus rewriting the viewBox. Also confirms the slide path is what a real
 * drag actually uses.
 */

import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })
const page = await browser.newPage({ viewport: { width: 1500, height: 940 } })

await page.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
await page.waitForSelector('.map-stage svg', { timeout: 30000 })
await page.waitForTimeout(2200)

const r = await page.evaluate(async () => {
  const svg = document.querySelector('.map-stage svg')
  const frame = () => new Promise((res) => requestAnimationFrame(res))
  const time = async (fn) => {
    for (let i = 0; i < 3; i++) await frame()
    const t0 = performance.now()
    for (let i = 0; i < 20; i++) {
      fn(i)
      await frame()
    }
    return (performance.now() - t0) / 20
  }

  const vb = svg.getAttribute('viewBox').split(' ').map(Number)
  const slide = await time((i) => {
    svg.style.transform = `translate3d(${(i % 10) * 12}px, ${(i % 7) * 8}px, 0)`
  })
  svg.style.transform = ''
  const repaint = await time((i) => {
    svg.setAttribute('viewBox', `${vb[0] + i * 8} ${vb[1] + i * 4} ${vb[2]} ${vb[3]}`)
  })
  svg.setAttribute('viewBox', vb.join(' '))

  return {
    slide,
    repaint,
    overscanned: svg.getBoundingClientRect().width > document.querySelector('.map-stage').getBoundingClientRect().width + 10,
  }
})

console.log(`slide (compositor transform): ${r.slide.toFixed(1)} ms/frame  (~${(1000 / r.slide).toFixed(0)} fps)`)
console.log(`repaint (viewBox rewrite):    ${r.repaint.toFixed(1)} ms/frame  (~${(1000 / r.repaint).toFixed(0)} fps)`)
console.log(`chart drawn wider than stage: ${r.overscanned}`)

// Confirm a real drag uses the slide path rather than rewriting the viewBox.
const before = await page.evaluate(() => document.querySelector('.map-stage svg').getAttribute('viewBox'))
const box = await page.locator('.map-stage').boundingBox()
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
await page.mouse.down()
await page.mouse.move(box.x + box.width / 2 + 70, box.y + box.height / 2 + 40, { steps: 10 })
const midTransform = await page.evaluate(() => document.querySelector('.map-stage svg').style.transform)
const midViewBox = await page.evaluate(() => document.querySelector('.map-stage svg').getAttribute('viewBox'))
await page.mouse.up()
await page.waitForTimeout(400)
const after = await page.evaluate(() => ({
  vb: document.querySelector('.map-stage svg').getAttribute('viewBox'),
  t: document.querySelector('.map-stage svg').style.transform,
}))

console.log(`\nduring drag: transform="${midTransform}" viewBox unchanged=${midViewBox === before}`)
console.log(`after drag:  transform cleared=${after.t === ''} viewBox moved=${after.vb !== before}`)

await browser.close()
