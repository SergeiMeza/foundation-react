"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * @description Convenient hook for managing an array of values in react.
 */
var useArray = function (defaultValue) {
    var _a = (0, react_1.useState)(defaultValue), array = _a[0], setArray = _a[1];
    function push(element) {
        setArray(function (a) { return __spreadArray(__spreadArray([], a, true), [element], false); });
    }
    function filter(callback) {
        setArray(function (a) { return a.filter(callback); });
    }
    function update(index, newElement) {
        setArray(function (a) { return __spreadArray(__spreadArray(__spreadArray([], a.slice(0, index), true), [
            newElement
        ], false), a.slice(index + 1, a.length - 1), true); });
    }
    function remove(index) {
        setArray(function (a) { return __spreadArray(__spreadArray([], a.slice(0, index), true), a.slice(index + 1, a.length - 1), true); });
    }
    function clear() {
        setArray([]);
    }
    return { array: array, set: setArray, push: push, filter: filter, update: update, remove: remove, clear: clear };
};
exports.default = useArray;
