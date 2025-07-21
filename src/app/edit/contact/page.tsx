import { getData } from '@/app/resumeData'
import { ContactEditor } from '@/components/editors/ContactEditor'

export default async function EditContactPage() {
  const { contacts } = await getData()

  return <ContactEditor contacts={contacts} />
}
