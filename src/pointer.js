import { motionValue } from 'framer-motion'

export const mx = motionValue(-999)
export const my = motionValue(-999)

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  })
}

export const W = () => (typeof innerWidth === 'number' ? innerWidth : 1000)
export const H = () => (typeof innerHeight === 'number' ? innerHeight : 800)
