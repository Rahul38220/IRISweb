import { useNavigate } from 'react-router'
import { useScrollReveal, GlassCard, SectionLabel, SectionHeading, CTAButton } from '../components/shared'

const HIGHLIGHTS = [
  { time: '0:00–0:30', label: 'System Startup', desc: 'I.R.I.S initialises the three detection pipelines and opens the webcam feed. You can see the HUD load in real time.' },
  { time: '0:31–1:15', label: 'Face Recognition', desc: 'Pratham and Hariom walk in front of the camera. I.R.I.S identifies both within 2 seconds, displaying names and confidence scores.' },
  { time: '1:16–2:00', label: 'Unknown Person', desc: 'An unregistered person is introduced. I.R.I.S correctly flags them as UNKNOWN and highlights the face in red.' },
  { time: '2:01–2:50', label: 'Weapon Detection', desc: 'A knife is brought into frame. After 3 frames of confirmation, the weapon alert fires — a red panel with WEAPON DETECTED appears.' },
  { time: '2:51–3:40', label: 'Violence Detection', desc: 'A simulated punching motion is performed. I.R.I.S tracks the wrist velocity and raises a VIOLENCE ALERT after 3 consecutive frames.' },
  { time: '3:41–4:00', label: 'Alert Snapshot', desc: 'The system automatically saves a timestamped JPEG snapshot of the alert frame. The filename and path are shown on screen.' },
]

const FEATURES_SHOWN = [
  { icon: '👤', label: 'Live face recognition', sub: 'Name + confidence score overlay on every registered face' },
  { icon: '❓', label: 'Unknown person flagging', sub: 'Red highlight and UNKNOWN label for unregistered individuals' },
  { icon: '🔪', label: 'Weapon alert', sub: 'WEAPON DETECTED panel fires after 3-frame ghost buffer confirmation' },
  { icon: '🦴', label: 'Pose skeleton overlay', sub: 'MediaPipe 33-point skeleton drawn on the detected person' },
  { icon: '👊', label: 'Violence alert', sub: 'VIOLENCE DETECTED fires for confirmed punch/kick/choke motions' },
  { icon: '📸', label: 'Auto snapshot save', sub: 'Timestamped JPEG written to disk on every confirmed alert' },
  { icon: '🖥️', label: 'Real-time HUD', sub: 'Live timestamp, system status, and detection state displayed' },
  { icon: '⚡', label: 'No lag', sub: 'All three pipelines running simultaneously at full 30fps' },
]

const FAQ = [
  { q: 'Does this work on any webcam?', a: 'Yes. I.R.I.S uses OpenCV\'s standard VideoCapture interface, which is compatible with any USB or built-in webcam on Linux, macOS, and Windows. The demo was recorded using a standard 1080p USB webcam.' },
  { q: 'How are new faces registered?', a: 'Press K while I.R.I.S is running. The system captures 30 training images of the person in front of the camera, labels them with a name you type in, and retrains the LBPH recognizer automatically — usually within a few seconds.' },
  { q: 'What happens when multiple threats are detected simultaneously?', a: 'All three pipelines run in parallel. If a weapon and a violent action are detected in the same frame, both alerts are raised simultaneously. The on-screen panel shows both, and two separate snapshots are saved.' },
  { q: 'Can I.R.I.S work at night or in low light?', a: 'With infrared illumination, yes. The CLAHE pre-processing significantly improves recognition in dim conditions, but complete darkness requires an IR webcam. The system was tested down to approximately 50 lux ambient light.' },
  { q: 'How many faces can it track at once?', a: "As many as the camera can capture. I.R.I.S processes all detected face regions in every frame. In testing, up to 4 simultaneous faces were recognised accurately. Performance depends on CPU speed and face size in frame." },
  { q: "What is the ghost buffer and why does it matter?", a: "The ghost buffer is a rolling 5-frame list of weapon candidate detections. An alert only fires when the same candidate appears in 3 or more of those 5 frames. Without it, bright clothing, jewellery, or sudden reflections would trigger false weapon alerts constantly." },
]

