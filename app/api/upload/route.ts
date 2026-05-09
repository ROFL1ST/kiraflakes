import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Cek auth
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file' }, { status: 400 })
    }

    // Validasi file (minimal)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File harus berupa gambar' }, { status: 400 })
    }

    // Generate unique name
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${uuidv4()}.${ext}`

    // Upload to Supabase Storage (bucket: kiraflakes-media)
    const { data, error } = await supabase.storage
      .from('kiraflakes-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('kiraflakes-media').getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('Upload handler error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
