import { useCallback, useState, useEffect } from 'react';
export var useLocalStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.localStorage);
};
export var useSessionStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.sessionStorage);
};
var useStorage = function (key, defaultValue, storageObject) {
    var _a = useState(), value = _a[0], setValue = _a[1];
    useEffect(function () {
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
    useEffect(function () {
        if (!storageObject)
            return;
        if (value === undefined)
            return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);
    var remove = useCallback(function () {
        setValue(undefined);
    }, []);
    return [value, setValue, remove];
};
