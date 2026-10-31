import styles from '../home.module.css'
import { education, experience, type ResumeEntry } from 'app/data/resume'

export function ResumeItem({ entry }: { entry: ResumeEntry }) {
  return (
    <article className={styles['resume-item']}>
      <h4>{entry.title}</h4>
      <p className={styles['resume-period']}>{entry.period}</p>
      <p><em>{entry.organization}</em></p>
      {entry.description && <p>{entry.description}</p>}
      {entry.highlights.length > 0 && (
        <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      )}
    </article>
  )
}

export function ResumeGroup({ title, entries }: { title: string; entries: ResumeEntry[] }) {
  return (
    <div>
      <h3 className={styles['resume-title']}>{title}</h3>
      {entries.map((entry) => <ResumeItem key={`${entry.organization}-${entry.title}`} entry={entry} />)}
    </div>
  )
}

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className={styles['home-section']}>
      <div className={styles['section-container']}>
        <div className={styles['section-title']}><h2 id="resume-heading">Resume</h2></div>
        <div className={styles['resume-grid']}>
          <ResumeGroup title="Professional Experience" entries={experience} />
          <ResumeGroup title="Education" entries={education} />
        </div>
      </div>
    </section>
  )
}
