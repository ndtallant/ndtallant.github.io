import styles from './posts.module.css'
import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  if (allBlogs.length === 0) {
    return <p className={styles.empty}>No posts yet. Check back soon.</p>
  }

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className={styles.post}
            href={`/blog/${post.slug}`}
          >
            <div className={styles.row}>
              <p className={styles.date}>
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className={styles.title}>
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
