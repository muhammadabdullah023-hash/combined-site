import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/combined-site/neon-ui/",
  plugins: [react()],
})
