import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

const services = [
  { icon: '💒', title: 'Wedding Planning', desc: 'Perencanaan lengkap dari awal hingga hari H dengan tim berpengalaman.' },
  { icon: '📸', title: 'Photography', desc: 'Abadikan setiap momen berharga dengan fotografer profesional kami.' },
  { icon: '🌸', title: 'Flower Decoration', desc: 'Dekorasi bunga segar yang elegan sesuai tema pernikahan kamu.' },
  { icon: '🍽️', title: 'Food & Catering', desc: 'Sajian kuliner premium untuk memanjakan tamu undangan kamu.' },
  { icon: '🎬', title: 'Video & Film', desc: 'Dokumentasi sinematik yang akan kamu kenang seumur hidup.' },
  { icon: '🎵', title: 'Entertainment', desc: 'Live music dan hiburan untuk memeriahkan hari spesialmu.' },
]

const blogs = [
  { id: 1, tag: 'Tips', title: 'Cara Memilih Venue Pernikahan yang Tepat', date: '12 Apr 2026', read: '5 min', img: '🏛️' },
  { id: 2, tag: 'Inspirasi', title: 'Tren Dekorasi Pernikahan 2026', date: '8 Apr 2026', read: '4 min', img: '🌺' },
  { id: 3, tag: 'Tips', title: 'Budget Pernikahan: Cara Hemat Tanpa Mengorbankan Kualitas', date: '2 Apr 2026', read: '7 min', img: '💰' },
  { id: 4, tag: 'Inspirasi', title: 'Gaun Pengantin Terbaik untuk Berbagai Tema', date: '28 Mar 2026', read: '6 min', img: '👗' },
  { id: 5, tag: 'Vendor', title: 'Rekomendasi Fotografer Pernikahan di Jakarta', date: '20 Mar 2026', read: '5 min', img: '📷' },
  { id: 6, tag: 'Tips', title: 'Checklist Persiapan 6 Bulan Sebelum Pernikahan', date: '15 Mar 2026', read: '8 min', img: '📋' },
]

