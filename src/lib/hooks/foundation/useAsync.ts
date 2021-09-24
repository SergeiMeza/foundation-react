import { useCallback, useEffect, useState } from 'react'

const useAsync = (callback: () => Promise<any>, dependencies: any[] = []) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
  const [value, setValue] = useState<any>()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}

export default useAsync
