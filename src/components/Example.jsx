export default function Example({ title, children }) {
  return (
    <div className="sg-example">
      <div className="example-head">
        <span className="example-label">EXAMPLE</span>
        {title && <span className="example-title">— {title}</span>}
      </div>
      {children}
    </div>
  )
}
