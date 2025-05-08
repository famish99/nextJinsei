import { getData } from '@/app/resumeData'

export function Profile() {
  const { profile } = getData()
  const profileItems = profile.map(({ text, type }) => (
    <p className="mt-2 ml-1.5 text-sm text-gray-700 leading-normal" key={text}>
      <span className="-ml-2 select-none text-gray-600">› </span>
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
    <section className="mt-8 first:mt-0" id="profile">
      <h2 className="mb-0 font-bold tracking-widest text-sm2 text-purple-700 ">
        PROFILE
      </h2>

      <section className="mb-0 grid grid-cols-1 ">{profileItems}</section>
    </section>
  )
}
