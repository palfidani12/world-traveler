# World Traveler App

Clean Next.js 16 + TypeScript starter with template code removed and a scalable source layout.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Firebase Authentication Setup

1. Create a Firebase project and enable `Authentication > Sign-in method > Email/Password`.
2. Copy `.env.example` to `.env.local` and fill in your Firebase web app credentials.
3. Run `npm run dev`.

Auth routes:

- `/login`
- `/register`

## Project Structure

```text
.
|- public/
|  |- images/
|- src/
|  |- app/
|  |  |- globals.css
|  |  |- layout.tsx
|  |  |- page.tsx
|  |- components/
|  |  |- layout/
|  |  |- ui/
|  |- config/
|  |  |- site.ts
|  |- features/
|  |- hooks/
|  |- lib/
|  |- styles/
|  |- types/
|- eslint.config.mjs
|- next.config.ts
|- package.json
|- tsconfig.json
```

## Organization Rules

- Keep route files in `src/app` only (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
- Keep domain logic in `src/features` (example: `src/features/trips`).
- Put reusable UI in `src/components/ui` and app layout shells in `src/components/layout`.
- Put pure utilities in `src/lib`, shared types in `src/types`, and React hooks in `src/hooks`.
- Keep app-level constants and metadata in `src/config`.

## Next Steps

1. Create your first feature module under `src/features`.
2. Add pages/routes under `src/app` that consume those features.
3. Add tests once core flows are in place.
