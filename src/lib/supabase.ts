import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const parts = [`${name}=${encodeURIComponent(value)}`]
  const maxAge = (options as any).maxAge as number | undefined
  if (typeof maxAge === 'number') parts.push(`Max-Age=${Math.floor(maxAge)}`)
  parts.push(`Path=${options.path ?? '/'}`)
  if (options.domain) parts.push(`Domain=${options.domain}`)
  // Par défaut on protège les cookies si non spécifié
  const httpOnly = (options as any).httpOnly
  const secure = (options as any).secure
  if (httpOnly !== false) parts.push('HttpOnly')
  if (secure !== false) parts.push('Secure')
  const sameSite = (options as any).sameSite ?? 'Lax'
  parts.push(`SameSite=${sameSite}`)
  return parts.join('; ')
}

function parseCookiePairs(header: string | null): { name: string; value: string }[] {
  if (!header) return []
  const pairs: { name: string; value: string }[] = []
  const items = header.split(';')
  for (const item of items) {
    const [rawName, ...rest] = item.trim().split('=')
    if (!rawName) continue
    const name = rawName
    const value = decodeURIComponent(rest.join('='))
    pairs.push({ name, value })
  }
  return pairs
}

const getEnv = () => {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error('Variables d’environnement Supabase manquantes (SUPABASE_URL / SUPABASE_ANON_KEY)')
  }
  return { url, anonKey }
}

// Crée un client SSR avec gestion des cookies (PKCE/state) via les Headers fournis
export function getSupabaseServerClient(ctx?: { request: Request; headers: Headers }): SupabaseClient {
  const { url, anonKey } = getEnv()
  if (!ctx) {
    return createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  const resHeaders = ctx.headers

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => parseCookiePairs(ctx.request.headers.get('cookie')),
      setAll: (cookies) => {
        for (const c of cookies) {
          resHeaders.append('Set-Cookie', serializeCookie(c.name, c.value, c.options))
        }
      },
    },
    auth: { flowType: 'pkce' },
  }) as unknown as SupabaseClient
}
