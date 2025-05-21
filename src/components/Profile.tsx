import { PROFILE_SECTION_STYLE as style } from '@/app/constants'
import { getData } from '@/app/resumeData'
import { classStr } from '@/app/utils'

export function Profile() {
  const { profile } = getData()
  const profileItems = profile.map(({ text, type }) => (
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
}
