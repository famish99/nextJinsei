'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function BackToResumeLink() {
  const router = useRouter()

  return (
    <Link
      href="/"
      onClick={() => {
        router.refresh()
      }}
      className="text-blue-500 hover:text-blue-700"
    >
      ← Back to Resume
    </Link>
  )
}
