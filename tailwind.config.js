/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': 'hsl(262, 52%, 47%)',
        'primary-dark': 'hsl(262, 65%, 60%)',
        'secondary-light': 'hsl(220, 25%, 95%)',
        'secondary-dark': 'hsl(220, 15%, 20%)',
        'accent-light': 'hsl(199, 89%, 48%)',
        'accent-dark': 'hsl(199, 89%, 58%)',
        'muted-light': 'hsl(240, 10%, 85%)',
        'muted-dark': 'hsl(240, 5%, 40%)',
      },
    },
  },
  plugins: [],
}

