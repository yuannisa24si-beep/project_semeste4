// src/pages/admin/Pricing.jsx
import { useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: [
        '1 Proyek Pernikahan',
        'Dukungan Basic',
        '1 GB Penyimpanan',
        'Email Support'
      ],
      popular: false,
      icon: '🆓',
      description: 'Cocok untuk pemula'
    },
    {
      name: 'Professional',
      price: { monthly: 499000, yearly: 4990000 },
      features: [
        'Unlimited Proyek',
        'Dukungan Prioritas',
        '50 GB Penyimpanan',
        'Email + Chat Support',
        'Analytics Dashboard',
        'Template Undangan Digital'
      ],
      popular: true,
      icon: '💒',
      description: 'Paling populer untuk WO profesional'
    },
    {
      name: 'Enterprise',
      price: { monthly: 999000, yearly: 9990000 },
      features: [
        'Unlimited Proyek',
        'Dukungan 24/7',
        '500 GB Penyimpanan',
        'Dedicated Account Manager',
        'Custom Integration',
        'API Access',
        'Sistem Manajemen Vendor'
      ],
      popular: false,
      icon: '🏰',
      description: 'Solusi lengkap untuk WO besar'
    }
  ]

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis'
    return `Rp ${price.toLocaleString('id-ID')}`
  }

  return (
    <div>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          Pilihan Harga Wedding Organizer
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>
          Pilih paket yang sesuai dengan kebutuhan bisnis Wedding Organizer Anda
        </p>
      </div>

      {/* Billing Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        <button
          onClick={() => setBillingCycle('monthly')}
          style={{
            padding: '10px 28px',
            borderRadius: 50,
            border: '1px solid',
            borderColor: billingCycle === 'monthly' ? '#0000ff' : '#d3d3d3',
            background: billingCycle === 'monthly' ? '#0000ff' : '#fff',
            color: billingCycle === 'monthly' ? '#fff' : '#666666',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14
          }}
        >
          Bulanan
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          style={{
            padding: '10px 28px',
            borderRadius: 50,
            border: '1px solid',
            borderColor: billingCycle === 'yearly' ? '#0000ff' : '#d3d3d3',
            background: billingCycle === 'yearly' ? '#0000ff' : '#fff',
            color: billingCycle === 'yearly' ? '#fff' : '#666666',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            position: 'relative'
          }}
        >
          Tahunan
          <span style={{
            position: 'absolute',
            top: -10,
            right: -20,
            background: '#10b981',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: 50,
            fontSize: 10,
            fontWeight: 600
          }}>
            Hemat 20%
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24
      }}>
        {plans.map((plan, idx) => (
          <div key={idx} style={{
            background: '#fff',
            borderRadius: 16,
            border: plan.popular ? '2px solid #0000ff' : '1px solid #d3d3d3',
            padding: '28px 24px',
            position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0000ff',
                color: '#fff',
                padding: '4px 20px',
                borderRadius: 50,
                fontSize: 12,
                fontWeight: 600
              }}>
                PALING POPULER
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <span style={{ fontSize: 56 }}>{plan.icon}</span>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0000ff', marginTop: 12, marginBottom: 8 }}>
                {plan.name}
              </h2>
              <p style={{ fontSize: 13, color: '#999999', marginBottom: 16 }}>{plan.description}</p>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: '#000000' }}>
                  {formatPrice(plan.price[billingCycle])}
                </span>
                {plan.price[billingCycle] > 0 && (
                  <span style={{ fontSize: 14, color: '#666666' }}>
                    /{billingCycle === 'monthly' ? 'bulan' : 'tahun'}
                  </span>
                )}
              </div>
              {plan.price[billingCycle] > 0 && billingCycle === 'yearly' && (
                <p style={{ fontSize: 12, color: '#10b981' }}>
                  Hemat Rp {(plan.price.monthly * 12 - plan.price.yearly).toLocaleString('id-ID')}/tahun
                </p>
              )}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 0',
                  borderBottom: fIdx !== plan.features.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <span style={{ color: '#10b981', fontSize: 18 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#444444' }}>{feature}</span>
                </li>
              ))}
            </ul>

            <button style={{
              width: '100%',
              padding: '14px',
              borderRadius: 10,
              background: plan.popular ? '#0000ff' : plan.name === 'Free' ? '#f5f5f5' : '#fff',
              border: plan.popular ? 'none' : '1px solid #0000ff',
              color: plan.popular ? '#fff' : plan.name === 'Free' ? '#666666' : '#0000ff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 15,
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => {
                if (plan.popular) e.currentTarget.style.background = '#0000cc'
                else if (plan.name !== 'Free') {
                  e.currentTarget.style.background = '#0000ff'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (plan.popular) e.currentTarget.style.background = '#0000ff'
                else if (plan.name !== 'Free') {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.color = '#0000ff'
                }
              }}
            >
              {plan.name === 'Free' ? 'Paket Saat Ini' : 'Pilih Paket'}
            </button>
          </div>
        ))}
      </div>

      {/* Analytics Overview - Wedding Theme */}
      <div style={{
        marginTop: 40,
        background: 'linear-gradient(135deg, #0000ff, #0000cc)',
        borderRadius: 16,
        padding: '28px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#fff' }}>
              Ringkasan Pendapatan
            </h3>
            <p style={{ fontSize: 36, fontWeight: 700 }}>
              Rp 860.472.290
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              Total pendapatan dari semua proyek pernikahan
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 14, color: '#a5f3c3' }}>↑ 35% vs bulan lalu</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>48 proyek berhasil diselesaikan</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>32 pasangan bahagia</p>
          </div>
        </div>
        
        {/* Mini Chart */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-end', gap: 8, height: 60 }}>
          {[45, 60, 55, 70, 65, 80, 75, 85, 90, 78, 82, 88].map((val, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: `${val * 0.6}px`,
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.3s'
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(m => (
            <span key={m} style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Wedding Testimonial */}
      <div style={{
        marginTop: 24,
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #d3d3d3',
        padding: '20px',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: 32 }}>💒</span>
        <p style={{ fontSize: 14, color: '#666666', marginTop: 8, fontStyle: 'italic' }}>
          "Dengan paket Professional, kami bisa mengelola lebih dari 50 pernikahan dalam setahun dengan mudah!"
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0000ff', marginTop: 8 }}>
          — Andhie & Yasmin, Wedding Organizer
        </p>
      </div>
    </div>
  )
}