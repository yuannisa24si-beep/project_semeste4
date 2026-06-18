// src/pages/admin/Users.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Modal from '../../components/Modal'

function getInitials(name) {
  if (!name) return '?'
  const parts = name.split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.slice(0, 2).toUpperCase() || '?'
}

const avatarColors = [
  ['#eef2ff', '#4f46e5'], ['#fdf2f8', '#9d174d'],
  ['#f0fdf4', '#166534'], ['#fff7ed', '#9a3412'], ['#f0f9ff', '#075985'],
]
function getAvatarColor(str) {
  return avatarColors[(str?.charCodeAt(0) || 0) % avatarColors.length]
}

export default function Users() {
  const [users, setUsers]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(null)  // null | 'edit' | 'delete'
  const [selected, setSelected]   = useState(null)
  const [newRole, setNewRole]     = useState('guest')
  const [saving, setSaving]       = useState(false)
  const [search, setSearch]       = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, created_at')
      .order('created_at', { ascending: false })
    setUsers(data || [])
    setLoading(false)
  }

  const openEdit = (u) => { setSelected(u); setNewRole(u.role); setModal('edit') }
  const openDelete = (u) => { setSelected(u); setModal('delete') }
  const close = () => { setModal(null); setSelected(null) }

  const handleUpdateRole = async () => {
    setSaving(true)
    await supabase.from('profiles').update({ role: newRole }).eq('id', selected.id)
    setSaving(false)
    close()
    fetchUsers()
  }

  const handleDelete = async () => {
    // Hapus dari profiles dulu, lalu auth.users via admin API tidak bisa dari frontend
    // Kita update role jadi 'banned' atau hapus profile saja
    await supabase.from('profiles').delete().eq('id', selected.id)
    close()
    fetchUsers()
  }

  const filtered = users.filter(u =>
    (u.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Data User</h1>
          <p style={{ fontSize: 13, color: '#868e96' }}>Kelola semua pengguna terdaftar</p>
        </div>
        <div style={{ background: '#eef2ff', borderRadius: 10, padding: '10px 16px', textAlign: 'right' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#4f46e5', lineHeight: 1.2 }}>{users.length}</p>
          <p style={{ fontSize: 11, color: '#868e96' }}>Total User</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 340 }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Cari nama atau role..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 14px 9px 34px', border: '1px solid #e9ecef', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#4f46e5'}
            onBlur={e => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['User', 'Role', 'Bergabung', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#868e96', letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>Memuat data...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: '#adb5bd', fontSize: 14 }}>Tidak ada user</td></tr>
            ) : filtered.map(u => {
              const [bg, fg] = getAvatarColor(u.full_name || u.id)
              const isAdmin = u.role === 'admin'
              return (
                <tr key={u.id} style={{ borderTop: '1px solid #f1f3f5', transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                        {getInitials(u.full_name)}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{u.full_name || 'Tanpa Nama'}</p>
                        <p style={{ fontSize: 11, color: '#adb5bd' }}>{u.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700,
                      background: isAdmin ? '#eef2ff' : '#f8f9fa',
                      color: isAdmin ? '#4f46e5' : '#868e96'
                    }}>
                      {isAdmin ? 'Admin' : 'Guest'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#868e96' }}>
                    {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(u)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid #e9ecef', background: '#f8f9fa', color: '#495057', cursor: 'pointer' }}>
                        Edit Role
                      </button>
                      <button onClick={() => openDelete(u)} style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid #ffe3e3', background: '#fff5f5', color: '#e03131', cursor: 'pointer' }}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p style={{ marginTop: 10, fontSize: 12, color: '#adb5bd', padding: '0 4px' }}>
          {filtered.length} user ditampilkan · {users.filter(u => u.role === 'admin').length} admin · {users.filter(u => u.role === 'guest').length} guest
        </p>
      )}

      {/* Modal Edit Role */}
      <Modal isOpen={modal === 'edit'} onClose={close} title="Edit Role User"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleUpdateRole} disabled={saving} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </>
        }
      >
        {selected && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '12px', background: '#f8f9fa', borderRadius: 10 }}>
              {(() => {
                const [bg, fg] = getAvatarColor(selected.full_name || selected.id)
                return (
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                    {getInitials(selected.full_name)}
                  </div>
                )
              })()}
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{selected.full_name || 'Tanpa Nama'}</p>
                <p style={{ fontSize: 12, color: '#868e96' }}>Role saat ini: <strong>{selected.role}</strong></p>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#495057', marginBottom: 8 }}>Ubah Role</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['guest', 'admin'].map(r => (
                  <button key={r} onClick={() => setNewRole(r)} style={{
                    flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: `2px solid ${newRole === r ? '#4f46e5' : '#e9ecef'}`,
                    background: newRole === r ? '#eef2ff' : '#fff',
                    color: newRole === r ? '#4f46e5' : '#868e96',
                    transition: 'all 0.15s'
                  }}>
                    {r === 'admin' ? '👑 Admin' : '👤 Guest'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Hapus */}
      <Modal isOpen={modal === 'delete'} onClose={close} title="Hapus User"
        footer={
          <>
            <button onClick={close} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e9ecef', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Batal</button>
            <button onClick={handleDelete} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#e03131', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Hapus</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#495057', lineHeight: 1.6 }}>
          Yakin ingin menghapus user <strong style={{ color: '#1a1a2e' }}>{selected?.full_name || 'ini'}</strong>? Data profile akan dihapus permanen.
        </p>
      </Modal>
    </div>
  )
}
