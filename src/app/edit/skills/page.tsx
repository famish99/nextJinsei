import { getData } from '@/app/resumeData'
import { SkillsEditor } from '@/components/editors/SkillsEditor'

export default async function EditSkillsPage() {
  const { skills } = await getData()

  return <SkillsEditor skills={skills} />
}
