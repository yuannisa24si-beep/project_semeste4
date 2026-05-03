import PageHeader from '../../components/PageHeader'

const list = [
  { icon: '💒', title: 'Wedding Planning', price: 'Mulai Rp 5.000.000', desc: 'Perencanaan menyeluruh dari konsep hingga eksekusi hari H.' },
  { icon: '📸', title: 'Photography', price: 'Mulai Rp 3.500.000', desc: 'Fotografer profesional dengan hasil berkualitas tinggi.' },
  { icon: '🌸', title: 'Flower Decoration', price: 'Mulai Rp 2.000.000', desc: 'Rangkaian bunga segar untuk dekorasi venue dan pelaminan.' },
  { icon: '🍽️', title: 'Food & Catering', price: 'Mulai Rp 85.000/pax', desc: 'Menu beragam dari masakan lokal hingga internasional.' },
  { icon: '🎬', title: 'Video & Film', price: 'Mulai Rp 4.000.000', desc: 'Sinematografi pernikahan dengan editing profesional.' },
  { icon: '🎵', title: 'Entertainment', price: 'Mulai Rp 2.500.000', desc: 'Live band, DJ, dan hiburan lainnya untuk resepsi.' },
]

export default function Services() {
  return (
    <div style={{ padding: '5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader title="Our Services" subtitle="Semua yang kamu butuhkan ada di sini" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {list.map(({ icon, title, price, desc }) => (
          <div key={title} style={{
            background: '#fff', borderRadius: 20, padding: '2rem',
            border: '1px solid #f7e0e0', boxShadow: '0 2px 12px rgba(201,112,112,0.06)'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#a84f4f', marginBottom: 4 }}>{title}</h3>
            <p style={{ color: '#c97070', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{price}</p>
            <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>{desc}</p>
            <button style={{
              marginTop: 16, background: '#f7e0e0', color: '#c97070',
              border: 'none', borderRadius: 50, padding: '8px 20px',
              fontSize: 13, fontWeight: 500, cursor: 'pointer'
            }}>
              Pelajari Lebih →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
