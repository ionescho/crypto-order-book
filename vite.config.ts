import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@toolkit": path.resolve(__dirname, "src/toolkit"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@core": path.resolve(__dirname, "src/core"),
      "@websocket": path.resolve(__dirname, "src/websocket"),
    }
  }
})
