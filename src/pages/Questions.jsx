import { useState, useMemo, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { topics } from '../data/topics'
import { questions } from '../data/questions'
import MathBlock from '../components/MathBlock'

function MathText({ text }) {
  if (!text) return null
  const parts = text.split(/(\$[^$]+\$)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <MathBlock key={i} math={part.slice(1, -1)} />
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard']
const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'To do' },
  { id: 'revisit', label: 'Revisit' },
  { id: 'complete', label: 'Done' },
]
const SOURCE_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'final', label: 'Past Finals' },
  { id: 'resit', label: 'Resits' },
  { id: 'tutorial', label: 'Tutorials' },
]
const STORAGE_KEY = 'qb-status'

function loadStatus() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveStatus(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
  )
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
  )
}

export default function Questions() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const [sourceType, setSourceType] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTopics, setSelectedTopics] = useState(() => new Set(topics.map(t => t.id)))
  const [statuses, setStatuses] = useState(loadStatus)
  const [openId, setOpenId] = useState(null)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => { saveStatus(statuses) }, [statuses])

  const toggleTopic = useCallback((id) => {
    setSelectedTopics(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectAllTopics = useCallback(() => {
    setSelectedTopics(new Set(topics.map(t => t.id)))
  }, [])

  const clearAllTopics = useCallback(() => {
    setSelectedTopics(new Set())
  }, [])

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (!selectedTopics.has(q.topic)) return false
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false
      if (sourceType !== 'all' && q.sourceType !== sourceType) return false
      if (statusFilter !== 'all') {
        const s = statuses[q.id]
        if (statusFilter === 'todo' && s) return false
        if (statusFilter === 'revisit' && s !== 'revisit') return false
        if (statusFilter === 'complete' && s !== 'complete') return false
      }
      if (search) {
        const s = search.toLowerCase()
        return q.prompt.toLowerCase().includes(s) || q.source.toLowerCase().includes(s)
      }
      return true
    })
  }, [search, difficulty, sourceType, statusFilter, selectedTopics, statuses])

  const openQ = useMemo(() => {
    if (!openId) return null
    return questions.find(q => q.id === openId) || null
  }, [openId])

  const openIdx = useMemo(() => {
    if (!openId) return -1
    return filtered.findIndex(q => q.id === openId)
  }, [openId, filtered])

  const topicCounts = useMemo(() => {
    const m = {}
    for (const q of questions) {
      m[q.topic] = (m[q.topic] || 0) + 1
    }
    return m
  }, [])

  const stats = useMemo(() => {
    const total = filtered.length
    const done = filtered.filter(q => statuses[q.id] === 'complete').length
    const revisit = filtered.filter(q => statuses[q.id] === 'revisit').length
    return { total, done, revisit }
  }, [filtered, statuses])

  function markStatus(id, status) {
    setStatuses(prev => {
      const next = { ...prev }
      if (next[id] === status) delete next[id]
      else next[id] = status
      return next
    })
  }

  function openDetail(id) {
    setOpenId(id)
    setShowSolution(false)
  }

  function closeDetail() {
    setOpenId(null)
    setShowSolution(false)
  }

  function goPrev() {
    if (openIdx > 0) openDetail(filtered[openIdx - 1].id)
  }

  function goNext() {
    if (openIdx < filtered.length - 1) openDetail(filtered[openIdx + 1].id)
  }

  useEffect(() => {
    function onKey(e) {
      if (!openId) return
      if (e.key === 'Escape') closeDetail()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function topicLabel(id) {
    const t = topics.find(x => x.id === id)
    return t ? t.title : id
  }

  function statusClass(id) {
    const s = statuses[id]
    if (s === 'complete') return 'qb-st-complete'
    if (s === 'revisit') return 'qb-st-revisit'
    return 'qb-st-todo'
  }

  function statusChar(id) {
    const s = statuses[id]
    if (s === 'complete') return '✓'
    if (s === 'revisit') return '!'
    return ''
  }

  return (
    <div className="qb-root">
      {/* ── SIDEBAR ── */}
      <aside className="qb-sidebar">
        <Link to="/" className="back-home">
          <ChevronLeft />
          Back to Home
        </Link>

        <div className="qb-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="qb-filters">
          <div className="qb-fg">
            <div className="qb-fg-head">
              Difficulty
              <span className="qb-fg-count">{stats.total}</span>
            </div>
            <div className="qb-chips">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  className={`qb-chip${difficulty === d ? ' active' : ''}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="qb-fg">
            <div className="qb-fg-head">Source</div>
            <div className="qb-chips">
              {SOURCE_TYPES.map(s => (
                <button
                  key={s.id}
                  className={`qb-chip${sourceType === s.id ? ' active' : ''}`}
                  onClick={() => setSourceType(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="qb-fg">
            <div className="qb-fg-head">Status</div>
            <div className="qb-chips">
              {STATUS_FILTERS.map(s => (
                <button
                  key={s.id}
                  className={`qb-chip${statusFilter === s.id ? ' active' : ''}`}
                  onClick={() => setStatusFilter(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="qb-fg">
            <div className="qb-fg-head">
              Topics
              <span style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                <button className="link-btn" style={{ fontSize: 11 }} onClick={selectAllTopics}>All</button>
                <button className="link-btn" style={{ fontSize: 11 }} onClick={clearAllTopics}>None</button>
              </span>
            </div>
            <div className="qb-topics">
              {topics.map(t => (
                <label key={t.id}>
                  <input
                    type="checkbox"
                    checked={selectedTopics.has(t.id)}
                    onChange={() => toggleTopic(t.id)}
                  />
                  <span className="qb-t-n">{t.num}.</span>
                  <span className="qb-t-l">{t.title}</span>
                  <span className="qb-ct">{topicCounts[t.id] || 0}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-foot">
          <Link to="/content" className="bank-link">
            Study Guide
            <ArrowRight />
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="qb-main">
        <div className="qb-header">
          <div>
            <div className="qb-eyebrow">02 · Practise</div>
            <h1 className="qb-title">Question Bank</h1>
            <p className="qb-sub">
              {stats.total} question{stats.total !== 1 ? 's' : ''} · Click any question to view the full solution
            </p>
          </div>
          <div className="qb-stats">
            <div className="qb-stat">
              <span>{stats.done}</span>
              <label>Done</label>
            </div>
            <div className="qb-stat">
              <span>{stats.revisit}</span>
              <label>Revisit</label>
            </div>
            <div className="qb-stat">
              <span>{stats.total - stats.done - stats.revisit}</span>
              <label>To do</label>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="qb-empty">
            <p>No questions match your filters.</p>
            <button className="btn btn-ghost" onClick={() => { setSearch(''); setDifficulty('all'); setSourceType('all'); setStatusFilter('all'); selectAllTopics() }}>
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="qb-list">
            {filtered.map((q, i) => (
              <li
                key={q.id}
                className={`qb-item${openId === q.id ? ' open' : ''}`}
                onClick={() => openDetail(q.id)}
              >
                <div className={`qb-status ${statusClass(q.id)}`}>
                  {statusChar(q.id)}
                </div>
                <div className="qb-item-main">
                  <div className="qb-item-prompt"><MathText text={q.prompt} /></div>
                  <div className="qb-item-meta">
                    <span className="qb-meta-t">T{topics.find(t => t.id === q.topic)?.num}</span>
                    <span className="qb-meta-sep">·</span>
                    <span className="qb-meta-src">{q.source}</span>
                  </div>
                </div>
                <span className={`pill pill-${q.difficulty}`}>{q.difficulty}</span>
                <span className="qb-arrow"><ArrowRight /></span>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* ── DETAIL PANEL ── */}
      {openQ && (
        <>
          <div className="qb-detail-scrim" onClick={closeDetail} />
          <div className="qb-detail">
            <div className="qb-detail-top">
              <div className="qb-detail-nav">
                <button className="icon-btn" onClick={goPrev} disabled={openIdx <= 0}>
                  <ChevronLeft />
                </button>
                <span className="qb-pos">{openIdx + 1} / {filtered.length}</span>
                <button className="icon-btn" onClick={goNext} disabled={openIdx >= filtered.length - 1}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </div>
              <button className="qb-close" onClick={closeDetail}><XIcon /></button>
            </div>

            <div className="qb-detail-body">
              <div className="qb-d-meta">
                <span className={`pill pill-${openQ.difficulty}`}>{openQ.difficulty}</span>
                <span className="tag">{openQ.source}</span>
                <span className="tag">Topic {topics.find(t => t.id === openQ.topic)?.num}</span>
                {openQ.sourceType && <span className="tag" style={{ textTransform: 'capitalize' }}>{openQ.sourceType}</span>}
              </div>

              <div className="qb-q-section">
                <div className="qb-section-label">Question</div>
                <h2 className="qb-d-prompt"><MathText text={openQ.prompt} /></h2>
              </div>

              {!showSolution ? (
                <button className="qb-reveal-solution" onClick={() => setShowSolution(true)}>
                  <EyeIcon />
                  Reveal solution
                </button>
              ) : (
                <>
                  {openQ.answer && (
                    <div className="qb-answer-box">
                      <span className="qb-ans-l">Answer</span>
                      <span className="qb-ans-v"><MathText text={openQ.answer} /></span>
                    </div>
                  )}
                  <div className="qb-q-section">
                    <div className="qb-section-label">
                      Solution
                      <button className="qb-hide-solution" onClick={() => setShowSolution(false)}>Hide</button>
                    </div>
                    <ol className="qb-sol-steps">
                      {openQ.solution.map((step, i) => (
                        <li key={i}>
                          <span className="qb-sol-n">{i + 1}</span>
                          <span><MathText text={step} /></span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}

              <div className="qb-mark-row">
                <div className="qb-mark-label">How did it go?</div>
                <div className="qb-mark-btns">
                  <button
                    className={`qb-mark qb-mark-revisit${statuses[openQ.id] === 'revisit' ? ' active' : ''}`}
                    onClick={() => markStatus(openQ.id, 'revisit')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" /></svg>
                    Revisit
                  </button>
                  <button
                    className={`qb-mark qb-mark-done${statuses[openQ.id] === 'complete' ? ' active' : ''}`}
                    onClick={() => markStatus(openQ.id, 'complete')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    Got it
                  </button>
                </div>
              </div>

              <Link to="/content" className="qb-goto-guide" onClick={closeDetail}>
                Review this topic in the Study Guide
                <ArrowRight />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
