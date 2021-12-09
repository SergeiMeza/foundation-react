/// <reference types="react" />
export declare type TDate = Date | number | string | undefined;
export declare type Options = {
    targetDate?: TDate;
    interval?: number;
    onEnd?: () => void;
};
export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
/**
 * A hook for countdown management.
 */
declare const useCountDown: (options?: Options | undefined) => (number | FormattedRes | import("react").Dispatch<import("react").SetStateAction<TDate>>)[];
export default useCountDown;
