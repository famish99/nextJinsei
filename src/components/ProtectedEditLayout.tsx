'use client'

import { Button } from '@/components/form/Button'
import { BackToResumeLink } from '@/components/navigation/BackToResumeLink'
import { EditNavigation } from '@/components/navigation/EditNavigation'
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProtectedEditLayoutProps {
  children: React.ReactNode
}

export function ProtectedEditLayout({ children }: ProtectedEditLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser()
        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
        // router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        <div className="flex gap-4 items-center">
          <Button onClick={handleSignOut} variant="secondary">
            Sign Out
          </Button>
          <BackToResumeLink />
        </div>
      </div>
      <EditNavigation />
      {children}
    </main>
  )
}
