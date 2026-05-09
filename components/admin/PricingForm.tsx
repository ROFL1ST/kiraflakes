'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import ImageUploader from './ImageUploader'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

type PriceItem = { label: string; price: string }

type PricingCard = {
  id?: string
  title: string
  subtitle: string
  description: string
  image_url: string
  prices: PriceItem[]
  note: string
  popular: boolean
  button_color: string
  sort_order: number
}

interface PricingFormProps {
  initialData?: PricingCard
  onSave: (data: any) => Promise<void>
  onCancel: () => void
}

export default function PricingForm({ initialData, onSave, onCancel }: PricingFormProps) {
  const [formData, setFormData] = useState<PricingCard>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    image_url: initialData?.image_url || '',
    prices: initialData?.prices?.length ? initialData.prices : [{ label: '', price: '' }],
    note: initialData?.note || '',
    popular: initialData?.popular || false,
    button_color: initialData?.button_color || '#E36464',
    sort_order: initialData?.sort_order || 0,
  })
  
  const [saving, setSaving] = useState(false)

  const handlePriceChange = (index: number, field: keyof PriceItem, value: string) => {
    const newPrices = [...formData.prices]
    newPrices[index][field] = value
    setFormData(prev => ({ ...prev, prices: newPrices }))
  }

  const addPrice = () => {
    setFormData(prev => ({ ...prev, prices: [...prev.prices, { label: '', price: '' }] }))
  }

  const removePrice = (index: number) => {
    const newPrices = formData.prices.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, prices: newPrices }))
  }

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Contoh: Illustration Showcase"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Contoh: CHIBIS!!!!"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gambar Utama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Cover</label>
          <ImageUploader 
            currentUrl={formData.image_url}
            onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            folder="pricing"
          />
        </div>

        {/* Prices List */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daftar Harga</label>
          <div className="space-y-3">
            {formData.prices.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handlePriceChange(idx, 'label', e.target.value)}
                  placeholder="Bust-up"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-[#E36464]"
                  required
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handlePriceChange(idx, 'price', e.target.value)}
                  placeholder="65k / $15"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-[#E36464]"
                  required
                />
                <button
                  type="button"
                  onClick={() => removePrice(idx)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPrice}
              className="text-sm flex items-center gap-1 text-[#E36464] font-medium hover:underline"
            >
              <PlusIcon className="w-4 h-4" /> Tambah Harga
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Note)</label>
          <input
            type="text"
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            placeholder="Contoh: Background price depends..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer mt-6">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.checked }))}
              className="w-4 h-4 text-[#E36464] rounded focus:ring-[#E36464]"
            />
            <span className="text-sm font-medium text-gray-700">Tandai "Popular"</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
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
