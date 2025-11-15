import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { makeContainer } from '@/shared/container'

type RegisterInput = {
  email: string
  password: string
}

export const Route = createFileRoute('/api/register')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ ok: false, message: 'Requête JSON invalide' }, { status: 400 })
        }

        const { email, password } = (body ?? {}) as Partial<RegisterInput>
        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
          return json({ ok: false, message: 'Email et mot de passe sont requis' }, { status: 400 })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
        if (!isValidEmail) {
          return json({ ok: false, message: "Format d'email invalide" }, { status: 400 })
        }

        const container = makeContainer()
        try {
          const tokens = await container.authService.signUp(normalizedEmail, password)
          if (tokens) {
            return json({ ok: true, tokens })
          }
          return json({ ok: true, requiresConfirmation: true })
        } catch (err) {
          const message = err instanceof Error ? err.message : "Échec de l'inscription"
          return json({ ok: false, message }, { status: 400 })
        }
      },
    },
  },
})

