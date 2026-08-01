/**
 * Pan cost under CPU throttling, i.e. on an ordinary laptop or phone rather
 * than a server VM.
 */

import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined })

for (const rate of [1, 4, 6]) {
  const page = await browser.newPage({ viewport: { width: 1500, height: 940 } })
  const cdp = await page.context().newCDPSession(page)
  await page.goto(`${BASE}/#/atlas`, { waitUntil: 'networkidle' })
  await page.waitForSelector('.map-stage svg', { timeout: 30000 })
  await page.waitForTimeout(2200)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate })

  const ms = await page.evaluate(async () => {
    const svg = document.querySelector('.map-stage svg')
    const vb = svg.getAttribute('viewBox').split(' ').map(Number)
    // Warm up, then time 20 viewBox changes waited out frame by frame.
    for (let i = 0; i < 3; i++) await new Promise((r) => requestAnimationFrame(r))
    const t0 = performance.now()
    for (let i = 0; i < 20; i++) {
      svg.setAttribute('viewBox', `${vb[0] + i * 8} ${vb[1] + i * 4} ${vb[2]} ${vb[3]}`)
      await new Promise((r) => requestAnimationFrame(r))
    }
    return (performance.now() - t0) / 20
  })
  const fps = 1000 / ms
  console.log(`CPU ${rate}x throttle: ${ms.toFixed(1)} ms/frame  (~${fps.toFixed(0)} fps)${fps < 15 ? '   <- unusable' : fps < 30 ? '   <- janky' : ''}`)
  await page.close()
}

await browser.close()
