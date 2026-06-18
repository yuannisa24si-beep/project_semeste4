// src/layouts/AuthLayout.jsx
import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Kiri — dekoratif */}
      <div style={{
        background: 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', top: -120, left: -120 }} />
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', bottom: -60, right: -60 }} />
        <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '30%', right: '10%' }} />

        <Link to="/" style={{ textAlign: 'center', position: 'relative', zIndex: 1, textDecoration: 'none' }}>
          {/* Logo W */}
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 36, fontFamily: 'Georgia, serif', letterSpacing: -2 }}>W</span>
          </div>

          <h1 style={{ fontSize: 40, color: '#fff', fontWeight: 800, lineHeight: 1.15, marginBottom: 14, letterSpacing: -0.5 }}>
            Wedding<br />Organizer
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.7, maxWidth: 280 }}>
            Kelola pernikahan impian Anda<br />dengan mudah dan profesional
          </p>

          {/* stats kecil */}
          <div style={{ display: 'flex', gap: 24, marginTop: 36, justifyContent: 'center' }}>
            {[['500+', 'Pernikahan'], ['98%', 'Kepuasan'], ['10+', 'Tahun']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>{val}</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>{lbl}</p>
              </div>
            ))}
          </div>
        </Link>

        <div style={{
          position: 'absolute', bottom: '2rem',
          color: 'rgba(255,255,255,0.5)', fontSize: 12,
          fontStyle: 'italic', textAlign: 'center', zIndex: 1
        }}>
          "Every love story is beautiful, but yours should be extraordinary."
        </div>
      </div>

      {/* Kanan — Form */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f8f9fa', padding: '3rem 2rem'
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
