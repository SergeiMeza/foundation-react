/**
 * A hook that can handle the setInterval timer function.
 */
export default function useInterval(fn: () => void, delay: number | null | undefined, options?: {
    immediate?: boolean;
}): void;
