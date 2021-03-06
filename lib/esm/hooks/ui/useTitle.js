import { useEffect, useRef } from 'react';
import { useUnmount } from '../..';
var DEFAULT_OPTIONS = {
    restoreOnUnmount: false,
};
function useTitle(title, options) {
    if (options === void 0) { options = DEFAULT_OPTIONS; }
    var titleRef = useRef(document.title);
    useEffect(function () {
        document.title = title;
    }, [title]);
    useUnmount(function () {
        if (options && options.restoreOnUnmount) {
            document.title = titleRef.current;
        }
    });
}
export default typeof document !== 'undefined' ? useTitle : function () { };
