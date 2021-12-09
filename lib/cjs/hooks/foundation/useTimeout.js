"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var usePersistFn_1 = __importDefault(require("./usePersistFn"));
/**
 * A hook that can handle the setTimeout timer function.
 * */
function useTimeout(fn, delay) {
    var timerFn = (0, usePersistFn_1.default)(fn);
    (0, react_1.useEffect)(function () {
        if (delay === undefined || delay === null)
            return;
        var timer = setTimeout(function () {
            timerFn();
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [delay, timerFn]);
}
exports.default = useTimeout;
