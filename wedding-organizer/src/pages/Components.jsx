// src/pages/Components.jsx
import { useState } from 'react'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Badge from '../components/Badge'
import Card from '../components/Card'
import Container from '../components/Container'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import TextArea from '../components/TextArea'
import Modal from '../components/Modal'
import StatCard from '../components/StatCard'
import Table from '../components/Table'
import PageHeader from '../components/PageHeader'
import Avatar from '../components/Avatar'

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', role: '', bio: '' })
  const [alert, setAlert] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => <Badge color={val === 'Active' ? 'success' : 'gray'} label={val} />
    }
  ]

  const tableData = [
    { name: 'Andhie & Yasmin', email: 'andhie@email.com', role: 'Client', status: 'Active' },
    { name: 'Budi & Sari', email: 'budi@email.com', role: 'Client', status: 'Active' },
  ]

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'client', label: 'Client' },
    { value: 'vendor', label: 'Vendor' }
  ]

  return (
    <Container maxWidth={1000}>
      <PageHeader 
        title="Component Library" 
        subtitle="15 Komponen Reusable untuk Wedding Organizer"
      />

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* 1. Button */}
      <Card title="1. Button Components" padding="16px">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => showAlert('info', 'Primary clicked!')}>Primary</Button>
          <Button variant="secondary" onClick={() => showAlert('info', 'Secondary clicked!')}>Secondary</Button>
          <Button variant="danger" onClick={() => showAlert('danger', 'Danger clicked!')}>Danger</Button>
          <Button variant="ghost" onClick={() => showAlert('info', 'Ghost clicked!')}>Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Card>

      {/* 2. Badge */}
      <Card title="2. Badge Components" padding="16px">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Badge color="success" label="Success" />
          <Badge color="warning" label="Warning" />
          <Badge color="danger" label="Danger" />
          <Badge color="info" label="Info" />
          <Badge color="gray" label="Default" />
          <Badge color="success" label="Online" dot />
        </div>
      </Card>

      {/* 3. Avatar */}
      <Card title="3. Avatar Components" padding="16px">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar name="Admin Wedding" size="sm" />
          <Avatar name="Admin Wedding" size="md" />
          <Avatar name="Admin Wedding" size="lg" />
          <Avatar name="Admin Wedding" size="xl" online />
        </div>
      </Card>

      {/* 4. StatCard */}
      <Card title="4. StatCard Components" padding="16px">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          <StatCard label="Total Pemesanan" value="48" change="+12%" icon="📋" />
          <StatCard label="Klien Aktif" value="32" change="+5%" icon="👥" />
          <StatCard label="Pendapatan" value="Rp 48jt" change="+18%" icon="💰" />
          <StatCard label="Event" value="7" icon="📅" />
        </div>
      </Card>

      {/* 5. Form Components */}
      <Card title="5. Form Components (InputField, SelectField, TextArea)" padding="16px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <InputField 
            label="Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter your name"
            required 
          />
          <InputField 
            label="Email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="admin@wedding.com"
            icon="📧"
          />
          <SelectField 
            label="Role" 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            options={roleOptions}
            placeholder="Select role"
          />
          <TextArea 
            label="Bio" 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={2}
          />
        </div>
      </Card>

      {/* 6. Table */}
      <Card title="6. Table Component" padding="16px">
        <Table columns={columns} data={tableData} />
      </Card>

      {/* 7. Modal */}
      <Card title="7. Modal Component" padding="16px">
        <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
      </Card>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Modal Example"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              setModalOpen(false)
              showAlert('success', 'Action confirmed!')
            }}>Confirm</Button>
          </>
        }
      >
        <p>This is a modal dialog. You can put any content here.</p>
        <p style={{ marginTop: 8, color: '#666' }}>Form data: {JSON.stringify(formData)}</p>
      </Modal>

      
    </Container>
  )
}