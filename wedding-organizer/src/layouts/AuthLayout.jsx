import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>
      {/* Left — dekoratif */}
      <div style={{
        background: 'linear-gradient(160deg, #f7e0e0 0%, #e8a0a0 50%, #c97070 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* Ornamen lingkaran */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
          top: -100, left: -100
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
          bottom: -80, right: -80
        }} />

        <Link to="/" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🌹</div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 42, color: '#fff', fontWeight: 600,
            lineHeight: 1.2, marginBottom: 12
          }}>
            Rosé Wedding<br />Organizer
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.7 }}>
            Wujudkan pernikahan impian kamu<br />bersama tim profesional kami
          </p>
        </Link>

        {/* Quote */}
        <div style={{
          position: 'absolute', bottom: '2.5rem',
          color: 'rgba(255,255,255,0.7)', fontSize: 13,
          fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif',
          textAlign: 'center'
        }}>
          "Every love story is beautiful, but yours should be extraordinary."
        </div>
      </div>

      {/* Right — form */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fdf4f4', padding: '3rem 2rem'
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
