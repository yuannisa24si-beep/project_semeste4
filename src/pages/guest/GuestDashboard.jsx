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

// Membership tiers based on total booking amount
const TIERS = [
  {
    id: 'silver',
    name: 'Silver',
    minAmount: 0,
    maxAmount: 999999,
    color: '#9ca3af',
    bg: '#f3f4f6',
    textColor: '#374151',
    label: 'Rp 0 – Rp 999.999',
    benefits: ['Diskon Layanan 5%', 'Akses Galeri Eksklusif'],
  },
  {
    id: 'gold',
    name: 'Gold',
    minAmount: 1000000,
    maxAmount: 4999999,
    color: '#f59e0b',
    bg: '#fef3c7',
    textColor: '#92400e',
    label: 'Rp 1.000.000 – Rp 4.999.999',
    benefits: ['Diskon Layanan 10%', 'Prioritas Pemesanan', 'Akses Galeri Eksklusif'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    minAmount: 5000000,
    maxAmount: Infinity,
    color: '#7c3aed',
    bg: '#ede9fe',
    textColor: '#4c1d95',
    label: '> Rp 5.000.000',
    benefits: ['Diskon Layanan 15%', 'Prioritas Pemesanan', 'Konsultasi Gratis', 'Akses Galeri Eksklusif'],
  },
]

function getTier(totalAmount) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (totalAmount >= TIERS[i].minAmount) return TIERS[i]
  }
  return TIERS[0]
}

const PACKAGES = [
  { id: 'basic',    name: 'Basic Package',    price: 5000000,  desc: 'Cocok untuk pernikahan sederhana dan intim', features: ['Dekorasi pelaminan', 'Dokumentasi foto 4 jam', 'MC profesional'] },
  { id: 'silver',   name: 'Silver Package',   price: 12000000, desc: 'Paket lengkap untuk 100-150 tamu undangan', features: ['Dekorasi venue & pelaminan', 'Foto & video 8 jam', 'Katering 100 porsi', 'MC & entertainment'] },
  { id: 'gold',     name: 'Gold Package',     price: 20000000, desc: 'Paket premium untuk pernikahan berkesan', features: ['Dekorasi mewah', 'Foto & video sinematik', 'Katering 200 porsi', 'Live band', 'Koordinator hari H'] },
  { id: 'platinum', name: 'Platinum Package', price: 35000000, desc: 'All-inclusive untuk pernikahan impian', features: ['Dekorasi & bunga premium', 'Foto & video full day', 'Katering 300+ porsi', 'Live band & entertainment', 'Koordinator + tim lengkap', 'Gaun pengantin'] },
]

const IcEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
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

