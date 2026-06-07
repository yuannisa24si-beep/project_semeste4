// Alert Dialog Component - Radix UI
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export function AlertDialog({ trigger, title, description, onConfirm, confirmLabel = 'Konfirmasi', cancelLabel = 'Batal' }) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {trigger}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)', zIndex: 1000
        }} />
        <AlertDialogPrimitive.Content style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff', borderRadius: 16,
          padding: '28px', width: '90%', maxWidth: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)', zIndex: 1001
        }}>
          <AlertDialogPrimitive.Title style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description style={{ fontSize: 14, color: '#868e96', marginBottom: 24 }}>
            {description}
          </AlertDialogPrimitive.Description>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <AlertDialogPrimitive.Cancel style={{
              padding: '9px 20px', borderRadius: 8, fontSize: 14,
              background: '#f1f3f5', border: 'none', cursor: 'pointer', fontWeight: 500
            }}>
              {cancelLabel}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action onClick={onConfirm} style={{
              padding: '9px 20px', borderRadius: 8, fontSize: 14,
              background: '#fa5252', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500
            }}>
              {confirmLabel}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
