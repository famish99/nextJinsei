import { getData } from '@/app/resumeData'
import { SkillsEditor } from '@/components/editors/SkillsEditor'

export default function EditSkillsPage() {
  const { skills } = getData()

  return <SkillsEditor skills={skills} />
}
