import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                The Codebreaker
                <span className="block text-blue-400">Quest</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Crack the code to unlock a $10,000 Solana wallet! Embark on a journey 
                through five enigmatic puzzles. Each solved mystery reveals a fragment 
                of the final key. Will you have what it takes to unlock the ultimate prize?
              </p>
              
              {/* Rules */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">How to Play</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Solve five puzzles in sequence
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Each puzzle reveals a text fragment
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Progress is saved automatically
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Combine all fragments to build the final key
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/puzzles"
                  className="btn-primary text-center text-lg px-8 py-3"
                >
                  Start Quest
                </Link>
              </div>
            </div>

            {/* Right Column - Logo */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-8 backdrop-blur-sm">
                  <div className="h-full flex items-center justify-center">
                    <div className="relative">
                      <Image
                        src="/art/logo.png"
                        alt="Codebreaker Quest Logo"
                        width={300}
                        height={300}
                        className="w-full h-auto max-w-sm mx-auto"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/30 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Awaits You</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each puzzle is carefully crafted to test your wit and determination. 
              No external resources needed—everything you need is right here.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mind-Bending Puzzles</h3>
              <p className="text-gray-400">Five unique challenges that will test your analytical thinking and creativity.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Progress</h3>
              <p className="text-gray-400">Your progress is automatically saved. Pick up where you left off anytime.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">$10,000 Prize</h3>
              <p className="text-gray-400">Unlock the final key to access the $10,000 Solana wallet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
