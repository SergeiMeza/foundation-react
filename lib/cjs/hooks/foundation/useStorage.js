"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = exports.useLocalStorage = void 0;
var react_1 = require("react");
var useLocalStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.localStorage);
};
exports.useLocalStorage = useLocalStorage;
var useSessionStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.sessionStorage);
};
exports.useSessionStorage = useSessionStorage;
var useStorage = function (key, defaultValue, storageObject) {
    var _a = (0, react_1.useState)(), value = _a[0], setValue = _a[1];
    (0, react_1.useEffect)(function () {
        var jsonValue = storageObject.getItem(key);
        if (jsonValue != null)
            return JSON.parse(jsonValue);
        if (typeof defaultValue === 'function') {
            return defaultValue();
        }
        else {
            return defaultValue;
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (!storageObject)
            return;
        if (value === undefined)
            return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);
    var remove = (0, react_1.useCallback)(function () {
        setValue(undefined);
    }, []);
    return [value, setValue, remove];
};
