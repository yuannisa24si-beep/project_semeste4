// src/pages/admin/Gallery.jsx
import { useState } from 'react'

const initialPhotos = [
  { id: 1, couple: 'Andhie & Yasmin', category: 'Outdoor', emoji: '👰', date: '12 Jun 2025' },
  { id: 2, couple: 'Budi & Sari', category: 'Indoor', emoji: '💑', date: '20 Jul 2025' },
  { id: 3, couple: 'Reza & Dina', category: 'Garden', emoji: '🤵', date: '5 Agu 2025' },
  { id: 4, couple: 'Andi & Putri', category: 'Beach', emoji: '💍', date: '18 Sep 2025' },
  { id: 5, couple: 'Hendra & Lia', category: 'Ballroom', emoji: '🌸', date: '2 Okt 2025' },
  { id: 6, couple: 'Fajar & Nisa', category: 'Outdoor', emoji: '🎊', date: '15 Nov 2025' },
]

const categories = ['Semua', 'Outdoor', 'Indoor', 'Garden', 'Beach', 'Ballroom']

export default function Gallery() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [filter, setFilter] = useState('Semua')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'Semua' ? photos : photos.filter(p => p.category === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
            Galeri
          </h1>
          <p style={{ fontSize: 14, color: '#666666' }}>Dokumentasi foto pernikahan klien</p>
        </div>
        <button style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 14,
          background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500
        }}>+ Upload Foto</button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '8px 16px', borderRadius: 50, fontSize: 14,
            border: '1px solid',
            borderColor: filter === cat ? '#0000ff' : '#d3d3d3',
            background: filter === cat ? '#e6e6ff' : '#fff',
            color: filter === cat ? '#0000ff' : '#666666',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500
          }}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filtered.map(p => (
          <div key={p.id} style={{
            background: 'linear-gradient(135deg, #0000ff, #0000cc)',
            borderRadius: 12, aspectRatio: '4/3',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            transition: 'transform 0.2s'
          }}
            onClick={() => setSelected(p)}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: 56 }}>{p.emoji}</span>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '12px', color: '#fff'
            }}>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{p.couple}</p>
              <p style={{ fontSize: 11, opacity: 0.85 }}>{p.category} · {p.date}</p>
            </div>
            <button onClick={e => {
              e.stopPropagation()
              setPhotos(prev => prev.filter(x => x.id !== p.id))
            }} style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(239,68,68,0.85)', color: '#fff',
              border: 'none', borderRadius: '50%', width: 28, height: 28,
              cursor: 'pointer', fontSize: 12, display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>✕</button>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 12, fontSize: 12, color: '#666666' }}>
        {filtered.length} foto ditampilkan
      </p>

      {/* Preview Modal */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setSelected(null)}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 32,
            width: '100%', maxWidth: 380, textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0000ff, #0000cc)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 56, margin: '0 auto 16px'
            }}>{selected.emoji}</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0000ff', marginBottom: 8 }}>
              {selected.couple}
            </h2>
            <p style={{ fontSize: 14, color: '#666666', marginBottom: 4 }}>📍 {selected.category}</p>
            <p style={{ fontSize: 14, color: '#666666', marginBottom: 20 }}>📅 {selected.date}</p>
            <button onClick={() => setSelected(null)} style={{
              width: '100%', padding: '12px', borderRadius: 8,
              background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500
            }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}