import PageHeader from '../../components/PageHeader'

export default function Contact() {
  return (
    <div style={{ padding: '5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
      <PageHeader title="Contact Us" subtitle="Kami siap membantu kamu" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Info */}
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#a84f4f', marginBottom: 20 }}>
            Hubungi Kami
          </h3>
          {[
            { icon: '📍', label: 'Alamat', val: 'Jl. Mawar No. 12, Jakarta Selatan' },
            { icon: '📞', label: 'Telepon', val: '+62 812-3456-7890' },
            { icon: '✉️', label: 'Email', val: 'hello@rosewedding.id' },
            { icon: '🕐', label: 'Jam Kerja', val: 'Senin–Sabtu, 09.00–18.00' },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, background: '#f7e0e0', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0
              }}>{icon}</div>
              <div>
                <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 14, color: '#2d2d2d', fontWeight: 500 }}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Nama Lengkap', type: 'text', placeholder: 'Nama kamu' },
            { label: 'Email', type: 'email', placeholder: 'nama@email.com' },
            { label: 'No. Telepon', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
          ].map(({ label, type, placeholder }) => (
            <div key={label}>
              <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                {label}
              </label>
              <input type={type} placeholder={placeholder} style={{
                width: '100%', padding: '11px 16px',
                border: '1.5px solid #f0d0d0', borderRadius: 10,
                fontSize: 14, outline: 'none', fontFamily: 'Jost, sans-serif'
              }}
                onFocus={e => e.target.style.borderColor = '#c97070'}
                onBlur={e => e.target.style.borderColor = '#f0d0d0'}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 13, color: '#c97070', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Pesan
            </label>
            <textarea rows={4} placeholder="Ceritakan kebutuhan pernikahanmu..." style={{
              width: '100%', padding: '11px 16px',
              border: '1.5px solid #f0d0d0', borderRadius: 10,
              fontSize: 14, outline: 'none', fontFamily: 'Jost, sans-serif',
              resize: 'vertical'
            }}
              onFocus={e => e.target.style.borderColor = '#c97070'}
              onBlur={e => e.target.style.borderColor = '#f0d0d0'}
            />
          </div>
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
            color: '#fff', border: 'none', borderRadius: 50,
            padding: '13px', fontSize: 14, fontWeight: 500,
            letterSpacing: 0.5, cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(201,112,112,0.3)'
          }}>
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  )
}
