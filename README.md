# Frontend Weekly Tasks — Combined Project

All six weekly tasks, brought together as one deployable site with a single
landing page linking out to each piece.

## Structure

```
/                  → hub landing page (this is what visitors see first)
/neon-ui/          → Tasks 1 + 2: component library + live API data grid (React/Vite)
/gallery/          → Task 3: lazy-loaded image gallery (static HTML)
/tasks/            → Task 4: DailyStack, a responsive & fully keyboard-operable task manager
/animations/       → Task 5: hover/fade-in animation demo (static HTML)
/auth-backend/     → Bonus: secure login system (Node/Express + bcrypt + JWT) — source only, see note below
/.github/workflows → Task 6: CI that builds and deploys everything automatically
```

## Running it locally

The three static pages (`gallery/`, `tasks/`, `animations/`) work by just
opening their `index.html` in a browser — no build step.

The component library needs a build step, since it's a React app:

```bash
cd neon-ui-src
npm install
npm run dev
```

## Deploying the whole thing to GitHub Pages

1. **Push this repo to GitHub**, named `frontend-weekly-tasks` (or update the
   `base` path in `neon-ui-src/vite.config.js` and the workflow if you use a
   different name — they must match exactly).

   ```bash
   git init
   git add .
   git commit -m "Combine all weekly tasks into one site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/frontend-weekly-tasks.git
   git push -u origin main
   ```

2. **Settings → Pages → Source → GitHub Actions.**

3. Push triggers `.github/workflows/deploy.yml`, which:
   - builds the React app (`neon-ui-src` → static files)
   - copies the hub page + the three static folders alongside it
   - deploys the whole assembled site

   Your live site: `https://YOUR_USERNAME.github.io/frontend-weekly-tasks/`

4. **This is genuine CI** (Task 6's actual requirement) — every future push to
   `main` redeploys automatically. No manual `npm run deploy` needed.

## About `/auth-backend`

This is a separate Node.js/Express project (bcrypt password hashing + JWT
tokens) from an earlier assignment. **It is not part of the live site above**
— GitHub Pages only serves static files, and this needs a running server.
It's included here for reference/grading. To run it:

```bash
cd auth-backend
npm install
node server.js
```
Then open `http://localhost:3000`.

If you want this live too, it needs a host that runs Node (Render, Railway,
Fly.io — all have free tiers), which is a separate deployment from GitHub
Pages.

## A note on the two "vite.config.js base" values

Only `neon-ui-src/vite.config.js` has a `base` path, and it must read
`/frontend-weekly-tasks/neon-ui/` — the repo name, followed by `/neon-ui/`
for its position inside the combined site. If you rename the repo, update
that one line to match.
