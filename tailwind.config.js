module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./demo.html"
  ],
  theme: {
    extend: {      
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a8a8ff',
          400: '#9780ff',
          500: '#7c5aff',
          600: '#6b4aff',
          700: '#5a3aff',
          800: '#4a2aff',
          900: '#3a1aff',
        },
        dark: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#202020',
          900: '#0c0b0c',
        },
        purple: {
          light: '#ecc5fc',
          dark: '#9780ff',
          text: '#4506AA',
          textlight: '#B9A3FF',
        },
        gradientbg: {
          in: 'linear-gradient( #0C0B0C, #B8B8B8)',
          out: 'linear-gradient( #B8B8B8, #0C0B0C)',
        },
        mainbg: {
          light: '#B8B8B8',
          dark: '#0c0b0c',
        },
        logoblock: '#beaeca',
      },
      fontFamily: {
        'display': ['Wix Madefor Display', 'sans-serif'],
        'kannada': ['Tiro Kannada', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}