'use client'

interface TaskListProps {
  tasks: string[]
  name: string
}

export function TaskList({ tasks, name }: TaskListProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Tasks</label>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              name={`${name}.${index}`}
              defaultValue={task}
              className="flex-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
              placeholder="Enter task description..."
              required
            />
          </div>
        ))}
      </div>
    </div>
  )
}
