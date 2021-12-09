import { BasicTarget } from '../../utils/dom';
export interface Options {
    onExitFull?: () => void;
    onFull?: () => void;
}
/**
 * A Hook for handling dom full screen.
 */
export default function useFullscreen(target?: BasicTarget, options?: Options): readonly [boolean, {
    readonly setFull: () => void;
    readonly exitFull: () => void;
    readonly toggleFull: () => void;
}];
