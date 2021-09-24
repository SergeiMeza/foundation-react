import { BasicTarget } from '../../utils/dom'
import useBoolean from '../foundation/useBoolean'
import useEventListener from './useEventListener'

export interface Options {
  onEnter?: () => void
  onLeave?: () => void
}

export default function useHover(target: BasicTarget, options?: Options) {
  const { onEnter, onLeave } = options || {}

  const [state, { setTrue, setFalse }] = useBoolean(false)

  useEventListener(
    'mouseenter',
    () => {
      onEnter && onEnter()
      setTrue()
    },
    {
      target,
    },
  )

  useEventListener(
    'mouseleave',
    () => {
      onLeave && onLeave()
      setFalse()
    },
    {
      target,
    },
  )

  return state
}
