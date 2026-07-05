// src/pages/guest/GuestDashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

// Foto Unsplash per layanan — otomatis tanpa API key
const SERVICE_IMG_MAP = {
  'Fotografi Pernikahan':     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80',
  'Videografi Sinematik':     'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80',
  'Dekorasi Pelaminan':       'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80',
  'Dekorasi Venue Lengkap':   'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80',
  'Catering 100 Porsi':       'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80',
  'Catering 200 Porsi':       'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
  'MC Profesional':           'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
  'Live Band 4 Jam':          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80',
  'Wedding Organizer Penuh':  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=80',
  'Gaun Pengantin':           'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=500&q=80',
  'Rias Pengantin':           'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&q=80',
  'Undangan Digital':         'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&q=80',
  'Sewa Gedung Half Day':     'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=500&q=80',
  'Dokumentasi Pre-Wedding':  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&q=80',
}
const DEFAULT_SVC_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80'

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

const TIERS = [
  { id: 'silver',   name: 'Silver',   minAmount: 0,       color: '#9ca3af', bg: '#f3f4f6', textColor: '#374151', label: 'Rp 0 – Rp 999.999',              discount: 5,  benefits: ['Diskon Layanan 5%', 'Akses Galeri Eksklusif'] },
  { id: 'gold',     name: 'Gold',     minAmount: 1000000, color: '#f59e0b', bg: '#fef3c7', textColor: '#92400e', label: 'Rp 1.000.000 – Rp 4.999.999',    discount: 10, benefits: ['Diskon Layanan 10%', 'Prioritas Pemesanan', 'Akses Galeri Eksklusif'] },
  { id: 'platinum', name: 'Platinum', minAmount: 5000000, color: '#7c3aed', bg: '#ede9fe', textColor: '#4c1d95', label: '> Rp 5.000.000',                  discount: 15, benefits: ['Diskon Layanan 15%', 'Prioritas Pemesanan', 'Konsultasi Gratis', 'Akses Galeri Eksklusif'] },
]

const WEDDING_PACKAGES = [
  {
    id: 'basic', icon: '💍', name: 'Basic Package', popular: false,
    price: 8000000,
    desc: 'Paket dasar untuk pernikahan sederhana & intim, cocok untuk 50–80 tamu',
    features: ['Dekorasi pelaminan simpel', 'Fotografer 4 jam', 'MC profesional', 'Dokumentasi foto 100 edited'],
  },
  {
    id: 'silver', icon: '🥈', name: 'Silver Package', popular: false,
    price: 18000000,
    desc: 'Paket lengkap untuk pernikahan menengah, ideal untuk 100–150 tamu',
    features: ['Dekorasi venue & pelaminan', 'Foto + video 8 jam', 'Catering 100 porsi', 'MC + entertainment', 'Undangan digital'],
  },
  {
    id: 'gold', icon: '🥇', name: 'Gold Package', popular: true,
    price: 32000000,
    desc: 'Paket premium paling populer, untuk pernikahan berkesan 200 tamu',
    features: ['Dekorasi mewah bunga segar', 'Foto & video sinematik', 'Catering 200 porsi', 'Live band 4 jam', 'Koordinator H-1 & hari H', 'Gaun pengantin sewa'],
  },
  {
    id: 'platinum', icon: '💎', name: 'Platinum Package', popular: false,
    price: 55000000,
    desc: 'All-inclusive mewah untuk pernikahan impian 300+ tamu tanpa kompromi',
    features: ['Dekorasi & bunga premium', 'Foto + video full day + drone', 'Catering 300+ porsi', 'Live band + entertainment', 'Tim koordinator lengkap', 'Gaun + rias pengantin', 'Pre-wedding session', 'Honeymoon transport'],
  },
]

function getTier(totalAmount) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (totalAmount >= TIERS[i].minAmount) return TIERS[i]
  }
  return TIERS[0]
}

const IcCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IcStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button"
          onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={s <= (hovered || value) ? '#f59e0b' : '#e9ecef'} stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

