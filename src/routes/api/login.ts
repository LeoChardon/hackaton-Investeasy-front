import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { makeContainer } from '@/shared/container'

type LoginInput = {
  email: string
  password: string
}

export const Route = createFileRoute('/api/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ ok: false, message: 'Requête JSON invalide' }, { status: 400 })
        }

        const { email, password } = (body ?? {}) as Partial<LoginInput>
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
          const tokens = await container.authService.signIn(normalizedEmail, password)
          return json({ ok: true, tokens })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Échec de la connexion'
          return json({ ok: false, message }, { status: 401 })
        }
      },
    },
  },
})
