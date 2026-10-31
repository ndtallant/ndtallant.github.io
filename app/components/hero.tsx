'use client'

import { useEffect, useState } from 'react'
import { SocialLinks } from './social-links'

const roles = ['Civic Technologist', 'Software Engineer', 'Policy Analyst']

export function Hero() {
  const [text, setText] = useState(roles[0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let role = 0
    let length = roles[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      length += deleting ? -1 : 1
      setText(roles[role].slice(0, length))
      let delay = deleting ? 50 : 100
      if (length === 0) {
        deleting = false
        role = (role + 1) % roles.length
        delay = 250
      } else if (length === roles[role].length) {
        deleting = true
        delay = 2000
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" aria-labelledby="intro-heading">
      <div className="hero-content">
        <h1 id="intro-heading">Nick Tallant</h1>
        <p><span className="sr-only">{roles.join(', ')}</span><span aria-hidden="true" className="typed-role">{text}<span className="typing-cursor">|</span></span></p>
        <SocialLinks />
      </div>
    </section>
  )
}
