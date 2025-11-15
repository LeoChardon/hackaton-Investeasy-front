// src/routes/api/test.ts
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start' // helper pour Content-Type + stringify

export const Route = createFileRoute('/api/test')({
  server: {
    handlers: {
      GET: async () => {
        return json({
          message: 'Hello from TanStack Start API 👋',
          time: new Date().toISOString(),
        })
      },
    },
  },
})
