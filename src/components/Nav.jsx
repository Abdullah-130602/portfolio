import { useState } from 'react'

function Scramble({ t }) {
  const [s, setS] = useState(t)
  const run = () => {
    let i = 0
    const id = setInterval(() => {
      setS(
        t
          .split('')
          .map((c, k) =>
            k < i ? c : 'ABCDEFGHJKLMNPRSTUVWXYZ#%&'[Math.random() * 26 | 0],
          )
          .join(''),
      )
      i += 0.5
      if (i > t.length + 1) {
        clearInterval(id)
        setS(t)
      }
    }, 28)
  }
  return (
    <span onPointerEnter={run} data-hover="1">
      {s}







      .
    </span>
  )
}

export default function Nav() {
  return (
    <nav className="top">
      <a href="#top" className="wordmark">
        <Scramble t="abdullah" />
      </a>
      <div className="nav-links">
        <a href="#work">
          <Scramble t="developers" />
        </a>
        <a href="#about">
          <Scramble t="about" />
        </a>
        <a href="#contact">
          <Scramble t="contact" />
        </a>
      </div>
    </nav>
  )
}
