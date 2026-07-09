/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF0069',
          light: '#FFD498',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #FF0069, #FFD498)',
      }
    },
  },
  plugins: [],
}

