'use client'

import { saveContact } from '@/app/actions/contact'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { useState } from 'react'

interface ContactData {
  email: string
  phone: {
    countryCode: string
    raw: string
    formatted: string
  }
  linkedin: string
  github?: string
}

interface ContactEditorProps {
  contacts: ContactData
}

export function ContactEditor({ contacts }: ContactEditorProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <form 
      action={async (formData) => {
        const result = await saveContact(formData)
        if (result.error) {
          setError(result.error)
        } else {
          setError(null)
        }
      }}
      className="space-y-6 max-w-2xl"
    >
      {error && <ErrorBanner message={error} />}

      <FormInput
        label="Email"
        name="email"
        value={contacts.email}
        required
      />

      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Phone</h3>
        <FormInput
          label="Country Code"
          name="phone.countryCode"
          value={contacts.phone.countryCode}
          required
          placeholder="e.g. +1"
        />
        <FormInput
          label="Phone Number"
          name="phone.raw"
          value={contacts.phone.raw}
          required
          placeholder="e.g. 5551234567"
        />
        <FormInput
          label="Formatted Phone"
          name="phone.formatted"
          value={contacts.phone.formatted}
          required
          placeholder="e.g. (555) 123-4567"
        />
      </div>

      <FormInput
        label="LinkedIn"
        name="linkedin"
        value={contacts.linkedin}
        required
      />

      <FormInput
        label="GitHub"
        name="github"
        value={contacts.github || ''}
        placeholder="Optional"
      />

      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </form>
  )
}
