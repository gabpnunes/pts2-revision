import MathBlock from './MathBlock'

export default function Definition({ id, title, children, display }) {
  return (
    <div className="sg-callout" id={id}>
      <div className="callout-head">
        <span className="callout-label">DEFINITION</span>
        {title && <span className="callout-title">— {title}</span>}
      </div>
      {children && <div className="callout-body">{children}</div>}
      {display && <div className="callout-display"><MathBlock math={display} display /></div>}
    </div>
  )
}
