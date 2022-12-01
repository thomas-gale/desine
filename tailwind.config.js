module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      fira: ["FiraCode", "monospace"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        desine: {
          primary: "#BFBFBF",
          secondary: "#808080",
          accent: "#404040",
          neutral: "#E6E6E6",
          "base-100": "#FFFFFF",
          info: "#E6E6E6",
          success: "#facc15",
          warning: "#d97706",
          error: "#BD3D2F",
        },
      },
    ],
  },
};
