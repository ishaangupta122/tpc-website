/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Single site-wide content width (1440px). Use via the .site-container class.
      maxWidth: { site: "90rem" },
    },
  },
  plugins: [],
  corePlugins: {
    textStroke: true,
  },
};
