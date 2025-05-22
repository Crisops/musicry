interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
  readonly SITE_URL: string
  readonly EMAIL_ADMIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
