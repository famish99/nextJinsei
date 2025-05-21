import { Button } from '@/components/form/Button'

interface TaskListProps {
  tasks: string[]
  onChange: (tasks: string[]) => void
}

export function TaskList({ tasks, onChange }: TaskListProps) {
  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks]
    newTasks[index] = value
    onChange(newTasks)
  }

  const addTask = () => {
    onChange([...tasks, ''])
  }

  const removeTask = (index: number) => {
    onChange(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Tasks</label>
        <Button type="button" variant="secondary" onClick={addTask}>
          Add Task
        </Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={task}
              onChange={(e) => updateTask(index, e.target.value)}
              className="flex-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
              placeholder="Enter task description..."
              required
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => removeTask(index)}
              disabled={tasks.length === 1}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
