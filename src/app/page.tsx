import { firago } from '@/app/fonts'
import { getData } from '@/app/resumeData'
import { Contact } from '@/components/Contact'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { HeaderSection } from '@/components/HeaderSection'
import { Profile } from '@/components/Profile'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

export default async function Home() {
  const { projects } = await getData()
  return (
    <main className={`${firago.className} hyphens-manual`}>
      <div
        className="
          p-6
          mx-auto
          page
          max-w-2xl
          print:max-w-letter
          md:max-w-letter md:h-letter
          xsm:p-8
          sm:p-9
          md:p-16
          bg-white
        "
      >
        <HeaderSection />
        <Contact />

        <div className="grid grid-cols-3 gap-10">
          <section className="print:col-span-2 col-span-3 md:col-span-2 mt-8 first:mt-0">
            <Profile />
            <Experience />
          </section>
          <section className="print:col-span-1 col-span-3 md:col-span-1">
            <Skills />
            {projects && <Projects />}
            <Education />
          </section>
        </div>
      </div>
    </main>
  )
}
