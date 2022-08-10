import { useCallback, useEffect, useState } from 'react'

/**
 * @description Convenient hook for managing an async operation in react.
 * @param asyncFunction The async function to call.
 * @param dependencies An array of dependencies to use for memoization.
 */
const useAsync = <V>(
  asyncFunction: () => Promise<V>,
  dependencies: any[] = [],
) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()
  const [value, setValue] = useState<V>()

  const asyncFunctionMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)

    asyncFunction()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  useEffect(() => {
    asyncFunctionMemoized()
  }, [asyncFunctionMemoized])

  return { loading, error, value, setError, setValue }
}

export default useAsync
