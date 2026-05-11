// src/pages/admin/Bookings.jsx
import { useState } from 'react'

const allBookings = [
  { id: 'WO-001', name: 'Andhie & Yasmin', phone: '0812-3456-7890', date: '12 Jun 2026', service: 'Full Package', status: 'Confirmed', amount: 15000000 },
  { id: 'WO-002', name: 'Budi & Sari', phone: '0813-2345-6789', date: '20 Jun 2026', service: 'Photography', status: 'Pending', amount: 4000000 },
  { id: 'WO-003', name: 'Reza & Dina', phone: '0814-3456-7890', date: '5 Jul 2026', service: 'Decoration', status: 'Confirmed', amount: 8000000 },
  { id: 'WO-004', name: 'Andi & Putri', phone: '0815-4567-8901', date: '18 Jul 2026', service: 'Catering', status: 'In Progress', amount: 12000000 },
]

const statusColor = {
  'Confirmed': { bg: '#d1fae5', color: '#065f46' },
  'Pending': { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#e6e6ff', color: '#0000cc' },
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
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Pemesanan
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Kelola semua pemesanan klien</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          placeholder="Cari nama atau ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '10px 16px',
            border: '1px solid #d3d3d3', borderRadius: 8,
            fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
          }}
          onFocus={e => e.target.style.borderColor = '#0000ff'}
          onBlur={e => e.target.style.borderColor = '#d3d3d3'}
        />
        {['Semua', 'Confirmed', 'Pending', 'In Progress'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 14,
            border: '1px solid',
            borderColor: filter === s ? '#0000ff' : '#d3d3d3',
            background: filter === s ? '#e6e6ff' : '#fff',
            color: filter === s ? '#0000ff' : '#666666',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500
          }}>{s}</button>
        ))}
        <button style={{
          padding: '8px 20px', borderRadius: 8, fontSize: 14,
          background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500
        }}>
          + Tambah
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              {['ID', 'Klien', 'No. HP', 'Tanggal', 'Layanan', 'Status', 'Total', 'Aksi'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 12, color: '#666666', fontWeight: 600
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} style={{ borderTop: '1px solid #d3d3d3' }}>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#666666' }}>{b.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#000000', fontWeight: 500 }}>{b.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#666666' }}>{b.phone}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#666666' }}>{b.date}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#666666' }}>{b.service}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    ...statusColor[b.status],
                    padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600
                  }}>{b.status}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#0000ff', fontWeight: 600 }}>{fmt(b.amount)}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      padding: '4px 12px', borderRadius: 6, fontSize: 12,
                      background: '#e6e6ff', color: '#0000ff',
                      border: 'none', cursor: 'pointer'
                    }}>Edit</button>
                    <button style={{
                      padding: '4px 12px', borderRadius: 6, fontSize: 12,
                      background: '#fee2e2', color: '#ef4444',
                      border: 'none', cursor: 'pointer'
                    }}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}