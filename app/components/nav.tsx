'use client'

import styles from '../home.module.css'
import blogStyles from '../blog/blog.module.css'
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
    <nav aria-label="Main navigation" className={blogStyles.navigation}>
      <Link href="/">home</Link><Link href="/#resume">résumé</Link><Link href="/blog">blog</Link><Link href="/#contact">contact</Link>
    </nav>
  )

  return (
    <>
      <button ref={toggle} type="button" className={styles['mobile-nav-toggle']} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="section-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      <header className={`${styles['side-header']} ${open ? styles['is-open'] : ''}`}>
        <nav id="section-navigation" aria-label="Main navigation" className={styles['nav-menu']}>
          <ul>
            {sections.map(({ id, label, icon }) => (
              <li key={id}><a href={`#${id}`} className={active === id ? styles.active : undefined} aria-label={label} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}><Icon name={icon} /><span>{label}</span></a></li>
            ))}
            <li><Link href="/blog" aria-label="Blog" onClick={() => setOpen(false)}><Icon name="book" /><span>Blog</span></Link></li>
          </ul>
        </nav>
      </header>
      <a href="#hero" aria-label="Back to top" className={`${styles['back-to-top']} ${scrolled ? styles.active : ''}`}><Icon name="up" /></a>
    </>
  )
}
