import { notFound } from 'next/navigation'
import { thoughtsEnabled } from '../site-config'
import styles from './blog.module.css'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Thoughts',
  description: 'Thoughts on software and civic technology.',
}

export default function Page() {
  if (!thoughtsEnabled) notFound()

  return (
    <section>
      <h1 className={styles.heading}>Thoughts</h1>
      <BlogPosts />
    </section>
  )
}
