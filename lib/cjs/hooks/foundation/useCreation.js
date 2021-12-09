"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useCreation/index.en-US.md
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
function useCreation(factory, deps) {
    var current = (0, react_1.useRef)({
        deps: deps,
        obj: undefined,
        initialized: false,
    }).current;
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = factory();
        current.initialized = true;
    }
    return current.obj;
}
exports.default = useCreation;
function depsAreSame(oldDeps, deps) {
    if (oldDeps === deps)
        return true;
    for (var i = 0; i < oldDeps.length; i++) {
        if (oldDeps[i] !== deps[i])
            return false;
    }
    return true;
}
