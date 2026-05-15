export default function TopicSection({ topic, children }) {
  return (
    <section className="topic" id={`topic-${topic.id}`}>
      <div className="topic-head">
        <div className="topic-eyebrow">
          <span>Part {topic.part} — {topic.partLabel}</span>
          <span className="topic-dot">·</span>
          <span>{topic.lectures}</span>
        </div>
        <h2 className="topic-title">
          <span className="topic-num">{topic.num}.</span>
          <span className="topic-name">{topic.title}</span>
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--ink-faint)', marginTop: 6 }}>Source: {topic.source}</div>
      </div>
      <div className="topic-body">{children}</div>
    </section>
  )
}
