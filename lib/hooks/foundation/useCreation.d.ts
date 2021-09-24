/**
 *
 * useCreation is the replacement for useMemo or useRef.
 *
 * useMemo can't guarantee the memoized value will not be recalculated, while useCreation can guarantee that. As the the official document of React.js says:
 *
 * You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.
 *
 * And similar to useRef, you can use useCreation to create some constants. But useCreation can avoid performance hazards.
 */
export default function useCreation<T>(factory: () => T, deps: any[]): T;
