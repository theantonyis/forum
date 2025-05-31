/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}", // if using /app dir
        "./styles/**/*.{css}"           // sometimes you want to add your styles folder if it contains Tailwind classes
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp'), // if you use line-clamp
    ],
};
