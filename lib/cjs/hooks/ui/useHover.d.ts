import { BasicTarget } from '../../utils/dom';
export interface Options {
    onEnter?: () => void;
    onLeave?: () => void;
}
export default function useHover(target: BasicTarget, options?: Options): boolean;
