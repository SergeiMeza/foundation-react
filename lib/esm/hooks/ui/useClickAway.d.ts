import { BasicTarget } from '../../utils/dom';
declare type EventType = MouseEvent | TouchEvent;
/**
 * A hook that elegantly manages click outside of target elements.
 */
export default function useClickAway(onClickAway: (event: EventType) => void, target: BasicTarget | BasicTarget[], eventName?: string): void;
export {};
