"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetElement = void 0;
function getTargetElement(target, defaultElement) {
    if (!target) {
        return defaultElement;
    }
    var targetElement;
    if (typeof target === 'function') {
        targetElement = target();
    }
    else if ('current' in target) {
        targetElement = target.current;
    }
    else {
        targetElement = target;
    }
    return targetElement;
}
exports.getTargetElement = getTargetElement;
