"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var __1 = require("../..");
var DEFAULT_OPTIONS = {
    restoreOnUnmount: false,
};
function useTitle(title, options) {
    if (options === void 0) { options = DEFAULT_OPTIONS; }
    var titleRef = (0, react_1.useRef)(document.title);
    (0, react_1.useEffect)(function () {
        document.title = title;
    }, [title]);
    (0, __1.useUnmount)(function () {
        if (options && options.restoreOnUnmount) {
            document.title = titleRef.current;
        }
    });
}
exports.default = typeof document !== 'undefined' ? useTitle : function () { };
