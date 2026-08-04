// <!-- Built at 2am. Fuelled by chai and curiosity. — Pratham & Hariom -->
import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar'

function FaceScanOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) }, [onDone])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, pointerEvents: 'none', overflow: 'hidden', background: 'rgba(0,22,0,0.28)' }}>
      <div className="face-scan-sweep" style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(52,211,153,0.75),transparent)', boxShadow: '0 0 22px rgba(52,211,153,0.5)' }} />
      <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(52,211,153,0.18)' }} />
      {[{top:28,left:28},{top:28,right:28},{bottom:28,left:28},{bottom:28,right:28}].map((pos,i) => (
        <div key={i} style={{ position:'absolute',...pos,width:44,height:44,borderTop:i<2?'4px solid var(--success)':undefined,borderBottom:i>=2?'4px solid var(--success)':undefined,borderLeft:i%2===0?'4px solid var(--success)':undefined,borderRight:i%2===1?'4px solid var(--success)':undefined }} />
      ))}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <div style={{ padding: '26px 40px', borderRadius: 18, background: 'rgba(0,0,0,0.88)', border: '1px solid rgba(52,211,153,0.4)', backdropFilter: 'blur(24px)', boxShadow: '0 0 60px rgba(52,211,153,0.2)' }}>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', color: 'var(--success)', fontSize: 12, marginBottom: 8, letterSpacing: '0.1em' }}>✅ I.R.I.S SCAN COMPLETE</div>
          <div style={{ color: 'var(--text)', fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em' }}>[Your Name Here]</div>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-2)', fontSize: 11, marginTop: 8 }}>Threat Level: Zero 😎</div>
        </div>
      </div>
    </div>
  )
}

function KonamiToast({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="konami-toast" style={{ position: 'fixed', bottom: 36, left: '50%', zIndex: 600 }}>
      <div style={{ padding: '16px 30px', borderRadius: 14, background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.4)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(52,211,153,0.2)', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', color: 'var(--success)', fontSize: 13 }}>
          🎮 Nice. You found the cheat code. Even I.R.I.S can't catch you.
        </span>
      </div>
    </div>
  )
}

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function Root() {
  const [faceScan, setFaceScan] = useState(false)
  const [konami, setKonami] = useState(false)
  const [flash, setFlash] = useState(false)
  const seq = useRef<string[]>([])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length)
      if (seq.current.join() === KONAMI.join()) {
        setFlash(true); setKonami(true)
        setTimeout(() => setFlash(false), 700)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const handleLogoClick = useCallback(() => setFaceScan(true), [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'Inter,system-ui,sans-serif' }}>
      {flash && <div style={{ position: 'fixed', inset: 0, zIndex: 450, background: 'rgba(52,211,153,0.16)', pointerEvents: 'none' }} />}
      {faceScan && <FaceScanOverlay onDone={() => setFaceScan(false)} />}
      {konami && <KonamiToast onDone={() => setKonami(false)} />}
      <Navbar onLogoClick={handleLogoClick} />
      <Outlet />
    </div>
  )
}
