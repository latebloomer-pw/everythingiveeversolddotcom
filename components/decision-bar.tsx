"use client"

interface DecisionBarProps {
  onReject: () => void
  onApprove: () => void
}

export function DecisionBar({ onReject, onApprove }: DecisionBarProps) {
  return (
    <div className="flex justify-between mt-6 max-w-4xl mx-auto px-4 gap-2">
      <button
        onClick={onReject}
        className="text-xs sm:text-lg font-bold px-2 sm:px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-b-4 border-red-700 active:border-b-2 active:transform active:translate-y-1 flex-1 whitespace-nowrap"
        style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
        aria-label="Reject item"
      >
        Oh my! No.
      </button>
      <button
        onClick={onApprove}
        className="text-xs sm:text-lg font-bold px-2 sm:px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-b-4 border-green-700 active:border-b-2 active:transform active:translate-y-1 flex-1 whitespace-nowrap"
        style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
        aria-label="Approve item"
      >
        Yes, that's nice.
      </button>
    </div>
  )
}
