import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Award, Linkedin } from 'lucide-react'
import { COMPANY, TEAM, STATS } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'

const VALUES = [
  { icon: Target, title: 'Precision',   text: 'We hold ourselves to the highest standards of accuracy. Every dataset, boundary, and analysis we deliver is rigorously validated before reaching a client.' },
  { icon: Eye,    title: 'Integrity',   text: 'We give honest assessments even when they\'re inconvenient. If a project scope needs to change, we tell you early — not in the final report.' },
  { icon: Heart,  title: 'Impact',      text: 'We measure success by what changes on the ground. Better land tenure, faster infrastructure, smarter conservation — that\'s what drives us.' },
  { icon: Award,  title: 'Excellence',  text: 'Our team includes registered surveyors, MSc-level GIS specialists, and certified drone pilots. We invest in skills because our clients deserve expertise.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: "var(--green-700)", padding: "100px 0 72px" }}
        className="hero-pattern"
      >
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Who we are
          </span>
          <h1
            style={{
              color: "#fff",
              maxWidth: 640,
              marginTop: 12,
              marginBottom: 20,
            }}
          >
            Mapping Kenya's future, one coordinate at a time.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: 560,
              fontSize: "1.1rem",
              lineHeight: 1.75,
            }}
          >
            GeoTreks Kenya was founded in {COMPANY.founded} by a team of
            surveyors and GIS specialists who saw an opportunity to bring
            rigorous geospatial practice to East Africa's fast-growing
            development agenda.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div
            className="responsive-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div className="fade-in-left">
              <span className="label">Our story</span>
              <h2 style={{ marginTop: 12, marginBottom: 20 }}>
                Built from the field up
              </h2>
              <p style={{ color: "var(--gray-600)", marginBottom: 18 }}>
                We started with a total station, a GPS receiver, and a
                conviction that Kenyan organisations deserved better geospatial
                data than they were getting. Our founders had watched large
                international firms charge premium rates for work that
                underutilised local expertise — and deliver datasets that sat
                unused because they weren't designed around how local teams
                actually worked.
              </p>
              <p style={{ color: "var(--gray-600)", marginBottom: 18 }}>
                From our first boundary survey in Kiambu County in 2024, we've
                grown to a team of {COMPANY.employees} specialists covering land
                surveying, GIS development, remote sensing, and drone
                operations. We've delivered {COMPANY.projects} projects across{" "}
                {COMPANY.clients} organisations — from county governments to
                international NGOs to private developers.
              </p>
              <p style={{ color: "var(--gray-600)", marginBottom: 28 }}>
                We're proud that 70% of our work comes from repeat clients or
                referrals. That number tells us more than any award.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats panel */}
            <div
              className="fade-in-right"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="card-flat"
                  style={{ textAlign: "center" }}
                >
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
              <div className="card-flat" style={{ textAlign: "center" }}>
                <div className="stat-number" style={{ fontSize: "2rem" }}>
                  ISK
                </div>
                <div className="stat-label">Registered surveyors</div>
              </div>
              <div className="card-flat" style={{ textAlign: "center" }}>
                <div className="stat-number" style={{ fontSize: "2rem" }}>
                  KCAA
                </div>
                <div className="stat-label">Licensed drone ops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-sm" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="grid-2">
            <div
              className="card"
              style={{
                padding: "40px",
                borderTop: "4px solid var(--green-600)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--green-600)",
                  marginBottom: 14,
                  fontFamily: "var(--font-display)",
                }}
              >
                Our Mission
              </div>
              <h3 style={{ marginBottom: 16 }}>
                Democratise spatial intelligence across Africa
              </h3>
              <p style={{ color: "var(--gray-600)", lineHeight: 1.75 }}>
                To provide world-class geospatial services that are accessible,
                relevant, and impactful — helping governments, businesses, and
                communities make better decisions through spatial understanding.
              </p>
            </div>
            <div
              className="card"
              style={{ padding: "40px", borderTop: "4px solid var(--blue)" }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  marginBottom: 14,
                  fontFamily: "var(--font-display)",
                }}
              >
                Our Vision
              </div>
              <h3 style={{ marginBottom: 16 }}>
                Africa's most trusted geospatial partner
              </h3>
              <p style={{ color: "var(--gray-600)", lineHeight: 1.75 }}>
                To be the partner that organisations turn to first when they
                need to understand their world spatially — known for technical
                excellence, honest counsel, and lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">What drives us</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="grid-4">
            {VALUES.map((v, i) => {
              const ref = useScrollReveal();
              return (
                <div
                  key={v.title}
                  ref={ref}
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: "var(--green-50)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <v.icon size={24} color="var(--green-600)" />
                  </div>
                  <h4 style={{ marginBottom: 10, color: "var(--gray-900)" }}>
                    {v.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--gray-600)",
                      lineHeight: 1.7,
                    }}
                  >
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="section-header">
            <span className="label">The people</span>
            <h2>Meet the Team</h2>
            <p>
              Our team combines academic training with deep field experience
              across Kenya and the broader East Africa region.
            </p>
          </div>
          <div className="grid-3">
            {TEAM.map((member, i) => {
              const ref = useScrollReveal();
              return (
                <div
                  key={member.id}
                  ref={ref}
                  className="reveal card"
                  style={{ padding: "28px", transitionDelay: `${i * 0.08}s` }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 18,
                    }}
                  >
                    <div
                      className="avatar"
                      style={{
                        width: 56,
                        height: 56,
                        fontSize: 18,
                        background: member.color,
                      }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1rem", marginBottom: 3 }}>
                        {member.name}
                      </h4>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--green-600)",
                          fontWeight: 600,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--gray-600)",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {member.bio}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {/* {member.expertise.map(e => <span key={e} className="tag">{e}</span>)} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--green-700)", padding: "72px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: 16 }}>Join our team</h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              marginBottom: 32,
              maxWidth: 480,
              margin: "0 auto 32px",
            }}
          >
            We're always looking for talented surveyors, GIS professionals, and
            remote sensing specialists. Send your CV to careers@geotreks.co.ke
          </p>
          <a
            href="mailto:careers@geotreks.co.ke"
            className="btn btn-white btn-lg"
          >
            Apply <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
