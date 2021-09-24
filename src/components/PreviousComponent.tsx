import { useState } from 'react'
import usePrevious from '../lib/hooks/foundation/usePrevious'

export const PreviousComponent = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Meza')
  const previousCount = usePrevious(count)

  return (
    <div>
      <div>
        {count} - {previousCount}
      </div>
      <div>{name}</div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setName('John')}>Change Name</button>
    </div>
  )
}
