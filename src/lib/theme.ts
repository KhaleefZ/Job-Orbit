import { MantineColorsTuple, createTheme } from '@mantine/core';

// Custom color palette for JOBORBIT
const primaryColor: MantineColorsTuple = [
  '#e6f5ff',
  '#cce5ff',
  '#99cbff',
  '#66b0ff',
  '#3395ff',
  '#0080ff',
  '#006edb',
  '#005cb8',
  '#004a94',
  '#003870'
];

const accentColor: MantineColorsTuple = [
  '#fff0f6',
  '#ffe0ec',
  '#ffc1d9',
  '#ffa1c7',
  '#ff82b4',
  '#ff63a1',
  '#e6598f',
  '#cc4f7d',
  '#b3456b',
  '#993b59'
];

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: primaryColor,
    accent: accentColor,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.4' },
      h4: { fontSize: '1.25rem', lineHeight: '1.5' },
      h5: { fontSize: '1.125rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
    Modal: {
      defaultProps: {
        radius: 'md',
        overlayProps: {
          blur: 3,
        },
      },
    },
    Drawer: {
      defaultProps: {
        overlayProps: {
          blur: 3,
        },
      },
    },
  },
});
