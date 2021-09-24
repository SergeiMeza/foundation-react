import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';
import useUnmount from './useUnmount';
import useUpdateEffect from './useUpdateEffect';
/**
 * Debounce your useEffect.
 */
export default function useDebounceEffect(effect, deps, options) {
    var _a = useState({}), flag = _a[0], setFlag = _a[1];
    var _b = useDebounceFn(function () {
        setFlag({});
    }, options), run = _b.run, cancel = _b.cancel;
    useEffect(function () {
        return run();
    }, deps);
    useUnmount(cancel);
    useUpdateEffect(effect, [flag]);
}
