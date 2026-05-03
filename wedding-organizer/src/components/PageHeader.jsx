export default function PageHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, marginBottom: 8
      }}>
        <span style={{ height: 1, width: 48, background: '#e8a0a0', display: 'block' }} />
        <span style={{ fontSize: 18 }}>🌸</span>
        <span style={{ height: 1, width: 48, background: '#e8a0a0', display: 'block' }} />
      </div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 42, color: '#a84f4f', fontWeight: 600, marginBottom: 8
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: '#9ca3af', fontSize: 14, letterSpacing: 1 }}>{subtitle}</p>
      )}
    </div>
  )
}
