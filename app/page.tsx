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
      <section id="about" aria-labelledby="about-heading" className="home-section about">
        <div className="section-container">
          <div className="section-title"><h2 id="about-heading">About</h2></div>
          <div className="about-grid">
            <Image src="/profile.jpg" alt="Nick Tallant" width={600} height={600} className="profile-image" />
            <div className="about-content">
              <h3>Software Engineer &amp; Civic Technologist.</h3>
              <p>I’m a software engineer centered around building tools and systems for social good. I’ve been fortunate to work in education policy, international security, misinformation, and criminal justice reform. I am currently a Senior Software Engineer at <a href="https://www.recidiviz.org/">Recidiviz</a>—a company bettering the criminal justice system. Outside of work you can find me doing yoga, cooking, bouldering, and playing the drums.</p>
            </div>
          </div>
        </div>
      </section>
      <Resume />
      <section id="writing" aria-labelledby="writing-heading" className="home-section">
        <div className="section-container">
          <div className="section-title"><h2 id="writing-heading">Writing</h2></div>
          <BlogPosts />
          <div className="writing-links"><Link href="/blog">All posts →</Link><Link href="/blogroll">Explore the blogroll →</Link></div>
        </div>
      </section>
      <section id="contact" aria-labelledby="contact-heading" className="home-section contact">
        <div className="section-container">
          <div className="section-title"><h2 id="contact-heading">Contact</h2></div>
          <div className="contact-item"><span className="contact-icon"><Icon name="pin" /></span><div><h3>Location:</h3><p>Chicago, IL</p></div></div>
          <div className="contact-item"><span className="contact-icon"><Icon name="mail" /></span><div><h3>Email:</h3><p><a href="mailto:ndtallant@gmail.com">ndtallant AT gmail</a></p></div></div>
        </div>
      </section>
    </>
  )
}
