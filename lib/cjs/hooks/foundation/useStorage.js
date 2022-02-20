"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = exports.useLocalStorage = void 0;
var react_1 = require("react");
var useLocalStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, StorageType.LOCAL);
};
exports.useLocalStorage = useLocalStorage;
var useSessionStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, StorageType.SESSION);
};
exports.useSessionStorage = useSessionStorage;
var StorageType;
(function (StorageType) {
    StorageType["SESSION"] = "session";
    StorageType["LOCAL"] = "local";
})(StorageType || (StorageType = {}));
var useStorage = function (key, defaultValue, storageType) {
    var _a = (0, react_1.useState)(), value = _a[0], setValue = _a[1];
    (0, react_1.useEffect)(function () {
        var storageObject = storageType === StorageType.LOCAL
            ? window.localStorage
            : window.sessionStorage;
        var jsonValue = storageObject.getItem(key);
        if (jsonValue != null) {
            setValue(JSON.parse(jsonValue));
        }
        else {
            if (typeof defaultValue === 'function') {
                return defaultValue();
            }
            else {
                return defaultValue;
            }
        }
    }, []);
    (0, react_1.useEffect)(function () {
        var storageObject = storageType === StorageType.LOCAL
            ? window.localStorage
            : window.sessionStorage;
        if (value === undefined)
            return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value]);
    var remove = (0, react_1.useCallback)(function () {
        setValue(undefined);
    }, []);
    return [value, setValue, remove];
};
