// src/pages/admin/Bookings.jsx
import { useState } from 'react'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import InputField from '../../components/InputField'
import Table from '../../components/Table'
import PageHeader from '../../components/PageHeader'
import Dialog from '../../components/Dialog'
import Tooltip from '../../components/Tooltip'
import { TooltipProvider } from '../../components/Tooltip'
import Confetti from '../../components/Confetti'

const allBookings = [
  { id: 'WO-001', name: 'Andhie & Yasmin', phone: '0812-3456-7890', date: '12 Jun 2026', service: 'Full Package', status: 'Confirmed', amount: 15000000 },
  { id: 'WO-002', name: 'Budi & Sari', phone: '0813-2345-6789', date: '20 Jun 2026', service: 'Photography', status: 'Pending', amount: 4000000 },
  { id: 'WO-003', name: 'Reza & Dina', phone: '0814-3456-7890', date: '5 Jul 2026', service: 'Decoration', status: 'Confirmed', amount: 8000000 },
  { id: 'WO-004', name: 'Andi & Putri', phone: '0815-4567-8901', date: '18 Jul 2026', service: 'Catering', status: 'In Progress', amount: 12000000 },
]

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Bookings() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Semua')
  const [showConfetti, setShowConfetti] = useState(false)  // ⭐ STATE CONFETTI

  const filtered = allBookings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search)
    const matchFilter = filter === 'Semua' || b.status === filter
    return matchSearch && matchFilter
  })

  // Fungsi untuk handle tambah pemesanan
  const handleAddBooking = () => {
    setShowConfetti(true)  // ⭐ TAMPILKAN CONFETTI
    // ... logika tambah pemesanan
  }

  // Tabel columns
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Klien' },
    { key: 'phone', label: 'No. HP' },
    { key: 'date', label: 'Tanggal' },
    { key: 'service', label: 'Layanan' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => {
        const colors = {
          'Confirmed': { bg: '#d1fae5', color: '#065f46' },
          'Pending': { bg: '#fef3c7', color: '#92400e' },
          'In Progress': { bg: '#e6e6ff', color: '#0000cc' }
        }
        return <span style={{ ...colors[val], padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600 }}>{val}</span>
      }
    },
    { key: 'amount', label: 'Total', render: (val) => <span style={{ color: '#0000ff', fontWeight: 600 }}>{fmt(val)}</span> },
    { 
      key: 'actions', 
      label: 'Aksi',
      render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm">Edit</Button>
          <Button variant="danger" size="sm">Hapus</Button>
        </div>
      )
    }
  ]

  return (
    <div>
      {/* CONFETTI */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <PageHeader 
        title="Pemesanan" 
        subtitle="Kelola semua pemesanan klien"
        action="+ Tambah"
        onAction={handleAddBooking}  // ⭐ PAKAI CONFETTI
      />

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <InputField
          placeholder="Cari nama atau ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon="🔍"
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {['Semua', 'Confirmed', 'Pending', 'In Progress'].map(s => (
            <Button
              key={s}
              variant={filter === s ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <Table columns={columns} data={filtered} />
    </div>
  )
}