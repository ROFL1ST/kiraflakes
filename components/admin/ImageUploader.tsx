'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { PhotoIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import imageCompression from 'browser-image-compression'

interface ImageUploaderProps {
  /** URL gambar saat ini (existing) */
  currentUrl?: string
  /** Dipanggil setelah upload selesai dengan URL publik */
  onUpload: (url: string) => void
  /** Folder di Supabase Storage (default: 'general') */
  folder?: string
  className?: string
}

export default function ImageUploader({
  currentUrl,
  onUpload,
  folder = 'general',
  className = '',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Kompresi gambar
      const options = {
        maxSizeMB: 2, // Kompres hingga max 2MB (masih bagus untuk desktop)
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      
      const compressedFile = await imageCompression(file, options)

      // Preview lokal setelah dikompresi
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(compressedFile)

      const formData = new FormData()
      formData.append('file', compressedFile, file.name)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? 'Upload gagal')

      onUpload(json.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal')
      setPreview(currentUrl ?? null)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const clearImage = () => {
    setPreview(null)
    onUpload('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="sr-only"
        id="image-upload-input"
      />

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow"
            >
              Ganti
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearImage}
              className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow flex items-center gap-1"
            >
              <XMarkIcon className="w-3 h-3" />
              Hapus
            </motion.button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#E36464] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="image-upload-input"
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            dragOver
              ? 'border-[#E36464] bg-[#E36464]/5'
              : 'border-gray-200 bg-gray-50 hover:border-[#E36464]/50 hover:bg-gray-100'
          }`}
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-[#E36464] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <PhotoIcon className="w-10 h-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                <span className="text-[#E36464] font-medium">Klik untuk upload</span> atau drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (otomatis di-compress)</p>
            </>
          )}
        </label>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
