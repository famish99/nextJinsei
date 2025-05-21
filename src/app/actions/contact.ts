'use server'

import { ContactData } from '@/types/resume'

import { handleResumeAction } from './utils'

export async function saveContact(contacts: ContactData) {
  return handleResumeAction((data, contacts: ContactData) => {
    data.contacts = contacts
  }, contacts)
}
