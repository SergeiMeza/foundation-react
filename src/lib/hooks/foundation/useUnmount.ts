import { useEffect } from 'react'
import { isFunction } from '../../utils'
import usePersistFn from './usePersistFn'

/**
 * A hook that executes a function at unmount.
 */
export default function useUnmount(fn: any) {
  const fnPersist = usePersistFn(fn)

  useEffect(
    () => () => {
      if (isFunction(fnPersist)) {
        fnPersist()
      }
    },
    [],
  )
}
