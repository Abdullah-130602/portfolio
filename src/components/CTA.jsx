import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { PERSON } from '../data'

export default function CTA() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 12 })
  const sy = useSpring(y, { stiffness: 150, damping: 12 })
  const mv = (e) => {
    const b = ref.current.getBoundingClientRect()
    x.set((e.clientX - b.left - b.width / 2) * 0.35)
    y.set((e.clientY - b.top - b.height / 2) * 0.35)
  }
  const letters = "Let's talk.".split('')

  return (
    <section className="cta" id="contact">
      <div className="label">A unit, a desk, a call</div>
      <motion.div
        ref={ref}
        onPointerMove={mv}
        onPointerLeave={() => {
          x.set(0)
          y.set(0)
        }}
        style={{ x: sx, y: sy, padding: '6vh 4vw' }}
      >
        <a href={PERSON.wa} data-hover="1">
          {letters.map((c, i) => (
            <motion.span
              key={i}
              style={{ color: i > 5 ? '#BA8F2D' : undefined }}
              initial={{ y: '120%', opacity: 0, rotate: 20 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 11,
                delay: i * 0.04,
              }}
              whileHover={{ y: -30, rotate: -8, scale: 1.2 }}
            >
              {c === ' ' ? '\u00A0' : c}
            </motion.span>
          ))}
        </a>
      </motion.div>
      <p className="sub" style={{ textAlign: 'center', marginTop: 0 }}>
        <a href={PERSON.phoneHref} data-hover="1">
          {PERSON.phone}
        </a>
        {' · '}
        <a href={`mailto:${PERSON.email}`} data-hover="1">
          {PERSON.email}
        </a>
      </p>
    </section>
  )
}
