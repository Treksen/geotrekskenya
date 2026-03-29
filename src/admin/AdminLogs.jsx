import React, { useState, useEffect } from 'react'
import { Activity, Trash2, RefreshCw, Download, Filter, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react'
import { INITIAL_LOGS } from '../data/content'
import { format, formatDistanceToNow } from 'date-fns'

export default function AdminLogs() {
  const [logs,   setLogs]   = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('gt_logs') || '[]')
    // Merge with initial logs (seeded from content.js)
    const combined = [...stored]
    INITIAL_LOGS.forEach(il => { if (!combined.find(l => l.message === il.message)) combined.push({ ...il, time: il.time.toISOString ? il.time.toISOString() : il.time }) })
    combined.sort((a, b) => new Date(b.time) - new Date(a.time))
    setLogs(combined)
  }, [])

  function clearLogs() {
    if (!confirm('Clear all logs?')) return
    localStorage.removeItem('gt_logs')
    setLogs([])
  }

  function exportLogs() {
    const lines = logs.map(l => `[${l.type.toUpperCase()}] ${l.time} — ${l.message}`)
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = Object.assign(document.createElement('a'), { href: url, download: `geotreks-logs-${format(new Date(), 'yyyy-MM-dd')}.txt` })
    a.click(); URL.revokeObjectURL(url)
  }

  function addTestLog() {
    const newLog = { id: Date.now(), type: 'info', message: 'Test log entry added from admin panel', time: new Date().toISOString() }
    const updated = [newLog, ...logs]
    setLogs(updated)
    localStorage.setItem('gt_logs', JSON.stringify(updated.filter(l => !INITIAL_LOGS.find(il => il.message === l.message)).slice(0, 100)))
  }

  const TYPE_ICON = {
    success: <CheckCircle size={14} color="#059669" />,
    info:    <Info size={14} color="#3b82f6" />,
    warning: <AlertTriangle size={14} color="#f59e0b" />,
    error:   <XCircle size={14} color="#ef4444" />,
  }
  const TYPE_COLOR = { success: '#059669', info: '#3b82f6', warning: '#f59e0b', error: '#ef4444' }
  const TYPE_BG    = { success: '#f0fdf4', info: '#eff6ff', warning: '#fffbeb', error: '#fef2f2' }

  const filtered = filter === 'all' ? logs : logs.filter(l => l.type === filter)

  const counts = { all: logs.length, success: logs.filter(l=>l.type==='success').length, info: logs.filter(l=>l.type==='info').length, warning: logs.filter(l=>l.type==='warning').length, error: logs.filter(l=>l.type==='error').length }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: 4 }}>Activity Logs</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Site activity, form submissions, and system events.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={addTestLog}><Activity size={14} /> Add test log</button>
          <button className="btn btn-ghost btn-sm" onClick={exportLogs}><Download size={14} /> Export</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { const stored = JSON.parse(localStorage.getItem('gt_logs') || '[]'); const combined = [...stored, ...INITIAL_LOGS.map(l => ({ ...l, time: l.time.toISOString ? l.time.toISOString() : l.time }))]; combined.sort((a,b)=>new Date(b.time)-new Date(a.time)); setLogs(combined) }}><RefreshCw size={14} /> Refresh</button>
          <button className="btn btn-danger btn-sm" onClick={clearLogs}><Trash2 size={14} /> Clear</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {[
          { key: 'all',     label: 'Total',   color: 'var(--gray-600)' },
          { key: 'success', label: 'Success', color: '#059669' },
          { key: 'info',    label: 'Info',    color: '#3b82f6' },
          { key: 'warning', label: 'Warning', color: '#f59e0b' },
          { key: 'error',   label: 'Error',   color: '#ef4444' },
        ].map(({ key, label, color }) => (
          <button key={key} onClick={() => setFilter(key)}
            className="admin-card"
            style={{ textAlign: 'center', cursor: 'pointer', border: filter === key ? `2px solid ${color}` : '1px solid var(--gray-200)', transition: 'all 0.15s', padding: '14px 8px', background: filter===key ? color+'0d' : '#fff' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color, fontFamily: 'var(--font-display)' }}>{counts[key]}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{label}</div>
          </button>
        ))}
      </div>

      {/* Log table */}
      <div className="admin-card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={15} color="var(--gray-400)" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>
            {filter === 'all' ? 'All events' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' events'} ({filtered.length})
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--gray-400)' }}>
            <Activity size={36} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div style={{ fontSize: 14 }}>No log entries found</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                  {['Type', 'Message', 'Time', 'Relative'].map(h => (
                    <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <tr key={log.id || i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 99, background: TYPE_BG[log.type] || '#f9fafb', fontSize: 11, fontWeight: 700, color: TYPE_COLOR[log.type] || 'var(--gray-500)', fontFamily: 'var(--font-display)' }}>
                        {TYPE_ICON[log.type]} {log.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', fontSize: 13, color: 'var(--gray-700)', maxWidth: 400 }}>{log.message}</td>
                    <td style={{ padding: '12px 18px', fontSize: 12, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      {log.time ? format(new Date(log.time), 'dd MMM yyyy HH:mm:ss') : '—'}
                    </td>
                    <td style={{ padding: '12px 18px', fontSize: 12, color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
                      {log.time ? formatDistanceToNow(new Date(log.time), { addSuffix: true }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>
        Logs are stored in your browser's localStorage. They persist across sessions but are cleared when browser data is cleared. For production, connect to a server-side logging service.
      </div>
    </div>
  )
}
