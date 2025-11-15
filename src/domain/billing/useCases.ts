import type { PaymentProvider } from './ports'
import type { Plan } from './entities'
import { err, ok, type Result } from '@/shared/result'

export function makeGetPlansUseCase(deps: { paymentProvider: PaymentProvider }) {
  return async function getPlans(): Promise<Result<Error, Plan[]>> {
    try {
      const plans = await deps.paymentProvider.getPlans()
      return ok(plans)
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Unknown error')
      return err(error)
    }
  }
}

