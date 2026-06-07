export default function Loading() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#fdf4f4', gap: '16px'
    }}>
      <div style={{
        width: 48, height: 48,
        border: '3px solid #f7e0e0',
        borderTop: '3px solid #c97070',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: '#c97070', fontSize: 14, letterSpacing: 2 }}>LOADING...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
