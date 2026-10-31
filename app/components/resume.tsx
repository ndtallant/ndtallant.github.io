import { education, experience, type ResumeEntry } from 'app/data/resume'

export function ResumeItem({ entry }: { entry: ResumeEntry }) {
  return (
    <article className="resume-item">
      <h4>{entry.title}</h4>
      <p className="resume-period">{entry.period}</p>
      <p className="resume-organization"><em>{entry.organization}</em></p>
      {entry.description && <p>{entry.description}</p>}
      {entry.highlights.length > 0 && (
        <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      )}
    </article>
  )
}

export function ResumeGroup({ title, entries }: { title: string; entries: ResumeEntry[] }) {
  return (
    <div className="resume-group">
      <h3 className="resume-title">{title}</h3>
      {entries.map((entry) => <ResumeItem key={`${entry.organization}-${entry.title}`} entry={entry} />)}
    </div>
  )
}

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="home-section resume">
      <div className="section-container">
        <div className="section-title"><h2 id="resume-heading">Resume</h2></div>
        <div className="resume-grid">
          <ResumeGroup title="Professional Experience" entries={experience} />
          <ResumeGroup title="Education" entries={education} />
        </div>
      </div>
    </section>
  )
}
