'use client'

import { saveEducation } from '@/app/actions/education'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { EducationData } from '@/types/resume'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EducationEditorProps {
  education: EducationData[]
}

export function EducationEditor({ education }: EducationEditorProps) {
  const [items, setItems] = useState<EducationData[]>(education)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const addItem = () => {
    setItems([
      {
        institution: '',
        startDate: '',
        endDate: '',
        degree: '',
      },
      ...items,
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateField = (
    index: number,
    field: keyof EducationData,
    value: string,
  ) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveEducation(items)
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
          Add Education
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>

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
            onChange={(e) => updateField(index, 'institution', e.target.value)}
            required
          />

          <FormInput
            label="Location"
            name={`${index}.location`}
            value={item.location || ''}
            onChange={(e) => updateField(index, 'location', e.target.value)}
            placeholder="e.g. New York, NY"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start Date"
              name={`${index}.startDate`}
              value={item.startDate}
              onChange={(e) => updateField(index, 'startDate', e.target.value)}
              required
              placeholder="e.g. 2018-09"
            />

            <FormInput
              label="End Date"
              name={`${index}.endDate`}
              value={item.endDate}
              onChange={(e) => updateField(index, 'endDate', e.target.value)}
              required
              placeholder="e.g. 2022-05 or Present"
            />
          </div>

          <FormInput
            label="Degree"
            name={`${index}.degree`}
            value={item.degree}
            onChange={(e) => updateField(index, 'degree', e.target.value)}
            required
            placeholder="e.g. Bachelor of Science in Computer Science"
          />
        </div>
      ))}
    </form>
  )
}
