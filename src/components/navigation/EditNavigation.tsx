'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sections = [
  { name: 'Header', path: '/edit/header' },
  { name: 'Contact', path: '/edit/contact' },
  { name: 'Profile', path: '/edit/profile' },
  { name: 'Experience', path: '/edit' },
  { name: 'Skills', path: '/edit/skills' },
  { name: 'Projects', path: '/edit/projects' },
  { name: 'Education', path: '/edit/education' },
  { name: 'Styles', path: '/edit/styles' },
]

export function EditNavigation() {
  const pathname = usePathname()

  return (
    <nav className="mb-8">
      <ul className="flex gap-4 border-b">
        {sections.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              className={`
                inline-block px-4 py-2 -mb-px
                ${
                  pathname === path
                    ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
