/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors:{
        primary: {
          100:"#9173e9",
          200:"#1b66ca",
          300:"#e8f0fe",
        },  
        secondary: {
          100:"#f6fafe",
          200:"#e3e5e6",
          300:"#f0f0f0",
          500:"#686b70",
        },
        dark:{
          100:"#52575b",
          200:"#3c4043",
          300:"#43474a",
        }
      },
      fontFamily:{
        'nunito' : 'Nunito Sans',
      }
    },    
  },
  plugins: [],
}

