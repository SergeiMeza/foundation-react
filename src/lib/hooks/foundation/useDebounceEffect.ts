import { DependencyList, EffectCallback, useEffect, useState } from 'react'
import { DebounceOptions } from './DebounceOptions'
import useDebounceFn from './useDebounceFn'
import useUnmount from './useUnmount'
import useUpdateEffect from './useUpdateEffect'

/**
 * Debounce your useEffect.
 */
export default function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({})

  const { run, cancel } = useDebounceFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    return run()
  }, deps)

  useUnmount(cancel)

  useUpdateEffect(effect, [flag])
}
