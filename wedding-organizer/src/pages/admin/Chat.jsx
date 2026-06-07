// src/pages/admin/Chat.jsx
import { useState } from 'react'

const chats = [
  { id: 1, name: 'Andhie & Yasmin', lastMessage: 'Terima kasih banyak!', time: '10:30 AM', unread: 2, avatar: '💑', online: true },
  { id: 2, name: 'Budi & Sari', lastMessage: 'Kapan jadwal fitting?', time: 'Yesterday', unread: 0, avatar: '💍', online: false },
  { id: 3, name: 'Reza & Dina', lastMessage: 'Dekorasinya bagus!', time: 'Yesterday', unread: 0, avatar: '🤵', online: true },
  { id: 4, name: 'Andi & Putri', lastMessage: 'Terima kasih', time: '2 days ago', unread: 0, avatar: '👰', online: false },
]

const messages = [
  { id: 1, sender: 'client', text: 'Halo, saya ingin bertanya tentang paket full package', time: '10:00 AM' },
  { id: 2, sender: 'admin', text: 'Baik, ada yang bisa saya bantu?', time: '10:05 AM' },
  { id: 3, sender: 'client', text: 'Apakah sudah termasuk dekorasi venue?', time: '10:10 AM' },
  { id: 4, sender: 'admin', text: 'Iya, Full Package sudah termasuk dekorasi venue, catering untuk 200 tamu, dokumentasi foto & video, dan entertainment', time: '10:15 AM' },
  { id: 5, sender: 'client', text: 'Terima kasih banyak! Saya tertarik', time: '10:20 AM' },
  { id: 6, sender: 'admin', text: 'Siap! Saya akan kirimkan detail proposalnya', time: '10:25 AM' },
]

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [newMessage, setNewMessage] = useState('')
  const [messageList, setMessageList] = useState(messages)

  const sendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setMessageList([
      ...messageList,
      {
        id: Date.now(),
        sender: 'admin',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
    setNewMessage('')
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Pesan
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Komunikasi dengan klien</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 20,
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        overflow: 'hidden',
        minHeight: 500
      }}>
        {/* Chat List */}
        <div style={{ borderRight: '1px solid #d3d3d3' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #d3d3d3' }}>
            <input
              placeholder="Search conversation..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d3d3d3',
                borderRadius: 8,
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>
          <div>
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderBottom: '1px solid #d3d3d3',
                  cursor: 'pointer',
                  background: selectedChat?.id === chat.id ? '#e6e6ff' : '#fff',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 40 }}>{chat.avatar}</span>
                  {chat.online && (
                    <span style={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#10b981',
                      border: '2px solid #fff'
                    }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#000000' }}>{chat.name}</p>
                    <span style={{ fontSize: 11, color: '#999999' }}>{chat.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 12, color: '#666666' }}>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span style={{
                        background: '#0000ff',
                        color: '#fff',
                        borderRadius: 50,
                        padding: '2px 6px',
                        fontSize: 10,
                        fontWeight: 600
                      }}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #d3d3d3',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span style={{ fontSize: 40 }}>{selectedChat?.avatar}</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#000000' }}>{selectedChat?.name}</p>
              <p style={{ fontSize: 12, color: selectedChat?.online ? '#10b981' : '#999999' }}>
                {selectedChat?.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', minHeight: 400, maxHeight: 400 }}>
            {messageList.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  marginBottom: 16
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: msg.sender === 'admin' ? '#0000ff' : '#f3f4f6',
                  color: msg.sender === 'admin' ? '#fff' : '#000000'
                }}>
                  <p style={{ fontSize: 14 }}>{msg.text}</p>
                  <p style={{
                    fontSize: 10,
                    marginTop: 4,
                    color: msg.sender === 'admin' ? 'rgba(255,255,255,0.7)' : '#999999'
                  }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} style={{
            padding: '16px',
            borderTop: '1px solid #d3d3d3',
            display: 'flex',
            gap: 12
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #d3d3d3',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0 20px',
                borderRadius: 8,
                background: '#0000ff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}