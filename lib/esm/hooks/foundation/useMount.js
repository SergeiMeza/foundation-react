import { useEffect } from 'react';
/**
 * A hook that executes a function at mount.
 */
export default function useMount(fn) {
    useEffect(function () {
        fn();
    }, []);
}
