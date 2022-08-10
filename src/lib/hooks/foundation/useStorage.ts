import { useCallback, useState, useEffect } from 'react'

enum StorageType {
  SESSION = 'session',
  LOCAL = 'local',
}

const useStorage = <T>(
  key: string,
  defaultValue: T | (() => T),
  storageType: StorageType,
): readonly [T | undefined, React.Dispatch<T | undefined>, () => void] => {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    let storageObject =
      storageType === StorageType.LOCAL
        ? window.localStorage
        : window.sessionStorage

    const jsonValue = storageObject.getItem(key)

    if (jsonValue !== null) {
      setValue(JSON.parse(jsonValue))
    } else {
      if (typeof defaultValue === 'function') {
        setValue((defaultValue as () => T)())
      } else {
        setValue(defaultValue)
      }
    }
  }, [defaultValue, key, storageType])

  useEffect(() => {
    let storageObject =
      storageType === StorageType.LOCAL
        ? window.localStorage
        : window.sessionStorage

    if (value === undefined || value === null) {
      storageObject.removeItem(key)
    } else {
      storageObject.setItem(key, JSON.stringify(value))
    }
  }, [key, value, storageType])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove] as const
}

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): readonly [T | undefined, React.Dispatch<T | undefined>, () => void] => {
  return useStorage<T>(key, defaultValue, StorageType.LOCAL)
}

export const useSessionStorage = <T>(
  key: string,
  defaultValue: T,
): readonly [T | undefined, React.Dispatch<T | undefined>, () => void] => {
  return useStorage(key, defaultValue, StorageType.SESSION)
}