export default function Demo() {
  const nav = useNavigate()
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 64 }}>

      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 72px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse,rgba(99,102,241,0.06),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <SectionLabel><span className="reveal">Live Demo</span></SectionLabel>
          <SectionHeading>
            <span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>
              See I.R.I.S in Action
            </span>
          </SectionHeading>
          <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', fontSize: 17, maxWidth: 580, margin: '20px auto 0', lineHeight: 1.72 }}>
            Watch I.R.I.S detect faces, flag a weapon, and raise a violence alert — all in real time from a single webcam, with no internet connection.
          </p>
        </div>
      </section>

      {/* ── Video embed ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="reveal">
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 22, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.6)', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
              {/* Scanline grid */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
              {/* Corner brackets */}
              {[{top:18,left:18},{top:18,right:18},{bottom:18,left:18},{bottom:18,right:18}].map((pos,i) => (
                <div key={i} style={{ position:'absolute',...pos,width:28,height:28,borderTop:i<2?'2px solid rgba(99,102,241,0.4)':undefined,borderBottom:i>=2?'2px solid rgba(99,102,241,0.4)':undefined,borderLeft:i%2===0?'2px solid rgba(99,102,241,0.4)':undefined,borderRight:i%2===1?'2px solid rgba(99,102,241,0.4)':undefined }} />
              ))}
              {/* Status bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'JetBrains Mono,monospace' }}>
                <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block', animation: 'pulse 1.2s infinite' }} /> LIVE DEMO
                </span>
                <span style={{ color: 'var(--text-2)' }}>I.R.I.S v1.0 · All Systems Active</span>
              </div>
              {/* Play button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 0 50px rgba(99,102,241,0.22)', cursor: 'pointer', transition: 'transform 0.25s,background 0.25s,box-shadow 0.25s' }}
                     onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(99,102,241,0.5)' }}
                     onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(99,102,241,0.22)' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 4 }}><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'rgba(139,139,168,0.5)' }}>
                  {/* PASTE YOUR VIDEO EMBED IFRAME HERE */}
                  ← PASTE YOUR VIDEO EMBED IFRAME HERE →
                </div>
              </div>
              {/* Bottom status */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'JetBrains Mono,monospace' }}>
                <span style={{ color: 'var(--success)' }}>✓ Face Recognition Active</span>
                <span style={{ color: 'var(--text-2)' }}>✓ Weapon Scan Active</span>
                <span style={{ color: 'var(--accent-3)' }}>✓ Violence Detection Active</span>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="reveal" style={{ animationDelay: '160ms', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 }}>
            {['⚡ Real-time Detection', '🔒 Multi-frame Confirmation', '📸 Auto Alert Snapshots', '🖥️ CPU Only — No GPU', '🔌 No Internet Required'].map(b => (
              <div key={b} className="badge-pulse-border" style={{ padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--text)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo breakdown ─────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(180deg,var(--bg),#0d0d18)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Demo Walkthrough</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>What You'll See — Minute by Minute</span></SectionHeading>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <GlassCard style={{ padding: '22px 28px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}>
                  <div style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{h.time}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{h.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{h.desc}</div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features shown in demo ─────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Demo Coverage</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Every Feature Demonstrated</span></SectionHeading>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
            {FEATURES_SHOWN.map((f, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <GlassCard style={{ padding: '22px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{f.sub}</div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(180deg,transparent,#0d0d18)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Questions</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Frequently Asked</span></SectionHeading>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map((f, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <GlassCard style={{ padding: '24px 28px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Q: {f.q}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.75 }}>{f.a}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h3 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 14 }}>Read the technical details</h3>
          <p style={{ color: 'var(--text-2)', marginBottom: 30 }}>Understand every step of the pipeline, or download the full report.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <CTAButton onClick={() => nav('/how-it-works')}>How It Works →</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/report')}>Download Report</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/team')}>Meet the Team</CTAButton>
          </div>
        </div>
      </section>

    </div>
  )
}
