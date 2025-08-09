import { getCachedHeaderSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'

import { EditableTitle } from './EditableTitle'

export async function HeaderSection() {
  try {
    const data = await getData()
    const style = await getCachedHeaderSectionStyle()

    if (!data?.header) {
      return (
        <header className="flex items-center mb-5 md:mb-2 border-b-2 border-opacity-50 border-gray-400">
          <div>Loading header...</div>
        </header>
      )
    }

    const { firstName, lastName, title } = data.header

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
        <div className={style.initials}>
          <div className="initial text-center text-2xl pb-1">
            {firstName.slice(0, 1)}
          </div>
          <div className="text-center text-2xl initial">
            {lastName.slice(0, 1)}
          </div>
        </div>
        <h1 className={style.name} id="fullname">
          {firstName} {lastName}
        </h1>

        <EditableTitle title={title} className={style.title} />
      </header>
    )
  } catch (error) {
    console.error('Failed to load header:', error)
    return (
      <header className="flex items-center mb-5 md:mb-2 border-b-2 border-opacity-50 border-gray-400">
        <div>Error loading header</div>
      </header>
    )
  }
}
