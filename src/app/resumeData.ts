import fs from 'fs'
import { cache } from 'react'
import YAML from 'yaml'

type HeaderData = {
  firstName: string
  lastName: string
  title: string
}

type ContactData = {
  email: string
  phone: {
    countryCode: string
    raw: string
    formatted: string
  }
  linkedin: string
  github?: string
}

type ProfileItem = {
  text: string
  type?: string
}

type ExperienceItem = {
  employer: string
  title: string
  location: string
  startDate: string
  endDate: string
  tasks: string[]
}

type SkillSection = {
  title: string
  items: string[]
}

type ProjectItem = {
  title: string
  stack: string
  description: string
  link: string
}

type EducationData = {
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

function fetchData(): ResumeData {
  const file = fs.readFileSync(process.cwd() + '/safe_resume.yaml', 'utf-8')
  return YAML.parse(file)
}

export const getData = cache(fetchData)
