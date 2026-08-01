/**
 * Procedural city artwork.
 *
 * No stock imagery ships with this project, so every settlement gets a
 * generated vista built from its own palette and a bespoke silhouette form.
 * The output is deterministic: the same city always draws the same skyline,
 * and each form is written separately so no two cities share a footprint,
 * an architecture or a landmark.
 */

import { useId } from 'react'

export type VistaForm =
  | 'terrace'
  | 'skyring'
  | 'vault'
  | 'canopy'
  | 'cavern'
  | 'sieve'
  | 'warded'
  | 'bowl'
  | 'raft'
  | 'weir'
  | 'frontier'
  | 'highland'
  | 'harbour'
  | 'generic'

const W = 1200
const H = 480

/* Seeded RNG so a city's skyline never changes between loads. */
function rng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    h >>>= 0
    return h / 4294967296
  }
}

/* Colour utilities — palettes arrive as hex strings from the world data. */
function clamp(n: number, a = 0, b = 255) {
  return Math.max(a, Math.min(b, n))
}
function parseHex(hex: string): [number, number, number] {
  const s = hex.replace('#', '')
  const full = s.length === 3 ? s.split('').map((c) => c + c).join('') : s
  const n = parseInt(full.slice(0, 6) || '888888', 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function toHex(rgb: [number, number, number]) {
  return `#${rgb.map((v) => clamp(Math.round(v)).toString(16).padStart(2, '0')).join('')}`
}
export function shade(hex: string, amt: number): string {
  const [r, g, b] = parseHex(hex)
  return amt >= 0
    ? toHex([r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt])
    : toHex([r * (1 + amt), g * (1 + amt), b * (1 + amt)])
}
export function mix(a: string, b: string, t: number): string {
  const A = parseHex(a)
  const B = parseHex(b)
  return toHex([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t])
}

interface Pal {
  sky1: string
  sky2: string
  far: string
  mid: string
  near: string
  build: string
  buildDark: string
  accent: string
  ground: string
}

function palette(colors: string[] | undefined, form: VistaForm): Pal {
  const c = (colors ?? []).filter((x) => /^#[0-9a-fA-F]{3,8}$/.test(x))
  const base = c[0] ?? '#8a7f6b'
  const second = c[1] ?? shade(base, -0.35)
  const accent = c[2] ?? shade(base, 0.3)
  const cool = ['warded', 'skyring', 'harbour', 'cavern'].includes(form)
  const sky1 = cool ? mix('#1b2430', base, 0.14) : mix('#241d18', base, 0.16)
  const sky2 = cool ? mix('#38424e', accent, 0.3) : mix('#4a3b2c', accent, 0.34)
  return {
    sky1,
    sky2,
    far: mix(sky2, second, 0.5),
    mid: mix(second, '#1a1c1f', 0.42),
    near: mix(second, '#101214', 0.62),
    build: mix(base, '#1c1e22', 0.34),
    buildDark: mix(base, '#0d0f11', 0.62),
    accent,
    ground: mix(second, '#0b0c0d', 0.72),
  }
}

/* ------------------------------------------------------------------ */
/* Silhouette forms                                                    */
/* ------------------------------------------------------------------ */

type Draw = (r: () => number, p: Pal) => React.ReactNode

/** The Gilded Ascent — counting houses stacked up a switchback escarpment. */
const terrace: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  const tiers = 9
  const baseY = 408
  const step = 30
  for (let t = 0; t < tiers; t++) {
    const y = baseY - t * step
    const x0 = 96 + t * 46
    const x1 = 1112 - t * 22
    // Retaining wall face, then the terrace deck.
    out.push(<rect key={`w${t}`} x={x0} y={y} width={x1 - x0} height={step} fill={t % 2 ? p.buildDark : p.mid} />)
    out.push(<rect key={`d${t}`} x={x0} y={y - 3} width={x1 - x0} height={4} fill={p.accent} opacity={0.34} />)
    // Course lines in the retaining wall.
    for (let c = 1; c < 3; c++) {
      out.push(
        <line key={`c${t}${c}`} x1={x0} y1={y + (step / 3) * c} x2={x1} y2={y + (step / 3) * c} stroke={p.buildDark} strokeWidth={0.8} opacity={0.5} />,
      )
    }
    // Counting houses along the terrace: narrow, tall, tightly packed.
    const n = 12 + Math.floor(r() * 6)
    for (let i = 0; i < n; i++) {
      const bx = x0 + 10 + ((x1 - x0 - 26) * i) / n + r() * 8
      const bw = 12 + r() * 20
      const bh = 16 + r() * 26
      out.push(<rect key={`b${t}${i}`} x={bx} y={y - bh} width={bw} height={bh} fill={i % 4 === 0 ? p.buildDark : p.build} />)
      out.push(<path key={`r${t}${i}`} d={`M${bx - 2},${y - bh}L${bx + bw / 2},${y - bh - 7}L${bx + bw + 2},${y - bh}Z`} fill={p.accent} opacity={0.5} />)
      // Brass shutters facing the hoists.
      if (bw > 20) out.push(<rect key={`s${t}${i}`} x={bx + 3} y={y - bh + 6} width={bw - 6} height={3} fill={p.accent} opacity={0.65} />)
    }
  }
  // Eight cable hoist runs climbing the face.
  for (let h = 0; h < 8; h++) {
    const hx = 180 + h * 116
    out.push(
      <line key={`h${h}`} x1={hx} y1={baseY + step} x2={hx + 190} y2={baseY - tiers * step} stroke={p.accent} strokeWidth={1.2} opacity={0.4} />,
    )
    out.push(<rect key={`hd${h}`} x={hx + 184} y={baseY - tiers * step} width={12} height={9} fill={p.buildDark} />)
  }
  // The Counting Stair: one roofed switchback climbing every terrace.
  const stair: string[] = [`M540,${baseY + step}`]
  for (let i = 0; i < tiers * 2; i++) {
    const y = baseY + step - i * (step / 2)
    stair.push(`L${540 + (i % 2 ? 46 : 0)},${y}`, `L${540 + (i % 2 ? 46 : 0) + 26},${y}`)
  }
  out.push(<path key="stair" d={stair.join('')} fill="none" stroke={p.accent} strokeWidth={4.5} opacity={0.95} />)
  const crownY = baseY - tiers * step - 46
  out.push(<rect key="crown" x={556} y={crownY} width={64} height={48} fill={p.buildDark} />)
  out.push(<path key="crownroof" d={`M546,${crownY}L588,${crownY - 30}L630,${crownY}Z`} fill={p.accent} />)
  out.push(<rect key="crownband" x={556} y={crownY + 16} width={64} height={4} fill={p.accent} opacity={0.8} />)
  // Wharf water at the foot.
  out.push(<rect key="water" x={0} y={baseY + step} width={W} height={H - baseY - step} fill={mix(p.near, '#16222b', 0.45)} />)
  for (let i = 0; i < 14; i++) {
    out.push(
      <path key={`rp${i}`} d={`M${r() * 1200},${baseY + step + 8 + r() * 30} q16,-3 32,0`} fill="none" stroke={p.accent} strokeWidth={1} opacity={0.2} />,
    )
  }
  return out
}

/** The Sky City — a moored ring riding a thermal, tethered to nothing below. */
const skyring: Draw = (r, p) => {
  const cx = 600
  const cy = 236
  const out: React.ReactNode[] = []
  out.push(<ellipse key="haze" cx={cx} cy={cy + 96} rx={430} ry={54} fill={p.accent} opacity={0.09} />)
  // Hull ring
  out.push(<ellipse key="hull" cx={cx} cy={cy + 44} rx={372} ry={62} fill={p.buildDark} />)
  out.push(<ellipse key="deck" cx={cx} cy={cy + 24} rx={372} ry={62} fill={p.build} />)
  out.push(<ellipse key="void" cx={cx} cy={cy + 24} rx={148} ry={25} fill={p.sky1} />)
  // Mooring masts around the rim
  for (let i = 0; i < 13; i++) {
    const a = (i / 13) * Math.PI * 2
    const mx = cx + Math.cos(a) * 330
    const my = cy + 24 + Math.sin(a) * 55
    const hgt = 42 + r() * 58
    out.push(<rect key={`m${i}`} x={mx - 2.5} y={my - hgt} width={5} height={hgt} fill={p.accent} opacity={0.9} />)
    out.push(<circle key={`mk${i}`} cx={mx} cy={my - hgt} r={3.6} fill={p.accent} />)
    out.push(<line key={`g${i}`} x1={mx} y1={my - hgt} x2={cx} y2={cy - 66} stroke={p.accent} strokeWidth={0.7} opacity={0.32} />)
  }
  // Terraced houses on the deck
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2
    const bx = cx + Math.cos(a) * (200 + r() * 90)
    const by = cy + 20 + Math.sin(a) * (34 + r() * 14)
    const bh = 22 + r() * 44
    out.push(<rect key={`h${i}`} x={bx - 9} y={by - bh} width={18} height={bh} fill={i % 3 ? p.build : p.buildDark} />)
  }
  // The Mooring Crown
  out.push(<rect key="spire" x={cx - 9} y={cy - 118} width={18} height={140} fill={p.buildDark} />)
  out.push(<circle key="crown" cx={cx} cy={cy - 118} r={30} fill="none" stroke={p.accent} strokeWidth={6} />)
  out.push(<circle key="crown2" cx={cx} cy={cy - 118} r={15} fill={p.accent} opacity={0.5} />)
  // Counterweights hanging beneath
  for (let i = 0; i < 5; i++) {
    const wx = cx - 240 + i * 120
    out.push(<line key={`w${i}`} x1={wx} y1={cy + 92} x2={wx} y2={cy + 150 + r() * 60} stroke={p.buildDark} strokeWidth={2} />)
    out.push(<rect key={`ww${i}`} x={wx - 8} y={cy + 150 + r() * 60} width={16} height={22} fill={p.buildDark} />)
  }
  return out
}

/** The Mediterranean City — whitewashed vaults and copper conduits above terraced groves. */
const vault: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  // Terraced groves stepping down to the water
  for (let t = 0; t < 5; t++) {
    const y = 330 + t * 30
    out.push(<rect key={`tr${t}`} x={0} y={y} width={W} height={30} fill={mix(p.ground, p.accent, 0.1 + t * 0.05)} />)
    for (let i = 0; i < 26; i++) {
      const ox = 20 + i * 46 + r() * 16
      out.push(<circle key={`o${t}${i}`} cx={ox} cy={y + 16} r={5 + r() * 3} fill={mix(p.accent, '#2c3a1e', 0.55)} opacity={0.85} />)
    }
  }
  // Vaulted blocks
  for (let i = 0; i < 16; i++) {
    const bx = 60 + i * 70 + r() * 14
    const bw = 46 + r() * 22
    const bh = 60 + r() * 84
    const y = 330 - bh
    out.push(<rect key={`v${i}`} x={bx} y={y} width={bw} height={bh} fill={i % 3 === 0 ? p.build : shade(p.build, 0.16)} />)
    out.push(<path key={`d${i}`} d={`M${bx},${y}A${bw / 2},${bw / 2.6} 0 0 1 ${bx + bw},${y}Z`} fill={p.accent} opacity={0.42} />)
    for (let w = 0; w < 3; w++) {
      out.push(<rect key={`w${i}${w}`} x={bx + 8 + w * 14} y={y + 22} width={6} height={12} fill={p.sky1} opacity={0.7} />)
    }
  }
  // Copper conduit running the length of the city
  out.push(
    <path
      key="conduit"
      d="M0,296 C160,282 300,306 460,292 C620,278 760,304 920,288 C1040,276 1140,296 1200,288"
      fill="none"
      stroke={p.accent}
      strokeWidth={5}
      opacity={0.85}
    />,
  )
  for (let i = 0; i < 9; i++) {
    out.push(<rect key={`p${i}`} x={40 + i * 140} y={288} width={7} height={44} fill={p.accent} opacity={0.7} />)
  }
  // The Tide Orrery — nested rings over the harbour
  const cx = 980
  const cy = 200
  out.push(<circle key="or1" cx={cx} cy={cy} r={72} fill="none" stroke={p.accent} strokeWidth={4} opacity={0.95} />)
  out.push(<ellipse key="or2" cx={cx} cy={cy} rx={72} ry={26} fill="none" stroke={p.accent} strokeWidth={3} opacity={0.8} />)
  out.push(<ellipse key="or3" cx={cx} cy={cy} rx={30} ry={70} fill="none" stroke={p.accent} strokeWidth={2.4} opacity={0.6} />)
  out.push(<circle key="or4" cx={cx} cy={cy} r={11} fill={p.accent} />)
  out.push(<rect key="ortow" x={cx - 13} y={cy + 60} width={26} height={112} fill={p.buildDark} />)
  return out
}

