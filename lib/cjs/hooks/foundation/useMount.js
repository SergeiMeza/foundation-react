"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * A hook that executes a function at mount.
 */
function useMount(fn) {
    (0, react_1.useEffect)(function () {
        fn();
    }, []);
}
exports.default = useMount;
