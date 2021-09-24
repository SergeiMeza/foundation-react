type getDragPropsFn = (data: any) => {
  draggable: 'true'
  key?: string
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: (e: React.DragEvent) => void
}

interface IConfig {
  onDragStart?: (data: any, e: React.DragEvent) => void
  onDragEnd?: (data: any, e: React.DragEvent) => void
  /**
   * Whether to include the default key in the object returned by the getProps method
   *
   * @default true
   */
  getPropsWithKey?: boolean
}

/**
 * A pair of hooks to help you manage data transfer between drag and drop
 *
 * useDrop can be used alone to accept file, text or uri dropping.
 *
 * useDrag should be used along with useDrop.
 *
 * Paste into the drop area will also be treated as content drop.
 */
export default function useDrag(config?: IConfig): getDragPropsFn {
  const getProps = (data: any) => {
    return {
      key:
        config && config.getPropsWithKey === false
          ? undefined
          : JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        if (config && config.onDragStart) {
          config.onDragStart(data, e)
        }
        e.dataTransfer.setData('custom', JSON.stringify(data))
      },
      onDragEnd: (e: React.DragEvent) => {
        if (config && config.onDragEnd) {
          config.onDragEnd(data, e)
        }
      },
    }
  }

  return getProps
}