/** The Tree City — fortified galleries strung between colossal trunks. */
const canopy: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  const trunks = [140, 360, 600, 850, 1080]
  out.push(<rect key="fl" x={0} y={410} width={W} height={70} fill={p.ground} />)
  trunks.forEach((tx, i) => {
    const w = 46 + (i % 2) * 22
    out.push(<path key={`tk${i}`} d={`M${tx - w / 2 - 12},440L${tx - w / 2},120L${tx + w / 2},120L${tx + w / 2 + 12},440Z`} fill={p.buildDark} />)
    // canopy mass
    out.push(<ellipse key={`cp${i}`} cx={tx} cy={132 + r() * 22} rx={110 + r() * 44} ry={54 + r() * 20} fill={p.mid} opacity={0.94} />)
    out.push(<ellipse key={`cp2${i}`} cx={tx - 24} cy={116 + r() * 18} rx={72} ry={34} fill={p.far} opacity={0.5} />)
    // redoubts on the trunk
    for (let d = 0; d < 3; d++) {
      const y = 190 + d * 74
      out.push(<rect key={`rd${i}${d}`} x={tx - 46} y={y} width={92} height={30} fill={p.build} />)
      out.push(
        <path key={`cr${i}${d}`} d={`M${tx - 46},${y}L${tx - 46},${y - 8}L${tx - 32},${y - 8}L${tx - 32},${y}L${tx - 18},${y}L${tx - 18},${y - 8}L${tx - 4},${y - 8}L${tx - 4},${y}L${tx + 10},${y}L${tx + 10},${y - 8}L${tx + 24},${y - 8}L${tx + 24},${y}L${tx + 38},${y}L${tx + 38},${y - 8}L${tx + 46},${y - 8}L${tx + 46},${y}Z`}
          fill={p.build}
        />,
      )
      out.push(<rect key={`ba${i}${d}`} x={tx + 30} y={y + 4} width={4} height={26} fill={p.accent} />)
      out.push(<path key={`bn${i}${d}`} d={`M${tx + 34},${y + 4}L${tx + 60},${y + 10}L${tx + 34},${y + 18}Z`} fill={p.accent} opacity={0.9} />)
    }
  })
  // Rope bridges
  for (let i = 0; i < trunks.length - 1; i++) {
    const y = 210 + i * 46
    const a = trunks[i]
    const b = trunks[i + 1]
    out.push(
      <path key={`br${i}`} d={`M${a},${y}Q${(a + b) / 2},${y + 40} ${b},${y}`} fill="none" stroke={p.accent} strokeWidth={2.4} opacity={0.8} />,
    )
    out.push(
      <path key={`br2${i}`} d={`M${a},${y - 18}Q${(a + b) / 2},${y + 22} ${b},${y - 18}`} fill="none" stroke={p.accent} strokeWidth={1.2} opacity={0.45} />,
    )
  }
  // The Bastion Bole — the fortified central trunk
  out.push(<path key="bole" d="M560,470L586,120L676,120L702,470Z" fill={mix(p.buildDark, '#000', 0.25)} />)
  out.push(<rect key="boleg" x={556} y={228} width={150} height={54} fill={p.build} />)
  out.push(<rect key="boleg2" x={568} y={158} width={126} height={44} fill={p.build} />)
  out.push(<path key="bolet" d="M600,158L631,120L662,158Z" fill={p.accent} opacity={0.8} />)
  return out
}

