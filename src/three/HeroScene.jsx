import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { MathUtils, SRGBColorSpace, TextureLoader } from 'three'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import { portraitUrl, portraitFocus } from '../data/portrait'

const orbitAngles = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4]

function PortraitMedallion() {
  const original = useLoader(TextureLoader, portraitUrl)
  const texture = useMemo(() => {
    const photo = original.clone()
    const { width, height } = original.image
    const side = Math.min(width, height) / portraitFocus.zoom
    const left = MathUtils.clamp(width * portraitFocus.x - side / 2, 0, width - side)
    const top = MathUtils.clamp(height * portraitFocus.y - side / 2, 0, height - side)
    photo.repeat.set(side / width, side / height)
    photo.offset.set(left / width, 1 - (top + side) / height)
    photo.colorSpace = SRGBColorSpace
    photo.needsUpdate = true
    return photo
  }, [original])
  useEffect(() => () => texture.dispose(), [texture])
  return <group>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.3, 1.3, .14, 96]}/><meshStandardMaterial color="#d8cbb7" metalness={.6} roughness={.3}/></mesh>
    {[0, Math.PI].map(rotation => <group key={rotation} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0, .075]}><circleGeometry args={[1.25, 96]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
      <mesh position={[0, 0, .08]}><torusGeometry args={[1.28, .035, 12, 96]}/><meshStandardMaterial color="#d8cbb7" metalness={.5} roughness={.3}/></mesh>
    </group>)}
  </group>
}

