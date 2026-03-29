import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Filter } from 'lucide-react'
import { PROJECTS } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))]

function ProjectCard({ proj, index }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className="reveal card" style={{ transitionDelay: `${index * 0.07}s`, display: 'flex', flexDirection: 'column' }}>
      {/* Color header */}
      <div style={{ background: proj.color, padding: '28px 24px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', transform: 'translate(40%, -40%)' }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.18)', color: '#fff', padding: '2px 10px', borderRadius: 99, fontWeight: 600 }}>{proj.category}</span>
          <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', padding: '2px 10px', borderRadius: 99 }}>{proj.year}</span>
        </div>
        <h3 style={{ color: '#fff', fontSize: '1.05rem', lineHeight: 1.4 }}>{proj.title}</h3>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 8 }}>{proj.client} · {proj.duration}</div>
      </div>
      {/* Body */}
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 18, flex: 1 }}>{proj.description}</p>
        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 10, fontFamily: 'var(--font-display)' }}>Key outcomes</div>
          {proj.outcomes.slice(0, 3).map((o, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: 'var(--gray-600)', marginBottom: 7 }}>
              <CheckCircle size={12} color="var(--green-500)" style={{ flexShrink: 0, marginTop: 2 }} /> {o}
            </div>
          ))}
        </div>
   
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--green-700)', padding: '100px 0 72px' }} className="hero-pattern">
        <div className="container">
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Portfolio</span>
          <h1 style={{ color: '#fff', maxWidth: 600, marginTop: 12, marginBottom: 20 }}>
            {PROJECTS.length}+ projects delivered across East Africa
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 520, fontSize: '1.05rem', lineHeight: 1.75 }}>
            From county government GIS audits to international NGO data campaigns — here's a selection of the work we're most proud of.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} color="var(--gray-400)" />
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: '7px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                  border: '1.5px solid', cursor: 'pointer', fontFamily: 'var(--font-display)',
                  transition: 'all 0.15s',
                  background: active === cat ? 'var(--green-700)' : '#fff',
                  color:      active === cat ? '#fff' : 'var(--gray-600)',
                  borderColor:active === cat ? 'var(--green-700)' : 'var(--gray-200)',
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((proj, i) => <ProjectCard key={proj.id} proj={proj} index={i} />)}
          </div>
        </div>
      </section>

      {/* Case study highlight */}
      <section className="section-sm" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="label">Sectors we serve</span>
            <h2>Where we've made an impact</h2>
          </div>
          <div className="grid-4">
            {[
              { label: 'Government & Counties', count: '12 counties' },
              { label: 'NGOs & Development', count: '30+ organisations' },
              { label: 'Infrastructure & Roads', count: '800km+ surveyed' },
              { label: 'Agriculture & Land', count: '45,000+ parcels' },
            ].map(({ label, count }) => {
              const ref = useScrollReveal()
              return (
                <div key={label} ref={ref} className="reveal card-flat" style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--green-700)', marginBottom: 6 }}>{count}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)', fontWeight: 500 }}>{label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green-700)', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>Your project could be next</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
            Let's discuss your geospatial needs. We'll tell you honestly what's achievable and what it will cost.
          </p>
          <Link to="/contact" className="btn btn-white btn-lg">Start a project <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