/** The Cave Agrarian City — mirror-lit galleries terraced under a limestone roof. */
const cavern: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<rect key="void" x={0} y={0} width={W} height={H} fill={shade(p.sky1, -0.5)} />)
  // Cavern roof with stalactites
  const roof: string[] = ['M0,0L1200,0L1200,70']
  for (let x = 1200; x >= 0; x -= 40) {
    roof.push(`L${x},${58 + Math.sin(x / 90) * 26 + r() * 20}`)
    if (r() > 0.62) roof.push(`L${x - 10},${120 + r() * 90}L${x - 20},${58 + r() * 20}`)
  }
  roof.push('L0,0Z')
  out.push(<path key="roof" d={roof.join('')} fill={p.buildDark} />)
  // The Sunwell Shaft — a light column from a mirror duct
  out.push(
    <path key="shaft" d="M520,10L680,10L790,470L410,470Z" fill={p.accent} opacity={0.16} />,
  )
  out.push(<path key="shaft2" d="M560,10L640,10L700,470L500,470Z" fill={p.accent} opacity={0.2} />)
  out.push(<circle key="mirror" cx={600} cy={40} r={26} fill={p.accent} opacity={0.85} />)
  // Terraced fields stepping down toward the light
  for (let t = 0; t < 6; t++) {
    const y = 196 + t * 46
    const inset = 40 + t * 26
    out.push(<path key={`f${t}`} d={`M${inset},${y}L${1200 - inset},${y}L${1200 - inset - 26},${y + 46}L${inset + 26},${y + 46}Z`} fill={mix(p.mid, p.accent, 0.06 + t * 0.04)} />)
    for (let i = 0; i < 20; i++) {
      const fx = inset + 30 + i * 52 + r() * 14
      if (fx > 1200 - inset - 30) continue
      const near = Math.abs(fx - 600) < 210
      out.push(
        <path
          key={`cr${t}${i}`}
          d={`M${fx},${y + 38}L${fx},${y + 20}M${fx - 6},${y + 26}L${fx},${y + 20}L${fx + 6},${y + 26}`}
          stroke={near ? p.accent : mix(p.accent, p.near, 0.6)}
          strokeWidth={1.6}
          fill="none"
          opacity={near ? 0.9 : 0.5}
        />,
      )
    }
  }
  // Gallery dwellings cut into the walls
  for (let i = 0; i < 12; i++) {
    const side = i % 2 === 0
    const bx = side ? 14 + r() * 90 : 1090 + r() * 90
    const by = 150 + (i / 12) * 260
    out.push(<rect key={`g${i}`} x={bx} y={by} width={52} height={34} fill={p.build} />)
    out.push(<path key={`ga${i}`} d={`M${bx + 10},${by + 34}L${bx + 10},${by + 16}A8,8 0 0 1 ${bx + 26},${by + 16}L${bx + 26},${by + 34}Z`} fill={p.accent} opacity={0.55} />)
  }
  return out
}

