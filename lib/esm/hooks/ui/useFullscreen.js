import { useCallback, useRef, useState } from 'react';
import screenfull from 'screenfull';
import { getTargetElement } from '../../utils/dom';
import useUnmount from '../foundation/useUnmount';
/**
 * A Hook for handling dom full screen.
 */
export default function useFullscreen(target, options) {
    var _a = options || {}, onExitFull = _a.onExitFull, onFull = _a.onFull;
    var onExitFullRef = useRef(onExitFull);
    onExitFullRef.current = onExitFull;
    var onFullRef = useRef(onFull);
    onFullRef.current = onFull;
    var _b = useState(false), state = _b[0], setState = _b[1];
    var onChange = useCallback(function () {
        if (screenfull.isEnabled) {
            var isFullscreen = screenfull.isFullscreen;
            if (isFullscreen) {
                onFullRef.current && onFullRef.current();
            }
            else {
                screenfull.off('change', onChange);
                onExitFullRef.current && onExitFullRef.current();
            }
            setState(isFullscreen);
        }
    }, []);
    var setFull = useCallback(function () {
        var el = getTargetElement(target);
        if (!el) {
            return;
        }
        if (screenfull.isEnabled) {
            try {
                screenfull.request(el);
                screenfull.on('change', onChange);
            }
            catch (error) { }
        }
    }, [target, onChange]);
    var exitFull = useCallback(function () {
        if (!state) {
            return;
        }
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    }, []);
    var toggleFull = useCallback(function () {
        if (state) {
            exitFull();
        }
        else {
            setFull();
        }
    }, [state, setFull, exitFull]);
    useUnmount(function () {
        if (screenfull.isEnabled) {
            screenfull.off('change', onChange);
        }
    });
    return [
        state,
        {
            setFull: setFull,
            exitFull: exitFull,
            toggleFull: toggleFull,
        },
    ];
}
