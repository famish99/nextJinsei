import { getData } from '@/app/resumeData'
import { HeaderEditor } from '@/components/editors/HeaderEditor'

export default async function EditHeaderPage() {
  const { header } = await getData()

  return <HeaderEditor header={header} />
}
