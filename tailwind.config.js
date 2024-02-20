/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        container: 'var(--surface)',
        'container-contrast': 'var(--text-primary)'
      },
      boxShadow: {
        default: 'var(--box-shadow-default)'
      }
    },
  },
  plugins: [],
}

