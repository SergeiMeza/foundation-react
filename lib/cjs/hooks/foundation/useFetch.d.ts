/// <reference types="react" />
declare const useFetch: (url: string, options?: any, dependencies?: any[]) => {
    loading: boolean;
    error: unknown;
    value: any;
    setError: import("react").Dispatch<unknown>;
    setValue: import("react").Dispatch<any>;
};
export default useFetch;
