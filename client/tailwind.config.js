/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",

  theme: {
    extend: {
      colors: {
        rose: "#FBD7E9",
        apricot: "#FFDDB4",
        turquoise: "#A3E1CC",
        greenish: "#D4EBAE",
        lightblue: "#B6D7FB",
      },
    },
  },
  plugins: [],
};
