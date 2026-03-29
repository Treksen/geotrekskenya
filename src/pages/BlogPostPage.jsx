import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Tag, Share2, Twitter, Linkedin, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '../data/content'
import { format } from 'date-fns'

function renderContent(content) {
  const lines = content.split('\n')
  const elements = []
  let i = 0
  let codeBlock = []
  let inCode = false

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (!inCode) { inCode = true; codeBlock = []; i++; continue }
      else {
        elements.push(
          <pre key={elements.length} style={{ background: 'var(--gray-900)', color: '#e2e8f0', padding: '20px 24px', borderRadius: 12, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'var(--font-mono)', marginBottom: 24 }}>
            <code>{codeBlock.join('\n')}</code>
          </pre>
        )
        inCode = false; codeBlock = []; i++; continue
      }
    }
    if (inCode) { codeBlock.push(line); i++; continue }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={elements.length} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: 40, marginBottom: 16 }}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={elements.length} style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: 28, marginBottom: 12 }}>{line.slice(4)}</h3>)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={elements.length} style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: 10 }}>{line.slice(2, -2)}</p>)
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={elements.length} style={{ paddingLeft: 24, marginBottom: 20 }}>
          {items.map((item, j) => (
            <li key={j} style={{ fontSize: '1rem', color: 'var(--gray-700)', lineHeight: 1.75, marginBottom: 6 }}>
              {item.replace(/\*\*([^*]+)\*\*/g, '').replace(/`([^`]+)`/g, '$1')}
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Process inline markdown
      const processed = line
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, `<code style="background:var(--gray-100);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.88em;color:var(--green-700)">$1</code>`)
      elements.push(
        <p key={elements.length} style={{ fontSize: '1.05rem', color: 'var(--gray-700)', lineHeight: 1.85, marginBottom: 18 }}
          dangerouslySetInnerHTML={{ __html: processed }} />
      )
    }
    i++
  }
  return elements
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  const related = BLOG_POSTS.filter(p => p.slug !== slug && (p.category === post?.category || p.tags.some(t => post?.tags.includes(t)))).slice(0, 2)

  useEffect(() => {
    document.title = post ? `${post.title} | GeoTreks Kenya` : 'GeoTreks Kenya'
    return () => { document.title = 'GeoTreks Kenya | Geospatial, Survey & Remote Sensing' }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const shareUrl = `https://geotreks.co.ke/blog/${post.slug}`

  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${post.authorColor}ee, ${post.authorColor}99)`, padding: '80px 0 56px' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', marginBottom: 28, fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
            <ArrowLeft size={16} /> Back to Insights
          </Link>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>{post.category}</span>
            {post.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: 12, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', padding: '4px 12px', borderRadius: 99 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.25, marginBottom: 24 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar" style={{ width: 42, height: 42, fontSize: 14, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>{post.initials}</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{post.author}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{post.authorRole}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} /> {format(new Date(post.date), 'dd MMMM yyyy')}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> {post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 860, display: 'grid', gridTemplateColumns: '1fr 200px', gap: 64, alignItems: 'start' }}>
          {/* Content */}
          <article>
            <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic', borderLeft: '3px solid var(--green-500)', paddingLeft: 20 }}>
              {post.excerpt}
            </p>
            {renderContent(post.content)}

            {/* Tags */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Tag size={14} color="var(--gray-400)" />
                {post.tags.map(t => <span key={t} className="tag tag-green">{t}</span>)}
              </div>
            </div>

            {/* Share */}
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: '#e7f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1da1f2', textDecoration: 'none' }}>
                <Twitter size={16} />
              </a>
              <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: '#e8f4fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0077b5', textDecoration: 'none' }}>
                <Linkedin size={16} />
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 96 }}>
            <div className="card-flat" style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gray-700)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>About the author</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <div className="avatar" style={{ width: 44, height: 44, fontSize: 14, background: post.authorColor }}>{post.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{post.author}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{post.authorRole}</div>
                </div>
              </div>
            </div>
            <div className="card-flat">
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gray-700)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>Get in touch</div>
              <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 14, lineHeight: 1.6 }}>Have a question about this topic? We're happy to discuss your project.</p>
              <Link to="/contact" className="btn btn-primary btn-sm btn-full">Contact us <ArrowRight size={13} /></Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: 'var(--gray-50)', padding: '64px 0' }}>
          <div className="container">
            <h3 style={{ marginBottom: 32 }}>Related articles</h3>
            <div className="grid-2">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="card" style={{ textDecoration: 'none', padding: '24px', display: 'flex', gap: 16 }}>
                  <div className="avatar" style={{ width: 48, height: 48, fontSize: 16, background: p.authorColor, flexShrink: 0 }}>{p.initials}</div>
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: 8, fontSize: 10 }}>{p.category}</span>
                    <h4 style={{ fontSize: '0.95rem', lineHeight: 1.4, color: 'var(--gray-900)', marginBottom: 6 }}>{p.title}</h4>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', display: 'flex', gap: 8 }}>
                      <span>{format(new Date(p.date), 'dd MMM yyyy')}</span>
                      <span>·</span>
                      <span>{p.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
