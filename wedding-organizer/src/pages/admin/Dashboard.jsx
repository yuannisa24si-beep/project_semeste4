// src/pages/admin/Dashboard.jsx
import { Link } from 'react-router-dom'

// Data statistik utama (seperti di gambar: 300, 1m, 345$, 68)
const stats = [
  { label: 'Total Pemesanan', value: '48', icon: '📋', change: '+12%', color: '#0000ff' },
  { label: 'Klien Aktif', value: '32', icon: '👥', change: '+5%', color: '#0000ff' },
  { label: 'Pendapatan', value: 'Rp 48jt', icon: '💰', change: '+18%', color: '#0000ff' },
  { label: 'Event Mendatang', value: '7', icon: '📅', change: '2 minggu', color: '#0000ff' },
]

// Data untuk "Active Users" -> diubah jadi "Aktif Bulan Ini"
const monthlyActivity = [
  { month: 'Jan', value: 25 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 32 },
  { month: 'Mei', value: 35 },
  { month: 'Jun', value: 38 },
]

// Data untuk "Sales by Age" -> diubah jadi "Paket Terlaris"
const topPackages = [
  { name: 'Full Package', percentage: 35, amount: 'Rp 85jt', range: '35-40' },
  { name: 'Photography', percentage: 28, amount: 'Rp 42jt', range: '30-35' },
  { name: 'Decoration', percentage: 22, amount: 'Rp 38jt', range: '25-30' },
  { name: 'Catering', percentage: 15, amount: 'Rp 28jt', range: '15-20' },
]

// Data untuk "Your Earning This Month" -> Pendapatan per bulan
const monthlyEarnings = [
  { month: 'Jan', value: 35000000 },
  { month: 'Feb', value: 42000000 },
  { month: 'Mar', value: 38000000 },
  { month: 'Apr', value: 45000000 },
  { month: 'Mei', value: 48000000 },
  { month: 'Jun', value: 52000000 },
]

// Data untuk "Earnings by Item" -> Layanan terlaris
const topServices = [
  { name: 'Full Package', amount: 'Rp 85jt', percentage: 40 },
  { name: 'Photography', amount: 'Rp 42jt', percentage: 20 },
  { name: 'Decoration', amount: 'Rp 38jt', percentage: 18 },
  { name: 'Catering', amount: 'Rp 28jt', percentage: 13 },
  { name: 'Entertainment', amount: 'Rp 15jt', percentage: 7 },
]

// Data untuk "Earnings by Year" -> Pendapatan per tahun
const yearlyEarnings = [
  { year: '2022', amount: 180000000 },
  { year: '2023', amount: 250000000 },
  { year: '2024', amount: 380000000 },
]

const fmt = (n) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(n)
}

const fmtShort = (n) => {
  if (n >= 1000000000) return `Rp ${(n / 1000000000).toFixed(1)}M`
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(0)}jt`
  return `Rp ${(n / 1000).toFixed(0)}rb`
}

export default function Dashboard() {
  return (
    <div style={{ padding: '0 4px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>
          Ringkasan aktivitas Wedding Organizer
        </p>
      </div>

      {/* ===== STATS CARDS (4 card seperti gambar) ===== */}
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
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#666666', marginBottom: 8 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 28, fontWeight: 700, color: '#000000', marginBottom: 4 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#10b981' }}>
                  {stat.change}
                </p>
              </div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#e6e6ff',
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

      {/* ===== ROW 2: Active Users + Sales by Age (2 kolom) ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        marginBottom: 28
      }}>
        {/* Aktif Bulan Ini (seperti Active Users) */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000000' }}>Aktif Bulan Ini</h3>
            <span style={{ fontSize: 13, color: '#0000ff' }}>+18%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#0000ff' }}>38</span>
            <span style={{ fontSize: 14, color: '#666666' }}>klien aktif</span>
          </div>
          {/* Bar Chart Sederhana */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {monthlyActivity.map((item, idx) => (
              <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: `${(item.value / 40) * 60}px`,
                  background: '#0000ff',
                  borderRadius: '4px 4px 0 0',
                  marginBottom: 6,
                  transition: 'height 0.3s'
                }} />
                <span style={{ fontSize: 10, color: '#666666' }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paket Terlaris (seperti Sales by Age) */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '20px'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000000', marginBottom: 16 }}>
            Paket Terlaris
          </h3>
          {topPackages.map((pkg, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: '#000000' }}>{pkg.name}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0000ff' }}>{pkg.amount}</span>
              </div>
              <div style={{
                background: '#f3f4f6',
                borderRadius: 4,
                height: 8,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${pkg.percentage}%`,
                  background: '#0000ff',
                  height: '100%',
                  borderRadius: 4
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <span style={{ fontSize: 10, color: '#666666' }}>{pkg.percentage}%</span>
                <span style={{ fontSize: 10, color: '#666666' }}>usia {pkg.range}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ROW 3: Your Earning This Month (full width) ===== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        padding: '20px',
        marginBottom: 28
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000000' }}>Pendapatan Bulan Ini</h3>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#0000ff' }}>
            {fmt(52000000)}
          </span>
        </div>
        {/* Line Chart Sederhana */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
          {monthlyEarnings.map((item, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: `${(item.value / 60000000) * 80}px`,
                background: '#0000ff',
                borderRadius: '4px 4px 0 0',
                marginBottom: 6,
                transition: 'height 0.3s'
              }} />
              <span style={{ fontSize: 10, color: '#666666' }}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ROW 4: Earnings by Item + Earnings by Year (2 kolom) ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20
      }}>
        {/* Layanan Terlaris (Earnings by Item) */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '20px'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000000', marginBottom: 16 }}>
            Layanan Terlaris
          </h3>
          {topServices.map((service, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: idx !== topServices.length - 1 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#000000' }}>{service.name}</span>
                <div style={{
                  width: `${service.percentage}%`,
                  height: 4,
                  background: '#0000ff',
                  borderRadius: 2,
                  marginTop: 4
                }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0000ff' }}>{service.amount}</span>
            </div>
          ))}
        </div>

        {/* Pendapatan per Tahun (Earnings by Year) */}
        <div style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #d3d3d3',
          padding: '20px'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#000000', marginBottom: 16 }}>
            Pendapatan per Tahun
          </h3>
          {yearlyEarnings.map((year, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#000000' }}>{year.year}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0000ff' }}>{fmtShort(year.amount)}</span>
              </div>
              <div style={{
                background: '#f3f4f6',
                borderRadius: 4,
                height: 10,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(year.amount / 400000000) * 100}%`,
                  background: '#0000ff',
                  height: '100%',
                  borderRadius: 4
                }} />
              </div>
            </div>
          ))}
          {/* Total */}
          <div style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: '1px solid #d3d3d3',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#000000' }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#0000ff' }}>
              {fmtShort(810000000)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}