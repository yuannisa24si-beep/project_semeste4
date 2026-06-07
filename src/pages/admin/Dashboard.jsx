// src/pages/admin/Dashboard.jsx
// ✅ useState  : menyimpan jam real-time dan status loading
// ✅ useEffect : fetch data statistik (simulasi) + jam real-time tiap detik
import { useState, useEffect } from 'react'
import StatCard from '../../components/StatCard'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import Progress from '../../components/Progress'
import Tooltip from '../../components/Tooltip'
import { TooltipProvider } from '../../components/Tooltip'

const IcBookingS = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IcUsersS = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcMoneyS = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const IcCalendarS = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const monthlyActivity = [
  { month: 'Jan', value: 25 }, { month: 'Feb', value: 28 }, { month: 'Mar', value: 30 },
  { month: 'Apr', value: 32 }, { month: 'Mei', value: 35 }, { month: 'Jun', value: 38 },
]
const topPackages = [
  { name: 'Full Package', percentage: 35, amount: 'Rp 85jt' },
  { name: 'Photography',  percentage: 28, amount: 'Rp 42jt' },
  { name: 'Decoration',   percentage: 22, amount: 'Rp 38jt' },
  { name: 'Catering',     percentage: 15, amount: 'Rp 28jt' },
]
const monthlyEarnings = [
  { month: 'Jan', value: 35000000 }, { month: 'Feb', value: 42000000 },
  { month: 'Mar', value: 38000000 }, { month: 'Apr', value: 45000000 },
  { month: 'Mei', value: 48000000 }, { month: 'Jun', value: 52000000 },
]
const topServices = [
  { name: 'Full Package',  amount: 'Rp 85jt', percentage: 40 },
  { name: 'Photography',   amount: 'Rp 42jt', percentage: 20 },
  { name: 'Decoration',    amount: 'Rp 38jt', percentage: 18 },
  { name: 'Catering',      amount: 'Rp 28jt', percentage: 13 },
  { name: 'Entertainment', amount: 'Rp 15jt', percentage: 7  },
]
const yearlyEarnings = [
  { year: '2022', amount: 180000000 },
  { year: '2023', amount: 250000000 },
  { year: '2024', amount: 380000000 },
]

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
const fmtShort = n => {
  if (n >= 1000000000) return `Rp ${(n/1000000000).toFixed(1)}M`
  if (n >= 1000000)    return `Rp ${(n/1000000).toFixed(0)}jt`
  return `Rp ${(n/1000).toFixed(0)}rb`
}

