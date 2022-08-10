import { useState } from 'react'
import useTimeout from '../lib/hooks/foundation/useTimeout'

export const TimeoutComponent = () => {
  const [count, setCount] = useState(10)
  useTimeout(() => setCount(0), 1000)

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}
