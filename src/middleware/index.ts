import { defineMiddleware } from 'astro:middleware'
import { supabase } from '@/lib/supabase'
import picomatch from 'picomatch'

const protectedRoutesPages = ['/dashboard(|/)']
const redirectRoutesPages = ['/signin(|/)', '/register(|/)']
const proptectedAPIRoutes = [
  '/api/users(|/)',
  '/api/auth(|/)',
  '/api/admin(|/)',
  '/api/songs(|/)',
  '/api/albums(|/)',
  '/api/stats(|/)',
]

export const onRequest = defineMiddleware(
  async ({ url, cookies, redirect }, next) => {
    if (picomatch.isMatch(url.pathname, protectedRoutesPages)) {
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')

      if (!accessToken || !refreshToken) {
        return redirect('/signin')
      }

      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
      })

      if (error) {
        cookies.delete('sb-access-token', { path: '/' })
        cookies.delete('sb-refresh-token', { path: '/' })
        return redirect('/signin')
      }

      cookies.set('sb-access-token', data?.session?.access_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      })

      cookies.set('sb-refresh-token', data?.session?.refresh_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      })
    }

    if (picomatch.isMatch(url.pathname, redirectRoutesPages)) {
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')

      if (accessToken && refreshToken) {
        return redirect('/dashboard')
      }
    }

    if (picomatch.isMatch(url.pathname, proptectedAPIRoutes)) {
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')

      // Check for tokens
      if (!accessToken || !refreshToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        })
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
      })

      if (error) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        })
      }
    }
    return next()
  },
)
