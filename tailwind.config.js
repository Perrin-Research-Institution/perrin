/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-roboto-condensed)', 'Georgia', 'serif'],
        mono: ['var(--font-roboto-condensed)', 'monospace'],
        display: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
        body: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#1E3A8A", 
        secondary: "#9333EA",
      },
      spacing: {
        18: "4.5rem", 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("@tailwindcss/forms")
  ],
};
