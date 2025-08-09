import { getData } from '@/app/resumeData'
import { ProfileEditor } from '@/components/editors/ProfileEditor'

export default async function EditProfilePage() {
  const { profile } = await getData()

  return <ProfileEditor profile={profile} />
}