/** The Sifting City — sifting towers over a broken grid of pans. */
const sieve: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  // Dune horizon
  out.push(<path key="dune" d="M0,300 Q160,262 320,296 Q480,330 640,286 Q800,246 960,290 Q1100,326 1200,292 L1200,480 L0,480Z" fill={p.mid} />)
  out.push(<path key="dune2" d="M0,352 Q220,318 420,352 Q640,388 860,346 Q1040,312 1200,348 L1200,480 L0,480Z" fill={p.near} />)
  // Grid of sifting pans
  for (let gx = 0; gx < 10; gx++) {
    for (let gy = 0; gy < 3; gy++) {
      if (r() > 0.78) continue
      const x = 30 + gx * 118 + gy * 16
      const y = 366 + gy * 36
      out.push(<rect key={`pn${gx}${gy}`} x={x} y={y} width={96} height={26} fill="none" stroke={p.accent} strokeWidth={1.3} opacity={0.55} />)
      out.push(<rect key={`pf${gx}${gy}`} x={x} y={y} width={96} height={26} fill={p.accent} opacity={0.08 + r() * 0.12} />)
    }
  }
  // Sifting towers
  for (let i = 0; i < 7; i++) {
    const tx = 90 + i * 168 + r() * 24
    const th = 108 + r() * 68
    const ty = 300 - th
    out.push(<path key={`tw${i}`} d={`M${tx - 26},300L${tx - 15},${ty}L${tx + 15},${ty}L${tx + 26},300Z`} fill={p.buildDark} />)
    for (let s = 0; s < 4; s++) {
      out.push(<line key={`sl${i}${s}`} x1={tx - 24 + s * 2} y1={300 - s * (th / 4)} x2={tx + 24 - s * 2} y2={300 - s * (th / 4)} stroke={p.accent} strokeWidth={1.4} opacity={0.6} />)
    }
    out.push(<rect key={`hp${i}`} x={tx - 20} y={ty - 16} width={40} height={16} fill={p.build} />)
    // falling sifted dust
    out.push(<path key={`ds${i}`} d={`M${tx},300L${tx - 8},350L${tx + 8},350Z`} fill={p.accent} opacity={0.22} />)
  }
  // Sand-shed roofs
  for (let i = 0; i < 14; i++) {
    const bx = 20 + i * 86 + r() * 12
    const by = 292 + r() * 16
    out.push(<path key={`sh${i}`} d={`M${bx},${by}L${bx + 32},${by - 16}L${bx + 64},${by}Z`} fill={p.build} />)
    out.push(<rect key={`sb${i}`} x={bx + 6} y={by} width={52} height={22} fill={p.buildDark} />)
  }
  // The Great Sieve
  out.push(<ellipse key="gs" cx={600} cy={214} rx={132} ry={40} fill="none" stroke={p.accent} strokeWidth={7} />)
  for (let i = 0; i < 11; i++) {
    out.push(<line key={`gsl${i}`} x1={470 + i * 26} y1={186} x2={470 + i * 26} y2={242} stroke={p.accent} strokeWidth={1.6} opacity={0.65} />)
  }
  out.push(<line key="gsa" x1={600} y1={214} x2={600} y2={300} stroke={p.buildDark} strokeWidth={12} />)
  return out
}

