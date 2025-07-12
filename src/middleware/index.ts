import { defineMiddleware } from 'astro:middleware'
import picomatch from 'picomatch'
import { createClient } from '@/lib/supabase/server'

const protectedRoutesPages = ['/admin/dashboard(|/)']
const proptectedAPIRoutes = ['/api/users*', '/api/admin*', '/api/songs/*', '/api/albums*', '/api/stats*']
const publicRoutes = [
  '/',
  '/api/auth/signin(|/)',
  '/api/auth/signup(|/)',
  '/api/auth/callback(|/)',
  '/api/auth/signout(|/)',
]

export const onRequest = defineMiddleware(async ({ url, cookies, redirect, request, locals }, next) => {
  const supabase = await createClient(request, cookies)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.log(error.name)
  }

  if (user && !error) {
    locals.user = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
      isAdmin: user.email === import.meta.env.EMAIL_ADMIN,
    }
  }

  if (!user) {
    if (picomatch.isMatch(url.pathname, proptectedAPIRoutes)) {
      return new Response(
        JSON.stringify({
          message: 'Lo siento, por favor inicia sesión para poder realizar esta acción',
          error: 'No autorizado',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  }

  if (picomatch.isMatch(url.pathname, publicRoutes)) {
    return next()
  }

  if (picomatch.isMatch(url.pathname, protectedRoutesPages)) {
    if (!locals.user?.isAdmin) {
      return redirect('/')
    }
  }

  return next()
})
