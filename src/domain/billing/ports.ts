import type { Plan, Subscription } from './entities'

export interface PaymentProvider {
  createCheckoutSession(userId: string, planId: string): Promise<{ url: string }>
  getPlans(): Promise<Plan[]>
  getSubscription(userId: string): Promise<Subscription | null>
}

