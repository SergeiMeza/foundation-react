"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("../../utils");
var usePersistFn_1 = __importDefault(require("./usePersistFn"));
/**
 * A hook that executes a function at unmount.
 */
function useUnmount(fn) {
    var fnPersist = (0, usePersistFn_1.default)(fn);
    (0, react_1.useEffect)(function () { return function () {
        if ((0, utils_1.isFunction)(fnPersist)) {
            fnPersist();
        }
    }; }, []);
}
exports.default = useUnmount;
