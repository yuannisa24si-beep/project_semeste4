const types = {
  success: { bg: '#d3f9d8', border: '#40c057', color: '#2f9e44', icon: '✅' },
  error:   { bg: '#ffe3e3', border: '#fa5252', color: '#c92a2a', icon: '❌' },
  warning: { bg: '#fff3bf', border: '#fab005', color: '#e67700', icon: '⚠️' },
  info:    { bg: '#dbe4ff', border: '#3b5bdb', color: '#3b5bdb', icon: 'ℹ️' },
}

export default function Alert({ message, type = 'info', onClose }) {
  const t = types[type]
  return (
    <div style={{
      background: t.bg, border: `1px solid ${t.border}`,
      borderLeft: `4px solid ${t.border}`,
      borderRadius: 8, padding: '12px 16px',
      display: 'flex', alignItems: 'flex-start',
      justifyContent: 'space-between', gap: 10, marginBottom: 16
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 16 }}>{t.icon}</span>
        <p style={{ fontSize: 14, color: t.color, fontWeight: 500 }}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: t.color, fontSize: 16, padding: 0, lineHeight: 1
        }}>✕</button>
      )}
    </div>
  )
}
