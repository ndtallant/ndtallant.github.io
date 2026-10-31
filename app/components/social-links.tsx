const socials = [
  { name: 'GitHub', href: 'https://github.com/ndtallant/', icon: <path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.2c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.7 11.7 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ndtallant/', icon: <><path d="M3 8h4v13H3zM9 8h4v2c1-3 8-4 8 3v8h-4v-7c0-4-4-3-4 0v7H9z" /><circle cx="5" cy="4" r="2" /></> },
  { name: 'Instagram', href: 'https://www.instagram.com/tallantn/', icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" /></> },
]

export function SocialLinks() {
  return <div className="social-links">{socials.map(({ name, href, icon }) => <a key={name} href={href} aria-label={name}><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">{icon}</svg></a>)}</div>
}
