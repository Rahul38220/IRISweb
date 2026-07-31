import { useNavigate } from 'react-router'
import { useScrollReveal, GlassCard, SectionLabel, SectionHeading, CTAButton } from '../components/shared'

const CHAPTERS = [
  { num: '01', title: 'Abstract', pages: '1–2', desc: 'Overview of I.R.I.S, its objectives, methodology, and key findings. Suitable for readers who want a high-level summary without reading the full report.' },
  { num: '02', title: 'Introduction', pages: '3–6', desc: 'Background on the problem of passive surveillance, motivation for real-time AI detection, and a statement of the project scope and goals.' },
  { num: '03', title: 'Literature Review', pages: '7–14', desc: 'Survey of existing face recognition techniques (PCA, EigenFaces, FisherFaces, LBPH), weapon detection approaches, and pose estimation methods. Analysis of why LBPH and MediaPipe were chosen.' },
  { num: '04', title: 'System Design', pages: '15–24', desc: 'Architecture of the three-pipeline system. Data flow diagrams, module interaction diagrams, and the rationale behind the ghost buffer and multi-frame confirmation approach.' },
  { num: '05', title: 'Implementation', pages: '25–42', desc: 'Detailed technical implementation: code structure, key algorithms, threshold selection methodology, and how the three systems were integrated without frame-rate degradation.' },
  { num: '06', title: 'Results & Testing', pages: '43–54', desc: 'Quantitative evaluation: face recognition accuracy across lighting conditions, weapon detection precision and recall, violence detection true/false positive rates, and frame latency measurements.' },
  { num: '07', title: 'Discussion', pages: '55–60', desc: 'Analysis of limitations, edge cases, and failure modes. Comparison with commercial solutions. Ethical considerations of AI surveillance.' },
  { num: '08', title: 'Conclusion', pages: '61–63', desc: 'Summary of achievements, what was learned, and directions for future work including GPU acceleration, cloud integration, and multi-camera support.' },
  { num: '09', title: 'References', pages: '64–68', desc: 'Full bibliography of academic papers, documentation, and resources consulted throughout the project.' },
]

const RESULTS = [
  { metric: 'Face Recognition Accuracy', value: '~94%', detail: 'Under controlled lighting, registered individuals', color: 'var(--accent)' },
  { metric: 'Unknown Face Rejection Rate', value: '~89%', detail: 'Correctly flagging unregistered individuals as unknown', color: 'var(--accent-2)' },
  { metric: 'Weapon False Positive Rate', value: '<2%', detail: 'With ghost buffer at 3-frame threshold enabled', color: 'var(--success)' },
  { metric: 'Violence Detection Precision', value: '~87%', detail: 'Across punch, kick, choke, and fall classifications', color: 'var(--accent-3)' },
  { metric: 'Frame Latency (all systems)', value: '<50ms', detail: 'On Intel Core i5 laptop, no GPU, 720p input', color: '#F59E0B' },
  { metric: 'Test Scenarios Run', value: '120+', detail: 'Across 4 lighting conditions and 3 distance ranges', color: 'var(--danger)' },
]

