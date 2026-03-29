import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Twitter, Linkedin, Facebook, Youtube } from 'lucide-react'
import { COMPANY } from '../data/content'
import { showToast } from '../App'

const SERVICES_LIST = ['Land Surveying','GIS Solutions','Remote Sensing','Drone Survey','Spatial Data','Training & Consultancy','Other / Not sure']

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', org: '', service: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      // Save to localStorage for admin to see
      const submissions = JSON.parse(localStorage.getItem('gt_submissions') || '[]')
      submissions.unshift({ ...form, id: Date.now(), time: new Date().toISOString(), status: 'new' })
      localStorage.setItem('gt_submissions', JSON.stringify(submissions.slice(0, 100)))
      // Log
      const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
      logs.unshift({ id: Date.now(), type: 'success', message: `Contact form: ${form.name} (${form.email}) — ${form.service}`, time: new Date().toISOString() })
      localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
      setLoading(false)
      setSent(true)
      showToast('Message sent! We\'ll respond within 24 hours.', 'success')
    }, 1400)
  }

  // Lazy load Leaflet map
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mapLoaded) return
    if (typeof window === 'undefined') return
    const L = window.L
    if (!L) return
    const existing = document.getElementById('contact-map')._leaflet_id
    if (existing) return

    try {
      const map = L.map('contact-map', { zoomControl: true, scrollWheelZoom: false }).setView([COMPANY.lat, COMPANY.lng], 14)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map)
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:36px;height:36px;background:#0a5c47;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [36, 36], iconAnchor: [18, 36]
      })
      L.marker([COMPANY.lat, COMPANY.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:sans-serif;padding:4px"><strong>GeoTreks Kenya</strong><br/>${COMPANY.address}</div>`)
        .openPopup()
    } catch (err) {
      // Map already initialised or Leaflet not loaded
    }
  }, [mapLoaded])

  const CONTACT_INFO = [
    { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g,'')}` },
    // { icon: Mail,  label: 'General enquiries', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    // { icon: Mail,  label: 'Project proposals', value: COMPANY.salesEmail, href: `mailto:${COMPANY.salesEmail}` },
    // { icon: MapPin,label: 'Office', value: COMPANY.address, href: `https://maps.google.com/?q=${COMPANY.lat},${COMPANY.lng}` },
    { icon: Clock, label: 'Office hours', value: 'Mon–Fri, 08:00–17:00 EAT', href: null },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--green-700)', padding: '100px 0 72px' }} className="hero-pattern">
        <div className="container">
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Get in touch</span>
          <h1 style={{ color: '#fff', maxWidth: 560, marginTop: 12, marginBottom: 20 }}>
            Let's discuss your project
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 500, fontSize: '1.05rem', lineHeight: 1.75 }}>
            Tell us what you need. We review every enquiry personally and respond within 24 business hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 56, alignItems: 'start' }}>

            {/* Form */}
            <div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '64px 32px', background: 'var(--green-50)', borderRadius: 24, border: '1px solid var(--green-100)' }}>
                  <CheckCircle size={56} color="var(--green-600)" style={{ margin: '0 auto 20px' }} />
                  <h2 style={{ color: 'var(--green-800)', marginBottom: 12 }}>Message received!</h2>
                  <p style={{ color: 'var(--green-700)', maxWidth: 400, margin: '0 auto 24px' }}>
                    Thank you, {form.name}. We'll review your enquiry and get back to you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',org:'',service:'',budget:'',message:'' }) }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ marginBottom: 28 }}>Send us a message</h2>
                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Full name *</label>
                      <input className="form-input" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address *</label>
                      <input className="form-input" type="email" placeholder="you@organisation.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone number</label>
                      <input className="form-input" type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organisation</label>
                      <input className="form-input" placeholder="Your company / organisation" value={form.org} onChange={e => set('org', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service required *</label>
                    <select className="form-select" value={form.service} onChange={e => set('service', e.target.value)} required>
                      <option value="">Select a service…</option>
                      {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Approximate budget</label>
                    <select className="form-select" value={form.budget} onChange={e => set('budget', e.target.value)}>
                      <option value="">Select a range…</option>
                      <option>Under KSh 100,000</option>
                      <option>KSh 100,000 – 500,000</option>
                      <option>KSh 500,000 – 2,000,000</option>
                      <option>Over KSh 2,000,000</option>
                      <option>To be determined</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project details *</label>
                    <textarea className="form-textarea" placeholder="Describe your project, location, timeline, and any specific requirements…" value={form.message} onChange={e => set('message', e.target.value)} style={{ minHeight: 140 }} required />
                  </div>
                  <button className="btn btn-primary btn-lg btn-full" type="submit" disabled={loading} style={{ marginTop: 8 }}>
                    {loading ? <><span className="spinner" /> Sending…</> : <><Send size={17} /> Send message</>}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginTop: 12 }}>
                    We respond within 24 business hours. Your information is kept confidential.
                  </p>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card-flat">
                <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>Contact information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 36, height: 36, background: 'var(--green-50)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} color="var(--green-600)" />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                            style={{ fontSize: 14, color: 'var(--gray-800)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                            onMouseEnter={e => e.target.style.color = 'var(--green-600)'}
                            onMouseLeave={e => e.target.style.color = 'var(--gray-800)'}>
                            {value}
                          </a>
                        ) : (
                          <div style={{ fontSize: 14, color: 'var(--gray-700)', fontWeight: 500 }}>{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              {/* <div className="card-flat">
                <h4 style={{ marginBottom: 14, fontSize: '0.95rem' }}>Follow us</h4>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { href: COMPANY.social.twitter,  Icon: Twitter,  color: '#1da1f2' },
                    { href: COMPANY.social.linkedin,  Icon: Linkedin, color: '#0077b5' },
                    { href: COMPANY.social.facebook,  Icon: Facebook, color: '#1877f2' },
                    { href: COMPANY.social.youtube,   Icon: Youtube,  color: '#ff0000' },
                  ].map(({ href, Icon, color }) => (
                    <a key={href} href={href} target="_blank" rel="noreferrer"
                      style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)', transition: 'all 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.background = color + '15'; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '40' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-100)'; e.currentTarget.style.color = 'var(--gray-500)'; e.currentTarget.style.borderColor = 'var(--gray-200)' }}>
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div> */}

              {/* P.O. Box */}
              {/* <div className="card-flat" style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
                <div style={{ fontSize: 12, color: 'var(--green-700)', fontWeight: 700, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Postal address</div>
                <div style={{ fontSize: 14, color: 'var(--green-800)', lineHeight: 1.7 }}>{COMPANY.poBox}</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {/* <section style={{ height: 400, position: 'relative', background: 'var(--gray-100)' }}>
        <div id="contact-map" style={{ height: '100%', width: '100%' }} />
        {!mapLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)' }}>
            <div className="spinner spinner-green" style={{ width: 32, height: 32 }} />
          </div>
        )}
      </section> */}

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-header">
            <span className="label">Common questions</span>
            <h2>Frequently Asked</h2>
          </div>
          {[
            { q: 'How quickly can you start a project?', a: 'For most projects we can mobilise within 5–10 business days. For urgent requirements, call us directly and we\'ll do our best to accommodate your timeline.' },
            { q: 'Do you work outside Nairobi?', a: 'Yes — we have delivered projects in all 47 counties and across Uganda, Tanzania, and Rwanda. Field mobilisation costs are included in our project proposals.' },
            { q: 'What deliverable formats do you support?', a: 'We deliver in any format you need: GeoJSON, Shapefile, GeoPackage, GeoTIFF, DXF, PDF, KMZ, CSV with coordinates, or as a hosted web map. We discuss your requirements upfront.' },
            { q: 'Are your surveyors ISK-registered?', a: 'Yes. All boundary and cadastral surveys are conducted by or under the supervision of registered members of the Institution of Surveyors of Kenya (ISK).' },
            { q: 'Can you work with our existing data?', a: 'Absolutely. Most projects involve integrating with existing data. We assess incoming data quality as part of the scoping process and flag any issues before work begins.' },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--gray-200)', padding: '24px 0' }}>
              <h4 style={{ marginBottom: 12, color: 'var(--gray-900)' }}>{q}</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.75 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
