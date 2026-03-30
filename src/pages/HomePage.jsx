import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Satellite,
  Plane,
  Database,
  Map,
  Ruler,
  GraduationCap,
  CheckCircle,
  Play,
  Star,
  ChevronRight,
} from "lucide-react";
import {
  COMPANY,
  SERVICES,
  STATS,
  PROJECTS,
  TESTIMONIALS,
  PARTNERS,
} from "../data/content";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ICON_MAP = { Ruler, Map, Satellite, Plane, Database, GraduationCap };

function StatCard({ value, label, icon: Icon }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal" style={{ textAlign: "center" }}>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const ref = useScrollReveal();
  const Icon = ICON_MAP[service.icon] || Map;
  return (
    <Link
      to="/services"
      ref={ref}
      className="reveal card"
      style={{
        padding: "28px",
        textDecoration: "none",
        display: "block",
        animationDelay: `${index * 0.08}s`,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          background: service.color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Icon size={24} color={service.color} />
      </div>
      <h3
        style={{
          fontSize: "1.05rem",
          marginBottom: 8,
          color: "var(--gray-900)",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--gray-500)",
          lineHeight: 1.65,
          marginBottom: 14,
        }}
      >
        {service.subtitle}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: service.color,
          fontWeight: 600,
          fontSize: 13,
          fontFamily: "var(--font-display)",
        }}
      >
        Learn more <ChevronRight size={14} />
      </div>
    </Link>
  );
}