const testimonials = [
  { name: 'Andhie & Yasmin', date: '23 Nov 2025', img: '👰', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pelayanan sangat memuaskan!' },
  { name: 'Andhie & Mark', date: '15 Des 2025', img: '💑', text: 'Tim Rosé Wedding sangat profesional dan membantu kami di setiap langkah persiapan.' },
  { name: 'Andhie & Mark', date: '3 Jan 2026', img: '🤵', text: 'Pernikahan kami berjalan sempurna berkat bantuan tim yang luar biasa ini.' },
]

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '92vh',
        background: 'linear-gradient(135deg, #fdf4f4 0%, #f7e0e0 40%, #e8a0a0 100%)',
        display: 'flex', alignItems: 'center', overflow: 'hidden'
      }}>
        {/* Ornamen */}
        <div style={{
          position: 'absolute', right: -120, top: -120,
          width: 600, height: 600, borderRadius: '50%',
          background: 'rgba(201,112,112,0.12)'
        }} />
        <div style={{
          position: 'absolute', left: -80, bottom: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(232,160,160,0.15)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ color: '#c97070', fontSize: 13, letterSpacing: 3, fontWeight: 500, marginBottom: 16, textTransform: 'uppercase' }}>
              ✦ Wedding Organizer Terpercaya ✦
            </p>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(42px, 6vw, 72px)',
              color: '#7d3f3f', lineHeight: 1.15, marginBottom: 24, fontWeight: 600
            }}>
              Let's Plan Your<br />
              <span style={{ color: '#c97070', fontStyle: 'italic' }}>Dream Wedding</span>
            </h1>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
              Kami hadir untuk mewujudkan setiap detail pernikahan impianmu — dari dekorasi hingga dokumentasi, semua dalam satu tangan.
            </p>

            {/* Search bar */}
            <div style={{
              display: 'flex', gap: 0, background: '#fff',
              borderRadius: 50, padding: '6px 6px 6px 20px',
              boxShadow: '0 8px 32px rgba(201,112,112,0.2)',
              maxWidth: 520, marginBottom: 40
            }}>
              <select style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: '#6b7280', flex: 1, fontFamily: 'Jost, sans-serif'
              }}>
                <option>Pilih Layanan</option>
                <option>Wedding Planning</option>
                <option>Photography</option>
                <option>Decoration</option>
              </select>
              <span style={{ width: 1, background: '#f0d0d0', margin: '4px 12px' }} />
              <select style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: '#6b7280', flex: 1, fontFamily: 'Jost, sans-serif'
              }}>
                <option>Lokasi</option>
                <option>Jakarta</option>
                <option>Bali</option>
                <option>Bandung</option>
              </select>
              <button style={{
                background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
                color: '#fff', border: 'none', borderRadius: 50,
                padding: '10px 24px', fontSize: 13, fontWeight: 500,
                letterSpacing: 0.5, whiteSpace: 'nowrap'
              }}>
                🔍 Cari
              </button>
            </div>

            <div style={{ display: 'flex', gap: 32 }}>
              {[['500+', 'Pasangan Bahagia'], ['8+', 'Tahun Pengalaman'], ['50+', 'Vendor Partner']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#a84f4f', fontWeight: 600 }}>{num}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', letterSpacing: 0.5 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Foto hero placeholder */}
        <div style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          width: 380, height: 480, borderRadius: '60% 40% 60% 40% / 50% 50% 50% 50%',
          background: 'linear-gradient(160deg, #f7e0e0, #c97070)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 120, boxShadow: '0 20px 60px rgba(201,112,112,0.3)'
        }}>
          👰
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PageHeader title="Our Services" subtitle="Layanan Terbaik Kami" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {services.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#fdf4f4', borderRadius: 20,
                padding: '2rem', border: '1px solid #f7e0e0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,112,112,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 56, height: 56, background: '#f7e0e0',
                  borderRadius: 16, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 26, marginBottom: 16
                }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#a84f4f', marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" style={{
              display: 'inline-block',
              border: '2px solid #c97070', color: '#c97070',
              padding: '12px 36px', borderRadius: 50,
              fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.target.style.background = '#c97070'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c97070' }}
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section style={{ padding: '6rem 2rem', background: '#fdf4f4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PageHeader title="Blogs" subtitle="Inspirasi & Tips Pernikahan" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {blogs.map(({ id, tag, title, date, read, img }) => (
              <div key={id} style={{
                background: '#fff', borderRadius: 20, overflow: 'hidden',
                border: '1px solid #f7e0e0',
                transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,112,112,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: 180, background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64
                }}>
                  {img}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{
                    background: '#f7e0e0', color: '#c97070',
                    fontSize: 11, fontWeight: 600, padding: '3px 10px',
                    borderRadius: 50, letterSpacing: 0.5
                  }}>
                    {tag}
                  </span>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 18, color: '#2d2d2d', margin: '10px 0 8px', lineHeight: 1.4
                  }}>
                    {title}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>📅 {date}</span>
                    <span style={{ fontSize: 12, color: '#c97070', fontWeight: 500 }}>⏱ {read} read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/blog" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
              color: '#fff', padding: '12px 36px', borderRadius: 50,
              fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
              boxShadow: '0 6px 20px rgba(201,112,112,0.3)'
            }}>
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PageHeader title="Weddings That Used This Service" subtitle="Cerita Bahagia Mereka" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {testimonials.map(({ name, date, img, text }) => (
              <div key={name} style={{
                background: '#fdf4f4', borderRadius: 20, padding: '2rem',
                border: '1px solid #f7e0e0', position: 'relative'
              }}>
                <div style={{
                  fontSize: 48, position: 'absolute', top: 16, right: 20,
                  opacity: 0.15, fontFamily: 'Georgia, serif', color: '#c97070'
                }}>
                  "
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
                  }}>
                    {img}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#a84f4f', fontWeight: 600 }}>
                      {name}
                    </p>
                    <p style={{ fontSize: 12, color: '#9ca3af' }}>{date}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{text}</p>
                <div style={{ marginTop: 12, color: '#e8a0a0', fontSize: 16 }}>★★★★★</div>
                <Link to="/" style={{
                  display: 'inline-block', marginTop: 12,
                  fontSize: 13, color: '#c97070', fontWeight: 500
                }}>
                  View Details →
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/gallery" style={{
              display: 'inline-block',
              border: '2px solid #c97070', color: '#c97070',
              padding: '12px 36px', borderRadius: 50,
              fontSize: 14, fontWeight: 500, letterSpacing: 0.5
            }}>
              Show More →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>
            MULAI SEKARANG
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 42, color: '#fff', marginBottom: 16, fontWeight: 600
          }}>
            Siap Merencanakan Hari Spesialmu?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
            Konsultasi gratis dengan tim kami dan dapatkan penawaran terbaik untuk pernikahan impianmu.
          </p>
          <Link to="/register" style={{
            display: 'inline-block',
            background: '#fff', color: '#c97070',
            padding: '14px 40px', borderRadius: 50,
            fontSize: 15, fontWeight: 600, letterSpacing: 0.5,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            Mulai Konsultasi Gratis
          </Link>
        </div>
      </section>
    </div>
  )
}
