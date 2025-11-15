export const runtime = "nodejs";

import type { PaymentProvider } from "@/domain/billing/ports";
import type { Plan, Subscription } from "@/domain/billing/entities";

export class StripePaymentProvider implements PaymentProvider {
  async createCheckoutSession(
    _userId: string,
    _planId: string
  ): Promise<{ url: string }> {
    throw new Error("Not implemented");
  }

  async getPlans(): Promise<Plan[]> {
    // Mocked plans for initial integration
    return [
      {
        id: 'basic',
        name: 'Basic',
        priceCents: 990,
        interval: 'month',
        features: ['Programme débutant', 'Email support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        priceCents: 1990,
        interval: 'month',
        features: ['Programme avancé', 'Suivi hebdomadaire', 'Priorité support'],
      },
      {
        id: 'elite',
        name: 'Elite',
        priceCents: 4990,
        interval: 'month',
        features: ['Coaching 1:1', 'Nutrition personnalisée', 'Support prioritaire'],
      },
    ];
  }

  async getSubscription(_userId: string): Promise<Subscription | null> {
    return null;
  }
}
