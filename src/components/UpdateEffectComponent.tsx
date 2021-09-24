import { useState } from 'react'
import useUpdateEffect from '../lib/hooks/foundation/useUpdateEffect'

export const UpdateEffectComponent = () => {
  const [count, setCount] = useState(10)
  useUpdateEffect(() => alert(count), [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}
