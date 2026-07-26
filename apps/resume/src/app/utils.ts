export function classStr(...classes: (string | null)[]) {
  return classes.filter((item) => item !== null).join(' ')
}

export async function handleEditorSave(
  endpoint: string,
  data: unknown,
  key: string,
  setError: (error: string | null) => void,
) {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [key]: data }),
    })

    if (!response.ok) {
      const message = `Failed to save ${endpoint} information`
      setError(message)
      return false
    }

    setError(null)
    return true
  } catch (error) {
    setError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    )
    return false
  }
}
