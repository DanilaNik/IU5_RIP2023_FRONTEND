import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "IU5_RIP2023_FRONTEND",
  // server: {
  //   port: 5173
  // },
  plugins: [react()],
})
