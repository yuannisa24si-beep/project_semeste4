// src/pages/admin/Invoice.jsx
import { useState } from 'react'

export default function Invoice() {
  const [search, setSearch] = useState('')

  const invoices = [
    { id: 'INV-001', client: 'Andhie & Yasmin', date: '2024-12-01', amount: 15000000, status: 'Paid', package: 'Full Package' },
    { id: 'INV-002', client: 'Budi & Sari', date: '2024-11-15', amount: 4000000, status: 'Paid', package: 'Photography' },
    { id: 'INV-003', client: 'Reza & Dina', date: '2024-11-10', amount: 8000000, status: 'Pending', package: 'Decoration' },
    { id: 'INV-004', client: 'Andi & Putri', date: '2024-10-25', amount: 12000000, status: 'Paid', package: 'Catering' },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
  }

  const filtered = invoices.filter(i => 
    i.client.toLowerCase().includes(search.toLowerCase()) || 
    i.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Invoice
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Invoice & Payment Details</p>
      </div>

      {/* Payment Method Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
        marginBottom: 24
      }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Total Revenue</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#0000ff' }}>{formatPrice(39000000)}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Paid Invoices</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>3</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #d3d3d3', padding: '16px' }}>
          <p style={{ fontSize: 12, color: '#666666' }}>Pending</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>1</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search invoice by client or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d3d3d3',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none'
          }}
        />
      </div>

      {/* Invoice Table */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Invoice ID</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Client</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Package</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Amount</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>Status</th>
             </tr>
          </thead>
          <tbody>
            {filtered.map((inv, idx) => (
              <tr key={inv.id} style={{ borderTop: '1px solid #d3d3d3' }}>
                <td style={{ padding: 12, fontSize: 13 }}>{inv.id}</td>
                <td style={{ padding: 12, fontWeight: 500, fontSize: 14 }}>{inv.client}</td>
                <td style={{ padding: 12, fontSize: 13 }}>{inv.date}</td>
                <td style={{ padding: 12, fontSize: 13 }}>{inv.package}</td>
                <td style={{ padding: 12, fontWeight: 600, color: '#0000ff' }}>{formatPrice(inv.amount)}</td>
                <td style={{ padding: 12 }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 50,
                    fontSize: 11,
                    fontWeight: 600,
                    background: inv.status === 'Paid' ? '#d1fae5' : '#fef3c7',
                    color: inv.status === 'Paid' ? '#065f46' : '#92400e'
                  }}>
                    {inv.status}
                  </span>
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}