import { useRef } from 'react';
function usePersistFn(fn) {
    var fnRef = useRef(fn);
    fnRef.current = fn;
    var persistFnRef = useRef();
    if (!persistFnRef.current) {
        persistFnRef.current = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnRef.current(args);
        };
    }
    return persistFnRef.current;
}
export default usePersistFn;
