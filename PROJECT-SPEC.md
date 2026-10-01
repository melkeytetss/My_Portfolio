# Project content spec

Fill one block per project and send it back. 3–6 projects. Rough notes are
fine — I shape the copy, you bring the facts. Anything marked **(required)**
blocks the entry from rendering; everything else degrades gracefully.

---

## 1. Per-project checklist

Copy this block once per project and fill it in.

```yaml
id: (required) short slug, lowercase, no spaces — e.g. `paygate`, `quizrush`
    This id is ALSO the wallpaper filename: public/assets/backgrounds/<id>.jpg
    Pick it now, because renaming later means renaming files too.

title: (required) display name — e.g. "PayGate"
category: (required) short label shown as the pill on the card —
    e.g. "Commerce platform", "CLI tool", "Mobile app"

live: public URL of the deployed project, or "#" if there is none.
    If "#", the "Visit Website" button hides itself.
github: repo URL, or "private" / omit it for closed-source work.
    If missing, the "Source" link hides itself. No placeholder links.

card image: (required) 1 image for the grid card.
    Path: public/assets/projects-screenshots/<id>/landing.png
    3:2 aspect. This is the first thing a visitor sees, so use the best screen.

tagline: 1 sentence, the bold hook at the top of the detail modal.
    Good: "A production-grade booking API with idempotent checkout."
    Bad:  "This is my project." / "I built this with Next.js."

intro: 2–4 sentences of what it is and its scale. Facts beat adjectives:
    users, requests/day, lines of code, tables, latency numbers, uptime.

sections: 2–4 titled subsections, each with 1 short paragraph + 1–3 screenshots.
    A good section = one engineering decision and why it was the right call
    ("optimistic locking finalizer so concurrent polls can't double-score").
    A bad section = a feature list ("it has login, dashboard, settings").

screenshots: 2–5 total, PNG or WebP, ~1600px wide, 3:2 or 16:9.
    Path: public/assets/projects-screenshots/<id>/*.png
    Landscape only. Crop browser chrome the same way on all shots.

frontend chips: 2–5 keys from the menu in §2.
backend chips: 0–5 keys from the menu in §2. Empty is fine — the
    "Backend" column hides itself. No invented tech names; if yours isn't
    listed, say so and I'll add a chip for it (needs an SVG or text mark).
```

---

## 2. Tech-chip menu (pick keys from here)

These are the only icons wired up. Write the **key**, not the label —
e.g. `ts`, not "TypeScript". I map them to the monochrome dock icons.

| key | label | key | label |
|---|---|---|---|
| `ts` | TypeScript | `trpc` | tRPC |
| `js` | JavaScript | `hono` | Hono |
| `react` | React.js | `drizzle` | Drizzle ORM |
| `reactNative` | React Native | `prisma` | Prisma |
| `expo` | Expo | `postgres` | PostgreSQL |
| `next` | Next.js | `mongo` | MongoDB |
| `vue` | Vue.js | `supabase` | Supabase |
| `tailwind` | Tailwind | `firebase` | Firebase |
| `shadcn` | shadcn/ui | `redis` | Redis / BullMQ |
| `chakra` | Chakra UI | `sockerio` | Socket.io |
| `aceternity` | Aceternity | `partykit` | PartyKit |
| `motion` | Motion | `hocuspocus` | Hocuspocus |
| `gsap` | GSAP | `yjs` | Y.js |
| `reactQuery` | React Query | `betterAuth` | Better Auth |
| `zustand` | Zustand | `node` | Node.js |
| `reactFlow` | React Flow | `express` | Express |
| `codemirror` | CodeMirror | `python` | Python |
| `nextIntl` | next-intl (i18n) | `docker` | Docker |
| `aiSDK` | Vercel AI SDK | `turborepo` | Turborepo |
| `anthropic` | Anthropic Claude | `cloudflare` | Cloudflare |
| `mistral` | Mistral AI | `sanity` | Sanity |
| `satori` | Satori / sharp | `mcp` | MCP |
| `spline` | Spline | | |

Not here (e.g. Rust, Go, Java, GraphQL, Redis Streams, Django, Laravel)?
List them — I'll create matching chips. Full-color SVGs get flattened to
the dock's monochrome style automatically.

---

## 3. Screenshots, concretely

| what | file | size | purpose |
|---|---|---|---|
| card | `<id>/landing.png` | 3:2, ~1600px | grid card, first impression |
| hero shot | `<id>/dashboard.png` (name it what it is) | 16:9, ~1600px | "this is what the app looks like" |
| feature 1–3 | `<id>/<feature>.png` | 16:9, ~1600px | evidence for each write-up section |

Ship a `raw/` folder alongside if you have originals — it's gitignored
(`public/assets/projects-screenshots/raw/`), so it never leaks, and I can
re-crop from source instead of asking you twice.

Skip: login pages, empty states, settings screens — unless the auth flow is
the interesting engineering. One login screenshot per portfolio is plenty,
zero is fine.

---

## 4. What I need for your `id` values right now

Before you write anything long, send just the `id`s (e.g.
`paygate, quizrush, dotfiles`). The `id` locks two filenames
(`backgrounds/<id>.jpg`, `projects-screenshots/<id>/…`), so getting them
first means you can drop files in named folders and I'll wire them up.

---

## 5. Minimum viable send

If doing all of the above at once is too much, send this and I'll draft the
rest from your repo READMEs:

```yaml
id: paygate
title: PayGate
category: Payments API
live: https://paygate.example.com
github: https://github.com/melkeytetss/paygate
frontend: [ts, react]
backend: [node, postgres, redis]
tagline: "Idempotent checkout API — refresh the page mid-payment, get charged once."
intro: "Solo-built billing service. ~12K lines TS, 9 tables, 400 req/s p99 90ms."
screenshots: <id>/landing.png, <id>/dashboard.png, <id>/webhooks.png
```

Rule of thumb: 1 strong project beats 3 thin ones. A project with no
screenshots and a one-line description reads worse than no entry — the
section hides itself when empty, so only send what you're proud to show.




id: smartquiz
title: SmartQuiz
category: AI-assisted quiz platform
live: "not yet deployed"
github: private


tagline: "An AI-assisted quiz creation, Bloom's Taxonomy classification, review system, and item analysis platform."

intro: "SmartQuiz is a web-based quiz management platform for instructors that combines AI-assisted quiz creation, Bloom's Taxonomy classification, TOS compliance checks, and item analysis in one workflow. A FastAPI model service classifies questions into Bloom's levels, flags low-confidence items for manual review, and helps instructors balance quizzes around the school's 30/70 LOTS-HOTS requirement. The system also includes quiz analysis reports, per-question feedback, PDF export, and a Supabase-backed backend for quizzes, attempts, and review data."

sections:
  - title: AI Bloom's analysis
    note: "Quiz questions are sent to a Python FastAPI service that classifies each item into Bloom's Taxonomy levels and returns per-question confidence, thinking order, and review flags."
    

  - title: TOS compliance
    note: "The results view checks the quiz against the 30% LOTS / 70% HOTS Table of Specifications target."
   

  - title: Item analysis and review workflow
    note: "Instructors can review question-level performance, inspect flagged items, export Bloom's reports to PDF, and forward analysis results for admin review."

 
    

frontend chips:
  - js
  - react
  - tailwind

backend chips:
  - supabase
  - python