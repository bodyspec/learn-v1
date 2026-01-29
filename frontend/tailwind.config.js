/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // BodySpec brand colors (from web-v3/src/variables.scss)
        bs: {
          dark: '#1C3133',      // $newdark - primary text and buttons
          dark55: '#7C8D90',    // $newdark55 - muted text
          dark15: '#DFE2E2',    // $newdark15 - borders
          dark3: '#F8F8F8',     // $newdark3 - backgrounds
        },
        // Salad/mint colors for accents
        salad: {
          100: '#69D994',       // $salad100 - accent, links
          90: '#9DDEAD',        // $salad90 - light buttons
          80: '#B3E5C2',        // $salad80
          70: '#CCEDD6',        // $salad70
          60: '#E5F6EB',        // $salad60 - light backgrounds
        },
        greentext: '#60C888',   // $greentext - for text accents
      },
      fontFamily: {
        sans: [
          'Poppins',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
