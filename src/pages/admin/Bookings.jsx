// src/pages/admin/Bookings.jsx
import { useState } from 'react'
import Modal from '../../components/Modal'
import Confetti from '../../components/Confetti'

const initialBookings = [
  { id: 'WO-001', name: 'Andhie & Yasmin', phone: '0812-3456-7890', date: '2026-06-12', service: 'Full Package', status: 'Confirmed', amount: 15000000 },
  { id: 'WO-002', name: 'Budi & Sari',     phone: '0813-2345-6789', date: '2026-06-20', service: 'Photography',  status: 'Pending',    amount: 4000000  },
  { id: 'WO-003', name: 'Reza & Dina',     phone: '0814-3456-7890', date: '2026-07-05', service: 'Decoration',   status: 'Confirmed',  amount: 8000000  },
  { id: 'WO-004', name: 'Andi & Putri',    phone: '0815-4567-8901', date: '2026-07-18', service: 'Catering',     status: 'In Progress',amount: 12000000 },
]

const SERVICES = ['Full Package', 'Photography', 'Decoration', 'Catering', 'Entertainment']
const STATUSES = ['Pending', 'Confirmed', 'In Progress', 'Done', 'Cancelled']
const FILTERS  = ['Semua', 'Confirmed', 'Pending', 'In Progress', 'Done', 'Cancelled']

const statusStyle = {
  'Confirmed':   { bg: '#d1fae5', color: '#065f46' },
  'Pending':     { bg: '#fef3c7', color: '#92400e' },
  'In Progress': { bg: '#eef2ff', color: '#3730a3' },
  'Done':        { bg: '#f0fdf4', color: '#166534' },
  'Cancelled':   { bg: '#fff1f2', color: '#be123c' },
}

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

let idCounter = 5
function genId() { return `WO-${String(idCounter++).padStart(3, '0')}` }

const empty = { name: '', phone: '', date: '', service: 'Full Package', status: 'Pending', amount: '' }

