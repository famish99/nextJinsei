'use client'

import { ExperienceItem } from '@/app/resumeData'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { TaskList } from '@/components/form/TaskList'
import { saveExperience } from '@/app/actions/experience'
import { useState } from 'react'

interface ExperienceFormData extends ExperienceItem {
  isNew?: boolean
}

interface ExperienceEditorProps {
  experience: ExperienceItem[]
}

export function ExperienceEditor({ experience }: ExperienceEditorProps) {
  const [items, setItems] = useState<ExperienceFormData[]>(experience)
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    setItems([
      ...items,
      {
        employer: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        tasks: [''],
        isNew: true,
      },
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <form 
      action={async (formData) => {
        items.forEach((item, index) => {
          formData.append(`${index}.taskCount`, item.tasks.length.toString())
        })
        const result = await saveExperience(formData, items.length)
        if (result.error) {
          setError(result.error)
        } else {
          setError(null)
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      {error && <ErrorBanner message={error} />}

      <Button type="button" variant="secondary" onClick={addItem}>
        Add Experience
      </Button>

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
            required
            placeholder="Company name"
          />

          <FormInput
            label="Title"
            name={`${index}.title`}
            value={item.title}
            required
            placeholder="Your role"
          />

          <FormInput
            label="Location"
            name={`${index}.location`}
            value={item.location}
            required
            placeholder="e.g. New York, NY"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start Date"
              name={`${index}.startDate`}
              value={item.startDate}
              required
              placeholder="e.g. 2020-01"
            />

            <FormInput
              label="End Date"
              name={`${index}.endDate`}
              value={item.endDate}
              required
              placeholder="e.g. 2023-12 or Present"
            />
          </div>

          <TaskList tasks={item.tasks} name={`${index}.tasks`} />
        </div>
      ))}

      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </form>
  )
}
