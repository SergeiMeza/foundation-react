import { useEffect } from 'react';
import { isFunction } from '../../utils';
import usePersistFn from './usePersistFn';
/**
 * A hook that executes a function at unmount.
 */
export default function useUnmount(fn) {
    var fnPersist = usePersistFn(fn);
    useEffect(function () { return function () {
        if (isFunction(fnPersist)) {
            fnPersist();
        }
    }; }, []);
}
