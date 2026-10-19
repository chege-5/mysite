import { useEffect } from 'react'

export function VisualEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cleanup = () => {}

    const setup = () => {
      cleanup()
      if (preference.matches) return
      const observed = new Set()
      const selector = '.hero-copy, .hero-scene-frame, .hero-bottom, .section-heading, .project-card, .highlight-card, .training-card, .proficiency-card, .education-note, .expertise-item, .about-copy, .journey-panel, .contact-copy, .contact-form, .working-note'
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          if (!isIntersecting) target.style.setProperty('--reveal-offset', boundingClientRect.bottom <= 68 ? '-24px' : '24px')
          target.classList.toggle('is-visible', isIntersecting)
        })
      }, { threshold: 0, rootMargin: '-68px 0px -20px 0px' })
      const register = () => {
        observed.forEach(element => { if (!element.isConnected) { observer.unobserve(element); observed.delete(element) } })
        document.querySelectorAll(selector).forEach((element, index) => {
          if (observed.has(element)) return
          observed.add(element)
          element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`)
          const bounds = element.getBoundingClientRect()
          element.classList.toggle('is-visible', bounds.bottom > 68 && bounds.top < window.innerHeight - 20)
          element.style.setProperty('--reveal-offset', bounds.bottom <= 68 ? '-24px' : '24px')
          element.classList.add('reveal-on-scroll')
          observer.observe(element)
        })
      }
      register()
      const mutations = new MutationObserver(register)
      mutations.observe(document.querySelector('main'), { childList: true, subtree: true })

      let frame = 0
      let scrollFrame = 0
      let currentCard = null
      let currentButton = null
      const scene = document.querySelector('.hero-scene-frame')
      const resetButton = () => {
        if (!currentButton) return
        currentButton.style.removeProperty('--magnet-x')
        currentButton.style.removeProperty('--magnet-y')
        currentButton = null
      }
      const reset = () => {
        if (currentCard) {
          currentCard.style.setProperty('--tilt-x', '0deg')
          currentCard.style.setProperty('--tilt-y', '0deg')
          currentCard = null
        }
      }
      const onMove = event => {
        if (event.pointerType === 'touch') return
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          const button = event.target.closest('.button, .nav-contact')
          if (currentButton !== button) resetButton()
          if (button && !button.disabled && window.matchMedia('(pointer: fine)').matches) {
            currentButton = button
            const bounds = button.getBoundingClientRect()
            button.style.setProperty('--magnet-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`)
            button.style.setProperty('--magnet-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.15}px`)
          }
          const card = event.target.closest('.project-card')
          if (currentCard !== card) reset()
          if (!card) return
          currentCard = card
          const rect = card.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width
          const y = (event.clientY - rect.top) / rect.height
          card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`)
          card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`)
          card.style.setProperty('--glow-x', `${x * 100}%`)
          card.style.setProperty('--glow-y', `${y * 100}%`)
        })
      }
      const onScroll = () => {
        if (scrollFrame) return
        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = 0
          const heroScene = scene?.isConnected ? scene : document.querySelector('.hero-scene-frame')
          heroScene?.style.setProperty('--parallax-y', `${Math.min(window.scrollY * 0.055, 28)}px`)
        })
      }
      const resetAll = () => { reset(); resetButton() }
      document.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', resetAll)
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanup = () => {
        observer.disconnect()
        mutations.disconnect()
        cancelAnimationFrame(frame)
        cancelAnimationFrame(scrollFrame)
        resetAll()
        document.querySelector('.hero-scene-frame')?.style.removeProperty('--parallax-y')
        document.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', resetAll)
        window.removeEventListener('scroll', onScroll)
        observed.forEach(element => element.classList.remove('reveal-on-scroll', 'is-visible'))
      }
    }
    setup()
    preference.addEventListener('change', setup)
    return () => { cleanup(); preference.removeEventListener('change', setup) }
  }, [])
  return null
}
