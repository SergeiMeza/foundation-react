"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * @description Convenient hook for managing an async operation in react.
 * @param asyncFunction The async function to call.
 * @param dependencies An array of dependencies to use for memoization.
 */
var useAsync = function (asyncFunction, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(), value = _c[0], setValue = _c[1];
    var asyncFunctionMemoized = (0, react_1.useCallback)(function () {
        setLoading(true);
        setError(undefined);
        setValue(undefined);
        asyncFunction()
            .then(setValue)
            .catch(setError)
            .finally(function () { return setLoading(false); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
    (0, react_1.useEffect)(function () {
        asyncFunctionMemoized();
    }, [asyncFunctionMemoized]);
    return { loading: loading, error: error, value: value, setError: setError, setValue: setValue };
};
exports.default = useAsync;
