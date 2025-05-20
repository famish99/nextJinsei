'use client'

interface FormInputProps {
  label: string
  value: string
  name: string
  required?: boolean
  placeholder?: string
  className?: string
}

export function FormInput({
  label,
  value,
  name,
  required = false,
  placeholder,
  className = '',
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        defaultValue={value}
        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}
