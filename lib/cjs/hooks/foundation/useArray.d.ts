/// <reference types="react" />
declare const useArray: (defaultValue: any[]) => {
    array: any[];
    set: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    push: (element: any) => void;
    filter: (callback: any) => void;
    update: (index: number, newElement: any) => void;
    remove: (index: number) => void;
    clear: () => void;
};
export default useArray;
