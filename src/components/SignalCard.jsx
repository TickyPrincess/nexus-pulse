import { useState, useEffect } from 'react'
import { TYPE_CONFIG } from '../lib/mockData'

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)}m ago`
}

function Metric({ label, value, accent }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '9px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '9px',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.26)',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '15px',
        fontWeight: 500,
        color: accent || 'rgba(255,255,255,0.72)',
        letterSpacing: '-0.01em',
      }}>
        {value}
      </span>
    </div>
  )
}

export default function SignalCard({ signal, isNew }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [age, setAge] = useState(timeAgo(signal.timestamp))
  const cfg = TYPE_CONFIG[signal.type]

  // Tick timestamp label
  useEffect(() => {
    const t = setInterval(() => setAge(timeAgo(signal.timestamp)), 10000)
    return () => clearInterval(t)
  }, [signal.timestamp])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(e => !e)}
      style={{
        position: 'relative',
        borderRadius: '9px',
        padding: '20px 22px',
        cursor: 'pointer',
        overflow: 'hidden',
        animation: isNew ? 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards' : undefined,
        background: hovered
          ? 'linear-gradient(145deg, rgba(255,255,255,0.042) 0%, rgba(255,255,255,0.018) 100%)'
          : 'rgba(255,255,255,0.022)',
        border: hovered
          ? `1px solid ${cfg.borderHover}`
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? `0 2px 40px ${cfg.glowHover}, inset 0 1px 0 rgba(255,255,255,0.04)`
          : `0 0 0 transparent, inset 0 1px 0 rgba(255,255,255,0.025)`,
        transition: 'background 0.25s ease, border 0.25s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Shimmer on arrival */}
      {isNew && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: '9px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '35%',
            height: '100%',
            background: `linear-gradient(90deg, transparent 0%, ${cfg.glow} 50%, transparent 100%)`,
            animation: 'shimmer 0.9s ease 0.15s forwards',
          }} />
        </div>
      )}

      {/* Top row: dot + chain + window | time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Pulse dot */}
          <div style={{ position: 'relative', width: '7px', height: '7px', flexShrink: 0 }}>
            <div style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: cfg.accent,
              position: 'absolute',
              animation: isNew ? 'pulse 1.8s ease infinite' : undefined,
              opacity: isNew ? 1 : 0.5,
            }} />
            {isNew && (
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: cfg.accent,
                position: 'absolute',
                animation: 'ring 1.4s ease-out infinite',
              }} />
            )}
          </div>

          {/* Chain badge */}
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.38)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '3px',
            padding: '2px 7px',
          }}>
            {signal.chain}
          </span>

          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
          }}>
            {signal.window}
          </span>
        </div>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.06em',
        }}>
          {age}
        </span>
      </div>

      {/* Token name */}
      <div style={{
        fontSize: '24px',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        color: 'rgba(255,255,255,0.92)',
        marginBottom: '5px',
        lineHeight: 1,
      }}>
        {signal.token}
      </div>

      {/* Signal type label */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.16em',
        color: cfg.accent,
        marginBottom: '15px',
        opacity: 0.9,
      }}>
        {signal.type}
      </div>

      {/* Reasoning */}
      <div style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.44)',
        lineHeight: 1.65,
        marginBottom: '18px',
      }}>
        {signal.reasoning}
      </div>

      {/* Confidence + CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            height: '1.5px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${signal.confidence}%`,
              height: '100%',
              background: cfg.accent,
              borderRadius: '2px',
              opacity: 0.65,
            }} />
          </div>
        </div>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          color: cfg.accent,
          opacity: 0.6,
          minWidth: '28px',
        }}>
          {signal.confidence}%
        </span>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
          letterSpacing: '0.1em',
          transition: 'color 0.2s ease',
          userSelect: 'none',
        }}>
          {expanded ? 'LESS ↑' : 'WHY →'}
        </span>
      </div>

      {/* Expanded: Why panel */}
      {expanded && (
        <div style={{
          marginTop: '20px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          animation: 'fadeIn 0.28s ease forwards',
        }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '8px',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.2)',
            marginBottom: '2px',
          }}>
            WHY THIS SIGNAL
          </div>

          <Metric
            label="INFLOW VELOCITY"
            value={signal.inflowVelocity}
            accent={cfg.accent}
          />
          <Metric
            label="WALLET GROWTH"
            value={signal.walletGrowth}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingTop: '9px',
          }}>
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.26)',
            }}>
              LIQUIDITY CHANGE
            </span>
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.72)',
            }}>
              {signal.liquidityChange}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
