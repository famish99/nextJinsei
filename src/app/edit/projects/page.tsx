import { getData } from '@/app/resumeData'
import { ProjectsEditor } from '@/components/editors/ProjectsEditor'

export default async function EditProjectsPage() {
  const { projects = [] } = await getData()

  return <ProjectsEditor projects={projects} />
}
