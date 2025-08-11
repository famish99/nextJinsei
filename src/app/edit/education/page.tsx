import { getData } from '@/app/resumeData'
import { EducationEditor } from '@/components/editors/EducationEditor'

export default async function EditEducationPage() {
  const resumeData = await getData()

  return (
    <EducationEditor
      education={resumeData.education}
      resumeId={resumeData.id}
    />
  )
}
