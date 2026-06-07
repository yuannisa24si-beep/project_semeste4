export default function Container({ children, maxWidth = 1200, padding = '24px' }) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding, width: '100%' }}>
      {children}
    </div>
  )
}
