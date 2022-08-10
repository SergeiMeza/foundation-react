/// <reference types="react" />
export declare const useLocalStorage: <T>(key: string, defaultValue: T) => readonly [T | undefined, import("react").Dispatch<T | undefined>, () => void];
export declare const useSessionStorage: <T>(key: string, defaultValue: T) => readonly [T | undefined, import("react").Dispatch<T | undefined>, () => void];
