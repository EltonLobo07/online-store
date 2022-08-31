module.exports = {
  plugins: [require("@tailwindcss/line-clamp")],
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        'sm': '430px',
        'org-sm': '640px'
      }
    },
  },
  variants: {
    extend: {
    
    }
  }
}
