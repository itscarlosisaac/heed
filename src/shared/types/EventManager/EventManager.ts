import { VoidMethod } from '../Generic'

export type Listener<T extends Array<unknown>> = (...args: T) => void

export type EventMiddleware<EventMap> = (
  event: { type: keyof EventMap; payload: EventMap[keyof EventMap] },
  next: VoidMethod
) => void
