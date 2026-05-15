import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(
  {
    plugins: [react()],
    server: {
      port: 3000, // Порт для локальной разработки
      open: true, // Автоматическое открытие в браузере
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 👈 Связываем алиас '@' с папкой 'src'
      },
    }
  }
)
