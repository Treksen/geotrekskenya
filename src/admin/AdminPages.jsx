import React, { useState } from 'react'
import { Edit2, Save, X, Eye } from 'lucide-react'
import { COMPANY, SERVICES, PROJECTS, TEAM } from '../data/content'
import { Link } from 'react-router-dom'

const PAGES = [
  { id: 'home',     label: 'Home Page',      path: '/',        editable: false, desc: 'Hero section, stats, services grid, featured projects' },
  { id: 'about',    label: 'About Us',       path: '/about',   editable: false, desc: 'Company story, mission, values, team members' },
  { id: 'services', label: 'Services',       path: '/services',editable: false, desc: '6 service listings with full descriptions' },
  { id: 'projects', label: 'Projects',       path: '/projects',editable: false, desc: 'Portfolio of completed projects' },
  { id: 'blog',     label: 'Blog / Insights',path: '/blog',    editable: false, desc: 'Articles managed separately in Blog section' },
  { id: 'contact',  label: 'Contact',        path: '/contact', editable: false, desc: 'Contact form, map, office details' },
]

export default function AdminPages() {
  const [editCompany, setEditCompany] = useState(false)
  const [company, setCompany]         = useState(COMPANY)
  const [saved, setSaved]             = useState(false)

  function saveCompany() {
    localStorage.setItem('gt_company', JSON.stringify(company))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setEditCompany(false)
    const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
    logs.unshift({ id: Date.now(), type: 'info', message: 'Company info updated', time: new Date().toISOString() })
    localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 4 }}>Pages</h1>
        <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Overview of all public pages and editable company information.</p>
      </div>

      {saved && <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', color: 'var(--green-700)', padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500 }}>✓ Company info saved</div>}

      {/* Pages list */}
      <div>
        <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 14, color: 'var(--gray-800)' }}>Public pages</h2>
        <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
          {PAGES.map((page, i) => (
            <div key={page.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < PAGES.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)' }}>{page.label}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{page.desc}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gray-400)', flexShrink: 0 }}>{page.path}</div>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--green-50)', color: 'var(--green-700)', fontWeight: 600, fontFamily: 'var(--font-display)', flexShrink: 0 }}>Live</span>
              <Link to={page.path} target="_blank" style={{ color: 'var(--gray-400)', display: 'flex', flexShrink: 0 }}><Eye size={16} /></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Company info editor */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--gray-800)' }}>Company information</h2>
          {!editCompany
            ? <button className="btn btn-ghost btn-sm" onClick={() => setEditCompany(true)}><Edit2 size={14} /> Edit</button>
            : <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={saveCompany}><Save size={14} /> Save</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditCompany(false)}><X size={14} /></button>
              </div>
          }
        </div>

        {editCompany ? (
          <div className="admin-card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { k: 'name',       label: 'Company name' },
                { k: 'tagline',    label: 'Tagline' },
                { k: 'phone',      label: 'Phone number' },
                { k: 'email',      label: 'Email address' },
                { k: 'salesEmail', label: 'Sales email' },
                { k: 'address',    label: 'Physical address' },
                { k: 'poBox',      label: 'P.O. Box' },
                { k: 'employees',  label: 'Employees' },
                { k: 'projects',   label: 'Projects completed' },
                { k: 'clients',    label: 'Clients served' },
              ].map(({ k, label }) => (
                <div key={k} className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{label}</label>
                  <input className="form-input" value={company[k] || ''} onChange={e => setCompany(c => ({ ...c, [k]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <textarea className="form-textarea" style={{ minHeight: 80 }} value={company.description || ''} onChange={e => setCompany(c => ({ ...c, description: e.target.value }))} />
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
            {[
              { label: 'Company name', value: company.name },
              { label: 'Tagline',      value: company.tagline },
              { label: 'Phone',        value: company.phone },
              { label: 'Email',        value: company.email },
              { label: 'Address',      value: company.address },
              { label: 'Employees',    value: company.employees },
            ].map(({ label, value }, i) => (
              <div key={label} style={{ display: 'flex', padding: '12px 20px', borderBottom: i < 5 ? '1px solid var(--gray-100)' : 'none', gap: 16 }}>
                <div style={{ width: 160, fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, flexShrink: 0 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-800)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content counts */}
      <div>
        <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 14, color: 'var(--gray-800)' }}>Content inventory</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Services', count: SERVICES.length, path: '/services' },
            { label: 'Projects', count: PROJECTS.length, path: '/projects' },
            { label: 'Team members', count: TEAM.length, path: '/about' },
            { label: 'Blog articles', count: 4, path: '/admin/blog' },
          ].map(({ label, count, path }) => (
            <Link key={label} to={path} target={path.startsWith('/admin') ? undefined : '_blank'} style={{ textDecoration: 'none' }}>
              <div className="admin-card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-md)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--sh-xs)'}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green-700)', fontFamily: 'var(--font-display)' }}>{count}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{label}</div>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 14 }}>
          To edit services, projects, and team members, update the data in <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4 }}>src/data/content.js</code> in your codebase.
        </p>
      </div>
    </div>
  )
}
