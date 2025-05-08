import { firago } from '@/app/fonts'
import { getData } from '@/app/resumeData'
import { Contact } from '@/components/contact'
import { Education } from '@/components/education'
import { Experience } from '@/components/experience'
import { HeaderSection } from '@/components/headerSection'
import { Profile } from '@/components/profile'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'

export default function Home() {
  const { projects } = getData()
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
