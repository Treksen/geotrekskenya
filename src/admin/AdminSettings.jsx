import React, { useState } from 'react'
import { Save, RefreshCw, Globe, Bell, Shield, Smartphone } from 'lucide-react'

const DEFAULT_SETTINGS = {
  siteName: 'GeoTreks Kenya',
  siteUrl: 'https://geotreks.co.ke',
  seoTitle: 'GeoTreks Kenya | Geospatial, Survey & Remote Sensing',
  seoDescription: 'East Africa\'s leading geospatial, land survey, and remote sensing company.',
  googleAnalytics: '',
  adminEmail: 'info@geotreks.co.ke',
  adminPin: '1234',
  maintenanceMode: false,
  newsletterEnabled: true,
  contactFormEnabled: true,
  pwaEnabled: true,
  offlineEnabled: true,
  socialTwitter: 'https://twitter.com/GeoTreksKenya',
  socialLinkedin: 'https://linkedin.com/company/geotreks-kenya',
  socialFacebook: 'https://facebook.com/GeoTreksKenya',
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gt_settings')
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS
  })
  const [saved, setSaved] = useState(false)

  function set(k, v) { setSettings(s => ({ ...s, [k]: v })) }

  function saveSettings() {
    localStorage.setItem('gt_settings', JSON.stringify(settings))
    const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
    logs.unshift({ id: Date.now(), type: 'info', message: 'Site settings updated', time: new Date().toISOString() })
    localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function resetSettings() {
    if (!confirm('Reset all settings to defaults?')) return
    setSettings(DEFAULT_SETTINGS)
    localStorage.removeItem('gt_settings')
  }

  const Section = ({ icon: Icon, title, color, children }) => (
    <div className="admin-card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--gray-100)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={color} />
        </div>
        <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', color: 'var(--gray-800)' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  )

  const Field = ({ label, k, type = 'text', placeholder }) => (
    <div className="form-group" style={{ marginBottom: 0 }}>
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} value={settings[k] || ''} onChange={e => set(k, e.target.value)} placeholder={placeholder} />
    </div>
  )

  const Toggle = ({ label, k, desc }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{desc}</div>}
      </div>
      <label style={{ position: 'relative', width: 44, height: 24, flexShrink: 0, cursor: 'pointer' }}>
        <input type="checkbox" checked={settings[k]} onChange={e => set(k, e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 12, background: settings[k] ? 'var(--green-500)' : 'var(--gray-300)', transition: 'background 0.2s' }}>
          <span style={{ position: 'absolute', top: 3, left: settings[k] ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </span>
      </label>
    </div>
  )

  return (
    <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 4 }}>Settings</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Site configuration and feature toggles.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={resetSettings}><RefreshCw size={14} /> Reset</button>
          <button className="btn btn-primary btn-sm" onClick={saveSettings}><Save size={14} /> {saved ? 'Saved!' : 'Save settings'}</button>
        </div>
      </div>

      {saved && <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', color: 'var(--green-700)', padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500, marginBottom: 16 }}>✓ Settings saved successfully</div>}

      <Section icon={Globe} title="Site identity" color="var(--green-600)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Site name" k="siteName" />
          <Field label="Site URL" k="siteUrl" placeholder="https://geotreks.co.ke" />
        </div>
        <Field label="SEO page title" k="seoTitle" />
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">SEO meta description</label>
          <textarea className="form-textarea" style={{ minHeight: 72 }} value={settings.seoDescription} onChange={e => set('seoDescription', e.target.value)} />
        </div>
        <Field label="Google Analytics ID (optional)" k="googleAnalytics" placeholder="G-XXXXXXXXXX" />
      </Section>

      <Section icon={Bell} title="Features" color="var(--blue)">
        <Toggle label="Newsletter signup" k="newsletterEnabled" desc="Show newsletter form in footer and blog page" />
        <Toggle label="Contact form" k="contactFormEnabled" desc="Enable the enquiry form on the Contact page" />
        <Toggle label="Maintenance mode" k="maintenanceMode" desc="Show a maintenance page to all public visitors" />
      </Section>

      <Section icon={Smartphone} title="Progressive Web App" color="var(--purple)">
        <Toggle label="PWA enabled" k="pwaEnabled" desc="Allow users to install the website as an app" />
        <Toggle label="Offline support" k="offlineEnabled" desc="Cache pages for offline access via service worker" />
        <div className="info-box-blue" style={{ borderRadius: 10, padding: '12px 14px', fontSize: 13 }}>
          PWA settings take effect after rebuilding and deploying. Run <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.05)', padding: '1px 5px', borderRadius: 4 }}>npm run build</code> to apply changes.
        </div>
      </Section>

      <Section icon={Globe} title="Social media" color="var(--teal)">
        {[
          { label: 'Twitter / X URL', k: 'socialTwitter' },
          { label: 'LinkedIn URL',    k: 'socialLinkedin' },
          { label: 'Facebook URL',    k: 'socialFacebook' },
        ].map(({ label, k }) => <Field key={k} label={label} k={k} />)}
      </Section>

      <Section icon={Shield} title="Admin access" color="var(--amber)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="Admin notification email" k="adminEmail" type="email" />
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Admin PIN (4–8 digits)</label>
            <input className="form-input" type="password" value={settings.adminPin} onChange={e => set('adminPin', e.target.value)} maxLength={8} />
          </div>
        </div>
        <div className="info-box-amber" style={{ borderRadius: 10, padding: '12px 14px', fontSize: 13 }}>
          The admin PIN is stored in your browser only. For production, replace with server-side authentication.
        </div>
      </Section>
    </div>
  )
}
