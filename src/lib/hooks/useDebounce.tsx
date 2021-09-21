import { useEffect } from 'react'
import useTimeout from './useTimeout'

const useDebounce = (callback, delay, dependendencies) => {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependendencies, reset])
  useEffect(clear, [])
}

export default useDebounce