/** The Magic City — warded slabs held above a fault by chain and law. */
const warded: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  // The fault itself
  out.push(<path key="fault" d="M0,400 L280,392 L420,436 L620,388 L820,430 L1000,386 L1200,404 L1200,480 L0,480Z" fill={p.near} />)
  out.push(
    <path key="glow" d="M300,404 L470,432 L640,392 L810,430 L980,394" fill="none" stroke={p.accent} strokeWidth={3} opacity={0.75} />,
  )
  // Floating slabs
  const slabs: [number, number, number][] = [
    [210, 250, 190],
    [430, 180, 240],
    [700, 224, 210],
    [930, 164, 170],
    [1080, 288, 130],
  ]
  slabs.forEach(([sx, sy, sw], i) => {
    out.push(<path key={`sl${i}`} d={`M${sx - sw / 2},${sy}L${sx + sw / 2},${sy}L${sx + sw / 2 - 18},${sy + 30}L${sx - sw / 2 + 18},${sy + 30}Z`} fill={p.buildDark} />)
    out.push(<rect key={`st${i}`} x={sx - sw / 2} y={sy - 6} width={sw} height={7} fill={p.build} />)
    // buildings on the slab
    const n = 3 + Math.floor(r() * 3)
    for (let b = 0; b < n; b++) {
      const bw = 20 + r() * 24
      const bh = 34 + r() * 62
      const bx = sx - sw / 2 + 14 + (b * (sw - 40)) / n
      out.push(<rect key={`sb${i}${b}`} x={bx} y={sy - 6 - bh} width={bw} height={bh} fill={b % 2 ? p.build : p.mid} />)
      out.push(<path key={`sp${i}${b}`} d={`M${bx},${sy - 6 - bh}L${bx + bw / 2},${sy - 6 - bh - 18}L${bx + bw},${sy - 6 - bh}Z`} fill={p.accent} opacity={0.5} />)
    }
    // binding chains down to the fault
    for (let c = 0; c < 3; c++) {
      const cxx = sx - sw / 3 + c * (sw / 3)
      out.push(<line key={`ch${i}${c}`} x1={cxx} y1={sy + 30} x2={cxx + (r() - 0.5) * 40} y2={404} stroke={p.accent} strokeWidth={1.5} opacity={0.5} />)
    }
    // ward glyph
    out.push(<circle key={`wd${i}`} cx={sx} cy={sy + 15} r={7} fill="none" stroke={p.accent} strokeWidth={1.6} opacity={0.85} />)
  })
  // The Bound Fault — the great warded arch straddling the crack
  out.push(<path key="arch" d="M470,404 A160,190 0 0 1 790,404" fill="none" stroke={p.buildDark} strokeWidth={26} />)
  out.push(<path key="arch2" d="M470,404 A160,190 0 0 1 790,404" fill="none" stroke={p.accent} strokeWidth={5} opacity={0.75} />)
  for (let i = 0; i < 7; i++) {
    const a = Math.PI + (i / 6) * Math.PI
    out.push(
      <circle key={`ag${i}`} cx={630 + Math.cos(a) * 160} cy={404 + Math.sin(a) * 190} r={5} fill={p.accent} opacity={0.9} />,
    )
  }
  return out
}

/** The Arena City — a sunken ring at the centre of a banner-hung bowl. */
const bowl: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<path key="pl" d="M0,330 Q300,306 600,326 Q900,346 1200,320 L1200,480 L0,480Z" fill={p.mid} />)
  // Concentric seating rings sunk into the ground
  for (let i = 0; i < 5; i++) {
    const rx = 400 - i * 62
    const ry = 116 - i * 18
    out.push(<ellipse key={`ri${i}`} cx={600} cy={352} rx={rx} ry={ry} fill={i % 2 ? p.build : p.buildDark} />)
  }
  out.push(<ellipse key="floor" cx={600} cy={352} rx={104} ry={30} fill={mix(p.near, p.accent, 0.16)} />)
  // Blood channels running out from the floor
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    out.push(
      <line
        key={`bc${i}`}
        x1={600 + Math.cos(a) * 104}
        y1={352 + Math.sin(a) * 30}
        x2={600 + Math.cos(a) * 400}
        y2={352 + Math.sin(a) * 116}
        stroke={p.accent}
        strokeWidth={2}
        opacity={0.4}
      />,
    )
  }
  // Banner masts on the rim
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2
    const mx = 600 + Math.cos(a) * 400
    const my = 352 + Math.sin(a) * 116
    if (my > 400) continue
    const hgt = 54 + r() * 40
    out.push(<rect key={`bm${i}`} x={mx - 2} y={my - hgt} width={4} height={hgt} fill={p.buildDark} />)
    out.push(<path key={`bf${i}`} d={`M${mx + 2},${my - hgt}L${mx + 30},${my - hgt + 10}L${mx + 2},${my - hgt + 22}Z`} fill={p.accent} opacity={0.9} />)
  }
  // Banner-street housing behind the bowl
  for (let i = 0; i < 22; i++) {
    const bx = 10 + i * 55 + r() * 12
    const bh = 40 + r() * 70
    const by = 300 - bh
    if (bx > 380 && bx < 830) continue
    out.push(<rect key={`hb${i}`} x={bx} y={by} width={38} height={bh} fill={i % 3 ? p.build : p.buildDark} />)
    out.push(<path key={`hr${i}`} d={`M${bx - 4},${by}L${bx + 19},${by - 12}L${bx + 42},${by}Z`} fill={p.accent} opacity={0.45} />)
  }
  return out
}

/** The Floating Swamp Settlement — lashed rafts that drift and re-moor. */
const raft: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<rect key="water" x={0} y={286} width={W} height={194} fill={mix(p.near, '#101b18', 0.4)} />)
  for (let i = 0; i < 26; i++) {
    out.push(
      <path
        key={`rip${i}`}
        d={`M${r() * 1200},${300 + r() * 170} q18,-4 36,0`}
        fill="none"
        stroke={p.accent}
        strokeWidth={1}
        opacity={0.16}
      />,
    )
  }
  // Reed beds
  for (let i = 0; i < 70; i++) {
    const rx = r() * 1200
    const ry = 300 + r() * 170
    out.push(<line key={`rd${i}`} x1={rx} y1={ry} x2={rx + (r() - 0.5) * 8} y2={ry - 14 - r() * 20} stroke={p.mid} strokeWidth={1.2} opacity={0.6} />)
  }
  // Raft clusters at different drifts
  const clusters: [number, number, number][] = [
    [200, 340, 3],
    [470, 392, 4],
    [760, 330, 3],
    [1000, 400, 3],
    [610, 452, 2],
  ]
  clusters.forEach(([cx, cy, n], ci) => {
    for (let i = 0; i < n; i++) {
      const rx = cx + (i - n / 2) * 66 + r() * 20
      const ry = cy + (r() - 0.5) * 22
      const rw = 58 + r() * 34
      out.push(<path key={`rf${ci}${i}`} d={`M${rx - rw / 2},${ry}L${rx + rw / 2},${ry}L${rx + rw / 2 - 8},${ry + 10}L${rx - rw / 2 + 8},${ry + 10}Z`} fill={p.buildDark} />)
      // stilt hut
      const hh = 26 + r() * 26
      out.push(<rect key={`hu${ci}${i}`} x={rx - 16} y={ry - hh} width={32} height={hh} fill={p.build} />)
      out.push(<path key={`th${ci}${i}`} d={`M${rx - 24},${ry - hh}L${rx},${ry - hh - 18}L${rx + 24},${ry - hh}Z`} fill={p.accent} opacity={0.65} />)
      // mooring rope to the neighbour
      if (i > 0) {
        out.push(<line key={`mo${ci}${i}`} x1={rx - rw / 2} y1={ry + 4} x2={rx - 66} y2={ry + 4} stroke={p.accent} strokeWidth={1.2} opacity={0.55} />)
      }
    }
  })
  // The Moorstone — the one fixed point the whole town is tethered to
  out.push(<path key="ms" d="M596,300L640,150L676,164L700,300Z" fill={p.buildDark} />)
  out.push(<path key="ms2" d="M612,300L644,178L666,186L682,300Z" fill={p.mid} />)
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    out.push(<line key={`tt${i}`} x1={648} y1={210} x2={648 + Math.cos(a) * 420} y2={300 + Math.abs(Math.sin(a)) * 130} stroke={p.accent} strokeWidth={1} opacity={0.34} />)
  }
  return out
}

