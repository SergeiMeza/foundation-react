"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dom_1 = require("../../utils/dom");
/**
 * Use addEventListener elegantly with Hooks API.
 */
function useEventListener(eventName, handler, options) {
    if (options === void 0) { options = {}; }
    var handlerRef = (0, react_1.useRef)();
    handlerRef.current = handler;
    (0, react_1.useEffect)(function () {
        var targetElement = (0, dom_1.getTargetElement)(options.target, window);
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
exports.default = useEventListener;
