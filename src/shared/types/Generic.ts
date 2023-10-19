export type GenericFunction = GenericFunctionConstructor<unknown>

type GenericFunctionConstructor<T> = (...args: unknown[]) => T

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>
