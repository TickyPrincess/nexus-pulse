import { useEffect, useState } from 'react'

const STEPS      = [
  'CONNECTING TO CHAINS...',
  'CALIBRATING SIGNAL ENGINE...',
  'SCANNING MEMPOOL...',
  'NEXUS ONLINE.',
]
const STEP_AT    = [0, 550, 1150, 1850]
const LEAVE_AT   = 2900
const DONE_AT    = 3550

export default function LoadingScreen({ onDone }) {
  const [visible,  setVisible]  = useState(false)
  const [stepIdx,  setStepIdx]  = useState(0)
  const [typed,    setTyped]    = useState('')
  const [progress, setProgress] = useState(0)
  const [leaving,  setLeaving]  = useState(false)

  /* ── Master timeline ── */
  useEffect(() => {
    const ts = []
    ts.push(setTimeout(() => setVisible(true), 80))

    STEP_AT.forEach((at, i) => {
      ts.push(setTimeout(() => {
        setStepIdx(i)
        setTyped('')
        setProgress(i === STEPS.length - 1 ? 92 : Math.round((i / (STEPS.length - 1)) * 78))
      }, at))
    })

    ts.push(setTimeout(() => setProgress(100), 2200))
    ts.push(setTimeout(() => setLeaving(true), LEAVE_AT))
    ts.push(setTimeout(onDone, DONE_AT))

    return () => ts.forEach(clearTimeout)
  }, [onDone])

  /* ── Typewriter for current step ── */
  useEffect(() => {
    const text = STEPS[stepIdx]
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(iv)
    }, 26)
    return () => clearInterval(iv)
  }, [stepIdx])

  const isLast = stepIdx === STEPS.length - 1

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: '#020202',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '26px',
      opacity:   leaving ? 0 : visible ? 1 : 0,
      transform: leaving ? 'scale(1.025)' : 'scale(1)',
      transition: leaving
        ? 'opacity 0.65s ease, transform 0.65s ease'
        : visible ? 'opacity 0.5s ease' : 'none',
      pointerEvents: leaving ? 'none' : 'auto',
    }}>

      {/* Radar SVG icon */}
      <div style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke="#00FFC8" strokeWidth="1"   opacity="0.22"/>
          <circle cx="20" cy="20" r="11" stroke="#00FFC8" strokeWidth="1"   opacity="0.45"/>
          <circle cx="20" cy="20" r="3.5" fill="#00FFC8"/>
          {/* sweep line */}
          <line x1="20" y1="3" x2="20" y2="20"
            stroke="#00FFC8" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="20" cy="3.2" r="1.3" fill="#00FFC8" opacity="0.75"/>
        </svg>
      </div>

      {/* Wordmark */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '18px',
        letterSpacing: '0.28em',
        color: 'rgba(255,255,255,0.88)',
        fontWeight: 600,
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        userSelect: 'none',
      }}>
        NEXUS PULSE
      </div>

      {/* Typewriter status line */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.16em',
        color: isLast ? 'rgba(0,255,200,0.55)' : 'rgba(255,255,255,0.22)',
        height: '14px',
        minWidth: '240px',
        textAlign: 'center',
        transition: 'color 0.4s ease',
      }}>
        {typed}
        {typed.length < STEPS[stepIdx].length && (
          <span style={{ animation: 'blink 0.7s ease infinite', opacity: 0.5 }}>█</span>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ width: '160px' }}>
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, rgba(0,255,200,0.45), rgba(0,255,200,0.85))',
            borderRadius: '1px',
            transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 8px rgba(0,255,200,0.4)',
          }} />
        </div>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '8px',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.12)',
          marginTop: '8px',
          textAlign: 'right',
        }}>
          {progress}%
        </div>
      </div>
    </div>
  )
}
