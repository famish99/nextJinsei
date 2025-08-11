import { getData } from '@/app/resumeData'
import { ContactEditor } from '@/components/editors/ContactEditor'

export default async function EditContactPage() {
  const resumeData = await getData()

  return <ContactEditor contacts={resumeData.contacts} resumeId={resumeData.id} />
}