/** The Black Weir — basalt sluices and iron gantries across the river's throat. */
const weir: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<rect key="up" x={0} y={210} width={W} height={110} fill={mix(p.near, '#0d1416', 0.35)} />)
  out.push(<rect key="dn" x={0} y={330} width={W} height={150} fill={mix(p.near, '#080c0e', 0.5)} />)
  // The weir wall
  out.push(<rect key="wall" x={0} y={300} width={W} height={38} fill={p.buildDark} />)
  out.push(<rect key="wall2" x={0} y={296} width={W} height={7} fill={p.build} />)
  // Sluice gates, some open
  for (let i = 0; i < 11; i++) {
    const gx = 40 + i * 108
    const open = r() > 0.55
    out.push(<rect key={`gp${i}`} x={gx - 4} y={230} width={8} height={108} fill={p.buildDark} />)
    out.push(<rect key={`gp2${i}`} x={gx + 62} y={230} width={8} height={108} fill={p.buildDark} />)
    out.push(<rect key={`gt${i}`} x={gx + 4} y={open ? 240 : 300} width={58} height={open ? 42 : 38} fill={p.mid} />)
    if (open) {
      out.push(<path key={`fl${i}`} d={`M${gx + 6},338L${gx + 60},338L${gx + 68},420L${gx - 2},420Z`} fill={p.accent} opacity={0.14} />)
      out.push(<path key={`fl2${i}`} d={`M${gx + 16},338L${gx + 50},338L${gx + 54},400L${gx + 12},400Z`} fill={p.accent} opacity={0.1} />)
    }
    // lamp
    out.push(<circle key={`lm${i}`} cx={gx + 33} cy={224} r={4} fill={p.accent} opacity={0.95} />)
  }
  // Iron gantry along the crest
  out.push(<rect key="gan" x={0} y={216} width={W} height={6} fill={p.build} />)
  for (let i = 0; i < 24; i++) {
    out.push(<line key={`gx${i}`} x1={i * 52} y1={222} x2={i * 52 + 26} y2={296} stroke={p.build} strokeWidth={2} opacity={0.8} />)
    out.push(<line key={`gy${i}`} x1={i * 52 + 52} y1={222} x2={i * 52 + 26} y2={296} stroke={p.build} strokeWidth={2} opacity={0.8} />)
  }
  // The Weir Gates — the two great towers
  ;[330, 830].forEach((tx, i) => {
    out.push(<path key={`tw${i}`} d={`M${tx - 42},300L${tx - 32},124L${tx + 32},124L${tx + 42},300Z`} fill={p.buildDark} />)
    out.push(<rect key={`tc${i}`} x={tx - 46} y={108} width={92} height={20} fill={p.build} />)
    for (let w = 0; w < 4; w++) {
      out.push(<rect key={`tv${i}${w}`} x={tx - 10} y={158 + w * 40} width={20} height={22} fill={p.accent} opacity={0.5} />)
    }
  })
  out.push(<path key="span" d="M330,134 Q580,80 830,134" fill="none" stroke={p.build} strokeWidth={9} />)
  return out
}

/** Orath — a frontier city on the desert margin. Deliberately spare. */
const frontier: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<path key="hz" d="M0,320 Q300,300 600,318 Q900,336 1200,312 L1200,480 L0,480Z" fill={p.mid} />)
  out.push(<path key="hz2" d="M0,378 Q400,356 800,380 Q1000,392 1200,372 L1200,480 L0,480Z" fill={p.near} />)
  // Curtain wall
  out.push(<rect key="wl" x={190} y={252} width={820} height={70} fill={p.buildDark} />)
  for (let i = 0; i < 26; i++) {
    out.push(<rect key={`cr${i}`} x={196 + i * 32} y={240} width={18} height={14} fill={p.buildDark} />)
  }
  // Towers
  ;[240, 600, 960].forEach((tx, i) => {
    out.push(<rect key={`tw${i}`} x={tx - 30} y={176} width={60} height={146} fill={p.build} />)
    out.push(<path key={`tr${i}`} d={`M${tx - 38},176L${tx},144L${tx + 38},176Z`} fill={p.accent} opacity={0.7} />)
  })
  // Low flat-roofed blocks inside
  for (let i = 0; i < 15; i++) {
    const bx = 210 + i * 54 + r() * 10
    const bh = 26 + r() * 40
    out.push(<rect key={`bl${i}`} x={bx} y={252 - bh} width={44} height={bh} fill={i % 2 ? p.build : p.buildDark} opacity={0.95} />)
  }
  // Wind-scoured dust
  for (let i = 0; i < 5; i++) {
    out.push(
      <path key={`du${i}`} d={`M${r() * 1200},${330 + r() * 100} q120,-14 240,4`} fill="none" stroke={p.accent} strokeWidth={2} opacity={0.1} />,
    )
  }
  return out
}

