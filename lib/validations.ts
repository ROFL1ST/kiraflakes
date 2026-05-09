import { z } from 'zod'

// ── Hero ────────────────────────────────────────────────
export const heroSchema = z.object({
  display_name: z.string().min(1, 'Display name wajib diisi'),
  bio: z.string().min(1, 'Bio wajib diisi'),
  avatar_url: z.string().url('URL tidak valid').optional().or(z.literal('')),
  wa_link: z.string().url('URL tidak valid').optional().or(z.literal('')),
  discord_link: z.string().url('URL tidak valid').optional().or(z.literal('')),
  twitter_link: z.string().url('URL tidak valid').optional().or(z.literal('')),
})

export type HeroFormData = z.infer<typeof heroSchema>

// ── Pricing ─────────────────────────────────────────────
const priceItemSchema = z.object({
  label: z.string().min(1),
  price: z.string().min(1),
})

export const pricingCardSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi'),
  subtitle: z.string().min(1, 'Subtitle wajib diisi'),
  description: z.string().optional(),
  image_urls: z.array(z.string()).default([]), // ← DIUBAH: dari image_url string ke image_urls array
  prices: z.array(priceItemSchema).min(1, 'Minimal 1 harga'),
  note: z.string().optional(),
  popular: z.boolean().default(false),
  button_color: z.string().optional(),
  sort_order: z.number().int().default(0),
})

export type PricingCardFormData = z.infer<typeof pricingCardSchema>

// ── Showcase ─────────────────────────────────────────────
export const showcaseImageSchema = z.object({
  image_url: z.string().url('URL tidak valid'),
  alt_text: z.string().default('showcase artwork'),
  sort_order: z.number().int().default(0),
})

export type ShowcaseImageFormData = z.infer<typeof showcaseImageSchema>

// ── Rules ────────────────────────────────────────────────
export const ruleSchema = z.object({
  type: z.enum(['ok', 'no']),
  text: z.string().min(1, 'Teks rule wajib diisi'),
  sort_order: z.number().int().default(0),
})

export type RuleFormData = z.infer<typeof ruleSchema>

// ── TnC ──────────────────────────────────────────────────
export const tncItemSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi'),
  content: z.string().min(1, 'Konten wajib diisi'),
  sort_order: z.number().int().default(0),
})

export type TncItemFormData = z.infer<typeof tncItemSchema>

// ── Users ────────────────────────────────────────────────
export const inviteUserSchema = z.object({
  email: z.string().email('Email tidak valid'),
  role: z.enum(['owner', 'admin']).default('admin'),
  display_name: z.string().optional(),
})

export type InviteUserFormData = z.infer<typeof inviteUserSchema>

export const updateUserRoleSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['owner', 'admin']),
})

export type UpdateUserRoleFormData = z.infer<typeof updateUserRoleSchema>