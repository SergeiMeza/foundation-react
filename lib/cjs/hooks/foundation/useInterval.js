"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * A hook that can handle the setInterval timer function.
 */
function useInterval(fn, delay, options) {
    var immediate = options === null || options === void 0 ? void 0 : options.immediate;
    var fnRef = (0, react_1.useRef)();
    fnRef.current = fn;
    (0, react_1.useEffect)(function () {
        var _a;
        if (delay === undefined || delay === null)
            return;
        if (immediate) {
            (_a = fnRef.current) === null || _a === void 0 ? void 0 : _a.call(fnRef);
        }
        var timer = setInterval(function () {
            var _a;
            (_a = fnRef.current) === null || _a === void 0 ? void 0 : _a.call(fnRef);
        }, delay);
        return function () {
            clearInterval(timer);
        };
    }, [delay]);
}
exports.default = useInterval;
