/// <reference types="react" />
export declare type TDate = Date | number | string | undefined;
/**
 * @description useCountdown hook options.
 */
export declare type Options = {
    targetDate?: TDate;
    interval?: number;
    onEnd?: () => void;
};
/**
 * @description Formatted response
 */
export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
/**
 * An elegant hook for countdown management.
 */
declare const useCountdown: (options?: Options | undefined) => (number | FormattedRes | import("react").Dispatch<import("react").SetStateAction<TDate>>)[];
export default useCountdown;
