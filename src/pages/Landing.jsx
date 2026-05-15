import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import RandomWalkCanvas from '../components/RandomWalkCanvas'
import { topics } from '../data/topics'

function ctaTrack(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
  e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
}

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === '1') navigate('/content')
      if (e.key === '2') navigate('/questions')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const examDate = new Date('2026-05-28T09:30:00')
  const daysLeft = useMemo(() => {
    const now = new Date()
    return Math.max(0, Math.ceil((examDate - now) / (1000 * 60 * 60 * 24)))
  }, [])

  return (
    <div className="landing">
      <RandomWalkCanvas />
      <div className="bg-fade" />

      <header className="topbar">
        <div className="logo">
          <div className="logo-mark">P</div>
          <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>PTS2</b> · Probability Theory & Statistics 2</span>
        </div>
        <div className="top-meta">
          <span><span className="k">Term</span>Spring 2026</span>
          <span><span className="k">Exam</span>28 May</span>
          <span><span className="k">Topics</span>{topics.length}</span>
        </div>
      </header>

      <main className="hero">
        <div className="eyebrow-pill">
          {daysLeft > 0 ? `${daysLeft} days until exam` : 'Exam day'}
        </div>
        <h1 className="title">Probability & <em>Statistics</em></h1>
        <p className="subtitle">
          A no-clutter study workspace built around the lectures. Read the guide for
          definitions, theorems and worked examples — then drill the question bank,
          filtered exactly how you want it.
        </p>

        <div className="cta-row">
          <Link className="cta-card" to="/content" onMouseMove={ctaTrack}>
            <div className="cta-head">
              <span className="cta-eyebrow">01 · Read</span>
              <span className="cta-arrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>
            <h2 className="cta-title">Study Guide</h2>
            <p className="cta-desc">Every topic on one page. Definitions, theorems, worked examples — flowed inline with sample questions where they belong.</p>
            <div className="cta-meta">
              <span><b>12</b> topics</span>
              <span><b>4</b> parts</span>
              <span><b>4</b> chapters</span>
            </div>
          </Link>

          <Link className="cta-card" to="/questions" onMouseMove={ctaTrack}>
            <div className="cta-head">
              <span className="cta-eyebrow">02 · Practise</span>
              <span className="cta-arrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>
            <h2 className="cta-title">Question Bank</h2>
            <p className="cta-desc">Filterable by topic, difficulty, type and source. Full worked solutions with step-by-step explanations you can reveal.</p>
            <div className="cta-meta">
              <span><b>4</b> exam papers</span>
              <span><b>12</b> tutorials</span>
              <span><b>3</b> difficulties</span>
            </div>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <span>PTS2 · UvA 2025/2026</span>
        <div className="footer-keys">
          <span className="kbd"><b>1</b> Guide</span>
          <span className="kbd"><b>2</b> Bank</span>
        </div>
      </footer>
    </div>
  )
}
