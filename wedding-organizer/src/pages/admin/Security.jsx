// src/pages/admin/Security.jsx
import { useState } from 'react'

export default function Security() {
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [showRequirements, setShowRequirements] = useState(false)

  const requirements = [
    'Minimum 8 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'Contains numbers and symbols'
  ]

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
    if (e.target.name === 'new') setShowRequirements(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.new !== password.confirm) {
      alert('Password baru tidak cocok!')
      return
    }
    alert('Password berhasil diubah!')
    setPassword({ current: '', new: '', confirm: '' })
    setShowRequirements(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d3d3d3',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s'
  }

  const labelStyle = {
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    color: '#000000',
    marginBottom: 8
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Keamanan
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Kelola keamanan akun Anda</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 24
      }}>
        {/* Change Password Section */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#000000', marginBottom: 20 }}>
            Ubah Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Current Password</label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0000ff'}
                onBlur={e => e.target.style.borderColor = '#d3d3d3'}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0000ff'}
                onBlur={e => e.target.style.borderColor = '#d3d3d3'}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0000ff'}
                onBlur={e => e.target.style.borderColor = '#d3d3d3'}
              />
            </div>

            {showRequirements && (
              <div style={{
                background: '#e6e6ff',
                padding: '16px',
                borderRadius: 8,
                marginBottom: 20
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0000ff', marginBottom: 12 }}>
                  Password Requirements:
                </p>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {requirements.map((req, idx) => (
                    <li key={idx} style={{ fontSize: 12, color: '#666666', marginBottom: 4 }}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                background: '#0000ff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Devices Section */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#000000', marginBottom: 20 }}>
            Perangkat Terhubung
          </h2>
          <div style={{ marginBottom: 16 }}>
            {[
              { device: 'Chrome on Windows', location: 'Jakarta, Indonesia', lastActive: 'Active now', current: true },
              { device: 'Safari on iPhone', location: 'Jakarta, Indonesia', lastActive: '2 hours ago', current: false },
              { device: 'Firefox on Mac', location: 'Bandung, Indonesia', lastActive: 'Yesterday', current: false },
            ].map((device, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: idx !== 2 ? '1px solid #d3d3d3' : 'none'
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#000000' }}>{device.device}</p>
                  <p style={{ fontSize: 12, color: '#666666' }}>{device.location}</p>
                  <p style={{ fontSize: 11, color: '#666666' }}>Last active: {device.lastActive}</p>
                </div>
                {device.current && (
                  <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: 50, fontSize: 11 }}>
                    Current Device
                  </span>
                )}
              </div>
            ))}
          </div>
          <button style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            background: 'transparent',
            border: '1px solid #ef4444',
            color: '#ef4444',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Logout All Other Devices
          </button>
        </div>
      </div>
    </div>
  )
}