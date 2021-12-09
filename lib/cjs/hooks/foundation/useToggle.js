"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useToggle(defaultValue, reverseValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = (0, react_1.useState)(defaultValue), state = _a[0], setState = _a[1];
    var actions = (0, react_1.useMemo)(function () {
        var reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue);
        // Toggle return value
        var toggle = function (value) {
            // Force return status value, suitable for click operation
            if (value !== undefined) {
                setState(value);
                return;
            }
            setState(function (s) { return (s === defaultValue ? reverseValueOrigin : defaultValue); });
        };
        var setLeft = function () { return setState(defaultValue); };
        var setRight = function () { return setState(reverseValueOrigin); };
        return { toggle: toggle, setLeft: setLeft, setRight: setRight };
    }, [defaultValue, reverseValue]);
    return [state, actions];
}
exports.default = useToggle;
