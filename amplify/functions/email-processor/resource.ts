import { defineFunction } from '@aws-amplify/backend';

export const emailProcessor = defineFunction({
  name: 'email-processor',
  entry: './handler.ts'
});