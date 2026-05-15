import { useRef, useEffect } from 'react'

export default function RandomWalkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    let W = 0, H = 0
    let mouseX = 0.5, mouseY = 0.5
    let targetMX = 0.5, targetMY = 0.5
    let animId

    const NUM = 180
    const particles = []
    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0,
        vy: 0,
        trail: [],
        hue: 220 + Math.random() * 40,
      })
    }

    function resize() {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    function frame() {
      mouseX += (targetMX - mouseX) * 0.03
      mouseY += (targetMY - mouseY) * 0.03

      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.003
        p.vy += (Math.random() - 0.5) * 0.003

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d > 0.01) {
          p.vx += dx / d * 0.0003
          p.vy += dy / d * 0.0003
        }

        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -0.5 }
        if (p.x > 1) { p.x = 1; p.vx *= -0.5 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.5 }
        if (p.y > 1) { p.y = 1; p.vy *= -0.5 }

        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 40) p.trail.shift()
      }

      for (const p of particles) {
        const trail = p.trail
        if (trail.length < 2) continue
        for (let i = 1; i < trail.length; i++) {
          const alpha = (i / trail.length) * 0.15
          ctx.strokeStyle = `rgba(139, 146, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x * W, trail[i - 1].y * H)
          ctx.lineTo(trail[i].x * W, trail[i].y * H)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        const cx = p.x * W
        const cy = p.y * H
        const distCenter = Math.abs(p.x - 0.5) + Math.abs(p.y - 0.5)
        const alpha = Math.max(0.15, 0.7 - distCenter * 0.8)
        ctx.fillStyle = `rgba(165, 172, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(cx, cy, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      const binW = W / 60
      const bins = new Array(60).fill(0)
      for (const p of particles) {
        const bin = Math.min(59, Math.floor(p.x * 60))
        bins[bin]++
      }
      const maxBin = Math.max(...bins, 1)
      const histH = H * 0.08
      const histY = H - histH - 10
      for (let i = 0; i < bins.length; i++) {
        const h = (bins[i] / maxBin) * histH
        const alpha = 0.06 + (bins[i] / maxBin) * 0.12
        ctx.fillStyle = `rgba(139, 146, 255, ${alpha})`
        ctx.fillRect(i * binW, histY + histH - h, binW - 1, h)
      }

      animId = requestAnimationFrame(frame)
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      targetMX = (e.clientX - rect.left) / rect.width
      targetMY = (e.clientY - rect.top) / rect.height
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    resize()
    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
