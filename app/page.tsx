"use client"

import { useState, useEffect } from "react"
import { HeaderBar } from "@/components/header-bar"
import { ItemCard } from "@/components/item-card"
import { DecisionBar } from "@/components/decision-bar"
import { BottomBar } from "@/components/bottom-bar"
import { useSwipe } from "@/hooks/use-swipe"
import type { Item } from "@/types/item"
import itemsData from "@/data/items.json"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [runningTotal, setRunningTotal] = useState(0)
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([])
  const [showAboutModal, setShowAboutModal] = useState(false)

  // Initialize data and shuffle order
  useEffect(() => {
    const typedItems = itemsData as Item[]
    setItems(typedItems)

    // Create shuffled order
    const indices = Array.from({ length: typedItems.length }, (_, i) => i)
    const shuffled = [...indices].sort(() => Math.random() - 0.5)
    setShuffledOrder(shuffled)

    // Set random starting index
    const randomStart = Math.floor(Math.random() * shuffled.length)
    setCurrentIndex(randomStart)

    // Load running total from session storage
    const savedTotal = sessionStorage.getItem("runningTotalUSD")
    if (savedTotal) {
      setRunningTotal(Number.parseFloat(savedTotal))
    }
  }, [])

  // Save running total to session storage
  useEffect(() => {
    sessionStorage.setItem("runningTotalUSD", runningTotal.toString())
  }, [runningTotal])

  const handleApprove = () => {
    if (items.length === 0) return

    const currentItem = items[shuffledOrder[currentIndex]]
    setRunningTotal((prev) => prev + currentItem.price)
    advanceToNext()
  }

  const handleReject = () => {
    advanceToNext()
  }

  const advanceToNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      if (nextIndex >= shuffledOrder.length) {
        // Reshuffle and start over
        const newShuffled = [...shuffledOrder].sort(() => Math.random() - 0.5)
        setShuffledOrder(newShuffled)
        return 0
      }
      return nextIndex
    })
  }

  // Preload next image
  useEffect(() => {
    if (items.length === 0 || shuffledOrder.length === 0) return

    const nextIndex = (currentIndex + 1) % shuffledOrder.length
    const nextItem = items[shuffledOrder[nextIndex]]
    if (nextItem) {
      const img = new Image()
      img.src = nextItem.image
    }
  }, [currentIndex, items, shuffledOrder])

  useSwipe({
    onSwipeLeft: handleReject,
    onSwipeRight: handleApprove,
  })

  if (items.length === 0 || shuffledOrder.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const currentItem = items[shuffledOrder[currentIndex]]

  return (
    <div className="min-h-screen bg-white pb-24">
      <HeaderBar />

      <main className="container mx-auto px-4 py-4 max-w-4xl">
        <ItemCard item={currentItem} />
        <div className="text-center mt-6 mb-4">
          <div className="text-5xl font-bold text-green-600">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(runningTotal)}
          </div>
        </div>
        <DecisionBar onReject={handleReject} onApprove={handleApprove} />
      </main>

      <BottomBar runningTotal={runningTotal} onMenuClick={() => setShowAboutModal(true)} />

      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-400 p-6 max-w-md mx-4 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600">About</h2>
              <button
                onClick={() => setShowAboutModal(false)}
                className="text-2xl hover:bg-gray-200 px-3 py-1 rounded focus:outline-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="text-base leading-relaxed space-y-4">
              <p>This is the website of <strong className="text-blue-600">Andrés González Cardona</strong>.</p>
              <p>Andrés a world-class salesman, project manager and solver of previously unsolveable problems.</p>
              <p>Andrés is currently <a className="text-green-600" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/agcthinks/">available for hire <strong className="animate-pulse text-green">here.</strong></a></p>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">Trusted by</h3>
                <div className="flex justify-center items-center space-x-6">
                  <img 
                    src="/images/christies.jpg" 
                    alt="Christie's" 
                    className="lg:h-10 h-9"
                  />
                  <img 
                    src="/images/voltus.jpg" 
                    alt="Voltus" 
                    className="lg:h-10 h-5"
                  />
                  <img 
                    src="/images/ebay-logo.webp" 
                    alt="eBay" 
                    className="h-10"
                  />
                  <img 
                    src="/images/enpower.jpg" 
                    alt="Enpower" 
                    className="lg:h-10 h-5"
                  />
                </div>
              </div>

            
            
          


            </div>
          </div>
        </div>
      )}
    </div>
  )
}
