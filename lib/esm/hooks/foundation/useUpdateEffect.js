import { useEffect, useRef } from 'react';
var useUpdateEffect = function (callback, dependencies) {
    var firstRenderRef = useRef(true);
    useEffect(function () {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
};
export default useUpdateEffect;
