'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import AnimatedBackground from './AnimatedBackground'
import { FaPlay, FaClock, FaVideo } from 'react-icons/fa'

interface Course {
    id: number
    image: string
    link: string
    titleAr: string
    titleEn: string
    subtitleAr: string
    subtitleEn: string
}

const courses: Course[] = [
    {
        id: 1,
        image: '/1-How to systemize your Dental Clinic .webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/IhstwzFfiY',
        titleAr: 'كيف تبني نظام يجعل عيادتك تعمل بكفاءة',
        titleEn: 'How to Systemize Your Dental Clinic',
        subtitleAr: 'بدون اعتماد كامل على وجودك',
        subtitleEn: 'So It Doesn\'t Depend on You',
    },
    {
        id: 2,
        image: '/2- Dental Business Development Program Bundle.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/LfyXjhrjEF',
        titleAr: 'برنامج تطوير عيادات الأسنان المتكامل',
        titleEn: 'Dental Business Development Program',
        subtitleAr: '6 دورات أساسية لأطباء الأسنان المميزين',
        subtitleEn: '6 Essential courses for outstanding dentists',
    },
    {
        id: 3,
        image: '/3- Dental Business Foundation.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/YpjYygPGdg',
        titleAr: 'أساسيات بيزنس طب الأسنان',
        titleEn: 'Dental Business Foundations',
        subtitleAr: 'ابنِ عقلية صاحب عيادة يفهم الإدارة والقرار والربحية',
        subtitleEn: 'Build the mindset of a clinic owner, not just a clinician',
    },
    {
        id: 4,
        image: '/4- Dental Marketing & Brand Identity Mastery.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/jAhtTUhjqK',
        titleAr: 'التسويق وبناء الهوية للعيادات',
        titleEn: 'Dental Marketing & Brand Identity Mastery',
        subtitleAr: 'تعلم كيف تميّز عيادتك وتبني براند قوي يجذب المرضى',
        subtitleEn: 'Attract the right patients without competing on price',
    },
    {
        id: 5,
        image: '/5-Sales Psychology & Patient Conversion Systems.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/PhrPNHECrg',
        titleAr: 'سيكولوجية البيع وتحويل المرضى',
        titleEn: 'Sales Psychology & Patient Conversion Systems',
        subtitleAr: 'زوّد قبول الخطط العلاجية بدون ضغط أو بيع مباشر',
        subtitleEn: 'Turn consultations into accepted treatment plans',
    },
    {
        id: 6,
        image: '/6-Clinic Operation & Systemization.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/pBeVJGJRkG',
        titleAr: 'عمليات العيادة والتنظيم',
        titleEn: 'Clinic Operations & Systemization',
        subtitleAr: 'حوّل عيادتك إلى بيزنس منظم ومريح وقابل للنمو',
        subtitleEn: 'Create systems that keep your clinic running smoothly',
    },
    {
        id: 7,
        image: '/7-Team Building & Leadership inThe Dental Clinic.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/iHrtgWHjCw',
        titleAr: 'بناء وقيادة فريق العيادة',
        titleEn: 'Team Building & Leadership in The Dental Clinic',
        subtitleAr: 'بناء وقيادة فريق عمل قوي داخل عيادة الأسنان',
        subtitleEn: 'Lead your team with clarity, structure, and confidence',
    },
    {
        id: 8,
        image: '/8-Financial Planning & Profit Optimization.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/FXGyBgkhKL',
        titleAr: 'التخطيط المالي وتعظيم الأرباح',
        titleEn: 'Financial Planning & Profit Optimization',
        subtitleAr: 'افهم أرقامك وزوّد أرباح عيادتك بذكاء',
        subtitleEn: 'Understand your numbers and grow profits intentionally',
    },
    {
        id: 9,
        image: '/9-Personal Branding Master Course.webp',
        link: 'https://dentalbusinessdevelopment.nzmly.com/l/KJbXKkFRgV',
        titleAr: 'دورة البراند الشخصي للأطباء',
        titleEn: 'Personal Branding Master Course',
        subtitleAr: 'ابنِ براندك الشخصي واصنع حضورًا قويًا يفتح لك الفرص',
        subtitleEn: 'For Healthcare Providers',
    },
]

export default function Courses() {
    const { language } = useLanguage()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    const content = {
        ar: {
            title: 'الكورسات المتاحة',
            subtitle: 'اختر الكورس المناسب لمرحلتك الحالية',
            viewCourse: 'شاهد الكورس',
        },
        en: {
            title: 'Available Courses',
            subtitle: 'Choose the course that fits your current stage',
            viewCourse: 'View Course',
        },
    }

    const text = content[language]

    return (
        <section id="courses" className="py-20 px-4 relative overflow-hidden">
            <AnimatedBackground sectionId="courses" />
            <div ref={ref} className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {text.title}
                    </h2>
                    <p className="text-xl text-white/70">
                        {text.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.a
                            key={course.id}
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.03, y: -8 }}
                            whileTap={{ scale: 0.98 }}
                            className="group block"
                        >
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                                {/* Course Image */}
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={course.image}
                                        alt={language === 'ar' ? course.titleAr : course.titleEn}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg"
                                        >
                                            <FaPlay className="text-white text-xl ml-1" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {language === 'ar' ? course.titleAr : course.titleEn}
                                    </h3>
                                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                                        {language === 'ar' ? course.subtitleAr : course.subtitleEn}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-primary font-semibold text-sm group-hover:underline">
                                            {text.viewCourse}
                                        </span>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="text-primary"
                                        >
                                            {language === 'ar' ? '←' : '→'}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
