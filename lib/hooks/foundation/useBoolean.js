import { useMemo } from 'react';
import useToggle from './useToggle';
/**
 * A hook that elegantly manages boolean values.
 */
export default function useBoolean(defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = useToggle(defaultValue), state = _a[0], toggle = _a[1].toggle;
    var actions = useMemo(function () {
        var setTrue = function () { return toggle(true); };
        var setFalse = function () { return toggle(false); };
        return { toggle: toggle, setTrue: setTrue, setFalse: setFalse };
    }, [toggle]);
    return [state, actions];
}
