import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, Save, X, ArrowLeft } from 'lucide-react'
import { BLOG_POSTS } from '../data/content'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function AdminBlog() {
  const [posts,    setPosts]    = useState(BLOG_POSTS)
  const [editing,  setEditing]  = useState(null)  // null | 'new' | post object
  const [saved,    setSaved]    = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Technology', author: '', authorRole: '', initials: '', readTime: 5, tags: '', featured: false, date: new Date().toISOString().split('T')[0] })

  const CATEGORIES = ['Technology', 'Training', 'Policy', 'Projects', 'Industry']

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function startNew() {
    setForm({ title: '', slug: '', excerpt: '', content: '', category: 'Technology', author: '', authorRole: '', initials: '', authorColor: '#0a5c47', readTime: 5, tags: '', featured: false, date: new Date().toISOString().split('T')[0] })
    setEditing('new')
  }

  function startEdit(post) {
    setForm({ ...post, tags: post.tags.join(', ') })
    setEditing(post)
  }

  function savePost() {
    const processed = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), readTime: Number(form.readTime) }
    if (editing === 'new') {
      setPosts(p => [{ ...processed, id: 'blog' + Date.now() }, ...p])
    } else {
      setPosts(p => p.map(x => x.id === editing.id ? { ...x, ...processed } : x))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setEditing(null)
    // Log
    const logs = JSON.parse(localStorage.getItem('gt_logs') || '[]')
    logs.unshift({ id: Date.now(), type: 'success', message: `Blog post ${editing === 'new' ? 'created' : 'updated'}: ${form.title}`, time: new Date().toISOString() })
    localStorage.setItem('gt_logs', JSON.stringify(logs.slice(0, 100)))
  }

  function deletePost(id) {
    if (!confirm('Delete this post?')) return
    setPosts(p => p.filter(x => x.id !== id))
  }

  if (editing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', display: 'flex' }}><ArrowLeft size={20} /></button>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{editing === 'new' ? 'New blog post' : 'Edit post'}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="admin-card">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--gray-800)' }}>Post content</div>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={e => { set('title', e.target.value); set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) }} />
              </div>
              <div className="form-group">
                <label className="form-label">URL slug</label>
                <input className="form-input" value={form.slug} onChange={e => set('slug', e.target.value)} style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Excerpt (shown in listings)</label>
                <textarea className="form-textarea" style={{ minHeight: 80 }} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Full content (supports Markdown: ## headings, **bold**, \`code\`, - lists)</label>
                <textarea className="form-textarea" style={{ minHeight: 320, fontFamily: 'var(--font-mono)', fontSize: 13 }} value={form.content} onChange={e => set('content', e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="admin-card">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--gray-800)' }}>Post settings</div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Publish date</label>
                <input type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Read time (minutes)</label>
                <input type="number" className="form-input" value={form.readTime} onChange={e => set('readTime', e.target.value)} min="1" max="30" />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input className="form-input" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="GIS, Kenya, Remote Sensing" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--green-600)' }} />
                <label htmlFor="featured" style={{ fontSize: 14, fontWeight: 500, color: 'var(--gray-700)', cursor: 'pointer' }}>Featured post</label>
              </div>
            </div>

            <div className="admin-card">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--gray-800)' }}>Author</div>
              <div className="form-group">
                <label className="form-label">Full name</label>
                <input className="form-input" value={form.author} onChange={e => set('author', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Role / title</label>
                <input className="form-input" value={form.authorRole} onChange={e => set('authorRole', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Initials</label>
                  <input className="form-input" value={form.initials} onChange={e => set('initials', e.target.value)} maxLength={2} style={{ textTransform: 'uppercase' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Avatar colour</label>
                  <input type="color" value={form.authorColor || '#0a5c47'} onChange={e => set('authorColor', e.target.value)} style={{ width: '100%', height: 42, border: '1.5px solid var(--gray-200)', borderRadius: 10, cursor: 'pointer', padding: 3 }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={savePost} style={{ flex: 1 }}>
                <Save size={15} /> {saved ? 'Saved!' : 'Save post'}
              </button>
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 4 }}>Blog Posts</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>{posts.length} articles</p>
        </div>
        <button className="btn btn-primary" onClick={startNew}><Plus size={16} /> New post</button>
      </div>

      {saved && <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', color: 'var(--green-700)', padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500 }}>✓ Changes saved successfully</div>}

      <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
              {['Title', 'Category', 'Author', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)', maxWidth: 280 }}>{post.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>/{post.slug}</div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600, background: 'var(--green-50)', color: 'var(--green-700)', fontFamily: 'var(--font-display)' }}>{post.category}</span>
                </td>
                <td style={{ padding: '14px 18px', fontSize: 13, color: 'var(--gray-600)' }}>{post.author?.split(' ').slice(-1)[0]}</td>
                <td style={{ padding: '14px 18px', fontSize: 13, color: 'var(--gray-400)' }}>{format(new Date(post.date), 'dd MMM yyyy')}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600, background: post.featured ? 'var(--green-50)' : 'var(--gray-100)', color: post.featured ? 'var(--green-700)' : 'var(--gray-500)', fontFamily: 'var(--font-display)' }}>
                    {post.featured ? '★ Featured' : 'Published'}
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link to={`/blog/${post.slug}`} target="_blank" title="Preview" style={{ color: 'var(--gray-400)', display: 'flex' }}><Eye size={16} /></Link>
                    <button onClick={() => startEdit(post)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blue)', display: 'flex' }}><Edit2 size={16} /></button>
                    <button onClick={() => deletePost(post.id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-300)', display: 'flex' }}
                      onMouseEnter={e => e.currentTarget.style.color='var(--red)'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--gray-300)'}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
