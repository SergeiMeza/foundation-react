declare const useFetch: (url: string, options?: any, dependencies?: any[]) => {
    loading: boolean;
    error: any;
    value: any;
};
export default useFetch;
