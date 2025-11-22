import { useEffect, useState } from 'react'

function Categories({ onSelect }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      try {
        const res = await fetch(`${baseUrl}/api/categories`)
        const data = await res.json()
        setCategories(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) return <p className="text-blue-200">Loading categories...</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect?.(cat)}
          className="group bg-slate-800/50 border border-blue-500/20 rounded-xl p-5 text-left hover:border-blue-400/40 transition"
        >
          <div className="text-sm text-blue-300/80">{cat.key.toUpperCase()}</div>
          <div className="mt-1 text-white font-semibold text-lg">{cat.title}</div>
          {cat.description && <p className="mt-1 text-blue-200/80 text-sm">{cat.description}</p>}
          <span className="inline-block mt-3 text-xs text-blue-300/70">Explore →</span>
        </button>
      ))}
    </div>
  )
}

export default Categories
