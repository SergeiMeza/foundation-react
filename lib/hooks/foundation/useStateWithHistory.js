import { useCallback, useRef, useState } from 'react';
var useStateWithHistory = function (defaultValue, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.capacity, capacity = _c === void 0 ? 10 : _c;
    var _d = useState(defaultValue), value = _d[0], setValue = _d[1];
    var historyRef = useRef([value]);
    var pointerRef = useRef(0);
    var set = useCallback(function (v) {
        var resolvedValue = typeof v === 'function' ? v(value) : v;
        if (historyRef.current[pointerRef.current] !== resolvedValue) {
            if (pointerRef.current < historyRef.current.length - 1) {
                historyRef.current.splice(pointerRef.current + 1);
            }
            historyRef.current.push(resolvedValue);
            while (historyRef.current.length > capacity) {
                historyRef.current.shift();
            }
            pointerRef.current = historyRef.current.length - 1;
        }
        setValue(resolvedValue);
    }, [capacity, value]);
    var back = useCallback(function () {
        if (pointerRef.current <= 0)
            return;
        pointerRef.current--;
        setValue(historyRef.current[pointerRef.current]);
    }, []);
    var forward = useCallback(function () {
        if (pointerRef.current >= historyRef.current.length - 1)
            return;
        pointerRef.current++;
        setValue(historyRef.current[pointerRef.current]);
    }, []);
    var go = useCallback(function (index) {
        if (index < 0 || index >= historyRef.current.length - 1)
            return;
        pointerRef.current = index;
        setValue(historyRef.current[pointerRef.current]);
    }, []);
    return [
        value,
        set,
        {
            history: historyRef.current,
            pointer: pointerRef.current,
            back: back,
            forward: forward,
            go: go,
        },
    ];
};
export default useStateWithHistory;
