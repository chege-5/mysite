import { useEffect, useState } from 'react'

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!prefersReduced && !isTouch)

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })

    const onDown = () => setHovering(true)
    const onUp = () => setHovering(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[100]"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full bg-white transition-[width,height,opacity] duration-200 ease-out"
          style={{
            left: pos.x,
            top: pos.y,
            width: hovering ? 56 : 10,
            height: hovering ? 56 : 10,
            transform: 'translate(-50%, -50%)',
            opacity: 0.85,
          }}
        />
      </div>
    </>
  )
}
