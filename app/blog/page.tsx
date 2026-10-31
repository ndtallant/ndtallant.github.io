import styles from './blog.module.css'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className={styles.heading}>My Blog</h1>
      <BlogPosts />
    </section>
  )
}
