import { BasicTarget } from '../../utils/dom';
export declare type KeyPredicate = (event: KeyboardEvent) => boolean;
export declare type KeyType = KeyboardEvent['keyCode'] | KeyboardEvent['key'];
export declare type KeyFilter = KeyType | Array<KeyType> | ((event: KeyboardEvent) => boolean);
export declare type EventHandler = (event: KeyboardEvent) => void;
export declare type KeyEvent = 'keydown' | 'keyup';
export declare type Target = BasicTarget<HTMLElement | Document | Window>;
export declare type EventOption = {
    events?: Array<KeyEvent>;
    target?: Target;
};
/**
 * A hook that elegantly manages KeyboardEvent of keyup and keydown.
 *
 * Keyboard key combinations are supported to define key and keyCode alias input for keyboard events.
 */
declare function useKeyPress(keyFilter: KeyFilter, eventHandler?: EventHandler, option?: EventOption): void;
export default useKeyPress;
