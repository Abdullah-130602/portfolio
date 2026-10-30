import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

export default function Marquee({ txt, rev, outline }) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const sv = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const dir = useRef(1)
  const skew = useTransform(sv, [-2000, 2000], [-14, 14])

  useAnimationFrame((t, dt) => {
    const v = sv.get()
    if (v < -5) dir.current = -1
    else if (v > 5) dir.current = 1
    let n =
      base.get() -
      dir.current * (rev ? -1 : 1) * (dt / 1000) * 4 * (1 + Math.abs(v) / 120)
    if (n < -50) n += 50
    if (n > 0) n -= 50
    base.set(n)
  })

  const x = useTransform(base, (v) => `${v}%`)

  return (
    <div className={`marq${outline ? ' o' : ''}`}>
      <motion.div style={{ x, skewX: skew }}>
        {(txt + ' ✦ ').repeat(8)}
      </motion.div>
    </div>
  )
}
