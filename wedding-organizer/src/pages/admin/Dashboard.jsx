// src/pages/admin/Dashboard.jsx
import StatCard from '../../components/StatCard'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'

// Data statistik utama
const stats = [
  { label: 'Total Pemesanan', value: '48', icon: '📋', change: '+12%' },
  { label: 'Klien Aktif', value: '32', icon: '👥', change: '+5%' },
  { label: 'Pendapatan', value: 'Rp 48jt', icon: '💰', change: '+18%' },
  { label: 'Event Mendatang', value: '7', icon: '📅', change: '2 minggu' },
]

// Dashboard.jsx - saat klik tombol
const handleSuccess = () => {
  setShowConfetti(true)
  // aksi lainnya
}

// Data untuk "Aktif Bulan Ini"
const monthlyActivity = [
  { month: 'Jan', value: 25 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 32 },
  { month: 'Mei', value: 35 },
  { month: 'Jun', value: 38 },
]

// Data untuk "Paket Terlaris"
const topPackages = [
  { name: 'Full Package', percentage: 35, amount: 'Rp 85jt', range: '35-40' },
  { name: 'Photography', percentage: 28, amount: 'Rp 42jt', range: '30-35' },
  { name: 'Decoration', percentage: 22, amount: 'Rp 38jt', range: '25-30' },
  { name: 'Catering', percentage: 15, amount: 'Rp 28jt', range: '15-20' },
]

// Data untuk pendapatan per bulan
const monthlyEarnings = [
  { month: 'Jan', value: 35000000 },
  { month: 'Feb', value: 42000000 },
  { month: 'Mar', value: 38000000 },
  { month: 'Apr', value: 45000000 },
  { month: 'Mei', value: 48000000 },
  { month: 'Jun', value: 52000000 },
]

// Data layanan terlaris
const topServices = [
  { name: 'Full Package', amount: 'Rp 85jt', percentage: 40 },
  { name: 'Photography', amount: 'Rp 42jt', percentage: 20 },
  { name: 'Decoration', amount: 'Rp 38jt', percentage: 18 },
  { name: 'Catering', amount: 'Rp 28jt', percentage: 13 },
  { name: 'Entertainment', amount: 'Rp 15jt', percentage: 7 },
]

// Data pendapatan per tahun
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
      {/* ===== HEADER PAKAI PAGEHEADER ===== */}
      <PageHeader 
        title="Dashboard" 
        subtitle="Ringkasan aktivitas Wedding Organizer"
      />

      {/* ===== STATS CARDS (4 card) ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
        marginBottom: 28
      }}>
        {stats.map((stat, idx) => (
          <StatCard 
            key={idx}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* ===== ROW 2: Aktif Bulan Ini + Paket Terlaris ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        marginBottom: 28
      }}>
        {/* Aktif Bulan Ini */}
        <Card title="Aktif Bulan Ini" padding="20px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: '#0000ff' }}>+18%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#0000ff' }}>38</span>
            <span style={{ fontSize: 14, color: '#666666' }}>klien aktif</span>
          </div>
          {/* Bar Chart */}
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
        </Card>

        {/* Paket Terlaris */}
        <Card title="Paket Terlaris" padding="20px">
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
        </Card>
      </div>

      {/* ===== ROW 3: Pendapatan Bulan Ini ===== */}
      <Card title="Pendapatan Bulan Ini" padding="20px" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#0000ff' }}>
            {fmt(52000000)}
          </span>
        </div>
        {/* Line Chart */}
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
      </Card>

      {/* ===== ROW 4: Layanan Terlaris + Pendapatan per Tahun ===== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20
      }}>
        {/* Layanan Terlaris */}
        <Card title="Layanan Terlaris" padding="20px">
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
        </Card>

        {/* Pendapatan per Tahun */}
        <Card title="Pendapatan per Tahun" padding="20px">
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
        </Card>
      </div>
    </div>
  )
}