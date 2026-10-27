# Vaibhav Gupta — Portfolio

Personal portfolio with an interactive 3D keyboard of my tech stack, work history and projects.

Live: https://portfolio-pink-delta-48.vercel.app

## Stack

Next.js, React, Three.js, Tailwind CSS, GSAP and Motion.

## Editing content

- `src/data/config.ts` — name, links, resume URL, SEO text
- `src/data/constants.ts` — keyboard skills (24 keys, 6 per row) and experience
- `src/data/projects.tsx` — project cards and their detail dialogs
- `public/assets/keyboard/logos/` — white SVG logos printed on the keycaps

## Running locally

```bash
npm install
npm run dev
```

The contact form sends mail through [Resend](https://resend.com) when `RESEND_API_KEY` is set; otherwise it opens the visitor's mail app with the message filled in.

## Credits

Built on [3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) by Naresh Khatri, used under the MIT License (see `LICENSE`).
