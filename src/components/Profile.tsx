import { getCachedProfileSectionStyle } from '@/app/styleData'
import { getData } from '@/app/resumeData'
import { classStr } from '@/app/utils'

export async function Profile() {
  try {
    const data = await getData()
    const style = await getCachedProfileSectionStyle()

    if (!data?.profile) {
      return (
        <section className={style.sectionSpacing} id="profile">
          <h2 className={style.header}>PROFILE</h2>
          <div>Loading profile...</div>
        </section>
      )
    }

    const profileItems = data.profile.map(({ text, type }) => (
      <p
        className={classStr(style.sideMargin, style.itemSpacing, ...style.text)}
        key={text}
      >
        <span className={style.bullet}>› </span>
        {type === 'bold' ? (
          <strong>{text}</strong>
        ) : type === 'italic' ? (
          <i>{text}</i>
        ) : (
          text
        )}
      </p>
    ))

    return (
      <section className={style.sectionSpacing} id="profile">
        <h2 className={style.header}>PROFILE</h2>
        <section className="mb-0 grid grid-cols-1 ">{profileItems}</section>
      </section>
    )
  } catch (error) {
    console.error('Failed to load profile:', error)
    return (
      <div>Error loading profile</div>
    )
  }
}
