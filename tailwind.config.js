/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'Lalezar': ['Lalezar', 'cursive'],
        'lay-grotesk': ['Lay Grotesk Tria', 'sans-serif'],
        'Host+Grotesk': ['Host Grotesk', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'Merriweather': ['Merriweather', 'serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'transform-up': 'transformUp 0.6s ease-out', // New transform animation for the button
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        transformUp: { // New transform keyframe to use on hover
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
