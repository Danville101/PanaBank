/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero-panda': "url('/hero-panda.svg')",
        'hero-pand-md':"url('/md-hero-panda.svg')",
        'mobile-app':"url('/mobile_image.svg')",
        'stone-table': "url('/stone_table.svg')",
        'singup-bg-md': "url('/signup_md.svg')",
        'blank-card': "url('/blank_card.svg')"
      }
    },
  },
  plugins: [],
}
