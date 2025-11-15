import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { makeContainer } from '@/shared/container'

export const Route = createFileRoute('/api/signInProvider')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const provider = url.searchParams.get('provider')
        const redirectUrlParam = url.searchParams.get('redirectUrl')

        if (!provider) {
          return json({ ok: false, message: 'Paramètre provider manquant' }, { status: 400 })
        }

        // Valide redirectUrl si fourni (peut être un deep link type exp:// ou myapp://)
        let returnTo: string | undefined
        if (typeof redirectUrlParam === 'string' && redirectUrlParam.trim().length > 0) {
          try {
            // Valide que c'est une URL absolue (schémas custom acceptés)
            // eslint-disable-next-line no-new
            new URL(redirectUrlParam)
            returnTo = redirectUrlParam
          } catch {
            return json({ ok: false, message: 'redirectUrl invalide' }, { status: 400 })
          }
        }

        const responseHeaders = new Headers()
        const container = makeContainer({ request, headers: responseHeaders })
        try {
          if (provider === 'Google') {
            const origin = url.origin
            const redirectTo = returnTo
              ? `${origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`
              : `${origin}/auth/callback`

            const { url: authUrl } = await container.authService.signInWithGoogle(redirectTo)
            return new Response(null, {
              status: 302,
              headers: {
                Location: authUrl,
                ...Object.fromEntries(responseHeaders.entries()),
              },
            })
          }

          return json({ ok: false, message: 'Provider non supporté' }, { status: 400 })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Échec de la génération de l’URL OAuth'
          return json({ ok: false, message }, { status: 500 })
        }
      },
    },
  },
})
