/**
 * title: Default usage
 * desc: Use ref to set elements that need listen dom.
 */

import { useRef } from 'react'
import useHover from '../lib/hooks/ui/useHover'

export default () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isHovering = useHover(ref)

  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
}
