import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        'sticky-black': '#161516',
        'sticky-gray': '#A3A2A3',
        'sticky-yellow': '#FFCA68',
        'sticky-orange': '#FF9C6F',
        'sticky-purple': '#B78FFF',
        'sticky-indigo': '#00D3FF',
        'sticky-green': '#E4EF88',
        'sticky-golden': '#FFCF00',
      },
      boxShadow: {
        'sticky-shadow': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      },
    },
  },
  plugins: [],
};
export default config;
