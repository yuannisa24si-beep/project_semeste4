// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const IcEye = ({ off }) => off
  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

const inputBase = {
  width: '100%', padding: '11px 14px', boxSizing: 'border-box',
  border: '1.5px solid #dee2e6', borderRadius: 8,
  fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff'
}

function Field({ label, type = 'text', value, onChange, placeholder, required, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#fa5252' }}> *</span>}
      </label>
      {children || (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
          style={inputBase}
          onFocus={e => e.target.style.borderColor = '#4f46e5'}
          onBlur={e => e.target.style.borderColor = '#dee2e6'}
        />
      )}
    </div>
  )
}

export default function Register() {
  const [form, setForm]         = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handle = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) return setError('Password minimal 6 karakter.')
    if (form.password !== form.confirm) return setError('Password dan konfirmasi tidak sama.')

    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name }
      }
    })
    setLoading(false)

    if (signUpError) {
      setError(signUpError.message === 'User already registered'
        ? 'Email sudah terdaftar. Silakan login.'
        : signUpError.message)
    } else {
      // Cek apakah email confirmation diperlukan
      if (data?.user?.identities?.length === 0) {
        setError('Email sudah terdaftar. Silakan login.')
      } else {
        setSuccess(true)
      }
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#d3f9d8', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f9e44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>Pendaftaran Berhasil!</h2>
        <p style={{ fontSize: 14, color: '#868e96', lineHeight: 1.6, marginBottom: 24 }}>
          Akun kamu sudah dibuat. Silakan cek email untuk konfirmasi, lalu login.
        </p>
        <button onClick={() => navigate('/login')} style={{
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff',
          border: 'none', borderRadius: 8, padding: '12px 32px',
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
        }}>Ke Halaman Login</button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
        }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 22, fontFamily: 'Georgia, serif' }}>W</span>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Buat akun baru</h2>
        <p style={{ color: '#868e96', fontSize: 14 }}>Daftar untuk mulai menggunakan Wedding Organizer</p>
      </div>

      {error && (
        <div style={{
          background: '#fff5f5', border: '1px solid #ffc9c9', borderRadius: 8,
          padding: '10px 14px', marginBottom: 18, fontSize: 13, color: '#c92a2a',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Nama Lengkap" value={form.name} onChange={set('name')} placeholder="Nama kamu" required />
        <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="nama@email.com" required />

        {/* Password dengan toggle */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 6 }}>
            Password <span style={{ color: '#fa5252' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input type={showPass ? 'text' : 'password'} required placeholder="Min. 6 karakter"
              value={form.password} onChange={set('password')}
              style={{ ...inputBase, paddingRight: 40 }}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#dee2e6'}
            />
            <button type="button" onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#adb5bd', display: 'flex'
            }}><IcEye off={showPass} /></button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 6 }}>
            Konfirmasi Password <span style={{ color: '#fa5252' }}>*</span>
          </label>
          <input type="password" required placeholder="Ulangi password"
            value={form.confirm} onChange={set('confirm')}
            style={{
              ...inputBase,
              borderColor: form.confirm && form.confirm !== form.password ? '#fa5252' : '#dee2e6'
            }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'}
            onBlur={e => e.target.style.borderColor = form.confirm && form.confirm !== form.password ? '#fa5252' : '#dee2e6'}
          />
          {form.confirm && form.confirm !== form.password && (
            <p style={{ fontSize: 11, color: '#fa5252', marginTop: 4 }}>Password tidak sama</p>
          )}
        </div>

        <button type="submit" disabled={loading} style={{
          background: loading ? '#a5b4fc' : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px', fontSize: 15, fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', marginTop: 4,
          boxShadow: loading ? 'none' : '0 4px 14px rgba(79,70,229,0.35)'
        }}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#868e96' }}>
        Sudah punya akun?{' '}
        <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Masuk di sini</Link>
      </p>
    </div>
  )
}
