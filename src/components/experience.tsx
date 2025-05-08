import { getData } from '@/app/resumeData'

export function Experience() {
  const { experience } = getData()

  const experienceItems = experience.map(
    ({ employer, title, location, startDate, endDate, tasks }) => {
      const taskDensity = 'mt-1'
      const taskItems = tasks.map((task) => (
        <li
          className={`${taskDensity} ml-1.5 text-sm text-gray-700 leading-normal`}
          key={task}
        >
          <span className="-ml-2 select-none text-gray-600">›</span>
          {' ' + task}
        </li>
      ))

      return (
        <section className="mb-4 break-inside-avoid" key={employer}>
          <header>
            <h3
              id="job-title"
              className="text-lg font-semibold text-gray-700 leading-snugish"
            >
              {title}
              <span> </span>
              <span id="company-name" className="text-gray-550 font-semibold">
                @ {employer}
              </span>
            </h3>
            <p
              id="work-date"
              className="leading-normal text-sm text-gray-700 mt-0.5"
            >
              {startDate} – {endDate} |{' '}
              <span id="location" className="text-gray-550">
                {' ' + location}
              </span>
            </p>
          </header>
          <ul id="work-description-bullets" className="mt-2">
            {taskItems}
          </ul>
        </section>
      )
    },
  )

  return (
    <section className="col-span-3 mt-4 first:mt-0" id="experience">
      <h2 className="mb-4 font-bold tracking-widest text-sm2 text-purple-700">
        EXPERIENCE
      </h2>

      {experienceItems}
    </section>
  )
}
