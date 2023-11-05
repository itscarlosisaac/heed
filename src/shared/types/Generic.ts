export type GenericFunction = GenericFunctionConstructor<unknown>

type GenericFunctionConstructor<T> = (...args: unknown[]) => T

export type VoidMethod = () => void

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>
