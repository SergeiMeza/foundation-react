"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useBoolean_1 = __importDefault(require("../foundation/useBoolean"));
var useEventListener_1 = __importDefault(require("./useEventListener"));
function useHover(target, options) {
    var _a = options || {}, onEnter = _a.onEnter, onLeave = _a.onLeave;
    var _b = (0, useBoolean_1.default)(false), state = _b[0], _c = _b[1], setTrue = _c.setTrue, setFalse = _c.setFalse;
    (0, useEventListener_1.default)('mouseenter', function () {
        onEnter && onEnter();
        setTrue();
    }, {
        target: target,
    });
    (0, useEventListener_1.default)('mouseleave', function () {
        onLeave && onLeave();
        setFalse();
    }, {
        target: target,
    });
    return state;
}
exports.default = useHover;
