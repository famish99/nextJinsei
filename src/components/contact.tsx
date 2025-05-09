import { CONTACTS_SECTION_STYLE as style } from '@/app/constants'
import { getData } from '@/app/resumeData'

export function Contact() {
  const {
    contacts: {
      email,
      phone: { countryCode, raw, formatted },
      linkedin,
      github,
    },
  } = getData()
  return (
    <section className={style.sectionMargin} id="contact">
      <h2 className={style.header}>CONTACT</h2>

      <ul className="print:flex-row flex flex-wrap flex-col sm:flex-row justify-between gap-2 list-inside pr-7">
        <li className={style.text} id="email">
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <i className={`far fa-envelope ${style.highlightTextColor}`}></i>
            <span> </span>
            {email}
          </a>
        </li>
        <li className={style.text} id="phone">
          <a href={`tel:${countryCode}${raw}`}>
            <i className={`fas fa-mobile-alt ${style.highlightTextColor}`}></i>
            <span> </span>
            {countryCode} {formatted}
          </a>
        </li>
        <li className={style.text} id="linkedin">
          <a
            href={`https://${linkedin}`}
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab fa-linkedin ${style.highlightTextColor}`}></i>
            <span> </span>
            {linkedin}
            <span className={style.arrow}>↗</span>
          </a>
        </li>
        {github && (
          <li className={style.text} id="github">
            <a
              href={`https://${github}`}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-github ${style.highlightTextColor}`}></i>
              <span> </span>
              {github}
              <span className={style.arrow}>↗</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}
