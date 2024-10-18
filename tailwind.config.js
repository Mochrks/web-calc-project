const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,jsx}",
    "./components/**/*.{ts,tsx,jsx}",
    "./app/**/*.{ts,tsx,jsx}",
    "./src/**/*.{ts,tsx,jsx}",
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			main: '#a388ee',
  			mainAccent: '#9e66ff',
  			secondary: '#d8b4fe',
  			overlay: 'rgba(0,0,0,0.8)',
  			bg: '#e3dff2',
  			text: '#000',
  			border: '#000',
  			darkBg: '#1D1F27',
  			darkText: '#eeefe9',
  			darkBorder: '#000',
  			secondaryBlack: '#1b1b1b'
  		},
  		borderRadius: {
  			base: '6px'
  		},
  		boxShadow: {
  			light: '2px 6px 0px 0px #000',
  			dark: '2px 6px 0px 0px #000'
  		},
  		translate: {
  			boxShadowX: '2px',
  			boxShadowY: '6px',
  			reverseBoxShadowX: '-2px',
  			reverseBoxShadowY: '-6px'
  		},
  		fontWeight: {
  			base: '600',
  			heading: '700'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
