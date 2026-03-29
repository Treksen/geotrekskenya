import React from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

export function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {t.msg}
        </div>
      ))}
    </div>
  )
}
