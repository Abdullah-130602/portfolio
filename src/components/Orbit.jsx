import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { TAGS } from '../data'
import { W } from '../pointer'

function Chip({ t, i, angle, R }) {
  const a0 = (i * 6.2832) / TAGS.length
  const x = useTransform(angle, (a) => Math.cos(a + a0) * R)
  const y = useTransform(angle, (a) => Math.sin(a + a0) * R * 0.4)
  const scale = useTransform(angle, (a) => 0.6 + (0.4 * (Math.sin(a + a0) + 1)) / 2)
  const z = useTransform(angle, (a) => Math.round((Math.sin(a + a0) + 1) * 50))
  return (
    <motion.div
      style={{ x, y, scale, zIndex: z, position: 'absolute', left: '50%', top: '50%' }}
    >
      <div style={{ transform: 'translate(-50%,-50%)' }} className="chip" data-hover="1">
        {t}
      </div>
    </motion.div>
  )
}

export default function Orbit() {
  const angle = useMotionValue(0)
  const drag = useRef(false)
  const R = Math.min(300, W() / 2 - 70)

  useEffect(() => {
    let id
    const l = () => {
      if (!drag.current) angle.set(angle.get() + 0.005)
      id = requestAnimationFrame(l)
    }
    l()
    return () => cancelAnimationFrame(id)
  }, [angle])

  return (
    <motion.div
      className="orbit"
      onPanStart={() => {
        drag.current = true
      }}
      onPan={(e, i) => angle.set(angle.get() + i.delta.x * 0.014)}
      onPanEnd={() => {
        drag.current = false
      }}
    >
      <div className="core">dubai · registered</div>
      {TAGS.map((t, i) => (
        <Chip key={t} t={t} i={i} angle={angle} R={R} />
      ))}
      <div className="hint">drag to orbit</div>
    </motion.div>
  )
}
