module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "Arial", "sans-serif"],
        roboto: ["Roboto", "san-serif"],
      },
      width: {
        120: "120%",
      },
      height: {
        80: "80vh",
        117: "117vh",
        200: "200vh",
        150: "150vh",
        250: "250vh",
        300: "300vh",
        80: "80vh",
        90: "90vh",
        70: "70vh",
        "14/15": "93.3333333333%",
        "13/15": "86.6666666667%",
        "12/15": "80%",
        "1/15": "6.6666666667%",
        "2/15": "13.3333333333%",
        "3/15": "20%",
      },
      borderWidth: {
        0.5: "0.5px",
        1: "1px",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(39, 245, 58, 0.8)",
      },
      backgroundColor: {
        "zinc-full": "#18181b",
      },
    },
  },
  variants: {
    // ...
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    height: ["responsive", "hover", "focus", "active", "group-hover"],
    opacity: ["responsive", "hover", "focus", "active", "group-hover"],
    padding: ["first", "last"],
  },
  plugins: [],
};
