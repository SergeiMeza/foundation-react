import { useState } from 'react'
import useDebounce from '../lib/hooks/foundation/useDebounce'

export default () => {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounce(value, { wait: 500 })

  return (
    <div>
      <p>DebouncedValue will change after the input ends 500ms.</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Typed value'
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  )
}
