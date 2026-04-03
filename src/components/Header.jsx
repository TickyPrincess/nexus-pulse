export default function Header({ onProfileToggle, profileOpen, status }) {
  const isActive = status === 'SIGNAL DETECTED'

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '18px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      background: 'rgba(2,2,2,0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>

      {/* Left: toggle + wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <button
          onClick={onProfileToggle}
          title="Profile"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: profileOpen
              ? '1px solid rgba(255,255,255,0.28)'
              : '1px solid rgba(255,255,255,0.10)',
            background: profileOpen
              ? 'rgba(255,255,255,0.07)'
              : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.22s ease',
            color: profileOpen ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
            fontSize: '11px',
            fontFamily: 'var(--mono)',
            fontWeight: 500,
            outline: 'none',
          }}
        >
          ⊙
        </button>

        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.82)',
          fontWeight: 500,
          userSelect: 'none',
        }}>
          NEXUS PULSE
        </div>
      </div>

      {/* Right: system status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ position: 'relative', width: '7px', height: '7px' }}>
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: isActive ? '#00FFC8' : 'rgba(255,255,255,0.22)',
            transition: 'background 0.35s ease',
            animation: isActive ? 'pulse 0.6s ease infinite' : 'blink 3.5s ease infinite',
            position: 'absolute',
          }} />
          {isActive && (
            <div style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#00FFC8',
              position: 'absolute',
              animation: 'ring 0.9s ease-out forwards',
            }} />
          )}
        </div>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          letterSpacing: '0.16em',
          color: isActive ? 'rgba(0,255,200,0.65)' : 'rgba(255,255,255,0.18)',
          transition: 'color 0.35s ease',
        }}>
          {status}
        </span>
      </div>
    </header>
  )
}
