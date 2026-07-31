import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useScrollReveal, ParticleCanvas, GlassCard, SectionLabel, SectionHeading, CTAButton } from '../components/shared'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

function ScanLine() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="scan-line" />
    </div>
  )
}

const QUICK_FACTS = [
  { icon: '👤', title: 'Face Recognition', desc: 'LBPH algorithm identifies registered individuals in real time with name overlay.', color: 'var(--accent)' },
  { icon: '🔪', title: 'Weapon Detection', desc: 'Multi-frame ghost buffer eliminates false positives from bright surfaces and clothing.', color: 'var(--danger)' },
  { icon: '🦴', title: 'Violence Detection', desc: 'MediaPipe 33-point skeleton tracks punches, kicks, and falls across frames.', color: 'var(--accent-3)' },
  { icon: '📸', title: 'Auto Snapshots', desc: 'Every confirmed alert is timestamped and saved automatically for evidence.', color: 'var(--accent-2)' },
  { icon: '⚡', title: 'Real-time Speed', desc: 'Entire pipeline completes in under 50ms per frame — faster than human reaction.', color: 'var(--warn)' },
  { icon: '🖥️', title: 'Zero Cloud', desc: 'Runs entirely on a standard laptop webcam. No APIs, no subscriptions, no latency.', color: 'var(--success)' },
]

const TIMELINE = [
  { date: 'Week 1–2', label: 'Research & Setup', desc: 'Studied OpenCV, MediaPipe architecture, and LBPH theory. Built development environment and installed all dependencies.' },
  { date: 'Week 3–4', label: 'Face Recognition', desc: 'Implemented Haar Cascade face detection with 2-frame confirmation. Trained LBPH recognizer on registered face dataset.' },
  { date: 'Week 5–6', label: 'Weapon Detection', desc: 'Developed contour shape analysis, metallic colour mask, and ghost buffer system for false-positive elimination.' },
  { date: 'Week 7–8', label: 'Violence Detection', desc: 'Integrated MediaPipe Pose for 33-point skeleton tracking. Built velocity and angle analysis for punch/kick/choke detection.' },
  { date: 'Week 9–10', label: 'Integration & Testing', desc: 'Merged all three systems into a single real-time pipeline. Tuned thresholds, tested edge cases, optimised frame rate.' },
  { date: 'Week 11–12', label: 'Report & Presentation', desc: 'Documented methodology, compiled results, prepared presentation slides and project website.' },
]

const RADAR_DATA = [
  { subject: 'Face Accuracy', A: 94 },
  { subject: 'Weapon Precision', A: 91 },
  { subject: 'Violence Detection', A: 87 },
  { subject: 'Real-time Speed', A: 96 },
  { subject: 'Low-light Perf.', A: 60 },
  { subject: 'False Positive Filter', A: 98 },
]

