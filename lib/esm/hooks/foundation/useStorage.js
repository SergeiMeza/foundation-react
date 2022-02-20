import { useCallback, useState, useEffect } from 'react';
export var useLocalStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, StorageType.LOCAL);
};
export var useSessionStorage = function (key, defaultValue) {
    return useStorage(key, defaultValue, StorageType.SESSION);
};
var StorageType;
(function (StorageType) {
    StorageType["SESSION"] = "session";
    StorageType["LOCAL"] = "local";
})(StorageType || (StorageType = {}));
var useStorage = function (key, defaultValue, storageType) {
    var _a = useState(), value = _a[0], setValue = _a[1];
    useEffect(function () {
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
    useEffect(function () {
        var storageObject = storageType === StorageType.LOCAL
            ? window.localStorage
            : window.sessionStorage;
        if (value === undefined)
            return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value]);
    var remove = useCallback(function () {
        setValue(undefined);
    }, []);
    return [value, setValue, remove];
};
