# DBD Clinic Growth System - Landing Page

A modern, dynamic landing page for the DBD Clinic Growth System, featuring bilingual support (Arabic/English), smooth animations, and a comprehensive presentation of the clinic management system.

## Features

- ✅ Fully responsive design
- ✅ Bilingual support (Arabic/English) with RTL/LTR switching
- ✅ Smooth animations using Framer Motion
- ✅ Countdown timer for limited-time offers
- ✅ WhatsApp and Facebook floating buttons
- ✅ All sections connected as one seamless unit
- ✅ Radial gradient background (blue to black)
- ✅ Graphik Compact font family
- ✅ Video player for course details
- ✅ Interactive FAQ section
- ✅ Contact section with social links

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add the Graphik Compact font files to `public/fonts/`:
   - GraphikCompactTrial-Regular.woff2
   - GraphikCompactTrial-Regular.woff
   - GraphikCompactTrial-Medium.woff2
   - GraphikCompactTrial-Medium.woff
   - GraphikCompactTrial-Bold.woff2
   - GraphikCompactTrial-Bold.woff
   - GraphikCompactTrial-Light.woff2
   - GraphikCompactTrial-Light.woff

3. Add Dr. Omar's photo to `public/dr-omar.jpg` (optional, will show placeholder if missing)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Update Contact Links

Edit the following files to add your actual contact information:

- `components/Contact.tsx` - Update WhatsApp, Facebook, and email links
- `components/FloatingButtons.tsx` - Update WhatsApp and Facebook URLs

### Update Video

The video player in `/courses` page expects:
- Video file: `public/69091494a8b46_COURSEAD.mp4` (already exists)
- Optional poster: `public/video-poster.jpg`

### Customize Colors

Colors are defined in `tailwind.config.js`:
- Primary: #3634e3
- Secondary: #494949
- Background: Radial gradient from #3634e3 to #000000

## Project Structure

```
├── app/
│   ├── courses/
│   │   └── page.tsx          # Detailed courses page with video
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main landing page
│   └── globals.css           # Global styles and font definitions
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Hero.tsx              # Hero section
│   ├── AboutDrOmar.tsx       # About Dr. Omar section
│   ├── WhoIsItFor.tsx        # Target audience section
│   ├── WhyEnroll.tsx         # Why enroll section
│   ├── WhatItProvides.tsx    # What system provides
│   ├── Results.tsx           # Results/statistics
│   ├── Reviews.tsx           # Testimonials
│   ├── Packages.tsx          # Pricing packages
│   ├── CountdownTimer.tsx    # Countdown timer component
│   ├── FAQ.tsx               # FAQ section
│   ├── EmotionalClose.tsx    # Final CTA section
│   ├── Contact.tsx           # Contact section
│   └── FloatingButtons.tsx   # WhatsApp/Facebook buttons
├── context/
│   └── LanguageContext.tsx   # Language switching context
└── public/
    ├── logo.png              # Logo file
    └── fonts/                # Font files directory
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## Notes

- The website uses a radial gradient background as specified
- All sections flow seamlessly without visible breaks
- Language switching updates the entire page direction (RTL/LTR)
- Countdown timer is set to 7 days from page load (customize in Packages.tsx)
- All CTAs link to the packages section or contact form

## License

This project is proprietary and confidential.



