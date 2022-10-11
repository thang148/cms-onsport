module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4b6bfb"
      },
      textColor: {
        "primary-400": "#4b6bfb"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/line-clamp")]
}
