'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from './nav'
import Footer from './footer'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const home = usePathname() === '/'

  useEffect(() => {
    if (!home || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    const sections = document.querySelectorAll('.home-section > .section-container')
    sections.forEach((section) => {
      // Do not hide sections already visible, including direct hash-link targets.
      if (section.getBoundingClientRect().top > window.innerHeight) section.classList.add('reveal-pending')
      observer.observe(section)
    })
    return () => {
      observer.disconnect()
      sections.forEach((section) => section.classList.remove('reveal-pending'))
    }
  }, [home])

  return (
    <div className={home ? 'home-shell' : 'blog-shell'}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
