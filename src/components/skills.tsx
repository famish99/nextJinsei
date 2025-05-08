import { getData } from '@/app/resumeData'
import kebabCase from 'kebab-case'

export const Skills = () => {
  const { skills } = getData()

  const skillSections = skills.map(({ title, items }) => {
    const skillItems = items.map((skill) => (
      <li
        className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200"
        key={skill}
      >
        {skill}
      </li>
    ))

    return (
      <section className="mb-2" id={kebabCase(title, false)} key={title}>
        <header>
          <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
            {title}
          </h3>
        </header>
        <div className="mt-2 last:pb-1.5">
          <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
            {skillItems}
          </ul>
        </div>
      </section>
    )
  })
  return (
    <section className="col-span-1 mt-8 first:mt-0" id="skills">
      <h2 className="mb-4 font-bold tracking-widest text-sm2 text-purple-700">
        SKILLS
      </h2>
      {skillSections}
    </section>
  )
}
