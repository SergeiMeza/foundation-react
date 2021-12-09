"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useUpdateEffect = function (callback, dependencies) {
    var firstRenderRef = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(function () {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
};
exports.default = useUpdateEffect;
