// src/pages/admin/Feedback.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const STARS = [1, 2, 3, 4, 5]

function StarDisplay({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {STARS.map(s => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? '#f59e0b' : '#e9ecef'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.slice(0, 2).toUpperCase() || '?'
}

const avatarColors = [
  ['#eef2ff', '#4f46e5'], ['#fdf2f8', '#9d174d'],
  ['#f0fdf4', '#166534'], ['#fff7ed', '#9a3412'], ['#f0f9ff', '#075985'],
]
function getAvatarColor(str) {
  return avatarColors[(str?.charCodeAt(0) || 0) % avatarColors.length]
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('Semua')
  const [search, setSearch]       = useState('')
  const [selected, setSelected]   = useState(null)

  useEffect(() => { fetchFeedbacks() }, [])

  const fetchFeedbacks = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false })
    setFeedbacks(data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('feedbacks').delete().eq('id', id)
    setFeedbacks(prev => prev.filter(f => f.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = feedbacks.filter(f => {
    const matchRating = filter === 'Semua' || String(f.rating) === filter
    const matchSearch = (f.user_name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (f.service_name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (f.message || '').toLowerCase().includes(search.toLowerCase())
    return matchRating && matchSearch
  })

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((a, b) => a + (b.rating || 0), 0) / feedbacks.length).toFixed(1)
    : '0.0'

  const ratingDist = STARS.map(s => ({
    star: s,
    count: feedbacks.filter(f => f.rating === s).length,
  }))

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Feedback</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Ulasan dari member tentang layanan</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '12px 20px', border: '1px solid #e9ecef', textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>{avgRating}</p>
          <StarDisplay rating={Math.round(parseFloat(avgRating))} />
          <p style={{ fontSize: 11, color: '#868e96', marginTop: 4 }}>{feedbacks.length} ulasan</p>
        </div>
      </div>

      {/* Stats rating distribution */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e9ecef', marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', marginBottom: 12 }}>Distribusi Rating</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ratingDist.slice().reverse().map(({ star, count }) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12, color: '#495057', width: 40, flexShrink: 0 }}>{star} ⭐</span>
              <div style={{ flex: 1, background: '#f1f3f5', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${feedbacks.length ? (count / feedbacks.length) * 100 : 0}%`, background: '#f59e0b', height: '100%', borderRadius: 4, transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: 12, color: '#868e96', width: 28, textAlign: 'right', flexShrink: 0 }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Cari nama / layanan..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: 220, padding: '8px 12px 8px 32px', border: '1px solid #e9ecef', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'} onBlur={e => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Semua', '5', '4', '3', '2', '1'].map(v => (
            <button key={v} onClick={() => setFilter(v)} style={{ padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: filter === v ? 'none' : '1px solid #e9ecef', background: filter === v ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#fff', color: filter === v ? '#fff' : '#495057' }}>
              {v === 'Semua' ? 'Semua' : `${v} ⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#adb5bd' }}>Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#adb5bd', background: '#fff', borderRadius: 12, border: '1px solid #e9ecef' }}>
          <p style={{ fontSize: 15, fontWeight: 600 }}>Belum ada feedback</p>
          <p style={{ fontSize: 13 }}>Feedback dari member akan muncul di sini</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.map(fb => {
            const [bg, fg] = getAvatarColor(fb.user_name || fb.user_email || 'A')
            const dt = fb.created_at ? new Date(fb.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
            return (
              <div key={fb.id} onClick={() => setSelected(fb)} style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid #e9ecef', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#c5c8ff' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e9ecef' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                      {getInitials(fb.user_name || fb.user_email)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2 }}>{fb.user_name || fb.user_email || 'Anonim'}</p>
                      <p style={{ fontSize: 11, color: '#868e96' }}>{dt}</p>
                    </div>
                  </div>
                  <StarDisplay rating={fb.rating} />
                </div>
                {fb.service_name && (
                  <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4f46e5', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, marginBottom: 8 }}>
                    {fb.service_name}
                  </span>
                )}
                <p style={{ fontSize: 13, color: '#495057', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{fb.message}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button onClick={e => { e.stopPropagation(); handleDelete(fb.id) }} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, background: '#fff5f5', color: '#e03131', border: '1px solid #ffe3e3', cursor: 'pointer' }}>Hapus</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Detail */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,30,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>Detail Feedback</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#adb5bd' }}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              {(() => { const [bg, fg] = getAvatarColor(selected.user_name || 'A'); return (
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                  {getInitials(selected.user_name || selected.user_email)}
                </div>
              )})()}
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{selected.user_name || selected.user_email || 'Anonim'}</p>
                <p style={{ fontSize: 12, color: '#868e96' }}>{selected.user_email}</p>
              </div>
            </div>
            <StarDisplay rating={selected.rating} />
            {selected.service_name && (
              <p style={{ fontSize: 12, color: '#4f46e5', fontWeight: 600, marginTop: 8 }}>Layanan: {selected.service_name}</p>
            )}
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '14px 16px', marginTop: 14 }}>
              <p style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.7 }}>"{selected.message}"</p>
            </div>
            <p style={{ fontSize: 11, color: '#adb5bd', marginTop: 10 }}>
              {selected.created_at ? new Date(selected.created_at).toLocaleString('id-ID') : ''}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <button onClick={() => handleDelete(selected.id)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#fff5f5', color: '#e03131', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Hapus Feedback</button>
              <button onClick={() => setSelected(null)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
