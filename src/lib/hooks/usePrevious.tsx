import { useRef } from 'react'

const usePrevious = (value: any) => {
  const currentRef = useRef(value)
  const previousRef = useRef<any>()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

export default usePrevious
