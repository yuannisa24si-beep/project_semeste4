export default function StatCard({ label, value, icon, change, changeType = 'up' }) {
  const isUp = changeType === 'up'
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '20px',
      border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 12, color: '#868e96', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>{value}</p>
          {change && (
            <p style={{
              fontSize: 12, marginTop: 8, fontWeight: 500,
              color: isUp ? '#2f9e44' : '#c92a2a',
              display: 'flex', alignItems: 'center', gap: 3
            }}>
              <span>{isUp ? '↑' : '↓'}</span> {change}
            </p>
          )}
        </div>
        {icon && (
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: '#eef2ff', color: '#4f46e5',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
