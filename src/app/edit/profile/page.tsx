import { getData } from '@/app/resumeData'
import { ProfileEditor } from '@/components/editors/ProfileEditor'

export default function EditProfilePage() {
  const { profile } = getData()

  return <ProfileEditor profile={profile} />
}
