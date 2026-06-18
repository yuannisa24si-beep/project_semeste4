// src/layouts/AdminLayout.jsx
import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const IcDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
)
const IcBooking = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)
const IcClients = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcServices = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
)
const IcGallery = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IcInvoice = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
)
const IcChat = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IcUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const IcBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const IcChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const IcChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const menuItems = [
  { to: '/admin',           label: 'Dashboard',  Icon: IcDashboard },
  { to: '/admin/bookings',  label: 'Pemesanan',  Icon: IcBooking },
  { to: '/admin/clients',   label: 'Klien',      Icon: IcClients },
  { to: '/admin/services',  label: 'Layanan',    Icon: IcServices },
  { to: '/admin/gallery',   label: 'Galeri',     Icon: IcGallery },
  { to: '/admin/invoice',   label: 'Invoice',    Icon: IcInvoice },
  { to: '/admin/chat',      label: 'Chat',       Icon: IcChat },
  { to: '/admin/users',     label: 'Users',      Icon: IcUsers },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240,
        background: '#ffffff',
        borderRight: '1px solid #e9ecef',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s ease',
        flexShrink: 0,
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)'
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '18px 0' : '18px 16px',
          borderBottom: '1px solid #e9ecef',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: 64
        }}>
          {!collapsed && (
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, fontFamily: 'Georgia, serif', letterSpacing: -1 }}>W</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.2 }}>Wedding</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: '#868e96', lineHeight: 1.2 }}>Organizer</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, fontFamily: 'Georgia, serif', letterSpacing: -1 }}>W</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: 'none', border: '1px solid #e9ecef', cursor: 'pointer',
            color: '#868e96', padding: '4px 6px', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f1f3f5'; e.currentTarget.style.color = '#4f46e5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#868e96' }}
          >
            {collapsed ? <IcChevronRight /> : <IcChevronLeft />}
          </button>
        </div>

        {/* Nav Menu */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {menuItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end={to === '/admin'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: '9px 10px', borderRadius: 8, marginBottom: 2,
                fontSize: 13.5, fontWeight: 500,
                background: isActive ? '#eef2ff' : 'transparent',
                color: isActive ? '#4f46e5' : '#495057',
                textDecoration: 'none', transition: 'all 0.15s'
              })}
              onMouseEnter={e => { if (!e.currentTarget.dataset.active) e.currentTarget.style.background = '#f8f9fa' }}
              onMouseLeave={e => { if (!e.currentTarget.dataset.active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '10px 8px', borderTop: '1px solid #e9ecef' }}>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '9px 10px', borderRadius: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13.5, fontWeight: 500, color: '#868e96',
            transition: 'all 0.15s'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.color = '#e03131' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#868e96' }}
          >
            <IcLogout />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          background: '#ffffff', borderBottom: '1px solid #e9ecef',
          padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <p style={{ fontSize: 14, color: '#868e96' }}>
            Selamat datang, <span style={{ color: '#4f46e5', fontWeight: 600 }}>Admin</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{
              background: 'none', border: '1px solid #e9ecef', borderRadius: 8,
              width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#868e96', position: 'relative'
            }}>
              <IcBell />
              <span style={{
                position: 'absolute', top: 6, right: 6,
                width: 7, height: 7, borderRadius: '50%',
                background: '#f03e3e', border: '1.5px solid #fff'
              }} />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>AD</span>
            </div>
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