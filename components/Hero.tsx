'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function Hero() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const enableSound = () => {
    const video = videoRef.current
    if (!video) return
    
    video.muted = false
    video.volume = 1.0
    setIsMuted(false)
    
    if (video.paused) {
      video.play().catch(() => {})
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryAutoplayWithSound = async () => {
      try {
        video.muted = false
        video.volume = 1.0
        await video.play()
        setIsMuted(false)
      } catch {
        video.muted = true
        setIsMuted(true)
        try {
          await video.play()
        } catch {}
      }
    }

    const handleVolumeChange = () => {
      setIsMuted(video.muted || video.volume === 0)
    }

    video.addEventListener('volumechange', handleVolumeChange)
    
    if (video.readyState >= 2) {
      tryAutoplayWithSound()
    } else {
      video.addEventListener('loadeddata', tryAutoplayWithSound, { once: true })
    }

    return () => {
      video.removeEventListener('volumechange', handleVolumeChange)
      video.removeEventListener('loadeddata', tryAutoplayWithSound)
    }
  }, [])

  return (
    <section ref={ref} id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-8 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="hero" />
      
      <motion.div
        className="absolute inset-0 opacity-10 flex items-center justify-center"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt="DBD Logo Background"
            fill
            sizes="(max-width: 768px) 600px, 800px"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: 60 + i * 20,
              height: 60 + i * 20,
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
              willChange: 'transform, opacity',
            }}
            animate={{
              x: [0, (i % 3) * 50 - 50],
              y: [0, (i % 2) * 40 - 20],
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']), willChange: 'transform' }}
      >
        <motion.div
          style={{ willChange: 'transform' }}
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          style={{ willChange: 'transform' }}
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-primary/50 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="container mx-auto text-center relative z-10 w-full max-w-6xl px-4">
        <motion.div style={{ y, opacity, scale }} className="flex flex-col items-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {language === 'ar' ? 'نظام DBD تطوير العيادات' : 'DBD Clinic Growth System'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-3 leading-relaxed"
          >
            {language === 'ar'
              ? 'أول نظام متكامل لتطوير وإدارة العيادات في العالم العربي'
              : 'The first integrated system for developing and managing clinics in the Arab world'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
          >
            {language === 'ar'
              ? 'من إعداد وإشراف د. عمر الشربيني'
              : 'Prepared and supervised by Dr. Omar El Sherbiny'}
          </motion.p>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full mb-6 relative z-20"
        >
          <div className="bg-gradient-to-br from-black/70 to-black/50 rounded-2xl p-2 shadow-2xl border border-primary/20 mx-auto max-w-3xl">
            <div className="aspect-video overflow-hidden rounded-xl w-full relative">
              <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-contain"
                preload="auto"
                poster="/logo.png"
              >
                <source src="/69091494a8b46_COURSEAD.mp4" type="video/mp4" />
                {language === 'ar'
                  ? 'متصفحك لا يدعم تشغيل الفيديو'
                  : 'Your browser does not support video playback'}
              </video>
              
              {isMuted && (
                <button
                  onClick={enableSound}
                  className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all shadow-lg animate-pulse"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  {language === 'ar' ? 'تشغيل الصوت' : 'Enable Sound'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-20 text-center"
        >
          <motion.button
            onClick={openModal}
            className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all shadow-lg text-base md:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
              {language === 'ar' ? 'سجل الآن' : 'Enroll Now'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
