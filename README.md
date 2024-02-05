# SPC Technical Assessment

This next.js app is for the SPC Full Stack Developer Technical Assessment. This README provides a high level guide so a reviewer cavigate the project easily. To install and run is the standard next.js prcess:

```bash
yarn install # or npm install
yarn dev # or npm run dev
```

The app structure is the default Next.js Typescript app created via `npx create-next-app@latest` and selecting yes to Typescript and TailwindCSS.

## Relevant Code

The majority of authored code occurs in two files: `lib/getSubmissions.ts` and `app/page.tsx`.

### `lib/getSubmissions.ts`

This file contains the logic for fetching the submissions from the API. It uses the `fetch` API to make a GET request to the API endpoint. Additionally, we make use of the library `zod` to validate and transform the data from the API. This ensures that each sumbission has the data we need, reshapes it into something more usable, and provides typesafety for the data.

### `app/page.tsx`

This files contains the React components for rendering the page. By default Next.js will render this using React server components. The data fetched from the API will be cached, and only refetched at most once per hour. Some other features to note:
* `next/image` is used for automatic image optimisations
* the design is responsive and will work on all screen sizes
* icons are sourced from [Heroicons](https://heroicons.com/)
