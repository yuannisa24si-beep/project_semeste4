// src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const IcEye = ({ off }) => off
  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setLoading(false)
      setError('Email atau password salah. Silakan coba lagi.')
      return
    }

    // Cek role dari tabel profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    setLoading(false)
    if (profile?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/guest')
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20
        }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 22, fontFamily: 'Georgia, serif' }}>W</span>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>Selamat datang</h2>
        <p style={{ color: '#868e96', fontSize: 14 }}>Masuk ke akun Anda untuk melanjutkan</p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#fff5f5', border: '1px solid #ffc9c9',
          borderRadius: 8, padding: '10px 14px', marginBottom: 20,
          fontSize: 13, color: '#c92a2a', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Email */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 6 }}>Email</label>
          <input type="email" required placeholder="nama@email.com"
            value={form.email} onChange={set('email')}
            style={{
              width: '100%', padding: '11px 14px', boxSizing: 'border-box',
              border: '1.5px solid #dee2e6', borderRadius: 8,
              fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff'
            }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'}
            onBlur={e => e.target.style.borderColor = '#dee2e6'}
          />
        </div>

        {/* Password */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#495057' }}>Password</label>
            <span style={{ fontSize: 12, color: '#4f46e5', cursor: 'pointer' }}>Lupa password?</span>
          </div>
          <div style={{ position: 'relative' }}>
            <input type={showPass ? 'text' : 'password'} required placeholder="••••••••"
              value={form.password} onChange={set('password')}
              style={{
                width: '100%', padding: '11px 40px 11px 14px', boxSizing: 'border-box',
                border: '1.5px solid #dee2e6', borderRadius: 8,
                fontSize: 14, outline: 'none', fontFamily: 'inherit', background: '#fff'
              }}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#dee2e6'}
            />
            <button type="button" onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#adb5bd', display: 'flex'
            }}>
              <IcEye off={showPass} />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} style={{
          background: loading ? '#a5b4fc' : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px', fontSize: 15, fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', marginTop: 4,
          boxShadow: loading ? 'none' : '0 4px 14px rgba(79,70,229,0.35)',
          transition: 'all 0.2s'
        }}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#868e96' }}>
        Belum punya akun?{' '}
        <Link to="/register" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Daftar sekarang</Link>
      </p>
    </div>
  )
}
