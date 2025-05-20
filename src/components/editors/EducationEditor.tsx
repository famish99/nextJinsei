'use client'

import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { saveEducation } from '@/app/actions/education'
import { useState } from 'react'

interface EducationData {
  institution: string
  location?: string
  startDate: string
  endDate: string
  degree: string
}

interface EducationEditorProps {
  education: EducationData[]
}

export function EducationEditor({ education }: EducationEditorProps) {
  const [items, setItems] = useState<EducationData[]>(education)
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    setItems([
      ...items,
      {
        institution: '',
        startDate: '',
        endDate: '',
        degree: '',
      },
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <form 
      action={async (formData) => {
        const result = await saveEducation(formData, items.length)
        if (result.error) {
          setError(result.error)
        } else {
          setError(null)
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      {error && <ErrorBanner message={error} />}

      {items.map((item, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Education {index + 1}</h3>
            <Button
              type="button"
              variant="danger"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              Remove Education
            </Button>
          </div>

          <FormInput
            label="Institution"
            name={`${index}.institution`}
            value={item.institution}
            required
          />

          <FormInput
            label="Location"
            name={`${index}.location`}
            value={item.location || ''}
            placeholder="e.g. New York, NY"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start Date"
              name={`${index}.startDate`}
              value={item.startDate}
              required
              placeholder="e.g. 2018-09"
            />

            <FormInput
              label="End Date"
              name={`${index}.endDate`}
              value={item.endDate}
              required
              placeholder="e.g. 2022-05 or Present"
            />
          </div>

          <FormInput
            label="Degree"
            name={`${index}.degree`}
            value={item.degree}
            required
            placeholder="e.g. Bachelor of Science in Computer Science"
          />
        </div>
      ))}

      <div className="flex gap-4">
        <Button type="button" variant="secondary" onClick={addItem}>
          Add Education
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  )
}
 