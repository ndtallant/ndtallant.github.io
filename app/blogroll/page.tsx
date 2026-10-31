import { blogroll } from 'app/data/blogroll'

export const metadata = {
  title: 'Blogroll',
  description: 'Starting points for reading about civic technology, software, and social impact.',
}

export default function BlogrollPage() {
  return (
    <section aria-labelledby="blogroll-heading">
      <h1 id="blogroll-heading" className="mb-4 text-2xl font-semibold tracking-tight">Blogroll</h1>
      <p className="mb-8 leading-relaxed text-neutral-600 dark:text-neutral-400">A few starting points for reading about civic technology, software, and social impact.</p>
      <ul className="space-y-8">
        {blogroll.map((blog) => (
          <li key={blog.url}>
            <a href={blog.url} className="text-link font-medium">{blog.name} ↗</a>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{blog.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
