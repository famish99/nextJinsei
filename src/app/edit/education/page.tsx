import { getData } from '@/app/resumeData'
import { EducationEditor } from '@/components/editors/EducationEditor'

export default async function EditEducationPage() {
  const { education } = await getData()

  return <EducationEditor education={education} />
}
