import { useEffect, useState } from 'react'
import { TYPE_CONFIG } from '../lib/mockData'

export default function NotificationToast({ notification, onDismiss }) {
  const [leaving, setLeaving] = useState(false)
  const { signal } = notification
  const cfg = TYPE_CONFIG[signal.type]

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 4600)
    const t2 = setTimeout(() => onDismiss(notification.id), 5100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [notification.id, onDismiss])

  function dismiss() {
    setLeaving(true)
    setTimeout(() => onDismiss(notification.id), 450)
  }

  return (
    <div
      onClick={dismiss}
      style={{
        background: 'rgba(8,8,8,0.94)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${cfg.borderHover}`,
        borderRadius: '8px',
        padding: '14px 16px',
        width: '275px',
        boxShadow: `0 4px 32px ${cfg.glow}, 0 1px 0 rgba(255,255,255,0.03) inset`,
        animation: leaving
          ? 'notifOut 0.42s cubic-bezier(0.4,0,1,1) forwards'
          : 'notifIn 0.42s cubic-bezier(0.16,1,0.3,1) forwards',
        cursor: 'pointer',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '8px',
            letterSpacing: '0.16em',
            color: cfg.accent,
            marginBottom: '5px',
            opacity: 0.85,
          }}>
            {signal.type}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {signal.token}
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.06em',
          }}>
            {signal.chain} · {signal.confidence}% confidence
          </div>
        </div>

        <div style={{ position: 'relative', width: '7px', height: '7px', marginTop: '2px', flexShrink: 0 }}>
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: cfg.accent,
            position: 'absolute',
            animation: 'pulse 1.2s ease infinite',
          }} />
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: cfg.accent,
            position: 'absolute',
            animation: 'ring 1.2s ease-out infinite',
          }} />
        </div>
      </div>
    </div>
  )
}
