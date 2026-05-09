'use client'

import { useState, useEffect } from 'react'
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline'

type User = {
  id: string
  email: string
  display_name: string
  role: 'owner' | 'admin'
  created_at: string
  last_sign_in_at: string | null
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'owner'>('admin')
  const [inviting, setInviting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memuat users')
      }
      
      setUsers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setInviting(true)
    setError(null)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'Gagal mengundang user')
      
      setInviteEmail('')
      fetchUsers()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setInviting(false)
    }
  }

  const handleRoleChange = async (id: string, newRole: 'admin' | 'owner') => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: newRole }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      fetchUsers()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus user ini? Mereka tidak akan bisa login lagi.')) return

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      setUsers(users.filter(u => u.id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return <div className="p-8">Memuat data...</div>

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlusIcon className="w-5 h-5 text-[#E36464]" />
          Undang User Baru
        </h2>
        <form onSubmit={handleInvite} className="flex flex-wrap md:flex-nowrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464]"
              required
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as 'admin' | 'owner')}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-800 outline-none focus:border-[#E36464] focus:ring-1 focus:ring-[#E36464] bg-white"
            >
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={inviting}
            className="bg-[#E36464] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d45555] transition disabled:opacity-70 w-full md:w-auto"
          >
            {inviting ? 'Mengundang...' : 'Kirim Undangan'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Login Terakhir</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{user.display_name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'owner')}
                      className={`text-xs font-semibold px-2 py-1 rounded outline-none cursor-pointer ${
                        user.role === 'owner' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <option value="owner">OWNER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {user.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleDateString('id-ID') 
                      : 'Belum pernah'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"
                      title="Hapus User"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
