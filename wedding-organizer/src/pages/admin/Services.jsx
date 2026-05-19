// src/pages/admin/Services.jsx
// src/pages/admin/Services.jsx
import { useState } from 'react'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import InputField from '../../components/InputField'
import PageHeader from '../../components/PageHeader'
import Alert from '../../components/Alert'

const initialServices = [
  { id: 1, name: 'Full Package', price: 25000000, desc: 'Paket lengkap semua layanan pernikahan', status: 'Aktif' },
  { id: 2, name: 'Photography', price: 4000000, desc: 'Fotografer profesional hari H', status: 'Aktif' },
  { id: 3, name: 'Decoration', price: 8000000, desc: 'Dekorasi venue dan pelaminan', status: 'Aktif' },
  { id: 4, name: 'Catering', price: 12000000, desc: 'Katering untuk 200 tamu', status: 'Aktif' },
  { id: 5, name: 'Video & Film', price: 5000000, desc: 'Sinematografi pernikahan', status: 'Nonaktif' },
  { id: 6, name: 'Entertainment', price: 3500000, desc: 'Live band dan hiburan', status: 'Aktif' },
]

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Services() {
  const [services, setServices] = useState(initialServices)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', desc: '' })

  const toggleStatus = (id) => {
    setServices(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : s
    ))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    setServices(prev => [...prev, {
      id: Date.now(), name: form.name,
      price: Number(form.price), desc: form.desc, status: 'Aktif'
    }])
    setForm({ name: '', price: '', desc: '' })
    setShowForm(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
            Layanan
          </h1>
          <p style={{ fontSize: 14, color: '#666666' }}>Kelola paket dan layanan yang tersedia</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 14,
          background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500
        }}>+ Tambah Layanan</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {services.map(s => (
          <div key={s.id} style={{
            background: '#fff', borderRadius: 12, padding: 20,
            border: '1px solid #d3d3d3',
            transition: 'box-shadow 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0000ff' }}>{s.name}</h3>
              <span style={{
                padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                background: s.status === 'Aktif' ? '#d1fae5' : '#f3f4f6',
                color: s.status === 'Aktif' ? '#065f46' : '#6b7280'
              }}>{s.status}</span>
            </div>
            <p style={{ fontSize: 14, color: '#666666', marginBottom: 12, lineHeight: 1.5 }}>{s.desc}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#0000ff', marginBottom: 16 }}>{fmt(s.price)}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleStatus(s.id)} style={{
                flex: 1, padding: '8px', borderRadius: 6, fontSize: 13,
                background: '#e6e6ff', color: '#0000ff',
                border: 'none', cursor: 'pointer', fontWeight: 500
              }}>
                {s.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))} style={{
                padding: '8px 14px', borderRadius: 6, fontSize: 13,
                background: '#fee2e2', color: '#ef4444',
                border: 'none', cursor: 'pointer'
              }}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 32,
            width: '100%', maxWidth: 400
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0000ff', marginBottom: 20 }}>
              Tambah Layanan
            </h2>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
                  Nama Layanan
                </label>
                <input type="text" required placeholder="Nama layanan"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1px solid #d3d3d3', borderRadius: 8,
                    fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0000ff'}
                  onBlur={e => e.target.style.borderColor = '#d3d3d3'}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
                  Harga (Rp)
                </label>
                <input type="number" required placeholder="0"
                  value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1px solid #d3d3d3', borderRadius: 8,
                    fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0000ff'}
                  onBlur={e => e.target.style.borderColor = '#d3d3d3'}
                />
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
                  Deskripsi
                </label>
                <input type="text" required placeholder="Deskripsi singkat"
                  value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1px solid #d3d3d3', borderRadius: 8,
                    fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0000ff'}
                  onBlur={e => e.target.style.borderColor = '#d3d3d3'}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  flex: 1, padding: '12px', borderRadius: 8, fontSize: 14,
                  background: '#f3f4f6', color: '#666666', border: 'none', cursor: 'pointer'
                }}>Batal</button>
                <button type="submit" style={{
                  flex: 1, padding: '12px', borderRadius: 8, fontSize: 14,
                  background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500
                }}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}