import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RIBBON } from '../data'

export default function ImageRibbon() {
  const base = useMotionValue(0)
  const dir = useRef(1)
  useAnimationFrame((_, dt) => {
    let n = base.get() - dir.current * (dt / 1000) * 18
    if (n < -50) n += 50
    base.set(n)
  })
  const x = useTransform(base, (v) => `${v}%`)

  return (
    <div style={{ overflow: 'hidden', padding: '6vh 0', borderBlock: '1px solid #2a2418' }}>
      <motion.div className="ribbon" style={{ x, width: '200%' }}>
        {[...RIBBON, ...RIBBON].map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            data-hover="1"
            whileHover={{ scale: 1.06, filter: 'grayscale(0) contrast(1.1)' }}
          />
        ))}
      </motion.div>
    </div>
  )
}
