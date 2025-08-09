'use client'

import { ProtectedEditLayout } from '@/components/ProtectedEditLayout'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import React from 'react'

import outputs from '../../../amplify_outputs.json'

Amplify.configure(outputs)

export default function EditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.StrictMode>
      <Authenticator hideSignUp>
        <ProtectedEditLayout>{children}</ProtectedEditLayout>
      </Authenticator>
    </React.StrictMode>
  )
}
