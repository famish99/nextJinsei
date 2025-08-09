'use client'

import { saveStyles } from '@/app/config/styles'
import { EditableStyleSection, StyleConfig } from '@/app/styleConfig'
import { useState } from 'react'

interface StyleEditorProps {
  styleConfig: StyleConfig
}

export function StyleEditor({ styleConfig }: StyleEditorProps) {
  const [config, setConfig] = useState<StyleConfig>(styleConfig)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({
    type: null,
    message: '',
  })

  if (!config) {
    return <div>Loading config</div>
  }

  const handleSave = async () => {
    try {
      await saveStyles(config)
      setStatus({
        type: 'success',
        message: 'Styles saved successfully! Refresh the page to see changes.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to save styles',
      })
    }
  }

  const handleChange = (
    section: EditableStyleSection,
    key: string,
    value: string | object,
  ) => {
    if (!config) return
    setConfig({
      ...config,
      [section]: {
        ...(config[section] as Record<string, string | object>),
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Style Configuration</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>

      {status.type && (
        <div
          className={`p-4 rounded ${
            status.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(config)
          .filter(
            ([section]) =>
              !['id', 'userId', 'createdAt', 'updatedAt'].includes(section),
          )
          .map(([section, values]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-lg font-medium capitalize">{section}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values &&
                  typeof values === 'object' &&
                  Object.entries(values).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      {typeof value === 'object' ? (
                        <div className="pl-4 space-y-4">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey} className="space-y-2">
                              <label className="block text-sm font-medium capitalize">
                                {subKey
                                  .replace(/([A-Z])/g, ' $1')
                                  .toLowerCase()}
                              </label>
                              <input
                                type="text"
                                value={subValue as string}
                                onChange={(e) => {
                                  const updatedValue = {
                                    ...(value as Record<string, string>),
                                    [subKey]: e.target.value,
                                  }
                                  handleChange(
                                    section as EditableStyleSection,
                                    key,
                                    updatedValue,
                                  )
                                }}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) =>
                            handleChange(
                              section as EditableStyleSection,
                              key,
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
