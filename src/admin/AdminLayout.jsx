import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, PenSquare, Settings,
  Activity, LogOut, MapPin, Menu, X, ExternalLink, Eye, EyeOff
} from 'lucide-react'

const ADMIN_PIN = '1234'

const NAV = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Dashboard',  end: true },
  { to: '/admin/blog',     icon: PenSquare,       label: 'Blog Posts'       },
  { to: '/admin/pages',    icon: FileText,        label: 'Pages'            },
  { to: '/admin/settings', icon: Settings,        label: 'Settings'         },
  { to: '/admin/logs',     icon: Activity,        label: 'Activity Logs'    },
]

export default function AdminLayout() {
  const [authed,  setAuthed]  = useState(() => sessionStorage.getItem('gt_admin') === 'yes')
  const [pin,     setPin]     = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error,   setError]   = useState('')
  const [open,    setOpen]    = useState(false)
  const nav = useNavigate()

  function login(e) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('gt_admin', 'yes')
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect PIN. Default is 1234')
      setPin('')
    }
  }

  function logout() {
    sessionStorage.removeItem('gt_admin')
    setAuthed(false)
    nav('/admin')
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, background: 'var(--green-700)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={22} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>GeoTreks Kenya</div>
              <div style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 600 }}>Admin Panel</div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: 'var(--sh-md)', border: '1px solid var(--gray-200)' }}>
            <h2 style={{ marginBottom: 8, fontSize: '1.3rem' }}>Admin access</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 24 }}>Enter your admin PIN to continue. Default PIN is <strong>1234</strong>.</p>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{error}</div>}

            <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPin ? 'text' : 'password'}
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  maxLength={8}
                  autoFocus
                  style={{ paddingRight: 46, letterSpacing: showPin ? 'normal' : '0.3em', fontSize: 18 }}
                />
                <button type="button" onClick={() => setShowPin(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', display: 'flex' }}>
                  {showPin ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <button className="btn btn-primary btn-full btn-lg" type="submit">Access admin panel</button>
            </form>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)' }}>
              <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray-500)', fontSize: 13, textDecoration: 'none' }}>
                <ExternalLink size={13} /> Back to website
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: 'var(--green-600)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={18} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#fff' }}>GeoTreks</div>
              <div style={{ fontSize: 10, color: 'var(--green-400)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8,
                textDecoration: 'none', transition: 'all 0.15s',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
                borderLeft: isActive ? '3px solid var(--green-400)' : '3px solid transparent',
              })}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavLink to="/" target="_blank"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, textDecoration: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            <ExternalLink size={15} /> View website
          </NavLink>
          <button onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 500, transition: 'all 0.15s', textAlign: 'left' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fc8181'; e.currentTarget.style.background = 'rgba(252,129,129,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'none' }}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid var(--gray-200)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>
            <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>GeoTreks Kenya</span> &nbsp;/&nbsp; Admin
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-500)', boxShadow: '0 0 0 3px rgba(29,158,117,0.2)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Admin</span>
          </div>
        </div>
        <div style={{ padding: '28px' }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  )
}
