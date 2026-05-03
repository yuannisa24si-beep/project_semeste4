import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const inp = {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid #f0d0d0', borderRadius: 10,
    fontSize: 14, outline: 'none', background: '#fff',
    fontFamily: 'Jost, sans-serif', color: '#2d2d2d',
    transition: 'border 0.2s'
  }

  return (
    <div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 36, color: '#a84f4f', marginBottom: 6
      }}>
        Selamat Datang
      </h2>
      <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 32 }}>
        Masuk ke akun kamu untuk melanjutkan
      </p>

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email" required placeholder="nama@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inp}
            onFocus={e => e.target.style.borderColor = '#c97070'}
            onBlur={e => e.target.style.borderColor = '#f0d0d0'}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={show ? 'text' : 'password'} required placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ ...inp, paddingRight: 44 }}
              onFocus={e => e.target.style.borderColor = '#c97070'}
              onBlur={e => e.target.style.borderColor = '#f0d0d0'}
            />
            <button type="button" onClick={() => setShow(!show)} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 16
            }}>
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 13, color: '#c97070', cursor: 'pointer' }}>Lupa password?</span>
        </div>

        <button type="submit" style={{
          background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
          color: '#fff', border: 'none', borderRadius: 50,
          padding: '14px', fontSize: 15, fontWeight: 500,
          letterSpacing: 0.5, boxShadow: '0 6px 20px rgba(201,112,112,0.35)',
          transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          Masuk
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#9ca3af' }}>
        Belum punya akun?{' '}
        <Link to="/register" style={{ color: '#c97070', fontWeight: 500 }}>Daftar sekarang</Link>
      </p>
    </div>
  )
}
