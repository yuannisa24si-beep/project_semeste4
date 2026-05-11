// src/layouts/AdminLayout.jsx
import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/bookings', label: 'Pemesanan', icon: '📋' },
  { to: '/admin/clients', label: 'Klien', icon: '👥' },
  { to: '/admin/services', label: 'Layanan', icon: '💼' },
  { to: '/admin/gallery', label: 'Galeri', icon: '📷' },
   { to: '/admin/profile', label: 'Profil', icon: '👤' },
  { to: '/admin/settings', label: 'Pengaturan', icon: '⚙️' },
  { to: '/admin/invoice', label: 'Invoice', icon: '🧾' },
  { to: '/admin/security', label: 'Keamanan', icon: '🔒' },
  { to: '/admin/pricing', label: 'Harga', icon: '💰' },
  { to: '/admin/notifications', label: 'Notifikasi', icon: '🔔' },
  { to: '/admin/chat', label: 'Chat', icon: '💬' },
  { to: '/admin/projects', label: 'Proyek', icon: '📁' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240,
        background: '#ffffff',
        borderRight: '1px solid #d3d3d3',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s ease',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid #d3d3d3',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between'
        }}>
          {!collapsed && (
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 24 }}>💒</span>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 16, fontWeight: 700, color: '#0000ff'
              }}>Wedding Organizer</span>
            </Link>
          )}
          {collapsed && <span style={{ fontSize: 24 }}>💒</span>}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#0000ff', fontSize: 16, padding: 4
          }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav Menu */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {menuItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/admin'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 12,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                fontSize: 14, fontWeight: 500,
                background: isActive ? '#e6e6ff' : 'transparent',
                color: isActive ? '#0000ff' : '#666666',
                textDecoration: 'none', transition: 'all 0.2s'
              })}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #d3d3d3' }}>
          <button onClick={() => navigate('/login')} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 12,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '10px 12px', borderRadius: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: '#ef4444',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 20 }}>🚪</span>
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          background: '#ffffff', borderBottom: '1px solid #d3d3d3',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <p style={{ fontSize: 14, color: '#666666' }}>
            Selamat datang, <span style={{ color: '#0000ff', fontWeight: 600 }}>Admin</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#e6e6ff',
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