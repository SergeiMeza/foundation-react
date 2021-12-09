"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var getProps = function (callback, setIsHovering) { return ({
    onDragOver: function (event) {
        event.preventDefault();
    },
    onDragEnter: function (event) {
        event.preventDefault();
        setIsHovering(true);
    },
    onDragLeave: function () {
        setIsHovering(false);
    },
    onDrop: function (event) {
        event.preventDefault();
        event.persist();
        setIsHovering(false);
        callback(event.dataTransfer, event);
    },
    onPaste: function (event) {
        event.persist();
        callback(event.clipboardData, event);
    },
}); };
/**
 * A pair of hooks to help you manage data transfer between drag and drop
 *
 * useDrop can be used alone to accept file, text or uri dropping.
 *
 * useDrag should be used along with useDrop.
 *
 * Paste into the drop area will also be treated as content drop.
 */
function useDrop(options) {
    if (options === void 0) { options = {}; }
    var optionsRef = (0, react_1.useRef)(options);
    optionsRef.current = options;
    var _a = (0, react_1.useState)(false), isHovering = _a[0], setIsHovering = _a[1];
    var callback = (0, react_1.useCallback)(function (dataTransfer, event) {
        var uri = dataTransfer.getData('text/uri-list');
        var dom = dataTransfer.getData('custom');
        if (dom && optionsRef.current.onDom) {
            var data = dom;
            try {
                data = JSON.parse(dom);
            }
            catch (e) {
                data = dom;
            }
            optionsRef.current.onDom(data, event);
            return;
        }
        if (uri && optionsRef.current.onUri) {
            optionsRef.current.onUri(uri, event);
            return;
        }
        if (dataTransfer.files &&
            dataTransfer.files.length &&
            optionsRef.current.onFiles) {
            optionsRef.current.onFiles(Array.from(dataTransfer.files), event);
            return;
        }
        if (dataTransfer.items &&
            dataTransfer.items.length &&
            optionsRef.current.onText) {
            dataTransfer.items[0].getAsString(function (text) {
                optionsRef.current.onText(text, event);
            });
        }
    }, []);
    var props = (0, react_1.useMemo)(function () { return getProps(callback, setIsHovering); }, [callback, setIsHovering]);
    return [props, { isHovering: isHovering }];
}
exports.default = useDrop;
