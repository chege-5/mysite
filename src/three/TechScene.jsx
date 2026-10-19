import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { techCategories } from '../data/technologies'

function reduceMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Field() {
  const pointsRef = useRef()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const { positions, colors } = useMemo(() => {
    const perCategory = 36
    const total = techCategories.length * perCategory
    const pos = new Float32Array(total * 3)
    const col = new Float32Array(total * 3)
    let idx = 0
    techCategories.forEach((cat, ci) => {
      const color = new THREE.Color(cat.color)
      const radius = 2 + ci * 1.4
      for (let i = 0; i < perCategory; i++) {
        const phi = Math.acos(-1 + (2 * i) / perCategory)
        const theta = Math.sqrt(perCategory * Math.PI) * phi
        pos[idx * 3] = radius * Math.cos(theta) * Math.sin(phi)
        pos[idx * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
        pos[idx * 3 + 2] = radius * Math.cos(phi)
        col[idx * 3] = color.r
        col[idx * 3 + 1] = color.g
        col[idx * 3 + 2] = color.b
        idx++
      }
    })
    return { positions: pos, colors: col }
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.06
      pointsRef.current.rotation.x = Math.sin(t * 0.04) * 0.15
      if (!reduceMotion()) {
        pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 0.25, 0.03)
        pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 0.25, 0.03)
      }
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function TechScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <Field />
      </Canvas>
    </div>
  )
}
