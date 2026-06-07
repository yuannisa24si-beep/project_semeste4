// src/layouts/AuthLayout.jsx
import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>
      {/* Left — Dekoratif dengan warna biru */}
      <div style={{
        background: 'linear-gradient(160deg, #0000ff 0%, #0000cc 50%, #000099 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
          top: -100, left: -100
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
          bottom: -80, right: -80
        }} />

        <Link to="/" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💒</div>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 42, color: '#fff', fontWeight: 700,
            lineHeight: 1.2, marginBottom: 12
          }}>
            Wedding<br />Organizer
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.7 }}>
            Kelola pernikahan impian Anda<br />dengan mudah dan profesional
          </p>
        </Link>

        <div style={{
          position: 'absolute', bottom: '2.5rem',
          color: 'rgba(255,255,255,0.6)', fontSize: 13,
          fontStyle: 'italic', textAlign: 'center'
        }}>
          "Every love story is beautiful, but yours should be extraordinary."
        </div>
      </div>

      {/* Right — Form */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f5f5f5', padding: '3rem 2rem'
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}