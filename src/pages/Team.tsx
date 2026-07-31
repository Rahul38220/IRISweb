import { useNavigate } from 'react-router'
import { useScrollReveal, GlassCard, SectionLabel, SectionHeading, CTAButton } from '../components/shared'

const STUDENTS = [
  {
    name: 'Pratham Joshi',
    role: 'Developer & Researcher',
    initials: 'PJ',
    grad: 'linear-gradient(135deg,var(--accent),var(--accent-3))',
    quote: '"Building something that can actually see the world — that\'s what made this project exciting. We weren\'t just writing code; we were teaching a machine to understand danger."',
    contributions: [
      'Designed and implemented the core face recognition system using LBPH and Haar Cascade',
      'Built the weapon detection pipeline including HSV masking and the ghost buffer false-positive filter',
      'Integrated all three detection systems into a single real-time video processing loop',
      'Led testing and threshold tuning across different lighting conditions',
    ],
    focus: 'Computer Vision & System Integration',
    color: 'var(--accent)',
  },
  {
    name: 'Hariom Bhimani',
    role: 'Developer & Researcher',
    initials: 'HB',
    grad: 'linear-gradient(135deg,var(--accent-2),var(--accent))',
    quote: '"Understanding how AI sees faces the same way our eyes do — it changed how I think about computers. The LBPH algorithm is deceptively simple and incredibly powerful once you understand the maths behind it."',
    contributions: [
      'Implemented the MediaPipe Pose integration for 33-point skeleton tracking',
      'Developed the violence detection logic including velocity vectors and joint angle analysis',
      'Built the 3-frame confirmation buffer system for both weapon and violence alerts',
      'Designed the on-screen HUD overlay, alert panels, and snapshot save system',
    ],
    focus: 'Pose Estimation & Alert Systems',
    color: 'var(--accent-2)',
  },
]

const MENTORS = [
  {
    name: 'Priti Dave',
    suffix: 'Ma\'am',
    role: 'Physics Teacher',
    badge: 'Academic Guide',
    initials: 'PD',
    color: 'var(--accent-3)',
    note: 'Thank you for guiding us through every step of the project — from the initial idea to the final demonstration. Your feedback on the architecture of the detection pipeline was invaluable, and your patience during the weeks when nothing seemed to work kept us going.',
  },
  {
    name: 'Nilesh Ladani',
    suffix: 'Sir',
    role: 'Physics Teacher',
    badge: 'Project mentor',
    initials: 'NL',
    color: 'var(--accent)',
    note: 'Thank you for your encouragement, your sharp technical questions, and your feedback on the project report. Your suggestion to add the CLAHE pre-processing step turned out to be one of the most impactful improvements to face recognition accuracy.',
  },
  {
    name: 'Sanjay',
    suffix: 'Sir',
    role: 'Physics Teacher',
    badge: 'Project mentor',
    initials: 'SS',
    color: 'var(--accent-2)',
    note: "Thank you for your support and your insights on the real-world applications of our work. Your perspective on how security systems are actually deployed in practice helped us think about the project beyond the classroom.",
  },
]

const JOURNEY = [
  { label: 'The Idea', icon: '💡', text: 'The project started with a simple question: why can\'t a security camera tell you what it\'s seeing? Most cameras just record. We wanted to build one that could understand.' },
  { label: 'The Research', icon: '📚', text: 'We spent two weeks reading everything we could find on OpenCV, MediaPipe, and LBPH. Neither of us had done computer vision before. We learned as we built.' },
  { label: 'The First Detection', icon: '🎯', text: 'The first time the system correctly identified a face and printed a name on screen, we stopped and stared at it for a full minute. That was the moment we knew this would actually work.' },
  { label: 'The Hard Part', icon: '😤', text: 'Weapon detection took three weeks to get right. Every time we tuned the threshold for knives, it started falsely flagging bright walls and white shirts. The ghost buffer was the breakthrough.' },
  { label: 'The Late Nights', icon: '🌙', text: 'The last two weeks of integration were intense. Balancing all three detection systems running simultaneously without dropping frames required a lot of profiling, caching, and careful frame skipping.' },
  { label: 'The Demo', icon: '🏁', text: 'When we finally ran a full demonstration — face recognition, weapon detection, and violence detection all active at the same time — it worked flawlessly. We submitted the report the next morning.' },
]

