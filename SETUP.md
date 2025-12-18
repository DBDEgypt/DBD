# Quick Setup Instructions

## Required Files

### 1. Font Files
Add the Graphik Compact Trial font files to `public/fonts/`:
- GraphikCompactTrial-Regular.woff2
- GraphikCompactTrial-Regular.woff
- GraphikCompactTrial-Medium.woff2
- GraphikCompactTrial-Medium.woff
- GraphikCompactTrial-Bold.woff2
- GraphikCompactTrial-Bold.woff
- GraphikCompactTrial-Light.woff2
- GraphikCompactTrial-Light.woff

### 2. Video File
Copy your video file to `public/69091494a8b46_COURSEAD.mp4`

You can do this manually or run:
```bash
# Windows PowerShell
Copy-Item "69091494a8b46_COURSEAD.mp4" -Destination "public\69091494a8b46_COURSEAD.mp4"
```

### 3. Dr. Omar Photo (Optional)
Add `public/dr-omar.jpg` if you have a photo. Otherwise, a placeholder will be shown.

## Update Contact Information

Before deploying, update these files with your actual contact information:

1. **components/Contact.tsx** - Line 47, 53, 59
   - Update WhatsApp link: `https://wa.me/yourwhatsapp`
   - Update Facebook link: `https://facebook.com/yourpage`
   - Update email: `info@dbd.com`

2. **components/FloatingButtons.tsx** - Line 15, 35
   - Update WhatsApp link: `https://wa.me/yourwhatsapp`
   - Update Facebook link: `https://facebook.com/yourpage`

## Install and Run

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```



