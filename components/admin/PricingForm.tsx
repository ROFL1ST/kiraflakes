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
  image_urls: string[] // ← DIUBAH: dari image_url ke image_urls
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
    image_urls: initialData?.image_urls?.length ? initialData.image_urls : [''], // ← DIUBAH
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

  // ← BARU: handler untuk image_urls
  const handleImageUpdate = (index: number, url: string) => {
    const updated = [...formData.image_urls]
    updated[index] = url
    setFormData(prev => ({ ...prev, image_urls: updated }))
  }

  const addImage = () => {
    setFormData(prev => ({ ...prev, image_urls: [...prev.image_urls, ''] }))
  }

  const removeImage = (index: number) => {
    const updated = formData.image_urls.filter((_, i) => i !== index)
    // Pastikan minimal ada 1 slot
    setFormData(prev => ({ ...prev, image_urls: updated.length > 0 ? updated : [''] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Filter image_urls yang kosong sebelum disimpan
    const cleanData = {
      ...initialData,
      ...formData,
      image_urls: formData.image_urls.filter(url => url.trim() !== ''),
    }
    try {
      await onSave(cleanData)
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

      {/* ← DIUBAH: Multi-image uploader */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Gambar Ilustrasi
            <span className="ml-1.5 text-xs text-gray-400 font-normal">({formData.image_urls.filter(u => u).length} gambar)</span>
          </label>
          <button
            type="button"
            onClick={addImage}
            className="text-xs flex items-center gap-1 text-[#E36464] font-medium hover:underline"
          >
            <PlusIcon className="w-3.5 h-3.5" /> Tambah Gambar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formData.image_urls.map((url, idx) => (
            <div key={idx} className="relative group">
              <ImageUploader
                currentUrl={url}
                onUpload={(newUrl) => handleImageUpdate(idx, newUrl)}
                folder="pricing"
                inputId={`pricing-image-${idx}`} // ← id unik per slot
              />
              {/* Tombol hapus slot — hanya muncul jika ada lebih dari 1 slot */}
              {formData.image_urls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                  title="Hapus slot gambar ini"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              )}
              <p className="text-xs text-gray-400 mt-1 text-center">Gambar {idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prices List — tidak berubah */}
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