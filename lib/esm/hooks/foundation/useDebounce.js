import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';
/**
 * @description A hook that handle the debounce value.
 */
export default function useDebounce(value, options) {
    var _a = useState(value), debounced = _a[0], setDebounced = _a[1];
    var run = useDebounceFn(function () {
        setDebounced(value);
    }, options).run;
    useEffect(function () {
        run();
    }, [run, value]);
    return debounced;
}
