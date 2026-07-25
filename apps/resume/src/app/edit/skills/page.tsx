import { getData } from '@/app/resumeData'
import { SkillsEditor } from '@/components/editors/SkillsEditor'

export default async function EditSkillsPage() {
  const resumeData = await getData()

  return <SkillsEditor skills={resumeData.skills} resumeId={resumeData.id} />
}
