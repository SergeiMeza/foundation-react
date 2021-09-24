declare const useAsync: (callback: () => Promise<any>, dependencies?: any[]) => {
    loading: boolean;
    error: any;
    value: any;
};
export default useAsync;
