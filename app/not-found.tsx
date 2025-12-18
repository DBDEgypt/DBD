import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-white mb-4">404</h2>
        <p className="text-white/80 mb-6">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}





