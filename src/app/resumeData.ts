import { ResumeData } from '@/types/resume'
import fs from 'fs'
import { writeFile } from 'fs/promises'
import { cache } from 'react'
import YAML from 'yaml'

function fetchData(): ResumeData {
  const file = fs.readFileSync(process.cwd() + '/safe_resume.yaml', 'utf-8')
  return YAML.parse(file)
}

export const getData = cache(fetchData)

export async function saveData(data: ResumeData) {
  const filePath = process.cwd() + '/safe_resume.yaml'
  await writeFile(filePath, YAML.stringify(data))
}