function TestimonialCard({ t }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal card" style={{ padding: "28px" }}>
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="var(--amber)" color="var(--amber)" />
        ))}
      </div>
      <p
        style={{
          fontSize: 15,
          color: "var(--gray-700)",
          lineHeight: 1.75,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        "{t.quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          className="avatar"
          style={{ width: 44, height: 44, fontSize: 14, background: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--gray-900)",
            }}
          >
            {t.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--gray-500)" }}>
            {t.role} · {t.org}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const heroRef = useScrollReveal(0.05);
  const [partnerOffset, setPartnerOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPartnerOffset((v) => v - 0.5), 20);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-gradient hero-pattern"
      >
        {/* Gradient background overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at -10% 60%, #1a6fd4 0%, #1254a8 25%, #0d3d8a 45%, #091e5c 65%, #060e38 100%)`,
          }}
        />
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: "-5%",
            top: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container"
          style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}
        >
          <div style={{ maxWidth: 760 }}>
            <div
              className="label fade-in"
              style={{
                color: "rgba(255,255,255,0.8)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{ width: 28, height: 2, background: "var(--green-400)" }}
              />
              East Africa's Geospatial Partner
            </div>

            <h1
              className="display fade-in"
              style={{
                color: "#fff",
                marginBottom: 24,
                animationDelay: "0.1s",
              }}
            >
              Precision Mapping,
              <br />
              <span style={{ color: "var(--green-400)" }}>Trusted</span>{" "}
              Intelligence.
            </h1>

            <p
              className="lead fade-in"
              style={{
                color: "rgba(255,255,255,0.75)",
                maxWidth: 560,
                marginBottom: 40,
                animationDelay: "0.2s",
              }}
            >
              GeoTreks Kenya delivers world-class geospatial surveys, GIS
              solutions, remote sensing analysis, and drone mapping services
              across Kenya and East Africa.
            </p>

            <div
              className="fade-in"
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                animationDelay: "0.3s",
              }}
            >
              <Link to="/services" className="btn btn-white btn-lg">
                Explore Services <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="btn btn-outline-white btn-lg">
                View Our Work
              </Link>
            </div>

            {/* Quick stats strip */}
            <div
              className="hero-stats"
              style={{
                display: "flex",
                gap: 40,
                marginTop: 56,
                flexWrap: "wrap",
                animationDelay: "0.4s",
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderLeft: "2px solid rgba(255,255,255,0.2)",
                    paddingLeft: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 26,
                      color: "var(--green-400)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.55)",
                      marginTop: 2,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ── */}
      <section
        style={{
          background: "var(--gray-900)",
          padding: "28px 0",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
          <div
            style={{
              display: "flex",
              gap: 64,
              transform: `translateX(${partnerOffset}px)`,
              transition: "none",
              alignItems: "center",
            }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="section-header">
            <span className="label">What we do</span>
            <h2>Comprehensive Geospatial Services</h2>
            <p>
              From precise land surveys to satellite image analysis and custom
              GIS applications — we cover the full spectrum of spatial data
              services.
            </p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/services" className="btn btn-primary btn-lg">
              See all services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ background: "var(--green-700)", padding: "64px 0" }}>
        <div className="container">
          <div className="grid-4">
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "3rem",
                    color: "#fff",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Our work</span>
            <h2>Featured Projects</h2>
            <p>
              Real projects. Measurable outcomes. Delivered across Kenya and
              East Africa.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {PROJECTS.filter((p) => p.featured).map((proj, i) => {
              const ref = useScrollReveal();
              return (
                <div
                  key={proj.id}
                  ref={ref}
                  className="reveal card project-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "2fr 3fr" : "3fr 2fr",
                    overflow: "hidden",
                  }}
                >
                  {/* Color panel */}
                  {i % 2 === 1 && (
                    <div
                      style={{
                        background: proj.color,
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        order: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        {proj.category}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "2.5rem",
                          color: "#fff",
                          opacity: 0.15,
                          lineHeight: 1,
                        }}
                      >
                        {proj.year}
                      </div>
                    </div>
                  )}
                  {/* Content */}
                  <div style={{ padding: "36px 40px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginBottom: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="badge badge-green">{proj.category}</span>
                      <span className="badge badge-gray">{proj.year}</span>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", marginBottom: 10 }}>
                      {proj.title}
                    </h3>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--gray-500)",
                        marginBottom: 14,
                      }}
                    >
                      Client:{" "}
                      <strong style={{ color: "var(--gray-700)" }}>
                        {proj.client}
                      </strong>
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--gray-600)",
                        lineHeight: 1.7,
                        marginBottom: 20,
                      }}
                    >
                      {proj.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {proj.outcomes.slice(0, 2).map((o, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                            fontSize: 13,
                            color: "var(--gray-600)",
                          }}
                        >
                          <CheckCircle
                            size={14}
                            color="var(--green-600)"
                            style={{ flexShrink: 0, marginTop: 2 }}
                          />{" "}
                          {o}
                        </div>
                      ))}
                    </div>
                  </div>
                  {i % 2 === 0 && (
                    <div
                      style={{
                        background: proj.color,
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        order: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        {proj.category}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "2.5rem",
                          color: "#fff",
                          opacity: 0.15,
                          lineHeight: 1,
                        }}
                      >
                        {proj.year}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginTop: 20,
                        }}
                      >
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 11,
                              background: "rgba(255,255,255,0.15)",
                              color: "rgba(255,255,255,0.9)",
                              padding: "3px 10px",
                              borderRadius: 99,
                              fontWeight: 600,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/projects" className="btn btn-outline btn-lg">
              View all projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
        <div className="container">
          <div className="section-header">
            <span className="label">Client voices</span>
            <h2>What Our Clients Say</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ background: "var(--green-700)", padding: "80px 0" }}
        className="hero-pattern"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Start your project
          </span>
          <h2 style={{ color: "#fff", marginTop: 12, marginBottom: 16 }}>
            Ready to map your world?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 500,
              margin: "0 auto 36px",
              fontSize: "1.05rem",
            }}
          >
            Tell us about your project. We'll get back to you within 24 hours
            with a no-obligation assessment.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/contact" className="btn btn-white btn-lg">
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="btn btn-outline-white btn-lg"
            >
              Call us now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
