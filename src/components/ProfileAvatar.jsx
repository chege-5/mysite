import { useEffect, useState } from 'react'
import { portraitUrl, portraitFocus } from '../data/portrait'

export function ProfileAvatar({ className = '' }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [portraitUrl])
  return <span className={`profile-avatar ${className}`} style={{ '--portrait-x': `${portraitFocus.x * 100}%`, '--portrait-y': `${portraitFocus.y * 100}%`, '--portrait-zoom': portraitFocus.zoom, '--portrait-about-zoom': portraitFocus.aboutZoom }}>
    {portraitUrl && !failed ? <img src={portraitUrl} alt="Kihara Jimmy Chege" onError={() => setFailed(true)} decoding="async" loading={className.includes('header') ? 'eager' : 'lazy'} fetchPriority={className.includes('header') ? 'high' : 'auto'} width="1232" height="1280"/> : <span className="avatar-initials" aria-hidden="true">jc<span>.</span></span>}
  </span>
}

export function ProfileIcon() {
  useEffect(() => {
    if (!portraitUrl) return
    const favicon = document.querySelector('link[rel="icon"]')
    if (!favicon) return
    const previous = { href: favicon.href, type: favicon.type }
    const photo = new Image()
    let active = true
    photo.onload = () => {
      if (!active) return
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 64
      const context = canvas.getContext('2d')
      if (!context) return
      const side = Math.min(photo.naturalWidth, photo.naturalHeight) / portraitFocus.zoom
      const left = Math.max(0, Math.min(photo.naturalWidth - side, photo.naturalWidth * portraitFocus.x - side / 2))
      const top = Math.max(0, Math.min(photo.naturalHeight - side, photo.naturalHeight * portraitFocus.y - side / 2))
      context.drawImage(photo, left, top, side, side, 0, 0, 64, 64)
      favicon.href = canvas.toDataURL('image/png')
      favicon.type = 'image/png'
    }
    photo.src = portraitUrl
    return () => { active = false; favicon.href = previous.href; favicon.type = previous.type }
  }, [portraitUrl])
  return null
}
