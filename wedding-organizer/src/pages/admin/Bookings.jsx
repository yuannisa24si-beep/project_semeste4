import { useState } from 'react'

const allBookings = [
  { id: 'WO-001', name: 'Andhie & Yasmin', phone: '0812-3456-7890', date: '12 Jun 2026', service: 'Full Package', status: 'Confirmed', amount: 15000000 },
  { id: 'WO-002', name: 'Budi & Sari', phone: '0813-2345-6789', date: '20 Jun 2026', service: 'Photography', status: 'Pending', amount: 4000000 },
  { id: 'WO-003', name: 'Reza & Dina', phone: '0814-3456-7890', date: '5 Jul 2026', service: 'Decoration', status: 'Confirmed', amount: 8000000 },
  { id: 'WO-004', name: 'Andi & Putri', phone: '0815-4567-8901', date: '18 Jul 2026', service: 'Catering', status: 'In Progress', amount: 12000000 },
  { id: 'WO-005', name: 'Hendra & Lia', phone: '0816-5678-9012', date: '2 Aug 2026', service: 'Full Package', status: 'Pending', amount: 18000000 },
  { id: 'WO-006', name: 'Fajar & Nisa', phone: '0817-6789-0123', date: '15 Aug 2026', service: 'Video & Film', status: 'Confirmed', amount: 5000000 },
]

const statusColor = {
  'Confirmed': { bg: '#d1fae5', color: '#065f46' },
  'Pending': { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#dbeafe', color: '#1e40af' },
}

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Bookings() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Semua')

  const filtered = allBookings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search)
    const matchFilter = filter === 'Semua' || b.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#a84f4f', marginBottom: 4 }}>
          Pemesanan
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>Kelola semua pemesanan klien</p>
      </div>

      {/* Filter & Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          placeholder="Cari nama atau ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '10px 16px',
            border: '1.5px solid #f0d0d0', borderRadius: 10,
            fontSize: 13, outline: 'none', fontFamily: 'Jost, sans-serif'
          }}
          onFocus={e => e.target.style.borderColor = '#c97070'}
          onBlur={e => e.target.style.borderColor = '#f0d0d0'}
        />
        {['Semua', 'Confirmed', 'Pending', 'In Progress'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '10px 18px', borderRadius: 10, fontSize: 13,
            border: '1.5px solid',
            borderColor: filter === s ? '#c97070' : '#f0d0d0',
            background: filter === s ? '#f7e0e0' : '#fff',
            color: filter === s ? '#c97070' : '#6b7280',
            cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontWeight: 500
          }}>{s}</button>
        ))}
        <button style={{
          padding: '10px 20px', borderRadius: 10, fontSize: 13,
          background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', fontWeight: 500
        }}>
          + Tambah
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f7e0e0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fdf4f4' }}>
              {['ID', 'Klien', 'No. HP', 'Tanggal', 'Layanan', 'Status', 'Total', 'Aksi'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 12, color: '#9ca3af', fontWeight: 600, letterSpacing: 0.5
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : filtered.map((b) => (
              <tr key={b.id} style={{ borderTop: '1px solid #f7e0e0' }}>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{b.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#2d2d2d', fontWeight: 500 }}>{b.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{b.phone}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{b.date}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{b.service}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    ...statusColor[b.status],
                    padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600
                  }}>{b.status}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#c97070', fontWeight: 600 }}>{fmt(b.amount)}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 12,
                      background: '#f7e0e0', color: '#c97070',
                      border: 'none', cursor: 'pointer'
                    }}>Edit</button>
                    <button style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 12,
                      background: '#fee2e2', color: '#dc2626',
                      border: 'none', cursor: 'pointer'
                    }}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
        Menampilkan {filtered.length} dari {allBookings.length} pemesanan
      </p>
    </div>
  )
}