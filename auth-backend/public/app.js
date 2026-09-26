// public/app.js
// This file does NOT hash anything or check any password — it just calls
// the server's API and shows whatever the server decides. That's the point:
// the security logic lives server-side, where a user can't tamper with it.

let currentToken = null;

function showMsg(id, text, ok) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "msg " + (ok ? "ok" : "err");
}

async function handleRegister() {
  const username = document.getElementById("reg-user").value.trim();
  const password = document.getElementById("reg-pass").value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (!res.ok) return showMsg("reg-msg", data.error, false);
  showMsg("reg-msg", `Registered "${username}". Check users.json on disk — it's a bcrypt hash, not your password.`, true);
  document.getElementById("reg-pass").value = "";
}

async function handleLogin() {
  const username = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-pass").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (!res.ok) return showMsg("login-msg", data.error, false);

  currentToken = data.token;
  document.getElementById("token-view").textContent = currentToken;
  showMsg("login-msg", "Login successful — token issued below.", true);
  document.getElementById("login-pass").value = "";

  await refreshProfile();
}

function handleLogout() {
  currentToken = null;
  document.getElementById("token-view").textContent = "No token yet — log in to get one.";
  document.getElementById("profile-box").classList.remove("show");
}

async function refreshProfile() {
  if (!currentToken) return;
  const res = await fetch("/api/profile", {
    headers: { Authorization: `Bearer ${currentToken}` },
  });
  const data = await res.json();

  if (!res.ok) {
    document.getElementById("profile-box").classList.remove("show");
    return showMsg("login-msg", data.error, false);
  }

  document.getElementById("profile-text").textContent = `${data.message} (user #${data.userId})`;
  document.getElementById("profile-box").classList.add("show");
}
