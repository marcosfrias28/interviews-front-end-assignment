/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ['"Onest"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
