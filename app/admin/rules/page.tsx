'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { motion } from 'motion/react'

type Rule = {
  id: string
  type: 'ok' | 'no'
  text: string
  sort_order: number
}

export default function RulesAdminPage() {
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)
  
  const [newText, setNewText] = useState('')
  const [newType, setNewType] = useState<'ok' | 'no'>('ok')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchRules()
  }, [])

  const fetchRules = async () => {
    try {
      const res = await fetch('/api/rules')
      const data = await res.json()
      setRules(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) return

    setSaving(true)
    try {
      const sortOrder = rules.filter(r => r.type === newType).length
      
      const res = await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: newType, text: newText, sort_order: sortOrder }),
      })

      if (res.ok) {
        setNewText('')
        fetchRules()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus rule ini?')) return

    try {
      const res = await fetch(`/api/rules?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setRules(rules.filter(r => r.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const okRules = rules.filter(r => r.type === 'ok').sort((a, b) => a.sort_order - b.sort_order)
  const noRules = rules.filter(r => r.type === 'no').sort((a, b) => a.sort_order - b.sort_order)

  if (loading) return <div className="p-8">Memuat data...</div>

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rules (Do's & Don'ts)</h1>

      {/* Form Add */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teks Rule</label>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Contoh: Anime Artstyle"
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as 'ok' | 'no')}
            className="rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464] bg-white"
          >
            <option value="ok">I will draw</option>
            <option value="no">I will not draw</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-[#E36464] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d45555] transition disabled:opacity-70"
        >
          {saving ? 'Menambah...' : 'Tambah Rule'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* I Will Draw */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            I will draw
          </h2>
          <div className="space-y-3">
            {okRules.map(rule => (
              <motion.div layout key={rule.id} className="flex items-center justify-between bg-green-50/50 p-3 rounded-lg border border-green-100">
                <span className="text-gray-700 text-sm">{rule.text}</span>
                <button onClick={() => handleDelete(rule.id)} className="text-red-400 hover:text-red-600">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {okRules.length === 0 && <p className="text-sm text-gray-500">Belum ada rule.</p>}
          </div>
        </div>

        {/* I Will Not Draw */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <XCircleIcon className="w-5 h-5 text-red-500" />
            I will not draw
          </h2>
          <div className="space-y-3">
            {noRules.map(rule => (
              <motion.div layout key={rule.id} className="flex items-center justify-between bg-red-50/50 p-3 rounded-lg border border-red-100">
                <span className="text-gray-700 text-sm">{rule.text}</span>
                <button onClick={() => handleDelete(rule.id)} className="text-red-400 hover:text-red-600">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {noRules.length === 0 && <p className="text-sm text-gray-500">Belum ada rule.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
