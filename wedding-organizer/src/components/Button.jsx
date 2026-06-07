const variants = {
  primary: { background: '#3b5bdb', color: '#fff', border: 'none' },
  secondary: { background: '#f1f3f9', color: '#3b5bdb', border: '1.5px solid #3b5bdb' },
  danger: { background: '#fa5252', color: '#fff', border: 'none' },
  ghost: { background: 'transparent', color: '#3b5bdb', border: '1.5px solid #dee2e6' },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: 12 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '13px 28px', fontSize: 16 },
}

export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled = false, fullWidth = false, type = 'button'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 8,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'inherit',
        transition: 'opacity 0.2s, transform 0.1s',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.85' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.opacity = '1' }}
    >
      {children}
    </button>
  )
}
