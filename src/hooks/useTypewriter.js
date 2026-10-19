import { useState, useEffect, useCallback } from 'react'

export function useTypewriter({ words, typingSpeed = 90, deletingSpeed = 45, pauseTime = 2200 } = {}) {
  const [state, setState] = useState({
    text: '',
    wordIndex: 0,
    isDeleting: false,
  })

  const { text, wordIndex, isDeleting } = state
  const currentWord = words[wordIndex % words.length] ?? ''

  const tick = useCallback(() => {
    setState((prev) => {
      const word = words[prev.wordIndex % words.length] ?? ''
      if (prev.isDeleting) {
        const next = word.slice(0, -1)
        if (next.length === 0) {
          return { text: '', wordIndex: prev.wordIndex + 1, isDeleting: false }
        }
        return { text: next }
      }
      const next = word.slice(0, prev.text.length + 1)
      if (next === word) {
        return { text: next, isDeleting: false }
      }
      return { ...prev, text: next }
    })
  }, [words])

  useEffect(() => {
    if (words.length === 0) return
    const word = words[wordIndex % words.length] ?? ''

    let delay
    if (state.isDeleting) {
      delay = state.text.length <= 0 ? 300 : deletingSpeed
    } else if (state.text.length >= word.length) {
      delay = pauseTime
    } else {
      delay = typingSpeed
    }

    // After pause at end of a word, trigger deletion in next tick
    let timer
    if (state.text.length >= word.length && !state.isDeleting && word.length > 0) {
      timer = setTimeout(() => {
        setState((prev) => ({ ...prev, isDeleting: true }))
      }, pauseTime)
    } else {
      timer = setTimeout(tick, delay)
    }
    return () => clearTimeout(timer)
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime, tick])

  // Reset when words prop changes
  useEffect(() => {
    setState({ text: '', wordIndex: 0, isDeleting: false })
  }, [words])

  return { text: currentWord, isDeleting: state.isDeleting, currentIndex: wordIndex }
}
