export type AuthTokens = {
  accessToken: string
  refreshToken?: string
  tokenType?: string
  expiresAt?: number
}

export interface AuthService {
  getSession(): Promise<{ userId: string } | null>
  signIn(email: string, password: string): Promise<AuthTokens>
  signUp(email: string, password: string): Promise<AuthTokens | null>
  exchangeCodeForSession(code: string): Promise<AuthTokens>
  signOut(): Promise<void>
  signInWithGoogle(redirectTo?: string, state?: string): Promise<{ url: string }>
  verifyAccessToken(token: string): Promise<{ userId: string } | null>
}

export type UserId = string

export interface UserRepository {
  getById(id: UserId): Promise<{ id: UserId; email: string } | null>
  getByEmail(email: string): Promise<{ id: UserId; email: string } | null>
  create(input: { email: string }): Promise<{ id: UserId; email: string }>
  update(user: { id: UserId; email: string }): Promise<{ id: UserId; email: string }>
}
