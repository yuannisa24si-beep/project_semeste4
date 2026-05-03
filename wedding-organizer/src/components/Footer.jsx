import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#c97070', color: '#fff', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem', marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>🌹</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600 }}>
                Rosé Wedding
              </span>
            </div>
            <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.8 }}>
              Wujudkan pernikahan impian kamu bersama kami. Setiap momen adalah kenangan abadi.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {['📘', '📸', '🐦'].map((icon, i) => (
                <span key={i} style={{
                  width: 36, height: 36, background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 16, cursor: 'pointer'
                }}>{icon}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 16 }}>Services</h4>
            {['Wedding Planning', 'Photography', 'Decoration', 'Catering', 'Video & Film'].map(s => (
              <p key={s} style={{ fontSize: 13, opacity: 0.85, marginBottom: 8, cursor: 'pointer' }}>{s}</p>
            ))}
          </div>

          {/* Discover */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 16 }}>Discover</h4>
            {['About Us', 'Blog', 'Gallery', 'Testimonials', 'FAQ'].map(s => (
              <p key={s} style={{ fontSize: 13, opacity: 0.85, marginBottom: 8, cursor: 'pointer' }}>{s}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 16 }}>Contact</h4>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>📍 Jl. Mawar No. 12, Jakarta</p>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>📞 +62 812-3456-7890</p>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>✉️ hello@rosewedding.id</p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.3)',
          paddingTop: '1.5rem', textAlign: 'center',
          fontSize: 13, opacity: 0.75
        }}>
          © 2026 Rosé Wedding Organizer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
