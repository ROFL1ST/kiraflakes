import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { tncItemSchema } from '@/lib/validations'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tnc_items')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const validatedData = tncItemSchema.parse(body)

    const { data, error } = await supabase
      .from('tnc_items')
      .insert(validatedData)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const validatedData = tncItemSchema.parse(updateData)

    const { data, error } = await supabase
      .from('tnc_items')
      .update({ ...validatedData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const { error } = await supabase.from('tnc_items').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}
