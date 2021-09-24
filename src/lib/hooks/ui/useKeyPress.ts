import { useEffect, useRef } from 'react'
import { BasicTarget, getTargetElement } from '../../utils/dom'

export type KeyPredicate = (event: KeyboardEvent) => boolean
export type KeyType = KeyboardEvent['keyCode'] | KeyboardEvent['key']
export type KeyFilter =
  | KeyType
  | Array<KeyType>
  | ((event: KeyboardEvent) => boolean)
export type EventHandler = (event: KeyboardEvent) => void
export type KeyEvent = 'keydown' | 'keyup'

export type Target = BasicTarget<HTMLElement | Document | Window>

export type EventOption = {
  events?: Array<KeyEvent>
  target?: Target
}

// Keyboard event keyCode alias
const aliasKeyCodeMap: any = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
}

// Keyboard event key alias
const aliasKeyMap: any = {
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
}

// Modifiers
const modifierKey: any = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
}

// Return empty object
const noop = () => {}

/**
 * Judging the object type
 * @param [obj: any] Parameter object
 * @returns String
 */
function isType(obj: any) {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase()
}

/**
 * Determine whether the key is activated
 * @param [event: KeyboardEvent] Keyboard events
 * @param [keyFilter: any] Current key
 * @returns Boolean
 */
function genFilterKey(event: any, keyFilter: any) {
  // When the browser automatically completes the input,
  // it will trigger the keyDown and keyUp events,
  // but at this time event.key etc. are empty
  if (!event.key) {
    return false
  }

  const type = isType(keyFilter)
  // The numeric type directly matches the keyCode of the event
  if (type === 'number') {
    return event.keyCode === keyFilter
  }
  // String to determine whether there is a combination key in turn
  const genArr = keyFilter.split('.')
  let genLen = 0
  for (const key of genArr) {
    // Key combination
    const genModifier = modifierKey[key]
    // key alias
    const aliasKey = aliasKeyMap[key]
    // keyCode alias
    const aliasKeyCode = aliasKeyCodeMap[key]
    /**
     * Meet the above rules
     * 1. Custom composite key alias
     * 2. Custom key alias
     * 3. Custom keyCode alias
     * 4. Match key or keyCode
     */
    if (
      (genModifier && genModifier(event)) ||
      (aliasKey && isType(aliasKey) === 'array'
        ? aliasKey.includes(event.key)
        : aliasKey === event.key) ||
      (aliasKeyCode && isType(aliasKeyCode) === 'array'
        ? aliasKeyCode.includes(event.keyCode)
        : aliasKeyCode === event.keyCode) ||
      event.key.toUpperCase() === key.toUpperCase()
    ) {
      genLen++
    }
  }
  return genLen === genArr.length
}

/**
 * Keyboard input preprocessing method
 * @param [keyFilter: any] Current key
 * @returns () => Boolean
 */
function genKeyFormater(keyFilter: any): KeyPredicate {
  const type = isType(keyFilter)
  if (type === 'function') {
    return keyFilter
  }
  if (type === 'string' || type === 'number') {
    return (event: KeyboardEvent) => genFilterKey(event, keyFilter)
  }
  if (type === 'array') {
    return (event: KeyboardEvent) =>
      keyFilter.some((item: any) => genFilterKey(event, item))
  }
  return keyFilter ? () => true : () => false
}

const defaultEvents: Array<KeyEvent> = ['keydown']

/**
 * A hook that elegantly manages KeyboardEvent of keyup and keydown.
 *
 * Keyboard key combinations are supported to define key and keyCode alias input for keyboard events.
 */
function useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  option: EventOption = {},
) {
  const { events = defaultEvents, target } = option
  const callbackRef = useRef(eventHandler)
  callbackRef.current = eventHandler

  useEffect(() => {
    const callbackHandler = (event) => {
      const genGuard: KeyPredicate = genKeyFormater(keyFilter)
      if (genGuard(event)) {
        return callbackRef.current(event)
      }
    }

    const el = getTargetElement(target, window)!

    for (const eventName of events) {
      el.addEventListener(eventName, callbackHandler)
    }
    return () => {
      for (const eventName of events) {
        el.removeEventListener(eventName, callbackHandler)
      }
    }
  }, [events, keyFilter, target])
}

export default useKeyPress
