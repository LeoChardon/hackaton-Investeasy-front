import { makeContainer } from '@/shared/container'

export type AuthContext = {
  userId: string
}

function extractBearer(request: Request): string | null {
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  if (!auth) return null
  const [type, token] = auth.split(' ')
  if (!type || type.toLowerCase() !== 'bearer' || !token) return null
  return token.trim()
}

// Retourne le userId si le token est valide, sinon null (sans throw)
export async function verifyAuth(request: Request): Promise<AuthContext | null> {
  const accessToken = extractBearer(request)
  if (!accessToken) return null

  const container = makeContainer()
  const res = await container.authService.verifyAccessToken(accessToken)
  return res
}

// Version stricte: lève une erreur si non authentifié
export async function requireAuth(request: Request): Promise<AuthContext> {
  const ctx = await verifyAuth(request)
  if (!ctx) {
    const err = new Error('Non authentifié')
    ;(err as any).status = 401
    throw err
  }
  return ctx
}
