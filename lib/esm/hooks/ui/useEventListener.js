import { useEffect, useRef } from 'react';
import { getTargetElement } from '../../utils/dom';
/**
 * Use addEventListener elegantly with Hooks API.
 */
function useEventListener(eventName, handler, options) {
    if (options === void 0) { options = {}; }
    var handlerRef = useRef();
    handlerRef.current = handler;
    useEffect(function () {
        var targetElement = getTargetElement(options.target, window);
        if (!targetElement.addEventListener) {
            return;
        }
        var eventListener = function (event) {
            return handlerRef.current && handlerRef.current(event);
        };
        targetElement.addEventListener(eventName, eventListener, {
            capture: options.capture,
            once: options.once,
            passive: options.passive,
        });
        return function () {
            targetElement.removeEventListener(eventName, eventListener, {
                capture: options.capture,
            });
        };
    }, [
        eventName,
        options.target,
        options.capture,
        options.once,
        options.passive,
    ]);
}
export default useEventListener;
