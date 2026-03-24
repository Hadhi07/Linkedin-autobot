import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        login: 'login.html',
        step1: 'step1.html',
        step2: 'step2.html',
        step3: 'step3.html',
        step4: 'step4.html',
        success: 'success.html'
      }
    }
  }
})
