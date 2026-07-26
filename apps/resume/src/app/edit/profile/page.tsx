import { getData } from '@/app/resumeData'
import { ProfileEditor } from '@/components/editors/ProfileEditor'

export default async function EditProfilePage() {
  const resumeData = await getData()

  return <ProfileEditor profile={resumeData.profile} resumeId={resumeData.id} />
}
