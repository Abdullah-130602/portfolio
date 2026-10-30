import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MANIFEST } from '../data'

function Word({ w, i, n, p }) {
  const s = i / n
  const o = useTransform(p, [s, s + 1.5 / n], [0.12, 1])
  const y = useTransform(p, [s, s + 1.5 / n], [14, 0])
  return (
    <motion.span style={{ opacity: o, y }}>{w}</motion.span>
  )
}

export default function Manifest() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'],
  })
  return (
    <section ref={ref}>
      <div className="label">The desk</div>
      <p className="manifest">
        {MANIFEST.map((w, i) => (
          <Word key={i} w={w} i={i} n={MANIFEST.length} p={scrollYProgress} />
        ))}
      </p>
    </section>
  )
}
