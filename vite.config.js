import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  }
})

