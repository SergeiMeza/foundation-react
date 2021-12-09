"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function usePersistFn(fn) {
    var fnRef = (0, react_1.useRef)(fn);
    fnRef.current = fn;
    var persistFnRef = (0, react_1.useRef)();
    if (!persistFnRef.current) {
        persistFnRef.current = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnRef.current(args);
        };
    }
    return persistFnRef.current;
}
exports.default = usePersistFn;
