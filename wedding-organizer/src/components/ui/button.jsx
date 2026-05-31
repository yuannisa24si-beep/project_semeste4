// Button Component - reusable UI
const variants = {
  default:     { background: '#3b5bdb', color: '#fff', border: 'none' },
  destructive: { background: '#fa5252', color: '#fff', border: 'none' },
  outline:     { background: 'transparent', color: '#3b5bdb', border: '1.5px solid #3b5bdb' },
  ghost:       { background: 'transparent', color: '#495057', border: 'none' },
  secondary:   { background: '#f1f3f9', color: '#3b5bdb', border: 'none' },
}

const sizes = {
  default: { padding: '10px 20px', fontSize: 14 },
  sm:      { padding: '6px 14px', fontSize: 12 },
  lg:      { padding: '13px 28px', fontSize: 16 },
  icon:    { padding: '8px', fontSize: 16, width: 36, height: 36 },
}

export function Button({ children, variant = 'default', size = 'default', disabled, onClick, type = 'button', className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 8,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        transition: 'opacity 0.2s',
      }}
    >
      {children}
    </button>
  )
}
