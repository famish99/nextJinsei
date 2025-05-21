'use client'

import { saveHeader } from '@/app/actions/header'
import { Button } from '@/components/form/Button'
import { ErrorBanner } from '@/components/form/ErrorBanner'
import { FormInput } from '@/components/form/FormInput'
import { useRouter } from 'next/navigation'
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
  const [formData, setFormData] = useState<HeaderData>(header)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const updateField = (field: keyof HeaderData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await saveHeader(formData)
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
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={(e) => updateField('firstName', e.target.value)}
        required
      />

      <FormInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={(e) => updateField('lastName', e.target.value)}
        required
      />

      <FormInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={(e) => updateField('title', e.target.value)}
        required
        placeholder="e.g. Software Engineer"
      />

      <Button type="submit" variant="primary">
        Save Changes
      </Button>
    </form>
  )
}
