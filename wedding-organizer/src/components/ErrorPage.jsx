import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#fdf4f4', textAlign: 'center', padding: '2rem'
    }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🌸</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, color: '#a84f4f', marginBottom: 8 }}>
        404
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16 }}>
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link to="/" style={{
        background: '#c97070', color: '#fff',
        padding: '12px 32px', borderRadius: 50,
        fontSize: 14, letterSpacing: 1, fontWeight: 500
      }}>
        Kembali ke Beranda
      </Link>
    </div>
  )
}
