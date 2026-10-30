import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { H, W } from '../pointer'

export default function Iris({ big, cap, next }) {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const R0 = Math.hypot(W(), H()) / 2 + 60
  const R1 = Math.min(W(), H()) * 0.3
  const r = useSpring(useTransform(p, [0, 0.4, 0.55, 0.7], [R0, R1, R1, 0]), {
    stiffness: 180,
    damping: 32,
    mass: 0.8,
  })
  const open = useSpring(useTransform(p, [0.7, 1], [0, R0]), {
    stiffness: 140,
    damping: 30,
  })
  const mask = useTransform(
    r,
    (v) =>
      `radial-gradient(circle at 50% 50%,transparent ${Math.max(v - 1, 0)}px,#BA8F2D ${Math.max(v, 0)}px)`,
  )
  const ring = useTransform(r, (v) => Math.max(v * 2, 0))
  const ringO = useTransform(r, [0, 10, R0 - 100], [0, 1, 0])
  const clip = useTransform(open, (v) => `circle(${Math.max(v, 0)}px at 50% 50%)`)
  const sc = useTransform(p, [0, 0.4, 0.55], [0.4, 1, 1.12])
  const dsh = useTransform(p, [0, 1], [0, -360])
  const nxtRot = useTransform(p, [0.7, 1], [-6, 0])
  const ctr = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    x: '-50%',
    y: '-50%',
    borderRadius: '50%',
  }

  return (
    <div className="iris" ref={ref}>
      <div className="irs">
        <motion.div
          style={{
            ...ctr,
            width: R1 * 2 + 90,
            height: R1 * 2 + 90,
            border: '1px dashed #8a7a55',
            rotate: dsh,
          }}
        />
        <motion.div style={{ scale: sc }}>
          <div className="big2">{big}</div>
          <div className="cap">{cap}</div>
        </motion.div>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: mask,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          style={{
            ...ctr,
            width: ring,
            height: ring,
            border: '3px solid #f6f1e6',
            opacity: ringO,
            zIndex: 5,
          }}
        />
        <motion.div className="nxt" style={{ clipPath: clip }}>
          <motion.span style={{ rotate: nxtRot }}>{next}</motion.span>
        </motion.div>
      </div>
    </div>
  )
}
