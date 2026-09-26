# Final Auth — server-side, requirement-complete, easy to run

This is the version that actually satisfies the brief: **the server** hashes
passwords, **the server** checks them at login, and **the server** issues
the token. The browser only ever sends requests and displays responses —
it never touches a password hash or signs anything.

## Run it (2 commands)

```bash
npm install
node server.js
```

Then open **http://localhost:3000** in your browser. That's the whole setup.

## How it maps to the requirement

| Requirement | Where it happens |
|---|---|
| Hash password before saving | `server.js`, `POST /api/register` — `bcrypt.hash()` |
| Save to a database | `users.json` on disk — a real file that persists across restarts |
| Check password on login | `server.js`, `POST /api/login` — `bcrypt.compare()` |
| Server issues a token | `server.js` — `jwt.sign()`, expires in 1 hour |
| Server remembers the login | The JWT itself — every request to `/api/profile` re-verifies it server-side |

## Try it in the browser

1. Open `http://localhost:3000`
2. Register a username + password (8+ characters)
3. Open `users.json` in this folder in a text editor — you'll see a
   `passwordHash` field, never the password you typed
4. Log in with the same credentials — a token appears on the page
5. The "Protected profile" card appears automatically once you have a
   valid token
6. Try logging in with the wrong password — it's rejected
7. Click "Log out," then notice the profile card disappears — no token,
   no access

## Why this is genuinely persistent, not just "in-memory"

- `users.json` is written to disk on every registration, so your users
  survive a server restart.
- `.jwt-secret` is generated once on first run and saved to disk too — so
  tokens issued before a restart are still valid after one (unlike a
  secret that regenerates every time the server starts).

## What a production version would add on top of this

- A real database (MySQL/Postgres) instead of a JSON file, once you have
  more than a handful of users
- HTTPS (tokens sent over plain HTTP can be intercepted)
- Rate limiting on `/api/login` to slow down brute-force attempts
- Refresh tokens, so users aren't fully logged out every hour