export default function Team() {
  const nav = useNavigate()
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 64 }}>

      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 72px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '20%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,132,252,0.05),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <SectionLabel><span className="reveal">The Team</span></SectionLabel>
          <SectionHeading>
            <span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>
              The People Behind I.R.I.S
            </span>
          </SectionHeading>
          <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', fontSize: 17, maxWidth: 560, margin: '20px auto 0', lineHeight: 1.72 }}>
            A school project by two developers who wanted to teach a camera to think. Guided by mentors who believed in them from day one.
          </p>
        </div>
      </section>

      {/* ── Student cards ──────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(480px,1fr))', gap: 24, marginBottom: 24 }}>
            {STUDENTS.map((s, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
                <GlassCard accentColor={s.color} style={{ padding: 36, height: '100%' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 28 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 22, flexShrink: 0, boxShadow: `0 0 24px ${s.color}30` }}>
                      {s.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>{s.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>{s.role}</div>
                      <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, fontSize: 10, fontFamily: 'JetBrains Mono,monospace', border: `1px solid ${s.color}30`, color: s.color, background: `${s.color}10` }}>
                        {s.focus}
                      </div>
                    </div>
                  </div>
                  {/* Quote */}
                  <blockquote style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.76, fontStyle: 'italic', borderLeft: `2px solid ${s.color}40`, paddingLeft: 16, marginBottom: 28 }}>
                    {s.quote}
                  </blockquote>
                  {/* Contributions */}
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: s.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Key Contributions</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {s.contributions.map((c, ci) => (
                        <li key={ci} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0, marginTop: 6 }} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project journey ────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(180deg,var(--bg),#0d0d18)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel><span className="reveal">Our Story</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>How the Project Came Together</span></SectionHeading>
            <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', marginTop: 14, maxWidth: 500, margin: '14px auto 0' }}>
              In their own words — the six moments that defined the I.R.I.S project.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {JOURNEY.map((j, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <GlassCard style={{ padding: '26px 24px', height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{j.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{j.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.68 }}>{j.text}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mentor cards ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel><span className="reveal">With Gratitude</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Our Mentors & Guides</span></SectionHeading>
            <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', marginTop: 14, maxWidth: 500, margin: '14px auto 0' }}>
              This project would not exist without their guidance, patience, and belief in us.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 18 }}>
            {MENTORS.map((m, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
                <GlassCard accentColor={m.color} style={{ padding: '32px 28px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg,${m.color}40,${m.color}18)`, border: `1px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{m.initials}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{m.name} <span style={{ color: 'var(--text-2)', fontSize: 13, fontWeight: 400 }}>{m.suffix}</span></div>
                      <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{m.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 18 }}>{m.note}</p>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, fontSize: 10, fontFamily: 'JetBrains Mono,monospace', border: `1px solid ${m.color}25`, color: m.color, background: `${m.color}0a` }}>{m.badge}</span>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Acknowledgements ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="reveal" style={{ padding: '48px 40px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)' }}>
            <SectionLabel>Acknowledgements</SectionLabel>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 18 }}>A Note of Thanks</h3>
            <div style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p>We would like to thank our school for providing the resources and environment to pursue a project of this scope. The computer lab and the access to academic papers made a significant difference to the quality of our research.</p>
              <p>We are grateful to the open-source community — the developers of OpenCV, Google's MediaPipe team, and the contributors to the Python ecosystem — whose work forms the foundation of everything I.R.I.S can do.</p>
              <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: 'rgba(139,139,168,0.5)', marginTop: 8 }}>
                — Pratham Joshi & Hariom Bhimani
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h3 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 14 }}>Explore the project</h3>
          <p style={{ color: 'var(--text-2)', marginBottom: 30 }}>See how we built it, read the report, or view the slides.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <CTAButton onClick={() => nav('/how-it-works')}>How It Works →</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/animation')}>View Slides</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/report')}>Read Report</CTAButton>
          </div>
        </div>
      </section>

    </div>
  )
}
