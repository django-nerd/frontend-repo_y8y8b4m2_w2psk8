import { useState } from 'react'

function RequestForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', device_model: '', issue_category: '', issue_description: '', urgent: false })
  const [status, setStatus] = useState(null)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus(`✅ ${data.message}`)
        setForm({ name: '', email: '', phone: '', device_model: '', issue_category: '', issue_description: '', urgent: false })
      } else {
        setStatus(`❌ ${data.detail || 'Failed'}`)
      }
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5 space-y-3">
      <h3 className="text-white font-semibold text-xl">Request Expert Help</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input value={form.name} onChange={e=>update('name', e.target.value)} placeholder="Your name" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" required />
        <input type="email" value={form.email} onChange={e=>update('email', e.target.value)} placeholder="Email" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" required />
        <input value={form.phone} onChange={e=>update('phone', e.target.value)} placeholder="Phone (optional)" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" />
        <input value={form.device_model} onChange={e=>update('device_model', e.target.value)} placeholder="Device model (e.g., iPhone 12, Galaxy S21)" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <input value={form.issue_category} onChange={e=>update('issue_category', e.target.value)} placeholder="Issue category (iCloud, FRP, Screen Lock, etc.)" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" />
        <label className="flex items-center gap-2 text-blue-200/80">
          <input type="checkbox" checked={form.urgent} onChange={e=>update('urgent', e.target.checked)} />
          Mark as urgent
        </label>
      </div>
      <textarea value={form.issue_description} onChange={e=>update('issue_description', e.target.value)} placeholder="Describe the problem in detail" rows={4} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-blue-100 placeholder-blue-300/50" />
      <button className="w-full md:w-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold">Submit Request</button>
      {status && <p className="text-sm text-blue-200/90">{status}</p>}
    </form>
  )
}

export default RequestForm
