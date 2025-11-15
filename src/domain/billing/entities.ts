export type PlanId = string

export type Plan = {
  id: PlanId
  name: string
  priceCents: number
  interval: 'month' | 'year'
  features: string[]
}

export type Subscription = {
  userId: string
  planId: PlanId
  status: 'active' | 'canceled' | 'incomplete' | 'trialing'
  currentPeriodEnd: Date
}

