'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

type TncItem = {
  id?: string
  title: string
  content: string
  sort_order: number
}

interface TncFormProps {
  initialData?: TncItem
  onSave: (data: any) => Promise<void>
  onCancel: () => void
}

export default function TncForm({ initialData, onSave, onCancel }: TncFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    sort_order: initialData?.sort_order || 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave({ ...initialData, ...formData })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Bagian</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Contoh: General"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-[#E36464] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d45555] transition disabled:opacity-70"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}
