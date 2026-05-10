import { useState } from 'react'

const clients = [
  { id: 1, name: 'Andhie & Yasmin', email: 'andhie@email.com', phone: '0812-3456-7890', date: '12 Jun 2026', package: 'Full Package', total: 15000000 },
  { id: 2, name: 'Budi & Sari', email: 'budi@email.com', phone: '0813-2345-6789', date: '20 Jun 2026', package: 'Photography', total: 4000000 },
  { id: 3, name: 'Reza & Dina', email: 'reza@email.com', phone: '0814-3456-7890', date: '5 Jul 2026', package: 'Decoration', total: 8000000 },
  { id: 4, name: 'Andi & Putri', email: 'andi@email.com', phone: '0815-4567-8901', date: '18 Jul 2026', package: 'Catering', total: 12000000 },
  { id: 5, name: 'Hendra & Lia', email: 'hendra@email.com', phone: '0816-5678-9012', date: '2 Aug 2026', package: 'Full Package', total: 18000000 },
]

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Clients() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#a84f4f', marginBottom: 4 }}>
          Klien
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>Data seluruh klien terdaftar</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Cari nama atau email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '10px 16px',
            border: '1.5px solid #f0d0d0', borderRadius: 10,
            fontSize: 13, outline: 'none', fontFamily: 'Jost, sans-serif'
          }}
          onFocus={e => e.target.style.borderColor = '#c97070'}
          onBlur={e => e.target.style.borderColor = '#f0d0d0'}
        />
        <button style={{
          padding: '10px 20px', borderRadius: 10, fontSize: 13,
          background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', fontWeight: 500
        }}>
          + Tambah Klien
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(c => (
          <div key={c.id} style={{
            background: '#fff', borderRadius: 16, padding: '20px',
            border: '1px solid #f7e0e0',
            boxShadow: '0 2px 8px rgba(201,112,112,0.06)',
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s'
          }}
            onClick={() => setSelected(c)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,112,112,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,112,112,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>💑</div>
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: '#a84f4f', fontWeight: 600 }}>
                  {c.name}
                </p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>{c.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#9ca3af' }}>📞 {c.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#9ca3af' }}>📅 {c.date}</span>
                <span style={{ color: '#c97070', fontWeight: 600 }}>{fmt(c.total)}</span>
              </div>
              <span style={{
                display: 'inline-block', marginTop: 4,
                background: '#f7e0e0', color: '#c97070',
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50
              }}>{c.package}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setSelected(null)}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '32px',
            width: '100%', maxWidth: 420,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>💑</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#a84f4f' }}>
                {selected.name}
              </h2>
            </div>
            {[
              ['Email', selected.email],
              ['Telepon', selected.phone],
              ['Tanggal Pernikahan', selected.date],
              ['Paket', selected.package],
              ['Total', fmt(selected.total)],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #f7e0e0',
                fontSize: 14
              }}>
                <span style={{ color: '#9ca3af' }}>{label}</span>
                <span style={{ color: '#2d2d2d', fontWeight: 500 }}>{val}</span>
              </div>
            ))}
            <button onClick={() => setSelected(null)} style={{
              marginTop: 20, width: '100%',
              background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
              color: '#fff', border: 'none', borderRadius: 50,
              padding: '12px', fontSize: 14, cursor: 'pointer',
              fontFamily: 'Jost, sans-serif', fontWeight: 500
            }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}