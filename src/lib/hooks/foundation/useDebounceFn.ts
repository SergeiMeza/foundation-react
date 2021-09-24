import { useRef } from 'react'

import debounce from 'lodash.debounce'
import { DebounceOptions } from './DebounceOptions'
import useCreation from './useCreation'
import useUnmount from './useUnmount'

type Fn = (...args: any) => any

export default function useDebounceFn<T extends Fn>(
  fn: T,
  options?: DebounceOptions,
) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const wait = options?.wait ?? 1000

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args)
        }) as T,
        wait,
        options,
      ),
    [],
  )

  useUnmount(() => {
    debounced.cancel()
  })

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}
