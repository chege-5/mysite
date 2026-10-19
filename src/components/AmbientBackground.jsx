import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'

export function AmbientBackground() {
  const reduced = useReducedMotionPreference()
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)
  useEffect(() => {
    const update = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return (
    <>
      <div className="ambient-background" data-paused={paused || hidden || reduced} aria-hidden="true">
        <div className="ambient-grid"/>
        <div className="ambient-orbit orbit-one"/>
        <div className="ambient-orbit orbit-two"/>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <g className="ambient-paths"><path d="M-200 800C200 150 550 1100 900 450S1400-100 1800 300"/><path d="M-200 900C200 250 550 1200 900 550S1400 0 1800 400"/></g>
          <g className="ambient-nodes">{[[140,200],[430,720],[810,340],[1200,680],[1450,180]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3"/>)}</g>
        </svg>
      </div>
      <button className="background-motion-toggle" type="button" disabled={Boolean(reduced)}
        onClick={() => setPaused(value => !value)} aria-pressed={paused}
        aria-label={reduced ? 'Background motion disabled' : paused ? 'Play background motion' : 'Pause background motion'}>
        {paused || reduced ? <Play size={12}/> : <Pause size={12}/>}<span>Background</span>
      </button>
    </>
  )
}
