import useAsync from '../lib/hooks/foundation/useAsync'

export const AsyncComponent = () => {
  const { loading, error, value } = useAsync(() => {
    return new Promise<string>((resolve, reject) => {
      const success = true
      setTimeout(() => {
        success ? resolve('Hi') : reject('Error')
      }, 2000)
    })
  })
  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error as any}</div>
      <div>{value}</div>
    </div>
  )
}
