import { useState, useEffect, useRef } from 'react'
import SignalCard from './SignalCard'

function QuietState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '90px 0 80px',
      gap: '24px',
      animation: 'fadeIn 0.6s ease forwards',
    }}>
      {/* Radar rings */}
      <div style={{ position: 'relative', width: '44px', height: '44px' }}>
        {[0, 0.7, 1.4].map((delay, i) => (
          <div key={i} style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.10)',
            animation: `scanPing 2.4s ease-out ${delay}s infinite`,
          }} />
        ))}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.28)',
          animation: 'breathe 2.4s ease infinite',
        }} />
      </div>

      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.20em',
        color: 'rgba(255,255,255,0.18)',
      }}>
        SCANNING CHAINS
      </div>

      <div style={{
        fontFamily: 'var(--font)',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.10)',
        textAlign: 'center',
        maxWidth: '260px',
        lineHeight: 1.75,
      }}>
        Monitoring 7 chains continuously.
        <br />
        Signals appear only when they matter.
      </div>
    </div>
  )
}

export default function SignalStream({ signals }) {
  const [newIds, setNewIds] = useState(new Set())
  const prevLengthRef = useRef(0)

  useEffect(() => {
    if (signals.length > prevLengthRef.current && signals.length > 0) {
      const latestId = signals[0].id
      setNewIds(prev => new Set([...prev, latestId]))
      const t = setTimeout(() => {
        setNewIds(prev => {
          const next = new Set(prev)
          next.delete(latestId)
          return next
        })
      }, 2400)
      prevLengthRef.current = signals.length
      return () => clearTimeout(t)
    }
    prevLengthRef.current = signals.length
  }, [signals])

  return (
    <div style={{ width: '100%', maxWidth: '560px' }}>
      {/* Stream header */}
      {signals.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          animation: 'fadeIn 0.4s ease forwards',
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.18)',
          }}>
            SIGNAL STREAM
          </span>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.12)',
          }}>
            {signals.length} ACTIVE
          </span>
        </div>
      )}

      {signals.length === 0 ? (
        <QuietState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              isNew={newIds.has(signal.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
