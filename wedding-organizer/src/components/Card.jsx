export default function Card({ children, padding = '20px', shadow = true, style = {} }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding,
      border: '1px solid #e9ecef',
      boxShadow: shadow ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
      ...style
    }}>
      {children}
    </div>
  )
}
