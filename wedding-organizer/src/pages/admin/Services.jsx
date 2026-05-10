import { useState } from 'react'

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
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#a84f4f', marginBottom: 4 }}>
            Layanan
          </h1>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Kelola paket dan layanan yang tersedia</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{
          padding: '10px 20px', borderRadius: 10, fontSize: 13,
          background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', fontWeight: 500
        }}>+ Tambah Layanan</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {services.map(s => (
          <div key={s.id} style={{
            background: '#fff', borderRadius: 16, padding: '20px',
            border: '1px solid #f7e0e0',
            boxShadow: '0 2px 8px rgba(201,112,112,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#a84f4f' }}>{s.name}</h3>
              <span style={{
                padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600,
                background: s.status === 'Aktif' ? '#d1fae5' : '#f3f4f6',
                color: s.status === 'Aktif' ? '#065f46' : '#6b7280'
              }}>{s.status}</span>
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12, lineHeight: 1.6 }}>{s.desc}</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#c97070', marginBottom: 16 }}>{fmt(s.price)}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleStatus(s.id)} style={{
                flex: 1, padding: '8px', borderRadius: 8, fontSize: 12,
                background: '#f7e0e0', color: '#c97070',
                border: 'none', cursor: 'pointer', fontWeight: 500
              }}>
                {s.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 12,
                background: '#fee2e2', color: '#dc2626',
                border: 'none', cursor: 'pointer'
              }}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '32px',
            width: '100%', maxWidth: 400
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#a84f4f', marginBottom: 20 }}>
              Tambah Layanan
            </h2>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Nama Layanan', key: 'name', type: 'text', placeholder: 'Nama layanan' },
                { label: 'Harga (Rp)', key: 'price', type: 'number', placeholder: '0' },
                { label: 'Deskripsi', key: 'desc', type: 'text', placeholder: 'Deskripsi singkat' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>{label}</label>
                  <input type={type} required placeholder={placeholder}
                    value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 14px',
                      border: '1.5px solid #f0d0d0', borderRadius: 10,
                      fontSize: 13, outline: 'none', fontFamily: 'Jost, sans-serif'
                    }}
                    onFocus={e => e.target.style.borderColor = '#c97070'}
                    onBlur={e => e.target.style.borderColor = '#f0d0d0'}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  flex: 1, padding: '12px', borderRadius: 50, fontSize: 14,
                  background: '#f7e0e0', color: '#c97070', border: 'none', cursor: 'pointer'
                }}>Batal</button>
                <button type="submit" style={{
                  flex: 1, padding: '12px', borderRadius: 50, fontSize: 14,
                  background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
                  color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500
                }}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
