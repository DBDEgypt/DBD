'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

export function useExitIntent(onExitIntent: () => void) {
  const [hasShown, setHasShown] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const onExitIntentRef = useRef(onExitIntent)
  const lastScrollY = useRef(0)
  const scrollUpCount = useRef(0)

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

    const enableTimer = setTimeout(() => {
      setIsEnabled(true)
    }, 10000)

    return () => clearTimeout(enableTimer)
  }, [])

  useEffect(() => {
    if (hasShown || !isEnabled) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggerExitIntent()
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        triggerExitIntent()
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY.current && currentScrollY < 100) {
        scrollUpCount.current++
        if (scrollUpCount.current >= 3) {
          triggerExitIntent()
        }
      } else {
        scrollUpCount.current = 0
      }
      
      lastScrollY.current = currentScrollY
    }

    const handleBackButton = (e: PopStateEvent) => {
      e.preventDefault()
      triggerExitIntent()
      window.history.pushState(null, '', window.location.href)
    }

    window.history.pushState(null, '', window.location.href)

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('popstate', handleBackButton)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [hasShown, isEnabled, triggerExitIntent])

  return { hasShown }
}
