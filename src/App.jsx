import { useCallback, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import About from './components/About'
import CTA from './components/CTA'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import ImageRibbon from './components/ImageRibbon'
import Iris from './components/Iris'
import Loader from './components/Loader'
import Manifest from './components/Manifest'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Orbit from './components/Orbit'
import ParticleField from './components/ParticleField'
import Principles from './components/Principles'
import Works from './components/Works'
import { PERSON } from './data'

export default function App() {
  const [ready, setReady] = useState(false)
  const [wild, setWild] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <>
      <div className="grain" />
      <ParticleField />
      <Cursor />
      <Loader ready={ready} onDone={onDone} />
      <motion.div
        style={{
          scaleX: w,
          transformOrigin: '0 0',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: '#BA8F2D',
          zIndex: 60,
        }}
      />
      <Nav />
      <Hero ready={ready} wild={wild} onGravitize={() => setWild((v) => !v)} />
      <Marquee txt="Emaar ✦ DAMAC ✦ Binghatti" />
      <Marquee txt="Samana ✦ Imtiaz ✦ Off-plan ✦ Secondary" rev outline />
      <Iris big="50M+" cap="dirhams sold · year one" next="Dubai, properly." />
      <Manifest />
      <ImageRibbon />
      <Works />
      <Orbit />
      <Principles />
      <Iris big="Five" cap="developers · deep coverage" next="Let’s place you." />
      <About />
      <CTA />
      <footer className="site">
        <span>© 2026 {PERSON.name} — placeholder portrait</span>
        <a href="#top" data-hover="1">
          Back to top
        </a>
      </footer>
    </>
  )
}
