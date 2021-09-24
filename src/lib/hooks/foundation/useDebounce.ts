import { useEffect, useState } from 'react'
import { DebounceOptions } from './DebounceOptions'
import useDebounceFn from './useDebounceFn'

/**
 * A hook that handle the debounce value.
 */
export default function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value)

  const { run } = useDebounceFn(() => {
    setDebounced(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return debounced
}
