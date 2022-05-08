const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        loader: 'loader 0.6s infinite alternate'
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: 'translate3d(0, -1rem, 0)'
          }
        }
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
