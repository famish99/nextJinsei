import { getData } from '@/app/resumeData'

export function HeaderSection() {
  const {
    header: { firstName, lastName, title },
  } = getData()
  return (
    <header
      className="
            flex
            row-gap-5
            flex-row flex-wrap
            items-center
            mb-5
            md:mb-2
            border-b-2 border-opacity-50 border-gray-400
          "
    >
      <div className="initials-container mr-5 text-base leading-none pb-3 pt-3 text-white bg-purple-800 font-medium px-3">
        <div className="initial text-center text-2xl pb-1">
          {firstName.slice(0, 1)}
        </div>
        <div className="text-center text-2xl initial">
          {lastName.slice(0, 1)}
        </div>
      </div>
      <h1 className="print:text-6xl lg:text-6xl md:text-5xl mr-auto text-3xl font-semibold text-gray-750 pb-px">
        {firstName} {lastName}
      </h1>

      <h2
        id="industry-title"
        className="print:text-3xl text-purple-700 font-sans self-center md:text-3xl text-2xl font-hairline pb-px"
      >
        <code
          className="print:text-3xl text-purple-700 font-sans self-center md:text-3xl text-2xl font-hairline pb-px"
          role="heading"
          aria-label={title}
        >
          {title}
        </code>
      </h2>
    </header>
  )
}
