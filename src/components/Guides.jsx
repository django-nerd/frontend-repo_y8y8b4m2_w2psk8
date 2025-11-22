import { useEffect, useState } from 'react'

function Guides({ category }) {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!category) return
    const run = async () => {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      try {
        const res = await fetch(`${baseUrl}/api/guides?category_key=${encodeURIComponent(category.key)}`)
        const data = await res.json()
        setGuides(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [category])

  if (!category) return null

  return (
    <div className="mt-6">
      <h3 className="text-white font-semibold text-xl mb-3">Guides for {category.title}</h3>
      {loading ? (
        <p className="text-blue-200">Loading guides...</p>
      ) : guides.length === 0 ? (
        <p className="text-blue-200/80">No guides yet for this category.</p>
      ) : (
        <div className="space-y-4">
          {guides.map(g => (
            <div key={g.id} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-blue-300/70">
                {g.devices?.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{d}</span>
                ))}
                {g.difficulty && <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">{g.difficulty}</span>}
              </div>
              <h4 className="mt-2 text-white font-semibold text-lg">{g.title}</h4>
              {g.summary && <p className="text-blue-200/80 text-sm mt-1">{g.summary}</p>}
              {g.steps?.length > 0 && (
                <ol className="list-decimal ml-6 mt-3 space-y-2 text-blue-100/90">
                  {g.steps.map((s, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{s.title}:</span> {s.details}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Guides
