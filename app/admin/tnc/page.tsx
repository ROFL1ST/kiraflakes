'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import TncForm from '@/components/admin/TncForm'

type TncItem = {
  id: string
  title: string
  content: string
  sort_order: number
}

export default function TncAdminPage() {
  const [items, setItems] = useState<TncItem[]>([])
  const [loading, setLoading] = useState(true)
  
  const [editingItem, setEditingItem] = useState<TncItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/tnc')
      const data = await res.json()
      setItems(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    const isEdit = !!data.id
    const method = isEdit ? 'PUT' : 'POST'

    if (!isEdit) {
      data.sort_order = items.length
    }

    try {
      const res = await fetch('/api/tnc', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setIsAdding(false)
        setEditingItem(null)
        fetchItems()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus item ini?')) return

    try {
      const res = await fetch(`/api/tnc?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setItems(items.filter(item => item.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-8">Memuat data...</div>

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions</h1>
        {!isAdding && !editingItem && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#E36464] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d45555] transition"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Baru
          </button>
        )}
      </div>

      {isAdding && (
        <TncForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingItem && (
        <TncForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {!isAdding && !editingItem && (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <motion.div 
              layout 
              key={item.id} 
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 whitespace-pre-wrap text-sm">{item.content}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
             <div className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
               Belum ada data Terms & Conditions.
             </div>
          )}
        </div>
      )}
    </div>
  )
}
