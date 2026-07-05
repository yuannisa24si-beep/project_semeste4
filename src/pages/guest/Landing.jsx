// src/pages/guest/Landing.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const IcArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IcStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const FEATURES = [
  { title: 'Kelola Pemesanan',  desc: 'Pantau semua pesanan pernikahan dengan status real-time yang selalu update' },
  { title: 'Data Pasangan',     desc: 'Simpan informasi lengkap setiap pasangan pengantin dalam satu tempat' },
  { title: 'Galeri Pernikahan', desc: 'Dokumentasi foto dan video tersusun rapi per pasangan dan kategori' },
  { title: 'Paket Layanan',     desc: 'Tampilkan semua paket wedding yang tersedia dengan harga transparan' },
  { title: 'Chat Langsung',     desc: 'Komunikasi dengan pasangan tanpa perlu berpindah aplikasi' },
  { title: 'Invoice Otomatis',  desc: 'Buat tagihan profesional dan kelola pembayaran dengan mudah' },
]

const TESTIMONIALS = [
  { name: 'Andhie & Yasmin', text: 'Sistem ini sangat membantu kami memantau persiapan pernikahan. Semua info tersedia di satu tempat!', r: 5 },
  { name: 'Reza & Dina',     text: 'Komunikasi dengan WO jadi jauh lebih mudah. Kami bisa lihat status pesanan kapan saja.', r: 5 },
  { name: 'Budi & Sari',     text: 'Galeri foto nikah kami tersusun cantik dan mudah diakses. Sangat puas!', r: 5 },
]

const FAQS = [
  { q: 'Apakah saya bisa memantau persiapan pernikahan secara online?', a: 'Ya! Setelah mendaftar, kamu bisa login dan melihat status pemesanan, detail layanan, serta berkomunikasi langsung dengan tim WO.' },
  { q: 'Bagaimana cara mendaftar sebagai klien?', a: 'Klik tombol Daftar Sekarang, isi nama dan email, lalu buat password. Setelah berhasil, kamu langsung bisa login.' },
  { q: 'Apakah data pernikahan saya aman?', a: 'Data kamu disimpan dengan aman menggunakan enkripsi. Hanya kamu dan tim WO yang bisa mengakses informasi tersebut.' },
  { q: 'Bisa lihat foto dokumentasi pernikahan dari sini?', a: 'Tentu! Tim WO akan mengupload foto dan video ke galeri yang bisa kamu akses kapan saja.' },
]

const BOOKINGS_PREVIEW = [
  { name: 'Andhie & Yasmin', date: '12 Jun 2026', status: 'Confirmed',   sc: 'rgba(16,185,129,0.2)',  tc: '#6ee7b7' },
  { name: 'Reza & Dina',     date: '5 Jul 2026',  status: 'Pending',     sc: 'rgba(245,158,11,0.2)', tc: '#fcd34d' },
  { name: 'Budi & Sari',     date: '20 Jul 2026', status: 'In Progress', sc: 'rgba(139,92,246,0.2)', tc: '#c4b5fd' },
]

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ fontFamily: 'Inter,sans-serif', color: '#1a1a2e', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0 5%', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, fontFamily: 'Georgia,serif' }}>W</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>Wedding Organizer</span>
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 500, color: '#6b7280', textDecoration: 'none', padding: '8px 16px', borderRadius: 8 }}>Masuk</Link>
          <Link to="/register" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '9px 20px', borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 2px 10px rgba(124,58,237,0.3)' }}>Daftar Sekarang</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', padding: '100px 5% 80px', background: 'linear-gradient(160deg,#0f0c29,#302b63,#24243e)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.15),transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 50, marginBottom: 28 }}>
              ✨ Platform Manajemen Pernikahan
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 22, letterSpacing: -1.5 }}>
              Wujudkan{' '}
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pernikahan</span>
              <br />Impian Kamu
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              Kelola semua persiapan pernikahan dalam satu platform. Pantau pemesanan, koordinasi tim, dan dokumentasi dengan mudah.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#fff', textDecoration: 'none', padding: '13px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
                Mulai Sekarang <IcArrow />
              </Link>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '13px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}>
                Sudah Punya Akun
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Gratis mendaftar', 'Data aman & terenkripsi', 'Akses 24/7'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ color: '#a78bfa' }}><IcCheck /></span>{t}
                </div>
              ))}
            </div>
          </div>
          {/* Right - Preview */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>wedding-organizer.app</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Pemesanan Aktif</span>
                  <span style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 50 }}>Live</span>
                </div>
                {BOOKINGS_PREVIEW.map((b, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{b.name}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{b.date}</p>
                    </div>
                    <span style={{ background: b.sc, color: b.tc, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 50 }}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: -20, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: 14, padding: '12px 18px', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1 }}>500+</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Pernikahan</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#fafafa', padding: '56px 5%', borderBottom: '1px solid #f1f3f5' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['500+','Pernikahan Dikelola'],['98%','Tingkat Kepuasan'],['10+','Tahun Berpengalaman'],['24/7','Siap Melayani']].map(([v,l],i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#7c3aed', marginBottom: 4 }}>{v}</p>
              <p style={{ fontSize: 13, color: '#868e96' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '80px 5%', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Fitur Unggulan</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 14, letterSpacing: -0.5 }}>Semua Kebutuhan di Satu Tempat</h2>
            <p style={{ fontSize: 15, color: '#868e96', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Dari pemesanan hingga dokumentasi, semua tersedia untuk memudahkan pengelolaan pernikahan impian kamu</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {FEATURES.map(({ title, desc }, i) => (
              <div key={i} style={{ padding: 28, borderRadius: 16, border: '1px solid #f1f3f5', background: '#fff', transition: 'all 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#ddd6fe'; e.currentTarget.style.boxShadow='0 12px 32px rgba(124,58,237,0.1)'; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#f1f3f5'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(79,70,229,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontSize: 22 }}>
                  {['📋','👫','📸','💌','💬','🧾'][i]}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#868e96', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 5%', background: 'linear-gradient(160deg,#0f0c29,#302b63)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Testimonial</p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Kata Mereka Tentang Kami</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: 28, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {Array.from({length: t.r}).map((_, j) => <IcStar key={j} />)}
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    {t.name.charAt(0)}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 5%', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1a1a2e', letterSpacing: -0.5 }}>Pertanyaan Umum</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ border: '1px solid #f1f3f5', borderRadius: 12, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: openFaq === i ? '#faf5ff' : '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', paddingRight: 16 }}>{f.q}</span>
                  <span style={{ color: '#7c3aed', fontSize: 18, flexShrink: 0, display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#868e96', lineHeight: 1.7, background: '#faf5ff' }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 5%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>Siap Wujudkan<br />Pernikahan Impian?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 36, lineHeight: 1.7 }}>Bergabung dengan ratusan pasangan yang sudah mempercayakan pernikahan mereka kepada kami</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ fontSize: 15, fontWeight: 700, color: '#7c3aed', textDecoration: 'none', padding: '13px 32px', borderRadius: 12, background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>Daftar Gratis Sekarang</Link>
            <Link to="/login" style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '13px 32px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}>Sudah Punya Akun</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f0c29', padding: '36px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Georgia,serif' }}>W</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Wedding Organizer</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none' }}>Masuk</Link>
            <Link to="/register" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none' }}>Daftar</Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© 2026 Wedding Organizer</p>
        </div>
      </footer>

    </div>
  )
}
