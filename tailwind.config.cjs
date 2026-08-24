module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
        "blue-glow": "blue-glow 4s linear infinite",
        "arrow-loop": "arrow-loop 1s ease-in-out infinite",     
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "blue-glow": {
          "0%": { "background-position": "200% center" },
          "100%": { "background-position": "-200% center" },
        },
        "arrow-loop": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(90deg, transparent, rgba(0, 153, 255, 0.7), transparent)",
      },
    },
  },
  plugins: [],
};
