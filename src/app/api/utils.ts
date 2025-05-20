import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import YAML from 'yaml'

import { ResumeData } from '../resumeData'

type UpdateFunction = (data: ResumeData, payload: any) => void

export async function handleResumeUpdate(
  updateFn: UpdateFunction,
  payload: any,
) {
  try {
    // Read the current YAML file
    const filePath = process.cwd() + '/safe_resume.yaml'
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = YAML.parse(fileContent) as ResumeData

    // Apply the update
    updateFn(data, payload)

    // Write back to the file
    await fs.writeFile(filePath, YAML.stringify(data))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 },
    )
  }
}
