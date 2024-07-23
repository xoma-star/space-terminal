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
      },
      padding: {
        xs: 'var(--offset_xs)',
        s: 'var(--offset_s)',
        m: 'var(--offset_m)',
        l: 'var(--offset_l)',
        xl: 'var(--offset_xl)'
      },
      margin: {
        xs: 'var(--offset_xs)',
        s: 'var(--offset_s)',
        m: 'var(--offset_m)',
        l: 'var(--offset_l)',
        xl: 'var(--offset_xl)'
      }
    },
  },
  plugins: [],
}

