import { PROJECT_SECTION_STYLE as style } from '@/app/constants'
import { getData } from '@/app/resumeData'
import { classStr } from '@/app/utils'

export const Projects = () => {
  const { projects } = getData()
  const projectItems =
    projects &&
    projects.map(({ title, link, stack, description }) => {
      return (
        <section className={style.subsectionSpacing} key={title}>
          <header>
            <h3 className={style.title}>{title}</h3>
            <p className={style.subtitleStyle}>
              <a
                href={`https://${link}`}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
                <span className={style.arrow}>↗</span>
              </a>
            </p>
            <p className={style.stackText}>Stack: {stack}</p>
          </header>
          <div className={classStr(style.descriptionSpacing, ...style.text)}>
            <p>{description}</p>
          </div>
        </section>
      )
    })
  return (
    <section className={style.sectionSpacing} id="projects">
      <h2 className={style.header}>TECHNICAL PROJECTS</h2>
      {projectItems}
    </section>
  )
}
