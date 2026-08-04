import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router'

const LINKS = [
  {
    label: 'Home', to: '/',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: 'About', to: '/about',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  {
    label: 'How It Works', to: '/how-it-works',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>,
  },
  {
    label: 'Team', to: '/team',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    label: 'Report', to: '/report',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    label: 'Slides', to: '/animation',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21l4-4 4 4"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    label: 'Contact', to: '/contact',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
]

function IrisLogo({ onClick }: { onClick: () => void }) {
  return (
    <div className="iris-logo-wrap" onClick={onClick} role="button" aria-label="I.R.I.S Home">
      <button className="iris-btn" type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="3" fill="rgba(201,168,76,0.9)"/>
          <circle cx="12" cy="12" r="6.5" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" fill="none"/>
          <circle cx="12" cy="12" r="10" stroke="rgba(201,168,76,0.22)" strokeWidth="0.8" fill="none"/>
          <line x1="12" y1="2" x2="12" y2="5.5" stroke="rgba(201,168,76,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="12" y1="18.5" x2="12" y2="22" stroke="rgba(201,168,76,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="2" y1="12" x2="5.5" y2="12" stroke="rgba(201,168,76,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="18.5" y1="12" x2="22" y2="12" stroke="rgba(201,168,76,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <span className="iris-btn-txt">I.R.I.S</span>
      </button>
      <div className="iris-dot" />
    </div>
  )
}

export function Navbar({ onLogoClick }: { onLogoClick: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      {/* ── Minimal top bar ────────────────────────────────────────────────── */}
      <div className={`iris-topbar${scrolled ? ' scrolled' : ''}`}>
        <IrisLogo onClick={onLogoClick} />
        <div
          className="badge-pulse"
          style={{
            padding: '4px 13px',
            borderRadius: 999,
            fontSize: 10,
            fontFamily: 'JetBrains Mono,monospace',
            fontWeight: 500,
            color: 'var(--accent)',
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(201,168,76,0.07)',
          }}
        >
          I.R.I.S · v1.0
        </div>
      </div>

      {/* ── Bottom dock ────────────────────────────────────────────────────── */}
      <nav className="iris-nav-dock" aria-label="Main navigation">
        {LINKS.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