function SecurityCore({ animate }) {
  const assembly = useRef()
  const core = useRef()
  const rings = useRef()
  const particleAttribute = useRef()
  const particles = useMemo(() => {
    const sphere = new Float32Array(180 * 3)
    const orbit = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) {
      const angle = i * 2.399963
      const y = 1 - i / 179 * 2
      const radius = Math.sqrt(1 - y * y) * 2.65
      sphere[i * 3] = Math.cos(angle) * radius
      sphere[i * 3 + 1] = y * 2.65
      sphere[i * 3 + 2] = Math.sin(angle) * radius
      orbit[i * 3] = Math.cos(angle) * (2.5 + Math.sin(i * 1.7) * 0.12)
      orbit[i * 3 + 1] = Math.sin(angle) * 1.45
      orbit[i * 3 + 2] = Math.sin(i * 1.7) * 0.3
    }
    return { positions: sphere.slice(), sphere, orbit }
  }, [])

  useFrame(({ clock, pointer }, delta) => {
    if (!animate || !assembly.current || !core.current || !rings.current || !particleAttribute.current) return
    const time = clock.getElapsedTime()
    assembly.current.rotation.y = MathUtils.damp(assembly.current.rotation.y, pointer.x * 0.35, 3, delta)
    assembly.current.rotation.x = MathUtils.damp(assembly.current.rotation.x, -pointer.y * 0.2, 3, delta)
    assembly.current.position.y = Math.sin(time * 0.7) * 0.1
    core.current.rotation.y += Math.min(delta, 0.05) * 0.22
    core.current.rotation.z = Math.sin(time * 0.4) * 0.1
    rings.current.rotation.z += Math.min(delta, 0.05) * 0.09
    rings.current.rotation.y = Math.sin(time * 0.25) * 0.18
    const morph = MathUtils.smoothstep(Math.sin(time * 0.35) * 0.5 + 0.5, 0.15, 0.85)
    const positions = particleAttribute.current.array
    for (let i = 0; i < positions.length; i++) positions[i] = MathUtils.lerp(particles.sphere[i], particles.orbit[i], morph)
    particleAttribute.current.needsUpdate = true
  })

  return (
    <group ref={assembly} rotation={[0.12, -0.2, 0]}>
      <group ref={core}>
        <Suspense fallback={null}><PortraitMedallion/></Suspense>
      </group>
      <group ref={rings} rotation={[0.5, 0.3, -0.3]}>
        {[{radius:1.6, rotation:[Math.PI/2,0,0]}, {radius:1.85, rotation:[0.65,0.7,0.5]}, {radius:2.12, rotation:[1.1,-0.55,-0.6]}].map(({radius,rotation}, index) => (
          <group key={radius} rotation={rotation}>
            <mesh><torusGeometry args={[radius, index === 1 ? 0.024 : 0.014, 8, 160]}/><meshStandardMaterial color={['#ffffff', '#d8cbb7', '#d8cbb7'][index]} emissive={['#ffffff', '#d8cbb7', '#d8cbb7'][index]} emissiveIntensity={0.2} metalness={0.45} roughness={0.3}/></mesh>
            {orbitAngles.slice(0, index + 3).map((angle, node) => <mesh key={angle} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}><sphereGeometry args={[node === 0 ? 0.065 : 0.032, 12, 12]}/><meshBasicMaterial color={index === 1 ? '#d8cbb7' : '#ffffff'}/></mesh>)}
          </group>
        ))}
      </group>
      <points><bufferGeometry><bufferAttribute ref={particleAttribute} attach="attributes-position" args={[particles.positions, 3]}/></bufferGeometry><pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.6} sizeAttenuation/></points>
    </group>
  )
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export default function HeroScene() {
  const container = useRef(null)
  const reducedMotion = useReducedMotionPreference()
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [tabVisible, setTabVisible] = useState(!document.hidden)
  const [ready, setReady] = useState(false)
  const [webGLAvailable, setWebGLAvailable] = useState(null)
  const animate = Boolean(webGLAvailable) && !reducedMotion && !paused && visible && tabVisible

  useEffect(() => {
    let supported = false
    try {
      const probe = document.createElement('canvas')
      const context = probe.getContext('webgl2')
      supported = Boolean(context)
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch { /* The artwork remains visible if a driver cannot create a context. */ }
    setWebGLAvailable(supported)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(container.current)
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])

  const fallback = <img className="scene-fallback-image" src={portraitUrl} alt="Kihara Jimmy Chege"/>

  return (
    <div className="hero-scene-frame" ref={container} data-animating={animate}>
      <div className="scene-topline"><span><span className="status-dot"/> JIMMY CHEGE</span><span>SECURE BY DESIGN</span></div>
      <div className={`scene-canvas ${ready ? 'scene-ready' : ''}`} role="img" aria-label="Jimmy Chege’s full-color portrait rotating in 3D inside orbital rings">
        {fallback}
        <SceneBoundary fallback={null} onError={() => setReady(false)}>
          {webGLAvailable && <Canvas camera={{position:[0, 0, 5.8], fov:45}} dpr={[1, 1.5]} frameloop={animate ? 'always' : 'demand'} gl={{alpha:true, antialias:true, powerPreference:'low-power'}} onCreated={() => setReady(true)} fallback={fallback}>
            <ambientLight intensity={1.1}/>
            <directionalLight position={[3, 4, 5]} intensity={3} color="#ffffff"/>
            <pointLight position={[-3, -1, 2]} intensity={18} color="#ffffff"/>
            <pointLight position={[2, -2, -1]} intensity={12} color="#d8cbb7"/>
            <SecurityCore animate={animate}/>
          </Canvas>}
        </SceneBoundary>
      </div>
      <div className="scene-footer"><span>{webGLAvailable === false ? 'PORTRAIT VIEW' : reducedMotion ? 'STILL MODE' : 'MOVE YOUR POINTER TO EXPLORE'}</span><button className="scene-motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={Boolean(reducedMotion) || !webGLAvailable}>{webGLAvailable === false ? 'Artwork view' : reducedMotion ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion'}</button></div>
      <span className="scene-orbit-label label-interface">INTERFACE</span><span className="scene-orbit-label label-api">API</span><span className="scene-orbit-label label-data">DATA</span>
    </div>
  )
}
