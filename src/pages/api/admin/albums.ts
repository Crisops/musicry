import { createClient } from '@/lib/supabase/server'
import type { TablesInsert } from '@/types/database.types'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const formData: TablesInsert<'albums'> = await request.json()

  const { error } = await supabase.from('albums').insert(formData)

  if (error) {
    return new Response(
      JSON.stringify({ status: 400, message: 'Error al crear el albúm' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  return new Response(JSON.stringify({ status: 200 }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
