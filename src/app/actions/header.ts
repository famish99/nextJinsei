'use server'

import { HeaderData } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveHeader(header: HeaderData) {
  return handleResumeAction((data, header: HeaderData) => {
    data.header = header
  }, header)
}
