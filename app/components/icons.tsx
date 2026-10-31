export type IconName = 'home' | 'user' | 'resume' | 'mail' | 'book' | 'menu' | 'close' | 'up' | 'pin'

const paths: Record<IconName, React.ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v10H3Z" /><path d="M9 20v-8h6v8" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-3a8 8 0 0 1 16 0v3" /></>,
  resume: <><path d="M14 2H5v20h14V7Z" /><path d="M14 2v5h5M8 12h8M8 16h8" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  book: <><path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  up: <path d="m6 14 6-6 6 6" />,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
}

export function Icon({ name }: { name: IconName }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
