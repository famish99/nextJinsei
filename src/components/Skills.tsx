import { getCachedSkillSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'
import kebabCase from 'kebab-case'

export const Skills = async () => {
  try {
    const data = await getData()
    const style = await getCachedSkillSectionStyle()

    if (!data?.skills) {
      return (
        <section className={style.sectionSpacing} id="skills">
          <h2 className={style.header}>SKILLS</h2>
          <div>Loading skills...</div>
        </section>
      )
    }

    const skillSections = data.skills.map(({ title, items }) => {
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
  } catch (error) {
    console.error('Failed to load skills:', error)
    return (
      <div>Error loading skills</div>
    )
  }
}
