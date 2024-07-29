/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
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
        '3xs': 'var(--offset_3xs)',
        '2xs': 'var(--offset_2xs)',
        xs: 'var(--offset_xs)',
        s: 'var(--offset_s)',
        m: 'var(--offset_m)',
        l: 'var(--offset_l)',
        xl: 'var(--offset_xl)'
      },
      margin: {
        '3xs': 'var(--offset_3xs)',
        '2xs': 'var(--offset_2xs)',
        xs: 'var(--offset_xs)',
        s: 'var(--offset_s)',
        m: 'var(--offset_m)',
        l: 'var(--offset_l)',
        xl: 'var(--offset_xl)'
      },
      gap: {
        '3xs': 'var(--offset_3xs)',
        '2xs': 'var(--offset_2xs)',
        xs: 'var(--offset_xs)',
        s: 'var(--offset_s)',
        m: 'var(--offset_m)',
        l: 'var(--offset_l)',
        xl: 'var(--offset_xl)'
      }
    }
  },
  plugins: []
};