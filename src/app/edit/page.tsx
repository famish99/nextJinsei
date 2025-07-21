import { getData } from '@/app/resumeData'
import { ExperienceEditor } from '@/components/editors/ExperienceEditor'

export default async function EditExperiencePage() {
  const { experience } = await getData()

  return <ExperienceEditor experience={experience} />
}
