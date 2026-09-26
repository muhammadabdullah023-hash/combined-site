// server.js
//
// This is the piece that actually satisfies the assignment: hashing,
// password checking, and token issuing all happen HERE, on the server —
// never in the browser. The front end in /public just sends requests to
// these routes and displays whatever comes back.

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serves index.html, style.css, app.js

const DB_FILE = path.join(__dirname, "users.json");
const SALT_ROUNDS = 10;

// A fixed secret would normally live in a .env file. To keep setup down to
// one command, we generate one on first run and save it to disk — so it
// stays the same across restarts (unlike a purely in-memory secret, which
// would invalidate every token every time you restart the server).
const SECRET_FILE = path.join(__dirname, ".jwt-secret");
if (!fs.existsSync(SECRET_FILE)) {
  fs.writeFileSync(SECRET_FILE, require("crypto").randomBytes(32).toString("hex"));
}
const JWT_SECRET = fs.readFileSync(SECRET_FILE, "utf8").trim();

/* =====================================================================
   Tiny JSON-file "database" — genuinely persists across restarts,
   with zero setup (no MySQL/Postgres install, no native driver to compile).
   ===================================================================== */
function loadUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

/* =====================================================================
   POST /api/register
   Hash the password with bcrypt BEFORE it's written to users.json.
   The file never contains a "password" field — only "passwordHash".
   ===================================================================== */
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const users = loadUsers();
  if (users.some((u) => u.username === username)) {
    return res.status(409).json({ error: "That username is already taken." });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = { id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1, username, passwordHash };

  users.push(user);
  saveUsers(users);

  res.status(201).json({ message: "Registered successfully.", userId: user.id });
});

/* =====================================================================
   POST /api/login
   bcrypt.compare checks the password against the stored hash — never by
   reversing the hash, since that's not possible. On success, sign a JWT.
   ===================================================================== */
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  const invalidCreds = () => res.status(401).json({ error: "Invalid username or password." });
  if (!user) return invalidCreds();

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return invalidCreds();

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful.", token });
});

/* =====================================================================
   Middleware — the "bouncer" that checks the wristband on protected routes
   ===================================================================== */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided. Please log in." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token. Please log in again." });
    req.user = decoded;
    next();
  });
}

app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ message: `You are authenticated as ${req.user.username}.`, userId: req.user.userId });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
  console.log("Open that URL in your browser to use the app.");
});
