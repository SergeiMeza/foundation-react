/// <reference types="react" />
declare const useFetch: (url: string, options?: any, dependencies?: any[]) => {
    loading: boolean;
    error: any;
    value: any;
    setError: import("react").Dispatch<any>;
    setValue: import("react").Dispatch<any>;
};
export default useFetch;
