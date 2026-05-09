import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Ambil profile untuk role dan display name
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  const role = (profile?.role ?? 'admin') as 'owner' | 'admin'
  const displayName = profile?.display_name ?? user.email ?? 'Admin'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} displayName={displayName} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
