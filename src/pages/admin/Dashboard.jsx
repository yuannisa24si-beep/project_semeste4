// src/pages/admin/Dashboard.jsx
// Data real dari Supabase: bookings, clients, services, invoices
import { useState, useEffect } from 'react'
import StatCard from '../../components/StatCard'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import Progress from '../../components/Progress'
import Tooltip from '../../components/Tooltip'
import { TooltipProvider } from '../../components/Tooltip'
import { supabase } from '../../lib/supabase'

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
const IcInvoiceS = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
)

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
const fmtShort = n => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`
  if (n >= 1_000_000)     return `Rp ${(n / 1_000_000).toFixed(0)}jt`
  return `Rp ${(n / 1_000).toFixed(0)}rb`
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']

export default function Dashboard() {
  const [clock, setClock]     = useState(new Date())
  const [loading, setLoading] = useState(true)

  // raw data
  const [bookings, setBookings] = useState([])
  const [clients,  setClients]  = useState([])
  const [invoices, setInvoices] = useState([])

  // ── jam real-time ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // ── fetch semua data dari Supabase ─────────────────────────────────────────
  useEffect(() => {
    document.title = 'Dashboard — Wedding Organizer'

    const fetchAll = async () => {
      setLoading(true)
      const [bRes, cRes, iRes] = await Promise.all([
        supabase.from('bookings').select('*'),
        supabase.from('clients').select('*'),
        supabase.from('invoices').select('*'),
      ])
      setBookings(bRes.data || [])
      setClients(cRes.data  || [])
      setInvoices(iRes.data || [])
      setLoading(false)
    }

    fetchAll()
  }, [])

  // ── derived stats ──────────────────────────────────────────────────────────
  const totalBookings   = bookings.length
  const totalClients    = clients.length
  const totalRevenue    = invoices.filter(i => i.status === 'Paid').reduce((a, b) => a + (b.amount || 0), 0)
  const today           = new Date()
  const upcomingEvents  = bookings.filter(b => {
    if (!b.date) return false
    return new Date(b.date) >= today && b.status !== 'Cancelled' && b.status !== 'Done'
  }).length

  const statsData = [
    { label: 'Total Pemesanan', value: String(totalBookings),    Icon: IcBookingS,  change: `${bookings.filter(b => b.status === 'Confirmed').length} confirmed` },
    { label: 'Klien Terdaftar', value: String(totalClients),     Icon: IcUsersS,    change: `${clients.length} total` },
    { label: 'Pendapatan (Paid)',value: fmtShort(totalRevenue),   Icon: IcMoneyS,    change: `${invoices.filter(i => i.status === 'Paid').length} invoice lunas` },
    { label: 'Event Mendatang',  value: String(upcomingEvents),   Icon: IcCalendarS, change: 'belum selesai' },
  ]

  // ── booking per bulan (6 bulan terakhir) ──────────────────────────────────
  const monthlyActivity = (() => {
    const result = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const yr = d.getFullYear(), mn = d.getMonth()
      const count = bookings.filter(b => {
        if (!b.created_at) return false
        const bd = new Date(b.created_at)
        return bd.getFullYear() === yr && bd.getMonth() === mn
      }).length
      result.push({ month: MONTH_NAMES[mn], value: count })
    }
    return result
  })()

  const maxActivity = Math.max(...monthlyActivity.map(m => m.value), 1)

  // ── pendapatan per bulan dari invoices paid (6 bulan terakhir) ───────────
  const monthlyEarnings = (() => {
    const result = []
    for (let i = 5; i >= 0; i--) {
      const d  = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const yr = d.getFullYear(), mn = d.getMonth()
      const total = invoices
        .filter(inv => {
          if (!inv.date || inv.status !== 'Paid') return false
          const id = new Date(inv.date)
          return id.getFullYear() === yr && id.getMonth() === mn
        })
        .reduce((a, b) => a + (b.amount || 0), 0)
      result.push({ month: MONTH_NAMES[mn], value: total })
    }
    return result
  })()

  const maxEarnings = Math.max(...monthlyEarnings.map(m => m.value), 1)
  const currentMonthEarnings = monthlyEarnings[monthlyEarnings.length - 1]?.value || 0

  // ── paket terlaris dari bookings ──────────────────────────────────────────
  const packageCount = {}
  const packageRevenue = {}
  bookings.forEach(b => {
    const svc = b.service || 'Lainnya'
    packageCount[svc]   = (packageCount[svc]   || 0) + 1
    packageRevenue[svc] = (packageRevenue[svc] || 0) + (b.amount || 0)
  })
  const topPackages = Object.entries(packageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalBookings > 0 ? Math.round((count / totalBookings) * 100) : 0,
      amount: fmtShort(packageRevenue[name] || 0),
    }))

  // ── layanan terlaris dari invoices ────────────────────────────────────────
  const svcRevenue = {}
  invoices.filter(i => i.status === 'Paid').forEach(i => {
    const pkg = i.package || 'Lainnya'
    svcRevenue[pkg] = (svcRevenue[pkg] || 0) + (i.amount || 0)
  })
  const totalSvcRevenue = Object.values(svcRevenue).reduce((a, b) => a + b, 0) || 1
  const topServices = Object.entries(svcRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, rev]) => ({
      name,
      amount: fmtShort(rev),
      percentage: Math.round((rev / totalSvcRevenue) * 100),
    }))

  // ── pendapatan per tahun ───────────────────────────────────────────────────
  const yearRevenue = {}
  invoices.filter(i => i.status === 'Paid' && i.date).forEach(i => {
    const yr = new Date(i.date).getFullYear()
    yearRevenue[yr] = (yearRevenue[yr] || 0) + (i.amount || 0)
  })
  const yearlyEarnings = Object.entries(yearRevenue)
    .sort((a, b) => a[0] - b[0])
    .map(([year, amount]) => ({ year, amount }))
  const maxYear = Math.max(...yearlyEarnings.map(y => y.amount), 1)
  const totalAllYears = yearlyEarnings.reduce((a, b) => a + b.amount, 0)

  // ── booking status breakdown ──────────────────────────────────────────────
  const statusColors = {
    'Confirmed':   '#2f9e44',
    'Pending':     '#f59f00',
    'In Progress': '#4f46e5',
    'Done':        '#099268',
    'Cancelled':   '#e03131',
  }
  const bookingByStatus = ['Confirmed', 'Pending', 'In Progress', 'Done', 'Cancelled'].map(s => ({
    status: s,
    count: bookings.filter(b => b.status === s).length,
    color: statusColors[s],
  }))

  // ── invoice summary ────────────────────────────────────────────────────────
  const invoicePaid    = invoices.filter(i => i.status === 'Paid').length
  const invoicePending = invoices.filter(i => i.status === 'Pending').length
  const invoiceOverdue = invoices.filter(i => i.status === 'Overdue').length

  const timeStr = clock.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = clock.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <TooltipProvider>
    <div style={{ padding: '0 4px' }}>

      {/* Header + Jam */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Ringkasan aktivitas Wedding Organizer — data real-time</p>
        </div>
        <div style={{ textAlign: 'right', background: '#fff', borderRadius: 10, padding: '10px 16px', border: '1px solid #e9ecef' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>{timeStr}</p>
          <p style={{ fontSize: 11, color: '#868e96', marginTop: 2 }}>{dateStr}</p>
        </div>
      </div>

      {/* Stat Cards */}
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

      {/* Row 2 — Booking per Bulan + Status Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
        <Card title="Booking per Bulan (6 Bln Terakhir)" padding="20px">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5' }}>
              {monthlyActivity[monthlyActivity.length - 1]?.value ?? 0}
            </span>
            <span style={{ fontSize: 14, color: '#868e96' }}>booking bulan ini</span>
          </div>
          {loading
            ? <div style={{ height: 80, background: '#f1f3f5', borderRadius: 8 }} />
            : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {monthlyActivity.map((item, idx) => (
                  <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                    <Tooltip content={`${item.month}: ${item.value} booking`} side="top">
                      <div style={{
                        height: `${Math.max((item.value / maxActivity) * 60, item.value > 0 ? 4 : 0)}px`,
                        background: idx === monthlyActivity.length - 1 ? '#4f46e5' : '#c5c8ff',
                        borderRadius: '4px 4px 0 0', marginBottom: 6,
                        cursor: 'default', transition: 'background 0.2s'
                      }} />
                    </Tooltip>
                    <span style={{ fontSize: 10, color: '#868e96' }}>{item.month}</span>
                  </div>
                ))}
              </div>
            )
          }
        </Card>

        <Card title="Status Pemesanan" padding="20px">
          {loading
            ? <div style={{ height: 120, background: '#f1f3f5', borderRadius: 8 }} />
            : bookingByStatus.map((item, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#1a1a2e' }}>{item.status}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.count}</span>
                </div>
                <div style={{ background: '#f1f3f5', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    width: `${totalBookings > 0 ? (item.count / totalBookings) * 100 : 0}%`,
                    background: item.color, height: '100%', borderRadius: 4,
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            ))
          }
        </Card>
      </div>

      {/* Row 3 — Pendapatan Bulanan */}
      <Card title="Pendapatan Bulanan (Invoice Lunas)" padding="20px" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: '#868e96' }}>Bulan ini</span>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#4f46e5' }}>
            {loading ? '—' : fmt(currentMonthEarnings)}
          </span>
        </div>
        {loading
          ? <div style={{ height: 100, background: '#f1f3f5', borderRadius: 8 }} />
          : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
              {monthlyEarnings.map((item, idx) => (
                <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                  <Tooltip content={`${item.month}: ${fmtShort(item.value)}`} side="top">
                    <div style={{
                      height: `${Math.max((item.value / maxEarnings) * 80, item.value > 0 ? 4 : 0)}px`,
                      background: idx === monthlyEarnings.length - 1 ? '#4f46e5' : '#c5c8ff',
                      borderRadius: '4px 4px 0 0', marginBottom: 6,
                      cursor: 'default'
                    }} />
                  </Tooltip>
                  <span style={{ fontSize: 10, color: '#868e96' }}>{item.month}</span>
                </div>
              ))}
            </div>
          )
        }
      </Card>

      {/* Row 4 — Paket Terlaris + Invoice Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
        <Card title="Paket Terlaris (dari Booking)" padding="20px">
          {loading
            ? <div style={{ height: 120, background: '#f1f3f5', borderRadius: 8 }} />
            : topPackages.length === 0
              ? <p style={{ color: '#adb5bd', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Belum ada data booking</p>
              : topPackages.map((pkg, idx) => (
                <div key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Tooltip content={`${pkg.name}: ${pkg.count} booking · ${pkg.amount}`} side="top">
                      <span style={{ fontSize: 13, color: '#1a1a2e', cursor: 'default' }}>{pkg.name}</span>
                    </Tooltip>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>{pkg.count}x</span>
                  </div>
                  <Progress value={pkg.percentage} max={100} showValue={false} color="#4f46e5" size="sm" />
                  <span style={{ fontSize: 10, color: '#868e96', marginTop: 2, display: 'block' }}>{pkg.percentage}% · {pkg.amount}</span>
                </div>
              ))
          }
        </Card>

        <Card title="Ringkasan Invoice" padding="20px">
          {loading
            ? <div style={{ height: 120, background: '#f1f3f5', borderRadius: 8 }} />
            : (
              <>
                {[
                  { label: 'Lunas (Paid)',    count: invoicePaid,    color: '#2f9e44', bg: '#d3f9d8' },
                  { label: 'Menunggu',        count: invoicePending, color: '#f59f00', bg: '#fff3bf' },
                  { label: 'Overdue',         count: invoiceOverdue, color: '#e03131', bg: '#ffe3e3' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', borderRadius: 10, background: item.bg, marginBottom: 10
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{item.label}</span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.count}</span>
                  </div>
                ))}
                <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#868e96' }}>Total Pendapatan Paid</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#4f46e5' }}>{fmtShort(totalRevenue)}</span>
                </div>
              </>
            )
          }
        </Card>
      </div>

      {/* Row 5 — Layanan Terlaris + Pendapatan per Tahun */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Card title="Layanan Terlaris (dari Invoice Lunas)" padding="20px">
          {loading
            ? <div style={{ height: 120, background: '#f1f3f5', borderRadius: 8 }} />
            : topServices.length === 0
              ? <p style={{ color: '#adb5bd', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Belum ada invoice lunas</p>
              : topServices.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: idx !== topServices.length - 1 ? '1px solid #f1f3f5' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{s.name}</span>
                    <div style={{ width: `${s.percentage}%`, height: 3, background: '#4f46e5', borderRadius: 2, marginTop: 4, opacity: 0.7 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5', marginLeft: 12 }}>{s.amount}</span>
                </div>
              ))
          }
        </Card>

        <Card title="Pendapatan per Tahun" padding="20px">
          {loading
            ? <div style={{ height: 120, background: '#f1f3f5', borderRadius: 8 }} />
            : yearlyEarnings.length === 0
              ? <p style={{ color: '#adb5bd', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Belum ada data pendapatan</p>
              : (
                <>
                  {yearlyEarnings.map((y, idx) => (
                    <div key={idx} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{y.year}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>{fmtShort(y.amount)}</span>
                      </div>
                      <div style={{ background: '#f1f3f5', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                        <div style={{ width: `${(y.amount / maxYear) * 100}%`, background: '#4f46e5', height: '100%', borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Total</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#4f46e5' }}>{fmtShort(totalAllYears)}</span>
                  </div>
                </>
              )
          }
        </Card>
      </div>

    </div>
    </TooltipProvider>
  )
}
