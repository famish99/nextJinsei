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
    <section className="mb-8 first:mt-0" id="contact">
      <h2 className="mb-2 md:mb-0 font-bold tracking-widest text-sm2 text-gray-550">
        CONTACT
      </h2>

      <ul className="print:flex-row flex flex-wrap flex-col sm:flex-row justify-between gap-2 list-inside pr-7">
        <li className="mt-1.5 leading-normal text-gray-700 text-md">
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <i className="far fa-envelope text-purple-900"></i>
            <span> </span>
            {email}
          </a>
        </li>
        <li className="mt-1.5 leading-normal text-gray-700 text-md">
          <a href={`tel:${countryCode}${raw}`}>
            <i className="fas fa-mobile-alt text-purple-900"></i>
            <span> </span>
            {countryCode} {formatted}
          </a>
        </li>
        <li className="mt-1.5 leading-normal text-gray-700 text-md">
          <a
            href={`https://${linkedin}`}
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin text-purple-900"></i>
            <span> </span>
            {linkedin}
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
        </li>
        {github && (
          <li className="mt-1.5 leading-normal text-gray-700 text-md">
            <a
              href={`https://${github}`}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github text-purple-900"></i>
              <span> </span>
              {github}
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
          </li>
        )}
      </ul>
    </section>
  )
}
