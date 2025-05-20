'use client'

import { saveHeader } from '@/app/actions/header'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { useState } from 'react'

interface HeaderData {
  firstName: string
  lastName: string
  title: string
}

interface HeaderEditorProps {
  header: HeaderData
}

export function HeaderEditor({ header }: HeaderEditorProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <form 
      action={async (formData) => {
        const result = await saveHeader(formData)
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
        label="First Name"
        name="firstName"
        value={header.firstName}
        required
      />

      <FormInput
        label="Last Name"
        name="lastName"
        value={header.lastName}
        required
      />

      <FormInput
        label="Title"
        name="title"
        value={header.title}
        required
        placeholder="e.g. Software Engineer"
      />

      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </form>
  )
}
 