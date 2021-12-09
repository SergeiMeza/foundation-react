/**
 * A hook to manage state change history. It provides encapsulation methods to travel through the history.
 */
export default function useStateWithHistoryTravel<T>(initialValue?: T): readonly [T | undefined, (val: T) => void, {
    readonly backLength: number;
    readonly forwardLength: number;
    readonly go: (step: number) => void;
    readonly back: () => void;
    readonly forward: () => void;
    readonly reset: (...params: any[]) => void;
}];
