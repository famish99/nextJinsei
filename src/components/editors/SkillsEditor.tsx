'use client'

import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { saveSkills } from '@/app/actions/skills'
import { useState } from 'react'

interface SkillSection {
  title: string
  items: string[]
}

interface SkillsEditorProps {
  skills: SkillSection[]
}

export function SkillsEditor({ skills }: SkillsEditorProps) {
  const [sections, setSections] = useState<SkillSection[]>(skills)
  const [error, setError] = useState<string | null>(null)

  const addSection = () => {
    setSections([...sections, { title: '', items: [''] }])
  }

  const removeSection = (sectionIndex: number) => {
    setSections(sections.filter((_, i) => i !== sectionIndex))
  }

  const addSkillItem = (sectionIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].items.push('')
    setSections(newSections)
  }

  const removeSkillItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter(
      (_, i) => i !== itemIndex
    )
    setSections(newSections)
  }

  return (
    <form 
      action={async (formData) => {
        formData.append('itemCount', sections.length.toString())
        sections.forEach((section, index) => {
          formData.append(`${index}.itemCount`, section.items.length.toString())
        })
        const result = await saveSkills(formData, sections.length)
        if (result.error) {
          setError(result.error)
        } else {
          setError(null)
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      {error && <ErrorBanner message={error} />}

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <FormInput
              label="Section Title"
              name={`${sectionIndex}.title`}
              value={section.title}
              required
              className="flex-grow"
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => removeSection(sectionIndex)}
              disabled={sections.length === 1}
              className="mt-8 ml-4"
            >
              Remove Section
            </Button>
          </div>

          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-2">
                <FormInput
                  label={`Skill ${itemIndex + 1}`}
                  name={`${sectionIndex}.items.${itemIndex}`}
                  value={item}
                  required
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeSkillItem(sectionIndex, itemIndex)}
                  disabled={section.items.length === 1}
                  className="mt-8"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => addSkillItem(sectionIndex)}
          >
            Add Skill
          </Button>
        </div>
      ))}

      <div className="flex gap-4">
        <Button type="button" variant="secondary" onClick={addSection}>
          Add Section
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  )
}
