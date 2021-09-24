/**
 * title: Listen keydown
 * desc: Press any key to preview.
 */

import { useState } from 'react'
import useEventListener from '../lib/hooks/ui/useEventListener'

export default () => {
  const [value, setValue] = useState('')

  const keyDownHandler = (ev: KeyboardEvent) => {
    setValue(ev.code)
  }
  useEventListener('keydown', keyDownHandler)

  return <p>Your press key is {value}</p>
}
