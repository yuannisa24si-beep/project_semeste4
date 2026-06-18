// src/pages/guest/GuestDashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const statusStyle = {
  'Confirmed':   { bg: '#d1fae5', color: '#065f46' },
  'Pending':     { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#eef2ff', color: '#3730a3' },
  'Done':        { bg: '#f0fdf4', color: '#166534' },
  'Cancelled':   { bg: '#fff1f2', color: '#be123c' },
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
function getAvatarColor(name) {
  return avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length]
}

export default function GuestDashboard() {
  const [bookings, setBookings] = useState([])
  const [profile, setProfile]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile({ ...prof, email: user.email })

      const { data: bk } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setBookings(bk || [])
      setLoading(false)
    }
    load()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #eef2ff', borderTop: '3px solid #4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
        <p style={{ color: '#868e96', fontSize: 14 }}>Memuat data...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Navbar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e9ecef', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: 'Georgia,serif' }}>W</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>Wedding Organizer</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
              {getInitials(profile?.full_name || profile?.email || 'G')}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2 }}>{profile?.full_name || 'Guest'}</p>
              <p style={{ fontSize: 11, color: '#868e96', lineHeight: 1.2 }}>{profile?.email}</p>
            </div>
          </div>
          <span style={{ background: '#eef2ff', color: '#4f46e5', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>Guest</span>
          <button onClick={handleLogout} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: '1px solid #e9ecef', background: '#fff', color: '#868e96', cursor: 'pointer' }}>Keluar</button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>
            Halo, {profile?.full_name || 'Guest'} 👋
          </h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Berikut pesanan pernikahan kamu</p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Total Pesanan', value: bookings.length },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length },
            { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length },
            { label: 'Total Biaya', value: fmt(bookings.reduce((a, b) => a + (b.amount || 0), 0)) },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', border: '1px solid #e9ecef' }}>
              <p style={{ fontSize: 12, color: '#868e96', marginBottom: 6, fontWeight: 500 }}>{s.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Booking Cards */}
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#adb5bd' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 12, opacity: 0.4 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <p style={{ fontSize: 15, fontWeight: 500 }}>Belum ada pesanan</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Hubungi admin untuk membuat pesanan</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {bookings.map(b => {
              const st = statusStyle[b.status] || { bg: '#f1f3f5', color: '#495057' }
              return (
                <div key={b.id} onClick={() => setSelected(b)} style={{
                  background: '#fff', borderRadius: 14, padding: 20,
                  border: '1px solid #e9ecef', cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                      {getInitials(b.name)}
                    </div>
                    <span style={{ background: st.bg, color: st.color, padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{b.name}</p>
                  <p style={{ fontSize: 12, color: '#868e96', marginBottom: 12 }}>{b.service}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: '#495057', marginBottom: 14 }}>
                    <span>📅 {b.date}</span>
                    <span>📞 {b.phone}</span>
                  </div>
                  <div style={{ paddingTop: 12, borderTop: '1px solid #f1f3f5' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#4f46e5' }}>{fmt(b.amount)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Modal detail */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,30,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, backdropFilter: 'blur(2px)' }}
          onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e' }}>{selected.name}</h3>
              <span style={{ background: (statusStyle[selected.status] || {}).bg, color: (statusStyle[selected.status] || {}).color, padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{selected.status}</span>
            </div>
            {[['Layanan', selected.service], ['Tanggal', selected.date], ['Telepon', selected.phone], ['Total', fmt(selected.amount)]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f3f5', fontSize: 13 }}>
                <span style={{ color: '#868e96' }}>{l}</span>
                <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setSelected(null)} style={{ marginTop: 18, width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}
