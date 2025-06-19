import { defineMiddleware } from 'astro:middleware'
import picomatch from 'picomatch'
import { createClient } from '@/lib/supabase/server'

const protectedRoutesPages = ['/admin/dashboard(|/)']
const proptectedAPIRoutes = [
  '/api/users(|/)',
  '/api/auth(|/)',
  '/api/admin(|/)',
  '/api/songs(|/)',
  '/api/albums(|/)',
  '/api/stats(|/)',
]
const publicRoutes = ['/', '/api/auth/(signin|signup|callback)']

export const onRequest = defineMiddleware(
  async ({ url, cookies, redirect, request, locals }, next) => {
    const supabase = await createClient(request, cookies)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      locals.user = {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        isAdmin: user.email === import.meta.env.EMAIL_ADMIN,
      }
    }

    if (picomatch.isMatch(url.pathname, publicRoutes)) {
      return next()
    }

    if (!user) {
      return redirect('/')
    }

    if (picomatch.isMatch(url.pathname, protectedRoutesPages)) {
      if (locals.user?.email !== import.meta.env.EMAIL_ADMIN) {
        return redirect('/')
      }
    }

    if (picomatch.isMatch(url.pathname, proptectedAPIRoutes)) {
      const supabase = await createClient(request, cookies)
      const { error } = await supabase.auth.getSession()
      if (error) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        })
      }
    }
    return next()
  },
)
