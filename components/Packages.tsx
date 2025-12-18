'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import CountdownTimer from './CountdownTimer'
import Link from 'next/link'
import AnimatedBackground from './AnimatedBackground'
import { FaCheck } from 'react-icons/fa'

export default function Packages() {
  const { language } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  const content = {
    ar: {
      title: 'الباقات والأسعار',
      valueTable: {
        title: 'القيمة الحقيقية لكل جزء داخل النظام:',
        items: [
          { item: '6 كورسات احترافية لتطوير العيادة', value: '9,000 جنيه' },
          { item: '12 أداة ونموذج جاهز للتطبيق الفوري', value: '6,000 جنيه' },
          { item: 'اجتماعات أسبوعية مباشرة مع د. عمر', value: '4,000 جنيه' },
          { item: 'عضوية مجتمع DBD المغلق للأطباء', value: '2,000 جنيه' },
          { item: 'تحديثات مستمرة مدى الحياة', value: '2,000 جنيه' },
          { item: 'دعم فني وتحديثات نصف سنوية', value: '1,000 جنيه' },
        ],
        total: '24,000 جنيه مصري / 4,000 ريال خليجي',
      },
      pricing: {
        egypt: { base: '8,000 جنيه', launch: '6,500 جنيه فقط', savings: 'وفر أكثر من 17,000 جنيه' },
        gulf: { base: '1,200 ريال / درهم / 120 ريال عماني', launch: '997 ريال فقط', savings: 'وفر أكثر من 3,000 ريال' },
      },
      includes: ['6 كورسات متكاملة', '12 أداة تطبيقية', 'دخول مدى الحياة', 'اجتماعات أسبوعية', 'مجتمع الأطباء المغلق', 'دعم نصف سنوي'],
      limited: {
        title: 'التسجيل محدود',
        text: 'التسجيل يُفتح كل أسبوعين لعدد محدود من الأطباء',
        note: 'حرصًا على التفاعل والمتابعة داخل المجتمع',
        warning: 'المقاعد الحالية شارفت على الامتلاء',
        next: 'والدفعة الجديدة تبدأ السبت القادم',
        cta: 'سجّل الآن قبل إغلاق التسجيل',
      },
      enroll: 'احجز مكانك الآن',
      basePrice: 'السعر الأساسي:',
      launchPrice: 'سعر الإطلاق المحدود:',
      timeRemaining: 'الوقت المتبقي:',
      forEgypt: 'للأطباء في مصر:',
      forGulf: 'للأطباء في الخليج:',
      includesTitle: 'يشمل:',
    },
    en: {
      title: 'Packages and Pricing',
      valueTable: {
        title: 'Real Value of Each Part in the System:',
        items: [
          { item: '6 Professional Courses for Clinic Development', value: '9,000 EGP' },
          { item: '12 Ready-to-Apply Tools and Templates', value: '6,000 EGP' },
          { item: 'Weekly Live Meetings with Dr. Omar', value: '4,000 EGP' },
          { item: 'DBD Closed Community Membership for Doctors', value: '2,000 EGP' },
          { item: 'Continuous Lifetime Updates', value: '2,000 EGP' },
          { item: 'Technical Support and Semi-Annual Updates', value: '1,000 EGP' },
        ],
        total: '24,000 EGP / 4,000 SAR',
      },
      pricing: {
        egypt: { base: '8,000 EGP', launch: '6,500 EGP only', savings: 'Save more than 17,000 EGP' },
        gulf: { base: '1,200 SAR / AED / 120 OMR', launch: '997 SAR only', savings: 'Save more than 3,000 SAR' },
      },
      includes: ['6 Integrated Courses', '12 Application Tools', 'Lifetime Access', 'Weekly Meetings', 'Closed Doctors Community', 'Semi-Annual Support'],
      limited: {
        title: 'Limited Registration',
        text: 'Registration opens every two weeks for a limited number of doctors',
        note: 'To ensure interaction and follow-up within the community',
        warning: 'Current seats are almost full',
        next: 'And the new batch starts next Saturday',
        cta: 'Register now before registration closes',
      },
      enroll: 'Reserve Your Spot Now',
      basePrice: 'Base Price:',
      launchPrice: 'Limited Launch Price:',
      timeRemaining: 'Time Remaining:',
      forEgypt: 'For Doctors in Egypt:',
      forGulf: 'For Doctors in the Gulf:',
      includesTitle: 'Includes:',
    },
  }

  const text = content[language]

  return (
    <section id="packages" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="packages" />
      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          {text.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-12 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6">{text.valueTable.title}</h3>
          <div className="space-y-4 mb-6">
            {text.valueTable.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white">{item.item}</span>
                <span className="text-primary font-bold">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/20">
            <span className="text-xl font-bold text-white">{text.valueTable.total}</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-primary/20 backdrop-blur-md rounded-lg p-8 border border-primary/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{text.forEgypt}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-white/80 mb-1">{text.basePrice}</p>
                <p className="text-2xl font-bold text-white line-through">{text.pricing.egypt.base}</p>
              </div>
              <div>
                <p className="text-white/80 mb-1">{text.launchPrice}</p>
                <p className="text-4xl font-bold text-primary">{text.pricing.egypt.launch}</p>
              </div>
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <FaCheck className="text-green-400" /> {text.pricing.egypt.savings}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-white/80 mb-4 text-center">{text.timeRemaining}</p>
              <CountdownTimer targetDate={targetDate} />
            </div>
            <Link
              href="#contact"
              className="block w-full text-center px-6 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              {text.enroll}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-primary/20 backdrop-blur-md rounded-lg p-8 border border-primary/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{text.forGulf}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-white/80 mb-1">{text.basePrice}</p>
                <p className="text-2xl font-bold text-white line-through">{text.pricing.gulf.base}</p>
              </div>
              <div>
                <p className="text-white/80 mb-1">{text.launchPrice}</p>
                <p className="text-4xl font-bold text-primary">{text.pricing.gulf.launch}</p>
              </div>
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <FaCheck className="text-green-400" /> {text.pricing.gulf.savings}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-white/80 mb-4 text-center">{text.timeRemaining}</p>
              <CountdownTimer targetDate={targetDate} />
            </div>
            <Link
              href="#contact"
              className="block w-full text-center px-6 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              {text.enroll}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-12 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{text.includesTitle}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {text.includes.map((item, index) => (
              <div key={index} className="text-white text-center flex items-center justify-center gap-2">
                <FaCheck className="text-primary" /> {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="bg-red-500/20 backdrop-blur-md rounded-lg p-8 border border-red-500/30 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">{text.limited.title}</h3>
          <p className="text-xl text-white mb-2">{text.limited.text}</p>
          <p className="text-white/80 mb-4">{text.limited.note}</p>
          <p className="text-xl text-red-300 font-semibold mb-2">{text.limited.warning}</p>
          <p className="text-white mb-6">{text.limited.next}</p>
          <Link
            href="#contact"
            className="inline-block px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            {text.limited.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
