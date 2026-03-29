import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, MapPin, ChevronDown } from 'lucide-react'

const LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/services',label: 'Services' },
  { to: '/projects',label: 'Projects' },
  { to: '/blog',    label: 'Insights' },
  // { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open,       setOpen]       = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrolledStyle = scrolled
    ? { background: '#ffffff', boxShadow: '0 1px 20px rgba(0,0,0,0.08)', borderBottom: '1px solid var(--gray-200)' }
    : { background: 'transparent', boxShadow: 'none', borderBottom: 'none' }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'var(--nav-h)', zIndex: 1000,
        transition: 'all 0.3s ease',
        ...scrolledStyle
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'var(--green-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(10,92,71,0.3)'
            }}>
              <MapPin size={20} color="white" />
            </div>
<div>
  <div style={{
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 17,
    lineHeight: 1.1,
    color: 'var(--green-600)', // always green
    transition: 'color 0.3s'
  }}>
    GeoTreks
  </div>
  <div style={{
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: 'var(--green-600)', // always green
    textTransform: 'uppercase',
    lineHeight: 1
  }}>
    Kenya
  </div>
</div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
            {LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                style={({ isActive }) => ({
                  padding: '8px 14px', borderRadius: 8,
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 14, textDecoration: 'none', transition: 'all 0.2s',
                  color: isActive
                    ? 'var(--green-600)'
                    : scrolled ? 'var(--gray-700)' : 'rgba(3, 3, 3, 0.9)',
                  background: isActive
                    ? 'var(--green-50)'
                    : 'transparent',
                })}>
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'none', color: scrolled ? 'var(--gray-800)' : '#fff' }}
            className="mobile-menu-btn" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: '#fff', zIndex: 999,
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4,
          animation: 'fadeIn 0.2s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          {LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: '14px 16px', borderRadius: 10,
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16,
                textDecoration: 'none', transition: 'all 0.15s',
                color: isActive ? 'var(--green-700)' : 'var(--gray-700)',
                background: isActive ? 'var(--green-50)' : 'transparent',
              })}>
              {label}
            </NavLink>
          ))}
          <div style={{ marginTop: 12, borderTop: '1px solid var(--gray-200)', paddingTop: 16 }}>
            <Link to="/contact" className="btn btn-primary btn-full" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav    { display: none !important; }
          .mobile-menu-btn{ display: flex !important; }
        }
      `}</style>
    </>
  )
}
