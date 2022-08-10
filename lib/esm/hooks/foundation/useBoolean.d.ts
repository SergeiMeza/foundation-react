export interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    toggle: (value?: boolean | undefined) => void;
}
/**
 * @description A hook that elegantly manages boolean values.
 */
export default function useBoolean(defaultValue?: boolean): [boolean, Actions];
