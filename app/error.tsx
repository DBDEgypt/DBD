'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}





