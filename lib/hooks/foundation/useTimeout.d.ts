/**
 * A hook that can handle the setTimeout timer function.
 * */
declare function useTimeout(fn: () => void, delay: number | null | undefined): void;
export default useTimeout;
