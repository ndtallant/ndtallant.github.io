import styles from './blog/blog.module.css'

export default function NotFound() {
  return (
    <section>
      <h1 className={styles.heading}>
        404 - Page Not Found
      </h1>
      <p className={styles.notFoundMessage}>The page you are looking for does not exist.</p>
    </section>
  )
}