/** Oruvai — a highland city. Deliberately spare pending a defined concept. */
const highland: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<path key="pk" d="M0,300 L180,150 L330,264 L470,120 L640,270 L800,170 L960,286 L1120,196 L1200,282 L1200,480 L0,480Z" fill={p.far} />)
  out.push(<path key="pk2" d="M0,360 L200,250 L400,346 L620,246 L840,352 L1040,266 L1200,344 L1200,480 L0,480Z" fill={p.mid} />)
  out.push(<path key="pk3" d="M0,430 Q300,388 600,424 Q900,458 1200,414 L1200,480 L0,480Z" fill={p.near} />)
  // Stepped settlement on the shoulder
  for (let t = 0; t < 4; t++) {
    const y = 400 - t * 34
    const x0 = 380 + t * 30
    const x1 = 860 - t * 26
    out.push(<rect key={`ts${t}`} x={x0} y={y} width={x1 - x0} height={34} fill={t % 2 ? p.build : p.buildDark} opacity={0.94} />)
    for (let i = 0; i < 6; i++) {
      const bx = x0 + 16 + i * ((x1 - x0 - 40) / 6)
      const bh = 20 + r() * 22
      out.push(<rect key={`hb${t}${i}`} x={bx} y={y - bh} width={26} height={bh} fill={p.build} />)
      out.push(<path key={`hr${t}${i}`} d={`M${bx - 4},${y - bh}L${bx + 13},${y - bh - 10}L${bx + 30},${y - bh}Z`} fill={p.accent} opacity={0.5} />)
    }
  }
  // Signal tower
  out.push(<rect key="sig" x={608} y={214} width={24} height={104} fill={p.buildDark} />)
  out.push(<circle key="sigf" cx={620} cy={208} r={11} fill={p.accent} opacity={0.85} />)
  return out
}

/** Keth Veyra — a cold-coast city. Deliberately spare pending a defined concept. */
const harbour: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<rect key="sea" x={0} y={330} width={W} height={150} fill={mix(p.near, '#0c1720', 0.42)} />)
  for (let i = 0; i < 22; i++) {
    out.push(<path key={`wv${i}`} d={`M${r() * 1200},${344 + r() * 130} q22,-5 44,0`} fill="none" stroke={p.accent} strokeWidth={1} opacity={0.14} />)
  }
  // Sea cliffs
  out.push(<path key="cf" d="M0,330 L0,200 L150,214 L260,180 L360,238 L420,330Z" fill={p.buildDark} />)
  out.push(<path key="cf2" d="M1200,330 L1200,190 L1080,206 L960,172 L860,240 L800,330Z" fill={p.buildDark} />)
  // Quays
  for (let i = 0; i < 5; i++) {
    const qx = 440 + i * 78
    out.push(<rect key={`q${i}`} x={qx} y={336} width={16} height={70} fill={p.buildDark} />)
    out.push(<rect key={`qd${i}`} x={qx - 22} y={330} width={60} height={8} fill={p.build} />)
  }
  // Harbour terraces
  for (let i = 0; i < 18; i++) {
    const bx = 400 + i * 26 + r() * 8
    const bh = 34 + r() * 62
    out.push(<rect key={`hb${i}`} x={bx} y={330 - bh} width={22} height={bh} fill={i % 3 ? p.build : p.buildDark} />)
    out.push(<path key={`hr${i}`} d={`M${bx - 3},${330 - bh}L${bx + 11},${330 - bh - 12}L${bx + 25},${330 - bh}Z`} fill={p.accent} opacity={0.45} />)
  }
  // Lighthouse on the mole
  out.push(<path key="lh" d="M968,330L978,180L1002,180L1012,330Z" fill={p.build} />)
  out.push(<rect key="lhl" x={972} y={158} width={36} height={24} fill={p.accent} opacity={0.9} />)
  out.push(<path key="lhb" d="M1008,170 L1180,140 L1180,190Z" fill={p.accent} opacity={0.13} />)
  // Mist bank
  out.push(<rect key="mist" x={0} y={286} width={W} height={54} fill={p.far} opacity={0.34} />)
  return out
}

const generic: Draw = (r, p) => {
  const out: React.ReactNode[] = []
  out.push(<path key="h" d="M0,340 Q300,310 600,338 Q900,364 1200,330 L1200,480 L0,480Z" fill={p.mid} />)
  for (let i = 0; i < 20; i++) {
    const bx = 40 + i * 58 + r() * 10
    const bh = 34 + r() * 76
    out.push(<rect key={`b${i}`} x={bx} y={340 - bh} width={38} height={bh} fill={i % 3 ? p.build : p.buildDark} />)
    out.push(<path key={`r${i}`} d={`M${bx - 4},${340 - bh}L${bx + 19},${340 - bh - 13}L${bx + 42},${340 - bh}Z`} fill={p.accent} opacity={0.5} />)
  }
  return out
}

const FORMS: Record<VistaForm, Draw> = {
  terrace,
  skyring,
  vault,
  canopy,
  cavern,
  sieve,
  warded,
  bowl,
  raft,
  weir,
  frontier,
  highland,
  harbour,
  generic,
}

/** Form assignment per settlement — each city gets its own silhouette. */
export const CITY_FORM: Record<string, VistaForm> = {
  'city.gilded-ascent': 'terrace',
  'city.sky-city': 'skyring',
  'city.mediterranean-city': 'vault',
  'city.tree-city': 'canopy',
  'city.cave-agrarian-city': 'cavern',
  'city.sifting-city': 'sieve',
  'city.magic-city': 'warded',
  'city.arena-city': 'bowl',
  'city.floating-swamp-settlement': 'raft',
  'city.black-weir': 'weir',
  'city.orath': 'frontier',
  'city.oruvai': 'highland',
  'city.keth-veyra': 'harbour',
}

