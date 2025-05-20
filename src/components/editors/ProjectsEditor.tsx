'use client'

import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { saveProjects } from '@/app/actions/projects'
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

  return (
    <form 
      action={async (formData) => {
        const result = await saveProjects(formData, items.length)
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
            required
            placeholder="Project name"
          />

          <FormInput
            label="Tech Stack"
            name={`${index}.stack`}
            value={item.stack}
            required
            placeholder="e.g. React, Node.js, PostgreSQL"
          />

          <FormInput
            label="Description"
            name={`${index}.description`}
            value={item.description}
            required
            placeholder="Brief project description"
          />

          <FormInput
            label="Link"
            name={`${index}.link`}
            value={item.link}
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
