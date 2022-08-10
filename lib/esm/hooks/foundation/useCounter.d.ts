/**
 * @description useCount hook options.
 */
export interface Options {
    min?: number;
    max?: number;
}
/**
 * @description useCount hook actions.
 */
export interface Actions {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    set: (value: number | ((c: number) => number)) => void;
    reset: () => void;
}
export declare type ValueParam = number | ((c: number) => number);
/**
 * A hook that can manage the count.
 */
declare function useCounter(initialValue?: number, options?: Options): readonly [number, {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    set: (value: ValueParam) => void;
    reset: () => void;
}];
export default useCounter;
