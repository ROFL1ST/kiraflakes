import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { heroSchema } from '@/lib/validations'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hero_content').select('*').single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    // Cek auth
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = heroSchema.parse(body)

    // Update table. Because there's only one row, we can just update all rows
    // or assume we have the ID. Let's just update the single existing row by not using ID, or by ID if we get it.
    // Actually, we can just do a broad update since we only have 1 row, 
    // or better, fetch the ID first and update by ID.
    const { data: existingData } = await supabase.from('hero_content').select('id').single()

    if (existingData?.id) {
      const { data, error } = await supabase
        .from('hero_content')
        .update({
          ...validatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingData.id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    } else {
      // If no data exists, insert
      const { data, error } = await supabase
        .from('hero_content')
        .insert({
          ...validatedData,
        })
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}
