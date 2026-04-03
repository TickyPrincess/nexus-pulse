import { useState, useEffect, useCallback, useRef } from 'react'
import Header from './components/Header'
import SignalStream from './components/SignalStream'
import ProfilePanel from './components/ProfilePanel'
import NotificationToast from './components/NotificationToast'
import { generateSignal } from './lib/mockData'

const MAX_SIGNALS = 7
const MIN_DELAY   = 9000   // 9s
const MAX_DELAY   = 24000  // 24s

export default function App() {
  const [signals, setSignals]           = useState([])
  const [notifications, setNotifications] = useState([])
  const [profileOpen, setProfileOpen]   = useState(false)
  const [status, setStatus]             = useState('SCANNING')
  const timerRef = useRef(null)

  const emit = useCallback(() => {
    const signal = generateSignal()

    setSignals(prev => [signal, ...prev].slice(0, MAX_SIGNALS))
    setNotifications(prev =>
      [{ id: `n-${Date.now()}`, signal }, ...prev].slice(0, 3)
    )

    setStatus('SIGNAL DETECTED')
    setTimeout(() => setStatus('SCANNING'), 2800)

    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY)
    timerRef.current = setTimeout(emit, delay)
  }, [])

  useEffect(() => {
    // First signal after a short pause — lets the UI settle
    timerRef.current = setTimeout(emit, 2400)
    return () => clearTimeout(timerRef.current)
  }, [emit])

  const dismissNotif = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        onProfileToggle={() => setProfileOpen(p => !p)}
        profileOpen={profileOpen}
        status={status}
      />

      <main style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px 120px',
      }}>
        <SignalStream signals={signals} />
      </main>

      <ProfilePanel
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {/* Toast container — fixed top-right */}
      <div style={{
        position: 'fixed',
        top: '68px',
        right: '18px',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}>
        {notifications.map(n => (
          <div key={n.id} style={{ pointerEvents: 'auto' }}>
            <NotificationToast notification={n} onDismiss={dismissNotif} />
          </div>
        ))}
      </div>
    </div>
  )
}
