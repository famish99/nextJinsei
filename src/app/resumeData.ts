import fs from 'fs'
import { writeFile } from 'fs/promises'
import { cache } from 'react'
import YAML from 'yaml'

type HeaderData = {
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

export async function saveData(data: ResumeData) {
  const filePath = process.cwd() + '/safe_resume.yaml'
  await writeFile(filePath, YAML.stringify(data))
}
