import { getCachedExperienceSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'
import { classStr } from '@/app/utils'

export async function Experience() {
  try {
    const data = await getData()
    const style = await getCachedExperienceSectionStyle()

    if (!data?.experience) {
      return (
        <section className={style.sectionSpacing} id="experience">
          <h2 className={style.header}>EXPERIENCE</h2>
          <div>Loading experience...</div>
        </section>
      )
    }

    const experienceItems = data.experience.map(
      ({ employer, title, location, startDate, endDate, tasks }) => {
        const taskItems = tasks.map((task) => (
          <li
            className={classStr(
              style.sideMargin,
              style.itemSpacing,
              ...style.text,
            )}
            key={task}
          >
            <span className={style.bullet}>› </span>
            {task}
          </li>
        ))

        return (
          <section
            className={classStr('break-inside-avoid', style.subsectionSpacing)}
            key={employer}
          >
            <header>
              <h3 id="job-title" className={style.title}>
                {title}
                <span> </span>
                <span
                  id="company-name"
                  className={classStr(
                    style.lowlightTextColor,
                    ...style.title.slice(1),
                  )}
                >
                  @ {employer}
                </span>
              </h3>
              <p
                id="work-date"
                className={classStr(...style.text, style.subtitleSpacing)}
              >
                {startDate} – {endDate} |{' '}
                <span id="location" className={style.lowlightTextColor}>
                  {' ' + location}
                </span>
              </p>
            </header>
            <ul id="work-description-bullets" className={style.listMargin}>
              {taskItems}
            </ul>
          </section>
        )
      },
    )

    return (
      <section className={style.sectionSpacing} id="experience">
        <h2 className={style.header}>EXPERIENCE</h2>
        {experienceItems}
      </section>
    )
  } catch (error) {
    console.error('Failed to load experience:', error)
    return (
      <div>Error loading experience</div>
    )
  }
}
