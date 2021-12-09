import { useRef } from 'react';
var usePrevious = function (value) {
    var currentRef = useRef(value);
    var previousRef = useRef();
    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }
    return previousRef.current;
};
export default usePrevious;
