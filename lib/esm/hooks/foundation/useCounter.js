import { useMemo, useState } from 'react';
import useCreation from './useCreation';
function getTargetValue(val, options) {
    if (options === void 0) { options = {}; }
    var min = options.min, max = options.max;
    var target = val;
    if (typeof max === 'number') {
        target = Math.min(max, target);
    }
    if (typeof min === 'number') {
        target = Math.max(min, target);
    }
    return target;
}
/**
 * A hook that can manage the count.
 */
function useCounter(initialValue, options) {
    if (initialValue === void 0) { initialValue = 0; }
    if (options === void 0) { options = {}; }
    var min = options.min, max = options.max;
    // get init value
    var init = useCreation(function () {
        return getTargetValue(initialValue, { min: min, max: max });
    }, []);
    var _a = useState(init), current = _a[0], setCurrent = _a[1];
    var actions = useMemo(function () {
        var setValue = function (value) {
            setCurrent(function (c) {
                // get target value
                var target = typeof value === 'number' ? value : value(c);
                return getTargetValue(target, { max: max, min: min });
            });
        };
        var inc = function (delta) {
            if (delta === void 0) { delta = 1; }
            setValue(function (c) { return c + delta; });
        };
        var dec = function (delta) {
            if (delta === void 0) { delta = 1; }
            setValue(function (c) { return c - delta; });
        };
        var set = function (value) {
            setValue(value);
        };
        var reset = function () {
            setValue(init);
        };
        return { inc: inc, dec: dec, set: set, reset: reset };
    }, [init, max, min]);
    return [current, actions];
}
export default useCounter;
