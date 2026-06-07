// src/pages/admin/Gallery.jsx
import { useState } from 'react'
import Modal from '../../components/Modal'

const initialPhotos = [
  { id: 1, couple: 'Andhie & Yasmin', category: 'Outdoor',  date: '12 Jun 2025', color: ['#667eea', '#764ba2'] },
  { id: 2, couple: 'Budi & Sari',     category: 'Indoor',   date: '20 Jul 2025', color: ['#f093fb', '#f5576c'] },
  { id: 3, couple: 'Reza & Dina',     category: 'Garden',   date: '5 Agu 2025',  color: ['#4facfe', '#00f2fe'] },
  { id: 4, couple: 'Andi & Putri',    category: 'Beach',    date: '18 Sep 2025', color: ['#43e97b', '#38f9d7'] },
  { id: 5, couple: 'Hendra & Lia',    category: 'Ballroom', date: '2 Okt 2025',  color: ['#fa709a', '#fee140'] },
  { id: 6, couple: 'Fajar & Nisa',    category: 'Outdoor',  date: '15 Nov 2025', color: ['#a18cd1', '#fbc2eb'] },
]

const PALETTE = [
  ['#667eea', '#764ba2'], ['#f093fb', '#f5576c'], ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'], ['#fa709a', '#fee140'], ['#a18cd1', '#fbc2eb'],
  ['#fccb90', '#d57eeb'], ['#96fbc4', '#f9f586'],
]

const categories = ['Semua', 'Outdoor', 'Indoor', 'Garden', 'Beach', 'Ballroom']

// Ambil initials dari nama pasangan
function getInitials(name) {
  const parts = name.split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.slice(0, 2).toUpperCase() || '?'
}

// SVG ring icon untuk hiasan
const RingIcon = ({ size = 32, opacity = 0.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
    <circle cx="12" cy="12" r="4"/>
    <path d="M8 12 C8 12 6 9 8.5 7 C11 5 13 5 15.5 7 C18 9 16 12 16 12"/>
    <path d="M9 7 L7 3"/><path d="M15 7 L17 3"/>
    <line x1="6" y1="3" x2="18" y2="3"/>
  </svg>
)

const HeartIcon = ({ size = 28, opacity = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" style={{ opacity }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const empty = { couple: '', category: 'Outdoor', date: '', color: PALETTE[0] }

export default function Gallery() {
  const [photos, setPhotos]   = useState(initialPhotos)
  const [filter, setFilter]   = useState('Semua')
  const [modal, setModal]     = useState(null)   // null | 'add' | 'preview'
  const [selected, setSelected] = useState(null)
  const [form, setForm]       = useState(empty)
  const [deleteId, setDeleteId] = useState(null)

  const filtered = filter === 'Semua' ? photos : photos.filter(p => p.category === filter)

  const openAdd     = () => { setForm({ ...empty, color: PALETTE[photos.length % PALETTE.length] }); setModal('add') }
  const openPreview = (p) => { setSelected(p); setModal('preview') }
  const close       = () => { setModal(null); setSelected(null); setDeleteId(null) }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.couple.trim()) return
    setPhotos(prev => [...prev, { ...form, id: Date.now(), color: PALETTE[prev.length % PALETTE.length] }])
    close()
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const [focused, setFocused] = useState({})
  const fStyle = (key) => ({
    width: '100%', padding: '9px 12px', boxSizing: 'border-box',
    border: `1.5px solid ${focused[key] ? '#4f46e5' : '#dee2e6'}`,
    borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit'
  })

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Galeri</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Dokumentasi foto pernikahan klien</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(79,70,229,0.3)'
        }}>+ Upload Foto</button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '7px 16px', borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            border: filter === cat ? 'none' : '1px solid #e9ecef',
            background: filter === cat ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#fff',
            color: filter === cat ? '#fff' : '#495057', transition: 'all 0.15s'
          }}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.length === 0 && (
          <p style={{ color: '#adb5bd', fontSize: 14, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>Tidak ada foto</p>
        )}
        {filtered.map(p => {
          const [c1, c2] = p.color
          const initials = getInitials(p.couple)
          return (
            <div key={p.id} onClick={() => openPreview(p)} style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              aspectRatio: '4/3', position: 'relative',
              background: `linear-gradient(135deg, ${c1}, ${c2})`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {/* Decorative background shapes */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: 40, left: -15, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

              {/* Decorative icons */}
              <div style={{ position: 'absolute', top: 16, left: 16 }}><HeartIcon /></div>
              <div style={{ position: 'absolute', top: 14, right: 44 }}><RingIcon /></div>

              {/* Center initials */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(4px)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, color: '#fff',
                  letterSpacing: 1
                }}>{initials}</div>
              </div>

              {/* Bottom info */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
                padding: '20px 12px 10px',
              }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 2 }}>{p.couple}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{p.category} · {p.date}</p>
              </div>

              {/* Delete button */}
              <button onClick={e => handleDelete(p.id, e)} style={{
                position: 'absolute', top: 8, right: 8,
                background: 'rgba(0,0,0,0.35)', color: '#fff',
                border: 'none', borderRadius: '50%', width: 26, height: 26,
                cursor: 'pointer', fontSize: 11, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)', transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,49,49,0.8)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
              >✕</button>
            </div>
          )
        })}
      </div>

      <p style={{ marginTop: 14, fontSize: 12, color: '#adb5bd' }}>{filtered.length} foto ditampilkan</p>

      {/* Modal Tambah */}
      <Modal isOpen={modal === 'add'} onClose={close} title="Upload Foto"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleSave} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Simpan</button>
          </>
        }
      >
        <div style={{ marginBottom: 13 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>Nama Pasangan <span style={{ color: '#fa5252' }}>*</span></label>
          <input value={form.couple} onChange={set('couple')} placeholder="Contoh: Reza & Dina"
            style={fStyle('couple')}
            onFocus={() => setFocused(f => ({ ...f, couple: true }))}
            onBlur={() => setFocused(f => ({ ...f, couple: false }))}
          />
        </div>
        <div style={{ marginBottom: 13 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>Kategori</label>
          <select value={form.category} onChange={set('category')}
            style={fStyle('category')}
            onFocus={() => setFocused(f => ({ ...f, category: true }))}
            onBlur={() => setFocused(f => ({ ...f, category: false }))}
          >
            {categories.filter(c => c !== 'Semua').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 4 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>Tanggal</label>
          <input type="date" value={form.date} onChange={set('date')}
            style={fStyle('date')}
            onFocus={() => setFocused(f => ({ ...f, date: true }))}
            onBlur={() => setFocused(f => ({ ...f, date: false }))}
          />
        </div>
      </Modal>

      {/* Modal Preview */}
      <Modal isOpen={modal === 'preview'} onClose={close} title="Detail Foto"
        footer={
          <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>
        }
      >
        {selected && (() => {
          const [c1, c2] = selected.color
          const initials = getInitials(selected.couple)
          return (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%', aspectRatio: '16/9', borderRadius: 12,
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18, position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -10, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)',
                  border: '2px solid rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, fontWeight: 800, color: '#fff'
                }}>{initials}</div>
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{selected.couple}</p>
              <p style={{ fontSize: 13, color: '#868e96' }}>{selected.category} · {selected.date}</p>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
