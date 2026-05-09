'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import ImageUploader from '@/components/admin/ImageUploader'
import { TrashIcon } from '@heroicons/react/24/outline'

type ShowcaseImage = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
}

export default function ShowcaseAdminPage() {
  const [images, setImages] = useState<ShowcaseImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/showcase')
      const data = await res.json()
      setImages(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (url: string) => {
    if (!url) return
    
    try {
      const res = await fetch('/api/showcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: url, sort_order: images.length }),
      })
      if (res.ok) {
        fetchImages()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus gambar ini?')) return

    try {
      const res = await fetch(`/api/showcase?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setImages(images.filter(img => img.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-8">Memuat data...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Showcase Gallery</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload Gambar Baru</h2>
        <ImageUploader 
          onUpload={handleUpload} 
          folder="showcase" 
          className="max-w-md"
        />
      </div>

      <h2 className="text-lg font-semibold mb-4 text-gray-700">Gallery Saat Ini ({images.length})</h2>
      
      {images.length === 0 ? (
        <div className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
          Belum ada gambar di showcase.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square"
            >
              <img 
                src={img.image_url} 
                alt={img.alt_text} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
