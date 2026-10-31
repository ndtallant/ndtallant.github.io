import { thoughtsEnabled } from '../site-config'
import styles from '../home.module.css'
import { SocialLinks } from './social-links'

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <h3>Nick Tallant</h3>
      <p>Technology can be impactful, kind, helpful, and fun—if we make it so.</p>
      <SocialLinks />
      <div>© {new Date().getFullYear()} <strong>Nick Tallant</strong>. All Rights Reserved</div>
      <div className={styles['footer-links']}>{thoughtsEnabled && <><a href="/rss">RSS</a> · </>}<a href="https://github.com/ndtallant/ndtallant.github.io">View source</a></div>
      <div className={styles.credits}>Design adapted from <a href="https://bootstrapmade.com/free-html-bootstrap-template-my-resume/">MyResume by BootstrapMade</a></div>
    </footer>
  )
}
