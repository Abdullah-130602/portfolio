import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { PRINCIPLES } from '../data'

function Tilt({ children, className }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 200, damping: 14 })
  const sry = useSpring(ry, { stiffness: 200, damping: 14 })
  const glare = useTransform(
    [gx, gy],
    ([a, b]) =>
      `radial-gradient(circle at ${a}% ${b}%,rgba(186,143,45,.32),transparent 55%)`,
  )
  const mv = (e) => {
    const b = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width
    const py = (e.clientY - b.top) / b.height
    rx.set((0.5 - py) * 24)
    ry.set((px - 0.5) * 24)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const lv = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      className={className}
      data-hover="1"
      onPointerMove={mv}
      onPointerLeave={lv}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        style={{
          transform: 'translateZ(60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {children}
      </div>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: glare,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

export default function Principles() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], ['2%', '-78%']), {
    stiffness: 120,
    damping: 28,
  })
  return (
    <div className="hs" ref={ref}>
      <div className="stick">
        <motion.div className="track" style={{ x }}>
          {PRINCIPLES.map(([n, t]) => (
            <Tilt key={n} className="panel">
              <b>{n}</b>
              <p>{t}</p>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
