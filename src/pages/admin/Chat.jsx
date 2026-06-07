// src/pages/admin/Chat.jsx
// ✅ useState  : menyimpan pesan, chat aktif, dan input teks
// ✅ useEffect : auto-scroll ke pesan terbaru saat ada pesan baru
// ✅ useRef    : referensi ke elemen bawah chat untuk scroll, dan input untuk auto-focus
import { useState, useEffect, useRef } from 'react'

function getInitials(name) {
  const parts = name.split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0]?.slice(0, 2).toUpperCase() || '?'
}

const avatarColors = [
  ['#eef2ff','#4f46e5'], ['#fdf2f8','#9d174d'],
  ['#f0fdf4','#166534'], ['#fff7ed','#9a3412'], ['#f0f9ff','#075985'],
]

const initialChats = [
  { id: 1, name: 'Andhie & Yasmin', lastMessage: 'Terima kasih banyak!', time: '10:30', unread: 2, online: true },
  { id: 2, name: 'Budi & Sari',     lastMessage: 'Kapan jadwal fitting?', time: 'Kemarin', unread: 0, online: false },
  { id: 3, name: 'Reza & Dina',     lastMessage: 'Dekorasinya bagus!',   time: 'Kemarin', unread: 0, online: true },
  { id: 4, name: 'Andi & Putri',    lastMessage: 'Terima kasih',         time: '2 hari lalu', unread: 0, online: false },
]

const initialMessages = {
  1: [
    { id: 1, sender: 'client', text: 'Halo, saya ingin bertanya tentang paket full package', time: '10:00' },
    { id: 2, sender: 'admin',  text: 'Baik, ada yang bisa saya bantu?', time: '10:05' },
    { id: 3, sender: 'client', text: 'Apakah sudah termasuk dekorasi venue?', time: '10:10' },
    { id: 4, sender: 'admin',  text: 'Iya, Full Package sudah termasuk dekorasi venue, catering untuk 200 tamu, dokumentasi foto & video, dan entertainment', time: '10:15' },
    { id: 5, sender: 'client', text: 'Terima kasih banyak! Saya tertarik', time: '10:20' },
  ],
  2: [
    { id: 1, sender: 'client', text: 'Kapan jadwal fitting baju pengantin?', time: '09:00' },
    { id: 2, sender: 'admin',  text: 'Bisa Sabtu minggu depan jam 10 pagi', time: '09:05' },
  ],
  3: [
    { id: 1, sender: 'client', text: 'Dekorasinya bagus banget!', time: '08:00' },
    { id: 2, sender: 'admin',  text: 'Terima kasih, senang bisa membantu!', time: '08:10' },
  ],
  4: [
    { id: 1, sender: 'admin',  text: 'Selamat atas pernikahan Anda!', time: '07:00' },
    { id: 2, sender: 'client', text: 'Terima kasih', time: '07:05' },
  ],
}

