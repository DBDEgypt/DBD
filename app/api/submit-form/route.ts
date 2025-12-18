import { NextRequest, NextResponse } from 'next/server'

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.NEXT_PUBLIC_SITE_URL,
  'https://dbd-system.netlify.app',
].filter(Boolean)

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 8
}

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim().slice(0, 500)
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!APPS_SCRIPT_URL) {
      console.error('GOOGLE_APPS_SCRIPT_URL not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, phone, country, hasClinic, mainChallenge } = body

    if (!name || !email || !phone || !country || !hasClinic || !mainChallenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 })
    }

    const allowedCountries = ['Egypt', 'Saudi', 'UAE', 'Kuwait', 'Qatar', 'Oman', 'Bahrain', 'Other']
    const allowedChallenges = [
      'Marketing not working',
      'Daily management chaos',
      'Pricing & expenses',
      'Treatment plan acceptance/sales',
      'Need full system'
    ]

    if (!allowedCountries.includes(country)) {
      return NextResponse.json({ error: 'Invalid country' }, { status: 400 })
    }

    if (!['Yes', 'No'].includes(hasClinic)) {
      return NextResponse.json({ error: 'Invalid hasClinic value' }, { status: 400 })
    }

    if (!allowedChallenges.includes(mainChallenge)) {
      return NextResponse.json({ error: 'Invalid challenge' }, { status: 400 })
    }

    const sanitizedPayload = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      country,
      hasClinic,
      mainChallenge,
      source: 'website-form',
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(sanitizedPayload),
      redirect: 'follow',
    })

    const responseText = await response.text()
    
    try {
      const responseJson = JSON.parse(responseText)
      if (responseJson.ok || responseJson.success) {
        return NextResponse.json({ success: true, message: 'Form submitted successfully' })
      }
    } catch {
      // Response wasn't JSON, but request likely succeeded
    }

    return NextResponse.json({ success: true, message: 'Form submitted' })

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
