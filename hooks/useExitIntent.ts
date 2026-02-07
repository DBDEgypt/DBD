'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

export function useExitIntent(onExitIntent: () => void) {
  const [hasShown, setHasShown] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const onExitIntentRef = useRef(onExitIntent)

  const triggerExitIntent = useCallback(() => {
    if (hasShown) return
    setHasShown(true)
    sessionStorage.setItem('exitIntentShown', 'true')
    onExitIntentRef.current()
  }, [hasShown])

  useEffect(() => {
    onExitIntentRef.current = onExitIntent
  }, [onExitIntent])

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('exitIntentShown')
    if (alreadyShown) {
      setHasShown(true)
    }

    // Increased delay to 30 seconds for less aggressive behavior
    const enableTimer = setTimeout(() => {
      setIsEnabled(true)
    }, 30000)

    return () => clearTimeout(enableTimer)
  }, [])

  useEffect(() => {
    if (hasShown || !isEnabled) return

    // Only trigger on mouse leaving the browser window (top edge)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggerExitIntent()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown, isEnabled, triggerExitIntent])

  return { hasShown }
}
