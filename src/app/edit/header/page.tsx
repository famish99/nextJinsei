import { getData } from '@/app/resumeData'
import { HeaderEditor } from '@/components/editors/HeaderEditor'

export default async function EditHeaderPage() {
  const resumeData = await getData()

  return <HeaderEditor header={resumeData.header} resumeId={resumeData.id} />
}
