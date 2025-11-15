import { StripePaymentProvider } from '@/adapters/billing-stripe/StripePaymentProvider'
import { SupabaseAuthService } from '@/adapters/auth-supabase/SupabaseAuthService'
import { getSupabaseServerClient } from '@/lib/supabase'

export interface Container {
  paymentProvider: StripePaymentProvider
  authService: SupabaseAuthService
}

export function makeContainer(ctx?: { request: Request; headers: Headers }): Container {
  const supabase = getSupabaseServerClient(ctx as any)
  return {
    paymentProvider: new StripePaymentProvider(),
    authService: new SupabaseAuthService(supabase as any),
  }
}
