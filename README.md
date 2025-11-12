# Battle Royale App Store Pulse

Monitor the top trending battle royale games on the Apple App Store across key regions. The dashboard pulls from the public iTunes Search API, layers custom heuristics to approximate a ranking score, and surfaces useful metadata such as recent updates, pricing, and cumulative ratings.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- TypeScript & React Server Components
- Tailwind CSS for styling

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:3000`.

## Environment

The application does not require private environment variables. Network requests are performed server-side at request time and revalidated periodically.

## Deployment

Deploy straight to Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-89d05d44
```

After deployment propagates, verify:

```bash
curl https://agentic-89d05d44.vercel.app
```
