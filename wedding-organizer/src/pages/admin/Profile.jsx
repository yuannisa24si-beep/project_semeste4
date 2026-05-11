// src/pages/admin/Profile.jsx
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'Admin Wedding',
    lastName: 'Organizer',
    email: 'admin@wedding.com',
    username: '@wedding_admin',
    phone: '+62 812 3456 7890',
    city: 'Jakarta',
    country: 'Indonesia',
    state: 'DKI Jakarta',
    zipCode: '12345',
    birthday: '1995-05-15',
    bio: 'Wedding Organizer profesional dengan pengalaman 5+ tahun',
  })

  const stats = [
    { label: 'Events', value: '32', change: '+5%', icon: '🎊', color: '#e6e6ff' },
    { label: 'Projects', value: '48', change: '+8%', icon: '📁', color: '#d1fae5' },
    { label: 'Reviews', value: '156', change: '+23%', icon: '⭐', color: '#fef3c7' },
    { label: 'Followers', value: '12.5K', change: '+12%', icon: '👥', color: '#e6e6ff' },
  ]

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setIsEditing(false)
    alert('Profil berhasil disimpan!')
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
    fontSize: 13,
    fontWeight: 500,
    color: '#666666',
    marginBottom: 6
  }

  const displayStyle = {
    padding: '12px 14px',
    background: '#f5f5f5',
    borderRadius: 8,
    fontSize: 14,
    color: '#000000'
  }

  // Data form dalam 2 grup
  const leftFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'phone', label: 'Phone No.', type: 'text' },
    { name: 'birthday', label: 'Birthday', type: 'date' },
  ]

  const rightFields = [
    { name: 'city', label: 'City', type: 'text' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'state', label: 'State', type: 'text' },
    { name: 'zipCode', label: 'Zip Code', type: 'text' },
  ]

  return (
    <div>
      {/* Header dengan Tombol Edit Profil */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
            Profile Overview
          </h1>
          <p style={{ fontSize: 14, color: '#666666' }}>Kelola informasi profil Anda</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            background: isEditing ? '#10b981' : '#0000ff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 14
          }}
        >
          {isEditing ? 'Simpan Profil' : 'Edit Profil'}
        </button>
      </div>

      {/* Stats Cards - 4 card seperti gambar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
        marginBottom: 28
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #d3d3d3',
            padding: '20px',
            transition: 'box-shadow 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 12, color: '#666666', marginBottom: 8 }}>{stat.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: '#000000', marginBottom: 4 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: '#10b981' }}>{stat.change}</p>
              </div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Profil 2 Kolom */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#000000', marginBottom: 20 }}>
          Informasi Diri
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24
        }}>
          {/* Kolom Kiri */}
          <div>
            {leftFields.map(field => (
              <div key={field.name} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{field.label}</label>
                {isEditing ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0000ff'}
                    onBlur={e => e.target.style.borderColor = '#d3d3d3'}
                  />
                ) : (
                  <div style={displayStyle}>{profile[field.name] || '-'}</div>
                )}
              </div>
            ))}
          </div>

          {/* Kolom Kanan */}
          <div>
            {rightFields.map(field => (
              <div key={field.name} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{field.label}</label>
                {isEditing ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0000ff'}
                    onBlur={e => e.target.style.borderColor = '#d3d3d3'}
                  />
                ) : (
                  <div style={displayStyle}>{profile[field.name] || '-'}</div>
                )}
              </div>
            ))}

            {/* Bio field full width di kolom kanan */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: 'vertical'
                  }}
                />
              ) : (
                <div style={displayStyle}>{profile.bio}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}