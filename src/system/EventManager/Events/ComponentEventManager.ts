// Create the event manager
import EventManager from '../EventManager'
import { EventMiddleware } from '../../../shared/types/EventManager/EventManager'

type CreateComponentMap = {
  create: [data: string]
  delete: [data: string]
}

// Create the middleware.
const loggerMiddleware: EventMiddleware<CreateComponentMap> = (event, next) => {
  console.log('Event triggered:', event)
  next()
}

// Register middleware
const ComponentEventManager = new EventManager<CreateComponentMap>()
ComponentEventManager.use(loggerMiddleware)
export default ComponentEventManager
