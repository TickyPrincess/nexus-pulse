import { useState, useEffect, useCallback, useRef } from 'react'
import Header from './components/Header'
import SignalStream from './components/SignalStream'
import ProfilePanel from './components/ProfilePanel'
import NotificationToast from './components/NotificationToast'
import BackgroundCanvas from './components/BackgroundCanvas'
import LoadingScreen from './components/LoadingScreen'
import { generateSignal } from './lib/mockData'

const MAX_SIGNALS = 7
const MIN_DELAY   = 4500   // ↓ was 9s
const MAX_DELAY   = 12000  // ↓ was 24s

export default function App() {
  const [loaded,        setLoaded]        = useState(false)
  const [signals,       setSignals]       = useState([])
  const [notifications, setNotifications] = useState([])
  const [profileOpen,   setProfileOpen]   = useState(false)
  const [status,        setStatus]        = useState('SCANNING')
  const [pulseTick,     setPulseTick]     = useState(0)  // triggers canvas ring
  const timerRef = useRef(null)

  const emit = useCallback(() => {
    const signal = generateSignal()
    setSignals(prev       => [signal, ...prev].slice(0, MAX_SIGNALS))
    setNotifications(prev => [{ id: `n-${Date.now()}`, signal }, ...prev].slice(0, 3))
    setStatus('SIGNAL DETECTED')
    setPulseTick(t => t + 1)
    setTimeout(() => setStatus('SCANNING'), 2800)
    timerRef.current = setTimeout(emit, MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
  }, [])

  // Start emitting only after loading screen is done
  useEffect(() => {
    if (!loaded) return
    timerRef.current = setTimeout(emit, 1200)
    return () => clearTimeout(timerRef.current)
  }, [loaded, emit])

  const dismissNotif = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <>
      {/* 3D particle field — always rendered behind everything */}
      <BackgroundCanvas signalTrigger={pulseTick} />

      {/* Loading screen — shown until loaded */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Main UI — fades in after loading */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        opacity:   loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(10px)',
        transition: loaded ? 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s' : 'none',
      }}>
        <Header
          onProfileToggle={() => setProfileOpen(p => !p)}
          profileOpen={profileOpen}
          status={status}
        />

        <main style={{
          display:        'flex',
          justifyContent: 'center',
          padding:        '40px 20px 120px',
        }}>
          <SignalStream signals={signals} />
        </main>

        <ProfilePanel
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />

        {/* Toast container */}
        <div style={{
          position:      'fixed',
          top:           '68px',
          right:         '18px',
          zIndex:        300,
          display:       'flex',
          flexDirection: 'column',
          gap:           '8px',
          pointerEvents: 'none',
        }}>
          {notifications.map(n => (
            <div key={n.id} style={{ pointerEvents: 'auto' }}>
              <NotificationToast notification={n} onDismiss={dismissNotif} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
