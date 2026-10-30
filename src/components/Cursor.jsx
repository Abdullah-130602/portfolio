import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { mx, my } from '../pointer'

export default function Cursor() {
  const x = useSpring(mx, { stiffness: 600, damping: 40, mass: 0.4 })
  const y = useSpring(my, { stiffness: 600, damping: 40, mass: 0.4 })
  const rx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 })
  const ry = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 })
  const [big, setBig] = useState(false)

  useEffect(() => {
    const f = (e) =>
      setBig(!!(e.target.closest && e.target.closest('[data-hover],button,a')))
    addEventListener('pointerover', f)
    return () => removeEventListener('pointerover', f)
  }, [])

  return (
    <>
      <motion.div
        className="cur-ring"
        style={{
          x: rx,
          y: ry,
          position: 'fixed',
          left: 0,
          top: 0,
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          borderRadius: '50%',
          border: '1px solid #BA8F2D',
          zIndex: 300,
          pointerEvents: 'none',
        }}
        animate={{ scale: big ? 1.85 : 1, opacity: big ? 0.9 : 0.55 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
      <motion.div
        className="cur"
        style={{
          x,
          y,
          position: 'fixed',
          left: 0,
          top: 0,
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: '50%',
          background: '#BA8F2D',
          zIndex: 301,
          pointerEvents: 'none',
          boxShadow: '0 0 18px #BA8F2D',
        }}
        animate={{ scale: big ? 0.35 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
