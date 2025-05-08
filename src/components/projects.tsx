import { getData } from '@/app/resumeData'

export const Projects = () => {
  const { projects } = getData()
  const projectItems =
    projects &&
    projects.map(({ title, link, stack, description }) => {
      return (
        <section className="mb-4" key={title}>
          <header>
            <h3 className="text-md font-semibold tex t-gray-700 leading-snugish">
              {title}
            </h3>
            <p className="leading-normal text-sm">
              <a
                href={`https://${link}`}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
                <span
                  className="
                          inline-block
                          text-gray-550
                          print:text-black
                          font-normal
                          group-hover:text-gray-700
                          transition
                          duration-100
                          ease-in
                        "
                >
                  ↗
                </span>
              </a>
            </p>
            <p className="leading-normal text-xs text-gray-650">
              Stack: {stack}
            </p>
          </header>
          <div className="mt-1.5 text-sm text-gray-700 leading-normal">
            <p>{description}</p>
          </div>
        </section>
      )
    })
  return (
    <section className="mt-4 first:mt-0" id="projects">
      <h2 className="mb-4 font-bold tracking-widest text-sm2 text-purple-700">
        TECHNICAL PROJECTS
      </h2>
      {projectItems}
    </section>
  )
}
