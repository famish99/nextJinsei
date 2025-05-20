import { getData } from '@/app/resumeData'
import { ProjectsEditor } from '@/components/editors/ProjectsEditor'

export default function EditProjectsPage() {
  const { projects = [] } = getData()

  return <ProjectsEditor projects={projects} />
}
