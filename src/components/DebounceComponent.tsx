import { useState } from 'react'
import useDebounce from '../lib/hooks/useDebounce'

export const DebounceComponent = () => {
  const [count, setCount] = useState(10)
  useDebounce(() => alert(count), 1000, [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}
