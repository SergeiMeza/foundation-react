import { useState, useMemo } from 'react'

type IState = string | number | boolean | undefined

export interface Actions<T = IState> {
  setLeft: () => void
  setRight: () => void
  toggle: (value?: T) => void
}

function useToggle<T = boolean | undefined>(): [boolean, Actions<T>]

function useToggle<T = IState>(defaultValue: T): [T, Actions<T>]

function useToggle<T = IState, U = IState>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions<T | U>]

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
) {
  const [state, setState] = useState<D | R>(defaultValue)

  const actions = useMemo(() => {
    const reverseValueOrigin = (
      reverseValue === undefined ? !defaultValue : reverseValue
    ) as D | R

    // Toggle return value
    const toggle = (value?: D | R) => {
      // Force return status value, suitable for click operation
      if (value !== undefined) {
        setState(value)
        return
      }
      setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue))
    }

    const setLeft = () => setState(defaultValue)

    const setRight = () => setState(reverseValueOrigin)

    return { toggle, setLeft, setRight }
  }, [defaultValue, reverseValue])

  return [state, actions]
}

export default useToggle
