'use client'

import Link from 'next/link'
import { useState } from 'react'

interface EditableTitleProps {
  title: string
  className: string
}

export function EditableTitle({ title, className }: EditableTitleProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 id="industry-title" className={className}>
        <code className={className} aria-label={title}>
          {title}
        </code>
      </h2>
      <Link
        href="/edit"
        className={`
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          text-blue-500
          hover:text-blue-700
          print:hidden
          transition-opacity
          duration-200
          flex
          items-center
          gap-1
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <span>Edit Resume</span>
        <span className="text-lg">✎</span>
      </Link>
    </div>
  )
}
