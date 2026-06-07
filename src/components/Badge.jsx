const colors = {
  success: { background: '#d3f9d8', color: '#2f9e44' },
  warning: { background: '#fff3bf', color: '#e67700' },
  danger:  { background: '#ffe3e3', color: '#c92a2a' },
  info:    { background: '#dbe4ff', color: '#3b5bdb' },
  gray:    { background: '#f1f3f5', color: '#495057' },
}

export default function Badge({ label, color = 'info', dot = false }) {
  return (
    <span style={{
      ...colors[color],
      padding: '3px 10px',
      borderRadius: 50,
      fontSize: 11,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      letterSpacing: 0.3,
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: colors[color].color, flexShrink: 0
        }} />
      )}
      {label}
    </span>
  )
}
