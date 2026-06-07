export default function TextArea({ label, placeholder, value, onChange, rows = 4, error }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: '#495057', display: 'block', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder} value={value} onChange={onChange} rows={rows}
        style={{
          width: '100%', padding: '10px 14px',
          border: `1.5px solid ${error ? '#fa5252' : '#dee2e6'}`,
          borderRadius: 8, fontSize: 14, outline: 'none',
          fontFamily: 'inherit', color: '#343a40', resize: 'vertical',
          transition: 'border 0.2s', boxSizing: 'border-box'
        }}
        onFocus={e => e.target.style.borderColor = '#3b5bdb'}
        onBlur={e => e.target.style.borderColor = error ? '#fa5252' : '#dee2e6'}
      />
      {error && <p style={{ fontSize: 12, color: '#fa5252', marginTop: 4 }}>{error}</p>}
    </div>
  )
}
