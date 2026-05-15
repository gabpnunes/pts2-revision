import { Link } from 'react-router-dom'
import { topics, parts } from '../data/topics'

export default function SidebarNav({ activeId }) {
  const grouped = parts.map(p => ({
    ...p,
    topics: topics.filter(t => t.part === p.num),
  }))

  return (
    <aside className="sg-sidebar">
      <Link to="/" className="back-home">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        Back to Home
      </Link>

      <nav className="toc">
        {grouped.map(part => (
          <div key={part.num} className="toc-group">
            <div className="toc-part">Part {part.num} — {part.source}</div>
            <ul>
              {part.topics.map(t => (
                <li key={t.id}>
                  <button
                    className={`toc-item${activeId === t.id ? ' active' : ''}`}
                    onClick={() => {
                      const el = document.getElementById(`topic-${t.id}`)
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    <span className="toc-num">{t.num}.</span>
                    <span className="toc-title">{t.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <Link to="/questions" className="bank-link">
          Question Bank
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>
    </aside>
  )
}
