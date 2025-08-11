import { getData } from '@/app/resumeData'
import { ExperienceEditor } from '@/components/editors/ExperienceEditor'

export default async function EditExperiencePage() {
  const resumeData = await getData()

  return <ExperienceEditor experience={resumeData.experience} resumeId={resumeData.id} />
}
