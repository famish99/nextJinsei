import { Button } from '@/components/form/Button'
import { useEffect, useRef } from 'react'
import { Swapy, createSwapy } from 'swapy'

interface TaskListProps {
  tasks: string[]
  onChange: (tasks: string[]) => void
}

export function TaskList({ tasks, onChange }: TaskListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const swapyRef = useRef<Swapy>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Cleanup previous instance
      swapyRef.current?.destroy?.()

      // Create new instance
      const swapy = createSwapy(containerRef.current)
      swapyRef.current = swapy

      swapy.onSwap((event) => {
        const newOrder = event.newSlotItemMap.asArray
        const reorderedTasks = newOrder.map(({ item }) => {
          // Handle empty tasks that use a placeholder ID
          if (item.startsWith('empty-')) {
            const index = parseInt(item.split('-')[1])
            return tasks[index]
          }
          return item
        })
        onChange(reorderedTasks)
      })
    }

    return () => {
      swapyRef.current?.destroy?.()
    }
  }, [tasks.length]) // Recreate when number of tasks changes

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
      <div ref={containerRef} className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            data-swapy-slot={`task-${index}`}
            className="flex gap-2 cursor-move"
          >
            <div
              data-swapy-item={task || `empty-${index}`}
              className="flex gap-2 flex-grow"
            >
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
          </div>
        ))}
      </div>
    </div>
  )
}
