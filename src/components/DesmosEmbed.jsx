export default function DesmosEmbed({ url, height = 400 }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--bg-elev)',
    }}>
      <iframe
        src={url}
        width="100%"
        height={height}
        style={{ border: 'none', display: 'block' }}
        loading="lazy"
        title="Desmos graph"
      />
    </div>
  )
}
