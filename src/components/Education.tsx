import { EDUCATION_SECTION_STYLE as style } from '@/app/constants'
import { getData } from '@/app/resumeData'

export function Education() {
  const { education } = getData()
  const educationItems = education.map(
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
}
