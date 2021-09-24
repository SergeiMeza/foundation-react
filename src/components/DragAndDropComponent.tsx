import React, { useState } from 'react'
import useDrag from '../lib/hooks/ui/useDrag'
import useDrop from '../lib/hooks/ui/useDrop'

export const DragAndDropComponent = () => {
  const [dragging, setDragging] = useState<string | null>(null)

  const getDragProps = useDrag({
    onDragStart: (data) => {
      setDragging(data)
    },
    onDragEnd: () => {
      setDragging(null)
    },
  })

  const [props, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(e)
      alert(`text: ${text} dropped`)
    },
    onFiles: (files, e) => {
      console.log(e, files)
      alert(`${files.length} files dropped`)
    },
    onUri: (uri, e) => {
      console.log(e)
      alert(`uri: ${uri} dropped`)
    },
    onDom: (content: string) => {
      alert(`custom: ${content} dropped`)
    },
  })

  return (
    <div>
      <div
        style={{
          border: '1px dashed #e8e8e8',
          padding: 16,
          textAlign: 'center',
        }}
        {...props}
      >
        <div>{isHovering ? 'release here' : 'drop here'}</div>
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {Array.from(Array(5)).map((e, i) => (
          <div
            {...getDragProps(`box${i}`)}
            style={{
              border: '1px solid #e8e8e8',
              padding: 16,
              width: 80,
              textAlign: 'center',
              marginRight: 16,
            }}
          >
            box{i}
          </div>
        ))}
      </div>
      <div>{dragging ? <>dragging {dragging}</> : 'not dragging'}</div>
    </div>
  )
}
