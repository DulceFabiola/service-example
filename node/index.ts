import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import {
  getFortuneCookie,
  createFortuneCookie,
  deleteFortuneCookie,
} from './handlers/fortune'
import { bodyParser } from './middlewares/body'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients,
  routes: {
    status: method({
      GET: [validate, status],
    }),
    fortune: method({
      GET: getFortuneCookie,
      POST: [bodyParser, createFortuneCookie],
    }),
    fortuneById: method({
      DELETE: deleteFortuneCookie,
    }),
  },
})
