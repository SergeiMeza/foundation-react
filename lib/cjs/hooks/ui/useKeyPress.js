"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dom_1 = require("../../utils/dom");
// Keyboard event keyCode alias
var aliasKeyCodeMap = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    delete: [8, 46],
};
// Keyboard event key alias
var aliasKeyMap = {
    esc: 'Escape',
    tab: 'Tab',
    enter: 'Enter',
    space: ' ',
    // IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    delete: ['Backspace', 'Delete'],
};
// Modifiers
var modifierKey = {
    ctrl: function (event) { return event.ctrlKey; },
    shift: function (event) { return event.shiftKey; },
    alt: function (event) { return event.altKey; },
    meta: function (event) { return event.metaKey; },
};
// Return empty object
var noop = function () { };
/**
 * Judging the object type
 * @param [obj: any] Parameter object
 * @returns String
 */
function isType(obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object (.+)\]$/, '$1')
        .toLowerCase();
}
/**
 * Determine whether the key is activated
 * @param [event: KeyboardEvent] Keyboard events
 * @param [keyFilter: any] Current key
 * @returns Boolean
 */
function genFilterKey(event, keyFilter) {
    // When the browser automatically completes the input,
    // it will trigger the keyDown and keyUp events,
    // but at this time event.key etc. are empty
    if (!event.key) {
        return false;
    }
    var type = isType(keyFilter);
    // The numeric type directly matches the keyCode of the event
    if (type === 'number') {
        return event.keyCode === keyFilter;
    }
    // String to determine whether there is a combination key in turn
    var genArr = keyFilter.split('.');
    var genLen = 0;
    for (var _i = 0, genArr_1 = genArr; _i < genArr_1.length; _i++) {
        var key = genArr_1[_i];
        // Key combination
        var genModifier = modifierKey[key];
        // key alias
        var aliasKey = aliasKeyMap[key];
        // keyCode alias
        var aliasKeyCode = aliasKeyCodeMap[key];
        /**
         * Meet the above rules
         * 1. Custom composite key alias
         * 2. Custom key alias
         * 3. Custom keyCode alias
         * 4. Match key or keyCode
         */
        if ((genModifier && genModifier(event)) ||
            (aliasKey && isType(aliasKey) === 'array'
                ? aliasKey.includes(event.key)
                : aliasKey === event.key) ||
            (aliasKeyCode && isType(aliasKeyCode) === 'array'
                ? aliasKeyCode.includes(event.keyCode)
                : aliasKeyCode === event.keyCode) ||
            event.key.toUpperCase() === key.toUpperCase()) {
            genLen++;
        }
    }
    return genLen === genArr.length;
}
/**
 * Keyboard input preprocessing method
 * @param [keyFilter: any] Current key
 * @returns () => Boolean
 */
function genKeyFormater(keyFilter) {
    var type = isType(keyFilter);
    if (type === 'function') {
        return keyFilter;
    }
    if (type === 'string' || type === 'number') {
        return function (event) { return genFilterKey(event, keyFilter); };
    }
    if (type === 'array') {
        return function (event) {
            return keyFilter.some(function (item) { return genFilterKey(event, item); });
        };
    }
    return keyFilter ? function () { return true; } : function () { return false; };
}
var defaultEvents = ['keydown'];
/**
 * A hook that elegantly manages KeyboardEvent of keyup and keydown.
 *
 * Keyboard key combinations are supported to define key and keyCode alias input for keyboard events.
 */
function useKeyPress(keyFilter, eventHandler, option) {
    if (eventHandler === void 0) { eventHandler = noop; }
    if (option === void 0) { option = {}; }
    var _a = option.events, events = _a === void 0 ? defaultEvents : _a, target = option.target;
    var callbackRef = (0, react_1.useRef)(eventHandler);
    callbackRef.current = eventHandler;
    (0, react_1.useEffect)(function () {
        var callbackHandler = function (event) {
            var genGuard = genKeyFormater(keyFilter);
            if (genGuard(event)) {
                return callbackRef.current(event);
            }
        };
        var el = (0, dom_1.getTargetElement)(target, window);
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var eventName = events_1[_i];
            el.addEventListener(eventName, callbackHandler);
        }
        return function () {
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var eventName = events_2[_i];
                el.removeEventListener(eventName, callbackHandler);
            }
        };
    }, [events, keyFilter, target]);
}
exports.default = useKeyPress;
