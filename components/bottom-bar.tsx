"use client"

interface BottomBarProps {
  runningTotal: number
  onMenuClick: () => void
}

export function BottomBar({ runningTotal, onMenuClick }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t divider-gray py-4 px-4">
      <div className="flex justify-end items-center max-w-4xl mx-auto">
        <button
          onClick={onMenuClick}
          className="hover:bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          aria-label="Menu"
        >
          <span className="text-blue-600 text-3xl">🍔</span>
        </button>
      </div>
    </div>
  )
}
