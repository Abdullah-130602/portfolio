import { useEffect, useRef } from 'react'
import { mx, my, W, H } from '../pointer'

export default function ParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const g = c.getContext('2d')
    let w
    let hh
    let id
    const rs = () => {
      w = c.width = W()
      hh = c.height = H()
    }
    rs()
    addEventListener('resize', rs)
    const P = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * hh,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))
    const burst = (e) =>
      P.forEach((p) => {
        const dx = p.x - e.clientX
        const dy = p.y - e.clientY
        const d = Math.hypot(dx, dy) || 1
        if (d < 350) {
          const f = (1 - d / 350) * 18
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
      })
    addEventListener('click', burst)
    const loop = () => {
      g.clearRect(0, 0, w, hh)
      g.fillStyle = '#BA8F2D'
      g.strokeStyle = '#BA8F2D'
      const mX = mx.get()
      const mY = my.get()
      for (const p of P) {
        const dx = mX - p.x
        const dy = mY - p.y
        const d = Math.hypot(dx, dy)
        if (d < 240 && d > 1) {
          p.vx += (dx / d) * 0.12
          p.vy += (dy / d) * 0.12
        }
        p.vx *= 0.975
        p.vy *= 0.975
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = hh
        if (p.y > hh) p.y = 0
        g.globalAlpha = 0.55
        g.beginPath()
        g.arc(p.x, p.y, 1.6, 0, 6.283)
        g.fill()
      }
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y)
          if (d < 110) {
            g.globalAlpha = (1 - d / 110) * 0.22
            g.beginPath()
            g.moveTo(P[i].x, P[i].y)
            g.lineTo(P[j].x, P[j].y)
            g.stroke()
          }
        }
      }
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(id)
      removeEventListener('resize', rs)
      removeEventListener('click', burst)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.28,
      }}
    />
  )
}
