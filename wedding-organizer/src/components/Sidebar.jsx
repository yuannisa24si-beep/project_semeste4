// Sidebar tidak dipakai di MainLayout (full-page layout),
// tapi tersedia jika dibutuhkan di halaman dashboard
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/services', label: 'Services', icon: '💼' },
  { to: '/blog', label: 'Blog', icon: '📝' },
  { to: '/gallery', label: 'Gallery', icon: '📷' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: 220, background: '#fff',
      borderRight: '1px solid #f7e0e0',
      minHeight: '100vh', padding: '2rem 1rem'
    }}>
      {items.map(({ to, label, icon }) => (
        <NavLink key={to} to={to} end={to === '/'}
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, marginBottom: 4,
            fontSize: 14, fontWeight: 500,
            background: isActive ? '#f7e0e0' : 'transparent',
            color: isActive ? '#c97070' : '#6b7280',
            transition: 'all 0.2s'
          })}>
          <span>{icon}</span> {label}
        </NavLink>
      ))}
    </aside>
  )
}
