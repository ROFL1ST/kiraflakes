'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { createClient } from '@/lib/supabase/client'
import {
  HomeIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  role: 'owner' | 'admin'
  displayName: string
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: HomeIcon, exact: true },
  { href: '/admin/hero', label: 'Hero & Profil', icon: UserCircleIcon },
  { href: '/admin/pricing', label: 'Pricing', icon: CurrencyDollarIcon },
  { href: '/admin/showcase', label: 'Showcase', icon: PhotoIcon },
  { href: '/admin/rules', label: 'Rules', icon: ClipboardDocumentListIcon },
  { href: '/admin/tnc', label: 'Terms & Conditions', icon: DocumentTextIcon },
]

const ownerOnlyItems = [
  { href: '/admin/users', label: 'Users', icon: UsersIcon, exact: false },
]

export default function Sidebar({ role, displayName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const allItems = role === 'owner' ? [...navItems, ...ownerOnlyItems] : navItems

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-[#E36464] to-pink-400 bg-clip-text text-transparent">
          Kiraflakes
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {allItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#E36464]/10 text-[#E36464]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {item.label}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E36464] to-pink-400 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
