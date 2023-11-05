import { EventMiddleware, Listener } from '../../shared/types/EventManager/EventManager'
import { VoidMethod } from '../../shared/types'

class EventManager<EventMap extends Record<string, Array<unknown>>> {
  private listeners: {
    [K in keyof EventMap]?: Set<Listener<EventMap[K]>>
  } = {}

  private middleware: Array<EventMiddleware<EventMap>> = []

  public on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>): void {
    const listeners = this.listeners[eventName] ?? new Set()
    listeners.add(listener)
    this.listeners[eventName] = listeners
  }

  public off<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>): void {
    const listeners = this.listeners[eventName]
    if (listeners) {
      listeners.delete(listener)
      // If there are no more listeners, you might want to delete the key from the object
      if (listeners.size === 0) {
        delete this.listeners[eventName]
      }
    }
  }

  public use(middleware: EventMiddleware<EventMap>): void {
    this.middleware.push(middleware)
  }

  public emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]): void {
    if (!this.listeners[eventName]) return

    let middlewareIndex = 0

    const next: VoidMethod = () => {
      if (middlewareIndex < this.middleware.length) {
        const middleware = this.middleware[middlewareIndex]
        middlewareIndex += 1
        middleware(
          {
            type: eventName,
            payload: args
          },
          next
        )
      } else {
        const listeners = this.listeners[eventName] ?? new Set()
        for (const listener of listeners) {
          listener(...args)
        }
      }
    }
    next()
  }
}

/* Usage

type Message = { level: string, message: string }
type LogEventMap = { log: [ message: Message ] }

// Create the middleware.
const loggerMiddleware: EventMiddleware<LogEventMap> = (event, next) => {
  console.log('Event triggered:', event);
  next();
};

// Create the event manager
const eventManager = new EventManager<LogEventMap>();

// Register middleware
eventManager.use(loggerMiddleware);

// Register event handler
eventManager.on('log', (message) => { console.log("Message from the listener", message) });

eventManager.emit('log', { message: "hello world", level: "alert "})
 */
export default EventManager
