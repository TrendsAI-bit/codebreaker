'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { puzzles, validateAnswer, getProgress, saveProgress, getUnlockedFragments, buildFinalKey } from '@/lib/puzzle-utils'

export default function PuzzlesPage() {
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([])
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [messages, setMessages] = useState<{ [key: number]: string }>({})
  const [isValidating, setIsValidating] = useState<{ [key: number]: boolean }>({})
  const [expandedPuzzle, setExpandedPuzzle] = useState<number | null>(1)

  useEffect(() => {
    setCompletedPuzzles(getProgress())
  }, [])

  const handleAnswerSubmit = async (puzzleId: number) => {
    const answer = answers[puzzleId]?.trim()
    if (!answer) return

    setIsValidating(prev => ({ ...prev, [puzzleId]: true }))
    
    try {
      const puzzle = puzzles.find(p => p.id === puzzleId)
      if (!puzzle) return

      const isValid = await validateAnswer(answer, puzzle.answerHash)
      
      if (isValid) {
        setMessages(prev => ({ ...prev, [puzzleId]: 'Correct! Fragment unlocked.' }))
        const newCompleted = [...completedPuzzles, puzzleId]
        setCompletedPuzzles(newCompleted)
        saveProgress(newCompleted)
        setAnswers(prev => ({ ...prev, [puzzleId]: '' }))
      } else {
        setMessages(prev => ({ ...prev, [puzzleId]: 'Incorrect. Try again.' }))
      }
    } catch (error) {
      setMessages(prev => ({ ...prev, [puzzleId]: 'Error validating answer.' }))
    } finally {
      setIsValidating(prev => ({ ...prev, [puzzleId]: false }))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, puzzleId: number) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit(puzzleId)
    }
  }

  const unlockedFragments = getUnlockedFragments()
  const finalKey = buildFinalKey()

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">The Five Puzzles</h1>
              <p className="text-gray-400 text-lg">
                Solve each puzzle to unlock its fragment. Progress is saved automatically.
              </p>
            </div>

            <div className="space-y-6">
              {puzzles.map((puzzle) => {
                const isCompleted = completedPuzzles.includes(puzzle.id)
                const isExpanded = expandedPuzzle === puzzle.id
                
                return (
                  <div key={puzzle.id} className="card overflow-hidden">
                    {/* Puzzle Header */}
                    <button
                      onClick={() => setExpandedPuzzle(isExpanded ? null : puzzle.id)}
                      className="w-full p-6 text-left hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-300'
                          }`}>
                            {isCompleted ? '✓' : puzzle.id}
                          </div>
                          <h2 className="text-xl font-semibold text-white">{puzzle.title}</h2>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCompleted && (
                            <span className="text-green-400 text-sm font-medium">COMPLETED</span>
                          )}
                          <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Puzzle Content */}
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="space-y-6">
                          {/* Image */}
                          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={puzzle.image}
                              alt={puzzle.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                // Fallback for missing images
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="flex items-center justify-center h-full text-gray-400">
                                      <div class="text-center">
                                        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p>Puzzle Image</p>
                                      </div>
                                    </div>
                                  `
                                }
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <p className="text-white text-sm">{puzzle.description}</p>
                            </div>
                          </div>

                          {/* Fragment Display */}
                          {isCompleted && (
                            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                              <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-green-400 font-medium">Fragment Unlocked:</span>
                                <span className="text-white font-mono text-lg">{puzzle.fragment}</span>
                              </div>
                            </div>
                          )}

                          {/* Answer Input */}
                          {!isCompleted && (
                            <div className="space-y-4">
                              <div>
                                <label htmlFor={`answer-${puzzle.id}`} className="block text-sm font-medium text-gray-300 mb-2">
                                  Your Answer
                                </label>
                                <input
                                  id={`answer-${puzzle.id}`}
                                  type="text"
                                  value={answers[puzzle.id] || ''}
                                  onChange={(e) => setAnswers(prev => ({ ...prev, [puzzle.id]: e.target.value }))}
                                  onKeyPress={(e) => handleKeyPress(e, puzzle.id)}
                                  className="input-field w-full"
                                  placeholder="Enter your answer..."
                                  disabled={isValidating[puzzle.id]}
                                />
                              </div>
                              
                              <button
                                onClick={() => handleAnswerSubmit(puzzle.id)}
                                disabled={!answers[puzzle.id]?.trim() || isValidating[puzzle.id]}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isValidating[puzzle.id] ? 'Checking...' : 'Check Answer'}
                              </button>
                              
                              {messages[puzzle.id] && (
                                <div className={`p-3 rounded-lg text-sm ${
                                  messages[puzzle.id].includes('Correct') 
                                    ? 'bg-green-900/20 text-green-400 border border-green-700' 
                                    : 'bg-red-900/20 text-red-400 border border-red-700'
                                }`}>
                                  {messages[puzzle.id]}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress Panel - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Completed</span>
                    <span className="text-white font-semibold">
                      {completedPuzzles.length} / {puzzles.length}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedPuzzles.length / puzzles.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {unlockedFragments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Unlocked Fragments</h4>
                    <div className="space-y-2">
                      {unlockedFragments.map((fragment, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white font-mono">{fragment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {completedPuzzles.length === puzzles.length && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700 rounded-lg">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Final Key</h4>
                    <div className="bg-gray-800 rounded p-3">
                      <code className="text-white font-mono text-lg break-all">{finalKey}</code>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Congratulations! You&apos;ve unlocked the final key.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
