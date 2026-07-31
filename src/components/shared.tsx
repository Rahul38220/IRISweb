import { useEffect, useRef, useState } from 'react'

// ── Scroll reveal ─────────────────────────────────────────────────────────────
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}

// ── Section label ─────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
      {children}
    </div>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────
export function SectionHeading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.08, ...style }}>
      {children}
    </h2>
  )
}

// ── Notification card ─────────────────────────────────────────────────────────
export function GlassCard({ children, style, accentColor, hover = true }: {
  children: React.ReactNode
  style?: React.CSSProperties
  accentColor?: string
  hover?: boolean
}) {
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setGlowPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` })
  }

  const color = accentColor || 'var(--accent)'
  // Use color-mix so both hex AND CSS-variable accent colors produce valid gradients
  const gradient = 'linear-gradient(to bottom, var(--color), color-mix(in srgb, var(--color) 50%, transparent), color-mix(in srgb, var(--color) 18%, transparent))'

  return (
    <div
      className="noti-card"
      style={{ '--color': color, '--gradient': gradient, ...(hover ? { cursor: 'default' } : {}), ...style } as React.CSSProperties & Record<string, string>}
      onMouseMove={hover ? handleMove : undefined}
    >
      <div className="noti-glow"        style={{ left: glowPos.x, top: glowPos.y }} />
      <div className="noti-border-glow" style={{ left: glowPos.x, top: glowPos.y }} />
      <div className="noti-content">{children}</div>
    </div>
  )
}

// ── Pill badge ────────────────────────────────────────────────────────────────
export function Pill({ children, color }: { children: React.ReactNode; color?: string }) {
  const c = color || 'var(--accent)'
  return (
    <span style={{ display: 'inline-block', padding: '4px 13px', borderRadius: 999, fontSize: 11, fontFamily: 'JetBrains Mono,monospace', border: `1px solid ${c}30`, color: c, background: `${c}10` }}>
      {children}
    </span>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
export function StatCard({ value, label, color }: { value: string; label: string; color?: string }) {
  const c = color || 'var(--accent)'
  return (
    <GlassCard accentColor={c} style={{}} >
      <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
        <div style={{ fontSize: 34, fontWeight: 900, color: c, letterSpacing: '-0.04em', marginBottom: 6 }}>{value}</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'JetBrains Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
      </div>
    </GlassCard>
  )
}

// ── Particle canvas ───────────────────────────────────────────────────────────
interface Particle { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }

export function ParticleCanvas({ opacity = 1 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf: number
    let pts: Particle[] = []

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    const init = () => {
      pts = Array.from({ length: 75 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24,
        radius: Math.random() * 1.2 + 0.35, opacity: Math.random() * 0.35 + 0.1,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(238,238,248,${p.opacity})`; ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]; const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 95) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(84,104,212,${0.12 * (1 - d / 95)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    resize(); init(); draw()
    const onR = () => { resize(); init() }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }} />
}

// ── CTA button ────────────────────────────────────────────────────────────────
export function CTAButton({ children, onClick, variant = 'primary', style }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline'
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = { padding: '12px 26px', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'transform 0.2s,box-shadow 0.2s,background 0.2s', letterSpacing: '-0.01em', ...style }
  if (variant === 'primary') {
    return (
      <button onClick={onClick} style={{ ...base, color: 'white', border: 'none', background: 'linear-gradient(135deg,var(--accent),var(--accent-3))', boxShadow: '0 0 22px rgba(99,102,241,0.35)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(99,102,241,0.6)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 22px rgba(99,102,241,0.35)' }}>
        {children}
      </button>
    )
  }
  return (
    <button onClick={onClick} style={{ ...base, color: 'var(--text)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }}>
      {children}
    </button>
  )
}
