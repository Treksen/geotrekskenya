import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, ArrowRight, Tag } from 'lucide-react'
import { BLOG_POSTS } from '../data/content'
import { format } from 'date-fns'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CATEGORIES = ['All', ...new Set(BLOG_POSTS.map(p => p.category))]

function PostCard({ post, featured }) {
  const ref = useScrollReveal()
  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} ref={ref} className="reveal card"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', textDecoration: 'none', overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(135deg, ${post.authorColor}dd, ${post.authorColor}88)`, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: 99, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{post.category}</span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: '#fff', opacity: 0.15, lineHeight: 1, marginBottom: 16 }}>Featured</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 12, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>{post.initials}</div>
              <div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{post.author}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{post.authorRole}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 12, color: 'var(--gray-400)', alignItems: 'center' }}>
            <span>{format(new Date(post.date), 'dd MMM yyyy')}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime} min read</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 14, lineHeight: 1.35 }}>{post.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 20 }}>{post.excerpt}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
            {post.tags.slice(0, 3).map(t => <span key={t} className="tag tag-green" style={{ fontSize: 11 }}>{t}</span>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green-600)', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-display)' }}>
            Read article <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/blog/${post.slug}`} ref={ref} className="reveal card"
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: `linear-gradient(135deg, ${post.authorColor}22, ${post.authorColor}08)`, padding: '28px 24px 20px', borderBottom: '1px solid var(--gray-100)' }}>
        <span style={{ fontSize: 11, background: post.authorColor + '22', color: post.authorColor, padding: '3px 10px', borderRadius: 99, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{post.category}</span>
      </div>
      <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 12, color: 'var(--gray-400)', alignItems: 'center' }}>
          <span>{format(new Date(post.date), 'dd MMM yyyy')}</span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime} min</span>
        </div>
        <h3 style={{ fontSize: '1rem', marginBottom: 10, lineHeight: 1.4, flex: 1 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt.slice(0, 120)}…</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--gray-100)', paddingTop: 14 }}>
          <div className="avatar" style={{ width: 30, height: 30, fontSize: 10, background: post.authorColor, flexShrink: 0 }}>{post.initials}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: 'var(--gray-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.author}</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--green-600)' }}><ArrowRight size={14} /></div>
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const featured  = filtered.filter(p => p.featured)
  const rest      = filtered.filter(p => !p.featured)

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--green-700)', padding: '100px 0 72px' }} className="hero-pattern">
        <div className="container">
          <span className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Knowledge hub</span>
          <h1 style={{ color: '#fff', maxWidth: 560, marginTop: 12, marginBottom: 20 }}>
            GeoTreks Insights
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 500, fontSize: '1.05rem', lineHeight: 1.75 }}>
            Geospatial analysis, survey practice, remote sensing tutorials, and industry commentary from the GeoTreks Kenya team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Search + filter */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
              <input
                className="form-input"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 42 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{
                    padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                    border: '1.5px solid', cursor: 'pointer', fontFamily: 'var(--font-display)',
                    transition: 'all 0.15s',
                    background: category === cat ? 'var(--green-700)' : '#fff',
                    color:      category === cat ? '#fff' : 'var(--gray-600)',
                    borderColor:category === cat ? 'var(--green-700)' : 'var(--gray-200)',
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>
              <Search size={40} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <h3 style={{ color: 'var(--gray-600)' }}>No articles found</h3>
              <p style={{ color: 'var(--gray-400)' }}>Try a different search term or category</p>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <div className="section-label" style={{ marginBottom: 20 }}>Featured</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {featured.map(p => <PostCard key={p.id} post={p} featured />)}
                  </div>
                </div>
              )}
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && <div className="section-label" style={{ marginBottom: 20 }}>More articles</div>}
                  <div className="grid-3">
                    {rest.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: 'var(--gray-50)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
          <span className="label">Stay informed</span>
          <h2 style={{ marginTop: 12, marginBottom: 16 }}>Get insights in your inbox</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: 32 }}>
            Monthly digest of geospatial news, tutorials, and GeoTreks project updates. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={e => {
            e.preventDefault()
            const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
            logs.unshift({ id: Date.now(), type: 'info', message: `Newsletter signup from blog page`, time: new Date().toISOString() })
            localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
            e.target.reset()
            import('../App').then(m => m.showToast('Subscribed! Welcome to the GeoTreks community.'))
          }}
            style={{ display: 'flex', gap: 0, maxWidth: 460, margin: '0 auto' }}>
            <input type="email" className="form-input" placeholder="your@email.com" required style={{ borderRadius: '10px 0 0 10px', borderRight: 'none' }} />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 10px 10px 0', flexShrink: 0 }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}
