// eslint-disable-next-line canonical/filename-match-exported
import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        "pokemon-classic": ["Pokemon Pixel Font Regular"],
      },
    },
  },
};

export default config;