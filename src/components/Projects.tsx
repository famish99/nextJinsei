import { getCachedProjectSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'
import { classStr } from '@/app/utils'

export const Projects = async () => {
  try {
    const data = await getData()
    const style = await getCachedProjectSectionStyle()

    if (!data?.projects) {
      return (
        <section className={style.sectionSpacing} id="projects">
          <h2 className={style.header}>TECHNICAL PROJECTS</h2>
          <div>Loading projects...</div>
        </section>
      )
    }

    const projectItems = data.projects.map(
      ({ title, link, stack, description }) => {
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
      },
    )
    return (
      <section className={style.sectionSpacing} id="projects">
        <h2 className={style.header}>TECHNICAL PROJECTS</h2>
        {projectItems}
      </section>
    )
  } catch (error) {
    console.error('Failed to load projects:', error)
    return (
      <div>Error loading projects</div>
    )
  }
}
