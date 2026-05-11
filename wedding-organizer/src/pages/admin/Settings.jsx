// src/pages/admin/Settings.jsx
import { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const [settings, setSettings] = useState({
    language: 'Indonesia',
    timezone: 'Asia/Jakarta',
    dateFormat: 'DD/MM/YYYY',
    notificationEmail: true,
    notificationPush: true,
    notificationSMS: false,
  })

  const tabs = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
  ]

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #d3d3d3',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none'
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Pengaturan
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Kelola preferensi akun Anda</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        borderBottom: '1px solid #d3d3d3',
        marginBottom: 24
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: activeTab === tab.id ? '#0000ff' : '#666666',
              borderBottom: activeTab === tab.id ? '2px solid #0000ff' : 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#000000', marginBottom: 20 }}>
            Preferensi Akun
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Language</label>
              <select value={settings.language} style={inputStyle}>
                <option>Indonesia</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Timezone</label>
              <select value={settings.timezone} style={inputStyle}>
                <option>Asia/Jakarta</option>
                <option>Asia/Makassar</option>
                <option>Asia/Jayapura</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Date Format</label>
              <select value={settings.dateFormat} style={inputStyle}>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#000000', margin: '24px 0 16px' }}>
            Notifikasi
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.notificationEmail}
                onChange={() => handleToggle('notificationEmail')}
                style={{ width: 18, height: 18, accentColor: '#0000ff' }}
              />
              <span>Email Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.notificationPush}
                onChange={() => handleToggle('notificationPush')}
                style={{ width: 18, height: 18, accentColor: '#0000ff' }}
              />
              <span>Push Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.notificationSMS}
                onChange={() => handleToggle('notificationSMS')}
                style={{ width: 18, height: 18, accentColor: '#0000ff' }}
              />
              <span>SMS Notifications</span>
            </label>
          </div>

          <button style={{
            marginTop: 24,
            padding: '10px 24px',
            borderRadius: 8,
            background: '#0000ff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Simpan Perubahan
          </button>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Payment Method</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            {['VISA', 'Mastercard', 'Apple Pay', 'Google Pay', 'PayPal'].map(method => (
              <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: '1px solid #d3d3d3', borderRadius: 8, cursor: 'pointer' }}>
                <input type="radio" name="payment" style={{ accentColor: '#0000ff' }} />
                <span>{method}</span>
              </label>
            ))}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '24px 0 16px' }}>Billing History</h2>
          <div style={{ border: '1px solid #d3d3d3', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f5f5f5' }}>
                <tr>
                  <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Description</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-12-01', desc: 'Subscription Monthly', amount: 'Rp 499.000', status: 'Paid' },
                  { date: '2024-11-01', desc: 'Subscription Monthly', amount: 'Rp 499.000', status: 'Paid' },
                  { date: '2024-10-01', desc: 'Subscription Monthly', amount: 'Rp 499.000', status: 'Paid' },
                ].map((bill, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid #d3d3d3' }}>
                    <td style={{ padding: 12 }}>{bill.date}</td>
                    <td style={{ padding: 12 }}>{bill.desc}</td>
                    <td style={{ padding: 12 }}>{bill.amount}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: 50, fontSize: 11 }}>
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Aktivitas Terbaru</h2>
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            {[
              { date: '2024-12-10', title: 'Membuat Project Baru', desc: 'Project "Andhie & Yasmin" telah dibuat' },
              { date: '2024-12-08', title: 'Mengupload Galeri', desc: '4 foto baru ditambahkan ke galeri' },
              { date: '2024-12-05', title: 'Menambahkan Klien', desc: 'Klien baru: Reza & Dina' },
              { date: '2024-12-01', title: 'Mengupdate Layanan', desc: 'Layanan Photography diupdate' },
            ].map((item, idx) => (
              <div key={idx} style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{
                  position: 'absolute',
                  left: -24,
                  top: 0,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#0000ff',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2px #0000ff'
                }} />
                <div style={{
                  position: 'absolute',
                  left: -18,
                  top: 12,
                  bottom: -24,
                  width: 2,
                  background: '#d3d3d3'
                }} />
                <p style={{ fontSize: 12, color: '#666666', marginBottom: 4 }}>{item.date}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#000000', marginBottom: 2 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#666666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}