export default function Report() {
  const nav = useNavigate()
  useScrollReveal()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 64 }}>

      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 72px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <SectionLabel><span className="reveal">Project Report</span></SectionLabel>
        <SectionHeading>
          <span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>
            The Complete I.R.I.S Report
          </span>
        </SectionHeading>
        <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', fontSize: 17, maxWidth: 600, margin: '20px auto 0', lineHeight: 1.72 }}>
          A 68-page research document covering the theory, design, implementation, and evaluation of the I.R.I.S AI security camera system.
        </p>
      </section>

      {/* ── Download card ──────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>
          {/* Document preview */}
          <div className="reveal">
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)', aspectRatio: '3/4', display: 'flex', flexDirection: 'column', position: 'relative', maxHeight: 420 }}>
              {/* Header band */}
              <div style={{ padding: '14px 18px', background: 'rgba(99,102,241,0.12)', borderBottom: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
                <span style={{ marginLeft: 8, fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)' }}>iris_report_v1.pdf</span>
              </div>
              {/* Page content mockup */}
              <div style={{ flexGrow: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', marginBottom: 6 }}>SCHOOL PROJECT REPORT</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 3 }}>I.R.I.S</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>Intelligent Real-time Identification<br />& Security System</div>
                </div>
                {[90,65,80,55,70,45,80,60,50].map((w,i) => (
                  <div key={i} style={{ height: i===0?5:3.5, borderRadius: 999, background: i===0?'rgba(99,102,241,0.3)':'rgba(255,255,255,0.07)', width: `${w}%` }} />
                ))}
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', lineHeight: 1.6 }}>Pratham Joshi · Hariom Bhimani</div>
                  <div style={{ fontSize: 9, color: 'rgba(139,139,168,0.5)', fontFamily: 'JetBrains Mono,monospace' }}>Guided by: Priti Dave Ma'am · Nilesh Ladani Sir · Sanjay Sir</div>
                </div>
              </div>
              <div style={{ padding: '10px 18px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)' }}>
                <span>68 pages</span><span>PDF · ~4.2MB</span>
              </div>
            </div>
          </div>

          {/* Download info */}
          <div className="reveal" style={{ animationDelay: '160ms' }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>Download</div>
            <h3 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
              Read the Full Research Document
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 24 }}>
              The complete report covers everything: the literature review, system architecture, full implementation details, test results, and a discussion of the ethical implications of AI-powered surveillance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {[
                ['📄 68 pages of documentation'],
                ['📊 Results from 120+ test scenarios'],
                ['🔬 Full algorithm explanations with diagrams'],
                ['📚 Academic references and bibliography'],
              ].map(([item], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* <!-- PDF EMBED OR LINK GOES HERE --> */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '15px 0', borderRadius: 12, color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', boxShadow: '0 0 28px rgba(99,102,241,0.38)', transition: 'transform 0.2s,box-shadow 0.2s' }}
               onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 44px rgba(99,102,241,0.6)' }}
               onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(99,102,241,0.38)' }}>
              📄 Download PDF Report
            </a>
            <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(139,139,168,0.4)', fontFamily: 'JetBrains Mono,monospace', textAlign: 'center' }}>
              This report documents the complete research and development process behind I.R.I.S.
            </p>
          </div>
        </div>
      </section>

      {/* ── Table of contents ──────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(180deg,transparent,#0d0d18)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Contents</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>What's Inside</span></SectionHeading>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHAPTERS.map((c, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 50}ms` }}>
                <GlassCard style={{ padding: '20px 26px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--accent)', letterSpacing: '0.1em', minWidth: 28 }}>§{c.num}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', whiteSpace: 'nowrap', opacity: 0.6 }}>pp. {c.pages}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key results ────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel><span className="reveal">Key Findings</span></SectionLabel>
            <SectionHeading><span className="reveal" style={{ display: 'block', animationDelay: '80ms' }}>Results at a Glance</span></SectionHeading>
            <p className="reveal" style={{ animationDelay: '160ms', color: 'var(--text-2)', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
              Selected quantitative results from Chapter 06 of the report. Full methodology and raw data in the PDF.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
            {RESULTS.map((r, i) => (
              <div key={i} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
                <GlassCard accentColor={r.color} style={{ padding: '26px 24px' }}>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{r.metric}</div>
                  <div style={{ fontSize: 34, fontWeight: 900, color: r.color, letterSpacing: '-0.04em', marginBottom: 8 }}>{r.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(139,139,168,0.6)', lineHeight: 1.55 }}>{r.detail}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h3 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 14 }}>Want to go deeper?</h3>
          <p style={{ color: 'var(--text-2)', marginBottom: 30 }}>Explore the full system architecture or view the slides.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <CTAButton onClick={() => nav('/how-it-works')}>How It Works →</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/animation')}>View Slides</CTAButton>
            <CTAButton variant="outline" onClick={() => nav('/team')}>Meet the Team</CTAButton>
          </div>
        </div>
      </section>

    </div>
  )
}
