/**
 * Header bands for non-settlement entries.
 *
 * A quiet, deterministic geometric field derived from the entry's type accent
 * and its id — enough to give each section a visual identity without turning
 * the page into decoration.
 */

import { useId } from 'react'
import type { EntityType } from '../core/types'

export const ACCENT: Record<EntityType, string> = {
  region: '#6f8f6a',
  city: '#c08a4a',
  district: '#a8804f',
  landmark: '#a8804f',
  site: '#91856a',
  faction: '#9d4f45',
  npc: '#c2a05a',
  quest: '#4f8296',
  item: '#8f7fb0',
  material: '#7d8b96',
  machine: '#8a8461',
  recipe: '#8a8461',
  creature: '#6d8f7d',
  spell: '#7a6bab',
  food: '#97a15c',
  religion: '#a97b8b',
  mechanic: '#6a8ba3',
  skill: '#b08a55',
  event: '#8d8378',
  war: '#b2453a',
  route: '#91856a',
  deposit: '#7d8b96',
  note: '#7b8794',
}

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

export function TypeBanner({ type, id, height = 128 }: { type: EntityType; id: string; height?: number }) {
  const uid = useId().replace(/:/g, '')
  const accent = ACCENT[type] ?? '#8a8069'
  const r = rng(`${type}:${id}`)
  const W = 1200
  const H = 200

  const shapes: React.ReactNode[] = []

  switch (type) {
    case 'faction':
    case 'war': {
      // Overlapping banner pennants.
      for (let i = 0; i < 9; i++) {
        const x = 40 + i * 132 + r() * 30
        const h = 96 + r() * 76
        shapes.push(
          <path key={i} d={`M${x},0 L${x + 62},0 L${x + 62},${h} L${x + 31},${h - 26} L${x},${h} Z`} fill={accent} opacity={0.1 + r() * 0.16} />,
        )
      }
      break
    }
    case 'npc':
    case 'religion': {
      // Concentric arcs, like a seal.
      for (let i = 0; i < 7; i++) {
        shapes.push(<circle key={i} cx={W * 0.78} cy={H * 0.5} r={24 + i * 26} fill="none" stroke={accent} strokeWidth={1.4} opacity={0.3 - i * 0.03} />)
      }
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2
        shapes.push(
          <line key={`t${i}`} x1={W * 0.78 + Math.cos(a) * 176} y1={H * 0.5 + Math.sin(a) * 176} x2={W * 0.78 + Math.cos(a) * 194} y2={H * 0.5 + Math.sin(a) * 194} stroke={accent} strokeWidth={1.6} opacity={0.28} />,
        )
      }
      break
    }
    case 'quest': {
      // Branching paths.
      let y = H / 2
      for (let i = 0; i < 5; i++) {
        const x0 = i * 250
        const y1 = 40 + r() * 120
        shapes.push(<path key={i} d={`M${x0},${y} C${x0 + 120},${y} ${x0 + 130},${y1} ${x0 + 250},${y1}`} fill="none" stroke={accent} strokeWidth={2} opacity={0.4} />)
        shapes.push(<path key={`b${i}`} d={`M${x0},${y} C${x0 + 120},${y} ${x0 + 130},${H - y1} ${x0 + 250},${H - y1}`} fill="none" stroke={accent} strokeWidth={1.2} opacity={0.22} strokeDasharray="5 5" />)
        shapes.push(<circle key={`n${i}`} cx={x0} cy={y} r={5} fill={accent} opacity={0.6} />)
        y = y1
      }
      break
    }
    case 'material':
    case 'deposit': {
      // Crystal / bedding sections.
      for (let i = 0; i < 14; i++) {
        const x = i * 92 + r() * 20
        const h = 40 + r() * 130
        shapes.push(<path key={i} d={`M${x},${H} L${x + 20},${H - h} L${x + 52},${H - h + 18} L${x + 72},${H} Z`} fill={accent} opacity={0.1 + r() * 0.18} />)
      }
      break
    }
    case 'machine':
    case 'recipe': {
      // Gear teeth and shafts.
      for (let i = 0; i < 4; i++) {
        const cx = 150 + i * 320
        const cy = H / 2
        const rad = 46 + r() * 30
        const teeth = 12
        const d: string[] = []
        for (let t = 0; t < teeth; t++) {
          const a0 = (t / teeth) * Math.PI * 2
          const a1 = ((t + 0.5) / teeth) * Math.PI * 2
          d.push(`${t === 0 ? 'M' : 'L'}${cx + Math.cos(a0) * rad},${cy + Math.sin(a0) * rad}`)
          d.push(`L${cx + Math.cos(a1) * (rad * 1.18)},${cy + Math.sin(a1) * (rad * 1.18)}`)
        }
        shapes.push(<path key={i} d={`${d.join('')}Z`} fill="none" stroke={accent} strokeWidth={1.8} opacity={0.3} />)
        shapes.push(<circle key={`c${i}`} cx={cx} cy={cy} r={rad * 0.3} fill="none" stroke={accent} strokeWidth={1.4} opacity={0.34} />)
      }
      shapes.push(<line key="shaft" x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={accent} strokeWidth={1} opacity={0.22} />)
      break
    }
    case 'spell': {
      // Ward geometry.
      const cx = W * 0.5
      const cy = H * 0.5
      for (const n of [3, 5, 7]) {
        const pts: string[] = []
        for (let i = 0; i <= n; i++) {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          pts.push(`${cx + Math.cos(a) * (40 + n * 12)},${cy + Math.sin(a) * (40 + n * 12)}`)
        }
        shapes.push(<polyline key={n} points={pts.join(' ')} fill="none" stroke={accent} strokeWidth={1.4} opacity={0.32} />)
      }
      break
    }
    case 'creature':
    case 'food': {
      // Organic growth curves.
      for (let i = 0; i < 12; i++) {
        const x = i * 104 + r() * 30
        shapes.push(
          <path key={i} d={`M${x},${H} q${20 + r() * 30},${-70 - r() * 70} ${50 + r() * 40},${-100 - r() * 60}`} fill="none" stroke={accent} strokeWidth={1.8} opacity={0.28} />,
        )
      }
      break
    }
    case 'skill':
    case 'mechanic': {
      // Node lattice.
      const nodes: [number, number][] = []
      for (let i = 0; i < 22; i++) nodes.push([r() * W, 20 + r() * (H - 40)])
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1])
          if (d < 150) shapes.push(<line key={`e${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} stroke={accent} strokeWidth={0.9} opacity={0.24} />)
        }
      }
      nodes.forEach(([x, y], i) => shapes.push(<circle key={`n${i}`} cx={x} cy={y} r={3.4} fill={accent} opacity={0.5} />))
      break
    }
    case 'event': {
      // Timeline ticks.
      shapes.push(<line key="axis" x1={0} y1={H * 0.62} x2={W} y2={H * 0.62} stroke={accent} strokeWidth={1.6} opacity={0.4} />)
      for (let i = 0; i < 26; i++) {
        const x = 20 + i * 46
        const big = i % 4 === 0
        shapes.push(<line key={i} x1={x} y1={H * 0.62} x2={x} y2={H * 0.62 - (big ? 44 : 18)} stroke={accent} strokeWidth={big ? 2 : 1.2} opacity={big ? 0.5 : 0.3} />)
      }
      break
    }
    default: {
      // Contour lines — the default atlas texture.
      for (let i = 0; i < 9; i++) {
        const y = 10 + i * 22
        const pts: string[] = [`M0,${y}`]
        for (let x = 60; x <= W; x += 60) pts.push(`Q${x - 30},${y + (r() - 0.5) * 40} ${x},${y + (r() - 0.5) * 22}`)
        shapes.push(<path key={i} d={pts.join(' ')} fill="none" stroke={accent} strokeWidth={1.2} opacity={0.26} />)
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height }} aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14161a" />
          <stop offset="100%" stopColor="#0d0f11" />
        </linearGradient>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e0f11" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#0e0f11" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0e0f11" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#bg-${uid})`} />
      {shapes}
      <rect width={W} height={H} fill={`url(#fade-${uid})`} />
      <rect x={0} y={H - 2} width={W} height={2} fill={accent} opacity={0.55} />
    </svg>
  )
}
