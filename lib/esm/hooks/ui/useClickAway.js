import { useEffect, useRef } from 'react';
import { getTargetElement } from '../../utils/dom';
// Mouse click event, click will not monitor the right button
var defaultEvent = 'click';
/**
 * A hook that elegantly manages click outside of target elements.
 */
export default function useClickAway(onClickAway, target, eventName) {
    if (eventName === void 0) { eventName = defaultEvent; }
    var onClickAwayRef = useRef(onClickAway);
    onClickAwayRef.current = onClickAway;
    useEffect(function () {
        var handler = function (event) {
            var targets = Array.isArray(target) ? target : [target];
            if (targets.some(function (targetItem) {
                var targetElement = getTargetElement(targetItem);
                return !targetElement || (targetElement === null || targetElement === void 0 ? void 0 : targetElement.contains(event.target));
            })) {
                return;
            }
            onClickAwayRef.current(event);
        };
        document.addEventListener(eventName, handler);
        return function () {
            document.removeEventListener(eventName, handler);
        };
    }, [target, eventName]);
}
