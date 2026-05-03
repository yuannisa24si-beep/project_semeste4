import PageHeader from '../../components/PageHeader'

const items = [
  { emoji: '👰', label: 'Andhie & Yasmin', cat: 'Outdoor' },
  { emoji: '💑', label: 'Budi & Sari', cat: 'Indoor' },
  { emoji: '🤵', label: 'Reza & Dina', cat: 'Garden' },
  { emoji: '💍', label: 'Andi & Putri', cat: 'Beach' },
  { emoji: '🌸', label: 'Hendra & Lia', cat: 'Ballroom' },
  { emoji: '🎊', label: 'Fajar & Nisa', cat: 'Outdoor' },
  { emoji: '🥂', label: 'Doni & Rini', cat: 'Indoor' },
  { emoji: '🎂', label: 'Bagas & Ayu', cat: 'Garden' },
  { emoji: '💐', label: 'Rizky & Mega', cat: 'Beach' },
]

export default function Gallery() {
  return (
    <div style={{ padding: '5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader title="Gallery" subtitle="Momen Indah Pasangan Kami" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {items.map(({ emoji, label, cat }) => (
          <div key={label} style={{
            background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
            borderRadius: 20, aspectRatio: '4/3',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative', overflow: 'hidden'
          }}>
            <span style={{ fontSize: 64 }}>{emoji}</span>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(168,79,79,0.8))',
              padding: '1rem', color: '#fff'
            }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 600 }}>{label}</p>
              <p style={{ fontSize: 11, opacity: 0.85 }}>{cat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
