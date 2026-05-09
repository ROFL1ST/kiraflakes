'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import PricingForm from '@/components/admin/PricingForm'

type PricingCard = {
  id: string
  title: string
  subtitle: string
  description: string
  image_urls: string[] // ← DIUBAH
  prices: { label: string; price: string }[]
  note: string
  popular: boolean
  button_color: string
  sort_order: number
}

export default function PricingAdminPage() {
  const [cards, setCards] = useState<PricingCard[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCard, setEditingCard] = useState<PricingCard | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => { fetchCards() }, [])

  const fetchCards = async () => {
    try {
      const res = await fetch('/api/pricing')
      const data = await res.json()
      setCards(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    const isEdit = !!data.id
    const method = isEdit ? 'PUT' : 'POST'
    if (!isEdit) data.sort_order = cards.length
    try {
      const res = await fetch('/api/pricing', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setIsAdding(false)
        setEditingCard(null)
        fetchCards()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus card pricing ini?')) return
    try {
      const res = await fetch(`/api/pricing?id=${id}`, { method: 'DELETE' })
      if (res.ok) setCards(cards.filter(c => c.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-8">Memuat data...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pricing Cards</h1>
        {!isAdding && !editingCard && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#E36464] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d45555] transition"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Card
          </button>
        )}
      </div>

      {isAdding && (
        <PricingForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
      )}

      {editingCard && (
        <PricingForm
          initialData={editingCard}
          onSave={handleSave}
          onCancel={() => setEditingCard(null)}
        />
      )}

      {!isAdding && !editingCard && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <motion.div
              layout
              key={card.id}
              className={`bg-white p-6 rounded-2xl border ${card.popular ? 'border-[#E36464] ring-1 ring-[#E36464]' : 'border-gray-200'} shadow-sm relative`}
            >
              {card.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E36464] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{card.subtitle}</p>
                  <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingCard(card)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(card.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{card.description}</p>

              {/* ← DIUBAH: tampilkan image_urls sebagai mini grid */}
              {card.image_urls?.length > 0 && (
                <div className={`mb-4 gap-1.5 rounded-lg overflow-hidden ${
                  card.image_urls.length === 1
                    ? 'grid grid-cols-1'
                    : card.image_urls.length === 2
                    ? 'grid grid-cols-2'
                    : 'grid grid-cols-2'
                }`}>
                  {card.image_urls.slice(0, 4).map((url, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded border border-gray-100 ${
                        card.image_urls.length === 1 ? 'aspect-[4/3]' : 'aspect-square'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${card.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Badge "+N" jika ada lebih dari 4 gambar */}
                      {idx === 3 && card.image_urls.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">+{card.image_urls.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <ul className="space-y-2 mb-4 text-sm text-gray-600">
                {card.prices.map((p, i) => (
                  <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                    <span>{p.label}</span>
                    <span className="font-semibold text-gray-900">{p.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          {cards.length === 0 && (
            <div className="col-span-full text-gray-500 text-sm py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              Belum ada data Pricing Cards.
            </div>
          )}
        </div>
      )}
    </div>
  )
}