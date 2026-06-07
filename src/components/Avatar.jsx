const sizes = { sm: 32, md: 40, lg: 56, xl: 72 }

export default function Avatar({ name = '', src = '', size = 'md', online = false }) {
  const px = sizes[size]
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: px, height: px, borderRadius: '50%',
        background: src ? 'transparent' : '#3b5bdb',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', flexShrink: 0,
        fontSize: px * 0.35, fontWeight: 700, color: '#fff',
        border: '2px solid #e9ecef'
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             : initials || '?'}
      </div>
      {online && (
        <span style={{
          position: 'absolute', bottom: 1, right: 1,
          width: px * 0.28, height: px * 0.28,
          background: '#40c057', borderRadius: '50%',
          border: '2px solid #fff'
        }} />
      )}
    </div>
  )
}
