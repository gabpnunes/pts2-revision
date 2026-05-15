import { useState } from 'react'

export default function Proof({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sg-callout sg-proof">
      <button
        className="callout-head"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', background: 'none', border: 'none', width: '100%', padding: 0 }}
      >
        <span className="callout-label" style={{ color: 'var(--bad)' }}>PROOF</span>
        {title && <span className="callout-title">— {title}</span>}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="callout-body">
          {children}
          <div style={{ textAlign: 'right', color: 'var(--ink-faint)', fontSize: '18px', marginTop: 8 }}>∎</div>
        </div>
      )}
    </div>
  )
}
