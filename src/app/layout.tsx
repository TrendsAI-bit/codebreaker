import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Codebreaker Quest',
  description: 'Solve five puzzles to reveal the final key',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-white">
                    Codebreaker Quest
                  </h1>
                </div>
                <nav className="flex space-x-8">
                  <a 
                    href="/" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                  <a 
                    href="/puzzles" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Puzzles
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-800 border-t border-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
              <p>&copy; 2025 Codebreaker Quest.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
