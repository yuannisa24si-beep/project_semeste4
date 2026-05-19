export default function Table({ columns = [], data = [], onRowClick }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            {columns.map(col => (
              <th key={col.key} style={{
                padding: '12px 16px', textAlign: 'left',
                fontSize: 12, color: '#868e96', fontWeight: 700,
                letterSpacing: 0.5, textTransform: 'uppercase'
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: '32px', textAlign: 'center',
                color: '#adb5bd', fontSize: 14
              }}>
                Tidak ada data
              </td>
            </tr>
          ) : data.map((row, i) => (
            <tr key={i}
              onClick={() => onRowClick?.(row)}
              style={{
                borderTop: '1px solid #f1f3f5',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = '#f8f9fa' }}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: '12px 16px', fontSize: 14, color: '#343a40' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
