/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Astroplate Exact Color Palette from theme.json
        primary: '#121212',
        body: '#ffffff',
        border: '#eaeaea',
        light: '#f6f6f6',
        dark: '#040404',
        text: {
          DEFAULT: '#444444',
          dark: '#040404',
          light: '#717171'
        },
        darkmode: {
          primary: '#ffffff',
          body: '#1c1c1c',
          border: '#3E3E3E',
          light: '#222222',
          dark: '#ffffff',
          text: {
            DEFAULT: '#B4AFB6',
            dark: '#ffffff',
            light: '#B4AFB6'
          }
        }
      },
      fontFamily: {
        primary: ['Heebo', 'sans-serif'],
        secondary: ['Signika', 'sans-serif'],
        sans: ['Heebo', 'sans-serif']
      }
    }
  },
  plugins: []
};
