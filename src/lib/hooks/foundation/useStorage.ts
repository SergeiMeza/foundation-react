import { useCallback, useState, useEffect } from 'react'

export const useLocalStorage = (
  key: string,
  defaultValue: any,
): readonly [any, React.Dispatch<any>, () => void] => {
  return useStorage(key, defaultValue, StorageType.LOCAL)
}

export const useSessionStorage = (
  key: string,
  defaultValue: any,
): readonly [any, React.Dispatch<any>, () => void] => {
  return useStorage(key, defaultValue, StorageType.SESSION)
}

enum StorageType {
  SESSION = 'session',
  LOCAL = 'local',
}

const useStorage = (
  key,
  defaultValue,
  storageType: StorageType,
): readonly [any, React.Dispatch<any>, () => void] => {
  const [value, setValue] = useState<any>()

  useEffect(() => {
    let storageObject =
      storageType === StorageType.LOCAL
        ? window.localStorage
        : window.sessionStorage
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) {
      setValue(JSON.parse(jsonValue))
    } else {
      if (typeof defaultValue === 'function') {
        return defaultValue()
      } else {
        return defaultValue
      }
    }
  }, [])

  useEffect(() => {
    let storageObject =
      storageType === StorageType.LOCAL
        ? window.localStorage
        : window.sessionStorage
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove] as const
}
