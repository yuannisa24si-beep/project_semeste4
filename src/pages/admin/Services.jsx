// src/pages/admin/Services.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

// Foto Unsplash per kategori layanan wedding — bebas pakai, no API key
const SERVICE_IMAGES = {
  'Fotografi Pernikahan':     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'Videografi Sinematik':     'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
  'Dekorasi Pelaminan':       'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
  'Dekorasi Venue Lengkap':   'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
  'Catering 100 Porsi':       'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
  'Catering 200 Porsi':       'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  'MC Profesional':           'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  'Live Band 4 Jam':          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
  'Wedding Organizer Penuh':  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
  'Gaun Pengantin':           'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=400&q=80',
  'Rias Pengantin':           'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&q=80',
  'Undangan Digital':         'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80',
  'Sewa Gedung Half Day':     'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&q=80',
  'Dokumentasi Pre-Wedding':  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80'

function getServiceImage(service) {
  // Cek field image_url dari DB dulu, fallback ke mapping nama, lalu default
  if (service.image_url) return service.image_url
  return SERVICE_IMAGES[service.name] || DEFAULT_IMAGE
}

const emptyForm = { name: '', price: '', description: '', discount: '0', promo_label: '', image_url: '' }

const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }
const inp = { width: '100%', padding: '9px 12px', boxSizing: 'border-box', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm]         = useState(emptyForm)
  const [saving, setSaving]     = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true })
    setServices(data || [])
    setLoading(false)
  }

  const toggleStatus = async (id, cur) => {
    const next = cur === 'Aktif' ? 'Nonaktif' : 'Aktif'
    await supabase.from('services').update({ status: next }).eq('id', id)
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: next } : s))
  }

  const openAdd = () => { setForm(emptyForm); setEditTarget(null); setShowForm(true) }
  const openEdit = (s) => {
    setForm({
      name: s.name, price: String(s.price), description: s.description || '',
      discount: String(s.discount || 0), promo_label: s.promo_label || '',
      image_url: s.image_url || '',
    })
    setEditTarget(s)
    setShowForm(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      name: form.name, price: Number(form.price), description: form.description,
      discount: Number(form.discount) || 0, promo_label: form.promo_label,
      image_url: form.image_url || null, status: 'Aktif',
    }
    if (editTarget) {
      const { data } = await supabase.from('services').update(payload).eq('id', editTarget.id).select().single()
      if (data) setServices(prev => prev.map(s => s.id === editTarget.id ? data : s))
    } else {
      const { data } = await supabase.from('services').insert([payload]).select().single()
      if (data) setServices(prev => [...prev, data])
    }
    setShowForm(false); setEditTarget(null); setForm(emptyForm); setSaving(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <p style={{ color: '#868e96', fontSize: 14 }}>Memuat data...</p>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Layanan</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Kelola layanan, harga, diskon & promo untuk member</p>
        </div>
        <button onClick={openAdd} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>
          + Tambah Layanan
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Layanan', value: services.length },
          { label: 'Aktif', value: services.filter(s => s.status === 'Aktif').length },
          { label: 'Ada Promo', value: services.filter(s => s.discount > 0).length },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e9ecef' }}>
            <p style={{ fontSize: 11, color: '#868e96', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#4f46e5' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
        {services.length === 0 && (
          <p style={{ color: '#adb5bd', fontSize: 14, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>
            Belum ada layanan. Tambahkan layanan baru.
          </p>
        )}
        {services.map(s => {
          const imgSrc = imgErrors[s.id] ? DEFAULT_IMAGE : getServiceImage(s)
          const discountedPrice = s.discount > 0 ? s.price * (1 - s.discount / 100) : s.price
          return (
            <div key={s.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e9ecef', transition: 'all 0.2s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Foto */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img
                  src={imgSrc}
                  alt={s.name}
                  onError={() => setImgErrors(p => ({ ...p, [s.id]: true }))}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Promo badge */}
                {s.discount > 0 && (
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    {s.promo_label || `DISKON ${s.discount}%`}
                  </div>
                )}
                {/* Status badge */}
                <div style={{ position: 'absolute', top: 12, right: 12, background: s.status === 'Aktif' ? 'rgba(16,185,129,0.9)' : 'rgba(107,114,128,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, backdropFilter: 'blur(4px)' }}>
                  {s.status}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px 18px 14px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{s.name}</h3>
                <p style={{ fontSize: 12, color: '#868e96', lineHeight: 1.5, marginBottom: 12, minHeight: 34 }}>{s.description}</p>

                {/* Harga */}
                <div style={{ marginBottom: 14 }}>
                  {s.discount > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: '#4f46e5' }}>{fmt(discountedPrice)}</span>
                      <span style={{ fontSize: 12, color: '#adb5bd', textDecoration: 'line-through' }}>{fmt(s.price)}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444' }}>-{s.discount}%</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#4f46e5' }}>{fmt(s.price)}</span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(s)} style={{ flex: 1, padding: '7px', borderRadius: 7, fontSize: 12, fontWeight: 600, background: '#eef2ff', color: '#4f46e5', border: 'none', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => toggleStatus(s.id, s.status)} style={{ flex: 1, padding: '7px', borderRadius: 7, fontSize: 12, fontWeight: 500, background: '#f8f9fa', color: '#495057', border: '1px solid #e9ecef', cursor: 'pointer' }}>
                    {s.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button onClick={() => handleDelete(s.id)} style={{ padding: '7px 12px', borderRadius: 7, fontSize: 13, background: '#fff5f5', color: '#ef4444', border: '1px solid #ffe3e3', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Tambah/Edit */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
          onClick={() => setShowForm(false)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
              {editTarget ? 'Edit Layanan' : 'Tambah Layanan'}
            </h2>

            {/* Preview foto */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ width: '100%', height: 140, borderRadius: 10, overflow: 'hidden', background: '#f1f3f5', marginBottom: 8 }}>
                <img
                  src={form.image_url || SERVICE_IMAGES[form.name] || DEFAULT_IMAGE}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.currentTarget.src = DEFAULT_IMAGE }}
                />
              </div>
              <label style={lbl}>URL Foto (Unsplash / Google / link gambar)</label>
              <input
                value={form.image_url} onChange={f('image_url')}
                placeholder="https://images.unsplash.com/... (kosongkan = otomatis)"
                style={inp}
                onFocus={e => e.target.style.borderColor='#4f46e5'}
                onBlur={e => e.target.style.borderColor='#dee2e6'}
              />
              <p style={{ fontSize: 11, color: '#adb5bd', marginTop: 4 }}>
                Kosongkan = foto otomatis berdasarkan nama layanan
              </p>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={lbl}>Nama Layanan <span style={{ color: '#fa5252' }}>*</span></label>
                <input required value={form.name} onChange={f('name')} placeholder="Contoh: Fotografi Premium" style={inp} onFocus={e => e.target.style.borderColor='#4f46e5'} onBlur={e => e.target.style.borderColor='#dee2e6'} />
              </div>
              <div>
                <label style={lbl}>Deskripsi</label>
                <input value={form.description} onChange={f('description')} placeholder="Deskripsi singkat layanan" style={inp} onFocus={e => e.target.style.borderColor='#4f46e5'} onBlur={e => e.target.style.borderColor='#dee2e6'} />
              </div>
              <div>
                <label style={lbl}>Harga Normal (Rp) <span style={{ color: '#fa5252' }}>*</span></label>
                <input required type="number" value={form.price} onChange={f('price')} placeholder="0" style={inp} onFocus={e => e.target.style.borderColor='#4f46e5'} onBlur={e => e.target.style.borderColor='#dee2e6'} />
              </div>

              {/* Diskon & Promo */}
              <div style={{ background: '#fef9ec', border: '1px solid #fde68a', borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 10 }}>🎁 Diskon & Promo</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={lbl}>Diskon (%)</label>
                    <input type="number" min="0" max="100" value={form.discount} onChange={f('discount')} placeholder="0" style={inp} onFocus={e => e.target.style.borderColor='#f59e0b'} onBlur={e => e.target.style.borderColor='#dee2e6'} />
                  </div>
                  <div>
                    <label style={lbl}>Label Promo</label>
                    <input value={form.promo_label} onChange={f('promo_label')} placeholder="FLASH SALE" style={inp} onFocus={e => e.target.style.borderColor='#f59e0b'} onBlur={e => e.target.style.borderColor='#dee2e6'} />
                  </div>
                </div>
                {form.discount > 0 && form.price && (
                  <p style={{ fontSize: 12, color: '#065f46', marginTop: 8, fontWeight: 600 }}>
                    Harga setelah diskon: {fmt(Number(form.price) * (1 - Number(form.discount) / 100))}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '11px', borderRadius: 8, background: '#f3f4f6', color: '#666', border: 'none', cursor: 'pointer', fontSize: 13 }}>Batal</button>
                <button type="submit" disabled={saving} style={{ flex: 2, padding: '11px', borderRadius: 8, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Menyimpan...' : 'Simpan Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
