const PROFILE = {
  value: '$47,382',
  change: '+2.4%',
  behaviorType: 'Late FOMO Trader',
  assessment:
    'You enter after momentum peaks. Average buy lands in the top 15% of a pump. Exit timing costs ~34% of theoretical gains annually. You trade emotion, not data.',
  stats: [
    { label: 'SIGNALS ACTED', value: '47' },
    { label: 'WIN RATE',      value: '31%' },
    { label: 'AVG HOLD',      value: '4.2h' },
    { label: 'AVG ENTRY LAG', value: '+8 min' },
  ],
}

function StatCell({ label, value }) {
  return (
    <div style={{
      background: 'rgba(3,3,3,0.85)',
      padding: '14px 16px',
    }}>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '8px',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.2)',
        marginBottom: '7px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '16px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.72)',
        letterSpacing: '-0.01em',
      }}>
        {value}
      </div>
    </div>
  )
}

export default function ProfilePanel({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 199,
            background: 'rgba(0,0,0,0.45)',
            animation: 'fadeIn 0.22s ease forwards',
          }}
        />
      )}

      {/* Slide-in panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '300px',
        zIndex: 200,
        background: 'rgba(6,6,6,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '28px 24px 40px',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '36px',
        }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.25)',
          }}>
            PROFILE
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.28)',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '2px 4px',
              outline: 'none',
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
          >
            ✕
          </button>
        </div>

        {/* Portfolio */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.22)',
            marginBottom: '10px',
          }}>
            PORTFOLIO VALUE
          </div>
          <div style={{
            fontSize: '34px',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            {PROFILE.value}
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: '#00FFC8',
            opacity: 0.65,
          }}>
            {PROFILE.change} today
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '28px' }} />

        {/* Behavior type */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.22)',
            marginBottom: '10px',
          }}>
            BEHAVIOR TYPE
          </div>
          <div style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#FFB800',
            letterSpacing: '-0.01em',
          }}>
            {PROFILE.behaviorType}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '7px',
          overflow: 'hidden',
          marginBottom: '28px',
        }}>
          {PROFILE.stats.map(s => <StatCell key={s.label} {...s} />)}
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '28px' }} />

        {/* AI assessment */}
        <div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.22)',
            marginBottom: '12px',
          }}>
            AI ASSESSMENT
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.40)',
            lineHeight: 1.75,
            fontStyle: 'italic',
          }}>
            "{PROFILE.assessment}"
          </div>
        </div>
      </div>
    </>
  )
}
