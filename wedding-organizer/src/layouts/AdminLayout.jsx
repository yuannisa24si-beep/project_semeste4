import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/bookings', label: 'Pemesanan', icon: '📋' },
  { to: '/admin/clients', label: 'Klien', icon: '👥' },
  { to: '/admin/services', label: 'Layanan', icon: '💼' },
  { to: '/admin/gallery', label: 'Galeri', icon: '📷' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fdf4f4' }}>

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 220,
        background: '#fff',
        borderRight: '1px solid #f7e0e0',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s ease',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid #f7e0e0',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}>
          {!collapsed && (
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>🌹</span>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 16, fontWeight: 600, color: '#a84f4f'
              }}>Admin Panel</span>
            </Link>
          )}
          {collapsed && <span style={{ fontSize: 20 }}>🌹</span>}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#c97070', fontSize: 16, padding: 4
          }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {menuItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/admin'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                fontSize: 13, fontWeight: 500,
                background: isActive ? '#f7e0e0' : 'transparent',
                color: isActive ? '#c97070' : '#6b7280',
                transition: 'all 0.2s', textDecoration: 'none'
              })}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #f7e0e0' }}>
          <button onClick={() => navigate('/login')} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '10px 12px', borderRadius: 10,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 500, color: '#9ca3af',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f7e0e0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 18 }}>🚪</span>
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          background: '#fff', borderBottom: '1px solid #f7e0e0',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <p style={{ fontSize: 13, color: '#9ca3af' }}>
            Selamat datang, <span style={{ color: '#c97070', fontWeight: 600 }}>Admin</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #f7e0e0, #e8a0a0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
            }}>👤</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
