export const runtime = 'nodejs'

import type { AuthService, AuthTokens } from '@/domain/users/ports'
import { getSupabaseServerClient } from '@/lib/supabase'

// Placeholder implementation adapted for TanStack Start (no Next.js APIs).
// Methods are intentionally left unimplemented to avoid accidental usage before wiring.
export class SupabaseAuthService implements AuthService {
  constructor(private readonly supabase = getSupabaseServerClient()) {}
  async getSession(): Promise<{ userId: string } | null> {
    throw new Error('SupabaseAuthService.getSession not implemented')
  }

  async signIn(email: string, password: string): Promise<AuthTokens> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    const session = data?.session
    if (!session) {
      throw new Error('Session introuvable après connexion')
    }

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      tokenType: session.token_type,
      expiresAt: session.expires_at,
    }
  }

  async signUp(email: string, password: string): Promise<AuthTokens | null> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      throw error
    }

    const session = data?.session
    if (!session) {
      return null
    }

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      tokenType: session.token_type,
      expiresAt: session.expires_at,
    }
  }

  async exchangeCodeForSession(code: string): Promise<AuthTokens> {
    const { data, error } = await this.supabase.auth.exchangeCodeForSession(code)
    if (error) {
      throw error
    }

    const session = data?.session
    if (!session) {
      throw new Error('Session manquante après échange de code')
    }

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      tokenType: session.token_type,
      expiresAt: session.expires_at,
    }
  }

  async signOut(): Promise<void> {
    throw new Error('SupabaseAuthService.signOut not implemented')
  }

  async signInWithGoogle(redirectTo?: string, _state?: string): Promise<{ url: string }> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    })

    if (error) {
      throw error
    }

    const url = data?.url
    if (!url) {
      throw new Error("URL de redirection OAuth introuvable")
    }

    return { url }
  }

  async verifyAccessToken(token: string): Promise<{ userId: string } | null> {
    const { data, error } = await this.supabase.auth.getUser(token)
    if (error || !data?.user?.id) return null
    return { userId: data.user.id }
  }
}
