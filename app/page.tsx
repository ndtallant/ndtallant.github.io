import styles from './home.module.css'
import Image from 'next/image'
import { Resume } from 'app/components/resume'
import { Hero } from 'app/components/hero'

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
    </>
  )
}
