'use client'

import { saveProjects } from '@/app/actions/projects'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProjectItem {
  title: string
  stack: string
  description: string
  link: string
}

interface ProjectsEditorProps {
  projects: ProjectItem[]
}

export function ProjectsEditor({ projects = [] }: ProjectsEditorProps) {
  const [items, setItems] = useState<ProjectItem[]>(projects)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const addItem = () => {
    setItems([
      ...items,
      {
        title: '',
        stack: '',
        description: '',
        link: '',
      },
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateField = (
    index: number,
    field: keyof ProjectItem,
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
    const result = await saveProjects(items)
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

      {items.map((item, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Project {index + 1}</h3>
            <Button
              type="button"
              variant="danger"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              Remove Project
            </Button>
          </div>

          <FormInput
            label="Title"
            name={`${index}.title`}
            value={item.title}
            onChange={(e) => updateField(index, 'title', e.target.value)}
            required
            placeholder="Project name"
          />

          <FormInput
            label="Tech Stack"
            name={`${index}.stack`}
            value={item.stack}
            onChange={(e) => updateField(index, 'stack', e.target.value)}
            required
            placeholder="e.g. React, Node.js, PostgreSQL"
          />

          <FormInput
            label="Description"
            name={`${index}.description`}
            value={item.description}
            onChange={(e) => updateField(index, 'description', e.target.value)}
            required
            placeholder="Brief project description"
          />

          <FormInput
            label="Link"
            name={`${index}.link`}
            value={item.link}
            onChange={(e) => updateField(index, 'link', e.target.value)}
            required
            placeholder="Project URL or GitHub repository"
          />
        </div>
      ))}

      <div className="flex gap-4">
        <Button type="button" variant="secondary" onClick={addItem}>
          Add Project
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  )
}
