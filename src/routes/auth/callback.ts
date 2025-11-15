import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { makeContainer } from '@/shared/container'

export const Route = createFileRoute('/auth/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const code = url.searchParams.get('code') || ''
        const returnToParam = url.searchParams.get('returnTo') || ''

        if (!code) {
          return json({ ok: false, message: 'Paramètre code manquant' }, { status: 400 })
        }

        const responseHeaders = new Headers()
        const container = makeContainer({ request, headers: responseHeaders })
        try {
          const tokens = await container.authService.exchangeCodeForSession(code)
          console.log(tokens);
          const redirectTo = returnToParam || '/'
          let target: URL
          try {
            target = new URL(redirectTo)
          } catch {
            // Si redirectTo n'est pas une URL absolue, fallback racine
            target = new URL('/', `${new URL(request.url).origin}`)
          }

          // Ajoute les tokens dans la query pour que l'app Expo les récupère
          target.searchParams.set('access_token', tokens.accessToken)
          if (tokens.refreshToken) target.searchParams.set('refresh_token', tokens.refreshToken)
          if (tokens.tokenType) target.searchParams.set('token_type', tokens.tokenType)
          if (typeof tokens.expiresAt === 'number') target.searchParams.set('expires_at', String(tokens.expiresAt))

          return new Response(null, {
            status: 302,
            headers: { Location: target.toString(), ...Object.fromEntries(responseHeaders.entries()) },
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Échec de la création de session'
          return json({ ok: false, message }, { status: 401 })
        }
      },
    },
  },
})
