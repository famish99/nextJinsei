import { BackToResumeLink } from '@/components/navigation/BackToResumeLink'
import { EditNavigation } from '@/components/navigation/EditNavigation'

export default function EditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        <BackToResumeLink />
      </div>
      <EditNavigation />
      {children}
    </main>
  )
}
