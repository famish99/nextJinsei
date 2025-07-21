'use client'

interface FormInputProps {
  label: string
  name: string
  type?: string
  value?: string | null
  required?: boolean
  placeholder?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  required = false,
  placeholder,
  className = '',
  onChange,
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}
