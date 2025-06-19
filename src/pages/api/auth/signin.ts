import type { APIRoute } from 'astro'
import { createClient } from '@/lib/supabase/server'
import type { Provider } from '@supabase/supabase-js'

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData()
  const provider = formData.get('provider')?.toString()
  const URL_SITE = import.meta.env.SITE_URL ?? 'http://localhost:4321'

  const validProviders = ['google']

  if (provider && validProviders.includes(provider)) {
    const supabase = await createClient(request, cookies)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${URL_SITE}/api/auth/callback`,
      },
    })

    if (error) {
      return new Response(error.message, { status: 500 })
    }

    return redirect(data.url)
  }

  return new Response('Proveedor no válido', { status: 400 })
}
