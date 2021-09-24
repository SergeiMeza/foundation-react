/**
 * title: Make sure only one instance is created
 * desc: You can click the "Rerender" button and trigger the update of this component. But the instance of Foo will keep unchanged.
 *
 */

import { useState } from 'react'
import useCreation from '../lib/hooks/foundation/useCreation'

class Foo {
  constructor() {
    this.data = Math.random()
  }

  data: number
}

export default function () {
  const foo = useCreation(() => new Foo(), [])
  const [, setFlag] = useState({})
  return (
    <>
      <h2>Make sure only one instance is created</h2>
      <p>
        You can click the "Rerender" button and trigger the update of this
        component. But the instance of Foo will keep unchanged.
      </p>
      <p>{foo.data}</p>
      <button
        type='button'
        onClick={() => {
          setFlag({})
        }}
      >
        Rerender
      </button>
    </>
  )
}
