/**
 * title: Use key aliases
 * desc: Support using key aliases. Please refer to the [document](#remarks) below.
 */

import { useState } from 'react'
import useKeyPress from '../lib/hooks/ui/useKeyPress'

export default () => {
  const [counter, setCounter] = useState(0)

  useKeyPress('left', () => {
    setCounter((s) => s - 1)
  })

  useKeyPress('right', () => {
    setCounter((s) => s + 1)
  })

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowLeft to decrease</div>
      <div>2. Press ArrowRight to increase</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  )
}
