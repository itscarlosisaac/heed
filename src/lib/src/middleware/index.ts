import DebugMiddleware from './DebugMiddleware/DebugMiddleware'

export * from './Base/withMiddleware'
import MiddlewareManager from './Base/MiddlewareManager'

export const middlewareManager = new MiddlewareManager()

middlewareManager.use(DebugMiddleware)
