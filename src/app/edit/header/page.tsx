import { getData } from '@/app/resumeData'
import { HeaderEditor } from '@/components/editors/HeaderEditor'

export default function EditHeaderPage() {
  const { header } = getData()

  return <HeaderEditor header={header} />
}