function StarDisplay({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= rating ? '#f59e0b' : '#e9ecef'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function GuestDashboard() {
  const [bookings, setBookings]           = useState([])
  const [profile, setProfile]             = useState(null)
  const [services, setServices]           = useState([])
  const [feedbacks, setFeedbacks]         = useState([])
  const [loading, setLoading]             = useState(true)
  const [selected, setSelected]           = useState(null)
  const [editForm, setEditForm]           = useState({ full_name: '', phone: '', wedding_date: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [activeTab, setActiveTab]         = useState('pesanan')

  // Booking form state
  const [bookModal, setBookModal]         = useState(null) // service object
  const [bookForm, setBookForm]           = useState({ date: '', phone: '' })
  const [bookSaving, setBookSaving]       = useState(false)
  const [bookSuccess, setBookSuccess]     = useState(false)

  // Feedback form state
  const [fbForm, setFbForm]               = useState({ service_name: '', rating: 5, message: '' })
  const [fbSaving, setFbSaving]           = useState(false)
  const [fbSuccess, setFbSuccess]         = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }

      const [profRes, bkRes, svcRes, fbRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('services').select('*').eq('status', 'Aktif').order('created_at', { ascending: true }),
        supabase.from('feedbacks').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ])

      const p = { ...(profRes.data || {}), email: user.email }
      setProfile(p)
      setEditForm({ full_name: p.full_name || '', phone: p.phone || '', wedding_date: p.wedding_date || '' })
      setBookings(bkRes.data || [])
      setServices(svcRes.data || [])
      setFeedbacks(fbRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/login') }

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    await supabase.from('profiles').update({ full_name: editForm.full_name, phone: editForm.phone, wedding_date: editForm.wedding_date }).eq('id', profile.id)
    setProfile(p => ({ ...p, ...editForm }))
    setSavingProfile(false)
  }

  const totalBookingAmount = bookings.reduce((a, b) => a + (b.amount || 0), 0)
  const currentTier = getTier(totalBookingAmount)

  // Harga layanan setelah diskon tier member + diskon service itu sendiri
  const getPriceAfterDiscount = (service) => {
    const serviceDiscount = service.discount || 0
    const priceAfterServiceDisc = service.price * (1 - serviceDiscount / 100)
    const tierDiscount = currentTier.discount || 0
    return priceAfterServiceDisc * (1 - tierDiscount / 100)
  }

  const handleBook = async () => {
    if (!bookForm.date || !bookModal) return
    setBookSaving(true)
    const finalPrice = Math.round(getPriceAfterDiscount(bookModal))
    const payload = {
      name: profile.full_name || profile.email,
      phone: bookForm.phone || profile.phone || '',
      date: bookForm.date,
      service: bookModal.name,
      status: 'Pending',
      amount: finalPrice,
      user_id: profile.id,
    }
    await supabase.from('bookings').insert([payload])
    // Refresh bookings
    const { data } = await supabase.from('bookings').select('*').eq('user_id', profile.id).order('created_at', { ascending: false })
    setBookings(data || [])
    setBookSaving(false)
    setBookModal(null)
    setBookForm({ date: '', phone: '' })
    setBookSuccess(true)
    setTimeout(() => setBookSuccess(false), 3000)
  }

  const handleSubmitFeedback = async (e) => {
    e.preventDefault()
    if (!fbForm.message.trim()) return
    setFbSaving(true)
    const payload = {
      user_id: profile.id,
      user_name: profile.full_name || '',
      user_email: profile.email || '',
      service_name: fbForm.service_name,
      rating: fbForm.rating,
      message: fbForm.message,
    }
    const { data } = await supabase.from('feedbacks').insert([payload]).select().single()
    if (data) setFeedbacks(prev => [data, ...prev])
    setFbForm({ service_name: '', rating: 5, message: '' })
    setFbSaving(false)
    setFbSuccess(true)
    setTimeout(() => setFbSuccess(false), 3000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #eef2ff', borderTop: '3px solid #7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
        <p style={{ color: '#868e96', fontSize: 14 }}>Memuat data...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter,sans-serif' }}>
      {/* Navbar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e9ecef', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: 'Georgia,serif' }}>W</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>Wedding Organizer</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
              {getInitials(profile?.full_name || profile?.email || 'G')}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2 }}>{profile?.full_name || 'Member'}</p>
              <p style={{ fontSize: 11, color: '#868e96', lineHeight: 1.2 }}>{profile?.email}</p>
            </div>
          </div>
          <span style={{ background: currentTier.bg, color: currentTier.textColor, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, border: `1px solid ${currentTier.color}44` }}>
            Member · {currentTier.name}
          </span>
          <button onClick={handleLogout} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: '1px solid #e9ecef', background: '#fff', color: '#868e96', cursor: 'pointer' }}>Keluar</button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63)', padding: '36px 24px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 20, fontWeight: 800, color: '#fff' }}>
          {getInitials(profile?.full_name || profile?.email || 'G')}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Halo, {profile?.full_name || 'Member'}!</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>{profile?.email}</p>
        {profile?.wedding_date && <p style={{ fontSize: 12, color: '#a78bfa', marginBottom: 10 }}>Hari Pernikahan: {profile.wedding_date}</p>}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${currentTier.color}33`, border: `1px solid ${currentTier.color}66`, color: currentTier.color === '#9ca3af' ? '#e5e7eb' : currentTier.color, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 50 }}>
          <IcStar /> Tier {currentTier.name} · Diskon {currentTier.discount}% untuk semua layanan
        </div>
      </div>

      {/* Success toast */}
      {bookSuccess && (
        <div style={{ position: 'fixed', top: 80, right: 24, background: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '12px 20px', fontSize: 13, fontWeight: 600, color: '#065f46', zIndex: 1000, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
          ✅ Pesanan berhasil! Menunggu konfirmasi admin.
        </div>
      )}
      {fbSuccess && (
        <div style={{ position: 'fixed', top: 80, right: 24, background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 10, padding: '12px 20px', fontSize: 13, fontWeight: 600, color: '#92400e', zIndex: 1000, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
          ⭐ Terima kasih atas feedback kamu!
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9ecef', padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {[['pesanan','Pesanan Saya'], ['layanan','Layanan & Promo'], ['membership','Membership'], ['feedback','Feedback'], ['profil','Edit Profil']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '14px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'inherit', whiteSpace: 'nowrap', color: activeTab === tab ? '#7c3aed' : '#868e96', borderBottom: activeTab === tab ? '2px solid #7c3aed' : '2px solid transparent', transition: 'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px' }}>

        {/* ── TAB: PESANAN ── */}
        {activeTab === 'pesanan' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Total Pesanan', value: bookings.length },
                { label: 'Confirmed',     value: bookings.filter(b => b.status === 'Confirmed').length },
                { label: 'Pending',       value: bookings.filter(b => b.status === 'Pending').length },
                { label: 'Total Biaya',   value: fmt(totalBookingAmount) },
              ].map((s,i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #e9ecef' }}>
                  <p style={{ fontSize: 11, color: '#868e96', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#7c3aed' }}>{s.value}</p>
                </div>
              ))}
            </div>
            {bookings.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 14, padding: '48px 24px', textAlign: 'center', border: '1px solid #e9ecef' }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#495057', marginBottom: 6 }}>Belum ada pesanan</p>
                <p style={{ fontSize: 13, color: '#adb5bd', marginBottom: 16 }}>Pesan layanan di tab "Layanan & Promo"</p>
                <button onClick={() => setActiveTab('layanan')} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Lihat Layanan →
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
                {bookings.map(b => {
                  const st = statusStyle[b.status] || { bg: '#f1f3f5', color: '#495057' }
                  return (
                    <div key={b.id} onClick={() => setSelected(b)} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #e9ecef', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#eef2ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>
                          {getInitials(b.name)}
                        </div>
                        <span style={{ background: st.bg, color: st.color, padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>{b.name}</p>
                      <p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>{b.service}</p>
                      <p style={{ fontSize: 11, color: '#adb5bd' }}>Tanggal: {b.date}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#7c3aed', marginTop: 10, paddingTop: 10, borderTop: '1px solid #f1f3f5' }}>{fmt(b.amount)}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: LAYANAN & PROMO ── */}
        {activeTab === 'layanan' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Layanan & Promo</h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${currentTier.color}22`, border: `1px solid ${currentTier.color}55`, color: currentTier.textColor, fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 50 }}>
                <IcStar /> Tier {currentTier.name}: kamu mendapat diskon tambahan {currentTier.discount}% untuk semua layanan!
              </div>
            </div>

            {services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#adb5bd' }}>Belum ada layanan tersedia</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
                {services.map(svc => {
                  const serviceDisc = svc.discount || 0
                  const priceAfterServiceDisc = svc.price * (1 - serviceDisc / 100)
                  const tierDisc = currentTier.discount || 0
                  const finalPrice = Math.round(priceAfterServiceDisc * (1 - tierDisc / 100))
                  const totalDiscPercent = 100 - Math.round((finalPrice / svc.price) * 100)
                  const imgSrc = svc.image_url || SERVICE_IMG_MAP[svc.name] || DEFAULT_SVC_IMG

                  return (
                    <div key={svc.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e9ecef', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.transform='translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)' }}
                    >
                      {/* Foto */}
                      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                        <img src={imgSrc} alt={svc.name}
                          onError={e => { e.currentTarget.src = DEFAULT_SVC_IMG }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Overlay gradient */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                        {/* Promo badge */}
                        {totalDiscPercent > 0 && (
                          <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                            {svc.promo_label || `HEMAT ${totalDiscPercent}%`}
                          </div>
                        )}
                        {/* Harga di atas foto */}
                        <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14 }}>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{svc.name}</h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div style={{ padding: '14px 16px' }}>
                        <p style={{ fontSize: 12, color: '#868e96', lineHeight: 1.5, marginBottom: 12, minHeight: 36 }}>{svc.description}</p>

                        {/* Breakdown harga */}
                        <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#868e96', marginBottom: 3 }}>
                            <span>Harga normal</span>
                            <span style={{ textDecoration: totalDiscPercent > 0 ? 'line-through' : 'none' }}>{fmt(svc.price)}</span>
                          </div>
                          {serviceDisc > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#ef4444', marginBottom: 3 }}>
                              <span>Promo -{serviceDisc}%</span>
                              <span>-{fmt(svc.price - priceAfterServiceDisc)}</span>
                            </div>
                          )}
                          {tierDisc > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: currentTier.textColor, marginBottom: 3 }}>
                              <span>Tier {currentTier.name} -{tierDisc}%</span>
                              <span>-{fmt(priceAfterServiceDisc - finalPrice)}</span>
                            </div>
                          )}
                          <div style={{ borderTop: '1px solid #e9ecef', marginTop: 6, paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>Total Bayar</span>
                            <span style={{ fontSize: 16, fontWeight: 900, color: '#4f46e5' }}>{fmt(finalPrice)}</span>
                          </div>
                        </div>

                        <button onClick={() => { setBookModal(svc); setBookForm({ date: '', phone: profile?.phone || '' }) }}
                          style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
                          Pesan Sekarang →
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: MEMBERSHIP ── */}
        {activeTab === 'membership' && (
          <div>
            {/* Tier otomatis */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Status Keanggotaan</h2>
            <p style={{ fontSize: 13, color: '#868e96', marginBottom: 18 }}>Tier naik otomatis dari total pesanan. Semakin tinggi tier, semakin besar diskon!</p>
            <div style={{ background: `linear-gradient(135deg,${currentTier.color},${currentTier.color}bb)`, borderRadius: 16, padding: '20px 24px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 2 }}>Tier Kamu Saat Ini</p>
                <p style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{currentTier.id === 'silver' ? '🥈' : currentTier.id === 'gold' ? '🥇' : '💎'} {currentTier.name}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Total pesanan: {fmt(totalBookingAmount)}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{currentTier.discount}%</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>diskon semua layanan</p>
              </div>
            </div>
            {currentTier.id !== 'platinum' && (() => {
              const nextTier = TIERS[TIERS.findIndex(t => t.id === currentTier.id) + 1]
              const progress = Math.min((totalBookingAmount / nextTier.minAmount) * 100, 100)
              return (
                <div style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid #e9ecef', marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#495057' }}>Progress ke Tier {nextTier.name}</span>
                    <span style={{ fontSize: 12, color: '#868e96' }}>kurang {fmt(nextTier.minAmount - totalBookingAmount)}</span>
                  </div>
                  <div style={{ background: '#f1f3f5', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, background: `linear-gradient(90deg,${currentTier.color},${nextTier.color})`, height: '100%', borderRadius: 6 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#adb5bd', marginTop: 5 }}>Naik ke {nextTier.name} → dapat diskon {nextTier.discount}%!</p>
                </div>
              )
            })()}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 36 }}>
              {TIERS.map(tier => {
                const isActive = currentTier.id === tier.id
                const isPassed = TIERS.findIndex(t => t.id === tier.id) < TIERS.findIndex(t => t.id === currentTier.id)
                return (
                  <div key={tier.id} style={{ background: '#fff', borderRadius: 12, padding: 16, border: `2px solid ${isActive ? tier.color : isPassed ? tier.color + '88' : '#e9ecef'}`, position: 'relative', opacity: isActive || isPassed ? 1 : 0.55 }}>
                    {isActive && <div style={{ position: 'absolute', top: -1, right: 10, background: tier.color, color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: '0 0 6px 6px' }}>TIER KAMU ✓</div>}
                    {isPassed && <div style={{ position: 'absolute', top: -1, right: 10, background: '#10b981', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: '0 0 6px 6px' }}>DICAPAI ✓</div>}
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{tier.id === 'silver' ? '🥈' : tier.id === 'gold' ? '🥇' : '💎'}</div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e', marginBottom: 2 }}>{tier.name}</p>
                    <div style={{ background: tier.bg, borderRadius: 6, padding: '4px 8px', marginBottom: 8, display: 'inline-block' }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: tier.textColor }}>{tier.discount}% diskon</span>
                    </div>
                    {tier.benefits.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontSize: 11, color: '#495057', marginBottom: 3 }}>
                        <span style={{ color: tier.color, flexShrink: 0 }}><IcCheck /></span>{b}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            {/* Pilih Paket Pernikahan */}
            <div style={{ borderTop: '2px solid #f1f3f5', paddingTop: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Pilih Paket Pernikahan</h2>
              <p style={{ fontSize: 13, color: '#868e96', marginBottom: 20 }}>
                Harga sudah termasuk diskon tier <strong style={{ color: currentTier.textColor }}>{currentTier.name} ({currentTier.discount}%)</strong> kamu.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 16 }}>
                {WEDDING_PACKAGES.map(pkg => {
                  const isSelected = profile?.selected_package === pkg.id
                  const discPrice = Math.round(pkg.price * (1 - currentTier.discount / 100))
                  return (
                    <div key={pkg.id} style={{ background: '#fff', borderRadius: 16, padding: 22, border: `2px solid ${isSelected ? '#7c3aed' : '#e9ecef'}`, position: 'relative', transition: 'all 0.2s', boxShadow: isSelected ? '0 8px 28px rgba(124,58,237,0.15)' : 'none' }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = '#c5c8ff' }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = '#e9ecef' }}
                    >
                      {isSelected && <div style={{ position: 'absolute', top: -1, right: 14, background: '#7c3aed', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: '0 0 8px 8px' }}>PAKET AKTIF ✓</div>}
                      {pkg.popular && !isSelected && <div style={{ position: 'absolute', top: -1, right: 14, background: '#f59e0b', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: '0 0 8px 8px' }}>TERPOPULER</div>}
                      <div style={{ fontSize: 26, marginBottom: 8 }}>{pkg.icon}</div>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{pkg.name}</h3>
                      <p style={{ fontSize: 12, color: '#868e96', marginBottom: 12, lineHeight: 1.5 }}>{pkg.desc}</p>
                      <div style={{ marginBottom: 14 }}>
                        {currentTier.discount > 0 && (
                          <span style={{ fontSize: 11, color: '#adb5bd', textDecoration: 'line-through', display: 'block' }}>{fmt(pkg.price)}</span>
                        )}
                        <span style={{ fontSize: 20, fontWeight: 900, color: '#4f46e5' }}>{fmt(discPrice)}</span>
                        {currentTier.discount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginLeft: 6 }}>Hemat {currentTier.discount}%</span>}
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        {pkg.features.map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#495057', marginBottom: 4 }}>
                            <span style={{ color: '#7c3aed', flexShrink: 0, marginTop: 1 }}><IcCheck /></span>{f}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={async () => {
                          await supabase.from('profiles').update({ selected_package: pkg.id }).eq('id', profile.id)
                          setProfile(p => ({ ...p, selected_package: pkg.id }))
                        }}
                        disabled={isSelected}
                        style={{ width: '100%', padding: '10px', borderRadius: 10, border: isSelected ? 'none' : '2px solid #7c3aed', background: isSelected ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'transparent', color: isSelected ? '#fff' : '#7c3aed', fontSize: 13, fontWeight: 700, cursor: isSelected ? 'default' : 'pointer', fontFamily: 'inherit' }}>
                        {isSelected ? '✓ Paket Dipilih' : 'Pilih Paket Ini'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: FEEDBACK ── */}
        {activeTab === 'feedback' && (
          <div>
            {/* Header section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Feedback & Ulasan</h2>
                <p style={{ fontSize: 13, color: '#868e96' }}>Bagikan pengalamanmu menggunakan layanan kami</p>
              </div>
              {feedbacks.length > 0 && (
                <div style={{ background: 'linear-gradient(135deg,#f59e0b22,#f59e0b11)', border: '1px solid #f59e0b44', borderRadius: 12, padding: '10px 18px', textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>
                    {(feedbacks.reduce((a, b) => a + (b.rating || 0), 0) / feedbacks.length).toFixed(1)}
                  </p>
                  <StarDisplay rating={Math.round(feedbacks.reduce((a, b) => a + (b.rating || 0), 0) / feedbacks.length)} />
                  <p style={{ fontSize: 10, color: '#868e96', marginTop: 3 }}>{feedbacks.length} ulasan</p>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Kolom kiri: Form */}
              <div>
                <div style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63)', borderRadius: 16, padding: 24, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✍️</div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 1 }}>Tulis Ulasan</h3>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Pendapatmu sangat berarti bagi kami</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Layanan yang diulas</label>
                      <select value={fbForm.service_name} onChange={e => setFbForm(f => ({ ...f, service_name: e.target.value }))}
                        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: 'rgba(255,255,255,0.1)', color: '#fff', boxSizing: 'border-box' }}>
                        <option value="" style={{ background: '#1a1a2e' }}>-- Pilih layanan --</option>
                        {services.map(s => <option key={s.id} value={s.name} style={{ background: '#1a1a2e' }}>{s.name}</option>)}
                        <option value="Umum" style={{ background: '#1a1a2e' }}>Umum / Keseluruhan</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Rating</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[1,2,3,4,5].map(s => (
                          <button key={s} type="button" onClick={() => setFbForm(f => ({ ...f, rating: s }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 28, transition: 'transform 0.1s', transform: s <= fbForm.rating ? 'scale(1.1)' : 'scale(1)' }}>
                            {s <= fbForm.rating ? '⭐' : '☆'}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                        {fbForm.rating === 5 ? 'Luar biasa!' : fbForm.rating === 4 ? 'Sangat baik' : fbForm.rating === 3 ? 'Cukup baik' : fbForm.rating === 2 ? 'Kurang memuaskan' : 'Mengecewakan'}
                      </p>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                        Ceritakan pengalamanmu <span style={{ color: '#f59e0b' }}>*</span>
                      </label>
                      <textarea required value={fbForm.message} onChange={e => setFbForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Bagaimana layanan kami? Apa yang kamu suka?"
                        rows={4}
                        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                      />
                    </div>
                    <button type="submit" disabled={fbSaving}
                      style={{ padding: '12px', borderRadius: 10, border: 'none', background: fbSaving ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: fbSaving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: fbSaving ? 'none' : '0 4px 14px rgba(245,158,11,0.4)' }}>
                      {fbSaving ? '⏳ Mengirim...' : '⭐ Kirim Ulasan'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Kolom kanan: Riwayat */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 14 }}>
                  Ulasan Saya ({feedbacks.length})
                </h3>
                {feedbacks.length === 0 ? (
                  <div style={{ background: '#fff', borderRadius: 14, padding: '40px 20px', textAlign: 'center', border: '2px dashed #e9ecef' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#495057', marginBottom: 4 }}>Belum ada ulasan</p>
                    <p style={{ fontSize: 12, color: '#adb5bd' }}>Tulis ulasan pertamamu di sebelah kiri!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 440, overflowY: 'auto', paddingRight: 4 }}>
                    {feedbacks.map(fb => {
                      const starLabel = ['','Mengecewakan','Kurang','Cukup','Sangat Baik','Luar Biasa'][fb.rating] || ''
                      return (
                        <div key={fb.id} style={{ background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #e9ecef', transition: 'all 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.07)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <div>
                              <div style={{ display: 'flex', gap: 1, marginBottom: 3 }}>
                                {[1,2,3,4,5].map(s => (
                                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= fb.rating ? '#f59e0b' : '#e9ecef'} stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                  </svg>
                                ))}
                                <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 700, marginLeft: 4 }}>{starLabel}</span>
                              </div>
                              {fb.service_name && (
                                <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4f46e5', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>
                                  {fb.service_name}
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: 10, color: '#adb5bd', flexShrink: 0, marginLeft: 8 }}>
                              {fb.created_at ? new Date(fb.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : ''}
                            </span>
                          </div>
                          <p style={{ fontSize: 12, color: '#495057', lineHeight: 1.65, fontStyle: 'italic' }}>
                            "{fb.message}"
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: PROFIL ── */}
        {activeTab === 'profil' && (
          <div style={{ maxWidth: 480 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Edit Profil</h2>
              <p style={{ fontSize: 13, color: '#868e96' }}>Perbarui informasi diri kamu</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e9ecef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #f1f3f5' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#fff' }}>
                  {getInitials(editForm.full_name || profile?.email || 'G')}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{editForm.full_name || 'Member'}</p>
                  <p style={{ fontSize: 12, color: '#868e96' }}>{profile?.email}</p>
                  <span style={{ background: currentTier.bg, color: currentTier.textColor, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50, marginTop: 4, display: 'inline-block' }}>Tier {currentTier.name}</span>
                </div>
              </div>
              {[
                { label: 'Nama Lengkap', key: 'full_name', type: 'text', placeholder: 'Nama kamu' },
                { label: 'Nomor HP', key: 'phone', type: 'tel', placeholder: '0812-xxxx-xxxx' },
                { label: 'Tanggal Pernikahan', key: 'wedding_date', type: 'date', placeholder: '' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={lbl}>{label}</label>
                  <input type={type} value={editForm[key]} placeholder={placeholder}
                    onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', boxSizing: 'border-box', border: '1.5px solid #dee2e6', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor='#7c3aed'} onBlur={e => e.target.style.borderColor='#dee2e6'}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 18 }}>
                <label style={lbl}>Email</label>
                <input value={profile?.email || ''} disabled style={{ width: '100%', padding: '10px 14px', boxSizing: 'border-box', border: '1.5px solid #dee2e6', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', background: '#f8f9fa', color: '#adb5bd' }} />
                <p style={{ fontSize: 11, color: '#adb5bd', marginTop: 4 }}>Email tidak dapat diubah</p>
              </div>
              <button onClick={handleSaveProfile} disabled={savingProfile} style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: savingProfile ? '#c4b5fd' : 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: savingProfile ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                {savingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal Pesan Layanan */}
      {bookModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, backdropFilter: 'blur(2px)' }} onClick={() => setBookModal(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e' }}>Pesan Layanan</h3>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '12px 14px', marginBottom: 18 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{bookModal.name}</p>
              <p style={{ fontSize: 13, color: '#4f46e5', fontWeight: 700 }}>{fmt(Math.round(getPriceAfterDiscount(bookModal)))}</p>
              {(bookModal.discount > 0 || currentTier.discount > 0) && (
                <p style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>Harga sudah termasuk diskon promo + tier {currentTier.name}</p>
              )}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Tanggal Pernikahan <span style={{ color: '#fa5252' }}>*</span></label>
              <input type="date" value={bookForm.date} onChange={e => setBookForm(f => ({ ...f, date: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor='#7c3aed'} onBlur={e => e.target.style.borderColor='#dee2e6'}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Nomor HP</label>
              <input type="tel" value={bookForm.phone} onChange={e => setBookForm(f => ({ ...f, phone: e.target.value }))} placeholder="0812-xxxx-xxxx"
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor='#7c3aed'} onBlur={e => e.target.style.borderColor='#dee2e6'}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setBookModal(null)} style={{ flex: 1, padding: '11px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
              <button onClick={handleBook} disabled={bookSaving || !bookForm.date} style={{ flex: 2, padding: '11px', borderRadius: 8, border: 'none', background: bookSaving || !bookForm.date ? '#c4b5fd' : 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: (bookSaving || !bookForm.date) ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                {bookSaving ? 'Memproses...' : 'Konfirmasi Pesan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Pesanan */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,30,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e' }}>{selected.name}</h3>
              <span style={{ background: (statusStyle[selected.status]||{}).bg, color: (statusStyle[selected.status]||{}).color, padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{selected.status}</span>
            </div>
            {[['Layanan',selected.service],['Tanggal',selected.date],['Telepon',selected.phone],['Total',fmt(selected.amount)]].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f3f5', fontSize: 13 }}>
                <span style={{ color: '#868e96' }}>{l}</span><span style={{ fontWeight: 600, color: '#1a1a2e' }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setSelected(null)} style={{ marginTop: 18, width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  )
}

const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }
