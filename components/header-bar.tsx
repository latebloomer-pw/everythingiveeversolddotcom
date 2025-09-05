"use client"

export function HeaderBar() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <header className="text-center py-6 px-4">
      <h1
        className="text-2xl sm:text-4xl font-normal text-blue-600 underline cursor-pointer hover:text-blue-700 transition-colors leading-tight"
        onClick={handleRefresh}
      >
        <span className="block sm:inline">everythingiveever</span>
        <span className="block sm:inline">solddotcom</span>
      </h1>
    </header>
  )
}
