import { useState } from 'react'
import useDebounceFn from '../lib/hooks/foundation/useDebounceFn'

export default () => {
  const [value, setValue] = useState(0)

  const { run } = useDebounceFn(
    () => {
      setValue(value + 1)
    },
    {
      wait: 500,
    },
  )

  return (
    <div>
      <p>
        Frequent calls run, but the function is executed only after all the
        clicks have completed 500ms.
      </p>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type='button' onClick={run}>
        Click fast!
      </button>
    </div>
  )
}
