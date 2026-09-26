import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This app is served from a /neon-ui/ subfolder of the combined site.
// If you rename the GitHub repo, update REPO_NAME below to match exactly
// (case-sensitive) — this must be "/<repo-name>/neon-ui/".
export default defineConfig({
  base: "/frontend-weekly-tasks/neon-ui/",
  plugins: [react()],
})
