/// <reference types="react" />
/**
 * @description Convenient hook for managing an async operation in react.
 * @param asyncFunction The async function to call.
 * @param dependencies An array of dependencies to use for memoization.
 */
declare const useAsync: <V>(asyncFunction: () => Promise<V>, dependencies?: any[]) => {
    loading: boolean;
    error: unknown;
    value: V | undefined;
    setError: import("react").Dispatch<unknown>;
    setValue: import("react").Dispatch<import("react").SetStateAction<V | undefined>>;
};
export default useAsync;
