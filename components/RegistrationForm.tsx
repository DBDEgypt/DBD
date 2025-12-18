'use client'

import { useState, FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'

interface RegistrationFormProps {
  onSubmit?: () => void
  showTitle?: boolean
}

export default function RegistrationForm({ onSubmit, showTitle = true }: RegistrationFormProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    hasClinic: '',
    mainChallenge: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const content = {
    ar: {
      title: 'سجل الآن',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      country: 'الدولة',
      hasClinic: 'هل لديك عيادة؟',
      mainChallenge: 'التحدي الرئيسي',
      submit: 'إرسال',
      submitting: 'جاري الإرسال...',
      success: 'تم استلام التسجيل. يرجى التحقق من بريدك الإلكتروني.',
      selectCountry: 'اختر الدولة',
      selectOption: 'اختر...',
      yes: 'نعم',
      no: 'لا',
      countries: {
        Egypt: 'مصر',
        Saudi: 'السعودية',
        UAE: 'الإمارات',
        Kuwait: 'الكويت',
        Qatar: 'قطر',
        Oman: 'عمان',
        Bahrain: 'البحرين',
        Other: 'أخرى',
      },
      challenges: {
        'Marketing not working': 'التسويق لا يعمل',
        'Daily management chaos': 'فوضى الإدارة اليومية',
        'Pricing & expenses': 'التسعير والمصروفات',
        'Treatment plan acceptance/sales': 'قبول الخطة العلاجية / المبيعات',
        'Need full system': 'الحاجة لنظام كامل',
      },
      errors: {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        submit: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      },
    },
    en: {
      title: 'Register Now',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      hasClinic: 'Do you have a clinic?',
      mainChallenge: 'Main Challenge',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Registration received. Please check your email.',
      selectCountry: 'Select Country',
      selectOption: 'Select...',
      yes: 'Yes',
      no: 'No',
      countries: {
        Egypt: 'Egypt',
        Saudi: 'Saudi Arabia',
        UAE: 'UAE',
        Kuwait: 'Kuwait',
        Qatar: 'Qatar',
        Oman: 'Oman',
        Bahrain: 'Bahrain',
        Other: 'Other',
      },
      challenges: {
        'Marketing not working': 'Marketing not working',
        'Daily management chaos': 'Daily management chaos',
        'Pricing & expenses': 'Pricing & expenses',
        'Treatment plan acceptance/sales': 'Treatment plan acceptance/sales',
        'Need full system': 'Need full system',
      },
      errors: {
        required: 'This field is required',
        email: 'Please enter a valid email',
        phone: 'Please enter a valid phone number',
        submit: 'An error occurred. Please try again.',
      },
    },
  }

  const text = content[language]

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = text.errors.required
    if (!formData.email.trim()) {
      newErrors.email = text.errors.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = text.errors.email
    }
    if (!formData.phone.trim()) {
      newErrors.phone = text.errors.required
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = text.errors.phone
    }
    if (!formData.country) newErrors.country = text.errors.required
    if (!formData.hasClinic) newErrors.hasClinic = text.errors.required
    if (!formData.mainChallenge) newErrors.mainChallenge = text.errors.required

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', phone: '', country: '', hasClinic: '', mainChallenge: '' })
        if (onSubmit) setTimeout(() => onSubmit(), 2000)
      } else {
        setErrors({ submit: text.errors.submit })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: text.errors.submit })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white text-lg font-semibold">{text.success}</p>
      </motion.div>
    )
  }

  const inputClass = (field: string) => `w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border ${
    errors[field] ? 'border-red-500' : 'border-white/20'
  } text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showTitle && <h3 className="text-2xl font-bold text-white mb-6 text-center">{text.title}</h3>}

      <div>
        <label htmlFor="name" className="block text-white mb-2 text-sm font-medium">
          {text.name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass('name')}
          placeholder={text.name}
          required
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-white mb-2 text-sm font-medium">
          {text.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass('email')}
          placeholder={text.email}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-white mb-2 text-sm font-medium">
          {text.phone} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass('phone')}
          placeholder={text.phone}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="country" className="block text-white mb-2 text-sm font-medium">
          {text.country} <span className="text-red-500">*</span>
        </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className={inputClass('country')}
          required
        >
          <option value="">{text.selectOption}</option>
          {Object.entries(text.countries).map(([key, value]) => (
            <option key={key} value={key} className="bg-gray-800 text-white">{value}</option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
      </div>

      <div>
        <label htmlFor="hasClinic" className="block text-white mb-2 text-sm font-medium">
          {text.hasClinic} <span className="text-red-500">*</span>
        </label>
        <select
          id="hasClinic"
          value={formData.hasClinic}
          onChange={(e) => setFormData({ ...formData, hasClinic: e.target.value })}
          className={inputClass('hasClinic')}
          required
        >
          <option value="">{text.selectOption}</option>
          <option value="Yes" className="bg-gray-800 text-white">{text.yes}</option>
          <option value="No" className="bg-gray-800 text-white">{text.no}</option>
        </select>
        {errors.hasClinic && <p className="text-red-500 text-sm mt-1">{errors.hasClinic}</p>}
      </div>

      <div>
        <label htmlFor="mainChallenge" className="block text-white mb-2 text-sm font-medium">
          {text.mainChallenge} <span className="text-red-500">*</span>
        </label>
        <select
          id="mainChallenge"
          value={formData.mainChallenge}
          onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
          className={inputClass('mainChallenge')}
          required
        >
          <option value="">{text.selectOption}</option>
          {Object.entries(text.challenges).map(([key, value]) => (
            <option key={key} value={key} className="bg-gray-800 text-white">{value}</option>
          ))}
        </select>
        {errors.mainChallenge && <p className="text-red-500 text-sm mt-1">{errors.mainChallenge}</p>}
      </div>

      {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg mt-6"
      >
        {isSubmitting ? text.submitting : text.submit}
      </button>
    </form>
  )
}
