import { useState } from 'react'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Guides from './components/Guides'
import RequestForm from './components/RequestForm'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative">
        <Hero />

        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Browse Common Issues</h2>
          <Categories onSelect={setSelected} />
          <Guides category={selected} />
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <RequestForm />
        </section>

        <footer className="py-10 text-center text-blue-300/70">
          <p>Educational guides and support. We do not promote unlawful device access. Ownership verification may be required.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
