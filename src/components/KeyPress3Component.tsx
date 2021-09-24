/**
 * title: Compound mode
 * desc: |
 *  Support for receiving a set of input keys or passing parameters as a combination of keys.
 *
 *  Attention：Key combination only supports the use of modified key + key alias + key in keyboard events, [See detail](#remarks)
 */

import { useState } from 'react'
import useKeyPress from '../lib/hooks/ui/useKeyPress'

export default () => {
  const [num, setNum] = useState<string>()
  const [key, setKey] = useState<string>()
  const [state, setState] = useState<number>()
  const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  useKeyPress(filterKey, (event) => {
    setNum(event.key)
  })

  // a s d f, Backspace, 8
  useKeyPress([65, 83, 68, 70, 8, '8'], (event) => {
    setKey(event.key)
  })

  useKeyPress(['shift.c'], () => {
    setState(1)
  })

  useKeyPress(['meta'], () => {
    setState(2)
  })

  useKeyPress('ctrl.alt.c', () => {
    setState(3)
  })

  useKeyPress('ctrl.alt.space', () => {
    setState(4)
  })

  // Attention: event.key === '0'
  useKeyPress('ctrl.alt.0', () => {
    setState(5)
  })

  useKeyPress(['meta', 'k'], () => {
    setState(6)
  })

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Number key [0-9]: <span style={{ color: '#f00' }}>{num}</span>
      </div>
      <div>
        2. Press key [a, s, d, f, Backspace, 8]:{' '}
        <span style={{ color: '#f00' }}>{key}</span>
      </div>
      <div>state: {state}</div>
      <div>3. Modifier key [shift.c]: {state === 1 && <span>check</span>}</div>
      <div>4. Modifier key [meta]: {state === 2 && <span>check</span>}</div>
      <div>
        5. Modifier key [ctrl.alt.c]: {state === 3 && <span>check</span>}
      </div>
      <div>
        6. Modifier key [ctrl.alt.space]: {state === 4 && <span>check</span>}
      </div>
      <div>
        7. Modifier key [ctrl.alt.0]: {state === 5 && <span>check</span>}
      </div>
      <div>8. Modifier key [meta.k]: {state === 6 && <span>check</span>}</div>
    </div>
  )
}
