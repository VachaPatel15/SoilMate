/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "dark-green": "#123C3D",
      "light-green": "#29AB87",
      "secondary-light": "#F9F9F9",
      "primary-light": "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "hero-bg": "url('/src/assets/bg4.png')",
        "hero-bg1": "url('/src/assets/bg13.jpg')",
      },
    },
  },
  plugins: [],
};
