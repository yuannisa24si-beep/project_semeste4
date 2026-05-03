import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #f7e0e0',
      boxShadow: '0 2px 12px rgba(201,112,112,0.08)'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🌹</span>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 22, fontWeight: 600, color: '#a84f4f', letterSpacing: 1
          }}>
            Rosé Wedding
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              style={({ isActive }) => ({
                fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
                color: isActive ? '#c97070' : '#6b7280',
                borderBottom: isActive ? '2px solid #c97070' : '2px solid transparent',
                paddingBottom: 2, transition: 'all 0.2s'
              })}>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" style={{
            background: 'linear-gradient(135deg, #e8a0a0, #c97070)',
            color: '#fff', padding: '9px 24px',
            borderRadius: 50, fontSize: 13, fontWeight: 500,
            letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(201,112,112,0.3)'
          }}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  )
}
