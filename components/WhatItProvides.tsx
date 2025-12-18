'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaGraduationCap, FaTools, FaCalendarAlt, FaUsers, FaInfinity, FaHeadset } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function WhatItProvides() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const content = {
    ar: {
      title: 'ماذا يقدم النظام؟',
      coursesTitle: '6 كورسات احترافية:',
      courses: [
        { title: 'استراتيجيات التسويق الطبي الحديث للعيادات', description: 'تعلم أحدث استراتيجيات التسويق الطبي المخصصة للعيادات، من التسويق الرقمي إلى التسويق التقليدي الفعال.' },
        { title: 'فن التواصل والإقناع مع المرضى', description: 'اكتشف أسرار التواصل الفعال مع المرضى وكيفية إقناعهم بالخطط العلاجية المناسبة.' },
        { title: 'بناء الفريق وقيادته بفعالية', description: 'تعلم كيفية بناء فريق عمل محترف وإدارته بفعالية لتحقيق أفضل النتائج.' },
        { title: 'التخطيط المالي وتحقيق الأرباح', description: 'فهم أساسيات التخطيط المالي للعيادات وكيفية زيادة الأرباح بشكل مستدام.' },
        { title: 'تشغيل العيادة وتنظيم SOPs والإدارة اليومية', description: 'تعلم كيفية تنظيم عمليات العيادة اليومية وإنشاء إجراءات عمل قياسية فعالة.' },
        { title: 'سيكولوجية البيع وقبول الخطة العلاجية', description: 'فهم علم النفس وراء قبول المرضى للخطط العلاجية وكيفية تحسين معدلات القبول.' },
      ],
      coursesNote: 'كل كورس مدته من 60 إلى 90 دقيقة، مقسم إلى دروس قصيرة وسهلة التطبيق.',
      toolsTitle: '12 أداة ونموذج جاهز للتطبيق الفوري:',
      tools: [
        'حاسبة التسعير الذكي', 'نموذج الخطة التسويقية للعيادة', 'رحلة المريض (Patient Journey Map)',
        'دليل تشغيل الفريق (SOP Manual)', 'لوحة متابعة الأداء (KPI Dashboard)', 'خطة تقييم الأداء الشهري',
        'نموذج ROI لحساب عائد التسويق', 'خطة التحفيز الشهري للفريق', 'سكريبتات إقناع المرضى',
        'دليل التوظيف الذكي', 'استمارة المتابعة بعد الزيارة', 'خطة تطوير الأرباح السنوية',
      ],
      toolsNote: 'جميع الأدوات جاهزة للتحميل والاستخدام مباشرة بعد التسجيل.',
      featuresTitle: 'المميزات الإضافية:',
      features: [
        { icon: FaUsers, text: 'اجتماعات أسبوعية مباشرة مع د. عمر الشربيني' },
        { icon: FaUsers, text: 'دخول مجتمع DBD المغلق للأطباء' },
        { icon: FaInfinity, text: 'تحديثات مجانية مدى الحياة' },
        { icon: FaHeadset, text: 'دعم نصف سنوي قابل للتجديد' },
      ],
    },
    en: {
      title: 'What the System Provides',
      coursesTitle: '6 Professional Courses:',
      courses: [
        { title: 'Modern Medical Marketing Strategies for Clinics', description: 'Learn the latest medical marketing strategies tailored for clinics, from digital marketing to effective traditional marketing.' },
        { title: 'The Art of Communication and Persuasion with Patients', description: 'Discover the secrets of effective communication with patients and how to convince them of appropriate treatment plans.' },
        { title: 'Building and Leading Teams Effectively', description: 'Learn how to build a professional team and manage it effectively to achieve the best results.' },
        { title: 'Financial Planning and Profit Achievement', description: 'Understand the basics of financial planning for clinics and how to increase profits sustainably.' },
        { title: 'Clinic Operations and SOPs Organization and Daily Management', description: 'Learn how to organize daily clinic operations and create effective standard operating procedures.' },
        { title: 'Sales Psychology and Treatment Plan Acceptance', description: 'Understand the psychology behind patients accepting treatment plans and how to improve acceptance rates.' },
      ],
      coursesNote: 'Each course is 60 to 90 minutes long, divided into short, easy-to-apply lessons.',
      toolsTitle: '12 Ready-to-Apply Tools and Templates:',
      tools: [
        'Smart Pricing Calculator', 'Clinic Marketing Plan Template', 'Patient Journey Map',
        'Team Operations Manual (SOP Manual)', 'Performance Tracking Dashboard (KPI Dashboard)', 'Monthly Performance Evaluation Plan',
        'ROI Template for Marketing Return Calculation', 'Monthly Team Motivation Plan', 'Patient Persuasion Scripts',
        'Smart Recruitment Guide', 'Post-Visit Follow-up Form', 'Annual Profit Development Plan',
      ],
      toolsNote: 'All tools are ready for download and immediate use after registration.',
      featuresTitle: 'Additional Features:',
      features: [
        { icon: FaUsers, text: 'Weekly live meetings with Dr. Omar El Sherbiny' },
        { icon: FaUsers, text: 'Access to the closed DBD community for doctors' },
        { icon: FaInfinity, text: 'Free lifetime updates' },
        { icon: FaHeadset, text: 'Semi-annual renewable support' },
      ],
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="what-it-provides" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="what-it-provides" />
      <div ref={inViewRef} className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          {text.title}
        </motion.h2>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <FaGraduationCap className="text-4xl text-primary" />
            <h3 className="text-3xl md:text-4xl font-bold text-white">{text.coursesTitle}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {text.courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.02, rotateY: 2, z: 50 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-primary/40 transition-all shadow-lg perspective-1000"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight">{course.title}</h4>
                    <p className="text-white/80 leading-relaxed">{course.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="text-center text-white/70 text-lg italic mt-6"
          >
            {text.coursesNote}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <FaTools className="text-4xl text-primary" />
            <h3 className="text-3xl md:text-4xl font-bold text-white">{text.toolsTitle}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {text.tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.05, rotate: 2, z: 50 }}
                className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md rounded-xl p-5 border border-primary/30 hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <FaTools className="text-primary/80 flex-shrink-0 mt-1" />
                  <p className="text-white font-medium leading-relaxed">{tool}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="text-center text-white/70 text-lg italic"
          >
            {text.toolsNote}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <FaCalendarAlt className="text-4xl text-primary" />
            <h3 className="text-3xl md:text-4xl font-bold text-white">{text.featuresTitle}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {text.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, x: language === 'ar' ? -5 : 5 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-primary/40 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon className="text-primary text-2xl" />
                    </div>
                    <p className="text-white text-lg font-semibold">{feature.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <motion.button
            onClick={openModal}
            className="px-10 py-5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-xl font-bold rounded-xl transition-all shadow-2xl"
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
