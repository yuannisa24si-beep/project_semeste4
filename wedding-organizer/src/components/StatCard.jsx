export default function StatCard({ label, value, icon, change, changeType = 'up' }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '20px',
      border: '1px solid #e9ecef', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, color: '#868e96', marginBottom: 6 }}>{label}</p>
          <p style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e' }}>{value}</p>
          {change && (
            <p style={{
              fontSize: 12, marginTop: 4,
              color: changeType === 'up' ? '#2f9e44' : '#c92a2a'
            }}>
              {changeType === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {icon && (
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: '#edf2ff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 22
          }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
