import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const navigate = useNavigate()

  const handle = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const inp = {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid #f0d0d0', borderRadius: 10,
    fontSize: 14, outline: 'none', background: '#fff',
    fontFamily: 'Jost, sans-serif', color: '#2d2d2d',
    transition: 'border 0.2s'
  }

  const focus = e => e.target.style.borderColor = '#c97070'
  const blur  = e => e.target.style.borderColor = '#f0d0d0'

  return (
    <div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 36, color: '#a84f4f', marginBottom: 6
      }}>
        Buat Akun Baru
      </h2>
      <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>
        Bergabung dan mulai rencanakan pernikahan impianmu
      </p>

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Nama Lengkap
            </label>
            <input type="text" required placeholder="Nama kamu"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={inp} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              No. Telepon
            </label>
            <input type="tel" placeholder="08xx-xxxx-xxxx"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              style={inp} onFocus={focus} onBlur={blur} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Email
          </label>
          <input type="email" required placeholder="nama@email.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            style={inp} onFocus={focus} onBlur={blur} />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Password
          </label>
          <input type="password" required placeholder="Min. 8 karakter"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            style={inp} onFocus={focus} onBlur={blur} />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Konfirmasi Password
          </label>
          <input type="password" required placeholder="Ulangi password"
            value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
            style={inp} onFocus={focus} onBlur={blur} />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4 }}>
          <input type="checkbox" required id="agree" style={{ marginTop: 3, accentColor: '#c97070' }} />
          <label htmlFor="agree" style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
            Saya setuju dengan{' '}
            <span style={{ color: '#c97070', cursor: 'pointer' }}>Syarat & Ketentuan</span>
            {' '}dan{' '}
            <span style={{ color: '#c97070', cursor: 'pointer' }}>Kebijakan Privasi</span>
          </label>
        </div>

        <button type="submit" style={{
          background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
          color: '#fff', border: 'none', borderRadius: 50,
          padding: '14px', fontSize: 15, fontWeight: 500,
          letterSpacing: 0.5, marginTop: 4,
          boxShadow: '0 6px 20px rgba(201,112,112,0.35)',
          transition: 'transform 0.2s'
        }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#9ca3af' }}>
        Sudah punya akun?{' '}
        <Link to="/login" style={{ color: '#c97070', fontWeight: 500 }}>Masuk di sini</Link>
      </p>
    </div>
  )
}
