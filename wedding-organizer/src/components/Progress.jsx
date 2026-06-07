// Komponen Progress menggunakan @radix-ui/react-progress
import * as RadixProgress from '@radix-ui/react-progress'

export default function Progress({ value = 0, max = 100, label, showValue = true, color = '#3b5bdb', size = 'md' }) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  const heights = { sm: 6, md: 10, lg: 14 }
  const h = heights[size]

  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && <span style={{ fontSize: 13, color: '#495057', fontWeight: 500 }}>{label}</span>}
          {showValue && <span style={{ fontSize: 13, color: color, fontWeight: 700 }}>{pct}%</span>}
        </div>
      )}
      <RadixProgress.Root
        value={pct}
        style={{
          width: '100%',
          height: h,
          background: '#e9ecef',
          borderRadius: h,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <RadixProgress.Indicator
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: h,
            transition: 'width 0.5s cubic-bezier(0.65, 0, 0.35, 1)'
          }}
        />
      </RadixProgress.Root>
    </div>
  )
}
