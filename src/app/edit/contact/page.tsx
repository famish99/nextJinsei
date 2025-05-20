import { getData } from '@/app/resumeData'
import { ContactEditor } from '@/components/editors/ContactEditor'

export default function EditContactPage() {
  const { contacts } = getData()

  return <ContactEditor contacts={contacts} />
}
