'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './icons'

const sections: { id: string; label: string; icon: IconName }[] = [
  { id: 'hero', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'resume', label: 'Resume', icon: 'resume' },
  { id: 'writing', label: 'Writing', icon: 'book' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

export function Navbar() {
  const pathname = usePathname()
  const home = pathname === '/'
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 100)
      if (!home) return
      const position = window.scrollY + 200
      let current = 'hero'
      for (const { id } of sections) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top + window.scrollY <= position) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [home])

  useEffect(() => {
    if (!open) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  if (!home) return (
    <nav aria-label="Main navigation" className="mb-12 flex flex-wrap gap-5 text-sm">
      <Link href="/">home</Link><Link href="/#resume">résumé</Link><Link href="/blog">blog</Link><Link href="/blogroll">blogroll</Link><Link href="/#contact">contact</Link>
    </nav>
  )

  return (
    <>
      <button ref={toggle} type="button" className="mobile-nav-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="section-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      <header className={`side-header${open ? ' is-open' : ''}`}>
        <nav id="section-navigation" aria-label="Main navigation" className="nav-menu">
          <ul>
            {sections.map(({ id, label, icon }) => (
              <li key={id}><a href={`#${id}`} className={active === id ? 'active' : ''} aria-label={label} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}><Icon name={icon} /><span>{label}</span></a></li>
            ))}
            <li><Link href="/blog" aria-label="Blog" onClick={() => setOpen(false)}><Icon name="book" /><span>Blog</span></Link></li>
            <li><Link href="/blogroll" aria-label="Blogroll" onClick={() => setOpen(false)}><Icon name="links" /><span>Blogroll</span></Link></li>
          </ul>
        </nav>
      </header>
      <a href="#hero" aria-label="Back to top" className={`back-to-top${scrolled ? ' active' : ''}`}><Icon name="up" /></a>
    </>
  )
}
