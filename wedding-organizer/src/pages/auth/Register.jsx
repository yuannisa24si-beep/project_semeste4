// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import Alert from '../../components/Alert'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const navigate = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    navigate('/login')
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
        Daftar
      </h2>
      <p style={{ color: '#666666', fontSize: 14, marginBottom: 28 }}>
        Buat akun baru untuk memulai
      </p>

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Nama Lengkap
          </label>
          <input type="text" required placeholder="Nama Anda"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'} />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Email
          </label>
          <input type="email" required placeholder="nama@email.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'} />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            No. Telepon
          </label>
          <input type="tel" placeholder="08xx-xxxx-xxxx"
            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'} />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Password
          </label>
          <input type="password" required placeholder="Min. 8 karakter"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'} />
        </div>

        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#000000', display: 'block', marginBottom: 8 }}>
            Konfirmasi Password
          </label>
          <input type="password" required placeholder="Ulangi password"
            value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0000ff'}
            onBlur={e => e.target.style.borderColor = '#d3d3d3'} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <input type="checkbox" required id="agree" style={{ accentColor: '#0000ff' }} />
          <label htmlFor="agree" style={{ fontSize: 13, color: '#666666' }}>
            Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi
          </label>
        </div>

        <button type="submit" style={{
          background: '#0000ff', color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px', fontSize: 16, fontWeight: 600,
          cursor: 'pointer', transition: 'background 0.2s', marginTop: 4
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#0000cc'}
          onMouseLeave={e => e.currentTarget.style.background = '#0000ff'}
        >
          Daftar
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666666' }}>
        Sudah punya akun?{' '}
        <Link to="/login" style={{ color: '#0000ff', fontWeight: 500 }}>Masuk di sini</Link>
      </p>
    </div>
  )
}