"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dom_1 = require("../../utils/dom");
// Mouse click event, click will not monitor the right button
var defaultEvent = 'click';
/**
 * A hook that elegantly manages click outside of target elements.
 */
function useClickAway(onClickAway, target, eventName) {
    if (eventName === void 0) { eventName = defaultEvent; }
    var onClickAwayRef = (0, react_1.useRef)(onClickAway);
    onClickAwayRef.current = onClickAway;
    (0, react_1.useEffect)(function () {
        var handler = function (event) {
            var targets = Array.isArray(target) ? target : [target];
            if (targets.some(function (targetItem) {
                var targetElement = (0, dom_1.getTargetElement)(targetItem);
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
exports.default = useClickAway;
