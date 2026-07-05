// src/pages/admin/Bookings.jsx
import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import Confetti from '../../components/Confetti'
import { supabase } from '../../lib/supabase'

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
const empty = { name: '', phone: '', date: '', service: '', status: 'Pending', amount: '' }

function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>
        {label}{required && <span style={{ color: '#fa5252' }}> *</span>}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', boxSizing: 'border-box', border: `1.5px solid ${focused ? '#4f46e5' : '#dee2e6'}`, borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
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
        style={{ width: '100%', padding: '9px 12px', boxSizing: 'border-box', border: `1.5px solid ${focused ? '#4f46e5' : '#dee2e6'}`, borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('Semua')
  const [modal, setModal]       = useState(null)
  const [form, setForm]         = useState(empty)
  const [editId, setEditId]     = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detail, setDetail]     = useState(null)
  const [confetti, setConfetti] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [servicesList, setServicesList] = useState([])

  // Fetch dari Supabase
  useEffect(() => {
    fetchBookings()
    // Ambil layanan aktif dari tabel services
    supabase.from('services').select('id,name').eq('status', 'Aktif').order('created_at', { ascending: true })
      .then(({ data }) => setServicesList(data || []))
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    setBookings(data || [])
    setLoading(false)
  }

  const filtered = bookings.filter(b => {
    const matchSearch = b.name?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Semua' || b.status === filter
    return matchSearch && matchFilter
  })

  const openAdd    = () => { setForm({ ...empty, service: servicesList[0]?.name || '' }); setModal('add') }
  const openEdit   = (b) => { setForm({ ...b, amount: String(b.amount) }); setEditId(b.id); setModal('edit') }
  const openDelete = (b) => { setDeleteTarget(b); setModal('delete') }
  const openDetail = (b) => { setDetail(b); setModal('detail') }
  const close      = () => { setModal(null); setEditId(null); setDeleteTarget(null); setDetail(null) }

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    const payload = { name: form.name, phone: form.phone, date: form.date, service: form.service, status: form.status, amount: parseInt(form.amount) || 0 }

    if (modal === 'add') {
      await supabase.from('bookings').insert([payload])
      setConfetti(true)
    } else {
      await supabase.from('bookings').update(payload).eq('id', editId)
    }
    setSaving(false)
    close()
    fetchBookings()
  }

  const handleDelete = async () => {
    await supabase.from('bookings').delete().eq('id', deleteTarget.id)
    close()
    fetchBookings()
  }

  return (
    <div>
      <Confetti active={confetti} onComplete={() => setConfetti(false)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Pemesanan</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Kelola semua pemesanan klien</p>
        </div>
        <button onClick={openAdd} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>+ Tambah Pemesanan</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Cari nama..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: 240, padding: '9px 14px 9px 34px', border: '1px solid #e9ecef', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff' }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'} onBlur={e => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: filter === s ? 'none' : '1px solid #e9ecef', background: filter === s ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#fff', color: filter === s ? '#fff' : '#495057' }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Klien', 'No. HP', 'Tanggal', 'Layanan', 'Status', 'Total', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#868e96', letterSpacing: 0.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>Memuat data...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>Tidak ada data</td></tr>
            ) : filtered.map(b => {
              const st = statusStyle[b.status] || { bg: '#f1f3f5', color: '#495057' }
              return (
                <tr key={b.id} onClick={() => openDetail(b)} style={{ borderTop: '1px solid #f1f3f5', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{b.name}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057' }}>{b.phone}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057', whiteSpace: 'nowrap' }}>{b.date}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#495057' }}>{b.service}</td>
                  <td style={{ padding: '12px 14px' }}><span style={{ background: st.bg, color: st.color, padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{b.status}</span></td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700, color: '#4f46e5', whiteSpace: 'nowrap' }}>{fmt(b.amount)}</td>
                  <td style={{ padding: '12px 14px' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(b)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid #e9ecef', background: '#f8f9fa', color: '#495057', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => openDelete(b)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid #ffe3e3', background: '#fff5f5', color: '#e03131', cursor: 'pointer' }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#868e96', padding: '0 4px' }}>
          <span>{filtered.length} pemesanan</span>
          <span>Total: <strong style={{ color: '#4f46e5' }}>{fmt(filtered.reduce((a, b) => a + (b.amount || 0), 0))}</strong></span>
        </div>
      )}

      {/* Modal Tambah/Edit */}
      <Modal isOpen={modal === 'add' || modal === 'edit'} onClose={close} title={modal === 'add' ? 'Tambah Pemesanan' : 'Edit Pemesanan'}
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleSave} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </>
        }
      >
        <Field label="Nama Pasangan" value={form.name} onChange={set('name')} placeholder="Contoh: Reza & Dina" required />
        <Field label="No. HP" value={form.phone} onChange={set('phone')} placeholder="0812-xxxx-xxxx" />
        <Field label="Tanggal" type="date" value={form.date} onChange={set('date')} />
        <div style={{ marginBottom: 13 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>Layanan</label>
          <select value={form.service} onChange={set('service')}
            style={{ width: '100%', padding: '9px 12px', boxSizing: 'border-box', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor='#4f46e5'} onBlur={e => e.target.style.borderColor='#dee2e6'}
          >
            <option value="">-- Pilih layanan --</option>
            {servicesList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
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
            <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>{detail.name}</p>
            {[['Telepon', detail.phone], ['Tanggal', detail.date], ['Layanan', detail.service], ['Total', fmt(detail.amount)]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f3f5', fontSize: 13 }}>
                <span style={{ color: '#868e96' }}>{l}</span><span style={{ fontWeight: 600, color: '#1a1a2e' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 13 }}>
              <span style={{ color: '#868e96' }}>Status</span>
              <span style={{ ...(statusStyle[detail.status] || {}), padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{detail.status}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Hapus */}
      <Modal isOpen={modal === 'delete'} onClose={close} title="Hapus Pemesanan"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleDelete} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#e03131', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Hapus</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#495057', lineHeight: 1.6 }}>Yakin hapus pemesanan <strong>{deleteTarget?.name}</strong>? Tindakan ini tidak bisa dibatalkan.</p>
      </Modal>
    </div>
  )
}
