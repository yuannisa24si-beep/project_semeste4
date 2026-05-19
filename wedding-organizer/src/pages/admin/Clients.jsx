// src/pages/admin/Clients.jsx
import { useState } from 'react'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Avatar from '../../components/Avatar'
import Card from '../../components/Card'
import InputField from '../../components/InputField'
import Modal from '../../components/Modal'
import PageHeader from '../../components/PageHeader'

const clients = [
  { id: 1, name: 'Andhie & Yasmin', email: 'andhie@email.com', phone: '0812-3456-7890', date: '12 Jun 2026', package: 'Full Package', total: 15000000 },
  { id: 2, name: 'Budi & Sari', email: 'budi@email.com', phone: '0813-2345-6789', date: '20 Jun 2026', package: 'Photography', total: 4000000 },
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
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>Klien</h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Data seluruh klien terdaftar</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Cari nama atau email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '10px 16px',
            border: '1px solid #d3d3d3', borderRadius: 8,
            fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
          }}
          onFocus={e => e.target.style.borderColor = '#0000ff'}
          onBlur={e => e.target.style.borderColor = '#d3d3d3'}
        />
        <button style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 14,
          background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500
        }}>+ Tambah Klien</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(c => (
          <div key={c.id} style={{
            background: '#fff', borderRadius: 12, padding: 20,
            border: '1px solid #d3d3d3', cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
            onClick={() => setSelected(c)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#e6e6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>💑</div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#0000ff' }}>{c.name}</p>
                <p style={{ fontSize: 12, color: '#666666' }}>{c.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#666666' }}>📞 {c.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#666666' }}>📅 {c.date}</span>
                <span style={{ color: '#0000ff', fontWeight: 600 }}>{fmt(c.total)}</span>
              </div>
              <span style={{
                display: 'inline-block', marginTop: 4,
                background: '#e6e6ff', color: '#0000ff',
                fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 50
              }}>{c.package}</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setSelected(null)}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 32,
            width: '100%', maxWidth: 420
          }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>💑</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0000ff' }}>{selected.name}</h2>
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
                padding: '10px 0', borderBottom: '1px solid #d3d3d3',
                fontSize: 14
              }}>
                <span style={{ color: '#666666' }}>{label}</span>
                <span style={{ color: '#000000', fontWeight: 500 }}>{val}</span>
              </div>
            ))}
            <button onClick={() => setSelected(null)} style={{
              marginTop: 20, width: '100%',
              background: '#0000ff', color: '#fff', border: 'none', borderRadius: 8,
              padding: '12px', fontSize: 14, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontWeight: 500
            }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}