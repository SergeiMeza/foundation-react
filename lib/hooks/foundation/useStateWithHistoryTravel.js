var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useCallback, useRef } from 'react';
function dumpIndex(step, arr) {
    var index = step > 0
        ? step - 1 // move forward
        : arr.length + step; // move backward
    if (index >= arr.length - 1) {
        index = arr.length - 1;
    }
    if (index < 0) {
        index = 0;
    }
    return index;
}
function split(step, targetArr) {
    var index = dumpIndex(step, targetArr);
    return {
        _current: targetArr[index],
        _before: targetArr.slice(0, index),
        _after: targetArr.slice(index + 1),
    };
}
/**
 * A hook to manage state change history. It provides encapsulation methods to travel through the history.
 */
export default function useStateWithHistoryTravel(initialValue) {
    var _a = useState({
        present: initialValue,
        past: [],
        future: [],
    }), history = _a[0], setHistory = _a[1];
    var present = history.present, past = history.past, future = history.future;
    var initialValueRef = useRef(initialValue);
    var reset = useCallback(function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _initial = params.length > 0 ? params[0] : initialValueRef.current;
        initialValueRef.current = _initial;
        setHistory({
            present: _initial,
            future: [],
            past: [],
        });
    }, [setHistory]);
    var updateValue = useCallback(function (val) {
        setHistory({
            present: val,
            future: [],
            past: __spreadArray(__spreadArray([], past, true), [present], false),
        });
    }, [history, setHistory]);
    var _forward = useCallback(function (step) {
        if (step === void 0) { step = 1; }
        if (future.length === 0) {
            return;
        }
        var _a = split(step, future), _before = _a._before, _current = _a._current, _after = _a._after;
        setHistory({
            past: __spreadArray(__spreadArray(__spreadArray([], past, true), [present], false), _before, true),
            present: _current,
            future: _after,
        });
    }, [history, setHistory]);
    var _backward = useCallback(function (step) {
        if (step === void 0) { step = -1; }
        if (past.length === 0) {
            return;
        }
        var _a = split(step, past), _before = _a._before, _current = _a._current, _after = _a._after;
        setHistory({
            past: _before,
            present: _current,
            future: __spreadArray(__spreadArray(__spreadArray([], _after, true), [present], false), future, true),
        });
    }, [history, setHistory]);
    var go = useCallback(function (step) {
        var stepNum = typeof step === 'number' ? step : Number(step);
        if (stepNum === 0) {
            return;
        }
        if (stepNum > 0) {
            return _forward(stepNum);
        }
        _backward(stepNum);
    }, [_backward, _forward]);
    return [
        present,
        updateValue,
        {
            backLength: past.length,
            forwardLength: future.length,
            go: go,
            back: useCallback(function () { return go(-1); }, [go]),
            forward: useCallback(function () {
                go(1);
            }, [go]),
            reset: reset,
        },
    ];
}
