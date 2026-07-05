// src/pages/admin/Invoice.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Modal from '../../components/Modal'

const PACKAGES = ['Full Package', 'Photography', 'Decoration', 'Catering', 'Entertainment']
const STATUSES = ['Paid', 'Pending', 'Overdue']

const fmt = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const empty = { client: '', date: '', amount: '', status: 'Pending', package: 'Full Package' }

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
          border: `1.5px solid ${focused ? '#0000ff' : '#dee2e6'}`,
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
          border: `1.5px solid ${focused ? '#0000ff' : '#dee2e6'}`,
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

export default function Invoice() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)   // null | 'add' | 'status'
  const [form, setForm] = useState(empty)
  const [statusTarget, setStatusTarget] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('invoices').select('*').order('id', { ascending: true })
    if (!error) setInvoices(data || [])
    setLoading(false)
  }

  const filtered = invoices.filter(i =>
    (i.client || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.id).toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((a, b) => a + (b.amount || 0), 0)
  const paidCount = invoices.filter(i => i.status === 'Paid').length
  const pendingCount = invoices.filter(i => i.status === 'Pending').length

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const openAdd = () => { setForm(empty); setModal('add') }
  const close = () => { setModal(null); setStatusTarget(null); setNewStatus('') }

  const handleAdd = async () => {
    if (!form.client.trim()) return
    setSaving(true)
    const payload = {
      client: form.client,
      date: form.date,
      amount: parseInt(form.amount) || 0,
      status: form.status,
      package: form.package,
    }
    const { data, error } = await supabase.from('invoices').insert([payload]).select().single()
    if (!error && data) setInvoices(prev => [...prev, data])
    setSaving(false)
    close()
  }

  const openStatusEdit = (inv) => {
    setStatusTarget(inv)
    setNewStatus(inv.status)
    setModal('status')
  }

  const handleUpdateStatus = async () => {
    if (!statusTarget) return
    setSaving(true)
    const { error } = await supabase.from('invoices').update({ status: newStatus }).eq('id', statusTarget.id)
    if (!error) {
      setInvoices(prev => prev.map(i => i.id === statusTarget.id ? { ...i, status: newStatus } : i))
    }
    setSaving(false)
    close()
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <p style={{ color: '#868e96', fontSize: 14 }}>Memuat data...</p>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>Invoice</h1>
          <p style={{ fontSize: 14, color: '#666666' }}>Invoice & Payment Details</p>
        </div>
        <button onClick={openAdd} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 14,
          background: '#0000ff', color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500
        }}>+ Tambah Invoice</button>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20, marginBottom: 24
      }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Total Revenue (Paid)</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#0000ff' }}>{fmt(totalRevenue)}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Paid Invoices</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>{paidCount}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Pending</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>{pendingCount}</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search invoice by client or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', boxSizing: 'border-box',
            border: '1px solid #d3d3d3', borderRadius: 8,
            fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
          }}
          onFocus={e => e.target.style.borderColor = '#0000ff'}
          onBlur={e => e.target.style.borderColor = '#d3d3d3'}
        />
      </div>

      {/* Invoice Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Invoice ID</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Client</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Package</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Amount</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>
                  Belum ada invoice
                </td>
              </tr>
            )}
            {filtered.map(inv => (
              <tr key={inv.id} style={{ borderTop: '1px solid #d3d3d3' }}>
                <td style={{ padding: 12, fontSize: 13, color: '#495057' }}>#{inv.id}</td>
                <td style={{ padding: 12, fontWeight: 500, fontSize: 14 }}>{inv.client}</td>
                <td style={{ padding: 12, fontSize: 13 }}>{inv.date}</td>
                <td style={{ padding: 12, fontSize: 13 }}>{inv.package}</td>
                <td style={{ padding: 12, fontWeight: 600, color: '#0000ff' }}>{fmt(inv.amount)}</td>
                <td style={{ padding: 12 }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600,
                    background: inv.status === 'Paid' ? '#d1fae5' : inv.status === 'Overdue' ? '#fee2e2' : '#fef3c7',
                    color: inv.status === 'Paid' ? '#065f46' : inv.status === 'Overdue' ? '#b91c1c' : '#92400e'
                  }}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <button onClick={() => openStatusEdit(inv)} style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                    background: '#e6e6ff', color: '#0000ff', border: 'none', cursor: 'pointer'
                  }}>
                    Ubah Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Invoice */}
      <Modal
        isOpen={modal === 'add'}
        onClose={close}
        title="Tambah Invoice"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleAdd} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#0000ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </>
        }
      >
        <Field label="Nama Klien" value={form.client} onChange={set('client')} placeholder="Contoh: Reza & Dina" required />
        <Field label="Tanggal" type="date" value={form.date} onChange={set('date')} />
        <Field label="Jumlah (Rp)" type="number" value={form.amount} onChange={set('amount')} placeholder="15000000" />
        <SelectF label="Paket" value={form.package} onChange={set('package')} options={PACKAGES} />
        <SelectF label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
      </Modal>

      {/* Modal Ubah Status */}
      <Modal
        isOpen={modal === 'status'}
        onClose={close}
        title="Ubah Status Invoice"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleUpdateStatus} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#0000ff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: '#495057', marginBottom: 14 }}>
          Klien: <strong>{statusTarget?.client}</strong>
        </p>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 5 }}>Status Baru</label>
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
            style={{
              width: '100%', padding: '9px 12px', boxSizing: 'border-box',
              border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none',
              fontFamily: 'inherit', background: '#fff', cursor: 'pointer'
            }}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </Modal>
    </div>
  )
}
