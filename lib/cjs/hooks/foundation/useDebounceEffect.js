"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDebounceFn_1 = __importDefault(require("./useDebounceFn"));
var useUnmount_1 = __importDefault(require("./useUnmount"));
var useUpdateEffect_1 = __importDefault(require("./useUpdateEffect"));
/**
 * Debounce your useEffect.
 */
function useDebounceEffect(effect, deps, options) {
    var _a = (0, react_1.useState)({}), flag = _a[0], setFlag = _a[1];
    var _b = (0, useDebounceFn_1.default)(function () {
        setFlag({});
    }, options), run = _b.run, cancel = _b.cancel;
    (0, react_1.useEffect)(function () {
        return run();
    }, deps);
    (0, useUnmount_1.default)(cancel);
    (0, useUpdateEffect_1.default)(effect, [flag]);
}
exports.default = useDebounceEffect;
