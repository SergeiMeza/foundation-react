/**
 * title: Basic usage
 * desc: Supported Key and keyCode in keyboard events, pressing ArrowUp or ArrowDown to show effect.
 */

import { useState } from 'react'
import useKeyPress from '../lib/hooks/ui/useKeyPress'

export default () => {
  const [counter, setCounter] = useState(0)

  useKeyPress('ArrowUp', () => {
    setCounter((s) => s + 1)
  })

  // keyCode value for ArrowDown
  useKeyPress(40, () => {
    setCounter((s) => s - 1)
  })

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter: <span style={{ color: '#f00' }}>{counter}</span>
      </div>
    </div>
  )
}