export default function GuestDashboard() {
  const [bookings, setBookings]       = useState([])
  const [profile, setProfile]         = useState(null)
  const [loading, setLoading]         = useState(true)
  const [selected, setSelected]       = useState(null)
  const [editForm, setEditForm]       = useState({ full_name: '', phone: '', wedding_date: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPkg, setSavingPkg]     = useState(false)
  const [activeTab, setActiveTab]     = useState('pesanan')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const p = { ...prof, email: user.email }
      setProfile(p)
      setEditForm({ full_name: prof?.full_name || '', phone: prof?.phone || '', wedding_date: prof?.wedding_date || '' })
      const { data: bk } = await supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setBookings(bk || [])
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

  const handleSelectPackage = async (pkgId) => {
    setSavingPkg(pkgId)
    await supabase.from('profiles').update({ selected_package: pkgId }).eq('id', profile.id)
    setProfile(p => ({ ...p, selected_package: pkgId }))
    setSavingPkg(false)
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

  const selectedPkg = PACKAGES.find(p => p.id === profile?.selected_package)
  const totalBookingAmount = bookings.reduce((a, b) => a + (b.amount || 0), 0)
  const currentTier = getTier(totalBookingAmount)

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
          {/* Member badge (changed from Guest) */}
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
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Halo, {profile?.full_name || 'Member'}</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{profile?.email}</p>
        {profile?.wedding_date && <p style={{ fontSize: 12, color: '#a78bfa' }}>Hari Pernikahan: {profile.wedding_date}</p>}
        {/* Tier badge in hero */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, background: `${currentTier.color}33`, border: `1px solid ${currentTier.color}66`, color: currentTier.color === '#9ca3af' ? '#e5e7eb' : currentTier.color, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 50 }}>
          <IcStar /> Tier: {currentTier.name}
        </div>
        {selectedPkg && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, marginLeft: 8, background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 50 }}>
            <IcStar /> Paket Aktif: {selectedPkg.name}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9ecef', padding: '0 24px', display: 'flex', gap: 0 }}>
        {[['pesanan','Pesanan Saya'], ['paket','Pilih Paket'], ['profil','Edit Profil']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '14px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: 'none', background: 'none', fontFamily: 'inherit',
            color: activeTab === tab ? '#7c3aed' : '#868e96',
            borderBottom: activeTab === tab ? '2px solid #7c3aed' : '2px solid transparent',
            transition: 'all 0.15s'
          }}>{label}</button>
        ))}
      </div>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px' }}>

        {/* ── TAB: PESANAN ── */}
        {activeTab === 'pesanan' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Total Pesanan', value: bookings.length },
                { label: 'Confirmed',     value: bookings.filter(b => b.status === 'Confirmed').length },
                { label: 'Pending',       value: bookings.filter(b => b.status === 'Pending').length },
                { label: 'Total Biaya',   value: fmt(totalBookingAmount) },
              ].map((s,i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #e9ecef' }}>
                  <p style={{ fontSize: 11, color: '#868e96', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#7c3aed' }}>{s.value}</p>
                </div>
              ))}
            </div>
            {bookings.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 14, padding: '48px 24px', textAlign: 'center', border: '1px solid #e9ecef' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#495057', marginBottom: 6 }}>Belum ada pesanan</p>
                <p style={{ fontSize: 13, color: '#adb5bd' }}>Hubungi admin untuk membuat pesanan pernikahan kamu</p>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eef2ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                          {getInitials(b.name)}
                        </div>
                        <span style={{ background: st.bg, color: st.color, padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 3 }}>{b.name}</p>
                      <p style={{ fontSize: 12, color: '#868e96', marginBottom: 10 }}>{b.service}</p>
                      <p style={{ fontSize: 11, color: '#adb5bd', marginBottom: 4 }}>Tanggal: {b.date}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#7c3aed', marginTop: 10, paddingTop: 10, borderTop: '1px solid #f1f3f5' }}>{fmt(b.amount)}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: PAKET (Membership Tiers) ── */}
        {activeTab === 'paket' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Keanggotaan</h2>
              <p style={{ fontSize: 13, color: '#868e96' }}>Tier kamu ditentukan otomatis dari total pemesanan. Semakin banyak memesan, semakin tinggi tier dan keuntunganmu!</p>
            </div>

            {/* Current tier summary */}
            <div style={{ background: `linear-gradient(135deg, ${currentTier.color}22, ${currentTier.color}11)`, border: `1.5px solid ${currentTier.color}55`, borderRadius: 14, padding: '18px 22px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontSize: 12, color: '#868e96', marginBottom: 4 }}>Tier Kamu Saat Ini</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: currentTier.textColor }}>{currentTier.name}</p>
                <p style={{ fontSize: 12, color: '#868e96', marginTop: 2 }}>Total pemesanan: {fmt(totalBookingAmount)}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: '#868e96', marginBottom: 4 }}>Rentang tier:</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: currentTier.textColor }}>{currentTier.label}</p>
              </div>
            </div>

            {/* Tier cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {TIERS.map(tier => {
                const isActive = currentTier.id === tier.id
                return (
                  <div key={tier.id} style={{
                    background: '#fff', borderRadius: 16, padding: 24,
                    border: `2px solid ${isActive ? tier.color : '#e9ecef'}`,
                    position: 'relative', transition: 'all 0.2s',
                    boxShadow: isActive ? `0 8px 24px ${tier.color}33` : '0 1px 4px rgba(0,0,0,0.04)'
                  }}>
                    {isActive && (
                      <div style={{ position: 'absolute', top: -1, right: 16, background: tier.color, color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px' }}>
                        TIER KAMU
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: tier.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IcStar />
                      </div>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 800, color: '#1a1a2e' }}>{tier.name}</p>
                        <p style={{ fontSize: 11, color: '#868e96' }}>{tier.label}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                      {tier.benefits.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#495057' }}>
                          <span style={{ color: tier.color, flexShrink: 0 }}><IcCheck /></span>{b}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Package selection section */}
            <div style={{ marginTop: 36, marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Pilih Paket Pernikahan</h2>
              <p style={{ fontSize: 13, color: '#868e96' }}>Pilih paket yang sesuai kebutuhan kamu.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {PACKAGES.map(pkg => {
                const isActive = profile?.selected_package === pkg.id
                return (
                  <div key={pkg.id} style={{
                    background: '#fff', borderRadius: 16, padding: 24,
                    border: `2px solid ${isActive ? '#7c3aed' : '#e9ecef'}`,
                    position: 'relative', transition: 'all 0.2s',
                    boxShadow: isActive ? '0 8px 24px rgba(124,58,237,0.15)' : '0 1px 4px rgba(0,0,0,0.04)'
                  }}>
                    {isActive && (
                      <div style={{ position: 'absolute', top: -1, right: 16, background: '#7c3aed', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px' }}>PAKET AKTIF</div>
                    )}
                    {pkg.id === 'gold' && !isActive && (
                      <div style={{ position: 'absolute', top: -1, right: 16, background: '#f59e0b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px' }}>TERPOPULER</div>
                    )}
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{pkg.name}</h3>
                    <p style={{ fontSize: 13, color: '#868e96', marginBottom: 14, lineHeight: 1.5 }}>{pkg.desc}</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: '#7c3aed', marginBottom: 16 }}>{fmt(pkg.price)}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                      {pkg.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#495057' }}>
                          <span style={{ color: '#7c3aed', flexShrink: 0 }}><IcCheck /></span>{f}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => handleSelectPackage(pkg.id)} disabled={isActive || savingPkg === pkg.id} style={{
                      width: '100%', padding: '11px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: isActive ? 'default' : 'pointer', fontFamily: 'inherit',
                      border: isActive ? 'none' : '2px solid #7c3aed',
                      background: isActive ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : 'transparent',
                      color: isActive ? '#fff' : '#7c3aed', transition: 'all 0.15s'
                    }}>
                      {savingPkg === pkg.id ? 'Menyimpan...' : isActive ? 'Paket Aktif' : 'Pilih Paket Ini'}
                    </button>
                  </div>
                )
              })}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #f1f3f5' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff' }}>
                  {getInitials(editForm.full_name || profile?.email || 'G')}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{editForm.full_name || 'Member'}</p>
                  <p style={{ fontSize: 12, color: '#868e96' }}>{profile?.email}</p>
                  {selectedPkg && <p style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, marginTop: 2 }}>{selectedPkg.name}</p>}
                </div>
              </div>
              {[
                { label: 'Nama Lengkap', key: 'full_name', type: 'text', placeholder: 'Nama kamu' },
                { label: 'Nomor HP', key: 'phone', type: 'tel', placeholder: '0812-xxxx-xxxx' },
                { label: 'Tanggal Pernikahan', key: 'wedding_date', type: 'date', placeholder: '' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 6 }}>{label}</label>
                  <input type={type} value={editForm[key]} placeholder={placeholder}
                    onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', boxSizing: 'border-box', border: '1.5px solid #dee2e6', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = '#7c3aed'}
                    onBlur={e => e.target.style.borderColor = '#dee2e6'}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 6 }}>Email</label>
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
