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

      {/* Right: GitHub link + system status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>

        <a
          href="https://github.com/TickyPrincess/nexus-pulse"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '5px',
            padding: '5px 10px',
            transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
          </svg>
          SOURCE
        </a>

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
      </div>
    </header>
  )
}
