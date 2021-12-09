"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var useCreation_1 = __importDefault(require("./useCreation"));
var useUnmount_1 = __importDefault(require("./useUnmount"));
function useDebounceFn(fn, options) {
    var _a;
    var fnRef = (0, react_1.useRef)(fn);
    fnRef.current = fn;
    var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
    var debounced = (0, useCreation_1.default)(function () {
        return (0, lodash_debounce_1.default)((function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnRef.current.apply(fnRef, args);
        }), wait, options);
    }, []);
    (0, useUnmount_1.default)(function () {
        debounced.cancel();
    });
    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush,
    };
}
exports.default = useDebounceFn;
