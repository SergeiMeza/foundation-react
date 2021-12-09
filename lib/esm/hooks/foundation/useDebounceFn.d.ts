import { DebounceOptions } from './DebounceOptions';
declare type Fn = (...args: any) => any;
export default function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions): {
    run: T;
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
};
export {};
