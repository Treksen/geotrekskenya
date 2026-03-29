import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Mail, FileText, Activity, TrendingUp, Eye, MessageSquare, ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS, SERVICES, PROJECTS } from '../data/content'
import { format, formatDistanceToNow } from 'date-fns'

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([])
  const [logs, setLogs]               = useState([])
  const [newsletter, setNewsletter]   = useState([])

  useEffect(() => {
    setSubmissions(JSON.parse(localStorage.getItem('gt_submissions') || '[]'))
    setLogs(JSON.parse(localStorage.getItem('gt_logs') || '[]'))
    setNewsletter(JSON.parse(localStorage.getItem('gt_newsletter') || '[]'))
  }, [])

  const newSubmissions = submissions.filter(s => s.status === 'new').length

  const METRICS = [
    { label: 'Blog posts',       value: BLOG_POSTS.length, icon: FileText,      color: 'var(--green-600)', link: '/admin/blog' },
    { label: 'Services listed',  value: SERVICES.length,   icon: TrendingUp,    color: 'var(--blue)',       link: '/admin/pages' },
    { label: 'Projects shown',   value: PROJECTS.length,   icon: Eye,           color: 'var(--purple)',     link: '/admin/pages' },
    { label: 'New enquiries',    value: newSubmissions,    icon: MessageSquare, color: newSubmissions > 0 ? 'var(--red)' : 'var(--green-500)', link: '#submissions' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>Dashboard</h1>
        <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Welcome to the GeoTreks Kenya admin panel. {format(new Date(), 'EEEE, d MMMM yyyy')}</p>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {METRICS.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link} style={{ textDecoration: 'none' }}>
            <div className="admin-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--sh-xs)'}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Recent enquiries */}
        <div id="submissions">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--gray-800)' }}>Recent enquiries</h3>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{submissions.length} total</span>
          </div>
          {submissions.length === 0 ? (
            <div className="admin-card" style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--gray-400)' }}>
              <Mail size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <div style={{ fontSize: 14 }}>No enquiries yet</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Contact form submissions will appear here</div>
            </div>
          ) : (
            <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
              {submissions.slice(0, 6).map((s, i) => (
                <div key={s.id} style={{ padding: '14px 18px', borderBottom: i < submissions.slice(0, 6).length - 1 ? '1px solid var(--gray-100)' : 'none', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--green-700)' }}>
                    {s.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'UN'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.name}
                      {s.status === 'new' && <span style={{ fontSize: 10, background: 'var(--green-100)', color: 'var(--green-700)', padding: '1px 7px', borderRadius: 99, fontWeight: 700, fontFamily: 'var(--font-display)' }}>NEW</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.email} · {s.service || 'No service selected'}</div>
                    {s.message && <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.message.slice(0, 80)}…</div>}
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={10} /> {formatDistanceToNow(new Date(s.time), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity log */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--gray-800)' }}>Activity log</h3>
            <Link to="/admin/logs" style={{ fontSize: 12, color: 'var(--green-600)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
            {logs.slice(0, 8).map((log, i) => (
              <div key={log.id || i} style={{ padding: '11px 18px', borderBottom: i < Math.min(7, logs.length - 1) ? '1px solid var(--gray-100)' : 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                  background: log.type === 'success' ? 'var(--green-500)' : log.type === 'warning' ? 'var(--amber)' : log.type === 'error' ? 'var(--red)' : 'var(--blue)'
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--gray-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>
                    {log.time ? formatDistanceToNow(new Date(log.time), { addSuffix: true }) : 'Just now'}
                  </div>
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No activity logged yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--gray-800)', marginBottom: 14 }}>Quick actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Add blog post',   to: '/admin/blog',     icon: '✏️', desc: 'Write new article' },
            { label: 'Edit services',   to: '/admin/pages',    icon: '⚙️', desc: 'Update service list' },
            { label: 'View settings',   to: '/admin/settings', icon: '🔧', desc: 'Site configuration' },
            { label: 'View website',    to: '/',               icon: '🌐', desc: 'Open public site', external: true },
          ].map(({ label, to, icon, desc, external }) => (
            <Link key={label} to={to} target={external ? '_blank' : undefined}
              className="admin-card"
              style={{ textDecoration: 'none', textAlign: 'center', padding: '20px 16px', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--sh-xs)'}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gray-800)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Content summary */}
      <div>
        <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--gray-800)', marginBottom: 14 }}>Content summary</h3>
        <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                {['Section', 'Items', 'Status', 'Last updated'].map(h => (
                  <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { section: 'Blog posts', count: BLOG_POSTS.length, status: 'Live', updated: '2024-02-14' },
                { section: 'Services',   count: SERVICES.length,   status: 'Live', updated: '2024-01-01' },
                { section: 'Projects',   count: PROJECTS.length,   status: 'Live', updated: '2024-02-01' },
                { section: 'Team',       count: 6,                 status: 'Live', updated: '2023-12-01' },
                { section: 'Enquiries',  count: submissions.length,status: 'Inbox',updated: submissions[0]?.time ? format(new Date(submissions[0].time), 'yyyy-MM-dd') : 'No enquiries' },
              ].map(({ section, count, status, updated }, i, arr) => (
                <tr key={section} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <td style={{ padding: '13px 18px', fontWeight: 600, color: 'var(--gray-800)', fontSize: 14 }}>{section}</td>
                  <td style={{ padding: '13px 18px', color: 'var(--gray-600)', fontSize: 14 }}>{count}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600, background: status === 'Live' ? 'var(--green-50)' : 'var(--gray-100)', color: status === 'Live' ? 'var(--green-700)' : 'var(--gray-600)', fontFamily: 'var(--font-display)' }}>{status}</span>
                  </td>
                  <td style={{ padding: '13px 18px', color: 'var(--gray-400)', fontSize: 13 }}>{updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
