/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-dark': '#1a1a2e',
        'app-darker': '#12121f',
        'app-card': '#16213e',
        'app-card-hover': '#1e2a4a',
        'app-pink': '#e94560',
        'app-pink-dark': '#c73652',
        'app-blue': '#0f3460',
        'app-purple': '#533483',
        'app-text': '#e2e8f0',
        'app-text-muted': '#94a3b8',
        'app-border': '#2d3748',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-pink': 'pulsePink 1s ease-in-out infinite',
        'swipe-left': 'swipeLeft 0.4s ease-in forwards',
        'swipe-right': 'swipeRight 0.4s ease-in forwards',
        'match-pop': 'matchPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'card-enter': 'cardEnter 0.3s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(233, 69, 96, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(233, 69, 96, 0)' },
        },
        swipeLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-150%) rotate(-30deg)', opacity: '0' },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(150%) rotate(30deg)', opacity: '0' },
        },
        matchPop: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '60%': { transform: 'scale(1.2) rotate(5deg)' },
          '80%': { transform: 'scale(0.95) rotate(-2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        cardEnter: {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 30px 80px rgba(0, 0, 0, 0.6)',
        'glow-pink': '0 0 30px rgba(233, 69, 96, 0.4)',
        'glow-green': '0 0 30px rgba(34, 197, 94, 0.4)',
      },
    },
  },
  plugins: [],
};
