// src/pages/admin/Notifications.jsx
import { useState } from 'react'

const initialNotifications = [
  { id: 1, title: 'Pemesanan Baru', message: 'Andhie & Yasmin melakukan pemesanan Full Package', time: '5 menit lalu', read: false, type: 'booking', icon: '📋' },
  { id: 2, title: 'Pembayaran Diterima', message: 'Pembayaran Rp 15.000.000 dari Budi & Sari', time: '1 jam lalu', read: false, type: 'payment', icon: '💰' },
  { id: 3, title: 'Event Mendatang', message: 'Wedding Andhie & Yasmin dalam 3 hari', time: '2 jam lalu', read: true, type: 'event', icon: '📅' },
  { id: 4, title: 'Galeri Diupdate', message: '12 foto baru ditambahkan ke galeri', time: 'Kemarin', read: true, type: 'gallery', icon: '📷' },
  { id: 5, title: 'Ulasan Baru', message: 'Reza & Dina memberikan rating 5 bintang', time: 'Kemarin', read: true, type: 'review', icon: '⭐' },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const filters = [
    { id: 'all', label: 'Semua', icon: '🔔' },
    { id: 'booking', label: 'Pemesanan', icon: '📋' },
    { id: 'payment', label: 'Pembayaran', icon: '💰' },
    { id: 'event', label: 'Event', icon: '📅' },
  ]

  const getTypeColor = (type) => {
    switch(type) {
      case 'booking': return { bg: '#e6e6ff', color: '#0000ff' }
      case 'payment': return { bg: '#d1fae5', color: '#065f46' }
      case 'event': return { bg: '#fef3c7', color: '#92400e' }
      default: return { bg: '#f3f4f6', color: '#666666' }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
            Notifikasi
          </h1>
          <p style={{ fontSize: 14, color: '#666666' }}>
            Anda memiliki {unreadCount} notifikasi belum dibaca
          </p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'transparent',
              border: '1px solid #d3d3d3',
              cursor: 'pointer',
              fontSize: 13
            }}
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 50,
              border: '1px solid',
              borderColor: filter === f.id ? '#0000ff' : '#d3d3d3',
              background: filter === f.id ? '#0000ff' : '#fff',
              color: filter === f.id ? '#fff' : '#666666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13
            }}
          >
            <span>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        overflow: 'hidden'
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666666' }}>
            Tidak ada notifikasi
          </div>
        ) : (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                borderBottom: '1px solid #d3d3d3',
                background: notif.read ? '#fff' : '#f5f5f5',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: getTypeColor(notif.type).bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>
                {notif.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#000000' }}>{notif.title}</p>
                  {!notif.read && (
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#0000ff'
                    }} />
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#666666', marginBottom: 4 }}>{notif.message}</p>
                <p style={{ fontSize: 11, color: '#999999' }}>{notif.time}</p>
              </div>
              <span style={{ fontSize: 20, color: '#999999' }}>›</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}