"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A pair of hooks to help you manage data transfer between drag and drop
 *
 * useDrop can be used alone to accept file, text or uri dropping.
 *
 * useDrag should be used along with useDrop.
 *
 * Paste into the drop area will also be treated as content drop.
 */
function useDrag(config) {
    var getProps = function (data) {
        return {
            key: config && config.getPropsWithKey === false
                ? undefined
                : JSON.stringify(data),
            draggable: 'true',
            onDragStart: function (e) {
                if (config && config.onDragStart) {
                    config.onDragStart(data, e);
                }
                e.dataTransfer.setData('custom', JSON.stringify(data));
            },
            onDragEnd: function (e) {
                if (config && config.onDragEnd) {
                    config.onDragEnd(data, e);
                }
            },
        };
    };
    return getProps;
}
exports.default = useDrag;
