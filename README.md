# Ritesh M H — Developer Portfolio

A responsive portfolio built with React, TypeScript, Vite, and `react-icons`.
Project content lives in [`data/projects.ts`](./data/projects.ts), separate from
the UI; the repository audit and evidence notes live in
[`data/project-research.md`](./data/project-research.md).

## Run locally

```bash
npm install
npm run dev
```

## Validate and build

```bash
npm run typecheck
npm run build
```

Project previews are original illustrative UI sketches, not screenshots or
claims about working product deployments. Live-demo links are only shown when
one has been verified. GitHub statistics are loaded from the public profile
endpoint; the audit and showcased project data remain limited to the five
repositories supplied for this portfolio.

## Personalize

- Replace `public/images/profile.jpg` with a profile photo. If it is absent, the
  hero displays a designed initials placeholder.
- Update the name, social links, location, opportunities, and optional contact
  email in [`data/profile.ts`](./data/profile.ts).
- Edit technology notes and categories in [`data/toolkit.ts`](./data/toolkit.ts).
- The contact form uses a `mailto:` draft. Add an email in `data/profile.ts` to
  enable it; no address is fabricated by default.
