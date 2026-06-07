// Komponen Dialog menggunakan @radix-ui/react-dialog
import * as RadixDialog from '@radix-ui/react-dialog'

export default function Dialog({ trigger, title, description, children, footer }) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>
        {trigger}
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        {/* Overlay */}
        <RadixDialog.Overlay style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 1000,
          animation: 'fadeIn 0.15s ease'
        }} />

        {/* Content */}
        <RadixDialog.Content style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          borderRadius: 16,
          padding: '28px',
          width: '90%', maxWidth: 480,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          zIndex: 1001,
          animation: 'slideUp 0.2s ease'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <RadixDialog.Title style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                {title}
              </RadixDialog.Title>
              {description && (
                <RadixDialog.Description style={{ fontSize: 13, color: '#868e96', marginTop: 4 }}>
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close style={{
              background: '#f1f3f5', border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#495057', flexShrink: 0
            }}>✕</RadixDialog.Close>
          </div>

          {/* Body */}
          <div style={{ marginBottom: footer ? 20 : 0 }}>{children}</div>

          {/* Footer */}
          {footer && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid #f1f3f5' }}>
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, -48%) } to { opacity: 1; transform: translate(-50%, -50%) } }
      `}</style>
    </RadixDialog.Root>
  )
}
