import { useEffect } from 'react';
import usePersistFn from './usePersistFn';
/**
 * A hook that can handle the setTimeout timer function.
 * */
function useTimeout(fn, delay) {
    var timerFn = usePersistFn(fn);
    useEffect(function () {
        if (delay === undefined || delay === null)
            return;
        var timer = setTimeout(function () {
            timerFn();
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [delay, timerFn]);
}
export default useTimeout;
