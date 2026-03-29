import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Public site
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import HomePage    from './pages/HomePage'
import AboutPage   from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import BlogPage    from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'

// Admin
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminPages  from './admin/AdminPages'
import AdminBlog   from './admin/AdminBlog'
import AdminSettings from './admin/AdminSettings'
import AdminLogs   from './admin/AdminLogs'

// Toast
import { ToastContainer } from './components/Toast'

function PublicLayout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        <Routes>
          <Route index        element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog"     element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact"  element={<ContactPage />} />
          <Route path="*"        element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [toasts, setToasts] = useState([])

  function addToast(msg, type = 'success') {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }

  // Make toast globally accessible via custom event
  useEffect(() => {
    const handler = e => addToast(e.detail.msg, e.detail.type)
    window.addEventListener('show-toast', handler)
    return () => window.removeEventListener('show-toast', handler)
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer toasts={toasts} />
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index           element={<AdminDashboard />} />
          <Route path="pages"    element={<AdminPages />} />
          <Route path="blog"     element={<AdminBlog />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="logs"     element={<AdminLogs />} />
        </Route>
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

// Helper to fire toast from anywhere
export function showToast(msg, type = 'success') {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { msg, type } }))
}
