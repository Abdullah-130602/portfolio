import { motion } from 'framer-motion'
import { PERSON } from '../data'

export default function About() {
  return (
    <section className="about" id="about">
      <motion.div
        className="about-photo"
        initial={{ clipPath: 'inset(20% 20% 20% 20% round 24px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        data-hover="1"
      >
        <motion.img
          src={PERSON.portrait}
          alt="Portrait placeholder — replace with yours"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
      <div>
        <div className="label">About</div>
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          One year in.
          <br />
          50 million out.
        </motion.h2>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          I work with all registered developers in Dubai, with a desk focused on
          Emaar, DAMAC, Binghatti, Samana, and Imtiaz. Off-plan and secondary.
          Listings, events, and overseas clients from Oman, Saudi, India,
          Singapore, and London. I speak English, Hindi, Urdu, and Arabic.
        </motion.p>
      </div>
    </section>
  )
}
