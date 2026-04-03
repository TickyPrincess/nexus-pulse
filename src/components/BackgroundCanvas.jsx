import { useEffect, useRef } from 'react'

const N   = 130
const FOV = 380
const MAX_D2 = 135 * 135 // squared link distance threshold

export default function BackgroundCanvas({ signalTrigger }) {
  const canvasRef  = useRef(null)
  const pulsesRef  = useRef([])

  // One-time canvas setup + animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W = 0, H = 0, raf

    // Particles in 3D world space
    const pts = Array.from({ length: N }, () => ({
      x:  (Math.random() - .5) * 900,
      y:  (Math.random() - .5) * 700,
      z:  (Math.random() - .5) * 500,
      vx: (Math.random() - .5) * .13,
      vy: (Math.random() - .5) * .10,
      vz: (Math.random() - .5) * .07,
    }))

    let rotY = 0

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    // Perspective project world → screen
    function proj(x, y, z) {
      const s = FOV / (FOV + z)
      return { sx: W * .5 + x * s, sy: H * .5 + y * s, s }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)

      rotY += .00022
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      // Rotate + project all points
      const tp = pts.map(p => {
        const rx = p.x * cosY - p.z * sinY
        const rz = p.x * sinY + p.z * cosY
        const { sx, sy, s } = proj(rx, p.y, rz)
        return { sx, sy, s, rz }
      })

      // Sort back → front for correct alpha layering
      tp.sort((a, b) => a.rz - b.rz)

      // Links between nearby projected points
      for (let i = 0; i < tp.length; i++) {
        for (let j = i + 1; j < tp.length; j++) {
          const dx = tp[i].sx - tp[j].sx
          const dy = tp[i].sy - tp[j].sy
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_D2) {
            const d     = Math.sqrt(d2)
            const depth = Math.min(tp[i].s, tp[j].s)
            const alpha = (1 - d / 135) * .055 * depth * 1.9
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
            ctx.lineWidth   = .55
            ctx.moveTo(tp[i].sx, tp[i].sy)
            ctx.lineTo(tp[j].sx, tp[j].sy)
            ctx.stroke()
          }
        }
      }

      // Dots
      for (const { sx, sy, s } of tp) {
        const r = .7  + s * 1.5
        const a = .10 + s * .30
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
        ctx.fill()
      }

      // Pulse rings
      const pulses = pulsesRef.current
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        ctx.beginPath()
        ctx.arc(W * .5, H * .5, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,255,200,${p.a.toFixed(3)})`
        ctx.lineWidth   = 1
        ctx.stroke()
        p.r += 3.2
        p.a -= .007
        if (p.a <= 0) pulses.splice(i, 1)
      }

      // Drift particles + bounce off walls
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.z += p.vz
        if (Math.abs(p.x) > 520) p.vx *= -1
        if (Math.abs(p.y) > 440) p.vy *= -1
        if (Math.abs(p.z) > 330) p.vz *= -1
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Emit pulse rings when a new signal arrives
  useEffect(() => {
    if (!signalTrigger) return
    pulsesRef.current.push({ r: 12, a: .55 })
    pulsesRef.current.push({ r: 4,  a: .30 })
  }, [signalTrigger])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