function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>
        {label}{required && <span style={{ color: '#fa5252' }}> *</span>}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: '100%', padding: '9px 12px', boxSizing: 'border-box',
          border: `1.5px solid ${focused ? '#4f46e5' : '#dee2e6'}`,
          borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit'
        }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function SelectF({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>{label}</label>
      <select value={value} onChange={onChange}
        style={{
          width: '100%', padding: '9px 12px', boxSizing: 'border-box',
          border: `1.5px solid ${focused ? '#4f46e5' : '#dee2e6'}`,
          borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit',
          background: '#fff', cursor: 'pointer'
        }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('Semua')
  const [modal, setModal]       = useState(null)  // null | 'add' | 'edit' | 'delete' | 'detail'
  const [form, setForm]         = useState(empty)
  const [editId, setEditId]     = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detail, setDetail]     = useState(null)
  const [confetti, setConfetti] = useState(false)

  const filtered = bookings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search)
    const matchFilter = filter === 'Semua' || b.status === filter
    return matchSearch && matchFilter
  })

  const openAdd    = () => { setForm(empty); setModal('add') }
  const openEdit   = (b) => { setForm({ ...b, amount: String(b.amount) }); setEditId(b.id); setModal('edit') }
  const openDelete = (b) => { setDeleteTarget(b); setModal('delete') }
  const openDetail = (b) => { setDetail(b); setModal('detail') }
  const close      = () => { setModal(null); setEditId(null); setDeleteTarget(null); setDetail(null) }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.name.trim()) return
    const amount = parseInt(form.amount) || 0
    if (modal === 'add') {
      setBookings(prev => [...prev, { ...form, amount, id: genId() }])
      setConfetti(true)
    } else {
      setBookings(prev => prev.map(b => b.id === editId ? { ...form, amount, id: editId } : b))
    }
    close()
  }

  const handleDelete = () => {
    setBookings(prev => prev.filter(b => b.id !== deleteTarget.id))
    close()
  }

  return (
    <div>
      <Confetti active={confetti} onComplete={() => setConfetti(false)} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Pemesanan</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Kelola semua pemesanan klien</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(79,70,229,0.3)'
        }}>+ Tambah Pemesanan</button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Cari nama atau ID..." value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: 240, padding: '9px 14px 9px 34px', border: '1px solid #e9ecef',
              borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff'
            }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'}
            onBlur={e => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer',
              border: filter === s ? 'none' : '1px solid #e9ecef',
              background: filter === s ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#fff',
              color: filter === s ? '#fff' : '#495057', transition: 'all 0.15s'
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['ID', 'Klien', 'No. HP', 'Tanggal', 'Layanan', 'Status', 'Total', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#868e96', letterSpacing: 0.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>Tidak ada data</td></tr>
            ) : filtered.map((b, i) => {
              const st = statusStyle[b.status] || { bg: '#f1f3f5', color: '#495057' }
              return (
                <tr key={b.id} onClick={() => openDetail(b)} style={{
                  borderTop: '1px solid #f1f3f5', cursor: 'pointer', transition: 'background 0.12s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#868e96', fontWeight: 600 }}>{b.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{b.name}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057' }}>{b.phone}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057', whiteSpace: 'nowrap' }}>{b.date}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057' }}>{b.service}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ ...st, padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#4f46e5', whiteSpace: 'nowrap' }}>{fmt(b.amount)}</td>
                  <td style={{ padding: '12px 14px' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(b)} style={{
                        padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                        border: '1px solid #e9ecef', background: '#f8f9fa', color: '#495057', cursor: 'pointer'
                      }}>Edit</button>
                      <button onClick={() => openDelete(b)} style={{
                        padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                        border: '1px solid #ffe3e3', background: '#fff5f5', color: '#e03131', cursor: 'pointer'
                      }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {filtered.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#868e96', padding: '0 4px' }}>
          <span>{filtered.length} pemesanan</span>
          <span>Total: <strong style={{ color: '#4f46e5' }}>{fmt(filtered.reduce((a, b) => a + b.amount, 0))}</strong></span>
        </div>
      )}

      {/* Modal Tambah / Edit */}
      <Modal
        isOpen={modal === 'add' || modal === 'edit'}
        onClose={close}
        title={modal === 'add' ? 'Tambah Pemesanan' : 'Edit Pemesanan'}
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleSave} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Simpan</button>
          </>
        }
      >
        <Field label="Nama Pasangan" value={form.name} onChange={set('name')} placeholder="Contoh: Reza & Dina" required />
        <Field label="No. HP" value={form.phone} onChange={set('phone')} placeholder="0812-xxxx-xxxx" />
        <Field label="Tanggal" type="date" value={form.date} onChange={set('date')} />
        <SelectF label="Layanan" value={form.service} onChange={set('service')} options={SERVICES} />
        <SelectF label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        <Field label="Total (Rp)" type="number" value={form.amount} onChange={set('amount')} placeholder="15000000" />
      </Modal>

      {/* Modal Detail */}
      <Modal isOpen={modal === 'detail'} onClose={close} title="Detail Pemesanan"
        footer={
          <>
            <button onClick={() => { close(); setTimeout(() => openEdit(detail), 50) }} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>
          </>
        }
      >
        {detail && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #f1f3f5' }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>{detail.name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, background: '#f1f3f5', color: '#868e96', padding: '3px 10px', borderRadius: 50 }}>{detail.id}</span>
            </div>
            {[['Telepon', detail.phone], ['Tanggal', detail.date], ['Layanan', detail.service], ['Total', fmt(detail.amount)]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f3f5', fontSize: 13 }}>
                <span style={{ color: '#868e96' }}>{l}</span>
                <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 13 }}>
              <span style={{ color: '#868e96' }}>Status</span>
              <span style={{ ...statusStyle[detail.status], padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{detail.status}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal isOpen={modal === 'delete'} onClose={close} title="Hapus Pemesanan"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleDelete} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#e03131', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Hapus</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#495057', lineHeight: 1.6 }}>
          Yakin ingin menghapus pemesanan <strong style={{ color: '#1a1a2e' }}>{deleteTarget?.name}</strong> ({deleteTarget?.id})? Tindakan ini tidak bisa dibatalkan.
        </p>
      </Modal>
    </div>
  )
}
