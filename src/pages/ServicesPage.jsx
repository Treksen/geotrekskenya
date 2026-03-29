import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Ruler, Map, Satellite, Plane, Database, GraduationCap, Phone } from 'lucide-react'
import { SERVICES } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ICON_MAP = { Ruler, Map, Satellite, Plane, Database, GraduationCap }

const PROCESS = [
  { step: '01', title: 'Consultation', desc: 'We meet (virtually or in-person) to understand your project requirements, budget, and timeline.' },
  { step: '02', title: 'Proposal',     desc: 'We prepare a detailed scope of work, methodology, deliverables, and cost estimate within 3 business days.' },
  { step: '03', title: 'Fieldwork',    desc: 'Our certified surveyors and analysts conduct data collection using industry-standard equipment and protocols.' },
  { step: '04', title: 'Processing',   desc: 'Data is processed, validated, and quality-checked at our Nairobi office using specialist software.' },
  { step: '05', title: 'Delivery',     desc: 'Final deliverables are shared in your preferred format with comprehensive technical documentation.' },
  { step: '06', title: 'Support',      desc: 'We provide 30-day post-delivery support and are available for follow-on work or data updates.' },
]

function ServiceSection({ service, flip }) {
  const Icon = ICON_MAP[service.icon] || Map
  const ref = useScrollReveal()
  return (
    <div id={service.id} ref={ref} className="reveal" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
      alignItems: 'center', padding: '64px 0',
      borderBottom: '1px solid var(--gray-200)',
    }}>
      {/* Text */}
      <div style={{ order: flip ? 2 : 1 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: service.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon size={28} color={service.color} />
        </div>
        <span className="label" style={{ color: service.color, marginBottom: 10, display: 'block' }}>{service.clients}</span>
        <h2 style={{ marginBottom: 14 }}>{service.title}</h2>
        <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 24, fontSize: '1.02rem' }}>{service.description}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 28 }}>
          {service.features.map(f => (
            <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <CheckCircle size={15} color={service.color} style={{ flexShrink: 0, marginTop: 3 }} />
              <span style={{ fontSize: 14, color: 'var(--gray-700)' }}>{f}</span>
            </div>
          ))}
        </div>
        <Link to="/contact" className="btn btn-primary">Get a quote <ArrowRight size={16} /></Link>
      </div>
      {/* Visual */}
      <div style={{ order: flip ? 1 : 2 }}>
        <div style={{
          background: `linear-gradient(135deg, ${service.color}22 0%, ${service.color}08 100%)`,
          border: `1px solid ${service.color}25`,
          borderRadius: 24, padding: '48px 40px', minHeight: 320,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '4rem', color: service.color, opacity: 0.12, lineHeight: 1 }}>
            {service.title.split(' ')[0]}
          </div>
          {service.features.map((f, i) => (
            <div key={f} style={{
              padding: '12px 16px', background: '#fff', borderRadius: 10,
              fontSize: 13, color: 'var(--gray-700)', fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderLeft: `3px solid ${service.color}`,
              transform: `translateX(${i % 2 === 0 ? 0 : 12}px)`
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--green-700)', padding: '100px 0 72px' }} className="hero-pattern">
        <div className="container">
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>What we offer</span>
          <h1 style={{ color: '#fff', maxWidth: 640, marginTop: 12, marginBottom: 20 }}>
            Full-spectrum geospatial services for East Africa
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.75 }}>
            From physical boundary surveys to satellite imagery analysis and custom web GIS platforms — everything your organisation needs to work confidently with spatial data.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {SERVICES.map(s => (
              <a key={s.id} href={`#${s.id}`}
                style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 99, fontSize: 13, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.background='rgba(255,255,255,0.1)'; e.target.style.borderColor='#fff' }}
                onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.borderColor='rgba(255,255,255,0.3)' }}>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          {SERVICES.map((s, i) => <ServiceSection key={s.id} service={s} flip={i % 2 !== 0} />)}
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="label">How we work</span>
            <h2>Our Project Process</h2>
            <p>A clear, transparent workflow from first contact to final delivery.</p>
          </div>
          <div className="grid-3">
            {PROCESS.map((p, i) => {
              const ref = useScrollReveal()
              return (
                <div key={p.step} ref={ref} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--green-100)', lineHeight: 1, marginBottom: 12 }}>{p.step}</div>
                  <h4 style={{ marginBottom: 10 }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green-700)', padding: '72px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <h2 style={{ color: '#fff', marginBottom: 10 }}>Have a project in mind?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480 }}>
              We respond to all enquiries within 24 hours. For urgent requirements, call us directly.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-white btn-lg">Request a quote <ArrowRight size={18} /></Link>
            <a href="tel:+254700123456" className="btn btn-outline-white btn-lg"><Phone size={16}/> Call us</a>
          </div>
        </div>
      </section>
    </>
  )
}
