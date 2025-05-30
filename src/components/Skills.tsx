import { SKILL_SECTION_STYLE as style } from '@/app/constants'
import { getData } from '@/app/resumeData'
import kebabCase from 'kebab-case'

export const Skills = () => {
  const { skills } = getData()

  const skillSections = skills.map(({ title, items }) => {
    const skillItems = items.map((skill) => (
      <li className={style.skillBoxStyle} key={skill}>
        {skill}
      </li>
    ))

    return (
      <section
        className={style.subsectionSpacing}
        id={kebabCase(title.replaceAll(' ', ''), false)}
        key={title}
      >
        <header>
          <h3 className={style.title}>{title}</h3>
        </header>
        <div className={style.itemSpacing}>
          <ul className={style.skillContainerStyle}>{skillItems}</ul>
        </div>
      </section>
    )
  })
  return (
    <section className={style.sectionSpacing} id="skills">
      <h2 className={style.header}>SKILLS</h2>
      {skillSections}
    </section>
  )
}
