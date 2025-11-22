import { useEffect } from 'react'

function Hero({ onSeed }) {
  useEffect(() => {
    // Optionally seed sample data on first load
    const seed = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      } catch (e) {
        // ignore
      }
    }
    seed()
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Mobile Software Issue Solutions
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
          Clear guides and expert help for iCloud/Activation Lock, FRP, Screen Locks, Bootloops and more.
        </p>
      </div>
    </section>
  )
}

export default Hero
