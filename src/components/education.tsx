import { getData } from '@/app/resumeData'

export function Education() {
  const { education } = getData()
  const educationItems = education.map(
    ({ institution, location, startDate, endDate, degree }) => {
      return (
        <section className="mb-4" key={degree}>
          <header>
            <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
              {institution}
              {location && ' – ' + location}
            </h3>
            <p className="leading-normal text-sm text-gray-650">
              {startDate} – {endDate}
            </p>
          </header>
          <p className="mt-1.5 text-sm text-gray-800 leading-normal">
            {degree}
          </p>
        </section>
      )
    },
  )
  return (
    <section className="col-span-3 mt-4 first:mt-0" id="education">
      <h2 className="mb-4 font-bold tracking-widest text-sm2 text-purple-700">
        EDUCATION
      </h2>
      {educationItems}
    </section>
  )
}
