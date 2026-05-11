// src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    localStorage.setItem('token', 'dummy')
    navigate('/admin')
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid #d3d3d3', borderRadius: 8,
    fontSize: 14, outline: 'none', background: '#fff',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s'
  }

  return (
    <div>
      <h2 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 28, fontWeight: 700, color: '#0000ff', marginBottom: 8
      }}>
        Masuk
      </h2>
      <p style={{ color: '#666666', fontSize: 14, marginBottom: 32 }}>
        Masuk ke akun Anda untuk melanjutkan
      </p>

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Email
          </label>
          <input
            type="email" required placeholder="admin@wedding.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'}
          />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Password
          </label>
          <input
            type="password" required placeholder="********"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 13, color: '#0000ff', cursor: 'pointer' }}>Lupa password?</span>
        </div>

        <button type="submit" style={{
          background: '#0000ff', color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px', fontSize: 16, fontWeight: 600,
          cursor: 'pointer', transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#0000cc'}
          onMouseLeave={e => e.currentTarget.style.background = '#0000ff'}
        >
          Masuk
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666666' }}>
        Belum punya akun?{' '}
        <Link to="/register" style={{ color: '#0000ff', fontWeight: 500 }}>Daftar sekarang</Link>
      </p>
    </div>
  )
}