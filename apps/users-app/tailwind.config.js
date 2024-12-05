/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Ensure only your custom UI package files are included (exclude node_modules)
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
