export type HeaderData = {
  firstName: string
  lastName: string
  title: string
}

export type ContactData = {
  email: string
  phone: {
    countryCode: string
    raw: string
    formatted: string
  }
  linkedin: string
  github?: string
}

export type ProfileItem = {
  text: string
  type?: string
}

export type ExperienceItem = {
  employer: string
  title: string
  location: string
  startDate: string
  endDate: string
  tasks: string[]
}

export type SkillSection = {
  title: string
  items: string[]
}

export type ProjectItem = {
  title: string
  stack: string
  description: string
  link: string
}

export type EducationData = {
  institution: string
  location?: string
  startDate: string
  endDate: string
  degree: string
}

export type ResumeData = {
  header: HeaderData
  contacts: ContactData
  profile: ProfileItem[]
  experience: ExperienceItem[]
  skills: SkillSection[]
  projects?: ProjectItem[]
  education: EducationData[]
}
