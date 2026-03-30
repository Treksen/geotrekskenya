import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Twitter, Linkedin, Facebook, Youtube, Instagram, ArrowRight, CheckCircle } from 'lucide-react'
import { COMPANY } from '../data/content'
import { showToast } from '../App'

export default function Footer() {
  const [email, setEmail]       = useState('')
  const [subbed, setSubbed]     = useState(false)
  const [loading, setLoading]   = useState(false)

  function handleNewsletter(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubbed(true)
      setEmail('')
      // Log to admin
      const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
      logs.unshift({ id: Date.now(), type: 'info', message: `Newsletter signup: ${email}`, time: new Date().toISOString() })
      localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
      showToast('Subscribed! Thank you for joining our newsletter.', 'success')
    }, 1000)
  }

  const socials = [
    { href: COMPANY.social.twitter,   Icon: Twitter,   label: 'Twitter' },
    { href: COMPANY.social.linkedin,  Icon: Linkedin,  label: 'LinkedIn' },
    { href: COMPANY.social.facebook,  Icon: Facebook,  label: 'Facebook' },
    { href: COMPANY.social.youtube,   Icon: Youtube,   label: 'YouTube' },
    { href: COMPANY.social.instagram, Icon: Instagram, label: 'Instagram' },
  ]

  return (
    <footer
      style={{ background: "var(--gray-900)", color: "#fff", paddingTop: 72 }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand col */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--green-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="images/logo.png"
                  alt="GeoTreks Kenya Logo"
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 10,
                    boxShadow: "0 2px 8px rgba(10,92,71,0.3)",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  GeoTreks Kenya
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--green-400)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Geospatial · Survey · Remote Sensing
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: 20,
                maxWidth: 300,
              }}
            >
              East Africa's trusted geospatial partner. We turn spatial data
              into strategic decisions for governments, NGOs, and businesses.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.2s",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--green-600)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Services
            </div>
            {[
              "Land Surveying",
              "GIS Solutions",
              "Remote Sensing",
              "Drone Surveys",
              "Spatial Data",
              "Training",
            ].map((s) => (
              <Link
                key={s}
                to="/services"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 10,
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--green-400)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Company
            </div>
            {[
              { l: "About Us", t: "/about" },
              { l: "Our Projects", t: "/projects" },
              { l: "Insights", t: "/blog" },
              { l: "Contact", t: "/contact" },
            ].map(({ l, t }) => (
              <Link
                key={l}
                to={t}
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 10,
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--green-400)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Newsletter + Contact */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Stay updated
            </div>
            {subbed ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--green-400)",
                  fontSize: 14,
                  marginBottom: 24,
                }}
              >
                <CheckCircle size={18} /> You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} style={{ marginBottom: 28 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 12,
                  }}
                >
                  Geospatial insights, project updates, and news.
                </p>
                <div style={{ display: "flex", gap: 0 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "8px 0 0 8px",
                      background: "rgba(255,255,255,0.07)",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      outline: "none",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "10px 14px",
                      background: "var(--green-600)",
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {loading ? (
                      <div
                        className="spinner"
                        style={{ width: 16, height: 16 }}
                      />
                    ) : (
                      <ArrowRight size={18} color="white" />
                    )}
                  </button>
                </div>
              </form>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} color="var(--green-400)" /> {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                <Mail size={14} color="var(--green-400)" /> {COMPANY.email}
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {/* <MapPin
                  size={14}
                  color="var(--green-400)"
                  style={{ flexShrink: 0, marginTop: 2 }}
                />{" "} *
                 {COMPANY.address} */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} GeoTreks Kenya. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (t) => (
                <a
                  key={t}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.35)")
                  }
                >
                  {t}
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
