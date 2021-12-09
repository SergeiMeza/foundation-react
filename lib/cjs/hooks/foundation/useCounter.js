"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCreation_1 = __importDefault(require("./useCreation"));
function getTargetValue(val, options) {
    if (options === void 0) { options = {}; }
    var min = options.min, max = options.max;
    var target = val;
    if (typeof max === 'number') {
        target = Math.min(max, target);
    }
    if (typeof min === 'number') {
        target = Math.max(min, target);
    }
    return target;
}
/**
 * A hook that can manage the count.
 */
function useCounter(initialValue, options) {
    if (initialValue === void 0) { initialValue = 0; }
    if (options === void 0) { options = {}; }
    var min = options.min, max = options.max;
    // get init value
    var init = (0, useCreation_1.default)(function () {
        return getTargetValue(initialValue, { min: min, max: max });
    }, []);
    var _a = (0, react_1.useState)(init), current = _a[0], setCurrent = _a[1];
    var actions = (0, react_1.useMemo)(function () {
        var setValue = function (value) {
            setCurrent(function (c) {
                // get target value
                var target = typeof value === 'number' ? value : value(c);
                return getTargetValue(target, { max: max, min: min });
            });
        };
        var inc = function (delta) {
            if (delta === void 0) { delta = 1; }
            setValue(function (c) { return c + delta; });
        };
        var dec = function (delta) {
            if (delta === void 0) { delta = 1; }
            setValue(function (c) { return c - delta; });
        };
        var set = function (value) {
            setValue(value);
        };
        var reset = function () {
            setValue(init);
        };
        return { inc: inc, dec: dec, set: set, reset: reset };
    }, [init, max, min]);
    return [current, actions];
}
exports.default = useCounter;
