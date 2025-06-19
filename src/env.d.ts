interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string
  readonly PUBLIC_SUPABASE_ANON_KEY: string
  readonly SITE_URL: string
  readonly EMAIL_ADMIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

type User = {
  id: string
  full_name?: string
  email?: string
  avatar_url?: string
  isAdmin: boolean
} | null

declare namespace App {
  interface Locals {
    user: User
  }
}
