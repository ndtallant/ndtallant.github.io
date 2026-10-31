export type BlogrollEntry = {
  name: string
  url: string
  description: string
}

// Starting points, not a claim about personal reading habits. Replace with your favorites.
export const blogroll: BlogrollEntry[] = [
  {
    name: 'Recidiviz',
    url: 'https://www.recidiviz.org/blog',
    description: 'Technology, data, and criminal justice reform.',
  },
  {
    name: 'Code for America',
    url: 'https://codeforamerica.org/news/',
    description: 'Civic technology and people-centered government services.',
  },
  {
    name: 'Next.js',
    url: 'https://nextjs.org/blog',
    description: 'Updates from the framework powering this site.',
  },
]
