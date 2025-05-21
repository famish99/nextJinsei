'use client'

import { saveContact } from '@/app/actions/contact'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { ContactData } from '@/types/resume'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ContactEditorProps {
  contacts: ContactData
}

export function ContactEditor({ contacts }: ContactEditorProps) {
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ContactData>(contacts)
  const router = useRouter()

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => {
      if (name.startsWith('phone.')) {
        const phoneField = name.split('.')[1] as keyof typeof prev.phone
        return {
          ...prev,
          phone: {
            ...prev.phone,
            [phoneField]: value,
          },
        }
      }
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveContact(formData)
    if (result.error) {
      setError(result.error)
    } else {
      setError(null)
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <ErrorBanner message={error} />}

      <FormInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('email', e.target.value)
        }
        required
      />

      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Phone</h3>
        <FormInput
          label="Country Code"
          name="phone.countryCode"
          value={formData.phone.countryCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('phone.countryCode', e.target.value)
          }
          required
          placeholder="e.g. +1"
        />
        <FormInput
          label="Phone Number"
          name="phone.raw"
          value={formData.phone.raw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('phone.raw', e.target.value)
          }
          required
          placeholder="e.g. 5551234567"
        />
        <FormInput
          label="Formatted Phone"
          name="phone.formatted"
          value={formData.phone.formatted}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('phone.formatted', e.target.value)
          }
          required
          placeholder="e.g. (555) 123-4567"
        />
      </div>

      <FormInput
        label="LinkedIn"
        name="linkedin"
        value={formData.linkedin}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('linkedin', e.target.value)
        }
        required
      />

      <FormInput
        label="GitHub"
        name="github"
        value={formData.github || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('github', e.target.value)
        }
        placeholder="Optional"
      />

      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </form>
  )
}
