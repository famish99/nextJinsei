'use client'

import { saveSkills } from '@/app/actions/skills'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Swapy, createSwapy } from 'swapy'

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
  const router = useRouter()
  const swapyInstancesRef = useRef<Swapy[]>([])

  useEffect(() => {
    // Initialize swapy for each skills container
    const skillContainers = document.querySelectorAll('.skills-container')

    // Cleanup previous instances
    swapyInstancesRef.current.forEach((instance) => instance.destroy?.())
    swapyInstancesRef.current = []

    skillContainers.forEach((container, sectionIndex) => {
      const swapy = createSwapy(container as HTMLElement)
      swapyInstancesRef.current.push(swapy)

      swapy.onSwap((event) => {
        const newOrder = event.newSlotItemMap.asArray
        const newSections = [...sections]
        newSections[sectionIndex].items = newOrder.map(({ item }) => item)
        setSections(newSections)
      })
    })

    // Cleanup on unmount
    return () => {
      swapyInstancesRef.current.forEach((instance) => instance.destroy?.())
      swapyInstancesRef.current = []
    }
  }, [sections.length]) // Only recreate when number of sections changes

  const addSection = () => {
    setSections([
      {
        title: '',
        items: [''],
      },
      ...sections,
    ])
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
      (_, i) => i !== itemIndex,
    )
    setSections(newSections)
  }

  const updateSectionTitle = (sectionIndex: number, title: string) => {
    const newSections = [...sections]
    newSections[sectionIndex].title = title
    setSections(newSections)
  }

  const updateSkillItem = (
    sectionIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    const newSections = [...sections]
    newSections[sectionIndex].items[itemIndex] = value
    setSections(newSections)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveSkills(sections)
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
        <Button type="button" variant="secondary" onClick={addSection}>
          Add Section
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <FormInput
                label="Section Title"
                name={`${sectionIndex}.title`}
                value={section.title}
                onChange={(e) =>
                  updateSectionTitle(sectionIndex, e.target.value)
                }
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

            <div className="skills-container space-y-2">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  data-swapy-slot={`skill-${sectionIndex}-${itemIndex}`}
                  className="flex gap-2 cursor-move"
                >
                  <div
                    data-swapy-item={item || `empty-${itemIndex}`}
                    className="flex gap-2 flex-grow"
                  >
                    <FormInput
                      label={`Skill ${itemIndex + 1}`}
                      name={`${sectionIndex}.items.${itemIndex}`}
                      value={item}
                      onChange={(e) =>
                        updateSkillItem(sectionIndex, itemIndex, e.target.value)
                      }
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
      </div>
    </form>
  )
}
