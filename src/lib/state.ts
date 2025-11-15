// src/util/state.ts
import crypto from 'crypto'

// Petit stockage mémoire temporaire (Map = simple et suffisant pour un back Netlify)
const stateStore = new Map<string, { returnTo: string; createdAt: number }>()

// Génère un state unique + stocke la redirection (return_to)
export function makeState(returnTo: string): string {
  const state = crypto.randomUUID()
  stateStore.set(state, { returnTo, createdAt: Date.now() })
  return state
}

// Vérifie et consomme le state (usage unique + TTL 5 min)
export function consumeState(state: string):
  | { returnTo: string }
  | null {
  const entry = stateStore.get(state)
  if (!entry) return null

  // Durée de vie maximale : 5 minutes
  if (Date.now() - entry.createdAt > 5 * 60_000) {
    stateStore.delete(state)
    return null
  }

  // On le supprime pour éviter une réutilisation (replay attack)
  stateStore.delete(state)
  return { returnTo: entry.returnTo }
}
