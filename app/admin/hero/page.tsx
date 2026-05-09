'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import ImageUploader from '@/components/admin/ImageUploader'
import { HeroFormData, heroSchema } from '@/lib/validations'

export default function HeroAdminPage() {
  const [formData, setFormData] = useState<HeroFormData>({
    display_name: '',
    bio: '',
    avatar_url: '',
    wa_link: '',
    discord_link: '',
    twitter_link: '',
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setFormData({
            display_name: data.display_name || '',
            bio: data.bio || '',
            avatar_url: data.avatar_url || '',
            wa_link: data.wa_link || '',
            discord_link: data.discord_link || '',
            twitter_link: data.twitter_link || '',
          })
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      // Validasi Zod client-side
      const validatedData = heroSchema.parse(formData)

      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })

      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan')

      setMessage({ type: 'success', text: 'Perubahan berhasil disimpan!' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.errors ? err.errors[0].message : err.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8">Memuat data...</div>
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hero & Profil</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Avatar / Foto Profil</label>
          <div className="w-48">
            <ImageUploader
              currentUrl={formData.avatar_url}
              folder="avatars"
              onUpload={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tampil</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
              required
            />
          </div>

          {/* Bio / Tagline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Tagline</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
              required
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Social Links</h3>
          
          {/* WA Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Link (Opsional)</label>
            <input
              type="url"
              name="wa_link"
              value={formData.wa_link}
              onChange={handleChange}
              placeholder="https://wa.me/..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            />
          </div>

          {/* Discord Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discord Link (Opsional)</label>
            <input
              type="url"
              name="discord_link"
              value={formData.discord_link}
              onChange={handleChange}
              placeholder="https://discord.com/users/..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            />
          </div>

          {/* Twitter Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X Link (Opsional)</label>
            <input
              type="url"
              name="twitter_link"
              value={formData.twitter_link}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={saving}
            type="submit"
            className="bg-[#E36464] text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-[#d45555] disabled:opacity-70"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </motion.button>
        </div>

      </form>
    </div>
  )
}
