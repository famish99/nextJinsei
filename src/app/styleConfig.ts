import type { Schema } from '../../amplify/data/resource'

export type StyleConfig = Schema['Styles']['type']

export type StyleQueryResult = { getStyles: StyleConfig }

export type EditableStyleSection = 'colors' | 'spacing' | 'typography'

export const GetStylesQuery = `
    query GetStyles($id: ID!) {
      getStyles(id: $id) {
        id
        userId
        colors {
          primary
          text {
            base
            highlight
            lowlight
            arrow
          }
          background {
            skill
          }
        }
        spacing {
          section {
            base
            margin
            text
          }
          subsection
          list {
            horizontal
            item
          }
          items {
            base
            compact
          }
          description
          subtitle
        }
        typography {
          tracking {
            section
          }
          leading {
            base
            title
          }
          size {
            base
            section
            title
            small
          }
          weight {
            section
            title
          }
        }
        createdAt
        updatedAt
      }
    }
  `

export const UpdateStylesMutation = `
  mutation UpdateStyles($input: UpdateStylesInput!) {
    updateStyles(input: $input) {
      id
      userId
      colors {
        primary
        text { base highlight lowlight arrow }
        background { skill }
      }
      spacing {
        section { base margin text }
        subsection
        list { horizontal item }
        items { base compact }
        description
        subtitle
      }
      typography {
        tracking { section }
        leading { base title }
        size { base section title small }
        weight { section title }
      }
      createdAt
      updatedAt
    }
  }
`

export const UpdateResumeMutation = `
  mutation UpdateResume($input: UpdateResumeInput!) {
    updateResume(input: $input) {
      id
      userId
      header {
        firstName
        lastName
        title
      }
      contacts {
        email
        phone {
          countryCode
          raw
          formatted
        }
        linkedin
        github
      }
      profile {
        text
        type
      }
      skills {
        title
        items
      }
      experience {
        employer
        title
        location
        startDate
        endDate
        tasks
      }
      education {
        institution
        location
        startDate
        endDate
        degree
      }
      projects {
        title
        description
        link
        stack
      }
      createdAt
      updatedAt
    }
  }
`
