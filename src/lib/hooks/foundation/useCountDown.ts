import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import usePersistFn from './usePersistFn'

export type TDate = Date | number | string | undefined

/**
 * @description useCountdown hook options.
 */
export type Options = {
  targetDate?: TDate
  interval?: number
  onEnd?: () => void
}

/**
 * @description Formatted response
 */
export interface FormattedRes {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

/**
 * @description Calculate time left.
 */
const calcLeft = (t?: TDate) => {
  if (!t) {
    return 0
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - new Date().getTime()
  if (left < 0) {
    return 0
  }

  return left
}

/**
 * @description Parse milliseconds to days, hours, minutes, seconds, milliseconds.
 */
const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  }
}

/**
 * An elegant hook for countdown management.
 */
const useCountdown = (options?: Options) => {
  const { targetDate, interval = 1000, onEnd } = options || {}

  const [target, setTargetDate] = useState<TDate>(targetDate)
  const [timeLeft, setTimeLeft] = useState<number>(() => calcLeft(target))

  const onEndPersistFn = usePersistFn(() => {
    if (onEnd) {
      onEnd()
    }
  })

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0)
      return
    }

    // Execute once immediately
    setTimeLeft(calcLeft(target))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndPersistFn()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, interval, onEndPersistFn])

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft)
  }, [timeLeft])

  const props = [timeLeft, setTargetDate, formattedRes]

  return props
}

export default useCountdown
