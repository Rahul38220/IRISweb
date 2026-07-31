import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useScrollReveal, GlassCard, SectionLabel, SectionHeading, CTAButton } from '../components/shared'

function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  const [staring, setStaring] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleEnter = () => { timerRef.current = setTimeout(() => setStaring(true), 10000) }
  const handleLeave = () => { if (timerRef.current) clearTimeout(timerRef.current); setStaring(false) }

  const timeStr = time.toLocaleTimeString('en-GB', { hour12: false })
  const dateStr = time.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}
         style={{ padding: '24px 28px', borderRadius: 16, border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.05)', backdropFilter: 'blur(12px)', cursor: 'default' }}>
      <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>System Status</div>
      <div style={{ fontSize: 22, fontFamily: 'JetBrains Mono,monospace', color: 'var(--success)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>
        {timeStr}
      </div>
      <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'rgba(139,139,168,0.6)', marginBottom: 10 }}>{dateStr}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--success)' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
        STATUS: ALL CLEAR
      </div>
      {staring && (
        <div style={{ marginTop: 12, fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', animation: 'pulse 1.5s infinite' }}>
          you've been staring for a while. everything is fine. 📷
        </div>
      )}
    </div>
  )
}

const LINKS = [
  { label: 'Home', desc: 'Project overview and introduction', to: '/' },
  { label: 'About', desc: 'Deep dive into the technology and design decisions', to: '/about' },
  { label: 'How It Works', desc: 'Step-by-step technical walkthrough of all 8 pipeline stages', to: '/how-it-works' },
  { label: 'Team', desc: 'Meet Pratham, Hariom, and the mentors who guided the project', to: '/team' },
  { label: 'Report', desc: 'Download the complete 68-page research document', to: '/report' },
  { label: 'Slides', desc: 'View the animated physics presentation for I.R.I.S', to: '/animation' },
]

const TOOLS = [
  { name: 'Python 3', icon: '🐍', desc: 'Core language and runtime' },
  { name: 'OpenCV', icon: '👁', desc: 'Video capture, image processing, Haar Cascade, LBPH' },
  { name: 'MediaPipe', icon: '🦴', desc: 'BlazePose 33-point skeleton tracking' },
  { name: 'NumPy', icon: '📐', desc: 'Matrix operations and frame processing' },
  { name: 'React 19', icon: '⚛️', desc: 'Website frontend' },
  { name: 'Tailwind CSS v4', icon: '🎨', desc: 'Website styling' },
]

export default function Contact() {
  const nav = useNavigate()
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 64 }}>

      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 72px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <SectionLabel><span className="reveal">Contact & Info</span></SectionLabel>
        <SectionHeading>
          <span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>
            Get in Touch
          </span>
        </SectionHeading>
        <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', fontSize: 17, maxWidth: 520, margin: '20px auto 0', lineHeight: 1.72 }}>
          Questions about the project? Want to collaborate? Reach out to the I.R.I.S team directly.
        </p>
      </section>

      {/* ── Contact cards ──────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
          {/* Pratham */}
          <div className="reveal">
            <GlassCard accentColor="var(--accent)" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),var(--accent-3))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 18, flexShrink: 0, boxShadow: '0 0 20px rgba(99,102,241,0.28)' }}>PJ</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Pratham Joshi</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Developer & Researcher</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  Core system architect. Face recognition, weapon detection, and system integration.
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)' }}>
                  prathamdjoshi6@gmail.com
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Hariom */}
          <div className="reveal" style={{ animationDelay: '100ms' }}>
            <GlassCard accentColor="var(--accent-2)" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent-2),var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 18, flexShrink: 0, boxShadow: '0 0 20px rgba(45,212,191,0.28)' }}>HB</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Hariom Bhimani</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Developer & Researcher</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  Pose estimation, violence detection, alert systems, and HUD design.
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.18)', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent-2)' }}>
                  haashbhimani3444@gmail.com
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Project email */}
          <div className="reveal" style={{ animationDelay: '200ms' }}>
            <GlassCard accentColor="var(--accent-3)" style={{ padding: 32 }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>📬</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Project Enquiries</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 18 }}>
                For collaboration, academic enquiries, or press requests related to the I.R.I.S project.
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.18)', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent-3)' }}>
                iris.isc2627@gmail.com
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── Sitemap ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(180deg,var(--bg),#0d0d18)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel><span className="reveal">Navigation</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>All Pages</span></SectionHeading>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
            {LINKS.map((l, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <button onClick={() => nav(l.to)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <GlassCard style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{l.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>{l.desc}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'var(--text-2)' }}>
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </GlassCard>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech used ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel><span className="reveal">Built With</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Tools & Technologies</span></SectionHeading>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
            {TOOLS.map((t, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <GlassCard style={{ padding: '20px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── System status / easter egg clock ───────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel><span className="reveal">System Status</span></SectionLabel>
          <div className="reveal" style={{ animationDelay: '80ms' }}>
            <LiveClock />
          </div>
          <p className="reveal" style={{ animationDelay: '160ms', marginTop: 14, fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'rgba(139,139,168,0.35)' }}>
            Try hovering over the clock for 10 seconds.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(99,102,241,0.18)', padding: '48px 24px 32px', background: '#07070c' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ color: 'var(--text)', fontWeight: 900, fontSize: 15, letterSpacing: '0.18em', marginBottom: 6 }}>I.R.I.S</div>
              <div style={{ color: 'var(--text-2)', fontSize: 12, lineHeight: 1.65 }}>Intelligent Real-time<br />Identification & Security System</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[['Home','/'],['About','/about'],['How It Works','/how-it-works'],['Team','/team']].map(([l,to]) => (
                <button key={to} onClick={() => nav(to)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', fontSize: 13, padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}>{l}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[['Report','/report'],['Slides','/animation'],['Contact','/contact']].map(([l,to]) => (
                <button key={to} onClick={() => nav(to)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', fontSize: 13, padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}>{l}</button>
              ))}
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-2)', fontSize: 12 }}>
              <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Pratham Joshi & Hariom Bhimani</div>
              Guided by Priti Dave Ma'am<br />Nilesh Ladani Sir · Sanjay Sir
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'rgba(139,139,168,0.3)' }}>
              Built with Python, OpenCV, MediaPipe, and a lot of late nights.
            </div>
            {/* <!-- Built at 2am. Fuelled by chai and curiosity. — Pratham & Hariom --> */}
          </div>
        </div>
      </footer>

    </div>
  )
}
