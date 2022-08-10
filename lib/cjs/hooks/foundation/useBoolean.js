"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useToggle_1 = __importDefault(require("./useToggle"));
/**
 * @description A hook that elegantly manages boolean values.
 */
function useBoolean(defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var _a = (0, useToggle_1.default)(defaultValue), state = _a[0], toggle = _a[1].toggle;
    var actions = (0, react_1.useMemo)(function () {
        var setTrue = function () { return toggle(true); };
        var setFalse = function () { return toggle(false); };
        return { toggle: toggle, setTrue: setTrue, setFalse: setFalse };
    }, [toggle]);
    return [state, actions];
}
exports.default = useBoolean;
