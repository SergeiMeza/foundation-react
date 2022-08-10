import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import usePersistFn from './usePersistFn';
/**
 * @description Calculate time left.
 */
var calcLeft = function (t) {
    if (!t) {
        return 0;
    }
    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    var left = dayjs(t).valueOf() - new Date().getTime();
    if (left < 0) {
        return 0;
    }
    return left;
};
/**
 * @description Parse milliseconds to days, hours, minutes, seconds, milliseconds.
 */
var parseMs = function (milliseconds) {
    return {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000,
    };
};
/**
 * An elegant hook for countdown management.
 */
var useCountdown = function (options) {
    var _a = options || {}, targetDate = _a.targetDate, _b = _a.interval, interval = _b === void 0 ? 1000 : _b, onEnd = _a.onEnd;
    var _c = useState(targetDate), target = _c[0], setTargetDate = _c[1];
    var _d = useState(function () { return calcLeft(target); }), timeLeft = _d[0], setTimeLeft = _d[1];
    var onEndPersistFn = usePersistFn(function () {
        if (onEnd) {
            onEnd();
        }
    });
    useEffect(function () {
        if (!target) {
            // for stop
            setTimeLeft(0);
            return;
        }
        // Execute once immediately
        setTimeLeft(calcLeft(target));
        var timer = setInterval(function () {
            var targetLeft = calcLeft(target);
            setTimeLeft(targetLeft);
            if (targetLeft === 0) {
                clearInterval(timer);
                onEndPersistFn();
            }
        }, interval);
        return function () { return clearInterval(timer); };
    }, [target, interval, onEndPersistFn]);
    var formattedRes = useMemo(function () {
        return parseMs(timeLeft);
    }, [timeLeft]);
    var props = [timeLeft, setTargetDate, formattedRes];
    return props;
};
export default useCountdown;