export default function Dashboard() {
  // ✅ useState — (1) jam real-time, (2) status loading, (3) data stats dari "server"
  // What  : useState menyimpan nilai yang berubah dan memicu re-render
  // Why   : clock perlu update setiap detik; statsData perlu diisi setelah fetch
  // Who   : komponen Dashboard yang membutuhkan data dinamis
  // When  : setiap kali nilai berubah, React re-render tampilan
  // Where : di dalam komponen Dashboard
  // How   : deklarasi dengan const [nilai, setNilai] = useState(nilaiAwal)
  const [clock, setClock]       = useState(new Date())
  const [loading, setLoading]   = useState(true)
  const [statsData, setStatsData] = useState([])

  // useEffect — (1) simulasi fetch data stats saat komponen mount
  // What  : useEffect menjalankan side effect setelah render
  // Why   : data stats harus diambil dari server, tidak bisa langsung di render
  // Who   : admin yang membuka Dashboard
  // When  : hanya sekali saat komponen pertama kali di-mount (dependency [] kosong)
  // Where : di halaman Dashboard, saat pertama dibuka
  // How   : setTimeout 800ms mensimulasikan API call, lalu setStatsData + setLoading
  useEffect(() => {
    document.title = 'Dashboard — Wedding Organizer'
    const timer = setTimeout(() => {
      setStatsData([
        { label: 'Total Pemesanan', value: '48',      Icon: IcBookingS,  change: '+12%'     },
        { label: 'Klien Aktif',     value: '32',      Icon: IcUsersS,    change: '+5%'      },
        { label: 'Pendapatan',      value: 'Rp 48jt', Icon: IcMoneyS,    change: '+18%'     },
        { label: 'Event Mendatang', value: '7',       Icon: IcCalendarS, change: '2 minggu' },
      ])
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer) // cleanup mencegah memory leak
  }, [])

  //  useEffect — (2) jam real-time update setiap detik
  // What  : menjalankan setInterval untuk memperbarui state clock
  // Why   : admin perlu melihat waktu terkini di dashboard
  // Who   : semua admin yang membuka halaman Dashboard
  // When  : berjalan setiap 1000ms, cleanup saat komponen unmount
  // Where : ditampilkan di sudut kanan atas header Dashboard
  // How   : setInterval + return cleanup agar tidak terjadi memory leak
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = clock.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = clock.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <TooltipProvider>
    <div style={{ padding: '0 4px' }}>

      {/* Header + Jam Real-time */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Ringkasan aktivitas Wedding Organizer</p>
        </div>
        {/*  useState clock ditampilkan */}
        <div style={{ textAlign: 'right', background: '#fff', borderRadius: 10, padding: '10px 16px', border: '1px solid #e9ecef' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{timeStr}</p>
          <p style={{ fontSize: 11, color: '#868e96', marginTop: 2 }}>{dateStr}</p>
        </div>
      </div>

      {/* Stats Cards — shimmer skeleton saat loading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{
                borderRadius: 12, height: 100, border: '1px solid #e9ecef',
                background: 'linear-gradient(90deg,#f1f3f5 25%,#e9ecef 50%,#f1f3f5 75%)',
                backgroundSize: '200% 100%', animation: 'shimmer 1.2s infinite'
              }} />
            ))
          : statsData.map((s, i) => (
              <StatCard key={i} label={s.label} value={s.value} change={s.change} icon={<s.Icon />} />
            ))
        }
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
        <Card title="Aktif Bulan Ini" padding="20px">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5' }}>38</span>
            <span style={{ fontSize: 14, color: '#868e96' }}>klien aktif</span>
            <span style={{ fontSize: 12, color: '#2f9e44', marginLeft: 'auto' }}>↑ +18%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {monthlyActivity.map((item, idx) => (
              <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${(item.value/40)*60}px`, background: '#4f46e5', borderRadius: '4px 4px 0 0', marginBottom: 6, opacity: 0.7 + idx * 0.05 }} />
                <span style={{ fontSize: 10, color: '#868e96' }}>{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Paket Terlaris" padding="20px">
          {topPackages.map((pkg, idx) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <Tooltip content={`${pkg.name}: ${pkg.amount}`} side="top">
                  <span style={{ fontSize: 13, color: '#1a1a2e', cursor: 'default' }}>{pkg.name}</span>
                </Tooltip>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>{pkg.amount}</span>
              </div>
              <Progress value={pkg.percentage} max={100} showValue={false} color="#4f46e5" size="sm" />
              <span style={{ fontSize: 10, color: '#868e96', marginTop: 2, display: 'block' }}>{pkg.percentage}%</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Row 3 */}
      <Card title="Pendapatan Bulan Ini" padding="20px" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#4f46e5' }}>{fmt(52000000)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
          {monthlyEarnings.map((item, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: `${(item.value/60000000)*80}px`, background: '#4f46e5', borderRadius: '4px 4px 0 0', marginBottom: 6, opacity: 0.65 + idx * 0.07 }} />
              <span style={{ fontSize: 10, color: '#868e96' }}>{item.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 4 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Card title="Layanan Terlaris" padding="20px">
          {topServices.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: idx !== topServices.length-1 ? '1px solid #f1f3f5' : 'none' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{s.name}</span>
                <div style={{ width: `${s.percentage}%`, height: 3, background: '#4f46e5', borderRadius: 2, marginTop: 4, opacity: 0.7 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>{s.amount}</span>
            </div>
          ))}
        </Card>

        <Card title="Pendapatan per Tahun" padding="20px">
          {yearlyEarnings.map((y, idx) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{y.year}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>{fmtShort(y.amount)}</span>
              </div>
              <div style={{ background: '#f1f3f5', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${(y.amount/400000000)*100}%`, background: '#4f46e5', height: '100%', borderRadius: 4 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#4f46e5' }}>{fmtShort(810000000)}</span>
          </div>
        </Card>
      </div>

    </div>
    </TooltipProvider>
  )
}
