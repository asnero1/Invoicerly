'use client'

import React, { useState } from 'react'
import { Task } from '@/types'

interface EditableCellProps {
  value: string | boolean
  taskId: string
  field: keyof Task
  onUpdate: (taskId: string, field: keyof Task, value: string | boolean) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  taskId,
  field,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false)
  const [currentValue, setCurrentValue] = useState(value.toString())

  const handleBlur = () => {
    if (currentValue !== value.toString()) {
      const parsedValue: string | boolean =
        currentValue === 'true'
          ? true
          : currentValue === 'false'
            ? false
            : currentValue

      onUpdate(taskId, field, parsedValue)
    }
    setEditing(false)
  }

  return editing ? (
    <input
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      autoFocus
      className="border p-1 rounded w-full"
    />
  ) : (
    <div
      onClick={() => setEditing(true)}
      className="cursor-pointer px-1 py-0.5 hover:bg-gray-100 rounded"
    >
      {value?.toString() || '—'}
    </div>
  )
}

export default EditableCell
