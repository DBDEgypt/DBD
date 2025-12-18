'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import RegistrationForm from './RegistrationForm'

export default function Contact() {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const content = {
    ar: {
      title: 'تواصل معنا',
      subtitle: 'للاستفسارات والتسجيل، تواصل معنا عبر:',
      whatsapp: 'واتساب',
      facebook: 'فيسبوك',
      email: 'البريد الإلكتروني',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'For inquiries and registration, contact us via:',
      whatsapp: 'WhatsApp',
      facebook: 'Facebook',
      email: 'Email',
    },
  }

  const text = content[language]
  const contacts = [
    { href: 'https://wa.me/201022185383', icon: FaWhatsapp, bg: 'bg-green-500/20', border: 'border-green-500/30', hover: 'hover:bg-green-500/30', label: text.whatsapp },
    { href: 'https://www.facebook.com/DentalBusinessDev', icon: FaFacebook, bg: 'bg-blue-500/20', border: 'border-blue-500/30', hover: 'hover:bg-blue-500/30', label: text.facebook },
    { href: 'mailto:info@dbd.com', icon: FaEnvelope, bg: 'bg-primary/20', border: 'border-primary/30', hover: 'hover:bg-primary/30', label: text.email },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="contact" />
      <div ref={inViewRef} className="container mx-auto max-w-4xl relative z-10">
        <motion.h2
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
        >
          {text.title}
        </motion.h2>

        <motion.p
          style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-white/90 mb-8"
        >
          {text.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12 bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
        >
          <RegistrationForm showTitle={false} />
        </motion.div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {contacts.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={contact.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                whileHover={{ scale: 1.1, rotateY: 5, z: 50 }}
                className={`${contact.bg} ${contact.hover} ${contact.border} backdrop-blur-md rounded-lg p-6 border text-center transition-all perspective-1000`}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className="text-4xl mb-4 flex justify-center"
                >
                  <Icon className="text-white" />
                </motion.div>
                <p className="text-white font-semibold">{contact.label}</p>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
