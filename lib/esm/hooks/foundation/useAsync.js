import { useCallback, useEffect, useState } from 'react';
var useAsync = function (callback, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var _b = useState(), error = _b[0], setError = _b[1];
    var _c = useState(), value = _c[0], setValue = _c[1];
    var callbackMemoized = useCallback(function () {
        setLoading(true);
        setError(undefined);
        setValue(undefined);
        callback()
            .then(setValue)
            .catch(setError)
            .finally(function () { return setLoading(false); });
    }, dependencies);
    useEffect(function () {
        callbackMemoized();
    }, [callbackMemoized]);
    return { loading: loading, error: error, value: value, setError: setError, setValue: setValue };
};
export default useAsync;
