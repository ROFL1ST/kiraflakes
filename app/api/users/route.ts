import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { inviteUserSchema, updateUserRoleSchema } from '@/lib/validations'

// Check if user is owner
async function isOwner() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  return data?.role === 'owner'
}

export async function GET() {
  if (!(await isOwner())) {
    return NextResponse.json({ error: 'Unauthorized, Owner only' }, { status: 403 })
  }

  const supabaseService = await createServiceClient()
  
  // Ambil data users dari auth.users
  const { data: { users }, error: authError } = await supabaseService.auth.admin.listUsers()
  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 })

  // Ambil profiles
  const { data: profiles, error: profileError } = await supabaseService
    .from('profiles')
    .select('*')

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 })

  // Gabungkan
  const combined = users.map((u) => {
    const p = profiles.find((p) => p.id === u.id)
    return {
      id: u.id,
      email: u.email,
      last_sign_in_at: u.last_sign_in_at,
      created_at: u.created_at,
      role: p?.role || 'admin',
      display_name: p?.display_name || u.email,
    }
  })

  return NextResponse.json(combined)
}

export async function POST(request: Request) {
  if (!(await isOwner())) {
    return NextResponse.json({ error: 'Unauthorized, Owner only' }, { status: 403 })
  }

  try {
    const supabaseService = await createServiceClient()
    const body = await request.json()
    const { email, role, display_name } = inviteUserSchema.parse(body)

    // Invite user via email
    const { data: authData, error: authError } = await supabaseService.auth.admin.inviteUserByEmail(email)
    
    if (authError) throw authError

    if (authData.user) {
      // Upsert profile
      await supabaseService.from('profiles').upsert({
        id: authData.user.id,
        role,
        display_name: display_name || email,
      })
    }

    return NextResponse.json({ success: true, user: authData.user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  if (!(await isOwner())) {
    return NextResponse.json({ error: 'Unauthorized, Owner only' }, { status: 403 })
  }

  try {
    const supabaseService = await createServiceClient()
    const body = await request.json()
    const { id, role } = updateUserRoleSchema.parse(body)

    // Update profile role
    const { data, error } = await supabaseService
      .from('profiles')
      .update({ role })
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
  if (!(await isOwner())) {
    return NextResponse.json({ error: 'Unauthorized, Owner only' }, { status: 403 })
  }

  try {
    const supabaseService = await createServiceClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    // Delete user auth (will cascade delete profile)
    const { error } = await supabaseService.auth.admin.deleteUser(id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 400 })
  }
}
