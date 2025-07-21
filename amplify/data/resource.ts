import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Phone: a.customType({
    countryCode: a.string(),
    raw: a.string(),
    formatted: a.string(),
  }),

  Header: a.customType({
    firstName: a.string().required(),
    lastName: a.string().required(),
    title: a.string().required(),
  }),

  Contacts: a.customType({
    email: a.string().required(),
    phone: a.ref('Phone'),
    linkedin: a.string(),
    github: a.string(),
  }),

  Skill: a.customType({
    title: a.string().required(),
    items: a.string().array().required(),
  }),

  Experience: a.customType({
    employer: a.string().required(),
    title: a.string().required(),
    location: a.string().required(),
    startDate: a.string().required(),
    endDate: a.string(),
    tasks: a.string().array().required(),
  }),

  Education: a.customType({
    institution: a.string().required(),
    location: a.string().required(),
    startDate: a.string().required(),
    endDate: a.string(),
    degree: a.string().required(),
  }),

  Project: a.customType({
    title: a.string().required(),
    description: a.string().required(),
    link: a.string(),
    stack: a.string().required(),
  }),

  TextColors: a.customType({
    base: a.string().required(),
    highlight: a.string().required(),
    lowlight: a.string().required(),
    arrow: a.string().required(),
  }),

  BackgroundColors: a.customType({
    skill: a.string().required(),
  }),

  Colors: a.customType({
    primary: a.string().required(),
    text: a.ref('TextColors').required(),
    background: a.ref('BackgroundColors').required(),
  }),

  SectionSpacing: a.customType({
    base: a.string().required(),
    margin: a.string().required(),
    text: a.string().required(),
  }),

  ListSpacing: a.customType({
    horizontal: a.string().required(),
    item: a.string().required(),
  }),

  ItemsSpacing: a.customType({
    base: a.string().required(),
    compact: a.string().required(),
  }),

  Spacing: a.customType({
    section: a.ref('SectionSpacing').required(),
    subsection: a.string().required(),
    list: a.ref('ListSpacing').required(),
    items: a.ref('ItemsSpacing').required(),
    description: a.string().required(),
    subtitle: a.string().required(),
  }),

  Tracking: a.customType({
    section: a.string().required(),
  }),

  Leading: a.customType({
    base: a.string().required(),
    title: a.string().required(),
  }),

  Size: a.customType({
    base: a.string().required(),
    section: a.string().required(),
    title: a.string().required(),
    small: a.string().required(),
  }),

  Weight: a.customType({
    section: a.string().required(),
    title: a.string().required(),
  }),

  Typography: a.customType({
    tracking: a.ref('Tracking').required(),
    leading: a.ref('Leading').required(),
    size: a.ref('Size').required(),
    weight: a.ref('Weight').required(),
  }),

  Resume: a
    .model({
      userId: a.string().required(),
      header: a.ref('Header'),
      contacts: a.ref('Contacts'),
      profile: a.string().array(),
      skills: a.ref('Skill').array(),
      experience: a.ref('Experience').array(),
      education: a.ref('Education').array(),
      projects: a.ref('Project').array(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read'])
    ]),

  Styles: a
    .model({
      userId: a.string().required(),
      colors: a.ref('Colors').required(),
      spacing: a.ref('Spacing').required(),
      typography: a.ref('Typography').required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(['read'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: resumes } = await client.models.Resume.list()

// return <div>{resumes.map(resume => <div key={resume.id}>{resume.header.firstName} {resume.header.lastName}</div>)}</div>
