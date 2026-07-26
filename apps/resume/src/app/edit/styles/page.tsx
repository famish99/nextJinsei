import { loadStyles } from '@/app/config/styles'
import { StyleEditor } from '@/components/StyleEditor'

export default async function EditStylesPage() {
  const styleConfig = await loadStyles()
  return <StyleEditor styleConfig={styleConfig} />
}