function CapabilityRadar() {
  return (
    <div className="reveal" style={{ marginTop: 56 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <SectionLabel>System Capabilities</SectionLabel>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Performance at a Glance</h3>
        <p style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 8 }}>Scores out of 100 from our 120+ test scenarios</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '32px 24px' }}>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-2)', fontSize: 11, fontFamily: 'JetBrains Mono,monospace' }} />
            <Radar name="I.R.I.S" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.18} strokeWidth={1.5} dot={{ fill: 'var(--accent)', r: 3 }} />
            <Tooltip
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text)' }}
              formatter={(v: number) => [`${v}%`, 'Score']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function Home() {
  const nav = useNavigate()
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ParticleCanvas />
        <ScanLine />
        <div className="noise-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle,rgba(84,104,212,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '100px 24px 80px', maxWidth: 960, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', fontSize: 11, color: 'var(--text-2)', fontFamily: 'JetBrains Mono,monospace', marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            AI-Powered · Real-time · No Cloud APIs · Built with Python
          </div>

          <h1 className="reveal" style={{ animationDelay: '80ms', fontSize: 'clamp(52px,9vw,96px)', fontWeight: 900, color: 'var(--text)', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 28 }}>
            The Camera<br />
            <span style={{ background: 'linear-gradient(135deg,var(--accent) 0%,var(--accent-2) 45%,var(--accent-3) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              That Thinks.
            </span>
          </h1>

          <p className="reveal" style={{ animationDelay: '160ms', fontSize: 19, color: 'var(--text-2)', maxWidth: 620, margin: '0 auto 44px', lineHeight: 1.72 }}>
            I.R.I.S is an AI-powered security system that identifies faces, detects weapons, and spots violent behaviour — all in real time from a single webcam.
          </p>

          <div className="reveal" style={{ animationDelay: '240ms', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 48 }}>
            <CTAButton onClick={() => nav('/how-it-works')}>See How It Works →</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/animation')}>View Slides ↗</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/about')}>Learn More</CTAButton>
          </div>

          <p className="reveal" style={{ animationDelay: '320ms', fontSize: 12, color: 'rgba(139,139,168,0.45)', fontFamily: 'JetBrains Mono,monospace' }}>
            Created by Pratham Joshi & Hariom Bhimani · Guided by Priti Dave Ma'am, Nilesh Ladani Sir & Sanjay Sir
          </p>

          {/* Scroll indicator */}
          <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, animation: 'bounce 2s infinite' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(139,139,168,0.45)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(139,139,168,0.2)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 20 }}>
          {[
            { v: '33', l: 'Body Keypoints', c: 'var(--accent)' },
            { v: '<50ms', l: 'Frame Latency', c: 'var(--accent-2)' },
            { v: '3×', l: 'Frame Confirmation', c: 'var(--accent-3)' },
            { v: '0', l: 'Cloud Dependencies', c: 'var(--success)' },
            { v: '100%', l: 'Local Processing', c: 'var(--accent)' },
          ].map(({ v, l, c }) => (
            <div key={l} className="reveal" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: c, letterSpacing: '-0.04em', marginBottom: 4 }}>{v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'JetBrains Mono,monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is I.R.I.S ────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <SectionLabel><span className="reveal">About the Project</span></SectionLabel>
              <SectionHeading>
                <span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>
                  Intelligent Real-time Identification & Security
                </span>
              </SectionHeading>
              <div className="reveal" style={{ animationDelay: '160ms', marginTop: 24, fontSize: 16, color: 'var(--text-2)', lineHeight: 1.78 }}>
                <p style={{ marginBottom: 18 }}>
                  I.R.I.S is a school project built entirely from scratch using Python, OpenCV, and MediaPipe. There are no pre-trained weapon-detection models and no cloud subscriptions — just pure computer vision logic running on a standard laptop.
                </p>
                <p>
                  The system watches a live webcam feed and does three things simultaneously: it recognises registered faces, scans for dangerous objects, and monitors for violent body movements. All three pipelines run together, every frame, in real time.
                </p>
              </div>
              <div className="reveal" style={{ animationDelay: '240ms', marginTop: 28, display: 'flex', gap: 12 }}>
                <CTAButton onClick={() => nav('/about')}>Full Details →</CTAButton>
                <CTAButton variant="outline" onClick={() => nav('/team')}>Meet the Team</CTAButton>
              </div>
            </div>

            {/* Tech stack visual */}
            <div className="reveal" style={{ animationDelay: '160ms', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { name: 'Python 3', desc: 'Core runtime', color: 'var(--accent)', icon: '🐍' },
                { name: 'OpenCV', desc: 'Computer vision', color: 'var(--accent-2)', icon: '👁' },
                { name: 'MediaPipe', desc: 'Pose estimation', color: 'var(--accent-3)', icon: '🦴' },
                { name: 'LBPH', desc: 'Face recognition', color: 'var(--success)', icon: '🪪' },
                { name: 'NumPy', desc: 'Matrix processing', color: 'var(--warn)', icon: '📐' },
                { name: 'Haar Cascade', desc: 'Face detection', color: 'var(--danger)', icon: '🔍' },
              ].map((t) => (
                <GlassCard key={t.name} accentColor={t.color} style={{ padding: '18px 18px' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'JetBrains Mono,monospace' }}>{t.desc}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Six quick-fact cards ───────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 120px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Core Capabilities</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Everything I.R.I.S Can Do</span></SectionHeading>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
            {QUICK_FACTS.map((f, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
                <GlassCard accentColor={f.color} style={{ padding: '28px 26px', height: '100%' }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.68 }}>{f.desc}</div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Interactive radar chart */}
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <CapabilityRadar />
          </div>
        </div>
      </section>

      {/* ── Project timeline ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 120px', background: 'linear-gradient(180deg,var(--bg),#0d0d18)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <SectionLabel><span className="reveal">Development Journey</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>12 Weeks of Building</span></SectionHeading>
            <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
              From first line of code to a fully working AI security system — here's how the project came together.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            {TIMELINE.map((t, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms`, display: 'flex', gap: 24, paddingBottom: 28 }}>
                <div style={{ flexShrink: 0, width: 120, paddingTop: 20, textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', letterSpacing: '0.08em' }}>{t.date}</div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', marginTop: 22, boxShadow: '0 0 10px rgba(84,104,212,0.5)', flexShrink: 0 }} />
                  {i < TIMELINE.length - 1 && <div style={{ width: 1, flexGrow: 1, background: 'rgba(84,104,212,0.2)', minHeight: 20 }} />}
                </div>
                <GlassCard style={{ flexGrow: 1, padding: '18px 22px', marginBottom: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{t.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{t.desc}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="reveal" style={{ position: 'relative', borderRadius: 24, border: '1px solid rgba(84,104,212,0.2)', background: 'linear-gradient(135deg,rgba(84,104,212,0.08),rgba(139,99,192,0.06))', padding: '64px 48px', textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(84,104,212,0.07),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 16 }}>
                Ready to explore I.R.I.S in depth?
              </h3>
              <p style={{ color: 'var(--text-2)', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
                Dive into the technology, meet the team, read the report, or view the presentation slides.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
                <CTAButton onClick={() => nav('/about')}>About the Project →</CTAButton>
                <CTAButton variant="outline" onClick={() => nav('/animation')}>View Slides</CTAButton>
                <CTAButton variant="outline" onClick={() => nav('/report')}>Download Report</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
