import svgToDataUri from 'mini-svg-data-uri';
import type { Config } from 'tailwindcss';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      colors: {
        // Theme colors
        primary: 'var(--brand)',
        brand: 'var(--brand)',
        'primary--darker': 'var(--brand-darker)',
        'primary--lighter': 'var(--brand-lighter)',

        // Misc
        white: 'var(--off-white)',
        black: 'var(--black)',

        // Background colors
        body: 'var(--black)',
        section: 'var(--black--alt)',
        card: 'var(--black--alt)',
        'input-bg': 'var(--black--lighter)',
        'card-hover': 'var(--black--lighter)',
        'dropdown-bg': 'var(--black--lighter)',
        'section--lighter': 'var(--black--lighter)',
        button: '#262626',

        // Text colors
        'button-alt-text': 'var(--black--lighter)',
        placeholder: 'var(--grey-light)',

        // old part here
        'body-bg': 'var(--bg-body)',
        'bg-dropdown': 'var(--bg-dropdown)',
        modal: '#fff',
        'bg-modal-hover': 'var(--bg-modal-hover)',
        border: 'var(--border)',
        'border-default': 'var(--border-default)',
        'border-outline': 'var(--border-outline)',
        'border-separator': 'var(--border-separator)',
        'text-title': 'var(--text-title)',
        'text-subtitle': 'var(--text-subtitle)',
        'text-muted': 'var(--text-muted)',
        'text-regular-nav': 'var(--text-regular-nav)',
        'text-button': 'var(--text-button)',
        'text-button-alt': 'var(--text-button-alt)',
        'text-dropdown-item': 'var(--text-dropdown-item)',
        'button-default': 'var(--button-default)',
        'button-hover': 'var(--button-hover)',
        success: 'var(--green)',
        error:
         'var(--red)',
        'menu-icon': 'var(--color-menu-icon)',
        'input-focus': 'var(--)',
        'badge-default': 'var(--badge-default)',
        'badge-hover': 'var(--grey)',
        input: 'var(--black--lighter)',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'var(--red)',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'var(--black-quaternary)',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'var(--black-quaternary)',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'var(--black-alt)',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundColor: {
        button: 'var(--black--tertiary)',
        modal: 'var(--black--quaternary)',
        'modal-item-hover': 'var(--black--quinary)',
        'badge-hover': 'var(--grey)',
        'button-hover': 'var(--grey-secondary)',
      },
      textColor: {
        tile: 'var(--off-white)',
        'button-text': 'var(--white-secondary)',
        'dropdown-item': 'var(--off-white-alt)',
        muted: 'var(--grey-light)',
        'sub-title': 'var(--grey-tertiary)',
        'regular-nav': 'var(--grey-tertiary)',
        'menu-items': 'var(--grey-quaternary)',
      },
      borderColor: {
        border: '#262626',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-from-top': 'slideInFromTop 0.5s ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 0.5s ease-out',
        'slide-in-from-left': 'slideInFromLeft 0.5s ease-out',
        'slide-in-from-right': 'slideInFromRight 0.5s ease-out',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        }
      );
    },
  ],
};

function addVariablesForColors({
  addBase,
  theme,
}: {
  addBase: Function;
  theme: any;
}) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ':root': newVars,
  });
}

export default config;
