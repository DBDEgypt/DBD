import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dbd-system.com'),
  title: {
    default: 'DBD Clinic Growth System | نظام تطوير العيادات',
    template: '%s | DBD System',
  },
  description: 'نظام DBD المتكامل لتطوير وإدارة العيادات في مصر والخليج. تعلم استراتيجيات التسويق الطبي، إدارة العيادات، وزيادة الأرباح مع د. عمر الشربيني. DBD Clinic Growth System - Professional clinic management and marketing system for dentists in Egypt and the Arab world.',
  keywords: [
    'تطوير العيادات',
    'إدارة العيادات',
    'تسويق طبي',
    'عيادة أسنان',
    'دكتور عمر الشربيني',
    'DBD System',
    'نظام DBD',
    'كورسات طب الأسنان',
    'زيادة أرباح العيادة',
    'إدارة عيادات مصر',
    'تطوير عيادات الخليج',
    'clinic management',
    'dental marketing',
    'clinic growth',
    'medical marketing Egypt',
    'dental business development',
    'clinic management Saudi Arabia',
    'dental practice management UAE',
  ],
  authors: [{ name: 'Dr. Omar El Sherbiny', url: 'https://dbd-system.com' }],
  creator: 'DBD - Dental Business Development',
  publisher: 'DBD System',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: ['en_US', 'ar_SA', 'ar_AE'],
    url: 'https://dbd-system.com',
    siteName: 'DBD Clinic Growth System',
    title: 'DBD Clinic Growth System | نظام تطوير العيادات',
    description: 'نظام DBD المتكامل لتطوير وإدارة العيادات في مصر والخليج. تعلم استراتيجيات التسويق الطبي وزيادة الأرباح.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DBD Clinic Growth System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DBD Clinic Growth System | نظام تطوير العيادات',
    description: 'نظام DBD المتكامل لتطوير وإدارة العيادات في مصر والخليج',
    images: ['/og-image.jpg'],
    creator: '@DBDSystem',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: {
    canonical: 'https://dbd-system.com',
    languages: {
      'ar-EG': 'https://dbd-system.com',
      'ar-SA': 'https://dbd-system.com',
      'en': 'https://dbd-system.com',
    },
  },
  category: 'Medical Education',
  icons: {
    icon: '/logo black.png',
    shortcut: '/logo black.png',
    apple: '/logo black.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo black.png" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <meta name="geo.region" content="EG" />
        <meta name="geo.placename" content="Egypt" />
        <meta name="geo.position" content="26.820553;30.802498" />
        <meta name="ICBM" content="26.820553, 30.802498" />
        
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="font-graphik antialiased" style={{ fontFamily: "'Graphik Compact Trial', sans-serif" }}>
        <ModalProvider>
          {children}
        </ModalProvider>

        {FB_PIXEL_ID && (
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </body>
    </html>
  )
}
