// src/components/Confetti.jsx
import { useEffect, useState } from 'react'

export default function Confetti({ active, onComplete, duration = 3000 }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) return

    // Buat 100 potongan confetti
    const colors = ['#0000ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']
    const newPieces = []

    for (let i = 0; i < 150; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100, // posisi horizontal (%)
        delay: Math.random() * 0.5, // delay animasi
        duration: 1 + Math.random() * 2, // durasi jatuh
        size: 5 + Math.random() * 10, // ukuran
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? '⬤' : '◆'
      })
    }
    setPieces(newPieces)

    // Hentikan confetti setelah durasi
    const timer = setTimeout(() => {
      setPieces([])
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [active, duration, onComplete])

  if (!active || pieces.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {pieces.map(piece => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: '-20px',
            fontSize: `${piece.size}px`,
            color: piece.color,
            animation: `confettiFall ${piece.duration}s linear ${piece.delay}s forwards`,
            transform: 'rotate(0deg)'
          }}
        >
          {piece.shape}
        </div>
      ))}
      <style>
        {`
          @keyframes confettiFall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}