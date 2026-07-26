import { getData } from '@/app/resumeData'
import { ProjectsEditor } from '@/components/editors/ProjectsEditor'

export default async function EditProjectsPage() {
  const resumeData = await getData()

  return (
    <ProjectsEditor
      projects={resumeData.projects || []}
      resumeId={resumeData.id}
    />
  )
}
