"use client"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-gray-400 p-6 max-w-md mx-4" style={{ boxShadow: "2px 2px 0px #000000" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">About</h2>
          <button onClick={onClose} className="text-xl hover:bg-gray-200 px-2 focus:outline-none" aria-label="Close">
            ×
          </button>
        </div>
        <p className="text-sm">This is a stub about page. More content coming soon!</p>
      </div>
    </div>
  )
}
