import useBoolean from '../foundation/useBoolean';
import useEventListener from './useEventListener';
export default function useHover(target, options) {
    var _a = options || {}, onEnter = _a.onEnter, onLeave = _a.onLeave;
    var _b = useBoolean(false), state = _b[0], _c = _b[1], setTrue = _c.setTrue, setFalse = _c.setFalse;
    useEventListener('mouseenter', function () {
        onEnter && onEnter();
        setTrue();
    }, {
        target: target,
    });
    useEventListener('mouseleave', function () {
        onLeave && onLeave();
        setFalse();
    }, {
        target: target,
    });
    return state;
}
