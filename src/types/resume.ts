export interface HeaderData {
  firstName: string
  lastName: string
  title: string
}

export interface ContactData {
  email: string
  phone: {
    countryCode: string
    raw: string
    formatted: string
  }
  linkedin: string
  github?: string | null
}

export interface ProfileItem {
  text: string
  type?: string | null
}

export interface ExperienceItem {
  employer: string
  title: string
  location: string
  startDate: string
  endDate?: string | null
  tasks: string[]
}

export interface SkillSection {
  title: string
  items: string[]
}

export interface ProjectItem {
  title: string
  stack: string
  description: string
  link: string
}

export interface EducationData {
  institution: string
  location?: string | null
  startDate: string
  endDate?: string | null
  degree: string
}

export interface ResumeData {
  header: HeaderData
  contacts: ContactData
  profile: ProfileItem[]
  experience: ExperienceItem[]
  skills: SkillSection[]
  projects?: ProjectItem[] | null
  education: EducationData[]
}
