"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, time);
    });
}
exports.sleep = sleep;
