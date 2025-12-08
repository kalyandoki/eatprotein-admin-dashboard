/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#258440", // primary green
          dark: "#1E803A",
          danger: "#D7201A",
          dangerAccent: "#D51711",
        },
        page: {
          bg: "#F7FAF7",
        },
      },
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        soft: "0 6px 20px rgba(2,6,23,0.08)",
      },
    },
  },
  plugins: [],
};
