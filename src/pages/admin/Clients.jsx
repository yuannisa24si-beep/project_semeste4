// src/pages/admin/Clients.jsx
import { useState } from 'react'
import Modal from '../../components/Modal'

const initialClients = [
  { id: 1, name: 'Andhie & Yasmin', email: 'andhie@email.com', phone: '0812-3456-7890', date: '2026-06-12', package: 'Full Package', total: 15000000 },
  { id: 2, name: 'Budi & Sari', email: 'budi@email.com', phone: '0813-2345-6789', date: '2026-06-20', package: 'Photography', total: 4000000 },
  { id: 3, name: 'Rizky & Amanda', email: 'rizky@email.com', phone: '0814-5678-9012', date: '2026-07-05', package: 'Decoration', total: 6500000 },
  { id: 4, name: 'Dimas & Nur Hidayah', email: 'dimas@email.com', phone: '0815-6789-0123', date: '2026-07-18', package: 'Full Package', total: 18000000 },
]

const PACKAGES = ['Full Package', 'Photography', 'Decoration', 'Catering', 'Entertainment']

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

function getInitials(name) {
  const parts = name.split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.slice(0, 2).toUpperCase() || '?'
}

const avatarColors = [
  ['#eef2ff', '#4f46e5'], ['#fdf2f8', '#9d174d'],
  ['#f0fdf4', '#166534'], ['#fff7ed', '#9a3412'], ['#f0f9ff', '#075985'],
]
function getAvatarColor(name) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length]
}

const pkgColor = {
  'Full Package': ['#eef2ff', '#4f46e5'], 'Photography': ['#f0fdf4', '#166534'],
  'Decoration': ['#fff7ed', '#9a3412'], 'Catering': ['#fdf2f8', '#9d174d'],
  'Entertainment': ['#f0f9ff', '#075985'],
}

const empty = { name: '', email: '', phone: '', date: '', package: 'Full Package', total: '' }

// Reusable inline label+input
function Field({ label, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>
        {label} {required && <span style={{ color: '#fa5252' }}>*</span>}
      </label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
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
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>{label}</label>
      <select
        value={value} onChange={onChange}
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

export default function Clients() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)   // null | 'add' | 'edit' | 'detail' | 'delete'
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detail, setDetail] = useState(null)

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setForm(empty); setModal('add') }
  const openEdit = (c, e) => { e.stopPropagation(); setForm({ ...c, total: String(c.total) }); setEditId(c.id); setModal('edit') }
  const openDelete = (c, e) => { e.stopPropagation(); setDeleteTarget(c); setModal('delete') }
  const openDetail = (c) => { setDetail(c); setModal('detail') }
  const close = () => { setModal(null); setEditId(null); setDeleteTarget(null); setDetail(null) }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    const total = parseInt(form.total) || 0
    if (modal === 'add') {
      setClients(prev => [...prev, { ...form, total, id: Date.now() }])
    } else {
      setClients(prev => prev.map(c => c.id === editId ? { ...form, total, id: editId } : c))
    }
    close()
  }

  const handleDelete = () => {
    setClients(prev => prev.filter(c => c.id !== deleteTarget.id))
    close()
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Klien</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Data seluruh klien terdaftar</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(79,70,229,0.3)'
        }}>+ Tambah Klien</button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 340 }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Cari nama atau email..." value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '9px 14px 9px 34px', border: '1px solid #e9ecef',
              borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit',
              background: '#fff', boxSizing: 'border-box'
            }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'}
            onBlur={e => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.length === 0 && (
          <p style={{ color: '#adb5bd', fontSize: 14, gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>Tidak ada klien ditemukan</p>
        )}
        {filtered.map(c => {
          const initials = getInitials(c.name)
          const [bgColor, textColor] = getAvatarColor(c.name)
          const [pkgBg, pkgTxt] = pkgColor[c.package] || ['#f1f3f5', '#495057']
          return (
            <div key={c.id} onClick={() => openDetail(c)} style={{
              background: '#fff', borderRadius: 12, padding: 20,
              border: '1px solid #e9ecef', cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#c5c8ff' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e9ecef' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: bgColor, color: textColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, flexShrink: 0, border: `2px solid ${textColor}22`
                }}>{initials}</div>
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: '#868e96', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#495057' }}>
                <span>📞 {c.phone}</span>
                <span>📅 {c.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f3f5' }}>
                <span style={{ background: pkgBg, color: pkgTxt, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 50 }}>{c.package}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#4f46e5' }}>{fmt(c.total)}</span>
              </div>
              {/* Edit / Delete buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={e => openEdit(c, e)} style={{
                  flex: 1, padding: '7px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                  border: '1px solid #e9ecef', background: '#f8f9fa', color: '#495057', cursor: 'pointer'
                }}>Edit</button>
                <button onClick={e => openDelete(c, e)} style={{
                  flex: 1, padding: '7px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                  border: '1px solid #ffe3e3', background: '#fff5f5', color: '#e03131', cursor: 'pointer'
                }}>Hapus</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Tambah / Edit */}
      <Modal
        isOpen={modal === 'add' || modal === 'edit'}
        onClose={close}
        title={modal === 'add' ? 'Tambah Klien' : 'Edit Klien'}
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleSave} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Simpan</button>
          </>
        }
      >
        <Field label="Nama Pasangan" value={form.name} onChange={set('name')} placeholder="Contoh: Reza & Dina" required />
        <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="email@contoh.com" required />
        <Field label="No. HP" value={form.phone} onChange={set('phone')} placeholder="0812-xxxx-xxxx" />
        <Field label="Tanggal Pernikahan" type="date" value={form.date} onChange={set('date')} />
        <SelectF label="Paket" value={form.package} onChange={set('package')} options={PACKAGES} />
        <Field label="Total (Rp)" type="number" value={form.total} onChange={set('total')} placeholder="15000000" />
      </Modal>

      {/* Modal Detail */}
      <Modal isOpen={modal === 'detail'} onClose={close} title="Detail Klien"
        footer={
          <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tutup</button>
        }
      >
        {detail && (() => {
          const [bgColor, textColor] = getAvatarColor(detail.name)
          return (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: bgColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, margin: '0 auto 10px', border: `3px solid ${textColor}33` }}>
                  {getInitials(detail.name)}
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>{detail.name}</p>
              </div>
              {[['Email', detail.email], ['Telepon', detail.phone], ['Tanggal', detail.date], ['Paket', detail.package], ['Total', fmt(detail.total)]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f3f5', fontSize: 13 }}>
                  <span style={{ color: '#868e96' }}>{l}</span>
                  <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{v}</span>
                </div>
              ))}
            </div>
          )
        })()}
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal isOpen={modal === 'delete'} onClose={close} title="Hapus Klien"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleDelete} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#e03131', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Hapus</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#495057', lineHeight: 1.6 }}>
          Yakin ingin menghapus klien <strong style={{ color: '#1a1a2e' }}>{deleteTarget?.name}</strong>? Tindakan ini tidak bisa dibatalkan.
        </p>
      </Modal>
    </div>
  )
}
