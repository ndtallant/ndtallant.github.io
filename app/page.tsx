import styles from './home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Resume } from 'app/components/resume'
import { BlogPosts } from 'app/components/posts'
import { Hero } from 'app/components/hero'
import { Icon } from 'app/components/icons'

export default function Page() {
  return (
    <>
      <Hero />
      <section id="about" aria-labelledby="about-heading" className={styles['home-section']}>
        <div className={styles['section-container']}>
          <div className={styles['section-title']}><h2 id="about-heading">About</h2></div>
          <div className={styles['about-grid']}>
            <Image src="/profile.jpg" alt="Nick Tallant" width={600} height={600} className={styles['profile-image']} />
            <div className={styles['about-content']}>
              <h3>Software Engineer &amp; Civic Technologist.</h3>
              <p>I’m a software engineer centered around building tools and systems for social good. I’ve been fortunate to work in education policy, international security, misinformation, and criminal justice reform. I am currently a Senior Software Engineer at <a href="https://www.recidiviz.org/">Recidiviz</a>—a company bettering the criminal justice system. Outside of work you can find me doing yoga, cooking, bouldering, and playing the drums.</p>
            </div>
          </div>
        </div>
      </section>
      <Resume />
      <section id="writing" aria-labelledby="writing-heading" className={styles['home-section']}>
        <div className={styles['section-container']}>
          <div className={styles['section-title']}><h2 id="writing-heading">Writing</h2></div>
          <BlogPosts />
          <Link href="/blog">All posts →</Link>
        </div>
      </section>
      <section id="contact" aria-labelledby="contact-heading" className={styles['home-section']}>
        <div className={styles['section-container']}>
          <div className={styles['section-title']}><h2 id="contact-heading">Contact</h2></div>
          <div className={styles['contact-item']}><span className={styles['contact-icon']}><Icon name="pin" /></span><div><h3>Location:</h3><p>Chicago, IL</p></div></div>
          <div className={styles['contact-item']}><span className={styles['contact-icon']}><Icon name="mail" /></span><div><h3>Email:</h3><p><a href="mailto:ndtallant@gmail.com">ndtallant AT gmail</a></p></div></div>
        </div>
      </section>
    </>
  )
}
