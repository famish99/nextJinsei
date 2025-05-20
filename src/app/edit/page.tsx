import { getData } from '@/app/resumeData'
import { ExperienceEditor } from '@/components/editors/ExperienceEditor'

export default function EditExperiencePage() {
  const { experience } = getData()

  return <ExperienceEditor experience={experience} />
}
