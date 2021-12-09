"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDebounceFn_1 = __importDefault(require("./useDebounceFn"));
/**
 * A hook that handle the debounce value.
 */
function useDebounce(value, options) {
    var _a = (0, react_1.useState)(value), debounced = _a[0], setDebounced = _a[1];
    var run = (0, useDebounceFn_1.default)(function () {
        setDebounced(value);
    }, options).run;
    (0, react_1.useEffect)(function () {
        run();
    }, [value]);
    return debounced;
}
exports.default = useDebounce;
