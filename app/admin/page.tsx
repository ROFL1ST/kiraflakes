import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  UserCircleIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

interface StatCardProps {
  label: string
  value: number | string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function StatCard({ label, value, href, icon: Icon, color }: StatCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </Link>
  )
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: pricingCount },
    { count: showcaseCount },
    { count: rulesCount },
    { count: tncCount },
    { data: hero },
  ] = await Promise.all([
    supabase.from('pricing_cards').select('*', { count: 'exact', head: true }),
    supabase.from('showcase_images').select('*', { count: 'exact', head: true }),
    supabase.from('rules').select('*', { count: 'exact', head: true }),
    supabase.from('tnc_items').select('*', { count: 'exact', head: true }),
    supabase.from('hero_content').select('display_name, updated_at').single(),
  ])

  const lastUpdated = hero?.updated_at
    ? new Date(hero.updated_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Selamat datang kembali! Kelola konten landing page-mu di sini.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Pricing Cards"
          value={pricingCount ?? 0}
          href="/admin/pricing"
          icon={CurrencyDollarIcon}
          color="bg-[#E36464]"
        />
        <StatCard
          label="Showcase Images"
          value={showcaseCount ?? 0}
          href="/admin/showcase"
          icon={PhotoIcon}
          color="bg-pink-400"
        />
        <StatCard
          label="Rules"
          value={rulesCount ?? 0}
          href="/admin/rules"
          icon={ClipboardDocumentListIcon}
          color="bg-indigo-400"
        />
        <StatCard
          label="TnC Sections"
          value={tncCount ?? 0}
          href="/admin/tnc"
          icon={DocumentTextIcon}
          color="bg-emerald-400"
        />
        <StatCard
          label="Hero & Profil"
          value="Edit"
          href="/admin/hero"
          icon={UserCircleIcon}
          color="bg-amber-400"
        />
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Info Konten</h2>
        <dl className="space-y-2">
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Hero terakhir diupdate</dt>
            <dd className="font-medium text-gray-700">{lastUpdated}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Nama tampil (Hero)</dt>
            <dd className="font-medium text-gray-700">{hero?.display_name ?? '—'}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
