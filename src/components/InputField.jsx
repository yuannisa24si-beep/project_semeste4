export default function InputField({
  label, type = 'text', placeholder, value, onChange,
  error, required = false, icon
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: '#495057', display: 'block', marginBottom: 6 }}>
          {label} {required && <span style={{ color: '#fa5252' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, color: '#adb5bd'
          }}>{icon}</span>
        )}
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={onChange} required={required}
          style={{
            width: '100%', padding: icon ? '10px 14px 10px 38px' : '10px 14px',
            border: `1.5px solid ${error ? '#fa5252' : '#dee2e6'}`,
            borderRadius: 8, fontSize: 14, outline: 'none',
            fontFamily: 'inherit', color: '#343a40',
            transition: 'border 0.2s', boxSizing: 'border-box'
          }}
          onFocus={e => e.target.style.borderColor = '#3b5bdb'}
          onBlur={e => e.target.style.borderColor = error ? '#fa5252' : '#dee2e6'}
        />
      </div>
      {error && <p style={{ fontSize: 12, color: '#fa5252', marginTop: 4 }}>{error}</p>}
    </div>
  )
}
