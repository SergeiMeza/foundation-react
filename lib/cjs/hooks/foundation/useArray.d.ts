/// <reference types="react" />
/**
 * @description Convenient hook for managing an array of values in react.
 */
declare const useArray: <T>(defaultValue: T[]) => {
    array: T[];
    set: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    push: (element: T) => void;
    filter: (callback: (value: T, index: number, array: T[]) => unknown) => void;
    update: (index: number, newElement: T) => void;
    remove: (index: number) => void;
    clear: () => void;
};
export default useArray;
