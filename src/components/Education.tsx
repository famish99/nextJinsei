import { getCachedEducationSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'

export async function Education() {
  try {
    const data = await getData()
    const style = await getCachedEducationSectionStyle()

    if (!data?.education) {
      return (
        <section className={style.sectionSpacing} id="education">
          <h2 className={style.header}>EDUCATION</h2>
          <div>Loading education...</div>
        </section>
      )
    }

    const educationItems = data.education.map(
      ({ institution, location, startDate, endDate, degree }) => {
        return (
          <section className={style.subsectionSpacing} key={degree}>
            <header>
              <h3 className={style.title}>
                {institution}
                {location && ' – ' + location}
              </h3>
              <p className={style.dateText}>
                {startDate} – {endDate}
              </p>
            </header>
            <p className={style.degreeText}>{degree}</p>
          </section>
        )
      },
    )
    return (
      <section className={style.sectionSpacing} id="education">
        <h2 className={style.header}>EDUCATION</h2>
        {educationItems}
      </section>
    )
  } catch (error) {
    console.error('Failed to load education:', error)
    return (
        <div>Error loading education</div>
    )
  }
}
