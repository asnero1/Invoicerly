// components/TaskSearchEnhancer.tsx
import React from 'react'

interface Props {
  search: string
  setSearch: (value: string) => void
  showBillableOnly: boolean
  setShowBillableOnly: (value: boolean) => void
}

const TaskSearchEnhancer: React.FC<Props> = ({
  search,
  setSearch,
  showBillableOnly,
  setShowBillableOnly,
}) => {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="border p-2 rounded"
      />
      <label className="flex items-center space-x-1">
        <input
          type="checkbox"
          checked={showBillableOnly}
          onChange={() => setShowBillableOnly(!showBillableOnly)}
        />
        <span>Billable only</span>
      </label>
    </div>
  )
}

export default TaskSearchEnhancer

