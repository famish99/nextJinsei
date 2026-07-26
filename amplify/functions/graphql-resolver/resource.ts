import { defineFunction } from '@aws-amplify/backend';

export const graphqlResolver = defineFunction({
  name: 'graphql-resolver',
  entry: './handler.ts'
});
