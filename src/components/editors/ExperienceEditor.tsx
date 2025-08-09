'use client'

import { saveExperience } from '@/app/actions/experience'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { TaskList } from '@/components/form/TaskList'
import { ExperienceItem } from '@/types/resume'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ExperienceFormData extends ExperienceItem {
  isNew?: boolean
}

interface ExperienceEditorProps {
  experience: ExperienceItem[] | null
}

export function ExperienceEditor({ experience }: ExperienceEditorProps) {
  const [items, setItems] = useState<ExperienceFormData[]>(experience || [])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const addItem = () => {
    setItems([
      {
        employer: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        tasks: [''],
        isNew: true,
      },
      ...items,
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateField = (
    index: number,
    field: keyof ExperienceItem,
    value: string,
  ) => {
    const newItems = [...items]
    if (field === 'tasks') return // tasks are handled separately
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    setItems(newItems)
  }

  const updateTasks = (index: number, tasks: string[]) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      tasks,
    }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveExperience(items)
    if (result.error) {
      setError(result.error)
    } else {
      setError(null)
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <ErrorBanner message={error} />}

      <div className="flex gap-4">
        <Button type="button" variant="secondary" onClick={addItem}>
          Add Experience
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Experience {index + 1}</h3>
            <Button
              type="button"
              variant="danger"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              Remove Experience
            </Button>
          </div>

          <FormInput
            label="Employer"
            name={`${index}.employer`}
            value={item.employer}
            onChange={(e) => updateField(index, 'employer', e.target.value)}
            required
            placeholder="Company name"
          />

          <FormInput
            label="Title"
            name={`${index}.title`}
            value={item.title}
            onChange={(e) => updateField(index, 'title', e.target.value)}
            required
            placeholder="Your role"
          />

          <FormInput
            label="Location"
            name={`${index}.location`}
            value={item.location}
            onChange={(e) => updateField(index, 'location', e.target.value)}
            required
            placeholder="e.g. New York, NY"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start Date"
              name={`${index}.startDate`}
              value={item.startDate}
              onChange={(e) => updateField(index, 'startDate', e.target.value)}
              required
              placeholder="e.g. 2020-01"
            />

            <FormInput
              label="End Date"
              name={`${index}.endDate`}
              value={item.endDate}
              onChange={(e) => updateField(index, 'endDate', e.target.value)}
              required
              placeholder="e.g. 2023-12 or Present"
            />
          </div>

          <TaskList
            tasks={item.tasks}
            onChange={(tasks) => updateTasks(index, tasks)}
          />
        </div>
      ))}
    </form>
  )
}
