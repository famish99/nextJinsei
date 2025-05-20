import { getData } from '@/app/resumeData'
import { EducationEditor } from '@/components/editors/EducationEditor'

export default function EditEducationPage() {
  const { education } = getData()

  return <EducationEditor education={education} />
}
