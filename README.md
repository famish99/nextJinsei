## Resume

Hosted via AWS Amplify at https://huannguyen.info/

## Overview

This project generates my resume from [YAML](https://github.com/famish99/nextJinsei/blob/main/safe_resume.yaml) using [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com/), and the [Universal Résumé Template](https://github.com/WebPraktikos/universal-resume).

> [!IMPORTANT]
> Big thanks to [Torey Littlefield's Resume](https://github.com/toreylittlefield/my-custom-tailwind-resume),
> which this project was heavily inspired and derived from!

## Getting Started

This project uses AWS Amplify Gen 2 for the backend resources, to start up a sandbox use:

> [!WARNING]
> Make sure to setup sandbox before running local server otherwise it'll barf

```bash
npx ampx sandbox
```

You'll need to [create a Cognito user](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1) to edit the resume. Then [create the UserProfile entry in Dynamo](https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#item-explorer) with that Cognito user ID.

Once you have the UserProfile object, copy the ID into `.env.local`:
```javascript
USER_PROFILE_ID=<UserProfile ID>
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
