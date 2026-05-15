import { useState } from 'react'

export default function WorkedQuestion({ source, difficulty, children, solution }) {
  const [showSolution, setShowSolution] = useState(false)
  return (
    <div className="worked-q">
      <div className="worked-q-head">
        <span className="worked-q-eyebrow">Practice Question</span>
        <div className="worked-q-tags">
          {difficulty && <span className={`pill pill-${difficulty}`}>{difficulty}</span>}
          {source && <span className="tag">{source}</span>}
        </div>
      </div>
      <div className="worked-q-prompt">{children}</div>
      {!showSolution ? (
        <button className="reveal-btn" onClick={() => setShowSolution(true)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
          Reveal solution
        </button>
      ) : (
        <>
          <div className="worked-q-steps">{solution}</div>
          <button className="reveal-btn done" onClick={() => setShowSolution(false)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
            Hide solution
          </button>
        </>
      )}
    </div>
  )
}
