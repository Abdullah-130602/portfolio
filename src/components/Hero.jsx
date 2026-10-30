import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { PERSON } from '../data'

function OrbitSystem({ ready, wild }) {
  const [expanded, setExpanded] = useState(true)
  const intro = useRef(false)
  const spin = useMotionValue(0)

  useEffect(() => {
    if (!ready) return
    if (wild) {
      setExpanded(true)
      return
    }
    const delay = intro.current ? 80 : 3800
    intro.current = true
    const t = setTimeout(() => setExpanded(false), delay)
    return () => clearTimeout(t)
  }, [ready, wild])

  useAnimationFrame((_, dt) => {
    spin.set(spin.get() + (dt / 1000) * (expanded ? 28 : 6))
  })

  const spring = { type: 'spring', stiffness: 48, damping: 14, mass: 1.1 }

  return (
    <motion.div
      className="orbit-lock"
      initial={false}
      animate={{
        scale: expanded ? 2.65 : 1,
        x: expanded ? '-6%' : '0%',
        y: expanded ? '4%' : '0%',
      }}
      transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="orbit-spin"
        style={{ rotate: spin }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="orbit-ring r1" />
        <div className="orbit-ring r2" />
        <div className="orbit-ring r3" />
        {expanded && (
          <>
            <span className="coord c1">N 1.2</span>
            <span className="coord c2">AED 50M</span>
            <span className="coord c3">DXB</span>
          </>
        )}
      </motion.div>

      <motion.div
        className="body gold"
        animate={
          expanded
            ? { x: 170, y: -30, scale: 1.12 }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={spring}
      />
      <motion.div
        className="body cream"
        animate={
          expanded
            ? { x: -210, y: 36, scale: 1.05 }
            : { x: 78, y: -70, scale: 1 }
        }
        transition={spring}
      />
      <motion.div
        className="body ring"
        animate={
          expanded
            ? { x: 28, y: 210, scale: 1.2 }
            : { x: 6, y: 98, scale: 1 }
        }
        transition={spring}
      />

      <motion.p
        className="orbit-caption"
        animate={{ opacity: expanded ? 0 : 1, x: expanded ? 24 : 0 }}
        transition={{ delay: expanded ? 0 : 0.45, duration: 0.6 }}
      >
        off-plan · secondary · dubai
      </motion.p>
    </motion.div>
  )
}

export default function Hero({ ready, wild, onGravitize }) {
  return (
    <section className="hero-g" id="top">
      <motion.img
        className="hero-portrait"
        src={PERSON.portrait}
        alt="Portrait placeholder — replace with yours"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="hero-vignette" />

      <button
        type="button"
        className="grav-btn"
        data-hover="1"
        onClick={onGravitize}
      >
        <span className="grav-dot" />
        {wild ? 'click to restore' : 'click to gravitize'}
      </button>

      <div className="honors" data-hover="1">
        <b>50M</b>
        <span>Sold</span>
      </div>

      <OrbitSystem ready={ready} wild={wild} />

      <motion.div
        className="hero-id"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: ready ? 1 : 0, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <strong>{PERSON.name.toLowerCase()} {PERSON.last.toLowerCase()}</strong>
        <span>{PERSON.title}</span>
      </motion.div>

      <div className="hero-rule" />

      <footer className="hero-bar">
        <span>© 2026 Abdullah — Dubai · registered developers</span>
        <span>{PERSON.languages.join(' · ')}</span>
        <span className="hero-social">
          <a href={PERSON.linkedin} target="_blank" rel="noreferrer" data-hover="1">
            in
          </a>
          <a href={PERSON.instagram} target="_blank" rel="noreferrer" data-hover="1">
            ig
          </a>
        </span>
      </footer>
    </section>
  )
}
