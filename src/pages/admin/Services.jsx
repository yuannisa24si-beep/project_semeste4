// src/pages/admin/Services.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', description: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true })
    if (!error) setServices(data || [])
    setLoading(false)
  }

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Aktif' ? 'Nonaktif' : 'Aktif'
    const { error } = await supabase.from('services').update({ status: newStatus }).eq('id', id)
    if (!error) {
      setServices(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s))
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    const { data, error } = await supabase.from('services').insert([{
      name: form.name,
      price: Number(form.price),
      description: form.description,
      status: 'Aktif'
    }]).select().single()
    if (!error && data) {
      setServices(prev => [...prev, data])
    }
    setForm({ name: '', price: '', description: '' })
    setShowForm(false)
    setSaving(false)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (!error) {
      setServices(prev => prev.filter(s => s.id !== id))
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <p style={{ color: '#868e96', fontSize: 14 }}>Memuat data...</p>
    </div>
  )

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
        {services.length === 0 && (
          <p style={{ color: '#adb5bd', fontSize: 14, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>
            Belum ada layanan. Tambahkan layanan baru.
          </p>
        )}
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
            <p style={{ fontSize: 14, color: '#666666', marginBottom: 12, lineHeight: 1.5 }}>{s.description}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#0000ff', marginBottom: 16 }}>{fmt(s.price)}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleStatus(s.id, s.status)} style={{
                flex: 1, padding: '8px', borderRadius: 6, fontSize: 13,
                background: '#e6e6ff', color: '#0000ff',
                border: 'none', cursor: 'pointer', fontWeight: 500
              }}>
                {s.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button onClick={() => handleDelete(s.id)} style={{
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
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
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
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
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
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 14px', boxSizing: 'border-box',
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
                <button type="submit" disabled={saving} style={{
                  flex: 1, padding: '12px', borderRadius: 8, fontSize: 14,
                  background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500
                }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
