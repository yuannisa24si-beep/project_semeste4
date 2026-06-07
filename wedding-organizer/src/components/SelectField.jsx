export default function SelectField({ label, value, onChange, options = [], placeholder, error }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: '#495057', display: 'block', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <select
        value={value} onChange={onChange}
        style={{
          width: '100%', padding: '10px 14px',
          border: `1.5px solid ${error ? '#fa5252' : '#dee2e6'}`,
          borderRadius: 8, fontSize: 14, outline: 'none',
          fontFamily: 'inherit', color: value ? '#343a40' : '#adb5bd',
          background: '#fff', cursor: 'pointer',
          transition: 'border 0.2s', boxSizing: 'border-box'
        }}
        onFocus={e => e.target.style.borderColor = '#3b5bdb'}
        onBlur={e => e.target.style.borderColor = error ? '#fa5252' : '#dee2e6'}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p style={{ fontSize: 12, color: '#fa5252', marginTop: 4 }}>{error}</p>}
    </div>
  )
}
