import { useRef } from 'react';
import debounce from 'lodash.debounce';
import useCreation from './useCreation';
import useUnmount from './useUnmount';
export default function useDebounceFn(fn, options) {
    var _a;
    var fnRef = useRef(fn);
    fnRef.current = fn;
    var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
    var debounced = useCreation(function () {
        return debounce((function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnRef.current.apply(fnRef, args);
        }), wait, options);
    }, []);
    useUnmount(function () {
        debounced.cancel();
    });
    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush,
    };
}
