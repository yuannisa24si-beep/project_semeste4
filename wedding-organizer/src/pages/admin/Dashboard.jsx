import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Pemesanan', value: '48', icon: '📋', color: '#e8a0a0', change: '+12%' },
  { label: 'Klien Aktif', value: '32', icon: '👥', color: '#a8d8a8', change: '+5%' },
  { label: 'Pendapatan Bulan Ini', value: 'Rp 48jt', icon: '💰', color: '#a8c8e8', change: '+18%' },
  { label: 'Event Mendatang', value: '7', icon: '📅', color: '#e8d0a8', change: '2 minggu ini' },
]

const recentBookings = [
  { name: 'Andhie & Yasmin', date: '12 Jun 2026', service: 'Full Package', status: 'Confirmed', amount: 'Rp 15jt' },
  { name: 'Budi & Sari', date: '20 Jun 2026', service: 'Photography', status: 'Pending', amount: 'Rp 4jt' },
  { name: 'Reza & Dina', date: '5 Jul 2026', service: 'Decoration', status: 'Confirmed', amount: 'Rp 8jt' },
  { name: 'Andi & Putri', date: '18 Jul 2026', service: 'Catering', status: 'In Progress', amount: 'Rp 12jt' },
]

const statusColor = {
  'Confirmed': { bg: '#d1fae5', color: '#065f46' },
  'Pending': { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#dbeafe', color: '#1e40af' },
}

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#a84f4f', marginBottom: 4 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>Ringkasan aktivitas Wedding Organizer</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, icon, color, change }) => (
          <div key={label} style={{
            background: '#fff', borderRadius: 16, padding: '20px',
            border: '1px solid #f7e0e0',
            boxShadow: '0 2px 8px rgba(201,112,112,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#2d2d2d', fontWeight: 600 }}>
                  {value}
                </p>
                <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{change}</p>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: color + '40',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f7e0e0', overflow: 'hidden' }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #f7e0e0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#a84f4f' }}>
            Pemesanan Terbaru
          </h2>
          <Link to="/admin/bookings" style={{ fontSize: 13, color: '#c97070', fontWeight: 500 }}>
            Lihat Semua →
          </Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fdf4f4' }}>
              {['Klien', 'Tanggal', 'Layanan', 'Status', 'Total'].map(h => (
                <th key={h} style={{
                  padding: '10px 20px', textAlign: 'left',
                  fontSize: 12, color: '#9ca3af', fontWeight: 600, letterSpacing: 0.5
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f7e0e0' }}>
                <td style={{ padding: '12px 20px', fontSize: 14, color: '#2d2d2d', fontWeight: 500 }}>{b.name}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: '#6b7280' }}>{b.date}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: '#6b7280' }}>{b.service}</td>
                <td style={{ padding: '12px 20px' }}>
                  <span style={{
                    ...statusColor[b.status],
                    padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600
                  }}>{b.status}</span>
                </td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: '#c97070', fontWeight: 600 }}>{b.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}