export default function Chat() {
  // ✅ useState — menyimpan chat aktif, semua pesan, dan teks input
  // What  : useState menyimpan state lokal komponen
  // Why   : setiap pergantian chat atau pengiriman pesan harus memicu re-render
  // Who   : admin yang menggunakan fitur chat
  // When  : berubah setiap kali admin ganti chat atau kirim pesan
  // Where : di halaman Chat
  // How   : const [state, setState] = useState(nilaiAwal)
  const [selectedId, setSelectedId]   = useState(1)
  const [messages, setMessages]       = useState(initialMessages)
  const [input, setInput]             = useState('')
  const [chats, setChats]             = useState(initialChats)

  // ✅ useRef — (1) referensi ke div paling bawah area chat untuk auto-scroll
  // What  : useRef menyimpan referensi ke DOM element tanpa memicu re-render
  // Why   : agar chat otomatis scroll ke pesan terbaru saat ada pesan baru
  // Who   : pengguna chat (admin dan klien)
  // When  : setiap kali pesan baru ditambahkan
  // Where : di area scrollable pesan chat
  // How   : ref={bottomRef} + bottomRef.current.scrollIntoView()
  const bottomRef = useRef(null)

  // ✅ useRef — (2) referensi ke input box agar auto-focus saat ganti chat
  // What  : useRef untuk mengakses DOM input secara langsung
  // Why   : UX lebih baik — admin langsung bisa ketik tanpa klik input dulu
  // Who   : admin yang berpindah antar chat
  // When  : setiap kali selectedId berubah
  // Where : di input field bawah area chat
  // How   : inputRef.current.focus() dipanggil di dalam useEffect
  const inputRef  = useRef(null)

  // ✅ useEffect — auto-scroll ke bawah setiap ada pesan baru
  // What  : useEffect menjalankan kode setelah render selesai
  // Why   : scroll manual tidak praktis, harus otomatis ke pesan terbaru
  // Who   : semua pengguna chat
  // When  : setiap kali messages[selectedId] bertambah atau chat berganti
  // Where : area pesan di kanan halaman Chat
  // How   : scrollIntoView({ behavior: 'smooth' }) pada elemen ref di bawah list
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedId])

  // ✅ useEffect — auto-focus input saat ganti chat
  // What  : memindahkan fokus keyboard ke input field
  // Why   : admin tidak perlu klik input dulu setelah pilih chat
  // Who   : admin yang berpindah antar percakapan
  // When  : setiap kali selectedId berubah
  // Where : input box di bawah area chat
  // How   : inputRef.current.focus() dipanggil setelah render
  useEffect(() => {
    inputRef.current?.focus()
    // tandai pesan sebagai sudah dibaca
    setChats(prev => prev.map(c => c.id === selectedId ? { ...c, unread: 0 } : c))
  }, [selectedId])

  const selectedChat = chats.find(c => c.id === selectedId)
  const currentMessages = messages[selectedId] || []

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = {
      id: Date.now(), sender: 'admin', text: input,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), newMsg] }))
    setChats(prev => prev.map(c => c.id === selectedId ? { ...c, lastMessage: input, time: 'Baru saja' } : c))
    setInput('')
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>Pesan</h1>
        <p style={{ fontSize: 13, color: '#868e96' }}>Komunikasi dengan klien</p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '300px 1fr',
        background: '#fff', borderRadius: 12, border: '1px solid #e9ecef',
        overflow: 'hidden', minHeight: 520, boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}>
        {/* Sidebar chat list */}
        <div style={{ borderRight: '1px solid #e9ecef', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid #e9ecef' }}>
            <input placeholder="Cari percakapan..." style={{
              width: '100%', padding: '8px 12px', border: '1px solid #e9ecef',
              borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
            }}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {chats.map(chat => {
              const [bg, fg] = avatarColors[chat.id % avatarColors.length]
              const isActive = selectedId === chat.id
              return (
                <div key={chat.id} onClick={() => setSelectedId(chat.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 14px', borderBottom: '1px solid #f1f3f5', cursor: 'pointer',
                  background: isActive ? '#eef2ff' : '#fff', transition: 'background 0.15s'
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8f9fa' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = '#fff' }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%', background: bg, color: fg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 12
                    }}>{getInitials(chat.name)}</div>
                    {chat.online && (
                      <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '2px solid #fff' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</p>
                      <span style={{ fontSize: 10, color: '#adb5bd', flexShrink: 0, marginLeft: 6 }}>{chat.time}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 12, color: '#868e96', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span style={{ background: '#4f46e5', color: '#fff', borderRadius: 50, padding: '2px 6px', fontSize: 10, fontWeight: 700, flexShrink: 0, marginLeft: 4 }}>{chat.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Area chat */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Chat header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #e9ecef', display: 'flex', alignItems: 'center', gap: 10 }}>
            {(() => {
              const [bg, fg] = avatarColors[selectedId % avatarColors.length]
              return (
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {getInitials(selectedChat?.name || '')}
                </div>
              )
            })()}
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{selectedChat?.name}</p>
              <p style={{ fontSize: 12, color: selectedChat?.online ? '#10b981' : '#adb5bd' }}>
                {selectedChat?.online ? '● Online' : '○ Offline'}
              </p>
            </div>
          </div>

          {/* Pesan — useRef bottomRef */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', maxHeight: 380, minHeight: 380, background: '#fafafa' }}>
            {currentMessages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                <div style={{
                  maxWidth: '70%', padding: '10px 14px', borderRadius: 12,
                  background: msg.sender === 'admin' ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : '#fff',
                  color: msg.sender === 'admin' ? '#fff' : '#1a1a2e',
                  border: msg.sender === 'admin' ? 'none' : '1px solid #e9ecef',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>
                  <p style={{ fontSize: 13, lineHeight: 1.5 }}>{msg.text}</p>
                  <p style={{ fontSize: 10, marginTop: 4, color: msg.sender === 'admin' ? 'rgba(255,255,255,0.65)' : '#adb5bd', textAlign: 'right' }}>{msg.time}</p>
                </div>
              </div>
            ))}
            {/* useRef — div kosong sebagai target scrollIntoView */}
            <div ref={bottomRef} />
          </div>

          {/* Input pesan — useRef inputRef di sini */}
          <form onSubmit={sendMessage} style={{ padding: '12px 14px', borderTop: '1px solid #e9ecef', display: 'flex', gap: 10 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              style={{
                flex: 1, padding: '10px 14px', border: '1px solid #e9ecef',
                borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit'
              }}
              onFocus={e => e.target.style.borderColor = '#4f46e5'}
              onBlur={e => e.target.style.borderColor = '#e9ecef'}
            />
            <button type="submit" style={{
              padding: '0 18px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
              color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'inherit'
            }}>Kirim</button>
          </form>
        </div>
      </div>
    </div>
  )
}
