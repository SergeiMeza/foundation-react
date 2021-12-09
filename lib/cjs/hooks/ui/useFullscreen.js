"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var screenfull_1 = __importDefault(require("screenfull"));
var dom_1 = require("../../utils/dom");
var useUnmount_1 = __importDefault(require("../foundation/useUnmount"));
/**
 * A Hook for handling dom full screen.
 */
function useFullscreen(target, options) {
    var _a = options || {}, onExitFull = _a.onExitFull, onFull = _a.onFull;
    var onExitFullRef = (0, react_1.useRef)(onExitFull);
    onExitFullRef.current = onExitFull;
    var onFullRef = (0, react_1.useRef)(onFull);
    onFullRef.current = onFull;
    var _b = (0, react_1.useState)(false), state = _b[0], setState = _b[1];
    var onChange = (0, react_1.useCallback)(function () {
        if (screenfull_1.default.isEnabled) {
            var isFullscreen = screenfull_1.default.isFullscreen;
            if (isFullscreen) {
                onFullRef.current && onFullRef.current();
            }
            else {
                screenfull_1.default.off('change', onChange);
                onExitFullRef.current && onExitFullRef.current();
            }
            setState(isFullscreen);
        }
    }, []);
    var setFull = (0, react_1.useCallback)(function () {
        var el = (0, dom_1.getTargetElement)(target);
        if (!el) {
            return;
        }
        if (screenfull_1.default.isEnabled) {
            try {
                screenfull_1.default.request(el);
                screenfull_1.default.on('change', onChange);
            }
            catch (error) { }
        }
    }, [target, onChange]);
    var exitFull = (0, react_1.useCallback)(function () {
        if (!state) {
            return;
        }
        if (screenfull_1.default.isEnabled) {
            screenfull_1.default.exit();
        }
    }, []);
    var toggleFull = (0, react_1.useCallback)(function () {
        if (state) {
            exitFull();
        }
        else {
            setFull();
        }
    }, [state, setFull, exitFull]);
    (0, useUnmount_1.default)(function () {
        if (screenfull_1.default.isEnabled) {
            screenfull_1.default.off('change', onChange);
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
exports.default = useFullscreen;
