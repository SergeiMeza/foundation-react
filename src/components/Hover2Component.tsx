/**
 * title: Pass in DOM element
 * desc: Pass in a function that returns the DOM element.
 */

import useHover from '../lib/hooks/ui/useHover'

export default () => {
  const isHovering = useHover(() => document.getElementById('hover-div'), {
    onEnter: () => {
      console.log('onEnter')
    },
    onLeave: () => {
      console.log('onLeave')
    },
  })

  return <div id='hover-div'>{isHovering ? 'hover' : 'leaveHover'}</div>
}
