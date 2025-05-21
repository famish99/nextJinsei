'use client'

import { saveProfile } from '@/app/actions/profile'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { ProfileItem } from '@/types/resume'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProfileEditorProps {
  profile: ProfileItem[]
}

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const [items, setItems] = useState<ProfileItem[]>(profile)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const addItem = () => {
    setItems([...items, { text: '', type: undefined }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const toggleType = (index: number, type: 'bold' | 'italic' | undefined) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      type: newItems[index].type === type ? undefined : type,
    }
    setItems(newItems)
  }

  const updateText = (index: number, text: string) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      text,
    }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveProfile(items)
    if (result.error) {
      setError(result.error)
    } else {
      setError(null)
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && <ErrorBanner message={error} />}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex gap-4">
              <textarea
                value={item.text}
                onChange={(e) => updateText(index, e.target.value)}
                className="flex-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[200px] text-base"
                required
                placeholder="Enter profile text..."
              />
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => toggleType(index, 'bold')}
                  className={item.type === 'bold' ? 'bg-blue-100' : ''}
                >
                  B
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => toggleType(index, 'italic')}
                  className={item.type === 'italic' ? 'bg-blue-100' : ''}
                >
                  I
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Preview:{' '}
              {item.type === 'bold' ? (
                <strong>{item.text}</strong>
              ) : item.type === 'italic' ? (
                <em>{item.text}</em>
              ) : (
                item.text
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="secondary" onClick={addItem}>
          Add Profile Item
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  )
}