/* ------------------------------------------------------------------ */

export interface VistaProps {
  id: string
  palette?: string[]
  form?: VistaForm
  className?: string
  /** Decorative by default; pass a label when the art carries meaning. */
  title?: string
}

export function CityVista({ id, palette: colors, form, className, title }: VistaProps) {
  const uid = useId().replace(/:/g, '')
  const f = form ?? CITY_FORM[id] ?? 'generic'
  const p = palette(colors, f)
  const r = rng(id)
  const body = FORMS[f](r, p)
  const grad = `sky-${uid}`
  const vig = `vig-${uid}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky1} />
          <stop offset="62%" stopColor={p.sky2} />
          <stop offset="100%" stopColor={mix(p.sky2, p.ground, 0.55)} />
        </linearGradient>
        <radialGradient id={vig} cx="50%" cy="42%" r="78%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${grad})`} />
      {f !== 'cavern' && (
        <g opacity={0.5}>
          {Array.from({ length: 5 }, (_, i) => (
            <ellipse key={i} cx={140 + i * 260} cy={60 + (i % 3) * 34} rx={130 + i * 18} ry={16} fill={p.far} opacity={0.4} />
          ))}
        </g>
      )}
      {body}
      <rect width={W} height={H} fill={`url(#${vig})`} />
    </svg>
  )
}

/**
 * Small square emblem for cards, markers and nav — the same palette, reduced
 * to a mark so a city stays recognisable at 24px.
 */
export function CityCrest({ id, palette: colors, size = 24 }: { id: string; palette?: string[]; size?: number }) {
  const f = CITY_FORM[id] ?? 'generic'
  const p = palette(colors, f)
  const r = rng(`crest-${id}`)
  const marks: Record<VistaForm, React.ReactNode> = {
    terrace: <path d="M3,21 L8,21 L8,15 L13,15 L13,9 L19,9 L19,21 L21,21" fill="none" stroke={p.accent} strokeWidth={2} />,
    skyring: (
      <>
        <ellipse cx={12} cy={13} rx={9} ry={4} fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M12,9 L12,3" stroke={p.accent} strokeWidth={2} />
      </>
    ),
    vault: (
      <>
        <path d="M3,20 L3,12 A4,4 0 0 1 11,12 L11,20" fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M13,20 L13,10 A4,4 0 0 1 21,10 L21,20" fill="none" stroke={p.accent} strokeWidth={2} />
      </>
    ),
    canopy: (
      <>
        <path d="M12,21 L12,8" stroke={p.accent} strokeWidth={2.4} />
        <path d="M5,9 A7,6 0 0 1 19,9" fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M6,14 L18,14" stroke={p.accent} strokeWidth={1.6} />
      </>
    ),
    cavern: (
      <>
        <path d="M2,4 L6,10 L10,4 L14,11 L18,4 L22,9" fill="none" stroke={p.accent} strokeWidth={1.8} />
        <path d="M4,21 L20,21 M7,17 L17,17" stroke={p.accent} strokeWidth={2} />
      </>
    ),
    sieve: (
      <>
        <ellipse cx={12} cy={9} rx={9} ry={3.4} fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M6,12 L8,20 M12,12 L12,21 M18,12 L16,20" stroke={p.accent} strokeWidth={1.6} />
      </>
    ),
    warded: (
      <>
        <path d="M4,16 A8,9 0 0 1 20,16" fill="none" stroke={p.accent} strokeWidth={2} />
        <circle cx={12} cy={16} r={2.6} fill={p.accent} />
        <path d="M2,20 L22,20" stroke={p.accent} strokeWidth={1.4} opacity={0.6} />
      </>
    ),
    bowl: (
      <>
        <ellipse cx={12} cy={14} rx={9.5} ry={5} fill="none" stroke={p.accent} strokeWidth={2} />
        <ellipse cx={12} cy={14} rx={4} ry={2} fill={p.accent} />
      </>
    ),
    raft: (
      <>
        <path d="M2,15 L10,15 L9,18 L3,18Z M13,11 L21,11 L20,14 L14,14Z" fill={p.accent} />
        <path d="M2,21 q5,-3 10,0 q5,3 10,0" fill="none" stroke={p.accent} strokeWidth={1.6} />
      </>
    ),
    weir: (
      <>
        <path d="M2,12 L22,12" stroke={p.accent} strokeWidth={2.4} />
        <path d="M6,12 L6,20 M12,12 L12,21 M18,12 L18,19" stroke={p.accent} strokeWidth={1.8} />
        <path d="M3,6 L21,6" stroke={p.accent} strokeWidth={1.4} opacity={0.7} />
      </>
    ),
    frontier: (
      <>
        <path d="M3,20 L3,11 L21,11 L21,20" fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M3,11 L3,8 M9,11 L9,8 M15,11 L15,8 M21,11 L21,8" stroke={p.accent} strokeWidth={1.8} />
      </>
    ),
    highland: <path d="M2,20 L8,9 L12,15 L17,5 L22,20Z" fill="none" stroke={p.accent} strokeWidth={2} />,
    harbour: (
      <>
        <path d="M12,4 L12,18 M7,13 a5,5 0 0 0 10,0" fill="none" stroke={p.accent} strokeWidth={2} />
        <path d="M8,4 L16,4" stroke={p.accent} strokeWidth={2} />
      </>
    ),
    generic: <rect x={5} y={8} width={14} height={12} fill="none" stroke={p.accent} strokeWidth={2} />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <rect width={24} height={24} fill={mix(p.buildDark, '#000', 0.2)} />
      <rect x={0.5} y={0.5} width={23} height={23} fill="none" stroke={p.accent} strokeWidth={1} opacity={0.4} />
      {marks[CITY_FORM[id] ?? 'generic']}
      <rect x={0} y={0} width={24} height={24} fill={p.accent} opacity={r() * 0.05} />
    </svg>
  )
}
