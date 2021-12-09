/**
 * A hook that sets title of the page.
 */
export interface Options {
    restoreOnUnmount?: boolean;
}
declare function useTitle(title: string, options?: Options): void;
declare const _default: typeof useTitle;
export default _default;
