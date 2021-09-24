import { useRef } from 'react'

export type noop = (...args: any[]) => any

function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const persistFnRef = useRef<any>()
  if (!persistFnRef.current) {
    persistFnRef.current = (...args: any) => fnRef.current(args)
  }

  return persistFnRef.current!
}

export default usePersistFn
