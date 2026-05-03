import PageHeader from '../../components/PageHeader'

const posts = [
  { tag: 'Tips', title: 'Cara Memilih Venue Pernikahan yang Tepat', date: '12 Apr 2026', read: '5 min', img: '🏛️', excerpt: 'Venue adalah salah satu elemen terpenting dalam pernikahan. Berikut tips memilihnya...' },
  { tag: 'Inspirasi', title: 'Tren Dekorasi Pernikahan 2026', date: '8 Apr 2026', read: '4 min', img: '🌺', excerpt: 'Tahun 2026 menghadirkan tren dekorasi yang memadukan nuansa alam dengan sentuhan modern...' },
  { tag: 'Tips', title: 'Budget Pernikahan: Hemat Tanpa Mengorbankan Kualitas', date: '2 Apr 2026', read: '7 min', img: '💰', excerpt: 'Mengatur budget pernikahan memang tidak mudah, tapi bukan berarti tidak bisa...' },
  { tag: 'Inspirasi', title: 'Gaun Pengantin untuk Berbagai Tema', date: '28 Mar 2026', read: '6 min', img: '👗', excerpt: 'Pilihan gaun pengantin sangat bergantung pada tema pernikahan yang kamu pilih...' },
  { tag: 'Vendor', title: 'Rekomendasi Fotografer Pernikahan di Jakarta', date: '20 Mar 2026', read: '5 min', img: '📷', excerpt: 'Jakarta memiliki banyak fotografer berbakat. Berikut rekomendasi terbaik kami...' },
  { tag: 'Tips', title: 'Checklist 6 Bulan Sebelum Pernikahan', date: '15 Mar 2026', read: '8 min', img: '📋', excerpt: 'Persiapan pernikahan butuh waktu. Mulai dari 6 bulan sebelumnya dengan checklist ini...' },
]

export default function Blog() {
  return (
    <div style={{ padding: '5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader title="Blogs" subtitle="Inspirasi & Tips Pernikahan" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {posts.map(({ tag, title, date, read, img, excerpt }) => (
          <div key={title} style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            border: '1px solid #f7e0e0', cursor: 'pointer'
          }}>
            <div style={{
              height: 200, background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72
            }}>
              {img}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{
                background: '#f7e0e0', color: '#c97070',
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50
              }}>{tag}</span>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#2d2d2d', margin: '10px 0 8px', lineHeight: 1.4 }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, marginBottom: 12 }}>{excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>📅 {date} · ⏱ {read}</span>
                <span style={{ fontSize: 13, color: '#c97070', fontWeight: 500 }}>Baca →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
