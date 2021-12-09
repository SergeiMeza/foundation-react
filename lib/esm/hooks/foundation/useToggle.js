import { useState, useMemo } from 'react';
function useToggle(defaultValue, reverseValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = useState(defaultValue), state = _a[0], setState = _a[1];
    var actions = useMemo(function () {
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
export default useToggle;
