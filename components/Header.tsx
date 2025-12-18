'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const { language, toggleLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = [
        'home', 'who-is-it-for', 'why-enroll', 'what-result-you-get',
        'results', 'what-it-provides', 'about', 'reviews',
        'guarantee', 'packages', 'faq', 'contact'
      ]
      
      const scrollPosition = window.scrollY + 150
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = {
    ar: [
      { href: '#home', label: 'الرئيسية' },
      { href: '#who-is-it-for', label: 'لمن النظام' },
      { href: '#why-enroll', label: 'لماذا التسجيل' },
      { href: '#what-result-you-get', label: 'النتيجة' },
      { href: '#results', label: 'نتائج الأطباء' },
      { href: '#what-it-provides', label: 'المحتوى' },
      { href: '#about', label: 'عن د. عمر' },
      { href: '#reviews', label: 'آراء الأطباء' },
      { href: '#guarantee', label: 'الضمان' },
      { href: '#packages', label: 'الباقات' },
      { href: '#faq', label: 'الأسئلة' },
      { href: '#contact', label: 'تواصل معنا' },
    ],
    en: [
      { href: '#home', label: 'Home' },
      { href: '#who-is-it-for', label: 'Who Is It For' },
      { href: '#why-enroll', label: 'Why Enroll' },
      { href: '#what-result-you-get', label: 'Results You Get' },
      { href: '#results', label: 'Doctors Results' },
      { href: '#what-it-provides', label: 'Content' },
      { href: '#about', label: 'About Dr. Omar' },
      { href: '#reviews', label: 'Reviews' },
      { href: '#guarantee', label: 'Guarantee' },
      { href: '#packages', label: 'Packages' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
  }

  const items = navItems[language]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm'
          : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm'
      }`}
      style={{
        background: isScrolled
          ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%)'
          : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="#home" className="flex items-center gap-3 z-50 flex-shrink-0">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image src="/logo.png" alt="DBD Logo" fill sizes="64px" className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-white leading-tight">DBD</h1>
              <p className="text-sm text-white/80 leading-tight">
                {language === 'ar' ? 'نظام تطوير العيادات' : 'Clinic Growth System'}
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
            {items.map((item, index) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`font-medium transition-colors relative group ${
                    isActive ? 'text-primary font-bold' : 'text-white/90 hover:text-primary'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.a>
              )
            })}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-white font-medium flex-shrink-0"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </motion.button>
          </nav>

          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-white font-medium"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </motion.button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 space-y-2"
          >
            {items.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-white/90 hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
