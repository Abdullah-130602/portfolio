import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

export default function Loader({ ready, onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 280),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      animate={{ y: ready ? '-100%' : 0 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '5vw',
        color: '#BA8F2D',
        pointerEvents: ready ? 'none' : 'auto',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 3,
          background: '#BA8F2D',
        }}
        animate={{ width: `${n}%` }}
      />
      <div
        style={{
          fontSize: 13,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '2vh',
          color: '#b7ae9e',
        }}
      >
        abdullah — dubai
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(80px,22vw,320px)',
          fontWeight: 500,
          letterSpacing: '-0.06em',
          lineHeight: 0.8,
        }}
      >
        {n}
      </div>
    </motion.div>
  )
}
