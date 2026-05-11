// src/pages/admin/Projects.jsx
import { useState } from 'react'

const projects = [
  { id: 1, name: 'Andhie & Yasmin', package: 'Full Package', date: '12 Jun 2026', status: 'Completed', progress: 100, tasks: 24, location: 'Jakarta' },
  { id: 2, name: 'Budi & Sari', package: 'Photography', date: '20 Jun 2026', status: 'In Progress', progress: 75, tasks: 18, location: 'Bandung' },
  { id: 3, name: 'Reza & Dina', package: 'Decoration', date: '5 Jul 2026', status: 'In Progress', progress: 50, tasks: 12, location: 'Surabaya' },
  { id: 4, name: 'Andi & Putri', package: 'Catering', date: '18 Jul 2026', status: 'Planning', progress: 25, tasks: 6, location: 'Jakarta' },
  { id: 5, name: 'Hendra & Lia', package: 'Full Package', date: '2 Aug 2026', status: 'Planning', progress: 10, tasks: 3, location: 'Bali' },
]

const statusColors = {
  'Completed': { bg: '#d1fae5', color: '#065f46' },
  'In Progress': { bg: '#e6e6ff', color: '#0000cc' },
  'Planning': { bg: '#fef3c7', color: '#92400e' }
}

export default function Projects() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'Completed', label: 'Completed' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Planning', label: 'Planning' }
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 600, color: '#000000', marginBottom: 4 }}>
          All Projects
        </h1>
        <p style={{ fontSize: 14, color: '#666666' }}>Manage all wedding projects</p>
      </div>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          placeholder="Search or filter by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: '1px solid #d3d3d3',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: filter === f.id ? '#0000ff' : '#d3d3d3',
                background: filter === f.id ? '#0000ff' : '#fff',
                color: filter === f.id ? '#fff' : '#666666',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 20 }}>
        {filtered.map(project => (
          <div key={project.id} style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #d3d3d3',
            padding: '20px',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0000ff', marginBottom: 4 }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: 12, color: '#666666' }}>
                  📍 {project.location} • 📅 {project.date}
                </p>
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: 50,
                fontSize: 11,
                fontWeight: 600,
                ...statusColors[project.status]
              }}>
                {project.status}
              </span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#666666' }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0000ff' }}>{project.progress}%</span>
              </div>
              <div style={{
                background: '#f3f4f6',
                borderRadius: 4,
                height: 8,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  background: '#0000ff',
                  height: '100%',
                  borderRadius: 4
                }} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              borderTop: '1px solid #d3d3d3'
            }}>
              <div>
                <p style={{ fontSize: 11, color: '#666666' }}>Package</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#000000' }}>{project.package}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#666666' }}>Tasks</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#000000' }}>{project.tasks} tasks</p>
              </div>
              <button style={{
                padding: '6px 16px',
                borderRadius: 6,
                background: '#0000ff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Button */}
      <div style={{
        marginTop: 24,
        padding: '20px',
        background: '#fff',
        borderRadius: 12,
        border: '2px dashed #d3d3d3',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#0000ff'
          e.currentTarget.style.background = '#e6e6ff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#d3d3d3'
          e.currentTarget.style.background = '#fff'
        }}
      >
        <span style={{ fontSize: 32 }}>➕</span>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0000ff', marginTop: 8 }}>New Project</h3>
        <p style={{ fontSize: 13, color: '#666666' }}>Create a new wedding project</p>
      </div>
    </div>
  )
}