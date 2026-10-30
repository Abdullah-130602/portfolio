import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { WORKS } from '../data'

function WorkRow({ item, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 20%'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.06])
  const clip = useTransform(
    scrollYProgress,
    [0, 0.28],
    ['inset(18% 12% 18% 12% round 22px)', 'inset(0% 0% 0% 0% round 22px)'],
  )

  return (
    <article className={`work-row${i % 2 ? ' alt' : ''}`} ref={ref}>
      <motion.div
        className="work-meta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="n">{item.n} — {item.year}</div>
        <h3>{item.title}</h3>
        <p>{item.cat}</p>
      </motion.div>
      <motion.div className="work-frame" style={{ clipPath: clip }} data-hover="1">
        <motion.img src={item.img} alt={item.title} style={{ y, scale }} />
      </motion.div>
    </article>
  )
}

export default function Works() {
  return (
    <section id="work" style={{ paddingTop: '8vh' }}>
      <div className="label">Five developers</div>
      {WORKS.map((item, i) => (
        <WorkRow key={item.n} item={item} i={i} />
      ))}
    </section>
  )
}
